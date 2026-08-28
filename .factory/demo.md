# Demo sandbox

Open `/?demo=1` or use **Try it with sample data**. It starts on a bundled game-jam desk sample signal with Outline active and all six cue controls ready. The persistent demo banner provides **Reset demo** and **Start for real**. Demo presets use `localStorage` keys starting with `demo:camera-fx-cues:`. **Reset demo** clears only that prefix and restores the outlined sample signal. **Start for real** clears the demo prefix and opens the camera screen. Real presets use the separate `camera-fx-cues:` prefix and are never read or changed in demo mode. `/demo` remains a canonical route to the same isolated sample signal.

No camera image, photo, or video is stored in either mode.
