# 🔷 General TypeScript Implementation Rules

**Version:** 1.0  
**Date:** 2025-12-16  
**Status:** ✅ ACTIVE  
**Scope:** General TypeScript coding practices and implementation guidelines

---

## ⚠️ IMPORTANT: Typing Hierarchy and Conflict Resolution

**📚 Typing System Index:** For a complete overview of the typing system architecture, hierarchy, and navigation guide, see [`docs/reference/TYPING_SYSTEM.md`](./TYPING_SYSTEM.md).

**This document defines GENERAL TypeScript implementation rules and coding practices.**

**Typing System Hierarchy:**
- **PRIMARY AUTHORITY:** `docs/reference/TYPING_STANDARD.md` — **MANDATORY architectural standard** governing PUBLIC API typing (variants, sizes, CVA boundaries, component props)
- **SECONDARY GUIDANCE:** This document (`TYPESCRIPT_GENERAL_RULES.md`) — General TypeScript implementation rules and coding practices

**Conflict Resolution Rule:** If this document conflicts with `TYPING_STANDARD.md`, **`TYPING_STANDARD.md` ALWAYS wins.**

**Examples of conflicts:**
- This document may suggest general TypeScript patterns
- `TYPING_STANDARD.md` explicitly forbids `VariantProps` in public APIs
- **Resolution:** Follow `TYPING_STANDARD.md` for all public API typing

**This document does NOT govern:**
- Public component API typing (see `TYPING_STANDARD.md`)
- Variant and size prop definitions (see `TYPING_STANDARD.md`)
- CVA usage boundaries in public APIs (see `TYPING_STANDARD.md`)

---

## 📋 Overview

This document defines **general TypeScript implementation rules** for Tenerife UI library. These rules cover:

- General TypeScript coding practices
- Internal implementation typing patterns
- Type safety guidelines
- Code organization and structure

**This document does NOT define public API typing rules.** For public API typing standards, see `docs/reference/TYPING_STANDARD.md`.

---

## 🎯 Core Principles

1. **Strict Type Safety**: No implicit `any`, all types explicitly defined
2. **Full Type Coverage**: Every component, token, hook, and utility must be fully typed
3. **Native Type Extension**: All components must extend appropriate native HTML types
4. **Type Unions for Tokens**: All tokens must export type unions via `keyof typeof`

**Note:** For public API typing rules (variants, sizes, CVA boundaries), see `docs/reference/TYPING_STANDARD.md`.

---

## 📦 Part 1: Component Typing

### Component Props Interface

**ALWAYS** define a props interface for every component:

```typescript
// ✅ Good
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

// ❌ Bad - No props interface
export const Button = ({ children, ...rest }) => { ... }
```

### Component Props Naming

**ALWAYS** use PascalCase with `Props` suffix:

- `ButtonProps` for Button component
- `CardProps` for Card component
- `ModalProps` for Modal component

### Native Type Extension

**ALWAYS** extend appropriate native HTML types:

```typescript
// Button extends button HTML attributes
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> { ... }

// Input extends input HTML attributes
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { ... }

// Div extends div HTML attributes
export interface DivProps
  extends React.HTMLAttributes<HTMLDivElement> { ... }
```

### CVA Variant Props (Internal Implementation Only)

**⚠️ IMPORTANT:** This section describes internal implementation patterns. For **public API typing**, see `docs/reference/TYPING_STANDARD.md`.

**For internal implementation:** CVA may use `VariantProps` internally, but **public component props MUST NOT** use `VariantProps` or derive types from CVA.

**❌ FORBIDDEN in Public APIs:**
```typescript
// ❌ FORBIDDEN - VariantProps in public API
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { ... }
```

**✅ REQUIRED for Public APIs (see TYPING_STANDARD.md):**
```typescript
// ✅ REQUIRED - Explicit union types in public API
export const BUTTON_VARIANTS = ["primary", "secondary", ...] as const;
export type ButtonVariant = typeof BUTTON_VARIANTS[number];

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; // ✅ Explicit union, not VariantProps
}
```

**For complete public API typing rules, see `docs/reference/TYPING_STANDARD.md`.**

### Event Handler Typing

**ALWAYS** type event handlers explicitly:

```typescript
// ✅ Good
onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;

// ❌ Bad
onClick?: any;
onChange?: (e: any) => void;
```

### Component Export Types

**ALWAYS** export component props types:

```typescript
// Component file
export interface ButtonProps { ... }
export const Button: React.FC<ButtonProps> = ... ;

// Index file
export type { ButtonProps } from "./Button";
export { Button } from "./Button";
```

---

## 🎨 Part 2: Token Typing

### Token Const Assertions

**ALWAYS** use `as const` for token objects:

```typescript
export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
  // ...
} as const;
```

### Token Type Unions

**ALWAYS** export type unions for token keys:

```typescript
export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
} as const;

export type Spacing = keyof typeof spacing;
// Result: type Spacing = 0 | 1 | 2
```

### Token Indexed Access

**ALWAYS** use `typeof` and `keyof` for token types:

```typescript
// ✅ Good
export type Spacing = keyof typeof spacing;
export type SemanticSpacing = keyof typeof semanticSpacing;
export type ElevationShadow = keyof typeof elevationShadows;

// ❌ Bad
export type Spacing = string;
export type SemanticSpacing = "xs" | "sm" | "md" | "lg";
```

### Token Value Types

**ALWAYS** define value types when needed:

```typescript
export type ColorScale = {
  50: string;
  100: string;
  200: string;
  // ...
};

export const primaryColors: ColorScale = { ... };
```

---

## 🎭 Part 3: Theme Typing

### Theme Mode Types

**ALWAYS** use literal union types for modes:

```typescript
export type Mode = "day" | "night";
export type ThemeName = "default" | "dark" | "brand";
```

### Theme Override Types

**ALWAYS** define strict interface for theme overrides:

```typescript
export interface ThemeOverride {
  name: string;
  description?: string;
  primaryColors?: Partial<ColorScale>;
  // ...
}
```

### Theme Provider Props

**ALWAYS** type ThemeProvider props:

```typescript
export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultMode?: Mode;
  defaultTheme?: ThemeName;
  storageKey?: string;
  themeStorageKey?: string;
  enableSystem?: boolean;
}
```

### Theme Context Types

**ALWAYS** type context values:

```typescript
export interface ThemeContextValue {
  mode: Mode;
  theme: ThemeName;
  setMode: (mode: Mode) => void;
  setTheme: (theme: ThemeName) => void;
  toggleMode: () => void;
}
```

---

## 🪝 Part 4: Hook Typing

### Hook Return Types

**ALWAYS** define return type interfaces:

```typescript
export interface UseModalReturn {
  isOpen: boolean;
  data: unknown;
  open: (data?: unknown) => void;
  close: () => void;
  toggle: () => void;
}

export function useModal(initialState?: boolean): UseModalReturn { ... }
```

### Hook Generic Types

**ALWAYS** use generics for flexible hooks:

```typescript
export function useModal<T = unknown>(initialState?: boolean): UseModalReturn<T> {
  // ...
}
```

---

## 🚫 Part 5: Type Usage Guidelines

### `any` Type - Temporary Allowance

**Current Status:** Explicit `any` is temporarily allowed by ESLint configuration while migrating legacy code to proper types. However, `any` should be avoided whenever possible.

**TypeScript Configuration:** `noImplicitAny: true` - implicit `any` is still forbidden by TypeScript compiler.

**ESLint Configuration:** `@typescript-eslint/no-explicit-any: "off"` - explicit `any` is temporarily allowed.

**Guidelines:**

```typescript
// ⚠️ Temporarily allowed (but discouraged)
const data: any = ...;
function process(data: any): any { ... }

// ✅ Preferred - Use unknown or specific type
const data: unknown = ...;
function process<T>(data: T): T { ... }

// ❌ Still forbidden - implicit any (caught by TypeScript)
function process(data) { ... } // Error: Parameter 'data' implicitly has an 'any' type
```

**Migration Path:** When encountering `any` in code:
1. Prefer `unknown` for truly unknown types
2. Use generics for flexible but type-safe code
3. Define specific interfaces/types when structure is known
4. Use type guards for runtime type checking

### `any[]` Arrays

**Guidelines:**

```typescript
// ⚠️ Temporarily allowed (but discouraged)
const items: any[] = [...];

// ✅ Preferred - Use specific type or generic
interface Event {
  id: string;
  title: string;
}
const items: Event[] = [...];
// OR
const items: Array<Event> = [...];
```

### Index Signature with `any`

**Guidelines:**

```typescript
// ⚠️ Temporarily allowed (but discouraged)
interface Config {
  [key: string]: any;
}

// ✅ Preferred - Use unknown or Record
interface Config {
  [key: string]: unknown;
}
// OR
type Config = Record<string, unknown>;
```

### No Implicit `any`

**NEVER** rely on implicit `any` (enforced by TypeScript `noImplicitAny: true`):

```typescript
// ❌ Forbidden - implicit any (TypeScript error)
function process(data) { ... }

// ✅ Explicit type required
function process(data: string) { ... }
```

---

## ✅ Part 6: Required Type Exports

### Component Type Exports

**ALWAYS** export component props types:

```typescript
// Button.tsx
export interface ButtonProps { ... }

// index.ts
export type { ButtonProps } from "./Button";
export { Button } from "./Button";
```

### Token Type Exports

**ALWAYS** export token type unions:

```typescript
// spacing.ts
export type Spacing = keyof typeof spacing;
export type SemanticSpacing = keyof typeof semanticSpacing;

// index.ts
export type { Spacing, SemanticSpacing } from "./spacing";
```

### Hook Type Exports

**ALWAYS** export hook return types:

```typescript
// useModal.ts
export interface UseModalReturn { ... }

// index.ts
export type { UseModalReturn } from "./useModal";
```

---

## 🔍 Part 7: Type Checking Rules

### Strict Mode Requirements

**ALWAYS** ensure strict mode enabled:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### Type Assertion Rules

**NEVER** use `as` type assertions unless necessary:

```typescript
// ❌ Avoid unnecessary assertions
const value = data as string;

// ✅ Use type guards
function isString(value: unknown): value is string {
  return typeof value === "string";
}
if (isString(data)) {
  const value = data; // TypeScript knows it's string
}
```

### Unsafe Type Assertions Prohibition (MANDATORY)

**FORBIDDEN:** Unsafe type assertions (`as any`, `as unknown as`) that bypass the public API type system are **FORBIDDEN** in all contexts.

**Scope of Prohibition:**
- Component implementation
- Tests
- Storybook stories
- Examples and documentation
- Internal utilities

**FORBIDDEN Patterns:**

```typescript
// ❌ FORBIDDEN - using as any to bypass public API
<Component {...({ disabled: true } as any)} />

// ❌ FORBIDDEN - unsafe type assertions to bypass TypeScript
const props = componentProps as any;
const value = data as unknown as TargetType;

// ❌ FORBIDDEN - bypassing TypeScript errors instead of fixing types
const result = (someValue as any).method();
```

**REQUIRED Process:**

If a prop or feature is needed but does not exist in the public API:

1. ✅ **MUST request architectural approval** to add the prop to the public API
2. ✅ **MUST NOT** use `as any` to bypass the type system
3. ✅ **MUST wait** for approval and implementation before using in tests/Storybook

**Exception Process:**

Exceptions are allowed **ONLY** after explicit architectural approval and documentation:
- Exception must be documented with rationale
- Exception must be temporary (with plan to fix)
- Exception must be approved through architectural decision process

**Violation Severity:**

- **Silent use of `as any`** = **BLOCKING PROCESS VIOLATION**
- Violations prevent progression past Foundation lifecycle Step 7 (TypeScript System Compliance)
- Violations in tests/Storybook prevent progression past Steps 11-12 (Quality Gates)

**Canonical Precedent: Link `disabled` Decision**

The Link component's `disabled` prop decision serves as a canonical precedent:
- **Initial State:** `disabled` was not part of Link's public API (`LinkProps`)
- **Violation:** Tests/Storybook used `as any` to simulate `disabled` prop (see `Link.test.tsx` line 495: `{...({ disabled: false } as any)}`)
- **Resolution:** Architectural decision was made to add `disabled` to Link's public API
- **Outcome:** `disabled` is now part of Link's public API (see `LinkProps.disabled?: boolean`)

**Lesson:** If a prop is needed for tests/Storybook/examples, it MUST be added to the public API through proper architectural approval, not bypassed with `as any`.

**Reference:** See [FOUNDATION_LOCK_OPERATING_RULES.md](../architecture/FOUNDATION_LOCK_OPERATING_RULES.md) — Step 7: TypeScript System Compliance — Unsafe Type Assertions Prohibition

---

## 📚 Part 8: Examples

### Complete Component Example

**⚠️ IMPORTANT:** This example shows internal implementation patterns. For **public API typing**, this example violates `TYPING_STANDARD.md`. See `docs/reference/TYPING_STANDARD.md` for correct public API patterns.

**Internal Implementation (CVA may use VariantProps internally):**
```typescript
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva("base-classes", {
  variants: {
    variant: {
      primary: "...",
      secondary: "...",
    },
    size: {
      sm: "...",
      md: "...",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

// ❌ FORBIDDEN - This violates TYPING_STANDARD.md for public APIs
// export interface ButtonProps
//   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean;
// }

// ✅ REQUIRED - Public API must use explicit union types (see TYPING_STANDARD.md)
export const BUTTON_VARIANTS = ["primary", "secondary"] as const;
export type ButtonVariant = typeof BUTTON_VARIANTS[number];

export const BUTTON_SIZES = ["sm", "md"] as const;
export type ButtonSize = typeof BUTTON_SIZES[number];

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant; // ✅ Explicit union
  size?: ButtonSize; // ✅ Explicit union
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Implementation uses buttonVariants internally
  },
);

Button.displayName = "Button";
```

**For complete public API typing rules, see `docs/reference/TYPING_STANDARD.md`.**

### Complete Token Example

```typescript
export const spacing = {
  0: "0",
  1: "0.25rem",
  2: "0.5rem",
} as const;

export type Spacing = keyof typeof spacing;
export type SpacingValue = (typeof spacing)[Spacing];
```

### Complete Hook Example

```typescript
export interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export function useCounter(initialValue = 0): UseCounterReturn {
  const [count, setCount] = React.useState(initialValue);

  const increment = React.useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const decrement = React.useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  const reset = React.useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset };
}
```

---

## ✅ Checklist

Before marking code as complete:

- [ ] All components have typed Props interfaces
- [ ] All Props extend appropriate native HTML types
- [ ] Public API typing follows TYPING_STANDARD.md (explicit unions, NOT VariantProps)
- [ ] All event handlers are explicitly typed
- [ ] All tokens use `as const` and export type unions
- [ ] All hooks have return type interfaces
- [ ] Avoid `any` where possible (temporarily allowed but discouraged)
- [ ] No implicit `any` (enforced by TypeScript)
- [ ] No unsafe type assertions (`as any`, `as unknown as`) to bypass public API typing (MANDATORY - see Unsafe Type Assertions Prohibition section)
- [ ] All types are exported
- [ ] Strict mode passes
- [ ] Type enforcement script passes

---

## 📚 Related Documents

**Typing System:**
- **`docs/reference/TYPING_SYSTEM.md`** — Typing system index and navigation guide (canonical entry point)

**Primary Authority:**
- **`docs/reference/TYPING_STANDARD.md`** — PRIMARY AUTHORITY for public API typing (MANDATORY, takes precedence over this document)

**Architecture Documents:**
- **`docs/ARCHITECTURE_CONTEXT.md`** — References `TYPING_STANDARD.md` as MANDATORY architectural standard

---

**Status:** ✅ ACTIVE  
**Last Updated:** 2025-12-17



