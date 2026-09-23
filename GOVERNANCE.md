# Team governance (short, so it gets read)

## 1. Roles and ownership
Source of truth is `ownership.json` (enforced by `scripts/guard.js` and `scripts/save.sh`). **One owner per file.** Fill in the names:

| Role | Person | Owns | Task sheet |
|---|---|---|---|
| Integrator | Charles | shell, auth, Claude prompt (`server/suggest.js`), deploy, everything not listed below | `tasks/integrator.md` |
| `profile` | ___ | `public/features/profile.js`, `server/profile.js` | `tasks/profile.md` |
| `spark` | ___ | `public/features/solo.js` | `tasks/spark.md` |
| `saved` | ___ | `public/features/saved.js` | `tasks/saved.md` |
| `group-ui` | ___ | `public/features/group.js` | `tasks/group-ui.md` |
| `group-api` | ___ | `server/plans.js` | `tasks/group-api.md` |
| `network` | ___ | `public/features/network.js` | `tasks/network.md` |
| `design` | ___ | `public/style.css`, `public/assets/` | `tasks/design.md` |

## 2. Decision rights
- **Your file, your call.** Nobody overrules you inside your file unless it breaks the app or a contract.
- **Contracts** (in `CLAUDE.md`: feature, profile, idea, suggest, API) change only when the Integrator approves and announces it to the table.
- **Need a change in someone else's file?** Ask the owner directly, in person (you're at one table). If they're busy or it's shared, the Integrator decides in under a minute.
- **Disagreements about scope or look:** design owner decides look, Integrator decides scope. No debates over 2 minutes.

## 3. Safety rules (non-negotiable)
1. **Secrets:** `.env` and the Anthropic API key never enter git, chat, screenshots or files. Only the Integrator holds the key. This repo is **public**.
2. **No destructive git.** Never force-push, hard-reset, rebase, delete branches or rewrite history. (Blocked in Claude settings, and GitHub rejects force-pushes to `main`.)
3. **Save only through `./scripts/save.sh`.** It commits only your files.
4. **Don't commit** `data.json` (local accounts), `.env`, `.role`, `node_modules`. They're git-ignored, and the tools refuse them.
5. **Escape all user text** shown in the page with `ui.esc()`. **No** third-party scripts, no CDN links, no new dependencies without Integrator approval.
6. **Don't collect real personal data.** Use fake accounts and made-up passwords for the demo. Say "demo only" if asked.
7. **Never approve a prompt you don't understand.** Ask Claude to explain, or ask a teammate.

## 4. How work flows
- Everyone works on `main`, in their own files, and saves small and often (every 10-15 min). No branches, no pull requests: at 90 minutes, speed and safety come from file ownership.
- **Never leave the app broken.** Before saving: refresh the site, click through your tab. If it crashes, fix or `git restore` first.
- The Integrator pulls regularly, runs the app, and checks that all tabs load. If something breaks main, the owner of the failing file fixes it first, at any priority.

**The live site:** https://tonight-hackathon.vercel.app redeploys from `main` about 30 seconds after every save, so it always shows everyone's saved work together (shared accounts, plans and votes). Check on localhost *first*, then save, then look at the live site. If the live site breaks after your save, tell the Integrator immediately; they can roll back in seconds, then you fix your file.

## 5. Definition of done (for your piece)
- [ ] Works when you click through it, with a **fresh account** and with a **filled-in profile**
- [ ] Has an empty state, a loading state and a friendly error message
- [ ] Looks good at a normal laptop window
- [ ] User text is escaped; no console errors
- [ ] Saved and shared with `./scripts/save.sh`

## 6. Schedule and checkpoints
| Time | Everyone |
|---|---|
| 0:00-0:15 | Setup (`START_HERE.md`), roles assigned, everyone sees the site running |
| 0:15-0:20 | **Checkpoint 1:** every person has saved once (proves the pipeline works) |
| 0:20-0:55 | Build your first tasks in `tasks/<role>.md` |
| 0:55-1:00 | **Checkpoint 2:** every tab works end to end. Stop starting new features |
| 1:00-1:15 | Integrate, fix bugs, polish. Integrator deploys |
| 1:15-1:30 | **Freeze at 1:15.** Only bug fixes. Rehearse the 60-second demo |

## 7. Escalation
Stuck 5 minutes → ask the person beside you → ask the Integrator. Integrator is the tiebreaker and fixer for anything touching shared files, git problems, or the API key.
