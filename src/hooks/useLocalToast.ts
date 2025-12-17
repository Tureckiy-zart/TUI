/**
 * Canonical export for local/component-scoped toast hook
 *
 * This hook provides toast functionality scoped to a single component.
 * Use this when you need to display toasts within a specific component's context.
 *
 * @see useGlobalToast for global application-level toasts
 * @see docs/architecture/TOAST_SYSTEM.md for usage guidelines
 */

export { type Toast, type ToastType, useLocalToast, type UseToastReturn } from "./useToast";
