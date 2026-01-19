# Theme System Architecture (runtime)

**Date:** 2025-12-30  
**Last Updated:** 2026-01-17  
**Status:** CURRENT (runtime implementation)  
**Purpose:** Describes the actual theme architecture in the current code

---

## Key reality

The theme is applied at runtime via JS and CSS variable assignment.  
Theme CSS files (`theme.*.css`) are not used at runtime.

## Current state

- REQUIRED Canon Core v1 `--tm-*` coverage is complete at runtime.
- A build-time validator (`theme:validate:tm`) is enforced in CI.
- Next steps focus on migrating components off legacy tokens.

---

## Canonical model (as implemented)

### DOM attributes

`applyDocumentTheme()` sets attributes on `<html>`:

- `data-mode`: `day | night`
- `data-theme-name`: `default | dark | brand`
- `data-theme`: duplicates `data-mode` (secondary attribute)
- `class="dark"`: set for `night` for Tailwind

### Token sources

Tokens are JS objects in `src/FOUNDATION/tokens/*`.  
They are merged with theme/brand overrides and applied in `updateCSSVariablesFromTokens()`.

### Token application

`updateCSSVariablesFromTokens(mode)` synchronously sets CSS variables:

- legacy variables (`--background`, `--foreground`, `--border`, `--ring`, ...)
- surface/text/semantic groups (`--surface-*`, `--text-*`, `--semantic-*`)
- color scales (`--primary-*`, `--secondary-*`, `--accent-*`)
- Runtime emits 100% of REQUIRED Canon Core v1 `--tm-*` tokens (dev-guard on missing/empty in dev)

The full list of emitted variables is in `src/FOUNDATION/theme/applyMode.ts`.

---

## Runtime Invariants

Runtime snapshot = the merged token map used to compute required `--tm-*` values.

- `applyMode` emits 100% of REQUIRED Canon Core v1 `--tm-*` tokens synchronously on `document.documentElement`.
- `src/FOUNDATION/tokens/required-tokens.ts` is the required registry for the contract.
- Dev-guard validates `REQUIRED_THEME_TOKENS` and throws on missing/empty required tokens in development.
- Build-time validator (`theme:validate:tm`) checks every (mode x themeName x brandId + none) combo and fails CI on any gap.
- Shared snapshot assembly lives in `src/FOUNDATION/theme/runtimeTmSnapshot.ts` and is used by runtime and build-time validation.
- Derived/product/detail tokens are not REQUIRED (see `docs/theming/TM_TOKEN_CONTRACT_V1.md`).

---

## ThemeProvider (runtime controller)

`ThemeProvider`:

- stores `mode` (`day|night`) and `theme` (`default|dark|brand`)
- reads and writes `localStorage` (`tm_mode`, `tm_theme`, `tm_brand`)
- calls `applyDocumentTheme()` on changes
- registers default brands (`neon`, `minimal`)

File: `src/FOUNDATION/theme/ThemeProvider.tsx`

---

## Themes and brands

Themes/brands are defined in `src/themes/*`:

- `default.ts`, `dark.ts`, `brand.ts`
- `neon.ts`, `minimal.ts`

Brand overrides are applied via `src/themes/brand_engine.ts`.

---

## SSR and sync initialization

For early init there is `initThemeSync()` in `applyMode.ts`:

- reads `data-mode` or `localStorage`
- synchronously sets CSS variables
- runs before first render

`ThemeProvider` is a client-only component.

---

## Theme Contract v1 and registry

`src/FOUNDATION/tokens/required-tokens.ts` is the tooling/contract registry.  
Runtime emits 100% of REQUIRED Canon Core v1 `--tm-*` tokens via `applyMode`.
Missing/empty required tokens trigger a dev-time error (dev-guard).
Build-time validation is enforced by `scripts/theme/validate-tm-contract.ts`.
Coverage report: `artifacts/reports/TM_CONTRACT_COVERAGE_REPORT.md`.

---

## Where to verify

- `src/FOUNDATION/theme/applyMode.ts`
- `src/FOUNDATION/theme/runtimeTmSnapshot.ts`
- `src/FOUNDATION/theme/ThemeProvider.tsx`
- `src/FOUNDATION/tokens/*`
- `src/themes/*`
- `src/themes/registry.ts`
- `scripts/theme/validate-tm-contract.ts`
- `.github/workflows/quality.yml`

