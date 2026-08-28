import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';
import { defineConfig } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default defineConfig([
  { ignores: ['dist/**', 'node_modules/**'] },
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      'no-console': 'warn',
      'no-alert': 'warn',
      'no-var': 'error',
      eqeqeq: 'error',
      'vue/multi-word-component-names': 'off',
    },
  },
  pluginVue.configs['flat/essential'],
  eslintConfigPrettier,
]);
