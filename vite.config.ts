import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@router': path.resolve(import.meta.dirname, './src/router'),
      '@styles': path.resolve(import.meta.dirname, './src/styles'),
      '@layouts': path.resolve(import.meta.dirname, './src/layouts'),
      '@pages': path.resolve(import.meta.dirname, './src/pages')
    }
  },
  plugins: [react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()]
});
