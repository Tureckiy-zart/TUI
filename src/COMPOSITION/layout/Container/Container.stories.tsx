import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../Box";
import { Stack } from "../Stack";
import { Container } from "./Container";

const meta: Meta<typeof Container> = {
  title: "Composition / Layout / Container",
  component: Container,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Container is a specialized layout primitive with a single, focused responsibility: width constraint and horizontal padding. It does NOT provide layout composition behaviors (flex, grid, alignment). For layout composition, use Stack, Flex, or Grid components.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    maxWidth: {
      control: { type: "text" },
      description: "Maximum width of the container (token-based)",
      table: {
        type: { summary: "ContainerMaxWidthToken | SpacingToken | ResponsiveValue" },
      },
    },
    padding: {
      control: { type: "text" },
      description: "Horizontal padding (token-based)",
      table: {
        type: { summary: "SpacingValue | ResponsiveValue<SpacingValue>" },
      },
    },
    center: {
      control: { type: "boolean" },
      description: "Center the container horizontally with auto margins",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {
  args: {
    maxWidth: "lg",
    padding: "md",
    children: (
      <Box px="md" py="md" bg="muted" radius="md">
        Container content with maxWidth="lg" and padding="md"
      </Box>
    ),
  },
};

export const MaxWidthVariants: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">MaxWidth: sm</h3>
        <Container maxWidth="sm" padding="md">
          <Box px="md" py="md" bg="muted" radius="md">
            Small container (sm)
          </Box>
        </Container>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">MaxWidth: md</h3>
        <Container maxWidth="md" padding="md">
          <Box px="md" py="md" bg="muted" radius="md">
            Medium container (md)
          </Box>
        </Container>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">MaxWidth: lg</h3>
        <Container maxWidth="lg" padding="md">
          <Box px="md" py="md" bg="muted" radius="md">
            Large container (lg)
          </Box>
        </Container>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">MaxWidth: xl</h3>
        <Container maxWidth="xl" padding="md">
          <Box px="md" py="md" bg="muted" radius="md">
            Extra large container (xl)
          </Box>
        </Container>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">MaxWidth: full</h3>
        <Container maxWidth="full" padding="md">
          <Box px="md" py="md" bg="muted" radius="md">
            Full width container
          </Box>
        </Container>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different maxWidth values using container size tokens",
      },
    },
  },
};

export const PaddingVariants: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: sm</h3>
        <Container maxWidth="lg" padding="sm">
          <Box px="md" py="md" bg="muted" radius="md">
            Container with small padding
          </Box>
        </Container>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: md</h3>
        <Container maxWidth="lg" padding="md">
          <Box px="md" py="md" bg="muted" radius="md">
            Container with medium padding (default)
          </Box>
        </Container>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: lg</h3>
        <Container maxWidth="lg" padding="lg">
          <Box px="md" py="md" bg="muted" radius="md">
            Container with large padding
          </Box>
        </Container>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different horizontal padding values using spacing tokens",
      },
    },
  },
};

export const Centering: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Centered (default)</h3>
        <Container maxWidth="lg" padding="md" center={true}>
          <Box px="md" py="md" bg="muted" radius="md">
            Centered container
          </Box>
        </Container>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Not Centered</h3>
        <Container maxWidth="lg" padding="md" center={false}>
          <Box px="md" py="md" bg="muted" radius="md">
            Left-aligned container
          </Box>
        </Container>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Container centering behavior with center prop",
      },
    },
  },
};

export const WithLayoutComposition: Story = {
  render: () => (
    <Container maxWidth="lg" padding="md">
      <Stack direction="vertical" spacing="lg">
        <Box px="md" py="md" bg="muted" radius="md">
          Item 1
        </Box>
        <Box px="md" py="md" bg="muted" radius="md">
          Item 2
        </Box>
        <Box px="md" py="md" bg="muted" radius="md">
          Item 3
        </Box>
      </Stack>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Container with Stack for layout composition. Container handles width constraint, Stack handles layout.",
      },
    },
  },
};

export const ScopeLimitation: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Correct Example (Container + Stack)</h3>
        <Container maxWidth="lg" padding="md">
          <Stack direction="vertical" spacing="md">
            <Box px="sm" py="sm" bg="muted" radius="sm">
              Item 1
            </Box>
            <Box px="sm" py="sm" bg="muted" radius="sm">
              Item 2
            </Box>
          </Stack>
        </Container>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">
          Incorrect Example (for illustration only - not a bug)
        </h3>
        <p className="mb-sm text-sm text-[hsl(var(--tm-text-muted))]">
          Container does NOT have display, flexDirection, gap, align, justify props. Use Stack,
          Flex, or Grid for layout composition.
        </p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Container scope is limited to width constraint and padding. Use Stack, Flex, or Grid for layout composition.",
      },
    },
  },
};
