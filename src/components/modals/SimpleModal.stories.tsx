import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { SimpleModal } from "./SimpleModal";

const meta: Meta<typeof SimpleModal> = {
  title: "Components/SimpleModal",
  component: SimpleModal,
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

const ModalWithState = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90"
      >
        Open Modal
      </button>
      <SimpleModal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Demo Modal">
        <p>This is a demo modal content.</p>
        <div className="mt-md flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90"
          >
            Close
          </button>
        </div>
      </SimpleModal>
    </div>
  );
};

export const Default: Story = {
  render: () => <ModalWithState />,
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
          Open Modal Without Title
        </button>
        <SimpleModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p>This modal doesn't have a title.</p>
          <div className="mt-md flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-md bg-primary px-md py-sm text-primary-foreground hover:bg-primary/90"
            >
              Close
            </button>
          </div>
        </SimpleModal>
      </div>
    );
  },
};
