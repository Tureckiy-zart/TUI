# ⚡ Быстрый старт Tenerife UI

Начните работу с Tenerife UI за 30 секунд.

---

## Установка (30 секунд)

### 1. Установите библиотеку

```bash
npm install @tenerife.music/ui
npm install -D tailwindcss postcss autoprefixer
```

### 2. Подключите Tailwind preset

Создайте `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";
import preset from "@tenerife.music/ui/preset";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tenerife.music/ui/dist/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [preset],
};

export default config;
```

### 3. Подключите стили

В корневом файле вашего приложения (например, `src/main.tsx` или `app/layout.tsx`):

```typescript
import "@tenerife.music/ui/styles";
```

### 4. Используйте ThemeProvider

```tsx
import { ThemeProvider, Button } from "@tenerife.music/ui";

function App() {
  return (
    <ThemeProvider defaultMode="night">
      <Button>Нажми меня</Button>
    </ThemeProvider>
  );
}
```

**Готово!** 🎉

---

## Первый компонент

Минимальный пример использования Button:

```tsx
import { ThemeProvider, Button } from "@tenerife.music/ui";

export default function App() {
  return (
    <ThemeProvider defaultMode="night">
      <div className="container mx-auto p-4">
        <Button variant="default">Primary Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </ThemeProvider>
  );
}
```

---

## Первое использование темы

Пример переключения режима:

```tsx
import { ThemeProvider, useTheme, Button } from "@tenerife.music/ui";

function ThemeToggle() {
  const { mode, toggleMode } = useTheme();

  return (
    <Button onClick={toggleMode} variant="outline">
      {mode === "night" ? "☀️ День" : "🌙 Ночь"}
    </Button>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultMode="night" enableSystem={true}>
      <div className="container mx-auto p-4">
        <ThemeToggle />
        <h1 className="text-4xl font-bold">Добро пожаловать!</h1>
      </div>
    </ThemeProvider>
  );
}
```

---

## Полный пример приложения

Минимальное работающее приложение:

```tsx
import {
  ThemeProvider,
  useTheme,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@tenerife.music/ui";

function ThemeToggle() {
  const { mode, toggleMode } = useTheme();

  return (
    <Button onClick={toggleMode} variant="outline">
      {mode === "night" ? "☀️ День" : "🌙 Ночь"}
    </Button>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultMode="night" enableSystem={true}>
      <div className="container mx-auto p-8">
        <div className="mb-8">
          <ThemeToggle />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Добро пожаловать в Tenerife UI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Это ваш первый компонент из библиотеки Tenerife UI.
            </p>
            <div className="flex gap-2">
              <Button variant="default">Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}
```

---

## Для разных фреймворков

### Next.js (App Router)

```typescript
// app/layout.tsx
import "@tenerife.music/ui/styles";
import { ThemeProvider } from "@tenerife.music/ui";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultMode="night">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Next.js (Pages Router)

```typescript
// pages/_app.tsx
import "@tenerife.music/ui/styles";
import { ThemeProvider } from "@tenerife.music/ui";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultMode="night">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

### Vite

```typescript
// src/main.tsx
import "@tenerife.music/ui/styles";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// src/App.tsx
import { ThemeProvider, Button } from "@tenerife.music/ui";

function App() {
  return (
    <ThemeProvider defaultMode="night">
      <Button>Hello Tenerife UI</Button>
    </ThemeProvider>
  );
}

export default App;
```

---

## Следующие шаги

Теперь, когда вы освоили основы:

- [Полная инструкция по установке](./INSTALLATION.md) - Подробные инструкции для всех фреймворков
- [Руководство по использованию](./USAGE.md) - Полные примеры использования всех компонентов
- [Руководство по токенам](./TOKENS_GUIDE.md) - Работа с дизайн-токенами
- [Руководство по темам](./THEME_GUIDE.md) - Настройка и кастомизация тем
- [Примеры компонентов](./COMPONENT_EXAMPLES.md) - Примеры использования всех компонентов

---

**Версия документа:** 1.0  
**Последнее обновление:** 2024-12-19
