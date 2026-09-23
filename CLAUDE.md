# Tonight: "what should we do tonight?" web app

Hackathon project (theme: delight / everyday), 8 people, ~90 minutes. Desktop website with per-person logins.
Three modes: **Spark** (personal ideas), **Group plans** (shared planner with voting), **Network** (networking ideas + icebreakers),
plus a **Profile** page whose settings customize every idea.

## Run it
```
node server/index.js        # or: npm start   -> http://localhost:3000
```
Node 18+, **no npm install, zero dependencies**. Optional: copy `.env.example` to `.env` and add `ANTHROPIC_API_KEY`
for real Claude ideas. Without a key, `/api/suggest` serves built-in fallback ideas so everything still works.

## Rules
- Plain HTML/CSS/JS on the front end. No build step, no frameworks, no CDN files.
- **One owner per file. Only edit your own files** (table below). Ask the owner for changes elsewhere.
- Keep your UI inside the container your `render()` receives. Prefix any new CSS classes with your feature name
  (e.g. `.solo-deck`) and put them in your feature file via an injected `<style>` so `style.css` never conflicts.
- Use shared helpers: `api()`, `app.suggest()`, `ui.ideaCard()`, `ui.toast()`, `ui.esc()` (always escape user text).
- Delight matters: animations, emoji, good empty states, playful copy. Keep it working first, then polish.

## File ownership
| File | Owner |
|---|---|
| `public/core.js`, `public/app.js`, `public/index.html`, `server/index.js`, `server/auth.js`, `server/db.js` | Integrator |
| `server/suggest.js` (Claude prompt + fallback ideas) | Integrator (prompt tweaks: Solo/Network people ask first) |
| `public/features/profile.js`, `server/profile.js` | Profile |
| `public/features/solo.js` | Solo squad (2) |
| `public/features/group.js`, `server/plans.js` | Group squad (2) |
| `public/features/network.js` | Networking |
| `public/style.css` | Design |

## Contracts
**Feature** (`public/features/*.js`):
```js
registerFeature({ id, label, icon, render(container, { param }) { /* build UI in container; may return cleanup fn */ } });
```
Routing is `#/<id>/<param>`; e.g. `#/group/ab12cd34` gives `param = 'ab12cd34'`.

**Profile** (`app.profile`, saved per user via `app.saveProfile(p)`):
`{ mood, energy(1-5), budget('free'|'$'|'$$'|'$$$'), vibes[], groupSize, time, interests[], goal, city, notes }`

**Idea** (returned by `app.suggest`, rendered by `ui.ideaCard`):
`{ title, emoji, description, tags[], cost, duration, vibe, mode }`

**Suggest**: `app.suggest(mode, context, count)`, mode = `'solo' | 'group' | 'network' | 'icebreakers'`. Resolves `{ ideas, source: 'claude'|'fallback' }`.

**API** (all need login except register/login/me): `POST /api/register|login|logout`, `GET /api/me`, `PUT /api/profile`,
`POST /api/suggest`, `GET|POST /api/plans`, `GET /api/plans/:id` (opening joins), `POST /api/plans/:id/options`, `POST /api/plans/:id/vote`.
Add new endpoints in your own server file with `route(method, path, handler)` (see `server/plans.js`); register a new server file with one line in `server/index.js` (ask the integrator).

## Git workflow
`git pull --rebase` before every push. Commit and push small and often (~10-15 min). Since files are owned individually, conflicts should not happen.
If one does, keep both sides and ask the owner.
