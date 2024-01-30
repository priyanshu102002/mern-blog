import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // jaha v /api ho wha pe http://localhost:5000/api/..... pe request bhej do
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        secure: false
      }
    }
  }
})
