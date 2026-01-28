# Coverage Exceptions Documentation

**Date Created:** 2026-01-28  
**Task:** TUI_TEST_COVERAGE_CANONICAL_001  
**Block:** BLOCK_05_CANONICAL_EXCEPTIONS

## Purpose

This document formally locks areas where full test coverage is architecturally meaningless or unnecessary. These exceptions are canonical and should not be questioned without architectural justification.

## Exceptions

### 1. Pure Token Definition Files

**Scope:** `src/FOUNDATION/tokens/**`

**Rationale:**
- These files contain pure token definitions (objects, constants, type definitions)
- No runtime logic or behavior to test
- Token values are validated through TypeScript types and runtime smoke tests
- Full behavioral testing would require visual regression testing, which is out of scope

**Coverage Strategy:**
- Execution-only import coverage is sufficient
- Importing these files in tests verifies they can be loaded without errors
- No behavioral assertions required

**Files:**
- `src/FOUNDATION/tokens/**/*.ts` (all token definition files)
- Token component files (e.g., `button.ts`, `input.ts`, etc.)

### 2. Static Theme Exports

**Scope:** `src/themes/*.ts`

**Rationale:**
- These files export static theme configuration objects
- No runtime logic or behavior to test
- Theme structure is validated through schema validation (tested in Foundation runtime smoke tests)
- Theme values are validated through TypeScript types

**Coverage Strategy:**
- Execution-only import coverage is sufficient
- Importing these files in tests verifies they can be loaded without errors
- No behavioral assertions required

**Files:**
- `src/themes/default.ts`
- `src/themes/dark.ts`
- `src/themes/brand.ts`
- `src/themes/minimal.ts`
- `src/themes/neon.ts`
- Other static theme files

### 3. Type-Only Exports

**Scope:** All `export type` statements

**Rationale:**
- TypeScript types are compile-time only
- No runtime behavior to test
- Type correctness is verified through TypeScript compilation

**Coverage Strategy:**
- No coverage required (types are erased at runtime)
- Type correctness is verified through `tsc --noEmit`

## Coverage Requirements

For files in exception categories:

1. **Execution-only import coverage** is sufficient
2. **No behavioral assertions** are required
3. **No snapshot testing** is required
4. **No visual regression testing** is required

## Verification

These exceptions are verified through:

1. **Execution-only tests** that import the files (e.g., `index-public-api-execution.test.ts`)
2. **TypeScript compilation** (`tsc --noEmit`) for type correctness
3. **Runtime smoke tests** for token/theme usage (e.g., `foundation-runtime-smoke.test.ts`)

## Maintenance

This document should be updated if:

1. New exception categories are identified
2. Existing exceptions are no longer valid (e.g., if logic is added to previously pure files)
3. Architectural changes require re-evaluation of exceptions

## Related Documents

- `docs/architecture/FOUNDATION_LOCK.md` - Foundation layer lock
- `docs/architecture/ARCHITECTURE_LOCK.md` - Architecture lock
- `src/__tests__/index-public-api-execution.test.ts` - Execution-only import tests
- `src/__tests__/foundation-runtime-smoke.test.ts` - Foundation runtime smoke tests
