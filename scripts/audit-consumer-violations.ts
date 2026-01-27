#!/usr/bin/env node
/**
 * Consumer Violation Audit Script
 *
 * Scans consumer code for Closed System v2 violations:
 * - V1: className on Foundation components
 * - V2: style on Foundation components
 * - V3: Utility classes near Foundation components
 * - V4: Raw HTML instead of Foundation components
 * - V5: Prop smuggling via untyped spreads
 *
 * Usage: pnpm tsx scripts/audit-consumer-violations.ts [directory]
 * Default: src/
 */

import { readFileSync, readdirSync, existsSync, statSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname, extname, relative } from "path";
import { fileURLToPath } from "url";
import { createSourceFile, ScriptTarget, SyntaxKind, Node, JSDoc } from "typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import utilities from eslint-rules
import {
  FOUNDATION_COMPONENTS,
  HTML_TO_FOUNDATION_MAP,
  getFoundationAlternatives,
} from "../eslint-rules/utils/foundation-component-list.js";
import { isPublicUiEntry } from "../eslint-rules/utils/consumer-code-detection.js";
import { hasTailwindUtilities } from "../eslint-rules/utils/tailwind-utilities.js";

const DEFAULT_SCAN_DIR = join(__dirname, "../src");
const OUTPUT_DIR = join(__dirname, "../docs/reports");

/**
 * Violation finding
 */
interface ViolationFinding {
  violation_class: string;
  file: string;
  line: number;
  column: number;
  message: string;
  code_snippet: string;
  severity: "CRITICAL" | "MAJOR" | "MINOR" | "INFO";
  confidence: "HIGH" | "MEDIUM" | "LOW";
}

/**
 * Track Foundation component imports
 */
class FoundationImportTracker {
  private foundationImports = new Set<string>();
  private importMap = new Map<string, string>(); // localName -> importedName

  processImport(source: string, specifiers: Array<{ imported: string; local: string }>): void {
    // Support both public UI entry and internal imports (@/COMPOSITION, @/PRIMITIVES)
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

  isFoundationImport(name: string): boolean {
    return this.foundationImports.has(name);
  }

  getFoundationImports(): Set<string> {
    return new Set(this.foundationImports);
  }
}

/**
 * Get all TypeScript/TSX files recursively
 */
function getAllTsFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];

  if (!existsSync(dir)) {
    return files;
  }

  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules, .next, dist, etc.
      if (
        entry.name.startsWith(".") ||
        entry.name === "node_modules" ||
        entry.name === "dist" ||
        entry.name === ".next"
      ) {
        continue;
      }
      files.push(...getAllTsFiles(fullPath, baseDir));
    } else if (entry.isFile()) {
      const ext = extname(entry.name);
      if (
        (ext === ".ts" || ext === ".tsx") &&
        !entry.name.endsWith(".stories.tsx") &&
        !entry.name.endsWith(".stories.ts") &&
        !entry.name.endsWith(".test.tsx") &&
        !entry.name.endsWith(".test.ts")
      ) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * Extract import specifiers from TypeScript AST
 */
function extractImportsFromNode(node: Node, tracker: FoundationImportTracker): void {
  if (node.kind === SyntaxKind.ImportDeclaration) {
    const importDecl = node as any;
    const source = importDecl.moduleSpecifier?.text;
    if (!source) return;

    const specifiers: Array<{ imported: string; local: string }> = [];

    if (importDecl.importClause) {
      // Named imports
      if (importDecl.importClause.namedBindings) {
        const namedBindings = importDecl.importClause.namedBindings;
        if (namedBindings.elements) {
          for (const element of namedBindings.elements) {
            const imported = element.name?.text || element.propertyName?.text;
            const local = element.name?.text;
            if (imported && local) {
              specifiers.push({ imported, local });
            }
          }
        }
      }
      // Default import
      if (importDecl.importClause.name) {
        const local = importDecl.importClause.name.text;
        specifiers.push({ imported: local, local });
      }
    }

    tracker.processImport(source, specifiers);
  }
}

/**
 * Get line and column from node position
 */
function getLineColumn(sourceFile: any, pos: number): { line: number; column: number } {
  const lineAndChar = sourceFile.getLineAndCharacterOfPosition(pos);
  return {
    line: lineAndChar.line + 1, // 1-based
    column: lineAndChar.character + 1, // 1-based
  };
}

/**
 * Get code snippet around a position
 */
function getCodeSnippet(content: string, line: number, contextLines: number = 3): string {
  const lines = content.split("\n");
  const start = Math.max(0, line - contextLines - 1);
  const end = Math.min(lines.length, line + contextLines);
  return lines.slice(start, end).join("\n");
}

/**
 * Scan for V1: className on Foundation
 */
function scanV1(
  sourceFile: any,
  content: string,
  tracker: FoundationImportTracker,
): ViolationFinding[] {
  const findings: ViolationFinding[] = [];

  function visit(node: Node) {
    // Check JSX opening elements
    if (
      node.kind === SyntaxKind.JsxOpeningElement ||
      node.kind === SyntaxKind.JsxSelfClosingElement
    ) {
      const jsxElement = node as any;
      const tagName = jsxElement.tagName;

      if (tagName && tagName.kind === SyntaxKind.Identifier) {
        const componentName = tagName.text;

        if (tracker.isFoundationImport(componentName)) {
          // Check for className attribute
          if (jsxElement.attributes) {
            for (const attr of jsxElement.attributes.properties || []) {
              if (attr.kind === SyntaxKind.JsxAttribute) {
                const attrName = attr.name?.text;
                if (attrName === "className") {
                  const pos = attr.pos || attr.getStart();
                  const { line, column } = getLineColumn(sourceFile, pos);
                  const codeSnippet = getCodeSnippet(content, line);

                  findings.push({
                    violation_class: "V1_CLASSNAME_ON_FOUNDATION",
                    file: sourceFile.fileName,
                    line,
                    column,
                    message: `className prop passed to Foundation component '${componentName}'`,
                    code_snippet: codeSnippet,
                    severity: "CRITICAL",
                    confidence: "HIGH",
                  });
                }
              }
            }
          }
        }
      }
    }

    node.getChildren().forEach(visit);
  }

  visit(sourceFile);
  return findings;
}

/**
 * Scan for V2: style on Foundation
 */
function scanV2(
  sourceFile: any,
  content: string,
  tracker: FoundationImportTracker,
): ViolationFinding[] {
  const findings: ViolationFinding[] = [];

  function visit(node: Node) {
    if (
      node.kind === SyntaxKind.JsxOpeningElement ||
      node.kind === SyntaxKind.JsxSelfClosingElement
    ) {
      const jsxElement = node as any;
      const tagName = jsxElement.tagName;

      if (tagName && tagName.kind === SyntaxKind.Identifier) {
        const componentName = tagName.text;

        if (tracker.isFoundationImport(componentName)) {
          if (jsxElement.attributes) {
            for (const attr of jsxElement.attributes.properties || []) {
              if (attr.kind === SyntaxKind.JsxAttribute) {
                const attrName = attr.name?.text;
                if (attrName === "style") {
                  const pos = attr.pos || attr.getStart();
                  const { line, column } = getLineColumn(sourceFile, pos);
                  const codeSnippet = getCodeSnippet(content, line);

                  findings.push({
                    violation_class: "V2_STYLE_ON_FOUNDATION",
                    file: sourceFile.fileName,
                    line,
                    column,
                    message: `style prop passed to Foundation component '${componentName}'`,
                    code_snippet: codeSnippet,
                    severity: "CRITICAL",
                    confidence: "HIGH",
                  });
                }
              }
            }
          }
        }
      }
    }

    node.getChildren().forEach(visit);
  }

  visit(sourceFile);
  return findings;
}

/**
 * Scan for V3: Utility classes near Foundation
 */
function scanV3(
  sourceFile: any,
  content: string,
  tracker: FoundationImportTracker,
): ViolationFinding[] {
  const findings: ViolationFinding[] = [];

  function hasFoundationChild(node: Node): boolean {
    if (node.kind === SyntaxKind.JsxElement) {
      const jsxElement = node as any;
      const openingElement = jsxElement.openingElement;
      const tagName = openingElement?.tagName;

      if (tagName && tagName.kind === SyntaxKind.Identifier) {
        const componentName = tagName.text;
        if (tracker.isFoundationImport(componentName)) {
          return true;
        }
      }

      // Check children
      if (jsxElement.children) {
        for (const child of jsxElement.children) {
          if (hasFoundationChild(child)) {
            return true;
          }
        }
      }
    } else if (node.kind === SyntaxKind.JsxSelfClosingElement) {
      const jsxElement = node as any;
      const tagName = jsxElement.tagName;
      if (tagName && tagName.kind === SyntaxKind.Identifier) {
        const componentName = tagName.text;
        if (tracker.isFoundationImport(componentName)) {
          return true;
        }
      }
    }

    return false;
  }

  function getClassNameValue(attributes: any[]): string | null {
    for (const attr of attributes || []) {
      if (attr.kind === SyntaxKind.JsxAttribute && attr.name?.text === "className") {
        if (attr.initializer) {
          if (attr.initializer.kind === SyntaxKind.StringLiteral) {
            return attr.initializer.text;
          } else if (attr.initializer.kind === SyntaxKind.JsxExpression) {
            const expr = attr.initializer.expression;
            if (expr.kind === SyntaxKind.StringLiteral) {
              return expr.text;
            } else if (expr.kind === SyntaxKind.TemplateExpression) {
              // For template literals, extract static parts
              const parts: string[] = [];
              if (expr.templateSpans) {
                for (const span of expr.templateSpans) {
                  if (span.literal?.text) {
                    parts.push(span.literal.text);
                  }
                }
              }
              return parts.join("");
            }
          }
        }
      }
    }
    return null;
  }

  function visit(node: Node) {
    if (node.kind === SyntaxKind.JsxElement) {
      const jsxElement = node as any;
      const openingElement = jsxElement.openingElement;
      const tagName = openingElement?.tagName;

      // Only check HTML elements (lowercase)
      if (tagName && tagName.kind === SyntaxKind.Identifier) {
        const elementName = tagName.text;

        // Skip if it's a Foundation component itself
        if (tracker.isFoundationImport(elementName)) {
          node.getChildren().forEach(visit);
          return;
        }

        // Check if it's a lowercase HTML element
        if (elementName[0] === elementName[0].toLowerCase()) {
          const classNameValue = getClassNameValue(openingElement.attributes?.properties || []);

          if (classNameValue && hasTailwindUtilities(classNameValue)) {
            // Check if this element contains Foundation components
            if (hasFoundationChild(node)) {
              const pos = openingElement.pos || openingElement.getStart();
              const { line, column } = getLineColumn(sourceFile, pos);
              const codeSnippet = getCodeSnippet(content, line);

              findings.push({
                violation_class: "V3_UTILITY_BASED_STYLING",
                file: sourceFile.fileName,
                line,
                column,
                message: `Tailwind utility classes on wrapper element '${elementName}' containing Foundation components`,
                code_snippet: codeSnippet,
                severity: "MAJOR",
                confidence: "HIGH",
              });
            }
          }
        }
      }
    }

    node.getChildren().forEach(visit);
  }

  visit(sourceFile);
  return findings;
}

/**
 * Scan for V4: Raw HTML instead of Foundation
 */
function scanV4(
  sourceFile: any,
  content: string,
  tracker: FoundationImportTracker,
): ViolationFinding[] {
  const findings: ViolationFinding[] = [];

  function visit(node: Node) {
    if (
      node.kind === SyntaxKind.JsxOpeningElement ||
      node.kind === SyntaxKind.JsxSelfClosingElement
    ) {
      const jsxElement = node as any;
      const tagName = jsxElement.tagName;

      if (tagName && tagName.kind === SyntaxKind.Identifier) {
        const elementName = tagName.text;

        // Check if it's a lowercase HTML element
        if (elementName[0] === elementName[0].toLowerCase()) {
          const htmlElement = elementName.toLowerCase();

          if (htmlElement in HTML_TO_FOUNDATION_MAP) {
            const alternatives = getFoundationAlternatives(htmlElement);
            const importedAlternatives = alternatives.filter((alt) =>
              tracker.isFoundationImport(alt),
            );

            if (importedAlternatives.length > 0) {
              const pos = tagName.pos || tagName.getStart();
              const { line, column } = getLineColumn(sourceFile, pos);
              const codeSnippet = getCodeSnippet(content, line);

              findings.push({
                violation_class: "V4_RAW_HTML_REPLACEMENT",
                file: sourceFile.fileName,
                line,
                column,
                message: `Raw HTML tag '${htmlElement}' should be replaced with Foundation component (${importedAlternatives.join(", ")})`,
                code_snippet: codeSnippet,
                severity: "MAJOR",
                confidence: "HIGH",
              });
            }
          }
        }
      }
    }

    node.getChildren().forEach(visit);
  }

  visit(sourceFile);
  return findings;
}

/**
 * Scan for V5: Prop smuggling
 */
function scanV5(
  sourceFile: any,
  content: string,
  tracker: FoundationImportTracker,
): ViolationFinding[] {
  const findings: ViolationFinding[] = [];

  function isExplicitlyTypedProps(name: string): boolean {
    const lowerName = name.toLowerCase();
    if (lowerName.endsWith("props")) {
      const componentName = lowerName.slice(0, -5);
      for (const component of FOUNDATION_COMPONENTS) {
        if (component.toLowerCase() === componentName) {
          return true;
        }
      }
    }
    return false;
  }

  function visit(node: Node) {
    if (
      node.kind === SyntaxKind.JsxOpeningElement ||
      node.kind === SyntaxKind.JsxSelfClosingElement
    ) {
      const jsxElement = node as any;
      const tagName = jsxElement.tagName;

      if (tagName && tagName.kind === SyntaxKind.Identifier) {
        const componentName = tagName.text;

        if (tracker.isFoundationImport(componentName)) {
          if (jsxElement.attributes) {
            for (const attr of jsxElement.attributes.properties || []) {
              if (attr.kind === SyntaxKind.JsxSpreadAttribute) {
                const spreadArg = attr.expression;

                if (spreadArg.kind === SyntaxKind.Identifier) {
                  const spreadName = spreadArg.text;

                  // Check if it's explicitly typed
                  if (!isExplicitlyTypedProps(spreadName)) {
                    const genericNames = [
                      "props",
                      "rest",
                      "otherprops",
                      "additionalprops",
                      "extraprops",
                    ];
                    if (genericNames.includes(spreadName.toLowerCase())) {
                      const pos = attr.pos || attr.getStart();
                      const { line, column } = getLineColumn(sourceFile, pos);
                      const codeSnippet = getCodeSnippet(content, line);

                      findings.push({
                        violation_class: "V5_PROP_SMUGGLING",
                        file: sourceFile.fileName,
                        line,
                        column,
                        message: `Untyped prop spread '${spreadName}' into Foundation component '${componentName}'`,
                        code_snippet: codeSnippet,
                        severity: "MAJOR",
                        confidence: "MEDIUM",
                      });
                    }
                  }
                } else if (spreadArg.kind !== SyntaxKind.ObjectLiteralExpression) {
                  // Other spread types (not object literals) - be conservative
                  const pos = attr.pos || attr.getStart();
                  const { line, column } = getLineColumn(sourceFile, pos);
                  const codeSnippet = getCodeSnippet(content, line);

                  findings.push({
                    violation_class: "V5_PROP_SMUGGLING",
                    file: sourceFile.fileName,
                    line,
                    column,
                    message: `Complex prop spread into Foundation component '${componentName}' (may bypass type checking)`,
                    code_snippet: codeSnippet,
                    severity: "MINOR",
                    confidence: "LOW",
                  });
                }
              }
            }
          }
        }
      }
    }

    node.getChildren().forEach(visit);
  }

  visit(sourceFile);
  return findings;
}

/**
 * Main scan function
 */
function scanFile(filePath: string, tracker: FoundationImportTracker): ViolationFinding[] {
  const content = readFileSync(filePath, "utf-8");
  const sourceFile = createSourceFile(filePath, content, ScriptTarget.Latest, true);

  // Create tracker for this file
  const fileTracker = new FoundationImportTracker();

  // Extract imports
  function visitForImports(node: Node) {
    extractImportsFromNode(node, fileTracker);
    node.getChildren().forEach(visitForImports);
  }
  visitForImports(sourceFile);

  // Scan for violations
  const findings: ViolationFinding[] = [];
  findings.push(...scanV1(sourceFile, content, fileTracker));
  findings.push(...scanV2(sourceFile, content, fileTracker));
  findings.push(...scanV3(sourceFile, content, fileTracker));
  findings.push(...scanV4(sourceFile, content, fileTracker));
  findings.push(...scanV5(sourceFile, content, fileTracker));

  return findings;
}

/**
 * Main execution
 */
function main() {
  const scanDir = process.argv[2] || DEFAULT_SCAN_DIR;
  const relativeScanDir = relative(process.cwd(), scanDir);

  console.log(`🔍 Scanning consumer code in: ${relativeScanDir}`);
  console.log("");

  if (!existsSync(scanDir)) {
    console.error(`❌ Directory not found: ${scanDir}`);
    process.exit(1);
  }

  const files = getAllTsFiles(scanDir);
  console.log(`📁 Found ${files.length} files to scan`);

  const allFindings: ViolationFinding[] = [];
  const tracker = new FoundationImportTracker();

  for (const file of files) {
    try {
      const findings = scanFile(file, tracker);
      allFindings.push(...findings);
    } catch (error) {
      console.warn(`⚠️  Error scanning ${file}: ${error}`);
    }
  }

  // Group findings by violation class
  const findingsByClass = new Map<string, ViolationFinding[]>();
  for (const finding of allFindings) {
    if (!findingsByClass.has(finding.violation_class)) {
      findingsByClass.set(finding.violation_class, []);
    }
    findingsByClass.get(finding.violation_class)!.push(finding);
  }

  // Print summary
  console.log("");
  console.log("📊 Summary:");
  console.log("");

  for (const [violationClass, findings] of findingsByClass.entries()) {
    const severityCounts = {
      CRITICAL: findings.filter((f) => f.severity === "CRITICAL").length,
      MAJOR: findings.filter((f) => f.severity === "MAJOR").length,
      MINOR: findings.filter((f) => f.severity === "MINOR").length,
      INFO: findings.filter((f) => f.severity === "INFO").length,
    };

    console.log(`  ${violationClass}: ${findings.length} violations`);
    console.log(
      `    CRITICAL: ${severityCounts.CRITICAL}, MAJOR: ${severityCounts.MAJOR}, MINOR: ${severityCounts.MINOR}, INFO: ${severityCounts.INFO}`,
    );
  }

  console.log("");
  console.log(`✅ Total violations: ${allFindings.length}`);

  // Save JSON report
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const jsonOutput = {
    audit_date: new Date().toISOString().split("T")[0],
    scope: {
      scanned_directory: relativeScanDir,
      files_scanned: files.length,
      total_violations: allFindings.length,
    },
    violations: Array.from(findingsByClass.entries()).map(([violationClass, findings]) => {
      const severityBreakdown = {
        CRITICAL: findings.filter((f) => f.severity === "CRITICAL").length,
        MAJOR: findings.filter((f) => f.severity === "MAJOR").length,
        MINOR: findings.filter((f) => f.severity === "MINOR").length,
        INFO: findings.filter((f) => f.severity === "INFO").length,
      };

      const affectedFiles = Array.from(new Set(findings.map((f) => f.file)));

      return {
        violation_class: violationClass,
        count: findings.length,
        severity_breakdown: severityBreakdown,
        affected_files: affectedFiles,
        confidence: findings.length > 0 ? findings[0].confidence : "HIGH",
        findings: findings.map((f) => ({
          file: f.file,
          line: f.line,
          column: f.column,
          message: f.message,
          severity: f.severity,
          confidence: f.confidence,
        })),
      };
    }),
  };

  // Determine output filename based on scan directory
  const isDomainScan = scanDir.includes("src/DOMAIN") || scanDir.includes("DOMAIN");
  const jsonFilename = isDomainScan
    ? "CLOSED_SYSTEM_V2_PHASE_I_VIOLATION_AUDIT.json"
    : "CLOSED_SYSTEM_V2_CONSUMER_VIOLATION_AUDIT_SUMMARY.json";
  const detailedFilename = isDomainScan
    ? "CLOSED_SYSTEM_V2_PHASE_I_VIOLATION_AUDIT_DETAILED.json"
    : "CLOSED_SYSTEM_V2_CONSUMER_VIOLATION_AUDIT_DETAILED.json";

  const jsonPath = join(OUTPUT_DIR, jsonFilename);
  writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2));
  console.log(`💾 JSON report saved to: ${relative(process.cwd(), jsonPath)}`);

  // Also save detailed findings for report generation
  const detailedPath = join(OUTPUT_DIR, detailedFilename);
  writeFileSync(detailedPath, JSON.stringify({ findings: allFindings }, null, 2));
  console.log(`💾 Detailed findings saved to: ${relative(process.cwd(), detailedPath)}`);

  return { findings: allFindings, summary: jsonOutput };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main, scanFile, FoundationImportTracker };
