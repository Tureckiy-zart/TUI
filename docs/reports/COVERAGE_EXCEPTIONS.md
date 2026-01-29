# Coverage Exceptions Documentation

**Date Created:** 2026-01-28  
**Task:** TUI_TEST_COVERAGE_CANONICAL_001  
**Block:** BLOCK_05_CANONICAL_EXCEPTIONS

## Purpose

This document formally locks areas where full test coverage is architecturally meaningless or unnecessary. These exceptions are canonical and should not be questioned without architectural justification.

## Exceptions

### 1. Pure Token Definition Files

**Scope:** Pure token constant definitions under `src/FOUNDATION/tokens/` (see Files list below)

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

- `src/FOUNDATION/tokens/colors.ts`
- `src/FOUNDATION/tokens/spacing.ts`
- `src/FOUNDATION/tokens/opacity.ts`
- `src/FOUNDATION/tokens/motion.ts`
- `src/FOUNDATION/tokens/radius.ts`
- `src/FOUNDATION/tokens/shadows.ts`
- `src/FOUNDATION/tokens/gradients.ts`
- `src/FOUNDATION/tokens/theme.ts`
- `src/FOUNDATION/tokens/types/index.ts`
- `src/FOUNDATION/tokens/components/**/*.ts`

**Explicitly not included (runtime logic or tooling):**

- `src/FOUNDATION/tokens/required-tokens.ts`
- `src/FOUNDATION/tokens/css-variables.ts`
- `src/FOUNDATION/tokens/state-matrix.ts`
- `src/FOUNDATION/tokens/states.ts`
- `src/FOUNDATION/tokens/typography.ts`
- `src/FOUNDATION/tokens/index.ts`
- `src/FOUNDATION/tokens/GradientTokens.stories.tsx`

### 2. Static Theme Exports

**Scope:** Static theme-only files in `src/themes/` (see Files list below)

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
- `src/themes/--help.ts`

**Explicitly not included (logic or wiring):**

- `src/themes/brand_engine.ts`
- `src/themes/registry.ts`
- `src/themes/index.ts`
- `src/themes/types.ts`

### 3. Type-Only Exports

**Scope:** All `export type` statements

**Rationale:**

- TypeScript types are compile-time only
- No runtime behavior to test
- Type correctness is verified through TypeScript compilation

**Coverage Strategy:**

- No coverage required (types are erased at runtime)
- Type correctness is verified through `tsc --noEmit`

### 4. Barrel Export Modules (Index Files)

**Scope:** `src/**/index.ts` and `src/**/*.index.ts`

**Rationale:**

- These files are pure re-export barrels (public API wiring), not behavior
- The execution contract is: “import does not crash”
- With v8 coverage, re-export-only ESM modules are frequently reported as 0% (no executable statements),
  which makes numeric thresholds impossible without adding artificial runtime code (forbidden by policy)

**Coverage Strategy:**

- Excluded from numeric coverage thresholds
- Verified via execution-only import tests:
  - `src/__tests__/index-public-api-execution.test.ts`

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
