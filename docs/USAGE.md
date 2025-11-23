# 📖 Руководство по использованию Tenerife UI

Полное руководство по использованию библиотеки Tenerife UI в вашем проекте.

---

## Импорт компонентов

Все компоненты экспортируются из основного пакета:

```tsx
import { Button, Input, Card, Modal } from "@tenerife.music/ui";
```

### Именованные импорты

```tsx
// Примитивные компоненты
import { Button, Input, Label, Badge, Link } from "@tenerife.music/ui";

// Layout компоненты
import { Container, Section, Grid, Flex, Stack } from "@tenerife.music/ui";

// Section компоненты (премиум секции)
import { HeroSection, FeatureSection, CTASection, ArticlesSection, TrendingSection } from "@tenerife.music/ui";

// Modal компоненты
import { Modal, SimpleModal, CustomDialog, ConfirmDialog } from "@tenerife.music/ui";

// Card компоненты
import { Card, EventCard, VenueCard } from "@tenerife.music/ui";

// Form компоненты
import { FormInput, FormSelect, FormTextarea } from "@tenerife.music/ui";

// Filter компоненты
import { SearchInput, FilterBar, DateRangePicker } from "@tenerife.music/ui";

// Feedback компоненты
import { Alert, Progress, Skeleton } from "@tenerife.music/ui";

// Navigation компоненты
import { Breadcrumbs, Pagination } from "@tenerife.music/ui";
```

### Пример использования компонентов

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "@tenerife.music/ui";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Заголовок карточки</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Нажми меня</Button>
        <Button variant="outline">Контурная кнопка</Button>
        <Button variant="destructive">Удалить</Button>
      </CardContent>
    </Card>
  );
}
```

---

## Импорт Tailwind Preset

Для использования дизайн-системы Tenerife UI в вашем проекте, подключите Tailwind preset:

```typescript
// tailwind.config.ts
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

Preset включает:

- Цветовую палитру (primary, accent, secondary, semantic colors)
- Типографику (fontFamily, fontSize, fontWeight, lineHeight, letterSpacing)
- Spacing систему (8px grid)
- Shadows (elevation, glow, colored shadows)
- Border radius (0-3xl, full)
- Motion tokens (durations, easings, animations)

---

## Подключение глобальных стилей

Импортируйте глобальные стили в корне вашего приложения:

### Next.js (App Router)

```typescript
// app/layout.tsx
import "@tenerife.music/ui/styles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Next.js (Pages Router)

```typescript
// pages/_app.tsx
import "@tenerife.music/ui/styles";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```

### Vite

```typescript
// src/main.tsx
import "@tenerife.music/ui/styles";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Create React App

```typescript
// src/index.js
import "@tenerife.music/ui/styles";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## Настройка ThemeProvider

ThemeProvider управляет темами (day/night) и темами-переопределениями (default/dark/brand):

### Базовая настройка

```tsx
import { ThemeProvider } from "@tenerife.music/ui";

function App() {
  return (
    <ThemeProvider>
      <YourApp />
    </ThemeProvider>
  );
}
```

### Настройка с параметрами

```tsx
import { ThemeProvider } from "@tenerife.music/ui";

function App() {
  return (
    <ThemeProvider
      defaultMode="night" // "day" | "night"
      defaultTheme="brand" // "default" | "dark" | "brand"
      storageKey="tm_mode"
      themeStorageKey="tm_theme"
      enableSystem={true} // Автоматическое определение системной темы
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

### Использование useTheme

```tsx
import { useTheme, ThemeProvider, Button } from "@tenerife.music/ui";

function ThemeToggle() {
  const { mode, theme, setMode, setTheme, toggleMode } = useTheme();

  return (
    <div>
      <p>Текущий режим: {mode}</p>
      <p>Текущая тема: {theme}</p>
      <Button onClick={toggleMode}>Переключить режим</Button>
      <Button onClick={() => setMode("night")}>Ночной режим</Button>
      <Button onClick={() => setTheme("brand")}>Брендовая тема</Button>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}
```

**Примечание:** `useTheme` должен использоваться внутри компонента, обернутого в `ThemeProvider`.

---

## Импорт токенов

Вы можете импортировать токены для использования в TypeScript/JavaScript коде:

```typescript
// Импорт всех токенов
import * as tokens from "@tenerife.music/ui/tokens";

// Импорт конкретных категорий токенов
import { primaryColors, accentColors, spacing, borderRadius } from "@tenerife.music/ui/tokens";

// Использование в коде
const primary500 = primaryColors[500]; // "215 20% 35%"
const spacing4 = spacing[4]; // "1rem"
const radiusMd = borderRadius.md; // "0.375rem"
```

### Примеры использования токенов

```typescript
import { primaryColors, spacing, borderRadius } from "@tenerife.music/ui/tokens";

// Создание inline стилей
const buttonStyle = {
  backgroundColor: `hsl(${primaryColors[500]})`,
  padding: spacing[4],
  borderRadius: borderRadius.md,
};

// Использование в styled-components
import styled from "styled-components";
import { spacing, borderRadius } from "@tenerife.music/ui/tokens";

const StyledCard = styled.div`
  padding: ${spacing[6]};
  border-radius: ${borderRadius.lg};
`;
```

Подробнее о токенах см. [Руководство по токенам](./TOKENS_GUIDE.md).

---

## Импорт темы

Вы можете импортировать утилиты темы для программного управления:

```typescript
// Импорт функций применения темы
import { applyMode, getInitialMode } from "@tenerife.music/ui/theme";

// Применение режима программно
applyMode("night");

// Получение начального режима
const initialMode = getInitialMode("day", "tm_mode", true);
```

---

## Примеры использования для разных фреймворков

### Next.js (App Router) - Полный пример

```typescript
// app/layout.tsx
import "@tenerife.music/ui/styles";
import { ThemeProvider } from "@tenerife.music/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My App",
  description: "App description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider defaultMode="night" enableSystem={true}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

```typescript
// app/page.tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "@tenerife.music/ui";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Добро пожаловать</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Начать</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Vite (React) - Полный пример

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
```

```typescript
// src/App.tsx
import { ThemeProvider, Button, Card, CardHeader, CardTitle, CardContent } from "@tenerife.music/ui";

function App() {
  return (
    <ThemeProvider defaultMode="night" enableSystem={true}>
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Добро пожаловать</CardTitle>
          </CardHeader>
          <CardContent>
            <Button>Начать</Button>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}

export default App;
```

### Next.js (Pages Router) - Полный пример

```typescript
// pages/_app.tsx
import "@tenerife.music/ui/styles";
import { ThemeProvider } from "@tenerife.music/ui";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider defaultMode="night" enableSystem={true}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
```

```typescript
// pages/index.tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "@tenerife.music/ui";

export default function HomePage() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Добро пожаловать</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Начать</Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## Использование Tailwind классов

После подключения preset, вы можете использовать все токены как Tailwind классы:

```tsx
// Цвета
<div className="bg-primary text-primary-foreground">Primary</div>
<div className="bg-accent text-accent-foreground">Accent</div>

// Spacing
<div className="p-4 m-6 gap-2">Spacing</div>

// Typography
<h1 className="font-display text-5xl font-bold">Heading</h1>
<p className="text-base font-normal">Body text</p>

// Shadows
<div className="shadow-lg shadow-primary-md">Shadow</div>
<div className="shadow-glow-primary">Glow</div>

// Border radius
<div className="rounded-md rounded-lg rounded-xl">Radius</div>

// Motion
<button className="transition-all duration-normal ease-out">Animated</button>
```

---

## Типы TypeScript

Все компоненты полностью типизированы:

```typescript
import type { ButtonProps } from "@tenerife.music/ui";

const buttonProps: ButtonProps = {
  variant: "default",
  size: "md",
  children: "Click me",
};
```

---

## Следующие шаги

- [Руководство по токенам](./TOKENS_GUIDE.md) - Подробное описание всех токенов
- [Руководство по темам](./THEME_GUIDE.md) - Настройка и кастомизация тем
- [Примеры компонентов](./COMPONENT_EXAMPLES.md) - Примеры использования компонентов
- [Быстрый старт](./QUICK_START.md) - Быстрое начало работы

---

**Версия документа:** 1.0  
**Последнее обновление:** 2024-12-19
