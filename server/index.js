// Server core (integrator owns). Runs locally (node server/index.js) AND on Vercel (api/[...path].js exports `handler`).
// Feature routes live in the other server/*.js files.
const http = require('http'), fs = require('fs'), path = require('path');
try { for (const l of fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8').split('\n')) {
  const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2]; } } catch {}

const { load, flush, PG } = require('./db');
const routes = [];
class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }
// route('POST', '/api/plans/:id/join', async ({ params, body, user, req, res }) => returnJson, { auth: true, slow: false })
// slow:true = handler makes long outside calls (like Claude) and must NOT change db data.
function route(method, pattern, handler, { auth = true, slow = false } = {}) {
  const keys = [];
  const re = new RegExp('^' + pattern.replace(/:(\w+)/g, (_, k) => (keys.push(k), '([^/]+)')) + '$');
  routes.push({ method, re, keys, handler, auth, slow });
}
const app = { route, HttpError };
// One broken feature file must never take the whole site down: skip it and keep going.
const MODULES = { auth: () => require('./auth'), profile: () => require('./profile'), suggest: () => require('./suggest'), plans: () => require('./plans'), friends: () => require('./friends') };
for (const [name, get] of Object.entries(MODULES)) {
  try { get()(app); } catch (e) { console.error(`⚠️ server/${name}.js failed to load and was skipped:`, e.message); }
}
let userFrom = () => null;
try { userFrom = require('./auth').userFrom; } catch {}

// On the live site each request does load -> handle -> flush against the shared database, one at a time (so no lost updates).
let chain = Promise.resolve();
const locked = fn => { const p = chain.then(fn, fn); chain = p.catch(() => {}); return p; };

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json' };
const PUBLIC = path.join(__dirname, '..', 'public');

const MAX_BODY = 100000; // bytes
async function readBody(req) {
  if (req.method === 'GET') return {};
  // Only accept JSON, and only from our own site: stops other websites from posting forms as a logged-in user (CSRF).
  if (!/^application\/json\b/i.test(req.headers['content-type'] || '')) throw new HttpError(415, 'Send JSON');
  const origin = req.headers.origin;
  let host = null; try { host = origin && new URL(origin).host; } catch {}
  if (origin && host !== req.headers.host) throw new HttpError(403, 'Cross-site request blocked');
  if (+req.headers['content-length'] > MAX_BODY) throw new HttpError(413, 'Request too large');
  if (req.body && typeof req.body === 'object') return req.body; // Vercel pre-parses JSON
  let s = ''; for await (const c of req) { s += c; if (s.length > MAX_BODY) throw new HttpError(413, 'Request too large'); }
  try { return s ? JSON.parse(s) : {}; } catch { throw new HttpError(400, 'Bad JSON'); }
}

// Browser safety headers (the live site sets the same ones in vercel.json for static files).
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'same-origin',
  'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://api.open-meteo.com https://geocoding-api.open-meteo.com; frame-ancestors 'none'; base-uri 'none'; form-action 'self'",
};

async function handler(req, res) {
  const url = new URL(req.url, 'http://x');
  for (const [k, v] of Object.entries(SECURITY_HEADERS)) res.setHeader(k, v);
  if (url.pathname.startsWith('/api/')) res.setHeader('Cache-Control', 'no-store');
  try {
    if (url.pathname.startsWith('/api/')) {
      const r = routes.find(r => r.method === req.method && r.re.test(url.pathname));
      if (!r) throw new HttpError(404, 'Not found');
      const m = url.pathname.match(r.re);
      const params = Object.fromEntries(r.keys.map((k, i) => [k, decodeURIComponent(m[i + 1])]));
      const body = await readBody(req);
      const exec = async () => {
        const user = userFrom(req);
        if (r.auth && !user) throw new HttpError(401, 'Please log in');
        return r.handler({ params, body, user, req, res, query: url.searchParams });
      };
      let out;
      if (!PG) out = await exec();
      else if (r.slow) { await locked(load); out = await exec(); }
      // flush even when the handler throws (e.g. a failed login must still save its lockout counter)
      else out = await locked(async () => { await load(); try { return await exec(); } finally { await flush(); } });
      res.writeHead(200, { 'content-type': 'application/json', ...res.getHeaders() });
      return res.end(JSON.stringify(out ?? { ok: true }));
    }
    let file = path.join(PUBLIC, path.normalize(url.pathname === '/' ? '/index.html' : url.pathname));
    if (!file.startsWith(PUBLIC) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) throw new HttpError(404, 'Not found');
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  } catch (e) {
    const status = e.status || 500; if (status === 500) console.error(e);
    res.writeHead(status, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: status === 500 ? 'Something went wrong on the server' : e.message }));
  }
}

module.exports = { handler };
if (require.main === module) {
  const port = process.env.PORT || 3000;
  http.createServer(handler).listen(port, () => console.log('Tonight running on http://localhost:' + port));
}
