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
