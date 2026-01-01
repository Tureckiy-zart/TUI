import { Button } from "@/PRIMITIVES/Button";
import { Link } from "@/PRIMITIVES/Link";
import type { Meta, StoryObj } from "@storybook/react";
import { ContentShell } from "../ContentShell/ContentShell";
import { Container } from "../Container";
import { PageHeader } from "../PageHeader";
import { Section } from "../Section";
import { StickyBar } from "../StickyBar/StickyBar";
import { Navbar } from "./Navbar";

const meta: Meta<typeof Navbar> = {
  title: "UI / Extension / Layout / Navbar",
  component: Navbar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Navigation container component providing semantic `<nav>` wrapper with left/right/children slots for navigation content. Uses layout primitives internally (Stack, Box) for token-based styling. Navbar IS a navigation container, NOT a layout primitive.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    left: {
      control: false,
      description: "Left content slot",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    right: {
      control: false,
      description: "Right content slot",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    children: {
      control: false,
      description: "Center/alternative content",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    ariaLabel: {
      control: { type: "text" },
      description: "Accessible label for navigation region",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '"Primary navigation"' },
      },
    },
    className: {
      control: false,
      table: {
        disable: true,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

/**
 * Default Navbar with left and right slots
 */
export const Default: Story = {
  args: {
    left: (
      <Link href="#" size="md" variant="ghost">
        Logo
      </Link>
    ),
    right: (
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Link href="#" size="sm" variant="ghost">
          About
        </Link>
        <Link href="#" size="sm" variant="ghost">
          Contact
        </Link>
        <Button variant="primary" size="sm">
          Sign In
        </Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Basic Navbar with left slot (Logo) and right slot (navigation links and button)",
      },
    },
  },
};

/**
 * Navbar with all slots (left, right, children)
 */
export const WithAllSlots: Story = {
  args: {
    left: (
      <Link href="#" size="md" variant="ghost">
        Logo
      </Link>
    ),
    children: (
      <nav style={{ display: "flex", gap: "1rem" }}>
        <Link href="#" size="sm" variant="ghost">
          Home
        </Link>
        <Link href="#" size="sm" variant="ghost">
          Products
        </Link>
        <Link href="#" size="sm" variant="ghost">
          Services
        </Link>
      </nav>
    ),
    right: (
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Button variant="ghost" size="sm">
          Menu
        </Button>
        <Button variant="primary" size="sm">
          Sign In
        </Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Navbar with all three slots: left (Logo), center (children - navigation links), and right (buttons)",
      },
    },
  },
};

/**
 * Navbar with children only (no left/right slots)
 */
export const WithChildrenOnly: Story = {
  args: {
    children: (
      <nav style={{ display: "flex", gap: "1rem", justifyContent: "center", width: "100%" }}>
        <Link href="#" size="sm" variant="ghost">
          Home
        </Link>
        <Link href="#" size="sm" variant="ghost">
          About
        </Link>
        <Link href="#" size="sm" variant="ghost">
          Contact
        </Link>
      </nav>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Navbar with children slot only, centered navigation links",
      },
    },
  },
};

/**
 * Navbar inside ContentShell (realistic usage)
 */
export const InsideContentShell: Story = {
  render: () => (
    <ContentShell
      nav={
        <Navbar
          left={
            <Link href="#" size="md" variant="ghost">
              Logo
            </Link>
          }
          right={
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <Link href="#" size="sm" variant="ghost">
                About
              </Link>
              <Button variant="primary" size="sm">
                Sign In
              </Button>
            </div>
          }
        />
      }
      contentPadding="md"
    >
      <Section spaceY="lg">
        <PageHeader title="Page Title" description="Page description" />
        <Container>
          <p>
            This demonstrates Navbar embedded inside ContentShell, which is the recommended usage
            pattern.
          </p>
        </Container>
      </Section>
    </ContentShell>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Navbar embedded inside ContentShell with page content. This is the recommended usage pattern for page-level navigation.",
      },
    },
  },
};

/**
 * Navbar with StickyBar (sticky navigation)
 */
export const WithStickyBar: Story = {
  render: () => (
    <div>
      <StickyBar position="top">
        <Navbar
          left={
            <Link href="#" size="md" variant="ghost">
              Logo
            </Link>
          }
          right={
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
              <Link href="#" size="sm" variant="ghost">
                About
              </Link>
              <Button variant="primary" size="sm">
                Sign In
              </Button>
            </div>
          }
        />
      </StickyBar>
      <div style={{ padding: "2rem", minHeight: "200vh" }}>
        <p>Scroll down to see the sticky Navbar behavior.</p>
        <p>Navbar is wrapped in StickyBar for sticky positioning.</p>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "Navbar wrapped in StickyBar for sticky positioning. StickyBar handles sticky behavior, Navbar provides navigation content.",
      },
    },
  },
};

/**
 * Navbar with custom aria-label
 */
export const WithCustomAriaLabel: Story = {
  args: {
    ariaLabel: "Main navigation",
    left: (
      <Link href="#" size="md" variant="ghost">
        Logo
      </Link>
    ),
    right: (
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <Link href="#" size="sm" variant="ghost">
          About
        </Link>
        <Button variant="primary" size="sm">
          Sign In
        </Button>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Navbar with custom aria-label for accessibility. Default aria-label is 'Primary navigation'.",
      },
    },
  },
};
