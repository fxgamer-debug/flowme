# FlowMe

> Animated flow visualisation with freely positioned nodes for Home Assistant

![FlowMe preview](docs/flowme-preview.png)

A custom Lovelace card that renders animated flow visualisations between freely positioned nodes over a configurable background. Supports multiple flow domains, rich animation styles, weather-reactive backgrounds, and a fully visual drag-and-drop editor.

---

## How FlowMe was built

FlowMe is the result of a three-way collaboration:

- **Human** — product vision, design decisions, feature priorities, testing and direction
- **Claude (Anthropic)** — research, architecture, specifications and prompt engineering
- **Cursor** — code implementation, auditing and building

Every feature was human-directed, AI-researched, and AI-coded. No line of production code was written by hand.

---

## Features

**Recent highlights**

- **Editor tabs** (v2.6) — Card, Nodes, Flows, Overlays, Settings below the toolbar; collapse toggle for the canvas
- **Transparent mode** (v2.5.3) — Theme shows through when `background.transparent: true` or default URL omitted
- **Smooth speed interpolation** (v2.7.3) — Cycle duration ramps toward new sensor targets instead of jumping (fewer visible restarts)
- **Selective flow updates** (v2.7.4) — Only flows whose scaled entity value changed get `updateFlow`; stable flows keep animating when another sensor updates
- **Linear speed curve** (v2.2) — Sensor magnitude maps to animation speed with configurable min/max duration
- **Flow `label`** (v2.3) — Optional display label per flow (inspector and ARIA)
- **Background image browser** (v2.3) — Pick images from a configured `media_dirs` folder in the editor
- **Animated backgrounds** (v2.4) — GIF, animated WebP, APNG as backgrounds
- **Six domains** — Energy, water, network, HVAC, gas, generic with calibrated peaks and profiles

**Core behaviour**

**Freely positioned nodes.** Nodes can be placed anywhere on the canvas as a percentage position. No fixed grid or forced layout.

**Animated flow lines.** Flows connect nodes with animated particles. Styles: dots, dash, arrow, trail, fluid, none. Direction follows sensor sign automatically (`direction: both` for dual streams).

**Multi-domain support.** Built-in profiles for energy, water, network, HVAC, gas and generic domains.

**Weather-reactive backgrounds.** Background image switches based on HA weather entity state; sun entity for day/night variants.

**Visual drag-and-drop editor.** Zoom, pan, node dragging, waypoint editing, suggest path (A\* + Sobel), undo/redo, multi-select.

**Value gradient.** Flow colour interpolates from a secondary sensor (e.g. HVAC, battery, grid frequency).

**Node effects.** Glow, badge, ripple, alert on nodes.

**Custom overlays.** Embed any HA card on the canvas (`type: custom`).

**Particle spacing.** Even, random, clustered, pulse, wave_spacing, wave_lateral.

**Custom SVG particles.** User-supplied SVG path stamped along the path.

**i18n.** Drop `/local/flowme/translations/{lang}.json` to override strings.

**Accessibility.** ARIA labels, focus outlines, reduced-motion handling.

**Single file.** One `flowme-card.js`; pathfinding worker inlined.

---

## Recommended companion

FlowMe adapts to your Home Assistant theme automatically. For the strongest dynamic colours, install [Material You Utilities](https://github.com/addoyle/material-you-utilities), which enables colour extraction from your wallpaper.

---

## Installation

### HACS (recommended)

1. Add this repository as a custom repository in HACS: `https://github.com/fxgamer-debug/flowme`

2. Search for FlowMe in HACS → Frontend

3. Download and restart Home Assistant

4. Add the card via the Lovelace card picker or YAML configuration

### Manual

1. Download `flowme-card.js` from the latest release on GitHub

2. Place it in `/config/www/` (or another path you expose under `/local/`)

3. Add to Lovelace resources:

   ```yaml
   url: /local/flowme-card.js
   type: module
   ```

4. Restart Home Assistant

---

## Quick start

Minimal configuration to get started:

```yaml
type: custom:flowme-card
domain: energy
background:
  default: /local/my-background.jpg
nodes:
  - id: solar
    position: { x: 30, y: 20 }
    entity: sensor.solar_power
    label: Solar
  - id: home
    position: { x: 60, y: 50 }
    entity: sensor.load_power
    label: Home
flows:
  - id: solar_to_home
    from_node: solar
    to_node: home
    entity: sensor.solar_power
```

---

## Background images

Place your background images in `/config/www/community/flowme/backgrounds/`. They are served at URLs such as `/local/community/flowme/backgrounds/filename.jpg`.

To enable the visual image browser in the FlowMe editor, add this to your `configuration.yaml`:

```yaml
homeassistant:
  media_dirs:
    flowme: /config/www/community/flowme/backgrounds
```

Then restart Home Assistant. The **Browse** button in the editor will show thumbnails of all images in that folder.

Without this setup, you can still enter background image URLs manually.

### Animated backgrounds

FlowMe supports animated background images (GIF, animated WebP, APNG). Place the file in `/config/www/community/flowme/backgrounds/`, then set the URL as usual, for example:

```yaml
background:
  default: /local/community/flowme/backgrounds/rain.gif
```

Suggested upper bounds for smooth performance: GIF under 2MB; animated WebP under 1MB; APNG under 1MB (WebP often looks better than GIF at a smaller size).

---

## Configuration

### Top-level options

| Option        | Type    | Default        | Description                                      |
| ------------- | ------- | -------------- | ------------------------------------------------ |
| `domain`      | string  | `energy`       | Flow domain: `energy`, `water`, `network`, `hvac`, `gas`, `generic` |
| `debug`       | boolean | `false`        | Enable console logging                          |
| `aspect_ratio`| string  | (image native) | Canvas aspect ratio, e.g. `16:10`               |
| `fullscreen`  | boolean | `false`        | Panel / fullscreen style                        |
| `edit_mode_password` | string | —        | Optional password before the visual editor opens |

### Background

| Option                        | Type   | Description |
| ----------------------------- | ------ | ----------- |
| `background.default`          | string | Default background image URL |
| `background.weather_entity`   | string | Weather entity ID for state-based images |
| `background.sun_entity`       | string | Sun entity (e.g. `sun.sun`) for night variant keys |
| `background.transition_duration` | number | Crossfade duration in **milliseconds** (default 5000 if omitted) |
| `background.weather_states`   | object | Map of weather state → image URL |
| `background.transparent`      | bool   | When `true`, transparent card chrome and hide background imagery; URLs stay in config (default `false`) |

### Transparent background

Use **`background.transparent: true`** when you want the Lovelace theme to show through: the card uses a transparent host and does not paint the default or weather-driven background layers, while your URLs remain in YAML for when you set the flag back to `false`. You can also omit or leave **`background.default`** empty for a transparent card without setting the flag.

### Nodes

| Option        | Type    | Description |
| ------------- | ------- | ----------- |
| `id`          | string  | Unique node identifier |
| `position.x`  | number  | Horizontal position 0–100% |
| `position.y`  | number  | Vertical position 0–100% |
| `entity`      | string  | HA entity for value display |
| `label`       | string  | Display label |
| `show_value`  | boolean | Show sensor value |
| `color`       | string  | Override node colour |
| `node_effect` | object  | Node effect configuration (`glow`, `badge`, `ripple`, `alert`) |

### Flows

| Option            | Type   | Description |
| ----------------- | ------ | ----------- |
| `id`              | string | Unique flow identifier |
| `from_node`       | string | Source node ID |
| `to_node`         | string | Destination node ID |
| `entity`          | string | Sensor entity driving the flow |
| `animation_style` | string | `dots` \| `dash` \| `arrow` \| `trail` \| `fluid` \| `none` |
| `particle_shape`  | string | `circle` \| `square` \| `arrow` \| `teardrop` \| `diamond` \| `custom_svg` |
| `direction`       | string | `auto` \| `forward` \| `reverse` \| `both` |
| `line_style`      | string | `corner` \| `diagonal` \| `curve` \| `smooth` |
| `color`           | string | Override flow colour |
| `value_gradient`  | object | Gradient colour config |
| `label`           | string | Optional display label for the flow (inspector and ARIA); omit or match `id` to hide |
| `visible`         | boolean | When `false`, hides the flow line and particles on the dashboard card (default `true`) |

Per-flow animation options (`animation_style`, `particle_shape`, `direction`, spacing, etc.) belong under an **`animation`** object on each flow in YAML (see **`FEATURES.md`**).

### Overlays

```yaml
overlays:
  - type: custom
    position: { x: 10, y: 10 }
    size: { width: 20, height: 15 }
    card:
      type: picture-entity
      entity: camera.front_door
      show_name: false
```

---

## Domains

FlowMe includes built-in profiles for six domains. Default **peak** values used for speed-curve calibration:

| Domain  | Roles | Default peak |
| ------- | ----- | ------------- |
| `energy` | Solar, Grid, Battery, Load | **5000** W |
| `water` | Supply, Drain, Storage, Transfer | **25** L/min |
| `network` | Upload, Download, Local, External | **100** Mbps |
| `hvac` | Supply air, Return air, Fresh, Exhaust | **600** m³/h |
| `gas` | Inlet, Outlet, Bypass, Vent | **5** m³/h |
| `generic` | Flow 1–4 | **100** (dimensionless) |

FlowMe reads `unit_of_measurement` from the HA sensor and displays it as-is. Adjust **`defaults.peak_value`** (or per-flow overrides) if your sensors use a different scale than these defaults.

---

## Translations

FlowMe ships with English as the default. To add a translation:

1. Copy `translations/en.json` from this repository
2. Translate all values (keep keys unchanged)
3. Save as your language code, e.g. `fr.json`
4. Place at `/config/www/flowme/translations/fr.json`

FlowMe loads it automatically when HA is set to that language. Partial translations are supported — missing keys fall back to English.

To contribute, open a pull request adding your file to the `translations/` folder.

---

## Development

### Prerequisites

Node.js 20+, npm

### Setup

```bash
git clone https://github.com/fxgamer-debug/flowme
cd flowme
npm install
```

### Dev server (no HA required)

```bash
npm run dev
```

Opens `http://localhost:5173` with a mock Home Assistant environment and live reload.

### Build

```bash
npm run build
```

### Test

```bash
npm run test
```

---

## Licence

MIT
