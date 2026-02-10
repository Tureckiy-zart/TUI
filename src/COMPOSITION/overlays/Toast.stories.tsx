"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { useGlobalToast } from "@/hooks/useGlobalToast";
import { useLocalToast } from "@/hooks/useLocalToast";
import {
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  type ToastVariant,
} from "./Toast";
import { ToastProvider } from "./ToastProvider";
import { ToastViewport } from "./ToastViewport";

const meta: Meta<typeof ToastRoot> = {
  title: "Composition / Overlays / Toast",
  component: ToastRoot,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "FOUNDATION - Stateless UI renderer built on Radix Toast primitives with token-driven styling. All behavior (swipe gestures, auto-dismiss, focus management, keyboard navigation, a11y, portal) is handled by Radix Toast primitives. Toast is stateless and requires controlled open/onOpenChange props. Supports variants: default, success, warning, error (visual only).",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider>
        <ToastViewport>
          <Story />
        </ToastViewport>
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// ============================================================================
// CANONICAL STORIES
// ============================================================================

/**
 * Controlled Story (CANONICAL - REQUIRED)
 * Demonstrates controlled usage pattern with open/onOpenChange props
 * Required for stateless components with controlled state
 */
export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-md">
        <div className="space-y-sm">
          <h3 className="text-sm font-semibold">Controlled Toast</h3>
          <button
            onClick={() => setOpen(true)}
            className="rounded-md bg-[hsl(var(--tm-primary))] px-md py-sm text-sm text-[hsl(var(--tm-primary-foreground))]"
          >
            Show Toast
          </button>
        </div>
        <ToastRoot open={open} onOpenChange={setOpen} variant="default">
          <ToastTitle>Controlled Toast</ToastTitle>
          <ToastDescription>This toast is controlled via open/onOpenChange props.</ToastDescription>
          <ToastClose />
        </ToastRoot>
      </div>
    );
  },
};

/**
 * Variants Story (CANONICAL - REQUIRED)
 * Demonstrates all visual variants
 * Required by VARIANTS_SIZE_CANON.md for components with variants
 */
export const Variants: Story = {
  render: () => {
    const [defaultOpen, setDefaultOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [warningOpen, setWarningOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);

    return (
      <div className="space-y-md">
        <div className="space-y-sm">
          <h3 className="text-sm font-semibold">All Variants</h3>
          <div className="flex flex-wrap gap-sm">
            <button
              onClick={() => setDefaultOpen(true)}
              className="rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-md py-sm text-sm"
            >
              Default
            </button>
            <button
              onClick={() => setSuccessOpen(true)}
              className="rounded-md bg-success px-md py-sm text-sm text-success-foreground"
            >
              Success
            </button>
            <button
              onClick={() => setWarningOpen(true)}
              className="rounded-md bg-warning px-md py-sm text-sm text-warning-foreground"
            >
              Warning
            </button>
            <button
              onClick={() => setErrorOpen(true)}
              className="rounded-md bg-[hsl(var(--tm-destructive))] px-md py-sm text-sm text-destructive-foreground"
            >
              Error
            </button>
          </div>
        </div>
        <ToastRoot open={defaultOpen} onOpenChange={setDefaultOpen} variant="default">
          <ToastTitle>Default Toast</ToastTitle>
          <ToastDescription>This is a default toast notification.</ToastDescription>
          <ToastClose />
        </ToastRoot>
        <ToastRoot open={successOpen} onOpenChange={setSuccessOpen} variant="success">
          <ToastTitle>Success</ToastTitle>
          <ToastDescription>Operation completed successfully!</ToastDescription>
          <ToastClose />
        </ToastRoot>
        <ToastRoot open={warningOpen} onOpenChange={setWarningOpen} variant="warning">
          <ToastTitle>Warning</ToastTitle>
          <ToastDescription>Please be careful with this action.</ToastDescription>
          <ToastClose />
        </ToastRoot>
        <ToastRoot open={errorOpen} onOpenChange={setErrorOpen} variant="error">
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>Something went wrong!</ToastDescription>
          <ToastClose />
        </ToastRoot>
      </div>
    );
  },
};

/**
 * LongContent Story (CANONICAL - REQUIRED)
 * Validates padding and maxWidth token behavior with long text
 * Required by VARIANTS_SIZE_CANON.md for overlay components
 */
export const LongContent: Story = {
  render: () => {
    const [longTitleOpen, setLongTitleOpen] = useState(false);
    const [longDescOpen, setLongDescOpen] = useState(false);
    const [bothLongOpen, setBothLongOpen] = useState(false);
    const [longWithActionOpen, setLongWithActionOpen] = useState(false);

    const longTitle =
      "This is a very long toast title that should wrap properly within the toast container";
    const longDescription =
      "This is a very long toast description that demonstrates how the toast component handles extended content. The text should wrap appropriately within the toast container, respecting the maxWidth and padding tokens. This ensures that even with lengthy content, the toast remains readable and visually consistent with the design system.";

    return (
      <div className="space-y-md">
        <div className="space-y-sm">
          <h3 className="text-sm font-semibold">Long Title</h3>
          <button
            onClick={() => setLongTitleOpen(true)}
            className="rounded-md border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-base))] px-md py-sm text-sm"
          >
            Show Long Title
          </button>
        </div>
        <ToastRoot open={longTitleOpen} onOpenChange={setLongTitleOpen} variant="default">
          <ToastTitle>{longTitle}</ToastTitle>
          <ToastClose />
        </ToastRoot>

        <div className="space-y-sm">
          <h3 className="text-sm font-semibold">Long Description</h3>
          <button
            onClick={() => setLongDescOpen(true)}
            className="rounded-md bg-info px-md py-sm text-sm text-info-foreground"
          >
            Show Long Description
          </button>
        </div>
        <ToastRoot open={longDescOpen} onOpenChange={setLongDescOpen} variant="default">
          <ToastTitle>Long Content Toast</ToastTitle>
          <ToastDescription>{longDescription}</ToastDescription>
          <ToastClose />
        </ToastRoot>

        <div className="space-y-sm">
          <h3 className="text-sm font-semibold">Long Title + Long Description</h3>
          <button
            onClick={() => setBothLongOpen(true)}
            className="rounded-md bg-warning px-md py-sm text-sm text-warning-foreground"
          >
            Show Both Long
          </button>
        </div>
        <ToastRoot open={bothLongOpen} onOpenChange={setBothLongOpen} variant="warning">
          <ToastTitle>{longTitle}</ToastTitle>
          <ToastDescription>{longDescription}</ToastDescription>
          <ToastClose />
        </ToastRoot>

        <div className="space-y-sm">
          <h3 className="text-sm font-semibold">Long Content + Action</h3>
          <button
            onClick={() => setLongWithActionOpen(true)}
            className="rounded-md bg-success px-md py-sm text-sm text-success-foreground"
          >
            Show Long + Action
          </button>
        </div>
        <ToastRoot open={longWithActionOpen} onOpenChange={setLongWithActionOpen} variant="success">
          <ToastTitle>{longTitle}</ToastTitle>
          <ToastDescription>{longDescription}</ToastDescription>
          <ToastAction altText="Dismiss" onClick={() => setLongWithActionOpen(false)}>
            Dismiss
          </ToastAction>
          <ToastClose />
        </ToastRoot>
      </div>
    );
  },
};

// ============================================================================
// USAGE EXAMPLES (NON-CANONICAL)
// ============================================================================

/**
 * Basic Usage Example
 * Demonstrates simple controlled toast usage pattern
 */
export const BasicUsage: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-sm">
        <button
          onClick={() => setOpen(true)}
          className="rounded-md bg-[hsl(var(--tm-primary))] px-md py-sm text-[hsl(var(--tm-primary-foreground))]"
        >
          Show Basic Toast
        </button>
        <ToastRoot open={open} onOpenChange={setOpen} variant="default">
          <ToastTitle>Notification</ToastTitle>
          <ToastDescription>This is a basic toast notification.</ToastDescription>
          <ToastClose />
        </ToastRoot>
      </div>
    );
  },
};

/**
 * With Action Example
 * Demonstrates toast with action button
 */
export const WithAction: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-sm">
        <button
          onClick={() => setOpen(true)}
          className="rounded-md bg-[hsl(var(--tm-primary))] px-md py-sm text-[hsl(var(--tm-primary-foreground))]"
        >
          Show Toast with Action
        </button>
        <ToastRoot open={open} onOpenChange={setOpen} variant="success">
          <ToastTitle>File Deleted</ToastTitle>
          <ToastDescription>The file has been moved to trash.</ToastDescription>
          <ToastAction altText="Undo" onClick={() => setOpen(false)}>
            Undo
          </ToastAction>
          <ToastClose />
        </ToastRoot>
      </div>
    );
  },
};

/**
 * Multiple Toasts Example
 * Demonstrates multiple toasts rendered simultaneously
 */
export const MultipleToasts: Story = {
  render: () => {
    const [toast1Open, setToast1Open] = useState(false);
    const [toast2Open, setToast2Open] = useState(false);
    const [toast3Open, setToast3Open] = useState(false);
    const [toast4Open, setToast4Open] = useState(false);

    return (
      <div className="space-y-sm">
        <button
          onClick={() => {
            setToast1Open(true);
            setToast2Open(true);
            setToast3Open(true);
            setToast4Open(true);
          }}
          className="rounded-md bg-[hsl(var(--tm-primary))] px-md py-sm text-[hsl(var(--tm-primary-foreground))]"
        >
          Show Multiple Toasts
        </button>
        <ToastRoot open={toast1Open} onOpenChange={setToast1Open} variant="success">
          <ToastTitle>Toast 1</ToastTitle>
          <ToastClose />
        </ToastRoot>
        <ToastRoot open={toast2Open} onOpenChange={setToast2Open} variant="default">
          <ToastTitle>Toast 2</ToastTitle>
          <ToastClose />
        </ToastRoot>
        <ToastRoot open={toast3Open} onOpenChange={setToast3Open} variant="warning">
          <ToastTitle>Toast 3</ToastTitle>
          <ToastClose />
        </ToastRoot>
        <ToastRoot open={toast4Open} onOpenChange={setToast4Open} variant="error">
          <ToastTitle>Toast 4</ToastTitle>
          <ToastClose />
        </ToastRoot>
      </div>
    );
  },
};

/**
 * Local Hook Example
 * Demonstrates useLocalToast hook with controlled ToastRoot rendering
 */
export const LocalHookUsage: Story = {
  render: () => {
    const { toasts, toast, dismiss } = useLocalToast();

    return (
      <div className="space-y-sm">
        <button
          onClick={() =>
            toast({
              type: "success",
              title: "Local Toast",
              description: "This toast is scoped to the component.",
            })
          }
          className="rounded-md bg-[hsl(var(--tm-primary))] px-md py-sm text-[hsl(var(--tm-primary-foreground))]"
        >
          Show Local Toast
        </button>
        {toasts.map((toastData) => {
          const variant: ToastVariant = toastData.type === "info" ? "default" : toastData.type;
          return (
            <ToastRoot
              key={toastData.id}
              open={true}
              onOpenChange={(open) => {
                if (!open) {
                  dismiss(toastData.id);
                }
              }}
              variant={variant}
            >
              {toastData.title && <ToastTitle>{toastData.title}</ToastTitle>}
              {toastData.description && (
                <ToastDescription>{toastData.description}</ToastDescription>
              )}
              {toastData.action && (
                <ToastAction onClick={toastData.action.onClick} altText={toastData.action.label}>
                  {toastData.action.label}
                </ToastAction>
              )}
              <ToastClose />
            </ToastRoot>
          );
        })}
      </div>
    );
  },
};

/**
 * Global Hook Example
 * Demonstrates useGlobalToast hook with shared toast state
 */
export const GlobalHookUsage: Story = {
  render: () => {
    const { toasts, toast, dismiss } = useGlobalToast();

    return (
      <div className="space-y-sm">
        <button
          onClick={() =>
            toast({
              variant: "warning",
              title: "Global Toast",
              description: "This toast is shared across the app.",
            })
          }
          className="rounded-md bg-warning px-md py-sm text-warning-foreground"
        >
          Show Global Toast
        </button>
        {toasts.map((toastData) => (
          <ToastRoot
            key={toastData.id}
            open={true}
            onOpenChange={(open) => {
              if (!open) {
                dismiss(toastData.id);
              }
            }}
            variant={toastData.variant ?? "default"}
          >
            {toastData.title && <ToastTitle>{toastData.title}</ToastTitle>}
            {toastData.description && <ToastDescription>{toastData.description}</ToastDescription>}
            {toastData.action && (
              <ToastAction onClick={toastData.action.onClick} altText={toastData.action.label}>
                {toastData.action.label}
              </ToastAction>
            )}
            <ToastClose />
          </ToastRoot>
        ))}
      </div>
    );
  },
};
