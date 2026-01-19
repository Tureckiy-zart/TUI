"use client";

import { Button } from "@/PRIMITIVES/Button";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Backdrop } from "./Backdrop";

const meta: Meta<typeof Backdrop> = {
  title: "UI / Composition / Overlays / Backdrop",
  component: Backdrop,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Token-driven backdrop component for overlays. Supports variants: default, blurred, transparent. Uses CSS animations with motion tokens.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "blurred", "transparent"],
      description: "Backdrop variant",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    isVisible: {
      control: { type: "boolean" },
      description: "Whether backdrop is visible (for animation)",
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
        <Button onClick={() => setShow(!show)}>Show Default Backdrop</Button>
        {show && (
          <Backdrop
            variant="default"
            isVisible={show}
            onClick={() => setShow(false)}
            className="fixed inset-0 z-40"
          />
        )}
      </>
    );
  },
};

export const Blurred: Story = {
  render: () => {
    const [show, setShow] = useState(false);

    return (
      <>
        <Button onClick={() => setShow(!show)}>Show Blurred Backdrop</Button>
        {show && (
          <Backdrop
            variant="blurred"
            isVisible={show}
            onClick={() => setShow(false)}
            className="fixed inset-0 z-40"
          />
        )}
      </>
    );
  },
};

export const Transparent: Story = {
  render: () => {
    const [show, setShow] = useState(false);

    return (
      <>
        <Button onClick={() => setShow(!show)}>Show Transparent Backdrop</Button>
        {show && (
          <Backdrop
            variant="transparent"
            isVisible={show}
            onClick={() => setShow(false)}
            className="fixed inset-0 z-40"
          />
        )}
      </>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const [variant, setVariant] = useState<"default" | "blurred" | "transparent">("default");

    return (
      <div className="space-y-md">
        <div className="flex gap-sm">
          <Button
            onClick={() => setVariant("default")}
            variant={variant === "default" ? "primary" : "outline"}
          >
            Default
          </Button>
          <Button
            onClick={() => setVariant("blurred")}
            variant={variant === "blurred" ? "primary" : "outline"}
          >
            Blurred
          </Button>
          <Button
            onClick={() => setVariant("transparent")}
            variant={variant === "transparent" ? "primary" : "outline"}
          >
            Transparent
          </Button>
        </div>
        <Backdrop variant={variant} isVisible={true} className="fixed inset-0 z-50" />
        <div className="relative z-40 rounded-lg border bg-[hsl(var(--tm-surface-base))] p-lg shadow-lg">
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            Current variant: <strong>{variant}</strong>
          </p>
        </div>
      </div>
    );
  },
};

export const WithContent: Story = {
  render: () => {
    const [show, setShow] = useState(false);

    return (
      <>
        <Button onClick={() => setShow(!show)}>Show Modal with Backdrop</Button>
        {show && (
          <>
            <Backdrop
              variant="blurred"
              isVisible={show}
              onClick={() => setShow(false)}
              className="fixed inset-0 z-40"
            />
            <div className="fixed left-1/2 top-1/2 z-40 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-[hsl(var(--tm-surface-base))] p-lg shadow-lg">
              <h2 className="mb-md text-lg font-semibold">Modal Content</h2>
              <p className="mb-md text-sm text-[hsl(var(--tm-text-muted))]">
                This modal has a blurred backdrop behind it.
              </p>
              <Button onClick={() => setShow(false)}>Close</Button>
            </div>
          </>
        )}
      </>
    );
  },
};

/**
 * LongContent Story (CANONICAL - REQUIRED)
 * Validates backdrop behavior with long content in overlay
 * Required by VARIANTS_SIZE_CANON.md for overlay components
 */
export const LongContent: Story = {
  render: () => {
    const [show, setShow] = useState(false);

    return (
      <>
        <Button onClick={() => setShow(!show)}>Show Modal with Long Content</Button>
        {show && (
          <>
            <Backdrop
              variant="blurred"
              isVisible={show}
              onClick={() => setShow(false)}
              className="fixed inset-0 z-40"
            />
            <div className="fixed left-1/2 top-1/2 z-40 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-[hsl(var(--tm-surface-base))] p-lg shadow-lg">
              <h2 className="mb-md text-lg font-semibold">Terms and Conditions</h2>
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
                  voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
                  ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                <p>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
                  quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque
                  porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                  velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam
                  aliquam quaerat voluptatem.
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
              </div>
              <div className="mt-md flex justify-end">
                <Button onClick={() => setShow(false)}>Close</Button>
              </div>
            </div>
          </>
        )}
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Canonical LongContent Story:** Validates backdrop behavior with long content in overlay. This story is required per VARIANTS_SIZE_CANON.md for overlay components. Demonstrates backdrop with modal containing long scrollable content.",
      },
    },
  },
};
