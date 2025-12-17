# Semantic Duplicate Audit Report

**Date:** 2025-12-17  
**Auditor:** Senior UI Architect & Code Auditor  
**Scope:** PRIMITIVES, COMPOSITION, PATTERNS, DOMAIN layers  
**Status:** UPDATED - Improvements Applied

---

## Executive Summary

This audit identified **10 candidate groups** of potentially overlapping components across the codebase. Analysis reveals:

- **2 groups** were exact code duplicates (Progress, Skeleton) - ✅ **RESOLVED**
- **3 groups** represent valid architectural separation (Card, Layout, Input/Search)
- **5 groups** require clarification or potential consolidation (Menus, Overlays, Tables)

---

## Group A: Card Components

### Locations
- `PRIMITIVES/Card/Card.tsx`
- `COMPOSITION/layout/Card/Card.tsx`
- `PATTERNS/cards/cards/CardBase/CardBase.tsx`

### Analysis

**PRIMITIVES/Card:**
- Simple card component with subcomponents (CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- Uses raw CSS classes (`rounded-xl`, `border`, `bg-card`, etc.)
- Minimal abstraction, direct styling
- **Purpose:** Basic card container with semantic subcomponents

**COMPOSITION/layout/Card:**
- Token-driven card component (uses `CARD_TOKENS`)
- Subcomponents: CardHeader, CardBody, CardFooter
- Built on top of `Box` component
- Size variants (sm, md, lg) with token-based padding, radius, shadow
- **Purpose:** Token-compliant card layout primitive

**PATTERNS/cards/CardBase:**
- Layout wrapper for domain-specific cards (ArtistCard, CategoryCard, etc.)
- Uses `DOMAIN_TOKENS` for styling
- Provides ImageWrapper, ContentWrapper, FooterWrapper
- **Purpose:** Reusable layout structure for domain card patterns

### Semantic Difference

These are **NOT the same concept**:

1. **PRIMITIVES/Card** - Legacy/legacy-compatible basic card (raw CSS)
2. **COMPOSITION/layout/Card** - Token-driven canonical card primitive
3. **PATTERNS/cards/CardBase** - Domain-specific card layout pattern

### Classification

✅ **Valid Separation** (with caveat)

**Reasoning:**
- Different abstraction layers (Primitive → Composition → Pattern)
- Different token systems (raw CSS → CARD_TOKENS → DOMAIN_TOKENS)
- Different use cases (basic container → layout primitive → domain pattern)

**Recommendation:**
- **PRIMITIVES/Card** should be documented as legacy or deprecated
- **COMPOSITION/layout/Card** is the canonical token-driven card
- **PATTERNS/cards/CardBase** is correctly placed as a pattern layer component
- Consider deprecating PRIMITIVES/Card if COMPOSITION/layout/Card covers all use cases

---

## Group B: Progress Components

### Locations
- `PRIMITIVES/Progress/Progress.tsx` ✅ (Canonical - Active)
- ~~`PATTERNS/states/LoadingState/Progress/Progress.tsx`~~ ❌ (Removed)

### Analysis

**Both implementations are IDENTICAL:**
- Same interface (`ProgressProps`)
- Same implementation logic
- Same styling
- Same exports

**Exports:**
- `PRIMITIVES/Progress` exported from `src/index.ts` ✅
- ~~`PATTERNS/states/LoadingState/Progress`~~ ❌ (Removed)

### Semantic Difference

These are **the same concept** with no semantic difference.

### Classification

✅ **RESOLVED** - Duplicate Removed

**Status Update:**
- ✅ `PATTERNS/states/LoadingState/Progress` has been removed
- ✅ All imports now use `PRIMITIVES/Progress`
- ✅ Component correctly exported from `src/index.ts`

**Original Reasoning:**
- Exact code duplication
- No architectural reason for separation
- Progress is a primitive concept, not a pattern-specific loading state

**Resolution:**
- **Kept:** `PRIMITIVES/Progress` (canonical location)
- **Removed:** `PATTERNS/states/LoadingState/Progress`
- **Action Completed:** All imports updated to use `PRIMITIVES/Progress`
- **Note:** If domain-specific progress variants are needed, they should extend PRIMITIVES/Progress, not duplicate it

---

## Group C: Skeleton Components

### Locations
- `PRIMITIVES/Skeleton/Skeleton.tsx` ✅ (Canonical - Active)
- ~~`PATTERNS/states/LoadingState/Skeleton/Skeleton.tsx`~~ ❌ (Removed)

### Analysis

**Both implementations are IDENTICAL:**
- Same interface (`SkeletonProps`)
- Same CVA variants (`skeletonVariants`)
- Same token usage (`DATA_TOKENS`)
- Same exports

**Exports:**
- `PRIMITIVES/Skeleton` exported from `src/index.ts` ✅
- ~~`PATTERNS/states/LoadingState/Skeleton`~~ ❌ (Removed)

### Semantic Difference

These are **the same concept** with no semantic difference.

### Classification

✅ **RESOLVED** - Duplicate Removed

**Status Update:**
- ✅ `PATTERNS/states/LoadingState/Skeleton` has been removed
- ✅ All imports now use `PRIMITIVES/Skeleton`
- ✅ Component correctly exported from `src/index.ts`
- ✅ Domain-specific skeletons (EventCardSkeleton, VenueCardSkeleton) correctly use `PRIMITIVES/Skeleton`

**Original Reasoning:**
- Exact code duplication
- Skeleton is a primitive loading state component
- No pattern-specific logic justifies duplication

**Resolution:**
- **Kept:** `PRIMITIVES/Skeleton` (canonical location)
- **Removed:** `PATTERNS/states/LoadingState/Skeleton`
- **Action Completed:** All imports updated to use `PRIMITIVES/Skeleton`
- **Note:** Domain-specific skeletons (EventCardSkeleton, VenueCardSkeleton) correctly extend the primitive

---

## Group D: ContextMenu Components

### Locations
- `COMPOSITION/overlays/ContextMenu/ContextMenu.tsx`
- `PATTERNS/menus/menus/context-menu/ContextMenuRoot.tsx` (+ subcomponents)

### Analysis

**COMPOSITION/overlays/ContextMenu:**
- Radix UI-based (`@radix-ui/react-context-menu`)
- Token-driven styling (`CONTEXT_MENU_TOKENS`)
- **LOCKED** (Foundation layer)
- Full compound component API (Root, Trigger, Content, Item, etc.)
- Handles all behavior via Radix (pointer, keyboard, focus, ARIA, positioning)

**PATTERNS/menus/menus/context-menu:**
- Custom implementation
- Uses `PopoverRoot` from PATTERNS/menus/menus/popover
- Custom context for keyboard navigation
- Position management for right-click

### Semantic Difference

These are **different implementations** of the same concept:

1. **COMPOSITION/overlays/ContextMenu** - Radix-based, locked Foundation component
2. **PATTERNS/menus/menus/context-menu** - Custom implementation using Popover pattern

### Classification

⚠️ **Ambiguous / Needs Clarification**

**Reasoning:**
- COMPOSITION version is LOCKED and canonical
- PATTERNS version appears to be a custom reimplementation
- Unclear why both exist

**Recommendation:**
- **Investigate usage:** Check if PATTERNS/context-menu is actually used
- **If unused:** Remove PATTERNS/context-menu, use COMPOSITION/overlays/ContextMenu
- **If used:** Document why PATTERNS version is needed (what does it provide that COMPOSITION doesn't?)
- **If PATTERNS is needed:** Consider if it should be migrated to use COMPOSITION/overlays/ContextMenu internally

---

## Group E: Dropdown Components

### Locations
- `COMPOSITION/overlays/Dropdown/Dropdown.tsx`
- `PATTERNS/menus/menus/dropdown/DropdownMenuRoot.tsx` (+ subcomponents)

### Analysis

**COMPOSITION/overlays/Dropdown:**
- Custom implementation with full state management
- Context-based API (Root, Trigger, Menu, Item)
- Custom keyboard navigation
- Custom positioning logic
- Token-driven styling (`DROPDOWN_TOKENS`)

**PATTERNS/menus/menus/dropdown:**
- Custom implementation
- Uses `PopoverRoot` from PATTERNS/menus/menus/popover
- Context for keyboard navigation (focusedIndex, itemIds)
- Wraps PopoverRoot with menu-specific context

### Semantic Difference

These are **different implementations** of dropdown menus:

1. **COMPOSITION/overlays/Dropdown** - Standalone custom dropdown
2. **PATTERNS/menus/menus/dropdown** - Dropdown built on Popover pattern

### Classification

⚠️ **Ambiguous / Needs Clarification**

**Reasoning:**
- Two custom implementations of the same concept
- Unclear architectural relationship
- COMPOSITION version appears more complete

**Recommendation:**
- **Investigate usage:** Check which version is used where
- **Document relationship:** Clarify when to use COMPOSITION vs PATTERNS
- **Consider consolidation:** If PATTERNS version is just a wrapper, consider deprecating it
- **If both needed:** Document clear use case separation

---

## Group F: Popover Components

### Locations
- `COMPOSITION/overlays/Popover.tsx`
- `PATTERNS/menus/menus/popover/PopoverRoot.tsx` (+ subcomponents)

### Analysis

**COMPOSITION/overlays/Popover:**
- Radix UI-based (`@radix-ui/react-popover`)
- Token-driven styling (`POPOVER_TOKENS`)
- Direct Radix primitive exports (Popover, PopoverTrigger, PopoverContent)
- Wrapper component (`PopoverWrapper`) for convenience

**PATTERNS/menus/menus/popover:**
- Custom implementation
- Custom context (`PopoverContext`)
- Custom Root component with state management
- Used as base for other menu patterns (ContextMenu, DropdownMenu)

### Semantic Difference

These are **different implementations**:

1. **COMPOSITION/overlays/Popover** - Radix-based primitive
2. **PATTERNS/menus/menus/popover** - Custom implementation used as foundation for menu patterns

### Classification

⚠️ **Ambiguous / Needs Clarification**

**Reasoning:**
- COMPOSITION uses Radix (standard approach)
- PATTERNS uses custom implementation
- PATTERNS version is used as dependency for other menu patterns
- Unclear why custom implementation is needed when Radix exists

**Recommendation:**
- **Investigate:** Why does PATTERNS need custom Popover when COMPOSITION has Radix-based one?
- **If PATTERNS is needed:** Document why custom implementation is required
- **Consider migration:** Can PATTERNS menu patterns use COMPOSITION/overlays/Popover?
- **If migration possible:** Migrate PATTERNS menus to use COMPOSITION Popover

---

## Group G: Dialog vs Modal

### Locations
- `COMPOSITION/overlays/Dialog.tsx`
- `COMPOSITION/overlays/Modal/Modal.tsx`

### Analysis

**COMPOSITION/overlays/Dialog:**
- Semantic wrapper over `Modal.Root` and `Modal.Content`
- Provides Dialog-specific subcomponents (Header, Title, Description, Body, Footer)
- Full A11y compliance (aria-labelledby, aria-describedby)
- Uses Modal internally

**COMPOSITION/overlays/Modal:**
- Radix-based (`@radix-ui/react-dialog`)
- Token-driven styling (`MODAL_TOKENS`)
- Low-level modal primitive
- Compound component API (Root, Trigger, Content, Header, Title, Description, Footer, Close)

### Semantic Difference

These are **NOT duplicates** - Dialog is a semantic wrapper over Modal:

1. **Modal** - Low-level modal primitive (Radix-based)
2. **Dialog** - High-level semantic dialog component (uses Modal internally)

### Classification

✅ **Valid Separation**

**Reasoning:**
- Dialog is a semantic convenience layer over Modal
- Different abstraction levels (primitive vs semantic)
- Dialog provides opinionated structure, Modal provides flexibility

**Recommendation:**
- **Keep both:** This is correct architectural layering
- **Document:** Clarify that Dialog uses Modal internally
- **No action needed:** This separation is intentional and correct

---

## Group H: Table Components

### Locations
- `PATTERNS/tables/SimpleTable/Table.tsx`
- `PATTERNS/tables/table/Table.tsx`

### Analysis

**PATTERNS/tables/SimpleTable:**
- Simple table with columns and data props
- Basic rendering (thead, tbody, rows, cells)
- No sorting, no expandable rows, no loading states
- Generic type support (`<T extends Record<string, unknown>>`)

**PATTERNS/tables/table:**
- Complex table with full feature set
- Sorting support (TableSortIcon, sortState)
- Expandable rows (TableExpandableContent)
- Loading states (TableLoadingState)
- Empty states (TableEmpty)
- Context-based API (Table.Root, Table.Header, Table.Body, etc.)
- Token-driven styling (`TABLE_TOKENS`)

### Semantic Difference

These are **different complexity levels** of the same concept:

1. **SimpleTable** - Basic table for simple data display
2. **Table** - Full-featured table with advanced capabilities

### Classification

⚠️ **Ambiguous / Needs Clarification**

**Reasoning:**
- Both solve the same problem (displaying tabular data)
- Different complexity levels
- Unclear if SimpleTable is legacy or intentionally simple

**Recommendation:**
- **Document purpose:** Clarify when to use SimpleTable vs Table
- **If SimpleTable is legacy:** Consider deprecating and migrating to Table
- **If SimpleTable is needed:** Document why simple version is necessary (performance? simplicity?)
- **Consider:** Can SimpleTable be a simplified API over Table.Root?

---

## Group I: Layout Components (Box, Container, Flex, Stack)

### Locations
- `COMPOSITION/layout/Box/Box.tsx`
- `COMPOSITION/layout/Container/Container.tsx`
- `COMPOSITION/layout/Flex/Flex.tsx`
- `COMPOSITION/layout/Stack/Stack.tsx`

### Analysis

**Box:**
- Lowest-level layout primitive
- Pure container with spacing, radius, shadow, background
- No layout composition (no flex, no grid)
- Generic element rendering (`as` prop)

**Container:**
- Specialized for width constraint and horizontal padding
- Single responsibility: max-width + padding
- Uses CSS-layer class `.tm-container`

**Flex:**
- Advanced flexbox container
- Full flexbox control (direction, wrap, grow, shrink, basis, alignment, gap)
- Built on Box
- For advanced flexbox needs

**Stack:**
- Primary layout composition primitive
- Semantic spacing (vertical/horizontal)
- Built on Box
- For simple vertical/horizontal flows

### Semantic Difference

These are **NOT duplicates** - they represent different abstraction levels:

1. **Box** - Base container (no layout)
2. **Container** - Width constraint primitive
3. **Flex** - Advanced flexbox
4. **Stack** - Simple layout composition

### Classification

✅ **Valid Separation**

**Reasoning:**
- Different responsibilities (container vs width constraint vs flexbox vs layout composition)
- Clear abstraction hierarchy (Box → Stack/Flex/Container)
- Each serves distinct use case

**Recommendation:**
- **Keep all:** This is correct architectural separation
- **No action needed:** Components are well-differentiated

---

## Group J: Input vs SearchInput vs SearchBar

### Locations
- `PRIMITIVES/Input/Input.tsx`
- `PATTERNS/filters/filters/SearchInput.tsx`
- `COMPOSITION/navigation/SearchBar/SearchBar.tsx`

### Analysis

**PRIMITIVES/Input:**
- Base input primitive
- Token-driven (`INPUT_TOKENS`)
- Variants, sizes, states, icon support
- Generic input component

**PATTERNS/filters/SearchInput:**
- Specialized search input component
- Uses `PRIMITIVES/Input` internally
- Adds debouncing, clear button, search icon
- Pattern-specific behavior

**COMPOSITION/navigation/SearchBar:**
- Full search bar with suggestions
- Uses `PATTERNS/filters/SearchInput` internally
- Adds suggestion dropdown, keyboard navigation
- Navigation-specific composition

### Semantic Difference

These are **NOT duplicates** - they represent composition layers:

1. **Input** - Base primitive
2. **SearchInput** - Pattern (adds search-specific behavior)
3. **SearchBar** - Composition (adds suggestions UI)

### Classification

✅ **Valid Separation**

**Reasoning:**
- Clear composition hierarchy (Primitive → Pattern → Composition)
- Each adds specific functionality
- Correct architectural layering

**Recommendation:**
- **Keep all:** This is correct architectural composition
- **No action needed:** Components are properly layered

---

## Summary of Recommendations

### ✅ Completed Actions (High Priority)

1. **✅ Remove duplicate Progress:**
   - ✅ Removed `PATTERNS/states/LoadingState/Progress`
   - ✅ Updated imports to use `PRIMITIVES/Progress`

2. **✅ Remove duplicate Skeleton:**
   - ✅ Removed `PATTERNS/states/LoadingState/Skeleton`
   - ✅ Updated imports to use `PRIMITIVES/Skeleton`

### Investigation Required (Medium Priority)

3. **ContextMenu duplication:**
   - Investigate usage of `PATTERNS/menus/menus/context-menu`
   - If unused, remove; if used, document why custom implementation is needed

4. **Dropdown duplication:**
   - Investigate usage of both implementations
   - Document relationship and use cases
   - Consider consolidation

5. **Popover duplication:**
   - Investigate why PATTERNS needs custom Popover
   - Consider migrating PATTERNS menus to use COMPOSITION Popover

6. **Table duplication:**
   - Document purpose of SimpleTable vs Table
   - Consider deprecation or API simplification

### Documentation Required (Low Priority)

7. **Card components:**
   - Document PRIMITIVES/Card as legacy/deprecated
   - Clarify when to use COMPOSITION/layout/Card vs PATTERNS/cards/CardBase

---

## Architectural Observations

### Positive Patterns

1. **Clear composition hierarchy** in Input → SearchInput → SearchBar
2. **Valid separation** in Dialog (semantic) vs Modal (primitive)
3. **Proper layering** in Layout components (Box → Stack/Flex/Container)

### Areas of Concern

1. ~~**Code duplication** in Progress and Skeleton (exact duplicates)~~ ✅ **RESOLVED**
2. **Multiple menu implementations** (ContextMenu, Dropdown, Popover) with unclear relationships
3. **Legacy components** (PRIMITIVES/Card) that may conflict with canonical versions

### Recommendations for Future

1. **Establish clear deprecation policy** for legacy components
2. **Document pattern dependencies** (e.g., PATTERNS menus depend on custom Popover)
3. **Create migration guides** for moving from legacy to canonical components
4. **Add lint rules** to prevent duplicate component creation

---

## Conclusion

The audit identified **2 exact duplicates** that have been **successfully removed**, and **5 groups** requiring investigation and clarification. The codebase shows good architectural separation in most areas, but menu components and some legacy primitives need documentation and potential consolidation.

**Completed Actions:**
1. ✅ Removed Progress and Skeleton duplicates
2. ✅ Updated all imports to use canonical PRIMITIVES versions

**Remaining Next Steps:**
1. Investigate menu component usage and relationships
2. Document component purposes and migration paths
3. Establish deprecation policy for legacy components

---

**End of Report**

