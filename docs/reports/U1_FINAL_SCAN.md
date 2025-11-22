# U1 Final Cleanup - Violation Scan Report

**Date:** 2025-01-20  
**Status:** 🔍 Scan Complete  
**Purpose:** Identify remaining spacing, radius, and shadow violations in stories and secondary components

---

## Summary

Scanned all `.tsx` files in `src/components/` for remaining hardcoded spacing, radius, and shadow values that need to be migrated to design tokens.

---

## Violation Categories

### 1. Spacing Violations (51 files found)

Files with hardcoded spacing values (`p-*`, `px-*`, `py-*`, `gap-*`, `space-*`, `m-*`):

#### Stories Files (High Priority):

- `src/components/overlays/Popover.stories.tsx`
- `src/components/toasts/Toast.stories.tsx`
- `src/components/primitives/ThemeSwitch.stories.tsx`
- `src/components/primitives/Typography.stories.tsx`
- `src/components/overlays/Tooltip.stories.tsx`
- `src/components/menus/Tabs.stories.tsx`
- `src/components/modals/SimpleModal.stories.tsx`
- `src/components/modals/CustomDialog.stories.tsx`
- `src/components/modals/Modal.stories.tsx`
- `src/components/menus/DropdownMenu.stories.tsx`
- `src/components/data/Table.stories.tsx`
- `src/components/feedback/Alert.stories.tsx`
- `src/components/feedback/Progress.stories.tsx`

#### Secondary Components:

- `src/components/layout/Stack.tsx`
- `src/components/layout/Flex.tsx`
- `src/components/layout/Container.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/navigation/Pagination.tsx`
- `src/components/navigation/Breadcrumbs.tsx`
- `src/components/filters/DateRangePicker.tsx`
- `src/components/filters/PriceRangeSlider.tsx`
- `src/components/data/Timeline.tsx`
- `src/components/auth/LoginForm.tsx`
- `src/components/auth/RegisterForm.tsx`
- `src/components/admin/Dashboard.tsx`
- `src/components/admin/UserManagement.tsx`
- `src/components/sections/TrendingSection.tsx`
- `src/components/sections/ArticlesSection.tsx`
- `src/components/skeletons/EventCardSkeleton.tsx`
- `src/components/skeletons/VenueCardSkeleton.tsx`
- `src/components/controls/LanguageSelector.tsx`
- `src/components/auth/ProfileCard.tsx`
- `src/components/toasts/ToastProvider.tsx`
- `src/components/modals/SimpleModal.tsx`
- `src/components/primitives/Typography.tsx`
- `src/components/primitives/Link.tsx`
- `src/components/primitives/Badge.tsx`
- `src/components/menus/Tabs.tsx`
- `src/components/menus/DropdownMenu.tsx`

#### Already Partially Migrated (Need Verification):

- `src/components/filters/FilterSelect.tsx`
- `src/components/search/SearchBar.tsx`
- `src/components/filters/SearchFilters.tsx`
- `src/components/layout/ModeHero.tsx`
- `src/components/menus/NavigationMenu.tsx`
- `src/components/ui/dialog.tsx`
- `src/components/overlays/Tooltip.tsx`
- `src/components/feedback/ConsentBanner.tsx`
- `src/components/feedback/Alert.tsx`
- `src/components/ui/button.tsx`
- `src/components/ui/tooltip.tsx`
- `src/components/ui/toaster.tsx`

### 2. Radius Violations (44 files found)

Files with hardcoded radius values (`rounded-*`):

Most components already use token-based radius classes (`rounded-md`, `rounded-lg`, etc.) which are configured in Tailwind. These need verification to ensure they're using tokens correctly.

**Key Files to Verify:**

- Stories files (all `.stories.tsx`)
- Secondary components (Stack, Flex, Container, Footer, etc.)
- Layout components
- Navigation components

### 3. Shadow Violations (26 files found)

Files with hardcoded shadow values (`shadow-*`):

**Key Files:**

- Stories files
- Secondary components
- Layout components
- Some already migrated components need verification

---

## Migration Priority

### Priority 1: Stories Files (13 files)

All Storybook stories must use tokens for consistency and demonstration purposes.

### Priority 2: Secondary Components (25+ files)

Components that are less frequently used but still need token compliance.

### Priority 3: Verification (13 files)

Components that were partially migrated need final verification.

---

## Next Steps

1. Fix all spacing violations in stories files
2. Fix spacing violations in secondary components
3. Verify and fix radius violations
4. Verify and fix shadow violations
5. Run full validation
6. Generate final cleanup report

---

**Scan Completed:** 2025-01-20  
**Total Files with Violations:** 51 (spacing), 44 (radius), 26 (shadow)  
**Estimated Violations:** ~200-300 remaining
