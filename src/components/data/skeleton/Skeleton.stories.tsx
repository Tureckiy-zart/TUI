import type { Meta, StoryObj } from "@storybook/react";

import { Skeleton } from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Data/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Token-driven skeleton loading component with multiple variants. Uses DATA_TOKENS.skeleton for all sizing and styling.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "inline", "block", "card", "circle"],
      description: "Skeleton variant style",
      table: {
        type: { summary: "text | inline | block | card | circle" },
        defaultValue: { summary: "text" },
      },
    },
    "aria-hidden": {
      control: "boolean",
      description: "Whether to hide from screen readers",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

/**
 * Default text skeleton variant
 */
export const Text: Story = {
  args: {
    variant: "text",
  },
};

/**
 * Inline text skeleton variant
 */
export const Inline: Story = {
  args: {
    variant: "inline",
  },
  render: (args) => (
    <div className="space-y-2">
      <p>
        Loading <Skeleton {...args} className="w-20" /> content
      </p>
      <p>
        Another <Skeleton {...args} className="w-32" /> example
      </p>
    </div>
  ),
};

/**
 * Block skeleton variant
 */
export const Block: Story = {
  args: {
    variant: "block",
  },
};

/**
 * Card skeleton variant
 */
export const Card: Story = {
  args: {
    variant: "card",
  },
};

/**
 * Circle skeleton variant
 */
export const Circle: Story = {
  args: {
    variant: "circle",
  },
};

/**
 * All variants showcase
 */
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Text Variant</h3>
        <Skeleton variant="text" />
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Inline Variant</h3>
        <p>
          Loading <Skeleton variant="inline" className="w-20" /> content inline
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Block Variant</h3>
        <Skeleton variant="block" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Card Variant</h3>
        <Skeleton variant="card" />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-semibold">Circle Variant</h3>
        <div className="flex gap-4">
          <Skeleton variant="circle" />
          <Skeleton variant="circle" />
          <Skeleton variant="circle" />
        </div>
      </div>
    </div>
  ),
};

/**
 * Card loading state example
 */
export const CardLoading: Story = {
  render: () => (
    <div className="w-80 space-y-4 rounded-xl border border-border p-6">
      <div className="flex items-center gap-4">
        <Skeleton variant="circle" />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" className="w-3/4" />
          <Skeleton variant="text" className="w-1/2" />
        </div>
      </div>
      <Skeleton variant="block" />
      <div className="space-y-2">
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" className="w-5/6" />
      </div>
    </div>
  ),
};

/**
 * List loading state example
 */
export const ListLoading: Story = {
  render: () => (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton variant="circle" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="w-3/4" />
            <Skeleton variant="text" className="w-1/2" />
          </div>
        </div>
      ))}
    </div>
  ),
};
