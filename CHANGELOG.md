# Changelog

All notable changes to flowme are documented here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## v1.0.3-debug — 2026-04-26

**Diagnostic prerelease. Not a normal release.** Install this build only if you are helping debug the v1.0.2 "no animation / wrong colours" report. No rendering logic was changed — only extensive `console.warn` instrumentation prefixed `[FlowMe]` and `[FlowMe Renderer]` was added so we can see the runtime values of every relevant code path.

### Added

- `src/debug-log.ts` — single `dlog()` channel so every diagnostic message is greppable by the `[FlowMe]` tag in the Home Assistant browser console.
- `setConfig()` dumps the full validated config and a flow/node/overlay summary.
- The `hass` property setter now logs (a) the hardcoded watch-list of the user's five solar/grid/battery/load sensors and (b) every flow-entity value resolved from `hass.states`.
- `willUpdate` logs each `updateFlow(flowId, entity, raw, parsed)` call as values are pushed to the renderer.
- `firstUpdated` schedules three timed inspections: `t+0ms` shadow root + `<svg>` presence, `t+2000ms` first `animateMotion` element with its `dur` and `<mpath href>` resolution check, `t+3000ms` a 2 KB slice of the full shadow DOM HTML.
- `createRenderer` logs the chosen renderer class, whether `?flowme_renderer=` was set, whether `CSS.paintWorklet` is available, and whether both Houdini prerequisites (`paintWorklet` + `registerProperty`) are present.
- `SvgRenderer.init` logs the incoming config, the container bounding rect, and which kind of root (`ShadowRoot` vs `Document`) the `<svg>` was appended to.
- `SvgRenderer.buildSkeleton` logs every flow-group append with `pathId`, the resolved `d` attribute, the shape, and a 200-char slice of the group's `outerHTML`.
- `SvgRenderer.applyFlow` logs the computed `visible` decision (value / magnitude / threshold) and, when visible, the resolved `domain`, `shape`, raw speed-curve output, dur ms, direction, and final colour (including all colour-source candidates so we can see which one "won").
- `SvgRenderer.applyParticles` logs the first particle's installed `animateMotion` dur, mpath target, and a slice of its outerHTML, then a summary `SVG flow created` line with path `d` and particle count.
- `renderOverlayHost` logs each overlay's type, id, entity, position, size, and current entity state.

### Workflow

- `.github/workflows/release.yml` now auto-detects hyphenated tags (e.g. `v1.0.3-debug`) and publishes them as GitHub prereleases so they don't appear as the default install in HACS.

### Next step

After installing this build, reload the dashboard with DevTools open, filter the console by `[FlowMe]`, and share the full output. The log points above are designed to pinpoint exactly one of: wrong renderer chosen, entity values not reaching the card, `applyFlow` hidden by threshold, `<animateMotion dur="...">` not updated, or `<mpath href="#flowme-path-*">` failing to resolve inside the shadow root. The next build (`v1.0.4`) will contain the actual fix.

## [1.0.2] — 2026-04-26

Second bugfix after first real-world dashboard deploy.

### Fixed

- **No animation on flow lines** — the renderer factory now defaults to the SVG renderer. In Home Assistant's Chromium embed the paint-worklet API is reported as supported but CSP / blob-URL handling often silently blocks the painter from ever registering, leaving flows completely invisible with no console error. SVG + `animateMotion` renders the same shapes reliably everywhere. The Houdini renderer stays available behind `?flowme_renderer=houdini`, and the card now catches renderer-init failures and automatically falls back to SVG instead of crashing.
- **Energy `visibility_threshold` lowered from 10 W → 1 W** — a single LED bulb (2 W) or a router (6 W) now animates a visible flow at idle. Users can still raise this per-flow via `threshold:` in YAML.
- **All nodes rendering the same default colour** — a node with no explicit `color:` now inherits the `color_positive` of any flow that starts or ends at it. Set `color_positive` on your solar / grid / battery / load flows and the connected nodes pick the matching hue automatically.
- **Doubled unit of measurement ("1 W W")** — node value text now uses the sensor's own `unit_of_measurement` attribute when present and never appends the profile `unit_label` on top of a unit the sensor already reported. Falls back to `profile.describe()` when the sensor has no unit attribute.

### Added

- **`?flowme_debug=1` URL parameter** — forces every flow to animate at a fixed 2 s regardless of value, bypassing `speed_curve` and `visibility_threshold`, and logs each `updateFlow`/`applyFlow` step in the console. Pointed-and-shootable debugger for "why isn't my flow moving" symptoms; described under Troubleshooting in the README.
- **Camera overlay auto-refresh** — the camera snapshot now refreshes every 10 s via a cache-busted URL, driven by a timer that only runs when at least one camera overlay is present.
- **Camera offline placeholder** — when the camera entity is missing, `unavailable`, `unknown`, or has no `entity_picture`, the overlay now renders a grey box with a camera-glyph SVG instead of a half-blank tile.
- **Switch overlay touch targets** — switch overlays now have a 44 × 44 px minimum touch target regardless of configured size percentages, matching the WCAG / iOS HIG guidance. `.is-on` / `.is-off` now also show a subtle green/red inset ring for instant at-a-glance state feedback.
- **Renderer diagnostic log** — the card now logs `[flowme] using <svg|houdini> renderer` on init, plus `[flowme] renderer init failed — falling back to SVG` when the Houdini path rejects.

### Tests

- +2 cases for doubled-unit fix and camera offline placeholder (now 131 tests, all green).

## [1.0.1] — 2026-04-26

First bugfix based on feedback from initial HA deploy.

### Fixed

- **HA Sections-view "does not fully support resizing" warning** — `flowme-card` now implements both `getLayoutOptions()` and `getGridOptions()` returning sensible grid bounds derived from the configured `aspect_ratio`. `getCardSize()` was also tightened to match the card's actual aspect rather than always returning 5.
- **Flows now support a straight line from source to sink** — `flow.waypoints` is optional in YAML. Omit it entirely for a straight line; the validator normalises `undefined` → `[]` and the renderer already handled two-point paths.
- **`background.default` is optional** — omit it (or set `""`) and the card renders with a neutral placeholder. The stub config returned from `getStubConfig()` now ships with an empty background so the card works immediately after adding it to a dashboard, without the user first having to copy any image into `/config/www/flowme/`.
- **Silent "no flow visible" state** — the card now logs a clear `[flowme]` console warning (once per flow/entity pair) when a flow's entity is missing from `hass.states` or is in the `unavailable` / `unknown` state. This makes it obvious why a flow isn't animating.

### Changed

- **Editor entity inputs → `<ha-entity-picker>`** — every entity field in the visual editor (node entity, flow entity, overlay entity, weather entity) now uses HA's native entity picker with a domain filter:
  - Node entity: `sensor`, `binary_sensor`, `input_number`, `number`
  - Flow entity: `sensor`, `input_number`, `number`
  - Overlay entity: filtered by overlay type (switches get `switch/light/input_boolean/fan/cover`, sensors get `sensor/binary_sensor/input_number/number`, cameras get `camera`, buttons get `script/automation/button/input_button`)
  - Weather entity: `weather` only
  - Falls back to a plain `<input>` with a `<datalist>` of matching entities on HA versions where `ha-entity-picker` hasn't registered yet.
- **Flow inspector now lets you edit the flow's entity** — it used to display it read-only.

### Tests

- Added cases for waypoints-optional, background-optional, and the new `getLayoutOptions` / `getGridOptions` surface.

## [1.0.0] — 2026-04-26

First stable release. All six domain profiles, full editor, auto-routing, weather backgrounds, interactive overlays — plus the test suite, docs and release tooling required for public distribution.

### Added

- **Test suite** — 125 unit + smoke tests across 8 files, running in Vitest + happy-dom:
  - `utils.test.ts` — clamp, lerp, percent/pixel conversion, path length, progress sampling, SVG path building, sensor value parsing, debounce (including cancel), aspect-ratio parsing.
  - `flow-profiles.test.ts` — spec-exact speed curves + describe formatting for all six domain profiles (energy, water, network, HVAC, gas, generic) including their clamping, `getProfile()` domain dispatch.
  - `pathfinding.test.ts` — `buildCostGrid` (edge-to-cost mapping + min-cost clamp + OOB behaviour), `findPath` (uniform grid straight line, start===end, OOB endpoints, cheap-corridor preference, turn-penalty straight-line tie break), `simplifyCollinear` (empty/short paths, straight run collapse, L-shape elbow preservation, zig-zag preservation).
  - `undo-stack.test.ts` — push / undo / redo / no-op when prev===next / redo-clears-on-new-push / 100-deep cap / no-op on empty stacks / clear + fan-out to multiple subscribers.
  - `url-scan.test.ts` — every disallowed scheme (`javascript:`, `vbscript:`, `data:`, `file:`), case-insensitive prefix match, recursive array walk, recursive nested-object walk, cycle safety via `WeakSet`, clean-config happy path, `assertSafeCardConfig` throw behaviour.
  - `validate-config.test.ts` — happy paths for minimal + full configs + full-overlay configs, failure branches for: non-object root, wrong `type`, unknown domain, missing nodes, duplicate node/overlay ids, out-of-range positions, flows pointing at unknown nodes, `speed_multiplier` out of range, bad `aspect_ratio`, disallowed URL prefixes, every overlay-schema rule (unknown type, missing entity, card_config only on custom, unsafe URL scheme inside card_config, bad `size`, unknown `tap_action`).
  - `editor-commands.test.ts` — clamp/snap helpers, id generators, node move/add/delete (with cascade to flows), label set/clear, flow add/delete, waypoint insert clamp/move/delete, every overlay command (add/move/delete/setSize/setType/setEntity/setLabel/setTapAction/setCardConfig), background + weather commands (setDefault, transition duration, setWeatherStateImage, deleteWeatherState, renameWeatherState).
  - `flowme-card.smoke.test.ts` — registers the custom element, mounts in happy-dom with a stub hass, asserts the shadow DOM contains the expected structure, asserts validation errors surface cleanly, verifies static `getConfigElement()` / `getStubConfig()` return valid values.
- **Release workflow** `.github/workflows/release.yml`. Triggered on any `v*` tag push:
  - Runs lint + type-check + type-check:tests + vitest + build.
  - Verifies the tag version matches `package.json` AND `CARD_VERSION` in `src/flowme-card.ts`.
  - Computes SHA-256 checksums for the built bundle and source map.
  - Extracts the matching CHANGELOG section and publishes a GitHub Release with the bundle, source map, and checksum files attached.
- **CI upgrade** — `ci.yml` now additionally type-checks the test directory and runs the full test suite on every push and PR.
- **Full README** — complete config reference (top-level, `Background`, `Node`, `Flow`, `Overlay`), per-domain YAML examples for all six domains, security model explanation, troubleshooting section covering invalid configs, CORS-tainted canvas on `Suggest path`, stalled animations, HACS compatibility errors.
- **TESTING.md** — manual pre-release checklist covering automated baseline, visual smoke test in a real HA instance, renderer selection, editor UX, HACS install flow, release integrity, security sanity.
- **HACS.md** — submission checklist for the default-repository PR.
- **Minimum HA version** `"2024.1.0"` declared in `hacs.json`. Tested on 2026.4.x.
- **`npm run check`** one-shot script: `lint → type-check → type-check:tests → test → build`.
- **`npm run test:coverage`** using `@vitest/coverage-v8`.
- **Dev-dep security** bumped to patched versions: vitest 2.1.9, @vitest/coverage-v8 2.1.9, vite 5.4.21, happy-dom 20.9.0. All critical CVEs resolved; remaining esbuild dev-server moderate only affects `vite` dev-server (we use `vite build` in CI).

### Changed

- Version bumped to **1.0.0** in `package.json` and `CARD_VERSION` banner.
- README's "Status" line rewritten to reflect v1.0.0 scope and supported HA versions.

### Removed

- Nothing — v1.0.0 is strictly additive over v0.5.0.

### Deferred to v1.1+

- HVAC temperature-gradient colour interpolation (still waiting on the secondary-entity schema).
- Editor multi-select + **"Suggest path from exactly two selected nodes"**.
- Real-browser end-to-end tests via Playwright (the happy-dom smoke test covers the critical register/mount/error-surface flow; Playwright tracked for a later minor).
- Ripple / toast / keyboard activation feedback on overlay taps.
- Standalone `npm run dev` demo page with a mock `hass`.
- Full screenshot set for the HACS submission (user-supplied content).

### Post-release policy

From v1.0.0 onward, `main` is protected: all changes land via PR. The direct-to-`main` workflow used during phases 1–5 is retired.

---

## [0.5.0] — 2026-04-26

### Added

- **Interactive overlays over the background** for all five spec-defined types:
  - `sensor` — chip showing entity state and unit; tap opens HA's more-info dialog.
  - `switch` — animated track + thumb reflecting `on`/`off`; tap calls `homeassistant.toggle`.
  - `button` — plain label chip; tap toggles the bound entity or fires the configured action.
  - `camera` — renders the entity's `entity_picture` attribute as a live thumbnail; tap opens more-info.
  - `custom` — mounts an arbitrary Lovelace card via `window.loadCardHelpers().createCardElement()` in a new `<flowme-custom-overlay>` wrapper. The wrapper forwards `hass` updates and tears the child card down on config change.
- **Security: custom-overlay URL scanner** (`src/overlays/url-scan.ts`). Recursively walks any user-supplied `card_config` and rejects strings carrying `javascript:`, `vbscript:`, `data:` or `file:` schemes before the config ever reaches `createCardElement`. The scan runs twice: once at config validation time (so bad YAML never boots the card) and once at mount time (so late JSON edits from the editor are caught before they mount).
- **Editor: overlay authoring.** New `+ Overlay` toolbar button prompts for the overlay type, then drops the overlay at the next click. Overlays render as dashed boxes on the canvas with a live label chip showing `label`/`entity`/type; they are draggable with `Shift`-snap to the 8% grid and have a bottom-right resize handle (also `Shift`-snaps to whole percent). Right-click deletes after confirmation.
- **Editor: overlay inspector.** Selecting an overlay opens a panel with a type dropdown, entity field (autocomplete-friendly placeholder per type), label, width/height %, tap-action override, and a JSON editor for the custom-overlay card config. JSON is parsed, then revalidated through the full config validator so unsafe URLs are rejected with a clear error.
- New editor commands: `addOverlay`, `deleteOverlay`, `moveOverlay`, `setOverlaySize`, `setOverlayType`, `setOverlayEntity`, `setOverlayLabel`, `setOverlayTapAction`, `setOverlayCardConfig`.
- `OverlayConfig` gains `id`, `label`, `tap_action`. The validator enforces unique ids, required entity for non-custom types, required `card_config` for `custom`, positive size ≤ 100%, and tap-action enum membership.
- `HomeAssistant` shim gains an optional `callService` so the card compiles against older typings.

### Changed

- Card version banner bumped to 0.5.0.
- `renderOverlayPlaceholder` in `flowme-card.ts` replaced by real overlay rendering through `renderOverlayHost` from `src/overlays/render.ts`.

### Deferred to later versions

- Picture-glob live MJPEG/HLS camera streaming (for now we use `entity_picture`, which already refreshes on entity state change).
- HVAC colour-gradient interpolation (still waiting on the secondary-entity schema; tracked for a later minor).
- Web Worker offload for pathfinding (if telemetry warrants it).
- Unit + integration tests (v1.0.0).

## [0.4.0] — 2026-04-26

### Added

- **Weather-aware background transitions.** The card now renders two stacked background `<div>` layers and crossfades between them whenever the resolved background URL changes. The incoming image is preloaded via `new Image()` before the opacity flip to avoid a blank frame; the old layer is cleared on a timer after the transition completes so it's ready for the next swap. `background.transition_duration` is respected (default 2000 ms).
- **Editor: Backgrounds & weather panel.** New collapsible `<details>` panel in the editor for the default image URL, the weather entity (autocompleted from `weather.*` entities in `hass`), the transition duration, and an editable table of `state → image URL` rows with thumbnail previews. New rows pick the next unused known weather state (sunny, cloudy, rainy, …). Every edit pushes one undoable patch with a descriptive label.
- New editor command helpers: `setBackgroundDefault`, `setWeatherEntity`, `setTransitionDuration`, `setWeatherStateImage`, `deleteWeatherState`, `renameWeatherState`.

### Changed

- Card version banner bumped to 0.4.0.

### Deferred to later versions

- Actual in-card image upload. HA's filesystem upload is out of scope for a Lovelace card; users still place images under `/local/` or `/hacsfiles/` as usual and reference them by URL — the panel just makes the mapping discoverable instead of requiring raw YAML.
- HVAC colour-gradient interpolation (still tracked, deferred until the secondary-entity schema work).
- Overlay editor (v0.5.0).
- Unit + integration tests (v1.0.0).

## [0.3.0] — 2026-04-26

### Added

- **Auto-route pathfinding** via Sobel edge detection + A* over a coarse cost grid (`src/pathfinding/`):
  - `sobel.ts` — downscale the background image to ≤480×270, greyscale with Rec. 709 coefficients, separable 3×3 Gaussian blur, Sobel Gx/Gy, magnitude with a 30-threshold noise floor.
  - `grid-builder.ts` — aggregates the edge map into an 8×8-pixel cost grid. Each cell's cost is `255 − max(edge in cell)` so A* naturally prefers to travel along visible architectural features.
  - `astar.ts` — 4-directional A* with an admissible Manhattan heuristic, a binary-heap frontier, and a +50 turn penalty to avoid zig-zag tie-breakers.
  - `simplify.ts` — removes collinear intermediate cells so only direction-changes become waypoints.
  - `index.ts` — public `suggestPath({ imageUrl, from, to })` with a URL-keyed grid cache. Pipeline yields between stages to stay out of the long-task bucket.
- **Editor: Suggest path** enabled when a flow is selected. Shows a dashed orange preview overlay with per-waypoint markers and an accept/cancel bar. Accept pushes a single undoable patch (`auto-route <flowId>`). Reports elapsed time and gives an actionable message when the source image is cross-origin tainted.

### Changed

- Toolbar's Suggest-path button now reflects flow selection and busy state instead of being permanently disabled.

### Deferred to later versions

- **Web Worker offload for the pathfinding pipeline.** The spec calls for worker offload when processing is estimated above 100 ms; measured cost for a 480×270 edge map plus A* on a ~60×34 grid is consistently well under that, so v0.3 runs on the main thread with small yields between stages. The pipeline stages are already pure and ready to move into a worker in a later polish if telemetry warrants it.
- HVAC colour-gradient interpolation (still waiting on the secondary-entity schema; tracked for a later minor).
- Weather-state background transitions (v0.4.0).
- Overlay editor (v0.5.0).
- Unit + integration tests (v1.0.0).

## [0.2.0] — 2026-04-26

### Added

- All six domain flow profiles implemented with spec-exact parameters: energy, water, network, hvac, gas, generic. `FlowProfile` now carries optional `particle_count_curve` (used by network to vary packet density) and `wave_amplitude_curve` (used by water/hvac wave shapes).
- **Houdini Paint Worklet renderer** (`src/flowme-painter-worklet.js` + `src/animation/houdini-renderer.ts`). Worklet source is inlined into the bundle at build time (via Vite `?raw`) and loaded at runtime through a Blob URL, so HACS users still install a single file. The worklet draws dots, squares, sinusoidal waves and expanding pulses; animation is driven by a CSS `@keyframes` rule on `--flowme-progress` after `CSS.registerProperty`.
- **Renderer factory feature detection** (`src/animation/renderer-factory.ts`): uses Houdini when `CSS.paintWorklet` and `CSS.registerProperty` are both available; falls back to SVG otherwise. Override with `?flowme_renderer=svg` or `?flowme_renderer=houdini` in the URL.
- Extended SVG renderer to support all four shapes (dot, square, wave, pulse). Wave is rendered as an animated dashed stroked path; pulse renders as stationary expanding circles at evenly spaced anchor points.
- **Editor overhaul** (`src/flowme-card-editor.ts` + `src/editor/`):
  - `UndoStack` — 100-deep undo/redo with a command description for each patch; push one patch per drag (on pointer-up).
  - `editor/commands.ts` — pure functions for moveNode, addNode, deleteNode, moveWaypoint, insertWaypoint, deleteWaypoint, setNodeLabel, setNodeEntity, addFlow, deleteFlow, setFlowEntity.
  - `flowme-editor-toolbar` — Add node, Add flow, Suggest path (disabled until v0.3), Undo, Redo, Preview toggle, Save.
  - Waypoint handles that drag along the canvas; Shift-drag snaps to 8% grid. Shift-click on a flow segment inserts a waypoint at that point. Right-click deletes nodes (with confirm) and waypoints (immediate).
  - Keyboard: ⌘Z / Ctrl+Z = undo, ⌘⇧Z / Ctrl+Shift+Z / Ctrl+Y = redo.
  - Inspector pane: rename node, set entity, delete node / flow.

### Changed

- Vite library config simplified to a single-file output. Worklet is inlined rather than split into a separate chunk (keeps HACS installs one file).
- Generic profile describe() now formats values with sensible precision.

### Deferred to later versions

- HVAC colour-gradient interpolation between two source-entity temperatures (requires secondary-entity wiring through the config schema and inspector; kept deferred to v0.3+).
- Auto-routing / "Suggest path" button enablement (v0.3.0).
- Weather-state background transitions (v0.4.0).
- Overlay editor (v0.5.0).
- Unit + integration tests (v1.0.0).

## [0.1.0] — 2026-04-26

### Added

- Repo scaffolded with Vite 5 + Lit 3 + TypeScript 5 in strict mode.
- MIT license, HACS manifest, ESLint flat config, CI workflow (lint + type-check + build + dist freshness guard).
- Full type definitions for cards, nodes, flows, overlays and flow profiles (`src/types.ts`).
- Utility helpers (`src/utils.ts`): `clamp`, `lerp`, percent/pixel conversions, polyline path length and point-at-progress sampler.
- Strict configuration validator (`src/validate-config.ts`) with field-path error messages.
- Energy domain flow profile (`src/flow-profiles/energy.ts`) with spec-exact speed curve. The other five domains (water, network, hvac, gas, generic) fall back to a generic dot profile until v0.2.
- SVG-based flow renderer (`src/animation/svg-renderer.ts`) using `animateMotion` with the restart-on-speed-change workaround and 200 ms debounce.
- Renderer factory (`src/animation/renderer-factory.ts`) — always returns SVG in v0.1; Houdini path lands in v0.2.
- Main card (`src/flowme-card.ts`) — full Lovelace lifecycle: `setConfig`, `set hass`, `willUpdate`, `render`, `getCardSize`, `getConfigElement`, `getStubConfig`. Registers `<flowme-card>` as `custom:flowme-card` and advertises via `window.customCards`.
- Minimal config editor (`src/flowme-card-editor.ts`) — click-to-add-node on a background preview, drag existing nodes, YAML fallback.

### Deferred to later versions

- Houdini Paint Worklet renderer + feature-detect factory (v0.2.0).
- Five remaining domain profiles with their spec-accurate parameters (v0.2.0).
- Full drag editor: waypoint handles, line-insertion, toolbar, undo/redo, snap-to-grid (v0.2.0).
- Sobel + A* auto-routing (v0.3.0).
- Weather-state background transitions (v0.4.0).
- Overlay editor (v0.5.0).
- Unit + integration tests (v1.0.0).

[0.5.0]: https://github.com/fxgamer-debug/flowme/releases/tag/v0.5.0
[0.4.0]: https://github.com/fxgamer-debug/flowme/releases/tag/v0.4.0
[0.3.0]: https://github.com/fxgamer-debug/flowme/releases/tag/v0.3.0
[0.2.0]: https://github.com/fxgamer-debug/flowme/releases/tag/v0.2.0
[0.1.0]: https://github.com/fxgamer-debug/flowme/releases/tag/v0.1.0
