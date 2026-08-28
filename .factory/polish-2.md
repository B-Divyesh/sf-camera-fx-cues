# Polish round 2 — cumulative finding closure

Polished candidate `d4cde88e315076e909682a03d3233520994d4ebb` from review commit `06d26fa1bc24d437373a21f3c4e99426971afedb`. Product repairs are in `51d68cf` and `c89d568`. Production was deployed as Azure Static Web Apps deployment `b9716be5-dcff-4a01-9445-91f17e1cb40d`.

All evidence below was repeated cold at [the live site](https://camera-fx-cues.sociobot.in). The complete live Playwright result is `evidence/polish-2/playwright-live.json` (22 passed, 0 skipped, 0 unexpected).

## Adversarial review 2

| Finding | Change made | Evidence |
|---|---|---|
| F-2-1 | Added per-history-entry scroll state, manual restoration, deterministic Back/Forward storage, and H1 focus with `preventScroll`. | Playwright `Back and Forward restore route scroll positions while focusing headings`; live suite JSON; live root and `/privacy`. |
| F-2-2 | Cropped the phone hero art into a 96px control-room strip and tightened only the mobile landing rhythm. The full CTA explanation and all facts now end above 844px. | Playwright `landing action explanation and privacy, offline, and price facts fit the first phone screen`; `evidence/polish-2/verify-live/screenshot-mobile.png`. |
| F-2-3 | Replaced the facts with “Camera stays in this browser,” “Works offline after your first visit,” and “Free; no account needed.” Added an offline claim and expanded the free/no-account proof through all six cues plus preset saving. | `@claim:local-video`, `@claim:offline-reload`, `@claim:no-account`; mobile landing screenshot; live full suite. |
| F-2-4 | Replaced “safe sample signal” with “bundled sample signal” in README. | `README.md`; `.factory/copy-audit.md`; banned/vague-word search. |
| F-2-5 | Added `/camera` to `sitemap.xml` and a declared-routes equality regression. | Playwright `sitemap lists every public application route`; live `/sitemap.xml` hash matches `dist`. |
| F-2-6 | Added Demo and Privacy to the standalone 404 header with the same 44px navigation treatment. | Playwright `SWA missing routes use a true 404 and the 404 page obeys CSP`; `evidence/polish-2/live-404-mobile.png`; live `/404.html` returns 404. |
| F-2-7 | Replaced subjective “clear” with concrete “keyboard-controlled” in README and “number keys” in metadata. | `README.md`, `index.html`, and `.factory/copy-audit.md`; live metadata route test. |
| F-2-8 | Replaced “ORIGINAL SCENE PLATE” with “ORIGINAL CAMERA ART.” | Playwright first-screen test; `evidence/polish-2/verify-live/screenshot-mobile.png`. |

## Adversarial review 1

| Finding | Change retained or strengthened | Evidence |
|---|---|---|
| F-1-1 | `/?demo=1` remains one click away, isolated, seeded with the game-jam desk signal and active Outline cue; Reset restores it. | `one-click query demo opens an active sample above the mobile fold`; `evidence/polish-2/live-demo-mobile.png`. |
| F-1-2 | Reduced-motion proof still measures both Zoom and Shake across bounded intervals. | `@claim:reduced-motion`; clean-clone and live pass. |
| F-1-3 | Standalone 404 retains route metadata, icons, social image, legal footer, attribution, version, external CSP-safe CSS, and now full header navigation. | 404 regression; `evidence/polish-2/live-404-mobile.png`; live 404 status. |
| F-1-4 | README heading remains “What Camera FX Cues does.” | `README.md`; copy audit. |
| F-1-5 | The no-camera input remains “sample signal” everywhere except the required CTA. | `.factory/copy-audit.md`; live landing/demo screenshots. |
| F-1-6 | The eyebrow remains “LOCAL CAMERA EFFECTS // NO ACCOUNT.” | Live landing screenshot and `@claim:no-account`. |

## Earlier verification findings

| Finding | Change retained or strengthened | Evidence |
|---|---|---|
| C1 | Claims registry now has ten unique IDs, one exact tag each, detailed sandboxes, and observable browser assertions. | `claims registry gives every claim one exact observable test tag`; all ten registered commands passed independently from clean clone `/tmp/camera-fx-cues-polish2-final-jY3mfq`. |
| S1 | Motion/light warning remains before both landing source actions and instrument effects. | `@claim:reduced-motion`; live demo screenshot. |
| A1 | Cold focus starts at the skip link; client routes and history focus and announce the destination H1. | `@claim:keyboard-operation`; route and Back/Forward regressions. |
| A2 | Visible links, buttons, and inputs remain at least 44×44 CSS px at 390px, including 404 navigation. | `all visible controls meet 44 by 44 CSS pixel touch targets at 390px`. |
| P1 | The service worker precaches the versioned complete shell and reloads `/?demo=1` offline after HTTP-cache clearing. | `@claim:offline-reload`; clean-clone and live pass. |
| R1 | SWA configuration retains explicit application rewrites and a real 404 override; 404 styling remains external and CSP-compatible. | 404 regression; live `/404.html` and an unknown path both return 404. |
| D1 | Laser, pixel, zoom, and shake still clear within 420–500ms with readout and pressed state reset. | `bounded effects return to ready and clear pressed state`; `@claim:sample-cues`. |

## Verification summary

- Clean clone `/tmp/camera-fx-cues-polish2-final-jY3mfq` at `c89d568fb5f11350b5402bb4cb37f339f67cdac5`: `npm ci` passed with 0 vulnerabilities; all ten claim commands passed separately; `npm test` passed 22/22; `npm run lint` and `npm run build` passed.
- Build: JS 20,047 bytes raw / 7.46 KB gzip; CSS 13,139 bytes raw / 3.70 KB gzip; complete `dist/` 169,646 bytes.
- Local and live factory URL verification: no console errors on the 200 landing route; one H1, `lang=en`, main landmark, complete image alt text, and labeled buttons. Reports: `evidence/polish-2/verify-local/verify.json` and `evidence/polish-2/verify-live/verify.json`.
- Live Playwright: 22/22 passed from fresh contexts, with zero serious/critical Axe findings. The true 404 produces only Chromium’s expected main-document 404 console message; all 200 routes have zero console/page errors.
- Live Lighthouse 12.6.0 mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.8s, LCP 1.1s, CLS 0, TBT 30ms. Report: `evidence/polish-2/lighthouse-live.json`.
- Local/live SHA-256 matched for `index.html`, `sw.js`, `404.html`, `404.css`, `sitemap.xml`, and both hashed bundles.

No finding of any severity remains open.
