/**
 * Gesture System Stories
 *
 * Demonstrates swipe gesture detection for dismissible components.
 */

import type { Meta, StoryObj } from "@storybook/react";
import { X } from "lucide-react";
import * as React from "react";

import { useSwipe } from "@/theme/motion/gestures";

import { Button } from "../ui/button";

const meta: Meta = {
  title: "Motion/Gestures",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Gesture System - Swipe detection for dismissible components (Toast, NotificationPanel, Drawer).",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Swipe to Dismiss Toast
 */
export const SwipeToDismissToast: Story = {
  render: () => {
    const [isVisible, setIsVisible] = React.useState(true);
    const [swipeInfo, setSwipeInfo] = React.useState<string>("");

    const { handlers, isSwiping, distance, direction } = useSwipe({
      directions: ["left", "right"],
      threshold: 50,
      onSwipe: (event) => {
        setSwipeInfo(`Swiped ${event.direction} ${Math.round(event.distance)}px`);
        setIsVisible(false);
        setTimeout(() => {
          setIsVisible(true);
          setSwipeInfo("");
        }, 1000);
      },
      enabled: isVisible,
    });

    if (!isVisible) {
      return (
        <div className="rounded-lg border bg-card p-4">
          <p className="text-muted-foreground">Toast dismissed! Will reappear in 1 second.</p>
        </div>
      );
    }

    return (
      <div className="w-96 space-y-4">
        <div className="rounded-lg border bg-card p-4">
          <p className="mb-2 font-semibold">Swipe Gesture Info:</p>
          <p className="text-sm text-muted-foreground">
            {isSwiping
              ? `Swiping ${direction} (${Math.round(distance)}px)`
              : swipeInfo || "Swipe left or right to dismiss"}
          </p>
        </div>
        <div
          {...handlers}
          className="group pointer-events-auto relative flex w-full items-center justify-between gap-sm overflow-hidden rounded-lg border bg-background p-md shadow-lg"
        >
          <div className="flex flex-1 items-start gap-sm">
            <div className="flex-1 space-y-xs">
              <div className="text-sm font-semibold">Toast Notification</div>
              <div className="text-sm opacity-90">Swipe left or right to dismiss this toast</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-md p-xs text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100"
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss toast"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  },
};

/**
 * Swipe Directions
 */
export const SwipeDirections: Story = {
  render: () => {
    const [swipeInfo, setSwipeInfo] = React.useState<string>("Swipe in any direction");

    const { handlers, isSwiping, distance, direction } = useSwipe({
      directions: ["left", "right", "up", "down"],
      threshold: 30,
      onSwipe: (event) => {
        setSwipeInfo(
          `Swiped ${event.direction} ${Math.round(event.distance)}px at ${Math.round(event.velocity * 1000)}px/s`,
        );
        setTimeout(() => setSwipeInfo("Swipe in any direction"), 2000);
      },
    });

    return (
      <div className="w-96 space-y-4">
        <div className="rounded-lg border bg-card p-4">
          <p className="mb-2 font-semibold">Swipe Detection:</p>
          <p className="text-sm text-muted-foreground">
            {isSwiping ? `Swiping ${direction} (${Math.round(distance)}px)` : swipeInfo}
          </p>
        </div>
        <div
          {...handlers}
          className="flex h-48 w-full cursor-grab items-center justify-center rounded-lg border bg-card active:cursor-grabbing"
        >
          <p className="text-muted-foreground">Swipe in any direction</p>
        </div>
      </div>
    );
  },
};

/**
 * Notification Panel Swipe
 */
export const NotificationPanelSwipe: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true);
    const [swipeInfo, setSwipeInfo] = React.useState<string>("");

    const { handlers, isSwiping, distance } = useSwipe({
      directions: ["right"],
      threshold: 100,
      onSwipe: () => {
        setSwipeInfo("Panel closed via swipe!");
        setIsOpen(false);
        setTimeout(() => {
          setIsOpen(true);
          setSwipeInfo("");
        }, 2000);
      },
      enabled: isOpen,
    });

    if (!isOpen) {
      return (
        <div className="rounded-lg border bg-card p-4">
          <p className="text-muted-foreground">Panel closed! Will reopen in 2 seconds.</p>
          <Button onClick={() => setIsOpen(true)} className="mt-2">
            Reopen Panel
          </Button>
        </div>
      );
    }

    return (
      <div className="w-96 space-y-4">
        <div className="rounded-lg border bg-card p-4">
          <p className="mb-2 font-semibold">Panel Swipe Info:</p>
          <p className="text-sm text-muted-foreground">
            {isSwiping
              ? `Swiping right (${Math.round(distance)}px)`
              : swipeInfo || "Swipe right to close panel"}
          </p>
        </div>
        <div
          {...handlers}
          className="tm-motion-fade-slide-right fixed right-0 top-0 z-50 h-full w-80 border-l bg-card shadow-xl"
        >
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Notifications</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="Close notifications"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground">
              Swipe right from the left edge to close this panel.
            </p>
          </div>
        </div>
      </div>
    );
  },
};
