# HeroMedia — Canonical Capability Definition

**Package:** `@tenerife.music/ui`  
**Layer:** Extension / Architecture  
**Phase:** L.2 — Extension API Canon  
**Status:** CANONICAL / DESIGN-LOCKED  
**Date Created:** 2026-01-30  
**Task ID:** TUI_EXT_HEROMEDIA_CANON_001

---

## Document Classification

**TYPE:** Canonical Capability Definition  
**MUTABILITY:** Design-locked; changes only via explicit canon update  
**AUTHORITY DOMAIN:** Extension (Hero background / media support, Hero carousel capability)

**Purpose:** This document defines HeroMedia as the single canonical Extension capability for hero blocks with media (image, video, carousel) and overlay content. It fixes roles, API surface, composition rules, layering model, accessibility contract, constraints, and non-goals. No implementation code; implementation MUST follow this canon without reinterpretation.

---

## Purpose & Scope

**Purpose:** HeroMedia provides one canonical entry point for hero blocks that combine media (image, video, or carousel) with overlay content. It ensures consistent structure, accessibility, and layering without custom markup, without `className`/`style` props, and without token bypass.

**Scope:**

- Hero blocks with exactly one media type (image, video, or carousel)
- Overlay content via a single dedicated slot with fixed positions
- Orchestration of composition, accessibility, and layering only
- Compliance with [EXTENSION_AUTHORITY.md](../EXTENSION_AUTHORITY.md), [EXTENSION_CAPABILITY_MAP.md](EXTENSION_CAPABILITY_MAP.md) (Hero background / media support, Hero carousel capability), [LAYOUT_AUTHORITY.md](../LAYOUT_AUTHORITY.md), [INTERACTION_AUTHORITY.md](../INTERACTION_AUTHORITY.md), [STATE_AUTHORITY.md](../STATE_AUTHORITY.md)

**Out of Scope:**

- Site-level layout decisions (HeroMedia does NOT decide page layout)
- Custom animations or motion (out of scope for this capability)
- Autoplay, loop, or gesture control (deferred to later phases)
- Gradient overlay presets, hero marketing presets (deferred)
- Product-specific theming or branding

---

## Architectural Role

**HeroMedia (Root):**

- Orchestrates composition of Media and Overlay
- Owns accessibility and layering contract
- MUST NOT decide site layout
- MUST NOT add animations

**HeroMedia.Media:**

- Renders exactly one media type: image, video, or carousel (via Carousel)
- MUST NOT mix media types in one instance
- No custom layout or positioning beyond the canon

**HeroMedia.Overlay:**

- Container for content rendered on top of media
- Fixed positions and layers only
- MUST NOT allow arbitrary positioning

---

## Capability Classification (Extension)

HeroMedia is an **Extension** capability. It:

- MUST be realised using existing Foundation and COMPOSITION building blocks (e.g. Box, Stack, Carousel)
- MUST NOT introduce new tokens or token domains
- MUST NOT accept or forward `className` or `style`
- MUST NOT bypass the token system
- MUST comply with [EXTENSION_AUTHORITY.md](../EXTENSION_AUTHORITY.md) and [EXTENSION_CAPABILITY_MAP.md](EXTENSION_CAPABILITY_MAP.md)

---

## Public API (Root / Media / Overlay)

### HeroMedia.Root

**Contract:**

- `aspect` — optional; values: `'auto'` | `'16:9'` | `'21:9'` only
- `size` — optional; values: `'sm'` | `'md'` | `'lg'` only; affects ONLY internal safe-zones
- `ariaLabel` — optional; string

**Rules:**

- `aspect` MUST be one of the listed values if present
- `size` MUST affect only internal safe-zones; MUST NOT expose height/width
- Root MUST NOT accept `height`, `width`, or arbitrary dimension props

### HeroMedia.Media

**Contract:**

- `type` — required; values: `'image'` | `'video'` | `'carousel'`
- `src` — optional; for image or video only
- `poster` — optional; for video only
- `children` — optional; for carousel only (MUST be Carousel.Root when type is carousel)

**Rules:**

- When `type` is `'carousel'`, `children` MUST be present and MUST be a single Carousel.Root instance
- When `type` is `'image'` or `'video'`, `children` MUST NOT be used
- HeroMedia.Media MUST NOT expose `autoplay`, `loop`, or gesture-related props in this API

### HeroMedia.Overlay

**Contract:**

- `position` — required; values: `'top'` | `'center'` | `'bottom'`
- `align` — optional; values: `'start'` | `'center'` | `'end'`; affects only inline alignment

**Rules:**

- Overlay is the ONLY allowed way to place content on top of media
- Positions are fixed; no arbitrary positioning
- `align` MUST affect only inline (horizontal) alignment within the overlay slot

---

## Composition Rules

**Canonical structure:**

- Exactly one HeroMedia.Media per HeroMedia (Root)
- Overlay content ONLY via HeroMedia.Overlay
- No logic or behaviour in Media children other than Carousel.Root when type is carousel

**Valid patterns:**

- Root → Media (type image or video) + Overlay (position top | center | bottom)
- Root → Media (type carousel, children = Carousel.Root) + Overlay (position top | center | bottom)

**Invariants (LOCK candidates):**

- Exactly one Media per Hero
- Overlay only via HeroMedia.Overlay
- No behavioural logic in children; media type defines behaviour, not props
- Media type is the single source of behaviour (image vs video vs carousel)

---

## Layering Model

Layers are fixed and MUST NOT be customised:

- **Layer 0 — Media:** The media surface (image, video, or carousel track)
- **Layer 1 — Overlay:** Content rendered on top of media (HeroMedia.Overlay)
- **Layer 2 — Controls:** When Media is carousel, carousel controls (prev/next, indicators) render in this layer

**Rules:**

- Overlay MUST NOT occlude carousel controls when Media is carousel
- Controls MUST NOT occlude Overlay
- Z-index values are fixed; MUST NOT be exposed or overridable

---

## Orientation & Media Interaction

Media type (image, video, carousel) defines behaviour:

- **image:** Static image; `src` required when type is image
- **video:** Video element; `src` and `poster` as per contract; no autoplay/loop in this canon
- **carousel:** Carousel.Root as sole child; navigation and behaviour owned by Carousel

HeroMedia does NOT define autoplay, loop, or gesture/swipe behaviour in this document; those are deferred to later phases.

---

## Accessibility Contract

**HeroMedia.Root:**

- MUST expose `role="region"` (or equivalent landmark semantics)
- `ariaLabel` (or equivalent) MUST be provided when the hero contains a CTA or meaningful interactive content

**Video:**

- MUST NOT autoplay by default
- `poster` MUST be required for video (to provide a visible frame when paused or before play)

**Carousel:**

- Carousel is already A11Y-safe per its own contract; HeroMedia MUST NOT weaken Carousel accessibility when composing it

---

## Constraints & Prohibitions

HeroMedia MUST NOT:

- Accept or forward `className` or `style`
- Bypass the token system (no raw values for layout, spacing, or visuals)
- Accept custom layout props (e.g. arbitrary height/width)
- Expose z-index or layering for customisation
- Allow more than one Media per Root
- Allow overlay content except via HeroMedia.Overlay
- Introduce new tokens or token domains

**Invariants (enforcement):**

- Only one Media per Hero
- Overlay only through HeroMedia.Overlay
- No logic in children; media type drives behaviour
- Media type is authoritative for behaviour, not additional props

---

## Non-Goals

HeroMedia explicitly does NOT:

- Control autoplay, loop, or gesture/swipe (deferred)
- Accept custom layouts or arbitrary positioning
- Accept `className` or `style`
- Encode branding or product-specific theming

**Deferred to later phases:**

- Autoplay / loop (e.g. Carousel extension)
- GradientOverlay presets
- Hero presets (marketing)
- Motion / transitions

---

## Integration with Carousel

When HeroMedia.Media `type` is `'carousel'`:

- The only allowed content of Media is a single **Carousel.Root** instance as `children`
- Behaviour (navigation, loop, keyboard, etc.) and accessibility remain fully defined by Carousel
- HeroMedia is responsible only for composition and layering: Media in Layer 0, Overlay in Layer 1, Carousel controls in Layer 2
- HeroMedia MUST NOT override or duplicate Carousel behaviour or A11Y

---

## Change Policy & Lock Conditions

- This document is **design-locked**. Any change to the API, composition rules, layering, or invariants MUST be made by explicit update to this canon.
- The invariants listed in this document are **LOCK candidates** for future propagation to [ARCHITECTURE_LOCK.md](../ARCHITECTURE_LOCK.md) or equivalent.
- Implementation MUST NOT precede or deviate from this document; implementation MUST be traceable to this canon without reinterpretation.

---

## Related Documents

- [EXTENSION_AUTHORITY.md](../EXTENSION_AUTHORITY.md) — Extension boundary contract
- [EXTENSION_CAPABILITY_MAP.md](EXTENSION_CAPABILITY_MAP.md) — Hero background / media support, Hero carousel capability
- [LAYOUT_AUTHORITY.md](../LAYOUT_AUTHORITY.md) — Layout rules
- [INTERACTION_AUTHORITY.md](../INTERACTION_AUTHORITY.md) — Interaction rules
- [STATE_AUTHORITY.md](../STATE_AUTHORITY.md) — State rules
- [DOCUMENTATION_CANON_LOCK.md](../DOCUMENTATION_CANON_LOCK.md) — Documentation structure (extension/ placement)

---

**Last Updated:** 2026-01-30  
**Task ID:** TUI_EXT_HEROMEDIA_CANON_001  
**Status:** CANONICAL / DESIGN-LOCKED
