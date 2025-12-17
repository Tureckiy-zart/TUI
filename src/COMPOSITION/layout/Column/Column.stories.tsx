import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../Box";
import { Column } from "./Column";

const meta: Meta<typeof Column> = {
  title: "Layout/Column",
  component: Column,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Column is a semantic alias for Stack (vertical direction). It provides a more explicit API for vertical layouts. Uses Stack internally. All spacing uses token-based values only.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    spacing: {
      control: { type: "text" },
      description: "Spacing between column items (canonical prop, uses spacing tokens)",
      table: {
        type: { summary: "SpacingValue | ResponsiveValue<SpacingValue>" },
      },
    },
    gap: {
      control: { type: "text" },
      description: "Gap between column items (deprecated, use spacing instead)",
    },
    align: {
      control: { type: "select" },
      options: ["start", "end", "center", "baseline", "stretch"],
      description: "Align items",
    },
    justify: {
      control: { type: "select" },
      options: ["start", "end", "center", "between", "around", "evenly"],
      description: "Justify content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Column>;

export const Default: Story = {
  args: {
    spacing: "md",
    children: (
      <>
        <Box p="sm" bg="muted" radius="sm">
          Item 1
        </Box>
        <Box p="sm" bg="muted" radius="sm">
          Item 2
        </Box>
        <Box p="sm" bg="muted" radius="sm">
          Item 3
        </Box>
      </>
    ),
  },
};

export const WithSpacing: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing: sm</h3>
        <Column spacing="sm">
          <Box p="sm" bg="muted" radius="sm">
            Item 1
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 2
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 3
          </Box>
        </Column>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing: md</h3>
        <Column spacing="md">
          <Box p="sm" bg="muted" radius="sm">
            Item 1
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 2
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 3
          </Box>
        </Column>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing: lg</h3>
        <Column spacing="lg">
          <Box p="sm" bg="muted" radius="sm">
            Item 1
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 2
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 3
          </Box>
        </Column>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different spacing values for Column using token system",
      },
    },
  },
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Align: Start</h3>
        <Column align="start" spacing="md">
          <Box p="sm" bg="muted" radius="sm" className="w-32">
            Item 1
          </Box>
          <Box p="sm" bg="muted" radius="sm" className="w-32">
            Item 2
          </Box>
        </Column>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Align: Center</h3>
        <Column align="center" spacing="md">
          <Box p="sm" bg="muted" radius="sm" className="w-32">
            Item 1
          </Box>
          <Box p="sm" bg="muted" radius="sm" className="w-32">
            Item 2
          </Box>
        </Column>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Justify: Between</h3>
        <Column justify="between" spacing="md" className="h-64">
          <Box p="sm" bg="muted" radius="sm">
            Item 1
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 2
          </Box>
        </Column>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Alignment options for Column items",
      },
    },
  },
};

export const SemanticAlias: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Column (semantic alias)</h3>
        <Column spacing="md">
          <Box p="sm" bg="muted" radius="sm">
            Item 1
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 2
          </Box>
        </Column>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Equivalent Stack</h3>
        <Box className="flex flex-col gap-[var(--spacing-md)]">
          <Box p="sm" bg="muted" radius="sm">
            Item 1
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 2
          </Box>
        </Box>
        <p className="mt-sm text-sm text-muted-foreground">
          Column is equivalent to Stack (default vertical direction)
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Column is a semantic alias for Stack (vertical). Use Column when vertical layout intent is important.",
      },
    },
  },
};
