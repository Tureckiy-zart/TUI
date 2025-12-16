# Motion Authority Contract

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
**AUTHORITY DOMAIN:** Motion Authority

**Purpose:** This document defines the canonical declarative rules for motion token usage (duration, easing, transitions, animations) across all UI components. It establishes architectural law that cannot be changed without explicit unlock procedure.

---

## Overview

This document defines the canonical Motion Authority contract for all UI components. It establishes the rules for motion token usage, ensuring consistent animation timing, easing, and transitions across the design system.

**Key Principle:** All motion values must come from the canonical motion token system. Components cannot introduce arbitrary motion values that break animation consistency and accessibility.

---

## Canonical Token Scale Table

The following table defines the canonical motion token scale with key, meaning, and example values:

| Key | Meaning | Example Value |
|-----|---------|---------------|
| `durations.fast` | Fast duration | `150ms` |
| `durations.normal` | Normal duration | `300ms` |
| `durations.slow` | Slow duration | `500ms` |
| `easings["ease-out"]` | Ease out (recommended) | `cubic-bezier(0, 0, 0.2, 1)` |
| `easings["ease-in-out"]` | Ease in-out | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `transitions.fast` | Fast transition | `150ms ease-out` |
| `transitions.normal` | Normal transition | `300ms ease-in-out` |
| `transitions.slow` | Slow transition | `500ms ease-in-out` |
| `keyframes.fadeIn` | Fade in keyframe | `opacity: 0 → 1` |
| `keyframes.slideInUp` | Slide in up keyframe | `translateY(100%) → translateY(0)` |
| `keyframes.scaleIn` | Scale in keyframe | `scale(0.95) → scale(1)` |
| `animations.fadeIn` | Fade in animation | `fadeIn 300ms ease-out` |
| `animations.slideInUp` | Slide in up animation | `slideInUp 300ms ease-out` |
| `animations.spin` | Spin animation | `spin 1s linear infinite` |
| `reducedMotion.duration` | Reduced motion duration | `0ms` (instant) |
| `reducedMotion.transition` | Reduced motion transition | `0ms linear` |

**Rule:** All motion tokens must reference values from this canonical scale. Durations are based on a 100ms base unit. All motion must respect `prefers-reduced-motion` user preferences.

---

## Authority Chain

**Motion Authority** is the single source of truth for all motion values across all UI components in the design system.

**Authority Hierarchy:**
1. **Motion Authority Contract** (this document) - Defines rules and constraints
2. **Token System** - `src/tokens/motion.ts` provides canonical token definitions
3. **Component Implementation** - Components consume motion tokens only
4. **Motion System** - Motion tokens ensure consistent animation timing and accessibility

---

## Canonical Token Scale

The Motion Authority defines five categories of motion tokens:

### 1. Duration Tokens

Duration tokens define the canonical animation durations based on a 100ms base unit.

**Canonical Values:**
- `instant` → `0ms` (no animation)
- `fast` → `150ms` (1.5 × base, quick interactions)
- `normal` → `300ms` (3 × base, default)
- `slow` → `500ms` (5 × base, emphasized)
- `slower` → `700ms` (7 × base, very emphasized)
- `slowest` → `1000ms` (10 × base, maximum emphasis)

**Granular Durations:**
- `75` → `75ms` (ultra-fast)
- `100` → `100ms` (base unit)
- `200` → `200ms` (fast-normal)
- `250` → `250ms` (between fast and normal)
- `400` → `400ms` (between normal and slow)
- `600` → `600ms` (between slow and slower)
- `800` → `800ms` (between slower and slowest)

**Rule:** All duration values are multiples of the 100ms base unit, with granular options for fine adjustments.

### 2. Easing Function Tokens

Easing function tokens define the canonical easing curves for natural motion.

**Canonical Values:**
- `linear` → `linear` (no easing, constant speed)
- `ease-in` → `cubic-bezier(0.4, 0, 1, 1)` (accelerate)
- `ease-out` → `cubic-bezier(0, 0, 0.2, 1)` (decelerate, recommended for most UI)
- `ease-in-out` → `cubic-bezier(0.4, 0, 0.2, 1)` (accelerate and decelerate)
- `ease` → `ease` (standard easing)
- `bounce` → `cubic-bezier(0.68, -0.55, 0.265, 1.55)` (bouncy)
- `elastic` → `cubic-bezier(0.175, 0.885, 0.32, 1.275)` (elastic)
- `ease-out-cubic` → `cubic-bezier(0.215, 0.61, 0.355, 1)` (Material Design)
- `ease-in-cubic` → `cubic-bezier(0.55, 0.055, 0.675, 0.19)` (Material Design)
- `ease-in-out-cubic` → `cubic-bezier(0.645, 0.045, 0.355, 1)` (Material Design)

**Rule:** Easing functions MUST use the canonical easing tokens. Components cannot use arbitrary cubic-bezier values.

### 3. Transition Tokens

Transition tokens provide pre-configured transitions combining duration and easing.

**Canonical Values:**

**Fast Transitions:**
- `fast` → `150ms ease-out` (quick interactions)
- `fast-in` → `150ms ease-in`
- `fast-out` → `150ms ease-out`
- `fast-in-out` → `150ms ease-in-out`

**Normal Transitions:**
- `normal` → `300ms ease-in-out` (default)
- `normal-in` → `300ms ease-in`
- `normal-out` → `300ms ease-out`
- `normal-in-out` → `300ms ease-in-out`

**Slow Transitions:**
- `slow` → `500ms ease-in-out` (emphasized)
- `slow-in` → `500ms ease-in`
- `slow-out` → `500ms ease-out`
- `slow-in-out` → `500ms ease-in-out`

**Special Transitions:**
- `bounce` → `300ms bounce` (bouncy transition)
- `elastic` → `500ms elastic` (elastic transition)
- `DEFAULT` → `300ms ease-in-out` (default transition)

**Rule:** Transition tokens MUST combine canonical duration and easing tokens. Components should prefer transition tokens over individual duration/easing combinations.

### 4. Keyframe Animation Tokens

Keyframe animation tokens define pre-defined keyframe animations for common UI patterns.

**Canonical Keyframes:**

**Fade Animations:**
- `fadeIn` → opacity: 0 → 1
- `fadeOut` → opacity: 1 → 0

**Slide Animations:**
- `slideInUp` → translateY(100%) → translateY(0), opacity: 0 → 1
- `slideInDown` → translateY(-100%) → translateY(0), opacity: 0 → 1
- `slideInLeft` → translateX(-100%) → translateX(0), opacity: 0 → 1
- `slideInRight` → translateX(100%) → translateX(0), opacity: 0 → 1
- `slideOutUp` → translateY(0) → translateY(-100%), opacity: 1 → 0
- `slideOutDown` → translateY(0) → translateY(100%), opacity: 1 → 0
- `slideOutLeft` → translateX(0) → translateX(-100%), opacity: 1 → 0
- `slideOutRight` → translateX(0) → translateX(100%), opacity: 1 → 0

**Scale Animations:**
- `scaleIn` → scale(0.95) → scale(1), opacity: 0 → 1
- `scaleOut` → scale(1) → scale(0.95), opacity: 1 → 0
- `scaleUp` → scale(1) → scale(1.05)
- `scaleDown` → scale(1.05) → scale(1)

**Rotation Animations:**
- `spin` → rotate(0deg) → rotate(360deg)
- `spinReverse` → rotate(360deg) → rotate(0deg)

**Pulse and Bounce:**
- `pulse` → opacity: 1 → 0.5 → 1
- `bounce` → translateY(-25%) → translateY(0) → translateY(-25%)

**Other Animations:**
- `shake` → translateX(0) → translateX(-4px) → translateX(4px) → translateX(0)
- `ping` → scale(1) → scale(2), opacity: 1 → 0
- `accordion-down` → height: 0 → var(--radix-accordion-content-height)
- `accordion-up` → height: var(--radix-accordion-content-height) → 0

**Rule:** Keyframe animations MUST use the canonical keyframe tokens. Components cannot define custom keyframe animations outside the token system.

### 5. Animation Tokens

Animation tokens provide pre-configured animations combining keyframes, duration, and easing.

**Canonical Animations:**
- `fadeIn` → `fadeIn 300ms ease-out`
- `fadeOut` → `fadeOut 150ms ease-in`
- `slideInUp` → `slideInUp 300ms ease-out`
- `slideInDown` → `slideInDown 300ms ease-out`
- `slideInLeft` → `slideInLeft 300ms ease-out`
- `slideInRight` → `slideInRight 300ms ease-out`
- `slideOutUp` → `slideOutUp 150ms ease-in`
- `slideOutDown` → `slideOutDown 150ms ease-in`
- `slideOutLeft` → `slideOutLeft 150ms ease-in`
- `slideOutRight` → `slideOutRight 150ms ease-in`
- `scaleIn` → `scaleIn 300ms ease-out`
- `scaleOut` → `scaleOut 150ms ease-in`
- `spin` → `spin 1s linear infinite`
- `pulse` → `pulse 2s ease-in-out infinite`
- `bounce` → `bounce 1s linear infinite`
- `ping` → `ping 1s ease-out infinite`
- `shake` → `shake 0.5s ease-in-out`
- `accordion-down` → `accordion-down 300ms ease-out`
- `accordion-up` → `accordion-up 300ms ease-out`

**Rule:** Animation tokens MUST combine canonical keyframes, durations, and easings. Components should prefer animation tokens over individual keyframe/duration/easing combinations.

### 6. Reduced Motion Support

Reduced motion support ensures accessibility compliance with user preferences.

**Canonical Reduced Motion Values:**
- `duration` → `0ms` (instant, no animation)
- `easing` → `linear` (linear, no easing)
- `transition` → `0ms linear` (instant transition)
- `mediaQuery` → `@media (prefers-reduced-motion: reduce)`
- `disableAnimations` → `animation: none !important; transition: none !important;`

**Rule:** All motion MUST respect user preferences for reduced motion. Components MUST support reduced motion via the canonical reduced motion tokens.

---

## Component Rules

### Rule 1: Token-Only Motion

**Components MUST use only motion tokens from the canonical token system.**

**Allowed Sources:**
- Duration tokens (`durations.fast`, `durations.normal`, `durations.slow`, etc.)
- Easing tokens (`easings["ease-out"]`, `easings["ease-in-out"]`, etc.)
- Transition tokens (`transitions.fast`, `transitions.normal`, `transitions.slow`, etc.)
- Keyframe tokens (`keyframes.fadeIn`, `keyframes.slideInUp`, etc.)
- Animation tokens (`animations.fadeIn`, `animations.slideInUp`, etc.)

**Forbidden:**
- ❌ Arbitrary duration values: `transition-duration: 250ms`, `animation-duration: 450ms`
- ❌ Arbitrary easing values: `transition-timing-function: cubic-bezier(0.5, 0, 0.5, 1)`
- ❌ Arbitrary transition values: `transition: all 250ms ease`
- ❌ Custom keyframe animations not in the token system
- ❌ Component-specific motion scales

### Rule 2: Transition Preference

**Components SHOULD prefer transition tokens over individual duration/easing combinations.**

**Preference Order:**
1. Transition tokens (when complete transition needed)
2. Individual duration + easing tokens (when specific combination needed)
3. Animation tokens (when complete animation needed)

**Example:**
- ✅ **Preferred:** `transitions.fast` (complete transition)
- ✅ **Allowed:** `durations.fast`, `easings["ease-out"]` (same combination, less semantic)
- ❌ **Forbidden:** `transition: all 150ms ease-out` (arbitrary value)

### Rule 3: Reduced Motion Compliance

**Components MUST respect user preferences for reduced motion.**

**Rule:** All motion MUST support reduced motion via the canonical reduced motion tokens. Components cannot ignore reduced motion preferences.

**Requirements:**
- ✅ Motion MUST respect `prefers-reduced-motion: reduce` media query
- ✅ Motion MUST use reduced motion tokens when user preference is set
- ✅ Motion MUST provide instant alternatives for all animations

### Rule 4: Interaction State Connection

**Motion MUST connect to interaction states defined by Interaction Authority.**

**Rule:** Motion transitions should align with interaction state changes (hover, active, focus, disabled, loading) as defined in the Interaction Authority Contract.

**Examples:**
- Hover state transitions → `transitions.fast` or `transitions.normal`
- Active state transitions → `transitions.fast`
- Focus state transitions → `transitions.fast` or `transitions.normal`
- Disabled state → no motion (instant)

---

## Forbidden Patterns

### 1. Arbitrary Motion Values

**Forbidden:**
- ❌ `transition-duration: 250ms`
- ❌ `animation-duration: 450ms`
- ❌ `transition-timing-function: cubic-bezier(0.5, 0, 0.5, 1)`
- ❌ `transition: all 250ms ease`
- ❌ `animation: customAnimation 500ms ease-in-out`

**Rationale:** Arbitrary values break animation consistency and accessibility.

### 2. Component-Specific Motion Scales

**Forbidden:**
- ❌ Defining new motion scales within components
- ❌ Creating component-specific motion tokens outside the token system
- ❌ Overriding canonical motion values

**Rationale:** Component-specific scales create inconsistency and break the unified design system.

### 3. Reduced Motion Violations

**Forbidden:**
- ❌ Ignoring `prefers-reduced-motion: reduce` media query
- ❌ Forcing animations when user prefers reduced motion
- ❌ Not providing instant alternatives for animations

**Rationale:** Reduced motion violations break accessibility compliance.

### 4. Direct Value Usage

**Forbidden:**
- ❌ Using raw CSS values instead of tokens
- ❌ Hardcoding motion values in component code
- ❌ Calculating motion values at runtime

**Rationale:** Direct values bypass the token system and break consistency.

### 5. Inline Motion Styles

**Forbidden:**
- ❌ Inline `transition`, `animation`, `transition-duration`, `transition-timing-function` styles in component code
- ❌ Dynamic motion values calculated from props
- ❌ Conditional motion values based on component state

**Rationale:** Inline motion values bypass the token system and break consistency.

---

## Allowed Patterns

### 1. Token-Based Motion

**Allowed:**
- ✅ Using duration tokens: `durations.fast`, `durations.normal`, etc.
- ✅ Using easing tokens: `easings["ease-out"]`, `easings["ease-in-out"]`, etc.
- ✅ Using transition tokens: `transitions.fast`, `transitions.normal`, etc.
- ✅ Using keyframe tokens: `keyframes.fadeIn`, `keyframes.slideInUp`, etc.
- ✅ Using animation tokens: `animations.fadeIn`, `animations.slideInUp`, etc.

**Rationale:** Token-based motion ensures consistency and maintainability.

### 2. Semantic Motion Mapping

**Allowed:**
- ✅ Mapping component props to transition tokens
- ✅ Using animation tokens for common UI patterns
- ✅ Preferring transition tokens over individual duration/easing combinations

**Rationale:** Semantic motion mapping improves code readability and design system coherence.

### 3. Reduced Motion Support

**Allowed:**
- ✅ Using reduced motion tokens when user preference is set
- ✅ Providing instant alternatives for all animations
- ✅ Respecting `prefers-reduced-motion: reduce` media query

**Rationale:** Reduced motion support ensures accessibility compliance.

---

## Semantic Mapping

### Motion Pattern Usage

**Interaction Transitions:**
- Hover transitions → `transitions.fast` or `transitions.normal`
- Active transitions → `transitions.fast`
- Focus transitions → `transitions.fast` or `transitions.normal`
- Disabled state → no motion (instant)

**Component Animations:**
- Modal open/close → `animations.fadeIn` / `animations.fadeOut` or `animations.scaleIn` / `animations.scaleOut`
- Toast show/hide → `animations.slideInUp` / `animations.slideOutDown` or `animations.fadeIn` / `animations.fadeOut`
- Dropdown open/close → `animations.slideInDown` / `animations.slideOutUp` or `animations.fadeIn` / `animations.fadeOut`
- Tooltip show/hide → `animations.fadeIn` / `animations.fadeOut`
- Loading spinner → `animations.spin`
- Loading pulse → `animations.pulse`

**Rule:** Components should use motion tokens that match their interaction patterns and animation needs, ensuring consistent motion patterns across the design system.

---

## Token System Integration

### Source of Truth

**Canonical Token Definitions:**
- Location: `src/tokens/motion.ts`
- Exports: `durations`, `easings`, `transitions`, `keyframes`, `animations`, `reducedMotion`
- Types: `Duration`, `Easing`, `Transition`, `Keyframe`, `Animation`

**Rule:** The token system file (`src/tokens/motion.ts`) is the single source of truth for all motion values. Components MUST reference tokens from this file, never define their own motion values.

---

## Unlock Procedure

Any Motion Authority modifications require:

1. Explicit unlock task with justification
2. Full audit of all component motion usage
3. Impact analysis of proposed changes
4. Explicit approval for changes
5. Re-verification of all components after changes
6. Re-lock with updated documentation

**Note:** Motion Authority lock applies to **BOTH humans and AI agents**. Any request to modify locked motion authority aspects **MUST** be refused with reference to the Motion Authority lock.

**Do not modify Motion Authority without explicit 'Unlock Motion Authority' task approval.**

**Note:** Future changes to Authority rules require either:
- New Authority version (e.g., `MOTION_AUTHORITY_CONTRACT_v2.md`) with full migration path
- Explicit unlock procedure with full audit and approval

---

## Version History

- **v1.1** (2025-12-16): Formal Lock Completion
  - Changed status from ACTIVE to LOCKED
  - Formally locked as part of Foundation layer closure
  - All rules are immutable and require unlock procedure for modifications
  - Future changes require Authority versioning (v2+) or explicit unlock procedure

- **v1.0** (2025-12-19): Initial Motion Authority Contract definition
  - Defined canonical motion token scale (durations, easings, transitions, keyframes, animations)
  - Defined reduced motion support and component rules
  - Established as immutable authority

---

**Status:** ✅ **LOCKED**  
**Version:** 1.1  
**Date Created:** 2025-12-19  
**Last Updated:** 2025-12-16  
**Priority:** BLOCKER  
**Authority Domain:** Motion Authority
