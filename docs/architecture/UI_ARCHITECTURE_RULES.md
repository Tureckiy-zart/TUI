# UI Architecture Rules: Radix UI and Token Union Canon

**Version:** 1.0  
**Date Created:** 2025-12-12  
**Status:** ✅ ACTIVE  
**Layer:** ARCHITECTURE / GOVERNANCE  
**Priority:** CRITICAL

---

## 📋 Executive Summary

This document establishes **non-negotiable architectural rules** governing the usage of Radix UI, shadcn/ui patterns, and Token Union-based public APIs in `@tenerife.music/ui`. These rules prevent architectural drift and ensure a clear separation between:

- **Radix UI**: Internal-only behavioral layer (accessibility, state management, keyboard navigation)
- **Tenerife UI**: Public visual API layer (tokens, design system, visual properties)

**Core Principle:** Radix provides behavior; Tenerife UI provides visual design. These layers must never mix in the public API.

---

## 🎯 Design System Architecture Overview

### Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│                    PUBLIC API LAYER                      │
│          (Tenerife UI - Token-Based Types)               │
│  - Responsive<SpacingToken>, Responsive<ColorToken>     │
│  - All visual props use token unions                    │
│  - IntelliSense-suggestable values only                 │
└─────────────────────────────────────────────────────────┘
                          │
                          │ implements
                          ▼
┌─────────────────────────────────────────────────────────┐
│                 INTERNAL IMPLEMENTATION                  │
│            (Radix UI - Behavior Layer)                   │
│  - Focus management, keyboard navigation                 │
│  - ARIA attributes, accessibility contracts             │
│  - Controlled/uncontrolled state                        │
│  - Portal rendering, positioning logic                  │
└─────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

| Layer                     | Responsibility                                    | Example                                 |
| ------------------------- | ------------------------------------------------- | --------------------------------------- |
| **Public API**            | Visual design tokens, spacing, colors, typography | `padding?: Responsive<SpacingToken>`    |
| **Radix UI**              | Behavior, accessibility, state management         | `PopoverPrimitive.Root`, `onOpenChange` |
| **Implementation Bridge** | Converts tokens to Radix-compatible values        | `getSpacingPx(token)` → `sideOffset`    |

---

## 🔒 Radix UI Role and Boundaries

### Rule 1: RADIX_IS_INTERNAL_ONLY

**Rule:** Radix UI primitives and props are **FORBIDDEN** in the public API. Radix is used strictly as an internal behavioral and accessibility layer.

**Enforcement:** Radix primitives, types, and props MUST NOT appear in:

- Public component Props interfaces
- Exported types
- Public documentation
- Storybook component APIs

### Radix UI: ALLOWED Usage (Internal Only)

Radix UI is **ALLOWED** and **REQUIRED** for:

1. **Focus Management**
   - Managing focus traps
   - Focus restoration on unmount
   - Focus delegation

2. **Keyboard Navigation**
   - Arrow key navigation
   - Escape key handling
   - Tab order management

3. **ARIA Attributes**
   - Automatic ARIA attribute generation
   - ARIA state synchronization
   - Screen reader announcements

4. **Controlled/Uncontrolled State**
   - State management (`open`, `value`, `checked`)
   - Event handlers (`onOpenChange`, `onValueChange`)
   - State synchronization

5. **Accessibility Contracts**
   - Dialog focus traps
   - Popover collision detection
   - Menu keyboard navigation

6. **Behavioral Props (Internal Only)**
   - `open`, `onOpenChange` (state control)
   - `defaultOpen` (uncontrolled state)
   - `modal`, `collisionPadding` (behavioral configuration)
   - `onEscapeKeyDown`, `onPointerDownOutside` (event handlers)

### Radix UI: FORBIDDEN Usage (Public API)

Radix UI is **FORBIDDEN** in public APIs for:

1. **Visual/Design Props**
   - ❌ `sideOffset?: number` (Radix prop)
   - ✅ `sideOffset?: Responsive<SpacingToken>` (Token-based)
   - ❌ `alignOffset?: number` (Radix prop)
   - ✅ `alignOffset?: Responsive<SpacingToken>` (Token-based)

2. **Direct Radix Primitive Exposure**
   - ❌ `export { PopoverPrimitive }`
   - ❌ `export type PopoverProps = React.ComponentProps<typeof PopoverPrimitive.Content>`
   - ✅ Export only Tenerife UI wrappers

3. **Raw Radix Types in Public API**
   - ❌ `import type * as PopoverPrimitive from "@radix-ui/react-popover"`
   - ❌ Extending Radix types directly: `extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>`
   - ✅ Use token-based types: `extends { sideOffset?: Responsive<SpacingToken> }`

4. **Passing Raw Visual Values Through Radix**
   - ❌ `<PopoverPrimitive.Content sideOffset={4} />` (hardcoded number)
   - ❌ `<PopoverPrimitive.Content sideOffset={props.sideOffset} />` (if prop is `number`)
   - ✅ Convert tokens first: `<PopoverPrimitive.Content sideOffset={getSpacingPx(token)} />`

### Implementation Pattern: Token-to-Radix Conversion

**ALWAYS** convert tokens to Radix-compatible values in implementation:

```typescript
// ✅ CORRECT - Token in public API, conversion in implementation
export interface PopoverContentProps {
  /**
   * Offset between trigger and content - token-based
   */
  sideOffset?: Responsive<SpacingToken>; // ✅ Token union in public API
}

export const PopoverContent: React.FC<PopoverContentProps> = ({
  sideOffset,
  ...props
}) => {
  // Convert token to pixels for Radix
  const sideOffsetPx = React.useMemo(() => {
    const baseOffset = getBaseValue(sideOffset);
    return baseOffset ? getSpacingPx(baseOffset) : 4; // Default 4px
  }, [sideOffset]);

  return (
    <PopoverPrimitive.Content
      sideOffset={sideOffsetPx} // ✅ Converted value passed to Radix
      {...props}
    />
  );
};
```

```typescript
// ❌ FORBIDDEN - Raw number or Radix type in public API
export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  // ❌ This exposes Radix props directly (sideOffset: number)
}

// ❌ FORBIDDEN - Raw visual value in public API
export interface PopoverContentProps {
  sideOffset?: number; // ❌ Raw number, not token-based
}
```

---

## 🎨 Token Domains and Visual API Rules

### Rule 2: TOKEN_UNION_ONLY

**Rule:** All public visual and layout props **MUST** use Token Union types, optionally wrapped in `Responsive<T>`.

**Mandatory Pattern:** `prop?: TokenUnion | Responsive<TokenUnion>`

### Token Union Types

All token union types are defined in `src/tokens/types/index.ts`:

```typescript
// Token union definitions
export type SpacingToken = SpaceToken | LayoutSpaceToken;
export type RadiusToken = keyof typeof borderRadius;
export type ShadowToken = keyof typeof elevationShadows | ...;
export type ColorToken = "background" | "foreground" | "primary" | ...;
export type TextSizeToken = keyof typeof fontSize;
export type MotionDurationToken = keyof typeof durations;

// Responsive wrappers
export type ResponsiveSpace = Responsive<SpacingToken>;
export type ResponsiveRadius = Responsive<RadiusToken>;
export type ResponsiveShadow = Responsive<ShadowToken>;
export type ResponsiveColor = Responsive<ColorToken>;
export type ResponsiveTextSize = Responsive<TextSizeToken>;
```

### Forbidden Types for Visual Props

The following types are **FORBIDDEN** for any visual or layout prop:

- ❌ `string` - Use token union instead
- ❌ `number` - Use token union instead
- ❌ `string | number` - Use token union instead
- ❌ `any` - Never allowed
- ❌ `unknown` - Too permissive

### Allowed Exceptions (Non-Visual Props)

The following props are **ALLOWED** to use `string` or other non-token types:

- `aria-*` - ARIA attributes (accessibility)
- `data-*` - Data attributes (testing/metadata)
- `id` - Element ID
- `role` - ARIA role
- `title` - Title attribute
- `name` - Form field name
- `value` - Form field value (non-visual)
- `href` - Link href
- `target` - Link target
- `rel` - Link rel
- `placeholder` - Input placeholder text
- `type` - Input type
- `on*` - Event handlers (onClick, onChange, etc.)
- Behavioral state props: `open`, `defaultOpen`, `onOpenChange` (from Radix, but acceptable as they're behavioral)

### Visual Prop Detection Patterns

Any prop matching these patterns **MUST** be tokenized:

| Pattern       | Token Type                                          | Example                           |
| ------------- | --------------------------------------------------- | --------------------------------- |
| `padding*`    | `Responsive<SpacingToken>`                          | `padding`, `paddingX`, `paddingY` |
| `margin*`     | `Responsive<SpacingToken>`                          | `margin`, `marginTop`             |
| `gap*`        | `Responsive<SpacingToken>`                          | `gap`, `gapX`, `gapY`             |
| `width*`      | `Responsive<ContainerMaxWidthToken>` or token union | `width`, `maxWidth`               |
| `height*`     | Token union (if applicable)                         | `height`, `maxHeight`             |
| `size`        | Token union                                         | `size`                            |
| `variant`     | Token union (if visual)                             | `variant`                         |
| `radius*`     | `Responsive<RadiusToken>`                           | `radius`, `borderRadius`          |
| `shadow*`     | `Responsive<ShadowToken>`                           | `shadow`, `boxShadow`             |
| `elevation`   | `Responsive<ShadowToken>`                           | `elevation`                       |
| `color*`      | `Responsive<ColorToken>`                            | `color`, `textColor`              |
| `bg*`         | `Responsive<ColorToken>`                            | `bg`, `backgroundColor`           |
| `background*` | `Responsive<ColorToken>`                            | `background`                      |
| `align*`      | Token union (if applicable)                         | `align`, `alignItems`             |
| `offset*`     | `Responsive<SpacingToken>`                          | `sideOffset`, `alignOffset`       |

### Correct Visual Prop Typing Examples

```typescript
// ✅ CORRECT - Token unions for all visual props
import type {
  ResponsiveSpace,
  ResponsiveRadius,
  ResponsiveColor,
  ResponsiveShadow,
  ResponsiveAlignOffset,
  ResponsiveSideOffset,
} from "@/tokens/types";

export interface CardProps {
  // Visual props - tokenized
  padding?: ResponsiveSpace;
  margin?: ResponsiveSpace;
  gap?: ResponsiveSpace;
  radius?: ResponsiveRadius;
  bg?: ResponsiveColor;
  shadow?: ResponsiveShadow;
  sideOffset?: ResponsiveSideOffset;
  alignOffset?: ResponsiveAlignOffset;

  // Non-visual props - allowed as strings
  id?: string;
  ariaLabel?: string;
  dataTestId?: string;
  onOpenChange?: (open: boolean) => void; // Behavioral prop
}
```

```typescript
// ❌ FORBIDDEN - Raw strings or numbers for visual props
export interface CardProps {
  padding?: string; // ❌ Must be ResponsiveSpace
  margin?: number; // ❌ Must be ResponsiveSpace
  gap?: string | number; // ❌ Must be ResponsiveSpace
  radius?: string; // ❌ Must be ResponsiveRadius
  bg?: string; // ❌ Must be ResponsiveColor
  sideOffset?: number; // ❌ Must be ResponsiveSideOffset (Responsive<SpacingToken>)
}
```

---

## 📐 Responsive System Canon

### Rule 3: RESPONSIVE_CANONICAL

**Rule:** `Responsive<T>` is the **ONLY** allowed responsive typing helper. All other responsive type patterns are **FORBIDDEN**.

### Canonical Responsive Type Definition

**Location:** `src/types/responsive.ts`

```typescript
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

### Forbidden Responsive Types

The following responsive type patterns are **FORBIDDEN**:

- ❌ `ResponsiveValue<T>` - Use `Responsive<T>` instead
- ❌ `string | { base?: string; md?: string }` - Ad-hoc responsive types
- ❌ `string | Record<string, string>` - Unstructured responsive objects
- ❌ Component-specific responsive types (e.g., `ButtonResponsivePadding`)

### Correct Responsive Usage

```typescript
// ✅ CORRECT - Canonical Responsive<T>
import type { Responsive } from "@/types/responsive";
import type { SpacingToken } from "@/tokens/types";

export interface ComponentProps {
  padding?: Responsive<SpacingToken>; // ✅ Canonical type
}

// Usage
<Component padding="md" /> {/* Single value */}
<Component padding={{ base: "sm", md: "lg", xl: "xl" }} /> {/* Responsive object */}
```

```typescript
// ❌ FORBIDDEN - Non-canonical responsive types
import type { ResponsiveValue } from "@/lib/responsive-props"; // ❌ Old type

export interface ComponentProps {
  padding?: ResponsiveValue<SpacingToken>; // ❌ Must be Responsive<T>
  padding?: string | { base?: string; md?: string }; // ❌ Ad-hoc type
}
```

### Responsive Utility Functions

**Location:** `src/lib/responsive-props.ts`

Standard utility functions for working with `Responsive<T>`:

```typescript
// Get base value from responsive value
function getBaseValue<T>(value: Responsive<T> | undefined): T | undefined;

// Check if value is responsive object
function isResponsiveValue<T>(value: Responsive<T>): value is Exclude<Responsive<T>, T>;

// Convert token to pixels (for Radix compatibility)
function getSpacingPx(token: SpacingToken): number;
```

---

## 🚫 Forbidden Patterns

### Pattern 1: Exposing Radix Props in Public API

```typescript
// ❌ FORBIDDEN - Radix props exposed in public API
export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  // This exposes Radix props like sideOffset: number
}

// ✅ CORRECT - Token-based public API
export interface PopoverContentProps {
  sideOffset?: Responsive<SpacingToken>; // Token union
  alignOffset?: Responsive<SpacingToken>; // Token union
}
```

### Pattern 2: Raw Visual Values in Public API

```typescript
// ❌ FORBIDDEN - Raw numbers for visual props
export interface PopoverContentProps {
  sideOffset?: number; // ❌ Must be token-based
}

// ✅ CORRECT - Token union
export interface PopoverContentProps {
  sideOffset?: Responsive<SpacingToken>; // ✅ Token-based
}
```

### Pattern 3: Direct Radix Primitive Exports

```typescript
// ❌ FORBIDDEN - Exporting Radix primitives
export { PopoverPrimitive } from "@radix-ui/react-popover";

// ✅ CORRECT - Export only Tenerife UI wrappers
export { Popover, PopoverContent, PopoverTrigger } from "./Popover";
```

### Pattern 4: String/Number Types for Visual Props

```typescript
// ❌ FORBIDDEN - Raw string/number for visual props
export interface ButtonProps {
  padding?: string;
  margin?: number;
  color?: string;
  radius?: string;
}

// ✅ CORRECT - Token unions
import type { ResponsiveSpace, ResponsiveRadius, ResponsiveColor } from "@/tokens/types";

export interface ButtonProps {
  padding?: ResponsiveSpace;
  margin?: ResponsiveSpace;
  color?: ResponsiveColor;
  radius?: ResponsiveRadius;
}
```

### Pattern 5: Non-Canonical Responsive Types

```typescript
// ❌ FORBIDDEN - Ad-hoc responsive types
export interface ComponentProps {
  padding?: string | { base?: string; md?: string };
  padding?: ResponsiveValue<SpacingToken>; // Old type name
}

// ✅ CORRECT - Canonical Responsive<T>
import type { Responsive } from "@/types/responsive";
import type { SpacingToken } from "@/tokens/types";

export interface ComponentProps {
  padding?: Responsive<SpacingToken>;
}
```

### Pattern 6: Passing Raw Values to Radix

```typescript
// ❌ FORBIDDEN - Passing raw values directly to Radix
export const PopoverContent: React.FC<{ sideOffset?: number }> = ({
  sideOffset = 4,
}) => {
  return <PopoverPrimitive.Content sideOffset={sideOffset} />;
};

// ✅ CORRECT - Token in API, conversion in implementation
export const PopoverContent: React.FC<{ sideOffset?: Responsive<SpacingToken> }> = ({
  sideOffset,
}) => {
  const sideOffsetPx = React.useMemo(() => {
    const baseOffset = getBaseValue(sideOffset);
    return baseOffset ? getSpacingPx(baseOffset) : 4;
  }, [sideOffset]);

  return <PopoverPrimitive.Content sideOffset={sideOffsetPx} />;
};
```

---

## ✅ Examples: Correct vs Incorrect

### Example 1: Popover Component

```typescript
// ✅ CORRECT - Token-based public API, Radix used internally
import type { ResponsiveSideOffset, ResponsiveAlignOffset } from "@/tokens/types";
import { getBaseValue, getSpacingPx } from "@/lib/responsive-props";
import * as PopoverPrimitive from "@radix-ui/react-popover";

export interface PopoverContentProps {
  // Token-based visual props
  sideOffset?: ResponsiveSideOffset; // Responsive<SpacingToken>
  alignOffset?: ResponsiveAlignOffset; // Responsive<SpacingToken>

  // Behavioral props (from Radix, but acceptable as they're behavioral)
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  // Non-visual props
  id?: string;
  ariaLabel?: string;
}

export const PopoverContent: React.FC<PopoverContentProps> = ({
  sideOffset,
  alignOffset,
  ...props
}) => {
  // Convert tokens to pixels for Radix
  const sideOffsetPx = React.useMemo(() => {
    const baseOffset = getBaseValue(sideOffset);
    return baseOffset ? getSpacingPx(baseOffset) : 4;
  }, [sideOffset]);

  const alignOffsetPx = React.useMemo(() => {
    const baseOffset = getBaseValue(alignOffset);
    return baseOffset ? getSpacingPx(baseOffset) : undefined;
  }, [alignOffset]);

  // Radix used internally only
  return (
    <PopoverPrimitive.Content
      sideOffset={sideOffsetPx}
      alignOffset={alignOffsetPx}
      {...props}
    />
  );
};
```

```typescript
// ❌ INCORRECT - Radix props exposed in public API
import * as PopoverPrimitive from "@radix-ui/react-popover";

export interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  // ❌ This exposes Radix props like sideOffset: number
}

export const PopoverContent: React.FC<PopoverContentProps> = (props) => {
  return <PopoverPrimitive.Content {...props} />;
};
```

### Example 2: Button Component

```typescript
// ✅ CORRECT - Token unions for all visual props
import type {
  ResponsiveSpace,
  ResponsiveRadius,
  ResponsiveColor,
  ResponsiveShadow,
} from "@/tokens/types";

export interface ButtonProps {
  // Visual props - tokenized
  padding?: ResponsiveSpace;
  radius?: ResponsiveRadius;
  bg?: ResponsiveColor;
  shadow?: ResponsiveShadow;

  // Non-visual props
  id?: string;
  ariaLabel?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
```

```typescript
// ❌ INCORRECT - Raw strings for visual props
export interface ButtonProps {
  padding?: string; // ❌ Must be ResponsiveSpace
  radius?: string; // ❌ Must be ResponsiveRadius
  bg?: string; // ❌ Must be ResponsiveColor
  shadow?: string; // ❌ Must be ResponsiveShadow
}
```

### Example 3: Container Component

```typescript
// ✅ CORRECT - Responsive with canonical type
import type { Responsive } from "@/types/responsive";
import type { ContainerMaxWidthToken, SpacingToken } from "@/tokens/types";

export interface ContainerProps {
  maxWidth?: Responsive<ContainerMaxWidthToken>;
  padding?: Responsive<SpacingToken>;
}

// Usage
<Container maxWidth={{ base: "sm", md: "lg", xl: "xl" }} />
```

```typescript
// ❌ INCORRECT - Ad-hoc responsive type
export interface ContainerProps {
  maxWidth?: string | { base?: string; md?: string }; // ❌ Must use Responsive<T>
  padding?: ResponsiveValue<SpacingToken>; // ❌ Old type name
}
```

---

## 🔍 IntelliSense Validation

### Rule 4: DX_AS_VALIDATION

**Rule:** If IntelliSense (Ctrl+Space / Cmd+Space) cannot suggest valid values for a visual prop, the API is **incorrectly designed**.

### Validation Checklist

Before marking a component as complete, verify:

- [ ] IntelliSense suggests valid token values when typing prop values
- [ ] Hover shows token union type with all valid options
- [ ] Invalid values show TypeScript errors immediately
- [ ] Responsive objects show correct breakpoint keys (base, sm, md, lg, xl, 2xl)
- [ ] TypeScript compilation passes with no errors

### Testing IntelliSense

1. Open component in IDE
2. Type prop name and `=`
3. Press Ctrl+Space (or Cmd+Space on Mac)
4. Verify token values are suggested
5. Verify invalid values show TypeScript errors

### Example: IntelliSense Working

```typescript
// ✅ GOOD - IntelliSense works
export interface ComponentProps {
  padding?: Responsive<SpacingToken>;
}

// When typing: padding="
// IntelliSense suggests: "0", "1", "2", "sm", "md", "lg", "xl", ...

// When typing: padding={{
// IntelliSense suggests: base, sm, md, lg, xl, "2xl"
```

```typescript
// ❌ BAD - IntelliSense doesn't work
export interface ComponentProps {
  padding?: string; // ❌ No autocomplete, any string allowed
  padding?: any; // ❌ No autocomplete, any value allowed
}
```

---

## 📚 Implementation Guidelines

### Component Implementation Pattern

**ALWAYS** follow this pattern when using Radix UI:

1. **Define public API with token unions**

   ```typescript
   export interface ComponentProps {
     visualProp?: Responsive<TokenUnion>;
     // ... other props
   }
   ```

2. **Use Radix internally for behavior**

   ```typescript
   import * as RadixPrimitive from "@radix-ui/react-primitive";
   ```

3. **Convert tokens to Radix-compatible values**

   ```typescript
   const radixValue = React.useMemo(() => {
     const base = getBaseValue(tokenProp);
     return base ? convertTokenToRadixValue(base) : defaultValue;
   }, [tokenProp]);
   ```

4. **Pass converted values to Radix**
   ```typescript
   return <RadixPrimitive.Content radixProp={radixValue} />;
   ```

### Component Export Pattern

**ALWAYS** export only Tenerife UI wrappers:

```typescript
// ✅ CORRECT - Export Tenerife UI components
export { Popover, PopoverContent, PopoverTrigger } from "./Popover";
export type { PopoverContentProps } from "./Popover";

// ❌ FORBIDDEN - Export Radix primitives
export { PopoverPrimitive } from "@radix-ui/react-popover";
```

---

## ✅ Component Completion Checklist

Before marking a component as complete, verify:

- [ ] All visual props use token union types (no `string` or `number`)
- [ ] All responsive props use `Responsive<T>` (canonical type)
- [ ] Radix primitives are used internally only (not in public API)
- [ ] Radix props are converted from tokens in implementation
- [ ] No Radix types appear in public Props interfaces
- [ ] IntelliSense works for all visual props
- [ ] TypeScript compilation passes with no errors
- [ ] All token unions are defined in `src/tokens/types/index.ts`
- [ ] Component follows established patterns from examples

---

## 🚫 What NOT to Do

- ❌ **NEVER** expose Radix props in public API
- ❌ **NEVER** use raw `string` or `number` for visual props
- ❌ **NEVER** export Radix primitives directly
- ❌ **NEVER** use non-canonical responsive types (`ResponsiveValue`, ad-hoc types)
- ❌ **NEVER** pass raw visual values directly to Radix
- ❌ **NEVER** weaken the design system for convenience
- ❌ **NEVER** skip tokenization for "simple" props
- ❌ **NEVER** use `any` type for visual props

---

## ✅ What TO Do

- ✅ **ALWAYS** use token union types for visual props
- ✅ **ALWAYS** use `Responsive<T>` for responsive props
- ✅ **ALWAYS** use Radix internally for behavior only
- ✅ **ALWAYS** convert tokens to Radix-compatible values
- ✅ **ALWAYS** define token unions in `src/tokens/types/index.ts`
- ✅ **ALWAYS** validate IntelliSense works for visual props
- ✅ **ALWAYS** export only Tenerife UI wrappers
- ✅ **ALWAYS** prefer breaking changes over weakening the design system

---

## 📋 Success Criteria

These rules are successfully implemented when:

- ✅ All visual props use token unions (no raw strings/numbers)
- ✅ All responsive props use canonical `Responsive<T>` type
- ✅ Radix UI is used internally only (not in public API)
- ✅ IntelliSense works for all visual props
- ✅ TypeScript compilation passes with no errors
- ✅ Future components automatically follow these patterns
- ✅ Breaking changes are preferred over weakening the design system

---

## 📖 Additional Resources

- **Token Types:** `src/tokens/types/index.ts`
- **Responsive Types:** `src/types/responsive.ts`
- **Responsive Utilities:** `src/lib/responsive-props.ts`
- **Component Rules:** `docs/architecture/CURSOR_UI_RULES.md`
- **Linting Rules:** `docs/architecture/LINTING_RULES.md`

---

## 🔄 Version History

- **v1.0** (2025-12-12): Initial architectural rules definition
  - Established Radix UI boundaries
  - Defined Token Union + Responsive<T> as canonical pattern
  - Created forbidden patterns list
  - Added IntelliSense validation rule

---

**Status:** ✅ ACTIVE  
**Version:** 1.0  
**Last Updated:** 2025-12-12  
**Priority:** CRITICAL
