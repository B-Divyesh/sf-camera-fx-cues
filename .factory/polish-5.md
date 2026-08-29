# Polish round 5 — cumulative finding closure

Polished review candidate `fc4b956ccc0da82d1916bfe45572de18e1a72090` using every review and polish report through review 5. The functional repair is `f3b5a2f9889e411612d1b5117606f168aa42df3b`, pushed to `main` and deployed to [camera-fx-cues.sociobot.in](https://camera-fx-cues.sociobot.in) through the `sf-camera-fx-cues` Azure Static Web App work-order configuration.

Every row below was rechecked in the deployed production build. Screenshot evidence is under `evidence/polish-5/`; full cold-root verification is `evidence/polish-5/verify-live/verify.json`.

| Finding id | Change made or retained | Evidence: test, screenshot, and live URL check |
|---|---|---|
| F-1-1 | Kept the isolated `?demo=1` entry, demo-only storage prefix, Reset demo, Start for real, recognizable game-jam desk signal, and seeded Outline cue. | `one-click query demo opens an active sample above the mobile fold`; `evidence/polish-5/live-demo-mobile.png`; [live demo](https://camera-fx-cues.sociobot.in/?demo=1). |
| F-1-2 | Kept the reduced-motion proof for both Zoom and Shake, including the bounded no-transform observation. | `@claim:reduced-motion warning is present and reduced motion removes movement`; live full suite 24/24; [live demo](https://camera-fx-cues.sociobot.in/?demo=1). |
| F-1-3 | Kept the true standalone 404 metadata, icons, social image, legal footer, Param Factory attribution, version, and touch targets. | `SWA missing routes use a plain-language true 404 that obeys CSP`; `evidence/polish-5/live-404-mobile.png`; [live 404](https://camera-fx-cues.sociobot.in/404.html). |
| F-1-4 | Retained the standalone README heading `What Camera FX Cues does`. | `.factory/copy-audit.md`; clean-clone documentation audit; [live root](https://camera-fx-cues.sociobot.in/). |
| F-1-5 | Retained `sample signal` as the one bundled-input term outside the required `Try it with sample data` CTA. | `@claim:demo-isolation`; `.factory/copy-audit.md`; `evidence/polish-5/live-demo-mobile.png`; [live demo](https://camera-fx-cues.sociobot.in/?demo=1). |
| F-1-6 | Retained the plain first-screen eyebrow `LOCAL CAMERA EFFECTS // NO ACCOUNT`. | `@claim:no-account`; `evidence/polish-5/live-landing-mobile.png`; [live root](https://camera-fx-cues.sociobot.in/). |
| F-2-1 | Retained per-history-entry scroll restoration, destination H1 focus, and route announcement. | `Back and Forward restore route scroll positions while focusing headings`; live full suite 24/24; [live privacy](https://camera-fx-cues.sociobot.in/privacy). |
| F-2-2 | Retained the 96 px mobile art strip and compact rhythm so the CTA explanation and all three facts fit the first 390 × 844 screen. | `landing action explanation and privacy, offline, and price facts fit the first phone screen`; `evidence/polish-5/live-landing-mobile.png`; [live root](https://camera-fx-cues.sociobot.in/). |
| F-2-3 | Retained the three concrete facts: local camera processing, offline reload after first visit, and free/no-account access. | `@claim:local-video`, `@claim:offline-reload`, and `@claim:no-account`; `evidence/polish-5/live-landing-mobile.png`; [live root](https://camera-fx-cues.sociobot.in/). |
| F-2-4 | Retained `bundled sample signal` in README; no ambiguous safety claim remains. | `.factory/copy-audit.md`; clean-clone copy audit; [live demo](https://camera-fx-cues.sociobot.in/?demo=1). |
| F-2-5 | Retained `/camera` in the sitemap and the declared-route equality regression. | `sitemap lists every public application route`; live full suite 24/24; [live sitemap](https://camera-fx-cues.sociobot.in/sitemap.xml). |
| F-2-6 | Retained the 404 header’s Demo and Privacy links plus the full legal footer. | `SWA missing routes use a plain-language true 404 that obeys CSP`; `evidence/polish-5/live-404-mobile.png`; [live 404](https://camera-fx-cues.sociobot.in/404.html). |
| F-2-7 | Retained concrete `keyboard-controlled` README wording and number-key metadata. | `.factory/copy-audit.md`; `@claim:keyboard-cues`; [live root](https://camera-fx-cues.sociobot.in/). |
| F-2-8 | Retained the plain camera-art caption. | `landing action explanation and privacy, offline, and price facts fit the first phone screen`; `evidence/polish-5/live-landing-mobile.png`; [live root](https://camera-fx-cues.sociobot.in/). |
| F-4-1 | Retained `Page not found` wording in standalone and client not-found routes, titles, and social metadata. | `SWA missing routes use a plain-language true 404 that obeys CSP` and `client-side missing routes use the same plain 404 wording`; `evidence/polish-5/live-404-desktop.png`; [live missing route](https://camera-fx-cues.sociobot.in/definitely-missing-polish-5). |
| F-5-1 | Rendered **How it works** only on the landing route and added a route-wide visible same-page fragment crawler. The defensive global `[hidden]` rule prevents style overrides. | `every visible same-page fragment link resolves to an element on its route`; live full suite 24/24; [live demo](https://camera-fx-cues.sociobot.in/demo), [live camera](https://camera-fx-cues.sociobot.in/camera), [live privacy](https://camera-fx-cues.sociobot.in/privacy), and [live terms](https://camera-fx-cues.sociobot.in/terms). |
| C1 | Retained ten unique claim IDs, one exact observable tagged test per ID, and clean-demo sandboxes. | `claims registry gives every claim one exact observable test tag`; all ten individual clean-clone commands passed; [live demo](https://camera-fx-cues.sociobot.in/?demo=1). |
| S1 | Retained the motion and bright-light warning before source actions and in the instrument. | `@claim:reduced-motion warning is present and reduced motion removes movement`; `evidence/polish-5/live-demo-mobile.png`; [live demo](https://camera-fx-cues.sociobot.in/?demo=1). |
| A1 | Retained cold skip-link order, keyboard cue operation, Escape clearing, and SPA/history heading focus. | `@claim:keyboard-operation Tab order, Enter, Escape, and route focus work`; factory verifier; [live privacy](https://camera-fx-cues.sociobot.in/privacy). |
| A2 | Retained at least 44 × 44 CSS px for all visible controls at 390 px. | `all visible controls meet 44 by 44 CSS pixel touch targets at 390px`; `evidence/polish-5/live-demo-mobile.png`; [live 404](https://camera-fx-cues.sociobot.in/404.html). |
| P1 | Retained complete-shell service-worker caching and offline demo reload after the first visit. | `@claim:offline-reload complete shell reloads offline after one visit`; live full suite 24/24; [live demo](https://camera-fx-cues.sociobot.in/?demo=1). |
| R1 | Retained explicit routes, a true response-override 404, external CSP-safe 404 CSS, and correct 404 status. | `SWA missing routes use a plain-language true 404 that obeys CSP`; `evidence/polish-5/live-404-desktop.png`; [live missing route](https://camera-fx-cues.sociobot.in/definitely-missing-polish-5). |
| D1 | Retained bounded Laser, Pixel burst, Zoom, and Shake state reset. | `bounded effects return to ready and clear pressed state`; `@claim:sample-cues`; [live demo](https://camera-fx-cues.sociobot.in/?demo=1). |

## Final evidence

- Clean clone: `/tmp/camera-fx-cues-polish5-Zsti11/clone`, commit `f3b5a2f9889e411612d1b5117606f168aa42df3b`; `npm ci`, all ten individual claim commands, `npm test` (24/24), `npm run lint`, and `npm run build` passed.
- Production: `PLAYWRIGHT_BASE_URL=https://camera-fx-cues.sociobot.in npm test` passed 24/24. The URL verifier recorded zero console errors and title, language, H1, main, alt text, and button-name success in `evidence/polish-5/verify-live/verify.json`.
- Live Lighthouse 12.6.0 mobile: Performance 100, Accessibility 100, Best Practices 100, SEO 100; FCP 0.8 s, LCP 1.1 s, CLS 0, TBT 10 ms in `evidence/polish-5/lighthouse-live.json`.

No finding of any severity remains open.
