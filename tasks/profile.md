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

The six-step Boston notebook now lives in `public/features/profile.js`, using the existing plain JavaScript feature registry. It appears in **My profile** at `#/profile`; shared navigation, authentication, styling files, and the other teams' feature files are unchanged.

### Shared profile and existing account save

The versioned definition and stable option dictionaries are in `BostonProfile` / `OPTIONS` in the feature file. Completion merges the validated profile into **`app.profile.bostonNotebook`** and saves through the existing **`PUT /api/profile`** contract used by `app.saveProfile(...)`. The adapter calls the shared `api()` helper with the same body and guards the response against an account change during the request. Existing fields such as mood, energy, budget, and other teams' extra fields are preserved. No new account, database, dependency, or endpoint is required.

A current-question draft stays device-local. Failed account saves retain the current visit's notebook and expose a retry action. Reset clears this namespace and saves its deletion without removing other profile fields. This feature serializes its account writes; leaving the tab during a save does not let a late callback replace another team's screen.

`app.suggest(...)` already sends the full shared profile, so Spark, group, and network requests can receive `bostonNotebook`. **The built-in fallback ideas do not use these preferences.** Passing the data is verified; actual ranking, cost filtering, and tonight availability are the destination/idea-engine owner's work. The new notebook is the explicit source for these six preferences; legacy fields are preserved for compatibility and may describe older choices.

### Landing and map owners

The existing application loads `core.js` before this feature. The standalone, route-free entry point is:

```js
const unmount = BostonOnboarding.mount(container, {
  // Omit this on normal entry to resume a saved draft.
  initialProfile: existingBostonProfile, // optional; explicit edit handoff
  onComplete(profile) {
    const payload = BostonOnboarding.toDestination(profile);
    // { profile, primaryContext: 'tonight', secondaryContext: 'coming_week' }
    // Your shell owns persistence and navigation when calling mount directly.
  },
});
```

For the registered My profile tab, the destination owner can connect:

```js
app.openBostonRecommendations = ({profile, primaryContext, secondaryContext}) => {
  // Open your real Boston destination using these inputs.
};
```

The tab also dispatches `boston:onboarding-complete` with the same payload. Avoid navigating from both the event listener and the adapter. When no map adapter is installed, completion shows an explicit Boston map placeholder plus **Open Spark ideas**, linking to the existing `#/solo` feature. It never calls the idea engine automatically.

### Meaning of stored answers

- `schemaVersion: 1`; optional `name`; `completionState` is `in_progress` or `complete`.
- `neighborhoodId` is nullable. `neighborhoodAnswer` distinguishes `selected`, `not_sure`, and `unanswered`.
- `interests` contains `{mode, ids}`; modes are `selected`, `open_to_anything`, or `unanswered`.
- `comfort` uses the same structure with `no_strong_preference` as its explicit open mode.
- `company`, `budget`, and `travelRange` are nullable stable IDs; `transportIds` is an array.
- `skippedQuestionIds` records explicit skips. Skip clears that question, and answering it removes the skipped marker.
- `free` is an explicit budget constraint; an unknown price must never be interpreted as free.
- Neighborhood IDs are provisional: `back_bay`, `beacon_hill`, `south_end`, `north_end`, `fenway`, `cambridge`, `somerville`. Agree on mapping with the map owner.
- Travel range is a preference, not a routing estimate. No demographics or personality traits are inferred.

The static preview uses a warm background because the weather/time landing state is not present in this repository. The feature does not calculate a competing time theme. Notebook icons are provisional, bundled Lucide SVGs with licenses embedded in the feature.


### Integration verification and shared-shell follow-up

The complete shared shell was tested with its real HTML, styles, core, and all feature files, using mocked account and suggestion endpoints. The checks cover account save and reload, direct Spark entry and request payload, preserved legacy preferences, retry after failure, and leaving/resetting during an in-flight save. There are no automatic suggestion requests on completion. Production asset delivery is checked separately; this does not establish live recommendation quality.

Post-sync verification includes Charles’s Settings/security update and Kathryn’s Spark update, with the current production security headers applied. All six tabs register; notebook completion, account save, Spark navigation, refresh, and the suggestion payload pass. External services are mocked or blocked in these checks.

Integrator/design follow-up: the shared navigation overflows narrow screens after Settings is added (390-pixel viewport, 515-pixel document). The notebook itself fits its 342-pixel content width. This feature leaves the shared header and styles to their owners.

Integrator/Spark follow-up: the current security policy allows connections only to this site, so Spark’s new direct Open-Meteo requests are blocked and its weather fallback appears. Coordinate a permitted weather integration without weakening the shared security policy. This does not prevent notebook saving or the suggestion request.
