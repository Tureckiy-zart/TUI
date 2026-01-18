"use client";

/**
 * NotificationCenter.Panel Component
 *
 * Side drawer panel for displaying notification center.
 * Uses Surface + Portal + Backdrop with slide animation from right.
 * Includes header, grouped lists, scrollable area, focus management, and keyboard support.
 *
 * ## Architectural Semantics: Panel ≠ Card
 *
 * This component follows **Panel semantics**, not Card semantics.
 *
 * **Panel Responsibilities:**
 * - Overlay orchestration (Portal, Backdrop, Focus, Keyboard, Gestures)
 * - Layout orchestration (scroll container, header/content separation)
 * - Content orchestration (grouping, auto-collapse, empty state)
 * - Delegates content rendering to specialized components (List, Item)
 *
 * **MUST NOT be converted to Card/CardBase:**
 * - Panel is an **overlay orchestrator** that manages interaction and layout
 * - Card is a **content container** with explicit semantic sections (header/body/footer)
 * - Mixing these semantics creates architectural confusion
 *
 * **Architectural Decision:** This is a canonical architectural rule established by
 * [ADR_overlay_panel_not_card.md](../../../../docs/architecture/decisions/ADR_overlay_panel_not_card.md).
 *
 * **Reference:** See ADR for complete rationale and decision rule for future panels.
 */

import { X } from "lucide-react";
import * as React from "react";

import { Stack } from "@/COMPOSITION/layout/Stack";
import { Surface } from "@/COMPOSITION/layout/Surface";
import { Backdrop } from "@/COMPOSITION/overlays/Backdrop";
import { Portal } from "@/COMPOSITION/overlays/Portal";
import { useFocusLock } from "@/COMPOSITION/overlays/utils/FocusLock";
import { cn } from "@/FOUNDATION/lib/utils";
import { useSwipe } from "@/FOUNDATION/theme/motion/gestures";
import { NOTIFICATION_TOKENS } from "@/FOUNDATION/tokens/components/notifications";
import { TEXT_TOKENS } from "@/FOUNDATION/tokens/components/text";
import { Button } from "@/PRIMITIVES/Button";

import { NotificationCenterDismissAll } from "./NotificationCenter.DismissAll";
import { NotificationCenterGroupHeader } from "./NotificationCenter.GroupHeader";
import { NotificationCenterItem } from "./NotificationCenter.Item";
import { NotificationCenterList } from "./NotificationCenter.List";
import { useNotificationCenterContext } from "./NotificationCenter.Provider";
import type { GroupByFunction, NotificationData } from "./NotificationCenter.types";

export interface NotificationCenterPanelProps {
  /**
   * Whether panel is open
   */
  isOpen: boolean;

  /**
   * Callback when panel should close
   */
  onClose: () => void;

  /**
   * Function to group notifications (by date, type, or custom)
   */
  groupBy?: GroupByFunction;

  /**
   * Panel width variant
   */
  width?: "sm" | "md" | "lg";

  /**
   * Auto-collapse older notifications
   */
  autoCollapse?: boolean;

  /**
   * Element to return focus to when panel closes
   */
  returnFocusRef?: React.RefObject<HTMLElement | null>;
}

/**
 * Default group by date function
 */
function groupByDate(notification: NotificationData): string {
  const now = Date.now();
  const diff = now - notification.timestamp;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return "This Week";
  if (days < 30) return "This Month";
  return "Older";
}

/**
 * NotificationCenter.Panel component - side drawer notification panel
 */
export const NotificationCenterPanel = React.forwardRef<
  HTMLDivElement,
  NotificationCenterPanelProps
>(
  (
    { isOpen, onClose, groupBy = groupByDate, width = "md", autoCollapse = true, returnFocusRef },
    ref,
  ) => {
    const panelRef = React.useRef<HTMLDivElement>(null);
    const { getAll, markAsRead } = useNotificationCenterContext();
    const [collapsedGroups, setCollapsedGroups] = React.useState<Set<string>>(new Set());

    // Swipe gesture for dismiss (swipe right to close)
    const { handlers: swipeHandlers } = useSwipe({
      directions: ["right"],
      threshold: 100,
      onSwipe: () => {
        onClose();
      },
      enabled: isOpen,
    });

    const notifications = getAll();
    const grouped = React.useMemo(() => {
      return groupBy
        ? notifications.reduce(
            (acc, notification) => {
              const key = groupBy(notification);
              if (!acc[key]) {
                acc[key] = [];
              }
              acc[key].push(notification);
              return acc;
            },
            {} as Record<string, NotificationData[]>,
          )
        : { default: notifications };
    }, [notifications, groupBy]);

    // Auto-collapse older groups
    React.useEffect(() => {
      if (autoCollapse && isOpen) {
        const groups = Object.keys(grouped);
        const olderGroups = groups.filter((g) => g !== "Today" && g !== "Yesterday");
        setCollapsedGroups(new Set(olderGroups));
      }
    }, [autoCollapse, isOpen, grouped]);

    // Focus management
    useFocusLock({
      containerRef: panelRef as React.RefObject<HTMLElement>,
      enabled: isOpen,
      returnFocusRef,
    });

    // Keyboard support: ESC to close
    React.useEffect(() => {
      if (!isOpen) return;

      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === "Escape") {
          onClose();
        }
      }

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isOpen, onClose]);

    // Mark as read when opened
    React.useEffect(() => {
      if (isOpen) {
        notifications.forEach((n) => {
          if (!n.read) {
            markAsRead(n.id);
          }
        });
      }
    }, [isOpen, notifications, markAsRead]);

    // Prevent body scroll when open
    React.useEffect(() => {
      if (isOpen && typeof window !== "undefined") {
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = "";
        };
      }
      return undefined;
    }, [isOpen]);

    if (!isOpen) return null;

    const toggleGroup = (groupKey: string) => {
      setCollapsedGroups((prev) => {
        const next = new Set(prev);
        if (next.has(groupKey)) {
          next.delete(groupKey);
        } else {
          next.add(groupKey);
        }
        return next;
      });
    };

    return (
      <Portal>
        {/* Backdrop */}
        <Backdrop variant="default" onClick={onClose} isVisible={isOpen} className="z-40" />

        {/* Panel */}
        <div
          {...(swipeHandlers as Omit<typeof swipeHandlers, "ref">)}
          ref={(node) => {
            panelRef.current = node;
            swipeHandlers.ref(node);
            if (typeof ref === "function") {
              ref(node);
            } else if (ref && typeof ref === "object") {
              (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
            }
          }}
          className={cn(
            "fixed right-0 top-0 z-50 h-full",
            NOTIFICATION_TOKENS.panel.width[width],
            NOTIFICATION_TOKENS.panel.maxHeight,
            NOTIFICATION_TOKENS.panel.shadow.default,
            isOpen ? "tm-motion-fade-slide-right" : "tm-motion-fade-slide-right-out",
          )}
          role="dialog"
          aria-modal="true"
          aria-label="Notifications"
        >
          <Surface
            ref={ref}
            variant="elevated"
            className={cn("flex h-full flex-col", NOTIFICATION_TOKENS.panel.radius.default)}
          >
            {/* Header */}
            <div
              className={cn(
                // Header divider: border-b is acceptable here as divider semantics
                // No generic border token exists in system (DIVIDER_TOKENS is for Divider component only)
                "flex items-center justify-between border-b",
                NOTIFICATION_TOKENS.panel.spacing.headerPadding,
              )}
            >
              <h2 className={cn(TEXT_TOKENS.fontSize.lg, TEXT_TOKENS.fontWeight.semibold)}>
                Notifications
              </h2>
              <div className={cn("flex items-center", NOTIFICATION_TOKENS.spacing.gap)}>
                <NotificationCenterDismissAll />
                <Button variant="ghost" iconOnly onClick={onClose} aria-label="Close notifications">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Scrollable content */}
            <div
              className={cn("flex-1 overflow-y-auto", NOTIFICATION_TOKENS.panel.spacing.padding)}
            >
              {Object.keys(grouped).length === 0 ? (
                <div className="flex h-full items-center justify-center text-[hsl(var(--tm-text-muted))]">
                  No notifications
                </div>
              ) : (
                <Stack spacing="md">
                  {Object.entries(grouped).map(([groupKey, groupNotifications]) => {
                    const isCollapsed = collapsedGroups.has(groupKey);
                    return (
                      <div key={groupKey}>
                        <NotificationCenterGroupHeader
                          label={groupKey}
                          collapsed={isCollapsed}
                          onToggleCollapse={() => toggleGroup(groupKey)}
                          collapsible={autoCollapse}
                        />
                        {!isCollapsed && (
                          <NotificationCenterList aria-label={`${groupKey} notifications`}>
                            {groupNotifications.map((notification) => (
                              <NotificationCenterItem
                                key={notification.id}
                                notification={notification}
                              />
                            ))}
                          </NotificationCenterList>
                        )}
                      </div>
                    );
                  })}
                </Stack>
              )}
            </div>
          </Surface>
        </div>
      </Portal>
    );
  },
);

NotificationCenterPanel.displayName = "NotificationCenter.Panel";
