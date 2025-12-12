# TUI Self-Governing Architecture Rules

**Version:** 1.0  
**Date Created:** 2025-12-12  
**Status:** ✅ ACTIVE  
**Layer:** META / ARCHITECTURE GUARD

---

## 📋 Executive Summary

This document establishes permanent self-governing rules for Cursor when working with `@tenerife.music/ui`. These rules enforce a token-driven design system approach using Token Union + Responsive<T> patterns, ensuring type safety, IDE autocompletion, and design consistency across all components.

**Core Philosophy:** All visual and layout properties must use token union types, never raw strings or numbers. This ensures:

- **Type Safety:** TypeScript enforces valid token values
- **IDE Autocomplete:** Developers get suggestions for valid values
- **Design Consistency:** All components use the same design tokens
- **Refactoring Safety:** Token changes propagate automatically

---

## 🎯 Intent and Goals

**Primary Intent:** Make Cursor self-correcting and architecture-aware, so future components and refactors automatically follow the established design system without re-explanation.

**Success Criteria:**

1. ✅ Cursor demonstrates consistent use of token unions in subsequent tasks
2. ✅ No new visual props typed as `string` or `number` are introduced
3. ✅ Future refactors automatically follow the established design system without re-instruction
4. ✅ IntelliSense works for all visual props
5. ✅ Breaking changes are preferred over weakening the design system

---

## 🔒 Enforced Rules

### Rule 1: NO_STRING_VISUAL_PROPS

**Rule:** Public component props MUST NOT use raw `string` or `number` types for any visual, layout, spacing, sizing, color, typography, motion, or elevation values.

**Explanation:** Raw strings and numbers break design consistency and prevent IntelliSense. All visual props must be tokenized.

**Enforcement:** If a visual prop is detected with string/number typing, Cursor must refactor it to a token union type or refuse to proceed.

**Examples:**

```typescript
// ❌ FORBIDDEN - Raw strings break design system
interface ButtonProps {
  padding?: string; // ❌ Must be ResponsiveSpace
  margin?: number; // ❌ Must be ResponsiveSpace
  color?: string; // ❌ Must be ResponsiveColor
  radius?: string; // ❌ Must be ResponsiveRadius
  shadow?: string; // ❌ Must be ResponsiveShadow
}

// ✅ REQUIRED - Token unions ensure consistency
import type {
  ResponsiveSpace,
  ResponsiveColor,
  ResponsiveRadius,
  ResponsiveShadow,
} from "@/tokens/types";

interface ButtonProps {
  padding?: ResponsiveSpace; // ✅ Token union
  margin?: ResponsiveSpace; // ✅ Token union
  bg?: ResponsiveColor; // ✅ Token union
  radius?: ResponsiveRadius; // ✅ Token union
  shadow?: ResponsiveShadow; // ✅ Token union
}
```

**Impact:** This rule ensures that all visual properties are constrained to valid design tokens, preventing arbitrary values and maintaining design consistency.

---

### Rule 2: TOKEN_UNION_ONLY

**Rule:** All visual props MUST use Token Union types, optionally wrapped in Responsive<T>.

**Explanation:** Token unions provide strict API, IDE autocomplete, and design consistency. They are defined in `src/tokens/types/index.ts` and represent valid design token keys.

**Token Union Structure:**

```typescript
// Token unions are defined using keyof typeof pattern
export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  // ... more tokens
} as const;

export type SpaceToken = keyof typeof spacing;
// Result: "0" | "1" | "2" | ...

// Responsive wrapper
export type ResponsiveSpace = Responsive<SpaceToken>;
```

**Examples:**

```typescript
// ✅ GOOD - Token unions with Responsive wrapper
interface ComponentProps {
  padding?: Responsive<SpaceToken>;
  gap?: Responsive<SpacingToken>;
  radius?: Responsive<RadiusToken>;
  bg?: Responsive<ColorToken>;
  fontSize?: Responsive<TextSizeToken>;
}

// ❌ BAD - Raw strings or numbers
interface ComponentProps {
  padding?: string;
  gap?: string | number;
  radius?: string;
  bg?: string;
  fontSize?: string | number;
}
```

**Token Union Types Location:** `src/tokens/types/index.ts`

---

### Rule 3: RESPONSIVE_CANONICAL

**Rule:** `Responsive<T>` is the ONLY allowed responsive typing helper. `ResponsiveValue`, `any`, or ad-hoc responsive types are forbidden.

**Explanation:** `Responsive<T>` is the canonical type defined in `src/types/responsive.ts`. All responsive props must use this type to ensure consistency.

**Canonical Definition:**

```typescript
// src/types/responsive.ts
export type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

export type Responsive<T> =
  | T
  | {
      base?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      "2xl"?: T;
    };
```

**Enforcement:** If `ResponsiveValue` or similar types are encountered, they must be renamed to `Responsive<T>`.

**Examples:**

```typescript
// ✅ GOOD - Canonical Responsive<T>
import type { Responsive } from "@/types/responsive";
import type { SpaceToken } from "@/tokens/types";

interface ComponentProps {
  padding?: Responsive<SpaceToken>;
}

// Usage
<Component padding="md" />
<Component padding={{ base: "sm", md: "lg", xl: "xl" }} />

// ❌ BAD - Ad-hoc or non-canonical types
interface ComponentProps {
  padding?: ResponsiveValue<SpaceToken>;  // ❌ Must be Responsive<T>
  padding?: string | { base?: string; md?: string };  // ❌ Must use Responsive<T>
  padding?: any;  // ❌ Never use any
}
```

**Migration:** If you find `ResponsiveValue` in code, replace it with `Responsive`:

```typescript
// Before
import type { ResponsiveValue } from "@/lib/responsive-props";
padding?: ResponsiveValue<SpaceToken>;

// After
import type { Responsive } from "@/types/responsive";
padding?: Responsive<SpaceToken>;
```

---

### Rule 4: TOKEN_DOMAINS_ONLY

**Rule:** All token union types MUST belong to a defined token domain.

**Token Domains:**

1. **layout** - Layout spacing, container widths, flex basis
   - `LayoutSpaceToken`
   - `ContainerMaxWidthToken`
   - `ContainerPaddingToken`
   - `FlexBasisToken`

2. **space** - Spacing tokens (padding, margin, gap)
   - `SpaceToken` - Base spacing tokens
   - `SpacingToken` - Combined (base + semantic + layout)

3. **surface** - Surface variants
   - `SurfaceToken` - "flat" | "raised" | "sunken" | "outline" | "subtle"

4. **radius** - Border radius tokens
   - `RadiusToken` - Border radius keys

5. **color** - Semantic color tokens
   - `ColorToken` - Semantic colors (background, foreground, primary, etc.)

6. **typography** - Text styling
   - `TextSizeToken` - Font sizes
   - `TextWeightToken` - Font weights
   - `TextLineHeightToken` - Line heights
   - `TextLetterSpacingToken` - Letter spacing

7. **motion** - Animation and transitions
   - `MotionDurationToken` - Animation durations
   - `MotionEasingToken` - Easing functions
   - `MotionTransitionToken` - Transition presets
   - `MotionToken` - Combined motion tokens

8. **z-index** - Elevation and layering
   - `ShadowToken` - Elevation shadows (includes z-index concepts)

**Explanation:** New visual concepts must introduce a new token domain instead of using strings. This ensures all visual properties are part of the design system.

**Enforcement:** If a visual concept doesn't fit existing domains, create a new token domain in `src/tokens/types/index.ts`.

**Example - Creating New Token Domain:**

```typescript
// src/tokens/types/index.ts

// 1. Define token object (in appropriate token file)
export const newVisualTokens = {
  option1: "value1",
  option2: "value2",
  option3: "value3",
} as const;

// 2. Define token union type
export type NewVisualToken = keyof typeof newVisualTokens;

// 3. Define responsive wrapper
export type ResponsiveNewVisual = Responsive<NewVisualToken>;
```

---

### Rule 5: VISUAL_PROP_NAME_DETECTION

**Rule:** Any prop whose name implies visual or layout behavior MUST be treated as visual and tokenized.

**Visual Prop Patterns (MUST be tokenized):**

| Pattern       | Token Type                                          | Example                               |
| ------------- | --------------------------------------------------- | ------------------------------------- |
| `padding*`    | `ResponsiveSpace` or `ResponsiveSpacing`            | `padding`, `paddingX`, `paddingY`     |
| `margin*`     | `ResponsiveSpace` or `ResponsiveSpacing`            | `margin`, `marginTop`, `marginBottom` |
| `gap*`        | `ResponsiveSpace` or `ResponsiveSpacing`            | `gap`, `gapX`, `gapY`                 |
| `width*`      | Token union or `Responsive<ContainerMaxWidthToken>` | `width`, `maxWidth`, `minWidth`       |
| `height*`     | Token union (if applicable)                         | `height`, `maxHeight`, `minHeight`    |
| `size`        | Token union (if applicable)                         | `size`                                |
| `variant`     | Token union (if visual variant)                     | `variant` (if visual)                 |
| `radius*`     | `ResponsiveRadius`                                  | `radius`, `borderRadius`              |
| `shadow*`     | `ResponsiveShadow`                                  | `shadow`, `boxShadow`                 |
| `elevation`   | `ResponsiveShadow` or token union                   | `elevation`                           |
| `color*`      | `ResponsiveColor`                                   | `color`, `textColor`                  |
| `bg*`         | `ResponsiveColor`                                   | `bg`, `backgroundColor`               |
| `background*` | `ResponsiveColor`                                   | `background`, `backgroundImage`       |
| `align*`      | Token union (if applicable)                         | `align`, `alignItems`, `textAlign`    |
| `justify*`    | Token union (if applicable)                         | `justify`, `justifyContent`           |
| `zIndex`      | Token union (if applicable)                         | `zIndex`                              |
| `opacity`     | Token union (if applicable)                         | `opacity`                             |
| `motion*`     | `ResponsiveMotion`                                  | `motion`, `motionDuration`            |
| `animation*`  | `ResponsiveMotion`                                  | `animation`, `animationDuration`      |
| `transition*` | `ResponsiveMotion`                                  | `transition`, `transitionDuration`    |

**Semantic Prop Exclusions (ALLOWED as strings):**

These props are semantic (not visual) and are allowed to use string types:

- `aria-*` - ARIA attributes (accessibility)
- `data-*` - Data attributes (testing/metadata)
- `id` - Element ID
- `role` - ARIA role
- `title` - Title attribute
- `name` - Form field name
- `value` - Form field value
- `href` - Link href
- `target` - Link target
- `rel` - Link rel
- `placeholder` - Input placeholder
- `type` - Input type
- `on*` - Event handlers (onClick, onChange, etc.)

**Enforcement Process:**

1. **Before implementing any component:**
   - Scan all props in the interface
   - Classify each prop as visual or semantic
   - If visual, determine appropriate token union type
   - If semantic, allow string/number types

2. **If unsure:**
   - Assume the prop IS visual and tokenize it
   - Better to over-tokenize than under-tokenize

**Examples:**

```typescript
// ✅ GOOD - Visual props tokenized, semantic props allowed as strings
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  // Visual props - tokenized
  padding?: ResponsiveSpace;
  radius?: ResponsiveRadius;
  bg?: ResponsiveColor;

  // Semantic props - allowed as strings
  id?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  ariaLabel?: string;
  dataTestId?: string;
}

// ❌ BAD - Visual props not tokenized
interface InputProps {
  padding?: string; // ❌ Should be ResponsiveSpace
  radius?: string; // ❌ Should be ResponsiveRadius
  bg?: string; // ❌ Should be ResponsiveColor
}
```

---

### Rule 6: NO_EXPORT_STAR

**Rule:** `export *` is FORBIDDEN in all public entrypoints.

**Explanation:** Explicit exports are required to avoid type leaks and unstable public APIs. `export *` can accidentally expose internal types and break the public API contract.

**Enforcement:** Cursor must replace `export *` with explicit exports.

**Public Entrypoints:**

- `src/index.ts` - Main library export
- `src/components/index.ts` - Component exports
- `src/hooks/index.ts` - Hook exports
- `src/lib/index.ts` - Utility exports
- `src/tokens/index.ts` - Token exports

**Examples:**

```typescript
// ❌ FORBIDDEN - export * leaks internal types
// src/components/index.ts
export * from "./Button";
export * from "./Modal";
export * from "./Card";

// ✅ REQUIRED - Explicit exports only
// src/components/index.ts
export { Button } from "./Button";
export type { ButtonProps } from "./Button";
export { Modal } from "./Modal";
export type { ModalProps } from "./Modal";
export { Card } from "./Card";
export type { CardProps } from "./Card";
```

**Why This Matters:**

1. **Type Safety:** Explicit exports prevent accidental type leaks
2. **API Stability:** Public API is clearly defined
3. **Tree Shaking:** Bundlers can better optimize with explicit exports
4. **Documentation:** Explicit exports serve as API documentation

---

### Rule 7: SINGLE_SOURCE_OF_TRUTH_TOKENS

**Rule:** Token union types must be defined in centralized token files, never inline inside component files.

**Explanation:** This ensures consistency and prevents token drift. All token unions must be defined in `src/tokens/types/index.ts` and imported where needed.

**Token Type Location:** `src/tokens/types/index.ts`

**Enforcement:** If token unions are found inline in component files, move them to `src/tokens/types/index.ts`.

**Examples:**

```typescript
// ❌ FORBIDDEN - Inline token union in component
// src/components/Button/Button.tsx
export interface ButtonProps {
  variant?: "primary" | "secondary" | "outline"; // ❌ Inline union
  size?: "sm" | "md" | "lg"; // ❌ Inline union
}

// ✅ REQUIRED - Centralized token unions
// src/tokens/types/index.ts
export type ButtonVariantToken = "primary" | "secondary" | "outline";
export type ButtonSizeToken = "sm" | "md" | "lg";

// src/components/Button/Button.tsx
import type { ButtonVariantToken, ButtonSizeToken } from "@/tokens/types";

export interface ButtonProps {
  variant?: ButtonVariantToken; // ✅ Centralized token
  size?: ButtonSizeToken; // ✅ Centralized token
}
```

**Benefits:**

1. **Consistency:** All components use the same token definitions
2. **Refactoring:** Token changes propagate automatically
3. **Discoverability:** Developers know where to find token types
4. **Reusability:** Token types can be shared across components

---

### Rule 8: DX_AS_VALIDATION

**Rule:** If IntelliSense (Ctrl+Space) cannot suggest valid values for a visual prop, the API is considered incorrectly designed.

**Explanation:** Developer experience is a validation mechanism. If autocomplete doesn't work, the typing is wrong. This rule ensures that the design system is not just type-safe, but also developer-friendly.

**Enforcement:** Cursor must redesign the prop typing until autocomplete works.

**Validation Checklist:**

- [ ] IntelliSense suggests valid token values when typing prop values
- [ ] Hover shows token union type with all valid options
- [ ] Invalid values show TypeScript errors immediately
- [ ] Responsive objects show correct breakpoint keys (base, sm, md, lg, xl, 2xl)
- [ ] Nested responsive objects work correctly

**Examples:**

```typescript
// ✅ GOOD - IntelliSense works
interface ComponentProps {
  padding?: ResponsiveSpace;
}

// When typing: padding="
// IntelliSense suggests: "0", "1", "2", "sm", "md", "lg", ...

// When typing: padding={{
// IntelliSense suggests: base, sm, md, lg, xl, "2xl"

// ❌ BAD - IntelliSense doesn't work
interface ComponentProps {
  padding?: string; // ❌ No autocomplete, any string allowed
  padding?: any; // ❌ No autocomplete, any value allowed
}
```

**Testing IntelliSense:**

1. Open component in IDE
2. Type prop name and `=`
3. Press Ctrl+Space (or Cmd+Space on Mac)
4. Verify token values are suggested
5. Verify invalid values show TypeScript errors

---

## 🤖 Cursor Behavior Directives

When working with components, Cursor must follow these directives:

### Directive 1: Pre-Implementation Scan

**Before implementing any new component or modifying existing ones:**

1. **Scan Props:** Read all props in the component interface
2. **Classify Props:** Categorize each prop as:
   - **Visual:** Affects appearance, layout, spacing, color, typography, motion
   - **Semantic:** Affects meaning, behavior, accessibility (aria-_, data-_, id, etc.)
3. **Tokenize Visual Props:** For each visual prop:
   - Check if existing token union exists in `src/tokens/types/index.ts`
   - If exists, use it (with `Responsive<T>` wrapper if responsive)
   - If doesn't exist, create new token domain
4. **Allow Semantic Props:** Semantic props can use string/number types

**Example Workflow:**

```typescript
// Step 1: Scan props
interface NewComponentProps {
  padding?: string; // Visual → Must tokenize
  gap?: number; // Visual → Must tokenize
  radius?: string; // Visual → Must tokenize
  id?: string; // Semantic → OK as string
  ariaLabel?: string; // Semantic → OK as string
}

// Step 2: Classify and tokenize
import type { ResponsiveSpace, ResponsiveRadius } from "@/tokens/types";

interface NewComponentProps {
  padding?: ResponsiveSpace; // ✅ Tokenized
  gap?: ResponsiveSpace; // ✅ Tokenized
  radius?: ResponsiveRadius; // ✅ Tokenized
  id?: string; // ✅ Semantic, OK
  ariaLabel?: string; // ✅ Semantic, OK
}
```

### Directive 2: Legacy Pattern Handling

**When encountering legacy patterns:**

1. **Never Silently Accept:** Don't ignore violations, always refactor
2. **Refactor Immediately:** Convert legacy patterns to token unions
3. **Prefer Breaking Changes:** Better to break API than weaken design system
4. **Document Migration:** If breaking change, document migration path

**Example:**

```typescript
// Legacy pattern found
interface LegacyComponentProps {
  padding?: string; // ❌ Violates rules
}

// Refactor immediately
interface LegacyComponentProps {
  padding?: ResponsiveSpace; // ✅ Compliant
}

// If this breaks existing code, that's acceptable
// Document migration: padding="md" → padding="md" (same value, different type)
```

### Directive 3: New Visual Concept Creation

**When creating new visual concepts:**

1. **Create Token Domain:** Add to `src/tokens/types/index.ts`
2. **Define Token Object:** Create token object in appropriate token file
3. **Export Token Union:** Export token union type
4. **Create Responsive Wrapper:** If responsive behavior needed, create `Responsive<T>` wrapper
5. **Update Exports:** Export from `src/tokens/index.ts`

**Example:**

```typescript
// Step 1: Define token object
// src/tokens/blur.ts
export const blurEffects = {
  none: "none",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
} as const;

// Step 2: Define token union
// src/tokens/types/index.ts
import type { blurEffects } from "../blur";

export type BlurToken = keyof typeof blurEffects;
export type ResponsiveBlur = Responsive<BlurToken>;

// Step 3: Export from main tokens file
// src/tokens/index.ts
export type { BlurToken, ResponsiveBlur } from "./types";
```

### Directive 4: Code Review Checklist

**When reviewing code, verify:**

- [ ] All visual props use token unions
- [ ] All responsive props use `Responsive<T>` (not `ResponsiveValue`)
- [ ] No raw `string` or `number` types for visual props
- [ ] Token unions defined in `src/tokens/types/index.ts`
- [ ] No `export *` in public entrypoints
- [ ] IntelliSense works for all visual props
- [ ] Semantic props correctly excluded from tokenization
- [ ] TypeScript compilation passes
- [ ] No type errors or warnings

---

## 📚 Token Domain Reference

### Spacing Tokens

**Location:** `src/tokens/types/index.ts`

```typescript
import type { ResponsiveSpace, ResponsiveSpacing } from "@/tokens/types";

// SpaceToken - Base spacing tokens (0, 1, 2, sm, md, lg, ...)
padding?: ResponsiveSpace;
margin?: ResponsiveSpace;

// SpacingToken - Combined (base + semantic + layout)
gap?: ResponsiveSpacing;
```

**Usage:**

```typescript
// Single value
<Component padding="md" />

// Responsive object
<Component padding={{ base: "sm", md: "lg", xl: "xl" }} />
```

### Radius Tokens

**Location:** `src/tokens/types/index.ts`

```typescript
import type { ResponsiveRadius } from "@/tokens/types";

radius?: ResponsiveRadius;
borderRadius?: ResponsiveRadius;
```

**Usage:**

```typescript
<Component radius="md" />
<Component radius={{ base: "sm", md: "lg" }} />
```

### Shadow Tokens

**Location:** `src/tokens/types/index.ts`

```typescript
import type { ResponsiveShadow } from "@/tokens/types";

shadow?: ResponsiveShadow;
elevation?: ResponsiveShadow;
```

**Usage:**

```typescript
<Component shadow="md" />
<Component elevation={{ base: "sm", md: "lg" }} />
```

### Color Tokens

**Location:** `src/tokens/types/index.ts`

```typescript
import type { ResponsiveColor } from "@/tokens/types";

bg?: ResponsiveColor;
color?: ResponsiveColor;
background?: ResponsiveColor;
```

**Usage:**

```typescript
<Component bg="primary" />
<Component color={{ base: "foreground", md: "muted" }} />
```

### Surface Tokens

**Location:** `src/tokens/types/index.ts`

```typescript
import type { ResponsiveSurface } from "@/tokens/types";

surface?: ResponsiveSurface;
variant?: ResponsiveSurface;
```

**Usage:**

```typescript
<Component surface="raised" />
<Component variant={{ base: "flat", md: "raised" }} />
```

### Typography Tokens

**Location:** `src/tokens/types/index.ts`

```typescript
import type {
  ResponsiveTextSize,
  ResponsiveTextWeight,
  ResponsiveTextLineHeight,
} from "@/tokens/types";

fontSize?: ResponsiveTextSize;
fontWeight?: ResponsiveTextWeight;
lineHeight?: ResponsiveTextLineHeight;
```

**Usage:**

```typescript
<Component fontSize="lg" />
<Component fontWeight={{ base: "normal", md: "bold" }} />
```

### Motion Tokens

**Location:** `src/tokens/types/index.ts`

```typescript
import type { ResponsiveMotion } from "@/tokens/types";

transition?: ResponsiveMotion;
animation?: ResponsiveMotion;
duration?: ResponsiveMotion;
```

**Usage:**

```typescript
<Component transition="fast" />
<Component duration={{ base: "fast", md: "slow" }} />
```

### Layout Tokens

**Location:** `src/tokens/types/index.ts`

```typescript
import type {
  ResponsiveContainerMaxWidth,
  ResponsiveContainerPadding,
  ResponsiveFlexBasis,
} from "@/tokens/types";

maxWidth?: ResponsiveContainerMaxWidth;
containerPadding?: ResponsiveContainerPadding;
flexBasis?: ResponsiveFlexBasis;
```

**Usage:**

```typescript
<Component maxWidth="lg" />
<Component containerPadding={{ base: "sm", md: "lg" }} />
```

---

## ✅ Correct Patterns

### Component Implementation

```typescript
import type {
  ResponsiveSpace,
  ResponsiveRadius,
  ResponsiveColor,
  ResponsiveShadow,
} from "@/tokens/types";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Visual props - tokenized
  padding?: ResponsiveSpace;
  radius?: ResponsiveRadius;
  bg?: ResponsiveColor;
  gap?: ResponsiveSpace;
  shadow?: ResponsiveShadow;

  // Semantic props - allowed as strings
  id?: string;
  ariaLabel?: string;
  dataTestId?: string;
}

export const Card: React.FC<CardProps> = ({ padding, radius, bg, gap, shadow, ...rest }) => {
  // Implementation using token values
  // ...
};
```

### Responsive Usage

```typescript
// Single value
<Card padding="md" radius="lg" bg="primary" />

// Responsive object
<Card
  padding={{ base: "sm", md: "lg", xl: "xl" }}
  radius={{ base: "sm", md: "lg" }}
  bg={{ base: "background", md: "card" }}
/>

// Mixed (some responsive, some single)
<Card
  padding="md"
  radius={{ base: "sm", md: "lg" }}
  bg="primary"
/>
```

### Token Domain Creation

```typescript
// Step 1: Define token object
// src/tokens/new-visual.ts
export const newVisualTokens = {
  option1: "value1",
  option2: "value2",
  option3: "value3",
} as const;

// Step 2: Define token union
// src/tokens/types/index.ts
import type { newVisualTokens } from "../new-visual";
import type { Responsive } from "@/types/responsive";

export type NewVisualToken = keyof typeof newVisualTokens;
export type ResponsiveNewVisual = Responsive<NewVisualToken>;

// Step 3: Export from main tokens file
// src/tokens/index.ts
export type { NewVisualToken, ResponsiveNewVisual } from "./types";

// Step 4: Use in components
import type { ResponsiveNewVisual } from "@/tokens/types";

interface ComponentProps {
  newVisual?: ResponsiveNewVisual;
}
```

---

## ❌ Forbidden Patterns

### Raw String/Number Props

```typescript
// ❌ FORBIDDEN
interface ComponentProps {
  padding?: string;
  margin?: number;
  color?: string;
  radius?: string | number;
}
```

### Ad-hoc Responsive Types

```typescript
// ❌ FORBIDDEN
type MyResponsive = string | { base?: string; md?: string };
padding?: MyResponsive;

// ❌ FORBIDDEN
padding?: string | { [key: string]: string };
```

### Inline Token Unions

```typescript
// ❌ FORBIDDEN
interface ComponentProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}
```

### Export Star

```typescript
// ❌ FORBIDDEN
export * from "./components";
export * from "./hooks";
```

### Using ResponsiveValue Instead of Responsive

```typescript
// ❌ FORBIDDEN
import type { ResponsiveValue } from "@/lib/responsive-props";
padding?: ResponsiveValue<SpaceToken>;

// ✅ REQUIRED
import type { Responsive } from "@/types/responsive";
padding?: Responsive<SpaceToken>;
```

---

## 🔍 Enforcement Checklist

Before marking any component as complete, verify:

- [ ] All visual props use token union types
- [ ] All responsive props use `Responsive<T>` (not `ResponsiveValue`)
- [ ] No raw `string` or `number` types for visual props
- [ ] Token unions defined in `src/tokens/types/index.ts`
- [ ] No `export *` in public entrypoints
- [ ] IntelliSense works for all visual props
- [ ] All semantic props (aria-_, data-_, id, etc.) are correctly excluded
- [ ] TypeScript compilation passes
- [ ] No type errors or warnings
- [ ] Component follows established patterns

---

## 🚫 What NOT to Do

- ❌ **NEVER** use raw `string` or `number` for visual props
- ❌ **NEVER** use `ResponsiveValue` or ad-hoc responsive types
- ❌ **NEVER** define token unions inline in component files
- ❌ **NEVER** use `export *` in public entrypoints
- ❌ **NEVER** silently accept legacy patterns
- ❌ **NEVER** weaken the design system for convenience
- ❌ **NEVER** skip tokenization for "simple" props
- ❌ **NEVER** use `any` type for visual props
- ❌ **NEVER** create duplicate token definitions

---

## ✅ What TO Do

- ✅ **ALWAYS** use token union types for visual props
- ✅ **ALWAYS** use `Responsive<T>` for responsive props
- ✅ **ALWAYS** define token unions in `src/tokens/types/index.ts`
- ✅ **ALWAYS** use explicit exports in public entrypoints
- ✅ **ALWAYS** refactor legacy patterns to token unions
- ✅ **ALWAYS** prefer breaking changes over weakening the design system
- ✅ **ALWAYS** validate IntelliSense works for visual props
- ✅ **ALWAYS** classify props as visual or semantic before implementation
- ✅ **ALWAYS** create new token domains for new visual concepts
- ✅ **ALWAYS** test TypeScript compilation after changes

---

## 📋 Success Criteria

Cursor demonstrates consistent use of token unions in subsequent tasks when:

- ✅ No new visual props typed as `string` or `number` are introduced
- ✅ All responsive props use `Responsive<T>` (canonical type)
- ✅ All token unions are defined in centralized location
- ✅ No `export *` in public entrypoints
- ✅ IntelliSense works for all visual props
- ✅ Future refactors automatically follow the established design system without re-instruction
- ✅ Breaking changes are preferred over weakening the design system
- ✅ All components pass the enforcement checklist

---

## 📖 Additional Resources

- **Token Types:** `src/tokens/types/index.ts`
- **Responsive Types:** `src/types/responsive.ts`
- **Token Refactor Report:** `docs/reports/TUI_TOKEN_UNION_REFACTOR_REPORT.md`
- **Typing Standard:** `docs/structure/TYPING_STANDARD.md`

---

**Status:** ✅ ACTIVE  
**Version:** 1.0  
**Last Updated:** 2025-12-12
