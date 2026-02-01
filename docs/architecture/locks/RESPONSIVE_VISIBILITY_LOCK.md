# ResponsiveVisibility Extension Lock (CANON)

**Version:** 1.0  
**Date Created:** 2026-01-31  
**Last Updated:** 2026-01-31  
**Status:** LOCKED (CANON) — IMMUTABLE  
**Layer:** EXTENSION / COMPOSITION  
**Priority:** CRITICAL  
**Task ID (Phase L):** TUI_PHASE_L_RESPONSIVE_VISIBILITY_001  
**Canonicalization:** TUI_CANON_RESPONSIVE_VISIBILITY_001  
**Lock Date:** 2026-01-31

---

## Purpose

This document **formally locks** the ResponsiveVisibility Extension capability of `@tenerife.music/ui`. ResponsiveVisibility is the canonical entry point for show/hide by breakpoint without `className`, without raw Tailwind, and without consumer media queries.

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

**Canon:** [RESPONSIVE_VISIBILITY_CANON.md](../extension/RESPONSIVE_VISIBILITY_CANON.md) — authoritative reference.

**Application:** Composition level only; not inside primitives or atoms. Do not use to add breakpoint visibility inside Layout or Foundation components.

---

## Locked Components

### ResponsiveVisibility

- **Location:** `src/COMPOSITION/responsive/ResponsiveVisibility/`
- **Status:** LOCKED (CANON) — Responsive visibility
- **Lock Date:** 2026-01-31
- **Component Type:** Extension Layer — responsive visibility (compound slots)
- **Purpose:** Show/hide by breakpoint via compound API Root/From/Below/Only. Non-matching slots do not render. SSR: nothing until mount; after hydration render matching slot only.
- **Exports:** `ResponsiveVisibility`, `ResponsiveVisibility.Root`, `ResponsiveVisibility.From`, `ResponsiveVisibility.Below`, `ResponsiveVisibility.Only`, `ResponsiveVisibilityRootProps`, `ResponsiveVisibilityFromProps`, `ResponsiveVisibilityBelowProps`, `ResponsiveVisibilityOnlyProps`, `Breakpoint`
- **Rule:** Modifications only via Phase L / CANON audit; hotfixes require explicit LOCK exception per TUNG policy

---

## Locked Architecture

- Structure and semantics per RESPONSIVE_VISIBILITY_CANON.md
- Breakpoint type from `@/types/responsive`; no new breakpoint tokens or scale changes
- Internal viewport detection via matchMedia; no re-export of detection hook

---

## Forbidden Actions

- Using ResponsiveVisibility inside primitives or atoms; it is composition-level only (see Canon).
- For breakpoint-based visibility when ResponsiveVisibility can be used: Tailwind visibility utilities (e.g. `hidden`, `md:block`, `lg:hidden`), CSS media queries in consumer code, JS breakpoint hooks (e.g. `useMediaQuery`, `window.innerWidth`), or duplicate visibility logic — all forbidden; ResponsiveVisibility is the single canonical mechanism (see Canon).
- Adding `className` or `style` to the public props surface of Root, From, Below, or Only
- Adding prop-level visibility (e.g. visibleFrom, hideBelow) to Layout or Foundation components
- Changing slot semantics (From/Below/Only) without Phase L / CANON audit
- Introducing new breakpoint tokens or changing breakpoint scale in this capability
- Using `bp="base"` for From, Below, or Only (CANON: slot bp must be sm | md | lg | xl | 2xl)

---

## Unlock Procedure

1. Create Phase L unlock request
2. Get architectural approval
3. Complete Phase L audit
4. Re-lock with updated documentation

---

## Related Documents

- [RESPONSIVE_VISIBILITY_CANON.md](../extension/RESPONSIVE_VISIBILITY_CANON.md)
- [RESPONSIVE_VISIBILITY_EXTENSION_API.md](../extension/RESPONSIVE_VISIBILITY_EXTENSION_API.md) — Extension API specification (implementation-ready)
- [EXTENSION_STATE.md](../EXTENSION_STATE.md)
- [EXTENSION_CAPABILITY_MAP.md](../extension/EXTENSION_CAPABILITY_MAP.md)
- [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md) — Foundation must not add breakpoint visibility props (Rule 3; Extension-owned capabilities)
- [PHASE_L_RESPONSIVE_VISIBILITY_SUMMARY.md](../../reports/PHASE_L_RESPONSIVE_VISIBILITY_SUMMARY.md) — Phase L locked decisions
- [HEADER_COMPOSITION_INTENT.md](../../reports/HEADER_COMPOSITION_INTENT.md) — Reference composition
