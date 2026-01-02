#!/usr/bin/env node

/**
 * Release Canon Validation Script
 *
 * Hard gate that prevents release if version canon is violated.
 * Validates:
 * - package.json version is not already published to npm
 * - CHANGELOG.md contains version section or [Unreleased] has content
 * - CHANGELOG doesn't contain versions not in npm (except [Unreleased])
 * - Git tag doesn't already exist
 * - [Unreleased] section exists and has content
 */

import { execSync } from "child_process";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

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

function logWarning(message) {
  console.warn(`${YELLOW}⚠️  Warning: ${message}${RESET}`);
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
 * Fetch npm published versions
 */
function getNpmVersions() {
  try {
    const output = execSync("npm view @tenerife.music/ui versions --json", {
      encoding: "utf8",
      cwd: rootDir,
      stdio: "pipe",
    });
    return JSON.parse(output);
  } catch (error) {
    // If package doesn't exist or network error, return empty array
    if (error.message.includes("E404") || error.message.includes("ENOTFOUND")) {
      logWarning("Could not fetch npm versions (package may not exist yet or network error)");
      return [];
    }
    logError(`Failed to fetch npm versions: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Parse CHANGELOG.md and extract versions
 */
function parseChangelog() {
  try {
    const changelog = readFileSync(join(rootDir, "CHANGELOG.md"), "utf8");
    const lines = changelog.split("\n");

    const versions = [];
    let unreleasedContent = "";
    let inUnreleased = false;
    let unreleasedStartLine = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for [Unreleased] section
      if (line.trim() === "## [Unreleased]") {
        inUnreleased = true;
        unreleasedStartLine = i;
        continue;
      }

      // Check for version sections
      const versionMatch = line.match(/^## \[([\d.]+)\]/);
      if (versionMatch) {
        if (inUnreleased) {
          // End of [Unreleased] section - collect content before moving to next section
          unreleasedContent = lines
            .slice(unreleasedStartLine + 1, i)
            .join("\n")
            .trim();
          inUnreleased = false;
        }
        versions.push({
          version: versionMatch[1],
          line: i,
        });
        continue;
      }

      // Collect [Unreleased] content (for end of file case)
      if (inUnreleased && i === lines.length - 1) {
        unreleasedContent = lines
          .slice(unreleasedStartLine + 1, i + 1)
          .join("\n")
          .trim();
        inUnreleased = false;
      }
    }

    // If still in unreleased at end of file
    if (inUnreleased) {
      unreleasedContent = lines
        .slice(unreleasedStartLine + 1)
        .join("\n")
        .trim();
    }

    return {
      versions,
      hasUnreleasedContent: unreleasedContent.length > 0 && !unreleasedContent.match(/^Note:/),
    };
  } catch (error) {
    logError(`Failed to parse CHANGELOG.md: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Check if git tag exists
 */
function gitTagExists(version) {
  try {
    execSync(`git rev-parse -q --verify v${version}`, {
      cwd: rootDir,
      stdio: "pipe",
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Main validation function
 */
function validateRelease() {
  logInfo("Starting release canon validation...\n");

  const packageVersion = getPackageVersion();
  logInfo(`Package version: ${packageVersion}`);

  const npmVersions = getNpmVersions();
  logInfo(`Found ${npmVersions.length} published versions in npm`);

  const changelog = parseChangelog();
  logInfo(`Found ${changelog.versions.length} versions in CHANGELOG`);

  let hasErrors = false;

  // Check 1: Version not already published
  if (npmVersions.includes(packageVersion)) {
    logError(`Version ${packageVersion} is already published to npm`);
    logError(`Published versions: ${npmVersions.join(", ")}`);
    hasErrors = true;
  } else {
    logSuccess(`Version ${packageVersion} is not published (OK)`);
  }

  // Check 2: CHANGELOG has version section OR [Unreleased] has content
  const hasVersionSection = changelog.versions.some((v) => v.version === packageVersion);
  if (!hasVersionSection && !changelog.hasUnreleasedContent) {
    logError(`CHANGELOG.md must contain either:`);
    logError(`  1. A section for version ${packageVersion}, OR`);
    logError(`  2. Content under [Unreleased] section`);
    hasErrors = true;
  } else if (hasVersionSection) {
    logSuccess(`CHANGELOG has section for version ${packageVersion}`);
  } else if (changelog.hasUnreleasedContent) {
    logSuccess(`CHANGELOG has content in [Unreleased] section`);
  }

  // Check 3: CHANGELOG doesn't contain versions not in npm (except [Unreleased])
  const orphanVersions = changelog.versions
    .map((v) => v.version)
    .filter((v) => v !== packageVersion && !npmVersions.includes(v));

  if (orphanVersions.length > 0) {
    logError(`CHANGELOG contains versions not published to npm: ${orphanVersions.join(", ")}`);
    logError(`These versions must be removed from CHANGELOG or published to npm`);
    hasErrors = true;
  } else {
    logSuccess(`All CHANGELOG versions are published to npm (OK)`);
  }

  // Check 4: Git tag doesn't already exist
  if (gitTagExists(packageVersion)) {
    logError(`Git tag v${packageVersion} already exists`);
    logError(
      `Delete it with: git tag -d v${packageVersion} && git push origin --delete v${packageVersion}`,
    );
    hasErrors = true;
  } else {
    logSuccess(`Git tag v${packageVersion} does not exist (OK)`);
  }

  // Check 5: [Unreleased] section exists and has content (if no version section)
  if (!hasVersionSection) {
    if (!changelog.hasUnreleasedContent) {
      logError(`[Unreleased] section exists but has no content`);
      logError(`Add release notes under [Unreleased] before publishing`);
      hasErrors = true;
    } else {
      logSuccess(`[Unreleased] section has content (OK)`);
    }
  }

  console.log("");

  if (hasErrors) {
    logError("Release validation failed. Fix the errors above before proceeding.");
    process.exit(1);
  } else {
    logSuccess("All release canon validations passed!");
    process.exit(0);
  }
}

// Run validation
validateRelease();
