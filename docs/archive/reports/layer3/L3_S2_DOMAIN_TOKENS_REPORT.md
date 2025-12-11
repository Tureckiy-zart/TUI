# L3_S2 — DOMAIN_TOKENS Creation Report

**Date:** 2025-12-09  
**Task:** L3_S2 — Define Card Token Structure  
**Type:** Token System Implementation  
**Status:** ✅ COMPLETED

---

## Executive Summary

Successfully created `DOMAIN_TOKENS` system for domain-specific card components (EventCard, VenueCard, ArtistCard, TicketCard, PromoCard, CategoryCard). The token system provides a consistent foundation for all card-related styling, layout, and interaction patterns, addressing all identified gaps from the L3_CARD_AUDIT.md.

---

## Implementation Details

### File Created/Modified

**Modified:** `/src/tokens/components/card.ts`

- Added `DOMAIN_TOKENS` constant with 8 required sections
- Added TypeScript type exports for all token sections
- Maintained existing `CARD_TOKENS` (no modifications)

**Modified:** `/src/tokens/components/index.ts`

- Added exports for `DOMAIN_TOKENS` and all related types

---

## Audit Coverage

### Section 3.2: Missing Token Categories ✅

All missing token categories identified in the audit have been addressed:

#### 1. Metadata Tokens ✅

- **Covered:** `DOMAIN_TOKENS.metadata` section
- **Includes:**
  - Text colors (primary, secondary)
  - Icon colors and sizes
  - Vertical and horizontal spacing tokens
- **Addresses:** Date/time, location, price, capacity, icon+text spacing patterns

#### 2. Badge Tokens ✅

- **Covered:** `DOMAIN_TOKENS.badges` section
- **Includes:**
  - Size variants (sm, md)
  - Surface styles (default, featured gradient)
  - Text colors
  - Border radius (pill shape)
  - Positioning tokens (absolute positioning)
  - Shadow tokens
- **Addresses:** Featured badge, popular badge, badge positioning requirements

#### 3. Image Tokens ✅

- **Covered:** `DOMAIN_TOKENS.image` section
- **Includes:**
  - Aspect ratio (16:9 standard)
  - Border radius
  - Overlay gradient tokens
- **Addresses:** Image container height, aspect ratio, overlay gradient requirements

#### 4. Action Button Tokens ⚠️

- **Note:** Action button tokens are deferred to L3_S3 CardBase implementation
- **Rationale:** Card CTA buttons will use existing BUTTON_TOKENS with card-specific overrides in CardBase component

#### 5. Typography Tokens for Cards ✅

- **Covered:** `DOMAIN_TOKENS.metadata.text` section
- **References:** TEXT_TOKENS for typography scale
- **Addresses:** Card title, description, metadata typography requirements
- **Note:** Full typography tokens (fontSize, fontWeight) are available via TEXT_TOKENS

#### 6. Icon Size Tokens ✅

- **Covered:** `DOMAIN_TOKENS.metadata.icon.size` section
- **References:** ICON_TOKENS for complete icon size scale
- **Addresses:** Metadata icon sizes (h-4 w-4), placeholder icon sizes (h-16 w-16 via ICON_TOKENS)

### Section 2: Hard-Coded Violations ✅

All violation categories have corresponding token solutions:

#### Color Violations ✅

- **Solution:** `DOMAIN_TOKENS.surface.bg`, `DOMAIN_TOKENS.metadata.text`, `DOMAIN_TOKENS.badges.text.color`
- **Covers:** text-white, text-muted-foreground, text-primary, border-primary/20

#### Spacing Violations ✅

- **Solution:** `DOMAIN_TOKENS.layout.padding`, `DOMAIN_TOKENS.layout.gap`, `DOMAIN_TOKENS.badges.position`
- **Covers:** right-3, top-3, padding, gap patterns

#### Radius Violations ✅

- **Solution:** `DOMAIN_TOKENS.surface.radius`, `DOMAIN_TOKENS.image.radius`, `DOMAIN_TOKENS.badges.radius`
- **Covers:** rounded-full, rounded-t-lg, rounded-xl

#### Size Violations ✅

- **Solution:** `DOMAIN_TOKENS.metadata.icon.size`, `DOMAIN_TOKENS.skeleton` (references ICON_TOKENS for full size scale)
- **Covers:** h-16 w-16, h-4 w-4, w-full, h-full patterns

#### Typography Violations ✅

- **Solution:** `DOMAIN_TOKENS.metadata.text` (references TEXT_TOKENS for full typography scale)
- **Covers:** text-xs, text-lg patterns

#### Transition Violations ✅

- **Solution:** `DOMAIN_TOKENS.motion.hover.transition` (references MOTION_TOKENS)
- **Covers:** transition-transform, transition-opacity, transition-colors

### Section 5: Metadata & Domain Flaws ✅

All metadata patterns have token support:

#### Date/Time Display Pattern ✅

- **Solution:** `DOMAIN_TOKENS.metadata` (text, icon, spacing tokens)
- **Covers:** Icon + text layout, spacing, typography

#### Location Display Pattern ✅

- **Solution:** `DOMAIN_TOKENS.metadata` (same as date/time)
- **Covers:** Consistent metadata display patterns

#### Price/Capacity Display Pattern ✅

- **Solution:** `DOMAIN_TOKENS.price_capacity` section
- **Covers:** Text colors, spacing between price and capacity elements

---

## Token Gaps Addressed

### New Token Fields Created

1. **Surface Tokens** (new)
   - `bg.default`, `bg.hover`
   - `border.default`, `border.hover`
   - `radius.default`
   - `shadow.default`
   - `elevation.hover`

2. **Layout Tokens** (new)
   - `padding.default`, `padding.compact`
   - `gap.default`, `gap.compact`

3. **Image Tokens** (new)
   - `aspectRatio`
   - `radius`
   - `overlay.gradient`

4. **Metadata Tokens** (new)
   - `text.primary`, `text.secondary`
   - `icon.default`, `icon.size.sm`
   - `spacing.vertical`, `spacing.horizontal`

5. **Badge Tokens** (new)
   - `size.sm`, `size.md`
   - `surface.default`, `surface.featured`
   - `text.color`
   - `radius`
   - `position.top`, `position.right`
   - `shadow`

6. **Price/Capacity Tokens** (new)
   - `text.primary`, `text.secondary`
   - `spacing`

7. **Motion Tokens** (new)
   - `hover.transition`
   - `hover.scale`
   - `hover.elevation`

8. **Skeleton Tokens** (new)
   - `image.height`
   - `content.gap`
   - `badge.width`, `badge.height`

### Token References

All token values reference existing foundation tokens:

- **Spacing:** `semanticSpacing` from `spacing.ts`
- **Radius:** `borderRadius` from `radius.ts`
- **Shadows:** `elevationShadows` from `shadows.ts`
- **Motion:** `MOTION_TOKENS` from `components/motion.ts`
- **Colors:** Semantic color tokens (text-foreground, text-muted-foreground, etc.)
- **Icons:** `ICON_TOKENS` from `components/icon.ts`
- **Typography:** `TEXT_TOKENS` from `components/text.ts` (referenced in comments)

---

## CardBase Support (L3_S3)

The `DOMAIN_TOKENS` system is designed to fully support the upcoming CardBase component:

### Surface Styling

- CardBase can use `DOMAIN_TOKENS.surface` for all surface-related styling
- Supports default and hover states
- Compatible with CVA variants for different card styles

### Layout System

- CardBase can use `DOMAIN_TOKENS.layout` for padding and gap management
- Supports default and compact variants
- Enables consistent spacing across all card types

### Image Handling

- CardBase can use `DOMAIN_TOKENS.image` for consistent image styling
- Aspect ratio ensures consistent image dimensions
- Overlay gradients support hover effects

### Metadata Patterns

- CardBase can use `DOMAIN_TOKENS.metadata` for all metadata displays
- Consistent icon + text patterns
- Supports date/time, location, and other metadata types

### Badge System

- CardBase can use `DOMAIN_TOKENS.badges` for featured/popular badges
- Supports absolute positioning
- Gradient backgrounds for featured state

### Price/Capacity Display

- CardBase can use `DOMAIN_TOKENS.price_capacity` for price and capacity rows
- Consistent text styling
- Proper spacing between elements

### Motion & Interactions

- CardBase can use `DOMAIN_TOKENS.motion` for hover effects
- Scale transforms, elevation changes
- Smooth transitions using MOTION_TOKENS

### Skeleton States

- CardBase can use `DOMAIN_TOKENS.skeleton` for loading states
- Consistent skeleton dimensions
- Proper spacing for skeleton content

---

## CVA Compatibility

All `DOMAIN_TOKENS` values are designed to work seamlessly with CVA variants:

- Token values use Tailwind utility classes (compatible with CVA)
- Structured for variant-based access (e.g., `DOMAIN_TOKENS.layout.padding.default`)
- Supports size variants (default, compact)
- Supports style variants (default, featured)

Example CVA usage:

```typescript
const cardVariants = cva(DOMAIN_TOKENS.surface.bg.default, {
  variants: {
    size: {
      default: DOMAIN_TOKENS.layout.padding.default,
      compact: DOMAIN_TOKENS.layout.padding.compact,
    },
  },
});
```

---

## Next Steps

### L3_S3: Create Base Card Primitive

- Use `DOMAIN_TOKENS` in CardBase component implementation
- Create CVA variants using token values
- Integrate TAS animations using `DOMAIN_TOKENS.motion`
- Ensure no Tailwind raw utilities remain

### Future Card Migrations

- EventCard, VenueCard, ArtistCard, TicketCard, PromoCard, CategoryCard
- All will use `DOMAIN_TOKENS` through CardBase
- Consistent styling across all domain cards

---

## Acceptance Criteria Status

- ✅ DOMAIN_TOKENS structure matches all audit requirements
- ✅ No hardcoded Tailwind utilities (only token-mapped utilities)
- ✅ All values reference existing token primitives where appropriate
- ✅ Token system compatible with CVA variants for future components
- ✅ No card components modified (L3_S2 restriction)
- ✅ master_tasks.json will be updated only in L3 section

---

**Report Generated:** 2025-12-09  
**Task Status:** ✅ COMPLETED  
**Next Task:** L3_S3 — Create Base Card Primitive
