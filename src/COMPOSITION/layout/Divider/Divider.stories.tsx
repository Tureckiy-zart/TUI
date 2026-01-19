import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./Divider";

const meta: Meta<typeof Divider> = {
  title: "UI / Composition / Layout / Divider",
  component: Divider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Layout component for visually separating sections and content blocks. Supports horizontal and vertical orientations, tone variants, and optional inset padding.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: { type: "select" },
      options: ["horizontal", "vertical"],
      description: "Orientation of the divider",
      table: {
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: '"horizontal"' },
      },
    },
    tone: {
      control: { type: "select" },
      options: ["border", "muted", "primary", "secondary", "accent"],
      description: "Color tone variant",
      table: {
        type: { summary: '"border" | "muted" | "primary" | "secondary" | "accent"' },
        defaultValue: { summary: '"border"' },
      },
    },
    inset: {
      control: { type: "boolean" },
      description:
        "Add inset padding (spacing from edges). false/undefined -> divider spans full container width, true -> divider uses inset padding (token-based spacing).",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

/**
 * Default horizontal divider with border tone.
 * This is the most common usage pattern.
 */
export const Default: Story = {
  args: {
    orientation: "horizontal",
    tone: "border",
    inset: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default horizontal divider with border tone. This is the most common usage pattern.",
      },
    },
  },
};

/**
 * Horizontal divider with border tone (default).
 * Demonstrates basic horizontal divider usage.
 */
export const HorizontalBorder: Story = {
  args: {
    orientation: "horizontal",
    tone: "border",
    inset: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal divider with border tone (default). Demonstrates basic horizontal divider usage.",
      },
    },
  },
};

/**
 * Horizontal divider with muted tone and inset padding.
 * Demonstrates inset pattern for horizontal divider.
 */
export const HorizontalMutedInset: Story = {
  args: {
    orientation: "horizontal",
    tone: "muted",
    inset: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal divider with muted tone and inset padding. Demonstrates inset pattern for horizontal divider.",
      },
    },
  },
};

/**
 * Horizontal divider with primary tone.
 * Demonstrates primary tone variant for horizontal divider.
 */
export const HorizontalPrimary: Story = {
  args: {
    orientation: "horizontal",
    tone: "primary",
    inset: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Horizontal divider with primary tone. Demonstrates primary tone variant for horizontal divider.",
      },
    },
  },
};

/**
 * Vertical divider with border tone.
 * Demonstrates basic vertical divider usage.
 */
export const VerticalBorder: Story = {
  args: {
    orientation: "vertical",
    tone: "border",
    inset: false,
  },
  render: (args) => (
    <div className="flex h-32 items-center">
      <div className="flex-1">Content left</div>
      <Divider {...args} />
      <div className="flex-1">Content right</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Vertical divider with border tone. Demonstrates basic vertical divider usage.",
      },
    },
  },
};

/**
 * Vertical divider with inset padding.
 * Demonstrates inset pattern for vertical divider.
 */
export const VerticalInset: Story = {
  args: {
    orientation: "vertical",
    tone: "border",
    inset: true,
  },
  render: (args) => (
    <div className="flex h-32 items-center">
      <div className="flex-1">Content left</div>
      <Divider {...args} />
      <div className="flex-1">Content right</div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Vertical divider with inset padding. Demonstrates inset pattern for vertical divider.",
      },
    },
  },
};
