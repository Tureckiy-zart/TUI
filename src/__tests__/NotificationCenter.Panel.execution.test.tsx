/**
 * NotificationCenter.Panel execution test.
 * Renders panel empty and open inside NotificationCenterProvider.
 */

import { render } from "@testing-library/react";
import React from "react";
import { it, vi } from "vitest";

import { NotificationCenterPanel } from "@/DOMAIN/notifications/NotificationCenter.Panel";
import { NotificationCenterProvider } from "@/DOMAIN/notifications/NotificationCenter.Provider";
import { ThemeProvider } from "@/FOUNDATION/theme/ThemeProvider";

const onClose = vi.fn();

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(ThemeProvider, {
    defaultTheme: "default",
    children: React.createElement(NotificationCenterProvider, null, children),
  });

it("renders NotificationCenterPanel empty and filled", () => {
  render(<NotificationCenterPanel isOpen={false} onClose={onClose} />, { wrapper });
  render(<NotificationCenterPanel isOpen={true} onClose={onClose} />, { wrapper });
});
