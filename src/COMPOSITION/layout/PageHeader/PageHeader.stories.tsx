import { Button } from "@/PRIMITIVES/Button";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageHeader } from "./PageHeader";

const meta: Meta<typeof PageHeader> = {
  title: "Composition / Layout / PageHeader",
  component: PageHeader,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "PageHeader is a semantic composition component that provides structured page header with predefined semantic slots (title, description, breadcrumbs, actions). Uses Foundation components (Heading, Text, Breadcrumbs) for semantic content. Composes layout primitives internally but does not expose layout props.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    title: {
      control: { type: "text" },
      description: "Main page title",
      table: {
        type: { summary: "string | React.ReactNode" },
      },
    },
    description: {
      control: { type: "text" },
      description: "Page description/subtitle",
      table: {
        type: { summary: "string | React.ReactNode" },
      },
    },
    breadcrumbs: {
      control: { type: "object" },
      description: "Breadcrumb items array",
      table: {
        type: { summary: "BreadcrumbItem[]" },
      },
    },
    actions: {
      control: { type: "object" },
      description: "Actions (buttons, links) displayed on the right side",
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
    as: {
      control: { type: "text" },
      description: "HTML element to render",
      table: {
        type: { summary: "keyof React.JSX.IntrinsicElements" },
        defaultValue: { summary: "header" },
      },
    },
    ariaLabel: {
      control: { type: "text" },
      description: "Accessible label for header region",
      table: {
        type: { summary: "string" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

/**
 * Default PageHeader usage with title only.
 */
export const Default: Story = {
  args: {
    title: "Page Title",
  },
  parameters: {
    docs: {
      description: {
        story: "Basic PageHeader with title only",
      },
    },
  },
};

/**
 * PageHeader with title and description.
 */
export const WithDescription: Story = {
  args: {
    title: "Page Title",
    description:
      "This is a page description that provides additional context about the page content.",
  },
  parameters: {
    docs: {
      description: {
        story: "PageHeader with title and description",
      },
    },
  },
};

/**
 * PageHeader with breadcrumbs.
 */
export const WithBreadcrumbs: Story = {
  args: {
    title: "Current Page",
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Section", href: "/section" },
      { label: "Current Page" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "PageHeader with breadcrumb navigation",
      },
    },
  },
};

/**
 * PageHeader with actions on the right side.
 */
export const WithActions: Story = {
  args: {
    title: "Page Title",
    description: "Page description text",
    actions: (
      <>
        <Button variant="outline" size="md">
          Cancel
        </Button>
        <Button variant="primary" size="md">
          Save
        </Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "PageHeader with action buttons on the right side",
      },
    },
  },
};

/**
 * Full example with all props.
 */
export const FullExample: Story = {
  args: {
    title: "Settings",
    description: "Manage your account settings and preferences",
    breadcrumbs: [{ label: "Home", href: "/" }, { label: "Settings" }],
    actions: (
      <>
        <Button variant="outline" size="md">
          Cancel
        </Button>
        <Button variant="primary" size="md">
          Save Changes
        </Button>
      </>
    ),
    ariaLabel: "Page header",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Complete PageHeader example with all props: title, description, breadcrumbs, and actions",
      },
    },
  },
};

/**
 * Custom HTML element using as prop.
 */
export const CustomElement: Story = {
  args: {
    title: "Page Title",
    description: "Rendered as div instead of header",
    as: "div",
  },
  parameters: {
    docs: {
      description: {
        story: "PageHeader rendered as a different HTML element using the as prop",
      },
    },
  },
};

/**
 * PageHeader with ReactNode title.
 */
export const ReactNodeTitle: Story = {
  args: {
    title: (
      <>
        <span>Custom </span>
        <span className="text-[hsl(var(--tm-primary))]">Title</span>
      </>
    ),
    description: "Title can be a ReactNode for custom formatting",
  },
  parameters: {
    docs: {
      description: {
        story: "PageHeader with ReactNode title for custom formatting",
      },
    },
  },
};

/**
 * PageHeader with only breadcrumbs.
 */
export const BreadcrumbsOnly: Story = {
  args: {
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "Section", href: "/section" },
      { label: "Current Page" },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: "PageHeader with only breadcrumbs, no title or description",
      },
    },
  },
};

/**
 * PageHeader with only actions.
 */
export const ActionsOnly: Story = {
  args: {
    actions: (
      <>
        <Button variant="outline" size="md">
          Action 1
        </Button>
        <Button variant="primary" size="md">
          Action 2
        </Button>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "PageHeader with only actions, no title or description",
      },
    },
  },
};
