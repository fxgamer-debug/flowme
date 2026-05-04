# FlowMe

> Animated flow visualisation with freely positioned nodes for Home Assistant

A custom Lovelace card that renders animated flow visualisations between freely positioned nodes over a configurable background. Supports multiple flow domains, rich animation styles, weather-reactive backgrounds, and a fully visual drag-and-drop editor.

---

## Features

**Freely positioned nodes.** Nodes can be placed anywhere on the canvas as a percentage position. No fixed grid or forced layout.

**Animated flow lines.** Flows connect nodes with animated particles. Multiple animation styles: dots, dash, arrow, trail, fluid, none. Direction follows sensor sign automatically.

**Multi-domain support.** Built-in profiles for energy, water, network, HVAC, gas and generic domains. Each domain has calibrated speed curves and colour profiles.

**Weather-reactive backgrounds.** Background image switches automatically based on HA weather entity state. Sun entity support for automatic day/night variants.

**Visual drag-and-drop editor.** Full visual editor with zoom, pan, node dragging, waypoint editing, suggest path (A\* pathfinding with Sobel edge detection), undo/redo, and element selection.

**Value gradient.** Flow colour interpolates between two colours based on a secondary sensor value. Useful for temperature-driven HVAC flows, battery health, grid frequency deviation and more.

**Node effects.** Per-node visual effects: glow, badge (node colour change), ripple, alert (threshold flash).

**Custom overlays.** Embed any HA card at any position on the canvas using the custom overlay system. Cameras, switches, sensors — anything.

**Particle spacing modes.** Six spacing modes: even, random, clustered, pulse, wave_spacing, wave_lateral.

**Custom SVG particle shapes.** User-supplied SVG path string as particle shape. Stamps along the flow path with correct orientation.

**i18n.** All UI strings extractable. Drop a JSON translation file in `/local/flowme/translations/` and FlowMe loads it automatically based on HA language setting.

**Accessibility.** ARIA roles, focus outlines, high contrast mode support, prefers-reduced-motion support.

**Single file distribution.** One `flowme-card.js` file. No external dependencies. Web Worker pathfinding inlined in the bundle.

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

Per-flow animation options (`animation_style`, `particle_shape`, `direction`, spacing, etc.) belong under a **`animation`** object on each flow in YAML (see **`FEATURES.md`**).

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

FlowMe includes built-in profiles for:

| Domain   | Roles (examples)        | Units   |
| -------- | ------------------------- | ------- |
| energy   | Solar, Grid, Battery, Load | W       |
| water    | Supply, Drain, Storage, Transfer | L/min |
| network  | Upload, Download, Local, External | Mbps |
| hvac     | Supply air, Return air, Fresh, Exhaust | CFM |
| gas      | Inlet, Outlet, Bypass, Vent | m³/h   |
| generic  | Flow 1–4                  | configurable |

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
