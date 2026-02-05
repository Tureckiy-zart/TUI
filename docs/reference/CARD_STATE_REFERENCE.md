# Card State Reference

**Date:** 2026-02-03  
**Status:** ✅ Active  
**Type:** Reference (Usage Pattern)  
**Scope:** Card-level empty/error UI states  

---

## Purpose

`CardState` is a **usage pattern**, not a component. It defines the canonical way to render
empty/error UI inside cards and widgets **without** inline height/minHeight, magic numbers,
or new public APIs.

This pattern is the **card-level analog** of the section-level `SectionState` (internal layout component).

---

## Rules

- ✅ **No new component** (usage pattern only)
- ✅ **No public API changes**
- ✅ **No inline `style` height/minHeight**
- ✅ **No Tailwind height utilities** (`h-*`, `min-h-*`, `max-h-*`)
- ✅ **No magic numbers** (`px`, `rem`, `vh`)
- ✅ **Use existing primitives only** (`Card`, `Flex`, `Text`)

---

## Composition

**Required structure:**

1. `Card`
2. `Flex` (centered: `align="center"`, `justify="center"`)
3. `Text` with semantic role:
   - `empty` → `typographyRole="meta"`, `color="muted"`
   - `error` → `typographyRole="status"`, `color="error"`

---

## Variants

### Empty
- Use muted/meta typography role and color.

### Error
- Use status typography role and error color.

---

## Examples

### Empty Card State

```tsx
import { Card, CardBody } from "@/COMPOSITION/layout/Card";
import { Flex } from "@/COMPOSITION/layout/Flex";
import { Text } from "@/PRIMITIVES/Text";

<Card>
  <CardBody>
    <Flex direction="column" align="center" justify="center" gap="sm" py="lg">
      <Text as="p" size="md" typographyRole="meta" color="muted">
        No items yet
      </Text>
    </Flex>
  </CardBody>
</Card>;
```

### Error Card State

```tsx
import { Card, CardBody } from "@/COMPOSITION/layout/Card";
import { Flex } from "@/COMPOSITION/layout/Flex";
import { Text } from "@/PRIMITIVES/Text";

<Card>
  <CardBody>
    <Flex direction="column" align="center" justify="center" gap="sm" py="lg">
      <Text as="p" size="md" typographyRole="status" color="error">
        Failed to load data
      </Text>
    </Flex>
  </CardBody>
</Card>;
```

---

## Relationship to SectionState

- **SectionState** is the section-level, internal layout component for empty/error UI.
- **CardState** is a **reference-only** card-level usage pattern (no component, no exports).

Use `SectionState` for section-level states, and **CardState** for card/widget-level states.

---

## Height Ownership

CardState does not manage height.  
The card defines the available space.  
Any attempt to set `minHeight` is a pattern violation.
