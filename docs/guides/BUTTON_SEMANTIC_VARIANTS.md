# Button Semantic Variant Rules

**Date:** 2025-11-25  
**Status:** ✅ **ACTIVE** - Defines semantic intent for Button variants  
**Task:** TUNG_BUTTON_SEMANTIC_POLISH_V1

---

## Overview

This document defines the semantic intent and visual hierarchy for Button variants. Variants are mapped to semantic behavior, not specific colors, ensuring they remain flexible to Color Authority changes while maintaining clear visual distinction.

---

## Variant Semantic Intent

### Primary

**Semantic Role:** Main action, primary call-to-action  
**Visual Intent:** Highest visual prominence, strongest contrast  
**Use Cases:**
- Primary form submission
- Main navigation actions
- Critical user flows
- Single most important action on a page

**Contrast Hierarchy:** Highest (should be most prominent)

---

### Secondary

**Semantic Role:** Secondary action, alternative option  
**Visual Intent:** Medium prominence, distinct from primary but clearly interactive  
**Use Cases:**
- Alternative actions
- Secondary navigation
- Supporting actions alongside primary
- Less critical but still important actions

**Contrast Hierarchy:** Medium-High (clearly distinct from primary, but less prominent)

---

### Accent

**Semantic Role:** Highlighted action, special emphasis  
**Visual Intent:** Distinct color identity, draws attention without competing with primary  
**Use Cases:**
- Special promotions
- Highlighted features
- Brand-specific actions
- Actions that need color differentiation

**Contrast Hierarchy:** Medium (distinct color identity, perceptually different from primary/secondary)

**Visual Distinction Requirements:**
- Must have minimum 16 L* delta from secondary for clear distinction
- Should use accent color palette (purples) to differentiate from primary (blues) and secondary (cyan)

---

### Outline

**Semantic Role:** Tertiary action, subtle interaction  
**Visual Intent:** Border-focused, background-transparent, clear hover feedback  
**Use Cases:**
- Cancel actions
- Tertiary options
- Less important actions
- Actions that should not compete visually

**Contrast Hierarchy:** Medium-Low (border-focused, less prominent than filled variants)

**State Behavior:**
- Default: Transparent background, border visible
- Hover: Accent background with accent foreground text
- Active: Darker accent background

---

### Ghost

**Semantic Role:** Minimal action, subtle interaction  
**Visual Intent:** No border, transparent background, minimal visual footprint  
**Use Cases:**
- Icon-only actions
- Toolbar buttons
- Subtle navigation
- Actions that should be discoverable but not prominent

**Contrast Hierarchy:** Low (minimal visual footprint, discoverable on hover)

**State Behavior:**
- Default: Fully transparent, no border
- Hover: Muted background with foreground text
- Active: Slightly darker muted background

**Distinction from Outline:**
- Ghost: No border, uses muted background on hover
- Outline: Has border, uses accent background on hover

---

### Destructive

**Semantic Role:** Dangerous action, irreversible operation  
**Visual Intent:** Error/danger color identity, clear warning signal  
**Use Cases:**
- Delete actions
- Remove operations
- Destructive confirmations
- Actions with negative consequences

**Contrast Hierarchy:** High (should be clearly visible but semantically distinct from primary)

**Visual Requirements:**
- Must use destructive/error color palette
- Should be clearly distinguishable from primary (different color family)
- Should maintain sufficient contrast for accessibility

---

## Contrast Hierarchy Summary

From highest to lowest visual prominence:

1. **Primary** - Highest prominence, main action
2. **Destructive** - High prominence, danger signal
3. **Secondary** - Medium-high prominence, alternative action
4. **Accent** - Medium prominence, special emphasis (distinct color)
5. **Outline** - Medium-low prominence, tertiary action
6. **Ghost** - Lowest prominence, minimal action

---

## Variant Mapping to Semantic Behavior

| Variant | Semantic Behavior | Visual Weight | Color Family |
|---------|-------------------|---------------|--------------|
| Primary | Main action | Highest | Primary (blues) |
| Secondary | Alternative action | Medium-High | Secondary (cyan) |
| Accent | Special emphasis | Medium | Accent (purples) |
| Outline | Tertiary action | Medium-Low | Border + Accent hover |
| Ghost | Minimal action | Low | Transparent + Muted hover |
| Destructive | Dangerous action | High | Destructive (error) |

---

## State Semantics

### Default State

- All variants: Clear visual identity
- Colors: Bound to Color Authority semantic tokens
- Contrast: Meets WCAG AA minimum (4.5:1 for text)

### Hover State

- **Purpose:** Indicate interactivity, provide feedback
- **Implementation:** Variant-specific hover tokens
- **Visual Change:** Must be clearly perceivable (not opacity-only where possible)
- **Contrast:** Maintains or improves contrast ratio

### Active State

- **Purpose:** Indicate pressed/engaged state
- **Implementation:** Darker/lighter variant of hover state
- **Visual Change:** Clear pressed feedback
- **Duration:** Transient (only while pressed)

### Disabled State

- **Purpose:** Indicate non-interactive state
- **Implementation:** Reduced opacity + variant-specific disabled tokens
- **Visual Change:** Clearly non-interactive, but still recognizable
- **Accessibility:** Must maintain sufficient contrast for recognition

---

## Color Authority Contract

**Critical Rule:** Variants map to semantic behavior, NOT specific colors.

- Changing `tokens/colors.ts` should automatically update Button appearance
- Variants should remain visually distinct regardless of Color Authority values
- Semantic intent (primary = main action) remains constant
- Visual implementation (which color = primary) is determined by Color Authority

**Example:**
- If `primary` color in Color Authority changes from blue to green, Button primary variant should automatically use green
- The semantic intent (primary = main action) does not change
- Visual distinction between variants should be maintained

---

## Visual Distinction Requirements

### Minimum Contrast Deltas

- **Primary vs Secondary:** Minimum 12 L* delta
- **Secondary vs Accent:** Minimum 16 L* delta (for clear distinction)
- **Accent vs Primary:** Minimum 12 L* delta
- **Outline vs Ghost:** Clear border presence difference
- **Destructive vs Primary:** Different color family (error vs primary)

### Perceptual Distinction

- Variants should be distinguishable at a glance
- Color-blind users should be able to distinguish variants (not just by color)
- Size, border, and shadow differences support distinction

---

## Implementation Notes

- All variant colors come from `BUTTON_TOKENS.variant.*`
- `BUTTON_TOKENS` references `tokens/colors.ts` (Color Authority)
- No raw color values in Button component
- State tokens (hover/active/disabled) are variant-aware
- Icon colors are variant-aware (inherit from variant foreground)

---

**Status:** ✅ Active Documentation  
**Last Updated:** 2025-11-25  
**Related:** `src/tokens/components/button.ts`, `src/components/ui/button.tsx`

