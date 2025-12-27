# Extension Component Examples

**Status:** Active  
**Last Updated:** 2025-12-25  
**Purpose:** Reference examples of Extension component patterns

---

## Overview

This document provides reference examples of Extension components organized by pattern type. Use these examples as patterns when creating new Extension components.

**Key Principle:** All Extension components must follow these patterns. For architectural rules and Authority Contracts, see [ARCHITECTURE_CONTEXT.md](../ARCHITECTURE_CONTEXT.md) and [AUTHORITY_NAVIGATION.md](../architecture/AUTHORITY_NAVIGATION.md). Deviations require architectural justification.

**Reference Components for Complex Controls:**
- **Button** (Foundation) - `src/PRIMITIVES/Button/Button.tsx` - Foundation layer reference for complex controls
- **Slider** (Extension) - `src/COMPOSITION/controls/Slider/Slider.tsx` - Extension layer reference for complex controls
  - Demonstrates token migration (cva → tokenCVA), token hole fixing, Extension vs Foundation distinction
  - **Audit Report:** `docs/reports/audit/SLIDER_BASELINE_REPORT.md` (Pipeline 18A Complete)

---

## Pattern Types

### Primitive Components

Primitive components are basic building blocks that don't compose other components.

#### Example: Stack

**Location:** `src/COMPOSITION/layout/Stack/Stack.tsx`

**Key Patterns:**
- Uses Box internally as base container
- Token-driven spacing via `spacing` prop
- Responsive support via `Responsive<SpacingToken>`
- Structural Tailwind classes only (flex, flex-col, etc.)
- Visual properties use CSS variables from tokens

**Code Pattern:**
```tsx
import { Box, type BoxProps } from "../Box";
import type { ResponsiveSpacing, SpacingValue } from "../layout.types";
import { getBaseValue, getSpacingCSSVar } from "@/FOUNDATION/lib/responsive-props";

export interface StackProps extends Omit<BoxProps, "display" | "flexDirection" | "gap"> {
  spacing?: ResponsiveSpacing;
  direction?: "vertical" | "horizontal";
  // ... other props
}

const Stack = React.forwardRef<HTMLDivElement, StackProps>(
  ({ spacing, direction = "vertical", ...props }, ref) => {
    const gapBaseValue = getBaseValue<SpacingValue>(spacing);
    
    const inlineStyles: React.CSSProperties = {
      ...(gapBaseValue !== undefined && { gap: getSpacingCSSVar(String(gapBaseValue)) }),
    };

    return (
      <Box
        ref={ref}
        className={cn("flex", direction === "horizontal" ? "flex-row" : "flex-col")}
        style={Object.keys(inlineStyles).length > 0 ? inlineStyles : undefined}
        {...props}
      />
    );
  },
);
```

**Token Usage:**
- `spacing` prop uses `ResponsiveSpacing` (token union)
- CSS variables via `getSpacingCSSVar()`
- No raw values

---

### Control Components

Control components are interactive elements that handle user input.

#### Reference Examples for Complex Controls

**Canonical Reference Components:** Use these components as reference patterns when creating complex control components:

1. **Button** (Foundation) - `src/PRIMITIVES/Button/Button.tsx`
   - **Reference Use Cases:**
     - Token-driven styling with component-specific tokens (BUTTON_TOKENS)
     - CVA usage with tokenCVA (for Foundation components)
     - Foundation Enforcement pattern (no className/style props)
     - Size and variant mapping via tokens
     - Complete token compliance (100% token-driven)
   
2. **Slider** (Extension) - `src/COMPOSITION/controls/Slider/Slider.tsx`
   - **Reference Use Cases:**
     - **Token migration pattern:** Demonstrates proper tokenCVA migration (cva → tokenCVA)
     - **Token hole fixing:** Shows how to replace raw Tailwind classes with component-specific tokens (SLIDER_TOKENS)
     - **Extension vs Foundation distinction:** Clear example of Extension control (not Foundation)
     - **Complex control pattern:** Multi-part component (root, track, range, thumb, marks) with separate CVA variants
     - **Type system alignment:** Explicit union types with `satisfies Record<Type, string>` constraints
     - **Orientation support:** Demonstrates compound variants with orientation × size
     - **Complete token compliance:** All raw values replaced with SLIDER_TOKENS references
   - **Audit Report:** `docs/reports/audit/SLIDER_BASELINE_REPORT.md` (Pipeline 18A Complete)

**Why These Are Reference Examples:**

- **Button** demonstrates Foundation layer patterns (locked, immutable, canonical)
- **Slider** demonstrates Extension layer patterns (evolvable, complex, token-compliant)
- Both show complete token compliance and proper CVA usage
- Both serve as examples for fixing token holes and ensuring architectural compliance

#### Example: Input

**Location:** `src/components/input/Input.tsx`

**Key Patterns:**
- Token-driven size and variant props
- Uses CVA for variant management
- Token unions for all visual props
- TypeScript strict typing

**Code Pattern:**
```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { INPUT_TOKENS } from "@/FOUNDATION/tokens/components/input";

const inputVariants = cva(INPUT_TOKENS.base, {
  variants: {
    variant: {
      default: INPUT_TOKENS.variant.default,
      // ... other variants
    },
    size: {
      sm: INPUT_TOKENS.size.sm,
      md: INPUT_TOKENS.size.md,
      // ... other sizes
    },
  },
});

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "className" | "style">,
    VariantProps<typeof inputVariants> {
  // Props use token unions
}
```

**Token Usage:**
- Variants map to token objects
- CVA transports variants to token-based styles
- No raw values in variants

---

### Layout Components

Layout components compose other components to create layout structures.

#### Example: Row

**Location:** `src/COMPOSITION/layout/Row/Row.tsx`

**Key Patterns:**
- Semantic alias for Stack
- Shares implementation with Stack
- Provides explicit horizontal layout API

**Code Pattern:**
```tsx
import { Stack, type StackProps } from "../Stack";

export interface RowProps extends Omit<StackProps, "direction"> {
  // Row is always horizontal, so direction is fixed
}

export const Row = React.forwardRef<HTMLDivElement, RowProps>(
  ({ ...props }, ref) => {
    return <Stack ref={ref} direction="horizontal" {...props} />;
  },
);
```

**Token Usage:**
- Inherits token usage from Stack
- No additional token requirements

---

### Composite Components

Composite components combine multiple components to create higher-level functionality.

#### Example: Dialog (Extension Composition)

**Location:** `src/COMPOSITION/overlays/Dialog/Dialog.tsx`

**Key Patterns:**
- Composes Foundation Modal internally
- Adds domain-specific behavior
- Uses Foundation public APIs only

**Code Pattern:**
```tsx
import { Modal, ModalRoot, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@/components/modal";

export interface DialogProps {
  // Dialog-specific props
  title?: string;
  description?: string;
  // ...
}

export const Dialog = ({ title, description, ...props }: DialogProps) => {
  return (
    <ModalRoot>
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        {description && <ModalBody>{description}</ModalBody>}
        {/* Dialog-specific content */}
      </ModalContent>
    </ModalRoot>
  );
};
```

**Foundation Composition:**
- Uses Modal (Foundation) internally
- Does NOT bypass Foundation
- Does NOT duplicate Foundation functionality

---

## Common Patterns

### Token-Driven Props

**Pattern:** All visual props use token unions

```tsx
export interface ComponentProps {
  // ✅ CORRECT - Token unions
  spacing?: ResponsiveSpacing;
  color?: ColorToken;
  radius?: RadiusToken;
  size?: "sm" | "md" | "lg"; // Token union, not raw values
  
  // ❌ FORBIDDEN - Raw values
  // spacing?: string | number;
  // color?: string;
  // radius?: string;
}
```

### Responsive Props

**Pattern:** Use `Responsive<T>` for responsive behavior

```tsx
import type { Responsive } from "@/types/responsive";

export interface ComponentProps {
  spacing?: Responsive<SpacingToken>;
  // Usage: spacing={{ base: "sm", md: "lg" }}
}
```

### Foundation Composition

**Pattern:** Compose Foundation components, don't bypass them

```tsx
// ✅ CORRECT - Composes Foundation
import { Modal, ModalRoot, ModalContent } from "@/components/modal";

export const ConfirmDialog = ({ ... }) => {
  return (
    <ModalRoot>
      <ModalContent>...</ModalContent>
    </ModalRoot>
  );
};

// ❌ FORBIDDEN - Bypasses Foundation
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const ConfirmDialog = ({ ... }) => {
  return <DialogPrimitive.Root>...</DialogPrimitive.Root>;
};
```

### CVA Variant Management

**Pattern:** Use CVA to transport variants to token-based styles

```tsx
import { cva } from "class-variance-authority";
import { COMPONENT_TOKENS } from "@/FOUNDATION/tokens/components/component";

const componentVariants = cva(COMPONENT_TOKENS.base, {
  variants: {
    variant: {
      primary: COMPONENT_TOKENS.variant.primary,
      secondary: COMPONENT_TOKENS.variant.secondary,
    },
    size: {
      sm: COMPONENT_TOKENS.size.sm,
      md: COMPONENT_TOKENS.size.md,
    },
  },
});
```

---

## Anti-Patterns to Avoid

### ❌ Raw Values

```tsx
// ❌ FORBIDDEN
<div style={{ padding: "16px", borderRadius: "8px" }} />

// ✅ CORRECT
<div style={{ padding: "var(--spacing-md)", borderRadius: "var(--radius-md)" }} />
```

### ❌ Foundation Duplication

```tsx
// ❌ FORBIDDEN - Duplicates Modal
export const SimpleModal = ({ ... }) => {
  return <div className="modal">...</div>;
};

// ✅ CORRECT - Composes Modal
export const ConfirmDialog = ({ ... }) => {
  return (
    <ModalRoot>
      <ModalContent>...</ModalContent>
    </ModalRoot>
  );
};
```

### ❌ Foundation Name Usage

```tsx
// ❌ FORBIDDEN - Uses Foundation name
export const SimpleModal = ...;
export const BasicTabs = ...;
export const ModalV2 = ...;

// ✅ CORRECT - Descriptive, intent-based names
export const ConfirmDialog = ...;
export const TabNavigation = ...;
export const EventModal = ...;
```

### ❌ Foundation Bypass

```tsx
// ❌ FORBIDDEN - Bypasses Foundation
import * as DialogPrimitive from "@radix-ui/react-dialog";

// ✅ CORRECT - Uses Foundation
import { Modal, ModalRoot } from "@/components/modal";
```

### ❌ Hardcoded Tailwind Utilities

```tsx
// ❌ FORBIDDEN - Hardcoded Tailwind for visual properties
<div className="p-4 rounded-md bg-blue-500" />

// ✅ CORRECT - Token-based via CSS variables
<div className="p-md rounded-md bg-primary" />
// Where p-md, rounded-md, bg-primary map to CSS variables
```

---

## File Structure Pattern

All Extension components follow this structure:

```
src/COMPOSITION/{category}/{ComponentName}/
├── {ComponentName}.tsx          # Main component
├── {ComponentName}.stories.tsx  # Storybook stories
├── {ComponentName}.test.tsx     # Tests
├── {ComponentName}.types.ts    # Type definitions (if complex)
└── index.ts                     # Exports
```

**Example:**
```
src/COMPOSITION/layout/Stack/
├── Stack.tsx
├── Stack.stories.tsx
├── Stack.test.tsx
└── index.ts
```

---

## Related Documents

- [Extension Authority Contract](../architecture/EXTENSION_AUTHORITY.md)
- [Extension Canonical State](../architecture/EXTENSION_STATE.md)
- [Component Creation Checklist](../workflows/tasks/COMPONENT_CREATION_CHECKLIST.md)
- [Component Needs Inventory](../workflows/tasks/COMPONENT_NEEDS_INVENTORY.md)

---

**Note:** These examples are canonical. New components should follow these patterns. Deviations require architectural justification.

