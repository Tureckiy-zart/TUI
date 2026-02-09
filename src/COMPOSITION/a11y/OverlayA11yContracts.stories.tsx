/**
 * Overlay A11Y Contracts
 *
 * Demonstrates accessibility contracts for overlay components (Modal, Dialog, Drawer).
 * Shows proper labeling, Escape key behavior, and focus management expectations.
 *
 * Reference: docs/architecture/A11Y_AUTHORITY.md
 * Focus mechanics: docs/architecture/FOCUS_AUTHORITY.md
 */
"use client";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Box, Stack } from "@/COMPOSITION/layout";
import { Drawer } from "@/COMPOSITION/overlays";
import { Dialog } from "@/COMPOSITION/overlays/Dialog";
import { Modal } from "@/COMPOSITION/overlays/Modal";
import { Button } from "@/PRIMITIVES/Button";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";

const meta: Meta = {
  title: "Composition / A11Y / Overlay Contracts",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
          Overlay A11Y Contracts - Accessibility expectations for overlays.
          
          **Key Requirements:**
          - Modal overlays MUST have accessible names (aria-labelledby via title)
          - Modal overlays MUST use aria-modal="true"
          - Escape key MUST close overlays
          - Focus trap MUST be implemented (see Focus stories)
          - Focus restore MUST happen on close (see Focus stories)
          
          **Testing Instructions:**
          1. Open overlay with trigger button
          2. Verify focus moves to overlay content
          3. Press Escape to close
          4. Verify focus returns to trigger
          5. Test with screen reader (verify aria-labelledby announcement)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Modal Labeling Contract
 */
export const ModalLabeling: Story = {
  render: function ModalLabelingStory() {
    const [open, setOpen] = useState(false);
    const titleId = "modal-title-demo";
    const descriptionId = "modal-desc-demo";

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Modal Labeling Contract</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Modal overlays MUST have accessible names via aria-labelledby (wired to
                Modal.Title).
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Button variant="primary" onClick={() => setOpen(true)}>
                Open Modal
              </Button>

              <Modal.Root open={open} onOpenChange={setOpen}>
                <Modal.Content aria-labelledby={titleId} aria-describedby={descriptionId}>
                  <Modal.Header>
                    <Modal.Title id={titleId}>Confirm Action</Modal.Title>
                    <Modal.Description id={descriptionId}>
                      This action cannot be undone. Are you sure you want to continue?
                    </Modal.Description>
                  </Modal.Header>
                  <Box className="p-md">
                    <Text>Modal content goes here.</Text>
                  </Box>
                  <Modal.Footer>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button variant="primary" onClick={() => setOpen(false)}>
                      Confirm
                    </Button>
                  </Modal.Footer>
                </Modal.Content>
              </Modal.Root>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Text size="sm">
              <strong>Rule O-1:</strong> Modal overlays MUST have accessible names. Use
              aria-labelledby wired to Modal.Title.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Dialog Labeling Contract
 */
export const DialogLabeling: Story = {
  render: function DialogLabelingStory() {
    const [open, setOpen] = useState(false);

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Dialog Labeling Contract</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Dialog component provides automatic aria-labelledby/aria-describedby wiring via
                Dialog.Title and Dialog.Description.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Button variant="primary" onClick={() => setOpen(true)}>
                Open Dialog
              </Button>

              <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Header>
                  <Dialog.Title>Delete Item</Dialog.Title>
                  <Dialog.Description>
                    This will permanently delete this item. This action cannot be undone.
                  </Dialog.Description>
                </Dialog.Header>
                <Dialog.Body>
                  <Text>Are you sure you want to delete this item?</Text>
                </Dialog.Body>
                <Dialog.Footer>
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={() => setOpen(false)}>
                    Delete
                  </Button>
                </Dialog.Footer>
              </Dialog.Root>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Text size="sm">
              <strong>Rule O-4:</strong> Dialog automatically wires title/description for
              aria-labelledby/aria-describedby. No manual wiring needed.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Escape Key Contract
 */
export const EscapeKeyContract: Story = {
  name: "Escape Key",
  render: function EscapeKeyContractStory() {
    const [modalOpen, setModalOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Escape Key Contract</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Escape key MUST close overlays (Modal, Dialog, Drawer, Popover, Tooltip).
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    Modal (Radix handles Escape):
                  </Text>
                </Box>
                <Button variant="primary" onClick={() => setModalOpen(true)}>
                  Open Modal (Press Escape to close)
                </Button>
                <Modal.Root open={modalOpen} onOpenChange={setModalOpen}>
                  <Modal.Content aria-labelledby="escape-modal-title">
                    <Modal.Header>
                      <Modal.Title id="escape-modal-title">Modal Title</Modal.Title>
                    </Modal.Header>
                    <Box className="p-md">
                      <Text>Press Escape to close this modal.</Text>
                    </Box>
                  </Modal.Content>
                </Modal.Root>
              </Box>

              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    Drawer (Custom Escape handler):
                  </Text>
                </Box>
                <Button variant="primary" onClick={() => setDrawerOpen(true)}>
                  Open Drawer (Press Escape to close)
                </Button>
                <Drawer
                  open={drawerOpen}
                  onClose={() => setDrawerOpen(false)}
                  titleId="drawer-title"
                >
                  <Drawer.Header>
                    <Heading level={3} id="drawer-title">
                      Drawer Title
                    </Heading>
                  </Drawer.Header>
                  <Drawer.Body>
                    <Text>Press Escape to close this drawer.</Text>
                  </Drawer.Body>
                </Drawer>
              </Box>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Text size="sm">
              <strong>Rule K-4:</strong> Escape MUST close overlays. Radix handles this
              automatically. Custom implementations must handle Escape key.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};

/**
 * Focus Management Reference
 */
export const FocusManagementReference: Story = {
  name: "Focus Management",
  render: function FocusManagementReferenceStory() {
    return (
      <Box className="p-lg">
        <Stack spacing={6}>
          <Box>
            <Heading level={2}>Focus Management</Heading>
            <Box className="mt-2">
              <Text typographyRole="meta" color="muted">
                Focus trap and restore mechanics are governed by FOCUS_AUTHORITY. See Focus stories
                for detailed demonstrations.
              </Text>
            </Box>
          </Box>

          <Box className="rounded-lg border border-[hsl(var(--tm-border-default))] p-md">
            <Stack spacing={4}>
              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    Focus Requirements:
                  </Text>
                </Box>
                <Stack spacing={2} className="list-inside list-disc">
                  <Text size="sm">- Focus trap MUST be implemented for modal overlays</Text>
                  <Text size="sm">- Focus MUST move to first interactive element on open</Text>
                  <Text size="sm">- Focus MUST restore to trigger element on close</Text>
                  <Text size="sm">- Tab/Shift+Tab MUST cycle within trap boundary</Text>
                </Stack>
              </Box>

              <Box>
                <Box className="mb-2">
                  <Text size="sm" weight="semibold">
                    Reference Stories:
                  </Text>
                </Box>
                <Text size="sm">
                  See{" "}
                  <code className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5">
                    UI / Composition / Motion / Focus / Focus Trap And Restore
                  </code>{" "}
                  for detailed focus trap and restore demonstrations.
                </Text>
              </Box>
            </Stack>
          </Box>

          <Box className="rounded-lg border border-warning/30 bg-warning/10 p-md">
            <Text size="sm">
              <strong>Reference:</strong> Focus navigation mechanics are defined in{" "}
              <a
                href="../../../../docs/architecture/FOCUS_AUTHORITY.md"
                className="text-[hsl(var(--tm-primary))] underline"
              >
                FOCUS_AUTHORITY.md
              </a>
              . This A11Y Authority handles semantic roles and accessible names only.
            </Text>
          </Box>
        </Stack>
      </Box>
    );
  },
};
