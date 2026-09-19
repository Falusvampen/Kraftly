import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// config from a starter template, seems to work /M
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
    },
  };
});
