import "@testing-library/jest-dom";
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
  value: vi.fn().mockImplementation((query) => ({
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
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;
