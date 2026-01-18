import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../Box";
import { Stack } from "../Stack";
import { Spacer } from "./Spacer";

const meta: Meta<typeof Spacer> = {
  title: "UI / Extension / Spacer",
  component: Spacer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Pure utility component for inserting spacing between elements. Provides single-axis spacing (vertical or horizontal) using spacing tokens only.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["vertical", "horizontal"],
      description:
        "Orientation of the spacer. Vertical creates height spacing, horizontal creates width spacing.",
      table: {
        type: { summary: '"vertical" | "horizontal"' },
        defaultValue: { summary: '"vertical"' },
      },
    },
    size: {
      control: { type: "text" },
      description:
        "Spacing size - token-based (required). Accepts base spacing (0, 1, 2, 4, etc.), semantic spacing (xs, sm, md, lg, xl, etc.), or layout spacing (section-md, container-lg, etc.).",
      table: {
        type: { summary: "SpacingToken" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spacer>;

/**
 * Default Spacer usage with vertical orientation.
 * Demonstrates basic spacing insertion between elements.
 */
export const Default: Story = {
  args: {
    size: "md",
  },
  render: (args) => (
    <div className="flex flex-col items-start">
      <Box px="md" py="sm" className="rounded bg-[hsl(var(--tm-muted))]">
        Item 1
      </Box>
      <Spacer {...args} />
      <Box px="md" py="sm" className="rounded bg-[hsl(var(--tm-muted))]">
        Item 2
      </Box>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Default Spacer usage with vertical orientation. Demonstrates basic spacing insertion between elements.",
      },
    },
  },
};

/**
 * SizesGallery demonstrates all supported spacing sizes.
 * Shows how Spacer works with different spacing tokens.
 */
export const SizesGallery: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Semantic Spacing Tokens</h3>
        <div className="flex flex-col items-start rounded border border-[hsl(var(--tm-border-default))] p-md">
          <Box px="md" py="xs" className="rounded bg-[hsl(var(--tm-muted))] text-sm">
            xs spacing
          </Box>
          <Spacer size="xs" />
          <Box px="md" py="xs" className="rounded bg-[hsl(var(--tm-muted))] text-sm">
            sm spacing
          </Box>
          <Spacer size="sm" />
          <Box px="md" py="xs" className="rounded bg-[hsl(var(--tm-muted))] text-sm">
            md spacing
          </Box>
          <Spacer size="md" />
          <Box px="md" py="xs" className="rounded bg-[hsl(var(--tm-muted))] text-sm">
            lg spacing
          </Box>
          <Spacer size="lg" />
          <Box px="md" py="xs" className="rounded bg-[hsl(var(--tm-muted))] text-sm">
            xl spacing
          </Box>
        </div>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Base Spacing Tokens</h3>
        <div className="flex flex-col items-start rounded border border-[hsl(var(--tm-border-default))] p-md">
          <Box px="md" py="xs" className="rounded bg-[hsl(var(--tm-muted))] text-sm">
            Base 2 (8px)
          </Box>
          <Spacer size={2} />
          <Box px="md" py="xs" className="rounded bg-[hsl(var(--tm-muted))] text-sm">
            Base 4 (16px)
          </Box>
          <Spacer size={4} />
          <Box px="md" py="xs" className="rounded bg-[hsl(var(--tm-muted))] text-sm">
            Base 6 (24px)
          </Box>
          <Spacer size={6} />
          <Box px="md" py="xs" className="rounded bg-[hsl(var(--tm-muted))] text-sm">
            Base 8 (32px)
          </Box>
        </div>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Layout Spacing Tokens</h3>
        <div className="flex flex-col items-start rounded border border-[hsl(var(--tm-border-default))] p-md">
          <Box px="md" py="xs" className="rounded bg-[hsl(var(--tm-muted))] text-sm">
            section-sm
          </Box>
          <Spacer size="section-sm" />
          <Box px="md" py="xs" className="rounded bg-[hsl(var(--tm-muted))] text-sm">
            section-md
          </Box>
          <Spacer size="section-md" />
          <Box px="md" py="xs" className="rounded bg-[hsl(var(--tm-muted))] text-sm">
            section-lg
          </Box>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "SizesGallery demonstrates all supported spacing sizes. Shows how Spacer works with different spacing tokens (semantic, base, layout).",
      },
    },
  },
};

/**
 * Horizontal Spacer demonstrates horizontal orientation.
 * Shows how Spacer creates width-based spacing.
 */
export const HorizontalSpacer: Story = {
  render: () => (
    <div className="flex items-center rounded border border-[hsl(var(--tm-border-default))] p-md">
      <Box px="sm" py="xs" className="rounded bg-[hsl(var(--tm-muted))] text-sm">
        Item 1
      </Box>
      <Spacer orientation="horizontal" size="md" />
      <Box px="sm" py="xs" className="rounded bg-[hsl(var(--tm-muted))] text-sm">
        Item 2
      </Box>
      <Spacer orientation="horizontal" size="lg" />
      <Box px="sm" py="xs" className="rounded bg-[hsl(var(--tm-muted))] text-sm">
        Item 3
      </Box>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal Spacer demonstrates horizontal orientation. Shows how Spacer creates width-based spacing between inline elements.",
      },
    },
  },
};

/**
 * Real-world usage example: Spacing between Stack items.
 * Demonstrates practical use case for Spacer in layout composition.
 */
export const WithStackItems: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Vertical Spacing</h3>
        <div className="rounded border border-[hsl(var(--tm-border-default))] p-md">
          <Box px="md" py="sm" className="rounded bg-[hsl(var(--tm-muted))]">
            Section 1
          </Box>
          <Spacer size="lg" />
          <Box px="md" py="sm" className="rounded bg-[hsl(var(--tm-muted))]">
            Section 2
          </Box>
          <Spacer size="md" />
          <Box px="md" py="sm" className="rounded bg-[hsl(var(--tm-muted))]">
            Section 3
          </Box>
        </div>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">In Stack Composition</h3>
        <Stack
          direction="vertical"
          spacing="sm"
          className="rounded border border-[hsl(var(--tm-border-default))] p-md"
        >
          <Box px="md" py="sm" className="rounded bg-[hsl(var(--tm-muted))]">
            Stack Item 1
          </Box>
          <Spacer size="md" />
          <Box px="md" py="sm" className="rounded bg-[hsl(var(--tm-muted))]">
            Stack Item 2 (with custom spacing via Spacer)
          </Box>
          <Box px="md" py="sm" className="rounded bg-[hsl(var(--tm-muted))]">
            Stack Item 3 (uses Stack spacing)
          </Box>
        </Stack>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Real-world usage example: Spacing between Stack items. Demonstrates practical use case for Spacer in layout composition.",
      },
    },
  },
};

/**
 * Layout spacing tokens usage example.
 * Shows how Spacer works with layout-specific spacing tokens.
 */
export const LayoutSpacingTokens: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Section Spacing</h3>
        <div className="flex flex-col items-start rounded border border-[hsl(var(--tm-border-default))] p-md">
          <Box px="md" py="sm" className="rounded bg-[hsl(var(--tm-muted))]">
            Section Header
          </Box>
          <Spacer size="section-md" />
          <Box px="md" py="sm" className="rounded bg-[hsl(var(--tm-muted))]">
            Section Content
          </Box>
        </div>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Container Spacing</h3>
        <div className="flex flex-col items-start rounded border border-[hsl(var(--tm-border-default))] p-md">
          <Box px="md" py="sm" className="rounded bg-[hsl(var(--tm-muted))]">
            Container Top
          </Box>
          <Spacer size="container-lg" />
          <Box px="md" py="sm" className="rounded bg-[hsl(var(--tm-muted))]">
            Container Bottom
          </Box>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Layout spacing tokens usage example. Shows how Spacer works with layout-specific spacing tokens (section, container, grid, stack, component).",
      },
    },
  },
};
