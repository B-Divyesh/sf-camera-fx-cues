# Independent product verification — FAIL

Verified on 2026-08-28 against candidate `e77927dfb5c91be05a420670e33eabad6233666b` and `https://camera-fx-cues.sociobot.in`.

## Verdict

**FAIL. Do not release this candidate.** The mandatory claim commands and the first-read gate pass, but the candidate has release-blocking defects in claim proof, the researched safety constraint, keyboard/touch accessibility, offline service-worker behavior, and 404 handling.

No product code was changed during verification.

## Mandatory gates run first

The checkout was clean and exactly at the candidate commit before dependency installation. `npm ci` completed with 0 reported vulnerabilities.

Every command listed in `.factory/claims.json` was run separately against the shipped `/demo` or `/` entry point:

| Claim | Exact command | Result |
|---|---|---|
| `sample-cues` | `npm test -- --grep @claim:sample-cues` | PASS, 1 test |
| `local-video` | `npm test -- --grep @claim:local-video` | PASS, 1 test |
| `preset-save` | `npm test -- --grep @claim:preset-save` | PASS, 1 test |
| `keyboard-cues` | `npm test -- --grep @claim:keyboard-cues` | PASS, 1 test |
| `no-account` | `npm test -- --grep @claim:no-account` | PASS, 1 test |

The commands pass, but the claim contract does not: see finding C1 below.

### Cold first-read test

The live first screen answers all three required questions in plain words:

- What it does: triggers camera effects with keys.
- Who it is for: game-jam and classroom teams.
- What to click first: **Try it with sample data**, with adjacent text explaining that it opens a synthetic scene.

The action is one click from the landing page and is fully visible in the first 390 × 844 viewport. It opens `/demo` with the persistent sample-data banner. This gate passes.

## Release-blocking findings

### C1 — Claim tests do not prove advertised claims; unlisted and contradictory claims remain

Severity: **Critical / release blocking**

- `@claim:local-video` opens `/demo`, which uses a synthetic canvas and never calls `getUserMedia`. It therefore cannot prove “Camera video stays in this browser.”
- `@claim:sample-cues` and `@claim:keyboard-cues` assert only the cue name in `#cue-readout`; all visual effects could be broken while both tests still passed.
- `@claim:no-account` checks that there is no form, but the registered claim also says the product is free.
- The live product and README make further unregistered claims: video is never recorded or stored; there is no analytics, advertising, or third-party script; camera access is used only while the page is open; leaving stops the camera; the demo saves nothing.
- “Nothing is saved” is contradicted by the registered `preset-save` claim and observed behavior: demo presets persist in `demo:camera-fx-cues:presets` after reload.

Independent QA did verify a fake-camera session made only same-origin requests and stopped its media track on navigation, but verifier evidence does not repair the required sandbox tests or claims registry.

### S1 — Required photosensitivity/reduced-motion warning is absent

Severity: **High / release blocking**

The researched brief explicitly requires a consent screen and a photosensitivity/reduced-motion warning. Camera permission is requested only after an explicit action, and CSS respects `prefers-reduced-motion`, but no photosensitivity, seizure, flashing, or reduced-motion warning appears on landing, demo, camera, privacy, or terms routes.

### A1 — Initial focus skips the skip link and header navigation

Severity: **High / release blocking**

On cold load, the app programmatically focuses the `<h1>`. Forward Tab order at 390 px was: H1 → Try sample data → camera buttons → footer links → body → skip link → header navigation. The skip link and primary header navigation are therefore unavailable until the user traverses the whole page and wraps around. The focused H1 also receives a visible 3 px control-style outline on initial load.

### A2 — Required 44 px mobile targets are not met

Severity: **High / release blocking**

At 390 × 844, visible controls below the 44 × 44 px factory minimum included:

- wordmark: 149 × 21
- Demo link: 34 × 16
- Privacy header link: 59 × 16
- Reset demo: 94 × 34
- Start for real: 123 × 34
- Back to start: 117 × 15
- footer Privacy: 54 × 20
- footer Terms: 44 × 20

### P1 — Offline reload is a blank page

Severity: **High / release blocking**

The app registers a service worker and caches route HTML, but the install shell omits the hashed JavaScript and CSS. After one online `/demo` visit, waiting for service-worker control, clearing the HTTP cache, switching offline, and reloading:

- navigation returned cached HTTP 200;
- `/assets/index-CItU2YGz.js` failed with `net::ERR_FAILED`;
- `/assets/index-CJelKSnV.css` failed with `net::ERR_FAILED`;
- the page had no H1, no demo banner, and a transparent unstyled body.

The failure reproduces on both the local production preview and live deployment.

### R1 — Missing routes are not real 404s, and the 404 document violates CSP

Severity: **High / release blocking**

`GET /definitely-missing` returns HTTP 200 through the SPA fallback, not 404. `staticwebapp.config.json` has no 404 `responseOverrides` entry. Direct `/404.html` also returns 200, and its inline `<style>` is blocked by the deployed `style-src 'self'` CSP, producing a console error and leaving the page unstyled.

## Other finding

### D1 — Effect state conflicts with the recorded motion policy

Severity: **Moderate**

`.factory/design.md` says laser, pixels, zoom, and shake are bounded 160–500 ms effects. Laser remained active and visible after 1,100 ms. Zoom returned visually to its neutral transform but stayed `aria-pressed="true"` with the readout still saying `ZOOM` after 1,100 ms. Pixel and shake correctly cleared themselves.

## Passing evidence

### Build and repository gates

- `npm test`: PASS, 7/7 Playwright tests.
- `npm run build`: PASS; runs `tsc --noEmit` and Vite production build.
- No separate lint script exists.
- Output: HTML 1.62 KB, JavaScript 17.34 KB raw / 6.62 KB gzip, CSS 10.37 KB raw / 3.19 KB gzip.
- Initial live transfer measured by Lighthouse: 48 KiB. Hero: 37,028 bytes. No font download.

### End-to-end behavior

- All six cue controls and number keys worked; visual checks confirmed laser overlay, outline and pixel canvas changes, freeze holding and resuming, plus zoom/shake animation.
- Escape clears the active cue; pixel and shake auto-clear.
- Camera denial shows a specific recovery panel and starts the sample signal.
- A fake-camera live run reached `CAMERA LOCAL`, had one live video track, and changed it to `ended` after returning to landing.
- Empty/whitespace preset names are rejected; names cap at 28 characters; HTML-like names render as text; the list caps at eight.
- Demo reset removed only `demo:camera-fx-cues:*`, preserving real and unrelated local storage.
- Browser Back restored `/demo`; SPA route changes focused the new H1.
- Unknown routes render the designed in-app missing-page content, despite the incorrect HTTP status.
- 390 px layouts and 200% text had no horizontal overflow.
- Reduced-motion emulation disabled zoom and shake animation.

### Accessibility and browser quality

- Axe found 0 serious/critical findings on `/`, `/demo`, `/privacy`, `/terms`, and the in-app missing route at desktop; the shipped suite also covers landing/demo.
- Visible focus uses a 3 px amber outline.
- No console or page errors occurred in exercised landing, demo, privacy, terms, camera-success, or camera-failure flows. `/404.html` is the exception described in R1.
- Semantic checks passed for `lang`, title, one H1, main landmark, labels, alt text, and route-specific titles.

### Privacy, network, and deployment identity

- Landing and demo requested only same-origin HTML, hashed JS/CSS, and the hero image.
- The fake-camera live flow, all six cues, preset save, and route exit made no cross-origin requests.
- No analytics, advertising, CDN font/script, AI gateway, sign-in, payment, unlock, or other API endpoint was found.
- Rate-limit testing is not applicable: this static product exposes no server-side product endpoint.
- Entra sign-in validation is not applicable: the product requires no sign-in.
- Library/CLI consumer-pack testing is not applicable.

The deployment matches the candidate build byte-for-byte:

| Artifact | Candidate SHA-256 | Live SHA-256 |
|---|---|---|
| `index.html` | `c6f91e3c4a2ca0274dbd0a76f0444a396c61da212d644527fb7d623ff0d50ccb` | same |
| `index-CItU2YGz.js` | `a9d28b52408cfbd9b4d4c775895d2c537df6aa20b7ed98f6b09a27b091bfa27b` | same |
| `index-CJelKSnV.css` | `7e41f4baa77afb37f09b661532760de48dee260aaa540757622942de65aa9cbc` | same |

### Headers, caching, and performance

- Live HTML/routes: `Cache-Control: public, must-revalidate, max-age=30`.
- Hashed assets: `Cache-Control: public, max-age=31536000, immutable`.
- Present: HSTS, CSP, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and camera/microphone `Permissions-Policy`.
- The CSP matches normal app resources and generated no normal-route violations.
- Lighthouse 12.6.0 mobile at 2026-08-28T13:41:04Z: Performance 94, Accessibility 100, Best Practices 100, SEO 100; FCP 0.9 s, LCP 1.2 s, CLS 0, Speed Index 0.9 s, TBT 290 ms.
- Event Timing across six cue clicks and preset save measured a worst interaction of 80 ms, below the 200 ms interaction budget.

## Required remediation before re-verification

1. Make every public claim registered and directly test its observable outcome; camera privacy must use a fake camera and network interception. Resolve the demo-saving contradiction.
2. Add the brief-required photosensitivity/reduced-motion warning before effects start.
3. Do not focus the H1 on initial load; preserve first-Tab access to the skip link and header. Enlarge all mobile targets to at least 44 × 44 px.
4. Precache the complete versioned shell, including hashed JS/CSS, and prove first-visit offline reload.
5. Configure a true HTTP 404 response and move 404 styling to a CSP-allowed external stylesheet.
6. Reconcile laser/zoom state with the documented bounded motion policy.
