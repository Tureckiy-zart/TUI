import type { Meta, StoryObj } from "@storybook/react";
import { CTASection } from "./CTASection";

const meta: Meta<typeof CTASection> = {
  title: "Sections/CTASection",
  component: CTASection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "CTASection component for call-to-action sections. Displays a headline, description, and action buttons with centered or split layouts.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    headline: {
      control: { type: "text" },
      description: "CTA headline content",
    },
    description: {
      control: { type: "text" },
      description: "CTA description content",
    },
    layout: {
      control: { type: "select" },
      options: ["centered", "split"],
      description: "Layout variant",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "centered" },
      },
    },
    primaryAction: {
      control: false,
      description: "Primary action button configuration",
    },
    secondaryAction: {
      control: false,
      description: "Secondary action button configuration",
    },
  },
};

export default meta;
type Story = StoryObj<typeof CTASection>;

export const Default: Story = {
  args: {
    headline: "Ready to get started?",
    description: "Join thousands of developers building amazing applications with Tenerife UI.",
    primaryAction: {
      label: "Get Started",
      onClick: () => console.log("Get Started clicked"),
    },
    secondaryAction: {
      label: "Learn More",
      onClick: () => console.log("Learn More clicked"),
    },
  },
};

export const Centered: Story = {
  args: {
    layout: "centered",
    headline: "Start Building Today",
    description: "Get access to all components, themes, and documentation.",
    primaryAction: {
      label: "Sign Up Free",
      onClick: () => console.log("Sign Up clicked"),
    },
    secondaryAction: {
      label: "View Documentation",
      onClick: () => console.log("View Docs clicked"),
    },
  },
};

export const Split: Story = {
  args: {
    layout: "split",
    headline: "Transform Your Workflow",
    description: "Build faster with our comprehensive component library and design system.",
    primaryAction: {
      label: "Try It Now",
      onClick: () => console.log("Try It clicked"),
    },
    secondaryAction: {
      label: "Schedule Demo",
      onClick: () => console.log("Schedule Demo clicked"),
    },
  },
};

export const PrimaryOnly: Story = {
  args: {
    headline: "Ready to Get Started?",
    description: "Start building amazing applications today.",
    primaryAction: {
      label: "Get Started",
      onClick: () => console.log("Get Started clicked"),
    },
  },
};

export const WithLinks: Story = {
  args: {
    headline: "Explore Our Components",
    description: "Browse our component library and see what you can build.",
    primaryAction: {
      label: "View Components",
      href: "/components",
      variant: "primary",
    },
    secondaryAction: {
      label: "Read Docs",
      href: "/docs",
      variant: "outline",
    },
  },
};

export const DifferentVariants: Story = {
  args: {
    headline: "Choose Your Style",
    description: "Customize button variants to match your brand.",
    primaryAction: {
      label: "Primary Action",
      onClick: () => console.log("Primary clicked"),
      variant: "primary",
    },
    secondaryAction: {
      label: "Secondary Action",
      onClick: () => console.log("Secondary clicked"),
      variant: "secondary",
    },
  },
};

export const AllButtonVariants: Story = {
  render: () => (
    <div className="space-y-xl">
      <CTASection
        headline="Primary + Outline"
        description="Classic combination"
        primaryAction={{
          label: "Primary",
          onClick: () => {},
          variant: "primary",
        }}
        secondaryAction={{
          label: "Outline",
          onClick: () => {},
          variant: "outline",
        }}
      />
      <CTASection
        headline="Primary + Ghost"
        description="Subtle secondary action"
        primaryAction={{
          label: "Primary",
          onClick: () => {},
          variant: "primary",
        }}
        secondaryAction={{
          label: "Ghost",
          onClick: () => {},
          variant: "ghost",
        }}
      />
      <CTASection
        headline="Secondary + Outline"
        description="Alternative styling"
        primaryAction={{
          label: "Secondary",
          onClick: () => {},
          variant: "secondary",
        }}
        secondaryAction={{
          label: "Secondary",
          onClick: () => {},
          variant: "secondary",
        }}
      />
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    layout: "split",
    headline:
      "This is a Very Long Headline That Demonstrates How the Component Handles Extended Text Content",
    description:
      "This is a longer description that shows how the component handles extended text. It should wrap nicely and maintain good readability across all screen sizes. The layout should remain balanced and visually appealing even with more content.",
    primaryAction: {
      label: "Primary Action Button",
      onClick: () => console.log("Primary clicked"),
    },
    secondaryAction: {
      label: "Secondary Action",
      onClick: () => console.log("Secondary clicked"),
    },
  },
};

export const Minimal: Story = {
  args: {
    headline: "Simple CTA",
  },
};

export const WithDescriptionOnly: Story = {
  args: {
    headline: "Get Started",
    description: "Join our community of developers building amazing applications.",
  },
};

export const ResponsiveExample: Story = {
  args: {
    layout: "split",
    headline: "Responsive Layout",
    description: "This CTA section adapts beautifully to all screen sizes.",
    primaryAction: {
      label: "Get Started",
      onClick: () => console.log("Get Started clicked"),
    },
    secondaryAction: {
      label: "Learn More",
      onClick: () => console.log("Learn More clicked"),
    },
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "375px",
            height: "667px",
          },
        },
        tablet: {
          name: "Tablet",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        desktop: {
          name: "Desktop",
          styles: {
            width: "1920px",
            height: "1080px",
          },
        },
      },
    },
  },
};

export const MultipleCTAs: Story = {
  render: () => (
    <div className="space-y-0">
      <CTASection
        headline="First CTA Section"
        description="This is the first call-to-action section."
        primaryAction={{
          label: "Action 1",
          onClick: () => {},
        }}
        layout="centered"
      />
      <CTASection
        headline="Second CTA Section"
        description="This is the second call-to-action section with a different layout."
        primaryAction={{
          label: "Action 2",
          onClick: () => {},
        }}
        secondaryAction={{
          label: "Cancel",
          onClick: () => {},
        }}
        layout="split"
      />
    </div>
  ),
};
