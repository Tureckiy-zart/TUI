
# TYPING STANDARD

**Status:** MANDATORY  
**Scope:** @tenerife.music/ui  
**Applies to:** ALL UI components (Foundation + Extension)  
**Audience:** Maintainers, Contributors, Cursor AI

---

## Typing System Overview

This document is the **top-level authority** for PUBLIC API typing in the `@tenerife.music/ui` library.

**📚 Typing System Index:** For a complete overview of the typing system architecture, hierarchy, and navigation guide, see [`docs/reference/TYPING_SYSTEM.md`](./TYPING_SYSTEM.md).

**Authority Hierarchy:**
- **This document** (`docs/reference/TYPING_STANDARD.md`) — **PRIMARY AUTHORITY** for all public API typing decisions
- **General TypeScript Rules** (`docs/reference/TYPESCRIPT_GENERAL_RULES.md`) — Secondary implementation guidance (does not override this document)

This document governs:
- Architectural typing decisions for public component APIs
- Variant, size, and similar prop type definitions
- CVA usage boundaries in public APIs
- Explicit union type requirements

**This document takes precedence over all other typing guidelines**, including general TypeScript coding practices, when it comes to public API typing.

---

## 1. Purpose

This document defines **mandatory typing rules** for all public APIs
in the `@tenerife.music/ui` library.

The goal is to ensure:

- Explicit, readable, and predictable public APIs
- Strong DX with full IDE autocomplete
- Clear separation between **public contracts** and **internal mechanisms**
- Long-term architectural stability

These rules are **NOT stylistic**.  
They are **architectural requirements**.

---

## 2. Core Principle

> **Public component APIs MUST be explicitly typed.**  
> **Inference from implementation details is forbidden.**

CVA (`class-variance-authority` / `tokenCVA`) is an **internal implementation tool**  
and MUST NOT define or leak public types.

---

## 3. Mandatory Rules

### RULE 1 — Explicit Variant Union Types (REQUIRED)

Each component exposing `variant`, `size`, or similar props  
**MUST define explicit union types**.

#### ✅ REQUIRED

```ts
export const BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "accent",
  "outline",
  "ghost",
  "link",
  "destructive",
] as const

export type ButtonVariant = typeof BUTTON_VARIANTS[number]

export const BUTTON_SIZES = ["xs", "sm", "md", "lg", "xl"] as const

export type ButtonSize = typeof BUTTON_SIZES[number]
```

#### ❌ FORBIDDEN

- Inline string unions in props
- `string` as a public variant type
- Inferring public types from CVA

---

### RULE 2 — CVA Is NOT a Public Type Source (FORBIDDEN)

CVA (`cva`, `tokenCVA`) MUST NOT be used as a source of public types.

#### ❌ FORBIDDEN

```ts
export type ButtonProps = VariantProps<typeof buttonVariants>

variant?: VariantProps<typeof buttonVariants>["variant"]

export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"]
```

#### ✅ REQUIRED

- CVA types may exist internally
- Public props MUST reference explicit union types

---

### RULE 3 — CVA Variant Maps MUST Be Type-Constrained

All variant maps passed into CVA MUST be constrained
using `satisfies Record<...>`.

#### ✅ REQUIRED

```ts
export const buttonVariants = tokenCVA({
  variants: {
    variant: {
      primary: "...",
      secondary: "...",
      accent: "...",
      outline: "...",
      ghost: "...",
      link: "...",
      destructive: "...",
    } satisfies Record<ButtonVariant, string>,

    size: {
      xs: "...",
      sm: "...",
      md: "...",
      lg: "...",
      xl: "...",
    } satisfies Record<ButtonSize, string>,
  },
})
```

This guarantees:

- No missing variants
- No extra undocumented variants
- Immediate TypeScript failure on mismatch

---

### RULE 4 — Public Component Props MUST Use Canonical Types

Public component props MUST reference canonical union types.

#### ✅ REQUIRED

```ts
export interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
}
```

#### ❌ FORBIDDEN

- `variant?: string`
- Inline unions in props
- CVA-derived types in public APIs

---

## 4. File Structure Convention (RECOMMENDED)

To keep typing discoverable and clean, the following structure is recommended:

```
button.types.ts  // explicit public unions
button.tsx       // component implementation
button.variants.ts  // CVA / tokenCVA definitions
```

Where:

- `*.types.ts` — explicit public unions
- `*.variants.ts` — CVA / tokenCVA definitions
- `*.tsx` — component implementation

This is **recommended**, not mandatory,
but typing rules remain mandatory regardless of structure.

---

## 5. Scope of Application

These rules apply to:

- **All Extension components**
- **All locked Extension components** (typing cleanup allowed)
- **All new components**
- **All refactors touching public APIs**

### Foundation Components

Foundation components:

- MUST follow these rules for typing improvements
- MUST NOT change behavior or public API semantics
- Typing cleanup does NOT constitute UNLOCK.

---

## 6. Enforcement

Violations of this document are considered:

- ❌ Architectural violations
- ❌ DX regressions
- ❌ Review blockers

Enforcement occurs via:

- Canonical Context (`ARCHITECTURE_CONTEXT.md`)
- Architecture Rules
- Cursor AI Guard Rules
- Manual Review

---

## 7. Golden Rules

- **Explicit > Inferred**
- **Public API > Internal convenience**
- **Types are contracts, not implementation details**
- **If CVA defines your public types — it is wrong**

---

## 8. Status

This document is:

- ✅ MANDATORY
- ✅ CANONICAL
- ✅ ENFORCED
- ❌ NOT OPTIONAL
- ❌ NOT A STYLE GUIDE

---

## 9. Related Documents

**Typing System:**
- **`docs/reference/TYPING_SYSTEM.md`** — Typing system index and navigation guide (canonical entry point)

**Secondary Implementation Guidance:**
- **`docs/reference/TYPESCRIPT_GENERAL_RULES.md`** — General TypeScript implementation rules and coding practices
  - Provides implementation guidance for internal code patterns
  - Does NOT override this document for public API typing
  - Use for general TypeScript best practices outside of public API typing

**Architecture Documents:**
- **`docs/ARCHITECTURE_CONTEXT.md`** — References this document as MANDATORY architectural standard
- **`docs/architecture/ARCHITECTURE_RULES.md`** — References this document for CVA-derived typing rules
- **`docs/architecture/ASSISTANT_DEVELOPMENT_RULES.md`** — References this document as MANDATORY for AI assistants

**Note:** For public API typing (variants, sizes, CVA boundaries), this document (`TYPING_STANDARD.md`) is the **REQUIRED, ENFORCED architectural standard** and takes precedence over all other typing guidelines.
