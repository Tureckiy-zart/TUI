import { Alert } from "@/components/ui/alert";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "primary", "secondary", "accent", "destructive"],
      description: "Alert variant style (canonical variants per Freeze API)",
      table: {
        type: { summary: "string" },
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
    <div className="space-y-md">
      <Alert variant="default">Default alert variant.</Alert>
      <Alert variant="primary">Primary alert variant.</Alert>
      <Alert variant="secondary">Secondary alert variant.</Alert>
      <Alert variant="accent">Accent alert variant.</Alert>
      <Alert variant="destructive">Destructive alert variant.</Alert>
    </div>
  ),
};
