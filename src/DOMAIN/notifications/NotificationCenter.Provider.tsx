"use client";

/**
 * NotificationCenter.Provider Component
 *
 * Global notification state management provider.
 * Manages persistent history, multi-channel support, and notification lifecycle.
 * SSR-safe: no window/document access in render.
 */

import * as React from "react";

import { getDelayMs } from "@/index";

import type {
  GroupByFunction,
  NotificationChannel,
  NotificationContextType,
  NotificationData,
  NotificationOptions,
} from "./NotificationCenter.types";
import { getChannelFromVariant, getVariantFromChannel } from "./NotificationCenter.utils";

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
  const timersRef = React.useRef<Map<string, NodeJS.Timeout>>(new Map());

  // Cleanup all timers on unmount
  React.useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => {
        clearTimeout(timer);
      });
      timers.clear();
    };
  }, []);

  /**
   * Remove a specific notification
   */
  const remove = React.useCallback((id: string) => {
    // Clear timer if exists
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  /**
   * Push a new notification
   */
  const push = React.useCallback(
    (options: NotificationOptions): string => {
      const id = Math.random().toString(36).substr(2, 9);
      const timestamp = Date.now();

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
        duration: options.duration,
      };

      const durationMs = getDelayMs(options.duration, options.persistent ? 0 : 5000);

      setNotifications((prev) => [...prev, notification]);

      // Add to history if persistent
      if (persistent) {
        setHistory((prev) => {
          const updated = [notification, ...prev];
          return updated.slice(0, maxHistory);
        });
      }

      // Auto-dismiss after duration (if not persistent)
      if (durationMs > 0) {
        const timer = setTimeout(() => {
          timersRef.current.delete(id);
          setNotifications((prev) => prev.filter((n) => n.id !== id));
        }, durationMs);
        timersRef.current.set(id, timer);
      }

      return id;
    },
    [maxHistory, persistent],
  );

  /**
   * Clear all notifications
   */
  const clearAll = React.useCallback(() => {
    // Clear all timers
    timersRef.current.forEach((timer) => {
      clearTimeout(timer);
    });
    timersRef.current.clear();
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
