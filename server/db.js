// Tiny JSON-file "database". db.users / db.sessions / db.plans are plain objects; call save() after changes.
const fs = require('fs'), path = require('path');
const FILE = path.join(__dirname, '..', 'data.json');
const db = { users: {}, sessions: {}, plans: {} };
try { Object.assign(db, JSON.parse(fs.readFileSync(FILE, 'utf8'))); } catch {}
let t;
function save() { clearTimeout(t); t = setTimeout(() => fs.writeFileSync(FILE, JSON.stringify(db, null, 1)), 100); }
module.exports = { db, save };
