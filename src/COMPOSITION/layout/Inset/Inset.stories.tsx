import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../Box";
import { Stack } from "../Stack";
import { Inset } from "./Inset";

const meta: Meta<typeof Inset> = {
  title: "UI / Extension / Inset",
  component: Inset,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Inset provides canonical inner spacing wrapper for any content without controlling layout direction, alignment, or gap between children. A thin layout primitive for inner spacing only.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    padding: {
      control: { type: "text" },
      description:
        "Padding (all sides) - token-based spacing values (xs, sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl)",
      table: {
        type: { summary: "SpacingToken | Responsive<SpacingToken>" },
      },
    },
    children: {
      control: false,
      description: "Content to wrap with inner spacing",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    className: {
      control: false,
      table: {
        disable: true,
      },
    },
    style: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Inset>;

/**
 * Default Inset usage with padding.
 * Demonstrates basic inner spacing wrapper functionality.
 */
export const Default: Story = {
  args: {
    padding: "md",
    children: "Content with inner spacing",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default Inset usage with padding. Demonstrates basic inner spacing wrapper functionality.",
      },
    },
  },
};

/**
 * Inset wrapping content with different padding sizes.
 * Shows how Inset applies consistent inner spacing.
 */
export const WrappingContent: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: xs</h3>
        <Inset padding="xs" className="border border-[hsl(var(--tm-border-default))]">
          Content with extra small padding
        </Inset>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: sm</h3>
        <Inset padding="sm" className="border border-[hsl(var(--tm-border-default))]">
          Content with small padding
        </Inset>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: md</h3>
        <Inset padding="md" className="border border-[hsl(var(--tm-border-default))]">
          Content with medium padding
        </Inset>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: lg</h3>
        <Inset padding="lg" className="border border-[hsl(var(--tm-border-default))]">
          Content with large padding
        </Inset>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: xl</h3>
        <Inset padding="xl" className="border border-[hsl(var(--tm-border-default))]">
          Content with extra large padding
        </Inset>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Inset wrapping content with different padding sizes. Shows how Inset applies consistent inner spacing.",
      },
    },
  },
};

/**
 * Inset wrapping Stack component.
 * Demonstrates composition with layout components.
 */
export const WrappingStack: Story = {
  render: () => (
    <Inset padding="lg" className="border border-[hsl(var(--tm-border-default))]">
      <Stack direction="vertical" spacing="md">
        <Box px="sm" py="sm" className="bg-[hsl(var(--tm-muted))]">
          Stack item 1
        </Box>
        <Box px="sm" py="sm" className="bg-[hsl(var(--tm-muted))]">
          Stack item 2
        </Box>
        <Box px="sm" py="sm" className="bg-[hsl(var(--tm-muted))]">
          Stack item 3
        </Box>
      </Stack>
    </Inset>
  ),
  parameters: {
    docs: {
      description: {
        story: "Inset wrapping Stack component. Demonstrates composition with layout components.",
      },
    },
  },
};

/**
 * Inset wrapping Box component with background.
 * Shows how Inset provides inner spacing for visual containers.
 */
export const WrappingBox: Story = {
  render: () => (
    <Inset padding="md" className="border border-[hsl(var(--tm-border-default))]">
      <Box px="lg" py="lg" bg="card" radius="md">
        Box content with inner spacing from Inset
      </Box>
    </Inset>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Inset wrapping Box component with background. Shows how Inset provides inner spacing for visual containers.",
      },
    },
  },
};

/**
 * Responsive padding example.
 * Demonstrates responsive spacing tokens with Inset.
 */
export const ResponsivePadding: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Responsive: sm → lg</h3>
        <Inset
          padding={{ base: "sm", lg: "lg" }}
          className="border border-[hsl(var(--tm-border-default))]"
        >
          Content with responsive padding (sm on mobile, lg on large screens)
        </Inset>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Responsive: md → xl</h3>
        <Inset
          padding={{ base: "md", lg: "xl" }}
          className="border border-[hsl(var(--tm-border-default))]"
        >
          Content with responsive padding (md on mobile, xl on large screens)
        </Inset>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Responsive padding example. Demonstrates responsive spacing tokens with Inset.",
      },
    },
  },
};
