# Error / Empty State Reference

**Status:** ACTIVE  
**Classification:** Reference Documentation  
**Purpose:** Canonical reference for Error / Empty State ownership across Page, Section, and Card levels.  

---

## Intent

Define a single, system-wide Error / Empty State pattern that:
- assigns **semantic ownership** (Page / Section / Card)
- prevents layout improvisation
- forbids inline height and magic numbers

---

## Core Principles

1. **Error / Empty State is a UI-state, not a layout task.**
2. **Height is never set directly** for state containers (no `height`, `minHeight`, `rem`, `px`, `vh`).
3. **Each state has a semantic owner**:
   - Page-level → Page owner
   - Section-level → Section owner (`SectionState`)
   - Card-level → Card owner (`CardState` pattern)
4. **Centering is allowed only inside the state owner** (not outside as layout hacks).

**Core Rule:** **`minHeight` / `height` is NOT used for empty/error state.**  
Height is inherited from layout context (Section / Card / Page).

---

## UI-State Ownership Model

| Level | Owner | Canonical Surface |
|-------|-------|-------------------|
| Page | Page | Page-level composition (no new component) |
| Section | Section | `SectionState` (INTERNAL) |
| Card | Card/Widget | `CardState` (usage pattern) |

---

## Page-level State

Use page-level composition (e.g., `ContentShell`, `PageHeader`, `Section`) and place state content
inside the page owner. Do not invent layout-only wrappers or fixed heights.

---

## Section-level State

**Owner:** `SectionState` (INTERNAL)

Use `SectionState` for empty/error UI at section level. It provides semantic centering and spacing
without direct height or layout overrides.

Reference: `src/COMPOSITION/layout/SectionState/SectionState.tsx`

### Section-level Example

```tsx
<Section>
  <Stack gap="md">
    {isLoading && <Skeleton />}
    {isEmpty && <SectionState variant="empty">No data</SectionState>}
  </Stack>
</Section>
```

**Note:** SectionState does not set height.  
It centers content within the existing Section layout context.

---

## Card-level State

**Owner:** `CardState` (usage pattern)

Use the CardState pattern (no component). Composition must be:

- `Card`
- `Flex` (centered: `align="center"`, `justify="center"`)
- `Text` with semantic role (`meta/muted` for empty, `status/error` for error)

Reference: [CARD_STATE_REFERENCE.md](./CARD_STATE_REFERENCE.md)

---

## Canonical Structures

### Section

```tsx
<SectionState variant="empty">No data in this section</SectionState>
```

### Card (Empty)

```tsx
<Card>
  <CardBody>
    <Flex direction="column" align="center" justify="center" gap="sm" py="lg">
      <Text as="p" size="md" typographyRole="meta" color="muted">
        No items yet
      </Text>
    </Flex>
  </CardBody>
</Card>
```

### Card (Error)

```tsx
<Card>
  <CardBody>
    <Flex direction="column" align="center" justify="center" gap="sm" py="lg">
      <Text as="p" size="md" typographyRole="status" color="error">
        Failed to load data
      </Text>
    </Flex>
  </CardBody>
</Card>
```

---

## Forbidden Patterns

- Inline `style` with `height`/`minHeight`
- Raw size values (`px`, `rem`, `vh`)
- Tailwind height utilities (`h-*`, `min-h-*`, `max-h-*`)
- Layout-only wrappers that replace ownership (e.g., wrapper divs to force height)

```tsx
// ❌ forbidden
<Box minH="300px" />
<Box style={{ minHeight: "40vh" }} />
```

---

## Why minHeight exists elsewhere but not here

`minHeight` can be valid **only** inside layout-owner components where geometry is part of the component's responsibility.
Examples include `Card`, `Carousel`, or `HeroMedia`, which define their own layout constraints internally.

Error / Empty State is **not** a layout container. It is a UI-state surface owned by a layout container:
- `SectionState` (section-level) does not define height.
- `CardState` (card-level pattern) does not define height.

Any attempt to transfer `minHeight` into an Error/Empty state is a **pattern violation**.

**Domain tokens (e.g. `spacing.card.minHeight`) are internal and not public API.**  
They must not be used as justification for setting height in state UIs.

**Examples**

- ✅ Allowed: `minHeight` used internally by a layout-owner component (Card/Carousel/HeroMedia implementation).
- ❌ Forbidden: `minHeight` used in Empty/Error state via `Box`, `Flex`, or inline styles.

---

## Relation to Existing Components

- **SectionState**: section-level owner (INTERNAL)
- **CardState**: card-level usage pattern (REFERENCE)
- **Page**: page-level owner through composition (no new component)
