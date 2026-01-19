# Token Naming Decision (ADR) - current reality

**Date:** 2025-12-30  
**Last Updated:** 2026-01-17  
**Status:** Decision Record  
**Type:** Architecture Decision Record (Mini-ADR)

---

## Reality Check (important)

- Runtime uses a mix of legacy and `--tm-*` tokens.
- Runtime emits 100% of REQUIRED Canon Core v1 `--tm-*` tokens via `applyMode`.
- Missing/empty required tokens trigger a dev-time error (dev-guard).

---

## Context

We need a stable prefix for semantic CSS variables. The `--tm-` prefix (Tenerife Music)
remains valid and is fully applied for REQUIRED tokens at runtime.

---

## Decision

**Primary Prefix:** `--tm-`

**Reasons:**
- brand-tied
- short
- already used in runtime for REQUIRED tokens

---

## Current implementation (facts)

What is emitted at runtime:

- 100% REQUIRED Canon Core v1 `--tm-*` tokens (see `required-tokens.ts`)
- Missing/empty required tokens trigger a dev-time error (dev-guard)

Source: `src/FOUNDATION/theme/applyMode.ts`

---

## required-tokens.ts registry

`src/FOUNDATION/tokens/required-tokens.ts` is the build-time tooling/contract registry.  
Runtime emits 100% of REQUIRED Canon Core v1 `--tm-*` tokens via `applyMode`.
Missing/empty required tokens trigger a dev-time error (dev-guard).
Build-time validator `theme:validate:tm` generates
`artifacts/reports/TM_CONTRACT_COVERAGE_REPORT.md` and fails CI on gaps.

---

## Naming rules (current)

- For new semantic tokens, use only `--tm-*`.
- The `-foreground` suffix is canonical.
- The `-fg` suffix is deprecated and should not be used in new code.

---

## Where to verify

- `src/FOUNDATION/theme/applyMode.ts`
- `src/FOUNDATION/tokens/colors.ts`
- `src/FOUNDATION/tokens/required-tokens.ts`
