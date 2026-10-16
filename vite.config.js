import { defineConfig } from 'vite';
export default defineConfig({
  build: {
    outDir: 'web/replay-viewer', emptyOutDir: false,
    lib: { entry: 'web/replay-detail/main.jsx', formats: ['es'], fileName: () => 'detail-flow.js' },
    cssCodeSplit: false,
    rollupOptions: { output: { assetFileNames: 'detail-flow.[ext]' } }
  },
  define: { 'process.env.NODE_ENV': JSON.stringify('production') }
});
