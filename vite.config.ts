import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: './client',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'client/src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
});
