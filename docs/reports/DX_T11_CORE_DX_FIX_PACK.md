# DX T11 Core DX Fix Pack

## Context
This fix pack consolidates DX hardening findings from AI-driven consumer usage. It focuses on safe-by-default behavior for Tabs, Badge, Carousel, and HeroMedia, and confirms Surface as the canonical primitive for elevated containers.

## Change Summary
- Tabs indicator containment is already fixed; this report references the existing fix report.
- Badge inline sizing is locked with a regression test to prevent stretch regressions.
- Carousel indicators centering is locked with a regression test.
- Carousel contract is explicitly documented as single-viewport only in the lock doc.
- HeroMedia now warns in dev when root children are not `HeroMedia.Media` or `HeroMedia.Overlay`.
- Surface is confirmed as the canonical primitive and referenced here (no new component added).

## Risk Assessment
- **Badge/Carousel tests:** Low risk; tests only, no runtime behavior changes.
- **HeroMedia warning:** Dev-only warning; no runtime behavior change in production.
- **Carousel lock doc update:** Documentation-only, no behavioral impact.

## Acceptance Checklist
- [x] Tabs indicator bleed fix referenced and validated.
- [x] Badge inline sizing regression test added.
- [x] Carousel indicators centering regression test added.
- [x] Carousel single-viewport contract explicit in lock doc.
- [x] HeroMedia invalid child structure warning added.
- [x] Surface confirmed as canonical primitive in documentation.
- [ ] Manual pet project verification complete.

## References
- `docs/reports/DX_TABS_INDICATOR_FIX_REPORT.md`
- `docs/reports/TUI_DX_PET_PROJECT/DX_T10_BADGE_CAROUSEL_A11Y_AUDIT.md`
- `docs/architecture/locks/CAROUSEL_LOCK.md`
- `src/PRIMITIVES/Badge/Badge.test.tsx`
- `src/COMPOSITION/carousel/Carousel/Carousel.test.tsx`
- `src/COMPOSITION/hero/HeroMedia/HeroMedia.tsx`
- `src/COMPOSITION/hero/HeroMedia/HeroMedia.test.tsx`
- `src/COMPOSITION/layout/Surface/Surface.tsx`
