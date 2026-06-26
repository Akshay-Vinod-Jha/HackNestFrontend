import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 800, // Increase limit as React + UI libraries are inherently heavy
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Group heavy vendor libraries into their own chunk
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer';
            }
            if (id.includes('axios') || id.includes('zustand')) {
              return 'vendor-utils';
            }
            return 'vendor'; // Fallback for other node_modules
          }
        }
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true,
  }
})
