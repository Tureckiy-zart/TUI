# ADR: Disabled Semantic Tokens (runtime)

**Date:** 2025-12-30  
**Last Updated:** 2026-01-17  
**Status:** Accepted and Implemented  
**Decision:** Runtime uses explicit disabled tokens

---

## Context

Disabled state must be expressed with explicit tokens rather than opacity tricks.
This is required for accessibility and stable semantics.

---

## Current state

Runtime emits:

- `--tm-disabled`
- `--tm-disabled-foreground`

Sources:
- `src/FOUNDATION/tokens/colors.ts`
- `src/FOUNDATION/theme/applyMode.ts`

---

## What this means

- Runtime emits 100% of REQUIRED Canon Core v1 `--tm-*` tokens via `applyMode`.
- Missing/empty required tokens trigger a dev-time error (dev-guard).
- `required-tokens.ts` remains the build-time/contract reference.

---

## Rationale

- Opacity does not provide stable semantics
- Disabled state must be controlled as a color token
- Better for WCAG and enterprise requirements

---

## Verification

- `src/FOUNDATION/theme/applyMode.ts` (CSS variable assignment)
- `src/FOUNDATION/tokens/colors.ts` (disabled values)
