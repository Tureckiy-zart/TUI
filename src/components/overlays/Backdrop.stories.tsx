"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Backdrop } from "./Backdrop";

const meta: Meta<typeof Backdrop> = {
  title: "Overlays/Backdrop",
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
            className="fixed inset-0 z-50"
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
            className="fixed inset-0 z-50"
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
            className="fixed inset-0 z-50"
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
        <div className="relative z-50 rounded-lg border bg-background p-lg shadow-lg">
          <p className="text-sm text-muted-foreground">
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
            <div className="fixed left-1/2 top-1/2 z-50 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-lg shadow-lg">
              <h2 className="mb-md text-lg font-semibold">Modal Content</h2>
              <p className="mb-md text-sm text-muted-foreground">
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
