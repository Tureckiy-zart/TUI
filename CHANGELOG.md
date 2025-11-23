# 1.0.0 (2025-11-23)

### Bug Fixes

- add vite.config.ts to tsconfig and fix preset type issues ([498df15](https://github.com/Tureckiy-zart/tenerife-ui/commit/498df15475c0a926ca634548fb13c089456581f5))
- apply all code review fixes (U1_APPLY_CODE_REVIEW_FIXES) ([fd2bed4](https://github.com/Tureckiy-zart/tenerife-ui/commit/fd2bed439b0f720b7a0fe9252b05acf6f0c8f6b7))
- **ci:** add required environment configuration for GitHub Pages deployment ([872a287](https://github.com/Tureckiy-zart/tenerife-ui/commit/872a28799c6243cc2f9de8c1c5005baa2a8d3709))
- **ci:** add Storybook configuration files ([1e0816b](https://github.com/Tureckiy-zart/tenerife-ui/commit/1e0816b7c8ae57f1143f55d9a820c06731d0ab07))
- **ci:** add workflow_dispatch to release workflow ([b1e8ddf](https://github.com/Tureckiy-zart/tenerife-ui/commit/b1e8ddfef7f30e345d6e8fdf47a46868fab31ba1))
- **ci:** enable GitHub Pages automatically in workflow ([b51f1bd](https://github.com/Tureckiy-zart/tenerife-ui/commit/b51f1bdd437f07e878b14f168a59309456153296))
- **ci:** fix pnpm installation order in storybook-deploy workflow ([9720ae8](https://github.com/Tureckiy-zart/tenerife-ui/commit/9720ae8e0609d535a1e0c902f8ae908f4966424b))
- **ci:** improve NPM_TOKEN authentication and error messages ([0ac28f9](https://github.com/Tureckiy-zart/tenerife-ui/commit/0ac28f96b7499bd3a661c77c54d241d33005d401))
- **ci:** remove enablement parameter and add deployments permission ([4e67d47](https://github.com/Tureckiy-zart/tenerife-ui/commit/4e67d47c2c395d0c608ac506f4a980af5287935d))
- **ci:** update Node.js version to 20 for semantic-release compatibility ([d262ff8](https://github.com/Tureckiy-zart/tenerife-ui/commit/d262ff8c192662153e83a60ca4e1b005e0d78e0c))
- **ci:** update workflows for granular npm tokens support ([9ff272f](https://github.com/Tureckiy-zart/tenerife-ui/commit/9ff272f90b201ee5aec5fc9b15766d970c27e29c))
- correct esbuild banner configuration to use string instead of object ([153f485](https://github.com/Tureckiy-zart/tenerife-ui/commit/153f48503cb879a7c610a2bdc1b739ab058c2d91))
- **release:** disable Husky hooks in CI to prevent semantic-release failures ([ac9d3d5](https://github.com/Tureckiy-zart/tenerife-ui/commit/ac9d3d5f5eb5a810c5940a46e6aa363a49451435))
- **release:** reorder steps - install pnpm before Node.js cache setup ([ecb1c75](https://github.com/Tureckiy-zart/tenerife-ui/commit/ecb1c75b0bf1441160c4919ffdc6376f012f663b))
- **release:** update Node.js to v20 and change to manual workflow_dispatch trigger ([bf2d4d0](https://github.com/Tureckiy-zart/tenerife-ui/commit/bf2d4d0e91f21e06fe897e9dbe7ac1bec66e77da))
- **release:** update Node.js to v22 for semantic-release compatibility ([8514e3e](https://github.com/Tureckiy-zart/tenerife-ui/commit/8514e3e8ee2ce2114c9b4c0b38a017c519bdbcbe))
- **release:** update semantic-release config with explicit repository URL and develop branch support ([2663669](https://github.com/Tureckiy-zart/tenerife-ui/commit/2663669344f3a5fa92600d28bbd50dac97c785f9))
- resolve duplicate import in applyMode.ts ([31ae2dc](https://github.com/Tureckiy-zart/tenerife-ui/commit/31ae2dc7997d1cf55d8dff0bb728b87f3716d12b))
- resolve TypeScript errors in build process ([6b16991](https://github.com/Tureckiy-zart/tenerife-ui/commit/6b16991cf737e8512948978366967b31671b2c9f))
- restore rootDir to prevent incorrect dist structure ([9ed3dcb](https://github.com/Tureckiy-zart/tenerife-ui/commit/9ed3dcb0fe2b8c0edd12e72219b320eced409a67))
- update pnpm version to 9 in workflows ([9c759c8](https://github.com/Tureckiy-zart/tenerife-ui/commit/9c759c80c76cb6224d0aebbcd08ad05ad5266b00))
- update pre-push hook to prevent recursive push issues ([edcad99](https://github.com/Tureckiy-zart/tenerife-ui/commit/edcad99480fdcc60a95873c46879dbcfa3201136))
- update scripts and documentation ([fccaa62](https://github.com/Tureckiy-zart/tenerife-ui/commit/fccaa623b47523521ffaee3ff715d5fc2d10466b))
- use env variable for NPM_TOKEN check in workflow ([ffde321](https://github.com/Tureckiy-zart/tenerife-ui/commit/ffde3211768b0681667a20ce8c1ee16c47ab11a6))

### Features

- add master tasks structure and project documentation ([be68de6](https://github.com/Tureckiy-zart/tenerife-ui/commit/be68de6ee29a2b71a50989f0c058c1ca397e517e))
- add subtask files and task status tracking system ([3b85611](https://github.com/Tureckiy-zart/tenerife-ui/commit/3b856111bb0ac1402b8bd9474c45d4db8893270a))
- add Tenerife UI master tasks and rename example file ([0581892](https://github.com/Tureckiy-zart/tenerife-ui/commit/0581892f20a1350cb9c94be03d4247ab01049203))
- **audit:** Complete Full Review Pipeline audit ([3ca45b5](https://github.com/Tureckiy-zart/tenerife-ui/commit/3ca45b5cd97f68a92a2e2f5d43d778f6fb1380f0))
- Complete code review audit (CODE_REVIEW_FULL) ([bcdf9cd](https://github.com/Tureckiy-zart/tenerife-ui/commit/bcdf9cd167cb5faad8aa7369f62165f99a989126))
- Complete U1 token migration - Final cleanup phase ([e597f36](https://github.com/Tureckiy-zart/tenerife-ui/commit/e597f368526df01e6a69bff6aacf099b77aaa7f6))
- **infra:** complete release pipeline audit ([31f0faf](https://github.com/Tureckiy-zart/tenerife-ui/commit/31f0faf4fa69ed7cb19caa484264eecd9c6637bc))
- **release:** configure semantic-release to run only on release branch ([01145ea](https://github.com/Tureckiy-zart/tenerife-ui/commit/01145ea30161a9747172705f9a26e1599faa08c1))
- U0 audit and U1 Phase 1 token migration ([844010a](https://github.com/Tureckiy-zart/tenerife-ui/commit/844010ae7d90c8f7c23b097a0eaf40df6ae9476e))
- настройка системы правил Cursor для UI библиотеки ([8f66bf5](https://github.com/Tureckiy-zart/tenerife-ui/commit/8f66bf5f3f4f9abfdc96c56148dd6c63ff7b8dce))

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- **Modals**: Modal, Dialog, ConfirmDialog, ModalProvider, CustomDialog, SimpleModal
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
