import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('framer-motion')) return 'framer-motion'
          if (id.includes('gsap') || id.includes('ScrollTrigger') || id.includes('Flip')) return 'gsap'
          if (id.includes('three')) return 'three'
          if (id.includes('shiki')) return 'shiki-core'
        },
      },
    },
  },
})
