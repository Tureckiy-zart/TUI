"use client";

import { Box } from "@/COMPOSITION/layout";
import { Button } from "@/PRIMITIVES/Button";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Drawer } from "./Drawer";
import type { DrawerSize } from "./Drawer.types";

const meta: Meta<typeof Drawer> = {
  title: "UI / Composition / Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Token-driven drawer overlay component with focus trap, keyboard controls, and portal rendering. Supports left, right, and bottom positions with size variants (sm, md, lg).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    open: {
      description: "Whether drawer is open",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
      },
    },
    onClose: {
      description: "Callback when drawer should close",
      action: "onClose",
      table: {
        type: { summary: "() => void" },
      },
    },
    position: {
      description: "Drawer position variant",
      control: "select",
      options: ["left", "right", "bottom"],
      table: {
        type: { summary: '"left" | "right" | "bottom"' },
        defaultValue: { summary: '"right"' },
      },
    },
    size: {
      description: "Drawer size variant",
      control: "select",
      options: ["sm", "md", "lg"],
      table: {
        type: { summary: '"sm" | "md" | "lg"' },
        defaultValue: { summary: '"md"' },
      },
    },
    backdropVariant: {
      description: "Backdrop variant",
      control: "select",
      options: ["default", "blurred", "transparent"],
      table: {
        type: { summary: '"default" | "blurred" | "transparent"' },
        defaultValue: { summary: '"default"' },
      },
    },
    closeOnBackdropClick: {
      description: "Whether to close on backdrop click",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    closeOnEscape: {
      description: "Whether to close on escape key",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    returnFocusRef: {
      description: "Element to return focus to when drawer closes",
      control: false,
      table: {
        type: { summary: "React.RefObject<HTMLElement>" },
      },
    },
    titleId: {
      description: "ID for the drawer title (for aria-labelledby)",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    descriptionId: {
      description: "ID for the drawer description (for aria-describedby)",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    children: {
      description: "Drawer content",
      control: false,
      table: {
        type: { summary: "React.ReactNode" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Drawer>;

/**
 * Default Drawer usage with default props.
 * Demonstrates basic drawer functionality with header, body, and footer sections.
 */
export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Drawer</Button>
        <Drawer open={open} onClose={() => setOpen(false)} titleId="drawer-title">
          <Drawer.Header>
            <Heading level={3} id="drawer-title">
              Drawer Title
            </Heading>
            <Text size="sm" tone="muted">
              This is a drawer description
            </Text>
          </Drawer.Header>
          <Drawer.Body>
            <Text>Drawer content goes here. This is the main content area.</Text>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Confirm</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Basic drawer usage with default props (position: right, size: md). Demonstrates header, body, and footer sections.",
      },
    },
  },
};

/**
 * SizesGallery story (REQUIRED by VARIANTS_SIZE_CANON)
 * Demonstrates all size variants (sm, md, lg).
 * Reference: [VARIANTS_SIZE_CANON.md](../../../../docs/architecture/VARIANTS_SIZE_CANON.md)
 */
export const SizesGallery: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState<DrawerSize>("md");

    const sizes: DrawerSize[] = ["sm", "md", "lg"];

    return (
      <>
        <div className="flex gap-md">
          {sizes.map((s) => (
            <Button
              key={s}
              onClick={() => {
                setSize(s);
                setOpen(true);
              }}
            >
              Open {s.toUpperCase()} Drawer
            </Button>
          ))}
        </div>
        <Drawer open={open} onClose={() => setOpen(false)} size={size} titleId="sizes-drawer-title">
          <Drawer.Header>
            <Heading level={3} id="sizes-drawer-title">
              {size.toUpperCase()} Size Drawer
            </Heading>
          </Drawer.Header>
          <Drawer.Body>
            <Text>This drawer uses size variant: {size}</Text>
          </Drawer.Body>
          <Drawer.Footer>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Canonical SizesGallery Story:** Demonstrates all size variants (sm, md, lg). Required per VARIANTS_SIZE_CANON.md for components with size props.",
      },
    },
  },
};

/**
 * States story (REQUIRED by VARIANTS_SIZE_CANON)
 * Demonstrates drawer states: open/close, backdrop variants.
 * Reference: [VARIANTS_SIZE_CANON.md](../../../../docs/architecture/VARIANTS_SIZE_CANON.md)
 */
export const States: Story = {
  render: () => {
    const [openDefault, setOpenDefault] = useState(false);
    const [openBlurred, setOpenBlurred] = useState(false);
    const [openTransparent, setOpenTransparent] = useState(false);
    const [openNoBackdropClick, setOpenNoBackdropClick] = useState(false);
    const [openNoEscape, setOpenNoEscape] = useState(false);

    return (
      <div className="space-y-md">
        <div className="flex flex-wrap gap-md">
          <Button onClick={() => setOpenDefault(true)}>Default Backdrop</Button>
          <Button onClick={() => setOpenBlurred(true)}>Blurred Backdrop</Button>
          <Button onClick={() => setOpenTransparent(true)}>Transparent Backdrop</Button>
          <Button onClick={() => setOpenNoBackdropClick(true)}>No Backdrop Click</Button>
          <Button onClick={() => setOpenNoEscape(true)}>No Escape Key</Button>
        </div>

        <Drawer
          open={openDefault}
          onClose={() => setOpenDefault(false)}
          backdropVariant="default"
          titleId="states-default-title"
        >
          <Drawer.Header>
            <Heading level={3} id="states-default-title">
              Default Backdrop
            </Heading>
          </Drawer.Header>
          <Drawer.Body>
            <Text>This drawer uses default backdrop variant.</Text>
          </Drawer.Body>
          <Drawer.Footer>
            <Button onClick={() => setOpenDefault(false)}>Close</Button>
          </Drawer.Footer>
        </Drawer>

        <Drawer
          open={openBlurred}
          onClose={() => setOpenBlurred(false)}
          backdropVariant="blurred"
          titleId="states-blurred-title"
        >
          <Drawer.Header>
            <Heading level={3} id="states-blurred-title">
              Blurred Backdrop
            </Heading>
          </Drawer.Header>
          <Drawer.Body>
            <Text>This drawer uses blurred backdrop variant.</Text>
          </Drawer.Body>
          <Drawer.Footer>
            <Button onClick={() => setOpenBlurred(false)}>Close</Button>
          </Drawer.Footer>
        </Drawer>

        <Drawer
          open={openTransparent}
          onClose={() => setOpenTransparent(false)}
          backdropVariant="transparent"
          titleId="states-transparent-title"
        >
          <Drawer.Header>
            <Heading level={3} id="states-transparent-title">
              Transparent Backdrop
            </Heading>
          </Drawer.Header>
          <Drawer.Body>
            <Text>This drawer uses transparent backdrop variant.</Text>
          </Drawer.Body>
          <Drawer.Footer>
            <Button onClick={() => setOpenTransparent(false)}>Close</Button>
          </Drawer.Footer>
        </Drawer>

        <Drawer
          open={openNoBackdropClick}
          onClose={() => setOpenNoBackdropClick(false)}
          closeOnBackdropClick={false}
          titleId="states-no-backdrop-title"
        >
          <Drawer.Header>
            <Heading level={3} id="states-no-backdrop-title">
              No Backdrop Click
            </Heading>
          </Drawer.Header>
          <Drawer.Body>
            <Text>This drawer does not close on backdrop click. Use the close button.</Text>
          </Drawer.Body>
          <Drawer.Footer>
            <Button onClick={() => setOpenNoBackdropClick(false)}>Close</Button>
          </Drawer.Footer>
        </Drawer>

        <Drawer
          open={openNoEscape}
          onClose={() => setOpenNoEscape(false)}
          closeOnEscape={false}
          titleId="states-no-escape-title"
        >
          <Drawer.Header>
            <Heading level={3} id="states-no-escape-title">
              No Escape Key
            </Heading>
          </Drawer.Header>
          <Drawer.Body>
            <Text>This drawer does not close on Escape key. Use the close button.</Text>
          </Drawer.Body>
          <Drawer.Footer>
            <Button onClick={() => setOpenNoEscape(false)}>Close</Button>
          </Drawer.Footer>
        </Drawer>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Canonical States Story:** Demonstrates drawer states (backdrop variants, close behaviors). Required per VARIANTS_SIZE_CANON.md for components with state props.",
      },
    },
  },
};

/**
 * LongContent story (REQUIRED for overlay components)
 * Validates padding and token behavior with long text content.
 * This story demonstrates how Drawer handles long content and ensures
 * proper scrolling and token-based spacing.
 * Reference: [SIZE_MAPPING_SPEC.md](../../../../docs/architecture/SIZE_MAPPING_SPEC.md)
 */
export const LongContent: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Drawer with Long Content</Button>
        <Drawer open={open} onClose={() => setOpen(false)} titleId="long-content-title">
          <Drawer.Header>
            <Heading level={3} id="long-content-title">
              Long Content Drawer
            </Heading>
            <Text size="sm" tone="muted">
              This drawer demonstrates proper handling of long content with token-based padding and
              scrolling.
            </Text>
          </Drawer.Header>
          <Drawer.Body>
            <div className="space-y-md text-sm">
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur.
              </Text>
              <Text>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit
                voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
                illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </Text>
              <Text>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro
                quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
                sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam
                quaerat voluptatem.
              </Text>
              <Text>
                Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit
                laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel
                illum qui dolorem eum fugiat quo voluptas nulla pariatur?
              </Text>
              <Text>
                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
                excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                officia deserunt mollitia animi, id est laborum et dolorum fuga.
              </Text>
              <Text>
                Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum
                soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime
                placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
              </Text>
            </div>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Accept</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "**Canonical LongContent Story:** Demonstrates proper handling of long content with token-based padding and scrolling. Required per SIZE_MAPPING_SPEC.md for overlay components.",
      },
    },
  },
};

/**
 * NavigationDrawer - Use case story
 * Demonstrates drawer usage for navigation menu.
 */
export const NavigationDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Navigation</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          position="left"
          titleId="nav-drawer-title"
        >
          <Drawer.Header>
            <Heading level={3} id="nav-drawer-title">
              Navigation
            </Heading>
          </Drawer.Header>
          <Drawer.Body>
            <nav className="space-y-sm">
              <a href="#" className="block rounded-md px-md py-sm hover:bg-[hsl(var(--tm-muted))]">
                Home
              </a>
              <a href="#" className="block rounded-md px-md py-sm hover:bg-[hsl(var(--tm-muted))]">
                About
              </a>
              <a href="#" className="block rounded-md px-md py-sm hover:bg-[hsl(var(--tm-muted))]">
                Services
              </a>
              <a href="#" className="block rounded-md px-md py-sm hover:bg-[hsl(var(--tm-muted))]">
                Contact
              </a>
            </nav>
          </Drawer.Body>
        </Drawer>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates drawer usage for navigation menu with left position.",
      },
    },
  },
};

/**
 * SettingsDrawer - Use case story
 * Demonstrates drawer usage for settings panel.
 */
export const SettingsDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Settings</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          size="lg"
          titleId="settings-drawer-title"
        >
          <Drawer.Header>
            <Heading level={3} id="settings-drawer-title">
              Settings
            </Heading>
            <Text size="sm" tone="muted">
              Manage your account settings and preferences
            </Text>
          </Drawer.Header>
          <Drawer.Body>
            <div className="space-y-lg">
              <div>
                <Box mb="sm">
                  <Text weight="semibold">Appearance</Text>
                </Box>
                <div className="space-y-sm">
                  <label className="flex items-center gap-sm">
                    <input type="radio" name="theme" defaultChecked />
                    <Text size="sm">Light</Text>
                  </label>
                  <label className="flex items-center gap-sm">
                    <input type="radio" name="theme" />
                    <Text size="sm">Dark</Text>
                  </label>
                  <label className="flex items-center gap-sm">
                    <input type="radio" name="theme" />
                    <Text size="sm">System</Text>
                  </label>
                </div>
              </div>
              <div>
                <Box mb="sm">
                  <Text weight="semibold">Notifications</Text>
                </Box>
                <div className="space-y-sm">
                  <label className="flex items-center gap-sm">
                    <input type="checkbox" defaultChecked />
                    <Text size="sm">Email notifications</Text>
                  </label>
                  <label className="flex items-center gap-sm">
                    <input type="checkbox" defaultChecked />
                    <Text size="sm">Push notifications</Text>
                  </label>
                </div>
              </div>
            </div>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setOpen(false)}>Save Changes</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates drawer usage for settings panel with form controls.",
      },
    },
  },
};

/**
 * FilterDrawer - Use case story
 * Demonstrates drawer usage for filter panel.
 */
export const FilterDrawer: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Filters</Button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          position="bottom"
          titleId="filter-drawer-title"
        >
          <Drawer.Header>
            <Heading level={3} id="filter-drawer-title">
              Filters
            </Heading>
          </Drawer.Header>
          <Drawer.Body>
            <div className="space-y-lg">
              <div>
                <Box mb="sm">
                  <Text weight="semibold">Category</Text>
                </Box>
                <div className="space-y-sm">
                  <label className="flex items-center gap-sm">
                    <input type="checkbox" />
                    <Text size="sm">Music</Text>
                  </label>
                  <label className="flex items-center gap-sm">
                    <input type="checkbox" />
                    <Text size="sm">Concerts</Text>
                  </label>
                  <label className="flex items-center gap-sm">
                    <input type="checkbox" />
                    <Text size="sm">Festivals</Text>
                  </label>
                </div>
              </div>
              <div>
                <Box mb="sm">
                  <Text weight="semibold">Date Range</Text>
                </Box>
                <div className="space-y-sm">
                  <input
                    type="date"
                    className="w-full rounded-md border border-[hsl(var(--tm-border-default))] px-md py-sm"
                  />
                  <input
                    type="date"
                    className="w-full rounded-md border border-[hsl(var(--tm-border-default))] px-md py-sm"
                  />
                </div>
              </div>
            </div>
          </Drawer.Body>
          <Drawer.Footer>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Clear
            </Button>
            <Button onClick={() => setOpen(false)}>Apply Filters</Button>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Demonstrates drawer usage for filter panel with bottom position.",
      },
    },
  },
};
