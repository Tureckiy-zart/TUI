# 🧪 Tenerife UI Testing Guide

**Last updated:** 2025-11-25  
**Status:** Active  
**Maintainer:** Testing Infrastructure Team

Полное руководство по написанию тестов для компонентов Tenerife UI Library.

---

## Содержание

1. [Введение](#введение)
2. [Структура тестов](#структура-тестов)
3. [Test Utils](#test-utils)
4. [Написание тестов](#написание-тестов)
5. [Snapshot тесты](#snapshot-тесты)
6. [Behavior тесты](#behavior-тесты)
7. [Accessibility тесты](#accessibility-тесты)
8. [Test Matrix](#test-matrix)
9. [Best Practices](#best-practices)

---

## Введение

### Технологический стек

Tenerife UI использует следующий стек для тестирования:

- **Framework**: Vitest
- **Testing Library**: React Testing Library
- **Accessibility**: vitest-axe
- **Matchers**: @testing-library/jest-dom
- **Coverage**: @vitest/coverage-v8

### Зависимости

Все необходимые зависимости уже установлены:

```json
{
  "@testing-library/react": "^16.0.0",
  "@testing-library/user-event": "^14.0.0",
  "@testing-library/jest-dom": "^6.0.0",
  "vitest-axe": "^0.1.0",
  "vitest": "^4.0.15"
}
```

---

## Структура тестов

### Организация файлов

Тесты должны находиться рядом с компонентами:

```
src/
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── button.test.tsx      # Тесты компонента
│       └── button.stories.tsx   # Storybook stories
└── test/
    ├── setup.ts                 # Глобальная настройка
    ├── test-utils.tsx           # Утилиты для тестов
    └── custom-matchers.ts       # Кастомные matchers
```

### Именование файлов

- **Тесты**: `{ComponentName}.test.tsx`
- **A11y тесты**: `{ComponentName}.a11y.test.tsx` (опционально, отдельный файл)
- **Snapshot тесты**: Включены в основной тестовый файл

---

## Test Utils

### Импорт утилит

Всегда используйте утилиты из `@/test/test-utils`:

```typescript
import { renderWithTheme, userEventSetup, axeCheck } from "@/test/test-utils";
```

### renderWithTheme

Автоматически оборачивает компонент в ThemeProvider:

```typescript
import { renderWithTheme } from "@/test/test-utils";
import { Button } from "./button";

it("renders with theme", () => {
  const { container } = renderWithTheme(<Button>Click me</Button>);
  const button = container.querySelector("button");
  expect(button).toBeInTheDocument();
});
```

**Важно**: Всегда используйте `renderWithTheme` вместо обычного `render` для компонентов UI библиотеки.

### userEventSetup

Для симуляции пользовательских взаимодействий:

```typescript
import { renderWithTheme, userEventSetup } from "@/test/test-utils";

it("handles click with userEvent", async () => {
  const user = userEventSetup();
  const handleClick = vi.fn();
  renderWithTheme(<Button onClick={handleClick}>Click</Button>);

  const button = screen.getByRole("button");
  await user.click(button);

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### axeCheck

Для проверки accessibility (подготовлено для будущего использования):

```typescript
import { renderWithTheme, axeCheck } from "@/test/test-utils";

it("has no accessibility violations", async () => {
  const { container } = renderWithTheme(<Button>Click me</Button>);
  const results = await axeCheck(container);
  expect(results).toHaveNoViolations();
});
```

---

## Написание тестов

### Базовая структура

```typescript
import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithTheme } from "@/test/test-utils";
import { Button } from "./button";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<Button>Click me</Button>);
      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("renders primary variant", () => {
      const { container } = renderWithTheme(<Button variant="primary">Primary</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("bg-primary");
    });
  });
});
```

### Группировка тестов

Используйте `describe` блоки для группировки связанных тестов:

```typescript
describe("Button", () => {
  describe("Rendering", () => {
    /* ... */
  });
  describe("Variants", () => {
    /* ... */
  });
  describe("Sizes", () => {
    /* ... */
  });
  describe("Interactions", () => {
    /* ... */
  });
  describe("Accessibility", () => {
    /* ... */
  });
  describe("Snapshot", () => {
    /* ... */
  });
});
```

### Тестирование вариантов

Всегда тестируйте все варианты компонента:

```typescript
describe("Variants", () => {
  const variants = ["primary", "secondary", "accent", "outline", "ghost", "destructive"] as const;

  variants.forEach((variant) => {
    it(`renders ${variant} variant`, () => {
      const { container } = renderWithTheme(<Button variant={variant}>{variant}</Button>);
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
    });
  });
});
```

### Тестирование размеров

```typescript
describe("Sizes", () => {
  const sizes = ["sm", "md", "lg", "icon"] as const;

  sizes.forEach((size) => {
    it(`renders ${size} size`, () => {
      const { container } = renderWithTheme(<Button size={size}>{size}</Button>);
      const button = container.querySelector("button");
      expect(button).toBeInTheDocument();
    });
  });
});
```

---

## Snapshot тесты

### Когда использовать

Snapshot тесты полезны для:

- Стабильных компонентов с фиксированным выводом
- Проверки структуры DOM
- Регрессионного тестирования

### Правила для snapshot тестов

1. **✅ ИСПОЛЬЗУЙТЕ** для базовых вариантов компонентов
2. **✅ ОБНОВЛЯЙТЕ** snapshots при намеренных изменениях UI
3. **✅ ПРОВЕРЯЙТЕ** изменения snapshots в PR
4. **❌ НЕ ИСПОЛЬЗУЙТЕ** для часто меняющихся компонентов
5. **❌ НЕ КОММИТЬТЕ** падающие snapshots

### Пример

```typescript
describe("Snapshot", () => {
  it("matches snapshot for primary variant", () => {
    const { container } = renderWithTheme(<Button variant="primary">Primary Button</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

### Обновление snapshots

```bash
# Обновить все snapshots
pnpm test -- -u

# Обновить конкретный snapshot
pnpm test button.test.tsx -- -u
```

---

## Behavior тесты

### Правила для behavior тестов

1. **✅ ТЕСТИРУЙТЕ** пользовательские взаимодействия, а не реализацию
2. **✅ ИСПОЛЬЗУЙТЕ** semantic queries (getByRole, getByLabelText)
3. **✅ СИМУЛИРУЙТЕ** реальные пользовательские действия
4. **❌ НЕ ТЕСТИРУЙТЕ** внутренние детали реализации
5. **❌ НЕ ИСПОЛЬЗУЙТЕ** getByTestId (предпочитайте роли)

### Тестирование событий

```typescript
describe("Interactions", () => {
  it("handles onClick events", () => {
    const handleClick = vi.fn();
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button");
    button.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("handles onClick with userEvent", async () => {
    const user = userEventSetup();
    const handleClick = vi.fn();
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Тестирование состояний

```typescript
it("is disabled when disabled prop is true", () => {
  renderWithTheme(<Button disabled>Disabled</Button>);
  const button = screen.getByRole("button");
  expect(button).toBeDisabled();
});

it("does not call onClick when disabled", () => {
  const handleClick = vi.fn();
  renderWithTheme(
    <Button disabled onClick={handleClick}>
      Disabled
    </Button>
  );
  const button = screen.getByRole("button");
  button.click();
  expect(handleClick).not.toHaveBeenCalled();
});
```

---

## Accessibility тесты

### Использование vitest-axe

```typescript
import { renderWithTheme, axeCheck } from "@/test/test-utils";
import { axe } from "vitest-axe";

it("has no accessibility violations", async () => {
  const { container } = renderWithTheme(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Тестирование keyboard navigation

```typescript
it("is keyboard accessible", async () => {
  const user = userEventSetup();
  renderWithTheme(<Button>Click me</Button>);

  const button = screen.getByRole("button");
  button.focus();

  expect(button).toHaveFocus();
  await user.keyboard("{Enter}");
  // Проверка поведения
});
```

### Тестирование ARIA атрибутов

```typescript
it("has correct ARIA attributes", () => {
  renderWithTheme(<Alert role="alert">Alert message</Alert>);
  const alert = screen.getByRole("alert");
  expect(alert).toHaveAttribute("role", "alert");
});
```

### Отдельные A11y тесты

Для сложных компонентов создавайте отдельные файлы:

```
src/components/ui/
├── button.tsx
├── button.test.tsx
└── button.a11y.test.tsx  # Отдельный файл для a11y тестов
```

---

## Test Matrix

### Матрица тестирования компонентов

Для каждого компонента необходимо покрыть:

| Категория                     | Обязательно | Опционально |
| ----------------------------- | ----------- | ----------- |
| Рендеринг                     | ✅          |             |
| Все варианты                  | ✅          |             |
| Все размеры                   | ✅          |             |
| Взаимодействия                | ✅          |             |
| Состояния (disabled, loading) | ✅          |             |
| Edge cases                    | ✅          |             |
| Snapshot                      | ✅          |             |
| Accessibility                 | ✅          |             |
| Keyboard navigation           | ✅          |             |
| Visual regression             |             | ✅          |

### Пример матрицы для Button

- [x] Рендеринг без ошибок
- [x] Все variants (primary, secondary, accent, outline, ghost, destructive)
- [x] Все sizes (sm, md, lg, icon)
- [x] asChild работает корректно
- [x] onClick вызывается
- [x] disabled состояние
- [x] leftIcon и rightIcon
- [x] Snapshot тест
- [x] Accessibility тест

### Пример матрицы для Text

- [x] Рендеринг без ошибок
- [x] Все sizes (xs, sm, md, lg, xl)
- [x] Все weights (normal, medium, semibold, bold)
- [x] muted prop работает
- [x] Snapshot тест

### Пример матрицы для Alert

- [x] Рендеринг без ошибок
- [x] Все variants (default, primary, secondary, accent, destructive)
- [x] role="alert" присутствует
- [x] Snapshot тест

---

## Best Practices

### ✅ Что делать

1. **Всегда используйте `renderWithTheme`** для компонентов UI
2. **Используйте semantic queries** (getByRole, getByLabelText)
3. **Группируйте тесты** с помощью describe блоков
4. **Пишите описательные имена тестов**
5. **Тестируйте пользовательские взаимодействия**, а не реализацию
6. **Покрывайте все варианты и размеры** компонентов
7. **Добавляйте snapshot тесты** для стабильных компонентов
8. **Тестируйте accessibility** для всех интерактивных компонентов

### ❌ Чего избегать

1. **Не тестируйте детали реализации**
2. **Не используйте getByTestId** (предпочитайте роли)
3. **Не пропускайте тесты** для компонентов
4. **Не коммитьте падающие тесты**
5. **Не используйте inline styles** в тестах (используйте renderWithTheme)
6. **Не тестируйте сторонние библиотеки**

### Именование тестов

```typescript
// ✅ Хорошо
it("renders primary variant with correct classes", () => { ... });
it("calls onClick handler when clicked", () => { ... });
it("is disabled when disabled prop is true", () => { ... });

// ❌ Плохо
it("works", () => { ... });
it("test 1", () => { ... });
it("button", () => { ... });
```

### Организация тестов

```typescript
describe("ComponentName", () => {
  describe("Rendering", () => {
    // Тесты рендеринга
  });

  describe("Variants", () => {
    // Тесты вариантов
  });

  describe("Sizes", () => {
    // Тесты размеров
  });

  describe("Interactions", () => {
    // Тесты взаимодействий
  });

  describe("Accessibility", () => {
    // Тесты доступности
  });

  describe("Snapshot", () => {
    // Snapshot тесты
  });
});
```

---

## Запуск тестов

### Команды

```bash
# Запустить все тесты
pnpm test

# Запустить тесты в watch режиме
pnpm test:watch

# Запустить тесты с UI
pnpm test:ui

# Запустить тесты с coverage
pnpm test:coverage

# Запустить только a11y тесты
pnpm test:a11y
```

### Coverage требования

Минимальные требования к покрытию (будут увеличены по мере добавления тестов):

- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

---

## Примеры

### Полный пример теста компонента

```typescript
import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { renderWithTheme, userEventSetup } from "@/test/test-utils";
import { Button } from "./button";

describe("Button", () => {
  describe("Rendering", () => {
    it("renders without errors", () => {
      renderWithTheme(<Button>Click me</Button>);
      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("renders primary variant", () => {
      const { container } = renderWithTheme(<Button variant="primary">Primary</Button>);
      const button = container.querySelector("button");
      expect(button).toHaveClass("bg-primary");
    });
  });

  describe("Interactions", () => {
    it("handles onClick events", async () => {
      const user = userEventSetup();
      const handleClick = vi.fn();
      renderWithTheme(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole("button");
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("Snapshot", () => {
    it("matches snapshot for primary variant", () => {
      const { container } = renderWithTheme(<Button variant="primary">Primary Button</Button>);
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
```

---

## Дополнительные ресурсы

- [React Testing Library Documentation](https://testing-library.com/react)
- [Vitest Documentation](https://vitest.dev/)
- [vitest-axe Documentation](https://github.com/nickcolley/vitest-axe)
- [Accessibility Guidelines](./a11y_guidelines.md)

---

**Status:** ✅ Active  
**Last Updated:** 2025-11-25
