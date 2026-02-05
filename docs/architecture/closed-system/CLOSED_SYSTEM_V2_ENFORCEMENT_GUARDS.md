# Closed System v2 — Enforcement Guards

**Project:** @tenerife.music/ui  
**Version:** 1.1  
**Date Created:** 2026-01-26  
**Last Updated:** 2026-01-26  
**Status:** ✅ **ACTIVE**  
**Task ID:** TUI_CSV2_ESLINT_GUARDS_STAGED_ACTIVATION_015

---

## Purpose

This document describes ESLint guard rules that prevent consumer-level bypasses of Closed System v2 architecture. These rules enforce existing architectural constraints at the consumer code level, making violations explicit and agent-proof.

**These guards enforce existing Closed System v2 rules. They do not define new architecture.**

---

## Scope (Consumer Only)

These ESLint rules apply **only to consumer code**, not to library source:

- ✅ **Consumer code:** Code that imports from `@tenerife.music/ui` or `@tenerife/ui` but is not part of the UI library source
- ❌ **Library source:** Code in `/tenerife-ui/`, `/packages/ui/`, or `/src/ui/` paths
- ❌ **Story files:** Files ending in `.stories.tsx` or `.stories.ts`

**Why consumer-only?**

- Library source may need implementation details (e.g., internal className usage)
- Story files are demonstration code, not production contracts
- Consumer code must follow the public API contract strictly

---

## How Consumer Guards Run

**Note:** Consumer guards were previously configured for `docs-app/**`, but `docs-app` has been removed. Consumer guards are currently not active.

If consumer code is added in the future, guards can be reactivated by:
- Creating a dedicated ESLint config for consumer code
- Configuring the guard rules to apply to consumer directories
- Adding a `lint:consumer` command to run guards

Guards are **not** run on `src/` (Foundation, COMPOSITION, Extension). Main `pnpm lint` uses `eslint.config.mjs`.

---

## Staged Activation

Guards use a **staged activation** model (TUI_CSV2_ESLINT_GUARDS_STAGED_ACTIVATION_015):

- **Stage 1 — CRITICAL (error):** `no-classname-on-foundation`, `no-style-on-foundation`, `no-prop-spread-into-foundation`. CRITICAL violations are resolved and must not regress. These rules are **error**; no eslint-disable is allowed.

- **Stage 2 — MAJOR layout (warn):** `no-utility-classes-near-foundation`. Layout-related violations (V3) are **warn**; full resolution is deferred to Phase G — Layout Normalization. Until then, avoid new violations.

- **Pre-existing (error):** `no-raw-html-when-foundation-exists` remains **error** (not staged).

---

## Rule Severity Table

| Rule | Stage | Severity | Applies to |
|------|-------|----------|------------|
| `tui/no-classname-on-foundation` | 1 | error | Consumer code |
| `tui/no-style-on-foundation` | 1 | error | Consumer code |
| `tui/no-prop-spread-into-foundation` | 1 | error | Consumer code |
| `tui/no-utility-classes-near-foundation` | 2 | warn | Consumer code |
| `tui/no-raw-html-when-foundation-exists` | — | error | Consumer code |

---

## Phase G Migration Note

Layout-related violations (V3 / `no-utility-classes-near-foundation`) are currently **warn**. Full resolution is deferred to **Phase G — Layout Normalization**. Until then, avoid introducing new utility-based wrapper styling; use Foundation layout components (Stack, Box, Container) where possible.

---

## Non-Goals (Not Canon / Not Architecture)

These guards are **enforcement mechanisms**, not architectural definitions:

- ❌ **Not Canon:** These rules do not define Closed System v2 architecture
- ❌ **Not Architecture:** These rules enforce existing architecture, not new requirements
- ❌ **Not Source of Truth:** Canonical architecture documents are the source of truth
- ✅ **Enforcement Only:** These rules make violations explicit and prevent bypasses

**Reference:** For architectural authority, see [CLOSED_SYSTEM_V2_CANON_INDEX.md](./CLOSED_SYSTEM_V2_CANON_INDEX.md)  
**Reference:** Consumer usage rationale is defined in [CONSUMER_LAYOUT_GUIDE.md](./CONSUMER_LAYOUT_GUIDE.md)

---

## Rule List

### 1. `tui/no-classname-on-foundation`

**Purpose:** Disallow passing `className` to Foundation components in consumer code.

**Violation Example:**
```tsx
import { Button } from "@tenerife.music/ui";

// ❌ Error: className is forbidden
<Button className="custom-style">Click</Button>
```

**Correct Usage:**
```tsx
import { Button } from "@tenerife.music/ui";

// ✅ Use component props for styling
<Button variant="primary" size="lg">Click</Button>
```

**Rationale:** Foundation components exclude `className` from their public API to prevent bypassing the token system. Use component props for styling instead.

---

### 2. `tui/no-style-on-foundation`

**Purpose:** Disallow passing `style` (inline styles) to Foundation components in consumer code.

**Violation Example:**
```tsx
import { Button } from "@tenerife.music/ui";

// ❌ Error: style prop is forbidden
<Button style={{ color: "red" }}>Click</Button>
```

**Correct Usage:**
```tsx
import { Button } from "@tenerife.music/ui";

// ✅ Use component props for styling
<Button variant="destructive">Click</Button>
```

**Rationale:** Foundation components exclude `style` from their public API to prevent bypassing the token system. Use component props for styling instead.

---

### 3. `tui/no-utility-classes-near-foundation`

**Purpose:** Disallow Tailwind utility class usage when applied to wrappers around Foundation components (parallel styling channel).

**Violation Example:**
```tsx
import { Button } from "@tenerife.music/ui";

// ❌ Error: Utility classes on wrapper create parallel styling channel
<div className="p-4 bg-red-500">
  <Button>Click</Button>
</div>
```

**Correct Usage:**
```tsx
import { Button, Stack } from "@tenerife.music/ui";

// ✅ Use Foundation layout components
<Stack gap="md" padding="lg">
  <Button>Click</Button>
</Stack>
```

**Rationale:** Wrapping Foundation components with utility-styled containers creates parallel styling systems that bypass the token system. Use Foundation layout components instead.

---

### 4. `tui/no-raw-html-when-foundation-exists`

**Purpose:** Disallow raw HTML tags in patterns that replace a Foundation primitive (e.g., `div`/`span` used where `Text`/`Stack`/`Container` is expected).

**Violation Example:**
```tsx
import { Text, Button } from "@tenerife.music/ui";

// ❌ Error: Raw HTML should use Foundation component
<p>Content</p>
<button onClick={() => {}}>Click</button>
```

**Correct Usage:**
```tsx
import { Text, Button } from "@tenerife.music/ui";

// ✅ Use Foundation components
<Text>Content</Text>
<Button onClick={() => {}}>Click</Button>
```

**Rationale:** Foundation components provide token-driven, accessible, and consistent implementations. Raw HTML bypasses these benefits.

**HTML to Foundation Mapping:**
- `p` → `Text`
- `h1-h6` → `Heading`
- `button` → `Button`, `IconButton`
- `a` → `Link`, `NavLink`
- `input` → `Input`
- `textarea` → `Textarea`
- `div`, `span` → `Text`, `Stack`, `Box` (context-dependent)

---

### 5. `tui/no-prop-spread-into-foundation`

**Purpose:** Disallow `{...props}` spreads into Foundation components unless props are explicitly typed as sanctioned props (prevents smuggling).

**Violation Example:**
```tsx
import { Button } from "@tenerife.music/ui";

// ❌ Error: Untyped spread may contain forbidden props
const props = { onClick: () => {} };
<Button {...props}>Click</Button>
```

**Correct Usage:**
```tsx
import { Button, type ButtonProps } from "@tenerife.music/ui";

// ✅ Explicitly typed props
const buttonProps: ButtonProps = { variant: "primary" };
<Button {...buttonProps}>Click</Button>

// ✅ Or use direct props
<Button variant="primary">Click</Button>
```

**Rationale:** Untyped prop spreads can bypass type checking and inject forbidden props (e.g., `className`, `style`). Explicit typing ensures only sanctioned props are passed.

**DOM-boundary reference:** See [DOM_BOUNDARY_COMPONENTS.md](./DOM_BOUNDARY_COMPONENTS.md) for the fixed DOM-boundary component list referenced by V5.

**Rationale:**
See [DOM_BOUNDARY_COMPONENTS.md](./DOM_BOUNDARY_COMPONENTS.md) for canonical DOM-boundary definition.

---

## Allowed Exceptions Policy

**Stage 1 rules (no-classname, no-style, no-prop-spread):** **No eslint-disable allowed.** With staged activation, CRITICAL violations must not regress; silencing them via disable is forbidden. CI may add a check for Stage 1 disables in consumer code.

**Stage 2 (no-utility-classes-near-foundation):** Warn only; typically no disable needed. If exceptional, use `eslint-disable-next-line` with a TODO and migration ticket id. Prefer fixing over disabling.

**Pre-staged policy (historical):** The previous "Allowed Downgrades" and TODO-based disable example applied before staged activation. They are superseded by the above.

---

## How to Fix Violations

### Fixing `className`/`style` Violations

**Problem:**
```tsx
<Button className="custom-style" style={{ color: "red" }}>Click</Button>
```

**Solution:** Use component props
```tsx
<Button variant="primary" size="lg">Click</Button>
```

**If component doesn't support needed styling:**
1. Check if Foundation component has appropriate props
2. Use Foundation layout components for spacing/layout
3. If styling is truly needed, file a feature request

---

### Fixing Utility Class Violations

**Problem:**
```tsx
<div className="p-4 bg-red-500">
  <Button>Click</Button>
</div>
```

**Solution:** Use Foundation layout components
```tsx
import { Stack } from "@tenerife.music/ui";

<Stack gap="md" padding="lg">
  <Button>Click</Button>
</Stack>
```

---

### Fixing Raw HTML Violations

**Problem:**
```tsx
<p>Content</p>
<button onClick={() => {}}>Click</button>
```

**Solution:** Use Foundation components
```tsx
import { Text, Button } from "@tenerife.music/ui";

<Text>Content</Text>
<Button onClick={() => {}}>Click</Button>
```

---

### Fixing Prop Spread Violations

**Problem:**
```tsx
const props = { onClick: () => {} };
<Button {...props}>Click</Button>
```

**Solution:** Explicitly type props
```tsx
import { Button, type ButtonProps } from "@tenerife.music/ui";

const buttonProps: ButtonProps = { variant: "primary" };
<Button {...buttonProps}>Click</Button>
```

---

## Related Documents

- [CLOSED_SYSTEM_V2_CANON_INDEX.md](./CLOSED_SYSTEM_V2_CANON_INDEX.md) - Canonical documentation index
- [CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md](./CLOSED_SYSTEM_V2_SYSTEM_CLOSURE.md) - System closure rationale and change control policy (explains why enforcement guards are necessary)
- [CLOSED_SYSTEM_V2_CONTINUOUS_ENFORCEMENT.md](./CLOSED_SYSTEM_V2_CONTINUOUS_ENFORCEMENT.md) - Continuous enforcement mechanisms, ERROR/WARN levels, CI integration
- [CLOSED_SYSTEM_V2_CANONICAL_FIX_PATTERNS.md](./CLOSED_SYSTEM_V2_CANONICAL_FIX_PATTERNS.md) - Canonical fix patterns registry (Wrapper First, Token Props)
- [CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md](./CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md) - Architecture model
- [FOUNDATION_CONTRACT.md](../FOUNDATION_CONTRACT.md) - Foundation component contract
- [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md) - Foundation lock status

---

**Last Updated:** 2026-01-27  
**Task ID:** TUI_CSV2_ESLINT_GUARDS_STAGED_ACTIVATION_015
