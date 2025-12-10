/**
 * Notification Center Types
 *
 * Type definitions for Notification Center components.
 */

import type { ToastAction } from "../overlays/Toast";

/**
 * Notification channel types
 */
export type NotificationChannel = "success" | "error" | "info" | "warning" | "system" | "log";

/**
 * Notification variant (extends toast variants)
 */
export type NotificationVariant =
  | "default"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "system"
  | "log";

/**
 * Notification data structure
 */
export interface NotificationData {
  id: string;
  title?: string;
  description?: string;
  variant?: NotificationVariant;
  channel?: NotificationChannel;
  action?: ToastAction;
  duration?: number;
  persistent?: boolean;
  timestamp: number;
  read?: boolean;
}

/**
 * Notification options for creating notifications
 */
export interface NotificationOptions {
  title?: string;
  description?: string;
  variant?: NotificationVariant;
  channel?: NotificationChannel;
  action?: ToastAction;
  duration?: number;
  persistent?: boolean;
}

/**
 * Group by function type
 */
export type GroupByFunction = (notification: NotificationData) => string;

/**
 * Notification context type
 */
export interface NotificationContextType {
  /**
   * Push a new notification
   */
  push: (notification: NotificationOptions) => string;

  /**
   * Remove a specific notification by ID
   */
  remove: (id: string) => void;

  /**
   * Clear all notifications
   */
  clearAll: () => void;

  /**
   * Clear notifications by channel
   */
  clearChannel: (channel: NotificationChannel) => void;

  /**
   * Group notifications by function
   */
  groupBy: (fn: GroupByFunction) => Record<string, NotificationData[]>;

  /**
   * Get persistent history
   */
  getHistory: () => NotificationData[];

  /**
   * Get notifications by channel
   */
  getByChannel: (channel: NotificationChannel) => NotificationData[];

  /**
   * Get all notifications
   */
  getAll: () => NotificationData[];

  /**
   * Mark notification as read
   */
  markAsRead: (id: string) => void;

  /**
   * Mark all as read
   */
  markAllAsRead: () => void;

  /**
   * Get unread count
   */
  getUnreadCount: () => number;
}
