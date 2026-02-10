import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Carousel } from "@/COMPOSITION/carousel/Carousel/Carousel";
import { HeroMedia } from "@/COMPOSITION/hero/HeroMedia/HeroMedia";
import { SegmentedControl } from "@/COMPOSITION/navigation/segmented-control/SegmentedControl";
import { OverlaySlot } from "@/COMPOSITION/overlay/OverlaySlot/OverlaySlot";
import { useModalContext } from "@/COMPOSITION/overlays/ModalProvider/ModalProvider";
import { useNotificationCenterContext } from "@/DOMAIN/notifications/NotificationCenter.Provider";

function withProdEnv(run: () => void) {
  const prevEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  try {
    run();
  } finally {
    process.env.NODE_ENV = prevEnv;
  }
}

function ModalConsumer() {
  useModalContext();
  return <div data-testid="modal-consumer" />;
}

function NotificationConsumer() {
  useNotificationCenterContext();
  return <div data-testid="notification-consumer" />;
}

describe("runtime guards (custom context hooks)", () => {
  it("throws in dev when useModalContext is called without provider", () => {
    expect(() => render(<ModalConsumer />)).toThrow(
      "useModalContext must be used within a ModalProvider",
    );
  });

  it("throws in dev when useNotificationCenterContext is called without provider", () => {
    expect(() => render(<NotificationConsumer />)).toThrow(
      "useNotificationCenterContext must be used within a NotificationCenterProvider",
    );
  });

  it("throws in dev when SegmentedControl.Item is used without Root", () => {
    expect(() => render(<SegmentedControl.Item value="a">A</SegmentedControl.Item>)).toThrow(
      "SegmentedControl components must be used within SegmentedControl.Root",
    );
  });

  it("throws in dev when Carousel subcomponents are used without Root", () => {
    expect(() => render(<Carousel.Prev />)).toThrow(
      "Carousel compound components must be used within Carousel.Root",
    );
  });

  it("throws in dev when OverlaySlot subcomponents are used without Root", () => {
    expect(() => render(<OverlaySlot.Anchor />)).toThrow(
      "OverlaySlot compound components must be used within OverlaySlot.Root",
    );
  });

  it("throws in dev when HeroMedia subcomponents are used without Root", () => {
    expect(() => render(<HeroMedia.Media type="image" />)).toThrow(
      "HeroMedia compound components must be used within HeroMedia.Root",
    );
  });

  it("does not throw in prod when useModalContext is called without provider", () => {
    withProdEnv(() => {
      expect(() => render(<ModalConsumer />)).not.toThrow();
    });
  });

  it("does not throw in prod when useNotificationCenterContext is called without provider", () => {
    withProdEnv(() => {
      expect(() => render(<NotificationConsumer />)).not.toThrow();
    });
  });

  it("does not throw in prod when subcomponents are used without Root", () => {
    withProdEnv(() => {
      expect(() =>
        render(<SegmentedControl.Item value="a">A</SegmentedControl.Item>),
      ).not.toThrow();
      expect(() => render(<Carousel.Prev />)).not.toThrow();
      expect(() => render(<OverlaySlot.Anchor />)).not.toThrow();
      expect(() => render(<HeroMedia.Media type="image" />)).not.toThrow();
    });
  });

  it("SSR does not throw in prod for hook consumers", () => {
    withProdEnv(() => {
      expect(() => renderToString(<ModalConsumer />)).not.toThrow();
      expect(() => renderToString(<NotificationConsumer />)).not.toThrow();
    });
  });
});
