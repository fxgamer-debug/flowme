# Changelog

All notable changes to flowme are documented here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.23.4] — Chevron, path direction, fluid fade, spark branches, editor polish

### Fixed

- **Chevron / arrow**: Final path geometry (`15r` tip, `10r` arms, `5r` notch) scaled by `dot_radius × particle_size`.
- **Rotation / reversal**: Reverse waypoint order when flow is backward (and dual paths for `direction: both`) so `rotate="auto"` matches travel — no `keyPoints="1;0"` workaround.
- **Teardrop**: No tangent rotation in `wave_spacing` / `pulse` spacing JS driver (stays vertical).
- **Fluid**: One-time 600ms stroke fade-in per flow (`fluidInitialised`), not tied only to new `<use>` creation.
- **Spark branches**: Same `particle_shape` as mains (`buildParticleShapeOnly`), white fill, group-based pool.
- **Editor**: Pulse node-effect preview uses CSS `scale` animation (reliable); removed ✦ sparkle from node handles on canvas and card.

## [1.23.3] — Animation polish and node-effect sizing

### Fixed

- **Chevron**: Restored pre-v1.23.2 proportions (`line_width×4` × `dot_radius×3`); rear notch centre at −0.6×width.
- **Rotation**: Diamond uses `rotate="0"` (with teardrop); square / arrow / custom_svg use `rotate="auto"`.
- **Fluid**: Stroke fade-in on first paint; group opacity for shimmer; gradient translate direction corrected.
- **Spark**: Default implicit particle count 8; denser branches (0.008/frame), longer reach (15–50px), brighter branches and white core glow on mains.
- **Node effects**: Radius derived from layout px→viewBox; pulse/ripple rings scaled correctly; glow/badge/alert target the real `.node-dot` via DOM hooks (badge = full-disc colour); editor unchanged (SVG-only).

## [1.23.2] — Animation and node-effect fixes

### Fixed

- **Arrow chevron**: V-notch back, dimensions from particle radius.
- **Trail**: Tail segments follow **behind** the head in both flow directions.
- **Fluid**: Gradient travels continuously along the path (seamless loop, no back-and-forth).
- **Spark**: rAF-driven main particles (size, opacity, flicker), branch sparks with return/fade, pool of 15.
- **Teardrop**: Updated path; no tangent rotation (vertical drop).
- **Node effects**: Continuous rendering via `requestAnimationFrame`; ripple/alert use SVG `<animate>`; optional diagnostic `console.log` (throttled).
- **Editor**: Node-effect inspector preview uses standalone animated SVG (no hass).

## [1.23.1] — Animation styles and node effects

### Added

- **Node effects** (`nodes[].node_effect`): optional SVG overlays at each node — `pulse`, `glow`, `badge`, `ripple`, and `alert`, with type-specific options. Rendered in a dedicated layer above flows; editor includes a **Node effect** inspector section and canvas preview.

### Fixed

- **Arrow / chevron**: Bold filled chevron markers aligned to path tangent; spacing scales with `particle_count`.
- **Trail**: Head uses `particle_shape`; tail segments follow along the path with staged opacity and size.
- **Fluid**: Full-path animated gradient stroke along the flow direction (no discrete particles); `particle_shape` is ignored for this style — noted in the editor.
- **Spark**: Variable particle appearance with optional branch sparks; distinct from dot style.
- **Teardrop**: Proper teardrop path rotated with flow direction.

## [1.23.0] — Animation quality pass

### Changed

- **ANIM-1 — Smooth speed interpolation**: Flow duration changes ease over 500ms (quadratic ease-in-out) from a fixed start value toward the target; deltas under 50ms snap to avoid jitter. Direction reversals use a 600ms crossfade (300ms decelerate + 300ms re-accelerate); non-shimmer flows briefly stall motion at the midpoint, shimmer flows keep faint motion.
- **ANIM-2 — Adaptive particle count**: Rolling average uses up to 60 frame samples; adaptation runs at most once per second for all eligible flows (implicit `particle_count` only). When `debug: true`, adaptations log with `[FlowMe] adaptive count:`.
- **ANIM-3 — Reconnect continuity**: Subscribes to `hass.connection` `ready` / `disconnected`; on reconnect pushes updated sensor values without restarting renderers and shows a short “Reconnected” toast when returning after a disconnect.
- **ANIM-4 — Curved pulse placement**: Pulse rings sample the rendered SVG path (`getPointAtLength`) so `line_style: curve` / `smooth` matches the visible line.
- **Houdini**: Registered `--flowme-dur` (ms) with `animation: … calc(var(--flowme-dur) * 1ms)` and `transition: --flowme-dur 500ms ease-in-out`; small changes snap without transition.

## [1.22.1] — Pathfinding worker inline, domain selector, rename UX

### Fixed

- **Suggest Path (HACS single-file)**: Pathfinding runs in a worker bundled **inline** in `flowme-card.js` (`?worker&inline`). No separate `dist/assets/pathfinding.worker-*.js` file is required; leftover worker maps under `dist/assets/` are removed after build. Falls back to main-thread pathfinding with **ungated** `console.error` / `console.log` diagnostics when the worker cannot start.

### Added

- **Diagram domain selector** in the editor State A panel (`domain:` energy/water/network/hvac/gas/generic), undoable via `pushPatch`.
- **Rename UX**: Double-click a node label (or id placeholder) or overlay chip for inline rename; double-click the node dot or flow line selects the element and focuses the label/id field in the inspector; choosing an element from the toolbar dropdown auto-focuses that field.

## [1.22] — Web Worker pathfinding and domain colours

### Added

- **Web Worker pathfinding**: Sobel edge detection and A\* run off the main thread (`src/pathfinding/pathfinding.worker.ts`) when suggesting a path in the editor; falls back to the main-thread pipeline when workers are unavailable or fail. The production build emits `dist/assets/pathfinding.worker-*.js` alongside `dist/flowme-card.js` — ship the whole `dist/` tree (or npm package `files`) so the worker URL resolves next to the card script (`vite.base: ./`).
- **Per-domain colour profiles**: `domain_colors` keys follow domain-specific roles (energy, water, network, HVAC, gas, generic). Pattern matching resolves flow colours per domain; the editor colour panel lists the correct roles for the configured domain.

### Changed

- **Suggest Path**: Shows “Finding path…” with a spinner while the worker runs.

## [1.21] — i18n

### Added

- **Internationalisation**: All user-facing strings are centralised in `src/strings.ts` with runtime lookup via `t()` in `src/i18n.ts`.
- **HA language detection**: When `hass.language` changes, FlowMe loads `/local/flowme/translations/{lang}.json` for non-English bases (e.g. `fr` from `fr-FR`). Missing or invalid files fall back to English with no UI error.
- **Reference translation**: `translations/en.json` documents the JSON shape for community translators; see README **Translations**.

## [1.20] — Accessibility audit

### Added

- **ARIA for dashboard card**: `ha-card` uses `role="region"` and
  `aria-label="FlowMe energy flow visualisation"`. Each flow’s SVG group (or Houdini
  layer) gets `role="img"` and a live label `flow id: formatted value + unit`. Node
  wrappers use `role="img"` with the same style of reading text. Renderer exposes
  `setFlowAriaLabel` on SVG and Houdini implementations.
- **Editor canvas**: `role="application"` and `aria-label="FlowMe visual editor canvas"`.
  Node, waypoint, and overlay handles expose `role="button"`, `aria-selected`, and
  descriptive `aria-label`s. Toolbar icon actions and suggest-path Accept/Cancel have
  explicit `aria-label`s; element `<select>`s are labelled.
- **Focus visibility**: `:focus-visible` rings on toolbar buttons, canvas handles,
  inspector controls, suggest bar, and animation `<summary>` rows (editor); overlay
  toast / card region where relevant (card).
- **`prefers-reduced-motion`**: `createRenderer()` forces SVG (skips Houdini worklet).
  `SvgRenderer` treats all flows as `animation_style: none` when reduced motion is on.
  CSS pauses SVG `animate` / `animateMotion`, disables Houdini keyframes, background
  transitions, overlay ripples (card + `flowme-custom-overlay`), and toast motion.
- **`prefers-contrast: more`**: Thicker flow outline strokes, no SVG glow filters,
  stronger overlay and node-dot outlines, higher-contrast node label/value text (card);
  overlay handles outlined in the editor.

### Changed

- **Inspector semantics**: Node / flow / overlay titles use `<h3>`; waypoint and value-gradient
  section titles use `<h4>`. Flow inspector wraps route + entity in `<fieldset>` /
  `<legend>`. Waypoint rows use `<ul>` / `<li>`.

## [1.19.1] — 2026-05-03

### Fixed

- **Overlay resize handle did nothing**: Resize used the same “4px drag” gate as nodes,
  but overlay resize `pointerdown` never set `dragStartPx`, so `dragMoved` never became
  true and the resize branch never ran. Resize handling now runs immediately for
  `overlay-resize` drags (still one undo step on `pointerup`).
- **Wrong resize coordinate basis**: Size deltas were converted using stage width/height.
  Overlay percentages are relative to the background image (`imageNaturalW` /
  `imageNaturalH`), matching `pointerToPercent`. Deltas now use
  `(client − start) / scale` → card pixels, then `÷ imageNaturalW/H × 100`.
- **Resize handle hit target**: Handle enlarged to 20×20px with explicit
  `pointer-events: all` and `touch-action: none` for reliable grabs.

## [1.19] — Overlay interaction feedback

### Added

- **Overlay tap feedback (CSS ripple)**: Interactive custom overlays use a Material-style
  white radial ripple on press. Implemented on the overlay wrapper and on
  `flowme-custom-overlay` so taps on the embedded HA card (inside shadow DOM) still
  animate the burst.
- **Keyboard activation**: Custom overlay wrappers are focusable (`tabindex="0"` when
  visible, `-1` when hidden), `role="button"`, and Enter / Space runs the same
  `activatePrimaryAction()` path as a click on the embedded card. `:focus-visible`
  outline uses `--primary-color`.
- **Toast on connection loss**: When `hass` becomes undefined (e.g. connection lost),
  a short bottom-centre toast shows “Connection lost”. Generic “Action failed — please retry”
  toast if overlay activation throws (embedded cards still perform their own
  service calls; FlowMe cannot intercept those).

### Changed

- **GitHub Releases**: `release.yml` extracts the changelog heading subtitle (text after
  `## [version] —`) and sets the release title to `flowme vX.Y — <subtitle>` when present.
  CI already runs on every push/PR to `main` via `.github/workflows/ci.yml` (unchanged).

## [1.18.8] — 2026-05-02

### Fixed

- **Background image and content unified as one panning layer**: Previously the
  background image was rendered as a CSS `background-image` on the `.stage` element
  and synchronised to the `canvas-content` transform via `background-size` /
  `background-position`. This approach could not preserve correct pan limits and led
  to black borders. The new approach:
  - `canvas-content` is sized to the background image's natural pixel dimensions
    (`imageNaturalW × imageNaturalH`). The image is loaded via `new Image()` in
    `loadBackgroundImage()` to read `naturalWidth` / `naturalHeight`.
  - A `.background` div inside `canvas-content` fills it at `background-size: 100% 100%`
    — no distortion since the container exactly matches the image dimensions.
  - All nodes, flows, waypoints, and overlays live inside the same `canvas-content`
    layer, so background and content move as one unified scene.
  - `fitScale` is now `stageW / imageNaturalW` (fill stage width exactly). `fitPanY`
    centres the image vertically so the middle of the image is visible at fit level.
  - Pan is clamped (`clampPan`) after every zoom or drag so the image always covers
    the full stage — no black borders in any direction at any zoom level.
  - `pointerToPercent` uses `imageNaturalW/H` for correct coordinate mapping.
  - When the background image changes (weather swap etc.) `loadBackgroundImage` reloads
    dimensions and `recalcFit` recomputes fit for the new image.

## [1.18.7] — 2026-05-01

### Fixed

- **BUG-1 — Background image squashed/distorted**: `background-size` was set to
  `${scale * 100}% ${scale * 100}%`, forcing both width and height to the same percentage
  and ignoring the image's natural aspect ratio. Fixed by using a single-value form
  `${scale * 100}%`, which sets the width and leaves height as `auto` so the browser
  preserves the image aspect ratio. Since the background images share the same 16:10
  aspect ratio as the canvas, at `scale=1` the image fills the stage exactly with no
  distortion, and zoom/pan continue to work correctly.

## [1.18.6] — 2026-05-01

### Fixed

- **BUG-1 — Background image clipped at bottom**: v1.18.5 attempted to fix this by resizing
  `canvas-content` to card natural dimensions, which broke the entire coordinate system
  (all nodes collapsed to the same position, dragging stopped working). v1.18.5 changes
  were reverted to v1.18.4 state first.

  The correct minimal fix: background image is now rendered directly on the `.stage` element
  using CSS `background-image`, `background-size`, and `background-position` set as inline
  styles that mirror the `canvas-content` transform exactly:
  - `background-size: ${scale * 100}% ${scale * 100}%` — scales the image with zoom
  - `background-position: ${panX}px ${panY}px` — pans the image with the content

  This means the background always covers the full stage area at any zoom/pan level with
  zero clipping. The `.background` div inside `canvas-content` is removed. All coordinate
  math, `canvas-content` dimensions, `pointerToPercent`, and drag calculations are
  completely unchanged from v1.18.4.

## [1.18.4] — 2026-05-01

### Fixed

- **Suggest Path Accept button never fired**: `renderSuggestBar()` was rendered as a child
  of `.z-canvas` which has `overflow: hidden` and is only `140px` tall. The bar was visually
  clipped and received no click events. Moved `renderSuggestBar()` outside `.z-canvas` into
  its own flex slot between the canvas zone and the toolbar. The Accept and Cancel buttons
  now work correctly.

## [1.18.3] — 2026-05-01

### Changed

- **BUG-1**: Background moved back inside `canvas-content` so it zooms/pans with flow
  content. Fixed `fitScale`/`fitPanX` calculation: when the card's natural aspect fits
  within the stage at scale=1 the content is centred horizontally (`fitPanX`); when wider,
  scale is reduced so the full width fits. `resetZoom` and `disconnectedCallback` now
  restore `fitPanX/Y` not just zero. `pointerToPercent` rewritten with the correct inverse
  transform formula: `cardPos = (screenOffset − stageEdge − panX) / (stageSize × scale)`.

- **BUG-2 debug logging**: Added `console.log('[FlowMe] …')` statements to
  `acceptSuggestion` to diagnose the Suggest Path flow-creation failure. Run Suggest
  Path → Accept and paste the browser console output to identify the root cause.

## [1.18.1] — 2026-04-30

### Fixed

- **BUG-1 — Background image clipped at fit level**: The background image div was inside
  `.canvas-content` which receives the zoom/pan CSS transform. At fit scale < 1 the content
  shrinks to the top-left, leaving blank stage area where the background should show. Moved
  the background div outside `.canvas-content` (but still inside `.stage`) so it always fills
  the full stage via `position: absolute; inset: 0` regardless of zoom or pan. Nodes, flow
  connectors, overlays, and waypoint handles remain inside `.canvas-content` so they still
  scale/pan correctly.

- **BUG-2 — Removed rubber band selection**: Rubber band caused multiple interaction bugs
  (pointer-up/click race condition, space+drag conflict). Removed completely:
  `rubberBand` state, `rubberBandJustSelected` flag, `stageRubberBandPointerId`, the
  `rubber-band` DragTarget variant, `onStagePointerDown/Move/Up` handlers, `renderRubberBand()`
  method, the stage `@pointerdown/@pointermove/@pointerup` bindings, and `.rubber-band` CSS.
  Multi-select via Shift+click remains fully functional.

- **BUG-3 — Suggest Path not creating flow**: Converted `acceptSuggestion` and
  `cancelSuggestion` to arrow functions for correct `this` binding in template handlers.
  Added a check for existing flows between the two nodes — if one exists its waypoints are
  updated rather than creating a duplicate. Ensures all state mutations (`suggestPreview`,
  `selectedNodeIds`, `selectedNodeId`, `selectedOverlayId`) are cleared before `pushPatch`
  so they land in the same Lit render batch as the config update.

- **BUG-4 — Waypoint handles appear orange**: Updated `.waypoint` CSS to explicitly use
  `background: #ffffff` (opaque white), `width/height: 12px`, and `cursor: move`. The
  orange `.suggest-marker` style (preview-only, shown before Accept) is intentionally
  distinct and unchanged.

## [1.18] — 2026-04-30

### Fixed

- **BUG-1 — Canvas clipping at fit level**: Replaced the one-shot `firstUpdated()` fit-scale
  calculation with a `ResizeObserver` that fires after the canvas zone has its final rendered
  dimensions. At scale=1 the stage fills the canvas exactly, so the fit-scale computation now
  accounts for the canvas aspect ratio vs the card's configured aspect ratio and scales down
  only when the canvas is narrower than the card's natural aspect. The observer fires
  immediately on attachment, guaranteeing correct fit dimensions before the first user
  interaction, and updates whenever the dialog is resized.

- **BUG-2 — Node drag acceleration/drift at zoom**: `pointerToPercent` was dividing by the
  CSS-transformed (visual) stage bounding-rect dimensions, which are scaled up at zoom > 1.
  The method now takes pointer coordinates relative to the canvas element (unaffected by
  transform), reverses the pan+scale transform to get card-space pixels, then converts to
  percentage using the unscaled stage dimensions (canvas size minus the `4px 8px` inset).
  Bulk-node drag and overlay-resize also had the same bug and are fixed: they now divide
  screen-space deltas by `this.scale` to get card-space deltas before converting to
  percentages.

- **BUG-3 — Space+drag triggers rubber band**: `onStagePointerDown` now returns early when
  `this.spaceHeld` is true, preventing rubber-band selection from starting concurrently with
  the canvas pan gesture. This is in addition to the existing `onHandlePointerDown` guard.

- **BUG-4 — Suggest Path waypoints not selectable**: `acceptSuggestion` now calls
  `pushPatch` (which updates `this.config`) before setting `this.selectedFlowId`. This
  ensures the render that follows finds the correct flow — including its waypoints — already
  in the live config, and correctly renders interactive waypoint handles on the canvas.
  Also added `this.selectedOverlayId = null` to the suggestion accept path for consistency.

## [1.17] — 2026-04-30

### Added

- **FEATURE-1 — Canvas zoom and pan**: The editor canvas now supports interactive zoom and
  pan. Zoom is applied as a CSS `transform: scale()` on the `canvas-content` layer (the div
  wrapping background image, SVG connectors, node/overlay handles, and waypoint handles).
  The canvas zone itself stays at its fixed 140 px height.

  - **Mouse wheel**: Zooms toward the cursor position. `e.preventDefault()` suppresses page
    scroll. Step: ×1.25 in, ×0.8 out, clamped between fit-scale (1.0) and 5×.
  - **Middle-mouse drag**: Pans by capturing the pointer on the canvas zone.
  - **Space + left-drag**: Hold Space to switch the cursor to `grab`; drag to pan.
    Node/waypoint drag is suppressed while Space is held.
  - **Fit button (⊡)**: Resets scale to 1.0 and pan to (0, 0).
  - Zoom/pan state resets when the editor is closed (`disconnectedCallback`).
  - `pointerToPercent` maps client coordinates through the stage's bounding rect which
    already accounts for the CSS transform, so node drag positions remain correct at all
    zoom levels.

- **TOOLBAR-1 — Expanded left column with zoom buttons**: Toolbar grid column proportions
  updated from `10% 55% 35%` to `15% 50% 35%`. The left column now has two rows:
  - Row 1: ↩ Undo / ↪ Redo (side by side, as before).
  - Row 2: − Zoom out / + Zoom in / ⊡ Fit (three equal icon buttons).
  Zoom out is disabled when at minimum zoom (1×); Zoom in is disabled at 5×; Fit is always
  enabled.

### Fixed

- **BUG-1 — Waypoint undo deep-copy audit**: `pushPatch` now validates (and thus deep-copies
  via `JSON.parse/stringify`) both the `prev` and `next` config snapshots before storing them
  in the undo stack. Previously only `next` was validated/deep-copied; `prev` was stored as a
  direct reference. Although all commands already called `cloneConfig`, this ensures no shared
  object references can leak into the undo history regardless of how callers construct configs.

## [1.16.1] — 2026-04-30

### Fixed

- **CI errors from v1.16**: `statusMessage` was removed from the template but the `@state()`
  field and all its write-sites remained, causing a TypeScript "declared but never read" error.
  Removed the field declaration and all assignments. The two failure cases in `runSuggestPath`
  (CORS background analysis failure and general route error) now correctly write to
  `errorMessage` instead. Empty `if/else` blocks left by the bulk removal are also cleaned up.

## [1.16] — 2026-04-30

### Changed

- **VERSION-1 — Versioning scheme simplification**: Removed the redundant middle `0` from
  version numbers. The scheme changes from `v1.0.x.y` to `v1.x` going forward. This release
  is `v1.16`, continuing directly from `v1.0.15.x`. The GitHub Actions release workflow
  already uses the `'v*'` tag pattern which matches all formats including `v1.16`.

### Fixed

- **BUG-1 — Status/error notices overflowing toolbar Row 2**: When a status or error message
  was set (e.g. after Suggest Path or on a config error), the message appeared in Row 2
  alongside Save/Cancel, pushing those buttons out of the row. Row 2 is the fixed Save/Cancel
  row that must never change layout. Removed the status and error `<span>` elements from
  Row 2 entirely. Row 1 (the add/multiselect row) still shows Suggest Path feedback when
  relevant; status messages remain in the `@state` for any future use.

- **BUG-2 — Node inspector input fields lacked visible contrast**: The `.node-cell
  input[type='text']` and `.node-cell input[type='number']` CSS used
  `var(--secondary-background-color, rgba(255,255,255,0.06))` — nearly transparent,
  identical to the panel background. The `.node-cell input[type='color']` background was also
  transparent. Fixed by matching the established `.inspector input` style:
  `background: var(--card-background-color, #1a1a1a)` with
  `border: 1px solid var(--divider-color, rgba(255,255,255,0.12))`. All node inspector inputs
  now have a clearly distinct, opaque dark background with a visible border, matching the
  styling used across all other inspector panels (flow, overlay, general settings).

## [1.0.15.5] — 2026-04-30

### Fixed

- **BUG-1 — Canvas not visible after v1.0.15.3 layout changes**: `flex: 0 0 24%` on
  `.z-canvas` is computed from the flex container's resolved height. When `.wrap` has
  `height: 100%; min-height: 600px` and HA doesn't give the host an explicit height, the
  percentage flex-basis resolves to zero. Fixed by switching to explicit pixel heights for
  all fixed zones:
  - `.z-canvas { flex: 0 0 140px; position: relative }` — canvas zone always exactly 140px.
  - `.z-toolbar { flex: 0 0 72px }` — toolbar always 72px (two rows of 36px).
  - `.z-context { flex: 1 1 0 }` — fills all remaining height.
  - `.stage` changed from `width/height calc(100% - ...)` to `position: absolute; inset: 4px 8px`
    so it fills its `position: relative` parent without relying on inherited height.

- **BUG-2 — Node inspector missing fields**: The node settings panel only showed Label,
  Entity, Opacity, and Delete. Added all missing fields in a compact three-row layout:
  - **Row 1**: Label (text input) | Entity picker
  - **Row 2**: Colour (color picker) | Visible (checkbox) | Show value (checkbox) |
    Show label (checkbox)
  - **Row 3**: X position % | Y position % | Size px | Opacity (all number inputs)
  - **Row 4**: Delete button
  All inputs read from and write back to the node config via `pushPatch()` with undo support.
  Position changes use the existing `moveNode()` command. Visible uses `setNodeVisible()`.
  Color, size, show_value, show_label patch the node directly via a local `patchNode` helper.

## [1.0.15.4] — 2026-04-30

### Fixed

- **CI errors from v1.0.15.3**: Two TypeScript errors introduced by the toolbar redesign:
  - `Property 'label' does not exist on type 'FlowConfig'`: `FlowConfig` has no `label`
    field. The element dropdown option for flows was using `f.label ?? f.id`; fixed to
    use `f.id` only.
  - `'selectorElement' is declared but its value is never read`: The `@state() private
    selectorElement` field was written in change handlers but never read (the template
    uses the derived `derivedElement` local variable instead). Removed the field and all
    assignments to it.

## [1.0.15.3] — 2026-04-30

### Changed

- **LAYOUT-1 — Zone height redistribution and Zone 4 removal**: The HA editor dialog is
  fixed at approximately 740×510px. The previous four-zone layout wasted too much height on
  the canvas and element list. New three-zone layout with explicit flex percentages:
  - **Canvas (Zone 1)**: `flex: 0 0 24%` (~122px) — fills its allocated height, no padding-top
    aspect ratio trick needed.
  - **Toolbar (Zone 2)**: `flex: 0 0 7%`, `min-height: 36px` (~36px).
  - **Options / Context panel (Zone 3)**: `flex: 1 1 0` — fills all remaining height (~352px),
    scrollable.
  - **Zone 4 (element list) removed entirely.** Element selection moved into the toolbar
    right column (see below).

- **TOOLBAR-1 — Redesigned toolbar as a three-column grid**: The toolbar is now a CSS grid
  (`grid-template-columns: 10% 55% 35%`) with thin vertical dividers between columns.
  All three columns share identical height and stretch to fill the toolbar zone.

  - **Left column (10%)** — Undo/Redo: Two icon-only buttons (`↩` / `↪`) stacked vertically,
    each 50% of column height. Icon-only (no label text), tooltip on hover, disabled + 30%
    opacity when stack is empty.

  - **Centre column (55%)** — Actions: Two rows each 50% of column height.
    - Row 1 (variable): In normal mode shows `+ Node / + Flow / + Overlay` buttons; in
      multi-select mode (2+ nodes) shows the existing multi-select action toolbar
      (`Suggest Path / Hide / Show / Align H / Align V / Delete`). Status and error messages
      appear inline in Row 2 when set.
    - Row 2 (fixed): Always shows `💾 Save` (accent colour) and `✕ Cancel` buttons. Logic
      and behaviour unchanged from v1.0.15.2.

  - **Right column (35%)** — Element selector: Two `<select>` dropdowns stacked vertically.
    - Type dropdown: `Select type… / Nodes / Flows / Overlays`. Selecting a type clears the
      canvas selection.
    - Element dropdown: Populated from the selected type; disabled when no type is chosen.
      Selecting an element is equivalent to clicking it on the canvas (updates context panel).
    - Both dropdowns sync automatically when an element is selected on the canvas: the
      correct type and element are reflected without user interaction.

- **Canvas stage now fills zone height**: With explicit percentage zones the stage no longer
  needs the `padding-top` aspect-ratio trick. It uses `height: calc(100% - 8px)` to fill
  the allocated 24% canvas zone.

- `parseAspectRatio` import removed from the editor (no longer used after stage layout change).
- `elementTab` @state field removed (Zone 4 tabs no longer exist).
- `renderElementList()` method removed (Zone 4 removed).

## [1.0.15.2] — 2026-04-29

### Fixed

- **REGRESSION — Editor blank in HA (`:host` display regression)**: The v1.0.15.1 BUG-2 fix
  changed `:host` from `display: block` to `display: flex` so that `height: 100%` on `.wrap`
  would resolve correctly. In HA's editor dialog (`hui-dialog-edit-card`) the editor element
  is placed inside `.element-editor` which does not establish a block formatting context that
  provides height to a flex `:host`, so the component rendered with zero height and appeared
  completely blank. Fixed by reverting `:host` to `display: block` (what HA expects) and
  moving the flex column layout responsibility entirely onto `.wrap`. `.wrap` now uses
  `min-height: 600px` to guarantee a usable height when HA does not size the host explicitly,
  and `height: 100%` to fill it when HA does. All four zones remain correctly laid out within
  `.wrap`.

## [1.0.15.1] — 2026-04-29

### Investigation

- **INVESTIGATE-1 — HA editor preview pane**: Investigated all available options to hide or
  remove the redundant preview pane that HA renders beside the editor component.

  - **Option A** (`static get noPreview()` / `static renderPreview()`): Neither property nor
    method exists in HA's current `hui-element-editor` / `hui-typed-element-editor` /
    `hui-card-element-editor` chain (verified against HA `dev` branch source). HA has no
    documented API for suppressing the preview pane from the editor component side.

  - **Option B** (return values from `getConfigElement()` or properties on the editor
    element): `getConfigElement()` returns the editor element instance; no property or return
    value on that element causes HA to hide the preview side. The split layout is determined
    entirely by `hui-dialog-edit-card` CSS (`@media (min-width: 1000px)` shows both panes
    side-by-side) with no hook for the editor element to influence it.

  - **Option C** (CSS targeting HA shadow DOM): The preview pane (`.element-preview`) and
    editor pane (`.element-editor`) are siblings inside `hui-dialog-edit-card`'s shadow DOM.
    Our editor component is a child of `.element-editor` and cannot style sibling elements
    via CSS — shadow DOM encapsulation prevents cross-boundary sibling selectors entirely.
    Injecting a `<style>` element into the document head could work but is fragile, breaks on
    HA updates, and is explicitly excluded by the investigation requirements.

  **Result**: No clean solution exists. The preview pane is left as-is. The canvas inside the
  editor remains the authoritative live preview; users can ignore the redundant HA preview.

### Fixed

- **BUG-1 — Canvas not responsive to window size or `aspect_ratio`**: The canvas stage used
  a hardcoded inline `padding-top` value computed once at render time. Replaced with a CSS
  custom property `--canvas-aspect-padding` set via `this.style.setProperty()` in `render()`
  so it updates reactively whenever `aspect_ratio` changes. The stage CSS uses
  `padding-top: var(--canvas-aspect-padding, 62.5%)` which scales with the percentage-width
  container and reflows automatically when the editor panel is resized. Default fallback is
  62.5% (16:10 ratio).

- **BUG-2 — Zone 3 context panel collapsed to zero height**: The `:host` element used
  `display: block` with no height, so the `.wrap` child's `height: 100%` resolved to zero.
  Fixed by setting `:host { display: flex; flex-direction: column; height: 100%; overflow:
  hidden }` and `.wrap { flex: 1 1 0; min-height: 0; overflow: hidden }`. Zone 3's existing
  `flex: 1 1 0; min-height: 0; overflow-y: auto` then correctly fills and scrolls the
  remaining vertical space.

- **BUG-3 — State A panels (Animation, Opacity, Defaults) collapsed by default**: The
  `<details>` elements for the global Animation, Opacity, and Defaults panels had no `open`
  attribute, so they rendered collapsed and users had to manually expand each one. Fixed by
  adding the `open` attribute to these three panels and to the flow Animation panel (State B)
  so the most important settings are immediately visible.

- **BUG-4 — State B flow inspector Animation section collapsed**: The flow animation
  `<details class="anim-details">` panel also had no default `open` attribute. Fixed together
  with BUG-3. State B/C/D rendering was confirmed working once BUG-2 flex layout was
  resolved.

## [1.0.15] — 2026-04-29

### Changed

- **Editor layout redesign**: Replaced the flat single-column layout with four stacked
  horizontal zones that fill the full editor panel height:

  - **Zone 1 — Canvas**: The interactive stage with background, flow lines, node handles,
    waypoint handles, and rubber-band selection. Height adapts to the card's configured
    `aspect_ratio`. Suggest path preview bar appears immediately below the canvas.

  - **Zone 2 — Toolbar**: Fixed-height bar (~48px) with three groups:
    - Left: `↶ Undo` / `↷ Redo` with keyboard shortcut tooltips, disabled when stack empty.
    - Centre: `+ Node` / `+ Flow` / `+ Overlay` / `Suggest path` add buttons. Replaced by
      the multi-select action toolbar when two or more nodes are selected.
    - Right: status/error message, `💾 Save` (commits to HA config), `✕ Cancel` (restores
      the config as it was when the editor first opened, using a new `savedConfig` snapshot
      captured on each external `setConfig` call — creates an undoable patch).

  - **Zone 3 — Context panel**: Scrollable area whose content depends on selection:
    - Nothing selected → Background, Animation, Opacity, Domain colours, Visibility,
      Defaults collapsible panels (existing helpers, unchanged).
    - Node selected → existing node inspector (all fields).
    - Flow selected → existing flow inspector with animation, waypoints, speed curve,
      gradient sub-sections.
    - Overlay selected → existing overlay inspector.

  - **Zone 4 — Element list**: Fixed-height chip row (~120px) with three tabs
    (`Nodes` / `Flows` / `Overlays`). Each tab shows horizontally scrolling chips with a
    coloured left border matching the element colour. Clicking a chip selects the element
    and switches the context panel. An `+ Add` chip at the end triggers the same add flow
    as the toolbar buttons.

- All editor logic (drag interactions, undo/redo, keyboard shortcuts, Suggest Path, all
  input field handlers) is **unchanged**. Only `render()`, the CSS block, and three new
  template-only helper methods (`renderContextPanel`, `renderStateA`, `renderElementList`)
  were added or modified.

## [1.0.14.6] — 2026-04-29

### Fixed

- **BUG — Flow lines absent in editor canvas (SVG namespace)**: All previous attempts to
  render flow lines in the editor canvas rendered `<g>`, `<path>`, and `<line>` elements as
  `HTMLUnknownElement` (HTML namespace) instead of proper `SVGPathElement` / `SVGLineElement`
  (SVG namespace). This happened because `renderFlowConnector` returned `html\`<g>...</g>\``
  fragments. Lit's `html` tag creates template fragments by setting `innerHTML` on a plain
  `<template>` element — without an `<svg>` ancestor in the static template string, the HTML
  parser creates all SVG element names in the HTML namespace, where they have no visual
  representation. Fixed by switching `renderFlowConnector` to use Lit's `svg\`...\`` tagged
  template literal (imported as `svg` from `'lit'`), which parses the fragment inside an SVG
  context so every element is created in the correct SVG namespace. No other code was changed.

## [1.0.14.5] — 2026-04-29

### Fixed

- **BUG-1 — Flow lines not visible in editor canvas**: The editor was rendering flow
  connectors as individual `<line>` elements per waypoint segment. These were hard to see
  and did not match the actual animated path shape. Replaced with proper SVG `<path>`
  elements using `polylineToSvgPathStyled` (the same function used by the renderer), so the
  editor line now exactly matches the card animation for all four line styles (corner,
  diagonal, curve, smooth). Invisible wide `<line>` hit-areas are retained for shift-click
  waypoint insertion. Visible paths use the flow's configured colour at 0.55 opacity, rising
  to full opacity on hover with a drop-shadow glow when selected.

- **BUG-2 — Undo/redo stack wiped after every operation**: The `_ownCommit` flag was reset
  to `false` synchronously inside `commitToHa()`, immediately after `dispatchEvent()`. In
  Home Assistant's editor framework, `setConfig()` is called back **asynchronously** (after
  `dispatchEvent` returns), so the flag was already `false` when `setConfig` ran, causing the
  undo stack to be cleared on every edit. Fixed by moving `_ownCommit = false` into
  `setConfig()` itself, where it is consumed and cleared. The flag remains `true` from the
  moment `commitToHa` sets it until `setConfig` actually processes the echoed config — whether
  that call arrives synchronously or asynchronously.

## [1.0.14.4] — 2026-04-29

### Changed

- **BUG-6 — "Add waypoint" button label**: Renamed "Add waypoint at midpoint" to "Add waypoint".
  The midpoint insertion behaviour is an implementation detail that doesn't need to be surfaced.

### Fixed

- **AUDIT-1 — Codebase audit**: Full audit of `src/`, `tests/`, and `dev/` for hardcoded
  coordinates, personal entity IDs, and personal information. No findings: all entity IDs and
  coordinates in dev/test files are generic placeholders (`sensor.pv_total_power`,
  `sensor.example_power`, x:20/y:30 etc.). No personal names or Romanian words found anywhere.

- **BUG-1 — Value gradient editor sub-fields not appearing (third occurrence)**: Root cause
  identified: `validateConfig` threw a validation error when `value_gradient.entity` was an
  empty string, causing `pushPatch` to silently revert the entire config change before it could
  update the editor UI. Fixed by relaxing `validateValueGradient` to accept an empty entity
  string — the renderer already handles missing/unavailable entities gracefully.

- **BUG-2 — `wave_spacing` and `pulse` rendering at top-left corner (0,0)**: The `animateMotion`
  element was already running when JS-driven positioning tried to use `transform` on the shape.
  SVG applies both the `animateMotion` motion supplement *and* the `transform` attribute, placing
  the particle at a wrong combined position. Fixed by replacing the running `animateMotion` with
  an inert placeholder element (no path reference, `begin=indefinite`) before applying the
  JS-driven `translate(x,y) rotate(angle)` transform. The inert element contributes zero motion
  transform, leaving the `transform` attribute as the sole position source.

- **BUG-3 — Flow lines not visible in editor canvas**: The `.connectors` SVG had
  `pointer-events: none` on the container element, which prevented child `.segment` elements
  from being clickable regardless of their own `pointer-events: visibleStroke` setting. Also
  increased stroke visibility: `stroke-width: 2`, `stroke-dasharray: 4 4`, `opacity: 0.5`
  (unselected) with `opacity: 1` and white stroke on hover. Selected flows retain the
  primary-colour highlight.

- **BUG-4 — Undo/redo completely non-functional**: Root cause: `setConfig` called
  `undoStack.clear()` unconditionally. Since Home Assistant calls `setConfig` on the editor
  every time a `config-changed` event is dispatched (which happens on every edit via
  `commitToHa`), the undo stack was wiped immediately after every operation. Fixed by adding
  an `_ownCommit` flag that `commitToHa` sets before dispatching and clears after. `setConfig`
  now only clears the undo stack when `_ownCommit` is false (i.e., when HA pushes a genuinely
  external configuration change such as opening a different card).

- **BUG-5 — Undo available after disabling value gradient but not after enabling it**: Resolved
  as a direct consequence of the BUG-1 fix. Previously, the enable path threw a validation
  error and never reached `pushPatch`, so no undo entry was created. With empty-entity
  validation relaxed, both enable and disable paths succeed and push to the undo stack.

## [1.0.14.3] — 2026-04-28

### Fixed

- **BUG-1 — Value gradient not visible on card**: The gradient colour was only pushed to
  the renderer when `hass` changed. After a config edit (which creates a fresh renderer)
  the renderer started with no `latestValues`, so `setGradientColor` triggered a flush
  that did nothing. Fixed by extracting all value/gradient pushing into a shared
  `pushAllValuesToRenderer()` helper that is called both on `hass` changes and immediately
  after a new renderer finishes `init()`.

- **BUG-2 — `wave_lateral` glitching (particles appear/disappear)**: Removed the complex
  path-tangent sampling and `data-base-transform` concatenation logic. Because
  `animateMotion rotate="auto"` already aligns the element's local coordinate system with
  the path tangent, a simple `translate(0, offsetPx)` on the shape element is always
  perpendicular to the path — no manual tangent needed. This also eliminates the transform
  corruption that caused glitching.

- **BUG-3 — `wave_spacing` particles zipping at extreme speed**: Rewrote `wave_spacing`
  and `pulse` to drive particle positions directly via `SVGPathElement.getPointAtLength()`
  each rAF frame instead of updating `animateMotion begin=` offsets. Calling
  `beginElement()` every frame was restarting the animation from scratch each frame,
  causing the visible flashing/zipping. JS-driven absolute positioning avoids this entirely.

### Added

- **FEATURE-1 — Waypoint editor UI in flow inspector panel**: When a flow is selected,
  a "Waypoints" section appears in the inspector showing every waypoint as an editable
  row (index number, x% and y% number inputs, delete × button). An "Add waypoint at
  midpoint" button inserts a new waypoint at the midpoint of the longest segment.
  Waypoint handles on the canvas are now only shown for the selected flow (previously
  shown for all flows). Handles have been restyled as squares with a primary-colour border
  to distinguish them from circular node handles. All waypoint operations push undo commands.

- **FEATURE-2 — Undo/redo keyboard shortcut now reliable**: Added `document.addEventListener`
  with `capture: true` as a secondary registration alongside the existing `window`
  listener. This ensures Ctrl+Z / Cmd+Z is intercepted even when HA panels or
  inner iframes capture keyboard events before they reach `window`. Added
  `stopImmediatePropagation()` to prevent the handler from firing twice.

## [1.0.14.2] — 2026-04-28

### Fixed

- **BUG-1 — Value gradient editor sub-fields not visible**: Replaced the `<details>`/`<summary>`
  collapsible element for the gradient section with a plain `div`. The browser manages
  `<details>` open/closed state independently of LitElement's render cycle, so
  `?open=${enabled}` could not reliably force the section open after a re-render triggered
  by checking the checkbox. The gradient sub-fields (entity picker, low/high value and colour
  inputs, mode dropdown, live preview strip, "Remove gradient" button) now appear immediately
  when "Enable value gradient" is checked.

- **BUG-2 — `wave_lateral` snaps to start position at end of each cycle**: Rewrote the
  lateral-wave phase calculation to use a continuously incrementing value driven by
  `performance.now()` (wall-clock elapsed time), never resetting. Each particle is offset
  by `2π / particle_count` around the wave cycle so all particles together form a smooth
  snake pattern. Previously the phase was derived from the animation-cycle progress, which
  reset to zero at cycle boundaries causing a visible snap.

- **BUG-3 — `wave_spacing` visually indistinguishable from `clustered`**: Rewrote the
  `wave_spacing` mode to distribute all N particles across the full path length
  simultaneously using a spatial density function evaluated each rAF frame. Particle `i`
  is placed at normalised path position `(i/N + time*speed) + sin((i/N+…) * 2π * freq) *
  amp * (1/N)`, sorted ascending to prevent crossing. The result is a visible travelling
  wave of density — dense clusters and sparse gaps visible across the whole path at once.
  Previously `wave_spacing` used static `animateMotion begin=` offsets identical to
  `clustered`.

- **BUG-4 — `pulse` visually identical to `wave_spacing`**: Rewrote the `pulse` mode to
  produce a heartbeat/pump-stroke effect driven by the rAF loop. Particle spacing compresses
  abruptly toward zero during the bunched phase (`cyclePos < pulse_ratio`), then expands
  gradually back to even spacing over the remainder of the cycle. The `begin=` offsets of
  all `<animateMotion>` elements are updated every frame. The visual result is now clearly
  different from both `clustered` (constant group structure) and `wave_spacing` (smooth
  sinusoidal variation).

- **BUG-5 — `line_style: diagonal` still rendered as `corner`**: Confirmed the `diagonal`
  path builder in `polylineToSvgPathStyled` was already generating direct `M … L … L …`
  SVG commands. Added unit tests for all four line styles (`diagonal`, `corner`, `curve`,
  `smooth`) to lock in the correct behaviour. The `curve` implementation (Catmull-Rom to
  cubic Bézier) was also hardened against potential variable-shadowing issues introduced
  in v1.0.14.1.

## [1.0.14.1] — 2026-04-28

### Fixed

- **BUG-1 — `custom_svg` warning message**: Improved the `console.warn` when
  `particle_shape: custom_svg` is configured but `custom_svg_path` is empty or
  missing. Message now includes the flow id:
  `[FlowMe] particle_shape is custom_svg but custom_svg_path is empty or invalid — falling back to circle. Flow: <flowId>`

- **BUG-2 — Value gradient editor sub-fields not appearing**: When "Enable value
  gradient" was checked, no additional fields appeared because the `<details>`
  element was closed and LitElement's DOM diffing preserved the closed state.
  Fixed by:
  - Adding `?open=${enabled}` on the `<details>` so it opens automatically when
    the gradient is enabled.
  - Changed the condition to `${vg ? html`...` : nothing}` (checking the
    gradient object directly rather than `enabled && vg`) to ensure fields
    render immediately after the config update.
  - Changed default `mode` to `'both'` (was `'flow'`) per spec.
  - Reorganised layout: low/high value+colour fields are now side-by-side in a
    `gradient-row` div. Mode dropdown label changed to "Apply gradient to" with
    human-readable options ("Particles only", "Line only", "Particles and line").
  - Added a "Remove gradient" button inside the section.

- **BUG-3 — Particle spacing modes look identical**: Default sub-config values
  were too subtle to see a difference. Updated defaults:
  - `wave_lateral`: `wave_frequency` 1.0 → **2.0**, `wave_amplitude` 8 → **20 px**
  - `wave_spacing`: `wave_frequency` 1.0 → **2.0**, `wave_amplitude` 0.7 → **0.85**
  - `pulse`: `pulse_frequency` 1.0 → **1.5 Hz**, `pulse_ratio` 0.3 → **0.25**
  - `clustered`: `cluster_gap` 2.0 → **3.0×**

- **BUG-4 — `wave_lateral` oscillated along fixed Y axis**: Particles were
  always offset by `translateY` regardless of path direction, causing
  oscillation to be wrong on vertical and diagonal segments. Fixed:
  - Compute the path tangent at each particle's position using
    `SVGPathElement.getTotalLength()` + `getPointAtLength()`.
  - Derive the perpendicular (normal) vector: `(-dy, dx)` normalised.
  - Apply the sine offset along the perpendicular: `translate(nx*offset, ny*offset)`.
  - Falls back to fixed Y offset if `getTotalLength()` is unavailable (JSDOM/SSR).

- **BUG-5 — `line_style: curve` rendered as straight lines**: The cubic Bézier
  control points were placed 1/3 along each segment making the curve
  indistinguishable from a straight line (diagonal). Fixed with a proper
  **Catmull-Rom → cubic Bézier** conversion:
  - Build augmented point array with ghost start/end for natural tangents.
  - For each segment `P[i]→P[i+1]`:
    - `CP1 = P[i]   + (P[i+1] - P[i-1]) / 6`
    - `CP2 = P[i+1] - (P[i+2] - P[i])   / 6`
  - Particles follow the exact same bezier path via `animateMotion <mpath>`.
  - Debug log added: `rlog('skeleton: ... | line_style=', ...)` visible when
    `debug: true` in the card config.

- **BUG-6 — Value gradient debug logging**: Added detailed `dlog` output (shown
  when `debug: true`) whenever a gradient colour is computed:
  `[gradient] <flowId> entity value: <raw> clamped: <clamped> range: <lo>–<hi> colour: <hex>`

## [1.0.14] — 2026-04-28

### Added

- **SHAPE-1 — `custom_svg` particle shape**: Flows can now use an arbitrary SVG
  path as the particle shape, e.g. a lightning bolt, leaf, or house icon.
  - Add `particle_shape: custom_svg` and `custom_svg_path: "M 0 -8 L 5 8 L -5 8 Z"` to
    a flow's `animation:` block. The path `d=` string is used as-is.
  - The shape is automatically scaled to fit the configured `particle_size`/`dot_radius`
    bounding box via `getBBox()` (falls back gracefully in test environments).
  - `animateMotion rotate="auto"` keeps the shape tangent to the path direction.
  - Supported for `dots` and `trail` styles only; other styles fall back to `circle`
    with a `console.warn`.
  - Editor UI: when `custom_svg` is selected, a text input for the `d=` string appears
    with a 40×40 inline SVG live preview.

- **GRADIENT-1 — Value gradient colour interpolation**: A flow's particle or line colour
  can be driven by a secondary sensor entity value, interpolating in HSL colour space.
  - Add `value_gradient:` to a flow with `entity`, `low_value`, `high_value`,
    `low_color` (hex), `high_color` (hex), and optional `mode: flow | line | both`.
  - Colour updates on every `hass` state change; no additional interpolation lag.
  - Falls back to the flow's normal colour if the entity is unavailable/unknown.
  - Works with all `animation_style` values and all `particle_shape` values.
  - Editor UI: "Value gradient" collapsible section in the flow inspector with
    entity picker, low/high value and colour inputs, mode dropdown, and a live
    gradient preview strip.
  - Unit test: `tests/unit/value-gradient.test.ts` — 6 tests for
    `interpolateGradientColor` (at low, at high, midpoint, below clamp, above clamp,
    equal low/high fallback).

  **Example — HVAC temperature gradient:**
  ```yaml
  flows:
    - id: hvac_flow
      animation:
        animation_style: fluid
      value_gradient:
        entity: sensor.indoor_temperature
        low_value: 18
        high_value: 28
        low_color: "#1EB4FF"   # cool blue
        high_color: "#FF4500"  # hot orange
        mode: both
  ```

  **Example — solar power health:**
  ```yaml
  value_gradient:
    entity: sensor.solar_power
    low_value: 0
    high_value: 5000
    low_color: "#888888"
    high_color: "#FFD700"
    mode: flow
  ```

- **SPACING-1 — Extended particle spacing modes**: Six spacing modes are now
  fully rendered (previously `even`, `random`, `clustered` were schema-only):
  - **`even`** (default): equal intervals, unchanged.
  - **`random`**: randomised positions with minimum gap enforcement; offsets
    are re-randomised slowly every ~3 s for organic motion.
  - **`clustered`**: particles grouped into tight clusters separated by large
    gaps. Sub-config: `cluster_size` (default 3), `cluster_gap` (default 2.0×).
  - **`pulse`**: rhythmically bunching/spreading — all particles compress to the
    front `pulse_ratio` fraction of the cycle. Sub-config: `pulse_frequency` Hz
    (default 1.0), `pulse_ratio` 0–1 (default 0.3).
  - **`wave_spacing`**: sinusoidal density wave along the path — particles
    alternate between dense and sparse regions. Sub-config: `wave_frequency`
    (default 1.0), `wave_amplitude` 0–1 (default 0.7).
  - **`wave_lateral`**: particles oscillate perpendicular to the path direction
    (snake/sine-wave visual). Driven by `requestAnimationFrame`; limited to
    `dots`/`trail` styles. Sub-config: `wave_frequency` (default 1.0),
    `wave_amplitude` px (default 8).
  - All spacing modes are applied to `dots`, `arrows`, and `trail` animation styles.
  - Editor UI: spacing dropdown + conditional sub-config inputs. Preview strip
    shows a wavy animation for `wave_lateral`.

  **Example — clustered energy bursts:**
  ```yaml
  animation:
    animation_style: dots
    particle_spacing: clustered
    cluster_size: 4
    cluster_gap: 3.0
  ```

  **Example — lateral wave on fluid flow:**
  ```yaml
  animation:
    animation_style: trail
    particle_spacing: wave_lateral
    wave_frequency: 1.5
    wave_amplitude: 12
  ```

## [1.0.13.3] — 2026-04-28

### Fixed

- **BUG-1 — Rubber-band regression**: After rubber-band selection completed,
  the stage `click` event (synthesised immediately after `pointerup`) was firing
  `onStageClick` which cleared `selectedNodeIds = new Set()`, wiping the freshly
  selected nodes before they could render. Fixed by setting a
  `rubberBandJustSelected` flag in `onStagePointerUp` and checking it in
  `onStageClick` to skip the deselect on that one subsequent click.

- **BUG-2 — Shift+click never worked**: `onHandlePointerDown` called
  `event.preventDefault()`, which suppresses the browser's synthetic `click`
  event that fires after pointerdown+pointerup. The `@click` handler
  (`onNodeClick`) therefore never fired, so `event.shiftKey` was never checked.
  Fixed by:
  - Removing `event.preventDefault()` from `onHandlePointerDown`.
  - Adding `dragStartPx` / `dragMoved` fields. `onHandlePointerMove` sets
    `dragMoved = true` once the pointer travels > 4 px from the down position.
  - Moving all selection logic into `onHandlePointerUp`: if `!dragMoved` and
    target is a node, treat it as a click — check `event.shiftKey` and
    add/remove from `selectedNodeIds` (shift) or replace selection (plain).
  - `onNodeClick` (`@click` handler) is now only responsible for the
    `add-flow` pending workflow that requires a true `click` event.

- **BUG-3 — Suggest Path still greyed out**: Consequence of BUG-2. Once
  shift+click selection is written to `selectedNodeIds` correctly, the toolbar
  binding `?disabled=${this.selectedNodeIds.size !== 2}` evaluates live on each
  LitElement re-render and the button activates correctly.

## [1.0.13.2] — 2026-04-28

### Fixed

- **BUG-1 — Shift+click multi-select not working**: Shift+clicking a second node
  was silently broken because `suggestNodeIds` (a separate state array) was the
  source of truth for the Suggest Path button, while `selectedNodeIds` (the `Set`)
  was updated correctly but never read by the toolbar or `runSuggestPath`. The two
  states drifted out of sync on every interaction.
  - Removed `suggestNodeIds` state entirely.
  - `selectedNodeIds: Set<string>` is now the **single source of truth** for all
    selection state. The toolbar `suggestPathDisabled` binding now reads
    `selectedNodeIds.size !== 2` directly; `runSuggestPath` reads
    `Array.from(selectedNodeIds)`.
  - Shift+click now creates a **new `Set` reference** on every change so LitElement
    reactivity triggers a full re-render immediately.
- **BUG-2 — Rubber-band rings not appearing**: Rubber-band `onStagePointerUp` was
  already setting `selectedNodeIds` correctly, but because the toolbar was reading
  the stale `suggestNodeIds`, the Suggest Path button appeared greyed out even when
  2 nodes were caught. With `suggestNodeIds` removed this is fixed.
- **BUG-3 — Suggest Path always greyed out**: Root cause was the stale-closure /
  split-brain bug described in BUG-1. Fixed by unifying on `selectedNodeIds`.
- **BUG-4 — Selection ring styling**: Added `.handle.in-selection` CSS class applied
  to every selected node (single or multi). Ring is a `box-shadow` white outline
  `4px` outside the node dot with a `2px` white band and a semi-transparent
  accent glow. Rings are removed immediately when deselected because the class is
  derived from `selectedNodeIds.has(node.id)` on every render.
- **Debug logging**: Added `config.debug`-gated `console.log` statements to
  `onNodeClick`, Shift+click branch, and rubber-band `onStagePointerUp` tracing
  selection state and suggest-path readiness.

## [1.0.13] — 2026-04-28

### Added

- **DEV-1 — Dev-server demo environment**: `npm run dev` now starts a local Vite dev
  server at `http://localhost:5173` with a full FlowMe card rendered in a mock HA
  environment. No Home Assistant installation required.
  - `src/dev/mock-hass.ts` — realistic mock `hass` object with 14 entities (solar,
    grid, battery, load, temperature, humidity, weather, sun, switch, camera).
    All sensor values update every 2 s with smooth variation patterns (solar ramp,
    load spikes, battery cycling).
  - `src/dev/demo-config.ts` — complete FlowMe config using all mock entities with
    multiple animation styles, weather state mappings and CSS gradient backgrounds
    (zero file setup required).
  - `src/dev/demo-app.ts` — demo entry point with a control panel: sliders for every
    sensor, weather/sun dropdowns, "Randomise all values" and "Reset to live data"
    buttons.
  - `README.md` "Development" section expanded with setup, dev server, build and test
    instructions.

- **SUN-1 — Sun-aware night background switching**: New optional `background.sun_entity`
  config field (e.g. `sun.sun`).
  - When `sun.state === 'below_horizon'` the current weather state has `-night` appended
    before lookup (e.g. `partlycloudy` → `partlycloudy-night`).
  - Integrations that already report native night states (e.g. `clear-night`) are handled
    correctly — `-night` is not appended again when the state already ends with it.
  - Fallback chain: exact night variant → `clear-night` → day image → `background.default`.
  - `hass` setter now watches `sun_entity` state changes and triggers background
    re-evaluation immediately on horizon crossing.
  - 18 new unit tests in `tests/unit/sun-night.test.ts` covering all scenarios.
  - Editor: sun entity picker added to the "Backgrounds & weather" panel with live
    "☀️ above horizon / 🌙 below horizon" status display.
  - `resolveNightBackground()` pure utility function exported from `src/utils.ts`.

- **P3-2 — Editor multi-select**:
  - **Shift+click** nodes to add/remove from selection set. Selection ring shows for
    all selected nodes.
  - **Rubber-band drag** on empty canvas selects all nodes whose centres fall within
    the drawn box (semi-transparent blue rectangle while dragging, applied on release
    if box > 2% in either axis).
  - **Escape** deselects all nodes, flows and overlays.
  - **Multi-select toolbar** appears when ≥ 2 nodes are selected with:
    - Suggest path (active only for exactly 2 nodes)
    - Hide selected / Show selected
    - Align horizontal / Align vertical (to first selected node)
    - Delete selected (with confirmation, removes connected flows)
    - Deselect button
  - **Bulk move**: dragging any selected node when multiple are selected moves all
    selected nodes together, preserving relative positions. Creates a single undo
    entry for the entire operation.
  - New editor commands: `bulkMoveNodes`, `bulkDeleteNodes`, `bulkSetNodesVisible`,
    `alignNodesHorizontal`, `alignNodesVertical`.

- **P3-4 — Animation quality pass**:
  - **Direction change deceleration**: when `smooth_speed: true` (default) and a flow
    value changes sign, the animation fades to opacity 0 in 150 ms then re-accelerates
    in the new direction over the next 150 ms (300 ms total), with no abrupt restart.
  - **Adaptive particle count**: for `dots` and `trail` styles when `particle_count` is
    not explicitly configured, the renderer tracks average frame time over 10 samples.
    If frames consistently exceed the fps budget by 20% the count is reduced by 1
    (minimum 1). If consistently under 80% budget it is gradually restored. Max one
    change per flow per second.
  - **rAF loop always active**: the `requestAnimationFrame` loop now starts unconditionally
    (previously only started when fps < 60) so that smooth_speed and direction change
    transitions always run even at the default 60 fps target.
  - **Bezier path continuity**: SVG `<animateMotion><mpath>` already follows the exact
    rendered bezier path — no approximation. No change required.
  - **Reconnect continuity**: SVG `animateMotion` engine maintains particle positions
    across `hass` reconnects because only the `dur` attribute changes. No change required.

### Changed

- `background.sun_entity` field added to `BackgroundConfig` type and validation.
- `src/editor/commands.ts`: added `setSunEntity`, `bulkMoveNodes`, `bulkDeleteNodes`,
  `bulkSetNodesVisible`, `alignNodesHorizontal`, `alignNodesVertical`.
- `resolveTargetBackground()` in `flowme-card.ts` now delegates to pure
  `resolveNightBackground()` from `utils.ts`.

## [1.0.12] — 2026-04-28

Dedicated animation release. Full animation style system, particle shapes, direction modes,
shimmer/flicker effects, global fps cap and smooth speed transitions.

**Patch (2026-04-28):** Flow selection and animation editor UI were missing from the initial
v1.0.12 release. Fixed in this patch: wide click hit-area on flow lines, selected-flow
highlight, Flows list sidebar panel, and the flow settings panel (including animation section)
is now accessible via the Flows list.

### Fixed (patch)

- **Flow selection**: Added invisible 20 px hit-area stroke behind every connector segment so
  lines are easy to click on both desktop and touch screens.
- **Selected flow highlight**: Selected segment now renders at 2.5 px with a blue glow/outline,
  making the active flow clearly visible.
- **Flows list panel**: New collapsible "Flows" section in the editor sidebar lists every
  configured flow with its colour dot, ID, node route, animation style badge, eye-icon toggle,
  and a click-to-select row that opens the flow settings inspector.
- **Add flow button**: "Add flow" button added to the Flows list panel, equivalent to the
  toolbar button.
- **Deselection**: Selecting a flow from the sidebar now clears any selected node or overlay,
  and vice versa.

### Added

- **ANIM-1 — Animation style system**: New `animation:` block per flow with 8 styles:
  - `dots` — filled particles (default, refactored from existing code)
  - `dash` — animated dashed stroke; `dash_gap` controls gap/dash ratio
  - `pulse` — expanding rings travelling along path; `pulse_width` controls stroke thickness
  - `arrow` — chevron-shaped particles that orient to direction of travel
  - `trail` — particles with fading elongated tail; `trail_length` controls tail length
  - `fluid` — continuous gradient-like stroke flowing along the line
  - `spark` — randomised-size particles with ±30% size variation and 0.5–1.0 opacity
  - `none` — static line only, no animation

- **Particle shapes**: `particle_shape` field (`circle` | `square` | `arrow` | `teardrop` | `diamond`).
  `square` rotates with path tangent. `arrow` always points in direction of travel.
  `teardrop` elongated along path direction. `diamond` stationary rotated square.
  Ignored for `dash`, `pulse`, `fluid`.

- **Direction modes**: `direction` field (`auto` | `forward` | `reverse` | `both`).
  `both` renders two independent particle sets on the same path simultaneously.

- **Shimmer**: `shimmer: true` — shows a slow (0.2×) low-opacity (0.3) animation when
  value is at/near threshold instead of hiding the flow completely.

- **Flicker**: `flicker: true` — subtle per-particle random ±15% opacity variation at
  2–8 Hz for electrical/energy realism.

- **Per-flow animation controls**: `particle_size` multiplier (0.5–3.0), `particle_count`
  override (suppresses burst logic when set), `glow_intensity` multiplier (0 disables glow).

- **Schema-only** (rendering in v1.0.13): `particle_spacing` (`even` | `random` | `clustered`).

- **ANIM-2 — Global animation settings**: New top-level `animation:` block:
  - `fps` (1–120, default 60): rAF-based frame-rate cap for power saving on always-on displays.
  - `smooth_speed` (boolean, default true): interpolates animation duration changes over 500ms
    using ease-in-out instead of restarting abruptly on sensor value changes.

- **ANIM-3 — Editor UI**: Collapsible "Animation" section in the flow inspector:
  - Live preview strip (full-width ~40px SVG) showing current style animating in real time.
  - `animation_style` dropdown, `particle_shape` dropdown (hidden for incompatible styles).
  - `direction` dropdown, `particle_size` slider, `particle_count` input, `glow_intensity` slider.
  - `shimmer` and `flicker` checkboxes.
  - Style-specific inputs: `pulse_width` (pulse), `trail_length` (trail), `dash_gap` (dash).
  - "Reset to defaults" button.
  - Global "Animation (global)" panel in sidebar for `fps` slider and `smooth_speed` toggle.

- **Validation**: All new fields validated in `validate-config.ts` with clear error messages.
- **Commands**: `setFlowAnimation`, `clearFlowAnimation`, `setAnimationConfig` in `editor/commands.ts`.

## [1.0.11] — 2026-04-28

Background weather switching full fix, 6 new Phase 2 features, and per-element visibility system.

### Fixed

- **BG-1 — Weather background switching**: Fixed a bug where HA sometimes passes the same `hass`
  object reference with mutated state inside, causing weather-based background swaps to be silently
  missed. The `set hass()` setter now explicitly compares the weather entity state value and calls
  `syncWeatherBackground()` immediately when it changes, without waiting for the LitElement reactive
  update cycle. Added `dlog` tracing for weather state received / image selected when `debug: true`.
  State matching is exact-string (no case transforms). Falls back to `background.default` only when
  no key matches. Added unit tests covering all 16 standard Met.no state→image mappings.

### Added

- **P2-1 — Flow line styles**: New `line_style` field on `FlowConfig` with four options:
  - `corner` — right-angle H→V routing between waypoints (default, preserves existing behaviour)
  - `diagonal` — straight lines at any angle between waypoints
  - `curve` — smooth cubic Bézier through waypoints using midpoint tangents
  - `smooth` — quadratic arc at each waypoint for rounded corners
  Added `polylineToSvgPathStyled()` to `utils.ts`. SVG `<animateMotion><mpath>` particles follow
  the same path shape natively. Editor flow inspector now includes a `<select>` dropdown for
  `line_style`. New `setFlowLineStyle` command.

- **P2-2 — Background fade default 5s**: Changed `DEFAULT_TRANSITION_MS` from 2000 ms to 5000 ms.
  Background fade transition duration input in the editor now shows seconds (0–30) and is correctly
  labelled. Stored in config as milliseconds.

- **P2-3 — Per-flow colour override in editor UI**: Flow inspector now includes a colour picker
  showing the effective colour with an "override" / "domain default" indicator and a "Clear" button.
  Added `setFlowColor` command. Also added a collapsible "Domain colours" panel with colour pickers
  for `solar`, `grid`, `battery`, `load` domain types, showing current override vs default.
  Added `setDomainColor` command.

- **P2-4 — Per-element visibility toggles**: Complete visibility system:
  - `visible?: boolean` field added to `NodeConfig` and `FlowConfig` (new, validated).
  - New top-level `visibility?: VisibilityConfig` block in `FlowmeConfig` with global layer toggles:
    `nodes`, `lines`, `dots`, `labels`, `values`, `overlays`.
  - Eye-icon buttons appear on node drag handles in the editor (hover/selected state).
  - Visibility checkbox added to flow inspector panel.
  - New "Visibility" collapsible panel in the editor sidebar for global layer toggles.
  - Global visibility applied via CSS custom properties (`--flowme-vis-*: none`) on the stage.
  - Per-node `visible: false` applies `display: none` inline. Per-flow `visible: false` applies
    `style.display = 'none'` on the SVG group in the renderer.
  - Commands: `setNodeVisible`, `setFlowVisible`, `setVisibility<K>`.

- **P2-5 — Weather states editor free-form**: Weather panel improvements:
  - "Current live state:" banner shows the live HA weather entity state and whether it is mapped.
  - "Standard Met.no state list" collapsible hint block with all standard state strings.
  - State keys are free-form — any custom integration state string is accepted.

- **P2-6 — Speed curve override editor UI**: New collapsible "Speed curve override" section in the
  flow inspector with inputs for `threshold`, `p50`, `peak`, `max_duration`, `min_duration`,
  `steepness`. Placeholders show resolved (effective) values. Domain profile unit label shown next
  to threshold/p50/peak inputs. Live preview row shows calculated animation duration at threshold,
  p50, and peak. "Reset to domain defaults" button clears the override.
  Commands: `setFlowSpeedCurveOverride`, `clearSpeedCurveOverride`.

- **Types**: `LineStyle` (`'corner' | 'diagonal' | 'curve' | 'smooth'`) and `LINE_STYLES` constant
  exported from `types.ts`. `VisibilityConfig` interface added. `visible?: boolean` on `NodeConfig`
  and `FlowConfig`. `line_style?: LineStyle` on `FlowConfig`. All new fields validated in
  `validate-config.ts`.

## [1.0.10] — 2026-04-27

Phase 1 correctness fixes: opacity editor UI, defaults editor UI, suggest-path workflow,
graceful handling of removed native overlay types, and HACS release process fix.

### Fixed

- **P1-1 — Opacity editor UI**: Added a collapsible "Opacity" panel to the visual editor exposing
  sliders (0.0–1.0) for: Background image, Background darkening, Nodes, Flow lines, Animated dots,
  Glow effect, Labels, Values, and Overlays (all custom overlays as a group).
  Per-node and per-flow opacity override sliders added to their respective inspector panels.
  Opacity values are stored in a new top-level `opacity:` config block (`OpacityConfig`) and applied
  via CSS custom properties on the stage (`--flowme-opacity-*`). Per-flow opacity is also applied
  directly to the SVG `<g>` element in the renderer. Per-node opacity applies inline to the node DOM.

- **P1-2 — Defaults editor UI**: Added a collapsible "Defaults" section to the visual editor
  exposing number inputs for: Node radius, Dot radius, Line width, Burst trigger ratio, Burst sustain
  (ms), and Burst max particles. All inputs are clamped to the specified ranges and commit a single
  undo-stack entry per edit.

- **P1-3 — Suggest path workflow**: Completely reworked the suggest-path flow.
  - Shift+click a node to add it to the suggest-path selection set (numbered badge 1/2 shown on node).
  - "Suggest path" button is **disabled** until exactly 2 nodes are selected, with an informative
    tooltip explaining the requirement.
  - Clicking "Accept" creates a **new flow** between the two selected nodes with the auto-routed
    waypoints and immediately opens the new flow in the inspector.
  - Clicking "Cancel" or clicking the stage background clears the selection.
  - Node badges and amber highlight ring show which nodes are queued.

- **P1-4 — Undo/redo**: Verified fully functional. Toolbar buttons, keyboard shortcuts (⌘Z / Ctrl+Z,
  ⌘⇧Z / Ctrl+Shift+Z), disabled states, and single-command-per-drag-on-pointerUp are all working.

- **P1-5/P1-6 — Removed overlay type safety net**: Configs containing `type: camera`, `type: switch`,
  `type: sensor`, or `type: button` no longer crash. The validator converts them to a migration-warning
  overlay that renders a visible red error at the overlay's position with the message:
  `"type: X was removed in v1.0.9. Replace with type: custom and a card: block."`.
  One ungated `console.warn` is logged per overlay with this issue.

- **P1-7 — Romanian strings**: Confirmed no Romanian strings remain in `src/`. All built-in UI strings
  are English.

- **Removed dead CSS**: Cleaned up all legacy native-overlay CSS rules (`.overlay-body`, `.overlay-switch`,
  `.camera-body`, `.camera-frame`, `.overlay-camera`, etc.) that were left over from v1.0.9.

### Added

- New `opacity?: OpacityConfig` field in `FlowmeConfig` (all fields optional, defaults to 1.0).
- New `opacity?: number` field on `NodeConfig` and `FlowConfig` for per-element overrides.
- New `_migration_warning?: string` field on `OverlayConfig` (internal, set by validator only).
- `setOpacity`, `setNodeOpacity`, `setFlowOpacity` editor commands.
- `setDefault` editor command for writing to the `defaults:` block.

### Changed

- `hacs.json` updated to spec: `name: "FlowMe"`, `filename: "flowme-card.js"`, `content_in_root: false`.
- CARD_VERSION bumped to `1.0.10`.

---

## [1.0.9] — 2026-04-27

Strategic overlay refactor and debug-logging gate.

### BREAKING CHANGES

- **All native overlay types removed** (`camera`, `switch`, `sensor`, `button`). Only `type: custom` is supported from this version onward. Migrate by wrapping entity display in a standard HA card, e.g.:

  ```yaml
  # Before (removed)
  overlays:
    - type: camera
      entity: camera.front_door
      position: { x: 80, y: 50 }
      size: { width: 20, height: 15 }

  # After (v1.0.9+)
  overlays:
    - type: custom
      position: { x: 80, y: 50 }
      size: { width: 20, height: 15 }
      card:
        type: picture-entity
        entity: camera.front_door
        show_name: false
  ```

- **`card_config:` renamed to `card:`** on custom overlays. Update all existing configs.
- **`defaults.camera_refresh_interval`** removed (camera overlay type gone).
- **`tap_action`, `entity`, `label`, `refresh_interval`, `offline_label`** removed from `OverlayConfig`.

### Added

- `card: <ha-card-config>` on custom overlays — accepts any installed Lovelace card type.
- `visible: false` on overlays — hides the wrapper with `display: none`.
- `opacity: 0–1` on overlays — CSS opacity applied to the wrapper element.
- `debug: true` top-level config flag — gates ALL `console.log`/`console.warn` output. Default `false` = silent production operation. `console.error` always fires.
- `setOverlayVisible` and `setOverlayOpacity` editor commands.

### Changed

- Overlay position now anchors at **top-left** corner (`left: x%, top: y%`). Previously centred.
- `getStubConfig()` includes one example `custom` overlay with `card: { type: entity, entity: sensor.example_sensor }`.
- Debug `setTimeout` blocks in `firstUpdated` removed entirely.
- `syncCameraTimer` removed from `flowme-card.ts`.
- All renderer diagnostic logging (`rlog`) now routes through `dlog` and is gated by `config.debug`.

## [1.0.8] — 2026-04-27

Security and hardcoding audit cleanup. No new rendering features.

### Security fix (CRITICAL)

**C1** — `DEBUG_WATCH_ENTITIES` in `flowme-card.ts` hardcoded five private home-sensor entity IDs (`sensor.sirbu_dumitra_*`) which ended up in the compiled bundle. The fixed code derives the watch list dynamically from the card's own config (flows, nodes, overlays, weather entity) so no personal entity IDs are ever embedded in the source.

### Added — `defaults:` top-level config block

A new optional `defaults:` block lets users tune card-level rendering behaviour without touching individual flows or nodes. All fields are optional; built-in values remain unchanged when omitted:

```yaml
defaults:
  node_radius: 12           # node dot size in px (was hardcoded)
  camera_refresh_interval: 10  # seconds; also overrideable per-overlay
  burst_trigger_ratio: 0.9  # fraction of peak that enters burst mode
  burst_sustain_ms: 5000    # ms above trigger before burst activates
  burst_max_particles: 20   # particle cap in burst mode
  dot_radius: 5             # flow dot/circle radius in px
  line_width: 2             # flow outline stroke width in px
```

### Added — `domain_colors:` top-level config block

Overrides the built-in energy id-pattern defaults without having to set `color:` on every flow:

```yaml
domain_colors:
  solar: "#FFD700"    # built-in default
  grid: "#1EB4FF"
  battery: "#32DC50"
  load: "#FF8C1E"
```

Partial overrides are allowed. Keys not set fall through to the built-in defaults.

### Added — per-camera-overlay `refresh_interval` and `offline_label`

```yaml
overlays:
  - type: camera
    entity: camera.my_camera
    position: { x: 50, y: 50 }
    refresh_interval: 30      # override defaults.camera_refresh_interval
    offline_label: "Camera offline"  # shown in placeholder tooltip; default ""
```

`refresh_interval` and `offline_label` are only valid on `type: camera` overlays; the validator rejects them on other types.

### Fixed — medium/low audit findings

- **M7** — Editor overlay entity placeholder strings changed from opinionated names (`sensor.indoor_temperature`, `switch.porch_light`, `camera.front_door`, `script.bedtime`) to clearly generic `sensor.my_power_sensor`, `switch.my_switch`, `camera.my_camera`, `script.my_script`.
- **M8** — Weather entity picker placeholder changed from `weather.home` to `weather.forecast_home` (the most common HA default). The value is placeholder text only and is never auto-saved to config.
- **M9** — Houdini worklet fallback particle colour changed from `#A78BFA` (purple — domain colour for generic/hvac) to `#FFFFFF` (white) so the fallback has no semantic hue that could confuse colour debugging.
- **L9** — `'camera offline'` hardcoded English string removed from the camera placeholder `title` attribute. The `offline_label` overlay config field replaces it; the default is an empty string (icon only, no text).

### Tests

- `tests/unit/validate-config.test.ts` — `defaults` block (full and partial), `burst_trigger_ratio > 1`, non-positive values, `domain_colors` full and partial, camera overlay `refresh_interval` / `offline_label`, `refresh_interval` rejection on non-camera type.
- `tests/unit/flow-profiles.test.ts` — `domainColors` parameter override (full and partial).
- `tests/smoke/flowme-card.smoke.test.ts` — C1 fix (no `sirbu`/`dumitra` in class source), `domain_colors` override flows to node fill, `defaults.node_radius` applied to node dot.

## [1.0.7] — 2026-04-27

Two visual fixes reported on top of v1.0.6: every flow and node was rendering in the energy profile's positive default colour, and node circles drifted upward whenever their value/label was toggled on. Both are now resolved by introducing a single colour-resolution helper and pinning the node's CSS anchor to the dot's centre.

### Added — `flow.color` shorthand and id-pattern defaults

Flows can now set a single `color:` field as a shortcut that applies to both directions:

```yaml
flows:
  - id: solar1
    from_node: pv1
    to_node: inverter
    entity: sensor.pv1_power
    color: "#FFD700"
```

Resolution order (highest precedence first), applied identically by both renderers and by the node-fill walk:

1. `flow.color_positive` / `flow.color_negative` — direction-specific override.
2. `flow.color` — shorthand applied to both directions.
3. `defaultDomainFlowColor(domain, flow.id)` — built-in residential defaults (energy domain only):
   - `solar*`, `pv*`, `pv_string_*` → `#FFD700` (gold)
   - `grid*`, `grid_flow`, `grid_power` → `#1EB4FF` (blue)
   - `battery*`, `batt*` → `#32DC50` (green)
   - `load*`, `consumption*`, `house*` → `#FF8C1E` (orange)
4. `profile.default_color_positive` / `profile.default_color_negative` — profile fallback.

Pattern matching is word-boundary aware so `solarium_temperature` and `overload_count` do **not** trigger.

### Fixed — nodes adopt their connected flow's colour

`nodeFlowColor` now resolves through the same helper for every flow that touches the node, then:

- if all connecting flows resolve to the same colour, the node adopts it;
- if multiple distinct colours connect (the inverter case in a residential energy diagram), the node renders in the new `NEUTRAL_NODE_COLOR` (`#CCCCCC`) so it stops claiming any single flow's hue;
- if no flow touches the node, it falls through to the profile default as before.

Combined with the id-pattern defaults this means a typical residential energy config now renders solar nodes gold, grid nodes blue, battery nodes green, load nodes orange and the inverter neutral grey — all without any explicit `color:` config.

`node.color` still wins when set explicitly.

### Fixed — node circle stays anchored at (x%, y%)

The `.node` wrapper used `transform: translate(-50%, -50%)`, which centred the *entire flex column* (dot + label + value) on the configured point. Toggling `show_value` or adding a label therefore shifted the dot upward, breaking alignment with house-photo backgrounds the user had calibrated against.

The wrapper now exposes a `--flowme-dot-size` CSS variable (set inline from `node.size`) and uses `transform: translate(-50%, calc(var(--flowme-dot-size, 12px) / -2))` instead. The dot is the wrapper's first flex child at y = 0, so this offset puts the dot's *centre* on the configured point regardless of whether the column also contains a label or value, which now flow downward from that fixed anchor.

### Tests

- `tests/unit/flow-profiles.test.ts` — `defaultDomainFlowColor` patterns (solar/pv/grid/battery/load), `resolveFlowColor` precedence chain (explicit ↦ shorthand ↦ id-pattern ↦ profile), domain isolation (id patterns only fire for energy).
- `tests/unit/validate-config.test.ts` — `flow.color` shorthand parses through to the validated config.
- `tests/smoke/flowme-card.smoke.test.ts` — solar node renders gold without explicit colour, inverter node connecting to four distinct flow colours falls back to `#CCCCCC`, `flow.color` shorthand overrides id-pattern defaults, and the `.node` wrapper carries `--flowme-dot-size` plus the configured `left`/`top` so the dot centre stays anchored.

## [1.0.6] — 2026-04-27

Speed-curve rework: the v1.0.5 logarithmic curve is replaced by a sigmoid in log10-value space, parameterised per domain by percentile anchors (`threshold`, `p50`, `peak`) and overrideable per flow.

### Changed — unified sigmoid curve

Every profile now uses the same shape function:

```
v      = max(|value|, threshold)
ratio  = log10(v / p50)
factor = 1 / (1 + exp(-steepness * ratio))
ms     = max_duration - factor * (max_duration - min_duration)
```

Universal constants (overrideable per flow):

- `max_duration = 9000` ms — at and below `threshold`, animation reads as a slow, visible trickle.
- `min_duration = 700` ms — asymptote the sigmoid approaches at large magnitudes.
- `steepness   = 1.5`     — controls how sharply the curve transitions through `p50`.

Per-domain calibration:

| Domain   | `threshold` | `p50` | `peak`  | Units  |
| -------- | ----------- | ----- | ------- | ------ |
| Energy   | 30          | 800   | 10 000  | W      |
| Water    | 0.3         | 6     | 60      | L/min  |
| Network  | 0.05        | 50    | 10 000  | Mbps   |
| HVAC     | 5           | 200   | 3 000   | CFM    |
| Gas      | 0.005       | 0.5   | 10      | m³/h   |
| Generic  | 1           | 100   | 10 000  | —      |

The sigmoid is *asymptotic at the upper end* — values past `peak` keep getting faster but never reach `min_duration`. Burst-density mode (introduced in v1.0.5) compensates: sustained magnitudes ≥ 0.9 × `peak` for ≥ 5 s now multiply particle count by `burst_density_multiplier` (default 1.5, capped at 20). Burst now reads its trigger from the *resolved* peak, so per-flow overrides flow through correctly.

### Added — per-flow `speed_curve_override`

Every parameter of the curve is independently overrideable per flow, falling back to the profile, then to the universal constants. Useful for tuning a single sensor without forking a profile:

```yaml
flows:
  - id: ev_charger
    entity: sensor.ev_charger_power
    domain: energy
    speed_curve_override:
      threshold: 50
      p50: 1500          # higher median for an EV-only sensor
      peak: 11000        # 11 kW residential charger ceiling
      max_duration: 8000
      min_duration: 600
      # steepness optional; defaults to 1.5
```

Resolution order for any field: `speed_curve_override.X` → profile.X → universal constant. The legacy `flow.threshold` shortcut still works as `speed_curve_override.threshold` (the override field wins when both are set), so existing configs need no changes.

### Removed

- `FlowProfile.speed_range_min` / `speed_range_max` / `visibility_threshold` — replaced by `threshold` / `p50` / `peak`.
- `logCurveDuration()` — replaced by `sigmoidSpeedCurve()` and the `resolveSpeedCurveParams()` helper.

These are internal API changes; the public YAML schema is backward-compatible (only additive — `speed_curve_override` is new, everything else still works).

### Validation

`speed_curve_override` blocks are validated:

- Numeric fields must be finite. `threshold`, `p50`, `peak` and `steepness` must be `> 0`. Durations must be `≥ 50` ms.
- `min_duration < max_duration` when both are set.
- Unknown keys are rejected so typos like `stepness` surface immediately.

### Files touched

`src/types.ts`, `src/utils.ts`, `src/flow-profiles/{energy,water,network,hvac,gas,generic}.ts`, `src/animation/svg-renderer.ts`, `src/animation/houdini-renderer.ts`, `src/validate-config.ts`, `src/flowme-card.ts` (CARD_VERSION), `package.json`, `tests/unit/flow-profiles.test.ts`, `tests/unit/validate-config.test.ts`.

## [1.0.5] — 2026-04-26

Residential recalibration: every domain now shares one logarithmic speed curve, bounded between a visibly-alive slowest duration and a brisk fastest, with a new burst-density mode for saturated flows.

### Changed — unified speed curve

All profiles now use a single shape function, `logCurveDuration(value, domain_min, domain_max, 4500, 600)`, parameterised per domain:

```
speed_factor = log10(value / domain_min) / log10(domain_max / domain_min)
duration_ms  = 4500 - speed_factor * (4500 - 600)
```

At or below `domain_min` → 4500 ms (slowest *visible* duration — still a living pulse, never the 8000 ms frozen look of v1.0.2). At or above `domain_max` → 600 ms (brisk without blurring). Logarithmic mid-range spreads evenly across each domain's residential operating envelope.

Per-domain calibration:

| Domain   | `speed_range_min` | `speed_range_max` | Typical residential coverage |
| -------- | ----------------- | ----------------- | ---------------------------- |
| Energy   | 50 W              | 10 000 W          | Idle-load cut-off → whole-house peak / EV charging |
| Water    | 0.5 L/min         | 50 L/min          | Dripping tap → shower + washing machine |
| Network  | 0.1 Mbps          | 10 000 Mbps       | Background chatter → 10 Gbps fibre |
| HVAC     | 10 CFM            | 2000 CFM          | Fan-off threshold → max residential ducted |
| Gas      | 0.01 m³/h         | 10 m³/h           | Pilot light → full central heating + cooker |
| Generic  | 1                 | 1000              | Sensible middle-ground for unknown domains |

Each profile's `visibility_threshold` defaults to its `speed_range_min`, so flows below the interesting range are hidden altogether (v1.0.4 had these drifting apart, which left 2 W LED bulbs drawing frozen-looking flows on the energy profile).

Custom per-flow `speed_multiplier` still applies on top of the curve output.

### Added — burst-density mode

When a flow's absolute magnitude stays at or above `0.9 × speed_range_max` for **≥ 5 seconds**, its particle count is multiplied by `profile.burst_density_multiplier` (default 1.5) and capped at 20 particles. Dropping below the 90% ratio resets the timer immediately. Implemented in `SvgRenderer.updateBurstState` with per-flow `burstEnteredAt` / `burstActive` tracking and a single `[FlowMe Renderer] burst ENTER / EXIT / PENDING` log per transition (not per `applyFlow`). Applies to `dot`, `square`, and `pulse` shapes; `wave` is a no-op until we add an amplitude boost.

### Added — APIs

- `logCurveDuration(value, domainMin, domainMax, maxDurationMs=4500, minDurationMs=600)` exported from `src/utils.ts`.
- `UNIVERSAL_MAX_DURATION_MS = 4500` and `UNIVERSAL_MIN_DURATION_MS = 600` constants for external tooling that wants the same bounds.
- `FlowProfile.speed_range_min: number` and `speed_range_max: number` (both required on every profile going forward).
- `FlowProfile.burst_density_multiplier?: number` (optional, defaults to 1.5, set to 1 to disable for a profile).

### Changed — debug logs preserved and expanded

All v1.0.3 `[FlowMe]` / `[FlowMe Renderer]` logs remain. Added:

- `applyFlow` log now includes `burstMultiplier` next to `dur` / `color` / `speedMult`.
- `updateBurstState` emits `burst PENDING` / `burst ENTER` / `burst EXIT` transitions with the exact magnitude, trigger ratio, and sustain time.
- `applyParticles` / `applyPulse` log the base / multiplier / final particle count when burst is active.

Per user instruction, the full debug channel stays in place until explicit removal.

### Fixed — distinct direction colours on water / gas / generic

Before v1.0.5 the `water`, `gas`, and `generic` profiles shipped with identical `default_color_positive` and `default_color_negative`, so a bidirectional sensor's sign flip was visible only via the direction-of-travel animation — and on `pulse` shapes (gas) it was invisible altogether because pulse is a symmetric expanding circle. Each negative colour is now distinct but kept inside the same domain-family palette:

| Domain  | Positive | Negative (new) | Rationale |
| ------- | -------- | -------------- | --------- |
| Water   | `#3B82F6` blue | `#06B6D4` cyan | Still reads as "water", clearly flipped |
| Gas     | `#FB923C` orange | `#A16207` dark amber | Warm/combustion family, unambiguous reverse |
| Generic | `#A78BFA` violet | `#34D399` emerald | Maximum-contrast pair for arbitrary bidirectional sensors |

`energy`, `hvac`, and `network` already shipped with distinct positive/negative colours and are unchanged.

### Tests

- Rewrote `tests/unit/flow-profiles.test.ts`: 20+ anchor-point tests across every profile driven by a shared `expectedDuration()` reference implementation, so any drift in the universal shape function lights the whole suite up. Explicit `speed_range_min` / `speed_range_max` / `burst_density_multiplier` declarations are also pinned.
- Added 5 dedicated tests for `logCurveDuration` covering clamp-low, clamp-high, log-midpoint, custom bounds, and defensive nonsense-range handling.
- Added 2 regression tests pinning distinct positive/negative colour pairs for every profile (both that they differ at all, and that the specific v1.0.5 choices for water/gas/generic don't silently drift).

139 → 152 tests. All pass.

## [1.0.4] — 2026-04-26

Energy profile recalibration for kW-reporting power sensors.

### Fixed

- **Flows appeared frozen on dashboards with kW sensors.** The energy `speed_curve` is defined over watts — `dur = clamp(8000 - log10(magnitude/10) * 2000, 400, 8000)` — but if a sensor reports `2.0` with `unit_of_measurement: 'kW'` the curve received `2` instead of `2000`, producing `log10(0.2) = -0.7` and clamping to the 8000 ms ceiling. The fix adds a per-profile `unit_scale` map; the card now reads `state.attributes.unit_of_measurement`, looks it up against the profile's scale table, and multiplies the raw parsed value into the profile's base unit before calling `renderer.updateFlow`. A 2 kW grid draw now reaches the curve as 2000 W and animates at ~3000 ms as expected. Unknown or missing units pass through unchanged so v1.0.2 configs that implicitly fed watts keep working.

### Added

- `FlowProfile.unit_scale?: Readonly<Record<string, number>>` — declares the unit → base-unit conversion table. Energy profile ships with `{ W: 1, Wh: 1, kW: 1000, kWh: 1000, MW: 1e6, mW: 1e-3 }`. Matching is case-insensitive and trimmed so HA locales that report `KW`, `kw`, or `" kW "` all resolve correctly. Other profiles can opt in the same way when their domains have common alternate units (MB/s vs Mbps for network, °F vs °C for HVAC — not implemented yet, just the mechanism is there).
- `scaleSensorValue(value, unitAttr, scaleMap)` utility alongside `parseSensorValue`, returning `{ value, factor, matchedUnit }` so the `[FlowMe]` debug channel can log exactly which unit was matched and what multiplier was applied next to every `updateFlow` call.
- New unit tests: six `scaleSensorValue` cases (kW, KW, kw, MW, mW, pass-through, identity-W) and a regression test on `energyProfile.unit_scale` pinning the four primary factors so the kW bug can never silently regress.

### Unchanged (for the record)

- Node value display still reads the sensor's native unit via `state.attributes.unit_of_measurement` and shows the native value (`1.5 kW`, not `1500 W`) — the unit scaling only runs on the renderer-input path, not on the display path. The "1 W W" doubled-unit guard added in v1.0.2 still applies.
- The `energy.speed_curve` formula itself is unchanged. The header comment used to claim anchor points of `100 W → 4000 ms` / `1000 W → 2000 ms`, but the code and the test-suite both always produced `6000` / `4000`. Comment rewritten to match reality (`10 W → 8000 / 100 W → 6000 / 1 kW → 4000 / 10 kW → 2000`, clamped to 400–8000 ms).

## [1.0.3] — 2026-04-26

**Diagnostic build.** No rendering logic was changed from v1.0.2 — only extensive `console.warn` instrumentation prefixed `[FlowMe]` and `[FlowMe Renderer]` was added so we can see the runtime values of every relevant code path while we track down the persistent "no animation / wrong colours / doubled units" report. The next patch release will contain the actual fix once the logs identify which stage is breaking.

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

- `.github/workflows/release.yml` now auto-detects hyphenated tags (e.g. `v1.1.0-beta`) and publishes them as GitHub prereleases — kept for future use even though v1.0.x remains full-release only.

### Next step

After installing this build, reload the dashboard with DevTools open, filter the console by `[FlowMe]`, and share the full output. The log points above are designed to pinpoint exactly one of: wrong renderer chosen, entity values not reaching the card, `applyFlow` hidden by threshold, `<animateMotion dur="...">` not updated, or `<mpath href="#flowme-path-*">` failing to resolve inside the shadow root. The next release will contain the actual fix.

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
