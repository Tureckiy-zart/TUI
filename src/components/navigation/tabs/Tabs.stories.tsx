"use client";

import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs.Root> = {
  title: "Components/Navigation/Tabs",
  component: Tabs.Root,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Radix-based tabs component with token-driven styling. All behavior (keyboard navigation, focus management, a11y) is handled by Radix. Tenerife UI provides visual styling through tokens only.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Orientation of the tabs (horizontal or vertical)",
      table: {
        type: { summary: '"horizontal" | "vertical"' },
        defaultValue: { summary: '"horizontal"' },
      },
    },
    defaultValue: {
      control: "text",
      description: "Default value for uncontrolled usage",
      table: {
        type: { summary: "string" },
      },
    },
    value: {
      control: "text",
      description: "Controlled value for the active tab",
      table: {
        type: { summary: "string" },
      },
    },
    onValueChange: {
      action: "valueChanged",
      description: "Callback fired when the active tab changes",
      table: {
        type: { summary: "(value: string) => void" },
      },
    },
    activationMode: {
      control: "select",
      options: ["automatic", "manual"],
      description: "When to activate a tab (automatic on focus or manual on click)",
      table: {
        type: { summary: '"automatic" | "manual"' },
        defaultValue: { summary: '"automatic"' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs.Root>;

/**
 * Default Tabs usage with default tokens (md size, underline variant, primary tone)
 */
export const Default: Story = {
  render: () => (
    <Tabs.Root defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">
        <div className="p-md">Content for Tab 1</div>
      </Tabs.Content>
      <Tabs.Content value="tab2">
        <div className="p-md">Content for Tab 2</div>
      </Tabs.Content>
      <Tabs.Content value="tab3">
        <div className="p-md">Content for Tab 3</div>
      </Tabs.Content>
    </Tabs.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic Tabs usage with default tokens (md size, underline variant, primary tone).",
      },
    },
  },
};

/**
 * All available size variants (sm, md, lg)
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-sm text-sm font-medium">Small (sm)</h3>
        <Tabs.Root defaultValue="tab1">
          <Tabs.List size="sm">
            <Tabs.Trigger value="tab1" size="sm">
              Tab 1
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" size="sm">
              Tab 2
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3" size="sm">
              Tab 3
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" size="sm">
            <div className="p-sm">Content for Tab 1</div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
      <div>
        <h3 className="mb-sm text-sm font-medium">Medium (md) - Default</h3>
        <Tabs.Root defaultValue="tab1">
          <Tabs.List size="md">
            <Tabs.Trigger value="tab1" size="md">
              Tab 1
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" size="md">
              Tab 2
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3" size="md">
              Tab 3
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" size="md">
            <div className="p-md">Content for Tab 1</div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
      <div>
        <h3 className="mb-sm text-sm font-medium">Large (lg)</h3>
        <Tabs.Root defaultValue="tab1">
          <Tabs.List size="lg">
            <Tabs.Trigger value="tab1" size="lg">
              Tab 1
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" size="lg">
              Tab 2
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3" size="lg">
              Tab 3
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1" size="lg">
            <div className="p-lg">Content for Tab 1</div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs with different size tokens (sm, md, lg).",
      },
    },
  },
};

/**
 * All available variant tokens (underline, pill, segmented)
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-sm text-sm font-medium">Underline</h3>
        <Tabs.Root defaultValue="tab1">
          <Tabs.List variant="underline">
            <Tabs.Trigger value="tab1" variant="underline">
              Tab 1
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" variant="underline">
              Tab 2
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3" variant="underline">
              Tab 3
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">
            <div className="p-md">Content for Tab 1</div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
      <div>
        <h3 className="mb-sm text-sm font-medium">Pill</h3>
        <Tabs.Root defaultValue="tab1">
          <Tabs.List variant="pill">
            <Tabs.Trigger value="tab1" variant="pill">
              Tab 1
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" variant="pill">
              Tab 2
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3" variant="pill">
              Tab 3
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">
            <div className="p-md">Content for Tab 1</div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
      <div>
        <h3 className="mb-sm text-sm font-medium">Segmented</h3>
        <Tabs.Root defaultValue="tab1">
          <Tabs.List variant="segmented">
            <Tabs.Trigger value="tab1" variant="segmented">
              Tab 1
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" variant="segmented">
              Tab 2
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3" variant="segmented">
              Tab 3
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">
            <div className="p-md">Content for Tab 1</div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs with different variant tokens (underline, pill, segmented).",
      },
    },
  },
};

/**
 * All available tone tokens (neutral, primary)
 */
export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-lg">
      <div>
        <h3 className="mb-sm text-sm font-medium">Primary Tone</h3>
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1" tone="primary">
              Tab 1
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" tone="primary">
              Tab 2
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3" tone="primary">
              Tab 3
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">
            <div className="p-md">Content for Tab 1</div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
      <div>
        <h3 className="mb-sm text-sm font-medium">Neutral Tone</h3>
        <Tabs.Root defaultValue="tab1">
          <Tabs.List>
            <Tabs.Trigger value="tab1" tone="neutral">
              Tab 1
            </Tabs.Trigger>
            <Tabs.Trigger value="tab2" tone="neutral">
              Tab 2
            </Tabs.Trigger>
            <Tabs.Trigger value="tab3" tone="neutral">
              Tab 3
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab1">
            <div className="p-md">Content for Tab 1</div>
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs with different tone tokens (neutral, primary).",
      },
    },
  },
};

/**
 * Disabled tab trigger
 */
export const DisabledTab: Story = {
  render: () => (
    <Tabs.Root defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
        <Tabs.Trigger value="tab2" disabled>
          Tab 2 (Disabled)
        </Tabs.Trigger>
        <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">
        <div className="p-md">Content for Tab 1</div>
      </Tabs.Content>
      <Tabs.Content value="tab3">
        <div className="p-md">Content for Tab 3</div>
      </Tabs.Content>
    </Tabs.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs with a disabled trigger. Disabled tabs cannot be activated.",
      },
    },
  },
};

/**
 * Controlled Tabs usage
 */
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState("tab1");
    return (
      <Tabs.Root value={value} onValueChange={setValue}>
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">
          <div className="p-md">Content for Tab 1 (Current: {value})</div>
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <div className="p-md">Content for Tab 2 (Current: {value})</div>
        </Tabs.Content>
        <Tabs.Content value="tab3">
          <div className="p-md">Content for Tab 3 (Current: {value})</div>
        </Tabs.Content>
      </Tabs.Root>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Controlled Tabs usage with value and onValueChange props.",
      },
    },
  },
};

/**
 * Vertical orientation
 */
export const Vertical: Story = {
  render: () => (
    <Tabs.Root defaultValue="tab1" orientation="vertical">
      <div className="flex gap-md">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
        </Tabs.List>
        <div>
          <Tabs.Content value="tab1">
            <div className="p-md">Content for Tab 1</div>
          </Tabs.Content>
          <Tabs.Content value="tab2">
            <div className="p-md">Content for Tab 2</div>
          </Tabs.Content>
          <Tabs.Content value="tab3">
            <div className="p-md">Content for Tab 3</div>
          </Tabs.Content>
        </div>
      </div>
    </Tabs.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs with vertical orientation.",
      },
    },
  },
};

/**
 * Long labels with overflow behavior
 */
export const LongLabels: Story = {
  render: () => (
    <Tabs.Root defaultValue="tab1">
      <Tabs.List>
        <Tabs.Trigger value="tab1">Very Long Tab Label That Might Overflow</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Another Extremely Long Tab Label With Many Words</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Short</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1">
        <div className="p-md">Content for Tab 1 with long label</div>
      </Tabs.Content>
      <Tabs.Content value="tab2">
        <div className="p-md">Content for Tab 2 with long label</div>
      </Tabs.Content>
      <Tabs.Content value="tab3">
        <div className="p-md">Content for Tab 3 with short label</div>
      </Tabs.Content>
    </Tabs.Root>
  ),
  parameters: {
    docs: {
      description: {
        story: "Tabs with long labels to test overflow behavior and text truncation.",
      },
    },
  },
};

/**
 * Manual activation mode (tab activates only on click, not on focus)
 */
export const ManualActivation: Story = {
  render: () => {
    const [value, setValue] = React.useState("tab1");
    return (
      <Tabs.Root value={value} onValueChange={setValue} activationMode="manual">
        <Tabs.List>
          <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
          <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
          <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">
          <div className="p-md">Content for Tab 1 (Current: {value})</div>
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <div className="p-md">Content for Tab 2 (Current: {value})</div>
        </Tabs.Content>
        <Tabs.Content value="tab3">
          <div className="p-md">Content for Tab 3 (Current: {value})</div>
        </Tabs.Content>
      </Tabs.Root>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tabs with manual activation mode. Tabs are activated only on click (Enter/Space), not on focus. Use arrow keys to navigate, then press Enter to activate.",
      },
    },
  },
};
