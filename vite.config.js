import { defineConfig } from 'vite'

export default defineConfig({
  base: '/futurel-consulting.github.io/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    publicDir: 'public',
  }
}) 