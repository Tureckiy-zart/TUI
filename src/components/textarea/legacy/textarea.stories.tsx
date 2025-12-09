"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./textarea";

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Textarea component for multi-line text input. Supports 3 sizes and 3 states (default, error, disabled) with token-driven styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Textarea size",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    state: {
      control: { type: "select" },
      options: ["default", "error", "disabled"],
      description: "Textarea state",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text",
    },
    rows: {
      control: { type: "number" },
      description: "Number of visible rows",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable textarea interaction",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter your message...",
    rows: 4,
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    placeholder: "Small textarea",
    rows: 3,
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    placeholder: "Medium textarea",
    rows: 4,
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    placeholder: "Large textarea",
    rows: 5,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Textarea size="sm" placeholder="Small textarea" rows={3} />
      <Textarea size="md" placeholder="Medium textarea" rows={4} />
      <Textarea size="lg" placeholder="Large textarea" rows={5} />
    </div>
  ),
};

export const Error: Story = {
  args: {
    state: "error",
    placeholder: "Textarea with error",
    defaultValue: "Invalid content",
    rows: 4,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled textarea",
    defaultValue: "Disabled content",
    rows: 4,
  },
};

export const AllStates: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Textarea state="default" placeholder="Default state" rows={3} />
      <Textarea state="error" placeholder="Error state" defaultValue="Invalid" rows={3} />
      <Textarea state="disabled" placeholder="Disabled state" disabled rows={3} />
    </div>
  ),
};

export const WithValue: Story = {
  args: {
    defaultValue: "Pre-filled content\nwith multiple lines",
    rows: 4,
  },
};

export const LongContent: Story = {
  args: {
    defaultValue:
      "This is a longer textarea with multiple lines of content to demonstrate how it handles longer text input. The textarea will automatically resize vertically as needed.",
    rows: 6,
  },
};
