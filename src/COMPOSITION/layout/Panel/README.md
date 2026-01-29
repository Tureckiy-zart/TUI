# Panel Component

**Location:** `src/COMPOSITION/layout/Panel/Panel.tsx`  
**Type:** Composition / Layout  
**Status:** ✅ ACTIVE

---

## Purpose

Panel is a **lightweight structural surface container** for grouped content. Panel provides surface styling without interactivity, sitting semantically between Box (generic container) and Card (structured content container).

**Panel IS:**

- A lightweight structural surface container
- A semantic upgrade over Box (adds surface styling)
- A token-driven styling component
- A non-interactive container (no onClick, no interactive states)

**Panel IS NOT:**

- An interactive component (Panel does not imply interactivity)
- A structured content container (use Card for Header/Body/Footer structure)
- A layout composition primitive (use Stack, Flex, or Grid)
- An overlay orchestrator (Panel is for page-level grouping, not overlays)

---

## Semantic Position

Panel fills the semantic gap between Box and Card:

- **Box** → Generic container with minimal styling
- **Panel** → Structural surface container with surface styling (this component)
- **Card** → Structured content container with explicit sections and stronger visual hierarchy

**When to use Panel:**

- Form sections
- Settings panels
- Grouped content sections
- Non-interactive content containers
- Any case where you need surface styling but don't need Card's structure

**When NOT to use Panel:**

- When you need structured sections (Header/Body/Footer) → Use Card
- When you need minimal styling → Use Box
- When you need interactivity → Use Card or create an interactive wrapper
- When you need overlay orchestration → Use overlay Panel pattern (Portal + Backdrop + Surface)

---

## API

### Panel Component

```typescript
<Panel tone="default" padding="md" radius="md">
  Content
</Panel>
```

### Props

- **`tone`** - Surface tone variant (`"default" | "muted" | "subtle"`)
  - `default` - Standard surface styling (bg-background, border)
  - `muted` - Muted background (bg-muted, border)
  - `subtle` - Subtle background (bg-muted/50, border/50)
- **`padding`** - Padding value (`"sm" | "md" | "lg"`)
  - Overrides default tone padding
- **`radius`** - Border radius (`"sm" | "md" | "lg" | "xl"`)
  - Overrides default tone radius
- **`as`** - Render as different HTML element (default: `div`)

---

## Usage Examples

### Basic Panel

```typescript
<Panel>
  <Text>Grouped content</Text>
</Panel>
```

### Panel with Tone

```typescript
<Panel tone="muted" padding="lg">
  <Text>Settings section</Text>
</Panel>
```

### Form Section

```typescript
<Panel tone="muted" padding="lg" radius="md">
  <Stack direction="vertical" spacing="md">
    <Text size="lg" weight="semibold">
      Form Section
    </Text>
    <Field>
      <Label>Field Label</Label>
      <Input placeholder="Enter value" />
    </Field>
  </Stack>
</Panel>
```

### Settings Panel

```typescript
<Panel tone="subtle" padding="lg" radius="lg">
  <Stack direction="vertical" spacing="md">
    <Text size="lg" weight="semibold">
      Settings
    </Text>
    <div className="space-y-sm">
      <div className="flex items-center justify-between">
        <Text>Notification preferences</Text>
        <Text typographyRole="meta" color="muted" size="sm">Enabled</Text>
      </div>
    </div>
  </Stack>
</Panel>
```

### Semantic Element

```typescript
<Panel as="section" tone="subtle">
  <Text>Form section</Text>
</Panel>
```

---

## Token System

Panel uses `PANEL_TOKENS` for styling:

- **Tone tokens** (`default`, `muted`, `subtle`) - Background and border styling
- **Padding tokens** (`sm`, `md`, `lg`) - Internal spacing
- **Radius tokens** (`sm`, `md`, `lg`, `xl`) - Border radius
- **Shadow tokens** (`none`, `xs`) - Minimal elevation (below Card)

**Token Mapping:**

| Property   | Token Domain               | Values                                        |
| ---------- | -------------------------- | --------------------------------------------- |
| padding    | PANEL_TOKENS.padding       | sm, md, lg                                    |
| radius     | PANEL_TOKENS.radius        | sm, md, lg, xl                                |
| tone       | PANEL_TOKENS.tone          | default, muted, subtle                        |
| background | PANEL_TOKENS.tone[].bg     | bg-background, bg-muted, bg-muted/50          |
| border     | PANEL_TOKENS.tone[].border | border border-border, border border-border/50 |
| shadow     | PANEL_TOKENS.shadow        | none (or minimal, below Card)                 |

---

## Architecture Compliance

- ✅ Uses token-driven architecture (no raw values)
- ✅ Composes Box (allowed)
- ✅ Does NOT compose Card or CardBase (forbidden)
- ✅ No interactivity (no onClick, no interactive states)
- ✅ Surface tone only (no semantic colors)
- ✅ Elevation below Card
- ✅ Extension layer component (COMPOSITION)
- ✅ Follows Authority Contracts (Spacing, Radius, Elevation)

---

## Comparison with Similar Components

### Panel vs Box

- **Box** - Generic container with minimal styling
- **Panel** - Adds surface styling (background, border) for semantic grouping

### Panel vs Card

- **Panel** - Lightweight structural container, no sections, minimal elevation
- **Card** - Structured content container with Header/Body/Footer, stronger visual hierarchy

### Panel vs Surface

- **Panel** - Lightweight structural container for grouped content (page-level)
- **Surface** - Variant-driven surface elevation container (more flexible variants)

---

## Related Components

- **Box** - Low-level layout primitive (used internally by Panel)
- **Card** - Structured content container (heavier than Panel)
- **Surface** - Variant-driven surface elevation container
- **Stack** - Layout composition primitive (use for panel layouts)

---

## References

- **Component Implementation:** `src/COMPOSITION/layout/Panel/Panel.tsx`
- **Token System:** `src/FOUNDATION/tokens/components/panel.ts`
- **Architectural Decision:** [ADR_overlay_panel_not_card.md](../../../../docs/architecture/decisions/ADR_overlay_panel_not_card.md) - Overlay Panel ≠ Card/CardBase
