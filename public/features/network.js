// NETWORK: networking ideas + icebreakers. Owned by the Networking person. Edit only this file.
registerFeature({
  id: 'network', label: 'Network', icon: '🤝',
  render(view) {
    view.innerHTML = `<section class="page"><h1>Meet great people tonight</h1>
      <p class="sub">Tell us the setting and we'll suggest moves and conversation starters.</p>
      <div class="row"><input id="ctx" placeholder="Where/what? e.g. startup mixer, alumni dinner, new city">
      </div><div class="row"><button class="btn" id="ev">🎟️ Where to network</button><button class="btn ghost" id="ice">💬 Icebreakers</button></div>
      <div id="out" class="grid"></div></section>`;
    const out = view.querySelector('#out');
    const run = async mode => {
      out.innerHTML = ui.loading();
      try {
        const { ideas } = await app.suggest(mode, { setting: view.querySelector('#ctx').value, goal: app.profile.goal }, 5);
        out.innerHTML = ''; ideas.forEach(i => out.appendChild(ui.ideaCard(i)));
      } catch (e) { out.innerHTML = `<div class="card">${ui.esc(e.message)}</div>`; }
    };
    view.querySelector('#ev').onclick = () => run('network');
    view.querySelector('#ice').onclick = () => run('icebreakers');
    // TODO (Networking): follow-up message drafts, "goal for tonight" tracker, contacts met list.
  },
});
