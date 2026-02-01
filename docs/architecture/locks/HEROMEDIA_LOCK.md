# HeroMedia Extension Lock (Phase L)

**Version:** 1.0  
**Date Created:** 2026-01-31  
**Last Updated:** 2026-01-31  
**Status:** LOCKED - IMMUTABLE  
**Layer:** EXTENSION / COMPOSITION  
**Priority:** CRITICAL  
**Task ID:** TUNG_LOCK_PHASE_L_OVERLAY_HEROMEDIA_001  
**Lock Date:** 2026-01-30

---

## Purpose

This document **formally locks** the HeroMedia Extension capability of `@tenerife.music/ui`. HeroMedia is the canonical entry point for hero blocks combining media (image, video, carousel) with overlay content.

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

**Canon:** [HEROMEDIA_CANON.md](../extension/HEROMEDIA_CANON.md)

---

## Locked Components

### HeroMedia

- **Location:** `src/COMPOSITION/hero/HeroMedia/`
- **Status:** LOCKED (Phase L — Overlay + HeroMedia)
- **Lock Date:** 2026-01-30
- **Component Type:** Extension Layer Composite — hero media and overlay composition
- **Purpose:** Canonical entry point for hero blocks combining media (image, video, carousel) with overlay content. Uses OverlaySlot for overlay positioning; no internal overlay positioning.
- **Exports:** `HeroMedia` (compound: Root, Media, Overlay), and related types
- **Rule:** Modifications only via new Phase L audit; hotfixes require explicit LOCK exception per TUNG policy

---

## Locked Architecture

- Structure, accessibility, and layering per HEROMEDIA_CANON.md
- Composes Carousel for hero carousel capability
- Uses OverlaySlot for overlay positioning

---

## Forbidden Actions

- Modifying API without Phase L audit
- Bypassing canon structure
- Adding product-specific logic

---

## Unlock Procedure

1. Create Phase L unlock request
2. Get architectural approval
3. Complete Phase L audit
4. Re-lock with updated documentation

---

## Related Documents

- [HEROMEDIA_CANON.md](../extension/HEROMEDIA_CANON.md)
- [EXTENSION_STATE.md](../EXTENSION_STATE.md)
- [EXTENSION_CAPABILITY_MAP.md](../extension/EXTENSION_CAPABILITY_MAP.md)
