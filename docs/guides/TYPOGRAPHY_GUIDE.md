# 📝 Typography Guide

**Last Updated:** 2025-12-11  
**Version:** 1.0

Полное руководство по использованию Typography компонентов в Tenerife UI.

---

## Введение

Tenerife UI предоставляет набор типографических компонентов для создания консистентной типографики. Все компоненты token-driven, используют CVA для вариантов и полностью типизированы.

### Доступные компоненты

- `Text` - Базовый текстовый компонент
- `Heading` - Заголовки (h1-h6)
- `Display` - Крупные заголовки для hero секций
- `Body` - Основной текст
- `Lead` - Вводный текст
- `Caption` - Подписи и мелкий текст
- `Code` - Код и моноширинный текст

---

## Text Component

Базовый компонент для текста с поддержкой размеров, весов и вариантов.

### Базовое использование

```tsx
import { Text } from "@tenerife.music/ui";

function TextExample() {
  return (
    <div className="space-y-2">
      <Text>Обычный текст</Text>
      <Text size="sm">Маленький текст</Text>
      <Text size="lg">Большой текст</Text>
    </div>
  );
}
```

### Размеры

```tsx
import { Text } from "@tenerife.music/ui";

function TextSizes() {
  return (
    <div className="space-y-2">
      <Text size="xs">Extra Small (xs)</Text>
      <Text size="sm">Small (sm)</Text>
      <Text size="md">Medium (md) - по умолчанию</Text>
      <Text size="lg">Large (lg)</Text>
      <Text size="xl">Extra Large (xl)</Text>
    </div>
  );
}
```

### Веса

```tsx
import { Text } from "@tenerife.music/ui";

function TextWeights() {
  return (
    <div className="space-y-2">
      <Text weight="normal">Normal weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  );
}
```

### Muted вариант

```tsx
import { Text } from "@tenerife.music/ui";

function TextMuted() {
  return (
    <div>
      <Text>Обычный текст</Text>
      <Text muted>Приглушенный текст</Text>
    </div>
  );
}
```

**Props:**

- `size`: `"xs" | "sm" | "md" | "lg" | "xl"` - Размер текста
- `weight`: `"normal" | "medium" | "semibold" | "bold"` - Вес шрифта
- `muted`: `boolean` - Приглушенный цвет текста
- `className`: `string` - Дополнительные CSS классы

---

## Heading Component

Компонент для заголовков с семантическими уровнями (h1-h6).

### Базовое использование

```tsx
import { Heading } from "@tenerife.music/ui";

function HeadingExample() {
  return (
    <div className="space-y-4">
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
    </div>
  );
}
```

### С кастомным элементом

```tsx
import { Heading } from "@tenerife.music/ui";

function CustomHeading() {
  return (
    <Heading level={1} as="div">
      Заголовок как div
    </Heading>
  );
}
```

### Веса

```tsx
import { Heading } from "@tenerife.music/ui";

function HeadingWeights() {
  return (
    <div className="space-y-2">
      <Heading level={2} weight="normal">
        Normal
      </Heading>
      <Heading level={2} weight="medium">
        Medium
      </Heading>
      <Heading level={2} weight="semibold">
        Semibold
      </Heading>
      <Heading level={2} weight="bold">
        Bold
      </Heading>
    </div>
  );
}
```

**Props:**

- `level`: `1 | 2 | 3 | 4 | 5 | 6` - Уровень заголовка (обязательно)
- `weight`: `"normal" | "medium" | "semibold" | "bold"` - Вес шрифта
- `muted`: `boolean` - Приглушенный цвет
- `as`: `"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div"` - HTML элемент

---

## Display Component

Компонент для крупных заголовков в hero секциях.

### Базовое использование

```tsx
import { Display } from "@tenerife.music/ui";

function DisplayExample() {
  return <Display>Главный заголовок</Display>;
}
```

### Размеры

```tsx
import { Display } from "@tenerife.music/ui";

function DisplaySizes() {
  return (
    <div className="space-y-4">
      <Display size="xl">XL Display</Display>
      <Display size="2xl">2XL Display</Display>
      <Display size="3xl">3XL Display</Display>
      <Display size="4xl">4XL Display - по умолчанию</Display>
    </div>
  );
}
```

**Props:**

- `size`: `"xl" | "2xl" | "3xl" | "4xl"` - Размер
- `weight`: `"normal" | "medium" | "semibold" | "bold"` - Вес
- `muted`: `boolean` - Приглушенный цвет
- `as`: `"h1" | "h2" | "div"` - HTML элемент

---

## Body Component

Компонент для основного текста.

### Базовое использование

```tsx
import { Body } from "@tenerife.music/ui";

function BodyExample() {
  return (
    <Body>
      Это основной текст статьи или контента. Используется для длинных текстовых блоков с хорошей
      читаемостью.
    </Body>
  );
}
```

### Размеры

```tsx
import { Body } from "@tenerife.music/ui";

function BodySizes() {
  return (
    <div className="space-y-2">
      <Body size="md">Medium body text</Body>
      <Body size="lg">Large body text</Body>
    </div>
  );
}
```

**Props:**

- `size`: `"md" | "lg"` - Размер
- `weight`: `"normal" | "medium" | "semibold" | "bold"` - Вес
- `muted`: `boolean` - Приглушенный цвет
- `as`: `"p" | "span" | "div"` - HTML элемент

---

## Lead Component

Компонент для вводного текста (lead paragraph).

### Базовое использование

```tsx
import { Lead } from "@tenerife.music/ui";

function LeadExample() {
  return (
    <div>
      <Heading level={1}>Заголовок статьи</Heading>
      <Lead>
        Это вводный текст, который обычно идет после заголовка и привлекает внимание читателя к
        основному содержанию.
      </Lead>
      <Body>Основной текст статьи...</Body>
    </div>
  );
}
```

**Props:**

- `size`: `"md" | "lg"` - Размер
- `weight`: `"normal" | "medium" | "semibold" | "bold"` - Вес
- `muted`: `boolean` - Приглушенный цвет
- `as`: `"p" | "span" | "div"` - HTML элемент

---

## Caption Component

Компонент для подписей и мелкого текста.

### Базовое использование

```tsx
import { Caption } from "@tenerife.music/ui";

function CaptionExample() {
  return (
    <div>
      <img src="/image.jpg" alt="Example" />
      <Caption>Подпись к изображению</Caption>
    </div>
  );
}
```

**Props:**

- `size`: `"sm" | "md"` - Размер
- `weight`: `"normal" | "medium" | "semibold" | "bold"` - Вес
- `muted`: `boolean` - Приглушенный цвет (по умолчанию true)
- `as`: `"p" | "span" | "div"` - HTML элемент

---

## Code Component

Компонент для отображения кода и моноширинного текста.

### Базовое использование

```tsx
import { Code } from "@tenerife.music/ui";

function CodeExample() {
  return (
    <div>
      <Text>
        Используйте компонент <Code>Button</Code> для создания кнопок.
      </Text>
    </div>
  );
}
```

### Блок кода

```tsx
import { Code } from "@tenerife.music/ui";

function CodeBlock() {
  return (
    <Code as="pre" className="block p-4">
      {`function example() {
  return "Hello World";
}`}
    </Code>
  );
}
```

**Props:**

- `size`: `"sm" | "md"` - Размер
- `weight`: `"normal" | "medium" | "semibold" | "bold"` - Вес
- `muted`: `boolean` - Приглушенный цвет
- `as`: `"code" | "pre" | "span" | "div"` - HTML элемент

---

## Примеры использования

### Типичная структура статьи

```tsx
import { Display, Heading, Lead, Body, Caption } from "@tenerife.music/ui";

function Article() {
  return (
    <article>
      <Display>Заголовок статьи</Display>
      <Lead>Вводный текст, который привлекает внимание и дает краткое описание.</Lead>

      <Heading level={2}>Подзаголовок раздела</Heading>
      <Body>
        Основной текст статьи с подробным описанием темы. Используется для длинных текстовых блоков.
      </Body>

      <Heading level={3}>Меньший подзаголовок</Heading>
      <Body>Дополнительный текст с деталями и примерами.</Body>

      <Caption>Дата публикации: 11 декабря 2025</Caption>
    </article>
  );
}
```

### Комбинирование компонентов

```tsx
import { Heading, Text, Code, Body } from "@tenerife.music/ui";

function Documentation() {
  return (
    <div className="space-y-4">
      <Heading level={1}>Документация компонента</Heading>

      <Body>
        Компонент <Code>Button</Code> используется для создания интерактивных кнопок в интерфейсе.
      </Body>

      <Heading level={2}>Пример использования</Heading>
      <Text muted>См. примеры в разделе Component Examples.</Text>
    </div>
  );
}
```

---

## Best Practices

### 1. Используйте семантические компоненты

```tsx
// ✅ Правильно - семантический заголовок
<Heading level={1}>Главный заголовок</Heading>

// ❌ Неправильно - обычный текст
<Text size="xl" weight="bold">Главный заголовок</Text>
```

### 2. Соблюдайте иерархию заголовков

```tsx
// ✅ Правильно - правильная иерархия
<Heading level={1}>Главный</Heading>
<Heading level={2}>Подзаголовок</Heading>
<Heading level={3}>Под-подзаголовок</Heading>

// ❌ Неправильно - пропущен уровень
<Heading level={1}>Главный</Heading>
<Heading level={3}>Подзаголовок</Heading> // Пропущен level={2}
```

### 3. Используйте muted для второстепенного текста

```tsx
// ✅ Правильно
<Text muted>Второстепенная информация</Text>
<Caption>Подпись к изображению</Caption> // muted по умолчанию

// ❌ Неправильно
<Text className="text-muted-foreground">Информация</Text>
```

### 4. Выбирайте правильный компонент

```tsx
// ✅ Правильно - для основного текста
<Body>Основной текст статьи</Body>

// ✅ Правильно - для вводного текста
<Lead>Вводный текст</Lead>

// ✅ Правильно - для подписей
<Caption>Подпись</Caption>
```

---

## Accessibility

Все Typography компоненты соответствуют стандартам доступности:

- ✅ Семантические HTML элементы
- ✅ Правильная иерархия заголовков
- ✅ Достаточный цветовой контраст
- ✅ Поддержка screen readers

---

## Следующие шаги

- [Tokens Guide](./TOKENS_GUIDE.md) - Работа с типографическими токенами
- [Component Examples](./COMPONENT_EXAMPLES.md) - Примеры использования
- [Theme Guide](./THEME_GUIDE.md) - Настройка тем для типографики

---

**Версия документа:** 1.0  
**Последнее обновление:** 2025-12-11
