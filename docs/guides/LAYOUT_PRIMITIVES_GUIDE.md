# 📐 Layout Primitives Guide

**Last Updated:** 2025-12-15  
**Version:** 2.0

Полное руководство по использованию Layout Primitives в Tenerife UI.

---

## Введение

Layout Primitives — это набор базовых компонентов для создания layout'ов. Все компоненты token-driven, используют только token-based значения и не содержат raw numeric values.

### Иерархия компонентов

```
Box (базовый примитив)
  ├── Stack (основной композиционный примитив)
  │   ├── Column (семантический алиас для вертикального Stack)
  │   └── Row (семантический алиас для горизонтального Stack)
  ├── Container (специализация для ограничения ширины)
  ├── Flex (расширенный flexbox)
  ├── Grid (CSS Grid)
  └── Surface (варианты поверхности)
```

### Доступные компоненты

- `Box` - Базовый контейнер (spacing, visual properties)
- `Stack` - Основной композиционный примитив (вертикальный/горизонтальный)
- `Column` - Семантический алиас для вертикального Stack
- `Row` - Семантический алиас для горизонтального Stack
- `Container` - Ограничение ширины и горизонтальный padding
- `Flex` - Расширенный flexbox контейнер
- `Grid` - CSS Grid контейнер
- `Surface` - Поверхность с вариантами стиля

---

## Box Component

Box — это базовый примитив, чистый контейнер для spacing (padding/margin) и визуальных свойств (radius, shadow, background). Box НЕ предоставляет layout-семантики (display, flexDirection, gap, alignment). Для композиции layout используйте Stack, Flex или Grid.

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

### Визуальные свойства

```tsx
import { Box } from "@tenerife.music/ui";

function BoxVisual() {
  return (
    <div>
      <Box bg="card" radius="lg" shadow="md" p="md">
        Card с фоном, скруглением и тенью
      </Box>
      <Box bg="muted" radius="sm" p="sm">
        Muted background
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
    <Box p={{ base: "sm", md: "md", lg: "lg" }}>
      Responsive Box
    </Box>
  );
}
```

**Основные Props:**

- `p`, `px`, `py`, `pt`, `pr`, `pb`, `pl` - Padding (token-based)
- `m`, `mx`, `my`, `mt`, `mr`, `mb`, `ml` - Margin (token-based)
- `bg` - Background color (token-based)
- `radius` - Border radius (token-based)
- `shadow` - Shadow (token-based)
- `as` - HTML элемент для рендеринга

**Важно:** Box НЕ поддерживает `display`, `flexDirection`, `gap`, `align`, `justify`. Используйте Stack, Flex или Grid для layout композиции.

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

Stack — основной композиционный примитив для вертикальных и горизонтальных потоков. Использует Box внутри как базовый контейнер.

### Базовое использование (вертикальный)

```tsx
import { Stack } from "@tenerife.music/ui";

function StackExample() {
  return (
    <Stack direction="vertical" spacing="md">
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
    <Stack direction="horizontal" spacing="lg" align="center">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Stack>
  );
}
```

### Выравнивание

```tsx
import { Stack } from "@tenerife.music/ui";

function StackAlignment() {
  return (
    <div>
      <Stack direction="horizontal" spacing="md" align="start">
        <div>Start</div>
      </Stack>
      <Stack direction="horizontal" spacing="md" align="center">
        <div>Center</div>
      </Stack>
      <Stack direction="horizontal" spacing="md" justify="between">
        <div>Between</div>
        <div>Between</div>
      </Stack>
    </div>
  );
}
```

**Props:**

- `direction`: `"vertical" | "horizontal"` - Направление (по умолчанию: "vertical")
- `spacing`: `string | number` - Отступ между элементами (token-based, canonical prop)
- `gap`: `string | number` - Deprecated, используйте `spacing`
- `align`: `"start" | "end" | "center" | "baseline" | "stretch"` - Выравнивание
- `justify`: `"start" | "end" | "center" | "between" | "around" | "evenly"` - Распределение

---

## Column и Row

Column и Row — семантические алиасы для Stack, которые делают код более читаемым.

### Column (вертикальный Stack)

Column — это семантический алиас для `Stack(direction="vertical")`.

```tsx
import { Column } from "@tenerife.music/ui";

function ColumnExample() {
  return (
    <Column spacing="md">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Column>
  );
}
```

### Row (горизонтальный Stack)

Row — это семантический алиас для `Stack(direction="horizontal")`.

```tsx
import { Row } from "@tenerife.music/ui";

function RowExample() {
  return (
    <Row spacing="md" align="center">
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Row>
  );
}
```

**Когда использовать:**

- **Column/Row**: Когда направление layout'а фиксировано и важна семантическая ясность
- **Stack**: Когда направление может меняться динамически или предпочитаете более общий API

---

## Container Component

Container — специализированный примитив для ограничения ширины контента и горизонтального padding. НЕ предоставляет layout-поведения (flex, grid, alignment).

### Базовое использование

```tsx
import { Container } from "@tenerife.music/ui";

function ContainerExample() {
  return (
    <Container maxWidth="lg" padding="md">
      <div>Контент с ограниченной шириной</div>
    </Container>
  );
}
```

### Responsive Container

```tsx
import { Container } from "@tenerife.music/ui";

function ResponsiveContainer() {
  return (
    <Container maxWidth={{ base: "md", lg: "xl" }} padding={{ base: "sm", md: "md" }}>
      Responsive container
    </Container>
  );
}
```

**Props:**

- `maxWidth`: `string` - Максимальная ширина (token-based)
- `padding`: `string` - Горизонтальный padding (token-based)
- `center`: `boolean` - Центрирование (по умолчанию: true)

---

## Surface Component

Surface — компонент-расширение Box для вариантов поверхности (flat, raised, sunken). Использует Box внутри как базовый контейнер.

### Базовое использование

```tsx
import { Surface } from "@tenerife.music/ui";

function SurfaceExample() {
  return (
    <Surface variant="raised" p="md" radius="md">
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
    <div>
      <Surface variant="flat" p="md">Flat</Surface>
      <Surface variant="raised" p="md">Raised</Surface>
      <Surface variant="sunken" p="md">Sunken</Surface>
    </div>
  );
}
```

**Props:**

- `variant`: `"flat" | "raised" | "sunken"` - Вариант стиля
- `radius`: `string` - Border radius (token-based)
- Все props от Box компонента (кроме `bg`, `shadow` - управляются через variant)

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
<Box p="md">
<Stack spacing="md">

// ❌ Неправильно
<Box p={16}>
<Stack spacing={32}>
```

### 2. Используйте правильные компоненты для layout

```tsx
// ✅ Правильно - Stack для композиции
<Stack direction="vertical" spacing="md">
  <Box p="md">Item 1</Box>
  <Box p="md">Item 2</Box>
</Stack>

// ❌ Неправильно - Box не поддерживает layout props
<Box display="flex" gap="md">  // ❌ display и gap удалены из Box
```

### 3. Комбинируйте компоненты

```tsx
// ✅ Правильно - композиция
<Container maxWidth="lg">
  <Stack direction="vertical" spacing="lg">
    <Box p="md">Item 1</Box>
    <Box p="md">Item 2</Box>
  </Stack>
</Container>
```

### 4. Используйте responsive props

```tsx
// ✅ Правильно - responsive
<Box p={{ base: "sm", md: "md", lg: "lg" }}>
<Stack spacing={{ base: "sm", md: "md" }}>

// ❌ Неправильно - фиксированные значения
<Box p="md" className="md:p-lg lg:p-xl">
```

### 5. Выбирайте правильный компонент

```tsx
// ✅ Для простых вертикальных/горизонтальных layout'ов
<Stack direction="vertical" spacing="md">
<Row spacing="md">  // Семантический алиас

// ✅ Для расширенного flexbox контроля
<Flex direction="row" wrap="wrap" gap="md">

// ✅ Для двухмерных layout'ов
<Grid cols={3} gap="md">

// ✅ Для ограничения ширины
<Container maxWidth="lg">
```

---

## Следующие шаги

- [Grid Guide](./GRID.md) - Подробное руководство по Grid
- [Tokens Guide](./TOKENS_GUIDE.md) - Работа с spacing tokens
- [Animation Guidelines](./ANIMATION_GUIDELINES.md) - Анимации с layout primitives

---

**Версия документа:** 1.0  
**Последнее обновление:** 2025-12-11
