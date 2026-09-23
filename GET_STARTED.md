# 🌙 Tonight: get started (15 minutes, no coding needed)

We're building a website that answers "what should we do tonight?" You'll build **one piece** of it. **Claude does all the typing.** You just copy and paste.

**Live site (everyone's work combined): https://tonight-hackathon.vercel.app**

---

## Step 1: Tell Charles two things (in the group chat)
1. Your **GitHub username** (Charles adds you, then accept the email invite from GitHub).
2. Which **piece** you want. First come, first served:

| Piece | What you build |
|---|---|
| `spark` | "What could I do tonight?" idea cards |
| `saved` | Your list of saved ideas |
| `profile` | The customization form |
| `group-ui` | Group planning screens (voting, dates) |
| `group-api` | Group planning behind the scenes |
| `network` | The networking tab |
| `design` | How it looks + the final demo |

## Step 2: Get Claude
1. Download the **Claude app** from **claude.ai/download**, install it, open it and sign in.
2. Click the **Code** tab.
3. Choose a folder: click **New Folder**, name it `hackathon`, and select it.

## Step 3: Let Claude set up your computer
Paste this into Claude. **Change `spark` in the first line to your piece.**

```
My piece is: spark

I'm a complete beginner at a hackathon. Set up my computer for a team project. Do each step yourself, and before each one tell me in one plain sentence what you're doing. Only ask me to do something when it truly needs me (a browser click or a pop-up).
1. Check that I have git, Node.js (version 18 or newer) and the GitHub CLI (gh). Install whatever is missing without needing an admin password if possible: if Homebrew is already installed, use it; otherwise download the official macOS versions of Node and gh for my chip into ~/.local and add them to my PATH in ~/.zshrc. If git is missing, run git --version: a macOS window may pop up asking to install developer tools, and if so tell me to click Install and wait.
2. Log me in to GitHub with: gh auth login --web --git-protocol https --hostname github.com. Show me the one-time code and the web address it prints, and wait while I approve it in my browser. Then run: gh auth setup-git
3. Download the team project into the current folder with: gh repo clone CB-viberrr/delightful-day. Then, inside it, run ./scripts/setup.sh with my piece name.
4. Then STOP and tell me, in one sentence, how to open the new delightful-day folder as a new session in this app.
Don't change anything else on my computer.
```

- Claude will ask permission before running things. Say **yes** to installing, downloading, git and GitHub steps. Unsure? Ask Charles.
- If a window pops up asking to install **developer tools**, click **Install** and wait.
- When Claude shows a **code**, open the web page it gives you and type the code in.

## Step 4: Start building
1. In the Code tab, start a **new session** and choose the **`delightful-day`** folder (it's inside your `hackathon` folder).
2. Paste this into Claude:

```
I'm new to coding. Read CLAUDE.md. My piece is in the file .role, so read tasks/<my piece>.md too. Start the website for me and show it to me. Then explain in plain language what my piece does and start on my first task. Whenever I say "save", run ./scripts/save.sh with a short message, and whenever I say "sync", run ./scripts/sync.sh.
```

Now just talk to Claude in plain English: "make the cards flip when I click them", "make it more playful". Look at the page after each change.

## Step 5: Save your work every 10-15 minutes
Type: **`save`**
Claude shares your work with the team, and about 30 seconds later it appears on the live site. Type **`sync`** to pull in your teammates' latest work.

---

## 4 rules
1. **Only edit your own piece.** If Claude says `BLOCKED`, that's normal: ask the owner or Charles.
2. **You never need a password or key.** Don't share any. Charles handles hosting and everything behind the scenes.
3. **Small steps.** Ask for one change, look at it, then the next. Check before you save, because a save updates the live site for everyone.
4. **Stuck for 5 minutes? Ask the person next to you, then Charles.** Anything scary: stop and ask.

Fixes for common problems: `START_HERE.md` in the project folder.
