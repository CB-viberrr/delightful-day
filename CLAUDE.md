# A Delightful Day: microgame collection

Web game for a 90-minute hackathon (theme: delight / everyday). The player runs through a day of
tiny 5-15 second mini-games ("levels"), 3 lives, each round slightly faster.

## Rules
- Plain HTML/CSS/JS. **No build step, no npm, no frameworks, no external files.** Must work by opening `index.html`.
- **Each teammate owns exactly one file: `levels/level-0N.js`. Only edit your own file.**
  Do not touch `engine.js`, `main.js`, `index.html`, `style.css` (ask the engine owner instead).
- Put your level's CSS inline via `element.style` / `style.cssText` (or inject a `<style>` in `start`) so files never conflict.
- Emoji are great as free graphics. Keep it colorful, juicy, and funny. Delight > complexity.
- One mechanic, one verb, winnable in under 10 seconds. Playable with mouse/touch OR arrow keys.

## Level contract
```js
registerLevel({
  id: 'unique-id',
  title: '☕ Brew Coffee',          // shown before the level
  instructions: 'Hold to pour, release at the line!',  // short imperative
  duration: 8,                     // seconds; timer shown by engine
  survive: false,                  // true = surviving until time runs out is a WIN (dodge games)
  start(container, { win, lose, speed }) {
    // build your game inside `container` (position:absolute children work; it's ~900x560 and overflow hidden)
    // call win() or lose() exactly once. `speed` >= 1 gets bigger each round; use it to scale difficulty.
    // Timeout: engine calls lose() (or win() if survive:true) for you.
    return () => { /* optional cleanup: clearInterval, removeEventListener on document/window */ };
  },
});
```
Helpers: `fx.shake(el)`, `fx.pop(el)`, `fx.confetti(container)`. See `levels/level-01.js` for a working example.

## Testing your level alone
Open `index.html?level=N` (N = your level number) to play only your level.
Serve locally with `python3 -m http.server 8000` then visit http://localhost:8000/?level=N, or just open the file.

## Git workflow
- `git pull --rebase` before every push. Commit + push small and often (every ~10-15 min).
- Only your own level file changes, so conflicts should not happen. If one does, keep both sides and ask.

## Level ideas (slots)
1 Wake Up (smash snooze, done) · 2 Brew Coffee (timing) · 3 Perfect Toast (timing) · 4 Commute (dodge)
5 Inbox Zero (click fast) · 6 Water the Plants (drag) · 7 Wrangle the Cat (mouse follow) · 8 Bedtime Stars (click sequence)
