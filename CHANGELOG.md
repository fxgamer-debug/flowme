# Changelog

All notable changes to flowme are documented here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
