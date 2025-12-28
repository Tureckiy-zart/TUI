# TUNG_TOKENCVA_ENFORCEMENT_POLICY_V1 — tokenCVA Enforcement Policy Report

**Status:** ✅ COMPLETE  
**Date Created:** 2025-12-28  
**Task:** TUNG_TOKENCVA_ENFORCEMENT_POLICY_V1  
**Type:** GOVERNANCE_AUTHORITY  
**Zone:** FOUNDATION  
**Priority:** HIGH

---

## Overview

This document defines the enforcement policy for `tokenCVA` raw utility validation, establishing clear boundaries between forbidden spacing utilities (ERROR level) and allowed dimension utilities (WARN level).

**Problem Statement:**
tokenCVA currently flags multiple raw Tailwind utilities without a formal authority defining which utilities are forbidden vs allowed, leading to unclear enforcement semantics.

**Solution:**
Define a clear enforcement policy separating spacing violations (ERROR) from allowed dimension/layout utilities (WARN).

---

## Enforcement Policy

### ERROR Level: Forbidden Spacing Utilities

**Status:** **ENFORCED** (must use semanticSpacing tokens)

The following spacing utilities are **FORBIDDEN** and trigger `console.error`:

- `p-*`, `px-*`, `py-*`, `pt-*`, `pb-*`, `pl-*`, `pr-*` (padding)
- `m-*`, `mx-*`, `my-*`, `mt-*`, `mb-*`, `ml-*`, `mr-*` (margin)
- `gap-*` (gap)
- `space-x-*`, `space-y-*` (space between)

**Rationale:**
- Spacing tokens exist via `semanticSpacing` system
- Spacing utilities MUST be tokenized to maintain design system consistency
- Violations are architectural errors, not warnings

**Exception:**
- `p-0`, `m-0` (zero spacing) are allowed as standard Tailwind classes
- Fractional values (`0.5`, `1.5`, `2.5`, `3.5`) are allowed as standard Tailwind spacing classes used in tokens

---

### WARN Level: Allowed Dimension Utilities

**Status:** **ADVISORY** (allowed until dimension token system exists)

The following dimension utilities are **ALLOWED** but trigger `console.warn` (advisory):

- `w-*`, `h-*` (width, height)
- `min-w-*`, `max-w-*`, `min-h-*`, `max-h-*` (min/max dimensions)
- `aspect-*` (aspect ratio)
- `size-*` (size utility)
- `vh/vw-based values` (viewport-relative dimensions)
- `pixel-thin separators` (e.g., `h-[1px]`, `h-[2px]`)

**Rationale:**
- Dimension tokens do not yet exist in the token system
- Raw utilities are allowed temporarily until a dimension token system is introduced
- Warnings serve as documentation that these will be tokenized in the future

**Allowed Patterns:**
- Semantic size tokens (`h-8`, `w-9`, etc.) - standard design system values
- Viewport-relative values (`vh`, `vw`, `%`) - legitimate design system values
- Relative units (`rem`, `em`) - legitimate design system values

**Forbidden Patterns:**
- Arbitrary values like `w-[123px]` or `h-[calc(...)]` (except viewport-relative or relative units)

---

## Implementation Details

### Code Changes

**File:** `src/FOUNDATION/lib/token-cva.ts`

1. **Pattern Separation:**
   - `FORBIDDEN_SPACING_PATTERNS` - ERROR level patterns (spacing + colors)
   - `ADVISORY_DIMENSION_PATTERNS` - WARN level patterns (dimensions)

2. **Validation Function:**
   - `validateTokenUsage()` now separates ERROR and WARN checks
   - ERROR violations use `console.error()` with clear messaging
   - WARN violations use `console.warn()` with advisory messaging

3. **Documentation:**
   - Added enforcement policy section explaining ERROR vs WARN levels
   - Updated JSDoc comments to reflect enforcement policy

### Test Updates

**File:** `src/FOUNDATION/lib/token-cva.test.ts`

- Updated tests to verify ERROR vs WARN separation
- Added tests for dimension utilities (WARN level)
- Added tests for spacing utilities (ERROR level)
- Tests verify `console.error` for spacing, `console.warn` for dimensions

---

## Why Warnings Exist

### Current State

tokenCVA validation exists to:
- Enforce token-based styling architecture
- Prevent hardcoded values that bypass the token system
- Maintain design system consistency

### Enforcement Levels

**ERROR (Forbidden):**
- Spacing utilities MUST use `semanticSpacing` tokens
- Color utilities MUST use color tokens
- These violations are architectural errors

**WARN (Advisory):**
- Dimension utilities are allowed temporarily
- Warnings document future tokenization intent
- No test failures for WARN-level violations

---

## What Is Enforced Now

### ✅ Enforced (ERROR Level)

1. **Spacing Utilities:**
   - All padding utilities (`p-*`, `px-*`, `py-*`, etc.)
   - All margin utilities (`m-*`, `mx-*`, `my-*`, etc.)
   - Gap utilities (`gap-*`)
   - Space utilities (`space-x-*`, `space-y-*`)

2. **Color Utilities:**
   - Raw Tailwind color utilities (`bg-red-500`, `text-blue-600`, etc.)
   - These bypass the color token system

### ⚠️ Advisory (WARN Level)

1. **Dimension Utilities:**
   - Width/height utilities (`w-*`, `h-*`)
   - Min/max dimension utilities (`min-w-*`, `max-w-*`, etc.)
   - Aspect ratio utilities (`aspect-*`)
   - Size utilities (`size-*`)

---

## What Is Deferred to Future Token Systems

### Dimension Token System (Future)

**Status:** Not yet implemented

**Planned Scope:**
- Width tokens (`w-sm`, `w-md`, `w-lg`, etc.)
- Height tokens (`h-sm`, `h-md`, `h-lg`, etc.)
- Min/max dimension tokens
- Aspect ratio tokens

**Migration Path:**
- When dimension token system is introduced, dimension utilities will move from WARN to ERROR level
- Existing dimension utilities will need migration to tokens
- WARN messages serve as documentation of future tokenization

---

## Foundation Lock Safety

**Status:** ✅ LOCK-SAFE

This policy change:
- ✅ Does not modify Foundation component behavior
- ✅ Does not change public APIs
- ✅ Does not require component refactors
- ✅ Only affects development-mode validation messaging
- ✅ Maintains backward compatibility

**Verification:**
- No Foundation components modified
- No behavior changes introduced
- Only documentation and validation messaging updated
- Tests updated to reflect new enforcement levels

---

## Acceptance Criteria Verification

| Criterion | Status | Notes |
|-----------|--------|-------|
| tokenCVA warnings are semantically meaningful | ✅ | ERROR vs WARN clearly separated |
| Spacing violations are clearly distinguished from dimension warnings | ✅ | Different console methods and messages |
| No mass refactors performed | ✅ | Only validation logic updated |
| Foundation remains LOCK-safe | ✅ | No component changes |

---

## Related Documents

- `src/FOUNDATION/lib/token-cva.ts` - Implementation
- `src/FOUNDATION/lib/token-cva.test.ts` - Tests
- `docs/architecture/CVA_CANONICAL_STYLE.md` - CVA Authority Contract
- `docs/architecture/SPACING_AUTHORITY.md` - Spacing Authority (semanticSpacing)

---

## Summary

This policy establishes clear enforcement boundaries for tokenCVA validation:

- **ERROR:** Spacing utilities MUST use tokens (enforced)
- **WARN:** Dimension utilities are allowed temporarily (advisory)

The separation provides:
- Clear architectural guidance
- Future migration path for dimension tokens
- Foundation Lock safety
- No breaking changes

**Status:** ✅ Policy implemented and documented.

