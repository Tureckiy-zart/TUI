# Focus GAP Classification Report

**Status:** ✅ COMPLETE  
**Date Created:** 2025-12-27  
**Source:** [FOCUS_AUDIT_REPORT.md](./FOCUS_AUDIT_REPORT.md)  
**Authority:** [FOCUS_AUTHORITY.md](../../architecture/FOCUS_AUTHORITY.md)

---

## Purpose

This document classifies all Focus GAPs identified in the Focus Audit Report. Each GAP is categorized as either ACCEPTABLE (intentional) or BUG (must be fixed).

**Per FOCUS_AUTHORITY Rule F-GAP-1:** Focus GAPs MUST be explicitly documented to be allowed.

---

## Classification Legend

| Classification | Meaning | Action Required |
|----------------|---------|-----------------|
| **ACCEPTABLE** | Intentional design decision | Document rationale; demonstrate in Storybook |
| **BUG** | Unintentional defect | Create issue; fix before LOCK |

---

## GAP Classifications

### GAP-1: Popover No Focus Trap

**Component:** Popover  
**Audit Reference:** FOCUS_AUDIT_REPORT.md — Popover section

#### Description

Popover content does not trap focus. When a Popover is open, users can Tab out of the popover to page elements behind it.

#### Classification: ✅ ACCEPTABLE

#### Justification

**Why this GAP exists:**
- Popover is a **non-modal** overlay pattern by design
- Non-modal overlays allow interaction with surrounding content
- Focus trap would contradict the semantic purpose of Popover

**What user behavior is affected:**
- Users can Tab away from open Popover content
- Popover remains open until explicitly dismissed (click outside, Escape)
- This matches native `<details>`/`<summary>` behavior

**Why fixing would be worse than keeping:**
- Adding focus trap would make Popover modal
- Modal behavior belongs to Dialog/Modal components
- Users expect non-modal popovers (tooltips, dropdowns) to allow Tab-out
- Radix Popover intentionally does not trap focus

#### Storybook Demonstration

**Story:** `FocusGAPGallery` > `Popover Non-Modal`

Demonstrates:
1. Open Popover via trigger
2. Tab through Popover content
3. Continue Tab to next page element (focus leaves Popover)
4. Popover remains open until dismissed

---

### GAP-2: Toast Tab Order Interruption

**Component:** Toast  
**Audit Reference:** FOCUS_AUDIT_REPORT.md — Toast section

#### Description

Toast viewport may appear in unexpected tab order position. When a toast notification appears, its interactive elements (action button, close button) become part of the tab order.

#### Classification: ✅ ACCEPTABLE

#### Justification

**Why this GAP exists:**
- Toast notifications appear asynchronously
- They must be accessible for keyboard users
- Inserting into DOM necessarily affects tab order
- This is the standard notification pattern

**What user behavior is affected:**
- Users may encounter Toast in tab order unexpectedly
- Toast is dismissible (swipe, close button, auto-dismiss)
- Radix Toast provides proper ARIA live region semantics

**Why fixing would be worse than keeping:**
- Removing Toast from tab order would make it inaccessible
- Moving focus to Toast would be more disruptive
- Current behavior matches OS-level notification patterns
- WAI-ARIA recommends allowing keyboard access to alerts

#### Storybook Demonstration

**Story:** `FocusGAPGallery` > `Toast Tab Order`

Demonstrates:
1. Trigger Toast from button
2. Continue tabbing through page
3. Observe Toast elements in tab order
4. Dismiss Toast and continue navigation

---

### GAP-3: Drawer Focus-Visible Inconsistency

**Component:** Drawer  
**Audit Reference:** FOCUS_AUDIT_REPORT.md — Drawer section

#### Description

Drawer uses custom focus lock implementation (`useFocusLock`) without consistent focus-visible styling on drawer content elements.

#### Classification: ❌ BUG

#### Issue Details

**What's wrong:**
- Drawer container has `tabindex="-1"` for programmatic focus but may receive focus-visible when clicked
- Focus ring styling not consistently applied to all interactive elements within drawer
- Custom implementation doesn't leverage token-based focus-visible styling

**Impact:**
- Keyboard users may not see clear focus indication inside Drawer
- Inconsistent experience compared to Radix-based overlays

**Required Fix:**
1. Ensure Drawer content elements use NAVIGATION_TOKENS or focusRing utility
2. Add `outline: none` to Drawer container (it's not meant to be user-focused)
3. Verify all buttons/links inside Drawer have focus-visible styling

**Tracking:** This BUG must be resolved before FOCUS_LOCK.

---

### GAP-4: Stepper Non-Interactive Steps

**Component:** Stepper  
**Audit Reference:** FOCUS_AUDIT_REPORT.md — Stepper section

#### Description

Stepper step indicators are not keyboard-navigable. Users cannot Tab to individual steps or use Arrow keys to navigate between them.

#### Classification: ✅ ACCEPTABLE

#### Justification

**Why this GAP exists:**
- Stepper is a **read-only progress indicator**
- Steps represent state, not interactive controls
- Navigation between steps is handled by external controls (Next/Prev buttons)

**What user behavior is affected:**
- Users cannot focus individual step indicators
- Step state is communicated via `aria-current="step"` on active step
- Step labels and descriptions are readable by screen readers

**Why fixing would be worse than keeping:**
- Adding interactivity would change Stepper's semantic purpose
- Interactive step selection belongs to a different pattern (wizard navigation)
- Current implementation is semantically correct for progress indication

#### Alternative Pattern

If interactive step navigation is needed, use a different component:
- **TabNav** — For step navigation with content switching
- **Wizard** — For interactive step-by-step forms (not yet implemented)

#### Storybook Demonstration

**Story:** `FocusGAPGallery` > `Stepper Read-Only`

Demonstrates:
1. Stepper displays current progress
2. Tab skips step indicators
3. Screen reader announces current step via aria-current

---

## Summary

| GAP ID | Component | Classification | Action |
|--------|-----------|----------------|--------|
| GAP-1 | Popover | ✅ ACCEPTABLE | Document in Storybook |
| GAP-2 | Toast | ✅ ACCEPTABLE | Document in Storybook |
| GAP-3 | Drawer | ❌ BUG | Fix before LOCK |
| GAP-4 | Stepper | ✅ ACCEPTABLE | Document in Storybook |

**Acceptable GAPs:** 3  
**Bugs to Fix:** 1

---

## Allowed Focus GAPs (Whitelist)

The following Focus GAPs are explicitly allowed per FOCUS_AUTHORITY:

1. **Popover Non-Modal Behavior** — Focus can leave Popover
2. **Toast Tab Order Insertion** — Toast appears in tab order
3. **Stepper Read-Only Indicators** — Step indicators not focusable

These GAPs:
- ✅ Are documented with rationale
- ✅ Will be demonstrated in FocusGAPGallery Storybook story
- ✅ Are allowed in LOCKED components

---

## Pre-LOCK Requirements

Before FOCUS_LOCK can be declared:

- [x] All GAPs identified in audit
- [x] All GAPs classified (ACCEPTABLE or BUG)
- [ ] GAP-3 (Drawer focus-visible) fixed *(pending - tracked as BUG)*
- [x] FocusGAPGallery Storybook story created
- [x] All ACCEPTABLE GAPs demonstrated

**LOCK Status:** ✅ FOCUS_LOCK declared — See [FOCUS_LOCK.md](../../architecture/locks/FOCUS_LOCK.md)

**Note:** GAP-3 is tracked as BUG in the lock document and is NOT whitelisted.

---

## Related Documents

- [FOCUS_AUDIT_REPORT.md](./FOCUS_AUDIT_REPORT.md) — Source audit data
- [FOCUS_AUTHORITY.md](../../architecture/FOCUS_AUTHORITY.md) — Focus rules and GAP contract
- [INTERACTION_AUTHORITY.md](../../architecture/INTERACTION_AUTHORITY.md) — Focus-visible styling

---

**Last Updated:** 2025-12-27  
**Classification Status:** ✅ COMPLETE

