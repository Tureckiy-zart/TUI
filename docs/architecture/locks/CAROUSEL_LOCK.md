# Carousel Extension Lock

**Version:** 1.0  
**Date Created:** 2026-01-31  
**Last Updated:** 2026-01-31  
**Status:** LOCKED - IMMUTABLE  
**Layer:** EXTENSION / COMPOSITION  
**Priority:** CRITICAL  
**Lock Date:** 2026-01-29  
**Task ID:** TUI_EXT_CAROUSEL_001, TUI_EXT_CAROUSEL_FIX_004

---

## Purpose

This document **formally locks** the Carousel Extension component of `@tenerife.music/ui`. Carousel is a production-grade compound carousel/slider with batteries-included API.

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

**Canon:** [CAROUSEL_SIMPLE_API_CANON.md](../extension/CAROUSEL_SIMPLE_API_CANON.md)

---

## Locked Components

### Carousel

- **Location:** `src/COMPOSITION/carousel/Carousel/`
- **Status:** LOCKED (Component Creation Pipeline Complete, API simplification TUI_EXT_CAROUSEL_FIX_004)
- **Lock Date:** 2026-01-29
- **Component Type:** Extension Layer Composite — compound carousel (batteries-included)
- **Purpose:** Production-grade carousel/slider with compound-only API; Root, Track, Slide, Prev, Next, Indicators
- **Exports:** `Carousel` (compound: Root, Track, Slide, Prev, Next, Indicators), and types `CarouselRootProps`, `CarouselOrientation`, `CarouselProps`, `CarouselSlideProps`, `CarouselTrackProps`, `CarouselPrevProps`, `CarouselNextProps`, `CarouselIndicatorsProps`. No CarouselControls.
- **Creation Report:** `docs/reports/creation/Carousel_CREATION_REPORT.md`
- **Rule:** Future structural or API modifications require re-entry into Pipeline 18A or explicit unlock procedure

---

## Locked Architecture

- Compound-only API (no Simple API in public surface)
- Simple API explicitly forbidden (compound-only; decision fixed at lock)
- Prev/Next composed directly inside Track
- No visual props in public API; internal tokens only (carousel.tokens.ts)
- Foundation Composition: Uses Button from PRIMITIVES for Prev/Next
- Single-viewport carousel only; multi-card rail/Scroller is a separate pattern and out of scope

---

## Forbidden Actions

- Modifying compound API structure
- Adding CarouselControls to public API
- Adding Simple API or Simple API wrapper
- Adding visual props to public API
- Breaking accessibility contract

---

## Unlock Procedure

1. Create unlock request with justification
2. Get architectural approval
3. Re-enter Pipeline 18A or Component Creation Pipeline
4. Complete full audit
5. Re-lock with updated documentation

---

## Related Documents

- [CAROUSEL_SIMPLE_API_CANON.md](../extension/CAROUSEL_SIMPLE_API_CANON.md)
- [EXTENSION_STATE.md](../EXTENSION_STATE.md)
