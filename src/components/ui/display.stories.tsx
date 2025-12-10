import { Display } from "@/components/ui/display";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Display> = {
  title: "Components/Typography/Display",
  component: Display,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Display component for hero sections and large typography. Uses display font family and supports 4 sizes, 4 weights, and muted state.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xl", "2xl", "3xl", "4xl"],
      description: "Display size (canonical sizes only)",
      table: {
        type: { summary: "xl | 2xl | 3xl | 4xl" },
        defaultValue: { summary: "4xl" },
      },
    },
    weight: {
      control: { type: "select" },
      options: ["normal", "medium", "semibold", "bold"],
      description: "Font weight (canonical weights only)",
      table: {
        type: { summary: "normal | medium | semibold | bold" },
        defaultValue: { summary: "bold" },
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
type Story = StoryObj<typeof Display>;

export const Default: Story = {
  args: {
    size: "4xl",
    weight: "bold",
    children: "Display Text",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-md">
      <Display size="xl">Extra Large Display</Display>
      <Display size="2xl">2XL Display</Display>
      <Display size="3xl">3XL Display</Display>
      <Display size="4xl">4XL Display</Display>
    </div>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <div className="space-y-md">
      <Display size="3xl" weight="normal">
        Normal Weight
      </Display>
      <Display size="3xl" weight="medium">
        Medium Weight
      </Display>
      <Display size="3xl" weight="semibold">
        Semibold Weight
      </Display>
      <Display size="3xl" weight="bold">
        Bold Weight
      </Display>
    </div>
  ),
};

export const Muted: Story = {
  render: () => (
    <div className="space-y-md">
      <Display size="3xl">Normal Display</Display>
      <Display size="3xl" muted>
        Muted Display
      </Display>
    </div>
  ),
};

export const HeroExample: Story = {
  render: () => (
    <div className="space-y-lg">
      <Display size="4xl" weight="bold">
        Welcome to Tenerife UI
      </Display>
      <Display size="2xl" weight="medium" muted>
        A modern design system built for the web
      </Display>
    </div>
  ),
};
