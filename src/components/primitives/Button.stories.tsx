"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button component for user interactions. Supports 5 variants and 4 sizes with icon slot support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
      description: "Button variant style",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "icon"],
      description: "Button size",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable button interaction",
    },
    leftIcon: {
      control: false,
      description: "Icon displayed before the button content",
    },
    rightIcon: {
      control: false,
      description: "Icon displayed after the button content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-md">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  ),
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
};

export const IconSize: Story = {
  args: {
    size: "icon",
    children: "🚀",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🚀</Button>
    </div>
  ),
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: "🚀",
    children: "Launch",
  },
};

export const WithRightIcon: Story = {
  args: {
    rightIcon: "→",
    children: "Continue",
  },
};

export const WithBothIcons: Story = {
  args: {
    leftIcon: "📧",
    rightIcon: "→",
    children: "Send Email",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

export const DisabledVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-md">
      <Button variant="primary" disabled>
        Primary
      </Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="destructive" disabled>
        Destructive
      </Button>
    </div>
  ),
};
