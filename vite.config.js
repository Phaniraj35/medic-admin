import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {configDefaults} from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.js',
    css: false,
    exclude: [...configDefaults.exclude, 'e2e'],
    coverage: {
      include: ['src/components/**/*.{js,jsx}', 'src/api/*.js'],
      reporter: ['text', 'json', 'html'],
      exclude: ['src/components/**/*.{constants,spec,e2e}.{js,jsx}', 'src.api/*.{e2e,spec}.js'],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: -10
    }
  }
})
