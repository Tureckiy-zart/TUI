# Fix & Canonization Plan

**Task:** TUI_FOUNDATION_TOKEN_THEME_FULL_AUDIT_012  
**Date:** 2026-01-22  
**Type:** AUDIT DELIVERABLE (R3)

---

## Purpose

This document provides a step-by-step plan for fixing identified issues and preparing the Foundation token and theme system for LOCK. **NO CODE CHANGES** are included - this is a planning document only.

---

## Phase 1: Critical Fixes (P0)

### Status: ✅ No P0 Issues

No P0 (BLOCKER) issues were identified. Phase 1 is complete.

---

## Phase 2: High Priority Refactoring (P1)

### P1-1: Theme Runtime Duplication

**Issue:** `src/FOUNDATION/theme/spacing.ts`, `typography.ts`, `motion.ts` duplicate token definitions.

**Files to Modify:**
- `src/FOUNDATION/theme/spacing.ts` - Re-export from `src/FOUNDATION/tokens/spacing.ts` or deprecate
- `src/FOUNDATION/theme/typography.ts` - Re-export from `src/FOUNDATION/tokens/typography.ts` or deprecate
- `src/FOUNDATION/theme/motion.ts` - Re-export from `src/FOUNDATION/tokens/motion.ts` or deprecate

**Action Plan:**
1. Check if these files are imported anywhere
2. If unused: Deprecate and remove
3. If used: Re-export from tokens (single source of truth)
4. Update `src/FOUNDATION/theme/index.ts` exports if needed

**Dependencies:** None

**Estimated Effort:** 2-4 hours

**New TUNG Task Required:** `TUNG_FIX_THEME_DUPLICATION_P1_V1` (P1)

---

### P1-2: Legacy State Implementation

**Issue:** `src/FOUNDATION/theme/applyStates.ts` exists alongside `applyStateMatrix.ts`.

**Files to Modify:**
- `src/FOUNDATION/theme/applyStates.ts` - Deprecate
- `src/FOUNDATION/theme/applyStateMatrix.ts` - Ensure complete migration

**Action Plan:**
1. Search codebase for imports of `applyStates.ts`
2. Migrate all usage to `applyStateMatrix.ts`
3. Add deprecation notice to `applyStates.ts`
4. Remove `applyStates.ts` after migration complete
5. Update `src/FOUNDATION/theme/index.ts` if needed

**Dependencies:** None

**Estimated Effort:** 4-6 hours

**New TUNG Task Required:** `TUNG_DEPRECATE_LEGACY_STATE_APPLY_P1_V1` (P1)

---

### P1-3: Legacy CSS Variable Names

**Issue:** Legacy CSS variables (`--background`, `--foreground`, etc.) still emitted alongside `--tm-*`.

**Files to Modify:**
- `src/FOUNDATION/theme/applyMode.ts` - Remove legacy variable emission
- All component files using legacy variables - Migrate to `--tm-*`

**Action Plan:**
1. Search codebase for usage of legacy CSS variables
2. Create migration guide for components
3. Migrate components to `--tm-*` tokens
4. Remove legacy variable emission from `applyMode.ts`
5. Update documentation

**Dependencies:** Component migration required

**Estimated Effort:** 8-12 hours

**New TUNG Task Required:** `TUNG_MIGRATE_LEGACY_CSS_VARS_P1_V1` (P1)

---

## Phase 3: Medium Priority Cleanup (P2)

### P2-1: Authority Compliance Documentation

**Issue:** Some component token files lack explicit Authority compliance documentation.

**Files to Modify:**
- All `src/FOUNDATION/tokens/components/*.ts` files missing Authority comments

**Action Plan:**
1. Audit all component token files for Authority compliance comments
2. Add Authority compliance section to files missing it
3. Use consistent format across all files

**Dependencies:** None

**Estimated Effort:** 2-3 hours

**New TUNG Task Required:** `TUNG_ADD_AUTHORITY_DOCS_P2_V1` (P2)

---

### P2-2: Gradient Tokens Storybook File

**Issue:** `src/FOUNDATION/tokens/GradientTokens.stories.tsx` in tokens directory.

**Files to Modify:**
- `src/FOUNDATION/tokens/GradientTokens.stories.tsx` - Move or remove

**Action Plan:**
1. Determine if Storybook file is needed
2. If needed: Move to appropriate location (e.g., `src/COMPOSITION/` or docs)
3. If not needed: Remove

**Dependencies:** None

**Estimated Effort:** 1 hour

**New TUNG Task Required:** `TUNG_ORGANIZE_GRADIENT_STORIES_P2_V1` (P2)

---

### P2-3: Opacity Tokens Documentation

**Issue:** Opacity tokens only define `disabled`. Scope needs documentation.

**Files to Modify:**
- `src/FOUNDATION/tokens/opacity.ts` - Add scope documentation

**Action Plan:**
1. Document current scope (disabled only)
2. Document future expansion plans if any
3. Add examples of usage

**Dependencies:** None

**Estimated Effort:** 1 hour

**New TUNG Task Required:** `TUNG_DOCUMENT_OPACITY_SCOPE_P2_V1` (P2)

---

### P2-4: Theme CSS Files Cleanup

**Issue:** `src/FOUNDATION/theme/colors.css` is empty with only comments.

**Files to Modify:**
- `src/FOUNDATION/theme/colors.css` - Document purpose or remove

**Action Plan:**
1. Check if file is imported anywhere
2. If unused: Remove
3. If used: Document purpose clearly

**Dependencies:** None

**Estimated Effort:** 1 hour

**New TUNG Task Required:** `TUNG_CLEANUP_THEME_CSS_P2_V1` (P2)

---

### P2-5: Runtime TM Snapshot Refactoring

**Issue:** `src/FOUNDATION/theme/runtimeTmSnapshot.ts` has complex logic.

**Files to Modify:**
- `src/FOUNDATION/theme/runtimeTmSnapshot.ts` - Refactor for clarity

**Action Plan:**
1. Review logic for simplification opportunities
2. Extract helper functions if needed
3. Add comments for complex sections
4. Ensure functionality unchanged

**Dependencies:** None

**Estimated Effort:** 2-3 hours

**New TUNG Task Required:** `TUNG_REFACTOR_RUNTIME_SNAPSHOT_P2_V1` (P2)

---

## Phase 4: LOCK Preparation

### Files Ready for LOCK (45 files)

All files marked as ✅ **Ready for LOCK** in the audit report can be locked immediately after P1 fixes are complete.

**Lock Order:**
1. Foundation tokens (all `src/FOUNDATION/tokens/*.ts` except duplicates)
2. Component tokens (all `src/FOUNDATION/tokens/components/*.ts`)
3. Theme system (after P1 fixes: `ThemeProvider.tsx`, `registry.ts`, `schema.ts`, `loader.ts`, `runtimeTmSnapshot.ts`, `applyStateMatrix.ts`)
4. Export files (`src/index.ts`, `src/FOUNDATION/tokens/index.ts`, `src/FOUNDATION/theme/index.ts`)

**Lock Process:**
1. Complete P1 fixes
2. Verify all fixes
3. Update FOUNDATION_LOCK.md with token/theme lock status
4. Mark files as LOCKED in documentation

---

## New TUNG Tasks Required

### P1 Tasks (3 tasks)

1. **TUNG_FIX_THEME_DUPLICATION_P1_V1**
   - **Priority:** P1
   - **Scope:** Remove or re-export duplicate theme files
   - **Files:** `theme/spacing.ts`, `theme/typography.ts`, `theme/motion.ts`
   - **Estimated Effort:** 2-4 hours

2. **TUNG_DEPRECATE_LEGACY_STATE_APPLY_P1_V1**
   - **Priority:** P1
   - **Scope:** Deprecate `applyStates.ts` and migrate to `applyStateMatrix.ts`
   - **Files:** `theme/applyStates.ts`, `theme/applyStateMatrix.ts`
   - **Estimated Effort:** 4-6 hours

3. **TUNG_MIGRATE_LEGACY_CSS_VARS_P1_V1**
   - **Priority:** P1
   - **Scope:** Migrate legacy CSS variables to `--tm-*` tokens
   - **Files:** `theme/applyMode.ts`, all component files using legacy vars
   - **Estimated Effort:** 8-12 hours

### P2 Tasks (5 tasks)

1. **TUNG_ADD_AUTHORITY_DOCS_P2_V1**
   - **Priority:** P2
   - **Scope:** Add Authority compliance documentation to component token files
   - **Files:** `tokens/components/*.ts`
   - **Estimated Effort:** 2-3 hours

2. **TUNG_ORGANIZE_GRADIENT_STORIES_P2_V1**
   - **Priority:** P2
   - **Scope:** Move or remove GradientTokens.stories.tsx
   - **Files:** `tokens/GradientTokens.stories.tsx`
   - **Estimated Effort:** 1 hour

3. **TUNG_DOCUMENT_OPACITY_SCOPE_P2_V1**
   - **Priority:** P2
   - **Scope:** Document opacity tokens scope
   - **Files:** `tokens/opacity.ts`
   - **Estimated Effort:** 1 hour

4. **TUNG_CLEANUP_THEME_CSS_P2_V1**
   - **Priority:** P2
   - **Scope:** Clean up empty theme CSS files
   - **Files:** `theme/colors.css`
   - **Estimated Effort:** 1 hour

5. **TUNG_REFACTOR_RUNTIME_SNAPSHOT_P2_V1**
   - **Priority:** P2
   - **Scope:** Refactor runtimeTmSnapshot for clarity
   - **Files:** `theme/runtimeTmSnapshot.ts`
   - **Estimated Effort:** 2-3 hours

### GAP Tasks (2 tasks)

1. **TUNG_CREATE_THEME_RUNTIME_AUTHORITY_P0_V1**
   - **Priority:** P0 (Documentation)
   - **Scope:** Create THEME_RUNTIME_AUTHORITY.md or extend TOKEN_AUTHORITY
   - **Files:** New document or `docs/architecture/TOKEN_AUTHORITY.md`
   - **Estimated Effort:** 4-6 hours

2. **TUNG_ADD_AUTHORITY_MAPPING_P2_V1**
   - **Priority:** P2
   - **Scope:** Add Authority mapping documentation
   - **Files:** `docs/architecture/TOKEN_AUTHORITY.md` or new mapping document
   - **Estimated Effort:** 2-3 hours

---

## Execution Order

### Step 1: P1 Fixes (Critical)

1. **TUNG_FIX_THEME_DUPLICATION_P1_V1** (2-4 hours)
2. **TUNG_DEPRECATE_LEGACY_STATE_APPLY_P1_V1** (4-6 hours)
3. **TUNG_MIGRATE_LEGACY_CSS_VARS_P1_V1** (8-12 hours)

**Total P1 Effort:** 14-22 hours

### Step 2: P2 Cleanup (Optional before LOCK)

1. **TUNG_ADD_AUTHORITY_DOCS_P2_V1** (2-3 hours)
2. **TUNG_ORGANIZE_GRADIENT_STORIES_P2_V1** (1 hour)
3. **TUNG_DOCUMENT_OPACITY_SCOPE_P2_V1** (1 hour)
4. **TUNG_CLEANUP_THEME_CSS_P2_V1** (1 hour)
5. **TUNG_REFACTOR_RUNTIME_SNAPSHOT_P2_V1** (2-3 hours)

**Total P2 Effort:** 7-11 hours

### Step 3: GAP Documentation (Recommended)

1. **TUNG_CREATE_THEME_RUNTIME_AUTHORITY_P0_V1** (4-6 hours)
2. **TUNG_ADD_AUTHORITY_MAPPING_P2_V1** (2-3 hours)

**Total GAP Effort:** 6-9 hours

### Step 4: LOCK

After P1 fixes are complete:
1. Verify all P1 fixes
2. Run full audit again
3. Update FOUNDATION_LOCK.md
4. Mark token/theme system as LOCKED

---

## Files to Split / Merge / Deprecate

### Files to Deprecate

1. **`src/FOUNDATION/theme/spacing.ts`** - Duplicate, re-export from tokens or remove
2. **`src/FOUNDATION/theme/typography.ts`** - Duplicate, re-export from tokens or remove
3. **`src/FOUNDATION/theme/motion.ts`** - Duplicate, re-export from tokens or remove
4. **`src/FOUNDATION/theme/applyStates.ts`** - Legacy, migrate to applyStateMatrix.ts

### Files to Merge

None identified.

### Files to Split

None identified.

---

## Files Ready for LOCK

### Foundation Tokens (15 files)

- ✅ `colors.ts`
- ✅ `typography.ts`
- ✅ `spacing.ts`
- ✅ `radius.ts`
- ✅ `shadows.ts`
- ✅ `motion/motion.ts`
- ✅ `opacity.ts`
- ✅ `gradients.ts`
- ✅ `states.ts`
- ✅ `state-matrix.ts`
- ✅ `css-variables.ts`
- ✅ `required-tokens.ts`
- ✅ `types/index.ts`
- ✅ `theme.ts`
- ✅ `index.ts`

### Component Tokens (50 files)

- ✅ All `components/*.ts` files (50 files)

### Theme System (9 files, after P1 fixes)

- ✅ `ThemeProvider.tsx`
- ✅ `applyStateMatrix.ts` (after P1-2)
- ✅ `colors.ts`
- ✅ `registry.ts`
- ✅ `schema.ts`
- ✅ `loader.ts`
- ✅ `runtimeTmSnapshot.ts`
- ✅ `colors.css`
- ✅ `global.css`
- ✅ `index.ts`

**Total Ready for LOCK:** 74 files (after P1 fixes)

---

## Risk Assessment

### Low Risk

- P2 tasks (documentation and cleanup)
- GAP tasks (documentation)

### Medium Risk

- P1-1 (Theme duplication) - Low risk, straightforward fix
- P1-2 (Legacy state) - Medium risk, requires migration verification

### High Risk

- P1-3 (Legacy CSS vars) - High risk, requires component migration and testing

**Mitigation:**
- Create comprehensive migration guide
- Test each component after migration
- Maintain backward compatibility during transition
- Use feature flags if needed

---

## Success Criteria

### P1 Fixes Complete

- ✅ No duplicate token definitions in theme/
- ✅ Only `applyStateMatrix.ts` is used for states
- ✅ Only `--tm-*` tokens are emitted (legacy vars removed)
- ✅ All components migrated to `--tm-*` tokens

### P2 Cleanup Complete

- ✅ All component token files have Authority compliance docs
- ✅ Storybook files organized
- ✅ Opacity tokens documented
- ✅ Theme CSS files cleaned up
- ✅ Runtime snapshot refactored

### GAP Documentation Complete

- ✅ THEME_RUNTIME_AUTHORITY.md created or TOKEN_AUTHORITY extended
- ✅ Authority mapping documented

### LOCK Ready

- ✅ All P1 issues resolved
- ✅ All files verified canonical
- ✅ FOUNDATION_LOCK.md updated
- ✅ Token/theme system marked as LOCKED

---

## Timeline Estimate

| Phase | Tasks | Effort | Priority |
|-------|-------|--------|----------|
| **P1 Fixes** | 3 tasks | 14-22 hours | Critical |
| **P2 Cleanup** | 5 tasks | 7-11 hours | Optional |
| **GAP Docs** | 2 tasks | 6-9 hours | Recommended |
| **LOCK** | 1 task | 2-4 hours | After P1 |

**Total Estimated Effort:** 29-46 hours (P1 + LOCK = 16-26 hours minimum)

---

## Conclusion

The Foundation token and theme system is **well-architected** and requires **minimal fixes** before LOCK. The identified issues are **non-blocking** and can be addressed systematically.

**Recommended Path:**
1. Complete P1 fixes (critical)
2. Proceed with LOCK
3. Address P2 and GAPs as follow-up tasks

---

**Plan Completed:** 2026-01-22  
**Status:** ✅ COMPLETE
