# 🎨 Руководство по токенам Tenerife UI

Полное руководство по использованию дизайн-токенов Tenerife UI.

---

## Введение

Tenerife UI использует систему дизайн-токенов для обеспечения консистентности и гибкости. Все токены доступны в JavaScript/TypeScript коде и как Tailwind CSS классы.

---

## Импорт токенов

```typescript
// Импорт всех токенов
import * as tokens from "@tenerife.music/ui/tokens";

// Импорт конкретных категорий
import {
  primaryColors,
  accentColors,
  spacing,
  borderRadius,
  elevationShadows,
  durations,
} from "@tenerife.music/ui/tokens";
```

---

## Цветовые токены (Colors)

### Основные палитры

#### Primary Colors (Midnight Blues)

Основная цветовая палитра бренда Tenerife Music:

```typescript
import { primaryColors } from "@tenerife.music/ui/tokens";

// Использование
const primary = primaryColors[500]; // "215 20% 35%" (HSL значения)
```

**Доступные оттенки:** 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

**Использование в Tailwind:**

```tsx
<div className="bg-primary text-primary-foreground">Primary color</div>
```

#### Accent Colors (Purples)

Акцентная палитра для выделения элементов:

```typescript
import { accentColors } from "@tenerife.music/ui/tokens";

const accent = accentColors[500]; // "280 70% 67%"
```

**Доступные оттенки:** 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

**Использование в Tailwind:**

```tsx
<div className="bg-accent text-accent-foreground">Accent color</div>
```

#### Secondary Colors (Refined Cyan)

Вторичная палитра для дополнительных элементов:

```typescript
import { secondaryColors } from "@tenerife.music/ui/tokens";

const secondary = secondaryColors[500]; // "173 100% 37%"
```

**Доступные оттенки:** 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

**Использование в Tailwind:**

```tsx
<div className="bg-secondary text-secondary-foreground">Secondary color</div>
```

### Семантические цвета (Semantic Colors)

Семантические цвета для состояний (success, error, warning, info):

```typescript
import { semanticColors } from "@tenerife.music/ui/tokens";

// Режимы: "day" | "night"
const success = semanticColors.night.success; // "142 70% 45%"
const error = semanticColors.night.error; // "0 62.8% 30.6%"
const warning = semanticColors.night.warning;
const info = semanticColors.night.info;
```

**Использование в Tailwind:**

```tsx
<div className="bg-destructive text-destructive-foreground">Error state</div>
```

### Поверхностные цвета (Surface Colors)

Цвета для фонов и поверхностей:

```typescript
import { surfaceColors } from "@tenerife.music/ui/tokens";

const background = surfaceColors.night.base; // "240 10% 3.9%"
const elevated = surfaceColors.night.elevated1; // "240 10% 5.1%"
```

**Доступные уровни:**

- `base` - Основной фон
- `elevated1`, `elevated2`, `elevated3` - Приподнятые поверхности
- `overlay` - Overlay backdrop
- `glass` - Glass эффект

**Использование в Tailwind:**

```tsx
<div className="bg-background">Base background</div>
<div className="bg-card">Card background</div>
<div className="bg-popover">Popover background</div>
```

### Текстовые цвета (Text Colors)

Цвета для текста:

```typescript
import { textColors } from "@tenerife.music/ui/tokens";

const primary = textColors.night.primary; // Основной текст
const secondary = textColors.night.secondary; // Вторичный текст
const muted = textColors.night.muted; // Приглушенный текст
```

**Использование в Tailwind:**

```tsx
<p className="text-foreground">Primary text</p>
<p className="text-muted-foreground">Muted text</p>
```

---

## Spacing токены

Spacing система основана на 8px grid. Все значения кратны 8px.

### Базовые значения

```typescript
import { spacing } from "@tenerife.music/ui/tokens";

spacing[0]; // "0"
spacing[1]; // "0.25rem" (4px)
spacing[2]; // "0.5rem" (8px) - базовый unit
spacing[4]; // "1rem" (16px)
spacing[8]; // "2rem" (32px)
spacing[16]; // "4rem" (64px)
```

**Доступные значения:** 0, px, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96

### Семантические значения

```typescript
import { semanticSpacing } from "@tenerife.music/ui/tokens";

semanticSpacing.xs; // 4px
semanticSpacing.sm; // 8px
semanticSpacing.md; // 16px (default)
semanticSpacing.lg; // 24px
semanticSpacing.xl; // 32px
semanticSpacing["2xl"]; // 48px
semanticSpacing["3xl"]; // 64px
semanticSpacing["4xl"]; // 80px
semanticSpacing["5xl"]; // 96px
```

**Использование в Tailwind:**

```tsx
<div className="m-6 gap-2 p-4">Padding: 1rem (16px), Margin: 1.5rem (24px), Gap: 0.5rem (8px)</div>
```

### Layout Spacing

```typescript
import { layoutSpacing } from "@tenerife.music/ui/tokens";

layoutSpacing.section.xs; // 24px
layoutSpacing.container.md; // 24px
layoutSpacing.grid.lg; // 32px
layoutSpacing.stack.md; // 16px
layoutSpacing.component.lg; // 24px
```

---

## Типографика (Typography)

### Font Families

```typescript
import { fontFamily } from "@tenerife.music/ui/tokens";

fontFamily.sans; // Inter (основной)
fontFamily.display; // Clash Display (для заголовков)
fontFamily.satoshi; // Satoshi (опционально)
fontFamily.mono; // Monospace
```

**Использование в Tailwind:**

```tsx
<h1 className="font-display text-5xl">Display font</h1>
<p className="font-sans text-base">Sans font</p>
```

### Font Sizes

Используется fluid типографика с `clamp()`:

```typescript
import { fontSize } from "@tenerife.music/ui/tokens";

fontSize.xs; // clamp(0.75rem, 0.7rem + 0.125vw, 0.875rem)
fontSize.sm; // clamp(0.875rem, 0.8rem + 0.25vw, 1rem)
fontSize.base; // clamp(1rem, 0.95rem + 0.25vw, 1.125rem)
fontSize.lg; // clamp(1.125rem, 1rem + 0.5vw, 1.25rem)
fontSize.xl; // clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)
fontSize["2xl"]; // clamp(1.5rem, 1.25rem + 1.25vw, 2rem)
fontSize["3xl"]; // clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)
fontSize["4xl"]; // clamp(2.25rem, 1.75rem + 2.5vw, 3rem)
fontSize["5xl"]; // clamp(3rem, 2rem + 5vw, 4rem)
fontSize["6xl"]; // clamp(3.75rem, 2.5rem + 6.25vw, 5rem)
```

**Использование в Tailwind:**

```tsx
<h1 className="text-5xl">Large heading</h1>
<p className="text-base">Body text</p>
```

### Font Weights

```typescript
import { fontWeight } from "@tenerife.music/ui/tokens";

fontWeight.thin; // "100"
fontWeight.light; // "300"
fontWeight.normal; // "400"
fontWeight.medium; // "500"
fontWeight.semibold; // "600"
fontWeight.bold; // "700"
fontWeight.extrabold; // "800"
```

**Использование в Tailwind:**

```tsx
<p className="font-normal">Normal weight</p>
<p className="font-bold">Bold weight</p>
```

### Line Heights

```typescript
import { lineHeight } from "@tenerife.music/ui/tokens";

lineHeight.none; // "1"
lineHeight.tight; // "1.25"
lineHeight.snug; // "1.375"
lineHeight.normal; // "1.5"
lineHeight.relaxed; // "1.625"
lineHeight.loose; // "2"
```

**Использование в Tailwind:**

```tsx
<p className="leading-normal">Normal line height</p>
<p className="leading-tight">Tight line height</p>
```

### Letter Spacing

```typescript
import { letterSpacing } from "@tenerife.music/ui/tokens";

letterSpacing.tighter; // "-0.05em"
letterSpacing.tight; // "-0.025em"
letterSpacing.normal; // "0em"
letterSpacing.wide; // "0.025em"
letterSpacing.wider; // "0.05em"
letterSpacing.widest; // "0.1em"
```

**Использование в Tailwind:**

```tsx
<p className="tracking-normal">Normal letter spacing</p>
<p className="tracking-wide">Wide letter spacing</p>
```

---

## Shadows (Тени)

### Elevation Shadows

Тени для создания глубины:

```typescript
import { elevationShadows } from "@tenerife.music/ui/tokens";

elevationShadows.none; // "none"
elevationShadows.xs; // "0 1px 2px 0 rgb(0 0 0 / 0.05)"
elevationShadows.sm; // "0 1px 3px 0 rgb(0 0 0 / 0.1)..."
elevationShadows.md; // "0 4px 6px -1px rgb(0 0 0 / 0.1)..."
elevationShadows.lg; // "0 10px 15px -3px rgb(0 0 0 / 0.1)..."
elevationShadows.xl; // "0 20px 25px -5px rgb(0 0 0 / 0.1)..."
elevationShadows["2xl"]; // "0 25px 50px -12px rgb(0 0 0 / 0.25)"
```

**Использование в Tailwind:**

```tsx
<div className="shadow-sm">Small shadow</div>
<div className="shadow-lg">Large shadow</div>
<div className="shadow-2xl">Extra large shadow</div>
```

### Colored Shadows

Цветные тени для акцентов:

```typescript
import { primaryColoredShadows, accentColoredShadows } from "@tenerife.music/ui/tokens";

primaryColoredShadows.md; // Primary colored shadow
accentColoredShadows.lg; // Accent colored shadow
```

**Использование в Tailwind:**

```tsx
<div className="shadow-primary-md">Primary shadow</div>
<div className="shadow-accent-lg">Accent shadow</div>
```

### Glow Effects

Glow эффекты для подсветки:

```typescript
import { glowEffects } from "@tenerife.music/ui/tokens";

glowEffects["glow-primary"]; // Основной glow
glowEffects["glow-primary-subtle"]; // Тонкий glow
glowEffects["glow-primary-medium"]; // Средний glow
glowEffects["glow-primary-strong"]; // Сильный glow
glowEffects["glow-accent"]; // Accent glow
```

**Использование в Tailwind:**

```tsx
<div className="shadow-glow-primary">Primary glow</div>
<div className="shadow-glow-accent-subtle">Subtle accent glow</div>
```

---

## Border Radius

```typescript
import { borderRadius } from "@tenerife.music/ui/tokens";

borderRadius.none; // "0"
borderRadius.xs; // "0.125rem" (2px)
borderRadius.sm; // "0.25rem" (4px)
borderRadius.md; // "0.375rem" (6px)
borderRadius.lg; // "0.5rem" (8px)
borderRadius.xl; // "0.75rem" (12px)
borderRadius["2xl"]; // "1rem" (16px)
borderRadius["3xl"]; // "1.5rem" (24px)
borderRadius.full; // "9999px" (полностью круглый)
```

**Использование в Tailwind:**

```tsx
<div className="rounded-md">Medium radius</div>
<div className="rounded-lg">Large radius</div>
<div className="rounded-full">Full radius</div>
```

### Component-Specific Radius

```typescript
import { componentRadius } from "@tenerife.music/ui/tokens";

componentRadius.button.md; // Радиус для кнопок
componentRadius.card.lg; // Радиус для карточек
componentRadius.input.md; // Радиус для инпутов
componentRadius.modal.lg; // Радиус для модалок
```

---

## Motion (Анимации)

### Durations

```typescript
import { durations } from "@tenerife.music/ui/tokens";

durations.instant; // "0ms"
durations.fast; // "150ms"
durations.normal; // "300ms" (default)
durations.slow; // "500ms"
durations.slower; // "700ms"
durations.slowest; // "1000ms"
```

**Использование в Tailwind:**

```tsx
<div className="transition-all duration-normal">Normal duration</div>
<div className="transition-all duration-fast">Fast duration</div>
```

### Easings

```typescript
import { easings } from "@tenerife.music/ui/tokens";

easings.linear; // "linear"
easings["ease-in"]; // "cubic-bezier(0.4, 0, 1, 1)"
easings["ease-out"]; // "cubic-bezier(0, 0, 0.2, 1)" (рекомендуется)
easings["ease-in-out"]; // "cubic-bezier(0.4, 0, 0.2, 1)"
easings.bounce; // "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
easings.elastic; // "cubic-bezier(0.175, 0.885, 0.32, 1.275)"
```

**Использование в Tailwind:**

```tsx
<div className="transition-all ease-out">Ease out</div>
<div className="transition-all ease-in-out">Ease in out</div>
```

### Keyframes

Предопределенные keyframe анимации:

```typescript
import { keyframes } from "@tenerife.music/ui/tokens";

// Fade
keyframes.fadeIn;
keyframes.fadeOut;

// Slide
keyframes.slideInUp;
keyframes.slideInDown;
keyframes.slideInLeft;
keyframes.slideInRight;
keyframes.slideOutUp;
keyframes.slideOutDown;
keyframes.slideOutLeft;
keyframes.slideOutRight;

// Scale
keyframes.scaleIn;
keyframes.scaleOut;
keyframes.scaleUp;
keyframes.scaleDown;

// Rotation
keyframes.spin;
keyframes.spinReverse;

// Pulse & Bounce
keyframes.pulse;
keyframes.bounce;

// Shake
keyframes.shake;
```

**Использование в Tailwind:**

```tsx
<div className="animate-fadeIn">Fade in</div>
<div className="animate-slideInUp">Slide in up</div>
<div className="animate-spin">Spinning</div>
<div className="animate-pulse">Pulsing</div>
```

### Animations

Предопределенные анимации:

```typescript
import { animations } from "@tenerife.music/ui/tokens";

animations.fadeIn; // fadeIn 300ms ease-out
animations.slideInUp; // slideInUp 300ms ease-out
animations.scaleIn; // scaleIn 300ms ease-out
animations.spin; // spin 1s linear infinite
animations.pulse; // pulse 2s ease-in-out infinite
animations.bounce; // bounce 1s linear infinite
```

---

## CSS Variables

Все токены доступны как CSS переменные:

```css
/* Colors */
--primary-500: 215 20% 35%;
--accent-500: 280 70% 67%;
--background: 240 10% 3.9%;
--foreground: 0 0% 98%;

/* Spacing */
--spacing-4: 1rem;
--spacing-8: 2rem;

/* Typography */
--font-sans: Inter, ui-sans-serif, system-ui, ...;
--font-display: Clash Display, Inter, ...;
--font-size-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);

/* Shadows */
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--glow-primary: 0 0 20px 0 hsl(var(--primary-500) / 0.5);

/* Radius */
--radius-md: 0.375rem;
--radius-lg: 0.5rem;

/* Motion */
--duration-normal: 300ms;
--ease-out: cubic-bezier(0, 0, 0.2, 1);
```

**Использование в CSS:**

```css
.custom-element {
  background-color: hsl(var(--primary-500));
  padding: var(--spacing-4);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  transition: all var(--duration-normal) var(--ease-out);
}
```

---

## Примеры использования

### Комбинирование токенов в TypeScript

```typescript
import {
  primaryColors,
  spacing,
  borderRadius,
  elevationShadows,
  durations,
  easings,
} from "@tenerife.music/ui/tokens";

const buttonStyle = {
  backgroundColor: `hsl(${primaryColors[500]})`,
  padding: `${spacing[4]} ${spacing[6]}`,
  borderRadius: borderRadius.md,
  boxShadow: elevationShadows.md,
  transition: `all ${durations.normal} ${easings["ease-out"]}`,
};
```

### Использование в Tailwind

```tsx
<button className="rounded-md bg-primary px-6 py-4 text-primary-foreground shadow-md transition-all duration-normal ease-out hover:bg-primary/90 hover:shadow-lg">
  Button
</button>
```

### Использование в styled-components

```typescript
import styled from "styled-components";
import { spacing, borderRadius, elevationShadows, primaryColors } from "@tenerife.music/ui/tokens";

const StyledCard = styled.div`
  padding: ${spacing[6]};
  border-radius: ${borderRadius.lg};
  box-shadow: ${elevationShadows.md};
  background-color: hsl(${primaryColors[50]});
`;
```

### Использование в CSS Modules

```css
/* Card.module.css */
.card {
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  background-color: hsl(var(--primary-50));
}
```

---

## Типы TypeScript

Все токены типизированы:

```typescript
import type {
  ColorScale,
  Spacing,
  SemanticSpacing,
  BorderRadius,
  ElevationShadow,
  Duration,
  Easing,
} from "@tenerife.music/ui/tokens";

const spacingValue: Spacing = 4; // ✅
const borderRadiusValue: BorderRadius = "md"; // ✅
const shadowValue: ElevationShadow = "lg"; // ✅
```

---

## Следующие шаги

- [Руководство по использованию](./USAGE.md) - Общие примеры использования
- [Руководство по темам](./THEME_GUIDE.md) - Работа с темами
- [Примеры компонентов](./COMPONENT_EXAMPLES.md) - Примеры использования компонентов

---

**Версия документа:** 1.0  
**Последнее обновление:** 2024-12-19
