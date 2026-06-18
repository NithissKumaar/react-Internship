import tailwindcss from "@tailwindcss/vite";

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target:
          "https://mm360.makingmindstechnologies.com",

        changeOrigin: true,
      },
    },
  },

  plugins: [react(),tailwindcss()],
})