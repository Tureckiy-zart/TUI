import type { Meta, StoryObj } from "@storybook/react";
import { Alert } from "./Alert";

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
      options: ["primary", "secondary", "accent", "outline", "ghost", "link", "destructive"],
      description: "Alert variant style",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    title: "Information",
    description: "Here's some useful information for you.",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    title: "Secondary",
    description: "This is a secondary alert.",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
    title: "Success!",
    description: "Operation completed successfully!",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    title: "Error",
    description: "Something went wrong. Please try again.",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    title: "Warning",
    description: "Please review your input before proceeding.",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    title: "Ghost Alert",
    description: "This is a ghost variant alert.",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    title: "Link Alert",
    description: "This is a link variant alert.",
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: "primary",
    description: "This alert doesn't have a title.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-md">
      <Alert variant="primary" title="Primary" description="Primary alert variant." />
      <Alert variant="secondary" title="Secondary" description="Secondary alert variant." />
      <Alert variant="accent" title="Accent" description="Accent alert variant (success)." />
      <Alert variant="outline" title="Outline" description="Outline alert variant." />
      <Alert variant="ghost" title="Ghost" description="Ghost alert variant." />
      <Alert variant="link" title="Link" description="Link alert variant." />
      <Alert
        variant="destructive"
        title="Destructive"
        description="Destructive alert variant (error)."
      />
    </div>
  ),
};
