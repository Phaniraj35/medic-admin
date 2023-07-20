import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    css: false,
    coverage: {
      include: ['src/components/**/*.{js,jsx}'],
      reporter: ['text', 'json', 'html'],
      exclude: ['src/components/**/*.{constants,spec,test}.{js,jsx}'],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: -10
    }
  }
})
