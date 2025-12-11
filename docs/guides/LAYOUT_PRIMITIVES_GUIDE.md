# 📐 Layout Primitives Guide

**Last Updated:** 2025-12-11  
**Version:** 1.0

Полное руководство по использованию Layout Primitives в Tenerife UI.

---

## Введение

Layout Primitives — это набор базовых компонентов для создания layout'ов. Все компоненты token-driven, используют только token-based значения и не содержат raw numeric values.

### Доступные компоненты

- `Box` - Базовый контейнер с padding, margin, display, flex, grid
- `Flex` - Flexbox контейнер
- `Grid` - CSS Grid контейнер
- `Stack` - Вертикальный стек
- `Column` - Колонка (для Grid)
- `Row` - Строка (для Grid)
- `Surface` - Поверхность с вариантами стиля

---

## Box Component

Базовый контейнер с поддержкой padding, margin, display, flex, grid, radius и shadow.

### Базовое использование

```tsx
import { Box } from "@tenerife.music/ui";

function BoxExample() {
  return (
    <Box p="md" bg="card" radius="md">
      Содержимое
    </Box>
  );
}
```

### Padding и Margin

```tsx
import { Box } from "@tenerife.music/ui";

function BoxSpacing() {
  return (
    <div>
      <Box p="sm">Padding small</Box>
      <Box p="md">Padding medium</Box>
      <Box p="lg">Padding large</Box>
      <Box px="md" py="sm">
        Padding horizontal/vertical
      </Box>
      <Box m="lg">Margin large</Box>
    </div>
  );
}
```

### Display и Flex

```tsx
import { Box } from "@tenerife.music/ui";

function BoxDisplay() {
  return (
    <div>
      <Box display="flex" gap="md" align="center">
        <Box>Item 1</Box>
        <Box>Item 2</Box>
      </Box>
      <Box display="grid" cols={3} gap="md">
        <Box>Grid Item 1</Box>
        <Box>Grid Item 2</Box>
        <Box>Grid Item 3</Box>
      </Box>
    </div>
  );
}
```

### Responsive значения

```tsx
import { Box } from "@tenerife.music/ui";

function BoxResponsive() {
  return (
    <Box p={{ base: "sm", md: "md", lg: "lg" }} display={{ base: "block", md: "flex" }}>
      Responsive Box
    </Box>
  );
}
```

**Основные Props:**

- `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl` - Padding (token-based)
- `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml` - Margin (token-based)
- `display` - Display mode (flex, grid, block, etc.)
- `gap` - Gap для flex/grid
- `bg` - Background color
- `radius` - Border radius
- `shadow` - Shadow
- `as` - HTML элемент для рендеринга

---

## Flex Component

Flexbox контейнер с token-based spacing.

### Базовое использование

```tsx
import { Flex } from "@tenerife.music/ui";

function FlexExample() {
  return (
    <Flex direction="row" align="center" justify="space-between" gap={4}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Flex>
  );
}
```

### Направления

```tsx
import { Flex } from "@tenerife.music/ui";

function FlexDirections() {
  return (
    <div className="space-y-4">
      <Flex direction="row" gap={4}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Flex>
      <Flex direction="column" gap={4}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Flex>
    </div>
  );
}
```

### Выравнивание

```tsx
import { Flex } from "@tenerife.music/ui";

function FlexAlignment() {
  return (
    <div className="space-y-4">
      <Flex align="start" gap={4}>
        <div>Start</div>
      </Flex>
      <Flex align="center" gap={4}>
        <div>Center</div>
      </Flex>
      <Flex align="end" gap={4}>
        <div>End</div>
      </Flex>
      <Flex justify="space-between" gap={4}>
        <div>Between</div>
        <div>Between</div>
      </Flex>
    </div>
  );
}
```

**Props:**

- `direction`: `"row" | "column"` - Направление
- `align`: `"start" | "center" | "end" | "stretch"` - Выравнивание
- `justify`: `"start" | "center" | "end" | "between" | "around"` - Распределение
- `gap`: `number` - Отступ между элементами (token-based)

---

## Grid Component

CSS Grid контейнер с responsive колонками.

### Базовое использование

```tsx
import { Grid } from "@tenerife.music/ui";

function GridExample() {
  return (
    <Grid cols={3} gap={4}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Grid>
  );
}
```

### Responsive Grid

```tsx
import { Grid } from "@tenerife.music/ui";

function ResponsiveGrid() {
  return (
    <Grid cols={1} md={2} lg={3} gap={4}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
      <div>Item 4</div>
    </Grid>
  );
}
```

Подробнее см. [Grid Guide](./GRID.md).

---

## Stack Component

Вертикальный стек для последовательного размещения элементов.

### Базовое использование

```tsx
import { Stack } from "@tenerife.music/ui";

function StackExample() {
  return (
    <Stack direction="vertical" gap={4}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Stack>
  );
}
```

### Горизонтальный Stack

```tsx
import { Stack } from "@tenerife.music/ui";

function HorizontalStack() {
  return (
    <Stack direction="horizontal" gap={4}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Stack>
  );
}
```

**Props:**

- `direction`: `"vertical" | "horizontal"` - Направление
- `gap`: `number` - Отступ между элементами (token-based)

---

## Column и Row

Компоненты для работы с Grid layout.

### Column

```tsx
import { Grid, Column } from "@tenerife.music/ui";

function ColumnExample() {
  return (
    <Grid cols={12} gap={4}>
      <Column span={8}>Main content</Column>
      <Column span={4}>Sidebar</Column>
    </Grid>
  );
}
```

### Row

```tsx
import { Grid, Row } from "@tenerife.music/ui";

function RowExample() {
  return (
    <Grid cols={12} gap={4}>
      <Row>
        <Column span={6}>Left</Column>
        <Column span={6}>Right</Column>
      </Row>
    </Grid>
  );
}
```

---

## Surface Component

Поверхность с вариантами стиля (card, elevated, etc.).

### Базовое использование

```tsx
import { Surface } from "@tenerife.music/ui";

function SurfaceExample() {
  return (
    <Surface variant="card" p="md" radius="md">
      Card surface
    </Surface>
  );
}
```

### Варианты

```tsx
import { Surface } from "@tenerife.music/ui";

function SurfaceVariants() {
  return (
    <div className="space-y-4">
      <Surface variant="default">Default</Surface>
      <Surface variant="card">Card</Surface>
      <Surface variant="elevated">Elevated</Surface>
    </div>
  );
}
```

**Props:**

- `variant`: `"default" | "card" | "elevated"` - Вариант стиля
- Все props от Box компонента

---

## Примеры использования

### Карточка с контентом

```tsx
import { Surface, Stack, Text, Button } from "@tenerife.music/ui";

function CardExample() {
  return (
    <Surface variant="card" p="lg" radius="lg" shadow="md">
      <Stack direction="vertical" gap={4}>
        <Text size="lg" weight="bold">
          Заголовок
        </Text>
        <Text>Описание карточки</Text>
        <Button>Действие</Button>
      </Stack>
    </Surface>
  );
}
```

### Layout страницы

```tsx
import { Box, Flex, Grid, Stack } from "@tenerife.music/ui";

function PageLayout() {
  return (
    <Box p={{ base: "sm", md: "md", lg: "lg" }}>
      <Stack direction="vertical" gap={6}>
        <Box>
          <h1>Заголовок страницы</h1>
        </Box>

        <Grid cols={1} md={2} lg={3} gap={4}>
          <Box>Card 1</Box>
          <Box>Card 2</Box>
          <Box>Card 3</Box>
        </Grid>

        <Flex justify="space-between" align="center">
          <Box>Left content</Box>
          <Box>Right content</Box>
        </Flex>
      </Stack>
    </Box>
  );
}
```

---

## Best Practices

### 1. Используйте token-based значения

```tsx
// ✅ Правильно
<Box p="md" gap={4}>

// ❌ Неправильно
<Box p={16} gap={32}>
```

### 2. Комбинируйте компоненты

```tsx
// ✅ Правильно - композиция
<Stack direction="vertical" gap={4}>
  <Box p="md">Item 1</Box>
  <Box p="md">Item 2</Box>
</Stack>
```

### 3. Используйте responsive props

```tsx
// ✅ Правильно - responsive
<Box p={{ base: "sm", md: "md", lg: "lg" }}>

// ❌ Неправильно - фиксированные значения
<Box p="md" className="md:p-lg lg:p-xl">
```

---

## Следующие шаги

- [Grid Guide](./GRID.md) - Подробное руководство по Grid
- [Tokens Guide](./TOKENS_GUIDE.md) - Работа с spacing tokens
- [Animation Guidelines](./ANIMATION_GUIDELINES.md) - Анимации с layout primitives

---

**Версия документа:** 1.0  
**Последнее обновление:** 2025-12-11
