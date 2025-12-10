/**
 * Custom Matchers
 *
 * Extension point for custom Vitest matchers.
 * @testing-library/jest-dom already provides most common matchers like:
 * - toBeInTheDocument
 * - toHaveClass
 * - toBeVisible
 * - toHaveAttribute
 * - toHaveTextContent
 * - etc.
 *
 * This file serves as an extension point for project-specific custom matchers.
 */

/**
 * Custom matchers can be added here in the future.
 * For now, @testing-library/jest-dom provides all necessary matchers.
 *
 * Example of how to add a custom matcher:
 *
 * ```typescript
 * expect.extend({
 *   toBeValidToken(received) {
 *     const pass = typeof received === 'string' && received.startsWith('--');
 *     return {
 *       message: () => `expected ${received} to be a valid CSS token`,
 *       pass,
 *     };
 *   },
 * });
 * ```
 */

// Placeholder for future custom matchers
// This file ensures the extension point exists and can be imported in setup.ts

export {};
