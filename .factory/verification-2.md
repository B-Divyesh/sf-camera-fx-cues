# Independent product verification — PASS

Verified on 2026-08-28 against candidate commit `6e5d726ea9c0f62c0546261d860cfc79a774aaaa` and production URL `https://camera-fx-cues.sociobot.in`.

## Verdict

**PASS.** The candidate meets the researched brief and release contract. No Critical, High, Moderate, or Low defects were found. No product code was changed.

## Required gates

`npm ci` passed (23 packages; 0 vulnerabilities). Every `.factory/claims.json` command was run serially with `CI=1` against the production-preview demo entry point and passed:

| Claim | Result |
|---|---|
| `@claim:sample-cues` | PASS |
| `@claim:local-video` | PASS |
| `@claim:preset-save` | PASS |
| `@claim:keyboard-cues` | PASS |
| `@claim:keyboard-operation` | PASS |
| `@claim:reduced-motion` | PASS |
| `@claim:no-account` | PASS |
| `@claim:demo-isolation` | PASS |
| `@claim:privacy-scope` | PASS |

`npm test` passed all 15 Playwright tests. `npm run lint` (`tsc --noEmit`) and `npm run build` passed.

## First-read and end-to-end evidence

The live first screen says it **triggers camera effects with keys**, names **game-jam and classroom teams**, and visibly offers **Try it with sample data** with “Opens a synthetic scene. Your real presets stay untouched.” The one-click `/demo` gate passes.

- Desktop and 390 × 844 mobile: landing, demo, live camera, privacy, terms, and 404 exercised; no horizontal overflow and no visible control below 44 × 44 CSS px.
- All six effects rendered from buttons and number keys; Escape cleared; bounded effects reset; freeze held its frame.
- Whitespace preset input yields “Name this preset before saving it.” Input caps at 28 chars, HTML-like text is escaped, and presets cap at eight.
- A fake camera stayed local (no cross-origin requests, no `MediaRecorder`), began only after explicit action, and its live track became `ended` after navigation. Simulated denial showed recovery and the sample signal.
- Demo cleanup preserves real `camera-fx-cues:` data while clearing only `demo:camera-fx-cues:` data. Reduced motion removes zoom/shake animation. Service-worker update completed; clearing HTTP cache and reloading offline retained the complete styled `/demo` without failed requests.

## Accessibility, deployment, and performance

- `/opt/fleet/lib/verify-url.sh` passed locally and live (title, lang, H1, main, alt text, labeled controls, no console/page errors). Evidence: `/tmp/camera-verify-local-2/verify.json`, `/tmp/camera-verify-live/verify.json`.
- Live Playwright Axe scans on `/`, `/demo`, `/privacy`, `/terms`, `/404.html`: **0 serious/critical** findings. True 404 paths return HTTP 404.
- No analytics, ads, third-party scripts/fonts, sign-in, payment, AI, or product API calls. Rate limiting and Entra checks are not applicable to this account-free static product.
- HSTS, CSP, nosniff, strict-origin referrer policy, camera/microphone permissions policy, expected HTML and immutable-asset caching all present live.
- Local/live SHA-256 matched for HTML, JS, CSS, service worker, and 404 document. Build: JS 17,929 bytes raw / 6,812 gzip; CSS 11,451 raw / 3,382 gzip; `dist` 155,131 bytes.
- Lighthouse 12.6.0 mobile live: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.8 s, LCP 1.1 s, CLS 0, TBT 70 ms.

## Defects by severity

None found.
