// Data layer. db.users / db.sessions / db.plans are plain objects; feature code mutates them, then calls save().
// - Local dev (no DATABASE_URL): JSON file data.json, zero setup.
// - Live site (DATABASE_URL set): shared Postgres (Neon), one row per document, loaded/flushed around each API request by server/index.js.
const fs = require('fs'), path = require('path');
const COLLS = ['users', 'sessions', 'plans'];
const db = { users: {}, sessions: {}, plans: {} };
const PG = !!process.env.DATABASE_URL;

let save, load, flush;
if (!PG) {
  const FILE = path.join(__dirname, '..', 'data.json');
  try { Object.assign(db, JSON.parse(fs.readFileSync(FILE, 'utf8'))); } catch {}
  let t;
  save = () => { clearTimeout(t); t = setTimeout(() => { try { fs.writeFileSync(FILE, JSON.stringify(db, null, 1)); } catch {} }, 100); };
  load = flush = async () => {};
} else {
  let sql, snap = {};
  const key = (c, id) => c + '\u0000' + id;
  async function ensure() {
    if (sql) return;
    sql = require('@neondatabase/serverless').neon(process.env.DATABASE_URL);
    await sql.query('create table if not exists kv (coll text not null, id text not null, data jsonb not null, primary key (coll, id))');
  }
  save = () => {}; // flush() diffs and writes changed documents after each request
  load = async () => {
    await ensure();
    const rows = await sql.query('select coll, id, data from kv');
    for (const c of COLLS) db[c] = {};
    snap = {};
    for (const r of rows) if (db[r.coll]) { db[r.coll][r.id] = r.data; snap[key(r.coll, r.id)] = JSON.stringify(r.data); }
  };
  flush = async () => {
    const ops = [], seen = new Set();
    for (const c of COLLS) for (const [id, v] of Object.entries(db[c])) {
      const k = key(c, id), s = JSON.stringify(v); seen.add(k);
      if (snap[k] !== s) {
        snap[k] = s;
        ops.push(sql.query('insert into kv (coll, id, data) values ($1, $2, $3::jsonb) on conflict (coll, id) do update set data = excluded.data', [c, id, s]));
      }
    }
    for (const k of Object.keys(snap)) if (!seen.has(k)) {
      const [c, id] = k.split('\u0000'); delete snap[k];
      ops.push(sql.query('delete from kv where coll = $1 and id = $2', [c, id]));
    }
    await Promise.all(ops);
  };
}
module.exports = { db, save, load, flush, PG };
