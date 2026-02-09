/**
 * Focus GAP Gallery - Governance Showcase
 *
 * Demonstrates all ACCEPTABLE Focus GAPs in the design system.
 * Each GAP is documented with rationale per FOCUS_AUTHORITY Rule F-GAP-1.
 *
 * Reference: docs/reports/audit/FOCUS_GAPS.md
 */
"use client";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Box, Stack } from "@/COMPOSITION/layout";
import { Stepper } from "@/COMPOSITION/navigation/stepper";
import { PopoverWrapper } from "@/COMPOSITION/overlays/Popover";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastTitle,
} from "@/COMPOSITION/overlays/Toast";
import { ToastProvider } from "@/COMPOSITION/overlays/ToastProvider";
import { ToastViewport } from "@/COMPOSITION/overlays/ToastViewport";
import { Button } from "@/PRIMITIVES/Button";
import { Heading } from "@/PRIMITIVES/Heading";
import { Input } from "@/PRIMITIVES/Input";
import { Text } from "@/PRIMITIVES/Text";

const meta: Meta = {
  title: "Composition / Motion / Focus / GAP Gallery",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
          Focus GAP Gallery - Visual demonstration of intentional focus behavior gaps.
          
          **What is a Focus GAP?**
          A Focus GAP is a state where expected focus behavior is intentionally absent.
          
          **Per FOCUS_AUTHORITY Rule F-GAP-1:**
          Focus GAPs MUST be explicitly documented to be allowed.
          
          **This gallery shows:**
          - GAP-1: Popover non-modal behavior (focus can leave)
          - GAP-2: Toast tab order insertion
          - GAP-4: Stepper non-interactive steps
          
          **Note:** GAP-3 (Drawer focus-visible) is classified as a known issue and not shown here.
          
          **Reference:** See [FOCUS_GAPS.md](../../../../docs/reports/audit/FOCUS_GAPS.md)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Overview - Introduction to Focus GAPs
 */
export const Overview: Story = {
  render: function OverviewStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={8}>
          <Box>
            <Heading level={1}>Focus GAP Gallery</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Demonstrating intentional, documented focus behavior gaps.
              </Text>
            </Box>
          </Box>

          <Stack spacing={6}>
            <Box className="rounded-lg border border-[hsl(var(--tm-primary))]/30 bg-[hsl(var(--tm-primary))]/10 p-md">
              <Heading level={2}>What is a Focus GAP?</Heading>
              <Box className="mt-2">
                <Text>
                  A <strong>Focus GAP</strong> is an intentional, documented absence or break in
                  expected focus behavior. GAPs are allowed ONLY when properly documented.
                </Text>
              </Box>
            </Box>

            <Box>
              <Heading level={2}>Allowed Focus GAPs</Heading>
              <Stack spacing={3} className="mt-4">
                <Box className="rounded-md border border-success/30 bg-success/10 p-sm">
                  <Text size="sm">
                    <strong>GAP-1:</strong> Popover Non-Modal - Focus can leave popover
                  </Text>
                </Box>
                <Box className="rounded-md border border-success/30 bg-success/10 p-sm">
                  <Text size="sm">
                    <strong>GAP-2:</strong> Toast Tab Order - Toast appears in tab order
                  </Text>
                </Box>
                <Box className="rounded-md border border-success/30 bg-success/10 p-sm">
                  <Text size="sm">
                    <strong>GAP-4:</strong> Stepper Read-Only - Steps not keyboard-navigable
                  </Text>
                </Box>
              </Stack>
            </Box>

            <Box className="rounded-lg border border-[hsl(var(--tm-destructive))]/30 bg-[hsl(var(--tm-destructive))]/10 p-md">
              <Heading level={3}>Excluded from Gallery</Heading>
              <Box className="mt-2">
                <Text size="sm">
                  <strong>GAP-3:</strong> Drawer focus-visible inconsistency is a known issue, not
                  an acceptable gap. It must be fixed before FOCUS_LOCK.
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
 * GAP-1: Popover Non-Modal
 * Focus can leave popover to page content
 */
export const GAP1_PopoverNonModal: Story = {
  name: "GAP-1: Popover Non-Modal",
  render: function PopoverNonModalStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>GAP-1: Popover Non-Modal Behavior</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Popover does NOT trap focus. This is intentional for non-modal overlays.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Button variant="outline">1. Button Before</Button>

              <PopoverWrapper
                content={
                  <Stack spacing={2} className="p-2">
                    <Text size="sm" weight="semibold">
                      Popover Content
                    </Text>
                    <Input placeholder="2. Input inside popover" />
                    <Button variant="outline" size="sm">
                      3. Button inside popover
                    </Button>
                    <Text size="xs" typographyRole="meta" color="muted">
                      Tab again to leave popover...
                    </Text>
                  </Stack>
                }
              >
                <Button variant="primary">Open Popover (then Tab through)</Button>
              </PopoverWrapper>

              <Button variant="outline">4. Button After (reachable via Tab)</Button>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-success/30 bg-success/10 p-md">
            <Heading level={3}>Why This GAP is Acceptable</Heading>
            <Stack spacing={2} className="mt-2">
              <Text size="sm">
                - Popover is a <strong>non-modal</strong> overlay pattern by design
              </Text>
              <Text size="sm">- Non-modal overlays allow interaction with surrounding content</Text>
              <Text size="sm">- Focus trap would contradict the semantic purpose of Popover</Text>
              <Text size="sm">- Matches native HTML {"<details>/<summary>"} behavior</Text>
              <Text size="sm">- Radix Popover intentionally does not trap focus</Text>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-primary))]/30 bg-[hsl(var(--tm-primary))]/10 p-md">
            <Text size="sm">
              <strong>User Impact:</strong> Users can Tab away from open Popover. Popover remains
              open until explicitly dismissed (click outside, Escape key).
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * GAP-2: Toast Tab Order
 * Toast appears in tab order when active
 */
export const GAP2_ToastTabOrder: Story = {
  name: "GAP-2: Toast Tab Order",
  render: function ToastTabOrderStory() {
    const [showToast, setShowToast] = useState(false);

    return (
      <ToastProvider>
        <Box className="p-lg">
          <Stack spacing={6}>
            <Box>
              <Heading level={2}>GAP-2: Toast Tab Order Insertion</Heading>
              <Box className="mt-2">
                <Text typographyRole="meta" color="muted">
                  When Toast appears, its interactive elements enter the tab order.
                </Text>
              </Box>
            </Box>

            <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
              <Stack spacing={4}>
                <Button variant="outline">1. Button Before</Button>

                <Button variant="primary" onClick={() => setShowToast(true)}>
                  2. Show Toast (then Tab)
                </Button>

                <Button variant="outline">3. Button After</Button>
              </Stack>
            </Box>

            <Toast open={showToast} onOpenChange={setShowToast} variant="default">
              <Box className="grid gap-1">
                <ToastTitle>Toast Notification</ToastTitle>
                <ToastDescription>This toast is now in the tab order.</ToastDescription>
              </Box>
              <ToastAction altText="Dismiss">Action</ToastAction>
              <ToastClose />
            </Toast>

            <Box className="rounded-lg border border-success/30 bg-success/10 p-md">
              <Heading level={3}>Why This GAP is Acceptable</Heading>
              <Stack spacing={2} className="mt-2">
                <Text size="sm">
                  - Toast notifications appear asynchronously and must be accessible
                </Text>
                <Text size="sm">- Inserting into DOM necessarily affects tab order</Text>
                <Text size="sm">- Removing Toast from tab order would make it inaccessible</Text>
                <Text size="sm">- Current behavior matches OS-level notification patterns</Text>
                <Text size="sm">- WAI-ARIA recommends allowing keyboard access to alerts</Text>
              </Stack>
            </Box>

            <Box className="rounded-lg border border-[hsl(var(--tm-primary))]/30 bg-[hsl(var(--tm-primary))]/10 p-md">
              <Text size="sm">
                <strong>User Impact:</strong> Users may encounter Toast unexpectedly in tab order.
                Toast is dismissible via action button, close button, or auto-dismiss.
              </Text>
            </Box>
          </Stack>
        </Box>
        <ToastViewport />
      </ToastProvider>
    );
  },
};

/**
 * GAP-4: Stepper Non-Interactive
 * Step indicators are not keyboard-navigable
 */
export const GAP4_StepperReadOnly: Story = {
  name: "GAP-4: Stepper Read-Only",
  render: function StepperReadOnlyStory() {
    const [activeStep, setActiveStep] = useState(1);

    const steps = [
      { id: "step1", label: "Step 1", description: "Account details" },
      { id: "step2", label: "Step 2", description: "Personal info" },
      { id: "step3", label: "Step 3", description: "Confirmation" },
    ];

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>GAP-4: Stepper Non-Interactive Steps</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Step indicators are read-only. Tab skips over them.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Button variant="outline">Button Before Stepper</Button>

              <Box className="py-4">
                <Stepper steps={steps} activeStep={activeStep} />
              </Box>

              <Text size="sm" typographyRole="meta" color="muted">
                Notice: Tab jumps from "Button Before" directly to buttons below. Step indicators
                (circles) are not in tab order.
              </Text>

              <Box className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                >
                  Previous
                </Button>
                <Button
                  variant="primary"
                  onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                  disabled={activeStep === steps.length - 1}
                >
                  Next
                </Button>
              </Box>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-success/30 bg-success/10 p-md">
            <Heading level={3}>Why This GAP is Acceptable</Heading>
            <Stack spacing={2} className="mt-2">
              <Text size="sm">
                - Stepper is a <strong>read-only progress indicator</strong>
              </Text>
              <Text size="sm">- Steps represent state, not interactive controls</Text>
              <Text size="sm">
                - Navigation is handled by external controls (Next/Prev buttons)
              </Text>
              <Text size="sm">- Adding interactivity would change Stepper's semantic purpose</Text>
              <Text size="sm">- Active step is announced via aria-current="step"</Text>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-primary))]/30 bg-[hsl(var(--tm-primary))]/10 p-md">
            <Text size="sm">
              <strong>User Impact:</strong> Users cannot Tab to step indicators. Step state is
              communicated via visual indicators and aria-current attribute for screen readers.
            </Text>
          </Box>

          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Text size="sm">
              <strong>Alternative Pattern:</strong> If interactive step navigation is needed, use a
              different component pattern (e.g., TabNav, Wizard).
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Summary - All GAPs at a glance
 */
export const Summary: Story = {
  name: "Summary",
  render: function SummaryStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Focus GAP Summary</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                All ACCEPTABLE Focus GAPs in the Tenerife UI design system.
              </Text>
            </Box>
          </Box>

          <Box className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-[hsl(var(--tm-border-default))]">
                  <th className="px-4 py-2 text-left font-semibold">GAP ID</th>
                  <th className="px-4 py-2 text-left font-semibold">Component</th>
                  <th className="px-4 py-2 text-left font-semibold">Description</th>
                  <th className="px-4 py-2 text-left font-semibold">Classification</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[hsl(var(--tm-border-default))]/50">
                  <td className="px-4 py-2 font-mono">GAP-1</td>
                  <td className="px-4 py-2">Popover</td>
                  <td className="px-4 py-2">Focus can leave popover (non-modal)</td>
                  <td className="px-4 py-2">
                    <span className="rounded bg-success/20 px-2 py-0.5 text-success">
                      ACCEPTABLE
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-[hsl(var(--tm-border-default))]/50">
                  <td className="px-4 py-2 font-mono">GAP-2</td>
                  <td className="px-4 py-2">Toast</td>
                  <td className="px-4 py-2">Toast appears in tab order</td>
                  <td className="px-4 py-2">
                    <span className="rounded bg-success/20 px-2 py-0.5 text-success">
                      ACCEPTABLE
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-[hsl(var(--tm-border-default))]/50">
                  <td className="px-4 py-2 font-mono">GAP-3</td>
                  <td className="px-4 py-2">Drawer</td>
                  <td className="px-4 py-2">Focus-visible inconsistency</td>
                  <td className="px-4 py-2">
                    <span className="rounded bg-[hsl(var(--tm-destructive))]/20 px-2 py-0.5 text-destructive">
                      KNOWN ISSUE
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-mono">GAP-4</td>
                  <td className="px-4 py-2">Stepper</td>
                  <td className="px-4 py-2">Steps not keyboard-navigable</td>
                  <td className="px-4 py-2">
                    <span className="rounded bg-success/20 px-2 py-0.5 text-success">
                      ACCEPTABLE
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-primary))]/30 bg-[hsl(var(--tm-primary))]/10 p-md">
            <Text size="sm">
              <strong>Reference:</strong> See{" "}
              <a
                href="../../../../docs/reports/audit/FOCUS_GAPS.md"
                className="text-[hsl(var(--tm-primary))] underline"
              >
                FOCUS_GAPS.md
              </a>{" "}
              for complete classification details and rationale.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};
