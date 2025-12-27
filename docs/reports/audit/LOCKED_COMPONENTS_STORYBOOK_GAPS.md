# LOCKED Components Storybook Motion Gaps

**Date:** 2025-12-27  
**Purpose:** Verify motion visibility and testability in Storybook stories

---

## Storybook Coverage Assessment

### Components with ENTER_EXIT Motion

| Component | Issue | Current State | Recommendation |
|-----------|-------|---------------|----------------|
| Modal | ✅ OK | Default story shows open/close with conditional rendering (enter/exit animation visible) | None |
| Popover | ✅ OK | Default story shows open/close with trigger interaction (enter/exit animation visible) | None |
| Tooltip | ✅ OK | Default story shows hover interaction (enter/exit animation visible) | None |
| Toast | ✅ OK | Controlled story shows open/close with state management (enter/exit animation visible) | None |

### Components with INTERACTIVE Motion

| Component | Issue | Current State | Recommendation |
|-----------|-------|---------------|----------------|
| Button | ✅ OK | States story demonstrates hover/focus transitions | None |
| Link | ✅ OK | Default story demonstrates hover/focus transitions | None |
| Input | ✅ OK | States story demonstrates focus transitions | None |
| Select | ✅ OK | States story demonstrates dropdown transitions | None |
| Radio | ✅ OK | States story demonstrates hover/focus transitions | None |
| Switch | ✅ OK | States story demonstrates toggle animation | None |
| Textarea | ✅ OK | States story demonstrates focus transitions | None |
| Checkbox | ✅ OK | States story demonstrates hover/focus transitions | None |
| Badge | ✅ OK | Default story demonstrates hover transitions | None |
| RangeSlider | ✅ OK | States story demonstrates interactive transitions | None |
| Slider | ✅ OK | States story demonstrates interactive transitions | None |
| List | ✅ OK | Default story demonstrates hover transitions | None |
| Progress | ✅ OK | Default story demonstrates width transition | None |
| Table | ✅ OK | States story demonstrates expandable transition and sort icon rotation | None |
| Stepper | ✅ OK | States story demonstrates active state transitions | None |
| Pagination | ✅ OK | States story demonstrates hover/focus transitions | None |
| SegmentedControl | ✅ OK | States story demonstrates hover/focus transitions | None |
| Tabs | ✅ OK | Default story demonstrates indicator transition | None |
| CardBase | ✅ OK | Default story demonstrates hover transitions | None |

### Components with COMPOSITE Motion

| Component | Issue | Current State | Recommendation |
|-----------|-------|---------------|----------------|
| Toast | ✅ OK | Controlled story shows both enter/exit animations and interactive transitions | None |
| Modal | ✅ OK | Default story shows both enter/exit animations and interactive transitions | None |

---

## Summary

### Coverage Status

- **Components with motion:** 23 components
- **Stories demonstrating motion:** 23 components (100%)
- **Coverage gaps:** 0 components

### Story Types Used

- **Default story:** Demonstrates basic motion (hover, focus, enter/exit)
- **States story:** Demonstrates interactive transitions (hover, focus, active, disabled)
- **Controlled story:** Demonstrates enter/exit animations with state management (Toast)
- **Matrix story:** Demonstrates motion across variants/sizes (Button, Tabs)

---

## Key Findings

1. **All components with motion have appropriate Storybook coverage**
2. **Enter/exit animations** are visible in Default/Controlled stories through user interaction
3. **Interactive transitions** are visible in States stories or Default stories
4. **No gaps detected** - all motion is testable and visible in Storybook

---

## Recommendations

**No action required** - All LOCKED components with motion have adequate Storybook coverage demonstrating their motion behavior.

### Best Practices Observed

1. ✅ **Enter/exit animations** demonstrated through controlled state (Modal, Toast)
2. ✅ **Interactive transitions** demonstrated through States stories (Button, Input, etc.)
3. ✅ **Hover/focus transitions** visible in Default stories (Link, Badge, etc.)
4. ✅ **Complex motion** demonstrated through multiple story types (Toast, Modal)

---

## Notes

- Motion visibility in Storybook depends on user interaction (hover, click, focus)
- Enter/exit animations require component state changes (open/close, mount/unmount)
- Interactive transitions are visible immediately on hover/focus in Storybook
- All motion follows Motion Authority guidelines and uses appropriate tokens

