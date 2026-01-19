import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Text } from "@/PRIMITIVES/Text";
import { Stack } from "../Stack";
import { Panel } from "./Panel";

const meta: Meta<typeof Panel> = {
  title: "UI / Composition / Layout / Panel",
  component: Panel,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Panel is a lightweight structural surface container for grouped content. Panel provides surface styling without interactivity, sitting semantically between Box (generic container) and Card (structured content container).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: { type: "select" },
      options: ["default", "muted", "subtle"],
      description: "Surface tone variant",
      table: {
        type: { summary: '"default" | "muted" | "subtle"' },
        defaultValue: { summary: "default" },
      },
    },
    padding: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Padding (token-based)",
      table: {
        type: { summary: "ResponsiveSpacing" },
        defaultValue: { summary: "md" },
      },
    },
    radius: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl"],
      description: "Border radius (token-based)",
      table: {
        type: { summary: "ResponsiveRadius" },
        defaultValue: { summary: "md" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  args: {
    tone: "default",
    padding: "md",
    children: "Panel content",
  },
};

export const ToneVariants: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Default</h3>
        <Panel tone="default" padding="md" radius="md">
          <Text>Default panel - standard surface styling</Text>
        </Panel>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Muted</h3>
        <Panel tone="muted" padding="md" radius="md">
          <Text>Muted panel - muted background</Text>
        </Panel>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Subtle</h3>
        <Panel tone="subtle" padding="md" radius="md">
          <Text>Subtle panel - minimal background difference</Text>
        </Panel>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "All panel tone variants",
      },
    },
  },
};

export const PaddingVariants: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: sm</h3>
        <Panel tone="default" padding="sm" radius="md">
          <Text>Small padding (8px)</Text>
        </Panel>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: md</h3>
        <Panel tone="default" padding="md" radius="md">
          <Text>Medium padding (16px)</Text>
        </Panel>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Padding: lg</h3>
        <Panel tone="default" padding="lg" radius="md">
          <Text>Large padding (24px)</Text>
        </Panel>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Panel with different padding values",
      },
    },
  },
};

export const RadiusVariants: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Radius: sm</h3>
        <Panel tone="default" padding="md" radius="sm">
          <Text>Small radius (4px)</Text>
        </Panel>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Radius: md</h3>
        <Panel tone="default" padding="md" radius="md">
          <Text>Medium radius (6px)</Text>
        </Panel>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Radius: lg</h3>
        <Panel tone="default" padding="md" radius="lg">
          <Text>Large radius (8px)</Text>
        </Panel>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Radius: xl</h3>
        <Panel tone="default" padding="md" radius="xl">
          <Text>Extra large radius (12px)</Text>
        </Panel>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Panel with different border radius values",
      },
    },
  },
};

export const FormSection: Story = {
  render: () => (
    <Panel tone="muted" padding="lg" radius="md">
      <Stack direction="vertical" spacing="md">
        <Text size="lg" weight="semibold">
          Form Section
        </Text>
        <Text tone="muted">
          Panel is perfect for grouping form fields and related content without implying
          interactivity.
        </Text>
        <div className="space-y-sm">
          <div>
            <Text size="sm" weight="medium">
              Field Label
            </Text>
            <input
              type="text"
              className="mt-xs w-full rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-sm py-xs"
              placeholder="Enter value"
            />
          </div>
          <div>
            <Text size="sm" weight="medium">
              Another Field
            </Text>
            <input
              type="text"
              className="mt-xs w-full rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-sm py-xs"
              placeholder="Enter value"
            />
          </div>
        </div>
      </Stack>
    </Panel>
  ),
  parameters: {
    docs: {
      description: {
        story: "Panel used as a form section container",
      },
    },
  },
};

export const SettingsPanel: Story = {
  render: () => (
    <Panel tone="subtle" padding="lg" radius="lg">
      <Stack direction="vertical" spacing="md">
        <Text size="lg" weight="semibold">
          Settings
        </Text>
        <div className="space-y-sm">
          <div className="flex items-center justify-between">
            <Text>Notification preferences</Text>
            <Text tone="muted" size="sm">
              Enabled
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <Text>Dark mode</Text>
            <Text tone="muted" size="sm">
              Auto
            </Text>
          </div>
          <div className="flex items-center justify-between">
            <Text>Language</Text>
            <Text tone="muted" size="sm">
              English
            </Text>
          </div>
        </div>
      </Stack>
    </Panel>
  ),
  parameters: {
    docs: {
      description: {
        story: "Panel used as a settings panel container",
      },
    },
  },
};

export const GroupedContent: Story = {
  render: () => (
    <div className="space-y-md">
      <Panel tone="default" padding="md" radius="md">
        <Stack direction="vertical" spacing="sm">
          <Text weight="semibold">Grouped Content Section</Text>
          <Text tone="muted" size="sm">
            Panel provides semantic grouping for related content without the structure of Card.
          </Text>
        </Stack>
      </Panel>
      <Panel tone="muted" padding="md" radius="md">
        <Stack direction="vertical" spacing="sm">
          <Text weight="semibold">Another Group</Text>
          <Text tone="muted" size="sm">
            Multiple panels can be used to organize content sections.
          </Text>
        </Stack>
      </Panel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Panel used for grouped content sections",
      },
    },
  },
};

export const ComparisonWithCard: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-lg font-semibold">Panel (lighter)</h3>
        <Panel tone="default" padding="md" radius="md">
          <Text>Panel is a lightweight structural container</Text>
        </Panel>
      </div>
      <div>
        <h3 className="mb-sm text-lg font-semibold">Card (heavier)</h3>
        <div className="rounded-xl border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-raised))] p-lg shadow">
          <Text>Card has stronger visual hierarchy with shadow</Text>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Visual comparison showing Panel is lighter than Card",
      },
    },
  },
};

/**
 * Matrix Story
 *
 * Demonstrates all tone - padding - radius combinations in a grid layout.
 * Panel has tone (variant), padding, and radius props, so this matrix shows
 * all visual combinations for comprehensive comparison.
 *
 * Note: Panel does not have a canonical "size" prop, so this matrix demonstrates
 * tone - padding - radius combinations instead of the standard variant - size matrix.
 */
export const Matrix: Story = {
  render: () => {
    const tones: Array<"default" | "muted" | "subtle"> = ["default", "muted", "subtle"];
    const paddings: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];
    const radii: Array<"sm" | "md" | "lg" | "xl"> = ["sm", "md", "lg", "xl"];

    return (
      <div className="space-y-lg">
        <div>
          <h3 className="mb-md text-sm font-semibold">Tone - Padding - Radius Matrix</h3>
          <div className="space-y-md">
            {tones.map((tone) => (
              <div key={tone}>
                <h4 className="mb-sm text-xs font-medium capitalize text-[hsl(var(--tm-text-primary))]/80">
                  {tone} Tone
                </h4>
                <div className="grid grid-cols-4 gap-md">
                  <div className="text-xs font-medium text-[hsl(var(--tm-text-primary))]/80">
                    Radius
                  </div>
                  {radii.map((radius) => (
                    <div
                      key={radius}
                      className="text-center text-xs font-medium text-[hsl(var(--tm-text-primary))]/80"
                    >
                      {radius}
                    </div>
                  ))}
                  {paddings.map((padding) => (
                    <React.Fragment key={padding}>
                      <div className="flex items-center text-xs font-medium text-[hsl(var(--tm-text-primary))]/80">
                        Padding: {padding}
                      </div>
                      {radii.map((radius) => (
                        <Panel
                          key={`${tone}-${padding}-${radius}`}
                          tone={tone}
                          padding={padding}
                          radius={radius}
                        >
                          <Text size="sm">Content</Text>
                        </Panel>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Matrix Story:** Demonstrates all tone - padding - radius combinations. Shows comprehensive visual comparison of all Panel prop combinations.",
      },
    },
  },
};
