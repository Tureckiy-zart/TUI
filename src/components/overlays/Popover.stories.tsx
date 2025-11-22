import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { PopoverWrapper, Popover, PopoverTrigger, PopoverContent } from "./Popover";
import { Button } from "../primitives/Button";
import { Input } from "../primitives/Input";
import { Label } from "../primitives/Label";
import { Badge } from "../primitives/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "../primitives/Card";
import { Settings, User, Bell, HelpCircle } from "lucide-react";

const meta: Meta<typeof PopoverWrapper> = {
  title: "Components/Overlays/Popover",
  component: PopoverWrapper,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof PopoverWrapper>;

export const Default: Story = {
  args: {
    content: (
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Settings</h4>
        <p className="text-sm text-muted-foreground">Configure your application settings here.</p>
      </div>
    ),
    children: <Button>Open Popover</Button>,
  },
};

export const WithForm: Story = {
  render: () => (
    <PopoverWrapper
      content={
        <div className="w-80 space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">User Profile</h4>
            <p className="text-sm text-muted-foreground">Update your profile information.</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm">Save</Button>
          </div>
        </div>
      }
    >
      <Button variant="outline">
        <User className="mr-2 h-4 w-4" />
        Edit Profile
      </Button>
    </PopoverWrapper>
  ),
};

export const DifferentVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <PopoverWrapper
        variant="default"
        content={
          <div className="space-y-2">
            <h4 className="font-medium">Default Popover</h4>
            <p className="text-sm text-muted-foreground">This is a default popover.</p>
          </div>
        }
      >
        <Button variant="default">Default</Button>
      </PopoverWrapper>

      <PopoverWrapper
        variant="success"
        content={
          <div className="space-y-2">
            <h4 className="font-medium">Success Popover</h4>
            <p className="text-sm text-muted-foreground">This is a success popover.</p>
          </div>
        }
      >
        <Button variant="outline">Success</Button>
      </PopoverWrapper>

      <PopoverWrapper
        variant="warning"
        content={
          <div className="space-y-2">
            <h4 className="font-medium">Warning Popover</h4>
            <p className="text-sm text-muted-foreground">This is a warning popover.</p>
          </div>
        }
      >
        <Button variant="outline">Warning</Button>
      </PopoverWrapper>

      <PopoverWrapper
        variant="destructive"
        content={
          <div className="space-y-2">
            <h4 className="font-medium">Error Popover</h4>
            <p className="text-sm text-muted-foreground">This is an error popover.</p>
          </div>
        }
      >
        <Button variant="outline">Error</Button>
      </PopoverWrapper>
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <PopoverWrapper
        size="sm"
        content={
          <div className="space-y-2">
            <h4 className="font-medium">Small Popover</h4>
            <p className="text-sm text-muted-foreground">Compact content.</p>
          </div>
        }
      >
        <Button size="sm">Small</Button>
      </PopoverWrapper>

      <PopoverWrapper
        size="md"
        content={
          <div className="space-y-2">
            <h4 className="font-medium">Medium Popover</h4>
            <p className="text-sm text-muted-foreground">Standard sized content with more space.</p>
          </div>
        }
      >
        <Button>Medium</Button>
      </PopoverWrapper>

      <PopoverWrapper
        size="lg"
        content={
          <div className="space-y-4">
            <h4 className="font-medium">Large Popover</h4>
            <p className="text-sm text-muted-foreground">
              Large popover with plenty of space for complex content.
            </p>
            <div className="space-y-2">
              <Badge>Feature</Badge>
              <Badge variant="secondary">New</Badge>
            </div>
          </div>
        }
      >
        <Button size="lg">Large</Button>
      </PopoverWrapper>
    </div>
  ),
};

export const DifferentPositions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <PopoverWrapper
        side="top"
        content={
          <div className="space-y-2">
            <h4 className="font-medium">Top Popover</h4>
            <p className="text-sm text-muted-foreground">This appears above the trigger.</p>
          </div>
        }
      >
        <Button>Top</Button>
      </PopoverWrapper>

      <PopoverWrapper
        side="right"
        content={
          <div className="space-y-2">
            <h4 className="font-medium">Right Popover</h4>
            <p className="text-sm text-muted-foreground">This appears to the right.</p>
          </div>
        }
      >
        <Button>Right</Button>
      </PopoverWrapper>

      <PopoverWrapper
        side="bottom"
        content={
          <div className="space-y-2">
            <h4 className="font-medium">Bottom Popover</h4>
            <p className="text-sm text-muted-foreground">This appears below the trigger.</p>
          </div>
        }
      >
        <Button>Bottom</Button>
      </PopoverWrapper>

      <PopoverWrapper
        side="left"
        content={
          <div className="space-y-2">
            <h4 className="font-medium">Left Popover</h4>
            <p className="text-sm text-muted-foreground">This appears to the left.</p>
          </div>
        }
      >
        <Button>Left</Button>
      </PopoverWrapper>
    </div>
  ),
};

export const WithCardContent: Story = {
  render: () => (
    <PopoverWrapper
      content={
        <Card className="w-80">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Quick Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Notifications</span>
              <Badge variant="secondary">On</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Dark Mode</span>
              <Badge variant="outline">Off</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-save</span>
              <Badge variant="secondary">On</Badge>
            </div>
          </CardContent>
        </Card>
      }
    >
      <Button variant="outline">
        <Settings className="mr-2 h-4 w-4" />
        Settings
      </Button>
    </PopoverWrapper>
  ),
};

export const NotificationsMenu: Story = {
  render: () => (
    <PopoverWrapper
      content={
        <div className="w-80 space-y-3">
          <div className="space-y-2">
            <h4 className="font-medium">Notifications</h4>
            <p className="text-sm text-muted-foreground">You have 3 new notifications.</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-3 rounded-md bg-muted/50 p-2">
              <Bell className="mt-0.5 h-4 w-4 text-blue-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium">New message</p>
                <p className="text-xs text-muted-foreground">
                  You received a new message from John.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-md bg-muted/50 p-2">
              <Bell className="mt-0.5 h-4 w-4 text-green-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Task completed</p>
                <p className="text-xs text-muted-foreground">
                  Your task "Update documentation" is done.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-md bg-muted/50 p-2">
              <Bell className="mt-0.5 h-4 w-4 text-yellow-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium">Reminder</p>
                <p className="text-xs text-muted-foreground">
                  Don't forget about the team meeting at 3 PM.
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <Button variant="outline" size="icon" className="relative">
        <Bell className="h-4 w-4" />
        <Badge className="absolute -right-1 -top-1 h-5 w-5 text-xs">3</Badge>
      </Button>
    </PopoverWrapper>
  ),
};
