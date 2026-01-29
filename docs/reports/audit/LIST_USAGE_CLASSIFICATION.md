# List Usage Classification Report

**Date:** 2026-01-01  
**Task:** TUNG_LIST_STRICT_USAGE_ENFORCEMENT  
**Purpose:** Classify all findings from LIST_USAGE_INVENTORY.md to determine which must be migrated to canonical List/ListItem components.

## Classification Categories

- **A) MUST migrate** — Vertical list that should use List/ListItem
- **B) Single-item layout** — Single element layout (allowed, not a list)
- **C) Table/Grid** — Table or grid pattern (out of scope)
- **D) Exception** — Specialized pattern that is intentionally different (Timeline, DataList, NavList, Combobox)

## Classification Results

### 1. NotificationCenterList

**File:** `src/DOMAIN/notifications/NotificationCenter.List.tsx`  
**Finding ID:** #1  
**Classification:** **A) MUST migrate**  
**Priority:** High

**Justification:**
- This is a vertical list container that renders multiple notification items
- Currently uses `Stack` with `as="ul"` and `role="list"`
- Should use canonical `List` component which provides the same functionality with proper semantic structure
- No specialized behavior that would prevent migration

**Migration Notes:**
- Replace `Stack` with `List`
- Use `List` props: `as="ul"`, `gap` (mapped from current spacing token)
- Maintain all existing props and behavior
- No visual changes expected

---

### 2. NotificationCenterItem

**File:** `src/DOMAIN/notifications/NotificationCenter.Item.tsx`  
**Finding ID:** #2  
**Classification:** **A) MUST migrate**  
**Priority:** High

**Justification:**
- This is a list item component that renders individual notification items
- Currently uses direct `<li>` element with custom styling
- Should use canonical `ListItem` component which provides proper semantic structure and interactive states
- The component has interactive behavior (onClick, hover) which matches `ListItem`'s `interactive` prop

**Migration Notes:**
- Replace `<li>` with `ListItem`
- Use `ListItem` props: `as="li"`, `interactive={!!onClick}`
- Migrate custom styling to use `ListItem` variants where possible
- Maintain all existing props, ARIA attributes, and behavior
- Ensure visual parity after migration

---

### 3. FileUpload File List

**File:** `src/COMPOSITION/overlays/FileUpload/FileUpload.tsx`  
**Finding ID:** #3  
**Classification:** **A) MUST migrate**  
**Priority:** Medium

**Justification:**
- This is a vertical list of file preview items
- Currently uses `div` with `role="list"` and `role="listitem"`
- Should use canonical `List` and `ListItem` components for proper semantic structure
- The list is rendered conditionally when files are present

**Migration Notes:**
- Replace outer `div` with `List`
- Replace inner `div` wrappers with `ListItem`
- Use `List` props: `as="div"`, `gap="sm"` (mapped from `space-y-sm`)
- Maintain `aria-live="polite"` on List
- Keep `FilePreviewItem` as child of `ListItem`
- No visual changes expected

---

### 4. ComboboxList Options

**File:** `src/COMPOSITION/overlays/Combobox/Combobox.tsx`  
**Finding ID:** #4  
**Classification:** **D) Exception**  
**Priority:** N/A

**Justification:**
- This uses ARIA pattern `role="listbox"` and `role="option"` which is specific to combobox dropdowns
- Combobox dropdowns have specialized keyboard navigation and selection behavior
- The pattern follows WAI-ARIA combobox specification which requires `listbox`/`option` roles
- This is not a general-purpose vertical list, but a specialized interactive control
- Migrating to `List`/`ListItem` would break ARIA semantics required for combobox accessibility

**Decision:** Keep as-is. This is a specialized pattern that intentionally differs from general lists.

---

## Summary

| Finding | Component | Classification | Priority | Action Required |
|---------|-----------|----------------|----------|-----------------|
| #1 | NotificationCenterList | A) MUST migrate | High | Replace Stack with List |
| #2 | NotificationCenterItem | A) MUST migrate | High | Replace <li> with ListItem |
| #3 | FileUpload file list | A) MUST migrate | Medium | Replace div with List/ListItem |
| #4 | ComboboxList options | D) Exception | N/A | Keep as-is |

**Total Class A (MUST migrate):** 3  
**Total Class D (Exception):** 1

---

## Migration Priority Order

1. **NotificationCenterList + NotificationCenterItem** (High priority)
   - These are used together and should be migrated together
   - Core notification functionality
   - High visibility component

2. **FileUpload file list** (Medium priority)
   - Less frequently used component
   - Can be migrated independently

---

## Migration Acceptance Criteria

For each Class A migration:

- ✅ No functional changes
- ✅ No visual regressions
- ✅ All existing props and behavior preserved
- ✅ ARIA attributes maintained or improved
- ✅ Tests pass without modification (or updated appropriately)
- ✅ Storybook stories demonstrate correct usage

---

## Next Steps

1. **STEP 3:** Refactor all Class A findings:
   - NotificationCenterList → List
   - NotificationCenterItem → ListItem
   - FileUpload file list → List + ListItem

2. **STEP 4:** Establish guardrails to prevent future violations

3. **STEP 5:** Final verification

