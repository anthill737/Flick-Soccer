import { defineConfig } from 'vite';

// IMPORTANT: The 'base' option must match your repo name for GitHub Pages to work.
// Your repo is "Flick-Soccer", so base is "/Flick-Soccer/".
// If you rename the repo, update this value.
export default defineConfig({
  base: '/Flick-Soccer/',
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    host: true, // expose on local network so your phone can load it via Vite dev
    port: 5173,
  },
});
