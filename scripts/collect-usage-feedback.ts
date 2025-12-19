#!/usr/bin/env tsx

/**
 * Usage Feedback Collection Script
 *
 * Collects and analyzes usage feedback from:
 * - GitHub issues (component requests, feedback, pain points)
 * - Codebase analysis (component usage patterns)
 * - Generates usage report
 *
 * Usage:
 *   tsx scripts/collect-usage-feedback.ts [options]
 *
 * Options:
 *   --output <path>  Output file path (default: artifacts/usage-feedback-report.json)
 *   --format <json|markdown>  Output format (default: json)
 *   --github-token <token>  GitHub token for API access (optional, for future GitHub API integration)
 */

import { readFileSync, existsSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";

interface FeedbackItem {
  id: string;
  type: "component-request" | "enhancement" | "feedback" | "pain-point" | "usage-pattern";
  title: string;
  description: string;
  frequency?: number;
  priority?: "P1" | "P2" | "P3" | "P4";
  status: "open" | "approved" | "deferred" | "rejected" | "implemented";
  source: "github" | "codebase" | "manual";
  createdAt: string;
  updatedAt: string;
}

interface UsageReport {
  timestamp: string;
  summary: {
    totalFeedback: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    byPriority: Record<string, number>;
  };
  feedback: FeedbackItem[];
  recommendations: {
    highPriority: FeedbackItem[];
    patterns: string[];
  };
}

/**
 * Parse GitHub issues from markdown files (simplified - in production would use GitHub API)
 */
function parseGitHubIssues(): FeedbackItem[] {
  const issues: FeedbackItem[] = [];

  // In a real implementation, this would:
  // 1. Use GitHub API to fetch issues
  // 2. Filter by labels (component-request, feedback, enhancement, pain-point)
  // 3. Parse issue content
  // 4. Extract metadata

  // For now, return empty array - this is a placeholder for future GitHub API integration
  console.log("⚠️  GitHub API integration not yet implemented. This is a placeholder.");
  console.log("   In production, this would fetch issues from GitHub API.");

  return issues;
}

/**
 * Analyze codebase for usage patterns
 */
function analyzeUsagePatterns(): FeedbackItem[] {
  const patterns: FeedbackItem[] = [];

  // Check if component needs analysis exists
  const analysisPath = join(process.cwd(), "artifacts", "component-needs-analysis.json");

  if (existsSync(analysisPath)) {
    try {
      const analysis = JSON.parse(readFileSync(analysisPath, "utf-8"));

      // Convert analysis patterns to feedback items
      for (const pattern of analysis.patterns || []) {
        if (pattern.frequency >= 3) {
          patterns.push({
            id: `pattern-${pattern.name.toLowerCase().replace(/\s+/g, "-")}`,
            type: "usage-pattern",
            title: `Usage Pattern: ${pattern.name}`,
            description: `Found ${pattern.frequency} occurrences of ${pattern.name} pattern in codebase.`,
            frequency: pattern.frequency,
            priority: pattern.frequency >= 10 ? "P1" : pattern.frequency >= 5 ? "P2" : "P3",
            status: "open",
            source: "codebase",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not parse component needs analysis: ${error}`);
    }
  } else {
    console.log(
      "ℹ️  Component needs analysis not found. Run scripts/analyze-component-needs.ts first.",
    );
  }

  return patterns;
}

/**
 * Generate usage report
 */
function generateReport(githubIssues: FeedbackItem[], usagePatterns: FeedbackItem[]): UsageReport {
  const allFeedback = [...githubIssues, ...usagePatterns];

  const byType: Record<string, number> = {};
  const byStatus: Record<string, number> = {};
  const byPriority: Record<string, number> = {};

  for (const item of allFeedback) {
    byType[item.type] = (byType[item.type] || 0) + 1;
    byStatus[item.status] = (byStatus[item.status] || 0) + 1;
    if (item.priority) {
      byPriority[item.priority] = (byPriority[item.priority] || 0) + 1;
    }
  }

  const highPriority = allFeedback.filter(
    (item) => item.priority === "P1" && item.status === "open",
  );

  const patterns = usagePatterns.map((p) => p.title);

  return {
    timestamp: new Date().toISOString(),
    summary: {
      totalFeedback: allFeedback.length,
      byType,
      byStatus,
      byPriority,
    },
    feedback: allFeedback.sort((a, b) => {
      // Sort by priority, then by frequency
      const priorityOrder = { P1: 1, P2: 2, P3: 3, P4: 4 };
      const aPriority = priorityOrder[a.priority || "P4"] || 4;
      const bPriority = priorityOrder[b.priority || "P4"] || 4;

      if (aPriority !== bPriority) {
        return aPriority - bPriority;
      }

      return (b.frequency || 0) - (a.frequency || 0);
    }),
    recommendations: {
      highPriority,
      patterns,
    },
  };
}

/**
 * Output results
 */
function outputResults(
  report: UsageReport,
  format: "json" | "markdown" = "json",
  outputPath?: string,
): void {
  const defaultPath = join(process.cwd(), "artifacts", "usage-feedback-report.json");
  const path = outputPath || defaultPath;

  if (format === "json") {
    const dir = dirname(path);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(path, JSON.stringify(report, null, 2));
    console.log(`✅ Report written to ${path}`);
  } else {
    // Markdown format
    const markdown = `# Usage Feedback Report

**Generated:** ${report.timestamp}

## Summary

- **Total Feedback Items:** ${report.summary.totalFeedback}
- **By Type:** ${Object.entries(report.summary.byType)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ")}
- **By Status:** ${Object.entries(report.summary.byStatus)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ")}
- **By Priority:** ${Object.entries(report.summary.byPriority)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ")}

## High Priority Items

${
  report.recommendations.highPriority.length > 0
    ? report.recommendations.highPriority
        .map(
          (item) => `### ${item.title}

- **Type:** ${item.type}
- **Priority:** ${item.priority}
- **Status:** ${item.status}
- **Frequency:** ${item.frequency || "N/A"}
- **Description:** ${item.description}
`,
        )
        .join("\n")
    : "No high priority items."
}

## Usage Patterns

${
  report.recommendations.patterns.length > 0
    ? report.recommendations.patterns.map((p) => `- ${p}`).join("\n")
    : "No patterns identified."
}

## All Feedback Items

${report.feedback
  .map(
    (item) => `### ${item.title}

- **ID:** ${item.id}
- **Type:** ${item.type}
- **Priority:** ${item.priority || "Not set"}
- **Status:** ${item.status}
- **Frequency:** ${item.frequency || "N/A"}
- **Source:** ${item.source}
- **Description:** ${item.description}
`,
  )
  .join("\n")}
`;

    const dir = dirname(path.replace(".json", ".md"));
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(path.replace(".json", ".md"), markdown);
    console.log(`✅ Report written to ${path.replace(".json", ".md")}`);
  }
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const outputIndex = args.indexOf("--output");
  const formatIndex = args.indexOf("--format");

  const outputPath = outputIndex >= 0 ? args[outputIndex + 1] : undefined;
  const format = (formatIndex >= 0 ? args[formatIndex + 1] : "json") as "json" | "markdown";

  try {
    console.log("📊 Collecting usage feedback...");

    // Parse GitHub issues (placeholder for future API integration)
    const githubIssues = parseGitHubIssues();

    // Analyze usage patterns from codebase
    const usagePatterns = analyzeUsagePatterns();

    // Generate report
    const report = generateReport(githubIssues, usagePatterns);

    // Output results
    outputResults(report, format, outputPath);

    console.log("\n📊 Report Summary:");
    console.log(`   Total feedback: ${report.summary.totalFeedback}`);
    console.log(`   High priority: ${report.recommendations.highPriority.length}`);
    console.log(`   Usage patterns: ${report.recommendations.patterns.length}`);
  } catch (error) {
    console.error("❌ Collection failed:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { collectUsageFeedback, type UsageReport, type FeedbackItem };

// Export for future GitHub API integration
async function collectUsageFeedback(): Promise<UsageReport> {
  const githubIssues = parseGitHubIssues();
  const usagePatterns = analyzeUsagePatterns();
  return generateReport(githubIssues, usagePatterns);
}
