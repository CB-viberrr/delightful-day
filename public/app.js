// App shell (integrator owns): login gate, nav, hash routing (#/featureId/param).
const view = document.getElementById('view'), topbar = document.getElementById('top');
let cleanup = null;

function authScreen() {
  topbar.hidden = true;
  view.innerHTML = `<div class="auth card"><h1>🌙 Tonight</h1><p class="sub">Never wonder "what should we do?" again.</p>
    <form id="f"><input name="username" placeholder="Username" autocomplete="username" required>
    <input name="password" type="password" placeholder="Password" autocomplete="current-password" required>
    <div class="err" id="err"></div>
    <button class="btn" data-mode="login">Log in</button>
    <button class="btn ghost" data-mode="register">Create account</button></form></div>`;
  const f = view.querySelector('#f'); let mode = 'login';
  f.querySelectorAll('button').forEach(b => (b.onclick = () => (mode = b.dataset.mode)));
  f.onsubmit = async e => {
    e.preventDefault();
    try { start(await api('POST', '/api/' + mode, { username: f.username.value, password: f.password.value })); }
    catch (err) { view.querySelector('#err').textContent = err.message; }
  };
}

function start(me) {
  app.user = me.username; app.profile = me.profile || {};
  topbar.hidden = false;
  document.getElementById('nav').innerHTML = FEATURES.map(f => `<a href="#/${f.id}" data-id="${f.id}">${f.icon} ${ui.esc(f.label)}</a>`).join('');
  document.getElementById('who').innerHTML = `<span>👤 ${ui.esc(me.username)}</span> <button class="btn small ghost" id="out">Log out</button>`;
  document.getElementById('out').onclick = async () => { await api('POST', '/api/logout'); location.hash = ''; authScreen(); };
  route();
}

function route() {
  if (!app.user) return;
  const [id = FEATURES[0].id, ...rest] = location.hash.replace(/^#\//, '').split('/');
  const f = FEATURES.find(f => f.id === id) || FEATURES[0];
  document.querySelectorAll('#nav a').forEach(a => a.classList.toggle('on', a.dataset.id === f.id));
  if (cleanup) { try { cleanup(); } catch {} cleanup = null; }
  view.innerHTML = '';
  try { cleanup = f.render(view, { param: rest.join('/') }) || null; }
  catch (e) { console.error(e); view.innerHTML = `<div class="card">😵 ${ui.esc(f.label)} crashed: ${ui.esc(e.message)}</div>`; }
}
window.addEventListener('hashchange', route);

api('GET', '/api/me').then(me => (me.username ? start(me) : authScreen()));
