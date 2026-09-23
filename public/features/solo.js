// SOLO "Spark": personal "what could I do tonight?" ideas. Owned by the Solo squad. Edit only this file.
registerFeature({
  id: 'solo', label: 'Spark', icon: '✨',
  render(view) {
    view.innerHTML = `<section class="page"><h1>What could I do tonight?</h1>
      <p class="sub">Ideas tailored to your profile (${Object.keys(app.profile).length ? 'loaded' : 'fill in Profile for better ideas'}).</p>
      <div class="row"><button class="btn" id="go">Give me ideas</button><button class="btn ghost" id="wild">🎲 Surprise me</button></div>
      <div id="out" class="grid"></div></section>`;
    const out = view.querySelector('#out');
    const run = async wild => {
      out.innerHTML = ui.loading();
      try {
        const { ideas, source } = await app.suggest('solo', wild ? { wildcard: 'Suggest something unexpected and out of their usual comfort zone' } : {}, wild ? 3 : 5);
        out.innerHTML = ''; if (source === 'fallback') ui.toast('Using built-in ideas (no Claude key set)');
        ideas.forEach(i => out.appendChild(ui.ideaCard(i, [{ label: '💾 Save', onClick: () => save(i) }])));
      } catch (e) { out.innerHTML = `<div class="card">${ui.esc(e.message)}</div>`; }
    };
    const key = 'saved:' + app.user;
    const save = i => { try { const s = JSON.parse(localStorage[key] || '[]'); s.push(i); localStorage[key] = JSON.stringify(s); ui.toast('Saved!'); } catch {} };
    view.querySelector('#go').onclick = () => run(false);
    view.querySelector('#wild').onclick = () => run(true);
    // TODO (Solo squad): saved-ideas list, swipe/shuffle cards, "not feeling it" regenerate, mood quick-picker.
  },
});
