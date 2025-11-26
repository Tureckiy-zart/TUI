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

    return {
      ...config,
      resolve: {
        ...resolveConfig,
        alias,
      },
    };
  },
};

export default config;
