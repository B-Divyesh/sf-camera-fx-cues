# Independent product verification 3 — PASS

Verified on 2026-08-29 against candidate commit `b589a151bbd59333e1b6efa6119aabfe452d5927` and the production URL https://camera-fx-cues.sociobot.in.

## Verdict

**PASS.** The live deployment matches the candidate's production output and the product meets the researched brief and release contract. No defects were found. No product code was changed during this verification.

## Mandatory gates run first

The checkout was clean at the tested commit. `node_modules` was absent before `npm ci`; installation completed with 0 reported vulnerabilities.

Every command listed in `.factory/claims.json` was run separately against the product's production-preview demo entry point:

| Claim | Exact command | Result |
|---|---|---|
| `sample-cues` | `npm test -- --grep @claim:sample-cues` | PASS (1 test) |
| `local-video` | `npm test -- --grep @claim:local-video` | PASS (1 test) |
| `preset-save` | `npm test -- --grep @claim:preset-save` | PASS (1 test) |
| `keyboard-cues` | `npm test -- --grep @claim:keyboard-cues` | PASS (1 test) |
| `keyboard-operation` | `npm test -- --grep @claim:keyboard-operation` | PASS (1 test) |
| `reduced-motion` | `npm test -- --grep @claim:reduced-motion` | PASS (1 test) |
| `no-account` | `npm test -- --grep @claim:no-account` | PASS (1 test) |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS (1 test) |
| `demo-isolation` | `npm test -- --grep @claim:demo-isolation` | PASS (1 test) |
| `privacy-scope` | `npm test -- --grep @claim:privacy-scope` | PASS (1 test) |

Cold-opening the live home page returned HTTP 200 with no browser errors. First-read result: it says it **triggers camera effects with keys**, says it is **for game-jam and classroom teams**, and tells the visitor to click **Try it with sample data** first, with the immediate result explained as opening the sample signal without touching real presets. The action opens the isolated sample instrument in one click. This mandatory gate passes.

## Repository and deployment checks

```text
npm ci                                                   PASS (0 vulnerabilities reported)
npm test                                                 PASS (23/23)
npm run lint                                             PASS (tsc --noEmit)
npm run build                                            PASS (dist/ produced)
PLAYWRIGHT_BASE_URL=https://camera-fx-cues.sociobot.in npm test
                                                         PASS (23/23)
```

The live and locally built candidate artifacts had identical SHA-256 values for `index.html`, the hashed JavaScript and CSS bundles, `sw.js`, `404.html`, `sitemap.xml`, `robots.txt`, and all referenced public assets. Candidate `b589a151` only adds documentation/evidence after the product-code repair commit, so this byte match is deployment identity evidence for the candidate.

The exact production build is small: JavaScript 20,053 bytes raw / 7.47 KB gzip, CSS 13,139 bytes raw / 3.70 KB gzip, and hero art 37,028 bytes. It is within the static-product budgets.

## End-to-end, accessibility, privacy, and PWA evidence

- Desktop and 390 × 844 mobile flows passed. The live suite verified all visible controls are at least 44 × 44 CSS px, 200% text does not overflow horizontally, route titles/metadata/landmarks work, and keyboard Tab/Enter/Escape plus Back/Forward work. Visible focus is present.
- Manual live checks exercised the sample signal, all six number-key effects, demo preset save, demo-to-real transition, fake-camera start, and leaving the camera screen. The fake camera made one `getUserMedia` call, reached `CAMERA LOCAL`, and its track changed from `live` to `ended` when navigating to Privacy.
- Permission denial showed “Camera permission was not allowed” and a visible **Use sample signal** recovery action. A blank preset name produced “Name this preset before saving it.” The input enforces `maxlength=28`.
- With `prefers-reduced-motion: reduce`, Zoom had `animation-name: none`. The motion/light warning is visible before use.
- Playwright request logging across landing, demo, camera, six cues, preset save, and route exit recorded **no cross-origin requests**. The fake-camera run made no `MediaRecorder` calls (covered by `privacy-scope`) and stored no camera payload. There are no account, payment, analytics, advertising, third-party script, or sign-in paths. Rate-limit and Entra checks are not applicable: this is an account-free static site with no server-side product API.
- Playwright Axe scans of `/`, `/demo`, `/camera`, `/privacy`, `/terms`, and a real missing route reported **0 serious or critical violations**. Normal-route browser console/page errors were 0.
- The service worker controlled `/demo`; `registration.update()` completed with the active worker remaining `/sw.js`, no waiting worker, and versioned cache `camera-fx-cues-b8fc7c5f761b`. The independently rerun `offline-reload` claim cleared HTTP cache, went offline, reloaded the complete styled demo, and passed.

## Headers, caching, and performance

Live browser/curl response evidence confirms HSTS, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(self), microphone=()`, and a same-origin CSP. HTML routes use `Cache-Control: public, must-revalidate, max-age=30`; hashed assets use `public, max-age=31536000, immutable`. A random missing route returned HTTP 404 with the designed 404 page.

Fresh mobile Lighthouse on the live URL: Performance **97**, Accessibility **100**, Best Practices **100**, SEO **100**; FCP **0.9 s**, LCP **1.1 s**, CLS **0**, TBT **210 ms**, and total transfer **49 KiB**.

## Defects by severity

None found: Critical 0, High 0, Moderate 0, Low 0.

## Scope notes

This is a static web product, not a library, CLI, or backend. Package-consumer, API concurrency/persistence, rate-limit, and Entra sign-in checks are therefore not applicable.
