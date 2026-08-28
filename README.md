# Camera FX Cues

Trigger playful camera effects with keys. It is for game-jam and classroom teams who need a small, local effects instrument.

Open the live site at https://camera-fx-cues.sociobot.in or start at `/demo` for the safe sample scene.

## What it does

- Runs laser, outline, pixel burst, freeze, zoom, and shake cues.
- Uses number keys 1–6 or on-screen cue pads.
- Keeps camera processing in the current browser tab.
- Saves named cue presets in browser storage on this device.

It does not record video, identify faces, upload video, or provide social filters.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL shown by Vite. Choose **Use your camera** to request local camera access. Choose **Try it with sample data** to run the isolated demo.

## Test and build

```sh
npm test
npm run build
```

The production build is written to `dist/`, with `index.html` at its root. Deploy that directory as an Azure Static Web App. `staticwebapp.config.json` includes SPA fallback and security headers.

## Privacy and demo

The demo uses `demo:camera-fx-cues:` browser-storage keys. Resetting the demo clears only those keys. Real presets use `camera-fx-cues:` keys. See [the privacy page](https://camera-fx-cues.sociobot.in/privacy), `.factory/demo.md`, and `.factory/claims.json` for the testable product promises.

## License

MIT. See [LICENSE](LICENSE).
