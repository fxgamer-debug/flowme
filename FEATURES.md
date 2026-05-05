# FlowMe — Feature reference

Technical reference for implemented behaviour. For installation and overview, see `README.md`.

---

## Background images

Place your background images in `/config/www/flowme/backgrounds/`. They are served at URLs such as `/local/flowme/backgrounds/filename.jpg`.

To enable the visual image browser in the FlowMe editor, add this to your `configuration.yaml`:

```yaml
homeassistant:
  media_dirs:
    flowme: /config/www/flowme/backgrounds
```

Then restart Home Assistant. The **Browse** button in the editor lists images from that folder and inserts `/local/flowme/backgrounds/…` URLs into the configuration.

Without this setup, you can still set `background.default` and weather image URLs manually to any allowed path (for example other files under `/local/`).

---

## Animation system

### `animation_style` (per flow, under `flows[].animation`)

| Value   | Description |
| ------- | ----------- |
| `dots`  | Particles move along the path (default). |
| `dash`  | Animated dashed stroke along the path. |
| `arrow` | Chevron or arrow-shaped particles. |
| `trail` | Head particle with trailing segments. |
| `fluid` | Gradient stroke motion along the path. |
| `none`  | Static line, no motion (respects reduced motion). |

### `particle_shape` (per flow, under `flows[].animation`)

| Value        | Description |
| ------------ | ----------- |
| `circle`     | Circular dots (default). |
| `square`     | Square particles. |
| `arrow`      | Arrow/chevron shape. |
| `teardrop`   | Teardrop shape. |
| `diamond`    | Diamond shape. |
| `custom_svg` | Path from `custom_svg_path` stamped along the path. |

### `particle_spacing` (per flow, under `flows[].animation`)

| Value           | Description |
| --------------- | ----------- |
| `even`          | Even spacing along path (default). |
| `random`        | Randomised offsets. |
| `clustered`     | Bunched clusters; `cluster_size`, `cluster_gap`. |
| `pulse`         | Time-varying bunches; `pulse_frequency`, `pulse_ratio`. |
| `wave_spacing`  | Density wave along path; `wave_frequency`, `wave_amplitude`. |
| `wave_lateral`  | Perpendicular wiggle; uses `wave_frequency` / `wave_amplitude`. |

### `direction` (per flow, under `flows[].animation`)

| Value      | Description |
| ---------- | ----------- |
| `auto`     | Sign of sensor value selects forward vs reverse (default). |
| `forward`  | Always from → to. |
| `reverse`  | Always to → from. |
| `both`     | Two streams (forward and reverse paths). |

### Other per-flow animation fields

| Field              | Type   | Default (conceptual) | Description |
| ------------------ | ------ | -------------------- | ----------- |
| `particle_size`   | number | 1.0 | Scale vs `defaults.dot_radius`. |
| `particle_count`  | number | (profile) | Particles on path; overrides burst curve if set. |
| `glow_intensity`  | number | 1.0 | Line glow; 0 = off. |
| `shimmer`         | bool   | false | Faint motion below threshold. |
| `flicker`         | bool   | false | Rapid opacity variation. |
| `trail_length`    | number | 2.0 | Trail style only. |
| `dash_gap`        | number | 0.5 | Dash style: gap vs dash length. |
| `custom_svg_path` | string | — | SVG `d` for `custom_svg`. |
| `cluster_size`    | number | 3 | Clustered mode. |
| `cluster_gap`     | number | 2.0 | Clustered mode. |
| `pulse_frequency` | number | 1.0 | Pulse mode (Hz). |
| `pulse_ratio`     | number | 0.3 | Pulse mode. |
| `wave_frequency`  | number | 1.0 | Wave modes. |
| `wave_amplitude`  | number | 0.7 / 8 | Spacing density or lateral px. |

### Global `animation` (card level)

| Field           | Type    | Default | Description |
| --------------- | ------- | ------- | ----------- |
| `fps`           | number  | 60      | Cap frame rate (10–60). |
| `smooth_speed`  | boolean | true    | Ease speed/direction transitions. |

---

## Flow configuration

Top-level on each `flows[]` item (see `FlowConfig` in `src/types.ts`):

| Property                | Type    | Default | Description |
| ----------------------- | ------- | ------- | ----------- |
| `id`                    | string  | required | Unique id. |
| `label`                 | string  | —       | Optional display name in UI / ARIA; falls back to `id`. Max 64 chars; omitted if empty or equal to `id`. |
| `from_node` / `to_node` | string  | required | Node ids. |
| `entity`                | string  | required | Driving sensor. |
| `waypoints`             | array   | `[]`    | Percent waypoints in order. |
| `domain`                | string  | card    | Per-flow domain override. |
| `color`                 | string  | —       | Shorthand colour both directions. |
| `color_positive` / `color_negative` | string | — | Direction-specific colours. |
| `threshold`             | number  | —       | Legacy; use `speed_curve_override.threshold` if both set, override wins. |
| `reverse`               | bool    | false   | Flip sensor sign interpretation. |
| `speed_multiplier`      | number  | 1.0     | 0.1–5.0 curve multiplier. |
| `opacity`               | number  | 1.0     | Per-flow opacity. |
| `visible`               | bool    | true    | Show/hide flow. |
| `line_style`            | string  | `corner`| `corner` \| `diagonal` \| `curve` \| `smooth` |
| `speed_curve_override`  | object  | —       | `threshold`, `p50`, `peak`, `max_duration`, `min_duration`, `steepness` |
| `animation`             | object  | —       | `FlowAnimationConfig` (styles, shapes, spacing, etc.). |
| `value_gradient`        | object  | —       | Secondary-sensor colour interpolation. |

### `value_gradient`

| Field        | Type   | Description |
| ------------ | ------ | ----------- |
| `entity`     | string | Sensor for gradient value. |
| `low_value` / `high_value` | number | Endpoints for interpolation. |
| `low_color` / `high_color` | string | CSS hex. |
| `mode`       | string | `flow` (default) \| `line` \| `both` — what gets the gradient. |

---

## Node configuration

| Field         | Type    | Default | Description |
| ------------- | ------- | ------- | ----------- |
| `id`          | string  | required | Unique id. |
| `position`    | object  | required | `x`, `y` 0–100%. |
| `entity`      | string  | —       | Value/label source. |
| `label`       | string  | —       | Text label. |
| `color`       | string  | —       | Override fill. |
| `size`        | number  | 12 px   | Dot radius (via defaults). |
| `show_label`  | bool    | —       | |
| `show_value`  | bool    | —       | |
| `opacity`     | number  | 1.0     | |
| `visible`     | bool    | true    | |
| `node_effect` | object  | —       | See below. |

---

## Node effects

Requires `entity` on the node. Types: `glow`, `badge`, `ripple`, `alert`.

### `glow`

| Field                 | Type   | Description |
| --------------------- | ------ | ----------- |
| `glow_color`          | string | Halo colour. |
| `glow_max_radius`     | number | Max radius. |
| `glow_min_intensity`  | number | Floor 0–1 (default 0.1). |
| `peak_value`          | number | Normalisation. |

### `badge`

| Field            | Type   | Description |
| ---------------- | ------ | ----------- |
| `badge_color_on` / `badge_color_off` | string | States. |
| `threshold`      | number \| null | Numeric cutover; omit for binary strings. |

### `ripple`

| Field              | Type   | Description |
| ------------------ | ------ | ----------- |
| `ripple_color`     | string | |
| `ripple_duration`  | number | ms |
| `ripple_threshold` | number | |

### `alert`

| Field              | Type   | Description |
| ------------------ | ------ | ----------- |
| `alert_threshold`  | number | |
| `alert_condition`  | `above` \| `below` | |
| `alert_color`      | string | |
| `alert_frequency`  | number | |
| `alert_hysteresis` | number | |

---

## Background system

- **`default`**: Always-used baseline image URL.
- **`weather_entity`**: When set, `weather_states` map keys on `states[entity].state` to image URLs. Unknown state falls back sensibly.
- **`sun_entity`**: When `sun` is below horizon, lookup uses `{state}-night` before the day key, enabling night-specific art.
- **`transition_duration`**: Crossfade in **milliseconds**; if omitted, the card uses 5000 ms.
- **URLs**: Validated to allowed prefixes (`/local/`, `/media/`, `https://`, etc.) for security.

---

## Value gradient

Interpolates HSL between `low_color` and `high_color` using a second entity. Example use cases: duct temperature vs setpoint, battery SoC, grid frequency deviation. `mode` controls whether particles, the base line, or both take the gradient.

### HVAC temperature-based flow colours

FlowMe does not have a dedicated HVAC temperature gradient feature because the existing Value Gradient system already covers this use case.

To colour an HVAC flow based on supply vs return temperature difference:

1. Set the flow colour to your “neutral” colour (e.g. grey for no heat exchange).

2. Configure `value_gradient` on the flow:

   ```yaml
   value_gradient:
     entity: sensor.hvac_supply_temp
     low_value: 18    # return temp °C
     high_value: 55   # supply temp °C
     low_color: "#1EB4FF"   # cool blue
     high_color: "#FF4500"  # hot orange
     mode: flow  # colour the particles
   ```

3. The flow particles will interpolate from blue (cool, low heat exchange) to orange (hot, high heat exchange) based on supply temperature.

4. For bidirectional HVAC (heating and cooling), use `direction: both` with two flows — one for supply, one for return — each with their own `value_gradient` configuration.

This gives a clear visual representation of heat transfer without any additional configuration beyond the standard `value_gradient` system.

---

## Editor

Available in the Lovelace card’s visual editor (when not password-locked): canvas **zoom and pan**; **drag** nodes and waypoints; **insert/delete** waypoints; **suggest path** (worker + Sobel + A\* in the editor); **undo/redo** stack; **from/to** node editing for flows; **domain colour** overrides; **opacity** and **visibility** controls per layer; **multi-select** and **rename** flows/nodes/overlays; overlay **resize** and **card config** JSON.

---

## Overlays

Only `type: custom` is supported. Each overlay has `id`, `position`, optional `size` (default ~20×15 %), `card` (any HA card config), optional `visible`, `opacity`. FlowMe uses HA `loadCardHelpers()` when available to instantiate the inner card. Unsafe URL schemes in nested config are rejected.

---

## Domains

Built-in profiles by domain:

| Domain   | Roles                              | Units        |
| -------- | ---------------------------------- | ------------ |
| energy   | Solar, Grid, Battery, Load         | sensor unit  |
| water    | Supply, Drain, Storage, Transfer | sensor unit  |
| network  | Upload, Download, Local, External | sensor unit  |
| hvac     | Supply air, Return air, Fresh, Exhaust | sensor unit  |
| gas      | Inlet, Outlet, Bypass, Vent      | sensor unit  |
| generic  | Flow 1–4                           | sensor unit  |

FlowMe reads `unit_of_measurement` directly from the HA sensor and displays it as-is. The speed curve for each domain is calibrated to watts (energy), litres per minute (water), and Mbps (network) but accepts any sensor unit — adjust peak_value in the speed curve config to match your sensor’s scale.

Each domain defines `unit_label` (for internal curve math and `describe()`), `threshold`, `p50`, `peak`, sigmoid `speed_curve`, optional `particle_count_curve`, `wave_amplitude_curve`, `unit_scale` for kW→W style conversion, `describe()` formatting, and **shape** (`dot`, `square`, `wave`, `pulse`, `gradient`) for legacy profile visuals. Role colours come from `DOMAIN_COLOUR_PROFILES` + optional card `domain_colors`. Calibration defaults are tuned for typical residential ranges (see `src/flow-profiles/*.ts`).

---

## i18n

Strings live in `src/strings.ts`. Non-English: place `{lang}.json` under `/local/flowme/translations/` matching HA language code; merged shallowly over defaults via `src/i18n.ts`.

---

## Accessibility

Flow nodes and flows expose appropriate **ARIA** labels where implemented; editor focuses show outlines; renderer respects **`prefers-reduced-motion`** (static lines). High contrast follows HA theme variables where applicable.

---

## Configuration reference

### Card-level (`FlowmeConfig`)

| Property              | Type | Description |
| --------------------- | ---- | ----------- |
| `type`                | fixed | `custom:flowme-card` |
| `domain`              | `FlowDomain` | Profile selection. |
| `background`          | `BackgroundConfig` | Required. |
| `nodes` / `flows`     | arrays | Required. |
| `overlays`            | array | Optional custom overlays. |
| `aspect_ratio`        | string | Optional layout hint. |
| `fullscreen`          | bool | |
| `edit_mode_password`  | string | |
| `defaults`            | `FlowmeDefaults` | `node_radius`, burst/dot/line globals. |
| `domain_colors`       | map | Role hex overrides. |
| `debug`               | bool | |
| `opacity`             | `OpacityConfig` | Per-layer 0–1. |
| `visibility`          | `VisibilityConfig` | Layer toggles. |
| `animation`           | `AnimationConfig` | Global fps / smooth_speed. |

Defaults (`defaults`): `node_radius`, `burst_trigger_ratio`, `burst_sustain_ms`, `burst_max_particles`, `dot_radius`, `line_width`.

Opacity keys: `background`, `darken`, `nodes`, `flows`, `dots`, `glow`, `labels`, `values`, `overlays`.

Visibility keys: `nodes`, `lines`, `dots`, `labels`, `values`, `overlays`.

---

## Build / distribution

Single ESM bundle `dist/flowme-card.js` including inlined paint worklet source and pathfinding worker (inlined worker entry). No runtime npm installs on the HA host.
