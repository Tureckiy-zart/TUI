# Focus GAP Classification Report v1.1

**Status:** ✅ COMPLETE  
**Date Created:** 2025-12-19  
**Previous Version:** [FOCUS_GAPS.md](./FOCUS_GAPS.md) (v1.0, 2025-12-27)  
**Source:** [FOCUS_AUDIT_REPORT.v1.1.md](./FOCUS_AUDIT_REPORT.v1.1.md)  
**Authority:** [FOCUS_AUTHORITY.md](../../architecture/FOCUS_AUTHORITY.md)  
**Task:** TUNG_FOCUS_GAP3_FIX_AND_RELOCK_V1_1

---

## Purpose

This document classifies all Focus GAPs identified in the Focus Audit Report. This is version 1.1, reflecting the fix for GAP-3 (Drawer focus-visible inconsistency).

**Changes from v1.0:**
- GAP-3 marked as **FIXED/RESOLVED**
- Drawer no longer listed as BUG
- All GAPs now classified as ACCEPTABLE (no BUGs remaining)

**Per FOCUS_AUTHORITY Rule F-GAP-1:** Focus GAPs MUST be explicitly documented to be allowed.

---

## Classification Legend

| Classification | Meaning | Action Required |
|----------------|---------|-----------------|
| **ACCEPTABLE** | Intentional design decision | Document rationale; demonstrate in Storybook |
| **BUG** | Unintentional defect | Create issue; fix before LOCK |
| **FIXED** | Previously BUG, now resolved | Document fix; verify compliance |

---

## GAP Classifications

### GAP-1: Popover No Focus Trap

**Component:** Popover  
**Audit Reference:** FOCUS_AUDIT_REPORT.v1.1.md — Popover section

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
**Audit Reference:** FOCUS_AUDIT_REPORT.v1.1.md — Toast section

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
**Audit Reference:** FOCUS_AUDIT_REPORT.v1.1.md — Drawer section  
**Status:** ✅ **FIXED** (v1.1)

#### Description

Drawer used custom focus lock implementation (`useFocusLock`) without consistent focus-visible styling on drawer container element.

#### Classification: ✅ **FIXED** (was ❌ BUG in v1.0)

#### Fix Details

**What was fixed:**
- Added `outline-none` class to Drawer container base styles
- Container no longer shows unwanted focus ring when receiving programmatic focus
- Interactive elements inside Drawer already had proper focus-visible styling via tokens

**Fix Implementation:**
- File: `src/COMPOSITION/overlays/Drawer/drawer-variants.ts`
- Change: Added `outline-none` to base class string
- Date: 2025-12-19
- Task: TUNG_FOCUS_GAP3_FIX_AND_RELOCK_V1_1

**Verification:**
- ✅ Container does not show focus ring
- ✅ Interactive elements show proper focus-visible styling
- ✅ Focus trap and restore behavior unchanged
- ✅ Storybook story updated to demonstrate compliance

**Reference:**
- [GAP3_patch.md](../focus/GAP3_patch.md) - Implementation details
- [GAP3_verify.md](../focus/GAP3_verify.md) - Verification results

---

### GAP-4: Stepper Non-Interactive Steps

**Component:** Stepper  
**Audit Reference:** FOCUS_AUDIT_REPORT.v1.1.md — Stepper section

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

| GAP ID | Component | Classification | Status |
|--------|-----------|----------------|--------|
| GAP-1 | Popover | ✅ ACCEPTABLE | Documented in Storybook |
| GAP-2 | Toast | ✅ ACCEPTABLE | Documented in Storybook |
| GAP-3 | Drawer | ✅ FIXED | Resolved in v1.1 |
| GAP-4 | Stepper | ✅ ACCEPTABLE | Documented in Storybook |

**Acceptable GAPs:** 3  
**Bugs to Fix:** 0 (was 1 in v1.0)  
**Fixed GAPs:** 1 (GAP-3)

---

## Allowed Focus GAPs (Whitelist)

The following Focus GAPs are explicitly allowed per FOCUS_AUTHORITY:

1. **Popover Non-Modal Behavior** — Focus can leave Popover
2. **Toast Tab Order Insertion** — Toast appears in tab order
3. **Stepper Read-Only Indicators** — Step indicators not focusable

These GAPs:
- ✅ Are documented with rationale
- ✅ Demonstrated in FocusGAPGallery Storybook story
- ✅ Are allowed in LOCKED components

**Note:** GAP-3 (Drawer) is no longer a GAP and is not listed here.

---

## Pre-LOCK Requirements

Before FOCUS_LOCK v1.1 can be declared:

- [x] All GAPs identified in audit
- [x] All GAPs classified (ACCEPTABLE or BUG)
- [x] GAP-3 (Drawer focus-visible) fixed ✅ **(COMPLETED in v1.1)**
- [x] FocusGAPGallery Storybook story created
- [x] All ACCEPTABLE GAPs demonstrated

**LOCK Status:** ✅ FOCUS_LOCK v1.1 ready — See [FOCUS_LOCK.v1.1.md](../../architecture/locks/FOCUS_LOCK.v1.1.md)

**Change from v1.0:**
- GAP-3 fix requirement satisfied
- No pending BUGs remaining
- System ready for clean LOCK

---

## Version History

**v1.1 (2025-12-19):**
- Fixed GAP-3: Drawer focus-visible inconsistency
- GAP-3 marked as FIXED/RESOLVED
- All BUGs resolved (BUG count: 0)

**v1.0 (2025-12-27):**
- Initial GAP classification
- GAP-3 classified as BUG (pending fix)

---

## Related Documents

- [FOCUS_GAPS.md](./FOCUS_GAPS.md) - Previous version (v1.0)
- [FOCUS_AUDIT_REPORT.v1.1.md](./FOCUS_AUDIT_REPORT.v1.1.md) - Source audit data v1.1
- [FOCUS_AUTHORITY.md](../../architecture/FOCUS_AUTHORITY.md) - Focus rules and GAP contract
- [INTERACTION_AUTHORITY.md](../../architecture/INTERACTION_AUTHORITY.md) - Focus-visible styling
- [GAP3_patch.md](../focus/GAP3_patch.md) - GAP-3 fix details

---

**Last Updated:** 2025-12-19  
**Classification Status:** ✅ COMPLETE  
**Version:** 1.1

