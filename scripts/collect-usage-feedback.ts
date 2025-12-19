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

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

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

  console.log("=".repeat(70));
  console.log("📊 USAGE FEEDBACK COLLECTION");
  console.log("=".repeat(70));
  console.log("\n📋 Назначение:");
  console.log("   Собирает и анализирует обратную связь об использовании:");
  console.log("   - GitHub issues (запросы компонентов, обратная связь, проблемы)");
  console.log("   - Анализ кодовой базы (паттерны использования компонентов)");
  console.log("   - Генерирует отчет об использовании\n");

  try {
    console.log("🔍 Сбор обратной связи...\n");

    // Parse GitHub issues (placeholder for future API integration)
    console.log("1️⃣  Парсинг GitHub issues...");
    const githubIssues = parseGitHubIssues();
    console.log(
      `   ${githubIssues.length > 0 ? "✓" : "⚠️"} Найдено issues: ${githubIssues.length}`,
    );

    // Analyze usage patterns from codebase
    console.log("\n2️⃣  Анализ паттернов использования из кодовой базы...");
    const usagePatterns = analyzeUsagePatterns();
    console.log(`   ✓ Найдено паттернов: ${usagePatterns.length}`);

    // Generate report
    console.log("\n3️⃣  Генерация отчета...");
    const report = generateReport(githubIssues, usagePatterns);
    console.log(`   ✓ Отчет сгенерирован`);

    // Output results
    console.log("\n4️⃣  Сохранение результатов...");
    outputResults(report, format, outputPath);

    console.log("\n" + "=".repeat(70));
    console.log("📊 ИТОГОВЫЕ РЕЗУЛЬТАТЫ:");
    console.log("=".repeat(70));
    console.log(`\n📋 Всего обратной связи: ${report.summary.totalFeedback}`);
    console.log(`🔴 Высокий приоритет (P1): ${report.recommendations.highPriority.length}`);
    console.log(`📊 Паттернов использования: ${report.recommendations.patterns.length}\n`);

    if (report.summary.totalFeedback > 0) {
      console.log("📈 Статистика по типам:");
      for (const [type, count] of Object.entries(report.summary.byType)) {
        console.log(`   • ${type}: ${count}`);
      }
      console.log("\n📈 Статистика по статусам:");
      for (const [status, count] of Object.entries(report.summary.byStatus)) {
        console.log(`   • ${status}: ${count}`);
      }
      if (Object.keys(report.summary.byPriority).length > 0) {
        console.log("\n📈 Статистика по приоритетам:");
        for (const [priority, count] of Object.entries(report.summary.byPriority)) {
          console.log(`   • ${priority}: ${count}`);
        }
      }
    }

    console.log("\n" + "=".repeat(70));
  } catch (error) {
    console.log("\n" + "=".repeat(70));
    console.log("❌ ОШИБКА ПРИ СБОРЕ ОБРАТНОЙ СВЯЗИ");
    console.log("=".repeat(70));
    console.error(`\n${error instanceof Error ? error.message : error}\n`);
    process.exit(1);
  }
}

// Check if this is the main module (ES module equivalent of require.main === module)
if (fileURLToPath(import.meta.url) === resolve(process.argv[1] || "")) {
  main();
}

export { collectUsageFeedback, type FeedbackItem, type UsageReport };

// Export for future GitHub API integration
async function collectUsageFeedback(): Promise<UsageReport> {
  const githubIssues = parseGitHubIssues();
  const usagePatterns = analyzeUsagePatterns();
  return generateReport(githubIssues, usagePatterns);
}
