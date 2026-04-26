# TESTING.md — manual pre-release checklist

Automated tests live in `tests/`. This file covers the things a machine can't check: real-browser visual behaviour, Home Assistant integration, HACS distribution, and the editor UX.

Run through this before cutting a new release tag. Everything here should be green.

---

## 0. Automated baseline

```bash
npm ci
npm run check     # lint + type-check + type-check:tests + vitest + build
```

- [ ] `npm run check` exits 0.
- [ ] `dist/flowme-card.js` size did not regress by more than ~10% without a good reason. Check the Vite summary line.
- [ ] `git status` shows no uncommitted changes inside `dist/`.

## 1. Visual smoke test in a real HA instance

Preconditions: a HA instance running a version in the supported range (2024.1.0+), dashboard access, a background image under `/config/www/flowme/`.

### Card loads

- [ ] After adding the resource and reloading the dashboard, `Add card → Custom: flowme` shows up in the picker.
- [ ] Console prints `flowme vX.Y.Z` with the expected version.
- [ ] `window.customCards` contains an entry with `type: 'flowme-card'`.

### Renderer

- [ ] On Chromium, Houdini renderer is active (add `?flowme_renderer=svg` → animation changes behaviour → confirm SVG fallback exists).
- [ ] Firefox / Safari (no Houdini): card renders with the SVG renderer automatically, no console errors.
- [ ] `?flowme_renderer=houdini` on a non-supporting browser logs a warning and falls back to SVG.

### Domains

For each of the six domains (`energy`, `water`, `network`, `hvac`, `gas`, `generic`):

- [ ] At least one animated flow is visible, moving from `from_node` to `to_node` along the waypoints.
- [ ] Speed matches the profile curve: higher entity values visibly animate faster.
- [ ] Reverse flag flips direction regardless of sign.
- [ ] Threshold hides animation below the cutoff.
- [ ] Profile-specific shape is correct (dot / square / wave / pulse).

### Overlays

- [ ] `sensor` overlays show the numeric state and update when the entity changes.
- [ ] `switch` overlays render an active/inactive visual and toggle the entity on tap.
- [ ] `button` overlays fire their configured tap action.
- [ ] `camera` overlays show the camera preview and open the more-info dialog on tap.
- [ ] `custom` overlay with `type: weather-forecast` (or any installed card) renders inside flowme and stays in sync with `hass` updates.
- [ ] Pasting a `card_config` with a `javascript:` URL anywhere inside triggers the validation error with the correct JSON path.

### Weather background

- [ ] With `background.weather_entity` set and the live entity state matching a key in `weather_states`, the image visibly crossfades on state change.
- [ ] `transition_duration` honoured (test with `5000` — half a second crossfade is obvious).
- [ ] If the mapped image fails to load, the previous image stays on screen (no white flash).

## 2. Editor

- [ ] Wrench → **Edit card** opens the visual editor.
- [ ] Dragging a node updates its `position` in the YAML preview (toggle the code editor).
- [ ] Pointer-up is ONE undo entry, not one per move event.
- [ ] `Cmd/Ctrl+Z` undoes the drag; `Cmd/Ctrl+Shift+Z` redoes it.
- [ ] Shift-drag snaps to 8% grid.
- [ ] Click on empty background creates a new node.
- [ ] Shift-click on a flow segment inserts a waypoint at that location.
- [ ] Right-click deletes nodes, waypoints, overlays, and flows.
- [ ] **+ Overlay** toolbar button creates a fresh overlay you can then drag and resize.
- [ ] Overlay resize handle (bottom-right) works in both dimensions.
- [ ] Undo cap: do 101 distinct drags; the earliest one should no longer be in the undo stack.
- [ ] **Suggest path** on a flow with exactly two selected nodes:
  - [ ] Loads the background image
  - [ ] Runs Sobel + A\* (spinner visible briefly for typical images)
  - [ ] Proposes waypoints that visibly hug architectural features
  - [ ] **Accept** commits them to the flow; **Cancel** leaves the flow untouched
- [ ] Editor password gate (`edit_mode_password`) blocks access until entered.

## 3. HACS

- [ ] Add the repo as a custom Dashboard repository in HACS.
- [ ] HACS installs cleanly and writes to `/config/www/community/flowme/flowme-card.js`.
- [ ] The resource entry is auto-added.
- [ ] Uninstalling via HACS removes all files.

## 4. Release integrity

- [ ] The tag being cut matches `package.json` version.
- [ ] `CARD_VERSION` in `src/flowme-card.ts` matches the tag.
- [ ] `CHANGELOG.md` has a dedicated section for this tag.
- [ ] After pushing the tag, the `Release` workflow:
  - [ ] Runs lint + type-check + tests + build.
  - [ ] Uploads `flowme-card.js`, `flowme-card.js.map`, and `.sha256` files to the release.
  - [ ] The release notes mirror the CHANGELOG entry.

## 5. Security sanity

- [ ] Config with `background.default: javascript:alert(1)` is rejected with a clear error.
- [ ] Overlay with `card_config` containing a nested `{ tap_action: { url_path: 'javascript:…' } }` is rejected.
- [ ] No `eval` or `Function(` calls in `dist/flowme-card.js`:
  ```bash
  rg 'eval\(|Function\(' dist/flowme-card.js
  ```
  should print nothing.
