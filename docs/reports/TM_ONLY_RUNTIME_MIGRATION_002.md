# TM_ONLY_RUNTIME_MIGRATION_002

**Status:** COMPLETE  
**Date:** 2026-01-21  
**Layer:** FOUNDATION  
**Priority:** P0  
**Scope:** TM-only runtime migration (no alias bridge)

---

## Summary

TM-only runtime variables are now the single source of truth for runtime color tokens.
Legacy alias generation in `applyMode.ts` is removed, and global CSS references are migrated
to `--tm-*` tokens.

## Changes

- Removed legacy `--accent` / `--accent-foreground` alias bridge from runtime.
- Updated global selection/scrollbar styling to use `--tm-accent` / `--tm-accent-foreground`.
- Confirmed scoped component token files and tests already use `--tm-*` tokens.
- Added A11Y lock note for TM-only runtime enforcement.

## Files Touched

- `src/FOUNDATION/theme/applyMode.ts`
- `src/FOUNDATION/theme/global.css`
- `docs/architecture/locks/A11Y_LOCK.md`

## Validation

- Not run (recommended):
  - `pnpm -w typecheck`
  - `pnpm -w lint`
  - `pnpm run a11y:contrast`
  - Manual day/night theme switch smoke test
