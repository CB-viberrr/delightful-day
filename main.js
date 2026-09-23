// Game flow: menu -> levels in order -> results. Speeds up each round.
const stage = document.getElementById('stage');
const hud = document.getElementById('hud');
const timer = document.getElementById('timer');
const bar = document.getElementById('timer-bar');
const params = new URLSearchParams(location.search);
const solo = params.get('level'); // ?level=3 plays only level 3 (for testing yours)

let lives, score, index, order;

function screen(html) {
  stage.innerHTML = `<div class="screen">${html}</div>`;
  return stage.firstElementChild;
}
function updateHud(title = '') {
  hud.hidden = false;
  document.getElementById('hud-lives').textContent = '❤️'.repeat(lives) || '💀';
  document.getElementById('hud-title').textContent = title;
  document.getElementById('hud-score').textContent = '⭐ ' + score;
}

function menu() {
  hud.hidden = timer.hidden = true;
  const s = screen(`<h1>☀️ A Delightful Day</h1><p>${LEVELS.length} tiny rituals. 3 lives. Go!</p>
    <button class="big" id="play">Start your day</button>`);
  s.querySelector('#play').onclick = startRun;
}

function startRun() {
  lives = 3; score = 0; index = 0;
  order = solo ? [LEVELS[solo - 1]] : LEVELS.slice();
  next();
}

function next() {
  if (lives <= 0 || index >= order.length) return end();
  const level = order[index];
  const s = screen(`<h2>${level.title}</h2><p style="font-size:26px">${level.instructions}</p>`);
  updateHud(level.title);
  timer.hidden = true;
  setTimeout(() => runLevel(level), 1400);
}

function runLevel(level) {
  const container = document.createElement('div');
  container.style.cssText = 'position:absolute;inset:0;overflow:hidden';
  stage.innerHTML = ''; stage.appendChild(container);
  timer.hidden = false;
  const speed = 1 + index * 0.06;               // each round is a bit faster
  const duration = level.duration / speed;
  let done = false, cleanup, tick;

  const finish = (won) => {
    if (done) return; done = true;
    clearInterval(tick);
    try { cleanup && cleanup(); } catch (e) { console.error(e); }
    if (won) { score += 100; fx.confetti(container); } else { lives--; fx.shake(stage); }
    updateHud(level.title);
    const banner = document.createElement('div');
    banner.className = 'screen pop';
    banner.style.background = '#fffc';
    banner.innerHTML = `<h1>${won ? '✅ Nice!' : '💥 Oops!'}</h1>`;
    container.appendChild(banner);
    setTimeout(() => { index++; next(); }, 1000);
  };

  try {
    cleanup = level.start(container, { win: () => finish(true), lose: () => finish(false), speed });
  } catch (e) { console.error('Level crashed:', level.id, e); finish(true); } // never trap the player

  const t0 = performance.now();
  tick = setInterval(() => {
    const left = 1 - (performance.now() - t0) / 1000 / duration;
    bar.style.transform = `scaleX(${Math.max(left, 0)})`;
    if (left <= 0) finish(level.survive);
  }, 50);
}

function end() {
  hud.hidden = timer.hidden = true;
  const won = lives > 0;
  const s = screen(`<h1>${won ? '🎉 What a day!' : '😴 Rough day...'}</h1>
    <h2>Score: ${score}</h2><button class="big" id="again">Play again</button>`);
  s.querySelector('#again').onclick = menu;
  if (won) fx.confetti(stage, 80);
}

menu();
