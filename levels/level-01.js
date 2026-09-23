// Level 1: Snooze Smash. Worked example: copy this shape for your level.
registerLevel({
  id: 'snooze',
  title: '⏰ Wake Up!',
  instructions: 'Smash the alarm clock 5 times!',
  duration: 8,
  start(container, { win }) {
    let hits = 0;
    const clock = document.createElement('button');
    clock.textContent = '⏰';
    clock.style.cssText = 'position:absolute;font-size:80px;background:none;border:none;cursor:pointer';
    container.appendChild(clock);
    const move = () => {
      clock.style.left = Math.random() * (container.clientWidth - 100) + 'px';
      clock.style.top = Math.random() * (container.clientHeight - 100) + 'px';
    };
    move();
    clock.onclick = () => { fx.pop(clock); if (++hits >= 5) win(); else move(); };
    // no cleanup needed: the engine removes the container. Return a function if you use intervals.
  },
});
