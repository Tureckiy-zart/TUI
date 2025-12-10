"use client";

import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "./ToastProvider";

const meta: Meta<typeof ToastProvider> = {
  title: "Overlays/Toast",
  component: ToastProvider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Token-driven toast notification system with Context API. Supports variants: success, info, warning, danger. Uses CSS animations with motion tokens.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

function ToastDemo() {
  const toast = useToast();

  return (
    <div className="space-y-sm">
      <button
        onClick={() =>
          toast.toast({
            title: "Default Toast",
            description: "This is a default toast notification.",
          })
        }
        className="rounded-md bg-primary px-md py-sm text-primary-foreground"
      >
        Show Default Toast
      </button>
      <button
        onClick={() =>
          toast.toast({
            title: "Success",
            description: "Operation completed successfully!",
            variant: "success",
          })
        }
        className="rounded-md bg-success px-md py-sm text-success-foreground"
      >
        Show Success Toast
      </button>
      <button
        onClick={() =>
          toast.toast({
            title: "Info",
            description: "Here's some information for you.",
            variant: "info",
          })
        }
        className="rounded-md bg-info px-md py-sm text-info-foreground"
      >
        Show Info Toast
      </button>
      <button
        onClick={() =>
          toast.toast({
            title: "Warning",
            description: "Please be careful with this action.",
            variant: "warning",
          })
        }
        className="rounded-md bg-warning px-md py-sm text-warning-foreground"
      >
        Show Warning Toast
      </button>
      <button
        onClick={() =>
          toast.toast({ title: "Error", description: "Something went wrong!", variant: "danger" })
        }
        className="rounded-md bg-destructive px-md py-sm text-destructive-foreground"
      >
        Show Error Toast
      </button>
    </div>
  );
}

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const Success: Story = {
  render: () => {
    const toast = useToast();
    return (
      <button
        onClick={() =>
          toast.toast({
            title: "Success",
            description: "Operation completed successfully!",
            variant: "success",
          })
        }
        className="rounded-md bg-success px-md py-sm text-success-foreground"
      >
        Show Success Toast
      </button>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    const toast = useToast();
    return (
      <button
        onClick={() =>
          toast.toast({
            title: "File Deleted",
            description: "The file has been moved to trash.",
            variant: "success",
            action: {
              label: "Undo",
              onClick: () => {
                toast.toast({ title: "File Restored", variant: "info" });
              },
            },
          })
        }
        className="rounded-md bg-primary px-md py-sm text-primary-foreground"
      >
        Show Toast with Action
      </button>
    );
  },
};

export const MultipleToasts: Story = {
  render: () => {
    const toast = useToast();
    return (
      <button
        onClick={() => {
          toast.toast({ title: "Toast 1", variant: "success" });
          toast.toast({ title: "Toast 2", variant: "info" });
          toast.toast({ title: "Toast 3", variant: "warning" });
          toast.toast({ title: "Toast 4", variant: "danger" });
        }}
        className="rounded-md bg-primary px-md py-sm text-primary-foreground"
      >
        Show Multiple Toasts
      </button>
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const toast = useToast();
    return (
      <div className="space-y-sm">
        <button
          onClick={() => toast.toast({ title: "Default", variant: "default" })}
          className="block w-full rounded-md border border-border bg-background px-md py-sm"
        >
          Default
        </button>
        <button
          onClick={() => toast.toast({ title: "Success", variant: "success" })}
          className="block w-full rounded-md bg-success px-md py-sm text-success-foreground"
        >
          Success
        </button>
        <button
          onClick={() => toast.toast({ title: "Info", variant: "info" })}
          className="block w-full rounded-md bg-info px-md py-sm text-info-foreground"
        >
          Info
        </button>
        <button
          onClick={() => toast.toast({ title: "Warning", variant: "warning" })}
          className="block w-full rounded-md bg-warning px-md py-sm text-warning-foreground"
        >
          Warning
        </button>
        <button
          onClick={() => toast.toast({ title: "Danger", variant: "danger" })}
          className="block w-full rounded-md bg-destructive px-md py-sm text-destructive-foreground"
        >
          Danger
        </button>
      </div>
    );
  },
};
