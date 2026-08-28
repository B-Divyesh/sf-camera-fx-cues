# Camera FX Cues

Trigger playful camera effects with keys. It is for game-jam and classroom teams that need clear, local camera cues.

Open the live site at https://camera-fx-cues.sociobot.in or start at `/?demo=1` for the safe sample signal.

## What Camera FX Cues does

- Runs laser, outline, pixel burst, freeze, zoom, and shake cues.
- Uses number keys 1–6 or on-screen cue pads.
- Keeps camera processing in the current browser tab and stops its track when you leave the camera page.
- Saves named cue presets in browser storage on this device.

It does not record, store, or upload camera video. It loads no analytics, advertising, or third-party scripts.

## Run locally

```sh
npm install
npm run dev
```

Open the local URL shown by Vite. Choose **Use your camera** to request local camera access. Choose **Try it with sample data** to run the isolated demo.

## Test and build

```sh
npm test
npm run lint
npm run build
```

The production build is written to `dist/`, with `index.html` at its root. Deploy that directory as an Azure Static Web App. `staticwebapp.config.json` includes explicit app routes, a true 404 response, and security headers.

## Privacy and demo

The demo uses `demo:camera-fx-cues:` browser-storage keys. Resetting the demo clears only those keys. Real presets use `camera-fx-cues:` keys. See [the privacy page](https://camera-fx-cues.sociobot.in/privacy), `.factory/demo.md`, and `.factory/claims.json` for the testable product promises.

## License

MIT. See [LICENSE](LICENSE).
