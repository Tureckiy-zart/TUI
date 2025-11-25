# UI Library Domain Dependencies Report

**Date:** 2025-11-25  
**Purpose:** Document all domain-specific types that couple the library to Tenerife project

---

## Overview

This report catalogs all interfaces, types, and data structures that embed Tenerife-specific domain models, making the library dependent on the main project's data architecture.

---

## 1. EventCardEvent Interface

**Location:** `src/components/cards/EventCard.tsx:10-20`

### Current Definition

```typescript
export interface EventCardEvent {
  _id?: string; // MongoDB ID
  slug?: string; // URL slug
  name?: { en?: string; es?: string; ru?: string }; // Multilingual
  start_date?: string; // Event timing
  ticket_url?: string; // Ticket integration
  venue_id?: { name?: { en?: string; es?: string; ru?: string } }; // Nested venue
  description?: { en?: string; es?: string; ru?: string }; // Multilingual
  price?: string; // Price as string
  image?: string; // Image URL
}
```

### Domain-Specific Fields

| Field                    | Issue                           | Recommendation                     |
| ------------------------ | ------------------------------- | ---------------------------------- |
| `_id`                    | MongoDB naming convention       | Use `id: string`                   |
| `name.{en,es,ru}`        | Hardcoded languages             | Use `name: string` (pre-localized) |
| `venue_id.name`          | Nested object with multilingual | Use `venueName: string`            |
| `description.{en,es,ru}` | Hardcoded languages             | Use `description: string`          |
| `ticket_url`             | Assumes ticket system           | Keep but make optional             |

### Usage in Component

```typescript
// Lines 41-55: Multilingual extraction logic
const title = event?.name?.en || event?.name?.es || event?.name?.ru || "";
const description = event?.description?.en || event?.description?.es || "";
const venue = event?.venue_id?.name?.en || event?.venue_id?.name?.es || "";
```

### Proposed Generic Interface

```typescript
export interface EventCardProps {
  /** Event title (pre-localized) */
  title: string;
  /** Event description (pre-localized) */
  description?: string;
  /** Event date/time display string */
  date?: string;
  /** Venue name (pre-localized) */
  venueName?: string;
  /** Price display string (e.g., "€20 - €50") */
  price?: string;
  /** Image URL */
  imageUrl?: string;
  /** Link URL for event details */
  href?: string;
  /** External ticket purchase URL */
  ticketUrl?: string;
  /** Whether this is a featured event */
  featured?: boolean;
  /** Show image section */
  showImage?: boolean;
  /** Label for "Get Tickets" button */
  getTicketsLabel: string;
  /** Badge text for featured events */
  featuredBadgeText?: string;
}
```

---

## 2. VenueCard.venue Interface

**Location:** `src/components/cards/VenueCard.tsx:10-36`

### Current Definition

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
  className?: string;
  featured: boolean;
  showImage: boolean;
  eventsLabel: string;
  popularBadgeText: string;
  capacityLabel: string;
}
```

### Domain-Specific Fields

| Field                    | Issue                      | Recommendation            |
| ------------------------ | -------------------------- | ------------------------- |
| `_id`                    | MongoDB naming             | Use `id: string`          |
| `name.{en,es,ru}`        | Hardcoded languages        | Use `name: string`        |
| `description.{en,es,ru}` | Hardcoded languages        | Use `description: string` |
| `coordinates`            | Assumes map integration    | Remove or make optional   |
| `events_count`           | Assumes event relationship | Keep but document         |

### Proposed Generic Interface

```typescript
export interface VenueCardProps {
  /** Venue name (pre-localized) */
  name: string;
  /** Venue description (pre-localized) */
  description?: string;
  /** Location display string */
  location?: string;
  /** Capacity display string */
  capacity?: string;
  /** Image URL */
  imageUrl?: string;
  /** Link URL for venue details */
  href?: string;
  /** Number of associated events */
  eventsCount?: number;
  /** Whether this is a featured venue */
  featured?: boolean;
  /** Show image section */
  showImage?: boolean;
  /** Label for events count */
  eventsLabel: string;
  /** Badge text for popular venues */
  popularBadgeText?: string;
  /** Label for capacity */
  capacityLabel: string;
}
```

---

## 3. Event Interface (TrendingSection)

**Location:** `src/components/sections/TrendingSection.tsx:9-13`

### Current Definition

```typescript
interface Event {
  id: string;
  title: string;
  [key: string]: unknown;
}
```

### Assessment

This interface is **minimally coupled**:

- Uses standard `id` instead of `_id`
- Uses simple `title: string` instead of multilingual object
- Index signature allows extension

### Recommendation

Rename to avoid domain-specific terminology:

```typescript
interface TrendingItem {
  id: string;
  title: string;
  [key: string]: unknown;
}
```

---

## 4. Article Interface

**Location:** `src/components/sections/ArticlesSection.tsx:9-15`

### Current Definition

```typescript
interface Article {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  image?: string;
}
```

### Assessment

This interface is **relatively generic** but the component hardcodes `/news/` route.

### Recommendation

Keep interface, add `href` prop:

```typescript
interface ArticleItem {
  title: string;
  description?: string;
  date?: string;
  imageUrl?: string;
  href: string; // Full URL instead of building from slug
}
```

---

## 5. FilterState Interface

**Location:** `src/components/filters/types.ts:10-24`

### Current Definition

```typescript
export interface FilterState {
  search: string;
  category: string;
  tags: string[];
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  priceRange: {
    min: number | null;
    max: number | null;
  };
  sortBy: string;
  sortOrder: "asc" | "desc";
}
```

### Assessment

This interface is **domain-agnostic** and can be used for any filtering scenario.

### Recommendation

✅ Keep as-is. This is a good generic interface.

---

## 6. FilterOption Interface

**Location:** `src/components/filters/types.ts:4-8`

### Current Definition

```typescript
export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}
```

### Assessment

✅ **Fully generic**. No coupling.

---

## 7. Multilingual Object Pattern

### Pattern Used

```typescript
{ en?: string; es?: string; ru?: string }
```

### Occurrences

| File            | Field                                  |
| --------------- | -------------------------------------- |
| `EventCard.tsx` | `name`, `description`, `venue_id.name` |
| `VenueCard.tsx` | `name`, `description`                  |

### Problem

This pattern:

1. Hardcodes supported languages
2. Embeds localization logic in UI library
3. Prevents use in projects with different language sets

### Solution

Accept pre-localized strings:

```typescript
// ❌ Current (coupled)
name?: { en?: string; es?: string; ru?: string }

// ✅ Proposed (decoupled)
name: string  // Consumer provides already-localized string
```

---

## 8. MongoDB-Style Field Naming

### Pattern Used

- `_id` instead of `id`
- `venue_id` instead of `venue` or `venueId`
- `events_count` instead of `eventsCount`

### Occurrences

| File            | Fields                |
| --------------- | --------------------- |
| `EventCard.tsx` | `_id`, `venue_id`     |
| `VenueCard.tsx` | `_id`, `events_count` |

### Problem

This naming convention:

1. Assumes MongoDB as database
2. Uses snake_case (inconsistent with TypeScript conventions)
3. Exposes internal data model

### Solution

Use standard JavaScript/TypeScript conventions:

```typescript
// ❌ Current
_id?: string;
venue_id?: { ... };
events_count?: number;

// ✅ Proposed
id?: string;
venue?: { ... };  // or just venueId: string
eventsCount?: number;
```

---

## Summary

### Types Requiring Refactoring

| Interface                 | Coupling Level | Effort    |
| ------------------------- | -------------- | --------- |
| `EventCardEvent`          | HIGH           | 2-3 hours |
| `VenueCardProps.venue`    | HIGH           | 2-3 hours |
| `Event` (TrendingSection) | LOW            | 30 min    |
| `Article`                 | MEDIUM         | 1 hour    |
| `FilterState`             | NONE           | N/A       |
| `FilterOption`            | NONE           | N/A       |

### Migration Strategy

1. **Phase 1:** Create new generic interfaces alongside existing ones
2. **Phase 2:** Add deprecation warnings to old interfaces
3. **Phase 3:** Update component implementations
4. **Phase 4:** Remove deprecated interfaces in next major version

---

**Report Generated:** 2025-11-25  
**Status:** Complete
