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
      include: ['src/components/**/*.{js,jsx}', 'src/api/*.js'],
      reporter: ['text', 'json', 'html'],
      exclude: ['src/components/**/*.{constants,spec,test}.{js,jsx}', 'src.api/*.{test,spec}.js'],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: -10
    }
  }
})
