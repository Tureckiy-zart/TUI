import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../Box";
import { Row } from "./Row";

const meta: Meta<typeof Row> = {
  title: "Foundation Locked/Composition/Layout/Row",
  component: Row,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Row is a semantic alias for Stack with horizontal direction. It provides a more explicit API for horizontal layouts. Uses Stack internally with direction='horizontal'. All spacing uses token-based values only.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    spacing: {
      control: { type: "text" },
      description: "Spacing between row items (canonical prop, uses spacing tokens)",
      table: {
        type: { summary: "SpacingValue | ResponsiveValue<SpacingValue>" },
      },
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
type Story = StoryObj<typeof Row>;

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
        <Row spacing="sm">
          <Box p="sm" bg="muted" radius="sm">
            Item 1
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 2
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 3
          </Box>
        </Row>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing: md</h3>
        <Row spacing="md">
          <Box p="sm" bg="muted" radius="sm">
            Item 1
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 2
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 3
          </Box>
        </Row>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing: lg</h3>
        <Row spacing="lg">
          <Box p="sm" bg="muted" radius="sm">
            Item 1
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 2
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 3
          </Box>
        </Row>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different spacing values for Row using token system",
      },
    },
  },
};

export const Alignment: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Align: Start</h3>
        <Row align="start" spacing="md" className="h-32">
          <Box p="sm" bg="muted" radius="sm">
            Item 1
          </Box>
          <Box p="md" bg="muted" radius="sm">
            Item 2
          </Box>
        </Row>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Align: Center</h3>
        <Row align="center" spacing="md" className="h-32">
          <Box p="sm" bg="muted" radius="sm">
            Item 1
          </Box>
          <Box p="md" bg="muted" radius="sm">
            Item 2
          </Box>
        </Row>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Justify: Between</h3>
        <Row justify="between" spacing="md">
          <Box p="sm" bg="muted" radius="sm">
            Item 1
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 2
          </Box>
        </Row>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Alignment options for Row items",
      },
    },
  },
};

export const SemanticAlias: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Row (semantic alias)</h3>
        <Row spacing="md">
          <Box p="sm" bg="muted" radius="sm">
            Item 1
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 2
          </Box>
        </Row>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Equivalent Stack</h3>
        <Box className="flex flex-row gap-[var(--spacing-md)]">
          <Box p="sm" bg="muted" radius="sm">
            Item 1
          </Box>
          <Box p="sm" bg="muted" radius="sm">
            Item 2
          </Box>
        </Box>
        <p className="mt-sm text-sm text-muted-foreground">
          Row is equivalent to Stack with direction="horizontal"
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Row is a semantic alias for Stack(direction='horizontal'). Use Row when horizontal layout intent is important.",
      },
    },
  },
};
