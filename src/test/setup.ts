import "@testing-library/jest-dom/vitest";
// Import custom matchers (extension point for future custom matchers)
import "./custom-matchers";

import { cleanup } from "@testing-library/react";
import { afterEach, expect, vi } from "vitest";
import * as matchers from "vitest-axe/matchers";

import { clearBrandRegistry } from "@/themes/brand_engine";

// Extend expect with vitest-axe matchers
expect.extend(matchers);

// Cleanup after each test
afterEach(() => {
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
