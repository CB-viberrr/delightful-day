// SOLO "Spark": personal "what could I do tonight?" ideas. Owned by the Solo squad. Edit only this file.
const SOLO_JOKES = [
  "I tried to be spontaneous tonight, but I needed three business days' notice.",
  "I asked the group chat what we're doing tonight. 47 messages later, nobody has decided anything and someone sent a picture of a raccoon.",
  "\"I'm five minutes away\" is the biggest lie since \"I'll just watch one episode.\"",
  "I have two moods: \"let's go dancing!\" and \"if anyone texts me, tell them I've moved to the woods.\"",
  "Tonight's plan: leave the house. Backup plan: think about leaving the house. Backup backup plan: nap.",
  "Getting ready takes me two hours. Deciding to stay home takes me two seconds.",
  "My wallet is like an onion. Opening it makes me cry, so tonight's activity is free.",
  "I RSVP'd \"maybe\" to my own birthday party.",
  "Why don't skeletons go out on Friday nights? They have no body to go with.",
  "Me at 6pm: \"I'm going OUT tonight.\" Me at 9pm: in pajamas, narrating my cat's life in a British accent.",
  "I love making plans. But canceling them? That's a spiritual experience.",
  "My friends said \"come out tonight, it'll be fun.\" That's also what the iceberg told the Titanic.",
];
const SOLO_WORDS = [
  ['Lollygag', 'to spend time aimlessly', "Stop lollygagging and pick an idea!"],
  ['Kerfuffle', 'a commotion or fuss', "The group chat is in a full kerfuffle about dinner."],
  ['Petrichor', 'the lovely smell after rain', "Rain tonight? Go outside and sniff the petrichor."],
  ['Flâneur', 'someone who strolls around just to enjoy the city', "Tonight, be a flâneur."],
  ['Snollygoster', 'a clever, sneaky person', "Only a snollygoster would leave before the bill arrives."],
  ['Collywobbles', 'butterflies in your stomach', "First-date collywobbles are totally normal."],
  ['Apricity', 'the warmth of the sun in winter', "Soak up some apricity before sunset."],
  ['Bumfuzzle', 'to confuse', "Too many options can bumfuzzle anyone."],
  ['Crepuscular', 'relating to twilight', "Crepuscular walks are the best walks."],
  ['Brouhaha', 'a noisy overreaction', "Picking a restaurant shouldn't be a brouhaha."],
  ['Hygge', 'cozy, warm contentment (Danish)', "Staying in? Make it hygge: candles, blanket, snacks."],
  ['Gallivant', 'to go around having fun', "Tonight we gallivant."],
];
const SOLO_FACTS = [
  "A group of flamingos is called a \"flamboyance.\"",
  "Octopuses have three hearts and blue blood.",
  "Sea otters hold hands while sleeping so they don't drift apart.",
  "Honey never spoils. Archaeologists have found edible honey in ancient Egyptian tombs.",
  "Bananas are berries, but strawberries aren't.",
  "Wombat poop is cube-shaped.",
  "A day on Venus is longer than its year.",
  "The shortest war in history lasted about 38 minutes.",
  "The Eiffel Tower grows about 15 cm taller in summer because the metal expands.",
  "Cows can have best friends.",
];
// Open-Meteo weather codes -> [emoji, words]
const soloWeather = c => c === 0 ? ['☀️', 'Clear'] : c <= 2 ? ['🌤️', 'Partly cloudy'] : c === 3 ? ['☁️', 'Cloudy']
  : c <= 48 ? ['🌫️', 'Foggy'] : c <= 67 ? ['🌧️', 'Rainy'] : c <= 77 ? ['❄️', 'Snowy'] : c <= 82 ? ['🌦️', 'Showers'] : ['⛈️', 'Stormy'];
const soloWeatherTip = (t, c) => c >= 51 ? 'Cozy night in, or find an indoor adventure.'
  : t < 40 ? 'Bundle up! Hot cocoa weather.' : t > 80 ? 'Warm night: perfect for ice cream.' : 'Great night to be outside.';
const soloPick = list => list[Math.floor(Math.random() * list.length)];

const soloStyle = document.createElement('style');
soloStyle.textContent = `
  .solo-fun { margin-top: 36px; }
  .solo-fun h2 { font-size: 18px; color: var(--mute); margin: 0 0 12px; font-weight: 600; }
  .solo-fun-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 14px; }
  .solo-fun .card { padding: 16px; }
  .solo-fun .label { font-size: 12px; text-transform: uppercase; letter-spacing: .08em; color: var(--mute); margin-bottom: 8px; }
  .solo-fun .body { line-height: 1.45; }
  .solo-fun .word { font-size: 22px; font-weight: 800; background: linear-gradient(135deg, var(--accent), var(--accent2));
    -webkit-background-clip: text; background-clip: text; color: transparent; }
  .solo-fun .muted { color: var(--mute); font-size: 14px; margin-top: 6px; }
  .solo-fun .temp { font-size: 28px; font-weight: 800; }
  .solo-fun .clicky { cursor: pointer; user-select: none; transition: transform .15s, border-color .15s; }
  .solo-fun .clicky:hover { border-color: var(--accent2); transform: translateY(-2px); }
  .solo-pop { animation: solo-pop .35s ease; }
  @keyframes solo-pop { 0% { transform: scale(.94); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }`;
document.head.appendChild(soloStyle);

registerFeature({
  id: 'solo', label: 'Spark', icon: '✨',
  render(view) {
    view.innerHTML = `<section class="page"><h1>What could I do tonight?</h1>
      <p class="sub">Ideas tailored to your profile (${Object.keys(app.profile).length ? 'loaded' : 'fill in Profile for better ideas'}).</p>
      <div class="row"><button class="btn" id="go">Give me ideas</button><button class="btn ghost" id="wild">🎲 Surprise me</button></div>
      <div id="out" class="grid"></div>
      <div class="solo-fun"><h2>🎉 While you decide…</h2><div class="solo-fun-grid">
        <div class="card clicky" id="joke" title="Click for another joke"></div>
        <div class="card" id="word"></div>
        <div class="card" id="weather"><div class="label">🌤️ Weather tonight</div><div class="muted">Checking the sky…</div></div>
        <div class="card clicky" id="fact" title="Click for another fact"></div>
      </div></div></section>`;
    const out = view.querySelector('#out');

    // Fun corner: joke + fact change on click, word changes daily, weather is live.
    const refresh = (el, html) => { el.innerHTML = html; el.classList.remove('solo-pop'); void el.offsetWidth; el.classList.add('solo-pop'); };
    const joke = view.querySelector('#joke'), fact = view.querySelector('#fact');
    const showJoke = () => refresh(joke, `<div class="label">😂 Joke</div><div class="body">${ui.esc(soloPick(SOLO_JOKES))}</div><div class="muted">click for another</div>`);
    const showFact = () => refresh(fact, `<div class="label">🤯 Fun fact</div><div class="body">${ui.esc(soloPick(SOLO_FACTS))}</div><div class="muted">click for another</div>`);
    joke.onclick = showJoke; fact.onclick = showFact; showJoke(); showFact();
    const [w, meaning, use] = SOLO_WORDS[Math.floor(Date.now() / 864e5) % SOLO_WORDS.length];
    view.querySelector('#word').innerHTML = `<div class="label">📚 Word of the day</div><div class="word">${w}</div>
      <div class="body">${ui.esc(meaning)}</div><div class="muted">"${ui.esc(use)}"</div>`;
    (async () => {
      const box = view.querySelector('#weather'), city = app.profile.city || 'Boston';
      try {
        const geo = await (await fetch(`https://geocoding-api.open-meteo.com/v1/search?count=1&name=${encodeURIComponent(city)}`)).json();
        const place = geo.results[0];
        const wx = await (await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`)).json();
        const t = Math.round(wx.current.temperature_2m), c = wx.current.weather_code, [emoji, words] = soloWeather(c);
        box.innerHTML = `<div class="label">${emoji} Weather in ${ui.esc(place.name)}</div><div class="temp">${t}°F</div>
          <div class="body">${words}</div><div class="muted">${soloWeatherTip(t, c)}</div>`;
      } catch { box.innerHTML = `<div class="label">🌤️ Weather tonight</div><div class="body">Couldn't reach the weather. Look out the window? 🪟</div>`; }
    })();

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
