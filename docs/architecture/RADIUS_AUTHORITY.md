# Radius Authority Contract

**Status:** ✅ LOCKED  
**Priority:** BLOCKER  
**Date Created:** 2025-12-16  
**Version:** 1.1  
**Enforcement:** TUNG_TOKEN_AUTHORITY_EXPANSION_PLAN

---

## Document Classification

**TYPE:** AUTHORITY  
**MUTABILITY:** IMMUTABLE  
**LOCK STATUS:** ✅ LOCKED  
**AUTHORITY DOMAIN:** Radius Authority

**Purpose:** This document defines the canonical declarative rules for border radius token usage across all UI components. It establishes architectural law that cannot be changed without explicit unlock procedure.

---

## Overview

This document defines the canonical Radius Authority contract for all UI components. It establishes the rules for border radius token usage, ensuring consistent visual harmony and design system coherence.

**Key Principle:** All border radius values must come from the canonical radius token system. Components cannot introduce arbitrary border radius values that break visual consistency.

---

## Canonical Token Scale Table

The following table defines the canonical radius token scale with key, meaning, and example values:

| Key | Meaning | Example Value |
|-----|---------|---------------|
| `borderRadius.none` | No radius | `0` |
| `borderRadius.xs` | Extra small | `0.125rem` (2px) |
| `borderRadius.sm` | Small (base unit) | `0.25rem` (4px) |
| `borderRadius.md` | Medium | `0.375rem` (6px) |
| `borderRadius.lg` | Large | `0.5rem` (8px) |
| `borderRadius.xl` | Extra large | `0.75rem` (12px) |
| `borderRadius["2xl"]` | 2XL | `1rem` (16px) |
| `borderRadius["3xl"]` | 3XL | `1.5rem` (24px) |
| `borderRadius.full` | Full (circular) | `9999px` |
| `componentRadius.button.md` | Button (default) | `borderRadius.md` (6px) |
| `componentRadius.card.md` | Card (default) | `borderRadius.md` (6px) |
| `componentRadius.input.md` | Input (default) | `borderRadius.md` (6px) |
| `componentRadius.badge.md` | Badge (default) | `borderRadius.sm` (4px) |
| `componentRadius.modal.md` | Modal (default) | `borderRadius.lg` (8px) |
| `componentRadius.toast.md` | Toast (default) | `borderRadius.lg` (8px) |

**Rule:** All radius tokens must reference values from this canonical scale. The scale is based on a 4px base unit, with `full` as a special case for circular shapes.

---

## Authority Chain

**Radius Authority** is the single source of truth for all border radius values across all UI components in the design system.

**Authority Hierarchy:**
1. **Radius Authority Contract** (this document) - Defines rules and constraints
2. **Token System** - `src/tokens/radius.ts` provides canonical token definitions
3. **Component Implementation** - Components consume radius tokens only
4. **Visual System** - Radius tokens ensure consistent visual harmony

---

## Canonical Token Scale

The Radius Authority defines two levels of radius tokens:

### 1. Base Radius Scale

The base radius scale is built on a 4px base unit (0.25rem).

**Canonical Values:**
- `none` → `0` (no radius, sharp corners)
- `xs` → `0.125rem` (2px - extra small)
- `sm` → `0.25rem` (4px - small, base unit)
- `base` → `0.25rem` (4px - alias for sm, default)
- `md` → `0.375rem` (6px - medium)
- `lg` → `0.5rem` (8px - large, 2 × base)
- `xl` → `0.75rem` (12px - extra large, 3 × base)
- `2xl` → `1rem` (16px - 2XL, 4 × base)
- `3xl` → `1.5rem` (24px - 3XL, 6 × base)
- `full` → `9999px` (circular, pill shape)

**Rule:** All base radius values follow a consistent scale based on the 4px base unit, with `full` as a special case for circular shapes.

### 2. Component-Specific Radius Standards

Component-specific radius standards provide recommended radius values for different component types.

**Canonical Component Standards:**

**Button:**
- `button.sm` → `borderRadius.sm` (4px - compact buttons)
- `button.md` → `borderRadius.md` (6px - default buttons)
- `button.lg` → `borderRadius.lg` (8px - large buttons)
- `button.pill` → `borderRadius.full` (full - pill buttons)

**Card:**
- `card.sm` → `borderRadius.sm` (4px - compact cards)
- `card.md` → `borderRadius.md` (6px - default cards)
- `card.lg` → `borderRadius.lg` (8px - large cards)
- `card.xl` → `borderRadius.xl` (12px - feature cards)

**Input/Form Field:**
- `input.sm` → `borderRadius.sm` (4px - compact inputs)
- `input.md` → `borderRadius.md` (6px - default inputs)
- `input.lg` → `borderRadius.lg` (8px - large inputs)

**Badge/Status:**
- `badge.sm` → `borderRadius.xs` (2px - compact badges)
- `badge.md` → `borderRadius.sm` (4px - default badges)
- `badge.lg` → `borderRadius.md` (6px - large badges)
- `badge.pill` → `borderRadius.full` (full - pill badges)

**Avatar:**
- `avatar.sm` → `borderRadius.full` (full - small avatars)
- `avatar.md` → `borderRadius.full` (full - default avatars)
- `avatar.lg` → `borderRadius.full` (full - large avatars)
- `avatar.square` → `borderRadius.md` (6px - square avatars)

**Modal/Dialog:**
- `modal.sm` → `borderRadius.md` (6px - small modals)
- `modal.md` → `borderRadius.lg` (8px - default modals)
- `modal.lg` → `borderRadius.xl` (12px - large modals)
- `modal.xl` → `borderRadius["2xl"]` (16px - extra large modals)

**Tooltip:**
- `tooltip.sm` → `borderRadius.sm` (4px - default tooltips)
- `tooltip.md` → `borderRadius.md` (6px - large tooltips)

**Toast/Notification:**
- `toast.sm` → `borderRadius.md` (6px - compact toasts)
- `toast.md` → `borderRadius.lg` (8px - default toasts)
- `toast.lg` → `borderRadius.xl` (12px - large toasts)

**Chip/Tag:**
- `chip.sm` → `borderRadius.xs` (2px - compact chips)
- `chip.md` → `borderRadius.sm` (4px - default chips)
- `chip.lg` → `borderRadius.md` (6px - large chips)
- `chip.pill` → `borderRadius.full` (full - pill chips)

**Image/Media:**
- `image.none` → `borderRadius.none` (0 - sharp images)
- `image.sm` → `borderRadius.sm` (4px - subtle rounding)
- `image.md` → `borderRadius.md` (6px - default)
- `image.lg` → `borderRadius.lg` (8px - rounded)
- `image.xl` → `borderRadius.xl` (12px - very rounded)
- `image.full` → `borderRadius.full` (full - circular images)

**Rule:** Component-specific radius standards MUST map to base radius scale values. They provide component-specific semantics while maintaining visual consistency.

---

## Component Rules

### Rule 1: Token-Only Radius

**Components MUST use only radius tokens from the canonical token system.**

**Allowed Sources:**
- Base radius scale tokens (`borderRadius.none`, `borderRadius.sm`, `borderRadius.md`, etc.)
- Component-specific radius standards (`componentRadius.button.md`, `componentRadius.card.sm`, etc.)

**Forbidden:**
- ❌ Arbitrary pixel values: `border-radius: 5px`, `border-radius: 3px`
- ❌ Arbitrary rem values: `border-radius: 0.7rem`, `border-radius: 1.3rem`
- ❌ Arbitrary percentage values: `border-radius: 2.5%`
- ❌ Calculated values: `border-radius: calc(4px + 2px)`
- ❌ Component-specific radius scales outside the token system

### Rule 2: Scale System Compliance

**All radius values MUST comply with the canonical radius scale system.**

**Rule:** Radius values that are not part of the canonical scale are forbidden. The scale is based on a 4px base unit, with `full` as a special case for circular shapes.

**Forbidden:**
- ❌ Values that break the scale: `border-radius: 5px`, `border-radius: 9px`, `border-radius: 11px`
- ❌ Values that don't align with base unit: `border-radius: 0.3rem`, `border-radius: 1.1rem`

### Rule 3: Component Standard Preference

**Components SHOULD prefer component-specific radius standards when available.**

**Preference Order:**
1. Component-specific radius standards (when component type matches)
2. Base radius scale (when specific value needed)

**Example:**
- ✅ **Preferred:** `borderRadius: componentRadius.button.md` (component-specific standard)
- ✅ **Allowed:** `borderRadius: borderRadius.md` (same value, less semantic)
- ❌ **Forbidden:** `borderRadius: 6px` (arbitrary value)

### Rule 4: Semantic Mapping

**Components MUST use component-specific radius standards when they match the component type.**

**Rule:** When a component has a defined standard in `componentRadius`, it MUST use that standard rather than arbitrary base scale values.

**Examples:**
- Button component → `componentRadius.button.*`
- Card component → `componentRadius.card.*`
- Input component → `componentRadius.input.*`
- Badge component → `componentRadius.badge.*`

---

## Forbidden Patterns

### 1. Arbitrary Radius Values

**Forbidden:**
- ❌ `border-radius: 5px`
- ❌ `border-radius: 3px`
- ❌ `border-radius: 0.7rem`
- ❌ `border-radius: calc(4px + 2px)`
- ❌ `border-radius: 2.5%`

**Rationale:** Arbitrary values break visual consistency and design system coherence.

### 2. Component-Specific Radius Scales

**Forbidden:**
- ❌ Defining new radius scales within components
- ❌ Creating component-specific radius tokens outside the token system
- ❌ Overriding canonical radius values

**Rationale:** Component-specific scales create inconsistency and break the unified design system.

### 3. Scale System Violations

**Forbidden:**
- ❌ Radius values that are not part of the canonical scale
- ❌ Values that don't align with base unit: `5px`, `9px`, `11px`, `13px`, etc.

**Rationale:** Scale violations break visual harmony and design consistency.

### 4. Direct Value Usage

**Forbidden:**
- ❌ Using raw CSS values instead of tokens
- ❌ Hardcoding radius values in component code
- ❌ Calculating radius values at runtime

**Rationale:** Direct values bypass the token system and break consistency.

### 5. Inline Border Radius

**Forbidden:**
- ❌ Inline `border-radius` styles in component code
- ❌ Dynamic `border-radius` values calculated from props
- ❌ Conditional radius values based on component state

**Rationale:** Inline radius values bypass the token system and break consistency.

---

## Allowed Patterns

### 1. Token-Based Radius

**Allowed:**
- ✅ Using base radius scale tokens: `borderRadius.none`, `borderRadius.sm`, `borderRadius.md`, etc.
- ✅ Using component-specific radius standards: `componentRadius.button.md`, `componentRadius.card.sm`, etc.

**Rationale:** Token-based radius ensures consistency and maintainability.

### 2. Component Standard Mapping

**Allowed:**
- ✅ Mapping component props to component-specific radius standards
- ✅ Using base radius scale when component standard doesn't exist
- ✅ Preferring component standards over base scale when available

**Rationale:** Component standard mapping improves code readability and design system coherence.

### 3. Semantic Variants

**Allowed:**
- ✅ Using different radius tokens for different component variants (sm, md, lg)
- ✅ Using `pill` variant for circular/pill-shaped components
- ✅ Using `full` for fully circular shapes

**Rationale:** Semantic variants maintain visual consistency while allowing component flexibility.

---

## Semantic Mapping

### Component Radius Patterns

**Button Component:**
- Default variant → `componentRadius.button.md` (6px)
- Small variant → `componentRadius.button.sm` (4px)
- Large variant → `componentRadius.button.lg` (8px)
- Pill variant → `componentRadius.button.pill` (full)

**Card Component:**
- Default variant → `componentRadius.card.md` (6px)
- Compact variant → `componentRadius.card.sm` (4px)
- Large variant → `componentRadius.card.lg` (8px)
- Feature variant → `componentRadius.card.xl` (12px)

**Input Component:**
- Default variant → `componentRadius.input.md` (6px)
- Small variant → `componentRadius.input.sm` (4px)
- Large variant → `componentRadius.input.lg` (8px)

**Badge Component:**
- Default variant → `componentRadius.badge.md` (4px)
- Small variant → `componentRadius.badge.sm` (2px)
- Large variant → `componentRadius.badge.lg` (6px)
- Pill variant → `componentRadius.badge.pill` (full)

**Modal Component:**
- Default variant → `componentRadius.modal.md` (8px)
- Small variant → `componentRadius.modal.sm` (6px)
- Large variant → `componentRadius.modal.lg` (12px)
- Extra large variant → `componentRadius.modal.xl` (16px)

**Rule:** Components should use component-specific radius standards that match their type and variant, ensuring consistent visual patterns across the design system.

---

## Token System Integration

### Source of Truth

**Canonical Token Definitions:**
- Location: `src/tokens/radius.ts`
- Exports: `borderRadius`, `componentRadius`
- Types: `BorderRadius`, `ComponentRadius`

**Rule:** The token system file (`src/tokens/radius.ts`) is the single source of truth for all radius values. Components MUST reference tokens from this file, never define their own radius values.

---

## Unlock Procedure

Any Radius Authority modifications require:

1. Explicit unlock task with justification
2. Full audit of all component radius usage
3. Impact analysis of proposed changes
4. Explicit approval for changes
5. Re-verification of all components after changes
6. Re-lock with updated documentation

**Note:** Radius Authority lock applies to **BOTH humans and AI agents**. Any request to modify locked radius authority aspects **MUST** be refused with reference to the Radius Authority lock.

**Do not modify Radius Authority without explicit 'Unlock Radius Authority' task approval.**

**Note:** Future changes to Authority rules require either:
- New Authority version (e.g., `RADIUS_AUTHORITY_CONTRACT_v2.md`) with full migration path
- Explicit unlock procedure with full audit and approval

---

## Version History

- **v1.1** (2025-12-16): Formal Lock Completion
  - Changed status from ACTIVE to LOCKED
  - Formally locked as part of Foundation layer closure
  - All rules are immutable and require unlock procedure for modifications
  - Future changes require Authority versioning (v2+) or explicit unlock procedure

- **v1.0** (2025-12-16): Initial Radius Authority Contract definition
  - Defined canonical radius token scale (base, component-specific)
  - Defined component rules and forbidden patterns
  - Established as immutable authority

---

**Status:** ✅ **LOCKED**  
**Version:** 1.1  
**Date Created:** 2025-12-16  
**Last Updated:** 2025-12-16  
**Priority:** BLOCKER  
**Authority Domain:** Radius Authority
