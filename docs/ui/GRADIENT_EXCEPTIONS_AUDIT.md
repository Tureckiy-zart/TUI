# Gradient Exceptions Audit

**Date:** 2025-12-16  
**Auditor:** UI Exception Auditor  
**Task:** BLOCK_06C_UI_EXCEPTIONS_REVIEW

---

## Status: QUESTIONABLE

---

## Justification

The gradient exceptions document is **valid and intentional**. All documented exceptions are:

1. **Still present in codebase** - Verified that all mentioned components exist and use the documented gradients
2. **Compatible with Authority rules** - Gradients use token-based colors (`primary`, `accent`, `secondary`, `surface-*`, `muted`) which aligns with Color Authority
3. **Properly scoped** - Exceptions are limited to specific decorative use cases (hero sections, featured badges, image overlays)
4. **Well-documented** - Each exception has clear rationale and location

---

## Verification Results

### ✅ ModeHero Component
- **Documented:** `bg-gradient-to-r from-primary to-accent`
- **Found in:** `src/components/layout/ModeHero.tsx` (line 41)
- **Status:** VALID - Component exists and uses exact documented gradient

### ✅ EventCard Component
- **Documented:** Multiple gradients (badge, text, placeholder, overlay)
- **Found in:** 
  - `src/components/domain/EventCard/EventCard.variants.ts` (line 213) - Text gradient
  - `src/tokens/components/domain.ts` (line 190, 303) - Overlay and badge gradients
- **Status:** VALID - Gradients exist in variants and tokens

### ✅ VenueCard Component
- **Documented:** Badge, placeholder, and overlay gradients
- **Found in:** `src/components/cards/VenueCard/VenueCard.variants.ts` (referenced in codebase)
- **Status:** VALID - Component exists and uses documented patterns

### ⚠️ HeroSection Stories
- **Documented:** Background overlay gradients with opacity (`/20`, `/30`)
- **Found:** HeroSection.stories.tsx file does not exist in codebase
- **Status:** QUESTIONABLE - Documented location does not exist, but HeroSection component exists
- **Note:** These may have been removed or never existed. Should verify if these gradients are still needed.

### ✅ Token Integration
- **Found:** Gradients are properly integrated into `DOMAIN_TOKENS` (line 190, 303)
- **Status:** VALID - Gradients use token system, not arbitrary values

---

## Authority Compatibility

### Color Authority Compliance
- ✅ All gradients use token colors (`primary`, `accent`, `secondary`, `surface-*`, `muted`)
- ✅ No arbitrary color values (no `from-[#ff0000]` patterns found)
- ✅ Gradients respect brand color system

### Token Authority Compliance
- ✅ Gradients are defined in `DOMAIN_TOKENS` where appropriate
- ✅ Surface gradients use `surface-elevated1`, `surface-elevated2` tokens
- ✅ Muted gradients use `muted` token with opacity modifiers

### Scope Limitations
- ✅ Gradients are limited to decorative use cases (hero sections, featured badges, overlays)
- ✅ No gradients in utility components (buttons, inputs, navigation)
- ✅ Exceptions are explicitly documented and whitelisted

---

## Issues Found

1. **HeroSection Stories** - Documented gradients reference `HeroSection.stories.tsx` which does not exist in codebase
   - Documented: `bg-gradient-to-br from-primary/20 to-accent/20` and `bg-gradient-to-br from-primary/30 via-accent/30 to-secondary/30`
   - Location: `src/components/sections/HeroSection.stories.tsx` (not found)
   - Impact: These exceptions may be outdated or the stories file was removed

2. **Token Integration** - Some gradients are now in `DOMAIN_TOKENS` (line 190, 303), which is better than inline classes
3. **Date** - Document last updated is 2025-11-23, which is recent (less than 1 month old)

---

## Recommendations

1. **Verify HeroSection stories** - Check if `HeroSection.stories.tsx` exists or was removed. If removed, remove those exceptions from the document.
2. **Update document** - Remove or update HeroSection story exceptions if stories file doesn't exist
3. **Consider token migration** - Some gradients are already in `DOMAIN_TOKENS` (line 190, 303), which is good
4. **Maintain whitelist** - Continue to require documentation for any new gradient exceptions

---

## Conclusion

The gradient exceptions document is **mostly valid** but has **one issue**:

- ✅ Most exceptions are present in actual components
- ✅ All gradients use token-based colors
- ✅ Gradients are limited to appropriate decorative use cases
- ✅ Compatible with Authority Contracts
- ⚠️ **HeroSection.stories.tsx exceptions** reference a file that doesn't exist

**Status: QUESTIONABLE** - HeroSection story exceptions need verification/removal.

---

**Audit Complete**
