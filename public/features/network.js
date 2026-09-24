// NETWORK: friends (add by email), invites to Saved/Spark activities, networking ideas + icebreakers. Edit only this file.
// Server: server/friends.js. The invite picker is app.inviteFriends(idea) in core.js.
registerFeature({
  id: 'network', label: 'Network', icon: '🤝',
  render(view) {
    if (!document.getElementById('net-style')) document.head.appendChild(ui.el(`<style id="net-style">
      .net-cols { display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-top:20px; }
      .net-cols .card h2, .net-box h2 { margin:0 0 10px; font-size:20px; }
      .net-box { margin-top:16px; }
      .net-person { display:flex; align-items:center; gap:10px; padding:8px 0; border-top:1px solid var(--line); }
      .net-person:first-of-type { border-top:0; }
      .net-avatar { width:34px; height:34px; border-radius:50%; display:grid; place-items:center; font-weight:800; color:#fff;
        background:linear-gradient(135deg,var(--accent),var(--accent2)); flex:none; }
      .net-person .net-who { flex:1; min-width:0; } .net-person small { color:var(--mute); display:block; overflow:hidden; text-overflow:ellipsis; }
      .net-invite { border-color:var(--accent2); animation:net-pop .4s ease-out; }
      .net-invite .net-from { color:var(--mute); font-size:14px; margin:0 0 8px; }
      .net-empty { color:var(--mute); margin:4px 0; }
      .net-tabs { display:flex; gap:6px; margin-top:24px; }
      @keyframes net-pop { from { transform:scale(.96); opacity:0; } }
      @media (max-width:700px){ .net-cols { grid-template-columns:1fr; } }</style>`));

    view.innerHTML = `<section class="page"><h1>Your people 🤝</h1>
      <p class="sub">Add friends by email, then invite them to something from Saved or Spark.</p>
      <div id="net-me"></div>
      <div id="net-inbox"></div>
      <div class="net-cols">
        <div class="card"><h2>➕ Add a friend</h2>
          <div class="row"><input id="net-email" type="email" placeholder="friend@email.com"><button class="btn small" id="net-add">Add</button></div>
          <div id="net-reqs"></div><div id="net-pending"></div></div>
        <div class="card"><h2>👯 Friends</h2><div id="net-friends">${ui.loading('Finding your people...')}</div></div>
      </div>
      <div class="card net-box"><h2>💌 Invite friends to...</h2>
        <div class="net-tabs"><button class="chip on" data-tab="saved">⭐ Saved ideas</button><button class="chip" data-tab="spark">⚡ Spark something new</button></div>
        <div id="net-acts" class="grid"></div></div>
      <div class="card net-box"><h2>🎟️ Meet new people</h2>
        <p class="sub">Tell us the setting and we'll suggest moves and conversation starters.</p>
        <div class="row"><input id="ctx" placeholder="Where/what? e.g. startup mixer, alumni dinner, new city"></div>
        <div class="row"><button class="btn" id="ev">🎟️ Where to network</button><button class="btn ghost" id="ice">💬 Icebreakers</button></div>
        <div id="out" class="grid"></div></div></section>`;
    const $ = s => view.querySelector(s);
    const initial = n => ui.esc((n || '?')[0].toUpperCase());
    let st = null;

    const act = async (fn, msg) => { try { const r = await fn(); if (msg) ui.toast(msg); return r; } catch (e) { ui.toast(e.message); } };
    const load = async () => { try { st = await api('GET', '/api/friends'); draw(); } catch (e) { $('#net-friends').innerHTML = `<p class="net-empty">${ui.esc(e.message)}</p>`; } };
    const set = r => { if (r) { st = r; draw(); } };

    function draw() {
      // Your own email: friends find you with it.
      $('#net-me').innerHTML = st.email
        ? `<p class="sub">Friends can add you with <b>${ui.esc(st.email)}</b> · <a href="#" id="net-edit">change</a></p>`
        : `<div class="card net-box"><h2>📬 What's your email?</h2><p class="sub">So friends can find you. We only use it for friend requests here, never to send mail.</p>
           <div class="row"><input id="net-mine" type="email" placeholder="you@email.com"><button class="btn small" id="net-save">Save</button></div></div>`;
      const edit = $('#net-edit');
      if (edit) edit.onclick = e => { e.preventDefault(); st.email = ''; draw(); $('#net-mine').focus(); };
      const saveMine = $('#net-save');
      if (saveMine) {
        const go = async () => set(await act(() => api('POST', '/api/friends/email', { email: $('#net-mine').value }), '📬 Saved! Friends can find you now'));
        saveMine.onclick = go; $('#net-mine').onkeydown = e => e.key === 'Enter' && go();
      }

      // Invites waiting for you.
      const inbox = $('#net-inbox'); inbox.innerHTML = '';
      if (st.invites.length) {
        inbox.appendChild(ui.el(`<h2>🎉 You're invited!</h2>`));
        const g = ui.el('<div class="grid"></div>'); inbox.appendChild(g);
        st.invites.forEach(inv => {
          const c = ui.ideaCard({ ...inv.idea, tags: [] }, [
            { label: "🙌 I'm in", onClick: async () => { const r = await act(() => api('POST', '/api/friends/invites/' + inv.id, { accept: true })); if (r && r.planId) location.hash = '#/group/' + r.planId; } },
            { label: 'Maybe not', kind: 'ghost', onClick: async () => { if (await act(() => api('POST', '/api/friends/invites/' + inv.id, { accept: false }), 'No worries 👋')) load(); } },
          ]);
          c.classList.add('net-invite');
          c.querySelector('.body').prepend(ui.el(`<p class="net-from">💌 from <b>${ui.esc(inv.from)}</b>${inv.note ? ` · “${ui.esc(inv.note)}”` : ''}</p>`));
          g.appendChild(c);
        });
      }

      // Friend requests for you + ones you sent.
      const person = (name, sub, buttons) => {
        const row = ui.el(`<div class="net-person"><div class="net-avatar">${initial(name)}</div>
          <div class="net-who">${ui.esc(name)}${sub ? `<small>${ui.esc(sub)}</small>` : ''}</div></div>`);
        for (const [label, kind, fn] of buttons) { const b = ui.el(`<button class="btn small ${kind}">${ui.esc(label)}</button>`); b.onclick = fn; row.appendChild(b); }
        return row;
      };
      const reqs = $('#net-reqs'); reqs.innerHTML = '';
      if (st.requests.length) {
        reqs.appendChild(ui.el('<h3>👋 Wants to be friends</h3>'));
        st.requests.forEach(n => reqs.appendChild(person(n, '', [
          ['Accept', '', async () => set(await act(() => api('POST', '/api/friends/respond', { username: n, accept: true }), `🎉 You and ${n} are friends!`))],
          ['✕', 'ghost', async () => set(await act(() => api('POST', '/api/friends/respond', { username: n, accept: false })))],
        ])));
      }
      const pend = $('#net-pending'); pend.innerHTML = '';
      if (st.pending.length) {
        pend.appendChild(ui.el('<h3>⏳ Waiting on</h3>'));
        st.pending.forEach(e => pend.appendChild(person(e, 'request sent', [
          ['Cancel', 'ghost', async () => set(await act(() => api('POST', '/api/friends/remove', { email: e })))],
        ])));
      }
      if (!st.requests.length && !st.pending.length) pend.innerHTML = '<p class="net-empty">They get a request here the moment they log in (or as soon as they add that email to their account).</p>';

      // Your friends.
      const fr = $('#net-friends'); fr.innerHTML = '';
      if (!st.friends.length) fr.innerHTML = '<p class="net-empty">No friends yet. Everyone starts somewhere 🌱 Add someone by email!</p>';
      st.friends.forEach(f => fr.appendChild(person(f.username, f.email, [
        ['Remove', 'ghost', async () => { if (confirm(`Remove ${f.username} from your friends?`)) set(await act(() => api('POST', '/api/friends/remove', { username: f.username }))); }],
      ])));
    }

    const add = async () => {
      const email = $('#net-email').value.trim(); if (!email) return;
      const r = await act(() => api('POST', '/api/friends/add', { email }));
      if (!r) return;
      $('#net-email').value = '';
      ui.toast(r.result === 'friends' ? '🎉 You are now friends!' : r.result === 'waiting'
        ? "📨 Saved! They'll get your request once they add this email" : '📨 Friend request sent!');
      set(r);
    };
    $('#net-add').onclick = add; $('#net-email').onkeydown = e => e.key === 'Enter' && add();

    // Invite to an activity: your Saved ideas, or fresh Spark ideas.
    const acts = $('#net-acts');
    const invite = { label: '💌 Invite friends', onClick: async i => { const id = await app.inviteFriends(i); if (id) load(); } };
    const showSaved = () => {
      let items = []; try { items = JSON.parse(localStorage['saved:' + app.user] || '[]'); } catch {}
      items = items.filter(i => !i.done);
      acts.innerHTML = items.length ? '' : '<p class="net-empty">Nothing saved yet. Tap 💾 Save on an idea in Spark, or try "Spark something new".</p>';
      items.forEach(i => acts.appendChild(ui.ideaCard(i, [invite])));
    };
    const showSpark = async () => {
      acts.innerHTML = ui.loading('Sparking ideas for you and your friends...');
      try {
        const { ideas } = await app.suggest('solo', { withFriends: true }, 4);
        acts.innerHTML = '';
        ideas.forEach(i => acts.appendChild(ui.ideaCard(i, [invite])));
        const more = ui.el('<button class="btn ghost small">🔄 Different ideas</button>'); more.onclick = showSpark; acts.appendChild(more);
      } catch (e) { acts.innerHTML = `<p class="net-empty">${ui.esc(e.message)}</p>`; }
    };
    view.querySelectorAll('.net-tabs .chip').forEach(b => (b.onclick = () => {
      view.querySelectorAll('.net-tabs .chip').forEach(x => x.classList.toggle('on', x === b));
      b.dataset.tab === 'saved' ? showSaved() : showSpark();
    }));
    showSaved();

    // Networking ideas + icebreakers.
    const out = $('#out');
    const run = async mode => {
      out.innerHTML = ui.loading();
      try {
        const { ideas } = await app.suggest(mode, { setting: $('#ctx').value, goal: app.profile.goal }, 5);
        out.innerHTML = ''; ideas.forEach(i => out.appendChild(ui.ideaCard(i)));
      } catch (e) { out.innerHTML = `<div class="card">${ui.esc(e.message)}</div>`; }
    };
    $('#ev').onclick = () => run('network');
    $('#ice').onclick = () => run('icebreakers');

    load();
    // Check for new requests/invites every 10s (skip while typing so we don't wipe input).
    const timer = setInterval(() => { if (!view.contains(document.activeElement) || document.activeElement.tagName !== 'INPUT') load(); }, 10000);
    return () => clearInterval(timer);
  },
});
