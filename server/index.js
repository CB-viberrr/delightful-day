// Server core (integrator owns). Zero dependencies. Feature routes live in the other server/*.js files.
const http = require('http'), fs = require('fs'), path = require('path');
try { for (const l of fs.readFileSync(path.join(__dirname, '..', '.env'), 'utf8').split('\n')) {
  const m = l.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/); if (m && !process.env[m[1]]) process.env[m[1]] = m[2]; } } catch {}

const routes = [];
class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }
// route('POST', '/api/plans/:id/join', async ({ params, body, user, req, res }) => returnJson)
function route(method, pattern, handler, { auth = true } = {}) {
  const keys = [];
  const re = new RegExp('^' + pattern.replace(/:(\w+)/g, (_, k) => (keys.push(k), '([^/]+)')) + '$');
  routes.push({ method, re, keys, handler, auth });
}
const app = { route, HttpError };
require('./auth')(app); require('./profile')(app); require('./suggest')(app); require('./plans')(app);

const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.json': 'application/json' };
const PUBLIC = path.join(__dirname, '..', 'public');

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  try {
    if (url.pathname.startsWith('/api/')) {
      const r = routes.find(r => r.method === req.method && r.re.test(url.pathname));
      if (!r) throw new HttpError(404, 'Not found');
      const m = url.pathname.match(r.re);
      const params = Object.fromEntries(r.keys.map((k, i) => [k, decodeURIComponent(m[i + 1])]));
      let body = {};
      if (req.method !== 'GET') { let s = ''; for await (const c of req) s += c; try { body = s ? JSON.parse(s) : {}; } catch { throw new HttpError(400, 'Bad JSON'); } }
      const user = require('./auth').userFrom(req);
      if (r.auth && !user) throw new HttpError(401, 'Please log in');
      const out = await r.handler({ params, body, user, req, res, query: url.searchParams });
      res.writeHead(200, { 'content-type': 'application/json', ...(res.getHeaders()) });
      return res.end(JSON.stringify(out ?? { ok: true }));
    }
    let file = path.join(PUBLIC, path.normalize(url.pathname === '/' ? '/index.html' : url.pathname));
    if (!file.startsWith(PUBLIC) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) throw new HttpError(404, 'Not found');
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  } catch (e) {
    const status = e.status || 500; if (status === 500) console.error(e);
    res.writeHead(status, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ error: e.message }));
  }
}).listen(process.env.PORT || 3000, () => console.log('Tonight running on http://localhost:' + (process.env.PORT || 3000)));
