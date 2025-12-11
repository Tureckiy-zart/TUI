# Component Props Guidelines

## Overview

This document defines the standardized naming conventions and patterns for component props across the Tenerife UI library. All components must follow these guidelines to ensure consistency, maintainability, and developer experience.

**Date:** 2025-11-25  
**Task:** D5 - Props Redesign  
**Status:** ✅ Active

---

## Core Principles

1. **Domain-Agnostic**: Props should not contain domain-specific terminology
2. **Pre-Localized**: Text props accept pre-localized strings (consumers handle i18n)
3. **Pre-Formatted**: Display strings (dates, prices, locations) are pre-formatted
4. **Consistent Naming**: Same concepts use same prop names across components
5. **Type Safety**: All props are properly typed with TypeScript
6. **Documentation**: All props have JSDoc comments

---

## Naming Conventions

### Text Content Props

| Prop Name     | Purpose                     | Example                                | Required         |
| ------------- | --------------------------- | -------------------------------------- | ---------------- |
| `title`       | Main heading text           | `"Summer Music Festival"`              | Usually required |
| `description` | Secondary descriptive text  | `"A three-day outdoor music festival"` | Optional         |
| `label`       | Short text for UI elements  | `"Get Tickets"`                        | Usually required |
| `name`        | Name/title in venue context | `"Madison Square Garden"`              | Context-specific |

**Rules:**

- Use `title` for main content headings
- Use `name` only for venue-specific contexts (VenueCard)
- Use `description` for secondary text
- Use `label` for button labels, form labels, etc.

### URLs and Links

| Prop Name    | Purpose                      | Example                             | Required                               |
| ------------ | ---------------------------- | ----------------------------------- | -------------------------------------- |
| `href`       | Navigation URL (full path)   | `"/events/summer-concert"`          | Optional (required for linkable items) |
| `imageUrl`   | Image source URL             | `"https://example.com/image.jpg"`   | Optional                               |
| `ticketUrl`  | External ticket purchase URL | `"https://tickets.example.com/123"` | Optional                               |
| `websiteUrl` | External website URL         | `"https://example.com"`             | Optional                               |

**Rules:**

- ✅ **ALWAYS** use `href` (NOT `slug` + base path)
- ✅ **ALWAYS** use `imageUrl` (NOT `image`)
- ✅ `href` is optional for cards (renders as text if missing)
- ✅ `href` is required for ArticleItem (always linkable)

### Display Strings

| Prop Name  | Purpose                           | Example                       | Required |
| ---------- | --------------------------------- | ----------------------------- | -------- |
| `date`     | Pre-formatted date/time string    | `"July 15, 2024 at 7:00 PM"`  | Optional |
| `price`    | Pre-formatted price with currency | `"€20 - €50"` or `"$25"`      | Optional |
| `location` | Pre-formatted location/address    | `"123 Main St, New York, NY"` | Optional |
| `capacity` | Pre-formatted capacity string     | `"5,000"` or `"5,000 seats"`  | Optional |

**Rules:**

- ✅ All display strings are **pre-formatted** by consumers
- ✅ Components never format dates, prices, or locations
- ✅ Formatting includes currency symbols, units, etc.

### Boolean Props

| Prop Name   | Purpose                  | Example | Required                    |
| ----------- | ------------------------ | ------- | --------------------------- |
| `featured`  | Highlight/feature state  | `true`  | Optional (default: `false`) |
| `showImage` | Control image visibility | `true`  | Optional (default: `true`)  |
| `disabled`  | Disabled state           | `false` | Optional (default: `false`) |
| `loading`   | Loading state            | `true`  | Optional (default: `false`) |

**Rules:**

- ✅ Use descriptive boolean names (`showImage` not `image`)
- ✅ Default values should be explicit in prop destructuring
- ✅ Boolean props should be optional unless critical

### Callback Props

| Prop Name  | Purpose              | Signature                     | Required |
| ---------- | -------------------- | ----------------------------- | -------- |
| `onClick`  | Click handler        | `(event: MouseEvent) => void` | Optional |
| `onClose`  | Close handler        | `() => void`                  | Optional |
| `onChange` | Value change handler | `(value: T) => void`          | Optional |

**Rules:**

- ✅ Use `on` prefix for event handlers
- ✅ Use descriptive names (`onClose` not `onDismiss`)
- ✅ Type handlers with proper TypeScript signatures

### Counters and Numbers

| Prop Name     | Purpose                     | Example | Required |
| ------------- | --------------------------- | ------- | -------- |
| `eventsCount` | Number of associated events | `5`     | Optional |
| `count`       | Generic count               | `10`    | Optional |

**Rules:**

- ✅ Use descriptive names (`eventsCount` not `count`)
- ✅ Numbers are raw values (components don't format)

---

## Component-Specific Patterns

### Card Components

All card components should expose:

```typescript
interface CardProps {
  // Content
  title: string; // Main heading (required)
  description?: string; // Secondary text (optional)

  // Media
  imageUrl?: string; // Image source (optional)
  showImage?: boolean; // Control image visibility (optional, default: true)

  // Navigation
  href?: string; // Link URL (optional - renders as text if missing)

  // State
  featured?: boolean; // Highlight state (optional, default: false)

  // Styling
  className?: string; // Additional CSS classes (optional)
}
```

**Card Component Examples:**

- ✅ `EventCard` - Uses `title`, `description`, `venueName`, `imageUrl`, `href`
- ✅ `VenueCard` - Uses `name` (venue-specific), `description`, `imageUrl`, `href`

### Section Components

Section components accept arrays of items:

```typescript
interface Item {
  id: string; // Unique identifier (required)
  title: string; // Main text (required)
  description?: string; // Secondary text (optional)
  imageUrl?: string; // Image source (optional)
  href?: string; // Link URL (optional)
}

interface SectionProps {
  items: Item[]; // Array of items (required)
  title: string; // Section heading (required)
  // ... other props
}
```

**Section Component Examples:**

- ✅ `ArticlesSection` - Uses `ArticleItem[]` with `title`, `description`, `imageUrl`, `href`
- ✅ `TrendingSection` - Uses `TrendingItem[]` with `id`, `title`, `description`, `imageUrl`, `href`

---

## Required vs Optional Props

### Required Props

Props are required when:

- Component cannot function without them
- Missing value would cause runtime errors
- Value is critical for component purpose

**Examples:**

- `EventCard.title` - Required (card needs title)
- `VenueCard.name` - Required (venue card needs name)
- `ArticleItem.href` - Required (article is always linkable)
- `getTicketsLabel` - Required (button needs label)

### Optional Props

Props are optional when:

- Component can function with default/fallback behavior
- Value has sensible default
- Value is enhancement, not core functionality

**Examples:**

- `description` - Optional (card works without description)
- `imageUrl` - Optional (card shows placeholder if missing)
- `href` - Optional for cards (renders as text if missing)
- `featured` - Optional (default: `false`)

---

## TypeScript Patterns

### Interface Definition

```typescript
/**
 * Props for ComponentName component.
 * Brief description of component purpose.
 */
export interface ComponentNameProps {
  /** Prop description (pre-localized/pre-formatted if applicable) */
  propName: string;

  /** Optional prop description */
  optionalProp?: string;

  /** Additional CSS classes */
  className?: string;
}
```

### Component Implementation

```typescript
export const ComponentName: React.FC<ComponentNameProps> = ({
  propName,
  optionalProp,
  className,
}) => {
  // Component implementation
};
```

### Type Exports

```typescript
// Always export prop types
export type { ComponentNameProps } from "./ComponentName";
```

---

## Common Prop Patterns

### Linkable Components

Components that can be links should accept `href`:

```typescript
interface LinkableCardProps {
  title: string;
  href?: string;  // Optional - renders as text if missing
}

// Usage
{href ? (
  <Link href={href}>{title}</Link>
) : (
  <span>{title}</span>
)}
```

### Image Components

Components with images should use `imageUrl`:

```typescript
interface ImageCardProps {
  imageUrl?: string;  // Optional - shows placeholder if missing
  showImage?: boolean; // Optional - controls visibility
}

// Usage
{showImage && (
  imageUrl ? (
    <img src={imageUrl} alt={title} />
  ) : (
    <PlaceholderIcon />
  )
)}
```

### Label Props

Components with buttons/labels should accept label props:

```typescript
interface ButtonCardProps {
  actionLabel: string; // Required - button needs text
  // or
  getTicketsLabel: string; // Descriptive name
}
```

---

## Migration Examples

### Before (Inconsistent)

```typescript
// ❌ Bad: Inconsistent naming
interface EventCardProps {
  name: string; // Should be 'title'
  image: string; // Should be 'imageUrl'
  slug: string; // Should be 'href'
  date: Date; // Should be pre-formatted string
}
```

### After (Standardized)

```typescript
// ✅ Good: Consistent naming
interface EventCardProps {
  title: string; // Main heading
  imageUrl?: string; // Image source
  href?: string; // Link URL
  date?: string; // Pre-formatted date string
}
```

---

## Validation Rules

### Prop Validation

Components should validate required props:

```typescript
export const ComponentName: React.FC<ComponentNameProps> = ({
  requiredProp,
  // ...
}) => {
  if (!requiredProp || requiredProp.trim() === "") {
    throw new Error('ComponentName: "requiredProp" prop is required and cannot be empty');
  }

  // Component implementation
};
```

### Type Validation

Use TypeScript strict mode to catch prop misuse:

```typescript
// ✅ Good: Strict types
interface Props {
  title: string; // Required
  href?: string; // Optional
}

// ❌ Bad: Loose types
interface Props {
  title?: string; // Should be required
  href: string; // Should be optional
}
```

---

## Checklist for New Components

When creating a new component, ensure:

- [ ] All props follow naming conventions
- [ ] Required vs optional props are correct
- [ ] JSDoc comments on all props
- [ ] TypeScript types are strict
- [ ] Props are domain-agnostic
- [ ] Text props accept pre-localized strings
- [ ] Display strings are pre-formatted
- [ ] Linkable components use `href`
- [ ] Image props use `imageUrl`
- [ ] Component validates required props
- [ ] Prop types are exported

---

## Examples

### EventCard

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
}
```

### VenueCard

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
}
```

### ArticleItem

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
  href: string; // Required - articles are always linkable
}
```

### TrendingItem

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
```

---

## Summary

These guidelines ensure:

- ✅ **Consistency**: Same concepts use same prop names
- ✅ **Clarity**: Prop names are descriptive and clear
- ✅ **Type Safety**: All props are properly typed
- ✅ **Documentation**: All props have JSDoc comments
- ✅ **Domain-Agnostic**: Props don't contain domain-specific terms
- ✅ **Pre-Localized**: Text props accept pre-localized strings
- ✅ **Pre-Formatted**: Display strings are pre-formatted

---

## Related Documentation

- [Domain Decoupling Report](./domain-decoupling-report.md) - Domain model decoupling
- [Route Decoupling Report](./route-decoupling.md) - Route decoupling
- [I18n Removal Report](./i18n-removal.md) - I18n removal
- [Public API Documentation](./public-api.md) - Complete API reference

---

**Last Updated:** 2025-11-25  
**Task:** D5 - Props Redesign  
**Status:** ✅ Active
