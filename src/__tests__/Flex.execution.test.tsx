/**
 * Flex execution test.
 * Renders Flex with align and justify variants.
 */

import { render } from "@testing-library/react";
import { it } from "vitest";

import { Flex } from "@/COMPOSITION/layout/Flex/Flex";

it("renders Flex variants", () => {
  render(<Flex align="center" />);
  render(<Flex justify="between" />);
});
