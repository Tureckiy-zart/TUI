# Gradient Exceptions List

**Purpose:** Whitelist of allowed gradient classes in Tenerife UI components.  
**Last Updated:** 2025-11-23  
**Status:** Active

---

## Overview

This document defines the list of gradient classes that are **explicitly allowed** in Tenerife UI components. All other gradient usage should be flagged by the UI consistency checker.

Gradients are used sparingly in Tenerife UI to maintain brand consistency while supporting neon/nightlife aesthetic effects where appropriate.

---

## Allowed Gradient Classes

### 1. Text Gradients

**Purpose:** Decorative text effects for hero sections and featured content.

#### `bg-gradient-to-r from-accent-500 to-primary-600 bg-clip-text text-transparent`

- **Component:** `EventCard`
- **Usage:** Featured event badge text gradient
- **Location:** `src/components/cards/EventCard.tsx`
- **Rationale:** Creates vibrant text effect for trending/featured badges

#### `bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent`

- **Component:** `EventCard`
- **Usage:** Button text gradient
- **Location:** `src/components/cards/EventCard.tsx`
- **Rationale:** Premium button text effect

---

### 2. Background Gradients

#### `bg-gradient-to-r from-primary to-accent`

- **Component:** `ModeHero`
- **Usage:** Hero section background gradient
- **Location:** `src/components/layout/ModeHero.tsx`
- **Rationale:** Primary hero background for day/night mode showcase

#### `bg-gradient-to-r from-accent-500 to-primary-600`

- **Component:** `EventCard`
- **Usage:** Featured badge background
- **Location:** `src/components/cards/EventCard.tsx`
- **Rationale:** Vibrant badge background for featured events

#### `bg-gradient-to-r from-accent to-primary`

- **Component:** `VenueCard`
- **Usage:** Featured badge background
- **Location:** `src/components/cards/VenueCard.tsx`
- **Rationale:** Premium badge background for popular venues

#### `bg-gradient-to-br from-surface-elevated1 to-surface-elevated2`

- **Component:** `EventCard`
- **Usage:** Image placeholder background
- **Location:** `src/components/cards/EventCard.tsx`
- **Rationale:** Subtle surface gradient for image placeholders

#### `bg-gradient-to-br from-muted to-muted/50`

- **Component:** `VenueCard`
- **Usage:** Image placeholder background
- **Location:** `src/components/cards/VenueCard.tsx`
- **Rationale:** Subtle muted gradient for image placeholders

#### `bg-gradient-to-br from-primary/20 to-accent/20`

- **Component:** `HeroSection` (stories)
- **Usage:** Hero section background overlay
- **Location:** `src/components/sections/HeroSection.stories.tsx`
- **Rationale:** Subtle hero background overlay

#### `bg-gradient-to-br from-primary/30 via-accent/30 to-secondary/30`

- **Component:** `HeroSection` (stories)
- **Usage:** Hero section background overlay with via color
- **Location:** `src/components/sections/HeroSection.stories.tsx`
- **Rationale:** Multi-color hero background overlay

---

### 3. Overlay Gradients

#### `bg-gradient-to-t from-black/60 via-transparent to-transparent`

- **Component:** `EventCard`, `VenueCard`
- **Usage:** Image overlay for hover effects
- **Location:** `src/components/cards/EventCard.tsx`, `src/components/cards/VenueCard.tsx`
- **Rationale:** Dark overlay gradient for image hover states

---

## Gradient Patterns

### Allowed Patterns

1. **Direction Classes:**
   - `bg-gradient-to-r` (right)
   - `bg-gradient-to-br` (bottom-right)
   - `bg-gradient-to-t` (top)

2. **Color Combinations:**
   - `from-primary to-accent` - Primary brand gradient
   - `from-accent to-primary` - Reversed brand gradient
   - `from-accent-500 to-primary-600` - Specific shade gradient
   - `from-surface-elevated1 to-surface-elevated2` - Surface gradient
   - `from-muted to-muted/50` - Muted gradient
   - `from-black/60 via-transparent to-transparent` - Overlay gradient

3. **Utility Classes:**
   - `bg-clip-text` - For text gradients
   - `text-transparent` - For text gradients
   - Opacity modifiers (`/20`, `/30`, `/50`, `/60`)

---

## Prohibited Patterns

The following gradient patterns are **NOT allowed** and should be flagged:

1. **Arbitrary gradient values:**
   - `bg-gradient-to-r from-[#ff0000] to-[#00ff00]` ❌
   - Use token colors instead ✅

2. **Non-brand color gradients:**
   - `bg-gradient-to-r from-red-500 to-blue-500` ❌
   - Use primary/accent/secondary tokens ✅

3. **Excessive gradient usage:**
   - Multiple gradients in a single component (unless documented) ❌
   - Gradients in utility components ❌

---

## Usage Guidelines

### When to Use Gradients

✅ **Allowed:**

- Hero sections and landing pages
- Featured badges and highlights
- Image overlays for hover effects
- Premium/featured content indicators
- Brand identity elements (ModeHero)

❌ **Not Allowed:**

- Regular buttons (use solid colors)
- Form inputs
- Navigation elements
- Utility components
- Standard cards (unless featured)

### Best Practices

1. **Use token colors** - Always use design tokens (`primary`, `accent`, `secondary`, `surface-*`)
2. **Maintain contrast** - Ensure text remains readable over gradients
3. **Limit opacity** - Use opacity modifiers sparingly (`/20`, `/30`, `/50`)
4. **Document exceptions** - Add new gradients to this list before use
5. **Test accessibility** - Verify WCAG contrast requirements

---

## Component-Specific Rules

### ModeHero

- **Allowed:** `bg-gradient-to-r from-primary to-accent`
- **Purpose:** Brand identity hero background
- **No other gradients allowed**

### EventCard

- **Allowed:**
  - Badge: `bg-gradient-to-r from-accent-500 to-primary-600`
  - Placeholder: `bg-gradient-to-br from-surface-elevated1 to-surface-elevated2`
  - Overlay: `bg-gradient-to-t from-black/60 via-transparent to-transparent`
  - Text: `bg-gradient-to-r from-accent-500 to-primary-600 bg-clip-text text-transparent`

### VenueCard

- **Allowed:**
  - Badge: `bg-gradient-to-r from-accent to-primary`
  - Placeholder: `bg-gradient-to-br from-muted to-muted/50`
  - Overlay: `bg-gradient-to-t from-black/60 via-transparent to-transparent`

### HeroSection

- **Allowed:** Background overlays with opacity (`/20`, `/30`)
- **Purpose:** Subtle hero backgrounds

---

## Maintenance

### Adding New Gradients

1. **Request approval** - New gradients must be approved by design team
2. **Update this list** - Add gradient to appropriate section
3. **Update checker** - Add to whitelist in `scripts/check-ui-consistency.ts`
4. **Document rationale** - Explain why gradient is needed
5. **Test accessibility** - Verify contrast and readability

### Review Process

- **Quarterly review** - Review all gradients for continued relevance
- **Component audit** - Check for unauthorized gradient usage
- **Brand alignment** - Ensure gradients support brand identity

---

## Related Documentation

- [UI Integration Guide](../UI_INTEGRATION.md) - General UI usage guidelines
- [Tokens Guide](../TOKENS_GUIDE.md) - Design token system
- [Theme Guide](../THEME_GUIDE.md) - Theme customization

---

**Status:** ✅ Active  
**Version:** 1.0.0  
**Last Reviewed:** 2025-11-23
