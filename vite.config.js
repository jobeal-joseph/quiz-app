import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Requests to /api will be proxied
      '/api': {
        target: '${import.meta.env.VITE_API_URL}', // Your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
