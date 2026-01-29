/**
 * useInView execution test.
 * Mocks IntersectionObserver and invokes callback with isIntersecting.
 */

import { act, render } from "@testing-library/react";
import React from "react";
import { it } from "vitest";

import { useInView } from "@/COMPOSITION/motion/animation/useInView";

it("executes intersection callback", () => {
  let observeCb: IntersectionObserverCallback = () => {};

  global.IntersectionObserver = class MockIntersectionObserver {
    constructor(cb: IntersectionObserverCallback) {
      observeCb = cb;
    }
    observe() {}
    disconnect() {}
    unobserve() {}
    takeRecords() {
      return [];
    }
    root = null;
    rootMargin = "";
    thresholds = [];
  } as unknown as typeof IntersectionObserver;

  function Target() {
    const { ref } = useInView();
    return React.createElement("div", { ref, "data-testid": "target" });
  }

  render(React.createElement(Target));

  const entry = {
    isIntersecting: true,
    target: document.createElement("div"),
    intersectionRatio: 1,
    boundingClientRect: {} as DOMRectReadOnly,
    intersectionRect: {} as DOMRectReadOnly,
    rootBounds: null,
    time: 0,
  };
  act(() => {
    observeCb([entry], null as unknown as IntersectionObserver);
  });
});
