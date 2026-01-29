# Closed System v2 — Canonical Fix Patterns

**Project:** @tenerife.music/ui  
**Version:** 1.0  
**Date Created:** 2026-01-27  
**Last Updated:** 2026-01-27  
**Status:** ✅ **CANONICAL**  
**Task ID:** TUI_CSV2_PHASE_J1_CONTINUOUS_ENFORCEMENT_021  
**Phase:** J.1 — Continuous Enforcement & Drift Prevention

---

## Purpose

This document defines the **canonical fix patterns** for resolving Closed System v2 violations. It serves as the single source of truth for how violations must be fixed, ensuring consistency and preventing architectural drift.

**This document is canonical. All violation fixes MUST use these patterns. No alternative fix methods are allowed.**

---

## Scope

**Applies to:**
- ✅ All consumer code violations (V1, V2, V3, V4, V5)
- ✅ AI agents fixing violations
- ✅ Developers fixing violations
- ✅ Code review guidance

**Reference:** For violation definitions, see [CLOSED_SYSTEM_V2_CANONICAL_PROBLEM_DEFINITION.md](./CLOSED_SYSTEM_V2_CANONICAL_PROBLEM_DEFINITION.md)

**Reference:** For enforcement mechanisms, see [CLOSED_SYSTEM_V2_CONTINUOUS_ENFORCEMENT.md](./CLOSED_SYSTEM_V2_CONTINUOUS_ENFORCEMENT.md)

---

## Pattern Registry

### Pattern 1: Wrapper First Pattern

**Definition:** Use Foundation layout components (`Box`, `Stack`, `Row`, `Grid`, `Container`, `Section`, `Inline`) as wrappers instead of raw HTML elements (`div`, `section`, `span`).

**When to Use:**
- Replacing raw HTML wrappers (`div`, `section`, `span`)
- Creating layout containers
- Wrapping Foundation components for spacing/layout
- V3 violations (utility classes on wrappers)
- V4 violations (raw HTML instead of Foundation)

**Foundation Layout Components:**
- `Box` — Generic container with token-based props
- `Stack` — Vertical flex layout with gap
- `Row` — Horizontal flex layout with gap
- `Grid` — CSS Grid layout with token-based props
- `Container` — Responsive container with padding
- `Section` — Semantic section wrapper
- `Inline` — Inline flex layout

**Example — Violation:**
```tsx
// ❌ FORBIDDEN: Raw HTML wrapper with utility classes
<div className="p-4 bg-red-500">
  <Button>Click</Button>
</div>
```

**Example — Fixed (Wrapper First):**
```tsx
// ✅ CORRECT: Foundation layout component
import { Stack, Button } from "@tenerife.music/ui";

<Stack padding="lg" background="surface">
  <Button>Click</Button>
</Stack>
```

**Example — Violation (Raw HTML):**
```tsx
// ❌ FORBIDDEN: Raw HTML instead of Foundation
<section className="container mx-auto">
  <h1>Title</h1>
</section>
```

**Example — Fixed (Wrapper First):**
```tsx
// ✅ CORRECT: Foundation Section component
import { Section, Container, Heading } from "@tenerife.music/ui";

<Section>
  <Container>
    <Heading>Title</Heading>
  </Container>
</Section>
```

---

### Pattern 2: Token Props Pattern

**Definition:** Use token-based props (spacing, padding, gap, etc.) instead of utility classes or raw values.

**When to Use:**
- Replacing utility classes with token props
- Applying spacing, padding, gap, margin
- Applying colors, backgrounds, borders
- V1 violations (className with utility classes)
- V3 violations (utility classes near Foundation)

**Token Prop Examples:**
- `padding="lg"` instead of `className="p-4"`
- `gap="md"` instead of `className="gap-4"`
- `spacing="sm"` instead of `className="space-y-2"`
- `background="surface"` instead of `className="bg-white"`
- `borderRadius="md"` instead of `className="rounded-md"`

**Example — Violation:**
```tsx
// ❌ FORBIDDEN: Utility classes on Foundation component
<Button className="p-4 m-2">Click</Button>
```

**Example — Fixed (Token Props):**
```tsx
// ✅ CORRECT: Use Foundation component props
<Button variant="primary" size="lg">Click</Button>

// If spacing needed, use wrapper
<Stack gap="md" padding="sm">
  <Button>Click</Button>
</Stack>
```

**Example — Violation (Utility Classes):**
```tsx
// ❌ FORBIDDEN: Utility classes on wrapper
<div className="flex gap-4 p-4">
  <Button>Click</Button>
</div>
```

**Example — Fixed (Token Props + Wrapper First):**
```tsx
// ✅ CORRECT: Foundation component with token props
import { Row, Button } from "@tenerife.music/ui";

<Row gap="md" padding="lg">
  <Button>Click</Button>
</Row>
```

---

## Violation-to-Pattern Mapping

### V1: className on Foundation Components

**Violation:** Passing `className` prop to Foundation components.

**Allowed Fix Patterns:**
1. **Token Props Pattern** — Use component props for styling
2. **Wrapper First Pattern** — Wrap with Foundation layout component if spacing/layout needed

**Forbidden Alternatives:**
- ❌ Using `style` prop instead of `className`
- ❌ Creating wrapper components that accept className
- ❌ Using CSS modules or styled-components
- ❌ Any method that bypasses token system

**Example — Violation:**
```tsx
// ❌ FORBIDDEN
<Button className="custom-style">Click</Button>
```

**Example — Fixed (Token Props):**
```tsx
// ✅ CORRECT: Use component props
<Button variant="primary" size="lg">Click</Button>
```

**Example — Fixed (Wrapper First, if spacing needed):**
```tsx
// ✅ CORRECT: Wrap with Foundation component
<Stack gap="md">
  <Button>Click</Button>
</Stack>
```

---

### V2: style on Foundation Components

**Violation:** Passing `style` prop (inline styles) to Foundation components.

**Allowed Fix Patterns:**
1. **Token Props Pattern** — Use component props for styling
2. **Wrapper First Pattern** — Wrap with Foundation layout component if spacing/layout needed

**Forbidden Alternatives:**
- ❌ Using `className` prop instead of `style`
- ❌ Creating wrapper components that accept style
- ❌ Using CSS-in-JS libraries
- ❌ Any method that bypasses token system

**Example — Violation:**
```tsx
// ❌ FORBIDDEN
<Button style={{ color: "red", padding: "16px" }}>Click</Button>
```

**Example — Fixed (Token Props):**
```tsx
// ✅ CORRECT: Use component props
<Button variant="destructive" size="lg">Click</Button>
```

**Example — Fixed (Wrapper First, if spacing needed):**
```tsx
// ✅ CORRECT: Wrap with Foundation component
<Stack padding="lg">
  <Button variant="destructive">Click</Button>
</Stack>
```

---

### V3: Utility Classes Near Foundation Components

**Violation:** Using Tailwind utility classes on wrappers around Foundation components.

**Allowed Fix Patterns:**
1. **Wrapper First Pattern** — Replace raw HTML wrapper with Foundation layout component
2. **Token Props Pattern** — Use token-based props instead of utility classes

**Forbidden Alternatives:**
- ❌ Moving utility classes to different wrapper
- ❌ Using CSS modules or styled-components
- ❌ Creating custom wrapper components with utility classes
- ❌ Any method that creates parallel styling channels

**Example — Violation:**
```tsx
// ❌ FORBIDDEN: Utility classes on wrapper
<div className="p-4 bg-red-500 gap-4">
  <Button>Click</Button>
</div>
```

**Example — Fixed (Wrapper First + Token Props):**
```tsx
// ✅ CORRECT: Foundation layout component with token props
import { Stack, Button } from "@tenerife.music/ui";

<Stack padding="lg" background="surface" gap="md">
  <Button>Click</Button>
</Stack>
```

---

### V4: Raw HTML Instead of Foundation Components

**Violation:** Using raw HTML tags where Foundation components should be used.

**Allowed Fix Patterns:**
1. **Wrapper First Pattern** — Replace raw HTML with Foundation component

**Forbidden Alternatives:**
- ❌ Adding className to raw HTML
- ❌ Using styled-components or CSS modules on raw HTML
- ❌ Creating custom components that wrap raw HTML
- ❌ Any method that keeps raw HTML

**HTML to Foundation Mapping:**
- `p` → `Text`
- `h1-h6` → `Heading`
- `button` → `Button`, `IconButton`
- `a` → `Link`, `NavLink`
- `input` → `Input`
- `textarea` → `Textarea`
- `div`, `span` → `Box`, `Stack`, `Row`, `Text` (context-dependent)
- `section` → `Section`
- `article` → `Box` or `Section` (context-dependent)

**Example — Violation:**
```tsx
// ❌ FORBIDDEN: Raw HTML
<p>Content</p>
<button onClick={() => {}}>Click</button>
<div className="container">Wrapper</div>
```

**Example — Fixed (Wrapper First):**
```tsx
// ✅ CORRECT: Foundation components
import { Text, Button, Container } from "@tenerife.music/ui";

<Container>
  <Text>Content</Text>
  <Button onClick={() => {}}>Click</Button>
</Container>
```

---

### V5: Prop Smuggling via Untyped Spreads

**Violation:** Using untyped `{...props}` spreads into Foundation components.

**Allowed Fix Patterns:**
1. **Explicit Typing** — Type props explicitly as component props type
2. **Direct Props** — Pass props directly instead of spreading

**Forbidden Alternatives:**
- ❌ Using `any` type for props
- ❌ Using `Record<string, any>` for props
- ❌ Using untyped object spreads
- ❌ Any method that bypasses type checking

**Example — Violation:**
```tsx
// ❌ FORBIDDEN: Untyped spread
const props = { onClick: () => {}, className: "custom" };
<Button {...props}>Click</Button>
```

**Example — Fixed (Explicit Typing):**
```tsx
// ✅ CORRECT: Explicitly typed props
import { Button, type ButtonProps } from "@tenerife.music/ui";

const buttonProps: ButtonProps = { variant: "primary", onClick: () => {} };
<Button {...buttonProps}>Click</Button>
```

**Example — Fixed (Direct Props):**
```tsx
// ✅ CORRECT: Direct props
<Button variant="primary" onClick={() => {}}>Click</Button>
```

---

## Forbidden Alternatives

**The following methods are FORBIDDEN for fixing violations:**

1. **CSS Modules / Styled Components**
   - ❌ Creating `.module.css` files
   - ❌ Using `styled-components` or `emotion`
   - ❌ Any CSS-in-JS solution

2. **Custom Wrapper Components with Escape Hatches**
   - ❌ Components that accept `className` or `style` and pass to Foundation
   - ❌ Components that add utility classes internally
   - ❌ Any wrapper that bypasses token system

3. **Type Assertions to Bypass Type Checking**
   - ❌ `as any` type assertions
   - ❌ `@ts-ignore` or `@ts-expect-error` comments
   - ❌ Any method that silences type errors

4. **eslint-disable for Stage 1 Rules**
   - ❌ `eslint-disable` for V1, V2, V4, V5 violations
   - ❌ File-level disables
   - ❌ Any method that silences ERROR rules

5. **Alternative Styling Systems**
   - ❌ Inline styles (already V2 violation)
   - ❌ CSS variables in className
   - ❌ Any method that creates parallel styling channels

**Rationale:** These methods bypass the token system and Foundation Contract, creating architectural drift and reducing system predictability.

---

## Pattern Selection Guide

**When to use Wrapper First Pattern:**
- Replacing raw HTML wrappers (`div`, `section`, `span`)
- Creating layout containers
- Wrapping Foundation components for spacing/layout
- V3 violations (utility classes on wrappers)
- V4 violations (raw HTML instead of Foundation)

**When to use Token Props Pattern:**
- Replacing utility classes with token props
- Applying spacing, padding, gap, margin
- Applying colors, backgrounds, borders
- V1 violations (className with utility classes)
- V3 violations (utility classes near Foundation)

**When to use Explicit Typing:**
- V5 violations (prop smuggling)
- Passing props via spread operator
- Type safety requirements

**When to use Direct Props:**
- V5 violations (prop smuggling)
- Simple prop passing
- Avoiding spread operator complexity

---

## Examples Summary

### Complete Fix Example (V1 + V3)

**Violation:**
```tsx
// ❌ FORBIDDEN: Multiple violations
<div className="p-4 bg-red-500">
  <Button className="custom-style">Click</Button>
</div>
```

**Fixed (Wrapper First + Token Props):**
```tsx
// ✅ CORRECT: Foundation components with token props
import { Stack, Button } from "@tenerife.music/ui";

<Stack padding="lg" background="surface">
  <Button variant="primary" size="lg">Click</Button>
</Stack>
```

---

### Complete Fix Example (V4 + V3)

**Violation:**
```tsx
// ❌ FORBIDDEN: Raw HTML with utility classes
<section className="container mx-auto p-4">
  <h1>Title</h1>
  <p>Content</p>
</section>
```

**Fixed (Wrapper First):**
```tsx
// ✅ CORRECT: Foundation components
import { Section, Container, Heading, Text, Stack } from "@tenerife.music/ui";

<Section>
  <Container padding="lg">
    <Stack gap="md">
      <Heading>Title</Heading>
      <Text>Content</Text>
    </Stack>
  </Container>
</Section>
```

---

## Related Documents

- [CLOSED_SYSTEM_V2_CANON_INDEX.md](./CLOSED_SYSTEM_V2_CANON_INDEX.md) — Canonical documentation index
- [CLOSED_SYSTEM_V2_CONTINUOUS_ENFORCEMENT.md](./CLOSED_SYSTEM_V2_CONTINUOUS_ENFORCEMENT.md) — Enforcement mechanisms
- [CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md](./CLOSED_SYSTEM_V2_ENFORCEMENT_GUARDS.md) — ESLint guard rules
- [CLOSED_SYSTEM_V2_PHASE_I_LOCK.md](./CLOSED_SYSTEM_V2_PHASE_I_LOCK.md) — Phase I lock with migration patterns
- [FOUNDATION_CONTRACT.md](../FOUNDATION_CONTRACT.md) — Foundation component contract

---

**Last Updated:** 2026-01-27  
**Task ID:** TUI_CSV2_PHASE_J1_CONTINUOUS_ENFORCEMENT_021
