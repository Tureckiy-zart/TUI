"use client";

/**
 * Toaster Component
 *
 * Global toast manager component that composes ToastProvider, ToastViewport, and ToastRoot.
 * Provides imperative toast API via useGlobalToast hook.
 *
 * @enforcement TUNG_TOASTER_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - Toaster is a composition component that delegates ALL styling to composed components
 * - ALL styling is delegated to ToastProvider, ToastViewport, and ToastRoot components
 * - Toaster does NOT use tokens directly
 * - ToastProvider handles Radix context (no styling)
 * - ToastViewport handles positioning via TOAST_TOKENS
 * - ToastRoot handles toast styling via TOAST_TOKENS
 * - NO raw Tailwind classes allowed (component delegates styling)
 *
 * Composition Authority Rules:
 * - Toaster composes ToastProvider for Radix context
 * - Toaster composes ToastViewport for positioning
 * - Toaster composes ToastRoot for toast rendering
 * - Styling is delegated to all composed components
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Layout Authority: Toaster uses ToastViewport which handles layout via TOAST_TOKENS
 * - Spacing Authority: Toaster uses spacing token system via ToastViewport
 * - Color Authority: Toaster uses color token system via ToastRoot
 * - Typography Authority: Toaster uses typography token system via ToastRoot
 *
 * Token-only contract:
 * - Toaster has no direct token usage (composition component)
 * - All styling occurs through composed components:
 *   - ToastProvider provides Radix context (no styling)
 *   - ToastViewport handles positioning (TOAST_TOKENS)
 *   - ToastRoot handles toast styling (TOAST_TOKENS)
 * - All composed components handle token enforcement
 */

import { ToastProvider, ToastViewport } from "@/COMPOSITION/overlays";
import {
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastRoot,
  ToastTitle,
} from "@/COMPOSITION/overlays/Toast";
import { useGlobalToast } from "@/hooks/useGlobalToast";

export function Toaster() {
  const { toasts, dismiss } = useGlobalToast();

  return (
    <ToastProvider>
      {toasts.map((toastData) => {
        return (
          <ToastRoot
            key={toastData.id}
            variant={toastData.variant}
            open={true}
            onOpenChange={(open) => {
              if (!open) {
                dismiss(toastData.id);
              }
            }}
          >
            {toastData.title && <ToastTitle>{toastData.title}</ToastTitle>}
            {toastData.description && <ToastDescription>{toastData.description}</ToastDescription>}
            {toastData.action && (
              <ToastAction onClick={toastData.action.onClick} altText={toastData.action.label}>
                {toastData.action.label}
              </ToastAction>
            )}
            <ToastClose />
          </ToastRoot>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
