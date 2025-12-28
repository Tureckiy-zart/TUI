# Focus Authority Contract

**Status:** ✅ ACTIVE  
**Priority:** BLOCKER  
**Date Created:** 2025-12-27  
**Version:** 1.0  
**Enforcement:** TUNG_FOCUS_AUTHORITY_FOUNDATION

---

## Document Classification

**TYPE:** AUTHORITY  
**MUTABILITY:** IMMUTABLE after LOCK  
**LOCK STATUS:** ✅ **LOCKED**  
**AUTHORITY DOMAIN:** Focus Authority  
**LOCK DOCUMENT:** [FOCUS_LOCK.v1.1.md](./locks/FOCUS_LOCK.v1.1.md) (canonical)  
**Historical:** [FOCUS_LOCK.md](./locks/FOCUS_LOCK.md) (v1.0)

**Purpose:** This document defines the canonical declarative rules for focus navigation behavior (focus trapping, focus restoration, tab order, focus-visible indication) across all UI components. It establishes architectural law for keyboard accessibility.

---

## Overview

This document defines the canonical Focus Authority contract for all UI components. It establishes the rules for focus behavior, ensuring consistent keyboard navigation and accessibility across the design system.

**Key Principle:** Focus is navigation, not visual styling. Every focus behavior must be intentional, observable, and testable.

**Relationship to Other Authorities:**
- **INTERACTION_AUTHORITY** handles `:focus-visible` visual styling (Priority 5 state)
- **FOCUS_AUTHORITY** (this document) handles focus **navigation** mechanics (trap, restore, tab order)

---

## Axioms

| ID | Axiom |
|----|-------|
| **A1** | Focus is navigation, not visual styling |
| **A2** | Every focus behavior must be intentional, observable, and testable |
| **A3** | Radix provides mechanics, not architecture (internal only) |
| **A4** | Unresolved focus behavior is a bug unless explicitly declared as GAP |
| **A5** | LOCKED systems forbid accidental regressions |

---

## Canonical Terminology

### focusable

An element that can receive programmatic or keyboard focus.

**Requirements:**
- Interactive elements (`<button>`, `<a>`, `<input>`, etc.) are focusable by default
- Non-interactive elements can be made focusable with `tabindex="0"` or `tabindex="-1"`
- Elements with `tabindex="-1"` can only receive programmatic focus (not Tab)

### tabbable

An element reachable via Tab/Shift+Tab navigation.

**Requirements:**
- Interactive elements are tabbable by default
- Elements with `tabindex="-1"` are NOT tabbable
- Elements with `tabindex="0"` are tabbable in DOM order
- **FORBIDDEN:** `tabindex > 0` (positive tabindex)

### focus-visible

Focus indication shown only for keyboard modality.

**Requirements:**
- `:focus-visible` pseudo-class MUST be used for focus rings
- `:focus` alone MUST NOT be used for focus rings
- Focus ring styling is governed by **INTERACTION_AUTHORITY**

**Reference:** See [INTERACTION_AUTHORITY.md](./INTERACTION_AUTHORITY.md) Section 5 (Focus-Visible State)

### focus-trap

Constraint that prevents focus from leaving a defined boundary.

**Requirements:**
- Focus trap MUST be implemented for modal overlays
- Tab/Shift+Tab MUST cycle within trap boundary
- Escape key SHOULD close trapped context and restore focus
- Focus trap MUST be invisible to screen readers (no extra focusable sentinels)

### focus-restore

Returning focus to a defined element after close/unmount.

**Requirements:**
- Modal overlays MUST restore focus to trigger element on close
- Focus restore MUST happen synchronously after close
- If trigger no longer exists, focus SHOULD move to nearest logical target

### focus-gap

An intentional, documented absence or break in focus continuity.

**Requirements:**
- Focus GAPs MUST be explicitly documented
- Each GAP MUST describe user impact
- Each GAP MUST be demonstrable in Storybook
- Unresolved GAPs are forbidden in LOCKED components

---

## Focus-Visible Rules

**Rule F-VIS-1:** Use `:focus-visible` exclusively for focus rings.

```css
/* ✅ CORRECT */
:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

/* ❌ FORBIDDEN */
:focus {
  outline: 2px solid var(--ring);
}
```

**Rule F-VIS-2:** Focus rings MUST be visible in all color modes.

**Rule F-VIS-3:** Focus rings MUST have sufficient contrast (WCAG 2.1 AA: 3:1 minimum).

**Reference:** Visual styling rules are defined in [INTERACTION_AUTHORITY.md](./INTERACTION_AUTHORITY.md)

---

## Tab Order Rules

**Rule T-ORD-1:** DOM order = navigation order.

Tab order MUST follow DOM source order. Visual reordering (CSS Grid/Flexbox `order`) MUST NOT change logical tab order.

**Rule T-ORD-2:** Positive tabindex is forbidden.

```html
<!-- ✅ CORRECT -->
<button tabindex="0">Tabbable</button>
<button tabindex="-1">Programmatic focus only</button>

<!-- ❌ FORBIDDEN -->
<button tabindex="1">First</button>
<button tabindex="2">Second</button>
```

**Rule T-ORD-3:** Roving tabindex for composite controls.

Composite controls (tabs, radio groups, menus) MUST use roving tabindex:
- Container has `tabindex="0"` OR selected item has `tabindex="0"`
- Other items have `tabindex="-1"`
- Arrow keys move between items and update tabindex

**Rule T-ORD-4:** Skip links for large navigation sections.

Pages with substantial navigation SHOULD provide skip links to main content.

---

## Focus Trap Rules

**Rule F-TRAP-1:** Modal overlays MUST trap focus.

The following component types MUST implement focus trap:
- Modal
- Dialog
- Drawer
- AlertDialog

**Rule F-TRAP-2:** Non-modal overlays MUST NOT trap focus.

The following component types MUST NOT trap focus:
- Popover
- Tooltip
- Toast
- ContextMenu (traps during open, releases on close)

**Rule F-TRAP-3:** Focus trap implementation requirements.

Focus trap MUST:
- Contain Tab/Shift+Tab cycling within boundary
- Allow Escape key to exit (unless explicitly prevented)
- Move focus to first focusable element on open
- Be invisible to screen readers

Focus trap MUST NOT:
- Use visible sentinel elements
- Block programmatic focus management
- Prevent focus from reaching interactive elements

**Rule F-TRAP-4:** Radix handles focus trap internally.

For Radix-based components (Modal, Dialog, Popover, etc.), focus trap is handled by Radix primitives. Custom implementations MUST use tested focus lock utilities.

---

## Focus Restore Rules

**Rule F-REST-1:** Modal overlays MUST restore focus on close.

When a modal overlay closes, focus MUST return to the element that triggered the overlay.

**Rule F-REST-2:** Focus restore MUST be synchronous.

Focus MUST be restored immediately after close, not on next tick or after animation.

**Rule F-REST-3:** Handle missing trigger gracefully.

If the trigger element is removed from DOM:
1. Focus SHOULD move to nearest logical focusable ancestor
2. If no ancestor exists, focus SHOULD move to document body
3. Focus MUST NOT be lost (no blur to void)

**Rule F-REST-4:** Radix handles focus restore internally.

For Radix-based components, focus restore is handled automatically. Custom implementations MUST store trigger ref and restore on unmount.

---

## Focus GAP Contract

**Rule F-GAP-1:** Focus GAPs MUST be explicitly documented.

A Focus GAP is a state where expected focus behavior is intentionally absent. GAPs are allowed ONLY if:
- Documented in [FOCUS_GAPS.md](../reports/audit/FOCUS_GAPS.md)
- Classified as ACCEPTABLE with justification
- Demonstrable in Storybook

**Rule F-GAP-2:** GAP classifications.

Each Focus GAP MUST be classified as:
- **ACCEPTABLE** — Intentional design decision with documented rationale
- **BUG** — Unintentional defect that must be fixed

**Rule F-GAP-3:** GAP documentation requirements.

For ACCEPTABLE GAPs:
- Why this GAP exists
- What user behavior is affected
- Why fixing would be worse than keeping

**Rule F-GAP-4:** Unresolved GAPs are blocking for LOCK.

A component may NOT be LOCKED if it has unresolved Focus GAPs. All GAPs must be either:
- Fixed (no longer a GAP)
- Classified as ACCEPTABLE with documentation
- Classified as BUG with tracking issue

---

## Component Requirements

### Modal Overlays

**Components:** Modal, Dialog, Drawer, AlertDialog

| Requirement | Status |
|-------------|--------|
| Focus trap | MANDATORY |
| Focus restore on close | MANDATORY |
| Escape key closes | MANDATORY (unless explicitly prevented) |
| Initial focus on first interactive | MANDATORY |
| focus-visible styling | MANDATORY |

### Non-Modal Overlays

**Components:** Popover, Tooltip, Toast

| Requirement | Status |
|-------------|--------|
| Focus trap | FORBIDDEN |
| Focus restore on close | MANDATORY (Popover only) |
| Escape key closes | MANDATORY |
| focus-visible styling | MANDATORY (interactive content) |

### Composite Controls

**Components:** Tabs, Select, SegmentedControl, Menu, RadioGroup

| Requirement | Status |
|-------------|--------|
| Roving tabindex | MANDATORY |
| Arrow key navigation | MANDATORY |
| focus-visible styling | MANDATORY |
| Typeahead (where applicable) | RECOMMENDED |

### Navigation Structures

**Components:** NavList, Pagination, Stepper, Breadcrumbs

| Requirement | Status |
|-------------|--------|
| Tab order follows DOM | MANDATORY |
| focus-visible on links/buttons | MANDATORY |
| aria-current for active item | MANDATORY |
| Skip links (large nav) | RECOMMENDED |

---

## Forbidden Patterns

### ❌ FORBIDDEN: Positive tabindex

```html
<!-- ❌ FORBIDDEN -->
<button tabindex="1">First</button>
<button tabindex="2">Second</button>
```

### ❌ FORBIDDEN: Focus styling without :focus-visible

```css
/* ❌ FORBIDDEN */
button:focus { outline: 2px solid blue; }

/* ✅ CORRECT */
button:focus-visible { outline: 2px solid blue; }
```

### ❌ FORBIDDEN: Interactive element without keyboard parity

```html
<!-- ❌ FORBIDDEN -->
<div onclick="handleClick()">Clickable</div>

<!-- ✅ CORRECT -->
<div 
  role="button" 
  tabindex="0" 
  onclick="handleClick()"
  onkeydown="handleKeyDown()"
>
  Clickable
</div>

<!-- ✅ BEST -->
<button onclick="handleClick()">Clickable</button>
```

### ❌ FORBIDDEN: Modal without focus trap

```tsx
// ❌ FORBIDDEN - Modal must trap focus
<Portal>
  <div className="modal-content">
    <button>Close</button>
  </div>
</Portal>
```

### ❌ FORBIDDEN: Overlay close without focus restore

```tsx
// ❌ FORBIDDEN - Must restore focus to trigger
const handleClose = () => {
  setOpen(false);
  // Focus is lost!
};
```

---

## Allowed Patterns

### ✅ ALLOWED: Radix-based focus management

```tsx
// ✅ Radix handles focus trap and restore
<Dialog.Root open={open} onOpenChange={setOpen}>
  <Dialog.Trigger asChild>
    <Button>Open</Button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      {/* Focus trapped here */}
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

### ✅ ALLOWED: Custom focus lock utility

```tsx
// ✅ Custom hook for non-Radix components
useFocusLock({
  containerRef: drawerRef,
  enabled: isOpen,
  returnFocusRef: triggerRef,
});
```

### ✅ ALLOWED: Roving tabindex

```tsx
// ✅ Correct roving tabindex pattern
<div role="tablist">
  <button role="tab" tabIndex={selected === 0 ? 0 : -1}>Tab 1</button>
  <button role="tab" tabIndex={selected === 1 ? 0 : -1}>Tab 2</button>
  <button role="tab" tabIndex={selected === 2 ? 0 : -1}>Tab 3</button>
</div>
```

---

## Enforcement

### Static Guards (ESLint)

1. **no-interactive-without-keyboard** — Forbid interactive `div`/`span` without keyboard parity
2. **require-focus-visible** — Forbid `:focus` without `:focus-visible`

### Runtime Guards (Playwright)

1. Tab navigation tests through Storybook focus stories
2. Focus trap verification for overlay components
3. Focus restore verification on close

### CI Integration

All guards MUST be blocking in CI.

---

## Storybook Observability

Focus behavior MUST be observable in Storybook:

1. **FocusOverview** — Keyboard-only navigation demo
2. **FocusTrapAndRestore** — Open/close cycles for overlays
3. **FocusOrderPlayground** — Tab order visualization
4. **FocusGAPGallery** — Intentional GAPs only

---

## Authority Chain

**Focus Authority** is the single source of truth for all focus navigation behavior across all UI components in the design system.

**Authority Hierarchy:**
1. **Focus Authority Contract** (this document) - Defines focus navigation rules
2. **Interaction Authority Contract** - Defines focus-visible visual styling
3. **Component Implementation** - Applies focus behavior via Radix or custom utilities
4. **Storybook Stories** - Demonstrates focus behavior observability

---

## Related Documents

- [INTERACTION_AUTHORITY.md](./INTERACTION_AUTHORITY.md) - Focus-visible visual styling rules
- [STATE_AUTHORITY.md](./STATE_AUTHORITY.md) - Defines `focus-visible` as canonical state
- [FOCUS_AUDIT_REPORT.v1.1.md](../reports/audit/FOCUS_AUDIT_REPORT.v1.1.md) - System-level focus audit v1.1 (canonical)
- [FOCUS_AUDIT_REPORT.md](../reports/audit/FOCUS_AUDIT_REPORT.md) - System-level focus audit v1.0 (Historical)
- [FOCUS_GAPS.md](../reports/audit/FOCUS_GAPS.md) - Focus GAP classifications
- [FOCUS_LOCK.v1.1.md](./locks/FOCUS_LOCK.v1.1.md) - Lock document v1.1 (canonical)
- [FOCUS_LOCK.md](./locks/FOCUS_LOCK.md) - Lock document v1.0 (Historical)
- [MOTION_LOCK.md](./locks/MOTION_LOCK.md) - Lock document format reference

---

## Unlock Procedure

After LOCK, any modifications require:

1. **Explicit unlock task** with justification
2. **Full audit** of all focus behavior
3. **Impact analysis** of proposed changes
4. **Explicit approval** from architecture authority
5. **Re-verification** of all components
6. **Re-lock** with updated documentation

---

## Version History

- **v1.0** (2025-12-27): Initial Focus Authority Contract
  - Defined canonical focus terminology
  - Established focus-visible rules (reference to INTERACTION_AUTHORITY)
  - Defined tab order rules (DOM order, roving tabindex, no positive tabindex)
  - Defined focus trap rules for modal overlays
  - Defined focus restore rules
  - Established Focus GAP contract
  - Documented component requirements matrix
  - Defined forbidden and allowed patterns
  - Established enforcement mechanisms (ESLint, Playwright)
  - Defined Storybook observability requirements

---

**Last Updated:** 2025-12-27  
**Version:** 1.0  
**Lock Status:** ✅ **LOCKED** — See [FOCUS_LOCK.v1.1.md](./locks/FOCUS_LOCK.v1.1.md) (canonical)

