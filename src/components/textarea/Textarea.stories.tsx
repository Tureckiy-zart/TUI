"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Textarea component for multi-line text input. Supports 5 variants, 5 sizes, 4 states (default, disabled, error, success), character counter, and full accessibility with token-driven styling using CSS variables.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "outline", "ghost", "destructive"],
      description: "Textarea variant style",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "outline" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Textarea size",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    state: {
      control: { type: "select" },
      options: ["default", "disabled", "error", "success"],
      description: "Textarea state",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    fullWidth: {
      control: { type: "boolean" },
      description: "Whether textarea should take full width",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
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
    maxLength: {
      control: { type: "number" },
      description: "Maximum character length",
    },
    showCharacterCount: {
      control: { type: "boolean" },
      description: "Show character counter",
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

export const AllSizes: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Textarea size="xs" placeholder="Extra small textarea" rows={3} />
      <Textarea size="sm" placeholder="Small textarea" rows={3} />
      <Textarea size="md" placeholder="Medium textarea" rows={4} />
      <Textarea size="lg" placeholder="Large textarea" rows={5} />
      <Textarea size="xl" placeholder="Extra large textarea" rows={6} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Textarea variant="primary" placeholder="Primary variant" rows={3} />
      <Textarea variant="secondary" placeholder="Secondary variant" rows={3} />
      <Textarea variant="outline" placeholder="Outline variant" rows={3} />
      <Textarea variant="ghost" placeholder="Ghost variant" rows={3} />
      <Textarea variant="destructive" placeholder="Destructive variant" rows={3} />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Textarea state="default" placeholder="Default state" rows={3} />
      <Textarea state="error" placeholder="Error state" defaultValue="Invalid value" rows={3} />
      <Textarea state="success" placeholder="Success state" defaultValue="Valid value" rows={3} />
      <Textarea state="disabled" placeholder="Disabled state" disabled rows={3} />
    </div>
  ),
};

export const WithCharacterCount: Story = {
  args: {
    placeholder: "Enter your message...",
    rows: 4,
    maxLength: 200,
    showCharacterCount: true,
  },
};

export const Error: Story = {
  args: {
    state: "error",
    placeholder: "Textarea with error",
    defaultValue: "Invalid content",
    rows: 4,
  },
};

export const Success: Story = {
  args: {
    state: "success",
    placeholder: "Textarea with success",
    defaultValue: "Valid content",
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

export const CharacterCountWithMaxLength: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Textarea
        placeholder="Type here..."
        rows={4}
        maxLength={100}
        showCharacterCount
        defaultValue="This is some initial text"
      />
      <Textarea
        placeholder="Type here..."
        rows={4}
        maxLength={50}
        showCharacterCount
        defaultValue="This text exceeds the maximum length limit and should show error styling"
      />
    </div>
  ),
};

export const Accessibility: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <div>
        <Textarea
          placeholder="Input with error"
          state="error"
          aria-invalid={true}
          aria-describedby="error-message"
          rows={3}
        />
        <p id="error-message" className="mt-1 text-sm text-[hsl(var(--destructive))]">
          This field is required
        </p>
      </div>
      <div>
        <Textarea
          placeholder="Input with success"
          state="success"
          aria-describedby="success-message"
          rows={3}
        />
        <p id="success-message" className="mt-1 text-sm text-[hsl(var(--semantic-success))]">
          Value is valid
        </p>
      </div>
    </div>
  ),
};

export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Textarea variant="outline" placeholder="Outline in dark mode" rows={3} />
      <Textarea variant="primary" placeholder="Primary in dark mode" rows={3} />
      <Textarea variant="secondary" placeholder="Secondary in dark mode" rows={3} />
    </div>
  ),
};

export const LightMode: Story = {
  parameters: {
    backgrounds: { default: "light" },
  },
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Textarea variant="outline" placeholder="Outline in light mode" rows={3} />
      <Textarea variant="primary" placeholder="Primary in light mode" rows={3} />
      <Textarea variant="secondary" placeholder="Secondary in light mode" rows={3} />
    </div>
  ),
};

export const Comprehensive: Story = {
  render: () => (
    <div className="flex w-full max-w-2xl flex-col gap-lg">
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">All Variants</h3>
        <Textarea variant="primary" placeholder="Primary variant" rows={3} />
        <Textarea variant="secondary" placeholder="Secondary variant" rows={3} />
        <Textarea variant="outline" placeholder="Outline variant" rows={3} />
        <Textarea variant="ghost" placeholder="Ghost variant" rows={3} />
        <Textarea variant="destructive" placeholder="Destructive variant" rows={3} />
      </div>
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">All Sizes</h3>
        <Textarea size="xs" placeholder="Extra small" rows={2} />
        <Textarea size="sm" placeholder="Small" rows={3} />
        <Textarea size="md" placeholder="Medium" rows={4} />
        <Textarea size="lg" placeholder="Large" rows={5} />
        <Textarea size="xl" placeholder="Extra large" rows={6} />
      </div>
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">All States</h3>
        <Textarea state="default" placeholder="Default state" rows={3} />
        <Textarea state="error" placeholder="Error state" defaultValue="Error value" rows={3} />
        <Textarea
          state="success"
          placeholder="Success state"
          defaultValue="Success value"
          rows={3}
        />
        <Textarea state="disabled" placeholder="Disabled state" disabled rows={3} />
      </div>
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">With Character Counter</h3>
        <Textarea
          placeholder="Type here..."
          rows={4}
          maxLength={200}
          showCharacterCount
          defaultValue="Initial text"
        />
      </div>
    </div>
  ),
};
