# 🔷 Global TypeScript Typing Standard

**Version:** 1.0  
**Date:** 2025-01-20  
**Status:** ✅ ACTIVE

---

## 📋 Overview

This document defines the global TypeScript typing standards for Tenerife UI library. All code must adhere to these standards to ensure type safety, maintainability, and excellent developer experience.

---

## 🎯 Core Principles

1. **Strict Type Safety**: No implicit `any`, all types explicitly defined
2. **Full Type Coverage**: Every component, token, hook, and utility must be fully typed
3. **Native Type Extension**: All components must extend appropriate native HTML types
4. **Type Unions for Tokens**: All tokens must export type unions via `keyof typeof`
5. **VariantProps Integration**: CVA-based components must use `VariantProps` for variants

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

### CVA Variant Props

**ALWAYS** use `VariantProps` for CVA-based components:

```typescript
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("base-classes", {
  variants: {
    variant: { ... },
    size: { ... },
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> { ... }
```

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

## 🚫 Part 5: Forbidden Types

### No `any` Type

**NEVER** use `any` type:

```typescript
// ❌ Forbidden
const data: any = ...;
function process(data: any): any { ... }

// ✅ Use unknown or specific type
const data: unknown = ...;
function process<T>(data: T): T { ... }
```

### No `any[]` Arrays

**NEVER** use `any[]`:

```typescript
// ❌ Forbidden
const items: any[] = [...];

// ✅ Use specific type or generic
interface Event {
  id: string;
  title: string;
}
const items: Event[] = [...];
// OR
const items: Array<Event> = [...];
```

### No Index Signature `any`

**NEVER** use `[key: string]: any`:

```typescript
// ❌ Forbidden
interface Config {
  [key: string]: any;
}

// ✅ Use unknown or Record
interface Config {
  [key: string]: unknown;
}
// OR
type Config = Record<string, unknown>;
```

### No Implicit `any`

**NEVER** rely on implicit `any`:

```typescript
// ❌ Forbidden - implicit any
function process(data) { ... }

// ✅ Explicit type
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

---

## 📚 Part 8: Examples

### Complete Component Example

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

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Implementation
  },
);

Button.displayName = "Button";
```

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
- [ ] CVA components use VariantProps
- [ ] All event handlers are explicitly typed
- [ ] All tokens use `as const` and export type unions
- [ ] All hooks have return type interfaces
- [ ] No `any`, `any[]`, or `[key: string]: any`
- [ ] All types are exported
- [ ] Strict mode passes
- [ ] Type enforcement script passes

---

**Status:** ✅ ACTIVE  
**Last Updated:** 2025-01-20
