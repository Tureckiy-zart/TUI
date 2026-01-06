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
          "Navigation container component with canonical zone model (Left / Center / Right). Uses layout primitives internally (Stack, Box) for token-based styling. Navbar IS a navigation container, NOT a layout primitive. See docs/reference/NAVIGATION_CANON.md for zone responsibilities.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    left: {
      control: false,
      description: "Left zone: Logo, brand identity, mobile menu trigger",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    center: {
      control: false,
      description: "Center zone: Primary navigation links, NavigationMenu, Tabs",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    right: {
      control: false,
      description: "Right zone: User menu, auth actions, language selector, theme toggle",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    children: {
      control: false,
      description: "Alternative center content (deprecated, use center prop instead)",
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
 * Navbar with all three zones (left, center, right) - canonical pattern
 */
export const WithAllZones: Story = {
  args: {
    left: (
      <Link href="#" size="md" variant="ghost">
        Logo
      </Link>
    ),
    center: (
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
          "Canonical pattern: Navbar with all three zones - left (Logo), center (navigation links), right (actions). Uses explicit center prop.",
      },
    },
  },
};

/**
 * Navbar with children (backward compatibility)
 */
export const WithChildrenBackwardCompat: Story = {
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
      </nav>
    ),
    right: (
      <Button variant="primary" size="sm">
        Sign In
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Backward compatibility: children prop renders as center zone. For new code, use explicit center prop instead.",
      },
    },
  },
};

/**
 * Navbar with center zone only
 */
export const WithCenterOnly: Story = {
  args: {
    center: (
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
        story: "Navbar with center zone only - centered navigation links",
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
