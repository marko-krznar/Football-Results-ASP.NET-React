import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['src/main.tsx', 'src/**/*.d.ts'],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:7057',
        changeOrigin: true,
        secure: false,
      },
      '/login': {
        target: 'https://localhost:7057',
        changeOrigin: true,
        secure: false,
      },
      '/logout': {
        target: 'https://localhost:7057',
        changeOrigin: true,
        secure: false,
      },
      '/manage': {
        target: 'https://localhost:7057',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})


