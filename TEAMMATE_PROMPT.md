# Setup + prompt for teammates

## 1. Get the code (once)
```
git clone https://github.com/CB-viberrr/delightful-day
cd delightful-day
node server/index.js        # open http://localhost:3000, create an account
```
(Accept the GitHub collaborator invite first. Needs Node 18+; nothing to install.)
Then, in a second terminal in the same folder, run `claude`.

## 2. Paste this into Claude Code (fill in your role)
```
I'm on an 8-person team building "Tonight", a "what should we do tonight?" web app, in a 90-minute hackathon.
Read CLAUDE.md fully first. My role: ___ (Profile / Solo / Group / Network / Design). I only edit the files
CLAUDE.md lists for my role. Read my feature file, then make it excellent: working end-to-end first (~15 minutes),
then polish and delight (animations, playful copy, empty states, error handling). Restart the server
(node server/index.js) to test server changes; refresh the browser for front-end changes.
Commit small and push often with `git pull --rebase` first. Tell me before you touch anyone else's files.
My specific ideas: ___
```

## Roles
1. Integrator: shell, auth, Claude prompt, deploy (Charles)
2. Profile: customization form (`features/profile.js`)
3-4. Solo squad: `features/solo.js` (saved list, swipe cards, mood picker, regenerate). Split: one on UI, one on the Claude prompt/quality in `server/suggest.js` with the integrator's OK.
5-6. Group squad: `features/group.js` + `server/plans.js` (dates, comments, winner, RSVP)
7. Network: `features/network.js`
8. Design & demo: `style.css`, visual polish, testing, demo script
