# SurfaceElevation Extension Lock (CANON)

**Version:** 1.0  
**Date Created:** 2026-01-31  
**Last Updated:** 2026-01-31  
**Status:** LOCKED (CANON) — IMMUTABLE  
**Layer:** EXTENSION / COMPOSITION  
**Priority:** CRITICAL  
**Task ID (Phase L):** TUI_PHASE_L_SURFACE_ELEVATION_DESIGN_001  
**Canonicalization:** TUI_CANON_SURFACE_ELEVATION_AND_INVERSE_TYPOGRAPHY_001  
**Lock Date:** 2026-01-31

---

## Purpose

This document **formally locks** the SurfaceElevation Extension capability of `@tenerife.music/ui`. SurfaceElevation is the canonical declaration of "elevated surface" context at composition level without raw box-shadow, ad-hoc z-index, or token bypass.

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

**Canon:** [SURFACE_ELEVATION_CANON.md](../extension/SURFACE_ELEVATION_CANON.md) — authoritative reference.

**Application:** Composition level only; not inside primitives or atoms. Do not use to add elevation context inside Layout or Foundation components.

---

## Locked Components

### SurfaceElevation

- **Location:** `src/COMPOSITION/surface-elevation/`
- **Status:** LOCKED (CANON) — Surface elevation semantics
- **Lock Date:** 2026-01-31
- **Component Type:** Extension Layer — elevated surface (semantic context)
- **Purpose:** Declare "elevated surface" at composition level so blocks (overlays, panels, cards, banners) apply elevation semantics consistently using only existing [ELEVATION_AUTHORITY.md](../ELEVATION_AUTHORITY.md) tokens.
- **Exports:** `SurfaceElevation`, `SurfaceElevation.Root`, `useSurfaceElevation`, `SurfaceElevationRootProps`, `SurfaceElevationLevel`, `SurfaceElevationCompositionReference`, `SurfaceElevationCompositionReferenceProps`
- **Rule:** Modifications only via Phase L / CANON audit; hotfixes require explicit LOCK exception per TUNG policy.
- **Phase L.3 (2026-02-01):** Implementation complete — context + visual effect via existing tokens only; SurfaceElevation.Root sets context only (no styles); useSurfaceElevation() for compositions; dev-only nesting guard; tests (nesting dev/prod, context propagation, SSR-safe); etalon SurfaceElevationCompositionReference.

---

## Locked Architecture

- Scope and semantics per SURFACE_ELEVATION_CANON.md
- Elevation scale and tokens from ELEVATION_AUTHORITY only; no new elevation tokens or scale changes in this capability

---

## Forbidden Actions

- Using SurfaceElevation inside primitives or atoms; it is composition-level only (see Canon).
- For elevated surface semantics when SurfaceElevation can be used: raw box-shadow, ad-hoc z-index, or elevation logic outside SurfaceElevation — all forbidden; SurfaceElevation is the single canonical mechanism (see Canon).
- Adding prop-level elevation context (e.g. elevated, surfaceLevel) to Layout or Foundation components.
- Introducing new elevation tokens or changing the elevation scale in this capability.
- Applying elevation context in Foundation or Layout components.

---

## Related Documents

- [SURFACE_ELEVATION_CANON.md](../extension/SURFACE_ELEVATION_CANON.md)
- [ELEVATION_AUTHORITY.md](../ELEVATION_AUTHORITY.md)
- [EXTENSION_STATE.md](../EXTENSION_STATE.md)
- [EXTENSION_CAPABILITY_MAP.md](../extension/EXTENSION_CAPABILITY_MAP.md)
- [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md) — Foundation must not add elevation context props
- [SURFACE_ELEVATION_INTENT.md](../../reports/SURFACE_ELEVATION_INTENT.md)
- [PHASE_L_CLOSURE_SUMMARY.md](../../reports/PHASE_L_CLOSURE_SUMMARY.md) — Phase L closure; SurfaceElevation § 2.3
