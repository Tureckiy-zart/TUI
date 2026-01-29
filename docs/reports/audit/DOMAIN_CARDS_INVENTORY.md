# Domain Cards Inventory

**Date:** 2025-01-20  
**Purpose:** Complete inventory of all domain-level Card components for simplification audit

---

## Summary

This document provides a complete inventory of all domain-level Card components, their current structure, props, variants, and usage of CardBase/Card composition patterns.

**Total Cards:** 7  
**Using CardBase:** 6 (EventCard, VenueCard, ArtistCard, TicketCard, CategoryCard, PromoCard)  
**Using Card (COMPOSITION):** 1 (ProfileCard)

---

## 1. EventCard

**Path:** `src/PATTERNS/cards/EventCard/EventCard.tsx`  
**Layer:** DOMAIN  
**Status:** Uses CardBase ✅

### Props & Types

- **Size:** `"default" | "compact"` (EventCardSize)
- **Layout:** `"vertical"` (EventCardLayout)
- **Variant:** `"default" | "featured"` (EventCardVariant)
- **Domain Props:**
  - `title: string` (required)
  - `description?: string`
  - `date?: string`
  - `venueName?: string`
  - `price?: string`
  - `imageUrl?: string`
  - `href?: string`
  - `ticketUrl?: string`
  - `featured?: boolean`
  - `showImage?: boolean`
  - `getTicketsLabel: string` (required)
  - `featuredBadgeText?: string`
  - `animation?: ComponentAnimationConfig`

### CardBase Usage

- ✅ Uses `CardBase` as root container
- ✅ Uses `CardBaseImageWrapper` for image section
- ✅ Uses `CardBaseContentWrapper` for content section
- ✅ Uses `CardBaseFooterWrapper` for footer section
- Maps `"default"` → `"md"`, `"compact"` → `"sm"`
- Maps `"featured"` → `"elevated"`, `"default"` → `"default"`

### Variants Structure

- `eventCardVariants` - Root wrapper (uses DOMAIN_TOKENS for surface, border, radius, shadow)
- `eventCardBadgeVariants` - Badge positioning (absolute, z-10)
- `eventCardBadgeSurfaceVariants` - Badge surface styling
- `eventCardMetadataVariants` - Metadata container (flex column)
- `eventCardMetadataItemVariants` - Metadata item (flex items-center)
- `eventCardMetadataIconVariants` - Metadata icon styling
- `eventCardFooterVariants` - Footer border (border-t)
- `eventCardTicketButtonVariants` - Ticket button styling
- `eventCardTicketButtonIconVariants` - Ticket button icon spacing
- `eventCardPriceVariants` - Price text gradient

### Dependencies

- **Layout Primitives:** `Box` (for animation wrapper)
- **Foundation:** `Heading`, `Text`, `Link`, `Icon`
- **Icons:** `IconCalendar`, `IconLocation`, `IconArrowRight`
- **Tokens:** `DOMAIN_TOKENS`, `CARD_TOKENS`, `TEXT_TOKENS`, `ICON_TOKENS`, `GRADIENT_TOKENS`

### Duplicated Logic

- Badge positioning logic (absolute positioning with DOMAIN_TOKENS.badges.position)
- Image overlay logic (absolute inset-0 with gradient, opacity transition)
- Footer border logic (border-t border-border with padding-top)
- Metadata row layout (flex items-center with horizontal spacing)
- LinkWithCustomVariant helper (duplicated across multiple cards)

### Hardcoded Values

- `"group relative"` - hardcoded in root className
- `"w-full"` - hardcoded in footer wrapper
- `"text-right"` - hardcoded for price display
- `"relative w-full overflow-hidden"` - hardcoded in image container
- `"h-full w-full object-cover"` - hardcoded for image
- `"absolute inset-0 opacity-0 group-hover:opacity-100"` - hardcoded for image overlay

---

## 2. ProfileCard

**Path:** `src/DOMAIN/auth/ProfileCard.tsx`  
**Layer:** DOMAIN  
**Status:** Uses Card (COMPOSITION) ✅

### Props & Types

- **Domain Props:**
  - `name: string` (required)
  - `email: string` (required)
  - `avatar?: string`
  - `className?: string`

### Card Usage

- ✅ Uses `Card` as root container
- ✅ Uses `CardBody` for content section
- ❌ Does NOT use CardHeader or CardFooter

### Variants Structure

- No CVA variants - uses Card component directly
- Hardcoded `shadow-md` className
- Hardcoded `p-md` className on CardBody

### Dependencies

- **Layout Primitives:** None (uses Card directly)
- **Foundation:** `Heading`, `Text`
- **Tokens:** None (uses hardcoded values)

### Duplicated Logic

- None (simple card structure)

### Hardcoded Values

- `"shadow-md"` - hardcoded shadow on Card
- `"p-md"` - hardcoded padding on CardBody
- `"mb-md h-[var(--spacing-md)] w-[var(--spacing-md)] rounded-full bg-muted"` - hardcoded avatar placeholder

### Simplification Opportunities

- Replace `shadow-md` with Card `shadow` prop
- Replace `p-md` with Card `size` prop
- Use Card size variants instead of hardcoded padding

---

## 3. VenueCard

**Path:** `src/PATTERNS/cards/VenueCard/VenueCard.tsx`  
**Layer:** PATTERNS (domain-specific)  
**Status:** Uses CardBase ✅

### Props & Types

- **Size:** `"default" | "compact"` (VenueCardSize)
- **Variant:** `"default" | "featured"` (VenueCardVariant)
- **Domain Props:**
  - `name: string` (required)
  - `description?: string`
  - `location?: string`
  - `capacity?: string`
  - `imageUrl?: string`
  - `href?: string`
  - `eventsCount?: number`
  - `featured?: boolean`
  - `showImage?: boolean`
  - `eventsLabel: string` (required)
  - `popularBadgeText?: string`
  - `capacityLabel: string` (required)
  - `animation?: ComponentAnimationConfig`

### CardBase Usage

- ✅ Uses `CardBase` as root container
- ✅ Uses `CardBaseImageWrapper` for image section
- ✅ Uses `CardBaseContentWrapper` for content section
- ✅ Uses `CardBaseFooterWrapper` for footer section (conditional)
- Maps `"default"` → `"md"`, `"compact"` → `"sm"`
- Maps `"featured"` → `"elevated"`, `"default"` → `"default"`

### Variants Structure

- `venueCardVariants` - Root wrapper (group relative, empty variants)
- `venueCardBadgeVariants` - Badge styling (inline-flex, uses DOMAIN_TOKENS.badges)
- `venueCardImageOverlayVariants` - Image overlay on hover
- `venueCardImageTransformVariants` - Image scale on hover
- `venueCardImagePlaceholderVariants` - Image placeholder gradient
- `venueCardTitleVariants` - Title styling (unused in component)
- `venueCardDescriptionVariants` - Description styling (unused in component)
- `venueCardLocationTextVariants` - Location text styling (unused in component)
- `venueCardMetadataRowVariants` - Metadata row layout
- `venueCardFooterBorderVariants` - Footer border (border-t)

### Dependencies

- **Layout Primitives:** `Box` (for animation wrapper)
- **Foundation:** `Heading`, `Text`, `Link`, `Icon`
- **Icons:** `IconCalendar` (for events), `Icon` (for capacity placeholder)
- **Tokens:** `DOMAIN_TOKENS`, `TEXT_TOKENS`, `ICON_TOKENS`, `MOTION_TOKENS`

### Duplicated Logic

- Badge positioning logic (absolute positioning with DOMAIN_TOKENS.badges.position)
- Image overlay logic (absolute inset-0 with gradient, opacity transition)
- Image transform logic (object-cover with scale on hover)
- Footer border logic (border-t border-border with padding-top)
- Metadata row layout (flex items-center with horizontal spacing)

### Hardcoded Values

- `"group relative"` - hardcoded in root className
- `"absolute z-10"` - hardcoded for badge positioning
- `"relative w-full overflow-hidden"` - hardcoded in image placeholder
- `"h-full w-full"` - hardcoded for image
- `"flex items-center justify-between"` - hardcoded in footer
- `"flex items-center"` - hardcoded in metadata rows

### Unused Variants

- `venueCardTitleVariants` - defined but not used (uses Heading directly)
- `venueCardDescriptionVariants` - defined but not used (uses Text directly)
- `venueCardLocationTextVariants` - defined but not used (uses Text directly)

---

## 4. ArtistCard

**Path:** `src/PATTERNS/cards/ArtistCard/ArtistCard.tsx`  
**Layer:** PATTERNS (domain-specific)  
**Status:** Uses CardBase ✅

### Props & Types

- **Size:** `"default" | "compact"` (ArtistCardSize)
- **Variant:** `"default" | "featured"` (ArtistCardVariant)
- **Domain Props:**
  - `name: string` (required)
  - `description?: string`
  - `genres?: string`
  - `followers?: number`
  - `plays?: number`
  - `imageUrl?: string`
  - `href?: string`
  - `featured?: boolean`
  - `showImage?: boolean`
  - `popularBadgeText?: string`
  - `followersLabel: string` (required)
  - `playsLabel: string` (required)
  - `animation?: ComponentAnimationConfig`

### CardBase Usage

- ✅ Uses `CardBase` as root container
- ✅ Uses `CardBaseImageWrapper` for image section
- ✅ Uses `CardBaseContentWrapper` for content section
- ✅ Uses `CardBaseFooterWrapper` for footer section (conditional, empty)
- Maps `"default"` → `"md"`, `"compact"` → `"sm"`
- Maps `"featured"` → `"elevated"`, `"default"` → `"default"`

### Variants Structure

- `artistCardVariants` - Root wrapper (group relative, empty variants)
- `artistCardBadgeVariants` - Badge positioning (absolute, z-10)
- `artistCardBadgeSurfaceVariants` - Badge surface styling
- `artistCardImageOverlayVariants` - Image overlay on hover
- `artistCardImageTransformVariants` - Image scale on hover
- `artistCardMetadataVariants` - Metadata container (flex column)
- `artistCardMetadataItemVariants` - Metadata item (flex items-center)
- `artistCardMetadataIconVariants` - Metadata icon styling
- `artistCardGenresVariants` - Genres text styling (unused in component)
- `artistCardFooterBorderVariants` - Footer border (uses ARTIST_TOKENS)

### Dependencies

- **Layout Primitives:** `Box` (for animation wrapper)
- **Foundation:** `Heading`, `Text`, `Link`, `Icon`
- **Tokens:** `DOMAIN_TOKENS`, `ARTIST_TOKENS`, `TEXT_TOKENS`, `ICON_TOKENS`, `MOTION_TOKENS`

### Duplicated Logic

- Badge positioning logic (absolute positioning with DOMAIN_TOKENS.badges.position)
- Image overlay logic (absolute inset-0 with gradient, opacity transition)
- Image transform logic (object-cover with scale on hover)
- Footer border logic (border-t with padding-top, uses ARTIST_TOKENS)
- Metadata row layout (flex items-center with horizontal spacing)

### Hardcoded Values

- `"group relative"` - hardcoded in root className
- `"absolute z-10"` - hardcoded for badge positioning
- `"relative w-full overflow-hidden"` - hardcoded in image container (via ARTIST_TOKENS)
- `"h-full w-full"` - hardcoded for image (via ARTIST_TOKENS)
- `"flex items-center"` - hardcoded in metadata rows

### Unused Variants

- `artistCardGenresVariants` - defined but not used (uses Text directly)

### Special Notes

- Uses ARTIST_TOKENS for image container and footer border (domain-specific tokens)
- Footer wrapper is conditionally rendered but empty (structure in place for future extensions)

---

## 5. TicketCard

**Path:** `src/PATTERNS/cards/TicketCard/TicketCard.tsx`  
**Layer:** PATTERNS (domain-specific)  
**Status:** Uses CardBase ✅

### Props & Types

- **Size:** `"default" | "compact"` (TicketCardSize)
- **Variant:** `"default" | "featured"` (TicketCardVariant)
- **Availability:** `"available" | "sold_out" | "available_soon"` (TicketAvailability)
- **Domain Props:**
  - `title: string` (required)
  - `date?: string | Date | number`
  - `description?: string`
  - `price?: string`
  - `capacity?: string`
  - `availability?: TicketAvailability`
  - `imageUrl?: string`
  - `href?: string`
  - `purchaseUrl?: string`
  - `purchaseLabel: string` (required)
  - `vipBadgeText?: string`
  - `discountBadgeText?: string`
  - `featured?: boolean`
  - `featuredBadgeText?: string`
  - `showImage?: boolean`
  - `animation?: ComponentAnimationConfig`

### CardBase Usage

- ✅ Uses `CardBase` as root container
- ✅ Uses `CardBaseImageWrapper` for image section
- ✅ Uses `CardBaseContentWrapper` for content section
- ✅ Uses `CardBaseFooterWrapper` for footer section
- Maps `"default"` → `"md"`, `"compact"` → `"sm"`
- Maps `"featured"` → `"elevated"`, `"default"` → `"default"`

### Variants Structure

- `ticketCardVariants` - Root wrapper (group relative, empty variants)
- `ticketCardBadgeVariants` - Badge positioning (absolute, z-10)
- `ticketCardBadgeSurfaceVariants` - Badge surface styling (supports vip, discount variants)
- `ticketCardTitleVariants` - Title styling (unused in component)
- `ticketCardDateVariants` - Date display styling
- `ticketCardDescriptionVariants` - Description styling
- `ticketCardPriceCapacityContainerVariants` - Price/capacity container layout
- `ticketCardPriceVariants` - Price text styling
- `ticketCardCapacityVariants` - Capacity text styling (unused in component)
- `ticketCardAvailabilityVariants` - Availability indicator styling
- `ticketCardFooterVariants` - Footer border (border-t)
- `ticketCardPurchaseButtonVariants` - Purchase button styling (with disabled state)
- `ticketCardPurchaseButtonIconVariants` - Purchase button icon spacing
- `ticketCardImageOverlayVariants` - Image overlay on hover
- `ticketCardImageTransformVariants` - Image scale on hover

### Dependencies

- **Layout Primitives:** `Box` (for animation wrapper)
- **Foundation:** `Heading`, `Text`, `Link`, `Icon`
- **Icons:** `IconArrowRight`
- **Tokens:** `DOMAIN_TOKENS`, `TEXT_TOKENS`, `ICON_TOKENS`, `MOTION_TOKENS`

### Duplicated Logic

- Badge positioning logic (absolute positioning with DOMAIN_TOKENS.badges.position)
- Multiple badge positioning (featured, VIP, discount with different Y positions)
- Image overlay logic (absolute inset-0 with gradient, opacity transition)
- Image transform logic (object-cover with scale on hover)
- Footer border logic (border-t border-border with padding-top)
- Purchase button styling (similar to ticket button in EventCard)

### Hardcoded Values

- `"group relative"` - hardcoded in root className
- `"absolute z-10"` - hardcoded for badge positioning
- `"relative w-full overflow-hidden"` - hardcoded in image placeholder
- `"h-full w-full"` - hardcoded for image
- `"w-full"` - hardcoded in footer wrapper
- `"flex items-center"` - hardcoded in price/capacity container
- Badge Y positioning logic (getVipBadgePosition, getDiscountBadgePosition helpers)

### Unused Variants

- `ticketCardTitleVariants` - defined but not used (uses Heading directly)
- `ticketCardCapacityVariants` - defined but not used (uses Text directly)

### Special Notes

- Most complex card with multiple badge types (featured, VIP, discount)
- Has availability states (available, sold_out, available_soon)
- Purchase button can be disabled based on availability
- Uses LinkWithCustomVariant helper for purchase button

---

## 6. CategoryCard

**Path:** `src/PATTERNS/cards/CategoryCard/CategoryCard.tsx`  
**Layer:** PATTERNS (domain-specific)  
**Status:** Uses CardBase ✅

### Props & Types

- **Size:** `"default" | "compact"` (CategoryCardSize)
- **Variant:** `"default" | "featured"` (CategoryCardVariant)
- **Domain Props:**
  - `title: string` (required)
  - `description?: string`
  - `imageUrl?: string`
  - `href?: string`
  - `featured?: boolean`
  - `showImage?: boolean`
  - `featuredBadgeText?: string`
  - `animation?: ComponentAnimationConfig`

### CardBase Usage

- ✅ Uses `CardBase` as root container
- ✅ Uses `CardBaseImageWrapper` for image section
- ✅ Uses `CardBaseContentWrapper` for content section
- ❌ Does NOT use CardBaseFooterWrapper (no footer)

### Variants Structure

- `categoryCardBadgeVariants` - Badge positioning (absolute, z-10)
- `categoryCardBadgeSurfaceVariants` - Badge surface styling

### Dependencies

- **Layout Primitives:** `Box` (for animation wrapper)
- **Foundation:** `Heading`, `Text`, `Link`, `Icon`
- **Tokens:** `DOMAIN_TOKENS`, `ICON_TOKENS`, `MOTION_TOKENS`

### Duplicated Logic

- Badge positioning logic (absolute positioning with DOMAIN_TOKENS.badges.position)
- Image overlay logic (absolute inset-0 with gradient, opacity transition)
- Image transform logic (object-cover with scale on hover)

### Hardcoded Values

- `"group relative"` - hardcoded in root className
- `"absolute z-10"` - hardcoded for badge positioning
- `"relative w-full overflow-hidden"` - hardcoded in image placeholder
- `"h-full w-full object-cover"` - hardcoded for image
- `"absolute inset-0 opacity-0 transition-opacity duration-normal group-hover:opacity-100"` - hardcoded for image overlay

### Simplification Opportunities

- Simplest card structure (no footer, minimal variants)
- Could potentially be simplified further by extracting common image overlay logic

---

## 7. PromoCard

**Path:** `src/PATTERNS/cards/PromoCard/PromoCard.tsx`  
**Layer:** PATTERNS (domain-specific)  
**Status:** Uses CardBase ✅

### Props & Types

- **Size:** `"default" | "compact"` (PromoCardSize)
- **Variant:** `"default" | "featured"` (PromoCardVariant)
- **Domain Props:**
  - `title: string` (required)
  - `description?: string`
  - `imageUrl?: string`
  - `href?: string`
  - `ctaUrl?: string`
  - `ctaLabel: string` (required)
  - `featured?: boolean`
  - `showImage?: boolean`
  - `featuredBadgeText?: string`
  - `animation?: ComponentAnimationConfig`

### CardBase Usage

- ✅ Uses `CardBase` as root container
- ✅ Uses `CardBaseImageWrapper` for image section
- ✅ Uses `CardBaseContentWrapper` for content section
- ✅ Uses `CardBaseFooterWrapper` for footer section
- Maps `"default"` → `"md"`, `"compact"` → `"sm"`
- Maps `"featured"` → `"elevated"`, `"default"` → `"default"`

### Variants Structure

- `promoCardBadgeVariants` - Badge positioning (absolute, z-10)
- `promoCardBadgeSurfaceVariants` - Badge surface styling
- `promoCardCtaButtonVariants` - CTA button styling (uses DOMAIN_TOKENS.cta.button)
- `promoCardCtaButtonIconVariants` - CTA button icon spacing

### Dependencies

- **Layout Primitives:** `Box` (for animation wrapper)
- **Foundation:** `Heading`, `Text`, `Link`, `Icon`
- **Icons:** `IconArrowRight`
- **Tokens:** `DOMAIN_TOKENS`, `ICON_TOKENS`, `TEXT_TOKENS`, `GRADIENT_TOKENS`

### Duplicated Logic

- Badge positioning logic (absolute positioning with DOMAIN_TOKENS.badges.position)
- Image overlay logic (absolute inset-0 with gradient, opacity transition)
- Image transform logic (object-cover with scale on hover)
- CTA button styling (similar to purchase button in TicketCard)

### Hardcoded Values

- `"group relative"` - hardcoded in root className
- `"absolute z-10"` - hardcoded for badge positioning
- `"relative w-full overflow-hidden"` - hardcoded in image container
- `"h-full w-full object-cover"` - hardcoded for image
- `"absolute inset-0 opacity-0 transition-opacity duration-normal group-hover:opacity-100"` - hardcoded for image overlay
- `"w-full"` - hardcoded in footer wrapper
- `font-semibold` - hardcoded in badge surface (should use TEXT_TOKENS)

### Special Notes

- Uses DOMAIN_TOKENS.cta.button for CTA button styling (domain-specific CTA tokens)
- Similar structure to TicketCard but simpler (no availability states, single CTA)

---

## Common Patterns Across All Cards

### 1. Badge Positioning

**Pattern:** All cards with badges use absolute positioning with DOMAIN_TOKENS.badges.position

**Duplication:**
- EventCard: `eventCardBadgeVariants` with `DOMAIN_TOKENS.badges.position.default/compact`
- VenueCard: Direct className with `DOMAIN_TOKENS.badges.position.default/compact`
- ArtistCard: `artistCardBadgeVariants` with `DOMAIN_TOKENS.badges.position.default/compact`
- TicketCard: `ticketCardBadgeVariants` with `DOMAIN_TOKENS.badges.position.default/compact` + custom Y positioning
- CategoryCard: `categoryCardBadgeVariants` with `DOMAIN_TOKENS.badges.position.default/compact`
- PromoCard: `promoCardBadgeVariants` with `DOMAIN_TOKENS.badges.position.default/compact`

**Simplification:** Extract badge positioning to shared utility or CardBase extension

### 2. Image Overlay

**Pattern:** All cards with images use absolute overlay with gradient and opacity transition

**Duplication:**
- EventCard: Hardcoded `"absolute inset-0 opacity-0 group-hover:opacity-100"` + DOMAIN_TOKENS.image.overlay.gradient
- VenueCard: `venueCardImageOverlayVariants` with same pattern
- ArtistCard: `artistCardImageOverlayVariants` with same pattern
- TicketCard: `ticketCardImageOverlayVariants` with same pattern
- CategoryCard: Hardcoded with MOTION_TOKENS
- PromoCard: Hardcoded with DOMAIN_TOKENS.image.overlay.gradient

**Simplification:** Extract to CardBaseImageWrapper or shared component

### 3. Image Transform

**Pattern:** All cards with images use scale transform on hover

**Duplication:**
- EventCard: DOMAIN_TOKENS.motion.hover.scale on image
- VenueCard: `venueCardImageTransformVariants` with MOTION_TOKENS.transition.transform
- ArtistCard: `artistCardImageTransformVariants` with MOTION_TOKENS.transition.transform
- TicketCard: `ticketCardImageTransformVariants` with MOTION_TOKENS.transition.transform
- CategoryCard: DOMAIN_TOKENS.motion.hover.scale on image
- PromoCard: DOMAIN_TOKENS.motion.hover.scale on image

**Simplification:** Extract to CardBaseImageWrapper

### 4. Footer Borders

**Pattern:** Cards with footers use border-t with padding-top

**Duplication:**
- EventCard: `eventCardFooterVariants` with `"border-t border-border"` + DOMAIN_TOKENS.spacing.footer.paddingTop
- VenueCard: `venueCardFooterBorderVariants` with `"border-t border-border"` + DOMAIN_TOKENS.spacing.footer.paddingTop
- ArtistCard: `artistCardFooterBorderVariants` with ARTIST_TOKENS.footer.border.top + DOMAIN_TOKENS.spacing.footer.paddingTop
- TicketCard: `ticketCardFooterVariants` with `"border-t border-border"` + DOMAIN_TOKENS.spacing.footer.paddingTop

**Simplification:** Extract to CardBaseFooterWrapper or shared utility

### 5. Metadata Rows

**Pattern:** Cards with metadata use flex items-center with horizontal spacing

**Duplication:**
- EventCard: `eventCardMetadataItemVariants` with `"flex items-center"` + DOMAIN_TOKENS.metadata.spacing.horizontal
- VenueCard: `venueCardMetadataRowVariants` with `"flex items-center"` + DOMAIN_TOKENS.metadata.spacing.horizontal
- ArtistCard: `artistCardMetadataItemVariants` with `"flex items-center"` + DOMAIN_TOKENS.metadata.spacing.horizontal

**Simplification:** Extract to shared component or CardBaseContentWrapper extension

### 6. LinkWithCustomVariant Helper

**Pattern:** Multiple cards use LinkWithCustomVariant to apply custom className to Foundation Link

**Duplication:**
- EventCard: LinkWithCustomVariant helper (40+ lines)
- TicketCard: LinkWithCustomVariant helper (40+ lines)
- PromoCard: LinkWithCustomVariant helper (40+ lines)

**Simplification:** Extract to shared utility component

---

## Layout Primitives Usage

### Box Usage

All cards except ProfileCard use `Box` as animation wrapper:
- EventCard: `Box {...animationProps}>`
- VenueCard: `Box {...animationProps}>`
- ArtistCard: `Box {...animationProps}>`
- TicketCard: `Box {...animationProps}>`
- CategoryCard: `Box {...animationProps}>`
- PromoCard: `Box {...animationProps}>`

**Note:** This is acceptable as Box is used for animation wrapper, not layout logic inside the card.

### Stack/Inset Usage

- **EventCard:** None (uses CardBaseContentWrapper which uses Stack internally)
- **VenueCard:** None (uses CardBaseContentWrapper which uses Stack internally)
- **ArtistCard:** None (uses CardBaseContentWrapper which uses Stack internally)
- **TicketCard:** None (uses CardBaseContentWrapper which uses Stack internally)
- **CategoryCard:** None (uses CardBaseContentWrapper which uses Stack internally)
- **PromoCard:** None (uses CardBaseContentWrapper which uses Stack internally)
- **ProfileCard:** None (uses CardBody directly)

**Status:** ✅ No layout primitives used inside domain cards (all use CardBase wrappers)

---

## Hardcoded Values Summary

### Common Hardcoded Classes

1. `"group relative"` - Used in all CardBase cards (6 cards)
2. `"absolute z-10"` - Used for badge positioning (6 cards)
3. `"relative w-full overflow-hidden"` - Used in image containers (6 cards)
4. `"h-full w-full"` or `"h-full w-full object-cover"` - Used for images (6 cards)
5. `"absolute inset-0 opacity-0 group-hover:opacity-100"` - Used for image overlays (6 cards)
6. `"border-t border-border"` - Used in footer borders (4 cards)
7. `"flex items-center"` - Used in metadata rows (3 cards)
8. `"w-full"` - Used in footer wrappers (4 cards)

### Card-Specific Hardcoded Values

- **EventCard:** `"text-right"` for price display
- **ProfileCard:** `"shadow-md"`, `"p-md"`, avatar placeholder classes
- **TicketCard:** Badge Y positioning helpers, `"flex items-center justify-between"` in footer
- **PromoCard:** `font-semibold` in badge (should use TEXT_TOKENS)

---

## Next Steps

1. Create duplication map document (DOMAIN_CARDS_DUPLICATION_MAP.md)
2. Analyze simplification opportunities for each card
3. Create decisions document (DOMAIN_CARDS_DECISIONS.md)
4. Apply simplifications while maintaining visual output






