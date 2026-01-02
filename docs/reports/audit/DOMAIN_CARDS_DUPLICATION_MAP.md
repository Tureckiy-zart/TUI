# Domain Cards Duplication Map

**Date:** 2025-01-20  
**Purpose:** Detailed map of duplicated logic and patterns across domain cards for simplification

---

## Summary

This document identifies all duplicated patterns, logic, and styling across domain cards. Each duplication is categorized and mapped to specific cards for targeted refactoring.

**Total Duplication Categories:** 6  
**Total Duplicated Patterns:** 20+

---

## Category 1: Surface Styling Duplication

### 1.1 Root Container Classes

**Pattern:** All CardBase cards use `"group relative"` as root className

**Affected Cards:**
- EventCard: `className={cn(eventCardVariants({...}), "group relative", className)}`
- VenueCard: `className={cn(venueCardVariants({...}), className)}` (venueCardVariants includes "group relative")
- ArtistCard: `className={cn(artistCardVariants({...}), className)}` (artistCardVariants includes "group relative")
- TicketCard: `className={cn(ticketCardVariants({...}), className)}` (ticketCardVariants includes "group relative")
- CategoryCard: `className={cn("group relative", className)}`
- PromoCard: `className={cn("group relative", className)}`

**Duplication Count:** 6 cards

**Simplification:** Move `"group relative"` to CardBase root variant or extract to shared constant

---

### 1.2 Badge Positioning

**Pattern:** Absolute positioning with z-10 and DOMAIN_TOKENS.badges.position

**Affected Cards:**
- EventCard: `eventCardBadgeVariants({ size })` → `"absolute z-10"` + DOMAIN_TOKENS.badges.position
- VenueCard: Direct className → `"absolute z-10"` + DOMAIN_TOKENS.badges.position.default/compact
- ArtistCard: `artistCardBadgeVariants({ size })` → `"absolute z-10"` + DOMAIN_TOKENS.badges.position
- TicketCard: `ticketCardBadgeVariants({ size })` → `"absolute z-10"` + DOMAIN_TOKENS.badges.position
- CategoryCard: `categoryCardBadgeVariants({ size })` → `"absolute z-10"` + DOMAIN_TOKENS.badges.position
- PromoCard: `promoCardBadgeVariants({ size })` → `"absolute z-10"` + DOMAIN_TOKENS.badges.position

**Duplication Count:** 6 cards, 6 variants

**Code Example:**
```typescript
// EventCard
export const eventCardBadgeVariants = cva("absolute z-10", {
  variants: {
    size: {
      default: DOMAIN_TOKENS.badges.position.default,
      compact: DOMAIN_TOKENS.badges.position.compact,
    },
  },
});

// VenueCard (direct)
<div className={cn("absolute z-10", size === "compact" ? DOMAIN_TOKENS.badges.position.compact : DOMAIN_TOKENS.badges.position.default)}>

// ArtistCard
export const artistCardBadgeVariants = cva("absolute z-10", {
  variants: {
    size: {
      default: DOMAIN_TOKENS.badges.position.default,
      compact: DOMAIN_TOKENS.badges.position.compact,
    },
  },
});
```

**Simplification:** Extract to shared badge positioning utility or CardBase extension

---

### 1.3 Badge Surface Styling

**Pattern:** Inline-flex items-center with DOMAIN_TOKENS.badges styling

**Affected Cards:**
- EventCard: `eventCardBadgeSurfaceVariants` with DOMAIN_TOKENS.badges.*
- VenueCard: `venueCardBadgeVariants` (combines positioning + surface)
- ArtistCard: `artistCardBadgeSurfaceVariants` with DOMAIN_TOKENS.badges.*
- TicketCard: `ticketCardBadgeSurfaceVariants` with DOMAIN_TOKENS.badges.* (supports vip, discount)
- CategoryCard: `categoryCardBadgeSurfaceVariants` with DOMAIN_TOKENS.badges.*
- PromoCard: `promoCardBadgeSurfaceVariants` with DOMAIN_TOKENS.badges.* (hardcoded font-semibold)

**Duplication Count:** 6 cards, 6 variants

**Common Base Classes:**
- `inline-flex items-center`
- `DOMAIN_TOKENS.badges.radius`
- `DOMAIN_TOKENS.badges.shadow`
- `DOMAIN_TOKENS.badges.text.color`
- `TEXT_TOKENS.fontSize.xs`
- `TEXT_TOKENS.fontWeight.semibold`

**Simplification:** Extract to shared badge component or CardBase badge wrapper

---

## Category 2: Image Patterns Duplication

### 2.1 Image Container Classes

**Pattern:** `"relative w-full overflow-hidden"` + placeholder gradient

**Affected Cards:**
- EventCard: `"relative w-full overflow-hidden"` + DOMAIN_TOKENS.surface.bg.default
- VenueCard: `venueCardImagePlaceholderVariants` → `"relative overflow-hidden"` + DOMAIN_TOKENS.image.placeholder.gradient
- ArtistCard: ARTIST_TOKENS.image.container.layout + DOMAIN_TOKENS.image.placeholder.gradient
- TicketCard: `"relative w-full overflow-hidden"` + DOMAIN_TOKENS.image.placeholder.gradient
- CategoryCard: `"relative w-full overflow-hidden"` + DOMAIN_TOKENS.image.placeholder.gradient
- PromoCard: `"relative w-full overflow-hidden"` + GRADIENT_TOKENS.surface.elevated

**Duplication Count:** 6 cards

**Simplification:** Move to CardBaseImageWrapper or extract to shared image container component

---

### 2.2 Image Element Classes

**Pattern:** `"h-full w-full object-cover"` with hover scale transform

**Affected Cards:**
- EventCard: `"h-full w-full object-cover"` + DOMAIN_TOKENS.motion.hover.transition + DOMAIN_TOKENS.motion.hover.scale
- VenueCard: `venueCardImageTransformVariants` → `"object-cover"` + MOTION_TOKENS.transition.transform + DOMAIN_TOKENS.motion.hover.scale
- ArtistCard: `artistCardImageTransformVariants` → ARTIST_TOKENS.image.sizing.full + DOMAIN_TOKENS.motion.hover.scale
- TicketCard: `ticketCardImageTransformVariants` → `"object-cover"` + MOTION_TOKENS.transition.transform + DOMAIN_TOKENS.motion.hover.scale
- CategoryCard: `"h-full w-full object-cover"` + DOMAIN_TOKENS.motion.hover.transition + DOMAIN_TOKENS.motion.hover.scale
- PromoCard: `"h-full w-full object-cover"` + DOMAIN_TOKENS.motion.hover.transition + DOMAIN_TOKENS.motion.hover.scale

**Duplication Count:** 6 cards

**Simplification:** Move image transform logic to CardBaseImageWrapper

---

### 2.3 Image Overlay on Hover

**Pattern:** Absolute overlay with gradient and opacity transition

**Affected Cards:**
- EventCard: Hardcoded `"absolute inset-0 opacity-0 group-hover:opacity-100"` + DOMAIN_TOKENS.image.overlay.gradient + DOMAIN_TOKENS.motion.hover.transition
- VenueCard: `venueCardImageOverlayVariants` → `"absolute inset-0"` + DOMAIN_TOKENS.image.overlay.gradient + opacity transition
- ArtistCard: `artistCardImageOverlayVariants` → `"absolute inset-0"` + DOMAIN_TOKENS.image.overlay.gradient + opacity transition
- TicketCard: `ticketCardImageOverlayVariants` → `"absolute inset-0"` + DOMAIN_TOKENS.image.overlay.gradient + opacity transition
- CategoryCard: Hardcoded with MOTION_TOKENS.transition.opacity + DOMAIN_TOKENS.image.overlay.gradient
- PromoCard: Hardcoded `"absolute inset-0 opacity-0 transition-opacity duration-normal group-hover:opacity-100"` + DOMAIN_TOKENS.image.overlay.gradient

**Duplication Count:** 6 cards

**Code Example:**
```typescript
// EventCard
<div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100", DOMAIN_TOKENS.motion.hover.transition, DOMAIN_TOKENS.image.overlay.gradient)} />

// VenueCard
export const venueCardImageOverlayVariants = cva(
  `absolute inset-0 ${DOMAIN_TOKENS.image.overlay.gradient} opacity-0 ${MOTION_TOKENS.transition.opacity} ${MOTION_TOKENS.duration.normal} group-hover:opacity-100`,
  // ...
);

// CategoryCard
<div className={cn("absolute inset-0 opacity-0", MOTION_TOKENS.transition.opacity, MOTION_TOKENS.duration.normal, DOMAIN_TOKENS.image.overlay.gradient, "group-hover:opacity-100")} />
```

**Simplification:** Extract to CardBaseImageWrapper overlay component or shared utility

---

### 2.4 Image Placeholder Icon

**Pattern:** Centered icon with ICON_TOKENS when imageUrl is missing

**Affected Cards:**
- EventCard: `<Icon name="info" size="xl" color="muted" className={ICON_TOKENS.sizes["4xl"]} />`
- VenueCard: `<Icon name="info" size="xl" color="muted" className={ICON_TOKENS.sizes["4xl"]} />`
- ArtistCard: `<Icon name="info" size="xl" color="muted" className={ICON_TOKENS.sizes["4xl"]} />`
- TicketCard: `<Icon name="info" size="xl" color="muted" className={ICON_TOKENS.sizes["4xl"]} />`
- CategoryCard: `<Icon name="info" className={cn(ICON_TOKENS.sizes["4xl"], ICON_TOKENS.colors.muted)} />`
- PromoCard: `<Icon name="info" size="xl" color="muted" className={ICON_TOKENS.sizes["4xl"]} />`

**Duplication Count:** 6 cards, identical icon usage

**Simplification:** Extract to CardBaseImageWrapper placeholder component

---

## Category 3: Footer Patterns Duplication

### 3.1 Footer Border

**Pattern:** `"border-t border-border"` with size-based padding-top

**Affected Cards:**
- EventCard: `eventCardFooterVariants` → `"border-t border-border"` + DOMAIN_TOKENS.spacing.footer.paddingTopDefault/Compact
- VenueCard: `venueCardFooterBorderVariants` → `"border-t border-border"` + DOMAIN_TOKENS.spacing.footer.paddingTopDefault/Compact
- ArtistCard: `artistCardFooterBorderVariants` → ARTIST_TOKENS.footer.border.top + DOMAIN_TOKENS.spacing.footer.paddingTopDefault/Compact
- TicketCard: `ticketCardFooterVariants` → `"border-t border-border"` + DOMAIN_TOKENS.spacing.footer.paddingTopDefault/Compact

**Duplication Count:** 4 cards, 4 variants

**Code Example:**
```typescript
// EventCard
export const eventCardFooterVariants = cva("border-t border-border", {
  variants: {
    size: {
      default: DOMAIN_TOKENS.spacing.footer.paddingTopDefault,
      compact: DOMAIN_TOKENS.spacing.footer.paddingTopCompact,
    },
  },
});

// VenueCard
export const venueCardFooterBorderVariants = cva("border-t border-border", {
  variants: {
    size: {
      default: DOMAIN_TOKENS.spacing.footer.paddingTopDefault,
      compact: DOMAIN_TOKENS.spacing.footer.paddingTopCompact,
    },
  },
});
```

**Simplification:** Move to CardBaseFooterWrapper or extract to shared footer border utility

---

### 3.2 Footer Wrapper Classes

**Pattern:** `"w-full"` wrapper inside CardBaseFooterWrapper

**Affected Cards:**
- EventCard: `<div className={cn("w-full", eventCardFooterVariants({ size }))}>`
- TicketCard: `<div className={cn("w-full", ticketCardFooterVariants({ size }))}>`
- PromoCard: `<div className="w-full">`

**Duplication Count:** 3 cards

**Simplification:** Move `"w-full"` to CardBaseFooterWrapper default styling

---

## Category 4: Metadata Patterns Duplication

### 4.1 Metadata Container

**Pattern:** Flex column with vertical spacing

**Affected Cards:**
- EventCard: `eventCardMetadataVariants` → `"flex flex-col"` + DOMAIN_TOKENS.metadata.spacing.vertical
- ArtistCard: `artistCardMetadataVariants` → `"flex flex-col"` + DOMAIN_TOKENS.metadata.spacing.vertical

**Duplication Count:** 2 cards, 2 variants

**Simplification:** Extract to shared metadata container component or CardBaseContentWrapper extension

---

### 4.2 Metadata Item Row

**Pattern:** Flex items-center with horizontal spacing and text styling

**Affected Cards:**
- EventCard: `eventCardMetadataItemVariants` → `"flex items-center"` + DOMAIN_TOKENS.metadata.spacing.horizontal + DOMAIN_TOKENS.metadata.text.secondary + TEXT_TOKENS.fontSize.xs
- VenueCard: `venueCardMetadataRowVariants` → `"flex items-center"` + DOMAIN_TOKENS.metadata.spacing.horizontal + DOMAIN_TOKENS.metadata.text.secondary + TEXT_TOKENS.fontSize.xs
- ArtistCard: `artistCardMetadataItemVariants` → `"flex items-center"` + DOMAIN_TOKENS.metadata.spacing.horizontal + DOMAIN_TOKENS.metadata.text.secondary + TEXT_TOKENS.fontSize.xs

**Duplication Count:** 3 cards, 3 variants

**Code Example:**
```typescript
// EventCard
export const eventCardMetadataItemVariants = cva(
  `flex items-center ${DOMAIN_TOKENS.metadata.spacing.horizontal} ${DOMAIN_TOKENS.metadata.text.secondary} ${TEXT_TOKENS.fontSize.xs}`,
  // ...
);

// VenueCard
export const venueCardMetadataRowVariants = cva(
  `flex items-center ${DOMAIN_TOKENS.metadata.spacing.horizontal} ${DOMAIN_TOKENS.metadata.text.secondary} ${TEXT_TOKENS.fontSize.xs}`,
  // ...
);
```

**Simplification:** Extract to shared metadata row component

---

### 4.3 Metadata Icon Styling

**Pattern:** Icon with size and color from tokens

**Affected Cards:**
- EventCard: `eventCardMetadataIconVariants` → DOMAIN_TOKENS.metadata.icon.sizeSm + DOMAIN_TOKENS.metadata.icon.default
- ArtistCard: `artistCardMetadataIconVariants` → ICON_TOKENS.sizes.md + ICON_TOKENS.colors.muted

**Duplication Count:** 2 cards, 2 variants (different token paths)

**Simplification:** Standardize icon sizing and extract to shared metadata icon component

---

## Category 5: Button Patterns Duplication

### 5.1 CTA/Purchase Button Styling

**Pattern:** Inline-flex items-center with badge gradient styling

**Affected Cards:**
- EventCard: `eventCardTicketButtonVariants` → `"inline-flex items-center justify-center"` + DOMAIN_TOKENS.badges.surface.featured + DOMAIN_TOKENS.badges.text.color + DOMAIN_TOKENS.badges.shadow + DOMAIN_TOKENS.motion.hover.transition + TEXT_TOKENS.fontWeight.semibold + transform
- TicketCard: `ticketCardPurchaseButtonVariants` → `"inline-flex items-center justify-center"` + DOMAIN_TOKENS.badges.surface.featured + DOMAIN_TOKENS.badges.text.color + DOMAIN_TOKENS.badges.shadow + DOMAIN_TOKENS.motion.hover.transition + TEXT_TOKENS.fontWeight.semibold + transform + disabled state
- PromoCard: `promoCardCtaButtonVariants` → `"inline-flex items-center justify-center"` + DOMAIN_TOKENS.cta.button.* (different token path)

**Duplication Count:** 3 cards, 3 variants

**Common Base Classes:**
- `inline-flex items-center justify-center`
- `TEXT_TOKENS.fontWeight.semibold`
- `transform`
- Hover scale effect

**Simplification:** Extract to shared CTA button component or standardize token usage

---

### 5.2 Button Icon Spacing

**Pattern:** Icon with margin-left spacing

**Affected Cards:**
- EventCard: `eventCardTicketButtonIconVariants` → DOMAIN_TOKENS.metadata.icon.sizeSm + DOMAIN_TOKENS.spacing.button.iconMarginLeft
- TicketCard: `ticketCardPurchaseButtonIconVariants` → ICON_TOKENS.sizes.md + DOMAIN_TOKENS.spacing.button.iconMarginLeft
- PromoCard: `promoCardCtaButtonIconVariants` → ICON_TOKENS.sizes.md + DOMAIN_TOKENS.spacing.button.iconMarginLeft

**Duplication Count:** 3 cards, 3 variants

**Simplification:** Standardize icon size and extract to shared button icon component

---

## Category 6: Helper Components Duplication

### 6.1 LinkWithCustomVariant Helper

**Pattern:** Ref callback helper to apply custom className to Foundation Link

**Affected Cards:**
- EventCard: LinkWithCustomVariant helper (40+ lines)
- TicketCard: LinkWithCustomVariant helper (40+ lines)
- PromoCard: LinkWithCustomVariant helper (40+ lines)

**Duplication Count:** 3 cards, ~120 lines of duplicated code

**Code Example:**
```typescript
// Identical in all 3 cards
const LinkWithCustomVariant = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof Link> & { customClassName: string }
>(({ customClassName, ...linkProps }, ref) => {
  const anchorRef = React.useRef<HTMLAnchorElement>(null);
  const mergedRef = React.useCallback(
    (node: HTMLAnchorElement | null) => {
      anchorRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref && "current" in ref) {
        (ref as { current: HTMLAnchorElement | null }).current = node;
      }
      if (node && customClassName) {
        const existingClasses = node.className.split(" ").filter(Boolean);
        const customClasses = customClassName.split(" ").filter(Boolean);
        node.className = [...new Set([...existingClasses, ...customClasses])].join(" ");
      }
    },
    [ref, customClassName],
  );
  return <Link {...linkProps} ref={mergedRef} />;
});
```

**Simplification:** Extract to shared utility component in `src/COMPOSITION/layout/` or `src/PATTERNS/`

---

## Category 7: Animation Wrapper Duplication

### 7.1 Box Animation Wrapper

**Pattern:** Box wrapper with resolveComponentAnimations

**Affected Cards:**
- EventCard: `<Box {...animationProps}>`
- VenueCard: `<Box {...animationProps}>`
- ArtistCard: `<Box {...animationProps}>`
- TicketCard: `<Box {...animationProps}>`
- CategoryCard: `<Box {...animationProps}>`
- PromoCard: `<Box {...animationProps}>`

**Duplication Count:** 6 cards

**Code Example:**
```typescript
// Identical in all 6 cards
const animationProps = resolveComponentAnimations({
  animation: animation?.animation || "fadeInUp",
  hoverAnimation: animation?.hoverAnimation || "hoverLift",
  animationProps: animation?.animationProps,
});

return (
  <Box {...animationProps}>
    <CardBase ...>
      {/* card content */}
    </CardBase>
  </Box>
);
```

**Note:** This is acceptable duplication as Box is used for animation wrapper, not layout logic. However, could be simplified by moving animation support to CardBase.

---

## Unused Variants

### Variants Defined But Not Used

**EventCard:**
- None (all variants used)

**VenueCard:**
- `venueCardTitleVariants` - defined but uses Heading directly
- `venueCardDescriptionVariants` - defined but uses Text directly
- `venueCardLocationTextVariants` - defined but uses Text directly

**ArtistCard:**
- `artistCardGenresVariants` - defined but uses Text directly

**TicketCard:**
- `ticketCardTitleVariants` - defined but uses Heading directly
- `ticketCardCapacityVariants` - defined but uses Text directly

**CategoryCard:**
- None (all variants used)

**PromoCard:**
- None (all variants used)

**Simplification:** Remove unused variants to reduce code complexity

---

## Summary Statistics

### Duplication by Category

1. **Surface Styling:** 3 patterns, 18+ instances
2. **Image Patterns:** 4 patterns, 24+ instances
3. **Footer Patterns:** 2 patterns, 7+ instances
4. **Metadata Patterns:** 3 patterns, 7+ instances
5. **Button Patterns:** 2 patterns, 6+ instances
6. **Helper Components:** 1 pattern, 3 instances (~120 lines)
7. **Animation Wrapper:** 1 pattern, 6 instances (acceptable)

### Total Duplication

- **Patterns:** 16+ duplicated patterns
- **Code Lines:** ~200+ lines of duplicated code
- **Variants:** 20+ duplicated variant definitions
- **Hardcoded Classes:** 10+ common hardcoded class strings

---

## Simplification Priority

### High Priority (Most Impact)

1. **LinkWithCustomVariant Helper** - 120+ lines duplicated, extract to shared utility
2. **Image Overlay Pattern** - 6 cards, extract to CardBaseImageWrapper
3. **Badge Positioning** - 6 cards, extract to shared utility or CardBase extension
4. **Footer Border** - 4 cards, move to CardBaseFooterWrapper

### Medium Priority

5. **Metadata Row Pattern** - 3 cards, extract to shared component
6. **Image Transform Pattern** - 6 cards, move to CardBaseImageWrapper
7. **Badge Surface Styling** - 6 cards, extract to shared badge component
8. **CTA Button Styling** - 3 cards, standardize token usage

### Low Priority

9. **Root Container Classes** - Move "group relative" to CardBase
10. **Image Container Classes** - Move to CardBaseImageWrapper
11. **Footer Wrapper Classes** - Move "w-full" to CardBaseFooterWrapper
12. **Unused Variants** - Remove to reduce complexity

---

## Next Steps

1. Create decisions document (DOMAIN_CARDS_DECISIONS.md) with simplification plan for each card
2. Prioritize simplifications based on impact and risk
3. Apply simplifications while maintaining visual output
4. Verify no regressions in Storybook snapshots

