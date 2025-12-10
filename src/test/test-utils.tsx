/**
 * Test Utilities
 *
 * Centralized testing utilities for Tenerife UI components.
 * Provides render helpers, userEvent setup, theme-aware rendering, and accessibility testing utilities.
 */

import { cleanup, render, type RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AxeResults } from "axe-core";
import type { ReactElement } from "react";
import { afterEach } from "vitest";
import { axe } from "vitest-axe";

import { ThemeProvider, type ThemeProviderProps } from "@/theme";

/**
 * Global cleanup after each test to prevent memory leaks
 * This ensures event listeners, timers, and DOM nodes are properly cleaned up
 */
afterEach(() => {
  cleanup();
});

/**
 * Re-export render from @testing-library/react for convenience
 */
export { render };

/**
 * Re-export userEvent.setup() for convenience
 * Use this to get a userEvent instance for interaction testing
 *
 * @example
 * ```tsx
 * const user = userEvent.setup();
 * await user.click(button);
 * ```
 */
export const userEventSetup = () => userEvent.setup();

/**
 * Render options for renderWithTheme
 */
export interface RenderWithThemeOptions extends Omit<RenderOptions, "wrapper"> {
  /**
   * ThemeProvider props
   */
  themeProviderProps?: Partial<ThemeProviderProps>;
}

/**
 * Render component with ThemeProvider wrapper
 *
 * This utility automatically wraps the component with ThemeProvider,
 * ensuring components render correctly with theme context.
 *
 * @param ui - React element to render
 * @param options - Render options and ThemeProvider props
 * @returns Render result from @testing-library/react
 *
 * @example
 * ```tsx
 * const { container } = renderWithTheme(<Button>Click me</Button>);
 * ```
 *
 * @example
 * ```tsx
 * const { container } = renderWithTheme(
 *   <Button>Click me</Button>,
 *   {
 *     themeProviderProps: {
 *       defaultMode: "night",
 *       defaultTheme: "brand"
 *     }
 *   }
 * );
 * ```
 */
export function renderWithTheme(
  ui: ReactElement,
  options: RenderWithThemeOptions = {},
): ReturnType<typeof render> {
  const { themeProviderProps = {}, ...renderOptions } = options;

  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <ThemeProvider
        defaultMode="day"
        defaultTheme="default"
        enableSystem={false}
        {...themeProviderProps}
      >
        {children}
      </ThemeProvider>
    );
  };

  return render(ui, { ...renderOptions, wrapper: Wrapper });
}

/**
 * Accessibility check utility using vitest-axe
 *
 * This function prepares an accessibility check for future use.
 * It returns a promise that resolves to AxeResults.
 *
 * @param container - DOM element or container to check
 * @returns Promise resolving to AxeResults
 *
 * @example
 * ```tsx
 * const { container } = renderWithTheme(<Button>Click me</Button>);
 * const results = await axeCheck(container);
 * expect(results).toHaveNoViolations();
 * ```
 */
export async function axeCheck(container: HTMLElement | Element): Promise<AxeResults> {
  return axe(container);
}
