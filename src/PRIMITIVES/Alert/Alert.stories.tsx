import type { Meta, StoryObj } from "@storybook/react";
import { Alert, ALERT_VARIANTS, type AlertVariant } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Primitives / Alert",
  component: Alert,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ALERT_VARIANTS,
      description: "Alert variant style",
      table: {
        type: { summary: "AlertVariant" },
        defaultValue: { summary: "default" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "This is a default alert message.",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Here's some useful information for you.",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Please review your input before proceeding.",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
    children: "Operation completed successfully!",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Something went wrong. Please try again.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      {ALERT_VARIANTS.map((variant) => (
        <Alert key={variant} variant={variant as AlertVariant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)} alert variant.
        </Alert>
      ))}
    </div>
  ),
};
