import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Frontend dev server proxies /api/* to whichever backend you started.
// Default to Java (8080). Override with API_PORT=5080 npm run dev for .NET.
const apiPort = Number(process.env.API_PORT ?? 8080);

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: `http://localhost:${apiPort}`,
        changeOrigin: true,
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
