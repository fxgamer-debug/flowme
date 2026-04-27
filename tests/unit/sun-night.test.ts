import { describe, it, expect } from 'vitest';
import { resolveNightBackground } from '../../src/utils.js';

const BG = {
  sunny_day: '/img/sunny_day.jpg',
  cloudy_day: '/img/cloudy_day.jpg',
  clear_night: '/img/clear_night.jpg',
  partlycloudy_night: '/img/partlycloudy_night.jpg',
  rainy_night: '/img/rainy_night.jpg',
  default: '/img/default.jpg',
};

const states = {
  sunny: BG.sunny_day,
  partlycloudy: BG.cloudy_day,
  'clear-night': BG.clear_night,
  'partlycloudy-night': BG.partlycloudy_night,
  'rainy-night': BG.rainy_night,
};

describe('resolveNightBackground — SUN-1', () => {
  // ── above_horizon ──────────────────────────────────────────────────────────

  it('above_horizon + sunny → sunny day image', () => {
    expect(resolveNightBackground('sunny', 'above_horizon', states, BG.default))
      .toBe(BG.sunny_day);
  });

  it('above_horizon + partlycloudy → partlycloudy day image', () => {
    expect(resolveNightBackground('partlycloudy', 'above_horizon', states, BG.default))
      .toBe(BG.cloudy_day);
  });

  it('above_horizon never appends -night even if the state looks like night', () => {
    // If somehow a 'sunny' state appears and sun is above horizon, return day image
    expect(resolveNightBackground('sunny', 'above_horizon', states, BG.default))
      .toBe(BG.sunny_day);
  });

  // ── below_horizon — exact night-variant mapped ─────────────────────────────

  it('below_horizon + partlycloudy, partlycloudy-night mapped → night image', () => {
    expect(resolveNightBackground('partlycloudy', 'below_horizon', states, BG.default))
      .toBe(BG.partlycloudy_night);
  });

  it('below_horizon + rainy, rainy-night mapped → rainy-night image', () => {
    expect(resolveNightBackground('rainy', 'below_horizon', states, BG.default))
      .toBe(BG.rainy_night);
  });

  // ── below_horizon — night-variant not mapped, fall to clear-night ──────────

  it('below_horizon + cloudy, cloudy-night not mapped, clear-night mapped → clear-night', () => {
    expect(resolveNightBackground('cloudy', 'below_horizon', states, BG.default))
      .toBe(BG.clear_night);
  });

  it('below_horizon + fog, fog-night not mapped, clear-night mapped → clear-night', () => {
    expect(resolveNightBackground('fog', 'below_horizon', states, BG.default))
      .toBe(BG.clear_night);
  });

  it('below_horizon + snowy, snowy-night not mapped, clear-night mapped → clear-night', () => {
    expect(resolveNightBackground('snowy', 'below_horizon', states, BG.default))
      .toBe(BG.clear_night);
  });

  // ── below_horizon — neither night-variant nor clear-night mapped ───────────

  it('below_horizon + cloudy, neither cloudy-night nor clear-night mapped → default', () => {
    const minimal = { sunny: BG.sunny_day }; // no night mappings at all
    expect(resolveNightBackground('cloudy', 'below_horizon', minimal, BG.default))
      .toBe(BG.default);
  });

  it('below_horizon, no weather_states → default', () => {
    expect(resolveNightBackground('sunny', 'below_horizon', undefined, BG.default))
      .toBe(BG.default);
  });

  // ── native night states (no double -night appending) ──────────────────────

  it('below_horizon + native clear-night state → no double -night, matches clear-night key', () => {
    // Integration that reports 'clear-night' directly while sun is also below_horizon.
    // Should NOT produce 'clear-night-night'.
    expect(resolveNightBackground('clear-night', 'below_horizon', states, BG.default))
      .toBe(BG.clear_night);
  });

  it('below_horizon + native partlycloudy-night → no double -night, matches mapped key', () => {
    expect(resolveNightBackground('partlycloudy-night', 'below_horizon', states, BG.default))
      .toBe(BG.partlycloudy_night);
  });

  it('below_horizon + native rainy-night → no double -night, matches rainy-night key', () => {
    expect(resolveNightBackground('rainy-night', 'below_horizon', states, BG.default))
      .toBe(BG.rainy_night);
  });

  // ── sun_entity not configured (sunState undefined) ─────────────────────────

  it('no sun_entity (sunState undefined) + sunny → normal day match', () => {
    expect(resolveNightBackground('sunny', undefined, states, BG.default))
      .toBe(BG.sunny_day);
  });

  it('no sun_entity (sunState undefined) + partlycloudy → normal day match', () => {
    expect(resolveNightBackground('partlycloudy', undefined, states, BG.default))
      .toBe(BG.cloudy_day);
  });

  it('no sun_entity + unmapped state → default (no -night synthesis)', () => {
    expect(resolveNightBackground('fog', undefined, states, BG.default))
      .toBe(BG.default);
  });

  // ── day fallback when above horizon and mapped ────────────────────────────

  it('above_horizon + sunny with no states → default', () => {
    expect(resolveNightBackground('sunny', 'above_horizon', {}, BG.default))
      .toBe(BG.default);
  });

  // ── day-image fallback when night not mapped but day is ──────────────────

  it('below_horizon + sunny, sunny-night not mapped but sunny mapped → falls back to sunny day image', () => {
    const onlySunny = { sunny: BG.sunny_day };
    expect(resolveNightBackground('sunny', 'below_horizon', onlySunny, BG.default))
      .toBe(BG.sunny_day);
  });
});
