import { Heading } from "@/components/ui/heading";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Heading> = {
  title: "Components/Typography/Heading",
  component: Heading,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Heading component for semantic headings (h1-h6). Supports 6 levels, 4 weight variants, and muted state. Uses display font family for levels 1-2.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
      description: "Heading level (1-6)",
      table: {
        type: { summary: "1 | 2 | 3 | 4 | 5 | 6" },
        defaultValue: { summary: "1" },
      },
    },
    weight: {
      control: { type: "select" },
      options: ["normal", "medium", "semibold", "bold"],
      description: "Font weight (canonical weights only)",
      table: {
        type: { summary: "normal | medium | semibold | bold" },
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
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    level: 1,
    children: "Heading 1",
  },
};

export const AllLevels: Story = {
  render: () => (
    <div className="space-y-md">
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
      <Heading level={5}>Heading Level 5</Heading>
      <Heading level={6}>Heading Level 6</Heading>
    </div>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <div className="space-y-md">
      <Heading level={2} weight="normal">
        Normal Weight
      </Heading>
      <Heading level={2} weight="medium">
        Medium Weight
      </Heading>
      <Heading level={2} weight="semibold">
        Semibold Weight
      </Heading>
      <Heading level={2} weight="bold">
        Bold Weight
      </Heading>
    </div>
  ),
};

export const Muted: Story = {
  render: () => (
    <div className="space-y-md">
      <Heading level={2}>Normal Heading</Heading>
      <Heading level={2} muted>
        Muted Heading
      </Heading>
    </div>
  ),
};

export const CustomElement: Story = {
  render: () => (
    <div className="space-y-md">
      <Heading level={1} as="h2">
        Level 1 styled, but rendered as h2
      </Heading>
      <Heading level={3} as="h1">
        Level 3 styled, but rendered as h1
      </Heading>
    </div>
  ),
};
