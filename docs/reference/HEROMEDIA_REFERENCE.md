# HeroMedia Reference

**Task:** TUI_HEROMEDIA_DEFAULT_GEOMETRY_CONTRACT_001; TUI_HEROMEDIA_LAYOUT_MODE_CONTRACT_002  
**Last Updated:** 2026-02-02  
**Purpose:** Developer reference for HeroMedia default geometry, padding, height mode, Media-optional usage, and fallback behaviour.

---

## Overview

HeroMedia is the Extension capability for hero blocks that combine media (image, video, or carousel) with overlay content. Root defines geometry, safe-padding, and height mode at the Root level so the hero acts as a layout anchor regardless of Media presence.

**Canonical definition:** [docs/architecture/extension/HEROMEDIA_CANON.md](../architecture/extension/HEROMEDIA_CANON.md)

---

## Safe Padding

- Root MUST have **safe-padding on all sides** (mobile and desktop) using existing tokens (e.g. `--layout-container-md`).
- Content MUST NOT touch screen edges; HeroMedia preserves visual breathing space for overlay content.
- Overlay content also has internal padding via `size` (safe-zone); Root padding ensures the whole hero block is inset from the viewport.

---

## Height Mode

- Root supports explicit prop **`mode`**: `'fullscreen'` | `'contained'`. Default: **`'contained'`**.
- **fullscreen:** HeroMedia occupies full viewport height (100vh), no bottom gap. Use for above-the-fold hero.
- **contained:** HeroMedia has constrained height (aspect-ratio); next content is partially visible; visual continuation. Use when hero is part of a scrollable page.
- No implicit or intermediate hero heights; only fullscreen or contained.

---

## Default Geometry

- When `aspect` is `"auto"` (default), a **default aspect-ratio of 16:9** is applied. HeroMedia does not collapse when Media is absent or loading.
- When `aspect` is `"16:9"` or `"21:9"`, that ratio is used.
- Geometry is always defined at **HeroMedia.Root**; Media is not the source of HeroMedia size.

---

## Media Optional

- The Media slot is **optional**. Root may render with Overlay only (no `HeroMedia.Media`).
- When Media is absent or loading, a **fallback neutral surface** (existing token, e.g. `--tm-surface-base`) is visible so Overlay and CTA remain correctly positioned.
- Overlay content is responsible for contrast/readability when rendered over the fallback surface.

---

## Usage Summary

| Scenario              | Result                                                                 |
|-----------------------|------------------------------------------------------------------------|
| Root + Media + Overlay | Media fills aspect box; overlay on top; safe padding applied.        |
| Root + Overlay only   | Default 16:9 geometry; fallback surface; overlay correctly positioned. |
| Media loading (e.g. delayed `src`) | Same 16:9 geometry; no layout shift when Media appears.       |
| mode=fullscreen       | Hero fills 100vh; no bottom gap.                                      |
| mode=contained (default) | Hero has aspect-ratio height; next content visible below.          |

---

## Related

- [HEROMEDIA_CANON.md](../architecture/extension/HEROMEDIA_CANON.md) — Full contract, API, composition rules, invariants.
