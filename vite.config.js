import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  const apiProxy = {
    '/api': {
      target: env.API_URL || 'http://localhost:4000',
      changeOrigin: true,
      headers: { 'X-Api-Key': env.API_KEY || '' },
    },
  };

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      proxy: apiProxy,
    },
    preview: {
      port: 4173,
      proxy: apiProxy,
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./tests/setup.js'], // Kopplar setup-filen med jest-axe matchers
    },
  };
});
