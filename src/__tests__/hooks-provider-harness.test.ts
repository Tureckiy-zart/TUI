/**
 * Hooks Provider Harness Test
 *
 * Executes hooks runtime logic within canonical provider graph.
 * Verifies API contracts (shape + callable) without DOM/visual coupling.
 *
 * @task TUI_TEST_COVERAGE_CANONICAL_001
 * @block BLOCK_03_HOOKS_PROVIDER_HARNESS
 */

import { act, renderHook } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { ModalProvider } from "@/COMPOSITION/overlays/ModalProvider/ModalProvider";
import { ToastProvider } from "@/COMPOSITION/overlays/ToastProvider";
import { ThemeProvider } from "@/FOUNDATION/theme/ThemeProvider";
import { useGlobalToast } from "@/hooks/useGlobalToast";
import { useModal } from "@/hooks/useModal";
import { useToast } from "@/hooks/useToast";

/**
 * TestProviders - Canonical provider graph for hooks testing
 *
 * Real provider graph without mocks or architecture substitution.
 * Provides ThemeProvider, ModalProvider, ToastProvider in correct order.
 */
const TestProviders: React.FC<{ children: React.ReactNode }> = ({ children }) =>
  React.createElement(ThemeProvider, {
    defaultTheme: "default",
    children: React.createElement(
      ModalProvider,
      null,
      React.createElement(ToastProvider, null, children),
    ),
  });

describe("Hooks Provider Harness", () => {
  describe("useModal hook", () => {
    it("exposes modal API without crashing", () => {
      const { result } = renderHook(() => useModal(), {
        wrapper: TestProviders,
      });

      expect(result.current).toBeDefined();
      expect(typeof result.current.open).toBe("function");
      expect(typeof result.current.close).toBe("function");
      expect(typeof result.current.toggle).toBe("function");
    });
  });

  describe("useToast hook", () => {
    it("exposes toast API without crashing", () => {
      const { result } = renderHook(() => useToast(), {
        wrapper: TestProviders,
      });

      expect(result.current).toBeDefined();
      expect(typeof result.current.toast).toBe("function");
      expect(typeof result.current.dismiss).toBe("function");
      expect(typeof result.current.dismissAll).toBe("function");
    });
  });

  describe("useGlobalToast hook", () => {
    it("allows pushing a global toast without crashing", () => {
      const { result } = renderHook(() => useGlobalToast(), {
        wrapper: TestProviders,
      });

      expect(result.current).toBeDefined();

      act(() => {
        result.current.toast({
          variant: "default",
          title: "Test",
          description: "Smoke",
        });
      });

      // Only execution smoke - no DOM assertions
      expect(typeof result.current.toast).toBe("function");
    });
  });
});
