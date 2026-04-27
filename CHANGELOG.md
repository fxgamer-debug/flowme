# Changelog

All notable changes to flowme are documented here. Format loosely follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
