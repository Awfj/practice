import path from "path";
import removeTestIdAttribute from 'rollup-plugin-jsx-remove-attributes';
import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), removeTestIdAttribute({
    include: [/\.[tj]sx$/],
    exclude: ['**/node_modules/**'],
    attributes: ['data-testid'],
    environments: ['production', 'pre-prod', 'prod', 'q&a'],
    debug: true,
    usage: 'vite'
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
