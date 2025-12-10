# L3_S8 — PromoCard Migration Report

**Date:** 2025-12-09  
**Task:** L3_S8 — PromoCard Migration to CardBase + DOMAIN_TOKENS  
**Type:** Component Migration  
**Status:** ✅ COMPLETED

---

## Executive Summary

Successfully created PromoCard component using CardBase layout system and DOMAIN_TOKENS for all styling. The component follows a token-driven architecture with CVA variants, using BUTTON_TOKENS for CTA button styling. All visual styling uses token-based values with zero Tailwind visual utilities.

---

## Prerequisites Verification

✅ **CardBase Component** - Verified at `src/components/cards/CardBase/`

- CardBase root component with size and variant props
- CardBaseImageWrapper, CardBaseContentWrapper, CardBaseFooterWrapper layout wrappers
- CVA variants using DOMAIN_TOKENS

✅ **DOMAIN_TOKENS** - Verified at `src/tokens/components/domain.ts`

- Complete token system with surface, layout, image, metadata, badges, priceCapacity, motion, skeleton sections
- All tokens use Tailwind utility classes mapped to foundation tokens

✅ **BUTTON_TOKENS** - Verified at `src/tokens/components/button.ts`

- Complete button token system with height, padding, radius, fontSize, variant, transition tokens
- Used for CTA button styling in PromoCard

---

## Migration Steps Completed

### 1. File Structure Created

**New files:**

- `src/components/cards/PromoCard/PromoCard.tsx` - Main component
- `src/components/cards/PromoCard/PromoCard.types.ts` - TypeScript types
- `src/components/cards/PromoCard/PromoCard.variants.ts` - CVA variants
- `src/components/cards/PromoCard/PromoCard.stories.tsx` - Storybook stories
- `src/components/cards/PromoCard/index.ts` - Barrel exports

### 2. Component Implementation

**Layout structure:**

- Uses `CardBase` as root container with size and variant props
- Uses `CardBaseImageWrapper` for image section with DOMAIN_TOKENS.image.\*
- Uses `CardBaseContentWrapper` for title and description
- Uses `CardBaseFooterWrapper` for CTA button

**Token usage:**

- All spacing → `DOMAIN_TOKENS.layout.*`
- All colors → `DOMAIN_TOKENS.metadata.text.*`, `DOMAIN_TOKENS.badges.*`
- All shadows → `DOMAIN_TOKENS.surface.shadow.*`, `DOMAIN_TOKENS.badges.shadow`
- All radius → `DOMAIN_TOKENS.surface.radius.*`, `DOMAIN_TOKENS.image.radius`, `DOMAIN_TOKENS.badges.radius`
- All motion → `DOMAIN_TOKENS.motion.hover.*`
- All typography → `TEXT_TOKENS.fontSize.*`, `TEXT_TOKENS.fontWeight.*`
- All icons → `ICON_TOKENS.sizes.*`, `ICON_TOKENS.colors.*`
- CTA button → `BUTTON_TOKENS.*` (height, padding, radius, fontSize, variant, transition)

### 3. CVA Variants Created

**Variants implemented:**

- `promoCardBadgeVariants` - Badge positioning (size: default/compact)
- `promoCardBadgeSurfaceVariants` - Badge surface styling (variant: default/featured)
- `promoCardCtaButtonVariants` - CTA button styling using BUTTON_TOKENS (size: default/compact)
- `promoCardCtaButtonIconVariants` - CTA button icon styling (size: default/compact)

**Component props:**

- `size?: "default" | "compact"` - Controls padding and spacing
- `variant?: "default" | "featured"` - Controls visual appearance (maps to `featured` boolean)

### 4. Storybook Stories Created

**Stories implemented:**

- Default (size="default", variant="default")
- Compact (size="compact")
- Featured (variant="featured")
- Compact + Featured combination
- With image
- With CTA URL
- Without image
- With href link
- All variants showcase

**Controls configured:**

- size: select (default, compact)
- variant: select (default, featured)
- All PromoCard props documented

### 5. Exports Updated

**Barrel exports:**

- `src/components/cards/PromoCard/index.ts` - Component and type exports
- `src/components/cards/index.ts` - Added PromoCard to cards barrel exports
- `src/index.ts` - Added PromoCard to DOMAIN COMPONENTS section

---

## Token Usage Mapping

### Component Token Usage

| Token Category            | Usage                                                                       |
| ------------------------- | --------------------------------------------------------------------------- |
| `DOMAIN_TOKENS.surface.*` | Card container background, border, radius, shadow, elevation                |
| `DOMAIN_TOKENS.layout.*`  | Card padding and gap (default/compact variants)                             |
| `DOMAIN_TOKENS.image.*`   | Image aspect ratio, radius, overlay gradient                                |
| `DOMAIN_TOKENS.badges.*`  | Featured badge styling (size, surface, text, radius, shadow)                |
| `DOMAIN_TOKENS.motion.*`  | Hover transitions and scale effects                                         |
| `TEXT_TOKENS.*`           | Typography (fontSize, fontWeight) for title and description                 |
| `ICON_TOKENS.*`           | Icon sizes and colors                                                       |
| `BUTTON_TOKENS.*`         | CTA button styling (height, padding, radius, fontSize, variant, transition) |

### CTA Button Token Usage

**BUTTON_TOKENS usage:**

- `BUTTON_TOKENS.height.md` / `BUTTON_TOKENS.height.sm` - Button height (default/compact)
- `BUTTON_TOKENS.padding.horizontal.md` / `BUTTON_TOKENS.padding.horizontal.sm` - Horizontal padding
- `BUTTON_TOKENS.padding.vertical.sm` - Vertical padding
- `BUTTON_TOKENS.radius` - Border radius
- `BUTTON_TOKENS.fontSize.md` / `BUTTON_TOKENS.fontSize.sm` - Font size
- `BUTTON_TOKENS.variant.primary.*` - Primary button variant (background, text, hover)
- `BUTTON_TOKENS.shadow.primary` - Button shadow
- `BUTTON_TOKENS.transition.colors` - Color transition

---

## CVA Variants Documentation

### Size Variants

**default:**

- Padding: `DOMAIN_TOKENS.layout.padding.default` (p-md)
- Gap: `DOMAIN_TOKENS.layout.gap.default` (gap-md)
- Badge position: `right-3 top-3`
- CTA button: `BUTTON_TOKENS.height.md`, `BUTTON_TOKENS.padding.horizontal.md`, `BUTTON_TOKENS.fontSize.md`

**compact:**

- Padding: `DOMAIN_TOKENS.layout.padding.compact` (p-sm)
- Gap: `DOMAIN_TOKENS.layout.gap.compact` (gap-xs)
- Badge position: `right-2 top-2`
- CTA button: `BUTTON_TOKENS.height.sm`, `BUTTON_TOKENS.padding.horizontal.sm`, `BUTTON_TOKENS.fontSize.sm`

### Style Variants

**default:**

- Standard card appearance
- No featured badge styling

**featured:**

- Featured badge with gradient: `DOMAIN_TOKENS.badges.surface.featured`
- CardBase variant applies featured styling

---

## File Structure

### New Structure

```
src/components/cards/PromoCard/
├── PromoCard.tsx           # Main component
├── PromoCard.types.ts      # TypeScript types
├── PromoCard.variants.ts   # CVA variants
├── PromoCard.stories.tsx   # Storybook stories
└── index.ts                # Barrel exports
```

---

## Component Props

**PromoCardProps interface:**

- `title: string` - Promo title (required)
- `description?: string` - Promo description (optional)
- `imageUrl?: string` - Promo image URL (optional)
- `href?: string` - Link URL for promo details (optional)
- `ctaUrl?: string` - CTA button URL (optional)
- `ctaLabel: string` - CTA button label (required)
- `featured?: boolean` - Whether this is a featured promo (default: false)
- `featuredBadgeText?: string` - Badge text for featured promos (optional)
- `showImage?: boolean` - Show image section (default: true)
- `size?: "default" | "compact"` - Size variant
- `variant?: "default" | "featured"` - Style variant
- `className?: string` - Additional CSS classes
- `animation?: ComponentAnimationConfig` - Animation configuration

---

## Key Differences from Other Cards

**PromoCard specific features:**

1. **CTA Button** - Uses BUTTON_TOKENS instead of DOMAIN_TOKENS.badges for button styling
2. **Simplified Content** - No metadata rows (date, venue, etc.) - just title, description, and CTA
3. **Promotional Focus** - Designed specifically for promotional content with clear call-to-action

**Shared patterns:**

- Uses CardBase layout system
- Uses DOMAIN_TOKENS for card styling
- Follows same CVA variant pattern
- Uses same animation system
- Follows same prop structure pattern

---

## Restrictions Compliance

✅ **Do NOT modify tokens** - No modifications to DOMAIN_TOKENS or BUTTON_TOKENS

✅ **Do NOT modify CardBase** - CardBase component unchanged

✅ **Do NOT use Tailwind visual utilities** - All styling through tokens

✅ **Use BUTTON_TOKENS for CTA** - CTA button uses BUTTON_TOKENS as required

---

## Testing Status

✅ **TypeScript:** All type checks pass  
✅ **ESLint:** No errors  
✅ **Build:** Successful build  
✅ **Storybook:** All stories render correctly

---

## Acceptance Criteria Verification

✅ **Clean, token-driven** - All styling uses tokens, no hardcoded values

✅ **No duplication with other cards** - Follows same pattern but promo-specific (simpler content, BUTTON_TOKENS for CTA)

✅ **TypeScript compilation successful** - All types properly defined

✅ **Linting passes** - No linting errors

✅ **Build successful** - Component builds without errors

✅ **Storybook stories created** - Comprehensive stories with all variants

✅ **Report generated** - This report documents the migration

✅ **Master tasks updated** - Next step set to L3_S9

---

## Next Steps

**L3_S9 — CategoryCard Migration**

- Follow same structure as L3_S8
- Use CardBase and DOMAIN_TOKENS
- Create CVA variants
- Implement minimal layout using CardBase
- Create icon+text token structure
- Add hover animation (scale micro-motion)

---

## Notes

- CTA button uses BUTTON_TOKENS.primary variant for consistent button styling
- Badge positioning uses layout utilities (`absolute`, `right-3`, `top-3`) which are acceptable as they're layout, not visual utilities
- IconArrowRight component reused from EventCard (already exists in icon registry)
- Component follows the same pattern as EventCard/VenueCard but simplified for promotional content
- All gradient colors use DOMAIN_TOKENS (badge gradient from DOMAIN_TOKENS.badges.surface.featured)

---

**Status:** ✅ COMPLETED  
**Next Task:** L3_S9 — CategoryCard Migration
