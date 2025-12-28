/**
 * A11Y Overview - Governance Showcase
 *
 * Demonstrates accessibility patterns across the design system.
 * This story serves as the canonical reference for understanding A11Y behavior.
 *
 * Reference: docs/architecture/A11Y_AUTHORITY.md
 */
"use client";
import type { Meta, StoryObj } from "@storybook/react";

import { Box, Stack } from "@/COMPOSITION/layout";
import { Button } from "@/PRIMITIVES/Button";
import { Checkbox } from "@/PRIMITIVES/Checkbox";
import { Heading } from "@/PRIMITIVES/Heading";
import { Input } from "@/PRIMITIVES/Input";
import { Label } from "@/PRIMITIVES/Label";
import { Link } from "@/PRIMITIVES/Link";
import { Radio } from "@/PRIMITIVES/Radio";
import { Switch } from "@/PRIMITIVES/Switch";
import { Text } from "@/PRIMITIVES/Text";

const meta: Meta = {
  title: "UI / Composition / A11Y / Overview",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
          A11Y Overview - Visual demonstration of accessibility patterns.
          
          **Key Principles:**
          - Every interactive component must be keyboard-operable
          - Every interactive component must have an accessible name
          - Native semantics take precedence over ARIA
          - Accessibility is not optional
          
          **Testing Instructions:**
          1. Use Tab to navigate through interactive elements
          2. Use Enter/Space to activate buttons and links
          3. Use Arrow keys to navigate composite controls
          4. Test with screen reader (NVDA/JAWS/VoiceOver)
          
          **Reference:** See [A11Y Authority Contract](../../../../docs/architecture/A11Y_AUTHORITY.md)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Semantic Roles Demo
 * Demonstrates correct semantic element usage
 */
export const SemanticRoles: Story = {
  name: "Semantic Roles",
  render: function SemanticRolesStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Semantic Elements</Heading>
            <Box className="mt-2">
              <Text tone="muted">
                All interactive elements use correct semantic HTML or proper ARIA roles.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-border p-md">
            <Stack spacing={4}>
              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    Native Semantic Elements:
                  </Text>
                </Box>
                <Stack spacing={2}>
                  <Button variant="primary">Native Button</Button>
                  <Link href="#" variant="primary">
                    Native Link
                  </Link>
                  <Box className="flex items-center gap-2">
                    <Label htmlFor="demo-input">Label</Label>
                    <Input id="demo-input" placeholder="Native Input" />
                  </Box>
                </Stack>
              </Box>

              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    Custom Controls with ARIA:
                  </Text>
                </Box>
                <Stack spacing={2}>
                  <Box className="flex items-center gap-4">
                    <Checkbox aria-label="Accept terms" />
                    <Text size="sm">Checkbox (role="checkbox")</Text>
                  </Box>
                  <Box className="flex items-center gap-4">
                    <Radio aria-label="Option 1" />
                    <Text size="sm">Radio (role="radio")</Text>
                  </Box>
                  <Box className="flex items-center gap-4">
                    <Switch aria-label="Enable notifications" />
                    <Text size="sm">Switch (role="switch")</Text>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Text size="sm">
              <strong>Rule S-1:</strong> Prefer native semantic elements. Use ARIA only when native
              elements cannot be used.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Keyboard Only Demo
 * Demonstrates keyboard-only operability
 */
export const KeyboardOnly: Story = {
  name: "Keyboard Only",
  render: function KeyboardOnlyStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Keyboard-Only Operability</Heading>
            <Box className="mt-2">
              <Text tone="muted">
                All interactive elements can be operated using only keyboard (no mouse/touch
                required).
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-border p-md">
            <Stack spacing={4}>
              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    Tab Navigation:
                  </Text>
                </Box>
                <Stack spacing={2}>
                  <Button variant="primary">Tab to focus</Button>
                  <Input placeholder="Tab to focus" />
                  <Link href="#" variant="primary">
                    Tab to focus
                  </Link>
                </Stack>
              </Box>

              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    Enter/Space Activation:
                  </Text>
                </Box>
                <Stack spacing={2}>
                  <Button variant="primary">Press Enter or Space</Button>
                  <Link href="#" variant="primary">
                    Press Enter to activate
                  </Link>
                </Stack>
              </Box>

              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    Arrow Key Navigation (Composite Controls):
                  </Text>
                </Box>
                <Box className="flex items-center gap-4">
                  <Radio aria-label="Option 1" />
                  <Radio aria-label="Option 2" />
                  <Radio aria-label="Option 3" />
                  <Text size="sm">Use Arrow keys to navigate</Text>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Text size="sm">
              <strong>Rule K-1:</strong> All interactive components MUST be keyboard-operable. Tab
              reaches all elements, Enter/Space activates buttons/links, Arrow keys navigate
              composites.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};
