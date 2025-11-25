# UI Library Public API Audit

**Date:** 2025-11-25  
**Purpose:** Analyze public exports and identify API surface issues

---

## Overview

This report audits the public API surface of `tenerife-ui` to identify:

- What is exported vs. what should be exported
- Deep exports that leak internal structure
- Missing exports
- Type exports completeness

---

## Main Entry Point

**File:** `src/index.ts`

### Export Categories

| Category              | Count        | Status              |
| --------------------- | ------------ | ------------------- |
| Design Tokens         | 7 modules    | ✅ Good             |
| Primitive Components  | 9 components | ✅ Good             |
| Theme Utilities       | 1 module     | ✅ Good             |
| Layout Components     | 8 components | ✅ Good             |
| Modal Components      | 5 components | ✅ Good             |
| Menu Components       | 3 components | ✅ Good             |
| Filter Components     | 6 components | ⚠️ Has coupling     |
| Toast Components      | 2 components | ✅ Good             |
| Overlay Components    | 3 components | ✅ Good             |
| Feedback Components   | 3 components | ✅ Good             |
| Image Components      | 1 component  | ✅ Good             |
| Navigation Components | 2 components | ✅ Good             |
| Data Components       | 3 components | ✅ Good             |
| Card Components       | 2 components | ⚠️ Domain-coupled   |
| Form Components       | 3 components | ✅ Good             |
| Auth Components       | 3 components | ⚠️ Generic wrappers |
| Admin Components      | 2 components | ⚠️ Generic wrappers |
| Search Components     | 1 component  | ✅ Good             |
| Section Components    | 5 components | ⚠️ Some coupling    |
| Icon Components       | 1 component  | ✅ Good             |
| Control Components    | 1 component  | ✅ Good             |
| Skeleton Components   | 2 components | ⚠️ Domain naming    |
| Hooks                 | 1 hook       | ✅ Good             |
| Utilities             | 1 module     | ✅ Good             |

**Total Exports:** ~70 components/modules

---

## Export Analysis

### 1. Design Tokens (`export * from "./tokens"`)

```typescript
export * from "./tokens";
```

**Exports:**

- `colors` - Color palette tokens
- `css-variables` - CSS variable definitions
- `motion` - Animation/transition tokens
- `radius` - Border radius tokens
- `shadows` - Shadow tokens
- `spacing` - Spacing tokens
- `typography` - Typography tokens

**Status:** ✅ Clean, no issues

---

### 2. Primitive Components

```typescript
export * from "./components/primitives/Badge";
export * from "./components/primitives/Button";
export * from "./components/primitives/Card";
export * from "./components/primitives/Divider";
export * from "./components/primitives/Input";
export * from "./components/primitives/Label";
export * from "./components/primitives/Link";
export * from "./components/primitives/ThemeSwitch";
export * from "./components/primitives/Typography";
```

**Status:** ✅ Clean, fully independent

**Types Exported:**

- `ButtonProps`, `buttonVariants`
- `LinkProps`, `linkVariants`
- `TextProps`, `HeadingProps`
- (and others)

---

### 3. Domain-Coupled Exports (Issues)

#### 3.1 Card Components

```typescript
export * from "./components/cards/EventCard";
export * from "./components/cards/VenueCard";
```

**Exported Types:**

- `EventCardEvent` - ⚠️ Domain-specific
- `EventCardProps`
- `VenueCardProps` with embedded `venue` interface

**Issue:** These export domain-specific types that leak Tenerife data models.

#### 3.2 Section Components

```typescript
export * from "./components/sections/ArticlesSection";
export * from "./components/sections/TrendingSection";
```

**Exported Types:**

- `Article` interface (internal, not explicitly exported)
- `Event` interface (internal, not explicitly exported)

**Issue:** Internal interfaces not explicitly typed or exported.

#### 3.3 Skeleton Components

```typescript
export * from "./components/skeletons/EventCardSkeleton";
export * from "./components/skeletons/VenueCardSkeleton";

// Alias exports
export { EventCardSkeleton as EventCardSkeletonUI } from "./components/skeletons/EventCardSkeleton";
export { VenueCardSkeleton as VenueCardSkeletonUI } from "./components/skeletons/VenueCardSkeleton";
```

**Issue:**

- Domain-specific naming (`EventCard`, `VenueCard`)
- Duplicate exports with `UI` suffix (unnecessary)

---

### 4. Filter Components

```typescript
export * from "./components/filters/DateRangePicker";
export * from "./components/filters/FilterBar";
export * from "./components/filters/FilterSelect";
export * from "./components/filters/PriceRangeSlider";
export * from "./components/filters/SearchFilters";
export * from "./components/filters/SearchInput";
```

**Not Exported (Internal):**

- `types.ts` - Contains `FilterOption`, `FilterState`, `useFilterManager`

**Issue:**

- `FilterOption` and `FilterState` types are useful but not exported
- `useFilterManager` mock is used internally but not exported

**Recommendation:** Export types:

```typescript
export type { FilterOption, FilterState } from "./components/filters/types";
```

---

### 5. Secondary Entry Points

**File:** `package.json` exports

```json
{
  "exports": {
    ".": { ... },
    "./styles": "./dist/styles.css",
    "./preset": { ... },
    "./tokens": { ... },
    "./theme": { ... }
  }
}
```

**Entry Points:**

1. `.` - Main entry (all components)
2. `./styles` - CSS styles
3. `./preset` - Tailwind preset
4. `./tokens` - Design tokens only
5. `./theme` - Theme system only

**Status:** ✅ Well-structured, allows tree-shaking

---

## Type Export Completeness

### Missing Type Exports

| Component         | Missing Type        | Should Export    |
| ----------------- | ------------------- | ---------------- |
| `FilterSelect`    | `FilterOption`      | Yes              |
| `FilterBar`       | `FilterState`       | Yes              |
| `EventCard`       | (rename to generic) | Refactor needed  |
| `VenueCard`       | (rename to generic) | Refactor needed  |
| `ArticlesSection` | `Article`           | Yes, or refactor |
| `TrendingSection` | `Event`             | Yes, or rename   |

### Well-Exported Types

| Component    | Exported Types                  |
| ------------ | ------------------------------- |
| `Button`     | `ButtonProps`, `buttonVariants` |
| `Link`       | `LinkProps`, `linkVariants`     |
| `Typography` | `TextProps`, `HeadingProps`     |
| `Alert`      | `AlertProps`                    |
| `Modal`      | `ModalProps`                    |
| `Tooltip`    | `TooltipProps`                  |
| `Popover`    | `PopoverProps`                  |

---

## Deep Export Issues

### Issue 1: Re-exporting Internal Components

**File:** `src/components/primitives/Button.tsx`

```typescript
// Re-exports from ui/button.tsx
export { Button, type ButtonProps, buttonVariants } from "@/components/ui/button";
```

**Analysis:** This is actually **good practice** - it creates a facade that hides internal structure.

### Issue 2: Duplicate Exports

**File:** `src/index.ts:117-119`

```typescript
export { EventCardSkeleton as EventCardSkeletonUI } from "./components/skeletons/EventCardSkeleton";
export { VenueCardSkeleton as VenueCardSkeletonUI } from "./components/skeletons/VenueCardSkeleton";
```

**Issue:** Unnecessary aliased exports. Should remove or document purpose.

---

## Recommendations

### 1. Add Missing Type Exports

```typescript
// Add to src/index.ts
export type { FilterOption, FilterState } from "./components/filters/types";
```

### 2. Remove Duplicate Exports

```typescript
// Remove these lines from src/index.ts
// export { EventCardSkeleton as EventCardSkeletonUI } ...
// export { VenueCardSkeleton as VenueCardSkeletonUI } ...
```

### 3. Consider Separate "Recipes" Export

Create a separate entry point for domain-coupled components:

```json
{
  "exports": {
    ".": { ... },
    "./recipes": {
      "types": "./dist/recipes/index.d.ts",
      "import": "./dist/recipes/index.mjs",
      "require": "./dist/recipes/index.cjs"
    }
  }
}
```

This would contain:

- `EventCard`
- `VenueCard`
- `ArticlesSection`
- `TrendingSection`
- `EventCardSkeleton`
- `VenueCardSkeleton`

### 4. Document Public API

Create `docs/API.md` with:

- All exported components
- All exported types
- All exported utilities
- Entry points and their purposes

---

## API Stability Assessment

### Stable (Safe to Use)

- All primitives (Button, Input, Card, etc.)
- All layout components
- All modal/overlay components
- All feedback components
- Theme system
- Design tokens

### Unstable (May Change)

- `EventCard` - Will be refactored
- `VenueCard` - Will be refactored
- `ArticlesSection` - May be renamed
- `TrendingSection` - May be renamed
- Filter components - Internal hook may change

---

## Summary

| Metric               | Value     |
| -------------------- | --------- |
| Total Exports        | ~70       |
| Clean Exports        | ~55 (78%) |
| Coupled Exports      | ~10 (14%) |
| Missing Type Exports | 5         |
| Duplicate Exports    | 2         |

**Overall API Health:** 78% - Good, with identified improvements needed.

---

**Report Generated:** 2025-11-25  
**Status:** Complete
