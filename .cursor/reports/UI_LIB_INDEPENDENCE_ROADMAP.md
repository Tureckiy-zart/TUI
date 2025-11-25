# UI Library Independence Roadmap

**Date:** 2025-11-25  
**Purpose:** Prioritized action plan to make tenerife-ui fully reusable

---

## Executive Summary

This roadmap outlines the steps needed to transform `tenerife-ui` from a Tenerife-specific library to a truly independent, reusable npm package. The work is divided into phases with clear priorities and effort estimates.

---

## Current State Assessment

### Strengths

- ✅ 100% TypeScript with strict mode
- ✅ Complete design token system (F0-F9)
- ✅ Theme system with day/night modes
- ✅ Well-structured Tailwind integration
- ✅ 26 Storybook stories
- ✅ Semantic-release pipeline ready
- ✅ No Next.js direct dependencies

### Weaknesses

- ❌ 4 domain-specific interfaces
- ❌ 5 hardcoded routes
- ❌ 1 external store reference
- ❌ Multilingual logic embedded in components
- ❌ ~10 coupled components

---

## Phase 1: Critical Fixes (Week 1)

### Priority: CRITICAL

These changes are required before npm publish to prevent broken imports.

#### 1.1 Remove External Store Reference

**File:** `src/components/filters/types.ts`

**Action:** Remove references to `apps/web/src/stores/useFiltersStore`

```typescript
// REMOVE these comments:
// Main filter types are defined in apps/web/src/stores/useFiltersStore.ts
// In actual usage, these should be imported from apps/web/src/stores/useFiltersStore

// REMOVE console.warn:
console.warn("useFilterManager: This is a mock implementation...");
```

**Effort:** 30 minutes

#### 1.2 Export Missing Types

**File:** `src/index.ts`

**Action:** Add type exports for filter types

```typescript
// Add these exports
export type { FilterOption, FilterState } from "./components/filters/types";
```

**Effort:** 15 minutes

#### 1.3 Remove Duplicate Skeleton Exports

**File:** `src/index.ts`

**Action:** Remove unnecessary aliased exports

```typescript
// REMOVE these lines:
export { EventCardSkeleton as EventCardSkeletonUI } from "./components/skeletons/EventCardSkeleton";
export { VenueCardSkeleton as VenueCardSkeletonUI } from "./components/skeletons/VenueCardSkeleton";
```

**Effort:** 15 minutes

---

## Phase 2: Route Decoupling (Week 1-2)

### Priority: HIGH

These changes enable components to work with any URL structure.

#### 2.1 EventCard - Add `href` Prop

**File:** `src/components/cards/EventCard.tsx`

**Current:**

```typescript
<Link href={`/events/${event.slug}`} variant="ghost">
```

**Proposed:**

```typescript
interface EventCardProps {
  // Add new prop
  href?: string;
  // ... existing props
}

// Usage
{href || event?.slug ? (
  <Link href={href || `/events/${event?.slug}`} variant="ghost">
    {title}
  </Link>
) : (
  title
)}
```

**Effort:** 1 hour

#### 2.2 VenueCard - Add `href` Prop

**File:** `src/components/cards/VenueCard.tsx`

**Same pattern as EventCard**

**Effort:** 1 hour

#### 2.3 ArticlesSection - Add `href` to Article

**File:** `src/components/sections/ArticlesSection.tsx`

**Current:**

```typescript
interface Article {
  slug: string;
  // ...
}
```

**Proposed:**

```typescript
interface Article {
  href: string; // Replace slug with full href
  // ...
}
```

**Effort:** 30 minutes

---

## Phase 3: Interface Refactoring (Week 2-3)

### Priority: HIGH

Simplify interfaces to accept pre-processed data.

#### 3.1 EventCard Interface Simplification

**Current (Complex):**

```typescript
export interface EventCardEvent {
  _id?: string;
  slug?: string;
  name?: { en?: string; es?: string; ru?: string };
  venue_id?: { name?: { en?: string; es?: string; ru?: string } };
  // ...
}
```

**Proposed (Simple):**

```typescript
export interface EventCardProps {
  title: string;
  description?: string;
  date?: string;
  venueName?: string;
  price?: string;
  imageUrl?: string;
  href?: string;
  ticketUrl?: string;
  featured?: boolean;
  showImage?: boolean;
  getTicketsLabel: string;
  featuredBadgeText?: string;
  className?: string;
}
```

**Migration:** Deprecate old interface, support both for 1 major version

**Effort:** 3 hours

#### 3.2 VenueCard Interface Simplification

**Same pattern as EventCard**

**Effort:** 3 hours

#### 3.3 Article Interface Update

**Add `href`, keep other fields**

**Effort:** 1 hour

---

## Phase 4: Multilingual Logic Extraction (Week 3)

### Priority: MEDIUM

Move language-specific logic out of components.

#### 4.1 Remove Inline Multilingual Fallbacks

**Current:**

```typescript
const title = event?.name?.en || event?.name?.es || event?.name?.ru || "";
```

**Proposed:**

```typescript
// Consumer provides pre-localized string
const title = props.title;
```

**Files Affected:**

- `EventCard.tsx` (3 instances)
- `VenueCard.tsx` (2 instances)

**Effort:** 2 hours

#### 4.2 Document Localization Pattern

Create documentation showing how consumers should handle localization:

```typescript
// In consumer's code
import { useLocale } from './i18n';
import { EventCard } from '@tenerife.music/ui';

function EventList({ events }) {
  const { locale } = useLocale();

  return events.map(event => (
    <EventCard
      key={event.id}
      title={event.name[locale]}
      description={event.description[locale]}
      venueName={event.venue.name[locale]}
      // ...
    />
  ));
}
```

**Effort:** 1 hour (documentation)

---

## Phase 5: Naming and Organization (Week 4)

### Priority: LOW

Improve naming for better reusability.

#### 5.1 Consider Generic Component Names

| Current             | Proposed Alternative          |
| ------------------- | ----------------------------- |
| `EventCard`         | Keep (with generic interface) |
| `VenueCard`         | Keep (with generic interface) |
| `EventCardSkeleton` | `ContentCardSkeleton`         |
| `VenueCardSkeleton` | `ContentCardSkeleton`         |
| `TrendingSection`   | `ItemListSection`             |
| `ArticlesSection`   | `ArticleListSection`          |

**Decision:** Keep current names, document as "Recipes" category

**Effort:** 0 (keep names, document properly)

#### 5.2 Create "Recipes" Documentation

Document that these components are **examples/recipes** that can be:

1. Used directly with proper props
2. Copied and modified
3. Used as reference for custom implementations

**Effort:** 2 hours (documentation)

---

## Phase 6: FilterBar Improvements (Week 4)

### Priority: MEDIUM

Make FilterBar fully configurable.

#### 6.1 Make Currency Configurable

**Current:**

```typescript
<PriceRangeSlider
  currency="€"  // Hardcoded
  // ...
/>
```

**Proposed:**

```typescript
interface FilterBarProps {
  // Add new prop
  currency?: string;
  // ...
}

// Usage
<PriceRangeSlider
  currency={currency || "€"}
  // ...
/>
```

**Effort:** 30 minutes

#### 6.2 Make useFilterManager Optional

Allow consumers to provide their own state management:

```typescript
interface FilterBarProps {
  // Optional external state
  externalState?: FilterState;
  onStateChange?: (state: FilterState) => void;
  // ...
}
```

**Effort:** 2 hours

---

## Timeline Summary

| Phase                            | Priority | Effort    | Week |
| -------------------------------- | -------- | --------- | ---- |
| Phase 1: Critical Fixes          | CRITICAL | 1 hour    | 1    |
| Phase 2: Route Decoupling        | HIGH     | 2.5 hours | 1-2  |
| Phase 3: Interface Refactoring   | HIGH     | 7 hours   | 2-3  |
| Phase 4: Multilingual Extraction | MEDIUM   | 3 hours   | 3    |
| Phase 5: Naming/Organization     | LOW      | 2 hours   | 4    |
| Phase 6: FilterBar               | MEDIUM   | 2.5 hours | 4    |

**Total Effort:** ~18 hours

---

## Success Criteria

After completing all phases:

- [ ] No references to external paths (`apps/`, `stores/`)
- [ ] All components accept `href` instead of building URLs
- [ ] All components accept pre-localized strings
- [ ] All types are exported
- [ ] No console warnings about mock implementations
- [ ] Documentation explains "Recipes" vs "Components"
- [ ] Library can be used in any React project without modification

---

## Breaking Changes

### Version 1.x → 2.0

| Change                              | Migration               |
| ----------------------------------- | ----------------------- |
| `EventCardEvent` → `EventCardProps` | Flatten nested objects  |
| `VenueCardProps.venue` → flat props | Flatten nested object   |
| `Article.slug` → `Article.href`     | Provide full URL        |
| Remove `EventCardSkeletonUI` alias  | Use `EventCardSkeleton` |
| Remove `VenueCardSkeletonUI` alias  | Use `VenueCardSkeleton` |

### Deprecation Strategy

1. **v1.x:** Add new props alongside old, add deprecation warnings
2. **v1.x+1:** Document migration in CHANGELOG
3. **v2.0:** Remove deprecated props

---

## Quick Wins (Implement Today)

1. ✅ Remove external store comments (5 min)
2. ✅ Export `FilterOption`, `FilterState` types (5 min)
3. ✅ Remove duplicate skeleton exports (5 min)
4. ✅ Add `href` prop to EventCard (30 min)
5. ✅ Add `href` prop to VenueCard (30 min)

**Total Quick Wins:** ~1.5 hours for major independence improvement

---

## Monitoring Independence

After changes, verify independence with:

```bash
# Check for external references
grep -r "apps/" src/
grep -r "stores/" src/
grep -r "tenerife" src/ --include="*.tsx" | grep -v "tenerife.music/ui"

# Check for hardcoded routes (should only be in stories)
grep -r "/events/" src/ --include="*.tsx" | grep -v stories
grep -r "/venues/" src/ --include="*.tsx" | grep -v stories
grep -r "/news/" src/ --include="*.tsx" | grep -v stories
```

---

**Report Generated:** 2025-11-25  
**Status:** Complete
