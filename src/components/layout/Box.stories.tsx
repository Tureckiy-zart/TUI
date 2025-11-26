import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";

const meta: Meta<typeof Box> = {
  title: "Layout/Box",
  component: Box,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Token-driven base container component with support for padding, margin, background, radius, and responsive props. All styling uses CSS variables from the token system.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    p: {
      control: { type: "text" },
      description: "Padding (all sides) - uses spacing tokens",
      table: {
        type: { summary: "SpacingValue | ResponsiveValue<SpacingValue>" },
      },
    },
    bg: {
      control: { type: "text" },
      description: "Background color - uses color tokens",
      table: {
        type: { summary: "ColorValue | ResponsiveValue<ColorValue>" },
      },
    },
    radius: {
      control: { type: "select" },
      options: ["none", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
      description: "Border radius - uses radius tokens",
      table: {
        type: { summary: "RadiusValue | ResponsiveValue<RadiusValue>" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
  args: {
    children: "Box content",
  },
};

export const WithPadding: Story = {
  args: {
    p: 4,
    children: "Box with padding (p=4)",
  },
};

export const WithMargin: Story = {
  args: {
    m: 6,
    children: "Box with margin (m=6)",
  },
};

export const WithBackground: Story = {
  args: {
    bg: "background",
    p: 4,
    radius: "md",
    children: "Box with background and padding",
  },
};

export const WithRadius: Story = {
  render: () => (
    <div className="space-y-lg">
      <Box radius="none" bg="muted" p={4}>
        No radius
      </Box>
      <Box radius="sm" bg="muted" p={4}>
        Small radius
      </Box>
      <Box radius="md" bg="muted" p={4}>
        Medium radius (default)
      </Box>
      <Box radius="lg" bg="muted" p={4}>
        Large radius
      </Box>
      <Box radius="full" bg="muted" p={4}>
        Full radius (pill)
      </Box>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different border radius values using token system",
      },
    },
  },
};

export const DirectionalSpacing: Story = {
  render: () => (
    <div className="space-y-lg">
      <Box pt={4} pr={6} pb={8} pl={2} bg="muted">
        Custom padding: pt=4, pr=6, pb=8, pl=2
      </Box>
      <Box px={4} py={6} bg="muted">
        Horizontal and vertical: px=4, py=6
      </Box>
      <Box mt={4} mr={6} mb={8} ml={2} bg="muted">
        Custom margin: mt=4, mr=6, mb=8, ml=2
      </Box>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Directional padding and margin using spacing tokens",
      },
    },
  },
};

export const SemanticSpacing: Story = {
  render: () => (
    <div className="space-y-lg">
      <Box p="xs" bg="muted">
        Extra small padding (xs)
      </Box>
      <Box p="sm" bg="muted">
        Small padding (sm)
      </Box>
      <Box p="md" bg="muted">
        Medium padding (md)
      </Box>
      <Box p="lg" bg="muted">
        Large padding (lg)
      </Box>
      <Box p="xl" bg="muted">
        Extra large padding (xl)
      </Box>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Semantic spacing tokens (xs, sm, md, lg, xl)",
      },
    },
  },
};

export const AsDifferentElement: Story = {
  render: () => (
    <div className="space-y-lg">
      <Box as="section" p={4} bg="muted">
        Box as section element
      </Box>
      <Box as="article" p={4} bg="muted">
        Box as article element
      </Box>
      <Box as="aside" p={4} bg="muted">
        Box as aside element
      </Box>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Render Box as different HTML elements using 'as' prop",
      },
    },
  },
};

export const ResponsivePadding: Story = {
  args: {
    p: { base: 2, md: 4, lg: 6 },
    bg: "muted",
    children: "Responsive padding (base=2, md=4, lg=6)",
  },
  parameters: {
    docs: {
      description: {
        story: "Responsive padding using responsive value object (base value shown)",
      },
    },
  },
};

export const CombinedProps: Story = {
  args: {
    p: 6,
    m: 4,
    bg: "background",
    radius: "lg",
    children: "Box with all props combined",
  },
};
