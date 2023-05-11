import vue from '@vitejs/plugin-vue2';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [vue()],
});
