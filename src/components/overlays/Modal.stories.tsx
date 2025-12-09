"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Overlays/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Token-driven modal component with Portal, Backdrop, and Surface integration. Supports size variants with CSS animations, focus trap, scroll lock, escape key handling, and click-outside-to-close.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "fullscreen"],
      description: "Modal size variant",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "md" },
      },
    },
    backdropVariant: {
      control: { type: "select" },
      options: ["default", "blurred", "transparent"],
      description: "Backdrop variant",
    },
    closeOnBackdropClick: {
      control: { type: "boolean" },
      description: "Whether to close on backdrop click",
    },
    closeOnEscape: {
      control: { type: "boolean" },
      description: "Whether to close on escape key",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalHeader>
            <h2 className="text-lg font-semibold">Modal Title</h2>
            <p className="text-sm text-muted-foreground">
              This is a description of what the modal does.
            </p>
          </ModalHeader>
          <ModalBody>
            <p>Modal content goes here...</p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Small Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} size="sm">
          <ModalHeader>
            <h2 className="text-lg font-semibold">Small Modal</h2>
          </ModalHeader>
          <ModalBody>
            <p>This is a small modal with limited width.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const Large: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Large Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} size="lg">
          <ModalHeader>
            <h2 className="text-lg font-semibold">Large Modal</h2>
            <p className="text-sm text-muted-foreground">
              This is a larger modal with more space for content.
            </p>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-md">
              <p>This modal has more space for content.</p>
              <p>You can put forms, tables, or other complex content here.</p>
              <div className="rounded-md bg-muted p-md">
                <h4 className="mb-sm font-semibold">Example Content</h4>
                <p className="text-sm text-muted-foreground">
                  This is an example of how you might structure content in a larger modal.
                </p>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save Changes</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const Fullscreen: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Fullscreen Modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} size="fullscreen">
          <ModalHeader>
            <h2 className="text-lg font-semibold">Fullscreen Modal</h2>
          </ModalHeader>
          <ModalBody>
            <p>This modal takes up the full screen.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const WithBlurredBackdrop: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal with Blurred Backdrop</Button>
        <Modal open={open} onClose={() => setOpen(false)} backdropVariant="blurred">
          <ModalHeader>
            <h2 className="text-lg font-semibold">Blurred Backdrop</h2>
          </ModalHeader>
          <ModalBody>
            <p>This modal has a blurred backdrop behind it.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const NoBackdropClick: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal (No Backdrop Click)</Button>
        <Modal open={open} onClose={() => setOpen(false)} closeOnBackdropClick={false}>
          <ModalHeader>
            <h2 className="text-lg font-semibold">No Backdrop Click</h2>
          </ModalHeader>
          <ModalBody>
            <p>
              This modal cannot be closed by clicking the backdrop. Use the close button or Escape
              key.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState<"sm" | "md" | "lg" | "fullscreen">("md");

    return (
      <>
        <div className="mb-md flex gap-sm">
          <Button
            onClick={() => {
              setSize("sm");
              setOpen(true);
            }}
            variant="outline"
          >
            Small
          </Button>
          <Button
            onClick={() => {
              setSize("md");
              setOpen(true);
            }}
            variant="outline"
          >
            Medium
          </Button>
          <Button
            onClick={() => {
              setSize("lg");
              setOpen(true);
            }}
            variant="outline"
          >
            Large
          </Button>
          <Button
            onClick={() => {
              setSize("fullscreen");
              setOpen(true);
            }}
            variant="outline"
          >
            Fullscreen
          </Button>
        </div>
        <Modal open={open} onClose={() => setOpen(false)} size={size}>
          <ModalHeader>
            <h2 className="text-lg font-semibold">{size.toUpperCase()} Modal</h2>
          </ModalHeader>
          <ModalBody>
            <p>This is a {size} sized modal.</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
};
