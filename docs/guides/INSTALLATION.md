# 📦 Установка Tenerife UI

Полное руководство по установке библиотеки Tenerife UI в ваш проект.

---

## Требования

### Peer Dependencies

Tenerife UI требует следующие peer dependencies:

- **React**: `^18 || ^19`
- **React DOM**: `^18 || ^19`

Эти зависимости должны быть установлены в вашем проекте до установки библиотеки.

---

## Установка

### npm

```bash
npm install @tenerife.music/ui
```

### pnpm

```bash
pnpm add @tenerife.music/ui
```

### yarn

```bash
yarn add @tenerife.music/ui
```

---

## Установка через Workspace (Monorepo)

Если вы используете монорепозиторий (например, npm workspaces, pnpm workspaces, Yarn workspaces), вы можете подключить библиотеку локально:

### npm workspaces

В `package.json` вашего проекта:

```json
{
  "workspaces": ["packages/*", "tenerife-ui"],
  "dependencies": {
    "@tenerife.music/ui": "workspace:*"
  }
}
```

### pnpm workspaces

В `pnpm-workspace.yaml`:

```yaml
packages:
  - "packages/*"
  - "tenerife-ui"
```

В `package.json`:

```json
{
  "dependencies": {
    "@tenerife.music/ui": "workspace:*"
  }
}
```

Затем:

```bash
pnpm install
```

### Yarn workspaces

В `package.json` корня монорепозитория:

```json
{
  "workspaces": ["packages/*", "tenerife-ui"],
  "dependencies": {
    "@tenerife.music/ui": "workspace:*"
  }
}
```

---

## Установка зависимостей для Tailwind CSS

Tenerife UI использует Tailwind CSS для стилизации. Убедитесь, что у вас установлены необходимые зависимости:

### npm

```bash
npm install -D tailwindcss postcss autoprefixer
```

### pnpm

```bash
pnpm add -D tailwindcss postcss autoprefixer
```

### yarn

```bash
yarn add -D tailwindcss postcss autoprefixer
```

---

## Настройка для разных фреймворков

### Next.js (App Router)

1. Установите библиотеку и зависимости (см. выше).

2. Создайте файл `tailwind.config.ts` в корне проекта:

```typescript
import type { Config } from "tailwindcss";
import preset from "@tenerife.music/ui/preset";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tenerife.music/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
};

export default config;
```

3. Создайте файл `postcss.config.mjs`:

```javascript
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

4. В `app/globals.css` или `app/layout.tsx` импортируйте стили:

```css
@import "@tenerife.music/ui/styles";
```

Или в `layout.tsx`:

```typescript
import "@tenerife.music/ui/styles";
```

### Next.js (Pages Router)

1. Установите библиотеку и зависимости (см. выше).

2. Создайте файл `tailwind.config.ts` в корне проекта:

```typescript
import type { Config } from "tailwindcss";
import preset from "@tenerife.music/ui/preset";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tenerife.music/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
};

export default config;
```

3. Создайте файл `postcss.config.js`:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

4. В `pages/_app.tsx` импортируйте стили:

```typescript
import "@tenerife.music/ui/styles";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

### Vite (React)

1. Установите библиотеку и зависимости (см. выше).

2. Создайте файл `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";
import preset from "@tenerife.music/ui/preset";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tenerife.music/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
};

export default config;
```

3. Создайте файл `postcss.config.js`:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

4. В `src/main.tsx` или `src/index.css` импортируйте стили:

```typescript
import "@tenerife.music/ui/styles";
import "./index.css";
```

### Create React App

1. Установите библиотеку и зависимости (см. выше).

2. Создайте файл `tailwind.config.js`:

```javascript
const preset = require("@tenerife.music/ui/preset");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@tenerife.music/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
};
```

3. В `src/index.css` или `src/index.js` импортируйте стили:

```javascript
import "@tenerife.music/ui/styles";
import "./index.css";
```

**Примечание:** Create React App может потребовать дополнительной настройки для работы с Tailwind CSS. Рассмотрите возможность использования CRACO или перехода на Vite.

### Remix

1. Установите библиотеку и зависимости (см. выше).

2. Создайте файл `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";
import preset from "@tenerife.music/ui/preset";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tenerife.music/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
};

export default config;
```

3. Создайте файл `postcss.config.js`:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

4. В `app/root.tsx` импортируйте стили:

```typescript
import "@tenerife.music/ui/styles";
import stylesheet from "~/tailwind.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: stylesheet }];
```

---

## Проверка установки

После установки и настройки, создайте простой тестовый компонент:

```tsx
import { Button, ThemeProvider } from "@tenerife.music/ui";

export default function App() {
  return (
    <ThemeProvider>
      <Button>Click me</Button>
    </ThemeProvider>
  );
}
```

Если компонент отображается без ошибок, установка выполнена успешно.

---

## Что дальше?

- [Быстрый старт](../QUICK_START.md) - Начните работу за 30 секунд
- [Руководство по использованию](../USAGE.md) - Подробные примеры использования
- [Руководство по токенам](../TOKENS_GUIDE.md) - Работа с дизайн-токенами
- [Руководство по темам](../THEME_GUIDE.md) - Настройка и кастомизация тем

---

## Решение проблем

### Ошибки импорта

Если вы получаете ошибки импорта, убедитесь, что:

1. Библиотека установлена: `npm list @tenerife.music/ui`
2. Файлы присутствуют в `node_modules/@tenerife.music/ui/dist/`
3. Правильно настроен `tailwind.config.ts` с `presets: [preset]`

### Стили не применяются

Если стили не применяются:

1. Убедитесь, что импортировали стили: `import "@tenerife.music/ui/styles"`
2. Проверьте, что Tailwind правильно настроен и обрабатывает файлы библиотеки
3. Проверьте конфигурацию `content` в `tailwind.config.ts`

### TypeScript ошибки

Если возникают ошибки TypeScript:

1. Убедитесь, что установлен TypeScript: `npm install -D typescript @types/react @types/react-dom`
2. Проверьте, что в `tsconfig.json` включен `"moduleResolution": "bundler"` или `"node"`

---

**Версия документа:** 1.0  
**Последнее обновление:** 2025-12-11
