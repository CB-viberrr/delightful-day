// Level 8: Wrangle the Cat. OWNER: (put your name here). Only edit this file.
// Placeholder: click the button to win. Replace start() with your mini-game; see level-01.js and CLAUDE.md.
registerLevel({
  id: 'level8',
  title: '🚧 Wrangle the Cat',
  instructions: 'TODO: describe the goal in a few words',
  duration: 8,
  start(container, { win, lose }) {
    const b = document.createElement('button');
    b.className = 'big'; b.textContent = 'Placeholder: click to win';
    b.style.cssText = 'position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)';
    b.onclick = win;
    container.appendChild(b);
  },
});
