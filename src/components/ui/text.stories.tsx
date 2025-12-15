import { Text } from "@/components/ui/text";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Text component for general-purpose text. Supports 5 sizes (xs, sm, md, lg, xl), 4 weights, and muted state. Uses sans-serif font family.\n\n" +
          "**Note:** This is a low-level text component. For typography system overview, see `Compositions/Typography`. For semantic typography components (Heading, Body, Caption, etc.), see `Components/Typography/`.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Text size (canonical sizes only)",
      table: {
        type: { summary: "xs | sm | md | lg | xl" },
        defaultValue: { summary: "md" },
      },
    },
    weight: {
      control: { type: "select" },
      options: ["normal", "medium", "semibold", "bold"],
      description: "Font weight (canonical weights only)",
      table: {
        type: { summary: "normal | medium | semibold | bold" },
        defaultValue: { summary: "normal" },
      },
    },
    muted: {
      control: { type: "boolean" },
      description: "Muted text color",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    size: "md",
    children: "This is text with default styling.",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-md">
      <Text size="xs">Extra Small Text</Text>
      <Text size="sm">Small Text</Text>
      <Text size="md">Medium Text (Default)</Text>
      <Text size="lg">Large Text</Text>
      <Text size="xl">Extra Large Text</Text>
    </div>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <div className="space-y-md">
      <Text weight="normal">Normal Weight</Text>
      <Text weight="medium">Medium Weight</Text>
      <Text weight="semibold">Semibold Weight</Text>
      <Text weight="bold">Bold Weight</Text>
    </div>
  ),
};

export const Muted: Story = {
  render: () => (
    <div className="space-y-md">
      <Text>Normal Text</Text>
      <Text muted>Muted Text</Text>
    </div>
  ),
};

export const CombinedProps: Story = {
  render: () => (
    <div className="space-y-md">
      <Text size="lg" weight="bold">
        Large Bold Text
      </Text>
      <Text size="sm" weight="medium" muted>
        Small Medium Muted Text
      </Text>
      <Text size="xl" weight="semibold">
        Extra Large Semibold Text
      </Text>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <Text size="lg" weight="semibold" className="mb-xs">
          Section Title
        </Text>
        <Text size="md" muted>
          This is supporting text that provides additional context or description.
        </Text>
      </div>
      <div>
        <Text size="sm" weight="medium" className="mb-xs">
          Label Text
        </Text>
        <Text size="xs" muted>
          Helper text or additional information.
        </Text>
      </div>
    </div>
  ),
};
