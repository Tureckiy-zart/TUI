#!/usr/bin/env node

/**
 * Version Canon Synchronization Script
 *
 * Automatically synchronizes npm registry, git tags, and CHANGELOG.md
 * according to Version Canon Rules where npm is the single source of truth.
 */

import { execSync } from "child_process";
import { copyFileSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

// Colors for output
const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const BLUE = "\x1b[34m";
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

function logDryRun(message) {
  console.log(`${BLUE}🔵 [DRY-RUN] ${message}${RESET}`);
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
    if (error.message.includes("E404") || error.message.includes("ENOTFOUND")) {
      logWarning("Could not fetch npm versions (package may not exist yet or network error)");
      return [];
    }
    logError(`Failed to fetch npm versions: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Fetch npm publish dates
 */
function getNpmPublishDates() {
  try {
    const output = execSync("npm view @tenerife.music/ui time --json", {
      encoding: "utf8",
      cwd: rootDir,
      stdio: "pipe",
    });
    const timeData = JSON.parse(output);
    const dates = {};
    for (const [version, dateStr] of Object.entries(timeData)) {
      if (version.match(/^\d+\.\d+\.\d+$/)) {
        dates[version] = new Date(dateStr);
      }
    }
    return dates;
  } catch (error) {
    logError(`Failed to fetch npm publish dates: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Get all git tags
 */
function getGitTags() {
  try {
    const output = execSync("git tag --list", {
      encoding: "utf8",
      cwd: rootDir,
      stdio: "pipe",
    });
    return output
      .split("\n")
      .filter((tag) => tag.trim() !== "")
      .map((tag) => tag.trim());
  } catch (error) {
    logError(`Failed to get git tags: ${error.message}`);
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
    let currentVersion = null;
    let currentVersionStart = -1;
    let currentVersionDate = null;
    let unreleasedStart = -1;
    let unreleasedEnd = -1;
    let inUnreleased = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Check for [Unreleased] section
      if (line.trim() === "## [Unreleased]") {
        unreleasedStart = i;
        inUnreleased = true;
        continue;
      }

      // Check for version sections
      const versionMatch = line.match(/^## \[([\d.]+)\](?: - (\d{4}-\d{2}-\d{2}))?/);
      if (versionMatch) {
        if (inUnreleased && unreleasedEnd === -1) {
          unreleasedEnd = i;
          inUnreleased = false;
        }

        if (currentVersion) {
          versions.push({
            version: currentVersion,
            startLine: currentVersionStart,
            endLine: i,
            date: currentVersionDate,
          });
        }

        currentVersion = versionMatch[1];
        currentVersionStart = i;
        currentVersionDate = versionMatch[2] ? new Date(versionMatch[2]) : null;
        continue;
      }
    }

    // Add last version
    if (currentVersion) {
      versions.push({
        version: currentVersion,
        startLine: currentVersionStart,
        endLine: lines.length,
        date: currentVersionDate,
      });
    }

    // Find unreleased end if not found
    if (inUnreleased && unreleasedEnd === -1) {
      unreleasedEnd = lines.length;
    }

    return {
      lines,
      versions,
      unreleasedStart,
      unreleasedEnd,
    };
  } catch (error) {
    logError(`Failed to parse CHANGELOG.md: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Find commit hash closest to a given date
 */
function findCommitByDate(date) {
  try {
    // Format date as ISO string for git
    const dateStr = date.toISOString().split("T")[0];
    // Find the first commit on or before this date
    const output = execSync(`git log --until="${dateStr} 23:59:59" --format="%H" -1`, {
      encoding: "utf8",
      cwd: rootDir,
      stdio: "pipe",
    });
    return output.trim();
  } catch (error) {
    logWarning(
      `Could not find commit for date ${date.toISOString().split("T")[0]}: ${error.message}`,
    );
    return null;
  }
}

/**
 * Collect canonical data from all sources
 */
function collectCanonicalData() {
  logInfo("Collecting canonical version data...\n");

  const npmVersions = getNpmVersions();
  const npmDates = getNpmPublishDates();
  const gitTags = getGitTags();
  const changelog = parseChangelog();
  const packageVersion = getPackageVersion();

  logInfo(`Found ${npmVersions.length} npm published versions`);
  logInfo(`Found ${gitTags.length} git tags`);
  logInfo(`Found ${changelog.versions.length} versions in CHANGELOG`);

  // Build comparison
  const npmVersionSet = new Set(npmVersions);
  const gitTagVersionSet = new Set(
    gitTags.map((tag) => tag.replace(/^v/, "")).filter((v) => v.match(/^\d+\.\d+\.\d+$/)),
  );
  const changelogVersionSet = new Set(changelog.versions.map((v) => v.version));

  // Find missing git tags
  const missingGitTags = npmVersions.filter((v) => !gitTagVersionSet.has(v));

  // Find invalid git tags (not in npm)
  const invalidGitTags = gitTags.filter((tag) => {
    const version = tag.replace(/^v/, "");
    return version.match(/^\d+\.\d+\.\d+$/) && !npmVersionSet.has(version);
  });

  // Find versions in CHANGELOG not in npm
  // Include all versions not published to npm (including packageVersion if unpublished)
  const invalidChangelogVersions = changelog.versions.filter((v) => !npmVersionSet.has(v.version));

  return {
    npmVersions,
    npmDates,
    gitTags,
    changelog,
    packageVersion,
    missingGitTags,
    invalidGitTags,
    invalidChangelogVersions,
  };
}

/**
 * Fix CHANGELOG.md
 */
function fixChangelog(data, dryRun = true) {
  logInfo("\nFixing CHANGELOG.md...\n");

  const { changelog, invalidChangelogVersions, npmDates, npmVersions, packageVersion } = data;

  let needsUpdate = false;
  const newLines = [...changelog.lines];

  // Remove invalid versions from CHANGELOG (not published to npm)
  for (const invalidVersion of invalidChangelogVersions) {
    if (invalidVersion.version === packageVersion) {
      // This is the current package version - move content to [Unreleased]
      logInfo(`Moving [${invalidVersion.version}] content to [Unreleased]...`);

      // Extract content
      const contentLines = newLines.slice(invalidVersion.startLine + 1, invalidVersion.endLine);
      // Remove empty lines and separator
      let contentStart = 0;
      let contentEnd = contentLines.length;

      for (let i = 0; i < contentLines.length; i++) {
        if (contentLines[i].trim() !== "" && !contentLines[i].trim().startsWith("---")) {
          contentStart = i;
          break;
        }
      }

      for (let i = contentLines.length - 1; i >= 0; i--) {
        const line = contentLines[i].trim();
        if (line === "" || line.startsWith("---")) {
          contentEnd = i;
        } else if (line !== "") {
          break;
        }
      }

      const actualContent = contentLines.slice(contentStart, contentEnd);

      // Remove version section
      newLines.splice(invalidVersion.startLine, invalidVersion.endLine - invalidVersion.startLine);

      // Insert content into [Unreleased] section
      if (changelog.unreleasedStart >= 0) {
        // Find insertion point (after ## [Unreleased] and empty line)
        let insertIndex = changelog.unreleasedStart + 1;
        while (insertIndex < newLines.length && newLines[insertIndex].trim() === "") {
          insertIndex++;
        }
        // Skip Note line if exists
        if (newLines[insertIndex] && newLines[insertIndex].includes("**Note:**")) {
          insertIndex++;
          while (insertIndex < newLines.length && newLines[insertIndex].trim() === "") {
            insertIndex++;
          }
        }

        // Insert content
        if (actualContent.length > 0) {
          newLines.splice(insertIndex, 0, ...actualContent, "");
          needsUpdate = true;
        }
      }

      // Adjust unreleased end
      if (changelog.unreleasedEnd > invalidVersion.startLine) {
        changelog.unreleasedEnd -= invalidVersion.endLine - invalidVersion.startLine;
      }
    } else {
      // Remove completely
      logInfo(`Removing [${invalidVersion.version}] section (not published to npm)...`);
      newLines.splice(invalidVersion.startLine, invalidVersion.endLine - invalidVersion.startLine);
      needsUpdate = true;

      // Adjust unreleased end
      if (changelog.unreleasedEnd > invalidVersion.startLine) {
        changelog.unreleasedEnd -= invalidVersion.endLine - invalidVersion.startLine;
      }
    }
  }

  // Update dates for versions that have dates but they don't match npm
  for (const versionInfo of changelog.versions) {
    if (npmDates[versionInfo.version] && versionInfo.date) {
      const npmDate = npmDates[versionInfo.version];
      const npmDateStr = npmDate.toISOString().split("T")[0];
      const changelogDateStr = versionInfo.date.toISOString().split("T")[0];

      if (npmDateStr !== changelogDateStr) {
        logInfo(`Updating date for [${versionInfo.version}]: ${changelogDateStr} → ${npmDateStr}`);
        const versionLine = newLines[versionInfo.startLine];
        const newVersionLine = versionLine.replace(
          /^## \[([\d.]+)\](?: - \d{4}-\d{2}-\d{2})?/,
          `## [$1] - ${npmDateStr}`,
        );
        newLines[versionInfo.startLine] = newVersionLine;
        needsUpdate = true;
      }
    } else if (npmDates[versionInfo.version] && !versionInfo.date) {
      // Add missing date
      logInfo(
        `Adding date for [${versionInfo.version}]: ${npmDates[versionInfo.version].toISOString().split("T")[0]}`,
      );
      const versionLine = newLines[versionInfo.startLine];
      const npmDateStr = npmDates[versionInfo.version].toISOString().split("T")[0];
      const newVersionLine = versionLine.replace(/^## \[([\d.]+)\]/, `## [$1] - ${npmDateStr}`);
      newLines[versionInfo.startLine] = newVersionLine;
      needsUpdate = true;
    }
  }

  if (needsUpdate) {
    if (dryRun) {
      logDryRun("Would update CHANGELOG.md");
      return false;
    } else {
      // Create backup
      const backupPath = join(rootDir, "CHANGELOG.md.backup");
      copyFileSync(join(rootDir, "CHANGELOG.md"), backupPath);
      logInfo(`Created backup: ${backupPath}`);

      // Write updated changelog
      writeFileSync(join(rootDir, "CHANGELOG.md"), newLines.join("\n"), "utf8");
      logSuccess("CHANGELOG.md updated");
      return true;
    }
  } else {
    logSuccess("CHANGELOG.md is already synchronized");
    return false;
  }
}

/**
 * Sync git tags
 */
function syncGitTags(data, dryRun = true) {
  logInfo("\nSynchronizing git tags...\n");

  const { missingGitTags, invalidGitTags, npmDates } = data;
  let changesMade = false;

  // Create missing tags
  if (missingGitTags.length > 0) {
    logInfo(`Found ${missingGitTags.length} missing git tags: ${missingGitTags.join(", ")}`);

    for (const version of missingGitTags) {
      const tagName = `v${version}`;
      const publishDate = npmDates[version];

      if (!publishDate) {
        logWarning(`No publish date found for ${version}, skipping tag creation`);
        continue;
      }

      const commitHash = findCommitByDate(publishDate);

      if (!commitHash) {
        logWarning(`Could not find commit for ${version}, skipping tag creation`);
        continue;
      }

      if (dryRun) {
        logDryRun(`Would create tag ${tagName} on commit ${commitHash.substring(0, 7)}`);
      } else {
        try {
          execSync(`git tag -a ${tagName} -m "Release ${tagName}" ${commitHash}`, {
            cwd: rootDir,
            stdio: "pipe",
          });
          logSuccess(`Created tag ${tagName}`);
          changesMade = true;
        } catch (error) {
          logError(`Failed to create tag ${tagName}: ${error.message}`);
        }
      }
    }
  } else {
    logSuccess("All npm versions have git tags");
  }

  // Delete invalid tags
  if (invalidGitTags.length > 0) {
    logInfo(`Found ${invalidGitTags.length} invalid git tags: ${invalidGitTags.join(", ")}`);

    for (const tag of invalidGitTags) {
      if (dryRun) {
        logDryRun(`Would delete tag ${tag} (locally and remotely)`);
      } else {
        try {
          // Delete locally
          execSync(`git tag -d ${tag}`, {
            cwd: rootDir,
            stdio: "pipe",
          });
          logSuccess(`Deleted local tag ${tag}`);

          // Delete remotely
          try {
            execSync(`git push origin --delete ${tag}`, {
              cwd: rootDir,
              stdio: "pipe",
            });
            logSuccess(`Deleted remote tag ${tag}`);
          } catch (error) {
            // Check if tag exists remotely
            try {
              execSync(`git ls-remote --tags origin ${tag}`, {
                cwd: rootDir,
                stdio: "pipe",
              });
              // Tag exists remotely but deletion failed
              logWarning(
                `Could not delete remote tag ${tag}. This may require repository permissions or the tag may be protected.`,
              );
              logInfo(`To delete manually, run: git push origin --delete ${tag}`);
            } catch {
              // Tag doesn't exist remotely (already deleted or never existed)
              logInfo(`Remote tag ${tag} does not exist (already deleted or never existed)`);
            }
          }

          changesMade = true;
        } catch (error) {
          logError(`Failed to delete tag ${tag}: ${error.message}`);
        }
      }
    }
  } else {
    logSuccess("No invalid git tags found");
  }

  return changesMade;
}

/**
 * Verify synchronization
 */
function verifySync(data) {
  logInfo("\nVerifying synchronization...\n");

  const { npmVersions, gitTags, changelog, invalidChangelogVersions } = data;

  const gitTagVersionSet = new Set(
    gitTags.map((tag) => tag.replace(/^v/, "")).filter((v) => v.match(/^\d+\.\d+\.\d+$/)),
  );
  const npmVersionSet = new Set(npmVersions);

  let allGood = true;

  // Check git tags
  const missingTags = npmVersions.filter((v) => !gitTagVersionSet.has(v));
  if (missingTags.length > 0) {
    logError(`Missing git tags for npm versions: ${missingTags.join(", ")}`);
    allGood = false;
  } else {
    logSuccess("All npm versions have git tags");
  }

  // Check invalid tags
  const invalidTags = gitTags.filter((tag) => {
    const version = tag.replace(/^v/, "");
    return version.match(/^\d+\.\d+\.\d+$/) && !npmVersionSet.has(version);
  });
  if (invalidTags.length > 0) {
    logError(`Invalid git tags (not in npm): ${invalidTags.join(", ")}`);
    allGood = false;
  } else {
    logSuccess("No invalid git tags");
  }

  // Check CHANGELOG
  if (invalidChangelogVersions.length > 0) {
    const unpublishedVersions = invalidChangelogVersions
      .map((v) => v.version)
      .filter((v) => v !== data.packageVersion);
    if (unpublishedVersions.length > 0) {
      logError(`CHANGELOG contains unpublished versions: ${unpublishedVersions.join(", ")}`);
      allGood = false;
    }
  } else {
    logSuccess("CHANGELOG contains only npm-published versions");
  }

  return allGood;
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes("--execute");

  if (dryRun) {
    logInfo("Running in DRY-RUN mode (use --execute to apply changes)\n");
  } else {
    logWarning("Running in EXECUTE mode - changes will be applied!\n");
  }

  // Collect data
  const data = collectCanonicalData();

  // Print summary
  console.log("\n" + "=".repeat(60));
  logInfo("Version Canon Sync Summary");
  console.log("=".repeat(60));
  console.log(`npm versions: ${data.npmVersions.length}`);
  console.log(`git tags: ${data.gitTags.length}`);
  console.log(`CHANGELOG versions: ${data.changelog.versions.length}`);
  console.log(
    `Missing git tags: ${data.missingGitTags.length} (${data.missingGitTags.join(", ") || "none"})`,
  );
  console.log(
    `Invalid git tags: ${data.invalidGitTags.length} (${data.invalidGitTags.join(", ") || "none"})`,
  );
  console.log(
    `Invalid CHANGELOG versions: ${data.invalidChangelogVersions.length} (${data.invalidChangelogVersions.map((v) => v.version).join(", ") || "none"})`,
  );
  console.log("=".repeat(60) + "\n");

  // Fix CHANGELOG
  const changelogUpdated = fixChangelog(data, dryRun);

  // Sync git tags
  const tagsUpdated = syncGitTags(data, dryRun);

  // Verify
  if (!dryRun && (changelogUpdated || tagsUpdated)) {
    // Re-collect data after changes
    const newData = collectCanonicalData();
    verifySync(newData);
  } else {
    verifySync(data);
  }

  if (dryRun) {
    console.log("\n" + "=".repeat(60));
    logInfo("DRY-RUN complete. Use --execute to apply changes.");
    console.log("=".repeat(60) + "\n");
  } else {
    console.log("\n" + "=".repeat(60));
    logSuccess("Synchronization complete!");
    console.log("=".repeat(60) + "\n");
  }
}

// Run
main();
