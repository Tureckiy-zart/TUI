/**
 * import-tracking (FoundationImportTracker) execution test.
 * Instantiates tracker and calls isFoundationImport.
 */

import { it } from "vitest";

import { FoundationImportTracker } from "../../eslint-rules/utils/import-tracking";

it("tracks imports", () => {
  const tracker = new FoundationImportTracker();
  tracker.isFoundationImport("Button");
  tracker.isFoundationImport("Box");
  tracker.getFoundationImports();
  tracker.clear();
});
