import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

/**
 * Separate config so the production Vite bundle (vite.config.ts) stays laser-
 * focused on a single-file library output. Tests run in happy-dom which is
 * enough for the Lit smoke test and the pure-logic unit tests without a real
 * browser in CI.
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'happy-dom',
    include: ['tests/**/*.test.ts'],
    globals: true,
    reporters: 'default',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.d.ts', 'src/flowme-painter-worklet.js'],
    },
  },
});
