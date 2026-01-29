# Layout Usage Guide

**Status:** ACTIVE  
**Classification:** Reference Documentation  
**Purpose:** How to choose and use Grid, Section, Stack, Row (and wrap) instead of raw flex/grid or utility classes.  
**Source of Truth:** [CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md](../architecture/closed-system/CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md), [LAYOUT_AUTHORITY.md](../architecture/LAYOUT_AUTHORITY.md)

---

## Purpose

This guide maps **layout intent to component and props**. It does not define new rules; it applies the Layout Capability Map and Layout Authority. Use layout components (Grid, Section, Stack, Row, Box, Surface) with token-based props instead of Tailwind layout utilities (`flex`, `grid`, `items-center`, `justify-between`, etc.).

---

## When to Use Which Component

| Intent | Component | Key props |
|--------|-----------|-----------|
| Vertical stack with gap | Stack | `gap` (spacing token), `align`, `justify` |
| Horizontal row with gap | Row | `spacing`, `align`, `justify` |
| Horizontal row that wraps | Row | `spacing`, `wrap`, `align`, `justify` |
| Content blocks (header/body/footer) with spacing | Section | `spacing`, `spaceY` |
| Responsive grid (columns) | Grid | `cols`, `gap`, `align`, `justify`, `flow` |
| Visual container (card, overlay surface) | Surface | `variant`, `p`, `radius` |
| Centered empty state | Stack | `align="center"`, `justify="center"`, `gap` |

**Source:** [CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md](../architecture/closed-system/CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md).

---

## Section — Content Block Spacing

**Use when:** You have header, body, and/or footer slots and need consistent spacing between them. Do not use `mb-lg`, `mt-lg`, or other margin utilities between slots.

**Canonical pattern:** Section with `spacing` (and optionally `spaceY`) for block spacing.

```tsx
import { Section, Text, Button } from "@tenerife.music/ui";

<Section spacing="lg" spaceY="md">
  <Section.Header>
    <Text size="lg">Title</Text>
  </Section.Header>
  <Section.Body>
    Content here.
  </Section.Body>
  <Section.Footer>
    <Button variant="primary">Submit</Button>
  </Section.Footer>
</Section>
```

**Token mapping:** Utility spacing like `mb-lg` / `mt-lg` → Section `spacing="lg"` (or `md`, `xl`, etc. from the spacing scale).

**Source:** Layout Capability Map (H5-001), Section Component Spacing API Verification.

---

## Row — Horizontal Layout and Header Bars

**Use when:** You need a horizontal row (e.g. header with title and actions, toolbar, inline metadata). Do not use `flex items-center justify-between` or similar utility classes.

**Canonical pattern:** Row with `spacing`, `align`, `justify`.

```tsx
import { Row, Text, Button } from "@tenerife.music/ui";

<Row spacing="md" align="center" justify="between">
  <Text size="md" weight="semibold">Notifications</Text>
  <Button variant="ghost" size="sm">Clear all</Button>
</Row>
```

**With wrap:** When items should wrap on small screens (e.g. action buttons), use Row with `wrap`.

```tsx
<Row spacing="md" wrap justify="center">
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
</Row>
```

**Source:** Layout Capability Map (H5-004, H5-006, H5-007, H5-009, H5-010), Row Component API.

---

## Stack — Vertical Layout and Empty States

**Use when:** You need vertical stacking with a gap, or a centered empty state. Do not use `flex flex-col gap-*` or `flex items-center justify-center` for layout.

**Canonical pattern:** Stack with `gap`, and optionally `align` / `justify` for alignment.

```tsx
import { Stack, Text, Button } from "@tenerife.music/ui";

<Stack gap="md" align="start">
  <Text size="lg">Section title</Text>
  <Text size="sm">Description.</Text>
  <Button variant="primary">Action</Button>
</Stack>
```

**Empty state (centered):**

```tsx
<Stack gap="lg" align="center" justify="center">
  <Text size="md" tone="muted">No items yet.</Text>
  <Button variant="secondary">Add item</Button>
</Stack>
```

**Source:** Layout Capability Map (H5-005, H5-007), Stack Component API.

---

## Grid — Responsive Columns

**Use when:** You need a responsive grid (e.g. 1 column on mobile, 2–3 on desktop). Do not use `grid grid-cols-1 md:grid-cols-2 gap-lg` or similar utility classes.

**Canonical pattern:** Grid with `cols` (responsive) and `gap`.

```tsx
import { Grid, Card } from "@tenerife.music/ui";

<Grid cols={{ base: 1, md: 2, lg: 3 }} gap="lg">
  {items.map((item) => (
    <Card key={item.id}>...</Card>
  ))}
</Grid>
```

**With alignment:**

```tsx
<Grid cols={2} gap="lg" align="center">
  ...
</Grid>
```

**Source:** Layout Capability Map (H5-008, H5-009, H5-010), Grid Component API Verification.

---

## Surface — Visual Boundary Container

**Use when:** You need a visual container (e.g. card surface, overlay panel) with padding and optional radius. Overlay positioning (e.g. absolute/fixed) is acceptable where overlay semantics are intended; use Surface for the visual boundary, not raw divs with utility classes.

**Canonical pattern:** Surface with `variant`, and optionally `p`, `radius`.

```tsx
import { Surface, Text } from "@tenerife.music/ui";

<Surface variant="elevated" p="lg" radius="md">
  <Text size="md">Panel content</Text>
</Surface>
```

**Source:** Layout Capability Map (H5-002, Surface Component API Verification).

---

## Summary

| Do | Do not |
|----|--------|
| Section with `spacing` / `spaceY` for block spacing | `mb-*`, `mt-*` between header/body/footer |
| Row with `spacing`, `align`, `justify`, `wrap` for horizontal layout | `flex items-center justify-between`, `flex flex-wrap` |
| Stack with `gap`, `align`, `justify` for vertical layout and empty states | `flex flex-col gap-*`, `flex items-center justify-center` |
| Grid with `cols`, `gap` for responsive grids | `grid grid-cols-* gap-*` utility classes |
| Surface for visual containers | Raw div + padding/radius utility classes |

**Authority:** [LAYOUT_AUTHORITY.md](../architecture/LAYOUT_AUTHORITY.md). **Canonical capability mapping:** [CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md](../architecture/closed-system/CLOSED_SYSTEM_V2_LAYOUT_CAPABILITY_MAP.md).
