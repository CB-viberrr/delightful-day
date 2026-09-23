# 👋 START HERE (no coding experience needed)

You will build one piece of a real website, and **Claude does all the typing**, including the setup. Your job: **decide what it should look like and do, check it works, and say "save".** You only use **GitHub** and **Claude on your own laptop**. Hosting, databases and keys are handled by the Integrator (Charles), so you never touch them. The tools stop you from touching things that aren't yours, so you can't break the team's work.

**The live site (everyone's saved work combined): https://tonight-hackathon.vercel.app**

## Part 1: Set up (about 15 minutes, once)
The exact copy/paste steps are in the group-chat message (also saved in `TEAMMATE_PROMPT.md`). In short:
1. Send Charles your GitHub username, then accept the GitHub email invite.
2. **Get the Claude app** (claude.ai/download), sign in, and open the **Code** tab.
3. **Pick a folder** called `hackathon` (use "New Folder" in the folder chooser).
4. **Paste the setup prompt** from the message. Claude installs what's missing, logs you in to GitHub, downloads the project and picks your role.
5. **Start a new session** in the Code tab, choose the `delightful-day` folder inside `hackathon`, and paste the "start building" prompt. Claude starts the website and shows it to you.

**Coming back later:** open the Claude app → Code tab → new session → choose the `delightful-day` folder, then tell Claude: "Start the website and remind me what my task is."

## Part 2: Your work loop (repeat all evening)
1. **Tell Claude what you want**, in plain English. Example: "Make the idea cards flip over when I click them." Small asks beat big asks.
2. **Look at the page Claude shows you.** Is it what you wanted? If not, tell Claude what's wrong, like you'd tell a person.
3. **Say "save"** every 10-15 minutes. Claude runs `./scripts/save.sh`, which commits **only your files**, syncs with the team, and shares your work. You'll see ✅. About 30 seconds later your work is on the live site for everyone.
4. If Claude changed something on the server (files in `server/`), tell it "restart the website".
5. **Say "sync"** to pull your teammates' latest work onto your laptop (then look at the page again). Saving also syncs.

**Check before you save:** a save goes live for everyone, so look at your change first.

## Part 3: The 6 rules that keep everyone safe
1. **Only your files.** Your role's files are listed in `tasks/<role>.md`. Claude is blocked from editing others (you'll see "BLOCKED"). That's normal: ask the owner instead. Don't try to trick the block.
2. **Never share secrets.** You never need a password or key. If something asks for one, stop and ask the Integrator.
3. **Save only with "save".** Don't run raw `git push`, `git reset`, or `--force`. Those are blocked for Claude and risky for you.
4. **Small steps.** One change, look at it, then the next. If it works, save. Tiny saves are easy to undo.
5. **Say "explain that" any time.** Claude will explain in plain language. Never approve something you don't understand.
6. **Stuck for 5 minutes? Ask for help** (see below). Don't grind.

## When something goes wrong
| What you see | Do this |
|---|---|
| Page is blank / broken after a change | Tell Claude: "The page broke. Fix it, or undo your last change." |
| `BLOCKED: ... belongs to ...` | Not your file. Ask that owner (see `GOVERNANCE.md`) or the Integrator. |
| Save says `🛑 You changed files that are not yours` | Tell Claude: "Undo the changes to files that aren't mine, then save again." |
| Save says `⚠️ Could not merge` | Your work is safe. Tell the Integrator. Don't force anything. |
| Page won't load | Tell Claude: "Restart the website." |
| The live site broke after your save | Tell the Integrator right away (they can roll it back in seconds), then ask Claude to fix your file. |
| Setup got stuck or a command failed | Tell Claude: "That failed. Explain what went wrong and fix it." Still stuck after 5 minutes: ask the Integrator. |
| You want to throw away a messy change | Tell Claude: "Undo my unsaved changes to my file." Your last saved version comes back. |
| Anything scary | Stop. Screenshot. Ask the Integrator. |

## Words you'll hear
**Repo**: the project folder on GitHub. **Commit / save**: a checkpoint of your work. **Push**: share your checkpoint. **Server**: the program that runs the site. **Front end**: what you see in the browser. **Role / piece**: which part of the app is yours. **Live site**: the real, shared website that updates from everyone's saves.
