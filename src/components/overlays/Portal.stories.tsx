"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Portal } from "./Portal";

const meta: Meta<typeof Portal> = {
  title: "Overlays/Portal",
  component: Portal,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "SSR-safe portal component for rendering children outside the DOM hierarchy. Mounts to document.body by default, with optional custom container support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    container: {
      control: false,
      description: "Container element to portal into (defaults to document.body)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [show, setShow] = useState(false);

    return (
      <>
        <Button onClick={() => setShow(!show)}>Toggle Portal Content</Button>
        {show && (
          <Portal>
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="rounded-lg border bg-background p-lg shadow-lg">
                <h2 className="mb-md text-lg font-semibold">Portal Content</h2>
                <p className="mb-md text-sm text-muted-foreground">
                  This content is rendered via Portal outside the normal DOM hierarchy.
                </p>
                <Button onClick={() => setShow(false)}>Close</Button>
              </div>
            </div>
          </Portal>
        )}
      </>
    );
  },
};

export const CustomContainer: Story = {
  render: () => {
    const [show, setShow] = useState(false);
    const containerRef = useState<HTMLDivElement | null>(null);

    return (
      <>
        <div className="rounded-lg border border-border p-lg">
          <p className="mb-md text-sm">
            Custom container (the portal will render into the box below):
          </p>
          <Button onClick={() => setShow(!show)}>Toggle Portal Content</Button>
          <div
            ref={(el) => {
              containerRef[0] = el;
            }}
            className="mt-md min-h-[200px] rounded-md border-2 border-dashed border-border bg-muted/50"
          />
        </div>
        {show && containerRef[0] && (
          <Portal container={containerRef[0]}>
            <div className="rounded-md bg-primary p-md text-primary-foreground">
              This content is portaled into the custom container above.
            </div>
          </Portal>
        )}
      </>
    );
  },
};

export const SSR: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Portal is SSR-safe and will not render on the server. It only mounts after client-side hydration.",
      },
    },
  },
  render: () => {
    return (
      <div className="space-y-md">
        <p className="text-sm text-muted-foreground">
          The Portal component checks for window/document availability before rendering, making it
          safe for server-side rendering. On the server, it returns null.
        </p>
        <Portal>
          <div className="fixed right-md top-md z-50 rounded-md bg-primary p-md text-primary-foreground">
            This only appears on the client side.
          </div>
        </Portal>
      </div>
    );
  },
};
