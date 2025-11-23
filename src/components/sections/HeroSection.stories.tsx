import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/primitives/Button";
import { HeroSection } from "./HeroSection";

const meta: Meta<typeof HeroSection> = {
  title: "Sections/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "HeroSection component for prominent page headers. Supports full-width and split layouts with flexible content slots, fluid typography, and token-based styling.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["full-width", "split"],
      description: "Layout variant",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "full-width" },
      },
    },
    background: {
      control: { type: "select" },
      options: ["default", "muted", "card"],
      description: "Background color variant",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    title: {
      control: { type: "text" },
      description: "Hero title content",
    },
    description: {
      control: { type: "text" },
      description: "Hero description content",
    },
    actions: {
      control: false,
      description: "Action buttons or links",
    },
    media: {
      control: false,
      description: "Media content (image, video, etc.)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {
    title: "Welcome to Tenerife UI",
    description:
      "A beautiful, accessible, and theme-aware component library built with React and TypeScript.",
    actions: (
      <>
        <Button variant="primary">Get Started</Button>
        <Button variant="outline">Learn More</Button>
      </>
    ),
  },
};

export const FullWidth: Story = {
  args: {
    variant: "full-width",
    title: "Build Amazing Interfaces",
    description:
      "Create beautiful, responsive user interfaces with our comprehensive component library.",
    actions: (
      <>
        <Button variant="primary" size="lg">
          Start Building
        </Button>
        <Button variant="outline" size="lg">
          View Documentation
        </Button>
      </>
    ),
  },
};

export const Split: Story = {
  args: {
    variant: "split",
    title: "Premium Design System",
    description:
      "A complete design system with tokens, themes, and components that work seamlessly together.",
    actions: (
      <>
        <Button variant="primary">Explore Components</Button>
        <Button variant="ghost">View Examples</Button>
      </>
    ),
    media: (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
        <span className="text-4xl">🎨</span>
      </div>
    ),
  },
};

export const WithMedia: Story = {
  args: {
    variant: "full-width",
    title: "Experience the Future",
    description: "Modern UI components that adapt to your brand and user preferences.",
    actions: (
      <>
        <Button variant="primary" size="lg">
          Get Started
        </Button>
      </>
    ),
    media: (
      <div className="flex aspect-video w-full max-w-2xl items-center justify-center rounded-xl bg-gradient-to-br from-primary/30 via-accent/30 to-secondary/30">
        <span className="text-6xl">✨</span>
      </div>
    ),
  },
};

export const MutedBackground: Story = {
  args: {
    variant: "full-width",
    background: "muted",
    title: "Token-Driven Design",
    description: "All components use design tokens for consistent styling and easy theming.",
    actions: (
      <>
        <Button variant="primary">Learn About Tokens</Button>
      </>
    ),
  },
};

export const CardBackground: Story = {
  args: {
    variant: "split",
    background: "card",
    title: "Fully Accessible",
    description: "Every component meets WCAG AA standards and supports keyboard navigation.",
    actions: (
      <>
        <Button variant="primary">Accessibility Guide</Button>
        <Button variant="outline">Test Components</Button>
      </>
    ),
    media: (
      <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-primary/10">
        <span className="text-5xl">♿</span>
      </div>
    ),
  },
};

export const Minimal: Story = {
  args: {
    title: "Simple and Clean",
    description: "Sometimes less is more.",
  },
};

export const LongContent: Story = {
  args: {
    variant: "split",
    title:
      "This is a Very Long Hero Title That Should Still Look Good and Be Readable Across All Screen Sizes",
    description:
      "This is a longer description that demonstrates how the component handles extended text content. It should wrap nicely and maintain good readability. The typography should scale appropriately and the layout should remain balanced even with more content.",
    actions: (
      <>
        <Button variant="primary">Primary Action</Button>
        <Button variant="outline">Secondary Action</Button>
        <Button variant="ghost">Tertiary Action</Button>
      </>
    ),
    media: (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-muted">
        <span className="text-3xl text-muted-foreground">Media Content</span>
      </div>
    ),
  },
};

export const ResponsiveExample: Story = {
  args: {
    variant: "split",
    title: "Responsive by Default",
    description:
      "This hero section adapts beautifully to all screen sizes, from mobile to desktop.",
    actions: (
      <>
        <Button variant="primary" size="lg">
          Try It Out
        </Button>
      </>
    ),
    media: (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
        <div className="space-y-2 text-center">
          <div className="text-4xl">📱</div>
          <div className="text-sm text-muted-foreground">Responsive Design</div>
        </div>
      </div>
    ),
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
