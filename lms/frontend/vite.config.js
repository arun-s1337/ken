import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@Landingpage': path.resolve(__dirname, 'src/Landingpage'),
      '@About': path.resolve(__dirname, 'src/About'),
      '@Admin': path.resolve(__dirname, 'src/Admin'),
      '@Blog': path.resolve(__dirname, 'src/Blog'),
      '@Book': path.resolve(__dirname, 'src/Book'),
      '@Checkout': path.resolve(__dirname, 'src/Checkout'),
      '@Contact': path.resolve(__dirname, 'src/Contact'),
      '@User': path.resolve(__dirname, 'src/Userprofile'),
      '@Lms': path.resolve(__dirname, 'src/Lms'),
      '@Scroll': path.resolve(__dirname, 'src/ScrollToTop.jsx'),
      '@Protected': path.resolve(__dirname, 'src/ProtectedRoute.jsx'),
      '@Forgot': path.resolve(__dirname, 'src/ForgotPassword')
    }
  },
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': 'http://backend:5000' // Docker container name mapping
    }
  }
});
