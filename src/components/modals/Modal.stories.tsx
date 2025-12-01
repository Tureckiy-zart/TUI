import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../primitives/Button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalTrigger,
} from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "Modals/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button>Open Modal</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Modal Title</ModalTitle>
            <ModalDescription>This is a description of what the modal does.</ModalDescription>
          </ModalHeader>
          <div className="py-md">
            <p>Modal content goes here...</p>
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  },
};

export const WithoutTrigger: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Controlled Modal</ModalTitle>
              <ModalDescription>This modal is controlled programmatically.</ModalDescription>
            </ModalHeader>
            <div className="py-md">
              <p>You can control this modal from outside.</p>
            </div>
            <ModalFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  },
};

export const LargeModal: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Modal open={open} onOpenChange={setOpen}>
        <ModalTrigger asChild>
          <Button>Open Large Modal</Button>
        </ModalTrigger>
        <ModalContent className="max-w-2xl">
          <ModalHeader>
            <ModalTitle>Large Modal</ModalTitle>
            <ModalDescription>This is a larger modal with more content.</ModalDescription>
          </ModalHeader>
          <div className="space-y-md py-md">
            <p>This modal has more space for content.</p>
            <p>You can put forms, tables, or other complex content here.</p>
            <div className="rounded-md bg-muted p-md">
              <h4 className="mb-sm font-semibold">Example Content</h4>
              <p className="text-sm text-muted-foreground">
                This is an example of how you might structure content in a larger modal.
              </p>
            </div>
          </div>
          <ModalFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save Changes</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  },
};
