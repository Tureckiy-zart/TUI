# UI Integration Guide

**Purpose:** Guide for integrating Tenerife UI components into your project and replacing manual Tailwind usage.

---

## Grid Component Integration

### Replacing Manual Tailwind Grids

The `Grid` component provides a fully token-compliant replacement for manual Tailwind grid usage. This ensures consistent spacing, type safety, and easier maintenance.

#### Migration Steps

1. **Identify manual grid usage:**
   ```tsx
   // Look for patterns like this:
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
   ```

2. **Replace with Grid component:**
   ```tsx
   import { Grid } from "@tenerife.music/ui";
   
   <Grid cols={1} md={2} lg={3} gap={4}>
   ```

3. **Update gap values to use tokens:**
   ```tsx
   // Before: arbitrary values
   <div className="grid gap-[1rem]">
   
   // After: token values
   <Grid gap={4}> // gap={4} = md token (1rem)
   ```

### Benefits of Using Grid Component

✅ **Token Compliance** - All gaps use design tokens (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)  
✅ **Type Safety** - TypeScript catches errors at compile time  
✅ **Consistency** - Same API across the entire codebase  
✅ **Maintainability** - Easier to update spacing system-wide  
✅ **Responsive** - Built-in support for md, lg, xl breakpoints  

### Common Patterns

#### Event Cards Grid

```tsx
// ✅ Recommended: Use Grid component
import { Grid, EventCard } from "@tenerife.music/ui";

<Grid cols={1} md={2} lg={3} gap={6}>
  {events.map((event) => (
    <EventCard
      key={event.id}
      event={event}
      featured={event.featured}
      showImage={true}
      getTicketsLabel="Get Tickets"
      trendingBadgeText="Trending"
    />
  ))}
</Grid>
```

#### Venue Cards Grid

```tsx
// ✅ Recommended: Use Grid component
import { Grid, VenueCard } from "@tenerife.music/ui";

<Grid cols={1} md={2} lg={3} gap={6}>
  {venues.map((venue) => (
    <VenueCard
      key={venue.id}
      venue={venue}
      featured={venue.popular}
      showImage={true}
      eventsLabel="Events"
      popularBadgeText="Popular"
      capacityLabel="Capacity"
    />
  ))}
</Grid>
```

#### Responsive Layout

```tsx
// ✅ Recommended: Use Grid with responsive props
<Grid cols={1} md={2} lg={4} xl={6} gap={4}>
  {items.map((item) => (
    <div key={item.id}>{item.content}</div>
  ))}
</Grid>
```

### Gap Token Reference

When migrating, use these gap values:

| Tailwind Class | Grid Gap Value | Token | CSS Value |
|----------------|----------------|-------|-----------|
| `gap-0` | `gap={0}` | - | `0` |
| `gap-xs` | `gap={1}` | `xs` | `0.25rem` (4px) |
| `gap-sm` | `gap={2}` | `sm` | `0.5rem` (8px) |
| `gap-md` | `gap={4}` | `md` | `1rem` (16px) |
| `gap-lg` | `gap={6}` | `lg` | `1.5rem` (24px) |
| `gap-xl` | `gap={8}` | `xl` | `2rem` (32px) |
| `gap-2xl` | `gap={10}` or `gap={12}` | `2xl` | `2.5rem` (40px) |
| `gap-3xl` | `gap={16}` | `3xl` | `3rem` (48px) |
| `gap-4xl` | `gap={20}` | `4xl` | `4rem` (64px) |
| `gap-5xl` | `gap={24}` | `5xl` | `5rem` (80px) |

### Before & After Examples

#### Example 1: Simple Grid

**Before:**
```tsx
<div className="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**After:**
```tsx
<Grid cols={3} gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

#### Example 2: Responsive Grid

**Before:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**After:**
```tsx
<Grid cols={1} md={2} lg={3} gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

#### Example 3: With Alignment

**Before:**
```tsx
<div className="grid grid-cols-3 gap-4 items-center justify-between">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

**After:**
```tsx
<Grid cols={3} gap={4} align="center" justify="between">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

### Integration Checklist

When integrating Grid component:

- [ ] Replace all manual `grid` classes with `<Grid>` component
- [ ] Convert responsive classes (`md:grid-cols-*`) to props (`md={*}`)
- [ ] Update gap values to use token numbers (0-24)
- [ ] Test responsive behavior at all breakpoints
- [ ] Verify spacing matches design tokens
- [ ] Update TypeScript types if needed
- [ ] Run tests to ensure no regressions

### Additional Resources

- [Grid Component Documentation](./GRID.md) - Complete Grid component reference
- [Tokens Guide](./TOKENS_GUIDE.md) - Design token system documentation
- [Usage Guide](./USAGE.md) - General component usage guide

---

## Other Component Integrations

### Layout Components

All layout components (`Grid`, `Flex`, `Stack`, `Container`, `Section`) follow the same token-based approach:

```tsx
import { Grid, Flex, Stack, Container, Section } from "@tenerife.music/ui";

// Use Grid for CSS Grid layouts
<Grid cols={3} gap={4}>...</Grid>

// Use Flex for Flexbox layouts
<Flex direction="row" gap={4} justify="between">...</Flex>

// Use Stack for vertical layouts
<Stack spacing={4}>...</Stack>

// Use Container for max-width containers
<Container size="7xl">...</Container>

// Use Section for page sections
<Section padding="lg">...</Section>
```

### Best Practices

1. **Always use components over manual classes** - Ensures token compliance
2. **Use responsive props** - Prefer component props over responsive classes
3. **Test at all breakpoints** - Verify responsive behavior
4. **Follow token system** - Use numeric values that map to tokens
5. **Type safety** - Leverage TypeScript for compile-time checks

---

**Last Updated:** 2025-01-29  
**Version:** 1.0.0

