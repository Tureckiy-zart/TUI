/**
 * Gestures (useSwipe) execution test.
 * Executes useSwipe handlers: ref attachment and pointer events on element.
 */

import { renderHook } from "@testing-library/react";
import { it } from "vitest";

import { useSwipe } from "@/FOUNDATION/theme/motion/gestures";

it("executes useSwipe handlers", () => {
  const { result } = renderHook(() => useSwipe({ onSwipe: () => {} }));

  const el = document.createElement("div");
  document.body.appendChild(el);
  result.current.handlers.ref(el);

  el.dispatchEvent(
    new PointerEvent("pointerdown", {
      pointerId: 1,
      clientX: 100,
      clientY: 50,
      pointerType: "touch",
      button: 0,
    }),
  );
  el.dispatchEvent(
    new PointerEvent("pointerup", {
      pointerId: 1,
      clientX: 0,
      clientY: 50,
      pointerType: "touch",
      button: 0,
    }),
  );

  document.body.removeChild(el);
  result.current.handlers.ref(null);
});
