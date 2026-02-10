import { Stack } from "@/COMPOSITION/layout/Stack";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarGroup, type AvatarShape, type AvatarSize } from ".";

const meta: Meta<typeof Avatar> = {
  title: "Composition / Controls / Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Avatar displays user profile images with automatic fallback to initials or icon. Supports multiple sizes, shapes, and status indicators. Features enhanced accessibility with computed aria-labels.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    src: {
      control: "text",
      description: "Image source URL",
    },
    alt: {
      control: "text",
      description: "Alt text (required for accessibility, used to extract initials)",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      description: "Avatar size",
    },
    shape: {
      control: "select",
      options: ["circle", "square"],
      description: "Avatar shape",
    },
    status: {
      control: "select",
      options: [null, "online", "offline", "busy"],
      description: "Status indicator",
    },
    fallback: {
      control: "text",
      description: "Custom fallback content (overrides initials extraction)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

/**
 * Default Avatar with image
 */
export const Default: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    alt: "John Doe",
    size: "md",
  },
};

/**
 * Avatar with fallback initials (no image provided)
 */
export const WithInitials: Story = {
  args: {
    alt: "Jane Smith",
    size: "md",
  },
};

/**
 * Avatar with status indicator
 */
export const WithStatus: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    alt: "John Doe",
    size: "md",
    status: "online",
  },
};

/**
 * Matrix story: All size × shape combinations
 * 6 sizes × 2 shapes = 12 combinations
 */
export const Matrix: Story = {
  render: () => {
    const sizes: AvatarSize[] = ["xs", "sm", "md", "lg", "xl", "2xl"];
    const shapes: AvatarShape[] = ["circle", "square"];

    return (
      <Stack spacing="lg" className="p-4">
        <Heading level={2}>Avatar Matrix</Heading>
        <Text>All size and shape combinations</Text>

        {shapes.map((shape) => (
          <Stack key={shape} spacing="md">
            <Heading level={4}>{shape}</Heading>
            <div className="flex items-center gap-4">
              {sizes.map((size) => (
                <Stack key={size} spacing="sm" align="center">
                  <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                    alt="John Doe"
                    size={size}
                    shape={shape}
                  />
                  <Text size="sm" typographyRole="meta" color="muted">
                    {size}
                  </Text>
                </Stack>
              ))}
            </div>
          </Stack>
        ))}
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates all size and shape combinations for Avatar component.",
      },
    },
  },
};

/**
 * States story: Status indicators
 * Shows online, offline, busy, and no status
 */
export const States: Story = {
  render: () => {
    const statuses = [
      { status: "online" as const, label: "Online" },
      { status: "offline" as const, label: "Offline" },
      { status: "busy" as const, label: "Busy" },
      { status: null, label: "No Status" },
    ];

    return (
      <Stack spacing="lg" className="p-4">
        <Heading level={2}>Status Indicators</Heading>
        <Text>Avatar with different status indicators</Text>

        <div className="flex items-center gap-6">
          {statuses.map(({ status, label }) => (
            <Stack key={label} spacing="sm" align="center">
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                alt="John Doe"
                size="lg"
                status={status}
              />
              <Text size="sm" typographyRole="meta" color="muted">
                {label}
              </Text>
            </Stack>
          ))}
        </div>
      </Stack>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates status indicator variants: online (green), offline (gray), busy (yellow), and no status.",
      },
    },
  },
};

/**
 * SizesGallery Story (REQUIRED per VARIANTS_SIZE_CANON.md)
 *
 * Displays all Avatar sizes side-by-side for visual comparison.
 * Demonstrates image content, initials content, and custom fallback across all supported sizes.
 *
 * @canonical VARIANTS_SIZE_CANON - SizesGallery story (REQUIRED for components with size prop)
 * @axis size
 * @values xs, sm, md, lg, xl, 2xl
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes: AvatarSize[] = ["xs", "sm", "md", "lg", "xl", "2xl"];

    return (
      <Stack spacing="lg" className="p-4">
        <Heading level={2}>Avatar Sizes Gallery</Heading>
        <Text>All supported sizes with different content types</Text>

        <Stack spacing="md">
          <div>
            <Heading level={4}>With Image</Heading>
            <div className="flex flex-wrap items-center gap-md">
              {sizes.map((size) => (
                <Stack key={size} spacing="sm" align="center">
                  <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                    alt="John Doe"
                    size={size}
                  />
                  <Text size="sm" typographyRole="meta" color="muted">
                    {size}
                  </Text>
                </Stack>
              ))}
            </div>
          </div>

          <div>
            <Heading level={4}>With Initials (Fallback)</Heading>
            <div className="flex flex-wrap items-center gap-md">
              {sizes.map((size) => (
                <Stack key={size} spacing="sm" align="center">
                  <Avatar alt="John Doe" size={size} />
                  <Text size="sm" typographyRole="meta" color="muted">
                    {size}
                  </Text>
                </Stack>
              ))}
            </div>
          </div>

          <div>
            <Heading level={4}>With Custom Fallback</Heading>
            <div className="flex flex-wrap items-center gap-md">
              {sizes.map((size) => (
                <Stack key={size} spacing="sm" align="center">
                  <Avatar alt="User" fallback="?" size={size} />
                  <Text size="sm" typographyRole="meta" color="muted">
                    {size}
                  </Text>
                </Stack>
              ))}
            </div>
          </div>

          <div>
            <Heading level={4}>With Status Indicator</Heading>
            <div className="flex flex-wrap items-center gap-md">
              {sizes.map((size) => (
                <Stack key={size} spacing="sm" align="center">
                  <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                    alt="John Doe"
                    size={size}
                    status="online"
                  />
                  <Text size="sm" typographyRole="meta" color="muted">
                    {size}
                  </Text>
                </Stack>
              ))}
            </div>
          </div>
        </Stack>
      </Stack>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "SizesGallery demonstrates all supported Avatar sizes (xs, sm, md, lg, xl, 2xl) with different content types: image, initials fallback, custom fallback, and with status indicators. This story is REQUIRED per SIZE_MAPPING_SPEC.md for sized components.",
      },
    },
  },
};

/**
 * Fallback states: Image, initials, custom fallback
 */
export const FallbackStates: Story = {
  render: () => (
    <Stack spacing="lg" className="p-4">
      <Heading level={2}>Fallback States</Heading>
      <Text>Demonstrates different fallback behaviors</Text>

      <div className="flex items-center gap-6">
        <Stack spacing="sm" align="center">
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
            alt="John Doe"
            size="lg"
          />
          <Text size="sm" typographyRole="meta" color="muted">
            With Image
          </Text>
        </Stack>

        <Stack spacing="sm" align="center">
          <Avatar alt="Alice Brown" size="lg" />
          <Text size="sm" typographyRole="meta" color="muted">
            Initials (AB)
          </Text>
        </Stack>

        <Stack spacing="sm" align="center">
          <Avatar alt="Bob" size="lg" />
          <Text size="sm" typographyRole="meta" color="muted">
            Single Initial (B)
          </Text>
        </Stack>

        <Stack spacing="sm" align="center">
          <Avatar alt="User" fallback="?" size="lg" />
          <Text size="sm" typographyRole="meta" color="muted">
            Custom Fallback
          </Text>
        </Stack>
      </div>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Shows how Avatar handles different fallback scenarios: image loading, initials extraction, and custom fallback content.",
      },
    },
  },
};

/**
 * Image fails to load (forced fallback)
 */
export const ImageFailsToLoad: Story = {
  args: {
    src: "https://example.invalid/avatar.png",
    alt: "Broken Image",
    size: "lg",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Forces an image load failure to show the fallback behavior when the image cannot be loaded.",
      },
    },
  },
};

/**
 * NEW: Accessibility Demonstration (10/10 Feature)
 * Shows how aria-labels work with and without status
 */
export const AccessibilityDemo: Story = {
  render: () => (
    <Stack spacing="lg" className="max-w-3xl p-4">
      <Heading level={2}>Accessibility Features</Heading>
      <Text>
        Each Avatar has a computed aria-label for screen readers. Inspect the DOM or use a screen
        reader to hear the full context.
      </Text>

      <Stack
        spacing="md"
        className="rounded-lg border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-muted))]/30 p-6"
      >
        <Heading level={4}>Without Status</Heading>
        <Text size="sm" typographyRole="meta" color="muted">
          aria-label: "John Doe"
        </Text>
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
          alt="John Doe"
          size="lg"
        />
      </Stack>

      <Stack
        spacing="md"
        className="rounded-lg border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-muted))]/30 p-6"
      >
        <Heading level={4}>With Status: Online</Heading>
        <Text size="sm" typographyRole="meta" color="muted">
          aria-label: "Jane Smith (online)"
        </Text>
        <Avatar
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
          alt="Jane Smith"
          size="lg"
          status="online"
        />
      </Stack>

      <Stack
        spacing="md"
        className="rounded-lg border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-muted))]/30 p-6"
      >
        <Heading level={4}>With Status: Busy</Heading>
        <Text size="sm" typographyRole="meta" color="muted">
          aria-label: "Bob Wilson (busy)"
        </Text>
        <Avatar alt="Bob Wilson" size="lg" status="busy" />
      </Stack>

      <Stack
        spacing="md"
        className="rounded-lg border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-muted))]/30 p-6"
      >
        <Heading level={4}>With Status: Offline</Heading>
        <Text size="sm" typographyRole="meta" color="muted">
          aria-label: "Carol White (offline)"
        </Text>
        <Avatar alt="Carol White" size="lg" status="offline" />
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates how Avatar provides enhanced accessibility with computed aria-labels that include status information for screen readers.",
      },
    },
  },
};

/**
 * Realistic Example: User Profile Card
 */
export const UserProfileCard: Story = {
  render: () => (
    <div className="w-80 rounded-lg border border-[hsl(var(--tm-border-default))] bg-[hsl(var(--tm-surface-raised))] p-6">
      <Stack spacing="md" align="center">
        <Avatar
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
          alt="John Doe"
          size="2xl"
          status="online"
        />
        <Stack spacing="xs" align="center">
          <Heading level={4}>John Doe</Heading>
          <Text typographyRole="meta" color="muted">
            Senior Software Engineer
          </Text>
          <Text size="sm" typographyRole="meta" color="muted">
            San Francisco, CA
          </Text>
        </Stack>
      </Stack>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Real-world example: User profile card with large avatar and status indicator.",
      },
    },
  },
};

/**
 * Realistic Example: Comment Section
 */
export const CommentSection: Story = {
  render: () => (
    <Stack spacing="md" className="w-full max-w-2xl p-4">
      <Heading level={3}>Comments</Heading>

      {[
        { name: "Alice Johnson", comment: "Great article! Very insightful.", time: "2 hours ago" },
        { name: "Bob Smith", comment: "Thanks for sharing this information.", time: "5 hours ago" },
        { name: "Carol Williams", comment: "I have a question about...", time: "1 day ago" },
      ].map((item, i) => (
        <div key={i} className="flex gap-3">
          <Avatar alt={item.name} size="md" />
          <Stack spacing="xs" className="flex-1">
            <div className="flex items-center gap-2">
              <Text weight="medium">{item.name}</Text>
              <Text size="sm" typographyRole="meta" color="muted">
                {item.time}
              </Text>
            </div>
            <Text>{item.comment}</Text>
          </Stack>
        </div>
      ))}
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "Real-world example: Comment section with avatars next to each comment.",
      },
    },
  },
};

/**
 * AvatarGroup: Basic usage
 */
export const GroupBasic: Story = {
  render: () => (
    <Stack spacing="lg" className="p-4">
      <Heading level={2}>Avatar Group</Heading>
      <Text>Multiple avatars with overlap effect</Text>

      <AvatarGroup
        avatars={[
          {
            key: "user-1",
            src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            alt: "John Doe",
          },
          {
            key: "user-2",
            src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            alt: "Jane Smith",
          },
          {
            key: "user-3",
            src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
            alt: "Bob Wilson",
          },
          { key: "user-4", alt: "Alice Brown" },
        ]}
        size="md"
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "AvatarGroup displays multiple avatars with overlap effect. Note the use of `key` prop for proper React reconciliation.",
      },
    },
  },
};

/**
 * AvatarGroup with max count and overflow
 */
export const GroupWithOverflow: Story = {
  render: () => (
    <Stack spacing="lg" className="p-4">
      <Heading level={2}>Avatar Group with Overflow</Heading>
      <Text>Shows max 3 avatars, indicates +5 more</Text>

      <AvatarGroup
        avatars={[
          {
            key: "1",
            src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
            alt: "User 1",
          },
          {
            key: "2",
            src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
            alt: "User 2",
          },
          {
            key: "3",
            src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
            alt: "User 3",
          },
          { key: "4", alt: "User 4" },
          { key: "5", alt: "User 5" },
          { key: "6", alt: "User 6" },
          { key: "7", alt: "User 7" },
          { key: "8", alt: "User 8" },
        ]}
        max={3}
        size="md"
      />
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: "AvatarGroup with max prop limits visible avatars and shows remaining count (+N).",
      },
    },
  },
};

/**
 * AvatarGroup spacing variants
 */
export const GroupSpacing: Story = {
  render: () => (
    <Stack spacing="lg" className="p-4">
      <Heading level={2}>Avatar Group Spacing</Heading>
      <Text>Different spacing variants: tight, normal, loose</Text>

      <Stack spacing="md">
        {(["tight", "normal", "loose"] as const).map((spacing) => (
          <Stack key={spacing} spacing="sm">
            <Text weight="medium">{spacing}</Text>
            <AvatarGroup
              avatars={[
                {
                  key: "1",
                  src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
                  alt: "User 1",
                },
                {
                  key: "2",
                  src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                  alt: "User 2",
                },
                {
                  key: "3",
                  src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
                  alt: "User 3",
                },
              ]}
              spacing={spacing}
              size="md"
            />
          </Stack>
        ))}
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates different spacing options for AvatarGroup: tight (minimal overlap), normal (default), loose (wider spacing).",
      },
    },
  },
};

/**
 * Realistic Example: Team Members Grid
 */
export const TeamMembersGrid: Story = {
  render: () => (
    <Stack spacing="lg" className="w-full max-w-4xl p-4">
      <Heading level={2}>Team Members</Heading>

      <div className="grid grid-cols-3 gap-6">
        {[
          { name: "Alice Johnson", role: "CEO", status: "online" as const },
          { name: "Bob Smith", role: "CTO", status: "busy" as const },
          { name: "Carol Williams", role: "Designer", status: "online" as const },
          { name: "David Brown", role: "Developer", status: "offline" as const },
          { name: "Eve Davis", role: "Product Manager", status: "online" as const },
          { name: "Frank Miller", role: "Marketing", status: "busy" as const },
        ].map((member) => (
          <Stack
            key={member.name}
            spacing="sm"
            align="center"
            className="rounded-lg border border-[hsl(var(--tm-border-default))] p-4"
          >
            <Avatar alt={member.name} size="lg" status={member.status} />
            <Stack spacing="xs" align="center">
              <Text weight="medium">{member.name}</Text>
              <Text size="sm" typographyRole="meta" color="muted">
                {member.role}
              </Text>
            </Stack>
          </Stack>
        ))}
      </div>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Real-world example: Team members grid with avatars, names, roles, and status indicators.",
      },
    },
  },
};
