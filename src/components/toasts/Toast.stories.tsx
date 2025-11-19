import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Toast } from './Toast';
import { ToastProvider, useToast } from './ToastProvider';
import { Button } from '../primitives/Button';

// Wrapper component for stories
function ToastDemo() {
  const { toast, success, error, warning, info } = useToast();

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-lg font-semibold">Toast Examples</h2>
      
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() => 
            toast({
              type: 'default',
              title: 'Default Toast',
              description: 'This is a default toast message.',
            })
          }
        >
          Default Toast
        </Button>

        <Button
          onClick={() => 
            success({
              title: 'Success!',
              description: 'Your action was completed successfully.',
            })
          }
        >
          Success Toast
        </Button>

        <Button
          onClick={() => 
            error({
              title: 'Error occurred',
              description: 'Something went wrong. Please try again.',
            })
          }
        >
          Error Toast
        </Button>

        <Button
          onClick={() => 
            warning({
              title: 'Warning',
              description: 'Please check your input before proceeding.',
            })
          }
        >
          Warning Toast
        </Button>

        <Button
          onClick={() => 
            info({
              title: 'Information',
              description: 'Here is some useful information for you.',
            })
          }
        >
          Info Toast
        </Button>

        <Button
          onClick={() => 
            success({
              title: 'Toast with Action',
              description: 'This toast has an action button.',
              action: {
                label: 'Undo',
                onClick: () => console.log('Action clicked!'),
              },
            })
          }
        >
          Toast with Action
        </Button>

        <Button
          onClick={() => 
            toast({
              type: 'success',
              title: 'Long Duration Toast',
              description: 'This toast will stay visible for 10 seconds.',
              duration: 10000,
            })
          }
        >
          Long Duration Toast
        </Button>

        <Button
          onClick={() => 
            toast({
              type: 'info',
              title: 'Persistent Toast',
              description: 'This toast will not auto-dismiss.',
              duration: 0,
            })
          }
        >
          Persistent Toast
        </Button>
      </div>
    </div>
  );
}

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ToastProvider position="top-right">
        <Story />
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  render: () => <ToastDemo />,
};

export const Success: Story = {
  render: () => (
    <ToastProvider position="top-center">
      <div className="p-4">
        <Button
          onClick={() => {
            const { success } = useToast();
            success({
              title: 'Success!',
              description: 'Your action was completed successfully.',
            });
          }}
        >
          Show Success Toast
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const Error: Story = {
  render: () => (
    <ToastProvider position="top-center">
      <div className="p-4">
        <Button
          onClick={() => {
            const { error } = useToast();
            error({
              title: 'Error occurred',
              description: 'Something went wrong. Please try again.',
            });
          }}
        >
          Show Error Toast
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const Warning: Story = {
  render: () => (
    <ToastProvider position="top-center">
      <div className="p-4">
        <Button
          onClick={() => {
            const { warning } = useToast();
            warning({
              title: 'Warning',
              description: 'Please check your input before proceeding.',
            });
          }}
        >
          Show Warning Toast
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const Info: Story = {
  render: () => (
    <ToastProvider position="top-center">
      <div className="p-4">
        <Button
          onClick={() => {
            const { info } = useToast();
            info({
              title: 'Information',
              description: 'Here is some useful information for you.',
            });
          }}
        >
          Show Info Toast
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastProvider position="top-center">
      <div className="p-4">
        <Button
          onClick={() => {
            const { success } = useToast();
            success({
              title: 'Toast with Action',
              description: 'This toast has an action button.',
              action: {
                label: 'Undo',
                onClick: () => alert('Action clicked!'),
              },
            });
          }}
        >
          Show Toast with Action
        </Button>
      </div>
    </ToastProvider>
  ),
};

export const DifferentPositions: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Different Toast Positions</h3>
      
      {(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const).map((position) => (
        <ToastProvider key={position} position={position}>
          <div className="p-4">
            <Button
              onClick={() => {
                const { info } = useToast();
                info({
                  title: `${position} Toast`,
                  description: `This toast appears at ${position.replace('-', ' ')}.`,
                });
              }}
            >
              Show {position.replace('-', ' ')} Toast
            </Button>
          </div>
        </ToastProvider>
      ))}
    </div>
  ),
};
