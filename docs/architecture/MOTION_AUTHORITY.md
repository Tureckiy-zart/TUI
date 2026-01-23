# Motion Authority Contract

**Status:** ✅ LOCKED  
**Priority:** BLOCKER  
**Date Created:** 2025-12-16  
**Version:** 2.2  
**Enforcement:** TUNG_TOKEN_AUTHORITY_EXPANSION_PLAN

> **⚠️ BREAKING CHANGE (2.0.0):** Motion V1 has been permanently removed from the codebase as of version 2.0.0.  
> Motion V1 tokens, APIs, and references must not be reintroduced. The motion system is singular and versionless post-2.0.0.

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

## Motion Domains and Definitions

This section defines what counts as motion and interactivity for the motion lock system.

### Motion Domains

Motion in the design system is organized into seven primary domains:

1. **Enter/Exit** - Animations that occur when elements appear or disappear from the viewport (e.g., modal open/close, toast show/hide, dropdown expand/collapse)
2. **Hover** - Interactive feedback when user hovers over clickable elements (e.g., button hover lift, card hover scale)
3. **Press/Tap** - Interactive feedback when user presses or taps elements (e.g., button active state, tap scale down)
4. **Focus/Keyboard** - Visual feedback for keyboard navigation and focus states (e.g., focus ring transitions, focus-visible states)
5. **Expand/Collapse** - Animations for expanding and collapsing content (e.g., accordion, collapsible menus, expandable sections)
6. **Toast/Dialog Transitions** - Specific transitions for notification and dialog components (e.g., slide-in from edge, fade-in overlay)
7. **Loading/Progress Micro-motion** - Subtle animations for loading states and progress indicators (e.g., spinner rotation, pulse, skeleton shimmer)

### Allowed Mechanisms

Motion MUST be implemented using only the following mechanisms:

1. **Token CSS Variables** - Motion values via CSS custom properties (e.g., `var(--tm-motion-duration-normal)`, `var(--tm-motion-easing-standard)`)
2. **tm-motion Utilities** - Pre-configured Tailwind utility classes (e.g., `.tm-motion-fade-in`, `.tm-motion-hover-lift`, `.tm-motion-tap-scale`)
3. **Tailwind Motion Utilities** - Standard Tailwind transition/animation utilities that reference motion tokens (e.g., `transition-all duration-normal ease-out`)

**Note:** framer-motion is NOT part of the approved stack. All motion MUST be CSS-based using tokens and utilities.

### Forbidden Patterns

The following patterns are explicitly forbidden:

1. **Raw Duration Values** - ❌ `transition-duration: 200ms`, `animation-duration: 450ms`
2. **Raw Easing Values** - ❌ `transition-timing-function: cubic-bezier(0.5, 0, 0.5, 1)`
3. **Raw Transition Shorthand** - ❌ `transition: all 250ms ease`
4. **Ad-hoc Keyframes** - ❌ Custom `@keyframes` definitions in component files
5. **Inline Style Animations** - ❌ `style={{ transition: '200ms' }}` or `style={{ animation: 'custom 500ms' }}`
6. **Component-Level Motion Scales** - ❌ Defining new motion values within components
7. **Runtime Motion Calculations** - ❌ Calculating motion values from props or state

### Examples

**✅ Allowed:**
```tsx
// Using token CSS variables
<div className="transition-all duration-normal ease-out" />

// Using tm-motion utilities
<div className="tm-motion-fade-in" />
<button className="tm-motion-hover-lift tm-motion-tap-scale" />

// Using Tailwind utilities that reference tokens
<div className="transition-transform duration-fast ease-out" />
```

**❌ Forbidden:**
```tsx
// Raw values
<div style={{ transition: '200ms ease-out' }} />
<div className="transition-all duration-[200ms]" />

// Custom keyframes in component
<style>{`@keyframes custom { ... }`}</style>

// Inline motion calculations
<div style={{ transitionDuration: `${props.duration}ms` }} />
```

---

## Motion GAP

### Definition

**Motion GAP** is a state where a component undergoes a perceivable state or spatial change without temporal feedback (motion/animation).

**Key Principle:** Motion GAP is a diagnostic signal, not an automatic defect. It represents a design decision point that must be consciously evaluated and resolved.

### GAP Evaluation Rule

**Any component that changes state, visibility, or spatial position MUST be evaluated for Motion GAP.**

The following change types trigger mandatory GAP evaluation:

1. **Visibility changes** - Enter/exit animations (e.g., modal open/close, toast show/hide, dropdown expand/collapse)
2. **Size or layout changes** - Dimension changes (e.g., accordion expand/collapse, resizable panels)
3. **Selection or active state changes** - Interactive state transitions (e.g., button active, checkbox checked, tab selected)
4. **User-triggered action feedback** - Direct user interaction responses (e.g., button press, form submission, navigation)

**Rule:** Lack of motion MUST be justified as 'no motion by design'. Unresolved GAPs are forbidden in LOCKED components.

### Allowed GAP Outcomes

Exactly three outcomes are allowed for GAP resolution:

1. **ADD MOTION** — A canonical motion preset is applied from the Motion Preset Catalog (`.tm-motion-*` utilities) or motion tokens.
2. **NO MOTION BY DESIGN** — Absence of motion is explicitly declared and documented as an intentional design decision.
3. **DEFERRED** — Decision is postponed with documented rationale (only allowed for UNLOCKED components).

**Rule:** Unresolved GAPs are forbidden in LOCKED components. A component may only be considered LOCKED if all potential Motion GAPs are resolved.

**Visual Examples:** See Storybook section "Foundation Locked/Composition/Motion/GAP" for visual demonstrations of unresolved GAP, resolved GAP with motion, and no motion by design examples.

### GAP Resolution Examples

**✅ ADD MOTION:**
```tsx
// Modal with fade-scale animation
<Modal className={isOpen ? "tm-motion-fade-scale" : "tm-motion-fade-scale-out"}>
  Content
</Modal>
```

**✅ NO MOTION BY DESIGN:**
```tsx
// Explicitly documented: no motion for instant feedback
// Motion GAP resolved: NO MOTION BY DESIGN - instant state change required for accessibility
<Button onClick={handleClick}>Submit</Button>
```

**✅ DEFERRED (UNLOCKED only):**
```tsx
// Motion GAP: DEFERRED - requires design review for appropriate animation
// Rationale: Component is in active development, motion decision pending
<CustomComponent />
```

**❌ FORBIDDEN:**
```tsx
// Unresolved GAP - component changes state without motion or explicit justification
<Modal isOpen={isOpen}>Content</Modal>
```

---

## Canonical Token Scale Table

The following table defines the canonical motion token scale with key, meaning, and example values:

| Key | Meaning | Example Value |
|-----|---------|---------------|
| `durations.fast` | Fast duration | `150ms` |
| `durations.normal` | Normal duration | `250ms` |
| `durations.slow` | Slow duration | `350ms` |
| `easings["ease-out"]` | Ease out (recommended) | `cubic-bezier(0, 0, 0.2, 1)` |
| `easings["ease-in-out"]` | Ease in-out | `cubic-bezier(0.4, 0, 0.2, 1)` |
| `transitions.fast` | Fast transition | `150ms ease-out` |
| `transitions.normal` | Normal transition | `250ms ease-in-out` |
| `transitions.slow` | Slow transition | `350ms ease-in-out` |
| `keyframes.fadeIn` | Fade in keyframe | `opacity: 0 → 1` |
| `keyframes.slideInUp` | Slide in up keyframe | `translateY(100%) → translateY(0)` |
| `keyframes.scaleIn` | Scale in keyframe | `scale(0.95) → scale(1)` |
| `animations.fadeIn` | Fade in animation | `fadeIn 250ms ease-out` |
| `animations.slideInUp` | Slide in up animation | `slideInUp 250ms ease-out` |
| `animations.spin` | Spin animation | `spin 1s linear infinite` |
| `reducedMotion.duration` | Reduced motion duration | `0ms` (instant) |
| `reducedMotion.transition` | Reduced motion transition | `0ms linear` |

**Rule:** All motion tokens must reference values from this canonical scale. All motion must respect `prefers-reduced-motion` user preferences.

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

Duration tokens define the canonical animation durations for smooth CSS transitions.

**Canonical Values:**
- `instant` → `0ms` (no animation)
- `fast` → `150ms` (quick interactions)
- `normal` → `250ms` (default)
- `slow` → `350ms` (emphasized)

**Rule:** Duration values are optimized for smooth CSS transitions and accessibility compliance.

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
- `normal` → `250ms ease-in-out` (default)
- `normal-in` → `250ms ease-in`
- `normal-out` → `250ms ease-out`
- `normal-in-out` → `250ms ease-in-out`

**Slow Transitions:**
- `slow` → `350ms ease-in-out` (emphasized)
- `slow-in` → `350ms ease-in`
- `slow-out` → `350ms ease-out`
- `slow-in-out` → `350ms ease-in-out`

**Special Transitions:**
- `bounce` → `250ms bounce` (bouncy transition)
- `elastic` → `350ms elastic` (elastic transition)
- `DEFAULT` → `250ms ease-in-out` (default transition)

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
- `fadeIn` → `fadeIn 250ms ease-out`
- `fadeOut` → `fadeOut 150ms ease-in`
- `slideInUp` → `slideInUp 250ms ease-out`
- `slideInDown` → `slideInDown 250ms ease-out`
- `slideInLeft` → `slideInLeft 250ms ease-out`
- `slideInRight` → `slideInRight 250ms ease-out`
- `slideOutUp` → `slideOutUp 150ms ease-in`
- `slideOutDown` → `slideOutDown 150ms ease-in`
- `slideOutLeft` → `slideOutLeft 150ms ease-in`
- `slideOutRight` → `slideOutRight 150ms ease-in`
- `scaleIn` → `scaleIn 250ms ease-out`
- `scaleOut` → `scaleOut 150ms ease-in`
- `spin` → `spin 1s linear infinite`
- `pulse` → `pulse 2s ease-in-out infinite`
- `bounce` → `bounce 1s linear infinite`
- `ping` → `ping 1s ease-out infinite`
- `shake` → `shake 0.5s ease-in-out`
- `accordion-down` → `accordion-down 250ms ease-out`
- `accordion-up` → `accordion-up 250ms ease-out`

**Rule:** Animation tokens MUST combine canonical keyframes, durations, and easings. Components should prefer animation tokens over individual keyframe/duration/easing combinations.

### 6. Reduced Motion Support

Reduced motion support ensures accessibility compliance with user preferences.

**Canonical Reduced Motion Values:**
- `duration` → `0ms` (instant, no animation)
- `easing` → `linear` (linear, no easing)
- `transition` → `0ms linear` (instant transition)
- `mediaQuery` → `@media (prefers-reduced-motion: reduce)`

**Reduced Motion Behavior:**
When `prefers-reduced-motion: reduce` is enabled:
- Durations collapse to `0ms` (instant)
- Keyframe animations are disabled
- Transitions may remain but with zero duration

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

### 6. Physics-Based Motion (Spring, Inertia)

**Forbidden:**
- ❌ Spring animations (`spring()`, `cubic-bezier()` with spring-like curves)
- ❌ Inertia-based animations
- ❌ Physics-based motion systems

**Rationale:** Physics-based motion is intentionally excluded from the design system because:
- **Unpredictable timing** - Spring animations have variable duration based on physics simulation
- **Inconsistent reduced-motion behavior** - Cannot reliably collapse to 0ms for accessibility
- **Hard to govern and test** - Non-deterministic timing makes testing and governance difficult
- **Not token-friendly** - Cannot be represented as fixed duration/easing token pairs

**Rule:** Any spring or physics-based motion usage requires explicit unlock procedure and architectural justification.

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

## Motion Preset Catalog

This section documents all canonical motion presets available via `.tm-motion-*` utility classes. All presets use CSS variables for duration and easing, ensuring compatibility with reduced motion preferences.

### Naming Conventions

**Pattern:** `tm-motion-{type}-{direction}-{state}`

- **Type:** `fade`, `scale`, `slide`, `fade-scale`, `fade-slide`
- **Direction:** `up`, `down`, `left`, `right` (for slide animations)
- **State:** `in`, `out` (for enter/exit animations)
- **Interaction:** `hover-{effect}`, `tap-{effect}` (for interactive states)

**Examples:**
- `.tm-motion-fade-in` - Fade in animation
- `.tm-motion-slide-up` - Slide up animation (enter)
- `.tm-motion-fade-slide-down-out` - Fade + slide down exit animation
- `.tm-motion-hover-lift` - Hover lift effect
- `.tm-motion-tap-scale` - Tap/active scale effect

### Enter/Exit Animation Presets

#### Fade Animations
- `.tm-motion-fade-in` - Fade in (opacity: 0 → 1)
  - Duration: `var(--tm-motion-duration-normal)` (250ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: General enter animations, overlays
  
- `.tm-motion-fade-out` - Fade out (opacity: 1 → 0)
  - Duration: `var(--tm-motion-duration-fast)` (150ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: General exit animations, overlays

#### Scale Animations
- `.tm-motion-scale-in` - Scale in (scale: 0.95 → 1, opacity: 0 → 1)
  - Duration: `var(--tm-motion-duration-normal)` (250ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Modal dialogs, popovers, cards
  
- `.tm-motion-scale-out` - Scale out (scale: 1 → 0.95, opacity: 1 → 0)
  - Duration: `var(--tm-motion-duration-fast)` (150ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Modal dialogs, popovers, cards

#### Slide Animations
- `.tm-motion-slide-up` - Slide up (translateY: 100% → 0, opacity: 0 → 1)
  - Duration: `var(--tm-motion-duration-normal)` (250ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Toast notifications, bottom sheets
  
- `.tm-motion-slide-down` - Slide down (translateY: -100% → 0, opacity: 0 → 1)
  - Duration: `var(--tm-motion-duration-normal)` (250ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Dropdowns, top sheets
  
- `.tm-motion-slide-left` - Slide left (translateX: 100% → 0, opacity: 0 → 1)
  - Duration: `var(--tm-motion-duration-normal)` (250ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Side panels, drawers
  
- `.tm-motion-slide-right` - Slide right (translateX: -100% → 0, opacity: 0 → 1)
  - Duration: `var(--tm-motion-duration-normal)` (250ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Side panels, drawers

#### Compound Animations
- `.tm-motion-fade-scale` - Fade + scale in (scale: 0.95 → 1, opacity: 0 → 1)
  - Duration: `var(--tm-motion-duration-normal)` (250ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Modal dialogs, emphasized enter animations
  
- `.tm-motion-fade-slide-up` - Fade + slide up (translateY: 100% → 0, opacity: 0 → 1)
  - Duration: `var(--tm-motion-duration-normal)` (250ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Toast notifications, bottom sheets
  
- `.tm-motion-fade-slide-down` - Fade + slide down (translateY: -100% → 0, opacity: 0 → 1)
  - Duration: `var(--tm-motion-duration-normal)` (250ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Dropdowns, top sheets
  
- `.tm-motion-fade-slide-left` - Fade + slide left (translateX: 100% → 0, opacity: 0 → 1)
  - Duration: `var(--tm-motion-duration-normal)` (250ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Side panels, drawers
  
- `.tm-motion-fade-slide-right` - Fade + slide right (translateX: -100% → 0, opacity: 0 → 1)
  - Duration: `var(--tm-motion-duration-normal)` (250ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Side panels, drawers

#### Exit Animations
- `.tm-motion-fade-scale-out` - Fade + scale out (scale: 1 → 0.95, opacity: 1 → 0)
  - Duration: `var(--tm-motion-duration-fast)` (150ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Modal dialogs, emphasized exit animations
  
- `.tm-motion-fade-slide-up-out` - Fade + slide up out (translateY: 0 → 100%, opacity: 1 → 0)
  - Duration: `var(--tm-motion-duration-fast)` (150ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Toast notifications, bottom sheets
  
- `.tm-motion-fade-slide-down-out` - Fade + slide down out (translateY: 0 → -100%, opacity: 1 → 0)
  - Duration: `var(--tm-motion-duration-fast)` (150ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Dropdowns, top sheets
  
- `.tm-motion-fade-slide-left-out` - Fade + slide left out (translateX: 0 → 100%, opacity: 1 → 0)
  - Duration: `var(--tm-motion-duration-fast)` (150ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Side panels, drawers
  
- `.tm-motion-fade-slide-right-out` - Fade + slide right out (translateX: 0 → -100%, opacity: 1 → 0)
  - Duration: `var(--tm-motion-duration-fast)` (150ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Side panels, drawers

### Interactive State Presets

#### Hover Animations
- `.tm-motion-hover-lift` - Hover lift effect (scale: 1 → 1.05, translateY: 0 → -0.3125rem)
  - Duration: `var(--tm-motion-duration-fast)` (150ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Cards, buttons, interactive elements
  
- `.tm-motion-hover-scale` - Hover scale effect (scale: 1 → 1.05)
  - Duration: `var(--tm-motion-duration-fast)` (150ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Icons, avatars, small interactive elements

#### Tap/Active Animations
- `.tm-motion-tap-scale` - Tap/active scale effect (scale: 1 → 0.95)
  - Duration: `var(--tm-motion-duration-fast)` (150ms)
  - Easing: `var(--tm-motion-easing-standard)`
  - Use: Buttons, interactive elements, press feedback

### Preset Usage Guidelines

#### Do's

✅ **DO use presets for common patterns:**
```tsx
// Enter animation
<div className="tm-motion-fade-in">Content</div>

// Hover effect
<button className="tm-motion-hover-lift">Hover me</button>

// Combined effects
<button className="tm-motion-hover-lift tm-motion-tap-scale">
  Interactive button
</button>
```

✅ **DO use presets with conditional classes:**
```tsx
<div className={isOpen ? "tm-motion-fade-in" : "tm-motion-fade-out"}>
  Content
</div>
```

✅ **DO combine presets for complex interactions:**
```tsx
<Card className="tm-motion-fade-scale tm-motion-hover-lift">
  Card content
</Card>
```

#### Don'ts

❌ **DON'T create custom animation classes:**
```tsx
// ❌ Forbidden
<div className="custom-fade-in">Content</div>
```

❌ **DON'T use inline styles for motion:**
```tsx
// ❌ Forbidden
<div style={{ animation: "fadeIn 300ms ease-out" }}>Content</div>
```

❌ **DON'T use raw duration/easing values:**
```tsx
// ❌ Forbidden
<div className="transition-all duration-200 ease-in-out">Content</div>
```

❌ **DON'T mix presets with custom transitions:**
```tsx
// ❌ Forbidden
<div className="tm-motion-fade-in transition-all duration-300">
  Content
</div>
```

### Reduced Motion Compatibility

All `.tm-motion-*` presets automatically respect `prefers-reduced-motion` preferences via CSS variables. When reduced motion is enabled:

- Durations collapse to `0ms` (instant)
- Animations become instant transitions
- No motion is forced on users who prefer reduced motion

**Implementation:** CSS variables (`var(--tm-motion-duration-*)`) are dynamically updated by `ThemeProvider` based on user preferences.

---

## Semantic Mapping

### Motion Pattern Usage

**Interaction Transitions:**
- Hover transitions → `transitions.fast` or `transitions.normal`
- Active transitions → `transitions.fast`
- Focus transitions → `transitions.fast` or `transitions.normal`
- Disabled state → no motion (instant)

**Component Animations:**
- Modal open/close → `.tm-motion-fade-scale` / `.tm-motion-fade-scale-out` or `.tm-motion-fade-in` / `.tm-motion-fade-out`
- Toast show/hide → `.tm-motion-fade-slide-up` / `.tm-motion-fade-slide-up-out` or `.tm-motion-fade-in` / `.tm-motion-fade-out`
- Dropdown open/close → `.tm-motion-fade-slide-down` / `.tm-motion-fade-slide-down-out` or `.tm-motion-fade-in` / `.tm-motion-fade-out`
- Tooltip show/hide → `.tm-motion-fade-in` / `.tm-motion-fade-out`
- Loading spinner → `animations.spin` (from motion tokens)
- Loading pulse → `animations.pulse` (from motion tokens)

**Rule:** Components should use motion presets (`.tm-motion-*` utilities) or motion tokens that match their interaction patterns and animation needs, ensuring consistent motion patterns across the design system.

---

## Token System Integration

### Source of Truth

**Canonical Token Definitions:**
- Location: `src/FOUNDATION/tokens/motion/v2.ts` - **ONLY MOTION TOKEN FILE**
- Exports: `motionDurations`, `motionEasings`, `motionTransitions`, `motionFade`, `motionScale`, `motionSlide`, `motionCombined`, `motionReducedMotion`, `motionCSSVariables`, `motionTailwindConfig`

**Rule:** The motion token file (`src/FOUNDATION/tokens/motion/v2.ts`) is the single source of truth for all motion values. Components MUST reference tokens from this file, never define their own motion values.

**Note:** Motion V1 was permanently removed in version 2.0.0. The motion system is singular and versionless post-2.0.0. Any references to Motion V1 in code, comments, examples, or documentation are incorrect and must be removed.

**Component Motion Tokens:**
- **File:** `src/FOUNDATION/tokens/components/motion.ts`
- **Status:** ✅ **CANONICAL** - Preferred for component usage
- **Policy:** `MOTION_TOKENS` provides component-level semantic mappings. Components should prefer `MOTION_TOKENS` over direct token references when possible.

---

## Escape Hatch Policy

In rare cases, raw motion values may be necessary for specific use cases that cannot be achieved with tokens or presets. An escape hatch exists for these exceptional circumstances.

### Escape Hatch Requirements

To use raw motion values, you **MUST**:

1. **Add explicit comment** with reason:
   ```tsx
   // eslint-disable-next-line no-raw-motion-scale -- [specific reason why token cannot be used]
   <div className="transition-all duration-[200ms] ease-in-out">
   ```

2. **Document the exception** in the component's documentation or inline comments

3. **Get approval** from architecture review if the exception affects Foundation components

4. **Consider alternatives first** - Most motion needs can be met with:
   - `.tm-motion-*` utilities
   - `MOTION_TOKENS` references
   - Tailwind utilities that reference tokens (`duration-normal`, `ease-out`)

### When Escape Hatch is NOT Allowed

❌ **Forbidden without exception:**
- Raw values in Foundation components
- Raw values in new components (use tokens from the start)
- Raw values for convenience (must have architectural justification)
- Raw values that duplicate existing token functionality

### Escape Hatch Examples

**✅ Allowed (with comment):**
```tsx
// eslint-disable-next-line no-raw-motion-scale -- Third-party library requires specific timing
<div style={{ transition: "opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)" }}>
```

**❌ Forbidden (no justification):**
```tsx
<div className="transition-all duration-200 ease-in-out">
```

### CI Enforcement

The ESLint rule `no-raw-motion-scale` will fail CI builds on new raw motion usage. To bypass:

1. Add `eslint-disable-next-line` comment with reason
2. Ensure the reason is architecturally justified
3. Consider if a new token or preset should be added instead

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

## Related Documentation

- **[Motion System Lock](./locks/MOTION_LOCK.md)** - Formal lock declaration for motion system (tokens, presets, utilities, tests, stories)
- [Motion Animations Working Guide](../reference/MOTION_ANIMATIONS_GUIDE.md) - Practical guide for implementing motion animations, troubleshooting common issues, and ensuring animations work correctly in Storybook and runtime environments

---

## Version History

- **v2.2** (2025-12-27): Motion 2.0.0 Finalization
  - Motion V1 permanently removed (not deprecated - removed)
  - Added explicit prohibition of physics-based motion (spring, inertia)
  - Updated all references to state V1 must not be reintroduced
  - Motion system finalized and locked as singular, versionless system

- **v2.1** (2025-12-27): Motion GAP Rule Introduction
  - Added Motion GAP section defining GAP concept and evaluation rule
  - Defined mandatory GAP evaluation for all state/spatial changes
  - Established three allowed GAP outcomes: ADD MOTION, NO MOTION BY DESIGN, DEFERRED
  - Integrated GAP rule into component lock requirements
  - Added GAP resolution examples and forbidden patterns

- **v2.0** (2025-12-27): Motion V1 Complete Removal (Major 2.0.0)
  - **BREAKING:** Completely removed Motion V1 tokens from codebase
  - Deleted `src/FOUNDATION/tokens/motion.ts` (V1 file)
  - Removed all V1 exports: `durations`, `easings`, `transitions`, `keyframes`, `animations`, `springs`, `motionCSSVariables`, `tailwindMotionConfig`, `reducedMotion`
  - Removed legacy CSS variable names (`--duration-*`, `--ease-*`, `--transition-*`)
  - Motion system is now singular and versionless
  - Updated Token System Integration section
  - Added CI guard script (`pnpm check:motion-v1`) to prevent V1 reintroduction

- **v1.4** (2025-12-27): Motion Audit and Lock - Escape Hatch Policy
  - Added Escape Hatch Policy section
  - Documented exception process for rare cases requiring raw motion values
  - Clarified CI enforcement and approval requirements

- **v1.3** (2025-12-27): Motion Audit and Lock - Preset Catalog
  - Added comprehensive Motion Preset Catalog section
  - Documented all `.tm-motion-*` utility classes with usage guidelines
  - Added Do's and Don'ts for preset usage
  - Updated Semantic Mapping to reference presets
  - Verified all presets use CSS variables and are reduced-motion compatible

- **v1.2** (2025-12-27): Motion Audit and Lock - Definitions Section
  - Added Motion Domains and Definitions section
  - Defined seven motion domains (Enter/Exit, Hover, Press/Tap, Focus/Keyboard, Expand/Collapse, Toast/Dialog, Loading/Progress)
  - Documented allowed mechanisms (token CSS vars, tm-motion utilities, Tailwind motion utilities)
  - Explicitly forbidden patterns with examples
  - Clarified that framer-motion is NOT part of approved stack

- **v1.1** (2025-12-16): Formal Lock Completion
  - Changed status from ACTIVE to LOCKED
  - Formally locked as part of Foundation layer closure
  - All rules are immutable and require unlock procedure for modifications
  - Future changes require Authority versioning (v2+) or explicit unlock procedure

- **v1.0** (2025-12-16): Initial Motion Authority Contract definition
  - Defined canonical motion token scale (durations, easings, transitions, keyframes, animations)
  - Defined reduced motion support and component rules
  - Established as immutable authority

---

**Status:** ✅ **LOCKED**  
**Version:** 2.2  
**Date Created:** 2025-12-16  
**Last Updated:** 2025-12-27  
**Priority:** BLOCKER  
**Authority Domain:** Motion Authority

---

## Documentation Consistency Sign-off

**Date:** 2025-12-27  
**Status:** ✅ **ALIGNED**

Documentation aligned with Motion 2.0.0 (V1 fully removed). All references to Motion V1 as deprecated or legacy have been removed. Motion system is described as singular and versionless post-2.0.0. All duration values and reduced-motion behavior descriptions are consistent across all motion documentation.
