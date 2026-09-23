// Shared group plans. Plan: { id, title, owner, members[], options[{id,title,emoji,description,addedBy,votes[]}], created }
const crypto = require('crypto'), { db, save } = require('./db');
module.exports = ({ route, HttpError }) => {
  const getPlan = id => db.plans[id] || (() => { throw new HttpError(404, 'Plan not found'); })();
  const join = (p, u) => { if (!p.members.includes(u.username)) { p.members.push(u.username); save(); } };
  route('GET', '/api/plans', ({ user }) => Object.values(db.plans).filter(p => p.members.includes(user.username)).sort((a, b) => b.created - a.created));
  route('POST', '/api/plans', ({ user, body }) => {
    const id = crypto.randomBytes(4).toString('hex');
    db.plans[id] = { id, title: String(body.title || 'Untitled plan').slice(0, 80), owner: user.username, members: [user.username], options: [], created: Date.now() };
    save(); return db.plans[id];
  });
  route('GET', '/api/plans/:id', ({ user, params }) => { const p = getPlan(params.id); join(p, user); return p; }); // opening a share link joins you
  route('POST', '/api/plans/:id/options', ({ user, params, body }) => {
    const p = getPlan(params.id); join(p, user);
    if (!body.title) throw new HttpError(400, 'Title required');
    p.options.push({ id: crypto.randomBytes(3).toString('hex'), title: String(body.title).slice(0, 100), emoji: body.emoji || '✨',
      description: String(body.description || '').slice(0, 300), addedBy: user.username, votes: [] });
    save(); return p;
  });
  route('POST', '/api/plans/:id/vote', ({ user, params, body }) => {
    const p = getPlan(params.id), o = p.options.find(o => o.id === body.optionId);
    if (!o) throw new HttpError(404, 'Option not found');
    o.votes = o.votes.includes(user.username) ? o.votes.filter(v => v !== user.username) : [...o.votes, user.username];
    save(); return p;
  });
};
