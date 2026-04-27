# flowme

A generic Home Assistant custom Lovelace card that overlays **animated flow lines** and **interactive overlays** on top of a user-supplied background image. Unlike existing single-domain energy-flow cards, flowme is **multi-domain** (energy, water, network, HVAC, gas, generic) and uses **arbitrary user-defined paths** drawn directly on your own background photo via a visual drag-and-drop editor.

> Status: **v1.0.1** — all six domain flow profiles, Houdini Paint renderer with SVG fallback, full drag-and-drop editor with undo/redo, one-click auto-routing via Sobel + A\*, weather-aware background crossfades, interactive overlays (sensor, switch, button, camera, custom card), HA Sections-view grid layout hints, native `<ha-entity-picker>` in the editor, 129 unit/smoke tests, strict config validation, signed GitHub releases.

- **Tested on** Home Assistant **2026.4.x**.
- **Minimum** Home Assistant version declared to HACS: **2024.1.0**.
- **License:** MIT.

---

## Table of contents

- [Why flowme](#why-flowme)
- [Installation (HACS)](#installation-hacs)
- [Installation (manual)](#installation-manual)
- [Quick start](#quick-start)
- [Config reference](#config-reference)
- [Per-domain examples](#per-domain-examples)
- [Editor](#editor)
- [Security model](#security-model)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [Roadmap](#roadmap)
- [License](#license)

---

## Why flowme

- **Visual coordinate editor** — drag nodes, waypoints and overlays directly on your background image. Undo/redo with `Cmd/Ctrl+Z` / `Cmd/Ctrl+Shift+Z`. Shift-drag snaps to an 8% grid. Shift-click a flow segment to insert a waypoint. Right-click anything to delete.
- **Auto-routing via image analysis** — select a flow, click **Suggest path**, and flowme runs Sobel edge detection on your background image followed by A\* over a coarse cost grid to propose waypoints that follow visible architectural features (pipes, walls, cable channels, pergolas). Preview then accept.
- **Interactive overlays** — drop sensor chips, switches, buttons and camera thumbnails anywhere on the background. Need something bespoke? Use a `custom` overlay to mount any Lovelace card inside flowme via `window.loadCardHelpers()`. All user-supplied card configs are scanned for unsafe URL schemes before they ever reach the DOM.
- **Houdini Paint API animation** with progressive enhancement — automatically falls back to native SVG `animateMotion` on browsers without the CSS Paint API. Append `?flowme_renderer=svg` to the dashboard URL to force the SVG path for debugging.
- **Weather-aware backgrounds** — bind `background.weather_entity` to any `weather.*` entity, map its states to images, and flowme crossfades between them.

## Installation (HACS)

HACS default-repository submission is live at `v1.0.0`. Until it's merged into the HACS default store:

1. HACS → **Frontend** → ⋮ → **Custom repositories**
2. Add `https://github.com/fxgamer-debug/flowme` as category **Dashboard**
3. Install **flowme**, then add the resource (HACS does this automatically for Dashboard plugins)
4. Refresh the dashboard → **Add card → Custom: flowme**

## Installation (manual)

1. Download `flowme-card.js` from the [latest release](https://github.com/fxgamer-debug/flowme/releases).
2. Copy it into your HA `/config/www/community/flowme/` directory.
3. In HA, go to **Settings → Dashboards → Resources** and add:
   ```
   /hacsfiles/flowme/flowme-card.js
   ```
   (or `/local/community/flowme/flowme-card.js` if you placed it under `/config/www/` manually)
   Resource type: **JavaScript Module**.
4. Refresh the dashboard, then **Add card → Custom: flowme**.

Every release ships a `flowme-card.js.sha256` alongside the bundle — verify it if you care.

## Quick start

```yaml
type: custom:flowme-card
domain: energy
background:
  default: /local/flowme/house.jpg
nodes:
  - id: grid
    position: { x: 10, y: 50 }
    label: Grid
  - id: house
    position: { x: 90, y: 50 }
    label: House
flows:
  - id: grid_to_house
    from_node: grid
    to_node: house
    entity: sensor.grid_power
```

Drop that into a dashboard, point `entity` at a real power sensor, then click the wrench icon → **Edit card** to rearrange nodes visually.

## Config reference

### Top-level

| Key                  | Type                                                         | Required | Description                                                                       |
|----------------------|--------------------------------------------------------------|----------|-----------------------------------------------------------------------------------|
| `type`               | `"custom:flowme-card"`                                       | yes      | Lovelace discriminator.                                                           |
| `domain`             | `"energy"` · `"water"` · `"network"` · `"hvac"` · `"gas"` · `"generic"` | yes      | Selects the flow profile (particle shape, colour, speed curve, unit label).       |
| `background`         | `Background`                                                 | no       | See below. Omit entirely for a neutral placeholder.                               |
| `nodes`              | `Node[]`                                                     | yes      | At least one node.                                                                |
| `flows`              | `Flow[]`                                                     | yes      | May be empty.                                                                     |
| `overlays`           | `Overlay[]`                                                  | no       | Interactive overlays on top of the background.                                    |
| `aspect_ratio`       | `"W:H"` string (e.g. `"16:10"`)                              | no       | Forces the card aspect. Defaults to `16:10`.                                      |
| `fullscreen`         | `boolean`                                                    | no       | Reserved; currently cosmetic.                                                     |
| `edit_mode_password` | `string`                                                     | no       | Gate the visual editor behind a prompt. UI only — not a security boundary.        |

### `Background`

| Key                   | Type                       | Description                                                                 |
|-----------------------|----------------------------|-----------------------------------------------------------------------------|
| `default`             | URL string                 | Base image. Optional — omit or set `""` to render a neutral placeholder. When set, must begin with `/local/`, `/api/`, `/hacsfiles/`, `https://` or `http://`. |
| `weather_entity`      | entity id                  | Optional. A `weather.*` entity whose `state` drives image swaps.            |
| `weather_states`      | `{ state: url }` object    | Map state strings (`sunny`, `rainy`, …) to alternate images.                |
| `transition_duration` | number (ms)                | Crossfade duration, default `2000`.                                         |

### `Node`

| Key          | Type                      | Description                                          |
|--------------|---------------------------|------------------------------------------------------|
| `id`         | non-empty string, unique  | Required.                                            |
| `position`   | `{ x: 0..100, y: 0..100 }`| Percent of card width/height.                        |
| `entity`     | entity id                 | Optional. Shown as the node value if `show_value`.   |
| `label`      | string                    | Optional.                                            |
| `color`      | CSS colour                | Optional.                                            |
| `size`       | number (px)               | Optional.                                            |
| `show_label` | boolean                   | Optional.                                            |
| `show_value` | boolean                   | Optional.                                            |

### `Flow`

| Key                 | Type                          | Description                                                     |
|---------------------|-------------------------------|-----------------------------------------------------------------|
| `id`                | non-empty string, unique      | Required.                                                       |
| `from_node`         | node id                       | Must resolve to an existing node.                               |
| `to_node`           | node id                       | Must resolve to an existing node.                               |
| `entity`            | entity id                     | The sensor feeding this flow's magnitude.                       |
| `waypoints`         | `Position[]` (optional)       | Percent-space intermediate points. Omit or set `[]` for a straight line from `from_node` to `to_node`. |
| `domain`            | domain enum                   | Optional per-flow override of the card-level domain.            |
| `color_positive`    | CSS colour                    | Optional override of the profile default.                       |
| `color_negative`    | CSS colour                    | Optional override for negative values.                          |
| `threshold`         | number                        | Values below abs(threshold) are treated as zero.                |
| `reverse`           | boolean                       | Flip flow direction regardless of sign.                         |
| `speed_multiplier`  | number in `[0.1, 5.0]`        | Scales the computed `dur_ms`.                                   |

### `Overlay`

| Key           | Type                                                              | Description                                                            |
|---------------|-------------------------------------------------------------------|------------------------------------------------------------------------|
| `id`          | non-empty string, unique                                           | Required.                                                              |
| `type`        | `"sensor"` · `"switch"` · `"button"` · `"camera"` · `"custom"`     | Required.                                                              |
| `entity`      | entity id                                                         | Required for `sensor`, `switch`, `camera`.                             |
| `position`    | `{ x: 0..100, y: 0..100 }`                                        | Top-left anchor in percent of card size.                               |
| `size`        | `{ width: 2..100, height: 2..100 }`                               | Optional; defaults are type-specific.                                  |
| `label`       | string                                                            | Optional; used for sensor chips / buttons.                             |
| `tap_action`  | `{ action: "toggle" \| "more-info" \| "none" }`                   | Optional override of the type-specific default.                        |
| `card_config` | any JSON object                                                    | Only valid when `type: custom`. Passed to `loadCardHelpers().createCardElement()`. Recursively scanned for unsafe URL schemes. |

## Per-domain examples

### Energy — whole-home grid/solar/battery

```yaml
type: custom:flowme-card
domain: energy
background:
  default: /local/flowme/house-iso.jpg
aspect_ratio: "16:10"
nodes:
  - id: grid
    position: { x: 8, y: 50 }
    label: Grid
  - id: solar
    position: { x: 50, y: 8 }
    label: Solar
  - id: battery
    position: { x: 92, y: 50 }
    label: Battery
  - id: house
    position: { x: 50, y: 92 }
    label: House
flows:
  - id: grid_house
    from_node: grid
    to_node: house
    entity: sensor.grid_power
  - id: solar_house
    from_node: solar
    to_node: house
    entity: sensor.solar_power
  - id: house_battery
    from_node: house
    to_node: battery
    entity: sensor.battery_charge_power
```

### Water — kitchen/bathroom loop

```yaml
type: custom:flowme-card
domain: water
background:
  default: /local/flowme/plumbing.jpg
nodes:
  - id: main
    position: { x: 6, y: 50 }
    label: Main
  - id: kitchen
    position: { x: 45, y: 30 }
    label: Kitchen
  - id: bathroom
    position: { x: 75, y: 70 }
    label: Bathroom
flows:
  - id: to_kitchen
    from_node: main
    to_node: kitchen
    entity: sensor.kitchen_flow
    threshold: 0.1
  - id: to_bathroom
    from_node: main
    to_node: bathroom
    entity: sensor.bathroom_flow
    threshold: 0.1
```

### Network — WAN/LAN/Wi-Fi

```yaml
type: custom:flowme-card
domain: network
background:
  default: /local/flowme/rack.jpg
nodes:
  - id: wan
    position: { x: 10, y: 50 }
    label: WAN
  - id: router
    position: { x: 40, y: 50 }
    label: Router
  - id: wifi
    position: { x: 75, y: 20 }
    label: Wi-Fi
  - id: lan
    position: { x: 75, y: 80 }
    label: LAN
flows:
  - id: wan_router
    from_node: wan
    to_node: router
    entity: sensor.wan_down_mbps
  - id: router_wifi
    from_node: router
    to_node: wifi
    entity: sensor.wifi_clients_throughput
  - id: router_lan
    from_node: router
    to_node: lan
    entity: sensor.lan_throughput
```

### HVAC — supply/return ducts

```yaml
type: custom:flowme-card
domain: hvac
background:
  default: /local/flowme/floorplan.jpg
nodes:
  - id: ahu
    position: { x: 50, y: 8 }
    label: AHU
  - id: living
    position: { x: 25, y: 50 }
    label: Living
  - id: bedroom
    position: { x: 75, y: 50 }
    label: Bedroom
flows:
  - id: supply_living
    from_node: ahu
    to_node: living
    entity: sensor.supply_cfm_living
  - id: supply_bedroom
    from_node: ahu
    to_node: bedroom
    entity: sensor.supply_cfm_bedroom
```

### Gas — boiler and stove

```yaml
type: custom:flowme-card
domain: gas
background:
  default: /local/flowme/boiler-room.jpg
nodes:
  - id: meter
    position: { x: 10, y: 50 }
    label: Meter
  - id: boiler
    position: { x: 60, y: 30 }
    label: Boiler
  - id: stove
    position: { x: 60, y: 70 }
    label: Stove
flows:
  - id: meter_boiler
    from_node: meter
    to_node: boiler
    entity: sensor.boiler_gas_flow
  - id: meter_stove
    from_node: meter
    to_node: stove
    entity: sensor.stove_gas_flow
```

### Generic — anything with a number

```yaml
type: custom:flowme-card
domain: generic
background:
  default: /local/flowme/whatever.jpg
nodes:
  - id: a
    position: { x: 15, y: 50 }
  - id: b
    position: { x: 85, y: 50 }
flows:
  - id: ab
    from_node: a
    to_node: b
    entity: sensor.mystery_meter
    color_positive: "#A78BFA"
    speed_multiplier: 1.5
```

### Overlays

```yaml
overlays:
  - id: temp_livingroom
    type: sensor
    entity: sensor.livingroom_temperature
    position: { x: 35, y: 40 }
    size: { width: 14, height: 8 }
    label: Living room

  - id: porch_light
    type: switch
    entity: switch.porch_light
    position: { x: 72, y: 18 }

  - id: front_cam
    type: camera
    entity: camera.front_door
    position: { x: 82, y: 62 }
    size: { width: 22, height: 15 }

  - id: weather_tile
    type: custom
    position: { x: 50, y: 85 }
    size: { width: 40, height: 12 }
    card_config:
      type: weather-forecast
      entity: weather.home
      show_current: true
      show_forecast: false
```

## Editor

Click the wrench on the card → **Edit card** to open the visual editor.

| Action                                 | Shortcut                          |
|----------------------------------------|-----------------------------------|
| Move a node / waypoint / overlay       | drag                              |
| Snap to 8% grid                        | hold **Shift** while dragging     |
| Add a node                             | click an empty spot on the stage  |
| Add a waypoint                         | **Shift**-click a flow segment    |
| Add an overlay                         | toolbar → **+ Overlay**           |
| Resize an overlay                      | drag bottom-right handle          |
| Delete anything                        | right-click on it                 |
| Undo / redo                            | **Cmd/Ctrl+Z** / **Cmd/Ctrl+Shift+Z** |
| Suggest a path between two nodes       | select a flow → **Suggest path**  |
| Toggle renderer (debug)                | append `?flowme_renderer=svg` or `?flowme_renderer=houdini` to the URL |

Every drag produces exactly one undo entry on pointer-up, not one per move event. The undo stack caps at 100 entries.

## Security model

- **Allowed URL schemes** for every image field: `/local/`, `/api/`, `/hacsfiles/`, `http://`, `https://`. Any other scheme is rejected at `validateConfig` time with a clear error.
- **Custom overlay card configs** are recursively scanned for `javascript:`, `vbscript:`, `data:` and `file:` URL schemes anywhere in the object graph. Rejection happens at both validation time AND mount time (belt-and-braces for runtime-mutated configs).
- **No `eval`, no `Function` constructor** — everything is statically analysable.
- **The editor password** is UI gating, not a security boundary. Anyone with YAML access can bypass it; treat it as a speed bump for unauthorised dashboard editors, not a real auth system.
- **CSS Paint Worklet** runs inside the worklet sandbox; the card's Houdini renderer passes only numeric progress values into it — never user strings.

## Troubleshooting

**Card says `flowme: invalid configuration`.**
The message includes the exact path that failed (e.g. `overlays[2].card_config.tap_action.url_path: unsafe URL scheme "javascript:"`). Fix that specific field.

**Animation is choppy.**
Append `?flowme_renderer=svg` to the URL. If SVG is smoother than Houdini, your browser's Paint Worklet is paying a surprising cost — file an issue with the browser version. Otherwise Houdini should be smoother on Chromium.

**Background image doesn't load.**
Check that your image URL begins with one of the allowed prefixes. If you're loading from `https://`, the remote server must allow your HA origin (CORS) — Sobel edge detection needs canvas read access, so images tagged as cross-origin by the browser will fail `getImageData`. Host images under `/local/` whenever possible.

**"Suggest path" throws a canvas-tainted error.**
Same CORS issue as above. Move the image under `/local/`.

**`custom` overlay shows "Cannot find card type: foo-card".**
The underlying Lovelace card must already be installed (via HACS or manually) before flowme can mount it. Install it normally, then reload your dashboard.

**HACS says "incompatible with your Home Assistant version".**
`hacs.json` declares `2024.1.0` as the minimum. Upgrade HA, or open an issue if you need older compatibility.

## Development

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
git clone https://github.com/fxgamer-debug/flowme
cd flowme
npm install
```

### Run dev server

```bash
npm run dev
# Opens http://localhost:5173
# Hot reloads on file changes
# No Home Assistant installation required
```

The dev server loads `src/dev/demo-app.ts` which renders a FlowMe card with a
realistic mock Home Assistant environment. All sensor values update automatically
every 2 seconds. Use the control panel on the right to override values, change
weather and sun state, or test animation at different speeds.

### Build

```bash
npm run build
# Output: dist/flowme-card.js
```

### Test

```bash
npm run test              # run all tests once
npm run test:watch        # watch mode
npm run test:coverage     # with coverage report
```

### All scripts

```bash
npm run dev                 # vite dev server at http://localhost:5173
npm run build               # produces dist/flowme-card.js
npm run type-check          # tsc --noEmit on src
npm run type-check:tests    # tsc --noEmit on tests
npm run lint                # eslint src
npm run test                # vitest run (235+ tests)
npm run test:watch          # vitest watch mode
npm run test:coverage       # vitest run --coverage
npm run check               # lint + type-check + type-check:tests + test + build
```

`dist/` is committed to the repo because HACS distributes the built bundle directly. CI enforces this — if you change source without rebuilding, CI will fail.

See [TESTING.md](TESTING.md) for the manual pre-release checklist and [HACS.md](HACS.md) for the HACS submission checklist.

## Roadmap

- **v0.1.0** — MVP: energy only, SVG renderer, minimal editor.
- **v0.2.0** — all six domain profiles, Houdini Paint renderer with SVG fallback, full drag-and-drop editor with undo/redo.
- **v0.3.0** — Sobel + A\* pathfinding, one-click "Suggest path".
- **v0.4.0** — weather-state background transitions.
- **v0.5.0** — interactive overlays (sensors, switches, buttons, cameras, arbitrary custom cards).
- **v1.0.0** — full test suite, polished docs, signed GitHub releases, HACS default-repository submission. ← **you are here**
- **v1.1+** — HVAC temperature-gradient colour, editor multi-select + "suggest path from exactly two selected nodes", better tap-action feedback (ripple + toast), a standalone `npm run dev` demo page.

## License

MIT — see [LICENSE](LICENSE).
