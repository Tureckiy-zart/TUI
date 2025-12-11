# 📋 Menu System Guide

**Last Updated:** 2025-12-11  
**Version:** 1.0

Полное руководство по использованию Menu системы в Tenerife UI (DropdownMenu, ContextMenu, HoverCard, Popover).

---

## Введение

Tenerife UI предоставляет набор компонентов для создания меню и всплывающих элементов на основе Radix UI primitives. Все компоненты token-driven, SSR-safe и полностью доступны.

### Доступные компоненты

- **DropdownMenu** - Выпадающее меню
- **ContextMenu** - Контекстное меню (правый клик)
- **HoverCard** - Карточка при наведении
- **Popover** - Всплывающее окно

---

## DropdownMenu

Выпадающее меню для действий и навигации.

### Базовое использование

```tsx
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  Button,
} from "@tenerife.music/ui";

function DropdownMenuExample() {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger asChild>
        <Button>Открыть меню</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Профиль</DropdownMenuItem>
        <DropdownMenuItem>Настройки</DropdownMenuItem>
        <DropdownMenuItem>Выйти</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
```

### С группами и разделителями

```tsx
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Button,
} from "@tenerife.music/ui";

function DropdownMenuWithGroups() {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger asChild>
        <Button>Меню</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Аккаунт</DropdownMenuLabel>
          <DropdownMenuItem>Профиль</DropdownMenuItem>
          <DropdownMenuItem>Настройки</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Выйти</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
```

### С чекбоксами и радио

```tsx
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  Button,
} from "@tenerife.music/ui";

function DropdownMenuWithControls() {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger asChild>
        <Button>Настройки</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuCheckItem checked>Показывать уведомления</DropdownMenuCheckItem>
        <DropdownMenuCheckItem>Включить звук</DropdownMenuCheckItem>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="light">
          <DropdownMenuRadioItem value="light">Светлая тема</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Темная тема</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
```

### С подменю

```tsx
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItem,
  Button,
} from "@tenerife.music/ui";

function DropdownMenuWithSubmenu() {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger asChild>
        <Button>Меню</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Новый файл</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Экспорт</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>PDF</DropdownMenuItem>
            <DropdownMenuItem>DOCX</DropdownMenuItem>
            <DropdownMenuItem>CSV</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
```

---

## ContextMenu

Контекстное меню, появляющееся при правом клике.

### Базовое использование

```tsx
import {
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
} from "@tenerife.music/ui";

function ContextMenuExample() {
  return (
    <ContextMenuRoot>
      <ContextMenuTrigger className="rounded-lg border p-8">Правый клик здесь</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Копировать</ContextMenuItem>
        <ContextMenuItem>Вставить</ContextMenuItem>
        <ContextMenuItem>Удалить</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuRoot>
  );
}
```

### С группами

```tsx
import {
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuLabel,
  ContextMenuItem,
  ContextMenuSeparator,
} from "@tenerife.music/ui";

function ContextMenuWithGroups() {
  return (
    <ContextMenuRoot>
      <ContextMenuTrigger className="rounded-lg border p-8">Правый клик</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuLabel>Действия</ContextMenuLabel>
          <ContextMenuItem>Копировать</ContextMenuItem>
          <ContextMenuItem>Вставить</ContextMenuItem>
        </ContextMenuGroup>
        <ContextMenuSeparator />
        <ContextMenuItem>Удалить</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuRoot>
  );
}
```

---

## HoverCard

Карточка, появляющаяся при наведении.

### Базовое использование

```tsx
import { HoverCardRoot, HoverCardTrigger, HoverCardContent } from "@tenerife.music/ui";

function HoverCardExample() {
  return (
    <HoverCardRoot>
      <HoverCardTrigger asChild>
        <button>Наведите на меня</button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>Это содержимое карточки, которое появляется при наведении.</p>
      </HoverCardContent>
    </HoverCardRoot>
  );
}
```

### С задержкой

```tsx
import { HoverCardRoot, HoverCardTrigger, HoverCardContent } from "@tenerife.music/ui";

function HoverCardWithDelay() {
  return (
    <HoverCardRoot openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button>Наведите</button>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>Карточка с задержкой появления.</p>
      </HoverCardContent>
    </HoverCardRoot>
  );
}
```

---

## Popover

Всплывающее окно для дополнительной информации.

### Базовое использование

```tsx
import { PopoverRoot, PopoverTrigger, PopoverContent, Button } from "@tenerife.music/ui";

function PopoverExample() {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button>Открыть Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p>Содержимое всплывающего окна.</p>
      </PopoverContent>
    </PopoverRoot>
  );
}
```

### С стрелкой

```tsx
import {
  PopoverRoot,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  Button,
} from "@tenerife.music/ui";

function PopoverWithArrow() {
  return (
    <PopoverRoot>
      <PopoverTrigger asChild>
        <Button>Popover со стрелкой</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <p>Содержимое со стрелкой, указывающей на триггер.</p>
      </PopoverContent>
    </PopoverRoot>
  );
}
```

---

## Компоненты и Props

### DropdownMenu Components

- `DropdownMenuRoot` - Корневой компонент
- `DropdownMenuTrigger` - Триггер для открытия
- `DropdownMenuContent` - Содержимое меню
- `DropdownMenuItem` - Элемент меню
- `DropdownMenuLabel` - Заголовок группы
- `DropdownMenuSeparator` - Разделитель
- `DropdownMenuGroup` - Группа элементов
- `DropdownMenuCheckItem` - Элемент с чекбоксом
- `DropdownMenuRadioGroup` - Группа радио кнопок
- `DropdownMenuRadioItem` - Радио элемент
- `DropdownMenuSub` - Подменю
- `DropdownMenuSubTrigger` - Триггер подменю
- `DropdownMenuSubContent` - Содержимое подменю

### ContextMenu Components

- `ContextMenuRoot` - Корневой компонент
- `ContextMenuTrigger` - Триггер (область правого клика)
- `ContextMenuContent` - Содержимое меню
- `ContextMenuItem` - Элемент меню
- `ContextMenuLabel` - Заголовок группы
- `ContextMenuSeparator` - Разделитель
- `ContextMenuGroup` - Группа элементов

### HoverCard Components

- `HoverCardRoot` - Корневой компонент
- `HoverCardTrigger` - Триггер (элемент для наведения)
- `HoverCardContent` - Содержимое карточки

### Popover Components

- `PopoverRoot` - Корневой компонент
- `PopoverTrigger` - Триггер для открытия
- `PopoverContent` - Содержимое
- `PopoverArrow` - Стрелка, указывающая на триггер

---

## Примеры использования

### Меню пользователя

```tsx
import {
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Avatar,
} from "@tenerife.music/ui";

function UserMenu() {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <span>JD</span>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
          <DropdownMenuItem>Профиль</DropdownMenuItem>
          <DropdownMenuItem>Настройки</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Выйти</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
}
```

### Контекстное меню для таблицы

```tsx
import {
  ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  TableRow,
  TableCell,
} from "@tenerife.music/ui";

function TableRowWithContextMenu() {
  return (
    <ContextMenuRoot>
      <ContextMenuTrigger asChild>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
        </TableRow>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Редактировать</ContextMenuItem>
        <ContextMenuItem>Копировать</ContextMenuItem>
        <ContextMenuItem>Удалить</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenuRoot>
  );
}
```

---

## Accessibility

Все компоненты Menu системы соответствуют стандартам доступности:

- ✅ Клавиатурная навигация (Arrow keys, Enter, Escape)
- ✅ ARIA атрибуты
- ✅ Focus management
- ✅ Screen reader поддержка

### Клавиатурная навигация

- `Arrow Up/Down` - Навигация по элементам
- `Enter/Space` - Активация элемента
- `Escape` - Закрытие меню
- `Arrow Right` - Открытие подменю
- `Arrow Left` - Закрытие подменю

---

## Best Practices

### 1. Используйте asChild для триггеров

```tsx
// ✅ Правильно
<DropdownMenuTrigger asChild>
  <Button>Меню</Button>
</DropdownMenuTrigger>

// ❌ Неправильно
<DropdownMenuTrigger>
  <Button>Меню</Button>
</DropdownMenuTrigger>
```

### 2. Группируйте связанные элементы

```tsx
// ✅ Правильно
<DropdownMenuGroup>
  <DropdownMenuLabel>Аккаунт</DropdownMenuLabel>
  <DropdownMenuItem>Профиль</DropdownMenuItem>
  <DropdownMenuItem>Настройки</DropdownMenuItem>
</DropdownMenuGroup>
```

### 3. Используйте разделители для визуального разделения

```tsx
// ✅ Правильно
<DropdownMenuItem>Сохранить</DropdownMenuItem>
<DropdownMenuSeparator />
<DropdownMenuItem>Удалить</DropdownMenuItem>
```

---

## Следующие шаги

- [Component Examples](./COMPONENT_EXAMPLES.md) - Примеры использования
- [Accessibility Guidelines](./a11y_guidelines.md) - Руководство по доступности

---

**Версия документа:** 1.0  
**Последнее обновление:** 2025-12-11
