# Tenerife UI - Token System Map Overview

**Last Updated:** 2026-02-05  
**Purpose:** Reference for the token-driven architecture of Tenerife UI.

---

## Overview

Tenerife UI uses a three-layer token system:

1. **Foundation Tokens** - Base design values (spacing, typography, colors, shadows, radius, motion)
2. **Component Tokens** - Component-specific mappings to foundation tokens
3. **Semantic Tokens** - Theme-aware tokens (primary, secondary, accent, destructive)

All tokens are designed to work with the theme system (day/night modes) and Tailwind CSS integration.

---

## Foundation Tokens

### 1. Spacing Tokens (`src/FOUNDATION/tokens/spacing.ts`)

**Base System:** 8px grid (with fine-grain half/quarter steps)

**Foundation Scale (selected):**

- `0` → `0`
- `px` → `1px`
- `0.5` → `0.125rem` (4px)
- `1` → `0.25rem` (4px)
- `1.5` → `0.375rem` (6px)
- `2` → `0.5rem` (8px)
- `2.5` → `0.625rem` (10px)
- `3` → `0.75rem` (12px)
- `3.5` → `0.875rem` (14px)
- `4` → `1rem` (16px)
- `5` → `1.25rem` (20px)
- `6` → `1.5rem` (24px)
- `8` → `2rem` (32px)
- `12` → `3rem` (48px)
- `16` → `4rem` (64px)
- `20` → `5rem` (80px)
- `24` → `6rem` (96px)
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
- `none` → `spacing[0]` (0)

**Layout Spacing:**

- `section.{xs|sm|md|lg|xl|2xl}` - Vertical spacing between sections
- `container.{xs|sm|md|lg|xl}` - Padding inside containers
- `grid.{xs|sm|md|lg|xl}` - Gap between grid items
- `stack.{xs|sm|md|lg|xl}` - Gap between stacked items
- `component.{xs|sm|md|lg|xl}` - Padding inside components

**CSS Variables:**

- `--spacing-{key}` - Base spacing values
- `--spacing-{semantic}` - Semantic spacing tokens
- `--layout-{group}-{size}` - Layout spacing tokens

---

### 2. Typography Tokens (`src/FOUNDATION/tokens/typography.ts`)

**Font Families:**

- `sans` → Inter (primary) + fallbacks
- `satoshi` → Satoshi (optional)
- `display` → Clash Display (headings/hero)
- `serif` → System serif stack
- `mono` → System monospace stack

**Fluid Type Scale (uses clamp()):**

- `xs` → `clamp(0.75rem, 0.7rem + 0.125vw, 0.875rem)`
- `sm` → `clamp(0.875rem, 0.8rem + 0.25vw, 1rem)`
- `base` → `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)`
- `lg` → `clamp(1.125rem, 1rem + 0.5vw, 1.25rem)`
- `xl` → `clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)`
- `2xl` → `clamp(1.5rem, 1.25rem + 1.25vw, 2rem)`
- `3xl` → `clamp(1.875rem, 1.5rem + 1.875vw, 2.5rem)`
- `4xl` → `clamp(2.25rem, 1.75rem + 2.5vw, 3rem)`
- `5xl` → `clamp(3rem, 2rem + 5vw, 4rem)`
- `6xl` → `clamp(3.75rem, 2.5rem + 6.25vw, 5rem)`
- `7xl` → `clamp(4.5rem, 3rem + 7.5vw, 6rem)`
- `8xl` → `clamp(6rem, 4rem + 10vw, 8rem)`
- `9xl` → `clamp(8rem, 5rem + 15vw, 12rem)`

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

- `--font-family-{name}`
- `--font-size-{size}`
- `--font-weight-{weight}`
- `--line-height-{height}`
- `--letter-spacing-{spacing}`

---

### 3. Color Tokens (`src/FOUNDATION/tokens/colors.ts`)

**Color Scales (HSL format):**

- Primary (Midnight Blues): `50` → `950`
- Accent (Purples): `50` → `950`
- Secondary (Refined Cyan): `50` → `950`

**Semantic Colors (Mode-aware):**

**Day Mode:**

- `primary` → Secondary 500
- `accent` → Accent 600
- `background` → White (`0 0% 100%`)
- `foreground` → Almost black (`0 0% 9%`)
- `border` → Light gray (`0 0% 89.8%`)
- `muted` → Muted gray
- `destructive` → Error red

**Night Mode:**

- `primary` → Accent 600
- `accent` → Accent 600
- `background` → Dark (`240 10% 3.9%`)
- `foreground` → Light gray (`0 0% 89.8%`)
- `border` → Dark gray (`240 3.7% 15.9%`)
- `muted` → Muted gray
- `destructive` → Error red

**Surface Colors:**

- `base` → Base surface
- `elevated1-3` → Elevated surfaces
- `overlay` → Overlay surfaces
- `glass` → Glass effect surface

**Text Colors:**

- `primary`, `secondary`, `tertiary`, `muted`, `inverse`

**CSS Variables:**

- `--background`, `--foreground`
- `--primary-{scale}`, `--accent-{scale}`, `--secondary-{scale}`
- `--tm-primary`, `--tm-primary-foreground`
- `--tm-secondary`, `--tm-secondary-foreground`
- `--tm-accent`, `--tm-accent-foreground`
- `--surface-{level}`
- `--text-{type}`
- `--tm-status-{type}`

**Other Color Utilities:**

- `UI_COLORS` (canonical UI color map)

---

### 4. Shadow Tokens (`src/FOUNDATION/tokens/shadows.ts`)

**Elevation Shadows:**

- `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`

**Colored Shadows:**

- `primaryColoredShadows`, `accentColoredShadows`

**Effects:**

- `glowEffects`, `focusRings`

---

### 5. Radius Tokens (`src/FOUNDATION/tokens/radius.ts`)

- `borderRadius` (none → full)
- `componentRadius` (component standards)

---

### 6. Motion Tokens (`src/FOUNDATION/tokens/motion.ts`)

- `motionDurations`, `motionEasings`, `motionTransitions`
- `motionFade`, `motionScale`, `motionSlide`, `motionCombined`
- `motionReducedMotion`, `motionTransitionProperty`

---

## Component Tokens

Component token maps provide standardized styling for components:

- `ALERT_TOKENS`, `BUTTON_TOKENS`, `CARD_TOKENS`, `CHECKBOX_TOKENS`, `DATA_TOKENS`
- `INPUT_TOKENS`, `MENU_TOKENS`, `MOTION_TOKENS`, `NAVIGATION_TOKENS`, `NOTIFICATION_TOKENS`
- `OVERLAY_TOKENS`, `PANEL_TOKENS`, `POPOVER_TOKENS`, `RADIO_TOKENS`, `SECTION_TOKENS`, `SELECT_TOKENS`
- `SURFACE_TOKENS`, `SWITCH_TOKENS`, `TEXT_TOKENS`, `TOAST_TOKENS`, `TOOLTIP_TOKENS`, `ICON_TOKENS`

Additional token groups exported from the main entry point:

- `ARTIST_TOKENS`, `DATA_LIST_TOKENS`, `DOMAIN_TOKENS`, `EMPTY_STATE_TOKENS`, `FILE_UPLOAD_TOKENS`
- `SIMPLETABLE_TOKENS`, `SPINNER_TOKENS`, `TABLE_TOKENS`, `TIMELINE_TOKENS`, `GRADIENT_TOKENS`

---

## Token Utilities & CSS Variable Exports

- `allCSSVariables`, `allCSSVariablesCSS`, `generateCSSVariablesCSS`, `tokenSystemSummary`
- `colorCSSVariables`, `spacingCSSVariables`, `typographyCSSVariables`
- `radiusCSSVariables`, `shadowCSSVariables`, `motionCSSVariables`
- `fontSizeWithMd` (typography scale with `md` alias)

---

## Token Export Entry Points

- `@tenerife.music/ui` (full export surface)
- `@tenerife.music/ui/tokens` (tokens only)

For the full list of exported tokens and types, see `src/FOUNDATION/tokens/index.ts`.
