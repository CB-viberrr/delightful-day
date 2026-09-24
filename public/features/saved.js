// SAVED: the user's saved ideas (Spark saves them to localStorage key 'saved:<username>' as an Idea[]). Owned by Saved. Edit only this file.
const PRICE_RANGE_BY_COST = { free: [0, 0], '$': [5, 40], '$$': [40, 150], '$$$': [150, 500] };
const MAX_PRICE = 500;
// Ideas only carry a cost tier ('free'|'$'|'$$'|'$$$'), not a real price, so this makes up a
// realistic dummy dollar figure per idea (stable across renders, based on its title).
function priceFor(idea) {
  const [lo, hi] = PRICE_RANGE_BY_COST[idea.cost] || PRICE_RANGE_BY_COST['$$'];
  if (lo === hi) return lo;
  let hash = 0; const s = idea.title || '';
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
  return lo + (hash % (hi - lo + 1));
}
const priceLabel = n => (n === 0 ? 'Free' : `$${n}`);
const WHEN_OPTIONS = ['Tonight', 'This week', 'Someday'];
const whenOf = idea => idea.when || 'Someday';

registerFeature({
  id: 'saved', label: 'Saved', icon: '⭐',
  render(view) {
    const key = 'saved:' + app.user;
    const load = () => { try { return JSON.parse(localStorage[key] || '[]'); } catch { return []; } };
    const persist = items => { localStorage[key] = JSON.stringify(items); };
    let maxPrice = MAX_PRICE;
    let whenFilter = 'All';
    view.innerHTML = `<style>
        .saved-list { display: flex; flex-direction: column; gap: 12px; margin-top: 20px; }
        .saved-card { display: flex; gap: 16px; }
        .saved-flyer {
          flex: 0 0 84px; width: 84px; align-self: flex-start; border-radius: 10px;
          background: linear-gradient(160deg, var(--accent, #f0a), var(--accent2, #80f));
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 14px 0; border: 2px dashed rgba(255,255,255,.4); transform: rotate(-2deg);
          box-shadow: 0 6px 14px rgba(0,0,0,.35);
        }
        .saved-flyer .emoji { font-size: 32px; }
        .saved-flyer .tag { font-size: 9px; letter-spacing: .1em; text-transform: uppercase; opacity: .8; margin-top: 6px; }
        .saved-card .body { flex: 1; min-width: 0; }
        .saved-card .body h3 { margin: 0 0 6px; }
        .saved-card .body p { margin: 0 0 10px; color: var(--mute); }
        .saved-card .actions { align-items: center; flex-wrap: wrap; }
        .saved-card .actions label { display: flex; align-items: center; gap: 6px; color: var(--mute); font-size: 14px; }
        .saved-undo { display: flex; align-items: center; gap: 10px; margin-top: 14px; padding: 10px 14px;
          background: var(--panel); border: 1px solid var(--line); border-radius: 12px; }
        .saved-undo span { flex: 1; color: var(--mute); }
        .saved-when-filter { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
        .saved-card select.saved-when-picker {
          font: inherit; background: var(--panel); color: var(--ink); border: 1px solid var(--line);
          border-radius: 8px; padding: 4px 8px; margin-left: 8px;
        }
      </style>
      <section class="page"><h1>Your saved ideas</h1>
      <div class="row saved-filters">
        <label for="costFilter">Show ideas up to: <strong id="costLabel">${priceLabel(maxPrice)}${maxPrice >= MAX_PRICE ? '+' : ''}</strong></label>
        <input type="range" id="costFilter" min="0" max="${MAX_PRICE}" step="5" value="${maxPrice}">
      </div>
      <div class="saved-when-filter">${['All', ...WHEN_OPTIONS].map(w =>
        `<button class="btn small${w === whenFilter ? '' : ' ghost'}" data-when="${ui.esc(w)}">${ui.esc(w)}</button>`).join('')}</div>
      <div id="undoBar"></div>
      <div id="out" class="saved-list"></div></section>`;
    const out = view.querySelector('#out');
    const undoBar = view.querySelector('#undoBar');
    const costLabel = view.querySelector('#costLabel');
    const whenFilterBar = view.querySelector('.saved-when-filter');
    let lastRemoved = null; // { idea, idx }
    let undoTimer = null;
    const showUndo = () => {
      undoBar.innerHTML = '';
      clearTimeout(undoTimer);
      if (!lastRemoved) return;
      const bar = ui.el(`<div class="saved-undo"><span>Removed "${ui.esc(lastRemoved.idea.title)}"</span><button class="btn small ghost">↩️ Undo</button></div>`);
      bar.querySelector('button').onclick = () => {
        const cur = load();
        cur.splice(Math.min(lastRemoved.idx, cur.length), 0, lastRemoved.idea);
        persist(cur);
        lastRemoved = null;
        ui.toast('Restored!');
        showUndo(); draw();
      };
      undoBar.appendChild(bar);
      undoTimer = setTimeout(() => { lastRemoved = null; showUndo(); }, 8000);
    };
    const cardFor = (idea, idx) => {
      const c = ui.el(`<article class="card saved-card">
        <div class="saved-flyer"><span class="emoji">${ui.esc(idea.emoji || '✨')}</span><span class="tag">Tonight</span></div>
        <div class="body">
          <h3>${ui.esc(idea.title)}</h3>
          <p>${ui.esc(idea.description)}</p>
          <div class="meta">${[priceLabel(priceFor(idea)), idea.duration, ...(idea.tags || [])].filter(Boolean).map(t => `<span class="chip">${ui.esc(t)}</span>`).join('')}</div>
          <div class="actions">
            <label>Plan for:
              <select class="saved-when-picker">${WHEN_OPTIONS.map(w => `<option value="${ui.esc(w)}"${w === whenOf(idea) ? ' selected' : ''}>${ui.esc(w)}</option>`).join('')}</select>
            </label>
          </div>
        </div>
      </article>`);
      c.querySelector('.saved-when-picker').onchange = e => {
        const cur = load(); if (cur[idx]) cur[idx].when = e.target.value; persist(cur);
        draw();
      };
      const removeBtn = ui.el(`<button class="btn small">🗑️ Remove</button>`);
      removeBtn.onclick = () => {
        const cur = load(); const [removedIdea] = cur.splice(idx, 1); persist(cur);
        lastRemoved = { idea: removedIdea, idx }; showUndo(); draw();
      };
      c.querySelector('.actions').appendChild(removeBtn);
      return c;
    };
    const draw = () => {
      const items = load();
      out.innerHTML = '';
      if (!items.length) { out.innerHTML = '<p class="sub">Nothing saved yet. Tap 💾 Save on an idea in Spark.</p>'; return; }
      const shown = items
        .map((idea, idx) => ({ idea, idx }))
        .filter(({ idea }) => priceFor(idea) <= maxPrice)
        .filter(({ idea }) => whenFilter === 'All' || whenOf(idea) === whenFilter);
      if (!shown.length) { out.innerHTML = '<p class="sub">Nothing saved that matches those filters. Try widening them.</p>'; return; }
      shown.forEach(({ idea, idx }) => out.appendChild(cardFor(idea, idx)));
    };
    view.querySelector('#costFilter').oninput = e => {
      maxPrice = Number(e.target.value);
      costLabel.textContent = priceLabel(maxPrice) + (maxPrice >= MAX_PRICE ? '+' : '');
      draw();
    };
    whenFilterBar.querySelectorAll('button').forEach(btn => {
      btn.onclick = () => {
        whenFilter = btn.dataset.when;
        whenFilterBar.querySelectorAll('button').forEach(b => b.classList.toggle('ghost', b !== btn));
        draw();
      };
    });
    draw();
    // TODO (Saved): mark-as-done, "plan this with friends" -> #/group, empty-state illustration, more filters.
  },
});
