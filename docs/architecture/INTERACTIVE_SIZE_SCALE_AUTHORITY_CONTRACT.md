# Interactive Size Scale Authority Contract

**Status:** ✅ LOCKED  
**Priority:** CRITICAL  
**Date Created:** 2025-12-18  
**Date Locked:** 2025-12-18  
**Version:** 1.0  
**Enforcement:** TUNG_ARCH_LOCK: INTERACTIVE_SIZE_SCALE_CANONICALIZATION  
**Reference Component:** Button (`src/PRIMITIVES/Button/Button.tsx`)

---

## Document Classification

**TYPE:** AUTHORITY  
**MUTABILITY:** IMMUTABLE  
**LOCK STATUS:** ✅ LOCKED  
**AUTHORITY DOMAIN:** Interactive Size Scale Authority

**Purpose:** This document defines the canonical meaning, scope, and allowed usage of `size` across the Tenerife UI architecture. It establishes architectural law that cannot be changed without explicit unlock procedure.

---

## Overview

This document formalizes the **meaning, scope, and allowed usage of `size`** across the Tenerife UI architecture. This is a **FOUNDATION-LEVEL ARCHITECTURAL LOCK** that prevents scale drift, accessibility risks, semantic ambiguity, and inconsistency between interactive components.

**Key Principle:** `size` is an **INTERACTIVE SCALE** that represents hit-area, vertical rhythm, focus/keyboard accessibility, and user interaction affordance. It does NOT represent font size alone, visual density, or layout dimensions.

---

## Authority Chain

**Interactive Size Scale Authority** is the single source of truth for all interactive size behavior across all UI components in the design system.

**Authority Hierarchy:**
1. **Interactive Size Scale Authority Contract** (this document) - Defines rules and patterns
2. **Component Implementation** - Button component is the reference implementation
3. **Token System** - Provides size-specific tokens (height, padding, font-size)
4. **CSS Layer** - Applies size classes via CVA variants
5. **Browser Native** - Executes size-based interaction affordances

---

## Canonical Definition of `size`

### Primary Definition

> **`size` is an INTERACTIVE SCALE.**

It represents:
- **Hit-area** - The interactive target area for user interactions
- **Vertical rhythm** - The vertical spacing and alignment of interactive elements
- **Focus / keyboard accessibility** - The size of focus indicators and keyboard navigation targets
- **User interaction affordance** - The visual and tactile indication of interactive capability

It does NOT represent:
- ❌ Font size alone
- ❌ Visual density
- ❌ Layout dimensions

### Semantic Scope

The `size` prop is **exclusively** for interactive components that require:
- User interaction (click, focus, keyboard navigation)
- Hit-area sizing for accessibility
- Visual alignment with other interactive elements
- Consistent interaction affordance across the design system

---

## Canonical Interactive Size Scale

### The ONLY Allowed Scale

The **ONLY** allowed `size` scale for interactive components is:

```typescript
type InteractiveSize = "sm" | "md" | "lg";
```

This scale is **defined by Button** and shared by all interactive elements.

### Scale Ownership

**Button component** (`src/PRIMITIVES/Button/Button.tsx`) is the **canonical owner** of the interactive size scale. All other interactive components MUST align with Button's size scale.

**Rule:** Button defines the reference implementation. All interactive components must visually align with Button size.

### Forbidden Sizes

The following sizes are **FORBIDDEN** for interactive components:

- ❌ `xs` (extra small) - Not part of interactive scale
- ❌ `xl` (extra large) - Not part of interactive scale
- ❌ Any other custom sizes - Only `sm`, `md`, `lg` are allowed

**Rationale:** Interactive scale must be consistent across all interactive elements. Additional sizes create scale drift and accessibility risks.

---

## Component Classification

### 🟢 INTERACTIVE COMPONENTS (STRICT)

These components **MUST**:

- ✅ Use `size` prop
- ✅ Use **ONLY** `sm | md | lg`
- ✅ Visually align with Button size

**Includes:**

- **Button** - Reference implementation (`src/PRIMITIVES/Button/Button.tsx`)
- **Link** (CTA / button-like) - Must align with Button size (`src/PRIMITIVES/Link/Link.tsx`)
- **Input** - Interactive form input
- **Select** - Interactive dropdown selection
- **TextField** - Interactive text input
- **Checkbox** - Interactive selection control
- **Radio** - Interactive selection control
- **Switch** - Interactive toggle control

**Rule:** All interactive components MUST use the canonical interactive size scale (`sm | md | lg`) and visually align with Button size.

**Forbidden:**
- ❌ `xs` and `xl` are FORBIDDEN for interactive components
- ❌ Custom size scales are FORBIDDEN
- ❌ Size scales that don't align with Button are FORBIDDEN

---

### 🟡 SEMI-INTERACTIVE / DECORATIVE (RESTRICTED)

These components:

- ✅ **MUST NOT** use `size` as interactive scale
- ✅ **MAY** have their own sizing props (e.g., `iconSize`, `dimension`, `density`)

**Includes:**

- **Icon** → `iconSize` / `dimension` (NOT `size`)
- **Badge / Chip / Tag** → `variant` or `density` (NOT `size`)
- **Avatar** → `dimension` (NOT `size`)

**Rule:** Semi-interactive components MUST NOT use `size` as interactive scale. They may have their own sizing props with different names.

**Architectural Debt:**
- If `size` exists historically in these components, it is considered **architectural debt**
- Future refactors should migrate to appropriate prop names (`iconSize`, `dimension`, `density`)

---

### ❌ NON-INTERACTIVE COMPONENTS (FORBIDDEN)

These components **MUST NOT** use `size` at all:

- **Layout primitives** (Card, Stack, Grid, Section)
- **Containers**
- **Wrappers**

**Sizing Expression:**

Non-interactive components MUST express sizing via:

- ✅ `padding` - Spacing tokens
- ✅ `gap` - Spacing tokens
- ✅ `density` - Density tokens
- ✅ `variant` - Variant-based sizing

**Rule:** Non-interactive components MUST NOT use `size` prop. Sizing must be expressed through spacing, density, or variant props.

---

## Token Relationship

### Interactive `size` Maps To

Interactive `size` maps to:

- ✅ **Height tokens** - Vertical hit-area sizing
- ✅ **Padding tokens** - Internal spacing for interaction affordance
- ✅ **Font-size tokens** (indirectly) - Text sizing within interactive elements
- ✅ **Gap tokens** - Spacing between interactive element content

**Example (Button):**
```typescript
size: {
  sm: `${BUTTON_TOKENS.height.sm} ${BUTTON_TOKENS.padding.horizontal.sm} ${BUTTON_TOKENS.fontSize.sm} ${BUTTON_TOKENS.gap.sm}`,
  md: `${BUTTON_TOKENS.height.md} ${BUTTON_TOKENS.padding.horizontal.md} ${BUTTON_TOKENS.fontSize.md} ${BUTTON_TOKENS.gap.md}`,
  lg: `${BUTTON_TOKENS.height.lg} ${BUTTON_TOKENS.padding.horizontal.lg} ${BUTTON_TOKENS.fontSize.lg} ${BUTTON_TOKENS.gap.lg}`,
}
```

### Typography Scale Separation

Typography scale (`xs`, `xl`, etc.) belongs **ONLY** to:

- ✅ **Text** - Typography component
- ✅ **Heading** - Typography component
- ✅ **Label** - Typography component

**Rule:** Typography scale (`xs`, `sm`, `md`, `lg`, `xl`) is SEPARATE from interactive size scale (`sm`, `md`, `lg`). These token systems MUST NOT be mixed.

**Forbidden:**
- ❌ Using typography scale (`xs`, `xl`) for interactive components
- ❌ Using interactive scale (`sm`, `md`, `lg`) for typography components
- ❌ Mixing typography and interactive scales in the same component

---

## Enforcement Strategy

### Immediate (LOCK)

**No new component may introduce:**

- ❌ `size` outside interactive scope
- ❌ `xs` / `xl` for interactive components
- ❌ Custom size scales for interactive components
- ❌ `size` for non-interactive components

**Rule:** All new components MUST comply with Interactive Size Scale Authority from creation.

### Gradual (DEBT)

**Existing misuse is allowed temporarily:**

- ✅ Existing components with `xs` / `xl` sizes are allowed (architectural debt)
- ✅ Existing components using `size` incorrectly are allowed (architectural debt)
- ✅ Must be flagged during refactors
- ✅ No forced mass-migration in this task

**Rule:** Existing violations are architectural debt. They must be addressed during component refactors, but are not required to be fixed immediately.

---

## Forbidden Actions

The following actions are **FORBIDDEN**:

### ❌ Adding New Interactive Sizes

```typescript
// ❌ FORBIDDEN
type InteractiveSize = "sm" | "md" | "lg" | "xl" | "2xl";

// ✅ CORRECT
type InteractiveSize = "sm" | "md" | "lg";
```

### ❌ Reintroducing `xs` / `xl` to Button or Link

```typescript
// ❌ FORBIDDEN
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

// ✅ CORRECT
type ButtonSize = "sm" | "md" | "lg" | "icon";
```

**Note:** `icon` is a special case for Button (icon-only button), not an interactive size scale value.

### ❌ Using `size` for Typography or Layout

```typescript
// ❌ FORBIDDEN
<Text size="sm">Text content</Text>  // Typography should use typography scale
<Card size="md">Card content</Card>  // Layout should use padding/gap

// ✅ CORRECT
<Text size="sm">Text content</Text>  // Typography has its own scale (xs, sm, md, lg, xl)
<Card padding="md" gap="sm">Card content</Card>  // Layout uses spacing tokens
```

### ❌ Expanding Button Scale to Fit Other Components

```typescript
// ❌ FORBIDDEN - Don't add sizes to Button to accommodate other components
type ButtonSize = "sm" | "md" | "lg" | "xs" | "xl";  // Adding xs/xl for other components

// ✅ CORRECT - Other components align with Button, not vice versa
type ButtonSize = "sm" | "md" | "lg" | "icon";
type LinkSize = "sm" | "md" | "lg";  // Aligns with Button
```

**Rule:** Button is the reference. Other components align with Button, not the other way around.

---

## Reference Implementation

**Button Component** (`src/PRIMITIVES/Button/Button.tsx`) is the reference implementation for Interactive Size Scale Authority.

### Reference Implementation Scope

**Button demonstrates:**

- ✅ Canonical interactive size scale (`sm`, `md`, `lg`, `icon`)
- ✅ Size-to-token mapping (height, padding, font-size, gap)
- ✅ Visual alignment with other interactive components
- ✅ Accessibility-compliant hit-area sizing

**Button is NOT a reference for:**

- ❌ Typography sizing (Text, Heading, Label have their own scales)
- ❌ Layout sizing (Card, Stack, Grid use spacing tokens)
- ❌ Icon sizing (Icon component has `iconSize` prop)

**All interactive components** (Link, Input, Select, Checkbox, Radio, Switch) must follow Button's size scale, but may have different visual styles and token structures.

---

## Component Requirements

### Required Props

**All interactive components MUST support:**

- `size?: "sm" | "md" | "lg"` - Interactive size scale (required for interactive components)

### Required Type Definitions

**All interactive components MUST define:**

```typescript
export type ComponentSize = "sm" | "md" | "lg";
```

**Forbidden:**
- ❌ `xs` or `xl` in interactive component size types
- ❌ Custom size scales
- ❌ Size scales that don't align with Button

### Required Token Mapping

**All interactive components MUST map size to:**

- Height tokens
- Padding tokens (horizontal and vertical)
- Font-size tokens (indirectly)
- Gap tokens (if applicable)

**Rule:** Size must map to tokens, not raw values.

---

## Related Documents

- `docs/architecture/FINAL_FOUNDATION_LOCK.md` - Foundation lock status (Interactive Size Scale Authority lock section)
- `src/PRIMITIVES/Button/Button.tsx` - Reference implementation
- `src/PRIMITIVES/Link/Link.tsx` - Interactive component example
- `docs/architecture/LINK_NO_ASCHILD_CANONICAL_ANCHOR.md` - 🔒 **LOCKED** Link architectural lock: first-class semantic anchor, `asChild` FORBIDDEN
- `docs/architecture/TYPOGRAPHY_AUTHORITY_CONTRACT.md` - Typography scale (separate from interactive scale)
- `docs/architecture/SPACING_AUTHORITY_CONTRACT.md` - Spacing tokens (for layout sizing)

---

## Architectural Note

This lock prioritizes:

- ✅ **Accessibility** - Consistent hit-area sizing across interactive elements
- ✅ **Predictability** - Single, well-defined interactive size scale
- ✅ **System coherence** - Unified interaction affordance

Over:

- ❌ Maximum flexibility
- ❌ Visual micro-optimizations
- ❌ Component-specific size scales

**Rule:** System coherence and accessibility take priority over component-specific flexibility.

---

**Last Updated:** 2025-12-18  
**Version:** 1.0  
**Lock Status:** ✅ LOCKED - Only changes allowed via explicit 'Unlock Interactive Size Scale Authority' task

