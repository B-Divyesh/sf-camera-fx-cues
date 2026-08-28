# Camera FX Cues — adversarial review 2 handoff

## Result

Review 2 is complete with verdict **FAIL**. No product code was modified. The complete evidence-backed report is `.factory/review-2.md`.

The live deployment matches the reviewed build. The landing page answers what the product does, who it serves, and what to click; the one-click demo is active and isolated; all nine registered claim tests pass; and the full test, lint, build, offline, privacy, crawl, metadata, and accessibility checks pass.

One blocking finding remains: SPA Back/Forward navigation restores the route and H1 focus but loses the prior scroll position. Seven minor findings cover the mobile first-screen fact layout/content, an unlisted “safe” README claim, the missing `/camera` sitemap entry, incomplete 404 header navigation, one subjective README adjective, and one jargon-heavy image caption.

## Verification performed

From a clean clone at `d4cde88` in `/tmp/camera-fx-cues-review2-b5xRqI`:

```text
npm test -- --grep @claim:sample-cues          PASS
npm test -- --grep @claim:local-video          PASS
npm test -- --grep @claim:preset-save          PASS
npm test -- --grep @claim:keyboard-cues        PASS
npm test -- --grep @claim:keyboard-operation   PASS
npm test -- --grep @claim:reduced-motion       PASS
npm test -- --grep @claim:no-account           PASS
npm test -- --grep @claim:demo-isolation       PASS
npm test -- --grep @claim:privacy-scope        PASS
npm test                                         17 passed
npm run lint                                     PASS
npm run build                                    PASS
```

Build sizes: 19.07 kB raw / 7.18 kB gzip JavaScript, 12.44 kB raw / 3.55 kB gzip CSS, and 165,736 bytes total in `dist/`.

Live checks used fresh 390×844 and 1440×900 Chromium contexts. They covered cold first read, one-click demo appearance, Reset/Start for real isolation with a seeded real preset, same-origin network interception, offline reload after HTTP-cache clearing, titles/metadata/canonicals, true 404s, link/status crawl, route focus/announcements, Back/Forward scroll, and serious/critical Axe results. The factory URL verifier passed the root. Live and local hashes match for the app shell, 404 HTML/CSS, service worker, touch icon, and hashed JS/CSS.

## Next work

Repair F-2-1 through F-2-8 exactly as specified in `.factory/review-2.md`, then run another complete adversarial review from a fresh browser and clean clone. Do not treat the passing claims or prior polish status as a waiver for the remaining structure and copy findings.
