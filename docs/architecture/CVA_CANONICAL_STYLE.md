# CVA Canonical Style Authority Contract

**Status:** ✅ ACTIVE  
**Priority:** CRITICAL  
**Date Created:** 2025-12-19  
**Version:** 1.1.0  
**Enforcement:** TUNG_PIPELINE_CVA_CANONICALIZATION

---

## Document Classification

**TYPE:** AUTHORITY  
**MUTABILITY:** IMMUTABLE  
**LOCK STATUS:** ✅ ACTIVE  
**AUTHORITY DOMAIN:** CVA Structure & Pattern Authority

**Purpose:** This document defines the canonical, mandatory structure for using CVA (`cva` / `tokenCVA`) across all Foundation and Extension components. It establishes architectural law for CVA authoring, ensuring structural consistency and preventing pattern drift.

---

## Overview

This document defines the **single canonical style** for CVA/tokenCVA usage across all components. It establishes:

- **Mandatory CVA structure pattern** - Required layout and organization
- **Forbidden CVA patterns** - Explicitly disallowed structures
- **Pipeline integration** - How CVA structure validation is enforced in Pipeline 18A
- **Migration policy** - Rules for updating existing components

**Key Principle:** CVA is declarative, not procedural. Variants must be explicit, inspectable, and defined inline within the CVA configuration. No intermediate objects, no dynamic construction, no conditional logic inside CVA config.

---

## Authority Chain

**CVA Canonical Style Authority** is the single source of truth for all CVA structure patterns across all UI components.

**Authority Hierarchy:**
1. **CVA Canonical Style Authority Contract** (this document) - Defines mandatory CVA structure
2. **Pipeline 18A** - Validates CVA structure at STEP 3, STEP 7, STEP 9
3. **Component Implementation** - Components must follow canonical structure
4. **Type System** - Explicit union types (see `TYPING_STANDARD.md`) complement CVA structure

---

## Core Principles

### Principle 1: CVA is Declarative, Not Procedural

CVA configurations must be **static, declarative, and inspectable**. They must not contain:
- Conditional logic
- Dynamic construction
- Function calls that generate variant objects
- Runtime computation

### Principle 2: Variants Must Be Explicit and Inspectable

All variant definitions must be:
- Visible directly in the CVA configuration
- Not hidden behind function calls or intermediate objects
- Immediately readable without tracing function calls

### Principle 3: Single tokenCVA Invocation

Each component must use **exactly one** `tokenCVA` (or `cva`) invocation per variant set. Multiple CVA instances are allowed only for distinct variant sets (e.g., `buttonVariants` and `buttonIconOnlyVariants` are separate variant sets).

### Principle 4: No Conditional Logic Inside CVA Config

CVA configuration objects must not contain:
- Conditional spreading (`...condition ? obj : {}`)
- Ternary operators in variant definitions
- Function calls that return variant objects conditionally

---

## CVA Usage Decision Matrix (MANDATORY)

### Purpose

This matrix defines **mandatory rules** for selecting between `tokenCVA` and `cva` based on component characteristics. This matrix is **normative** and **mandatory** for all components.

**Key Principle:** The choice between `tokenCVA` and `cva` is not arbitrary. It is determined by the presence of token-driven visual axes (variant, size, state) versus boolean/presentational flags.

### Canonical Rules

**RULE 1: tokenCVA is REQUIRED for token-driven axes**
- `tokenCVA` is **MANDATORY** for all components with token-driven visual axes (variant, size, state)
- Enforcement: **BLOCKER**
- Rationale: `tokenCVA` provides validation and ensures token-only styling. Components with token-driven axes must use `tokenCVA` to enforce architectural compliance.

**RULE 2: cva is ALLOWED only for non-token axes**
- `cva` is **ALLOWED** only for components without token-driven axes and with boolean/presentational flags
- Enforcement: **BLOCKER**
- Rationale: `cva` is sufficient for simple boolean modifiers without token validation needs. Components with only boolean flags (e.g., `muted: true/false`) may use `cva`.

**RULE 3: Foundation components using cva require explicit justification**
- Foundation components using `cva` **MUST** document explicit rationale in audit report
- Enforcement: **BLOCKER**
- Rationale: Foundation components should prefer `tokenCVA` for consistency and validation. Using `cva` in Foundation components requires explicit architectural justification.

### Decision Matrix Table

| Component | Layer | Allowed CVA | Required CVA | Rationale | Migration Status |
|-----------|-------|-------------|--------------|-----------|------------------|
| Button | Foundation | tokenCVA | tokenCVA | Multiple token-driven axes (variant, size) | ✅ Compliant |
| Link | Foundation | tokenCVA | tokenCVA | Token-driven variants and sizes; navigation semantics | ✅ Compliant |
| Input | Foundation | tokenCVA | tokenCVA | Token-driven size, variant, and state axes | ✅ Compliant |
| Text | Foundation | cva | cva | Boolean modifiers (muted) and typography flags; no token variant axes | ✅ Compliant |
| Heading | Foundation | cva | cva | Pure typography primitive; boolean modifiers (muted); no token variant axes | ✅ Compliant |
| Badge | Extension | tokenCVA | tokenCVA | Token-driven visual variants | ✅ Compliant |
| Alert | Extension | tokenCVA | tokenCVA | Variant-based visual semantics (should use tokens) | ⚠️ Requires migration |
| Tabs | Foundation | tokenCVA | tokenCVA | Token-driven variant and state management | ⚠️ Requires migration to tokenCVA |
| Select | Foundation | tokenCVA | tokenCVA | Complex token-driven visual states | ⚠️ Requires migration to tokenCVA |

### Migration Notes

Components marked with "⚠️ Requires migration" are currently non-compliant but locked. Migration should occur during future Pipeline 18A runs when components are unlocked for refactoring.

**Migration Policy:**
- **Locked components:** NO CHANGE (marked in Decision Matrix as "requires migration")
- **Unlocked components:** MANDATORY compliance during Pipeline 18A execution

### Usage Examples

**✅ CORRECT - tokenCVA for token-driven component:**
```typescript
import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { BUTTON_TOKENS } from "@/FOUNDATION/tokens/components/button";

export const buttonVariants = tokenCVA({
  variants: {
    variant: {
      primary: `${BUTTON_TOKENS.variant.primary.bg} ${BUTTON_TOKENS.variant.primary.text}`,
    } satisfies Record<ButtonVariant, string>,
    size: {
      sm: `${BUTTON_TOKENS.size.sm.height} ${BUTTON_TOKENS.size.sm.padding}`,
    } satisfies Record<ButtonSize, string>,
  },
});
```

**✅ CORRECT - cva for boolean-only component:**
```typescript
import { cva } from "class-variance-authority";
import { TEXT_TOKENS } from "@/FOUNDATION/tokens/components/text";

export const textVariants = cva("text-foreground", {
  variants: {
    size: {
      md: TEXT_TOKENS.fontSize.md, // Typography tokens OK in cva
    } satisfies Record<TextSize, string>,
    muted: {
      true: "text-muted-foreground", // Boolean flag - OK for cva
      false: "",
    },
  },
});
```

**❌ FORBIDDEN - cva for token-driven component:**
```typescript
// ❌ FORBIDDEN - Component has token-driven variant axis
import { cva } from "class-variance-authority";
import { ALERT_TOKENS } from "@/FOUNDATION/tokens/components/alert";

export const alertVariants = cva("...", {
  variants: {
    variant: {
      primary: `${ALERT_TOKENS.variant.primary.bg}`, // ❌ Should use tokenCVA
    },
  },
});
```

**Rationale for Forbidden Pattern:** Components with token-driven variant axes must use `tokenCVA` to ensure token validation and architectural compliance. Using `cva` for token-driven axes bypasses validation and violates architectural rules.

### Validation Logic

For each component in Pipeline 18A:

1. **Identify token-driven axes:**
   - Check for variant, size, or state axes that reference token objects (e.g., `TOKENS.variant.*`, `TOKENS.size.*`)
   - If token-driven axes exist → component **MUST** use `tokenCVA`

2. **Identify boolean/presentational flags:**
   - Check for boolean variants (e.g., `muted: { true: "...", false: "" }`)
   - If only boolean flags exist (no token-driven axes) → component **MAY** use `cva`

3. **Check Decision Matrix compliance:**
   - Verify component CVA type matches Decision Matrix table
   - If mismatch → **BLOCKER**, normalization required

4. **Foundation component exception:**
   - Foundation components using `cva` must document explicit rationale in audit report
   - Rationale must explain why `tokenCVA` is not appropriate

---

## Canonical CVA Structure (MANDATORY)

### Required Structure Pattern

All components **MUST** follow this exact structure:

```typescript
// 1. Explicit variant axes constants (if needed for defaultVariants)
export const COMPONENT_VARIANTS = ["primary", "secondary", "accent"] as const;
export const COMPONENT_SIZES = ["sm", "md", "lg"] as const;

// 2. Explicit union types (REQUIRED - see TYPING_STANDARD.md)
export type ComponentVariant = typeof COMPONENT_VARIANTS[number];
export type ComponentSize = typeof COMPONENT_SIZES[number];

// 3. Single tokenCVA invocation with variants defined inline
export const componentVariants = tokenCVA({
  base: `...base classes...`,
  variants: {
    variant: {
      primary: `${TOKENS.variant.primary.bg} ${TOKENS.variant.primary.text}`,
      secondary: `${TOKENS.variant.secondary.bg} ${TOKENS.variant.secondary.text}`,
      accent: `${TOKENS.variant.accent.bg} ${TOKENS.variant.accent.text}`,
    } satisfies Record<ComponentVariant, string>,
    size: {
      sm: `${TOKENS.size.sm.height} ${TOKENS.size.sm.padding}`,
      md: `${TOKENS.size.md.height} ${TOKENS.size.md.padding}`,
      lg: `${TOKENS.size.lg.height} ${TOKENS.size.lg.padding}`,
    } satisfies Record<ComponentSize, string>,
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
```

### Structure Requirements

1. **Explicit Variant Axes Constants (Optional but Recommended)**
   - Constants for variant/size values used in `defaultVariants`
   - Improves readability and type safety
   - Example: `const DEFAULT_VARIANT = "primary" as const;`

2. **Explicit Union Types (MANDATORY)**
   - Must follow `TYPING_STANDARD.md` requirements
   - Cannot be inferred from CVA
   - Must be exported for public API

3. **Single tokenCVA Invocation**
   - Exactly one `tokenCVA` call per variant set
   - Variants defined **inline** within the `variants` object
   - No intermediate objects or function calls

4. **Type Constraints (MANDATORY)**
   - All variant maps **MUST** use `satisfies Record<Type, string>`
   - Ensures type safety and immediate failure on mismatch
   - See `TYPING_STANDARD.md` RULE 3

5. **No Conditional Logic**
   - Variant definitions must be static strings
   - No ternary operators, no conditional spreading
   - No function calls that generate variant objects

---

## Forbidden CVA Patterns

The following patterns are **EXPLICITLY FORBIDDEN**:

### ❌ Forbidden Pattern 1: Variant Maps in Separate Variables

```typescript
// ❌ FORBIDDEN - Variant map defined outside CVA
const variantMap = {
  primary: `${TOKENS.variant.primary.bg}`,
  secondary: `${TOKENS.variant.secondary.bg}`,
};

const componentVariants = tokenCVA({
  variants: {
    variant: variantMap, // ❌ FORBIDDEN
  },
});
```

**Why Forbidden:** Variants must be visible directly in CVA config. External objects hide variant definitions.

### ❌ Forbidden Pattern 2: Function Calls Generating Variant Objects

```typescript
// ❌ FORBIDDEN - Function generates variant object
function getVariantClasses(variant: string) {
  return `${TOKENS.variant[variant].bg}`;
}

const componentVariants = tokenCVA({
  variants: {
    variant: {
      primary: getVariantClasses("primary"), // ❌ FORBIDDEN
      secondary: getVariantClasses("secondary"), // ❌ FORBIDDEN
    },
  },
});
```

**Why Forbidden:** Variants must be explicit and inspectable. Function calls hide variant definitions and add procedural complexity.

### ❌ Forbidden Pattern 3: Conditional Spreading Inside CVA Config

```typescript
// ❌ FORBIDDEN - Conditional logic in CVA config
const componentVariants = tokenCVA({
  variants: {
    variant: {
      primary: `${TOKENS.variant.primary.bg}`,
      ...(condition ? { secondary: `${TOKENS.variant.secondary.bg}` } : {}), // ❌ FORBIDDEN
    },
  },
});
```

**Why Forbidden:** CVA config must be static and declarative. Conditional logic adds runtime complexity.

### ❌ Forbidden Pattern 4: Building CVA Config Dynamically

```typescript
// ❌ FORBIDDEN - Dynamic CVA config construction
const baseConfig = { base: `...` };
const variantConfig = { variants: { variant: { ... } } };
const componentVariants = tokenCVA({ ...baseConfig, ...variantConfig }); // ❌ FORBIDDEN
```

**Why Forbidden:** CVA config must be a single, static object literal. Dynamic construction hides structure.

### ❌ Forbidden Pattern 5: Reusing Variant Objects Across Components

```typescript
// ❌ FORBIDDEN - Shared variant object
const sharedVariants = {
  primary: `${TOKENS.variant.primary.bg}`,
  secondary: `${TOKENS.variant.secondary.bg}`,
};

const buttonVariants = tokenCVA({ variants: { variant: sharedVariants } }); // ❌ FORBIDDEN
const inputVariants = tokenCVA({ variants: { variant: sharedVariants } }); // ❌ FORBIDDEN
```

**Why Forbidden:** Each component must define its own variants inline. Shared objects hide component-specific variant definitions.

---

## Canonical Examples

### ✅ Example 1: Foundation Component (Button-like)

```typescript
import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { BUTTON_TOKENS } from "@/FOUNDATION/tokens/components/button";

// Explicit union types (MANDATORY)
export const BUTTON_VARIANTS = [
  "primary",
  "secondary",
  "accent",
  "outline",
  "ghost",
  "destructive",
] as const;

export type ButtonVariant = typeof BUTTON_VARIANTS[number];
export type ButtonSize = "sm" | "md" | "lg";

// Single tokenCVA invocation with variants inline
export const buttonVariants = tokenCVA({
  base: `inline-flex items-center justify-center ${BUTTON_TOKENS.radius}`,
  variants: {
    variant: {
      primary: `${BUTTON_TOKENS.variant.primary.bg} ${BUTTON_TOKENS.variant.primary.text}`,
      secondary: `${BUTTON_TOKENS.variant.secondary.bg} ${BUTTON_TOKENS.variant.secondary.text}`,
      accent: `${BUTTON_TOKENS.variant.accent.bg} ${BUTTON_TOKENS.variant.accent.text}`,
      outline: `${BUTTON_TOKENS.variant.outline.border} ${BUTTON_TOKENS.variant.outline.text}`,
      ghost: `${BUTTON_TOKENS.variant.ghost.bg} ${BUTTON_TOKENS.variant.ghost.text}`,
      destructive: `${BUTTON_TOKENS.variant.destructive.bg} ${BUTTON_TOKENS.variant.destructive.text}`,
    } satisfies Record<ButtonVariant, string>,
    size: {
      sm: `${BUTTON_TOKENS.size.sm.height} ${BUTTON_TOKENS.size.sm.padding}`,
      md: `${BUTTON_TOKENS.size.md.height} ${BUTTON_TOKENS.size.md.padding}`,
      lg: `${BUTTON_TOKENS.size.lg.height} ${BUTTON_TOKENS.size.lg.padding}`,
    } satisfies Record<ButtonSize, string>,
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
```

### ✅ Example 2: Extension Component (Input-like)

```typescript
import { tokenCVA } from "@/FOUNDATION/lib/token-cva";
import { INPUT_TOKENS } from "@/FOUNDATION/tokens/components/input";

// Explicit union types (MANDATORY)
export type InputVariant = "primary" | "secondary" | "outline" | "ghost" | "destructive";
export type InputSize = "sm" | "md" | "lg";
export type InputState = "default" | "disabled" | "error" | "success";

// Constants for defaultVariants (recommended)
const DEFAULT_VARIANT = "outline" as const;
const DEFAULT_SIZE = "md" as const;
const DEFAULT_STATE = "default" as const;

// Single tokenCVA invocation with variants inline
export const inputVariants = tokenCVA({
  base: `flex ${INPUT_TOKENS.base}`,
  variants: {
    variant: {
      primary: `${INPUT_TOKENS.variant.primary.border} ${INPUT_TOKENS.variant.primary.background}`,
      secondary: `${INPUT_TOKENS.variant.secondary.border} ${INPUT_TOKENS.variant.secondary.background}`,
      outline: `${INPUT_TOKENS.variant.outline.border} ${INPUT_TOKENS.variant.outline.background}`,
      ghost: `${INPUT_TOKENS.variant.ghost.border} ${INPUT_TOKENS.variant.ghost.background}`,
      destructive: `${INPUT_TOKENS.variant.destructive.border} ${INPUT_TOKENS.variant.destructive.background}`,
    } satisfies Record<InputVariant, string>,
    size: {
      sm: `${INPUT_TOKENS.size.sm.height} ${INPUT_TOKENS.size.sm.padding}`,
      md: `${INPUT_TOKENS.size.md.height} ${INPUT_TOKENS.size.md.padding}`,
      lg: `${INPUT_TOKENS.size.lg.height} ${INPUT_TOKENS.size.lg.padding}`,
    } satisfies Record<InputSize, string>,
    state: {
      default: `${INPUT_TOKENS.state.border.default} ${INPUT_TOKENS.state.background.default}`,
      disabled: `${INPUT_TOKENS.state.border.disabled} ${INPUT_TOKENS.state.background.disabled}`,
      error: `${INPUT_TOKENS.state.border.error} ${INPUT_TOKENS.state.background.default}`,
      success: `${INPUT_TOKENS.state.border.success} ${INPUT_TOKENS.state.background.default}`,
    } satisfies Record<InputState, string>,
  },
  defaultVariants: {
    variant: DEFAULT_VARIANT,
    size: DEFAULT_SIZE,
    state: DEFAULT_STATE,
  },
});
```

### ✅ Example 3: Simple Component (Text-like)

```typescript
import { cva } from "class-variance-authority";
import { TEXT_TOKENS } from "@/FOUNDATION/tokens/components/text";

// Explicit union types (MANDATORY)
export const TEXT_SIZES = ["xs", "sm", "md", "lg", "xl"] as const;
export type TextSize = typeof TEXT_SIZES[number];
export type TextWeight = "normal" | "medium" | "semibold" | "bold";

// Single cva invocation with variants inline
export const textVariants = cva("text-foreground", {
  variants: {
    size: {
      xs: TEXT_TOKENS.fontSize.xs,
      sm: TEXT_TOKENS.fontSize.sm,
      md: TEXT_TOKENS.fontSize.md,
      lg: TEXT_TOKENS.fontSize.lg,
      xl: TEXT_TOKENS.fontSize.xl,
    } satisfies Record<TextSize, string>,
    weight: {
      normal: TEXT_TOKENS.fontWeight.normal,
      medium: TEXT_TOKENS.fontWeight.medium,
      semibold: TEXT_TOKENS.fontWeight.semibold,
      bold: TEXT_TOKENS.fontWeight.bold,
    } satisfies Record<TextWeight, string>,
    muted: {
      true: "text-muted-foreground",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "normal",
    muted: false,
  },
});
```

---

## Pipeline 18A Integration

CVA structure validation is **mandatory** at the following Pipeline steps:

### STEP 3 — Duplication & Internal Pattern Alignment

**CVA Validation Checkpoint:**
- ✅ Validate CVA structure against canonical style
- ✅ Check for forbidden patterns (variant maps in variables, function calls, conditional logic)
- ✅ Verify variants are defined inline within CVA config
- ✅ Document any deviations in audit report

**Blocking Condition:** Non-canonical CVA structure is a **BLOCKER** and must be fixed before proceeding.

### STEP 7 — Type System Alignment

**CVA Validation Checkpoint:**
- ✅ Ensure CVA structure matches canonical variant/type layout
- ✅ Verify explicit union types exist (see `TYPING_STANDARD.md`)
- ✅ Verify `satisfies Record<Type, string>` constraints are present
- ✅ Ensure no CVA-derived types leak into public API
- ✅ **Ensure CVA usage matches Decision Matrix authority table** (tokenCVA vs cva selection)

**Blocking Condition:** CVA structure that violates canonical style, typing rules, OR Decision Matrix requirements is a **BLOCKER**.

### STEP 9 — Mandatory FIX & Consolidation

**CVA Normalization (MANDATORY):**
- ✅ If CVA structure deviates from canonical style, **MUST** normalize to canonical pattern
- ✅ Remove intermediate variant objects
- ✅ Inline all variant definitions
- ✅ Remove conditional logic from CVA config
- ✅ Ensure single tokenCVA invocation per variant set
- ✅ **Normalize CVA type if non-canonical** (tokenCVA vs cva decision per Decision Matrix)

**CVA Type Normalization:**
- ✅ If component has token-driven axes → **MUST** migrate to tokenCVA
- ✅ If component has only boolean flags → **MAY** use cva (if currently using tokenCVA, document rationale)
- ✅ If Foundation component uses cva → **MUST** document explicit rationale in audit report

**Blocking Condition:** Component cannot proceed to STEP 10 if CVA structure is non-canonical OR if CVA type does not match Decision Matrix requirements.

---

## Enforcement Rules

### Violation Classification

**Non-Canonical CVA Structure:** **BLOCKER**

Any deviation from canonical CVA structure is classified as a **BLOCKER** and must be fixed before:
- STEP 3 cannot be closed
- Component cannot proceed to STEP 10
- Deviation must be fixed or explicitly rejected with rationale

### On Violation

When non-canonical CVA structure is detected:

1. **STEP cannot be closed** - Current step must remain open until structure is canonical
2. **Component cannot proceed** - Component cannot advance to STEP 10 (Validation) until CVA is canonical
3. **Deviation must be fixed or explicitly rejected** - Either normalize to canonical style or document explicit rejection with architectural rationale

---

## Migration Policy

### Locked Components

**Default:** **NO CHANGE**

Locked components (Foundation layer) follow the default policy: **NO CHANGE** unless explicitly required.

**Allowed via Exception:** Changes to locked components require `LOCKED_CHANGE_EXCEPTION` protocol:
- Exception must be declared in audit report STEP 8
- Exception must include: reason, pipeline step, why lock is insufficient, risk assessment, rollback strategy
- Changes must match exception scope (minimal delta only)

### Unlocked Components

**Mandatory:** **YES**

Unlocked components (Extension layer, components in Pipeline 18A) **MUST** follow canonical CVA style:
- Normalization is **mandatory** during Pipeline 18A execution
- Non-canonical structure is a **BLOCKER** at STEP 3, STEP 7, STEP 9
- Component cannot proceed to STEP 10 until CVA structure is canonical

---

## Related Documents

**Typing Standards:**
- 📖 [TYPING_STANDARD.md](../../reference/TYPING_STANDARD.md) - Explicit union types requirement (complements CVA structure)

**Pipeline Documentation:**
- 📖 [COMPONENT_REFACTORING_PIPELINE.md](../../workflows/foundation/COMPONENT_REFACTORING_PIPELINE.md) - Pipeline 18A with CVA validation checkpoints

**Architecture Context:**
- 📖 [ARCHITECTURE_CONTEXT.md](../../ARCHITECTURE_CONTEXT.md) - References this document for CVA canonical style

---

## Status

This document is:

- ✅ **MANDATORY**
- ✅ **CANONICAL**
- ✅ **ENFORCED**
- ✅ **IMMUTABLE**
- ❌ **NOT OPTIONAL**
- ❌ **NOT A STYLE GUIDE**

---

**Version History:**

- **v1.1.0** (2025-12-25): CVA Usage Decision Matrix added
  - Added mandatory Decision Matrix for tokenCVA vs cva selection
  - Established canonical rules (RULE 1-3) with BLOCKER enforcement
  - Added normative table mapping components to required CVA type
  - Integrated Decision Matrix validation into Pipeline 18A (STEP 3, 7, 9)
  - Defined migration policy for non-compliant locked components
  - Added validation logic and usage examples

- **v1.0.0** (2025-12-19): Initial canonical CVA style authority contract
  - Established mandatory CVA structure pattern
  - Defined forbidden patterns
  - Integrated with Pipeline 18A validation checkpoints
  - Defined enforcement rules and migration policy

