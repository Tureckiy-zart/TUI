"use client";

/**
 * NotificationCenter.Provider Component
 *
 * Global notification state management provider.
 * Manages persistent history, multi-channel support, and notification lifecycle.
 * SSR-safe: no window/document access in render.
 */

import * as React from "react";

import type {
  GroupByFunction,
  NotificationChannel,
  NotificationContextType,
  NotificationData,
  NotificationOptions,
  NotificationVariant,
} from "./NotificationCenter.types";

const NotificationContext = React.createContext<NotificationContextType | undefined>(undefined);

export interface NotificationCenterProviderProps {
  /**
   * Children to render
   */
  children: React.ReactNode;

  /**
   * Maximum number of notifications to keep in history
   */
  maxHistory?: number;

  /**
   * Enable persistent history (in-memory, can be extended to localStorage)
   */
  persistent?: boolean;
}

/**
 * NotificationCenter.Provider component - global notification state management
 */
export function NotificationCenterProvider({
  children,
  maxHistory = 100,
  persistent = true,
}: NotificationCenterProviderProps) {
  const [notifications, setNotifications] = React.useState<NotificationData[]>([]);
  const [history, setHistory] = React.useState<NotificationData[]>([]);

  /**
   * Remove a specific notification
   */
  const remove = React.useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  /**
   * Push a new notification
   */
  const push = React.useCallback(
    (options: NotificationOptions): string => {
      const id = Math.random().toString(36).substr(2, 9);
      const timestamp = Date.now();
      const getChannelFromVariant = (variant?: string): NotificationChannel => {
        if (variant === "danger") return "error";
        if (variant === "success") return "success";
        if (variant === "warning") return "warning";
        if (variant === "system") return "system";
        if (variant === "log") return "log";
        return "info";
      };

      const getVariantFromChannel = (channel: NotificationChannel): NotificationVariant => {
        if (channel === "error") return "danger";
        if (channel === "success") return "success";
        return "default";
      };

      const channel: NotificationChannel =
        options.channel || getChannelFromVariant(options.variant);

      const notification: NotificationData = {
        id,
        ...options,
        channel,
        variant: options.variant || getVariantFromChannel(channel),
        timestamp,
        read: false,
        persistent: options.persistent ?? false,
        duration: options.duration ?? (options.persistent ? 0 : 5000),
      };

      setNotifications((prev) => [...prev, notification]);

      // Add to history if persistent
      if (persistent) {
        setHistory((prev) => {
          const updated = [notification, ...prev];
          return updated.slice(0, maxHistory);
        });
      }

      // Auto-dismiss after duration (if not persistent)
      if (notification.duration && notification.duration > 0) {
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, notification.duration);
      }

      return id;
    },
    [maxHistory, persistent],
  );

  /**
   * Clear all notifications
   */
  const clearAll = React.useCallback(() => {
    setNotifications([]);
  }, []);

  /**
   * Clear notifications by channel
   */
  const clearChannel = React.useCallback((channel: NotificationChannel) => {
    setNotifications((prev) => prev.filter((n) => n.channel !== channel));
  }, []);

  /**
   * Group notifications by function
   */
  const groupBy = React.useCallback(
    (fn: GroupByFunction): Record<string, NotificationData[]> => {
      return notifications.reduce(
        (acc, notification) => {
          const key = fn(notification);
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(notification);
          return acc;
        },
        {} as Record<string, NotificationData[]>,
      );
    },
    [notifications],
  );

  /**
   * Get persistent history
   */
  const getHistory = React.useCallback(() => {
    return history;
  }, [history]);

  /**
   * Get notifications by channel
   */
  const getByChannel = React.useCallback(
    (channel: NotificationChannel): NotificationData[] => {
      return notifications.filter((n) => n.channel === channel);
    },
    [notifications],
  );

  /**
   * Get all notifications
   */
  const getAll = React.useCallback(() => {
    return notifications;
  }, [notifications]);

  /**
   * Mark notification as read
   */
  const markAsRead = React.useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    setHistory((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  /**
   * Mark all as read
   */
  const markAllAsRead = React.useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setHistory((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  /**
   * Get unread count
   */
  const getUnreadCount = React.useCallback(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const contextValue = React.useMemo<NotificationContextType>(
    () => ({
      push,
      remove,
      clearAll,
      clearChannel,
      groupBy,
      getHistory,
      getByChannel,
      getAll,
      markAsRead,
      markAllAsRead,
      getUnreadCount,
    }),
    [
      push,
      remove,
      clearAll,
      clearChannel,
      groupBy,
      getHistory,
      getByChannel,
      getAll,
      markAsRead,
      markAllAsRead,
      getUnreadCount,
    ],
  );

  return (
    <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
  );
}

/**
 * Hook to use notification center context
 */
export function useNotificationCenterContext(): NotificationContextType {
  const context = React.useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotificationCenterContext must be used within a NotificationCenterProvider",
    );
  }
  return context;
}
