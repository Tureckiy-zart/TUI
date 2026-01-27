#!/usr/bin/env node
/**
 * V1/V2 Foundation enforcement audit (read-only scan).
 *
 * Scope: src/ (real code). docs-app is excluded by scanning only src/.
 *
 * Usage:
 *   pnpm tsx scripts/audit-v1v2.ts [directory]
 * Default directory: src/
 */

import { readFileSync, readdirSync, existsSync, statSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname, extname, relative, resolve } from "path";
import { fileURLToPath } from "url";
import { createSourceFile, ScriptTarget, SyntaxKind, Node } from "typescript";

import { FOUNDATION_COMPONENTS } from "../eslint-rules/utils/foundation-component-list.js";
import { isPublicUiEntry } from "../eslint-rules/utils/consumer-code-detection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DEFAULT_SCAN_DIR = resolve(__dirname, "../src");
const LOG_DIR = resolve(__dirname, "../docs/reports/closed-system/logs/phase-audit-023");
const LOG_PATH = join(LOG_DIR, "audit-consumer-violations.src.log");
const JSON_PATH = join(LOG_DIR, "audit-consumer-violations.src.v1v2.json");

type Severity = "CRITICAL";

type ViolationClass = "V1_CLASSNAME_ON_FOUNDATION" | "V2_STYLE_ON_FOUNDATION";

interface V1V2Finding {
  violation_class: ViolationClass;
  file: string;
  line: number;
  column: number;
  foundation_component: string;
  prop_name: "className" | "style";
  prop_value: string;
  snippet: string;
  severity: Severity;
}

class FoundationImportTracker {
  private foundationImports = new Set<string>();
  private importMap = new Map<string, string>(); // localName -> importedName

  processImport(source: string, specifiers: Array<{ imported: string; local: string }>): void {
    const isPublicEntry = isPublicUiEntry(source);
    const isInternalImport =
      source.startsWith("@/COMPOSITION") ||
      source.startsWith("@/PRIMITIVES") ||
      source.startsWith("@/FOUNDATION");

    if (!isPublicEntry && !isInternalImport) return;

    for (const spec of specifiers) {
      if (FOUNDATION_COMPONENTS.has(spec.imported as any)) {
        this.foundationImports.add(spec.local);
        this.importMap.set(spec.local, spec.imported);
      }
    }
  }

  isFoundationImport(localName: string): boolean {
    return this.foundationImports.has(localName);
  }

  getImportedName(localName: string): string {
    return this.importMap.get(localName) ?? localName;
  }
}

function getAllTsFiles(dir: string): string[] {
  const files: string[] = [];

  if (!existsSync(dir)) {
    return files;
  }

  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      if (
        entry.name.startsWith(".") ||
        entry.name === "node_modules" ||
        entry.name === "dist" ||
        entry.name === ".next"
      ) {
        continue;
      }

      files.push(...getAllTsFiles(fullPath));
      continue;
    }

    if (!entry.isFile()) continue;

    const ext = extname(entry.name);
    const isTs = ext === ".ts" || ext === ".tsx";
    const isStory = entry.name.endsWith(".stories.tsx") || entry.name.endsWith(".stories.ts");
    const isTest = entry.name.endsWith(".test.tsx") || entry.name.endsWith(".test.ts");

    if (isTs && !isStory && !isTest) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractImportsFromNode(node: Node, tracker: FoundationImportTracker): void {
  if (node.kind !== SyntaxKind.ImportDeclaration) return;

  const importDecl = node as any;
  const source = importDecl.moduleSpecifier?.text;
  if (!source) return;

  const specifiers: Array<{ imported: string; local: string }> = [];

  if (importDecl.importClause) {
    if (importDecl.importClause.namedBindings) {
      const namedBindings = importDecl.importClause.namedBindings;
      if (namedBindings.elements) {
        for (const element of namedBindings.elements) {
          const imported = element.propertyName?.text ?? element.name?.text;
          const local = element.name?.text;
          if (imported && local) {
            specifiers.push({ imported, local });
          }
        }
      }
    }

    if (importDecl.importClause.name) {
      const local = importDecl.importClause.name.text;
      specifiers.push({ imported: local, local });
    }
  }

  tracker.processImport(source, specifiers);
}

function getLineColumn(sourceFile: any, pos: number): { line: number; column: number } {
  const lineAndChar = sourceFile.getLineAndCharacterOfPosition(pos);
  return {
    line: lineAndChar.line + 1,
    column: lineAndChar.character + 1,
  };
}

function getSnippet(content: string, line: number, contextLines: number = 1): string {
  const lines = content.split("\n");
  const start = Math.max(0, line - contextLines - 1);
  const end = Math.min(lines.length, line + contextLines);
  return lines.slice(start, end).join("\n");
}

function getJsxAttributeValue(attr: any, sourceFile: any): string {
  if (!attr.initializer) return "";
  return attr.initializer.getText(sourceFile).trim();
}

function scanV1V2InFile(filePath: string, repoRoot: string): V1V2Finding[] {
  const content = readFileSync(filePath, "utf8");
  const sourceFile = createSourceFile(filePath, content, ScriptTarget.Latest, true);

  const tracker = new FoundationImportTracker();

  function visitForImports(node: Node): void {
    extractImportsFromNode(node, tracker);
    node.getChildren().forEach(visitForImports);
  }
  visitForImports(sourceFile);

  const findings: V1V2Finding[] = [];

  function visit(node: Node): void {
    if (
      node.kind === SyntaxKind.JsxOpeningElement ||
      node.kind === SyntaxKind.JsxSelfClosingElement
    ) {
      const jsxElement = node as any;
      const tagName = jsxElement.tagName;

      if (tagName?.kind === SyntaxKind.Identifier) {
        const localName = tagName.text;
        if (tracker.isFoundationImport(localName) && jsxElement.attributes) {
          const foundationComponent = tracker.getImportedName(localName);

          for (const attr of jsxElement.attributes.properties ?? []) {
            if (attr.kind !== SyntaxKind.JsxAttribute) continue;

            const attrName = attr.name?.text;
            if (attrName !== "className" && attrName !== "style") continue;

            const pos = attr.pos || attr.getStart();
            const { line, column } = getLineColumn(sourceFile, pos);
            const propValue = getJsxAttributeValue(attr, sourceFile);
            const snippet = getSnippet(content, line, 1);

            findings.push({
              violation_class:
                attrName === "className" ? "V1_CLASSNAME_ON_FOUNDATION" : "V2_STYLE_ON_FOUNDATION",
              file: relative(repoRoot, filePath),
              line,
              column,
              foundation_component: foundationComponent,
              prop_name: attrName,
              prop_value: propValue,
              snippet,
              severity: "CRITICAL",
            });
          }
        }
      }
    }

    node.getChildren().forEach(visit);
  }
  visit(sourceFile);

  return findings;
}

function formatFindingForLog(f: V1V2Finding): string {
  const header = `${f.violation_class} :: ${f.file}:${f.line}:${f.column}`;
  const meta = `component=${f.foundation_component} prop=${f.prop_name} value=${f.prop_value || "(empty)"}`;
  return [header, meta, f.snippet, "---"].join("\n");
}

function main(): void {
  const scanDirArg = process.argv[2];
  const scanDir = scanDirArg ? resolve(process.cwd(), scanDirArg) : DEFAULT_SCAN_DIR;
  const repoRoot = process.cwd();

  if (!existsSync(scanDir) || !statSync(scanDir).isDirectory()) {
    console.error(`Directory not found: ${scanDir}`);
    process.exit(1);
  }

  const files = getAllTsFiles(scanDir);
  const allFindings: V1V2Finding[] = [];

  for (const file of files) {
    try {
      allFindings.push(...scanV1V2InFile(file, repoRoot));
    } catch (err) {
      console.warn(`Failed to scan ${relative(repoRoot, file)}: ${String(err)}`);
    }
  }

  const v1 = allFindings.filter((f) => f.violation_class === "V1_CLASSNAME_ON_FOUNDATION");
  const v2 = allFindings.filter((f) => f.violation_class === "V2_STYLE_ON_FOUNDATION");

  if (!existsSync(LOG_DIR)) {
    mkdirSync(LOG_DIR, { recursive: true });
  }

  const logLines: string[] = [];
  logLines.push(`# V1/V2 audit`);
  logLines.push(`date=${new Date().toISOString()}`);
  logLines.push(`scan_dir=${relative(repoRoot, scanDir)}`);
  logLines.push(`files_scanned=${files.length}`);
  logLines.push(`V1_CLASSNAME_ON_FOUNDATION=${v1.length}`);
  logLines.push(`V2_STYLE_ON_FOUNDATION=${v2.length}`);
  logLines.push("");

  for (const finding of allFindings) {
    logLines.push(formatFindingForLog(finding));
  }

  writeFileSync(LOG_PATH, logLines.join("\n"), "utf8");

  const jsonOutput = {
    audit_date: new Date().toISOString(),
    scan_dir: relative(repoRoot, scanDir),
    files_scanned: files.length,
    counts: {
      V1_CLASSNAME_ON_FOUNDATION: v1.length,
      V2_STYLE_ON_FOUNDATION: v2.length,
    },
    findings: allFindings,
  };

  writeFileSync(JSON_PATH, JSON.stringify(jsonOutput, null, 2), "utf8");

  console.log(`Scanned ${files.length} files in ${relative(repoRoot, scanDir)}`);
  console.log(`V1_CLASSNAME_ON_FOUNDATION: ${v1.length}`);
  console.log(`V2_STYLE_ON_FOUNDATION: ${v2.length}`);
  console.log(`Raw log: ${relative(repoRoot, LOG_PATH)}`);
  console.log(`JSON: ${relative(repoRoot, JSON_PATH)}`);
}

main();
