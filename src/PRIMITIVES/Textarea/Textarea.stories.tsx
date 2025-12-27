"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "./Textarea";

const meta: Meta<typeof Textarea> = {
  title: "UI / Primitives / Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Strict low-level multiline form control primitive. Thin wrapper around native <textarea> element with minimal API. Supports 3 sizes (sm, md, lg), invalid state, and full accessibility with token-driven styling using CSS variables. State styling via native HTML attributes (disabled, aria-invalid).",
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
        type: { summary: "'sm' | 'md' | 'lg'" },
        defaultValue: { summary: "md" },
      },
    },
    invalid: {
      control: { type: "boolean" },
      description: "Invalid state indicator (maps to aria-invalid)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text",
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
  },
};

// Canonical Story: Matrix (sizes)
export const Matrix: Story = {
  render: () => (
    <div className="flex w-full max-w-2xl flex-col gap-lg">
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">Sizes Matrix</h3>
        <div className="flex flex-col gap-md">
          {(["sm", "md", "lg"] as const).map((size) => (
            <div key={size} className="flex flex-col gap-sm">
              <h4 className="text-sm font-medium capitalize">{size} size</h4>
              <Textarea size={size} placeholder={`${size} size textarea`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

// Canonical Story: States (interactive states)
export const States: Story = {
  render: () => (
    <div className="flex w-full max-w-2xl flex-col gap-lg">
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">Interactive States</h3>

        <div className="flex flex-col gap-sm">
          <h4 className="text-sm font-medium">Default State</h4>
          <Textarea placeholder="Default state" />
        </div>

        <div className="flex flex-col gap-sm">
          <h4 className="text-sm font-medium">Invalid State (invalid prop)</h4>
          <Textarea
            invalid
            aria-describedby="error-message-1"
            placeholder="Invalid state"
            defaultValue="Invalid content"
          />
          <p id="error-message-1" className="text-sm text-[hsl(var(--destructive))]">
            This field contains invalid content
          </p>
        </div>

        <div className="flex flex-col gap-sm">
          <h4 className="text-sm font-medium">Invalid State (aria-invalid)</h4>
          <Textarea
            aria-invalid={true}
            aria-describedby="error-message-2"
            placeholder="Invalid state via aria-invalid"
            defaultValue="Invalid content"
          />
          <p id="error-message-2" className="text-sm text-[hsl(var(--destructive))]">
            This field contains invalid content
          </p>
        </div>

        <div className="flex flex-col gap-sm">
          <h4 className="text-sm font-medium">Disabled State</h4>
          <Textarea disabled placeholder="Disabled state" defaultValue="Disabled content" />
        </div>

        <div className="flex flex-col gap-sm">
          <h4 className="text-sm font-medium">Required State</h4>
          <Textarea required placeholder="Required textarea" />
        </div>

        <div className="flex flex-col gap-sm">
          <h4 className="text-sm font-medium">Read-only State</h4>
          <Textarea readOnly defaultValue="Read-only content" />
        </div>
      </div>
    </div>
  ),
};

// Canonical Story: SizesGallery (all sizes with content variations)
export const SizesGallery: Story = {
  render: () => (
    <div className="flex w-full max-w-2xl flex-col gap-lg">
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">Sizes Gallery</h3>

        <div className="flex flex-col gap-sm">
          <h4 className="text-sm font-medium">Small (sm)</h4>
          <Textarea size="sm" placeholder="Small textarea" />
        </div>

        <div className="flex flex-col gap-sm">
          <h4 className="text-sm font-medium">Medium (md) - Default</h4>
          <Textarea size="md" placeholder="Medium textarea" />
        </div>

        <div className="flex flex-col gap-sm">
          <h4 className="text-sm font-medium">Large (lg)</h4>
          <Textarea size="lg" placeholder="Large textarea" />
        </div>

        <div className="flex flex-col gap-sm">
          <h4 className="text-sm font-medium">Multi-line Content</h4>
          <Textarea
            size="md"
            defaultValue="This is a multi-line textarea with longer content to demonstrate how different sizes handle text wrapping and readability. The textarea will automatically resize vertically as needed."
          />
        </div>
      </div>
    </div>
  ),
};

export const Invalid: Story = {
  args: {
    invalid: true,
    placeholder: "Textarea with invalid state",
    defaultValue: "Invalid content",
    "aria-describedby": "error-message",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled textarea",
    defaultValue: "Disabled content",
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Pre-filled content\nwith multiple lines",
  },
};

export const LongContent: Story = {
  args: {
    defaultValue:
      "This is a longer textarea with multiple lines of content to demonstrate how it handles longer text input. The textarea will automatically resize vertically as needed.",
  },
};

export const Accessibility: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <div>
        <Textarea placeholder="Input with error" invalid aria-describedby="error-message-1" />
        <p id="error-message-1" className="mt-1 text-sm text-[hsl(var(--destructive))]">
          This field is required
        </p>
      </div>
      <div>
        <Textarea placeholder="Required textarea" required />
      </div>
      <div>
        <Textarea
          placeholder="Invalid via aria-invalid"
          aria-invalid={true}
          aria-describedby="error-message-2"
        />
        <p id="error-message-2" className="mt-1 text-sm text-[hsl(var(--destructive))]">
          This field contains an error
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
      <Textarea placeholder="Textarea in dark mode" />
      <Textarea invalid placeholder="Invalid textarea in dark mode" />
      <Textarea disabled placeholder="Disabled textarea in dark mode" />
    </div>
  ),
};

export const LightMode: Story = {
  parameters: {
    backgrounds: { default: "light" },
  },
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Textarea placeholder="Textarea in light mode" />
      <Textarea invalid placeholder="Invalid textarea in light mode" />
      <Textarea disabled placeholder="Disabled textarea in light mode" />
    </div>
  ),
};

export const Comprehensive: Story = {
  render: () => (
    <div className="flex w-full max-w-2xl flex-col gap-lg">
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">All Sizes</h3>
        <Textarea size="sm" placeholder="Small" />
        <Textarea size="md" placeholder="Medium (default)" />
        <Textarea size="lg" placeholder="Large" />
      </div>
      <div className="flex flex-col gap-md">
        <h3 className="text-lg font-semibold">States</h3>
        <Textarea placeholder="Default state" />
        <Textarea invalid placeholder="Invalid state" defaultValue="Error value" />
        <Textarea disabled placeholder="Disabled state" />
        <Textarea required placeholder="Required state" />
        <Textarea readOnly defaultValue="Read-only state" />
      </div>
    </div>
  ),
};
