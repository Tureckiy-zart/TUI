# Tenerife UI - Token System Map Overview

**Last Updated:** 2025-12-08  
**Purpose:** Complete reference for the token-driven architecture of Tenerife UI

---

## Overview

Tenerife UI uses a three-layer token system:

1. **Foundation Tokens** - Base design values (spacing, typography, colors, shadows, radius, motion)
2. **Component Tokens** - Component-specific mappings to foundation tokens
3. **Semantic Tokens** - Theme-aware tokens (primary, secondary, accent, destructive)

All tokens are designed to work seamlessly with the theme system (day/night modes) and Tailwind CSS integration.

---

## Foundation Tokens

### 1. Spacing Tokens (`src/tokens/spacing.ts`)

**Base System:** 8px grid

**Foundation Scale:**

- `0` → `0`
- `px` → `1px`
- `0.5` → `0.125rem` (4px)
- `1` → `0.25rem` (4px)
- `2` → `0.5rem` (8px) - **Base unit**
- `4` → `1rem` (16px) - **2× base**
- `6` → `1.5rem` (24px) - **3× base**
- `8` → `2rem` (32px) - **4× base**
- `12` → `3rem` (48px) - **6× base**
- `16` → `4rem` (64px) - **8× base**
- `20` → `5rem` (80px) - **10× base**
- `24` → `6rem` (96px) - **12× base**
- Extended up to `96` → `24rem` (384px)

**Semantic Spacing:**

- `xs` → `spacing[1]` (4px)
- `sm` → `spacing[2]` (8px)
- `md` → `spacing[4]` (16px)
- `lg` → `spacing[6]` (24px)
- `xl` → `spacing[8]` (32px)
- `2xl` → `spacing[12]` (48px)
- `3xl` → `spacing[16]` (64px)
- `4xl` → `spacing[20]` (80px)
- `5xl` → `spacing[24]` (96px)

**Layout Spacing:**

- `section.{xs|sm|md|lg|xl|2xl}` - Vertical spacing between sections
- `container.{xs|sm|md|lg|xl}` - Padding inside containers
- `grid.{xs|sm|md|lg|xl}` - Gap between grid items
- `stack.{xs|sm|md|lg|xl}` - Gap between stacked items
- `component.{xs|sm|md|lg|xl}` - Padding inside components

**CSS Variables:**

- `--spacing-{key}` - Base spacing values
- `--spacing-semantic-{size}` - Semantic spacing tokens
- `--spacing-{layout}-{size}` - Layout spacing tokens

---

### 2. Typography Tokens (`src/tokens/typography.ts`)

**Font Families:**

- `sans` → Inter (primary), with fallbacks
- `satoshi` → Satoshi (optional)
- `display` → Clash Display (headings/hero)
- `serif` → System serif stack
- `mono` → System monospace stack

**Fluid Type Scale (uses clamp()):**

- `xs` → `clamp(0.75rem, 0.7rem + 0.125vw, 0.875rem)` (12px-14px)
- `sm` → `clamp(0.875rem, 0.8rem + 0.25vw, 1rem)` (14px-16px)
- `base` → `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` (16px-18px)
- `lg` → `clamp(1.125rem, 1rem + 0.5vw, 1.5rem)` (18px-24px)
- `xl` → `clamp(1.5rem, 1.25rem + 1vw, 2rem)` (24px-32px)
- `2xl` → `clamp(2rem, 1.5rem + 2vw, 3rem)` (32px-48px)
- `3xl` → `clamp(2.5rem, 2rem + 2.5vw, 4rem)` (40px-64px)
- `4xl` → `clamp(3rem, 2.5rem + 2.5vw, 5rem)` (48px-80px)
- `5xl` → `clamp(3.5rem, 3rem + 2.5vw, 6rem)` (56px-96px)
- `6xl` → `clamp(4rem, 3.5rem + 2.5vw, 7rem)` (64px-112px)

**Font Weights:**

- `thin` → 100
- `extralight` → 200
- `light` → 300
- `normal` → 400
- `medium` → 500
- `semibold` → 600
- `bold` → 700
- `extrabold` → 800
- `black` → 900

**Line Heights:**

- `none` → 1
- `tight` → 1.25
- `snug` → 1.375
- `normal` → 1.5
- `relaxed` → 1.625
- `loose` → 2

**Letter Spacing:**

- `tighter` → -0.05em
- `tight` → -0.025em
- `normal` → 0em
- `wide` → 0.025em
- `wider` → 0.05em
- `widest` → 0.1em

**CSS Variables:**

- `--font-family-{name}` - Font family stacks
- `--font-size-{size}` - Font sizes
- `--font-weight-{weight}` - Font weights
- `--line-height-{height}` - Line heights
- `--letter-spacing-{spacing}` - Letter spacing

---

### 3. Color Tokens (`src/tokens/colors.ts`)

**Color Scales (HSL format):**

- Primary (Midnight Blues): `50` (lightest) → `950` (darkest)
- Accent (Purples): `50` → `950`
- Secondary (Refined Cyan): `50` → `950`

**Semantic Colors (Mode-aware):**

**Day Mode:**

- `primary` → Secondary 500 (Tenerife brand)
- `accent` → Accent 600
- `background` → White (`0 0% 100%`)
- `foreground` → Almost black (`0 0% 9%`)
- `border` → Light gray (`0 0% 89.8%`)
- `muted` → Muted gray
- `destructive` → Red/error

**Night Mode:**

- `primary` → Accent 600 (better contrast)
- `accent` → Accent 600
- `background` → Dark (`240 10% 3.9%`)
- `foreground` → Light gray (`0 0% 89.8%`)
- `border` → Dark gray (`240 3.7% 15.9%`)
- `muted` → Muted gray
- `destructive` → Error red

**Surface Colors (Elevation levels):**

- `base` → Base surface
- `elevated1-3` → Elevated surfaces (day: lighter, night: darker)
- `overlay` → Overlay surfaces
- `glass` → Glass effect surface

**Text Colors:**

- `primary` → Primary text color
- `secondary` → Secondary text color
- `tertiary` → Tertiary text color
- `muted` → Muted text color
- `inverse` → Inverse text color (for dark/light backgrounds)

**CSS Variables:**

- `--background`, `--foreground`
- `--primary-{scale}`, `--accent-{scale}`, `--secondary-{scale}`
- `--tm-primary`, `--tm-primary-foreground`
- `--tm-secondary`, `--tm-secondary-foreground`
- `--tm-accent`, `--tm-accent-foreground`
- `--surface-{level}`
- `--text-{type}`
- `--semantic-{type}` (success, error, warning, info)

---

### 4. Shadow Tokens (`src/tokens/shadows.ts`)

**Elevation Shadows:**

- `none` → No shadow
- `xs` → Subtle elevation (`0 1px 2px`)
- `sm` → Small elevation (`0 1px 3px, 0 1px 2px`)
- `md` → Medium elevation (`0 4px 6px, 0 2px 4px`)
- `lg` → Large elevation (`0 10px 15px, 0 4px 6px`)
- `xl` → Extra large elevation (`0 20px 25px, 0 8px 10px`)
- `2xl` → Maximum elevation (`0 25px 50px`)

**Colored Shadows:**

- `primary-{size}` → Primary colored shadows (xs, sm, md, lg, xl, 2xl)
- `accent-{size}` → Accent colored shadows (xs, sm, md, lg, xl, 2xl)

**Glow Effects:**

- `glow-primary-{intensity}` → Primary glow (subtle, medium, strong)
- `glow-accent-{intensity}` → Accent glow (subtle, medium, strong)

**Focus Rings:**

- `focus-ring-default` → Default focus ring
- `focus-ring-primary` → Primary focus ring
- `focus-ring-accent` → Accent focus ring

**CSS Variables:**

- `--shadow-elevation-{level}`
- `--shadow-primary-{size}`
- `--shadow-accent-{size}`
- `--shadow-glow-{color}-{intensity}`
- `--shadow-focus-ring-{variant}`

---

### 5. Radius Tokens (`src/tokens/radius.ts`)

**Foundation Scale:**

- `none` → `0`
- `xs` → `0.125rem` (2px)
- `sm` → `0.25rem` (4px) - Base unit
- `md` → `0.375rem` (6px)
- `lg` → `0.5rem` (8px)
- `xl` → `0.75rem` (12px)
- `2xl` → `1rem` (16px)
- `3xl` → `1.5rem` (24px)
- `full` → `9999px` (circular)

**Component Standards:**

- `button` → sm/md/lg/pill
- `card` → sm/md/lg/xl
- `input` → sm/md/lg
- `badge` → sm/md/lg/pill
- `avatar` → full/square
- `modal` → sm/md/lg/xl
- `tooltip` → sm/md
- `toast` → sm/md/lg
- `chip` → sm/md/lg/pill
- `image` → none/sm/md/lg/xl/full

**CSS Variables:**

- `--radius-{size}`
- `--radius-{component}`

---

### 6. Motion Tokens (`src/tokens/motion.ts`)

**Durations:**

- `instant` → 0ms
- `fast` → 150ms
- `normal` → 300ms (default)
- `slow` → 500ms
- `slower` → 700ms
- `slowest` → 1000ms
- Granular: `75`, `100`, `200`, `250`, `400`, `600`, `800` ms

**Easing Functions:**

- `linear` → Linear
- `ease-in` → Accelerate
- `ease-out` → Decelerate (recommended for most UI)
- `ease-in-out` → Accelerate and decelerate
- `bounce` → Bounce effect
- `elastic` → Elastic effect
- Material Design easings available

**Transitions:**

- Pre-configured combinations: `fast`, `normal`, `slow` + easing variants
- Examples: `fast-out`, `normal-in-out`, `slow-in`

**Keyframes:**

- `fade` → Fade in/out
- `slide` → Slide animations (up, down, left, right)
- `scale` → Scale animations
- `spin` → Rotation
- `pulse` → Pulse effect
- `bounce` → Bounce animation
- `ping` → Ping effect
- `shake` → Shake animation

**CSS Variables:**

- `--duration-{name}`
- `--easing-{name}`
- `--transition-{name}`

---

## Component Tokens

Component tokens map foundation tokens to component-specific usage patterns.

### Button Tokens (`src/tokens/components/button.ts`)

**Maps to:**

- `spacing` → padding (horizontal: sm/md/lg, vertical: xs/sm)
- `typography` → fontSize (xs/sm), fontWeight
- `radius` → borderRadius (md)
- `shadows` → shadow (sm/default, primary)

**Usage:**

```typescript
import { BUTTON_TOKENS } from "@/tokens/components/button";

// Height tokens: h-8 (sm), h-9 (md), h-10 (lg)
// Padding: px-sm, px-md, px-lg (horizontal), py-xs, py-sm (vertical)
// Font size: text-xs (sm), text-sm (md, lg)
```

### Input Tokens (`src/tokens/components/input.ts`)

**Maps to:**

- `spacing` → padding (horizontal: sm, vertical: xs), gap
- `typography` → fontSize (sm/base)
- `radius` → borderRadius (md)
- `shadows` → shadow (sm)

**Usage:**

```typescript
import { INPUT_TOKENS } from "@/tokens/components/input";

// Height: h-8 (sm), h-9 (md), h-10 (lg)
// Padding: px-sm, py-xs
// Font size: text-sm (sm), text-base (md, lg)
```

### Text Tokens (`src/tokens/components/text.ts`)

**Maps to:**

- `typography` → fontSize (xs/sm/md/lg/xl), fontWeight, lineHeight, letterSpacing

**Usage:**

```typescript
import { TEXT_TOKENS } from "@/tokens/components/text";

// Font sizes: text-xs, text-sm, text-base, text-lg, text-xl
// Weights: font-normal, font-medium, font-semibold, font-bold
```

---

## Semantic Tokens

Semantic tokens provide theme-aware, meaning-based tokens.

### Color Semantic Tokens

**Primary:**

- `--tm-primary` → Mode-aware primary color
- `--tm-primary-foreground` → Contrasting foreground

**Secondary:**

- `--tm-secondary` → Mode-aware secondary color
- `--tm-secondary-foreground` → Contrasting foreground

**Accent:**

- `--tm-accent` → Mode-aware accent color
- `--tm-accent-foreground` → Contrasting foreground

**Destructive:**

- `--destructive` → Error/destructive color
- `--destructive-foreground` → Contrasting foreground

**Muted:**

- `--muted` → Muted background
- `--muted-foreground` → Muted text

---

## Token Usage in Components

### Example: Button Component

```typescript
import { cva } from "class-variance-authority";
import { BUTTON_TOKENS } from "@/tokens/components/button";

const buttonVariants = cva(
  // Base classes using tokens
  `${BUTTON_TOKENS.radius} ${BUTTON_TOKENS.shadow.default}`,
  {
    variants: {
      size: {
        sm: `${BUTTON_TOKENS.height.sm} ${BUTTON_TOKENS.padding.horizontal.sm} ${BUTTON_TOKENS.fontSize.sm}`,
        md: `${BUTTON_TOKENS.height.md} ${BUTTON_TOKENS.padding.horizontal.md} ${BUTTON_TOKENS.fontSize.md}`,
        lg: `${BUTTON_TOKENS.height.lg} ${BUTTON_TOKENS.padding.horizontal.lg} ${BUTTON_TOKENS.fontSize.lg}`,
      },
    },
  },
);
```

### Example: Using CSS Variables

```css
.button {
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-elevation-sm);
  background: hsl(var(--tm-primary));
  color: hsl(var(--tm-primary-foreground));
}
```

---

## Tailwind Integration

All tokens are mapped to Tailwind theme:

**Colors:**

```typescript
// tailwind.config.ts
import { tailwindThemeColors } from "@tenerife.music/ui/tokens";

theme: {
  extend: {
    colors: tailwindThemeColors,
  }
}
```

**Spacing:**

```typescript
import { tailwindSpacingConfig } from "@tenerife.music/ui/tokens";

theme: {
  extend: {
    spacing: tailwindSpacingConfig.spacing,
  }
}
```

**Other tokens similarly integrated via preset:**

- Typography → fontFamily, fontSize, fontWeight, lineHeight, letterSpacing
- Shadows → boxShadow, ringWidth, ringColor
- Radius → borderRadius
- Motion → transitionDuration, transitionTimingFunction, keyframes, animation

---

## Theme System Integration

Tokens automatically adapt to theme mode (day/night):

1. CSS variables are set via `ThemeProvider`
2. Variables switch values based on `data-mode` attribute
3. Components use CSS variables, not hardcoded values
4. Tailwind classes resolve to CSS variables

**Example:**

```typescript
// Day mode
--tm-primary: 173 100% 37%; // Secondary 500 (Tenerife brand)

// Night mode
--tm-primary: 259 60% 50%; // Accent 600 (better contrast)
```

---

## Token Export Structure

**Foundation Tokens:**

- `src/tokens/colors.ts`
- `src/tokens/typography.ts`
- `src/tokens/spacing.ts`
- `src/tokens/shadows.ts`
- `src/tokens/radius.ts`
- `src/tokens/motion.ts`

**Component Tokens:**

- `src/tokens/components/button.ts`
- `src/tokens/components/input.ts`
- `src/tokens/components/text.ts`
- `src/tokens/components/alert.ts`
- `src/tokens/components/card.ts`
- `src/tokens/components/surface.ts`
- `src/tokens/components/section.ts`
- `src/tokens/components/overlay.ts`
- `src/tokens/components/toast.ts`

**All tokens exported via:**

- `src/tokens/index.ts` → `export * from "./colors"` etc.
- Available in public API: `import { colors, spacing } from "@tenerife.music/ui"`

---

## Best Practices

1. **Always use tokens** - Never hardcode spacing, colors, or other values
2. **Use semantic tokens** - Prefer `primary` over specific color values
3. **Component tokens first** - Use component tokens when available
4. **Foundation tokens** - Use for custom components or layouts
5. **CSS variables** - Use in custom CSS when needed
6. **Tailwind classes** - Prefer Tailwind utility classes mapped to tokens

---

## TODO: Future Enhancements

- [ ] Icon system tokens (size, spacing)
- [ ] A11y hardening tokens (focus indicators, contrast ratios)
- [ ] Responsive breakpoint tokens
- [ ] Animation presets for common patterns

---

**Last Updated:** 2025-12-08  
**Version:** 1.0.0
