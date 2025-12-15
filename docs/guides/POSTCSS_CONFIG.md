# PostCSS и Tailwind CSS Конфигурация

Этот документ описывает конфигурацию PostCSS и Tailwind CSS в библиотеке Tenerife.Music UI.

## Обзор

Библиотека использует PostCSS для обработки CSS файлов с помощью Tailwind CSS и Autoprefixer. Конфигурация работает во всех сценариях:

- **Разработка (Vite)**: PostCSS автоматически обрабатывает CSS через `postcss.config.mjs`
- **Storybook**: Использует Vite, поэтому PostCSS работает автоматически
- **Production сборка (tsup)**: CSS обрабатывается через PostCSS в хуке `onSuccess`

## Структура конфигурационных файлов

### `postcss.config.mjs`

Основной файл конфигурации PostCSS:

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {
      config: "./tailwind.config.ts",
    },
    autoprefixer: {},
  },
};

export default config;
```

**Важные моменты:**

- Явно указан путь к `tailwind.config.ts` для обеспечения консистентности во всех окружениях
- Используется формат ES modules (`.mjs`) для совместимости с современными инструментами
- Autoprefixer автоматически добавляет vendor prefixes

### `tailwind.config.ts`

Конфигурация Tailwind CSS содержит:

- Импорты токенов (colors, spacing, typography, shadows, radius, motion)
- Safelist для классов, которые должны быть включены в финальный CSS
- Настройки dark mode
- Content paths для сканирования файлов

### `tsup.config.ts`

Конфигурация сборки включает обработку CSS через PostCSS:

```typescript
async onSuccess() {
  // Обработка CSS файлов через PostCSS после сборки
  const cssFiles = ["dist/styles.css"];
  
  for (const cssFile of cssFiles) {
    const cssPath = join(process.cwd(), cssFile);
    const css = readFileSync(cssPath, "utf-8");
    
    const result = await postcss([
      tailwindcss({ config: "./tailwind.config.ts" }),
      autoprefixer(),
    ]).process(css, { from: cssPath, to: cssPath });
    
    writeFileSync(cssPath, result.css);
  }
}
```

**Почему это необходимо:**

- `tsup` использует `esbuild`, который не поддерживает PostCSS нативно
- CSS файлы нужно обрабатывать вручную после сборки
- Это гарантирует, что Tailwind директивы обработаны и vendor prefixes добавлены

## Структура CSS файлов

### `src/styles.ts`

Точка входа для стилей библиотеки:

```typescript
/**
 * IMPORTANT: Order matters!
 * 1. First import globals.css with Tailwind directives
 * 2. Then import theme/global.css with theme-specific styles
 */
import "./styles/globals.css";
import "./theme/global.css";
```

**Порядок импорта важен:**

1. `globals.css` содержит директивы Tailwind (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
2. `theme/global.css` содержит дополнительные стили темы

### `src/styles/globals.css`

Содержит:

- Директивы Tailwind CSS (`@tailwind base`, `@tailwind components`, `@tailwind utilities`)
- Кастомные компоненты в `@layer components`
- Поддержку reduced motion

### `src/theme/global.css`

Содержит:

- Базовые стили темы
- CSS переменные (устанавливаются динамически через `applyMode.ts`)
- Стили для scrollbar, selection, focus

## Как это работает

### Разработка (Vite)

1. Vite автоматически находит `postcss.config.mjs`
2. PostCSS обрабатывает CSS файлы при импорте
3. Tailwind директивы обрабатываются и генерируются классы
4. Autoprefixer добавляет vendor prefixes

### Storybook

1. Storybook использует Vite под капотом
2. PostCSS конфигурация работает автоматически
3. Стили обрабатываются так же, как в dev режиме

### Production сборка (tsup)

1. `tsup` собирает JavaScript и CSS файлы
2. CSS файлы копируются в `dist/` без обработки
3. Хук `onSuccess` запускается после сборки
4. CSS файлы обрабатываются через PostCSS
5. Обработанный CSS записывается обратно в `dist/styles.css`

## Проверка конфигурации

### Проверка dev режима

```bash
npm run dev
```

Проверьте, что:
- Tailwind классы применяются в браузере
- Нет ошибок в консоли
- Стили отображаются корректно

### Проверка Storybook

```bash
npm run storybook
```

Проверьте, что:
- Компоненты отображаются со стилями
- Tailwind классы работают
- Темы переключаются корректно

### Проверка production сборки

```bash
npm run build
```

Проверьте, что:
- `dist/styles.css` содержит сгенерированные Tailwind классы
- Размер файла значительно больше исходного (признак обработки)
- Vendor prefixes присутствуют (например, `-webkit-`, `-moz-`)

Пример проверки:

```bash
# Проверить размер файла
ls -lh dist/styles.css

# Проверить наличие Tailwind классов
grep -c "\.bg-primary\|\.text-primary" dist/styles.css

# Проверить наличие vendor prefixes
grep -c "-webkit-\|-moz-" dist/styles.css
```

## Устранение проблем

### Проблема: Tailwind классы не работают в production сборке

**Решение:**

1. Убедитесь, что `src/styles.ts` импортирует `globals.css` перед `theme/global.css`
2. Проверьте, что `tsup.config.ts` содержит хук `onSuccess` с обработкой PostCSS
3. Убедитесь, что `postcss.config.mjs` существует и правильно настроен

### Проблема: PostCSS не находит `tailwind.config.ts`

**Решение:**

1. Убедитесь, что путь указан явно в `postcss.config.mjs`:
   ```javascript
   tailwindcss: {
     config: "./tailwind.config.ts",
   }
   ```
2. Проверьте, что файл `tailwind.config.ts` существует в корне проекта

### Проблема: CSS файл пустой или слишком маленький после сборки

**Решение:**

1. Проверьте, что `src/styles.ts` импортирует правильные CSS файлы
2. Убедитесь, что `globals.css` содержит директивы Tailwind
3. Проверьте логи сборки на наличие ошибок

## Дополнительные ресурсы

- [PostCSS Documentation](https://postcss.org/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Autoprefixer Documentation](https://github.com/postcss/autoprefixer)
- [tsup Documentation](https://tsup.egoist.dev/)

## Обновление конфигурации

При изменении конфигурации PostCSS или Tailwind:

1. Обновите `postcss.config.mjs` или `tailwind.config.ts`
2. Перезапустите dev сервер или пересоберите проект
3. Проверьте, что изменения применились корректно
4. Обновите эту документацию при необходимости

---

**Последнее обновление:** 2025-12-15

