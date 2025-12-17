"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Link component for navigation and interactive text. Supports 7 canonical variants and 5 sizes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["primary", "secondary", "accent", "outline", "ghost", "link", "destructive"],
      description: "Link variant style",
      table: {
        type: { summary: "LinkVariant" },
        defaultValue: { summary: "link" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Link size",
      table: {
        type: { summary: "LinkSize" },
        defaultValue: { summary: "md" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "link",
    children: "Link",
    href: "#",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Link",
    href: "#",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Link",
    href: "#",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
    children: "Accent Link",
    href: "#",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Link",
    href: "#",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost Link",
    href: "#",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive Link",
    href: "#",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Link variant="primary" href="#">
        Primary Link
      </Link>
      <Link variant="secondary" href="#">
        Secondary Link
      </Link>
      <Link variant="accent" href="#">
        Accent Link
      </Link>
      <Link variant="outline" href="#">
        Outline Link
      </Link>
      <Link variant="ghost" href="#">
        Ghost Link
      </Link>
      <Link variant="link" href="#">
        Link
      </Link>
      <Link variant="destructive" href="#">
        Destructive Link
      </Link>
    </div>
  ),
};

export const ExtraSmall: Story = {
  args: {
    size: "xs",
    children: "Extra Small Link",
    href: "#",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small Link",
    href: "#",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    children: "Medium Link",
    href: "#",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large Link",
    href: "#",
  },
};

export const ExtraLarge: Story = {
  args: {
    size: "xl",
    children: "Extra Large Link",
    href: "#",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Link size="xs" href="#">
        Extra Small Link
      </Link>
      <Link size="sm" href="#">
        Small Link
      </Link>
      <Link size="md" href="#">
        Medium Link
      </Link>
      <Link size="lg" href="#">
        Large Link
      </Link>
      <Link size="xl" href="#">
        Extra Large Link
      </Link>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Link href="#" leftIcon="→">
        Link with left icon
      </Link>
      <Link href="#" rightIcon="→">
        Link with right icon
      </Link>
      <Link href="#" leftIcon="←" rightIcon="→">
        Link with both icons
      </Link>
    </div>
  ),
};

export const VariantsWithSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div className="flex flex-col gap-xs">
        <h3 className="text-sm font-semibold">Primary Variant</h3>
        <div className="flex flex-wrap items-center gap-md">
          <Link variant="primary" size="xs" href="#">
            XS
          </Link>
          <Link variant="primary" size="sm" href="#">
            SM
          </Link>
          <Link variant="primary" size="md" href="#">
            MD
          </Link>
          <Link variant="primary" size="lg" href="#">
            LG
          </Link>
          <Link variant="primary" size="xl" href="#">
            XL
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-xs">
        <h3 className="text-sm font-semibold">Outline Variant</h3>
        <div className="flex flex-wrap items-center gap-md">
          <Link variant="outline" size="xs" href="#">
            XS
          </Link>
          <Link variant="outline" size="sm" href="#">
            SM
          </Link>
          <Link variant="outline" size="md" href="#">
            MD
          </Link>
          <Link variant="outline" size="lg" href="#">
            LG
          </Link>
          <Link variant="outline" size="xl" href="#">
            XL
          </Link>
        </div>
      </div>
    </div>
  ),
};
