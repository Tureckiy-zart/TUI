import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { SegmentedControl } from "./SegmentedControl";

const meta: Meta<typeof SegmentedControl.Root> = {
  title: "Composition / Navigation / SegmentedControl",
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

/**
 * States Story (CANONICAL - REQUIRED)
 * Demonstrates all sizes - all states (default, selected, disabled)
 * REQUIRED per VARIANTS_SIZE_CANON.md for interactive components
 */
export const States: Story = {
  render: () => {
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];
    const [selectedValues, setSelectedValues] = React.useState<Record<string, string>>({
      sm: "option1",
      md: "option2",
      lg: "option1",
    });

    return (
      <div className="space-y-8">
        {sizes.map((size) => (
          <div key={size} className="space-y-4">
            <h3 className="text-lg font-semibold capitalize">{size}</h3>
            <div className="space-y-4">
              {/* Default state (not selected) */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Default (not selected)</div>
                <SegmentedControl.Root
                  value={selectedValues[size]}
                  onValueChange={(value) =>
                    setSelectedValues((prev) => ({ ...prev, [size]: value }))
                  }
                  size={size}
                >
                  <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
                  <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
                  <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
                </SegmentedControl.Root>
              </div>

              {/* Selected state */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Selected</div>
                <SegmentedControl.Root
                  value={selectedValues[size]}
                  onValueChange={(value) =>
                    setSelectedValues((prev) => ({ ...prev, [size]: value }))
                  }
                  size={size}
                >
                  <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
                  <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
                  <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
                </SegmentedControl.Root>
              </div>

              {/* Disabled state */}
              <div className="space-y-2">
                <div className="text-sm font-medium">Disabled</div>
                <SegmentedControl.Root value="option1" size={size}>
                  <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
                  <SegmentedControl.Item value="option2" disabled>
                    Option 2 (Disabled)
                  </SegmentedControl.Item>
                  <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
                </SegmentedControl.Root>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Canonical States story showing all sizes - all states (default, selected, disabled). This story is REQUIRED per VARIANTS_SIZE_CANON.md for interactive components.",
      },
    },
  },
};

/**
 * SizesGallery Story (CANONICAL - REQUIRED)
 * Demonstrates all sizes with text content
 * REQUIRED per SIZE_MAPPING_SPEC.md for components with size prop
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];
    const [values, setValues] = React.useState<Record<string, string>>({
      sm: "option1",
      md: "option2",
      lg: "option1",
    });

    return (
      <div className="space-y-8">
        {sizes.map((size) => (
          <div key={size} className="space-y-2">
            <h3 className="text-lg font-semibold capitalize">{size}</h3>
            <SegmentedControl.Root
              value={values[size]}
              onValueChange={(value) => setValues((prev) => ({ ...prev, [size]: value }))}
              size={size}
            >
              <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
              <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
              <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
            </SegmentedControl.Root>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Canonical SizesGallery story showing all sizes (sm, md, lg) with text content. This story is REQUIRED per SIZE_MAPPING_SPEC.md for sized components.",
      },
    },
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
