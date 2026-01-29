# Foundation Usage Guide

**Status:** ACTIVE  
**Classification:** Reference Documentation  
**Purpose:** How to use Foundation components in consumer code without bypasses.  
**Source of Truth:** [FOUNDATION_LOCK.md](../architecture/FOUNDATION_LOCK.md), [FOUNDATION_CONTRACT.md](../architecture/FOUNDATION_CONTRACT.md), [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](../architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md)

---

## Purpose

This guide explains **how to use** Foundation components (Button, Text, Input, Label, etc.) in consumer code. It does not define architecture; it applies the rules from the Foundation Contract and Enforcement Guards. For the definition of what a Foundation component is and when the Foundation pipeline applies, see [FOUNDATION_REFERENCE.md](./FOUNDATION_REFERENCE.md).

---

## Public API Only

**Rule:** Consumer code must use the **public API** only.

- **Import from the public entrypoint:** `@tenerife.music/ui` or the package’s main export (e.g. `@/index` in repo). Do not import from internal paths such as `@/PRIMITIVES/Button` or `@/FOUNDATION/...`.
- **Use only exported components and types:** Button, Text, Input, Box, Stack, etc., and their prop types. Do not rely on internal utilities or token resolution helpers from the public API for styling.

**Source:** [FOUNDATION_CONTRACT.md](../architecture/FOUNDATION_CONTRACT.md) (Public API, Public Index Boundary).

---

## No className or style on Foundation Components

**Rule:** Foundation components **do not accept** `className` or `style` props. Their TypeScript types explicitly omit these props. Passing them is a contract violation and is enforced by ESLint in consumer code.

- **Do not:** `<Button className="mt-4">`, `<Text style={{ color: 'red' }}>`, or any prop spread that could pass `className`/`style` into a Foundation component.
- **Do:** Control appearance via component props (e.g. `variant`, `size`, `weight`, `tone`, `typographyRole`, `color`) and use layout components for spacing and position.

**Source:** [FOUNDATION_CONTRACT.md](../architecture/FOUNDATION_CONTRACT.md), [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](../architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md) (no-classname-on-foundation, no-style-on-foundation).

---

## Use Box or Stack for Spacing and Layout

**Rule:** Spacing and layout around Foundation components are done with **layout components** (Box, Stack, Row, Section, Grid), not with `className` or `style` on Foundation components.

- **Do not:** Wrap a Button in a div with `className="mb-4"` and then pass that div’s layout to the Button. Prefer Stack/Box with token-driven props.
- **Do:** Use Stack (vertical) or Row (horizontal) with `gap` (spacing tokens), and Box with `padding`/`margin` (spacing tokens) when you need offsets.

**Example (vertical group with spacing):**

```tsx
import { Button, Text, Stack } from "@tenerife.music/ui";

<Stack gap="md" align="start">
  <Text size="lg">Title</Text>
  <Button variant="primary" size="md">Submit</Button>
</Stack>
```

**Example (margin-like spacing via Box):**

```tsx
import { Button, Box } from "@tenerife.music/ui";

<Box mb="lg">
  <Button variant="secondary">Cancel</Button>
</Box>
```

**Source:** [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](../architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md) (no-utility-classes-near-foundation; use Foundation layout components).

---

## Use Component Props Instead of Utilities

**Rule:** Visual and semantic properties of Foundation components are expressed via **component props** (token-driven unions), not via Tailwind or raw CSS.

- **Button:** Use `variant`, `size` (and other documented props). Do not try to change appearance via wrapper classes or style overrides.
- **Text:** Use `size`, `weight`, `typographyRole`, `color` (and other documented props). Do not use `className` for font size or color.
- **Input / Label / other controls:** Use the documented props for appearance and behavior.

**Example (button):**

```tsx
<Button variant="primary" size="md" disabled={isSubmitting}>
  Save
</Button>
```

**Example (text hierarchy):**

```tsx
<Text size="lg" weight="semibold">Section title</Text>
<Text size="sm" typographyRole="body" color="secondary">Description</Text>
```

**Source:** [FOUNDATION_CONTRACT.md](../architecture/FOUNDATION_CONTRACT.md) (token-driven props, visual closure).

---

## No Prop Spread That Bypasses the Contract

**Rule:** Do not spread props onto a Foundation component in a way that could pass `className`, `style`, or other forbidden props. ESLint rule `no-prop-spread-into-foundation` forbids spreading onto Foundation components when the spread could contain such props.

- **Do not:** `<Button {...otherProps} />` when `otherProps` might include `className` or `style`.
- **Do:** Pass only known, allowed props. If you need to forward specific attributes (e.g. `aria-*`, `data-*`), pass them explicitly.

**Source:** [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](../architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md) (no-prop-spread-into-foundation).

---

## Summary

| Do | Do not |
|----|--------|
| Import from public API (`@tenerife.music/ui` or package entry) | Deep imports (`@/PRIMITIVES/...`, `@/FOUNDATION/...`) |
| Use Box, Stack, Row, Section for spacing/layout | `className` or `style` on Button, Text, Input, etc. |
| Use component props (variant, size, weight, tone, etc.) | Tailwind/utility classes for Foundation appearance |
| Pass only allowed props explicitly | Prop spread that could pass className/style |

**Authority:** [FOUNDATION_LOCK.md](../architecture/FOUNDATION_LOCK.md), [FOUNDATION_CONTRACT.md](../architecture/FOUNDATION_CONTRACT.md), [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](../architecture/closed-system/CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md).
