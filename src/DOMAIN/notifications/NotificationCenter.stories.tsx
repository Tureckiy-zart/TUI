"use client";

import { Button } from "@/PRIMITIVES/Button";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { NotificationCenter, NotificationCenterProvider, useNotificationCenter } from "./";

const meta: Meta<typeof NotificationCenterProvider> = {
  title: "Domain / NotificationCenter",
  component: NotificationCenterProvider,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Production-ready Notification Center with stacking, grouping, dismiss-all, multi-channel routing, and persistent message history. All notifications are token-driven, SSR-safe, accessible, and consistent with motion and overlay architecture.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    maxHistory: {
      control: "number",
      description: "Maximum number of notifications to keep in history",
    },
    persistent: {
      control: "boolean",
      description: "Enable persistent history (in-memory)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Demo component with panel
function NotificationCenterDemo() {
  const notify = useNotificationCenter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-md">
      <div className="flex items-center gap-sm">
        <NotificationCenter.Trigger onClick={() => setIsOpen(true)} />
        <Button onClick={() => setIsOpen(true)}>Open Panel</Button>
      </div>

      <div className="space-y-xs">
        <Button
          onClick={() => notify.success("Operation completed successfully!")}
          variant="outline"
        >
          Success
        </Button>
        <Button onClick={() => notify.error("Something went wrong!")} variant="outline">
          Error
        </Button>
        <Button onClick={() => notify.info("Here's some information")} variant="outline">
          Info
        </Button>
        <Button onClick={() => notify.warning("Please be careful")} variant="outline">
          Warning
        </Button>
        <Button onClick={() => notify.system("System notification")} variant="outline">
          System
        </Button>
        <Button onClick={() => notify.log("Log entry")} variant="outline">
          Log
        </Button>
      </div>

      <NotificationCenter.Panel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

// Multi-channel demo
function MultiChannelDemo() {
  const notify = useNotificationCenter();
  const [isOpen, setIsOpen] = useState(false);

  const addNotifications = () => {
    notify.success("Payment processed successfully");
    notify.error("Failed to connect to server");
    notify.info("New message from John Doe");
    notify.warning("Your subscription expires in 3 days");
    notify.system("System maintenance scheduled");
    notify.log("User action logged");
  };

  return (
    <div className="space-y-md">
      <div className="flex items-center gap-sm">
        <NotificationCenter.Trigger onClick={() => setIsOpen(true)} />
        <Button onClick={addNotifications}>Add All Channels</Button>
      </div>
      <NotificationCenter.Panel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

// Grouping demo
function GroupingDemo() {
  const notify = useNotificationCenter();
  const [isOpen, setIsOpen] = useState(false);

  const addGroupedNotifications = () => {
    // Today
    notify.success("Task completed", { title: "Today" });
    notify.info("Meeting at 3pm", { title: "Today" });

    // Yesterday (simulate by creating with older timestamp)
    const yesterday = Date.now() - 24 * 60 * 60 * 1000;
    notify.push({
      title: "Yesterday",
      description: "Old notification",
      variant: "info",
      timestamp: yesterday,
    } as any);

    // This Week
    const weekAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
    notify.push({
      title: "This Week",
      description: "Weekly report ready",
      variant: "success",
      timestamp: weekAgo,
    } as any);
  };

  return (
    <div className="space-y-md">
      <div className="flex items-center gap-sm">
        <NotificationCenter.Trigger onClick={() => setIsOpen(true)} />
        <Button onClick={addGroupedNotifications}>Add Grouped Notifications</Button>
      </div>
      <NotificationCenter.Panel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

// Stacking demo
function StackingDemo() {
  const notify = useNotificationCenter();
  const [isOpen, setIsOpen] = useState(false);

  const addManyNotifications = () => {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        notify.info(`Notification ${i + 1}`, { title: `Message ${i + 1}` });
      }, i * 200);
    }
  };

  return (
    <div className="space-y-md">
      <div className="flex items-center gap-sm">
        <NotificationCenter.Trigger onClick={() => setIsOpen(true)} />
        <Button onClick={addManyNotifications}>Add 10 Notifications</Button>
      </div>
      <NotificationCenter.Panel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

// Dismiss all demo
function DismissAllDemo() {
  const notify = useNotificationCenter();
  const [isOpen, setIsOpen] = useState(false);

  const addNotifications = () => {
    notify.success("First notification");
    notify.info("Second notification");
    notify.warning("Third notification");
  };

  return (
    <div className="space-y-md">
      <div className="flex items-center gap-sm">
        <NotificationCenter.Trigger onClick={() => setIsOpen(true)} />
        <Button onClick={addNotifications}>Add Notifications</Button>
      </div>
      <NotificationCenter.Panel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

// Persistent history demo
function PersistentHistoryDemo() {
  const notify = useNotificationCenter();
  const [isOpen, setIsOpen] = useState(false);
  const context = notify as any;

  const showHistory = () => {
    const history = context.getHistory?.() || [];
    alert(`History contains ${history.length} notifications`);
  };

  return (
    <div className="space-y-md">
      <div className="flex items-center gap-sm">
        <NotificationCenter.Trigger onClick={() => setIsOpen(true)} />
        <Button onClick={() => notify.info("Added to history")}>Add Notification</Button>
        <Button onClick={showHistory} variant="outline">
          Show History Count
        </Button>
      </div>
      <NotificationCenter.Panel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

// A11y demo
function A11yDemo() {
  const notify = useNotificationCenter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-md">
      <div className="flex items-center gap-sm">
        <NotificationCenter.Trigger onClick={() => setIsOpen(true)} />
        <Button onClick={() => notify.success("Accessible success message")}>Success</Button>
        <Button onClick={() => notify.error("Accessible error message")}>Error</Button>
      </div>
      <NotificationCenter.Panel isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <p className="text-sm text-[hsl(var(--tm-text-muted))]">
        Use keyboard: Tab to navigate, Escape to close, Arrow keys in panel
      </p>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <NotificationCenterProvider>
      <NotificationCenterDemo />
    </NotificationCenterProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Basic notification center with panel and multi-channel API.",
      },
    },
  },
};

export const MultiChannel: Story = {
  render: () => (
    <NotificationCenterProvider>
      <MultiChannelDemo />
    </NotificationCenterProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates all notification channels: success, error, info, warning, system, log.",
      },
    },
  },
};

export const Grouping: Story = {
  render: () => (
    <NotificationCenterProvider>
      <GroupingDemo />
    </NotificationCenterProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Notifications grouped by date (Today, Yesterday, This Week, etc.).",
      },
    },
  },
};

export const Stacking: Story = {
  render: () => (
    <NotificationCenterProvider>
      <StackingDemo />
    </NotificationCenterProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Multiple notifications with stacking and queue management.",
      },
    },
  },
};

export const DismissAll: Story = {
  render: () => (
    <NotificationCenterProvider>
      <DismissAllDemo />
    </NotificationCenterProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Clear all notifications functionality in panel header.",
      },
    },
  },
};

export const PersistentHistory: Story = {
  render: () => (
    <NotificationCenterProvider persistent maxHistory={50}>
      <PersistentHistoryDemo />
    </NotificationCenterProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Persistent notification history API demonstration.",
      },
    },
  },
};

export const A11y: Story = {
  render: () => (
    <NotificationCenterProvider>
      <A11yDemo />
    </NotificationCenterProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "Accessibility features: keyboard navigation, focus management, ARIA attributes.",
      },
    },
  },
};

// SizesGallery story - REQUIRED when component has public size prop
function SizesGalleryDemo() {
  const notify = useNotificationCenter();
  const [activeSize, setActiveSize] = useState<"sm" | "md" | "lg" | null>(null);

  const addNotifications = () => {
    notify.success("Small panel notification");
    notify.info("Medium panel notification");
    notify.warning("Large panel notification");
  };

  return (
    <div className="space-y-md">
      <div className="flex items-center gap-sm">
        <Button onClick={addNotifications}>Add Notifications</Button>
      </div>
      <div className="flex gap-sm">
        <Button
          variant={activeSize === "sm" ? "primary" : "outline"}
          onClick={() => setActiveSize(activeSize === "sm" ? null : "sm")}
        >
          Show Small (sm)
        </Button>
        <Button
          variant={activeSize === "md" ? "primary" : "outline"}
          onClick={() => setActiveSize(activeSize === "md" ? null : "md")}
        >
          Show Medium (md)
        </Button>
        <Button
          variant={activeSize === "lg" ? "primary" : "outline"}
          onClick={() => setActiveSize(activeSize === "lg" ? null : "lg")}
        >
          Show Large (lg)
        </Button>
      </div>
      {activeSize && (
        <NotificationCenter.Panel
          isOpen={true}
          onClose={() => setActiveSize(null)}
          width={activeSize}
        />
      )}
    </div>
  );
}

export const SizesGallery: Story = {
  render: () => (
    <NotificationCenterProvider>
      <SizesGalleryDemo />
    </NotificationCenterProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Panel width variants: sm (384px), md (448px), lg (512px). Demonstrates all supported sizes per overlay size restriction (sm | md | lg only). Click buttons to toggle different panel sizes.",
      },
    },
  },
};

// LongContent story - REQUIRED for Overlay components
function LongContentDemo() {
  const notify = useNotificationCenter();
  const [isOpen, setIsOpen] = useState(false);

  const addLongNotification = () => {
    notify.info(
      "This is a very long notification message that tests how the panel handles long content. It should wrap properly and not overflow the container. The padding and maxWidth tokens should ensure proper layout even with extremely long text content that spans multiple lines.",
      {
        title:
          "Very Long Notification Title That Should Also Wrap Properly Without Breaking Layout",
      },
    );
  };

  return (
    <div className="space-y-md">
      <div className="flex items-center gap-sm">
        <NotificationCenter.Trigger onClick={() => setIsOpen(true)} />
        <Button onClick={addLongNotification}>Add Long Notification</Button>
      </div>
      <NotificationCenter.Panel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}

export const LongContent: Story = {
  render: () => (
    <NotificationCenterProvider>
      <LongContentDemo />
    </NotificationCenterProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Validates padding and maxWidth token behavior with long text content. Ensures panel does not overflow or break layout with extremely long notifications.",
      },
    },
  },
};
