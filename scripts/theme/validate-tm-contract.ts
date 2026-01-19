#!/usr/bin/env node
import { mkdirSync, writeFileSync } from "fs";
import { resolve } from "path";

import type { Mode } from "@/FOUNDATION/tokens/colors";
import { REQUIRED_THEME_TOKENS } from "@/FOUNDATION/tokens/required-tokens";
import { computeRuntimeTmSnapshot } from "@/FOUNDATION/theme/runtimeTmSnapshot";
import { BRAND_IDS, THEME_NAMES } from "@/themes/registry";
import type { ThemeName } from "@/themes/types";

type Combo = {
  mode: Mode;
  themeName: ThemeName;
  brandId: string | null;
};

type ComboResult = Combo & {
  missing: string[];
  empty: string[];
  errors: string[];
};

const MODES: Mode[] = ["day", "night"];
const NONE_BRAND = "none";
const REPORT_PATH = resolve("artifacts/reports/TM_CONTRACT_COVERAGE_REPORT.md");

function formatCombo(combo: Combo): string {
  return `[mode=${combo.mode} theme=${combo.themeName} brand=${combo.brandId ?? NONE_BRAND}]`;
}

function ensureReportDir(): void {
  mkdirSync(resolve("artifacts/reports"), { recursive: true });
}

function buildReport(
  results: ComboResult[],
  modes: Mode[],
  themes: ThemeName[],
  brandIds: string[],
  exitStatus: "PASS" | "FAIL",
): string {
  const combosChecked = results.length;
  const failures = results.filter(
    (result) => result.missing.length || result.empty.length || result.errors.length,
  );

  const lines: string[] = [];
  lines.push("# TM Contract Coverage Report");
  lines.push("");
  lines.push("## Summary");
  lines.push(`- Status: ${exitStatus}`);
  lines.push(
    `- Combos checked: ${combosChecked} (modes=${modes.length}, themes=${themes.length}, brands=${brandIds.length} + none)`,
  );
  lines.push(`- Themes list: [${themes.join(", ")}]`);
  lines.push(`- Brands list: [${brandIds.join(", ")}]`);
  lines.push(`- Missing tokens: ${failures.reduce((sum, item) => sum + item.missing.length, 0)}`);
  lines.push(`- Empty tokens: ${failures.reduce((sum, item) => sum + item.empty.length, 0)}`);
  lines.push("- Derived/product/detail tokens validated: NO (required list only)");
  lines.push(`- Report path: ${REPORT_PATH}`);
  lines.push("");

  lines.push("## Coverage Matrix");
  lines.push("| Mode | Theme | Brand | Status |");
  lines.push("| --- | --- | --- | --- |");
  for (const result of results) {
    const status =
      result.missing.length || result.empty.length || result.errors.length ? "FAIL" : "PASS";
    lines.push(
      `| ${result.mode} | ${result.themeName} | ${result.brandId ?? NONE_BRAND} | ${status} |`,
    );
  }
  lines.push("");

  if (failures.length) {
    lines.push("## Failures");
    for (const failure of failures) {
      lines.push(`### ${formatCombo(failure)}`);
      if (failure.errors.length) {
        lines.push(`- Errors: ${failure.errors.join("; ")}`);
      }
      if (failure.missing.length) {
        lines.push(`- Missing: ${failure.missing.join(", ")}`);
      }
      if (failure.empty.length) {
        lines.push(`- Empty: ${failure.empty.join(", ")}`);
      }
      lines.push("");
    }
  } else {
    lines.push("## Failures");
    lines.push("- None");
    lines.push("");
  }

  return lines.join("\n");
}

async function validateCombos(): Promise<ComboResult[]> {
  const results: ComboResult[] = [];
  const brandIds = [null, ...BRAND_IDS];

  for (const mode of MODES) {
    for (const themeName of THEME_NAMES) {
      for (const brandId of brandIds) {
        const combo: Combo = { mode, themeName, brandId };
        const missing: string[] = [];
        const empty: string[] = [];
        const errors: string[] = [];

        try {
          const snapshot = computeRuntimeTmSnapshot(combo);
          for (const token of REQUIRED_THEME_TOKENS) {
            if (!(token in snapshot)) {
              missing.push(token);
              continue;
            }
            const value = snapshot[token];
            if (typeof value !== "string" || value.trim().length === 0) {
              empty.push(token);
            }
          }
        } catch (error) {
          errors.push(error instanceof Error ? error.message : String(error));
        }

        results.push({ ...combo, missing, empty, errors });
      }
    }
  }

  return results;
}

async function main() {
  const results = await validateCombos();
  const hasFailures = results.some(
    (result) => result.missing.length || result.empty.length || result.errors.length,
  );

  const exitStatus: "PASS" | "FAIL" = hasFailures ? "FAIL" : "PASS";
  const report = buildReport(results, MODES, THEME_NAMES, BRAND_IDS, exitStatus);

  ensureReportDir();
  writeFileSync(REPORT_PATH, report, "utf-8");

  console.log(report);

  if (hasFailures) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("TM contract validation failed to run:", error);
  process.exit(1);
});
