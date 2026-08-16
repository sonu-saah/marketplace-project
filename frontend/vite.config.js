import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false, // 🔥 Agar 5173 busy hoga toh ye automatically doosra port le lega
  }
})
