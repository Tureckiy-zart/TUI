import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";

export default tseslint.config(
  {
    ignores: ["**/*.stories.tsx", "**/*.test.tsx", "**/*.test.ts", "dist/**", "node_modules/**"],
  },
  {
    name: "base",
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        allowDefaultProject: true,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react/jsx-key": "warn",
    },
  }
);

