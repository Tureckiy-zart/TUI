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
      <div className="space-y-sm">
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
        <div className="w-80 space-y-md">
          <div className="space-y-sm">
            <h4 className="font-medium leading-none">User Profile</h4>
            <p className="text-sm text-muted-foreground">Update your profile information.</p>
          </div>
          <div className="space-y-sm">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter your name" />
          </div>
          <div className="space-y-sm">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="flex justify-end space-x-sm">
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button size="sm">Save</Button>
          </div>
        </div>
      }
    >
      <Button variant="outline">
        <User className="mr-sm h-4 w-4" />
        Edit Profile
      </Button>
    </PopoverWrapper>
  ),
};

export const DifferentVariants: Story = {
  render: () => (
    <div className="flex gap-md">
      <PopoverWrapper
        variant="primary"
        content={
          <div className="space-y-sm">
            <h4 className="font-medium">Primary Popover</h4>
            <p className="text-sm text-muted-foreground">This is a primary popover.</p>
          </div>
        }
      >
        <Button variant="primary">Primary</Button>
      </PopoverWrapper>

      <PopoverWrapper
        variant="accent"
        content={
          <div className="space-y-sm">
            <h4 className="font-medium">Accent Popover</h4>
            <p className="text-sm text-muted-foreground">This is an accent popover.</p>
          </div>
        }
      >
        <Button variant="outline">Accent</Button>
      </PopoverWrapper>

      <PopoverWrapper
        variant="secondary"
        content={
          <div className="space-y-sm">
            <h4 className="font-medium">Secondary Popover</h4>
            <p className="text-sm text-muted-foreground">This is a secondary popover.</p>
          </div>
        }
      >
        <Button variant="outline">Secondary</Button>
      </PopoverWrapper>

      <PopoverWrapper
        variant="destructive"
        content={
          <div className="space-y-sm">
            <h4 className="font-medium">Destructive Popover</h4>
            <p className="text-sm text-muted-foreground">This is a destructive popover.</p>
          </div>
        }
      >
        <Button variant="outline">Destructive</Button>
      </PopoverWrapper>
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex gap-md">
      <PopoverWrapper
        size="sm"
        content={
          <div className="space-y-sm">
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
          <div className="space-y-sm">
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
          <div className="space-y-md">
            <h4 className="font-medium">Large Popover</h4>
            <p className="text-sm text-muted-foreground">
              Large popover with plenty of space for complex content.
            </p>
            <div className="space-y-sm">
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
    <div className="grid grid-cols-2 gap-xl p-xl">
      <PopoverWrapper
        side="top"
        content={
          <div className="space-y-sm">
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
          <div className="space-y-sm">
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
          <div className="space-y-sm">
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
          <div className="space-y-sm">
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
          <CardHeader className="pb-sm">
            <CardTitle className="flex items-center gap-sm">
              <Settings className="h-4 w-4" />
              Quick Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-sm">
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
        <Settings className="mr-sm h-4 w-4" />
        Settings
      </Button>
    </PopoverWrapper>
  ),
};

export const NotificationsMenu: Story = {
  render: () => (
    <PopoverWrapper
      content={
        <div className="w-80 space-y-sm">
          <div className="space-y-sm">
            <h4 className="font-medium">Notifications</h4>
            <p className="text-sm text-muted-foreground">You have 3 new notifications.</p>
          </div>
          <div className="space-y-sm">
            <div className="flex items-start gap-sm rounded-md bg-muted/50 p-sm">
              <Bell className="mt-0.5 h-4 w-4 text-primary" />
              <div className="space-y-xs">
                <p className="text-sm font-medium">New message</p>
                <p className="text-xs text-muted-foreground">
                  You received a new message from John.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-sm rounded-md bg-muted/50 p-sm">
              <Bell className="mt-0.5 h-4 w-4 text-accent" />
              <div className="space-y-xs">
                <p className="text-sm font-medium">Task completed</p>
                <p className="text-xs text-muted-foreground">
                  Your task "Update documentation" is done.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-sm rounded-md bg-muted/50 p-sm">
              <Bell className="mt-0.5 h-4 w-4 text-secondary" />
              <div className="space-y-xs">
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
