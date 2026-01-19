import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";

// Helper style for card items with proper text color
const cardItemStyle = { color: "hsl(var(--tm-text-primary))" };

const meta: Meta<typeof Stack> = {
  title: "UI / Composition / Layout / Stack",
  component: Stack,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Stack is the primary layout composition primitive for vertical and horizontal flows. It provides semantic spacing between items and handles flexbox layout composition. Uses Box internally as the base container. The `spacing` prop is the canonical prop for spacing between items.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    spacing: {
      control: { type: "text" },
      description: "Spacing between stack items (canonical prop, uses spacing tokens)",
      table: {
        type: { summary: "SpacingValue | ResponsiveValue<SpacingValue>" },
      },
    },
    align: {
      control: { type: "select" },
      options: ["start", "end", "center", "stretch"],
      description: "Align items",
    },
    justify: {
      control: { type: "select" },
      options: ["start", "end", "center", "between", "around"],
      description: "Justify content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  args: {
    children: (
      <>
        <div
          className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
          style={cardItemStyle}
        >
          Item 1
        </div>
        <div
          className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
          style={cardItemStyle}
        >
          Item 2
        </div>
        <div
          className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
          style={cardItemStyle}
        >
          Item 3
        </div>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    direction: "vertical",
    spacing: "md",
    children: (
      <>
        <div
          className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
          style={cardItemStyle}
        >
          Item 1
        </div>
        <div
          className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
          style={cardItemStyle}
        >
          Item 2
        </div>
        <div
          className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
          style={cardItemStyle}
        >
          Item 3
        </div>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Vertical stack (default direction) with semantic spacing",
      },
    },
  },
};

export const Horizontal: Story = {
  args: {
    direction: "horizontal",
    spacing: "md",
    children: (
      <>
        <div
          className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
          style={cardItemStyle}
        >
          Item 1
        </div>
        <div
          className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
          style={cardItemStyle}
        >
          Item 2
        </div>
        <div
          className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
          style={cardItemStyle}
        >
          Item 3
        </div>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Horizontal stack with semantic spacing",
      },
    },
  },
};

export const SpacingVariants: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing: xs (1)</h3>
        <Stack spacing={1}>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 1
          </div>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 2
          </div>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 3
          </div>
        </Stack>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing: md (4)</h3>
        <Stack spacing={4}>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 1
          </div>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 2
          </div>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 3
          </div>
        </Stack>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing: xl (8)</h3>
        <Stack spacing={8}>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 1
          </div>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 2
          </div>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 3
          </div>
        </Stack>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing: semantic lg</h3>
        <Stack spacing="lg">
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 1
          </div>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 2
          </div>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 3
          </div>
        </Stack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Different spacing values using token system via CSS variables. Uses canonical `spacing` prop.",
      },
    },
  },
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Align: Start</h3>
        <Stack direction="horizontal" align="start" spacing="md">
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 1
          </div>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 2
          </div>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 3
          </div>
        </Stack>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Align: Center</h3>
        <Stack direction="horizontal" align="center" spacing="md">
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 1
          </div>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 2
          </div>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 3
          </div>
        </Stack>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Justify: Between</h3>
        <Stack direction="horizontal" justify="between" spacing="md" className="h-32">
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 1
          </div>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 2
          </div>
        </Stack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Alignment options for Stack items using align and justify props",
      },
    },
  },
};

export const TokenBasedSpacing: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing Token: md</h3>
        <Stack spacing="md">
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 1
          </div>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 2
          </div>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 3
          </div>
        </Stack>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing Token: lg</h3>
        <Stack spacing="lg">
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 1
          </div>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 2
          </div>
          <div
            className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
            style={cardItemStyle}
          >
            Item 3
          </div>
        </Stack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Using semantic spacing tokens with canonical `spacing` prop",
      },
    },
  },
};

export const AllProps: Story = {
  args: {
    direction: "horizontal",
    spacing: "lg",
    align: "center",
    justify: "between",
    children: (
      <>
        <div
          className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
          style={cardItemStyle}
        >
          Item 1
        </div>
        <div
          className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
          style={cardItemStyle}
        >
          Item 2
        </div>
        <div
          className="cursor-pointer rounded-md border bg-[hsl(var(--tm-surface-raised))] p-md tm-motion-hover-lift tm-motion-tap-scale"
          style={cardItemStyle}
        >
          Item 3
        </div>
      </>
    ),
  },
};
