# Tenerife UI — Structure of Work  
**Version 1.0**  
**Purpose:** This document defines the complete architecture and sequence of work required to build the autonomous, theme-driven Tenerife UI component library.

---

# 1. Overview

Tenerife UI is a fully independent, design-token-driven UI library.  
Главная задача — создать **универсальную библиотеку**, где весь дизайн контролируется через:

- 🎨 Design Tokens  
- 🎛️ Theme Overrides  
- 🧱 Stateless Components  
- 🌗 Theme Provider  
- 📦 Tailwind Config Integration

Ни один компонент НЕ содержит захардкоженных цветов, размеров и теней.  
Всё — через токены.

---

# 2. Work Sequence (High-Level)

Работа выполняется по чёткой цепочке:

1. **Foundation Layer (Tokens + Theme System)**
2. **Core Components Layer (Base UI)**  
3. **Advanced Components Layer (Complex UI blocks)**
4. **Quality Layer (Tests, Storybook, Docs)**
5. **Publishing Layer (Build, Bundles, NPM package)**
6. **Long-Term Evolution Layer (Themes, Customisation API)**

---

# 3. Detailed Sequence of Work (Step–by–Step)

## 3.1 Foundation Layer — MUST BE DONE FIRST

### 3.1.1 Create tokens folder (base structure)
src/
tokens/
colors.ts
typography.ts
spacing.ts
shadows.ts
radius.ts
motion.ts

perl
Copy code

### 3.1.2 Implement all visual systems as tokens

✔ Color palette  
✔ Typography (clamp scale)  
✔ Spacing (8px system)  
✔ Shadows (colored shadows + glow)  
✔ Radius system  
✔ Motion + transitions  
✔ Semantic + component-level tokens

### 3.1.3 Integrate tokens with Tailwind

- Tailwind theme pulls everything from tokens
- No raw values
- Tokens automatically become CSS variables
- Full dark/light theme support
- File: `tailwind.config.js`

### 3.1.4 Build Theme System (critical)

Create:

src/theme/
ThemeProvider.tsx
useTheme.ts
themeUtils.ts

markdown
Copy code

Support:

- Dark + Light themes  
- Additional brand themes  
- Theme switching  
- Automatic token override injection  

### 3.1.5 Theme Overrides (multi-theme support)

Folder:

src/themes/
default.ts
dark.ts
brand.ts

css
Copy code

Each theme overrides only tokens:

```ts
export const darkTheme = {
  colors: { ... },
  shadows: { ... },
};
3.2 Core Components Layer (Base Components)
Все компоненты:

✔ НЕ имеют логики
✔ Чистые, stateless
✔ Принимают только props
✔ Используют токены через Tailwind классы
✔ Имеют одинаковую структуру файлов

3.2.1 Component file structure pattern
css
Copy code
src/components/Button/
  Button.tsx
  button.variants.ts
  Button.stories.tsx
  Button.test.tsx
  index.ts
3.2.2 Components to implement first (strict order)
Button (7 variants, 5 sizes, loading, icons)

Input / FormInput

Select

Textarea

Label

Card

GridLayout

Section

Badge

Avatar

Skeleton

These components create the base design language for more complex ones.

3.3 Advanced Components Layer
После Core Components — можно строить сложные UI блоки:

3.3.1 EventCard
Premium design

Hover lift + glow

Variants (small, medium, large)

Stable responsive layout

3.3.2 VenueCard
Two variants: full, compact

Supports images, overlays, CTA

3.3.3 SearchBar
With icons

Focus glow

Fluid responsiveness

3.3.4 Navigation
Desktop nav

Mobile nav + drawer

Theme awareness

3.3.5 Modal
Glassmorphism

Controlled via props

Accessible

3.3.6 Dropdown
Keyboard navigation

Controlled state from parent

Radix UI optional

3.4 Quality & Delivery Layer
3.4.1 Storybook
Every component has a story

Auto-generated controls

Theme switcher inside Storybook

3.4.2 Testing
Unit tests for all components

Visual regression tests (optional)

3.4.3 A11y compliance
Focus rings

ARIA attributes

Keyboard navigation

3.4.4 Documentation
Every component must have:

Props table

Examples

Variants

Theme override examples

3.5 Publishing Layer
3.5.1 Build system
TS → JS bundling

ES/CJS outputs

CSS extraction

Tree-shaking

3.5.2 NPM package structure
pgsql
Copy code
dist/
  esm/
  cjs/
  types/
3.5.3 Semantic versioning
Every change triggers version bump

CHANGELOG generator

3.6 Long-Term Evolution Layer
Multi-brand theming

Theme marketplace

Auto-code-gen for new components

AI-driven style preview (future)

4. Rules for All Contributors
4.1 Components must NOT contain:
❌ Hardcoded colors
❌ Hardcoded border-radius
❌ Hardcoded spacing
❌ Local shadows
❌ Internal logic

4.2 Components MUST contain:
✔ Tailwind classes referencing tokens
✔ Props for everything configurable
✔ Stateless behavior
✔ Accessible markup

4.3 Commit discipline
Each task = separate PR

Full PR template required

Storybook demo required

No PR passes without visual review

5. Linking This Document in Master Task
MasterTask should reference:

vbnet
Copy code
inputs: ["STRUCTURE_OF_WORK.md", ...]
Each major section in Master Task links to:

Foundation Layer → Section 3.1

Core Components → Section 3.2

Advanced Components → Section 3.3

Quality Layer → Section 3.4

Publishing → Section 3.5

6. Final Notes
This file defines the architecture and ensures that Cursor (и любой разработчик) выполняет работу строго по правильному порядку, не ломая существующую библиотеку, не переписывая всё с нуля, и не придумывая ничего «от себя».