# Group chat message (copy/paste as ONE message)

🌙 HACKATHON: read this whole message, it has everything. Setup takes ~15 min.

WHAT WE'RE BUILDING
"Tonight" is a website that answers "what should we do tonight?" It has personal idea cards, a saved-ideas list, group plans friends can vote on, a networking helper, and a profile that customizes everything. Claude AI generates the ideas.
Keep brainstorming, but the skeleton is already built. Your job is to make YOUR piece awesome, so bring your ideas to your piece!

NO CODING NEEDED
Claude does all the typing, even the setup. You just copy and paste the boxes below.

STEP 1: Reply here with 2 things
a) your GitHub username (I'll add you, then accept the email invite from GitHub)
b) the piece you want. First come, first served:
spark = the "what could I do tonight?" idea cards
saved = the list of ideas you saved
profile = the customization form
group-ui = group planning screens (voting, dates)
group-api = group planning behind the scenes
network = networking tab
design = how it looks + the final demo
(Windows laptop? Tell me now.)

STEP 2: Install Claude
Open the app "Terminal" (press ⌘+Space, type Terminal, press Enter). Paste this line and press Enter:

curl -fsSL https://claude.ai/install.sh | bash

Then close the Terminal window and open a new one.

STEP 3: Start Claude in a new folder. Paste this line and press Enter:

mkdir -p ~/hackathon && cd ~/hackathon && claude

A browser opens: sign in with your Claude account. If it asks whether you trust the folder, say yes.

STEP 4: Let Claude set up your computer. Paste this into Claude (change "spark" to your piece, both places):

I'm a complete beginner at a hackathon. Set up my computer for a team project. Do each step yourself, and before each one tell me in one plain sentence what you're doing. Only ask me to do something when it truly needs me (a browser click or a pop-up).
1. Check that I have git, Node.js (version 18 or newer) and the GitHub CLI (gh). Install whatever is missing without needing an admin password if possible: if Homebrew is already installed, use it; otherwise download the official macOS versions of Node and gh for my chip into ~/.local and add them to my PATH in ~/.zshrc. If git is missing, run git --version: a macOS window may pop up asking to install developer tools, and if so tell me to click Install and wait.
2. Log me in to GitHub with gh auth login --web --git-protocol https --hostname github.com. Show me the one-time code and the web address it prints, and wait while I approve it in my browser. Then run gh auth setup-git.
3. Download the team project with gh repo clone CB-viberrr/delightful-day, then inside it run ./scripts/setup.sh spark (my piece is spark).
4. Then STOP and tell me to type /exit and paste: cd ~/hackathon/delightful-day && claude
Don't change anything else on my computer.

Claude will ask permission before running commands. Say yes to the ones that are installing, downloading, or setting up git and GitHub. If unsure, ask me. If a window pops up asking to install developer tools, click Install. When it shows a code, open the web page and type it in.

STEP 5: Start building. When Claude says it's done, type /exit and press Enter. Then paste this line and press Enter:

cd ~/hackathon/delightful-day && claude

Then paste this into Claude (change "spark" to your piece):

I'm new to coding. Read CLAUDE.md and tasks/spark.md (my piece is spark, also in the file .role). Start the website for me in the background and tell me the address to open. Then explain in plain language what my piece does and start on my first task. Whenever I say "save", run ./scripts/save.sh with a short message.

Open the address it gives you (http://localhost:3000) and create an account (a fake password is fine). Keep chatting with Claude about what you want to change, and refresh the page to see it.

STEP 6: Save your work every 10-15 minutes
Just type: save
Claude shares your work with the team. Nothing you do can break anyone else's part.

4 RULES
1. Only edit your own piece. If Claude says BLOCKED, that's normal. Ask the owner or me.
2. Never share or paste the API key or any password.
3. Small steps: ask Claude for one change, refresh the browser, check it, repeat.
4. Stuck for 5 minutes? Ask the person next to you, then me. Anything scary: stop and ask me.

Goal: everyone up and running by :15! Full guide in the project folder: START_HERE.md

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
