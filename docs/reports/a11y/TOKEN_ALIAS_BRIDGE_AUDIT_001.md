# Token Alias Bridge Audit Report

**Task:** TUI_TOKEN_ALIAS_BRIDGE_AUDIT_001  
**Date:** 2026-01-21  
**Status:** COMPLETE  
**Purpose:** Find all legacy CSS var usages, map to REQUIRED_THEME_TOKENS, prove alias bridge existence/absence, create tm-only migration map

---

## Executive Summary

This audit reveals that **NO CSS alias bridge exists** between legacy CSS variables (`--background`, `--foreground`, `--muted`, `--destructive`, etc.) and REQUIRED_THEME_TOKENS (`--tm-*`). Legacy vars are set directly from token sources (baseColors, semanticColors, surfaceColors, textColors) in `applyMode.ts`, but they are **NOT aliased** to `--tm-*` tokens via CSS.

**Key Findings:**
- ✅ All REQUIRED_THEME_TOKENS are emitted at runtime via `buildTmRuntimeValues()`
- ❌ Legacy vars are set independently from the same token sources (no bridge)
- ❌ No CSS alias bridge exists (e.g., `--background: var(--tm-surface-base);`)
- ⚠️ 14 direct usages of legacy vars found in source code (excluding docs)
- ✅ `tailwindThemeColors` already uses `--tm-*` tokens (migration-ready)

**Recommendation:** Implement tm-only migration plan to replace all legacy var usages with `--tm-*` tokens directly.

---

## Methodology

1. **Global scan** of repository for legacy CSS var patterns:
   - `var(--background)`, `var(--foreground)`, `var(--card)`, `var(--popover)`
   - `var(--muted)`, `var(--destructive)`, `var(--surface-*)`, `var(--text-*)`
   - `var(--border)`, `var(--input)`, `var(--ring)`
   - Direct CSS usage: `--background`, `--foreground`, etc.

2. **Exclusion criteria:**
   - Documentation files (`docs/`, `docs_archive/`)
   - Build artifacts (`node_modules/`, `coverage/`, `dist/`, `storybook-static/`)
   - Test files (included for completeness but marked separately)

3. **Mapping analysis:**
   - Compare legacy vars with REQUIRED_THEME_TOKENS
   - Check for alias bridge in CSS or JavaScript
   - Classify each legacy var: (A) has bridge, (B) missing bridge, (C) redundant

4. **Migration plan creation:**
   - Map legacy → tm tokens
   - Identify breaking changes risks
   - List affected files and exports

---

## Findings

### Complete Legacy Var Usage Inventory

#### 1. CSS Files

**File:** `src/FOUNDATION/theme/global.css`
- **Line 4:** `border-color: hsl(var(--border));`
- **Line 8:** `color: hsl(var(--foreground));`
- **Line 9:** `background: hsl(var(--background));`
- **Line 22:** `outline: var(--spacing-0-5) solid hsl(var(--ring));`
- **Line 32:** `background: hsl(var(--muted));`
- **Line 36:** `background: hsl(var(--muted-foreground));`

**File:** `src/styles/globals.css`
- **Line 35:** `scrollbar-color: hsl(var(--muted-foreground)) transparent;`
- **Line 47:** `background-color: hsl(var(--muted-foreground));`
- **Line 52:** `background-color: hsl(var(--foreground));`

#### 2. Component Token Files

**File:** `src/FOUNDATION/tokens/components/file-upload.ts`
- **Line 184:** `textColor: "text-[hsl(var(--destructive))]", // Error message text color`

**File:** `src/FOUNDATION/tokens/components/menu.ts`
- **Line 95:** `textColor: "text-[hsl(var(--muted-foreground))]", // Muted foreground text color for labels`

**File:** `src/FOUNDATION/tokens/shadows.ts`
- **Line 100:** `default: "0 0 0 3px hsl(var(--ring) / 0.5)",`
- **Line 253:** `DEFAULT: "hsl(var(--ring) / 0.5)",`

#### 3. Test Files

**File:** `src/COMPOSITION/layout/Footer/Footer.test.tsx`
- **Line 62:** `backgroundColor: "var(--muted)",`
- **Line 119:** `backgroundColor: "var(--background)",`
- **Line 134:** `backgroundColor: "var(--muted)",`

**File:** `src/COMPOSITION/layout/Box/Box.test.tsx`
- **Line 99:** `expect(box).toHaveStyle({ backgroundColor: "var(--background)" });`
- **Line 264:** `backgroundColor: "var(--background)",`

#### 4. Type Definitions

**File:** `src/FOUNDATION/tokens/types/index.ts`
- **Line 83:** Comment: `These map to CSS variables like --background, --primary, etc.`

#### 5. Runtime Variable Setting

**File:** `src/FOUNDATION/theme/applyMode.ts`
- **Lines 188-196:** Sets legacy vars directly from token sources:
  - `--background` = `base.background`
  - `--foreground` = `base.foreground`
  - `--card` = `base.card`
  - `--card-foreground` = `base.cardForeground`
  - `--popover` = `base.popover`
  - `--popover-foreground` = `base.popoverForeground`
  - `--border` = `base.border`
  - `--input` = `base.input`
  - `--ring` = `base.ring`
- **Lines 204-209:** Sets `--surface-*` vars from `surfaceColors`
- **Lines 234-238:** Sets `--text-*` vars from `textColors`
- **Lines 311-312:** Sets `--muted` and `--muted-foreground` from `base.card` and `base.cardForeground`
- **Lines 331-332:** Sets `--destructive` and `--destructive-foreground` from `semantic.error` and `semantic.errorForeground`

**Total Legacy Var Usages:** 14 direct usages (excluding `applyMode.ts` which sets them)

---

## Classification: Bridge Status

### (B) Missing Bridge - All Legacy Vars

**Proof of Missing Bridge:**

1. **No CSS alias bridge exists:**
   - No CSS rules like `--background: var(--tm-surface-base);` found
   - Legacy vars are set directly from token sources, not from `--tm-*` tokens

2. **JavaScript setting pattern:**
   - In `applyMode.ts`, legacy vars are set from `baseColors[mode]`, `semanticColors[mode]`, etc.
   - `--tm-*` tokens are built separately in `buildTmRuntimeValues()` from the same sources
   - **No dependency chain:** Legacy vars do NOT reference `--tm-*` tokens

3. **Comment reference is misleading:**
   - Line 152-155 in `applyMode.ts` mentions "ALIAS BRIDGE" and references "TUI_TOKEN_MAPPING_FIXPACK_01"
   - This is **only a comment** - no actual bridge implementation exists
   - The comment suggests intent, but implementation is missing

### Classification Table

| Legacy Var | TM Token | Bridge Status | Source in applyMode.ts |
|------------|----------|---------------|----------------------|
| `--background` | `--tm-surface-base` | ❌ Missing | `base.background` |
| `--foreground` | `--tm-text-primary` | ❌ Missing | `base.foreground` |
| `--card` | `--tm-surface-raised` | ❌ Missing | `base.card` |
| `--card-foreground` | `--tm-text-primary` | ❌ Missing | `base.cardForeground` |
| `--popover` | `--tm-surface-overlay` | ❌ Missing | `base.popover` |
| `--popover-foreground` | `--tm-text-primary` | ❌ Missing | `base.popoverForeground` |
| `--border` | `--tm-border-default` | ❌ Missing | `base.border` |
| `--input` | `--tm-border-default` | ❌ Missing | `base.input` |
| `--ring` | `--tm-focus-ring` | ❌ Missing | `base.ring` |
| `--muted` | `--tm-muted` | ❌ Missing | `base.card` |
| `--muted-foreground` | `--tm-muted-foreground` | ❌ Missing | `base.cardForeground` |
| `--destructive` | `--tm-destructive` | ❌ Missing | `semantic.error` |
| `--destructive-foreground` | `--tm-destructive-foreground` | ❌ Missing | `semantic.errorForeground` |
| `--surface-base` | `--tm-surface-base` | ❌ Missing | `surface.base` |
| `--surface-elevated1` | `--tm-surface-raised` | ❌ Missing | `surface.elevated1` |
| `--surface-elevated2` | N/A (not in REQUIRED) | ⚠️ Not required | `surface.elevated2` |
| `--surface-elevated3` | N/A (not in REQUIRED) | ⚠️ Not required | `surface.elevated3` |
| `--surface-overlay` | `--tm-surface-overlay` | ❌ Missing | `surface.overlay` |
| `--surface-glass` | N/A (not in REQUIRED) | ⚠️ Not required | `surface.glass` |
| `--text-primary` | `--tm-text-primary` | ❌ Missing | `text.primary` |
| `--text-secondary` | `--tm-text-secondary` | ❌ Missing | `text.secondary` |
| `--text-tertiary` | N/A (not in REQUIRED) | ⚠️ Not required | `text.tertiary` |
| `--text-muted` | `--tm-text-muted` | ❌ Missing | `text.muted` |
| `--text-inverse` | `--tm-text-inverse` | ❌ Missing | `text.inverse` |

**Summary:**
- ❌ **0 legacy vars have alias bridge**
- ❌ **All legacy vars are missing bridge** (classified as B)
- ⚠️ **Some legacy vars have no tm equivalent** (surface-elevated2/3, surface-glass, text-tertiary)

---

## Mapping Analysis

### Legacy → TM Token Mapping

| Legacy Var | TM Token | Mapping Notes |
|------------|----------|---------------|
| `--background` | `--tm-surface-base` | Direct semantic equivalent |
| `--foreground` | `--tm-text-primary` | Direct semantic equivalent |
| `--card` | `--tm-surface-raised` | Direct semantic equivalent |
| `--card-foreground` | `--tm-text-primary` | Uses same token as foreground (no separate card-foreground in REQUIRED) |
| `--popover` | `--tm-surface-overlay` | Direct semantic equivalent |
| `--popover-foreground` | `--tm-text-primary` | Uses same token as foreground (no separate popover-foreground in REQUIRED) |
| `--border` | `--tm-border-default` | Direct semantic equivalent |
| `--input` | `--tm-border-default` | Input border uses same token as default border |
| `--ring` | `--tm-focus-ring` | Direct semantic equivalent |
| `--muted` | `--tm-muted` | Direct semantic equivalent |
| `--muted-foreground` | `--tm-muted-foreground` | Direct semantic equivalent |
| `--destructive` | `--tm-destructive` | Direct semantic equivalent |
| `--destructive-foreground` | `--tm-destructive-foreground` | Direct semantic equivalent |
| `--surface-base` | `--tm-surface-base` | Direct semantic equivalent |
| `--surface-elevated1` | `--tm-surface-raised` | Direct semantic equivalent |
| `--surface-overlay` | `--tm-surface-overlay` | Direct semantic equivalent |
| `--text-primary` | `--tm-text-primary` | Direct semantic equivalent |
| `--text-secondary` | `--tm-text-secondary` | Direct semantic equivalent |
| `--text-muted` | `--tm-text-muted` | Direct semantic equivalent |
| `--text-inverse` | `--tm-text-inverse` | Direct semantic equivalent |

### Legacy Vars Without TM Equivalents

These legacy vars are **not in REQUIRED_THEME_TOKENS** and need decision:

1. **`--surface-elevated2`** → No tm equivalent
   - Options: Use `--tm-surface-raised` or create new token (requires governance)

2. **`--surface-elevated3`** → No tm equivalent
   - Options: Use `--tm-surface-raised` or create new token (requires governance)

3. **`--surface-glass`** → No tm equivalent
   - Options: Use `--tm-surface-overlay` or create new token (requires governance)

4. **`--text-tertiary`** → No tm equivalent
   - Options: Use `--tm-text-muted` or create new token (requires governance)

### Why No Bridge Exists

1. **Historical implementation:**
   - Legacy vars were set first from token sources
   - `--tm-*` tokens were added later as canonical semantic tokens
   - No refactoring was done to create bridge

2. **Independent value sources:**
   - Both legacy and tm tokens derive from same token sources (`baseColors`, `semanticColors`, etc.)
   - They are set in parallel, not in dependency chain
   - This creates risk of divergence if token sources change

3. **Missing implementation:**
   - Comments suggest bridge intent (line 152-155 in `applyMode.ts`)
   - Reference to "TUI_TOKEN_MAPPING_FIXPACK_01" suggests planned fixpack
   - **No actual bridge code exists**

---

## Migration Plan: TM-Only

### Step 1: Update applyMode.ts to Use TM Tokens

**Current:** Legacy vars set from token sources directly  
**Target:** Legacy vars set from `--tm-*` tokens (create bridge) OR remove legacy vars entirely

**Option A: Create Bridge (Backward Compatible)**
```typescript
// After tmRuntimeValues are set, create legacy aliases
root.style.setProperty("--background", `var(--tm-surface-base)`);
root.style.setProperty("--foreground", `var(--tm-text-primary)`);
root.style.setProperty("--card", `var(--tm-surface-raised)`);
root.style.setProperty("--card-foreground", `var(--tm-text-primary)`);
root.style.setProperty("--popover", `var(--tm-surface-overlay)`);
root.style.setProperty("--popover-foreground", `var(--tm-text-primary)`);
root.style.setProperty("--border", `var(--tm-border-default)`);
root.style.setProperty("--input", `var(--tm-border-default)`);
root.style.setProperty("--ring", `var(--tm-focus-ring)`);
root.style.setProperty("--muted", `var(--tm-muted)`);
root.style.setProperty("--muted-foreground", `var(--tm-muted-foreground)`);
root.style.setProperty("--destructive", `var(--tm-destructive)`);
root.style.setProperty("--destructive-foreground", `var(--tm-destructive-foreground)`);
root.style.setProperty("--surface-base", `var(--tm-surface-base)`);
root.style.setProperty("--surface-elevated1", `var(--tm-surface-raised)`);
root.style.setProperty("--surface-overlay", `var(--tm-surface-overlay)`);
root.style.setProperty("--text-primary", `var(--tm-text-primary)`);
root.style.setProperty("--text-secondary", `var(--tm-text-secondary)`);
root.style.setProperty("--text-muted", `var(--tm-text-muted)`);
root.style.setProperty("--text-inverse", `var(--tm-text-inverse)`);
```

**Option B: Remove Legacy Vars (Breaking Change)**
- Remove all legacy var setting from `applyMode.ts`
- Update all usages to use `--tm-*` tokens directly
- This is the **tm-only** approach

### Step 2: Update CSS Files

**File:** `src/FOUNDATION/theme/global.css`
- Line 4: `border-color: hsl(var(--border));` → `border-color: hsl(var(--tm-border-default));`
- Line 8: `color: hsl(var(--foreground));` → `color: hsl(var(--tm-text-primary));`
- Line 9: `background: hsl(var(--background));` → `background: hsl(var(--tm-surface-base));`
- Line 22: `outline: var(--spacing-0-5) solid hsl(var(--ring));` → `outline: var(--spacing-0-5) solid hsl(var(--tm-focus-ring));`
- Line 32: `background: hsl(var(--muted));` → `background: hsl(var(--tm-muted));`
- Line 36: `background: hsl(var(--muted-foreground));` → `background: hsl(var(--tm-muted-foreground));`

**File:** `src/styles/globals.css`
- Line 35: `scrollbar-color: hsl(var(--muted-foreground)) transparent;` → `scrollbar-color: hsl(var(--tm-muted-foreground)) transparent;`
- Line 47: `background-color: hsl(var(--muted-foreground));` → `background-color: hsl(var(--tm-muted-foreground));`
- Line 52: `background-color: hsl(var(--foreground));` → `background-color: hsl(var(--tm-text-primary));`

### Step 3: Update Component Token Files

**File:** `src/FOUNDATION/tokens/components/file-upload.ts`
- Line 184: `textColor: "text-[hsl(var(--destructive))]",` → `textColor: "text-[hsl(var(--tm-destructive))]",`

**File:** `src/FOUNDATION/tokens/components/menu.ts`
- Line 95: `textColor: "text-[hsl(var(--muted-foreground))]",` → `textColor: "text-[hsl(var(--tm-muted-foreground))]",`

**File:** `src/FOUNDATION/tokens/shadows.ts`
- Line 100: `default: "0 0 0 3px hsl(var(--ring) / 0.5)",` → `default: "0 0 0 3px hsl(var(--tm-focus-ring) / 0.5)",`
- Line 253: `DEFAULT: "hsl(var(--ring) / 0.5)",` → `DEFAULT: "hsl(var(--tm-focus-ring) / 0.5)",`

### Step 4: Update Test Files

**File:** `src/COMPOSITION/layout/Footer/Footer.test.tsx`
- Line 62: `backgroundColor: "var(--muted)",` → `backgroundColor: "var(--tm-muted)",`
- Line 119: `backgroundColor: "var(--background)",` → `backgroundColor: "var(--tm-surface-base)",`
- Line 134: `backgroundColor: "var(--muted)",` → `backgroundColor: "var(--tm-muted)",`

**File:** `src/COMPOSITION/layout/Box/Box.test.tsx`
- Line 99: `expect(box).toHaveStyle({ backgroundColor: "var(--background)" });` → `expect(box).toHaveStyle({ backgroundColor: "var(--tm-surface-base)" });`
- Line 264: `backgroundColor: "var(--background)",` → `backgroundColor: "var(--tm-surface-base)",`

### Step 5: Update Type Definitions

**File:** `src/FOUNDATION/tokens/types/index.ts`
- Line 83: Update comment to reference `--tm-*` tokens instead of legacy vars

---

## Breaking Changes Risks

### Affected Exports

1. **`UI_COLORS`** (from `src/FOUNDATION/tokens/theme.ts`)
   - Currently re-exports `tailwindThemeColors`
   - ✅ **Safe:** `tailwindThemeColors` already uses `--tm-*` tokens
   - No breaking change expected

2. **`tailwindThemeColors`** (from `src/FOUNDATION/tokens/colors.ts`)
   - ✅ **Already migrated:** Uses `--tm-*` tokens
   - No breaking change expected

### Affected Files Summary

| File | Legacy Vars Used | Migration Impact |
|------|----------------|------------------|
| `src/FOUNDATION/theme/global.css` | 6 usages | High (core theme CSS) |
| `src/styles/globals.css` | 3 usages | High (global styles) |
| `src/FOUNDATION/tokens/components/file-upload.ts` | 1 usage | Medium (component token) |
| `src/FOUNDATION/tokens/components/menu.ts` | 1 usage | Medium (component token) |
| `src/FOUNDATION/tokens/shadows.ts` | 2 usages | Medium (shadow tokens) |
| `src/COMPOSITION/layout/Footer/Footer.test.tsx` | 3 usages | Low (test file) |
| `src/COMPOSITION/layout/Box/Box.test.tsx` | 2 usages | Low (test file) |
| `src/FOUNDATION/tokens/types/index.ts` | 1 comment | Low (documentation) |
| `src/FOUNDATION/theme/applyMode.ts` | Sets all legacy vars | **Critical** (runtime) |

### Risk Assessment

**Low Risk:**
- Test files (can be updated independently)
- Type definition comments (documentation only)

**Medium Risk:**
- Component token files (internal usage, but may affect component styling)
- Shadow tokens (used in focus rings, may affect accessibility)

**High Risk:**
- CSS files (global styles affect entire application)
- `applyMode.ts` (runtime variable setting affects all consumers)

### Migration Strategy Recommendation

**Recommended Approach: Option A (Bridge First, Then Migrate)**

1. **Phase 1:** Create CSS alias bridge in `applyMode.ts` (backward compatible)
2. **Phase 2:** Migrate all usages to `--tm-*` tokens
3. **Phase 3:** Remove legacy var setting from `applyMode.ts` (breaking change, requires major version)

This allows:
- ✅ Backward compatibility during migration
- ✅ Gradual migration of components
- ✅ Clear breaking change boundary (Phase 3)

---

## Recommendations

### For Lock/Governance

1. **Immediate Action:**
   - Document that **no alias bridge exists** (this audit proves it)
   - Update `applyMode.ts` comments to reflect reality (remove misleading "ALIAS BRIDGE" comment or implement actual bridge)

2. **Migration Decision:**
   - Choose migration strategy: Bridge (Option A) or Direct Migration (Option B)
   - If Option A: Implement bridge in `applyMode.ts` to ensure legacy vars reference `--tm-*` tokens
   - If Option B: Plan breaking change release for legacy var removal

3. **Token Gaps:**
   - Decide on legacy vars without tm equivalents:
     - `--surface-elevated2`, `--surface-elevated3`, `--surface-glass`, `--text-tertiary`
   - Options: Map to existing tm tokens or create new REQUIRED tokens (requires governance)

4. **Validation:**
   - Add automated check to prevent new legacy var usage
   - Add ESLint rule to flag legacy var usage
   - Update component creation checklist to forbid legacy vars

### For Next Task (TUI_TM_ONLY_COLOR_TOKENS_MIGRATION_001)

1. **Prerequisites:**
   - This audit report (complete)
   - Decision on migration strategy (Bridge vs Direct)

2. **Execution Order:**
   - If Bridge: Implement bridge first, then migrate usages
   - If Direct: Migrate all usages, then remove legacy var setting

3. **Testing:**
   - Visual regression tests for all affected components
   - Accessibility tests (focus rings use `--ring` → `--tm-focus-ring`)
   - Theme switching tests (day/night mode)

---

## Conclusion

**Audit Status:** ✅ COMPLETE

**Key Finding:** No alias bridge exists between legacy CSS variables and REQUIRED_THEME_TOKENS. All legacy vars are classified as **(B) Missing Bridge**.

**Migration Readiness:** ✅ Ready for tm-only migration. All required tm tokens exist and are emitted at runtime.

**Next Steps:** Proceed to TUI_TM_ONLY_COLOR_TOKENS_MIGRATION_001 with migration plan from this report.

---

## Appendix: Complete Usage List

### By File

1. `src/FOUNDATION/theme/global.css` - 6 usages
2. `src/styles/globals.css` - 3 usages
3. `src/FOUNDATION/tokens/components/file-upload.ts` - 1 usage
4. `src/FOUNDATION/tokens/components/menu.ts` - 1 usage
5. `src/FOUNDATION/tokens/shadows.ts` - 2 usages
6. `src/COMPOSITION/layout/Footer/Footer.test.tsx` - 3 usages
7. `src/COMPOSITION/layout/Box/Box.test.tsx` - 2 usages
8. `src/FOUNDATION/tokens/types/index.ts` - 1 comment reference
9. `src/FOUNDATION/theme/applyMode.ts` - Sets all legacy vars (runtime)

### By Legacy Var

- `--background`: 3 usages (global.css, Box.test.tsx, Footer.test.tsx)
- `--foreground`: 2 usages (global.css, globals.css)
- `--border`: 1 usage (global.css)
- `--ring`: 2 usages (global.css, shadows.ts)
- `--muted`: 3 usages (global.css, Footer.test.tsx x2)
- `--muted-foreground`: 3 usages (global.css, globals.css x2, menu.ts)
- `--destructive`: 1 usage (file-upload.ts)

**Total:** 15 direct usages + runtime setting in `applyMode.ts`
