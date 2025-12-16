# State Authority Matrix

**Status:** ✅ LOCKED  
**Priority:** BLOCKER  
**Date Created:** 2025-12-16  
**Date Locked:** 2025-12-16  
**Version:** 1.0  
**Enforcement:** FND_LOCK_STATE_AUTHORITY_MATRIX  
**Reference Component:** Button (`src/components/ui/button.tsx`)

---

## Document Classification

**TYPE:** AUTHORITY  
**MUTABILITY:** IMMUTABLE  
**LOCK STATUS:** ✅ LOCKED  
**AUTHORITY DOMAIN:** State Authority Matrix

**Purpose:** This document defines the canonical declarative rules for WHAT states exist and HOW they relate across all interactive UI components. It establishes architectural law that cannot be changed without explicit unlock procedure.

---

## Overview

This document defines the **universal State Authority Matrix** that governs all interactive UI component states across the system. It establishes a single canonical state model applicable to Button, Input, Select, Checkbox, Tabs, and all future interactive components.

**Key Principle:** There exists a fixed, minimal set of states that ALL interactive components MUST use. No component may define additional states beyond this canonical set.

**This document defines state existence and relationships only.** Implementation details (CSS variables, State Matrix structure) are defined in [STATE_AUTHORITY_CONTRACT.md](./STATE_AUTHORITY_CONTRACT.md). Activation rules (when states can activate) are defined in [INTERACTION_AUTHORITY_CONTRACT.md](./INTERACTION_AUTHORITY_CONTRACT.md).

---

## Authority Hierarchy

The State Authority Matrix is the foundation for state management:

1. **State Authority Matrix** (this document) - Defines WHAT states exist and HOW they relate
2. **Interaction Authority Contract** - Defines WHEN states can activate
3. **State Authority Contract** - Defines HOW states are implemented (CSS variables, State Matrix structure)
4. **Component Implementation** - Button component is the reference implementation
5. **Token System** - Provides state-specific CSS variables via State Matrix

---

## Authority Flow: WHAT → WHEN → HOW

The three authority layers work together in a strict hierarchical flow:

### Layer 1: State Authority Matrix (WHAT)

**This document** defines:
- **WHAT states exist** - The canonical state set (base, hover, active, focus-visible, disabled, loading)
- **HOW states relate** - Priority order and suppression rules

This is the **foundational semantic layer**. All other layers depend on this definition.

### Layer 2: Interaction Authority Contract (WHEN)

**Interaction Authority Contract** defines:
- **WHEN states can activate** - Activation conditions for each state
- **WHEN states are blocked** - Suppression and blocking rules
- **WHEN states interact** - Priority resolution in practice

This layer depends on State Authority Matrix (Layer 1) and adds behavioral rules.

### Layer 3: Styling Authority (HOW)

**Styling** (tokens, CSS, visual appearance) is **subordinate** to both semantic layers:

- **State Authority Contract** - Defines HOW states are implemented (CSS variables, State Matrix structure)
- **Color Authority** - Defines color tokens
- **Token System** - Provides implementation mechanism
- **Component Tokens** - Provide component-specific styling

**Critical Rule:** Styling may vary per component, but must always respect:
1. **State Authority Matrix** - Only use canonical states, follow priority order
2. **Interaction Authority Contract** - Follow activation and blocking rules

**Styling is NOT authoritative** - It implements semantic rules defined in Layers 1 and 2.

### Separation of Concerns

- ✅ **State Authority Matrix:** "Six states exist. Priority: disabled > loading > active > hover > focus-visible > base."
- ✅ **Interaction Authority Contract:** "Hover activates on pointer move when !disabled && !loading."
- ✅ **Styling (State Authority Contract, Tokens):** "Hover uses CSS variable `--button-primary-hover-bg`."

**Visual styling, token structure, and component-specific design are separate concerns** that must conform to the semantic layers above, but are not themselves sources of semantic authority.

---

## Canonical State Set

The State Authority Matrix defines **exactly six states**. No component may define additional states beyond this canonical set.

### The Six Canonical States

1. **`base`** - Default visual and interaction state with no user input
2. **`hover`** - Pointer hover state when pointer-capable environment is available
3. **`active`** - Pressed or activated state during pointer or keyboard interaction
4. **`focus-visible`** - Keyboard or accessibility-driven focus state
5. **`disabled`** - Non-interactive state that suppresses all other states
6. **`loading`** - Transient state indicating ongoing action; interaction suppressed

---

## State Semantics

### 1. Base State

**Semantic Definition:** Default visual and interaction state with no user input.

**Characteristics:**
- Always present as the foundation state
- No special user interaction required
- Standard visual appearance
- All interactions enabled (unless blocked by higher priority states)

**When Applied:**
- Default state when component is rendered
- When no other state is active
- When higher priority states are not applicable

**Visual and Interaction:**
- Standard component appearance
- `pointer-events: auto` (default)
- All interactions allowed

---

### 2. Hover State

**Semantic Definition:** Pointer hover state when pointer-capable environment is available.

**Characteristics:**
- Only activates when pointer device is present
- Indicates element is under pointer cursor
- Provides visual feedback before interaction
- Lower priority than active state

**When Applied:**
- User moves pointer over element
- Element is NOT disabled
- Element is NOT loading
- Element has `pointer-events: auto`

**Visual and Interaction:**
- Visual feedback indicating interactivity
- Maintains all interactions
- Deactivates when pointer leaves

**Forbidden:**
- ❌ JavaScript simulation of hover state
- ❌ Hover when disabled
- ❌ Hover when loading
- ❌ DevTools force `:hover` as proof of functionality (real mouse required)

---

### 3. Active State

**Semantic Definition:** Pressed or activated state during pointer or keyboard interaction.

**Characteristics:**
- Indicates element is being pressed/activated
- Higher priority than hover state
- Short-lived (duration of press/activation)
- Provides tactile feedback

**When Applied:**
- User presses mouse button down (`mousedown`)
- User activates via keyboard (Enter, Space)
- Element is NOT disabled
- Element is NOT loading

**Visual and Interaction:**
- Visual feedback indicating press/activation
- Higher priority than hover (overrides hover styles)
- Deactivates on release

**Forbidden:**
- ❌ Active state when disabled
- ❌ Active state when loading
- ❌ JavaScript-based active state manipulation
- ❌ Active state triggered by hover (only on actual press/activation)

---

### 4. Focus-Visible State

**Semantic Definition:** Keyboard or accessibility-driven focus state.

**Characteristics:**
- Indicates element is focused for keyboard navigation
- Accessibility requirement (WCAG)
- Only visible on keyboard navigation, not mouse clicks
- Lower priority than active and hover

**When Applied:**
- User navigates to element via keyboard (Tab, etc.)
- Browser applies `:focus-visible` pseudo-class
- Element is NOT disabled
- Accessibility tools request focus

**Visual and Interaction:**
- Visible focus indicator (ring, outline, etc.)
- Indicates keyboard navigation target
- Maintains accessibility compliance

**Forbidden:**
- ❌ Focus effects when disabled
- ❌ Focus effects on mouse click (use `:focus-visible`, not `:focus`)
- ❌ JavaScript-based focus state manipulation

---

### 5. Disabled State

**Semantic Definition:** Non-interactive state that suppresses all other states.

**Characteristics:**
- Highest priority state (blocks all others)
- Indicates element is not available for interaction
- Prevents all user interactions
- Visually distinct from enabled state

**When Applied:**
- `disabled={true}` prop is set
- HTML `disabled` attribute is present
- Component logic determines element should be disabled

**Visual and Interaction:**
- Visually distinct appearance (reduced opacity, grayed out, etc.)
- `pointer-events: none`
- `cursor-not-allowed`
- All interactions blocked

**Suppression Rules:**
- ✅ **MUST** block hover state
- ✅ **MUST** block active state
- ✅ **MUST** block focus-visible state (for interactions)
- ✅ **MUST** block all pointer events
- ✅ **MUST** prevent keyboard activation

**Forbidden:**
- ❌ Hover effects when disabled
- ❌ Active effects when disabled
- ❌ Focus effects when disabled
- ❌ Any interaction when disabled

---

### 6. Loading State

**Semantic Definition:** Transient state indicating ongoing action; interaction suppressed.

**Characteristics:**
- Second highest priority (only disabled has higher priority)
- Indicates ongoing asynchronous operation
- Prevents user interactions that could interfere
- May allow focus for accessibility

**When Applied:**
- `loading={true}` prop is set
- `aria-busy="true"` attribute is present
- `data-loading="true"` attribute is present
- Component logic indicates ongoing operation

**Visual and Interaction:**
- Loading indicator (spinner, progress bar, etc.)
- Visual feedback indicating operation in progress
- `pointer-events: none` (blocks interactions)
- May allow keyboard focus for accessibility

**Suppression Rules:**
- ✅ **MUST** block hover state
- ✅ **MUST** block active state
- ⚠️ **MAY** allow focus-visible (for accessibility)
- ✅ **MUST** block click interactions

**Forbidden:**
- ❌ Hover effects when loading
- ❌ Active effects when loading
- ❌ Click handlers when loading

---

## Priority Order

The State Authority Matrix enforces this **strict priority order**:

```
disabled > loading > active > hover > focus-visible > base
```

**Rules:**
- Higher priority states **block** lower priority states
- Only one state can be active at a time (except base, which is always present)
- States are mutually exclusive based on priority
- Priority determines which state's visual styles apply

### Priority Resolution

When multiple states could apply simultaneously:

1. **If disabled:** Only disabled state applies, all others blocked
2. **Else if loading:** Only loading state applies (hover/active blocked, focus may apply)
3. **Else if active:** Active state applies (overrides hover and focus-visible)
4. **Else if hover:** Hover state applies (overrides focus-visible)
5. **Else if focus-visible:** Focus-visible state applies
6. **Else:** Base state applies

---

## Suppression Rules

### Disabled State Suppression

**Disabled state ALWAYS suppresses:**
- ✅ Hover state
- ✅ Active state
- ✅ Focus-visible state (for interactions)
- ✅ All pointer events
- ✅ All click handlers
- ✅ All keyboard activation

**Disabled state NEVER allows:**
- ❌ Hover effects
- ❌ Active effects
- ❌ Focus effects
- ❌ Any interaction

### Loading State Suppression

**Loading state ALWAYS suppresses:**
- ✅ Hover state
- ✅ Active state
- ✅ Click handlers

**Loading state ALLOWS:**
- ⚠️ Focus-visible state (for accessibility, keyboard navigation)

**Loading state NEVER allows:**
- ❌ Hover effects
- ❌ Active effects
- ❌ Click interactions

### Active State Suppression

**Active state ALWAYS suppresses:**
- ✅ Hover state (when active, hover styles do not apply)
- ✅ Focus-visible state (active takes visual priority)

**Active state NEVER suppresses:**
- ❌ Base state (base is always present)

### Hover State Suppression

**Hover state ALWAYS suppresses:**
- ✅ Focus-visible state (hover takes visual priority)

**Hover state NEVER suppresses:**
- ❌ Base state (base is always present)
- ❌ Active state (active has higher priority)

### Focus-Visible State Suppression

**Focus-visible state NEVER suppresses:**
- ✅ Base state (base is always present)
- ❌ Hover state (hover has higher priority)
- ❌ Active state (active has higher priority)

---

## Hard Rules

The following rules are **IMMUTABLE** and **MANDATORY**:

### Rule 1: Fixed State Set

**No component may define additional states beyond the canonical set.**

- ✅ **ALLOWED:** Using only the six canonical states (base, hover, active, focus-visible, disabled, loading)
- ❌ **FORBIDDEN:** Creating component-specific states (e.g., `selected`, `checked`, `expanded`)
- ❌ **FORBIDDEN:** Creating variant-specific states
- ❌ **FORBIDDEN:** Creating conditional states not in the canonical set

**Note:** Component-specific behaviors (like `checked` for checkboxes) should be modeled as component properties/props, not as states. States are about user interaction feedback, not component data model.

### Rule 2: Disabled State Suppression

**Disabled state suppresses hover, active, and focus-visible.**

- ✅ **REQUIRED:** When `disabled={true}`, hover state MUST NOT activate
- ✅ **REQUIRED:** When `disabled={true}`, active state MUST NOT activate
- ✅ **REQUIRED:** When `disabled={true}`, focus-visible state MUST NOT activate (for interactions)
- ❌ **FORBIDDEN:** Hover effects when disabled
- ❌ **FORBIDDEN:** Active effects when disabled
- ❌ **FORBIDDEN:** Focus effects when disabled

### Rule 3: Loading State Suppression

**Loading state suppresses hover and active but may retain focus-visible.**

- ✅ **REQUIRED:** When `loading={true}`, hover state MUST NOT activate
- ✅ **REQUIRED:** When `loading={true}`, active state MUST NOT activate
- ⚠️ **ALLOWED:** When `loading={true}`, focus-visible MAY activate (for accessibility)
- ❌ **FORBIDDEN:** Hover effects when loading
- ❌ **FORBIDDEN:** Active effects when loading

### Rule 4: Native Hover Only

**Hover state MUST NOT be simulated via JavaScript.**

- ✅ **REQUIRED:** Hover MUST use CSS `:hover` pseudo-class
- ✅ **REQUIRED:** Hover MUST activate via browser-native pointer detection
- ❌ **FORBIDDEN:** JavaScript `onMouseEnter` / `onMouseLeave` for visual hover effects
- ❌ **FORBIDDEN:** `useState` for hover state management
- ❌ **FORBIDDEN:** Conditional className based on hover state

**Rationale:** JavaScript-based hover breaks accessibility, keyboard navigation, and browser heuristics. CSS `:hover` is the only valid approach.

### Rule 5: Native Active Only

**Active state MUST originate from native browser interaction.**

- ✅ **REQUIRED:** Active MUST use CSS `:active` pseudo-class
- ✅ **REQUIRED:** Active MUST activate via browser-native `mousedown` / `keydown` events
- ❌ **FORBIDDEN:** JavaScript `onMouseDown` / `onMouseUp` for visual active effects
- ❌ **FORBIDDEN:** `useState` for active state management
- ❌ **FORBIDDEN:** Conditional className based on active state

**Rationale:** Browser-native active state provides consistent behavior across all input methods.

### Rule 6: Focus-Visible Heuristics

**Focus-visible state MUST respect browser and accessibility heuristics.**

- ✅ **REQUIRED:** Focus-visible MUST use CSS `:focus-visible` pseudo-class
- ✅ **REQUIRED:** Focus-visible MUST NOT activate on mouse clicks
- ✅ **REQUIRED:** Focus-visible MUST activate on keyboard navigation (Tab, etc.)
- ✅ **REQUIRED:** Focus-visible MUST respect user preferences (accessibility settings)
- ❌ **FORBIDDEN:** Using `:focus` instead of `:focus-visible`
- ❌ **FORBIDDEN:** JavaScript-based focus state management
- ❌ **FORBIDDEN:** Focus effects on mouse clicks

**Rationale:** `:focus-visible` provides accessible focus indicators only when needed, avoiding visual clutter from mouse clicks.

---

## Scope of Application

### Components That MUST Conform

All interactive UI components MUST conform to the State Authority Matrix:

- ✅ **Button** - Reference implementation
- ✅ **Input** - Text input fields
- ✅ **Textarea** - Multi-line text input
- ✅ **Select** - Dropdown selection
- ✅ **Checkbox** - Checkbox input
- ✅ **Radio** - Radio button input
- ✅ **Switch** - Toggle switch
- ✅ **TabsTrigger** - Tab trigger button
- ✅ **Any future interactive component**

### Components That Are Excluded

The following component types are excluded from State Authority Matrix requirements:

- ❌ **Purely presentational components** - Components with no user interaction
- ❌ **Static layout components** - Layout containers, dividers, spacing components
- ❌ **Text components** - Typography, labels, headings (unless interactive)

**Note:** If a component becomes interactive (adds hover, click, focus behavior), it MUST then conform to the State Authority Matrix.

---

## Reference Implementation

**Button Component** (`src/components/ui/button.tsx`) is the canonical reference implementation for the State Authority Matrix.

### Button State Conformance

**Button uses only canonical states:**
- ✅ `base` - Default button appearance
- ✅ `hover` - Hover feedback via `hover:bg-[hsl(var(--button-primary-hover-bg))]`
- ✅ `active` - Active feedback via `active:bg-[hsl(var(--button-primary-active-bg))]`
- ✅ `focus-visible` - Focus ring via `focus-visible:ring-1 focus-visible:ring-ring`
- ✅ `disabled` - Disabled styles via `disabled:bg-[hsl(var(--button-primary-disabled-bg))]` and `disabled:pointer-events-none`
- ✅ `loading` - Defined in State Matrix (implementation pending)

**Button state priority matches matrix:**
- ✅ `disabled` blocks all other states (highest priority)
- ✅ `active` overrides `hover` (active > hover)
- ✅ `hover` overrides `focus-visible` (hover > focus-visible)
- ✅ `focus-visible` applies when keyboard navigating
- ✅ `base` is always present as foundation

**Button suppression rules match matrix:**
- ✅ Disabled suppresses hover, active, and focus-visible
- ✅ All states use CSS pseudo-classes (not JavaScript)
- ✅ Hover requires real mouse cursor (not DevTools force)

**Button is the reference, not an exception.** All future components must follow Button's state model.

---

## Relationship to Other Authorities

The State Authority Matrix works in conjunction with other authority documents:

### State Authority Matrix → Interaction Authority Contract

**This Matrix defines:** WHAT states exist and HOW they relate  
**Interaction Authority defines:** WHEN states can activate

- State Authority Matrix: "Disabled state suppresses hover, active, and focus-visible"
- Interaction Authority Contract: "Disabled state blocks hover activation (pointer-events: none, cursor-not-allowed)"

### State Authority Matrix → State Authority Contract

**This Matrix defines:** WHAT states exist and HOW they relate  
**State Authority Contract defines:** HOW states are implemented (CSS variables, State Matrix structure)

- State Authority Matrix: "Six canonical states exist: base, hover, active, focus-visible, disabled, loading"
- State Authority Contract: "States are rendered via CSS variables like `--button-primary-hover-bg`"

### Complete Authority Chain

```
State Authority Matrix (WHAT states exist)
    ↓
Interaction Authority Contract (WHEN states activate)
    ↓
State Authority Contract (HOW states are implemented)
    ↓
Component Implementation (Button is reference)
    ↓
Token System (State Matrix CSS variables)
    ↓
UI Component (Visual appearance)
```

---

## Component Implementation Requirements

### Required State Support

All interactive components MUST support:

1. **Base State** - Always present
2. **Hover State** - Via CSS `:hover` pseudo-class
3. **Active State** - Via CSS `:active` pseudo-class
4. **Focus-Visible State** - Via CSS `:focus-visible` pseudo-class
5. **Disabled State** - Via `disabled` prop/attribute
6. **Loading State** - Via `loading` prop or `aria-busy` attribute (when implemented)

### Required Props

All interactive components MUST support:

- `disabled?: boolean` - Activates disabled state
- `loading?: boolean` - Activates loading state (when implemented)

### Required CSS Implementation

All interactive components MUST use:

- CSS pseudo-classes (`:hover`, `:active`, `:focus-visible`, `:disabled`)
- CSS variables from State Matrix (e.g., `--button-primary-hover-bg`)
- Tailwind arbitrary values with CSS variables (e.g., `hover:bg-[hsl(var(--button-primary-hover-bg))]`)

### Forbidden Implementation Patterns

All interactive components MUST NOT use:

- ❌ JavaScript state management for hover/active/focus (`useState`, `onMouseEnter`, etc.)
- ❌ Conditional className based on JavaScript state
- ❌ Component-specific states beyond canonical set
- ❌ Raw Tailwind state variants for colors (e.g., `hover:bg-blue-500`)
- ❌ Inline styles for static state styling

---

## Verification Checklist

To verify a component conforms to the State Authority Matrix:

- [ ] Component uses only the six canonical states
- [ ] Component does NOT define additional states
- [ ] State priority order matches matrix: `disabled > loading > active > hover > focus-visible > base`
- [ ] Disabled state suppresses hover, active, and focus-visible
- [ ] Loading state suppresses hover and active
- [ ] Hover uses CSS `:hover` pseudo-class (not JavaScript)
- [ ] Active uses CSS `:active` pseudo-class (not JavaScript)
- [ ] Focus-visible uses CSS `:focus-visible` pseudo-class (not `:focus`)
- [ ] All states use CSS variables from State Matrix
- [ ] Component supports `disabled` prop
- [ ] Component supports `loading` prop (when implemented)

---

## Unlock Procedure

The State Authority Matrix is **LOCKED** and **IMMUTABLE**. Any modifications require:

1. **Explicit unlock task** with justification
2. **Full audit** of all interactive components
3. **Impact analysis** of proposed changes
4. **Explicit approval** from architecture authority
5. **Re-verification** of all components after changes
6. **Re-lock** with updated documentation

**Unlock is reserved for:** Critical architectural changes that cannot be accommodated within the existing canonical state set.

---

## Related Documents

- [INTERACTION_AUTHORITY_CONTRACT.md](./INTERACTION_AUTHORITY_CONTRACT.md) - Defines WHEN states can activate
- [STATE_AUTHORITY_CONTRACT.md](./STATE_AUTHORITY_CONTRACT.md) - Defines HOW states are implemented (CSS variables, State Matrix structure)
- [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md) - Foundation layer lock status
- [src/components/ui/button.tsx](../../src/components/ui/button.tsx) - Reference implementation
- [src/tokens/state-matrix.ts](../../src/tokens/state-matrix.ts) - Technical State Matrix implementation

---

## Version History

- **v1.0** (2025-12-16): Initial State Authority Matrix definition and lock
  - Defined canonical state set (6 states)
  - Defined state semantics
  - Defined priority order
  - Defined suppression rules
  - Established Button as reference implementation
  - Formally locked as immutable authority

---

**Last Updated:** 2025-12-16  
**Version:** 1.0  
**Lock Status:** ✅ LOCKED - Only changes allowed via explicit 'Unlock State Authority Matrix' task
