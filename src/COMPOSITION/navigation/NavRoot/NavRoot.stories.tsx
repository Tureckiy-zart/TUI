import type { Meta, StoryObj } from "@storybook/react";
import { NavRoot } from "./NavRoot";

const meta: Meta<typeof NavRoot> = {
  title: "UI / Composition / Navigation / NavRoot",
  component: NavRoot,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Pure semantic navigation boundary component with zero logic. Renders a <nav> element with required aria-label for accessibility. Provides a semantic wrapper that enforces accessibility while remaining a pure composition wrapper with no assumptions about navigation structure or styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    "aria-label": {
      control: "text",
      description: "ARIA label for the navigation element (required)",
      table: {
        type: { summary: "string" },
      },
    },
    asChild: {
      control: "boolean",
      description: "Render as child element (composition pattern via Radix Slot)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    children: {
      control: false,
      description: "Child content (navigation primitives, lists, etc.)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof NavRoot>;

/**
 * Default usage example
 */
export const Default: Story = {
  args: {
    "aria-label": "Main navigation",
    children: (
      <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: "1rem" }}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    ),
  },
};

/**
 * asChild pattern usage
 *
 * Demonstrates composition pattern where NavRoot merges props with child element
 */
export const AsChild: Story = {
  args: {
    "aria-label": "Footer navigation",
    asChild: true,
    children: (
      <footer style={{ padding: "1rem", borderTop: "1px solid #ccc" }}>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: "1rem" }}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </footer>
    ),
  },
};

/**
 * Different navigation contexts
 *
 * Demonstrates NavRoot usage in various navigation contexts
 */
export const NavigationContexts: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Main Navigation</h3>
        <NavRoot aria-label="Main navigation">
          <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: "1rem" }}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </NavRoot>
      </div>

      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Footer Navigation</h3>
        <NavRoot aria-label="Footer navigation">
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
            }}
          >
            <li>
              <a href="/privacy">Privacy</a>
            </li>
            <li>
              <a href="/terms">Terms</a>
            </li>
            <li>
              <a href="/cookies">Cookies</a>
            </li>
          </ul>
        </NavRoot>
      </div>

      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Breadcrumb Navigation</h3>
        <NavRoot aria-label="Breadcrumb">
          <ol style={{ listStyle: "none", padding: 0, display: "flex", gap: "0.5rem" }}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>/</li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>/</li>
            <li>Current Page</li>
          </ol>
        </NavRoot>
      </div>
    </div>
  ),
};

/**
 * Accessibility demonstration
 *
 * Shows proper accessibility usage with required aria-label
 */
export const Accessibility: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Proper aria-label usage</h3>
        <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.5rem" }}>
          NavRoot requires aria-label for accessibility. Screen readers will announce the navigation
          region with the provided label.
        </p>
        <NavRoot aria-label="Main navigation">
          <ul style={{ listStyle: "none", padding: 0, display: "flex", gap: "1rem" }}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </NavRoot>
      </div>

      <div>
        <h3 style={{ marginBottom: "0.5rem" }}>Semantic nav element</h3>
        <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.5rem" }}>
          NavRoot renders a semantic &lt;nav&gt; element, which provides implicit ARIA
          role="navigation" for screen readers.
        </p>
        <NavRoot aria-label="Breadcrumb navigation">
          <ol style={{ listStyle: "none", padding: 0, display: "flex", gap: "0.5rem" }}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>/</li>
            <li>
              <a href="/products">Products</a>
            </li>
          </ol>
        </NavRoot>
      </div>
    </div>
  ),
};
