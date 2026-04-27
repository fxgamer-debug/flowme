import { defineConfig } from 'vite';
import { resolve } from 'node:path';

// Single-file library build for HACS distribution.
// The Paint Worklet source is imported as ?raw text and inlined into
// flowme-card.js, then loaded at runtime via a Blob URL. This keeps the
// entire card as one file and avoids HACS having to ship a second asset.
//
// Dev server: `npm run dev` starts Vite with index.html at the root, which
// imports src/dev/demo-app.ts. No lib mode is used in dev — the full module
// graph is served with hot reload via native ESM.
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    open: true,
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
