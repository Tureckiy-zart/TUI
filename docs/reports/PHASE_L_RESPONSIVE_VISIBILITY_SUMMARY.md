# Phase L — ResponsiveVisibility Summary (Log-only)

**Date:** 2026-01-31  
**Phase:** L — Extension Responsive Visibility  
**Status:** LOCKED  
**Task ID:** TUI_PHASE_L_RESPONSIVE_VISIBILITY_001

---

## Purpose

This document fixes the key architectural decisions made at Phase L lock for ResponsiveVisibility so that handoff snapshots and future context do not contradict LOCK documents. It is a log-only snapshot; no code changes.

---

## Locked Decisions

1. **ResponsiveVisibility is the single canonical surface for breakpoint-based show/hide.**  
   Consumers MUST NOT implement raw breakpoint visibility via `className` or Tailwind. ResponsiveVisibility compound API (Root/From/Below/Only) is the only allowed mechanism. See [RESPONSIVE_VISIBILITY_LOCK.md](../architecture/locks/RESPONSIVE_VISIBILITY_LOCK.md) and [EXTENSION_STATE.md](../architecture/EXTENSION_STATE.md) § Extension Capabilities LOCKED (Phase L).

2. **Slot semantics are fixed.**  
   From(bp) = min-width; Below(bp) = max-width exclusive; Only(bp) = [bp, nextBp); Only(2xl) = From(2xl). Non-matching slots do not render (no display:none). See [RESPONSIVE_VISIBILITY_CANON.md](../architecture/extension/RESPONSIVE_VISIBILITY_CANON.md).

3. **SSR behaviour is fixed.**  
   Server and pre-hydration render nothing; after mount the matching slot is rendered. No viewport guessing on the server.

4. **Breakpoint source and detection.**  
   Breakpoint type from `@/types/responsive`; min-width values match Tailwind/FOUNDATION (internal constants). Viewport detection via internal hook using `matchMedia`; no new tokens or breakpoint scale changes.

5. **No prop-level visibility on Layout or Foundation.**  
   Visibility by breakpoint is not added as a prop to any Layout or Foundation component; it belongs only to ResponsiveVisibility.

6. **Slot resolution order: first matching slot wins.**  
   Root evaluates children in order; the first slot (From, Below, or Only) that matches the current viewport breakpoint is rendered; all others are skipped. No deterministic tie-breaking beyond children order.

7. **Slot bp excludes "base" (CANON).**  
   From/Below/Only accept only `sm` | `md` | `lg` | `xl` | `2xl`; `base` is forbidden at type level and guarded at runtime in dev (throws); in prod a slot with bp="base" is treated as non-match.

8. **Application: composition level only; not inside primitives or atoms.**  
   ResponsiveVisibility MUST NOT be used inside primitives or atoms, or to add breakpoint visibility inside Layout or Foundation components. See [RESPONSIVE_VISIBILITY_CANON.md](../architecture/extension/RESPONSIVE_VISIBILITY_CANON.md).

9. **Explicitly forbidden for breakpoint-based visibility (when ResponsiveVisibility can be used):** Tailwind visibility utilities (e.g. `hidden`, `md:block`, `lg:hidden`), CSS media queries in consumer code, JS breakpoint hooks for visibility (e.g. `useMediaQuery`, `window.innerWidth`), and duplicate visibility logic. See CANON Forbidden Usage.

### Slot Resolution Policy

ResponsiveVisibility uses a deterministic slot resolution rule:

- **First matching slot in children order wins.**
- If multiple slots match the current breakpoint range, only the first matching slot (by React children order) is rendered.
- This behavior is intentional and considered part of the Phase L lock semantics.

### Reference Story (Header/AppShell)

A canonical Storybook reference demonstrates ResponsiveVisibility at composition level (Header/AppShell): **Extensions / ResponsiveVisibility / HeaderCompositionReference**. Mobile (viewport < md): Menu with hamburger. Desktop (viewport ≥ md): NavRoot with horizontal NavList. See [HEADER_COMPOSITION_INTENT.md](HEADER_COMPOSITION_INTENT.md).

---

## Related Documents

- [HEADER_COMPOSITION_INTENT.md](HEADER_COMPOSITION_INTENT.md) — composition-level reference for ResponsiveVisibility
- [RESPONSIVE_VISIBILITY_CANON.md](../architecture/extension/RESPONSIVE_VISIBILITY_CANON.md)
- [RESPONSIVE_VISIBILITY_LOCK.md](../architecture/locks/RESPONSIVE_VISIBILITY_LOCK.md)
- [EXTENSION_STATE.md](../architecture/EXTENSION_STATE.md)
- [EXTENSION_CAPABILITY_MAP.md](../architecture/extension/EXTENSION_CAPABILITY_MAP.md)
- [FOUNDATION_LOCK.md](../architecture/FOUNDATION_LOCK.md) — Rule 3: no breakpoint visibility in Foundation; Extension-owned capabilities
- [NAVIGATION_AUDIT_PHASE_L.md](NAVIGATION_AUDIT_PHASE_L.md) — composition level confirmed; not inside navigation primitives