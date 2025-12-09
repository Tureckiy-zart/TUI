import { Body } from "@/components/ui/body";
import { Caption } from "@/components/ui/caption";
import { Code } from "@/components/ui/code";
import { Display } from "@/components/ui/display";
import { Heading } from "@/components/ui/heading";
import { Lead } from "@/components/ui/lead";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Heading> = {
  title: "Components/Typography",
  component: Heading,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Complete typography system for Tenerife UI. Includes Heading, Display, Body, Lead, Caption, and Code components. All components use token-based styling and support dark/light mode.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TypographySystem: Story = {
  render: () => (
    <div className="space-y-xl">
      <section className="space-y-md">
        <h2 className="text-2xl font-semibold">Display</h2>
        <Display size="4xl" weight="bold">
          Display Text for Hero Sections
        </Display>
        <Display size="3xl" weight="semibold" muted>
          Muted Display Text
        </Display>
      </section>

      <section className="space-y-md">
        <h2 className="text-2xl font-semibold">Headings</h2>
        <Heading level={1}>Heading Level 1</Heading>
        <Heading level={2}>Heading Level 2</Heading>
        <Heading level={3}>Heading Level 3</Heading>
        <Heading level={4}>Heading Level 4</Heading>
        <Heading level={5}>Heading Level 5</Heading>
        <Heading level={6}>Heading Level 6</Heading>
      </section>

      <section className="space-y-md">
        <h2 className="text-2xl font-semibold">Lead Text</h2>
        <Lead size="xl">Extra large lead text for subtitles and introductions.</Lead>
        <Lead size="lg">Large lead text with default muted styling.</Lead>
      </section>

      <section className="space-y-md">
        <h2 className="text-2xl font-semibold">Body Text</h2>
        <Body size="lg">
          Large body text. This size is useful for emphasis or when you need slightly larger body
          text. It maintains relaxed line height for comfortable reading.
        </Body>
        <Body size="md">
          Medium body text. This is the default size for body content. It provides good readability
          with relaxed line height and proper spacing.
        </Body>
        <Body size="md" muted>
          Muted body text for secondary information.
        </Body>
      </section>

      <section className="space-y-md">
        <h2 className="text-2xl font-semibold">Caption</h2>
        <Caption>Default caption text with muted styling.</Caption>
        <Caption muted={false}>Non-muted caption text.</Caption>
        <Caption weight="medium">Medium weight caption.</Caption>
      </section>

      <section className="space-y-md">
        <h2 className="text-2xl font-semibold">Code</h2>
        <p>
          Here's some text with <Code>inline code</Code> embedded within it.
        </p>
        <Code variant="block">
          {`function example() {
  return 'This is a code block';
}`}
        </Code>
      </section>
    </div>
  ),
};

export const HeadingWeights: Story = {
  render: () => (
    <div className="space-y-md">
      <Heading level={2} weight="normal">
        Normal Weight Heading
      </Heading>
      <Heading level={2} weight="medium">
        Medium Weight Heading
      </Heading>
      <Heading level={2} weight="semibold">
        Semibold Weight Heading
      </Heading>
      <Heading level={2} weight="bold">
        Bold Weight Heading
      </Heading>
    </div>
  ),
};

export const BodyWeights: Story = {
  render: () => (
    <div className="space-y-md">
      <Body weight="normal">Normal weight body text.</Body>
      <Body weight="medium">Medium weight body text.</Body>
      <Body weight="semibold">Semibold weight body text.</Body>
      <Body weight="bold">Bold weight body text.</Body>
    </div>
  ),
};

export const MutedExamples: Story = {
  render: () => (
    <div className="space-y-md">
      <Heading level={2}>Normal Heading</Heading>
      <Heading level={2} muted>
        Muted Heading
      </Heading>
      <Body>Normal body text.</Body>
      <Body muted>Muted body text.</Body>
      <Lead muted={false}>Non-muted lead text.</Lead>
      <Lead>Muted lead text (default).</Lead>
    </div>
  ),
};

export const ParagraphExample: Story = {
  render: () => (
    <div className="space-y-md">
      <Body>
        This is a paragraph with normal body text. It demonstrates how the Body component renders
        text with proper spacing and line height for readability.
      </Body>
      <Body>
        This is another paragraph to show the spacing between paragraphs. The Body component uses
        relaxed line height for comfortable reading.
      </Body>
    </div>
  ),
};

export const CodeExamples: Story = {
  render: () => (
    <div className="space-y-md">
      <p>
        Here's some text with <Code>inline code</Code> within a paragraph.
      </p>
      <Code variant="block">
        {`console.log('Hello, World!');
const example = 'This is a code block';`}
      </Code>
    </div>
  ),
};
