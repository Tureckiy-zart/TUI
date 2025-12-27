import "@testing-library/jest-dom/vitest";
// Import custom matchers (extension point for future custom matchers)
import "./custom-matchers";

import { cleanup } from "@testing-library/react";
import { afterEach, expect, vi } from "vitest";
import * as matchers from "vitest-axe/matchers";

import { clearBrandRegistry } from "@/themes/brand_engine";

// Extend expect with vitest-axe matchers
expect.extend(matchers);

// Global error handler to catch Radix UI async callback errors and React DOM errors
// Radix UI components (like Toast) use async callbacks that may try to access
// document after test completion. React DOM may also try to access window
// after component unmount when setTimeout callbacks execute.
// This handler prevents these errors from causing test failures.
const originalErrorHandler = process.listeners("uncaughtException")[0];
process.removeAllListeners("uncaughtException");
process.on("uncaughtException", (error) => {
  // Ignore errors about document not being defined from Radix UI callbacks
  if (
    error instanceof ReferenceError &&
    error.message.includes("document is not defined") &&
    error.stack?.includes("@radix-ui")
  ) {
    // Silently ignore - this is expected behavior when Radix UI callbacks
    // execute after test completion
    return;
  }
  // Ignore errors about window not being defined from React DOM
  // This can happen when setTimeout callbacks execute after component unmount
  if (
    error instanceof ReferenceError &&
    error.message.includes("window is not defined") &&
    error.stack?.includes("react-dom")
  ) {
    // Silently ignore - this is expected behavior when React DOM callbacks
    // execute after test completion
    return;
  }
  // Re-throw other errors
  if (originalErrorHandler) {
    // UncaughtExceptionListener expects (error, origin) - pass both arguments
    // If handler doesn't accept origin, it will be ignored
    (originalErrorHandler as (error: Error, origin?: string) => void)(error, "uncaughtException");
  } else {
    throw error;
  }
});

// Cleanup after each test
afterEach(async () => {
  // Cleanup Radix UI portals first
  // Radix UI components (like Toast) use portals and async callbacks
  // that may try to access document after test completion
  if (typeof document !== "undefined") {
    // Remove all Radix UI portal containers
    const portals = document.querySelectorAll("[data-radix-portal]");
    portals.forEach((portal) => {
      portal.remove();
    });
    // Also remove any toast viewports that might be left behind
    const toastViewports = document.querySelectorAll("[data-radix-toast-viewport]");
    toastViewports.forEach((viewport) => {
      viewport.remove();
    });
  }

  // Wait for any pending async operations to complete
  // This allows Radix UI callbacks to finish before cleanup
  await new Promise((resolve) => {
    if (typeof setTimeout !== "undefined") {
      setTimeout(resolve, 10);
    } else {
      resolve(undefined);
    }
  });

  cleanup();
  // Clear brand registry to prevent "already registered" errors between tests
  clearBrandRegistry();
});

// Mock matchMedia for components that use media queries
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver

global.IntersectionObserver = class IntersectionObserver {
  // eslint-disable-next-line no-empty-function
  constructor() {}
  // eslint-disable-next-line no-empty-function
  disconnect() {}
  // eslint-disable-next-line no-empty-function
  observe() {}
  takeRecords() {
    return [];
  }
  // eslint-disable-next-line no-empty-function
  unobserve() {}
} as any;

// Mock ResizeObserver

global.ResizeObserver = class ResizeObserver {
  // eslint-disable-next-line no-empty-function
  constructor() {}
  // eslint-disable-next-line no-empty-function
  disconnect() {}
  // eslint-disable-next-line no-empty-function
  observe() {}
  // eslint-disable-next-line no-empty-function
  unobserve() {}
} as any;

// Polyfill for Pointer Events API methods missing in JSDOM
// Required for Radix UI components (e.g., react-select) that use pointer events
// These methods are not implemented in JSDOM but are needed for React 19 compatibility

const noop = () => {};

if (!HTMLElement.prototype.hasPointerCapture) {
  HTMLElement.prototype.hasPointerCapture = function () {
    return false;
  };
}

if (!HTMLElement.prototype.setPointerCapture) {
  HTMLElement.prototype.setPointerCapture = noop;
}

if (!HTMLElement.prototype.releasePointerCapture) {
  HTMLElement.prototype.releasePointerCapture = noop;
}

// Mock getBoundingClientRect for Radix UI positioning
// Radix UI components use getBoundingClientRect for positioning portals
// In JSDOM, this method needs to return proper values
const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
Element.prototype.getBoundingClientRect = function () {
  if (this === document.documentElement || this === document.body) {
    return {
      width: 1024,
      height: 768,
      top: 0,
      left: 0,
      bottom: 768,
      right: 1024,
      x: 0,
      y: 0,
      toJSON: () => {},
    } as DOMRect;
  }
  // Return default values for other elements
  const rect = originalGetBoundingClientRect.call(this);
  if (rect.width === 0 && rect.height === 0) {
    return {
      width: 100,
      height: 50,
      top: 0,
      left: 0,
      bottom: 50,
      right: 100,
      x: 0,
      y: 0,
      toJSON: () => {},
    } as DOMRect;
  }
  return rect;
};

// Mock scrollIntoView for Radix UI components
// Radix UI uses scrollIntoView to scroll items into view
HTMLElement.prototype.scrollIntoView = vi.fn();

// Setup portal container for Radix UI components
// Radix UI uses portals to render content outside the component tree
// In tests, we need to ensure portals render to document.body
if (typeof document !== "undefined") {
  // Create a container for portals if it doesn't exist
  const portalContainer = document.createElement("div");
  portalContainer.setAttribute("data-testid", "radix-portal-container");
  document.body.appendChild(portalContainer);
}
