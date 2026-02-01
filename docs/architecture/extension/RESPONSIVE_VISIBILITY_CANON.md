# ResponsiveVisibility — Canonical Capability Definition

**Package:** `@tenerife.music/ui`  
**Layer:** Extension / Architecture  
**Phase:** L — Extension API Canon  
**Status:** CANONICAL / LOCKED  
**Date Created:** 2026-01-31  
**Last Updated:** 2026-01-31  
**Task ID (Phase L):** TUI_PHASE_L_RESPONSIVE_VISIBILITY_001  
**Task ID (Canon):** TUI_CANON_RESPONSIVE_VISIBILITY_001

---

## Document Classification

**TYPE:** Canonical Capability Definition — **Authoritative reference** for implementation and consumers.  
**MUTABILITY:** Design-locked; changes only via explicit canon update  
**AUTHORITY DOMAIN:** Extension (Responsive visibility — show/hide by breakpoint)

**Purpose:** This document defines ResponsiveVisibility as the **single canonical** Extension capability for show/hide by breakpoint without `className`, without raw Tailwind, and without consumer media queries. It fixes API surface, slot semantics, SSR behaviour, and forbidden usage. Implementation MUST follow this canon without reinterpretation.

---

## Purpose & Scope

**Purpose:** Provide a canonical Extension capability for show/hide by breakpoints. Consumers MUST NOT implement raw breakpoint visibility via `className`, Tailwind utility classes, or custom media queries; ResponsiveVisibility is the **single canonical surface**.

**Application level:** ResponsiveVisibility applies **only at composition level** (e.g. Header/AppShell, root-level layout branching). It MUST NOT be used inside primitives or atoms, or to add breakpoint visibility inside Layout or Foundation components.

**Scope:**

- Compound component with slots: Root, From, Below, Only
- Non-matching slots do NOT render (no `display:none`; slot is omitted from DOM when it does not match)
- SSR: render nothing by default; after hydration render the matching slot only
- Compliance with [EXTENSION_AUTHORITY.md](../EXTENSION_AUTHORITY.md), [EXTENSION_CAPABILITY_MAP.md](EXTENSION_CAPABILITY_MAP.md) (Responsive visibility), existing breakpoint type and values

**Out of Scope:**

- New theme tokens or breakpoint scale changes
- Foundation or Layout component modifications
- Prop-level visibility on Layout or Foundation components
- Complex SSR fallback system (v1: server renders nothing; client selects slot after mount)

---

## Breakpoint Source & Detection (Mini-Audit)

- **Breakpoint type:** `Breakpoint` from `@/types/responsive` — `"base" | "sm" | "md" | "lg" | "xl" | "2xl"`. Exported from `@/index`.
- **Breakpoint values (min-width):** From `@/FOUNDATION/lib/responsive-props` — `breakpoints = { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px" }`. Used internally only; not re-exported from ResponsiveVisibility.
- **Detection:** Internal hook within the capability (e.g. `useViewportMatch`) using `window.matchMedia` with media queries derived from `breakpoints`. Subscription with cleanup on unmount; no re-export of the hook. No existing project hook for viewport breakpoints; this capability owns minimal internal detection.

---

## Slot Semantics

- **From(bp):** Visible when viewport width **≥** the breakpoint (min-width). `base` is not a valid min-width breakpoint for From (use Below(sm) for “mobile only”).
- **Below(bp):** Visible when viewport width **<** the breakpoint (max-width exclusive). E.g. `Below(bp="md")` = viewport < 768px.
- **Only(bp):** Visible when viewport is in the range **[bp, nextBp)** — i.e. min-width bp and max-width (nextBp - 1px). Breakpoint order: `sm` → `md` → `lg` → `xl` → `2xl`. For the last breakpoint **Only("2xl")** there is no next breakpoint; by definition **Only("2xl") = From("2xl")** (visible from 2xl and up).

Non-matching slots MUST NOT render (return `null`); they MUST NOT be hidden via CSS (`display: none`).

**Slot resolution (canonical):** Root evaluates children in order; **the first slot (From, Below, or Only) that matches the current viewport breakpoint is rendered; all others are skipped.** No deterministic tie-breaking beyond children order. First matching slot in children order wins.

---

## Canonical Rules

- **Single responsibility:** ResponsiveVisibility handles **visibility by breakpoint only**. It does not provide layout or styling; composition uses Layout primitives (Box, Stack, etc.) for structure.
- **Slot resolution:** First matching slot in children order wins (see Slot Semantics above).
- **Nesting:** Nested ResponsiveVisibility (e.g. Root inside From/Below/Only) is not a supported pattern. The canonical pattern is **one Root at composition level** wrapping the mobile/desktop variants. Nesting may be explicitly allowed in a future canon update if required.

---

## SSR Behaviour

- **Server / pre-hydration:** Root MUST render nothing (e.g. `null` or empty fragment). No guessing of viewport on the server.
- **After mount (client):** Once mounted, use `matchMedia` to determine current breakpoint and render only the content of the matching slot (one of From / Below / Only). No flash of wrong content; first paint after hydration shows the correct slot.

---

## Public API (Root / From / Below / Only)

### ResponsiveVisibility (Root)

- **Contract:** Wrapper that gathers From/Below/Only slot children and renders at most one matching slot. No props required on Root beyond `children`.
- **Rules:** Root MUST NOT accept `className` or `style` in public API. Root does not forward DOM props for layout styling; it is a logical wrapper.

### ResponsiveVisibility.From

- **Contract:** `bp`: Breakpoint (required); `children`: ReactNode. Renders `children` when viewport ≥ `bp`.
- **Rules:** No `className` or `style`. `bp` MUST be one of `sm` | `md` | `lg` | `xl` | `2xl` (not `base` for From).

### ResponsiveVisibility.Below

- **Contract:** `bp`: Breakpoint (required); `children`: ReactNode. Renders `children` when viewport < `bp`.
- **Rules:** No `className` or `style`. `bp` MUST be one of `sm` | `md` | `lg` | `xl` | `2xl`.

### ResponsiveVisibility.Only

- **Contract:** `bp`: Breakpoint (required); `children`: ReactNode. Renders `children` when viewport is in [bp, nextBp); for `2xl`, same as From(2xl).
- **Rules:** No `className` or `style`. `bp` MUST be one of `sm` | `md` | `lg` | `xl` | `2xl`.

---

## Exports (Final List)

- **Components:** `ResponsiveVisibility`, `ResponsiveVisibility.Root`, `ResponsiveVisibility.From`, `ResponsiveVisibility.Below`, `ResponsiveVisibility.Only`
- **Types:** `ResponsiveVisibilityRootProps`, `ResponsiveVisibilityFromProps`, `ResponsiveVisibilityBelowProps`, `ResponsiveVisibilityOnlyProps`. Type `Breakpoint` from `@/types/responsive` may be re-exported from the component index for convenience.

---

## Forbidden Usage & Boundaries

The following are **explicitly forbidden** for breakpoint-based visibility when ResponsiveVisibility can be used: Tailwind visibility utilities (e.g. `hidden`, `md:block`, `lg:hidden`), CSS media queries in consumer code, JS breakpoint hooks for visibility (e.g. `useMediaQuery`, `window.innerWidth`), and duplicate visibility logic alongside ResponsiveVisibility.

- **FORBIDDEN:** Using `className` or Tailwind utility classes for breakpoint-based visibility in consumer or Extension code when ResponsiveVisibility can be used. ResponsiveVisibility is the **single canonical mechanism**; no alternative responsive visibility mechanisms are allowed.
- **FORBIDDEN:** Adding prop-level visibility (e.g. `visibleFrom`, `hideBelow`) to Layout or Foundation components. Visibility by breakpoint belongs only to ResponsiveVisibility.
- **FORBIDDEN:** Introducing new breakpoint tokens or changing the breakpoint scale in this capability.
- **Boundary:** This capability is Extension-only. Foundation is not modified.

---

## Enforcement

- **Forbidden patterns:** Listed in Forbidden Usage & Boundaries above. Compliance is mandatory for new code and modifications after Phase L lock; existing code is not retroactively invalidated (per EXTENSION_STATE Usage Policy).
- **Current stage:** At canonicalization, enforcement is **documentation-level**. Rules are binding; lint or runtime checks may be introduced in a separate task. Decision: docs-first; no mandatory lint/runtime implementation in this task.

---

## Related Documents

- [EXTENSION_AUTHORITY.md](../EXTENSION_AUTHORITY.md)
- [EXTENSION_CAPABILITY_MAP.md](EXTENSION_CAPABILITY_MAP.md)
- [RESPONSIVE_VISIBILITY_LOCK.md](../locks/RESPONSIVE_VISIBILITY_LOCK.md)
- [EXTENSION_STATE.md](../EXTENSION_STATE.md)
- [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md) — Foundation must not add breakpoint visibility props (Rule 3; Extension-owned capabilities)
- [PHASE_L_CLOSURE_SUMMARY.md](../../reports/PHASE_L_CLOSURE_SUMMARY.md) — Phase L closure; ResponsiveVisibility § 2.1
- [PHASE_L_RESPONSIVE_VISIBILITY_SUMMARY.md](../../reports/PHASE_L_RESPONSIVE_VISIBILITY_SUMMARY.md) — Phase L locked decisions snapshot
- [HEADER_COMPOSITION_INTENT.md](../../reports/HEADER_COMPOSITION_INTENT.md) — Reference composition (Header/AppShell)
- [RESPONSIVE_VISIBILITY_EXTENSION_API.md](RESPONSIVE_VISIBILITY_EXTENSION_API.md) — Extension API specification (Phase L.2)