# Header/AppShell Composition Intent — Phase L

**Task ID:** TUI_PHASE_L_HEADER_COMPOSITION_DESIGN_001  
**Date:** 2026-01-31  
**Status:** Design intent — reference composition implemented  
**Phase:** L — Extension ResponsiveVisibility reference

---

## Scope & Classification

This document defines the **design intent** for Header/AppShell as the canonical composition-level block where ResponsiveVisibility is applied correctly. Reference composition implemented: HeaderComposition (Extensions / ResponsiveVisibility / HeaderCompositionReference).

- **Header/AppShell** — reference composition block; implemented as HeaderComposition in `@tenerife.music/ui`
- **Purpose:** Reference composition for ResponsiveVisibility; clarifies where breakpoint-based branching belongs
- **Authority:** Aligns with [NAVIGATION_AUDIT_PHASE_L.md](NAVIGATION_AUDIT_PHASE_L.md) and [RESPONSIVE_VISIBILITY_CANON.md](../architecture/extension/RESPONSIVE_VISIBILITY_CANON.md)

---

## Role & Responsibility

Header/AppShell is the **app-level composition block** that assembles navigation primitives into a coherent layout. It is the level at which breakpoint-based branching (mobile vs desktop) occurs.

### Primary Responsibility

- Assemble existing navigation primitives into an app header or app shell layout
- Apply ResponsiveVisibility at the **root level** to choose between mobile and desktop variants
- Delegate rendering of navigation content to primitives; do not introduce new navigation abstractions

### Typical Child Blocks (no new abstractions)

Navigation primitives and patterns used as building blocks:

- **Structural / root:** NavRoot, nav-list, primitives
- **Patterns:** breadcrumbs, pagination, tabs, segmented-control, stepper
- **Contextual:** Menu, SearchBar
- **Supporting:** NavText, NavSeparator

Layout primitives (Box, Stack, Inset, etc.) may wrap these as needed.

### Breakpoint Branching

In a real application shell, responsive branching occurs as follows:

- **Desktop (e.g. viewport ≥ md):** Full NavRoot with horizontal nav-list, SearchBar inline, logo
- **Mobile (e.g. viewport < md):** Menu (hamburger/drawer), condensed SearchBar or icon, logo

This branching is **exclusively** at the composition level. Navigation primitives themselves remain breakpoint-agnostic.

---

## ResponsiveVisibility Application

### Where to Apply

ResponsiveVisibility is applied at the **root level** of the Header/AppShell composition, wrapping the mobile and desktop variants.

### Pattern

```text
ResponsiveVisibility.Root
  ResponsiveVisibility.Below(bp="md")  →  mobile header (Menu, condensed layout)
  ResponsiveVisibility.From(bp="md")   →  desktop header (NavRoot, SearchBar, full layout)
```

Breakpoint choice (`md`, `lg`, etc.) is application-specific. The composition layer owns this decision; navigation primitives do not.

### Canon Reference

See [RESPONSIVE_VISIBILITY_CANON.md](../architecture/extension/RESPONSIVE_VISIBILITY_CANON.md) for slot semantics (From, Below, Only), SSR behaviour, and forbidden usage.

---

## Boundaries — NOT Responsible For

Header/AppShell composition is **not** responsible for:

- **Tokens and styling** inside navigation primitives — primitives own their token usage
- **Internal logic** of navigation components (NavRoot, Menu, SearchBar, etc.) — primitives remain unchanged
- **Layout primitives** (StickyBar, PageHeader, ContentShell) — these operate at different levels
- **Foundation or Layout changes** — no modifications to locked layers
- **Routing or state management** — composition assembles UI; routing stays in app logic

---

## Relationship to Existing Components

| Component      | Level            | Relationship to Header/AppShell                                             |
| -------------- | ---------------- | --------------------------------------------------------------------------- |
| **PageHeader** | Page-level       | Semantic page header (title, breadcrumbs, actions). Not app-level header.   |
| **StickyBar**  | Layout primitive | Sticky container. Does NOT act as Header replacement.                       |
| **ContentShell** | Body wrapper   | Main content + optional nav. Composes with Header; does not replace it.     |
| **SidebarLayout** | Page layout  | Two-column layout. May contain Header in its content; different scope.      |
| **Header/AppShell** | App-level   | Composition of navigation primitives with responsive branching.             |

---

## Reference Decision & Follow-up

### Decision

ResponsiveVisibility reference usage is **intentionally deferred** to composition-level blocks (Header/AppShell or similar). Navigation primitives remain breakpoint-agnostic. Consumers must apply ResponsiveVisibility when assembling app headers or shells, not inside navigation components.

### Consistency Check

- No contradiction with [EXTENSION_STATE.md](../architecture/EXTENSION_STATE.md) — HeaderComposition implemented; etalon for ResponsiveVisibility
- No contradiction with [RESPONSIVE_VISIBILITY_CANON.md](../architecture/extension/RESPONSIVE_VISIBILITY_CANON.md) — usage pattern aligns with From/Below semantics
- No contradiction with [RESPONSIVE_VISIBILITY_LOCK.md](../architecture/locks/RESPONSIVE_VISIBILITY_LOCK.md) — application at composition level only; not inside primitives or atoms
- No contradiction with [NAVIGATION_AUDIT_PHASE_L.md](NAVIGATION_AUDIT_PHASE_L.md) — composition level confirmed as correct placement

### Follow-up (Complete)

- Reference composition implemented: HeaderComposition (Extensions / ResponsiveVisibility / HeaderCompositionReference)

---

## Related Documents

- [RESPONSIVE_VISIBILITY_CANON.md](../architecture/extension/RESPONSIVE_VISIBILITY_CANON.md)
- [RESPONSIVE_VISIBILITY_LOCK.md](../architecture/locks/RESPONSIVE_VISIBILITY_LOCK.md)
- [EXTENSION_STATE.md](../architecture/EXTENSION_STATE.md)
- [NAVIGATION_AUDIT_PHASE_L.md](NAVIGATION_AUDIT_PHASE_L.md)
- [PHASE_L_RESPONSIVE_VISIBILITY_SUMMARY.md](PHASE_L_RESPONSIVE_VISIBILITY_SUMMARY.md)

---

## Status

Design intent documented.  
Header/AppShell confirmed as reference composition for ResponsiveVisibility.  
Reference composition implemented: HeaderComposition. Phase L–compliant.
