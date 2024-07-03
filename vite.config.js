import path from "path";
import { defineConfig } from 'vite';
import removeAttrsPlugin from "vite-plugin-vue-remove-attributes";

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), removeAttrsPlugin(["data-testid"])],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
