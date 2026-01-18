import type { Meta, StoryObj } from "@storybook/react";
import { NavItem, NavList, NavSeparator, NavText } from "./Navigation";

// NavRoot is now a standalone component
import { NavRoot } from "../NavRoot/NavRoot";

const meta: Meta<typeof NavRoot> = {
  title: "UI / Composition / Navigation / Primitives",
  component: NavRoot,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Stateless semantic navigation primitives that provide the building blocks for navigation patterns. These components are pure HTML wrappers with no routing, state, or business logic.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NavRoot>;

// ============================================================================
// NavRoot Stories
// ============================================================================

export const NavRootDefault: Story = {
  render: () => (
    <NavRoot aria-label="Navigation">
      <NavList>
        <NavItem>
          <NavText>Home</NavText>
        </NavItem>
        <NavItem>
          <NavText>About</NavText>
        </NavItem>
        <NavItem>
          <NavText>Contact</NavText>
        </NavItem>
      </NavList>
    </NavRoot>
  ),
};

export const NavRootWithAriaLabel: Story = {
  render: () => (
    <NavRoot aria-label="Main navigation">
      <NavList>
        <NavItem>
          <NavText>Page 1</NavText>
        </NavItem>
        <NavItem>
          <NavText>Page 2</NavText>
        </NavItem>
      </NavList>
    </NavRoot>
  ),
};

// ============================================================================
// NavList Stories
// ============================================================================

export const NavListOrdered: Story = {
  render: () => (
    <NavRoot aria-label="Navigation">
      <NavList as="ol">
        <NavItem>
          <NavText>First item</NavText>
        </NavItem>
        <NavItem>
          <NavText>Second item</NavText>
        </NavItem>
        <NavItem>
          <NavText>Third item</NavText>
        </NavItem>
      </NavList>
    </NavRoot>
  ),
};

export const NavListUnordered: Story = {
  render: () => (
    <NavRoot aria-label="Navigation">
      <NavList as="ul">
        <NavItem>
          <NavText>Item 1</NavText>
        </NavItem>
        <NavItem>
          <NavText>Item 2</NavText>
        </NavItem>
        <NavItem>
          <NavText>Item 3</NavText>
        </NavItem>
      </NavList>
    </NavRoot>
  ),
};

// ============================================================================
// NavItem Stories
// ============================================================================

export const NavItemDefault: Story = {
  render: () => (
    <NavRoot aria-label="Navigation">
      <NavList>
        <NavItem>
          <NavText>Home</NavText>
        </NavItem>
        <NavItem>
          <NavText>Products</NavText>
        </NavItem>
        <NavItem>
          <NavText>About</NavText>
        </NavItem>
      </NavList>
    </NavRoot>
  ),
};

export const NavItemWithAsChild: Story = {
  render: () => (
    <NavRoot aria-label="Navigation">
      <NavList>
        <NavItem>
          <NavText>Standard item</NavText>
        </NavItem>
        <NavItem asChild>
          <div style={{ padding: "8px", border: "1px dashed hsl(var(--tm-border-default))" }}>
            Custom item via asChild
          </div>
        </NavItem>
        <NavItem>
          <NavText>Another standard item</NavText>
        </NavItem>
      </NavList>
    </NavRoot>
  ),
};

// ============================================================================
// NavText Stories
// ============================================================================

export const NavTextDefault: Story = {
  render: () => (
    <NavRoot aria-label="Navigation">
      <NavList>
        <NavItem>
          <NavText>Home</NavText>
        </NavItem>
        <NavItem>
          <NavText>About</NavText>
        </NavItem>
      </NavList>
    </NavRoot>
  ),
};

export const NavTextWithAriaCurrent: Story = {
  render: () => (
    <NavRoot aria-label="Navigation">
      <NavList>
        <NavItem>
          <NavText>Home</NavText>
        </NavItem>
        <NavItem>
          <NavText aria-current="page">Current Page</NavText>
        </NavItem>
      </NavList>
    </NavRoot>
  ),
};

// ============================================================================
// NavSeparator Stories
// ============================================================================

export const NavSeparatorDefault: Story = {
  render: () => (
    <NavRoot aria-label="Navigation">
      <NavList>
        <NavItem>
          <NavText>Home</NavText>
          <NavSeparator />
          <NavText>About</NavText>
        </NavItem>
        <NavItem>
          <NavText>Products</NavText>
          <NavSeparator />
          <NavText>Details</NavText>
        </NavItem>
      </NavList>
    </NavRoot>
  ),
};

export const NavSeparatorCustom: Story = {
  render: () => (
    <NavRoot aria-label="Navigation">
      <NavList>
        <NavItem>
          <NavText>Home</NavText>
          <NavSeparator>/</NavSeparator>
          <NavText>About</NavText>
        </NavItem>
        <NavItem>
          <NavText>Products</NavText>
          <NavSeparator>|</NavSeparator>
          <NavText>Details</NavText>
        </NavItem>
      </NavList>
    </NavRoot>
  ),
};

// ============================================================================
// Composition Example (Breadcrumbs-like structure)
// ============================================================================

export const CompositionExample: Story = {
  render: () => (
    <NavRoot aria-label="Breadcrumb">
      <NavList as="ol">
        <NavItem>
          <NavText>Home</NavText>
          <NavSeparator />
        </NavItem>
        <NavItem>
          <NavText>Products</NavText>
          <NavSeparator />
        </NavItem>
        <NavItem>
          <NavText>Category</NavText>
          <NavSeparator />
        </NavItem>
        <NavItem>
          <NavText aria-current="page">Current Page</NavText>
        </NavItem>
      </NavList>
    </NavRoot>
  ),
};

export const CompositionExampleWithLinks: Story = {
  render: () => (
    <NavRoot aria-label="Breadcrumb">
      <NavList as="ol">
        <NavItem>
          <a href="/">Home</a>
          <NavSeparator />
        </NavItem>
        <NavItem>
          <a href="/products">Products</a>
          <NavSeparator />
        </NavItem>
        <NavItem>
          <NavText aria-current="page">Current Page</NavText>
        </NavItem>
      </NavList>
    </NavRoot>
  ),
};

// ============================================================================
// ARIA Attributes Usage
// ============================================================================

export const AriaAttributes: Story = {
  render: () => (
    <NavRoot aria-label="Main navigation">
      <NavList as="ol" aria-label="Navigation items">
        <NavItem>
          <NavText>Home</NavText>
        </NavItem>
        <NavItem>
          <NavText aria-current="page">Current Page</NavText>
        </NavItem>
        <NavItem>
          <NavText>Next Page</NavText>
        </NavItem>
      </NavList>
    </NavRoot>
  ),
};
