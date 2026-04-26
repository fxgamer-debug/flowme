# HACS.md — default-repository submission checklist

Pre-flight for the PR that adds `fxgamer-debug/flowme` to [`hacs/default`](https://github.com/hacs/default).

## Repo checklist (must all be true)

- [x] Repo lives at a permanent public URL: `https://github.com/fxgamer-debug/flowme`
- [x] MIT `LICENSE` at the repo root
- [x] `README.md` at the repo root with install/usage sections
- [x] `hacs.json` at the repo root
  - [x] `"name": "flowme"`
  - [x] `"filename": "flowme-card.js"` (matches the asset uploaded to every release and the file at `dist/flowme-card.js`)
  - [x] `"homeassistant": "2024.1.0"` (minimum HA version)
  - [x] `"render_readme": true`
  - [x] `"country": ["all"]`
- [x] Card registers on `window.customCards` so HA's card picker knows about it
- [x] Console banner logs the version on load
- [x] At least one tagged GitHub release exists (the v1.0.0 tag)
- [x] Every release uploads `flowme-card.js` as a release asset (handled by `.github/workflows/release.yml`)
- [x] CI is green on `main`
- [x] Card works on HA `2024.1.0+` (tested on `2026.4.x`)

## Submission steps

1. Confirm every checkbox above is actually checked (not just written).
2. Fork [`hacs/default`](https://github.com/hacs/default).
3. In the fork, edit the `plugin` file (used to be `plugin.json` — check current format). Add the repo in alphabetical order:
   ```
   fxgamer-debug/flowme
   ```
4. Open a PR against `hacs/default:master` with this template:

   ```
   Title: Add fxgamer-debug/flowme (Dashboard)

   Body:
   ## Repo
   fxgamer-debug/flowme

   ## Category
   Dashboard

   ## Summary
   flowme is a generic Home Assistant custom Lovelace card that overlays
   animated flow lines and interactive overlays on a user-supplied background
   image. Multi-domain (energy, water, network, HVAC, gas, generic) with a
   visual drag-and-drop editor, auto-routing via Sobel + A*, weather-aware
   background crossfades, and 125+ unit/smoke tests.

   ## Minimum HA version
   2024.1.0 (declared in hacs.json)

   ## Tested on
   Home Assistant 2026.4.x

   ## Checklist
   - [x] MIT license
   - [x] README at repo root
   - [x] hacs.json at repo root
   - [x] Tagged release with flowme-card.js asset
   - [x] CI green on main
   - [x] Follows HACS Dashboard requirements
   ```

5. Respond to review comments promptly. Typical turnaround: 1–3 weeks.

## After the HACS PR merges

- [ ] Remove the "custom repository" install instructions from README (keep the manual fallback).
- [ ] Update the `Status` badge / version line in README.
- [ ] Announce in the HA community forum + r/homeassistant (optional).

## Material needed for the HACS submission

- [ ] At least 3 screenshots of the card in real use (one per representative domain works well — energy, water, network).
- [ ] At least 1 screenshot of the editor mid-drag.
- [ ] At least 1 screenshot of an overlay (ideally a `custom` overlay to showcase the feature).
- [ ] A short GIF or video of "Suggest path" in action (optional but persuasive).

Store screenshots under `docs/screenshots/` in the repo and link them from `README.md`.
