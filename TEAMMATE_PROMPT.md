# For Charles (Integrator): how to onboard the team

**Send teammates `GET_STARTED.md`** (attach the file, or share the link https://github.com/CB-viberrr/delightful-day/blob/main/GET_STARTED.md). It has everything from zero.

Suggested chat message to go with it:
> Hackathon plan! Read this file, it has everything (15 min): https://github.com/CB-viberrr/delightful-day/blob/main/GET_STARTED.md
> Step 1 is replying here with your GitHub username + the piece you want (spark, saved, profile, group-ui, group-api, network, design). First come, first served. Windows laptop? Tell me now.

| Piece | What they build |
|---|---|
| `spark` | Personal idea cards |
| `saved` | Saved ideas list (remove, done, pick one) |
| `profile` | Customization form + persona presets |
| `group-ui` | Group planning screens |
| `group-api` | Group planning server endpoints |
| `network` | Networking tab |
| `design` | Look and feel, logo, QA, demo script |
| Integrator (you) | Shell, login, Claude prompt, hosting, deploy |

Each person's checklist is `tasks/<piece>.md`; rules and schedule are in `GOVERNANCE.md`.

Add collaborators after they reply with usernames: `gh api -X PUT repos/CB-viberrr/delightful-day/collaborators/<username> -f permission=push`
Only you manage Vercel (project `tonight-hackathon`) and Neon (project `tiny-frost-40185621`). Teammates only use GitHub + Claude Code.
