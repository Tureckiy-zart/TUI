# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

## [0.0.1] - 2025-01-29

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
