import { Box } from "@/COMPOSITION/layout/Box";
import { Card, CardBody, CardHeader } from "@/COMPOSITION/layout/Card";
import { Badge } from "@/PRIMITIVES/Badge";
import { Button } from "@/PRIMITIVES/Button";
import { Heading } from "@/PRIMITIVES/Heading";
import { Input } from "@/PRIMITIVES/Input";
import { Label } from "@/PRIMITIVES/Label";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bell, Settings, User } from "lucide-react";
import { PopoverWrapper } from "./Popover";

const meta: Meta<typeof PopoverWrapper> = {
  title: "Composition / Overlays / Popover",
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
        <p className="text-sm text-[hsl(var(--tm-text-muted))]">
          Configure your application settings here.
        </p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              Update your profile information.
            </p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">This is a primary popover.</p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">This is an accent popover.</p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">This is a secondary popover.</p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              This is a destructive popover.
            </p>
          </div>
        }
      >
        <Button variant="outline">Destructive</Button>
      </PopoverWrapper>

      <PopoverWrapper
        variant="outline"
        content={
          <div className="space-y-sm">
            <h4 className="font-medium">Outline Popover</h4>
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">This is an outline popover.</p>
          </div>
        }
      >
        <Button variant="outline">Outline</Button>
      </PopoverWrapper>

      <PopoverWrapper
        variant="ghost"
        content={
          <div className="space-y-sm">
            <h4 className="font-medium">Ghost Popover</h4>
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">This is a ghost popover.</p>
          </div>
        }
      >
        <Button variant="ghost">Ghost</Button>
      </PopoverWrapper>

      <PopoverWrapper
        variant="link"
        content={
          <div className="space-y-sm">
            <h4 className="font-medium">Link Popover</h4>
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">This is a link popover.</p>
          </div>
        }
      >
        <Button variant="ghost">Link</Button>
      </PopoverWrapper>
    </div>
  ),
};

export const DifferentSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-md">
      <PopoverWrapper
        size="sm"
        content={
          <div className="space-y-sm">
            <h4 className="font-medium">Small Popover</h4>
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">Compact content.</p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              Standard sized content with more space.
            </p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              This appears above the trigger.
            </p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">This appears to the right.</p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">
              This appears below the trigger.
            </p>
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
            <p className="text-sm text-[hsl(var(--tm-text-muted))]">This appears to the left.</p>
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
            <Heading level={4}>
              <Settings className="h-4 w-4" />
              Quick Settings
            </Heading>
          </CardHeader>
          <CardBody className="space-y-sm">
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
          </CardBody>
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
      }
    >
      <Button variant="outline" iconOnly aria-label="Notifications">
        <Bell className="h-4 w-4" />
        <Box className="absolute -right-1 -top-1 h-5 w-5 text-xs">
          <Badge>3</Badge>
        </Box>
      </Button>
    </PopoverWrapper>
  ),
};

export const KeyboardAccessibility: Story = {
  name: "Keyboard Accessibility",
  render: () => (
    <div className="space-y-md">
      <p className="text-sm text-[hsl(var(--tm-text-muted))]">
        Use{" "}
        <kbd className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5 font-mono text-xs">Tab</kbd>{" "}
        to focus buttons,{" "}
        <kbd className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5 font-mono text-xs">Enter</kbd>{" "}
        or{" "}
        <kbd className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5 font-mono text-xs">Space</kbd>{" "}
        to open popovers, and{" "}
        <kbd className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5 font-mono text-xs">
          Escape
        </kbd>{" "}
        to close.
      </p>
      <div className="flex gap-md">
        <PopoverWrapper
          content={
            <div className="space-y-sm">
              <h4 className="font-medium">Keyboard Accessible Popover</h4>
              <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                This popover is fully accessible via keyboard. All interactive elements inside can
                be navigated with Tab.
              </p>
            </div>
          }
        >
          <Button>Open with Keyboard</Button>
        </PopoverWrapper>
        <PopoverWrapper
          content={
            <div className="space-y-sm">
              <h4 className="font-medium">Focus Management</h4>
              <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                Focus automatically moves to popover content when opened, and returns to trigger
                when closed.
              </p>
            </div>
          }
        >
          <Button>Focus Managed</Button>
        </PopoverWrapper>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates keyboard accessibility. Popovers can be opened with Enter/Space, navigated with Tab, and closed with Escape. Focus is automatically managed.",
      },
    },
  },
};

export const ModalVsNonModal: Story = {
  name: "Modal vs Non-Modal",
  render: () => (
    <div className="space-y-md">
      <p className="text-sm text-[hsl(var(--tm-text-muted))]">
        Modal popovers trap focus and block interaction with other elements. Non-modal popovers
        allow interaction with the rest of the page.
      </p>
      <div className="flex gap-md">
        <PopoverWrapper
          modal={true}
          content={
            <div className="space-y-sm">
              <h4 className="font-medium">Modal Popover</h4>
              <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                This popover has role="dialog" and aria-modal="true". Focus is trapped inside.
              </p>
            </div>
          }
        >
          <Button>Modal (ARIA dialog)</Button>
        </PopoverWrapper>
        <PopoverWrapper
          modal={false}
          content={
            <div className="space-y-sm">
              <h4 className="font-medium">Non-Modal Popover</h4>
              <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                This popover does not trap focus. You can interact with other elements while it's
                open.
              </p>
            </div>
          }
        >
          <Button>Non-Modal</Button>
        </PopoverWrapper>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Shows the difference between modal and non-modal popovers. Modal popovers use role='dialog' and trap focus, while non-modal popovers allow interaction with the rest of the page.",
      },
    },
  },
};

// Canonical Stories (Required per VARIANTS_SIZE_CANON.md)

/**
 * Matrix Story - REQUIRED for components with BOTH variant AND size props
 * Shows all variants × all sizes in a grid layout
 */
export const Matrix: Story = {
  name: "Matrix (Variants × Sizes)",
  render: () => {
    const variants: Array<
      "primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive"
    > = ["primary", "secondary", "accent", "outline", "ghost", "link", "destructive"];
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

    return (
      <div className="space-y-lg">
        <div className="space-y-sm">
          <h3 className="text-lg font-semibold">Popover Matrix</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            All variants × all sizes. Each cell shows a popover with that variant/size combination.
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
                      <PopoverWrapper
                        variant={variant}
                        size={size}
                        content={
                          <div className="space-y-xs">
                            <p className="text-sm font-medium">
                              {variant} / {size}
                            </p>
                            <p className="text-xs text-[hsl(var(--tm-text-muted))]">
                              Popover with variant="{variant}" size="{size}"
                            </p>
                          </div>
                        }
                      >
                        <Button size="sm" variant="outline">
                          {variant.slice(0, 3)}
                        </Button>
                      </PopoverWrapper>
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
 * LongContent Story - REQUIRED for overlay components
 * Validates padding and maxWidth token behavior with long text
 */
export const LongContent: Story = {
  name: "LongContent (Overlay Validation)",
  render: () => (
    <div className="space-y-lg">
      <div className="space-y-sm">
        <h3 className="text-lg font-semibold">Long Content Validation</h3>
        <p className="text-sm text-[hsl(var(--tm-text-muted))]">
          Validates that popover padding and maxWidth tokens work correctly with long text content.
          Required per VARIANTS_SIZE_CANON.md for overlay components.
        </p>
      </div>
      <div className="flex flex-wrap gap-md">
        {(["sm", "md", "lg"] as const).map((size) => (
          <PopoverWrapper
            key={size}
            size={size}
            content={
              <div className="space-y-sm">
                <h4 className="font-semibold">Long Content Test ({size})</h4>
                <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                  This is a longer paragraph of text to validate that the popover padding and
                  maxWidth tokens work correctly. The content should wrap naturally within the
                  popover's width constraints, and the padding should remain consistent regardless
                  of content length. This helps ensure that the token-driven styling system is
                  working as expected for overlay components.
                </p>
                <p className="text-sm text-[hsl(var(--tm-text-muted))]">
                  Additional paragraph to test multi-paragraph content. The spacing between
                  paragraphs should be consistent and the overall layout should remain readable even
                  with multiple blocks of text.
                </p>
              </div>
            }
          >
            <Button size="sm" variant="outline">
              {size} Size
            </Button>
          </PopoverWrapper>
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
