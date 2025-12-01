import type { Meta, StoryObj } from "@storybook/react";
import { FeatureSection, type FeatureItem } from "./FeatureSection";

const meta: Meta<typeof FeatureSection> = {
  title: "Sections/FeatureSection",
  component: FeatureSection,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "FeatureSection component for displaying feature grids. Displays an array of features in a responsive grid layout with token-driven cards that adapt to theme changes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    features: {
      control: false,
      description: "Array of feature items to display",
    },
    title: {
      control: { type: "text" },
      description: "Section title",
    },
    description: {
      control: { type: "text" },
      description: "Section description",
    },
    columns: {
      control: { type: "select" },
      options: [1, 2, 3, 4],
      description: "Number of columns in the grid",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "3" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FeatureSection>;

const sampleFeatures: FeatureItem[] = [
  {
    icon: "🚀",
    title: "Fast Performance",
    description: "Optimized components built for speed and efficiency.",
  },
  {
    icon: "🎨",
    title: "Beautiful Design",
    description: "Modern, clean interfaces that look great out of the box.",
  },
  {
    icon: "♿",
    title: "Accessible",
    description: "WCAG AA compliant with full keyboard navigation support.",
  },
  {
    icon: "🎯",
    title: "Type Safe",
    description: "Built with TypeScript for better developer experience.",
  },
  {
    icon: "🎭",
    title: "Themeable",
    description: "Customize colors, spacing, and more with design tokens.",
  },
  {
    icon: "📱",
    title: "Responsive",
    description: "Works perfectly on all devices and screen sizes.",
  },
];

export const Default: Story = {
  args: {
    title: "Features",
    description: "Everything you need to build modern web applications.",
    features: sampleFeatures.slice(0, 3),
    columns: 3,
  },
};

export const WithTitle: Story = {
  args: {
    title: "Why Choose Tenerife UI?",
    description: "A comprehensive component library designed for modern web applications.",
    features: sampleFeatures,
    columns: 3,
  },
};

export const TwoColumns: Story = {
  args: {
    title: "Key Features",
    features: sampleFeatures.slice(0, 4),
    columns: 2,
  },
};

export const FourColumns: Story = {
  args: {
    title: "All Features",
    features: sampleFeatures,
    columns: 4,
  },
};

export const SingleColumn: Story = {
  args: {
    title: "Feature List",
    features: sampleFeatures.slice(0, 3),
    columns: 1,
  },
};

export const ManyFeatures: Story = {
  args: {
    title: "Complete Feature Set",
    description: "Explore all the features that make Tenerife UI special.",
    features: [
      ...sampleFeatures,
      {
        icon: "🔒",
        title: "Secure",
        description: "Built with security best practices in mind.",
      },
      {
        icon: "📚",
        title: "Well Documented",
        description: "Comprehensive documentation and examples.",
      },
      {
        icon: "🛠️",
        title: "Customizable",
        description: "Easily customize components to match your brand.",
      },
    ],
    columns: 3,
  },
};

export const Minimal: Story = {
  args: {
    features: sampleFeatures.slice(0, 2),
    columns: 2,
  },
};

export const WithCustomIcons: Story = {
  args: {
    title: "Custom Icons",
    description: "Use any React node as an icon, including SVG components.",
    features: [
      {
        icon: (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        ),
        title: "Lightning Fast",
        description: "Optimized for performance and speed.",
      },
      {
        icon: (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
          </svg>
        ),
        title: "Fully Customizable",
        description: "Tailor every aspect to your needs.",
      },
      {
        icon: (
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        ),
        title: "Secure & Reliable",
        description: "Built with security and reliability in mind.",
      },
    ],
    columns: 3,
  },
};

export const LongDescriptions: Story = {
  args: {
    title: "Detailed Features",
    features: [
      {
        icon: "📖",
        title: "Comprehensive Documentation",
        description:
          "Our documentation includes detailed guides, API references, examples, and best practices to help you get started quickly and build amazing applications.",
      },
      {
        icon: "🎨",
        title: "Design System Integration",
        description:
          "Seamlessly integrates with your existing design system or use our pre-built themes. All components are token-driven and fully customizable.",
      },
      {
        icon: "⚡",
        title: "Performance Optimized",
        description:
          "Every component is optimized for performance with code splitting, lazy loading, and minimal bundle sizes to ensure fast load times.",
      },
    ],
    columns: 3,
  },
};

export const ResponsiveGrid: Story = {
  args: {
    title: "Responsive Grid Layout",
    description: "The grid automatically adapts to different screen sizes.",
    features: sampleFeatures,
    columns: 3,
  },
  parameters: {
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile (1 col)",
          styles: {
            width: "375px",
            height: "667px",
          },
        },
        tablet: {
          name: "Tablet (2 cols)",
          styles: {
            width: "768px",
            height: "1024px",
          },
        },
        desktop: {
          name: "Desktop (3 cols)",
          styles: {
            width: "1920px",
            height: "1080px",
          },
        },
      },
    },
  },
};
