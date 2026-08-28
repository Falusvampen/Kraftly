import js from '@eslint/js';
import globals from 'globals';
import pluginCypress from 'eslint-plugin-cypress';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  { ignores: ['dist/**', 'node_modules/**'] },

  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      'no-console': 'warn',
      'no-alert': 'warn',
      'no-var': 'error',
      eqeqeq: 'error',
      'vue/multi-word-component-names': 'off',
    },
  },

  {
    files: ['cypress/**/*.{js,ts,jsx,tsx}'],
    extends: [pluginCypress.configs.recommended],
  },

  pluginVue.configs['flat/essential'],
  eslintConfigPrettier,
]);
