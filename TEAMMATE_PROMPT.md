# Group chat message (copy/paste as ONE message)

🌙 HACKATHON: read this whole message, it has everything. Setup takes ~15 min.

WHAT WE'RE BUILDING
"Tonight" is a website that answers "what should we do tonight?" It has: personal idea cards (Spark), a saved-ideas list, group plans friends can vote on, a networking helper, and a profile that customizes everything. Claude AI generates the ideas.
Keep brainstorming, but the skeleton is already built, so we're not debating what to build. Your job is to make YOUR piece awesome. Bring your ideas to your piece!

YOU DON'T NEED TO KNOW HOW TO CODE
Claude writes the code. You decide what it should look like and do, then check it works.

STEP 1: Reply here with 2 things
a) your GitHub username (I'll add you to the project, then accept the email invite from GitHub)
b) the piece you want. First come, first served:
- spark = the "what could I do tonight?" idea cards
- saved = the list of ideas you saved
- profile = the customization form
- group-ui = group planning screens (voting, dates)
- group-api = group planning behind the scenes
- network = networking tab
- design = how it looks + the final demo
(Windows laptop? Tell me now.)

STEP 2: Install (Mac). Open the app "Terminal" (press ⌘+Space, type Terminal, Enter)
a) Node.js: download the "LTS" installer from nodejs.org and run it
b) GitHub CLI: install from cli.github.com
c) Claude Code: paste this in Terminal, press Enter:
curl -fsSL https://claude.ai/install.sh | bash
Then close Terminal and open it again.
d) Log in to GitHub: type  gh auth login  → choose GitHub.com → HTTPS → Yes → "Login with a web browser" and follow the steps.

STEP 3: Get the project (paste one line at a time)
gh repo clone CB-viberrr/delightful-day
cd delightful-day
./scripts/setup.sh
It asks for your piece. Type it exactly (like spark).

STEP 4: Start the website
node server/index.js
Open http://localhost:3000 and create an account (fake password is fine). Leave that Terminal open.

STEP 5: Start Claude
Open a NEW Terminal tab (⌘+T), then type:
cd delightful-day
claude
Sign in if it asks, say yes to trusting the folder. Then paste this to Claude:
I'm new to coding. Read CLAUDE.md and tasks/<my piece>.md (my piece is in the file .role). Explain in plain language what my piece of the app does, then start on my first task.
(Replace <my piece> with yours, like spark.)

STEP 6: Save your work every 10-15 minutes (in Terminal, not through Claude)
./scripts/save.sh "what I did"
You'll see ✅. That's it. Nothing you do can break the team's work.

4 RULES
1. Only edit your own piece. If Claude says BLOCKED, that's normal. Ask the owner or me.
2. Never share or paste the API key or any password.
3. Small steps: ask Claude for one change, refresh the browser, check it, repeat.
4. Stuck 5 minutes? Ask the person next to you, then me. Anything scary: stop and ask me.

Full guide with fixes for common errors: START_HERE.md in the project folder. Goal: everyone up and running by :15!

---

# For Charles (Integrator), not part of the message
Role table for handing out pieces. Each person's checklist is `tasks/<role>.md`; rules are in `GOVERNANCE.md`.

| Role to type | What they build |
|---|---|
| `spark` | Personal idea cards |
| `saved` | Saved ideas list (remove, done, pick one) |
| `profile` | Customization form + persona presets |
| `group-ui` | Group planning screens |
| `group-api` | Group planning server endpoints |
| `network` | Networking tab |
| `design` | Look and feel, logo, QA, demo script |
| Integrator (you) | Shell, login, Claude prompt, deploy |

Add collaborators after they reply with usernames: `gh api -X PUT repos/CB-viberrr/delightful-day/collaborators/<username> -f permission=push`
