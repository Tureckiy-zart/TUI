## [3.0.0](https://github.com/Tureckiy-zart/TUI/compare/v2.0.6...v3.0.0) (2026-02-01)

### ⚠ BREAKING CHANGES

- **ci:** Release process now uses npm Trusted Publisher (OIDC) instead of npm tokens

* Remove legacy workflows: test-npm-token.yml and release.yml
* Canonize semantic-release job in ci.yml with OIDC support
  - Add environment: npm-release
  - Add permissions: id-token: write, contents: write
  - Add registry-url and scope to setup-node
  - Remove NPM_TOKEN dependency
  - Update actions to @v4
  - Add corepack enable for pnpm
* Update release.config.cjs: change branches to ["main"]
* Delete tag v2.4.0 (will be recreated by semantic-release)

This change eliminates npm token management and enables provenance attestation.

Co-authored-by: Cursor <cursoragent@cursor.com>

- **a11y:** None

### Features

- **a11y:** implement WCAG AA compliance and enhance UX patterns ([8703648](https://github.com/Tureckiy-zart/TUI/commit/870364807714610252f0c03503fc1adf009f80d2))
- **ci:** simplify CI to single source of truth with deterministic releases ([c68323c](https://github.com/Tureckiy-zart/TUI/commit/c68323caaca31b0ad1a32d83b5006aca0b0cb2e3))
- enforce Typography Color Policy v1 via TypeScript and ESLint ([9b75090](https://github.com/Tureckiy-zart/TUI/commit/9b750900c89bafd7c616691e9507f6a2a01a8fff))
- finalize OIDC-based release pipeline ([74f6b38](https://github.com/Tureckiy-zart/TUI/commit/74f6b38f77a24828c20bb0b40dc63fee52cdaedc))
- finalize OIDC-based release pipeline ([c9753bb](https://github.com/Tureckiy-zart/TUI/commit/c9753bb0a5dceec7b2aaf35389500102f5194b00))
- **ui:** enable public npm release via OIDC ([d52a130](https://github.com/Tureckiy-zart/TUI/commit/d52a130b0995320b34143620e02683a7e4d78cc2))
- **ui:** public release after OIDC migration ([288ddaf](https://github.com/Tureckiy-zart/TUI/commit/288ddaf8e6d5907d73689a179c39a169fa0b75e1))

### Bug Fixes

- **a11y:** improve contrast for destructive button disabled state ([3e9a50d](https://github.com/Tureckiy-zart/TUI/commit/3e9a50df266e401777c27fce9e8dc57066ae6854))
- add fallback dialog titles and normalize muted text tokens ([6af4526](https://github.com/Tureckiy-zart/TUI/commit/6af45262e61c773baa2cb7e11b267ddc4d814989))
- **ci:** add missing pnpm install step in quality workflow ([a50f9aa](https://github.com/Tureckiy-zart/TUI/commit/a50f9aa3fcaf1ded27525733e89bd327437e89fb))
- **ci:** migrate to OIDC-based release with semantic-release ([150abec](https://github.com/Tureckiy-zart/TUI/commit/150abecf53dd13519a683055991979b1d14a2319))
- **eslint-rules:** resolve TS errors in no-leading-tailwind and no-text-margin-spacing ([cd75c74](https://github.com/Tureckiy-zart/TUI/commit/cd75c7414e5f040cfc711e2356a61487a1124d64))
- **eslint:** handle undefined value.raw in template literals ([87e9fcf](https://github.com/Tureckiy-zart/TUI/commit/87e9fcf168155bd832cc8c8d0cec88f1debecb94))
- **foundation:** enforce typography rhythm constraints ([dd3165d](https://github.com/Tureckiy-zart/TUI/commit/dd3165d0860c9e35abdddff4997a3a0bb25d1371))
- **foundation:** finalize Typography Color Policy v1 canon & lock ([fd9985a](https://github.com/Tureckiy-zart/TUI/commit/fd9985a0855c194e1153689480dea3bc551e5bcd))
- lin script ([4785c47](https://github.com/Tureckiy-zart/TUI/commit/4785c4791cbaaf7dfdd7d33ac6f95f757cb1d643))
- **release:** enable pnpm via corepack ([585c6ec](https://github.com/Tureckiy-zart/TUI/commit/585c6ecdce8b758ebbb16b1e332d01a2ccc797e2))
- remove className from Foundation components in Avatar story ([8ebc997](https://github.com/Tureckiy-zart/TUI/commit/8ebc99757a0d7944d33c7fa406a78199f16db2e9))
- **storybook:** improve visual styling and accessibility in stories ([4d4739a](https://github.com/Tureckiy-zart/TUI/commit/4d4739a7b80c16bcf0da8a34162c3fd015ae512b))
- **tests:** update token-based class expectations ([9928159](https://github.com/Tureckiy-zart/TUI/commit/992815952d21db4965451155c67b3a6a96ebe366))
- **toast:** remove legacy useToast export and add hook stories ([c18328c](https://github.com/Tureckiy-zart/TUI/commit/c18328c9386a26c0b0e2f659c61b17c7a8997d5e))
- trigger public release ([5e4e52d](https://github.com/Tureckiy-zart/TUI/commit/5e4e52d76072eeb8592f64b4645847a1223188be))

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

### Added

- (none)

### Changed

- (none)

### Fixed

- (none)

## [2.4.0] - 2026-02-01

### Added

- **ResponsiveVisibility (Extension):**
  - Canonical composition-level capability for breakpoint-based visibility.
  - Public API: `ResponsiveVisibility.Root`, `From`, `Below`, `Only`.
  - Explicitly forbidden patterns: Tailwind visibility utilities, CSS media queries in consumer code, JS breakpoint hooks, and duplicate visibility logic.
  - Dev-only runtime guards for invalid nesting (no runtime detection of Foundation/Layout by design).
  - Canonical etalon composition: `HeaderComposition`.
  - CANON, LOCK, EXTENSION_STATE, FOUNDATION_LOCK, and capability map fully synchronized.

- **SurfaceElevation (Extension):**
  - Semantic elevation context using existing elevation tokens from `ELEVATION_AUTHORITY`.
  - Context-only capability; does not render styles directly.
  - Visual elevation applied by elevation-aware components (e.g. Card).
  - Negative tests ensure non-elevation-aware components remain unaffected.
  - Canonical etalon composition: `SurfaceElevationCompositionReference`.

### Changed

- **InverseTypography (Extension):**
  - Activated visual behavior for existing typography primitives (`Text`, `Heading`) via `InverseTypography` context.
  - Uses existing typography color tokens from `TYPOGRAPHY_COLOR_POLICY_v1`.
  - `InverseTypography.Root` remains context-only (no direct rendering).
  - No new props, variants, tokens, or public API added.
  - Canonical etalon composition: `HeroCompositionReference`.

### Fixed

- (none)

## [2.3.1] - 2026-01-29

### Changed

- Documentation aligned with project state: README Button example (variant), TOKENS_OVERVIEW paths (src/FOUNDATION/tokens), API_REFERENCE version and Button variants, INTEGRATION_GUIDE and README domain components (internal, not exported), theme-contract README path clarification.

### Fixed

- (none)

## [2.3.0] - 2026-01-29

### Added

- **Runtime Utilities Lock (TUNG-028):** Runtime utilities (`tokenCVA`, `cn`) are now locked as private Foundation implementation details. They must be imported directly from `@/FOUNDATION/lib/*` and are forbidden from `@/index` exports.
- **ESLint Rules:** Added `no-token-imports-from-index` and `no-runtime-utils-from-index` rules to enforce canonical import patterns and prevent import oscillation.
- **Token Import Class Split:** Introduced clear distinction between Component Tokens (must import from `@/FOUNDATION/tokens/components/**`) and Foundation Tokens (must import from `@/index`), eliminating contradictory enforcement.
- **Index Import Clarification:** Explicitly documented allowed imports from `@/index` in DOMAIN/PATTERNS: UI components (Box, Button, Text, Skeleton) are allowed, while runtime utilities are forbidden. This prevents automated refactors from incorrectly replacing valid UI imports.
- **Execution tests:** Added and extended execution tests for coverage (DateRangePicker, FilterBar, FilterSelect, PriceRangeSlider, SearchInput, hooks provider harness, motion observer, foundation/hooks/themes runtime smoke).

### Changed

- Calibration: textColors.day.muted for AA on elevated surfaces
- **Import Patterns:** Normalized token usage across all consumer files (DOMAIN, PATTERNS), replacing raw utility classes with token props and Foundation API components.
- **Token Usage:** Closed all 7 ALLOWED gaps from TOKEN_REALITY_AUDIT_027, replacing raw Tailwind classes with Text, Heading, Box, Stack, Row, Container components.
- **Public Index Boundary:** `@/index` is now explicitly public-only and must NOT export runtime utilities or internal helpers.
- **Index public API test:** Execution test no longer imports `FOUNDATION/index` or `EXTENSIONS/index` barrel files (barrels removed).

### Fixed

- **Import Oscillation:** Resolved import oscillation between `@/index` and `@/FOUNDATION/tokens/components/**` through explicit ESLint enforcement.
- **Runtime Cycles:** Eliminated runtime cycles and order-dependent initialization failures by enforcing direct token imports.
- **Token Import Conflicts:** Resolved conflict between ESLint rules for token imports by introducing token class split.

## [2.1.1] - 2026-01-24

### Changed

- Calibration: textColors.day.secondary for AA on elevated surfaces
- Calibration: disabledForeground (day/night) for WCAG AA compliance
- Result: A11Y contrast = 100% PASS
- Typography rhythm enforcement: lint rules tightened for line-height, leading, and margin spacing
- Theme cleanup: removed lineHeight overrides to align with rhythm policy
- Foundation audits: token system and component coverage reports added
- Decision snapshot: component token coverage interpretation locked (no-op)

## [2.1.0]

### Added

- **Canon Core v1 Theming**: Runtime emitted 100% REQUIRED `--tm-*` tokens and dev-guard enforced missing/empty required tokens
- **Build-Time Validation**: CI gate validated token coverage for all mode/theme/brand combinations
- **Legacy CSS Var Guard**: Guard blocked non-`--tm-*` usage in runtime components
- **Semantic Layer Governance**: `--tm-status-*` was marked TEMPORARY and restricted to feedback/validation
- **TM Validation Artifacts**: Registry/snapshot modules, validator script, and migration reports were added
- **A11Y Contrast Architecture Lock**: Fully normalized token-driven contrast system (WCAG 2.1 AA)
  - Runtime-aligned a11y contrast validation tooling
  - Canonical day/night foreground selection logic
  - Disabled state contrast policy finalized
  - One mathematically justified accepted exception documented
  - Contrast governance locked at Foundation level
  - See: `docs/architecture/locks/A11Y_LOCK.md`

### Fixed

- **Typography Size Scale**: Restored semantic typography size mappings in FOUNDATION components
  - Fixed 8 canon violations where distinct semantic sizes (xs, sm, md, lg, xl) mapped to identical visual font sizes
  - **Link**: Restored distinct mappings (sm→text-sm, md→text-base, lg→text-lg, xl→text-xl)
  - **Input**: Fixed lg size mapping (lg→text-lg instead of text-base)
  - **Textarea**: Fixed lg and xl size mappings (lg→text-lg, xl→text-xl)
  - **Select**: Fixed trigger, item, and label fontSize mappings for all sizes (md→text-base, lg→text-lg, xl→text-xl)
  - **FileUpload**: Fixed all preview fontSize mappings (sm→text-sm, md→text-base, lg→text-lg)
  - All FOUNDATION typography components now fully comply with Typography Authority
  - Added regression tests preventing future size aliasing
  - See: `docs/reports/audit/TYPOGRAPHY_SEMANTIC_SIZE_DRIFT_AUDIT.md`

### Changed

- **Link Component**: Refined variant model to prevent breaking changes
  - Added `variant='text'` as explicit inline variant (default)
  - Changed default variant from `'link'` to `'text'` to ensure inline behavior for text and navigation links
  - Reserved `variant='link'` exclusively for wrapper use cases (block-level layout)
  - Default Link now renders inline (inline-flex) instead of block-level
  - Wrapper use cases (wrapping Card/Panel/Box) require explicit `variant='link'`
  - See: `docs/architecture/INTERACTIVE_WRAPPER_LAYOUT_RULE.md`
- **Component Migration**: Form, surface, and overlay components stopped reading legacy CSS vars and used `--tm-*` only

## [2.0.6]

### Changed

- **Architecture**: Interactive Wrapper Layout Contract formally locked as mandatory architectural rule
  - Contract requires block-level layout for interactive components that wrap layout content (Card, Panel, Box)
  - Contract cross-referenced from Layout Authority and Architecture Lock documents
  - All violations resolved (Chip component classified as atomic, Link component already fixed)
  - See: `docs/architecture/INTERACTIVE_WRAPPER_LAYOUT_RULE.md`

## [2.0.5]

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
  - Fixed accessibility warnings in Dialog component tests by adding hidden Modal.Title for Radix UI validation
  - Fixed HTML validation error in ErrorText test (div cannot be child of p element)
  - Fixed React act() warning in Menu keyboard navigation test by using userEvent methods instead of direct focus() calls

- **TypeScript & Tests**:
  - Fixed type errors in Storybook stories and tests.
  - Resolved FocusTrap export path and type compatibility issues.
  - Fixed nested button warnings and React `act()` test issues.

- **CI/CD**:
  - Fixed duplicate quality checks in CI/CD workflow for feature branches (removed push trigger, kept only pull_request)

- **Storybook**:
  - Added `next/link` mock to prevent runtime errors.
  - Improved story configuration and developer experience.
  - Fixed hardcoded NODE_ENV in Storybook configuration to properly detect production builds

### Changed

- **Canonical List Components**:
  - `List` and `ListItem` are now the recommended components for all vertical lists.
  - Existing internal list usages have been migrated to these components.

- **Spinner Classification**:
  - Spinner component is now categorized under **controls** instead of **overlays**.
  - Public API remains unchanged — no breaking changes for consumers.

- **Storybook Improvements**:
  - Enhanced visual clarity and interaction feedback in Flex, Grid, and Stack stories.

- **Documentation**:
  - Updated README.md to reflect current release version (changed from v2.0.3 to v2.0.5).

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
