// Accounts: register / login / logout / me. Passwords hashed with scrypt (per-user salt).
// Session = random 32-byte cookie token; only its SHA-256 is stored, so a database leak can't be replayed as logins.
const crypto = require('crypto'), { db, save } = require('./db');

const DAY = 86400000, SESSION_DAYS = 30, MAX_FAILS = 5, LOCK_MS = 15 * 60000;
const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k); // never trust "__proto__"-style keys
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
const hash = (pw, salt) => crypto.scryptSync(pw, salt, 32);
const DUMMY_SALT = crypto.randomBytes(16).toString('hex'); // hash even for unknown users, so timing doesn't reveal who exists
const sidFrom = req => { const m = (req.headers.cookie || '').match(/(?:^|;\s*)sid=([a-f0-9]{64})(?:;|$)/); return m && m[1]; };

function userFrom(req) {
  const sid = sidFrom(req), s = sid && own(db.sessions, sha(sid)) ? db.sessions[sha(sid)] : null;
  if (!s || typeof s !== 'object' || s.exp < Date.now()) return null;
  return own(db.users, s.user) ? db.users[s.user] : null;
}
const pub = u => ({ username: u.username, profile: u.profile });
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,}$/i;
const byEmail = email => Object.values(db.users).find(u => u && u.email === email) || null;

// Password-reset email via Resend (https://resend.com). Needs RESEND_API_KEY (+ optional MAIL_FROM) in the environment.
// Without a key, local dev prints the link in the terminal instead so the flow can still be tested.
async function sendResetEmail(to, link) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (!process.env.VERCEL) { console.log(`\n🔑 Password reset link for ${to} (email not configured, local only):\n   ${link}\n`); return true; }
    return false;
  }
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST', signal: AbortSignal.timeout(8000),
    headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || 'Tonight <hello@whatsthemoveboston.com>', to: [to],
      subject: 'Reset your Tonight password',
      text: `Someone (hopefully you) asked to reset your Tonight password.\n\nChoose a new one here (link works for 30 minutes):\n${link}\n\nIf this wasn't you, ignore this email and nothing changes.`,
      html: `<p>Someone (hopefully you) asked to reset your 🌙 Tonight password.</p><p><a href="${link}">Choose a new password</a> (link works for 30 minutes).</p><p>If this wasn't you, ignore this email and nothing changes.</p>`,
    }),
  });
  return r.ok;
}
const cookie = (val, age) => `sid=${val}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${age}` + (process.env.VERCEL ? '; Secure' : '');

module.exports = ({ route, HttpError }) => {
  const startSession = (res, username) => {
    const now = Date.now();
    for (const [k, s] of Object.entries(db.sessions)) if (!s || typeof s !== 'object' || s.exp < now) delete db.sessions[k]; // prune old/expired
    const sid = crypto.randomBytes(32).toString('hex');
    db.sessions[sha(sid)] = { user: username, exp: now + SESSION_DAYS * DAY }; save();
    res.setHeader('Set-Cookie', cookie(sid, SESSION_DAYS * 86400));
  };
  const password = body => {
    const pw = body.password;
    if (typeof pw !== 'string' || pw.length < 8) throw new HttpError(400, 'Password must be at least 8 characters');
    if (pw.length > 200) throw new HttpError(400, 'Password is too long');
    return pw;
  };

  const cleanEmail = (raw, forUser) => {
    const email = String(raw || '').trim().toLowerCase();
    if (!EMAIL_RE.test(email) || email.length > 254) throw new HttpError(400, 'That email doesn’t look right');
    const taken = byEmail(email);
    if (taken && taken !== forUser) throw new HttpError(409, 'That email is already used by another account');
    return email;
  };

  route('POST', '/api/register', ({ body, res }) => {
    const username = String(body.username || '').trim().toLowerCase();
    if (!/^[a-z0-9_]{2,20}$/.test(username)) throw new HttpError(400, 'Username: 2-20 letters, numbers or _');
    const pw = password(body);
    if (own(db.users, username)) throw new HttpError(409, 'That username is taken');
    const email = body.email ? cleanEmail(body.email) : undefined;
    const salt = crypto.randomBytes(16).toString('hex');
    db.users[username] = { username, salt, hash: hash(pw, salt).toString('hex'), profile: {}, created: Date.now(), ...(email && { email }) };
    startSession(res, username); return pub(db.users[username]);
  }, { auth: false });

  route('POST', '/api/login', ({ body, res }) => {
    const name = String(body.username || '').trim().toLowerCase(), pw = String(body.password || '').slice(0, 200);
    const u = name.includes('@') ? byEmail(name) : /^[a-z0-9_]{2,20}$/.test(name) && own(db.users, name) ? db.users[name] : null;
    if (u && u.lockedUntil > Date.now()) throw new HttpError(429, 'Too many wrong passwords. Try again in 15 minutes');
    const got = hash(pw, u ? u.salt : DUMMY_SALT);
    const ok = u && crypto.timingSafeEqual(got, Buffer.from(u.hash, 'hex'));
    if (!ok) {
      if (u) { u.fails = (u.fails || 0) + 1; if (u.fails >= MAX_FAILS) { u.lockedUntil = Date.now() + LOCK_MS; u.fails = 0; } save(); }
      throw new HttpError(401, 'Wrong username or password');
    }
    delete u.fails; delete u.lockedUntil;
    startSession(res, u.username); return pub(u);
  }, { auth: false });

  route('POST', '/api/logout', ({ req, res }) => {
    const sid = sidFrom(req); if (sid) { delete db.sessions[sha(sid)]; save(); }
    res.setHeader('Set-Cookie', cookie('', 0));
  }, { auth: false });

  route('GET', '/api/me', ({ user }) => user ? pub(user) : { username: null }, { auth: false });

  // Account settings. Every change re-checks the current password.
  const checkPassword = (u, pw) => {
    if (typeof pw !== 'string' || !crypto.timingSafeEqual(hash(pw.slice(0, 200), u.salt), Buffer.from(u.hash, 'hex')))
      throw new HttpError(403, 'Current password is wrong');
  };
  const endSessions = (username, keepSid) => {
    for (const [k, s] of Object.entries(db.sessions)) if (s && s.user === username && k !== keepSid) delete db.sessions[k];
  };
  route('GET', '/api/account', ({ user }) => ({ username: user.username, created: user.created, email: user.email || null,
    sessions: Object.values(db.sessions).filter(s => s && s.user === user.username && s.exp > Date.now()).length }));
  route('POST', '/api/account/password', ({ user, body, req }) => {
    checkPassword(user, body.current);
    const pw = password({ password: body.password });
    user.salt = crypto.randomBytes(16).toString('hex'); user.hash = hash(pw, user.salt).toString('hex');
    endSessions(user.username, sha(sidFrom(req))); save(); // other devices must log in again with the new password
    return { ok: true };
  });
  route('POST', '/api/account/email', ({ user, body }) => {
    checkPassword(user, body.password);
    if (!body.email) { delete user.email; save(); return { email: null }; }
    user.email = cleanEmail(body.email, user); save();
    return { email: user.email };
  });

  // Forgot password by username OR email. The link always goes to the email saved on the account.
  // Always answers the same way, so it never reveals which usernames/emails exist or have an email.
  route('POST', '/api/password/forgot', async ({ body, req }) => {
    const login = String(body.login || body.email || '').trim().toLowerCase().slice(0, 254);
    const u = login.includes('@') ? (EMAIL_RE.test(login) ? byEmail(login) : null)
      : /^[a-z0-9_]{2,20}$/.test(login) && own(db.users, login) ? db.users[login] : null;
    if (u && u.email && !(u.reset && u.reset.sent > Date.now() - 60000)) { // at most one email a minute per account
      const token = crypto.randomBytes(32).toString('hex');
      u.reset = { hash: sha(token), exp: Date.now() + 30 * 60000, sent: Date.now() }; save();
      const origin = process.env.VERCEL ? `https://${req.headers.host}` : `http://${req.headers.host}`;
      let ok = false; try { ok = await sendResetEmail(u.email, `${origin}/#/reset/${token}`); } catch {}
      if (!ok) console.error('Password reset email could not be sent (is RESEND_API_KEY set?)');
    }
    return { ok: true };
  }, { auth: false });

  route('POST', '/api/password/reset', ({ body, res }) => {
    const token = String(body.token || '');
    const u = /^[a-f0-9]{64}$/.test(token) && Object.values(db.users).find(u => u && u.reset && u.reset.hash === sha(token));
    if (!u || u.reset.exp < Date.now()) throw new HttpError(400, 'That reset link has expired. Ask for a new one.');
    const pw = password(body);
    u.salt = crypto.randomBytes(16).toString('hex'); u.hash = hash(pw, u.salt).toString('hex');
    delete u.reset; delete u.fails; delete u.lockedUntil;
    endSessions(u.username); startSession(res, u.username); // sign out everywhere, then log in here
    return pub(u);
  }, { auth: false });

  route('POST', '/api/account/logout-others', ({ user, req }) => { endSessions(user.username, sha(sidFrom(req))); save(); return { ok: true }; });
  route('POST', '/api/account/delete', ({ user, body, res }) => {
    checkPassword(user, body.password);
    endSessions(user.username); delete db.users[user.username];
    for (const p of Object.values(db.plans)) { // drop them from shared plans; delete plans nobody is left in
      p.members = (p.members || []).filter(m => m !== user.username);
      for (const o of p.options || []) o.votes = (o.votes || []).filter(v => v !== user.username);
      if (p.rsvps) delete p.rsvps[user.username];
      if (!p.members.length) delete db.plans[p.id];
    }
    save(); res.setHeader('Set-Cookie', cookie('', 0)); return { ok: true };
  });
};
module.exports.userFrom = userFrom;
