// SAVED: the user's saved ideas (Spark saves them to localStorage key 'saved:<username>' as an Idea[]). Owned by Saved. Edit only this file.
registerFeature({
  id: 'saved', label: 'Saved', icon: '⭐',
  render(view) {
    const key = 'saved:' + app.user;
    let items = []; try { items = JSON.parse(localStorage[key] || '[]'); } catch {}
    view.innerHTML = `<section class="page"><h1>Your saved ideas</h1><div id="out" class="grid"></div></section>`;
    const out = view.querySelector('#out');
    if (!items.length) out.innerHTML = '<p class="sub">Nothing saved yet. Tap 💾 Save on an idea in Spark.</p>';
    items.forEach(i => out.appendChild(ui.ideaCard(i)));
    // TODO (Saved): remove button, mark-as-done, "plan this with friends" -> #/group, empty-state illustration, sort/filter.
  },
});
