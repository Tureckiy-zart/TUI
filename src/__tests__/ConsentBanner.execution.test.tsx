/**
 * ConsentBanner execution test.
 * Executes accept flow: render with message + acceptLabel, click button.
 */

import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { it } from "vitest";

import { ConsentBanner } from "@/PATTERNS/states/ConsentBanner/ConsentBanner";
import { ThemeProvider } from "@/FOUNDATION/theme/ThemeProvider";

it("executes ConsentBanner accept flow", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(ThemeProvider, { defaultTheme: "default", children });

  const { getByRole } = render(<ConsentBanner message="Consent message" acceptLabel="Accept" />, {
    wrapper,
  });

  fireEvent.click(getByRole("button"));
});
