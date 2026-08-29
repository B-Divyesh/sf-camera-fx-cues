# Polish round 4 — cumulative finding closure

Polished released candidate `01dd162d43ee0363de0548c174f6526595b9c076` from review commit `804f645b099f67d5b75e8afdea06ff6814b9d8fc`. The functional repair is commit `efdcc291e4379266368678d6171e0a536099ef2f`. Azure Static Web Apps deployment `7be00d0c-8587-4953-9894-19f3cfec155b` is live at [camera-fx-cues.sociobot.in](https://camera-fx-cues.sociobot.in).

## Adversarial review 4

| Finding | Change made | Evidence |
|---|---|---|
| F-4-1 | Replaced “Signal lost” with “Page not found” in the standalone 404 document, Open Graph, and Twitter titles and in the visible label. Applied the same title and label to the SPA missing route. Added standalone and client-fallback regressions. | Tests `SWA missing routes use a plain-language true 404 that obeys CSP` and `client-side missing routes use the same plain 404 wording`; [mobile screenshot](../evidence/polish-4/live-404-mobile.png); [desktop unknown-route screenshot](../evidence/polish-4/live-404-desktop.png); live `/404.html` and `/definitely-missing-polish-4` both return 404 with title `Page not found — Camera FX Cues`. |

## Adversarial review 2

| Finding | Retained or strengthened repair | Evidence |
|---|---|---|
| F-2-1 | Per-entry scroll state, manual restoration, heading focus, and route announcement remain in place. | Test `Back and Forward restore route scroll positions while focusing headings`; live full suite 23/23. |
| F-2-2 | The 96px mobile camera-art strip and compact phone rhythm still keep the CTA explanation and three facts in the first 390×844 viewport. | Test `landing action explanation and privacy, offline, and price facts fit the first phone screen`; [live landing screenshot](../evidence/polish-4/live-landing-mobile.png); final fact bottom `690.20px`. |
| F-2-3 | The facts remain the required privacy, offline, and free/no-account facts. | Claim tests `@claim:local-video`, `@claim:offline-reload`, and `@claim:no-account`; live landing screenshot. |
| F-2-4 | README continues to call the bundled input the “bundled sample signal,” without the ambiguous “safe” claim. | `.factory/copy-audit.md`; clean-clone claim registry check; live demo uses the same term. |
| F-2-5 | `/camera` remains in the sitemap and declared route set. | Test `sitemap lists every public application route`; live `/sitemap.xml` hash matches `dist/sitemap.xml`. |
| F-2-6 | The standalone 404 retains Demo and Privacy header links and the complete legal footer. | 404 regression; [live 404 mobile screenshot](../evidence/polish-4/live-404-mobile.png); live internal-link crawl passes. |
| F-2-7 | README continues to use the concrete term “keyboard-controlled.” | `README.md`; `.factory/copy-audit.md`. |
| F-2-8 | The caption remains “ORIGINAL CAMERA ART // MADE FOR THIS TOOL.” | [live landing screenshot](../evidence/polish-4/live-landing-mobile.png); `.factory/copy-audit.md`. |

## Adversarial review 1

| Finding | Retained or strengthened repair | Evidence |
|---|---|---|
| F-1-1 | `/?demo=1` remains a one-click isolated sample with the recognizable game-jam desk and Outline already active. Reset restores both. | Test `one-click query demo opens an active sample above the mobile fold`; [live demo screenshot](../evidence/polish-4/live-demo-mobile.png); live stage bottom `643.94px`, Outline pad bottom `732.94px`. |
| F-1-2 | The reduced-motion claim still measures both Zoom and Shake over bounded intervals. | `@claim:reduced-motion warning is present and reduced motion removes movement`; clean-clone and live passes. |
| F-1-3 | The 404 retains full metadata, icons, social image, legal links, attribution, version, external CSS, and 44px targets; its wording is now also plain. | Plain-language 404 regression, mobile target regression, live Axe scan, and live `/404.html` HTTP 404. |
| F-1-4 | README heading remains “What Camera FX Cues does.” | `README.md`; `.factory/copy-audit.md`. |
| F-1-5 | “Sample signal” remains the sole name for the no-camera input outside the required sample-data CTA. | `.factory/copy-audit.md`; `@claim:demo-isolation`; live demo screenshot. |
| F-1-6 | The first-screen eyebrow remains “LOCAL CAMERA EFFECTS // NO ACCOUNT.” | [live landing screenshot](../evidence/polish-4/live-landing-mobile.png); `@claim:no-account`. |

## Earlier verification findings

| Finding | Retained or strengthened repair | Evidence |
|---|---|---|
| C1 | `.factory/claims.json` has ten unique claims, one exact tagged test each, accurate locations, and observable sandboxes. All ten commands pass separately. | Test `claims registry gives every claim one exact observable test tag`; clean clone `/tmp/camera-fx-cues-polish4-0vKoSY/clone` at `efdcc29`. |
| S1 | Motion and bright-light warnings remain before landing source actions and instrument effects. | `@claim:reduced-motion`; live demo screenshot. |
| A1 | Cold Tab order starts at the skip link; SPA and history changes focus and announce the route H1. | `@claim:keyboard-operation`; route and history tests; live suite. |
| A2 | Visible links, buttons, and inputs remain at least 44×44 CSS pixels at 390px. | Test `all visible controls meet 44 by 44 CSS pixel touch targets at 390px`. |
| P1 | The versioned service worker precaches the complete route shell and hashed assets. | `@claim:offline-reload complete shell reloads offline after one visit`; clean-clone and live passes. |
| R1 | Explicit SWA rewrites and the response override produce a styled, CSP-compatible true 404. | Plain-language 404 regression; live `/404.html` and unknown route return 404; `evidence/polish-4/live-http.json`. |
| D1 | Laser, pixel, zoom, and shake clear their readout, pressed state, and class within 420–500ms. | Test `bounded effects return to ready and clear pressed state`; `@claim:sample-cues`. |

## Complete verification

- Clean clone `/tmp/camera-fx-cues-polish4-0vKoSY/clone` at `efdcc291e4379266368678d6171e0a536099ef2f`: `npm ci` passed with 0 vulnerabilities; all ten commands from `.factory/claims.json` passed separately; `npm test` passed 23/23; `npm run lint` and `npm run build` passed.
- The exact work-order command `npm ci && npm test && npm run build` passed before deployment. Build output: JavaScript 20.05 kB raw / 7.47 kB gzip; CSS 13.14 kB raw / 3.70 kB gzip; `dist/` 169,669 bytes.
- Local and live factory URL verification passed title, language, one H1, main landmark, image alternatives, button names, and console checks. Reports: `evidence/polish-4/verify-local/verify.json` and `evidence/polish-4/verify-live/verify.json`.
- The full Playwright suite passed 23/23 locally, from the clean clone, in the deploy build, and against the live URL. It covers browser behavior, keyboard, routing, focus, Back/Forward scroll, mobile layout, camera privacy, demo isolation, offline reload, semantics, and Axe.
- A separate cold live Axe scan reports zero violations on `/`, `/?demo=1`, `/demo`, `/camera`, `/privacy`, `/terms`, and `/404.html`: `evidence/polish-4/axe-live.json`.
- Live Lighthouse 12.6.0 mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.8s, LCP 1.1s, CLS 0, TBT 10ms. Raw report: `evidence/polish-4/lighthouse-live.json`.
- Local and live SHA-256 hashes match for `index.html`, `404.html`, `404.css`, `sw.js`, `sitemap.xml`, and both hashed bundles: `evidence/polish-4/artifact-hashes.json`.
- Every discovered non-anchor internal link returns 200: `evidence/polish-4/live-link-crawl.json`. The intentional error paths return 404.

Every current and earlier finding ID is closed. No severity is deferred.
