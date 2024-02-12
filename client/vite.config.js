import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), vanillaExtractPlugin()],
  server: {
    host: true,
    strictPort: true,
    port: 3000,
    resolve: {},
    proxy: {
      '/api': {
        target: 'http://restaurantappdemo:3000/',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
