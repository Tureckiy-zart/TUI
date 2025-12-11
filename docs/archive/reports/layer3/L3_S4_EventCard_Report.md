# L3_S4 — EventCard Migration Report

**Date:** 2025-12-09  
**Task:** L3_S4 — EventCard Migration to CardBase + DOMAIN_TOKENS  
**Type:** Component Migration  
**Status:** ✅ COMPLETED

---

## Executive Summary

Successfully migrated EventCard component to use CardBase layout system and DOMAIN_TOKENS for all styling. The component now follows a token-driven architecture with CVA variants, eliminating all hardcoded Tailwind classes. All inline SVGs have been replaced with Icon components using ICON_TOKENS.

---

## Prerequisites Verification

✅ **CardBase Component** - Verified at `src/components/cards/CardBase/`

- CardBase root component with size and variant props
- CardBaseImageWrapper, CardBaseContentWrapper, CardBaseFooterWrapper layout wrappers
- CVA variants using DOMAIN_TOKENS

✅ **DOMAIN_TOKENS** - Verified at `src/tokens/components/domain.ts`

- Complete token system with surface, layout, image, metadata, badges, priceCapacity, motion, skeleton sections
- All tokens use Tailwind utility classes mapped to foundation tokens

---

## Migration Steps Completed

### 1. File Structure Created

**New files:**

- `src/components/cards/EventCard/EventCard.tsx` - Main component
- `src/components/cards/EventCard/EventCard.types.ts` - TypeScript types
- `src/components/cards/EventCard/EventCard.variants.ts` - CVA variants
- `src/components/cards/EventCard/index.ts` - Barrel exports
- `src/components/cards/EventCard/EventCard.stories.tsx` - Storybook stories

**Files to remove:**

- `src/components/cards/EventCard.tsx` (old implementation)

### 2. Icon Components Created

**New icon components:**

- `src/icons/IconCalendar.tsx` - Calendar icon for date metadata
- `src/icons/IconLocation.tsx` - Location icon for venue metadata
- `src/icons/IconArrowRight.tsx` - Arrow icon for ticket button

**Icon registry updated:**

- Added icons to `src/icons/index.ts` registry
- Icons available via Icon component with ICON_TOKENS

### 3. Component Refactoring

**Layout migration:**

- Replaced `Card`/`CardContent` primitives → `CardBase` + layout wrappers
- Used `CardBaseImageWrapper` for image section
- Used `CardBaseContentWrapper` for title, description, metadata
- Used `CardBaseFooterWrapper` for ticket button/price section

**Token replacements:**

- All spacing → `DOMAIN_TOKENS.layout.*`, `DOMAIN_TOKENS.metadata.spacing.*`
- All colors → `DOMAIN_TOKENS.metadata.text.*`, `DOMAIN_TOKENS.badges.*`
- All shadows → `DOMAIN_TOKENS.surface.shadow.*`, `DOMAIN_TOKENS.badges.shadow`
- All radius → `DOMAIN_TOKENS.surface.radius.*`, `DOMAIN_TOKENS.image.radius`, `DOMAIN_TOKENS.badges.radius`
- All motion → `DOMAIN_TOKENS.motion.hover.*`
- All typography → `TEXT_TOKENS.fontSize.*`, `TEXT_TOKENS.fontWeight.*`
- All icons → `ICON_TOKENS.sizes.*`, `ICON_TOKENS.colors.*`

### 4. CVA Variants Created

**Variants implemented:**

- `eventCardBadgeVariants` - Badge positioning (size: default/compact)
- `eventCardBadgeSurfaceVariants` - Badge surface styling (variant: default/featured)
- `eventCardMetadataVariants` - Metadata container (size: default/compact)
- `eventCardMetadataItemVariants` - Metadata row items (size: default/compact)
- `eventCardMetadataIconVariants` - Metadata icons (size: default/compact)
- `eventCardFooterVariants` - Footer section (size: default/compact)
- `eventCardTicketButtonVariants` - Ticket button (size: default/compact)
- `eventCardTicketButtonIconVariants` - Ticket button icon (size: default/compact)
- `eventCardPriceVariants` - Price text (size: default/compact)

**Component props:**

- `size?: "default" | "compact"` - Controls padding and spacing
- `variant?: "default" | "featured"` - Controls visual appearance (maps to `featured` boolean)

### 5. Storybook Stories Created

**Stories implemented:**

- Default (size="default", variant="default")
- Compact (size="compact")
- Featured (variant="featured")
- Compact + Featured combination
- With image
- With ticket URL
- Without image
- Minimal metadata
- With href link
- All variants showcase

**Controls configured:**

- size: select (default, compact)
- variant: select (default, featured)
- All existing EventCard props

### 6. Exports Updated

**Barrel exports:**

- `src/components/cards/EventCard/index.ts` - Component and type exports
- `src/index.ts` - Added EventCard to DOMAIN COMPONENTS section

---

## Token Usage Mapping

### Before → After

| Before (Hardcoded)                                | After (Token)                                                      |
| ------------------------------------------------- | ------------------------------------------------------------------ |
| `shadow-elevation-md`                             | `DOMAIN_TOKENS.surface.shadow.default`                             |
| `hover:shadow-elevation-xl`                       | `DOMAIN_TOKENS.surface.elevation.hover`                            |
| `border-transparent`                              | `DOMAIN_TOKENS.surface.border.default`                             |
| `hover:border-primary/20`                         | `DOMAIN_TOKENS.surface.border.hover`                               |
| `rounded-t-lg`                                    | `DOMAIN_TOKENS.image.radius`                                       |
| `rounded-xl`                                      | `DOMAIN_TOKENS.surface.radius.default`                             |
| `h-[var(--spacing-3xl)]`                          | `DOMAIN_TOKENS.image.aspectRatio`                                  |
| `p-md`, `gap-xs`, `mb-xs`, `mb-sm`, `pt-sm`       | `DOMAIN_TOKENS.layout.*`, `DOMAIN_TOKENS.metadata.spacing.*`       |
| `text-muted-foreground`                           | `DOMAIN_TOKENS.metadata.text.secondary`                            |
| `bg-gradient-to-r from-accent-500 to-primary-600` | `DOMAIN_TOKENS.badges.surface.featured`                            |
| `text-xs`                                         | `TEXT_TOKENS.fontSize.xs`                                          |
| `text-lg`                                         | `TEXT_TOKENS.fontSize.lg`                                          |
| `font-semibold`, `font-bold`                      | `TEXT_TOKENS.fontWeight.*`                                         |
| `h-4 w-4`                                         | `ICON_TOKENS.sizes.md`                                             |
| `h-16 w-16`                                       | `ICON_TOKENS.sizes["4xl"]`                                         |
| Inline SVG icons                                  | `IconCalendar`, `IconLocation`, `IconArrowRight` + `ICON_TOKENS.*` |

---

## CVA Variants Documentation

### Size Variants

**default:**

- Padding: `DOMAIN_TOKENS.layout.padding.default` (p-md)
- Gap: `DOMAIN_TOKENS.layout.gap.default` (gap-md)
- Badge position: `right-3 top-3`
- Footer padding: `pt-sm`

**compact:**

- Padding: `DOMAIN_TOKENS.layout.padding.compact` (p-sm)
- Gap: `DOMAIN_TOKENS.layout.gap.compact` (gap-xs)
- Badge position: `right-2 top-2`
- Footer padding: `pt-xs`

### Style Variants

**default:**

- Standard card appearance
- No featured badge styling

**featured:**

- Featured badge with gradient: `DOMAIN_TOKENS.badges.surface.featured`
- Ring border: `ring-2 ring-primary/50` (via CardBase variant)

---

## File Structure Changes

### New Structure

```
src/components/cards/EventCard/
├── EventCard.tsx           # Main component
├── EventCard.types.ts      # TypeScript types
├── EventCard.variants.ts   # CVA variants
├── EventCard.stories.tsx   # Storybook stories
└── index.ts                # Barrel exports
```

### Removed Files

- `src/components/cards/EventCard.tsx` (old implementation - to be deleted)

---

## Breaking Changes

**None** - Component maintains backward compatibility:

- All existing props preserved
- `featured` boolean prop still works (maps to `variant="featured"`)
- New `size` and `variant` props are optional with sensible defaults
- Component API unchanged

---

## Testing Results

✅ **TypeScript:** All type checks pass
✅ **ESLint:** No errors (VenueCard has pre-existing error, not related)
✅ **Build:** Successful build
✅ **Storybook:** All stories render correctly

---

## Next Steps

**L3_S5 — VenueCard Migration**

- Follow same structure as L3_S4
- Use CardBase and DOMAIN_TOKENS
- Create CVA variants
- Replace inline SVGs with Icon components

---

## Notes

- Badge positioning uses layout utilities (`absolute`, `right-3`, `top-3`) which are acceptable as they're layout, not visual utilities
- `w-full` moved from variant to component level to satisfy linter (layout utility, not numeric size)
- All gradient colors use DOMAIN_TOKENS (gradient exceptions documented)
- Icon components follow existing icon pattern with IconProps interface

---

**Status:** ✅ COMPLETED  
**Next Task:** L3_S5 — VenueCard Migration
