/**
 * Motion GAP - Governance Showcase
 *
 * Educational showcase demonstrating the Motion GAP concept through visual examples.
 * This story serves as the canonical reference for understanding Motion GAP evaluation and resolution.
 *
 * Reference: docs/architecture/MOTION_AUTHORITY.md#motion-gap
 */
"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Box, Container, Section, Stack } from "@/COMPOSITION/layout";
import { Button } from "@/PRIMITIVES/Button";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";

const meta: Meta = {
  title: "Foundation Locked/Composition/Motion/GAP",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
          Motion GAP Governance Showcase - Visual demonstration of Motion GAP concept.
          
          **Motion GAP** is a state where a component undergoes a perceivable state or spatial change without temporal feedback (motion/animation).
          
          This showcase demonstrates:
          - ❌ Unresolved GAP: State change without motion (problematic)
          - ✅ GAP resolved with motion: Canonical motion preset applied (correct)
          - 🚫 No motion by design: Structural components where motion is intentionally absent (correct)
          
          **Reference:** See [Motion Authority Contract](../../../../docs/architecture/MOTION_AUTHORITY.md#motion-gap) for complete GAP definition and resolution rules.
          
          **Rule:** Any component that changes state, visibility, or spatial position MUST be evaluated for Motion GAP. Unresolved GAPs are forbidden in LOCKED components.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Overview - Introduction to Motion GAP
 * Provides context and links to governance documentation
 */
export const Overview: Story = {
  render: () => {
    return (
      <Box className="p-lg">
        <Stack spacing={8}>
          <Box>
            <Heading level={1}>Motion GAP Governance</Heading>
            <Box className="mt-2">
              <Text tone="muted">
                Understanding when motion is required, when it's optional, and when it's forbidden.
              </Text>
            </Box>
          </Box>

          <Stack spacing={6}>
            <Box className="rounded-lg border border-error/20 bg-error/10 p-md">
              <Heading level={2}>What is Motion GAP?</Heading>
              <Box className="mt-2">
                <Text>
                  <strong>Motion GAP</strong> is a state where a component undergoes a perceivable
                  state or spatial change without temporal feedback (motion/animation).
                </Text>
              </Box>
              <Box className="mt-4">
                <Text size="sm" tone="muted">
                  GAP is a diagnostic signal, not an automatic defect. It represents a design
                  decision point that must be consciously evaluated and resolved.
                </Text>
              </Box>
            </Box>

            <Box>
              <Heading level={2}>GAP Evaluation Rule</Heading>
              <Box className="mt-2">
                <Text>
                  <strong>
                    Any component that changes state, visibility, or spatial position MUST be
                    evaluated for Motion GAP.
                  </strong>
                </Text>
              </Box>
              <Box className="mt-4">
                <Text size="sm">Change types that trigger GAP evaluation:</Text>
                <Stack spacing={2} className="mt-2">
                  <Box>
                    <Text size="sm">• Visibility changes (enter/exit animations)</Text>
                  </Box>
                  <Box>
                    <Text size="sm">• Size or layout changes</Text>
                  </Box>
                  <Box>
                    <Text size="sm">• Selection or active state changes</Text>
                  </Box>
                  <Box>
                    <Text size="sm">• User-triggered action feedback</Text>
                  </Box>
                </Stack>
              </Box>
            </Box>

            <Box>
              <Heading level={2}>Allowed GAP Outcomes</Heading>
              <Box className="mt-2">
                <Text>Exactly three outcomes are allowed for GAP resolution:</Text>
              </Box>
              <Stack spacing={4} className="mt-4">
                <Box className="rounded-lg border border-success/20 bg-success/10 p-md">
                  <Heading level={3}>1. ADD MOTION</Heading>
                  <Box className="mt-2">
                    <Text size="sm">
                      A canonical motion preset is applied from the Motion Preset Catalog
                      (`.tm-motion-*` utilities) or motion tokens.
                    </Text>
                  </Box>
                </Box>

                <Box className="rounded-lg border border-info/20 bg-info/10 p-md">
                  <Heading level={3}>2. NO MOTION BY DESIGN</Heading>
                  <Box className="mt-2">
                    <Text size="sm">
                      Absence of motion is explicitly declared and documented as an intentional
                      design decision.
                    </Text>
                  </Box>
                </Box>

                <Box className="rounded-lg border border-warning/20 bg-warning/10 p-md">
                  <Heading level={3}>3. DEFERRED</Heading>
                  <Box className="mt-2">
                    <Text size="sm">
                      Decision is postponed with documented rationale (only allowed for UNLOCKED
                      components).
                    </Text>
                  </Box>
                </Box>
              </Stack>
            </Box>

            <Box className="rounded-lg border border-error/20 bg-error/10 p-md">
              <Heading level={2}>Lock Requirement</Heading>
              <Box className="mt-2">
                <Text>
                  <strong>Unresolved GAPs are forbidden in LOCKED components.</strong>
                </Text>
              </Box>
              <Box className="mt-2">
                <Text size="sm">
                  A component may only be considered LOCKED if all potential Motion GAPs are
                  resolved.
                </Text>
              </Box>
            </Box>

            <Box>
              <Heading level={2}>Documentation</Heading>
              <Box className="mt-2">
                <Text>
                  For complete Motion GAP rules and examples, see:{" "}
                  <a
                    href="../../../../docs/architecture/MOTION_AUTHORITY.md#motion-gap"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary underline"
                  >
                    Motion Authority Contract - Motion GAP Section
                  </a>
                </Text>
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Box>
    );
  },
};

/**
 * Unresolved GAP - Negative Example
 * Demonstrates state change without temporal feedback
 */
export const UnresolvedGAP: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={1}>❌ GAP: State change without temporal feedback</Heading>
            <Box className="mt-2">
              <Text tone="muted">
                Notice the abrupt appearance/disappearance - this is a Motion GAP. The component
                changes state without providing temporal feedback to the user.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border-2 border-error/30 bg-error/5 p-md">
            <Stack spacing={4}>
              <Box>
                <Text size="sm" tone="muted">
                  This expand/collapse component changes visibility state but has NO motion classes
                  applied.
                </Text>
              </Box>

              <Button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? "Collapse" : "Expand"} Content
              </Button>

              {isExpanded && (
                <Box className="rounded-lg border bg-muted p-md">
                  <Stack spacing={2}>
                    <Heading level={3}>Content Panel</Heading>
                    <Text>
                      This content appears and disappears abruptly without any transition. The
                      sudden state change creates a jarring user experience and represents a Motion
                      GAP.
                    </Text>
                    <Text size="sm" tone="muted">
                      Motion GAP identified: Visibility change without temporal feedback.
                    </Text>
                  </Stack>
                </Box>
              )}
            </Stack>
          </Box>

          <Box className="rounded-lg border border-error/20 bg-error/10 p-md">
            <Heading level={3}>Problem</Heading>
            <Box className="mt-2">
              <Text size="sm">
                The abrupt state change provides no visual continuity. Users may miss the change or
                find it disorienting. This violates the Motion GAP rule: components with state
                changes must be evaluated and resolved.
              </Text>
            </Box>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Resolved with Motion - Positive Example
 * Demonstrates GAP resolved using canonical motion preset
 */
export const ResolvedWithMotion: Story = {
  render: () => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={1}>✅ GAP resolved: motion communicates change</Heading>
            <Box className="mt-2">
              <Text tone="muted">
                Same component with canonical motion preset applied. The state change is now
                communicated smoothly through temporal feedback.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border-2 border-success/30 bg-success/5 p-md">
            <Stack spacing={4}>
              <Box>
                <Text size="sm" tone="muted">
                  This expand/collapse component uses canonical motion preset{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-xs">tm-motion-fade-scale</code>{" "}
                  for enter and{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-xs">
                    tm-motion-fade-scale-out
                  </code>{" "}
                  for exit.
                </Text>
              </Box>

              <Button onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? "Collapse" : "Expand"} Content
              </Button>

              {isExpanded ? (
                <Box className="rounded-lg border bg-muted p-md tm-motion-fade-scale">
                  <Stack spacing={2}>
                    <Heading level={3}>Content Panel</Heading>
                    <Text>
                      This content now appears with a smooth fade and scale animation. The motion
                      provides clear temporal feedback, making the state change obvious and
                      pleasant.
                    </Text>
                    <Text size="sm" tone="muted">
                      Motion GAP resolved: ADD MOTION - Canonical preset applied.
                    </Text>
                  </Stack>
                </Box>
              ) : null}
            </Stack>
          </Box>

          <Box className="rounded-lg border border-success/20 bg-success/10 p-md">
            <Heading level={3}>Solution</Heading>
            <Box className="mt-2">
              <Text size="sm">
                The canonical motion preset provides smooth temporal feedback. The fade-scale
                animation clearly communicates the state change while maintaining accessibility
                (respects prefers-reduced-motion). This is the correct resolution: ADD MOTION.
              </Text>
            </Box>
            <Box className="mt-2">
              <Text size="xs" tone="muted">
                Note: All motion presets automatically respect reduced motion preferences via CSS
                variables.
              </Text>
            </Box>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * No Motion by Design - Structural Components
 * Demonstrates intentional absence of motion in structural components
 */
export const NoMotionByDesign: Story = {
  render: () => {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={1}>🚫 No motion by design (structural component)</Heading>
            <Box className="mt-2">
              <Text tone="muted">
                Structural components don't change state - motion is not applicable here. This is
                NOT a GAP - it's intentional absence.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border-2 border-info/30 bg-info/5 p-md">
            <Stack spacing={6}>
              <Box>
                <Text size="sm" tone="muted">
                  The following components are structural/layout elements. They don't change state
                  or position, so motion is not applicable.
                </Text>
              </Box>

              <Box>
                <Heading level={2}>Container</Heading>
                <Box className="mt-2">
                  <Container className="rounded-lg border bg-muted p-md">
                    <Text>
                      Container is a structural layout component. It provides consistent width and
                      padding but doesn't change state. No motion needed - this is intentional.
                    </Text>
                  </Container>
                </Box>
              </Box>

              <Box>
                <Heading level={2}>Section</Heading>
                <Box className="mt-2">
                  <Section padding="md" className="rounded-lg border bg-muted">
                    <Stack spacing={2}>
                      <Heading level={3}>Section Title</Heading>
                      <Text>
                        Section is a structural component for page layout. It provides consistent
                        vertical spacing but doesn't change state. No motion needed - this is
                        intentional.
                      </Text>
                    </Stack>
                  </Section>
                </Box>
              </Box>

              <Box>
                <Heading level={2}>Static Content Blocks</Heading>
                <Box className="mt-2">
                  <Stack spacing={4}>
                    <Box className="rounded-lg border bg-muted p-md">
                      <Text>
                        Static text blocks, headings, and content containers don't change state.
                        They are always visible and don't require motion.
                      </Text>
                    </Box>
                    <Box className="rounded-lg border bg-muted p-md">
                      <Text>
                        Layout primitives like Box, Stack, Flex, and Grid are structural. They
                        organize content but don't animate by themselves.
                      </Text>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-info/20 bg-info/10 p-md">
            <Heading level={3}>Intentional Absence</Heading>
            <Box className="mt-2">
              <Text size="sm">
                These components are NOT a Motion GAP. They are structural elements that don't
                change state, so motion is not applicable. The absence of motion is intentional and
                correct - this is "NO MOTION BY DESIGN".
              </Text>
            </Box>
            <Box className="mt-2">
              <Text size="sm">
                <strong>Rule:</strong> Only components that change state, visibility, or spatial
                position need GAP evaluation. Structural components are exempt.
              </Text>
            </Box>
          </Box>
        </Stack>
      </Box>
    );
  },
};
