# 🎨 Руководство по темам Tenerife UI

Полное руководство по работе с темами, режимами и кастомизацией Tenerife UI.

---

## Введение

Tenerife UI использует двухуровневую систему тем:

1. **Режимы (Mode)**: `day` (светлый) и `night` (темный)
2. **Темы (Theme)**: `default`, `dark`, `brand` - переопределения цветов внутри режимов

---

## ThemeProvider

`ThemeProvider` - это контекстный провайдер, который управляет режимами и темами в вашем приложении.

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

### Props ThemeProvider

```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: "day" | "night"; // Режим по умолчанию
  defaultTheme?: "default" | "dark" | "brand"; // Тема по умолчанию
  storageKey?: string; // Ключ для localStorage режима (default: "tm_mode")
  themeStorageKey?: string; // Ключ для localStorage темы (default: "tm_theme")
  attribute?: string; // HTML атрибут для режима (default: "data-mode")
  enableSystem?: boolean; // Использовать системную тему (default: true)
}
```

### Полный пример

```tsx
import { ThemeProvider } from "@tenerife.music/ui";

function App() {
  return (
    <ThemeProvider
      defaultMode="night"
      defaultTheme="brand"
      storageKey="tm_mode"
      themeStorageKey="tm_theme"
      enableSystem={true}
    >
      <YourApp />
    </ThemeProvider>
  );
}
```

---

## useTheme Hook

`useTheme` - хук для доступа к текущему режиму, теме и функциям управления.

### Базовая структура

```typescript
interface ThemeContextValue {
  mode: "day" | "night";
  theme: "default" | "dark" | "brand";
  setMode: (mode: "day" | "night") => void;
  setTheme: (theme: "default" | "dark" | "brand") => void;
  toggleMode: () => void;
}
```

### Пример использования

```tsx
import { useTheme, ThemeProvider } from "@tenerife.music/ui";

function ThemeControls() {
  const { mode, theme, setMode, setTheme, toggleMode } = useTheme();

  return (
    <div>
      <p>Текущий режим: {mode}</p>
      <p>Текущая тема: {theme}</p>

      <button onClick={toggleMode}>Переключить режим (сейчас: {mode})</button>

      <button onClick={() => setMode("night")}>Ночной режим</button>

      <button onClick={() => setMode("day")}>Дневной режим</button>

      <button onClick={() => setTheme("brand")}>Брендовая тема</button>

      <button onClick={() => setTheme("default")}>Тема по умолчанию</button>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemeControls />
    </ThemeProvider>
  );
}
```

**Примечание:** `useTheme` должен использоваться только внутри компонента, обернутого в `ThemeProvider`.

---

## Режимы (Mode)

### Day Mode (Дневной режим)

Светлый режим - используется по умолчанию:

```tsx
import { ThemeProvider } from "@tenerife.music/ui";

<ThemeProvider defaultMode="day">
  <YourApp />
</ThemeProvider>;
```

**Характеристики:**

- Светлый фон
- Темный текст
- Более яркие цвета
- Подходит для дневного использования

### Night Mode (Ночной режим)

Темный режим - рекомендуется для ночного использования:

```tsx
import { ThemeProvider } from "@tenerife.music/ui";

<ThemeProvider defaultMode="night">
  <YourApp />
</ThemeProvider>;
```

**Характеристики:**

- Темный фон
- Светлый текст
- Приглушенные цвета
- Меньше напряжения для глаз

### Переключение режимов

#### Программное переключение

```tsx
import { useTheme } from "@tenerife.music/ui";

function ModeToggle() {
  const { mode, setMode, toggleMode } = useTheme();

  return (
    <div>
      <button onClick={toggleMode}>{mode === "night" ? "☀️ День" : "🌙 Ночь"}</button>

      <button onClick={() => setMode("day")}>День</button>

      <button onClick={() => setMode("night")}>Ночь</button>
    </div>
  );
}
```

#### Автоматическое определение системной темы

Если `enableSystem={true}`, ThemeProvider автоматически определяет предпочтение системы:

```tsx
<ThemeProvider enableSystem={true}>
  {/* Автоматически использует системную тему */}
  <YourApp />
</ThemeProvider>
```

---

## Темы (Theme)

Темы - это переопределения цветов внутри режимов. Доступны три темы:

### Default Theme

Стандартная тема Tenerife UI:

```tsx
<ThemeProvider defaultTheme="default">
  <YourApp />
</ThemeProvider>
```

**Характеристики:**

- Стандартная цветовая палитра
- Primary: Midnight Blue
- Accent: Purple
- Secondary: Refined Cyan

### Dark Theme

Альтернативная темная тема:

```tsx
<ThemeProvider defaultTheme="dark">
  <YourApp />
</ThemeProvider>
```

**Характеристики:**

- Более глубокие темные цвета
- Усиленный контраст
- Альтернативная цветовая палитра

### Brand Theme

Брендовая тема с акцентом на цветах бренда:

```tsx
<ThemeProvider defaultTheme="brand">
  <YourApp />
</ThemeProvider>
```

**Характеристики:**

- Усиленные брендовые цвета
- Больше акцентов на primary и accent
- Оптимизирована для брендинга

### Переключение тем

```tsx
import { useTheme } from "@tenerife.music/ui";

function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <label>Тема:</label>
      <select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
        <option value="default">Default</option>
        <option value="dark">Dark</option>
        <option value="brand">Brand</option>
      </select>
    </div>
  );
}
```

---

## Сохранение настроек

ThemeProvider автоматически сохраняет настройки в localStorage:

- **Режим** сохраняется в ключ `tm_mode` (или `storageKey`)
- **Тема** сохраняется в ключ `tm_theme` (или `themeStorageKey`)

### Настройка ключей хранения

```tsx
<ThemeProvider storageKey="my_app_mode" themeStorageKey="my_app_theme">
  <YourApp />
</ThemeProvider>
```

---

## Кастомизация темы (Theme Override)

Вы можете создать собственную тему, переопределяя токены:

### Создание кастомной темы

```typescript
import type { ThemeOverride } from "@tenerife.music/ui/tokens";

const customTheme: ThemeOverride = {
  name: "custom",
  description: "Custom theme with brand colors",

  // Переопределение primary цветов
  primaryColors: {
    500: "210 70% 50%", // Кастомный primary
    600: "210 70% 45%",
  },

  // Переопределение accent цветов
  accentColors: {
    500: "280 80% 60%", // Кастомный accent
  },

  // Переопределение базовых цветов для day режима
  baseColorsDay: {
    background: "0 0% 100%",
    foreground: "210 10% 10%",
  },

  // Переопределение базовых цветов для night режима
  baseColorsNight: {
    background: "240 10% 5%",
    foreground: "0 0% 95%",
  },

  // Переопределение semantic цветов
  semanticColorsDay: {
    success: "142 76% 40%",
    error: "0 84% 60%",
  },
};
```

### Применение кастомной темы

```typescript
import { getTheme, applyTheme } from "@tenerife.music/ui/theme";

// Регистрация кастомной темы
await registerTheme("custom", customTheme);

// Применение темы
await applyTheme("custom");
```

---

## Программное применение режимов и тем

### Применение режима

```typescript
import { applyMode } from "@tenerife.music/ui/theme";

// Применить ночной режим
applyMode("night");

// Применить дневной режим
applyMode("day");
```

### Получение начального режима

```typescript
import { getInitialMode } from "@tenerife.music/ui/theme";

// Получить начальный режим с fallback
const mode = getInitialMode("day", "tm_mode", true);
// Проверяет: DOM атрибут → localStorage → системная тема → default
```

---

## Комбинирование режимов и тем

Вы можете комбинировать любой режим с любой темой:

```tsx
// Ночной режим + брендовая тема
<ThemeProvider defaultMode="night" defaultTheme="brand">
  <YourApp />
</ThemeProvider>

// Дневной режим + темная тема
<ThemeProvider defaultMode="day" defaultTheme="dark">
  <YourApp />
</ThemeProvider>
```

---

## HTML атрибуты

ThemeProvider автоматически устанавливает HTML атрибут на `document.documentElement`:

```html
<html data-mode="night" data-theme-name="brand">
  <!-- Ваше приложение -->
</html>
```

Это позволяет использовать CSS селекторы:

```css
[data-mode="night"] {
  /* Стили для ночного режима */
}

[data-theme-name="brand"] {
  /* Стили для брендовой темы */
}
```

---

## Примеры использования

### Полный пример приложения с переключателем темы

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

function ThemeToggleButton() {
  const { mode, toggleMode } = useTheme();

  return (
    <Button onClick={toggleMode} variant="outline">
      {mode === "night" ? "☀️ Переключить на день" : "🌙 Переключить на ночь"}
    </Button>
  );
}

function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <label>Тема: </label>
      <select value={theme} onChange={(e) => setTheme(e.target.value as any)}>
        <option value="default">Default</option>
        <option value="dark">Dark</option>
        <option value="brand">Brand</option>
      </select>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultMode="night" defaultTheme="brand" enableSystem={true}>
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Настройки темы</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ThemeToggleButton />
            <ThemeSelector />
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
}
```

### Определение текущего режима в CSS

```css
/* Применяется только в ночном режиме */
[data-mode="night"] .custom-element {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

/* Применяется только в дневном режиме */
[data-mode="day"] .custom-element {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

/* Применяется для конкретной темы */
[data-theme-name="brand"] .custom-element {
  border-color: hsl(var(--primary-500));
}
```

---

## Лучшие практики

### 1. Всегда оборачивайте приложение в ThemeProvider

```tsx
// ✅ Правильно
<ThemeProvider>
  <App />
</ThemeProvider>

// ❌ Неправильно
<App />
```

### 2. Используйте useTheme только внутри ThemeProvider

```tsx
// ✅ Правильно
function Component() {
  const { mode } = useTheme(); // Внутри компонента
  return <div>Mode: {mode}</div>;
}

<ThemeProvider>
  <Component />
</ThemeProvider>;

// ❌ Неправильно
function Component() {
  const { mode } = useTheme(); // Без ThemeProvider - ошибка
  return <div>Mode: {mode}</div>;
}
```

### 3. Используйте enableSystem для лучшего UX

```tsx
// ✅ Правильно - учитывает системные настройки
<ThemeProvider enableSystem={true}>
  <App />
</ThemeProvider>
```

### 4. Сохраняйте пользовательские предпочтения

ThemeProvider автоматически сохраняет настройки в localStorage. Не нужно делать это вручную.

---

## Решение проблем

### Тема не применяется

1. Убедитесь, что `ThemeProvider` обернул ваше приложение
2. Проверьте, что импортированы стили: `import "@tenerife.music/ui/styles"`
3. Проверьте консоль браузера на наличие ошибок

### Режим не сохраняется

1. Проверьте, что localStorage доступен (не в приватном режиме)
2. Проверьте ключи хранения: `storageKey` и `themeStorageKey`

### useTheme возвращает ошибку

1. Убедитесь, что компонент находится внутри `ThemeProvider`
2. Проверьте импорты: `import { useTheme } from "@tenerife.music/ui"`

---

## Следующие шаги

- [Руководство по использованию](./USAGE.md) - Общие примеры использования
- [Руководство по токенам](./TOKENS_GUIDE.md) - Работа с токенами
- [Примеры компонентов](./COMPONENT_EXAMPLES.md) - Примеры использования компонентов

---

**Версия документа:** 1.0  
**Последнее обновление:** 2024-12-19
