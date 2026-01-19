"use client";
import { Card } from "@/COMPOSITION/layout/Card";
import { Stack } from "@/COMPOSITION/layout/Stack";
import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./Link";

/**
 * Link Storybook Quality Gate
 *
 * @status PASSED
 * @date 2025-12-19
 * @task TUNG_FOUNDATION_LINK_STORYBOOK
 *
 * Quality Gate Requirements:
 * - One axis per story (variant, underline, state, composition)
 * - Comparative layout (all variants displayed simultaneously)
 * - Only public API used (no internal imports or Radix usage exposed)
 * - No navigation or routing logic
 * - No UX or business scenarios
 * - Neutral href used (#) with navigation disabled
 * - All Link variants displayed comparatively
 *
 * Stories Structure:
 * - Variants: 4 variants (text/default, secondary/muted, accent, destructive/danger)
 * - UnderlineModes: Variants demonstrating different underline behaviors
 * - States: Default and disabled states
 * - AsChild: Link always renders as anchor (composition demonstration)
 */

const meta: Meta<typeof Link> = {
  title: "UI / Primitives / Link",
  component: Link,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Link component for navigation and interactive text. Supports 9 canonical variants and 3 sizes. Default variant 'text' renders inline (inline-flex) for text and navigation links. Variant 'wrapper' is for layout wrapper use cases (block-level layout). Variant 'link' is deprecated (use 'wrapper' instead).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: [
        "primary",
        "secondary",
        "accent",
        "outline",
        "ghost",
        "text",
        "link",
        "wrapper",
        "destructive",
      ],
      description: "Link variant style",
      table: {
        type: { summary: "LinkVariant" },
        defaultValue: { summary: "text" },
      },
    },
    size: {
      control: { type: "select" },
      options: ["sm", "md", "lg"],
      description: "Link size",
      table: {
        type: { summary: "LinkSize" },
        defaultValue: { summary: "md" },
      },
    },
    disabled: {
      control: { type: "boolean" },
      description: "Disable link interaction",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

/**
 * Variants Story
 *
 * Displays Link variants simultaneously for visual comparison.
 * All variants use the same size (md) and content for fair comparison.
 *
 * @axis variant
 * @values text (default), secondary (muted), accent, destructive (danger)
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Link href="#" onClick={(e) => e.preventDefault()}>
        Link
      </Link>
      <Link variant="secondary" href="#" onClick={(e) => e.preventDefault()}>
        Link
      </Link>
      <Link variant="accent" href="#" onClick={(e) => e.preventDefault()}>
        Link
      </Link>
      <Link variant="destructive" href="#" onClick={(e) => e.preventDefault()}>
        Link
      </Link>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Link variants displayed side-by-side for visual comparison. Default variant='text' is inline (inline-flex). Same size (md) and content used for fair comparison. Navigation is disabled for Storybook demonstration.",
      },
    },
  },
};

/**
 * UnderlineModes Story
 *
 * Displays Link variants with different underline behaviors.
 * Shows variants that demonstrate always, hover, and none underline modes.
 *
 * @axis underline
 * @values always (primary variant), hover (text variant), none (secondary variant)
 */
export const UnderlineModes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Link variant="primary" href="#" onClick={(e) => e.preventDefault()}>
        Link
      </Link>
      <Link variant="text" href="#" onClick={(e) => e.preventDefault()}>
        Link
      </Link>
      <Link variant="secondary" href="#" onClick={(e) => e.preventDefault()}>
        Link
      </Link>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Link variants demonstrating different underline behaviors: primary (underline on hover), text (underline on hover, default inline), secondary (no underline). Note: variant='wrapper' is for wrapper use cases (block-level). Variant 'link' is deprecated (use 'wrapper' instead). Hover over links to see underline behavior.",
      },
    },
  },
};

/**
 * States Story
 *
 * Displays Link states (default, disabled) for visual comparison.
 * All states use the same variant (text, default) and size (md) for fair comparison.
 * Note: Hover and focus-visible are CSS states that require user interaction to observe.
 *
 * @axis state
 * @values default, disabled
 */
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Link href="#" onClick={(e) => e.preventDefault()}>
        Link
      </Link>
      <Link href="#" onClick={(e) => e.preventDefault()} disabled>
        Link
      </Link>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Link states displayed side-by-side for visual comparison. Same variant (text, default inline) and size (md) used for fair comparison. Hover and focus-visible states require user interaction to observe.",
      },
    },
  },
};

/**
 * Matrix Story
 *
 * Displays all variants x all sizes grid for comprehensive visual comparison.
 * REQUIRED per VARIANTS_SIZE_CANON.md when component has both size AND variant props.
 *
 * @axis variant x size
 * @values All 7 variants x All 3 sizes (21 combinations)
 */
export const Matrix: Story = {
  render: () => {
    const variants: Array<
      | "primary"
      | "secondary"
      | "accent"
      | "outline"
      | "ghost"
      | "text"
      | "link"
      | "wrapper"
      | "destructive"
    > = [
      "primary",
      "secondary",
      "accent",
      "outline",
      "ghost",
      "text",
      "link",
      "wrapper",
      "destructive",
    ];
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

    return (
      <div className="space-y-md">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-[hsl(var(--tm-border-default))] p-sm text-left">
                Variant / Size
              </th>
              {sizes.map((size) => (
                <th
                  key={size}
                  className="border border-[hsl(var(--tm-border-default))] p-sm text-center"
                >
                  {size.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {variants.map((variant) => (
              <tr key={variant}>
                <td className="border border-[hsl(var(--tm-border-default))] p-sm font-medium">
                  {variant}
                </td>
                {sizes.map((size) => (
                  <td
                    key={size}
                    className="border border-[hsl(var(--tm-border-default))] p-sm text-center"
                  >
                    <Link
                      variant={variant}
                      size={size}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      Link
                    </Link>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Matrix showing all Link variants x all sizes. This comprehensive grid demonstrates all 27 combinations (9 variants x 3 sizes) for visual comparison. Default variant='text' is inline (inline-flex), variant='wrapper' is block-level (block w-full) for wrapper use cases. Variant 'link' is deprecated (use 'wrapper' instead). Navigation is disabled for Storybook demonstration.",
      },
    },
  },
};

/**
 * SizesGallery Story
 *
 * Displays all supported sizes with text, icon, and multi-line content.
 * REQUIRED per SIZE_MAPPING_SPEC.md when component has public size prop.
 *
 * @axis size
 * @values sm, md, lg
 */
export const SizesGallery: Story = {
  render: () => {
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

    return (
      <div className="space-y-lg">
        {sizes.map((size) => (
          <div key={size} className="space-y-sm">
            <h3 className="text-sm font-medium">Size: {size.toUpperCase()}</h3>
            <div className="flex flex-wrap items-center gap-md">
              <Link href="#" size={size} onClick={(e) => e.preventDefault()}>
                Text Only
              </Link>
              <Link
                href="#"
                size={size}
                leftIcon={<span>L</span>}
                onClick={(e) => e.preventDefault()}
              >
                With Left Icon
              </Link>
              <Link
                href="#"
                size={size}
                rightIcon={<span>R</span>}
                onClick={(e) => e.preventDefault()}
              >
                With Right Icon
              </Link>
              <Link
                href="#"
                size={size}
                leftIcon={<span>L</span>}
                rightIcon={<span>R</span>}
                onClick={(e) => e.preventDefault()}
              >
                With Both Icons
              </Link>
              <div className="max-w-xs">
                <Link href="#" size={size} onClick={(e) => e.preventDefault()}>
                  Multi-line content that wraps to demonstrate size behavior with longer text
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  },
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "SizesGallery demonstrating all supported Link sizes (sm, md, lg) with various content types: text only, with left icon, with right icon, with both icons, and multi-line content. This demonstrates how size affects component dimensions and layout.",
      },
    },
  },
};

/**
 * Wrapper Story
 *
 * Demonstrates Link with variant='wrapper' wrapping layout content (Card).
 * This shows the block-level layout behavior for wrapper use cases.
 *
 * @axis composition
 * @values wrapper (block-level layout)
 */
export const Wrapper: Story = {
  render: () => (
    <div className="space-y-lg">
      <div>
        <h3 className="mb-sm text-sm font-medium">Wrapper Variant (Block-level)</h3>
        <div className="grid grid-cols-1 gap-md md:grid-cols-2">
          <Link href="#" variant="wrapper" onClick={(e) => e.preventDefault()}>
            <Card>
              <Card.Header>
                <Stack spacing="xs">
                  <h4 className="text-lg font-semibold">Event Title</h4>
                  <p className="text-sm text-[hsl(var(--tm-text-muted))]">Event description</p>
                </Stack>
              </Card.Header>
              <Card.Body>
                <Stack spacing="xs">
                  <p className="text-sm">
                    This card is wrapped by a Link with variant='wrapper'. The entire card is
                    clickable and uses block-level layout.
                  </p>
                </Stack>
              </Card.Body>
            </Card>
          </Link>
          <Link href="#" variant="wrapper" onClick={(e) => e.preventDefault()}>
            <Card>
              <Card.Header>
                <Stack spacing="xs">
                  <h4 className="text-lg font-semibold">Another Event</h4>
                  <p className="text-sm text-[hsl(var(--tm-text-muted))]">Another description</p>
                </Stack>
              </Card.Header>
              <Card.Body>
                <Stack spacing="xs">
                  <p className="text-sm">
                    Wrapper variant ensures proper width stretching in grid/flex containers.
                  </p>
                </Stack>
              </Card.Body>
            </Card>
          </Link>
        </div>
      </div>
      <div>
        <h3 className="mb-sm text-sm font-medium">Comparison: Text (Inline) vs Wrapper (Block)</h3>
        <div className="space-y-md">
          <div>
            <p className="mb-sm text-xs text-[hsl(var(--tm-text-muted))]">
              Text variant (default, inline-flex):
            </p>
            <Link href="#" onClick={(e) => e.preventDefault()}>
              This is an inline text link
            </Link>
          </div>
          <div>
            <p className="mb-sm text-xs text-[hsl(var(--tm-text-muted))]">
              Wrapper variant (block-level):
            </p>
            <Link href="#" variant="wrapper" onClick={(e) => e.preventDefault()}>
              <Card>
                <Card.Body>
                  <Stack spacing="xs">
                    <p className="text-sm">
                      This entire card is wrapped by Link with variant='wrapper'
                    </p>
                  </Stack>
                </Card.Body>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "padded",
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Link with variant='wrapper' wrapping Card components. Demonstrates block-level layout behavior for wrapper use cases. The wrapper variant uses 'block w-full' layout to properly stretch in grid/flex containers. Note: variant='link' is deprecated (use 'wrapper' instead).",
      },
    },
  },
};

/**
 * AsChild Story
 *
 * Demonstrates that Link always renders as an anchor element.
 * Link component does not support asChild prop - it always renders semantic <a> element.
 *
 * @axis composition
 * @values anchor (always)
 */
export const AsChild: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-md">
      <Link href="#" onClick={(e) => e.preventDefault()}>
        Link (anchor)
      </Link>
    </div>
  ),
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Link component always renders as a semantic <a> element. Link does not support asChild prop - it is designed exclusively for anchor-based navigation.",
      },
    },
  },
};
