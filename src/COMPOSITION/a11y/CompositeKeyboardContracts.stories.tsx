/**
 * Composite Keyboard Contracts
 *
 * Demonstrates keyboard navigation contracts for composite controls (Tabs, Select, Menu).
 * Shows roving tabindex patterns and arrow key navigation.
 *
 * Reference: docs/architecture/A11Y_AUTHORITY.md
 * Focus mechanics: docs/architecture/FOCUS_AUTHORITY.md
 */
"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Box, Stack } from "@/COMPOSITION/layout";
import { Select } from "@/COMPOSITION/controls/Select";
import { Tabs } from "@/COMPOSITION/navigation/tabs";
import { Heading } from "@/PRIMITIVES/Heading";
import { Radio, RadioGroup } from "@/PRIMITIVES/Radio";
import { Text } from "@/PRIMITIVES/Text";

const meta: Meta = {
  title: "Composition / A11Y / Composite Keyboard Contracts",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
          Composite Keyboard Contracts - Keyboard navigation for composite controls.
          
          **Key Requirements:**
          - Roving tabindex MUST be used (only selected/active item is tabbable)
          - Arrow keys MUST navigate between items
          - Enter/Space MUST activate selected item
          - Focus mechanics are governed by FOCUS_AUTHORITY
          
          **Testing Instructions:**
          1. Tab to composite control (focuses active item)
          2. Use Arrow keys to navigate between items
          3. Press Enter/Space to activate selected item
          4. Verify only active item is in tab order
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Tabs Keyboard Contract
 */
export const TabsKeyboard: Story = {
  name: "Tabs Keyboard",
  render: function TabsKeyboardStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Tabs Keyboard Contract</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Tabs use roving tabindex pattern. Only active tab is tabbable. Arrow keys navigate
                between tabs.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Tabs.Root defaultValue="tab1">
                <Tabs.List>
                  <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                  <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                  <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="tab1">
                  <Text>Content for Tab 1</Text>
                </Tabs.Content>
                <Tabs.Content value="tab2">
                  <Text>Content for Tab 2</Text>
                </Tabs.Content>
                <Tabs.Content value="tab3">
                  <Text>Content for Tab 3</Text>
                </Tabs.Content>
              </Tabs.Root>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Text size="sm">
              <strong>Rule K-5:</strong> Arrow keys MUST navigate composite controls. Tabs use
              roving tabindex (only active tab is tabbable). Radix handles this automatically.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Select Keyboard Contract
 */
export const SelectKeyboard: Story = {
  name: "Select Keyboard",
  render: function SelectKeyboardStory() {
    const [value, setValue] = useState<string>("option1");

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Select Keyboard Contract</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Select uses combobox pattern. Arrow keys navigate options. Enter selects. Escape
                closes.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Select.Root value={value} onValueChange={setValue}>
                <Select.Trigger aria-label="Choose an option">
                  <Select.Value placeholder="Select an option" />
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="option1">Option 1</Select.Item>
                  <Select.Item value="option2">Option 2</Select.Item>
                  <Select.Item value="option3">Option 3</Select.Item>
                </Select.Content>
              </Select.Root>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Text size="sm">
              <strong>Rule K-5:</strong> Select uses Arrow keys to navigate options, Enter to
              select, Escape to close. Radix handles this automatically.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * RadioGroup Keyboard Contract
 */
export const RadioGroupKeyboard: Story = {
  name: "Radio Group Keyboard",
  render: function RadioGroupKeyboardStory() {
    const [value, setValue] = useState<string | undefined>(undefined);

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Radio Group Keyboard Contract</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                RadioGroup uses roving tabindex pattern. Only selected radio is tabbable. Arrow keys
                navigate and select.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Text size="sm" typographyRole="meta" color="muted">
                Start with Option 1 selected. Use Arrow keys to move focus and selection.
              </Text>
              <RadioGroup value={value} onValueChange={setValue} orientation="vertical">
                <label className="flex items-center gap-sm">
                  <Radio value="option1" aria-labelledby="radio-kb-1" />
                  <span id="radio-kb-1">Option 1 (start here)</span>
                </label>
                <label className="flex items-center gap-sm">
                  <Radio value="option2" aria-labelledby="radio-kb-2" />
                  <span id="radio-kb-2">Option 2</span>
                </label>
                <label className="flex items-center gap-sm">
                  <Radio value="option3" aria-labelledby="radio-kb-3" />
                  <span id="radio-kb-3">Option 3</span>
                </label>
              </RadioGroup>
              <Text size="sm" typographyRole="meta" color="muted">
                Selected: {value ?? "none"}
              </Text>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Text size="sm">
              <strong>Rule K-5:</strong> RadioGroup uses Arrow keys to navigate and select. Only
              selected radio is tabbable (roving tabindex pattern).
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Roving Tabindex Reference
 */
export const RovingTabindexReference: Story = {
  name: "Roving Tabindex",
  render: function RovingTabindexReferenceStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Roving Tabindex Pattern</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Roving tabindex ensures only one item in a composite control is tabbable at a time.
                Arrow keys move focus and update tabindex.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Roving Tabindex Rules:
                  </Text>
                </Box>
                <Stack spacing={2} className="list-inside list-disc">
                  <Text size="sm">- Only selected/active item has tabindex="0"</Text>
                  <Text size="sm">- Other items have tabindex="-1"</Text>
                  <Text size="sm">- Arrow keys move focus and update tabindex</Text>
                  <Text size="sm">- Tab key focuses the active item only</Text>
                </Stack>
              </Box>

              <Box>
                <Box mb={2}>
                  <Text size="sm" weight="semibold">
                    Reference:
                  </Text>
                </Box>
                <Text size="sm">
                  See{" "}
                  <a
                    href="../../../../docs/architecture/FOCUS_AUTHORITY.md"
                    className="text-[hsl(var(--tm-primary))] underline"
                  >
                    FOCUS_AUTHORITY.md
                  </a>{" "}
                  Rule T-ORD-3 for detailed roving tabindex requirements.
                </Text>
              </Box>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Text size="sm">
              <strong>Reference:</strong> Focus navigation mechanics (roving tabindex, tab order)
              are defined in{" "}
              <a
                href="../../../../docs/architecture/FOCUS_AUTHORITY.md"
                className="text-[hsl(var(--tm-primary))] underline"
              >
                FOCUS_AUTHORITY.md
              </a>
              . This A11Y Authority handles semantic roles and keyboard operability contracts only.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};
