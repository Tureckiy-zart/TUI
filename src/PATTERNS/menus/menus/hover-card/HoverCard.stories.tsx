import { Card, CardBody, CardHeader } from "@/COMPOSITION/layout/Card";
import type { ResponsiveDelay } from "@/FOUNDATION/tokens/types";
import { Badge } from "@/PRIMITIVES/Badge";
import { Button } from "@/PRIMITIVES/Button";
import { Heading } from "@/PRIMITIVES/Heading";
import type { Meta, StoryObj } from "@storybook/react";
import { Bell, Calendar, Mail, User } from "lucide-react";

import { HoverCardContent, HoverCardRoot, HoverCardTrigger } from ".";

const meta: Meta<typeof HoverCardRoot> = {
  title: "Patterns/Menus/HoverCard",
  component: HoverCardRoot,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof HoverCardRoot>;

export const Default: Story = {
  render: () => (
    <HoverCardRoot>
      <HoverCardTrigger>
        <Button variant="outline">Hover for details</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="space-y-sm">
          <h4 className="font-medium leading-none">User Profile</h4>
          <p className="text-sm text-muted-foreground">
            This is a hover card that appears on hover and stays open while hovering over the
            content.
          </p>
        </div>
      </HoverCardContent>
    </HoverCardRoot>
  ),
};

export const WithUserProfile: Story = {
  render: () => (
    <HoverCardRoot>
      <HoverCardTrigger>
        <div className="flex items-center gap-sm">
          <Button variant="ghost">
            <User className="h-4 w-4" />
            @username
          </Button>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-md">
          <div className="flex items-start gap-md">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-xs">
              <h4 className="font-medium leading-none">John Doe</h4>
              <p className="text-sm text-muted-foreground">@johndoe</p>
              <p className="text-sm">Software Engineer at Company</p>
            </div>
          </div>
          <div className="flex gap-md text-sm">
            <div className="flex items-center gap-xs">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">1,234</span>
              <span className="text-muted-foreground">followers</span>
            </div>
            <div className="flex items-center gap-xs">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">567</span>
              <span className="text-muted-foreground">following</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCardRoot>
  ),
};

export const WithCardContent: Story = {
  render: () => (
    <HoverCardRoot>
      <HoverCardTrigger>
        <Button variant="outline">
          <Calendar className="mr-sm h-4 w-4" />
          Event Details
        </Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <Card className="w-80">
          <CardHeader className="pb-sm">
            <Heading level={4}>Team Meeting</Heading>
          </CardHeader>
          <CardBody className="space-y-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Date</span>
              <span className="text-sm font-medium">Dec 21, 2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Time</span>
              <span className="text-sm font-medium">3:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              <Badge variant="secondary">Scheduled</Badge>
            </div>
          </CardBody>
        </Card>
      </HoverCardContent>
    </HoverCardRoot>
  ),
};

export const DifferentVariants: Story = {
  render: () => (
    <div className="flex gap-md">
      <HoverCardRoot>
        <HoverCardTrigger>
          <Button variant="primary">Primary</Button>
        </HoverCardTrigger>
        <HoverCardContent variant="primary">
          <div className="space-y-sm">
            <h4 className="font-medium">Primary HoverCard</h4>
            <p className="text-sm text-muted-foreground">This is a primary variant hover card.</p>
          </div>
        </HoverCardContent>
      </HoverCardRoot>

      <HoverCardRoot>
        <HoverCardTrigger>
          <Button variant="outline">Secondary</Button>
        </HoverCardTrigger>
        <HoverCardContent variant="secondary">
          <div className="space-y-sm">
            <h4 className="font-medium">Secondary HoverCard</h4>
            <p className="text-sm text-muted-foreground">This is a secondary variant hover card.</p>
          </div>
        </HoverCardContent>
      </HoverCardRoot>

      <HoverCardRoot>
        <HoverCardTrigger>
          <Button variant="outline">Accent</Button>
        </HoverCardTrigger>
        <HoverCardContent variant="accent">
          <div className="space-y-sm">
            <h4 className="font-medium">Accent HoverCard</h4>
            <p className="text-sm text-muted-foreground">This is an accent variant hover card.</p>
          </div>
        </HoverCardContent>
      </HoverCardRoot>
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex gap-md">
      <HoverCardRoot>
        <HoverCardTrigger>
          <Button size="sm">Small</Button>
        </HoverCardTrigger>
        <HoverCardContent size="sm">
          <div className="space-y-sm">
            <h4 className="font-medium">Small HoverCard</h4>
            <p className="text-sm text-muted-foreground">Compact content.</p>
          </div>
        </HoverCardContent>
      </HoverCardRoot>

      <HoverCardRoot>
        <HoverCardTrigger>
          <Button>Medium</Button>
        </HoverCardTrigger>
        <HoverCardContent size="md">
          <div className="space-y-sm">
            <h4 className="font-medium">Medium HoverCard</h4>
            <p className="text-sm text-muted-foreground">Standard sized content with more space.</p>
          </div>
        </HoverCardContent>
      </HoverCardRoot>

      <HoverCardRoot>
        <HoverCardTrigger>
          <Button size="lg">Large</Button>
        </HoverCardTrigger>
        <HoverCardContent size="lg">
          <div className="space-y-md">
            <h4 className="font-medium">Large HoverCard</h4>
            <p className="text-sm text-muted-foreground">
              Large hover card with plenty of space for complex content.
            </p>
            <div className="space-y-sm">
              <Badge>Feature</Badge>
              <Badge variant="secondary">New</Badge>
            </div>
          </div>
        </HoverCardContent>
      </HoverCardRoot>
    </div>
  ),
};

export const DifferentPositions: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-xl p-xl">
      <HoverCardRoot>
        <HoverCardTrigger>
          <Button>Top</Button>
        </HoverCardTrigger>
        <HoverCardContent side="top">
          <div className="space-y-sm">
            <h4 className="font-medium">Top HoverCard</h4>
            <p className="text-sm text-muted-foreground">This appears above the trigger.</p>
          </div>
        </HoverCardContent>
      </HoverCardRoot>

      <HoverCardRoot>
        <HoverCardTrigger>
          <Button>Right</Button>
        </HoverCardTrigger>
        <HoverCardContent side="right">
          <div className="space-y-sm">
            <h4 className="font-medium">Right HoverCard</h4>
            <p className="text-sm text-muted-foreground">This appears to the right.</p>
          </div>
        </HoverCardContent>
      </HoverCardRoot>

      <HoverCardRoot>
        <HoverCardTrigger>
          <Button>Bottom</Button>
        </HoverCardTrigger>
        <HoverCardContent side="bottom">
          <div className="space-y-sm">
            <h4 className="font-medium">Bottom HoverCard</h4>
            <p className="text-sm text-muted-foreground">This appears below the trigger.</p>
          </div>
        </HoverCardContent>
      </HoverCardRoot>

      <HoverCardRoot>
        <HoverCardTrigger>
          <Button>Left</Button>
        </HoverCardTrigger>
        <HoverCardContent side="left">
          <div className="space-y-sm">
            <h4 className="font-medium">Left HoverCard</h4>
            <p className="text-sm text-muted-foreground">This appears to the left.</p>
          </div>
        </HoverCardContent>
      </HoverCardRoot>
    </div>
  ),
};

export const CustomDelays: Story = {
  render: () => (
    <div className="flex gap-md">
      <HoverCardRoot openDelay={0 as ResponsiveDelay} closeDelay={100 as ResponsiveDelay}>
        <HoverCardTrigger>
          <Button variant="outline">Fast (0ms open, 100ms close)</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-sm">
            <h4 className="font-medium">Fast HoverCard</h4>
            <p className="text-sm text-muted-foreground">Opens immediately and closes quickly.</p>
          </div>
        </HoverCardContent>
      </HoverCardRoot>

      <HoverCardRoot openDelay={500 as ResponsiveDelay} closeDelay={500 as ResponsiveDelay}>
        <HoverCardTrigger>
          <Button variant="outline">Slow (500ms delays)</Button>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-sm">
            <h4 className="font-medium">Slow HoverCard</h4>
            <p className="text-sm text-muted-foreground">Opens and closes with longer delays.</p>
          </div>
        </HoverCardContent>
      </HoverCardRoot>
    </div>
  ),
};

export const WithNotifications: Story = {
  render: () => (
    <HoverCardRoot>
      <HoverCardTrigger>
        <div className="relative">
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -right-1 -top-1 h-5 w-5 text-xs">3</Badge>
          </Button>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-sm">
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
      </HoverCardContent>
    </HoverCardRoot>
  ),
};
