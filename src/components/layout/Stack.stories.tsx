import type { Meta, StoryObj } from "@storybook/react";
import { Stack } from "./Stack";

const meta: Meta<typeof Stack> = {
  title: "Layout/Stack",
  component: Stack,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Token-driven stack layout component with support for vertical/horizontal direction, spacing, alignment, and responsive props using CSS variables.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    gap: {
      control: { type: "text" },
      description: "Gap between stack items (uses spacing tokens)",
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
        <div className="rounded-md border bg-card p-md">Item 1</div>
        <div className="rounded-md border bg-card p-md">Item 2</div>
        <div className="rounded-md border bg-card p-md">Item 3</div>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    gap: 4,
    children: (
      <>
        <div className="rounded-md border bg-card p-md">Item 1</div>
        <div className="rounded-md border bg-card p-md">Item 2</div>
        <div className="rounded-md border bg-card p-md">Item 3</div>
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    gap: 4,
    children: (
      <>
        <div className="rounded-md border bg-card p-md">Item 1</div>
        <div className="rounded-md border bg-card p-md">Item 2</div>
        <div className="rounded-md border bg-card p-md">Item 3</div>
      </>
    ),
  },
};

export const SpacingVariants: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing: xs (1)</h3>
        <Stack gap={1}>
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Stack>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing: md (4)</h3>
        <Stack gap={4}>
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Stack>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing: xl (8)</h3>
        <Stack gap={8}>
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Stack>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing: semantic lg</h3>
        <Stack gap="lg">
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Stack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different spacing values using token system via CSS variables",
      },
    },
  },
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Align: Start</h3>
        <Stack align="start" gap={4}>
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Stack>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Align: Center</h3>
        <Stack align="center" gap={4}>
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Stack>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Justify: Between</h3>
        <Stack justify="between" gap={4} className="h-32">
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
        </Stack>
      </div>
    </div>
  ),
};

export const TokenBasedSpacing: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Layout Stack Token: md</h3>
        <Stack gap="md">
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Stack>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Layout Stack Token: lg</h3>
        <Stack gap="lg">
          <div className="rounded-md border bg-card p-md">Item 1</div>
          <div className="rounded-md border bg-card p-md">Item 2</div>
          <div className="rounded-md border bg-card p-md">Item 3</div>
        </Stack>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Using layout-specific stack spacing tokens",
      },
    },
  },
};

export const AllProps: Story = {
  args: {
    gap: 6,
    align: "center",
    justify: "between",
    children: (
      <>
        <div className="rounded-md border bg-card p-md">Item 1</div>
        <div className="rounded-md border bg-card p-md">Item 2</div>
        <div className="rounded-md border bg-card p-md">Item 3</div>
      </>
    ),
  },
};
