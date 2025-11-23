import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ThemeSwitch } from "./ThemeSwitch";

const meta: Meta<typeof ThemeSwitch> = {
  title: "Components/ThemeSwitch",
  component: ThemeSwitch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
    },
    variant: {
      control: { type: "select" },
      options: ["default", "outline", "ghost"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-md">
      <ThemeSwitch variant="primary" />
      <ThemeSwitch variant="outline" />
      <ThemeSwitch variant="ghost" />
    </div>
  ),
};
