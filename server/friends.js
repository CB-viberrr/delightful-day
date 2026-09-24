// Friends + activity invites. Data lives on each user in db.users:
//   user.email            their own email (how friends find them)
//   user.friends[]        usernames (always mutual)
//   user.requests[]       incoming friend requests: usernames
//   user.pendingEmails[]  emails they asked to friend before anyone had that email (turned into requests once someone claims it)
//   user.invites[]        incoming invites: { id, from, idea, planId, at }
// Inviting to an activity creates a group plan (server/plans.js shape) with the idea as its first option.
const crypto = require('crypto'), { db, save } = require('./db');
const own = (o, k) => Object.prototype.hasOwnProperty.call(o, k);
const EMAIL = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,}$/i;
const cleanEmail = e => String(e || '').trim().toLowerCase();
const arr = (u, k) => (Array.isArray(u[k]) ? u[k] : (u[k] = []));
const byEmail = e => Object.values(db.users).find(u => u.email === e);
const str = (v, n) => String(v ?? '').slice(0, n);

module.exports = ({ route, HttpError }) => {
  const request = (from, to) => { // from/to are user objects
    if (from.username === to.username) throw new HttpError(400, "That's you! 😄");
    if (arr(from, 'friends').includes(to.username)) throw new HttpError(409, `You and ${to.username} are already friends`);
    if (arr(from, 'requests').includes(to.username)) return befriend(from, to); // they already asked you: just connect
    if (!arr(to, 'requests').includes(from.username)) to.requests.push(from.username);
  };
  const befriend = (a, b) => {
    for (const [x, y] of [[a, b], [b, a]]) {
      x.requests = arr(x, 'requests').filter(n => n !== y.username);
      if (!arr(x, 'friends').includes(y.username)) x.friends.push(y.username);
    }
    return 'friends';
  };
  const state = u => ({
    email: u.email || '',
    friends: arr(u, 'friends').filter(n => own(db.users, n)).map(n => ({ username: n, email: db.users[n].email || '' })),
    requests: arr(u, 'requests').filter(n => own(db.users, n)),
    pending: [...arr(u, 'pendingEmails'),
      ...Object.values(db.users).filter(o => arr(o, 'requests').includes(u.username)).map(o => o.email || o.username)],
    invites: arr(u, 'invites').filter(i => own(db.plans, i.planId)),
  });

  route('GET', '/api/friends', ({ user }) => state(user));

  route('POST', '/api/friends/email', ({ user, body }) => {
    const email = cleanEmail(body.email);
    if (!EMAIL.test(email)) throw new HttpError(400, "That doesn't look like an email");
    const taken = byEmail(email);
    if (taken && taken !== user) throw new HttpError(409, 'Another account already uses that email');
    user.email = email;
    for (const o of Object.values(db.users)) if (arr(o, 'pendingEmails').includes(email)) { // people who were waiting for this email
      o.pendingEmails = o.pendingEmails.filter(e => e !== email);
      if (o !== user) request(o, user);
    }
    save(); return state(user);
  });

  route('POST', '/api/friends/add', ({ user, body }) => {
    const email = cleanEmail(body.email);
    if (!EMAIL.test(email)) throw new HttpError(400, "That doesn't look like an email");
    const to = byEmail(email);
    let result = 'requested';
    if (!to) { // nobody has it yet: remember it, it becomes a request when they add that email
      if (!arr(user, 'pendingEmails').includes(email)) user.pendingEmails.push(email);
      result = 'waiting';
    } else result = request(user, to) || result;
    save(); return { result, ...state(user) };
  });

  route('POST', '/api/friends/respond', ({ user, body }) => {
    const name = str(body.username, 20);
    if (!arr(user, 'requests').includes(name) || !own(db.users, name)) throw new HttpError(404, 'Request not found');
    if (body.accept) befriend(user, db.users[name]); else user.requests = user.requests.filter(n => n !== name);
    save(); return state(user);
  });

  route('POST', '/api/friends/remove', ({ user, body }) => {
    const name = str(body.username, 20), email = cleanEmail(body.email);
    user.friends = arr(user, 'friends').filter(n => n !== name);
    user.pendingEmails = arr(user, 'pendingEmails').filter(e => e !== email);
    if (own(db.users, name)) db.users[name].friends = arr(db.users[name], 'friends').filter(n => n !== user.username);
    for (const o of Object.values(db.users)) if (o.email === email || o.username === email)
      o.requests = arr(o, 'requests').filter(n => n !== user.username); // cancel a sent request
    save(); return state(user);
  });

  // Invite friends to an idea (from Saved or Spark). Makes a plan they can open, vote on and chat about in Group plans.
  route('POST', '/api/friends/invite', ({ user, body }) => {
    const i = body.idea || {}, names = Array.isArray(body.friends) ? body.friends.map(n => str(n, 20)) : [];
    if (!i.title) throw new HttpError(400, 'Pick an activity first');
    const friends = [...new Set(names)].filter(n => arr(user, 'friends').includes(n) && own(db.users, n));
    if (!friends.length) throw new HttpError(400, 'Pick at least one friend');
    const idea = { title: str(i.title, 100), emoji: str(i.emoji || '✨', 8), description: str(i.description, 300) };
    const id = crypto.randomBytes(4).toString('hex');
    db.plans[id] = { id, title: str(body.title || idea.title, 80), owner: user.username, members: [user.username], invited: friends, created: Date.now(),
      options: [{ id: crypto.randomBytes(3).toString('hex'), ...idea, addedBy: user.username, votes: [user.username] }] };
    for (const n of friends) {
      const f = db.users[n];
      f.invites = [{ id: crypto.randomBytes(4).toString('hex'), from: user.username, idea, planId: id, note: str(body.note, 200), at: Date.now() },
        ...arr(f, 'invites')].slice(0, 50);
    }
    save(); return { planId: id, invited: friends };
  });

  // Accepting opens the plan (the client then goes to #/group/<planId>, which joins it). Declining just clears it.
  route('POST', '/api/friends/invites/:id', ({ user, params, body }) => {
    const inv = arr(user, 'invites').find(i => i.id === params.id);
    if (!inv) throw new HttpError(404, 'Invite not found');
    user.invites = user.invites.filter(i => i !== inv);
    const p = db.plans[inv.planId];
    if (p && body.accept && !p.members.includes(user.username)) p.members.push(user.username);
    save(); return { planId: p && body.accept ? p.id : null };
  });
};
