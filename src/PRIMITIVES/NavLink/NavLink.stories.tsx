"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { NavLink } from "./NavLink";

/**
 * NavLink Storybook Stories
 *
 * NavLink is a navigation primitive built on top of the Foundation Link component.
 * It represents a navigational link and reflects externally provided navigation state via aria-current.
 * NavLink does not perform routing, route matching, or state detection.
 *
 * Story Requirements:
 * - Default: NavLink without current prop
 * - Current: NavLink with current=true
 *
 * Forbidden Stories:
 * - RouterExample (no routing logic)
 * - AutoActive (no state detection)
 * - FrameworkSpecific (no framework dependencies)
 */

const meta: Meta<typeof NavLink> = {
  title: "Primitives / NavLink",
  component: NavLink,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "NavLink is a navigation primitive built on top of the Foundation Link component. It represents a navigational link and reflects externally provided navigation state via aria-current. NavLink does not perform routing, route matching, or state detection.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    current: {
      control: { type: "boolean" },
      description:
        "Whether this link represents the current page. When true, aria-current='page' is applied.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "accent", "outline", "ghost", "link", "destructive"],
      description: "Link variant style (forwarded to Link)",
      table: {
        type: { summary: "LinkVariant" },
        defaultValue: { summary: "link" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Link size (forwarded to Link)",
      table: {
        type: { summary: "LinkSize" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable link interaction (forwarded to Link)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavLink>;

/**
 * Default Story
 *
 * NavLink without current prop (default state).
 * Demonstrates basic NavLink usage without navigation state indication.
 */
export const Default: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <NavLink href="/home">Home</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "NavLink without current prop. No aria-current attribute is applied. This is the default state for navigation links that are not currently active.",
      },
    },
  },
};

/**
 * Current Story
 *
 * NavLink with current=true.
 * Demonstrates NavLink with navigation state indication (aria-current='page').
 */
export const Current: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <NavLink href="/home" current>
        Home (Current)
      </NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "NavLink with current=true. aria-current='page' is applied to indicate this link represents the current page. NavLink does not determine this state; it only reflects externally provided state.",
      },
    },
  },
};

/**
 * Navigation Example
 *
 * Demonstrates NavLink usage in a navigation context.
 * Shows how external state management would provide current prop.
 */
export const NavigationExample: Story = {
  render: () => (
    <nav className="flex gap-4">
      <NavLink href="/home" current>
        Home
      </NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink href="/contact">Contact</NavLink>
    </nav>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example navigation using NavLink. The current prop is provided externally (e.g., by a router or state management). NavLink only reflects this state via aria-current.",
      },
    },
  },
};
