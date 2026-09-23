// Engine: registers levels, runs them, tracks lives/score. Owned by the engine person; levels don't edit this.
window.LEVELS = [];

// Level contract (see CLAUDE.md):
// registerLevel({ id, title, instructions, duration, survive, start(container, api) })
//   api.win() / api.lose()  - call exactly once when the player wins/loses
//   start may return a cleanup function (clear intervals/listeners).
//   survive:true means "surviving until the timer ends" counts as a win.
window.registerLevel = function (level) {
  window.LEVELS.push(Object.assign({ duration: 10, survive: false }, level));
};

window.fx = {
  shake(el) { el.classList.remove('shake'); void el.offsetWidth; el.classList.add('shake'); },
  pop(el) { el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); },
  confetti(container, n = 40) {
    for (let i = 0; i < n; i++) {
      const p = document.createElement('div');
      p.style.cssText = `position:absolute;left:50%;top:50%;width:10px;height:10px;pointer-events:none;
        background:hsl(${Math.random() * 360},90%,60%);border-radius:2px;transition:all 1s ease-out;`;
      container.appendChild(p);
      requestAnimationFrame(() => {
        p.style.transform = `translate(${(Math.random() - .5) * 700}px,${(Math.random() - .5) * 500}px) rotate(${Math.random() * 720}deg)`;
        p.style.opacity = 0;
      });
      setTimeout(() => p.remove(), 1100);
    }
  },
};
