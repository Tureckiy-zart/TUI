# SurfaceElevation — Canonical Capability Definition

**Package:** `@tenerife.music/ui`  
**Layer:** Extension / Architecture  
**Phase:** L — Extension API Canon  
**Status:** CANONICAL / LOCKED  
**Date Created:** 2026-01-31  
**Last Updated:** 2026-01-31  
**Task ID (Phase L):** TUI_PHASE_L_SURFACE_ELEVATION_DESIGN_001  
**Task ID (Canon):** TUI_CANON_SURFACE_ELEVATION_AND_INVERSE_TYPOGRAPHY_001

---

## Document Classification

**TYPE:** Canonical Capability Definition — **Authoritative reference** for implementation and consumers.  
**MUTABILITY:** Design-locked; changes only via explicit canon update  
**AUTHORITY DOMAIN:** Extension (Surface elevation semantics)

**Purpose:** This document defines SurfaceElevation as the **single canonical** Extension capability for declaring "elevated surface" context at composition level. It fixes scope, canonical rules, and forbidden usage. Implementation MUST follow this canon without reinterpretation. No new elevation tokens or scales are introduced; all values come from [ELEVATION_AUTHORITY.md](../ELEVATION_AUTHORITY.md).

---

## Purpose & Scope

**Purpose:** Provide a canonical Extension capability for declaring elevated surface semantics at composition level. Compositions MUST NOT apply raw box-shadow, ad-hoc z-index, or token bypass for elevation; SurfaceElevation is the **single canonical declaration** of where elevated surface context applies.

**Application level:** SurfaceElevation applies **only at composition level** (overlay panels, cards as surface containers, modals/panels above content, banners). It MUST NOT be used inside primitives or atoms, or to add elevation context inside Layout or Foundation components.

**Scope:**

- Semantic context "elevated surface" at composition level only
- Elevation expressed only via existing elevation and shadow tokens from [ELEVATION_AUTHORITY.md](../ELEVATION_AUTHORITY.md)
- No new tokens or scale changes; Elevation Authority remains the source of truth

**Out of Scope:**

- New elevation tokens or z-index scale changes
- Foundation or Layout component modifications
- Prop-level elevation context on Layout or Foundation components
- Typography, navigation, or layout positioning (orthogonal capabilities)

---

## Where It Applies (In Scope)

SurfaceElevation applies only at **composition-level** surfaces that require elevation semantics:

- **Overlay panels** — drawers, side panels; Surface wrapper for elevation and radius; z-index per Elevation Authority
- **Cards** (as surface containers) — Card/CardBase with default/elevated variants; semantic "surface with elevation"
- **Modals and panels above content** — surfaces that sit above base content; already tied to z-index layers (modal, overlay)
- **Banners / strips** — surfaces above content with distinct elevation relative to base plane
- **Other blocks** where a "Surface wrapper" or elevation variants are used or planned

---

## Where It Must NOT Apply (Out of Scope)

- **Typography roles** — elevation is orthogonal to text/heading semantics
- **Layout primitives** without surface semantics — Stack, Box (without surface role); they do not define elevation context
- **Navigation atoms** — navigation items are not elevated surfaces by default
- **Foundation components** — Elevation Authority and token usage remain unchanged; SurfaceElevation is the extension-level declaration of *where* elevated surface semantics apply

---

## Canonical Rules

- **SurfaceElevation is semantic context only.** It declares "this block is an elevated surface," not a styling or shadow mechanism. How the context is realised (e.g. wrapper, context, or composition) is an implementation concern.
- **Not all Cards are elevated.** Only compositions that explicitly declare SurfaceElevation are considered elevated. A Card used without SurfaceElevation context is not an elevated surface by default.
- **No component gains elevation by type alone.** No component (Card, Panel, Banner, etc.) gains elevation solely by type; elevation applies only where SurfaceElevation is explicitly declared at composition level.
- **Elevation scale and tokens remain in ELEVATION_AUTHORITY.** This capability only declares the semantic context in which those tokens are used. Responsibility for choosing the correct elevation token (e.g. which shadow, which z-index layer) for a given surface type remains with the composition owner and future implementation; SurfaceElevation states that such choices MUST use Elevation Authority tokens exclusively.
- **Nested or overridden surface elevation context** inside child blocks is not defined in this canon and is out of scope.

---

## Forbidden Usage & Boundaries

- **FORBIDDEN:** Using raw `box-shadow`, ad-hoc z-index, or token bypass for elevation in consumer or Extension code when SurfaceElevation can be used. SurfaceElevation is the **single canonical mechanism** for declaring elevated surface context.
- **FORBIDDEN:** Adding prop-level elevation context (e.g. `elevated`, `surfaceLevel`) to Layout or Foundation components. Elevation context belongs only to SurfaceElevation at composition level.
- **FORBIDDEN:** Introducing new elevation tokens or changing the elevation scale in this capability. All values MUST come from ELEVATION_AUTHORITY.
- **Boundary:** This capability is Extension-only. Foundation is not modified.

---

## Enforcement

- **Forbidden patterns:** Listed in Forbidden Usage & Boundaries above. Compliance is mandatory for new code and modifications after Phase L lock; existing code is not retroactively invalidated (per EXTENSION_STATE Usage Policy).
- **Current stage:** At canonicalization, enforcement is **documentation-level**. Rules are binding; lint or runtime checks may be introduced in a separate task. Decision: docs-first; no mandatory lint/runtime implementation in this task.

---

## Related Documents

- [ELEVATION_AUTHORITY.md](../ELEVATION_AUTHORITY.md)
- [EXTENSION_CAPABILITY_MAP.md](EXTENSION_CAPABILITY_MAP.md)
- [SURFACE_ELEVATION_LOCK.md](../locks/SURFACE_ELEVATION_LOCK.md)
- [EXTENSION_STATE.md](../EXTENSION_STATE.md)
- [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md) — Foundation must not add elevation context props (Rule 3; Extension-owned capabilities)
- [SURFACE_ELEVATION_INTENT.md](../../reports/SURFACE_ELEVATION_INTENT.md) — Phase L design intent
- [PHASE_L_CLOSURE_SUMMARY.md](../../reports/PHASE_L_CLOSURE_SUMMARY.md) — Phase L closure; SurfaceElevation § 2.3
- [INVERSE_TYPOGRAPHY_CANON.md](INVERSE_TYPOGRAPHY_CANON.md)
- [RESPONSIVE_VISIBILITY_CANON.md](RESPONSIVE_VISIBILITY_CANON.md)
