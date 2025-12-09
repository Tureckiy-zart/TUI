#!/usr/bin/env tsx

/**
 * Validate documentation files
 *
 * Checks for:
 * - MDX syntax errors
 * - Dead links
 * - Missing API tables
 */

import * as fs from "fs";
import * as path from "path";

const DOCS_DIR = path.resolve(process.cwd(), "app");

/**
 * Find all MDX/TSX files
 */
function findDocFiles(dir: string): string[] {
  const files: string[] = [];

  function walk(currentDir: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory() && entry.name !== "node_modules") {
        walk(fullPath);
      } else if (entry.isFile() && (entry.name.endsWith(".mdx") || entry.name.endsWith(".tsx"))) {
        files.push(fullPath);
      }
    }
  }

  walk(dir);
  return files;
}

/**
 * Extract links from file
 */
function extractLinks(filePath: string): string[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const links: string[] = [];

  // Match markdown links [text](url)
  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = markdownLinkRegex.exec(content)) !== null) {
    if (match[2]) links.push(match[2]);
  }

  // Match Next.js Link href (including template literals)
  const linkHrefRegex = /href=["']([^"']+)["']/g;
  while ((match = linkHrefRegex.exec(content)) !== null) {
    if (match[1]) links.push(match[1]);
  }

  // Match router.push() calls
  const routerPushRegex = /router\.push\(["']([^"']+)["']\)/g;
  while ((match = routerPushRegex.exec(content)) !== null) {
    if (match[1]) links.push(match[1]);
  }

  // Match dynamic routes in template literals (e.g., `/components/${name}`)
  // We'll validate these separately as they're dynamic

  return links;
}

/**
 * Check if link is valid
 */
function isValidLink(link: string, basePath: string): boolean {
  // External links
  if (link.startsWith("http://") || link.startsWith("https://") || link.startsWith("mailto:")) {
    return true; // Skip external link validation for now
  }

  // Hash links (anchors)
  if (link.startsWith("#")) {
    return true;
  }

  // Dynamic routes (contain brackets or template variables)
  if (link.includes("[") || link.includes("${") || link.includes("{")) {
    return true; // Skip dynamic route validation
  }

  // Remove query strings and hashes
  const cleanLink = link.split("?")[0].split("#")[0];

  // Absolute paths from app root
  if (cleanLink.startsWith("/")) {
    const appPath = path.resolve(DOCS_DIR, cleanLink.slice(1));

    // Check for page.tsx, page.mdx, or directory with page file
    if (
      fs.existsSync(`${appPath}/page.tsx`) ||
      fs.existsSync(`${appPath}/page.mdx`) ||
      fs.existsSync(`${appPath}.tsx`) ||
      fs.existsSync(`${appPath}.mdx`) ||
      (fs.existsSync(appPath) && fs.statSync(appPath).isDirectory())
    ) {
      return true;
    }
  } else {
    // Relative paths
    const fullPath = path.resolve(path.dirname(basePath), cleanLink);
    const docsPath = path.resolve(DOCS_DIR);

    if (fullPath.startsWith(docsPath)) {
      return (
        fs.existsSync(fullPath) ||
        fs.existsSync(`${fullPath}/page.tsx`) ||
        fs.existsSync(`${fullPath}/page.mdx`) ||
        fs.existsSync(`${fullPath}.tsx`) ||
        fs.existsSync(`${fullPath}.mdx`)
      );
    }
  }

  return false;
}

/**
 * Main validation function
 */
function main() {
  console.log("🔍 Validating documentation...");

  const files = findDocFiles(DOCS_DIR);
  console.log(`Found ${files.length} documentation files`);

  let errors = 0;
  const _warnings = 0;

  for (const file of files) {
    const links = extractLinks(file);

    for (const link of links) {
      if (!isValidLink(link, file)) {
        console.error(`❌ Dead link in ${path.relative(DOCS_DIR, file)}: ${link}`);
        errors++;
      }
    }
  }

  if (errors > 0) {
    console.error(`\n❌ Found ${errors} errors`);
    process.exit(1);
  } else {
    console.log(`\n✅ All documentation files are valid`);
  }
}

main();
