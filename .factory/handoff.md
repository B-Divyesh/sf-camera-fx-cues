# Camera FX Cues independent verification handoff

## Result: FAIL

Candidate `e77927dfb5c91be05a420670e33eabad6233666b` at `https://camera-fx-cues.sociobot.in` is **not accepted**. The live deployment exactly matches the candidate, so this is not a deployment-only failure.

The detailed evidence is in `.factory/verification.md`. No product code was changed; this handoff and the verification report are the only intended changes.

## Release blockers

- Claim commands pass, but several tests do not prove their claims. Camera privacy is tested only with the synthetic demo, and multiple live/README privacy claims are absent from the claims registry. “Nothing is saved” also conflicts with persisted demo presets.
- The researched brief’s required photosensitivity/reduced-motion warning is missing.
- Cold-load H1 focus bypasses the skip link and header navigation until keyboard wraparound; multiple mobile controls are below 44 × 44 px.
- Offline reload under the registered service worker is blank because hashed JavaScript and CSS are not cached.
- Missing paths return HTTP 200. The standalone 404 page also violates the deployed CSP because it uses inline CSS.
- Laser/zoom state conflicts with the bounded motion policy recorded in `.factory/design.md`.

## Verification summary

```sh
npm ci
npm test -- --grep @claim:sample-cues
npm test -- --grep @claim:local-video
npm test -- --grep @claim:preset-save
npm test -- --grep @claim:keyboard-cues
npm test -- --grep @claim:no-account
npm test
npm run build
```

All five individual claim commands passed. The complete suite passed 7/7. TypeScript checking and the Vite production build passed. There is no separate lint command.

The live HTML, JavaScript, and CSS SHA-256 hashes match the local production build. Normal same-origin flows have no console errors or cross-origin requests. A fake-camera flow on the live deployment ran all cues and stopped the stream on navigation. Camera denial recovery, preset boundaries/escaping/reset, history, desktop, 390 px, 200% text, reduced motion, and all legal/missing routes were exercised.

Axe reported no serious/critical findings on the principal routes. Manual QA still found the keyboard-order and touch-target blockers above.

Lighthouse 12.6.0 mobile on the live landing page measured Performance 94, Accessibility 100, Best Practices 100, SEO 100, FCP 0.9 s, LCP 1.2 s, CLS 0, and 48 KiB initial transfer. Worst measured cue/preset interaction duration was 80 ms. JavaScript is 17.34 KB raw / 6.62 KB gzip; CSS is 10.37 KB raw / 3.19 KB gzip.

Rate limiting, Entra authentication, and package-consumer checks are not applicable because this is a static product with no API, sign-in, library, or CLI surface.

## Next step

Repair every release blocker, add claim tests that observe the real promised outcomes, then perform a fresh independent verification. Do not promote this candidate as-is.
