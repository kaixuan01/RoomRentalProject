import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs/promises';
import svgr from '@svgr/rollup';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '');

  return {
    resolve: {
      alias: {
        src: resolve(__dirname, 'src'),
      },
    },
    esbuild: {
      loader: 'jsx',
      include: /src\/.*\.jsx?$/,
      exclude: [],
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          {
            name: 'load-js-files-as-jsx',
            setup(build) {
              build.onLoad(
                { filter: /src\\.*\.js$/ },
                async (args) => ({
                  loader: 'jsx',
                  contents: await fs.readFile(args.path, 'utf8'),
                })
              );
            },
          },
        ],
      },
    },
    plugins: [svgr(), react()],
    
    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: false,
      minify: true,
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },

    // Environment variables configuration
    define: {
      __API_URL__: JSON.stringify(env.VITE_API_URL),
    },

    // Server configuration
    server: {
      port: 3000,
      open: true,
      cors: true,
    },
  };
});
