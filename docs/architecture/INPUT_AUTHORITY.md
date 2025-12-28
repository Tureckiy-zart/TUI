# Input Authority Contract

**Status:** ✅ ACTIVE  
**Priority:** BLOCKER  
**Date Created:** 2025-12-27  
**Version:** 1.0  
**Enforcement:** TUNG_INPUT_AUTHORITY_FOUNDATION

---

## Document Classification

**TYPE:** AUTHORITY  
**MUTABILITY:** IMMUTABLE after LOCK  
**LOCK STATUS:** ✅ **LOCKED**  
**AUTHORITY DOMAIN:** Input Authority  
**LOCK DOCUMENT:** [INPUT_LOCK.md](./locks/INPUT_LOCK.md)

**Purpose:** This document defines the canonical declarative rules for input interaction behavior (keyboard parity, Enter/Space semantics, disabled/loading/readonly state blocking, accidental interaction prevention) across all UI components. It establishes architectural law for interaction contracts.

---

## Overview

This document defines the canonical Input Authority contract for all UI components. It establishes the rules for input interactions, ensuring consistent keyboard and pointer behavior across the design system.

**Key Principle:** Input interactions are contracts, not suggestions. Every input behavior must be intentional, observable, and testable.

**Relationship to Other Authorities:**
- **INTERACTION_AUTHORITY** handles state semantics (disabled/loading/readonly priority and visual styling)
- **FOCUS_AUTHORITY** handles focus navigation mechanics (trap, restore, tab order)
- **INPUT_AUTHORITY** (this document) handles input **interaction contracts** (keyboard parity, Enter/Space semantics, state blocking)

---

## Axioms

| ID | Axiom |
|----|-------|
| **A1** | Pointer and keyboard must have parity |
| **A2** | Enter/Space semantics are component-specific |
| **A3** | Disabled/loading/readonly states block interactions |
| **A4** | Radix provides mechanics, not architecture (internal only) |
| **A5** | Unresolved input behavior is a bug unless explicitly declared as GAP |

---

## Canonical Terminology

### keyboard-parity

Every pointer interaction (click/tap) MUST have a keyboard equivalent (Enter or Space).

**Requirements:**
- Interactive elements MUST respond to both pointer and keyboard
- onClick handlers MUST have corresponding onKeyDown handlers
- Keyboard-only or pointer-only interactions are FORBIDDEN (unless documented as GAP)

### enter-semantics

Enter key behavior varies by component type.

**Requirements:**
- Button: Activate action
- Link: Navigate
- Form input: Submit form (if in form context)
- Checkbox/Switch/Radio: Toggle/Select (Space preferred, but Enter may activate)
- Select: Open dropdown (if closed) or select item (if open)
- Tabs trigger: Activate tab

### space-semantics

Space key behavior varies by component type.

**Requirements:**
- Button: Activate action
- Checkbox/Switch/Radio: Toggle/Select
- Link: Scroll (native), activation requires explicit handler
- Form input: Insert space character (native)
- Slider: Adjust value (Arrow keys preferred)

### disabled-blocking

Disabled state MUST block all activation events (pointer + keyboard).

**Requirements:**
- Disabled elements MUST NOT respond to clicks
- Disabled elements MUST NOT respond to keyboard activation
- Disabled elements MUST block activation events (pointer-events:none is ALLOWED but not mandatory for native disabled controls using the `disabled` attribute)
- Disabled elements MUST have `aria-disabled="true"` or `disabled` attribute
- Disabled elements MUST prevent event handlers from executing

**Reference:** See [INTERACTION_AUTHORITY.md](./INTERACTION_AUTHORITY.md) Section 1 (Disabled State)

### loading-blocking

IF a component exposes a loading state (prop/variant), loading MUST block activation events.

**Requirements (IF loading state is implemented):**
- Loading elements MUST block pointer clicks
- Loading elements MAY allow keyboard focus (for a11y navigation)
- Loading elements MUST prevent activation handlers from executing
- Loading elements SHOULD show loading indicator
- Loading elements MUST have `aria-busy="true"` or `data-loading="true"`

**Conditionality:** Components without loading state implementation are marked N/A in audits. This rule applies only when a component explicitly supports loading state.

**Reference:** See [INTERACTION_AUTHORITY.md](./INTERACTION_AUTHORITY.md) Section 2 (Loading State)

### readonly-semantics

Readonly state MUST block value changes, MUST allow focus/selection.

**Requirements:**
- Readonly inputs MUST prevent value modifications
- Readonly inputs MUST allow focus (for keyboard navigation)
- Readonly inputs MUST allow text selection (for copy/paste)
- Readonly inputs MUST have `readonly` attribute or `aria-readonly="true"`
- Readonly inputs MUST be visually distinct from disabled inputs

### input-gap

An intentional, documented absence or break in input continuity without feedback.

**Requirements:**
- Input GAPs MUST be explicitly documented
- Each GAP MUST describe user impact
- Each GAP MUST be demonstrable in Storybook
- Unresolved GAPs are forbidden in LOCKED components

---

## Modality Parity Rules

**Rule M-PAR-1:** Click/tap MUST have keyboard equivalent (Enter or Space).

Every interactive element that responds to pointer clicks MUST also respond to keyboard activation (Enter or Space, depending on component type).

```tsx
// ✅ CORRECT - Button has both onClick and keyboard support
<button onClick={handleClick} onKeyDown={handleKeyDown}>
  Click me
</button>

// ❌ FORBIDDEN - onClick without keyboard parity
<div onClick={handleClick}>Clickable</div>
```

**Rule M-PAR-2:** Pointer-only interactions are FORBIDDEN.

Interactive elements MUST NOT respond only to pointer events. Keyboard equivalent MUST exist.

```tsx
// ❌ FORBIDDEN - Only onClick, no keyboard handler
<div onClick={handleClick} className="cursor-pointer">
  Clickable
</div>

// ✅ CORRECT - Has keyboard parity
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Clickable
</div>
```

**Rule M-PAR-3:** Keyboard-only interactions are FORBIDDEN (unless explicitly documented as GAP).

Interactive elements MUST NOT respond only to keyboard events. Pointer equivalent MUST exist (unless documented as acceptable GAP).

---

## Enter/Space Semantics Rules

**Rule E-SEM-1:** Enter key semantics by component type.

| Component Type | Enter Key Behavior |
|----------------|-------------------|
| Button | Activate action |
| Link | Navigate |
| Form input | Submit form (if in form context) |
| Checkbox/Switch/Radio | Toggle/Select (Space preferred, but Enter may activate) |
| Select | Open dropdown (if closed) or select item (if open) |
| Tabs trigger | Activate tab |
| Slider | N/A (Arrow keys used) |

**Rule E-SEM-2:** Space key semantics by component type.

| Component Type | Space Key Behavior |
|----------------|-------------------|
| Button | Activate action |
| Checkbox/Switch/Radio | Toggle/Select |
| Link | Scroll (native), activation requires explicit handler |
| Form input | Insert space character (native) |
| Slider | Adjust value (Arrow keys preferred) |
| Tabs trigger | Activate tab |

**Rule E-SEM-3:** Enter/Space handlers MUST prevent default behavior when activating.

When Enter or Space is used to activate a component (not for native form submission or text input), the handler MUST call `event.preventDefault()` to prevent default browser behavior.

```tsx
// ✅ CORRECT - Prevents default when activating
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    e.stopPropagation();
    handleToggle();
  }
};

// ❌ FORBIDDEN - Missing preventDefault
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === " ") {
    handleToggle(); // Space will scroll page!
  }
};
```

---

## State Blocking Rules

**Rule S-DIS-1:** Disabled state MUST block all activation events (pointer + keyboard).

Disabled elements MUST NOT respond to any user activation.

**Requirements:**
- Disabled elements MUST block activation events (pointer-events:none is ALLOWED but not mandatory for native disabled controls)
- Disabled elements MUST prevent onClick handlers from executing
- Disabled elements MUST prevent onKeyDown handlers from executing (early return)
- Disabled elements MUST have `disabled` attribute or `aria-disabled="true"`
- Disabled elements MUST show `cursor-not-allowed`

```tsx
// ✅ CORRECT - Disabled blocks all interactions
const handleClick = (e: React.MouseEvent) => {
  if (disabled) {
    e.preventDefault();
    return; // Early return blocks handler
  }
  // ... handle click
};

const handleKeyDown = (e: React.KeyboardEvent) => {
  if (disabled) return; // Early return blocks handler
  // ... handle keyboard
};

// ❌ FORBIDDEN - Disabled still responds to interactions
const handleClick = (e: React.MouseEvent) => {
  // Missing disabled check - handler executes even when disabled!
  onClick?.();
};
```

**Reference:** See [INTERACTION_AUTHORITY.md](./INTERACTION_AUTHORITY.md) Section 1 (Disabled State)

**Rule S-LOAD-1:** IF a component exposes loading state, it MUST block activation events.

Loading elements MUST block pointer clicks but MAY allow keyboard focus for accessibility navigation. This rule applies only when a component explicitly implements loading state.

**Requirements (IF loading state is implemented):**
- Loading elements MUST have `pointer-events: none` or block onClick handlers
- Loading elements MAY allow keyboard focus (for Tab navigation)
- Loading elements MUST prevent activation handlers from executing
- Loading elements SHOULD show loading indicator
- Loading elements MUST have `aria-busy="true"` or `data-loading="true"`

**Conditionality:** Components without loading state are marked N/A in audits.

```tsx
// ✅ CORRECT - Loading blocks pointer, allows keyboard focus
const handleClick = (e: React.MouseEvent) => {
  if (loading) {
    e.preventDefault();
    return; // Block pointer clicks
  }
  // ... handle click
};

// Element can still receive focus for keyboard navigation
<button
  disabled={false} // Not disabled, can receive focus
  aria-busy={loading}
  onClick={handleClick}
>
  {loading ? <Spinner /> : "Submit"}
</button>
```

**Reference:** See [INTERACTION_AUTHORITY.md](./INTERACTION_AUTHORITY.md) Section 2 (Loading State)

**Rule S-READ-1:** Readonly state MUST block value changes, MUST allow focus/selection.

Readonly inputs MUST prevent value modifications but MUST allow focus and text selection.

**Requirements:**
- Readonly inputs MUST have `readonly` attribute or `aria-readonly="true"`
- Readonly inputs MUST allow focus (for keyboard navigation)
- Readonly inputs MUST allow text selection (for copy/paste)
- Readonly inputs MUST be visually distinct from disabled inputs
- Readonly inputs MUST NOT prevent onChange handlers (they just don't fire for user input)

```tsx
// ✅ CORRECT - Readonly allows focus/selection, blocks changes
<input
  type="text"
  value={value}
  readonly
  aria-readonly="true"
  // Can receive focus, can select text, but cannot modify value
/>

// ❌ FORBIDDEN - Readonly prevents focus
<input
  type="text"
  value={value}
  readonly
  tabIndex={-1} // Blocks focus - violates rule
/>
```

---

## Accidental Interaction Prevention Rules

**Rule A-PRE-1:** Double-click prevention for toggle components (RECOMMENDED).

Toggle components (Checkbox, Switch, Radio) SHOULD prevent accidental double-activation.

**Requirements:**
- Toggle components MAY use debounce/throttle for rapid clicks
- Toggle components SHOULD prevent rapid state changes that could cause inconsistent state
- Toggle components SHOULD handle rapid keyboard activation (Space/Enter spam)

**Rationale:** Double-toggle prevention is a UX safety recommendation, not a hard architectural guarantee. It MAY be implemented via debounce/throttle or left to product context. DS responsibility is limited to: blocking interactions when `disabled={true}` or `loading={true}`.

```tsx
// ✅ RECOMMENDED - Prevents double-toggle (product-level pattern)
const handleToggle = useCallback(() => {
  if (isToggling) return; // Prevent rapid toggles
  setIsToggling(true);
  onToggle();
  setTimeout(() => setIsToggling(false), 100);
}, [isToggling, onToggle]);
```

**Rule A-PRE-2:** Event cancellation rules (preventDefault/stopPropagation) must be explicit.

Event handlers MUST explicitly call `preventDefault()` and/or `stopPropagation()` when needed, with clear rationale.

**Requirements:**
- `preventDefault()` MUST be called when overriding default browser behavior
- `stopPropagation()` MUST be called when preventing event bubbling (use sparingly)
- Event cancellation MUST be documented in component code

```tsx
// ✅ CORRECT - Explicit event cancellation
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === " ") {
    e.preventDefault(); // Prevent page scroll
    e.stopPropagation(); // Prevent parent handlers
    handleToggle();
  }
};
```

**Rule A-PRE-3:** Form submission SHOULD prevent double-submit (RECOMMENDED).

Form submit handlers SHOULD prevent multiple submissions when loading/disabled state is set.

**Requirements:**
- Submit buttons MUST be disabled when `loading={true}` or `disabled={true}` (DS responsibility)
- Submit handlers MAY check if already submitting (product-level pattern)
- Double-submit prevention is a product-level concern, not DS hard requirement

**DS Responsibility (MANDATORY):**
```tsx
// ✅ CORRECT - DS ensures disabled state blocks interactions
<Button type="submit" disabled={isSubmitting}>
  {isSubmitting ? "Submitting..." : "Submit"}
</Button>
```

**Product-Level Pattern (RECOMMENDED):**
```tsx
// ✅ RECOMMENDED - Product-level code prevents double-submit
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (isSubmitting) return; // Product-level check
  setIsSubmitting(true);
  try {
    await submitForm();
  } finally {
    setIsSubmitting(false);
  }
};
```

**Rationale:** Double-submit prevention requires stateful logic (tracking submission state) which is product-level concern. DS responsibility is limited to: blocking interactions when `disabled={true}` or `loading={true}` is set.

---

## Component Requirements

### Button

**File:** `src/PRIMITIVES/Button/Button.tsx`

| Requirement | Status |
|-------------|--------|
| Enter/Space activate | MANDATORY |
| Disabled blocks all | MANDATORY |
| Loading blocks pointer | MANDATORY |
| Keyboard parity | MANDATORY |
| Double-submit prevention | RECOMMENDED (if form context) |

### Link

**File:** `src/PRIMITIVES/Link/Link.tsx`

| Requirement | Status |
|-------------|--------|
| Enter navigates | MANDATORY |
| Space scrolls (native) | MANDATORY |
| Disabled prevents navigation | MANDATORY |
| Keyboard parity | MANDATORY |

### Checkbox

**File:** `src/PRIMITIVES/Checkbox/Checkbox.tsx`

| Requirement | Status |
|-------------|--------|
| Space toggles | MANDATORY |
| Enter activates (optional) | RECOMMENDED |
| Disabled blocks all | MANDATORY |
| Double-toggle prevention | RECOMMENDED |
| Keyboard parity | MANDATORY |

### Switch

**File:** `src/PRIMITIVES/Switch/Switch.tsx`

| Requirement | Status |
|-------------|--------|
| Space toggles | MANDATORY |
| Enter activates (optional) | RECOMMENDED |
| Disabled blocks all | MANDATORY |
| Double-toggle prevention | RECOMMENDED |
| Keyboard parity | MANDATORY |

### Radio

**File:** `src/PRIMITIVES/Radio/Radio.tsx`

| Requirement | Status |
|-------------|--------|
| Space selects | MANDATORY |
| Arrow keys navigate (in group) | MANDATORY |
| Enter activates (optional) | RECOMMENDED |
| Disabled blocks all | MANDATORY |
| Keyboard parity | MANDATORY |

### Input

**File:** `src/PRIMITIVES/Input/Input.tsx`

| Requirement | Status |
|-------------|--------|
| Enter submits (in form) | MANDATORY (native) |
| Space inserts character | MANDATORY (native) |
| Readonly blocks changes | MANDATORY |
| Readonly allows focus | MANDATORY |
| Disabled blocks all | MANDATORY |

### Textarea

**File:** `src/PRIMITIVES/Textarea/Textarea.tsx`

| Requirement | Status |
|-------------|--------|
| Enter inserts newline | MANDATORY (native) |
| Space inserts character | MANDATORY (native) |
| Readonly blocks changes | MANDATORY |
| Readonly allows focus | MANDATORY |
| Disabled blocks all | MANDATORY |

### Select

**File:** `src/COMPOSITION/controls/Select/Select.tsx`

| Requirement | Status |
|-------------|--------|
| Enter opens/closes dropdown | MANDATORY |
| Arrow keys navigate items | MANDATORY |
| Disabled blocks all | MANDATORY |
| Keyboard parity | MANDATORY |

### Slider

**File:** `src/COMPOSITION/controls/Slider/Slider.tsx`

| Requirement | Status |
|-------------|--------|
| Arrow keys adjust value | MANDATORY |
| Space adjusts value (optional) | RECOMMENDED |
| Disabled blocks all | MANDATORY |
| Keyboard parity | MANDATORY |

### Tabs Triggers

**File:** `src/COMPOSITION/navigation/tabs/Tabs.tsx`

| Requirement | Status |
|-------------|--------|
| Enter/Space activate tab | MANDATORY |
| Arrow keys navigate | MANDATORY |
| Disabled blocks activation | MANDATORY |
| Keyboard parity | MANDATORY |

---

## Forbidden Patterns

### ❌ FORBIDDEN: Interactive div/span without keyboard parity

```tsx
// ❌ FORBIDDEN
<div onClick={handleClick} className="cursor-pointer">
  Clickable
</div>

// ✅ CORRECT
<button onClick={handleClick}>Clickable</button>

// ✅ CORRECT (if div is required)
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Clickable
</div>
```

### ❌ FORBIDDEN: onClick-only handlers without onKeyDown

```tsx
// ❌ FORBIDDEN
<button onClick={handleClick}>
  {/* Missing keyboard handler */}
</button>

// ✅ CORRECT
<button
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Click me
</button>
```

### ❌ FORBIDDEN: Disabled elements that still respond to keyboard

```tsx
// ❌ FORBIDDEN
const handleKeyDown = (e: React.KeyboardEvent) => {
  // Missing disabled check - handler executes even when disabled!
  if (e.key === " ") {
    handleToggle();
  }
};

// ✅ CORRECT
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (disabled) return; // Early return blocks handler
  if (e.key === " ") {
    e.preventDefault();
    handleToggle();
  }
};
```

### ❌ FORBIDDEN: Loading elements that block keyboard navigation unnecessarily

```tsx
// ❌ FORBIDDEN - Blocks keyboard focus unnecessarily
<button disabled={loading} aria-busy={loading}>
  {loading ? <Spinner /> : "Submit"}
</button>

// ✅ CORRECT - Allows keyboard focus for a11y
<button
  disabled={false} // Not disabled, can receive focus
  aria-busy={loading}
  onClick={handleClick}
>
  {loading ? <Spinner /> : "Submit"}
</button>
```

### ❌ FORBIDDEN: Readonly inputs that prevent focus

```tsx
// ❌ FORBIDDEN - Readonly prevents focus
<input
  type="text"
  value={value}
  readonly
  tabIndex={-1} // Blocks focus - violates rule
/>

// ✅ CORRECT - Readonly allows focus
<input
  type="text"
  value={value}
  readonly
  aria-readonly="true"
  // Can receive focus, can select text
/>
```

### ❌ FORBIDDEN: Missing preventDefault in keyboard handlers

```tsx
// ❌ FORBIDDEN - Space will scroll page
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === " ") {
    handleToggle(); // Missing preventDefault!
  }
};

// ✅ CORRECT - Prevents default behavior
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === " ") {
    e.preventDefault(); // Prevents page scroll
    handleToggle();
  }
};
```

---

## Allowed Patterns

### ✅ ALLOWED: Radix-based input handling

```tsx
// ✅ Radix handles keyboard interactions internally
<Checkbox.Root
  checked={checked}
  onCheckedChange={setChecked}
  // Radix handles Space key internally
/>

<Switch.Root
  checked={checked}
  onCheckedChange={setChecked}
  // Radix handles Space key internally
/>
```

### ✅ ALLOWED: Semantic HTML elements

```tsx
// ✅ Native button has built-in keyboard support
<button onClick={handleClick}>
  Click me
</button>

// ✅ Native input has built-in keyboard support
<input type="text" value={value} onChange={handleChange} />
```

### ✅ ALLOWED: Explicit keyboard handlers with proper event handling

```tsx
// ✅ Custom keyboard handler with proper event handling
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (disabled) return; // Early return for disabled
  if (e.key === " " || e.key === "Enter") {
    e.preventDefault();
    e.stopPropagation();
    handleActivate();
  }
};
```

---

## Input GAP Contract

**Rule I-GAP-1:** Input GAPs MUST be explicitly documented.

An Input GAP is a state where expected input behavior is intentionally absent. GAPs are allowed ONLY if:
- Documented in consolidated report (TUNG_INPUT_SYSTEM_AUDIT_AUTHORITY_LOCK_V1.md)
- Classified as ACCEPTABLE with justification
- Demonstrable in Storybook

**Rule I-GAP-2:** GAP classifications.

Each Input GAP MUST be classified as:
- **OK** — Behavior is correct and compliant
- **ACCEPTABLE** — Intentional design decision with documented rationale
- **BUG** — Unintentional defect that must be fixed

**Rule I-GAP-3:** GAP documentation requirements.

For ACCEPTABLE GAPs:
- Why this GAP exists
- What user behavior is affected
- Why fixing would be worse than keeping

**Rule I-GAP-4:** Unresolved GAPs are blocking for LOCK.

A component may NOT be LOCKED if it has unresolved Input GAPs. All GAPs must be either:
- Fixed (no longer a GAP)
- Classified as ACCEPTABLE with documentation
- Classified as BUG with tracking issue (BUG count must be 0 before lock)

---

## Enforcement

### Static Guards (ESLint)

1. **no-interactive-without-keyboard** — Forbid interactive `div`/`span` without keyboard parity (already exists)
2. **no-onclick-without-keyboard** — Forbid onClick handlers without corresponding onKeyDown handlers
3. **require-disabled-blocking** — Verify disabled state blocks all interactions
4. **require-loading-pointer-block** — Verify loading state blocks pointer interactions

### Runtime Guards (Playwright)

1. Keyboard parity tests through Storybook input contract stories
2. Enter/Space semantics verification for all component types
3. Disabled state blocking verification
4. Loading state blocking verification
5. Readonly state behavior verification
6. Double-trigger prevention verification

### CI Integration

All guards MUST be blocking in CI.

---

## Storybook Observability

Input behavior MUST be observable in Storybook:

1. **KeyboardParityDemo** — Keyboard parity demonstration for all interactive components
2. **EnterSpaceSemantics** — Enter/Space semantics by component type
3. **DisabledStateBlocking** — Disabled state blocks all interactions
4. **LoadingStateBehavior** — Loading state blocks pointer, may allow keyboard
5. **ReadonlyStateBehavior** — Readonly state blocks changes, allows focus
6. **DoubleTriggerPrevention** — Double-click/double-submit prevention
7. **InputGAPGallery** — Intentional GAPs only (ACCEPTABLE)

---

## Authority Chain

**Input Authority** is the single source of truth for all input interaction behavior across all UI components in the design system.

**Authority Hierarchy:**
1. **Input Authority Contract** (this document) - Defines input interaction rules
2. **Interaction Authority Contract** - Defines state semantics (disabled/loading/readonly)
3. **Focus Authority Contract** - Defines focus navigation mechanics
4. **Component Implementation** - Applies input behavior via Radix or custom handlers
5. **Storybook Stories** - Demonstrates input behavior observability

---

## Related Documents

- [INTERACTION_AUTHORITY.md](./INTERACTION_AUTHORITY.md) - State semantics (disabled/loading/readonly)
- [STATE_AUTHORITY.md](./STATE_AUTHORITY.md) - State definitions and token structure
- [FOCUS_AUTHORITY.md](./FOCUS_AUTHORITY.md) - Focus navigation rules
- [INPUT_LOCK.md](./locks/INPUT_LOCK.md) - Input system lock document
- [TUNG_INPUT_SYSTEM_AUDIT_AUTHORITY_LOCK_V1.md](../reports/TUNG_INPUT_SYSTEM_AUDIT_AUTHORITY_LOCK_V1.md) - System audit and GAP classifications

---

## Unlock Procedure

After LOCK, any modifications require:

1. **Explicit unlock task** with justification
2. **Full audit** of all input behavior
3. **Impact analysis** of proposed changes
4. **Explicit approval** from architecture authority
5. **Re-verification** of all components
6. **Re-lock** with updated documentation

---

## Version History

- **v1.0** (2025-12-27): Initial Input Authority Contract
  - Defined canonical input terminology
  - Established modality parity rules (keyboard-parity)
  - Defined Enter/Space semantics by component type
  - Defined state blocking rules (disabled/loading/readonly)
  - Defined accidental interaction prevention rules
  - Documented component requirements matrix
  - Defined forbidden and allowed patterns
  - Established Input GAP contract
  - Established enforcement mechanisms (ESLint, Playwright)
  - Defined Storybook observability requirements

---

**Last Updated:** 2025-12-27  
**Version:** 1.0  
**Lock Status:** ✅ **LOCKED** — See [INPUT_LOCK.md](./locks/INPUT_LOCK.md)

