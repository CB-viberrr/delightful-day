// Shared by guard.js and owned.js: who may edit which file (rules live in ownership.json).
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const own = JSON.parse(fs.readFileSync(path.join(ROOT, 'ownership.json'), 'utf8'));
const NEVER = [/^\.env$/, /^data\.json$/, /^\.git\//, /^\.role$/];
const match = (rel, p) => (p.endsWith('/') ? rel.startsWith(p) : rel === p);
const role = () => { try { return fs.readFileSync(path.join(ROOT, '.role'), 'utf8').trim(); } catch { return null; } };
function check(roleName, rel) {
  rel = rel.split(path.sep).join('/');
  if (NEVER.some(r => r.test(rel))) return { ok: false, reason: `${rel} is protected (secrets / local data). Nobody edits it through Claude.` };
  const r = own[roleName];
  if (!r) return { ok: false, reason: `Unknown role "${roleName}". Run ./scripts/setup.sh to pick your role.` };
  if (r.owns.includes('*') || r.owns.some(p => match(rel, p))) return { ok: true };
  const owner = Object.entries(own).find(([k, v]) => k !== 'integrator' && v.owns.some(p => match(rel, p)));
  return { ok: false, reason: `${rel} belongs to ${owner ? owner[1].label : 'the Integrator'}, not to your role (${r.label}). Do NOT edit it. Ask its owner (or the Integrator) to make that change.` };
}
module.exports = { ROOT, own, role, check };
