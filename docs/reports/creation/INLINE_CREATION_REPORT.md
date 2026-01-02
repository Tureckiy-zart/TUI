# Inline Component — Creation Report

**Date Created:** 2026-01-02  
**Last Updated:** 2026-01-02  
**Component Name:** Inline  
**Exported Name:** `Inline`  
**Layer:** Extension  
**Category:** layout

---

## Intent

`Inline` is a **DX-enhancer** for inline-flex layout composition. It provides a simple, token-based API for creating inline-flex containers with semantic spacing between items.

**Purpose:**
- Simplify inline-flex layout composition
- Provide token-based spacing (gap) between inline items
- Support common alignment and wrapping needs
- Enable composition via Radix Slot pattern (`asChild`)

**Key Characteristics:**
- Uses `inline-flex` display (inline-level flex container)
- Token-only spacing (no raw values)
- No state, no interaction, no variants
- Minimal API: `gap`, `align`, `wrap`, `asChild`
- Supports `forwardRef` for ref forwarding

---

## Non-Goals

**Critical:** `Inline` is **NOT** a replacement for `Stack`.

### Inline ≠ Stack

**Inline:**
- Uses `inline-flex` display (inline-level)
- Designed for inline content flows (badges, tags, inline buttons, etc.)
- Does NOT use Box internally (renders div directly)
- Does NOT accept `className` or `style` props
- Minimal API focused on inline-flex layout

**Stack:**
- Uses `flex` display (block-level)
- Designed for block-level layout flows (vertical/horizontal stacks)
- Uses Box internally
- Accepts `className` and `style` props
- Rich API with `direction`, `spacing`, `align`, `justify`

**When to use Inline:**
- Inline content that should flow with text (badges, tags, inline buttons)
- Inline-flex layouts where items should wrap naturally
- Simple horizontal inline flows with spacing

**When to use Stack:**
- Block-level layout flows (vertical or horizontal)
- Full control over flex direction and justification
- Need for className/style customization
- Complex layout composition

---

## Usage Examples

### Basic Inline Layout

```tsx
import { Inline, Text } from "@/components";

<Inline gap="md">
  <Text>Item 1</Text>
  <Text>Item 2</Text>
  <Text>Item 3</Text>
</Inline>
```

### With Alignment

```tsx
<Inline gap="sm" align="center">
  <Badge>Tag 1</Badge>
  <Badge>Tag 2</Badge>
  <Badge>Tag 3</Badge>
</Inline>
```

### With Wrapping

```tsx
<Inline gap="xs" wrap>
  <Badge>Tag 1</Badge>
  <Badge>Tag 2</Badge>
  <Badge>Tag 3</Badge>
  <Badge>Tag 4</Badge>
  {/* Items wrap to next line when needed */}
</Inline>
```

### With asChild Pattern

```tsx
<Inline gap="md" align="baseline" asChild>
  <span>
    <Text>Inline content</Text>
    <Badge>New</Badge>
  </span>
</Inline>
```

### Alignment Options

```tsx
// Start alignment (default)
<Inline gap="sm" align="start">...</Inline>

// Center alignment
<Inline gap="sm" align="center">...</Inline>

// End alignment
<Inline gap="sm" align="end">...</Inline>

// Baseline alignment (for text)
<Inline gap="sm" align="baseline">...</Inline>
```

---

## Implementation Details

### Props

```typescript
export interface InlineProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  gap?: ResponsiveSpacing;
  align?: "start" | "center" | "end" | "baseline";
  wrap?: boolean;
  asChild?: boolean;
}
```

### Constraints Compliance

- ✅ Token-only spacing (uses `getSpacingCSSVar`)
- ✅ No CVA or tokenCVA usage
- ✅ No `className` or `style` props (explicitly excluded)
- ✅ No responsive logic complexity (uses `getBaseValue` for simple values)
- ✅ No `Inline.Item` or subcomponents
- ✅ No Grid or Stack internally
- ✅ `inline-flex` layout (Tailwind class)
- ✅ Gap via spacing tokens (CSS variables)
- ✅ Align prop (explicit union type)
- ✅ Wrap prop (boolean)
- ✅ `asChild` support (Radix Slot)
- ✅ `forwardRef` support

### Technical Implementation

- Renders `div` directly (does NOT use Box)
- Uses Tailwind classes: `inline-flex`, `items-*`, `flex-wrap`/`flex-nowrap`
- Applies gap via inline styles with CSS variables (`getSpacingCSSVar`)
- Uses Radix Slot when `asChild={true}`
- Supports all standard HTML div attributes (except `className` and `style`)

---

## Files Created

1. `src/COMPOSITION/layout/Inline/Inline.tsx` - Main component implementation
2. `src/COMPOSITION/layout/Inline/index.ts` - Component exports
3. `src/COMPOSITION/layout/index.ts` - Updated with Inline export
4. `src/index.ts` - Updated with Inline export in LAYOUT PRIMITIVES section

---

## Verification

- ✅ Inline is importable from `src/index.ts`
- ✅ No CVA usage
- ✅ No `className` or `style` props in public API
- ✅ Only spacing tokens used
- ✅ Type-safe props with explicit unions
- ✅ Clear creation report exists

---

## Summary

`Inline` is a simple, focused layout primitive for inline-flex composition. It provides token-based spacing and alignment without the complexity of Stack. It is explicitly **not** a Stack replacement and should be used for inline-level content flows only.

