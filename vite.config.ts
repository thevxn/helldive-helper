import { URL, fileURLToPath } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  define: {
    BASE_URL: JSON.stringify(process.env.BASE_URL)
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
    // proxy: {
    //   '/api': {
    //     target: 'http://api:4001',
    //     changeOrigin: true,
    //     secure: false
    //   }
    // },
    watch: {
      usePolling: true
    }
  }
})
