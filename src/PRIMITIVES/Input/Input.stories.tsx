"use client";

import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Foundation Locked/Primitives/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Input is a low-level form control primitive that wraps the native <input> element. It is responsible only for visual styling via tokens, accessibility via native and ARIA attributes, and forwarding all native input behavior. Input does not handle labels, errors, validation, helper text, or form logic. Higher-level composition is delegated to FormField or domain-level form abstractions.\n\n" +
          "**Primitive API:** Supports size variants (sm, md, lg) and invalid state for accessibility. All styling uses token-based values with CSS variable references.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Input size",
      table: {
        type: { summary: "InputSize" },
        defaultValue: { summary: "md" },
      },
    },
    invalid: {
      control: { type: "boolean" },
      description: "Whether the input is in an invalid state (maps to aria-invalid)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    type: {
      control: { type: "text" },
      description: "Input type (text, email, password, etc.)",
    },
    placeholder: {
      control: { type: "text" },
      description: "Placeholder text",
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable input interaction",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

/**
 * SizesGallery Story
 *
 * Displays all Input sizes side-by-side for visual comparison.
 * Demonstrates text content and placeholder text across all supported sizes.
 *
 * @canonical VARIANTS_SIZE_CANON - SizesGallery story (REQUIRED for components with size prop)
 * @axis size
 * @values sm, md, lg
 */
export const SizesGallery: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-md text-sm font-medium">Text Content</h3>
        <div className="flex w-64 flex-col gap-md">
          <Input size="sm" placeholder="Small input" defaultValue="Small text" />
          <Input size="md" placeholder="Medium input" defaultValue="Medium text" />
          <Input size="lg" placeholder="Large input" defaultValue="Large text" />
        </div>
      </div>
      <div>
        <h3 className="mb-md text-sm font-medium">Placeholder Only</h3>
        <div className="flex w-64 flex-col gap-md">
          <Input size="sm" placeholder="Small input" />
          <Input size="md" placeholder="Medium input" />
          <Input size="lg" placeholder="Large input" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "SizesGallery demonstrates all supported Input sizes (sm, md, lg) for visual comparison.",
      },
    },
  },
};
