"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { Input } from "@/PRIMITIVES/Input";

import { HelperText } from "./HelperText";

/**
 * HelperText Storybook
 *
 * @status COMPLETE
 * @date 2026-01-02
 * @task TUI_HELPERTEXT_CREATE
 *
 * Stories Structure:
 * - Default: Basic helper text usage
 * - WithInput: Example composition with Input (no logic)
 *
 * Note: No Matrix/SizesGallery stories (HelperText has no size/variant props, uses defaults)
 */

const meta: Meta<typeof HelperText> = {
  title: "UI / Primitives / HelperText",
  component: HelperText,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'HelperText is a presentational DX helper for form descriptions. It provides a thin wrapper around Text component with sensible defaults (size="sm", tone="muted", as="p") for helper text use cases. HelperText is standalone (not tied to Field composition) and purely presentational.\n\n' +
          "**What HelperText IS:**\n" +
          "- Thin presentational wrapper over Text component\n" +
          "- DX helper with sensible defaults\n" +
          "- Standalone component (not tied to Field composition)\n" +
          "- Accessible via aria-describedby\n\n" +
          "**What HelperText IS NOT:**\n" +
          "- NOT a form controller (no validation logic)\n" +
          "- NOT a form state manager (no state ownership)\n" +
          "- NOT a validation system (no error handling)\n" +
          "- NOT a Field composition component (vs Field.Description)",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Typography size scale (default: sm)",
      table: {
        type: { summary: "TextSize" },
        defaultValue: { summary: "sm" },
      },
    },
    as: {
      control: { type: "select" },
      options: ["span", "p", "label", "strong", "em"],
      description: "HTML element to render (default: p)",
      table: {
        type: { summary: "TextAsElement" },
        defaultValue: { summary: "p" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof HelperText>;

/**
 * Default Story
 *
 * Basic helper text usage with default props (size="sm", tone="muted", as="p").
 */
export const Default: Story = {
  args: {
    children: "We'll never share your email with anyone else.",
  },
};

/**
 * WithInput Story
 *
 * Example composition with Input component demonstrating aria-describedby usage.
 * This is a presentational example only - no validation or form logic.
 */
export const WithInput: Story = {
  render: () => (
    <div className="w-64 space-y-sm">
      <Input type="email" placeholder="Enter your email" aria-describedby="email-help" />
      <HelperText id="email-help">We'll never share your email with anyone else.</HelperText>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of HelperText used with Input component. The Input uses aria-describedby to reference the HelperText, making it accessible to screen readers. This is a presentational example only - no validation or form logic is included.",
      },
    },
  },
};
