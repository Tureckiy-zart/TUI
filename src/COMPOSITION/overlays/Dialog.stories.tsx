"use client";

import { Button } from "@/PRIMITIVES/Button";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "UI / Composition / Overlays / Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Semantic modal wrapper built on Modal component. Provides Dialog.Header, Dialog.Title, Dialog.Description, Dialog.Body, Dialog.Footer subcomponents. Full A11y compliance with aria-labelledby and aria-describedby.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>This is a description of what the dialog does.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p>Dialog content goes here...</p>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};

export const Confirmation: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Delete Item</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogHeader>
            <DialogTitle>Delete Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              This will permanently delete the item from your account.
            </p>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>
              Delete
            </Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};

export const FormDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Form Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogHeader>
            <DialogTitle>Create New Item</DialogTitle>
            <DialogDescription>Fill out the form below to create a new item.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="space-y-md">
              <div>
                <label className="mb-xs block text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="w-full rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-md py-sm"
                />
              </div>
              <div>
                <label className="mb-xs block text-sm font-medium">Description</label>
                <textarea
                  placeholder="Enter description"
                  rows={4}
                  className="w-full rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-md py-sm"
                />
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Create</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};

/**
 * LongContent - REQUIRED for overlay components
 *
 * Validates padding and maxWidth token behavior with long text content.
 * This story demonstrates how Dialog handles long content and ensures
 * proper scrolling and token-based spacing.
 */
export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog with Long Content</Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogHeader>
            <DialogTitle>Terms and Conditions</DialogTitle>
            <DialogDescription>
              Please read the following terms and conditions carefully. This dialog demonstrates
              proper handling of long content with token-based padding and maxWidth constraints.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <div className="max-h-[400px] space-y-md overflow-y-auto text-sm">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur.
              </p>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit
                voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
                sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
                quaerat voluptatem.
              </p>
              <p>
                Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
                laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel
                illum qui dolorem eum fugiat quo voluptas nulla pariatur?
              </p>
              <p>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
                excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                officia deserunt mollitia animi, id est laborum et dolorum fuga.
              </p>
              <p>
                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum
                soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
                placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
              </p>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Decline
            </Button>
            <Button onClick={() => setOpen(false)}>Accept</Button>
          </DialogFooter>
        </Dialog>
      </>
    );
  },
};
