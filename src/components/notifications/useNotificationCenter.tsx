"use client";

/**
 * useNotificationCenter Hook
 *
 * Hook providing multi-channel notification API.
 * Wraps NotificationCenter.Provider context with convenience methods.
 *
 * @example
 * ```tsx
 * const notify = useNotificationCenter();
 *
 * notify.success("Operation completed!");
 * notify.error("Something went wrong");
 * notify.info("New message received");
 * ```
 */

import * as React from "react";

import { useNotificationCenterContext } from "./NotificationCenter.Provider";
import type { NotificationOptions } from "./NotificationCenter.types";

export interface NotificationAPI {
  /**
   * Show success notification
   */
  success: (message: string, options?: Omit<NotificationOptions, "variant" | "channel">) => string;

  /**
   * Show error notification
   */
  error: (message: string, options?: Omit<NotificationOptions, "variant" | "channel">) => string;

  /**
   * Show info notification
   */
  info: (message: string, options?: Omit<NotificationOptions, "variant" | "channel">) => string;

  /**
   * Show warning notification
   */
  warning: (message: string, options?: Omit<NotificationOptions, "variant" | "channel">) => string;

  /**
   * Show system notification
   */
  system: (message: string, options?: Omit<NotificationOptions, "variant" | "channel">) => string;

  /**
   * Show log notification
   */
  log: (message: string, options?: Omit<NotificationOptions, "variant" | "channel">) => string;

  /**
   * Push custom notification
   */
  push: (options: NotificationOptions) => string;

  /**
   * Remove notification by ID
   */
  remove: (id: string) => void;

  /**
   * Clear all notifications
   */
  clearAll: () => void;

  /**
   * Clear notifications by channel
   */
  clearChannel: (channel: "success" | "error" | "info" | "warning" | "system" | "log") => void;
}

/**
 * useNotificationCenter hook - multi-channel notification API
 */
export function useNotificationCenter(): NotificationAPI {
  const context = useNotificationCenterContext();

  const success = React.useCallback(
    (message: string, options?: Omit<NotificationOptions, "variant" | "channel">) => {
      return context.push({
        ...options,
        description: message,
        variant: "success",
        channel: "success",
      });
    },
    [context],
  );

  const error = React.useCallback(
    (message: string, options?: Omit<NotificationOptions, "variant" | "channel">) => {
      return context.push({
        ...options,
        description: message,
        variant: "danger",
        channel: "error",
      });
    },
    [context],
  );

  const info = React.useCallback(
    (message: string, options?: Omit<NotificationOptions, "variant" | "channel">) => {
      return context.push({
        ...options,
        description: message,
        variant: "info",
        channel: "info",
      });
    },
    [context],
  );

  const warning = React.useCallback(
    (message: string, options?: Omit<NotificationOptions, "variant" | "channel">) => {
      return context.push({
        ...options,
        description: message,
        variant: "warning",
        channel: "warning",
      });
    },
    [context],
  );

  const system = React.useCallback(
    (message: string, options?: Omit<NotificationOptions, "variant" | "channel">) => {
      return context.push({
        ...options,
        description: message,
        variant: "system",
        channel: "system",
      });
    },
    [context],
  );

  const log = React.useCallback(
    (message: string, options?: Omit<NotificationOptions, "variant" | "channel">) => {
      return context.push({
        ...options,
        description: message,
        variant: "log",
        channel: "log",
      });
    },
    [context],
  );

  return React.useMemo(
    () => ({
      success,
      error,
      info,
      warning,
      system,
      log,
      push: context.push,
      remove: context.remove,
      clearAll: context.clearAll,
      clearChannel: context.clearChannel,
    }),
    [success, error, info, warning, system, log, context],
  );
}
