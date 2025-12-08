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
      options: ["default", "success", "warning", "danger", "info"],
      description: "Alert variant style",
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

export const Success: Story = {
  args: {
    variant: "success",
    children: "Operation completed successfully!",
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    children: "Please review your input before proceeding.",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Something went wrong. Please try again.",
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    children: "Here's some useful information for you.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-md">
      <Alert variant="default">Default alert variant.</Alert>
      <Alert variant="success">Success alert variant.</Alert>
      <Alert variant="warning">Warning alert variant.</Alert>
      <Alert variant="danger">Danger alert variant.</Alert>
      <Alert variant="info">Info alert variant.</Alert>
    </div>
  ),
};
