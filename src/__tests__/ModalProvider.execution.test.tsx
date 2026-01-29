/**
 * ModalProvider execution test.
 * Executes open/close via useModal within ModalProvider wrapper.
 */

import { act, renderHook } from "@testing-library/react";
import React from "react";
import { it } from "vitest";

import { ModalProvider } from "@/COMPOSITION/overlays/ModalProvider/ModalProvider";
import { useModal } from "@/hooks/useModal";

it("executes ModalProvider open/close", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(ModalProvider, null, children);

  const { result } = renderHook(() => useModal(), { wrapper });

  act(() => {
    result.current.open(undefined);
  });
  act(() => {
    result.current.close();
  });
});
