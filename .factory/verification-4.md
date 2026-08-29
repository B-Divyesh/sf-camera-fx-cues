# Independent product verification 4 — PASS

Verified on 2026-08-29 from clean checkout commit `51616a5418c756a25763c90033031529d26658b6` against [https://camera-fx-cues.sociobot.in](https://camera-fx-cues.sociobot.in).

## Verdict

**PASS — release candidate accepted.** No release-blocking defects were found. No product code was changed during this verification.

## Mandatory first gates

`npm ci` completed successfully. Every command listed in `.factory/claims.json` completed successfully against the shipped Playwright demo entry point:

| Claim | Exact command | Result |
|---|---|---|
| `sample-cues` | `npm test -- --grep @claim:sample-cues` | PASS |
| `local-video` | `npm test -- --grep @claim:local-video` | PASS |
| `preset-save` | `npm test -- --grep @claim:preset-save` | PASS |
| `keyboard-cues` | `npm test -- --grep @claim:keyboard-cues` | PASS |
| `keyboard-operation` | `npm test -- --grep @claim:keyboard-operation` | PASS |
| `reduced-motion` | `npm test -- --grep @claim:reduced-motion` | PASS |
| `no-account` | `npm test -- --grep @claim:no-account` | PASS |
| `offline-reload` | `npm test -- --grep @claim:offline-reload` | PASS |
| `demo-isolation` | `npm test -- --grep @claim:demo-isolation` | PASS |
| `privacy-scope` | `npm test -- --grep @claim:privacy-scope` | PASS |

Cold first read passes: “Trigger camera effects with keys” says the job; the following sentence names game-jam and classroom teams; and the visible **Try it with sample data** action says it opens the sample signal. One click opens the active bundled sample and persistent demo banner.

## Repository and build gates

- `npm test`: PASS, 24/24 Playwright tests.
- `npm run lint`: PASS (`tsc --noEmit`).
- `npm run build`: PASS and creates `dist/`.
- Build output: JS 20,046 bytes raw / 7,430 bytes gzip; CSS 13,171 bytes raw / 3,715 bytes gzip; complete `dist/` 169,717 bytes. This is within the static-product budgets.
- README, MIT LICENSE, demo documentation, privacy, terms, sitemap, robots, and a true 404 are present.

## Independent functional QA

- Desktop and 390 × 844 mobile: the one-click demo opens an active instrument; all six cue buttons and number keys work; Escape clears; Tab/Enter works; the skip link is first in Tab order; all visible mobile controls meet 44 px; and 200% text does not overflow horizontally.
- Reduced-motion emulation removes zoom and shake movement. The motion/light warning is shown before source selection and in the instrument.
- A fake-camera run reached `CAMERA LOCAL`, rendered non-empty frames, made no cross-origin request, and its video track became `ended` after navigation to Privacy. A denied/unavailable camera displays a concrete recovery panel with retry and sample-signal actions and no console error.
- Whitespace-only presets show a recovery message; hostile HTML-like text is displayed literally; and saving ten presets leaves the documented maximum of eight. Demo reset/start-for-real clear only `demo:camera-fx-cues:` data and retain real presets.
- The live privacy request log for demo and fake-camera flows contained only same-origin requests. No recorder, analytics, advertising, third-party script, account, payment, API, or sign-in path was found. Rate-limit and Entra checks are not applicable to this fully static no-sign-in product.
- PWA: after first demo visit, active cache `camera-fx-cues-fec0aeed328a` contained routes and the current hashed JS/CSS; `registration.update()` left an active controller; after offline reload, the styled demo, banner, and controls remained usable.

## Live deployment and quality

- Candidate/local/live SHA-256 match: HTML `fec0aeed328a510d73306f5083f6e478941e69d9396cd89b092b21b3c2ff2928`; JS `a75cb26a08df9929809188d36b2e3cf4db5510e527749628a4c6b706876d26d9`; CSS `e1bf9a130d963b1559c55671d4be6973e281f1fb7e974ba07fe18b07cc049d2d`.
- Live HTML sends CSP, HSTS, `nosniff`, strict-origin referrer policy, and `camera=(self), microphone=()` permissions policy. HTML caches for 30 seconds; hashed JS/CSS cache for one year immutable. Unknown-route `GET /definitely-missing` is a real HTTP 404 with the designed 404 page.
- `/opt/fleet/lib/verify-url.sh` passed: 200, 609 ms, no console errors, title, `lang=en`, one H1, main landmark, no missing image alternatives, and no unnamed buttons. Evidence: `/tmp/camera-fx-verify-live-51616a/verify.json`.
- Independent live Playwright axe scan of `/?demo=1` found zero serious or critical violations; console/page errors were zero for landing, demo, live camera, Privacy, and camera-recovery flows.
- Lighthouse 13.4.1 mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 1.0 s, LCP 1.1 s, TBT 0 ms, CLS 0. Raw report: `/tmp/camera-fx-lighthouse-51616a.json`.

## Defects

None found. No known gaps or follow-up repair is required.
