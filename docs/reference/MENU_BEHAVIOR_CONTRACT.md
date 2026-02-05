# Menu Behavior Contract

**Task:** TUI_MENU_BEHAVIOR_CONTRACT_001  
**Status:** ACTIVE  
**Last Updated:** 2026-02-02  
**Type:** REFERENCE

---

## Purpose

This document defines the **behavioral contract** for navigation menu open position on small and medium screens. It removes ambiguity: the menu must open from the trigger side by default, and center mode is only available when explicitly configured.

**Related:** [NAVIGATION_CANON.md](NAVIGATION_CANON.md) — Navbar zones and overlay usage.

---

## Scope

- **In scope:** Menu open position behavior, default side resolution, optional center mode, explicit side overrides, behavior documentation.
- **Out of scope:** Visual style redesign, navigation item changes, animations/motion, overlay/backdrop visuals, business navigation logic.

**Applicable viewports:** Mobile portrait, mobile landscape, tablet. Rules are the same across these breakpoints. On desktop, overlay positioning may follow the same contract where Menu or Drawer is used.

---

## Contract Rules

### Default behavior (side-attached)

- **Mode:** `auto` (implicit when no explicit mode is set).
- **Rule:** The menu opens **from the trigger side**.
  - Trigger in **Left** zone → menu opens from the left (content attached to left / grows from left).
  - Trigger in **Right** zone → menu opens from the right (content attached to right / grows from right).
- **Implementation:** For **Menu** (Radix DropdownMenu), use `align="start"` by default so content is edge-aligned to the trigger; pass `side` according to zone (e.g. trigger in Left → `side="right"` so content appears to the right of the trigger, staying on the left side of the viewport). For **Drawer**, pass `position="left"` when trigger is in Left zone, `position="right"` when trigger is in Right zone.

### Explicit options

| Mode   | Description |
|--------|-------------|
| **left**  | Menu always opens from the left side of the screen. |
| **right** | Menu always opens from the right side of the screen. |
| **center** | Menu opens centered (navigation hub). **Only when explicitly configured.** |

### Forbidden as default

- **center** MUST NOT be the default. Center is allowed only when the consumer explicitly sets it (e.g. `align="center"` for Menu, or a future `position="center"` for Drawer).

### Predictability

- Menu position MUST be predictable and repeatable for the same trigger placement.
- Behavior MUST be documented and not implicit.

---

## Navbar zone mapping

Per [NAVIGATION_CANON.md](NAVIGATION_CANON.md):

- **Left zone:** Logo, brand, mobile menu trigger. When the menu trigger is in the Left zone → menu opens from the left (side-attached to trigger).
- **Right zone:** User menu, auth, theme, etc. When the menu trigger is in the Right zone → menu opens from the right (side-attached to trigger).
- **Center zone:** Primary nav links (desktop). On mobile, center content moves into a Drawer; that Drawer’s position follows this contract (e.g. trigger in Left → Drawer `position="left"`).

---

## Component usage

### Menu (dropdown)

- Default: use `align="start"` so content is edge-aligned to the trigger (side-attached). Optionally set `side` from the trigger zone.
- Explicit center: set `align="center"` (and `side` if needed).
- See [Menu](../src/COMPOSITION/navigation/Menu/Menu.tsx) — `Menu.Content` accepts `side` and `align`.

### Drawer

- For navigation: trigger in Left zone → `position="left"`; trigger in Right zone → `position="right"`.
- Library default remains `position="right"` for backward compatibility; navigation usage MUST set position explicitly per zone.
- Center position for Drawer (if added later) MUST be explicit only, never default.

---

## Acceptance criteria

- [ ] Menu opens from trigger side by default.
- [ ] Center menu opens only when explicitly configured.
- [ ] User interaction feels causally correct (trigger ↔ menu position).
- [ ] Menu behavior is consistent across target screen sizes.
- [ ] No ambiguity in menu positioning logic.
