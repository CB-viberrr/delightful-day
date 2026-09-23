# Profile
**Goal:** make personalizing the app feel fun and quick. Every setting here shapes the ideas everyone gets.
**You own:** `public/features/profile.js`, `server/profile.js`. **Don't touch:** anything else.

## Tasks (in order)
1. Run the site, open the **My profile** tab, try it. Ask Claude to explain how the form saves.
2. Add live feedback: a "profile completeness" bar that fills up as fields are answered.
3. Add **quick persona buttons** (e.g. "Cozy night in", "Social butterfly", "Budget explorer") that fill the form in one click.
4. Add new fields people care about, such as "things I dislike", "who I'm usually with", "dealbreakers". Adding fields is safe: the whole profile is sent to Claude automatically.
5. Polish: friendly saved animation, validation messages, nice layout.

## Prompts you can paste
- "Add a progress bar showing how complete my profile is, and make it fill smoothly."
- "Add three buttons at the top that fill in the form with preset personalities."

## Done when
A new user can set up a profile in under 30 seconds, and Spark's ideas visibly change when they change the profile.
