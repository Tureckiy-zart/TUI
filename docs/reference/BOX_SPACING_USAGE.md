# Box Usage - Spacing

Foundation `Box` component provides a token-driven spacing API that ensures consistency across the application.

## Props Overview

| Prop | Description | CSS Property | Priority |
|------|-------------|--------------|----------|
| `p` | Padding (all sides) | `padding` | Lowest |
| `px` | Padding horizontal | `padding-left`, `padding-right` | Overrides `p` |
| `py` | Padding vertical | `padding-top`, `padding-bottom` | Overrides `p` |
| `m` | Margin (all sides) | `margin` | Lowest |
| `mx` | Margin horizontal | `margin-left`, `margin-right` | Overrides `m` |
| `my` | Margin vertical | `margin-top`, `margin-bottom` | Overrides `m` |
| `mt`, `mb`, `ml`, `mr` | Margin specific axis | `margin-top`, etc. | Overrides `my`/`mx`/`m` |

## Usage Examples

### Basic Padding

Use `p` for uniform padding on all sides.

```tsx
<Box p="md">
  Uniform padding
</Box>
```

### Axis Padding

Use `px` and `py` for specific axis padding.

```tsx
<Box px="lg" py="sm">
  Horizontal and vertical padding
</Box>
```

### Padding Priority

`px` and `py` take precedence over `p`. This allows setting a default padding via `p` and overriding a specific axis.

```tsx
// Result: padding-top/bottom: md, padding-left/right: xl
<Box p="md" px="xl">
  Base padding with horizontal override
</Box>
```

## Token Values

All spacing props accept **ResponsiveSpacing** tokens:

- Semantic: `xs`, `sm`, `md`, `lg`, `xl`, ...
- Layout: `gutter`, `layout`
- Numeric keys are NOT supported directly (use semantic tokens).

## Responsive Syntax

You can pass an object to specify values per breakpoint.

```tsx
<Box p={{ base: "sm", md: "lg", xl: "2xl" }}>
  Responsive padding
</Box>
```
