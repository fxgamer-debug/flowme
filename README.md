# flowme

A generic Home Assistant custom Lovelace card that overlays animated flow lines and interactive elements on top of a user-supplied background image. Unlike existing energy-flow cards, flowme is **multi-domain** (energy, water, network, HVAC, gas, generic) and uses **arbitrary user-defined paths** drawn directly on your own background photo via a visual drag-and-drop editor.

> Status: **v0.5.0** — all six domain flow profiles, Houdini Paint renderer with SVG fallback, full drag-and-drop editor, one-click auto-routing via Sobel + A*, weather-aware background crossfades, and interactive overlays (sensor, switch, button, camera, custom card).

## Why flowme

- **Visual coordinate editor** — drag nodes, waypoints, and overlays directly on your background image. Undo/redo with `Cmd/Ctrl+Z` / `Cmd/Ctrl+Shift+Z`. Shift-drag snaps to an 8% grid; Shift-click a flow segment to insert a waypoint.
- **Auto-routing via image analysis** — select a flow, click **Suggest path**, and flowme runs Sobel edge detection on your background image and A* pathfinding to propose waypoints that follow visible architectural features (pipes, walls, cable channels). Preview then accept.
- **Interactive overlays** — drop sensor chips, switches, buttons, and camera thumbnails anywhere on the background. Need something bespoke? Use a `custom` overlay to mount any Lovelace card inside flowme via `loadCardHelpers`. All user-supplied card configs are scanned for unsafe URL schemes before they ever reach the DOM.
- **Houdini Paint API animation** with progressive enhancement to SVG `animateMotion` fallback for browsers without Houdini support. Append `?flowme_renderer=svg` to the dashboard URL to force the fallback for debugging.

## Installation (pre-HACS)

1. Download `dist/flowme-card.js` from this repo.
2. Copy it into your HA `/config/www/community/flowme/` directory.
3. In HA, go to **Settings → Dashboards → Resources** and add:
   ```
   /hacsfiles/flowme/flowme-card.js
   ```
   (or `/local/community/flowme/flowme-card.js` if you placed it manually)
   Resource type: **JavaScript module**.
4. Refresh the dashboard, then **Add card → Custom: flowme**.

HACS default-repository submission happens at v1.0.0.

## Minimal config

```yaml
type: custom:flowme-card
domain: energy
background:
  default: /local/flowme/example-house.jpg
nodes:
  - id: source
    position: { x: 20, y: 30 }
    label: Grid
  - id: sink
    position: { x: 80, y: 70 }
    label: House
flows:
  - id: grid_to_house
    from_node: source
    to_node: sink
    entity: sensor.grid_power
    waypoints:
      - { x: 80, y: 30 }
```

Drop it into a dashboard, point `entity` at a real power sensor, and you'll see animated dots flowing along the path.

## Supported domains

| domain   | shape  | unit   | status |
|----------|--------|--------|--------|
| energy   | dot    | W      | v0.1.0 |
| water    | wave   | L/min  | v0.2.0 |
| network  | square | Mbps   | v0.2.0 |
| hvac     | wave   | CFM    | v0.2.0 (static colour — temperature-gradient colour deferred) |
| gas      | pulse  | m³/h   | v0.2.0 |
| generic  | dot    | —      | v0.2.0 |

## Overlays

Add interactive chips to your flow diagram without leaving flowme:

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

  - id: full_weather_card
    type: custom
    position: { x: 50, y: 85 }
    size: { width: 40, height: 12 }
    card_config:
      type: weather-forecast
      entity: weather.home
      show_current: true
      show_forecast: false
```

Tap actions default to `toggle` for switches/buttons and `more-info` for sensors/cameras; override with `tap_action: { action: toggle | more-info | none }`. For `custom` overlays, flowme rejects any `javascript:`, `vbscript:`, `data:` or `file:` URL anywhere inside `card_config` at validation time — both from YAML and the editor's JSON textarea.

## Roadmap

- **v0.1.0** — MVP: energy only, SVG renderer, minimal editor.
- **v0.2.0** — all six domain profiles, Houdini Paint renderer with SVG fallback, full drag-and-drop editor with undo/redo.
- **v0.3.0** — Sobel + A* pathfinding, one-click "Suggest path".
- **v0.4.0** — weather-state background transitions.
- **v0.5.0** — interactive overlays (sensors, switches, buttons, cameras, arbitrary custom cards).
- **v1.0.0** — full test suite, polished docs, HACS default-repository submission.

## Development

```bash
npm install
npm run dev        # vite dev server
npm run build      # produces dist/flowme-card.js
npm run type-check # tsc --noEmit
npm run lint
```

The `dist/` folder is committed to the repo because HACS distributes the built bundle directly without running a build step.

## License

MIT — see [LICENSE](LICENSE).
