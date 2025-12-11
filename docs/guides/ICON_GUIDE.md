# 🎨 Icon Guide

**Last Updated:** 2025-12-11  
**Version:** 1.0

Полное руководство по использованию Icon системы в Tenerife UI.

---

## Введение

Tenerife UI предоставляет унифицированную систему иконок с token-driven размерами, цветами и stroke. Система поддерживает tree-shaking, SSR-safe рендеринг и registry-based подход.

### Основные возможности

- 🎯 **Token-driven**: все размеры и цвета через design tokens
- 📦 **Tree-shakeable**: только используемые иконки попадают в bundle
- 🔍 **Type-safe**: полная типизация через TypeScript
- ♿ **Accessible**: поддержка ARIA атрибутов
- ⚡ **SSR-safe**: безопасная работа с Server-Side Rendering

---

## Icon Component

### Базовое использование

```tsx
import { Icon } from "@tenerife.music/ui";

function IconExample() {
  return <Icon name="search" />;
}
```

### Размеры

```tsx
import { Icon } from "@tenerife.music/ui";

function IconSizes() {
  return (
    <div className="flex items-center gap-4">
      <Icon name="search" size="sm" />
      <Icon name="search" size="md" />
      <Icon name="search" size="lg" />
      <Icon name="search" size="xl" />
    </div>
  );
}
```

### Цвета

```tsx
import { Icon } from "@tenerife.music/ui";

function IconColors() {
  return (
    <div className="flex items-center gap-4">
      <Icon name="check" color="default" />
      <Icon name="check" color="muted" />
      <Icon name="check" color="success" />
      <Icon name="check" color="warning" />
      <Icon name="check" color="danger" />
      <Icon name="check" color="info" />
    </div>
  );
}
```

### Stroke варианты

```tsx
import { Icon } from "@tenerife.music/ui";

function IconStroke() {
  return (
    <div className="flex items-center gap-4">
      <Icon name="arrow-right" stroke="thin" />
      <Icon name="arrow-right" stroke="normal" />
      <Icon name="arrow-right" stroke="bold" />
    </div>
  );
}
```

**Props:**

- `name`: `IconName` - Имя иконки из registry (обязательно)
- `size`: `"sm" | "md" | "lg" | "xl"` - Размер иконки
- `color`: `"default" | "muted" | "success" | "warning" | "danger" | "info"` - Цвет
- `stroke`: `"thin" | "normal" | "bold"` - Толщина линии
- `asChild`: `boolean` - Использовать как Slot (Radix UI)
- `className`: `string` - Дополнительные CSS классы

---

## Доступные иконки

### Icon Registry

Все иконки доступны через registry. Доступные иконки:

- `IconArrowRight` - Стрелка вправо
- `IconCalendar` - Календарь
- `IconCheck` - Галочка
- `IconChevronDown` - Стрелка вниз
- `IconChevronRight` - Стрелка вправо
- `IconClose` - Закрыть
- `IconError` - Ошибка
- `IconInfo` - Информация
- `IconLocation` - Местоположение
- `IconMenu` - Меню
- `IconSearch` - Поиск
- `IconSuccess` - Успех
- `IconWarning` - Предупреждение

### Прямой импорт иконок

Для tree-shaking можно импортировать иконки напрямую:

```tsx
import { IconArrowRight, IconCalendar, IconSearch } from "@tenerife.music/ui";

function DirectIcons() {
  return (
    <div className="flex items-center gap-4">
      <IconArrowRight />
      <IconCalendar />
      <IconSearch />
    </div>
  );
}
```

### Использование через Icon компонент

```tsx
import { Icon } from "@tenerife.music/ui";

function IconComponent() {
  return (
    <div className="flex items-center gap-4">
      <Icon name="arrow-right" />
      <Icon name="calendar" />
      <Icon name="search" />
    </div>
  );
}
```

---

## Примеры использования

### Иконки в кнопках

```tsx
import { Button, Icon } from "@tenerife.music/ui";

function ButtonWithIcons() {
  return (
    <div className="flex gap-2">
      <Button>
        <Icon name="search" size="sm" className="mr-2" />
        Поиск
      </Button>
      <Button variant="outline">
        <Icon name="calendar" size="sm" className="mr-2" />
        Календарь
      </Button>
    </div>
  );
}
```

### Иконки в навигации

```tsx
import { Icon } from "@tenerife.music/ui";

function NavigationIcons() {
  return (
    <nav>
      <a href="/">
        <Icon name="menu" size="md" />
        Меню
      </a>
      <a href="/search">
        <Icon name="search" size="md" />
        Поиск
      </a>
    </nav>
  );
}
```

### Семантические иконки

```tsx
import { Icon, Alert } from "@tenerife.music/ui";

function SemanticIcons() {
  return (
    <div className="space-y-2">
      <Alert variant="success">
        <Icon name="success" size="sm" className="mr-2" />
        Операция выполнена успешно
      </Alert>
      <Alert variant="destructive">
        <Icon name="error" size="sm" className="mr-2" />
        Произошла ошибка
      </Alert>
      <Alert variant="default">
        <Icon name="info" size="sm" className="mr-2" />
        Информация
      </Alert>
    </div>
  );
}
```

### Иконки с текстом

```tsx
import { Icon, Text } from "@tenerife.music/ui";

function IconWithText() {
  return (
    <div className="flex items-center gap-2">
      <Icon name="location" size="sm" color="muted" />
      <Text muted>Москва, Россия</Text>
    </div>
  );
}
```

---

## Tree-shaking и оптимизация

### Использование Icon компонента

```tsx
// ✅ Хорошо - только используемые иконки
import { Icon } from "@tenerife.music/ui";

<Icon name="search" />
<Icon name="calendar" />
```

### Прямой импорт для максимальной оптимизации

```tsx
// ✅ Отлично - только конкретные иконки
import { IconSearch, IconCalendar } from "@tenerife.music/ui";

<IconSearch />
<IconCalendar />
```

### Избегайте импорта всего registry

```tsx
// ❌ Плохо - все иконки попадут в bundle
import { ICONS_MAP } from "@tenerife.music/ui";
```

---

## Кастомизация

### Кастомные размеры через className

```tsx
import { Icon } from "@tenerife.music/ui";

function CustomSize() {
  return (
    <Icon
      name="search"
      className="h-8 w-8" // Кастомный размер
    />
  );
}
```

### Кастомные цвета

```tsx
import { Icon } from "@tenerife.music/ui";

function CustomColor() {
  return (
    <Icon
      name="check"
      className="text-primary" // Кастомный цвет
    />
  );
}
```

---

## Accessibility

### Иконки без текста

Для иконок без текста всегда добавляйте `aria-label`:

```tsx
import { Icon, Button } from "@tenerife.music/ui";

function AccessibleIcon() {
  return (
    <Button aria-label="Поиск">
      <Icon name="search" />
    </Button>
  );
}
```

### Декоративные иконки

Для декоративных иконок используйте `aria-hidden`:

```tsx
import { Icon } from "@tenerife.music/ui";

function DecorativeIcon() {
  return (
    <div>
      <Icon name="arrow-right" aria-hidden="true" />
      <span>Текст с декоративной иконкой</span>
    </div>
  );
}
```

---

## Best Practices

### 1. Используйте правильные размеры

```tsx
// ✅ Правильно - размер соответствует контексту
<Button>
  <Icon name="search" size="sm" />
  Поиск
</Button>

// ❌ Неправильно - слишком большая иконка
<Button>
  <Icon name="search" size="xl" />
  Поиск
</Button>
```

### 2. Выбирайте семантические цвета

```tsx
// ✅ Правильно - семантический цвет
<Icon name="check" color="success" />
<Icon name="error" color="danger" />

// ❌ Неправильно - несоответствие
<Icon name="check" color="danger" />
```

### 3. Используйте asChild для композиции

```tsx
// ✅ Правильно - композиция с Radix UI
<Icon name="arrow-right" asChild>
  <Link href="/next" />
</Icon>
```

---

## Troubleshooting

### Иконка не отображается

1. Проверьте, что имя иконки существует в registry
2. Убедитесь, что иконка импортирована правильно
3. Проверьте консоль на наличие ошибок

### Иконка слишком большая/маленькая

1. Используйте prop `size` вместо className
2. Проверьте, что не переопределяете размеры через className

---

## Следующие шаги

- [Component Examples](./COMPONENT_EXAMPLES.md) - Примеры использования иконок
- [Tokens Guide](./TOKENS_GUIDE.md) - Работа с icon tokens
- [Accessibility Guidelines](./a11y_guidelines.md) - Руководство по доступности

---

**Версия документа:** 1.0  
**Последнее обновление:** 2025-12-11
