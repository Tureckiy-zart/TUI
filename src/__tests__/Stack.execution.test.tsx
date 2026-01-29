/**
 * Stack execution test.
 * Renders Stack default and with direction horizontal.
 */

import { render } from "@testing-library/react";
import { it } from "vitest";

import { Stack } from "@/COMPOSITION/layout/Stack/Stack";

it("renders Stack variants", () => {
  render(<Stack />);
  render(<Stack direction="horizontal" />);
});
