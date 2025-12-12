import { resolve } from "path";

const config = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-onboarding",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    check: false,
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop: { parent?: { fileName: string } }) =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  async viteFinal(config: any) {
    const resolveConfig = config.resolve ?? {};
    const alias = Array.isArray(resolveConfig.alias)
      ? [...resolveConfig.alias, { find: "@", replacement: resolve(__dirname, "../src") }]
      : {
          ...(resolveConfig.alias ?? {}),
          "@": resolve(__dirname, "../src"),
        };

    // Disable sourcemaps for Storybook build to eliminate
    // "Can't resolve original location of error" warnings.
    // This is a tooling-level decision and does NOT affect
    // the library build sourcemaps (configured in tsup.config.ts).
    // Sourcemaps are disabled here because Storybook's dev server
    // doesn't need them and they generate excessive console noise.
    //
    // Defensive override: Force sourcemaps to false regardless of
    // environment variables (e.g., VITE_SOURCEMAP) to ensure
    // consistent behavior across all environments.
    return {
      ...config,
      resolve: {
        ...resolveConfig,
        alias,
      },
      build: {
        ...config.build,
        // Explicitly disable sourcemaps in build (defensive override)
        sourcemap: false,
      },
      esbuild: {
        ...config.esbuild,
        // Explicitly disable sourcemaps in esbuild (defensive override)
        sourcemap: false,
        // Disable sourcemap generation at the esbuild level
        legalComments: "none",
      },
      // Disable sourcemaps in optimizeDeps as well
      optimizeDeps: {
        ...config.optimizeDeps,
        esbuildOptions: {
          ...config.optimizeDeps?.esbuildOptions,
          sourcemap: false,
        },
      },
    };
  },
};

export default config;
