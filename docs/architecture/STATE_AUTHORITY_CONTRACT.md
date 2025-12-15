# State Authority Contract

**Status:** ✅ ACTIVE (LOCKED)  
**Priority:** BLOCKER  
**Date Created:** 2025-12-15  
**Last Updated:** 2025-12-15  
**Enforcement:** TUNG_STATE_AUTHORITY_FOUNDATION_LOCK

---

## Overview

This document defines the canonical architectural contract for UI component states (hover, active, focus, disabled, loading). It establishes the authority chain for state management and explicitly forbids Tailwind as a state-engine.

---

## Authority Chain

The state authority chain defines the flow of state definitions from tokens to UI:

```
src/tokens/states/** (State Matrix definitions)
    ↓
updateStateMatrixFromTokens() (Runtime injection)
    ↓
CSS variables (documentElement / component root)
    ↓
CSS selectors or arbitrary values
    ↓
UI component
```

### Authority Chain Rules

1. **State definitions** come from `src/tokens/states/**` (State Matrix)
2. **Runtime injection** happens via `updateStateMatrixFromTokens()` (synchronous only)
3. **CSS variables** are set on `document.documentElement` or component root
4. **CSS application** uses CSS selectors (`:hover`, `:active`, `:focus`) or Tailwind arbitrary values (`bg-[var(--*)]`)
5. **UI components** consume states through CSS variables, never through Tailwind variants

---

## Universal State Matrix

All component states conform to the Universal State Matrix structure:

```typescript
{
  [componentName: string]: {
    [variantName: string]: {
      [state: "hover" | "active" | "focus" | "disabled"]?: {
        [property: "background" | "text" | "border" | "outline" | "shadow"]?: string;
      };
    };
  };
}
```

### State Matrix Rules

- **All states** are token-driven (reference color tokens from `tokens/colors.ts`)
- **All states** are defined in State Matrix format
- **All states** are injected as CSS variables synchronously
- **No states** are defined in component code or Tailwind config

---

## CSS Variable Naming Convention

State CSS variables follow this pattern:

```
--{component}-{variant}-{state}-{property}
```

Examples:
- `--button-primary-hover-bg`
- `--button-primary-active-bg`
- `--button-primary-disabled-bg`
- `--button-primary-disabled-text`

### Property Suffixes

- `background` → `bg`
- `text` → `text`
- `border` → `border`
- `outline` → `outline`
- `shadow` → `shadow`

---

## Runtime Injection Rules

### Synchronous Execution

**CRITICAL**: State matrix injection must be **synchronous only**:

- ✅ **ALWAYS** use synchronous execution
- ❌ **NEVER** use `setTimeout`, `requestAnimationFrame`, or `Promise`
- ❌ **NEVER** use async/await for state injection
- ✅ **ALWAYS** set all state variables before component render

### Injection Function

```typescript
export function updateStateMatrixFromTokens(mode: Mode): void {
  // Early return for SSR - this is the ONLY allowed early return
  if (typeof document === "undefined" || !document.documentElement) return;

  const root = document.documentElement;
  const stateMatrix = getAllStateMatrices(mode);
  const variables = flattenStateMatrix(stateMatrix);

  // Set all CSS variables synchronously
  variables.forEach((value, varName) => {
    root.style.setProperty(varName, value);
  });
}
```

### Error Handling

- **Wrap token retrieval** in try-catch (continue if one component fails)
- **Wrap variable setting** in try-catch (set all variables even if one fails)
- **Log errors** but never throw (ensure all states are set)

---

## CSS Application Methods

### Method 1: CSS Selectors (Recommended)

Use CSS selectors with CSS variables:

```css
.button-primary {
  background-color: hsl(var(--button-primary-bg));
}

.button-primary:hover {
  background-color: hsl(var(--button-primary-hover-bg));
}

.button-primary:active {
  background-color: hsl(var(--button-primary-active-bg));
}

.button-primary:disabled {
  background-color: hsl(var(--button-primary-disabled-bg));
  color: hsl(var(--button-primary-disabled-text));
}
```

### Method 2: Tailwind Arbitrary Values

Use Tailwind arbitrary values with CSS variables:

```tsx
className="bg-[hsl(var(--button-primary-bg))] hover:bg-[hsl(var(--button-primary-hover-bg))] active:bg-[hsl(var(--button-primary-active-bg))]"
```

### Method 3: Inline Styles (Not Recommended)

Use inline styles only for dynamic values:

```tsx
style={{
  backgroundColor: `hsl(var(--button-primary-bg))`,
}}
```

---

## Forbidden Patterns

### ❌ Tailwind as State Engine

**NEVER** use Tailwind for state management:

- ❌ `hover:bg-*` (Tailwind hover variants for colors)
- ❌ `active:bg-*` (Tailwind active variants for colors)
- ❌ `focus:bg-*` (Tailwind focus variants for colors)
- ❌ Tailwind plugins for states
- ❌ Tailwind safelist for states
- ❌ CVA state variants (use CSS variables instead)
- ❌ Static CSS colors for states

### ❌ Async State Injection

**NEVER** use async operations for state injection:

- ❌ `setTimeout(() => updateStateMatrix(), 0)`
- ❌ `requestAnimationFrame(() => updateStateMatrix())`
- ❌ `Promise.resolve().then(() => updateStateMatrix())`
- ❌ `useEffect(() => updateStateMatrix(), [])`

### ❌ Component-Level State Definitions

**NEVER** define states in component code:

- ❌ Hardcoded hover colors in component
- ❌ Conditional state logic in component
- ❌ State calculations in component render

---

## Allowed Patterns

### ✅ CSS Variables

**ALWAYS** use CSS variables for all states:

- ✅ `--button-primary-hover-bg`
- ✅ `--button-primary-active-bg`
- ✅ `--button-primary-disabled-bg`
- ✅ All states come from State Matrix

### ✅ CSS Selectors

**ALWAYS** use CSS selectors for state application:

- ✅ `:hover` selector
- ✅ `:active` selector
- ✅ `:focus` selector
- ✅ `:disabled` selector

### ✅ Tailwind Arbitrary Values

**ALWAYS** use Tailwind arbitrary values with CSS variables:

- ✅ `bg-[hsl(var(--button-primary-hover-bg))]`
- ✅ `text-[hsl(var(--button-primary-disabled-text))]`
- ✅ `border-[hsl(var(--button-outline-hover-border))]`

### ✅ Runtime Synchronous Injection

**ALWAYS** use synchronous runtime injection:

- ✅ `updateStateMatrixFromTokens(mode)` called synchronously
- ✅ All variables set before component render
- ✅ No async operations

---

## Component Implementation Example

### Button Primary State Matrix

```typescript
// src/tokens/states.ts
export function getButtonStateMatrix(mode: Mode, ...): StateMatrix {
  return {
    button: {
      primary: {
        hover: {
          background: primaryColors[700], // Darker for hover
        },
        active: {
          background: primaryColors[800], // Even darker for active
        },
        disabled: {
          background: primaryColors[300], // Lighter for disabled
          text: primaryColors[400],
        },
      },
    },
  };
}
```

### Button Component Usage

```tsx
// src/components/ui/button.tsx
const buttonVariants = tokenCVA({
  base: "...",
  variants: {
    variant: {
      primary: `
        bg-[hsl(var(--button-primary-bg))]
        hover:bg-[hsl(var(--button-primary-hover-bg))]
        active:bg-[hsl(var(--button-primary-active-bg))]
        disabled:bg-[hsl(var(--button-primary-disabled-bg))]
        disabled:text-[hsl(var(--button-primary-disabled-text))]
      `,
    },
  },
});
```

---

## Storybook Verification

### iframe-Only Verification

State matrix verification must work in Storybook iframe context:

```typescript
// .storybook/preview.tsx
(window as any).__checkStateMatrix = () => {
  const isIframe = window.self !== window.top;
  if (!isIframe) {
    console.warn("[State Matrix] Should only be called in iframe context");
  }
  return __checkStateMatrix("day");
};
```

### Verification Checklist

- [ ] All state variables are set (`--button-primary-hover-bg`, etc.)
- [ ] Hover works visually in Storybook iframe
- [ ] Active works visually in Storybook iframe
- [ ] Disabled works visually in Storybook iframe
- [ ] State changes react to token changes

---

## Lock Conditions

The State Authority Contract is considered **LOCKED** when:

- ✅ Hover/active states work without Tailwind variants
- ✅ All states come from CSS variables
- ✅ Tailwind does not participate in state logic
- ✅ Storybook iframe reflects state changes
- ✅ Button.primary visually reacts to hover/active

---

## Non-Goals

This contract does NOT cover:

- ❌ CVA refactor (separate concern)
- ❌ Design changes (separate concern)
- ❌ Animation tuning (separate concern)
- ❌ Other components beyond Button (future work)

---

## Unlocks After

This contract unlocks:

- ✅ Universal Component State Matrix
- ✅ ESLint: no-tailwind-state-variants
- ✅ tokenCVA (variant vs state separation)

---

## Related Documents

- [Universal State Matrix](../reference/UNIVERSAL_STATE_MATRIX.md)
- [Color Authority Contract](./COLOR_AUTHORITY_CONTRACT.md)
- [Button Component Tokens](../../src/tokens/components/button.ts)

---

**Last Updated:** 2025-12-15  
**Lock Status:** ✅ LOCKED - All states use CSS variables, Tailwind removed as state engine

