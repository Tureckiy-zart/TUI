# Closed System v2 — Phase I Violation Mapping

**Project:** @tenerife.music/ui  
**Task ID:** TUI_CSV2_PHASE_I_PRODUCT_MIGRATION_020  
**Date Created:** 2026-01-27  
**Status:** ✅ **COMPLETE**

---

## Purpose

This document maps each violation found in Phase I audit to its canonical replacement using sanctioned Foundation/Composition APIs. Each mapping includes the legacy pattern, the sanctioned replacement, and references to authority documents.

---

## Mapping Categories

### V1: className on Foundation Components (CRITICAL)

#### EventCard.tsx — Line 147

**Legacy Pattern:**
```tsx
<Icon
  name="info"
  size="xl"
  color="muted"
  className={ICON_TOKENS.sizes["4xl"]}  // ❌ CRITICAL
  aria-hidden="true"
/>
```

**Sanctioned Replacement:**
```tsx
<Icon
  name="info"
  size="4xl"  // ✅ Use size prop directly
  color="muted"
  aria-hidden="true"
/>
```

**Reference:** [FOUNDATION_LOCK.md](../../architecture/FOUNDATION_LOCK.md) — Foundation components exclude `className` from public API.

**Migration Notes:** Remove `className` prop and use `size="4xl"` prop instead. Icon component supports size tokens directly.

---

### V3: Utility-Based Styling (MAJOR)

#### EventCard.tsx — Line 142

**Legacy Pattern:**
```tsx
<div className="flex h-full w-full items-center justify-center">
  <Icon ... />
</div>
```

**Sanctioned Replacement:**
```tsx
<Box display="flex" alignItems="center" justifyContent="center" h="full" w="full">
  <Icon ... />
</Box>
```

**Alternative (if Box doesn't support these props):**
```tsx
<Stack direction="horizontal" align="center" justify="center" className="h-full w-full">
  <Icon ... />
</Stack>
```

**Reference:** [CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md) — Use Foundation layout components instead of utility-styled wrappers.

---

#### ArticlesSection.tsx — Line 46

**Legacy Pattern:**
```tsx
<article
  key={article.href || index}
  className="rounded-lg border p-lg transition-shadow hover:shadow-md"
>
```

**Sanctioned Replacement:**
```tsx
<Surface variant="raised" padding="lg" className="transition-shadow hover:shadow-md">
  {/* Use Surface for visual boundary container */}
</Surface>
```

**Reference:** [CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md) — Surface API provides visual boundary container.

**Migration Notes:** Replace `<article>` with `<Surface>` component. Surface provides padding, radius, and visual boundary. Keep transition classes if needed for hover effects (or move to Surface variant if supported).

---

### V4: Raw HTML Replacement (MAJOR)

#### Forms: LoginForm.tsx, RegisterForm.tsx

**Legacy Pattern:**
```tsx
<div className={cn("space-y-md", className)}>
  <Field>...</Field>
  <Field>...</Field>
  <Button>...</Button>
</div>
```

**Sanctioned Replacement:**
```tsx
<Stack spacing="md" className={className}>
  <Field>...</Field>
  <Field>...</Field>
  <Button>...</Button>
</Stack>
```

**Reference:** [LAYOUT_AUTHORITY.md](../../architecture/LAYOUT_AUTHORITY.md) — Stack component for vertical flow with token-based spacing.

**Migration Notes:** Replace utility-based spacing wrapper with Stack component. Stack provides `spacing` prop with token-based values.

---

#### HeroSection.tsx — Multiple violations

**Legacy Pattern 1 (Line 53-55):**
```tsx
<section
  className={cn("w-full transition-colors", backgroundClasses[background], className)}
  aria-label="Hero section"
>
```

**Sanctioned Replacement:**
```tsx
<Section
  spaceY="xl"
  className={cn("transition-colors", backgroundClasses[background], className)}
  aria-label="Hero section"
>
```

**Reference:** [CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md) — Section component for page-level block containers.

---

**Legacy Pattern 2 (Line 57-63):**
```tsx
<div
  className={cn(
    "container mx-auto px-lg py-xl",
    isSplit
      ? "grid grid-cols-1 gap-lg md:grid-cols-2 md:items-center lg:gap-xl"
      : "flex flex-col items-center justify-center text-center",
  )}
>
```

**Sanctioned Replacement:**
```tsx
<Container padding="lg" py="xl">
  {isSplit ? (
    <Grid
      cols={{ base: 1, md: 2 }}
      gap={{ base: "lg", lg: "xl" }}
      align="center"
      className="text-center"
    >
      {/* content */}
    </Grid>
  ) : (
    <Stack
      direction="vertical"
      align="center"
      justify="center"
      spacing="lg"
      className="text-center"
    >
      {/* content */}
    </Stack>
  )}
</Container>
```

**Reference:** 
- [LAYOUT_AUTHORITY.md](../../architecture/LAYOUT_AUTHORITY.md) — Container for width constraint and padding
- [CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md) — Grid API for responsive grid layouts

**Migration Notes:** 
- Replace `container mx-auto px-lg` with `<Container padding="lg">`
- Replace `grid grid-cols-1 gap-lg md:grid-cols-2` with `<Grid cols={{ base: 1, md: 2 }} gap="lg">`
- Replace `flex flex-col items-center justify-center` with `<Stack direction="vertical" align="center" justify="center">`

---

**Legacy Pattern 3 (Line 66):**
```tsx
<div className={cn("flex flex-col", isSplit ? "space-y-md" : "max-w-3xl space-y-lg")}>
```

**Sanctioned Replacement:**
```tsx
<Stack
  direction="vertical"
  spacing={isSplit ? "md" : "lg"}
  className={!isSplit ? "max-w-3xl" : undefined}
>
```

**Reference:** [LAYOUT_AUTHORITY.md](../../architecture/LAYOUT_AUTHORITY.md) — Stack component for vertical flow.

---

**Legacy Pattern 4 (Line 77-78):**
```tsx
<div
  className={cn("flex flex-wrap gap-md", isSplit ? "justify-start" : "justify-center")}
>
```

**Sanctioned Replacement:**
```tsx
<Row
  wrap
  spacing="md"
  justify={isSplit ? "start" : "center"}
>
```

**Reference:** [CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md) — Row component for horizontal flow with wrap support.

---

**Legacy Pattern 5 (Line 87-91):**
```tsx
<div
  className={cn(
    "flex items-center justify-center",
    isSplit ? "order-first md:order-last" : "mt-lg",
  )}
>
```

**Sanctioned Replacement:**
```tsx
<Box
  display="flex"
  alignItems="center"
  justifyContent="center"
  mt={!isSplit ? "lg" : undefined}
  className={isSplit ? "order-first md:order-last" : undefined}
>
```

**Alternative (if Box doesn't support order):**
```tsx
<Stack
  direction="horizontal"
  align="center"
  justify="center"
  mt={!isSplit ? "lg" : undefined}
  className={isSplit ? "order-first md:order-last" : undefined}
>
```

**Reference:** [LAYOUT_AUTHORITY.md](../../architecture/LAYOUT_AUTHORITY.md) — Stack/Box for flex layouts.

---

#### FeatureSection.tsx — Multiple violations

**Legacy Pattern 1 (Line 62):**
```tsx
<section className={cn("w-full py-xl", className)} aria-label="Features section">
```

**Sanctioned Replacement:**
```tsx
<Section spaceY="xl" className={className} aria-label="Features section">
```

**Reference:** [CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md) — Section component.

---

**Legacy Pattern 2 (Line 63):**
```tsx
<div className="container mx-auto px-lg">
```

**Sanctioned Replacement:**
```tsx
<Container padding="lg">
```

**Reference:** [LAYOUT_AUTHORITY.md](../../architecture/LAYOUT_AUTHORITY.md) — Container component.

---

**Legacy Pattern 3 (Line 75):**
```tsx
<div className={cn("grid gap-lg", gridCols[columns])}>
```

**Sanctioned Replacement:**
```tsx
<Grid
  cols={
    columns === 1
      ? { base: 1 }
      : columns === 2
        ? { base: 1, md: 2 }
        : columns === 3
          ? { base: 1, md: 2, lg: 3 }
          : { base: 1, md: 2, lg: 4 }
  }
  gap="lg"
>
```

**Reference:** [CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md) — Grid API for responsive grid layouts.

---

**Legacy Pattern 4 (Line 79):**
```tsx
<div className="space-y-md">
```

**Sanctioned Replacement:**
```tsx
<Stack spacing="md">
```

**Reference:** [LAYOUT_AUTHORITY.md](../../architecture/LAYOUT_AUTHORITY.md) — Stack component.

---

**Legacy Pattern 5 (Line 81):**
```tsx
<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[hsl(var(--tm-primary))]/10 text-[hsl(var(--tm-primary))]">
```

**Sanctioned Replacement:**
```tsx
<Box
  display="flex"
  alignItems="center"
  justifyContent="center"
  w="12"
  h="12"
  borderRadius="lg"
  bg="primary/10"
  color="primary"
>
```

**Alternative (if Box doesn't support all props):**
```tsx
<Stack
  direction="horizontal"
  align="center"
  justify="center"
  className="h-12 w-12 rounded-lg bg-[hsl(var(--tm-primary))]/10 text-[hsl(var(--tm-primary))]"
>
```

**Reference:** [LAYOUT_AUTHORITY.md](../../architecture/LAYOUT_AUTHORITY.md) — Box/Stack for flex layouts.

---

#### CTASection.tsx — Multiple violations

**Legacy Pattern 1 (Line 89-90):**
```tsx
<section
  className={cn("w-full bg-[hsl(var(--tm-muted))] py-xl transition-colors", className)}
  aria-label="Call to action section"
>
```

**Sanctioned Replacement:**
```tsx
<Section
  spaceY="xl"
  bg="muted"
  className={cn("transition-colors", className)}
  aria-label="Call to action section"
>
```

**Reference:** [CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md) — Section component.

---

**Legacy Pattern 2 (Line 93):**
```tsx
<div className="container mx-auto px-lg">
```

**Sanctioned Replacement:**
```tsx
<Container padding="lg">
```

**Reference:** [LAYOUT_AUTHORITY.md](../../architecture/LAYOUT_AUTHORITY.md) — Container component.

---

**Legacy Pattern 3 (Line 94-99):**
```tsx
<div
  className={cn(
    isCentered
      ? "mx-auto max-w-3xl text-center"
      : "grid grid-cols-1 gap-lg md:grid-cols-2 md:items-center",
  )}
>
```

**Sanctioned Replacement:**
```tsx
{isCentered ? (
  <Container maxWidth="3xl" className="text-center">
    {/* content */}
  </Container>
) : (
  <Grid cols={{ base: 1, md: 2 }} gap="lg" align="center">
    {/* content */}
  </Grid>
)}
```

**Reference:** 
- [LAYOUT_AUTHORITY.md](../../architecture/LAYOUT_AUTHORITY.md) — Container and Grid components
- [CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md) — Grid API

---

**Legacy Pattern 4 (Line 102):**
```tsx
<div className={cn("space-y-md", isCentered && "flex flex-col items-center")}>
```

**Sanctioned Replacement:**
```tsx
<Stack
  spacing="md"
  direction={isCentered ? "vertical" : "vertical"}
  align={isCentered ? "center" : undefined}
>
```

**Reference:** [LAYOUT_AUTHORITY.md](../../architecture/LAYOUT_AUTHORITY.md) — Stack component.

---

**Legacy Pattern 5 (Line 113-114):**
```tsx
<div
  className={cn(
    "flex flex-wrap gap-md",
    isCentered ? "justify-center" : "justify-start md:justify-end",
  )}
>
```

**Sanctioned Replacement:**
```tsx
<Row
  wrap
  spacing="md"
  justify={isCentered ? "center" : { base: "start", md: "end" }}
>
```

**Reference:** [CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md) — Row component with wrap support.

---

#### ArticlesSection.tsx — Multiple violations

**Legacy Pattern 1 (Line 44):**
```tsx
<div className={cn("space-y-lg", className)}>
```

**Sanctioned Replacement:**
```tsx
<Stack spacing="lg" className={className}>
```

**Reference:** [LAYOUT_AUTHORITY.md](../../architecture/LAYOUT_AUTHORITY.md) — Stack component.

---

**Legacy Pattern 2 (Line 51):**
```tsx
<div className="mb-md h-[var(--spacing-3xl)] w-full rounded-md bg-[hsl(var(--tm-muted))]" />
```

**Sanctioned Replacement:**
```tsx
<Box
  mb="md"
  h="3xl"
  w="full"
  borderRadius="md"
  bg="muted"
/>
```

**Reference:** [LAYOUT_AUTHORITY.md](../../architecture/LAYOUT_AUTHORITY.md) — Box component.

---

**Legacy Pattern 3 (Line 53):**
```tsx
<div className="space-y-sm">
```

**Sanctioned Replacement:**
```tsx
<Stack spacing="sm">
```

**Reference:** [LAYOUT_AUTHORITY.md](../../architecture/LAYOUT_AUTHORITY.md) — Stack component.

---

#### EventCard.tsx — Multiple violations

**Legacy Pattern (Multiple div/span elements):**
```tsx
<div className={eventCardBadgeVariants({ size })}>
  <span className={eventCardBadgeSurfaceVariants({ variant: "featured" })}>
    {featuredBadgeText}
  </span>
</div>
```

**Sanctioned Replacement:**
```tsx
<Box className={eventCardBadgeVariants({ size })}>
  <Text className={eventCardBadgeSurfaceVariants({ variant: "featured" })}>
    {featuredBadgeText}
  </Text>
</Box>
```

**Reference:** [LAYOUT_AUTHORITY.md](../../architecture/LAYOUT_AUTHORITY.md) — Box and Text components.

**Migration Notes:** Replace all raw HTML `div` and `span` elements with Box and Text components where appropriate. For layout containers, use Stack/Row/Grid/Container.

---

#### SectionBuilder.tsx — Multiple violations

**Legacy Pattern (Multiple div elements for layout):**
```tsx
<div className={className}>{content}</div>
<div className={cn("w-full", className)}>...</div>
<div className="min-w-0 flex-1">{resolveSlot(left)}</div>
```

**Sanctioned Replacement:**
```tsx
<Box className={className}>{content}</Box>
<Box w="full" className={className}>...</Box>
<Box className="min-w-0 flex-1">{resolveSlot(left)}</Box>
```

**Reference:** [LAYOUT_AUTHORITY.md](../../architecture/LAYOUT_AUTHORITY.md) — Box component for layout containers.

**Migration Notes:** 
- Replace all raw HTML `div` elements with Box component
- For flex children with `min-w-0 flex-1`, consider using Row/Stack with appropriate props
- Note: `min-w-0 flex-1` pattern may require Box props if available, or keep as className if Box doesn't support flex child control yet (see Phase H.1 OPTIONAL design)

---

### V5: Prop Smuggling (MAJOR)

#### NotificationCenter.DismissAll.tsx — Line 65

**Legacy Pattern:**
```tsx
<Button
  ref={ref}
  variant="ghost"
  size="sm"
  onClick={handleClick}
  aria-label="Clear all notifications"
  {...props}  // ❌ Untyped spread
>
```

**Sanctioned Replacement:**
```tsx
import { Button, type ButtonProps } from "@/PRIMITIVES/Button";

// In component:
const buttonProps: ButtonProps = {
  variant: "ghost",
  size: "sm",
  onClick: handleClick,
  "aria-label": "Clear all notifications",
  ...props,  // ✅ Explicitly typed
};

<Button ref={ref} {...buttonProps}>
```

**Alternative (simpler):**
```tsx
<Button
  ref={ref}
  variant="ghost"
  size="sm"
  onClick={handleClick}
  aria-label="Clear all notifications"
  {...(props as ButtonProps)}  // ✅ Type assertion
>
```

**Reference:** [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md) — Prop spread must be explicitly typed.

---

#### NotificationCenter.Trigger.tsx — Line 50

**Legacy Pattern:**
```tsx
<Button
  ref={ref}
  variant="ghost"
  iconOnly
  onClick={onClick}
  aria-label={`Open notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
  {...props}  // ❌ Untyped spread
>
```

**Sanctioned Replacement:**
```tsx
import { Button, type ButtonProps } from "@/PRIMITIVES/Button";

// In component:
<Button
  ref={ref}
  variant="ghost"
  iconOnly
  onClick={onClick}
  aria-label={`Open notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ""}`}
  {...(props as ButtonProps)}  // ✅ Type assertion
>
```

**Reference:** [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](../../architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md) — Prop spread must be explicitly typed.

---

## Common Patterns Summary

### Pattern 1: Utility-based spacing wrapper
**Legacy:** `<div className="space-y-md">`  
**Replacement:** `<Stack spacing="md">`

### Pattern 2: Container with padding
**Legacy:** `<div className="container mx-auto px-lg">`  
**Replacement:** `<Container padding="lg">`

### Pattern 3: Responsive grid
**Legacy:** `<div className="grid grid-cols-1 gap-lg md:grid-cols-2">`  
**Replacement:** `<Grid cols={{ base: 1, md: 2 }} gap="lg">`

### Pattern 4: Section wrapper
**Legacy:** `<section className="w-full py-xl">`  
**Replacement:** `<Section spaceY="xl">`

### Pattern 5: Horizontal flex layout
**Legacy:** `<div className="flex items-center justify-between">`  
**Replacement:** `<Row align="center" justify="between" spacing="md">`

### Pattern 6: Vertical flex layout
**Legacy:** `<div className="flex flex-col items-center">`  
**Replacement:** `<Stack direction="vertical" align="center">`

### Pattern 7: Flex wrap layout
**Legacy:** `<div className="flex flex-wrap gap-md">`  
**Replacement:** `<Row wrap spacing="md">`

---

## Migration Checklist

For each screen:

- [ ] Replace utility-based spacing wrappers with Stack
- [ ] Replace container patterns with Container component
- [ ] Replace grid patterns with Grid component
- [ ] Replace section elements with Section component
- [ ] Replace flex layouts with Row/Stack components
- [ ] Replace raw HTML div/span with Box/Text components
- [ ] Remove className from Foundation components
- [ ] Fix prop smuggling with explicit typing
- [ ] Verify visual parity (no regression)
- [ ] Run tests
- [ ] Update mapping document (mark as migrated)

---

**Last Updated:** 2026-01-27  
**Next Step:** Begin screen migration (I3)
