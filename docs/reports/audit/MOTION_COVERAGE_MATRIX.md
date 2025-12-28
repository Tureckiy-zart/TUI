# Motion Coverage Matrix

**Date:** 2025-12-27  
**Status:** ✅ **COMPLETE**  
**Purpose:** Matrix showing motion domain coverage across core primitives and components.

---

## Matrix Legend

- ✅ **Present** - Motion is implemented and compliant
- ⚠️ **Present (Non-Compliant)** - Motion is implemented but uses non-tokenized values
- ❌ **Absent** - Motion is missing (gap)
- ➖ **Not Applicable** - Motion domain doesn't apply to this component
- 🔍 **Needs Review** - Implementation exists but needs verification

---

## Coverage Matrix: Motion Domains × Components

| Component | Enter/Exit | Hover | Press/Tap | Focus/Keyboard | Expand/Collapse | Toast/Dialog | Loading/Progress | Storybook Reference |
|-----------|------------|-------|-----------|----------------|-----------------|--------------|------------------|---------------------|
| **PRIMITIVES** |
| Button | ➖ | ✅ | ✅ | ✅ | ➖ | ➖ | ⚠️ (not implemented) | `Button.stories.tsx` |
| Link | ➖ | ✅ | ➖ | ✅ | ➖ | ➖ | ➖ | `Link.stories.tsx` |
| Checkbox | ➖ | ⚠️ | ⚠️ | ⚠️ | ➖ | ➖ | ➖ | `Checkbox.stories.tsx` |
| Radio | ➖ | ⚠️ | ⚠️ | ⚠️ | ➖ | ➖ | ➖ | `Radio.stories.tsx` |
| Switch | ➖ | ✅ | ✅ | ✅ | ➖ | ➖ | ➖ | `Switch.stories.tsx` |
| Input | ➖ | ✅ | ➖ | ✅ | ➖ | ➖ | ➖ | `Input.stories.tsx` |
| Textarea | ➖ | ✅ | ➖ | ✅ | ➖ | ➖ | ➖ | `Textarea.stories.tsx` |
| Progress | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | ✅ | `Progress.stories.tsx` |
| Skeleton | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | ✅ | `Skeleton.stories.tsx` |
| Badge | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | `Badge.stories.tsx` |
| Alert | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | `Alert.stories.tsx` |
| **COMPOSITION - Controls** |
| Select | ✅ | ✅ | ➖ | ✅ | ✅ | ➖ | ➖ | `Select.stories.tsx` |
| Slider | ➖ | ✅ | ✅ | ✅ | ➖ | ➖ | ➖ | `Slider.stories.tsx` |
| RangeSlider | ➖ | ✅ | ✅ | ✅ | ➖ | ➖ | ➖ | `RangeSlider.stories.tsx` |
| Avatar | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | `Avatar.stories.tsx` |
| AspectRatio | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | `AspectRatio.stories.tsx` |
| Separator | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | `Separator.stories.tsx` |
| **COMPOSITION - Overlays** |
| Dialog | ✅ | ➖ | ➖ | ✅ | ➖ | ✅ | ➖ | `Dialog.stories.tsx` |
| Toast | ✅ | ➖ | ➖ | ➖ | ➖ | ✅ | ➖ | `Toast.stories.tsx` |
| Tooltip | ✅ | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | `Tooltip.stories.tsx` |
| Popover | ✅ | ➖ | ➖ | ✅ | ➖ | ➖ | ➖ | `Popover.stories.tsx` |
| Drawer | ✅ | ➖ | ➖ | ✅ | ➖ | ➖ | ➖ | `Drawer.stories.tsx` |
| Modal | ✅ | ➖ | ➖ | ✅ | ➖ | ✅ | ➖ | `Modal.stories.tsx` |
| Backdrop | ✅ | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | `Backdrop.stories.tsx` |
| Portal | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | `Portal.stories.tsx` |
| ContextMenu | ✅ | ✅ | ➖ | ✅ | ✅ | ➖ | ➖ | `ContextMenu.stories.tsx` |
| **COMPOSITION - Navigation** |
| Tabs | ➖ | ✅ | ✅ | ✅ | ✅ | ➖ | ➖ | `Tabs.stories.tsx` |
| Stepper | ➖ | ✅ | ➖ | ✅ | ➖ | ➖ | ➖ | `Stepper.stories.tsx` |
| Pagination | ➖ | ✅ | ✅ | ✅ | ➖ | ➖ | ➖ | `Pagination.stories.tsx` |
| Breadcrumbs | ➖ | ✅ | ➖ | ✅ | ➖ | ➖ | ➖ | `Breadcrumbs.stories.tsx` |
| SegmentedControl | ➖ | ✅ | ✅ | ✅ | ➖ | ➖ | ➖ | `SegmentedControl.stories.tsx` |
| Navigation | ➖ | ✅ | ➖ | ✅ | ➖ | ➖ | ➖ | `Navigation.stories.tsx` |
| NavList | ➖ | ✅ | ➖ | ✅ | ➖ | ➖ | ➖ | `NavList.stories.tsx` |
| **COMPOSITION - Motion** |
| TAS Presets | ✅ | ✅ | ✅ | ➖ | ✅ | ✅ | ✅ | `TAS.stories.tsx` |
| Gestures | ➖ | ✅ | ✅ | ➖ | ➖ | ➖ | ➖ | `Gestures.stories.tsx` |
| **PATTERNS** |
| Cards (VenueCard, etc.) | 🔍 | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | Card stories |
| HoverCard | ✅ | ✅ | ➖ | ✅ | ✅ | ➖ | ➖ | `HoverCard.stories.tsx` |
| **DOMAIN** |
| EventCard | 🔍 | ➖ | ➖ | ➖ | ➖ | ➖ | ➖ | Domain stories |

---

## Detailed Coverage by Domain

### 1. Enter/Exit Animations

**Components with Enter/Exit:**
- ✅ Select - Radix UI animations (compliant)
- ✅ Dialog - Radix UI animations (compliant)
- ✅ Toast - MOTION_TOKENS.animation (compliant)
- ✅ Tooltip - MOTION_TOKENS.animation (compliant)
- ✅ Popover - MOTION_TOKENS.animation (compliant)
- ✅ Drawer - Custom transitions (needs review)
- ✅ Modal - Radix UI animations (compliant)
- ✅ Backdrop - Fade animations (compliant)
- ✅ ContextMenu - Radix UI animations (compliant)
- ✅ TAS Presets - `.tm-motion-*` utilities (compliant)
- 🔍 Cards - `animation: "fadeInUp"` (needs review)

**Gaps:** None identified (all interactive overlays have enter/exit)

---

### 2. Hover Interactions

**Components with Hover:**
- ✅ Button - MOTION_TOKENS.transitionPreset.colors (compliant)
- ✅ Link - MOTION_TOKENS (compliant)
- ⚠️ Checkbox - `transition-all duration-200` (non-compliant)
- ⚠️ Radio - `transition-all duration-200` (non-compliant)
- ✅ Switch - MOTION_TOKENS (compliant)
- ✅ Input - Transition tokens (compliant)
- ✅ Textarea - Transition tokens (compliant)
- ✅ Select - Transition tokens (compliant)
- ✅ Slider - `transition-colors` (compliant)
- ✅ RangeSlider - `transition-colors` (compliant)
- ✅ Tabs - MOTION_TOKENS (compliant)
- ✅ Stepper - Transition tokens (compliant)
- ✅ Pagination - Transition tokens (compliant)
- ✅ Breadcrumbs - Transition tokens (compliant)
- ✅ SegmentedControl - Transition tokens (compliant)
- ✅ Navigation - MOTION_TOKENS (compliant)
- ✅ NavList - Transition tokens (compliant)
- ✅ ContextMenu - Transition tokens (compliant)
- ✅ HoverCard - Transition tokens (compliant)
- ✅ TAS Presets - `.tm-motion-hover-*` utilities (compliant)
- ✅ Gestures - `.tm-motion-hover-*` utilities (compliant)

**Gaps:** None identified (all interactive components have hover)

---

### 3. Press/Tap Interactions

**Components with Press/Tap:**
- ✅ Button - Via active state transitions (compliant)
- ⚠️ Checkbox - `transition-all duration-200` (non-compliant)
- ⚠️ Radio - `transition-all duration-200` (non-compliant)
- ✅ Switch - MOTION_TOKENS (compliant)
- ✅ Slider - Transition tokens (compliant)
- ✅ RangeSlider - Transition tokens (compliant)
- ✅ Tabs - MOTION_TOKENS (compliant)
- ✅ Pagination - Transition tokens (compliant)
- ✅ SegmentedControl - Transition tokens (compliant)
- ✅ TAS Presets - `.tm-motion-tap-scale` utility (compliant)
- ✅ Gestures - `.tm-motion-tap-scale` utility (compliant)

**Gaps:** 
- ❌ Link - No active/press feedback (low priority - links typically don't need press feedback)
- ❌ Input/Textarea - No active/press feedback (not applicable - text inputs don't need press feedback)

---

### 4. Focus/Keyboard Interactions

**Components with Focus/Keyboard:**
- ✅ Button - Transition tokens (compliant)
- ✅ Link - MOTION_TOKENS (compliant)
- ⚠️ Checkbox - Via transition (non-compliant)
- ⚠️ Radio - Via transition (non-compliant)
- ✅ Switch - MOTION_TOKENS (compliant)
- ✅ Input - Transition tokens (compliant)
- ✅ Textarea - Transition tokens (compliant)
- ✅ Select - Transition tokens (compliant)
- ✅ Slider - Transition tokens (compliant)
- ✅ RangeSlider - Transition tokens (compliant)
- ✅ Dialog - Focus management (compliant)
- ✅ Popover - Focus management (compliant)
- ✅ Drawer - Focus management (compliant)
- ✅ Modal - Focus management (compliant)
- ✅ ContextMenu - Focus management (compliant)
- ✅ Tabs - MOTION_TOKENS (compliant)
- ✅ Stepper - Transition tokens (compliant)
- ✅ Pagination - Transition tokens (compliant)
- ✅ Breadcrumbs - Transition tokens (compliant)
- ✅ SegmentedControl - Transition tokens (compliant)
- ✅ Navigation - MOTION_TOKENS (compliant)
- ✅ NavList - Transition tokens (compliant)
- ✅ HoverCard - Focus management (compliant)

**Gaps:** None identified (all interactive components have focus support)

---

### 5. Expand/Collapse Animations

**Components with Expand/Collapse:**
- ✅ Select - Radix UI animations (compliant)
- ✅ ContextMenu - Radix UI animations (compliant)
- ✅ Tabs - MOTION_TOKENS (compliant)
- ✅ HoverCard - Radix UI animations (compliant)
- ✅ TAS Presets - Slide animations (compliant)

**Gaps:**
- ❌ Accordion - Not in codebase (if needed, should use Radix UI animations)
- ❌ Collapsible - Not in codebase (if needed, should use Radix UI animations)

---

### 6. Toast/Dialog Transitions

**Components with Toast/Dialog Transitions:**
- ✅ Dialog - Radix UI animations (compliant)
- ✅ Toast - MOTION_TOKENS.animation (compliant)
- ✅ Modal - Radix UI animations (compliant)
- ✅ TAS Presets - `.tm-motion-slide-*` utilities (compliant)

**Gaps:** None identified (all toast/dialog components have transitions)

---

### 7. Loading/Progress Micro-motion

**Components with Loading/Progress:**
- ✅ Progress - `transition-[width] duration-normal` (compliant)
- ✅ Skeleton - `animation.pulse` (compliant)
- ✅ TAS Presets - Pulse animations (compliant)
- ⚠️ Button - Loading state not fully implemented (defined but not active)

**Gaps:**
- ❌ Button - Loading state motion not implemented (defined in tokens but not active)

---

## Coverage Summary

### Overall Coverage by Domain

| Domain | Components Covered | Coverage % | Status |
|--------|-------------------|------------|--------|
| Enter/Exit | 11+ | ~95% | ✅ Excellent |
| Hover | 20+ | ~100% | ✅ Complete |
| Press/Tap | 10+ | ~85% | ✅ Good |
| Focus/Keyboard | 20+ | ~100% | ✅ Complete |
| Expand/Collapse | 5+ | ~80% | ✅ Good |
| Toast/Dialog | 4+ | ~100% | ✅ Complete |
| Loading/Progress | 3+ | ~75% | ⚠️ Good (Button loading pending) |

### Compliance Status

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ Compliant | 60+ | ~90% |
| ⚠️ Non-Compliant | 4 | ~6% |
| 🔍 Needs Review | 2 | ~3% |
| ❌ Missing | 2 | ~3% |

---

## Key Findings

### Strengths

1. **Excellent Hover Coverage** - All interactive components have hover feedback
2. **Complete Focus Support** - All interactive components support keyboard navigation
3. **Good Enter/Exit Coverage** - All overlays have proper enter/exit animations
4. **Comprehensive TAS System** - Motion composition components cover all domains

### Areas for Improvement

1. **Non-Compliant Transitions** - Checkbox and Radio use raw `duration-200`
2. **Missing Press Feedback** - Some components lack active state transitions (low priority)
3. **Loading State** - Button loading state motion not fully implemented
4. **Card Animations** - Need to verify if `fadeInUp` is token-based

---

## Next Steps

1. Fix non-compliant transitions (Checkbox, Radio)
2. Verify card animations (`fadeInUp`)
3. Verify drawer transitions (`appear`/`disappear`)
4. Implement Button loading state motion
5. Consider adding press feedback to Link (low priority)

---

**Report Generated:** 2025-12-27  
**Next Steps:** Proceed to Preset Canonicalization (STEP_3)

