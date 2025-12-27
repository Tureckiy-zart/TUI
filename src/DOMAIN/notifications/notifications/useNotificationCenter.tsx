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
import type {
  NotificationChannel,
  NotificationOptions,
  NotificationVariant,
} from "./NotificationCenter.types";

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

  /**
   * Create channel notification method
   * Helper function to reduce duplication in channel methods
   */
  const createChannelMethod = React.useCallback(
    (variant: NotificationVariant, channel: NotificationChannel) => {
      return (message: string, options?: Omit<NotificationOptions, "variant" | "channel">) => {
        return context.push({
          ...options,
          description: message,
          variant,
          channel,
        });
      };
    },
    [context],
  );

  const success = React.useMemo(
    () => createChannelMethod("success", "success"),
    [createChannelMethod],
  );
  const error = React.useMemo(() => createChannelMethod("danger", "error"), [createChannelMethod]);
  const info = React.useMemo(() => createChannelMethod("info", "info"), [createChannelMethod]);
  const warning = React.useMemo(
    () => createChannelMethod("warning", "warning"),
    [createChannelMethod],
  );
  const system = React.useMemo(
    () => createChannelMethod("system", "system"),
    [createChannelMethod],
  );
  const log = React.useMemo(() => createChannelMethod("log", "log"), [createChannelMethod]);

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
