#!/usr/bin/env node

/**
 * Post-Release Verification Script
 *
 * Verifies that release completed successfully:
 * - Version appears in npm registry
 * - Git tag exists locally and remotely
 * - CHANGELOG date matches npm publish time
 * - CHANGELOG ordering is correct
 * - [Unreleased] section is empty
 */

import { readFileSync } from "fs";
import { execSync } from "child_process";
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
 * Get npm publish date for version
 */
function getNpmPublishDate(version) {
  try {
    const output = execSync(`npm view @tenerife.music/ui@${version} time --json`, {
      encoding: "utf8",
      cwd: rootDir,
      stdio: "pipe",
    });
    const timeData = JSON.parse(output);
    return timeData[version] ? new Date(timeData[version]) : null;
  } catch (error) {
    return null;
  }
}

/**
 * Check if version exists in npm
 */
function versionExistsInNpm(version) {
  try {
    execSync(`npm view @tenerife.music/ui@${version} version`, {
      encoding: "utf8",
      cwd: rootDir,
      stdio: "pipe",
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if git tag exists locally
 */
function gitTagExistsLocal(version) {
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
 * Check if git tag exists remotely
 */
function gitTagExistsRemote(version) {
  try {
    execSync(`git ls-remote --tags origin v${version}`, {
      encoding: "utf8",
      cwd: rootDir,
      stdio: "pipe",
    });
    return true;
  } catch {
    return false;
  }
}

/**
 * Parse CHANGELOG and get version date
 */
function getChangelogVersionDate(version) {
  try {
    const changelog = readFileSync(join(rootDir, "CHANGELOG.md"), "utf8");
    const lines = changelog.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const match = line.match(
        new RegExp(`^## \\[${version.replace(/\./g, "\\.")}\\] - (\\d{4}-\\d{2}-\\d{2})`),
      );
      if (match) {
        return new Date(match[1]);
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Check CHANGELOG ordering (newest → oldest)
 */
function checkChangelogOrdering() {
  try {
    const changelog = readFileSync(join(rootDir, "CHANGELOG.md"), "utf8");
    const lines = changelog.split("\n");

    const versions = [];
    for (const line of lines) {
      const match = line.match(/^## \[([\d.]+)\]/);
      if (match && match[1] !== "Unreleased") {
        versions.push(match[1]);
      }
    }

    // Check if versions are in descending order
    for (let i = 1; i < versions.length; i++) {
      const prev = versions[i - 1].split(".").map(Number);
      const curr = versions[i].split(".").map(Number);

      // Compare versions
      if (
        prev[0] < curr[0] ||
        (prev[0] === curr[0] && prev[1] < curr[1]) ||
        (prev[0] === curr[0] && prev[1] === curr[1] && prev[2] < curr[2])
      ) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}

/**
 * Check if [Unreleased] is empty
 */
function isUnreleasedEmpty() {
  try {
    const changelog = readFileSync(join(rootDir, "CHANGELOG.md"), "utf8");
    const lines = changelog.split("\n");

    let inUnreleased = false;
    let hasContent = false;

    for (const line of lines) {
      if (line.trim() === "## [Unreleased]") {
        inUnreleased = true;
        continue;
      }

      if (inUnreleased) {
        if (line.match(/^## \[[\d.]+\]/)) {
          break;
        }
        if (line.trim() !== "" && !line.trim().startsWith("**Note:**")) {
          hasContent = true;
          break;
        }
      }
    }

    return !hasContent;
  } catch {
    return false;
  }
}

/**
 * Main verification function
 */
function verifyRelease() {
  logInfo("Starting post-release verification...\n");

  const version = getPackageVersion();
  logInfo(`Verifying release for version: ${version}\n`);

  let hasErrors = false;

  // Check 1: Version exists in npm
  const isPublished = versionExistsInNpm(version);
  if (isPublished) {
    logSuccess(`Version ${version} exists in npm registry`);
  } else {
    logWarning(`Version ${version} not found in npm registry (not yet published)`);
    logInfo(`Skipping published-version-only checks for ${version}`);
  }

  // Check 2: Git tag exists locally (only required if published)
  if (gitTagExistsLocal(version)) {
    logSuccess(`Git tag v${version} exists locally`);
  } else {
    if (isPublished) {
      logError(`Git tag v${version} does not exist locally`);
      hasErrors = true;
    } else {
      logInfo(`Git tag v${version} does not exist locally (will be created on publish)`);
    }
  }

  // Check 3: Git tag exists remotely (only required if published)
  if (gitTagExistsRemote(version)) {
    logSuccess(`Git tag v${version} exists remotely`);
  } else {
    if (isPublished) {
      logWarning(`Git tag v${version} does not exist remotely (may need to push)`);
    } else {
      logInfo(`Git tag v${version} does not exist remotely (will be created on publish)`);
    }
  }

  // Check 4: CHANGELOG date matches npm publish time (only for published versions)
  const npmDate = getNpmPublishDate(version);
  const changelogDate = getChangelogVersionDate(version);

  if (isPublished) {
    // For published versions, date is required
    if (npmDate && changelogDate) {
      const diffDays = Math.abs((npmDate - changelogDate) / (1000 * 60 * 60 * 24));
      if (diffDays <= 1) {
        logSuccess(`CHANGELOG date matches npm publish date (within 1 day tolerance)`);
      } else {
        logError(
          `CHANGELOG date (${changelogDate.toISOString().split("T")[0]}) does not match npm publish date (${npmDate.toISOString().split("T")[0]})`,
        );
        hasErrors = true;
      }
    } else if (!changelogDate) {
      logError(`CHANGELOG does not have date for published version ${version}`);
      hasErrors = true;
    }
  } else {
    // For unpublished versions, date is optional (will be added on publish)
    if (changelogDate) {
      logInfo(`CHANGELOG has date for ${version} (will be updated to npm publish date on release)`);
    } else {
      logInfo(`CHANGELOG does not have date for ${version} (will be added on publish)`);
    }
  }

  // Check 5: CHANGELOG ordering
  if (checkChangelogOrdering()) {
    logSuccess(`CHANGELOG ordering is correct (newest → oldest)`);
  } else {
    logError(`CHANGELOG ordering is incorrect`);
    hasErrors = true;
  }

  // Check 6: [Unreleased] is empty
  if (isUnreleasedEmpty()) {
    logSuccess(`[Unreleased] section is empty`);
  } else {
    logWarning(`[Unreleased] section has content (should be empty after release)`);
  }

  console.log("");

  if (hasErrors) {
    logError("Post-release verification failed. Please check the errors above.");
    process.exit(1);
  } else {
    logSuccess("All post-release verifications passed!");
    process.exit(0);
  }
}

// Run verification
verifyRelease();
