# Interactive Wrapper Layout Contract

**Version:** 1.0  
**Date Created:** 2026-01-06  
**Status:** ✅ **LOCKED / ACTIVE**  
**Authority Domain:** Component Architecture / Layout Contracts

---

## Lock Status

**Lock Date:** 2026-01-06  
**Task Reference:** TUI_INTERACTIVE_WRAPPER_LAYOUT_LOCK_AND_CROSSLINKS  
**Lock Type:** Architectural Contract Lock

This contract is **LOCKED** and **MANDATORY** for all interactive wrapper-capable components. The contract is **immutable** and cannot be modified without an explicit unlock task that provides architectural justification and impact analysis.

**Lock Semantics:**
- This contract defines mandatory architectural rules for interactive components that wrap layout content
- All wrapper-capable interactive components MUST comply with this contract
- Changes to this contract require explicit unlock procedure with full architectural review
- Violations of this contract are considered architectural breaches

---

## Purpose

This document formally defines the **Interactive Wrapper Layout Contract** - a mandatory architectural rule that prevents layout bugs when interactive components wrap layout content (Card, Panel, Box) in grid/flex containers.

**Problem Statement:** Interactive components using inline or inline-flex layout break grid/flex compositions when wrapping block-level content. This contract ensures proper layout behavior.

**Reference Case:** Link component (`variant='link'`) was fixed to use block-level layout when wrapping Card components. See [LINK_BASELINE_REPORT.md](../reports/audit/LINK_BASELINE_REPORT.md) (lines 1529-1575).

---

## Contract Definition

### Interactive Wrapper Layout Contract

> **Interactive components that can wrap layout content MUST use block-level layout (block or flex), not inline or inline-flex.**

**Key Principles:**

1. **Wrapper-capable components** (accept children, have onClick/href) that may wrap Card/Panel/Box MUST use block-level layout
2. **Atomic components** (single interactive elements) MAY use inline/inline-flex layout
3. **No usage-level workarounds** are allowed - layout contract must be enforced at component level

---

## When Block-Level Layout is Mandatory

### Mandatory Conditions

Block-level layout is **MANDATORY** when ALL of the following conditions are met:

1. ✅ Component accepts `children: React.ReactNode`
2. ✅ Component has interactivity (`onClick` or `href` prop)
3. ✅ Component MAY wrap layout content (Card, Panel, Box, or other layout primitives)
4. ✅ Component is used in grid/flex container contexts

### Layout Requirements

**Required Layout Tokens:**
- `display: block` or `display: flex` (NOT `inline` or `inline-flex`)
- `width: 100%` (for full-width behavior in grid/flex containers)
- Proper height propagation (for flex containers)

**Token Pattern:**
```typescript
// ✅ CORRECT: Block-level layout token
layoutBlock: "block w-full"

// ❌ FORBIDDEN: Inline layout token for wrapper-capable component
layout: "inline-flex items-center" // Only allowed for atomic components
```

---

## Examples

### ✅ CORRECT: Link Component (Fixed)

**Implementation:**
```typescript
// Token definition
export const LINK_TOKENS = {
  layout: "inline-flex items-center justify-center whitespace-nowrap", // Atomic usage
  layoutBlock: "block w-full", // Wrapper usage
} as const;

// CVA variants
const linkVariants = tokenCVA({
  variants: {
    variant: {
      link: `${LINK_TOKENS.layoutBlock} ...`, // Block-level for wrapper
      primary: `${LINK_TOKENS.layout} ...`, // Inline-flex for atomic
      // ... other variants
    },
  },
});
```

**Usage:**
```tsx
// ✅ CORRECT: Link wrapping Card (uses layoutBlock)
<Link href="/event" variant="link">
  <Card>
    <CardHeader>Event Title</CardHeader>
    <CardBody>Event description</CardBody>
  </Card>
</Link>

// ✅ CORRECT: Link as atomic button (uses inline-flex)
<Link href="/signup" variant="primary" size="lg">
  Sign Up
</Link>
```

**Result:** Link with `variant='link'` stretches to full width in grid/flex containers, properly wrapping Card content.

---

### ❌ INCORRECT: Inline Layout for Wrapper

**Violation Example:**
```typescript
// ❌ FORBIDDEN: Inline-flex for wrapper-capable component
export const CHIP_TOKENS = {
  layout: "inline-flex items-center gap-xs", // Violates contract if Chip wraps Card
} as const;
```

**Problem:** If Chip wraps Card in a grid container, `inline-flex` prevents proper width stretching and height propagation.

**Fix Required:**
```typescript
// ✅ CORRECT: Block-level layout for wrapper usage
export const CHIP_TOKENS = {
  layout: "inline-flex items-center gap-xs", // Atomic usage
  layoutBlock: "block w-full", // Wrapper usage (if intended)
} as const;
```

---

### ✅ CORRECT: Atomic Component (Inline Allowed)

**Example: Button Component**

```typescript
// ✅ CORRECT: Atomic component uses inline-flex
const buttonVariants = tokenCVA({
  base: `inline-flex items-center justify-center ...`, // Atomic usage
});
```

**Rationale:** Button is semantically an atomic action trigger, not a wrapper. It does not wrap Card/Panel/Box content.

---

## Non-Goals (Atomic Components)

### Atomic Components Are Excluded

The following components are **EXCLUDED** from this contract:

1. **Button** - Atomic action trigger (not wrapper-capable)
2. **IconButton** - Atomic icon trigger (not wrapper-capable)
3. **Switch** - Atomic toggle control (not wrapper-capable)
4. **Checkbox** - Atomic form control (not wrapper-capable)
5. **Radio** - Atomic form control (not wrapper-capable)

**Rationale:** Atomic components represent single interactive elements. They are not intended to wrap layout content and may use inline/inline-flex layout.

### Determining Atomic vs Wrapper-Capable

**Atomic Component Criteria:**
- Single interactive element (button, toggle, form control)
- Does not wrap complex layout content
- Semantic role: action trigger, form control, toggle
- Layout: inline/inline-flex acceptable

**Wrapper-Capable Component Criteria:**
- Accepts `children: React.ReactNode`
- Has interactivity (`onClick` or `href`)
- May wrap Card, Panel, Box, or other layout primitives
- Layout: block-level required

---

## Enforcement

### Component Creation Checklist

When creating new interactive components, verify:

1. ✅ Does component accept `children`?
2. ✅ Does component have `onClick` or `href`?
3. ✅ May component wrap Card/Panel/Box?
4. ✅ If YES to all: Use block-level layout (`block` or `flex` with `w-full`)

### Code Review Checklist

When reviewing component changes:

1. ✅ Check layout tokens for wrapper-capable components
2. ✅ Verify `inline-flex` is not used for wrapper-capable components
3. ✅ Confirm `layoutBlock` token exists if wrapper usage is intended
4. ✅ Validate Storybook examples demonstrate wrapper usage (if intended)

### Token System Pattern

**Standard Pattern for Wrapper-Capable Components:**

```typescript
export const COMPONENT_TOKENS = {
  // Atomic usage (inline-flex)
  layout: "inline-flex items-center ...",
  
  // Wrapper usage (block-level)
  layoutBlock: "block w-full",
} as const;
```

**CVA Variant Pattern:**

```typescript
const componentVariants = tokenCVA({
  variants: {
    variant: {
      // Wrapper variant uses layoutBlock
      wrapper: `${COMPONENT_TOKENS.layoutBlock} ...`,
      // Atomic variants use layout
      primary: `${COMPONENT_TOKENS.layout} ...`,
      secondary: `${COMPONENT_TOKENS.layout} ...`,
    },
  },
});
```

---

## Related Documents

- **Audit Report:** [INTERACTIVE_WRAPPER_LAYOUT_AUDIT.md](../reports/audit/INTERACTIVE_WRAPPER_LAYOUT_AUDIT.md)
- **Reference Fix:** [LINK_BASELINE_REPORT.md](../reports/audit/LINK_BASELINE_REPORT.md) (lines 1529-1575)
- **Link Tokens:** [link.ts](../../src/FOUNDATION/tokens/components/link.ts)
- **Layout Authority:** [LAYOUT_AUTHORITY.md](./LAYOUT_AUTHORITY.md)

---

## Change History

- **2026-01-06:** Initial contract definition based on Link component fix and audit findings

---

**This contract is LOCKED / ACTIVE and MANDATORY for all interactive wrapper-capable components.**

