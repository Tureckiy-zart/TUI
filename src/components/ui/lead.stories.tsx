import { Lead } from "@/components/ui/lead";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Lead> = {
  title: "Components/Typography/Lead",
  component: Lead,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Lead component for subtitles and introductory text. Supports 2 sizes (lg, xl) and muted state (default: true). Designed for subtitles and lead paragraphs.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["lg", "xl"],
      description: "Lead text size (canonical sizes only)",
      table: {
        type: { summary: "lg | xl" },
        defaultValue: { summary: "lg" },
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
type Story = StoryObj<typeof Lead>;

export const Default: Story = {
  args: {
    size: "lg",
    muted: true,
    children: "This is lead text with default styling.",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-md">
      <Lead size="lg">
        Large lead text. This is the default size for subtitles and introductory paragraphs. It has
        a subtle muted appearance by default.
      </Lead>
      <Lead size="xl">
        Extra large lead text. This size is useful for more prominent subtitles or when you need
        larger introductory text.
      </Lead>
    </div>
  ),
};

export const MutedStates: Story = {
  render: () => (
    <div className="space-y-md">
      <Lead muted>Muted lead text (default).</Lead>
      <Lead muted={false}>Non-muted lead text.</Lead>
    </div>
  ),
};

export const SubtitleExample: Story = {
  render: () => (
    <div className="space-y-lg">
      <h1 className="text-4xl font-bold">Main Heading</h1>
      <Lead size="lg">
        This is a subtitle that provides additional context or description for the main heading. It
        uses the Lead component with default muted styling.
      </Lead>
    </div>
  ),
};
