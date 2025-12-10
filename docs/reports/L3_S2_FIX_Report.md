# L3_S2_FIX — DOMAIN_TOKENS Cleanup & Normalization Report

**Date:** 2025-12-10  
**Task:** L3_S2_FIX — DOMAIN_TOKENS Cleanup & Normalization  
**Type:** Token Normalization  
**Status:** ✅ COMPLETED

---

## Executive Summary

Successfully normalized DOMAIN_TOKENS by removing hardcoded Tailwind utility classes and replacing them with references to existing token objects (ICON_TOKENS, DATA_TOKENS, MOTION_TOKENS) or documenting their mappings to foundation primitives (semanticSpacing, borderRadius, elevationShadows).

**Key Achievements:**

- ✅ Replaced `metadata.icon.sizeSm` with `ICON_TOKENS.sizes.md` reference
- ✅ Replaced `motion.hover.transition` with `MOTION_TOKENS.transitionPreset.normal` reference
- ✅ Replaced `skeleton.content.width.full` with `DATA_TOKENS.skeleton.width.full` reference
- ✅ Documented all remaining Tailwind utilities to reference foundation primitives
- ✅ Added `badges.positionY` tokens for multi-badge scenarios (top-xl, top-2xl, top-3xl)
- ✅ Fixed skeleton token documentation and mismatches
- ✅ All values now reference tokens or are documented as mapping to primitives
- ✅ TypeScript compilation passes
- ✅ No breaking changes to components using DOMAIN_TOKENS

---

## Changes Made

### 1. Imports Added

Added imports for token objects that are directly referenced:

```typescript
import { ICON_TOKENS } from "./icon";
import { DATA_TOKENS } from "./data";
import { MOTION_TOKENS } from "./motion";
```

**Note:** `semanticSpacing`, `borderRadius`, and `elevationShadows` are not imported as they return CSS values (rem, shadow strings), not Tailwind utility classes. The Tailwind utilities in DOMAIN_TOKENS map to these primitives conceptually and are documented as such.

---

### 2. Icon Tokens Normalization

**Before:**

```typescript
icon: {
  sizeSm: "h-4 w-4", // Small icon size - maps to ICON_TOKENS.sizes.md (16px)
}
```

**After:**

```typescript
icon: {
  sizeSm: ICON_TOKENS.sizes.md, // Small icon size - references ICON_TOKENS.sizes.md (16px)
}
```

**Change:** Direct reference to `ICON_TOKENS.sizes.md` instead of hardcoded `"h-4 w-4"`.

---

### 3. Motion Tokens Normalization

**Before:**

```typescript
hover: {
  transition: "transition-all duration-normal", // Hover transition - maps to MOTION_TOKENS.transitionPreset.normal
  scale: "hover:scale-110", // Hover scale transform (110% scale)
  elevation: "hover:shadow-xl", // Hover elevation change - maps to elevationShadows.xl
}
```

**After:**

```typescript
hover: {
  transition: MOTION_TOKENS.transitionPreset.normal, // Hover transition - references MOTION_TOKENS.transitionPreset.normal
  scale: "hover:scale-110", // Hover scale transform (110% scale) - domain-specific value
  elevation: "hover:shadow-xl", // Hover elevation change - references elevationShadows.xl
}
```

**Change:** Direct reference to `MOTION_TOKENS.transitionPreset.normal` instead of hardcoded string. `scale` remains as domain-specific value (no equivalent in MOTION_TOKENS).

---

### 4. Skeleton Tokens Normalization

#### 4.1 Image Height Fix

**Before:**

```typescript
image: {
  height: "h-48", // Image skeleton height - maps to DATA_TOKENS.skeleton.height.card (192px)
}
```

**After:**

```typescript
image: {
  height: "h-48", // Image skeleton height - domain-specific, references spacing[48] (192px)
}
```

**Change:** Fixed documentation. `DATA_TOKENS.skeleton.height.card` is `h-32` (128px), but card image skeletons need `h-48` (192px). This is a domain-specific override that conceptually references `spacing[48]` (12rem / 192px).

#### 4.2 Content Width Normalization

**Before:**

```typescript
width: {
  full: "w-full", // Full width (100%) - maps to DATA_TOKENS.skeleton.width.full
  threeQuarters: "w-3/4", // Three quarters width (75%)
  half: "w-1/2", // Half width (50%)
}
```

**After:**

```typescript
width: {
  full: DATA_TOKENS.skeleton.width.full, // Full width (100%) - references DATA_TOKENS.skeleton.width.full
  threeQuarters: "w-3/4", // Three quarters width (75%) - domain-specific value
  half: "w-1/2", // Half width (50%) - domain-specific value
}
```

**Change:** Direct reference to `DATA_TOKENS.skeleton.width.full` instead of hardcoded `"w-full"`. `threeQuarters` and `half` remain as domain-specific values (no equivalents in DATA_TOKENS).

#### 4.3 Badge Dimensions Fix

**Before:**

```typescript
badge: {
  width: "w-20", // Badge skeleton width (80px)
  height: "h-6", // Badge skeleton height (24px) - maps to DATA_TOKENS.skeleton.height.text
}
```

**After:**

```typescript
badge: {
  width: "w-20", // Badge skeleton width - references spacing[20] (80px)
  height: "h-6", // Badge skeleton height - references spacing[6] (24px)
}
```

**Change:** Fixed documentation. Comment incorrectly said `h-6` maps to `DATA_TOKENS.skeleton.height.text` (which is `h-4` / 16px). `h-6` (24px) conceptually references `spacing[6]` (1.5rem / 24px).

---

### 5. Badge Position Tokens Enhancement

**Added:** New `badges.positionY` tokens for multi-badge scenarios (used in TicketCard):

```typescript
positionY: {
  xl: "top-xl", // References semanticSpacing.xl (32px)
  "2xl": "top-2xl", // References semanticSpacing["2xl"] (48px)
  "3xl": "top-3xl", // References semanticSpacing["3xl"] (64px)
}
```

**Purpose:** Supports TicketCard's multi-badge positioning (VIP badge, discount badge) that requires different vertical offsets.

---

### 6. Documentation Improvements

All remaining Tailwind utilities are now documented to reference foundation primitives:

- **Surface tokens:** `rounded-xl` → `borderRadius.xl`, `shadow-md` → `elevationShadows.md`, `hover:shadow-xl` → `elevationShadows.xl`
- **Layout tokens:** `p-md`, `p-sm`, `gap-md`, `gap-xs` → `semanticSpacing` values
- **Image tokens:** `rounded-t-xl` → `borderRadius.xl` (top corners only)
- **Badge tokens:** `rounded-full` → `borderRadius.full`, `shadow-lg` → `elevationShadows.lg`
- **Metadata tokens:** `gap-xs`, `gap-sm` → `semanticSpacing` values
- **Price/Capacity tokens:** `gap-sm` → `semanticSpacing.sm`

---

## Removed Hardcoded Values

The following hardcoded values were replaced with token references:

1. ✅ `metadata.icon.sizeSm: "h-4 w-4"` → `ICON_TOKENS.sizes.md`
2. ✅ `motion.hover.transition: "transition-all duration-normal"` → `MOTION_TOKENS.transitionPreset.normal`
3. ✅ `skeleton.content.width.full: "w-full"` → `DATA_TOKENS.skeleton.width.full`

---

## New Token Fields Created

1. **`badges.positionY`** - Additional vertical positioning tokens for multi-badge scenarios:
   - `xl`: `"top-xl"` (references `semanticSpacing.xl` / 32px)
   - `"2xl"`: `"top-2xl"` (references `semanticSpacing["2xl"]` / 48px)
   - `"3xl"`: `"top-3xl"` (references `semanticSpacing["3xl"]` / 64px)

---

## Mapping of Old → New Token Usage

| Old Value                          | New Value                               | Type               |
| ---------------------------------- | --------------------------------------- | ------------------ |
| `"h-4 w-4"`                        | `ICON_TOKENS.sizes.md`                  | Direct reference   |
| `"transition-all duration-normal"` | `MOTION_TOKENS.transitionPreset.normal` | Direct reference   |
| `"w-full"`                         | `DATA_TOKENS.skeleton.width.full`       | Direct reference   |
| `"h-48"`                           | `"h-48"` (documented as spacing[48])    | Documented mapping |
| `"h-6"`                            | `"h-6"` (documented as spacing[6])      | Documented mapping |
| `"w-20"`                           | `"w-20"` (documented as spacing[20])    | Documented mapping |
| `"w-3/4"`                          | `"w-3/4"` (domain-specific)             | Domain-specific    |
| `"w-1/2"`                          | `"w-1/2"` (domain-specific)             | Domain-specific    |
| `"hover:scale-110"`                | `"hover:scale-110"` (domain-specific)   | Domain-specific    |

---

## Skeleton Fixes Explanation

### Issue 1: Image Height Mismatch

**Problem:** `DOMAIN_TOKENS.skeleton.image.height` was `"h-48"` (192px), but comment said it mapped to `DATA_TOKENS.skeleton.height.card`, which is actually `"h-32"` (128px).

**Solution:** Kept `"h-48"` as domain-specific override (card image skeletons need 192px, not 128px). Updated documentation to reference `spacing[48]` (12rem / 192px) conceptually.

### Issue 2: Badge Height Mismatch

**Problem:** `DOMAIN_TOKENS.skeleton.badge.height` was `"h-6"` (24px), but comment said it mapped to `DATA_TOKENS.skeleton.height.text`, which is `"h-4"` (16px).

**Solution:** Updated documentation. `"h-6"` (24px) conceptually references `spacing[6]` (1.5rem / 24px), not `DATA_TOKENS.skeleton.height.text`.

### Issue 3: Width Tokens

**Problem:** `skeleton.content.width.threeQuarters` and `half` had no token equivalents.

**Solution:** Kept as domain-specific values with documentation. `full` now references `DATA_TOKENS.skeleton.width.full`.

---

## Validation Confirmation

### ✅ Zero Hardcoded Utilities (Where Possible)

All values that have direct token equivalents now reference those tokens:

- ✅ `ICON_TOKENS.sizes.md` used instead of `"h-4 w-4"`
- ✅ `MOTION_TOKENS.transitionPreset.normal` used instead of `"transition-all duration-normal"`
- ✅ `DATA_TOKENS.skeleton.width.full` used instead of `"w-full"`

### ✅ All Values Reference Tokens or Primitives

All remaining Tailwind utilities are documented to reference foundation primitives:

- Surface tokens → `borderRadius`, `elevationShadows`
- Layout tokens → `semanticSpacing`
- Badge tokens → `borderRadius`, `elevationShadows`, `semanticSpacing`
- Skeleton tokens → `spacing` array values conceptually

### ✅ Skeleton Tokens Aligned

- Image height: Domain-specific `h-48` documented as referencing `spacing[48]`
- Badge dimensions: `h-6` and `w-20` documented as referencing `spacing[6]` and `spacing[20]`
- Content width: `full` references `DATA_TOKENS.skeleton.width.full`

### ✅ Badge, Metadata, Layout, Image Groups Consistent

All groups now have consistent documentation showing mappings to foundation primitives.

### ✅ No Component Modifications

No changes were made to components (EventCard, VenueCard, ArtistCard, TicketCard, PromoCard, CategoryCard, SkeletonCards). All existing usage of DOMAIN_TOKENS remains compatible.

---

## TypeScript Compilation

✅ **Status:** PASSING

All imports resolve correctly. No type errors introduced.

---

## Breaking Changes

**None.** All changes are backward compatible:

- Token references return the same Tailwind utility class strings
- New `badges.positionY` tokens are additive (don't affect existing usage)
- Documentation improvements don't change runtime behavior

---

## Next Steps

1. ✅ DOMAIN_TOKENS normalized and validated
2. ✅ Ready for L3_S3 (CardBase) validation
3. ✅ Ready for L3_S4, L3_S5 (EventCard, VenueCard) validation

---

## Files Modified

1. **`src/tokens/components/domain.ts`**
   - Added imports for ICON_TOKENS, DATA_TOKENS, MOTION_TOKENS
   - Replaced hardcoded values with token references
   - Enhanced documentation for all token mappings
   - Added `badges.positionY` tokens

---

## Files Created

1. **`docs/reports/L3_S2_FIX_Report.md`** (this file)

---

## Conclusion

DOMAIN_TOKENS has been successfully normalized. All hardcoded Tailwind utilities that had direct token equivalents have been replaced with token references. Remaining utilities are documented to reference foundation primitives. The token system is now consistent, token-driven, and safe to use across all card components.

**Status:** ✅ **COMPLETED**
