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
  // Bouncing emoji conga line + chunky retro headline that flips through silly status lines. Shrinks inside a .card.
  loading(msg) {
    const lines = [msg || 'Cooking up ideas', 'Consulting the moon', 'Bribing the vibes', 'Shaking the fun tree'].map(l => ui.esc(String(l).replace(/\.+$|…$/, '')));
    return `<div class="loading tl-load" role="status" aria-label="${lines[0]}">
      <div class="tl-conga">${['🌙', '🍕', '🪩', '🎳', '🍜', '🎸'].map((e, i) => `<span style="--i:${i}">${e}</span>`).join('')}</div>
      <div class="tl-say"><div class="tl-tick">${[...lines, lines[0]].map(l => `<b>${l}<i>.</i><i>.</i><i>.</i></b>`).join('')}</div></div></div>`;
  },
};
document.head.appendChild(ui.el(`<style>
  .tl-load { display:flex; flex-direction:column; align-items:center; gap:22px; padding:56px 16px; position:relative; overflow:hidden; border-radius:24px; }
  .tl-load::before { content:''; position:absolute; inset:-40%; z-index:-1; opacity:.35; filter:blur(40px); animation:tl-spin 6s linear infinite;
    background:conic-gradient(from 0deg, var(--accent), var(--accent2), #4de1c1, #ffd84d, var(--accent)); }
  .tl-conga { display:flex; gap:14px; font-size:52px; }
  .tl-conga span { display:inline-block; animation:tl-hop .9s cubic-bezier(.3,1.6,.5,1) infinite; animation-delay:calc(var(--i) * .11s); filter:drop-shadow(0 10px 12px #0008); }
  .tl-say { height:1.25em; overflow:hidden; font-size:clamp(26px, 4vw, 40px); font-weight:900; font-style:italic; letter-spacing:-.02em; text-transform:uppercase; }
  .tl-tick { animation:tl-tick 6s cubic-bezier(.7,-.4,.3,1.4) infinite; }
  .tl-tick b { display:block; height:1.25em; line-height:1.25em; text-align:center; color:var(--ink); text-shadow:3px 3px 0 var(--accent2), 6px 6px 0 var(--accent); }
  .tl-tick i { font-style:inherit; display:inline-block; animation:tl-dot 1s infinite; } .tl-tick i:nth-child(2) { animation-delay:.15s; } .tl-tick i:nth-child(3) { animation-delay:.3s; }
  .card .tl-load, .tl-load.small { padding:18px 8px; gap:10px; } .card .tl-conga, .tl-load.small .tl-conga { font-size:26px; gap:6px; }
  .card .tl-say, .tl-load.small .tl-say { font-size:18px; } .card .tl-tick b, .tl-load.small .tl-tick b { text-shadow:2px 2px 0 var(--accent2); }
  @keyframes tl-hop { 0%, 100% { transform:translateY(0) scale(1.15, .85); } 35% { transform:translateY(-34px) rotate(-12deg) scale(.9, 1.1); } 60% { transform:translateY(-10px) rotate(8deg); } }
  @keyframes tl-tick { 0%, 20% { transform:translateY(0); } 25%, 45% { transform:translateY(-1.25em); } 50%, 70% { transform:translateY(-2.5em); } 75%, 95% { transform:translateY(-3.75em); } 100% { transform:translateY(-5em); } }
  @keyframes tl-dot { 0%, 100% { opacity:.2; } 50% { opacity:1; } }
  @keyframes tl-spin { to { transform:rotate(1turn); } }
  @media (prefers-reduced-motion: reduce) { .tl-load *, .tl-load::before { animation:none !important; } }
</style>`));

// app.details(idea) -> Promise<{ summary, sections: [{ title, emoji, items[] }], place?, search? } | null>. null = no AI connected.
app.details = idea => api('POST', '/api/details', { idea, profile: app.profile }).then(r => r.details).catch(() => null);

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
