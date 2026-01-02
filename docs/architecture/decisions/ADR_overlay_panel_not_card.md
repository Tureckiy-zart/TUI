# Architecture Decision: Overlay Panel ≠ Card/CardBase

**Decision ID:** `ADR_overlay_panel_not_card`  
**Version:** 1.0  
**Date:** 2025-12-19  
**Status:** ✅ **DECIDED**  
**Authority:** This decision is canonical and binding

---

## Executive Summary

This document records the architectural decision that **Overlay Panel components are NOT Card or CardBase components**. Panels are overlay orchestrators that manage interaction, layout, and focus, while Cards are content containers with explicit semantic sections.

**Decision:** Overlay Panel components (e.g., `NotificationCenter.Panel`) must NOT be converted to Card or CardBase. Panel semantics are fundamentally different from Card semantics.

---

## Context

During component refactoring and architecture reviews, questions arise about whether overlay panels should use Card or CardBase components for their structure. This decision clarifies the semantic distinction and prevents architectural drift.

**Example Component:** `NotificationCenter.Panel` (`src/DOMAIN/notifications/notifications/NotificationCenter.Panel.tsx`)

---

## Decision

**Overlay Panel components are NOT Card or CardBase components.**

### Panel Responsibilities

Overlay Panel components are responsible for:

1. **Container Orchestration:**
   - Portal rendering (overlay positioning)
   - Backdrop rendering and click handling
   - Surface wrapper with elevation and radius
   - Fixed positioning (side drawer, modal, etc.)

2. **Interaction Orchestration:**
   - Swipe gesture handling
   - Focus lock management
   - Keyboard handling (ESC to close, etc.)
   - Body scroll prevention
   - Return focus management

3. **Layout Orchestration:**
   - Scroll container boundaries
   - Header/content separation (implicit, not abstracted)
   - Delegation to subcomponents (List, Item, etc.)

4. **Content Orchestration (Panel-level):**
   - Grouping logic (if applicable)
   - Auto-collapse state management (if applicable)
   - Empty state rendering
   - Delegation of content rendering to specialized components

### Card Responsibilities

Card components are responsible for:

1. **Content Container:**
   - Explicit semantic sections (header, body, footer)
   - Content display and organization
   - Token-driven styling for content sections

2. **Content Presentation:**
   - Structured content layout
   - Visual hierarchy within content
   - Content-specific styling

### Key Differences

| Aspect | Panel | Card |
|--------|-------|------|
| **Primary Role** | Overlay orchestrator | Content container |
| **Structure** | Portal + Backdrop + Surface wrapper | Explicit header/body/footer sections |
| **Focus** | Interaction and layout orchestration | Content display and organization |
| **Content Rendering** | Delegates to specialized components | Renders content directly |
| **Header/Content Separation** | Implicit (not abstracted) | Explicit (abstracted as Card sections) |
| **Overlay Concerns** | Portal, Backdrop, Focus, Keyboard, Gestures | Not applicable |
| **Scroll Management** | Panel-level scroll container | Content-level scrolling (if needed) |

---

## Rationale

### Why Panel ≠ Card

1. **Semantic Correctness:**
   - Panel is an **overlay container** that orchestrates interaction and layout
   - Card is a **content container** with explicit semantic sections
   - Mixing these semantics creates architectural confusion

2. **Responsibility Separation:**
   - Panel handles **overlay concerns** (Portal, Backdrop, Focus, Keyboard, Gestures)
   - Panel delegates **content rendering** to specialized components (List, Item, etc.)
   - Card handles **content organization** and **content display**

3. **Structural Differences:**
   - Panel structure: `Portal → Backdrop + Panel container → Surface → Header + Content`
   - Card structure: `Card → CardHeader + CardBody + CardFooter`
   - Panel's header/content separation is **implicit** (not abstracted as Card sections)

4. **Reusability:**
   - Panel components are reusable overlay orchestrators
   - Card components are reusable content containers
   - Converting Panel to Card would break overlay orchestration responsibilities

### Why NOT Convert Panel to Card

1. **Loss of Overlay Semantics:**
   - Card does not handle Portal, Backdrop, Focus, Keyboard, or Gestures
   - Converting Panel to Card would require re-implementing overlay concerns

2. **Architectural Drift:**
   - Panel and Card serve different purposes
   - Mixing semantics creates confusion about component responsibilities

3. **Unnecessary Abstraction:**
   - Panel's header/content separation is implicit (correct for Panel)
   - Abstracting as Card sections would add unnecessary complexity

---

## Decision Rule for Future Panels

**When creating or refactoring overlay panel components:**

1. ✅ **DO:**
   - Use Panel semantics (overlay orchestrator)
   - Handle Portal, Backdrop, Focus, Keyboard, Gestures at Panel level
   - Delegate content rendering to specialized components
   - Use Surface wrapper for elevation and radius
   - Keep header/content separation implicit (not abstracted as Card sections)

2. ❌ **DON'T:**
   - Convert Panel to Card or CardBase
   - Introduce Card semantics (header/body/footer abstraction)
   - Mix Panel and Card responsibilities
   - Use Card components for overlay orchestration

**Example Pattern:**
```typescript
// ✅ Correct: Panel as overlay orchestrator
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

// ❌ Incorrect: Panel as Card
<Card>
  <CardHeader>Header</CardHeader>
  <CardBody>Content</CardBody>
</Card>
```

---

## Examples

### NotificationCenter.Panel

**Location:** `src/DOMAIN/notifications/notifications/NotificationCenter.Panel.tsx`

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

---

## Consequences

### Positive

1. **Clear Semantic Boundaries:**
   - Panel and Card have distinct, well-defined responsibilities
   - No confusion about when to use Panel vs Card

2. **Architectural Consistency:**
   - Overlay panels follow consistent pattern
   - Content cards follow consistent pattern
   - No mixing of semantics

3. **Maintainability:**
   - Clear separation of concerns
   - Easier to understand and maintain
   - Prevents architectural drift

### Negative

1. **Potential Duplication:**
   - Panel and Card may have similar visual styling (Surface wrapper)
   - This is acceptable as they serve different purposes

2. **Learning Curve:**
   - Developers must understand Panel vs Card distinction
   - This is mitigated by clear documentation and examples

---

## References

- **Baseline Report:** `docs/reports/audit/NotificationCenter.Panel_BASELINE_REPORT.md`
- **Component:** `src/DOMAIN/notifications/notifications/NotificationCenter.Panel.tsx`
- **Card Component:** `src/COMPOSITION/layout/Card/Card.tsx`
- **Surface Component:** `src/COMPOSITION/layout/Surface/Surface.tsx`

---

## Status

✅ **DECIDED** - This decision is canonical and binding. All overlay panel components must follow Panel semantics, not Card semantics.

**Last Updated:** 2025-12-19

