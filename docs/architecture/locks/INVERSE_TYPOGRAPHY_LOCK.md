# InverseTypography Extension Lock (CANON)

**Version:** 1.0  
**Date Created:** 2026-01-31  
**Last Updated:** 2026-01-31  
**Status:** LOCKED (CANON) — IMMUTABLE  
**Layer:** EXTENSION / COMPOSITION  
**Priority:** CRITICAL  
**Task ID (Phase L):** TUI_PHASE_L_INVERSE_TYPOGRAPHY_DESIGN_001  
**Canonicalization:** TUI_CANON_SURFACE_ELEVATION_AND_INVERSE_TYPOGRAPHY_001  
**Lock Date:** 2026-01-31

---

## Purpose

This document **formally locks** the InverseTypography Extension capability of `@tenerife.music/ui`. InverseTypography is the canonical declaration of "inverse text context" at composition level without manual color overrides or token bypass.

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

**Canon:** [INVERSE_TYPOGRAPHY_CANON.md](../extension/INVERSE_TYPOGRAPHY_CANON.md) — authoritative reference.

**Application:** Composition level only; dark or media background; not inside primitives or atoms. Do not use to add inverse context inside Layout or Foundation components.

---

## Locked Components

### InverseTypography

- **Location:** `src/COMPOSITION/inverse-typography/InverseTypography/`
- **Status:** LOCKED (CANON) — Inverse typography semantics
- **Lock Date:** 2026-01-31
- **Component Type:** Extension Layer — inverse typography (semantic context)
- **Purpose:** Declare "inverse text context" at composition level so blocks (Hero overlays, headers on dark, banners over media) use existing [TYPOGRAPHY_COLOR_POLICY_v1.md](../typography/TYPOGRAPHY_COLOR_POLICY_v1.md) (e.g. display + inverse on dark surface) without manual colors or Foundation bypass.
- **Exports:** `InverseTypography`, `InverseTypography.Root`, `InverseTypographyRootProps`
- **Rule:** Modifications only via Phase L / CANON audit; hotfixes require explicit LOCK exception per TUNG policy.
- **Phase L.3 (2026-02-01):** Implementation complete — sealed public exports, dev-only runtime nesting guard, tests (nesting dev/prod, context, SSR-safe), etalon usage via HeroCompositionReference.

---

## Locked Architecture

- Scope and semantics per INVERSE_TYPOGRAPHY_CANON.md
- Typography roles and combinations from TYPOGRAPHY_COLOR_POLICY_v1 only; no new color tokens or policy changes in this capability

---

## Forbidden Actions

- Using InverseTypography inside primitives or atoms; it is composition-level only and only where background is dark or media (see Canon).
- For inverse typography when InverseTypography can be used: manual color overrides, inverse logic outside InverseTypography, or bypassing Typography Color Policy — all forbidden; InverseTypography is the single canonical mechanism (see Canon).
- Adding prop-level inverse context (e.g. inverse, inverseTypography) to Layout or Foundation components.
- Introducing new color tokens or bypassing TYPOGRAPHY_COLOR_POLICY_v1.
- Applying inverse context in Foundation or Layout components or on light day-mode base/elevated surfaces.

---

## Related Documents

- [INVERSE_TYPOGRAPHY_CANON.md](../extension/INVERSE_TYPOGRAPHY_CANON.md)
- [TYPOGRAPHY_COLOR_POLICY_v1.md](../typography/TYPOGRAPHY_COLOR_POLICY_v1.md)
- [TEXT_LOCK.md](TEXT_LOCK.md)
- [A11Y_LOCK.md](A11Y_LOCK.md)
- [EXTENSION_STATE.md](../EXTENSION_STATE.md)
- [EXTENSION_CAPABILITY_MAP.md](../extension/EXTENSION_CAPABILITY_MAP.md)
- [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md) — Foundation must not add inverse context props
- [INVERSE_TYPOGRAPHY_INTENT.md](../../reports/INVERSE_TYPOGRAPHY_INTENT.md)
- [PHASE_L_CLOSURE_SUMMARY.md](../../reports/PHASE_L_CLOSURE_SUMMARY.md) — Phase L closure; InverseTypography § 2.2
