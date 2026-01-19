"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/PRIMITIVES/Button/Button";
import { ButtonGroup } from "./ButtonGroup";

/**
 * ButtonGroup Storybook
 *
 * Semantic and behavioral grouping of multiple Button components.
 * Provides layout alignment, shared size/variant propagation, and accessibility semantics.
 *
 * @status NEW COMPONENT (2025-12-19)
 * @layer COMPOSITION
 * @category actions
 *
 * Stories Structure:
 * - Horizontal: Horizontal grouping with different variants
 * - Vertical: Vertical grouping
 * - Sizes: Size propagation demonstration (sm, md, lg)
 * - Variants: Variant propagation demonstration
 * - Spacing: Different spacing values
 * - Disabled: Disabled state propagation
 * - Mixed: Combinations (different sizes, overrides)
 */

const meta: Meta<typeof ButtonGroup> = {
  title: "UI / Composition / Actions / ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          'ButtonGroup is a composition component that groups multiple Button components for semantic and behavioral consistency. It provides layout alignment (horizontal/vertical), shared prop propagation (size, variant, disabled), and accessibility semantics (role="group").',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "Layout orientation - horizontal or vertical",
      table: {
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: '"horizontal"' },
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Size propagated to child Button components (GlobalSize)",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "accent", "outline", "ghost", "destructive"],
      description: "Variant propagated to child Button components",
      table: {
        type: { summary: "ButtonVariant" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disabled state propagated to child Button components",
      table: {
        type: { summary: "boolean" },
      },
    },
    spacing: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Spacing between buttons (token-based)",
      table: {
        type: { summary: "SpacingValue" },
        defaultValue: { summary: '"sm"' },
      },
    },
    align: {
      control: { type: "select" },
      options: ["start", "end", "center", "baseline", "stretch"],
      description: "Align items (from Stack)",
      table: {
        type: { summary: '"start" | "end" | "center" | "baseline" | "stretch"' },
      },
    },
    justify: {
      control: { type: "select" },
      options: ["start", "end", "center", "between", "around", "evenly"],
      description: "Justify content (from Stack)",
      table: {
        type: { summary: '"start" | "end" | "center" | "between" | "around" | "evenly"' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

/**
 * Default Story
 *
 * Default ButtonGroup usage with default props.
 * Shows basic horizontal grouping with default spacing.
 */
export const Default: Story = {
  render: () => (
    <ButtonGroup>
      <Button>Save</Button>
      <Button>Cancel</Button>
      <Button>Delete</Button>
    </ButtonGroup>
  ),
  parameters: {
    docs: {
      description: {
        story: "Default ButtonGroup usage with default props (horizontal orientation, sm spacing).",
      },
    },
  },
};

/**
 * Horizontal Story
 *
 * Displays horizontal ButtonGroup with different variants.
 * Shows default horizontal layout behavior.
 *
 * @axis orientation
 * @values horizontal
 */
export const Horizontal: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-md text-sm font-medium">Primary Variant</h3>
        <ButtonGroup variant="primary">
          <Button>Save</Button>
          <Button>Cancel</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Outline Variant</h3>
        <ButtonGroup variant="outline">
          <Button>Edit</Button>
          <Button>Share</Button>
          <Button>Export</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Ghost Variant</h3>
        <ButtonGroup variant="ghost">
          <Button>Option 1</Button>
          <Button>Option 2</Button>
          <Button>Option 3</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Horizontal ButtonGroup layout with different variants. Buttons are arranged in a row with spacing between them.",
      },
    },
  },
};

/**
 * Vertical Story
 *
 * Displays vertical ButtonGroup layout.
 * Shows vertical orientation behavior via CSS flex-direction.
 *
 * @axis orientation
 * @values vertical
 */
export const Vertical: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-md text-sm font-medium">Vertical Primary</h3>
        <ButtonGroup orientation="vertical" variant="primary">
          <Button>Save</Button>
          <Button>Cancel</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Vertical Outline</h3>
        <ButtonGroup orientation="vertical" variant="outline">
          <Button>Edit</Button>
          <Button>Share</Button>
          <Button>Export</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Vertical ButtonGroup layout. Buttons are arranged in a column with spacing between them. Orientation is conveyed visually via CSS flex-direction.",
      },
    },
  },
};

/**
 * Sizes Story
 *
 * Demonstrates size propagation from ButtonGroup to child Buttons.
 * Shows how size prop affects all buttons in the group.
 *
 * @axis size
 * @values sm, md, lg
 */
export const Sizes: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-md text-sm font-medium">Small (sm)</h3>
        <ButtonGroup size="sm" variant="primary">
          <Button>Save</Button>
          <Button>Cancel</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Medium (md)</h3>
        <ButtonGroup size="md" variant="primary">
          <Button>Save</Button>
          <Button>Cancel</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Large (lg)</h3>
        <ButtonGroup size="lg" variant="primary">
          <Button>Save</Button>
          <Button>Cancel</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Size propagation demonstration. ButtonGroup size prop is propagated to all child Button components. Note: Button components currently require explicit size prop - Context propagation is ready for future Button enhancement.",
      },
    },
  },
};

/**
 * Variants Story
 *
 * Demonstrates variant propagation from ButtonGroup to child Buttons.
 * Shows how variant prop affects all buttons in the group.
 *
 * @axis variant
 * @values primary, secondary, accent, outline, ghost, destructive
 */
export const Variants: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-md text-sm font-medium">Primary</h3>
        <ButtonGroup variant="primary">
          <Button>Save</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Secondary</h3>
        <ButtonGroup variant="secondary">
          <Button>Save</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Accent</h3>
        <ButtonGroup variant="accent">
          <Button>Save</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Outline</h3>
        <ButtonGroup variant="outline">
          <Button>Save</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Ghost</h3>
        <ButtonGroup variant="ghost">
          <Button>Save</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Destructive</h3>
        <ButtonGroup variant="destructive">
          <Button>Delete</Button>
          <Button>Cancel</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Variant propagation demonstration. ButtonGroup variant prop is propagated to all child Button components. Note: Button components currently require explicit variant prop - Context propagation is ready for future Button enhancement.",
      },
    },
  },
};

/**
 * Spacing Story
 *
 * Demonstrates different spacing values between buttons.
 * Shows token-based spacing (xs, sm, md, lg, xl).
 *
 * @axis spacing
 * @values xs, sm, md, lg, xl
 */
export const Spacing: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-md text-sm font-medium">Extra Small (xs)</h3>
        <ButtonGroup spacing="xs" variant="primary">
          <Button>Save</Button>
          <Button>Cancel</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Small (sm) - Default</h3>
        <ButtonGroup spacing="sm" variant="primary">
          <Button>Save</Button>
          <Button>Cancel</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Medium (md)</h3>
        <ButtonGroup spacing="md" variant="primary">
          <Button>Save</Button>
          <Button>Cancel</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Large (lg)</h3>
        <ButtonGroup spacing="lg" variant="primary">
          <Button>Save</Button>
          <Button>Cancel</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Extra Large (xl)</h3>
        <ButtonGroup spacing="xl" variant="primary">
          <Button>Save</Button>
          <Button>Cancel</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Spacing demonstration. Different spacing values (xs, sm, md, lg, xl) control the gap between buttons. Uses token-based spacing values from Spacing Authority.",
      },
    },
  },
};

/**
 * Disabled Story
 *
 * Demonstrates disabled state propagation from ButtonGroup to child Buttons.
 * Shows how disabled prop affects all buttons in the group.
 *
 * @axis state
 * @values disabled
 */
export const Disabled: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-md text-sm font-medium">Group Disabled</h3>
        <ButtonGroup disabled variant="primary">
          <Button>Save</Button>
          <Button>Cancel</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Group Enabled (for comparison)</h3>
        <ButtonGroup variant="primary">
          <Button>Save</Button>
          <Button>Cancel</Button>
          <Button>Delete</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Disabled state propagation demonstration. ButtonGroup disabled prop is propagated to all child Button components. Note: Button components currently require explicit disabled prop - Context propagation is ready for future Button enhancement.",
      },
    },
  },
};

/**
 * Mixed Story
 *
 * Demonstrates combinations and prop precedence.
 * Shows how individual Button props override ButtonGroup props.
 *
 * @axis combination
 * @values mixed
 */
export const Mixed: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-md text-sm font-medium">Size Override</h3>
        <p className="mb-md text-xs text-[hsl(var(--tm-text-muted))]">
          Group size is md, but individual buttons can override
        </p>
        <ButtonGroup size="md" variant="primary">
          <Button size="sm">Small</Button>
          <Button>Medium (inherited)</Button>
          <Button size="lg">Large</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Variant Override</h3>
        <p className="mb-md text-xs text-[hsl(var(--tm-text-muted))]">
          Group variant is primary, but individual buttons can override
        </p>
        <ButtonGroup variant="primary">
          <Button variant="outline">Outline</Button>
          <Button>Primary (inherited)</Button>
          <Button variant="destructive">Destructive</Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Mixed Sizes and Variants</h3>
        <p className="mb-md text-xs text-[hsl(var(--tm-text-muted))]">
          Complex combination with different sizes and variants
        </p>
        <ButtonGroup spacing="md">
          <Button size="sm" variant="primary">
            Small Primary
          </Button>
          <Button size="md" variant="outline">
            Medium Outline
          </Button>
          <Button size="lg" variant="ghost">
            Large Ghost
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Vertical with Alignment</h3>
        <p className="mb-md text-xs text-[hsl(var(--tm-text-muted))]">
          Vertical layout with center alignment
        </p>
        <ButtonGroup orientation="vertical" align="center" spacing="md" variant="outline">
          <Button>Option 1</Button>
          <Button>Option 2</Button>
          <Button>Option 3</Button>
        </ButtonGroup>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Mixed combinations demonstration. Shows prop precedence: individual Button props override ButtonGroup props. Demonstrates various combinations of sizes, variants, orientations, and alignments.",
      },
    },
  },
};
