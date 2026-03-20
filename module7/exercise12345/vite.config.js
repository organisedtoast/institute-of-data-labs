import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

// This configuration sets up a proxy for API requests to the CoinGecko API. 
// Any request made to '/api' will be forwarded to 'https://api.coingecko.com/api/v3', 
// allowing you to avoid CORS issues during development.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.coingecko.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api/v3')
      }
    }
  }
})
