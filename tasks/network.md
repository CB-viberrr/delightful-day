# Network
**Goal:** make networking feel approachable, even for shy people. Practical, warm, not cringe.
**You own:** `public/features/network.js`. **Don't touch:** anything else. To add a new AI "mode" (like follow-up messages) ask the Integrator; `server/suggest.js` is theirs.

## Tasks (in order)
1. Run the site, open **Network**, try both buttons. Ask Claude how the "setting" box changes the ideas.
2. Add **setting presets** as buttons: "Startup mixer", "Conference", "Friend-of-friend dinner", "Alumni event" (they fill the setting box).
3. Add a **"Goal for tonight" tracker** (e.g. "Meet 3 people"), stored in `localStorage`, with a counter and confetti-style celebration at the goal.
4. Add a **"People I met" list** (name, where, one-line note) saved in `localStorage`.
5. Polish: friendly empty states, copy button on icebreakers, nice layout.

## Prompts you can paste
- "Add four preset buttons above the setting box that fill it in when clicked."
- "Add a Goal for tonight counter with plus and minus buttons that saves in localStorage and celebrates at the goal."

## Done when
Someone heading to an event can pick a setting, get icebreakers, set a goal, and log who they met, all in one minute.
