# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **List System FINAL LOCK**: List and ListItem components locked as closed architectural topic (2026-01-02)
  - List (`src/COMPOSITION/layout/List/`) and ListItem (`src/COMPOSITION/layout/ListItem/`) changed from PROCESS LOCKED to LOCKED (FINAL LOCK)
  - No alternative list implementations allowed - all vertical lists must use canonical List/ListItem components
  - ESLint rule `no-ad-hoc-lists` is mandatory and prevents violations
  - Explicit exceptions: Timeline, Stepper, NavList, DataList, Tree (specialized patterns)
  - Migration complete: All existing vertical lists migrated to canonical components
  - Unlock policy: Changes require EXPLICIT UNLOCK TUNG with architectural justification, impact analysis, and migration plan

## [2.0.2] - 2025-12-30

### Fixed

- **Next.js App Router Compatibility**: Fixed Container and Section components to ensure they work correctly in Next.js App Router
  - Verified that Container and Section render native HTML elements (`<div>` and `<section>`) without Html wrappers from `next/document`
  - Added CI guard script (`check:next-document`) to prevent future imports from `next/document`
  - Added ESLint rule to prevent `next/document` imports in UI library source code
  - **Impact:** Container and Section components are now fully compatible with Next.js App Router Server Components and Client Components

### Changed

- **Motion API Naming (Canonical Cleanup)**:
  - Renamed all Motion public API exports to remove `v2` suffix, reflecting canonical versionless API
  - `motionV2Durations` → `motionDurations`
  - `motionV2Easings` → `motionEasings`
  - `motionV2Transitions` → `motionTransitions`
  - `motionV2CSSVariables` → `motionCSSVariables`
  - `motionV2TailwindConfig` → `motionTailwindConfig`
  - `motionV2ReducedMotion` → `motionReducedMotion`
  - `motionV2Fade` → `motionFade`
  - `motionV2Scale` → `motionScale`
  - `motionV2Slide` → `motionSlide`
  - `motionV2Combined` → `motionCombined`
  - **Reason:** Motion V1 is fully removed, Motion 2.x is LOCKED as canonical. Versioned naming is no longer needed.
  - **Impact:** Import statements need to be updated. No behavior changes.

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

- **Motion V1 Tokens Removed (Major 2.0.0)**:
  - ❌ **BREAKING:** All Motion V1 tokens completely removed from codebase
    - **Removed file:** `src/FOUNDATION/tokens/motion.ts`
    - **Removed exports:** `durations`, `easings`, `transitions`, `keyframes`, `animations`, `springs`, `motionCSSVariables`, `tailwindMotionConfig`, `reducedMotion`
    - **Removed types:** `Duration`, `Easing`, `Transition`, `Keyframe`, `Animation`, `Spring`
  - ❌ **BREAKING:** Legacy CSS variable names removed
    - Removed: `--duration-instant`, `--duration-fast`, `--duration-normal`, `--duration-slow`, etc.
    - Removed: `--ease-in`, `--ease-out`, `--ease-in-out`, `--ease-bounce`, etc.
    - Removed: `--transition-fast`, `--transition-normal`, `--transition-slow`, etc.
    - Use V2 names instead: `--motion-duration-fast`, `--motion-easing-standard`, `--motion-transition-normal`
  - **Use Motion V2 tokens instead:**
    - `durations` → `motionV2Durations`
    - `easings` → `motionV2Easings`
    - `transitions` → `motionV2Transitions`
    - `motionCSSVariables` → `motionV2CSSVariables`
    - `tailwindMotionConfig` → `motionV2TailwindConfig`
    - `reducedMotion` → `motionV2ReducedMotion`
  - **Reason:** Motion V2 is now the ONLY canonical motion system. Simplified architecture, single source of truth.
  - **Severity:** HIGH (API removal)
  - **Migration Difficulty:** MEDIUM (import changes required, API surface reduced)
  - **Backward Compatibility:** ❌ NOT PROVIDED (by design - major version)
  - **CI Guard:** `pnpm check:motion-v1` prevents V1 reintroduction
  - **Migration Guide:** See [Motion V1 Inventory](./docs/reports/audit/MOTION_V1_INVENTORY.md) for migration details
  - **Version Requirement:** MAJOR bump (v1.x → v2.0.0)

- **Textarea Component API Migration (Foundation Pipeline 18A)**:
  - ❌ **BREAKING:** `state` prop removed - Use native HTML attributes instead
    - `state="disabled"` → `disabled={true}` (native HTML attribute)
    - `state="error"` → `aria-invalid={true}` (native ARIA attribute)
    - `state="success"` → removed (validation feedback should be external)
    - `state="default"` → removed (implicit, no prop needed)
  - ❌ **BREAKING:** Variant dictionary changed from InteractiveVariant to SurfaceVariant
    - `variant="primary"` → `variant="default"`
    - `variant="secondary"` → `variant="elevated"`
    - `variant="outline"` → `variant="outlined"` (name normalized)
    - `variant="ghost"` → `variant="subtle"`
    - `variant="destructive"` → removed (use `aria-invalid` for error state)
  - **Reason:** Foundation Authority compliance (CVA_CANONICAL_STYLE, VARIANTS_SIZE_CANON, STATE_AUTHORITY)
  - **Severity:** HIGH (API changes required)
  - **Migration Difficulty:** EASY (straightforward mappings, visual parity preserved)
  - **Backward Compatibility:** ❌ NOT PROVIDED (by design, violates Authority)
  - **Migration Guide:** See [Textarea Migration Guide](./docs/migrations/TEXTAREA_MIGRATION.md) for detailed migration instructions
  - **Version Requirement:** MAJOR bump required (v1.x → v2.0.0) per Semantic Versioning

- **Removed deprecated `Text.variant` prop**: Use `muted` prop for muted text, or use semantic components for other semantic colors. See [Migration Guide](../docs/migrations/MIGRATION_V2_DEPRECATED_API_REMOVAL.md) for details.
- **Removed deprecated `Stack.gap`, `Row.gap`, and `Column.gap` props**: Use `spacing` prop instead (canonical). Simply replace `gap` with `spacing` - values and behavior remain the same.
- **Updated `FieldError` internal implementation**: No public API changes, but internal implementation now uses canonical approaches instead of deprecated APIs.

### Removed

- `Text` component `variant` prop (deprecated in v1.x)
- `Stack`, `Row`, and `Column` components `gap` prop (deprecated in v1.x)
- **Motion V1 tokens** - All Motion V1 exports removed. Use Motion V2 tokens:
  - `durations` → `motionV2Durations`
  - `easings` → `motionV2Easings`
  - `transitions` → `motionV2Transitions`
  - `keyframes`, `animations`, `springs` → use Motion V2 keyframes/presets
  - `motionCSSVariables` → `motionV2CSSVariables`
  - `tailwindMotionConfig` → `motionV2TailwindConfig`
  - `reducedMotion` → `motionV2ReducedMotion`

## [1.2.0] - 2025-12-18

### Added

- **Foundation Regression Guards (Phase 4)**: Technical enforcement to prevent reintroduction of styling escape hatches
  - ESLint rule `no-foundation-classname-style`: Blocks `className` and `style` props in Foundation component interfaces
  - ESLint rule `no-foundation-open-htmlattributes`: Requires `Omit<React.*HTMLAttributes, "className" | "style">` instead of direct extension
  - Type-level tests for all 9 Foundation components (Button, Link, Text, Heading, Input, Textarea, Checkbox, Radio, Label)
  - Type tests use `@ts-expect-error` to ensure `className` and `style` are rejected at compile time
  - All guards are enforced in CI via `typecheck` and `lint:ci` scripts

### Changed

- Foundation components now have compile-time and lint-time protection against regression
- Type-test files are excluded from ESLint linting (added `**/*.type-test.tsx` to ignore patterns)

### Security

- Foundation enforcement is now technically impossible to bypass without explicit rule changes
- No manual review needed to catch violations - CI will fail on any regression attempt

## [1.0.11] - 2025-12-11

### Added

- TBD

### Changed

- TBD

### Fixed

- TBD

### Removed

- TBD

## [1.0.10] - 2025-12-11

### Added

- TBD

### Changed

- TBD

### Fixed

- TBD

### Removed

- TBD

## [1.0.9] - 2025-12-11

### Added

- TBD

### Changed

- TBD

### Fixed

- TBD

### Removed

- TBD

## [1.0.6] - 2025-12-11

### Added

- TBD

### Changed

- TBD

### Fixed

- TBD

### Removed

- TBD

## [1.0.5] - 2025-12-11

### Added

- TBD

### Changed

- TBD

### Fixed

- TBD

### Removed

- TBD

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

## [1.0.3] - 2025-12-10

### Added

- **L3 Card Layer Complete**: Full migration of card components to token-driven architecture
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

## [0.0.1] -

### Added

- Initial release of @tenerife.music/ui package
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

[0.0.1]: https://github.com/tenerife-music/tenerife-ui/releases/tag/v0.0.1
