import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    styles: "src/styles.ts",
    preset: "src/preset.ts",
    "tokens/index": "src/tokens/index.ts",
    "theme/index": "src/theme/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  splitting: false,
  sourcemap: false,
  tsconfig: "tsconfig.json",
  esbuildOptions(options) {
    options.mainFields = ["module", "main"];
    options.resolveExtensions = [".tsx", ".ts", ".jsx", ".js", ".mjs", ".cjs", ".json"];
  },
  external: [
    // React and React DOM
    "react",
    "react-dom",
    "react/jsx-runtime",
    // Radix UI packages
    "@radix-ui/react-dropdown-menu",
    "@radix-ui/react-dialog",
    "@radix-ui/react-navigation-menu",
    "@radix-ui/react-toast",
    "@radix-ui/react-label",
    "@radix-ui/react-slot",
    "@radix-ui/react-tooltip",
    "@radix-ui/react-popover",
    "@radix-ui/react-select",
    "@radix-ui/react-checkbox",
    "@radix-ui/react-radio-group",
    "@radix-ui/react-switch",
    "@radix-ui/react-tabs",
    "@radix-ui/react-accordion",
    "@radix-ui/react-collapsible",
    "@radix-ui/react-separator",
    "@radix-ui/react-progress",
    "@radix-ui/react-avatar",
    "@radix-ui/react-badge",
    "@radix-ui/react-calendar",
    // Utility libraries
    "class-variance-authority",
    "clsx",
    "lucide-react",
    "tailwind-merge",
    "zustand",
    // Form libraries
    "react-hook-form",
    "@hookform/resolvers",
    "zod",
    // Tailwind
    "tailwindcss",
  ],
  banner: {
    js: '"use client";',
  },
  outDir: "dist",
  outExtension({ format }) {
    return {
      js: format === "esm" ? ".mjs" : ".cjs",
    };
  },
  treeshake: true,
  minify: false,
});
