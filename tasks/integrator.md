# Integrator (Charles)
**Goal:** the app stays working, everyone is unblocked, and it's deployed and demo-ready.
**Owns:** everything not owned by another role (shell, auth, `server/suggest.js`, `index.html`, docs, deploy).

## Tasks
1. Invite teammates on GitHub. Fill in the names in `GOVERNANCE.md` and hand out roles (read the role name aloud; it must match exactly).
2. Put the Anthropic API key in your own `.env` (see `.env.example`). Share it privately only if teammates need real Claude on their machines; otherwise they use fallback ideas and that is fine.
3. Improve the prompt and fallback lists in `server/suggest.js` (make ideas more delightful, more personal). Add new modes only when a teammate asks.
4. Every ~10 min: `git pull`, run the app, click every tab. Announce breakage immediately.
5. **Live site (already set up):** https://whatsthemoveboston.com auto-deploys from `main` (Vercel project `tonight-hackathon`, database on Neon project `tiny-frost-40185621`). To get real Claude ideas on it, add the key yourself in Vercel → tonight-hackathon → Settings → Environment Variables (name `ANTHROPIC_API_KEY`, Production), then redeploy. Never put it in git or chat.
   If a bad save breaks the live site: ask Claude to roll back to the previous deployment, tell the owner, and have them fix it. After the event: turn Vercel Authentication back on and delete the Neon project.
6. Write the 60-second demo script with Design.

## Done when
All tabs work on the deployed URL, and someone who has never seen it can log in and get ideas within 30 seconds.
