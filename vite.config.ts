import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',  // Ensures the assets are linked correctly for GitHub Pages
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',  // This is where the build files will go
    assetsDir: 'assets',  // All your static assets will go here
    copyPublicDir: true,
    sourcemap: true,
    rollupOptions: {
      input: './index.html',  // The entry file for your app
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
    assetsInlineLimit: 0,
  },
  esbuild: {
    jsx: 'automatic',
  },
});
