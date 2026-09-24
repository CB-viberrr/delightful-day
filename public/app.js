// App shell (integrator owns): login gate, nav, hash routing (#/featureId/param).
const view = document.getElementById('view'), topbar = document.getElementById('top');
let cleanup = null;

function authScreen(mode = 'login') {
  topbar.hidden = true;
  const reg = mode === 'register';
  view.innerHTML = `<div class="auth card"><h1>🌙 Tonight</h1><p class="sub">${reg ? 'Make an account in 10 seconds.' : 'Never wonder "what should we do?" again.'}</p>
    <form id="f"><input name="username" placeholder="${reg ? 'Pick a username' : 'Username or email'}" autocomplete="username" required>
    ${reg ? '<input name="email" type="email" placeholder="Email (optional, lets you reset your password)" autocomplete="email">' : ''}
    <input name="password" type="password" placeholder="${reg ? 'Password (8+ characters)' : 'Password'}" autocomplete="${reg ? 'new-password' : 'current-password'}" required>
    <div class="err" id="err"></div>
    <button class="btn">${reg ? 'Create account' : 'Log in'}</button>
    <button type="button" class="btn ghost" id="switch">${reg ? 'I already have an account' : 'Create account'}</button>
    ${reg ? '' : '<a href="#" class="auth-link" id="forgot">Forgot password?</a>'}</form></div>`;
  const f = view.querySelector('#f');
  view.querySelector('#switch').onclick = () => authScreen(reg ? 'login' : 'register');
  if (!reg) view.querySelector('#forgot').onclick = e => { e.preventDefault(); forgotScreen(); };
  f.onsubmit = async e => {
    e.preventDefault();
    const body = { username: f.username.value, password: f.password.value };
    if (reg && f.email.value.trim()) body.email = f.email.value.trim();
    try { start(await api('POST', '/api/' + mode, body)); }
    catch (err) { view.querySelector('#err').textContent = err.message; }
  };
}

function forgotScreen() {
  topbar.hidden = true;
  view.innerHTML = `<div class="auth card"><h1>🔑 Forgot password?</h1><p class="sub">Enter the email on your account and we'll send you a reset link.</p>
    <form id="f"><input name="email" type="email" placeholder="you@example.com" autocomplete="email" required>
    <div class="err" id="err"></div><button class="btn">Send reset link</button>
    <button type="button" class="btn ghost" id="back">Back to log in</button></form></div>`;
  const f = view.querySelector('#f');
  view.querySelector('#back').onclick = () => authScreen();
  f.onsubmit = async e => {
    e.preventDefault();
    try {
      await api('POST', '/api/password/forgot', { email: f.email.value });
      view.querySelector('.auth').innerHTML = `<h1>📬 Check your inbox</h1><p class="sub">If an account uses <b>${ui.esc(f.email.value)}</b>, a reset link is on its way. It works for 30 minutes.</p>
        <p class="sub">No email on your account? Ask a teammate or the Integrator for help.</p><button class="btn ghost" id="back">Back to log in</button>`;
      view.querySelector('#back').onclick = () => authScreen();
    } catch (err) { view.querySelector('#err').textContent = err.message; }
  };
}

function resetScreen(token) {
  topbar.hidden = true;
  view.innerHTML = `<div class="auth card"><h1>🔒 New password</h1><p class="sub">Choose a new password for your account.</p>
    <form id="f"><input name="password" type="password" placeholder="New password (8+ characters)" autocomplete="new-password" minlength="8" required>
    <input name="again" type="password" placeholder="New password again" autocomplete="new-password" required>
    <div class="err" id="err"></div><button class="btn">Save and log in</button></form></div>`;
  const f = view.querySelector('#f');
  f.onsubmit = async e => {
    e.preventDefault();
    if (f.password.value !== f.again.value) return (view.querySelector('#err').textContent = "Passwords don't match");
    try {
      const me = await api('POST', '/api/password/reset', { token, password: f.password.value });
      history.replaceState(null, '', location.pathname + '#/' + FEATURES[0].id); // drop the one-time token from the address bar
      ui.toast('Password changed 🔒'); start(me);
    } catch (err) { view.querySelector('#err').textContent = err.message; }
  };
}

function start(me) {
  app.user = me.username; app.profile = me.profile || {};
  topbar.hidden = false;
  document.getElementById('nav').innerHTML = FEATURES.map(f => `<a href="#/${f.id}" data-id="${f.id}">${f.icon} ${ui.esc(f.label)}</a>`).join('');
  document.getElementById('who').innerHTML = `<span>👤 ${ui.esc(me.username)}</span> <button class="btn small ghost" id="out">Log out</button>`;
  document.getElementById('out').onclick = async () => { await api('POST', '/api/logout'); app.user = null; app.profile = {}; location.hash = ''; authScreen(); };
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

const resetToken = (location.hash.match(/^#\/reset\/([a-f0-9]{64})$/) || [])[1];
if (resetToken) resetScreen(resetToken);
else api('GET', '/api/me').then(me => (me.username ? start(me) : authScreen()));
