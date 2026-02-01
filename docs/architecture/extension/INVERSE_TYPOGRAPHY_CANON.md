# InverseTypography — Canonical Capability Definition

**Package:** `@tenerife.music/ui`  
**Layer:** Extension / Architecture  
**Phase:** L — Extension API Canon  
**Status:** CANONICAL / LOCKED  
**Date Created:** 2026-01-31  
**Last Updated:** 2026-01-31  
**Task ID (Phase L):** TUI_PHASE_L_INVERSE_TYPOGRAPHY_DESIGN_001  
**Task ID (Canon):** TUI_CANON_SURFACE_ELEVATION_AND_INVERSE_TYPOGRAPHY_001

---

## Document Classification

**TYPE:** Canonical Capability Definition — **Authoritative reference** for implementation and consumers.  
**MUTABILITY:** Design-locked; changes only via explicit canon update  
**AUTHORITY DOMAIN:** Extension (Inverse typography semantics)

**Purpose:** This document defines InverseTypography as the **single canonical** Extension capability for declaring "inverse text context" at composition level. It fixes scope, canonical rules, and forbidden usage. Implementation MUST follow this canon without reinterpretation. No new colors or tokens are introduced; all combinations are governed by [TYPOGRAPHY_COLOR_POLICY_v1.md](../typography/TYPOGRAPHY_COLOR_POLICY_v1.md).

---

## Purpose & Scope

**Purpose:** Provide a canonical Extension capability for declaring inverse text context at composition level. Compositions MUST NOT apply manual color overrides or token bypass for inverse typography; InverseTypography is the **single canonical declaration** of where inverse text context applies.

**Application level:** InverseTypography applies **only at composition level** in blocks where the background is guaranteed to be dark or media (Hero overlays, headers on dark, banners over media). It MUST NOT be used inside primitives or atoms, or to add inverse context inside Layout or Foundation components.

**Scope:**

- Semantic context "inverse text context" at composition level only
- Typography within inverse context uses only allowed role × text-token combinations from [TYPOGRAPHY_COLOR_POLICY_v1.md](../typography/TYPOGRAPHY_COLOR_POLICY_v1.md) (e.g. display + inverse on dark surface)
- No new colors or tokens; Typography Color Policy remains the source of truth

**Out of Scope:**

- New typography or color tokens
- Foundation Text/Heading or typography/color authority modifications
- Prop-level inverse context on Layout or Foundation components
- Layout, positioning, or theme branching (orthogonal concerns)

---

## Where It Applies (In Scope)

InverseTypography applies only at **composition-level** blocks where the background is guaranteed to be dark or media:

- **Hero overlays** — e.g. content inside HeroMedia.Overlay (text over image/video/carousel)
- **Headers on dark background** — app or section headers on a dark band
- **Banners over media** — full-bleed banners with text over media or dark background
- **Other blocks** with text over dark or media surfaces, where the surface satisfies the `inverse` restriction in TYPOGRAPHY_COLOR_POLICY_v1 (inverse must NOT be used on light day-mode base/elevated surfaces)

---

## Where It Must NOT Apply (Out of Scope)

- **Regular body text** — default reading context; no inverse mode
- **Layout primitives** — Stack, Box, Inset, etc.; they do not define typography mode
- **Navigation atoms** without dark background — inverse is not the default for nav items
- **Foundation components** — Text and Heading are unchanged; they already support `color="inverse"` within the policy. InverseTypography is the extension-level declaration of *where* that usage is correct.

---

## Canonical Rules

- **InverseTypography is semantic context only.** It declares "text in this block is in inverse context," not a color override or styling mechanism. How the context is propagated (e.g. React context vs explicit composition) is an implementation concern.
- **No nested inverse contexts.** InverseTypography assumes a single inverse context per composition block; cancelling or overriding inverse context inside child blocks is out of scope.
- **Typography roles remain governed by TYPOGRAPHY_COLOR_POLICY_v1.** Inverse context only constrains which color token is valid, not which role is used. Allowed roles and combinations remain defined by the policy.
- **Responsibility for background suitability** lies with the composition owner (design and layout), not with InverseTypography itself. The capability does not validate that the background satisfies inverse contrast requirements; the composition owner must ensure the surface is dark or media where InverseTypography is applied.

---

## Forbidden Usage & Boundaries

- **FORBIDDEN:** Using manual color overrides or token bypass for "inverse" typography in consumer or Extension code when InverseTypography can be used. InverseTypography is the **single canonical mechanism** for declaring inverse text context.
- **FORBIDDEN:** Adding prop-level inverse context (e.g. `inverse`, `inverseTypography`) to Layout or Foundation components. Inverse context belongs only to InverseTypography at composition level.
- **FORBIDDEN:** Introducing new color tokens or bypassing [TYPOGRAPHY_COLOR_POLICY_v1.md](../typography/TYPOGRAPHY_COLOR_POLICY_v1.md). All combinations MUST comply with the policy.
- **Boundary:** This capability is Extension-only. Foundation is not modified.

---

## Enforcement

- **Forbidden patterns:** Listed in Forbidden Usage & Boundaries above. Compliance is mandatory for new code and modifications after Phase L lock; existing code is not retroactively invalidated (per EXTENSION_STATE Usage Policy).
- **Current stage:** At canonicalization, enforcement is **documentation-level**. Rules are binding; lint or runtime checks may be introduced in a separate task. Decision: docs-first; no mandatory lint/runtime implementation in this task.

---

## Related Documents

- [TYPOGRAPHY_COLOR_POLICY_v1.md](../typography/TYPOGRAPHY_COLOR_POLICY_v1.md)
- [TEXT_LOCK.md](../locks/TEXT_LOCK.md)
- [A11Y_LOCK.md](../locks/A11Y_LOCK.md)
- [EXTENSION_CAPABILITY_MAP.md](EXTENSION_CAPABILITY_MAP.md)
- [INVERSE_TYPOGRAPHY_LOCK.md](../locks/INVERSE_TYPOGRAPHY_LOCK.md)
- [EXTENSION_STATE.md](../EXTENSION_STATE.md)
- [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md) — Foundation must not add inverse context props (Rule 3; Extension-owned capabilities)
- [INVERSE_TYPOGRAPHY_INTENT.md](../../reports/INVERSE_TYPOGRAPHY_INTENT.md) — Phase L design intent
- [PHASE_L_CLOSURE_SUMMARY.md](../../reports/PHASE_L_CLOSURE_SUMMARY.md) — Phase L closure; InverseTypography § 2.2
- [SURFACE_ELEVATION_CANON.md](SURFACE_ELEVATION_CANON.md)
- [RESPONSIVE_VISIBILITY_CANON.md](RESPONSIVE_VISIBILITY_CANON.md)
