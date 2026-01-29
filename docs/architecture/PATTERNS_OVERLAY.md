# Overlay Pattern

**Status:** ✅ **CANONICAL**  
**Date Created:** 2025-12-19  
**Type:** Architecture Pattern  
**Priority:** HIGH

---

## Purpose

This document defines the canonical pattern for overlay components in TenerifeUI. Overlay components are interactive UI elements that appear above the main content layer, typically requiring user interaction to dismiss.

**This pattern is binding and canonical.** All overlay components must follow this pattern.

---

## Overlay Panel Pattern

### Definition

**Overlay Panel** components are overlay orchestrators that manage:
- Portal rendering (overlay positioning)
- Backdrop rendering and click handling
- Focus lock management
- Keyboard handling (ESC to close, etc.)
- Gesture handling (swipe, drag, etc.)
- Body scroll prevention
- Return focus management
- Layout orchestration (scroll container, header/content separation)
- Content orchestration (grouping, auto-collapse, empty state)

### Architectural Decision

**Overlay Panel components are NOT Card or CardBase components.**

This is a **canonical architectural rule** established by [ADR_overlay_panel_not_card.md](./decisions/ADR_overlay_panel_not_card.md).

**Rationale:**
- Panel is an **overlay orchestrator** that manages interaction and layout
- Card is a **content container** with explicit semantic sections (header/body/footer)
- Mixing these semantics creates architectural confusion and breaks responsibility separation

**Reference:** See [ADR_overlay_panel_not_card.md](./decisions/ADR_overlay_panel_not_card.md) for complete architectural decision and rationale.

---

## Pattern Structure

### Canonical Overlay Panel Structure

```typescript
<Portal>
  <Backdrop onClick={onClose} />
  <div className="fixed right-0 top-0 z-50">
    <Surface variant="elevated">
      {/* Header (implicit section) */}
      <div>Header content</div>
      {/* Content (implicit section) */}
      <div className="flex-1 overflow-y-auto">
        <SpecializedContentComponent />
      </div>
    </Surface>
  </div>
</Portal>
```

### Component Responsibilities

1. **Portal** - Renders overlay outside normal DOM hierarchy
2. **Backdrop** - Visual background with click-to-close behavior
3. **Surface** - Provides elevation and radius styling
4. **Panel Container** - Fixed positioning and z-index management
5. **Header Section** - Implicit header (not abstracted as CardHeader)
6. **Content Section** - Implicit content (not abstracted as CardBody)
7. **Specialized Content Components** - Delegated content rendering (List, Item, etc.)

---

## DO / DON'T List

### ✅ DO

1. **Use Panel semantics for overlay orchestration:**
   - Handle Portal, Backdrop, Focus, Keyboard, Gestures at Panel level
   - Delegate content rendering to specialized components
   - Use Surface wrapper for elevation and radius
   - Keep header/content separation implicit (not abstracted as Card sections)

2. **Follow canonical structure:**
   - Portal → Backdrop + Panel container → Surface → Header + Content
   - Use fixed positioning for overlay positioning
   - Use appropriate z-index layers (see Elevation Authority)

3. **Implement overlay concerns:**
   - Focus lock management
   - Keyboard handling (ESC to close, Arrow keys for navigation)
   - Gesture handling (swipe to dismiss, drag)
   - Body scroll prevention
   - Return focus management

4. **Delegate content rendering:**
   - Use specialized components for content (List, Item, etc.)
   - Keep Panel focused on overlay orchestration
   - Avoid mixing content rendering with overlay orchestration

### ❌ DON'T

1. **DON'T convert Panel to Card or CardBase:**
   - Panel and Card serve different purposes
   - Mixing semantics creates confusion about component responsibilities
   - Card does not handle Portal, Backdrop, Focus, Keyboard, or Gestures

2. **DON'T introduce Card semantics:**
   - Don't abstract header/content as CardHeader/CardBody
   - Don't use Card components for overlay orchestration
   - Don't mix Panel and Card responsibilities

3. **DON'T skip overlay concerns:**
   - Don't skip focus lock management
   - Don't skip keyboard handling
   - Don't skip gesture handling
   - Don't skip body scroll prevention

4. **DON'T mix content rendering with overlay orchestration:**
   - Don't render content directly in Panel
   - Don't mix content logic with overlay logic
   - Don't create tight coupling between Panel and content

---

## Examples

### NotificationCenter.Panel

**Location:** `src/DOMAIN/notifications/NotificationCenter.Panel.tsx`

**Structure:**
- Portal + Backdrop + Panel container
- Surface wrapper (variant="elevated")
- Header section (implicit, not abstracted as CardHeader)
- Content section (implicit, not abstracted as CardBody)
- Delegates content rendering to `NotificationCenterList` and `NotificationCenterItem`

**Responsibilities:**
- Overlay orchestration (Portal, Backdrop, Focus, Keyboard, Gestures)
- Layout orchestration (scroll container, header/content separation)
- Content orchestration (grouping, auto-collapse, empty state)
- Delegates content rendering to List/Item components

**NOT a Card:**
- Does not use Card or CardBase components
- Does not abstract header/content as Card sections
- Focuses on overlay orchestration, not content display

**Reference:** See component implementation and [ADR_overlay_panel_not_card.md](./decisions/ADR_overlay_panel_not_card.md) for complete architectural decision.

---

## Related Patterns

- **Card Pattern** - Content container with explicit semantic sections (see [Card README](../../src/COMPOSITION/layout/Card/README.md))
- **Surface Pattern** - Variant-driven surface elevation container
- **Portal Pattern** - Render overlay outside normal DOM hierarchy
- **Backdrop Pattern** - Visual background with click-to-close behavior

---

## References

- **Architectural Decision:** [ADR_overlay_panel_not_card.md](./decisions/ADR_overlay_panel_not_card.md) - Overlay Panel ≠ Card/CardBase
- **Foundation Contract:** [FOUNDATION_CONTRACT.md](./FOUNDATION_CONTRACT.md) - Forbidden Extension Mechanisms
- **Elevation Authority:** [ELEVATION_AUTHORITY.md](./ELEVATION_AUTHORITY.md) - Z-index layers
- **Layout Authority:** [LAYOUT_AUTHORITY.md](./LAYOUT_AUTHORITY.md) - Layout structure and flow
- **Focus Authority:** [FOCUS_AUTHORITY.md](./FOCUS_AUTHORITY.md) - Focus navigation

---

## Status

✅ **CANONICAL** - This pattern is binding and canonical. All overlay components must follow this pattern.

**Last Updated:** 2025-12-19

