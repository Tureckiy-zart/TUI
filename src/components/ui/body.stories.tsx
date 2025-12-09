import { Body } from "@/components/ui/body";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Body> = {
  title: "Components/Typography/Body",
  component: Body,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Body component for body text and paragraphs. Supports 2 sizes (md, lg), 4 weights, and muted state. Uses relaxed line height for readability.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["md", "lg"],
      description: "Body text size (canonical sizes only)",
      table: {
        type: { summary: "md | lg" },
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
type Story = StoryObj<typeof Body>;

export const Default: Story = {
  args: {
    size: "md",
    children: "This is body text with default styling.",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-md">
      <Body size="md">
        Medium body text. This is the default size for body content. It provides good readability
        with relaxed line height.
      </Body>
      <Body size="lg">
        Large body text. This size is useful for emphasis or when you need slightly larger body
        text. It maintains the same relaxed line height for comfortable reading.
      </Body>
    </div>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <div className="space-y-md">
      <Body weight="normal">Normal weight body text.</Body>
      <Body weight="medium">Medium weight body text.</Body>
      <Body weight="semibold">Semibold weight body text.</Body>
      <Body weight="bold">Bold weight body text.</Body>
    </div>
  ),
};

export const Muted: Story = {
  render: () => (
    <div className="space-y-md">
      <Body>Normal body text.</Body>
      <Body muted>Muted body text.</Body>
    </div>
  ),
};

export const ParagraphExample: Story = {
  render: () => (
    <div className="space-y-md">
      <Body>
        This is a paragraph with normal body text. It demonstrates how the Body component renders
        text with proper spacing and line height for readability.
      </Body>
      <Body>
        This is another paragraph to show the spacing between paragraphs. The Body component uses
        relaxed line height for comfortable reading.
      </Body>
    </div>
  ),
};
