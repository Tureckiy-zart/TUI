# Route Decoupling Documentation

## Overview

This document describes the route decoupling refactoring performed on the Tenerife UI library to remove hardcoded routes and make components fully reusable across different routing systems.

**Date:** 2025-11-25  
**Task:** D3 - Route Decoupling  
**Status:** ✅ Completed

---

## Problem: Hardcoded Routes

Previously, UI components contained hardcoded Tenerife-specific routes:

- `/events/${event.slug}` in EventCard
- `/venues/${venue.slug}` in VenueCard
- `/news/${article.slug}` in ArticlesSection

This approach had several problems:

1. **Tight Coupling**: Components were tightly coupled to Tenerife's routing structure
2. **Limited Reusability**: Components couldn't be used in projects with different URL structures
3. **Framework Lock-in**: Components assumed specific routing patterns (e.g., Next.js `/events/` structure)
4. **Maintenance Burden**: Route changes required updating component code

---

## Solution: href Prop Pattern

All linkable components now accept a generic `href` prop that consumers control:

### Components Updated

1. **EventCard** - Uses `href?: string` prop
2. **VenueCard** - Uses `href?: string` prop
3. **ArticlesSection** - Uses `href: string` in `ArticleItem` interface
4. **TrendingSection** - Uses `href?: string` in `TrendingItem` interface

### Benefits

- ✅ **Framework Agnostic**: Works with Next.js, React Router, Remix, or any routing system
- ✅ **Flexible URLs**: Supports relative paths, absolute URLs, hash routes, or query parameters
- ✅ **Consumer Control**: Consumers decide URL structure and generation logic
- ✅ **Better Separation**: UI library doesn't know about routing implementation

---

## Migration Guide

### EventCard

**Before:**

```tsx
// Component internally generated route
<EventCard
  event={{ slug: "summer-concert-2024" }}
  // ... other props
/>
// Rendered: /events/summer-concert-2024
```

**After:**

```tsx
// Consumer provides full URL
<EventCard
  title="Summer Concert 2024"
  href="/events/summer-concert-2024"
  // ... other props
/>;

// Or with Next.js Link
import { useRouter } from "next/router";

const router = useRouter();
<EventCard
  title="Summer Concert 2024"
  href={`/events/${event.slug}`}
  // ... other props
/>;
```

### VenueCard

**Before:**

```tsx
// Component internally generated route
<VenueCard
  venue={{ slug: "central-park-amphitheater" }}
  // ... other props
/>
// Rendered: /venues/central-park-amphitheater
```

**After:**

```tsx
// Consumer provides full URL
<VenueCard
  name="Central Park Amphitheater"
  href="/venues/central-park-amphitheater"
  // ... other props
/>

// Or with dynamic routing
<VenueCard
  name="Central Park Amphitheater"
  href={`/venues/${venue.slug}`}
  // ... other props
/>
```

### ArticlesSection

**Before:**

```tsx
// Component internally generated route
<ArticlesSection
  articles={[
    { slug: "music-festival-guide", title: "Guide", ... }
  ]}
/>
// Rendered: /news/music-festival-guide
```

**After:**

```tsx
// Consumer provides full URL in ArticleItem
<ArticlesSection
  articles={[
    {
      href: "/blog/music-festival-guide",
      title: "Guide",
      ...
    }
  ]}
  readMoreLabel="Read more"
/>

// Or with different URL structure
<ArticlesSection
  articles={[
    {
      href: "/articles/2024/music-festival-guide",
      title: "Guide",
      ...
    }
  ]}
  readMoreLabel="Read more"
/>
```

---

## Consumer URL Generation Examples

### Next.js App Router

```tsx
import { EventCard } from "@tenerife.music/ui";

export function EventList({ events }) {
  return (
    <div>
      {events.map((event) => (
        <EventCard
          key={event.id}
          title={event.title}
          href={`/events/${event.slug}`}
          // ... other props
        />
      ))}
    </div>
  );
}
```

### Next.js Pages Router

```tsx
import { EventCard } from "@tenerife.music/ui";
import Link from "next/link";

export function EventList({ events }) {
  return (
    <div>
      {events.map((event) => (
        <EventCard
          key={event.id}
          title={event.title}
          href={`/events/${event.slug}`}
          // ... other props
        />
      ))}
    </div>
  );
}
```

### React Router

```tsx
import { EventCard } from "@tenerife.music/ui";
import { useNavigate } from "react-router-dom";

export function EventList({ events }) {
  const navigate = useNavigate();

  return (
    <div>
      {events.map((event) => (
        <EventCard
          key={event.id}
          title={event.title}
          href={`/events/${event.slug}`}
          // ... other props
        />
      ))}
    </div>
  );
}
```

### Remix

```tsx
import { EventCard } from "@tenerife.music/ui";
import { Link } from "@remix-run/react";

export function EventList({ events }) {
  return (
    <div>
      {events.map((event) => (
        <EventCard
          key={event.id}
          title={event.title}
          href={`/events/${event.slug}`}
          // ... other props
        />
      ))}
    </div>
  );
}
```

### Custom Routing

```tsx
import { EventCard } from "@tenerife.music/ui";

// Custom URL builder function
function buildEventUrl(event) {
  const year = new Date(event.date).getFullYear();
  return `/events/${year}/${event.slug}`;
}

export function EventList({ events }) {
  return (
    <div>
      {events.map((event) => (
        <EventCard
          key={event.id}
          title={event.title}
          href={buildEventUrl(event)}
          // ... other props
        />
      ))}
    </div>
  );
}
```

---

## Advanced: URL Builder Functions

For complex routing needs, create adapter functions:

### Event URL Builder

```tsx
// adapters/ui/eventToCardProps.ts
import { EventCardProps } from "@tenerife.music/ui";
import { Event } from "@/types/event";

export function eventToCardProps(event: Event): EventCardProps {
  return {
    title: event.name.en, // Pre-localized
    description: event.description.en,
    date: formatDate(event.startDate),
    venueName: event.venue.name.en,
    price: formatPrice(event.priceRange),
    imageUrl: event.imageUrl,
    href: `/events/${event.slug}`, // Consumer controls URL
    ticketUrl: event.ticketUrl,
    featured: event.featured,
    getTicketsLabel: "Get Tickets", // Pre-localized
    featuredBadgeText: event.featured ? "Featured" : undefined,
  };
}

// Usage
import { EventCard } from "@tenerife.music/ui";
import { eventToCardProps } from "@/adapters/ui/eventToCardProps";

<EventCard {...eventToCardProps(event)} />;
```

### Venue URL Builder

```tsx
// adapters/ui/venueToCardProps.ts
import { VenueCardProps } from "@tenerife.music/ui";
import { Venue } from "@/types/venue";

export function venueToCardProps(venue: Venue): VenueCardProps {
  return {
    name: venue.name.en, // Pre-localized
    description: venue.description.en,
    location: formatAddress(venue.address),
    capacity: formatCapacity(venue.capacity),
    imageUrl: venue.imageUrl,
    href: `/venues/${venue.slug}`, // Consumer controls URL
    eventsCount: venue.eventsCount,
    featured: venue.featured,
    eventsLabel: "Events", // Pre-localized
    capacityLabel: "Capacity", // Pre-localized
    popularBadgeText: venue.popular ? "Popular" : undefined,
  };
}

// Usage
import { VenueCard } from "@tenerife.music/ui";
import { venueToCardProps } from "@/adapters/ui/venueToCardProps";

<VenueCard {...venueToCardProps(venue)} />;
```

### Article URL Builder

```tsx
// adapters/ui/articleToItemProps.ts
import { ArticleItem } from "@tenerife.music/ui";
import { Article } from "@/types/article";

export function articleToItemProps(article: Article): ArticleItem {
  return {
    title: article.title.en, // Pre-localized
    description: article.description.en,
    date: formatDate(article.publishedAt),
    imageUrl: article.imageUrl,
    href: `/blog/${article.slug}`, // Consumer controls URL
  };
}

// Usage
import { ArticlesSection } from "@tenerife.music/ui";
import { articleToItemProps } from "@/adapters/ui/articleToItemProps";

<ArticlesSection articles={articles.map(articleToItemProps)} readMoreLabel="Read more" />;
```

---

## Component API Reference

### EventCard

```tsx
interface EventCardProps {
  // ... other props
  /** Link URL for event details page (optional) */
  href?: string;
}
```

**Behavior:**

- If `href` is provided, title becomes a clickable link
- If `href` is not provided, title renders as plain text
- Component doesn't generate URLs internally

### VenueCard

```tsx
interface VenueCardProps {
  // ... other props
  /** Link URL for venue details page (optional) */
  href?: string;
}
```

**Behavior:**

- If `href` is provided, name becomes a clickable link
- If `href` is not provided, name renders as plain text
- Component doesn't generate URLs internally

### ArticlesSection

```tsx
interface ArticleItem {
  // ... other props
  /** Full URL for article details page */
  href: string; // Required
}
```

**Behavior:**

- `href` is required in `ArticleItem` interface
- Both title link and "Read more" link use `article.href`
- Component doesn't generate URLs internally

### TrendingSection

```tsx
interface TrendingItem {
  // ... other props
  /** Link URL for item details page (optional) */
  href?: string;
}
```

**Behavior:**

- `href` is optional in `TrendingItem` interface
- Component can be used with or without links
- Component doesn't generate URLs internally

---

## Verification

### No Hardcoded Routes

All hardcoded routes have been removed from component files:

- ✅ No `/events/` routes in EventCard.tsx
- ✅ No `/venues/` routes in VenueCard.tsx
- ✅ No `/news/` routes in ArticlesSection.tsx

### Storybook Stories

Storybook stories may contain example routes (e.g., `/events/example`) for demonstration purposes. This is acceptable as stories are documentation, not production code.

### Component Behavior

All components:

- ✅ Accept `href` prop from consumers
- ✅ Don't generate URLs internally
- ✅ Work with any URL structure
- ✅ Handle missing `href` gracefully

---

## Breaking Changes

### EventCard

- ❌ **Removed**: Internal route generation (`/events/${event.slug}`)
- ✅ **Added**: `href?: string` prop
- ⚠️ **Migration**: Consumers must provide `href` prop

### VenueCard

- ❌ **Removed**: Internal route generation (`/venues/${venue.slug}`)
- ✅ **Added**: `href?: string` prop
- ⚠️ **Migration**: Consumers must provide `href` prop

### ArticlesSection

- ❌ **Removed**: Internal route generation (`/news/${article.slug}`)
- ❌ **Removed**: `slug` property from `ArticleItem`
- ✅ **Added**: `href: string` property in `ArticleItem`
- ⚠️ **Migration**: Consumers must provide `href` in article items

---

## Best Practices

### 1. Use Adapter Functions

Create adapter functions to map domain models to UI component props:

```tsx
// ✅ Good: Adapter function
function eventToCardProps(event: Event): EventCardProps {
  return {
    title: event.name.en,
    href: `/events/${event.slug}`,
    // ... other props
  };
}

// ❌ Bad: Direct mapping in component
<EventCard title={event.name.en} href={`/events/${event.slug}`} />;
```

### 2. Centralize URL Generation

Keep URL generation logic in one place:

```tsx
// ✅ Good: Centralized URL builder
// utils/routes.ts
export function getEventUrl(event: Event): string {
  return `/events/${event.slug}`;
}

export function getVenueUrl(venue: Venue): string {
  return `/venues/${venue.slug}`;
}

// ❌ Bad: Scattered URL generation
<EventCard href={`/events/${event.slug}`} />
<VenueCard href={`/venues/${venue.slug}`} />
```

### 3. Support Multiple URL Patterns

Components work with any URL structure:

```tsx
// ✅ All valid:
<EventCard href="/events/summer-concert" />
<EventCard href="/concerts/2024/summer" />
<EventCard href="/e/summer-concert-2024" />
<EventCard href="https://example.com/events/summer" />
```

### 4. Handle Missing href Gracefully

Components handle missing `href` prop:

```tsx
// ✅ Works: Renders as text when href is missing
<EventCard title="Event Title" />

// ✅ Works: Renders as link when href is provided
<EventCard title="Event Title" href="/events/example" />
```

---

## Summary

Route decoupling successfully removes all hardcoded routes from UI components, making them:

- ✅ **Framework Agnostic**: Work with any routing system
- ✅ **Flexible**: Support any URL structure
- ✅ **Reusable**: Can be used in any project
- ✅ **Maintainable**: Route changes don't require component updates

Consumers now have full control over URL generation and routing logic, enabling better separation of concerns and improved component reusability.

---

## Related Documentation

- [Domain Decoupling Report](./domain-decoupling-report.md) - Domain model decoupling
- [Public API Documentation](./public-api.md) - Complete API reference
- [Component Examples](../README.md) - Usage examples

---

**Last Updated:** 2025-11-25  
**Task:** D3 - Route Decoupling  
**Status:** ✅ Completed
