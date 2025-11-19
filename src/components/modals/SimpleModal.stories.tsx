import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { SimpleModal } from './SimpleModal';

const meta: Meta<typeof SimpleModal> = {
  title: 'Components/SimpleModal',
  component: SimpleModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: { type: 'boolean' },
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
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Open Modal
      </button>
      <SimpleModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Demo Modal"
      >
        <p>This is a demo modal content.</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
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
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Open Modal Without Title
        </button>
        <SimpleModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <p>This modal doesn't have a title.</p>
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              Close
            </button>
          </div>
        </SimpleModal>
      </div>
    );
  },
};
