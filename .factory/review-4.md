# Adversarial first-read review 4 — Camera FX Cues

Reviewed 2026-08-29 against commit `74f6e11cc9024891de9bbb2ef1c1cda673cbbaf3` and the deployed site at [camera-fx-cues.sociobot.in](https://camera-fx-cues.sociobot.in). Product code was not changed.

## Verdict: FAIL

One minor finding remains. The landing screen, one-click demo, sandbox isolation, registered claims, routes, accessibility checks, and all earlier finding IDs pass, but the designed 404 still uses a metaphor in its title and eyebrow. The required verdict is therefore FAIL until the finding count is zero.

## Finding

### F-4-1 — Minor — the 404 title uses a metaphor instead of naming the error

- **Exact quote/location:** `/404.html` and an unknown route set `<title>Signal lost — Camera FX Cues</title>` and show the eyebrow `404 // SIGNAL LOST`.
- **Why this matters:** “Signal lost” describes a connection failure, not an absent page. In a browser tab or screen-reader title list, it can imply that the camera or network disconnected. It also violates the plain-words rule against metaphor and mood copy. The H1, “This cue page is not here,” is already clear.
- **Concrete fix:** Change the title and its OG/Twitter equivalents to `Page not found — Camera FX Cues`. Change the eyebrow to `404 // PAGE NOT FOUND`. Add a route assertion for the plain title and label.

## Cold first read

Fresh Chromium contexts opened `/` at 390 × 844 and 1440 × 900 with empty storage, no prior scroll, no console error, and only same-origin requests. Before scrolling, I could answer all three questions:

| Question | Answer in my own words | Exact live evidence |
|---|---|---|
| What does this do? | It adds effects to a camera view when number keys are pressed. | “Trigger camera effects with keys” |
| Who is it for? | Game-jam and classroom teams. | “For game-jam and classroom teams who need playful camera cues without sending video away.” |
| What should I click first? | Open the ready-made sample without touching real presets. | “Try it with sample data” and “Opens the sample signal. Your real presets stay untouched.” |

On the phone, the CTA ends at y=569 and all three fact lines end at y=689, within the 844 px viewport. On desktop they end at y=835 within the 900 px viewport. The first-read gate passes.

## Copy audit

Counts omit punctuation-only separators and treat hyphenated terms, URLs, paths, and `1–6` as one word. The tables include every landing/README sentence plus meaningful headings, actions, and image text. No entry exceeds 22 words. No banned marketing word, inconsistent product term, contextless landing/README heading, or non-result-naming button was found. F-4-1 records the separate 404 wording issue.

### Landing page

| Copy | Words | Check |
|---|---:|---|
| Camera FX Cues | 3 | pass; wordmark |
| Demo | 1 | pass; destination |
| How it works | 3 | pass; destination |
| Privacy | 1 | pass; destination |
| Local camera effects // no account | 5 | pass |
| Trigger camera effects with keys | 5 | pass |
| For game-jam and classroom teams who need playful camera cues without sending video away. | 14 | pass |
| Try it with sample data | 5 | pass; result-naming action |
| Opens the sample signal. | 4 | pass |
| Your real presets stay untouched. | 5 | pass; `demo-isolation` |
| Camera stays in this browser | 5 | pass; `local-video` |
| Works offline after your first visit | 6 | pass; `offline-reload` |
| Free; no account needed | 4 | pass; `no-account` |
| A pixel-art camera control room with cyan light beams. | 9 | pass; image alt text |
| Original camera art // made for this tool | 7 | pass; provenance is documented in `.factory/design.md` |
| Before you start | 3 | pass; introduces the source choice |
| Choose a camera or sample signal | 6 | pass |
| Camera permission is requested only after you choose your camera. | 10 | pass; `local-video` |
| Use your camera | 3 | pass; result-naming action |
| Open sample signal | 3 | pass; result-naming action |
| Motion and light warning | 4 | pass |
| Effects use sudden motion and bright contrast. | 7 | pass; direct safety warning |
| If these may affect you, turn on reduced motion or do not start. | 13 | pass |
| Three steps | 2 | pass; states the section length |
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
| Terms | 1 | pass; destination |
| Built by Param Factory · v1.0.0 | 5 | pass; attribution/build label |

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
| staticwebapp.config.json includes explicit app routes, a true 404 response, and security headers. | 12 | pass; configuration and live response verified |
| Privacy and demo | 3 | pass |
| The demo uses demo:camera-fx-cues: browser-storage keys. | 6 | pass; `demo-isolation` |
| Resetting the demo clears only those keys. | 7 | pass; `demo-isolation` |
| Real presets use camera-fx-cues: keys. | 5 | pass; `demo-isolation` |
| See the privacy page, .factory/demo.md, and .factory/claims.json for the testable product promises. | 12 | pass |
| License | 1 | pass |
| MIT. | 1 | pass |
| See LICENSE. | 2 | pass |

Terminology is consistent: a **cue** is an effect trigger, **sample signal** is the bundled no-camera input, **preset** is a saved cue choice, and **camera** is live browser input. The required CTA alone says “sample data.”

## Demo and sandbox

The one-click demo gate passes.

- The landing CTA opens `/?demo=1` in one click.
- At 390 × 844, the complete game-jam desk stage ends at y=644 and the active Outline pad ends at y=733. The canvas label, `OUTLINE` readout, and active pad confirm that the realistic sample is already being used.
- At 1440 × 900, the active outlined sample and its readout are visible in the first viewport.
- The banner says “DEMO — SAMPLE SIGNAL, REAL PRESETS STAY SEPARATE,” explains the demo lifetime, and keeps **Reset demo** and **Start for real** available.
- A seeded real preset was not displayed or changed in demo mode. The live isolation test saved and reset demo data, repeated the save, then started for real; only the `demo:camera-fx-cues:` namespace was removed.
- Reset restores the sample and active Outline cue. Start for real clears demo data and opens the camera route.
- The cold demo request log contained only same-origin GET requests. The instrumented camera/privacy test found no recorder use, camera-payload storage, cross-origin request, or third-party script. The controlled service-worker test reloaded the complete demo offline after the first online visit.

## Claims and quality gates

`.factory/claims.json` contains ten unique entries with exactly one matching test tag each. Every listed command was run separately from the clean clone `/tmp/camera-fx-cues-review4-w5LbxZ/clone` at the reviewed commit.

| Claim id | Result | Observable outcome |
|---|---|---|
| `sample-cues` | pass | all six effects render on the sample |
| `local-video` | pass | delayed permission, rendered fake camera, same-origin requests, ended track |
| `preset-save` | pass | namespaced demo preset survives reload |
| `keyboard-cues` | pass | number keys 1–6 activate the matching rendered states |
| `keyboard-operation` | pass | skip-link order, route focus, Enter, and Escape work |
| `reduced-motion` | pass | Zoom and Shake have no animation or transform movement |
| `no-account` | pass | all six cues and preset save work without account or payment UI |
| `offline-reload` | pass | the complete styled demo reloads offline after its first visit |
| `demo-isolation` | pass | Reset and Start for real clear demo storage only |
| `privacy-scope` | pass | no recorder, camera-payload storage, cross-origin request, or third-party script |

No functional/privacy claim on the live landing page or in README is unlisted. Additional clean-clone results:

```text
npm ci                                                    PASS; 0 vulnerabilities
all 10 claims.json commands, separately                   PASS
npm test                                                  PASS; 22/22
npm run lint                                              PASS
npm run build                                             PASS; dist/ produced
PLAYWRIGHT_BASE_URL=https://camera-fx-cues.sociobot.in npm test  PASS; 22/22
JavaScript                                                20.05 kB raw / 7.46 kB gzip
CSS                                                       13.14 kB raw / 3.70 kB gzip
dist/                                                     169,646 bytes
```

Local and deployed SHA-256 hashes match for `index.html`, `sw.js`, `404.html`, `404.css`, `sitemap.xml`, and both hashed JS/CSS bundles.

## History re-check

I read every earlier `.factory/review-*.md`, `.factory/polish-*.md`, both verification reports, and the prior handoff. Each earlier finding was checked in deployed behavior and source.

| Earlier finding | Current confirmation |
|---|---|
| F-1-1 | fixed: the active, recognizable sample stage and Outline pad are above the phone fold; Reset restores both |
| F-1-2 | fixed: the tagged reduced-motion test observes both Zoom and Shake |
| F-1-3 | fixed as originally scoped: the true 404 has metadata, icons, social card, footer legal links, attribution, version, and touch targets; F-4-1 is a separate plain-language defect |
| F-1-4 | fixed: README says “What Camera FX Cues does” |
| F-1-5 | fixed: “sample signal” is consistent except for the required CTA |
| F-1-6 | fixed: the eyebrow says “LOCAL CAMERA EFFECTS // NO ACCOUNT” |
| F-2-1 | fixed: Back and Forward restore recorded scroll positions and focus the route H1 |
| F-2-2 | fixed: CTA explanation and all three facts fit at 390 × 844 |
| F-2-3 | fixed: the facts cover privacy, offline use, and free/no-account access |
| F-2-4 | fixed: README says “bundled sample signal” |
| F-2-5 | fixed: `/camera` is in the sitemap and route-equality regression |
| F-2-6 | fixed: the standalone 404 header includes Demo and Privacy |
| F-2-7 | fixed: README uses “keyboard-controlled” |
| F-2-8 | fixed: the image caption uses plain “camera art” wording |
| C1 | fixed: all ten claims have one observable tagged test, and all ten commands pass |
| S1 | fixed: motion/light warnings precede landing source actions and instrument effects |
| A1 | fixed: first Tab reaches the skip link; route/history changes focus and announce H1 |
| A2 | fixed: all tested visible controls meet 44 × 44 CSS pixels at 390 px |
| P1 | fixed: the versioned complete shell reloads offline |
| R1 | fixed: `/404.html` and an unknown path return the designed CSP-compatible HTTP 404 |
| D1 | fixed: bounded effects clear their state within 420–500 ms |

No earlier finding is unfixed, half-fixed, or regressed.

## Structure, accessibility, and visual identity

- `/`, `/demo`, `/camera`, `/privacy`, and `/terms` return 200. `/404.html` and an unknown route return the designed 404 with HTTP 404.
- Every application route has one H1, one main landmark, `lang="en"`, a route-specific title/description/canonical, OG/Twitter metadata, favicon, and touch icon. F-4-1 is the sole title-wording defect.
- Every visible internal destination discovered across the routes returns 200. The intentional error URL alone returns 404.
- Client navigation and browser Back/Forward restore route state, scroll, focused H1, and the polite announcement.
- The sitemap lists all five public application routes. `robots.txt` points to it. Security headers and the CSP are present and match the loaded resources.
- The factory URL verifier passed the live root with zero console errors. The Playwright Axe integration found zero serious/critical violations across landing, demo, legal, and 404 pages. The expected main-document 404 console message is confined to intentional 404 requests.
- The dark pixel/demoscene control room, hard square pads, scanlines, generated camera art, cue feedback, and reduced-motion treatment match `.factory/design.md`. The site does not resemble a generic SaaS template, and asset provenance is recorded.

## Missed leverage

No AI step, import/export, or sync is implied by the brief's local, real-time camera-cue job. The existing camera/sample choice, six cues, keyboard control, and local presets complete the stated scope. Remote AI or sync would weaken the stated local privacy boundary. No decorative AI feature, provider key, analytics, or third-party runtime script is present.

## What would make this perfect

Replace the two “Signal lost” strings and the 404 social title with plain “Page not found” wording, then add a regression for that text. Re-run the full local/live suite and 404 crawl. No other product change is indicated by this review.
