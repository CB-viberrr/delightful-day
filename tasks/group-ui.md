# Group plans: screens
**Goal:** planning with friends should feel effortless and social. You own how it **looks and behaves**; your teammate `group-api` owns the server.
**You own:** `public/features/group.js`. **Don't touch:** `server/plans.js` (that's group-api).

## Agreed new endpoints (group-api builds them; until they exist, build the screen and hide the feature if the call fails)
- `POST /api/plans/:id/date` body `{ "date": "2026-10-03T19:00" }` → returns the plan (`plan.date`)
- `POST /api/plans/:id/comments` body `{ "text": "..." }` → returns the plan (`plan.comments = [{ user, text, at }]`)
- `POST /api/plans/:id/rsvp` body `{ "status": "yes"|"maybe"|"no" }` → returns the plan (`plan.rsvps = { username: status }`)

## Tasks (in order)
1. Run the site with **two accounts** (use a private/incognito window for the second) to see voting live.
2. Highlight the **winning option** (most votes) with a crown/animation.
3. Make the invite link big and obvious with a "Copied!" moment.
4. Add date picker, RSVP buttons and a comments box that call the new endpoints (coordinate with `group-api` on the exact names above).
5. Polish: empty states, avatars/initials for members, vote animations.

## Prompts you can paste
- "Highlight the option with the most votes with a crown emoji and a subtle glow."
- "Add a comments box under the plan that posts to /api/plans/:id/comments and shows all comments."

## Done when
Two browser windows can join one plan, vote, and see each other's votes and comments within a few seconds.
