import type { Meta, StoryObj } from "@storybook/react-vite";

import { NextLinkAdapter } from "./NextLinkAdapter";

// Mock the NextLink behavior for Storybook to avoid errors
// In a real app this would be real next/link
const meta: Meta<typeof NextLinkAdapter> = {
  title: "Extensions / NextLinkAdapter",
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
    leftIcon: <span>{"<-"}</span>,
    children: "Go Back",
  },
};

export const WithRightIcon: Story = {
  args: {
    href: "/forward",
    rightIcon: <span>{"->"}</span>,
    children: "Go Forward",
  },
};

export const WithBothIcons: Story = {
  args: {
    href: "/navigate",
    leftIcon: <span>{"<-"}</span>,
    rightIcon: <span>{"->"}</span>,
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
      <NextLinkAdapter href="/wrapper" variant="wrapper">
        Wrapper Variant
      </NextLinkAdapter>
      <NextLinkAdapter href="/destructive" variant="destructive">
        Destructive Variant
      </NextLinkAdapter>
    </div>
  ),
};

/**
 * Matrix Story (Canonical)
 * Demonstrates all variants - all sizes grid
 * Required per VARIANTS_SIZE_CANON.md for components with both size AND variant props
 */
export const Matrix: Story = {
  render: () => {
    const variants = [
      "primary",
      "secondary",
      "accent",
      "outline",
      "ghost",
      "link",
      "destructive",
    ] as const;
    const sizes = ["sm", "md", "lg"] as const;

    return (
      <div className="flex flex-col gap-6">
        {variants.map((variant) => (
          <div key={variant} className="flex flex-col gap-2">
            <div className="text-sm font-medium capitalize">{variant}</div>
            <div className="flex items-center gap-4">
              {sizes.map((size) => (
                <NextLinkAdapter
                  key={`${variant}-${size}`}
                  href={`/${variant}/${size}`}
                  variant={variant}
                  size={size}
                >
                  {size}
                </NextLinkAdapter>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Canonical Matrix story showing all variants - all sizes. Required per VARIANTS_SIZE_CANON for components with both size and variant props.",
      },
    },
  },
};

/**
 * States Story (Canonical)
 * Demonstrates all variants - all sizes - all states
 * Required per VARIANTS_SIZE_CANON.md for interactive components
 */
export const States: Story = {
  render: () => {
    const variants = [
      "primary",
      "secondary",
      "accent",
      "outline",
      "ghost",
      "link",
      "destructive",
    ] as const;
    const sizes = ["sm", "md", "lg"] as const;
    const states = [
      { label: "Default", props: {} },
      { label: "Disabled", props: { disabled: true } },
    ] as const;

    return (
      <div className="flex flex-col gap-8">
        {states.map((state) => (
          <div key={state.label} className="flex flex-col gap-4">
            <div className="text-lg font-semibold">{state.label}</div>
            <div className="flex flex-col gap-6">
              {variants.map((variant) => (
                <div key={variant} className="flex flex-col gap-2">
                  <div className="text-sm font-medium capitalize">{variant}</div>
                  <div className="flex items-center gap-4">
                    {sizes.map((size) => (
                      <NextLinkAdapter
                        key={`${variant}-${size}-${state.label}`}
                        href={`/${variant}/${size}/${state.label}`}
                        variant={variant}
                        size={size}
                        {...state.props}
                      >
                        {size}
                      </NextLinkAdapter>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Canonical States story showing all variants - all sizes - all states (default, disabled). Required per VARIANTS_SIZE_CANON for interactive components.",
      },
    },
  },
};

/**
 * SizesGallery Story (Canonical)
 * Demonstrates all sizes with different content lengths
 * Required per SIZE_MAPPING_SPEC.md for components with size prop
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes = ["sm", "md", "lg"] as const;
    const contentVariations = [
      { label: "Short", content: "Link" },
      { label: "Medium", content: "Navigation Link" },
      { label: "Long", content: "Extended Navigation Link Text" },
      { label: "With Left Icon", content: "Back", leftIcon: <span>{"<-"}</span> },
      { label: "With Right Icon", content: "Next", rightIcon: <span>{"->"}</span> },
      {
        label: "With Both Icons",
        content: "Navigate",
        leftIcon: <span>{"<-"}</span>,
        rightIcon: <span>{"->"}</span>,
      },
    ];

    return (
      <div className="flex flex-col gap-8">
        {sizes.map((size) => (
          <div key={size} className="flex flex-col gap-4">
            <div className="text-lg font-semibold capitalize">Size: {size}</div>
            <div className="flex flex-col gap-4">
              {contentVariations.map((variation) => (
                <div key={variation.label} className="flex items-center gap-4">
                  <div className="w-40 text-sm text-muted-foreground">{variation.label}</div>
                  <NextLinkAdapter
                    href={`/${size}/${variation.label}`}
                    size={size}
                    variant="primary"
                    leftIcon={variation.leftIcon}
                    rightIcon={variation.rightIcon}
                  >
                    {variation.content}
                  </NextLinkAdapter>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Canonical SizesGallery story showing all sizes with different content lengths and icon combinations. Required per SIZE_MAPPING_SPEC for components with size prop.",
      },
    },
  },
};
