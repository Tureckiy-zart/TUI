"use client";
import { IconArrowRight, IconCheck, IconSearch } from "@/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

/**
 * Button Storybook Quality Gate
 *
 * @status PASSED
 * @date 2025-12-19
 * @task TUNG_FOUNDATION_BUTTON_STORYBOOK
 *
 * Quality Gate Requirements:
 * ✅ One axis per story (variant, size, state, icon)
 * ✅ Comparative layout (all variants displayed simultaneously)
 * ✅ Only public API used (no internal imports or Radix usage exposed)
 * ✅ No UX or business scenarios
 * ✅ No navigation or routing logic
 * ✅ All Button variants displayed comparatively
 *
 * Stories Structure:
 * - Variants: All 6 variants (primary, secondary, accent, outline, ghost, destructive)
 * - Sizes: 3 sizes (sm, md, lg) in comparative row
 * - States: Default and disabled states
 * - WithIcons: Icon variations (left, right, both)
 */

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Button component for user interactions. Supports 6 variants (primary, secondary, accent, outline, ghost, destructive) and 4 sizes (sm, md, lg, icon) with icon slot support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "accent", "outline", "ghost", "destructive"],
      description: "Button variant style",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "primary" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "icon"],
      description: "Button size",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable button interaction",
    },
    children: {
      control: { type: "text" },
      description: "Button content",
    },
    asChild: {
      control: false,
      description: "Render as child element (Radix Slot) - internal use only",
      table: {
        disable: true,
      },
    },
    leftIcon: {
      control: false,
      description: "Icon displayed before the button content",
    },
    rightIcon: {
      control: false,
      description: "Icon displayed after the button content",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/**
 * Variants Story
 *
 * Displays all Button variants simultaneously for visual comparison.
 * All variants use the same size (md) and content for fair comparison.
 *
 * @axis variant
 * @values primary, secondary, accent, outline, ghost, destructive
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Button variant="primary">Button</Button>
      <Button variant="secondary">Button</Button>
      <Button variant="accent">Button</Button>
      <Button variant="outline">Button</Button>
      <Button variant="ghost">Button</Button>
      <Button variant="destructive">Button</Button>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All Button variants displayed side-by-side for visual comparison. Same size and content used for fair comparison.",
      },
    },
  },
};

/**
 * Sizes Story
 *
 * Displays all Button sizes side-by-side for visual comparison.
 * All sizes use the same variant (primary) and content for fair comparison.
 *
 * @axis size
 * @values sm, md, lg
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Button size="sm">Button</Button>
      <Button size="md">Button</Button>
      <Button size="lg">Button</Button>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "All Button sizes displayed side-by-side for visual comparison. Same variant (primary) and content used for fair comparison.",
      },
    },
  },
};

/**
 * States Story
 *
 * Displays Button states (default, disabled) for visual comparison.
 * All states use the same variant (primary) and size (md) for fair comparison.
 *
 * @axis state
 * @values default, disabled
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Button>Button</Button>
      <Button disabled>Button</Button>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Button states displayed side-by-side for visual comparison. Same variant (primary) and size (md) used for fair comparison.",
      },
    },
  },
};

/**
 * WithIcons Story
 *
 * Displays icon variations (left, right, both) for visual comparison.
 * All variations use the same variant (primary) and size (md) for fair comparison.
 *
 * @axis icon
 * @values left, right, both
 */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Button leftIcon={<IconSearch />}>Button</Button>
      <Button rightIcon={<IconArrowRight />}>Button</Button>
      <Button leftIcon={<IconCheck />} rightIcon={<IconArrowRight />}>
        Button
      </Button>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Icon variations displayed side-by-side for visual comparison. Same variant (primary) and size (md) used for fair comparison.",
      },
    },
  },
};
