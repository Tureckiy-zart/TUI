export default {
  // TypeScript/JavaScript files: Prettier first, then ESLint fix
  // Строгая проверка (--max-warnings=0) выполняется в pre-push хуке
  "**/*.{ts,tsx,js,jsx}": [
    "prettier --write",
    "eslint --ext .ts,.tsx --fix --ignore-pattern '**/*.stories.*' --ignore-pattern '.storybook/**' --ignore-pattern 'storybook-static/**'",
  ],
  // Other files: only Prettier
  "**/*.{json,md,css,html,yml,yaml}": ["prettier --write"],
};
