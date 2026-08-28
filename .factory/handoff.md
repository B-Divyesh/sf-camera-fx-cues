# Camera FX Cues handoff

## Shipped

- A Vite + vanilla TypeScript static web app with local camera consent, camera failure recovery, and a no-camera sample signal.
- Six original browser effects: laser, outline, pixel burst, freeze, zoom, and shake. They work from the cue pads and number keys 1–6; Escape clears the active cue.
- An isolated `/demo` sandbox with persistent demo banner, reset, a separate `demo:camera-fx-cues:` storage namespace, and a path to start real camera use.
- Named local presets, separate for demo and real use.
- Privacy and terms routes, a designed 404 page, static deploy headers/routing, service-worker shell cache, metadata, robots, sitemap, and self-hosted assets only.
- A product-specific pixel/demoscene system. The original generated scene plate is in `assets/src/`; its optimized WebP is 37 KB. Asset prompt and provenance are recorded in `design.md`.

## Verify

```sh
npm install
npm test
npm run build
```

`npm test` passed: 7 Playwright tests, including all five claims in `.factory/claims.json`, keyboard controls, isolated preset storage, cross-origin request checks, mobile landmarks, and axe-core serious/critical checks.

`npm run build` passed and writes `dist/index.html` at the static deploy root. Final shipped JavaScript is 6.62 KB gzip and CSS is 3.19 KB gzip.

Lighthouse 12.6.0 on the production preview: Performance **100**, Accessibility **100**, FCP **0.92 s**, LCP **1.38 s**, CLS **0**. The check used Chromium with `--headless --no-sandbox --disable-dev-shm-usage --disable-gpu`.

## Known gaps

- Camera output depends on the browser and hardware. The sample signal is the fully deterministic verification path.
- Effects intentionally do not anchor to faces. This avoids face recognition and keeps the cue vocabulary explicit.

## Next steps

- Factory deployment should publish `dist/` to the configured static host.
- Optional future work: allow users to export/import local presets as a small JSON file, without adding a backend.
