# UI Integration Guide

**Last Updated:** 2026-02-05  
**Purpose:** Integration and setup guide for Tenerife UI in consumer applications.

See also: [ThemeParams CSP & ESLint Env](./THEMEPARAMS_CSP_AND_ESLINT_ENV.md) — FOUC prevention, CSP nonce handling, ESLint source-root detection.

---

## Quick Start

### 1. Install

```bash
pnpm add @tenerife.music/ui
```

### 2. Import Styles

```ts
import "@tenerife.music/ui/styles";
```

### 3. Wrap with ThemeProvider

```tsx
import { ThemeProvider } from "@tenerife.music/ui/theme";

export function App({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

### 4. Optional Next.js Adapter

For Next.js apps, use the Next.js extension entry point:

```tsx
import { NextLinkAdapter } from "@tenerife.music/ui/extensions/next";

<NextLinkAdapter href="/dashboard" variant="text">
  Dashboard
</NextLinkAdapter>
```

> For server-side theme hydration and CSP guidance, see [ThemeParams CSP & ESLint Env](./THEMEPARAMS_CSP_AND_ESLINT_ENV.md).

---

## Grid Component Integration

### Replacing Manual Tailwind Grids

The `Grid` component provides a token-compliant replacement for manual Tailwind grid usage. This ensures consistent spacing, type safety, and easier maintenance.

#### Migration Steps

1. **Identify manual grid usage:**

   ```tsx
   // Look for patterns like this:
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
   ```

2. **Replace with Grid component:**

   ```tsx
   import { Grid } from "@tenerife.music/ui";

   <Grid cols={1} md={2} lg={3} gap={4}>
   ```

3. **Update gap values to use tokens:**

   ```tsx
   // Before: arbitrary values
   <div className="grid gap-[1rem]">

   // After: token values
   <Grid gap={4}> // gap={4} = md token (1rem)
   ```

### Benefits of Using Grid Component

✅ **Token Compliance** - All gaps use design tokens (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)  
✅ **Type Safety** - TypeScript catches errors at compile time  
✅ **Consistency** - Same API across the entire codebase  
✅ **Maintainability** - Easier to update spacing system-wide  
✅ **Responsive** - Built-in support for md, lg, xl breakpoints

### Common Patterns

#### Cards Grid (public API)

```tsx
import { Grid, Card, CardHeader, CardBody } from "@tenerife.music/ui";

<Grid cols={1} md={2} lg={3} gap={6}>
  {items.map((item) => (
    <Card key={item.id}>
      <CardHeader>{item.title}</CardHeader>
      <CardBody>{item.content}</CardBody>
    </Card>
  ))}
</Grid>
```

> Domain-specific card components are internal to Tenerife products and are not exported. Use `Card`, `Grid`, and other public components to build layouts.

#### Responsive Layout

```tsx
<Grid cols={1} md={2} lg={4} xl={6} gap={4}>
  {items.map((item) => (
    <div key={item.id}>{item.content}</div>
  ))}
</Grid>
```

### Gap Token Reference

When migrating, use these gap values:

| Tailwind Class | Grid Gap Value           | Token | CSS Value       |
| -------------- | ------------------------ | ----- | --------------- |
| `gap-0`        | `gap={0}`                | -     | `0`             |
| `gap-xs`       | `gap={1}`                | `xs`  | `0.25rem` (4px) |
| `gap-sm`       | `gap={2}`                | `sm`  | `0.5rem` (8px)  |
| `gap-md`       | `gap={4}`                | `md`  | `1rem` (16px)   |
| `gap-lg`       | `gap={6}`                | `lg`  | `1.5rem` (24px) |
| `gap-xl`       | `gap={8}`                | `xl`  | `2rem` (32px)   |
| `gap-2xl`      | `gap={12}`               | `2xl` | `3rem` (48px)   |
| `gap-3xl`      | `gap={16}`               | `3xl` | `4rem` (64px)   |
| `gap-4xl`      | `gap={20}`               | `4xl` | `5rem` (80px)   |
| `gap-5xl`      | `gap={24}`               | `5xl` | `6rem` (96px)   |

### Integration Checklist

When integrating Grid component:

- [ ] Replace manual `grid` classes with `<Grid>`
- [ ] Convert responsive classes (`md:grid-cols-*`) to props (`md={*}`)
- [ ] Update gap values to use token numbers
- [ ] Test responsive behavior at all breakpoints
- [ ] Verify spacing matches design tokens

---

## Other Component Integrations

### Layout Components

All layout components (`Grid`, `Flex`, `Stack`, `Container`, `Section`, `Surface`, `Panel`, `ContentShell`) follow the same token-based approach:

```tsx
import { Grid, Flex, Stack, Container, Section } from "@tenerife.music/ui";

<Grid cols={3} gap={4}>...</Grid>
<Flex direction="row" gap={4} justify="between">...</Flex>
<Stack direction="column" gap={3}>...</Stack>
<Container size="md">...</Container>
<Section tone="default">...</Section>
```

### Form Components

All form controls are token-driven and include built-in validation states:

```tsx
import { Field, Input, Label, Textarea, Checkbox, Radio, Switch } from "@tenerife.music/ui";

<Field>
  <Label>Email</Label>
  <Input type="email" placeholder="you@company.com" />
</Field>
```

---

## Consumer Layout Rule (Closed System v2)

Passing `className` or `style` to UI components is forbidden. Layout is applied on DOM wrappers instead.

See: [Consumer Layout Guide](../architecture/closed-system/CONSUMER_LAYOUT_GUIDE.md).
