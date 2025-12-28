# A11Y Authority Contract

**Status:** ✅ ACTIVE  
**Priority:** BLOCKER  
**Date Created:** 2025-12-27  
**Version:** 1.0  
**Enforcement:** TUNG_A11Y_SYSTEM_V1

---

## Document Classification

**TYPE:** AUTHORITY  
**MUTABILITY:** IMMUTABLE after LOCK  
**LOCK STATUS:** ✅ **LOCKED**  
**AUTHORITY DOMAIN:** Accessibility Authority  
**LOCK DOCUMENT:** [A11Y_LOCK.md](./locks/A11Y_LOCK.md)

**Purpose:** This document defines the canonical declarative rules for accessibility behavior (semantic roles, aria-* as API, keyboard-only operability, accessible names, enforcement) across all UI components. It establishes architectural law for accessibility compliance.

---

## Overview

This document defines the canonical A11Y Authority contract for all UI components. It establishes the rules for accessibility behavior, ensuring consistent semantic roles, ARIA usage, keyboard operability, and accessible naming across the design system.

**Key Principle:** Accessibility is not optional. Every interactive component must be operable via keyboard, have an accessible name, and provide correct semantic information to assistive technologies.

**Relationship to Other Authorities:**
- **FOCUS_AUTHORITY** handles focus navigation mechanics (trap, restore, tab order)
- **INTERACTION_AUTHORITY** handles focus-visible visual styling
- **A11Y_AUTHORITY** (this document) handles semantic roles, aria-* as API, keyboard-only operability, accessible names, enforcement

---

## Axioms

| ID | Axiom |
|----|-------|
| **A1** | Accessibility is not optional - it is a requirement |
| **A2** | Every interactive component must be keyboard-operable |
| **A3** | Every interactive component must have an accessible name |
| **A4** | Native semantics take precedence over ARIA |
| **A5** | Radix provides mechanics, not architecture (internal only) |
| **A6** | Unresolved accessibility issues are bugs unless explicitly declared as GAP |
| **A7** | LOCKED systems forbid accidental regressions |

---

## Canonical Terminology

### accessible-name

The name of an interactive element as announced by screen readers.

**Requirements:**
- Every interactive control MUST have an accessible name
- Accessible name sources (in priority order):
  1. Visible label text (for native form controls)
  2. `aria-label` attribute
  3. `aria-labelledby` attribute (references label element)
  4. Text content (for buttons, links)
- Icon-only buttons MUST use `aria-label` (no visible text)

### semantic-element

An HTML element that provides inherent semantic meaning and accessibility.

**Requirements:**
- Prefer native semantic elements (`<button>`, `<a>`, `<input>`, etc.)
- Non-semantic elements (`<div>`, `<span>`) MUST have `role` + `tabindex` + keyboard handlers if interactive
- Native semantics take precedence over ARIA (don't override native with redundant ARIA)

### aria-as-api

ARIA attributes exposed as component props for accessibility control.

**Requirements:**
- ARIA attributes MUST be exposed as props when needed for accessibility
- ARIA attributes MUST NOT conflict with native semantics
- Redundant ARIA (e.g., `aria-disabled` on native `disabled` button) is FORBIDDEN
- ARIA is internal-only for Radix components (not leaked to public API)

### keyboard-only-operability

The ability to operate a component using only keyboard input (no mouse/touch).

**Requirements:**
- All interactive components MUST be keyboard-operable
- Tab key MUST reach all interactive elements
- Enter/Space MUST activate buttons and links
- Escape MUST close overlays (Modal, Dialog, Drawer, Popover, Tooltip)
- Arrow keys MUST navigate composite controls (Tabs, Select, Menu, RadioGroup)
- Focus mechanics are governed by **FOCUS_AUTHORITY**

**Reference:** See [FOCUS_AUTHORITY.md](./FOCUS_AUTHORITY.md) for focus navigation rules

### a11y-gap

An intentional, documented accessibility deviation that is explicitly justified, visible in Storybook, and whitelisted in LOCK.

**Requirements:**
- A11Y GAPs MUST be explicitly documented
- Each GAP MUST describe user impact
- Each GAP MUST be demonstrable in Storybook
- Each GAP MUST have justification (why fixing would be worse)
- Unresolved GAPs are forbidden in LOCKED components

---

## Semantic-First Rules

**Rule S-1:** Prefer native semantic elements.

```tsx
// ✅ CORRECT - Native button
<button onClick={handleClick}>Click me</button>

// ❌ FORBIDDEN - Div as button without proper ARIA
<div onClick={handleClick}>Click me</div>

// ✅ CORRECT - Div as button with proper ARIA
<div 
  role="button" 
  tabIndex={0} 
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Click me
</div>
```

**Rule S-2:** Forbid div-as-button unless justified.

Interactive `div`/`span` elements are FORBIDDEN in Foundation primitives unless:
- Component requires custom styling that cannot be achieved with native elements
- Component is a composition component that wraps native elements
- Component is explicitly documented as a GAP with justification

**Rule S-3:** Native semantics take precedence.

```tsx
// ✅ CORRECT - Native disabled attribute
<button disabled>Disabled</button>

// ❌ FORBIDDEN - Redundant aria-disabled on native disabled
<button disabled aria-disabled="true">Disabled</button>

// ✅ CORRECT - aria-disabled only when native disabled not available
<a href="#" aria-disabled="true" tabIndex={-1}>Disabled link</a>
```

---

## Accessible Name Rules

**Rule N-1:** Every interactive control MUST have an accessible name.

```tsx
// ✅ CORRECT - Visible label text
<button>Submit Form</button>

// ✅ CORRECT - aria-label
<button aria-label="Close dialog">×</button>

// ✅ CORRECT - aria-labelledby
<label id="email-label">Email</label>
<input id="email" aria-labelledby="email-label" />

// ❌ FORBIDDEN - No accessible name
<button>×</button> // Icon-only without aria-label
```

**Rule N-2:** Icon-only buttons MUST use aria-label.

```tsx
// ✅ CORRECT - Icon-only with aria-label
<Button iconOnly aria-label="Search">
  <SearchIcon />
</Button>

// ❌ FORBIDDEN - Icon-only without aria-label
<Button iconOnly>
  <SearchIcon />
</Button>
```

**Rule N-3:** Form inputs MUST have associated labels.

```tsx
// ✅ CORRECT - Label component with htmlFor
<Label htmlFor="email">Email</Label>
<Input id="email" />

// ✅ CORRECT - aria-labelledby
<Label id="email-label">Email</Label>
<Input aria-labelledby="email-label" />

// ✅ CORRECT - aria-label (when label not visible)
<Input aria-label="Email address" />

// ❌ FORBIDDEN - Input without label
<Input placeholder="Enter email" />
```

**Rule N-4:** Overlays MUST have accessible names.

```tsx
// ✅ CORRECT - Modal with title (aria-labelledby)
<Modal.Content aria-labelledby="modal-title">
  <Modal.Title id="modal-title">Confirm Action</Modal.Title>
</Modal.Content>

// ✅ CORRECT - Dialog with title and description
<Dialog>
  <Dialog.Title>Confirm Action</Dialog.Title>
  <Dialog.Description>This action cannot be undone.</Dialog.Description>
</Dialog>

// ❌ FORBIDDEN - Modal without accessible name
<Modal.Content>
  <div>Are you sure?</div>
</Modal.Content>
```

---

## aria-* as API Rules

**Rule A-1:** ARIA attributes MUST be exposed as props when needed.

```tsx
// ✅ CORRECT - aria-label exposed as prop
interface ButtonProps {
  'aria-label'?: string;
}

// ✅ CORRECT - aria-labelledby exposed as prop
interface InputProps {
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}
```

**Rule A-2:** ARIA attributes MUST NOT conflict with native semantics.

```tsx
// ✅ CORRECT - Native disabled (no aria-disabled needed)
<button disabled>Disabled</button>

// ❌ FORBIDDEN - Redundant aria-disabled on native disabled
<button disabled aria-disabled="true">Disabled</button>

// ✅ CORRECT - aria-disabled only when native disabled not available
<a href="#" aria-disabled="true" tabIndex={-1}>Disabled link</a>
```

**Rule A-3:** Radix ARIA is internal-only.

```tsx
// ✅ CORRECT - Radix ARIA attributes not exposed in public API
// Radix handles aria-* internally, component exposes semantic props
<Modal open={open} onOpenChange={setOpen}>
  <Modal.Title>Title</Modal.Title>
</Modal>

// ❌ FORBIDDEN - Leaking Radix ARIA to public API
interface ModalProps {
  'aria-modal'?: boolean; // Radix handles this internally
}
```

**Rule A-4:** ARIA state attributes MUST match component state.

```tsx
// ✅ CORRECT - aria-checked matches checked state
<Checkbox 
  checked={isChecked} 
  aria-checked={isChecked ? 'true' : 'false'}
/>

// ✅ CORRECT - aria-invalid matches invalid state
<Input 
  invalid={hasError} 
  aria-invalid={hasError}
/>

// ❌ FORBIDDEN - aria-checked doesn't match checked state
<Checkbox checked={true} aria-checked="false" />
```

---

## Keyboard-Only Operability Rules

**Rule K-1:** All interactive components MUST be keyboard-operable.

```tsx
// ✅ CORRECT - Native button (keyboard-operable by default)
<button onClick={handleClick}>Click me</button>

// ✅ CORRECT - Custom button with keyboard handler
<div 
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Click me
</div>
```

**Rule K-2:** Tab key MUST reach all interactive elements.

Focus navigation mechanics are governed by **FOCUS_AUTHORITY**. See [FOCUS_AUTHORITY.md](./FOCUS_AUTHORITY.md) for tab order rules.

**Rule K-3:** Enter/Space MUST activate buttons and links.

```tsx
// ✅ CORRECT - Native button (Enter/Space work by default)
<button onClick={handleClick}>Click me</button>

// ✅ CORRECT - Custom button with keyboard handler
<button 
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }}
>
  Click me
</button>
```

**Rule K-4:** Escape MUST close overlays.

```tsx
// ✅ CORRECT - Modal closes on Escape (Radix handles this)
<Modal.Root open={open} onOpenChange={setOpen}>
  <Modal.Content>
    {/* Escape closes modal */}
  </Modal.Content>
</Modal.Root>

// ✅ CORRECT - Custom overlay with Escape handler
<Drawer 
  open={open} 
  onClose={() => setOpen(false)}
  closeOnEscape={true}
/>
```

**Rule K-5:** Arrow keys MUST navigate composite controls.

```tsx
// ✅ CORRECT - Tabs with arrow navigation (Radix handles this)
<Tabs.Root>
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
</Tabs.Root>

// ✅ CORRECT - RadioGroup with arrow navigation (custom implementation)
<RadioGroup>
  <Radio value="option1" />
  <Radio value="option2" />
</RadioGroup>
```

**Reference:** Focus mechanics (trap, restore, tab order) are defined in [FOCUS_AUTHORITY.md](./FOCUS_AUTHORITY.md)

---

## Overlay Labeling Rules

**Rule O-1:** Modal overlays MUST have accessible names.

```tsx
// ✅ CORRECT - Modal with title (aria-labelledby)
<Modal.Content aria-labelledby="modal-title">
  <Modal.Title id="modal-title">Confirm Action</Modal.Title>
</Modal.Content>

// ✅ CORRECT - Dialog with title and description
<Dialog>
  <Dialog.Title>Confirm Action</Dialog.Title>
  <Dialog.Description>This action cannot be undone.</Dialog.Description>
</Dialog>
```

**Rule O-2:** Modal overlays MUST use aria-modal.

```tsx
// ✅ CORRECT - Radix handles aria-modal automatically
<Modal.Root open={open}>
  <Modal.Content>
    {/* Radix sets aria-modal="true" */}
  </Modal.Content>
</Modal.Root>

// ✅ CORRECT - Custom modal with aria-modal
<div role="dialog" aria-modal="true" aria-labelledby="title">
  <h2 id="title">Modal Title</h2>
</div>
```

**Rule O-3:** Non-modal overlays MUST NOT use aria-modal.

```tsx
// ✅ CORRECT - Popover is non-modal (no aria-modal)
<Popover.Root>
  <Popover.Content>
    {/* No aria-modal */}
  </Popover.Content>
</Popover.Root>

// ❌ FORBIDDEN - Non-modal overlay with aria-modal
<Popover.Content aria-modal="true">
```

**Rule O-4:** Overlays MUST wire title/description for aria-labelledby/aria-describedby.

```tsx
// ✅ CORRECT - Dialog wires title and description
<Dialog>
  <Dialog.Title id="dialog-title">Title</Dialog.Title>
  <Dialog.Description id="dialog-desc">Description</Dialog.Description>
</Dialog>
// Dialog internally sets aria-labelledby="dialog-title" aria-describedby="dialog-desc"

// ✅ CORRECT - Modal with explicit aria-labelledby
<Modal.Content aria-labelledby="modal-title" aria-describedby="modal-desc">
  <Modal.Title id="modal-title">Title</Modal.Title>
  <p id="modal-desc">Description</p>
</Modal.Content>
```

---

## Disabled/Loading/Readonly Semantics Rules

**Rule D-1:** Native disabled MUST be used when available.

```tsx
// ✅ CORRECT - Native disabled attribute
<button disabled>Disabled</button>
<input disabled />
<textarea disabled />

// ❌ FORBIDDEN - aria-disabled on native disabled button
<button disabled aria-disabled="true">Disabled</button>
```

**Rule D-2:** aria-disabled MUST be used when native disabled not available.

```tsx
// ✅ CORRECT - aria-disabled for anchor (no native disabled)
<a href="#" aria-disabled="true" tabIndex={-1} onClick={(e) => e.preventDefault()}>
  Disabled link
</a>

// ✅ CORRECT - aria-disabled for custom button role
<div 
  role="button"
  aria-disabled="true"
  tabIndex={-1}
  onClick={(e) => e.preventDefault()}
>
  Disabled
</div>
```

**Rule D-3:** Loading state MUST use aria-busy.

```tsx
// ✅ CORRECT - Loading state with aria-busy
<button aria-busy="true" disabled>
  <Spinner />
  Loading...
</button>

// ✅ CORRECT - Loading state prevents interaction
<button aria-busy="true" disabled onClick={handleClick}>
  Submit
</button>
```

**Rule D-4:** Readonly state MUST use readonly attribute.

```tsx
// ✅ CORRECT - Native readonly attribute
<input readonly value="Read-only value" />
<textarea readonly>Read-only text</textarea>

// ❌ FORBIDDEN - aria-readonly on native readonly input
<input readonly aria-readonly="true" />
```

---

## A11Y GAP Contract

**Rule G-1:** A11Y GAPs MUST be explicitly documented.

An A11Y GAP is a state where expected accessibility behavior is intentionally absent. GAPs are allowed ONLY if:
- Documented in [TUNG_A11Y_SYSTEM_V1.md](../reports/TUNG_A11Y_SYSTEM_V1.md)
- Classified as ACCEPTABLE with justification
- Demonstrable in Storybook
- Whitelisted in [A11Y_LOCK.md](./locks/A11Y_LOCK.md)

**Rule G-2:** GAP classifications.

Each A11Y GAP MUST be classified as:
- **ACCEPTABLE** — Intentional design decision with documented rationale
- **BUG** — Unintentional defect that must be fixed

**Rule G-3:** GAP documentation requirements.

For ACCEPTABLE GAPs:
- Why this GAP exists
- What user behavior is affected
- Why fixing would be worse than keeping

**Rule G-4:** Unresolved GAPs are blocking for LOCK.

A component may NOT be LOCKED if it has unresolved A11Y GAPs. All GAPs must be either:
- Fixed (no longer a GAP)
- Classified as ACCEPTABLE with documentation, justification, Storybook demo, and whitelisted in A11Y_LOCK
- Classified as BUG with tracking issue

**Blocking conditions:**
- UNCLASSIFIED GAPs block lock (must be classified as ACCEPTABLE or BUG)
- BUG GAPs block lock (must be fixed or reclassified)
- ACCEPTABLE GAPs are allowed ONLY if: documented + justification + Storybook demo + whitelisted in A11Y_LOCK

---

## Component Requirements

### Form Controls

**Components:** Input, Textarea, Select, Checkbox, Radio, Switch

| Requirement | Status |
|-------------|--------|
| Accessible name (label/aria-label/aria-labelledby) | MANDATORY |
| Keyboard operability (Tab, Enter/Space) | MANDATORY |
| Disabled semantics (native disabled or aria-disabled) | MANDATORY |
| Invalid state (aria-invalid) | MANDATORY (when applicable) |

### Buttons and Links

**Components:** Button, Link

| Requirement | Status |
|-------------|--------|
| Accessible name (text content or aria-label) | MANDATORY |
| Keyboard operability (Tab, Enter/Space) | MANDATORY |
| Disabled semantics | MANDATORY |
| Icon-only buttons require aria-label | MANDATORY |

### Modal Overlays

**Components:** Modal, Dialog, Drawer

| Requirement | Status |
|-------------|--------|
| Accessible name (aria-labelledby via title) | MANDATORY |
| aria-modal="true" | MANDATORY |
| Focus trap | MANDATORY (see FOCUS_AUTHORITY) |
| Escape closes | MANDATORY |
| Focus restore on close | MANDATORY (see FOCUS_AUTHORITY) |

### Non-Modal Overlays

**Components:** Popover, Tooltip, Toast

| Requirement | Status |
|-------------|--------|
| Accessible name (content text or aria-label) | MANDATORY (where applicable) |
| aria-modal="false" or no aria-modal | MANDATORY |
| Escape closes | MANDATORY |
| Focus restore on close | MANDATORY (Popover only) |

### Composite Controls

**Components:** Tabs, Select, Menu, RadioGroup

| Requirement | Status |
|-------------|--------|
| Accessible name (trigger text or aria-label) | MANDATORY |
| Roving tabindex | MANDATORY (see FOCUS_AUTHORITY) |
| Arrow key navigation | MANDATORY |
| Keyboard operability | MANDATORY |

---

## Forbidden Patterns

### ❌ FORBIDDEN: Interactive div/span without keyboard parity

```tsx
// ❌ FORBIDDEN
<div onClick={handleClick}>Click me</div>

// ✅ CORRECT
<div 
  role="button" 
  tabIndex={0} 
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Click me
</div>

// ✅ BEST - Use native element
<button onClick={handleClick}>Click me</button>
```

### ❌ FORBIDDEN: Icon-only button without aria-label

```tsx
// ❌ FORBIDDEN
<Button iconOnly>
  <SearchIcon />
</Button>

// ✅ CORRECT
<Button iconOnly aria-label="Search">
  <SearchIcon />
</Button>
```

### ❌ FORBIDDEN: Input without label

```tsx
// ❌ FORBIDDEN
<Input placeholder="Enter email" />

// ✅ CORRECT
<Label htmlFor="email">Email</Label>
<Input id="email" />

// ✅ CORRECT - aria-label
<Input aria-label="Email address" />
```

### ❌ FORBIDDEN: Redundant ARIA on native elements

```tsx
// ❌ FORBIDDEN - Redundant aria-disabled
<button disabled aria-disabled="true">Disabled</button>

// ✅ CORRECT - Native disabled only
<button disabled>Disabled</button>
```

### ❌ FORBIDDEN: Modal without accessible name

```tsx
// ❌ FORBIDDEN
<Modal.Content>
  <div>Are you sure?</div>
</Modal.Content>

// ✅ CORRECT
<Modal.Content aria-labelledby="modal-title">
  <Modal.Title id="modal-title">Confirm Action</Modal.Title>
</Modal.Content>
```

---

## Allowed Patterns

### ✅ ALLOWED: Radix-based accessibility

```tsx
// ✅ Radix handles ARIA, focus trap, keyboard navigation
<Modal.Root open={open} onOpenChange={setOpen}>
  <Modal.Trigger asChild>
    <Button>Open</Button>
  </Modal.Trigger>
  <Modal.Content>
    {/* Radix handles aria-modal, focus trap, Escape */}
  </Modal.Content>
</Modal.Root>
```

### ✅ ALLOWED: Custom button role pattern

```tsx
// ✅ Custom styled checkbox with proper ARIA
<button 
  role="checkbox"
  aria-checked={checked}
  aria-label="Accept terms"
  onClick={toggle}
  onKeyDown={(e) => e.key === ' ' && toggle()}
>
  {checked && <CheckIcon />}
</button>
```

### ✅ ALLOWED: External label requirement

```tsx
// ✅ Input requires external label (by design)
<Field>
  <Field.Label htmlFor="email">Email</Field.Label>
  <Field.Control>
    <Input id="email" />
  </Field.Control>
</Field>
```

---

## Enforcement

### Static Guards (ESLint)

1. **no-interactive-div-span** — Forbid interactive `div`/`span` without keyboard parity
2. **require-accessible-name** — Require accessible name for controls (where statically detectable)
3. **forbid-conflicting-aria** — Forbid aria-* that conflicts with native semantics

### Runtime Guards (Playwright/Storybook)

1. Keyboard-only smoke flows on contract stories
2. Optional: axe-core scan for critical violations on key stories

### CI Integration

All guards MUST be blocking in CI.

---

## Storybook Observability

Accessibility behavior MUST be observable in Storybook:

1. **A11yOverview** — Keyboard-only navigation demo
2. **AccessibleNameGallery** — Examples of correct labeling patterns
3. **OverlayA11yContracts** — Modal/Dialog labeling + Escape expectations
4. **CompositeKeyboardContracts** — Tabs/Select keyboard rules

---

## Authority Chain

**A11Y Authority** is the single source of truth for all accessibility behavior (semantic roles, aria-* as API, keyboard-only operability, accessible names) across all UI components in the design system.

**Authority Hierarchy:**
1. **A11Y Authority Contract** (this document) - Defines accessibility rules
2. **Focus Authority Contract** - Defines focus navigation mechanics
3. **Interaction Authority Contract** - Defines focus-visible visual styling
4. **Component Implementation** - Applies accessibility via Radix or custom patterns
5. **Storybook Stories** - Demonstrates accessibility behavior observability

---

## Related Documents

- [FOCUS_AUTHORITY.md](./FOCUS_AUTHORITY.md) - Focus navigation mechanics
- [INTERACTION_AUTHORITY.md](./INTERACTION_AUTHORITY.md) - Focus-visible visual styling
- [A11Y_LOCK.md](./locks/A11Y_LOCK.md) - A11Y System Lock
- [TUNG_A11Y_SYSTEM_V1.md](../reports/TUNG_A11Y_SYSTEM_V1.md) - A11Y System Audit Report

---

## Unlock Procedure

After LOCK, any modifications require:

1. **Explicit unlock task** with justification
2. **Full audit** of all accessibility behavior
3. **Impact analysis** of proposed changes
4. **Explicit approval** from architecture authority
5. **Re-verification** of all components
6. **Re-lock** with updated documentation

---

## Version History

- **v1.0** (2025-12-27): Initial A11Y Authority Contract
  - Defined semantic-first rules
  - Established accessible name rules
  - Defined aria-* as API rules
  - Defined keyboard-only operability rules
  - Established overlay labeling rules
  - Defined A11Y GAP contract
  - Documented component requirements matrix
  - Defined forbidden and allowed patterns
  - Established enforcement mechanisms

---

**Last Updated:** 2025-12-27  
**Version:** 1.0  
**Lock Status:** ✅ **LOCKED** — See [A11Y_LOCK.md](./locks/A11Y_LOCK.md)

