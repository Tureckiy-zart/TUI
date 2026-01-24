# Token Domain Completeness Audit 028

**Task:** TUI_FOUNDATION_TOKEN_DOMAIN_COMPLETENESS_AUDIT_028  
**Layer:** FOUNDATION  
**Status:** FACTUAL AUDIT (no changes)  
**Date:** 2026-01-21

## Summary

- Component token files (FOUNDATION): 50
- Component token constants (`*_TOKENS`): 53
- Component/PATTERN/DOMAIN/PRIMITIVES TSX files checked (non-test, non-story): 51 files with **no** `_TOKENS` usage
- Distribution of no-token files by area:
  - COMPOSITION: 15
  - DOMAIN: 19
  - PATTERNS: 12
  - PRIMITIVES: 5

This audit only reports coverage/absence of token usage; it does not assert correctness or propose fixes.

## Section A: Components Without `_TOKENS` Usage (Potential Coverage Gaps)

Files in `src/PRIMITIVES`, `src/COMPOSITION`, `src/DOMAIN`, `src/PATTERNS` (non-test, non-story) that do **not** reference `_TOKENS`:

**PRIMITIVES (5):**
- `src/PRIMITIVES/Radio/RadioGroup.tsx`
- `src/PRIMITIVES/Field/Field.tsx`
- `src/PRIMITIVES/ErrorText/ErrorText.tsx`
- `src/PRIMITIVES/NavLink/NavLink.tsx`
- `src/PRIMITIVES/FormGroup/FormGroup.tsx`

**COMPOSITION (15):**
- `src/COMPOSITION/focus/FocusTrap/FocusTrap.tsx`
- `src/COMPOSITION/controls/AspectRatio/AspectRatio.tsx`
- `src/COMPOSITION/layout/Container/Container.tsx`
- `src/COMPOSITION/layout/Stack/Stack.tsx`
- `src/COMPOSITION/overlays/Portal.tsx`
- `src/COMPOSITION/layout/SidebarLayout/SidebarLayout.tsx`
- `src/COMPOSITION/layout/Inset/Inset.tsx`
- `src/COMPOSITION/layout/Inline/Inline.tsx`
- `src/COMPOSITION/layout/List/List.tsx`
- `src/COMPOSITION/layout/Grid/Grid.tsx`
- `src/COMPOSITION/layout/Box/Box.tsx`
- `src/COMPOSITION/a11y/VisuallyHidden/VisuallyHidden.tsx`
- `src/COMPOSITION/layout/ListItem/ListItem.tsx`
- `src/COMPOSITION/layout/Flex/Flex.tsx`
- `src/COMPOSITION/layout/Spacer/Spacer.tsx`

**DOMAIN (19):**
- `src/DOMAIN/admin/admin/Dashboard.tsx`
- `src/DOMAIN/admin/admin/UserManagement.tsx`
- `src/DOMAIN/section-builder/presets.tsx`
- `src/DOMAIN/section-builder/SectionBuilder.tsx`
- `src/DOMAIN/auth/auth/LoginForm.tsx`
- `src/DOMAIN/auth/auth/ProfileCard.tsx`
- `src/DOMAIN/controls/LanguageSelector/LanguageSelector.tsx`
- `src/DOMAIN/notifications/notifications/NotificationCenter.Trigger.tsx`
- `src/DOMAIN/notifications/notifications/NotificationCenter.List.tsx`
- `src/DOMAIN/notifications/notifications/useNotificationCenter.tsx`
- `src/DOMAIN/notifications/notifications/NotificationCenter.Provider.tsx`
- `src/DOMAIN/notifications/notifications/NotificationCenter.tsx`
- `src/DOMAIN/notifications/notifications/NotificationCenter.DismissAll.tsx`
- `src/DOMAIN/auth/auth/RegisterForm.tsx`
- `src/DOMAIN/sections/sections/ArticlesSection.tsx`
- `src/DOMAIN/sections/sections/FeatureSection.tsx`
- `src/DOMAIN/sections/sections/HeroSection.tsx`
- `src/DOMAIN/sections/sections/CTASection.tsx`
- `src/DOMAIN/sections/sections/TrendingSection.tsx`

**PATTERNS (12):**
- `src/PATTERNS/tables/table/TableBody.tsx`
- `src/PATTERNS/filters/filters/DateRangePicker.tsx`
- `src/PATTERNS/filters/filters/SearchInput.tsx`
- `src/PATTERNS/filters/filters/FilterSelect.tsx`
- `src/PATTERNS/filters/filters/PriceRangeSlider.tsx`
- `src/PATTERNS/filters/filters/SearchFilters.tsx`
- `src/PATTERNS/filters/filters/FilterBar.tsx`
- `src/PATTERNS/menus/menus/NavigationMenu.tsx`
- `src/PATTERNS/menus/menus/hover-card/HoverCardContent.tsx`
- `src/PATTERNS/menus/menus/hover-card/HoverCardTrigger.tsx`
- `src/PATTERNS/menus/menus/hover-card/HoverCardRoot.tsx`
- `src/PATTERNS/states/ConsentBanner/ConsentBanner.tsx`

## Section B: Component Token Constants With Minimal Usage

**Definition-only (count == 1):**
- `RADIUS_TOKENS` (comment only)
- `SHADOW_TOKENS` (comment only)
- `SPACING_TOKENS` (comment only)

**Low usage (2–3 matches total):**
- `CODE_TOKENS` (3)

## Section C: Coverage Signals (Factual)

- `_TOKENS` usage occurrences in `src/PRIMITIVES`, `src/COMPOSITION`, `src/DOMAIN`, `src/PATTERNS`: 1584 matches.
- Component token constants defined in `src/FOUNDATION/tokens/components/**`: 53.

## Evidence: Commands Executed

- `rg --files -g "*.tsx" src/PRIMITIVES src/COMPOSITION src/DOMAIN src/PATTERNS`
- `rg -n "export const .*_TOKENS" src/FOUNDATION/tokens/components -g "*.ts"`
- `rg -n "FOUNDATION/tokens/components" src -g "*.ts" -g "*.tsx"`
- `rg -n "_TOKENS" src -g "*.ts" -g "*.tsx"`
- `rg -c -- "_TOKENS" src`

