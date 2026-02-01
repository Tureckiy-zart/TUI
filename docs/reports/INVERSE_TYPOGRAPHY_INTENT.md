# InverseTypography Capability Intent — Phase L

**Task ID:** TUI_PHASE_L_INVERSE_TYPOGRAPHY_DESIGN_001  
**Date:** 2026-01-31  
**Status:** Design intent — Phase L.3 implementation complete  
**Phase:** L — Extension InverseTypography capability

---

## Scope & Classification

This document defines the **design intent** for InverseTypography as an extension-level capability. Implementation is complete per Phase L.3 (2026-02-01); see [PHASE_L_CLOSURE_SUMMARY.md](PHASE_L_CLOSURE_SUMMARY.md) § 2.2.

- **InverseTypography** — semantic typography mode, not a color token and not a style override
- **Purpose:** Define where and how to declare "inverse text context" so composition-level blocks (Hero, header on dark, overlays) use the existing Foundation text token `inverse` and role `display` without raw colors or token bypass
- **Does not introduce** new colors or tokens; relies on [TYPOGRAPHY_COLOR_POLICY_v1.md](../architecture/typography/TYPOGRAPHY_COLOR_POLICY_v1.md) (text token `inverse`, role `display` with allowed `primary` | `inverse`)
- **Authority:** Aligns with [TEXT_LOCK.md](../architecture/locks/TEXT_LOCK.md), [TYPOGRAPHY_COLOR_POLICY_v1.md](../architecture/typography/TYPOGRAPHY_COLOR_POLICY_v1.md), [A11Y_LOCK.md](../architecture/locks/A11Y_LOCK.md)

---

## Intent & Responsibility

InverseTypography provides a **composition-level** way to declare "inverse text context" — text on dark or media backgrounds — so that child content (Text, Heading with allowed roles) uses the existing `inverse` token by contract, without manual colors or Foundation bypass.

### Primary Responsibility

- Define the semantic mode "inverse context" at composition level (Hero overlays, headers on dark, banners over media)
- Ensure that within inverse context, typography remains contrast-safe and uses only allowed role × text-token combinations (e.g. display + inverse on dark surface)
- Do not introduce new tokens or modify Foundation Text/Heading or typography/color authorities

### Expected Behaviour (Conceptual)

Within an inverse context block, typography must be contrast-safe and rely only on permitted combinations from Typography Color Policy (e.g. display + inverse on dark surface). The capability does not define new colours; it declares the context in which existing `inverse` usage is valid.

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
- **Foundation components** — Text and Heading are unchanged; they already support `color="inverse"` within the policy. InverseTypography is the extension-level declaration of *where* that usage is correct

---

## Relationship to Other Capabilities

| Capability            | Relationship to InverseTypography                                                                 |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| **ResponsiveVisibility** | Orthogonal — breakpoint visibility; a block may be both inverse and responsive. See [RESPONSIVE_VISIBILITY_CANON.md](../architecture/extension/RESPONSIVE_VISIBILITY_CANON.md). |
| **OverlaySlot**       | Orthogonal — overlay positioning over anchor; does not define typography mode.                    |
| **HeroMedia**         | Orthogonal — media + overlay slot; InverseTypography describes typography mode of overlay content, not layout or positioning. |

InverseTypography is a separate capability: "text in this block is in inverse context," without new colours/tokens and without changing Foundation.

---

## Boundaries — NOT Responsible For

InverseTypography is **not** responsible for:

- **Introducing new tokens** or changing Typography or Color Authority
- **Changing Foundation** Text/Heading or contrast policies
- **Layout or positioning** — that remains OverlaySlot, HeroMedia, and layout primitives
- **Theme branching** — inverse context is semantic; theme (day/night) is handled by existing token definitions

---

## Reference Decision & Consistency (LOG)

### Decision

InverseTypography is introduced as a **Phase L capability**. Implementation complete per Phase L.3 (2026-02-01). See [PHASE_L_CLOSURE_SUMMARY.md](PHASE_L_CLOSURE_SUMMARY.md) § 2.2.

### Consistency Check

- No contradiction with [EXTENSION_STATE.md](../architecture/EXTENSION_STATE.md) — InverseTypography registered; Phase L.3 implementation complete
- No contradiction with [TEXT_LOCK.md](../architecture/locks/TEXT_LOCK.md) — capability uses existing Text/Heading and tokens; no modification of locked components
- No contradiction with [TYPOGRAPHY_COLOR_POLICY_v1.md](../architecture/typography/TYPOGRAPHY_COLOR_POLICY_v1.md) — uses existing `inverse` token and `display` role; no new combinations
- No contradiction with [A11Y_LOCK.md](../architecture/locks/A11Y_LOCK.md) — contrast and palette remain locked; capability does not bypass A11Y
- No contradiction with Phase L decision snapshot ([PHASE_L_DECISION_SNAPSHOT.md](closed-system/PHASE_L_DECISION_SNAPSHOT.md)) — additive design-only capability; no change to Carousel, HeroMedia, or OverlaySlot locks

### Implementation Complete

Implementation (CANON, LOCK, public API, Storybook) is **complete** per Phase L.3 (2026-02-01). Etalon usage via HeroCompositionReference.

---

## Follow-up (Complete)

- CANON + LOCK complete
- Reference Storybook example: HeroCompositionReference in InverseTypography.stories

---

## Status

Design intent documented.  
InverseTypography defined as extension-level semantic typography mode.  
Phase L.3 implementation complete; Phase L–compliant.

---

## Clarifications (Design Notes)

- InverseTypography declares a **semantic context**, not a styling mechanism.
  How the context is propagated (e.g. React context vs explicit composition)
  is an implementation concern and intentionally deferred.

- Nested inverse contexts are not intended.
  InverseTypography assumes a single inverse context per composition block;
  cancelling or overriding inverse context inside child blocks is out of scope.

- InverseTypography does not mandate a specific typography role.
  Allowed roles remain defined by [TYPOGRAPHY_COLOR_POLICY_v1](../architecture/typography/TYPOGRAPHY_COLOR_POLICY_v1.md); inverse context
  only constrains which color token is valid, not which role is used.

- Responsibility for ensuring that the background satisfies inverse contrast
  requirements lies with the composition owner (design and layout),
  not with InverseTypography itself.
