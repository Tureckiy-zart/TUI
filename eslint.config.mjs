// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import prettierConfig from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";
import tenerifeUiArchitecture from "./eslint-rules/loader.mjs";

export default [
  {
    // =====================================================================
    //  GLOBAL IGNORE LIST
    // =====================================================================
    ignores: [
      "dist/**",
      "node_modules/**",
      "build/**",
      "coverage/**",
      ".storybook/**",
      "storybook-static/**",
      ".next/**",
      "docs-app/.next/**",
      "docs-app/**", // Documentation app - allow demo code
      "docs/**",
      ".cursor/**", // Cursor IDE configuration files
      "docs_archive/**",
      "*.config.{ts,js,mjs,cjs}",
      "vite.config.ts",
      "tailwind.config.ts",
      "jest.config.*",
      "jest.setup.js",
      "scripts/**",
      "tools/**", // Build-time tools (theme-generator, etc.)
      "playwright/**", // Playwright test files - configuration and test code
      "eslint-rules/**", // ESLint rule files - configuration, not source code
      "**/legacy/**", // Legacy files are excluded from token compliance
    ],
  },
  {
    name: "base",
    files: ["**/*.{ts,tsx}"],
    ignores: [
      "src/FOUNDATION/tokens/**",
      "**/*.stories.tsx",
      "**/*.stories.ts",
      "**/*.stories.js",
      "**/*.stories.jsx",
      "**/*.test.ts",
      "**/*.test.tsx",
      "**/*.spec.ts",
      "**/*.spec.tsx",
      "**/*.type-test.tsx",
      "**/__tests__/**",
      "**/tests/**",
    ],
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      "@typescript-eslint": tseslint.plugin,
      "tenerife-ui-architecture": tenerifeUiArchitecture,
      tm: tenerifeUiArchitecture,
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

      // Запрет импортов из next/document (только для pages/_document.tsx, несовместимо с App Router)
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "next/document",
              message:
                "next/document should ONLY be used in pages/_document.tsx. UI library components must not import Html or any other component from next/document. This is incompatible with Next.js App Router.",
            },
          ],
          patterns: [
            {
              group: ["next/document/*"],
              message:
                "next/document should ONLY be used in pages/_document.tsx. UI library components must not import from next/document. This is incompatible with Next.js App Router.",
            },
          ],
        },
      ],

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

      // ═══════════════════════════════════════════════════════════
      // ARCHITECTURE ENFORCEMENT - TOKEN-DRIVEN TYPING
      // ═══════════════════════════════════════════════════════════

      // Enforce token-driven typing for visual props
      "tenerife-ui-architecture/no-raw-visual-props": "error",

      // ═══════════════════════════════════════════════════════════
      // SCALE ENFORCEMENT - CANONICAL SCALE VALUES
      // ═══════════════════════════════════════════════════════════

      // Enforce canonical font-size scale values
      "tenerife-ui-architecture/no-raw-font-size-scale": "error",
      // Enforce canonical line-height scale values
      "tenerife-ui-architecture/no-raw-line-height-scale": "error",
      // Forbid raw line-height usage outside typography tokens
      "tenerife-ui-architecture/no-raw-line-height": "error",
      // Enforce canonical shadow/elevation scale values
      "tenerife-ui-architecture/no-raw-shadow-elevation-scale": "error",
      // Enforce canonical motion duration and easing scale values
      "tenerife-ui-architecture/no-raw-motion-scale": "error",

      // ═══════════════════════════════════════════════════════════
      // FOUNDATION ENFORCEMENT - REGRESSION GUARDS
      // ═══════════════════════════════════════════════════════════

      // Prevent Foundation components from exposing className/style props
      "tenerife-ui-architecture/no-foundation-classname-style": "error",
      "tenerife-ui-architecture/no-link-aschild": "error",
      // Prevent Foundation components from extending HTMLAttributes without Omit
      "tenerife-ui-architecture/no-foundation-open-htmlattributes": "error",

      // ═══════════════════════════════════════════════════════════
      // LIST USAGE ENFORCEMENT - CANONICAL COMPONENTS
      // ═══════════════════════════════════════════════════════════

      // Enforce usage of canonical List/ListItem components for vertical lists
      "tenerife-ui-architecture/no-ad-hoc-lists": "error",

      // ═══════════════════════════════════════════════════════════
      // TYPOGRAPHY COLOR POLICY ENFORCEMENT
      // ═══════════════════════════════════════════════════════════

      // Enforce Typography Color Policy v1 - forbid invalid role × text-token combinations
      "tenerife-ui-architecture/typography-color-policy": "error",

      // ═══════════════════════════════════════════════════════════
      // TYPOGRAPHY RHYTHM POLICY ENFORCEMENT
      // ═══════════════════════════════════════════════════════════

      // Enforce Typography Rhythm Policy v1 - forbid raw line-height values and role × line-height mismatches
      "tenerife-ui-architecture/typography-rhythm-policy": "error",
      // Enforce Typography Rhythm Policy v1 - forbid Tailwind leading-* classes on typography components
      "tenerife-ui-architecture/no-leading-tailwind": "error",
      // Enforce Typography Rhythm Policy v1 - forbid margin spacing (mt-*/mb-*) on typography components
      "tenerife-ui-architecture/no-text-margin-spacing": "error",

      // ═══════════════════════════════════════════════════════════
      // TOKEN COMPLIANCE - FORBID HARDCODED TAILWIND UTILITIES
      // ═══════════════════════════════════════════════════════════

      // Enforce token-based color utilities (for UI files only - see override below)
      "tenerife-ui-architecture/no-raw-tailwind-colors": "off", // Disabled globally, enabled for UI files only

      // Forbid hardcoded hex color codes
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/^#[0-9a-fA-F]{3,6}$/]",
          message:
            "Hex color codes are forbidden. Use token-based CSS variables (hsl(var(--token))) instead.",
        },
        {
          selector:
            "TemplateElement[value.raw=/\\b(bg|text|border)-(gray|blue|red|green|yellow|purple|pink|indigo|white|black|slate|zinc|neutral|stone|primary|secondary|accent|destructive|muted|card|popover|background|foreground)(-\\d+)?\\b/]",
          message:
            "Hardcoded Tailwind color utilities are forbidden. Use token-based CSS variables instead.",
        },
        {
          selector:
            "TemplateElement[value.raw=/\\b(p|m|gap|left|right|top|bottom|px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr|space-x|space-y)-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|64|96)\\b/]",
          message:
            "Numeric spacing classes are forbidden. Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.) instead.",
        },
        {
          selector: "TemplateElement[value.raw=/\\brounded-(none|sm|md|lg|xl|2xl|3xl|full)\\b/]",
          message:
            "Hardcoded radius classes are forbidden. Use radius tokens through component token system instead.",
        },
        {
          selector:
            "TemplateElement[value.raw=/\\b(h|w|min-h|min-w|max-h|max-w)-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|64|96|full|screen)\\b/]",
          message:
            "Numeric size classes are forbidden. Use size tokens through component token system instead.",
        },
        // Note: Typography size enforcement is now handled by no-raw-font-size-scale rule
        // The rule is more precise and only catches non-canonical values (base, 5xl, 6xl, 7xl, 8xl, 9xl)
        {
          selector:
            "TemplateElement[value.raw=/\\btransition-(all|colors|opacity|transform|none)\\b/]",
          message:
            "Hardcoded transition utilities are forbidden. Use MOTION_TOKENS for transitions instead.",
        },
        // Note: Motion duration enforcement is now handled by no-raw-motion-scale rule
        // The rule is more precise and only catches non-canonical durations (150, 300, 500, 700, 1000)
        {
          selector: "TemplateElement[value.raw=/hsl\\(var\\(--[^)]+\\)\\)/]",
          message:
            "Direct CSS variable usage in className is forbidden. Use token references instead of direct hsl(var(--*)).",
        },
      ],
    },
  },
  {
    // ═══════════════════════════════════════════════════════════
    // UI FILES - STRICT COLOR ENFORCEMENT
    // ═══════════════════════════════════════════════════════════
    // Apply stricter rules for UI component files
    name: "ui-files",
    files: [
      "src/components/ui/**/*.{ts,tsx}",
      "src/utils/createTokenCVA.ts",
      "src/FOUNDATION/lib/token-cva.ts",
    ],
    rules: {
      // Enable strict color enforcement for UI files
      "tenerife-ui-architecture/no-raw-tailwind-colors": "error",

      // Disable the generic color check from no-restricted-syntax for UI files
      // (we use the more precise no-raw-tailwind-colors rule instead)
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/^#[0-9a-fA-F]{3,6}$/]",
          message:
            "Hex color codes are forbidden. Use token-based CSS variables (hsl(var(--token))) instead.",
        },
        // Note: Color pattern removed - handled by no-raw-tailwind-colors
        {
          selector:
            "TemplateElement[value.raw=/\\b(p|m|gap|left|right|top|bottom|px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr|space-x|space-y)-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|64|96)\\b/]",
          message:
            "Numeric spacing classes are forbidden. Use semantic spacing tokens (px-sm, py-md, gap-lg, etc.) instead.",
        },
        {
          selector: "TemplateElement[value.raw=/\\brounded-(none|sm|md|lg|xl|2xl|3xl|full)\\b/]",
          message:
            "Hardcoded radius classes are forbidden. Use radius tokens through component token system instead.",
        },
        {
          selector:
            "TemplateElement[value.raw=/\\b(h|w|min-h|min-w|max-h|max-w)-(0|1|2|3|4|5|6|8|10|12|16|20|24|32|40|48|64|96|full|screen)\\b/]",
          message:
            "Numeric size classes are forbidden. Use size tokens through component token system instead.",
        },
        // Note: Typography size enforcement is now handled by no-raw-font-size-scale rule
        // The rule is more precise and only catches non-canonical values (base, 5xl, 6xl, 7xl, 8xl, 9xl)
        {
          selector:
            "TemplateElement[value.raw=/\\btransition-(all|colors|opacity|transform|none)\\b/]",
          message:
            "Hardcoded transition utilities are forbidden. Use MOTION_TOKENS for transitions instead.",
        },
        // Note: Motion duration enforcement is now handled by no-raw-motion-scale rule
        // The rule is more precise and only catches non-canonical durations (150, 300, 500, 700, 1000)
        {
          selector: "TemplateElement[value.raw=/hsl\\(var\\(--[^)]+\\)\\)/]",
          message:
            "Direct CSS variable usage in className is forbidden. Use token references instead of direct hsl(var(--*)).",
        },
      ],
    },
  },
  {
    name: "tm-legacy-css-vars",
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      tm: tenerifeUiArchitecture,
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
    },
    rules: {
      "tm/no-legacy-css-vars": "error",
    },
  },
  {
    name: "tm-no-raw-tailwind-colors-tests",
    files: ["src/**/*.{ts,tsx}"],
    plugins: {
      "tenerife-ui-architecture": tenerifeUiArchitecture,
    },
    rules: {
      "tenerife-ui-architecture/no-raw-tailwind-colors": "error",
    },
  },
  {
    // ═══════════════════════════════════════════════════════════
    // TEST FILES - MINIMAL CONFIGURATION
    // ═══════════════════════════════════════════════════════════
    // Test files need @typescript-eslint/no-unused-vars for eslint-disable comments
    name: "test-files",
    files: [
      "**/*.test.{ts,tsx}",
      "**/*.spec.{ts,tsx}",
      "**/*.type-test.{ts,tsx}",
      "**/__tests__/**/*.{ts,tsx}",
      "**/tests/**/*.{ts,tsx}",
    ],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Enable @typescript-eslint/no-unused-vars for test files
      // This allows eslint-disable-next-line comments to work
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  // Prettier integration (disables conflicting ESLint rules)
  prettierConfig,
  ...storybook.configs["flat/recommended"],
];
