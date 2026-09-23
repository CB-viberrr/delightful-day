# Spark (solo ideas)
**Goal:** the "what could I do tonight?" experience. It should feel magical and take one tap.
**You own:** `public/features/solo.js`. **Don't touch:** anything else.
**Saving ideas:** the 💾 button stores ideas in `localStorage['saved:<username>']` as a list. The Saved teammate reads that list, so keep that format.

## Tasks (in order)
1. Run the site, open **Spark**, click "Give me ideas". Ask Claude to explain what happens.
2. Show ideas **one card at a time** with big buttons: "Love it 💾" and "Not for me ➡️" (like a deck of cards), with a smooth animation.
3. Add a **mood quick-picker** at the top ("wired", "sleepy", "social", "broke"...) that is sent along as `context` to `app.suggest('solo', { mood })`.
4. "Not for me" should remember the rejected titles and pass them as `context.avoid` so ideas don't repeat.
5. Polish the loading state (fun messages) and the "Surprise me" button.

## Prompts you can paste
- "Change the idea list into a card deck: show one idea at a time with Love it and Not for me buttons and a slide animation."
- "Add mood buttons above the ideas and send the chosen mood when asking for ideas."

## Done when
You can get from opening the tab to a saved idea in 5 seconds, and it feels fun.
