import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    description: 'Operation completed successfully!',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    description: 'Something went wrong. Please try again.',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'Please review your input before proceeding.',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    description: 'Here\'s some useful information for you.',
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    description: 'This alert doesn\'t have a title.',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="success" title="Success" description="Operation completed successfully!" />
      <Alert variant="error" title="Error" description="Something went wrong. Please try again." />
      <Alert variant="warning" title="Warning" description="Please review your input before proceeding." />
      <Alert variant="info" title="Info" description="Here\'s some useful information for you." />
    </div>
  ),
};
