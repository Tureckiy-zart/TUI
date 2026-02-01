# Phase L — Decision Snapshot (Overlay + HeroMedia)

**Date:** 2026-01-31  
**Phase:** L — Extension Overlay + HeroMedia  
**Status:** LOCKED  
**Task ID:** TUNG_LOCK_PHASE_L_OVERLAY_HEROMEDIA_001

---

## Purpose

This document fixes the key architectural decisions made at Phase L lock so that handoff snapshots and future context do not contradict LOCK documents. It is a log-only snapshot; no code changes.

---

## Locked Decisions

1. **Carousel — Simple API consciously rejected at Phase L lock.**  
   Carousel is compound-only. Simple API is explicitly forbidden; decision fixed at lock. See [CAROUSEL_LOCK.md](../../architecture/locks/CAROUSEL_LOCK.md) and [EXTENSION_STATE.md](../../architecture/EXTENSION_STATE.md) §3.2.

2. **HeroMedia overlay responsibility delegated to OverlaySlot at Phase L lock.**  
   HeroMedia uses OverlaySlot for overlay positioning; it does not perform internal overlay positioning. See [HEROMEDIA_LOCK.md](../../architecture/locks/HEROMEDIA_LOCK.md) and [EXTENSION_STATE.md](../../architecture/EXTENSION_STATE.md) § Extension Capabilities LOCKED (Phase L).

3. **OverlaySlot is the single allowed raw-positioning surface.**  
   Raw overlay positioning logic is allowed only inside OverlaySlot; consumer code must not implement raw positioning. See [OVERLAYSLOT_LOCK.md](../../architecture/locks/OVERLAYSLOT_LOCK.md) and [EXTENSION_STATE.md](../../architecture/EXTENSION_STATE.md) § Extension Capabilities LOCKED (Phase L).

---

## Related Documents

- [EXTENSION_STATE.md](../../architecture/EXTENSION_STATE.md) — canonical component state (Carousel §3.2, HeroMedia, OverlaySlot Phase L)
- [PROJECT_PROGRESS.md](../../PROJECT_PROGRESS.md) — Extension Phase L summary
