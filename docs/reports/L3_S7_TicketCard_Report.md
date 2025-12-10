# L3_S7 — TicketCard Migration Report

**Date:** 2025-12-09  
**Task:** L3_S7 — TicketCard Migration to CardBase + DOMAIN_TOKENS  
**Type:** Component Migration  
**Status:** ✅ COMPLETED

---

## Executive Summary

Successfully migrated TicketCard component to use CardBase layout system and DOMAIN_TOKENS for all styling. The component now follows a token-driven architecture with CVA variants, eliminating all hardcoded Tailwind classes. TicketCard includes price/capacity layout using DOMAIN_TOKENS.priceCapacity.\*, availability indicators, and VIP/discount badge support.

---

## Prerequisites Verification

✅ **L3_S2 (DOMAIN_TOKENS)** - Verified at `src/tokens/components/domain.ts`

- Complete token system with surface, layout, image, metadata, badges, priceCapacity, motion, skeleton sections
- All tokens use Tailwind utility classes mapped to foundation tokens
- `DOMAIN_TOKENS.priceCapacity.*` available for price/capacity displays

✅ **L3_S3 (CardBase)** - Verified at `src/components/cards/CardBase/`

- CardBase root component with size and variant props
- CardBaseImageWrapper, CardBaseContentWrapper, CardBaseFooterWrapper layout wrappers
- CVA variants using DOMAIN_TOKENS

✅ **EventCard Pattern** - Reference implementation available at `src/components/cards/EventCard/`

---

## Migration Steps Completed

### 1. File Structure Created

**New files:**

- `src/components/cards/TicketCard/TicketCard.tsx` - Main component
- `src/components/cards/TicketCard/TicketCard.types.ts` - TypeScript types
- `src/components/cards/TicketCard/TicketCard.variants.ts` - CVA variants
- `src/components/cards/TicketCard/index.ts` - Barrel exports
- `src/components/cards/TicketCard/TicketCard.stories.tsx` - Storybook stories

**Legacy files:**

- None found (TicketCard did not exist prior to migration)

### 2. Component Implementation

**Layout migration:**

- Uses `CardBase` root component with size and variant props
- Uses `CardBaseImageWrapper` for image section
- Uses `CardBaseContentWrapper` for title, description, price/capacity, availability
- Uses `CardBaseFooterWrapper` for purchase button section

**Token replacements:**

- All spacing → `DOMAIN_TOKENS.layout.*`, `DOMAIN_TOKENS.metadata.spacing.*`
- All colors → `DOMAIN_TOKENS.priceCapacity.text.*`, `DOMAIN_TOKENS.metadata.text.*`, `DOMAIN_TOKENS.badges.*`
- All shadows → `DOMAIN_TOKENS.surface.shadow.*`, `DOMAIN_TOKENS.badges.shadow`
- All radius → `DOMAIN_TOKENS.surface.radius.*`, `DOMAIN_TOKENS.image.radius`, `DOMAIN_TOKENS.badges.radius`
- All motion → `DOMAIN_TOKENS.motion.hover.*`
- All typography → `TEXT_TOKENS.fontSize.*`, `TEXT_TOKENS.fontWeight.*`
- All icons → `ICON_TOKENS.sizes.*`, `ICON_TOKENS.colors.*`
- **Price/Capacity layout** → `DOMAIN_TOKENS.priceCapacity.spacing`, `DOMAIN_TOKENS.priceCapacity.text.*`

### 3. CVA Variants Created

**Variants implemented:**

- `ticketCardBadgeVariants` - Badge positioning (size: default/compact)
- `ticketCardBadgeSurfaceVariants` - Badge surface styling (variant: default/featured/vip/discount)
- `ticketCardPriceCapacityContainerVariants` - Container for price/capacity layout using `DOMAIN_TOKENS.priceCapacity.spacing`
- `ticketCardPriceVariants` - Price text styling using `DOMAIN_TOKENS.priceCapacity.text.primary`
- `ticketCardCapacityVariants` - Capacity text styling using `DOMAIN_TOKENS.priceCapacity.text.secondary`
- `ticketCardAvailabilityVariants` - Availability indicator styling (available/sold_out/available_soon)
- `ticketCardFooterVariants` - Footer section (size: default/compact)
- `ticketCardPurchaseButtonVariants` - Purchase button styling with disabled state support
- `ticketCardPurchaseButtonIconVariants` - Purchase button icon (size: default/compact)

**Component props:**

- `size?: "default" | "compact"` - Controls padding and spacing
- `variant?: "default" | "featured"` - Controls visual appearance (maps to `featured` boolean)
- `availability?: "available" | "sold_out" | "available_soon"` - Availability status
- `vipBadgeText?: string` - VIP badge text
- `discountBadgeText?: string` - Discount badge text

### 4. Price/Capacity Layout Implementation

**Using DOMAIN_TOKENS.priceCapacity.\*:**

- Price text uses `DOMAIN_TOKENS.priceCapacity.text.primary`
- Capacity text uses `DOMAIN_TOKENS.priceCapacity.text.secondary`
- Container spacing uses `DOMAIN_TOKENS.priceCapacity.spacing`
- Layout follows unified metadata pricing block pattern

### 5. Availability Indicators

**Implemented states:**

- `available` - Default state, purchase button enabled
- `sold_out` - Disabled state with "Sold Out" indicator using tokenized styling
- `available_soon` - Coming soon state with disabled button and "Available Soon" indicator

All states use tokenized styling from `DOMAIN_TOKENS.metadata.text.*` with appropriate opacity for disabled states.

### 6. Badge System

**Badge types supported:**

- **Featured badge** - Uses `DOMAIN_TOKENS.badges.surface.featured`
- **VIP badge** - Uses `DOMAIN_TOKENS.badges.surface.featured` (shared gradient)
- **Discount badge** - Uses `DOMAIN_TOKENS.badges.surface.default`

All badges use tokenized styling from `DOMAIN_TOKENS.badges.*` for size, radius, shadow, and text color.

### 7. Storybook Stories Created

**Stories implemented:**

- Default (size="default", variant="default")
- Compact (size="compact")
- Featured (variant="featured")
- With VIP badge
- With discount badge
- Available status
- Sold out status
- Available soon status
- With price and capacity
- With image
- Minimal (no optional props)
- Compact + Featured combination
- With multiple badges
- With href link
- All variants showcase

**Controls configured:**

- size: select (default, compact)
- variant: select (default, featured)
- availability: select (available, sold_out, available_soon)
- All TicketCard props

### 8. Exports Updated

**Barrel exports:**

- `src/components/cards/TicketCard/index.ts` - Component and type exports
- `src/components/cards/index.ts` - Added TicketCard to card components barrel exports
- `src/index.ts` - Added TicketCard to DOMAIN COMPONENTS section

---

## Token Usage Mapping

### Key Token Replacements

| Feature                | Token Used                                   |
| ---------------------- | -------------------------------------------- |
| Price text color       | `DOMAIN_TOKENS.priceCapacity.text.primary`   |
| Capacity text color    | `DOMAIN_TOKENS.priceCapacity.text.secondary` |
| Price/capacity spacing | `DOMAIN_TOKENS.priceCapacity.spacing`        |
| Layout padding         | `DOMAIN_TOKENS.layout.padding.*`             |
| Layout gaps            | `DOMAIN_TOKENS.layout.gap.*`                 |
| Metadata spacing       | `DOMAIN_TOKENS.metadata.spacing.*`           |
| Badge surfaces         | `DOMAIN_TOKENS.badges.surface.*`             |
| Badge sizing           | `DOMAIN_TOKENS.badges.size.*`                |
| Badge radius           | `DOMAIN_TOKENS.badges.radius`                |
| Badge shadow           | `DOMAIN_TOKENS.badges.shadow`                |
| Surface shadows        | `DOMAIN_TOKENS.surface.shadow.*`             |
| Image radius           | `DOMAIN_TOKENS.image.radius`                 |
| Image overlay          | `DOMAIN_TOKENS.image.overlay.gradient`       |
| Motion transitions     | `DOMAIN_TOKENS.motion.hover.transition`      |
| Motion scale           | `DOMAIN_TOKENS.motion.hover.scale`           |
| Typography sizes       | `TEXT_TOKENS.fontSize.*`                     |
| Typography weights     | `TEXT_TOKENS.fontWeight.*`                   |
| Icon sizes             | `ICON_TOKENS.sizes.*`                        |
| Icon colors            | `ICON_TOKENS.colors.*`                       |

---

## Compliance Checklist

✅ **100% token-driven** - All visual styling uses tokens, no hardcoded Tailwind utilities for colors, spacing, shadows, etc.

✅ **Structure via CardBase only** - Component uses CardBase and layout wrappers exclusively

✅ **All variants implemented** - Size variants (default/compact) and style variants (default/featured)

✅ **Price/capacity uses DOMAIN_TOKENS.priceCapacity.\*** - Price and capacity text, spacing all tokenized

✅ **Availability indicators tokenized** - All availability states use tokenized styling

✅ **VIP/discount badges tokenized** - All badge styling uses DOMAIN_TOKENS.badges.\*

✅ **Storybook stories complete** - Comprehensive coverage of all variants and states

✅ **TypeScript compilation passes** - No type errors

✅ **Linting passes** - No linting errors

✅ **Build succeeds** - Production build completes successfully

---

## Component API

### TicketCardProps

```typescript
interface TicketCardProps {
  title: string; // Ticket type/name (pre-localized)
  description?: string; // Ticket description (optional)
  price?: string; // Price display string (e.g., "€20")
  capacity?: string; // Capacity display string (e.g., "50 tickets left")
  availability?: "available" | "sold_out" | "available_soon";
  imageUrl?: string; // Image URL (optional)
  href?: string; // Link URL for ticket details (optional)
  purchaseUrl?: string; // Purchase action URL (optional)
  purchaseLabel: string; // Label for purchase button (required)
  vipBadgeText?: string; // VIP badge text (optional)
  discountBadgeText?: string; // Discount badge text (optional)
  featured?: boolean; // Whether this is a featured ticket
  featuredBadgeText?: string; // Badge text for featured tickets (optional)
  showImage?: boolean; // Show image section
  size?: "default" | "compact"; // Size variant
  variant?: "default" | "featured"; // Style variant
  className?: string; // Additional CSS classes
  animation?: ComponentAnimationConfig; // Animation configuration
}
```

---

## Next Steps

✅ **L3_S7 Completed** - TicketCard migration complete

🔄 **Next Task: L3_S8** - PromoCard Migration

---

## Files Changed

### Created

- `src/components/cards/TicketCard/TicketCard.tsx`
- `src/components/cards/TicketCard/TicketCard.types.ts`
- `src/components/cards/TicketCard/TicketCard.variants.ts`
- `src/components/cards/TicketCard/TicketCard.stories.tsx`
- `src/components/cards/TicketCard/index.ts`
- `docs/reports/L3_S7_TicketCard_Report.md`

### Modified

- `src/components/cards/index.ts` - Added TicketCard exports
- `src/index.ts` - Added TicketCard to DOMAIN COMPONENTS section

---

**Status:** ✅ COMPLETED  
**Date Completed:** 2025-12-09
