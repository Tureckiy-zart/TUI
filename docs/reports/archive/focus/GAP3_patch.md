# GAP-3 Patch Notes

**Date Created:** 2025-12-19  
**Task:** TUNG_FOCUS_GAP3_FIX_AND_RELOCK_V1_1  
**Status:** ✅ Complete

---

## Summary

Fixed GAP-3 (Drawer focus-visible inconsistency) by adding `outline-none` class to Drawer container base styles. This prevents the container from showing unwanted focus ring when it receives programmatic focus (tabindex=-1).

---

## Implementation Targets

### Target Files

**Primary Fix Target:**
- **File:** `src/COMPOSITION/overlays/Drawer/drawer-variants.ts`
- **Line:** 21
- **Symbol:** `drawerVariants` (CVA base class string)

**Verification Targets:**
- `src/COMPOSITION/overlays/Drawer/Drawer.tsx` (lines 179-195) - Container component
- `src/COMPOSITION/focus/FocusTrapAndRestore.stories.tsx` (lines 252-309) - Storybook story

### Implementation Strategy

**Single Code Change:**
- Add `outline-none` to `drawer-variants.ts` base class string
- This is the ONLY code change required

**Why This Is Sufficient:**
1. Drawer container is not meant to be user-focused (tabindex=-1)
2. Interactive elements inside already have proper focus-visible styling
3. Suppressing container outline prevents misleading focus indication
4. Complies with FOCUS_AUTHORITY Rule F-VIS-1 (focus-visible only for focus rings)

---

## Expected Behavior

### Drawer Focus Contract

**Authority Rules Reference:**
- **F-VIS-1:** Use `:focus-visible` exclusively for focus rings
- **F-TRAP-1:** Modal overlays MUST trap focus
- **F-REST-1:** Modal overlays MUST restore focus on close
- **T-ORD-2:** Positive tabindex is forbidden

### 1. On Open: Initial Focus Behavior

- Focus MUST move to the first meaningful interactive element inside Drawer
- If no interactive element exists, focus MAY move to Drawer container (programmatic focus only)
- Focus move MUST happen synchronously after Drawer opens
- Container focus is programmatic only (not user-accessible via Tab)

### 2. While Open: Focus Trap Behavior

- Tab key MUST cycle focus within Drawer boundary
- Shift+Tab MUST cycle focus backward within Drawer boundary
- Focus MUST NOT escape to page content behind Drawer
- Focus trap MUST be invisible to screen readers (no sentinel elements)

### 3. Focus-Visible Indication Behavior

- Interactive elements inside Drawer MUST show visible focus ring when focused via keyboard
- Focus ring MUST use `:focus-visible` pseudo-class only
- Focus ring MUST be visible in all color modes
- Drawer container (tabindex=-1) MUST NOT show focus ring

### 4. On Close: Focus Restore Behavior

- Focus MUST return to the trigger element that opened Drawer
- Focus restore MUST happen synchronously (immediately after close)
- If trigger no longer exists, focus SHOULD move to nearest logical target

### 5. Container Focus Rule (Critical for GAP-3)

- Drawer container MAY receive programmatic focus (tabindex=-1)
- Container MUST NOT become a "user-focus target" (not reachable via Tab)
- Container MUST NOT show focus ring when receiving programmatic focus
- Container focus is for accessibility (screen reader navigation) only

### Behavior Matrix

| Scenario | Expected Behavior | Authority Rule |
|---------|------------------|----------------|
| Drawer opens | Focus moves to first interactive element | F-TRAP-1 |
| Tab pressed | Focus cycles to next element inside Drawer | F-TRAP-1 |
| Shift+Tab pressed | Focus cycles to previous element inside Drawer | F-TRAP-1 |
| Tab on last element | Focus wraps to first element | F-TRAP-1 |
| Escape pressed | Drawer closes, focus restores to trigger | F-REST-1 |
| Close button clicked | Drawer closes, focus restores to trigger | F-REST-1 |
| Container receives programmatic focus | No focus ring visible | F-VIS-1 |
| Interactive element focused via keyboard | Focus ring visible | F-VIS-1 |
| Interactive element focused via pointer | No focus ring visible | F-VIS-1 |

---

## Changes Made

### File: `src/COMPOSITION/overlays/Drawer/drawer-variants.ts`

**Line:** 21  
**Change:** Added `outline-none` to base class string

**Before:**
```typescript
export const drawerVariants = cva(
  "fixed z-40 flex flex-col bg-background border border-border transform",
  {
```

**After:**
```typescript
export const drawerVariants = cva(
  "fixed z-40 flex flex-col bg-background border border-border transform outline-none",
  {
```

**Diff:**
```diff
- "fixed z-40 flex flex-col bg-background border border-border transform",
+ "fixed z-40 flex flex-col bg-background border border-border transform outline-none",
```

---

## Why This Change

### Problem
- Drawer container has `tabindex={-1}` for programmatic focus
- When container receives programmatic focus (e.g., when no interactive element exists), browser may show default focus outline
- This creates misleading visual indication (container is not user-focusable)

### Solution
- Add `outline-none` class to suppress default browser outline
- Container still receives programmatic focus (for accessibility)
- Container does not show visual focus ring (correct behavior)
- Interactive elements inside Drawer already have proper focus-visible styling via tokens

---

## Authority Compliance

**FOCUS_AUTHORITY Rules Satisfied:**

1. **F-VIS-1:** Focus rings use `:focus-visible` only
   - ✅ Container does not show focus ring (suppressed via outline-none)
   - ✅ Interactive elements use `:focus-visible` via tokens

2. **F-TRAP-1:** Modal overlays MUST trap focus
   - ✅ No change to focus trap behavior (already compliant)

3. **F-REST-1:** Modal overlays MUST restore focus on close
   - ✅ No change to focus restore behavior (already compliant)

4. **T-ORD-2:** Positive tabindex is forbidden
   - ✅ Container uses tabindex=-1 (correct, no change)

---

## Impact Analysis

### Visual Impact
- **Before:** Container may show browser default outline when receiving programmatic focus
- **After:** Container never shows focus outline (correct behavior)

### Behavioral Impact
- **None:** Focus trap, restore, and navigation behavior unchanged
- Container still receives programmatic focus when needed
- Interactive elements still show proper focus-visible styling

### API Impact
- **None:** No public API changes
- No prop changes
- No breaking changes

### Accessibility Impact
- **Positive:** Removes misleading visual focus indication
- Container focus still works for screen readers (programmatic focus)
- Interactive elements maintain proper keyboard focus indication

---

## Storybook Validation Steps

**Story:** `FocusTrapAndRestore` > `Drawer Focus`  
**File:** `src/COMPOSITION/focus/FocusTrapAndRestore.stories.tsx`

### Test Scenarios

**Scenario 1: Open Drawer via Keyboard**
1. Navigate to Storybook story "Drawer Focus"
2. Press Tab to focus the "Open Drawer" button
3. Verify button shows focus ring (focus-visible)
4. Press Enter or Space to open Drawer

**Expected Results:**
- ✅ Drawer opens
- ✅ First interactive element (Input field) receives focus
- ✅ Input field shows visible focus ring
- ✅ Drawer container does NOT show focus ring

**Scenario 2: Tab Navigation Through Drawer**
1. With Drawer open and Input focused
2. Press Tab multiple times (should wrap)

**Expected Results:**
- ✅ Focus cycles to all interactive elements, shows focus ring on each
- ✅ Focus wraps to first element after last
- ✅ Focus never leaves Drawer boundary (trap working)
- ✅ Drawer container never shows focus ring

**Scenario 3: Close Drawer and Focus Restore**
1. With Drawer open
2. Press Escape OR click "Close Drawer" button

**Expected Results:**
- ✅ Drawer closes
- ✅ Focus returns to "Open Drawer" trigger button
- ✅ Trigger button shows focus ring
- ✅ Focus restore is synchronous (immediate)

**Visual Verification Checklist:**

| Element | Keyboard Focus | Pointer Focus | Expected |
|---------|---------------|---------------|----------|
| Trigger Button | ✅ Visible | ❌ Not visible | ✅ Correct |
| Input Field | ✅ Visible | ❌ Not visible | ✅ Correct |
| Action Button | ✅ Visible | ❌ Not visible | ✅ Correct |
| Close Button | ✅ Visible | ❌ Not visible | ✅ Correct |
| Drawer Container | ❌ Not visible | ❌ Not visible | ✅ Correct |

---

## Testing Verification

### Manual Testing Steps
1. Open Drawer with interactive elements
   - ✅ First element receives focus
   - ✅ Focus ring visible on focused element
   - ✅ Container does NOT show focus ring

2. Open Drawer with no interactive elements
   - ✅ Container receives programmatic focus
   - ✅ Container does NOT show focus ring

3. Tab through Drawer
   - ✅ Focus cycles correctly
   - ✅ Focus ring visible on each focused element
   - ✅ Container never shows focus ring

4. Close Drawer
   - ✅ Focus restores to trigger
   - ✅ Focus ring visible on trigger

### Automated Testing

See [GAP3_verify.md](./GAP3_verify.md) for test execution results.

---

## Risk Assessment

**Risk Level:** LOW

**Mitigation:**
- Change is additive (adds class, doesn't remove)
- No behavior changes
- No API changes
- Reversible if needed (remove class)

**Rollback Plan:**
If issues arise, revert by removing `outline-none` from base class string.

---

## System Status

System status update and release notes: see [FOCUS_LOCK.v1.1.md](../../architecture/locks/FOCUS_LOCK.v1.1.md)

---

## Related Documents

- [FOCUS_AUTHORITY.md](../../architecture/FOCUS_AUTHORITY.md) - Authority rules
- [FOCUS_LOCK.v1.1.md](../../architecture/locks/FOCUS_LOCK.v1.1.md) - Lock document
- [GAP3_verify.md](./GAP3_verify.md) - Verification log

---

**Last Updated:** 2025-12-19

