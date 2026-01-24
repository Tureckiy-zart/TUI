import fs from "node:fs";
import path from "node:path";

// Temporary allowance for --tm-status-* is governed by docs/theming/SEMANTIC_LAYER_DECISION.md.
const ALLOWED_PREFIXES = ["--tm-", "--tm-status-"];
const ROOT = process.cwd();
const TARGET_DIRS = [
  path.join(ROOT, "src", "components"),
  path.join(ROOT, "src", "FOUNDATION", "components"),
];
const TARGET_EXTENSIONS = new Set([".ts", ".tsx", ".css", ".scss"]);

const varRegex = /var\(\s*(--[^)\s]+)\s*\)/g;

type Violation = {
  file: string;
  lineNumber: number;
  variable: string;
  line: string;
};

function isAllowed(variable: string): boolean {
  return ALLOWED_PREFIXES.some((prefix) => variable.startsWith(prefix));
}

function collectFiles(dir: string, files: string[]): void {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      collectFiles(fullPath, files);
      continue;
    }
    if (TARGET_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(fullPath);
    }
  }
}

function scanFile(filePath: string): Violation[] {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split(/\r?\n/);
  const violations: Violation[] = [];

  lines.forEach((line, index) => {
    varRegex.lastIndex = 0;
    const matches = line.matchAll(varRegex);
    for (const match of matches) {
      const variable = match[1];
      if (!isAllowed(variable)) {
        violations.push({
          file: filePath,
          lineNumber: index + 1,
          variable,
          line: line.trim(),
        });
      }
    }
  });

  return violations;
}

const allFiles: string[] = [];
for (const dir of TARGET_DIRS) {
  collectFiles(dir, allFiles);
}

const violations: Violation[] = [];
for (const file of allFiles) {
  violations.push(...scanFile(file));
}

if (violations.length > 0) {
  console.error("Legacy CSS var guard failed.");
  console.error("Only --tm-* and temporary --tm-status-* are allowed in components.");
  console.error(
    "Exception policy: docs/theming/SEMANTIC_LAYER_DECISION.md (temporary semantic usage).",
  );
  for (const v of violations) {
    const rel = path.relative(ROOT, v.file);
    console.error(`${rel}:${v.lineNumber} ${v.variable}`);
    console.error(`  ${v.line}`);
  }
  process.exit(1);
}

console.log("Legacy CSS var guard passed.");
