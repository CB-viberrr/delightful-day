// Shared helpers + the feature contract (integrator owns). Features never edit this file.
window.FEATURES = [];
// registerFeature({ id, label, icon, render(container, { param }) })  -> may return a cleanup fn (clear timers etc.)
window.registerFeature = f => FEATURES.push(f);

window.api = async (method, path, body) => {
  const r = await fetch(path, { method, headers: { 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || 'Request failed');
  return j;
};

// Shared app state. app.profile is the logged-in user's settings; app.user is their username.
window.app = {
  user: null, profile: {},
  // suggest('solo'|'group'|'network'|'icebreakers', context?, count?) -> Promise<{ ideas: Idea[], source }>
  suggest: (mode, context = {}, count = 5) => api('POST', '/api/suggest', { mode, profile: app.profile, context, count }),
  saveProfile: async p => { app.profile = (await api('PUT', '/api/profile', { profile: p })).profile; return app.profile; },
};

window.ui = {
  esc: s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])),
  el(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; },
  toast(msg) {
    const t = document.getElementById('toast'); t.textContent = msg; t.hidden = false;
    clearTimeout(ui._t); ui._t = setTimeout(() => (t.hidden = true), 2500);
  },
  // Idea: { title, emoji, description, tags[], cost, duration, vibe, mode }.  actions: [{ label, onClick(idea, cardEl) }]
  ideaCard(idea, actions = []) {
    const c = ui.el(`<article class="card idea">
      <div class="emoji">${ui.esc(idea.emoji || '✨')}</div>
      <div class="body"><h3>${ui.esc(idea.title)}</h3><p>${ui.esc(idea.description)}</p>
        <div class="meta">${[idea.cost, idea.duration, ...(idea.tags || [])].filter(Boolean).map(t => `<span class="chip">${ui.esc(t)}</span>`).join('')}</div>
        <div class="actions"></div></div></article>`);
    for (const a of actions) {
      const b = ui.el(`<button class="btn small ${a.kind || ''}">${ui.esc(a.label)}</button>`);
      b.onclick = () => a.onClick(idea, c, b); c.querySelector('.actions').appendChild(b);
    }
    return c;
  },
  loading: msg => `<div class="loading">✨ ${ui.esc(msg || 'Thinking up ideas...')}</div>`,
};

// app.inviteFriends(idea) -> opens a friend picker; resolves the new planId (or null if cancelled).
// Any feature can use it: ui.ideaCard(i, [{ label: '💌 Invite', onClick: i => app.inviteFriends(i) }])
app.inviteFriends = async idea => {
  if (!document.getElementById('invite-style')) document.head.appendChild(ui.el(`<style id="invite-style">
    .invite-bg { position:fixed; inset:0; background:#0008; display:grid; place-items:center; z-index:8; animation:invite-in .15s ease-out; }
    .invite-box { width:min(440px, calc(100vw - 32px)); max-height:80vh; overflow:auto; }
    .invite-box h2 { margin:0 0 4px; } .invite-list { display:flex; flex-wrap:wrap; gap:6px; margin:14px 0; }
    .invite-list .chip { font-size:14px; padding:6px 12px; }
    @keyframes invite-in { from { opacity:0; transform:scale(.97); } }</style>`));
  let friends = [];
  try { friends = (await api('GET', '/api/friends')).friends; } catch (e) { ui.toast(e.message); return null; }
  if (!friends.length) { ui.toast('Add a friend on the Network tab first 🤝'); location.hash = '#/network'; return null; }
  return new Promise(done => {
    const bg = ui.el(`<div class="invite-bg"><div class="card invite-box">
      <h2>${ui.esc(idea.emoji || '✨')} ${ui.esc(idea.title)}</h2><p class="sub">Who's coming?</p>
      <div class="invite-list">${friends.map(f => `<button class="chip" data-u="${ui.esc(f.username)}">${ui.esc(f.username)}</button>`).join('')}</div>
      <div class="row"><input id="inv-note" maxlength="200" placeholder="Add a note (optional), e.g. Friday 7pm?"></div>
      <div class="row"><button class="btn" id="inv-go" disabled>💌 Send invite</button><button class="btn ghost" id="inv-x">Cancel</button></div></div></div>`);
    const picked = new Set(), go = bg.querySelector('#inv-go');
    const close = v => { bg.remove(); done(v); };
    bg.querySelectorAll('.invite-list .chip').forEach(b => (b.onclick = () => {
      picked.has(b.dataset.u) ? picked.delete(b.dataset.u) : picked.add(b.dataset.u);
      b.classList.toggle('on'); go.disabled = !picked.size;
    }));
    bg.querySelector('#inv-x').onclick = () => close(null);
    bg.onclick = e => { if (e.target === bg) close(null); };
    go.onclick = async () => {
      go.disabled = true; go.textContent = 'Sending...';
      try {
        const r = await api('POST', '/api/friends/invite', { idea, friends: [...picked], note: bg.querySelector('#inv-note').value });
        ui.toast(`💌 Invite sent to ${r.invited.join(', ')}!`); close(r.planId);
      } catch (e) { ui.toast(e.message); go.disabled = false; go.textContent = '💌 Send invite'; }
    };
    document.body.appendChild(bg);
  });
};
