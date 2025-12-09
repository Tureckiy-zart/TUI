import { Code } from "@/components/ui/code";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Code> = {
  title: "Components/Typography/Code",
  component: Code,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Code component for displaying code snippets. Supports inline and block variants, uses monospace font family, and includes background styling. Supports muted state.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["inline", "block"],
      description: "Code display variant (canonical variants only)",
      table: {
        type: { summary: "inline | block" },
        defaultValue: { summary: "inline" },
      },
    },
    muted: {
      control: { type: "boolean" },
      description: "Muted text color",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Code>;

export const Default: Story = {
  args: {
    variant: "inline",
    children: "const code = 'example';",
  },
};

export const Inline: Story = {
  render: () => (
    <div className="space-y-md">
      <p>
        Here's some text with <Code>inline code</Code> embedded within it.
      </p>
      <p>
        You can use <Code>console.log()</Code> to debug your code.
      </p>
      <p>
        The <Code variant="inline">Code</Code> component uses monospace font and has a subtle
        background.
      </p>
    </div>
  ),
};

export const Block: Story = {
  render: () => (
    <div className="space-y-md">
      <Code variant="block">
        {`function example() {
  return 'This is a code block';
}`}
      </Code>
      <Code variant="block">
        {`const data = {
  name: 'Tenerife UI',
  version: '1.0.0'
};`}
      </Code>
    </div>
  ),
};

export const Muted: Story = {
  render: () => (
    <div className="space-y-md">
      <p>
        Normal <Code>inline code</Code>
      </p>
      <p>
        Muted <Code muted>inline code</Code>
      </p>
      <Code variant="block" muted>
        This is a muted code block
      </Code>
    </div>
  ),
};

export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-md text-lg font-semibold">JavaScript Example</h3>
        <Code variant="block">
          {`function greet(name) {
  return 'Hello, ' + name + '!';
}

console.log(greet('World'));`}
        </Code>
      </div>
      <div>
        <h3 className="mb-md text-lg font-semibold">React Component</h3>
        <Code variant="block">
          {`import { Button } from '@tenerife.music/ui';

function App() {
  return <Button>Click me</Button>;
}`}
        </Code>
      </div>
      <div>
        <p>
          You can also use <Code>inline code</Code> within paragraphs for references to variables,
          functions, or other code elements.
        </p>
      </div>
    </div>
  ),
};
