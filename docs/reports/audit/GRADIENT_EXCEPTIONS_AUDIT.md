# Gradient Exceptions Audit

**Date:** 2025-12-18  
**Auditor:** UI Exception Auditor  
**Task:** TUNG_TOKEN_SYSTEM_COMPLETION_02

---

## Status: ✅ FORMALIZED

---

## Migration Summary

**As of 2025-12-18**, all gradients have been **formalized as foundation tokens** in `src/FOUNDATION/tokens/gradients.ts`.

**Migration Status:**
- ✅ All gradients now use `GRADIENT_TOKENS` from foundation tokens
- ✅ Component inline gradients migrated to token references
- ✅ DOMAIN_TOKENS updated to reference `GRADIENT_TOKENS`
- ✅ No whitelist exceptions remain - all gradients are token-based

**Previous Status:** The gradient exceptions document was previously a whitelist of allowed gradient classes. All documented exceptions have been successfully migrated to the token system.

---

## Migration Results

### ✅ ModeHero Component
- **Previous:** `bg-gradient-to-r from-primary to-accent` (inline)
- **Migrated to:** `GRADIENT_TOKENS.brand.primary`
- **Location:** `src/COMPOSITION/layout/ModeHero/ModeHero.tsx`
- **Status:** ✅ MIGRATED - Now uses foundation gradient tokens

### ✅ EventCard Component
- **Previous:** Multiple inline gradients (badge, text, placeholder, overlay)
- **Migrated to:**
  - Badge: `GRADIENT_TOKENS.brand.featured` (via `DOMAIN_TOKENS.badges.surface.featured`)
  - Text: `GRADIENT_TOKENS.text.brand`
  - Placeholder: `GRADIENT_TOKENS.surface.elevated` (via `DOMAIN_TOKENS.image.placeholder.gradient`)
  - Overlay: `GRADIENT_TOKENS.overlay.dark` (via `DOMAIN_TOKENS.image.overlay.gradient`)
- **Status:** ✅ MIGRATED - All gradients now use foundation tokens

### ✅ VenueCard Component
- **Previous:** Badge, placeholder, and overlay gradients (inline)
- **Migrated to:** Uses `DOMAIN_TOKENS` which references `GRADIENT_TOKENS`
- **Status:** ✅ MIGRATED - Uses token-based gradients via DOMAIN_TOKENS

### ✅ PromoCard Component
- **Previous:** `bg-gradient-to-br from-surface-elevated1 to-surface-elevated2` (inline)
- **Migrated to:** `GRADIENT_TOKENS.surface.elevated`
- **Status:** ✅ MIGRATED - Now uses foundation gradient tokens

### ✅ Token Integration
- **Foundation Tokens:** All gradients defined in `src/FOUNDATION/tokens/gradients.ts`
- **DOMAIN_TOKENS:** Updated to reference `GRADIENT_TOKENS` instead of inline strings
- **Status:** ✅ COMPLETE - All gradients are token-based

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

All gradients have been **successfully formalized** into the token system:

- ✅ All gradients use `GRADIENT_TOKENS` from foundation tokens
- ✅ No inline gradient classes remain in components
- ✅ All gradients use token-based colors
- ✅ Gradients are limited to appropriate decorative use cases
- ✅ Compatible with Authority Contracts
- ✅ Token documentation updated in `TOKEN_AUTHORITY.md`
- ✅ UI consistency checker updated to validate token usage

**Status: ✅ FORMALIZED** - All gradients are now token-based. The whitelist exceptions document serves as historical reference only.

**Next Steps:**
- Monitor for any new gradient usage that bypasses tokens
- Ensure all new gradients are added to `GRADIENT_TOKENS`
- Maintain token discipline through code review

---

**Migration Complete** - 2025-12-18
