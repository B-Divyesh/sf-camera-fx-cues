# Adversarial first-read review 3 — Camera FX Cues

Reviewed 2026-08-28 against commit `01dd162d43ee0363de0548c174f6526595b9c076` and the deployed site at [camera-fx-cues.sociobot.in](https://camera-fx-cues.sociobot.in). Product code was not changed.

## Verdict: PASS

No blocking or minor findings remain. The landing page is understandable on a cold 390 × 844 phone screen, the sample is genuinely usable in one click, the registered claims are all independently tested, and the deployed artifact matches the clean local build. This review found no unlisted visitor-facing claim in the landing copy or README.

## Cold first read

Fresh Chromium contexts loaded `/` at 390 × 844 and 1440 × 900 with no storage, no prior scroll, no console error, and only same-origin requests. Before scrolling, my answers were:

| Question | Answer in my own words | Exact evidence |
|---|---|---|
| What does this do? | It adds keyboard-triggered effects to a camera view. | “Trigger camera effects with keys” |
| Who is it for? | Small game-jam and classroom teams. | “For game-jam and classroom teams who need playful camera cues without sending video away.” |
| What should I click first? | Try the ready-made sample rather than granting camera permission. | “Try it with sample data” and “Opens the sample signal. Your real presets stay untouched.” |

The CTA explanation and the privacy, offline, and free/no-account facts fit within the first phone viewport. The pixel-control-room art, scanline canvas, square cue pads, and hard-edged palette are distinct from a generic SaaS layout and match `.factory/design.md`.

## Copy audit

Counts treat hyphenated terms, a URL/path, and `1–6` as one word. This includes every meaningful landing/README sentence plus headings and controls, so jargon, terminology, and action labels are auditable too. No entry exceeds 22 words; no banned marketing word, inconsistent product term, contextless semantic heading, or non-result-naming action button was found. Navigation labels are destinations, not action buttons.

### Landing page

| Copy | Words | Check |
|---|---:|---|
| Local camera effects // no account | 5 | pass |
| Trigger camera effects with keys | 5 | pass |
| For game-jam and classroom teams who need playful camera cues without sending video away. | 14 | pass |
| Try it with sample data | 5 | pass; clear sample action |
| Opens the sample signal. | 4 | pass |
| Your real presets stay untouched. | 5 | pass; `demo-isolation` |
| Camera stays in this browser | 5 | pass; `local-video` |
| Works offline after your first visit | 6 | pass; `offline-reload` |
| Free; no account needed | 4 | pass; `no-account` |
| Original camera art // made for this tool | 7 | pass; provenance documented |
| Before you start | 3 | pass; eyebrow for the following heading |
| Choose a camera or sample signal | 6 | pass |
| Camera permission is requested only after you choose your camera. | 10 | pass; `local-video` |
| Use your camera | 3 | pass; result-naming action |
| Open sample signal | 3 | pass; result-naming action |
| Motion and light warning | 4 | pass |
| Effects use sudden motion and bright contrast. | 7 | pass |
| If these may affect you, turn on reduced motion or do not start. | 13 | pass |
| Three steps | 2 | pass; eyebrow for the following heading |
| Run a cue in your scene | 6 | pass |
| Pick a source. | 3 | pass |
| Allow your camera or start the sample signal. | 8 | pass |
| Press a number key. | 4 | pass |
| Keys 1–6 trigger the six effects. | 6 | pass; `keyboard-cues` |
| Save a preset. | 3 | pass |
| Keep your cue choice on this device. | 7 | pass; `preset-save` |
| What Camera FX Cues does not do | 7 | pass |
| It does not record, store, or upload camera video. | 9 | pass; `privacy-scope` |
| It has no analytics, advertising, accounts, or third-party scripts. | 9 | pass; `privacy-scope` |
| Playful camera cues for small teams. | 6 | pass |

### README

| Copy | Words | Check |
|---|---:|---|
| Camera FX Cues | 3 | pass |
| Trigger playful camera effects with keys. | 6 | pass |
| It is for game-jam and classroom teams that need keyboard-controlled, local camera cues. | 13 | pass |
| Open the live site at camera-fx-cues.sociobot.in or start at /?demo=1 for the bundled sample signal. | 15 | pass |
| What Camera FX Cues does | 5 | pass |
| Runs laser, outline, pixel burst, freeze, zoom, and shake cues. | 10 | pass; `sample-cues` |
| Uses number keys 1–6 or on-screen cue pads. | 8 | pass; `keyboard-cues` and `sample-cues` |
| Keeps camera processing in the current browser tab and stops its track when you leave the camera page. | 18 | pass; `local-video` |
| Saves named cue presets in browser storage on this device. | 10 | pass; `preset-save` |
| It does not record, store, or upload camera video. | 9 | pass; `privacy-scope` |
| It loads no analytics, advertising, or third-party scripts. | 8 | pass; `privacy-scope` |
| Run locally | 2 | pass |
| Open the local URL shown by Vite. | 7 | pass |
| Choose Use your camera to request local camera access. | 9 | pass; named action |
| Choose Try it with sample data to run the isolated demo. | 11 | pass; `demo-isolation` |
| Test and build | 3 | pass |
| The production build is written to dist/, with index.html at its root. | 12 | pass; build verified |
| Deploy that directory as an Azure Static Web App. | 9 | pass; instruction |
| staticwebapp.config.json includes explicit app routes, a true 404 response, and security headers. | 12 | pass; configuration and live crawl verified |
| Privacy and demo | 3 | pass |
| The demo uses demo:camera-fx-cues: browser-storage keys. | 6 | pass; `demo-isolation` |
| Resetting the demo clears only those keys. | 7 | pass; `demo-isolation` |
| Real presets use camera-fx-cues: keys. | 5 | pass; `demo-isolation` |
| See the privacy page, .factory/demo.md, and .factory/claims.json for the testable product promises. | 12 | pass |
| License | 1 | pass |
| MIT. | 1 | pass |
| See LICENSE. | 2 | pass |

The terminology remains consistent: a **cue** is an effect trigger, the bundled no-camera input is the **sample signal**, a saved choice is a **preset**, and the live input is the **camera**.

## Demo and sandbox

The one-click gate passes. The landing CTA opens `/?demo=1`; its first phone screen already shows the game-jam desk sample with Outline active, its active pad, and the cue grid. The persistent banner says “DEMO — SAMPLE SIGNAL, REAL PRESETS STAY SEPARATE” and exposes both **Reset demo** and **Start for real**.

From a fresh context, a seeded real preset was not shown in demo mode. Saving a demo preset then resetting removed only the `demo:camera-fx-cues:` key and restored the outlined sample. Repeating the save then choosing Start for real again removed only that demo prefix and preserved the real sentinel. The test also confirms no camera permission, camera payload persistence, or cross-origin request in the sample flow. Offline interception after first load reloaded the complete styled demo successfully.

## Claims and quality gates

Clean clone: `/tmp/camera-fx-cues-review3-en25Fg` at the reviewed commit. `npm ci` completed with zero vulnerabilities. Every command listed in `.factory/claims.json` was run separately and passed; the full local and live suites independently confirmed the same 10 tagged tests.

| Claim id | Result | Observable outcome checked |
|---|---|---|
| `sample-cues` | pass | all six effects render on the sample |
| `local-video` | pass | permission is delayed, camera stays same-origin, and the media track ends on exit |
| `preset-save` | pass | a demo preset uses its namespace and survives reload |
| `keyboard-cues` | pass | keys 1–6 activate each corresponding cue |
| `keyboard-operation` | pass | skip-link order, route focus, Enter, and Escape work |
| `reduced-motion` | pass | Zoom and Shake do not move under reduced motion |
| `no-account` | pass | all sample functions work without sign-in or payment UI |
| `offline-reload` | pass | controlled demo reload works offline after first visit |
| `demo-isolation` | pass | reset and real-mode entry clear demo storage only |
| `privacy-scope` | pass | no recorder, camera-payload storage, cross-origin request, or third-party script |

`npm test` passed 22/22 locally and 22/22 against the deployed URL. `npm run lint` and `npm run build` passed. The built JavaScript is 20.05 kB raw / 7.46 kB gzip and CSS is 13.14 kB raw / 3.70 kB gzip; `dist/` was produced. SHA-256 matched local and live `index.html`, `sw.js`, `404.html`, `404.css`, sitemap, and hashed JS/CSS assets.

## Structure, routing, and accessibility

`/`, `/demo`, `/camera`, `/privacy`, and `/terms` return 200. `/404.html` and an unknown route return the designed HTTP 404. A crawl of every discovered internal link from those routes found only 200 destinations. The sitemap lists every application route.

Each application route has its own title, description, canonical URL, OG/Twitter title/description/image, favicon, touch icon, one H1, and one main landmark. The standalone 404 has the same metadata and legal/footer destinations. Client navigation, browser Back, and browser Forward restore the recorded scroll position, focus the destination H1, and announce the route. Fresh routes produced no console errors; the expected browser report for the intentional 404 is the only 404-route exception. The built-in Axe check found no serious or critical violations on landing, demo, legal, and 404 routes.

## History re-check

All prior findings in every earlier review, polish report, and handoff were verified live and in the current code rather than accepted from their prior status.

| Earlier finding | Current confirmation |
|---|---|
| F-1-1 | Active recognizable sample, active Outline cue, and Reset are above the phone fold. |
| F-1-2 | The one reduced-motion claim test observes both Zoom and Shake. |
| F-1-3 | The true standalone 404 has metadata, legal footer, attribution, version, favicon/social image, and touch targets. |
| F-1-4 | README heading is “What Camera FX Cues does.” |
| F-1-5 | “Sample signal” is used consistently except for the required sample-data CTA. |
| F-1-6 | The landing eyebrow uses “LOCAL CAMERA EFFECTS // NO ACCOUNT.” |
| F-2-1 | Back and Forward restore scroll positions and route-heading focus. |
| F-2-2 | CTA explanation and all three facts fit at 390 × 844. |
| F-2-3 | The three facts now cover privacy, offline use, and free/no-account access. |
| F-2-4 | README says “bundled sample signal,” not “safe.” |
| F-2-5 | `/camera` is in the sitemap and a declared-route equality test exists. |
| F-2-6 | The 404 header includes Demo and Privacy. |
| F-2-7 | README names keyboard control instead of using “clear.” |
| F-2-8 | The image caption is “ORIGINAL CAMERA ART // MADE FOR THIS TOOL.” |
| C1 | Ten claim IDs have one exact tagged test each; every listed command passes. |
| S1 | Motion/light warnings appear before source actions and in the instrument. |
| A1 | First Tab reaches the skip link; route/history changes focus and announce H1. |
| A2 | Visible controls meet 44 × 44 CSS pixels at 390 px. |
| P1 | The complete demo shell reloads offline after its first visit. |
| R1 | Explicit routes plus response override produce a CSP-compatible true 404. |
| D1 | Timed cues clear their pressed/readout state within the bounded interval. |

## Missed leverage

No import/export, sync, or AI step is implied by the brief’s local, real-time camera-cue job. The existing sample and local presets complete the stated task without weakening the privacy model. No decorative AI feature, provider key, analytics, or third-party runtime script is present.

## What would make this perfect

No additional product change is indicated by this review. Keep the claim tests, demo isolation test, offline reload test, mobile-fold test, route-history test, and live crawl in the release check so the current zero-finding state remains true.
