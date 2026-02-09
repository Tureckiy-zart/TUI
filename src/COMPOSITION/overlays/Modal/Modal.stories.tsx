"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";

import { Modal } from "@/COMPOSITION/overlays/Modal";
import { Button } from "@/PRIMITIVES/Button";

// ============================================================================
// LOCAL HELPERS (Storybook only, not exported)
// ============================================================================

/**
 * ModalExample - local helper for stories
 * IMPORTANT: Storybook-only helper. Not exported from library and not part of public API.
 */
type ModalExampleProps = {
  title?: string;
  description?: string;
  footerAlign?: "left" | "center" | "right" | "between";
  size?: "sm" | "md" | "lg";
  width?: "auto" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  height?: "auto" | "sm" | "md" | "lg" | "xl" | "full";
  padding?: "xs" | "sm" | "md" | "lg" | "xl";
  radius?: "none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  surface?: "flat" | "raised" | "sunken" | "outline" | "subtle";
  headerGap?: "xs" | "sm" | "md" | "lg";
  footerGap?: "xs" | "sm" | "md" | "lg";
};

function ModalExample({
  title = "Modal title",
  description = "Modal description text",
  footerAlign = "right",
  size = "md",
  width,
  height,
  padding,
  radius,
  surface,
  headerGap,
  footerGap,
}: ModalExampleProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Trigger asChild>
        <Button>{title}</Button>
      </Modal.Trigger>

      <Modal.Content
        size={size}
        width={width}
        height={height}
        padding={padding}
        radius={radius}
        surface={surface}
      >
        <Modal.Header gap={headerGap}>
          <Modal.Title>{title}</Modal.Title>
          <Modal.Description>{description}</Modal.Description>
        </Modal.Header>

        <div className="py-4">
          <p>Modal content area.</p>
        </div>

        <Modal.Footer align={footerAlign} gap={footerGap}>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Confirm</Button>
        </Modal.Footer>

        <Modal.Close />
      </Modal.Content>
    </Modal.Root>
  );
}

/**
 * StoryGrid - vertical comparison (grid layout)
 * Inline styles are allowed here because this is Storybook layout, not a component.
 */
function StoryGrid({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gap: 24,
        maxWidth: 480,
      }}
    >
      {children}
    </div>
  );
}

/**
 * StoryRow - horizontal comparison (flex layout)
 * Inline styles are allowed here because this is Storybook layout, not a component.
 */
function StoryRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {children}
    </div>
  );
}

const meta: Meta<typeof Modal.Root> = {
  title: "Composition / Overlays / Modal",
  component: Modal.Root,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Modal component built on Radix Dialog for modal dialogs. Supports sizes (sm, md, lg), token-based visual props, keyboard navigation, focus trap, and full ARIA support. All behavior is handled by Radix Dialog; Tenerife UI provides visual styling through tokens only.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      control: { type: "boolean" },
      description: "Controlled open state",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "undefined" },
      },
    },
    defaultOpen: {
      control: { type: "boolean" },
      description: "Default open state (uncontrolled)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    modal: {
      control: { type: "boolean" },
      description: "Whether the dialog is modal (blocks interaction with other elements)",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal.Root>;

/**
 * Default Modal usage with default tokens (md size)
 */
export const Default: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Modal.Root open={open} onOpenChange={setOpen}>
          <Modal.Trigger className="rounded-md bg-[hsl(var(--tm-primary))] px-4 py-2 text-[hsl(var(--tm-primary-foreground))]">
            Open Modal
          </Modal.Trigger>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Modal Title</Modal.Title>
              <Modal.Description>This is a modal description.</Modal.Description>
            </Modal.Header>
            <div className="py-4">
              <p>This is the modal content.</p>
            </div>
            <Modal.Close />
          </Modal.Content>
        </Modal.Root>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic Modal usage with default tokens (md size). The close button (X icon) in the top-right corner is provided by `<Modal.Close />`.",
      },
    },
  },
};

// ============================================================================
// COMPARATIVE STORIES - Multiple Variants on One Page
// ============================================================================

/**
 * SizesGallery Story
 * Demonstrates all supported sizes with consistent content
 * REQUIRED: Component has size prop
 * Per VARIANTS_SIZE_CANON: overlay components restricted to sm | md | lg only
 */
export const SizesGallery: Story = {
  render: () => (
    <StoryGrid>
      <ModalExample title="Size SM" size="sm" />
      <ModalExample title="Size MD" size="md" />
      <ModalExample title="Size LG" size="lg" />
    </StoryGrid>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "All size variants (sm, md, lg) displayed together for comparison. Per VARIANTS_SIZE_CANON, overlay components are restricted to sm | md | lg only.",
      },
    },
  },
};

/**
 * States Story
 * Demonstrates all sizes in open state
 * REQUIRED: Component has interactive behavior (open/close states)
 * Per VARIANTS_SIZE_CANON: Required for components with public states/interactive behavior
 */
export const States: Story = {
  render: () => {
    const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

    return (
      <div className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">All Sizes (Open State)</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            Demonstrates all size variants in open state. Use keyboard navigation (Tab, Escape) to
            interact with modals.
          </p>
          <div className="space-y-4">
            {sizes.map((size) => (
              <Modal.Root key={size} defaultOpen>
                <Modal.Content size={size}>
                  <Modal.Header>
                    <Modal.Title>Modal {size.toUpperCase()}</Modal.Title>
                    <Modal.Description>
                      This is a {size} modal demonstrating open state and focus management.
                    </Modal.Description>
                  </Modal.Header>
                  <div className="py-4">
                    <p>Modal content for {size} size variant.</p>
                    <p className="mt-2 text-sm text-[hsl(var(--tm-text-muted))]">
                      Press{" "}
                      <kbd className="rounded bg-[hsl(var(--tm-muted))] px-1 py-0.5 font-mono text-xs">
                        Escape
                      </kbd>{" "}
                      to close or use the close button.
                    </p>
                  </div>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => {}}>
                      Cancel
                    </Button>
                    <Button onClick={() => {}}>Confirm</Button>
                  </Modal.Footer>
                  <Modal.Close />
                </Modal.Content>
              </Modal.Root>
            ))}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates all size variants (sm, md, lg) in open state. Validates focus management, keyboard navigation, and ARIA attributes. Required for interactive components per VARIANTS_SIZE_CANON.",
      },
    },
  },
};

// ============================================================================
// USAGE SCENARIOS
// ============================================================================

/**
 * LongContent Story
 * Validates padding and maxWidth token behavior with long text content
 * REQUIRED: For overlay components per VARIANTS_SIZE_CANON
 */
export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Modal.Root open={open} onOpenChange={setOpen}>
          <Modal.Trigger className="rounded-md bg-[hsl(var(--tm-primary))] px-4 py-2 text-[hsl(var(--tm-primary-foreground))]">
            Open Long Content Modal
          </Modal.Trigger>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>Long Content Modal</Modal.Title>
              <Modal.Description>
                This modal demonstrates padding and maxWidth token behavior with long text content.
              </Modal.Description>
            </Modal.Header>
            <div className="max-h-[60vh] overflow-y-auto py-4">
              <div className="space-y-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="rounded border p-4">
                    <h3 className="mb-2 font-semibold">Section {i + 1}</h3>
                    <p>
                      This is a long content section that demonstrates scrolling within the modal.
                      The content area has a maximum height and overflow-y-auto to enable scrolling
                      when content exceeds the available space. This validates that padding and
                      maxWidth tokens behave correctly with long text content.
                    </p>
                    <p className="mt-2">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                      nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Modal.Footer>
              <button
                className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </Modal.Footer>
            <Modal.Close />
          </Modal.Content>
        </Modal.Root>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Validates padding and maxWidth token behavior with long text content. Required for overlay components per VARIANTS_SIZE_CANON.",
      },
    },
  },
};

/**
 * VisualPropsGallery Story
 * Demonstrates all visual prop variants (width, height, surface, radius, padding, footer alignment, footer gaps, header gaps)
 * Consolidated gallery story for all visual customization options
 */
export const VisualPropsGallery: Story = {
  render: () => (
    <div className="space-y-12">
      {/* Width Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Width Variants</h3>
        <StoryGrid>
          <ModalExample title="Width Auto" width="auto" />
          <ModalExample title="Width SM" width="sm" />
          <ModalExample title="Width MD" width="md" />
          <ModalExample title="Width LG" width="lg" />
          <ModalExample title="Width XL" width="xl" />
          <ModalExample title="Width 2XL" width="2xl" />
          <ModalExample title="Width Full" width="full" />
        </StoryGrid>
      </div>

      {/* Height Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Height Variants</h3>
        <StoryGrid>
          <ModalExample title="Height Auto" height="auto" />
          <ModalExample title="Height SM" height="sm" />
          <ModalExample title="Height MD" height="md" />
          <ModalExample title="Height LG" height="lg" />
          <ModalExample title="Height XL" height="xl" />
          <ModalExample title="Height Full" height="full" />
        </StoryGrid>
      </div>

      {/* Surface Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Surface Variants</h3>
        <StoryRow>
          <ModalExample title="Surface Flat" surface="flat" />
          <ModalExample title="Surface Raised" surface="raised" />
          <ModalExample title="Surface Sunken" surface="sunken" />
          <ModalExample title="Surface Outline" surface="outline" />
          <ModalExample title="Surface Subtle" surface="subtle" />
        </StoryRow>
      </div>

      {/* Radius Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Radius Variants</h3>
        <StoryGrid>
          <ModalExample title="Radius None" radius="none" />
          <ModalExample title="Radius XS" radius="xs" />
          <ModalExample title="Radius SM" radius="sm" />
          <ModalExample title="Radius MD" radius="md" />
          <ModalExample title="Radius LG" radius="lg" />
          <ModalExample title="Radius XL" radius="xl" />
          <ModalExample title="Radius 2XL" radius="2xl" />
          <ModalExample title="Radius 3XL" radius="3xl" />
          <ModalExample title="Radius Full" radius="full" />
        </StoryGrid>
      </div>

      {/* Padding Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Padding Variants</h3>
        <StoryGrid>
          <ModalExample title="Padding XS" padding="xs" />
          <ModalExample title="Padding SM" padding="sm" />
          <ModalExample title="Padding MD" padding="md" />
          <ModalExample title="Padding LG" padding="lg" />
          <ModalExample title="Padding XL" padding="xl" />
        </StoryGrid>
      </div>

      {/* Footer Alignment Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Footer Alignment Variants</h3>
        <StoryRow>
          <ModalExample title="Footer Left" footerAlign="left" />
          <ModalExample title="Footer Center" footerAlign="center" />
          <ModalExample title="Footer Right" footerAlign="right" />
          <ModalExample title="Footer Between" footerAlign="between" />
        </StoryRow>
      </div>

      {/* Footer Gap Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Footer Gap Variants</h3>
        <StoryRow>
          <ModalExample title="Footer Gap XS" footerGap="xs" />
          <ModalExample title="Footer Gap SM" footerGap="sm" />
          <ModalExample title="Footer Gap MD" footerGap="md" />
          <ModalExample title="Footer Gap LG" footerGap="lg" />
        </StoryRow>
      </div>

      {/* Header Gap Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Header Gap Variants</h3>
        <StoryRow>
          <ModalExample title="Header Gap XS" headerGap="xs" />
          <ModalExample title="Header Gap SM" headerGap="sm" />
          <ModalExample title="Header Gap MD" headerGap="md" />
          <ModalExample title="Header Gap LG" headerGap="lg" />
        </StoryRow>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Comprehensive gallery of all visual prop variants: width, height, surface, radius, padding, footer alignment, footer gaps, and header gaps. All variants displayed together for comparison.",
      },
    },
  },
};

/**
 * StateManagement Story
 * Demonstrates both controlled and uncontrolled state management approaches
 * Shows side-by-side comparison of open/onOpenChange vs defaultOpen patterns
 */
export const StateManagement: Story = {
  render: () => {
    const [controlledOpen, setControlledOpen] = React.useState(false);

    return (
      <div className="space-y-12">
        {/* Controlled Example */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Controlled Modal</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            The open state is managed externally using the open and onOpenChange props. You can
            control the modal from outside the component.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <button
                className="rounded-md bg-[hsl(var(--tm-primary))] px-4 py-2 text-[hsl(var(--tm-primary-foreground))]"
                onClick={() => setControlledOpen(true)}
              >
                Open Controlled Modal
              </button>
              <button
                className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                onClick={() => setControlledOpen(false)}
              >
                Close Controlled Modal
              </button>
            </div>
            <p className="text-sm">Modal is {controlledOpen ? "open" : "closed"}</p>
          </div>
          <Modal.Root open={controlledOpen} onOpenChange={setControlledOpen}>
            <Modal.Content size="md">
              <Modal.Header>
                <Modal.Title>Controlled Modal</Modal.Title>
                <Modal.Description>
                  This modal is controlled by external state. The open state is managed outside the
                  Modal component.
                </Modal.Description>
              </Modal.Header>
              <div className="py-4">
                <p>
                  You can control this modal from outside using the open and onOpenChange props.
                </p>
              </div>
              <Modal.Footer>
                <button
                  className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                  onClick={() => setControlledOpen(false)}
                >
                  Close
                </button>
              </Modal.Footer>
              <Modal.Close />
            </Modal.Content>
          </Modal.Root>
        </div>

        {/* Uncontrolled Example */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Uncontrolled Modal</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            The open state is managed internally by the Modal component using the defaultOpen prop.
            The component handles its own state.
          </p>
          <Modal.Root defaultOpen={false}>
            <Modal.Trigger className="rounded-md bg-[hsl(var(--tm-primary))] px-4 py-2 text-[hsl(var(--tm-primary-foreground))]">
              Open Uncontrolled Modal
            </Modal.Trigger>
            <Modal.Content size="md">
              <Modal.Header>
                <Modal.Title>Uncontrolled Modal</Modal.Title>
                <Modal.Description>
                  This modal uses defaultOpen prop for uncontrolled state management. The Modal
                  component manages its own open state internally.
                </Modal.Description>
              </Modal.Header>
              <div className="py-4">
                <p>
                  This modal manages its own state. You can control the initial state using the
                  defaultOpen prop.
                </p>
              </div>
              <Modal.Close />
            </Modal.Content>
          </Modal.Root>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates both controlled and uncontrolled state management approaches. Controlled modals use open/onOpenChange props for external state management. Uncontrolled modals use defaultOpen prop and manage state internally.",
      },
    },
  },
};

/**
 * ClosePrevention Story
 * Demonstrates all methods to prevent modal from closing (Escape key, outside click, outside interaction)
 * Shows how to use onEscapeKeyDown, onPointerDownOutside, and onInteractOutside handlers
 */
export const ClosePrevention: Story = {
  render: () => {
    const [escapeOpen, setEscapeOpen] = React.useState(false);
    const [outsideClickOpen, setOutsideClickOpen] = React.useState(false);
    const [outsideInteractionOpen, setOutsideInteractionOpen] = React.useState(false);

    return (
      <div className="space-y-12">
        {/* Prevent Close on Escape */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Prevent Close on Escape</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            Prevents closing when Escape key is pressed. Uses onEscapeKeyDown to prevent default
            behavior.
          </p>
          <Modal.Root open={escapeOpen} onOpenChange={setEscapeOpen}>
            <Modal.Trigger className="rounded-md bg-[hsl(var(--tm-primary))] px-4 py-2 text-[hsl(var(--tm-primary-foreground))]">
              Open Prevent Escape Modal
            </Modal.Trigger>
            <Modal.Content
              size="md"
              onEscapeKeyDown={(e) => {
                e.preventDefault();
                alert(
                  "Escape key pressed, but modal will not close. Use the close button instead.",
                );
              }}
            >
              <Modal.Header>
                <Modal.Title>Prevent Close on Escape</Modal.Title>
                <Modal.Description>
                  This modal prevents closing when Escape key is pressed. Use the close button
                  instead.
                </Modal.Description>
              </Modal.Header>
              <div className="py-4">
                <p>
                  Try pressing Escape - the modal will not close. Use the close button (X) instead.
                </p>
              </div>
              <Modal.Footer>
                <button
                  className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                  onClick={() => setEscapeOpen(false)}
                >
                  Close
                </button>
              </Modal.Footer>
              <Modal.Close />
            </Modal.Content>
          </Modal.Root>
        </div>

        {/* Prevent Close on Outside Click */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Prevent Close on Outside Click</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            Prevents closing when clicking outside. Uses onPointerDownOutside to prevent default
            behavior.
          </p>
          <Modal.Root open={outsideClickOpen} onOpenChange={setOutsideClickOpen}>
            <Modal.Trigger className="rounded-md bg-[hsl(var(--tm-primary))] px-4 py-2 text-[hsl(var(--tm-primary-foreground))]">
              Open Prevent Outside Click Modal
            </Modal.Trigger>
            <Modal.Content
              size="md"
              onPointerDownOutside={(e) => {
                e.preventDefault();
                alert(
                  "Click outside detected, but modal will not close. Use the close button instead.",
                );
              }}
            >
              <Modal.Header>
                <Modal.Title>Prevent Close on Outside Click</Modal.Title>
                <Modal.Description>
                  This modal prevents closing when clicking outside. Use the close button instead.
                </Modal.Description>
              </Modal.Header>
              <div className="py-4">
                <p>
                  Try clicking outside the modal - it will not close. Use the close button (X)
                  instead.
                </p>
              </div>
              <Modal.Footer>
                <button
                  className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                  onClick={() => setOutsideClickOpen(false)}
                >
                  Close
                </button>
              </Modal.Footer>
              <Modal.Close />
            </Modal.Content>
          </Modal.Root>
        </div>

        {/* Prevent Close on Outside Interaction */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Prevent Close on Outside Interaction</h3>
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            Prevents closing on any outside interaction (click, touch, etc.). Uses onInteractOutside
            to prevent default behavior.
          </p>
          <Modal.Root open={outsideInteractionOpen} onOpenChange={setOutsideInteractionOpen}>
            <Modal.Trigger className="rounded-md bg-[hsl(var(--tm-primary))] px-4 py-2 text-[hsl(var(--tm-primary-foreground))]">
              Open Prevent Outside Interaction Modal
            </Modal.Trigger>
            <Modal.Content
              size="md"
              onInteractOutside={(e) => {
                e.preventDefault();
                alert(
                  "Outside interaction detected, but modal will not close. Use the close button instead.",
                );
              }}
            >
              <Modal.Header>
                <Modal.Title>Prevent Close on Outside Interaction</Modal.Title>
                <Modal.Description>
                  This modal prevents closing on any outside interaction (click, touch, etc.). Use
                  the close button instead.
                </Modal.Description>
              </Modal.Header>
              <div className="py-4">
                <p>
                  Try interacting outside the modal - it will not close. Use the close button (X)
                  instead.
                </p>
              </div>
              <Modal.Footer>
                <button
                  className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                  onClick={() => setOutsideInteractionOpen(false)}
                >
                  Close
                </button>
              </Modal.Footer>
              <Modal.Close />
            </Modal.Content>
          </Modal.Root>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates all methods to prevent modal from closing: onEscapeKeyDown (prevents Escape key), onPointerDownOutside (prevents outside click), and onInteractOutside (prevents any outside interaction). All three approaches shown together for comparison.",
      },
    },
  },
};

/**
 * WithBody Story
 * Demonstrates Modal.Body governed slot for scroll and padding
 * Shows canonical usage pattern with Header -> Body -> Footer structure
 */
export const WithBody: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Modal.Root open={open} onOpenChange={setOpen}>
          <Modal.Trigger className="rounded-md bg-[hsl(var(--tm-primary))] px-4 py-2 text-[hsl(var(--tm-primary-foreground))]">
            Open Modal with Body
          </Modal.Trigger>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>Modal with Body Slot</Modal.Title>
              <Modal.Description>
                This modal demonstrates the optional Modal.Body slot that provides governed scroll
                and padding for body content.
              </Modal.Description>
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-4">
                {Array.from({ length: 20 }, (_, i) => (
                  <div key={i} className="rounded border p-4">
                    <h3 className="mb-2 font-semibold">Section {i + 1}</h3>
                    <p>
                      This content is wrapped in Modal.Body, which provides governed scroll
                      container (overflow-y-auto) and tokenized vertical padding (py-md).
                    </p>
                    <p className="mt-2">
                      The Body slot centralizes scroll and padding ownership, eliminating the need
                      for manual wrapper divs. Header and Footer remain fixed (non-scrollable).
                    </p>
                  </div>
                ))}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </Modal.Footer>
            <Modal.Close />
          </Modal.Content>
        </Modal.Root>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates Modal.Body governed slot that provides canonical scroll container and padding separation from Header/Footer. Body is optional; legacy manual wrappers remain supported.",
      },
    },
  },
};

/**
 * Modal with form content
 */
export const WithForm: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    const [formData, setFormData] = React.useState({ name: "", email: "", message: "" });

    return (
      <>
        <Modal.Root open={open} onOpenChange={setOpen}>
          <Modal.Trigger className="rounded-md bg-[hsl(var(--tm-primary))] px-4 py-2 text-[hsl(var(--tm-primary-foreground))]">
            Open Form Modal
          </Modal.Trigger>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>Contact Form</Modal.Title>
              <Modal.Description>Fill out the form below to contact us.</Modal.Description>
            </Modal.Header>
            <form
              className="space-y-4 py-4"
              onSubmit={(e) => {
                e.preventDefault();
                alert(`Form submitted: ${JSON.stringify(formData, null, 2)}`);
                setOpen(false);
              }}
            >
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full rounded-md border px-3 py-2"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-md border px-3 py-2"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  className="w-full rounded-md border px-3 py-2"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <Modal.Footer>
                <button
                  type="button"
                  className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-[hsl(var(--tm-primary))] px-4 py-2 text-[hsl(var(--tm-primary-foreground))]"
                >
                  Submit
                </button>
              </Modal.Footer>
            </form>
            <Modal.Close />
          </Modal.Content>
        </Modal.Root>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Modal with form content. Demonstrates form handling within a modal dialog.",
      },
    },
  },
};

/**
 * Confirmation dialog modal
 */
export const ConfirmationDialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <Modal.Root open={open} onOpenChange={setOpen}>
          <Modal.Trigger className="rounded-md bg-[hsl(var(--tm-primary))] px-4 py-2 text-[hsl(var(--tm-primary-foreground))]">
            Open Confirmation Dialog
          </Modal.Trigger>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>Delete Item</Modal.Title>
              <Modal.Description>
                Are you sure you want to delete this item? This action cannot be undone.
              </Modal.Description>
            </Modal.Header>
            <div className="py-4">
              <p>This is a destructive action that requires confirmation.</p>
            </div>
            <Modal.Footer align="right">
              <button
                className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="rounded-md bg-[hsl(var(--tm-destructive))] px-4 py-2 text-destructive-foreground"
                onClick={() => {
                  alert("Item deleted!");
                  setOpen(false);
                }}
              >
                Delete
              </button>
            </Modal.Footer>
            <Modal.Close />
          </Modal.Content>
        </Modal.Root>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Confirmation dialog modal. Typically used for destructive actions that require user confirmation.",
      },
    },
  },
};

/**
 * Non-modal dialog that doesn't block interaction
 */
export const NonModal: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <>
        <div className="space-y-4">
          <p className="text-sm text-[hsl(var(--tm-text-muted))]">
            This is background content. When the modal is open, you can still interact with this
            content because modal=false.
          </p>
          <button
            className="rounded-md bg-secondary px-4 py-2 text-secondary-foreground"
            onClick={() => alert("Background button clicked!")}
          >
            Click Background Button
          </button>
        </div>
        <Modal.Root open={open} onOpenChange={setOpen} modal={false}>
          <Modal.Trigger className="rounded-md bg-[hsl(var(--tm-primary))] px-4 py-2 text-[hsl(var(--tm-primary-foreground))]">
            Open Non-Modal
          </Modal.Trigger>
          <Modal.Content size="md">
            <Modal.Header>
              <Modal.Title>Non-Modal Dialog</Modal.Title>
              <Modal.Description>
                This dialog does not block interaction with background elements (modal=false).
              </Modal.Description>
            </Modal.Header>
            <div className="py-4">
              <p>You can still interact with background content while this dialog is open.</p>
            </div>
            <Modal.Close />
          </Modal.Content>
        </Modal.Root>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Non-modal dialog that does not block interaction with background elements. Set modal=false to allow background interaction.",
      },
    },
  },
};
