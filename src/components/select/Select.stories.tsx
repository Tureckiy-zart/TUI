"use client";

import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Select } from "./Select";

const meta: Meta<typeof Select.Root> = {
  title: "UI/Foundation/Select",
  component: Select.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Select component built on Radix UI for dropdown selection. Supports variants (primary, secondary, outline, ghost, destructive), sizes (xs, sm, md, lg, xl), keyboard navigation, and full ARIA support. All visual props use token unions for type safety.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: { type: "boolean" },
      description: "Disable select interaction",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select.Root>;

/**
 * Default Select usage with default tokens (md size, outline variant, full width)
 */
export const Default: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select an option" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <Select.Item value="option1">Option 1</Select.Item>
          <Select.Item value="option2">Option 2</Select.Item>
          <Select.Item value="option3">Option 3</Select.Item>
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic Select usage with default tokens (md size, outline variant, full width).",
      },
    },
  },
};

/**
 * All available size variants (xs, sm, md, lg, xl)
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Select.Root>
        <Select.Trigger size="xs">
          <Select.Value placeholder="Extra small (xs)" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content size="xs">
          <Select.Viewport>
            <Select.Item value="1" size="xs">
              Option 1
            </Select.Item>
            <Select.Item value="2" size="xs">
              Option 2
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      <Select.Root>
        <Select.Trigger size="sm">
          <Select.Value placeholder="Small (sm)" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content size="sm">
          <Select.Viewport>
            <Select.Item value="1" size="sm">
              Option 1
            </Select.Item>
            <Select.Item value="2" size="sm">
              Option 2
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      <Select.Root>
        <Select.Trigger size="md">
          <Select.Value placeholder="Medium (md)" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content size="md">
          <Select.Viewport>
            <Select.Item value="1" size="md">
              Option 1
            </Select.Item>
            <Select.Item value="2" size="md">
              Option 2
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      <Select.Root>
        <Select.Trigger size="lg">
          <Select.Value placeholder="Large (lg)" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content size="lg">
          <Select.Viewport>
            <Select.Item value="1" size="lg">
              Option 1
            </Select.Item>
            <Select.Item value="2" size="lg">
              Option 2
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      <Select.Root>
        <Select.Trigger size="xl">
          <Select.Value placeholder="Extra large (xl)" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content size="xl">
          <Select.Viewport>
            <Select.Item value="1" size="xl">
              Option 1
            </Select.Item>
            <Select.Item value="2" size="xl">
              Option 2
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstrates all available SelectSizeToken variants (xs, sm, md, lg, xl).",
      },
    },
  },
};

/**
 * All available variant styles (primary, secondary, outline, ghost, destructive)
 */
export const Variants: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Select.Root>
        <Select.Trigger variant="primary">
          <Select.Value placeholder="Primary variant" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="1">Option 1</Select.Item>
            <Select.Item value="2">Option 2</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      <Select.Root>
        <Select.Trigger variant="secondary">
          <Select.Value placeholder="Secondary variant" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="1">Option 1</Select.Item>
            <Select.Item value="2">Option 2</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      <Select.Root>
        <Select.Trigger variant="outline">
          <Select.Value placeholder="Outline variant" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="1">Option 1</Select.Item>
            <Select.Item value="2">Option 2</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      <Select.Root>
        <Select.Trigger variant="ghost">
          <Select.Value placeholder="Ghost variant" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="1">Option 1</Select.Item>
            <Select.Item value="2">Option 2</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      <Select.Root>
        <Select.Trigger variant="destructive">
          <Select.Value placeholder="Destructive variant" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="1">Option 1</Select.Item>
            <Select.Item value="2">Option 2</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates all available SelectVariantToken options (primary, secondary, outline, ghost, destructive).",
      },
    },
  },
};

/**
 * Disabled state handling
 */
export const Disabled: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-md">
      <Select.Root disabled defaultValue="option1">
        <Select.Trigger>
          <Select.Value placeholder="Disabled select" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2">Option 2</Select.Item>
            <Select.Item value="option3">Option 3</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      <Select.Root defaultValue="option1">
        <Select.Trigger>
          <Select.Value placeholder="Select with disabled option" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2" disabled>
              Disabled Option
            </Select.Item>
            <Select.Item value="option3">Option 3</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates disabled state - both entire select and individual options can be disabled.",
      },
    },
  },
};

/**
 * Select with Label for accessibility
 */
export const WithLabel: Story = {
  render: () => (
    <div className="flex w-64 flex-col gap-sm">
      <label htmlFor="select-with-label" className="text-sm font-medium">
        Choose a country
      </label>
      <Select.Root>
        <Select.Trigger id="select-with-label">
          <Select.Value placeholder="Select a country" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Group>
              <Select.Label>North America</Select.Label>
              <Select.Item value="us">United States</Select.Item>
              <Select.Item value="ca">Canada</Select.Item>
              <Select.Item value="mx">Mexico</Select.Item>
            </Select.Group>
            <Select.Separator />
            <Select.Group>
              <Select.Label>Europe</Select.Label>
              <Select.Item value="uk">United Kingdom</Select.Item>
              <Select.Item value="de">Germany</Select.Item>
              <Select.Item value="fr">France</Select.Item>
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Select with Label component for accessibility. Uses Select.Label for grouping items and external label for form association.",
      },
    },
  },
};

/**
 * Scrolling behavior with many items
 */
export const LongList: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Choose a country" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <Select.Item value="us">United States</Select.Item>
          <Select.Item value="uk">United Kingdom</Select.Item>
          <Select.Item value="ca">Canada</Select.Item>
          <Select.Item value="au">Australia</Select.Item>
          <Select.Item value="de">Germany</Select.Item>
          <Select.Item value="fr">France</Select.Item>
          <Select.Item value="es">Spain</Select.Item>
          <Select.Item value="it">Italy</Select.Item>
          <Select.Item value="nl">Netherlands</Select.Item>
          <Select.Item value="be">Belgium</Select.Item>
          <Select.Item value="ch">Switzerland</Select.Item>
          <Select.Item value="at">Austria</Select.Item>
          <Select.Item value="se">Sweden</Select.Item>
          <Select.Item value="no">Norway</Select.Item>
          <Select.Item value="dk">Denmark</Select.Item>
          <Select.Item value="fi">Finland</Select.Item>
          <Select.Item value="pl">Poland</Select.Item>
          <Select.Item value="cz">Czech Republic</Select.Item>
          <Select.Item value="pt">Portugal</Select.Item>
          <Select.Item value="gr">Greece</Select.Item>
          <Select.Item value="ie">Ireland</Select.Item>
          <Select.Item value="lu">Luxembourg</Select.Item>
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates scrolling behavior with many items. The dropdown automatically becomes scrollable when content exceeds max height.",
      },
    },
  },
};

/**
 * Controlled value usage
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | undefined>("option2");

    return (
      <div className="flex w-64 flex-col gap-md">
        <Select.Root value={value} onValueChange={setValue}>
          <Select.Trigger>
            <Select.Value placeholder="Controlled select" />
            <Select.Icon />
          </Select.Trigger>
          <Select.Content>
            <Select.Viewport>
              <Select.Item value="option1">Option 1</Select.Item>
              <Select.Item value="option2">Option 2</Select.Item>
              <Select.Item value="option3">Option 3</Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select.Root>
        <p className="text-sm text-muted-foreground">Selected: {value ?? "none"}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Controlled Select usage with React state. Use value and onValueChange props for controlled behavior.",
      },
    },
  },
};

/**
 * Additional examples demonstrating advanced usage
 */

export const WithGroups: Story = {
  render: () => (
    <Select.Root>
      <Select.Trigger>
        <Select.Value placeholder="Select a framework" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <Select.Group>
            <Select.Label>Frontend</Select.Label>
            <Select.Item value="react">React</Select.Item>
            <Select.Item value="vue">Vue</Select.Item>
            <Select.Item value="angular">Angular</Select.Item>
          </Select.Group>
          <Select.Separator />
          <Select.Group>
            <Select.Label>Backend</Select.Label>
            <Select.Item value="node">Node.js</Select.Item>
            <Select.Item value="python">Python</Select.Item>
            <Select.Item value="go">Go</Select.Item>
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "Select with grouped items using Select.Group and Select.Label for organization.",
      },
    },
  },
};

export const WithDefaultValue: Story = {
  render: () => (
    <Select.Root defaultValue="option2">
      <Select.Trigger>
        <Select.Value placeholder="Select an option" />
        <Select.Icon />
      </Select.Trigger>
      <Select.Content>
        <Select.Viewport>
          <Select.Item value="option1">Option 1</Select.Item>
          <Select.Item value="option2">Option 2</Select.Item>
          <Select.Item value="option3">Option 3</Select.Item>
        </Select.Viewport>
      </Select.Content>
    </Select.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "Select with default value using defaultValue prop (uncontrolled).",
      },
    },
  },
};

export const WidthVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Select.Root>
        <Select.Trigger width="auto">
          <Select.Value placeholder="Auto width" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="1">Option 1</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      <Select.Root>
        <Select.Trigger width="sm">
          <Select.Value placeholder="Small width (192px)" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="1">Option 1</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      <Select.Root>
        <Select.Trigger width="md">
          <Select.Value placeholder="Medium width (256px)" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="1">Option 1</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      <Select.Root>
        <Select.Trigger width="lg">
          <Select.Value placeholder="Large width (320px)" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="1">Option 1</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      <Select.Root>
        <Select.Trigger width="xl">
          <Select.Value placeholder="Extra large width (384px)" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="1">Option 1</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>

      <Select.Root>
        <Select.Trigger width="full">
          <Select.Value placeholder="Full width (100%)" />
          <Select.Icon />
        </Select.Trigger>
        <Select.Content>
          <Select.Viewport>
            <Select.Item value="1">Option 1</Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Root>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstrates all available SelectWidthToken options (auto, sm, md, lg, xl, full).",
      },
    },
  },
};
