/**
 * HoverCardContent execution test.
 * Mounts HoverCardContent with children inside HoverCardRoot.
 */

import { render } from "@testing-library/react";
import { it } from "vitest";

import { HoverCardContent } from "@/PATTERNS/menus/hover-card/HoverCardContent";
import { HoverCardRoot } from "@/PATTERNS/menus/hover-card/HoverCardRoot";

it("mounts HoverCardContent", () => {
  render(
    <HoverCardRoot>
      <HoverCardContent>
        <div />
      </HoverCardContent>
    </HoverCardRoot>,
  );
});
