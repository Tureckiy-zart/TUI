import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "./Box";

const meta: Meta<typeof Box> = {
  title: "Foundation Locked/Composition/Layout/Box",
  component: Box,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Box is the lowest-level layout primitive - a pure, generic container component. It provides token-based styling for spacing (padding/margin), visual properties (radius, shadow, background), and element rendering (via `as` prop). Box does NOT provide layout composition semantics (display, flexDirection, gap, alignment). For layout composition, use Stack, Flex, or Grid components.",
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
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Background: background</h3>
        <Box bg="background" p={4} radius="md">
          Box with background color
        </Box>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Background: card</h3>
        <Box bg="card" p={4} radius="md">
          Box with card background
        </Box>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Background: muted</h3>
        <Box bg="muted" p={4} radius="md">
          Box with muted background
        </Box>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Background: primary</h3>
        <Box bg="primary" p={4} radius="md" className="text-primary-foreground">
          Box with primary background
        </Box>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Background: secondary</h3>
        <Box bg="secondary" p={4} radius="md" className="text-secondary-foreground">
          Box with secondary background
        </Box>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Background: accent</h3>
        <Box bg="accent" p={4} radius="md" className="text-accent-foreground">
          Box with accent background
        </Box>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Background: destructive</h3>
        <Box bg="destructive" p={4} radius="md" className="text-destructive-foreground">
          Box with destructive background
        </Box>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different background color values using token system",
      },
    },
  },
};

export const WithRadius: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Radius: none</h3>
        <Box radius="none" bg="muted" p={4}>
          No radius
        </Box>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Radius: sm</h3>
        <Box radius="sm" bg="muted" p={4}>
          Small radius
        </Box>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Radius: md</h3>
        <Box radius="md" bg="muted" p={4}>
          Medium radius (default)
        </Box>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Radius: lg</h3>
        <Box radius="lg" bg="muted" p={4}>
          Large radius
        </Box>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Radius: full</h3>
        <Box radius="full" bg="muted" p={4}>
          Full radius (pill)
        </Box>
      </div>
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
      <div>
        <h3 className="mb-sm text-lg font-semibold">Custom padding: pt=4, pr=6, pb=8, pl=2</h3>
        <Box pt={4} pr={6} pb={8} pl={2} bg="muted">
          Custom padding on all sides
        </Box>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Horizontal and vertical: px=4, py=6</h3>
        <Box px={4} py={6} bg="muted">
          Horizontal and vertical padding
        </Box>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Custom margin: mt=4, mr=6, mb=8, ml=2</h3>
        <Box mt={4} mr={6} mb={8} ml={2} bg="muted">
          Custom margin on all sides
        </Box>
      </div>
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
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: xs</h3>
        <Box p="xs" bg="muted">
          Extra small padding
        </Box>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: sm</h3>
        <Box p="sm" bg="muted">
          Small padding
        </Box>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: md</h3>
        <Box p="md" bg="muted">
          Medium padding
        </Box>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: lg</h3>
        <Box p="lg" bg="muted">
          Large padding
        </Box>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: xl</h3>
        <Box p="xl" bg="muted">
          Extra large padding
        </Box>
      </div>
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
