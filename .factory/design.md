# Camera FX Cues visual thesis

## Direction

Pixel/demoscene control room. This is an instrument for a game jam, not a social camera. The interface looks like a compact CRT scene: scanline texture, hard 1px edges, cue pads, and an electric camera viewport. It makes explicit cues feel physical and legible under pressure.

## Tokens

| Token | Value | Use |
|---|---|---|
| Void | `#080a18` | page and camera surround |
| Ink | `#f7f4e9` | primary text |
| Signal | `#50f5d0` | focus, laser, main action |
| Hot | `#ff4f87` | destructive or energetic cue |
| Ultraviolet | `#7871ff` | secondary cue / depth |
| Amber | `#ffd166` | warning / pixel burst |
| Panel | `#141936` | controls |
| Quiet | `#b6bad2` | secondary text |

The product is deliberately dark-only: camera footage and bright effect colours need a stable black field. All body text uses Ink or Quiet at accessible contrast.

## Type and spacing

Display text is a local monospace stack (`ui-monospace`, `SFMono-Regular`, `Consolas`) used with broad tracking, like a debug overlay. Body text uses the local system UI stack for clear small instructions. The spacing unit is 8px; the scene uses 8, 16, 24, 32, 48 and 72px gaps. Hard square corners and inset highlights replace generic rounded cards.

## Interaction and motion

Cue pads light immediately from the key that triggered them. Laser, pixels, zoom and shake are short, bounded 160–500ms effects; freeze stays until released. The active cue is always named in a live status region. With reduced motion, shake and zoom stop moving, the pixel burst becomes a still pattern, and no animation loops.

## Original asset plan and provenance

The hero is one generated, abstract 16-bit camera-control scene, used as a decorative scene plate and social card source. Prompt: “Use case: stylized-concept. Asset type: landing scene plate. Primary request: abstract pixel-art demoscene control room with a glowing camera lens, scanline monitor, cyan laser beams and amber pixels. Scene/backdrop: deep navy black CRT room. Style/medium: original 16-bit inspired pixel illustration, crisp square clusters, no people. Composition/framing: wide horizontal view with quiet dark space. Lighting/mood: electric cyan and magenta rim light. Color palette: navy, cyan, hot pink, amber, ivory. Constraints: no text, no letters, no logos, no watermark, no brands.” Generated with the factory image deployment on 2026-08-28; original product asset. The favicons and effect marks are hand-authored SVG/CSS.
