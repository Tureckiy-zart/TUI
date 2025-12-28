/**
 * Focus Order Playground - Interactive Demo
 *
 * Provides an interactive environment to explore and test tab order behavior.
 * Useful for understanding DOM order = navigation order principle.
 *
 * Reference: docs/architecture/FOCUS_AUTHORITY.md (Rules T-ORD-*)
 */
"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import { Box, Stack } from "@/COMPOSITION/layout";
import { Tabs } from "@/COMPOSITION/navigation/tabs";
import { Button } from "@/PRIMITIVES/Button";
import { Heading } from "@/PRIMITIVES/Heading";
import { Input } from "@/PRIMITIVES/Input";
import { Text } from "@/PRIMITIVES/Text";

const meta: Meta = {
  title: "UI / Composition / Motion / Focus / Order Playground",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
          Focus Order Playground - Interactive tool for testing tab order.
          
          **Purpose:** Visualize and understand how focus order follows DOM structure.
          
          **Key Rules:**
          - T-ORD-1: DOM order = navigation order
          - T-ORD-2: Positive tabindex is FORBIDDEN
          - T-ORD-3: Roving tabindex for composite controls
          
          **Testing:**
          - Tab through elements and watch the focus tracker
          - Compare visual order vs DOM order
          
          **Reference:** See [Focus Authority Contract](../../../../docs/architecture/FOCUS_AUTHORITY.md)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Focus Tracker
 * Shows which element is currently focused
 */
export const FocusTracker: Story = {
  name: "Focus Tracker",
  render: function FocusTrackerStory() {
    const [focusedElement, setFocusedElement] = useState<string>("None");
    const [focusHistory, setFocusHistory] = useState<string[]>([]);

    useEffect(() => {
      const handleFocus = (e: FocusEvent) => {
        const target = e.target as HTMLElement;
        const label =
          target.getAttribute("data-focus-label") ||
          target.textContent?.slice(0, 30) ||
          target.tagName;
        setFocusedElement(label);
        setFocusHistory((prev) => [...prev.slice(-9), label]);
      };

      document.addEventListener("focusin", handleFocus);
      return () => document.removeEventListener("focusin", handleFocus);
    }, []);

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Focus Tracker</Heading>
            <Box className="mt-2">
              <Text tone="muted">Tab through elements. The tracker shows focus order history.</Text>
            </Box>
          </Box>

          {/* Focus Monitor */}
          <Box className="sticky top-4 z-10 rounded-lg border border-primary bg-primary/10 p-md">
            <Text size="sm" weight="semibold">
              Currently Focused:
            </Text>
            <Box className="font-mono text-primary">
              <Text>{focusedElement}</Text>
            </Box>
            <Box className="mt-2">
              <Text size="xs" tone="muted">
                History: {focusHistory.join(" → ") || "Start tabbing..."}
              </Text>
            </Box>
          </Box>

          {/* Interactive Elements */}
          <Box className="rounded-lg border border-border p-md">
            <Stack spacing={3}>
              <Button variant="outline" data-focus-label="Button 1">
                Button 1
              </Button>
              <Input placeholder="Input A" data-focus-label="Input A" />
              <Button variant="outline" data-focus-label="Button 2">
                Button 2
              </Button>
              <Input placeholder="Input B" data-focus-label="Input B" />
              <Button variant="primary" data-focus-label="Button 3 (Primary)">
                Button 3 (Primary)
              </Button>
            </Stack>
          </Box>

          <Button variant="outline" onClick={() => setFocusHistory([])}>
            Clear History
          </Button>
        </Stack>
      </Box>
    );
  },
};

/**
 * Visual vs DOM Order
 * Shows that CSS visual order doesn't affect tab order
 */
export const VisualVsDomOrder: Story = {
  name: "Visual vs DOM Order",
  render: function VisualVsDomOrderStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Visual vs DOM Order</Heading>
            <Box className="mt-2">
              <Text tone="muted">CSS flex order changes visual position but NOT tab order.</Text>
            </Box>
          </Box>

          {/* Normal Order */}
          <Box className="rounded-lg border border-border p-md">
            <Box className="mb-2">
              <Text size="sm" weight="semibold">
                Normal DOM Order (1 → 2 → 3):
              </Text>
            </Box>
            <Box className="flex gap-2">
              <Button variant="outline">1. First</Button>
              <Button variant="outline">2. Second</Button>
              <Button variant="outline">3. Third</Button>
            </Box>
          </Box>

          {/* Reversed Visual Order */}
          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Box className="mb-2">
              <Text size="sm" weight="semibold">
                Reversed Visual Order (CSS flex-row-reverse):
              </Text>
            </Box>
            <Box className="mb-2">
              <Text size="xs" tone="muted">
                Visually: 3 → 2 → 1, but Tab order: 1 → 2 → 3 (DOM order)
              </Text>
            </Box>
            <Box className="flex flex-row-reverse gap-2">
              <Button variant="outline">1. First (visually last)</Button>
              <Button variant="outline">2. Second</Button>
              <Button variant="outline">3. Third (visually first)</Button>
            </Box>
          </Box>

          {/* Grid Order */}
          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Box className="mb-2">
              <Text size="sm" weight="semibold">
                CSS Grid with order property:
              </Text>
            </Box>
            <Box className="mb-2">
              <Text size="xs" tone="muted">
                Visual order differs from tab order. This can confuse keyboard users!
              </Text>
            </Box>
            <Box className="grid grid-cols-3 gap-2">
              <Box className="order-3">
                <Button variant="outline">1. First (order: 3)</Button>
              </Box>
              <Box className="order-1">
                <Button variant="outline">2. Second (order: 1)</Button>
              </Box>
              <Box className="order-2">
                <Button variant="outline">3. Third (order: 2)</Button>
              </Box>
            </Box>
          </Box>

          <Box className="rounded-lg border border-destructive/30 bg-destructive/10 p-md">
            <Text size="sm">
              <strong>Warning:</strong> Using CSS order/flex-direction-reverse creates visual vs
              logical order mismatch. This can confuse keyboard users who expect visual order.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Composite Controls Navigation
 * Demonstrates Tabs, SegmentedControl keyboard patterns
 */
export const CompositeControlsDemo: Story = {
  name: "Composite Controls",
  render: function CompositeControlsStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Composite Controls</Heading>
            <Box className="mt-2">
              <Text tone="muted">
                Tab enters group, Arrow keys navigate within, Tab exits group.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-border p-md">
            <Stack spacing={4}>
              <Button variant="outline">Before Tabs</Button>

              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    Tabs Component (Radix):
                  </Text>
                </Box>
                <Tabs.Root defaultValue="tab1">
                  <Tabs.List>
                    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
                    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
                    <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
                  </Tabs.List>
                  <Tabs.Content value="tab1">
                    <Box className="p-4">
                      <Text>Content for Tab 1</Text>
                      <Box className="mt-2">
                        <Input placeholder="Field in tab 1" />
                      </Box>
                    </Box>
                  </Tabs.Content>
                  <Tabs.Content value="tab2">
                    <Box className="p-4">
                      <Text>Content for Tab 2</Text>
                    </Box>
                  </Tabs.Content>
                  <Tabs.Content value="tab3">
                    <Box className="p-4">
                      <Text>Content for Tab 3</Text>
                    </Box>
                  </Tabs.Content>
                </Tabs.Root>
              </Box>

              <Button variant="outline">After Tabs</Button>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-primary/30 bg-primary/10 p-md">
            <Text size="sm">
              <strong>Expected behavior:</strong>
              <br />
              1. Tab to "Before Tabs" button
              <br />
              2. Tab to focused tab in TabList
              <br />
              3. Arrow Left/Right to change tabs
              <br />
              4. Tab to content area (if focusable content)
              <br />
              5. Tab to "After Tabs" button
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Disabled Elements
 * Shows how disabled elements affect tab order
 */
export const DisabledElementsDemo: Story = {
  name: "Disabled Elements",
  render: function DisabledElementsStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Disabled Elements</Heading>
            <Box className="mt-2">
              <Text tone="muted">Disabled elements are skipped in tab order.</Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-border p-md">
            <Stack spacing={3}>
              <Button variant="outline">1. Enabled</Button>
              <Button variant="outline" disabled>
                2. Disabled (skipped)
              </Button>
              <Button variant="outline">3. Enabled</Button>
              <Input placeholder="4. Enabled input" />
              <Input placeholder="5. Disabled input" disabled />
              <Button variant="primary">6. Enabled</Button>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-success/30 bg-success/10 p-md">
            <Text size="sm">
              <strong>Tab order:</strong> 1 → 3 → 4 → 6 (disabled elements skipped)
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Tabindex Values
 * Demonstrates why positive tabindex is forbidden
 */
export const TabindexDemo: Story = {
  name: "Tabindex Values",
  render: function TabindexStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Tabindex Values</Heading>
            <Box className="mt-2">
              <Text tone="muted">Only tabindex="0" and tabindex="-1" are allowed.</Text>
            </Box>
          </Box>

          {/* Allowed */}
          <Box className="rounded-lg border border-success/30 bg-success/10 p-md">
            <Box className="mb-2">
              <Text size="sm" weight="semibold">
                ✅ Allowed (tabindex="0"):
              </Text>
            </Box>
            <Box className="flex gap-2">
              <div
                tabIndex={0}
                role="button"
                className="cursor-pointer rounded-md bg-background px-4 py-2 focus-visible:ring-2 focus-visible:ring-ring"
              >
                Custom focusable div
              </div>
              <Button variant="outline">Normal button</Button>
            </Box>
          </Box>

          {/* Programmatic only */}
          <Box className="rounded-lg border border-primary/30 bg-primary/10 p-md">
            <Box className="mb-2">
              <Text size="sm" weight="semibold">
                ✅ Allowed (tabindex="-1"):
              </Text>
            </Box>
            <Box className="mb-2">
              <Text size="xs" tone="muted">
                Not in tab order, but can receive programmatic focus.
              </Text>
            </Box>
            <Box className="flex gap-2">
              <div
                tabIndex={-1}
                className="rounded-md bg-muted px-4 py-2 focus-visible:ring-2 focus-visible:ring-ring"
              >
                Programmatic focus only
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  const el = document.querySelector('[tabindex="-1"]') as HTMLElement;
                  el?.focus();
                }}
              >
                Focus it programmatically
              </Button>
            </Box>
          </Box>

          {/* Forbidden */}
          <Box className="rounded-lg border border-destructive/30 bg-destructive/10 p-md">
            <Box className="mb-2">
              <Text size="sm" weight="semibold">
                ❌ FORBIDDEN (positive tabindex):
              </Text>
            </Box>
            <Box className="mb-2">
              <Text size="xs" tone="muted">
                This creates unpredictable tab order. Never use tabindex {">"} 0.
              </Text>
            </Box>
            <Box className="flex gap-2 opacity-50">
              <code className="rounded bg-destructive/20 px-2 py-1 text-sm">tabindex="1"</code>
              <code className="rounded bg-destructive/20 px-2 py-1 text-sm">tabindex="99"</code>
            </Box>
          </Box>

          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Text size="sm">
              <strong>Rule T-ORD-2:</strong> Positive tabindex is forbidden. It creates
              unpredictable navigation order that's nearly impossible to maintain.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};
