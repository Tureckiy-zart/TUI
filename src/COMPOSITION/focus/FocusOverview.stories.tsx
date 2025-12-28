/**
 * Focus Overview - Governance Showcase
 *
 * Demonstrates keyboard-only navigation patterns across the design system.
 * This story serves as the canonical reference for understanding focus behavior.
 *
 * Reference: docs/architecture/FOCUS_AUTHORITY.md
 */
"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Box, Stack } from "@/COMPOSITION/layout";
import { Modal } from "@/COMPOSITION/overlays/Modal";
import { Button } from "@/PRIMITIVES/Button";
import { Checkbox } from "@/PRIMITIVES/Checkbox";
import { Heading } from "@/PRIMITIVES/Heading";
import { Input } from "@/PRIMITIVES/Input";
import { Label } from "@/PRIMITIVES/Label";
import { Link } from "@/PRIMITIVES/Link";
import { Text } from "@/PRIMITIVES/Text";

const meta: Meta = {
  title: "UI / Composition / Motion / Focus / Overview",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
          Focus Overview - Visual demonstration of keyboard navigation patterns.
          
          **Key Principles:**
          - Focus is navigation, not visual styling
          - Every focus behavior must be intentional, observable, and testable
          - DOM order = navigation order (no positive tabindex)
          
          **Testing Instructions:**
          1. Click in the story area
          2. Press Tab to navigate forward
          3. Press Shift+Tab to navigate backward
          4. Observe focus ring on each element
          
          **Reference:** See [Focus Authority Contract](../../../../docs/architecture/FOCUS_AUTHORITY.md)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Tab Order Demo
 * Demonstrates DOM order = navigation order principle
 */
export const TabOrderDemo: Story = {
  name: "Tab Order",
  render: function TabOrderDemoStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Tab Order Demonstration</Heading>
            <Box className="mt-2">
              <Text tone="muted">
                Press Tab to navigate. Focus should follow DOM order (1 → 2 → 3 → 4 → 5).
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-border p-md">
            <Stack spacing={4}>
              <Button variant="primary">1. First Button</Button>
              <Input placeholder="2. Text Input" />
              <Link href="#" variant="primary">
                3. Link
              </Link>
              <Box className="flex items-center gap-2">
                <Checkbox id="demo-check" aria-labelledby="demo-check-label" />
                <Label id="demo-check-label" htmlFor="demo-check">
                  4. Checkbox
                </Label>
              </Box>
              <Button variant="outline">5. Last Button</Button>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Text size="sm">
              <strong>Rule T-ORD-1:</strong> DOM order = navigation order. Visual reordering via CSS
              MUST NOT change logical tab order.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Focus Visible Demo
 * Demonstrates :focus-visible vs :focus behavior
 */
export const FocusVisibleDemo: Story = {
  name: "Focus Visible",
  render: function FocusVisibleDemoStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Focus-Visible Demonstration</Heading>
            <Box className="mt-2">
              <Text tone="muted">Focus rings appear on keyboard navigation, not mouse clicks.</Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-border p-md">
            <Stack spacing={4}>
              <Box className="mb-2">
                <Text size="sm" weight="semibold">
                  Try both interactions:
                </Text>
              </Box>
              <Button variant="primary" data-testid="focus-visible-test-button">
                Click me (no ring) → then Tab (ring appears)
              </Button>
              <Button variant="secondary">Another Button</Button>
              <Button variant="outline">Third Button</Button>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-success/30 bg-success/10 p-md">
            <Text size="sm">
              <strong>Rule F-VIS-1:</strong> Use :focus-visible exclusively for focus rings. Mouse
              clicks should NOT show focus rings.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Roving Tabindex Demo
 * Demonstrates composite control keyboard navigation
 */
export const RovingTabindexDemo: Story = {
  name: "Roving Tabindex",
  render: function RovingTabindexDemoStory() {
    const [selected, setSelected] = useState(0);
    const items = ["Tab 1", "Tab 2", "Tab 3", "Tab 4"];

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setSelected((index + 1) % items.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSelected((index - 1 + items.length) % items.length);
      }
    };

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Roving Tabindex Demonstration</Heading>
            <Box className="mt-2">
              <Text tone="muted">
                Tab enters the group → Arrow keys navigate → Tab exits the group.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-border p-md">
            <Stack spacing={4}>
              <Button variant="outline">Before Tab Group</Button>

              <Box
                role="tablist"
                aria-label="Demo tabs"
                className="flex gap-2 rounded-md bg-muted p-1"
              >
                {items.map((item, index) => (
                  <button
                    key={item}
                    role="tab"
                    aria-selected={selected === index}
                    tabIndex={selected === index ? 0 : -1}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onClick={() => setSelected(index)}
                    className={`rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      selected === index
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:bg-background/50"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </Box>

              <Button variant="outline">After Tab Group</Button>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-primary/30 bg-primary/10 p-md">
            <Text size="sm">
              <strong>Rule T-ORD-3:</strong> Composite controls MUST use roving tabindex. Selected
              item has tabindex=0, others have tabindex=-1. Arrow keys move focus.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Interactive Element Requirements
 * Demonstrates keyboard parity requirements
 */
export const KeyboardParityDemo: Story = {
  name: "Keyboard Parity",
  render: function KeyboardParityDemoStory() {
    const [clickCount, setClickCount] = useState(0);

    // Bad example: div with only onClick
    const BadExample = () => (
      <div
        onClick={() => setClickCount((c) => c + 1)}
        className="cursor-pointer rounded-md bg-destructive/20 px-4 py-2 text-destructive"
      >
        ❌ BAD: div with onClick only (not focusable)
      </div>
    );

    // Good example: div with keyboard parity
    const GoodExample = () => (
      <div
        role="button"
        tabIndex={0}
        onClick={() => setClickCount((c) => c + 1)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setClickCount((c) => c + 1);
          }
        }}
        className="cursor-pointer rounded-md bg-success/20 px-4 py-2 text-success focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        ✅ GOOD: div with role, tabIndex, and keyboard handler
      </div>
    );

    // Best example: use button
    const BestExample = () => (
      <Button variant="primary" onClick={() => setClickCount((c) => c + 1)}>
        ✅ BEST: Use semantic button element
      </Button>
    );

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Keyboard Parity Requirements</Heading>
            <Box className="mt-2">
              <Text tone="muted">
                Interactive elements MUST be keyboard accessible. Click count: {clickCount}
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-border p-md">
            <Stack spacing={4}>
              <BadExample />
              <GoodExample />
              <BestExample />
            </Stack>
          </Box>

          <Box className="rounded-lg border border-destructive/30 bg-destructive/10 p-md">
            <Text size="sm">
              <strong>Forbidden Pattern:</strong> Interactive div/span without keyboard parity
              (tabindex, role, onKeyDown). Always prefer semantic HTML elements.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Complete Navigation Example
 * Full page with multiple focus regions
 */
export const CompleteNavigationDemo: Story = {
  name: "Complete Navigation",
  render: function CompleteNavigationDemoStory() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Complete Navigation Example</Heading>
            <Box className="mt-2">
              <Text tone="muted">
                Navigate through multiple sections using Tab. Modal demonstrates focus trap.
              </Text>
            </Box>
          </Box>

          {/* Navigation Section */}
          <Box
            as="nav"
            aria-label="Demo navigation"
            className="rounded-lg border border-border p-md"
          >
            <Box className="mb-2">
              <Text size="sm" weight="semibold">
                Navigation
              </Text>
            </Box>
            <Box className="flex gap-2">
              <Link href="#home">Home</Link>
              <Link href="#about">About</Link>
              <Link href="#contact">Contact</Link>
            </Box>
          </Box>

          {/* Form Section */}
          <Box className="rounded-lg border border-border p-md">
            <Box className="mb-2">
              <Text size="sm" weight="semibold">
                Form Section
              </Text>
            </Box>
            <Stack spacing={3}>
              <Input placeholder="Name" />
              <Input placeholder="Email" type="email" />
              <Box className="flex items-center gap-2">
                <Checkbox id="terms" aria-labelledby="terms-label" />
                <Label id="terms-label" htmlFor="terms">
                  Accept terms
                </Label>
              </Box>
            </Stack>
          </Box>

          {/* Actions Section */}
          <Box className="rounded-lg border border-border p-md">
            <Box className="mb-2">
              <Text size="sm" weight="semibold">
                Actions
              </Text>
            </Box>
            <Box className="flex gap-2">
              <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                Open Modal
              </Button>
              <Button variant="primary">Submit</Button>
            </Box>
          </Box>

          {/* Modal */}
          <Modal.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Focus Trap Demo</Modal.Title>
                <Modal.Description>
                  Focus is trapped inside this modal. Tab cycles through buttons.
                </Modal.Description>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Root>
        </Stack>
      </Box>
    );
  },
};
