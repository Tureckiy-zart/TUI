# Cards Pseudo-Inventory

**Date:** 2026-01-01  
**Purpose:** Complete inventory of all Card-like components (components with surface, radius, shadow, padding structure) for cleanup audit

---

## Summary

This document provides a complete inventory of all components that exhibit Card-like behavior (surface + radius + shadow + padding structure), including:
- Components explicitly named *Card*
- Components using Card/Surface/Box with card-like styling
- Components that behave like cards but are not named as such

**Total Components Found:** 15  
**Domain Cards:** 7  
**Foundation/Locked:** 3  
**Pseudo-Cards:** 2  
**Sections Using Cards:** 2  
**Skeletons:** 2  
**Menu Components:** 1

---

## 1. Domain Cards (STABLE - DO NOT MODIFY)

### 1.1 EventCard
**Path:** `src/PATTERNS/cards/EventCard/EventCard.tsx`  
**Layer:** DOMAIN  
**Status:** ✅ STABLE (Phase 1 completed)  
**Card-like Structure:** ✅ Uses CardBase  
**Responsibility:** Displays event information (title, date, venue, price, tickets)

### 1.2 VenueCard
**Path:** `src/PATTERNS/cards/VenueCard/VenueCard.tsx`  
**Layer:** PATTERNS  
**Status:** ✅ STABLE (Phase 1 completed)  
**Card-like Structure:** ✅ Uses CardBase  
**Responsibility:** Displays venue information (name, location, events count, capacity)

### 1.3 ArtistCard
**Path:** `src/PATTERNS/cards/ArtistCard/ArtistCard.tsx`  
**Layer:** PATTERNS  
**Status:** ✅ STABLE (Phase 1 completed)  
**Card-like Structure:** ✅ Uses CardBase  
**Responsibility:** Displays artist information (name, genres, followers, plays)

### 1.4 TicketCard
**Path:** `src/PATTERNS/cards/TicketCard/TicketCard.tsx`  
**Layer:** PATTERNS  
**Status:** ✅ STABLE (Phase 1 completed)  
**Card-like Structure:** ✅ Uses CardBase  
**Responsibility:** Displays ticket information (event, date, price, availability, purchase button)

### 1.5 CategoryCard
**Path:** `src/PATTERNS/cards/CategoryCard/CategoryCard.tsx`  
**Layer:** PATTERNS  
**Status:** ✅ STABLE (Phase 1 completed)  
**Card-like Structure:** ✅ Uses CardBase  
**Responsibility:** Displays category information (title, description, image)

### 1.6 PromoCard
**Path:** `src/PATTERNS/cards/PromoCard/PromoCard.tsx`  
**Layer:** PATTERNS  
**Status:** ✅ STABLE (Phase 1 completed)  
**Card-like Structure:** ✅ Uses CardBase  
**Responsibility:** Displays promotional content (title, description, CTA button)

### 1.7 ProfileCard
**Path:** `src/DOMAIN/auth/ProfileCard.tsx`  
**Layer:** DOMAIN  
**Status:** ✅ STABLE (Phase 1 completed)  
**Card-like Structure:** ✅ Uses Card (COMPOSITION)  
**Responsibility:** Displays user profile information (name, email, avatar)

---

## 2. Foundation/Locked Components (DO NOT MODIFY)

### 2.1 CardBase
**Path:** `src/PATTERNS/cards/CardBase/CardBase.tsx`  
**Layer:** PATTERNS  
**Status:** 🔒 PROCESS LOCKED (2025-12-27, Second Pass: 2026-01-01)  
**Card-like Structure:** ✅ Foundation card component  
**Responsibility:** Base card layout pattern for domain cards (ImageWrapper, ContentWrapper, FooterWrapper)

### 2.2 Card (COMPOSITION)
**Path:** `src/COMPOSITION/layout/Card/Card.tsx`  
**Layer:** COMPOSITION  
**Status:** 🔒 LOCK READY (Pipeline 18A Complete: 2026-01-01)  
**Card-like Structure:** ✅ Generic card container  
**Responsibility:** Generic card container with Header/Body/Footer subcomponents

### 2.3 Surface
**Path:** `src/COMPOSITION/layout/Surface/Surface.tsx`  
**Layer:** COMPOSITION  
**Status:** 🔒 LOCKED (2025-12-15, Pipeline 18A Complete: 2025-12-26)  
**Card-like Structure:** ✅ Surface elevation variant container  
**Responsibility:** Surface elevation variant container (semantic abstraction over Box)

---

## 3. Pseudo-Cards (Components behaving like Cards but not named as such)

### 3.1 NotificationCenter.Panel
**Path:** `src/DOMAIN/notifications/NotificationCenter.Panel.tsx`  
**Layer:** DOMAIN  
**Status:** ⚠️ PSEUDO_CARD CANDIDATE  
**Card-like Structure:** ✅ Uses Surface with border, radius, shadow, padding  
**Structure Analysis:**
- Uses `Surface` component with `variant="elevated"`
- Has border, radius, shadow, padding via Surface props
- Has card-like visual structure (surface + content)
- **Not named as Card** - named as Panel

**Responsibility:** Side drawer panel for displaying notification center (header, grouped lists, scrollable area)

**Card-like Properties:**
- Surface with elevation (shadow)
- Border radius
- Padding
- Background
- Structured content (header + body)

---

## 4. Sections Using Cards (NOT Cards themselves)

### 4.1 FeatureSection
**Path:** `src/DOMAIN/sections/FeatureSection.tsx`  
**Layer:** DOMAIN  
**Status:** ✅ NOT_A_CARD  
**Card-like Structure:** Uses Card component internally  
**Responsibility:** Section component that displays features in a grid layout using Card components

**Analysis:** This is a section component, not a card. It uses Card components to display individual features, but the component itself is a section layout.

### 4.2 TrendingSection
**Path:** `src/DOMAIN/sections/TrendingSection.tsx`  
**Layer:** DOMAIN  
**Status:** ✅ NOT_A_CARD  
**Card-like Structure:** Uses Card component internally  
**Responsibility:** Section component that displays trending items using Card component

**Analysis:** This is a section component, not a card. It uses Card component to display trending content, but the component itself is a section layout.

---

## 5. Skeletons (NOT Cards)

### 5.1 EventCardSkeleton
**Path:** `src/PATTERNS/states/LoadingState/EventCardSkeleton/EventCardSkeleton.tsx`  
**Layer:** PATTERNS  
**Status:** ✅ NOT_A_CARD  
**Card-like Structure:** Uses DOMAIN_TOKENS for surface styling (radius, bg, shadow, padding)  
**Responsibility:** Loading skeleton for EventCard component

**Analysis:** This is a skeleton component, not a card. It mimics EventCard structure for loading states but is not a card component itself.

### 5.2 VenueCardSkeleton
**Path:** `src/PATTERNS/states/LoadingState/VenueCardSkeleton/VenueCardSkeleton.tsx`  
**Layer:** PATTERNS  
**Status:** ✅ NOT_A_CARD  
**Card-like Structure:** Uses DOMAIN_TOKENS for surface styling (radius, bg, shadow, padding)  
**Responsibility:** Loading skeleton for VenueCard component

**Analysis:** This is a skeleton component, not a card. It mimics VenueCard structure for loading states but is not a card component itself.

---

## 6. Menu Components (NOT Cards)

### 6.1 HoverCard
**Path:** `src/PATTERNS/menus/hover-card/`  
**Layer:** PATTERNS  
**Status:** ✅ NOT_A_CARD  
**Card-like Structure:** Wraps PopoverContent (which may have card-like styling)  
**Responsibility:** Menu component for hover-triggered popover content

**Components:**
- `HoverCardRoot.tsx` - Root component managing state
- `HoverCardTrigger.tsx` - Trigger element
- `HoverCardContent.tsx` - Content wrapper (uses PopoverContent)

**Analysis:** This is a menu component (Popover wrapper), not a card. The name "Card" is misleading - it's a hover-triggered popover menu, not a card component.

---

## Summary by Category

### Domain Cards (7)
- EventCard ✅
- VenueCard ✅
- ArtistCard ✅
- TicketCard ✅
- CategoryCard ✅
- PromoCard ✅
- ProfileCard ✅

### Foundation/Locked (3)
- CardBase 🔒
- Card (COMPOSITION) 🔒
- Surface 🔒

### Pseudo-Cards (1)
- NotificationCenter.Panel ⚠️

### Sections Using Cards (2)
- FeatureSection ✅
- TrendingSection ✅

### Skeletons (2)
- EventCardSkeleton ✅
- VenueCardSkeleton ✅

### Menu Components (1)
- HoverCard ✅

---

## Next Steps

1. **STEP 2:** Classify each component as DOMAIN_CARD / RUDIMENT_CARD / PSEUDO_CARD / NOT_A_CARD
2. **STEP 3:** Review removal candidates (RUDIMENT_CARD components)
3. **STEP 4:** Safe removal or deprecation
4. **STEP 5:** Resolve pseudo-cards (NotificationCenter.Panel)
5. **STEP 6:** Audit closeout

---

**Inventory Complete:** 2026-01-01

