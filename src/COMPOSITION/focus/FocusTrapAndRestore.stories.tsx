/**
 * Focus Trap and Restore - Governance Showcase
 *
 * Demonstrates focus trap and focus restore behavior for modal overlays.
 * These are mandatory behaviors for Modal, Dialog, Drawer components.
 *
 * Reference: docs/architecture/FOCUS_AUTHORITY.md (Rules F-TRAP-*, F-REST-*)
 */
"use client";
import type { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";

import { Box, Stack } from "@/COMPOSITION/layout";
import { Dialog } from "@/COMPOSITION/overlays/Dialog";
import { Drawer } from "@/COMPOSITION/overlays/Drawer";
import { Modal } from "@/COMPOSITION/overlays/Modal";
import { PopoverWrapper } from "@/COMPOSITION/overlays/Popover";
import { Button } from "@/PRIMITIVES/Button";
import { Heading } from "@/PRIMITIVES/Heading";
import { Input } from "@/PRIMITIVES/Input";
import { Text } from "@/PRIMITIVES/Text";

const meta: Meta = {
  title: "UI / Composition / Motion / Focus / Trap and Restore",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
          Focus Trap and Restore - Demonstrates mandatory overlay behaviors.
          
          **Focus Trap (Rule F-TRAP-1):** Modal overlays MUST trap focus.
          - Tab/Shift+Tab cycle within the overlay boundary
          - Focus cannot escape to page content behind overlay
          
          **Focus Restore (Rule F-REST-1):** Modal overlays MUST restore focus on close.
          - Focus returns to the trigger element that opened the overlay
          - Restore happens synchronously after close
          
          **Testing Instructions:**
          1. Click a button to open overlay
          2. Press Tab repeatedly - focus should cycle inside overlay
          3. Press Escape or click close - focus returns to trigger button
          
          **Reference:** See [Focus Authority Contract](../../../../docs/architecture/FOCUS_AUTHORITY.md)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Modal Focus Trap
 * Demonstrates focus containment within Modal
 */
export const ModalFocusTrap: Story = {
  name: "Modal Focus Trap",
  render: function ModalFocusTrapStory() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Modal Focus Trap</Heading>
            <Box className="mt-2">
              <Text tone="muted">
                Open Modal and Tab through elements. Focus stays trapped inside.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-border p-md">
            <Stack spacing={4}>
              <Button variant="outline">Before Trigger (for Tab order)</Button>
              <Button variant="primary" onClick={() => setIsOpen(true)}>
                Open Modal (Focus Trap Demo)
              </Button>
              <Button variant="outline">After Trigger (cannot reach when modal open)</Button>
            </Stack>
          </Box>

          <Modal.Root open={isOpen} onOpenChange={setIsOpen}>
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Focus Trap Active</Modal.Title>
                <Modal.Description>
                  Tab cycles through these elements only. Cannot escape to page.
                </Modal.Description>
              </Modal.Header>
              <Stack spacing={3} className="py-4">
                <Input placeholder="First focusable" />
                <Input placeholder="Second focusable" />
                <Input placeholder="Third focusable" />
              </Stack>
              <Modal.Footer>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setIsOpen(false)}>
                  Confirm
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Root>

          <Box className="rounded-lg border border-success/30 bg-success/10 p-md">
            <Text size="sm">
              <strong>Rule F-TRAP-1:</strong> Modal overlays MUST trap focus. Radix Dialog
              automatically provides focus containment.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Focus Restore on Close
 * Demonstrates focus returning to trigger element
 */
export const FocusRestoreDemo: Story = {
  name: "Focus Restore",
  render: function FocusRestoreStory() {
    const [isOpen, setIsOpen] = useState(false);
    const [lastFocused, setLastFocused] = useState<string>("");

    const handleFocus = (e: React.FocusEvent) => {
      const target = e.target as HTMLElement;
      setLastFocused(target.textContent || target.tagName);
    };

    return (
      <Box className="p-lg" onFocus={handleFocus}>
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Focus Restore on Close</Heading>
            <Box className="mt-2">
              <Text tone="muted">After closing Modal, focus returns to the trigger button.</Text>
            </Box>
            <Box className="mt-1">
              <Text size="sm">
                Last focused: <strong>{lastFocused || "None"}</strong>
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-border p-md">
            <Stack spacing={4}>
              <Button variant="outline">Button A</Button>
              <Button variant="primary" onClick={() => setIsOpen(true)}>
                Button B - Modal Trigger (focus returns here)
              </Button>
              <Button variant="outline">Button C</Button>
            </Stack>
          </Box>

          <Modal.Root open={isOpen} onOpenChange={setIsOpen}>
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Focus Restore Test</Modal.Title>
                <Modal.Description>
                  Close this modal and observe focus return to "Button B".
                </Modal.Description>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Root>

          <Box className="rounded-lg border border-primary/30 bg-primary/10 p-md">
            <Text size="sm">
              <strong>Rule F-REST-1:</strong> Modal overlays MUST restore focus on close. Watch the
              "Last focused" indicator after closing the modal.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Dialog Focus Behavior
 * Same as Modal since Dialog wraps Modal
 */
export const DialogFocusBehavior: Story = {
  name: "Dialog Focus",
  render: function DialogFocusStory() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Dialog Focus Behavior</Heading>
            <Box className="mt-2">
              <Text tone="muted">
                Dialog uses Modal internally - same focus trap and restore behavior.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-border p-md">
            <Button variant="primary" onClick={() => setIsOpen(true)}>
              Open Dialog
            </Button>
          </Box>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Dialog.Header>
              <Dialog.Title>Dialog Title</Dialog.Title>
              <Dialog.Description>
                Focus is trapped here. Escape or click outside to close.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Body>
              <Stack spacing={3}>
                <Input placeholder="Field 1" />
                <Input placeholder="Field 2" />
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Save
              </Button>
            </Dialog.Footer>
          </Dialog>
        </Stack>
      </Box>
    );
  },
};

/**
 * Drawer Focus Behavior
 * Custom focus lock implementation with focus-visible compliance
 *
 * Demonstrates:
 * 1. Focus trap (Tab/Shift+Tab cycles within Drawer)
 * 2. Focus restore (focus returns to trigger on close)
 * 3. Focus-visible styling (keyboard-only focus rings)
 * 4. Container focus suppression (container does not show focus ring)
 *
 * Testing Instructions:
 * 1. Focus trigger button and press Enter/Space to open Drawer
 * 2. Verify first interactive element (Input) receives focus with visible ring
 * 3. Press Tab - verify focus moves to "Action Button" with visible ring
 * 4. Press Tab - verify focus moves to "Close Drawer" button with visible ring
 * 5. Press Tab again - verify focus wraps to Input (trap working)
 * 6. Press Shift+Tab - verify focus cycles backward
 * 7. Verify Drawer container does NOT show focus ring
 * 8. Press Escape or click Close - verify focus returns to trigger button
 */
export const DrawerFocusBehavior: Story = {
  name: "Drawer Focus",
  render: function DrawerFocusStory() {
    const [isOpen, setIsOpen] = useState(false);
    const triggerRef = useRef<HTMLElement>(null);

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Drawer Focus Behavior</Heading>
            <Box className="mt-2">
              <Text tone="muted">
                Drawer uses custom useFocusLock hook for focus management. Demonstrates focus trap,
                restore, and focus-visible compliance (GAP-3 fixed).
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-border p-md">
            <Button
              ref={triggerRef as React.RefObject<HTMLButtonElement>}
              variant="primary"
              onClick={() => setIsOpen(true)}
            >
              Open Drawer
            </Button>
          </Box>

          <Drawer
            open={isOpen}
            onClose={() => setIsOpen(false)}
            position="right"
            returnFocusRef={triggerRef as React.RefObject<HTMLElement>}
          >
            <Drawer.Header>
              <Heading level={3}>Drawer Title</Heading>
            </Drawer.Header>
            <Drawer.Body>
              <Stack spacing={3}>
                <Text>
                  Focus is trapped in this drawer. Tab through elements to verify focus-visible
                  rings.
                </Text>
                <Input placeholder="Input field (first focusable)" />
                <Button variant="outline">Action Button</Button>
              </Stack>
            </Drawer.Body>
            <Drawer.Footer>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Close Drawer
              </Button>
            </Drawer.Footer>
          </Drawer>

          <Box className="rounded-lg border border-success/30 bg-success/10 p-md">
            <Heading level={3}>Focus-Visible Compliance (GAP-3 Fixed)</Heading>
            <Stack spacing={2} className="mt-2">
              <Text size="sm">
                ✅ Interactive elements show focus ring when focused via keyboard
              </Text>
              <Text size="sm">
                ✅ Drawer container does NOT show focus ring (outline-none applied)
              </Text>
              <Text size="sm">✅ Focus trap cycles Tab/Shift+Tab within Drawer boundary</Text>
              <Text size="sm">✅ Focus restores to trigger button on close</Text>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-primary/30 bg-primary/10 p-md">
            <Text size="sm">
              <strong>Note:</strong> Drawer uses custom focus implementation (useFocusLock). Pass
              returnFocusRef prop to restore focus correctly. Container focus is programmatic only
              (tabindex=-1) and does not show visual focus indication.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Non-Modal Overlay (Popover)
 * Demonstrates that Popover does NOT trap focus (by design)
 */
export const PopoverNoTrap: Story = {
  name: "Popover (No Trap)",
  render: function PopoverNoTrapStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Popover - No Focus Trap (By Design)</Heading>
            <Box className="mt-2">
              <Text tone="muted">Popover is non-modal. Tab can leave popover to page content.</Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-border p-md">
            <Stack spacing={4}>
              <Button variant="outline">Button Before</Button>

              <PopoverWrapper
                content={
                  <Stack spacing={2} className="p-2">
                    <Text size="sm">Popover content</Text>
                    <Input placeholder="Type here" />
                    <Button variant="outline" size="sm">
                      Action
                    </Button>
                  </Stack>
                }
              >
                <Button variant="primary">Open Popover (Tab can leave)</Button>
              </PopoverWrapper>

              <Button variant="outline">Button After (reachable via Tab)</Button>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-primary/30 bg-primary/10 p-md">
            <Text size="sm">
              <strong>Rule F-TRAP-2:</strong> Non-modal overlays MUST NOT trap focus. This is an
              ACCEPTABLE Focus GAP - see FocusGAPGallery.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Escape Key Behavior
 * Demonstrates Escape closing overlays and restoring focus
 */
export const EscapeKeyBehavior: Story = {
  name: "Escape Key",
  render: function EscapeKeyStory() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Escape Key Behavior</Heading>
            <Box className="mt-2">
              <Text tone="muted">Press Escape to close overlay and restore focus to trigger.</Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-border p-md">
            <Button variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Modal (Press Escape to close)
            </Button>
          </Box>

          <Modal.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
            <Modal.Content>
              <Modal.Header>
                <Modal.Title>Press Escape</Modal.Title>
                <Modal.Description>
                  Press Escape key to close. Focus will return to trigger.
                </Modal.Description>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                  Or Click Close
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal.Root>

          <Box className="rounded-lg border border-success/30 bg-success/10 p-md">
            <Text size="sm">
              <strong>Escape key:</strong> Closes overlay and triggers focus restore. This is
              handled automatically by Radix primitives.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};
