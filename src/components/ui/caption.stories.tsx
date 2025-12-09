import { Caption } from "@/components/ui/caption";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Caption> = {
  title: "Components/Typography/Caption",
  component: Caption,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Caption component for small text, labels, and captions. Uses the smallest size (xs), tight line height, and muted state by default. Supports 2 weights.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    weight: {
      control: { type: "select" },
      options: ["normal", "medium"],
      description: "Font weight (canonical weights only)",
      table: {
        type: { summary: "normal | medium" },
        defaultValue: { summary: "normal" },
      },
    },
    muted: {
      control: { type: "boolean" },
      description: "Muted text color (default: true)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Caption>;

export const Default: Story = {
  args: {
    weight: "normal",
    muted: true,
    children: "This is caption text with default styling.",
  },
};

export const AllWeights: Story = {
  render: () => (
    <div className="space-y-sm">
      <Caption weight="normal">Normal weight caption.</Caption>
      <Caption weight="medium">Medium weight caption.</Caption>
    </div>
  ),
};

export const MutedStates: Story = {
  render: () => (
    <div className="space-y-sm">
      <Caption muted>Muted caption (default).</Caption>
      <Caption muted={false}>Non-muted caption.</Caption>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-md">
      <div>
        <h3 className="mb-xs text-lg font-semibold">Image Caption</h3>
        <img
          src="https://via.placeholder.com/400x200"
          alt="Placeholder"
          className="mb-xs rounded-md"
        />
        <Caption>This is a caption for the image above.</Caption>
      </div>
      <div>
        <p className="mb-xs text-base">Form Field Label</p>
        <Caption>This is a helper text or caption for a form field.</Caption>
      </div>
      <div>
        <p className="mb-xs text-base">Metadata</p>
        <Caption>Published on January 1, 2024 • 5 min read</Caption>
      </div>
    </div>
  ),
};
