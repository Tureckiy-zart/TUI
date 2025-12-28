# TUNG_A11Y_SYSTEM_V1 — A11Y System v1 Report

**Status:** ✅ COMPLETE  
**Date Created:** 2025-12-27  
**Task:** TUNG_A11Y_SYSTEM_V1  
**Mode:** LEAN_REPORTING

---

## Overview

This document contains the system-level A11Y audit matrix, findings classification, and links to Authority, Lock, and Storybook contract stories for the A11Y System v1 implementation.

**Deliverables:**
- A11Y Audit Matrix (embedded below)
- A11Y_GAPS Classification
- Links to Authority/Lock/Stories

---

## A11Y Audit Matrix

### Audit Methodology

For each component, the following A11Y aspects were audited:

1. **Semantic element choice** — Uses native semantic elements (button/a/input) vs non-semantic (div/span)
2. **Role correctness** — Correct role attribute if non-semantic element is used
3. **Accessible name** — Presence and correctness of label/aria-label/aria-labelledby
4. **aria-* usage** — Correctness, no conflicting states, no redundant aria when native exists
5. **Keyboard-only operability** — Tab reachability, Enter/Space activation, Escape close (overlays), arrow navigation (composites)
6. **Disabled/loading/readonly semantics** — Native disabled vs aria-disabled vs inert patterns alignment
7. **Screen-reader expectations** — Overlay labeling (aria-modal, title/description patterns)

**Classification:**
- **OK** — Meets standards
- **GAP** — Intentional deviation (requires documentation)
- **BUG** — Violation of standards (requires fix)

---

### PRIMITIVES Components Audit

#### Button (`src/PRIMITIVES/Button/Button.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ✅ OK | Uses native `<button>` element |
| Role correctness | ✅ OK | Native button semantics, no role needed |
| Accessible name | ⚠️ GAP | Icon-only buttons require `aria-label` (documented but not enforced) |
| aria-* usage | ✅ OK | No redundant aria, native disabled attribute used |
| Keyboard-only operability | ✅ OK | Tab reachable, Enter/Space activate (native behavior) |
| Disabled semantics | ✅ OK | Native `disabled` attribute, `aria-disabled` not needed |
| Screen-reader expectations | ✅ OK | Native button semantics sufficient |

**Summary:** ✅ OK (1 GAP: icon-only aria-label enforcement)

---

#### Link (`src/PRIMITIVES/Link/Link.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ✅ OK | Uses native `<a>` element |
| Role correctness | ✅ OK | Native link semantics, no role needed |
| Accessible name | ✅ OK | Text content or aria-label provides accessible name |
| aria-* usage | ✅ OK | Uses `aria-disabled` when disabled (correct for anchor) |
| Keyboard-only operability | ✅ OK | Tab reachable, Enter activates (native behavior) |
| Disabled semantics | ✅ OK | Uses `aria-disabled` + `tabIndex={-1}` pattern (correct for anchor) |
| Screen-reader expectations | ✅ OK | Native link semantics sufficient |

**Summary:** ✅ OK

---

#### Input (`src/PRIMITIVES/Input/Input.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ✅ OK | Uses native `<input>` element |
| Role correctness | ✅ OK | Native input semantics, no role needed |
| Accessible name | ⚠️ GAP | Requires external label (via Label component or aria-label) - not self-contained |
| aria-* usage | ✅ OK | Uses `aria-invalid` correctly, no conflicting states |
| Keyboard-only operability | ✅ OK | Tab reachable, native keyboard input (native behavior) |
| Disabled semantics | ✅ OK | Native `disabled` attribute |
| Screen-reader expectations | ✅ OK | Native input semantics sufficient |

**Summary:** ✅ OK (1 GAP: requires external label - by design)

---

#### Textarea (`src/PRIMITIVES/Textarea/Textarea.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ✅ OK | Uses native `<textarea>` element |
| Role correctness | ✅ OK | Native textarea semantics, no role needed |
| Accessible name | ⚠️ GAP | Requires external label (via Label component or aria-label) - not self-contained |
| aria-* usage | ✅ OK | Uses `aria-invalid` correctly, no conflicting states |
| Keyboard-only operability | ✅ OK | Tab reachable, native keyboard input (native behavior) |
| Disabled semantics | ✅ OK | Native `disabled` attribute |
| Screen-reader expectations | ✅ OK | Native textarea semantics sufficient |

**Summary:** ✅ OK (1 GAP: requires external label - by design)

---

#### Checkbox (`src/PRIMITIVES/Checkbox/Checkbox.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ⚠️ GAP | Uses `<button role="checkbox">` (non-native pattern, but justified) |
| Role correctness | ✅ OK | Correct `role="checkbox"` with `aria-checked` |
| Accessible name | ⚠️ GAP | Requires `aria-label` or `aria-labelledby` (no visible label) |
| aria-* usage | ✅ OK | Correct `aria-checked`, `aria-disabled`, `aria-invalid` usage |
| Keyboard-only operability | ✅ OK | Tab reachable, Space toggles (custom handler) |
| Disabled semantics | ✅ OK | Uses `aria-disabled` + native `disabled` (correct pattern) |
| Screen-reader expectations | ✅ OK | Proper checkbox semantics via ARIA |

**Summary:** ⚠️ GAP (2 GAPs: button role pattern, requires aria-label - both justified)

---

#### Radio (`src/PRIMITIVES/Radio/Radio.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ⚠️ GAP | Uses `<button role="radio">` (non-native pattern, but justified) |
| Role correctness | ✅ OK | Correct `role="radio"` with `aria-checked` |
| Accessible name | ⚠️ GAP | Requires `aria-label` or `aria-labelledby` (no visible label) |
| aria-* usage | ✅ OK | Correct `aria-checked`, `aria-disabled`, `aria-invalid` usage |
| Keyboard-only operability | ✅ OK | Tab reachable (roving tabindex in group), Space/Arrow keys (custom handlers) |
| Disabled semantics | ✅ OK | Uses `aria-disabled` + native `disabled` (correct pattern) |
| Screen-reader expectations | ✅ OK | Proper radio semantics via ARIA, roving tabindex pattern |

**Summary:** ⚠️ GAP (2 GAPs: button role pattern, requires aria-label - both justified)

---

#### Switch (`src/PRIMITIVES/Switch/Switch.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ⚠️ GAP | Uses `<button role="switch">` (non-native pattern, but justified) |
| Role correctness | ✅ OK | Correct `role="switch"` with `aria-checked` |
| Accessible name | ⚠️ GAP | Requires `aria-label` or `aria-labelledby` (no visible label) |
| aria-* usage | ✅ OK | Correct `aria-checked`, `aria-disabled`, `aria-invalid` usage |
| Keyboard-only operability | ✅ OK | Tab reachable, Space toggles (custom handler) |
| Disabled semantics | ✅ OK | Uses `aria-disabled` + native `disabled` (correct pattern) |
| Screen-reader expectations | ✅ OK | Proper switch semantics via ARIA |

**Summary:** ⚠️ GAP (2 GAPs: button role pattern, requires aria-label - both justified)

---

#### Select (`src/COMPOSITION/controls/Select/Select.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ✅ OK | Uses Radix Select primitives (Radix handles semantics) |
| Role correctness | ✅ OK | Radix provides correct roles (combobox pattern) |
| Accessible name | ⚠️ GAP | Requires external label (via Label component or aria-label) - not self-contained |
| aria-* usage | ✅ OK | Radix handles aria-* attributes correctly |
| Keyboard-only operability | ✅ OK | Radix handles keyboard navigation (Arrow keys, Enter, Escape) |
| Disabled semantics | ✅ OK | Radix handles disabled state correctly |
| Screen-reader expectations | ✅ OK | Radix provides proper combobox semantics |

**Summary:** ✅ OK (1 GAP: requires external label - by design)

---

#### Label (`src/PRIMITIVES/Label/Label.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ✅ OK | Uses Radix Label (wraps native `<label>`) |
| Role correctness | ✅ OK | Native label semantics |
| Accessible name | ✅ OK | Label text provides accessible name for associated control |
| aria-* usage | ✅ OK | No aria-* needed (native label semantics) |
| Keyboard-only operability | ✅ OK | Clicking label focuses associated control (native behavior) |
| Disabled semantics | ✅ OK | Uses `peer-disabled:` pattern for visual feedback |
| Screen-reader expectations | ✅ OK | Native label semantics sufficient |

**Summary:** ✅ OK

---

#### Field (`src/PRIMITIVES/Field/Field.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ✅ OK | Uses `<div>` for layout (non-interactive container) |
| Role correctness | ✅ OK | No role needed (non-interactive container) |
| Accessible name | ✅ OK | Composes Label component (provides accessible name) |
| aria-* usage | ✅ OK | No aria-* needed (composition component) |
| Keyboard-only operability | ✅ OK | N/A (non-interactive container) |
| Disabled semantics | ✅ OK | N/A (non-interactive container) |
| Screen-reader expectations | ✅ OK | Composes accessible primitives correctly |

**Summary:** ✅ OK

---

### COMPOSITION Components Audit

#### Tabs (`src/COMPOSITION/navigation/tabs/Tabs.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ✅ OK | Uses Radix Tabs primitives (Radix handles semantics) |
| Role correctness | ✅ OK | Radix provides correct roles (tablist, tab, tabpanel) |
| Accessible name | ✅ OK | Tab trigger text provides accessible name |
| aria-* usage | ✅ OK | Radix handles aria-* attributes correctly (aria-selected, aria-controls) |
| Keyboard-only operability | ✅ OK | Radix handles keyboard navigation (Arrow keys, Home/End) |
| Disabled semantics | ✅ OK | Radix handles disabled tabs correctly |
| Screen-reader expectations | ✅ OK | Radix provides proper tabs semantics |

**Summary:** ✅ OK

---

#### Modal (`src/COMPOSITION/overlays/Modal/Modal.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ✅ OK | Uses Radix Dialog primitives (Radix handles semantics) |
| Role correctness | ✅ OK | Radix provides correct role (dialog) |
| Accessible name | ⚠️ GAP | Requires `aria-labelledby` (via Modal.Title) - not enforced |
| aria-* usage | ✅ OK | Radix handles `aria-modal`, `aria-labelledby`, `aria-describedby` |
| Keyboard-only operability | ✅ OK | Radix handles focus trap, Escape closes (native Radix behavior) |
| Disabled semantics | ✅ OK | N/A (overlay component) |
| Screen-reader expectations | ✅ OK | Radix provides proper modal semantics, focus trap |

**Summary:** ⚠️ GAP (1 GAP: aria-labelledby not enforced - requires Modal.Title)

---

#### Dialog (`src/COMPOSITION/overlays/Dialog.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ✅ OK | Composes Modal (Radix Dialog primitives) |
| Role correctness | ✅ OK | Inherits from Modal (Radix provides correct role) |
| Accessible name | ✅ OK | Provides Dialog.Title and Dialog.Description (wires aria-labelledby/aria-describedby) |
| aria-* usage | ✅ OK | Wires aria-labelledby and aria-describedby correctly |
| Keyboard-only operability | ✅ OK | Inherits from Modal (Radix handles focus trap, Escape) |
| Disabled semantics | ✅ OK | N/A (overlay component) |
| Screen-reader expectations | ✅ OK | Proper dialog semantics via Modal composition |

**Summary:** ✅ OK

---

#### Drawer (`src/COMPOSITION/overlays/Drawer/Drawer.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ⚠️ GAP | Uses custom implementation (not Radix-based) |
| Role correctness | ✅ OK | Uses `role="dialog"` correctly |
| Accessible name | ⚠️ GAP | Requires `titleId` prop (not enforced) |
| aria-* usage | ✅ OK | Uses `aria-modal`, `aria-labelledby`, `aria-describedby` correctly |
| Keyboard-only operability | ✅ OK | Custom focus trap, Escape closes (uses useFocusLock hook) |
| Disabled semantics | ✅ OK | N/A (overlay component) |
| Screen-reader expectations | ✅ OK | Proper drawer semantics, focus trap implemented |

**Summary:** ⚠️ GAP (2 GAPs: custom implementation, titleId not enforced)

---

#### Popover (`src/COMPOSITION/overlays/Popover.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ✅ OK | Uses Radix Popover primitives (Radix handles semantics) |
| Role correctness | ✅ OK | Radix provides correct role (dialog, but non-modal) |
| Accessible name | ⚠️ GAP | No accessible name requirement (non-modal popover) - OK |
| aria-* usage | ✅ OK | Radix handles aria-* attributes correctly |
| Keyboard-only operability | ✅ OK | Radix handles Escape closes, focus restore |
| Disabled semantics | ✅ OK | N/A (overlay component) |
| Screen-reader expectations | ✅ OK | Radix provides proper popover semantics (non-modal) |

**Summary:** ✅ OK

---

#### Tooltip (`src/COMPOSITION/overlays/Tooltip.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ✅ OK | Uses Radix Tooltip primitives (Radix handles semantics) |
| Role correctness | ✅ OK | Radix provides correct role (tooltip) |
| Accessible name | ✅ OK | Tooltip content provides accessible name (announced on hover) |
| aria-* usage | ✅ OK | Radix handles aria-* attributes correctly |
| Keyboard-only operability | ✅ OK | Radix handles keyboard focus (tooltip appears on focus) |
| Disabled semantics | ✅ OK | N/A (overlay component) |
| Screen-reader expectations | ✅ OK | Radix provides proper tooltip semantics |

**Summary:** ✅ OK

---

#### Toast (`src/COMPOSITION/overlays/Toast.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ✅ OK | Uses Radix Toast primitives (Radix handles semantics) |
| Role correctness | ✅ OK | Radix provides correct role (status/alert) |
| Accessible name | ✅ OK | Toast title/description provides accessible name |
| aria-* usage | ✅ OK | Radix handles aria-* attributes correctly (aria-live) |
| Keyboard-only operability | ✅ OK | Radix handles keyboard navigation (focus not trapped) |
| Disabled semantics | ✅ OK | N/A (notification component) |
| Screen-reader expectations | ✅ OK | Radix provides proper toast semantics (aria-live region) |

**Summary:** ✅ OK

---

#### ContextMenu (`src/COMPOSITION/overlays/ContextMenu/ContextMenu.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ✅ OK | Uses Radix ContextMenu primitives (Radix handles semantics) |
| Role correctness | ✅ OK | Radix provides correct roles (menu, menuitem) |
| Accessible name | ✅ OK | Menu item text provides accessible name |
| aria-* usage | ✅ OK | Radix handles aria-* attributes correctly |
| Keyboard-only operability | ✅ OK | Radix handles keyboard navigation (Arrow keys, Enter, Escape) |
| Disabled semantics | ✅ OK | Radix handles disabled menu items correctly |
| Screen-reader expectations | ✅ OK | Radix provides proper context menu semantics |

**Summary:** ✅ OK

---

#### Pagination (`src/COMPOSITION/navigation/pagination/Pagination.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ✅ OK | Uses semantic `<nav>` element |
| Role correctness | ✅ OK | Native nav semantics, `aria-label` provided |
| Accessible name | ✅ OK | `aria-label` prop provides accessible name (default: "Pagination") |
| aria-* usage | ✅ OK | Uses `aria-label`, `aria-current` for current page |
| Keyboard-only operability | ✅ OK | Tab reachable, Enter activates buttons (native behavior) |
| Disabled semantics | ✅ OK | Uses native `disabled` attribute on buttons |
| Screen-reader expectations | ✅ OK | Proper pagination semantics via nav + aria-current |

**Summary:** ✅ OK

---

#### Breadcrumbs (`src/COMPOSITION/navigation/breadcrumbs/Breadcrumbs.tsx`)

| Aspect | Status | Notes |
|--------|--------|-------|
| Semantic element | ✅ OK | Uses semantic `<nav>` and `<ol>` elements |
| Role correctness | ✅ OK | Native nav/ol semantics, `aria-label` provided |
| Accessible name | ✅ OK | `aria-label` prop provides accessible name (default: "Breadcrumb") |
| aria-* usage | ✅ OK | Uses `aria-label`, `aria-current="page"` for current item |
| Keyboard-only operability | ✅ OK | Tab reachable links (native behavior) |
| Disabled semantics | ✅ OK | Uses `aria-disabled` + `tabIndex={-1}` for disabled items |
| Screen-reader expectations | ✅ OK | Proper breadcrumb semantics via nav + ol + aria-current |

**Summary:** ✅ OK

---

## A11Y_GAPS Classification

### ACCEPTABLE GAPs (Intentional, Documented, Justified)

#### GAP-1: Icon-only Button aria-label Requirement

**Component:** Button  
**Aspect:** Accessible name  
**Classification:** ACCEPTABLE  
**Rationale:** Icon-only buttons require `aria-label` for accessibility. This is documented in component comments and Storybook examples, but not enforced at type level. Enforcement would require complex type-level checks that may be impractical.

**User Impact:** Low - developers must provide aria-label for icon-only buttons (standard practice).  
**Why fixing is worse:** Type-level enforcement would require complex conditional types and may not catch all cases. Documentation and examples are sufficient.

**Storybook Demo:** Icon-only button examples include aria-label.

---

#### GAP-2: Input/Textarea External Label Requirement

**Components:** Input, Textarea, Select  
**Aspect:** Accessible name  
**Classification:** ACCEPTABLE  
**Rationale:** Form inputs require external labels (via Label component or aria-label). This is by design - inputs are low-level primitives that compose with Label in Field component.

**User Impact:** None - this is standard form pattern. Field component provides correct composition.  
**Why fixing is worse:** Making inputs self-contained would violate composition principles and duplicate Label logic.

**Storybook Demo:** Input/Textarea examples show composition with Label.

---

#### GAP-3: Checkbox/Radio/Switch Button Role Pattern

**Components:** Checkbox, Radio, Switch  
**Aspect:** Semantic element  
**Classification:** ACCEPTABLE  
**Rationale:** Uses `<button role="checkbox|radio|switch">` instead of native `<input type="checkbox|radio">`. This pattern is justified for custom styling and state management while maintaining accessibility.

**User Impact:** None - ARIA pattern provides equivalent accessibility to native inputs.  
**Why fixing is worse:** Native inputs have limited styling capabilities. Button role pattern is standard for custom form controls.

**Storybook Demo:** Components demonstrate proper ARIA usage.

---

#### GAP-4: Checkbox/Radio/Switch aria-label Requirement

**Components:** Checkbox, Radio, Switch  
**Aspect:** Accessible name  
**Classification:** ACCEPTABLE  
**Rationale:** These components require `aria-label` or `aria-labelledby` as they have no visible label (custom styled controls). This is standard for custom form controls.

**User Impact:** Low - developers must provide aria-label (standard practice for custom controls).  
**Why fixing is worse:** Adding visible label would change component design. Field component provides correct composition with Label.

**Storybook Demo:** Components show aria-label usage.

---

#### GAP-5: Modal aria-labelledby Not Enforced

**Component:** Modal  
**Aspect:** Accessible name  
**Classification:** ACCEPTABLE  
**Rationale:** Modal requires `aria-labelledby` (via Modal.Title), but this is not enforced at type level. Dialog component provides correct composition pattern.

**User Impact:** Low - Dialog component enforces correct pattern. Modal is low-level primitive.  
**Why fixing is worse:** Type-level enforcement would require complex composition checks. Dialog component provides correct high-level API.

**Storybook Demo:** Modal examples show Modal.Title usage.

---

#### GAP-6: Drawer Custom Implementation

**Component:** Drawer  
**Aspect:** Semantic element  
**Classification:** ACCEPTABLE  
**Rationale:** Drawer uses custom implementation (not Radix-based) with proper focus trap and ARIA. This is acceptable as Drawer has different UX patterns than Modal/Dialog.

**User Impact:** None - custom implementation provides equivalent accessibility.  
**Why fixing is worse:** Radix does not provide Drawer primitive. Custom implementation is necessary and properly implements accessibility.

**Storybook Demo:** Drawer demonstrates focus trap and ARIA.

---

#### GAP-7: Drawer titleId Not Enforced

**Component:** Drawer  
**Aspect:** Accessible name  
**Classification:** ACCEPTABLE  
**Rationale:** Drawer requires `titleId` prop for `aria-labelledby`, but this is not enforced at type level. This is acceptable as Drawer is a low-level primitive.

**User Impact:** Low - developers must provide titleId (documented in props).  
**Why fixing is worse:** Type-level enforcement would require complex checks. Documentation is sufficient.

**Storybook Demo:** Drawer examples show titleId usage.

---

### BUG List (Must Fix)

**Current Status:** ✅ **BUG COUNT: 0**

All identified issues are classified as ACCEPTABLE GAPs with proper justification.

---

## Summary

**Total Components Audited:** 20  
**OK Components:** 13  
**GAP Components:** 7 (all ACCEPTABLE)  
**BUG Components:** 0

**Key Findings:**
- All Radix-based components provide proper accessibility (Tabs, Modal, Dialog, Popover, Tooltip, Toast, ContextMenu, Select)
- Custom implementations (Button, Link, Checkbox, Radio, Switch, Drawer) properly implement accessibility
- All GAPs are intentional and justified (icon-only aria-label, external label requirements, button role patterns)
- No BUGs identified - all components meet accessibility standards

---

## Links

### Authority Documents
- [A11Y_AUTHORITY.md](../../architecture/A11Y_AUTHORITY.md) - A11Y Authority Contract

### Lock Documents
- [A11Y_LOCK.md](../../architecture/locks/A11Y_LOCK.md) - A11Y System Lock

### Storybook Contract Stories
- [A11yOverview](../../../src/COMPOSITION/a11y/A11yOverview.stories.tsx) - A11Y overview and keyboard-only checks
- [AccessibleNameGallery](../../../src/COMPOSITION/a11y/AccessibleNameGallery.stories.tsx) - Accessible name patterns
- [OverlayA11yContracts](../../../src/COMPOSITION/a11y/OverlayA11yContracts.stories.tsx) - Overlay accessibility contracts
- [CompositeKeyboardContracts](../../../src/COMPOSITION/a11y/CompositeKeyboardContracts.stories.tsx) - Composite keyboard contracts

### Related Authority Documents
- [FOCUS_AUTHORITY.md](../../architecture/FOCUS_AUTHORITY.md) - Focus navigation mechanics
- [INTERACTION_AUTHORITY.md](../../architecture/INTERACTION_AUTHORITY.md) - Focus-visible styling

---

**Last Updated:** 2025-12-27

