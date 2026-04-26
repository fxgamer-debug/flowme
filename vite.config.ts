import { defineConfig } from 'vite';
import { resolve } from 'node:path';

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
        inlineDynamicImports: false,
        manualChunks(id: string) {
          if (id.includes('flowme-painter')) return 'flowme-painter';
          return undefined;
        },
        chunkFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
    },
    target: 'es2020',
    sourcemap: true,
    minify: 'esbuild',
    emptyOutDir: true,
  },
});
