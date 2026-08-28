# Adversarial first-read review 1 — Camera FX Cues

Reviewed 2026-08-28 against commit `3de0f5e370a0e28126c61a0918a99815f5264298` and the live site at `https://camera-fx-cues.sociobot.in`. Product code was not changed.

## Verdict: FAIL

Two blocking findings remain. A phone visitor can understand the landing screen, but the demo does not put an active, useful sample in the first phone screen, and one registered claim is only partly tested. There are also four minor metadata/copy findings. `PASS` requires zero findings and no untested claim.

## Cold first read

Fresh Chromium contexts at 390 × 844 and 1440 × 900 both loaded without console errors.

Before scrolling, the landing screen answers the three required questions:

| Question | Evidence | Result |
|---|---|---|
| What does this do? | “Trigger camera effects with keys” | clear |
| Who is it for? | “For game-jam and classroom teams who need playful camera cues without sending video away.” | clear |
| What should I click first? | “Try it with sample data” next to “Opens a synthetic scene.” | clear |

The header, hero art, hard-edged controls, scanline treatment, and cue-pad treatment are distinct from a generic SaaS template and match the recorded demoscene direction. At 390 px the primary action is visible without scrolling. This first-read gate passes.

## Findings

### F-1-1 — BLOCKING — the one-click demo does not show the product in use in the first phone screen

- **Location / quote:** `/demo` at 390 × 844 shows “DEMO — SAMPLE DATA, REAL PRESETS STAY SEPARATE”, “Try all six camera cues”, instructions, and the motion warning. Only a thin top strip of the stage begins at the bottom of the viewport; the cue pads are below it. The visible stage says “SAMPLE SIGNAL” and “READY”, so no effect is running.
- **Why this fails:** The required demo must show the product being used with realistic sample data immediately after one click. A phone visitor must scroll before they can see a usable sample or any cue in action, and the visible sample is an abstract diagnostic signal rather than a recognizable camera situation. This is a weak demo under the demo-sandbox contract.
- **Concrete fix:** Keep the persistent isolation banner, but reduce/reposition the introductory content on `/demo` so the stage and at least one active cue are fully visible at 390 × 844. Seed a recognizable, original sample scene (for example a classroom table or game-jam booth) with an active outline or laser cue already rendered. Keep Reset demo and Start for real visible and preserve the separate `demo:` storage namespace.

### F-1-2 — BLOCKING — the registered reduced-motion claim leaves shake untested

- **Location / quote:** `.factory/claims.json` claims “Reduced-motion settings remove zoom and shake movement.” Its sole test, `@claim:reduced-motion` in `tests/camera-fx-cues.spec.ts`, enables reduced motion and activates only **Zoom** before asserting `#stage` has `animation-name: none`.
- **Why this fails:** The test command passes, but the “shake movement” half of the published claim is not exercised from a clean demo entry point. The claims contract requires each advertised outcome to be observable in its tagged test. This leaves a claim portion untested, so the review cannot pass.
- **Concrete fix:** In the same tagged test, activate **Shake** under `prefers-reduced-motion: reduce` and assert that no shake animation or transform movement occurs (with a bounded time observation). Retain the Zoom assertion. This must be observable behavior, not only a class or button check.

### F-1-3 — Minor — the designed 404 route lacks required route metadata and footer navigation

- **Location / quote:** Live `/404.html` has `<title>Signal lost — Camera FX Cues</title>` and a theme color, but no meta description, canonical URL, favicon, Open Graph fields, or Twitter-card fields. Its footer is only “Playful camera cues for small teams.”
- **Why this matters:** The site-structure contract requires route metadata and a consistent footer with Privacy, Terms, Param Factory attribution, and build/version information. A direct 404 visit loses both metadata and the legal/help navigation available on every app route.
- **Concrete fix:** Add the route-specific metadata to `public/404.html` and use the existing favicon/OG image. Add Privacy and Terms links plus “Built by Param Factory · v1.0.0” to the 404 footer, styled as real 44 px touch targets.

### F-1-4 — Minor — README heading does not stand alone in a heading list

- **Location / quote:** `README.md`, `## What it does`.
- **Why this matters:** Heard out of context by a screen-reader user, “What it does” has no subject. The plain-words contract requires headings to make sense by themselves.
- **Concrete fix:** Rewrite it as `## What Camera FX Cues does`.

### F-1-5 — Minor — the no-camera sample has four competing names

- **Location / quote:** Landing CTA: “Try it with sample data”; its adjacent copy: “Opens a synthetic scene.” Entry button: “Open sample signal”; README: “safe sample scene.”
- **Why this matters:** These all refer to the same no-camera input, yet a first-time visitor has to infer whether data, scene, and signal differ. The repository’s terminology table itself names this concept “sample signal.”
- **Concrete fix:** Keep the required CTA label “Try it with sample data”, but make its follow-up and all product controls say “sample signal”, for example: “Opens the sample signal. Your real presets stay untouched.” Change README to “the safe sample signal.”

### F-1-6 — Minor — the hero eyebrow uses unexplained jargon

- **Location / quote:** Landing eyebrow: “LOCAL CAMERA INSTRUMENT // NO ACCOUNT”.
- **Why this matters:** “Instrument” does not say what a visitor can do and is not the product term used in the headline. On a phone it is the first descriptor above the headline, so it adds a term to decode before the plain explanation.
- **Concrete fix:** Rewrite as “LOCAL CAMERA EFFECTS // NO ACCOUNT”.

## Copy audit

The table covers every sentence and control/heading phrase that carries meaning. Counts treat hyphenated words and `1–6` as one word. No entry exceeds 22 words. No banned wording was found. “Playful” is retained as a concrete brief-defined style, not a performance promise. The heading, terminology, and jargon flags are recorded as F-1-4 through F-1-6.

| Location | Copy | Words | Result |
|---|---|---:|---|
| Landing | LOCAL CAMERA INSTRUMENT // NO ACCOUNT | 5 | F-1-6 jargon |
| Landing | Trigger camera effects with keys | 5 | pass |
| Landing | For game-jam and classroom teams who need playful camera cues without sending video away. | 14 | pass |
| Landing | Try it with sample data | 5 | pass; result-naming action |
| Landing | Opens a synthetic scene. | 4 | F-1-5 term |
| Landing | Your real presets stay untouched. | 5 | pass |
| Landing | Camera stays in your browser | 5 | registered claim |
| Landing | Works with six number keys | 5 | registered claim |
| Landing | Starts without an account | 4 | registered claim |
| Landing | ORIGINAL SCENE PLATE // GENERATED FOR THIS TOOL | 7 | pass |
| Landing | Choose a camera or sample signal | 6 | F-1-5 term |
| Landing | Camera permission is requested only after you choose your camera. | 10 | registered claim |
| Landing | Use your camera | 3 | result-naming action |
| Landing | Open sample signal | 3 | result-naming action; F-1-5 term |
| Landing | Motion and light warning | 4 | pass |
| Landing | Effects use sudden motion and bright contrast. | 7 | pass |
| Landing | If these may affect you, turn on reduced motion or do not start. | 13 | pass |
| Landing | Run a cue in your scene | 6 | pass |
| Landing | Pick a source. | 3 | pass |
| Landing | Allow your camera or start the sample signal. | 8 | F-1-5 term |
| Landing | Press a number key. | 4 | pass |
| Landing | Keys 1–6 trigger the six effects. | 6 | registered claim |
| Landing | Save a preset. | 3 | pass |
| Landing | Keep your cue choice on this device. | 7 | registered claim |
| Landing | What Camera FX Cues does not do | 7 | pass |
| Landing | It does not record, store, or upload camera video. | 9 | registered claim |
| Landing | It has no analytics, advertising, accounts, or third-party scripts. | 9 | registered claim |
| Landing | Playful camera cues for small teams. | 6 | pass |
| README | Camera FX Cues | 3 | pass |
| README | Trigger playful camera effects with keys. | 6 | pass |
| README | It is for game-jam and classroom teams who need a small, local effects instrument. | 14 | pass |
| README | Open the live site at https://camera-fx-cues.sociobot.in or start at /demo for the safe sample scene. | 18 | F-1-5 term |
| README heading | What it does | 3 | F-1-4 heading |
| README | Runs laser, outline, pixel burst, freeze, zoom, and shake cues. | 10 | registered claim |
| README | Uses number keys 1–6 or on-screen cue pads. | 8 | registered claim |
| README | Keeps camera processing in the current browser tab and stops its track when you leave the camera page. | 18 | registered claim |
| README | Saves named cue presets in browser storage on this device. | 10 | registered claim |
| README | It does not record, store, or upload camera video. | 9 | registered claim |
| README | It loads no analytics, advertising, or third-party scripts. | 8 | registered claim |
| README heading | Run locally | 2 | pass |
| README | Open the local URL shown by Vite. | 7 | pass |
| README | Choose Use your camera to request local camera access. | 9 | registered claim |
| README | Choose Try it with sample data to run the isolated demo. | 11 | registered claim |
| README heading | Test and build | 3 | pass |
| README | The production build is written to dist/, with index.html at its root. | 13 | pass |
| README | Deploy that directory as an Azure Static Web App. | 9 | pass |
| README | staticwebapp.config.json includes explicit app routes, a true 404 response, and security headers. | 14 | pass |
| README heading | Privacy and demo | 3 | pass |
| README | The demo uses demo:camera-fx-cues: browser-storage keys. | 7 | registered claim |
| README | Resetting the demo clears only those keys. | 7 | registered claim |
| README | Real presets use camera-fx-cues: keys. | 5 | registered claim |
| README | See the privacy page, .factory/demo.md, and .factory/claims.json for the testable product promises. | 16 | pass |
| README heading | License | 1 | pass |
| README | MIT. | 1 | pass |
| README | See LICENSE. | 2 | pass |

Buttons name their result or destination: **Try it with sample data**, **Use your camera**, **Open sample signal**, **Reset demo**, **Start for real**, **Save preset**, **Try camera again**, and **Use sample signal**. Navigation labels are route names, not action buttons.

## Claims, sandbox, and quality gates

`.factory/claims.json` contains nine entries. From a fresh local clone at the reviewed commit, after `npm ci`, every registered command passed individually:

| Claim id | Result |
|---|---|
| `sample-cues` | pass |
| `local-video` | pass |
| `preset-save` | pass |
| `keyboard-cues` | pass |
| `keyboard-operation` | pass |
| `reduced-motion` | command passes; F-1-2 records the untested Shake outcome |
| `no-account` | pass |
| `demo-isolation` | pass |
| `privacy-scope` | pass |

`npm test` passed 15/15, `npm run lint` passed, and `npm run build` passed from that clone. The build emitted `dist/`, 17.93 kB raw JavaScript (6.77 kB gzip) and 11.45 kB raw CSS (3.37 kB gzip).

Live browser checks used a fresh context. `/demo` made only same-origin requests. With the installed service worker controlling the page, the HTTP cache was cleared, the browser was taken offline, and `/demo` reloaded with its heading, banner, style, and cached JS/CSS present. The demo isolation test seeds a real-preset sentinel, verifies demo save/reset and Start for real clear only `demo:camera-fx-cues:` keys, and preserves the sentinel. These checks pass; F-1-1 is about what the visitor sees, not storage isolation.

All claim-like landing and README promises map to a registered claim except the phrase “safe sample scene,” which describes the already registered demo-isolation promise. No other unlisted public product claim was found.

## History re-check

No earlier `.factory/review-*.md` or `.factory/polish-*.md` files exist. I read the prior verification reports and handoff. Their earlier findings were rechecked in both code and the live site:

| Earlier id | Confirmation |
|---|---|
| C1 — claim proof | The nine claim commands now run and the camera tests use fake media plus network/storage instrumentation. The separate incomplete Shake assertion is newly recorded as F-1-2. |
| S1 — motion/light warning | Present before source choices and on `/demo`; the reduced-motion query is implemented. |
| A1 — initial focus | Fresh Tab starts on “Skip to controls”; the heading is focused only after client route navigation. |
| A2 — touch targets | The clean-clone 390 px regression test passes for visible controls. |
| P1 — offline reload | Live controlled-worker offline reload of `/demo` succeeds with the hashed shell cached. |
| R1 — 404 | `/404.html` and an unknown path return HTTP 404; the standalone page has external CSP-compatible CSS. F-1-3 is a separate metadata/footer omission. |
| D1 — bounded cues | The current code bounds laser, pixel, zoom, and shake at 420–500 ms and the regression test passes. |

## Structure and navigation check

`/`, `/demo`, `/camera`, `/privacy`, and `/terms` return 200; `/404.html` and an unknown URL return 404. All discovered internal links return 200. The SPA routes update title, description, canonical, OG/Twitter title and description; back navigation is handled by `popstate`, and client route changes focus/announce the H1. Principal app routes have one H1, `main`, `lang="en"`, a skip link, designed focus styling, and consistent Privacy/Terms footer links. F-1-3 records the standalone 404 exception.

The brief asks for a local camera scene, keyboard triggers, and a no-camera preview. The product provides those core capabilities. An AI feature, import/export, or sync is not an obvious missing capability for this local, real-time effects instrument; adding one would not improve the stated job. No provider key or decorative AI feature is present.

## What would make this perfect

Show an active, recognizable sample effect above the fold on the 390 px demo; extend the reduced-motion claim test to Shake; complete the standalone 404 skeleton and metadata; then apply the three precise copy repairs. Re-run the fresh-clone claim commands, full suite, build, live mobile demo check, and metadata crawl. With those findings at zero, this can pass.
