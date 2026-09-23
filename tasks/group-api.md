# Group plans: server
**Goal:** make shared plans richer on the server, so the screens have real data to show.
**You own:** `server/plans.js`. **Don't touch:** `server/index.js`, `server/db.js`, or any `public/` file. Your teammate `group-ui` builds the screens.
**You restart the server** (Ctrl+C, then `node server/index.js`) after each change.

## Build these endpoints (group-ui will call them; keep names exactly)
1. `POST /api/plans/:id/date` body `{ date }` → save `plan.date`, return the plan. Only members allowed.
2. `POST /api/plans/:id/comments` body `{ text }` → append `{ user, text, at }` to `plan.comments` (create the array if missing; limit text to 300 chars), return the plan.
3. `POST /api/plans/:id/rsvp` body `{ status }` (`yes|maybe|no`) → set `plan.rsvps[username]`, return the plan.
4. Make sure old plans (without these fields) still work: default to `date: null`, `comments: []`, `rsvps: {}`.
5. Validation and safe errors: reject bad input with a clear message (`throw new HttpError(400, '...')`).

## How to test without the screen
Ask Claude to write a small `curl` test, or just build the endpoint and tell `group-ui` it's ready. Follow the existing style in `server/plans.js`.

## Prompts you can paste
- "Read server/plans.js. Add a POST /api/plans/:id/comments endpoint like the vote endpoint, storing comments on the plan."

## Done when
All three endpoints work, and old plans don't crash the app. Tell `group-ui` out loud when each is ready.
