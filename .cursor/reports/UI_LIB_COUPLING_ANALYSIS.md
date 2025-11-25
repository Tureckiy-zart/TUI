# UI Library Coupling Analysis Report

**Date:** 2025-11-25  
**Scope:** Full independence audit of `tenerife-ui` library  
**Goal:** Identify all coupling to Tenerife project and assess reusability

---

## Executive Summary

The `tenerife-ui` library has **moderate coupling** to the main Tenerife project. While the library is already 100% TypeScript with strict mode enabled, several components embed domain-specific types, hardcoded routes, and business logic that prevent true standalone usage.

### Coupling Statistics

| Category                    | Count        | Severity            |
| --------------------------- | ------------ | ------------------- |
| Domain-specific types       | 4 interfaces | HIGH                |
| Hardcoded routes            | 5 instances  | HIGH                |
| External store references   | 3 instances  | CRITICAL            |
| Multilingual fallback logic | 3 components | MEDIUM              |
| Currency hardcoding         | 2 instances  | LOW                 |
| "use client" directives     | 46 files     | LOW (design choice) |

---

## 1. Domain Model Coupling

### 1.1 EventCardEvent Interface

**File:** `src/components/cards/EventCard.tsx:10-20`

```typescript
export interface EventCardEvent {
  _id?: string;
  slug?: string;
  name?: { en?: string; es?: string; ru?: string };
  start_date?: string;
  ticket_url?: string;
  venue_id?: { name?: { en?: string; es?: string; ru?: string } };
  description?: { en?: string; es?: string; ru?: string };
  price?: string;
  image?: string;
}
```

**Issues:**

- `_id` suggests MongoDB document structure
- `venue_id` is a nested object with multilingual name (Tenerife data model)
- `{ en, es, ru }` multilingual structure is Tenerife-specific
- `ticket_url` assumes ticket system integration

**Severity:** HIGH

---

### 1.2 VenueCardProps.venue Interface

**File:** `src/components/cards/VenueCard.tsx:10-36`

```typescript
interface VenueCardProps {
  venue?: {
    _id?: string;
    slug?: string;
    name?: { en?: string; es?: string; ru?: string };
    description?: { en?: string; es?: string; ru?: string };
    location?: string;
    address?: string;
    city?: string;
    region?: string;
    capacity?: string;
    image?: string;
    coordinates?: { lat: number; lng: number };
    type?: string;
    website?: string;
    events_count?: number;
  };
  // ... other props
}
```

**Issues:**

- `_id` MongoDB field naming
- `coordinates` assumes mapping integration
- `events_count` assumes relationship with events
- Multilingual `{ en, es, ru }` structure

**Severity:** HIGH

---

### 1.3 Event Interface (TrendingSection)

**File:** `src/components/sections/TrendingSection.tsx:9-13`

```typescript
interface Event {
  id: string;
  title: string;
  [key: string]: unknown;
}
```

**Issues:**

- Uses index signature `[key: string]: unknown` - allows any props
- "Event" naming is domain-specific

**Severity:** MEDIUM (generic enough to work)

---

### 1.4 Article Interface

**File:** `src/components/sections/ArticlesSection.tsx:9-15`

```typescript
interface Article {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  image?: string;
}
```

**Issues:**

- Hardcodes `/news/` route path
- "Article" naming may conflict with other projects

**Severity:** MEDIUM

---

## 2. Hardcoded Routes

| File                                                | Line | Route                   | Purpose            |
| --------------------------------------------------- | ---- | ----------------------- | ------------------ |
| `src/components/cards/EventCard.tsx`                | 121  | `/events/${event.slug}` | Event detail link  |
| `src/components/cards/VenueCard.tsx`                | 139  | `/venues/${venue.slug}` | Venue detail link  |
| `src/components/sections/ArticlesSection.tsx`       | 44   | `/news/${article.slug}` | Article title link |
| `src/components/sections/ArticlesSection.tsx`       | 55   | `/news/${article.slug}` | Read more link     |
| `src/components/navigation/Breadcrumbs.stories.tsx` | 21   | `/events/classical`     | Story example      |

**Impact:** Components cannot be used in projects with different URL structures.

**Severity:** HIGH

---

## 3. External Store/Context Dependencies

### 3.1 useFiltersStore Reference

**File:** `src/components/filters/types.ts:2, 27, 30`

```typescript
// Main filter types are defined in apps/web/src/stores/useFiltersStore.ts

// In actual usage, these should be imported from apps/web/src/stores/useFiltersStore
export const useFilterManager = () => {
  console.warn(
    "useFilterManager: This is a mock implementation. Use the actual hook from apps/web/src/stores/useFiltersStore",
  );
  // ... mock implementation
};
```

**Issues:**

- References path in main Tenerife project (`apps/web/src/stores/useFiltersStore`)
- Mock implementation produces console warnings
- FilterBar component depends on this mock

**Severity:** CRITICAL

---

## 4. Multilingual Fallback Logic

**File:** `src/components/cards/EventCard.tsx:41-55`

```typescript
const title =
  typeof event?.name === "string"
    ? event.name
    : event?.name?.en || event?.name?.es || event?.name?.ru || "";
```

**Issues:**

- Hardcodes `en`, `es`, `ru` language codes
- Logic should be in consuming application, not library
- Present in EventCard (3 instances) and VenueCard (2 instances)

**Severity:** MEDIUM

---

## 5. Currency Hardcoding

### 5.1 EventCard Price Formatting

**File:** `src/components/cards/EventCard.tsx:65`

```typescript
price = `€${min} - €${max}`;
```

### 5.2 FilterBar Default Currency

**File:** `src/components/filters/FilterBar.tsx:259`

```typescript
currency = "€";
```

**Note:** `PriceRangeSlider` accepts `currency` as prop, but FilterBar hardcodes euro.

**Severity:** LOW (FilterBar is opinionated, PriceRangeSlider is flexible)

---

## 6. Next.js Specific Patterns

### 6.1 "use client" Directive

- **46 files** use `"use client"` directive
- This is intentional for Next.js App Router compatibility
- Does not break usage in Vite, CRA, or other React frameworks

**Severity:** LOW (design choice, not coupling)

### 6.2 No Direct Next.js Imports

- ✅ No `next/link` imports
- ✅ No `next/image` imports
- ✅ No `next/router` imports
- Library uses native `<a>` tags with `href` props

**Severity:** NONE (clean)

---

## 7. Component Independence Assessment

### Fully Independent (No Coupling)

These components work standalone without any modifications:

- All primitives: `Button`, `Input`, `Card`, `Badge`, `Link`, `Typography`, etc.
- All layout: `Container`, `Flex`, `Grid`, `Stack`, `Section`, `Navbar`, `Footer`
- All modals: `Modal`, `SimpleModal`, `CustomDialog`, `ConfirmDialog`
- All overlays: `Tooltip`, `Popover`, `OverlayPortal`
- All feedback: `Alert`, `Progress`, `Skeleton`, `Toast`
- All forms: `FormInput`, `FormSelect`, `FormTextarea`
- Premium sections: `HeroSection`, `FeatureSection`, `CTASection`
- Navigation: `Breadcrumbs`, `Pagination`, `Tabs`, `DropdownMenu`

### Partially Coupled (Need Props Adjustment)

- `LoginForm`, `RegisterForm`, `ProfileCard` - Generic but could use simpler interfaces
- `Dashboard`, `UserManagement` - Generic wrappers, minimal coupling
- `PriceRangeSlider` - Accepts `currency` prop, fully flexible
- `DateRangePicker` - No coupling

### Heavily Coupled (Require Refactoring)

| Component           | Issues                                                     | Refactoring Effort |
| ------------------- | ---------------------------------------------------------- | ------------------ |
| `EventCard`         | Domain types, routes, multilingual logic, price formatting | HIGH               |
| `VenueCard`         | Domain types, routes, multilingual logic                   | HIGH               |
| `ArticlesSection`   | Routes, domain types                                       | MEDIUM             |
| `TrendingSection`   | Domain types (minimal)                                     | LOW                |
| `FilterBar`         | External store reference, currency hardcode                | MEDIUM             |
| `EventCardSkeleton` | Naming only                                                | LOW                |
| `VenueCardSkeleton` | Naming only                                                | LOW                |

---

## 8. Summary by Severity

### CRITICAL (1 issue)

- External store reference in `filters/types.ts`

### HIGH (6 issues)

- `EventCardEvent` domain-specific interface
- `VenueCard.venue` domain-specific interface
- Hardcoded `/events/` route
- Hardcoded `/venues/` route
- Hardcoded `/news/` route
- Multilingual fallback logic embedded in components

### MEDIUM (4 issues)

- `Event` interface in TrendingSection
- `Article` interface in ArticlesSection
- Multilingual `{ en, es, ru }` structure assumption
- FilterBar using mock hook

### LOW (3 issues)

- Currency hardcoding in EventCard
- "use client" directives (design choice)
- Domain-specific component naming (EventCard, VenueCard)

---

## 9. Recommendations

### Immediate Actions

1. **Remove external store reference** - Make `useFilterManager` fully self-contained or export it as optional
2. **Add route props** - Components should accept `baseUrl` or `href` props instead of hardcoding paths
3. **Extract multilingual logic** - Move to utility or require pre-processed strings

### Future Refactoring

1. **Generic card components** - Create `ContentCard` with slots, keep `EventCard` as example/recipe
2. **Currency prop propagation** - Ensure `FilterBar` passes currency prop down
3. **Document "Recipes" vs "Components"** - Clearly separate reusable primitives from domain-specific compositions

---

**Report Generated:** 2025-11-25  
**Auditor:** AI Assistant  
**Status:** Complete
