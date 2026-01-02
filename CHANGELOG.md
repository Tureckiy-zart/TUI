# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **NO QUICK FIXES POLICY**
>
> Do not edit versioned entries manually.
> All released sections are immutable.
>
> All changes must go through the automated release process
> defined in `docs/RELEASE_PROCESS.md`.

## [Unreleased]

**Note:** To add entries for future releases, add them under this [Unreleased] section. When a version is published to npm, move the entry to a versioned section with the exact npm publish date.

## [2.0.4]

**Note:** To add entries for future releases, add them under this [Unreleased] section. When a version is published to npm, move the entry to a versioned section with the exact npm publish date.

### Added

- **New Form & Utility Components** added to the public API:
  - **IconButton** — icon-only button variant built on top of Button
  - **HelperText** — semantic helper text for form fields
  - **ErrorText** — semantic error message component for validation feedback
  - **FormGroup** — grouping component for related form controls
  - **Switch** — toggle switch component for boolean inputs

- **New Layout Components** for building structured page layouts:
  - **List** and **ListItem** — canonical components for vertical lists
  - **Divider** — visual separator with orientation and tone variants
  - **Inline** — inline horizontal layout primitive
  - **Inset** — padding utility for consistent inner spacing
  - **Navbar** — top-level navigation bar component
  - **Panel** — container component with padding, radius, and elevation variants
  - **SidebarLayout** — layout with configurable sidebar
  - **Spacer** — flexible spacing utility
  - **StickyBar** — sticky container for persistent UI elements
  - **ContentShell** — content wrapper for page layouts
  - **PageHeader** — standardized page header component

- **Overlay & Menu Components**:
  - **Popover** — contextual overlay component (now exported from main entry)
  - **Tooltip** — hover-based helper component (now exported from main entry)
  - **Dropdown** — selection menu built on Popover
  - **Menu** — menu system for navigation and action lists

- **Accessibility & Interaction Utilities**:
  - **VisuallyHidden** — screen reader–only utility
  - **FocusTrap** — focus containment utility for overlays and modals
  - **ButtonGroup** — grouping component for related buttons

- **New Token Exports**:
  - `PANEL_TOKENS`
  - `DROPDOWN_TOKENS`
  - `STICKYBAR_TOKENS`

### Fixed

- **Exports**:
  - Fixed missing exports for **Popover** and **Tooltip** from the main package entry.

- **Accessibility**:
  - Removed invalid `aria-orientation` usage in **ButtonGroup**.
  - Improved contrast and visual clarity in **PriceRangeSlider**.

- **TypeScript & Tests**:
  - Fixed type errors in Storybook stories and tests.
  - Resolved FocusTrap export path and type compatibility issues.
  - Fixed nested button warnings and React `act()` test issues.

- **Storybook**:
  - Added `next/link` mock to prevent runtime errors.
  - Improved story configuration and developer experience.

### Changed

- **Canonical List Components**:
  - `List` and `ListItem` are now the recommended components for all vertical lists.
  - Existing internal list usages have been migrated to these components.

- **Spinner Classification**:
  - Spinner component is now categorized under **controls** instead of **overlays**.
  - Public API remains unchanged — no breaking changes for consumers.

- **Storybook Improvements**:
  - Enhanced visual clarity and interaction feedback in Flex, Grid, and Stack stories.

## [2.0.3] - 2025-12-31

### Changed

- Patch release with internal improvements and bug fixes.

## [2.0.1] - 2025-12-29

### Changed

- Patch release with internal improvements and bug fixes.

## [2.0.0] - 2025-12-28

### Fixed

- **Next.js App Router Compatibility**: Fixed Container and Section components to ensure they work correctly in Next.js App Router
  - Container and Section now render native HTML elements (`<div>` and `<section>`) without Html wrappers from `next/document`
  - Added CI guard script (`check:next-document`) to prevent future imports from `next/document`
  - Added ESLint rule to prevent `next/document` imports in UI library source code
  - **Impact:** Container and Section components are now fully compatible with Next.js App Router Server Components and Client Components

### Changed

- **Motion API**: Renamed Motion exports to remove `v2` suffix (e.g., `motionV2Durations` → `motionDurations`, `motionV2Easings` → `motionEasings`). Update import statements — no behavior changes.

### Added

- **Library Maturity Growth System**: Comprehensive system for controlled library growth
  - Component Needs Inventory system for tracking real component needs
  - Extension component creation templates and CLI generator (`scripts/generate-extension-component.ts`)
  - Component needs analysis script (`scripts/analyze-component-needs.ts`)
  - Usage feedback collection and analysis system
  - Enhanced Storybook configuration with a11y testing and token display
  - GitHub issue template for component requests
  - Automated component request triage workflow
  - Component creation checklist and examples library
  - Usage tracking and feedback review processes

### Breaking Changes

- **Motion V1 Tokens Removed**: All Motion V1 tokens and CSS variables have been removed. Use Motion tokens instead:
  - Exports: `durations` → `motionDurations`, `easings` → `motionEasings`, `transitions` → `motionTransitions`
  - CSS variables: `--duration-fast` → `--motion-duration-fast`, `--ease-in` → `--motion-easing-standard`
  - See [Motion V1 Inventory](./docs/reports/audit/MOTION_V1_INVENTORY.md) for complete migration guide.

- **Textarea Component API Changes**: The Textarea component API has been updated for consistency:
  - `state` prop removed — use native HTML attributes (`disabled`, `aria-invalid`) instead
  - Variant names changed: `primary` → `default`, `secondary` → `elevated`, `outline` → `outlined`, `ghost` → `subtle`
  - `destructive` variant removed — use `aria-invalid` for error state
  - See [Textarea Migration Guide](./docs/migrations/TEXTAREA_MIGRATION.md) for detailed migration instructions.

- **Removed deprecated `Text.variant` prop**: Use `muted` prop for muted text, or use semantic components for other semantic colors. See [Migration Guide](./docs/migrations/MIGRATION_V2_DEPRECATED_API_REMOVAL.md) for details.

- **Removed deprecated `Stack.gap`, `Row.gap`, and `Column.gap` props**: Use `spacing` prop instead. Simply replace `gap` with `spacing` — values and behavior remain the same.

### Removed

- `Text` component `variant` prop (deprecated in v1.x)
- `Stack`, `Row`, and `Column` components `gap` prop (deprecated in v1.x)
- Motion V1 tokens (see Breaking Changes above)

## [1.2.1] - 2025-12-19

### Changed

- Patch release with internal improvements and bug fixes.

## [1.2.0] - 2025-12-19

### Added

- **Component API Stability**: Added compile-time and lint-time protection to prevent unintended API changes in core components
  - Type-level tests ensure `className` and `style` props are not accepted on Foundation components
  - All guards are enforced in CI via `typecheck` and `lint:ci` scripts

### Changed

- Core components now have compile-time and lint-time protection against regression
- Type-test files are excluded from ESLint linting

### Security

- Component API enforcement is now technically impossible to bypass without explicit rule changes
- No manual review needed to catch violations — CI will fail on any regression attempt

## [1.1.1] - 2025-12-17

### Changed

- Patch release with internal improvements and bug fixes.

## [1.1.0] - 2025-12-17

### Changed

- Minor release with internal improvements and bug fixes.

## [1.0.16] - 2025-12-16

### Changed

- Patch releases (versions 1.0.1 through 1.0.16) with incremental improvements, bug fixes, and internal refactoring.

## [1.0.4] - 2025-12-10

### Fixed

- Fixed TypeScript errors in vitest.config.ts caused by Vite@5 + Vitest@4 type mismatch
- Replaced vitest/config defineConfig with vite defineConfig for better compatibility
- Fixed jest-dom matchers type errors in test files
- Removed unused React imports from test files
- Fixed type assertions for layout spacing tokens (grid-md, stack-md)
- Fixed type assertion for toHaveNoViolations matcher from vitest-axe
- Fixed tagName type errors in Box.test.tsx
- Added tsconfig.vitest.json for proper test type checking
- Removed test files from tsconfig.json exclude

### Changed

- Updated vitest configuration to use vite defineConfig instead of vitest/config
- Improved TypeScript type checking for test files

## [1.0.3] - 2025-12-08

### Added

- **Card Components**: Full migration of card components to token-driven architecture
  - CardBase component with CVA variant system
  - DOMAIN_TOKENS for domain-specific card styling
  - Six domain card components: EventCard, VenueCard, ArtistCard, TicketCard, PromoCard, CategoryCard
  - All cards use token-based styling with zero hardcoded Tailwind visual classes
  - Motion compliance with MOTION_TOKENS and DOMAIN_TOKENS.motion
  - Comprehensive Storybook stories for all card variants

### Changed

- Card components now use CardBase as base component for consistent layout
- All card styling migrated from hardcoded classes to DOMAIN_TOKENS
- Badge positioning now uses DOMAIN_TOKENS.badges.position tokens

### Removed

- Legacy EventCard.tsx and VenueCard.tsx files (replaced with new token-driven implementations)

## [1.0.0] - 2025-11-23

### Changed

- Initial stable release (v1.0.0).

## [0.0.7] - 2025-11-19

### Added

- Initial release of @tenerife.music/ui package (versions 0.0.3 through 0.0.7)
- 74+ React components extracted from Tenerife.Music monorepo
- Day/Night theme support
- TypeScript definitions
- Storybook documentation
- Full test coverage
- Tailwind CSS integration
- shadcn/ui based primitives
- Radix UI accessibility support

### Components

- **Primitives**: Button, Input, Card, Badge, Label, Divider, Link, Typography, ThemeSwitch
- **Layout**: Navbar, Footer, Container, Section, Grid, Flex, Stack, ModeHero
- **Forms**: FormInput, FormSelect, FormTextarea
- **Feedback**: Alert, Progress, Skeleton, Toast, ToastProvider
- **Navigation**: Breadcrumbs, Pagination, Tabs, NavigationMenu, DropdownMenu
- **Data**: Table, List, Timeline
- **Cards**: EventCard, VenueCard
- **Modals**: Modal, Dialog, ConfirmDialog, ModalProvider, CustomDialog
- **Overlays**: Tooltip, Popover, OverlayPortal
- **Filters**: SearchInput, FilterSelect, DateRangePicker, PriceRangeSlider, FilterBar, SearchFilters
- **Search**: SearchBar
- **Sections**: TrendingSection, ArticlesSection
- **Icons**: TrendingIcon
- **Controls**: LanguageSelector
- **Skeletons**: EventCardSkeleton, VenueCardSkeleton
- **Auth**: LoginForm, RegisterForm, ProfileCard
- **Admin**: Dashboard, UserManagement

### Design Tokens

- Color system with CSS variables
- Typography tokens
- Spacing tokens
- Border radius tokens
- Theme tokens (day/night)

### Build & Publishing

- Vite build configuration
- ESM and CJS exports
- TypeScript declaration files
- npm package configuration

---

## Version Canon Rules

This changelog follows strict version canon synchronization rules:

1. **Canonical Source**: npm registry (`@tenerife.music/ui`) is the single source of truth for published versions
2. **Changelog Requirements**: Only versions published to npm may appear in CHANGELOG with publication dates
3. **Version Format**: Follows Semantic Versioning (semver.org)
4. **Date Format**: Uses ISO 8601 (YYYY-MM-DD), must match actual npm publish date from `npm view @tenerife.music/ui time`
5. **Unreleased Section**: Use `[Unreleased]` for future changes not yet published to npm
6. **Internal Versions**: Versions not published to npm are considered internal and should not appear in public CHANGELOG
7. **No Retroactive Changes**: Published version entries must not be modified retroactively
8. **Chronological Order**: Versions are ordered newest to oldest, matching npm publish order

To verify version synchronization:

```bash
npm view @tenerife.music/ui versions --json
npm view @tenerife.music/ui time --json
```

---

[0.0.7]: https://github.com/tenerife-music/tenerife-ui/releases/tag/v0.0.7
[1.0.0]: https://github.com/tenerife-music/tenerife-ui/releases/tag/v1.0.0
[1.0.3]: https://github.com/tenerife-music/tenerife-ui/releases/tag/v1.0.3
[1.0.4]: https://github.com/tenerife-music/tenerife-ui/releases/tag/v1.0.4
[1.0.16]: https://github.com/tenerife-music/tenerife-ui/releases/tag/v1.0.16
[1.1.0]: https://github.com/tenerife-music/tenerife-ui/releases/tag/v1.1.0
[1.1.1]: https://github.com/tenerife-music/tenerife-ui/releases/tag/v1.1.1
[1.2.0]: https://github.com/tenerife-music/tenerife-ui/releases/tag/v1.2.0
[1.2.1]: https://github.com/tenerife-music/tenerife-ui/releases/tag/v1.2.1
[2.0.0]: https://github.com/tenerife-music/tenerife-ui/releases/tag/v2.0.0
[2.0.1]: https://github.com/tenerife-music/tenerife-ui/releases/tag/v2.0.1
[2.0.3]: https://github.com/tenerife-music/tenerife-ui/releases/tag/v2.0.3
