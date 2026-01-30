import { Button } from "@/PRIMITIVES/Button";
import type { Meta, StoryObj } from "@storybook/react";
import { Container } from "../Container";
import { PageHeader } from "../PageHeader";
import { Section } from "../Section";
import { ContentShell } from "./ContentShell";

const meta: Meta<typeof ContentShell> = {
  title: "Composition / Layout / ContentShell",
  component: ContentShell,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "ContentShell is a body-level layout wrapper, NOT document-level. Provides structure for main page content with optional navigation. Uses Container for width constraint and padding. Uses Stack for vertical composition of nav + content.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    nav: {
      control: { type: "object" },
      description: "Optional navigation component (Navbar)",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    children: {
      control: { type: "object" },
      description: "Main page content",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    contentPadding: {
      control: { type: "text" },
      description: "Padding for main content area (token-based spacing values)",
      table: {
        type: { summary: "ResponsiveSpacing" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ContentShell>;

/**
 * Default ContentShell usage with children only.
 */
export const Default: Story = {
  args: {
    children: (
      <Section spaceY="lg">
        <Container>
          <h1>Page Content</h1>
          <p>This is the main content area wrapped by ContentShell.</p>
        </Container>
      </Section>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Basic ContentShell with children only, no navigation",
      },
    },
  },
};

/**
 * ContentShell with navigation component.
 */
export const WithNavigation: Story = {
  args: {
    nav: (
      <div
        style={{
          padding: "1rem",
          backgroundColor: "var(--color-surface-elevated-1)",
          borderBottom: "1px solid hsl(var(--tm-border-default))",
        }}
      >
        <Container>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>Logo</div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button variant="ghost" size="md">
                Menu
              </Button>
              <Button variant="primary" size="md">
                Sign In
              </Button>
            </div>
          </div>
        </Container>
      </div>
    ),
    children: (
      <Section spaceY="lg">
        <Container>
          <h1>Page Content</h1>
          <p>This is the main content area with navigation above.</p>
        </Container>
      </Section>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "ContentShell with navigation component (nav prop)",
      },
    },
  },
};

/**
 * ContentShell with custom contentPadding.
 */
export const WithContentPadding: Story = {
  args: {
    contentPadding: "xl",
    children: (
      <Section spaceY="lg">
        <Container>
          <h1>Page Content</h1>
          <p>This ContentShell uses contentPadding="xl" for more spacious content area.</p>
        </Container>
      </Section>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "ContentShell with custom contentPadding token value",
      },
    },
  },
};

/**
 * Full example: ContentShell -> PageHeader -> Section.
 */
export const FullExample: Story = {
  args: {
    nav: (
      <div
        style={{
          padding: "1rem",
          backgroundColor: "var(--color-surface-elevated-1)",
          borderBottom: "1px solid hsl(var(--tm-border-default))",
        }}
      >
        <Container>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>Logo</div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Button variant="ghost" size="md">
                Menu
              </Button>
              <Button variant="primary" size="md">
                Sign In
              </Button>
            </div>
          </div>
        </Container>
      </div>
    ),
    contentPadding: "md",
    children: (
      <Section spaceY="lg">
        <PageHeader
          title="Settings"
          description="Manage your account settings and preferences"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Settings" }]}
          actions={
            <>
              <Button variant="outline" size="md">
                Cancel
              </Button>
              <Button variant="primary" size="md">
                Save Changes
              </Button>
            </>
          }
        />
        <Container>
          <div style={{ padding: "2rem 0" }}>
            <h2>Account Settings</h2>
            <p>This is the main content area demonstrating the full page structure:</p>
            <ul>
              <li>ContentShell (body-level wrapper)</li>
              <li>PageHeader (semantic page header)</li>
              <li>Section (page-level block container)</li>
              <li>Container (content width constraint)</li>
            </ul>
          </div>
        </Container>
      </Section>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Complete example demonstrating ContentShell -> PageHeader -> Section composition pattern",
      },
    },
  },
};

/**
 * ContentShell with responsive contentPadding.
 */
export const ResponsiveContentPadding: Story = {
  args: {
    contentPadding: {
      base: "sm",
      md: "md",
      lg: "xl",
    },
    children: (
      <Section spaceY="lg">
        <Container>
          <h1>Responsive Padding</h1>
          <p>
            This ContentShell uses responsive contentPadding: sm on mobile, md on tablet, xl on
            desktop.
          </p>
        </Container>
      </Section>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "ContentShell with responsive contentPadding using responsive object",
      },
    },
  },
};
