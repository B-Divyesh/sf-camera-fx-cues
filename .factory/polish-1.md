# Polish round 1 — finding closure

Polished candidate `6e5d726ea9c0f62c0546261d860cfc79a774aaaa` using the cumulative reports through `eb4a4584a8bce9fafc4ca45249ae40d5bdf7142a`. The deployed implementation commit is `a0517c092de6358a41a90d5000c3ea30cc810976`.

## Adversarial review 1

| Finding | Change made | Evidence |
|---|---|---|
| F-1-1 | The landing CTA now enters the isolated `/?demo=1` path. The demo opens on an original game-jam desk sample signal with Outline active. Demo-only mobile spacing places the complete stage and active cue pads in the first 390×844 screen. Reset restores the sample and active Outline; Start for real clears only demo storage. | Playwright `one-click query demo opens an active sample above the mobile fold`; [local mobile screenshot](evidence/polish-1/demo-mobile.png); [live mobile screenshot](evidence/polish-1/live-demo-mobile.png); live geometry in `evidence/polish-1/live-check.json`: stage bottom `643.9375`, active Outline button bottom `732.9375`. Live URL: `https://camera-fx-cues.sociobot.in/?demo=1`. |
| F-1-2 | The registered reduced-motion test now activates both Zoom and Shake, asserts `animation-name: none`, and observes each transform across a bounded interval to prove it does not move. The claim sandbox description now matches that proof. | Clean-clone `npm test -- --grep @claim:reduced-motion` passed; full suite test `@claim:reduced-motion warning is present and reduced motion removes movement` passed; the cold live check repeated both observations. |
| F-1-3 | The standalone 404 now has a description, canonical, favicon, 180×180 touch icon, Open Graph/Twitter metadata, Privacy and Terms links, Param Factory attribution, and version. Footer links retain 44 px targets. | Playwright `SWA missing routes use a true 404 and the 404 page obeys CSP` and mobile target test passed; [live 404 screenshot](evidence/polish-1/live-404-mobile.png); live `/404.html` and `/definitely-missing-polish-1` both returned HTTP 404. |
| F-1-4 | Renamed the README heading to `What Camera FX Cues does`. | `README.md`; `.factory/copy-audit.md`; clean-clone documentation inspection. |
| F-1-5 | Standardized the no-camera input as `sample signal` in landing copy, controls, README, demo documentation, claims, metadata, and accessible labels. The required CTA remains `Try it with sample data`. | `.factory/copy-audit.md`; `rg` terminology audit; live landing and demo screenshots. |
| F-1-6 | Replaced `LOCAL CAMERA INSTRUMENT // NO ACCOUNT` with `LOCAL CAMERA EFFECTS // NO ACCOUNT`. | [landing mobile screenshot](evidence/polish-1/landing-mobile.png); `.factory/copy-audit.md`; cold live text assertion. |

## Earlier verification findings rechecked

| Finding | Change or retained repair | Evidence |
|---|---|---|
| C1 | `.factory/claims.json` contains nine claims with exactly one matching test tag each. Camera tests use fake media plus storage, network, recorder, render, and track assertions. Demo wording no longer contradicts its sandbox storage. | Every claim command passed separately from clean clone `/tmp/camera-fx-cues-polish-rS5H96` at `a0517c0`; full suite passed 17/17. |
| S1 | Motion and bright-light warnings remain before the landing source actions and demo/live effects. | `@claim:reduced-motion`; Axe/semantic suite; live screenshot. |
| A1 | Cold load leaves focus at the document start so first Tab reaches the skip link; client navigation and browser history focus and announce the new H1. | `@claim:keyboard-operation`; `routes set titles, metadata, focus, history, and legal links`. |
| A2 | All visible links, buttons, and inputs on landing, query demo, and standalone 404 retain at least 44×44 CSS px at 390 px. | `all visible controls meet 44 by 44 CSS pixel touch targets at 390px`. |
| P1 | The versioned worker still precaches the complete shell and hashed bundles; `/?demo=1` reloads offline after the first visit. | `complete shell reloads offline after one visit`; cold live offline reload in `evidence/polish-1/live-check.json`. |
| R1 | Explicit SWA routes and `responseOverrides` still produce a true 404; standalone styling remains external and CSP-compatible. | `SWA missing routes use a true 404 and the 404 page obeys CSP`; live HTTP checks; live unknown status `404` in `evidence/polish-1/live-check.json`. |
| D1 | Laser, pixel, zoom, and shake still clear at 420–500 ms, including pressed state and readout. | `bounded effects return to ready and clear pressed state`; `@claim:sample-cues`. |

## Complete evidence

- Clean clone at `a0517c092de6358a41a90d5000c3ea30cc810976`: `npm ci` passed with 0 vulnerabilities; all nine `.factory/claims.json` commands passed separately; `npm test` passed 17/17; `npm run lint` passed; `npm run build` passed.
- Build: JavaScript `19.07 kB` raw / `7.18 kB` gzip; CSS `12.44 kB` raw / `3.55 kB` gzip; complete `dist/` `165,736` bytes.
- Playwright Axe integration: zero serious/critical issues on `/`, `/?demo=1`, `/privacy`, `/terms`, and `/404.html`, locally and live.
- Factory URL verifier: local and live passed title, language, one H1, main landmark, alt/names, and console checks. Reports: `evidence/polish-1/verify-local/verify.json` and `evidence/polish-1/verify-live/verify.json`.
- Lighthouse 12.6.0 mobile live: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.8 s, LCP 1.1 s, CLS 0, TBT 20 ms. Raw report: `evidence/polish-1/lighthouse-live.json`.
- Live artifact hashes match local `dist/` for `index.html`, `404.html`, `404.css`, `sw.js`, touch icon, and both hashed bundles.
- Live cold-browser report: `evidence/polish-1/live-check.json`. No normal-route console errors, no cross-origin requests, and offline reload passed.

All current and earlier finding IDs are closed. No severity remains deferred.
