import fs from 'node:fs';
import { fileURLToPath } from 'url';

import vue from '@vitejs/plugin-vue2';
import { defineConfig } from 'vite';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

const packageJsonPath = fileURLToPath(new URL('package.json', import.meta.url));
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const packageName = packageJson.name.split('/').pop();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), libInjectCss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: './src/lib.ts',
      name: packageName,
      fileName: (format) => `${packageName as string}.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
