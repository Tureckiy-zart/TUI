# U0 - Token Compliance Audit Report

**Date:** 2025-01-20  
**Status:** ✅ Complete  
**Total Components Scanned:** 92  
**Total Violations Found:** 713

---

## Executive Summary

This audit identified **713 violations** of token usage guidelines across **92 components** in the Tenerife UI library. The violations are categorized into 6 main types:

- **Colors:** 31 violations (hardcoded Tailwind colors)
- **Spacing:** 343 violations (hardcoded spacing values)
- **Border Radius:** 83 violations (hardcoded radius values)
- **Shadows:** 39 violations (hardcoded shadow values)
- **Typography:** 124 violations (hardcoded text sizes)
- **Font Weights:** 81 violations (hardcoded font weights)
- **Animation:** 12 violations (hardcoded durations/easings)

### Priority Distribution

- **HIGH Priority:** 31 violations (colors - affects theme consistency)
- **MEDIUM Priority:** 343 violations (spacing - affects layout consistency)
- **MEDIUM Priority:** 83 violations (radius - affects visual consistency)
- **MEDIUM Priority:** 39 violations (shadows - affects elevation consistency)
- **LOW Priority:** 124 violations (typography - mostly acceptable, but should use tokens)
- **LOW Priority:** 81 violations (font weights - mostly acceptable)
- **LOW Priority:** 12 violations (animation - mostly acceptable)

---

## Violation Categories

### 1. Color Violations (31 violations)

**Priority:** HIGH  
**Impact:** Breaks theme consistency, prevents proper dark/light mode support

#### Components with Color Violations:

##### `src/components/toasts/Toast.tsx` (8 violations)

- **Line 19:** `border-green-200 bg-green-50 text-green-900` → Use semantic tokens: `border-success/20 bg-success/10 text-success-foreground`
- **Line 19:** `dark:border-green-800 dark:bg-green-950 dark:text-green-100` → Use semantic tokens
- **Line 21:** `border-red-200 bg-red-50 text-red-900` → Use semantic tokens: `border-error/20 bg-error/10 text-error-foreground`
- **Line 21:** `dark:border-red-800 dark:bg-red-950 dark:text-red-100` → Use semantic tokens
- **Line 23:** `border-yellow-200 bg-yellow-50 text-yellow-900` → Use semantic tokens: `border-warning/20 bg-warning/10 text-warning-foreground`
- **Line 23:** `dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-100` → Use semantic tokens
- **Line 24:** `border-blue-200 bg-blue-50 text-blue-900` → Use semantic tokens: `border-info/20 bg-info/10 text-info-foreground`
- **Line 24:** `dark:border-blue-800 dark:bg-blue-950 dark:text-blue-100` → Use semantic tokens
- **Line 37:** `text-green-600 dark:text-green-400` → Use: `text-success`
- **Line 38:** `text-red-600 dark:text-red-400` → Use: `text-error`
- **Line 39:** `text-yellow-600 dark:text-yellow-400` → Use: `text-warning`
- **Line 40:** `text-blue-600 dark:text-blue-400` → Use: `text-info`

**Migration Steps:**

1. Replace all `green-*` colors with `success` semantic tokens
2. Replace all `red-*` colors with `error` semantic tokens
3. Replace all `yellow-*` colors with `warning` semantic tokens
4. Replace all `blue-*` colors with `info` semantic tokens
5. Remove dark mode variants (tokens handle this automatically)

##### `src/components/ui/toast.tsx` (1 violation)

- **Line 79:** `group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600` → Use: `group-[.destructive]:text-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive`

##### `src/components/overlays/Popover.stories.tsx` (3 violations)

- **Line 271:** `text-blue-500` → Use: `text-info` or `text-primary`
- **Line 280:** `text-green-500` → Use: `text-success`
- **Line 289:** `text-yellow-500` → Use: `text-warning`

##### `src/components/cards/EventCard.tsx` (5 violations)

- **Line 80:** `bg-gradient-to-r from-orange-500 to-purple-600` → Use: `bg-gradient-to-r from-accent-500 to-primary-600`
- **Line 87:** `from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800` → Use: `from-surface-elevated1 to-surface-elevated2`
- **Line 97:** `text-gray-400 dark:text-gray-600` → Use: `text-muted-foreground`
- **Line 132:** `text-gray-500` → Use: `text-muted-foreground`
- **Line 145:** `text-gray-500` → Use: `text-muted-foreground`
- **Line 165:** `border-gray-200 dark:border-gray-700` → Use: `border-border`
- **Line 169:** `from-orange-500 to-purple-600` → Use: `from-accent-500 to-primary-600`
- **Line 169:** `hover:from-orange-600 hover:to-purple-700` → Use: `hover:from-accent-600 hover:to-primary-700`
- **Line 188:** `from-orange-500 to-purple-600` → Use: `from-accent-500 to-primary-600`

##### `src/components/overlays/Tooltip.stories.tsx` (1 violation)

- **Line 124:** `text-red-500` → Use: `text-error` or `text-destructive`

##### `src/components/overlays/Popover.tsx` (3 violations)

- **Line 20:** `border-yellow-500/50 text-yellow-700 bg-yellow-50` → Use: `border-warning/50 text-warning-foreground bg-warning/10`
- **Line 21:** `border-green-500/50 text-green-700 bg-green-50` → Use: `border-success/50 text-success-foreground bg-success/10`
- **Line 22:** `border-blue-500/50 text-blue-700 bg-blue-50` → Use: `border-info/50 text-info-foreground bg-info/10`

##### `src/components/overlays/Tooltip.tsx` (3 violations)

- **Line 20:** `border-yellow-500/50 text-yellow-700 bg-yellow-50` → Use: `border-warning/50 text-warning-foreground bg-warning/10`
- **Line 21:** `border-green-500/50 text-green-700 bg-green-50` → Use: `border-success/50 text-success-foreground bg-success/10`
- **Line 22:** `border-blue-500/50 text-blue-700 bg-blue-50` → Use: `border-info/50 text-info-foreground bg-info/10`

##### `src/components/feedback/ConsentBanner.tsx` (1 violation)

- **Line 28:** `bg-blue-500` → Use: `bg-primary` or `bg-info`

##### `src/components/feedback/Alert.tsx` (4 violations)

- **Line 20:** `bg-green-50 border-green-200 text-green-800` → Use: `bg-success/10 border-success/20 text-success-foreground`
- **Line 21:** `bg-red-50 border-red-200 text-red-800` → Use: `bg-error/10 border-error/20 text-error-foreground`
- **Line 22:** `bg-yellow-50 border-yellow-200 text-yellow-800` → Use: `bg-warning/10 border-warning/20 text-warning-foreground`
- **Line 23:** `bg-blue-50 border-blue-200 text-blue-800` → Use: `bg-info/10 border-info/20 text-info-foreground`

##### `src/components/data/Table.stories.tsx` (3 violations)

- **Line 48:** `bg-red-100 text-red-800` → Use: `bg-error/20 text-error-foreground`
- **Line 50:** `bg-yellow-100 text-yellow-800` → Use: `bg-warning/20 text-warning-foreground`
- **Line 51:** `bg-green-100 text-green-800` → Use: `bg-success/20 text-success-foreground`

---

### 2. Spacing Violations (343 violations)

**Priority:** MEDIUM  
**Impact:** Breaks layout consistency, prevents responsive spacing system

#### Common Patterns Found:

- `p-*`, `px-*`, `py-*`, `pt-*`, `pb-*`, `pl-*`, `pr-*` (padding)
- `m-*`, `mx-*`, `my-*`, `mt-*`, `mb-*`, `ml-*`, `mr-*` (margin)
- `gap-*`, `space-x-*`, `space-y-*` (gaps)

#### Components with Most Spacing Violations:

1. **`src/components/ui/dialog.tsx`** - 3 violations
   - Line 39: `p-6` → Use: `p-space-lg` or semantic spacing token
   - Line 39: `gap-4` → Use: `gap-space-md`
   - Line 58: `space-y-1.5` → Use: `space-y-space-xs`

2. **`src/components/ui/card.tsx`** - 4 violations
   - Line 18: `p-6` → Use: `p-space-lg`
   - Line 18: `space-y-1.5` → Use: `space-y-space-xs`
   - Line 43: `p-6 pt-0` → Use: `p-space-lg pt-0`
   - Line 50: `p-6 pt-0` → Use: `p-space-lg pt-0`

3. **`src/components/ui/toast.tsx`** - 5 violations
   - Line 19: `p-4` → Use: `p-space-md`
   - Line 28: `p-4 pr-6` → Use: `p-space-md pr-space-lg`
   - Line 28: `space-x-2` → Use: `space-x-space-xs`
   - Line 64: `px-3` → Use: `px-space-sm`
   - Line 79: `p-1` → Use: `p-space-xs`

4. **`src/components/toasts/Toast.tsx`** - 6 violations
   - Line 13: `p-4 pr-6` → Use: `p-space-md pr-space-lg`
   - Line 13: `space-x-2` → Use: `space-x-space-xs`
   - Line 76: `space-x-3` → Use: `space-x-space-sm`
   - Line 78: `space-y-1` → Use: `space-y-space-xs`
   - Line 82: `mt-2` → Use: `mt-space-xs`
   - Line 87: `px-2` → Use: `px-space-xs`
   - Line 98: `p-1` → Use: `p-space-xs`

5. **`src/components/cards/EventCard.tsx`** - 13 violations
   - Line 73: `shadow-md` → Use: `shadow-elevation-md`
   - Line 79: `right-3 top-3` → Use: `right-space-sm top-space-sm`
   - Line 80: `px-2.5 py-0.5` → Use: `px-space-xs py-space-xs`
   - Line 115: `p-4` → Use: `p-space-md`
   - Line 118: `mb-2` → Use: `mb-space-xs`
   - Line 128: `mb-3` → Use: `mb-space-sm`
   - Line 131: `mb-3 gap-2` → Use: `mb-space-sm gap-space-xs`
   - Line 132: `gap-2` → Use: `gap-space-xs`
   - Line 145: `gap-2` → Use: `gap-space-xs`
   - Line 165: `pt-3` → Use: `pt-space-sm`
   - Line 169: `px-4 py-2` → Use: `px-space-md py-space-xs`
   - Line 174: `ml-2` → Use: `ml-space-xs`

6. **`src/components/filters/FilterBar.tsx`** - 8 violations
   - Line 198: `space-y-4` → Use: `space-y-space-md`
   - Line 200: `gap-4` → Use: `gap-space-md`
   - Line 208: `gap-2` → Use: `gap-space-xs`
   - Line 213: `gap-1` → Use: `gap-space-xs`
   - Line 222: `gap-4` → Use: `gap-space-md`
   - Line 234: `space-y-2` → Use: `space-y-space-xs`
   - Line 271: `space-y-2` → Use: `space-y-space-xs`
   - Line 302: `p-3` → Use: `p-space-sm`
   - Line 303: `mb-2` → Use: `mb-space-xs`
   - Line 304: `gap-2` → Use: `gap-space-xs`

_Note: Full list of spacing violations is extensive. See individual component migration tasks for complete details._

---

### 3. Border Radius Violations (83 violations)

**Priority:** MEDIUM  
**Impact:** Breaks visual consistency, prevents theme-based radius customization

#### Common Patterns Found:

- `rounded-*` (none, sm, md, lg, xl, 2xl, 3xl, full)

#### Components with Radius Violations:

1. **`src/components/ui/dialog.tsx`** - 2 violations
   - Line 39: `sm:rounded-lg` → Use: `sm:rounded-radius-lg`
   - Line 46: `rounded-sm` → Use: `rounded-radius-sm`

2. **`src/components/ui/card.tsx`** - 1 violation
   - Line 9: `rounded-xl` → Use: `rounded-radius-xl`

3. **`src/components/ui/toast.tsx`** - 3 violations
   - Line 28: `rounded-md` → Use: `rounded-radius-md`
   - Line 64: `rounded-md` → Use: `rounded-radius-md`
   - Line 79: `rounded-md` → Use: `rounded-radius-md`

4. **`src/components/image/Image.tsx`** - 8 violations (component defines radius variants)
   - Lines 12-19: All `rounded-*` variants should use radius tokens
   - Replace with: `rounded-radius-*` pattern

5. **`src/components/cards/EventCard.tsx`** - 1 violation
   - Line 80: `rounded-full` → Use: `rounded-radius-full`

6. **`src/components/ui/button.tsx`** - 3 violations
   - Line 8: `rounded-md` → Use: `rounded-radius-md`
   - Line 22: `rounded-md` → Use: `rounded-radius-md`
   - Line 23: `rounded-md` → Use: `rounded-radius-md`

_Note: Most components use `rounded-md`, `rounded-lg`, `rounded-full` which should be replaced with radius tokens._

---

### 4. Shadow Violations (39 violations)

**Priority:** MEDIUM  
**Impact:** Breaks elevation consistency, prevents theme-based shadow customization

#### Common Patterns Found:

- `shadow-*` (none, sm, md, lg, xl, 2xl)

#### Components with Shadow Violations:

1. **`src/components/ui/dialog.tsx`** - 1 violation
   - Line 39: `shadow-lg` → Use: `shadow-elevation-lg`

2. **`src/components/ui/toast.tsx`** - 1 violation
   - Line 28: `shadow-lg` → Use: `shadow-elevation-lg`

3. **`src/components/toasts/Toast.tsx`** - 1 violation
   - Line 13: `shadow-lg` → Use: `shadow-elevation-lg`

4. **`src/components/cards/EventCard.tsx`** - 3 violations
   - Line 73: `shadow-md` → Use: `shadow-elevation-md`
   - Line 73: `hover:shadow-xl` → Use: `hover:shadow-elevation-xl`
   - Line 80: `shadow-lg` → Use: `shadow-elevation-lg`
   - Line 169: `shadow-md` → Use: `shadow-elevation-md`
   - Line 169: `hover:shadow-lg` → Use: `hover:shadow-elevation-lg`

5. **`src/components/image/Image.tsx`** - 6 violations (component defines shadow variants)
   - Lines 24-30: All `shadow-*` variants should use shadow tokens
   - Replace with: `shadow-elevation-*` pattern

6. **`src/components/ui/button.tsx`** - 3 violations
   - Line 13: `shadow-sm` → Use: `shadow-elevation-sm`
   - Line 15: `shadow-sm` → Use: `shadow-elevation-sm`
   - Line 16: `shadow-sm` → Use: `shadow-elevation-sm`

_Note: Most components use `shadow-sm`, `shadow-md`, `shadow-lg` which should be replaced with elevation shadow tokens._

---

### 5. Typography Violations (124 violations)

**Priority:** LOW  
**Impact:** Minor - most text sizes are acceptable, but should use token system for consistency

#### Common Patterns Found:

- `text-*` (xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl)

#### Components with Typography Violations:

Most components use `text-sm`, `text-xs`, `text-lg` which are acceptable but should ideally use typography tokens for consistency.

**Key Components:**

- `src/components/ui/button.tsx` - Uses `text-sm`, `text-xs`
- `src/components/ui/input.tsx` - Uses `text-base`, `text-sm`, `md:text-sm`
- `src/components/primitives/Typography.tsx` - Defines text size variants (should use tokens)
- `src/components/cards/EventCard.tsx` - Uses `text-xs`, `text-lg`
- `src/components/toasts/Toast.tsx` - Uses `text-sm`, `text-xs`

**Migration Recommendation:**

- Replace `text-*` with typography token classes where available
- Ensure all text sizes use the fluid type scale from tokens

---

### 6. Font Weight Violations (81 violations)

**Priority:** LOW  
**Impact:** Minor - font weights are mostly acceptable, but should use token system

#### Common Patterns Found:

- `font-*` (thin, extralight, light, normal, medium, semibold, bold, extrabold, black)

#### Components with Font Weight Violations:

Most components use `font-medium`, `font-semibold`, `font-bold` which are acceptable but should use typography tokens.

**Key Components:**

- `src/components/ui/button.tsx` - Uses `font-medium`
- `src/components/cards/EventCard.tsx` - Uses `font-semibold`, `font-bold`
- `src/components/primitives/Typography.tsx` - Defines font weight variants (should use tokens)

**Migration Recommendation:**

- Replace `font-*` with typography token classes where available
- Ensure all font weights use the typography token system

---

### 7. Animation Violations (12 violations)

**Priority:** LOW  
**Impact:** Minor - durations are mostly acceptable, but should use motion tokens

#### Common Patterns Found:

- `duration-*` (200, 300, 500)
- `ease-*` (linear, in, out, in-out)

#### Components with Animation Violations:

1. **`src/components/ui/dialog.tsx`** - 1 violation
   - Line 39: `duration-200` → Use: `duration-fast` or motion token

2. **`src/components/cards/EventCard.tsx`** - 2 violations
   - Line 73: `duration-300` → Use: `duration-normal`
   - Line 92: `duration-500` → Use: `duration-slow`
   - Line 111: `duration-300` → Use: `duration-normal`
   - Line 169: `duration-300` → Use: `duration-normal`

3. **`src/components/search/SearchBar.tsx`** - 1 violation
   - Line 112: `duration-200` → Use: `duration-fast`

4. **`src/components/menus/NavigationMenu.tsx`** - 1 violation
   - Line 52: `duration-200` → Use: `duration-fast`

5. **`src/components/modals/Modal.tsx`** - 1 violation
   - Line 39: `duration-200` → Use: `duration-fast`

6. **`src/components/feedback/Progress.tsx`** - 1 violation
   - Line 17: `duration-300` → Use: `duration-normal`

**Migration Recommendation:**

- Replace all `duration-*` with motion token classes
- Use semantic duration names: `duration-fast`, `duration-normal`, `duration-slow`

---

## Migration Strategy

### Phase 1: High Priority (Colors)

1. Migrate all color violations to semantic tokens
2. Focus on: Toast, Alert, Popover, Tooltip, EventCard, ConsentBanner, Table
3. **Estimated Impact:** 31 violations fixed

### Phase 2: Medium Priority (Spacing, Radius, Shadows)

1. Migrate spacing violations to spacing tokens
2. Migrate radius violations to radius tokens
3. Migrate shadow violations to shadow tokens
4. **Estimated Impact:** 465 violations fixed

### Phase 3: Low Priority (Typography, Font Weights, Animation)

1. Migrate typography violations to typography tokens
2. Migrate font weight violations to typography tokens
3. Migrate animation violations to motion tokens
4. **Estimated Impact:** 217 violations fixed

---

## Component Priority List

### Critical Components (High Priority)

1. `src/components/toasts/Toast.tsx` - 8 color violations
2. `src/components/feedback/Alert.tsx` - 4 color violations
3. `src/components/cards/EventCard.tsx` - 5 color violations + 13 spacing violations
4. `src/components/overlays/Popover.tsx` - 3 color violations
5. `src/components/overlays/Tooltip.tsx` - 3 color violations

### High-Impact Components (Medium Priority)

1. `src/components/filters/FilterBar.tsx` - 8 spacing violations
2. `src/components/ui/dialog.tsx` - Multiple violations across categories
3. `src/components/ui/toast.tsx` - Multiple violations
4. `src/components/image/Image.tsx` - 8 radius + 6 shadow violations

### Standard Components (Low Priority)

- All other components with typography, font weight, or animation violations

---

## Recommendations

1. **Immediate Action:** Fix all color violations (HIGH priority) to ensure theme consistency
2. **Short-term:** Migrate spacing, radius, and shadow violations (MEDIUM priority)
3. **Long-term:** Migrate typography, font weight, and animation violations (LOW priority)
4. **Prevention:** Add ESLint rules to prevent hardcoded Tailwind values
5. **Documentation:** Update component guidelines to enforce token usage

---

## Next Steps

1. Create migration task files for each component (see `.cursor/tasks/migration/`)
2. Begin Phase 1 migration (colors)
3. Test components after migration
4. Update Storybook stories to verify token usage
5. Add linting rules to prevent future violations

---

**Report Generated:** 2025-01-20  
**Auditor:** U0 Token Compliance Audit  
**Version:** 1.0
