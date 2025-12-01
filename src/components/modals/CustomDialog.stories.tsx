import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CustomDialog } from "./CustomDialog";

const meta: Meta<typeof CustomDialog> = {
  title: "Components/CustomDialog",
  component: CustomDialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: { type: "boolean" },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const DialogWithState = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90"
      >
        Open Dialog
      </button>
      <CustomDialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="Demo Dialog">
        <p>This is a demo dialog content.</p>
        <div className="mt-md flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90"
          >
            Close
          </button>
        </div>
      </CustomDialog>
    </div>
  );
};

export const Default: Story = {
  render: () => <DialogWithState />,
};

export const WithoutTitle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90"
        >
          Open Dialog Without Title
        </button>
        <CustomDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p>This dialog doesn't have a title.</p>
          <div className="mt-md flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90"
            >
              Close
            </button>
          </div>
        </CustomDialog>
      </div>
    );
  },
};
