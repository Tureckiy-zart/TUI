# 🧭 Navigation Components Guide

**Last Updated:** 2025-12-11  
**Version:** 1.0

Полное руководство по использованию Navigation компонентов в Tenerife UI (SegmentedControl, Stepper, Tabs, Breadcrumbs, Pagination).

---

## Введение

Tenerife UI предоставляет набор компонентов для навигации и управления состоянием. Все компоненты token-driven, SSR-safe и полностью доступны.

### Доступные компоненты

- `SegmentedControl` - Сегментированный контрол для переключения опций
- `Stepper` - Компонент для многошаговых процессов
- `Tabs` - Вкладки для организации контента
- `Breadcrumbs` - Хлебные крошки для навигации
- `Pagination` - Пагинация для списков

---

## SegmentedControl

Сегментированный контрол для переключения между опциями.

### Базовое использование

```tsx
import { SegmentedControl, SegmentedControlRoot, SegmentedControlItem } from "@tenerife.music/ui";
import { useState } from "react";

function SegmentedControlExample() {
  const [value, setValue] = useState("option1");

  return (
    <SegmentedControlRoot value={value} onValueChange={setValue}>
      <SegmentedControlItem value="option1">Опция 1</SegmentedControlItem>
      <SegmentedControlItem value="option2">Опция 2</SegmentedControlItem>
      <SegmentedControlItem value="option3">Опция 3</SegmentedControlItem>
    </SegmentedControlRoot>
  );
}
```

### Размеры

```tsx
import { SegmentedControlRoot, SegmentedControlItem } from "@tenerife.music/ui";

function SegmentedControlSizes() {
  return (
    <div className="space-y-4">
      <SegmentedControlRoot size="sm">
        <SegmentedControlItem value="1">Small</SegmentedControlItem>
        <SegmentedControlItem value="2">Small</SegmentedControlItem>
      </SegmentedControlRoot>

      <SegmentedControlRoot size="md">
        <SegmentedControlItem value="1">Medium</SegmentedControlItem>
        <SegmentedControlItem value="2">Medium</SegmentedControlItem>
      </SegmentedControlRoot>

      <SegmentedControlRoot size="lg">
        <SegmentedControlItem value="1">Large</SegmentedControlItem>
        <SegmentedControlItem value="2">Large</SegmentedControlItem>
      </SegmentedControlRoot>
    </div>
  );
}
```

### Вертикальная ориентация

```tsx
import { SegmentedControlRoot, SegmentedControlItem } from "@tenerife.music/ui";

function VerticalSegmentedControl() {
  return (
    <SegmentedControlRoot orientation="vertical">
      <SegmentedControlItem value="1">Опция 1</SegmentedControlItem>
      <SegmentedControlItem value="2">Опция 2</SegmentedControlItem>
      <SegmentedControlItem value="3">Опция 3</SegmentedControlItem>
    </SegmentedControlRoot>
  );
}
```

**Props SegmentedControlRoot:**

- `value`: `string` - Текущее значение (controlled)
- `defaultValue`: `string` - Значение по умолчанию (uncontrolled)
- `onValueChange`: `(value: string) => void` - Обработчик изменения
- `size`: `"sm" | "md" | "lg"` - Размер
- `orientation`: `"horizontal" | "vertical"` - Ориентация

**Props SegmentedControlItem:**

- `value`: `string` - Значение элемента (обязательно)
- `disabled`: `boolean` - Отключенное состояние

---

## Stepper

Компонент для многошаговых процессов (формы, визарды).

### Базовое использование

```tsx
import {
  Stepper,
  StepperRoot,
  StepperItem,
  StepperIndicator,
  StepperLabel,
  StepperContent,
} from "@tenerife.music/ui";

function StepperExample() {
  const steps = [
    { id: "1", label: "Шаг 1", description: "Описание шага 1" },
    { id: "2", label: "Шаг 2", description: "Описание шага 2" },
    { id: "3", label: "Шаг 3", description: "Описание шага 3" },
  ];
  const [activeStep, setActiveStep] = useState(0);

  return (
    <StepperRoot steps={steps} activeStep={activeStep}>
      {steps.map((step, index) => (
        <StepperItem key={step.id} step={step} index={index}>
          <StepperIndicator />
          <StepperLabel>{step.label}</StepperLabel>
          {step.description && <StepperContent>{step.description}</StepperContent>}
        </StepperItem>
      ))}
    </StepperRoot>
  );
}
```

### Горизонтальный Stepper

```tsx
import { StepperRoot, StepperItem, StepperIndicator, StepperLabel } from "@tenerife.music/ui";

function HorizontalStepper() {
  const steps = [
    { id: "1", label: "Информация" },
    { id: "2", label: "Платеж" },
    { id: "3", label: "Подтверждение" },
  ];

  return (
    <StepperRoot steps={steps} activeStep={1} orientation="horizontal">
      {steps.map((step, index) => (
        <StepperItem key={step.id} step={step} index={index}>
          <StepperIndicator />
          <StepperLabel>{step.label}</StepperLabel>
        </StepperItem>
      ))}
    </StepperRoot>
  );
}
```

### Вертикальный Stepper

```tsx
import {
  StepperRoot,
  StepperItem,
  StepperIndicator,
  StepperLabel,
  StepperContent,
} from "@tenerife.music/ui";

function VerticalStepper() {
  const steps = [
    { id: "1", label: "Шаг 1", description: "Описание" },
    { id: "2", label: "Шаг 2", description: "Описание" },
    { id: "3", label: "Шаг 3", description: "Описание" },
  ];

  return (
    <StepperRoot steps={steps} activeStep={1} orientation="vertical">
      {steps.map((step, index) => (
        <StepperItem key={step.id} step={step} index={index}>
          <StepperIndicator />
          <StepperLabel>{step.label}</StepperLabel>
          <StepperContent>{step.description}</StepperContent>
        </StepperItem>
      ))}
    </StepperRoot>
  );
}
```

### С иконками

```tsx
import { StepperRoot, StepperItem, StepperIndicator, StepperLabel } from "@tenerife.music/ui";
import { IconCheck, IconCalendar, IconLocation } from "@tenerife.music/ui";

function StepperWithIcons() {
  const steps = [
    { id: "1", label: "Выбор даты", icon: <IconCalendar /> },
    { id: "2", label: "Выбор места", icon: <IconLocation /> },
    { id: "3", label: "Подтверждение", icon: <IconCheck /> },
  ];

  return (
    <StepperRoot steps={steps} activeStep={1}>
      {steps.map((step, index) => (
        <StepperItem key={step.id} step={step} index={index}>
          <StepperIndicator>{step.icon}</StepperIndicator>
          <StepperLabel>{step.label}</StepperLabel>
        </StepperItem>
      ))}
    </StepperRoot>
  );
}
```

**Props StepperRoot:**

- `steps`: `StepperStep[]` - Массив шагов (обязательно)
- `activeStep`: `number` - Индекс активного шага (0-indexed)
- `orientation`: `"horizontal" | "vertical"` - Ориентация
- `showNumbers`: `boolean` - Показывать номера шагов

**StepperStep:**

- `id`: `string` - Уникальный идентификатор
- `label`: `string` - Текст шага
- `description`: `string` - Описание (опционально)
- `icon`: `React.ReactNode` - Иконка (опционально)
- `disabled`: `boolean` - Отключенное состояние

---

## Tabs

Вкладки для организации контента.

### Базовое использование

```tsx
import { Tabs, TabsRoot, TabsList, TabsTrigger, TabsContent } from "@tenerife.music/ui";

function TabsExample() {
  return (
    <TabsRoot defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Вкладка 1</TabsTrigger>
        <TabsTrigger value="tab2">Вкладка 2</TabsTrigger>
        <TabsTrigger value="tab3">Вкладка 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Содержимое вкладки 1</TabsContent>
      <TabsContent value="tab2">Содержимое вкладки 2</TabsContent>
      <TabsContent value="tab3">Содержимое вкладки 3</TabsContent>
    </TabsRoot>
  );
}
```

Подробнее см. примеры в [Component Examples](./COMPONENT_EXAMPLES.md).

---

## Breadcrumbs

Хлебные крошки для навигации.

### Базовое использование

```tsx
import { Breadcrumbs } from "@tenerife.music/ui";

function BreadcrumbsExample() {
  const items = [
    { label: "Главная", href: "/" },
    { label: "Каталог", href: "/catalog" },
    { label: "Текущая страница" },
  ];

  return <Breadcrumbs items={items} />;
}
```

Подробнее см. примеры в [Component Examples](./COMPONENT_EXAMPLES.md).

---

## Pagination

Пагинация для списков и таблиц.

### Базовое использование

```tsx
import {
  Pagination,
  PaginationRoot,
  PaginationItem,
  PaginationPrev,
  PaginationNext,
} from "@tenerife.music/ui";

function PaginationExample() {
  return (
    <PaginationRoot currentPage={1} totalPages={10} onPageChange={(page) => console.log(page)}>
      <PaginationPrev />
      <PaginationItem page={1} />
      <PaginationItem page={2} />
      <PaginationItem page={3} />
      <PaginationNext />
    </PaginationRoot>
  );
}
```

Подробнее см. примеры в [Component Examples](./COMPONENT_EXAMPLES.md).

---

## Примеры использования

### Форма с Stepper

```tsx
import {
  StepperRoot,
  StepperItem,
  StepperIndicator,
  StepperLabel,
  StepperContent,
  Button,
} from "@tenerife.music/ui";
import { useState } from "react";

function FormWithStepper() {
  const steps = [
    { id: "1", label: "Личная информация" },
    { id: "2", label: "Адрес" },
    { id: "3", label: "Подтверждение" },
  ];
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  return (
    <div>
      <StepperRoot steps={steps} activeStep={activeStep}>
        {steps.map((step, index) => (
          <StepperItem key={step.id} step={step} index={index}>
            <StepperIndicator />
            <StepperLabel>{step.label}</StepperLabel>
          </StepperItem>
        ))}
      </StepperRoot>

      <div className="mt-8">
        {/* Контент шага */}
        <p>Контент шага {activeStep + 1}</p>

        <div className="mt-4 flex gap-2">
          {activeStep > 0 && <Button onClick={prevStep}>Назад</Button>}
          {activeStep < steps.length - 1 ? (
            <Button onClick={nextStep}>Далее</Button>
          ) : (
            <Button>Отправить</Button>
          )}
        </div>
      </div>
    </div>
  );
}
```

### Переключение вида с SegmentedControl

```tsx
import { SegmentedControlRoot, SegmentedControlItem } from "@tenerife.music/ui";
import { useState } from "react";

function ViewToggle() {
  const [view, setView] = useState("grid");

  return (
    <div>
      <SegmentedControlRoot value={view} onValueChange={setView}>
        <SegmentedControlItem value="grid">Сетка</SegmentedControlItem>
        <SegmentedControlItem value="list">Список</SegmentedControlItem>
      </SegmentedControlRoot>

      {view === "grid" ? (
        <div className="grid grid-cols-3 gap-4">Grid view</div>
      ) : (
        <div className="space-y-2">List view</div>
      )}
    </div>
  );
}
```

---

## Accessibility

Все Navigation компоненты соответствуют стандартам доступности:

- ✅ Клавиатурная навигация
- ✅ ARIA атрибуты
- ✅ Focus management
- ✅ Screen reader поддержка

### Клавиатурная навигация

**SegmentedControl:**

- `Arrow Left/Right` - Переключение между опциями
- `Enter/Space` - Активация опции

**Stepper:**

- `Arrow Up/Down` - Навигация по шагам (вертикальный)
- `Arrow Left/Right` - Навигация по шагам (горизонтальный)

---

## Best Practices

### 1. Используйте правильные компоненты для задач

```tsx
// ✅ Правильно - SegmentedControl для переключения опций
<SegmentedControlRoot>
  <SegmentedControlItem value="view1">Вид 1</SegmentedControlItem>
  <SegmentedControlItem value="view2">Вид 2</SegmentedControlItem>
</SegmentedControlRoot>

// ✅ Правильно - Stepper для многошаговых процессов
<StepperRoot steps={steps} activeStep={currentStep}>
```

### 2. Предоставляйте описания для шагов

```tsx
// ✅ Правильно - с описанием
const steps = [{ id: "1", label: "Шаг 1", description: "Описание шага" }];

// ❌ Плохо - без контекста
const steps = [{ id: "1", label: "Шаг 1" }];
```

---

## Следующие шаги

- [Component Examples](./COMPONENT_EXAMPLES.md) - Примеры использования
- [Accessibility Guidelines](./a11y_guidelines.md) - Руководство по доступности

---

**Версия документа:** 1.0  
**Последнее обновление:** 2025-12-11
