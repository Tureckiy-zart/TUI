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
</Grid>;
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
</Grid>;
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

| Tailwind Class | Grid Gap Value           | Token | CSS Value       |
| -------------- | ------------------------ | ----- | --------------- |
| `gap-0`        | `gap={0}`                | -     | `0`             |
| `gap-xs`       | `gap={1}`                | `xs`  | `0.25rem` (4px) |
| `gap-sm`       | `gap={2}`                | `sm`  | `0.5rem` (8px)  |
| `gap-md`       | `gap={4}`                | `md`  | `1rem` (16px)   |
| `gap-lg`       | `gap={6}`                | `lg`  | `1.5rem` (24px) |
| `gap-xl`       | `gap={8}`                | `xl`  | `2rem` (32px)   |
| `gap-2xl`      | `gap={10}` or `gap={12}` | `2xl` | `2.5rem` (40px) |
| `gap-3xl`      | `gap={16}`               | `3xl` | `3rem` (48px)   |
| `gap-4xl`      | `gap={20}`               | `4xl` | `4rem` (64px)   |
| `gap-5xl`      | `gap={24}`               | `5xl` | `5rem` (80px)   |

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
<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
<div className="grid grid-cols-3 items-center justify-between gap-4">
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

## Allowed Gradients

Tenerife UI uses gradients sparingly to maintain brand consistency while supporting neon/nightlife aesthetic effects. All gradient usage must be whitelisted and documented.

### When Using Gradients is Acceptable

✅ **Allowed Use Cases:**

- **Hero sections** - Background gradients for landing pages and hero components
- **Featured badges** - Gradient backgrounds for trending/popular indicators
- **Image overlays** - Subtle gradients for hover effects and overlays
- **Premium content** - Gradients for featured/paid content indicators
- **Brand identity** - Gradients in brand-specific components (ModeHero)

❌ **Not Allowed:**

- Regular buttons (use solid colors from tokens)
- Form inputs and controls
- Navigation elements
- Standard cards (unless featured)
- Utility components
- Arbitrary color combinations

### Allowed Gradient Patterns

#### 1. Brand Gradients

```tsx
// Primary brand gradient (ModeHero)
className = "bg-gradient-to-r from-primary to-accent";

// Reversed brand gradient (badges)
className = "bg-gradient-to-r from-accent to-primary";

// Specific shade gradients (EventCard badges)
className = "bg-gradient-to-r from-accent-500 to-primary-600";
```

#### 2. Surface Gradients

```tsx
// Surface elevation gradients (placeholders)
className = "bg-gradient-to-br from-surface-elevated1 to-surface-elevated2";

// Muted gradients (VenueCard placeholders)
className = "bg-gradient-to-br from-muted to-muted/50";
```

#### 3. Overlay Gradients

```tsx
// Image overlay gradients (hover effects)
className = "bg-gradient-to-t from-black/60 via-transparent to-transparent";
```

#### 4. Text Gradients

```tsx
// Text gradient effect (premium content)
className = "bg-gradient-to-r from-accent-500 to-primary-600 bg-clip-text text-transparent";
```

#### 5. Hero Background Overlays

```tsx
// Subtle hero backgrounds (HeroSection)
className = "bg-gradient-to-br from-primary/20 to-accent/20";

// Multi-color hero backgrounds
className = "bg-gradient-to-br from-primary/30 via-accent/30 to-secondary/30";
```

### Gradient Rules

1. **Use token colors only** - Always use design tokens (`primary`, `accent`, `secondary`, `surface-*`, `muted`)
2. **No arbitrary colors** - Never use hex colors or arbitrary Tailwind colors
3. **Document exceptions** - New gradients must be added to `docs/ui/gradient_exceptions.md`
4. **Maintain contrast** - Ensure text remains readable over gradients (WCAG AA)
5. **Limit opacity** - Use opacity modifiers sparingly (`/20`, `/30`, `/50`, `/60`)

### Checking Gradient Compliance

Run the UI consistency checker to validate gradient usage:

```bash
npm run ui:check
```

This will:

- ✅ Validate all gradient classes against the whitelist
- ✅ Flag unauthorized gradient usage
- ✅ Report violations with file locations
- ✅ Suggest adding to exceptions list if needed

### Adding New Gradients

If you need to add a new gradient:

1. **Get approval** - New gradients must align with brand guidelines
2. **Update exceptions** - Add to `docs/ui/gradient_exceptions.md`
3. **Update checker** - Add pattern to `scripts/check-ui-consistency.ts`
4. **Document rationale** - Explain why the gradient is needed
5. **Test accessibility** - Verify contrast and readability
6. **Run checker** - Verify no violations

### Component-Specific Rules

#### ModeHero

- **Allowed:** `bg-gradient-to-r from-primary to-accent` only
- **Purpose:** Brand identity hero background

#### EventCard

- **Allowed:**
  - Badge: `bg-gradient-to-r from-accent-500 to-primary-600`
  - Placeholder: `bg-gradient-to-br from-surface-elevated1 to-surface-elevated2`
  - Overlay: `bg-gradient-to-t from-black/60 via-transparent to-transparent`
  - Text: `bg-gradient-to-r from-accent-500 to-primary-600 bg-clip-text text-transparent`

#### VenueCard

- **Allowed:**
  - Badge: `bg-gradient-to-r from-accent to-primary`
  - Placeholder: `bg-gradient-to-br from-muted to-muted/50`
  - Overlay: `bg-gradient-to-t from-black/60 via-transparent to-transparent`

#### HeroSection

- **Allowed:** Background overlays with opacity (`/20`, `/30`)
- **Purpose:** Subtle hero backgrounds

### Related Documentation

- [Gradient Exceptions List](./ui/gradient_exceptions.md) - Complete whitelist of allowed gradients
- [Tokens Guide](./TOKENS_GUIDE.md) - Design token system
- [Theme Guide](./THEME_GUIDE.md) - Theme customization

---

**Last Updated:** 2025-11-23  
**Version:** 1.0.0
