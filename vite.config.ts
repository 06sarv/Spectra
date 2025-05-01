import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

export default defineConfig({
  plugins: [react()],
  root: resolve(projectRoot, 'client'),
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'client/src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: resolve(projectRoot, 'dist'),
    emptyOutDir: true,
  },
});
