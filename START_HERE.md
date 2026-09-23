# 👋 START HERE (no coding experience needed)

You will build one piece of a real website with Claude doing the typing. Your job: **decide what it should look like and do, check it works, and save it.** You cannot break the team's work if you follow this page. The tools stop you from touching things that aren't yours.

## Part 1: Set up (10 minutes, once)
1. **Get invited:** accept the GitHub email invite from the Integrator (Charles).
2. **Open a terminal** (Mac: press ⌘+Space, type `Terminal`, Enter).
3. **Download the project** (copy each line, press Enter):
   ```
   git clone https://github.com/CB-viberrr/delightful-day
   cd delightful-day
   ./scripts/setup.sh
   ```
   `setup.sh` checks your tools and asks for your **role**. Type it exactly (your role is on the sheet the Integrator gave you). If it says Node or git is missing, install it from the link it prints, then run `./scripts/setup.sh` again.
4. **Start the website** (leave this terminal open):
   ```
   node server/index.js
   ```
   Open http://localhost:3000 in your browser and **create an account**. That's your own private copy of the site.
5. **Open a second terminal**, `cd delightful-day`, and start Claude Code: type `claude` (or open the folder in the Claude desktop app).
6. **Paste this to Claude** (it reads the rules for you):
   ```
   I'm new to coding. Read CLAUDE.md and tasks/<my role>.md (my role is in the file .role). Explain in plain language what my piece of the app does, then start on my first task.
   ```

## Part 2: Your work loop (repeat all evening)
1. **Tell Claude what you want**, in plain English. Example: "Make the idea cards flip over when I click them." Small asks beat big asks.
2. **Look at your browser** (refresh the page). Is it what you wanted? If not, tell Claude what's wrong, like you'd tell a person.
3. **If you changed something on the server** (files in `server/`), stop the website (Ctrl+C in the first terminal) and start it again with `node server/index.js`. Front-end changes need only a browser refresh.
4. **Save your work every 10-15 minutes** (in the terminal, not through Claude):
   ```
   ./scripts/save.sh "what I just did"
   ```
   That commits **only your files**, syncs with the team, and shares it. You'll see ✅. If you see 🛑 or ⚠️, read the message; it tells you what to do.

## Part 3: The 6 rules that keep everyone safe
1. **Only your files.** Your role's files are listed in `tasks/<role>.md`. Claude is blocked from editing others (you'll see "BLOCKED"). That's normal: ask the owner instead. Don't try to trick the block.
2. **Never share secrets.** Don't paste the API key anywhere, don't put it in a file that gets saved. The Integrator handles it.
3. **Save with `./scripts/save.sh` only.** Don't type raw `git push`, `git reset`, or `--force`. Those are blocked for Claude and risky for you.
4. **Small steps.** One change, look at it, then the next. If it works, save. Tiny saves are easy to undo.
5. **Say "explain that" any time.** Claude will explain in plain language. Never approve something you don't understand.
6. **Stuck for 5 minutes? Ask for help** (see below). Don't grind.

## When something goes wrong
| What you see | Do this |
|---|---|
| Page is blank / broken after a change | Ask Claude: "The page broke. Fix it, or undo your last change." |
| `BLOCKED: ... belongs to ...` | Not your file. Ask that owner (see `GOVERNANCE.md`) or the Integrator. |
| `🛑 You changed files that are not yours` | Run the `git restore <file>` command it prints, then save again. |
| `⚠️ Could not merge` | Your work is safe. Tell the Integrator. Don't force anything. |
| `Address already in use` | Another copy of the site is running. Close that terminal, or press Ctrl+C in it. |
| Login/Claude ideas stopped working | Restart the site (Ctrl+C, then `node server/index.js`). |
| You want to throw away a messy change to a file | `git restore <that file>` (ask Claude to run it). Your last saved version comes back. |
| Anything scary | Stop. Screenshot. Ask the Integrator. |

## Words you'll hear
**Repo**: the project folder on GitHub. **Commit / save**: a checkpoint of your work. **Push**: share your checkpoint. **Server**: the program that runs the site on your computer. **Front end**: what you see in the browser. **Role**: which piece is yours.
