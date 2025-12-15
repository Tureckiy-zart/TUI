# Token CVA Guide

Руководство по использованию утилиты `tokenCVA` для создания CVA вариантов с токенами.

## Обзор

`tokenCVA` — это типобезопасная обертка над `class-variance-authority` (CVA), которая обеспечивает:

- **Валидацию токенов** в режиме разработки
- **Типобезопасность** при работе с вариантами
- **Единообразный паттерн** создания CVA вариантов
- **Защиту от использования** сырых Tailwind классов

## Зачем нужен tokenCVA?

### Проблема

При использовании обычного `cva` нет гарантии, что разработчики будут использовать токены вместо сырых Tailwind классов:

```typescript
// ❌ ПЛОХО - сырые Tailwind классы
const buttonVariants = cva("p-4 bg-red-500 text-white rounded-md", {
  variants: {
    size: {
      sm: "p-2 text-sm",
      md: "p-4 text-base",
    },
  },
});
```

### Решение

`tokenCVA` автоматически валидирует использование токенов в режиме разработки:

```typescript
// ✅ ХОРОШО - токен-основанные классы
const buttonVariants = tokenCVA({
  base: `${BUTTON_TOKENS.gap} ${BUTTON_TOKENS.radius}`,
  variants: {
    variant: {
      primary: `${BUTTON_TOKENS.variant.primary.background} ${BUTTON_TOKENS.variant.primary.text}`,
      secondary: `${BUTTON_TOKENS.variant.secondary.background} ${BUTTON_TOKENS.variant.secondary.text}`,
    },
  },
});
```

## Использование

### Базовый пример

```typescript
import { tokenCVA } from "@/lib/token-cva";
import { BUTTON_TOKENS } from "@/tokens/components/button";

const buttonVariants = tokenCVA({
  base: `inline-flex items-center justify-center ${BUTTON_TOKENS.gap} ${BUTTON_TOKENS.radius}`,
  variants: {
    variant: {
      primary: `${BUTTON_TOKENS.variant.primary.background} ${BUTTON_TOKENS.variant.primary.text}`,
      secondary: `${BUTTON_TOKENS.variant.secondary.background} ${BUTTON_TOKENS.variant.secondary.text}`,
    },
    size: {
      sm: `${BUTTON_TOKENS.height.sm} ${BUTTON_TOKENS.padding.horizontal.sm}`,
      md: `${BUTTON_TOKENS.height.md} ${BUTTON_TOKENS.padding.horizontal.md}`,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
```

### Использование в компоненте

```typescript
import { tokenCVA, type VariantProps } from "@/lib/token-cva";
import { BUTTON_TOKENS } from "@/tokens/components/button";

const buttonVariants = tokenCVA({
  base: `${BUTTON_TOKENS.gap} ${BUTTON_TOKENS.radius}`,
  variants: {
    variant: {
      primary: `${BUTTON_TOKENS.variant.primary.background}`,
    },
  },
});

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
}

export function Button({ variant, children, ...props }: ButtonProps) {
  return (
    <button className={buttonVariants({ variant })} {...props}>
      {children}
    </button>
  );
}
```

### Compound Variants

```typescript
const buttonVariants = tokenCVA({
  base: "flex",
  variants: {
    variant: {
      primary: "bg-primary",
      secondary: "bg-secondary",
    },
    size: {
      sm: "text-sm",
      md: "text-md",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      size: "sm",
      class: "ring-2 ring-primary", // Используйте токены здесь тоже!
    },
  ],
});
```

## Валидация

### Что проверяется

В режиме разработки `tokenCVA` автоматически проверяет наличие следующих паттернов:

- **Сырые цветовые утилиты**: `bg-red-500`, `text-blue-600`, `border-green-400`
- **Сырые spacing утилиты**: `p-4`, `m-2`, `gap-3`
- **Сырые size утилиты**: `w-4`, `h-6`
- **Сырые shadow утилиты**: `shadow-sm`, `shadow-md`
- **Сырые radius утилиты**: `rounded-sm`, `rounded-md`

### Примеры предупреждений

```typescript
// В режиме разработки вы увидите предупреждение:
tokenCVA({
  base: "p-4 bg-red-500", // ⚠️ Предупреждение о p-4 и bg-red-500
});
```

**Вывод в консоль:**
```
[tokenCVA] Potential hardcoded Tailwind utility detected in base:
  "p-4 bg-red-500"
  Pattern: /\b(p|m|px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr|gap|space-[xy])-\d+/
  Please use token-based utilities instead (e.g., from component tokens).
```

### Production режим

В production режиме валидация отключена для производительности. Все предупреждения показываются только в development.

## Типобезопасность

`tokenCVA` полностью типобезопасен и использует те же типы, что и CVA:

```typescript
import { tokenCVA, type VariantProps } from "@/lib/token-cva";

const variants = tokenCVA({
  variants: {
    size: {
      sm: "text-sm",
      md: "text-md",
    },
  },
});

// TypeScript автоматически выведет типы
type Props = VariantProps<typeof variants>;
// Props = { size?: "sm" | "md" }
```

## Миграция с обычного CVA

Миграция с `cva` на `tokenCVA` очень проста:

### До

```typescript
import { cva } from "class-variance-authority";

const buttonVariants = cva("flex items-center", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground",
    },
  },
});
```

### После

```typescript
import { tokenCVA } from "@/lib/token-cva";

const buttonVariants = tokenCVA({
  base: "flex items-center",
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground",
    },
  },
});
```

**Изменения:**
- Замените `cva` на `tokenCVA`
- Первый аргумент `cva` становится свойством `base` в объекте конфигурации
- Остальное остается без изменений

## Правила использования

### ✅ Правильно

```typescript
// Использование токенов из компонентных токенов
const variants = tokenCVA({
  base: `${BUTTON_TOKENS.gap} ${BUTTON_TOKENS.radius}`,
  variants: {
    variant: {
      primary: `${BUTTON_TOKENS.variant.primary.background}`,
    },
  },
});

// Использование токен-основанных классов (bg-primary, text-foreground, etc.)
const variants = tokenCVA({
  base: "bg-primary text-primary-foreground",
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground",
    },
  },
});
```

### ❌ Неправильно

```typescript
// Сырые Tailwind классы
const variants = tokenCVA({
  base: "p-4 bg-red-500 text-white", // ❌ Предупреждение в dev режиме
  variants: {
    variant: {
      primary: "bg-blue-600 text-sm", // ❌ Предупреждение в dev режиме
    },
  },
});
```

## Best Practices

1. **Всегда используйте токены**: Все визуальные свойства должны браться из токенов
2. **Импортируйте VariantProps из tokenCVA**: Для единообразия используйте `VariantProps` из `tokenCVA`
3. **Проверяйте предупреждения**: В development режиме обращайте внимание на предупреждения
4. **Документируйте токены**: Комментируйте, откуда берутся токены в вашем коде

## API Reference

### `tokenCVA(config)`

Создает CVA вариантную функцию с валидацией токенов.

**Параметры:**
- `config.base` - Базовые классы (опционально)
- `config.variants` - Определения вариантов (опционально)
- `config.compoundVariants` - Составные варианты (опционально)
- `config.defaultVariants` - Значения по умолчанию (опционально)

**Возвращает:** CVA вариантную функцию (совместима с `cva()`)

### `VariantProps<T>`

Тип для извлечения props из CVA вариантов.

**Использование:**
```typescript
type Props = VariantProps<typeof buttonVariants>;
```

## Примеры из реальных компонентов

### Button Component

```typescript
import { tokenCVA, type VariantProps } from "@/lib/token-cva";
import { BUTTON_TOKENS } from "@/tokens/components/button";

const buttonVariants = tokenCVA({
  base: `inline-flex items-center justify-center ${BUTTON_TOKENS.gap} ${BUTTON_TOKENS.radius}`,
  variants: {
    variant: {
      primary: `${BUTTON_TOKENS.variant.primary.background} ${BUTTON_TOKENS.variant.primary.text}`,
      secondary: `${BUTTON_TOKENS.variant.secondary.background} ${BUTTON_TOKENS.variant.secondary.text}`,
    },
    size: {
      sm: `${BUTTON_TOKENS.height.sm} ${BUTTON_TOKENS.padding.horizontal.sm}`,
      md: `${BUTTON_TOKENS.height.md} ${BUTTON_TOKENS.padding.horizontal.md}`,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
```

## FAQ

### Влияет ли tokenCVA на производительность?

Нет. Валидация выполняется только в development режиме. В production `tokenCVA` работает так же быстро, как обычный `cva`.

### Можно ли использовать tokenCVA с существующими компонентами?

Да! `tokenCVA` полностью совместим с `cva`. Вы можете постепенно мигрировать компоненты.

### Что делать, если я вижу ложное предупреждение?

Паттерны валидации могут иногда срабатывать на токен-основанные классы. Если вы уверены, что используете токены правильно, можете игнорировать предупреждение. В будущем паттерны будут улучшены.

### Нужно ли использовать tokenCVA везде?

Рекомендуется использовать `tokenCVA` для всех новых компонентов. Для существующих компонентов миграция опциональна, но рекомендуется.

---

**Последнее обновление:** 2025-12-15

