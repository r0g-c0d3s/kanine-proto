import { defineConfig } from 'vite';
import restart from 'vite-plugin-restart';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  root: 'src/', // Source files (typically where index.html is)
  publicDir: '../static/', // Path from "root" to static assets (files served as they are)
  server: {
    host: true, // Open to local network and display URL
    open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env), // Open if it's not a CodeSandbox
  },
  build: {
    outDir: '../dist', // Output to the dist/ folder
    emptyOutDir: true, // Empty the folder before building
    sourcemap: true, // Add sourcemaps for better debugging
  },
  plugins: [
    glsl(), // GLSL files support
    restart({ restart: ['../static/**'] }), // Restart server on static file change
  ],
});
