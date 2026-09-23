// SETTINGS: account management (change password, sign out other devices, delete account). Owned by the Integrator.
// Server: server/auth.js (/api/account, /api/account/password, /api/account/logout-others, /api/account/delete).
const SETTINGS_CSS = `<style>
.settings-stack { display:grid; gap:16px; max-width:560px; }
.settings-stack h3 { margin:0 0 6px; }
.settings-stack form { display:flex; flex-direction:column; gap:10px; }
.settings-danger { border-color:#ff7b7b66; }
.settings-danger .btn { background:#d9435a; }
</style>`;

registerFeature({
  id: 'settings', label: 'Settings', icon: '⚙️',
  render(view) {
    view.innerHTML = `${SETTINGS_CSS}<section class="page"><h1>Account settings</h1>
      <p class="sub" id="info">Loading...</p>
      <div class="settings-stack">
        <div class="card"><h3>🔑 Change password</h3>
          <form id="pw"><input type="password" name="current" placeholder="Current password" autocomplete="current-password" required>
            <input type="password" name="next" placeholder="New password (8+ characters)" autocomplete="new-password" minlength="8" required>
            <input type="password" name="again" placeholder="New password again" autocomplete="new-password" required>
            <button class="btn">Update password</button></form></div>
        <div class="card"><h3>💻 Devices</h3><p class="sub" id="devices"></p>
          <button class="btn ghost" id="others">Sign out everywhere else</button></div>
        <div class="card settings-danger"><h3>🗑️ Delete account</h3>
          <p class="sub">Removes your account, profile, votes and RSVPs for good. This can't be undone.</p>
          <form id="del"><input type="password" name="password" placeholder="Type your password to confirm" autocomplete="current-password" required>
            <button class="btn">Delete my account</button></form></div>
      </div></section>`;
    const $ = s => view.querySelector(s);

    const refresh = async () => {
      try {
        const a = await api('GET', '/api/account');
        $('#info').textContent = `Signed in as ${a.username}${a.created ? ' · member since ' + new Date(a.created).toLocaleDateString() : ''}`;
        $('#devices').textContent = a.sessions > 1 ? `You're signed in on ${a.sessions} devices/browsers.` : 'Only this browser is signed in.';
      } catch (e) { $('#info').textContent = e.message; }
    };

    $('#pw').onsubmit = async e => {
      e.preventDefault(); const f = e.target;
      if (f.next.value !== f.again.value) return ui.toast("New passwords don't match");
      try { await api('POST', '/api/account/password', { current: f.current.value, password: f.next.value }); f.reset(); ui.toast('Password changed 🔒 Other devices were signed out'); refresh(); }
      catch (err) { ui.toast(err.message); }
    };
    $('#others').onclick = async () => {
      try { await api('POST', '/api/account/logout-others'); ui.toast('Signed out everywhere else'); refresh(); } catch (err) { ui.toast(err.message); }
    };
    $('#del').onsubmit = async e => {
      e.preventDefault();
      if (!confirm('Really delete your account? This cannot be undone.')) return;
      try {
        await api('POST', '/api/account/delete', { password: e.target.password.value });
        try { localStorage.removeItem('saved:' + app.user); localStorage.removeItem('network:' + app.user); } catch {}
        location.hash = ''; location.reload();
      } catch (err) { ui.toast(err.message); }
    };
    refresh();
  },
});
