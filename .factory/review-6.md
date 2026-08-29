# Adversarial first-read review 6 — Camera FX Cues

Reviewed 2026-08-29 against commit `3b26b193e2421b048ab01c60941aac6dfc0428c2` and the deployed site at [camera-fx-cues.sociobot.in](https://camera-fx-cues.sociobot.in). Product code was not changed. The local production shell, JavaScript, CSS, service worker, and 404 document match production by SHA-256.

## Verdict: PASS

No blocking or minor findings remain. The cold first screen is clear, the demo is useful in one click and isolated from real presets, all ten registered claims pass independently, no public product claim is unlisted, every prior finding remains fixed, and the route, accessibility, privacy, build, and visual-identity checks pass.

## Cold first read

Fresh Chromium contexts opened `/` at 390 × 844 and 1440 × 900 with empty storage and no prior scroll. Before scrolling, my answers were:

| Question | Answer in my own words | Exact live evidence |
|---|---|---|
| What does this do? | It triggers effects on a camera view when keys are pressed. | “Trigger camera effects with keys” |
| Who is it for? | Game-jam and classroom teams. | “For game-jam and classroom teams who need playful camera cues without sending video away.” |
| What should I click first? | Open the ready-made sample without changing real presets. | “Try it with sample data” and “Opens the sample signal. Your real presets stay untouched.” |

The phone CTA ends at 570 px, its explanation ends at 624 px, and the final privacy/offline/price fact ends at 690 px, all within the 844 px first screen. The desktop first screen also contains the headline, audience, CTA, explanation, and all three facts. Both contexts made only same-origin requests and logged no console or page errors.

Evidence: `evidence/review-6/mobile-cold.png`, `evidence/review-6/desktop-cold.png`, and `evidence/review-6/live-first-read.json`.

## Copy audit

Counts omit punctuation-only separators and list numbers. Hyphenated terms, URLs, paths, and `1–6` count as one word. The tables include every meaningful sentence, heading, label, action, navigation item, image alternative, and conditional status on the landing page and in README. Repeated Privacy links are grouped by location. No entry exceeds 22 words. No jargon, banned word, vague marketing adjective, inconsistent product term, contextless heading, non-informative slogan, or non-result-naming button remains.

### Landing page

| Location | Copy | Words | Check |
|---|---|---:|---|
| Skip link | Skip to controls | 3 | pass; destination exists |
| Header | Camera FX Cues | 3 | pass; home wordmark |
| Header | Demo | 1 | pass; destination |
| Header | How it works | 3 | pass; `#how` exists on this route |
| Header/footer | Privacy | 1 | pass; destination |
| Conditional status | Offline. | 1 | pass |
| Conditional status | Reconnect before starting a camera. | 5 | pass; says what to do |
| Hero label | Local camera effects // no account | 5 | pass |
| H1 | Trigger camera effects with keys | 5 | pass |
| Hero | For game-jam and classroom teams who need playful camera cues without sending video away. | 14 | pass |
| Primary action | Try it with sample data | 5 | pass; names the result |
| Action explanation | Opens the sample signal. | 4 | pass |
| Action explanation | Your real presets stay untouched. | 5 | pass; `demo-isolation` |
| Fact | Camera stays in this browser | 5 | pass; `local-video` |
| Fact | Works offline after your first visit | 6 | pass; `offline-reload` |
| Fact | Free; no account needed | 4 | pass; `no-account` |
| Image alternative | A pixel-art camera control room with cyan light beams. | 9 | pass |
| Image caption | Original camera art // made for this tool | 7 | pass; provenance is recorded |
| Section label | Before you start | 3 | pass |
| H2 | Choose a camera or sample signal | 6 | pass |
| Source explanation | Camera permission is requested only after you choose your camera. | 10 | pass; `local-video` |
| Action | Use your camera | 3 | pass; names the result |
| Action | Open sample signal | 3 | pass; names the result |
| H3 | Motion and light warning | 4 | pass |
| Warning | Effects use sudden motion and bright contrast. | 7 | pass |
| Warning | If these may affect you, turn on reduced motion or do not start. | 13 | pass |
| Section label | Three steps | 2 | pass |
| H2 | Run a cue in your scene | 6 | pass |
| Step 1 | Pick a source. | 3 | pass |
| Step 1 | Allow your camera or start the sample signal. | 8 | pass |
| Step 2 | Press a number key. | 4 | pass |
| Step 2 | Keys 1–6 trigger the six effects. | 6 | pass; `keyboard-cues` |
| Step 3 | Save a preset. | 3 | pass |
| Step 3 | Keep your cue choice on this device. | 7 | pass; `preset-save` |
| H2 | What Camera FX Cues does not do | 7 | pass |
| Boundary | It does not record, store, or upload camera video. | 9 | pass; `privacy-scope` |
| Boundary | It has no analytics, advertising, accounts, or third-party scripts. | 9 | pass; `privacy-scope` |
| Footer | Playful camera cues for small teams. | 6 | pass |
| Footer | Terms | 1 | pass; destination |
| Footer | Built by Param Factory · v1.0.0 | 5 | pass; attribution/build label |

### README

| Location | Copy | Words | Check |
|---|---|---:|---|
| H1 | Camera FX Cues | 3 | pass |
| Introduction | Trigger playful camera effects with keys. | 6 | pass |
| Introduction | It is for game-jam and classroom teams that need keyboard-controlled, local camera cues. | 13 | pass |
| Introduction | Open the live site at camera-fx-cues.sociobot.in or start at /?demo=1 for the bundled sample signal. | 15 | pass |
| H2 | What Camera FX Cues does | 5 | pass |
| Capability | Runs laser, outline, pixel burst, freeze, zoom, and shake cues. | 10 | pass; `sample-cues` |
| Capability | Uses number keys 1–6 or on-screen cue pads. | 8 | pass; `keyboard-cues` and `sample-cues` |
| Capability | Keeps camera processing in the current browser tab and stops its track when you leave the camera page. | 18 | pass; `local-video` |
| Capability | Saves named cue presets in browser storage on this device. | 10 | pass; `preset-save` |
| Boundary | It does not record, store, or upload camera video. | 9 | pass; `privacy-scope` |
| Boundary | It loads no analytics, advertising, or third-party scripts. | 8 | pass; `privacy-scope` |
| H2 | Run locally | 2 | pass |
| Local setup | Open the local URL shown by Vite. | 7 | pass |
| Local setup | Choose Use your camera to request local camera access. | 9 | pass |
| Local setup | Choose Try it with sample data to run the isolated demo. | 11 | pass; `demo-isolation` |
| H2 | Test and build | 3 | pass |
| Build | The production build is written to dist/, with index.html at its root. | 12 | pass; verified |
| Deploy | Deploy that directory as an Azure Static Web App. | 9 | pass; instruction |
| Deploy | staticwebapp.config.json includes explicit app routes, a true 404 response, and security headers. | 12 | pass; verified |
| H2 | Privacy and demo | 3 | pass |
| Demo storage | The demo uses demo:camera-fx-cues: browser-storage keys. | 6 | pass; `demo-isolation` |
| Demo storage | Resetting the demo clears only those keys. | 7 | pass; `demo-isolation` |
| Real storage | Real presets use camera-fx-cues: keys. | 5 | pass; `demo-isolation` |
| References | See the privacy page, .factory/demo.md, and .factory/claims.json for the testable product promises. | 12 | pass |
| H2 | License | 1 | pass |
| License | MIT. | 1 | pass |
| License | See LICENSE. | 2 | pass |

Terminology is consistent: an effect trigger is a **cue**, the bundled no-camera input is the **sample signal**, a saved cue choice is a **preset**, and live browser input is the **camera**. The mandated primary action alone says “sample data.”

## Demo and sandbox

The demo passes from fresh phone and desktop contexts.

- The landing CTA opens `/?demo=1` in one click and sets `Demo — Camera FX Cues`.
- The first render shows a recognizable game-jam desk with Outline active. On the phone, the stage ends at 596 px and the active Outline control ends at 685 px, both above the 844 px fold. On desktop, the visible part of the stage already shows the sample and `OUTLINE` readout.
- The banner says “DEMO — SAMPLE SIGNAL, REAL PRESETS STAY SEPARATE,” explains when demo presets are removed, and provides **Reset demo** and **Start for real**.
- A seeded `camera-fx-cues:presets` real sentinel never appeared in the demo. Saving wrote only `demo:camera-fx-cues:presets`. Reset removed only that demo key and restored the sample plus Outline. A second save followed by Start for real again removed only demo data, preserved the real sentinel byte-for-byte, and opened `/camera`.
- The observed landing, demo, and camera flow made only same-origin GET requests and produced no console or page error. The registered privacy test additionally instruments camera access, storage writes, MediaRecorder construction, track state, and third-party scripts.
- The registered offline test waits for service-worker control, clears the HTTP cache, switches the context offline, reloads the styled demo, and passes.

Evidence: `evidence/review-6/mobile-demo.png`, `evidence/review-6/desktop-demo.png`, and `evidence/review-6/live-demo.json`.

## Claims

`.factory/claims.json` has ten unique entries with exactly one matching test tag each. Every listed command was run separately from fresh clone `/tmp/camera-fx-cues-review6-wW9LeB/clone` at the reviewed commit.

| Claim id | Result | Observable outcome |
|---|---|---|
| `sample-cues` | pass | All six effects render on the sample. |
| `local-video` | pass | Permission waits for the camera action, fake video renders, requests stay same-origin, and the track ends on exit. |
| `preset-save` | pass | A demo preset uses its namespace and survives reload. |
| `keyboard-cues` | pass | Number keys 1–6 activate the matching rendered effects. |
| `keyboard-operation` | pass | Cold Tab order, route focus, Enter, and Escape work. |
| `reduced-motion` | pass | Zoom and Shake have no animation or transform movement with reduced motion. |
| `no-account` | pass | All six cues and preset saving work without sign-in or payment UI. |
| `offline-reload` | pass | The complete styled demo reloads offline after its first visit. |
| `demo-isolation` | pass | Reset and Start for real remove demo storage only. |
| `privacy-scope` | pass | No recorder, camera-payload storage, cross-origin request, or third-party script appears. |

The landing and README claims map to these entries: six effects and cue pads → `sample-cues`; permission timing and local camera lifecycle → `local-video`; presets → `preset-save`; number keys → `keyboard-cues`; reduced-motion advice → `reduced-motion`; free/no account → `no-account`; offline use → `offline-reload`; untouched real presets and isolated demo storage → `demo-isolation`; no recording, upload, analytics, advertising, or third-party scripts → `privacy-scope`. No claim-like product sentence is unlisted, and no registered claim is untested.

## History re-check

I read reviews 1–5, polish reports 1, 2, 4, and 5, and the current handoff. Every cumulative finding was checked in both current source and the deployed site.

| Earlier id | Current confirmation |
|---|---|
| F-1-1 | fixed: the recognizable sample, active Outline effect, and cue control are above the phone fold; Reset restores them |
| F-1-2 | fixed: the tagged test observes both Zoom and Shake with reduced motion |
| F-1-3 | fixed: the true 404 has complete metadata, icons, social image, legal footer, attribution, version, and touch targets |
| F-1-4 | fixed: README says “What Camera FX Cues does” |
| F-1-5 | fixed: “sample signal” is consistent outside the mandated sample-data CTA |
| F-1-6 | fixed: the eyebrow says “LOCAL CAMERA EFFECTS // NO ACCOUNT” |
| F-2-1 | fixed: Back and Forward restore recorded scroll positions and focus the destination H1 |
| F-2-2 | fixed: CTA explanation and all three facts fit at 390 × 844 |
| F-2-3 | fixed: the three facts cover privacy, offline use, and free/no-account access |
| F-2-4 | fixed: README says “bundled sample signal,” not “safe” |
| F-2-5 | fixed: `/camera` is in the sitemap and declared-route equality test |
| F-2-6 | fixed: the standalone 404 header includes Demo and Privacy |
| F-2-7 | fixed: README uses the concrete term “keyboard-controlled” |
| F-2-8 | fixed: the caption uses plain “camera art” wording |
| F-4-1 | fixed: standalone and client not-found routes say “Page not found,” not “Signal lost” |
| F-5-1 | fixed: “How it works” renders only on `/`, and every visible fragment resolves on every route |
| C1 | fixed: ten claim IDs have one exact observable test each, and all ten commands pass independently |
| S1 | fixed: motion/light warnings precede source actions and instrument effects |
| A1 | fixed: first Tab reaches the skip link; SPA/history navigation focuses and announces the H1 |
| A2 | fixed: tested links, buttons, and inputs meet 44 × 44 CSS pixels at 390 px |
| P1 | fixed: the complete versioned shell reloads offline |
| R1 | fixed: explicit routes and response override produce a styled, CSP-compatible HTTP 404 |
| D1 | fixed: bounded effects clear their readout, pressed state, and class within 420–500 ms |

No earlier finding is unfixed, half-fixed, or regressed.

## Structure, accessibility, and visual identity

- `/`, `/?demo=1`, `/demo`, `/camera`, `/privacy`, and `/terms` return 200. `/404.html` and an unknown path return the designed page with HTTP 404.
- Every route has `lang="en"`, one H1, one main landmark, a route-specific title, plain meta description, canonical, Open Graph/Twitter metadata, SVG favicon, and 180 px touch icon. The social image is the required 1200 × 630.
- The root title is `Camera FX Cues — Trigger camera effects with keys`; utility titles follow `Route — Camera FX Cues` and stay under 60 characters.
- Every visible internal URL returns 200, and every visible fragment resolves on its current route. The sitemap lists all five application routes; `robots.txt` points to it.
- Deep links and reloads retain their route. Browser Back and Forward restore scroll, focus the destination H1, and update the polite route announcement.
- The header and footer remain consistent; Privacy, Terms, Param Factory attribution, and version are present. The 404 retains a clear route home.
- Production sends the matching CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and HSTS. Normal routes log no console errors; the only error is Chromium's expected failed-main-document message on an intentional 404.
- Local and live Playwright suites pass 24/24. The included Axe scan reports no serious or critical violation on landing, demo, legal, and 404 routes. The factory URL verifier reports one H1, `lang`, `main`, complete alt/button names, and zero console errors.
- Keyboard operation, visible focus, reduced motion, 44 px targets, and 200% text reflow pass. The built JavaScript is 20.05 kB raw / 7.46 kB gzip, below the static-product budget.
- The dark pixel/demoscene control room, cyan/magenta/amber palette, hard square controls, scanlines, original camera art, and cue feedback match `.factory/design.md`. The presentation is recognizably product-specific rather than a generic SaaS template. Asset provenance is recorded in the design file and generation sidecar.

Evidence: `evidence/review-6/live-structure.json` and `evidence/review-6/verify-live/verify.json`.

## Quality gates

```text
ten individual claims.json commands                         PASS
npm test                                                    PASS; 24/24
PLAYWRIGHT_BASE_URL=https://camera-fx-cues.sociobot.in npm test
                                                            PASS; 24/24
npm run lint                                                PASS
npm run build                                               PASS; dist/ produced
factory verify-url                                          PASS; 0 console errors
JavaScript                                                  20.05 kB raw / 7.46 kB gzip
CSS                                                         13.17 kB raw / 3.71 kB gzip
```

## Missed leverage

No AI-assisted step, import/export, or sync is implied by the brief's local, real-time camera-cue job. The camera/sample choice, six cues, keyboard control, and local presets complete the stated task. Remote AI or sync would weaken the stated privacy boundary without completing a missing user step. No decorative AI feature, embedded provider key, analytics, or third-party runtime script is present.

## What would make this perfect

No product change is indicated by this review. Keep the ten claim commands, demo-isolation and offline tests, mobile first-screen checks, live request logging, route/fragment crawl, Back/Forward regression, Axe scan, and artifact comparison in the release gate so the zero-finding state does not regress.
