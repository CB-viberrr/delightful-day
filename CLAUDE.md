# Tonight: "what should we do tonight?" web app

Hackathon project (theme: delight / everyday), 8 people, ~90 minutes. Desktop website with per-person logins.
Modes: **Spark** (personal ideas), **Saved** (saved ideas), **Group plans** (shared planner with voting), **Network** (networking ideas + icebreakers),
plus a **Profile** page whose settings customize every idea, and a **Settings** page (password, devices, delete account).

## How Claude must behave (READ FIRST)
The person you're helping is probably **new to coding**. They are your teammate on a 90-minute clock. So:
1. **Find their role:** read the file `.role` (e.g. `spark`), then read `tasks/<role>.md` and `ownership.json`. If `.role` is missing, tell them to run `./scripts/setup.sh` in the terminal and stop.
2. **Edit only files their role owns** (`ownership.json`). A hook enforces this; if you see `BLOCKED`, do not look for a workaround. Explain in one plain sentence whose file it is and suggest they ask that person or the Integrator.
3. **Speak plain English.** No jargon without a one-line explanation. Say what you're about to change and why, in 1-2 sentences, before doing it. Offer to explain anything.
4. **Small steps.** One change at a time, then tell them exactly what to look at in the browser ("refresh http://localhost:3000 and open the Spark tab"). **You run the website for them:** start `node server/index.js` in the background when asked and tell them the address; restart it yourself after any change in `server/` (stop only the process you started). They should never need to type commands.
5. **Never** read, print, edit or commit `.env`, API keys, or `data.json`. Never put a secret in code. Don't run `git push`, `git reset`, `git rebase`, `git clean`, `--force`, `rm -rf`, or `sudo`. **When they say "save", run `./scripts/save.sh "<short description of what they did>"`** (the only way to save) and report the result in plain words; if it prints 🛑 or ⚠️, explain what it means and how to fix it (e.g. `git restore` on a file that isn't theirs, after telling them). **When they say "sync" or "get the latest", run `./scripts/sync.sh`**, then restart the website if any file in `server/` changed, and tell them to refresh the browser.
6. **No new dependencies, CDN scripts, or build tools.** Plain HTML/CSS/JS only. Escape user text with `ui.esc()`. **Never write inline event handlers** (`onclick="..."`) **or inline `<script>` tags**: the site's security headers block them, so they silently do nothing. Attach handlers in JavaScript instead (`el.onclick = ...` or `addEventListener`).
7. **Protect the contracts** below. If their idea needs a contract or someone else's file to change, say so and route it to the Integrator instead of hacking around it.
8. **Aim for a working, delightful result fast:** working end-to-end first (~15 min), then polish (animation, playful copy, empty/loading/error states). If something breaks, offer to undo the last change (`git restore <their file>`).
9. If they seem stuck or confused for a while, suggest asking the person next to them or the Integrator.
10. **Teammates only use GitHub + Claude Code on their own device.** Hosting (Vercel), the database (Neon), API keys and deployment settings are managed by the Integrator only. Never ask a teammate to log in to, configure or paste anything for those, and never try to use them yourself. If a task seems to need one, say so plainly and route it to the Integrator.

## Run it
```
node server/index.js        # or: npm start   -> http://localhost:3000
```
Node 18+, **no npm install needed locally**. The Integrator may add an API key in `.env` for real Claude ideas; without one, `/api/suggest` serves built-in fallback ideas so everything still works. Never touch `.env`.
If the app's built-in browser pane is available, show the page there; otherwise give them the address.

## The live site (one shared website for the whole team)
**https://whatsthemoveboston.com** is deployed automatically from `main` on GitHub: every save (`./scripts/save.sh`) updates it about 30 seconds later, so it always shows **everyone's** saved work combined. Accounts, plans and votes there are shared by everyone (Postgres database), unlike localhost, which is private to one laptop (its data lives in `data.json`).
- After a save, tell them: "Saved! The live site updates in about 30 seconds: https://whatsthemoveboston.com". For anything involving several people (group plans, voting), suggest testing on the live site.
- **Server code runs as a serverless function on Vercel.** So in `server/`: don't write files, don't keep data in module variables between requests, no timers or background jobs. Keep all data in `db.users` / `db.plans` (plain JSON-able objects) and call `save()` after changing it. Routes that make long outside calls (like Claude) and don't change `db` must pass `{ slow: true }`. No new npm packages.
- A broken push can break the live site for everyone, so always check the change on localhost first. If the live site breaks after a save, tell them to tell the Integrator immediately (the Integrator can roll back in seconds).

## Rules
- Plain HTML/CSS/JS on the front end. No build step, no frameworks, no CDN files.
- **One owner per file.** Ownership lives in `ownership.json` (roles: integrator, profile, spark, saved, group-ui, group-api, network, design). Governance and safety rules: `GOVERNANCE.md`. Beginner guide: `START_HERE.md`.
- Keep your UI inside the container your `render()` receives. Prefix any new CSS classes with your feature name (e.g. `.solo-deck`) and put them in your feature file via an injected `<style>` so `style.css` never conflicts.
- Use shared helpers: `api()`, `app.suggest()`, `ui.ideaCard()`, `ui.toast()`, `ui.esc()` (always escape user text).
- Delight matters: animations, emoji, good empty states, playful copy. Keep it working first, then polish.

## Contracts
**Feature** (`public/features/*.js`):
```js
registerFeature({ id, label, icon, render(container, { param }) { /* build UI in container; may return cleanup fn */ } });
```
Routing is `#/<id>/<param>`; e.g. `#/group/ab12cd34` gives `param = 'ab12cd34'`.

**Profile** (`app.profile`, saved per user via `app.saveProfile(p)`):
`{ mood, energy(1-5), budget('free'|'$'|'$$'|'$$$'), vibes[], groupSize, time, interests[], goal, city, notes }` (extra fields are allowed and are sent to Claude automatically)

**Idea** (returned by `app.suggest`, rendered by `ui.ideaCard`):
`{ title, emoji, description, tags[], cost, duration, vibe, mode }`

**Saved ideas** (browser storage): key `saved:<username>` holds an `Idea[]` (Spark writes it, Saved reads/updates it; `done: true` marks completed).

**Suggest**: `app.suggest(mode, context, count)`, mode = `'solo' | 'group' | 'network' | 'icebreakers'`. Resolves `{ ideas, source: 'claude'|'fallback' }`.

**API** (all need login except register/login/me): `POST /api/register|login|logout`, `GET /api/me`, `PUT /api/profile`,
`POST /api/suggest`, `GET|POST /api/plans`, `GET /api/plans/:id` (opening joins), `POST /api/plans/:id/options`, `POST /api/plans/:id/vote`.
Agreed next (group-api builds, group-ui uses): `POST /api/plans/:id/date|comments|rsvp` (see `tasks/group-api.md`). Account (Integrator): `GET /api/account`, `POST /api/account/password|logout-others|delete`.
Security (Integrator, in `server/auth.js` + `server/index.js`): hashed session tokens, login lockout, JSON-only + same-origin POSTs, CSP headers. Don't weaken these; inline `<script>` and `onclick="..."` attributes are blocked by CSP, so attach handlers in JS.
Add new endpoints in your own server file with `route(method, path, handler)` (see `server/plans.js`).

## Saving work
`./scripts/save.sh "what I did"` commits only the caller's own files, syncs with the team (`git pull --rebase`), and pushes. Everyone works on `main`; no branches or PRs. Force-pushes to `main` are rejected by GitHub.
