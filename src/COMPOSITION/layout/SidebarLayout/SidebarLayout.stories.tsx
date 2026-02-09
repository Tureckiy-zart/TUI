import type { Meta, StoryObj } from "@storybook/react-vite";
import { Box } from "../Box";
import { SidebarLayout } from "./SidebarLayout";

const meta: Meta<typeof SidebarLayout> = {
  title: "Composition / Layout / SidebarLayout",
  component: SidebarLayout,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "SidebarLayout is a page-level compositional layout for pages with a sidebar and main content. Uses Grid internally for two-column layout and Stack for vertical collapse.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    sidebar: {
      control: { type: "object" },
      description: "Sidebar content (rendered as <aside>)",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    children: {
      control: { type: "object" },
      description: "Main content (rendered as <main>)",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    sidebarPosition: {
      control: { type: "select" },
      options: ["left", "right"],
      description: "Sidebar position - left or right",
      table: {
        type: { summary: '"left" | "right"' },
        defaultValue: { summary: '"left"' },
      },
    },
    sidebarWidth: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Sidebar width - token-based (sm=256px, md=320px, lg=384px)",
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: '"md"' },
      },
    },
    gap: {
      control: { type: "text" },
      description: "Gap between sidebar and content - token-based spacing",
      table: {
        type: { summary: "ResponsiveSpacing" },
        defaultValue: { summary: '"md"' },
      },
    },
    collapseAt: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", undefined],
      description:
        "Breakpoint at which layout collapses to vertical stack. When viewport width < breakpoint, layout switches from Grid to Stack.",
      table: {
        type: { summary: '"sm" | "md" | "lg" | "xl" | undefined' },
        defaultValue: { summary: "undefined" },
      },
    },
    sidebarAriaLabel: {
      control: { type: "text" },
      description:
        "ARIA label for the sidebar (<aside>) element. Required when multiple SidebarLayout components are used on the same page to ensure unique landmarks.",
      table: {
        type: { summary: "string | undefined" },
      },
    },
    mainAriaLabel: {
      control: { type: "text" },
      description:
        "ARIA label for the main content (<main>) element. Required when multiple SidebarLayout components are used on the same page to ensure unique landmarks.",
      table: {
        type: { summary: "string | undefined" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarLayout>;

/**
 * Default SidebarLayout usage with left sidebar and default width.
 */
export const Default: Story = {
  args: {
    sidebar: (
      <Box px="md" py="lg" bg="card" radius="md">
        <h2 style={{ margin: 0, marginBottom: "1rem" }}>Sidebar</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "0.5rem" }}>Navigation Item 1</li>
            <li style={{ marginBottom: "0.5rem" }}>Navigation Item 2</li>
            <li style={{ marginBottom: "0.5rem" }}>Navigation Item 3</li>
          </ul>
        </nav>
      </Box>
    ),
    children: (
      <Box px="md" py="lg">
        <h1 style={{ margin: 0, marginBottom: "1rem" }}>Main Content</h1>
        <p>
          This is the main content area. SidebarLayout provides a two-column layout with a sidebar
          on the left and main content on the right.
        </p>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Basic SidebarLayout with left sidebar and default width (md = 320px)",
      },
    },
  },
};

/**
 * SizesGallery demonstrates all sidebarWidth values (sm, md, lg).
 * Each layout has unique aria-label to ensure accessibility compliance when multiple layouts are used on the same page.
 */
export const SizesGallery: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Small Sidebar (256px)</h3>
        <SidebarLayout
          sidebar={
            <Box px="md" py="lg" radius="md">
              Small Sidebar
            </Box>
          }
          sidebarWidth="sm"
          sidebarAriaLabel="Small sidebar navigation"
          mainAriaLabel="Main content with small sidebar (256px width)"
        >
          <Box px="md" py="lg">
            <p>Main content with small sidebar (256px width)</p>
          </Box>
        </SidebarLayout>
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem" }}>Medium Sidebar (320px) - Default</h3>
        <SidebarLayout
          sidebar={
            <Box px="md" py="lg" bg="card" radius="md">
              Medium Sidebar
            </Box>
          }
          sidebarWidth="md"
          sidebarAriaLabel="Medium sidebar navigation"
          mainAriaLabel="Main content with medium sidebar (320px width) - default"
        >
          <Box px="md" py="lg">
            <p>Main content with medium sidebar (320px width) - default</p>
          </Box>
        </SidebarLayout>
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem" }}>Large Sidebar (384px)</h3>
        <SidebarLayout
          sidebar={
            <Box px="md" py="lg" bg="card" radius="md">
              Large Sidebar
            </Box>
          }
          sidebarWidth="lg"
          sidebarAriaLabel="Large sidebar navigation"
          mainAriaLabel="Main content with large sidebar (384px width)"
        >
          <Box px="md" py="lg">
            <p>Main content with large sidebar (384px width)</p>
          </Box>
        </SidebarLayout>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates all sidebarWidth values: sm (256px), md (320px), lg (384px). Each layout has unique aria-label to ensure accessibility compliance when multiple layouts are used on the same page.",
      },
    },
  },
};

/**
 * States demonstrates sidebarPosition values (left, right).
 */
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Left Sidebar (Default)</h3>
        <SidebarLayout
          sidebar={
            <Box px="md" py="lg" bg="card" radius="md">
              <nav>Left Sidebar</nav>
            </Box>
          }
          sidebarPosition="left"
          sidebarAriaLabel="Left sidebar navigation"
          mainAriaLabel="Main content with left sidebar"
        >
          <Box px="md" py="lg">
            <p>Main content with left sidebar (default position)</p>
          </Box>
        </SidebarLayout>
      </div>

      <div>
        <h3 style={{ marginBottom: "1rem" }}>Right Sidebar</h3>
        <SidebarLayout
          sidebar={
            <Box px="md" py="lg" bg="card" radius="md">
              <nav>Right Sidebar</nav>
            </Box>
          }
          sidebarPosition="right"
          sidebarAriaLabel="Right sidebar navigation"
          mainAriaLabel="Main content with right sidebar"
        >
          <Box px="md" py="lg">
            <p>Main content with right sidebar</p>
          </Box>
        </SidebarLayout>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates sidebarPosition values: left (default) and right. Each layout has unique aria-label to ensure accessibility compliance when multiple layouts are used on the same page.",
      },
    },
  },
};

/**
 * LeftSidebarPage demonstrates typical page layout with left sidebar.
 */
export const LeftSidebarPage: Story = {
  args: {
    sidebar: (
      <Box px="md" py="lg" radius="md" style={{ height: "100%" }}>
        <h2 style={{ margin: 0, marginBottom: "1rem" }}>Navigation</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li style={{ marginBottom: "0.75rem" }}>
              <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
                Dashboard
              </a>
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
                Settings
              </a>
            </li>
            <li style={{ marginBottom: "0.75rem" }}>
              <a href="#" style={{ textDecoration: "none", color: "inherit" }}>
                Profile
              </a>
            </li>
          </ul>
        </nav>
      </Box>
    ),
    children: (
      <Box px="md" py="lg">
        <h1 style={{ margin: 0, marginBottom: "1rem" }}>Dashboard</h1>
        <p style={{ marginBottom: "1rem" }}>
          This is a typical page layout with a left sidebar containing navigation and main content
          area.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
          <Box px="md" py="md" bg="card" radius="md">
            Card 1
          </Box>
          <Box px="md" py="md" bg="card" radius="md">
            Card 2
          </Box>
          <Box px="md" py="md" bg="card" radius="md">
            Card 3
          </Box>
        </div>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Typical page layout with left sidebar containing navigation and main content area",
      },
    },
  },
};

/**
 * RightSidebarPage demonstrates page layout with right sidebar.
 */
export const RightSidebarPage: Story = {
  args: {
    sidebar: (
      <Box px="md" py="lg" bg="card" radius="md" style={{ height: "100%" }}>
        <h2 style={{ margin: 0, marginBottom: "1rem" }}>Sidebar</h2>
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-[hsl(var(--tm-text-muted))])" }}>
          Additional information or actions can be placed in the right sidebar.
        </p>
      </Box>
    ),
    sidebarPosition: "right",
    children: (
      <Box px="md" py="lg">
        <h1 style={{ margin: 0, marginBottom: "1rem" }}>Article</h1>
        <p style={{ marginBottom: "1rem" }}>
          This is a typical article layout with main content on the left and a right sidebar
          containing additional information or actions.
        </p>
        <p>
          The right sidebar is useful for displaying related content, advertisements, or
          call-to-action elements.
        </p>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Page layout with right sidebar containing additional information or actions",
      },
    },
  },
};

/**
 * CollapsibleLayout demonstrates collapse behavior at different breakpoints.
 */
export const CollapsibleLayout: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem" }}>Collapse at md breakpoint (768px)</h3>
        <p
          style={{
            marginBottom: "1rem",
            fontSize: "0.875rem",
            color: "var(--color-text-[hsl(var(--tm-text-muted))])",
          }}
        >
          Resize the viewport below 768px to see the layout collapse to vertical stack.
        </p>
        <SidebarLayout
          sidebar={
            <Box px="md" py="lg" bg="card" radius="md">
              <nav>Sidebar</nav>
            </Box>
          }
          collapseAt="md"
        >
          <Box px="md" py="lg">
            <p>Main content. Layout collapses to vertical stack below md breakpoint (768px).</p>
          </Box>
        </SidebarLayout>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates collapse behavior. When viewport width is below the specified breakpoint, layout switches from Grid (horizontal) to Stack (vertical)",
      },
    },
  },
};

/**
 * ResponsiveSidebar demonstrates responsive gap usage.
 */
export const ResponsiveSidebar: Story = {
  args: {
    sidebar: (
      <Box px="md" py="lg" bg="card" radius="md">
        <nav>Sidebar</nav>
      </Box>
    ),
    gap: { base: "sm", md: "lg", lg: "xl" },
    children: (
      <Box px="md" py="lg">
        <h1 style={{ margin: 0, marginBottom: "1rem" }}>Responsive Gap</h1>
        <p>
          This SidebarLayout uses responsive gap spacing: sm on mobile, lg on tablet (md), and xl on
          desktop (lg).
        </p>
      </Box>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates responsive gap usage. Gap spacing adapts to viewport size: sm (base), lg (md breakpoint), xl (lg breakpoint)",
      },
    },
  },
};
