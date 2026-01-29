/**
 * NotificationCenter.utils execution test.
 * Executes getChannelFromVariant and getVariantFromChannel.
 */

import { expect, it } from "vitest";

import {
  getChannelFromVariant,
  getVariantFromChannel,
} from "@/DOMAIN/notifications/notifications/NotificationCenter.utils";

it("executes getChannelFromVariant", () => {
  expect(getChannelFromVariant()).toBe("info");
  expect(getChannelFromVariant("danger")).toBe("error");
  expect(getChannelFromVariant("success")).toBe("success");
  expect(getChannelFromVariant("warning")).toBe("warning");
  expect(getChannelFromVariant("system")).toBe("system");
  expect(getChannelFromVariant("log")).toBe("log");
});

it("executes getVariantFromChannel", () => {
  expect(getVariantFromChannel("error")).toBe("danger");
  expect(getVariantFromChannel("success")).toBe("success");
  expect(getVariantFromChannel("info")).toBe("default");
});
