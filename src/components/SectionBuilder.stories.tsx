/**
 * SectionBuilder Storybook Stories
 *
 * Comprehensive examples demonstrating SectionBuilder usage,
 * presets, theme variations, and before/after comparisons.
 */

import { Box } from "@/components/layout/Box";
import { Button } from "@/components/primitives/Button";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { SectionBuilder } from "./SectionBuilder";
import {
  createFeatureGridConfig,
  createSplitLayoutConfig,
  createTestimonialConfig,
  type FeatureItem,
  type TestimonialItem,
} from "./SectionBuilder.presets";

const meta: Meta<typeof SectionBuilder> = {
  title: "Components/SectionBuilder",
  component: SectionBuilder,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
SectionBuilder enables developers to construct custom marketing sections from configuration objects without writing repetitive markup.

**Features:**
- Token-driven styling (no raw CSS)
- Theme-aware (responds to light/dark mode and brand themes)
- Responsive layouts (split, grid, stacked)
- Flexible content slots (header, body, footer, overlay)
- Built-in presets for common patterns

**Layout Types:**
- \`split\` - Left/right content with optional image
- \`grid\` - Grid of items with configurable columns
- \`stacked\` - Vertical or horizontal stacking

All spacing, colors, and typography use design tokens.
        `,
      },
    },
  },
  argTypes: {
    config: {
      control: false,
      description: "SectionBuilder configuration object",
    },
    layout: {
      control: false,
      description: "Layout configuration (split, grid, or stacked)",
    },
    background: {
      control: false,
      description: "Background configuration (surface variant or color token)",
    },
    spacing: {
      control: false,
      description: "Spacing configuration (padding/margin)",
    },
    slots: {
      control: false,
      description: "Content slots (header, body, footer, overlay)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SectionBuilder>;

/**
 * Default/Custom Section
 * Demonstrates basic SectionBuilder with custom configuration
 */
export const Default: Story = {
  args: {
    config: {
      layout: {
        type: "split",
        left: {
          type: "text",
          content: "Welcome to SectionBuilder",
          typography: {
            level: 1,
            size: "4xl",
          },
        },
        right: {
          type: "text",
          content:
            "Build beautiful sections with configuration objects. No repetitive markup needed.",
          typography: {
            size: "lg",
            variant: "muted",
          },
        },
        gap: "xl",
        align: "center",
      },
      background: {
        type: "surface",
        variant: "elevated1",
      },
      spacing: {
        paddingY: "xl",
        paddingX: "lg",
      },
    },
  },
};

/**
 * Split Layout - Image Right
 * Left/right content with image on the right
 */
export const SplitLayoutImageRight: Story = {
  args: {
    config: createSplitLayoutConfig({
      left: {
        type: "text",
        content: "Build Amazing Sections",
        typography: {
          level: 1,
          size: "4xl",
        },
      },
      right: {
        type: "text",
        content:
          "SectionBuilder composes layout primitives and core components based on configuration objects. All styling uses design tokens.",
        typography: {
          size: "lg",
          variant: "muted",
        },
      },
      media: {
        type: "media",
        content: (
          <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
            <Text className="text-4xl">🎨</Text>
          </div>
        ),
      },
      imagePosition: "right",
      gap: "xl",
      align: "center",
      background: {
        type: "surface",
        variant: "base",
      },
      spacing: {
        paddingY: "2xl",
        paddingX: "lg",
      },
    }),
  },
};

/**
 * Split Layout - Image Left
 * Left/right content with image on the left
 */
export const SplitLayoutImageLeft: Story = {
  args: {
    config: createSplitLayoutConfig({
      left: {
        type: "text",
        content: "Responsive by Default",
        typography: {
          level: 2,
          size: "3xl",
        },
      },
      right: {
        type: "text",
        content:
          "All layouts are responsive. Split layouts stack vertically on mobile, grid layouts adapt column counts, and stacked layouts maintain spacing.",
        typography: {
          size: "md",
          variant: "muted",
        },
      },
      media: {
        type: "media",
        content: (
          <div className="flex h-48 w-full items-center justify-center rounded-lg bg-gradient-to-br from-secondary/20 to-primary/20">
            <Text className="text-3xl">📱</Text>
          </div>
        ),
      },
      imagePosition: "left",
      gap: "lg",
      align: "start",
      background: {
        type: "surface",
        variant: "elevated2",
      },
      spacing: {
        paddingY: "xl",
        paddingX: "lg",
      },
    }),
  },
};

/**
 * Feature Grid - 3 Columns
 * Grid of feature cards with icons, titles, and descriptions
 */
export const FeatureGrid: Story = {
  args: {
    config: createFeatureGridConfig({
      title: "Powerful Features",
      description: "Everything you need to build beautiful sections",
      features: [
        {
          icon: <span className="text-2xl">⚡</span>,
          title: "Lightning Fast",
          description: "Built with performance in mind. No unnecessary re-renders.",
        },
        {
          icon: <span className="text-2xl">🎨</span>,
          title: "Fully Themed",
          description: "Responds to light/dark mode and brand themes automatically.",
        },
        {
          icon: <span className="text-2xl">📱</span>,
          title: "Responsive",
          description: "All layouts adapt to different screen sizes seamlessly.",
        },
        {
          icon: <span className="text-2xl">🔧</span>,
          title: "Customizable",
          description: "Override any default with props or custom configurations.",
        },
        {
          icon: <span className="text-2xl">♿</span>,
          title: "Accessible",
          description: "Built with accessibility best practices from the ground up.",
        },
        {
          icon: <span className="text-2xl">🎯</span>,
          title: "Type Safe",
          description: "Full TypeScript support with comprehensive type definitions.",
        },
      ] as FeatureItem[],
      columns: 3,
      gap: "lg",
      background: {
        type: "surface",
        variant: "base",
      },
      spacing: {
        paddingY: "2xl",
        paddingX: "lg",
      },
    }),
  },
};

/**
 * Feature Grid - 2 Columns
 * Smaller grid for focused feature display
 */
export const FeatureGridTwoColumns: Story = {
  args: {
    config: createFeatureGridConfig({
      title: "Why Choose SectionBuilder?",
      features: [
        {
          icon: <span className="text-3xl">🚀</span>,
          title: "Developer Experience",
          description:
            "Build sections with configuration objects. No need to write repetitive markup or manage complex layout logic.",
        },
        {
          icon: <span className="text-3xl">💎</span>,
          title: "Design System Integration",
          description:
            "Fully integrated with Tenerife UI design tokens. All spacing, colors, and typography use the token system.",
        },
      ] as FeatureItem[],
      columns: 2,
      gap: "xl",
      background: {
        type: "surface",
        variant: "elevated1",
      },
      spacing: {
        paddingY: "xl",
        paddingX: "lg",
      },
    }),
  },
};

/**
 * Testimonial Section
 * Stack of testimonial cards with quotes, authors, and avatars
 */
export const Testimonials: Story = {
  args: {
    config: createTestimonialConfig({
      title: "What Developers Say",
      description: "Real feedback from developers using SectionBuilder",
      testimonials: [
        {
          quote:
            "SectionBuilder has completely transformed how we build marketing sections. The configuration-based approach is intuitive and powerful.",
          author: "Sarah Johnson",
          role: "Frontend Lead",
          avatar: (
            <div className="flex h-full w-full items-center justify-center bg-primary/20 font-bold text-primary">
              SJ
            </div>
          ),
          rating: 5,
        },
        {
          quote:
            "The token-driven architecture means our sections automatically adapt to theme changes. It's exactly what we needed.",
          author: "Michael Chen",
          role: "UI Designer",
          avatar: (
            <div className="flex h-full w-full items-center justify-center bg-accent/20 font-bold text-accent">
              MC
            </div>
          ),
          rating: 5,
        },
        {
          quote:
            "Building sections used to take hours. Now it takes minutes. The presets are especially helpful for common patterns.",
          author: "Emily Rodriguez",
          role: "Full Stack Developer",
          avatar: (
            <div className="flex h-full w-full items-center justify-center bg-secondary/20 font-bold text-secondary-foreground">
              ER
            </div>
          ),
          rating: 5,
        },
      ] as TestimonialItem[],
      direction: "vertical",
      gap: "lg",
      background: {
        type: "surface",
        variant: "base",
      },
      spacing: {
        paddingY: "2xl",
        paddingX: "lg",
      },
    }),
  },
};

/**
 * Custom Section with All Slots
 * Demonstrates header, body, layout, footer, and overlay slots
 */
export const CustomSectionWithAllSlots: Story = {
  args: {
    config: {
      layout: {
        type: "stacked",
        direction: "vertical",
        gap: "md",
        items: [
          {
            type: "text",
            content: "Item 1",
            typography: { level: 3 },
          },
          {
            type: "text",
            content: "Item 2",
            typography: { level: 3 },
          },
          {
            type: "text",
            content: "Item 3",
            typography: { level: 3 },
          },
        ],
      },
      slots: {
        header: {
          type: "text",
          content: "Section Header",
          typography: {
            level: 2,
            size: "3xl",
          },
        },
        body: {
          type: "text",
          content: "This is the body content that appears above the layout.",
          typography: {
            size: "md",
            variant: "muted",
          },
        },
        footer: {
          type: "actions",
          content: (
            <>
              <Button variant="primary">Primary Action</Button>
              <Button variant="outline">Secondary Action</Button>
            </>
          ),
          align: "center",
          justify: "center",
          gap: "md",
        },
        overlay: {
          type: "text",
          content: "Overlay Content",
          typography: {
            variant: "primary",
            size: "lg",
          },
        },
      },
      background: {
        type: "surface",
        variant: "elevated2",
      },
      spacing: {
        paddingY: "xl",
        paddingX: "lg",
      },
    },
  },
};

/**
 * Before/After Comparison
 * Shows manual markup vs SectionBuilder config
 */
export const BeforeAfterComparison: Story = {
  render: () => {
    return (
      <div className="space-y-8 p-8">
        <div>
          <Heading level={2} className="mb-4">
            Before: Manual Markup
          </Heading>
          <div className="rounded-lg border bg-muted p-4 font-mono text-sm">
            <pre>{`<section className="py-xl px-lg bg-card">
  <div className="container mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
      <div>
        <h2>Title</h2>
        <p>Description</p>
      </div>
      <div>
        <img src="..." />
      </div>
    </div>
  </div>
</section>`}</pre>
          </div>
        </div>

        <div>
          <Heading level={2} className="mb-4">
            After: SectionBuilder
          </Heading>
          <div className="rounded-lg border bg-muted p-4 font-mono text-sm">
            <pre>{`<SectionBuilder
  config={createSplitLayoutConfig({
    left: { type: "text", content: "Title", ... },
    right: { type: "text", content: "Description", ... },
    media: <img src="..." />,
  })}
/>`}</pre>
          </div>
        </div>

        <div className="mt-8">
          <Heading level={3} className="mb-4">
            Result:
          </Heading>
          <SectionBuilder
            config={createSplitLayoutConfig({
              left: {
                type: "text",
                content: "Title",
                typography: { level: 2, size: "3xl" },
              },
              right: {
                type: "text",
                content: "Description",
                typography: { size: "md", variant: "muted" },
              },
              media: {
                type: "media",
                content: (
                  <div className="flex h-48 w-full items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                    <Text>Image</Text>
                  </div>
                ),
              },
              background: { type: "surface", variant: "elevated1" },
              spacing: { paddingY: "xl", paddingX: "lg" },
            })}
            layout={
              {
                type: "split",
              } as any
            }
          />
        </div>
      </div>
    );
  },
};

/**
 * Theme Showcase - Light Mode
 * Same section in light mode
 */
export const ThemeShowcaseLight: Story = {
  parameters: {
    backgrounds: { default: "light" },
  },
  args: {
    config: createFeatureGridConfig({
      title: "Theme Aware",
      description: "This section adapts to theme changes automatically",
      features: [
        {
          icon: <span className="text-2xl">🌞</span>,
          title: "Light Mode",
          description: "Optimized for light backgrounds",
        },
        {
          icon: <span className="text-2xl">🌙</span>,
          title: "Dark Mode",
          description: "Perfect contrast in dark mode",
        },
        {
          icon: <span className="text-2xl">🎨</span>,
          title: "Brand Themes",
          description: "Supports custom brand color schemes",
        },
      ] as FeatureItem[],
      columns: 3,
      background: {
        type: "surface",
        variant: "base",
      },
      spacing: {
        paddingY: "xl",
      },
    }),
  },
};

/**
 * Theme Showcase - Dark Mode
 * Same section in dark mode
 */
export const ThemeShowcaseDark: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  args: {
    config: createFeatureGridConfig({
      title: "Theme Aware",
      description: "This section adapts to theme changes automatically",
      features: [
        {
          icon: <span className="text-2xl">🌞</span>,
          title: "Light Mode",
          description: "Optimized for light backgrounds",
        },
        {
          icon: <span className="text-2xl">🌙</span>,
          title: "Dark Mode",
          description: "Perfect contrast in dark mode",
        },
        {
          icon: <span className="text-2xl">🎨</span>,
          title: "Brand Themes",
          description: "Supports custom brand color schemes",
        },
      ] as FeatureItem[],
      columns: 3,
      background: {
        type: "surface",
        variant: "base",
      },
      spacing: {
        paddingY: "xl",
      },
    }),
  },
};

/**
 * Grid Layout - Custom Items
 * Demonstrates custom item renderer
 */
export const GridLayoutCustomItems: Story = {
  args: {
    config: {
      layout: {
        type: "grid",
        columns: {
          base: 1,
          md: 2,
          lg: 4,
        },
        gap: "lg",
        items: ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8"],
        itemRenderer: (item, index) => {
          let content: React.ReactNode;
          if (typeof item === "string") {
            content = item;
          } else if (
            typeof item === "object" &&
            item !== null &&
            !React.isValidElement(item) &&
            "content" in item
          ) {
            content = (item as { content: React.ReactNode }).content;
          } else if (
            typeof item === "object" &&
            item !== null &&
            !React.isValidElement(item) &&
            "type" in item
          ) {
            // StructuredSlot - extract content
            const slot = item as { type: string; content?: React.ReactNode };
            content = slot.content || item;
          } else {
            content = item;
          }
          return (
            <Box
              key={index}
              p="md"
              radius="lg"
              bg="card"
              className="tm-motion-hover-lift border text-center shadow-sm"
            >
              {content}
            </Box>
          );
        },
      },
      background: {
        type: "surface",
        variant: "elevated1",
      },
      spacing: {
        paddingY: "xl",
        paddingX: "lg",
      },
    },
  },
};

/**
 * Stacked Layout - Horizontal
 * Horizontal stacking with spacing
 */
export const StackedLayoutHorizontal: Story = {
  args: {
    config: {
      layout: {
        type: "stacked",
        direction: "horizontal",
        gap: "md",
        align: "center",
        items: [
          {
            type: "text",
            content: "First",
            typography: { level: 3 },
          },
          {
            type: "text",
            content: "Second",
            typography: { level: 3 },
          },
          {
            type: "text",
            content: "Third",
            typography: { level: 3 },
          },
        ],
      },
      background: {
        type: "surface",
        variant: "elevated2",
      },
      spacing: {
        paddingY: "lg",
        paddingX: "lg",
      },
    },
  },
};

/**
 * Animation Props Example
 * Demonstrates using animation props for entrance and hover animations
 */
export const WithAnimationProps: Story = {
  args: {
    config: {
      layout: {
        type: "grid",
        columns: 3,
        gap: "md",
        items: [
          {
            type: "text",
            content: "Card 1",
            typography: { level: 3 },
          },
          {
            type: "text",
            content: "Card 2",
            typography: { level: 3 },
          },
          {
            type: "text",
            content: "Card 3",
            typography: { level: 3 },
          },
        ],
        itemRenderer: (item, index) => {
          let content: React.ReactNode;
          if (typeof item === "string") {
            content = item;
          } else if (
            typeof item === "object" &&
            item !== null &&
            !React.isValidElement(item) &&
            "content" in item
          ) {
            content = (item as { content: React.ReactNode }).content;
          } else if (
            typeof item === "object" &&
            item !== null &&
            !React.isValidElement(item) &&
            "type" in item
          ) {
            // StructuredSlot - extract content
            const slot = item as { type: string; content?: React.ReactNode };
            content = slot.content || item;
          } else {
            content = item;
          }
          return (
            <Box key={index} p="md" radius="lg" bg="card" className="border text-center shadow-sm">
              {content}
            </Box>
          );
        },
      },
      background: {
        type: "surface",
        variant: "elevated1",
      },
      spacing: {
        paddingY: "xl",
        paddingX: "lg",
      },
    },
    // Animation props example
    animation: {
      animation: "fadeInUp",
      hoverAnimation: "hoverLift",
    },
  },
};
