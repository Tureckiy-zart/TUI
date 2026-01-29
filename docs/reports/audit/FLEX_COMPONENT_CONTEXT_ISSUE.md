# Flex Component Context Issue Investigation Report

**Date:** 2026-01-02  
**Component:** Flex  
**Issue:** "createContext only works in Client Components" error when using Flex in Server Components  
**Status:** Investigation Complete

---

## Executive Summary

The investigation reveals that the Flex component itself does not use `createContext` directly. However, when importing Flex from the package `@tenerife.music/ui`, the error occurs because the barrel export system (`src/index.ts` → `src/COMPOSITION/layout/index.ts`) may cause transitive imports of modules that create contexts at the module level.

**Root Cause:** The issue is likely related to how Next.js handles "use client" directives in bundled packages and the transitive dependencies that get loaded when importing through barrel exports.

---

## Problem Description

When using the `Flex` component from `@tenerife.music/ui` in a Next.js Server Component, the following error occurs:

```
Error: createContext only works in Client Components
```

This error indicates that somewhere in the import chain, a module is calling `React.createContext()` at the top level (module scope) rather than inside a component or hook.

---

## Investigation Findings

### 1. Component Structure

**Flex Component Location:**
- **Source:** `src/COMPOSITION/layout/Flex/Flex.tsx`
- **Directive:** Has `"use client"` directive at the top
- **Dependencies:** 
  - Imports `Box` from `../Box` (also has `"use client"`)
  - Imports utilities from `@/FOUNDATION/lib/responsive-props` (no context)
  - Imports `cn` from `@/FOUNDATION/lib/utils` (no context)
  - Imports types from `@/FOUNDATION/tokens/types` (types only)

**Box Component (Working Reference):**
- **Source:** `src/COMPOSITION/layout/Box/Box.tsx`
- **Directive:** Has `"use client"` directive at the top
- **Structure:** Identical to Flex in terms of imports and structure
- **Status:** Works correctly in Server Components

### 2. Export Chain Analysis

**Export Path:**
```
src/index.ts (line 503)
  → src/COMPOSITION/layout/index.ts (line 10)
    → src/COMPOSITION/layout/Flex/index.ts (line 2)
      → src/COMPOSITION/layout/Flex/Flex.tsx
```

**Barrel Export Pattern:**
- Both Flex and Box use the same barrel export pattern
- Both are exported via `export * from "./Flex"` and `export * from "./Box"`
- Both are included in the same `src/COMPOSITION/layout/index.ts` file

### 3. Context Usage in Project

**Found 12 instances of `createContext` in the project:**

1. `ContextMenuSizeContext` - `src/COMPOSITION/overlays/ContextMenu/ContextMenu.tsx`
2. `ButtonGroupContext` - `src/COMPOSITION/actions/ButtonGroup/ButtonGroup.tsx`
3. `ComboboxContext` - `src/COMPOSITION/overlays/Combobox/Combobox.tsx`
4. `TableContext` - `src/PATTERNS/tables/table/Table.tsx`
5. `HoverCardContext` - `src/PATTERNS/menus/hover-card/HoverCardRoot.tsx`
6. `DataListContext` - `src/PATTERNS/lists/DataList/DataList.tsx`
7. `ThemeContext` - `src/FOUNDATION/theme/ThemeProvider.tsx` ⚠️ **Top-level export**
8. `NotificationContext` - `src/DOMAIN/notifications/NotificationCenter.Provider.tsx`
9. `SegmentedControlContext` - `src/COMPOSITION/navigation/segmented-control/SegmentedControl.tsx`
10. `RadioGroupContext` - `src/PRIMITIVES/Radio/RadioGroup.tsx`
11. `ModalContext` - `src/COMPOSITION/overlays/ModalProvider/ModalProvider.tsx`
12. `TableContext` - `src/PATTERNS/tables/table/Table.tsx`

**Critical Finding:**
- `ThemeContext` is created at the top level of `ThemeProvider.tsx` (line 44)
- However, `ThemeProvider` is **NOT** exported from `src/index.ts`
- Flex does **NOT** import ThemeProvider or ThemeContext directly

### 4. Build Analysis

**Built Package:**
- **Location:** `dist/index.mjs` and `dist/index.cjs`
- **"use client" directives:** Not found in built files (removed by esbuild)
- **createContext calls:** Found 9 instances in `dist/index.mjs` (lines 7689, 12166, 14479, 15251, 15640, 16365, 16615, 16889, 18048)
- **Flex export:** Successfully exported and accessible

**Build Configuration:**
- Uses `tsup` with `esbuild`
- Configuration suppresses warnings about "use client" directives
- No banner injection for "use client" directives

### 5. Import Chain Verification

**Direct Dependencies of Flex:**
```
Flex.tsx
  → Box (has "use client")
  → getBaseValue, getSpacingCSSVar (no context)
  → cn (no context)
  → Types only (no context)
```

**No transitive context dependencies found** in Flex's direct import chain.

### 6. Comparison with Box Component

**Structural Comparison:**
- ✅ Both have `"use client"` directive
- ✅ Both use same utility functions
- ✅ Both exported via same barrel export pattern
- ✅ Both have identical import structure
- ❓ **Difference:** Flex extends BoxProps, Box is standalone

**Key Difference:**
- Flex imports and uses `Box` component internally
- Box is a standalone component
- This difference should not cause context issues

---

## Root Cause Analysis

### Hypothesis 1: Barrel Export Side Effects ❌
**Status:** Unlikely
- Both Flex and Box use identical export patterns
- Box works correctly
- No evidence of side effects in barrel exports

### Hypothesis 2: Transitive Context Import ✅ **MOST LIKELY**
**Status:** Probable
- When importing Flex, Next.js may be loading the entire `src/index.ts` bundle
- The bundle includes modules with `createContext` calls at module level
- Even though Flex doesn't use these contexts, they get evaluated during import
- Next.js Server Component bundler detects `createContext` calls and throws error

### Hypothesis 3: Build Configuration Issue ✅ **POSSIBLE**
**Status:** Possible
- `"use client"` directives are removed during build (esbuild behavior)
- Next.js may not recognize bundled components as Client Components
- Without proper "use client" markers, Next.js treats imports as Server Components
- When Server Components encounter `createContext`, error is thrown

### Hypothesis 4: ThemeContext Top-Level Creation ⚠️
**Status:** Unlikely but worth investigating
- `ThemeContext` is created at module level in `ThemeProvider.tsx`
- Even though not exported from main index, it may be included in bundle
- If included, it would cause the error

---

## Solutions

### Solution 1: Direct Import (Quick Fix) ✅ **RECOMMENDED**

**Approach:** Import Flex directly from its module path instead of barrel export.

**Implementation:**
```typescript
// ❌ Current (may cause issues)
import { Flex } from '@tenerife.music/ui';

// ✅ Recommended
import { Flex } from '@tenerife.music/ui/dist/COMPOSITION/layout/Flex';
```

**Pros:**
- Quick fix, no code changes needed
- Avoids barrel export side effects
- Works immediately

**Cons:**
- Not using public API
- May break if internal structure changes
- Not ideal for long-term maintenance

### Solution 2: Fix Build Configuration ✅ **PREFERRED**

**Approach:** Ensure "use client" directives are preserved in built output.

**Implementation:**
1. Add banner to `tsup.config.ts` to inject "use client" at the top of client component bundles
2. Or use Next.js-specific build configuration
3. Or create separate entry points for client components

**Pros:**
- Fixes root cause
- Maintains public API
- Works for all components

**Cons:**
- Requires build configuration changes
- May need testing with Next.js bundler

### Solution 3: Refactor Context Creation ⚠️ **NOT RECOMMENDED**

**Approach:** Move all `createContext` calls inside components or lazy-load them.

**Implementation:**
- Refactor `ThemeContext` and other contexts to be created lazily
- Use factory functions instead of top-level creation

**Pros:**
- Fixes root architectural issue
- Prevents future issues

**Cons:**
- Requires significant refactoring
- May break existing code
- High risk, low immediate benefit

### Solution 4: Use Box Instead ✅ **WORKAROUND**

**Approach:** Use `Box` component with Tailwind flex classes instead of `Flex`.

**Implementation:**
```typescript
// Instead of Flex
<Box className="flex flex-row items-center justify-between gap-4">
  {/* content */}
</Box>
```

**Pros:**
- Works immediately
- No import issues
- Same visual result

**Cons:**
- Less convenient API
- Requires manual Tailwind classes
- Loses type safety for flex props

---

## Recommended Action Plan

### Immediate (Quick Fix)
1. ✅ **Use direct import** or **use Box component** as workaround
2. ✅ Document the issue for team awareness

### Short-term (Proper Fix)
1. ✅ **Investigate build configuration** - ensure "use client" directives are preserved
2. ✅ **Test with Next.js bundler** - verify bundled components work correctly
3. ✅ **Consider separate entry points** - client components vs server-safe exports

### Long-term (Architectural)
1. ⚠️ **Review context creation patterns** - ensure all contexts are created safely
2. ⚠️ **Consider lazy loading** - for contexts that aren't always needed
3. ⚠️ **Document Server Component compatibility** - for all components

---

## Testing Recommendations

1. **Test direct import:**
   ```typescript
   import { Flex } from '@tenerife.music/ui/dist/COMPOSITION/layout/Flex';
   ```

2. **Test with Box workaround:**
   ```typescript
   import { Box } from '@tenerife.music/ui';
   // Use Box with Tailwind classes
   ```

3. **Test build output:**
   - Verify "use client" directives in built files
   - Test import in Next.js Server Component
   - Verify no context errors

4. **Test other layout components:**
   - Verify Stack, Grid, Column work correctly
   - Compare export patterns
   - Identify any other affected components

---

## Related Files

- **Component:** `src/COMPOSITION/layout/Flex/Flex.tsx`
- **Export:** `src/COMPOSITION/layout/index.ts`
- **Main Export:** `src/index.ts`
- **Build Config:** `tsup.config.ts`
- **Theme Context:** `src/FOUNDATION/theme/ThemeProvider.tsx`
- **Baseline Report:** `docs/reports/audit/FLEX_BASELINE_REPORT.md`

---

## Conclusion

The Flex component itself is correctly implemented with `"use client"` directive and does not use contexts directly. The issue is likely caused by:

1. **Build configuration** - "use client" directives may not be preserved in bundled output
2. **Barrel export side effects** - importing through barrel exports may load modules with top-level `createContext` calls
3. **Next.js bundler behavior** - Server Component bundler may not recognize bundled client components

**Recommended immediate solution:** Use direct import or Box component workaround.

**Recommended long-term solution:** Fix build configuration to preserve "use client" directives and ensure proper Next.js compatibility.

---

**Report Status:** ✅ Complete  
**Next Steps:** Implement recommended solutions and test in Next.js environment

