# Token Usage Guide

**Status:** ACTIVE  
**Classification:** Reference Documentation  
**Purpose:** How to choose and use tokens without raw Tailwind utilities.  
**Source of Truth:** [TOKEN_REALITY_AUDIT_027.md](../reports/tokens/TOKEN_REALITY_AUDIT_027.md), [TOKEN_AUTHORITY.md](../architecture/TOKEN_AUTHORITY.md), [TOKENS_OVERVIEW.md](./TOKENS_OVERVIEW.md), [TOKENS_EXPORT_REFERENCE.md](./TOKENS_EXPORT_REFERENCE.md)

---

## Purpose

This guide explains **how to use** the token system in consumer and component code. It does not define new rules; it applies the Token Authority and the findings of the Token Reality Audit. Use token-driven props and component APIs instead of raw Tailwind classes for spacing, color, typography, radius, and layout.

---

## Rule: Token Props and Component APIs, Not Raw Utilities

**Rule:** Visual and layout intent is expressed through **token-driven component props** (e.g. `gap="md"`, `size="sm"`, `variant="primary"`) or through **token constants** where the architecture allows. Do not use raw Tailwind utility classes for spacing, color, typography, or radius when a sanctioned path exists.

**Source:** [TOKEN_AUTHORITY.md](../architecture/TOKEN_AUTHORITY.md), [CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md](../architecture/closed-system/CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md) (bypass prevention).

---

## Where Tokens Live

- **Foundation tokens:** Spacing, typography, colors, radius, shadows, motion, opacity. Defined in `src/FOUNDATION/tokens/` (or equivalent). Used by components and, where allowed, by consumer code that needs token values.
- **Component tokens:** Component-specific mappings (e.g. BUTTON_TOKENS, TEXT_TOKENS, INPUT_TOKENS). Used inside components; consumer code uses **component props** that resolve to these tokens, not the token objects directly for styling Foundation components.
- **Exports and types:** Token families and types are exported from the public API where applicable. For export layout and design-tool formats, see [TOKENS_EXPORT_REFERENCE.md](./TOKENS_EXPORT_REFERENCE.md).

**Source:** [TOKEN_AUTHORITY.md](../architecture/TOKEN_AUTHORITY.md) (Token Domain Hierarchy), [TOKENS_OVERVIEW.md](./TOKENS_OVERVIEW.md).

---

## Typical Usage Gaps (Avoid These)

The Token Reality Audit identified **usage gaps**: components or consumer code not using existing tokens. The most common pattern is **raw Tailwind classes instead of tokens or component props**.

| Anti-pattern | Use instead |
| -------------- | ------------- |
| `text-sm font-semibold` for text styling | Text component with `size="sm"` and `weight="semibold"` (or equivalent token-driven props) |
| `w-full max-w-full` for layout | Box or layout component with token-based width/constraint props, or Grid/Stack/Row as appropriate |
| `space-y-xs` for vertical gap | Stack component with `gap="xs"` (spacing token) |
| `mb-lg`, `mt-lg` for block spacing | Section component with `spacing="lg"` |
| Raw color classes (e.g. `text-gray-500`) | Component props that use semantic/color tokens (e.g. Text `color="secondary"`) or theme tokens |
| Raw radius/padding classes | Component props that use radius/spacing tokens (e.g. Surface `radius="md"`, `p="lg"`) |

**Source:** [TOKEN_REALITY_AUDIT_027.md](../reports/tokens/TOKEN_REALITY_AUDIT_027.md) (Gap Analysis Summary, Most Common Gap Pattern, High-Risk Areas).

---

## Spacing

**Use:** Layout components with **spacing props** (Stack `gap`, Row `spacing`, Section `spacing`/`spaceY`, Grid `gap`, Box `padding`/`margin`). Values are spacing tokens (e.g. `xs`, `sm`, `md`, `lg`, `xl`, `2xl`).

**Do not:** Raw Tailwind spacing classes (`p-4`, `mb-lg`, `space-y-2`, `gap-4`) when a layout component with token props is the sanctioned path.

**Example:** See [LAYOUT_USAGE_GUIDE.md](./LAYOUT_USAGE_GUIDE.md) and [FOUNDATION_USAGE_GUIDE.md](./FOUNDATION_USAGE_GUIDE.md).

**Source:** [TOKEN_AUTHORITY.md](../architecture/TOKEN_AUTHORITY.md), [TOKENS_OVERVIEW.md](./TOKENS_OVERVIEW.md) (Spacing Tokens).

---

## Typography

**Use:** Text component with **typography props** (`size`, `weight`, `typographyRole`, `color`). Values map to the typography token scale.

**Do not:** Raw typography classes (`text-sm`, `font-semibold`, `text-gray-500`) for content that the Text component is intended to render. Do not use Text size/tone for presentational (metadata/layout) styling; see [TYPOGRAPHY_USAGE_GUIDE.md](./TYPOGRAPHY_USAGE_GUIDE.md).

**Source:** [TYPOGRAPHY_AUTHORITY.md](../architecture/TYPOGRAPHY_AUTHORITY.md), [TOKENS_OVERVIEW.md](./TOKENS_OVERVIEW.md) (Typography Tokens).

---

## Color

**Use:** Component props that accept **semantic or color tokens** (e.g. Button `variant`, Text `color`, Surface `variant`). Theme-aware tokens (primary, secondary, accent, etc.) are used via component APIs, not raw color classes.

**Do not:** Raw color utility classes for foreground/background when a component prop exists. Do not bypass the theme system with hardcoded color values.

**Source:** [TOKEN_AUTHORITY.md](../architecture/TOKEN_AUTHORITY.md), [TOKENS_OVERVIEW.md](./TOKENS_OVERVIEW.md).

---

## Radius and Elevation

**Use:** Component props that accept **radius tokens** (e.g. Surface `radius`, Button uses component tokens). Elevation/shadows via component APIs or elevation tokens where defined.

**Do not:** Raw radius or shadow classes when the component exposes token-driven props.

**Source:** [TOKEN_AUTHORITY.md](../architecture/TOKEN_AUTHORITY.md), [RADIUS_AUTHORITY.md](../architecture/RADIUS_AUTHORITY.md), [ELEVATION_AUTHORITY.md](../architecture/ELEVATION_AUTHORITY.md).

---

## Summary

| Do | Do not |
| --- | -------- |
| Use Stack/Row/Section/Grid/Box with spacing props (`gap`, `spacing`, `spaceY`, `p`, `mb`) | Raw spacing utilities (`space-y-*`, `mb-*`, `p-*`) when layout components are the sanctioned path |
| Use Text with `size`, `weight`, `typographyRole`, `color` | Raw typography classes (`text-sm`, `font-semibold`) for content |
| Use component props for color (variant, color) | Raw color classes for foreground/background |
| Use component props for radius and elevation | Raw radius/shadow classes when component APIs exist |
| Import tokens from sanctioned exports when you need token values | Introduce raw values or new token scales without authority |

**Authority:** [TOKEN_AUTHORITY.md](../architecture/TOKEN_AUTHORITY.md). **Usage and gaps:** [TOKEN_REALITY_AUDIT_027.md](../reports/tokens/TOKEN_REALITY_AUDIT_027.md). **Token map:** [TOKENS_OVERVIEW.md](./TOKENS_OVERVIEW.md).
