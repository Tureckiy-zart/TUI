/**
 * Accessible Name Gallery
 *
 * Demonstrates correct accessible naming patterns across primitives.
 * Shows various methods for providing accessible names to interactive controls.
 *
 * Reference: docs/architecture/A11Y_AUTHORITY.md
 */
"use client";
import type { Meta, StoryObj } from "@storybook/react";

import { Box, Stack } from "@/COMPOSITION/layout";
import { Field } from "@/PRIMITIVES/Field";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";

import { Button } from "@/PRIMITIVES/Button";
import { Checkbox } from "@/PRIMITIVES/Checkbox";
import { Input } from "@/PRIMITIVES/Input";
import { Label } from "@/PRIMITIVES/Label";
import { Radio } from "@/PRIMITIVES/Radio";
import { Switch } from "@/PRIMITIVES/Switch";

const meta: Meta = {
  title: "Composition / A11Y / Accessible Name Gallery",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
          Accessible Name Gallery - Examples of correct labeling patterns.
          
          **Accessible Name Sources (Priority Order):**
          1. Visible label text (for native form controls)
          2. aria-label attribute
          3. aria-labelledby attribute (references label element)
          4. Text content (for buttons, links)
          
          **Testing Instructions:**
          - Use screen reader (NVDA/JAWS/VoiceOver) to verify accessible names
          - Check that all interactive elements have names
          - Verify icon-only buttons have aria-label
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Button Accessible Names
 */
export const ButtonNames: Story = {
  name: "Button Names",
  render: function ButtonNamesStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Button Accessible Names</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Buttons get accessible names from text content or aria-label.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    Text Content (Default):
                  </Text>
                </Box>
                <Button variant="primary">Submit Form</Button>
                <Box className="mt-2">
                  <Text size="sm" typographyRole="meta" color="muted">
                    Accessible name: "Submit Form"
                  </Text>
                </Box>
              </Box>

              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    aria-label (Icon-only):
                  </Text>
                </Box>
                <Button iconOnly aria-label="Close dialog" variant="primary">
                  -
                </Button>
                <Box className="mt-2">
                  <Text size="sm" typographyRole="meta" color="muted">
                    Accessible name: "Close dialog" (required for icon-only buttons)
                  </Text>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Text size="sm">
              <strong>Rule N-2:</strong> Icon-only buttons MUST use aria-label. No visible text
              means aria-label is required.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Form Input Accessible Names
 */
export const FormInputNames: Story = {
  name: "Form Input Names",
  render: function FormInputNamesStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Form Input Accessible Names</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Form inputs require associated labels via Label component, aria-label, or
                aria-labelledby.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={6}>
              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    Label Component (htmlFor):
                  </Text>
                </Box>
                <Box className="flex items-center gap-2">
                  <Label htmlFor="email-1">Email</Label>
                  <Input id="email-1" type="email" />
                </Box>
                <Box className="mt-2">
                  <Text size="sm" typographyRole="meta" color="muted">
                    Accessible name: "Email" (via htmlFor/id association)
                  </Text>
                </Box>
              </Box>

              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    aria-labelledby:
                  </Text>
                </Box>
                <Label id="email-label-2">Email Address</Label>
                <Input aria-labelledby="email-label-2" type="email" />
                <Box className="mt-2">
                  <Text size="sm" typographyRole="meta" color="muted">
                    Accessible name: "Email Address" (via aria-labelledby)
                  </Text>
                </Box>
              </Box>

              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    aria-label:
                  </Text>
                </Box>
                <Input aria-label="Email address" type="email" />
                <Box className="mt-2">
                  <Text size="sm" typographyRole="meta" color="muted">
                    Accessible name: "Email address" (via aria-label)
                  </Text>
                </Box>
              </Box>

              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    Field Component (Composition):
                  </Text>
                </Box>
                <Field>
                  <Field.Label htmlFor="email-field">Email</Field.Label>
                  <Field.Control>
                    <Input id="email-field" type="email" />
                  </Field.Control>
                  <Field.Description>We'll never share your email.</Field.Description>
                </Field>
                <Box className="mt-2">
                  <Text size="sm" typographyRole="meta" color="muted">
                    Accessible name: "Email" (via Field.Label composition)
                  </Text>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Text size="sm">
              <strong>Rule N-3:</strong> Form inputs MUST have associated labels. Use Label
              component, aria-label, or aria-labelledby.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Custom Control Accessible Names
 */
export const CustomControlNames: Story = {
  name: "Custom Control Names",
  render: function CustomControlNamesStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Custom Control Accessible Names</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Custom controls (Checkbox, Radio, Switch) require aria-label or aria-labelledby as
                they have no visible label.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    aria-label:
                  </Text>
                </Box>
                <Box className="flex items-center gap-4">
                  <Checkbox aria-label="Accept terms and conditions" />
                  <Switch aria-label="Enable email notifications" />
                  <Radio aria-label="Option A" />
                </Box>
                <Box className="mt-2">
                  <Text size="sm" typographyRole="meta" color="muted">
                    Accessible names provided via aria-label
                  </Text>
                </Box>
              </Box>

              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    aria-labelledby:
                  </Text>
                </Box>
                <Box className="flex items-center gap-2">
                  <Checkbox aria-labelledby="terms-label" />
                  <Label id="terms-label">Accept terms</Label>
                </Box>
                <Box className="mt-2">
                  <Text size="sm" typographyRole="meta" color="muted">
                    Accessible name: "Accept terms" (via aria-labelledby)
                  </Text>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Text size="sm">
              <strong>Rule N-1:</strong> Every interactive control MUST have an accessible name.
              Custom controls require aria-label or aria-labelledby.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};
