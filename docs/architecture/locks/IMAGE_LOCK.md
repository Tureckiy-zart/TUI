# Image Extension Lock

**Version:** 1.0  
**Date Created:** 2026-02-09  
**Last Updated:** 2026-02-09  
**Status:** PROCESS LOCKED - IMMUTABLE  
**Layer:** EXTENSION / COMPOSITION  
**Priority:** CRITICAL  
**Task ID:** TUI_T12_COMPONENT_IMAGE_CREATE  
**Lock Date:** 2026-02-09

---

## Purpose

This document **formally locks** the Image Extension component of `@tenerife.music/ui`. After this lock, the Image API, composition contract, and token usage are **immutable** and **closed for modifications**.

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

**Source of Truth:** [EXTENSION_STATE.md](../EXTENSION_STATE.md)

---

## Locked Component

### Image

- **Location:** `src/COMPOSITION/controls/Image/`
- **Status:** PROCESS LOCKED (Component Creation Pipeline C0-C10 complete)
- **Lock Date:** 2026-02-09
- **Creation Report:** `docs/reports/creation/Image_CREATION_REPORT.md`
- **Component Type:** Extension Layer Primitive - Media
- **Purpose:** Token-driven image primitive with explicit layout contract and safe fallback handling
- **Exports:** `Image`, `ImageProps`, `ImageFit`, `ImageRadius`
- **Rule:** DO NOT modify without explicit unlock procedure

---

## Locked Architecture

- Native `<img>` rendering (no custom rendering surface)
- Explicit `fit` union (`cover | contain | fill | none | scale-down`)
- Token-driven `radius` (no raw values)
- Optional `fill` mode for AspectRatio composition (absolute inset)
- Optional `fallback` rendered on error
- Inline by default (no implicit full-width behavior)

---

## Forbidden Actions

- Adding raw sizing/color/motion values
- Introducing layout responsibilities beyond media rendering
- Changing the AspectRatio composition contract
- Adding alternative image primitives

---

## Unlock Procedure

1. Create unlock request with justification
2. Get architectural approval
3. Re-enter Component Creation Pipeline (or 18A if modifying existing behavior)
4. Re-lock with updated documentation

---

## Related Documents

- [EXTENSION_STATE.md](../EXTENSION_STATE.md)
- [ARCHITECTURE_LOCK.md](../ARCHITECTURE_LOCK.md)
- [Image_CREATION_REPORT.md](../../reports/creation/Image_CREATION_REPORT.md)
