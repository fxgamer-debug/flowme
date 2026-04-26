import { describe, it, expect } from 'vitest';

import { findUnsafeUrls, assertSafeCardConfig } from '../../src/overlays/url-scan.js';

describe('findUnsafeUrls', () => {
  it('accepts clean configs', () => {
    expect(
      findUnsafeUrls({
        type: 'entity',
        entity: 'sensor.foo',
        image: 'https://example.com/cat.jpg',
        fallback: '/local/cat.png',
      }),
    ).toEqual([]);
  });

  it('rejects javascript: strings', () => {
    const hits = findUnsafeUrls({
      type: 'markdown',
      content: 'click here',
      tap_action: { url_path: 'javascript:alert(1)' },
    });
    expect(hits).toHaveLength(1);
    expect(hits[0]?.scheme).toBe('javascript:');
    expect(hits[0]?.path).toBe('card_config.tap_action.url_path');
  });

  it('rejects data: / vbscript: / file: schemes', () => {
    for (const scheme of ['data:', 'vbscript:', 'file:']) {
      const hits = findUnsafeUrls({ src: `${scheme}whatever` });
      expect(hits).toHaveLength(1);
      expect(hits[0]?.scheme).toBe(scheme);
    }
  });

  it('is case-insensitive for the scheme prefix', () => {
    expect(findUnsafeUrls({ u: 'JavaScript:void(0)' })).toHaveLength(1);
    expect(findUnsafeUrls({ u: 'JAVASCRIPT:alert(1)' })).toHaveLength(1);
    expect(findUnsafeUrls({ u: '  javascript:alert(1)' })).toHaveLength(1);
  });

  it('walks arrays recursively', () => {
    const hits = findUnsafeUrls({
      cards: [
        { type: 'entity', entity: 'sensor.ok' },
        { type: 'entity', entity: 'sensor.ok', attachments: ['file:///etc/passwd'] },
      ],
    });
    expect(hits).toHaveLength(1);
    expect(hits[0]?.path).toBe('card_config.cards[1].attachments[0]');
  });

  it('walks nested objects recursively', () => {
    const hits = findUnsafeUrls({
      deep: { deeper: { deepest: { url: 'vbscript:bad' } } },
    });
    expect(hits[0]?.path).toBe('card_config.deep.deeper.deepest.url');
  });

  it('does not loop on cyclic references', () => {
    const a: Record<string, unknown> = { name: 'a' };
    const b: Record<string, unknown> = { name: 'b', ref: a };
    a['ref'] = b;
    expect(() => findUnsafeUrls(a)).not.toThrow();
  });

  it('ignores null / undefined / number / boolean values', () => {
    expect(
      findUnsafeUrls({
        null_field: null,
        undef: undefined,
        num: 42,
        yes: true,
        nested: { again_null: null },
      }),
    ).toEqual([]);
  });
});

describe('assertSafeCardConfig', () => {
  it('does not throw for clean configs', () => {
    expect(() =>
      assertSafeCardConfig({ type: 'entity', entity: 'sensor.foo' }),
    ).not.toThrow();
  });

  it('throws with a descriptive message including the first offending path', () => {
    expect(() =>
      assertSafeCardConfig({ link: 'javascript:alert(1)' }),
    ).toThrow(/javascript:/);
  });
});
