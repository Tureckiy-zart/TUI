# Full Review Pipeline - Codebase Inventory

**Date:** 2025-11-22  
**Branch:** audit/full-review-pipeline  
**Purpose:** Complete inventory of all components, hooks, utilities, tokens, and theme files

---

## Summary

This inventory provides a comprehensive overview of the Tenerife UI Library codebase structure, including all components, hooks, utilities, tokens, and theme files.

**Total Files Scanned:**

- Components: 93 `.tsx` files
- TypeScript files: 29 `.ts` files
- **Total: 122 files**

---

## 1. Components Inventory

### 1.1 Primitive Components (`src/components/primitives/`)

**Base UI components** - Core building blocks of the design system:

| Component   | File              | Stories                      | Tests                | Exported |
| ----------- | ----------------- | ---------------------------- | -------------------- | -------- |
| Badge       | `Badge.tsx`       | ❌                           | ❌                   | ✅       |
| Button      | `Button.tsx`      | ✅ `Button.stories.tsx`      | ✅ `Button.test.tsx` | ✅       |
| Card        | `Card.tsx`        | ❌                           | ❌                   | ✅       |
| Divider     | `Divider.tsx`     | ❌                           | ❌                   | ✅       |
| Input       | `Input.tsx`       | ❌                           | ❌                   | ✅       |
| Label       | `Label.tsx`       | ❌                           | ❌                   | ✅       |
| Link        | `Link.tsx`        | ❌                           | ❌                   | ✅       |
| ThemeSwitch | `ThemeSwitch.tsx` | ✅ `ThemeSwitch.stories.tsx` | ❌                   | ✅       |
| Typography  | `Typography.tsx`  | ✅ `Typography.stories.tsx`  | ❌                   | ✅       |

**Total Primitives:** 9 components

### 1.2 Layout Components (`src/components/layout/`)

**Layout and structure components:**

| Component | File            | Stories | Tests | Exported |
| --------- | --------------- | ------- | ----- | -------- |
| Container | `Container.tsx` | ❌      | ❌    | ✅       |
| Flex      | `Flex.tsx`      | ❌      | ❌    | ✅       |
| Footer    | `Footer.tsx`    | ❌      | ❌    | ✅       |
| Grid      | `Grid.tsx`      | ❌      | ❌    | ✅       |
| ModeHero  | `ModeHero.tsx`  | ❌      | ❌    | ✅       |
| Navbar    | `Navbar.tsx`    | ❌      | ❌    | ✅       |
| Section   | `Section.tsx`   | ❌      | ❌    | ✅       |
| Stack     | `Stack.tsx`     | ❌      | ❌    | ✅       |

**Total Layout Components:** 8 components

### 1.3 Modal Components (`src/components/modals/`)

**Modal and dialog components:**

| Component     | File                | Stories                        | Tests | Exported |
| ------------- | ------------------- | ------------------------------ | ----- | -------- |
| ConfirmDialog | `ConfirmDialog.tsx` | ✅ `ConfirmDialog.stories.tsx` | ❌    | ✅       |
| CustomDialog  | `CustomDialog.tsx`  | ✅ `CustomDialog.stories.tsx`  | ❌    | ✅       |
| Modal         | `Modal.tsx`         | ✅ `Modal.stories.tsx`         | ❌    | ✅       |
| ModalProvider | `ModalProvider.tsx` | ❌                             | ❌    | ✅       |
| SimpleModal   | `SimpleModal.tsx`   | ✅ `SimpleModal.stories.tsx`   | ❌    | ✅       |

**Total Modal Components:** 5 components

### 1.4 Menu Components (`src/components/menus/`)

**Menu and navigation menu components:**

| Component      | File                 | Stories                       | Tests | Exported |
| -------------- | -------------------- | ----------------------------- | ----- | -------- |
| DropdownMenu   | `DropdownMenu.tsx`   | ✅ `DropdownMenu.stories.tsx` | ❌    | ✅       |
| NavigationMenu | `NavigationMenu.tsx` | ❌                            | ❌    | ✅       |
| Tabs           | `Tabs.tsx`           | ✅ `Tabs.stories.tsx`         | ❌    | ✅       |

**Total Menu Components:** 3 components

### 1.5 Filter Components (`src/components/filters/`)

**Filter and search components:**

| Component        | File                   | Stories                    | Tests | Exported      |
| ---------------- | ---------------------- | -------------------------- | ----- | ------------- |
| DateRangePicker  | `DateRangePicker.tsx`  | ❌                         | ❌    | ✅            |
| FilterBar        | `FilterBar.tsx`        | ✅ `FilterBar.stories.tsx` | ❌    | ✅            |
| FilterSelect     | `FilterSelect.tsx`     | ❌                         | ❌    | ✅            |
| PriceRangeSlider | `PriceRangeSlider.tsx` | ❌                         | ❌    | ✅            |
| SearchFilters    | `SearchFilters.tsx`    | ❌                         | ❌    | ✅            |
| SearchInput      | `SearchInput.tsx`      | ❌                         | ❌    | ✅            |
| types            | `types.ts`             | ❌                         | ❌    | ❌ (internal) |

**Total Filter Components:** 6 components + 1 types file

### 1.6 Toast Components (`src/components/toasts/`)

**Toast notification components:**

| Component     | File                | Stories                | Tests | Exported |
| ------------- | ------------------- | ---------------------- | ----- | -------- |
| Toast         | `Toast.tsx`         | ✅ `Toast.stories.tsx` | ❌    | ✅       |
| ToastProvider | `ToastProvider.tsx` | ❌                     | ❌    | ✅       |

**Total Toast Components:** 2 components

### 1.7 Overlay Components (`src/components/overlays/`)

**Overlay and popup components:**

| Component     | File                | Stories                  | Tests | Exported |
| ------------- | ------------------- | ------------------------ | ----- | -------- |
| OverlayPortal | `OverlayPortal.tsx` | ❌                       | ❌    | ✅       |
| Popover       | `Popover.tsx`       | ✅ `Popover.stories.tsx` | ❌    | ✅       |
| Tooltip       | `Tooltip.tsx`       | ✅ `Tooltip.stories.tsx` | ❌    | ✅       |

**Total Overlay Components:** 3 components

### 1.8 Feedback Components (`src/components/feedback/`)

**User feedback and status components:**

| Component     | File                | Stories                   | Tests | Exported |
| ------------- | ------------------- | ------------------------- | ----- | -------- |
| Alert         | `Alert.tsx`         | ✅ `Alert.stories.tsx`    | ❌    | ✅       |
| ConsentBanner | `ConsentBanner.tsx` | ❌                        | ❌    | ✅       |
| Progress      | `Progress.tsx`      | ✅ `Progress.stories.tsx` | ❌    | ✅       |
| Skeleton      | `Skeleton.tsx`      | ❌                        | ❌    | ✅       |

**Total Feedback Components:** 4 components

### 1.9 Image Components (`src/components/image/`)

| Component | File        | Stories | Tests | Exported |
| --------- | ----------- | ------- | ----- | -------- |
| Image     | `Image.tsx` | ❌      | ❌    | ✅       |

**Total Image Components:** 1 component

### 1.10 Navigation Components (`src/components/navigation/`)

**Navigation and pagination components:**

| Component   | File              | Stories                      | Tests | Exported |
| ----------- | ----------------- | ---------------------------- | ----- | -------- |
| Breadcrumbs | `Breadcrumbs.tsx` | ✅ `Breadcrumbs.stories.tsx` | ❌    | ✅       |
| Pagination  | `Pagination.tsx`  | ✅ `Pagination.stories.tsx`  | ❌    | ✅       |

**Total Navigation Components:** 2 components

### 1.11 Data Components (`src/components/data/`)

**Data display components:**

| Component | File           | Stories                   | Tests | Exported |
| --------- | -------------- | ------------------------- | ----- | -------- |
| List      | `List.tsx`     | ✅ `List.stories.tsx`     | ❌    | ✅       |
| Table     | `Table.tsx`    | ✅ `Table.stories.tsx`    | ❌    | ✅       |
| Timeline  | `Timeline.tsx` | ✅ `Timeline.stories.tsx` | ❌    | ✅       |

**Total Data Components:** 3 components

### 1.12 Card Components (`src/components/cards/`)

**Card display components:**

| Component | File            | Stories | Tests | Exported |
| --------- | --------------- | ------- | ----- | -------- |
| EventCard | `EventCard.tsx` | ❌      | ❌    | ✅       |
| VenueCard | `VenueCard.tsx` | ❌      | ❌    | ✅       |

**Total Card Components:** 2 components

### 1.13 Form Components (`src/components/forms/`)

**Form input components:**

| Component    | File               | Stories | Tests | Exported |
| ------------ | ------------------ | ------- | ----- | -------- |
| FormInput    | `FormInput.tsx`    | ❌      | ❌    | ✅       |
| FormSelect   | `FormSelect.tsx`   | ❌      | ❌    | ✅       |
| FormTextarea | `FormTextarea.tsx` | ❌      | ❌    | ✅       |

**Total Form Components:** 3 components

### 1.14 Auth Components (`src/components/auth/`)

**Authentication components:**

| Component    | File               | Stories | Tests | Exported |
| ------------ | ------------------ | ------- | ----- | -------- |
| LoginForm    | `LoginForm.tsx`    | ❌      | ❌    | ✅       |
| ProfileCard  | `ProfileCard.tsx`  | ❌      | ❌    | ✅       |
| RegisterForm | `RegisterForm.tsx` | ❌      | ❌    | ✅       |

**Total Auth Components:** 3 components

### 1.15 Admin Components (`src/components/admin/`)

**Admin dashboard components:**

| Component      | File                 | Stories | Tests | Exported |
| -------------- | -------------------- | ------- | ----- | -------- |
| Dashboard      | `Dashboard.tsx`      | ❌      | ❌    | ✅       |
| UserManagement | `UserManagement.tsx` | ❌      | ❌    | ✅       |

**Total Admin Components:** 2 components

### 1.16 Search Components (`src/components/search/`)

| Component | File            | Stories | Tests | Exported |
| --------- | --------------- | ------- | ----- | -------- |
| SearchBar | `SearchBar.tsx` | ❌      | ❌    | ✅       |

**Total Search Components:** 1 component

### 1.17 Section Components (`src/components/sections/`)

**Page section components:**

| Component       | File                  | Stories | Tests | Exported |
| --------------- | --------------------- | ------- | ----- | -------- |
| ArticlesSection | `ArticlesSection.tsx` | ❌      | ❌    | ✅       |
| TrendingSection | `TrendingSection.tsx` | ❌      | ❌    | ✅       |

**Total Section Components:** 2 components

### 1.18 Icon Components (`src/components/icons/`)

| Component    | File               | Stories | Tests | Exported |
| ------------ | ------------------ | ------- | ----- | -------- |
| TrendingIcon | `TrendingIcon.tsx` | ❌      | ❌    | ✅       |

**Total Icon Components:** 1 component

### 1.19 Control Components (`src/components/controls/`)

| Component        | File                   | Stories | Tests | Exported |
| ---------------- | ---------------------- | ------- | ----- | -------- |
| LanguageSelector | `LanguageSelector.tsx` | ❌      | ❌    | ✅       |

**Total Control Components:** 1 component

### 1.20 Skeleton Components (`src/components/skeletons/`)

**Loading skeleton components:**

| Component         | File                    | Stories | Tests | Exported |
| ----------------- | ----------------------- | ------- | ----- | -------- |
| EventCardSkeleton | `EventCardSkeleton.tsx` | ❌      | ❌    | ✅       |
| VenueCardSkeleton | `VenueCardSkeleton.tsx` | ❌      | ❌    | ✅       |

**Total Skeleton Components:** 2 components

### 1.21 UI Components (`src/components/ui/`)

**shadcn/ui base components** (internal use, prefer primitives):

| Component | File          | Stories | Tests | Exported      |
| --------- | ------------- | ------- | ----- | ------------- |
| button    | `button.tsx`  | ❌      | ❌    | ❌ (internal) |
| card      | `card.tsx`    | ❌      | ❌    | ❌ (internal) |
| dialog    | `dialog.tsx`  | ❌      | ❌    | ❌ (internal) |
| input     | `input.tsx`   | ❌      | ❌    | ❌ (internal) |
| label     | `label.tsx`   | ❌      | ❌    | ❌ (internal) |
| toast     | `toast.tsx`   | ❌      | ❌    | ❌ (internal) |
| toaster   | `toaster.tsx` | ❌      | ❌    | ❌ (internal) |
| tooltip   | `tooltip.tsx` | ❌      | ❌    | ❌ (internal) |

**Total UI Components:** 8 components (internal, not exported)

---

## 2. Hooks Inventory (`src/hooks/`)

| Hook        | File             | Purpose                    | Exported                      |
| ----------- | ---------------- | -------------------------- | ----------------------------- |
| useDebounce | `useDebounce.ts` | Debounce a value           | ❌ (not exported in index.ts) |
| useModal    | `useModal.ts`    | Manage modal state         | ✅                            |
| useToast    | `useToast.ts`    | Manage toast notifications | ❌ (not exported in index.ts) |
| use-toast   | `use-toast.ts`   | shadcn/ui toast hook       | ❌ (internal)                 |

**Total Hooks:** 4 hooks

- **Exported:** 1 hook (useModal)
- **Not Exported:** 3 hooks (useDebounce, useToast, use-toast)

**Note:** There are two toast hooks:

- `useToast.ts` - Custom implementation
- `use-toast.ts` - shadcn/ui implementation

---

## 3. Utilities Inventory (`src/lib/`)

| Utility    | File            | Functions                                                                  | Exported       |
| ---------- | --------------- | -------------------------------------------------------------------------- | -------------- |
| utils      | `utils.ts`      | cn, formatDate, formatTime, formatDateTime, generateId, debounce, throttle | ✅             |
| utils.test | `utils.test.ts` | Tests for utils                                                            | ❌ (test file) |

**Total Utilities:** 1 utility file with 7 functions

**Functions:**

- `cn()` - Merge class names (clsx + tailwind-merge)
- `formatDate()` - Format date to string
- `formatTime()` - Format time to string
- `formatDateTime()` - Format date and time
- `generateId()` - Generate random ID
- `debounce()` - Debounce function calls
- `throttle()` - Throttle function calls

---

## 4. Tokens Inventory (`src/tokens/`)

**Design tokens** - Foundation of the design system:

| Token         | File               | Purpose                 | Exported |
| ------------- | ------------------ | ----------------------- | -------- |
| colors        | `colors.ts`        | Color tokens            | ✅       |
| css-variables | `css-variables.ts` | CSS variable mappings   | ✅       |
| motion        | `motion.ts`        | Motion/animation tokens | ✅       |
| radius        | `radius.ts`        | Border radius tokens    | ✅       |
| shadows       | `shadows.ts`       | Shadow tokens           | ✅       |
| spacing       | `spacing.ts`       | Spacing tokens          | ✅       |
| typography    | `typography.ts`    | Typography tokens       | ✅       |
| index         | `index.ts`         | Token exports           | ✅       |

**Total Token Files:** 8 files

---

## 5. Theme Inventory (`src/theme/`)

**Theme system files:**

| Theme File    | File                | Purpose                 | Exported      |
| ------------- | ------------------- | ----------------------- | ------------- |
| applyMode     | `applyMode.ts`      | Apply theme mode        | ✅            |
| colors        | `colors.ts`         | Theme color definitions | ✅            |
| spacing       | `spacing.ts`        | Theme spacing           | ✅            |
| typography    | `typography.ts`     | Theme typography        | ✅            |
| ThemeProvider | `ThemeProvider.tsx` | Theme context provider  | ✅            |
| global.css    | `global.css`        | Global theme styles     | ✅ (imported) |
| index         | `index.ts`          | Theme exports           | ✅            |

**Total Theme Files:** 7 files

---

## 6. Themes Inventory (`src/themes/`)

**Predefined theme configurations:**

| Theme   | File         | Purpose                | Exported |
| ------- | ------------ | ---------------------- | -------- |
| default | `default.ts` | Default theme          | ✅       |
| dark    | `dark.ts`    | Dark theme             | ✅       |
| brand   | `brand.ts`   | Brand theme            | ✅       |
| types   | `types.ts`   | Theme type definitions | ✅       |
| index   | `index.ts`   | Theme exports          | ✅       |

**Total Theme Configurations:** 5 files (3 themes + types + index)

---

## 7. Other Files

| File                | Purpose                       |
| ------------------- | ----------------------------- |
| `src/index.ts`      | Main library export file      |
| `src/preset.ts`     | Tailwind preset configuration |
| `src/test/setup.ts` | Test setup file               |

---

## Summary Statistics

### Components

- **Total Components:** 71 components
- **Components with Stories:** 20 components (28%)
- **Components with Tests:** 1 component (1.4%) - Button only
- **Exported Components:** 61 components
- **Internal Components:** 10 components (ui/ folder)

### Component Categories

1. Primitives: 9
2. Layout: 8
3. Modals: 5
4. Menus: 3
5. Filters: 6
6. Toasts: 2
7. Overlays: 3
8. Feedback: 4
9. Image: 1
10. Navigation: 2
11. Data: 3
12. Cards: 2
13. Forms: 3
14. Auth: 3
15. Admin: 2
16. Search: 1
17. Sections: 2
18. Icons: 1
19. Controls: 1
20. Skeletons: 2
21. UI (internal): 8

### Hooks

- **Total Hooks:** 4
- **Exported Hooks:** 1 (useModal)
- **Not Exported:** 3

### Utilities

- **Total Utility Files:** 1
- **Total Functions:** 7

### Tokens

- **Total Token Files:** 8
- **All Exported:** ✅

### Theme

- **Total Theme Files:** 7
- **Total Theme Configurations:** 3 (default, dark, brand)

---

## Issues Identified

### 1. Missing Stories

- 51 components (72%) lack Storybook stories
- Only 20 components have stories

### 2. Missing Tests

- 70 components (99%) lack unit tests
- Only Button component has tests

### 3. Hook Export Issues

- `useDebounce` is not exported in `index.ts` but may be useful
- `useToast` is not exported but there's also `use-toast.ts` (duplication?)

### 4. Duplicate Toast Hooks

- Two toast hook implementations:
  - `src/hooks/useToast.ts` - Custom implementation
  - `src/hooks/use-toast.ts` - shadcn/ui implementation
- Need to clarify which one should be used

### 5. Internal UI Components

- 8 components in `ui/` folder are not exported
- These are shadcn/ui base components
- Should remain internal or be documented

---

## Recommendations

1. **Add Storybook stories** for all components (priority: high)
2. **Add unit tests** for all components (priority: high)
3. **Resolve toast hook duplication** - choose one implementation
4. **Export useDebounce** if it's meant to be public API
5. **Document internal UI components** - clarify their purpose

---

**Report Generated:** 2025-01-20  
**Next Steps:** Proceed with Code Review (FRP_CODE_REVIEW.md)
