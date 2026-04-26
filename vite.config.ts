import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Single-file library build for HACS distribution.
// The Paint Worklet source is imported as ?raw text and inlined into
// flowme-card.js, then loaded at runtime via a Blob URL. This keeps the
// entire card as one file and avoids HACS having to ship a second asset.
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/flowme-card.ts'),
      formats: ['es'],
      fileName: () => 'flowme-card.js',
    },
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
        assetFileNames: '[name][extname]',
      },
    },
    target: 'es2020',
    sourcemap: true,
    minify: 'esbuild',
    emptyOutDir: true,
  },
});
