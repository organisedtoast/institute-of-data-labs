import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Vite runs the React app on http://localhost:5173 during development.
    // Our Express server runs separately on http://localhost:3001.
    //
    // Browsers protect users with CORS rules. If React on port 5173 tried to call
    // port 3001 directly, the browser could block the request as cross-origin.
    //
    // This proxy lets the browser make a same-origin request to "/api/...".
    // Vite then forwards that request to the Express server behind the scenes.
    //
    // Beginner-friendly rule:
    // Frontend code should always call relative "/api" routes.
    // Do not hard-code "http://localhost:3001" in React components.
    // Do not call the ROIC API directly from the browser.
    //
    // Important: this only helps during local development. In production,
    // you still need a real backend or hosting rewrite for "/api" routes.
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
