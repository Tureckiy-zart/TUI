#!/usr/bin/env tsx
/**
 * Phantom Imports Audit Script
 * Scans the entire repository for imports from @tenerife.music/* packages
 * and cross-checks them against the actual exports from src/index.ts
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { extname, join, relative } from "path";

interface ImportRecord {
  file: string;
  line: number;
  symbol: string;
  package: string;
  fullImport: string;
}

interface ExportMap {
  [packageName: string]: Set<string>;
}

interface PhantomImport {
  file: string;
  line: number;
  symbol: string;
  package: string;
  existsInPublicAPI: boolean;
  errorCode: string;
  suggestedFix: string;
}

const EXCLUDE_PATHS = [
  "node_modules",
  ".next",
  "dist",
  "storybook-static",
  "coverage",
  ".storybook",
  "docs_archive",
  "artifacts",
];

const CODE_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".mdx"];

function shouldExcludePath(filePath: string): boolean {
  return EXCLUDE_PATHS.some((exclude) => filePath.includes(exclude));
}

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  try {
    const files = readdirSync(dir);
    for (const file of files) {
      const filePath = join(dir, file);
      if (shouldExcludePath(filePath)) continue;

      const stat = statSync(filePath);
      if (stat.isDirectory()) {
        getAllFiles(filePath, fileList);
      } else if (CODE_EXTENSIONS.includes(extname(file))) {
        fileList.push(filePath);
      }
    }
  } catch (err) {
    // Skip files we can't read
  }
  return fileList;
}

function extractExportsFromIndex(indexPath: string): Set<string> {
  const content = readFileSync(indexPath, "utf-8");
  const exports = new Set<string>();

  // Match: export { Symbol } or export { Symbol, ... } or export type { Type }
  const exportMatches = content.matchAll(/export\s+(?:type\s+)?\{([^}]+)\}/g);

  for (const match of exportMatches) {
    const symbols = match[1].split(",").map((s) => s.trim());
    for (const symbol of symbols) {
      // Remove 'type' keyword if present, and clean up
      const cleanSymbol = symbol
        .replace(/^\s*type\s+/, "")
        .replace(/\s+as\s+\w+$/, "")
        .trim();
      if (cleanSymbol) {
        exports.add(cleanSymbol);
      }
    }
  }

  // Match: export { Symbol } from "..."
  const reExportMatches = content.matchAll(
    /export\s+(?:type\s+)?\{([^}]+)\}\s+from\s+["'][^"']+["']/g,
  );

  for (const match of reExportMatches) {
    const symbols = match[1].split(",").map((s) => s.trim());
    for (const symbol of symbols) {
      const cleanSymbol = symbol
        .replace(/^\s*type\s+/, "")
        .replace(/\s+as\s+\w+$/, "")
        .trim();
      if (cleanSymbol) {
        exports.add(cleanSymbol);
      }
    }
  }

  // Match: export Symbol from "..." or export type Symbol from "..."
  const directExportMatches = content.matchAll(
    /export\s+(?:type\s+)?(\w+)\s+from\s+["'][^"']+["']/g,
  );

  for (const match of directExportMatches) {
    exports.add(match[1]);
  }

  // Match: export const Symbol = ... or export function Symbol or export class Symbol
  const declarationMatches = content.matchAll(
    /export\s+(?:const|function|class|interface|type)\s+(\w+)/g,
  );

  for (const match of declarationMatches) {
    exports.add(match[1]);
  }

  return exports;
}

function extractImports(filePath: string): ImportRecord[] {
  const content = readFileSync(filePath, "utf-8");
  const imports: ImportRecord[] = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Match: import { Symbol1, Symbol2, ... } from "@tenerife.music/..."
    const namedImportMatch = line.match(
      /import\s+\{([^}]+)\}\s+from\s+["'](@tenerife\.music\/[^"']+)["']/,
    );

    if (namedImportMatch) {
      const symbols = namedImportMatch[1].split(",").map((s) =>
        s
          .trim()
          .replace(/^\s*type\s+/, "")
          .trim(),
      );
      const packageName = namedImportMatch[2];

      for (const symbol of symbols) {
        // Skip empty symbols and type-only imports that are filtered
        if (symbol && !symbol.startsWith("//")) {
          imports.push({
            file: filePath,
            line: lineNum,
            symbol: symbol,
            package: packageName,
            fullImport: line.trim(),
          });
        }
      }
    }

    // Match: import Symbol from "@tenerife.music/..."
    const defaultImportMatch = line.match(
      /import\s+(\w+)\s+from\s+["'](@tenerife\.music\/[^"']+)["']/,
    );

    if (defaultImportMatch) {
      imports.push({
        file: filePath,
        line: lineNum,
        symbol: defaultImportMatch[1],
        package: defaultImportMatch[2],
        fullImport: line.trim(),
      });
    }
  }

  return imports;
}

function main() {
  const repoRoot = process.cwd();
  const indexPath = join(repoRoot, "src", "index.ts");

  console.log("Building export map from src/index.ts...");
  const uiExports = extractExportsFromIndex(indexPath);
  console.log(`Found ${uiExports.size} exports in @tenerife.music/ui`);

  const exportMap: ExportMap = {
    "@tenerife.music/ui": uiExports,
  };

  console.log("\nScanning repository for imports...");
  const allFiles = getAllFiles(repoRoot);
  console.log(`Found ${allFiles.length} code files to scan`);

  const allImports: ImportRecord[] = [];
  for (const file of allFiles) {
    try {
      const imports = extractImports(file);
      allImports.push(...imports);
    } catch (err) {
      // Skip files we can't read
    }
  }

  console.log(`\nFound ${allImports.length} total imports from @tenerife.music/*`);

  // Cross-check imports against exports
  const phantoms: PhantomImport[] = [];
  const uniqueImports = new Map<string, Set<string>>(); // package -> symbols

  for (const imp of allImports) {
    const packageExports = exportMap[imp.package];
    if (!packageExports) {
      // Package not in export map (might be subpath import)
      continue;
    }

    const exists = packageExports.has(imp.symbol);
    if (!exists) {
      phantoms.push({
        file: relative(repoRoot, imp.file),
        line: imp.line,
        symbol: imp.symbol,
        package: imp.package,
        existsInPublicAPI: false,
        errorCode: "TS2305",
        suggestedFix: `Symbol '${imp.symbol}' does not exist in ${imp.package}. Check src/index.ts for correct export name.`,
      });
    }

    if (!uniqueImports.has(imp.package)) {
      uniqueImports.set(imp.package, new Set());
    }
    uniqueImports.get(imp.package)!.add(imp.symbol);
  }

  // Generate report
  console.log("\n" + "=".repeat(80));
  console.log("PHANTOM IMPORTS AUDIT REPORT");
  console.log("=".repeat(80));

  if (phantoms.length === 0) {
    console.log("\n✅ No phantom imports found!");
  } else {
    console.log(`\n❌ Found ${phantoms.length} phantom import(s):\n`);

    // Group by package
    const byPackage = new Map<string, PhantomImport[]>();
    for (const phantom of phantoms) {
      if (!byPackage.has(phantom.package)) {
        byPackage.set(phantom.package, []);
      }
      byPackage.get(phantom.package)!.push(phantom);
    }

    for (const [pkg, items] of byPackage) {
      console.log(`\nPackage: ${pkg}`);
      console.log("-".repeat(80));
      for (const item of items) {
        console.log(`  ${item.file}:${item.line}`);
        console.log(`    Symbol: ${item.symbol}`);
        console.log(`    Error: ${item.errorCode} - ${item.suggestedFix}`);
        console.log();
      }
    }

    // Summary table
    console.log("\n" + "=".repeat(80));
    console.log("SUMMARY TABLE");
    console.log("=".repeat(80));
    console.log(
      "Package".padEnd(30) +
        "Symbol".padEnd(30) +
        "File".padEnd(40) +
        "Line".padEnd(8) +
        "ErrorCode",
    );
    console.log("-".repeat(108));

    for (const phantom of phantoms) {
      console.log(
        phantom.package.padEnd(30) +
          phantom.symbol.padEnd(30) +
          phantom.file.padEnd(40) +
          String(phantom.line).padEnd(8) +
          phantom.errorCode,
      );
    }
  }

  // List all unique imports per package
  console.log("\n" + "=".repeat(80));
  console.log("UNIQUE IMPORTS BY PACKAGE");
  console.log("=".repeat(80));

  for (const [pkg, symbols] of uniqueImports) {
    console.log(`\n${pkg}:`);
    const sortedSymbols = Array.from(symbols).sort();
    const packageExports = exportMap[pkg];
    for (const symbol of sortedSymbols) {
      const exists = packageExports?.has(symbol) ?? false;
      const marker = exists ? "✅" : "❌";
      console.log(`  ${marker} ${symbol}`);
    }
  }

  // Export map summary
  console.log("\n" + "=".repeat(80));
  console.log("PUBLIC API EXPORTS (@tenerife.music/ui)");
  console.log("=".repeat(80));
  const sortedExports = Array.from(uiExports).sort();
  console.log(`Total exports: ${sortedExports.length}`);
  console.log("\nExports (first 50):");
  for (let i = 0; i < Math.min(50, sortedExports.length); i++) {
    console.log(`  - ${sortedExports[i]}`);
  }
  if (sortedExports.length > 50) {
    console.log(`  ... and ${sortedExports.length - 50} more`);
  }
}

main();
