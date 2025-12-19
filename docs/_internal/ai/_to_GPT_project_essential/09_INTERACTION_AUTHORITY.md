# Interaction Authority Contract

**Status:** ✅ LOCKED  
**Priority:** BLOCKER  
**Date Created:** 2025-11-25  
**Date Locked:** 2025-12-16  
**Version:** 1.1  
**Enforcement:** TUNG_INTERACTION_AUTHORITY_FOUNDATION  
**Reference Component:** Button (`src/components/ui/button.tsx`)

---

## Document Classification

**TYPE:** AUTHORITY  
**MUTABILITY:** IMMUTABLE  
**LOCK STATUS:** ✅ LOCKED  
**AUTHORITY DOMAIN:** Interaction Authority

**Purpose:** This document defines the canonical declarative rules for interaction state behavior. It establishes architectural law that cannot be changed without explicit unlock procedure.

---

## Overview

This document defines the canonical Interaction Authority contract for all interactive UI components. It establishes the rules for when user interactions (hover, active, focus, disabled, loading) can and cannot activate, ensuring consistent behavior across the design system.

**Key Principle:** Interaction states are controlled by browser-native behavior and CSS, not JavaScript. DevTools force states are NOT a source of truth - real user interactions must work.

---

## Authority Chain

**Interaction Authority** is the single source of truth for all interactive state behavior across all UI components in the design system.

**Authority Hierarchy:**
1. **Interaction Authority Contract** (this document) - Defines rules and patterns
2. **Component Implementation** - Button component is the reference implementation
3. **Token System** - Provides state-specific CSS variables via State Matrix
4. **CSS Layer** - Applies state classes via Tailwind prefixes
5. **Browser Native** - Executes state activation based on user interactions

---

## Separation Law

This section clarifies the separation of concerns between Interaction Authority and State Authority.

### Interaction Authority Responsibility (WHEN Layer)

**Interaction Authority controls:**
- **WHEN states can activate** - Activation conditions for each state (hover, active, focus-visible, disabled, loading)
- **Activation blocking rules** - What conditions block state activation (disabled blocks hover, loading blocks active, etc.)
- **Hover modality detection** - Detection of pointer-capable environments (`@media (hover: hover)` and `@media (pointer: fine)`) is interaction-only responsibility
- **State interaction behavior** - How states interact with user input and browser events

**Rule:** Interaction Authority defines the behavioral rules for when states activate, not what states exist or how they are represented.

### State Authority Responsibility (WHAT and HOW Layers)

**State Authority controls:**
- **WHAT states exist** - The canonical state set (base, hover, active, focus-visible, disabled, loading) is defined in [STATE_MATRIX.md](./STATE_MATRIX.md)
- **HOW states are represented** - State token format, structure, and naming rules are defined in [STATE_AUTHORITY.md](./STATE_AUTHORITY.md)
- **State token structure** - Component → Variant → State → Property → Value hierarchy
- **State token naming** - CSS variable naming patterns (`--{component}-{variant}-{state}-{property}`)

**Rule:** State Authority defines the existence and representation of states, not when they activate or how they interact with user input.

### Separation Boundary

**Interaction Authority (WHEN):** "Hover activates on pointer move when `!disabled && !loading && pointer-events: auto`."

**State Authority (WHAT/HOW):** "Hover state exists and is represented as `--button-primary-hover-bg` CSS variable."

**Rule:** These authorities are separate and complementary. Interaction Authority defines activation rules, State Authority defines state existence and representation.

---

## State Priority Order

The Interaction Authority enforces this strict priority order:

```
disabled > loading > active > hover > focus-visible > base
```

**Rules:**
- Higher priority states **block** lower priority states
- Only one state can be active at a time (except base, which is always present)
- States are mutually exclusive based on priority

---

## State Definitions

### 1. Disabled State

**Priority:** 1 (Highest)

**Activation Conditions:**
- `disabled={true}` prop is set
- HTML `disabled` attribute is present
- Browser applies `:disabled` pseudo-class

**Interaction Rules:**
- ✅ **MUST** block all pointer interactions (`pointer-events: none`)
- ✅ **MUST** show `cursor-not-allowed`
- ✅ **MUST** block hover, active, and focus states
- ✅ **MUST** prevent keyboard activation

**Visual Rules:**
- ✅ **MUST** use disabled state tokens (from State Matrix)
- ✅ **MUST** be visually distinct from enabled state

**CSS Implementation:**
```css
/* Applied via disabled: prefix */
disabled:pointer-events-none
disabled:cursor-not-allowed
disabled:bg-[hsl(var(--button-{variant}-disabled-bg))]
```

**Forbidden:**
- ❌ Hover effects when `disabled={true}`
- ❌ Active effects when `disabled={true}`
- ❌ Focus effects when `disabled={true}`
- ❌ `pointer-events-none` in base state (only via `disabled:` prefix)

---

### 2. Loading State

**Priority:** 2

**Activation Conditions:**
- `loading={true}` prop is set (when implemented)
- OR `aria-busy="true"` attribute is present
- OR `data-loading="true"` attribute is present

**Interaction Rules:**
- ✅ **MUST** block hover and active states
- ✅ **MUST** allow visual feedback (spinner, etc.)
- ✅ **MUST** prevent click interactions
- ⚠️ **MAY** allow focus for accessibility (keyboard navigation)

**Visual Rules:**
- ✅ **MUST** use loading state tokens (from State Matrix)
- ✅ **MUST** show loading indicator (spinner, etc.)

**CSS Implementation:**
```css
/* Applied via loading: or [aria-busy="true"]: prefix */
loading:pointer-events-none
[aria-busy="true"]:pointer-events-none
loading:bg-[hsl(var(--button-{variant}-loading-bg))]
```

**Forbidden:**
- ❌ Hover effects when `loading={true}`
- ❌ Active effects when `loading={true}`
- ❌ Click handlers when `loading={true}`

**Note:** Loading state is currently not fully implemented in Button component. This contract defines the required behavior when it is implemented.

---

### 3. Active State

**Priority:** 3

**Activation Conditions:**
- User presses mouse button down (`mousedown` event)
- Browser applies `:active` pseudo-class
- **ONLY** when element is not disabled or loading

**Interaction Rules:**
- ✅ **MUST** activate only on `mousedown` (not on `:hover`)
- ✅ **MUST** have priority over hover state
- ✅ **MUST** deactivate on `mouseup` or `mouseleave`

**Visual Rules:**
- ✅ **MUST** use active state tokens (from State Matrix)
- ✅ **MUST** provide clear pressed feedback

**CSS Implementation:**
```css
/* Applied via active: prefix */
active:bg-[hsl(var(--button-{variant}-active-bg))]
```

**Forbidden:**
- ❌ Active state when `disabled={true}`
- ❌ Active state when `loading={true}`
- ❌ JavaScript-based active state manipulation
- ❌ Active state triggered by hover

---

### 4. Hover State

**Priority:** 4

**Activation Conditions:**
- User moves pointer over element
- Browser applies `:hover` pseudo-class
- **ONLY** when:
  - Element is NOT disabled (`!disabled`)
  - Element is NOT loading (`!loading`)
  - Element has `pointer-events: auto` (default)
  - No overlay/wrapper blocks pointer events

**Interaction Rules:**
- ✅ **MUST** activate only on real pointer movement (not DevTools force)
- ✅ **MUST** deactivate when pointer leaves element
- ✅ **MUST** be blocked by disabled/loading states
- ✅ **MUST** have lower priority than active state

**Visual Rules:**
- ✅ **MUST** use hover state tokens (from State Matrix)
- ✅ **MUST** provide clear hover feedback

**CSS Implementation:**
```css
/* Applied via hover: prefix */
hover:bg-[hsl(var(--button-{variant}-hover-bg))]
```

**Forbidden:**
- ❌ Hover effects when `disabled={true}`
- ❌ Hover effects when `loading={true}`
- ❌ Hover effects when `pointer-events: none`
- ❌ JavaScript-based hover state manipulation
- ❌ DevTools force `:hover` as proof of functionality

**Critical Rule:** Hover **MUST** work with real mouse cursor, not just DevTools emulation.

---

### 5. Focus-Visible State

**Priority:** 5

**Activation Conditions:**
- User navigates to element via keyboard (Tab, etc.)
- Browser applies `:focus-visible` pseudo-class
- **ONLY** when element is not disabled

**Interaction Rules:**
- ✅ **MUST** activate only on keyboard navigation
- ✅ **MUST** NOT activate on mouse click (use `:focus-visible`, not `:focus`)
- ✅ **MUST** show focus ring for accessibility
- ✅ **MUST** be blocked by disabled state

**Visual Rules:**
- ✅ **MUST** use focus state tokens (from State Matrix)
- ✅ **MUST** show visible focus ring

**CSS Implementation:**
```css
/* Applied via focus-visible: prefix */
focus-visible:ring-1
focus-visible:ring-ring
focus-visible:outline-none
focus-visible:bg-[hsl(var(--button-{variant}-focus-bg))]
```

**Forbidden:**
- ❌ Focus effects when `disabled={true}`
- ❌ Focus effects on mouse click (use `:focus-visible`)
- ❌ JavaScript-based focus state manipulation

---

### Focus-Visible and Hover Interaction (Accessibility Edge Case)

**Critical Semantic Rule:** When both hover and focus-visible states are active simultaneously (e.g., keyboard user navigates to element, then moves mouse over it), the following rules apply:

**Visual Priority:**
- ✅ Hover state **MAY visually override** focus-visible state (hover has higher priority: 4 > 5)
- ✅ Component may show hover visual styles instead of focus-visible styles when both are active
- ✅ This is acceptable because hover provides immediate visual feedback

**Logical/Functional Priority:**
- ✅ Focus-visible state **MUST remain logically active** for accessibility
- ✅ Keyboard navigation (Tab, Enter, Space) **MUST continue to work** even when hover is active
- ✅ Screen readers and accessibility tools **MUST continue to recognize** focused state
- ✅ Focus ring may be visually suppressed by hover, but focus management must not be affected

**Implementation Guidance:**
- Components should ensure keyboard navigation works correctly even when hover styles are visually overriding focus styles
- Use `:focus-visible` (not `:focus`) to avoid visual focus on mouse clicks while maintaining keyboard focus accessibility
- Do not use JavaScript to remove focus state when hover is active - allow CSS visual priority to handle styling only

**Rationale:** This rule ensures accessibility is maintained (keyboard users can always navigate and activate) while allowing natural visual feedback for pointer users.

---

### 6. Base State

**Priority:** 6 (Lowest)

**Activation Conditions:**
- Default state when no other state is active
- Always present as foundation

**Interaction Rules:**
- ✅ **MUST** have `pointer-events: auto` (default)
- ✅ **MUST** NOT block pointer events
- ✅ **MUST** allow all interactions (unless blocked by higher priority states)

**Visual Rules:**
- ✅ **MUST** use base state tokens (from State Matrix)

**CSS Implementation:**
```css
/* Base state - no special prefix needed */
bg-[hsl(var(--button-{variant}-base-bg))]
```

**Forbidden:**
- ❌ `pointer-events-none` in base state
- ❌ Any interaction blocking in base state

---

## Interaction Guard Rules

### Rule 1: Hover Activation Guard

**Hover is ALLOWED only if ALL conditions are met:**
1. `!disabled` (element is not disabled)
2. `!loading` (element is not loading)
3. `pointer-events: auto` (default, not blocked)
4. No overlay/wrapper blocking pointer
5. Real pointer movement (not DevTools force)

**Hover is BLOCKED if ANY condition is true:**
- `disabled={true}`
- `loading={true}`
- `pointer-events: none` on element or parent
- Overlay/div-wrapper intercepts pointer
- Element is not in viewport

---

### Rule 2: Active Activation Guard

**Active is ALLOWED only if ALL conditions are met:**
1. `!disabled` (element is not disabled)
2. `!loading` (element is not loading)
3. `mousedown` event occurred
4. Element is hovered (pointer is over element)

**Active is BLOCKED if ANY condition is true:**
- `disabled={true}`
- `loading={true}`
- No `mousedown` event
- Pointer is not over element

---

### Rule 3: Focus Activation Guard

**Focus-visible is ALLOWED only if ALL conditions are met:**
1. `!disabled` (element is not disabled)
2. Keyboard navigation (Tab, etc.)
3. Element is focusable

**Focus-visible is BLOCKED if ANY condition is true:**
- `disabled={true}`
- Mouse click (use `:focus-visible`, not `:focus`)
- Element is not focusable

---

### Rule 4: Disabled Activation Guard

**Disabled ALWAYS blocks:**
- Hover state
- Active state
- Focus state (for interaction, but may allow for accessibility)
- All pointer events
- All click handlers

**Disabled NEVER allows:**
- Hover effects
- Active effects
- Click interactions
- Pointer events

---

### Rule 5: Loading Activation Guard

**Loading ALWAYS blocks:**
- Hover state
- Active state
- Click handlers

**Loading ALLOWS:**
- Visual feedback (spinner, etc.)
- Focus state (for accessibility, keyboard navigation)

---

## CSS Implementation Requirements

### Required CSS Patterns

**1. Disabled State:**
```css
/* MUST use disabled: prefix */
disabled:pointer-events-none
disabled:cursor-not-allowed
disabled:bg-[hsl(var(--button-{variant}-disabled-bg))]
```

**2. Loading State:**
```css
/* MUST use loading: or [aria-busy="true"]: prefix */
loading:pointer-events-none
[aria-busy="true"]:pointer-events-none
loading:bg-[hsl(var(--button-{variant}-loading-bg))]
```

**3. Active State:**
```css
/* MUST use active: prefix */
active:bg-[hsl(var(--button-{variant}-active-bg))]
```

**4. Hover State:**
```css
/* MUST use hover: prefix */
hover:bg-[hsl(var(--button-{variant}-hover-bg))]
```

**5. Focus-Visible State:**
```css
/* MUST use focus-visible: prefix */
focus-visible:ring-1
focus-visible:ring-ring
focus-visible:outline-none
```

**6. Base State:**
```css
/* No prefix - default state */
bg-[hsl(var(--button-{variant}-base-bg))]
```

---

## Forbidden Patterns

### ❌ FORBIDDEN: Base State Pointer Events Blocking

```css
/* ❌ FORBIDDEN */
.pointer-events-none { ... }

/* ✅ CORRECT */
.disabled\:pointer-events-none:disabled { ... }
```

### ❌ FORBIDDEN: JavaScript-Based Visual States

```typescript
// ❌ FORBIDDEN
const [isHovered, setIsHovered] = useState(false);
<div onMouseEnter={() => setIsHovered(true)} className={isHovered ? 'hover-bg' : ''}>

// ✅ CORRECT
<div className="hover:bg-[hsl(var(--button-primary-hover-bg))]">
```

### ❌ FORBIDDEN: DevTools Force State as Source of Truth

```typescript
// ❌ FORBIDDEN - Don't test only with DevTools force :hover
// ✅ CORRECT - Test with real mouse cursor
```

### ❌ FORBIDDEN: Hover Effects on Disabled Elements

```css
/* ❌ FORBIDDEN */
button:hover { background: blue; }
button:disabled:hover { background: gray; } /* Still allows hover */

/* ✅ CORRECT */
button:hover:not(:disabled) { background: blue; }
button:disabled { pointer-events: none; }
```

---

## Component Implementation Requirements

### Required Props

**All interactive components MUST support:**
- `disabled?: boolean` - Disables all interactions
- `loading?: boolean` - Blocks hover/active, shows loading state (when implemented)

### Required Attributes

**All interactive components MUST apply:**
- `aria-disabled={disabled}` - Accessibility attribute
- `disabled={disabled}` - HTML disabled attribute (for button elements)
- `aria-busy={loading}` - Accessibility attribute for loading state (when implemented)

### Required CSS Classes

**All interactive components MUST use:**
- State tokens from component tokens (e.g., `BUTTON_TOKENS`)
- CSS variables from State Matrix
- Tailwind state prefixes (`hover:`, `active:`, `focus-visible:`, `disabled:`, `loading:`)

---

## Reference Implementation

**Button Component** (`src/components/ui/button.tsx`) is the reference implementation for Interaction Authority.

### Reference Implementation Scope

**Button is a SEMANTIC reference only** for interaction behavior patterns:

- ✅ **Button demonstrates:** How interaction states activate and interact according to Interaction Authority rules
- ✅ **Button demonstrates:** How priority order (disabled > loading > active > hover > focus-visible > base) applies in practice
- ✅ **Button demonstrates:** How suppression rules (disabled blocks hover/active/focus) work correctly
- ✅ **Button demonstrates:** Correct use of native CSS pseudo-classes (`:hover`, `:active`, `:focus-visible`, `:disabled`)

**Button is NOT a reference for:**
- ❌ Visual styling (colors, spacing, typography) - these come from Color Authority and Token System
- ❌ Component-specific token structure - tokens are component-specific and Button's tokens are not normative for other components
- ❌ Variant naming or visual appearance - each component has its own design tokens

**All interactive components** (Input, Select, Checkbox, TabsTrigger, etc.) must follow the same interaction semantics as Button, but may have completely different visual styles and token structures.

### Key Implementation Details

- Uses `disabled:pointer-events-none` via `BUTTON_TOKENS.state.disabled.pointerEvents`
- Uses `hover:`, `active:`, `focus-visible:` prefixes for state classes
- Icon wrappers have `pointer-events-none` to not block button hover
- Base state has implicit `pointer-events: auto`

**See:** `docs/architecture/INTERACTION_AUTHORITY_AUDIT.md` for full audit.

**Note:** For enforcement mechanisms and verification protocols, see the audit documentation in `docs/architecture/INTERACTION_AUTHORITY_AUDIT.md`.

---

## Related Documents

- `docs/architecture/INTERACTION_AUTHORITY_AUDIT.md` - Button component audit
- `docs/architecture/STATE_AUTHORITY.md` - State Matrix contract
- `docs/architecture/INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md` - Interactive size scale (for interactive components)
- `src/components/ui/button.tsx` - Reference implementation

---

**Last Updated:** 2025-12-16  
**Version:** 1.1.1  
**Lock Status:** ✅ LOCKED - Only changes allowed via explicit 'Unlock Interaction Authority' task

