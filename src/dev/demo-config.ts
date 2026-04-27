/**
 * Demo FlowMe configuration for the local dev server.
 *
 * Uses only the mock entity IDs defined in mock-hass.ts. Solid-colour SVG
 * data URIs are used as backgrounds so the demo works with zero file setup.
 *
 * Demonstrates: multiple flows with different animation styles,
 * multiple nodes, weather state mapping, sun_entity, debug mode off.
 */
import type { FlowmeConfig } from '../types.js';

// Solid-colour SVG data URI helper
function solidBg(hex: string): string {
  const encoded = encodeURIComponent(hex);
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100%25' height='100%25' fill='${encoded}'/%3E%3C/svg%3E`;
}

export const DEMO_CONFIG: FlowmeConfig = {
  type: 'custom:flowme-card',
  domain: 'energy',
  debug: false,
  aspect_ratio: '16:9',

  background: {
    default: solidBg('#4a5a6a'),           // neutral grey catchall
    sun_entity: 'sun.sun',
    weather_entity: 'weather.demo',
    weather_states: {
      sunny:              solidBg('#f0a500'), // warm amber
      partlycloudy:       solidBg('#7a9bb5'), // muted blue-grey
      cloudy:             solidBg('#5a6a7a'), // darker grey
      rainy:              solidBg('#2a3a5a'), // dark blue
      pouring:            solidBg('#1e2e4a'),
      lightning:          solidBg('#1a1a2a'), // very dark blue-purple
      'lightning-rainy':  solidBg('#1a1a2a'),
      snowy:              solidBg('#c8d8e8'), // light blue-white
      fog:                solidBg('#7a8a9a'),
      windy:              solidBg('#6a9a7a'),
      'clear-night':      solidBg('#0a0a1a'), // near-black navy
      'partlycloudy-night': solidBg('#1a2a3a'),
      'cloudy-night':     solidBg('#1e2e3e'),
      'rainy-night':      solidBg('#0e1e3a'),
    },
    transition_duration: 3000,
  },

  nodes: [
    { id: 'solar',   position: { x: 20, y: 25 }, entity: 'sensor.pv_total_power',  label: 'Solar',   show_label: true, show_value: true },
    { id: 'battery', position: { x: 50, y: 75 }, entity: 'sensor.battery_power',   label: 'Battery', show_label: true, show_value: true },
    { id: 'grid',    position: { x: 80, y: 25 }, entity: 'sensor.grid_power',       label: 'Grid',    show_label: true, show_value: true },
    { id: 'home',    position: { x: 50, y: 40 }, entity: 'sensor.load_power',       label: 'Home',    show_label: true, show_value: true },
  ],

  flows: [
    {
      id: 'solar_to_home',
      from_node: 'solar',
      to_node: 'home',
      entity: 'sensor.pv_total_power',
      waypoints: [],
      animation: { animation_style: 'dots', direction: 'forward', glow_intensity: 1.2, shimmer: true },
    },
    {
      id: 'grid_to_home',
      from_node: 'grid',
      to_node: 'home',
      entity: 'sensor.grid_power',
      waypoints: [],
      animation: { animation_style: 'dash', direction: 'auto' },
    },
    {
      id: 'battery_to_home',
      from_node: 'battery',
      to_node: 'home',
      entity: 'sensor.battery_power',
      waypoints: [],
      animation: { animation_style: 'trail', direction: 'auto', particle_shape: 'teardrop' },
    },
    {
      id: 'solar_to_battery',
      from_node: 'solar',
      to_node: 'battery',
      entity: 'sensor.battery_power',
      waypoints: [{ x: 20, y: 65 }],
      animation: { animation_style: 'spark', direction: 'auto', flicker: true },
    },
  ],

  overlays: [],

  defaults: {
    node_radius: 14,
    burst_trigger_ratio: 0.85,
    burst_sustain_ms: 3000,
  },

  opacity: {
    darken: 0.25,
  },
};
