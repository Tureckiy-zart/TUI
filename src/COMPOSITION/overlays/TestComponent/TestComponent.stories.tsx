import type { Meta, StoryObj } from "@storybook/react";
import { TestComponent } from "./TestComponent";

const meta: Meta<typeof TestComponent> = {
  title: "composite/TestComponent",
  component: TestComponent,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "{{description}}",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    // TODO: Add argTypes for all props
    // Follow existing patterns from Stack.stories.tsx
  },
};

export default meta;
type Story = StoryObj<typeof TestComponent>;

export const Default: Story = {
  args: {
    children: "TestComponent content",
  },
};

// TODO: Add more stories demonstrating:
// - Different variants
// - Token usage examples
// - Responsive behavior
// - Use cases
// - Accessibility features

export const Example: Story = {
  args: {
    // TODO: Add example props
  },
  parameters: {
    docs: {
      description: {
        story: "Example usage of TestComponent",
      },
    },
  },
};
