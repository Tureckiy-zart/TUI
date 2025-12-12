"use client";

import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";

import { Modal } from "./Modal";

const meta: Meta<typeof Modal.Root> = {
  title: "UI/Foundation/Modal",
  component: Modal.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Modal component built on Radix Dialog for modal dialogs. Supports sizes (sm, md, lg, xl, fullscreen), token-based visual props, keyboard navigation, focus trap, and full ARIA support. All behavior is handled by Radix Dialog; Tenerife UI provides visual styling through tokens only.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: { type: "boolean" },
      description: "Controlled open state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "undefined" },
      },
    },
    defaultOpen: {
      control: { type: "boolean" },
      description: "Default open state (uncontrolled)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    modal: {
      control: { type: "boolean" },
      description: "Whether the dialog is modal (blocks interaction with other elements)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal.Root>;

/**
 * Default Modal usage with default tokens (md size)
 */
export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Modal.Root open={open} onOpenChange={setOpen}>
          <Modal.Trigger className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Open Modal
          </Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Modal Title</Modal.Title>
              <Modal.Description>This is a modal description.</Modal.Description>
            </Modal.Header>
            <div className="py-4">
              <p>This is the modal content. You can put any content here.</p>
            </div>
            <Modal.Footer>
              <button
                className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
                onClick={() => setOpen(false)}
              >
                Confirm
              </button>
            </Modal.Footer>
            <Modal.Close />
          </Modal.Content>
        </Modal.Root>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic Modal usage with default tokens (md size). The close button (X icon) in the top-right corner is provided by `<Modal.Close />`. Footer buttons use regular onClick handlers to close the modal.",
      },
    },
  },
};

/**
 * All available size variants (sm, md, lg, xl, fullscreen)
 */
export const Sizes: Story = {
  render: () => {
    const [openSm, setOpenSm] = React.useState(false);
    const [openMd, setOpenMd] = React.useState(false);
    const [openLg, setOpenLg] = React.useState(false);
    const [openXl, setOpenXl] = React.useState(false);
    const [openFullscreen, setOpenFullscreen] = React.useState(false);

    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <Modal.Root open={openSm} onOpenChange={setOpenSm}>
            <Modal.Trigger className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
              Small (sm)
            </Modal.Trigger>
            <Modal.Content size="sm">
              <Modal.Header>
                <Modal.Title>Small Modal</Modal.Title>
                <Modal.Description>This is a small modal (sm size).</Modal.Description>
              </Modal.Header>
              <div className="py-4">
                <p>Small modal content.</p>
              </div>
              <Modal.Footer>
                <button
                  className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                  onClick={() => setOpenSm(false)}
                >
                  Close
                </button>
              </Modal.Footer>
              <Modal.Close />
            </Modal.Content>
          </Modal.Root>

          <Modal.Root open={openMd} onOpenChange={setOpenMd}>
            <Modal.Trigger className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
              Medium (md)
            </Modal.Trigger>
            <Modal.Content size="md">
              <Modal.Header>
                <Modal.Title>Medium Modal</Modal.Title>
                <Modal.Description>This is a medium modal (md size).</Modal.Description>
              </Modal.Header>
              <div className="py-4">
                <p>Medium modal content.</p>
              </div>
              <Modal.Footer>
                <button
                  className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                  onClick={() => setOpenSm(false)}
                >
                  Close
                </button>
              </Modal.Footer>
              <Modal.Close />
            </Modal.Content>
          </Modal.Root>

          <Modal.Root open={openLg} onOpenChange={setOpenLg}>
            <Modal.Trigger className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
              Large (lg)
            </Modal.Trigger>
            <Modal.Content size="lg">
              <Modal.Header>
                <Modal.Title>Large Modal</Modal.Title>
                <Modal.Description>This is a large modal (lg size).</Modal.Description>
              </Modal.Header>
              <div className="py-4">
                <p>Large modal content.</p>
              </div>
              <Modal.Footer>
                <button
                  className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                  onClick={() => setOpenSm(false)}
                >
                  Close
                </button>
              </Modal.Footer>
              <Modal.Close />
            </Modal.Content>
          </Modal.Root>

          <Modal.Root open={openXl} onOpenChange={setOpenXl}>
            <Modal.Trigger className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
              Extra Large (xl)
            </Modal.Trigger>
            <Modal.Content size="xl">
              <Modal.Header>
                <Modal.Title>Extra Large Modal</Modal.Title>
                <Modal.Description>This is an extra large modal (xl size).</Modal.Description>
              </Modal.Header>
              <div className="py-4">
                <p>Extra large modal content.</p>
              </div>
              <Modal.Footer>
                <button
                  className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                  onClick={() => setOpenSm(false)}
                >
                  Close
                </button>
              </Modal.Footer>
              <Modal.Close />
            </Modal.Content>
          </Modal.Root>

          <Modal.Root open={openFullscreen} onOpenChange={setOpenFullscreen}>
            <Modal.Trigger className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
              Fullscreen
            </Modal.Trigger>
            <Modal.Content size="fullscreen">
              <Modal.Header>
                <Modal.Title>Fullscreen Modal</Modal.Title>
                <Modal.Description>This is a fullscreen modal.</Modal.Description>
              </Modal.Header>
              <div className="py-4">
                <p>Fullscreen modal content.</p>
              </div>
              <Modal.Footer>
                <button
                  className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                  onClick={() => setOpenSm(false)}
                >
                  Close
                </button>
              </Modal.Footer>
              <Modal.Close />
            </Modal.Content>
          </Modal.Root>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "All available size variants: sm, md, lg, xl, and fullscreen.",
      },
    },
  },
};

/**
 * Modal with scrollable content
 */
export const ScrollableContent: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Modal.Root open={open} onOpenChange={setOpen}>
          <Modal.Trigger className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Open Scrollable Modal
          </Modal.Trigger>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>Scrollable Content</Modal.Title>
              <Modal.Description>This modal has long content that will scroll.</Modal.Description>
            </Modal.Header>
            <div className="max-h-[400px] overflow-y-auto py-4">
              {Array.from({ length: 50 }, (_, i) => (
                <p key={i} className="mb-4">
                  This is paragraph {i + 1}. The modal content area will scroll when the content
                  exceeds the maximum height. Radix Dialog handles the scroll behavior
                  automatically.
                </p>
              ))}
            </div>
            <Modal.Footer>
              <button
                className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </Modal.Footer>
            <Modal.Close />
          </Modal.Content>
        </Modal.Root>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Modal with long scrollable content. The content area scrolls while the header and footer remain fixed.",
      },
    },
  },
};

/**
 * Modal with header, content, and footer composition
 */
export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Modal.Root open={open} onOpenChange={setOpen}>
          <Modal.Trigger className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Open Modal with Footer
          </Modal.Trigger>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>Modal with Footer</Modal.Title>
              <Modal.Description>
                This modal demonstrates the header, content, and footer composition pattern.
              </Modal.Description>
            </Modal.Header>
            <div className="py-4">
              <p>This is the main content area.</p>
              <p className="mt-2">You can put any content here.</p>
            </div>
            <Modal.Footer align="right" gap="sm">
              <button
                className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
                onClick={() => setOpen(false)}
              >
                Save Changes
              </button>
            </Modal.Footer>
            <Modal.Close />
          </Modal.Content>
        </Modal.Root>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Modal with header, content, and footer composition. Footer supports different alignment options (left, center, right, between).",
      },
    },
  },
};

/**
 * Controlled Modal with external state management
 */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <button
              className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
              onClick={() => setOpen(true)}
            >
              Open Modal
            </button>
            <button
              className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
              onClick={() => setOpen(false)}
            >
              Close Modal
            </button>
          </div>
          <p>Modal is {open ? "open" : "closed"}</p>
        </div>
        <Modal.Root open={open} onOpenChange={setOpen}>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>Controlled Modal</Modal.Title>
              <Modal.Description>
                This modal is controlled by external state. The open state is managed outside the
                Modal component.
              </Modal.Description>
            </Modal.Header>
            <div className="py-4">
              <p>You can control this modal from outside using the open and onOpenChange props.</p>
            </div>
            <Modal.Footer>
              <button
                className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </Modal.Footer>
            <Modal.Close />
          </Modal.Content>
        </Modal.Root>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Controlled Modal example. The open state is managed externally, allowing you to control the modal from anywhere in your application.",
      },
    },
  },
};

/**
 * Modal that cannot be closed by overlay click or escape key
 * Note: Radix Dialog supports this via the modal prop and onInteractOutside
 */
export const PreventClose: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Modal.Root open={open} onOpenChange={setOpen} modal={true}>
          <Modal.Trigger className="rounded-md bg-primary px-4 py-2 text-primary-foreground">
            Open Non-Closable Modal
          </Modal.Trigger>
          <Modal.Content
            size="md"
            onInteractOutside={(e) => {
              e.preventDefault();
            }}
            onEscapeKeyDown={(e) => {
              e.preventDefault();
            }}
          >
            <Modal.Header>
              <Modal.Title>Non-Closable Modal</Modal.Title>
              <Modal.Description>
                This modal cannot be closed by clicking the overlay or pressing Escape. You must use
                the close button.
              </Modal.Description>
            </Modal.Header>
            <div className="py-4">
              <p>
                This modal prevents closing via overlay click or Escape key. You must use the close
                button to dismiss it.
              </p>
            </div>
            <Modal.Footer>
              <button
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </Modal.Footer>
            <Modal.Close />
          </Modal.Content>
        </Modal.Root>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Modal that prevents closing via overlay click or Escape key. Uses Radix Dialog's onInteractOutside and onEscapeKeyDown props to prevent default behavior.",
      },
    },
  },
};
