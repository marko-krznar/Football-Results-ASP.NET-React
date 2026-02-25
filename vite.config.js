import { defineConfig } from 'vite'
import reactSWC from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactSWC()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
