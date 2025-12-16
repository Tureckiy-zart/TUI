# Elevation Authority Contract

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
**AUTHORITY DOMAIN:** Elevation Authority

**Purpose:** This document defines the canonical declarative rules for elevation token usage (shadows, z-index) across all UI components. It establishes architectural law that cannot be changed without explicit unlock procedure.

---

## Overview

This document defines the canonical Elevation Authority contract for all UI components. It establishes the rules for elevation token usage (shadows and z-index stacking), ensuring consistent depth hierarchy and overlay ordering across the design system.

**Key Principle:** All elevation values must come from the canonical elevation token system. Components cannot introduce arbitrary shadow or z-index values that break depth hierarchy and overlay ordering.

---

## Canonical Token Scale Table

The following table defines the canonical elevation token scale with key, meaning, and example values:

| Key | Meaning | Example Value |
|-----|---------|---------------|
| `elevationShadows.none` | No shadow | `none` |
| `elevationShadows.xs` | Extra small shadow | `0 1px 2px 0 rgb(0 0 0 / 0.05)` |
| `elevationShadows.sm` | Small shadow | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` |
| `elevationShadows.md` | Medium shadow | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` |
| `elevationShadows.lg` | Large shadow | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` |
| `elevationShadows.xl` | Extra large shadow | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` |
| `primaryColoredShadows.md` | Primary colored shadow | `0 4px 8px 0 hsl(var(--primary-500) / 0.3)` |
| `glowEffects["glow-primary"]` | Primary glow effect | `0 0 20px 0 hsl(var(--primary-500) / 0.5)` |
| `focusRings.default` | Default focus ring | `0 0 0 3px hsl(var(--ring) / 0.5)` |
| `zIndex.base` | Base layer | `0` |
| `zIndex.dropdown` | Dropdown layer | `10` |
| `zIndex.sticky` | Sticky layer | `20` |
| `zIndex.overlay` | Overlay layer | `30` |
| `zIndex.modal` | Modal layer | `40` |
| `zIndex.notification` | Notification layer | `50` |
| `zIndex.tooltip` | Tooltip layer | `60` |
| `zIndex.maximum` | Maximum layer | `100` |

**Rule:** All elevation tokens must reference values from this canonical scale. Shadows provide depth hierarchy, z-index defines stacking order. Components must use appropriate z-index layers for their component type.

---

## Authority Chain

**Elevation Authority** is the single source of truth for all elevation values across all UI components in the design system.

**Authority Hierarchy:**
1. **Elevation Authority Contract** (this document) - Defines rules and constraints
2. **Token System** - `src/tokens/shadows.ts` provides canonical shadow token definitions
3. **Z-Index System** - Canonical z-index scale defines stacking order
4. **Component Implementation** - Components consume elevation tokens only
5. **Elevation System** - Elevation tokens ensure consistent depth hierarchy

---

## Canonical Token Scale

The Elevation Authority defines two categories of elevation tokens:

### 1. Shadow Tokens

Shadow tokens define the canonical elevation shadows for component depth.

#### Elevation Shadow Tokens

Elevation shadows provide depth and elevation hierarchy for components.

**Canonical Values:**
- `none` → `none` (no shadow, flat)
- `xs` → `0 1px 2px 0 rgb(0 0 0 / 0.05)` (extra small, minimal depth)
- `sm` → `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` (small, subtle depth)
- `md` → `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` (medium, default depth)
- `lg` → `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` (large, prominent depth)
- `xl` → `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` (extra large, very prominent depth)
- `2xl` → `0 25px 50px -12px rgb(0 0 0 / 0.25)` (2XL, maximum depth)

**Rule:** Elevation shadows MUST use the canonical elevation shadow tokens. Components cannot use arbitrary shadow values.

#### Colored Shadow Tokens

Colored shadows provide brand emphasis and interactive feedback.

**Primary Colored Shadows:**
- `primary-xs` → `0 1px 2px 0 hsl(var(--primary-500) / 0.15)`
- `primary-sm` → `0 2px 4px 0 hsl(var(--primary-500) / 0.2)`
- `primary-md` → `0 4px 8px 0 hsl(var(--primary-500) / 0.3)`
- `primary-lg` → `0 8px 16px 0 hsl(var(--primary-500) / 0.4)`
- `primary-xl` → `0 12px 24px 0 hsl(var(--primary-500) / 0.5)`
- `primary-2xl` → `0 16px 32px 0 hsl(var(--primary-500) / 0.6)`

**Accent Colored Shadows:**
- `accent-xs` → `0 1px 2px 0 hsl(var(--accent-500) / 0.15)`
- `accent-sm` → `0 2px 4px 0 hsl(var(--accent-500) / 0.2)`
- `accent-md` → `0 4px 8px 0 hsl(var(--accent-500) / 0.3)`
- `accent-lg` → `0 8px 16px 0 hsl(var(--accent-500) / 0.4)`
- `accent-xl` → `0 12px 24px 0 hsl(var(--accent-500) / 0.5)`
- `accent-2xl` → `0 16px 32px 0 hsl(var(--accent-500) / 0.6)`

**Rule:** Colored shadows MUST use the canonical colored shadow tokens. Components cannot use arbitrary colored shadow values.

#### Glow Effect Tokens

Glow effects provide focus states, brand emphasis, and interactive feedback.

**Primary Glow Effects:**
- `glow-primary` → `0 0 20px 0 hsl(var(--primary-500) / 0.5), 0 0 40px 0 hsl(var(--primary-500) / 0.3)`
- `glow-primary-subtle` → `0 0 8px 0 hsl(var(--primary-500) / 0.3)`
- `glow-primary-medium` → `0 0 16px 0 hsl(var(--primary-500) / 0.5)`
- `glow-primary-strong` → `0 0 24px 0 hsl(var(--primary-500) / 0.6)`

**Accent Glow Effects:**
- `glow-accent` → `0 0 20px 0 hsl(var(--accent-500) / 0.5), 0 0 40px 0 hsl(var(--accent-500) / 0.3)`
- `glow-accent-subtle` → `0 0 8px 0 hsl(var(--accent-500) / 0.3)`
- `glow-accent-medium` → `0 0 16px 0 hsl(var(--accent-500) / 0.5)`
- `glow-accent-strong` → `0 0 24px 0 hsl(var(--accent-500) / 0.6)`

**Rule:** Glow effects MUST use the canonical glow effect tokens. Components cannot use arbitrary glow values.

#### Focus Ring Tokens

Focus ring tokens provide keyboard focus indicators for accessibility.

**Canonical Values:**
- `default` → `0 0 0 3px hsl(var(--ring) / 0.5)`
- `primary` → `0 0 0 3px hsl(var(--primary-500) / 0.3)`
- `accent` → `0 0 0 3px hsl(var(--accent-500) / 0.3)`

**Rule:** Focus rings MUST use the canonical focus ring tokens. Components cannot use arbitrary focus ring values.

### 2. Z-Index Scale

Z-index scale defines the canonical stacking order for overlay components.

**Canonical Z-Index Values:**

**Base Layer:**
- `base` → `0` (default, document flow)

**Content Layer:**
- `content` → `1` (content above base)

**Dropdown Layer:**
- `dropdown` → `10` (dropdown menus, select dropdowns)

**Sticky Layer:**
- `sticky` → `20` (sticky headers, navigation bars)

**Overlay Layer:**
- `overlay` → `30` (overlays, popovers, tooltips)

**Modal Layer:**
- `modal` → `40` (modals, dialogs)

**Notification Layer:**
- `notification` → `50` (toasts, notifications)

**Tooltip Layer:**
- `tooltip` → `60` (tooltips, hints)

**Maximum Layer:**
- `maximum` → `100` (maximum elevation, critical overlays)

**Rule:** Z-index values MUST use the canonical z-index scale. Components cannot use arbitrary z-index values that break stacking order.

**Stacking Order Rules:**
- Lower layers MUST have lower z-index values
- Higher layers MUST have higher z-index values
- Components in the same layer MUST use the same z-index value
- Components cannot use z-index values between canonical layers

---

## Component Rules

### Rule 1: Token-Only Elevation

**Components MUST use only elevation tokens from the canonical token system.**

**Allowed Sources:**
- Elevation shadow tokens (`elevationShadows.none`, `elevationShadows.sm`, `elevationShadows.md`, etc.)
- Colored shadow tokens (`primaryColoredShadows.md`, `accentColoredShadows.lg`, etc.)
- Glow effect tokens (`glowEffects["glow-primary"]`, `glowEffects["glow-accent-subtle"]`, etc.)
- Focus ring tokens (`focusRings.default`, `focusRings.primary`, etc.)
- Z-index scale tokens (`zIndex.dropdown`, `zIndex.modal`, `zIndex.notification`, etc.)

**Forbidden:**
- ❌ Arbitrary shadow values: `box-shadow: 0 2px 5px rgba(0,0,0,0.15)`
- ❌ Arbitrary z-index values: `z-index: 47`, `z-index: 150`
- ❌ Custom shadow definitions not in the token system
- ❌ Component-specific elevation scales

### Rule 2: Shadow Preference

**Components SHOULD prefer elevation shadows over colored shadows unless brand emphasis is needed.**

**Preference Order:**
1. Elevation shadows (for depth hierarchy)
2. Colored shadows (for brand emphasis and interactive feedback)
3. Glow effects (for focus states and special emphasis)

**Example:**
- ✅ **Preferred:** `elevationShadows.md` (standard depth)
- ✅ **Allowed:** `primaryColoredShadows.md` (brand emphasis)
- ❌ **Forbidden:** `box-shadow: 0 4px 8px rgba(0,0,0,0.15)` (arbitrary value)

### Rule 3: Z-Index Layer Assignment

**Components MUST use the appropriate z-index layer for their component type.**

**Layer Assignment Rules:**
- **Dropdown components** → `zIndex.dropdown` (10)
- **Sticky components** → `zIndex.sticky` (20)
- **Overlay components** (popovers, tooltips) → `zIndex.overlay` (30)
- **Modal components** → `zIndex.modal` (40)
- **Notification components** (toasts) → `zIndex.notification` (50)
- **Tooltip components** → `zIndex.tooltip` (60)

**Rule:** Components MUST use the z-index layer that matches their component type. Components cannot use z-index values from other layers.

### Rule 4: Stacking Order Compliance

**Components MUST respect the canonical stacking order.**

**Rule:** Lower elevation components MUST have lower z-index values than higher elevation components. Components cannot break the stacking order hierarchy.

**Stacking Order:**
```
base (0) < content (1) < dropdown (10) < sticky (20) < overlay (30) < modal (40) < notification (50) < tooltip (60) < maximum (100)
```

---

## Forbidden Patterns

### 1. Arbitrary Elevation Values

**Forbidden:**
- ❌ `box-shadow: 0 2px 5px rgba(0,0,0,0.15)`
- ❌ `z-index: 47`
- ❌ `z-index: 150`
- ❌ `box-shadow: 0 0 10px rgba(255,0,0,0.5)`

**Rationale:** Arbitrary values break depth hierarchy and stacking order consistency.

### 2. Component-Specific Elevation Scales

**Forbidden:**
- ❌ Defining new elevation scales within components
- ❌ Creating component-specific elevation tokens outside the token system
- ❌ Overriding canonical elevation values

**Rationale:** Component-specific scales create inconsistency and break the unified design system.

### 3. Z-Index Stacking Violations

**Forbidden:**
- ❌ Using z-index values between canonical layers
- ❌ Using z-index values from wrong layers
- ❌ Breaking stacking order hierarchy

**Rationale:** Z-index stacking violations break overlay ordering and create visual conflicts.

### 4. Direct Value Usage

**Forbidden:**
- ❌ Using raw CSS values instead of tokens
- ❌ Hardcoding elevation values in component code
- ❌ Calculating elevation values at runtime

**Rationale:** Direct values bypass the token system and break consistency.

### 5. Inline Elevation Styles

**Forbidden:**
- ❌ Inline `box-shadow`, `z-index` styles in component code
- ❌ Dynamic elevation values calculated from props
- ❌ Conditional elevation values based on component state

**Rationale:** Inline elevation values bypass the token system and break consistency.

---

## Allowed Patterns

### 1. Token-Based Elevation

**Allowed:**
- ✅ Using elevation shadow tokens: `elevationShadows.none`, `elevationShadows.sm`, etc.
- ✅ Using colored shadow tokens: `primaryColoredShadows.md`, `accentColoredShadows.lg`, etc.
- ✅ Using glow effect tokens: `glowEffects["glow-primary"]`, `glowEffects["glow-accent-subtle"]`, etc.
- ✅ Using focus ring tokens: `focusRings.default`, `focusRings.primary`, etc.
- ✅ Using z-index scale tokens: `zIndex.dropdown`, `zIndex.modal`, etc.

**Rationale:** Token-based elevation ensures consistency and maintainability.

### 2. Semantic Elevation Mapping

**Allowed:**
- ✅ Mapping component props to elevation shadow tokens
- ✅ Using colored shadows for brand emphasis
- ✅ Using glow effects for focus states
- ✅ Using appropriate z-index layers for component types

**Rationale:** Semantic elevation mapping improves code readability and design system coherence.

### 3. Layer-Based Z-Index

**Allowed:**
- ✅ Using z-index layers that match component types
- ✅ Respecting stacking order hierarchy
- ✅ Using maximum layer for critical overlays

**Rationale:** Layer-based z-index ensures consistent overlay ordering across the design system.

---

## Semantic Mapping

### Elevation Pattern Usage

**Component Shadow Patterns:**
- Card components → `elevationShadows.sm` or `elevationShadows.md` (default depth)
- Button components → `elevationShadows.xs` or `elevationShadows.sm` (subtle depth)
- Modal components → `elevationShadows.xl` or `elevationShadows["2xl"]` (prominent depth)
- Tooltip components → `elevationShadows.md` or `elevationShadows.lg` (visible depth)

**Component Z-Index Patterns:**
- Dropdown components → `zIndex.dropdown` (10)
- Sticky navigation → `zIndex.sticky` (20)
- Popover components → `zIndex.overlay` (30)
- Modal components → `zIndex.modal` (40)
- Toast components → `zIndex.notification` (50)
- Tooltip components → `zIndex.tooltip` (60)

**Rule:** Components should use elevation tokens that match their depth needs and z-index layers that match their component type, ensuring consistent elevation patterns across the design system.

---

## Token System Integration

### Source of Truth

**Canonical Token Definitions:**
- Location: `src/tokens/shadows.ts`
- Exports: `elevationShadows`, `primaryColoredShadows`, `accentColoredShadows`, `glowEffects`, `focusRings`
- Types: `ElevationShadow`, `ColoredShadow`, `GlowEffect`, `FocusRing`

**Z-Index Scale:**
- Location: Defined in this Authority document (implementation pending)
- Canonical values: `base`, `content`, `dropdown`, `sticky`, `overlay`, `modal`, `notification`, `tooltip`, `maximum`
- Z-index values: `0`, `1`, `10`, `20`, `30`, `40`, `50`, `60`, `100`

**Rule:** The token system file (`src/tokens/shadows.ts`) is the single source of truth for all shadow values. The z-index scale defined in this document is the single source of truth for all z-index values. Components MUST reference tokens from these sources, never define their own elevation values.

---

## Unlock Procedure

Any Elevation Authority modifications require:

1. Explicit unlock task with justification
2. Full audit of all component elevation usage
3. Impact analysis of proposed changes
4. Explicit approval for changes
5. Re-verification of all components after changes
6. Re-lock with updated documentation

**Note:** Elevation Authority lock applies to **BOTH humans and AI agents**. Any request to modify locked elevation authority aspects **MUST** be refused with reference to the Elevation Authority lock.

**Do not modify Elevation Authority without explicit 'Unlock Elevation Authority' task approval.**

**Note:** Future changes to Authority rules require either:
- New Authority version (e.g., `ELEVATION_AUTHORITY_CONTRACT_v2.md`) with full migration path
- Explicit unlock procedure with full audit and approval

---

## Version History

- **v1.1** (2025-12-16): Formal Lock Completion
  - Changed status from ACTIVE to LOCKED
  - Formally locked as part of Foundation layer closure
  - All rules are immutable and require unlock procedure for modifications
  - Future changes require Authority versioning (v2+) or explicit unlock procedure

- **v1.0** (2025-12-19): Initial Elevation Authority Contract definition
  - Defined canonical elevation token scale (shadows, colored shadows, glow effects, focus rings)
  - Defined z-index scale and component rules
  - Established as immutable authority

---

**Status:** ✅ **LOCKED**  
**Version:** 1.1  
**Date Created:** 2025-12-19  
**Last Updated:** 2025-12-16  
**Priority:** BLOCKER  
**Authority Domain:** Elevation Authority
