# L4 Data Components Audit Report

**Date:** 2025-12-13  
**Task:** L4_S1 - Audit of existing data components  
**Status:** Complete

## Executive Summary

This audit report documents the current state of all data-driven components in `src/components/data/**/*`, identifying legacy code, hardcoded Tailwind classes, missing tokens, and inconsistent APIs. The audit covers Table, List, Pagination, Badge, and EmptyState components.

---

## 1. Component Inventory

### 1.1 Data Components Structure

```
src/components/data/
├── data-list/          ✅ Token-driven (CVA-based)
│   ├── DataList.tsx
│   ├── DataListItem.tsx
│   ├── DataListLabel.tsx
│   └── DataListValue.tsx
├── empty-state/        ✅ Token-driven (Surface/Stack integration)
│   ├── EmptyState.tsx
│   ├── EmptyStateIcon.tsx
│   ├── EmptyStateTitle.tsx
│   ├── EmptyStateDescription.tsx
│   └── EmptyStateAction.tsx
├── skeleton/           ✅ Token-driven (CVA-based)
│   └── Skeleton.tsx
├── table/              ✅ Token-driven (Compound component)
│   ├── Table.tsx (Root)
│   ├── TableHead.tsx
│   ├── TableHeader.tsx
│   ├── TableBody.tsx
│   ├── TableRow.tsx
│   ├── TableCell.tsx
│   ├── TableEmpty.tsx
│   ├── TableLoadingState.tsx
│   ├── TableExpandableContent.tsx
│   └── TableSortIcon.tsx
├── List.tsx            ❌ LEGACY (hardcoded Tailwind)
├── Table.tsx           ❌ LEGACY (hardcoded Tailwind)
└── Timeline.tsx        ❌ LEGACY (hardcoded Tailwind)
```

### 1.2 Related Components

```
src/components/navigation/pagination/
└── Pagination.tsx      ⚠️  Partially token-driven (NAVIGATION_TOKENS, some hardcoded)
```

### 1.3 Badge Component Status

**Status:** ❌ **NOT FOUND AS STANDALONE COMPONENT**

Badge functionality is embedded in domain components:
- `EventCard` - uses `eventCardBadgeVariants`
- `VenueCard` - uses `venueCardBadgeVariants`
- `CategoryCard` - uses `categoryCardBadgeVariants`
- `TicketCard` - uses `ticketCardBadgeVariants`
- `ArtistCard` - uses `artistCardBadgeVariants`

All badge variants use `DOMAIN_TOKENS.badges` but there is no standalone `Badge` component in `src/components/data/` or `src/components/`.

---

## 2. Legacy Components Analysis

### 2.1 List.tsx (Legacy)

**Location:** `src/components/data/List.tsx`  
**Status:** ❌ **LEGACY - REQUIRES MIGRATION**

**Issues:**
1. **Hardcoded Tailwind classes:**
   - `"space-y-sm"` - should use `DATA_TOKENS.dataList.spacing.gap`
   - `"rounded-lg border p-md"` - should use tokens
   - `"hover:bg-muted/50"` - should use `DATA_TOKENS.table.colors.rowHover`
   - `"font-medium text-foreground"` - should use typography tokens
   - `"mt-xs text-sm text-muted-foreground"` - should use typography tokens

2. **Missing token integration:**
   - No `DATA_TOKENS` usage
   - No CVA variants
   - No responsive spacing tokens

3. **Inconsistent API:**
   - Uses custom `ListItem` interface instead of standard props
   - No compound component pattern
   - No size variants

**Recommendation:** Migrate to use `DataList` component or create new token-driven `List` component.

---

### 2.2 Table.tsx (Legacy)

**Location:** `src/components/data/Table.tsx`  
**Status:** ❌ **LEGACY - REQUIRES MIGRATION**

**Issues:**
1. **Hardcoded Tailwind classes:**
   - `"overflow-x-auto"` - should use token or utility
   - `"w-full border-collapse"` - should use tokens
   - `"border-b"` - should use `DATA_TOKENS.table.colors.border`
   - `"p-sm text-left font-medium text-muted-foreground"` - should use tokens
   - `"border-b hover:bg-muted/50"` - should use tokens
   - `"p-sm"` - should use `DATA_TOKENS.table.padding.cell`

2. **Missing token integration:**
   - No `DATA_TOKENS` usage
   - No compound component pattern
   - No sorting, expandable rows, loading states

3. **Inconsistent API:**
   - Simple props-based API vs compound component pattern in new Table
   - No size variants
   - No accessibility features

**Recommendation:** Remove legacy component, use `Table.Root` compound component instead.

---

### 2.3 Timeline.tsx (Legacy)

**Location:** `src/components/data/Timeline.tsx`  
**Status:** ❌ **LEGACY - REQUIRES MIGRATION**

**Issues:**
1. **Hardcoded Tailwind classes:**
   - `"space-y-lg"` - should use spacing tokens
   - `"h-3 w-3 rounded-full border-2 border-background bg-primary"` - should use tokens
   - `"mt-sm h-12 w-px bg-border"` - should use tokens
   - `"ml-md"` - should use spacing tokens

2. **Missing token integration:**
   - No `DATA_TOKENS` usage
   - No CVA variants
   - No size/spacing variants

3. **Inconsistent API:**
   - Custom `TimelineItem` interface
   - No compound component pattern
   - Uses `Heading` and `Text` from `@/components/ui/` (should use tokens directly)

**Recommendation:** Create token-driven Timeline component with CVA variants and DATA_TOKENS.

---

## 3. Token-Driven Components Analysis

### 3.1 Table (Compound Component)

**Location:** `src/components/data/table/`  
**Status:** ✅ **TOKEN-DRIVEN** (with minor issues)

**Token Usage:**
- ✅ Uses `DATA_TOKENS.table.*` for most styling
- ✅ Uses CVA for variants (via tokens)
- ✅ Compound component pattern

**Issues Found:**

1. **TableEmpty.tsx:**
   - ❌ Hardcoded: `"p-8"` (line 25) - should use `DATA_TOKENS.table.padding.cell.lg` or new token

2. **TableHead.tsx:**
   - ⚠️ Hardcoded: `"flex items-center gap-2"` (line 86) - should use spacing tokens
   - ⚠️ Hardcoded: `"cursor-pointer select-none hover:bg-muted/50"` (line 73) - should use tokens

3. **TableHeader.tsx:**
   - ⚠️ Hardcoded: `"sticky top-0 z-10 bg-background"` (line 25) - should use tokens

4. **TableExpandableContent.tsx:**
   - ⚠️ Hardcoded: `"p-md"` (line 35) - should use `DATA_TOKENS.table.padding.cell.md`

5. **TableLoadingState.tsx:**
   - ⚠️ Hardcoded: `"p-sm"` (line 28) - should use `DATA_TOKENS.table.padding.cell.sm`
   - ⚠️ Hardcoded: `"w-full"` (line 29) - should use width token

6. **Table.tsx (Root):**
   - ⚠️ Hardcoded: `"overflow-x-auto"` (line 113) - should use utility or token
   - ⚠️ Hardcoded: `"w-full border-collapse"` (line 116) - should use tokens

**Missing Tokens:**
- `DATA_TOKENS.table.sticky.header` - for sticky header styling
- `DATA_TOKENS.table.expandable.padding` - for expandable content padding
- `DATA_TOKENS.table.loading.cellPadding` - for loading state cells
- `DATA_TOKENS.table.empty.padding` - for empty state padding
- `DATA_TOKENS.table.sortable.hover` - for sortable header hover state
- `DATA_TOKENS.table.sortable.gap` - for sort icon gap

---

### 3.2 DataList

**Location:** `src/components/data/data-list/`  
**Status:** ✅ **TOKEN-DRIVEN** (with minor issues)

**Token Usage:**
- ✅ Uses `DATA_TOKENS.dataList.*` for spacing
- ✅ Uses responsive spacing props

**Issues Found:**

1. **DataListItem.tsx:**
   - ⚠️ Hardcoded: `"flex flex-col border-b border-border last:border-0 md:flex-row md:items-center"` (line 41)
   - Should extract to tokens:
     - `DATA_TOKENS.dataList.item.layout.mobile`
     - `DATA_TOKENS.dataList.item.layout.desktop`
     - `DATA_TOKENS.dataList.item.border`

2. **DataListValue.tsx:**
   - ⚠️ Hardcoded: `"text-muted-foreground"` (line 27) - should use typography token

**Missing Tokens:**
- `DATA_TOKENS.dataList.item.border` - for item borders
- `DATA_TOKENS.dataList.item.layout` - for responsive layout
- `DATA_TOKENS.dataList.value.color` - for value text color

---

### 3.3 EmptyState

**Location:** `src/components/data/empty-state/`  
**Status:** ✅ **TOKEN-DRIVEN** (via Surface/Stack)

**Token Usage:**
- ✅ Uses `Surface` component (token-driven)
- ✅ Uses `Stack` component (token-driven)
- ✅ Uses semantic spacing props

**Issues Found:**

1. **EmptyState.tsx:**
   - ⚠️ Hardcoded: `"text-center"` (line 55) - should use utility or token

**Missing Tokens:**
- `DATA_TOKENS.emptyState.alignment` - for text alignment
- `DATA_TOKENS.emptyState.icon.size` - for icon sizing (currently uses Surface props)
- `DATA_TOKENS.emptyState.spacing` - for spacing between elements (currently uses Stack gap)

**Note:** EmptyState relies on Surface and Stack components, which is acceptable but could benefit from dedicated DATA_TOKENS for consistency.

---

### 3.4 Skeleton

**Location:** `src/components/data/skeleton/`  
**Status:** ✅ **TOKEN-DRIVEN** (CVA-based)

**Token Usage:**
- ✅ Uses `DATA_TOKENS.skeleton.*` for all styling
- ✅ CVA variants properly configured
- ✅ No hardcoded Tailwind classes in component

**Issues Found:**
- None in component code (stories have hardcoded classes, but that's acceptable)

**Status:** ✅ **COMPLETE - NO ISSUES**

---

### 3.5 Pagination

**Location:** `src/components/navigation/pagination/`  
**Status:** ⚠️ **PARTIALLY TOKEN-DRIVEN**

**Token Usage:**
- ✅ Uses `NAVIGATION_TOKENS.*` for most styling
- ✅ Uses `MOTION_TOKENS` for transitions
- ✅ Uses `ICON_TOKENS` for icon colors

**Issues Found:**

1. **Pagination.tsx:**
   - ⚠️ Hardcoded: `"border border-input"` (lines 231, 268, 304) - should use token
   - ⚠️ Hardcoded: `"h-4 w-4"` (lines 277, 313) - should use `ICON_TOKENS.sizes.sm`
   - ⚠️ Hardcoded: `"sr-only"` (lines 278, 314) - accessibility utility, acceptable

**Missing Tokens:**
- `NAVIGATION_TOKENS.pagination.border` - for border styling
- Consider moving to `DATA_TOKENS.pagination` for consistency with other data components

**Recommendation:** Pagination is in navigation folder but is data-related. Consider:
1. Moving to `src/components/data/pagination/`
2. Or creating `DATA_TOKENS.pagination` for data-specific pagination styling

---

## 4. Missing Tokens Summary

### 4.1 Table Tokens

```typescript
// Missing from DATA_TOKENS.table:
{
  sticky: {
    header: "sticky top-0 z-10 bg-background", // Sticky header styles
  },
  expandable: {
    padding: "p-md", // Expandable content padding
  },
  loading: {
    cellPadding: "p-sm", // Loading state cell padding
  },
  empty: {
    padding: "p-8", // Empty state padding
  },
  sortable: {
    hover: "hover:bg-muted/50", // Sortable header hover
    gap: "gap-2", // Sort icon gap
    cursor: "cursor-pointer select-none", // Sortable cursor
  },
  layout: {
    overflow: "overflow-x-auto", // Table container overflow
    table: "w-full border-collapse", // Table base styles
  },
}
```

### 4.2 DataList Tokens

```typescript
// Missing from DATA_TOKENS.dataList:
{
  item: {
    border: "border-b border-border last:border-0", // Item borders
    layout: {
      mobile: "flex flex-col", // Mobile layout
      desktop: "md:flex-row md:items-center", // Desktop layout
    },
  },
  value: {
    color: "text-muted-foreground", // Value text color
  },
}
```

### 4.3 EmptyState Tokens

```typescript
// Missing from DATA_TOKENS.emptyState:
{
  alignment: {
    center: "text-center", // Center alignment
  },
  icon: {
    size: {
      sm: "...", // Small icon size
      md: "...", // Medium icon size
      lg: "...", // Large icon size
    },
  },
  spacing: {
    gap: "gap-md", // Gap between elements (currently in Stack)
  },
}
```

### 4.4 Badge Tokens (for standalone Badge component)

```typescript
// Missing: Standalone Badge component
// Current: Badge functionality embedded in domain components
// Required: DATA_TOKENS.badge or separate BADGE_TOKENS

{
  badge: {
    size: {
      sm: "...",
      md: "...",
      lg: "...",
    },
    variant: {
      default: "...",
      success: "...",
      warning: "...",
      error: "...",
      info: "...",
      featured: "...",
    },
    radius: "...",
    shadow: "...",
    spacing: {
      padding: "...",
      gap: "...",
    },
  },
}
```

---

## 5. Inconsistent APIs

### 5.1 Table API Inconsistency

**Legacy Table.tsx:**
```typescript
<Table data={data} columns={columns} rowKey="id" />
```

**New Table (Compound):**
```typescript
<Table.Root data={data} columns={columns} rowKey="id">
  <Table.Header>...</Table.Header>
  <Table.Body>...</Table.Body>
</Table.Root>
```

**Issue:** Two different APIs for the same component. Legacy should be deprecated.

---

### 5.2 List API Inconsistency

**Legacy List.tsx:**
```typescript
<List items={items} />
```

**New DataList (Compound):**
```typescript
<DataList.Root>
  <DataList.Item>
    <DataList.Label>...</DataList.Label>
    <DataList.Value>...</DataList.Value>
  </DataList.Item>
</DataList.Root>
```

**Issue:** Different purposes (List vs DataList), but naming is confusing.

---

### 5.3 Badge API Inconsistency

**Current:** Badge functionality embedded in domain components with different APIs:
- `EventCard`: `featuredBadgeText`
- `VenueCard`: `popularBadgeText`
- `TicketCard`: `vipBadgeText`, `discountBadgeText`, `featuredBadgeText`
- `CategoryCard`: `featuredBadgeText`
- `ArtistCard`: Various badge props

**Issue:** No consistent Badge component API. Each card implements badges differently.

---

## 6. Hardcoded Tailwind Classes Summary

### 6.1 Legacy Components

| Component | File | Hardcoded Classes | Count |
|-----------|------|-------------------|-------|
| List.tsx | `src/components/data/List.tsx` | `space-y-sm`, `rounded-lg`, `border`, `p-md`, `hover:bg-muted/50`, `font-medium`, `text-foreground`, `mt-xs`, `text-sm`, `text-muted-foreground` | 11 |
| Table.tsx | `src/components/data/Table.tsx` | `overflow-x-auto`, `w-full`, `border-collapse`, `border-b`, `p-sm`, `text-left`, `font-medium`, `text-muted-foreground`, `hover:bg-muted/50` | 9 |
| Timeline.tsx | `src/components/data/Timeline.tsx` | `space-y-lg`, `h-3`, `w-3`, `rounded-full`, `border-2`, `border-background`, `bg-primary`, `mt-sm`, `h-12`, `w-px`, `bg-border`, `ml-md` | 12 |

**Total Legacy Hardcoded Classes:** 32

---

### 6.2 Token-Driven Components (Minor Issues)

| Component | File | Hardcoded Classes | Count |
|-----------|------|-------------------|-------|
| TableEmpty | `table/TableEmpty.tsx` | `p-8` | 1 |
| TableHead | `table/TableHead.tsx` | `flex items-center gap-2`, `cursor-pointer select-none hover:bg-muted/50` | 2 |
| TableHeader | `table/TableHeader.tsx` | `sticky top-0 z-10 bg-background` | 1 |
| TableExpandableContent | `table/TableExpandableContent.tsx` | `p-md` | 1 |
| TableLoadingState | `table/TableLoadingState.tsx` | `p-sm`, `w-full` | 2 |
| Table (Root) | `table/Table.tsx` | `overflow-x-auto`, `w-full border-collapse` | 2 |
| DataListItem | `data-list/DataListItem.tsx` | `flex flex-col border-b border-border last:border-0 md:flex-row md:items-center` | 1 |
| DataListValue | `data-list/DataListValue.tsx` | `text-muted-foreground` | 1 |
| EmptyState | `empty-state/EmptyState.tsx` | `text-center` | 1 |
| Pagination | `navigation/pagination/Pagination.tsx` | `border border-input` (3x), `h-4 w-4` (2x) | 5 |

**Total Token-Driven Hardcoded Classes:** 17

---

## 7. Recommendations

### 7.1 Immediate Actions

1. **Remove Legacy Components:**
   - ❌ Delete `src/components/data/List.tsx` (use `DataList` instead)
   - ❌ Delete `src/components/data/Table.tsx` (use `Table.Root` instead)
   - ⚠️ Migrate `src/components/data/Timeline.tsx` to token-driven version

2. **Create Missing Tokens:**
   - Add `DATA_TOKENS.table.sticky.*`
   - Add `DATA_TOKENS.table.expandable.*`
   - Add `DATA_TOKENS.table.loading.*`
   - Add `DATA_TOKENS.table.empty.*`
   - Add `DATA_TOKENS.table.sortable.*`
   - Add `DATA_TOKENS.table.layout.*`
   - Add `DATA_TOKENS.dataList.item.*`
   - Add `DATA_TOKENS.dataList.value.*`
   - Add `DATA_TOKENS.emptyState.*` (if needed)

3. **Fix Hardcoded Classes:**
   - Replace all hardcoded classes in token-driven components with tokens
   - Update Table components to use new tokens
   - Update DataList components to use new tokens

### 7.2 Medium-Term Actions

1. **Create Standalone Badge Component:**
   - Create `src/components/data/badge/` or `src/components/badge/`
   - Extract badge logic from domain components
   - Create `DATA_TOKENS.badge` or `BADGE_TOKENS`
   - Implement CVA variants for badge sizes and statuses

2. **Standardize Pagination:**
   - Decide: Move to `src/components/data/pagination/` or keep in navigation
   - Create `DATA_TOKENS.pagination` if moved to data
   - Fix remaining hardcoded classes

3. **Complete Timeline Migration:**
   - Create token-driven Timeline component
   - Use `DATA_TOKENS.timeline.*` for all styling
   - Implement CVA variants

### 7.3 Long-Term Actions

1. **API Consistency:**
   - Deprecate legacy Table API
   - Document migration path from legacy to new APIs
   - Ensure all data components follow compound component pattern

2. **Documentation:**
   - Update component documentation
   - Add migration guides
   - Document token usage patterns

---

## 8. Token Violations Map

### 8.1 Critical Violations (Legacy Components)

| Component | Violations | Priority |
|-----------|------------|----------|
| List.tsx | 11 hardcoded classes, no tokens | 🔴 HIGH |
| Table.tsx | 9 hardcoded classes, no tokens | 🔴 HIGH |
| Timeline.tsx | 12 hardcoded classes, no tokens | 🔴 HIGH |

### 8.2 Minor Violations (Token-Driven Components)

| Component | Violations | Priority |
|-----------|------------|----------|
| TableEmpty | 1 hardcoded class | 🟡 MEDIUM |
| TableHead | 2 hardcoded classes | 🟡 MEDIUM |
| TableHeader | 1 hardcoded class | 🟡 MEDIUM |
| TableExpandableContent | 1 hardcoded class | 🟡 MEDIUM |
| TableLoadingState | 2 hardcoded classes | 🟡 MEDIUM |
| Table (Root) | 2 hardcoded classes | 🟡 MEDIUM |
| DataListItem | 1 hardcoded class | 🟡 MEDIUM |
| DataListValue | 1 hardcoded class | 🟡 MEDIUM |
| EmptyState | 1 hardcoded class | 🟢 LOW |
| Pagination | 5 hardcoded classes | 🟡 MEDIUM |

---

## 9. Completion Checklist

### 9.1 Legacy Component Migration

- [ ] Remove `List.tsx` legacy component
- [ ] Remove `Table.tsx` legacy component
- [ ] Migrate `Timeline.tsx` to token-driven version
- [ ] Update all imports/usages of legacy components

### 9.2 Token Creation

- [ ] Add `DATA_TOKENS.table.sticky.*`
- [ ] Add `DATA_TOKENS.table.expandable.*`
- [ ] Add `DATA_TOKENS.table.loading.*`
- [ ] Add `DATA_TOKENS.table.empty.*`
- [ ] Add `DATA_TOKENS.table.sortable.*`
- [ ] Add `DATA_TOKENS.table.layout.*`
- [ ] Add `DATA_TOKENS.dataList.item.*`
- [ ] Add `DATA_TOKENS.dataList.value.*`
- [ ] Add `DATA_TOKENS.emptyState.*` (if needed)

### 9.3 Component Fixes

- [ ] Fix TableEmpty hardcoded classes
- [ ] Fix TableHead hardcoded classes
- [ ] Fix TableHeader hardcoded classes
- [ ] Fix TableExpandableContent hardcoded classes
- [ ] Fix TableLoadingState hardcoded classes
- [ ] Fix Table (Root) hardcoded classes
- [ ] Fix DataListItem hardcoded classes
- [ ] Fix DataListValue hardcoded classes
- [ ] Fix EmptyState hardcoded classes
- [ ] Fix Pagination hardcoded classes

### 9.4 Badge Component

- [ ] Create standalone Badge component
- [ ] Extract badge logic from domain components
- [ ] Create badge tokens
- [ ] Implement CVA variants
- [ ] Update domain components to use new Badge

### 9.5 Documentation

- [ ] Update component documentation
- [ ] Add migration guides
- [ ] Document token usage

---

## 10. Summary Statistics

- **Total Components Audited:** 15
- **Legacy Components:** 3 (List, Table, Timeline)
- **Token-Driven Components:** 12 (Table compound, DataList, EmptyState, Skeleton, Pagination)
- **Total Hardcoded Classes:** 49
  - Legacy: 32
  - Token-driven: 17
- **Missing Tokens:** 20+ token definitions needed
- **Inconsistent APIs:** 3 major inconsistencies
- **Missing Components:** 1 (standalone Badge)

---

## 11. Next Steps

1. **L4_S2:** Define Data Token Structure (extend DATA_TOKENS with missing tokens)
2. **L4_S3:** Create DataBase Primitive (if needed)
3. **L4_S4+:** Migrate legacy components and fix hardcoded classes

---

**Report Generated:** 2025-12-13  
**Auditor:** L4_S1 Task  
**Status:** ✅ Complete

