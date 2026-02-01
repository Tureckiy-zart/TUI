import type { Meta, StoryObj } from "@storybook/react";
import { VisuallyHidden } from "./VisuallyHidden";

const meta: Meta<typeof VisuallyHidden> = {
  title: "Composition / VisuallyHidden",
  component: VisuallyHidden,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Provides accessible names for interactive elements without visual display. Hides content visually while keeping it accessible to screen readers.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    asChild: {
      control: { type: "boolean" },
      description: "Whether to render as child element (Radix Slot pattern)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: { type: "text" },
      description: "Content to hide visually (accessible to screen readers)",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    className: {
      control: false,
      table: {
        disable: true,
      },
    },
    style: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

/**
 * Default VisuallyHidden usage.
 * Basic example of hiding text visually while keeping it accessible to screen readers.
 */
export const Default: Story = {
  args: {
    children: "This text is hidden visually but accessible to screen readers",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default VisuallyHidden usage. Basic example of hiding text visually while keeping it accessible to screen readers.",
      },
    },
  },
};

/**
 * Icon-only button with accessible name.
 * Demonstrates how to provide accessible name for icon-only buttons using VisuallyHidden.
 */
export const IconButtonLabel: Story = {
  render: () => (
    <button
      type="button"
      className="inline-flex items-center justify-center rounded-md p-2 text-[hsl(var(--tm-text-primary))] hover:bg-[hsl(var(--tm-muted))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      aria-label="Close dialog"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
      <VisuallyHidden>Close dialog</VisuallyHidden>
    </button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Icon-only button with accessible name. Demonstrates how to provide accessible name for icon-only buttons using VisuallyHidden.",
      },
    },
  },
};

/**
 * Form input helper text.
 * Demonstrates how to provide accessible helper text for form inputs using VisuallyHidden.
 */
export const FormLabelHelper: Story = {
  render: () => (
    <div className="space-y-2">
      <label htmlFor="email-input" className="block text-sm font-medium">
        Email
      </label>
      <input
        id="email-input"
        type="email"
        className="block w-full rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-3 py-2 text-sm ring-offset-background placeholder:text-[hsl(var(--tm-text-muted))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        placeholder="Enter your email"
        aria-describedby="email-helper"
      />
      <VisuallyHidden id="email-helper">Please enter a valid email address</VisuallyHidden>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Form input helper text. Demonstrates how to provide accessible helper text for form inputs using VisuallyHidden.",
      },
    },
  },
};
