/**
 * NotificationCenter Utility Functions
 *
 * Shared utility functions for variant/channel conversion and notification creation.
 */

import type { NotificationChannel, NotificationVariant } from "./NotificationCenter.types";

/**
 * Get notification channel from variant
 */
export function getChannelFromVariant(variant?: string): NotificationChannel {
  if (variant === "danger") return "error";
  if (variant === "success") return "success";
  if (variant === "warning") return "warning";
  if (variant === "system") return "system";
  if (variant === "log") return "log";
  return "info";
}

/**
 * Get notification variant from channel
 */
export function getVariantFromChannel(channel: NotificationChannel): NotificationVariant {
  if (channel === "error") return "danger";
  if (channel === "success") return "success";
  return "default";
}
