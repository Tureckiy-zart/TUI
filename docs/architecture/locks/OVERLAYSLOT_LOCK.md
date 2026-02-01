# OverlaySlot Extension Lock (Phase L)

**Version:** 1.0  
**Date Created:** 2026-01-31  
**Last Updated:** 2026-01-31  
**Status:** LOCKED - IMMUTABLE  
**Layer:** EXTENSION / COMPOSITION  
**Priority:** CRITICAL  
**Task ID:** TUNG_LOCK_PHASE_L_OVERLAY_HEROMEDIA_001  
**Lock Date:** 2026-01-31

---

## Purpose

This document **formally locks** the OverlaySlot Extension capability of `@tenerife.music/ui`. OverlaySlot is the single source of truth for overlay positioning (badge, icon, label over content).

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

**Canon:** [OVERLAYSLOT_CANON.md](../extension/OVERLAYSLOT_CANON.md)

---

## Locked Components

### OverlaySlot

- **Location:** `src/COMPOSITION/overlay/OverlaySlot/`
- **Status:** LOCKED (Phase L — Overlay + HeroMedia)
- **Lock Date:** 2026-01-31
- **Component Type:** Extension Layer — overlay positioning primitive
- **Purpose:** Single source of truth for overlay positioning; compound API Root/Anchor/Item; non-interactive. OverlaySlot is the only allowed place for raw overlay positioning logic; consumer code must not implement raw positioning.
- **Exports:** `OverlaySlot`, `OverlaySlot.Root`, `OverlaySlot.Anchor`, `OverlaySlot.Item`, and related types
- **Rules:** OverlaySlot MUST NOT implement product-specific logic; MUST remain non-interactive; MUST be single source of truth for overlay positioning; No Simple API
- **Rule:** Modifications only via new Phase L audit; hotfixes require explicit LOCK exception per TUNG policy

---

## Locked Architecture

- Compound API only (Root, Anchor, Item)
- Non-interactive positioning primitive
- Fixed positions via closed enum
- Only allowed place for raw overlay positioning logic; consumer code must not implement raw positioning

---

## Forbidden Actions

- Adding product-specific logic
- Making OverlaySlot interactive
- Creating Simple API wrapper
- Bypassing canon structure

---

## Unlock Procedure

1. Create Phase L unlock request
2. Get architectural approval
3. Complete Phase L audit
4. Re-lock with updated documentation

---

## Related Documents

- [OVERLAYSLOT_CANON.md](../extension/OVERLAYSLOT_CANON.md)
- [EXTENSION_STATE.md](../EXTENSION_STATE.md)
- [EXTENSION_CAPABILITY_MAP.md](../extension/EXTENSION_CAPABILITY_MAP.md)
