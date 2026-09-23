// GROUP planner: create a plan, add options, vote, share a link. Owned by the Group squad. Edit only this file.
// Server: server/plans.js. Share link = location.origin + '/#/group/<planId>' (opening it joins the plan).
registerFeature({
  id: 'group', label: 'Group plans', icon: '👯',
  render(view, { param }) {
    return param ? detail(view, param) : list(view);
  },
});

async function list(view) {
  view.innerHTML = `<section class="page"><h1>Plan something together</h1>
    <div class="row"><input id="t" placeholder="Name your plan (e.g. Friday hangout)"><button class="btn" id="new">Create plan</button></div>
    <div id="out" class="grid"></div></section>`;
  view.querySelector('#new').onclick = async () => {
    const t = view.querySelector('#t').value.trim() || 'Tonight with friends';
    const p = await api('POST', '/api/plans', { title: t }); location.hash = '#/group/' + p.id;
  };
  const plans = await api('GET', '/api/plans'), out = view.querySelector('#out');
  out.innerHTML = plans.length ? '' : '<p class="sub">No plans yet. Create one and share the link!</p>';
  plans.forEach(p => { const c = ui.el(`<a class="card" href="#/group/${p.id}"><h3>${ui.esc(p.title)}</h3><p>${p.members.length} people · ${p.options.length} options</p></a>`); out.appendChild(c); });
}

function detail(view, id) {
  let timer;
  const draw = async () => {
    let p; try { p = await api('GET', '/api/plans/' + id); } catch (e) { view.innerHTML = `<div class="card">${ui.esc(e.message)}</div>`; return; }
    const active = document.activeElement && document.activeElement.id;
    view.innerHTML = `<section class="page"><a href="#/group">← All plans</a><h1>${ui.esc(p.title)}</h1>
      <p class="sub">👥 ${p.members.map(ui.esc).join(', ')}</p>
      <div class="row"><input id="share" readonly value="${location.origin}/#/group/${p.id}"><button class="btn small" id="copy">Copy invite link</button></div>
      <div class="row"><button class="btn" id="ai">✨ Suggest options with Claude</button></div>
      <div class="row"><input id="ot" placeholder="Add your own option"><button class="btn small" id="add">Add</button></div>
      <div id="opts" class="grid"></div></section>`;
    view.querySelector('#copy').onclick = () => { navigator.clipboard.writeText(view.querySelector('#share').value); ui.toast('Link copied!'); };
    const addOpt = async o => { await api('POST', `/api/plans/${id}/options`, o); draw(); };
    view.querySelector('#add').onclick = () => { const t = view.querySelector('#ot').value.trim(); if (t) addOpt({ title: t }); };
    view.querySelector('#ai').onclick = async e => {
      e.target.disabled = true; e.target.textContent = 'Thinking...';
      const { ideas } = await app.suggest('group', { groupSize: p.members.length, planTitle: p.title }, 4);
      for (const i of ideas) await api('POST', `/api/plans/${id}/options`, i); draw();
    };
    const opts = view.querySelector('#opts');
    [...p.options].sort((a, b) => b.votes.length - a.votes.length).forEach(o => {
      const voted = o.votes.includes(app.user);
      opts.appendChild(ui.ideaCard({ ...o, tags: [`${o.votes.length} vote${o.votes.length === 1 ? '' : 's'}`], cost: '', duration: '' },
        [{ label: voted ? '✅ Voted' : '👍 Vote', kind: voted ? '' : 'ghost', onClick: async () => { await api('POST', `/api/plans/${id}/vote`, { optionId: o.id }); draw(); } }]));
    });
    if (active) { const a = document.getElementById(active); a && a.focus(); }
  };
  draw(); timer = setInterval(() => { if (!document.activeElement || document.activeElement.tagName !== 'INPUT') draw(); }, 4000); // live-ish votes
  return () => clearInterval(timer);
  // TODO (Group squad): date/time picker, comments, "winner" highlight, RSVP, per-member availability.
}
