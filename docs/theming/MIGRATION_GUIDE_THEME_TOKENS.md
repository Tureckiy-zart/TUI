# Migration Guide: Theme Tokens (current state)

**Date:** 2025-12-30  
**Last Updated:** 2026-01-17  
**Status:** CURRENT (migration-in-progress)  
**Purpose:** Reflects the real token state and the migration path

---

## Current state

Runtime emits **legacy tokens** and 100% REQUIRED `--tm-*` tokens:

- legacy: `--background`, `--foreground`, `--border`, `--ring`, `--card`, `--popover`, ...
- semantic TM: 100% REQUIRED Canon Core v1 `--tm-*` (dev-guard on missing/empty in dev)

The full list of emitted variables is in:
- `src/FOUNDATION/theme/applyMode.ts`

**Important:** The full REQUIRED `--tm-*` set from `required-tokens.ts` is emitted by runtime;
missing/empty triggers a dev-time error (dev-guard).
Build-time validation (`theme:validate:tm`) checks all mode/theme/brand combos and fails CI on gaps,
writing `artifacts/reports/TM_CONTRACT_COVERAGE_REPORT.md`.

---

## Runtime Invariants

Runtime snapshot = the merged token map used to compute required `--tm-*` values.

- `applyMode` emits 100% of REQUIRED Canon Core v1 `--tm-*` tokens synchronously on `document.documentElement`.
- `required-tokens.ts` is the required registry for the contract.
- Dev-guard validates `REQUIRED_THEME_TOKENS` and throws on missing/empty required tokens in development.
- Build-time validator (`theme:validate:tm`) checks every (mode x themeName x brandId + none) combo and fails CI on any gap.
- Shared snapshot assembly lives in `src/FOUNDATION/theme/runtimeTmSnapshot.ts` and is used by runtime and build-time validation.
- Derived/product/detail tokens are not REQUIRED (see `docs/theming/TM_TOKEN_CONTRACT_V1.md`).

---

## Migration goals

- one semantic `--tm-*` set for all UI layers
- remove legacy `--background`/`--foreground` usage in components
- consistent semantics and token parity

This is implemented for REQUIRED `--tm-*` tokens; migration is now about component usage.

---

## What remains

- Migrate components off legacy tokens to `--tm-*` usage everywhere.
- Remove legacy token fallbacks where they are no longer needed.
- Align extensions governance to treat `--tmx-*` as product-only tokens.

---

## Practical guidance

When updating a component:

1) **Prefer `--tm-*`** when they are already emitted at runtime.
2) **Do not remove legacy usage** if the component still depends on legacy tokens.
3) Do not introduce new local variables in components; use tokens instead.

---

## Real token sources

- `src/FOUNDATION/tokens/colors.ts`
- `src/FOUNDATION/tokens/spacing.ts`
- `src/FOUNDATION/tokens/radius.ts`
- `src/FOUNDATION/tokens/typography.ts`
- `src/FOUNDATION/theme/applyMode.ts`
- `src/FOUNDATION/theme/runtimeTmSnapshot.ts`
- `src/themes/registry.ts`

---

## Example (current reality)

```tsx
// Good: semantic tokens
const Button = styled.button`
  background-color: hsl(var(--tm-primary));
  color: hsl(var(--tm-primary-foreground));
`;
```

```tsx
// Acceptable for now: legacy tokens (if no tm equivalent is used in the component)
const Card = styled.div`
  background-color: var(--card);
  color: var(--card-foreground);
`;
```

---

## About required-tokens.ts

`src/FOUNDATION/tokens/required-tokens.ts` is the tooling/contract registry.
Runtime emits 100% of REQUIRED Canon Core v1 `--tm-*` tokens via `applyMode`.
Missing/empty required tokens trigger a dev-time error (dev-guard).

---

## Where to verify

- `src/FOUNDATION/theme/applyMode.ts`
- `src/FOUNDATION/theme/ThemeProvider.tsx`
- `src/FOUNDATION/tokens/*`
- `src/themes/*`

