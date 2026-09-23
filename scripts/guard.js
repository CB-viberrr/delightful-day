// Claude Code hook: blocks Edit/Write on files that aren't yours. Exit 2 = blocked (message goes back to Claude).
const path = require('path'), { ROOT, role, check } = require('./lib');
let s = ''; process.stdin.on('data', d => (s += d)).on('end', () => {
  let input; try { input = JSON.parse(s); } catch { process.exit(0); }
  const f = (input.tool_input || {}).file_path || (input.tool_input || {}).notebook_path;
  if (!f) process.exit(0);
  const rel = path.relative(ROOT, path.resolve(ROOT, f));
  if (rel.startsWith('..')) process.exit(0); // outside this repo: normal permission prompts apply
  const r = role();
  if (!r) { console.error('BLOCKED: no role set. Tell the user to run ./scripts/setup.sh in the terminal first.'); process.exit(2); }
  const c = check(r, rel);
  if (!c.ok) { console.error('BLOCKED: ' + c.reason); process.exit(2); }
});
