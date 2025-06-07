import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mesqueeb/react-page-transition': path.resolve(__dirname, '../react-page-transition/src'),
    },
  },
})
