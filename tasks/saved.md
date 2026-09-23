# Saved ideas
**Goal:** a tidy home for ideas people saved, so Spark's output turns into a real evening plan.
**You own:** `public/features/saved.js`. **Don't touch:** anything else.
**Data:** Spark saves ideas to `localStorage['saved:<username>']` as a list of Idea objects. Read and update that same key.

## Tasks (in order)
1. Run the site, use Spark to save a few ideas, then open your **Saved** tab.
2. Add a **Remove** button on each card.
3. Add **"Done ✅"**: mark ideas you did (store a `done: true` field on the idea in the same list), shown with a checkmark.
4. Add a friendly **empty state** (illustration or big emoji + a button linking to `#/solo`).
5. Add filters ("free only", "under 1 hour", "not done yet") and a **"Pick one for me 🎲"** button that highlights a random saved idea.
6. Add **"Plan this with friends"** on a card: for now it links to `#/group` (later the Group team can make it create a plan).

## Prompts you can paste
- "Add a Remove button to each saved idea card that deletes it from the saved list and updates the page."
- "Add a Pick one for me button that highlights a random saved idea with a bounce."

## Done when
Saving in Spark, then opening Saved, shows the idea, and removing or completing it works and survives a page refresh.
