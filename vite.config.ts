import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

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
