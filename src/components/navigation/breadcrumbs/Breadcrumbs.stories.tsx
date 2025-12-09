import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";

const meta: Meta<typeof Breadcrumbs.Root> = {
  title: "Components/Navigation/Breadcrumbs",
  component: Breadcrumbs.Root,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Token-driven breadcrumbs component with semantic HTML structure.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    ariaLabel: {
      control: "text",
      description: "ARIA label for the navigation element",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumbs.Root>;

const defaultItems: BreadcrumbItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Category", href: "/products/category" },
  { label: "Current Page" },
];

export const Default: Story = {
  args: {
    items: defaultItems,
  },
};

export const WithLinks: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: "Post Title", href: "/blog/post" },
      { label: "Current Page" },
    ],
  },
};

export const Short: Story = {
  args: {
    items: [{ label: "Home", href: "/" }, { label: "Current Page" }],
  },
};

export const Long: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Section 1", href: "/section1" },
      { label: "Section 2", href: "/section1/section2" },
      { label: "Section 3", href: "/section1/section2/section3" },
      { label: "Section 4", href: "/section1/section2/section3/section4" },
      { label: "Current Page" },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    items: [
      { label: "Home", href: "/" },
      { label: "Disabled Item", disabled: true },
      { label: "Current Page" },
    ],
  },
};

export const CustomSeparator: Story = {
  render: () => (
    <Breadcrumbs.Root
      items={defaultItems}
      separator={<span className="mx-1 text-muted-foreground">/</span>}
    />
  ),
};
