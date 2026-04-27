/**
 * FlowMe dev-server entry point.
 *
 * Imports the card + editor custom elements and wires up the mock HA
 * environment. The right-side control panel lets you override sensor values,
 * change weather/sun state, and adjust the animation speed multiplier.
 */
import '../flowme-card.js';
import '../flowme-card-editor.js';
import { createMockHass, startMockUpdates, WEATHER_STATES } from './mock-hass.js';
import { DEMO_CONFIG } from './demo-config.js';
import type { FlowmeCard } from '../flowme-card.js';

// ── Bootstrap ──────────────────────────────────────────────────────────────

const card = document.getElementById('card') as FlowmeCard & HTMLElement;
card.setConfig(DEMO_CONFIG);

const hass = createMockHass();
card.hass = hass as never;

const stop = startMockUpdates(hass, (updated) => {
  card.hass = updated as never;
});

// Prevent cleanup from being GC'd — only needed for hmr teardown
(window as unknown as Record<string, unknown>).__flowmeDevStop = stop;

// ── Control panel ──────────────────────────────────────────────────────────

function buildControlPanel(): void {
  const panel = document.createElement('div');
  panel.id = 'dev-panel';
  panel.innerHTML = `
    <style>
      #dev-panel {
        width: 280px;
        flex-shrink: 0;
        background: #1e1e2e;
        border-left: 1px solid #333;
        overflow-y: auto;
        padding: 12px;
        font-family: system-ui, sans-serif;
        font-size: 12px;
        color: #cdd6f4;
      }
      #dev-panel h2 {
        font-size: 13px;
        font-weight: 700;
        margin-bottom: 12px;
        color: #89dceb;
        letter-spacing: 0.05em;
        text-transform: uppercase;
      }
      #dev-panel details { margin-bottom: 10px; }
      #dev-panel summary {
        cursor: pointer;
        font-weight: 600;
        color: #89b4fa;
        margin-bottom: 6px;
        user-select: none;
      }
      #dev-panel label {
        display: flex;
        flex-direction: column;
        gap: 2px;
        margin-bottom: 8px;
      }
      #dev-panel .row {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      #dev-panel input[type=range] { flex: 1; accent-color: #89b4fa; }
      #dev-panel .val { min-width: 45px; text-align: right; font-variant-numeric: tabular-nums; }
      #dev-panel select, #dev-panel input[type=text] {
        background: #313244;
        border: 1px solid #45475a;
        border-radius: 4px;
        color: #cdd6f4;
        padding: 3px 6px;
        font-size: 12px;
        width: 100%;
      }
      #dev-panel button {
        background: #313244;
        border: 1px solid #45475a;
        border-radius: 4px;
        color: #cdd6f4;
        padding: 4px 10px;
        cursor: pointer;
        font-size: 11px;
        margin-top: 4px;
        width: 100%;
      }
      #dev-panel button:hover { background: #45475a; }
      #dev-panel .entity-state {
        background: #313244;
        border-radius: 3px;
        padding: 2px 6px;
        font-size: 11px;
        color: #a6e3a1;
        min-width: 50px;
        text-align: center;
      }
      #dev-panel .toggle-btn { 
        padding: 6px;
        position: fixed;
        top: 8px;
        right: 8px;
        z-index: 100;
        width: auto;
        background: #313244;
      }
    </style>
    <h2>FlowMe Dev</h2>

    <details open>
      <summary>Weather &amp; Sun</summary>
      <label>
        Weather state
        <select id="ctrl-weather">
          ${WEATHER_STATES.map((s) => `<option value="${s}">${s}</option>`).join('')}
        </select>
      </label>
      <label>
        Sun state
        <select id="ctrl-sun">
          <option value="above_horizon">above_horizon ☀️</option>
          <option value="below_horizon">below_horizon 🌙</option>
        </select>
      </label>
    </details>

    <details open>
      <summary>Solar</summary>
      <label>PV String 1 (W)
        <div class="row">
          <input type="range" id="sl-pv1" min="0" max="3500" step="10" value="0"/>
          <span class="val" id="vl-pv1">0</span>
        </div>
      </label>
      <label>PV String 2 (W)
        <div class="row">
          <input type="range" id="sl-pv2" min="0" max="2500" step="10" value="0"/>
          <span class="val" id="vl-pv2">0</span>
        </div>
      </label>
    </details>

    <details open>
      <summary>Grid &amp; Load</summary>
      <label>Grid power (W, negative=export)
        <div class="row">
          <input type="range" id="sl-grid" min="-5000" max="5000" step="10" value="0"/>
          <span class="val" id="vl-grid">0</span>
        </div>
      </label>
      <label>Load power (W)
        <div class="row">
          <input type="range" id="sl-load" min="0" max="5000" step="10" value="350"/>
          <span class="val" id="vl-load">350</span>
        </div>
      </label>
    </details>

    <details>
      <summary>Battery</summary>
      <label>Battery power (W, negative=charging)
        <div class="row">
          <input type="range" id="sl-bat" min="-3000" max="3000" step="10" value="0"/>
          <span class="val" id="vl-bat">0</span>
        </div>
      </label>
      <label>Battery SOC (%)
        <div class="row">
          <input type="range" id="sl-soc" min="0" max="100" step="1" value="60"/>
          <span class="val" id="vl-soc">60</span>
        </div>
      </label>
    </details>

    <details>
      <summary>Temperature</summary>
      <label>Indoor (°C)
        <div class="row">
          <input type="range" id="sl-indoor" min="15" max="30" step="0.5" value="21"/>
          <span class="val" id="vl-indoor">21</span>
        </div>
      </label>
      <label>Outdoor (°C)
        <div class="row">
          <input type="range" id="sl-outdoor" min="-10" max="40" step="0.5" value="15"/>
          <span class="val" id="vl-outdoor">15</span>
        </div>
      </label>
    </details>

    <details>
      <summary>Controls</summary>
      <button id="btn-randomise">Randomise all values</button>
      <button id="btn-reset">Reset to live data</button>
    </details>
  `;
  document.body.appendChild(panel);

  // Wire up sliders
  const sliders: Array<{ id: string; val: string; entityId: string; transform?: (v: number) => number }> = [
    { id: 'sl-pv1',    val: 'vl-pv1',    entityId: 'sensor.pv_string_1_power' },
    { id: 'sl-pv2',    val: 'vl-pv2',    entityId: 'sensor.pv_string_2_power' },
    { id: 'sl-grid',   val: 'vl-grid',   entityId: 'sensor.grid_power' },
    { id: 'sl-load',   val: 'vl-load',   entityId: 'sensor.load_power' },
    { id: 'sl-bat',    val: 'vl-bat',    entityId: 'sensor.battery_power' },
    { id: 'sl-soc',    val: 'vl-soc',    entityId: 'sensor.battery_soc' },
    { id: 'sl-indoor', val: 'vl-indoor', entityId: 'sensor.indoor_temperature' },
    { id: 'sl-outdoor',val: 'vl-outdoor',entityId: 'sensor.outdoor_temperature' },
  ];

  for (const { id, val, entityId } of sliders) {
    const input = document.getElementById(id) as HTMLInputElement;
    const display = document.getElementById(val) as HTMLElement;
    input.addEventListener('input', () => {
      display.textContent = input.value;
      hass._overrides[entityId] = input.value;
    });
  }

  // Weather dropdown
  const weatherSel = document.getElementById('ctrl-weather') as HTMLSelectElement;
  weatherSel.addEventListener('change', () => {
    hass._overrides['weather.demo'] = weatherSel.value;
  });

  // Sun dropdown
  const sunSel = document.getElementById('ctrl-sun') as HTMLSelectElement;
  sunSel.addEventListener('change', () => {
    hass._overrides['sun.sun'] = sunSel.value;
  });

  // Randomise button
  document.getElementById('btn-randomise')?.addEventListener('click', () => {
    const rand = (min: number, max: number) => String(Math.round((min + Math.random() * (max - min)) * 10) / 10);
    hass._overrides['sensor.pv_string_1_power'] = rand(0, 3000);
    hass._overrides['sensor.pv_string_2_power'] = rand(0, 2000);
    hass._overrides['sensor.grid_power'] = rand(-3000, 3000);
    hass._overrides['sensor.load_power'] = rand(200, 800);
    hass._overrides['sensor.battery_power'] = rand(-2000, 2000);
    hass._overrides['sensor.battery_soc'] = rand(20, 95);
    hass._overrides['weather.demo'] = WEATHER_STATES[Math.floor(Math.random() * WEATHER_STATES.length)];
    hass._overrides['sun.sun'] = Math.random() > 0.5 ? 'above_horizon' : 'below_horizon';
  });

  // Reset button
  document.getElementById('btn-reset')?.addEventListener('click', () => {
    for (const key of Object.keys(hass._overrides)) {
      delete hass._overrides[key];
    }
    for (const { id, val } of sliders) {
      const input = document.getElementById(id) as HTMLInputElement;
      if (input) {
        input.value = String(parseFloat(input.defaultValue ?? '0'));
        const display = document.getElementById(val) as HTMLElement;
        if (display) display.textContent = input.value;
      }
    }
  });
}

buildControlPanel();
