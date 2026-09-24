/*
Provisional notebook artwork: Lucide coffee, music, trees, and star.
Source: https://github.com/lucide-icons/lucide
ISC License

Copyright (c) 2026 Lucide Icons and Contributors

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

---

The following Lucide icons are derived from the Feather project:

airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out

The MIT License (MIT) (for the icons listed above)

Copyright (c) 2013-present Cole Bemis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
// Boston onboarding. Profile-owned feature; no dependencies or build step.
(() => {
"use strict";
/**
 * A device-local preference profile. IDs are stable; labels live in OPTIONS.
 * @typedef {Object} BostonProfile
 * @property {1} schemaVersion
 * @property {string=} name
 * @property {string|null} neighborhoodId
 * @property {'unanswered'|'not_sure'|'selected'} neighborhoodAnswer
 * @property {{mode: 'unanswered'|'open_to_anything'|'selected', ids: string[]}} interests
 * @property {string|null} company
 * @property {{mode: 'unanswered'|'no_strong_preference'|'selected', ids: string[]}} comfort
 * @property {string|null} budget
 * @property {string|null} travelRange
 * @property {string[]} transportIds
 * @property {string[]} skippedQuestionIds
 * @property {'in_progress'|'complete'} completionState
 */

const QUESTIONS = ['neighborhood', 'interests', 'company', 'comfort', 'budget', 'travel'];

const OPTIONS = {
  neighborhood: [
    { id: 'back_bay', label: 'Back Bay' },
    { id: 'beacon_hill', label: 'Beacon Hill' },
    { id: 'south_end', label: 'South End' },
    { id: 'north_end', label: 'North End' },
    { id: 'fenway', label: 'Fenway' },
    { id: 'cambridge', label: 'Cambridge' },
    { id: 'somerville', label: 'Somerville' },
    { id: 'not_sure', label: 'Not sure yet' }
  ],
  interests: [
    { id: 'food_cafes', label: 'Food and cafés' },
    { id: 'live_music', label: 'Live music' },
    { id: 'sports', label: 'Sports' },
    { id: 'art_culture', label: 'Art and culture' },
    { id: 'parks_walks', label: 'Parks and walks' },
    { id: 'classes_games', label: 'Classes and games' }
  ],
  company: [
    { id: 'solo', label: 'Happy doing my own thing' },
    { id: 'meet_people', label: 'Always up for meeting people' },
    { id: 'bringing_someone', label: 'Usually with a partner or friend' },
    { id: 'mix', label: 'A mix of all of it' }
  ],
  comfort: [
    { id: 'structured', label: 'Structured plans (classes, events)' },
    { id: 'quieter', label: 'Quieter, low-key spots' },
    { id: 'lively', label: 'Lively, buzzing places' },
    { id: 'short', label: 'Short and easy outings' }
  ],
  budget: [
    { id: 'free', label: 'Free' },
    { id: 'under_25', label: 'Under $25' },
    { id: 'under_50', label: 'Under $50' },
    { id: 'flexible', label: 'Flexible' }
  ],
  range: [
    { id: 'neighborhood', label: 'I stick close to home' },
    { id: 'twenty_minutes', label: 'Up to about 20 minutes away' },
    { id: 'across_boston', label: 'Anywhere in Boston' }
  ],
  transport: [
    { id: 'walk', label: 'Walk' },
    { id: 'transit', label: 'Public transit' },
    { id: 'bike', label: 'Bike' },
    { id: 'car', label: 'Car' }
  ]
};

/** @returns {BostonProfile} */
function createProfile() {
  return {
    schemaVersion: 1,
    neighborhoodId: null,
    neighborhoodAnswer: 'unanswered',
    interests: { mode: 'unanswered', ids: [] },
    company: null,
    comfort: { mode: 'unanswered', ids: [] },
    budget: null,
    travelRange: null,
    transportIds: [],
    skippedQuestionIds: [],
    completionState: 'in_progress'
  };
}

const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);
const optionExists = (group, id) => OPTIONS[group].some(option => option.id === id);
const nullableOption = (group, value) => value === null || (typeof value === 'string' && optionExists(group, value));

function validIdList(value, allowed, maximum) {
  return Array.isArray(value) && value.length <= maximum &&
    value.every(id => typeof id === 'string' && allowed.includes(id)) &&
    new Set(value).size === value.length;
}

function validMultiAnswer(value, group, explicitMode, maximum) {
  if (!isRecord(value) || !['unanswered', explicitMode, 'selected'].includes(value.mode)) return false;
  if (!validIdList(value.ids, OPTIONS[group].map(option => option.id), maximum)) return false;
  return value.mode === 'selected' ? value.ids.length > 0 : value.ids.length === 0;
}

function hasQuestionAnswer(profile, question) {
  switch (question) {
    case 'neighborhood': return profile.neighborhoodAnswer !== 'unanswered';
    case 'interests': return profile.interests.mode !== 'unanswered';
    case 'company': return profile.company !== null;
    case 'comfort': return profile.comfort.mode !== 'unanswered';
    case 'budget': return profile.budget !== null;
    case 'travel': return profile.travelRange !== null || profile.transportIds.length > 0;
    default: return false;
  }
}

/** Validate an unknown value and reconstruct only recognized fields. */
function validateProfile(raw) {
  if (!isRecord(raw) || raw.schemaVersion !== 1) return null;
  if (raw.name !== undefined && (typeof raw.name !== 'string' || raw.name.length > 60)) return null;
  if (!['unanswered', 'not_sure', 'selected'].includes(raw.neighborhoodAnswer)) return null;
  if (raw.neighborhoodAnswer === 'selected') {
    if (typeof raw.neighborhoodId !== 'string' || raw.neighborhoodId === 'not_sure' || !optionExists('neighborhood', raw.neighborhoodId)) return null;
  } else if (raw.neighborhoodId !== null) return null;
  if (!validMultiAnswer(raw.interests, 'interests', 'open_to_anything', 3)) return null;
  if (!nullableOption('company', raw.company)) return null;
  if (!validMultiAnswer(raw.comfort, 'comfort', 'no_strong_preference', 2)) return null;
  if (!nullableOption('budget', raw.budget) || !nullableOption('range', raw.travelRange)) return null;
  if (!validIdList(raw.transportIds, OPTIONS.transport.map(option => option.id), OPTIONS.transport.length)) return null;
  if (!validIdList(raw.skippedQuestionIds, QUESTIONS, QUESTIONS.length)) return null;
  if (!['in_progress', 'complete'].includes(raw.completionState)) return null;
  if (raw.skippedQuestionIds.some(question => hasQuestionAnswer(raw, question))) return null;

  const profile = {
    schemaVersion: 1,
    neighborhoodId: raw.neighborhoodId,
    neighborhoodAnswer: raw.neighborhoodAnswer,
    interests: { mode: raw.interests.mode, ids: [...raw.interests.ids] },
    company: raw.company,
    comfort: { mode: raw.comfort.mode, ids: [...raw.comfort.ids] },
    budget: raw.budget,
    travelRange: raw.travelRange,
    transportIds: [...raw.transportIds],
    skippedQuestionIds: [...raw.skippedQuestionIds],
    completionState: raw.completionState
  };
  if (raw.name && raw.name.trim()) profile.name = raw.name.trim();
  return profile;
}

/** Clear an answer, preserving the supplied profile. The caller adds Skip status. */
function clearQuestion(profile, question) {
  if (!QUESTIONS.includes(question)) throw new TypeError('Unknown onboarding question');
  const next = validateProfile(profile);
  if (!next) throw new TypeError('Invalid Boston profile');
  switch (question) {
    case 'neighborhood':
      next.neighborhoodId = null;
      next.neighborhoodAnswer = 'unanswered';
      break;
    case 'interests': next.interests = { mode: 'unanswered', ids: [] }; break;
    case 'company': next.company = null; break;
    case 'comfort': next.comfort = { mode: 'unanswered', ids: [] }; break;
    case 'budget': next.budget = null; break;
    case 'travel':
      next.travelRange = null;
      next.transportIds = [];
      break;
  }
  next.skippedQuestionIds = next.skippedQuestionIds.filter(id => id !== question);
  next.completionState = 'in_progress';
  return next;
}

const optionLabel = (group, id) => OPTIONS[group].find(option => option.id === id)?.label;

/** Up to four truthful labels. A second interest fills a spare slot. */
function summaryLabels(profile) {
  const interestLabels = profile.interests.mode === 'open_to_anything'
    ? ['Open to anything'] : profile.interests.ids.map(id => optionLabel('interests', id));
  const comfortLabels = profile.comfort.mode === 'no_strong_preference'
    ? ['No strong preference'] : profile.comfort.ids.map(id => optionLabel('comfort', id));
  const candidates = [
    interestLabels[0],
    comfortLabels[0],
    optionLabel('budget', profile.budget),
    optionLabel('transport', profile.transportIds.includes('transit') ? 'transit' : profile.transportIds[0]),
    interestLabels[1],
    optionLabel('company', profile.company),
    profile.neighborhoodAnswer === 'selected' ? optionLabel('neighborhood', profile.neighborhoodId) : undefined,
    optionLabel('range', profile.travelRange),
    comfortLabels[1]
  ];
  return [...new Set(candidates.filter(Boolean))].slice(0, 4);
}

/** Declare destination intent; this adapter does not generate recommendations. */
function toDestination(profile) {
  const validated = validateProfile(profile);
  if (!validated) throw new TypeError('Invalid Boston profile');
  return { profile: validated, purpose: 'about_me' };
}


const STYLES = `
.profile-onboarding { --profile-paper:#16173a; --profile-ink:var(--ink); --profile-muted:var(--mute); --profile-accent:var(--accent); --profile-border:var(--line); --profile-grad:linear-gradient(135deg,var(--accent),var(--accent2)); color:var(--ink); font-family:inherit; max-width:1080px; margin:0 auto; padding:0 0 12px; line-height:1.5; }
.profile-onboarding *, .profile-onboarding *::before, .profile-onboarding *::after {box-sizing:border-box;}
.profile-onboarding button,.profile-onboarding input {font:inherit;}
.profile-onboarding button {cursor:pointer;}
.profile-onboarding button {transition:transform .12s cubic-bezier(.2,.8,.2,1),background-color .14s ease-out,border-color .14s ease-out,color .14s ease-out,filter .14s;}
.profile-onboarding button:not(:disabled):active {transform:scale(.97);}
.profile-onboarding button:disabled {cursor:default;}
.profile-onboarding button:focus-visible,.profile-onboarding input:focus-visible,.profile-onboarding a:focus-visible {outline:2px solid var(--accent2);outline-offset:4px;}
.profile-onboarding h1:focus-visible {outline:none;}
.profile-onboarding [hidden] {display:none!important;}
.profile-topline {display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:22px;font-size:12px;letter-spacing:1.6px;font-weight:700;color:var(--mute);}
.profile-text-button {background:none;border:0;min-width:44px;min-height:40px;color:var(--mute);padding:8px 0;font-size:14px!important;letter-spacing:0;font-weight:600;}
.profile-text-button:hover {color:var(--ink);}
.profile-topline .profile-text-button {padding:6px 14px;border:1px solid var(--line);border-radius:999px;min-height:34px;}
.profile-topline .profile-text-button:hover {background:var(--panel);}
.profile-layout {display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.9fr);gap:56px;align-items:start;}
.profile-question-side {min-width:0;}
.profile-progress {display:flex;align-items:center;gap:14px;margin-bottom:24px;color:var(--mute);font-size:13px;font-weight:600;}
.profile-progress-track {display:flex;gap:6px;width:150px;}
.profile-progress-track span {height:6px;flex:1;border-radius:99px;background:var(--line);transition:background .25s ease-out;}
.profile-progress-track .profile-progress-done {background:var(--accent2);}
.profile-progress-track .profile-progress-current {background:var(--profile-grad);box-shadow:0 0 10px #ff8a5c88;}
.profile-eyebrow {font-size:12px;letter-spacing:1.4px;text-transform:uppercase;margin-bottom:8px;font-weight:800;background:var(--profile-grad);-webkit-background-clip:text;background-clip:text;color:transparent;width:fit-content;}
.profile-onboarding h1 {scroll-margin-top:95px;font-size:36px;font-weight:800;line-height:1.12;letter-spacing:-.5px;margin:0 0 10px;text-wrap:balance;color:var(--ink);outline:none;}
.profile-onboarding .profile-description {color:var(--mute);font-size:15px;line-height:1.6;margin:0 0 22px;}
.profile-question-content {animation:profile-question-in .3s cubic-bezier(.2,.8,.2,1) both;}
.profile-fieldset,.profile-subgroup {padding:0;margin:0;border:0;min-width:0;}
.profile-choices {display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.profile-choice {position:relative;display:flex;align-items:center;justify-content:space-between;gap:10px;min-height:60px;border:1px solid var(--line);border-radius:16px;padding:13px 16px;background:var(--panel);color:var(--ink);cursor:pointer;transition:background .14s,border-color .14s,box-shadow .2s;}
@media(hover:hover) and (pointer:fine) {.profile-choice:hover {border-color:#5a4b9a;background:#1f2045;}}
.profile-choice.profile-selected {border-color:var(--accent2);background:linear-gradient(135deg,#ff8a5c1f,#c86bfa2e),var(--panel);box-shadow:0 0 0 1px var(--accent2),0 6px 22px #c86bfa33;}
.profile-choice input {position:absolute;opacity:0;min-width:0;width:1px;height:1px;margin:0;padding:0;}
.profile-choice:has(input:focus-visible) {outline:2px solid var(--accent2);outline-offset:3px;}
.profile-choice-content {display:flex;align-items:center;gap:10px;font-size:15px;font-weight:600;line-height:1.35;min-width:0;}
.profile-choice-content small {display:block;color:var(--mute);font-weight:400;font-size:12px;line-height:1.5;margin-top:3px;}
.profile-choice-indicator {width:20px;height:20px;flex:0 0 20px;border:2px solid #4a4b7c;border-radius:50%;color:transparent;font-size:12px;font-weight:800;line-height:16px;text-align:center;}
.profile-choice input[type=checkbox]~.profile-choice-indicator {border-radius:6px;}
.profile-selected .profile-choice-indicator {border-color:transparent;background:var(--profile-grad);box-shadow:inset 0 0 0 4px var(--panel);}
.profile-selected input[type=checkbox]~.profile-choice-indicator {box-shadow:none;color:#fff;}
.profile-choices-company,.profile-choices-comfort,.profile-choices-range {grid-template-columns:1fr;}
.profile-choices-company .profile-choice,.profile-choices-comfort .profile-choice,.profile-choices-range .profile-choice {min-height:56px;}
.profile-choice-icon {width:36px;height:36px;flex:0 0 36px;display:grid;place-items:center;border-radius:12px;background:#ff8a5c26;color:#ffb08f;}
.profile-choice-icon svg {width:21px;height:21px;}
.profile-icon-music {background:#c86bfa2b;color:#dfa6ff;}
.profile-icon-tree {background:#5fd49a24;color:#8fe6b8;}
.profile-icon-star {background:#ffd35c24;color:#ffdf85;}
.profile-choices-interests .profile-choice {min-height:72px;padding:12px 13px;gap:6px;}
.profile-choices-interests .profile-choice-content {font-size:14px;gap:10px;}
.profile-any {display:flex;align-items:center;gap:9px;min-height:40px;width:fit-content;margin-top:10px;font-size:14px;color:var(--mute);cursor:pointer;}
.profile-any input {accent-color:var(--accent2);min-width:0;width:17px;height:17px;flex:none;margin:0;}
.profile-feedback {font-size:13px;line-height:1.5;color:var(--mute);min-height:19px;margin:10px 0 14px;}
.profile-navigation {display:flex;align-items:center;justify-content:space-between;gap:12px;border-top:1px solid var(--line);padding-top:20px;}
.profile-navigation>div {display:flex;gap:18px;align-items:center;}
.profile-back {display:flex;align-items:center;gap:7px;}
.profile-back:disabled {visibility:hidden;}
.profile-back svg {width:16px;height:16px;transform:rotate(180deg);}
.profile-primary {display:inline-flex;align-items:center;justify-content:center;gap:12px;min-height:46px;border:0;border-radius:12px;background:var(--profile-grad);color:#fff;font-size:15px!important;font-weight:700;padding:11px 22px;box-shadow:0 6px 20px #c86bfa40;}
.profile-primary:hover {filter:brightness(1.1);}
.profile-primary:disabled {opacity:.6;}
.profile-primary svg {width:18px;height:18px;transition:transform .25s cubic-bezier(.2,.8,.2,1);}
@media(hover:hover) and (pointer:fine) {.profile-primary:not(:disabled):hover svg {transform:translateX(3px);}}
.profile-primary:not(:disabled):active svg {transform:translateX(1px);}
.profile-step-footnote {font-size:12px;color:var(--mute);text-align:center;margin:18px 0 0;}
.profile-notebook-side {position:relative;min-width:0;}
.profile-notebook {position:relative;min-height:560px;background:radial-gradient(420px 260px at 85% 0%,#c86bfa33,transparent),radial-gradient(360px 240px at 0% 100%,#ff8a5c22,transparent),var(--profile-paper);border:1px solid #3b3c72;border-radius:22px;box-shadow:0 24px 60px #05061a99,0 0 0 1px #ffffff08 inset;transform:rotate(1.5deg);}
.profile-notebook::before {content:'';position:absolute;inset:0;background-image:radial-gradient(#ffffff14 .8px,transparent .8px);background-size:14px 14px;pointer-events:none;border-radius:inherit;}
.profile-notebook::after {content:'';position:absolute;top:38px;right:-9px;width:14px;height:56px;background:var(--profile-grad);border-radius:0 6px 6px 0;z-index:-1;}
.profile-binding {position:absolute;left:-11px;top:44px;bottom:44px;display:flex;flex-direction:column;justify-content:space-between;z-index:1;}
.profile-binding i {display:block;width:22px;height:8px;border-radius:6px;background:linear-gradient(90deg,#6c6da8,#b9b6e6);box-shadow:0 2px 4px #0008;}
.profile-paper-content {position:relative;padding:28px 32px 24px 38px;min-height:560px;display:flex;flex-direction:column;}
.profile-paper-top {display:flex;justify-content:space-between;font-size:10px;font-weight:700;letter-spacing:1.6px;color:var(--mute);border-bottom:1px dashed var(--line);padding-bottom:12px;gap:8px;}
.profile-book-title {font-size:58px;font-weight:800;line-height:.98;letter-spacing:-1.5px;margin:24px 0 12px;color:var(--ink);}
.profile-book-title em {font-style:normal;background:var(--profile-grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.profile-book-subtitle {font-size:14px;color:var(--mute);line-height:1.6;}
.profile-starting {display:flex;flex-direction:column;gap:3px;position:absolute;top:200px;right:22px;transform:rotate(-5deg);max-width:190px;padding:10px 15px 11px;background:#ffffff10;border:1px solid #ffffff1c;border-radius:14px;backdrop-filter:blur(6px);font-size:17px;font-weight:700;color:var(--ink);box-shadow:0 8px 20px #0006;}
.profile-tiny-label {font-size:9px;font-weight:800;letter-spacing:1.3px;color:var(--accent);}
.profile-doodles {position:relative;height:190px;margin:26px 0 0;}
.profile-doodle-slot {position:absolute;width:120px;text-align:center;}
.profile-slot-coffee {left:4%;top:6px;--tilt:-8deg;}
.profile-slot-music {left:52%;top:14px;--tilt:9deg;}
.profile-slot-tree {left:14%;top:104px;--tilt:-4deg;}
.profile-slot-star {left:60%;top:106px;--tilt:7deg;}
.profile-doodle {transform:rotate(var(--tilt));animation:profile-settle .4s both;}
.profile-doodle svg {width:52px;height:52px;stroke:#f4f1ff;filter:drop-shadow(0 0 10px #c86bfa88);}
.profile-slot-coffee svg {fill:#ff8a5c55;}
.profile-slot-music svg {fill:#c86bfa55;}
.profile-slot-tree svg {fill:#5fd49a44;}
.profile-slot-star svg {fill:#ffd35c55;}
.profile-doodle span {display:block;color:var(--mute);font-size:12px;font-weight:600;line-height:1.3;margin-top:5px;}
.profile-empty-art {position:absolute;inset:26px 0 5px;text-align:center;color:var(--mute);}
.profile-sparkle {display:block;font-size:42px;line-height:1;margin:8px 0 10px;animation:profile-twinkle 2.6s ease-in-out infinite;}
.profile-empty-art p {font-size:18px;font-weight:600;line-height:1.5;margin:0;}
.profile-notebook-notes {display:flex;gap:7px;flex-wrap:wrap;align-content:start;min-height:60px;padding-top:14px;margin-top:14px;border-top:1px dashed var(--line);}
.profile-notebook-notes>span {padding:4px 11px;border-radius:999px;background:#ffffff14;color:var(--ink);font-size:12px;height:fit-content;max-width:100%;}
.profile-notebook-notes .profile-faint-note {background:none;padding:0;font-size:13px;color:var(--mute);font-style:italic;}
.profile-paper-bottom {display:flex;justify-content:space-between;gap:15px;align-items:end;color:var(--mute);font-size:10px;font-weight:700;letter-spacing:1.3px;margin-top:auto;padding-top:14px;text-transform:uppercase;}
.profile-paper-bottom span:first-child {max-width:60%;overflow-wrap:anywhere;min-height:12px;max-height:34px;overflow:hidden;}
.profile-paper-bottom span:last-child {flex-shrink:0;}
.profile-notebook-caption {font-size:14px;color:var(--mute);text-align:center;margin:26px -12px 0;}
.profile-bottomline {display:flex;justify-content:space-between;gap:14px;border-top:1px solid var(--line);margin-top:40px;padding-top:16px;font-size:12px;color:var(--mute);}
.profile-save {display:flex;align-items:center;gap:8px;}
.profile-save-dot {width:7px;height:7px;border-radius:50%;background:#5fd49a;box-shadow:0 0 8px #5fd49a;flex:none;}
.profile-subgroup legend {font-size:14px;font-weight:700;margin-bottom:10px;padding:0;}
.profile-subgroup legend span {font-weight:400;color:var(--mute);}
.profile-subgroup+.profile-subgroup {margin-top:20px;}
.profile-choices-transport {grid-template-columns:repeat(2,1fr);gap:8px;}
.profile-choices-transport .profile-choice {min-height:48px;padding:10px 14px;}
.profile-travel-note {font-size:12px;color:var(--mute);margin:14px 0 0;}
.profile-summary-labels {display:flex;gap:8px;flex-wrap:wrap;margin:22px 0 28px;}
.profile-summary-labels span {border:1px solid var(--accent2);background:#c86bfa22;padding:7px 14px;border-radius:999px;font-size:14px;font-weight:600;color:var(--ink);}
.profile-name-label {display:block;font-size:14px;font-weight:700;margin-bottom:8px;}
.profile-name-label span {color:var(--mute);font-weight:400;margin-left:5px;font-size:13px;}
.profile-name-input {width:100%;min-width:0!important;min-height:46px;}
.profile-summary-note {font-size:13px;color:var(--mute);margin:14px 0 22px;}
.profile-complete {width:100%;}
.profile-edit {display:block;margin:10px auto 0;}
.profile-heading-dot {color:var(--accent);}
.profile-handoff-actions {display:flex;flex-wrap:wrap;align-items:center;gap:12px;}
.profile-handoff-actions a {text-decoration:none;}
.profile-reset-dialog {width:min(440px,calc(100% - 40px));background:var(--panel);border:1px solid var(--line);border-radius:20px;color:var(--ink);padding:28px;box-shadow:0 30px 90px #000a;}
.profile-reset-dialog::backdrop {background:#07081acc;backdrop-filter:blur(4px);}
.profile-reset-dialog h2 {font-size:26px;font-weight:800;line-height:1.2;margin:0 0 10px;}
.profile-reset-dialog p {font-size:15px;color:var(--mute);margin:0 0 24px;}
.profile-reset-dialog>div {display:flex;gap:10px;justify-content:flex-end;flex-wrap:wrap;}
.profile-secondary {padding:10px 18px;border:1px solid var(--line);background:transparent;color:var(--ink);border-radius:12px;min-height:44px;font-size:15px!important;font-weight:700;}
.profile-secondary:hover {background:#ffffff0d;}
.profile-editor-bar {display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;padding:14px 0 4px;}
.profile-editor-bar .profile-text-button {min-height:0;padding:0 0 0 6px;color:var(--accent);}
.profile-editor-grid {display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;margin-top:22px;align-items:start;}
.profile-editor-card {background:#ffffff06;border:1px solid var(--line);border-radius:20px;padding:18px 18px 20px;min-width:0;}
.profile-editor-card h2 {font-size:17px;font-weight:800;margin:0 0 12px;}
.profile-editor-card h2:has(+ .profile-editor-hint) {margin-bottom:2px;}
.profile-editor-hint {font-size:13px;color:var(--mute);margin:0 0 12px;}
.profile-editor-sub {margin:16px 0 10px;font-weight:700;color:var(--ink);}
.profile-editor-wide {grid-column:1/-1;}
.profile-editor-wide .profile-choices-range {grid-template-columns:repeat(3,1fr);}
.profile-editor-wide .profile-choices-transport {grid-template-columns:repeat(4,1fr);}
.profile-editor .profile-choice {min-height:48px;padding:10px 13px;border-radius:14px;}
.profile-editor .profile-choice-content {font-size:14px;}
.profile-editor .profile-choices-interests .profile-choice {min-height:56px;}
.profile-editor .profile-choices-interests .profile-choice-content {flex-direction:row;align-items:center;font-size:13px;}
.profile-editor .profile-choice-icon {width:30px;height:30px;flex-basis:30px;}
.profile-save-dot.profile-save-busy {background:var(--accent);box-shadow:0 0 8px var(--accent);animation:profile-twinkle 1s ease-in-out infinite;}
.profile-save-dot.profile-save-error {background:#ff7b7b;box-shadow:0 0 8px #ff7b7b;}
@media(max-width:760px) {.profile-editor-grid {grid-template-columns:1fr;}.profile-editor-wide .profile-choices-range {grid-template-columns:1fr;}.profile-editor-wide .profile-choices-transport {grid-template-columns:1fr 1fr;}}
@keyframes profile-question-in {from {opacity:0;transform:translateY(8px);}to {opacity:1;transform:translateY(0);}}
@keyframes profile-twinkle {0%,100% {transform:scale(1) rotate(0);opacity:.85;}50% {transform:scale(1.15) rotate(15deg);opacity:1;}}
@keyframes profile-settle {
  0% {opacity:0;transform:translate(-3px,8px) rotate(calc(var(--tilt) - 6deg)) scale(.8);animation-timing-function:cubic-bezier(.2,.8,.2,1);}
  65% {opacity:1;transform:translate(1px,-2px) rotate(calc(var(--tilt) + 2deg)) scale(1.06);animation-timing-function:ease-out;}
  100% {opacity:1;transform:translate(0,0) rotate(var(--tilt)) scale(1);}
}

@media(max-width:1050px) {.profile-layout {gap:36px;}.profile-onboarding h1 {font-size:32px;}.profile-paper-content {padding-left:30px;padding-right:24px;}.profile-book-title {font-size:50px;}.profile-starting {right:12px;font-size:15px;max-width:160px;}.profile-choices-interests .profile-choice-content {flex-direction:column;align-items:start;}.profile-choices-interests .profile-choice {min-height:94px;}}
@media(max-width:760px) {
.profile-onboarding {max-width:560px;}.profile-topline {margin-bottom:12px;font-size:10px;letter-spacing:1.2px;}
.profile-layout {display:flex;flex-direction:column;gap:24px;}.profile-question-side {width:100%;padding:0;}.profile-notebook-side {order:-1;width:100%;}.profile-notebook {transform:rotate(.6deg);min-height:130px;border-radius:16px;}.profile-paper-content {min-height:130px;height:130px;padding:14px 17px 12px 24px;}.profile-binding {top:18px;bottom:18px;left:-8px;}.profile-binding i {width:16px;height:6px;}.profile-binding i:nth-child(n+5) {display:none;}.profile-notebook::after {top:20px;height:30px;width:9px;right:-6px;}.profile-paper-top {font-size:7px;letter-spacing:.9px;max-width:45%;padding-bottom:6px;}.profile-paper-top span:last-child {display:none;}.profile-book-title {font-size:30px;line-height:.98;letter-spacing:-.6px;margin:9px 0 0;}.profile-book-title br {display:none;}.profile-book-title em {display:block;}.profile-book-subtitle,.profile-paper-bottom,.profile-notebook-caption,.profile-notebook-notes {display:none;}.profile-starting {left:24px;right:auto;top:auto;bottom:10px;transform:none;padding:0;background:none;border:0;box-shadow:none;backdrop-filter:none;font-size:11px;max-width:42%;line-height:1.2;}.profile-tiny-label {display:none;}.profile-doodles {position:absolute;right:14px;top:12px;bottom:12px;left:48%;height:auto;margin:0;}.profile-doodle-slot {width:60px;}.profile-doodle svg {width:28px;height:28px;}.profile-doodle span {font-size:8px;margin:1px 0 0;}.profile-slot-coffee {top:0;left:0;}.profile-slot-music {left:57%;top:5px;}.profile-slot-tree {left:12%;top:55px;}.profile-slot-star {left:63%;top:58px;}.profile-empty-art {inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;}.profile-sparkle {font-size:26px;margin:0 0 4px;}.profile-empty-art p {font-size:12px;line-height:1.35;}
.profile-progress {margin-bottom:16px;font-size:12px;gap:12px;}.profile-progress-track {width:120px;}.profile-onboarding h1 {font-size:28px;margin-bottom:8px;}.profile-onboarding .profile-description {font-size:14px;margin-bottom:16px;}.profile-choices {gap:8px;}.profile-choice {padding:10px 12px;min-height:50px;border-radius:14px;}.profile-choice-content {font-size:14px;}.profile-choices-interests .profile-choice-content {flex-direction:row;align-items:center;font-size:13px;}.profile-choices-interests .profile-choice {min-height:60px;}.profile-choice-icon {width:30px;height:30px;flex-basis:30px;}.profile-choice-icon svg {width:18px;height:18px;}.profile-navigation {padding-top:16px;}.profile-primary {min-height:44px;padding:10px 16px;}.profile-bottomline {margin-top:26px;font-size:11px;flex-wrap:wrap;}.profile-bottomline>span:last-child {display:none;}.profile-summary-labels {margin:18px 0 22px;gap:7px;}.profile-summary-labels span {font-size:13px;padding:6px 11px;}
}
@media(max-width:355px) {.profile-choice-content {font-size:12px;}.profile-choice-icon {display:none;}.profile-primary {font-size:13px!important;gap:8px;padding-inline:12px;}.profile-navigation>div {gap:12px;}.profile-onboarding h1 {font-size:26px;}}
@media(prefers-reduced-motion:reduce) {
  .profile-onboarding *, .profile-onboarding *::before,.profile-onboarding *::after {animation:none!important;transition:none!important;scroll-behavior:auto!important;}
  .profile-onboarding button:active,.profile-primary svg {transform:none!important;}
}
`;


// Four provisional, offline Lucide icons (ISC license). No runtime image generation.
const ART = {
 coffee: '<path d="M10 2v2M14 2v2M6 2v2M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/>',
 music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
 tree: '<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0ZM7 16v6M13 19v3M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"/>',
 star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>',
};
const svg = (type, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ART[type] || ART.star}</svg>`;
const arrow = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
const esc = value => window.ui.esc(value);
const INFO = [
 ['Your home base.', 'Where in Boston do you call home?', 'A neighborhood is plenty, no exact address. We use it to find spots near you.'],
 ['The things you love.', 'What are you into?', 'Choose up to three. These shape every idea the site suggests for you.'],
 ['Your people.', 'How do you usually like to go out?', 'Pick the one that sounds most like you.'],
 ['Your style.', 'What kind of plans suit you best?', 'Choose up to two.'],
 ['Your usual spend.', 'What do you usually like to spend on a night out?', 'Per person, before transport. Spark can always go bigger or smaller on the night.'],
 ['Your radius.', 'How far are you usually happy to go?', 'Your usual range. Spark handles the specifics.'],
];
const ART_FOR_INTEREST = {food_cafes:'coffee',live_music:'music',sports:'star',art_culture:'star',parks_walks:'tree',classes_games:'star'};
const sessionDrafts = new Map();

// The chosen Playful study, at 1×: 280 ms lift, 250 ms indicator flick.
// State changes remain synchronous; motion only reflects an accepted action.
function attachPlayfulMotion(root) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Map();
  function animate(target, frames, duration, easing = 'linear') {
    if (!target || preference.matches || document.hidden || typeof target.animate !== 'function') return;
    const previous = active.get(target);
    if (previous) {
      const visible = getComputedStyle(target);
      frames[0] = {...frames[0], transform:visible.transform};
      if (frames.some(frame => 'opacity' in frame)) frames[0].opacity = visible.opacity;
      active.delete(target);
      previous.cancel();
    }
    const animation = target.animate(frames, {duration, easing, fill:'none'});
    active.set(target, animation);
    const release = () => { if (active.get(target) === animation) active.delete(target); };
    animation.onfinish = release;
    animation.oncancel = release;
  }
  function cancel() {
    for (const animation of active.values()) animation.cancel();
    active.clear();
  }
  function lift(target) {
    animate(target, [
      {transform:'translateY(0) scale(.97)',offset:0,easing:'cubic-bezier(.2,.8,.2,1)'},
      {transform:'translateY(-2px) scale(1)',offset:.4,easing:'cubic-bezier(.4,0,.3,1)'},
      {transform:'translateY(0) scale(1)',offset:1}
    ], 280);
  }
  function choice(label, selected) {
    const indicator = label.querySelector('.profile-choice-indicator');
    if (selected) {
      lift(label);
      animate(indicator, [
        {transform:'translate(-5px,4px) scale(.65)',opacity:0,offset:0,easing:'cubic-bezier(.2,.8,.2,1)'},
        {transform:'translate(1px,-1px) scale(1.08)',opacity:1,offset:.65,easing:'ease-out'},
        {transform:'translate(0,0) scale(1)',opacity:1,offset:1}
      ], 250);
    } else {
      animate(label, [{transform:'scale(.98)'},{transform:'scale(1)'}], 120, 'cubic-bezier(.2,.8,.2,1)');
      if (active.has(indicator)) animate(indicator, [{transform:'none',opacity:1},{transform:'none',opacity:1}], 120, 'ease-out');
    }
  }
  function press(event) {
    const button = event.target.closest?.('button');
    if (button && root.contains(button) && !button.disabled) lift(button);
  }
  const visibility = () => { if (document.hidden) cancel(); };
  // Capture before a button's navigation handler; never wait for animation.
  root.addEventListener('click', press, true);
  preference.addEventListener('change', cancel);
  document.addEventListener('visibilitychange', visibility);
  return {
    choice, cancel,
    enterDialog(dialog) {
      animate(dialog, [{transform:'translateY(4px) scale(.97)',opacity:0},{transform:'translateY(0) scale(1)',opacity:1}], 280, 'cubic-bezier(.2,.8,.2,1)');
    },
    dispose() {
      cancel();
      root.removeEventListener('click', press, true);
      preference.removeEventListener('change', cancel);
      document.removeEventListener('visibilitychange', visibility);
    }
  };
}

function mount(container, config = {}) {
  const storageKey = config.storageKey || `tonight:boston-notebook:v1:${window.app?.user || 'guest'}`;
  let storage, saved = false, disposed = false, completionPending = false, completedThisMount = false;
  let profile = validateProfile(config.initialProfile) || createProfile();
  let screen = 0;
  try {
    storage = config.storage === undefined ? window.localStorage : config.storage;
    if (!config.initialProfile) {
      const record = sessionDrafts.get(storageKey) || JSON.parse(storage?.getItem(storageKey) || 'null');
      const restored = record && validateProfile(record.profile);
      const index = record?.screen === 'summary' ? 6 : QUESTIONS.indexOf(record?.screen);
      if (restored && index >= 0) { profile = restored; screen = index; }
    }
  } catch { /* Storage is optional. The session remains fully functional. */ }
  if (!config.initialProfile && sessionDrafts.has(storageKey)) {
    const record = sessionDrafts.get(storageKey);
    profile = validateProfile(record.profile) || profile;
    screen = record.screen === 'summary' ? 6 : Math.max(0, QUESTIONS.indexOf(record.screen));
  }
  if (config.initialProfile) profile.completionState = 'in_progress';
  function persist() {
    sessionDrafts.set(storageKey, JSON.parse(JSON.stringify({profile, screen: screen === 6 ? 'summary' : QUESTIONS[screen]})));
    try {
      if (!storage) throw new Error('Storage unavailable');
      storage.setItem(storageKey, JSON.stringify({profile, screen: screen === 6 ? 'summary' : QUESTIONS[screen]}));
      saved = true;
    } catch { saved = false; }
    const status = container.querySelector('[data-save-status]');
    if (status) status.textContent = saved ? 'Saved on this device' : 'Changes will last for this visit.';
  }
  if (!document.getElementById('profile-notebook-style')) {
    const style = document.createElement('style'); style.id = 'profile-notebook-style'; style.textContent = STYLES; document.head.appendChild(style);
  }
  container.innerHTML = `<section class="profile-onboarding" aria-label="Your Boston notebook">
    <div class="profile-topline"><span>LET’S GET TO KNOW YOU</span><button type="button" class="profile-text-button" data-reset>Start over</button></div>
    <div class="profile-layout"><div class="profile-question-side"><div class="profile-progress" aria-label="Onboarding progress"><div class="profile-progress-track">${QUESTIONS.map((_,i)=>`<span data-progress="${i}"></span>`).join('')}</div><span data-step-count></span></div><div data-question></div></div>
    <aside class="profile-notebook-side" aria-label="Notebook preview"><div class="profile-notebook" aria-hidden="true"><div class="profile-binding">${Array(9).fill('<i></i>').join('')}</div><div class="profile-paper-content"><div class="profile-paper-top"><span>THE POSSIBILITIES EDITION</span><span>VOL. 01</span></div><div class="profile-book-title">Hello,<br><em>Boston.</em></div><div class="profile-book-subtitle">A city of possibilities.<br>A few that feel like you.</div><div class="profile-starting"><span class="profile-tiny-label">MY STARTING POINT</span><span data-notebook-area>Somewhere new</span></div><div class="profile-doodles">${['coffee','music','tree','star'].map(k=>`<div class="profile-doodle-slot profile-slot-${k}" data-slot="${k}"></div>`).join('')}<div class="profile-empty-art" data-empty-art><span class="profile-sparkle">✳</span><p>A little curiosity.<br>A whole city ahead.</p></div></div><div class="profile-notebook-notes" data-notebook-notes></div><div class="profile-paper-bottom"><span data-book-name>YOUR NEXT CHAPTER</span><span>BOSTON, MA ↗</span></div></div></div><p class="profile-notebook-caption">The more it knows you, the better every idea gets.</p></aside>
    </div><div class="profile-bottomline"><span class="profile-save"><span class="profile-save-dot"></span><span data-save-status role="status"></span></span><span>Update it whenever you change.</span></div>
    <dialog class="profile-reset-dialog" aria-labelledby="profile-reset-title" aria-describedby="profile-reset-description"><h2 id="profile-reset-title">Turn to a fresh page?</h2><p id="profile-reset-description">This clears the answers in this notebook on this device.</p><div><button type="button" class="profile-secondary" data-cancel-reset>Keep my notebook</button><button type="button" class="profile-primary" data-confirm-reset>Start over</button></div></dialog>
  </section>`;
  const root = container.querySelector('.profile-onboarding');
  const motion = attachPlayfulMotion(root);
  const dialog = root.querySelector('dialog');
  root.querySelector('[data-reset]').onclick = () => { dialog.showModal(); motion.enterDialog(dialog); };
  root.querySelector('[data-cancel-reset]').onclick = () => dialog.close();
  root.querySelector('[data-confirm-reset]').onclick = () => {
    profile = createProfile(); screen = 0; completedThisMount = false; dialog.close(); persist(); render(true);
    if (config.onReset) config.onReset();
  };
  function hasAnswer(id) {
    if (id === 'neighborhood') return profile.neighborhoodAnswer !== 'unanswered';
    if (id === 'interests' || id === 'comfort') return profile[id].mode !== 'unanswered';
    if (id === 'travel') return !!profile.travelRange || profile.transportIds.length > 0;
    return profile[id] !== null;
  }
  function changed(questionId) {
    if (hasAnswer(questionId)) profile.skippedQuestionIds = profile.skippedQuestionIds.filter(q => q !== questionId);
    profile.completionState = 'in_progress'; completedThisMount = false; persist(); syncChoices(true); updateNotebook();
  }
  function selected(group, id) {
    if (group === 'neighborhood') return id === 'not_sure' ? profile.neighborhoodAnswer === 'not_sure' : profile.neighborhoodId === id;
    if (group === 'interests' || group === 'comfort') return profile[group].mode === id || profile[group].ids.includes(id);
    if (group === 'range') return profile.travelRange === id;
    if (group === 'transport') return profile.transportIds.includes(id);
    return profile[group] === id;
  }
  function choose(group, id) {
    if (group === 'neighborhood') { profile.neighborhoodId = id === 'not_sure' ? null : id; profile.neighborhoodAnswer = id === 'not_sure' ? 'not_sure' : 'selected'; }
    else if (group === 'interests' || group === 'comfort') {
      const special = group === 'interests' ? 'open_to_anything' : 'no_strong_preference';
      const limit = group === 'interests' ? 3 : 2;
      if (id === special) profile[group] = {mode:profile[group].mode === special ? 'unanswered' : special,ids:[]};
      else {
        let ids = profile[group].ids;
        if (ids.includes(id)) ids = ids.filter(v=>v!==id);
        else if (ids.length < limit) ids = [...ids,id];
        else { announce(`Choose up to ${limit}. Unselect one to add another.`); syncChoices(); return; }
        profile[group] = {mode:ids.length ? 'selected' : 'unanswered',ids};
      }
    } else if (group === 'range') profile.travelRange = id;
    else if (group === 'transport') profile.transportIds = profile.transportIds.includes(id) ? profile.transportIds.filter(v=>v!==id) : [...profile.transportIds,id];
    else profile[group] = id;
    changed(group === 'range' || group === 'transport' ? 'travel' : group);
  }
  function announce(text) { const el = root.querySelector('[data-feedback]'); if (el) el.textContent = text; }
  function syncChoices(withMotion = false) {
    root.querySelectorAll('[data-choice]').forEach(input => {
      const label = input.closest('label');
      const wasSelected = label.classList.contains('profile-selected');
      input.checked = selected(input.dataset.group,input.value);
      label.classList.toggle('profile-selected',input.checked);
      if (withMotion && wasSelected !== input.checked) motion.choice(label,input.checked);
    });
    if (screen === 1 || screen === 3) {
      const group = screen === 1 ? 'interests' : 'comfort'; const limit = screen === 1 ? 3 : 2;
      const count = profile[group].ids.length;
      announce(profile[group].mode === 'selected' ? `${count} of ${limit} selected${count===limit ? '. Unselect one to add another.' : ''}` : `Choose up to ${limit}`);
    }
  }
  function updateNotebook() {
    root.querySelector('[data-notebook-area]').textContent = profile.neighborhoodAnswer === 'not_sure' ? 'Still finding my bearings' : OPTIONS.neighborhood.find(x=>x.id===profile.neighborhoodId)?.label || 'Somewhere new';
    const arts = [...new Set(profile.interests.ids.map(id=>ART_FOR_INTEREST[id]))];
    if (profile.interests.mode === 'open_to_anything') arts.push('star');
    const captions = {coffee:'One more café',music:'Find my soundtrack',tree:'Take the scenic route',star:profile.interests.mode === 'open_to_anything' ? 'Open to possibility' : 'Try something good'};
    for (const k of ['coffee','music','tree','star']) {
      const slot = root.querySelector(`[data-slot="${k}"]`);
      if (arts.includes(k) && !slot.firstChild) slot.innerHTML = `<div class="profile-doodle">${svg(k)}<span></span></div>`;
      else if (!arts.includes(k)) slot.replaceChildren();
      if (slot.firstChild) slot.querySelector('span').textContent = captions[k];
    }
    root.querySelector('[data-empty-art]').hidden = arts.length > 0;
    const notes = [];
    if (profile.company) notes.push(OPTIONS.company.find(x=>x.id===profile.company).label);
    if (profile.comfort.mode==='no_strong_preference') notes.push('Taking it as it comes');
    else if (profile.comfort.ids.length) notes.push(OPTIONS.comfort.find(x=>x.id===profile.comfort.ids[0]).label);
    if (profile.budget) notes.push(OPTIONS.budget.find(x=>x.id===profile.budget).label);
    if (profile.transportIds.length) notes.push(OPTIONS.transport.filter(x=>profile.transportIds.includes(x.id)).map(x=>x.label).join(' + '));
    else if (profile.travelRange) notes.push(OPTIONS.range.find(x=>x.id===profile.travelRange).label);
    root.querySelector('[data-notebook-notes]').innerHTML = notes.slice(0,3).map(n=>`<span>${esc(n)}</span>`).join('') || '<span class="profile-faint-note">The good bits will find their way here.</span>';
    root.querySelector('[data-book-name]').textContent = profile.name?.trim() ? `${profile.name.trim()}’s next chapter` : 'YOUR NEXT CHAPTER';
  }
  function choices(group, multi = false) {
    let items = OPTIONS[group];
    const interestIcons = {food_cafes:'coffee',live_music:'music',sports:'star',art_culture:'star',parks_walks:'tree',classes_games:'star'};
    return `<div class="profile-choices profile-choices-${group}">${items.map((o,i)=>`<label class="profile-choice ${selected(group,o.id)?'profile-selected':''}"><input data-choice data-group="${group}" type="${multi?'checkbox':'radio'}" name="${group}" value="${o.id}" ${selected(group,o.id)?'checked':''} ${multi?'aria-describedby="profile-choice-feedback"':''}><span class="profile-choice-content">${group === 'interests' ? `<span class="profile-choice-icon profile-icon-${interestIcons[o.id]}">${svg(interestIcons[o.id])}</span>`:''}<span>${esc(o.label)}${o.detail ? `<small>${esc(o.detail)}</small>` : ''}</span></span><span class="profile-choice-indicator" aria-hidden="true">${multi?'✓':''}</span></label>`).join('')}</div>`;
  }
  function specialChoice(group,id,label) {
    return `<label class="profile-any"><input data-choice data-group="${group}" type="checkbox" name="${group}" value="${id}" ${selected(group,id)?'checked':''}><span>${label}</span></label>`;
  }
  function render(focus) {
    motion.cancel();
    root.classList.toggle('profile-is-summary',screen===6);
    root.querySelectorAll('[data-progress]').forEach((el,i)=> { el.classList.toggle('profile-progress-done',i<screen); el.classList.toggle('profile-progress-current',i===screen); });
    root.querySelector('[data-step-count]').textContent = screen===6 ? 'Made for you' : `${screen+1} of 6`;
    const body = root.querySelector('[data-question]');
    if (screen === 6) {
      const labels = summaryLabels(profile);
      const empty = QUESTIONS.every(id=>!hasAnswer(id));
      body.innerHTML = `<div class="profile-question-content"><div class="profile-eyebrow">THIS IS YOU</div><h1 tabindex="-1" data-heading>Your Boston<br>profile<span class="profile-heading-dot">.</span></h1><p class="profile-description">${empty?'Nothing yet. Add a few answers so the site can get to know you.':'Spark, Group plans and Network use this to tailor every idea to you.'}</p><div class="profile-summary-labels">${labels.map(label=>`<span>${esc(label)}</span>`).join('')}</div><label class="profile-name-label" for="profile-name">Make it yours <span>(name optional)</span></label><input id="profile-name" class="profile-name-input" type="text" maxlength="40" autocomplete="given-name" placeholder="Your first name" value="${esc(profile.name||'')}"><p class="profile-summary-note">You can change these anytime.</p><button type="button" class="profile-primary profile-complete" data-complete>Save my profile ${arrow}</button><button type="button" class="profile-edit profile-text-button" data-edit>Edit my answers</button><p class="profile-feedback" role="status" data-feedback></p></div>`;
      body.querySelector('[data-edit]').onclick = () => {screen=0;profile.completionState='in_progress';completedThisMount=false;persist();render(true);};
      body.querySelector('#profile-name').oninput = e => { profile.name=e.target.value;profile.completionState='in_progress';completedThisMount=false;persist();updateNotebook(); };
      body.querySelector('[data-complete]').onclick = async () => {
        if (completionPending || completedThisMount) return;
        completionPending=true; const button=body.querySelector('[data-complete]');button.disabled=true;
        const nameInput=body.querySelector('#profile-name'), editButton=body.querySelector('[data-edit]');
        nameInput.disabled=true;editButton.disabled=true;button.setAttribute('aria-busy','true');
        profile.completionState='complete';persist();
        try { await config.onComplete?.(JSON.parse(JSON.stringify(profile))); completedThisMount=true; }
        catch { if(!disposed) announce('Your notebook is ready. The next screen couldn’t open. Please try again.'); }
        finally {completionPending=false;if(!disposed){button.disabled=false;nameInput.disabled=false;editButton.disabled=false;button.removeAttribute('aria-busy');}}
      };
      body.querySelector('#profile-name').onkeydown = e => {if(e.key==='Enter' && !e.isComposing){e.preventDefault();body.querySelector('[data-complete]').click();}};
    } else {
      const [kicker,title,description] = INFO[screen];
      let fields = '';
      if (screen===0) fields=choices('neighborhood');
      if (screen===1) fields=choices('interests',true)+specialChoice('interests','open_to_anything','Open to anything');
      if (screen===2) fields=choices('company');
      if (screen===3) fields=choices('comfort',true)+specialChoice('comfort','no_strong_preference','No strong preference');
      if (screen===4) fields=choices('budget');
      if (screen===5) fields=`<fieldset class="profile-subgroup"><legend>Travel range</legend>${choices('range')}</fieldset><fieldset class="profile-subgroup"><legend>Getting there <span>— select any</span></legend>${choices('transport',true)}</fieldset><p class="profile-travel-note">A preference, not a promise of exact travel times.</p>`;
      body.innerHTML = `<form class="profile-question-content"><div class="profile-eyebrow">${esc(kicker)}</div><h1 tabindex="-1" id="profile-question-heading" data-heading>${esc(title)}</h1><p class="profile-description">${esc(description)}</p><fieldset class="profile-fieldset" aria-labelledby="profile-question-heading">${fields}</fieldset><p id="profile-choice-feedback" class="profile-feedback" role="status" data-feedback></p><div class="profile-navigation"><button type="button" class="profile-back profile-text-button" data-back ${screen===0?'disabled':''}>${arrow} Back</button><div><button type="button" class="profile-skip profile-text-button" data-skip>Skip</button><button type="submit" class="profile-primary">${screen===5?'See my notebook':'Continue'} ${arrow}</button></div></div><p class="profile-step-footnote">${screen===0?'About a minute. This is about you in general. Tonight’s plans happen in Spark.':'Not sure? Skip it. You can change any answer later.'}</p></form>`;
      const go = next => { screen=next;persist();render(true); };
      body.querySelector('form').onsubmit = e => {e.preventDefault();go(screen+1);};
      body.querySelector('form').onkeydown = e => {if(e.key==='Enter' && e.target.matches('input[type="radio"],input[type="checkbox"]'))e.preventDefault();};
      body.querySelector('[data-back]').onclick = () => go(Math.max(0,screen-1));
      body.querySelector('[data-skip]').onclick = () => {const q=QUESTIONS[screen];profile=clearQuestion(profile,q);profile.skippedQuestionIds.push(q);go(screen+1);};
      body.querySelectorAll('[data-choice]').forEach(input=>input.onchange=()=>choose(input.dataset.group,input.value));
      syncChoices();
    }
    updateNotebook();
    if (focus) body.querySelector('[data-heading]').focus();
  }
  persist(); render(false);
  return () => { disposed=true;motion.dispose();if(dialog.open)dialog.close();container.replaceChildren(); };
}


/**
 * Route-free public entry point for the landing and destination owners.
 * mount(container, { initialProfile?, onComplete(profile), storageKey?, storage? })
 * returns an unmount callback. Storage injection is optional (useful for testing).
 */
window.BostonOnboarding = Object.freeze({ mount, createProfile, validateProfile, clearQuestion, summaryLabels, toDestination, options: OPTIONS, questions: QUESTIONS });

// Serialize this feature's account writes so a reset cannot be overtaken by
// an earlier completion. Other profile keys remain owned by their features.
// Readable "who I am" fields from the shared profile contract, so Spark and
// the idea engine use them directly (they're sent to Claude with every request).
const BUDGET_TO_COST = {free:'free',under_25:'$',under_50:'$$',flexible:'$$$'};
function aboutMe(n) {
  const label = (group, id) => optionLabel(group, id);
  const out = {city: 'Boston'};
  if (n.name) out.name = n.name;
  if (n.neighborhoodAnswer === 'selected') out.neighborhood = label('neighborhood', n.neighborhoodId);
  if (n.interests.mode === 'open_to_anything') out.interests = ['open to anything'];
  else if (n.interests.ids.length) out.interests = n.interests.ids.map(id => label('interests', id));
  if (n.company) { out.company = label('company', n.company); out.groupSize = n.company === 'solo' ? 1 : n.company === 'bringing_someone' ? 2 : undefined; }
  if (n.comfort.ids.length) out.vibes = n.comfort.ids.map(id => label('comfort', id));
  if (n.budget) out.budget = BUDGET_TO_COST[n.budget];
  const travel = [label('range', n.travelRange), ...n.transportIds.map(id => label('transport', id))].filter(Boolean);
  if (travel.length) out.travel = travel.join(', ');
  for (const k of Object.keys(out)) if (out[k] === undefined) delete out[k];
  return out;
}
const ABOUT_ME_KEYS = ['name','neighborhood','interests','company','groupSize','vibes','budget','travel'];

let accountSaveQueue = Promise.resolve();
function saveTeamNotebook(notebook) {
  const owner = app.user;
  const merged = {...app.profile};
  for (const k of ABOUT_ME_KEYS) delete merged[k];
  if (notebook) Object.assign(merged, aboutMe(notebook), {bostonNotebook: notebook});
  else delete merged.bostonNotebook;
  app.profile = merged;
  const save = accountSaveQueue.catch(() => {}).then(async () => {
    if (app.user !== owner) throw new Error('Account changed before save');
    // Read the other fields when the write starts, preserving intervening edits.
    const target = {...app.profile};
    // Replace this feature's fields wholesale so skipped answers don't linger.
    for (const k of ABOUT_ME_KEYS) delete target[k];
    if (notebook) Object.assign(target, aboutMe(notebook), {bostonNotebook: notebook});
    else delete target.bostonNotebook;
    // Same endpoint/body as app.saveProfile, with a session guard so a late
    // response cannot replace the profile of someone who has just logged in.
    const result = await api('PUT', '/api/profile', {profile:target});
    if (app.user === owner) app.profile = result.profile;
  });
  accountSaveQueue = save;
  return save;
}

registerFeature({
  id: 'profile', label: 'My profile', icon: '📓',
  render(view) {
    let cleanup, disposed = false, revision = 0;
    function edit(initialProfile) {
      revision++;
      if (cleanup) cleanup();
      cleanup = mount(view, {initialProfile, onComplete, onReset() {
        revision++;
        saveTeamNotebook(null).catch(() => {
          if (!disposed) ui.toast('Cleared for this visit. Account sync didn’t finish.');
        });
      }});
    }
    // One-page editor for a finished profile: every answer visible, tap to
    // change, autosaves to the account. "Retake the quiz" reopens the steps.
    function showEditor(start, {justSaved = false, savedToAccount = true} = {}) {
      if (cleanup) {cleanup();cleanup=null;}
      if (!document.getElementById('profile-notebook-style')) {
        const style = document.createElement('style'); style.id = 'profile-notebook-style'; style.textContent = STYLES; document.head.appendChild(style);
      }
      const profile = validateProfile(start) || createProfile();
      profile.completionState = 'complete';
      const hasSpark = window.FEATURES.some(feature => feature.id === 'solo');
      const ICON = {food_cafes:'coffee',live_music:'music',sports:'star',art_culture:'star',parks_walks:'tree',classes_games:'star'};
      const isOn = (group, id) => {
        if (group === 'neighborhood') return id === 'not_sure' ? profile.neighborhoodAnswer === 'not_sure' : profile.neighborhoodId === id;
        if (group === 'interests' || group === 'comfort') return profile[group].mode === id || profile[group].ids.includes(id);
        if (group === 'range') return profile.travelRange === id;
        if (group === 'transport') return profile.transportIds.includes(id);
        return profile[group] === id;
      };
      const opts = (group, multi) => `<div class="profile-choices profile-choices-${group}">${OPTIONS[group].map(o => `<label class="profile-choice"><input data-choice data-group="${group}" type="${multi ? 'checkbox' : 'radio'}" name="edit-${group}" value="${o.id}"><span class="profile-choice-content">${group === 'interests' ? `<span class="profile-choice-icon profile-icon-${ICON[o.id]}">${svg(ICON[o.id])}</span>` : ''}<span>${esc(o.label)}</span></span><span class="profile-choice-indicator" aria-hidden="true">${multi ? '✓' : ''}</span></label>`).join('')}</div>`;
      const extra = (group, id, label) => `<label class="profile-any"><input data-choice data-group="${group}" type="checkbox" value="${id}"><span>${label}</span></label>`;
      const card = (emoji, title, hint, body, cls = '') => `<section class="profile-editor-card ${cls}"><h2>${emoji} ${title}</h2>${hint ? `<p class="profile-editor-hint">${hint}</p>` : ''}${body}</section>`;
      const hello = () => profile.name ? `Nice to meet you, ${esc(profile.name)}.` : 'Your profile';
      view.innerHTML = `<section class="profile-onboarding profile-editor" aria-labelledby="profile-editor-heading">
        <div class="profile-topline"><span>${justSaved ? 'PROFILE SAVED 🎉' : 'THIS IS YOU'}</span><button type="button" class="profile-text-button" data-retake>Retake the quiz</button></div>
        <h1 id="profile-editor-heading" tabindex="-1">${justSaved ? hello() : 'Your profile'}</h1>
        <p class="profile-description">Tap anything to change it. Changes save automatically and shape every idea on the site.${hasSpark ? ' Plans for tonight happen in Spark.' : ''}</p>
        <div class="profile-editor-bar"><span class="profile-save"><span class="profile-save-dot" data-dot></span><span data-status role="status"></span><button type="button" class="profile-text-button" data-retry hidden>Try again</button></span>${hasSpark ? `<a class="profile-primary" href="#/solo">Plan tonight in Spark ${arrow}</a>` : ''}</div>
        <div class="profile-editor-grid">
          ${card('👋', 'What should we call you?', '', `<input class="profile-name-input" data-name type="text" maxlength="40" autocomplete="given-name" placeholder="Your first name">`)}
          ${card('🏠', 'Home base', 'Your Boston neighborhood.', opts('neighborhood'))}
          ${card('💛', 'What you’re into', 'Pick up to three.', opts('interests', true) + extra('interests', 'open_to_anything', 'Open to anything'))}
          ${card('🧑‍🤝‍🧑', 'How you like to go out', '', opts('company'))}
          ${card('✨', 'Plans that suit you', 'Pick up to two.', opts('comfort', true) + extra('comfort', 'no_strong_preference', 'No strong preference'))}
          ${card('💸', 'Usual spend', 'Per person, before transport.', opts('budget'))}
          ${card('🧭', 'How far you’ll go', '', `${opts('range')}<p class="profile-editor-hint profile-editor-sub">Getting there</p>${opts('transport', true)}`, 'profile-editor-wide')}
        </div></section>`;
      const $ = sel => view.querySelector(sel);
      const nameInput = $('[data-name]'); nameInput.value = profile.name || '';
      function sync() {
        view.querySelectorAll('[data-choice]').forEach(input => {
          input.checked = isOn(input.dataset.group, input.value);
          input.closest('label').classList.toggle('profile-selected', input.checked);
        });
      }
      let timer, saving = 0;
      function status(text, state) {
        $('[data-status]').textContent = text;
        $('[data-dot]').className = 'profile-save-dot' + (state ? ' profile-save-' + state : '');
        $('[data-retry]').hidden = state !== 'error';
      }
      async function saveNow() {
        clearTimeout(timer);
        const mine = ++saving, snapshot = JSON.parse(JSON.stringify(profile));
        status('Saving…', 'busy');
        try {
          try { localStorage.setItem(`tonight:boston-notebook:v1:${app.user || 'guest'}`, JSON.stringify({profile: snapshot, screen: 'summary'})); } catch {}
          sessionDrafts.delete(`tonight:boston-notebook:v1:${app.user || 'guest'}`);
          await saveTeamNotebook(snapshot);
          if (!disposed && mine === saving) status('All changes saved');
        } catch { if (!disposed && mine === saving) status('Couldn’t save to your account.', 'error'); }
      }
      const queueSave = () => { status('Saving…', 'busy'); clearTimeout(timer); timer = setTimeout(saveNow, 450); };
      function change(group, id, checked) {
        if (group === 'neighborhood') { profile.neighborhoodAnswer = id === 'not_sure' ? 'not_sure' : 'selected'; profile.neighborhoodId = id === 'not_sure' ? null : id; }
        else if (group === 'interests' || group === 'comfort') {
          const special = group === 'interests' ? 'open_to_anything' : 'no_strong_preference', limit = group === 'interests' ? 3 : 2;
          if (id === special) profile[group] = {mode: checked ? special : 'unanswered', ids: []};
          else {
            let ids = profile[group].ids.filter(v => v !== id);
            if (checked) { if (ids.length >= limit) { ui.toast(`Pick up to ${limit}. Unselect one first.`); sync(); return; } ids = [...ids, id]; }
            profile[group] = {mode: ids.length ? 'selected' : 'unanswered', ids};
          }
        }
        else if (group === 'range') profile.travelRange = id;
        else if (group === 'transport') profile.transportIds = checked ? [...new Set([...profile.transportIds, id])] : profile.transportIds.filter(v => v !== id);
        else profile[group] = id;
        const q = group === 'range' || group === 'transport' ? 'travel' : group;
        profile.skippedQuestionIds = profile.skippedQuestionIds.filter(x => x !== q || !hasQuestionAnswer(profile, x));
        sync();
        const label = view.querySelector(`[data-group="${group}"][value="${id}"]`)?.closest('label');
        if (label && label.animate && !matchMedia('(prefers-reduced-motion: reduce)').matches) label.animate([{transform:'scale(.97)'},{transform:'translateY(-2px)'},{transform:'none'}], {duration:260, easing:'cubic-bezier(.2,.8,.2,1)'});
        queueSave();
      }
      view.querySelectorAll('[data-choice]').forEach(input => input.onchange = () => change(input.dataset.group, input.value, input.checked));
      nameInput.oninput = () => { const v = nameInput.value.trim(); if (v) profile.name = v; else delete profile.name; queueSave(); };
      $('[data-retry]').onclick = saveNow;
      $('[data-retake]').onclick = () => { clearTimeout(timer); edit(JSON.parse(JSON.stringify(profile))); };
      sync();
      status(savedToAccount ? (justSaved ? 'Saved to your account' : 'All changes saved') : 'Couldn’t save to your account.', savedToAccount ? '' : 'error');
      cleanup = () => { if (timer) { clearTimeout(timer); saveNow(); } };
      view.querySelector('h1').focus();
    }
    async function onComplete(profile) {
      const ownRevision=++revision;
      const payload=toDestination(profile);
      let savedToAccount=false;
      try {await saveTeamNotebook(payload.profile);savedToAccount=true;} catch { /* Device/session draft remains usable. */ }
      if (disposed || revision !== ownRevision) return;
      window.dispatchEvent(new CustomEvent('boston:onboarding-complete', {detail:payload}));
      // The destination owner supplies this optional adapter and controls routing.
      if (typeof app.openBostonRecommendations === 'function') {
        if (!savedToAccount) ui.toast('Account save didn’t finish. Your notebook is available for this visit.');
        await app.openBostonRecommendations(payload);
        return;
      }
      showEditor(payload.profile,{justSaved:true,savedToAccount});
    }
    // A local draft takes precedence on normal feature re-entry. Explicit Edit
    // uses initialProfile; a first server-provided notebook is only a fallback.
    let hasLocalDraft = sessionDrafts.has(`tonight:boston-notebook:v1:${app.user || 'guest'}`);
    try {
      const record = JSON.parse(localStorage.getItem(`tonight:boston-notebook:v1:${app.user || 'guest'}`) || 'null');
      hasLocalDraft ||= !!validateProfile(record?.profile) && (QUESTIONS.includes(record?.screen) || record?.screen === 'summary');
    } catch {}
    // A finished profile opens straight into the one-page editor.
    const accountNotebook = validateProfile(app.profile?.bostonNotebook);
    if (accountNotebook?.completionState === 'complete') showEditor(accountNotebook);
    else edit(hasLocalDraft ? undefined : accountNotebook || undefined);
    return () => {disposed=true;revision++;if(cleanup)cleanup();};
  }
});
})();
