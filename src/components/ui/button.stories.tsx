"use client";
import { IconArrowRight, IconCheck, IconSearch } from "@/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button component for user interactions. Supports 6 variants (primary, secondary, accent, outline, ghost, destructive) and 4 sizes (sm, md, lg, icon) with icon slot support.",
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
      options: ["sm", "md", "lg", "icon"],
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
      control: { type: "boolean" },
      description: "Render as child element (Radix Slot)",
    },
    leftIcon: {
      control: false,
      description: "Icon displayed before the button content",
    },
    rightIcon: {
      control: false,
      description: "Icon displayed after the button content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Variants Story
 *
 * Displays all Button variants simultaneously for visual comparison.
 * All variants use the same size (md) and content for fair comparison.
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Button variant="primary">Button</Button>
      <Button variant="secondary">Button</Button>
      <Button variant="accent">Button</Button>
      <Button variant="outline">Button</Button>
      <Button variant="ghost">Button</Button>
      <Button variant="destructive">Button</Button>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All 6 Button variants displayed side-by-side for visual comparison. Same size and content used for fair comparison.",
      },
    },
  },
};

/**
 * Sizes Story
 *
 * Displays all Button sizes side-by-side.
 * All sizes use the same variant (primary) for fair comparison.
 * Validates intentional size scaling with proportional icon sizing.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-sm text-sm font-semibold">Text Buttons</h3>
        <div className="flex flex-wrap items-center gap-md">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      <div>
        <h3 className="mb-sm text-sm font-semibold">Icon Buttons</h3>
        <div className="flex flex-wrap items-center gap-md">
          <Button size="icon" aria-label="Small icon button">
            <IconSearch />
          </Button>
          <Button size="icon" aria-label="Medium icon button">
            <IconSearch />
          </Button>
          <Button size="icon" aria-label="Large icon button">
            <IconSearch />
          </Button>
        </div>
      </div>
      <div>
        <h3 className="mb-sm text-sm font-semibold">Buttons with Icons</h3>
        <div className="flex flex-wrap items-center gap-md">
          <Button size="sm" leftIcon={<IconSearch />}>
            Small
          </Button>
          <Button size="md" leftIcon={<IconSearch />}>
            Medium
          </Button>
          <Button size="lg" leftIcon={<IconSearch />}>
            Large
          </Button>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        <p>
          <strong>Size Scaling:</strong> Heights, font sizes, padding, icon sizes, and gaps scale
          proportionally across sizes for intentional visual hierarchy.
        </p>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All 4 Button sizes displayed side-by-side. Same variant (primary) used for fair comparison. Validates intentional size scaling with proportional icon sizing.",
      },
    },
  },
};

/**
 * States Story
 *
 * Displays supported button states: default, disabled, and interactive states.
 * Shows all states for primary variant to validate state visibility.
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div className="flex flex-wrap items-center gap-md">
        <Button variant="primary">Default</Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
        <Button variant="primary" aria-pressed="true">
          Active (pressed)
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">
        <p>
          <strong>Default:</strong> Interactive state, ready for user interaction.
        </p>
        <p>
          <strong>Disabled:</strong> Non-interactive state, clearly distinguishable from default.
        </p>
        <p>
          <strong>Active:</strong> Pressed/engaged state, provides clear feedback.
        </p>
        <p className="mt-sm">
          <strong>Hover:</strong> Hover over buttons to see hover state feedback (darker
          background).
        </p>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Button states: default (interactive), disabled (non-interactive), and active (pressed state). Hover over buttons to see hover feedback.",
      },
    },
  },
};

/**
 * All Variants States Story
 *
 * Displays all variants with their states (default, disabled) for comprehensive visual validation.
 * Validates that variants are visually distinct and states are clearly perceivable.
 */
export const AllVariantsStates: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-sm text-sm font-semibold">Default States</h3>
        <div className="flex flex-wrap items-center gap-md">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
      <div>
        <h3 className="mb-sm text-sm font-semibold">Disabled States</h3>
        <div className="flex flex-wrap items-center gap-md">
          <Button variant="primary" disabled>
            Primary
          </Button>
          <Button variant="secondary" disabled>
            Secondary
          </Button>
          <Button variant="accent" disabled>
            Accent
          </Button>
          <Button variant="outline" disabled>
            Outline
          </Button>
          <Button variant="ghost" disabled>
            Ghost
          </Button>
          <Button variant="destructive" disabled>
            Destructive
          </Button>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        <p>
          <strong>Visual Validation:</strong> All variants should be visually distinct. Disabled
          states should be clearly non-interactive but still recognizable. Hover over default states
          to see hover feedback.
        </p>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All Button variants displayed with default and disabled states. Validates visual distinction between variants and clear state feedback.",
      },
    },
  },
};

/**
 * With Icons Story
 *
 * Displays icon support in a single comparative view.
 * Shows buttons with no icon, left icon, right icon, and both icons.
 * Validates icon color inheritance and alignment consistency.
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-sm text-sm font-semibold">Primary Variant</h3>
        <div className="flex flex-wrap items-center gap-md">
          <Button variant="primary">No Icon</Button>
          <Button variant="primary" leftIcon={<IconSearch />}>
            Left Icon
          </Button>
          <Button variant="primary" rightIcon={<IconArrowRight />}>
            Right Icon
          </Button>
          <Button variant="primary" leftIcon={<IconCheck />} rightIcon={<IconArrowRight />}>
            Both Icons
          </Button>
        </div>
      </div>
      <div>
        <h3 className="mb-sm text-sm font-semibold">Outline Variant</h3>
        <div className="flex flex-wrap items-center gap-md">
          <Button variant="outline">No Icon</Button>
          <Button variant="outline" leftIcon={<IconSearch />}>
            Left Icon
          </Button>
          <Button variant="outline" rightIcon={<IconArrowRight />}>
            Right Icon
          </Button>
          <Button variant="outline" leftIcon={<IconCheck />} rightIcon={<IconArrowRight />}>
            Both Icons
          </Button>
        </div>
      </div>
      <div className="text-sm text-muted-foreground">
        <p>
          <strong>Icon Semantics:</strong> Icons inherit variant text color, scale with button size,
          and maintain consistent alignment. Icons are visually integrated, not appended.
        </p>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Icon support demonstration: buttons with no icon, left icon only, right icon only, and both icons. Validates variant-aware icon colors and size-aware icon sizing.",
      },
    },
  },
};

/**
 * Playground Story
 *
 * Interactive sandbox for manual exploration of Button component.
 * All controls are enabled for experimentation.
 *
 * ⚠️ Note: This is a non-canonical story for manual testing only.
 */
export const Playground: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Button",
    disabled: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive playground for exploring Button component. All controls are enabled. This story is for manual testing and does not replace the canonical API documentation stories above.",
      },
    },
  },
};
