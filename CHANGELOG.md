# Changelog

All notable changes to flowme are documented here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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

[0.2.0]: https://github.com/fxgamer-debug/flowme/releases/tag/v0.2.0
[0.1.0]: https://github.com/fxgamer-debug/flowme/releases/tag/v0.1.0
