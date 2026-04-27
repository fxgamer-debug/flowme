import { describe, it, expect } from 'vitest';

/**
 * Pure-function test for weather state → background image matching.
 * Tests the exact-string match logic used by resolveTargetBackground().
 * All 16 standard Met.no states are exercised.
 */

function resolveWeatherBackground(
  state: string,
  weatherStates: Record<string, string>,
  defaultBg: string,
): string {
  const match = weatherStates[state];
  return match ?? defaultBg;
}

const WEATHER_MAP: Record<string, string> = {
  sunny: 'bg_sunny_day',
  partlycloudy: 'bg_clear_sky',
  'clear-night': 'bg_clear_night',
  'partlycloudy-night': 'bg_clear_night',
  cloudy: 'bg_cloudy',
  windy: 'bg_catchall',
  'windy-variant': 'bg_catchall',
  rainy: 'bg_rainy',
  pouring: 'bg_rainy',
  lightning: 'bg_lightning',
  'lightning-rainy': 'bg_lightning',
  snowy: 'bg_snowy',
  'snowy-rainy': 'bg_snowy',
  hail: 'bg_snowy',
  fog: 'bg_catchall',
  exceptional: 'bg_catchall',
};

const DEFAULT_BG = 'bg_default';

describe('weather state → background image matching', () => {
  const cases: [string, string][] = [
    ['sunny', 'bg_sunny_day'],
    ['partlycloudy', 'bg_clear_sky'],
    ['clear-night', 'bg_clear_night'],
    ['partlycloudy-night', 'bg_clear_night'],
    ['cloudy', 'bg_cloudy'],
    ['windy', 'bg_catchall'],
    ['windy-variant', 'bg_catchall'],
    ['rainy', 'bg_rainy'],
    ['pouring', 'bg_rainy'],
    ['lightning', 'bg_lightning'],
    ['lightning-rainy', 'bg_lightning'],
    ['snowy', 'bg_snowy'],
    ['snowy-rainy', 'bg_snowy'],
    ['hail', 'bg_snowy'],
    ['fog', 'bg_catchall'],
    ['exceptional', 'bg_catchall'],
  ];

  for (const [state, expected] of cases) {
    it(`"${state}" → ${expected}`, () => {
      expect(resolveWeatherBackground(state, WEATHER_MAP, DEFAULT_BG)).toBe(expected);
    });
  }

  it('unknown state falls back to default', () => {
    expect(resolveWeatherBackground('unknown-state', WEATHER_MAP, DEFAULT_BG)).toBe(DEFAULT_BG);
  });

  it('exact string match — no case normalisation (Clear-Night must not match clear-night)', () => {
    // HA sends lowercase hyphenated strings; if a user misconfigures keys with
    // wrong case, they should not accidentally match.
    expect(resolveWeatherBackground('Clear-Night', WEATHER_MAP, DEFAULT_BG)).toBe(DEFAULT_BG);
    expect(resolveWeatherBackground('SUNNY', WEATHER_MAP, DEFAULT_BG)).toBe(DEFAULT_BG);
  });

  it('custom integration state strings are supported as map keys', () => {
    const customMap = { ...WEATHER_MAP, 'my-custom-state': 'bg_custom' };
    expect(resolveWeatherBackground('my-custom-state', customMap, DEFAULT_BG)).toBe('bg_custom');
  });
});
