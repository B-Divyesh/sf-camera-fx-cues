# Camera FX Cues — polish round 5 handoff

## Result

**PASS.** Repair commit `f3b5a2f9889e411612d1b5117606f168aa42df3b` closes F-5-1: the shared header now renders **How it works** only on the landing route, where `#how` exists. It no longer creates dead fragment links on Demo, Camera, Privacy, Terms, or the app not-found route. A global `[hidden]` safeguard also prevents future presentation rules from reviving hidden elements.

The repair was pushed to `origin/main` and deployed to production with:

```sh
swa deploy dist --app-name sf-camera-fx-cues --resource-group sociobot --env production --no-use-keychain
```

Production hashes confirm the deployed shell and JavaScript are the build from the repair: `index.html` SHA-256 `fec0aeed328a510d73306f5083f6e478941e69d9396cd89b092b21b3c2ff2928`; `assets/index-BBzNUxW-.js` SHA-256 `a75cb26a08df9929809188d36b2e3cf4db5510e527749628a4c6b706876d26d9`.

## Verification

From clean clone `/tmp/camera-fx-cues-polish5-Zsti11/clone` at `f3b5a2f9889e411612d1b5117606f168aa42df3b`:

- `npm ci` passed with 0 vulnerabilities.
- Each of the ten commands in `.factory/claims.json` passed separately: `sample-cues`, `local-video`, `preset-save`, `keyboard-cues`, `keyboard-operation`, `reduced-motion`, `no-account`, `offline-reload`, `demo-isolation`, and `privacy-scope`.
- `npm test` passed 24/24; `npm run lint` and `npm run build` passed.

The final local build writes `dist/`: JavaScript 20,046 bytes raw / 7.46 kB gzip; CSS 13,171 bytes raw / 3.71 kB gzip; complete `dist/` 169,717 bytes.

Cold production verification at [camera-fx-cues.sociobot.in](https://camera-fx-cues.sociobot.in):

- `PLAYWRIGHT_BASE_URL=https://camera-fx-cues.sociobot.in npm test` passed 24/24, including the new visible-fragment crawl, claim flows, demo isolation, offline reload, routing, focus, mobile layout, privacy instrumentation, and Axe serious/critical checks.
- `/opt/fleet/lib/verify-url.sh https://camera-fx-cues.sociobot.in evidence/polish-5/verify-live` passed: HTTP 200, 571 ms cold load, no console errors, title, `lang=en`, one H1, main landmark, image alternatives, and button names all present.
- Lighthouse 12.6.0 mobile report: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.8 s, LCP 1.1 s, CLS 0, TBT 10 ms. Raw report: `evidence/polish-5/lighthouse-live.json`.
- Cold live screenshots: `evidence/polish-5/live-landing-mobile.png`, `evidence/polish-5/live-demo-mobile.png`, `evidence/polish-5/live-404-mobile.png`, and `evidence/polish-5/live-404-desktop.png`.

## Known gaps and next steps

None. No claim, review finding, or minor item is deferred. The only local credential file created by the Static Web Apps CLI was moved outside the repository and was never committed.
