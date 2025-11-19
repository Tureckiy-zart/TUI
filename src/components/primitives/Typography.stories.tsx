import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Heading, Text, Code, Blockquote } from './Typography';

const meta: Meta<typeof Heading> = {
  title: 'Components/Typography',
  component: Heading,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Headings: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
    </div>
  ),
};

export const TextVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Text size="xs">Extra Small Text</Text>
      <Text size="sm">Small Text</Text>
      <Text size="base">Base Text</Text>
      <Text size="lg">Large Text</Text>
      <Text size="xl">Extra Large Text</Text>
    </div>
  ),
};

export const TextWeights: Story = {
  render: () => (
    <div className="space-y-2">
      <Text weight="normal">Normal Weight</Text>
      <Text weight="medium">Medium Weight</Text>
      <Text weight="semibold">Semibold Weight</Text>
      <Text weight="bold">Bold Weight</Text>
    </div>
  ),
};

export const TextColors: Story = {
  render: () => (
    <div className="space-y-2">
      <Text color="default">Default Color</Text>
      <Text color="muted">Muted Color</Text>
      <Text color="primary">Primary Color</Text>
      <Text color="destructive">Destructive Color</Text>
    </div>
  ),
};

export const ParagraphExample: Story = {
  render: () => {
    const Paragraph = Text; // Use Text component as paragraph
    return (
      <div className="space-y-4">
        <Paragraph>
          This is a paragraph with normal text. It demonstrates how the Paragraph component
          renders text with proper spacing and line height for readability.
        </Paragraph>
        <Paragraph>
          This is another paragraph to show the spacing between paragraphs.
        </Paragraph>
      </div>
    );
  },
};

export const CodeExample: Story = {
  render: () => (
    <div className="space-y-4">
      <Text>
        Here's some inline <Code>code</Code> within a paragraph.
      </Text>
      <Code>console.log('Hello, World!');</Code>
    </div>
  ),
};

export const BlockquoteExample: Story = {
  render: () => (
    <Blockquote>
      "The best way to predict the future is to create it."
    </Blockquote>
  ),
};
