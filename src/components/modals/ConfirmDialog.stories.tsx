import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../primitives/Button';
import { ConfirmDialog } from './ConfirmDialog';

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Modals/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>Delete Item</Button>
        <ConfirmDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={() => {
            console.log('Confirmed!');
            setOpen(false);
          }}
          title="Delete Item"
          description="Are you sure you want to delete this item? This action cannot be undone."
          confirmText="Delete"
          cancelText="Cancel"
        />
      </>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete Account
        </Button>
        <ConfirmDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={() => {
            console.log('Account deleted!');
            setOpen(false);
          }}
          title="Delete Account"
          description="This will permanently delete your account and all associated data. This action cannot be undone."
          confirmText="Delete Account"
          cancelText="Cancel"
          variant="destructive"
        />
      </>
    );
  },
};

export const Loading: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const handleConfirm = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLoading(false);
      setOpen(false);
    };
    
    return (
      <>
        <Button onClick={() => setOpen(true)}>Save Changes</Button>
        <ConfirmDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={handleConfirm}
          title="Save Changes"
          description="Are you sure you want to save these changes?"
          confirmText="Save"
          cancelText="Cancel"
          isLoading={loading}
        />
      </>
    );
  },
};
