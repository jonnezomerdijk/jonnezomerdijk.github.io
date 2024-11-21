import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',  // Ensure the base path is correct for deployment on GitHub Pages
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],  // Exclude lucide-react if it's large or unnecessary during optimization
  },
  build: {
    minify: true,  // Enable minification for production (you may set it to false to test)
    outDir: 'dist',  // Output directory for the build
    assetsDir: 'assets',  // Directory for the static assets like images, CSS, etc.
    sourcemap: true,  // Disable sourcemaps in production for smaller builds, set to `true` for debugging
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],  // Separate vendor code into a chunk
          'ui': ['@radix-ui/react-dialog', '@radix-ui/react-tabs'],  // Optional, for custom chunking
        },
      },
    },
  },
});
