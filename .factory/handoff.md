# Camera FX Cues — polish round 1 handoff

## Result

PASS. Every finding in `.factory/review-1.md` and the earlier `.factory/verification.md` history is repaired or re-verified. The static Vite + vanilla TypeScript artifact remains deployed from `dist/` at `https://camera-fx-cues.sociobot.in`.

The repair adds the required isolated `/?demo=1` path, a recognizable game-jam desk sample with Outline already active, phone-first demo composition, full reduced-motion Shake proof, complete 404 metadata/footer navigation, consistent sample-signal language, clearer first-screen wording, a 180×180 touch icon, stronger routing/metadata/focus tests, an updated claims registry, and the verb-first 99-character catalog description.

The implementation deployed from commit `a0517c092de6358a41a90d5000c3ea30cc810976`. `.factory/polish-1.md` maps every finding ID to its repair and evidence.

## Verification

From a fresh clone of `a0517c0` in `/tmp/camera-fx-cues-polish-rS5H96`:

```text
npm ci                                              PASS, 0 vulnerabilities
npm test -- --grep @claim:sample-cues              PASS
npm test -- --grep @claim:local-video              PASS
npm test -- --grep @claim:preset-save              PASS
npm test -- --grep @claim:keyboard-cues            PASS
npm test -- --grep @claim:keyboard-operation       PASS
npm test -- --grep @claim:reduced-motion           PASS
npm test -- --grep @claim:no-account               PASS
npm test -- --grep @claim:demo-isolation           PASS
npm test -- --grep @claim:privacy-scope            PASS
npm test                                             17 passed
npm run lint                                         PASS
npm run build                                        PASS
```

The production build contains `index.html` at the root. Sizes are 19.07 kB raw / 7.18 kB gzip JavaScript, 12.44 kB raw / 3.55 kB gzip CSS, and 165,736 bytes total.

Browser checks cover the 390×844 first screen, 200% text, 44 px targets, all effects, presets, camera permission/denial/track cleanup, keyboard and history focus, route titles/metadata/canonicals/legal links, true 404s, CSP, console errors, same-origin privacy, and a controlled offline reload. Axe reports zero serious/critical findings on all principal routes and the 404. The factory URL verifier passes locally and live.

Live Lighthouse 12.6.0 mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.8 s, LCP 1.1 s, CLS 0, TBT 20 ms.

The custom domain returned 200 for `/`, `/?demo=1`, `/demo`, `/camera`, `/privacy`, and `/terms`; `/404.html` and an unknown path returned 404. Local/live SHA-256 values match for the HTML, service worker, 404 assets, touch icon, and hashed JavaScript/CSS bundles. Evidence is under `.factory/evidence/polish-1/`.

## Deploy and maintenance

Build with `npm run build`, then deploy `dist/` as the Azure Static Web App artifact. This work order deployed to `sf-camera-fx-cues` in resource group `sociobot` through the configured production token. No infrastructure, DNS, billing, backend, AI, analytics, or third-party runtime service was added.

## Known gaps and next steps

None known. No finding or minor item is deferred.
