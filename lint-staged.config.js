export default {
  // TypeScript/JavaScript files: Prettier first, then ESLint fix
  // Строгая проверка (--max-warnings=0) выполняется в pre-push хуке
  // Note: Theme TS files are handled separately below
  "**/*.{ts,tsx,js,jsx}": [
    "prettier --write",
    "eslint --ext .ts,.tsx --fix --ignore-pattern '**/*.stories.*' --ignore-pattern '.storybook/**' --ignore-pattern 'storybook-static/**' --ignore-pattern 'docs/**' --ignore-pattern '.cursor/**' --ignore-pattern 'docs_archive/**'",
  ],

  // Other files: only Prettier
  "**/*.{json,md,html,yml,yaml}": ["prettier --write"],

  // CSS files (non-theme): only Prettier
  "!(src/FOUNDATION/tokens/themes/**)*.css": ["prettier --write"],

  // Theme CSS files: Prettier + Theme validation
  // Validates against Theme Contract v1
  "src/FOUNDATION/tokens/themes/**/*.css": ["prettier --write", "pnpm theme:validate --"],

  // src/themes/*.ts are runtime configs (ThemeOverride) and barrels, not Theme Contract v1
  // definitions; theme:validate is for CSS/TS files with --tm- token objects (see tools/theme-validator).

  // Extension themes (legacy root location): Prettier + Theme validation
  "themes/**/*.css": ["prettier --write", "pnpm theme:validate --"],
  "themes/**/*.json": ["prettier --write", "pnpm theme:validate --"],
  "themes/**/*.ts": ["pnpm theme:validate --"],

  // Extension themes (canonical location): Prettier + Theme validation
  "src/EXTENSIONS/themes/**/*.css": ["prettier --write", "pnpm theme:validate --"],
  "src/EXTENSIONS/themes/**/*.json": ["prettier --write", "pnpm theme:validate --"],
  "src/EXTENSIONS/themes/**/*.ts": ["pnpm theme:validate --"],
};
