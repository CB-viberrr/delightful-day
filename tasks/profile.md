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

## Boston notebook integration

The six-step Boston notebook lives in `public/features/profile.js`, using the existing plain JavaScript feature registry at `#/profile`. After setup, users get the integrator's one-page profile editor with automatic saving, **Retake the quiz**, and **Plan tonight in Spark**. The feature follows the shared app's current dark theme. No new dependency, endpoint, or database is needed.

### Shared profile and account save

`app.profile.bostonNotebook` keeps the versioned answers and stable IDs. The integrator's `aboutMe()` adapter also writes readable top-level profile fields for existing idea consumers: `name`, `neighborhood`, `interests`, `company`, `groupSize`, `vibes`, `budget`, `travel`, and `city: 'Boston'`. Profile-owned fields are replaced so skipped answers do not linger; unrelated fields remain intact. Budget IDs map to the existing categories (`free`, `$`, `$$`, `$$$`); the original numeric-range choice remains in the notebook. These categories are not a guarantee about actual venue prices.

Completion and editor changes use the shared `api()` helper with the existing `PUT /api/profile` body `{profile}`. Writes are serialized. Account and view guards prevent late responses from replacing another user's state or updating a screen the user has left. A pending editor change flushes when leaving for Spark; an account switch never flushes another user's draft into the new account.

Drafts use `tonight:boston-notebook:v1:<username>` with a session fallback when browser storage fails. The editor records unsynced changes immediately; failed saves expose **Try again**. Unsynced edits and unfinished quiz retakes take priority over older account data. The optional draft-record `accountPending` flag describes synchronization, not an answer in the profile schema.

`app.suggest(...)` sends the shared profile, so Spark, group, and network requests can receive the notebook and readable answers. Verify actual ranking separately: Spark's local fallback matcher and its session-specific filters are owned by Spark, while the server fallback does not rank using notebook answers. No idea-generation request runs automatically on profile completion.

### Integration API

The existing application loads `core.js` before this feature. A landing owner can call:

```js
const unmount = BostonOnboarding.mount(container, {
  // Omit on normal entry to resume a saved draft.
  initialProfile: existingBostonProfile, // optional; explicit edit handoff
  onComplete(profile) {
    const payload = BostonOnboarding.toDestination(profile);
    // Current integrator contract: { profile, purpose: 'about_me' }
    // A caller mounting directly owns account saving and navigation.
  },
});
```

The registered feature dispatches `boston:onboarding-complete` with that payload. If `app.openBostonRecommendations(payload)` exists, it delegates navigation there; otherwise it opens the saved profile editor. Avoid routing from both an event listener and the adapter. Use the returned cleanup callback when leaving a manually mounted component. A Boston map and live place-ranking destination are not implemented by this feature.

### Meaning of stored answers

- `schemaVersion: 1`; optional `name`; `completionState` is `in_progress` or `complete`.
- `neighborhoodId` is nullable; `neighborhoodAnswer` distinguishes `selected`, `not_sure`, and `unanswered`.
- `interests` contains `{mode, ids}` with `selected`, `open_to_anything`, or `unanswered`.
- `comfort` has the same structure, using `no_strong_preference` for its explicit open mode.
- `company`, `budget`, and `travelRange` are nullable stable IDs; `transportIds` is an array.
- `skippedQuestionIds` records explicit skips; Skip clears that question and answering removes the flag.
- `free` is an explicit budget constraint; an unknown price is not free.
- Neighborhood IDs are provisional: `back_bay`, `beacon_hill`, `south_end`, `north_end`, `fenway`, `cambridge`, `somerville`. Coordinate map IDs with that owner.
- Travel range is a preference, not a routing estimate. No demographics or personality traits are inferred.

Notebook icons are bundled Lucide SVGs with licenses embedded in the feature. The feature does not compute a competing landing-page weather/time theme.

### Team verification

Integration checks load the shared HTML, scripts, styles, and production browser security policy, with account and suggestion APIs mocked. They cover setup, account saving, profile data in Spark's request after refresh, failure/retry, reset, and pending-save navigation/account changes. Editor checks cover automatic saving, leaving the tab, retaking the quiz, and recovering an unsynced draft. These checks establish integration behavior, not authenticated production database behavior or recommendation quality.

Shared navigation on small screens is owned by the integrator/design team. Keep future browser requests compatible with the team's current security policy; do not weaken it to connect a feature. Shared shell, Spark, and security changes remain in their owners' files.
