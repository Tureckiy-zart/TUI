# Menu Consolidation Audit

## PHASE 1: USAGE AUDIT (NO CHANGES)

### ContextMenu Implementations

#### 1. COMPOSITION/overlays/ContextMenu
- **Path**: `src/COMPOSITION/overlays/ContextMenu/ContextMenu.tsx`
- **Type**: Radix-based (uses `@radix-ui/react-context-menu`)
- **Status**: ✅ LOCKED (Foundation Layer)
- **Exported from**: `src/COMPOSITION/overlays/index.ts`
- **Public API**: ✅ Exported in `src/index.ts` (lines 541-565)
- **Layer**: COMPOSITION (Foundation)
- **Dependencies**: Radix UI
- **Features**: Full Radix ContextMenu API, token-driven styling, size inheritance, submenus

#### 2. PATTERNS/menus/menus/context-menu
- **Path**: `src/PATTERNS/menus/menus/context-menu/*`
- **Type**: Custom implementation (uses PATTERNS PopoverRoot)
- **Status**: ⚠️ Custom/Extension
- **Exported from**: `src/PATTERNS/menus/menus/index.ts`
- **Public API**: ❌ NOT exported in main `src/index.ts`
- **Layer**: PATTERNS
- **Dependencies**: PATTERNS PopoverRoot (custom)
- **Features**: Custom right-click handling, uses PopoverRoot internally

**Recommendation**: COMPOSITION/ContextMenu is canonical (Radix-based, locked, exported publicly)

---

### Dropdown Implementations

#### 1. COMPOSITION/overlays/Dropdown
- **Path**: `src/COMPOSITION/overlays/Dropdown/Dropdown.tsx`
- **Type**: Custom implementation (no Radix)
- **Status**: ⚠️ Custom
- **Exported from**: `src/COMPOSITION/overlays/index.ts`
- **Public API**: ❌ NOT exported in main `src/index.ts`
- **Layer**: COMPOSITION
- **Dependencies**: Custom Portal, custom keyboard navigation
- **Features**: Custom dropdown with manual positioning, keyboard navigation, roving tabindex

#### 2. PATTERNS/menus/menus/DropdownMenu.tsx
- **Path**: `src/PATTERNS/menus/menus/DropdownMenu.tsx`
- **Type**: Radix-based (uses `@radix-ui/react-dropdown-menu`)
- **Status**: ⚠️ Simple wrapper
- **Exported from**: `src/PATTERNS/menus/menus/index.ts`
- **Public API**: ✅ Exported in `src/index.ts` (lines 493-519)
- **Layer**: PATTERNS
- **Dependencies**: Radix UI
- **Features**: Direct Radix wrapper, minimal styling

#### 3. PATTERNS/menus/menus/dropdown/*
- **Path**: `src/PATTERNS/menus/menus/dropdown/*`
- **Type**: Custom implementation (uses PATTERNS PopoverRoot)
- **Status**: ⚠️ Custom/Extension
- **Exported from**: `src/PATTERNS/menus/menus/index.ts`
- **Public API**: ✅ Exported in `src/index.ts` (lines 493-519)
- **Layer**: PATTERNS
- **Dependencies**: PATTERNS PopoverRoot (custom)
- **Features**: Full dropdown menu with submenus, checkboxes, radio groups, custom implementation

**Recommendation**: PATTERNS/menus/menus/DropdownMenu.tsx (Radix-based) should be canonical, but PATTERNS/menus/menus/dropdown/* is more feature-complete. Need to check actual usage.

---

### Popover Implementations

#### 1. COMPOSITION/overlays/Popover.tsx
- **Path**: `src/COMPOSITION/overlays/Popover.tsx`
- **Type**: Radix-based (uses `@radix-ui/react-popover`)
- **Status**: ✅ Radix-based
- **Exported from**: `src/COMPOSITION/overlays/index.ts`
- **Public API**: ❌ NOT exported in main `src/index.ts`
- **Layer**: COMPOSITION
- **Dependencies**: Radix UI
- **Features**: Radix Popover with token-driven styling, PopoverWrapper convenience component

#### 2. PATTERNS/menus/menus/popover/*
- **Path**: `src/PATTERNS/menus/menus/popover/*`
- **Type**: Custom implementation
- **Status**: ⚠️ Custom
- **Exported from**: `src/PATTERNS/menus/menus/index.ts`
- **Public API**: ✅ Exported in `src/index.ts` (lines 527-535)
- **Layer**: PATTERNS
- **Dependencies**: Custom context/state management
- **Features**: Custom PopoverRoot, PopoverTrigger, PopoverContent, PopoverArrow
- **Used by**: PATTERNS ContextMenu, PATTERNS DropdownMenu, HoverCard

**Recommendation**: COMPOSITION/Popover.tsx (Radix-based) should be canonical, but PATTERNS version is heavily used by other PATTERNS components.

---

## Usage Analysis

### Import Sites (from grep results)

**ContextMenu:**
- COMPOSITION version: Exported publicly, used in tests/stories
- PATTERNS version: Only internal to PATTERNS, not exported publicly

**Dropdown:**
- COMPOSITION version: Not exported publicly
- PATTERNS versions: Exported publicly, used in docs

**Popover:**
- COMPOSITION version: Not exported publicly
- PATTERNS version: Exported publicly, used by other PATTERNS components

---

## Consolidation Strategy

### ContextMenu
✅ **Winner**: COMPOSITION/overlays/ContextMenu
- Radix-based, locked, already exported publicly
- **Action**: Remove PATTERNS/menus/menus/context-menu (not exported publicly)

### Dropdown
⚠️ **Decision needed**: 
- PATTERNS/menus/menus/DropdownMenu.tsx is Radix-based but simple
- PATTERNS/menus/menus/dropdown/* is custom but feature-complete and exported
- COMPOSITION/Dropdown is custom and not exported
- **Action**: Need to check which is actually used in codebase

### Popover
⚠️ **Decision needed**:
- COMPOSITION/Popover.tsx is Radix-based but not exported
- PATTERNS/menus/menus/popover/* is custom but exported and used by other PATTERNS components
- **Action**: Migrate PATTERNS components to use COMPOSITION Popover, then remove PATTERNS version

---

## Next Steps (PHASE 2)

1. **ContextMenu**: Remove PATTERNS version (not exported, safe to remove)
2. **Dropdown**: Audit actual usage, decide between Radix wrapper vs custom implementation
3. **Popover**: Migrate PATTERNS components to COMPOSITION version, then remove PATTERNS version

