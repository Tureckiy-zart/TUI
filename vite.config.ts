import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // Explicit logical-layer aliases (defensive; keeps "@/layer" stable)
      { find: /^@\/FOUNDATION(\/.*)?$/, replacement: resolve(__dirname, "src/FOUNDATION$1") },
      { find: /^@\/PRIMITIVES(\/.*)?$/, replacement: resolve(__dirname, "src/PRIMITIVES$1") },
      { find: /^@\/COMPOSITION(\/.*)?$/, replacement: resolve(__dirname, "src/COMPOSITION$1") },
      { find: /^@\/PATTERNS(\/.*)?$/, replacement: resolve(__dirname, "src/PATTERNS$1") },
      { find: /^@\/DOMAIN(\/.*)?$/, replacement: resolve(__dirname, "src/DOMAIN$1") },
      // Keep existing alias behavior for everything else under src/
      { find: "@", replacement: resolve(__dirname, "src") },
    ],
  },
});
