# Storybook Stories Quality Standard

**Status:** MANDATORY  
**Scope:** @tenerife.music/ui  
**Applies to:** ALL UI components (Foundation + Extension)  
**Audience:** Maintainers, Contributors, Cursor AI  
**Date Created:** 2025-12-28  
**Version:** 1.0

---

## Purpose

This document defines **mandatory quality standards** for all Storybook stories in the `@tenerife.music/ui` library.

The goal is to ensure:

- Consistent story structure across all components
- Predictable navigation in Storybook
- Uniform documentation quality
- Clear story naming conventions
- Standardized meta configuration

These rules are **NOT stylistic**.  
They are **architectural requirements**.

---

## Core Principle

> **All Storybook stories MUST follow this standard.**  
> **Deviation from this standard is FORBIDDEN.**

This standard ensures that Storybook remains navigable, consistent, and maintainable as the component library grows.

---

## 1. Title Structure Standard

### Format

**Pattern:** `{Layer} / {Category} / {ComponentName}`

### Layers

| Layer | Description | Examples |
|-------|-------------|----------|
| `UI / Foundation` | Foundation components | `UI / Foundation / Modal` |
| `UI / Primitives` | PRIMITIVES components | `UI / Primitives / Button` |
| `UI / Composition` | COMPOSITION components | `UI / Composition / Spinner` |
| `UI / Patterns` | PATTERNS components | `UI / Patterns / CardBase` |
| `UI / Extensions` | EXTENSIONS components | `UI / Extensions / ConfirmDialog` |
| `UI / Domain` | DOMAIN components | `UI / Domain / NotificationCenter` |

### Rules

- ✅ **REQUIRED:** Use exact format `UI / {Layer} / {ComponentName}`
- ✅ **REQUIRED:** Component name MUST match exported component name (PascalCase)
- ❌ **FORBIDDEN:** Different formats (`composite/Spinner`, `primitives/Button`, etc.)
- ❌ **FORBIDDEN:** Missing layer prefix
- ❌ **FORBIDDEN:** Inconsistent spacing or capitalization

### Examples

```typescript
// ✅ CORRECT
title: "UI / Primitives / Button"
title: "UI / Composition / Spinner"
title: "UI / Foundation / Modal"

// ❌ FORBIDDEN
title: "composite/Spinner"
title: "primitives/Button"
title: "Button"
```

---

## 2. Story Naming Standard

### Canonical Story Names (REQUIRED)

These story names are **canonical** and **MANDATORY** when applicable:

| Story Name | When Required | Reference |
|------------|---------------|-----------|
| `Default` | **ALWAYS** (first story) | Basic usage demonstration |
| `SizesGallery` | Component has `size` prop | [VARIANTS_SIZE_CANON.md](../architecture/VARIANTS_SIZE_CANON.md) |
| `Matrix` | Component has **BOTH** `size` **AND** `variant` props | [VARIANTS_SIZE_CANON.md](../architecture/VARIANTS_SIZE_CANON.md) |
| `States` | Component has public state props (disabled, loading, error, etc.) | [VARIANTS_SIZE_CANON.md](../architecture/VARIANTS_SIZE_CANON.md) |
| `LongContent` | Overlay component (Modal, Dialog, Popover, Tooltip, etc.) | [SIZE_MAPPING_SPEC.md](../architecture/SIZE_MAPPING_SPEC.md) |

### Use Case Stories (Optional)

- **Naming:** PascalCase, descriptive (e.g., `InlineLoading`, `PageLoading`, `WithLabel`)
- **Count:** Minimum 2, maximum 5 use case stories
- **Purpose:** Demonstrate real-world usage scenarios

### Rules

- ✅ **REQUIRED:** Canonical names MUST be used exactly as specified (case-sensitive)
- ✅ **REQUIRED:** `Default` MUST be the first story
- ❌ **FORBIDDEN:** Variations of canonical names (`VariantsMatrix`, `AllStates`, `SizeMatrix`, `StateVariations`)
- ❌ **FORBIDDEN:** Missing canonical stories when required
- ❌ **FORBIDDEN:** More than 5 use case stories

### Story Order

Stories MUST appear in this exact order:

1. `Default` (always first)
2. `SizesGallery` (if component has `size` prop)
3. `Matrix` (if component has both `size` AND `variant` props)
4. `States` (if component has state props)
5. `LongContent` (if overlay component)
6. Use case stories (2-5 stories, alphabetical order)

---

## 3. Documentation Standard

### Meta Documentation

**REQUIRED structure:**

```typescript
const meta: Meta<typeof Component> = {
  title: "UI / {Layer} / {ComponentName}",
  component: Component,
  parameters: {
    layout: "{layout}", // See Layout Standard below
    docs: {
      description: {
        component: "{1-2 sentence component description}",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // All public props with descriptions (see ArgTypes Standard)
  },
};
```

**Requirements:**

- ✅ **REQUIRED:** `title` follows Title Structure Standard
- ✅ **REQUIRED:** `component` references the component
- ✅ **REQUIRED:** `parameters.layout` follows Layout Standard
- ✅ **REQUIRED:** `parameters.docs.description.component` (1-2 sentences)
- ✅ **REQUIRED:** `tags: ["autodocs"]` for automatic documentation generation
- ✅ **REQUIRED:** All public props in `argTypes` with descriptions

### Story Documentation

**REQUIRED structure:**

```typescript
/**
 * {Story description}
 * 
 * {Additional information if needed}
 * Reference: {Authority Contract if canonical story}
 */
export const StoryName: Story = {
  render: () => {
    // Implementation
  },
  parameters: {
    docs: {
      description: {
        story: "{Story description for documentation}",
      },
    },
  },
};
```

**Requirements:**

- ✅ **REQUIRED:** JSDoc comment before each story export
- ✅ **REQUIRED:** `parameters.docs.description.story` for documentation
- ✅ **REQUIRED:** Reference to Authority Contract for canonical stories (Matrix, States, SizesGallery, LongContent)

---

## 4. Layout Standard

### Layout Selection Rules

| Layout | When to Use | Examples |
|--------|-------------|----------|
| `centered` | Interactive components (buttons, inputs, controls) | Button, Checkbox, Input, Switch |
| `padded` | Content components (spinners, badges, alerts) | Spinner, Badge, Alert, Progress |
| `fullscreen` | Overlay components (modals, dialogs, popovers) | Modal, Dialog, Popover, Tooltip |

### Rules

- ✅ **REQUIRED:** Use appropriate layout based on component type
- ✅ **REQUIRED:** Consistent layout for similar component types
- ❌ **FORBIDDEN:** Arbitrary layout selection
- ❌ **FORBIDDEN:** Missing layout parameter

---

## 5. Story Structure Standard

### Default Story

**REQUIRED structure:**

```typescript
/**
 * Default {ComponentName} usage with default props.
 */
export const Default: Story = {
  args: {
    // Default props (usually size="md", variant="primary" or similar)
  },
};
```

**Requirements:**

- ✅ **REQUIRED:** Always the first story
- ✅ **REQUIRED:** Uses default props (no custom render unless necessary)
- ✅ **REQUIRED:** Demonstrates basic component usage

### SizesGallery Story

**REQUIRED structure:**

```typescript
/**
 * SizesGallery story (REQUIRED by VARIANTS_SIZE_CANON)
 * Demonstrates all size variants ({sizes}).
 * Reference: [VARIANTS_SIZE_CANON.md](../architecture/VARIANTS_SIZE_CANON.md)
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes: ComponentSize[] = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"];
    
    return (
      <div className="space-y-lg">
        {sizes.map((size) => (
          <div key={size} className="space-y-sm">
            <h3 className="text-sm font-semibold capitalize">Size: {size}</h3>
            <Component size={size} />
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "**Canonical SizesGallery Story:** Demonstrates all size variants. Required per VARIANTS_SIZE_CANON.md for components with size props.",
      },
    },
  },
};
```

**Requirements:**

- ✅ **REQUIRED:** Only for components with `size` prop
- ✅ **REQUIRED:** Shows all supported sizes
- ✅ **REQUIRED:** Reference to VARIANTS_SIZE_CANON.md in JSDoc
- ✅ **REQUIRED:** Uses component API only (no hardcoded spacing)

### Matrix Story

**REQUIRED structure:**

```typescript
/**
 * Matrix story (REQUIRED by VARIANTS_SIZE_CANON)
 * Demonstrates all variant × size combinations.
 * Reference: [VARIANTS_SIZE_CANON.md](../architecture/VARIANTS_SIZE_CANON.md)
 */
export const Matrix: Story = {
  render: () => {
    const variants: ComponentVariant[] = ["primary", "secondary", "accent"];
    const sizes: ComponentSize[] = ["sm", "md", "lg"];
    
    return (
      <div className="grid grid-cols-4 gap-md">
        <div></div>
        {sizes.map(size => <div key={size} className="text-sm font-semibold">{size}</div>)}
        {variants.map(variant => (
          <React.Fragment key={variant}>
            <div className="text-sm font-semibold capitalize">{variant}</div>
            {sizes.map(size => (
              <Component key={`${variant}-${size}`} variant={variant} size={size} />
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "**Canonical Matrix Story:** Demonstrates all variant × size combinations. Required per VARIANTS_SIZE_CANON.md for components with both size and variant props.",
      },
    },
  },
};
```

**Requirements:**

- ✅ **REQUIRED:** Only for components with **BOTH** `size` **AND** `variant` props
- ✅ **REQUIRED:** Grid layout showing all combinations
- ✅ **REQUIRED:** Reference to VARIANTS_SIZE_CANON.md in JSDoc
- ❌ **FORBIDDEN:** Matrix story for components with only size OR only variant

### States Story

**REQUIRED structure:**

```typescript
/**
 * States story (REQUIRED by VARIANTS_SIZE_CANON)
 * Demonstrates all state variants (default, disabled, loading, error, etc.).
 * Reference: [VARIANTS_SIZE_CANON.md](../architecture/VARIANTS_SIZE_CANON.md)
 */
export const States: Story = {
  render: () => {
    const states = ["default", "disabled", "loading", "error"];
    
    return (
      <div className="flex items-center gap-lg">
        {states.map(state => (
          <div key={state} className="flex flex-col items-center gap-sm">
            <Component 
              {...(state === "disabled" && { disabled: true })}
              {...(state === "loading" && { loading: true })}
              {...(state === "error" && { error: true })}
            />
            <span className="text-xs text-muted-foreground capitalize">{state}</span>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "**Canonical States Story:** Demonstrates all state variants. Required per VARIANTS_SIZE_CANON.md for components with public state props.",
      },
    },
  },
};
```

**Requirements:**

- ✅ **REQUIRED:** Only for components with public state props
- ✅ **REQUIRED:** Shows all supported states
- ✅ **REQUIRED:** Reference to VARIANTS_SIZE_CANON.md in JSDoc

### LongContent Story

**REQUIRED structure:**

```typescript
/**
 * LongContent story (REQUIRED for overlay components)
 * Validates padding and maxWidth token behavior with long text.
 * Reference: [SIZE_MAPPING_SPEC.md](../architecture/SIZE_MAPPING_SPEC.md)
 */
export const LongContent: Story = {
  render: () => {
    return (
      <OverlayComponent>
        <p>
          {Array(100).fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit. ").join("")}
        </p>
      </OverlayComponent>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "**Canonical LongContent Story:** Validates padding and maxWidth token behavior with long text. Required per SIZE_MAPPING_SPEC.md for overlay components.",
      },
    },
  },
};
```

**Requirements:**

- ✅ **REQUIRED:** Only for overlay components (Modal, Dialog, Popover, Tooltip, etc.)
- ✅ **REQUIRED:** Uses long text content to validate token behavior
- ✅ **REQUIRED:** Reference to SIZE_MAPPING_SPEC.md in JSDoc

### Use Case Stories

**REQUIRED structure:**

```typescript
/**
 * {Use case description}
 * Use case: {Real-world scenario description}
 */
export const UseCaseName: Story = {
  render: () => {
    // Real-world usage implementation
  },
  parameters: {
    docs: {
      description: {
        story: "{Use case description for documentation}",
      },
    },
  },
};
```

**Requirements:**

- ✅ **REQUIRED:** Minimum 2, maximum 5 use case stories
- ✅ **REQUIRED:** PascalCase naming (descriptive)
- ✅ **REQUIRED:** JSDoc comment with use case description
- ✅ **REQUIRED:** Real-world usage scenarios (not contrived examples)

---

## 6. ArgTypes Standard

### Requirements

**All public props MUST be documented in argTypes:**

```typescript
argTypes: {
  variant: {
    control: { type: "select" },
    options: ["primary", "secondary", "accent"],
    description: "Component variant style",
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "primary" },
    },
  },
  size: {
    control: { type: "select" },
    options: ["sm", "md", "lg"],
    description: "Component size",
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "md" },
    },
  },
  disabled: {
    control: { type: "boolean" },
    description: "Disable component interaction",
  },
  "aria-label": {
    control: { type: "text" },
    description: "Accessibility label (required if no visual label)",
  },
  // Internal props (hide from controls)
  asChild: {
    control: false,
    description: "Render as child element (Radix Slot) - internal use only",
    table: {
      disable: true,
    },
  },
},
```

### Rules

- ✅ **REQUIRED:** All public props MUST be in argTypes
- ✅ **REQUIRED:** Each argType MUST have `description`
- ✅ **REQUIRED:** Enum props MUST have `options` and `control: { type: "select" }`
- ✅ **REQUIRED:** Boolean props MUST have `control: { type: "boolean" }`
- ✅ **REQUIRED:** Internal props MUST have `control: false` and `table: { disable: true }`
- ✅ **REQUIRED:** Default values MUST be documented in `table.defaultValue`
- ❌ **FORBIDDEN:** Missing public props in argTypes
- ❌ **FORBIDDEN:** Missing descriptions

---

## 7. Examples

### Complete Example: Button Component

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "UI / Primitives / Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button component for user interactions. Supports 6 variants (primary, secondary, accent, outline, ghost, destructive), 3 sizes (sm, md, lg), and icon-only mode via iconOnly prop.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "accent", "outline", "ghost", "destructive"],
      description: "Button variant style",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Button size",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable button interaction",
    },
    asChild: {
      control: false,
      description: "Render as child element (Radix Slot) - internal use only",
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Default button usage with default props (md size, primary variant).
 */
export const Default: Story = {
  args: {
    size: "md",
    variant: "primary",
    children: "Button",
  },
};

/**
 * SizesGallery story (REQUIRED by VARIANTS_SIZE_CANON)
 * Demonstrates all size variants (sm, md, lg).
 * Reference: [VARIANTS_SIZE_CANON.md](../architecture/VARIANTS_SIZE_CANON.md)
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes = ["sm", "md", "lg"];
    
    return (
      <div className="space-y-lg">
        {sizes.map((size) => (
          <div key={size} className="space-y-sm">
            <h3 className="text-sm font-semibold capitalize">Size: {size}</h3>
            <Button size={size}>Button</Button>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "**Canonical SizesGallery Story:** Demonstrates all size variants. Required per VARIANTS_SIZE_CANON.md for components with size props.",
      },
    },
  },
};

/**
 * Matrix story (REQUIRED by VARIANTS_SIZE_CANON)
 * Demonstrates all variant × size combinations.
 * Reference: [VARIANTS_SIZE_CANON.md](../architecture/VARIANTS_SIZE_CANON.md)
 */
export const Matrix: Story = {
  render: () => {
    const variants = ["primary", "secondary", "accent", "outline", "ghost", "destructive"];
    const sizes = ["sm", "md", "lg"];
    
    return (
      <div className="grid grid-cols-4 gap-md">
        <div></div>
        {sizes.map(size => <div key={size} className="text-sm font-semibold">{size}</div>)}
        {variants.map(variant => (
          <React.Fragment key={variant}>
            <div className="text-sm font-semibold capitalize">{variant}</div>
            {sizes.map(size => (
              <Button key={`${variant}-${size}`} variant={variant} size={size}>
                Button
              </Button>
            ))}
          </React.Fragment>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "**Canonical Matrix Story:** Demonstrates all variant × size combinations. Required per VARIANTS_SIZE_CANON.md for components with both size and variant props.",
      },
    },
  },
};

/**
 * States story (REQUIRED by VARIANTS_SIZE_CANON)
 * Demonstrates all state variants (default, disabled).
 * Reference: [VARIANTS_SIZE_CANON.md](../architecture/VARIANTS_SIZE_CANON.md)
 */
export const States: Story = {
  render: () => {
    return (
      <div className="flex items-center gap-lg">
        <div className="flex flex-col items-center gap-sm">
          <Button>Default</Button>
          <span className="text-xs text-muted-foreground">default</span>
        </div>
        <div className="flex flex-col items-center gap-sm">
          <Button disabled>Disabled</Button>
          <span className="text-xs text-muted-foreground">disabled</span>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "**Canonical States Story:** Demonstrates all state variants. Required per VARIANTS_SIZE_CANON.md for components with public state props.",
      },
    },
  },
};

/**
 * WithIcons use case
 * Use case: Button with icons (left, right, both)
 */
export const WithIcons: Story = {
  render: () => {
    return (
      <div className="flex items-center gap-md">
        <Button leftIcon={<IconArrowRight />}>Left Icon</Button>
        <Button rightIcon={<IconCheck />}>Right Icon</Button>
        <Button leftIcon={<IconSearch />} rightIcon={<IconCheck />}>
          Both Icons
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Use case: Button with icons positioned before, after, or both sides of text content.",
      },
    },
  },
};
```

---

## 8. Enforcement

### Pipeline Integration

This standard is **MANDATORY** and enforced in:

- **Component Creation Pipeline (C7)** — Stories MUST comply with this standard
- **Component Review Pipeline (18A STEP 9)** — Stories MUST comply with this standard

### Blocking Conditions

Stories that violate this standard **BLOCK** pipeline progress:

- ❌ Title structure does not follow standard
- ❌ Missing required canonical stories (Default, SizesGallery, Matrix, States, LongContent)
- ❌ Canonical story names are incorrect (case-sensitive)
- ❌ Story order is incorrect
- ❌ Missing JSDoc comments
- ❌ Missing `parameters.docs.description`
- ❌ Missing or incomplete argTypes
- ❌ Layout parameter missing or incorrect

### Verification Checklist

Before completing C7 (Storybook Stories), verify:

- [ ] Title follows format: `UI / {Layer} / {ComponentName}`
- [ ] `Default` story is first
- [ ] `SizesGallery` story exists (if component has `size` prop)
- [ ] `Matrix` story exists (if component has both `size` AND `variant` props)
- [ ] `States` story exists (if component has state props)
- [ ] `LongContent` story exists (if overlay component)
- [ ] Use case stories: minimum 2, maximum 5
- [ ] All stories have JSDoc comments
- [ ] All stories have `parameters.docs.description.story`
- [ ] Layout parameter is correct (centered/padded/fullscreen)
- [ ] All public props are in argTypes with descriptions
- [ ] Internal props are hidden (`control: false`, `table: { disable: true }`)

---

## 9. Related Documents

- [VARIANTS_SIZE_CANON.md](../architecture/VARIANTS_SIZE_CANON.md) — Canonical story names and requirements
- [SIZE_MAPPING_SPEC.md](../architecture/SIZE_MAPPING_SPEC.md) — LongContent story requirements
- [Component Creation Pipeline](../workflows/foundation/COMPONENT_CREATION_PIPELINE.md) — C7 Storybook Stories step
- [ARCHITECTURE_LOCK.md](../architecture/ARCHITECTURE_LOCK.md) — Storybook organization rules

---

## 10. Status

This document is:

- ✅ MANDATORY
- ✅ CANONICAL
- ✅ ENFORCED
- ❌ NOT OPTIONAL
- ❌ NOT A STYLE GUIDE

---

**Last Updated:** 2025-12-28  
**Version:** 1.0  
**Status:** ✅ **ACTIVE**

