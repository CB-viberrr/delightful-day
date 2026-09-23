// Accounts: register / login / logout / me. Passwords hashed with scrypt; session = random cookie token.
const crypto = require('crypto'), { db, save } = require('./db');

function userFrom(req) {
  const m = (req.headers.cookie || '').match(/(?:^|; )sid=([a-f0-9]+)/);
  const name = m && db.sessions[m[1]];
  return name && db.users[name] ? db.users[name] : null;
}
const hash = (pw, salt) => crypto.scryptSync(pw, salt, 32).toString('hex');
const pub = u => ({ username: u.username, profile: u.profile });

module.exports = ({ route, HttpError }) => {
  const startSession = (res, username) => {
    const sid = crypto.randomBytes(24).toString('hex');
    db.sessions[sid] = username; save();
    res.setHeader('Set-Cookie', `sid=${sid}; HttpOnly; Path=/; SameSite=Lax; Max-Age=2592000` + (process.env.VERCEL ? "; Secure" : ""));
  };
  route('POST', '/api/register', ({ body, res }) => {
    const username = String(body.username || '').trim().toLowerCase();
    if (!/^[a-z0-9_]{2,20}$/.test(username)) throw new HttpError(400, 'Username: 2-20 letters, numbers or _');
    if (String(body.password || '').length < 4) throw new HttpError(400, 'Password must be at least 4 characters');
    if (db.users[username]) throw new HttpError(409, 'That username is taken');
    const salt = crypto.randomBytes(16).toString('hex');
    db.users[username] = { username, salt, hash: hash(body.password, salt), profile: {}, created: Date.now() };
    startSession(res, username); return pub(db.users[username]);
  }, { auth: false });
  route('POST', '/api/login', ({ body, res }) => {
    const u = db.users[String(body.username || '').trim().toLowerCase()];
    if (!u || hash(String(body.password || ''), u.salt) !== u.hash) throw new HttpError(401, 'Wrong username or password');
    startSession(res, u.username); return pub(u);
  }, { auth: false });
  route('POST', '/api/logout', ({ req, res }) => {
    const m = (req.headers.cookie || '').match(/sid=([a-f0-9]+)/); if (m) { delete db.sessions[m[1]]; save(); }
    res.setHeader('Set-Cookie', 'sid=; Path=/; Max-Age=0');
  }, { auth: false });
  route('GET', '/api/me', ({ user }) => user ? pub(user) : { username: null }, { auth: false });
};
module.exports.userFrom = userFrom;
