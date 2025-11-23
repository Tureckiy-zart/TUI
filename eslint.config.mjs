import prettierConfig from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "build/**",
      "coverage/**",
      ".storybook/**",
      "storybook-static/**",
      "**/*.stories.tsx",
      "**/*.stories.ts",
      "**/*.stories.js",
      "**/*.stories.jsx",
      "**/*.test.tsx",
      "**/*.test.ts",
      "*.config.{ts,js,mjs,cjs}",
      "vite.config.ts",
      "tailwind.config.ts",
      "jest.config.*",
      "jest.setup.js",
      "scripts/**",
    ],
  },
  {
    name: "base",
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        allowDefaultProject: true,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        React: "readonly",
        JSX: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // ═══════════════════════════════════════════════════════════
      // REACT РАЗМЕТКА И JSX
      // ═══════════════════════════════════════════════════════════

      // Разрешаем апострофы и кавычки в тексте (не требуем &apos;)
      "react/no-unescaped-entities": "off",

      // ═══════════════════════════════════════════════════════════
      // TYPESCRIPT ТИПИЗАЦИЯ
      // ═══════════════════════════════════════════════════════════

      // any - отключено (временно, пока не исправим все типы)
      "@typescript-eslint/no-explicit-any": "off",

      // Unused imports and variables (более строгий плагин)
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // Отключаем базовый TypeScript no-unused-vars в пользу unused-imports
      "@typescript-eslint/no-unused-vars": "off",

      // ═══════════════════════════════════════════════════════════
      // КОНСОЛЬ И ОТЛАДКА
      // ═══════════════════════════════════════════════════════════

      // console методы разрешены (log, info, debug, warn, error)
      // Только предупреждение для напоминания убрать из production
      "no-console": [
        "warn",
        {
          allow: ["log", "info", "debug", "warn", "error"],
        },
      ],

      // debugger в production - ошибка (нельзя оставлять в коде)
      "no-debugger": "error",

      // ═══════════════════════════════════════════════════════════
      // ПЕРЕМЕННЫЕ И КОНСТАНТЫ
      // ═══════════════════════════════════════════════════════════

      // const вместо let где возможно - предупреждение
      "prefer-const": "warn",

      // const вместо var - предупреждение
      "no-var": "warn",

      // Неиспользуемые параметры в функциях - предупреждение
      "no-unused-vars": "off", // Отключаем базовый, используем TypeScript версию

      // ═══════════════════════════════════════════════════════════
      // ИМПОРТЫ И ЭКСПОРТЫ
      // ═══════════════════════════════════════════════════════════

      // require() вместо import - ошибка (используем ES6 modules)
      "@typescript-eslint/no-require-imports": "error",

      // Дублирующиеся импорты - предупреждение
      "no-duplicate-imports": "warn",

      // Import sorting (automatic)
      "simple-import-sort/imports": "warn",
      "simple-import-sort/exports": "warn",

      // ═══════════════════════════════════════════════════════════
      // КАЧЕСТВО КОДА
      // ═══════════════════════════════════════════════════════════

      // == вместо === - предупреждение (строгое сравнение рекомендуется)
      eqeqeq: ["warn", "always"],

      // Вложенные тернарные операторы - предупреждение
      "no-nested-ternary": "warn",

      // Несколько пустых строк подряд - предупреждение
      "no-multiple-empty-lines": ["warn", { max: 2, maxEOF: 1 }],

      // Пустые функции - предупреждение (лучше комментарий // todo)
      "no-empty-function": [
        "warn",
        {
          allow: ["arrowFunctions", "generatorFunctions"],
        },
      ],

      // Неэффективные циклы - предупреждение
      "no-loop-func": "warn",

      // Множественные пробелы - предупреждение
      "no-multi-spaces": "warn",

      // Неявные преобразования типов - отключено (!!value и +value допустимы)
      "no-implicit-coercion": "off",

      // Теневые переменные - отключено (TypeScript и так предупреждает)
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "off",

      // Неиспользуемые выражения - отключено (много false positives)
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "off",

      // Длинные функции - предупреждение (больше 250 строк для сложных компонентов)
      "max-lines-per-function": [
        "warn",
        {
          max: 250,
          skipBlankLines: true,
          skipComments: true,
        },
      ],

      // Сложность кода - предупреждение (цикломатическая сложность до 75 для сложных компонентов)
      complexity: ["warn", 75],

      // Максимальная глубина вложенности - предупреждение
      "max-depth": ["warn", 4],

      // Максимальное количество параметров - предупреждение
      "max-params": ["warn", 5],

      // ═══════════════════════════════════════════════════════════
      // СТИЛЬ И ЧИТАЕМОСТЬ
      // ═══════════════════════════════════════════════════════════

      // Предпочитать arrow functions
      "prefer-arrow-callback": "warn",

      // Использовать template strings вместо конкатенации
      "prefer-template": "warn",

      // Деструктуризация объектов где возможно
      "prefer-destructuring": [
        "warn",
        {
          array: false, // массивы можно не деструктурировать
          object: true, // объекты деструктурировать
        },
      ],

      // Спрятанные блоки под if - предупреждение
      "no-lonely-if": "warn",

      // ═══════════════════════════════════════════════════════════
      // БЕЗОПАСНОСТЬ
      // ═══════════════════════════════════════════════════════════

      // eval() - ошибка (опасно)
      "no-eval": "error",

      // ═══════════════════════════════════════════════════════════
      // REACT HOOKS
      // ═══════════════════════════════════════════════════════════

      // Отсутствующие зависимости в useEffect - ошибка
      "react-hooks/exhaustive-deps": "error",
      "react-hooks/rules-of-hooks": "error",

      // ═══════════════════════════════════════════════════════════
      // REACT СПЕЦИФИКА
      // ═══════════════════════════════════════════════════════════

      // Обязательные пропсы для React компонентов
      "react/prop-types": "off", // TypeScript заменяет prop-types
      "react/react-in-jsx-scope": "off", // React 17+ не требует import
      "react/jsx-key": "warn",
      "react/display-name": "warn",
    },
  },
  // Prettier integration (disables conflicting ESLint rules)
  prettierConfig,
];
