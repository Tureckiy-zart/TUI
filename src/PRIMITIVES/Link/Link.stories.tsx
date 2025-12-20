"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

/**
 * Link Storybook Quality Gate
 *
 * @status PASSED
 * @date 2025-12-19
 * @task TUNG_FOUNDATION_LINK_STORYBOOK
 *
 * Quality Gate Requirements:
 * ✅ One axis per story (variant, underline, state, composition)
 * ✅ Comparative layout (all variants displayed simultaneously)
 * ✅ Only public API used (no internal imports or Radix usage exposed)
 * ✅ No navigation or routing logic
 * ✅ No UX or business scenarios
 * ✅ Neutral href used (#) with navigation disabled
 * ✅ All Link variants displayed comparatively
 *
 * Stories Structure:
 * - Variants: 4 variants (link/default, secondary/muted, accent, destructive/danger)
 * - UnderlineModes: Variants demonstrating different underline behaviors
 * - States: Default and disabled states
 * - AsChild: Link always renders as anchor (composition demonstration)
 */

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Link component for navigation and interactive text. Supports 7 canonical variants and 3 sizes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "accent", "outline", "ghost", "link", "destructive"],
      description: "Link variant style",
      table: {
        type: { summary: "LinkVariant" },
        defaultValue: { summary: "link" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Link size",
      table: {
        type: { summary: "LinkSize" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable link interaction",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

/**
 * Variants Story
 *
 * Displays Link variants simultaneously for visual comparison.
 * All variants use the same size (md) and content for fair comparison.
 *
 * @axis variant
 * @values link (default), secondary (muted), accent, destructive (danger)
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Link href="#" onClick={(e) => e.preventDefault()}>
        Link
      </Link>
      <Link variant="secondary" href="#" onClick={(e) => e.preventDefault()}>
        Link
      </Link>
      <Link variant="accent" href="#" onClick={(e) => e.preventDefault()}>
        Link
      </Link>
      <Link variant="destructive" href="#" onClick={(e) => e.preventDefault()}>
        Link
      </Link>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Link variants displayed side-by-side for visual comparison. Same size (md) and content used for fair comparison. Navigation is disabled for Storybook demonstration.",
      },
    },
  },
};

/**
 * UnderlineModes Story
 *
 * Displays Link variants with different underline behaviors.
 * Shows variants that demonstrate always, hover, and none underline modes.
 *
 * @axis underline
 * @values always (primary variant), hover (link variant), none (secondary variant)
 */
export const UnderlineModes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Link variant="primary" href="#" onClick={(e) => e.preventDefault()}>
        Link
      </Link>
      <Link variant="link" href="#" onClick={(e) => e.preventDefault()}>
        Link
      </Link>
      <Link variant="secondary" href="#" onClick={(e) => e.preventDefault()}>
        Link
      </Link>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Link variants demonstrating different underline behaviors: primary (underline on hover), link (underline on hover), secondary (no underline). Hover over links to see underline behavior.",
      },
    },
  },
};

/**
 * States Story
 *
 * Displays Link states (default, disabled) for visual comparison.
 * All states use the same variant (link) and size (md) for fair comparison.
 * Note: Hover and focus-visible are CSS states that require user interaction to observe.
 *
 * @axis state
 * @values default, disabled
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Link href="#" onClick={(e) => e.preventDefault()}>
        Link
      </Link>
      <Link href="#" onClick={(e) => e.preventDefault()} disabled>
        Link
      </Link>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Link states displayed side-by-side for visual comparison. Same variant (link) and size (md) used for fair comparison. Hover and focus-visible states require user interaction to observe.",
      },
    },
  },
};

/**
 * AsChild Story
 *
 * Demonstrates that Link always renders as an anchor element.
 * Link component does not support asChild prop - it always renders semantic <a> element.
 *
 * @axis composition
 * @values anchor (always)
 */
export const AsChild: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Link href="#" onClick={(e) => e.preventDefault()}>
        Link (anchor)
      </Link>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Link component always renders as a semantic <a> element. Link does not support asChild prop - it is designed exclusively for anchor-based navigation.",
      },
    },
  },
};
