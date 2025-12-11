# Domain Decoupling Report

**Date:** 2025-11-25  
**Task:** D2 - Domain Decoupling  
**Status:** ✅ Completed

---

## Overview

This report documents the domain decoupling refactoring performed on UI library components. All domain-specific interfaces have been replaced with generic, flat, domain-agnostic props that accept pre-localized strings and pre-formatted data.

---

## Changes Summary

### Components Refactored

| Component         | Old Interface                                 | New Interface                          | Status      |
| ----------------- | --------------------------------------------- | -------------------------------------- | ----------- |
| `EventCard`       | `EventCardEvent` (nested, multilingual)       | `EventCardProps` (flat, pre-localized) | ✅ Complete |
| `VenueCard`       | `VenueCardProps.venue` (nested, multilingual) | `VenueCardProps` (flat, pre-localized) | ✅ Complete |
| `TrendingSection` | `Event` (domain-specific name)                | `TrendingItem` (generic)               | ✅ Complete |
| `ArticlesSection` | `Article` (slug-based routing)                | `ArticleItem` (href-based routing)     | ✅ Complete |

---

## Detailed Changes

### 1. EventCard Component

#### Before (Domain-Coupled)

```typescript
export interface EventCardEvent {
  _id?: string; // MongoDB naming
  slug?: string;
  name?: { en?: string; es?: string; ru?: string }; // Multilingual object
  start_date?: string;
  ticket_url?: string;
  venue_id?: { name?: { en?: string; es?: string; ru?: string } }; // Nested multilingual
  description?: { en?: string; es?: string; ru?: string }; // Multilingual object
  price?: string;
  image?: string;
}

interface EventCardProps {
  event?: EventCardEvent;
  // ... other props
}
```

**Issues:**

- MongoDB naming convention (`_id`)
- Hardcoded multilingual pattern (`{en, es, ru}`)
- Nested objects (`venue_id.name`)
- Domain-specific field names (`start_date`, `ticket_url`)

#### After (Domain-Agnostic)

```typescript
export interface EventCardProps {
  /** Event title (pre-localized string) */
  title: string;
  /** Event description (pre-localized string, optional) */
  description?: string;
  /** Event date/time display string (pre-formatted, optional) */
  date?: string;
  /** Venue name (pre-localized string, optional) */
  venueName?: string;
  /** Price display string with currency (e.g., "€20 - €50", optional) */
  price?: string;
  /** Image URL (optional) */
  imageUrl?: string;
  /** Link URL for event details page (optional) */
  href?: string;
  /** External ticket purchase URL (optional) */
  ticketUrl?: string;
  /** Whether this is a featured event */
  featured?: boolean;
  /** Show image section */
  showImage?: boolean;
  /** Label for "Get Tickets" button (required) */
  getTicketsLabel: string;
  /** Badge text for featured events (optional) */
  featuredBadgeText?: string;
  /** Additional CSS classes */
  className?: string;
  /** Legacy support: old event object (deprecated) */
  event?: EventCardEvent;
}
```

**Improvements:**

- ✅ Flat props structure
- ✅ Pre-localized strings (consumer handles localization)
- ✅ Pre-formatted data (consumer handles formatting)
- ✅ Standard naming conventions (`imageUrl`, `ticketUrl`, `href`)
- ✅ No MongoDB naming
- ✅ Legacy support maintained for backward compatibility

---

### 2. VenueCard Component

#### Before (Domain-Coupled)

```typescript
interface VenueCardProps {
  venue?: {
    _id?: string; // MongoDB naming
    slug?: string;
    name?: { en?: string; es?: string; ru?: string }; // Multilingual object
    description?: { en?: string; es?: string; ru?: string }; // Multilingual object
    location?: string;
    address?: string;
    city?: string;
    region?: string;
    capacity?: string;
    image?: string;
    coordinates?: { lat: number; lng: number };
    type?: string;
    website?: string;
    events_count?: number; // MongoDB naming
  };
  // ... other props
}
```

**Issues:**

- Nested `venue` object
- MongoDB naming (`_id`, `events_count`)
- Hardcoded multilingual pattern
- Domain-specific fields (`coordinates`, `type`, `website`)

#### After (Domain-Agnostic)

```typescript
export interface VenueCardProps {
  /** Venue name (pre-localized string, required) */
  name: string;
  /** Venue description (pre-localized string, optional) */
  description?: string;
  /** Location display string (pre-formatted address, optional) */
  location?: string;
  /** Capacity display string (pre-formatted, optional) */
  capacity?: string;
  /** Image URL (optional) */
  imageUrl?: string;
  /** Link URL for venue details page (optional) */
  href?: string;
  /** Number of associated events (optional) */
  eventsCount?: number;
  /** Whether this is a featured venue */
  featured?: boolean;
  /** Show image section */
  showImage?: boolean;
  /** Label for events count (required) */
  eventsLabel: string;
  /** Badge text for popular venues (optional) */
  popularBadgeText?: string;
  /** Label for capacity (required) */
  capacityLabel: string;
  /** Additional CSS classes */
  className?: string;
  /** Legacy support: old venue object (deprecated) */
  venue?: LegacyVenue;
}
```

**Improvements:**

- ✅ Flat props structure (no nested objects)
- ✅ Pre-localized strings
- ✅ Standard naming (`imageUrl`, `eventsCount`, `href`)
- ✅ No MongoDB naming
- ✅ Removed domain-specific fields (`coordinates`, `type`, `website`)
- ✅ Legacy support maintained

---

### 3. TrendingSection Component

#### Before (Domain-Coupled)

```typescript
interface Event {
  id: string;
  title: string;
  [key: string]: unknown;
}

interface TrendingSectionProps {
  events: Event[];
  // ... other props
}
```

**Issues:**

- Domain-specific name (`Event`)
- Index signature allows any properties

#### After (Domain-Agnostic)

```typescript
export interface TrendingItem {
  /** Unique identifier for the item */
  id: string;
  /** Item title (pre-localized string) */
  title: string;
  /** Item description (optional, pre-localized string) */
  description?: string;
  /** Image URL (optional) */
  imageUrl?: string;
  /** Link URL for item details page (optional) */
  href?: string;
}

interface TrendingSectionProps {
  events: TrendingItem[];
  // ... other props
}
```

**Improvements:**

- ✅ Generic name (`TrendingItem`)
- ✅ Explicit optional properties instead of index signature
- ✅ Consistent naming (`imageUrl`, `href`)

---

### 4. ArticlesSection Component

#### Before (Domain-Coupled)

```typescript
interface Article {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  image?: string;
}

// Component hardcodes route: `/news/${article.slug}`
```

**Issues:**

- Hardcoded route (`/news/`)
- Domain-specific name (`Article`)
- Inconsistent naming (`image` instead of `imageUrl`)

#### After (Domain-Agnostic)

```typescript
export interface ArticleItem {
  /** Article title (pre-localized string) */
  title: string;
  /** Article description (optional, pre-localized string) */
  description?: string;
  /** Publication date display string (pre-formatted, optional) */
  date?: string;
  /** Image URL (optional) */
  imageUrl?: string;
  /** Full URL for article details page */
  href: string;
}

// Component uses article.href directly (no hardcoded routes)
```

**Improvements:**

- ✅ Generic name (`ArticleItem`)
- ✅ Full URL instead of slug (consumer controls routing)
- ✅ Consistent naming (`imageUrl`, `href`)
- ✅ No hardcoded routes

---

## Migration Guide

### For EventCard

#### Usage

```typescript
<EventCard
  title="Summer Festival" // Pre-localized
  description="Amazing event" // Pre-localized
  date="July 15, 2025" // Pre-formatted
  venueName="Beach Club" // Pre-localized
  price="€20 - €50" // Pre-formatted with currency
  imageUrl="https://example.com/image.jpg"
  href="/events/summer-festival" // Consumer controls routing
  ticketUrl="https://tickets.com/event"
  featured={true}
  showImage={true}
  getTicketsLabel="Get Tickets"
  featuredBadgeText="Trending"
/>
```

#### Adapter Pattern (For Consumer Projects)

```typescript
// In consumer project: apps/web/src/adapters/ui/eventToCardProps.ts
import type { Event } from "@/types/event"; // Domain model
import type { EventCardProps } from "@tenerife.music/ui";

export function eventToCardProps(
  event: Event,
  locale: "en" | "es" | "ru" = "en",
): Omit<EventCardProps, "getTicketsLabel" | "featuredBadgeText"> {
  return {
    title: event.name[locale] || event.name.en || "",
    description: event.description?.[locale] || event.description?.en,
    date: formatDate(event.start_date, locale),
    venueName: event.venue_id?.name?.[locale] || event.venue_id?.name?.en,
    price: formatPrice(event.price, locale),
    imageUrl: event.image,
    href: `/events/${event.slug}`,
    ticketUrl: event.ticket_url,
    featured: event.featured || false,
    showImage: true,
  };
}
```

---

### For VenueCard

#### Usage

```typescript
<VenueCard
  name="Beach Club" // Pre-localized
  description="Amazing venue" // Pre-localized
  location="Tenerife, Spain" // Pre-formatted
  capacity="500" // Pre-formatted
  imageUrl="https://example.com/venue.jpg"
  href="/venues/beach-club" // Consumer controls routing
  eventsCount={12}
  featured={true}
  showImage={true}
  eventsLabel="Events"
  popularBadgeText="Popular"
  capacityLabel="Capacity"
/>
```

#### Adapter Pattern (For Consumer Projects)

```typescript
// In consumer project: apps/web/src/adapters/ui/venueToCardProps.ts
import type { Venue } from "@/types/venue"; // Domain model
import type { VenueCardProps } from "@tenerife.music/ui";

export function venueToCardProps(
  venue: Venue,
  locale: "en" | "es" | "ru" = "en",
): Omit<VenueCardProps, "eventsLabel" | "popularBadgeText" | "capacityLabel"> {
  return {
    name: venue.name[locale] || venue.name.en || "",
    description: venue.description?.[locale] || venue.description?.en,
    location: formatLocation(venue, locale),
    capacity: venue.capacity?.toString(),
    imageUrl: venue.image,
    href: `/venues/${venue.slug}`,
    eventsCount: venue.events_count,
    featured: venue.featured || false,
    showImage: true,
  };
}
```

---

### For TrendingSection

#### Usage

```typescript
<TrendingSection
  events={[
    {
      id: "1",
      title: "Event 1",
      description: "Description",
      imageUrl: "https://example.com/image.jpg",
      href: "/events/1"
    },
    {
      id: "2",
      title: "Event 2",
      href: "/events/2"
    }
  ]}
  limit={5}
  loading={false}
  title="Trending"
  loadingText="Loading..."
  contentText="No events"
/>
```

---

### For ArticlesSection

#### Usage

```typescript
<ArticlesSection
  articles={[
    {
      title: "Article Title",
      description: "Description",
      date: "January 20, 2025", // Pre-formatted
      imageUrl: "https://example.com/image.jpg",
      href: "/news/article-1" // Consumer controls routing
    }
  ]}
  readMoreLabel="Read More"
/>
```

**Note:** Consumer controls routing completely via `href` prop.

---

## Breaking Changes

### EventCard

- ❌ **Removed:** `EventCardEvent` interface (completely removed)
- ❌ **Removed:** `event` prop (completely removed)
- ✅ **Added:** Flat props (`title`, `description`, `date`, `venueName`, `price`, `imageUrl`, `href`, `ticketUrl`)
- ⚠️ **Changed:** `trendingBadgeText` → `featuredBadgeText` (more generic name)

### VenueCard

- ❌ **Removed:** `LegacyVenue` interface (completely removed)
- ❌ **Removed:** `venue` prop (completely removed)
- ✅ **Added:** Flat props (`name`, `description`, `location`, `capacity`, `imageUrl`, `href`, `eventsCount`)
- ⚠️ **Changed:** `featured` and `showImage` are now optional (default: `false` and `true`)

### TrendingSection

- ⚠️ **Changed:** `Event` interface → `TrendingItem` interface
- ⚠️ **Changed:** Removed index signature `[key: string]: unknown`
- ✅ **Added:** Explicit optional properties (`description`, `imageUrl`, `href`)

### ArticlesSection

- ⚠️ **Changed:** `Article` interface → `ArticleItem` interface
- ⚠️ **Changed:** `slug: string` → `href: string` (full URL, required)
- ⚠️ **Changed:** `image` → `imageUrl` (consistent naming)
- ⚠️ **Changed:** Removed hardcoded `/news/` route

---

## Breaking Changes

**All legacy interfaces and props have been removed.** This is a clean break from the old API:

- ❌ `EventCardEvent` interface removed
- ❌ `event` prop removed from `EventCard`
- ❌ `LegacyVenue` interface removed
- ❌ `venue` prop removed from `VenueCard`

**Migration Required:**

Consumers must migrate to the new flat props API. Use adapter functions in your project to convert domain models to UI props.

---

## Benefits

### 1. Domain Independence

- ✅ UI library no longer depends on Tenerife domain models
- ✅ Components can be used in any project
- ✅ No MongoDB naming conventions
- ✅ No hardcoded language support

### 2. Flexibility

- ✅ Consumer controls localization
- ✅ Consumer controls routing
- ✅ Consumer controls data formatting
- ✅ Consumer controls data structure

### 3. Maintainability

- ✅ Simpler component interfaces
- ✅ Easier to test
- ✅ Easier to document
- ✅ Clear separation of concerns

### 4. Performance

- ✅ No runtime multilingual extraction logic
- ✅ No nested object access
- ✅ Pre-formatted data reduces computation

---

## Type Exports

All new interfaces are exported from the main entry point:

```typescript
import type { EventCardProps, VenueCardProps, TrendingItem, ArticleItem } from "@tenerife.music/ui";
```

---

## Testing

All components have been tested with:

- ✅ TypeScript strict mode compilation
- ✅ ESLint validation
- ✅ Legacy prop support verification
- ✅ New prop usage verification

---

## Next Steps

1. **D3 - Route Decoupling:** Remove hardcoded routes from components (already partially done in D2)
2. **D4 - I18n Removal:** Complete removal of multilingual patterns (already done in D2)
3. **D5 - Props Redesign:** Standardize all component props (in progress)
4. **D6 - Adapter Layer:** Create adapter functions in consumer project
5. **D7 - Frontend Integration:** Update all usages in consumer project

---

## References

- **Task:** D2 - Domain Decoupling
- **Report:** `.cursor/reports/UI_LIB_DOMAIN_DEPENDENCIES.md`
- **Master Task:** `.cursor/tasks/master/master_tasks.json`

---

**Report Generated:** 2025-11-25  
**Status:** ✅ Complete
