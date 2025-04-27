import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  server: {
    port: 4444,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './index.js',
      exportName: 'viteNodeApp'
    })
  ],
  build: {
    target: 'node18',
    ssr: true,
    outDir: 'dist',
    rollupOptions: { external: ['express'] }
  }
});