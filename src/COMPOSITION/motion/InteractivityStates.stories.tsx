/**
 * Interactivity States - Audit Dashboard
 *
 * Shows hover/active/focus-visible states for core interactive components in one view.
 * This story serves as the canonical visual checker for interactivity feedback.
 */
"use client";
import type { Meta, StoryObj } from "@storybook/react";

import { Slider } from "@/COMPOSITION/controls/Slider";
import { Box, Flex, Grid, Stack } from "@/COMPOSITION/layout";
import { Button } from "@/PRIMITIVES/Button";
import { Checkbox } from "@/PRIMITIVES/Checkbox";
import { Heading } from "@/PRIMITIVES/Heading";
import { Input } from "@/PRIMITIVES/Input";
import { Link } from "@/PRIMITIVES/Link";
import { Radio } from "@/PRIMITIVES/Radio";
import { Switch } from "@/PRIMITIVES/Switch";
import { Text } from "@/PRIMITIVES/Text";

const meta: Meta = {
  title: "UI / Composition / Motion / Interactivity States",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
          Interactivity States Dashboard - Visual verification of hover/active/focus-visible states.
          Use this story to verify that all interactive components provide proper motion feedback.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Interactivity States Overview
 * Shows all interactive components with their states
 */
export const Overview: Story = {
  render: () => {
    return (
      <Box className="p-lg">
        <Stack spacing={8}>
          <Box>
            <Heading level={1}>Interactivity States Overview</Heading>
            <Box>
              <Text tone="muted">
                Hover, active, and focus-visible states for core interactive components. Use
                keyboard navigation (Tab) to test focus states.
              </Text>
            </Box>
          </Box>

          <Stack spacing={6}>
            {/* Buttons */}
            <Box>
              <Heading level={2}>Buttons</Heading>
              <Box className="mb-4">
                <Text size="sm" tone="muted">
                  Hover: Lift/scale effect | Active: Press feedback | Focus: Visible ring
                </Text>
              </Box>
              <Flex gap={4} wrap="wrap">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </Flex>
            </Box>

            {/* Links */}
            <Box>
              <Heading level={2}>Links</Heading>
              <Box className="mb-4">
                <Text size="sm" tone="muted">
                  Hover: Underline/color change | Focus: Visible ring
                </Text>
              </Box>
              <Flex gap={4} wrap="wrap">
                <Link href="#">Default Link</Link>
                <Link href="#" variant="wrapper">
                  Underline Link
                </Link>
                <Link href="#" variant="ghost">
                  Ghost Link
                </Link>
              </Flex>
            </Box>

            {/* Form Controls */}
            <Box>
              <Heading level={2}>Form Controls</Heading>
              <Box className="mb-4">
                <Text size="sm" tone="muted">
                  Hover: Border/background change | Active: Press feedback | Focus: Visible ring
                </Text>
              </Box>
              <Stack spacing={4}>
                <Flex gap={4} wrap="wrap">
                  <Input placeholder="Input field" />
                  <Checkbox aria-label="Checkbox option" />
                  <Radio aria-label="Radio option" name="radio-demo" />
                  <Switch aria-label="Switch toggle" />
                </Flex>
                <Box className="w-64">
                  <Slider defaultValue={50} />
                </Box>
              </Stack>
            </Box>

            {/* Interactive Cards */}
            <Box>
              <Heading level={2}>Interactive Elements</Heading>
              <Box className="mb-4">
                <Text size="sm" tone="muted">
                  Hover: Lift/scale effect | Active: Press feedback | Focus: Visible ring
                </Text>
              </Box>
              <Flex gap={4} wrap="wrap">
                <Box className="cursor-pointer rounded-lg border p-md tm-motion-hover-lift tm-motion-tap-scale">
                  <Text weight="semibold">Hover Lift Card</Text>
                  <Box>
                    <Text size="sm" tone="muted">
                      Hover to lift, click to scale
                    </Text>
                  </Box>
                </Box>
                <Box className="cursor-pointer rounded-lg border p-md tm-motion-hover-scale tm-motion-tap-scale">
                  <Text weight="semibold">Hover Scale Card</Text>
                  <Box>
                    <Text size="sm" tone="muted">
                      Hover to scale, click to press
                    </Text>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Stack>

          {/* Instructions */}
          <Box className="mt-8 rounded-lg bg-muted p-md">
            <Heading level={3}>Testing Instructions</Heading>
            <Stack spacing={2} className="mt-2">
              <Box>
                <Text size="sm">
                  <strong>Hover:</strong> Move mouse over elements to see hover effects
                </Text>
              </Box>
              <Box>
                <Text size="sm">
                  <strong>Active:</strong> Click and hold to see active/press feedback
                </Text>
              </Box>
              <Box>
                <Text size="sm">
                  <strong>Focus:</strong> Press Tab to navigate and see focus-visible rings
                </Text>
              </Box>
              <Box>
                <Text size="sm" tone="muted">
                  All states should provide smooth transitions using motion tokens.
                </Text>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Button States Detail
 */
export const ButtonStates: Story = {
  render: () => {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={1}>Button Interaction States</Heading>
            <Box>
              <Text tone="muted">
                Detailed view of button states: base, hover, active, focus-visible, disabled
              </Text>
            </Box>
          </Box>

          <Grid cols={2} gap={6}>
            <Box>
              <Heading level={3}>Primary Button</Heading>
              <Stack spacing={4} className="mt-4">
                <Button variant="primary">Base State</Button>
                <Box>
                  <Text size="sm" tone="muted">
                    Hover: Background darkens, slight lift
                    <br />
                    Active: Background darkens further, slight scale down
                    <br />
                    Focus: Visible ring outline
                  </Text>
                </Box>
              </Stack>
            </Box>

            <Box>
              <Heading level={3}>Secondary Button</Heading>
              <Stack spacing={4} className="mt-4">
                <Button variant="secondary">Base State</Button>
                <Box>
                  <Text size="sm" tone="muted">
                    Hover: Background lightens, slight lift
                    <br />
                    Active: Background lightens further, slight scale down
                    <br />
                    Focus: Visible ring outline
                  </Text>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Stack>
      </Box>
    );
  },
};
