/**
 * PostCSS Configuration
 *
 * This configuration file is used by:
 * - Vite (for dev server and Storybook)
 * - tsup (for production builds via onSuccess hook)
 *
 * IMPORTANT: The explicit path to tailwind.config.ts is required because:
 * 1. Some build tools may not automatically resolve the config file
 * 2. It ensures consistent behavior across different environments
 * 3. It prevents issues with module resolution in some build tools
 *
 * @type {import('postcss-load-config').Config}
 */
const config = {
  plugins: {
    /**
     * Tailwind CSS plugin
     * Processes @tailwind directives and generates utility classes
     */
    tailwindcss: {
      /**
       * Explicitly specify the path to tailwind.config.ts
       * This ensures PostCSS can find the configuration file in all build scenarios
       */
      config: "./tailwind.config.ts",
    },
    /**
     * Autoprefixer plugin
     * Automatically adds vendor prefixes to CSS properties
     * Ensures cross-browser compatibility
     */
    autoprefixer: {},
  },
};

export default config;
