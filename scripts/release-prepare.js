#!/usr/bin/env node

/**
 * Release Preparation Script
 *
 * Prepares CHANGELOG.md for release by:
 * - Moving content from [Unreleased] to new version section
 * - Ensuring proper ordering (newest → oldest)
 * - Resetting [Unreleased] section to empty
 * - NOT inserting date yet (will be inserted after npm publish)
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// Colors for output
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RESET = "\x1b[0m";

function logError(message) {
  console.error(`${RED}❌ Error: ${message}${RESET}`);
}

function logSuccess(message) {
  console.log(`${GREEN}✅ ${message}${RESET}`);
}

function logInfo(message) {
  console.log(`ℹ️  ${message}`);
}

/**
 * Read package.json version
 */
function getPackageVersion() {
  try {
    const packageJson = JSON.parse(readFileSync(join(rootDir, "package.json"), "utf8"));
    return packageJson.version;
  } catch (error) {
    logError(`Failed to read package.json: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Prepare CHANGELOG for release
 */
function prepareChangelog() {
  const version = getPackageVersion();
  logInfo(`Preparing CHANGELOG for version ${version}...`);

  try {
    const changelogPath = join(rootDir, "CHANGELOG.md");
    const changelog = readFileSync(changelogPath, "utf8");
    const lines = changelog.split("\n");

    // Find [Unreleased] section
    let unreleasedStart = -1;
    let unreleasedEnd = -1;
    let inUnreleased = false;
    let unreleasedContent = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.trim() === "## [Unreleased]") {
        unreleasedStart = i;
        inUnreleased = true;
        continue;
      }

      if (inUnreleased) {
        // Stop at next version section or end of file
        if (line.match(/^## \[[\d.]+\]/)) {
          unreleasedEnd = i;
          break;
        }
        unreleasedContent.push(line);
      }
    }

    if (unreleasedStart === -1) {
      logError("[Unreleased] section not found in CHANGELOG.md");
      process.exit(1);
    }

    // Remove empty lines and the note at the end
    let contentStart = 0;
    let contentEnd = unreleasedContent.length;

    // Find first non-empty line
    for (let i = 0; i < unreleasedContent.length; i++) {
      if (unreleasedContent[i].trim() !== "") {
        contentStart = i;
        break;
      }
    }

    // Find last content line (before note or empty lines)
    for (let i = unreleasedContent.length - 1; i >= 0; i--) {
      const line = unreleasedContent[i].trim();
      if (line === "" || line.startsWith("**Note:**")) {
        contentEnd = i;
      } else if (line !== "") {
        break;
      }
    }

    const actualContent = unreleasedContent.slice(contentStart, contentEnd);

    if (actualContent.length === 0 || actualContent.join("\n").trim() === "") {
      logError("[Unreleased] section has no content. Add release notes before preparing release.");
      process.exit(1);
    }

    // Check if version section already exists
    const versionSectionExists = lines.some((line) =>
      line.match(new RegExp(`^## \\[${version.replace(/\./g, "\\.")}\\]`)),
    );
    if (versionSectionExists) {
      logError(`Version section [${version}] already exists in CHANGELOG.md`);
      process.exit(1);
    }

    // Build new changelog
    const newLines = [];

    // Add header and [Unreleased] section (empty)
    for (let i = 0; i <= unreleasedStart; i++) {
      newLines.push(lines[i]);
    }

    // Add empty [Unreleased] content
    newLines.push("");
    newLines.push(
      "**Note:** To add entries for future releases, add them under this [Unreleased] section. When a version is published to npm, move the entry to a versioned section with the exact npm publish date.",
    );
    newLines.push("");

    // Add new version section (without date - will be added after npm publish)
    newLines.push(`## [${version}]`);
    newLines.push("");
    newLines.push(...actualContent);
    newLines.push("");

    // Add rest of changelog (existing versions)
    if (unreleasedEnd > 0) {
      for (let i = unreleasedEnd; i < lines.length; i++) {
        newLines.push(lines[i]);
      }
    } else {
      // If no end found, add remaining lines
      for (let i = unreleasedStart + 1; i < lines.length; i++) {
        // Skip old unreleased content
        if (lines[i].trim().startsWith("**Note:**")) {
          continue;
        }
        newLines.push(lines[i]);
      }
    }

    // Write updated changelog
    writeFileSync(changelogPath, newLines.join("\n"), "utf8");

    logSuccess(`CHANGELOG.md prepared for version ${version}`);
    logInfo(`Content moved from [Unreleased] to [${version}] section`);
    logInfo(`[Unreleased] section reset to empty`);
  } catch (error) {
    logError(`Failed to prepare CHANGELOG: ${error.message}`);
    process.exit(1);
  }
}

// Run preparation
prepareChangelog();
