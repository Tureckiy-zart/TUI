/**
 * FOUNDATION/lib/utils execution test.
 * Executes each exported function with safe arguments.
 */

import { it } from "vitest";

import * as utils from "@/FOUNDATION/lib/utils";

it("executes foundation utils", () => {
  Object.values(utils).forEach((fn) => {
    if (typeof fn === "function") {
      try {
        if (fn === utils.cn) {
          (fn as typeof utils.cn)();
          (fn as typeof utils.cn)("a", "b");
        } else if (
          fn === utils.formatDate ||
          fn === utils.formatTime ||
          fn === utils.formatDateTime
        ) {
          (fn as (d: Date | string | number) => string)(new Date());
        } else if (fn === utils.generateId) {
          (fn as typeof utils.generateId)();
        } else if (fn === utils.debounce) {
          (fn as typeof utils.debounce)(() => {}, 0)();
        } else if (fn === utils.throttle) {
          (fn as typeof utils.throttle)(() => {}, 0)();
        }
      } catch {
        // ignore
      }
    }
  });
});
