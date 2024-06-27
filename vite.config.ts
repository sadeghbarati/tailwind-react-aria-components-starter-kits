import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
// import { visualizer } from 'rollup-plugin-visualizer';

// import tailwind from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  // css: {
  //   postcss: {
  //     plugins: [
  //     ]
  //   }
  // },
  plugins: [
    react(),
    // visualizer() as PluginOption
  ],
});
