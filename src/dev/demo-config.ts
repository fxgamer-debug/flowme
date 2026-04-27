/**
 * Demo FlowMe configuration for the local dev server.
 *
 * Uses only the mock entity IDs defined in mock-hass.ts. CSS gradient
 * backgrounds are used so the demo works with zero file setup.
 *
 * Demonstrates: multiple flows with different animation styles,
 * multiple nodes, weather state mapping, sun_entity, debug mode off.
 */
import type { FlowmeConfig } from '../types.js';

export const DEMO_CONFIG: FlowmeConfig = {
  type: 'custom:flowme-card',
  domain: 'energy',
  debug: false,
  aspect_ratio: '16:9',

  background: {
    default: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect fill='%23374151'/%3E%3C/svg%3E",
    sun_entity: 'sun.sun',
    weather_entity: 'weather.demo',
    weather_states: {
      sunny:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23FDE68A'/%3E%3Cstop offset='1' stop-color='%23F59E0B'/%3E%3C/linearGradient%3E%3Crect fill='url(%23g)'/%3E%3C/svg%3E",
      partlycloudy:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%2393C5FD'/%3E%3Cstop offset='1' stop-color='%236B7280'/%3E%3C/linearGradient%3E%3Crect fill='url(%23g)'/%3E%3C/svg%3E",
      cloudy:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%239CA3AF'/%3E%3Cstop offset='1' stop-color='%234B5563'/%3E%3C/linearGradient%3E%3Crect fill='url(%23g)'/%3E%3C/svg%3E",
      rainy:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%231E3A5F'/%3E%3Cstop offset='1' stop-color='%23111827'/%3E%3C/linearGradient%3E%3Crect fill='url(%23g)'/%3E%3C/svg%3E",
      'clear-night':
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%230F172A'/%3E%3Cstop offset='1' stop-color='%231E293B'/%3E%3C/linearGradient%3E%3Crect fill='url(%23g)'/%3E%3C/svg%3E",
      'partlycloudy-night':
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%231E293B'/%3E%3Cstop offset='1' stop-color='%23374151'/%3E%3C/linearGradient%3E%3Crect fill='url(%23g)'/%3E%3C/svg%3E",
      snowy:
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3ClinearGradient id='g' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='%23DBEAFE'/%3E%3Cstop offset='1' stop-color='%23E0F2FE'/%3E%3C/linearGradient%3E%3Crect fill='url(%23g)'/%3E%3C/svg%3E",
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
