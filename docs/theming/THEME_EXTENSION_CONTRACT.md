# Theme Extension Contract (runtime)

**Date:** 2025-12-30  
**Last Updated:** 2026-01-17  
**Status:** CURRENT (runtime implementation)  
**Purpose:** How themes are extended in the current code

---

## Key reality

Theme extension currently happens via brands and overrides in `src/themes/*`,
not via theme CSS files.

- Brands are loaded through `brand_engine`
- Overrides are applied in `applyDocumentTheme()`
- CSS files in `src/EXTENSIONS/themes/` are not used

---

## How to add a new brand (current path)

1) Create a file in `src/themes/` (for example, `ocean.ts`).
2) Define a `ThemeOverride` (color scales and semantic tokens).
3) Register the brand in `ThemeProvider` (as done for `neon` and `minimal`).
4) Set the brand via `setBrand(brandId)`.

**Code locations:**
- `src/themes/brand_engine.ts`
- `src/themes/types.ts`
- `src/FOUNDATION/theme/ThemeProvider.tsx`

---

## Which tokens are actually used

`updateCSSVariablesFromTokens()` emits legacy and semantic tokens, including:

- `--background`, `--foreground`, `--border`, `--ring`, ...
- `--surface-*`, `--text-*`, `--semantic-*`
- `--primary-*`, `--secondary-*`, `--accent-*`
- Runtime emits 100% of REQUIRED Canon Core v1 `--tm-*` tokens (dev-guard on missing/empty in dev)

The full list is in `src/FOUNDATION/theme/applyMode.ts`.

---

## About `--tm-*` and extension tokens

Runtime emits 100% of REQUIRED Canon Core v1 `--tm-*` tokens via `applyMode`.
Missing/empty required tokens trigger a dev-time error (dev-guard).
Client `--tmx-*` tokens are not used by default at runtime and are not validated.

If you want to use custom CSS variables, do so in product code and do not rely
on the runtime contract.

---

## Validation and coverage

- Build-time validator: `theme:validate:tm` (`scripts/theme/validate-tm-contract.ts`)
- Snapshot assembly shared in `src/FOUNDATION/theme/runtimeTmSnapshot.ts`
- Themes/brands registry: `src/themes/registry.ts`
- Coverage report: `artifacts/reports/TM_CONTRACT_COVERAGE_REPORT.md`

---

## Not current reality

- Theme CSS files like `theme.<palette>-<mode>.css`
- `data-theme="<palette>-<mode>"`
- mandatory parity checks for theme CSS files

These belong to tooling/contract and do not drive runtime today.

---

## Where to verify

- `src/FOUNDATION/theme/applyMode.ts`
- `src/FOUNDATION/theme/ThemeProvider.tsx`
- `src/themes/*`
