# Theme Tokens Format (runtime implementation)

This document describes the actual theme system in the current code. The theme
is applied at runtime via JS and CSS variable assignment, not via prebuilt theme
CSS files.

## What a theme is today

- **Theme = JS token set + overrides**, applied in `applyDocumentTheme()`.
- CSS variables are set by `updateCSSVariablesFromTokens()`.
- Theme CSS files in `src/EXTENSIONS/themes/` are not used at runtime.

**Code locations:**
- `src/FOUNDATION/theme/applyMode.ts`
- `src/FOUNDATION/theme/ThemeProvider.tsx`
- `src/themes/*` (themes and brands)

## DOM attributes

Current attribute scheme on `<html>`:

- `data-mode`: `day | night`
- `data-theme-name`: `default | dark | brand`
- `data-theme`: duplicates `data-mode` (secondary attribute)

This matches the logic in `applyMode.ts`.

## Where token values come from

`updateCSSVariablesFromTokens(mode)` sets CSS variables on `document.documentElement`:

- **Legacy base variables:** `--background`, `--foreground`, `--card`, `--popover`, `--border`, `--ring`, etc.
- **Surface/Text/Semantic groups:** `--surface-*`, `--text-*`, `--tm-status-*`, `--chart-*`
- **Color scales:** `--primary-*`, `--secondary-*`, `--accent-*`
- **Semantic TM tokens:** 100% REQUIRED Canon Core v1 `--tm-*` (dev-guard on missing/empty in dev)

The full list of emitted variables is in:
- `src/FOUNDATION/theme/applyMode.ts`

## Token sources

Tokens come from JS objects in `src/FOUNDATION/tokens/*` and can be overridden by themes:

- `src/FOUNDATION/tokens/colors.ts`
- `src/FOUNDATION/tokens/motion/v2`
- `src/FOUNDATION/tokens/spacing.ts`
- `src/FOUNDATION/tokens/radius.ts`
- `src/FOUNDATION/tokens/shadows.ts`
- `src/FOUNDATION/tokens/typography.ts`

## Themes and brands

Current themes and brands live in `src/themes`:

- `src/themes/default.ts`
- `src/themes/dark.ts`
- `src/themes/brand.ts`
- `src/themes/neon.ts`
- `src/themes/minimal.ts`

`ThemeProvider` registers brands and applies brand overrides via `brand_engine`.

## required-tokens.ts registry

`src/FOUNDATION/tokens/required-tokens.ts` is the tooling/contract registry.
Runtime emits 100% of REQUIRED Canon Core v1 `--tm-*` tokens via `applyMode`.
Missing/empty required tokens trigger a dev-time error (dev-guard).
Build-time validation runs via `theme:validate:tm` and writes
`artifacts/reports/TM_CONTRACT_COVERAGE_REPORT.md`.

## Runtime Invariants

Runtime snapshot = the merged token map used to compute required `--tm-*` values.

- `applyMode` emits 100% of REQUIRED Canon Core v1 `--tm-*` tokens synchronously on `document.documentElement`.
- `required-tokens.ts` is the required registry for the contract.
- Dev-guard validates `REQUIRED_THEME_TOKENS` and throws on missing/empty required tokens in development.
- Build-time validator (`theme:validate:tm`) checks every (mode x themeName x brandId + none) combo and fails CI on any gap.
- Shared snapshot assembly lives in `src/FOUNDATION/theme/runtimeTmSnapshot.ts` and is used by runtime and build-time validation.
- Derived/product/detail tokens are not REQUIRED (see `docs/theming/TM_TOKEN_CONTRACT_V1.md`).

## Quick example

```ts
import { ThemeProvider } from "@/FOUNDATION/theme";

// ThemeProvider manages data-mode/data-theme-name and applies CSS variables
```

```html
<html data-mode="day" data-theme="day" data-theme-name="default"></html>
```

## How to verify

- `src/FOUNDATION/theme/applyMode.ts`
- `src/FOUNDATION/theme/ThemeProvider.tsx`
- `src/themes/*`

