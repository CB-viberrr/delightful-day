// Lists changed files for your role. stdout = files you own (safe to save). stderr = files you must NOT commit. Exit 3 if any.
const { execSync } = require('child_process'), { ROOT, role, check } = require('./lib');
const r = process.argv[2] || role();
const lines = execSync('git status --porcelain -uall', { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean);
let bad = 0;
for (const l of lines) {
  const f = l.slice(3).split(' -> ').pop().replace(/^"|"$/g, '');
  const c = check(r, f);
  if (c.ok) console.log(f); else { bad++; console.error(f); }
}
process.exit(bad ? 3 : 0);
