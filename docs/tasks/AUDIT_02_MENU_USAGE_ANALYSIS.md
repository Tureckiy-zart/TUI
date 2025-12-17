# Menu Usage Audit Report

**Task:** AUDIT_02_MENU_USAGE_ANALYSIS  
**Date:** 2025-01-27  
**Status:** ✅ Complete (READ-ONLY)

---

## Executive Summary

This audit provides a complete usage map of all menu-related components (ContextMenu, Dropdown, Popover) across COMPOSITION and PATTERNS layers. **No production code usage found** — all implementations appear to be used only in stories, tests, and documentation.

---

## STEP 1 — INVENTORY

### ContextMenu Implementations

#### COMPOSITION Layer
- **Path:** `src/COMPOSITION/overlays/ContextMenu/`
- **Files:**
  - `ContextMenu.tsx` (main component, Radix-based)
  - `index.ts` (exports)
  - `ContextMenu.stories.tsx` (Storybook)
  - `ContextMenu.test.tsx` (tests)
- **Status:** ✅ LOCKED (Foundation Layer)
- **Base:** Radix UI `@radix-ui/react-context-menu`
- **Exported from:** `src/index.ts` (main public API)

#### PATTERNS Layer
- **Path:** `src/PATTERNS/menus/menus/context-menu/`
- **Files:**
  - `ContextMenuRoot.tsx`
  - `ContextMenuTrigger.tsx`
  - `ContextMenuContent.tsx`
  - `ContextMenuItem.tsx`
  - `ContextMenuLabel.tsx`
  - `ContextMenuGroup.tsx`
  - `ContextMenuSeparator.tsx`
  - `index.ts` (exports)
- **Status:** ⚠️ Custom implementation
- **Base:** Custom (uses PATTERNS Popover internally)
- **Exported from:** `src/PATTERNS/menus/menus/index.ts` → `src/index.ts`

---

### Dropdown Implementations

#### COMPOSITION Layer
- **Path:** `src/COMPOSITION/overlays/Dropdown/`
- **Files:**
  - `Dropdown.tsx` (main component, custom implementation)
  - `Dropdown.types.ts`
  - `dropdown-variants.ts`
  - `index.ts` (exports)
- **Status:** ⚠️ Custom implementation (NOT Radix-based)
- **Base:** Custom (standalone, no Popover dependency)
- **Exported from:** `src/COMPOSITION/overlays/index.ts` → `src/index.ts`

#### PATTERNS Layer (Radix-based)
- **Path:** `src/PATTERNS/menus/menus/dropdown/`
- **Files:**
  - `DropdownMenuRoot.tsx`
  - `DropdownMenuTrigger.tsx`
  - `DropdownMenuContent.tsx`
  - `DropdownMenuItem.tsx`
  - `DropdownMenuLabel.tsx`
  - `DropdownMenuGroup.tsx`
  - `DropdownMenuSeparator.tsx`
  - `DropdownMenuSub.tsx`
  - `DropdownMenuSubTrigger.tsx`
  - `DropdownMenuSubContent.tsx`
  - `DropdownMenuRadioGroup.tsx`
  - `DropdownMenuRadioItem.tsx`
  - `DropdownMenuCheckItem.tsx`
  - `index.ts` (exports)
- **Status:** ⚠️ Radix-based wrapper
- **Base:** Radix UI `@radix-ui/react-dropdown-menu`
- **Exported from:** `src/PATTERNS/menus/menus/index.ts` → `src/index.ts`

#### PATTERNS Layer (Legacy Wrapper)
- **Path:** `src/PATTERNS/menus/menus/DropdownMenu.tsx`
- **Files:**
  - `DropdownMenu.tsx` (single-file wrapper)
  - `DropdownMenu.stories.tsx` (Storybook)
- **Status:** ⚠️ Legacy wrapper around Radix primitives
- **Base:** Radix UI `@radix-ui/react-dropdown-menu`
- **Exported from:** NOT exported from main index (only via PATTERNS/menus/menus/index.ts)

---

### Popover Implementations

#### COMPOSITION Layer
- **Path:** `src/COMPOSITION/overlays/Popover.tsx`
- **Files:**
  - `Popover.tsx` (main component, Radix-based)
  - `Popover.stories.tsx` (Storybook)
- **Status:** ✅ Radix-based
- **Base:** Radix UI `@radix-ui/react-popover`
- **Exported from:** `src/COMPOSITION/overlays/index.ts` → `src/index.ts`

#### PATTERNS Layer
- **Path:** `src/PATTERNS/menus/menus/popover/`
- **Files:**
  - `PopoverRoot.tsx`
  - `PopoverTrigger.tsx`
  - `PopoverContent.tsx`
  - `PopoverArrow.tsx`
  - `index.ts` (exports)
- **Status:** ⚠️ Custom implementation
- **Base:** Custom (standalone, no Radix dependency)
- **Exported from:** `src/PATTERNS/menus/menus/index.ts` → `src/index.ts`

---

## STEP 2 — USAGE SCAN

### ContextMenu Usage

| Implementation | Import Sites | Files | Layer | Usage Type |
|----------------|--------------|-------|-------|------------|
| **COMPOSITION/ContextMenu** | 1 | `ContextMenu.stories.tsx` | COMPOSITION | 🧪 Story Only |
| **PATTERNS/context-menu** | 0 | None | N/A | 🗑️ Unused |

**Findings:**
- COMPOSITION ContextMenu: Only used in its own Storybook story
- PATTERNS ContextMenu: **No imports found** (not used anywhere)

---

### Dropdown Usage

| Implementation | Import Sites | Files | Layer | Usage Type |
|----------------|--------------|-------|-------|------------|
| **COMPOSITION/Dropdown** | 0 | None | N/A | 🗑️ Unused |
| **PATTERNS/DropdownMenu.tsx** | 1 | `DropdownMenu.stories.tsx` | PATTERNS | 🧪 Story Only |
| **PATTERNS/dropdown/** | 0 | None | N/A | 🗑️ Unused |

**Findings:**
- COMPOSITION Dropdown: **No imports found** (not used anywhere)
- PATTERNS DropdownMenu.tsx: Only used in its own Storybook story
- PATTERNS dropdown/ subcomponents: **No imports found** (not used anywhere)

---

### Popover Usage

| Implementation | Import Sites | Files | Layer | Usage Type |
|----------------|--------------|-------|-------|------------|
| **COMPOSITION/Popover** | 1 | `Popover.stories.tsx` | COMPOSITION | 🧪 Story Only |
| **PATTERNS/popover/** | 2 | `ContextMenuContent.tsx`, `DropdownMenuRoot.tsx` | PATTERNS | ⚠️ Internal Dependency |

**Findings:**
- COMPOSITION Popover: Only used in its own Storybook story
- PATTERNS Popover: Used internally by PATTERNS ContextMenu and PATTERNS DropdownMenu

---

## STEP 3 — DEPENDENCY GRAPH

```
COMPOSITION/ContextMenu
  └── Radix UI (@radix-ui/react-context-menu)
      └── No PATTERNS dependencies

COMPOSITION/Dropdown
  └── Custom implementation (standalone)
      └── No Popover dependency
      └── No PATTERNS dependencies

COMPOSITION/Popover
  └── Radix UI (@radix-ui/react-popover)
      └── No PATTERNS dependencies

PATTERNS/ContextMenu
  └── uses PATTERNS/Popover (PopoverRoot)
      └── PATTERNS/Popover (custom, standalone)

PATTERNS/DropdownMenu
  └── uses PATTERNS/Popover (PopoverRoot)
      └── PATTERNS/Popover (custom, standalone)

PATTERNS/Popover
  └── Custom implementation (standalone)
      └── No external dependencies
```

**Key Observations:**
1. **COMPOSITION** components are **independent** — no cross-layer dependencies
2. **PATTERNS** components form a **dependency chain**: ContextMenu → Popover, DropdownMenu → Popover
3. **PATTERNS Popover** is the **foundation** for both PATTERNS ContextMenu and PATTERNS DropdownMenu
4. **COMPOSITION Dropdown** is **completely standalone** (no Popover dependency)

---

## STEP 4 — CLASSIFICATION

### ContextMenu

| Implementation | Classification | Reason |
|---------------|----------------|--------|
| **COMPOSITION/ContextMenu** | ✅ **Actively Used (Foundation)** | LOCKED, exported from main index, Radix-based, canonical |
| **PATTERNS/context-menu** | 🗑️ **Unused / Dead Code** | No imports found, not used in production or stories |

---

### Dropdown

| Implementation | Classification | Reason |
|---------------|----------------|--------|
| **COMPOSITION/Dropdown** | 🗑️ **Unused / Dead Code** | No imports found, not used anywhere |
| **PATTERNS/DropdownMenu.tsx** | 🧪 **Story/Test Only** | Only used in its own Storybook story |
| **PATTERNS/dropdown/** | 🗑️ **Unused / Dead Code** | No imports found, not used anywhere |

---

### Popover

| Implementation | Classification | Reason |
|---------------|----------------|--------|
| **COMPOSITION/Popover** | ✅ **Actively Used (Foundation)** | Radix-based, exported from main index, canonical |
| **PATTERNS/popover/** | ⚠️ **Legacy but Still Required** | Used by PATTERNS ContextMenu and PATTERNS DropdownMenu (internal dependency) |

---

## STEP 5 — RECOMMENDATIONS (NO CHANGES)

### ContextMenu

**Recommended Canonical Implementation:**
- ✅ **COMPOSITION/ContextMenu** (Radix-based, LOCKED, Foundation layer)

**Components That Can Be Removed Safely:**
- 🗑️ **PATTERNS/context-menu/** (entire directory) — No usage found

**Components That Require Migration First:**
- None (PATTERNS ContextMenu is unused)

**Blocking Dependencies:**
- None

---

### Dropdown

**Recommended Canonical Implementation:**
- ⚠️ **Decision Required:** Choose between:
  1. **COMPOSITION/Dropdown** (custom, standalone, token-driven)
  2. **PATTERNS/DropdownMenu** (Radix-based, more features)

**Current State:**
- COMPOSITION Dropdown: Custom implementation, no Radix dependency
- PATTERNS DropdownMenu: Radix-based, full feature set (submenus, radio, checkbox)

**Components That Can Be Removed Safely:**
- 🗑️ **COMPOSITION/Dropdown** — If choosing PATTERNS as canonical
- 🗑️ **PATTERNS/DropdownMenu.tsx** (legacy wrapper) — If keeping PATTERNS/dropdown/ subcomponents
- 🗑️ **PATTERNS/dropdown/** — If choosing COMPOSITION as canonical

**Components That Require Migration First:**
- None (both are unused in production)

**Blocking Dependencies:**
- None

**Recommendation:**
- **Migrate to PATTERNS/DropdownMenu** (Radix-based) for consistency with other menu components
- **Remove COMPOSITION/Dropdown** (custom implementation diverges from Radix pattern)

---

### Popover

**Recommended Canonical Implementation:**
- ✅ **COMPOSITION/Popover** (Radix-based, Foundation layer)

**Components That Can Be Removed Safely:**
- ⚠️ **PATTERNS/popover/** — **CANNOT be removed yet** (used by PATTERNS ContextMenu and PATTERNS DropdownMenu)

**Components That Require Migration First:**
- **PATTERNS/ContextMenu** — Migrate to COMPOSITION/ContextMenu (already exists, LOCKED)
- **PATTERNS/DropdownMenu** — Migrate to COMPOSITION/Popover (or remove if unused)

**Blocking Dependencies:**
- PATTERNS ContextMenu depends on PATTERNS Popover
- PATTERNS DropdownMenu depends on PATTERNS Popover

**Migration Path:**
1. Remove PATTERNS ContextMenu (unused) → removes dependency on PATTERNS Popover
2. Remove PATTERNS DropdownMenu (unused) → removes dependency on PATTERNS Popover
3. Remove PATTERNS Popover (no longer needed)

---

## SUMMARY TABLE

| Component | Layer | Base | Usage | Status | Action |
|-----------|-------|------|-------|--------|--------|
| **ContextMenu** | COMPOSITION | Radix | Story only | ✅ LOCKED | Keep |
| **ContextMenu** | PATTERNS | Custom | None | 🗑️ Unused | Remove |
| **Dropdown** | COMPOSITION | Custom | None | 🗑️ Unused | Remove |
| **DropdownMenu** | PATTERNS | Radix | Story only | 🧪 Story | Decide |
| **Popover** | COMPOSITION | Radix | Story only | ✅ Foundation | Keep |
| **Popover** | PATTERNS | Custom | Internal | ⚠️ Legacy | Remove after migration |

---

## SAFE REMOVALS

The following components can be **safely removed** immediately (no production usage):

1. ✅ **PATTERNS/context-menu/** (entire directory)
   - No imports found
   - Not used in production or stories
   - COMPOSITION ContextMenu exists as canonical replacement

2. ✅ **COMPOSITION/Dropdown/** (entire directory)
   - No imports found
   - Not used anywhere
   - Custom implementation diverges from Radix pattern

3. ✅ **PATTERNS/DropdownMenu.tsx** (legacy wrapper)
   - Only used in its own story
   - Redundant with PATTERNS/dropdown/ subcomponents

---

## REQUIRES MIGRATION FIRST

The following components **cannot be removed** until dependencies are resolved:

1. ⚠️ **PATTERNS/popover/** (entire directory)
   - **Blocked by:** PATTERNS ContextMenu (unused, can be removed)
   - **Blocked by:** PATTERNS DropdownMenu (unused, can be removed)
   - **Action:** Remove PATTERNS ContextMenu and PATTERNS DropdownMenu first, then remove PATTERNS Popover

---

## ARCHITECTURAL OBSERVATIONS

1. **COMPOSITION Layer:**
   - All components are Radix-based (except Dropdown)
   - Independent, no cross-layer dependencies
   - ContextMenu is LOCKED (Foundation layer)

2. **PATTERNS Layer:**
   - Forms a dependency chain: ContextMenu → Popover, DropdownMenu → Popover
   - PATTERNS Popover is the foundation for other PATTERNS menu components
   - All PATTERNS menu components are **unused in production**

3. **Duplicate Implementations:**
   - ContextMenu: COMPOSITION (Radix) vs PATTERNS (Custom)
   - Popover: COMPOSITION (Radix) vs PATTERNS (Custom)
   - Dropdown: COMPOSITION (Custom) vs PATTERNS (Radix)

4. **Export Status:**
   - COMPOSITION components: Exported from main `src/index.ts`
   - PATTERNS components: Exported from `src/PATTERNS/menus/menus/index.ts` → `src/index.ts`
   - All menu components are publicly available via main index

---

## NEXT STEPS (For MIGRATION_12)

1. **Immediate Removals (Safe):**
   - Remove `src/PATTERNS/menus/menus/context-menu/`
   - Remove `src/COMPOSITION/overlays/Dropdown/`
   - Remove `src/PATTERNS/menus/menus/DropdownMenu.tsx`

2. **Dependency Resolution:**
   - Remove `src/PATTERNS/menus/menus/context-menu/` (unused, removes dependency on PATTERNS Popover)
   - Remove `src/PATTERNS/menus/menus/dropdown/` (unused, removes dependency on PATTERNS Popover)
   - Remove `src/PATTERNS/menus/menus/popover/` (no longer needed)

3. **Canonical Consolidation:**
   - **ContextMenu:** Use COMPOSITION/ContextMenu (LOCKED, Radix-based)
   - **Popover:** Use COMPOSITION/Popover (Radix-based)
   - **Dropdown:** Decide between:
     - Option A: Create new COMPOSITION/Dropdown (Radix-based, consistent with other menus)
     - Option B: Use PATTERNS/DropdownMenu (already Radix-based, but in PATTERNS layer)

4. **Export Cleanup:**
   - Remove PATTERNS menu exports from `src/PATTERNS/menus/menus/index.ts`
   - Update `src/index.ts` to remove PATTERNS menu exports
   - Keep only COMPOSITION menu exports

---

## VERIFICATION

- ✅ All implementations inventoried
- ✅ All usage sites scanned
- ✅ Dependency graph mapped
- ✅ Classification complete
- ✅ Recommendations provided
- ✅ Zero code changes made (READ-ONLY audit)

---

**End of Report**

