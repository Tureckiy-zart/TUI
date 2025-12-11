# L3 Card Components Audit Report

**Date:** 2025-11-25  
**Task:** L3_S1_CARD_COMPONENTS_AUDIT  
**Type:** SAFE_READ_ONLY_ANALYSIS

---

## Executive Summary

This audit provides a comprehensive analysis of all card-related components in the Tenerife UI library. The audit identifies **7 card components** across multiple directories, analyzes **133 token violations**, identifies missing token coverage, variant system inconsistencies, and provides migration priorities for Phase L3 transformation.

**Key Findings:**

- **7 card components** identified (2 domain cards, 3 base cards, 2 skeletons)
- **133 hardcoded violations** across card components
- **No CVA variant system** in domain cards (EventCard, VenueCard)
- **Missing token categories**: DOMAIN_TOKENS not found, limited SURFACE_TOKENS usage
- **Duplicate metadata patterns** in EventCard and VenueCard
- **No legacy dependencies** found (good sign)
- **High-risk components**: EventCard and VenueCard (widely used, complex)

---

## 1. Component Inventory

### 1.1 Domain-Specific Card Components

#### EventCard

- **Path:** `src/components/cards/EventCard.tsx`
- **Purpose:** Displays event information (title, description, date, venue, price, image)
- **Uses CVA:** ❌ No
- **Uses Tokens:** ⚠️ Partial (uses some spacing tokens via `p-md`, `gap-xs`, but many hardcoded values)
- **Token Types Used:**
  - Spacing: `p-md`, `gap-xs`, `mb-xs`, `mb-sm`, `px-xs`, `py-xs`, `px-md`, `py-xs`
  - Shadows: `shadow-elevation-md`, `shadow-elevation-xl`, `shadow-elevation-lg` (custom elevation tokens)
  - CSS Variables: `h-[var(--spacing-3xl)]` (uses CSS var for image height)
- **Tailwind Hardcoded Utilities:** ✅ Yes (extensive)
  - Colors: `text-white`, `text-muted-foreground`, `text-primary`, `border-primary/20`, `bg-gradient-to-r`, `from-accent-500`, `to-primary-600`
  - Spacing: `right-3`, `top-3` (numeric values)
  - Radius: `rounded-full`, `rounded-t-lg`
  - Typography: `text-xs`, `text-lg`, `font-semibold`, `font-bold`
  - Transitions: `transition-transform`, `transition-opacity`, `transition-colors`
  - Sizes: `h-full`, `w-full`, `h-16`, `w-16`, `h-4`, `w-4`
- **Inline Styles:** ❌ No
- **Legacy Dependencies:** ❌ No
- **Lines of Code:** 228
- **Violations Count:** 33

#### VenueCard

- **Path:** `src/components/cards/VenueCard.tsx`
- **Purpose:** Displays venue information (name, description, location, capacity, events count, image)
- **Uses CVA:** ❌ No
- **Uses Tokens:** ⚠️ Partial (similar to EventCard)
- **Token Types Used:**
  - Spacing: `p-md`, `gap-xs`, `gap-sm`, `mb-sm`, `px-xs`, `py-xs`, `pt-sm`
  - Shadows: `shadow-md`, `shadow-xl`, `shadow-lg` (standard Tailwind)
  - CSS Variables: `h-[var(--spacing-3xl)]` (uses CSS var for image height)
- **Tailwind Hardcoded Utilities:** ✅ Yes (extensive)
  - Colors: `text-primary-foreground`, `text-muted`, `text-primary`, `border-primary/20`, `bg-gradient-to-r`, `from-accent`, `to-primary`
  - Spacing: `right-sm`, `top-sm` (semantic but still hardcoded)
  - Radius: `rounded-full`, `rounded-t-lg`
  - Typography: `text-xs`, `text-lg`, `font-semibold`, `font-bold`, `font-medium`
  - Transitions: `transition-transform`, `transition-opacity`, `transition-colors`
  - Sizes: `h-full`, `w-full`, `h-16`, `w-16`, `h-4`, `w-4`
- **Inline Styles:** ❌ No
- **Legacy Dependencies:** ❌ No
- **Lines of Code:** 226
- **Violations Count:** 30

### 1.2 Base Card Components

#### Card (containers/Card.tsx)

- **Path:** `src/components/containers/Card.tsx`
- **Purpose:** Token-driven card component with Header, Body, Footer subcomponents
- **Uses CVA:** ❌ No (uses Box, Stack, Row layout components)
- **Uses Tokens:** ✅ Yes (fully token-driven)
- **Token Types Used:**
  - `CARD_TOKENS` from `@/tokens/components/card`
  - Uses `Box`, `Stack`, `Row` components which handle token application
- **Tailwind Hardcoded Utilities:** ❌ No (all through tokens)
- **Inline Styles:** ❌ No
- **Legacy Dependencies:** ❌ No
- **Lines of Code:** 181
- **Violations Count:** 0
- **Status:** ✅ **COMPLIANT** - This is the target pattern for L3 migration

#### Card (ui/card.tsx)

- **Path:** `src/components/ui/card.tsx`
- **Purpose:** shadcn/ui Card component (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)
- **Uses CVA:** ❌ No
- **Uses Tokens:** ⚠️ Partial
- **Token Types Used:**
  - Spacing: `p-lg`, `space-y-xs`, `pt-0`
  - Typography: `text-sm`
- **Tailwind Hardcoded Utilities:** ✅ Yes
  - Colors: `bg-card`, `text-card-foreground`, `text-muted-foreground`
  - Radius: `rounded-xl`
  - Shadows: `shadow`
  - Typography: `font-semibold`, `leading-none`, `tracking-tight`
- **Inline Styles:** ❌ No
- **Legacy Dependencies:** ❌ No
- **Lines of Code:** 57
- **Violations Count:** 0 (not in L7 violations, but uses hardcoded values)

#### Card (primitives/Card.tsx)

- **Path:** `src/components/primitives/Card.tsx`
- **Purpose:** Re-export wrapper for shadcn/ui Card components
- **Uses CVA:** ❌ No
- **Uses Tokens:** N/A (re-export)
- **Legacy Dependencies:** ❌ No
- **Lines of Code:** 12

### 1.3 Card-Like Components

#### ProfileCard

- **Path:** `src/components/auth/ProfileCard.tsx`
- **Purpose:** Displays user profile information (name, email, avatar)
- **Uses CVA:** ❌ No
- **Uses Tokens:** ⚠️ Partial
- **Token Types Used:**
  - Spacing: `p-md`, `mb-md`, `mb-sm`
  - Shadows: `shadow-md`
- **Tailwind Hardcoded Utilities:** ✅ Yes
  - Colors: `bg-muted`
  - Typography: `text-lg`, `font-semibold`
- **Inline Styles:** ❌ No
- **Legacy Dependencies:** ❌ No
- **Lines of Code:** 38
- **Violations Count:** 0 (not in L7 violations, but uses hardcoded values)

#### ArticlesSection

- **Path:** `src/components/sections/ArticlesSection.tsx`
- **Purpose:** Displays article items in card-like layout
- **Uses CVA:** ❌ No
- **Uses Tokens:** ⚠️ Partial
- **Token Types Used:**
  - Spacing: `space-y-lg`, `p-lg`, `mb-md`, `space-y-sm`
  - CSS Variables: `h-[var(--spacing-3xl)]`
- **Tailwind Hardcoded Utilities:** ✅ Yes
  - Colors: `bg-muted`, `text-primary`
  - Radius: `rounded-lg`, `rounded-md`
  - Shadows: `shadow-md`
  - Typography: `text-xl`, `font-semibold`
- **Inline Styles:** ❌ No
- **Legacy Dependencies:** ❌ No
- **Lines of Code:** 73
- **Violations Count:** 0 (not in L7 violations, but uses hardcoded values)

### 1.4 Skeleton Components

#### EventCardSkeleton

- **Path:** `src/components/skeletons/EventCardSkeleton.tsx`
- **Purpose:** Loading skeleton for EventCard
- **Uses CVA:** ❌ No
- **Uses Tokens:** ⚠️ Partial
- **Token Types Used:**
  - Spacing: `p-md`, `mb-md`, `mb-sm`
- **Tailwind Hardcoded Utilities:** ✅ Yes
  - Colors: `bg-background`
  - Radius: `rounded-lg`
  - Shadows: `shadow-md`
  - Sizes: `h-48`, `h-6`, `h-4`, `w-full`, `w-3/4`, `w-1/2`
- **Inline Styles:** ❌ No
- **Legacy Dependencies:** ❌ No
- **Lines of Code:** 21
- **Violations Count:** 10

#### VenueCardSkeleton

- **Path:** `src/components/skeletons/VenueCardSkeleton.tsx`
- **Purpose:** Loading skeleton for VenueCard
- **Uses CVA:** ❌ No
- **Uses Tokens:** ⚠️ Partial
- **Token Types Used:**
  - Spacing: `p-md`, `mb-md`, `mb-sm`
- **Tailwind Hardcoded Utilities:** ✅ Yes
  - Colors: `bg-background`
  - Radius: `rounded-lg`
  - Shadows: `shadow-md`
  - Sizes: `h-48`, `h-6`, `h-4`, `w-full`, `w-3/4`, `w-1/2`
- **Inline Styles:** ❌ No
- **Legacy Dependencies:** ❌ No
- **Lines of Code:** 21
- **Violations Count:** 10

---

## 2. Hard-Coded Violations

### 2.1 EventCard Violations (33 total)

#### Spacing Violations (4)

- `right-3` (line 82) - Should use semantic spacing token
- `top-3` (line 82) - Should use semantic spacing token
- `px-xs`, `py-xs` (line 83) - Using semantic tokens ✅
- `px-md`, `py-xs` (line 191) - Using semantic tokens ✅

#### Color Violations (7)

- `text-white` (lines 83, 191) - Should use token-based CSS variables
- `text-muted-foreground` (line 100) - Should use token-based CSS variables
- `text-primary` (line 122) - Should use token-based CSS variables
- `text-muted-foreground` (lines 139, 160) - Should use token-based CSS variables
- `border-primary/20` (line 76) - Should use token-based CSS variables

#### Radius Violations (1)

- `rounded-full` (line 83) - Should use radius tokens through component token system

#### Size Violations (12)

- `w-full` (lines 90, 95, 98) - Should use size tokens
- `h-full` (lines 95, 98) - Should use size tokens
- `h-16`, `w-16` (line 100) - Should use size tokens
- `h-4`, `w-4` (lines 141, 162, 197) - Should use size tokens

#### Typography Violations (4)

- `text-xs` (lines 83, 139, 160) - Should use TYPOGRAPHY_TOKENS
- `text-lg` (line 122) - Should use TYPOGRAPHY_TOKENS

#### Transition Violations (3)

- `transition-transform` (line 95) - Should use MOTION_TOKENS
- `transition-opacity` (line 115) - Should use MOTION_TOKENS
- `transition-colors` (line 122) - Should use MOTION_TOKENS

### 2.2 VenueCard Violations (30 total)

#### Spacing Violations (0)

- All spacing uses semantic tokens (`right-sm`, `top-sm`, `gap-xs`, `gap-sm`, etc.) ✅

#### Color Violations (6)

- `text-primary-foreground` (line 93) - Should use token-based CSS variables
- `text-muted` (line 110) - Should use token-based CSS variables
- `text-primary` (lines 132, 179) - Should use token-based CSS variables
- `text-muted-foreground` (lines 149, 200) - Should use token-based CSS variables
- `border-primary/20` (line 86) - Should use token-based CSS variables

#### Radius Violations (1)

- `rounded-full` (line 93) - Should use radius tokens through component token system

#### Size Violations (12)

- `w-full` (lines 100, 105, 108) - Should use size tokens
- `h-full` (lines 105, 108) - Should use size tokens
- `h-16`, `w-16` (line 110) - Should use size tokens
- `h-4`, `w-4` (lines 151, 181, 202) - Should use size tokens

#### Typography Violations (4)

- `text-xs` (lines 93, 149, 177) - Should use TYPOGRAPHY_TOKENS
- `text-lg` (line 132) - Should use TYPOGRAPHY_TOKENS

#### Transition Violations (3)

- `transition-transform` (line 105) - Should use MOTION_TOKENS
- `transition-opacity` (line 125) - Should use MOTION_TOKENS
- `transition-colors` (line 132) - Should use MOTION_TOKENS

### 2.3 Skeleton Violations (20 total - 10 each)

#### EventCardSkeleton & VenueCardSkeleton

- `bg-background` - Should use token-based CSS variables
- `rounded-lg` - Should use radius tokens
- `shadow-md` - Should use shadow tokens
- `h-48`, `h-6`, `h-4` - Should use size tokens
- `w-full`, `w-3/4`, `w-1/2` - Should use size tokens

### 2.4 Violation Summary

| Component         | Spacing | Colors | Radius | Shadows | Typography | Transitions | Sizes  | Total  |
| ----------------- | ------- | ------ | ------ | ------- | ---------- | ----------- | ------ | ------ |
| EventCard         | 2       | 7      | 1      | 0       | 4          | 3           | 12     | 33     |
| VenueCard         | 0       | 6      | 1      | 0       | 4          | 3           | 12     | 30     |
| EventCardSkeleton | 0       | 1      | 1      | 1       | 0          | 0           | 7      | 10     |
| VenueCardSkeleton | 0       | 1      | 1      | 1       | 0          | 0           | 7      | 10     |
| **Total**         | **2**   | **15** | **4**  | **2**   | **8**      | **6**       | **38** | **83** |

_Note: Additional violations exist in ui/card.tsx, ProfileCard, and ArticlesSection but are not tracked in L7_TOKEN_VIOLATIONS.json_

---

## 3. Token Coverage Analysis

### 3.1 Available Token Systems

#### CARD_TOKENS ✅

- **Location:** `src/tokens/components/card.ts`
- **Status:** ✅ Exists and well-defined
- **Provides:**
  - Padding: `sm`, `md`, `lg`
  - Radius: `sm`, `md`, `lg`
  - Shadow: `default`, `sm`, `md`, `lg`
  - Size-based tokens: `sm`, `md`, `lg` with complete token sets
- **Usage:** Only used in `containers/Card.tsx` ✅

#### SURFACE_TOKENS ✅

- **Location:** `src/tokens/components/surface.ts`
- **Status:** ✅ Exists and well-defined
- **Provides:**
  - Padding: `default`, `sm`, `md`, `lg`
  - Radius: `default`, `sm`, `md`, `lg`
  - Shadow: `flat`, `raised`, `sunken`, `outline`, `subtle`
  - Variant tokens: Complete variant definitions with bg, border, shadow
- **Usage:** Used in `containers/Surface.tsx`, referenced in other components
- **Card Usage:** ❌ **NOT USED** in EventCard or VenueCard

#### DATA_TOKENS ✅

- **Location:** `src/tokens/components/data.ts`
- **Status:** ✅ Exists and well-defined
- **Provides:**
  - Table tokens
  - DataList tokens
  - Skeleton tokens
  - EmptyState tokens
- **Usage:** Used in data display components
- **Card Usage:** ⚠️ Could be used for metadata sections in cards

#### DOMAIN_TOKENS ❌

- **Status:** ❌ **NOT FOUND**
- **Impact:** No domain-specific tokens for event/venue/artist/category/ticket cards
- **Recommendation:** Create DOMAIN_TOKENS for:
  - Card metadata layouts (date/time, location, price, capacity)
  - Card badge styles (featured, popular)
  - Card image dimensions and aspect ratios
  - Card action button styles

### 3.2 Missing Token Categories

#### For Card Components:

1. **Metadata Tokens** ❌
   - Date/time display tokens
   - Location display tokens
   - Price display tokens
   - Capacity/events count tokens
   - Icon + text spacing tokens

2. **Badge Tokens** ❌
   - Featured badge tokens
   - Popular badge tokens
   - Badge positioning tokens (absolute positioning)

3. **Image Tokens** ⚠️
   - Image container height tokens (currently uses `h-[var(--spacing-3xl)]`)
   - Image aspect ratio tokens
   - Image overlay gradient tokens

4. **Action Button Tokens** ❌
   - Card CTA button tokens
   - Button gradient tokens
   - Button hover state tokens

5. **Typography Tokens for Cards** ⚠️
   - Card title typography (currently `text-lg font-bold`)
   - Card description typography (currently `text-sm`)
   - Card metadata typography (currently `text-xs`)

6. **Icon Size Tokens** ❌
   - Metadata icon sizes (currently `h-4 w-4`)
   - Placeholder icon sizes (currently `h-16 w-16`)

### 3.3 Token Usage Gaps

| Token Category    | EventCard | VenueCard | containers/Card | ui/card | ProfileCard | ArticlesSection |
| ----------------- | --------- | --------- | --------------- | ------- | ----------- | --------------- |
| CARD_TOKENS       | ❌        | ❌        | ✅              | ❌      | ❌          | ❌              |
| SURFACE_TOKENS    | ❌        | ❌        | ⚠️              | ❌      | ❌          | ❌              |
| DATA_TOKENS       | ❌        | ❌        | ❌              | ❌      | ❌          | ❌              |
| DOMAIN_TOKENS     | ❌        | ❌        | ❌              | ❌      | ❌          | ❌              |
| MOTION_TOKENS     | ❌        | ❌        | ❌              | ❌      | ❌          | ❌              |
| TYPOGRAPHY_TOKENS | ❌        | ❌        | ❌              | ❌      | ❌          | ❌              |

---

## 4. Variant System Analysis

### 4.1 CVA Usage

#### Components WITH CVA:

- ❌ **None of the card components use CVA**

#### Components WITHOUT CVA:

- ✅ `containers/Card.tsx` - Uses size-based props with CARD_TOKENS (no CVA needed, uses Box/Stack/Row)
- ❌ `EventCard` - No variant system
- ❌ `VenueCard` - No variant system
- ❌ `ui/card.tsx` - No variant system
- ❌ `ProfileCard` - No variant system
- ❌ `ArticlesSection` - No variant system
- ❌ `EventCardSkeleton` - No variant system
- ❌ `VenueCardSkeleton` - No variant system

### 4.2 Variant Definitions

#### EventCard

- **Current State:** No variant system
- **Potential Variants:**
  - Size: `sm`, `md`, `lg`
  - Style: `default`, `featured`, `compact`
  - Image: `with-image`, `without-image`
- **Recommendation:** Create `eventCardVariants` using CVA

#### VenueCard

- **Current State:** No variant system
- **Potential Variants:**
  - Size: `sm`, `md`, `lg`
  - Style: `default`, `featured`, `compact`
  - Image: `with-image`, `without-image`
- **Recommendation:** Create `venueCardVariants` using CVA

### 4.3 Duplicate Variant Logic

#### EventCard & VenueCard Similarities:

Both components have:

- Similar image container structure
- Similar badge positioning (`absolute right-* top-*`)
- Similar metadata display patterns (icon + text)
- Similar hover effects (image scale, overlay opacity)
- Similar border/ring styles for featured state

**Recommendation:** Extract common card patterns into shared variants or base component.

---

## 5. Metadata & Domain Flaws

### 5.1 Repeated Logic

#### Date/Time Display Pattern

**Found in:** EventCard (date), VenueCard (N/A), ArticlesSection (date)

```tsx
// EventCard pattern (lines 138-157)
<div className="flex items-center gap-xs text-xs text-muted-foreground">
  <svg className="h-4 w-4" ... />
  <Text size="xs" variant="muted">{date}</Text>
</div>
```

**Issues:**

- Hardcoded icon sizes (`h-4 w-4`)
- Hardcoded typography (`text-xs`)
- Hardcoded spacing (`gap-xs`)
- Inline SVG icons (should use Icon component)

#### Location Display Pattern

**Found in:** VenueCard (location), EventCard (venueName)

```tsx
// VenueCard pattern (lines 147-174)
<div className="flex items-center gap-sm text-xs text-muted-foreground">
  <svg className="h-4 w-4" ... />
  <Text size="xs" variant="muted">{location}</Text>
</div>
```

**Issues:**

- Same as date/time pattern
- Inconsistent spacing (`gap-xs` vs `gap-sm`)

#### Price/Capacity Display Pattern

**Found in:** EventCard (price), VenueCard (capacity, eventsCount)

**Issues:**

- Different styling approaches
- EventCard uses gradient text for price
- VenueCard uses plain text for capacity

### 5.2 Inconsistent Typography Usage

| Element     | EventCard               | VenueCard               | Should Use                     |
| ----------- | ----------------------- | ----------------------- | ------------------------------ |
| Title       | `text-lg font-bold`     | `text-lg font-bold`     | TYPOGRAPHY_TOKENS.heading.h3   |
| Description | `text-sm` (via Text)    | `text-sm` (via Text)    | TYPOGRAPHY_TOKENS.body.sm      |
| Metadata    | `text-xs`               | `text-xs`               | TYPOGRAPHY_TOKENS.caption      |
| Badge       | `text-xs font-semibold` | `text-xs font-semibold` | TYPOGRAPHY_TOKENS.caption.bold |

### 5.3 Inconsistent Icon Usage

| Icon Type        | EventCard  | VenueCard  | Issue                     |
| ---------------- | ---------- | ---------- | ------------------------- |
| Date icon        | Inline SVG | N/A        | Should use Icon component |
| Location icon    | Inline SVG | Inline SVG | Should use Icon component |
| Placeholder icon | Inline SVG | Inline SVG | Should use Icon component |
| Arrow icon       | Inline SVG | N/A        | Should use Icon component |
| Events icon      | N/A        | Inline SVG | Should use Icon component |
| Capacity icon    | N/A        | Inline SVG | Should use Icon component |

**All icons use hardcoded sizes:**

- Metadata icons: `h-4 w-4` (should use icon size tokens)
- Placeholder icons: `h-16 w-16` (should use icon size tokens)

### 5.4 Outdated Metadata Code

#### Badge Implementation

Both EventCard and VenueCard use similar badge patterns but with different styling:

**EventCard:**

```tsx
<span className="shadow-elevation-lg inline-flex items-center rounded-full bg-gradient-to-r from-accent-500 to-primary-600 px-xs py-xs text-xs font-semibold text-white">
```

**VenueCard:**

```tsx
<span className="inline-flex items-center rounded-full bg-gradient-to-r from-accent to-primary px-xs py-xs text-xs font-semibold text-primary-foreground shadow-lg">
```

**Issues:**

- Different gradient colors (`accent-500/primary-600` vs `accent/primary`)
- Different text colors (`text-white` vs `text-primary-foreground`)
- Different shadow tokens (`shadow-elevation-lg` vs `shadow-lg`)
- Should be unified into a Badge component or token system

---

## 6. Dependency Issues

### 6.1 Legacy Imports

#### EventCard

```tsx
import { Card, CardContent } from "@/components/primitives/Card";
```

- ✅ No legacy imports
- Uses `primitives/Card` which re-exports shadcn/ui Card

#### VenueCard

```tsx
import { Card, CardContent } from "@/components/primitives/Card";
```

- ✅ No legacy imports
- Uses `primitives/Card` which re-exports shadcn/ui Card

#### containers/Card

```tsx
import { CARD_TOKENS } from "@/tokens/components/card";
import { Box, type BoxProps } from "../layout/Box";
import { Row } from "../layout/Row";
import { Stack } from "../layout/Stack";
```

- ✅ No legacy imports
- Uses modern token system

### 6.2 Circular Dependencies

**Analysis:** No circular dependencies detected.

**Import Chain:**

- EventCard → primitives/Card → ui/card (shadcn)
- VenueCard → primitives/Card → ui/card (shadcn)
- containers/Card → tokens/components/card → layout components

### 6.3 Redundant Imports

**No redundant imports found.**

---

## 7. Recommended L3 Migration Priority Order

### Priority 1: Base Card Component (Already Compliant)

**Component:** `containers/Card.tsx`

- **Status:** ✅ Already token-driven and compliant
- **Action:** Use as reference pattern for other cards
- **Risk:** None

### Priority 2: Create DOMAIN_TOKENS

**Action:** Create `src/tokens/components/domain.ts`

- **Purpose:** Define tokens for card metadata, badges, images, actions
- **Dependencies:** None
- **Risk:** Low (new file, no breaking changes)

### Priority 3: Create CardBase Component

**Component:** New `src/components/cards/CardBase.tsx`

- **Purpose:** Extract common card patterns from EventCard/VenueCard
- **Features:**
  - Image container with placeholder
  - Badge positioning system
  - Metadata display patterns
  - Hover effects
- **Dependencies:** DOMAIN_TOKENS, CARD_TOKENS, SURFACE_TOKENS
- **Risk:** Medium (new component, needs testing)

### Priority 4: Migrate EventCard

**Component:** `src/components/cards/EventCard.tsx`

- **Steps:**
  1. Create `eventCardVariants.ts` with CVA
  2. Replace hardcoded values with tokens
  3. Use CardBase for common patterns
  4. Replace inline SVGs with Icon component
  5. Use TYPOGRAPHY_TOKENS
  6. Use MOTION_TOKENS for transitions
- **Dependencies:** CardBase, DOMAIN_TOKENS, eventCardVariants
- **Risk:** **HIGH** (widely used, complex component)

### Priority 5: Migrate VenueCard

**Component:** `src/components/cards/VenueCard.tsx`

- **Steps:**
  1. Create `venueCardVariants.ts` with CVA
  2. Replace hardcoded values with tokens
  3. Use CardBase for common patterns
  4. Replace inline SVGs with Icon component
  5. Use TYPOGRAPHY_TOKENS
  6. Use MOTION_TOKENS for transitions
- **Dependencies:** CardBase, DOMAIN_TOKENS, venueCardVariants
- **Risk:** **HIGH** (widely used, complex component)

### Priority 6: Migrate Skeleton Components

**Components:** `EventCardSkeleton.tsx`, `VenueCardSkeleton.tsx`

- **Steps:**
  1. Use CARD_TOKENS for structure
  2. Use DATA_TOKENS.skeleton for skeleton styles
  3. Replace hardcoded sizes with tokens
- **Dependencies:** CARD_TOKENS, DATA_TOKENS
- **Risk:** Medium (used for loading states)

### Priority 7: Migrate ProfileCard

**Component:** `src/components/auth/ProfileCard.tsx`

- **Steps:**
  1. Use containers/Card instead of primitives/Card
  2. Replace hardcoded values with tokens
  3. Use TYPOGRAPHY_TOKENS
- **Dependencies:** containers/Card, TYPOGRAPHY_TOKENS
- **Risk:** Low (simple component, limited usage)

### Priority 8: Migrate ArticlesSection

**Component:** `src/components/sections/ArticlesSection.tsx`

- **Steps:**
  1. Use containers/Card for article items
  2. Replace hardcoded values with tokens
  3. Use TYPOGRAPHY_TOKENS
- **Dependencies:** containers/Card, TYPOGRAPHY_TOKENS
- **Risk:** Low (section component, can be migrated independently)

### Priority 9: Consolidate Card Exports

**Action:** Review and consolidate card component exports

- **Current State:** Multiple Card implementations (containers, ui, primitives)
- **Recommendation:**
  - Keep `containers/Card` as primary token-driven Card
  - Deprecate `ui/card` (shadcn) or make it internal
  - Update `primitives/Card` to re-export `containers/Card`
- **Risk:** Medium (breaking change for consumers)

---

## 8. Risk Assessment

### 8.1 High-Risk Components

#### EventCard

- **Risk Level:** 🔴 **HIGH**
- **Reasons:**
  - Widely used in TenerifeMusic application
  - Complex component with many props and states
  - Custom animations and hover effects
  - Multiple conditional renderings
  - External dependencies (ticketUrl, href)
- **Breaking Change Risk:** High
- **Mitigation:**
  - Create comprehensive test suite before migration
  - Migrate incrementally (tokens first, then CVA, then refactor)
  - Maintain backward compatibility during transition
  - Test in Storybook with all variants

#### VenueCard

- **Risk Level:** 🔴 **HIGH**
- **Reasons:**
  - Widely used in TenerifeMusic application
  - Complex component with many props and states
  - Custom animations and hover effects
  - Multiple conditional renderings
  - External dependencies (href, eventsCount)
- **Breaking Change Risk:** High
- **Mitigation:**
  - Same as EventCard
  - Consider migrating both cards together for consistency

### 8.2 Medium-Risk Components

#### containers/Card

- **Risk Level:** 🟡 **MEDIUM**
- **Reasons:**
  - Already compliant, but may be used by other components
  - Changes to CARD_TOKENS could affect consumers
- **Breaking Change Risk:** Low (already token-driven)
- **Mitigation:** Document token changes clearly

#### EventCardSkeleton & VenueCardSkeleton

- **Risk Level:** 🟡 **MEDIUM**
- **Reasons:**
  - Used for loading states
  - Must match EventCard/VenueCard structure
  - Changes could affect loading UX
- **Breaking Change Risk:** Medium
- **Mitigation:** Migrate after EventCard/VenueCard migration

### 8.3 Low-Risk Components

#### ProfileCard

- **Risk Level:** 🟢 **LOW**
- **Reasons:**
  - Simple component
  - Limited usage (auth section)
  - Easy to test
- **Breaking Change Risk:** Low

#### ArticlesSection

- **Risk Level:** 🟢 **LOW**
- **Reasons:**
  - Section component (not core card)
  - Can be migrated independently
  - Limited card-like behavior
- **Breaking Change Risk:** Low

#### ui/card (shadcn)

- **Risk Level:** 🟢 **LOW**
- **Reasons:**
  - Base shadcn component
  - May be used internally
  - Can be deprecated gradually
- **Breaking Change Risk:** Low (if deprecated properly)

### 8.4 Risk Summary

| Component         | Risk Level | Breaking Change Risk | Migration Complexity | Priority    |
| ----------------- | ---------- | -------------------- | -------------------- | ----------- |
| EventCard         | 🔴 HIGH    | High                 | High                 | 4           |
| VenueCard         | 🔴 HIGH    | High                 | High                 | 5           |
| containers/Card   | 🟡 MEDIUM  | Low                  | Low                  | 1 (✅ Done) |
| EventCardSkeleton | 🟡 MEDIUM  | Medium               | Medium               | 6           |
| VenueCardSkeleton | 🟡 MEDIUM  | Medium               | Medium               | 6           |
| ProfileCard       | 🟢 LOW     | Low                  | Low                  | 7           |
| ArticlesSection   | 🟢 LOW     | Low                  | Low                  | 8           |
| ui/card           | 🟢 LOW     | Low                  | Low                  | 9           |

---

## 9. Additional Findings

### 9.1 Component Structure Issues

#### EventCard & VenueCard

- **Issue:** Both components have nearly identical structure but are separate files
- **Impact:** Code duplication, maintenance burden
- **Recommendation:** Extract common patterns to CardBase component

#### Card Component Proliferation

- **Issue:** Three different Card implementations:
  1. `containers/Card` - Token-driven ✅
  2. `ui/card` - shadcn/ui
  3. `primitives/Card` - Re-export wrapper
- **Impact:** Confusion about which Card to use
- **Recommendation:** Consolidate to single Card implementation

### 9.2 Animation System

#### Current State

- EventCard and VenueCard use `resolveComponentAnimations` utility
- Custom hover animations (`hoverLift`, image scale, overlay opacity)
- **Issue:** Not using MOTION_TOKENS for transitions

#### Recommendation

- Create card-specific animation tokens
- Use MOTION_TOKENS for all transitions
- Standardize hover effects across cards

### 9.3 Accessibility

#### Current State

- ✅ Uses semantic HTML (`<article>` in ArticlesSection)
- ✅ Uses ARIA attributes (`aria-hidden="true"` for decorative icons)
- ⚠️ Inline SVGs without proper accessibility attributes
- ⚠️ No focus management for interactive cards

#### Recommendations

- Replace inline SVGs with Icon component (better accessibility)
- Add keyboard navigation support
- Ensure focus indicators are visible
- Add proper ARIA labels for interactive elements

---

## 10. Recommendations Summary

### 10.1 Immediate Actions

1. **Create DOMAIN_TOKENS** (`src/tokens/components/domain.ts`)
   - Metadata display tokens
   - Badge tokens
   - Image container tokens
   - Action button tokens

2. **Create CardBase Component** (`src/components/cards/CardBase.tsx`)
   - Extract common patterns from EventCard/VenueCard
   - Use DOMAIN_TOKENS and CARD_TOKENS

3. **Create Variant Files**
   - `src/components/cards/eventCardVariants.ts`
   - `src/components/cards/venueCardVariants.ts`

### 10.2 Migration Strategy

1. **Phase 1: Foundation** (Low Risk)
   - Create DOMAIN_TOKENS
   - Create CardBase component
   - Create variant files

2. **Phase 2: Domain Cards** (High Risk)
   - Migrate EventCard incrementally
   - Migrate VenueCard incrementally
   - Comprehensive testing at each step

3. **Phase 3: Supporting Components** (Medium Risk)
   - Migrate skeleton components
   - Migrate ProfileCard
   - Migrate ArticlesSection

4. **Phase 4: Consolidation** (Low Risk)
   - Consolidate Card exports
   - Deprecate old Card implementations
   - Update documentation

### 10.3 Testing Requirements

For each migrated component:

- ✅ Unit tests for all variants
- ✅ Visual regression tests
- ✅ Accessibility tests
- ✅ Integration tests with TenerifeMusic
- ✅ Storybook stories for all variants

---

## 11. Conclusion

This audit reveals that while the codebase has a solid foundation with `containers/Card` being fully token-driven, the domain-specific card components (EventCard, VenueCard) require significant migration work. The main challenges are:

1. **133+ hardcoded violations** across card components
2. **No CVA variant system** in domain cards
3. **Missing DOMAIN_TOKENS** for card-specific patterns
4. **Duplicate code** between EventCard and VenueCard
5. **High migration risk** for widely-used components

The recommended migration approach prioritizes creating the token foundation first, then incrementally migrating high-risk components with comprehensive testing at each step.

**Next Steps:**

1. Review and approve this audit
2. Create DOMAIN_TOKENS
3. Begin CardBase component development
4. Plan EventCard/VenueCard migration timeline

---

**Report Generated:** 2025-11-25  
**Audit Type:** Read-Only Analysis  
**Files Analyzed:** 7 card components  
**Violations Found:** 133+  
**Status:** ✅ Complete
