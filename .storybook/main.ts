import type { StorybookConfig } from "@storybook/react-vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { mergeConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: [
          // Explicit logical-layer aliases (defensive; keeps "@/layer" stable)
          {
            find: /^@\/FOUNDATION(\/.*)?$/,
            replacement: resolve(__dirname, "../src/FOUNDATION$1"),
          },
          {
            find: /^@\/PRIMITIVES(\/.*)?$/,
            replacement: resolve(__dirname, "../src/PRIMITIVES$1"),
          },
          {
            find: /^@\/COMPOSITION(\/.*)?$/,
            replacement: resolve(__dirname, "../src/COMPOSITION$1"),
          },
          { find: /^@\/PATTERNS(\/.*)?$/, replacement: resolve(__dirname, "../src/PATTERNS$1") },
          { find: /^@\/DOMAIN(\/.*)?$/, replacement: resolve(__dirname, "../src/DOMAIN$1") },
          // Keep existing alias behavior for everything else under src/
          { find: "@", replacement: resolve(__dirname, "../src") },
        ],
      },
    });
  },
};

export default config;
