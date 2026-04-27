/**
 * Mock Home Assistant object for the FlowMe dev server.
 *
 * Simulates a real HA environment with plausible energy, weather and solar
 * entities. Values update every 2 s using smooth variation patterns that
 * feel like a real house rather than random noise.
 *
 * Usage:
 *   import { createMockHass, startMockUpdates } from './mock-hass.js';
 *   const hass = createMockHass();
 *   startMockUpdates(hass, (updated) => card.hass = updated);
 */

export const WEATHER_STATES = [
  'sunny',
  'partlycloudy',
  'cloudy',
  'rainy',
  'pouring',
  'lightning',
  'lightning-rainy',
  'snowy',
  'fog',
  'windy',
  'clear-night',
  'partlycloudy-night',
] as const;

export type WeatherState = (typeof WEATHER_STATES)[number];

export interface MockHassState {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export interface MockHass {
  states: Record<string, MockHassState>;
  callService: (domain: string, service: string, data: Record<string, unknown>) => void;
  /** Allows overriding individual entity states for the control panel */
  _overrides: Record<string, string | undefined>;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function now(): string {
  return new Date().toISOString();
}

function makeState(entity_id: string, state: string, attributes: Record<string, unknown> = {}): MockHassState {
  return { entity_id, state, attributes, last_changed: now(), last_updated: now() };
}

/** Sigmoid-based smooth oscillator: returns value between min and max */
function cycle(t: number, period: number, min: number, max: number): number {
  const phase = (t % period) / period; // 0..1
  const raw = Math.sin(phase * 2 * Math.PI) * 0.5 + 0.5; // 0..1
  return Math.round((min + raw * (max - min)) * 10) / 10;
}

/** Adds a small smooth random walk to a base value */
function jitter(base: number, range: number, seed: number): number {
  const t = performance.now() * 0.001;
  const j = Math.sin(t * 0.7 + seed) * Math.sin(t * 1.3 + seed * 2) * range;
  return Math.round((base + j) * 10) / 10;
}

// ── State builders ─────────────────────────────────────────────────────────

function buildEntityStates(t: number, overrides: Record<string, string | undefined>): Record<string, MockHassState> {
  const get = (id: string, generated: string): string => overrides[id] ?? generated;

  // Solar: ramps up to ~3 kW during day, tapers at edges
  const dayPhase = (t % 86400) / 86400; // 0..1 over 24h sim-time (compressed to 60s)
  const compressedDay = (t % 60) / 60;
  const solarEnvelope = Math.max(0, Math.sin(compressedDay * Math.PI)); // sunrise→sunset arc
  const pv1 = Math.round(solarEnvelope * 3000 * (0.85 + 0.15 * Math.sin(t * 0.3)) * 10) / 10;
  const pv2 = Math.round(solarEnvelope * 2000 * (0.9 + 0.1 * Math.sin(t * 0.5 + 1)) * 10) / 10;
  const pvTotal = Math.round((pv1 + pv2) * 10) / 10;

  // Load: realistic house load with occasional spikes
  const baseLoad = 350;
  const loadSpike = Math.abs(Math.sin(t * 0.23)) > 0.9 ? 400 : 0; // occasional kettle/oven
  const loadW = Math.round(jitter(baseLoad + loadSpike, 80, 5) * 10) / 10;

  // Grid: export when solar > load (negative = export, positive = import)
  const batteryW = jitter(pv1 > 1500 ? -800 : 600, 300, 7); // charges when sunny
  const gridW = Math.round((loadW - pvTotal - Math.abs(batteryW) * (batteryW < 0 ? 1 : -1)) * 10) / 10;

  // Battery SOC: slowly cycles 20-95%
  const soc = Math.round(cycle(t, 120, 20, 95) * 10) / 10;

  // Temperatures
  const indoorTemp = jitter(21, 1, 11);
  const outdoorTemp = jitter(15, 5, 13);
  const indoorHumidity = jitter(45, 5, 17);

  // Weather: rotates every 30s
  const weatherIdx = Math.floor((t / 30) % WEATHER_STATES.length);
  const weatherState = WEATHER_STATES[weatherIdx];

  // Sun: above horizon for first 45s of each 90s cycle, below for remaining 45s
  const sunAbove = (t % 90) < 45;
  const sunState = sunAbove ? 'above_horizon' : 'below_horizon';
  const elevation = sunAbove ? jitter(35, 10, 19) : jitter(-5, 3, 21);

  // Switch
  const switchState = overrides['switch.demo_switch'] ?? 'on';

  void dayPhase; // used via solarEnvelope indirectly

  const states: Record<string, MockHassState> = {
    'sensor.pv_string_1_power': makeState('sensor.pv_string_1_power', get('sensor.pv_string_1_power', String(pv1)), {
      unit_of_measurement: 'W',
      device_class: 'power',
      friendly_name: 'PV String 1',
    }),
    'sensor.pv_string_2_power': makeState('sensor.pv_string_2_power', get('sensor.pv_string_2_power', String(pv2)), {
      unit_of_measurement: 'W',
      device_class: 'power',
      friendly_name: 'PV String 2',
    }),
    'sensor.pv_total_power': makeState('sensor.pv_total_power', get('sensor.pv_total_power', String(pvTotal)), {
      unit_of_measurement: 'W',
      device_class: 'power',
      friendly_name: 'PV Total',
    }),
    'sensor.grid_power': makeState('sensor.grid_power', get('sensor.grid_power', String(gridW)), {
      unit_of_measurement: 'W',
      device_class: 'power',
      friendly_name: 'Grid Power',
    }),
    'sensor.battery_power': makeState('sensor.battery_power', get('sensor.battery_power', String(batteryW)), {
      unit_of_measurement: 'W',
      device_class: 'power',
      friendly_name: 'Battery Power',
    }),
    'sensor.battery_soc': makeState('sensor.battery_soc', get('sensor.battery_soc', String(soc)), {
      unit_of_measurement: '%',
      device_class: 'battery',
      friendly_name: 'Battery SOC',
    }),
    'sensor.load_power': makeState('sensor.load_power', get('sensor.load_power', String(loadW)), {
      unit_of_measurement: 'W',
      device_class: 'power',
      friendly_name: 'House Load',
    }),
    'sensor.indoor_temperature': makeState('sensor.indoor_temperature', get('sensor.indoor_temperature', String(indoorTemp)), {
      unit_of_measurement: '°C',
      device_class: 'temperature',
      friendly_name: 'Indoor Temperature',
    }),
    'sensor.outdoor_temperature': makeState('sensor.outdoor_temperature', get('sensor.outdoor_temperature', String(outdoorTemp)), {
      unit_of_measurement: '°C',
      device_class: 'temperature',
      friendly_name: 'Outdoor Temperature',
    }),
    'sensor.indoor_humidity': makeState('sensor.indoor_humidity', get('sensor.indoor_humidity', String(indoorHumidity)), {
      unit_of_measurement: '%',
      device_class: 'humidity',
      friendly_name: 'Indoor Humidity',
    }),
    'weather.demo': makeState('weather.demo', get('weather.demo', weatherState), {
      friendly_name: 'Demo Weather',
      temperature: outdoorTemp,
    }),
    'sun.sun': makeState('sun.sun', get('sun.sun', sunState), {
      friendly_name: 'Sun',
      elevation,
      rising: sunAbove,
    }),
    'switch.demo_switch': makeState('switch.demo_switch', switchState, {
      friendly_name: 'Demo Switch',
    }),
    'camera.demo_camera': makeState('camera.demo_camera', 'idle', {
      friendly_name: 'Demo Camera',
      entity_picture: 'https://picsum.photos/320/180?random=1',
    }),
  };

  return states;
}

// ── Public API ─────────────────────────────────────────────────────────────

export function createMockHass(): MockHass {
  const overrides: Record<string, string | undefined> = {};
  const hass: MockHass = {
    states: buildEntityStates(0, overrides),
    _overrides: overrides,
    callService: (domain, service, data) => {
      if (domain === 'homeassistant' && service === 'toggle') {
        const entityId = data['entity_id'] as string;
        if (entityId && hass.states[entityId]) {
          const current = hass.states[entityId].state;
          hass.states[entityId].state = current === 'on' ? 'off' : 'on';
        }
      }
    },
  };
  return hass;
}

/**
 * Start the mock update loop. Calls onUpdate with a fresh hass object every
 * 2 seconds. Returns a cleanup function to stop the loop.
 */
export function startMockUpdates(
  hass: MockHass,
  onUpdate: (hass: MockHass) => void,
  intervalMs = 2000,
): () => void {
  const start = performance.now();
  const id = window.setInterval(() => {
    const t = (performance.now() - start) / 1000;
    const newStates = buildEntityStates(t, hass._overrides);
    // Merge: allow callService-mutated states to persist where overrides exist
    for (const [id, state] of Object.entries(newStates)) {
      hass.states[id] = state;
    }
    // Re-apply switch override if set
    if (hass._overrides['switch.demo_switch']) {
      hass.states['switch.demo_switch'].state = hass._overrides['switch.demo_switch'];
    }
    onUpdate({ ...hass, states: { ...hass.states } });
  }, intervalMs);
  return () => window.clearInterval(id);
}
