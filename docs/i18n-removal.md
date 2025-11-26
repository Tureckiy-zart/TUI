# I18n Removal Documentation

## Overview

This document describes the i18n (internationalization) removal refactoring performed on the Tenerife UI library to remove multilingual object patterns and make components language-agnostic.

**Date:** 2025-11-25  
**Task:** D4 - I18n Removal  
**Status:** ✅ Completed

---

## Problem: Hardcoded Language Fallbacks

Previously, UI components contained hardcoded multilingual object patterns:

- `name.en || name.es || name.ru` fallback logic
- `description.en || description.es` fallback logic
- `{ en?: string; es?: string; ru?: string }` type patterns

This approach had several problems:

1. **Tight Coupling**: Components were tightly coupled to Tenerife's multilingual structure
2. **Limited Flexibility**: Components assumed specific language codes (en, es, ru)
3. **Hardcoded Fallbacks**: Language fallback order was hardcoded in components
4. **Framework Lock-in**: Components couldn't work with different i18n libraries
5. **Maintenance Burden**: Adding new languages required component code changes

---

## Solution: Pre-Localized Strings

All text props now accept simple strings that consumers provide after localization:

### Components Updated

1. **EventCard** - Uses simple string props: `title`, `description`, `venueName`
2. **VenueCard** - Uses simple string props: `name`, `description`
3. **All other components** - Already use simple strings

### Benefits

- ✅ **Language Agnostic**: Components don't know about languages
- ✅ **Framework Agnostic**: Works with any i18n library (react-intl, next-intl, i18next, etc.)
- ✅ **Consumer Control**: Consumers decide localization logic and fallback order
- ✅ **Better Separation**: UI library doesn't know about i18n implementation
- ✅ **Flexible**: Supports any number of languages without code changes

---

## Migration Guide

### EventCard

**Before:**

```tsx
// Component handled multilingual fallback internally
<EventCard
  event={{
    name: { en: "Summer Concert", es: "Concierto de Verano", ru: "Летний концерт" },
    description: { en: "A great event", es: "Un gran evento" },
    venue_id: { name: { en: "Central Park", es: "Parque Central" } },
  }}
/>
// Component logic: name.en || name.es || name.ru
```

**After:**

```tsx
// Consumer localizes before passing to component
const locale = useLocale(); // 'en', 'es', 'ru', etc.
<EventCard
  title={event.name[locale] || event.name.en || event.name.es}
  description={event.description[locale] || event.description.en}
  venueName={event.venue.name[locale] || event.venue.name.en}
  // ... other props
/>;
```

### VenueCard

**Before:**

```tsx
// Component handled multilingual fallback internally
<VenueCard
  venue={{
    name: { en: "Madison Square Garden", es: "Madison Square Garden", ru: "Мэдисон-сквер-гарден" },
    description: { en: "World-famous arena", es: "Arena mundialmente famosa" },
  }}
/>
// Component logic: name.en || name.es || name.ru
```

**After:**

```tsx
// Consumer localizes before passing to component
const locale = useLocale();
<VenueCard
  name={venue.name[locale] || venue.name.en || venue.name.es}
  description={venue.description[locale] || venue.description.en}
  // ... other props
/>;
```

---

## Consumer-Side Localization

### Pattern 1: Direct Access

```tsx
import { EventCard } from "@tenerife.music/ui";
import { useLocale } from "@/hooks/useLocale";

function EventList({ events }) {
  const locale = useLocale(); // 'en', 'es', 'ru'

  return (
    <div>
      {events.map((event) => (
        <EventCard
          key={event.id}
          title={event.name[locale] || event.name.en}
          description={event.description[locale] || event.description.en}
          venueName={event.venue.name[locale] || event.venue.name.en}
          // ... other props
        />
      ))}
    </div>
  );
}
```

### Pattern 2: Helper Function

```tsx
import { EventCard } from "@tenerife.music/ui";

// Helper function for localization
function localize(multilingual: { en?: string; es?: string; ru?: string }, locale: string): string {
  return multilingual[locale] || multilingual.en || multilingual.es || multilingual.ru || "";
}

function EventList({ events, locale }) {
  return (
    <div>
      {events.map((event) => (
        <EventCard
          key={event.id}
          title={localize(event.name, locale)}
          description={localize(event.description, locale)}
          venueName={localize(event.venue.name, locale)}
          // ... other props
        />
      ))}
    </div>
  );
}
```

### Pattern 3: Adapter Function

```tsx
import { EventCard, EventCardProps } from "@tenerife.music/ui";
import { Event } from "@/types/event";

// Adapter function maps domain model to UI props
function eventToCardProps(event: Event, locale: string): EventCardProps {
  const localize = (obj: { en?: string; es?: string; ru?: string }) =>
    obj[locale] || obj.en || obj.es || obj.ru || "";

  return {
    title: localize(event.name),
    description: localize(event.description),
    venueName: localize(event.venue.name),
    date: formatDate(event.startDate, locale),
    price: formatPrice(event.priceRange, locale),
    imageUrl: event.imageUrl,
    href: `/events/${event.slug}`,
    ticketUrl: event.ticketUrl,
    featured: event.featured,
    getTicketsLabel: t("getTickets", locale), // From i18n library
    featuredBadgeText: event.featured ? t("featured", locale) : undefined,
  };
}

// Usage
function EventList({ events, locale }) {
  return (
    <div>
      {events.map((event) => (
        <EventCard {...eventToCardProps(event, locale)} />
      ))}
    </div>
  );
}
```

---

## Integration Examples

### React Intl (react-intl)

```tsx
import { EventCard } from "@tenerife.music/ui";
import { useIntl } from "react-intl";

function EventList({ events }) {
  const intl = useIntl();
  const locale = intl.locale; // 'en', 'es', 'ru'

  return (
    <div>
      {events.map((event) => (
        <EventCard
          key={event.id}
          title={event.name[locale] || event.name.en}
          description={event.description[locale] || event.description.en}
          venueName={event.venue.name[locale] || event.venue.name.en}
          getTicketsLabel={intl.formatMessage({ id: "getTickets" })}
          featuredBadgeText={event.featured ? intl.formatMessage({ id: "featured" }) : undefined}
          // ... other props
        />
      ))}
    </div>
  );
}
```

### Next.js i18n (next-intl)

```tsx
import { EventCard } from "@tenerife.music/ui";
import { useTranslations, useLocale } from "next-intl";

function EventList({ events }) {
  const t = useTranslations();
  const locale = useLocale(); // 'en', 'es', 'ru'

  return (
    <div>
      {events.map((event) => (
        <EventCard
          key={event.id}
          title={event.name[locale] || event.name.en}
          description={event.description[locale] || event.description.en}
          venueName={event.venue.name[locale] || event.venue.name.en}
          getTicketsLabel={t("getTickets")}
          featuredBadgeText={event.featured ? t("featured") : undefined}
          // ... other props
        />
      ))}
    </div>
  );
}
```

### i18next

```tsx
import { EventCard } from "@tenerife.music/ui";
import { useTranslation } from "react-i18next";

function EventList({ events }) {
  const { t, i18n } = useTranslation();
  const locale = i18n.language; // 'en', 'es', 'ru'

  return (
    <div>
      {events.map((event) => (
        <EventCard
          key={event.id}
          title={event.name[locale] || event.name.en}
          description={event.description[locale] || event.description.en}
          venueName={event.venue.name[locale] || event.venue.name.en}
          getTicketsLabel={t("getTickets")}
          featuredBadgeText={event.featured ? t("featured") : undefined}
          // ... other props
        />
      ))}
    </div>
  );
}
```

### Custom i18n Solution

```tsx
import { EventCard } from "@tenerife.music/ui";
import { useI18n } from "@/lib/i18n"; // Custom i18n hook

function EventList({ events }) {
  const { locale, t } = useI18n();

  return (
    <div>
      {events.map((event) => (
        <EventCard
          key={event.id}
          title={getLocalized(event.name, locale)}
          description={getLocalized(event.description, locale)}
          venueName={getLocalized(event.venue.name, locale)}
          getTicketsLabel={t("getTickets")}
          featuredBadgeText={event.featured ? t("featured") : undefined}
          // ... other props
        />
      ))}
    </div>
  );
}

function getLocalized(obj: { [key: string]: string }, locale: string): string {
  return obj[locale] || obj.en || obj.es || obj.ru || "";
}
```

---

## Best Practices

### 1. Centralize Localization Logic

Keep localization logic in one place:

```tsx
// ✅ Good: Centralized helper
// utils/localization.ts
export function localize(
  multilingual: { [key: string]: string },
  locale: string,
  fallbackOrder: string[] = ['en', 'es', 'ru']
): string {
  if (multilingual[locale]) return multilingual[locale];
  for (const fallback of fallbackOrder) {
    if (multilingual[fallback]) return multilingual[fallback];
  }
  return '';
}

// ❌ Bad: Scattered localization
<EventCard title={event.name[locale] || event.name.en || event.name.es} />
<VenueCard name={venue.name[locale] || venue.name.en || venue.name.es} />
```

### 2. Use Adapter Functions

Create adapter functions to map domain models to UI props:

```tsx
// ✅ Good: Adapter function
function eventToCardProps(event: Event, locale: string): EventCardProps {
  return {
    title: localize(event.name, locale),
    description: localize(event.description, locale),
    venueName: localize(event.venue.name, locale),
    // ... other props
  };
}

// ❌ Bad: Direct mapping in component
<EventCard
  title={event.name[locale] || event.name.en}
  description={event.description[locale] || event.description.en}
/>;
```

### 3. Handle Missing Translations Gracefully

Always provide fallback logic:

```tsx
// ✅ Good: Fallback chain
const title = event.name[locale] || event.name.en || event.name.es || "Untitled";

// ❌ Bad: No fallback
const title = event.name[locale]; // May be undefined
```

### 4. Use i18n Library for UI Labels

Use i18n library for component labels (buttons, badges, etc.):

```tsx
// ✅ Good: Use i18n library
<EventCard
  title={localize(event.name, locale)}
  getTicketsLabel={t('getTickets')} // From i18n library
  featuredBadgeText={event.featured ? t('featured') : undefined}
/>

// ❌ Bad: Hardcoded labels
<EventCard
  title={localize(event.name, locale)}
  getTicketsLabel="Get Tickets" // Hardcoded
/>
```

### 5. Type Safety

Create types for multilingual objects:

```tsx
// ✅ Good: Typed multilingual object
type MultilingualString = {
  en?: string;
  es?: string;
  ru?: string;
  [key: string]: string | undefined;
};

interface Event {
  name: MultilingualString;
  description: MultilingualString;
}

// Usage
function localize(obj: MultilingualString, locale: string): string {
  return obj[locale] || obj.en || obj.es || obj.ru || "";
}
```

---

## Component API Reference

### EventCard

```tsx
interface EventCardProps {
  /** Event title (pre-localized string) */
  title: string;
  /** Event description (pre-localized string, optional) */
  description?: string;
  /** Venue name (pre-localized string, optional) */
  venueName?: string;
  // ... other props
}
```

**Behavior:**

- All text props accept simple strings
- Component doesn't handle localization internally
- Consumer must provide pre-localized strings

### VenueCard

```tsx
interface VenueCardProps {
  /** Venue name (pre-localized string, required) */
  name: string;
  /** Venue description (pre-localized string, optional) */
  description?: string;
  // ... other props
}
```

**Behavior:**

- All text props accept simple strings
- Component doesn't handle localization internally
- Consumer must provide pre-localized strings

---

## Verification

### No Multilingual Patterns

All multilingual patterns have been removed from component files:

- ✅ No `.en || .es || .ru` fallback logic in components
- ✅ No `{ en?: string; es?: string; ru?: string }` type patterns in interfaces
- ✅ All text props are simple strings

### Component Behavior

All components:

- ✅ Accept simple string props
- ✅ Don't handle localization internally
- ✅ Are language-agnostic
- ✅ Work with any i18n library

---

## Breaking Changes

### EventCard

- ❌ **Removed**: Multilingual fallback logic (`name.en || name.es || name.ru`)
- ❌ **Removed**: `EventCardEvent` interface with multilingual objects
- ✅ **Added**: Simple string props (`title`, `description`, `venueName`)
- ⚠️ **Migration**: Consumers must localize data before passing to component

### VenueCard

- ❌ **Removed**: Multilingual fallback logic (`name.en || name.es || name.ru`)
- ❌ **Removed**: `VenueCardProps.venue` with multilingual objects
- ✅ **Added**: Simple string props (`name`, `description`)
- ⚠️ **Migration**: Consumers must localize data before passing to component

---

## Summary

I18n removal successfully removes all multilingual object patterns from UI components, making them:

- ✅ **Language Agnostic**: Components don't know about languages
- ✅ **Framework Agnostic**: Work with any i18n library
- ✅ **Flexible**: Support any number of languages without code changes
- ✅ **Maintainable**: Localization logic centralized in consumer code

Consumers now have full control over localization logic, enabling better separation of concerns and improved component reusability.

---

## Related Documentation

- [Domain Decoupling Report](./domain-decoupling-report.md) - Domain model decoupling
- [Route Decoupling Report](./route-decoupling.md) - Route decoupling
- [Public API Documentation](./public-api.md) - Complete API reference

---

**Last Updated:** 2025-11-25  
**Task:** D4 - I18n Removal  
**Status:** ✅ Completed
