# Camera FX Cues — polish round 2 handoff

## Result

Polish round 2 is complete. Every finding in `.factory/review-1.md`, `.factory/polish-1.md`, `.factory/review-2.md`, and the earlier verification report has been implemented and rechecked. The finding-by-finding matrix is in `.factory/polish-2.md`. No known product, accessibility, privacy, offline, routing, copy, or deployment gap remains.

The deployed product is [https://camera-fx-cues.sociobot.in](https://camera-fx-cues.sociobot.in). Azure Static Web Apps deployment `b9716be5-dcff-4a01-9445-91f17e1cb40d` completed successfully. Local and live artifacts match by SHA-256.

## What changed

- Back and Forward now restore each route’s saved scroll coordinates and focus the destination H1 without moving the restored viewport.
- The 390×844 first screen now contains the full CTA explanation plus privacy, offline, and free/no-account facts.
- `.factory/claims.json` now registers the offline claim; the free/no-account test exercises all six cues and preset saving. All ten claims have one exact test tag.
- README language, image caption, landing metadata, catalog description, `/camera` sitemap entry, and 404 header navigation now match the review requirements.
- The existing isolated `/?demo=1` sample, camera privacy boundary, warning, reduced-motion behavior, touch targets, true 404, complete offline shell, and bounded cues were retained and re-proven.
- Playwright can now run the same suite against production with `PLAYWRIGHT_BASE_URL=https://camera-fx-cues.sociobot.in npm test`.

## Verification

Final clean clone: `/tmp/camera-fx-cues-polish2-final-jY3mfq` at `c89d568fb5f11350b5402bb4cb37f339f67cdac5`.

```text
npm ci                                                   PASS (0 vulnerabilities)
npm test -- --grep @claim:sample-cues                    PASS
npm test -- --grep @claim:local-video                    PASS
npm test -- --grep @claim:preset-save                    PASS
npm test -- --grep @claim:keyboard-cues                  PASS
npm test -- --grep @claim:keyboard-operation             PASS
npm test -- --grep @claim:reduced-motion                 PASS
npm test -- --grep @claim:no-account                     PASS
npm test -- --grep @claim:offline-reload                 PASS
npm test -- --grep @claim:demo-isolation                 PASS
npm test -- --grep @claim:privacy-scope                  PASS
npm test                                                 PASS (22/22)
npm run lint                                             PASS
npm run build                                            PASS
PLAYWRIGHT_BASE_URL=https://camera-fx-cues.sociobot.in npm test  PASS (22/22)
```

Build output: 20,047-byte raw JavaScript (7.46 KB gzip), 13,139-byte raw CSS (3.70 KB gzip), and 169,646-byte complete `dist/`. This is below the 200 KB JS and 50 KB CSS budgets.

Factory verifier reports are `evidence/polish-2/verify-local/verify.json` and `evidence/polish-2/verify-live/verify.json`; both have zero 200-route console errors and pass title, language, H1, main, image-alt, and button-name checks. The live Playwright JSON is `evidence/polish-2/playwright-live.json`; it records 22 expected passes and zero unexpected, flaky, or skipped tests. Axe found zero serious/critical findings.

Live Lighthouse 12.6.0 mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.8s, LCP 1.1s, CLS 0, TBT 30ms. See `evidence/polish-2/lighthouse-live.json`.

Cold live screenshots:

- `evidence/polish-2/verify-live/screenshot-mobile.png` — landing first screen and complete page
- `evidence/polish-2/live-demo-mobile.png` — isolated active demo
- `evidence/polish-2/live-404-mobile.png` — real 404 with standard navigation and legal footer

## Run and verify

```sh
npm ci
npm test
npm run lint
npm run build
npm run preview
PLAYWRIGHT_BASE_URL=https://camera-fx-cues.sociobot.in npm test
```

Deploy `dist/` as the Azure Static Web App root. The demo verification entry point is `/?demo=1`.

## Known gaps and next steps

None. No finding is deferred.
