import { URL, fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    BASE_URL: JSON.stringify(process.env.BASE_URL),
    APP_VERSION: JSON.stringify(process.env.npm_package_version),
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true
    }
  }
})
