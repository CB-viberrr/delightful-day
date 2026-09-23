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
