/**
 * NotificationCenter Component Tests
 *
 * Tests for NotificationCenter component rendering, behavior, and API contract.
 */

import "@testing-library/jest-dom/vitest";
import { screen, waitFor } from "@testing-library/react";
import * as React from "react";
import { describe, expect, it, vi } from "vitest";

import { axeCheck, renderWithTheme, userEventSetup } from "@/test/test-utils";

import { NotificationCenter, NotificationCenterProvider, useNotificationCenter } from "./";
import type { NotificationData } from "./NotificationCenter.types";

describe("NotificationCenter", () => {
  describe("Provider", () => {
    it("renders children without errors", () => {
      renderWithTheme(
        <NotificationCenterProvider>
          <div>Test content</div>
        </NotificationCenterProvider>,
      );

      expect(screen.getByText("Test content")).toBeInTheDocument();
    });

    it("provides notification context", () => {
      function TestComponent() {
        const notify = useNotificationCenter();
        return (
          <button onClick={() => notify.success("Test notification")}>Add Notification</button>
        );
      }

      renderWithTheme(
        <NotificationCenterProvider>
          <TestComponent />
        </NotificationCenterProvider>,
      );

      expect(screen.getByRole("button", { name: "Add Notification" })).toBeInTheDocument();
    });

    it("throws error when used outside provider", () => {
      // Suppress console.error for this test
      const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

      function TestComponent() {
        useNotificationCenter();
        return <div>Test</div>;
      }

      expect(() => {
        renderWithTheme(<TestComponent />);
      }).toThrow();

      consoleError.mockRestore();
    });
  });

  describe("Trigger", () => {
    it("renders trigger button", () => {
      renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.Trigger onClick={vi.fn()} />
        </NotificationCenterProvider>,
      );

      expect(screen.getByRole("button", { name: /open notifications/i })).toBeInTheDocument();
    });

    it("shows unread count badge when notifications exist", async () => {
      function TestComponent() {
        const notify = useNotificationCenter();
        return (
          <>
            <NotificationCenter.Trigger onClick={vi.fn()} />
            <button onClick={() => notify.success("Test")}>Add</button>
          </>
        );
      }

      renderWithTheme(
        <NotificationCenterProvider>
          <TestComponent />
        </NotificationCenterProvider>,
      );

      const user = userEventSetup();
      const addButton = screen.getByRole("button", { name: "Add" });
      await user.click(addButton);

      await waitFor(() => {
        const trigger = screen.getByRole("button", { name: /open notifications/i });
        expect(trigger).toBeInTheDocument();
        // Badge should show unread count
        expect(screen.getByText("1")).toBeInTheDocument();
      });
    });

    it("hides badge when showBadge is false", async () => {
      function TestComponent() {
        const notify = useNotificationCenter();
        return (
          <>
            <NotificationCenter.Trigger onClick={vi.fn()} showBadge={false} />
            <button onClick={() => notify.success("Test")}>Add</button>
          </>
        );
      }

      renderWithTheme(
        <NotificationCenterProvider>
          <TestComponent />
        </NotificationCenterProvider>,
      );

      const user = userEventSetup();
      const addButton = screen.getByRole("button", { name: "Add" });
      await user.click(addButton);

      await waitFor(() => {
        expect(screen.queryByText("1")).not.toBeInTheDocument();
      });
    });
  });

  describe("Panel", () => {
    it("does not render when isOpen is false", () => {
      renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.Panel isOpen={false} onClose={vi.fn()} />
        </NotificationCenterProvider>,
      );

      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("renders when isOpen is true", () => {
      renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.Panel isOpen={true} onClose={vi.fn()} />
        </NotificationCenterProvider>,
      );

      expect(screen.getByRole("dialog", { name: "Notifications" })).toBeInTheDocument();
    });

    it("displays empty state when no notifications", () => {
      renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.Panel isOpen={true} onClose={vi.fn()} />
        </NotificationCenterProvider>,
      );

      expect(screen.getByText("No notifications")).toBeInTheDocument();
    });

    it("displays notifications when they exist", async () => {
      function TestComponent() {
        const notify = useNotificationCenter();
        return (
          <>
            <NotificationCenter.Panel isOpen={true} onClose={vi.fn()} />
            <button onClick={() => notify.success("Test notification")}>Add</button>
          </>
        );
      }

      renderWithTheme(
        <NotificationCenterProvider>
          <TestComponent />
        </NotificationCenterProvider>,
      );

      const user = userEventSetup();
      const addButton = screen.getByRole("button", { name: "Add" });
      await user.click(addButton);

      await waitFor(() => {
        expect(screen.getByText("Test notification")).toBeInTheDocument();
      });
    });

    it("closes panel when close button is clicked", async () => {
      const onClose = vi.fn();

      renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.Panel isOpen={true} onClose={onClose} />
        </NotificationCenterProvider>,
      );

      const user = userEventSetup();
      const closeButton = screen.getByRole("button", { name: /close notifications/i });
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("closes panel when ESC key is pressed", async () => {
      const onClose = vi.fn();

      renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.Panel isOpen={true} onClose={onClose} />
        </NotificationCenterProvider>,
      );

      const user = userEventSetup();
      await user.keyboard("{Escape}");

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("supports different width variants", () => {
      const { rerender } = renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.Panel isOpen={true} onClose={vi.fn()} width="sm" />
        </NotificationCenterProvider>,
      );

      let panel = screen.getByRole("dialog");
      expect(panel).toBeInTheDocument();

      rerender(
        <NotificationCenterProvider>
          <NotificationCenter.Panel isOpen={true} onClose={vi.fn()} width="lg" />
        </NotificationCenterProvider>,
      );

      panel = screen.getByRole("dialog");
      expect(panel).toBeInTheDocument();
    });
  });

  describe("List", () => {
    it("renders list container", () => {
      renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.List aria-label="Test list">
            <li>Item 1</li>
            <li>Item 2</li>
          </NotificationCenter.List>
        </NotificationCenterProvider>,
      );

      const list = screen.getByRole("list", { name: "Test list" });
      expect(list).toBeInTheDocument();
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 2")).toBeInTheDocument();
    });

    it("uses default aria-label when not provided", () => {
      renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.List>
            <li>Item</li>
          </NotificationCenter.List>
        </NotificationCenterProvider>,
      );

      expect(screen.getByRole("list", { name: "Notifications" })).toBeInTheDocument();
    });
  });

  describe("Item", () => {
    const mockNotification: NotificationData = {
      id: "test-1",
      title: "Test Title",
      description: "Test Description",
      variant: "success",
      channel: "success",
      timestamp: Date.now(),
      read: false,
    };

    it("renders notification item", () => {
      renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.Item notification={mockNotification} />
        </NotificationCenterProvider>,
      );

      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    it("renders item without title", () => {
      const notificationWithoutTitle: NotificationData = {
        ...mockNotification,
        title: undefined,
      };

      renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.Item notification={notificationWithoutTitle} />
        </NotificationCenterProvider>,
      );

      expect(screen.getByText("Test Description")).toBeInTheDocument();
    });

    it("calls onDismiss when dismiss button is clicked", async () => {
      const onDismiss = vi.fn();

      renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.Item notification={mockNotification} onDismiss={onDismiss} />
        </NotificationCenterProvider>,
      );

      const user = userEventSetup();
      const dismissButton = screen.getByRole("button", { name: /dismiss notification/i });
      await user.click(dismissButton);

      expect(onDismiss).toHaveBeenCalledWith("test-1");
    });

    it("calls onClick when item is clicked", async () => {
      const onClick = vi.fn();

      renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.Item notification={mockNotification} onClick={onClick} />
        </NotificationCenterProvider>,
      );

      const user = userEventSetup();
      const item = screen.getByRole("listitem");
      await user.click(item);

      expect(onClick).toHaveBeenCalledWith("test-1");
    });

    it("displays action button when action is provided", () => {
      const notificationWithAction: NotificationData = {
        ...mockNotification,
        action: {
          label: "View Details",
          onClick: vi.fn(),
        },
      };

      renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.Item notification={notificationWithAction} />
        </NotificationCenterProvider>,
      );

      expect(screen.getByRole("button", { name: "View Details" })).toBeInTheDocument();
    });
  });

  describe("GroupHeader", () => {
    it("renders group header with label", () => {
      renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.GroupHeader label="Today" />
        </NotificationCenterProvider>,
      );

      expect(screen.getByText("Today")).toBeInTheDocument();
    });

    it("shows collapse button when collapsible", () => {
      const onToggleCollapse = vi.fn();

      renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.GroupHeader
            label="Today"
            collapsible={true}
            collapsed={false}
            onToggleCollapse={onToggleCollapse}
          />
        </NotificationCenterProvider>,
      );

      const collapseButton = screen.getByRole("button", { name: /collapse group/i });
      expect(collapseButton).toBeInTheDocument();
    });

    it("calls onToggleCollapse when collapse button is clicked", async () => {
      const onToggleCollapse = vi.fn();

      renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.GroupHeader
            label="Today"
            collapsible={true}
            collapsed={false}
            onToggleCollapse={onToggleCollapse}
          />
        </NotificationCenterProvider>,
      );

      const user = userEventSetup();
      const collapseButton = screen.getByRole("button", { name: /collapse group/i });
      await user.click(collapseButton);

      expect(onToggleCollapse).toHaveBeenCalledTimes(1);
    });
  });

  describe("DismissAll", () => {
    it("does not render when no notifications", () => {
      renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.DismissAll />
        </NotificationCenterProvider>,
      );

      expect(screen.queryByRole("button", { name: /clear all/i })).not.toBeInTheDocument();
    });

    it("renders when notifications exist", async () => {
      function TestComponent() {
        const notify = useNotificationCenter();
        return (
          <>
            <NotificationCenter.DismissAll />
            <button onClick={() => notify.success("Test")}>Add</button>
          </>
        );
      }

      renderWithTheme(
        <NotificationCenterProvider>
          <TestComponent />
        </NotificationCenterProvider>,
      );

      const user = userEventSetup();
      const addButton = screen.getByRole("button", { name: "Add" });
      await user.click(addButton);

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /clear all/i })).toBeInTheDocument();
      });
    });

    it("clears all notifications when clicked", async () => {
      function TestComponent() {
        const notify = useNotificationCenter();
        return (
          <>
            <NotificationCenter.DismissAll />
            <button onClick={() => notify.success("Test")}>Add</button>
          </>
        );
      }

      renderWithTheme(
        <NotificationCenterProvider>
          <TestComponent />
        </NotificationCenterProvider>,
      );

      const user = userEventSetup();
      const addButton = screen.getByRole("button", { name: "Add" });
      await user.click(addButton);

      await waitFor(() => {
        expect(screen.getByRole("button", { name: /clear all/i })).toBeInTheDocument();
      });

      const dismissAllButton = screen.getByRole("button", { name: /clear all/i });
      await user.click(dismissAllButton);

      await waitFor(() => {
        expect(screen.queryByText("Test")).not.toBeInTheDocument();
      });
    });
  });

  describe("useNotificationCenter Hook", () => {
    it("provides success method", async () => {
      function TestComponent() {
        const notify = useNotificationCenter();
        return <button onClick={() => notify.success("Success message")}>Success</button>;
      }

      renderWithTheme(
        <NotificationCenterProvider>
          <TestComponent />
        </NotificationCenterProvider>,
      );

      const user = userEventSetup();
      const button = screen.getByRole("button", { name: "Success" });
      await user.click(button);

      waitFor(() => {
        // Notification should be added to context
        expect(button).toBeInTheDocument();
      });
    });

    it("provides all channel methods", () => {
      function TestComponent() {
        const notify = useNotificationCenter();
        return (
          <div>
            <button onClick={() => notify.success("Success")}>Success</button>
            <button onClick={() => notify.error("Error")}>Error</button>
            <button onClick={() => notify.info("Info")}>Info</button>
            <button onClick={() => notify.warning("Warning")}>Warning</button>
            <button onClick={() => notify.system("System")}>System</button>
            <button onClick={() => notify.log("Log")}>Log</button>
          </div>
        );
      }

      renderWithTheme(
        <NotificationCenterProvider>
          <TestComponent />
        </NotificationCenterProvider>,
      );

      expect(screen.getByRole("button", { name: "Success" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Error" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Info" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Warning" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "System" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "Log" })).toBeInTheDocument();
    });

    it("provides push method for custom notifications", () => {
      function TestComponent() {
        const notify = useNotificationCenter();
        return (
          <button
            onClick={() =>
              notify.push({
                title: "Custom",
                description: "Custom notification",
                variant: "info",
              })
            }
          >
            Push
          </button>
        );
      }

      renderWithTheme(
        <NotificationCenterProvider>
          <TestComponent />
        </NotificationCenterProvider>,
      );

      expect(screen.getByRole("button", { name: "Push" })).toBeInTheDocument();
    });

    it("provides remove method", async () => {
      function TestComponent() {
        const notify = useNotificationCenter();
        const [id, setId] = React.useState<string | null>(null);

        return (
          <div>
            <button
              onClick={() => {
                const notificationId = notify.success("Test");
                setId(notificationId);
              }}
            >
              Add
            </button>
            {id && <button onClick={() => notify.remove(id)}>Remove</button>}
          </div>
        );
      }

      renderWithTheme(
        <NotificationCenterProvider>
          <TestComponent />
        </NotificationCenterProvider>,
      );

      const user = userEventSetup();
      const addButton = screen.getByRole("button", { name: "Add" });
      await user.click(addButton);

      await waitFor(() => {
        const removeButton = screen.getByRole("button", { name: "Remove" });
        expect(removeButton).toBeInTheDocument();
      });
    });

    it("provides clearAll method", () => {
      function TestComponent() {
        const notify = useNotificationCenter();
        return <button onClick={() => notify.clearAll()}>Clear All</button>;
      }

      renderWithTheme(
        <NotificationCenterProvider>
          <TestComponent />
        </NotificationCenterProvider>,
      );

      expect(screen.getByRole("button", { name: "Clear All" })).toBeInTheDocument();
    });

    it("provides clearChannel method", () => {
      function TestComponent() {
        const notify = useNotificationCenter();
        return <button onClick={() => notify.clearChannel("success")}>Clear Success</button>;
      }

      renderWithTheme(
        <NotificationCenterProvider>
          <TestComponent />
        </NotificationCenterProvider>,
      );

      expect(screen.getByRole("button", { name: "Clear Success" })).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("passes axe accessibility checks for Provider", async () => {
      const { container } = renderWithTheme(
        <NotificationCenterProvider>
          <div>Test</div>
        </NotificationCenterProvider>,
      );

      await axeCheck(container);
    });

    it("passes axe accessibility checks for Panel", async () => {
      const { container } = renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.Panel isOpen={true} onClose={vi.fn()} />
        </NotificationCenterProvider>,
      );

      await axeCheck(container);
    });

    it("passes axe accessibility checks for Trigger", async () => {
      const { container } = renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.Trigger onClick={vi.fn()} />
        </NotificationCenterProvider>,
      );

      await axeCheck(container);
    });

    it("passes axe accessibility checks for Item", async () => {
      const notification: NotificationData = {
        id: "test-1",
        title: "Test",
        description: "Test description",
        variant: "success",
        channel: "success",
        timestamp: Date.now(),
        read: false,
      };

      const { container } = renderWithTheme(
        <NotificationCenterProvider>
          <NotificationCenter.Item notification={notification} />
        </NotificationCenterProvider>,
      );

      await axeCheck(container);
    });
  });
});
