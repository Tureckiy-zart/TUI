"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, Settings, User } from "lucide-react";
import * as React from "react";

import { Tabs } from "./Tabs";

const meta: Meta<typeof Tabs.Root> = {
  title: "Composition / Navigation / Tabs",
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

/**
 * Tabs with icons in triggers (leading and trailing icons)
 */
export const WithIcons: Story = {
  render: () => (
    <Tabs.Root defaultValue="settings">
      <Tabs.List>
        <Tabs.Trigger value="settings" leadingIcon={<Settings />}>
          Settings
        </Tabs.Trigger>
        <Tabs.Trigger value="profile" leadingIcon={<User />}>
          Profile
        </Tabs.Trigger>
        <Tabs.Trigger value="notifications" leadingIcon={<Bell />} trailingIcon={<Bell />}>
          Notifications
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="settings">
        <div className="p-md">Settings content</div>
      </Tabs.Content>
      <Tabs.Content value="profile">
        <div className="p-md">Profile content</div>
      </Tabs.Content>
      <Tabs.Content value="notifications">
        <div className="p-md">Notifications content</div>
      </Tabs.Content>
    </Tabs.Root>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Tabs with icons in triggers. Icons can be placed before (leadingIcon) or after (trailingIcon) the label.",
      },
    },
  },
};

/**
 * Matrix Story
 *
 * Variant × size matrix (underline | pill | segmented) × (sm | md | lg).
 * Required per VARIANTS_SIZE_CANON for components with both size and variant props.
 *
 * @canonical VARIANTS_SIZE_CANON - Matrix story (REQUIRED when component has both size and variant)
 */
export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-xl">
      <div>
        <h3 className="mb-md text-base font-semibold">Underline Variant</h3>
        <div className="flex flex-col gap-lg">
          <div>
            <p className="mb-sm text-xs text-[hsl(var(--tm-text-muted))]">Small (sm)</p>
            <Tabs.Root defaultValue="tab1">
              <Tabs.List variant="underline" size="sm">
                <Tabs.Trigger value="tab1" variant="underline" size="sm">
                  Tab 1
                </Tabs.Trigger>
                <Tabs.Trigger value="tab2" variant="underline" size="sm">
                  Tab 2
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
          </div>
          <div>
            <p className="mb-sm text-xs text-[hsl(var(--tm-text-muted))]">Medium (md)</p>
            <Tabs.Root defaultValue="tab1">
              <Tabs.List variant="underline" size="md">
                <Tabs.Trigger value="tab1" variant="underline" size="md">
                  Tab 1
                </Tabs.Trigger>
                <Tabs.Trigger value="tab2" variant="underline" size="md">
                  Tab 2
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
          </div>
          <div>
            <p className="mb-sm text-xs text-[hsl(var(--tm-text-muted))]">Large (lg)</p>
            <Tabs.Root defaultValue="tab1">
              <Tabs.List variant="underline" size="lg">
                <Tabs.Trigger value="tab1" variant="underline" size="lg">
                  Tab 1
                </Tabs.Trigger>
                <Tabs.Trigger value="tab2" variant="underline" size="lg">
                  Tab 2
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-md text-base font-semibold">Pill Variant</h3>
        <div className="flex flex-col gap-lg">
          <div>
            <p className="mb-sm text-xs text-[hsl(var(--tm-text-muted))]">Small (sm)</p>
            <Tabs.Root defaultValue="tab1">
              <Tabs.List variant="pill" size="sm">
                <Tabs.Trigger value="tab1" variant="pill" size="sm">
                  Tab 1
                </Tabs.Trigger>
                <Tabs.Trigger value="tab2" variant="pill" size="sm">
                  Tab 2
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
          </div>
          <div>
            <p className="mb-sm text-xs text-[hsl(var(--tm-text-muted))]">Medium (md)</p>
            <Tabs.Root defaultValue="tab1">
              <Tabs.List variant="pill" size="md">
                <Tabs.Trigger value="tab1" variant="pill" size="md">
                  Tab 1
                </Tabs.Trigger>
                <Tabs.Trigger value="tab2" variant="pill" size="md">
                  Tab 2
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
          </div>
          <div>
            <p className="mb-sm text-xs text-[hsl(var(--tm-text-muted))]">Large (lg)</p>
            <Tabs.Root defaultValue="tab1">
              <Tabs.List variant="pill" size="lg">
                <Tabs.Trigger value="tab1" variant="pill" size="lg">
                  Tab 1
                </Tabs.Trigger>
                <Tabs.Trigger value="tab2" variant="pill" size="lg">
                  Tab 2
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
          </div>
        </div>
      </div>
      <div>
        <h3 className="mb-md text-base font-semibold">Segmented Variant</h3>
        <div className="flex flex-col gap-lg">
          <div>
            <p className="mb-sm text-xs text-[hsl(var(--tm-text-muted))]">Small (sm)</p>
            <Tabs.Root defaultValue="tab1">
              <Tabs.List variant="segmented" size="sm">
                <Tabs.Trigger value="tab1" variant="segmented" size="sm">
                  Tab 1
                </Tabs.Trigger>
                <Tabs.Trigger value="tab2" variant="segmented" size="sm">
                  Tab 2
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
          </div>
          <div>
            <p className="mb-sm text-xs text-[hsl(var(--tm-text-muted))]">Medium (md)</p>
            <Tabs.Root defaultValue="tab1">
              <Tabs.List variant="segmented" size="md">
                <Tabs.Trigger value="tab1" variant="segmented" size="md">
                  Tab 1
                </Tabs.Trigger>
                <Tabs.Trigger value="tab2" variant="segmented" size="md">
                  Tab 2
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
          </div>
          <div>
            <p className="mb-sm text-xs text-[hsl(var(--tm-text-muted))]">Large (lg)</p>
            <Tabs.Root defaultValue="tab1">
              <Tabs.List variant="segmented" size="lg">
                <Tabs.Trigger value="tab1" variant="segmented" size="lg">
                  Tab 1
                </Tabs.Trigger>
                <Tabs.Trigger value="tab2" variant="segmented" size="lg">
                  Tab 2
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Matrix of all variant × size combinations (underline, pill, segmented) × (sm, md, lg). Reference: VARIANTS_SIZE_CANON.md.",
      },
    },
  },
};

/**
 * Controlled vs Uncontrolled comparison
 */
export const ControlledVsUncontrolled: Story = {
  render: () => {
    const [controlledValue, setControlledValue] = React.useState("tab1");
    return (
      <div className="flex flex-col gap-xl">
        <div>
          <h3 className="mb-md text-base font-semibold">Controlled Mode</h3>
          <p className="mb-sm text-sm text-[hsl(var(--tm-text-muted))]">
            Value is managed externally via state. Current value: <strong>{controlledValue}</strong>
          </p>
          <Tabs.Root value={controlledValue} onValueChange={setControlledValue}>
            <Tabs.List>
              <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
              <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
              <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">
              <div className="p-md">Content 1 (Controlled)</div>
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <div className="p-md">Content 2 (Controlled)</div>
            </Tabs.Content>
            <Tabs.Content value="tab3">
              <div className="p-md">Content 3 (Controlled)</div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
        <div>
          <h3 className="mb-md text-base font-semibold">Uncontrolled Mode</h3>
          <p className="mb-sm text-sm text-[hsl(var(--tm-text-muted))]">
            Value is managed internally by Radix. Use <code className="text-xs">defaultValue</code>{" "}
            to set initial state.
          </p>
          <Tabs.Root defaultValue="tab2">
            <Tabs.List>
              <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
              <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
              <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="tab1">
              <div className="p-md">Content 1 (Uncontrolled)</div>
            </Tabs.Content>
            <Tabs.Content value="tab2">
              <div className="p-md">Content 2 (Uncontrolled - Default)</div>
            </Tabs.Content>
            <Tabs.Content value="tab3">
              <div className="p-md">Content 3 (Uncontrolled)</div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Comparison of controlled and uncontrolled modes. Controlled mode uses `value` and `onValueChange` props. Uncontrolled mode uses `defaultValue` prop.",
      },
    },
  },
};
