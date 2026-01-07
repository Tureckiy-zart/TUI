"use client";

/**
 * FocusTrap Component
 *
 * Reusable focus containment utility for accessibility-critical components.
 * Traps focus within children subtree using Tab/Shift+Tab cycling.
 *
 * This component provides a composable API for focus trap functionality,
 * making it easy to add focus containment to modals, drawers, menus, and other overlays.
 *
 * @enforcement TUNG_FOCUSTRAP_TOKEN_ENFORCEMENT
 *
 * Token Enforcement Rules:
 * - FocusTrap is a pure logical component with NO visual representation
 * - FocusTrap does NOT use tokens (no styling, no visual output)
 * - Component provides focus management logic only (keyboard navigation, focus trapping)
 * - NO Tailwind classes are used (component has no DOM output)
 * - Component wraps children but does not apply any styling
 * - This is a behavioral/logical component, not a visual component
 *
 * Accessibility Authority Rules:
 * - Component provides focus trap functionality for accessibility
 * - Focus management is handled via JavaScript event listeners
 * - Component does not affect visual styling of children
 *
 * @see docs/architecture/LAYOUT_AUTHORITY.md
 *
 * Authority Compliance:
 * - Layout Authority: FocusTrap does not apply layout (pure logical component)
 * - Color Authority: FocusTrap does not apply colors (no visual representation)
 * - Typography Authority: FocusTrap does not apply typography (no visual representation)
 * - Spacing Authority: FocusTrap does not apply spacing (no visual representation)
 * - Accessibility Authority: FocusTrap provides focus management for accessibility
 *
 * Token-only contract:
 * - FocusTrap has no token usage (pure logical component)
 * - Component provides focus management logic only
 * - All visual styling is handled by child components
 * - This is a behavioral component, not a visual component
 *
 * @example
 * ```tsx
 * // Basic usage
 * <FocusTrap>
 *   <ModalContent />
 * </FocusTrap>
 *
 * // With initial focus
 * <FocusTrap initialFocusRef={inputRef}>
 *   <Form />
 * </FocusTrap>
 *
 * // With Escape handler
 * <FocusTrap onEscape={handleClose}>
 *   <DialogContent />
 * </FocusTrap>
 * ```
 */

import * as React from "react";

export interface FocusTrapProps {
  /**
   * Child elements to trap focus within
   */
  children: React.ReactNode;

  /**
   * Whether focus trap is active
   * @default true
   */
  active?: boolean;

  /**
   * Ref to element that should receive initial focus
   * If not provided, first focusable child receives focus
   */
  initialFocusRef?: React.RefObject<HTMLElement | null>;

  /**
   * Whether to restore focus to previous element on unmount/active=false
   * @default true
   */
  restoreFocus?: boolean;

  /**
   * Whether to loop focus (wrap from last to first and vice versa)
   * @default true
   */
  loop?: boolean;

  /**
   * Callback triggered when Escape key is pressed
   * If not provided, Escape key does nothing
   */
  onEscape?: () => void;
}

/**
 * Get all focusable elements within a container
 */
function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const focusableSelectors = [
    "a[href]",
    "button:not([disabled])",
    "textarea:not([disabled])",
    "input:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(", ");

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors)).filter((el) => {
    // Check if element is disabled
    if (el.hasAttribute("disabled")) {
      return false;
    }
    // Check if element is visible
    // In test environment, elements may not have offsetParent even if visible
    // So we check both offsetParent and computed style
    if (el.offsetParent === null) {
      try {
        // In test environment, check computed style
        // If getComputedStyle fails (e.g., in some test environments), allow the element
        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") {
          return false;
        }
      } catch {
        // If getComputedStyle fails, assume element is focusable (for test environments)
        // This allows tests to work even if computed style is not available
      }
    }
    return true;
  });
}

/**
 * FocusTrap component
 *
 * Provides reusable focus containment utility for accessibility-critical components.
 * Traps focus within children subtree using Tab/Shift+Tab cycling.
 *
 * COMPLIANCE NOTES:
 * - ✅ Uses no visual tokens (component intentionally non-visual)
 * - ✅ NO MOTION BY DESIGN (programmatic focus management, no visual animations)
 * - ✅ Follows Extension Authority Contract
 * - ✅ Does NOT duplicate Foundation functionality
 * - ✅ Works with screen readers through standard focus management
 */
const FocusTrap = React.forwardRef<HTMLDivElement, FocusTrapProps>(
  (
    {
      children,
      active = true,
      initialFocusRef,
      restoreFocus = true,
      loop = true,
      onEscape,
      ...props
    },
    ref,
  ) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const previousActiveElementRef = React.useRef<HTMLElement | null>(null);
    const activeRef = React.useRef(active);

    // Update activeRef when active changes
    React.useEffect(() => {
      activeRef.current = active;
    }, [active]);

    // Merge refs
    React.useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

    React.useEffect(() => {
      if (!containerRef.current) {
        return;
      }

      const container = containerRef.current;

      // When active is false, ensure no event listeners are attached
      // and no focus management is performed
      if (!active) {
        // Cleanup will handle removal if active was previously true
        return;
      }

      const previousActiveElement = document.activeElement as HTMLElement;

      // Copy ref value to avoid stale closure in cleanup
      const initialFocusElement = initialFocusRef?.current;

      // Store the previously focused element only if it's outside the container
      // This preserves the element that was focused before trap activation
      if (previousActiveElement && !container.contains(previousActiveElement)) {
        previousActiveElementRef.current = previousActiveElement;
      } else if (!previousActiveElementRef.current) {
        // If no previous element stored and current element is inside container,
        // store it anyway (edge case for initial mount)
        previousActiveElementRef.current = previousActiveElement;
      }

      // Store focusable elements for keydown handler and focus management
      let focusableElements: HTMLElement[] = [];
      let firstElement: HTMLElement | null = null;
      let lastElement: HTMLElement | null = null;

      // Update focusable elements list
      const updateFocusableElements = () => {
        focusableElements = getFocusableElements(container);
        firstElement = focusableElements[0] || null;
        lastElement = focusableElements[focusableElements.length - 1] || null;
      };

      // Initial update
      updateFocusableElements();

      // Focus initial element only if there are focusable elements
      const focusTimeoutId = setTimeout(() => {
        // Check if still active (may have changed)
        if (!activeRef.current) {
          return;
        }

        // Recalculate focusable elements before focusing (DOM might have changed)
        updateFocusableElements();

        // Don't try to focus if there are no focusable elements
        if (focusableElements.length === 0) {
          return;
        }

        // Use initialFocusRef if provided, otherwise use first focusable element
        const targetElement = initialFocusRef?.current || firstElement;

        if (targetElement && container.contains(targetElement)) {
          // Use another setTimeout to ensure focus can be set
          setTimeout(() => {
            // Check if still active (may have changed)
            if (!activeRef.current) {
              return;
            }

            // Recalculate again to ensure we have the latest elements
            updateFocusableElements();
            // Check again if we have focusable elements
            if (focusableElements.length === 0) {
              return;
            }
            const latestTargetElement = initialFocusRef?.current || firstElement;
            if (latestTargetElement && container.contains(latestTargetElement)) {
              latestTargetElement.focus();
            }
          }, 0);
        }
      }, 0);

      /**
       * Handle Tab key navigation
       */
      function handleKeyDown(event: KeyboardEvent): void {
        if (event.key === "Escape" && onEscape) {
          event.preventDefault();
          onEscape();
          return;
        }

        if (event.key !== "Tab") {
          return;
        }

        // If active is false, don't trap focus - allow normal Tab behavior
        // Use activeRef to get the current value, as active in closure may be stale
        if (!activeRef.current) {
          return;
        }

        // Update focusable elements in case DOM changed
        updateFocusableElements();

        if (focusableElements.length === 0) {
          return;
        }

        const isShiftTab = event.shiftKey;
        const currentActiveElement = document.activeElement as HTMLElement;
        const currentIndex = focusableElements.indexOf(currentActiveElement);

        // Only trap focus if current focus is within the container
        if (!container.contains(currentActiveElement)) {
          return;
        }

        if (loop) {
          if (isShiftTab && currentActiveElement === firstElement) {
            // Shift+Tab: wrap to last
            event.preventDefault();
            lastElement?.focus();
          } else if (!isShiftTab && currentActiveElement === lastElement) {
            // Tab: wrap to first
            event.preventDefault();
            firstElement?.focus();
          } else if (
            !isShiftTab &&
            currentIndex >= 0 &&
            currentIndex < focusableElements.length - 1
          ) {
            // Tab: focus next element
            event.preventDefault();
            const nextIndex = currentIndex + 1;
            focusableElements[nextIndex]?.focus();
          } else if (isShiftTab && currentIndex > 0) {
            // Shift+Tab: focus previous element
            event.preventDefault();
            const prevIndex = currentIndex - 1;
            focusableElements[prevIndex]?.focus();
          } else if (currentIndex === -1) {
            // Focus is inside container but not in our list - focus first element
            event.preventDefault();
            firstElement?.focus();
          }
        } else if (isShiftTab && currentActiveElement === firstElement) {
          // No loop: prevent wrapping
          // Shift+Tab at first: prevent default (stay at first)
          event.preventDefault();
        } else if (!isShiftTab && currentActiveElement === lastElement) {
          // Tab at last: prevent default (stay at last)
          event.preventDefault();
        } else if (
          !isShiftTab &&
          currentIndex >= 0 &&
          currentIndex < focusableElements.length - 1
        ) {
          // Tab: focus next element
          event.preventDefault();
          const nextIndex = currentIndex + 1;
          focusableElements[nextIndex]?.focus();
        } else if (isShiftTab && currentIndex > 0) {
          // Shift+Tab: focus previous element
          event.preventDefault();
          const prevIndex = currentIndex - 1;
          focusableElements[prevIndex]?.focus();
        } else if (currentIndex === -1) {
          // Focus is inside container but not in our list - focus first element
          event.preventDefault();
          firstElement?.focus();
        }
      }

      container.addEventListener("keydown", handleKeyDown);

      return () => {
        clearTimeout(focusTimeoutId);
        container.removeEventListener("keydown", handleKeyDown);

        // Return focus to previous element if restoreFocus is true
        if (restoreFocus) {
          // Use the copied ref value from effect scope
          // Use setTimeout with a small delay to ensure focus restoration happens
          // after DOM updates and component unmounting is complete
          // This works better in test environments than immediate focus
          setTimeout(() => {
            // Try initialFocusRef first (if it was the trigger)
            if (initialFocusElement) {
              const element = initialFocusElement;
              // Verify element is still in DOM before focusing
              if (document.body.contains(element)) {
                try {
                  element.focus();
                  return;
                } catch {
                  // If focus fails, fall through to previous element
                }
              }
            }

            // Fallback to previous active element
            if (previousActiveElementRef.current) {
              const element = previousActiveElementRef.current;
              // Verify element is still in DOM before focusing
              if (document.body.contains(element)) {
                try {
                  element.focus();
                } catch {
                  // If focus fails, silently ignore
                }
              }
            }
          }, 10);
        }
      };
    }, [active, initialFocusRef, restoreFocus, loop, onEscape]);

    return (
      <div ref={containerRef} {...props}>
        {children}
      </div>
    );
  },
);

FocusTrap.displayName = "FocusTrap";

export { FocusTrap };
