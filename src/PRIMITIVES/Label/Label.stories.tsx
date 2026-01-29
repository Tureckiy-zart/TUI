"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "./Label";

/**
 * Label Storybook
 *
 * @status COMPLETE
 * @date 2025-12-25
 * @task TUNG_LABEL_STEP_10_STORYBOOK
 *
 * Stories Structure:
 * - Default: Basic label usage
 * - Required: Label with required asterisk
 * - WithInput: Label associated with input (demonstrates peer-disabled)
 * - LongContent: Label with long text content
 *
 * Note: No Matrix/States/SizesGallery stories (Label has no size/variant props, non-interactive)
 */

const meta: Meta<typeof Label> = {
  title: "Primitives / Label",
  component: Label,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Form label primitive providing semantic association between label text and form control. Supports required asterisk indicator and peer-disabled styling pattern.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    required: {
      control: { type: "boolean" },
      description: "Shows required asterisk indicator",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    htmlFor: {
      control: { type: "text" },
      description: "Associates label with form control (native label for attribute)",
      table: {
        type: { summary: "string" },
      },
    },
    children: {
      control: { type: "text" },
      description: "Label text content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

/**
 * Default label usage
 */
export const Default: Story = {
  args: {
    children: "Username",
  },
};

/**
 * Label with required asterisk indicator
 */
export const Required: Story = {
  args: {
    children: "Email Address",
    required: true,
  },
};

/**
 * Label associated with input element
 * Demonstrates peer-disabled styling pattern
 */
export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-sm">
      <div className="flex flex-col gap-xs">
        <Label htmlFor="username-input">Username</Label>
        <input
          id="username-input"
          type="text"
          placeholder="Enter username"
          className="peer rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-md py-sm text-sm"
        />
      </div>

      <div className="flex flex-col gap-xs">
        <Label htmlFor="email-input" required>
          Email
        </Label>
        <input
          id="email-input"
          type="email"
          placeholder="Enter email"
          className="peer rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-md py-sm text-sm"
        />
      </div>

      <div className="flex flex-col gap-xs">
        <Label htmlFor="disabled-input">Disabled Input</Label>
        <input
          id="disabled-input"
          type="text"
          placeholder="Disabled"
          disabled
          className="peer rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-md py-sm text-sm disabled:cursor-not-allowed disabled:opacity-50"
        />
        <p className="text-xs text-[hsl(var(--tm-text-muted))]">
          Note: Label shows peer-disabled styling (cursor-not-allowed, opacity-70)
        </p>
      </div>
    </div>
  ),
};

/**
 * Label with long text content
 * Validates text wrapping and layout
 */
export const LongContent: Story = {
  args: {
    children:
      "This is a very long label text that demonstrates how the label component handles text wrapping when the content exceeds the available width",
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "300px" }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * Label with complex children
 * Demonstrates flexibility with nested elements
 */
export const ComplexChildren: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Label>
        <span className="font-semibold">Username</span>
        <span className="text-[hsl(var(--tm-text-muted))]"> (optional)</span>
      </Label>

      <Label required>
        <span>Email</span> <em className="text-[hsl(var(--tm-text-muted))]">Address</em>
      </Label>

      <Label>
        Password{" "}
        <span className="text-xs text-[hsl(var(--tm-text-muted))]">(min. 8 characters)</span>
      </Label>
    </div>
  ),
};

/**
 * Multiple labels in form layout
 * Demonstrates typical form usage
 */
export const FormLayout: Story = {
  render: () => (
    <form className="flex w-[400px] flex-col gap-md">
      <div className="flex flex-col gap-xs">
        <Label htmlFor="form-name" required>
          Full Name
        </Label>
        <input
          id="form-name"
          type="text"
          placeholder="John Doe"
          className="peer rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-md py-sm text-sm"
        />
      </div>

      <div className="flex flex-col gap-xs">
        <Label htmlFor="form-email" required>
          Email Address
        </Label>
        <input
          id="form-email"
          type="email"
          placeholder="john@example.com"
          className="peer rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-md py-sm text-sm"
        />
      </div>

      <div className="flex flex-col gap-xs">
        <Label htmlFor="form-phone">Phone Number</Label>
        <input
          id="form-phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
          className="peer rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-md py-sm text-sm"
        />
      </div>

      <div className="flex flex-col gap-xs">
        <Label htmlFor="form-message" required>
          Message
        </Label>
        <textarea
          id="form-message"
          placeholder="Enter your message"
          rows={4}
          className="peer rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-md py-sm text-sm"
        />
      </div>

      <div className="flex items-center gap-sm">
        <input
          id="form-terms"
          type="checkbox"
          className="peer h-4 w-4 rounded border border-[hsl(var(--tm-border-default))]"
        />
        <Label htmlFor="form-terms" required>
          I agree to the terms and conditions
        </Label>
      </div>
    </form>
  ),
};

/**
 * Accessibility demonstration
 * Shows proper label-input association
 */
export const Accessibility: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex flex-col gap-xs">
        <Label htmlFor="a11y-input-1">Explicit association via htmlFor</Label>
        <input
          id="a11y-input-1"
          type="text"
          placeholder="Click label to focus"
          className="peer rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-md py-sm text-sm"
        />
        <p className="text-xs text-[hsl(var(--tm-text-muted))]">
          Clicking the label will focus the input
        </p>
      </div>

      <div className="flex flex-col gap-xs">
        <Label htmlFor="a11y-input-2" required>
          Required field with asterisk
        </Label>
        <input
          id="a11y-input-2"
          type="text"
          placeholder="Required input"
          aria-required="true"
          className="peer rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-md py-sm text-sm"
        />
        <p className="text-xs text-[hsl(var(--tm-text-muted))]">
          Asterisk is visible to screen readers
        </p>
      </div>

      <div className="flex flex-col gap-xs">
        <Label htmlFor="a11y-input-3" aria-label="Custom accessible label">
          Visual label text
        </Label>
        <input
          id="a11y-input-3"
          type="text"
          placeholder="With custom aria-label"
          className="peer rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-md py-sm text-sm"
        />
        <p className="text-xs text-[hsl(var(--tm-text-muted))]">
          Label has custom aria-label for screen readers
        </p>
      </div>
    </div>
  ),
};
