// PROFILE: customization settings that feed every idea prompt. Owned by the Profile person. Edit only this file.
// Agreed shape (saved to app.profile): { mood, energy(1-5), budget, vibes[], groupSize, time, interests[], goal, city, notes }
registerFeature({
  id: 'profile', label: 'My profile', icon: '🎛️',
  render(view) {
    const p = app.profile, VIBES = ['cozy', 'adventurous', 'social', 'creative', 'active', 'chill', 'wild', 'cultural', 'foodie', 'nerdy'];
    const opt = (list, cur) => list.map(v => `<option ${v === cur ? 'selected' : ''}>${v}</option>`).join('');
    view.innerHTML = `<section class="page"><h1>Make it yours</h1><p class="sub">The more you tell us, the better the ideas.</p>
      <form class="card form" id="f">
        <label>Mood <select name="mood">${opt(['', 'happy', 'tired', 'restless', 'stressed', 'curious', 'lonely', 'celebrating'], p.mood)}</select></label>
        <label>Energy <input type="range" name="energy" min="1" max="5" value="${p.energy || 3}"></label>
        <label>Budget <select name="budget">${opt(['', 'free', '$', '$$', '$$$'], p.budget)}</select></label>
        <label>Time available <select name="time">${opt(['', '30 minutes', '1-2 hours', 'the whole evening'], p.time)}</select></label>
        <label>Usual group size <input type="number" name="groupSize" min="1" max="30" value="${p.groupSize || ''}"></label>
        <label>City <input name="city" value="${ui.esc(p.city || '')}" placeholder="Where are you?"></label>
        <label>Networking goal <select name="goal">${opt(['', 'meet friends', 'find collaborators', 'get hired', 'find mentors', 'just have fun'], p.goal)}</select></label>
        <label class="wide">Vibes <div class="chips" id="vibes">${VIBES.map(v => `<button type="button" class="chip ${(p.vibes || []).includes(v) ? 'on' : ''}" data-v="${v}">${v}</button>`).join('')}</div></label>
        <label class="wide">Interests (comma separated) <input name="interests" value="${ui.esc((p.interests || []).join(', '))}" placeholder="climbing, jazz, board games, AI"></label>
        <label class="wide">Anything else we should know? <textarea name="notes" rows="3" placeholder="Dietary needs, no alcohol, mobility, hates crowds...">${ui.esc(p.notes || '')}</textarea></label>
        <button class="btn">Save profile</button></form></section>`;
    view.querySelectorAll('#vibes .chip').forEach(c => (c.onclick = () => c.classList.toggle('on')));
    view.querySelector('#f').onsubmit = async e => {
      e.preventDefault(); const f = e.target;
      await app.saveProfile({ mood: f.mood.value, energy: +f.energy.value, budget: f.budget.value, time: f.time.value,
        groupSize: +f.groupSize.value || undefined, city: f.city.value, goal: f.goal.value, notes: f.notes.value,
        vibes: [...view.querySelectorAll('#vibes .chip.on')].map(c => c.dataset.v),
        interests: f.interests.value.split(',').map(s => s.trim()).filter(Boolean) });
      ui.toast('Profile saved ✅');
    };
  },
});
