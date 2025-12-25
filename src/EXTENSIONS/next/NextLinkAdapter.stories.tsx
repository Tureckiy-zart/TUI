import type { Meta, StoryObj } from "@storybook/react";

import { NextLinkAdapter } from "./NextLinkAdapter";

// Mock the NextLink behavior for Storybook to avoid errors
// In a real app this would be real next/link
const meta: Meta<typeof NextLinkAdapter> = {
  title: "Extensions/NextJS/NextLinkAdapter",
  component: NextLinkAdapter,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "accent", "outline", "ghost", "link", "destructive"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    href: {
      control: "text",
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Adapter component bridging `next/link` with Foundation `Link`. Used to enable SPA navigation in Next.js applications.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NextLinkAdapter>;

export const Default: Story = {
  args: {
    href: "/dashboard",
    children: "Dashboard Link",
  },
};

export const PrimaryVariant: Story = {
  args: {
    href: "/settings",
    variant: "primary",
    children: "Go to Settings",
  },
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <NextLinkAdapter {...args} href="/prev">
        Previous
      </NextLinkAdapter>
      <NextLinkAdapter {...args} href="/next" variant="outline">
        Next
      </NextLinkAdapter>
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    href: "/disabled",
    disabled: true,
    children: "Disabled Link",
  },
};

export const WithLeftIcon: Story = {
  args: {
    href: "/back",
    leftIcon: <span>←</span>,
    children: "Go Back",
  },
};

export const WithRightIcon: Story = {
  args: {
    href: "/forward",
    rightIcon: <span>→</span>,
    children: "Go Forward",
  },
};

export const WithBothIcons: Story = {
  args: {
    href: "/navigate",
    leftIcon: <span>←</span>,
    rightIcon: <span>→</span>,
    children: "Navigate",
  },
};

export const NextJsProps: Story = {
  args: {
    href: "/profile",
    prefetch: false,
    replace: true,
    scroll: false,
    variant: "primary",
    children: "Replace Navigation",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates Next.js-specific props: `prefetch={false}`, `replace={true}`, `scroll={false}`. These props control Next.js router behavior.",
      },
    },
  },
};

export const VariantComparison: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <NextLinkAdapter href="/primary" variant="primary">
        Primary Variant
      </NextLinkAdapter>
      <NextLinkAdapter href="/secondary" variant="secondary">
        Secondary Variant
      </NextLinkAdapter>
      <NextLinkAdapter href="/accent" variant="accent">
        Accent Variant
      </NextLinkAdapter>
      <NextLinkAdapter href="/outline" variant="outline">
        Outline Variant
      </NextLinkAdapter>
      <NextLinkAdapter href="/ghost" variant="ghost">
        Ghost Variant
      </NextLinkAdapter>
      <NextLinkAdapter href="/link" variant="link">
        Link Variant (default)
      </NextLinkAdapter>
      <NextLinkAdapter href="/destructive" variant="destructive">
        Destructive Variant
      </NextLinkAdapter>
    </div>
  ),
};
