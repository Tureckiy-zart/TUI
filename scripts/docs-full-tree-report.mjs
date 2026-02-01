#!/usr/bin/env node
/**
 * Documentation Full Tree Report
 *
 * Generates a complete tree of docs/ with brief descriptions and git dates.
 *
 * Usage: node scripts/docs-full-tree-report.mjs [--output <path>]
 * Output: docs/reports/inventory/DOCS_FULL_TREE.md
 */

import { execSync } from "child_process";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = join(__dirname, "..");
const DOCS_DIR = join(ROOT_DIR, "docs");
const INVENTORY_PATH = join(DOCS_DIR, "CANONICAL_DOCUMENTATION_INVENTORY.md");
const OUTPUT_PATH = join(DOCS_DIR, "reports", "inventory", "DOCS_FULL_TREE.md");

const EXTENSIONS = new Set([".md", ".json", ".txt", ".pdf"]);

/**
 * Parse CANONICAL_DOCUMENTATION_INVENTORY.md for path -> description mapping
 */
function parseInventory() {
  const map = new Map();
  if (!existsSync(INVENTORY_PATH)) return map;

  const content = readFileSync(INVENTORY_PATH, "utf-8");
  // Match table rows: | `docs/path/file.md` | Description | Status | or | Path | Category | Status | Notes |
  const rowRe = /\|\s*`(docs\/[^`]+)`\s*\|\s*([^|]+)\s*\|\s*([^|]*)\s*(?:\|\s*([^|]*)\s*)?\|/g;
  let m;
  while ((m = rowRe.exec(content)) !== null) {
    const path = m[1].trim();
    const col2 = m[2].trim();
    const col3 = m[3].trim();
    const col4 = m[4]?.trim() ?? "";
    // Prefer longer description (col2 from main tables, col4 from Summary)
    const desc = col4 && col4.length > col2.length ? col4 : col2;
    // Skip status-only entries (short col2 like "LOCKED", "ACTIVE")
    if (desc.length > 3 && !/^\*\*[A-Z_]+\*\*$/.test(desc)) {
      map.set(path, desc.replace(/\*\*/g, "").slice(0, 120));
    }
  }
  return map;
}

/**
 * Extract first H1 from file content
 */
function extractH1(content) {
  const lines = content.split("\n").slice(0, 30);
  for (const line of lines) {
    const m = line.match(/^#\s+(.+)$/);
    if (m) return m[1].trim().replace(/\*\*/g, "").slice(0, 120);
  }
  return null;
}

/**
 * Get filename without extension as fallback description
 */
function filenameToDescription(filePath) {
  const base = filePath.split("/").pop() ?? filePath;
  return base.replace(/\.[^.]+$/, "").replace(/[-_]/g, " ");
}

/**
 * Get git created date (first commit)
 */
function gitCreated(filePath) {
  try {
    const out = execSync(
      `git log --diff-filter=A --format=%ci --reverse -- "${filePath}" 2>/dev/null | head -1`,
      { encoding: "utf-8", cwd: ROOT_DIR },
    ).trim();
    return out ? out.slice(0, 10) : "";
  } catch {
    return "";
  }
}

/**
 * Get git last modified date
 */
function gitUpdated(filePath) {
  try {
    const out = execSync(`git log -1 --format=%ci -- "${filePath}" 2>/dev/null`, {
      encoding: "utf-8",
      cwd: ROOT_DIR,
    }).trim();
    return out ? out.slice(0, 10) : "";
  } catch {
    return "";
  }
}

/**
 * Recursively collect all docs files
 */
function collectFiles(dir, base = "docs") {
  const files = [];
  if (!existsSync(dir)) return files;

  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const relPath = `${base}/${entry.name}`;
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectFiles(fullPath, relPath));
    } else if (entry.isFile()) {
      const ext = entry.name.includes(".") ? "." + entry.name.split(".").pop() : "";
      if (EXTENSIONS.has(ext)) {
        files.push(relPath);
      }
    }
  }
  return files.sort();
}

/**
 * Build tree structure string
 */
function buildTree(files) {
  const dirs = new Set(["docs"]);
  const fileByDir = new Map();
  fileByDir.set("docs", []);

  for (const f of files) {
    const parts = f.split("/");
    for (let i = 1; i < parts.length; i++) {
      const d = parts.slice(0, i).join("/");
      dirs.add(d);
      if (!fileByDir.has(d)) fileByDir.set(d, []);
    }
    const dir = parts.slice(0, -1).join("/") || "docs";
    if (!fileByDir.has(dir)) fileByDir.set(dir, []);
    fileByDir.get(dir).push(parts[parts.length - 1]);
  }

  const lines = [];
  function renderDir(dir, prefix, isLast) {
    const entries = fileByDir.get(dir) ?? [];
    const subdirs = [...dirs].filter(
      (d) => d.startsWith(dir + "/") && !d.slice(dir.length + 1).includes("/"),
    );
    const allItems = [
      ...subdirs.map((d) => ({ name: d.split("/").pop(), isDir: true })),
      ...entries.map((n) => ({ name: n, isDir: false })),
    ].sort((a, b) => (a.isDir === b.isDir ? a.name.localeCompare(b.name) : a.isDir ? -1 : 1));

    for (let i = 0; i < allItems.length; i++) {
      const item = allItems[i];
      const last = i === allItems.length - 1;
      const connector = last ? "└── " : "├── ";
      const nextPrefix = prefix + (last ? "    " : "│   ");
      if (item.isDir) {
        lines.push(`${prefix}${connector}${item.name}/`);
        renderDir(`${dir}/${item.name}`, nextPrefix, last);
      } else {
        lines.push(`${prefix}${connector}${item.name}`);
      }
    }
  }

  lines.push("docs/");
  renderDir("docs", "", true);
  return lines.join("\n");
}

/**
 * Escape pipe for markdown table
 */
function escapeTable(str) {
  return String(str ?? "")
    .replace(/\|/g, "\\|")
    .replace(/\n/g, " ");
}

/**
 * Main
 */
function main() {
  const args = process.argv.slice(2);
  const outputIdx = args.indexOf("--output");
  const outputPath = outputIdx >= 0 && args[outputIdx + 1] ? args[outputIdx + 1] : OUTPUT_PATH;

  const inventory = parseInventory();
  const files = collectFiles(DOCS_DIR);

  const rows = [];
  for (const relPath of files) {
    const fullPath = join(ROOT_DIR, relPath);
    let description = inventory.get(relPath);
    if (!description) {
      try {
        const content = readFileSync(fullPath, "utf-8");
        description = extractH1(content) ?? filenameToDescription(relPath);
      } catch {
        description = filenameToDescription(relPath);
      }
    }
    const created = gitCreated(relPath);
    const updated = gitUpdated(relPath);
    rows.push({ path: relPath, description, created, updated });
  }

  const tree = buildTree(files);
  const today = new Date().toISOString().slice(0, 10);

  const tableRows = rows
    .map((r) => `| \`${r.path}\` | ${escapeTable(r.description)} | ${r.created} | ${r.updated} |`)
    .join("\n");

  const md = `# Documentation Full Tree

**Generated:** ${today}
**Total files:** ${files.length}

## Tree Structure

\`\`\`
${tree}
\`\`\`

## File Index

| Path | Description | Created | Updated |
|------|-------------|---------|---------|
${tableRows}

---

*Generated by \`scripts/docs-full-tree-report.mjs\`. Run \`pnpm docs:full-tree\` to regenerate.*
`;

  const outDir = dirname(outputPath);
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }
  writeFileSync(outputPath, md, "utf-8");
  console.log(`Written: ${outputPath} (${files.length} files)`);
}

main();
