import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://13.210.245.134:4001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

