import type { Meta, StoryObj } from "@storybook/react-vite";
import { Heading } from "./Heading";

const meta: Meta<typeof Heading> = {
  title: "Primitives / Heading",
  component: Heading,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Heading component for semantic headings (h1-h6). Supports 6 levels, 4 weight variants, and color roles. Uses display font family for levels 1-2.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    level: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6],
      description: "Heading level (1-6)",
      table: {
        type: { summary: "1 | 2 | 3 | 4 | 5 | 6" },
        defaultValue: { summary: "1" },
      },
    },
    weight: {
      control: { type: "select" },
      options: ["normal", "medium", "semibold", "bold"],
      description: "Font weight (canonical weights only)",
      table: {
        type: { summary: "normal | medium | semibold | bold" },
      },
    },
    color: {
      control: { type: "select" },
      options: ["primary", "secondary"],
      description: "Text color role",
      table: {
        type: { summary: "primary | secondary" },
        defaultValue: { summary: "primary" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    level: 1,
    children: "Heading 1",
  },
};

export const AllLevels: Story = {
  render: () => (
    <div className="space-y-md">
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
      <Heading level={5}>Heading Level 5</Heading>
      <Heading level={6}>Heading Level 6</Heading>
    </div>
  ),
};

export const AllWeights: Story = {
  render: () => (
    <div className="space-y-md">
      <Heading level={2} weight="normal">
        Normal Weight
      </Heading>
      <Heading level={2} weight="medium">
        Medium Weight
      </Heading>
      <Heading level={2} weight="semibold">
        Semibold Weight
      </Heading>
      <Heading level={2} weight="bold">
        Bold Weight
      </Heading>
    </div>
  ),
};

export const Secondary: Story = {
  render: () => (
    <div className="space-y-md">
      <Heading level={2}>Normal Heading</Heading>
      <Heading level={2} color="secondary">
        Secondary Heading
      </Heading>
    </div>
  ),
};

export const CustomElement: Story = {
  render: () => (
    <div className="space-y-md">
      <Heading level={1} as="h2">
        Level 1 styled, but rendered as h2
      </Heading>
      <Heading level={3} as="h1">
        Level 3 styled, but rendered as h1
      </Heading>
    </div>
  ),
};

/**
 * Matrix story (REQUIRED by VARIANTS_SIZE_CANON)
 * Demonstrates all combinations of levels (1-6) and weights (normal, medium, semibold, bold)
 * Total: 24 combinations (6 levels - 4 weights)
 */
export const Matrix: Story = {
  render: () => {
    const levels: Array<1 | 2 | 3 | 4 | 5 | 6> = [1, 2, 3, 4, 5, 6];
    const weights: Array<"normal" | "medium" | "semibold" | "bold"> = [
      "normal",
      "medium",
      "semibold",
      "bold",
    ];

    return (
      <div className="space-y-lg">
        {/* Header row */}
        <div className="grid grid-cols-5 items-center gap-md">
          <div className="text-sm font-semibold text-[hsl(var(--tm-text-primary))]">
            Level / Weight
          </div>
          {weights.map((weight) => (
            <div
              key={weight}
              className="text-sm font-semibold capitalize text-[hsl(var(--tm-text-primary))]"
            >
              {weight}
            </div>
          ))}
        </div>

        {/* Level rows */}
        {levels.map((level) => (
          <div key={level} className="grid grid-cols-5 items-baseline gap-md">
            <div className="text-sm font-semibold text-[hsl(var(--tm-text-primary))]">h{level}</div>
            {weights.map((weight) => (
              <Heading key={`${level}-${weight}`} level={level} weight={weight}>
                Heading
              </Heading>
            ))}
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Typography Hierarchy
 * Demonstrates proper heading hierarchy for page structure
 */
export const TypographyHierarchy: Story = {
  render: () => (
    <article className="max-w-2xl space-y-md">
      <Heading level={1}>Article Title (h1)</Heading>
      <p className="text-sm text-[hsl(var(--tm-text-primary))]/80">
        Introduction paragraph explaining the main topic of the article.
      </p>

      <Heading level={2}>Main Section (h2)</Heading>
      <p className="text-sm text-[hsl(var(--tm-text-primary))]/80">
        Content for the main section with detailed explanation.
      </p>

      <Heading level={3}>Subsection (h3)</Heading>
      <p className="text-sm text-[hsl(var(--tm-text-primary))]/80">
        Subsection content with more specific details.
      </p>

      <Heading level={4}>Minor Point (h4)</Heading>
      <p className="text-sm text-[hsl(var(--tm-text-primary))]/80">
        A minor point under the subsection.
      </p>

      <Heading level={5}>Detail (h5)</Heading>
      <p className="text-sm text-[hsl(var(--tm-text-primary))]/80">Detailed information.</p>

      <Heading level={6}>Fine Print (h6)</Heading>
      <p className="text-sm text-[hsl(var(--tm-text-primary))]/80">
        Additional fine print details.
      </p>
    </article>
  ),
};
