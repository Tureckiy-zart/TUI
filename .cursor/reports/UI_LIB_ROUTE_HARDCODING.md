# UI Library Route Hardcoding Report

**Date:** 2025-11-25  
**Purpose:** Document all hardcoded routes and URLs that prevent library independence

---

## Overview

This report identifies all instances where URL paths are hardcoded in components, making the library dependent on the Tenerife project's routing structure.

---

## Hardcoded Routes Summary

| Component             | Route Pattern       | Line   | Count |
| --------------------- | ------------------- | ------ | ----- |
| `EventCard`           | `/events/${slug}`   | 121    | 1     |
| `VenueCard`           | `/venues/${slug}`   | 139    | 1     |
| `ArticlesSection`     | `/news/${slug}`     | 44, 55 | 2     |
| `Breadcrumbs.stories` | `/events/classical` | 21     | 1     |

**Total:** 5 hardcoded route instances

---

## 1. EventCard Route

**File:** `src/components/cards/EventCard.tsx`  
**Line:** 121

### Current Code

```typescript
{event?.slug ? (
  <Link href={`/events/${event.slug}`} variant="ghost">
    {title}
  </Link>
) : (
  title
)}
```

### Problem

- Hardcodes `/events/` path prefix
- Assumes all projects use same URL structure
- Cannot be customized without modifying library

### Solution

Accept `href` prop:

```typescript
interface EventCardProps {
  // ... existing props
  href?: string;  // Full URL instead of building from slug
}

// Usage
{href ? (
  <Link href={href} variant="ghost">
    {title}
  </Link>
) : (
  title
)}
```

---

## 2. VenueCard Route

**File:** `src/components/cards/VenueCard.tsx`  
**Line:** 139

### Current Code

```typescript
{venue?.slug ? (
  <Link href={`/venues/${venue.slug}`} variant="ghost">
    {name}
  </Link>
) : (
  name
)}
```

### Problem

- Hardcodes `/venues/` path prefix
- Same issue as EventCard

### Solution

Accept `href` prop:

```typescript
interface VenueCardProps {
  // ... existing props
  href?: string; // Full URL instead of building from slug
}
```

---

## 3. ArticlesSection Routes

**File:** `src/components/sections/ArticlesSection.tsx`  
**Lines:** 44, 55

### Current Code

```typescript
// Line 44 - Title link
<Link href={`/news/${article.slug}`} variant="ghost" className="hover:text-primary">
  {article.title}
</Link>

// Line 55 - Read more link
<Link
  href={`/news/${article.slug}`}
  variant="primary"
  className="inline-flex items-center"
>
  {readMoreLabel} →
</Link>
```

### Problem

- Hardcodes `/news/` path prefix
- Two separate usages of same route

### Solution

Add `href` to Article interface:

```typescript
interface Article {
  // ... existing fields
  href: string;  // Full URL provided by consumer
}

// Usage
<Link href={article.href} variant="ghost">
  {article.title}
</Link>
```

---

## 4. Breadcrumbs Story Route

**File:** `src/components/navigation/Breadcrumbs.stories.tsx`  
**Line:** 21

### Current Code

```typescript
args: {
  items: [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Classical", href: "/events/classical" },
  ],
},
```

### Assessment

This is in a Storybook story file, not production code.

### Recommendation

✅ **Acceptable** - Story files are documentation/examples and may contain project-specific examples.

---

## Impact Analysis

### Blocked Use Cases

1. **Different URL Structure**
   - Projects using `/e/{slug}` instead of `/events/{slug}`
   - Projects using localized URLs like `/es/eventos/{slug}`

2. **Hash Routing**
   - SPAs using `/#/events/{slug}` pattern

3. **Query Parameters**
   - Projects using `?event={slug}` pattern

4. **External Links**
   - Linking to external event pages

### Affected Components

| Component            | Independence Level        |
| -------------------- | ------------------------- |
| EventCard            | ❌ Cannot work standalone |
| VenueCard            | ❌ Cannot work standalone |
| ArticlesSection      | ❌ Cannot work standalone |
| All other components | ✅ Independent            |

---

## Recommended Fixes

### Option A: Add `href` Prop (Recommended)

```typescript
// Consumer provides full URL
<EventCard
  event={event}
  href={`/my-custom-path/${event.id}`}
  // ...
/>
```

### Option B: Add `baseUrl` Prop

```typescript
// Consumer provides base path, component builds full URL
<EventCard
  event={event}
  baseUrl="/my-events"  // Results in /my-events/{slug}
  // ...
/>
```

### Option C: URL Builder Function

```typescript
// Consumer provides URL builder function
<EventCard
  event={event}
  buildUrl={(slug) => `/localized/events/${slug}`}
  // ...
/>
```

### Recommendation

**Option A (`href` prop)** is preferred because:

- Simplest API
- Most flexible
- Consumer has full control
- No assumptions about URL structure

---

## Migration Guide

### Before (Current)

```tsx
<EventCard
  event={{
    _id: "123",
    slug: "summer-concert",
    name: { en: "Summer Concert" },
    // ...
  }}
  featured={true}
  showImage={true}
  getTicketsLabel="Get Tickets"
  trendingBadgeText="Trending"
/>
```

### After (Proposed)

```tsx
<EventCard
  title="Summer Concert"
  description="A great summer event"
  date="July 15, 2024"
  venueName="Central Park"
  price="$25 - $75"
  imageUrl="/images/summer-concert.jpg"
  href="/events/summer-concert" // Consumer controls URL
  ticketUrl="https://tickets.example.com/123"
  featured={true}
  showImage={true}
  getTicketsLabel="Get Tickets"
  featuredBadgeText="Trending"
/>
```

---

## Priority

| Fix                               | Priority | Effort |
| --------------------------------- | -------- | ------ |
| EventCard `href` prop             | HIGH     | 1 hour |
| VenueCard `href` prop             | HIGH     | 1 hour |
| ArticlesSection `href` in Article | MEDIUM   | 30 min |

---

**Report Generated:** 2025-11-25  
**Status:** Complete
