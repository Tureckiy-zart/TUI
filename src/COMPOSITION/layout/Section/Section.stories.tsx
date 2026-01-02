import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "../Box";
import { Container } from "../Container";
import { Section } from "./Section";

const meta: Meta<typeof Section> = {
  title: "UI / Composition / Layout / Section",
  component: Section,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Section is a token-driven layout component for page/landing layout composition. It provides vertical padding for sections and spacing for content blocks. Uses Stack internally for layout composition.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    spaceY: {
      control: { type: "text" },
      description: "Vertical padding (token-based)",
      table: {
        type: { summary: "SpacingValue | ResponsiveValue<SpacingValue>" },
        defaultValue: { summary: "md" },
      },
    },
    spacing: {
      control: { type: "text" },
      description: "Spacing between content blocks (token-based)",
      table: {
        type: { summary: "SpacingValue | ResponsiveValue<SpacingValue>" },
      },
    },
    as: {
      control: { type: "text" },
      description: "Render as different HTML element",
      table: {
        type: { summary: "keyof React.JSX.IntrinsicElements" },
        defaultValue: { summary: "section" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Section>;

/**
 * Default Section usage with default props.
 */
export const Default: Story = {
  args: {
    spaceY: "md",
    children: (
      <>
        <Box px="md" py="md" bg="muted" radius="md">
          Content block 1
        </Box>
        <Box px="md" py="md" bg="muted" radius="md">
          Content block 2
        </Box>
        <Box px="md" py="md" bg="muted" radius="md">
          Content block 3
        </Box>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Default Section with medium vertical padding and no spacing between content blocks",
      },
    },
  },
};

/**
 * SpaceYVariants story
 * Demonstrates different vertical padding values using spacing tokens.
 */
export const SpaceYVariants: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">spaceY: sm</h3>
        <Section spaceY="sm">
          <Box px="md" py="md" bg="muted" radius="md">
            Section with small vertical padding
          </Box>
        </Section>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">spaceY: md (default)</h3>
        <Section spaceY="md">
          <Box px="md" py="md" bg="muted" radius="md">
            Section with medium vertical padding (default)
          </Box>
        </Section>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">spaceY: lg</h3>
        <Section spaceY="lg">
          <Box px="md" py="md" bg="muted" radius="md">
            Section with large vertical padding
          </Box>
        </Section>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">spaceY: xl</h3>
        <Section spaceY="xl">
          <Box px="md" py="md" bg="muted" radius="md">
            Section with extra large vertical padding
          </Box>
        </Section>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different vertical padding values using spacing tokens",
      },
    },
  },
};

/**
 * SpacingVariants story
 * Demonstrates different spacing values between content blocks.
 */
export const SpacingVariants: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing: sm</h3>
        <Section spaceY="md" spacing="sm">
          <Box px="md" py="md" bg="muted" radius="md">
            Content block 1
          </Box>
          <Box px="md" py="md" bg="muted" radius="md">
            Content block 2
          </Box>
          <Box px="md" py="md" bg="muted" radius="md">
            Content block 3
          </Box>
        </Section>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing: md</h3>
        <Section spaceY="md" spacing="md">
          <Box px="md" py="md" bg="muted" radius="md">
            Content block 1
          </Box>
          <Box px="md" py="md" bg="muted" radius="md">
            Content block 2
          </Box>
          <Box px="md" py="md" bg="muted" radius="md">
            Content block 3
          </Box>
        </Section>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Spacing: lg</h3>
        <Section spaceY="md" spacing="lg">
          <Box px="md" py="md" bg="muted" radius="md">
            Content block 1
          </Box>
          <Box px="md" py="md" bg="muted" radius="md">
            Content block 2
          </Box>
          <Box px="md" py="md" bg="muted" radius="md">
            Content block 3
          </Box>
        </Section>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Different spacing values between content blocks using spacing tokens",
      },
    },
  },
};

/**
 * WithContent story
 * Demonstrates realistic usage with Container and multiple content blocks.
 */
export const WithContent: Story = {
  render: () => (
    <Section spaceY="xl" spacing="lg">
      <Container maxWidth="lg">
        <Box px="lg" py="lg" bg="background" radius="lg" className="border">
          <h2 className="mb-md text-2xl font-bold">Section Title</h2>
          <p className="mb-md text-muted-foreground">
            This is a realistic example of Section usage with Container and content blocks.
          </p>
        </Box>
      </Container>
      <Container maxWidth="lg">
        <Box px="lg" py="lg" bg="background" radius="lg" className="border">
          <h3 className="mb-md text-xl font-semibold">Subsection</h3>
          <p className="text-muted-foreground">
            Another content block with proper spacing from the previous block.
          </p>
        </Box>
      </Container>
    </Section>
  ),
  parameters: {
    docs: {
      description: {
        story: "Realistic usage example with Container and multiple content blocks",
      },
    },
  },
};

/**
 * SemanticElements story
 * Demonstrates using different semantic HTML elements via `as` prop.
 */
export const SemanticElements: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">as="section" (default)</h3>
        <Section as="section" spaceY="md">
          <Box px="md" py="md" bg="muted" radius="md">
            Rendered as &lt;section&gt; element
          </Box>
        </Section>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">as="article"</h3>
        <Section as="article" spaceY="md">
          <Box px="md" py="md" bg="muted" radius="md">
            Rendered as &lt;article&gt; element
          </Box>
        </Section>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">as="div"</h3>
        <Section as="div" spaceY="md">
          <Box px="md" py="md" bg="muted" radius="md">
            Rendered as &lt;div&gt; element
          </Box>
        </Section>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Using different semantic HTML elements via `as` prop",
      },
    },
  },
};
