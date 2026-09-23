# 🌙 Tonight
"What should we do tonight?" for solo nights, group plans and networking. Built at a Claude hackathon.

```
node server/index.js   # http://localhost:3000, no install needed
```
**Live site (everyone's saved work combined): https://tonight-hackathon.vercel.app**

| I want to... | Read |
|---|---|
| Get set up and start building (beginner friendly) | [START_HERE.md](START_HERE.md) |
| Know my role and my checklist | `tasks/<role>.md` |
| Understand team rules, ownership and schedule | [GOVERNANCE.md](GOVERNANCE.md) |
| Understand the architecture and contracts (also what Claude reads) | [CLAUDE.md](CLAUDE.md) |
| Get started from zero (send this to teammates) | [GET_STARTED.md](GET_STARTED.md) |
| Hand out roles / onboarding notes for the Integrator | [TEAMMATE_PROMPT.md](TEAMMATE_PROMPT.md) |

Safety is built in: `.claude/settings.json` + `scripts/guard.js` stop Claude editing files that aren't yours or touching secrets, and `scripts/save.sh` only commits your own files.
