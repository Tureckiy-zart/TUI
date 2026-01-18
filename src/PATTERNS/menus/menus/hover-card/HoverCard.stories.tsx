import { Card, CardBody, CardHeader } from "@/COMPOSITION/layout/Card";
import type { ResponsiveDelay } from "@/FOUNDATION/tokens/types";
import { Badge } from "@/PRIMITIVES/Badge";
import { Button } from "@/PRIMITIVES/Button";
import { Heading } from "@/PRIMITIVES/Heading";
import type { Meta, StoryObj } from "@storybook/react";
import { Bell, Calendar, Mail, User } from "lucide-react";

import { HoverCardContent, HoverCardRoot, HoverCardTrigger } from ".";

const meta: Meta<typeof HoverCardRoot> = {
  title: "UI / Patterns / Menus / HoverCard",
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
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
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
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--tm-primary))]/10">
              <User className="h-6 w-6 text-[hsl(var(--tm-primary))]" />
            </div>
            <div className="space-y-xs">
              <h4 className="font-medium leading-none">John Doe</h4>
              <p className="text-sm text-[hsl(var(--tm-text-muted))]">@johndoe</p>
              <p className="text-sm">Software Engineer at Company</p>
            </div>
          </div>
          <div className="flex gap-md text-sm">
            <div className="flex items-center gap-xs">
              <Mail className="h-4 w-4 text-[hsl(var(--tm-text-muted))]" />
              <span className="text-[hsl(var(--tm-text-muted))]">1,234</span>
              <span className="text-[hsl(var(--tm-text-muted))]">followers</span>
            </div>
            <div className="flex items-center gap-xs">
              <User className="h-4 w-4 text-[hsl(var(--tm-text-muted))]" />
              <span className="text-[hsl(var(--tm-text-muted))]">567</span>
              <span className="text-[hsl(var(--tm-text-muted))]">following</span>
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
              <span className="text-sm text-[hsl(var(--tm-text-muted))]">Date</span>
              <span className="text-sm font-medium">Dec 21, 2024</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--tm-text-muted))]">Time</span>
              <span className="text-sm font-medium">3:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-[hsl(var(--tm-text-muted))]">Status</span>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              This is a primary variant hover card.
            </p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              This is a secondary variant hover card.
            </p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              This is an accent variant hover card.
            </p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">Compact content.</p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              Standard sized content with more space.
            </p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              This appears above the trigger.
            </p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">This appears to the right.</p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              This appears below the trigger.
            </p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">This appears to the left.</p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              Opens immediately and closes quickly.
            </p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              Opens and closes with longer delays.
            </p>
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
          <Button variant="outline" iconOnly>
            <Bell className="h-4 w-4" />
            <Badge className="absolute -right-1 -top-1 h-5 w-5 text-xs">3</Badge>
          </Button>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-sm">
          <div className="space-y-sm">
            <h4 className="font-medium">Notifications</h4>
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              You have 3 new notifications.
            </p>
          </div>
          <div className="space-y-sm">
            <div className="flex items-start gap-sm rounded-md bg-[hsl(var(--tm-muted))]/50 p-sm">
              <Bell className="mt-0.5 h-4 w-4 text-[hsl(var(--tm-primary))]" />
              <div className="space-y-xs">
                <p className="text-sm font-medium">New message</p>
                <p className="text-xs text-[hsl(var(--tm-text-muted))]">
                  You received a new message from John.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-sm rounded-md bg-[hsl(var(--tm-muted))]/50 p-sm">
              <Bell className="mt-0.5 h-4 w-4 text-accent" />
              <div className="space-y-xs">
                <p className="text-sm font-medium">Task completed</p>
                <p className="text-xs text-[hsl(var(--tm-text-muted))]">
                  Your task "Update documentation" is done.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-sm rounded-md bg-[hsl(var(--tm-muted))]/50 p-sm">
              <Bell className="mt-0.5 h-4 w-4 text-secondary" />
              <div className="space-y-xs">
                <p className="text-sm font-medium">Reminder</p>
                <p className="text-xs text-[hsl(var(--tm-text-muted))]">
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

/**
 * Matrix Story - REQUIRED for components with both variant AND size props
 * Shows all variants × all sizes grid
 */
export const Matrix: Story = {
  name: "Matrix",
  render: () => {
    const variants: Array<
      "primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive"
    > = ["primary", "secondary", "accent", "outline", "ghost", "link", "destructive"];
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

    return (
      <div className="space-y-lg">
        <div className="space-y-sm">
          <h3 className="text-lg font-semibold">HoverCard Matrix</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            All variants × all sizes. Each cell shows a hover card with that variant/size
            combination.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-muted))] p-sm text-left text-sm font-medium">
                  Variant / Size
                </th>
                {sizes.map((size) => (
                  <th
                    key={size}
                    className="border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-muted))] p-sm text-center text-sm font-medium"
                  >
                    {size}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {variants.map((variant) => (
                <tr key={variant}>
                  <td className="border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-muted))] p-sm text-sm font-medium">
                    {variant}
                  </td>
                  {sizes.map((size) => (
                    <td
                      key={size}
                      className="border border-[hsl(var(--tm-border-default))] p-md text-center"
                    >
                      <HoverCardRoot>
                        <HoverCardTrigger>
                          <Button size="sm" variant="outline">
                            {variant.slice(0, 3)}
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent variant={variant} size={size}>
                          <div className="space-y-xs">
                            <p className="text-sm font-medium">
                              {variant} / {size}
                            </p>
                            <p className="text-xs text-[hsl(var(--tm-text-muted))]">
                              HoverCard with variant="{variant}" size="{size}"
                            </p>
                          </div>
                        </HoverCardContent>
                      </HoverCardRoot>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Canonical Matrix story showing all possible combinations of variants and sizes. Required per VARIANTS_SIZE_CANON.md for components with both variant and size props.",
      },
    },
  },
};

/**
 * States Story - REQUIRED for interactive components
 * Shows all variants × all sizes × all states
 */
export const States: Story = {
  name: "States",
  render: () => (
    <div className="space-y-lg">
      <div className="space-y-md">
        <h3 className="text-lg font-semibold">All Variants</h3>
        <div className="flex flex-wrap gap-md">
          <HoverCardRoot>
            <HoverCardTrigger>
              <Button variant="primary">Primary</Button>
            </HoverCardTrigger>
            <HoverCardContent variant="primary">
              <div className="space-y-sm">
                <h4 className="font-medium">Primary HoverCard</h4>
                <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                  Primary variant hover card.
                </p>
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
                <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                  Secondary variant hover card.
                </p>
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
                <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                  Accent variant hover card.
                </p>
              </div>
            </HoverCardContent>
          </HoverCardRoot>

          <HoverCardRoot>
            <HoverCardTrigger>
              <Button variant="outline">Outline</Button>
            </HoverCardTrigger>
            <HoverCardContent variant="outline">
              <div className="space-y-sm">
                <h4 className="font-medium">Outline HoverCard</h4>
                <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                  Outline variant hover card.
                </p>
              </div>
            </HoverCardContent>
          </HoverCardRoot>

          <HoverCardRoot>
            <HoverCardTrigger>
              <Button variant="ghost">Ghost</Button>
            </HoverCardTrigger>
            <HoverCardContent variant="ghost">
              <div className="space-y-sm">
                <h4 className="font-medium">Ghost HoverCard</h4>
                <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                  Ghost variant hover card.
                </p>
              </div>
            </HoverCardContent>
          </HoverCardRoot>

          <HoverCardRoot>
            <HoverCardTrigger>
              <Button variant="ghost">Link</Button>
            </HoverCardTrigger>
            <HoverCardContent variant="link">
              <div className="space-y-sm">
                <h4 className="font-medium">Link HoverCard</h4>
                <p className="text-sm text-[hsl(var(--tm-text-muted))]">Link variant hover card.</p>
              </div>
            </HoverCardContent>
          </HoverCardRoot>

          <HoverCardRoot>
            <HoverCardTrigger>
              <Button variant="outline">Destructive</Button>
            </HoverCardTrigger>
            <HoverCardContent variant="destructive">
              <div className="space-y-sm">
                <h4 className="font-medium">Destructive HoverCard</h4>
                <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                  Destructive variant hover card.
                </p>
              </div>
            </HoverCardContent>
          </HoverCardRoot>
        </div>
      </div>

      <div className="space-y-md">
        <h3 className="text-lg font-semibold">Focus States</h3>
        <p className="text-sm text-[hsl(var(--tm-text-muted))]">
          Use{" "}
          <kbd className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5 font-mono text-xs">Tab</kbd>{" "}
          to focus buttons and see hover cards appear. Press{" "}
          <kbd className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5 font-mono text-xs">
            Escape
          </kbd>{" "}
          to dismiss.
        </p>
        <div className="flex gap-md">
          <HoverCardRoot>
            <HoverCardTrigger>
              <Button variant="primary">Primary (Focus)</Button>
            </HoverCardTrigger>
            <HoverCardContent variant="primary">
              <div className="space-y-sm">
                <h4 className="font-medium">Primary HoverCard</h4>
                <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                  Hover card for primary button.
                </p>
              </div>
            </HoverCardContent>
          </HoverCardRoot>

          <HoverCardRoot>
            <HoverCardTrigger>
              <Button variant="outline">Outline (Focus)</Button>
            </HoverCardTrigger>
            <HoverCardContent variant="outline">
              <div className="space-y-sm">
                <h4 className="font-medium">Outline HoverCard</h4>
                <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                  Hover card for outline button.
                </p>
              </div>
            </HoverCardContent>
          </HoverCardRoot>

          <HoverCardRoot>
            <HoverCardTrigger>
              <Button variant="ghost">Ghost (Focus)</Button>
            </HoverCardTrigger>
            <HoverCardContent variant="ghost">
              <div className="space-y-sm">
                <h4 className="font-medium">Ghost HoverCard</h4>
                <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                  Hover card for ghost button.
                </p>
              </div>
            </HoverCardContent>
          </HoverCardRoot>
        </div>
      </div>

      <div className="space-y-md">
        <h3 className="text-lg font-semibold">Controlled State</h3>
        <div className="flex gap-md">
          <HoverCardRoot open={true}>
            <HoverCardTrigger>
              <Button>Always Open</Button>
            </HoverCardTrigger>
            <HoverCardContent variant="primary">
              <div className="space-y-sm">
                <h4 className="font-medium">Controlled Open</h4>
                <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                  Hover card controlled to stay open.
                </p>
              </div>
            </HoverCardContent>
          </HoverCardRoot>

          <HoverCardRoot open={false}>
            <HoverCardTrigger>
              <Button>Always Closed</Button>
            </HoverCardTrigger>
            <HoverCardContent variant="primary">
              <div className="space-y-sm">
                <h4 className="font-medium">Controlled Closed</h4>
                <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                  Hover card controlled to stay closed.
                </p>
              </div>
            </HoverCardContent>
          </HoverCardRoot>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates all variants and states (default, focus, controlled). Required for interactive components per VARIANTS_SIZE_CANON.",
      },
    },
  },
};

/**
 * SizesGallery Story - REQUIRED for components with size prop
 * Shows all sizes with text/icon/multi-line content
 */
export const SizesGallery: Story = {
  name: "SizesGallery",
  render: () => {
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

    return (
      <div className="space-y-lg">
        <div className="space-y-sm">
          <h3 className="text-lg font-semibold">HoverCard Sizes Gallery</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            All supported sizes with different content types
          </p>
        </div>

        <div className="space-y-md">
          <div>
            <h4 className="mb-md text-md font-semibold">Text Content</h4>
            <div className="flex flex-wrap items-center gap-md">
              {sizes.map((size) => (
                <HoverCardRoot key={size}>
                  <HoverCardTrigger>
                    <Button size="sm" variant="outline">
                      {size}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent size={size}>
                    <div className="space-y-sm">
                      <h4 className="font-medium">{size} Size</h4>
                      <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                        This is a {size} hover card with text content.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCardRoot>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-md text-md font-semibold">With Icons</h4>
            <div className="flex flex-wrap items-center gap-md">
              {sizes.map((size) => (
                <HoverCardRoot key={size}>
                  <HoverCardTrigger>
                    <Button size="sm" variant="outline">
                      <User className="mr-sm h-4 w-4" />
                      {size}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent size={size}>
                    <div className="space-y-sm">
                      <div className="flex items-center gap-sm">
                        <User className="h-4 w-4 text-[hsl(var(--tm-primary))]" />
                        <h4 className="font-medium">{size} Size with Icon</h4>
                      </div>
                      <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                        Hover card with icon content.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCardRoot>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-md text-md font-semibold">Multi-line Content</h4>
            <div className="flex flex-wrap items-center gap-md">
              {sizes.map((size) => (
                <HoverCardRoot key={size}>
                  <HoverCardTrigger>
                    <Button size="sm" variant="outline">
                      {size}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent size={size}>
                    <div className="space-y-sm">
                      <h4 className="font-medium">{size} Multi-line</h4>
                      <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                        This is a {size} hover card with multi-line content. It demonstrates how the
                        hover card handles longer text content that wraps across multiple lines.
                      </p>
                      <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                        Additional paragraph to test spacing and layout with multiple text blocks.
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCardRoot>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "SizesGallery demonstrates all supported HoverCard sizes (sm, md, lg) with different content types: text, with icons, and multi-line content. This story is REQUIRED per SIZE_MAPPING_SPEC.md for sized components.",
      },
    },
  },
};

/**
 * LongContent Story - REQUIRED for overlay components
 * Validates padding and maxWidth token behavior with long text
 */
export const LongContent: Story = {
  name: "LongContent",
  render: () => (
    <div className="space-y-lg">
      <div className="space-y-sm">
        <h3 className="text-lg font-semibold">Long Content Validation</h3>
        <p className="text-sm text-[hsl(var(--tm-text-muted))]">
          Validates that hover card padding and maxWidth tokens work correctly with long text
          content. Required per VARIANTS_SIZE_CANON.md for overlay components.
        </p>
      </div>
      <div className="flex flex-wrap gap-md">
        {(["sm", "md", "lg"] as const).map((size) => (
          <HoverCardRoot key={size}>
            <HoverCardTrigger>
              <Button size="sm" variant="outline">
                {size} Size
              </Button>
            </HoverCardTrigger>
            <HoverCardContent size={size}>
              <div className="space-y-sm">
                <h4 className="font-semibold">Long Content Test ({size})</h4>
                <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                  This is a longer paragraph of text to validate that the hover card padding and
                  maxWidth tokens work correctly. The content should wrap naturally within the hover
                  card's width constraints, and the padding should remain consistent regardless of
                  content length. This helps ensure that the token-driven styling system is working
                  as expected for overlay components.
                </p>
                <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                  Additional paragraph to test multi-paragraph content. The spacing between
                  paragraphs should be consistent and the overall layout should remain readable even
                  with multiple blocks of text.
                </p>
              </div>
            </HoverCardContent>
          </HoverCardRoot>
        ))}
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Canonical LongContent story validating padding and maxWidth token behavior. Required per VARIANTS_SIZE_CANON.md for overlay components to ensure proper token-driven styling with varied content lengths.",
      },
    },
  },
};
