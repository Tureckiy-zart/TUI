# Extension Layer — Capability Map

**Package:** `@tenerife.music/ui`  
**Layer:** Extension / Architecture  
**Phase:** L (closed)  
**Status:** Phase L complete — CANONICAL  
**Date Created:** 2026-01-29  
**Task ID:** TUI_CSV2_PHASE_L1_EXTENSION_CAPABILITY_DESIGN_031

---

## Purpose & Scope

This document defines and locks the list of **allowed product-capabilities** that may be implemented **exclusively through the Extension Layer** without changes to Foundation, Tokens, COMPOSITION, or the Closed System v2 canon. It forms the architectural base for Phase L.2 (Extension API Design).

**Scope:**

- Exhaustive list of Extension-capabilities derived from real usage audits and task capability classes
- Clear separation of product needs from canonical constraints
- Explicit statement of what MAY and what MUST NOT be implemented in the Extension Layer
- Design-only: no code, no Foundation/Token/COMPOSITION changes

**Out of Scope:**

- Implementation (runtime, types, components)
- New tokens or token mutations
- Changes to Foundation, PRIMITIVES, or COMPOSITION
- ESLint or enforcement changes
- Product-specific theming or breaking changes to existing pages

**Design Constraint:** Capability inventory, classification, and traceability to audits. Phase L capabilities (ResponsiveVisibility, InverseTypography, SurfaceElevation, HeroMedia, OverlaySlot) are **implemented and CANONICAL** per [PHASE_L_CLOSURE_SUMMARY.md](../../reports/PHASE_L_CLOSURE_SUMMARY.md).

**Relationship to Phase L:** Phase L is closed. ResponsiveVisibility, InverseTypography, and SurfaceElevation are implemented with CANON + LOCK complete. Non-goals and prohibitions remain in force.

---

## Capability Inventory

Capabilities are grouped by class. Each capability is realisable only within the Extension Layer using existing Foundation components and tokens.

### Layout

| Capability                                   | Description                                                                                                                                                       |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hero background / media support**         | Extension components that provide hero sections with background media (image/video) using Box/Stack and existing layout tokens; no Foundation changes.             |
| **Hero carousel capability**                 | Extension-level carousel or slide composition for hero content; composes Foundation layout and primitives; behaviour and visibility implemented in Extension only.  |
| **Overlay positioning (badge/icon over content)** | Positioning of badges, icons, or labels over content via Extension composition (e.g. Box with position tokens); overlay semantics and layout stay in Extension; Foundation Surface/Box used as building blocks. |
| **Responsive visibility (show/hide)**         | Show/hide behaviour by breakpoint implemented in Extension at composition level only (e.g. Header/AppShell); not inside primitives or atoms. Single canonical surface; no Tailwind visibility, media queries, or JS breakpoint hooks in consumer code. See [RESPONSIVE_VISIBILITY_CANON.md](RESPONSIVE_VISIBILITY_CANON.md). |

### Visual

| Capability                           | Description                                                                                                                                           |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Surface elevation / shadow semantics** | Use of existing elevation and shadow tokens in Extension components to express surface hierarchy; no new tokens; semantics defined at Extension level. |
| **Gradient overlays via tokens**     | Gradient overlays applied in Extension using existing gradient tokens; no new token domains; composition and layering in Extension only.               |

### Typography

| Capability                       | Description                                                                                                                                                                      |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Inverse heading semantics**   | Extension-level semantics for headings on dark or coloured backgrounds (e.g. wrapper or composition that applies existing typography/colour tokens); no Foundation Heading API change. |
| **Muted / emphasis link helpers** | Extension components or compositions that provide muted or emphasis link styling using existing TEXT_TOKENS and Link; no new typography tokens.                                |

### Interaction

| Capability                                       | Description                                                                                                                                                     |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Scroll-aware navigation behaviour (extension-only)** | Navigation behaviour that reacts to scroll (e.g. sticky header, visibility toggles) implemented entirely in Extension; uses Foundation layout and primitives; no Foundation API changes. |

### Implementation Traceability (Phase L)

| Capability                       | Realised by   | Canon / Reference                                      |
| -------------------------------- | ------------- | ------------------------------------------------------ |
| Hero background / media support  | **HeroMedia** | [HEROMEDIA_CANON.md](HEROMEDIA_CANON.md)               |
| Hero carousel capability         | **HeroMedia** (composes Carousel) | [HEROMEDIA_CANON.md](HEROMEDIA_CANON.md)        |
| Overlay positioning (badge/icon over content) | **OverlaySlot** | [OVERLAYSLOT_CANON.md](OVERLAYSLOT_CANON.md) |
| Responsive visibility (show/hide)            | **ResponsiveVisibility** | [RESPONSIVE_VISIBILITY_CANON.md](RESPONSIVE_VISIBILITY_CANON.md) |
| Surface elevation / shadow semantics         | **SurfaceElevation** (capability) | [SURFACE_ELEVATION_CANON.md](SURFACE_ELEVATION_CANON.md) |
| Inverse heading semantics                    | **InverseTypography** (capability) | [INVERSE_TYPOGRAPHY_CANON.md](INVERSE_TYPOGRAPHY_CANON.md) |

---

## Capability Classification (MUST / SHOULD / OPTIONAL)

| Capability                                       | Classification | Rationale                                                                                                                                 |
| ------------------------------------------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Hero background / media support                 | **MUST**       | Directly addresses HeroSection layout/media needs from TOKEN_REALITY_AUDIT_027 and layout pain; core product need.                         |
| Hero carousel capability                         | **SHOULD**     | Common hero pattern; product value high but can be deferred; Extension-only.                                                             |
| Overlay positioning (badge/icon over content)    | **MUST**       | Aligns with overlay patterns (e.g. H5-002) and product need for badges/icons over content; no Foundation change.                         |
| Responsive visibility (show/hide)                | **SHOULD**     | Recurring product need; can be covered by composition and existing tokens; Extension-only.                                                |
| Surface elevation / shadow semantics             | **SHOULD**     | Supports visual hierarchy using existing tokens; addresses elevation/surface semantics in DOMAIN/PATTERNS.                                 |
| Gradient overlays via tokens                     | **OPTIONAL**   | Nice-to-have; existing gradient tokens sufficient; Extension composition only.                                                          |
| Inverse heading semantics                        | **SHOULD**     | Typography-in-DOMAIN pain (TOKEN_REALITY_AUDIT_027); inverse headings on dark backgrounds; Extension-only.                                |
| Muted / emphasis link helpers                    | **OPTIONAL**   | DX convenience; existing TEXT_TOKENS and Link suffice; Extension wrappers or docs.                                                       |
| Scroll-aware navigation behaviour (extension-only) | **OPTIONAL**   | Product-specific interaction; fully implementable in Extension; no Foundation overlap.                                                    |

---

## Non-Goals

The following are explicitly **out of scope** for Extension Layer capability design and implementation:

- **Recreating Tailwind utilities** — No generic utility-class layers or Tailwind-style helpers in Extension; use Foundation layout and token props only.
- **Generic layout primitives** — No new layout primitives; Extension composes existing Foundation layout (Stack, Box, Grid, Row, etc.).
- **Product-specific theming** — Theming stays in theme layer and tokens; Extension does not introduce product-only theme overrides that bypass the token system.
- **Breaking changes to existing pages** — Capabilities must be additive; no breaking changes to existing product pages or contracts.

---

## Constraints & Prohibitions

Extension Layer capabilities **MUST** respect the following. No exception in Phase L.1.

| Constraint                         | Rule                                                                                                                                 |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **Foundation API immutable**       | No changes to Foundation or PRIMITIVES APIs. Extension only composes existing public APIs.                                          |
| **No new tokens in L.1**           | No new token domains, scales, or values. Use only existing tokens.                                                                 |
| **No className/style escape**      | Do not pass `className` or `style` to Foundation components; Foundation Enforcement remains LOCKED/APPLIED.                        |
| **No deep imports**                | Extension must not depend on Foundation internals or deep paths; public API and `@/index` only where allowed.                        |
| **No DOM-boundary violations**      | Respect DOM-boundary component list and invariants; no patterns that violate canonical DOM structure.                               |
| **Extension cannot weaken enforcement** | Extension must not introduce mechanisms that bypass or relax Closed System v2 enforcement (e.g. no new escape hatches for className/style on Foundation). |

**Authority references:**

- [EXTENSION_AUTHORITY.md](../EXTENSION_AUTHORITY.md) — Extension boundary contract, allowed/forbidden actions.
- [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](../closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md) — Consumer and library enforcement rules; Extension must not contradict them.

---

## Mapping to Audit Findings

**Note:** Phase K audit reports (phase-k-canon-compliance-audit-report.md, phase-k-gaps-report.md, phase-k-usage-pain-report.md) are not present in the repository. Traceability is established against the following available audits. When Phase K reports exist, this table may be extended.

| Capability                                       | Source                                                                                                                                 | Reference |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Hero background / media support                  | TOKEN_REALITY_AUDIT_027 — High-Risk: HeroSection layout (w-full, max-w-full); recommendation to use Box/Stack with token props       | [TOKEN_REALITY_AUDIT_027.md](../../reports/tokens/TOKEN_REALITY_AUDIT_027.md) |
| Hero carousel capability                         | Task capability_classes (layout); product need for hero carousel                                                                       | Derived from task capability_sources / capability_classes |
| Overlay positioning (badge/icon over content)    | CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP — H5-002 overlay positioning (Surface/visual boundary); Extension implements overlay on Foundation | [CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md](../closed-system/CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md) |
| Responsive visibility (show/hide)                | Task capability_classes (layout); layout and overlay visibility gaps                                                                  | Derived from task capability_sources / capability_classes |
| Surface elevation / shadow semantics             | TOKEN_REALITY_AUDIT_027 — usage gaps in DOMAIN/PATTERNS; existing shadow/elevation tokens                                            | [TOKEN_REALITY_AUDIT_027.md](../../reports/tokens/TOKEN_REALITY_AUDIT_027.md) |
| Gradient overlays via tokens                     | Task capability_classes (visual); existing GRADIENT_TOKENS (LOCKED) used in Extension only                                            | Derived from task capability_classes (visual) |
| Inverse heading semantics                        | TOKEN_REALITY_AUDIT_027 — Typography in DOMAIN (medium risk); inverse heading need on dark backgrounds                               | [TOKEN_REALITY_AUDIT_027.md](../../reports/tokens/TOKEN_REALITY_AUDIT_027.md) |
| Muted / emphasis link helpers                    | Task capability_classes (typography); DX and typography emphasis needs                                                                | Derived from task capability_classes (typography) |
| Scroll-aware navigation behaviour (extension-only) | Task capability_classes (interaction); extension-only scroll behaviour                                                                | Derived from task capability_classes (interaction) |

---

## Readiness Criteria for Phase L.2

Phase L.1 is complete and ready for Phase L.2 (Extension API Design) when all of the following hold:

- [x] **All capabilities have a documented source** — Each capability is traced to an audit (TOKEN_REALITY_AUDIT_027, CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP) or explicitly derived from task capability_sources / capability_classes.
- [x] **Classification is assigned** — Every capability has MUST, SHOULD, or OPTIONAL.
- [x] **Non-goals are explicit** — Recreating Tailwind utilities, generic layout primitives, product-specific theming, and breaking changes to existing pages are listed as non-goals.
- [x] **Constraints and prohibitions are documented** — Foundation immutable, no new tokens in L.1, no className/style escape, no deep imports, no DOM-boundary violations, Extension does not weaken enforcement.
- [x] **Extension boundary respected** — All capabilities are realisable in the Extension Layer under [EXTENSION_AUTHORITY.md](../EXTENSION_AUTHORITY.md) and enforcement guards.
- [x] **Single deliverable created** — EXTENSION_CAPABILITY_MAP.md exists under docs/architecture/extension/ and contains all required sections.

**Readiness status:** **READY FOR PHASE L.2 (EXTENSION API DESIGN)**

**Authorized next phase:** Phase L.2 — Extension API Design.

---

## Related Documents

- [EXTENSION_AUTHORITY.md](../EXTENSION_AUTHORITY.md) — Extension boundary contract
- [HEROMEDIA_CANON.md](HEROMEDIA_CANON.md) — HeroMedia canonical capability definition (Hero background/media, Hero carousel)
- [OVERLAYSLOT_CANON.md](OVERLAYSLOT_CANON.md) — OverlaySlot canonical capability definition (Overlay positioning)
- [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](../closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md) — Enforcement guards
- [CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md](../closed-system/CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md) — Layout capability map (Foundation/COMPOSITION)
- [TOKEN_REALITY_AUDIT_027.md](../../reports/tokens/TOKEN_REALITY_AUDIT_027.md) — Token usage and gap analysis
- [DOCUMENTATION_CANON_LOCK.md](../DOCUMENTATION_CANON_LOCK.md) — Documentation structure (extension/ canonical placement)
- [PHASE_L_CLOSURE_SUMMARY.md](../../reports/PHASE_L_CLOSURE_SUMMARY.md) — Phase L closure; ResponsiveVisibility, InverseTypography, SurfaceElevation implemented

---

**Last Updated:** 2026-02-01  
**Task ID:** TUI_CSV2_PHASE_L1_EXTENSION_CAPABILITY_DESIGN_031  
**Status:** Phase L complete — CANONICAL (ResponsiveVisibility, InverseTypography, SurfaceElevation implemented)
