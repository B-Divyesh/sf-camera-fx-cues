# Adversarial first-read review 2 — Camera FX Cues

Reviewed 2026-08-28 against commit `d4cde88e315076e909682a03d3233520994d4ebb` and the live site at `https://camera-fx-cues.sociobot.in`. The built application files match the deployed files by SHA-256. Product code was not changed.

## Verdict: FAIL

One blocking routing defect and seven minor findings remain. The landing page is understandable and the demo, registered claims, privacy boundary, build, and accessibility gates pass. `PASS` still requires zero findings and no unlisted claim.

## Cold first read

Fresh Chromium contexts opened the live root at 390 × 844 and 1440 × 900 with no prior storage, no scroll, no cross-origin request, and no console error.

Before scrolling, my answers were:

| Question | Answer in my own words | Exact live evidence | Result |
|---|---|---|---|
| What does this do? | It puts six keyboard-triggered effects on a camera view. | “Trigger camera effects with keys” | clear |
| Who is it for? | Game-jam and classroom teams. | “For game-jam and classroom teams who need playful camera cues without sending video away.” | clear |
| What should I click first? | Open the ready-made sample. | “Try it with sample data” and the visible first line “Opens the sample signal.” | clear |

The three-question blocking gate passes. At 390 px, however, the CTA explanation ends below the fold and all three fact lines are below it; that separate mandatory first-screen issue is F-2-2.

## Findings

### F-2-1 — BLOCKING — browser Back loses the prior scroll position

- **Location / evidence:** Live SPA navigation from `/` at `scrollY = 1663` to `/privacy`, followed by browser Back, returned to `/` at `scrollY = 0`. Focus and the live-region announcement correctly moved to “Trigger camera effects with keys.” In code, `popstate` calls `render()` and `focusRouteHeading()` but does not restore the previous history entry's scroll position. The existing route test checks URL and focus only.
- **Why this fails:** The site-structure contract requires back/forward navigation to restore both scroll and focus. A phone visitor who opens Privacy after reading the lower landing sections is returned to the top and loses their place. This is broken routing behavior.
- **Concrete fix:** Store scroll coordinates in each history entry before SPA navigation, set `history.scrollRestoration = 'manual'`, and restore the destination entry after render while retaining H1 focus with `preventScroll`. Add a Playwright regression that scrolls well down `/`, navigates to `/privacy`, and verifies Back and Forward restore the recorded positions and focus the new H1.

### F-2-2 — Minor — the required three facts are not in the first phone screen

- **Location / quote:** At 390 × 844, “Try it with sample data” ends at y=796. “Opens the sample signal. Your real presets stay untouched.” spans y=811–876, so its second sentence is clipped. “Camera stays in your browser,” “Works with six number keys,” and “Starts without an account” are all below the fold.
- **Why this matters:** The mandatory first-screen shape includes the action explanation and three short facts. The hero art consumes enough vertical space that the phone version does not show that proof before scrolling.
- **Concrete fix:** Compact or reposition the mobile art/copy so the full two-sentence action explanation and all three fact lines end above y=844. Add a 390 × 844 test that asserts their bounding boxes fit within the first viewport.

### F-2-3 — Minor — the fact set omits offline behavior and price

- **Location / quote:** The three landing facts are “Camera stays in your browser,” “Works with six number keys,” and “Starts without an account.”
- **Why this matters:** The required fact set answers privacy, offline behavior, and price. The current set repeats the headline's keyboard capability and never says that the free product works offline after its first visit.
- **Concrete fix:** Use concrete facts such as “Camera stays in this browser,” “Works offline after your first visit,” and “Free; no account needed.” Register and test the offline and free claims before publishing them.

### F-2-4 — Minor — README makes an unlisted, ambiguous safety claim

- **Location / quote:** `README.md`: “Open the live site at https://camera-fx-cues.sociobot.in or start at `/?demo=1` for the safe sample signal.”
- **Why this matters:** “Safe” is not defined or listed in `.factory/claims.json`. It can be read as a health/sensory assurance even though the sample includes sudden motion and bright contrast and the product warns users about both.
- **Concrete fix:** Replace it with “Open the live site at https://camera-fx-cues.sociobot.in or start at `/?demo=1` for the bundled sample signal.” No new claim is then needed.

### F-2-5 — Minor — `/camera` is missing from the sitemap

- **Location / evidence:** `public/sitemap.xml` lists `/`, `/demo`, `/privacy`, and `/terms`; the live `/camera` route returns 200 and has its own title, canonical, and content.
- **Why this matters:** The site-structure contract requires the sitemap to list every real route. Search and audit tooling cannot discover the product's live-camera route from this sitemap.
- **Concrete fix:** Add `https://camera-fx-cues.sociobot.in/camera` to `sitemap.xml` and add a test that compares the declared app routes with sitemap entries.

### F-2-6 — Minor — the standalone 404 header drops the standard navigation

- **Location / evidence:** The live app header contains Demo, How it works when relevant, and Privacy. The live `/404.html` header contains only the Camera FX Cues wordmark.
- **Why this matters:** The site-structure contract requires a consistent header on every route. A visitor on the error page loses the direct Demo and Privacy destinations even though the footer remains complete.
- **Concrete fix:** Add the same visible Demo and Privacy navigation to `public/404.html`, preserving the wordmark, skip link, 44 px targets, and current CSP-compatible external stylesheet.

### F-2-7 — Minor — README uses an unmeasured marketing adjective

- **Location / quote:** `README.md`: “It is for game-jam and classroom teams that need clear, local camera cues.”
- **Why this matters:** “Clear” is subjective and does not name the concrete control method.
- **Concrete fix:** Rewrite it as “It is for game-jam and classroom teams that need keyboard-controlled, local camera cues.”

### F-2-8 — Minor — the image caption uses unexplained production jargon

- **Location / quote:** Landing image caption: “ORIGINAL SCENE PLATE // GENERATED FOR THIS TOOL”.
- **Why this matters:** “Scene plate” is not a term used elsewhere and does not tell a general classroom or game-jam visitor what the image is.
- **Concrete fix:** Rewrite it as “ORIGINAL CAMERA ART // MADE FOR THIS TOOL”.

## Copy audit

Counts omit punctuation-only separators, count hyphenated terms as one word, and count a URL or path as one word. The audit includes every prose sentence plus meaningful headings and controls on the landing page and in README. Nothing exceeds 22 words and none of the supplied banned words appears. F-2-4, F-2-7, and F-2-8 are the copy flags.

### Landing page

| Copy | Words | Result |
|---|---:|---|
| LOCAL CAMERA EFFECTS // NO ACCOUNT | 5 | pass |
| Trigger camera effects with keys | 5 | pass |
| For game-jam and classroom teams who need playful camera cues without sending video away. | 14 | pass |
| Try it with sample data | 5 | pass; result-naming action |
| Opens the sample signal. | 4 | pass |
| Your real presets stay untouched. | 5 | pass |
| Camera stays in your browser | 5 | pass; registered claim |
| Works with six number keys | 5 | pass; registered claim |
| Starts without an account | 4 | pass; registered claim |
| ORIGINAL SCENE PLATE // GENERATED FOR THIS TOOL | 7 | F-2-8 jargon |
| Choose a camera or sample signal | 6 | pass |
| Camera permission is requested only after you choose your camera. | 10 | pass; registered claim |
| Use your camera | 3 | pass; result-naming action |
| Open sample signal | 3 | pass; result-naming action |
| Motion and light warning | 4 | pass |
| Effects use sudden motion and bright contrast. | 7 | pass |
| If these may affect you, turn on reduced motion or do not start. | 13 | pass |
| Run a cue in your scene | 6 | pass |
| Pick a source. | 3 | pass |
| Allow your camera or start the sample signal. | 8 | pass |
| Press a number key. | 4 | pass |
| Keys 1–6 trigger the six effects. | 6 | pass; registered claim |
| Save a preset. | 3 | pass |
| Keep your cue choice on this device. | 7 | pass; registered claim |
| What Camera FX Cues does not do | 7 | pass |
| It does not record, store, or upload camera video. | 9 | pass; registered claim |
| It has no analytics, advertising, accounts, or third-party scripts. | 9 | pass; registered claim |
| Playful camera cues for small teams. | 6 | pass |

### README

| Copy | Words | Result |
|---|---:|---|
| Camera FX Cues | 3 | pass |
| Trigger playful camera effects with keys. | 6 | pass |
| It is for game-jam and classroom teams that need clear, local camera cues. | 13 | F-2-7 marketing adjective |
| Open the live site at camera-fx-cues.sociobot.in or start at /?demo=1 for the safe sample signal. | 15 | F-2-4 vague/unlisted claim |
| What Camera FX Cues does | 5 | pass |
| Runs laser, outline, pixel burst, freeze, zoom, and shake cues. | 10 | pass; registered claim |
| Uses number keys 1–6 or on-screen cue pads. | 8 | pass; registered claim |
| Keeps camera processing in the current browser tab and stops its track when you leave the camera page. | 18 | pass; registered claim |
| Saves named cue presets in browser storage on this device. | 10 | pass; registered claim |
| It does not record, store, or upload camera video. | 9 | pass; registered claim |
| It loads no analytics, advertising, or third-party scripts. | 8 | pass; registered claim |
| Run locally | 2 | pass |
| Open the local URL shown by Vite. | 7 | pass |
| Choose Use your camera to request local camera access. | 9 | pass; named action |
| Choose Try it with sample data to run the isolated demo. | 11 | pass; named action and registered claim |
| Test and build | 3 | pass |
| The production build is written to dist/, with index.html at its root. | 12 | pass; verified by build |
| Deploy that directory as an Azure Static Web App. | 9 | pass; instruction |
| staticwebapp.config.json includes explicit app routes, a true 404 response, and security headers. | 12 | pass; verified by configuration and live crawl |
| Privacy and demo | 3 | pass |
| The demo uses demo:camera-fx-cues: browser-storage keys. | 6 | pass; registered claim |
| Resetting the demo clears only those keys. | 7 | pass; registered claim |
| Real presets use camera-fx-cues: keys. | 5 | pass; registered claim |
| See the privacy page, .factory/demo.md, and .factory/claims.json for the testable product promises. | 12 | pass |
| License | 1 | pass |
| MIT. | 1 | pass |
| See LICENSE. | 2 | pass |

Landing buttons name a result: **Try it with sample data**, **Use your camera**, and **Open sample signal**. Demo controls **Reset demo**, **Start for real**, and **Save preset** are understandable in their banner/form context. Headings form a coherent H1→H2→H3 outline and make sense when listed alone.

The current terminology is otherwise consistent: **cue** is an effect trigger, **sample signal** is the bundled no-camera input, **preset** is a saved cue choice, and **camera** is live browser input.

## Demo and sandbox

The one-click demo gate passes in fresh mobile and desktop contexts.

- Landing CTA opens `/?demo=1` in one click and sets the canonical demo route metadata.
- The first demo render uses the original game-jam desk sample with Outline already active (`stage is-outline`, readout `OUTLINE`, Outline `aria-pressed="true"`).
- At 390 × 844, the complete stage ends at y=644 and the active Outline pad ends at y=733. At 1440 × 900, the active sample stage begins at y=640 and is visibly in use.
- The banner states “DEMO — SAMPLE SIGNAL, REAL PRESETS STAY SEPARATE” and keeps Reset demo and Start for real available.
- A seeded real preset remained unchanged while a demo preset was saved. Reset removed only `demo:camera-fx-cues:` data and restored Outline. A second demo save followed by Start for real again removed only demo data and opened `/camera`.
- The flow made no cross-origin or mutating network request and produced no console error.

## Claims and verification

`.factory/claims.json` contains nine entries, and each id appears in exactly one tagged test. From the clean clone `/tmp/camera-fx-cues-review2-b5xRqI` at `d4cde88`, every listed command passed independently:

| Claim id | Result | Observable proof |
|---|---|---|
| `sample-cues` | pass | all six rendered states exercised |
| `local-video` | pass | delayed permission, rendered fake camera, same-origin flow, ended track |
| `preset-save` | pass | namespaced preset survives reload |
| `keyboard-cues` | pass | keys 1–6 activate their matching rendered cues |
| `keyboard-operation` | pass | cold Tab order, route focus, Enter, and Escape |
| `reduced-motion` | pass | Zoom and Shake show no animation or transform movement |
| `no-account` | pass | complete sample flow without account or payment UI |
| `demo-isolation` | pass | Reset and Start for real clear demo data only |
| `privacy-scope` | pass | no recorder use, camera payload storage, cross-origin request, or third-party script |

F-2-4 is the only unlisted claim-like sentence found in the landing/README cross-check. No registered claim is failing or untested.

Additional clean-clone results:

```text
npm test        17 passed
npm run lint    PASS
npm run build   PASS
JavaScript      19.07 kB raw / 7.18 kB gzip
CSS             12.44 kB raw / 3.55 kB gzip
dist/           165,736 bytes
```

The live demo registered a controlling service worker, cached the full route shell and hashed JS/CSS, then reloaded `/?demo=1` offline after the HTTP cache was cleared. The demo title, H1, banner, and styling remained present. All recorded live demo requests were same-origin GETs.

## History re-check

I read `.factory/review-1.md`, `.factory/polish-1.md`, and the prior `.factory/handoff.md`. Each earlier finding was checked in the deployed UI and current code, not accepted from its prior status label.

| Earlier id | Current confirmation |
|---|---|
| F-1-1 | fixed: the 390 px demo shows the complete active sample stage and active Outline cue above the fold; Reset restores both |
| F-1-2 | fixed: the sole tagged reduced-motion test now measures both Zoom and Shake and passes independently |
| F-1-3 | fixed as scoped: 404 metadata, icons, social card, footer legal links, attribution, version, touch targets, and true 404 status are present; F-2-6 is a new header-consistency issue |
| F-1-4 | fixed: README heading is “What Camera FX Cues does” |
| F-1-5 | fixed: current product/docs use “sample signal,” apart from the required “Try it with sample data” CTA |
| F-1-6 | fixed: eyebrow is “LOCAL CAMERA EFFECTS // NO ACCOUNT” |
| C1 | fixed: nine claims have one tag each and all nine exact commands pass |
| S1 | fixed: motion/light warning appears before source actions and on the instrument |
| A1 | fixed: cold Tab reaches the skip link first; route changes and history focus/announce the H1 |
| A2 | fixed: the 390 px 44×44 target regression passes |
| P1 | fixed: controlled live offline reload succeeds with shell assets cached |
| R1 | fixed: `/404.html` and an unknown route return an intentionally designed HTTP 404 under the current CSP |
| D1 | fixed: bounded cues clear their state within the tested interval |

## Structure, accessibility, and crawl

- `/`, `/?demo=1`, `/demo`, `/camera`, `/privacy`, and `/terms` load; `/404.html` and an unknown path return 404 with the designed page.
- Every discovered visible internal destination and asset returned its expected status. F-2-5 records the sitemap omission.
- Every route has a route-specific title, one H1, `lang="en"`, one main landmark, a description, canonical, OG/Twitter metadata, favicon, and touch icon.
- Client navigation and Back/Forward restore the correct route and focus/announce its H1. F-2-1 records the failed scroll restoration.
- Live Axe integration found zero serious/critical violations on `/`, `/?demo=1`, `/privacy`, `/terms`, and `/404.html`.
- `/opt/fleet/lib/verify-url.sh` passed the live root with no console errors, one H1, a main landmark, `lang`, and complete image/button names.
- The pixel/demoscene control-room art, scanlines, square cue pads, palette, and motion treatment match `.factory/design.md` and are distinct from a generic SaaS template. Asset provenance is recorded.

Chromium reports the main document's intentional 404 status as a failed resource in the console on the 404 route; normal 200 routes have no console errors. No dead subresource was found.

## Missed leverage

No AI step, import/export, or sync is an obvious requirement for the brief's local, real-time camera cue job. Adding remote AI or sync would weaken the local privacy model without completing a missing core step. No AI feature, embedded provider key, analytics, or third-party runtime script is present.

## What would make this perfect

Restore scroll positions across SPA Back/Forward navigation and add the missing regression. Then fit the correct privacy/offline/price facts into the 390 px first screen, remove the two vague README adjectives and the image-caption jargon, add `/camera` to the sitemap, and give the 404 the standard header navigation. Re-run all nine claim commands, the full suite/build, the live mobile fold check, offline interception, route-history test, and crawl. Only a zero-finding rerun should pass.
