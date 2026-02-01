# SurfaceElevation Capability Intent — Phase L

**Task ID:** TUI_PHASE_L_SURFACE_ELEVATION_DESIGN_001  
**Date:** 2026-01-31  
**Status:** Design intent — Phase L.3 implementation complete  
**Phase:** L — Extension SurfaceElevation capability

---

## Scope & Classification

This document defines the **design intent** for SurfaceElevation as an extension-level capability. Implementation is complete per Phase L.3 (2026-02-01); see [PHASE_L_CLOSURE_SUMMARY.md](PHASE_L_CLOSURE_SUMMARY.md) § 2.3.

- **SurfaceElevation** — semantic surface context, not a styling or shadow mechanism
- **Purpose:** Define where and how to declare "elevated surface" so composition-level blocks (overlays, panels, cards, banners) use existing Foundation elevation tokens consistently without raw box-shadow, ad-hoc z-index, or token bypass
- **Does not introduce** new tokens (shadow, z-index, color); relies on [ELEVATION_AUTHORITY.md](../architecture/ELEVATION_AUTHORITY.md) and existing elevation/shadow tokens
- **Authority:** Aligns with [ELEVATION_AUTHORITY.md](../architecture/ELEVATION_AUTHORITY.md), [LAYOUT_LOCK.md](../architecture/locks/LAYOUT_LOCK.md) (Surface component), [EXTENSION_CAPABILITY_MAP.md](../architecture/extension/EXTENSION_CAPABILITY_MAP.md) ("Surface elevation / shadow semantics")

---

## Intent & Responsibility

SurfaceElevation provides a **composition-level** way to declare "elevated surface" — a surface relative to the base plane — so that blocks (overlays, panels, cards, banners) apply elevation semantics consistently using only existing Foundation tokens, without per-component elevation logic or raw styling.

### Primary Responsibility

- Define the semantic context "elevated surface" at composition level (overlay panels, drawers, cards as surface containers, modals/panels above content, banners)
- Ensure that within this context, elevation is expressed only via existing elevation and shadow tokens from Elevation Authority
- Do not introduce new tokens or modify Foundation or Elevation Authority

### Expected Behaviour (Conceptual)

A block declared as an elevated surface is treated visually and semantically as a surface above the base plane. Concrete shadow and z-index values come only from [ELEVATION_AUTHORITY.md](../architecture/ELEVATION_AUTHORITY.md). The capability does not define new elevation values; it declares the context in which existing token-based elevation is applied consistently.

---

## Where It Applies (In Scope)

SurfaceElevation applies only at **composition-level** surfaces that require elevation semantics:

- **Overlay panels** — drawers, side panels; Surface wrapper for elevation and radius; z-index per Elevation Authority
- **Cards** (as surface containers) — Card/CardBase with default/elevated variants; semantic "surface with elevation"
- **Modals and panels above content** — surfaces that sit above base content; already tied to z-index layers (modal, overlay)
- **Banners / strips** — surfaces above content with distinct elevation relative to base plane
- **Other blocks** where a "Surface wrapper" or elevation variants are used or planned (see [PATTERNS_OVERLAY.md](../architecture/PATTERNS_OVERLAY.md), [ADR_overlay_panel_not_card.md](../architecture/decisions/ADR_overlay_panel_not_card.md))

---

## Where It Must NOT Apply (Out of Scope)

- **Typography roles** — elevation is orthogonal to text/heading semantics
- **Layout primitives** without surface semantics — Stack, Box (without surface role); they do not define elevation context
- **Navigation atoms** — navigation items are not elevated surfaces by default
- **Foundation components** — Elevation Authority and token usage remain unchanged; SurfaceElevation is the extension-level declaration of *where* elevated surface semantics apply

---

## Relationship to Other Capabilities

<!-- markdownlint-disable MD060 -->
| Capability            | Relationship to SurfaceElevation                                                                 |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| **OverlaySlot**       | Orthogonal — overlay positioning over anchor; SurfaceElevation does not define position, only surface semantics.                   |
| **InverseTypography** | Orthogonal — typography mode on dark/media; not about elevation.                                   |
| **ResponsiveVisibility** | Orthogonal — breakpoint visibility; a block may be both elevated and responsive. See [RESPONSIVE_VISIBILITY_CANON.md](../architecture/extension/RESPONSIVE_VISIBILITY_CANON.md). |
| **HeroMedia**         | Orthogonal — media + overlay slot; elevation may apply to overlay content as a surface.            |
<!-- markdownlint-enable MD060 -->

SurfaceElevation is a separate capability: "this block is an elevated surface," using only existing tokens and without changing Foundation.

---

## Boundaries — NOT Responsible For

SurfaceElevation is **not** responsible for:

- **Introducing new tokens** or changing Elevation Authority (shadow scale, z-index scale)
- **Changing Foundation** or locked elevation rules
- **Layout or positioning** — that remains OverlaySlot and layout primitives
- **Typography** — InverseTypography and Typography Authority handle text context

---

## Reference Decision & Consistency (LOG)

### Decision

SurfaceElevation is introduced as a **Phase L capability**. Implementation complete per Phase L.3 (2026-02-01). See [PHASE_L_CLOSURE_SUMMARY.md](PHASE_L_CLOSURE_SUMMARY.md) § 2.3.

### Consistency Check

- No contradiction with [EXTENSION_STATE.md](../architecture/EXTENSION_STATE.md) — SurfaceElevation registered; Phase L.3 implementation complete. Existing Surface (component) remains the elevation-variant extension of Box; capability describes semantic context, not the component itself.
- No contradiction with [FOUNDATION_LOCK.md](../architecture/FOUNDATION_LOCK.md) — Elevation Authority remains locked; capability does not modify Foundation.
- No contradiction with [ELEVATION_AUTHORITY.md](../architecture/ELEVATION_AUTHORITY.md) — no new shadows or z-index; only existing tokens are used at composition level.
- No contradiction with Phase L decision snapshot ([PHASE_L_DECISION_SNAPSHOT.md](closed-system/PHASE_L_DECISION_SNAPSHOT.md)) — additive design-only capability; no change to Carousel, HeroMedia, or OverlaySlot locks.

### Implementation Complete

Implementation (CANON, LOCK, public API, Storybook) is **complete** per Phase L.3 (2026-02-01). Etalon usage via SurfaceElevationCompositionReference.

---

## Follow-up (Complete)

- CANON + LOCK complete
- Reference Storybook example: SurfaceElevationCompositionReference in SurfaceElevation.stories

---

## Status

Design intent documented.  
SurfaceElevation defined as extension-level semantic surface context.  
Clarifications added (Card usage, no automatic elevation, responsibility unconstrained until CANON, no finite scale at design stage).  
Phase L.3 implementation complete; Phase L–compliant.

---

## Clarifications (Design Notes)

- SurfaceElevation declares a **semantic surface context**, not a styling escape hatch.
  How the context is realised (e.g. wrapper, context, or composition) is an implementation concern and intentionally deferred.

- SurfaceElevation does not prescribe a specific implementation.
  The existing Surface component (elevation-variant extension of Box) may be one way to realise "elevated surface" after CANON; this document does not mandate it.

- Nested or overridden surface elevation context inside child blocks is not defined in this document and is out of scope.

- Responsibility for choosing the correct elevation token (e.g. which shadow, which z-index layer) for a given surface type remains with the composition owner and future CANON; SurfaceElevation only states that such choices must use Elevation Authority tokens exclusively.

### Explicit Clarifications (Card Usage & Responsibility)

- **Not all Card components are elevated surfaces.** Only compositions that explicitly declare SurfaceElevation are considered elevated. A Card used without SurfaceElevation context is not an elevated surface by default.

- **SurfaceElevation does not imply automatic elevation for any component type.** No component (Card, Panel, Banner, etc.) gains elevation solely by type; elevation applies only where SurfaceElevation is explicitly declared at composition level.

- **Responsibility for choosing elevation level is intentionally unconstrained at design stage.** It is expected to be formalized during CANON, not earlier. This document does not assign or constrain who picks which elevation token for which surface.

- **SurfaceElevation does not define a finite elevation scale at design stage.** The elevation scale and token set remain defined by [ELEVATION_AUTHORITY.md](../architecture/ELEVATION_AUTHORITY.md); this capability only declares the semantic context in which those tokens are used.
