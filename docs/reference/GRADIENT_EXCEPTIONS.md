# Gradient Exceptions List

**Purpose:** Historical reference for gradient usage in Tenerife UI components.  
**Last Updated:** 2025-02-01  
**Status:** ✅ **FORMALIZED** - Gradients are now token-based

---

## ⚠️ Status Change: Gradients Formalized

**As of 2025-02-01**, all gradients have been **formalized as foundation tokens** in `src/FOUNDATION/tokens/gradients.ts`.

**Migration Status:**
- ✅ All gradients now use `GRADIENT_TOKENS` from foundation tokens
- ✅ Component inline gradients migrated to token references
- ✅ DOMAIN_TOKENS updated to reference `GRADIENT_TOKENS`
- ✅ No whitelist exceptions remain - all gradients are token-based

**New Usage Pattern:**
```typescript
import { GRADIENT_TOKENS } from "@/FOUNDATION/tokens/gradients";

// Use gradient tokens instead of inline classes
<div className={GRADIENT_TOKENS.brand.primary} />
<div className={GRADIENT_TOKENS.text.brand} />
```

**Reference:** See `docs/architecture/TOKEN_AUTHORITY.md` for gradient token documentation.

---

## Overview

This document serves as a **historical reference** for gradient usage patterns that have been formalized into the token system. All gradients are now managed through `GRADIENT_TOKENS` in `src/FOUNDATION/tokens/gradients.ts`.

Gradients are used sparingly in Tenerife UI to maintain brand consistency while supporting neon/nightlife aesthetic effects where appropriate.

---

## Allowed Gradient Classes

### 1. Text Gradients

**Purpose:** Decorative text effects for hero sections and featured content.

#### `bg-gradient-to-r from-accent-500 to-primary-600 bg-clip-text text-transparent`

- **Component:** `EventCard`
- **Usage:** Featured event badge text gradient
- **Location:** `src/PATTERNS/cards/EventCard/`
- **Rationale:** Creates vibrant text effect for trending/featured badges

#### `bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent`

- **Component:** `EventCard`
- **Usage:** Button text gradient
- **Location:** `src/PATTERNS/cards/EventCard/`
- **Rationale:** Premium button text effect

---

### 2. Background Gradients

#### `bg-gradient-to-r from-primary to-accent`

- **Component:** `ModeHero`
- **Usage:** Hero section background gradient
- **Location:** `src/COMPOSITION/layout/ModeHero/ModeHero.tsx`
- **Rationale:** Primary hero background for day/night mode showcase

#### `bg-gradient-to-r from-accent-500 to-primary-600`

- **Component:** `EventCard`
- **Usage:** Featured badge background
- **Location:** `src/PATTERNS/cards/EventCard/`
- **Rationale:** Vibrant badge background for featured events

#### `bg-gradient-to-r from-accent to-primary`

- **Component:** `VenueCard`
- **Usage:** Featured badge background
- **Location:** `src/PATTERNS/cards/VenueCard/`
- **Rationale:** Premium badge background for popular venues

#### `bg-gradient-to-br from-surface-elevated1 to-surface-elevated2`

- **Component:** `EventCard`
- **Usage:** Image placeholder background (historical; now unified to surface.muted)
- **Location:** `src/PATTERNS/cards/EventCard/`
- **Rationale:** Subtle surface gradient for image placeholders

#### `bg-gradient-to-br from-muted to-muted/50`

- **Component:** `VenueCard`
- **Usage:** Image placeholder background
- **Location:** `src/PATTERNS/cards/VenueCard/`
- **Rationale:** Subtle muted gradient for image placeholders

---

### 3. Overlay Gradients

#### `bg-gradient-to-t from-black/60 via-transparent to-transparent`

- **Component:** `EventCard`, `VenueCard`
- **Usage:** Image overlay for hover effects
- **Location:** `src/PATTERNS/cards/EventCard/`, `src/PATTERNS/cards/VenueCard/`
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

1. **Use gradient tokens** - Always use `GRADIENT_TOKENS` from `src/FOUNDATION/tokens/gradients.ts`
2. **Use token colors** - All gradients reference foundation color tokens (`primary`, `accent`, `secondary`, `surface-*`)
3. **Maintain contrast** - Ensure text remains readable over gradients
4. **Limit opacity** - Use opacity modifiers sparingly (`/20`, `/30`, `/50`)
5. **Add new gradients to tokens** - New gradients must be added to `GRADIENT_TOKENS`, not as inline classes
6. **Test accessibility** - Verify WCAG contrast requirements

---

## Component-Specific Rules

### ModeHero

- **✅ Formalized:** Visual equivalent of `GRADIENT_TOKENS.brand.primary`; implemented via inline `style` (not token reference).
- **Token Reference:** `src/FOUNDATION/tokens/gradients.ts`
- **Purpose:** Brand identity hero background
- **No other gradients allowed**

### EventCard

- **✅ Formalized:**
  - Badge: `GRADIENT_TOKENS.brand.featured` (via `DOMAIN_TOKENS.badges.surface.featured`)
  - Placeholder: `GRADIENT_TOKENS.surface.muted` (via `DOMAIN_TOKENS.image.placeholder.gradient`; shared for all cards)
  - Overlay: `GRADIENT_TOKENS.overlay.dark` (via `DOMAIN_TOKENS.image.overlay.gradient`)
  - Text: `GRADIENT_TOKENS.text.brand`

### VenueCard

- **✅ Formalized:**
  - Badge: `GRADIENT_TOKENS.brand.reversed` (via `DOMAIN_TOKENS.badges.surface.featured`)
  - Placeholder: `GRADIENT_TOKENS.surface.muted` (via `DOMAIN_TOKENS.image.placeholder.gradient`)
  - Overlay: `GRADIENT_TOKENS.overlay.dark` (via `DOMAIN_TOKENS.image.overlay.gradient`)

### ArtistCard

- **✅ Formalized:**
  - Badge: `GRADIENT_TOKENS.brand.featured` (via `DOMAIN_TOKENS.badges.surface.featured`)
  - Placeholder: `GRADIENT_TOKENS.surface.muted` (via `DOMAIN_TOKENS.image.placeholder.gradient`)
  - Overlay: `GRADIENT_TOKENS.overlay.dark` (via `DOMAIN_TOKENS.image.overlay.gradient`)

### TicketCard

- **✅ Formalized:**
  - Badge: `GRADIENT_TOKENS.brand.featured` (via `DOMAIN_TOKENS.badges.surface.featured`)
  - Placeholder: `GRADIENT_TOKENS.surface.muted` (via `DOMAIN_TOKENS.image.placeholder.gradient`)
  - Overlay: `GRADIENT_TOKENS.overlay.dark` (via `DOMAIN_TOKENS.image.overlay.gradient`)

### PromoCard

- **✅ Formalized:**
  - Badge: `GRADIENT_TOKENS.brand.featured` (via `DOMAIN_TOKENS.badges.surface.featured`)
  - Overlay: `GRADIENT_TOKENS.overlay.dark` (via `DOMAIN_TOKENS.image.overlay.gradient`)

### CategoryCard

- **✅ Formalized:**
  - Badge: `GRADIENT_TOKENS.brand.featured` (via `DOMAIN_TOKENS.badges.surface.featured`)
  - Placeholder: `GRADIENT_TOKENS.surface.muted` (via `DOMAIN_TOKENS.image.placeholder.gradient`)
  - Overlay: `GRADIENT_TOKENS.overlay.dark` (via `DOMAIN_TOKENS.image.overlay.gradient`)

---

## Maintenance

### Adding New Gradients

1. **Request approval** - New gradients must be approved by design team
2. **Add to GRADIENT_TOKENS** - Add gradient to `src/FOUNDATION/tokens/gradients.ts`
3. **Update documentation** - Update `docs/architecture/TOKEN_AUTHORITY.md` if needed
4. **Update checker** - Update `scripts/check-ui-consistency.ts` to recognize new token pattern
5. **Document rationale** - Explain why gradient is needed in token file comments
6. **Test accessibility** - Verify contrast and readability

### Review Process

- **Quarterly review** - Review all gradients for continued relevance
- **Component audit** - Check for unauthorized gradient usage
- **Brand alignment** - Ensure gradients support brand identity

---

## Related Documentation

- [Integration Guide](./INTEGRATION_GUIDE.md) - General UI usage guidelines
- [Tokens Overview](./TOKENS_OVERVIEW.md) - Design token system

---

**Status:** ✅ **FORMALIZED** - Gradients are now token-based  
**Version:** 2.0.0  
**Last Updated:** 2025-02-01  
**Migration Date:** 2025-02-01
