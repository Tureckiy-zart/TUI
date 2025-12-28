import type { Meta, StoryObj } from "@storybook/react";

import { NavList } from "./NavList";

const meta: Meta<typeof NavList> = {
  title: "UI / Composition / Navigation / NavList",
  component: NavList,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pure semantic list container for navigation primitives. Renders either `<ol>` or `<ul>` element with correct HTML semantics. This component is a structural wrapper with no styling, layout, or logic.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavList>;

// ============================================================================
// Basic Stories
// ============================================================================

/**
 * Default NavList renders as ordered list (`<ol>`).
 * This is the default behavior for semantic navigation lists.
 */
export const Ordered: Story = {
  render: () => (
    <NavList>
      <li>First item</li>
      <li>Second item</li>
      <li>Third item</li>
    </NavList>
  ),
};

/**
 * NavList can render as unordered list (`<ul>`) when `as="ul"` is specified.
 */
export const Unordered: Story = {
  render: () => (
    <NavList as="ul">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </NavList>
  ),
};

// ============================================================================
// Composition Examples
// ============================================================================

/**
 * NavList with simple list items.
 * This demonstrates basic usage with standard HTML list items.
 */
export const WithNavItems: Story = {
  render: () => (
    <nav aria-label="Navigation">
      <NavList>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </NavList>
    </nav>
  ),
};

/**
 * NavList with asChild pattern.
 * When `asChild` is true, NavList renders through Radix Slot, allowing composition with custom components.
 */
export const WithAsChild: Story = {
  render: () => (
    <NavList asChild>
      <ol className="custom-list" data-testid="custom-list">
        <li>Custom item 1</li>
        <li>Custom item 2</li>
      </ol>
    </NavList>
  ),
};

// ============================================================================
// HTML Attributes
// ============================================================================

/**
 * NavList supports standard HTML attributes for list elements.
 */
export const WithHTMLAttributes: Story = {
  render: () => (
    <NavList aria-label="Navigation list" id="main-nav" role="list">
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </NavList>
  ),
};
