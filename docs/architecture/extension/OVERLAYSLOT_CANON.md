# OverlaySlot — Canonical Capability Definition

**Package:** `@tenerife.music/ui`  
**Layer:** Extension / Architecture  
**Phase:** L.4 — API Design  
**Status:** CANONICAL / LOCKED  
**Date Created:** 2026-01-30  
**Task ID:** TUI_EXT_OVERLAYSLOT_API_001  
**Lock Task ID:** TUNG_LOCK_PHASE_L_OVERLAY_HEROMEDIA_001  
**Lock Date:** 2026-01-31

---

## Document Classification

**TYPE:** Canonical Capability Definition  
**MUTABILITY:** Design-locked; changes only via explicit canon update  
**AUTHORITY DOMAIN:** Extension (Overlay positioning — badge/icon over content)

**Purpose:** This document defines OverlaySlot as the single canonical Extension capability for placing overlay elements over anchor content (badges, labels, floating CTA, indicators, status). It fixes roles, API surface, composition rules, positioning contract, accessibility contract, constraints, and non-goals. No implementation code; implementation MUST follow this canon without reinterpretation. OverlaySlot removes raw `position: absolute`, `z-index`, `pointer-events`, and ad-hoc overlay wrappers from product and composition code.

---

## Purpose & Scope

**Purpose:** OverlaySlot provides one canonical positioning contract for overlay elements over a single anchor. It ensures predictable behaviour, unified coordinate scheme, and safe composition without custom markup, without `className`/`style` props, and without raw layout.

**Scope:**

- Overlay over exactly one anchor
- Fixed positions via closed enum only
- One or multiple overlay items per Root
- Safe composition; compliance with [EXTENSION_AUTHORITY.md](../EXTENSION_AUTHORITY.md), [EXTENSION_CAPABILITY_MAP.md](EXTENSION_CAPABILITY_MAP.md) (Overlay positioning), [LAYOUT_AUTHORITY.md](../LAYOUT_AUTHORITY.md), [INTERACTION_AUTHORITY.md](../INTERACTION_AUTHORITY.md)

**Out of Scope:**

- Animations or motion
- Drag / gestures
- Adaptive repositioning or collision detection
- Popover / tooltip logic
- Scroll-aware positioning
- Theme customization or z-index control

---

## Architectural Role

**OverlaySlot.Root:**

- Owns positioning context
- Exactly one Anchor
- Any number of Item
- MUST NOT accept layout/style or token props

**OverlaySlot.Anchor:**

- Base content (single anchor)
- Exactly one per Root
- MUST NOT accept layout or style props; children only

**OverlaySlot.Item:**

- Overlay content; position from closed enum only
- MUST be inside Root
- MUST NOT accept custom position values

---

## Capability Classification (Extension)

OverlaySlot is an **Extension** capability. It:

- MUST be realised using existing Foundation and COMPOSITION building blocks (e.g. Box, Stack)
- MUST NOT introduce new tokens or token domains
- MUST NOT accept or forward `className` or `style`
- MUST NOT bypass the token system
- MUST comply with [EXTENSION_AUTHORITY.md](../EXTENSION_AUTHORITY.md) and [EXTENSION_CAPABILITY_MAP.md](EXTENSION_CAPABILITY_MAP.md)

---

## Public API (Root / Anchor / Item)

### OverlaySlot.Root

**Contract:**

- No layout or style props in this design
- Owns positioning context; exactly one Anchor; zero or more Item

**Rules:**

- Root MUST NOT accept `className`, `style`, or arbitrary dimension/layout props
- Exactly one Anchor child; any number of Item children

### OverlaySlot.Anchor

**Contract:**

- `children` — content that serves as the anchor (one child or fragment)

**Rules:**

- Anchor MUST NOT accept layout or style props
- Exactly one Anchor per Root

### OverlaySlot.Item

**Contract:**

- `position` — required; values: `'top-left'` | `'top-right'` | `'bottom-left'` | `'bottom-right'` | `'center'` only (CLOSED enum)
- `children` — overlay content

**Rules:**

- `position` MUST be one of the listed values; no custom values
- Item MUST be a descendant of Root
- Multiple Item allowed per Root (each with its own position)

---

## Composition Rules

**Canonical structure:**

```text
<OverlaySlot.Root>
  <OverlaySlot.Anchor>
    {anchor content}
  </OverlaySlot.Anchor>
  <OverlaySlot.Item position="top-right">
    {overlay content}
  </OverlaySlot.Item>
  …
</OverlaySlot.Root>
```

**Valid patterns:**

- Root → exactly one Anchor + zero or more Item (each Item with position from enum)

**Invariants (LOCK-level):**

- Exactly one Anchor per Root
- Item MUST be inside Root
- Position MUST be from closed enum only
- OverlaySlot owns positioning context; no raw positioning, no token props, no responsive branching, no conditional layout logic
- `className` and `style` are forbidden on Root, Anchor, and Item

---

## Positioning Model

Positions are fixed and MUST NOT be customised:

- **top-left** — overlay at top-left of anchor
- **top-right** — overlay at top-right of anchor
- **bottom-left** — overlay at bottom-left of anchor
- **bottom-right** — overlay at bottom-right of anchor
- **center** — overlay at center of anchor

**Rules:**

- No custom or extended position values
- Z-index and stacking are owned by OverlaySlot; MUST NOT be exposed or overridable

---

## Accessibility Contract

- Overlay MUST NOT break tab order
- Anchor remains the primary interactive region
- Overlay Item MUST NOT capture pointer events when not interactive (hit-area and focus remain predictable)
- Responsibility for `role` and ARIA semantics lies with the child content; OverlaySlot does not assign roles

---

## Constraints & Prohibitions

OverlaySlot MUST NOT:

- Accept or forward `className` or `style`
- Use or expose raw positioning (e.g. raw `position: absolute`, `z-index`, `pointer-events` in product/composition)
- Accept token props or responsive branching for layout
- Apply conditional layout logic
- Allow Item outside Root
- Introduce new tokens or token domains

**Invariants (enforcement):**

- Exactly one Anchor per Root
- Item only inside Root
- Position only from closed enum
- OverlaySlot owns positioning context

---

## Integration Rules

OverlaySlot does NOT know about:

- HeroMedia
- Carousel
- Card

It is a generic capability, not product logic. Other capabilities (e.g. HeroMedia) may use OverlaySlot or implement their own overlay contract; OverlaySlot remains independent.

---

## Non-Goals

OverlaySlot explicitly does NOT:

- Provide “smart” repositioning or auto-flip
- Define responsive position rules
- Expose z-index control
- Support theme customization for overlay layout
- Implement popover, tooltip, or scroll-aware behaviour

---

## Change Policy & Lock Conditions

- This document is **design-locked**. Any change to the API, composition rules, positioning enum, or invariants MUST be made by explicit update to this canon.
- The invariants listed in this document are **LOCK candidates** for future propagation to [ARCHITECTURE_LOCK.md](../ARCHITECTURE_LOCK.md) or equivalent.
- Implementation MUST NOT precede or deviate from this document; implementation MUST be traceable to this canon without reinterpretation.
- This canon is eligible for API LOCK (next step: OVERLAYSLOT_API_LOCK).

---

## Related Documents

- [EXTENSION_AUTHORITY.md](../EXTENSION_AUTHORITY.md) — Extension boundary contract
- [EXTENSION_CAPABILITY_MAP.md](EXTENSION_CAPABILITY_MAP.md) — Overlay positioning capability
- [LAYOUT_AUTHORITY.md](../LAYOUT_AUTHORITY.md) — Layout rules
- [INTERACTION_AUTHORITY.md](../INTERACTION_AUTHORITY.md) — Interaction rules
- [DOCUMENTATION_CANON_LOCK.md](../DOCUMENTATION_CANON_LOCK.md) — Documentation structure (extension/ placement)
- [HEROMEDIA_CANON.md](HEROMEDIA_CANON.md) — Adjacent capability (hero/media/overlay); no dependency

---

**Last Updated:** 2026-01-30  
**Task ID:** TUI_EXT_OVERLAYSLOT_API_001  
**Status:** CANONICAL / DESIGN-LOCKED
