/**
 * FocusTrap Component - Storybook Stories
 *
 * Demonstrates focus trap functionality for accessibility-critical components.
 */

"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";

import { Box, Stack } from "@/COMPOSITION/layout";
import { Button } from "@/PRIMITIVES/Button";
import { Heading } from "@/PRIMITIVES/Heading";
import { Input } from "@/PRIMITIVES/Input";
import { Text } from "@/PRIMITIVES/Text";

import { FocusTrap } from "./FocusTrap";

const meta: Meta<typeof FocusTrap> = {
  title: "UI / Composition / Focus / FocusTrap",
  component: FocusTrap,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
          FocusTrap - Reusable focus containment utility for accessibility-critical components.
          
          **Features:**
          - Traps focus within children subtree using Tab/Shift+Tab cycling
          - Supports initial focus via \`initialFocusRef\`
          - Restores focus on unmount/active=false (optional)
          - Supports Escape key callback (optional)
          - Supports loop mode (wrap Tab/Shift+Tab) or no-loop mode
          
          **Use Cases:**
          - Modal overlays (must trap focus)
          - Drawer overlays (must trap focus)
          - Menu dropdowns (may trap focus)
          - Dialog overlays (must trap focus)
          
          **Reference:** See [Focus Authority Contract](../../../../docs/architecture/FOCUS_AUTHORITY.md)
        `,
      },
    },
  },
  argTypes: {
    children: {
      description: "Child elements to trap focus within",
      control: false,
    },
    active: {
      description: "Whether focus trap is active",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    initialFocusRef: {
      description: "Ref to element that should receive initial focus",
      control: false,
      table: {
        type: { summary: "RefObject<HTMLElement>" },
      },
    },
    restoreFocus: {
      description: "Whether to restore focus to previous element on unmount/active=false",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    loop: {
      description: "Whether to loop focus (wrap from last to first and vice versa)",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    onEscape: {
      description: "Callback triggered when Escape key is pressed",
      control: false,
      table: {
        type: { summary: "() => void" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FocusTrap>;

/**
 * Default story - Basic focus trap usage
 */
export const Default: Story = {
  name: "Default",
  render: function DefaultStory() {
    return (
      <Box p={4} border="1px solid" borderColor="border">
        <Stack gap={4}>
          <Heading level={3}>Focus Trap Demo</Heading>
          <Text size="sm">
            Press Tab to cycle through focusable elements. Focus stays trapped within the box.
          </Text>
          <FocusTrap>
            <Stack gap={2}>
              <Input placeholder="First input" />
              <Input placeholder="Second input" />
              <Button>First Button</Button>
              <Button>Second Button</Button>
            </Stack>
          </FocusTrap>
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Basic focus trap usage. Tab/Shift+Tab cycles focus within the trapped area.",
      },
    },
  },
};

/**
 * States story - Demonstrates active/inactive states
 */
export const States: Story = {
  name: "States",
  render: function StatesStory() {
    const [active, setActive] = useState(true);

    return (
      <Box p={4} border="1px solid" borderColor="border">
        <Stack gap={4}>
          <Heading level={3}>Focus Trap States</Heading>
          <Text size="sm">
            Toggle focus trap active/inactive. When inactive, focus can escape the trapped area.
          </Text>
          <Button onClick={() => setActive(!active)}>
            {active ? "Deactivate Focus Trap" : "Activate Focus Trap"}
          </Button>
          <FocusTrap active={active}>
            <Stack gap={2}>
              <Input placeholder="Trapped input 1" />
              <Input placeholder="Trapped input 2" />
              <Button>Trapped Button</Button>
            </Stack>
          </FocusTrap>
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates active/inactive states. When inactive, focus trap is disabled.",
      },
    },
  },
};

/**
 * Use case: FocusTrap with initial focus
 */
export const WithInitialFocus: Story = {
  name: "With Initial Focus",
  render: function WithInitialFocusStory() {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
      <Box p={4} border="1px solid" borderColor="border">
        <Stack gap={4}>
          <Heading level={3}>Initial Focus</Heading>
          <Text size="sm">
            Focus trap with initial focus set to a specific element. The second input receives focus
            when trap activates.
          </Text>
          <FocusTrap initialFocusRef={inputRef}>
            <Stack gap={2}>
              <Input placeholder="First input (not focused)" />
              <Input ref={inputRef} placeholder="Second input (focused initially)" />
              <Button>Button</Button>
            </Stack>
          </FocusTrap>
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates initial focus via initialFocusRef prop.",
      },
    },
  },
};

/**
 * Use case: FocusTrap with Escape handler
 */
export const WithEscapeHandler: Story = {
  name: "With Escape Handler",
  render: function WithEscapeHandlerStory() {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen) {
      return (
        <Box p={4} border="1px solid" borderColor="border">
          <Stack gap={4}>
            <Heading level={3}>Focus Trap Closed</Heading>
            <Button onClick={() => setIsOpen(true)}>Open Focus Trap</Button>
          </Stack>
        </Box>
      );
    }

    return (
      <Box p={4} border="1px solid" borderColor="border">
        <Stack gap={4}>
          <Heading level={3}>Focus Trap with Escape</Heading>
          <Text size="sm">Press Escape to close the focus trap.</Text>
          <FocusTrap onEscape={() => setIsOpen(false)}>
            <Stack gap={2}>
              <Input placeholder="Input 1" />
              <Input placeholder="Input 2" />
              <Button onClick={() => setIsOpen(false)}>Close</Button>
            </Stack>
          </FocusTrap>
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates Escape key handling via onEscape callback.",
      },
    },
  },
};

/**
 * Use case: FocusTrap without loop
 */
export const WithoutLoop: Story = {
  name: "Without Loop",
  render: function WithoutLoopStory() {
    return (
      <Box p={4} border="1px solid" borderColor="border">
        <Stack gap={4}>
          <Heading level={3}>Focus Trap Without Loop</Heading>
          <Text size="sm">
            Focus trap with loop disabled. Tab/Shift+Tab does not wrap (stays at first/last
            element).
          </Text>
          <FocusTrap loop={false}>
            <Stack gap={2}>
              <Input placeholder="First input" />
              <Input placeholder="Second input" />
              <Button>Button</Button>
            </Stack>
          </FocusTrap>
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates focus trap without loop mode. Tab/Shift+Tab does not wrap.",
      },
    },
  },
};

/**
 * Use case: FocusTrap in Modal-like scenario
 */
export const ModalScenario: Story = {
  name: "Modal Scenario",
  render: function ModalScenarioStory() {
    const [isOpen, setIsOpen] = useState(false);
    const closeButtonRef = useRef<HTMLButtonElement>(null);

    return (
      <Box p={4} border="1px solid" borderColor="border">
        <Stack gap={4}>
          <Heading level={3}>Modal-like Scenario</Heading>
          <Text size="sm">
            Demonstrates FocusTrap usage in a modal-like scenario with backdrop and close button.
          </Text>
          <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

          {isOpen && (
            <Box
              position="fixed"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bg="overlay"
              display="flex"
              alignItems="center"
              justifyContent="center"
              zIndex={50}
            >
              <Box
                p={6}
                bg="bg"
                border="1px solid"
                borderColor="border"
                borderRadius="md"
                minWidth="400px"
              >
                <FocusTrap initialFocusRef={closeButtonRef} onEscape={() => setIsOpen(false)}>
                  <Stack gap={4}>
                    <Heading level={2}>Modal Title</Heading>
                    <Text>This is a modal-like scenario using FocusTrap.</Text>
                    <Stack gap={2}>
                      <Input placeholder="Input 1" />
                      <Input placeholder="Input 2" />
                    </Stack>
                    <Stack direction="row" gap={2} justifyContent="flex-end">
                      <Button variant="outline" onClick={() => setIsOpen(false)}>
                        Cancel
                      </Button>
                      <Button ref={closeButtonRef} onClick={() => setIsOpen(false)}>
                        Confirm
                      </Button>
                    </Stack>
                  </Stack>
                </FocusTrap>
              </Box>
            </Box>
          )}
        </Stack>
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates FocusTrap usage in a modal-like scenario with backdrop, initial focus, and Escape handler.",
      },
    },
  },
};
