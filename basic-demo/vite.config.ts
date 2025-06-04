import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mesqueeb/react-page-transition': path.resolve(__dirname, '../react-page-transition/src/index.ts')
    }
  }
})
