# Grid Component Documentation

**Component:** `Grid`  
**Location:** `@tenerife.music/ui`  
**Category:** Layout Components

---

## Overview

The `Grid` component provides a fully token-compliant CSS Grid layout system that replaces manual Tailwind grid usage. It supports responsive columns, token-based gaps, alignment options, and seamless className merging.

## Features

- ✅ **Token-based gaps** - All spacing uses design tokens (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)
- ✅ **Responsive columns** - Support for `md`, `lg`, and `xl` breakpoints
- ✅ **Alignment options** - Control both vertical (`align`) and horizontal (`justify`) alignment
- ✅ **CSS Grid** - Built on native CSS Grid for maximum flexibility
- ✅ **Type-safe** - Full TypeScript support with proper types
- ✅ **CVA integration** - Uses class-variance-authority for variant management

---

## Installation

The Grid component is included in the main package:

```tsx
import { Grid } from "@tenerife.music/ui";
```

---

## Basic Usage

### Simple Grid

```tsx
import { Grid } from "@tenerife.music/ui";

function MyComponent() {
  return (
    <Grid cols={3} gap={4}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </Grid>
  );
}
```

### Responsive Grid

```tsx
<Grid cols={1} md={2} lg={3} xl={4} gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</Grid>
```

This creates a grid that:

- Shows **1 column** on mobile (< 768px)
- Shows **2 columns** on tablet (≥ 768px)
- Shows **3 columns** on desktop (≥ 1024px)
- Shows **4 columns** on large screens (≥ 1280px)

---

## Props

### GridProps

| Prop        | Type                                                                 | Default     | Description                                            |
| ----------- | -------------------------------------------------------------------- | ----------- | ------------------------------------------------------ |
| `cols`      | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 12 \| "none"`                         | `1`         | Number of columns (base breakpoint)                    |
| `md`        | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 12 \| "none"`                         | -           | Number of columns for medium breakpoint (768px+)       |
| `lg`        | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 12 \| "none"`                         | -           | Number of columns for large breakpoint (1024px+)       |
| `xl`        | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 12 \| "none"`                         | -           | Number of columns for extra large breakpoint (1280px+) |
| `gap`       | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 8 \| 10 \| 12 \| 16 \| 20 \| 24` | `0`         | Gap between grid items (uses token spacing)            |
| `align`     | `"start" \| "end" \| "center" \| "baseline" \| "stretch"`            | `"stretch"` | Vertical alignment of grid items                       |
| `justify`   | `"start" \| "end" \| "center" \| "between" \| "around" \| "evenly"`  | `"start"`   | Horizontal alignment of grid items                     |
| `rows`      | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| "none"`                               | `"none"`    | Number of rows                                         |
| `flow`      | `"row" \| "col" \| "dense" \| "row-dense" \| "col-dense"`            | `"row"`     | Grid flow direction                                    |
| `className` | `string`                                                             | -           | Additional CSS classes to merge                        |
| `...rest`   | `HTMLDivElement`                                                     | -           | All standard div props                                 |

---

## Gap Token Mapping

The `gap` prop uses token-based spacing values:

| Gap Value | Token | CSS Value       | Description     |
| --------- | ----- | --------------- | --------------- |
| `0`       | -     | `0`             | No gap          |
| `1`       | `xs`  | `0.25rem` (4px) | Extra small gap |
| `2`       | `sm`  | `0.5rem` (8px)  | Small gap       |
| `3`       | `sm`  | `0.5rem` (8px)  | Small gap       |
| `4`       | `md`  | `1rem` (16px)   | Medium gap      |
| `5`       | `md`  | `1rem` (16px)   | Medium gap      |
| `6`       | `lg`  | `1.5rem` (24px) | Large gap       |
| `8`       | `xl`  | `2rem` (32px)   | Extra large gap |
| `10`      | `2xl` | `2.5rem` (40px) | 2x large gap    |
| `12`      | `2xl` | `2.5rem` (40px) | 2x large gap    |
| `16`      | `3xl` | `3rem` (48px)   | 3x large gap    |
| `20`      | `4xl` | `4rem` (64px)   | 4x large gap    |
| `24`      | `5xl` | `5rem` (80px)   | 5x large gap    |

**Important:** Always use the numeric gap values (0-24) rather than raw Tailwind classes. This ensures consistency with the design token system.

---

## Examples

### With Event Cards

```tsx
import { Grid, EventCard } from "@tenerife.music/ui";

function EventsGrid() {
  return (
    <Grid cols={1} md={2} lg={3} gap={6}>
      <EventCard
        event={event1}
        featured={false}
        showImage={true}
        getTicketsLabel="Get Tickets"
        trendingBadgeText="Trending"
      />
      <EventCard
        event={event2}
        featured={true}
        showImage={true}
        getTicketsLabel="Get Tickets"
        trendingBadgeText="Trending"
      />
      <EventCard
        event={event3}
        featured={false}
        showImage={true}
        getTicketsLabel="Get Tickets"
        trendingBadgeText="Trending"
      />
    </Grid>
  );
}
```

### With Venue Cards

```tsx
import { Grid, VenueCard } from "@tenerife.music/ui";

function VenuesGrid() {
  return (
    <Grid cols={1} md={2} lg={3} gap={6}>
      <VenueCard
        venue={venue1}
        featured={false}
        showImage={true}
        eventsLabel="Events"
        popularBadgeText="Popular"
        capacityLabel="Capacity"
      />
      <VenueCard
        venue={venue2}
        featured={true}
        showImage={true}
        eventsLabel="Events"
        popularBadgeText="Popular"
        capacityLabel="Capacity"
      />
    </Grid>
  );
}
```

### Alignment Examples

```tsx
// Vertical alignment
<Grid cols={3} gap={4} align="center">
  <div>Item 1</div>
  <div className="h-32">Tall Item</div>
  <div>Item 3</div>
</Grid>

// Horizontal alignment
<Grid cols={3} gap={4} justify="between">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>
```

### Custom Styling

```tsx
<Grid cols={2} gap={4} className="rounded-lg bg-muted p-lg">
  <div>Item 1</div>
  <div>Item 2</div>
</Grid>
```

---

## Replacing Manual Tailwind Grids

### Before (Manual Tailwind)

```tsx
// ❌ Don't do this
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

### After (Using Grid Component)

```tsx
// ✅ Do this instead
<Grid cols={1} md={2} lg={3} gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</Grid>
```

**Benefits:**

- ✅ Token-compliant gaps (ensures consistent spacing)
- ✅ Type-safe props (TypeScript catches errors)
- ✅ Consistent API across the codebase
- ✅ Easier to maintain and update

---

## Breakpoints

The responsive props use Tailwind's default breakpoints:

| Breakpoint | Min Width | Usage            |
| ---------- | --------- | ---------------- |
| Base       | `0px`     | Mobile (default) |
| `md`       | `768px`   | Tablet           |
| `lg`       | `1024px`  | Desktop          |
| `xl`       | `1280px`  | Large screens    |

---

## Accessibility

The Grid component renders as a standard `<div>` with `display: grid`. Ensure:

- Grid items have proper semantic HTML
- Content order makes sense when read by screen readers
- Focus management is handled for interactive grid items

---

## TypeScript

Full TypeScript support is included:

```tsx
import type { GridProps } from "@tenerife.music/ui";

const gridProps: GridProps = {
  cols: 3,
  md: 4,
  gap: 4,
  align: "center",
};
```

---

## Related Components

- [`Flex`](./FLEX.md) - Flexbox layout component
- [`Stack`](./STACK.md) - Vertical stack layout component
- [`Container`](./CONTAINER.md) - Container wrapper component
- [`Section`](./SECTION.md) - Section wrapper component

---

## Migration Guide

### From Manual Tailwind Grids

1. **Replace div with Grid component:**

   ```tsx
   // Before
   <div className="grid grid-cols-3 gap-4">

   // After
   <Grid cols={3} gap={4}>
   ```

2. **Convert responsive classes:**

   ```tsx
   // Before
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

   // After
   <Grid cols={1} md={2} lg={3}>
   ```

3. **Convert gap values:**

   ```tsx
   // Before (using arbitrary values)
   <div className="grid gap-[1rem]">

   // After (using token values)
   <Grid gap={4}> // gap={4} = 1rem (md token)
   ```

---

## Best Practices

1. **Always use token-based gaps** - Never use arbitrary gap values
2. **Use responsive props** - Prefer `md`, `lg`, `xl` props over manual responsive classes
3. **Combine with other layout components** - Use Grid with Container, Section, etc.
4. **Test responsive behavior** - Verify grid works at all breakpoints
5. **Use semantic HTML** - Ensure grid items use appropriate HTML elements

---

## Troubleshooting

### Grid not showing correctly

- Check that Tailwind CSS is properly configured
- Verify that the Grid component is imported correctly
- Ensure responsive breakpoints are working (check browser dev tools)

### Gaps not applying

- Make sure you're using numeric gap values (0-24), not Tailwind classes
- Verify that spacing tokens are configured in your Tailwind config

### Responsive columns not working

- Check that Tailwind breakpoints are configured correctly
- Verify that you're using `md`, `lg`, `xl` props, not className
- Test in browser dev tools at different viewport sizes

---

**Last Updated:** 2025-01-29  
**Component Version:** 1.0.0
