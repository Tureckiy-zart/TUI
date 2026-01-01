# Card Component

**Location:** `src/COMPOSITION/layout/Card/Card.tsx`  
**Type:** Composition / Layout  
**Status:** ✅ ACTIVE

---

## Purpose

Card is a **content container** component with explicit semantic sections (Header, Body, Footer). Card provides structured content organization and presentation using token-driven styling.

**Card IS:**

- A content container with explicit semantic sections
- A structured content layout component
- A token-driven styling component

**Card IS NOT:**

- An overlay orchestrator (see [Non-applicable Use Cases](#non-applicable-use-cases))
- A layout composition primitive (use Stack, Flex, or Grid)
- An interactive component (Card is a container, not a control)

---

## Non-applicable Use Cases

### ❌ Overlay Panels

**Card and CardBase MUST NOT be used for overlay orchestration.**

**Reason:** Overlay Panel components are fundamentally different from Card components:

- **Panel Responsibilities:** Portal rendering, Backdrop handling, Focus lock management, Keyboard handling (ESC to close), Gesture handling (swipe), Body scroll prevention, Return focus management
- **Card Responsibilities:** Content organization, Content display, Structured content layout

**Architectural Decision:** This is a **canonical architectural rule** established by [ADR_overlay_panel_not_card.md](../../../../docs/architecture/decisions/ADR_overlay_panel_not_card.md).

**Example of FORBIDDEN Pattern:**

```typescript
// ❌ INCORRECT: Using Card for overlay orchestration
<Card>
  <CardHeader>Panel Header</CardHeader>
  <CardBody>Panel Content</CardBody>
</Card>
```

**Example of CORRECT Pattern:**

```typescript
// ✅ CORRECT: Using Panel semantics for overlay orchestration
<Portal>
  <Backdrop onClick={onClose} />
  <div className="fixed right-0 top-0 z-50">
    <Surface variant="elevated">
      {/* Header (implicit section) */}
      <div>Panel Header</div>
      {/* Content (implicit section) */}
      <div className="flex-1 overflow-y-auto">
        <SpecializedContentComponent />
      </div>
    </Surface>
  </div>
</Portal>
```

**Reference:** See [ADR_overlay_panel_not_card.md](../../../../docs/architecture/decisions/ADR_overlay_panel_not_card.md) for complete architectural decision and rationale.

---

## API

### Card Component

```typescript
<Card variant="default" radius="md" shadow="sm">
  <CardHeader>Header Content</CardHeader>
  <CardBody>Body Content</CardBody>
  <CardFooter>Footer Content</CardFooter>
</Card>
```

### Card Subcomponents

- **CardHeader** - Header section with semantic structure
- **CardBody** - Body section with semantic structure
- **CardFooter** - Footer section with semantic structure

---

## Usage Examples

### Basic Card

```typescript
<Card>
  <CardHeader>
    <Heading level={3}>Card Title</Heading>
  </CardHeader>
  <CardBody>
    <Text>Card content goes here.</Text>
  </CardBody>
</Card>
```

### Card with Footer

```typescript
<Card>
  <CardHeader>
    <Heading level={3}>Card Title</Heading>
  </CardHeader>
  <CardBody>
    <Text>Card content goes here.</Text>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

## Token System

Card uses `CARD_TOKENS` for styling:

- Variant tokens (default, elevated, outlined, filled, subtle)
- Radius tokens (sm, md, lg, xl, 2xl, 3xl, full)
- Shadow tokens (none, xs, sm, md, lg, xl, 2xl)
- Padding tokens (sm, md, lg, xl)

---

## Related Components

- **Surface** - Variant-driven surface elevation container (used internally by Card)
- **Box** - Low-level layout primitive (used internally by Card)
- **Stack** - Layout composition primitive (use for card layouts)

---

## References

- **Architectural Decision:** [ADR_overlay_panel_not_card.md](../../../../docs/architecture/decisions/ADR_overlay_panel_not_card.md) - Overlay Panel ≠ Card/CardBase
- **Component Implementation:** `src/COMPOSITION/layout/Card/Card.tsx`
- **Token System:** `src/FOUNDATION/tokens/components/card.ts`
