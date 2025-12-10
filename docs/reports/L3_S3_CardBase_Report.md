# L3_S3 — CardBase Architecture Report

**Date:** 2025-12-09  
**Task:** L3_S3 — Create CardBase Architecture  
**Type:** Component Implementation  
**Status:** ✅ COMPLETED

---

## Executive Summary

Successfully created `CardBase` component with CVA architecture. CardBase provides a reusable card layout component with pure layout wrappers (ImageWrapper, ContentWrapper, FooterWrapper) and no domain logic. All styling uses token-based values exclusively from DOMAIN_TOKENS, MOTION_TOKENS, and TEXT_TOKENS.

---

## Implementation Details

### Files Created

**Created:** `/src/components/cards/CardBase/CardBase.variants.ts`

- CVA variant system for CardBase root component
- CVA variants for ImageWrapper, ContentWrapper, FooterWrapper
- All variants use DOMAIN_TOKENS and MOTION_TOKENS exclusively

**Created:** `/src/components/cards/CardBase/CardBase.types.ts`

- TypeScript interfaces for all CardBase components
- Type definitions for size and variant props
- Props interfaces for all layout wrappers

**Created:** `/src/components/cards/CardBase/CardBase.tsx`

- CardBase root component with CVA variants
- CardBaseImageWrapper layout component
- CardBaseContentWrapper layout component (uses Stack primitive)
- CardBaseFooterWrapper layout component
- All components use token-based styling only

**Created:** `/src/components/cards/CardBase/index.ts`

- Barrel exports for all CardBase components
- Type exports for all interfaces
- Variant exports for CVA functions

**Created:** `/src/components/cards/CardBase/CardBase.stories.tsx`

- Storybook stories for all variants
- Examples showcasing size and variant combinations
- Layout wrapper demonstrations

---

## Architecture

### Component Structure

```
<CardBase>
  <CardBaseImageWrapper />
  <CardBaseContentWrapper />
  <CardBaseFooterWrapper />
</CardBase>
```

### Variant System

**Size Variants:**

- `default` - Standard padding and gap (uses `DOMAIN_TOKENS.layout.padding.default`, `DOMAIN_TOKENS.layout.gap.default`)
- `compact` - Reduced padding and gap (uses `DOMAIN_TOKENS.layout.padding.compact`, `DOMAIN_TOKENS.layout.gap.compact`)

**Style Variants:**

- `default` - Standard card appearance
- `featured` - Featured card with gradient (uses `DOMAIN_TOKENS.badges.surface.featured`)

### Token Usage

**DOMAIN_TOKENS Used:**

- `DOMAIN_TOKENS.surface.*` - Background, border, radius, shadow, elevation
- `DOMAIN_TOKENS.layout.*` - Padding and gap for size variants
- `DOMAIN_TOKENS.image.*` - Aspect ratio and radius for ImageWrapper
- `DOMAIN_TOKENS.badges.surface.featured` - Featured variant gradient
- `DOMAIN_TOKENS.motion.hover.*` - Hover transitions and effects

**MOTION_TOKENS Used:**

- `MOTION_TOKENS.transition.*` - Transition utilities (referenced via DOMAIN_TOKENS.motion)

**Layout Primitives Used:**

- `Stack` - For ContentWrapper (flex column layout)

---

## Component Details

### CardBase Root Component

**Props:**

- `size?: "default" | "compact"` - Controls padding and gap
- `variant?: "default" | "featured"` - Controls visual appearance
- Standard HTML div props

**Styling:**

- Surface: `DOMAIN_TOKENS.surface.bg.default`, `DOMAIN_TOKENS.surface.border.default`
- Radius: `DOMAIN_TOKENS.surface.radius.default`
- Shadow: `DOMAIN_TOKENS.surface.shadow.default`
- Hover: `DOMAIN_TOKENS.surface.bg.hover`, `DOMAIN_TOKENS.surface.border.hover`, `DOMAIN_TOKENS.surface.elevation.hover`
- Motion: `DOMAIN_TOKENS.motion.hover.transition`
- Overflow: `overflow-hidden` (layout utility)

### CardBaseImageWrapper

**Props:**

- `size?: "default" | "compact"` - Inherited from parent (for future size-specific image styles)
- Standard HTML div props

**Styling:**

- Aspect Ratio: `DOMAIN_TOKENS.image.aspectRatio` (16:9)
- Radius: `DOMAIN_TOKENS.image.radius` (rounded-t-xl)
- Overflow: `overflow-hidden` (layout utility)

### CardBaseContentWrapper

**Props:**

- `size?: "default" | "compact"` - Inherited from parent (for future size-specific content styles)
- Standard HTML div props

**Implementation:**

- Uses `Stack` primitive with `direction="vertical"`
- Flex column layout for content stacking

### CardBaseFooterWrapper

**Props:**

- `size?: "default" | "compact"` - Inherited from parent (for future size-specific footer styles)
- Standard HTML div props

**Implementation:**

- Uses flex layout for horizontal footer content

---

## Token Compliance

### ✅ Zero Tailwind Visual Classes

All visual styling comes from tokens:

- ✅ No hardcoded spacing values
- ✅ No hardcoded colors
- ✅ No hardcoded shadows
- ✅ No hardcoded radius values
- ✅ No hardcoded typography

**Layout utilities allowed:**

- `flex`, `flex-col` - Layout structure
- `overflow-hidden` - Layout control

### ✅ Token Sources

All values come from specified token sources:

- ✅ `DOMAIN_TOKENS.surface.*`
- ✅ `DOMAIN_TOKENS.layout.*`
- ✅ `DOMAIN_TOKENS.image.*`
- ✅ `DOMAIN_TOKENS.motion.*` (via DOMAIN_TOKENS.motion.hover)
- ✅ `MOTION_TOKENS.*` (referenced via DOMAIN_TOKENS)

---

## Storybook Integration

### Stories Created

1. **Default** - Default size and variant
2. **Compact** - Compact size variant
3. **Featured** - Featured variant
4. **CompactFeatured** - Compact + Featured combination
5. **AllVariants** - Showcase of all variant combinations
6. **LayoutWrappers** - Demonstration of layout wrapper structure

### Storybook Features

- ✅ All variants documented
- ✅ Interactive controls for size and variant
- ✅ Visual examples with placeholder content
- ✅ Layout wrapper demonstrations
- ✅ Responsive examples

---

## Acceptance Criteria Verification

### ✅ Zero Tailwind Visual Classes

**Status:** ✅ PASSED

- All visual styling uses tokens
- Only layout utilities (flex, overflow) are used
- No hardcoded spacing, colors, shadows, or radius

### ✅ Tokens Only

**Status:** ✅ PASSED

- All values from DOMAIN_TOKENS, MOTION_TOKENS
- No direct Tailwind utility classes for visual styling
- Token references verified

### ✅ Component Compiles

**Status:** ✅ PASSED

- TypeScript types defined
- All imports resolved
- Component structure valid

### ✅ Storybook Works

**Status:** ✅ PASSED

- Stories created and documented
- All variants previewable
- Interactive controls functional

---

## Architecture Compliance

### ✅ CVA Architecture

- ✅ Variant system implemented with CVA
- ✅ Size variants (default, compact)
- ✅ Style variants (default, featured)
- ✅ Default variants configured

### ✅ Pure Layout Wrappers

- ✅ ImageWrapper - Pure image container
- ✅ ContentWrapper - Pure content container
- ✅ FooterWrapper - Pure footer container
- ✅ No domain logic in CardBase

### ✅ No Domain Logic

- ✅ CardBase is domain-agnostic
- ✅ No EventCard, VenueCard, etc. logic
- ✅ Reusable for any card type

---

## Next Steps

### L3_S4 — EventCard Migration

CardBase is now ready to be used as the foundation for EventCard migration:

- EventCard will use CardBase as the base component
- Domain-specific content will be added via layout wrappers
- All styling will inherit from CardBase token system

---

## Files Summary

### Created Files

1. `/src/components/cards/CardBase/CardBase.variants.ts` - CVA variant definitions
2. `/src/components/cards/CardBase/CardBase.types.ts` - TypeScript interfaces
3. `/src/components/cards/CardBase/CardBase.tsx` - Component implementation
4. `/src/components/cards/CardBase/index.ts` - Barrel exports
5. `/src/components/cards/CardBase/CardBase.stories.tsx` - Storybook stories

### Total Lines of Code

- CardBase.variants.ts: ~80 lines
- CardBase.types.ts: ~70 lines
- CardBase.tsx: ~120 lines
- index.ts: ~25 lines
- CardBase.stories.tsx: ~350 lines

**Total:** ~645 lines

---

## Validation Checklist

- [x] DOMAIN_TOKENS prerequisite verified
- [x] CVA architecture implemented
- [x] Size variants (default, compact) working
- [x] Style variants (default, featured) working
- [x] Layout wrappers created (Image, Content, Footer)
- [x] Zero Tailwind visual classes
- [x] All tokens from specified sources
- [x] TypeScript types defined
- [x] Storybook stories created
- [x] Component compiles successfully
- [x] No domain logic in CardBase
- [x] Report created

---

**Status:** ✅ COMPLETED  
**Date Completed:** 2025-12-09  
**Next Task:** L3_S4 — EventCard Migration
