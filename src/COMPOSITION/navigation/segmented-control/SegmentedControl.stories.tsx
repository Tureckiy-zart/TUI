import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { SegmentedControl } from "./SegmentedControl";

const meta: Meta<typeof SegmentedControl.Root> = {
  title: "Components/Navigation/SegmentedControl",
  component: SegmentedControl.Root,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: "Token-driven segmented control component with radio group pattern.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the segmented control",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Size of the segmented control",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentedControl.Root>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("option1");
    return (
      <SegmentedControl.Root value={value} onValueChange={setValue}>
        <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
        <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
        <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
      </SegmentedControl.Root>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [value1, setValue1] = React.useState("option1");
    const [value2, setValue2] = React.useState("option1");
    const [value3, setValue3] = React.useState("option1");
    return (
      <div className="space-y-8">
        <div>
          <h3 className="mb-2 text-sm font-medium">Small</h3>
          <SegmentedControl.Root value={value1} onValueChange={setValue1} size="sm">
            <SegmentedControl.Item value="option1" size="sm">
              Option 1
            </SegmentedControl.Item>
            <SegmentedControl.Item value="option2" size="sm">
              Option 2
            </SegmentedControl.Item>
            <SegmentedControl.Item value="option3" size="sm">
              Option 3
            </SegmentedControl.Item>
          </SegmentedControl.Root>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Medium (Default)</h3>
          <SegmentedControl.Root value={value2} onValueChange={setValue2} size="md">
            <SegmentedControl.Item value="option1" size="md">
              Option 1
            </SegmentedControl.Item>
            <SegmentedControl.Item value="option2" size="md">
              Option 2
            </SegmentedControl.Item>
            <SegmentedControl.Item value="option3" size="md">
              Option 3
            </SegmentedControl.Item>
          </SegmentedControl.Root>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Large</h3>
          <SegmentedControl.Root value={value3} onValueChange={setValue3} size="lg">
            <SegmentedControl.Item value="option1" size="lg">
              Option 1
            </SegmentedControl.Item>
            <SegmentedControl.Item value="option2" size="lg">
              Option 2
            </SegmentedControl.Item>
            <SegmentedControl.Item value="option3" size="lg">
              Option 3
            </SegmentedControl.Item>
          </SegmentedControl.Root>
        </div>
      </div>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const [value, setValue] = React.useState("option1");
    return (
      <SegmentedControl.Root value={value} onValueChange={setValue} orientation="vertical">
        <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
        <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
        <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
      </SegmentedControl.Root>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = React.useState("option1");
    return (
      <SegmentedControl.Root value={value} onValueChange={setValue}>
        <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
        <SegmentedControl.Item value="option2" disabled>
          Option 2 (Disabled)
        </SegmentedControl.Item>
        <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
      </SegmentedControl.Root>
    );
  },
};

export const Uncontrolled: Story = {
  render: () => (
    <SegmentedControl.Root defaultValue="option1">
      <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
};
