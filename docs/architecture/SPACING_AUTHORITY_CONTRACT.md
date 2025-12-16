# Spacing Authority Contract

**Status:** ✅ LOCKED  
**Priority:** BLOCKER  
**Date Created:** 2025-12-19  
**Version:** 1.1  
**Enforcement:** TUNG_TOKEN_AUTHORITY_EXPANSION_PLAN

---

## Document Classification

**TYPE:** AUTHORITY  
**MUTABILITY:** IMMUTABLE  
**LOCK STATUS:** ✅ LOCKED  
**AUTHORITY DOMAIN:** Spacing Authority

**Purpose:** This document defines the canonical declarative rules for spacing token usage across all UI components. It establishes architectural law that cannot be changed without explicit unlock procedure.

---

## Overview

This document defines the canonical Spacing Authority contract for all UI components. It establishes the rules for spacing token usage, ensuring consistent layout rhythm and visual harmony across the design system.

**Key Principle:** All spacing values must come from the canonical spacing token system. Components cannot introduce arbitrary spacing values that break the 8px grid system.

---

## Canonical Token Scale Table

The following table defines the canonical spacing token scale with key, meaning, and example values:

| Key | Meaning | Example Value |
|-----|---------|---------------|
| `spacing[0]` | Zero spacing | `0` |
| `spacing[px]` | Single pixel | `1px` |
| `spacing[1]` | Extra small (half unit) | `0.25rem` (4px) |
| `spacing[2]` | Small (base unit) | `0.5rem` (8px) |
| `spacing[4]` | Medium (2× base) | `1rem` (16px) |
| `spacing[6]` | Large (3× base) | `1.5rem` (24px) |
| `spacing[8]` | Extra large (4× base) | `2rem` (32px) |
| `semanticSpacing.xs` | Extra small semantic | `spacing[1]` (4px) |
| `semanticSpacing.sm` | Small semantic | `spacing[2]` (8px) |
| `semanticSpacing.md` | Medium semantic | `spacing[4]` (16px) |
| `semanticSpacing.lg` | Large semantic | `spacing[6]` (24px) |
| `semanticSpacing.xl` | Extra large semantic | `spacing[8]` (32px) |
| `layoutSpacing.section.md` | Section spacing (default) | `spacing[12]` (48px) |
| `layoutSpacing.container.md` | Container padding (default) | `spacing[6]` (24px) |
| `layoutSpacing.grid.md` | Grid gap (default) | `spacing[6]` (24px) |
| `layoutSpacing.stack.md` | Stack gap (default) | `spacing[4]` (16px) |
| `layoutSpacing.component.md` | Component padding (default) | `spacing[4]` (16px) |

**Rule:** All spacing tokens must reference values from this canonical scale. The scale is based on an 8px grid system with semantic and layout-specific mappings.

---

## Authority Chain

**Spacing Authority** is the single source of truth for all spacing values across all UI components in the design system.

**Authority Hierarchy:**
1. **Spacing Authority Contract** (this document) - Defines rules and constraints
2. **Token System** - `src/tokens/spacing.ts` provides canonical token definitions
3. **Component Implementation** - Components consume spacing tokens only
4. **Layout System** - Spacing tokens ensure consistent layout rhythm

---

## Canonical Token Scale

The Spacing Authority defines three levels of spacing tokens:

### 1. Base Spacing Scale

The base spacing scale is built on an 8px grid system (base unit: 8px = 0.5rem).

**Canonical Values:**
- `0` → `0` (zero spacing)
- `px` → `1px` (single pixel)
- `0.5` → `0.125rem` (4px - half unit)
- `1` → `0.25rem` (4px - half unit, common)
- `1.5` → `0.375rem` (6px - rare, for fine adjustments)
- `2` → `0.5rem` (8px - base unit)
- `2.5` → `0.625rem` (10px - rare)
- `3` → `0.75rem` (12px - 1.5 × base)
- `3.5` → `0.875rem` (14px - rare)
- `4` → `1rem` (16px - 2 × base)
- `5` → `1.25rem` (20px - 2.5 × base)
- `6` → `1.5rem` (24px - 3 × base)
- `7` → `1.75rem` (28px - 3.5 × base)
- `8` → `2rem` (32px - 4 × base)
- Extended scale continues up to `96` → `24rem` (384px - 48 × base)

**Rule:** All base spacing values are multiples of the 8px base unit, with rare exceptions for fine adjustments (0.5, 1.5, 2.5, 3.5, 7, 9, 11, 14, etc.).

### 2. Semantic Spacing Tokens

Semantic spacing tokens provide named values for common spacing use cases.

**Canonical Values:**
- `xs` → maps to `spacing[1]` (4px - extra small, tight, minimal)
- `sm` → maps to `spacing[2]` (8px - small, compact)
- `md` → maps to `spacing[4]` (16px - medium, default)
- `lg` → maps to `spacing[6]` (24px - large, spacious)
- `xl` → maps to `spacing[8]` (32px - extra large, very spacious)
- `2xl` → maps to `spacing[12]` (48px - section-level)
- `3xl` → maps to `spacing[16]` (64px - major sections)
- `4xl` → maps to `spacing[20]` (80px - page sections)
- `5xl` → maps to `spacing[24]` (96px - hero sections)
- `none` → maps to `spacing[0]` (0 - no spacing)

**Rule:** Semantic spacing tokens MUST map to base spacing scale values. They provide semantic meaning while maintaining grid consistency.

### 3. Layout Spacing Tokens

Layout spacing tokens provide spacing for common layout patterns.

**Canonical Categories:**

**Section Spacing** (vertical spacing between major sections):
- `section.xs` → `spacing[6]` (24px - compact sections)
- `section.sm` → `spacing[8]` (32px - small sections)
- `section.md` → `spacing[12]` (48px - default sections)
- `section.lg` → `spacing[16]` (64px - large sections)
- `section.xl` → `spacing[20]` (80px - extra large sections)
- `section.2xl` → `spacing[24]` (96px - hero sections)

**Container Spacing** (padding inside containers):
- `container.xs` → `spacing[2]` (8px - tight containers)
- `container.sm` → `spacing[4]` (16px - compact containers)
- `container.md` → `spacing[6]` (24px - default containers)
- `container.lg` → `spacing[8]` (32px - spacious containers)
- `container.xl` → `spacing[12]` (48px - very spacious containers)

**Grid Spacing** (gap between grid items):
- `grid.xs` → `spacing[2]` (8px - tight grids)
- `grid.sm` → `spacing[4]` (16px - compact grids)
- `grid.md` → `spacing[6]` (24px - default grids)
- `grid.lg` → `spacing[8]` (32px - spacious grids)
- `grid.xl` → `spacing[12]` (48px - very spacious grids)

**Stack Spacing** (gap between stacked items):
- `stack.xs` → `spacing[1]` (4px - tight stacks)
- `stack.sm` → `spacing[2]` (8px - compact stacks)
- `stack.md` → `spacing[4]` (16px - default stacks)
- `stack.lg` → `spacing[6]` (24px - spacious stacks)
- `stack.xl` → `spacing[8]` (32px - very spacious stacks)

**Component Spacing** (padding inside components):
- `component.xs` → `spacing[1]` (4px - tight components)
- `component.sm` → `spacing[2]` (8px - compact components)
- `component.md` → `spacing[4]` (16px - default components)
- `component.lg` → `spacing[6]` (24px - spacious components)
- `component.xl` → `spacing[8]` (32px - extra spacious components)

**Rule:** Layout spacing tokens MUST map to base spacing scale values. They provide layout-specific semantics while maintaining grid consistency.

---

## Component Rules

### Rule 1: Token-Only Spacing

**Components MUST use only spacing tokens from the canonical token system.**

**Allowed Sources:**
- Base spacing scale tokens (`spacing[0]`, `spacing[2]`, `spacing[4]`, etc.)
- Semantic spacing tokens (`semanticSpacing.xs`, `semanticSpacing.sm`, etc.)
- Layout spacing tokens (`layoutSpacing.section.md`, `layoutSpacing.container.sm`, etc.)

**Forbidden:**
- ❌ Arbitrary pixel values: `padding: 13px`, `margin: 7px`, `gap: 0.3rem`
- ❌ Arbitrary rem values: `padding: 0.7rem`, `margin: 1.3rem`
- ❌ Arbitrary percentage values: `padding: 2.5%`
- ❌ Calculated values: `padding: calc(16px + 4px)`
- ❌ Component-specific spacing scales

### Rule 2: Grid System Compliance

**All spacing values MUST comply with the 8px grid system.**

**Rule:** Spacing values that are not multiples of 8px (or 4px for fine adjustments) are forbidden, except for the rare exceptions defined in the base spacing scale (0.5, 1.5, 2.5, 3.5, etc.).

**Forbidden:**
- ❌ Values that break the grid: `padding: 5px`, `margin: 9px`, `gap: 11px`
- ❌ Values that don't align with base unit: `padding: 0.3rem`, `margin: 1.1rem`

### Rule 3: Semantic Preference

**Components SHOULD prefer semantic spacing tokens over base spacing scale when semantic meaning is clear.**

**Preference Order:**
1. Layout spacing tokens (when layout pattern matches)
2. Semantic spacing tokens (when semantic meaning matches)
3. Base spacing scale (when specific value needed)

**Example:**
- ✅ **Preferred:** `padding: semanticSpacing.md` (semantic meaning)
- ✅ **Allowed:** `padding: spacing[4]` (same value, less semantic)
- ❌ **Forbidden:** `padding: 16px` (arbitrary value)

### Rule 4: Layout Pattern Mapping

**Components MUST use layout spacing tokens when they match the layout pattern.**

**Rule:** When a component uses spacing for a layout pattern (section, container, grid, stack, component), it MUST use the corresponding layout spacing token.

**Examples:**
- Section spacing → `layoutSpacing.section.*`
- Container padding → `layoutSpacing.container.*`
- Grid gap → `layoutSpacing.grid.*`
- Stack gap → `layoutSpacing.stack.*`
- Component padding → `layoutSpacing.component.*`

---

## Forbidden Patterns

### 1. Arbitrary Spacing Values

**Forbidden:**
- ❌ `padding: 13px`
- ❌ `margin: 7px`
- ❌ `gap: 0.3rem`
- ❌ `padding: calc(16px + 4px)`
- ❌ `margin: 2.5%`

**Rationale:** Arbitrary values break grid consistency and layout rhythm.

### 2. Component-Specific Spacing Scales

**Forbidden:**
- ❌ Defining new spacing scales within components
- ❌ Creating component-specific spacing tokens outside the token system
- ❌ Overriding canonical spacing values

**Rationale:** Component-specific scales create inconsistency and break the unified design system.

### 3. Grid System Violations

**Forbidden:**
- ❌ Spacing values that are not multiples of 8px (or 4px for fine adjustments)
- ❌ Values that don't align with base unit: `5px`, `9px`, `11px`, `13px`, etc.

**Rationale:** Grid violations break visual harmony and layout consistency.

### 4. Direct Value Usage

**Forbidden:**
- ❌ Using raw CSS values instead of tokens
- ❌ Hardcoding spacing values in component code
- ❌ Calculating spacing values at runtime

**Rationale:** Direct values bypass the token system and break consistency.

### 5. Raw Tailwind Spacing Utilities

**Forbidden:**
- ❌ `p-4`, `m-2`, `gap-3` (raw Tailwind spacing utilities)
- ❌ `px-5`, `py-7`, `space-x-6` (arbitrary Tailwind spacing)
- ❌ Using Tailwind spacing classes without token mapping

**Rationale:** Raw Tailwind utilities bypass the token system and break grid consistency. Components must use token-derived classes or token references.

---

## Allowed Patterns

### 1. Token-Based Spacing

**Allowed:**
- ✅ Using base spacing scale tokens: `spacing[0]`, `spacing[2]`, `spacing[4]`, etc.
- ✅ Using semantic spacing tokens: `semanticSpacing.xs`, `semanticSpacing.md`, etc.
- ✅ Using layout spacing tokens: `layoutSpacing.section.md`, `layoutSpacing.container.sm`, etc.

**Rationale:** Token-based spacing ensures consistency and maintainability.

### 2. Semantic Mapping

**Allowed:**
- ✅ Mapping component props to semantic spacing tokens
- ✅ Using layout spacing tokens for layout patterns
- ✅ Preferring semantic tokens over base scale when meaning is clear

**Rationale:** Semantic mapping improves code readability and design system coherence.

### 3. Responsive Spacing

**Allowed:**
- ✅ Using different spacing tokens for different breakpoints
- ✅ Responsive spacing via token unions (when implemented)

**Rationale:** Responsive spacing maintains grid consistency across breakpoints.

---

## Semantic Mapping

### Component Spacing Patterns

**Button Component:**
- Internal padding → `layoutSpacing.component.sm` or `layoutSpacing.component.md`
- Gap between icon and text → `semanticSpacing.xs` or `semanticSpacing.sm`

**Card Component:**
- Internal padding → `layoutSpacing.component.md` or `layoutSpacing.component.lg`
- Gap between card elements → `semanticSpacing.sm` or `semanticSpacing.md`

**Modal Component:**
- Internal padding → `layoutSpacing.container.md` or `layoutSpacing.container.lg`
- Gap between modal sections → `semanticSpacing.md` or `semanticSpacing.lg`

**Form Components:**
- Field spacing → `semanticSpacing.md` or `semanticSpacing.lg`
- Label spacing → `semanticSpacing.xs` or `semanticSpacing.sm`

**Navigation Components:**
- Item spacing → `semanticSpacing.sm` or `semanticSpacing.md`
- Section spacing → `layoutSpacing.section.md` or `layoutSpacing.section.lg`

**Rule:** Components should use semantic or layout spacing tokens that match their use case, ensuring consistent spacing patterns across the design system.

---

## Token System Integration

### Source of Truth

**Canonical Token Definitions:**
- Location: `src/tokens/spacing.ts`
- Exports: `spacing`, `semanticSpacing`, `layoutSpacing`
- Types: `Spacing`, `SemanticSpacing`, `SectionSpacing`, `ContainerSpacing`, `GridSpacing`, `StackSpacing`, `ComponentSpacing`

**Rule:** The token system file (`src/tokens/spacing.ts`) is the single source of truth for all spacing values. Components MUST reference tokens from this file, never define their own spacing values.

---

## Unlock Procedure

Any Spacing Authority modifications require:

1. Explicit unlock task with justification
2. Full audit of all component spacing usage
3. Impact analysis of proposed changes
4. Explicit approval for changes
5. Re-verification of all components after changes
6. Re-lock with updated documentation

**Note:** Spacing Authority lock applies to **BOTH humans and AI agents**. Any request to modify locked spacing authority aspects **MUST** be refused with reference to the Spacing Authority lock.

**Do not modify Spacing Authority without explicit 'Unlock Spacing Authority' task approval.**

**Note:** Future changes to Authority rules require either:
- New Authority version (e.g., `SPACING_AUTHORITY_CONTRACT_v2.md`) with full migration path
- Explicit unlock procedure with full audit and approval

---

## Version History

- **v1.1** (2025-12-16): Formal Lock Completion
  - Changed status from ACTIVE to LOCKED
  - Formally locked as part of Foundation layer closure
  - All rules are immutable and require unlock procedure for modifications
  - Future changes require Authority versioning (v2+) or explicit unlock procedure

- **v1.0** (2025-12-19): Initial Spacing Authority Contract definition
  - Defined canonical spacing token scale (base, semantic, layout)
  - Defined component rules and forbidden patterns
  - Established as immutable authority

---

**Status:** ✅ **LOCKED**  
**Version:** 1.1  
**Date Created:** 2025-12-19  
**Last Updated:** 2025-12-16  
**Priority:** BLOCKER  
**Authority Domain:** Spacing Authority
