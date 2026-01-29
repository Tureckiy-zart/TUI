import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "UI / Primitives / Text",
  component: Text,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Text component for general-purpose text. Supports 5 sizes (xs, sm, md, lg, xl), 4 weights, typographyRole + color props for semantic text styling, and polymorphic `as` prop for semantic HTML elements. Uses sans-serif font family.\n\n" +
          "**Note:** This is a low-level text component. For typography system overview, see `Compositions/Typography`. For semantic typography components (Heading, Body, Caption, etc.), see `Components/Typography/`.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Text size (canonical sizes only)",
      table: {
        type: { summary: "xs | sm | md | lg | xl" },
        defaultValue: { summary: "md" },
      },
    },
    weight: {
      control: { type: "select" },
      options: ["normal", "medium", "semibold", "bold"],
      description: "Font weight (canonical weights only)",
      table: {
        type: { summary: "normal | medium | semibold | bold" },
        defaultValue: { summary: "normal" },
      },
    },
    typographyRole: {
      control: { type: "select" },
      options: ["body", "meta", "label", "caption", "display", "h1", "h2", "h3", "h4", "h5", "h6"],
      description: "Typography role for semantic text styling",
      table: {
        type: { summary: "TypographyRole" },
      },
    },
    color: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "muted",
        "tertiary",
        "inverse",
        "disabled",
        "success",
        "warning",
        "error",
        "info",
      ],
      description: "Text color token (enforced by typographyRole)",
      table: {
        type: { summary: "TextToken" },
      },
    },
    as: {
      control: { type: "select" },
      options: ["span", "p", "label", "strong", "em"],
      description: "HTML element to render",
      table: {
        type: { summary: "span | p | label | strong | em" },
        defaultValue: { summary: "span" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    size: "md",
    children: "This is text with default styling.",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-md">
      <Text size="xs">Extra Small Text</Text>
      <Text size="sm">Small Text</Text>
      <Text size="md">Medium Text (Default)</Text>
      <Text size="lg">Large Text</Text>
      <Text size="xl">Extra Large Text</Text>
    </div>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <div className="space-y-md">
      <Text weight="normal">Normal Weight</Text>
      <Text weight="medium">Medium Weight</Text>
      <Text weight="semibold">Semibold Weight</Text>
      <Text weight="bold">Bold Weight</Text>
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-md">
      <Text typographyRole="body" color="primary">
        Primary Text
      </Text>
      <Text typographyRole="meta" color="muted">
        Muted Text
      </Text>
    </div>
  ),
};

export const Polymorphic: Story = {
  render: () => (
    <div className="space-y-md">
      <Text as="span">Span element (default)</Text>
      <Text as="p">Paragraph element</Text>
      <Text as="label">Label element</Text>
      <Text as="strong">Strong element</Text>
      <Text as="em">Emphasized element</Text>
    </div>
  ),
};

export const CombinedProps: Story = {
  render: () => (
    <div className="space-y-md">
      <Text size="lg" weight="bold">
        Large Bold Text
      </Text>
      <Text size="sm" weight="medium" typographyRole="meta" color="muted">
        Small Medium Muted Text
      </Text>
      <Text size="xl" weight="semibold">
        Extra Large Semibold Text
      </Text>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <Text size="lg" weight="semibold">
          Section Title
        </Text>
        <Text size="md" typographyRole="meta" color="muted">
          This is supporting text that provides additional context or description.
        </Text>
      </div>
      <div>
        <Text size="sm" weight="medium">
          Label Text
        </Text>
        <Text size="xs" typographyRole="meta" color="muted">
          Helper text or additional information.
        </Text>
      </div>
    </div>
  ),
};

export const Matrix: Story = {
  render: () => {
    const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
    const weights = ["normal", "medium", "semibold", "bold"] as const;

    return (
      <div className="space-y-lg">
        <div>
          <div className="mb-md">
            <Text size="lg" weight="bold">
              Size - Weight Matrix
            </Text>
          </div>
          <div className="space-y-md">
            {sizes.map((size) => (
              <div key={size} className="space-y-sm">
                <div>
                  <Text size="sm" weight="semibold">
                    Size: {size}
                  </Text>
                </div>
                <div className="flex flex-wrap gap-md">
                  {weights.map((weight) => (
                    <div key={weight} className="min-w-[200px]">
                      <Text size={size} weight={weight}>
                        {weight} text
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t pt-lg">
          <div className="mb-md">
            <Text size="lg" weight="bold">
              Color Variants
            </Text>
          </div>
          <div className="space-y-sm">
            {sizes.map((size) => (
              <div key={size} className="flex gap-lg">
                <Text size={size} typographyRole="body" color="primary">
                  Primary foreground
                </Text>
                <Text size={size} typographyRole="meta" color="muted">
                  Muted foreground
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-md">
      <div>
        <div className="mb-xs">
          <Text size="sm" weight="medium">
            Normal State
          </Text>
        </div>
        <Text>This is text in normal foreground color.</Text>
      </div>
      <div>
        <div className="mb-xs">
          <Text size="sm" weight="medium">
            Muted Tone
          </Text>
        </div>
        <Text typographyRole="meta" color="muted">
          This is text in muted/secondary foreground color.
        </Text>
      </div>
      <div>
        <div className="mb-xs">
          <Text size="sm" weight="medium">
            Combined with Weight
          </Text>
        </div>
        <div className="space-y-xs">
          <Text weight="normal" typographyRole="body" color="primary">
            Normal weight, primary color
          </Text>
          <Text weight="normal" typographyRole="meta" color="muted">
            Normal weight, muted color
          </Text>
          <Text weight="bold" typographyRole="body" color="primary">
            Bold weight, primary color
          </Text>
          <Text weight="bold" typographyRole="meta" color="muted">
            Bold weight, muted color
          </Text>
        </div>
      </div>
    </div>
  ),
};
