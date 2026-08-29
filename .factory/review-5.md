# Adversarial first-read review 5 — Camera FX Cues

Reviewed 2026-08-29 against commit `fc4b956ccc0da82d1916bfe45572de18e1a72090` and the deployed site at [camera-fx-cues.sociobot.in](https://camera-fx-cues.sociobot.in). Product code was not changed. The local production build and deployed shell, JavaScript, CSS, service worker, and 404 document match by SHA-256.

## Verdict: FAIL

One blocking finding remains. The first screen, sample demo, sandbox isolation, all ten registered claims, build, privacy boundary, accessibility checks, and every earlier finding pass. However, the shared header exposes a dead “How it works” link on four routes. The site-structure contract classifies broken routing as blocking, and PASS requires zero findings.

## Findings

### F-5-1 — BLOCKING — “How it works” is a visible dead link on every non-landing application route

- **Exact quote/location:** The header on live `/demo`, `/camera`, `/privacy`, and `/terms` visibly shows **“How it works”** with `href="#how"`, but none of those documents contains an element with `id="how"`. At 390 px the link occupies a visible 113 × 44 px target. Clicking it changes `/demo` to `/demo#how` (and likewise for the other routes), leaves `scrollY` at `0`, and does not move focus. In source, `src/main.ts:48` adds the `hidden` attribute away from the landing route, but `src/style.css:6` sets `nav a { display: inline-flex; }`, overriding the browser's hidden presentation.
- **Why a first-time visitor is lost:** This is one of only three primary navigation links. On four of the five application routes it promises a destination but produces no content or navigation. That is a dead link and broken routing, so it is blocking under the required site-structure check.
- **Concrete fix:** Render the “How it works” anchor only when `current === 'landing'`, or add a global `[hidden] { display: none !important; }` rule that cannot be overridden. Add a Playwright crawl that visits every route, examines every visible same-page fragment link, and asserts that its decoded fragment resolves to an element before clicking it. The existing crawl must stop excluding anchor links.

## Cold first read

Fresh Chromium contexts opened `/` at 390 × 844 and 1440 × 900 with empty storage, no prior scroll, no console error, and only same-origin requests. Before scrolling, I could answer all three questions:

| Question | Answer in my own words | Exact live evidence | Result |
|---|---|---|---|
| What does this do? | It adds effects to a camera view when keys are pressed. | “Trigger camera effects with keys” | clear |
| Who is it for? | Game-jam and classroom teams. | “For game-jam and classroom teams who need playful camera cues without sending video away.” | clear |
| What should I click first? | Open the ready-made sample without changing real presets. | “Try it with sample data” and “Opens the sample signal. Your real presets stay untouched.” | clear |

At 390 px, the CTA explanation ends at `623.64px` and the last privacy/offline/price fact ends at `690.20px`, within the 844 px viewport. At 1440 px, the last fact ends at `838.94px`, within the 900 px viewport. The headline is five words, the audience sentence is 14 words, and the first action is unambiguous. The first-read blocking gate passes.

The dark pixel-control-room composition, cyan/magenta/amber palette, hard-edged controls, scanlines, and original camera art are recognizably product-specific. The live presentation matches `.factory/design.md` and does not resemble a generic centered SaaS hero or feature-card template.

## Copy audit

Counts omit punctuation-only separators and list numbers, and treat hyphenated terms, URLs, paths, and `1–6` as one word. The tables include every landing/README sentence plus meaningful headings, labels, navigation, actions, image text, and conditional offline copy. No item exceeds 22 words. No banned word, vague marketing adjective, unexplained jargon, inconsistent product term, contextless heading, or non-result-naming button was found. F-5-1 is a destination defect, not a wording defect.

### Landing page

| Copy | Words | Check |
|---|---:|---|
| Skip to controls | 3 | pass; destination exists |
| Camera FX Cues | 3 | pass; wordmark |
| Demo | 1 | pass; destination |
| How it works | 3 | pass on landing; `#how` exists here |
| Privacy | 1 | pass; destination |
| Offline. | 1 | pass; conditional status |
| Reconnect before starting a camera. | 5 | pass; next action |
| Local camera effects // no account | 5 | pass |
| Trigger camera effects with keys | 5 | pass |
| For game-jam and classroom teams who need playful camera cues without sending video away. | 14 | pass |
| Try it with sample data | 5 | pass; result-naming action |
| Opens the sample signal. | 4 | pass |
| Your real presets stay untouched. | 5 | pass; `demo-isolation` |
| Camera stays in this browser | 5 | pass; `local-video` |
| Works offline after your first visit | 6 | pass; `offline-reload` |
| Free; no account needed | 4 | pass; `no-account` |
| A pixel-art camera control room with cyan light beams. | 9 | pass; image alternative |
| Original camera art // made for this tool | 7 | pass; provenance is documented |
| Before you start | 3 | pass |
| Choose a camera or sample signal | 6 | pass |
| Camera permission is requested only after you choose your camera. | 10 | pass; `local-video` |
| Use your camera | 3 | pass; result-naming action |
| Open sample signal | 3 | pass; result-naming action |
| Motion and light warning | 4 | pass |
| Effects use sudden motion and bright contrast. | 7 | pass; direct safety warning |
| If these may affect you, turn on reduced motion or do not start. | 13 | pass; direct safety action |
| Three steps | 2 | pass |
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
| Playful camera cues for small teams. | 6 | pass; brief-defined use |
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
| Uses number keys 1–6 or on-screen cue pads. | 8 | pass; `keyboard-cues` |
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

Terminology remains consistent: an effect trigger is a **cue**, the bundled no-camera input is the **sample signal**, a saved cue choice is a **preset**, and browser video input is the **camera**. The required CTA alone uses “sample data.”

## Demo and sandbox

The demo gate passes in fresh phone and desktop contexts.

- The first-screen CTA enters `/?demo=1` in one click and sets `Demo — Camera FX Cues`.
- The first render shows the recognizable game-jam desk sample with Outline already active. On the phone, the complete stage ends at `643.94px` and the active Outline pad ends within the 844 px viewport. On desktop, the outlined sample and `OUTLINE` readout are visible before scrolling.
- The persistent banner says “DEMO — SAMPLE SIGNAL, REAL PRESETS STAY SEPARATE,” explains when demo presets are removed, and exposes **Reset demo** and **Start for real**.
- A real sentinel preset was seeded before demo entry. Saving a demo preset wrote only `demo:camera-fx-cues:presets`; Reset removed only that demo key and restored the sample plus Outline. Saving again and choosing Start for real removed the demo key, preserved `camera-fx-cues:presets` byte-for-byte, and opened `/camera`.
- The flow made no cross-origin or non-GET request and produced no console or page error. The live claim suite also confirms no recorder use or camera-payload storage. The controlled service-worker test reloads the complete styled demo offline after its first visit.

## Claims and quality gates

`.factory/claims.json` contains ten unique entries with one exact tagged test each. Every listed command was run separately from clean clone `/tmp/tmp.oPNpCLOlcr/clone` at the reviewed commit.

| Claim id | Result | Observable outcome checked |
|---|---|---|
| `sample-cues` | pass | all six rendered effect states exercised on the sample |
| `local-video` | pass | permission delayed until camera entry, fake video rendered, requests stayed same-origin, track ended on exit |
| `preset-save` | pass | named demo preset used its namespace and survived reload |
| `keyboard-cues` | pass | number keys 1–6 activated each matching rendered state |
| `keyboard-operation` | pass | skip-link order, route focus, Enter, and Escape worked |
| `reduced-motion` | pass | both Zoom and Shake showed no animation or transform movement |
| `no-account` | pass | all six cues and preset save worked without sign-in or payment UI |
| `offline-reload` | pass | the controlled, styled demo reloaded offline after the first visit |
| `demo-isolation` | pass | Reset and Start for real removed demo storage only |
| `privacy-scope` | pass | no recorder, camera payload write, cross-origin request, or third-party script |

No claim-like landing or README sentence is unlisted. The live privacy and terms statements are covered by `local-video`, `preset-save`, `demo-isolation`, and `privacy-scope`. No registered claim failed or remained untested.

Additional verification:

```text
npm ci                                                    PASS; 0 vulnerabilities
all 10 claims.json commands, separately                   PASS
npm test                                                  PASS; 23/23
npm run lint                                              PASS
npm run build                                             PASS; dist/ produced
PLAYWRIGHT_BASE_URL=https://camera-fx-cues.sociobot.in npm test  PASS; 23/23
JavaScript                                                20.05 kB raw / 7.47 kB gzip
CSS                                                       13.14 kB raw / 3.70 kB gzip
dist/                                                     169,669 bytes
```

The factory URL verifier passed the live root with one H1, `lang="en"`, one main landmark, complete image alternatives, labeled buttons, and no console errors. The Playwright Axe integration found zero serious or critical violations on landing, demo, privacy, terms, and 404 pages. The standalone Axe CLI could not start because its downloaded ChromeDriver 152 did not match the preinstalled Chromium 145; the equivalent repository Playwright Axe integration ran locally and live instead.

## Structure, routing, accessibility, and crawl

- `/`, `/demo`, `/camera`, `/privacy`, and `/terms` return 200. `/404.html` and an unknown path return the designed HTTP 404.
- Every application route has one H1, one main landmark, `lang="en"`, a route-specific title, description, canonical URL, OG/Twitter metadata, favicon, touch icon, consistent legal footer, and visible focus treatment. The OG image is 1200 × 630 and the touch icon is 180 × 180.
- Titles follow the required root and route patterns. The root title is “Camera FX Cues — Trigger camera effects with keys”; utility titles are “Demo — Camera FX Cues,” “Camera input — Camera FX Cues,” “Privacy — Camera FX Cues,” and “Terms — Camera FX Cues.”
- Browser Back and Forward restore route scroll positions, focus the destination H1, and update the polite route announcement. Deep links and reloads retain the intended route.
- All non-fragment internal destinations, public assets, `robots.txt`, and `sitemap.xml` return their expected status. The sitemap lists all five public application routes. F-5-1 is the failed fragment-link portion of the crawl.
- Live requests during cold landing, demo, camera, and legal-route checks were same-origin. Response headers include the matching CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and HSTS. No provider key, analytics, advertising script, or third-party runtime resource appears.
- Keyboard cue operation, 44 × 44 px targets at 390 px, 200% text reflow, reduced motion, semantics, and serious/critical Axe checks pass. The expected browser console report for an intentional 404 is confined to 404 responses.
- F-5-1 prevents the route/link structure from passing overall.

## History re-check

I read every earlier `.factory/review-*.md`, `.factory/polish-*.md`, and the handoff. Each recorded finding was checked in current code and on the deployed site rather than accepted from its prior status label.

| Earlier finding | Current confirmation |
|---|---|
| F-1-1 | fixed: the recognizable outlined sample and active Outline pad are above the phone fold; Reset restores both |
| F-1-2 | fixed: the tagged reduced-motion test observes both Zoom and Shake |
| F-1-3 | fixed: the true 404 has metadata, icons, social image, legal footer, attribution, version, and 44 px targets |
| F-1-4 | fixed: README says “What Camera FX Cues does” |
| F-1-5 | fixed: “sample signal” is consistent except for the required sample-data CTA |
| F-1-6 | fixed: the eyebrow says “LOCAL CAMERA EFFECTS // NO ACCOUNT” |
| F-2-1 | fixed: Back and Forward restore recorded scroll positions and destination-heading focus |
| F-2-2 | fixed: CTA explanation and all three facts fit at 390 × 844 |
| F-2-3 | fixed: the facts cover privacy, offline use, and free/no-account access |
| F-2-4 | fixed: README says “bundled sample signal,” not “safe” |
| F-2-5 | fixed: `/camera` is in the sitemap and declared-route equality test |
| F-2-6 | fixed as scoped: the standalone 404 header includes Demo and Privacy; F-5-1 is a separate shared-SPA fragment defect |
| F-2-7 | fixed: README uses the concrete term “keyboard-controlled” |
| F-2-8 | fixed: the caption says “ORIGINAL CAMERA ART // MADE FOR THIS TOOL” |
| F-4-1 | fixed: standalone and SPA not-found routes use “Page not found,” not the earlier metaphor |
| C1 | fixed: ten claim IDs have one exact observable test each; all ten commands pass independently |
| S1 | fixed: motion/light warnings precede landing source actions and instrument effects |
| A1 | fixed: first Tab reaches the skip link; SPA/history route changes focus and announce the H1 |
| A2 | fixed: all tested visible links, buttons, and inputs meet 44 × 44 CSS pixels at 390 px |
| P1 | fixed: the versioned complete shell reloads offline after its first visit |
| R1 | fixed: explicit routes and the response override produce a styled, CSP-compatible true 404 |
| D1 | fixed: timed cues clear their readout, pressed state, and class within 420–500 ms |

No earlier finding ID is reopened. F-5-1 is a newly detected dead-fragment defect that earlier crawls explicitly missed by checking only non-anchor links.

## Missed leverage

No AI-assisted step, import/export, or sync is an obvious requirement for the brief's local, real-time camera-cue job. The camera/sample choice, six cues, keyboard control, and local presets complete the stated scope. Remote AI or sync would weaken the current privacy boundary without completing a missing user task. No decorative AI feature or embedded provider key is present.

## What would make this perfect

Remove the visible dead “How it works” link from every route that lacks `#how`, and add a visible-fragment crawl so it cannot regress. Re-run every registered claim command, the full local and live suites, the 390 px first-screen/demo checks, privacy request logging, accessibility scan, and a crawl that includes both URL and fragment destinations. With that single routing finding closed and no new finding, the review can pass.
