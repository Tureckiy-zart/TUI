#!/usr/bin/env node
/**
 * Governance Review Script
 *
 * Scans ESLint rules, verifies Guard Rules alignment, checks Authority Contract compliance,
 * and generates a governance review report.
 *
 * Usage: node scripts/governance-review.mjs [--output <path>]
 * Exit codes: 0 = success, 1 = critical issues found
 */

import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { dirname, join, relative } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = join(__dirname, "..");
const ESLINT_RULES_DIR = join(ROOT_DIR, "eslint-rules");
const DOCS_DIR = join(ROOT_DIR, "docs");
const ARCHITECTURE_DIR = join(DOCS_DIR, "architecture");
const GOVERNANCE_DIR = join(DOCS_DIR, "governance");
const REVIEWS_DIR = join(GOVERNANCE_DIR, "reviews");
const OUTPUT_DIR = join(ROOT_DIR, "artifacts");

// Expected ESLint rules from index.ts
const EXPECTED_RULES = [
  "no-foundation-classname-style",
  "no-foundation-open-htmlattributes",
  "no-link-aschild",
  "no-raw-visual-props",
  "no-raw-tailwind-colors",
  "no-raw-font-size-scale",
  "no-raw-line-height-scale",
  "no-raw-shadow-elevation-scale",
  "no-raw-motion-scale",
];

/**
 * Read file content or return null
 */
function readFile(filePath) {
  try {
    return readFileSync(filePath, "utf-8");
  } catch (error) {
    return null;
  }
}

/**
 * Check if file exists
 */
function fileExists(filePath) {
  return existsSync(filePath);
}

/**
 * Get all TypeScript files in a directory
 */
function getTSFiles(dir) {
  const files = [];
  if (!existsSync(dir)) return files;

  function traverse(currentDir) {
    const entries = readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);
      if (entry.isDirectory() && entry.name !== "node_modules" && entry.name !== "__tests__") {
        traverse(fullPath);
      } else if (entry.isFile() && entry.name.endsWith(".ts")) {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

/**
 * Scan ESLint rules
 */
function scanESLintRules() {
  const findings = {
    rules: [],
    issues: [],
    missing: [],
    extra: [],
  };

  // Check index.ts for exported rules
  const indexFile = join(ESLINT_RULES_DIR, "index.ts");
  const indexContent = readFile(indexFile);

  if (!indexContent) {
    findings.issues.push({
      type: "error",
      message: "ESLint rules index.ts not found",
    });
    return findings;
  }

  // Extract exported rules from index.ts
  const exportedRules = [];
  const ruleExports = indexContent.match(/["']([^"']+)["']:\s*\w+/g) || [];
  for (const exportLine of ruleExports) {
    const match = exportLine.match(/["']([^"']+)["']/);
    if (match) {
      exportedRules.push(match[1]);
    }
  }

  // Check each expected rule
  for (const ruleName of EXPECTED_RULES) {
    const ruleFile = join(ESLINT_RULES_DIR, `${ruleName}.ts`);
    const exists = fileExists(ruleFile);
    const exported = exportedRules.includes(ruleName);

    findings.rules.push({
      name: ruleName,
      fileExists: exists,
      exported: exported,
      status: exists && exported ? "active" : "inactive",
    });

    if (!exists) {
      findings.missing.push(ruleName);
      findings.issues.push({
        type: "error",
        message: `ESLint rule file not found: ${ruleName}.ts`,
      });
    }

    if (!exported) {
      findings.issues.push({
        type: "warning",
        message: `ESLint rule not exported: ${ruleName}`,
      });
    }
  }

  // Check for extra rules
  const ruleFiles = getTSFiles(ESLINT_RULES_DIR).filter(
    (f) => f.endsWith(".ts") && !f.endsWith("index.ts") && !f.endsWith("loader.mjs"),
  );
  for (const ruleFile of ruleFiles) {
    const ruleName = ruleFile.split("/").pop().replace(".ts", "");
    if (!EXPECTED_RULES.includes(ruleName)) {
      findings.extra.push(ruleName);
      findings.issues.push({
        type: "info",
        message: `Unexpected ESLint rule file found: ${ruleName}.ts`,
      });
    }
  }

  return findings;
}

/**
 * Verify Guard Rules alignment
 */
function verifyGuardRules() {
  const findings = {
    documentExists: false,
    issues: [],
    references: {
      authorityContracts: [],
      lockDocuments: [],
    },
  };

  // Guard Rules may be in multiple locations - check common patterns
  const guardRulesFiles = [
    join(ARCHITECTURE_DIR, "TUI_CURSOR_GUARD_RULES.md"),
    join(ROOT_DIR, ".cursor", "rules", "block-and-scope-rules.mdc"),
    join(ROOT_DIR, ".cursor", "rules", "component-lifecycle.mdc"),
    join(ROOT_DIR, ".cursor", "rules", "COMPONENT_CREATION_AND_REFACTOR_CHECKLIST.mdc"),
    join(ROOT_DIR, ".cursor", "rules", "user-rules.mdc"),
    join(ROOT_DIR, "rules", "block-and-scope-rules.mdc"), // Fallback for old location
    join(ROOT_DIR, "rules", "component-lifecycle.mdc"), // Fallback for old location
  ];

  let guardRulesFile = null;
  let content = null;
  let foundFiles = [];

  for (const file of guardRulesFiles) {
    const fileContent = readFile(file);
    if (fileContent) {
      foundFiles.push(file);
      // Use the first found file as primary, but collect all for reference
      if (!content) {
        guardRulesFile = file;
        content = fileContent;
      }
    }
  }

  if (!content) {
    findings.issues.push({
      type: "warning",
      message: "Guard Rules document not found in expected locations.",
    });
    // Don't return - continue with other checks
    return findings;
  }

  findings.documentExists = true;
  findings.foundFiles = foundFiles; // Store all found files for reference

  // Check for Authority Contract references
  const authorityPattern = /AUTHORITY.*CONTRACT|Authority Contract/gi;
  const authorityMatches = content.match(authorityPattern);
  if (authorityMatches) {
    findings.references.authorityContracts = [...new Set(authorityMatches)];
  }

  // Check for Lock document references
  const lockPattern = /FINAL_FOUNDATION_LOCK|UI_ARCHITECTURE_LOCK|Lock document/gi;
  const lockMatches = content.match(lockPattern);
  if (lockMatches) {
    findings.references.lockDocuments = [...new Set(lockMatches)];
  }

  // Check for Foundation Enforcement references
  if (!content.includes("Foundation Enforcement") && !content.includes("FOUNDATION_ENFORCEMENT")) {
    findings.issues.push({
      type: "warning",
      message: "Guard Rules may not reference Foundation Enforcement",
    });
  }

  return findings;
}

/**
 * Verify Authority Contract compliance
 */
function verifyAuthorityContracts() {
  const findings = {
    authorityMapExists: false,
    issues: [],
    authorities: [],
  };

  // Check for AUTHORITY_NAVIGATION.md (the actual file name)
  const authorityMapFile = join(ARCHITECTURE_DIR, "AUTHORITY_NAVIGATION.md");
  let content = readFile(authorityMapFile);

  // Fallback to AUTHORITY_MAP.md if AUTHORITY_NAVIGATION.md doesn't exist
  if (!content) {
    const fallbackFile = join(ARCHITECTURE_DIR, "AUTHORITY_MAP.md");
    content = readFile(fallbackFile);
    if (!content) {
      findings.issues.push({
        type: "error",
        message: "Authority Map not found: AUTHORITY_NAVIGATION.md or AUTHORITY_MAP.md",
      });
      return findings;
    }
  }

  findings.authorityMapExists = true;

  // Extract authority references
  const authorityPattern = /\[([^\]]+_AUTHORITY[^\]]+)\]\([^)]+\)/g;
  let match;
  while ((match = authorityPattern.exec(content)) !== null) {
    findings.authorities.push(match[1]);
  }

  // Check for LOCKED status
  if (!content.includes("LOCKED") && !content.includes("IMMUTABLE")) {
    findings.issues.push({
      type: "warning",
      message: "Authority Map may not indicate LOCKED status for Foundation Authorities",
    });
  }

  return findings;
}

/**
 * Verify Lock document compliance
 */
function verifyLockDocuments() {
  const findings = {
    foundationLockExists: false,
    architectureLockExists: false,
    issues: [],
  };

  // Check for actual lock file names
  const foundationLockFile = join(ARCHITECTURE_DIR, "FOUNDATION_LOCK.md");
  const architectureLockFile = join(ARCHITECTURE_DIR, "ARCHITECTURE_LOCK.md");

  // Also check alternative names
  const foundationLockFiles = [
    foundationLockFile,
    join(ARCHITECTURE_DIR, "FINAL_FOUNDATION_LOCK.md"),
  ];
  const architectureLockFiles = [
    architectureLockFile,
    join(ARCHITECTURE_DIR, "UI_ARCHITECTURE_LOCK.md"),
  ];

  let foundationContent = null;
  let architectureContent = null;

  for (const file of foundationLockFiles) {
    const content = readFile(file);
    if (content) {
      foundationContent = content;
      break;
    }
  }

  for (const file of architectureLockFiles) {
    const content = readFile(file);
    if (content) {
      architectureContent = content;
      break;
    }
  }

  if (!foundationContent) {
    findings.issues.push({
      type: "error",
      message: "Foundation Lock document not found: FOUNDATION_LOCK.md",
    });
  } else {
    findings.foundationLockExists = true;

    // Check for Foundation Enforcement status
    if (!foundationContent.includes("LOCKED") && !foundationContent.includes("APPLIED")) {
      findings.issues.push({
        type: "warning",
        message: "Foundation Lock may not indicate LOCKED/APPLIED status",
      });
    }
  }

  if (!architectureContent) {
    findings.issues.push({
      type: "error",
      message: "Architecture Lock document not found: ARCHITECTURE_LOCK.md",
    });
  } else {
    findings.architectureLockExists = true;
  }

  return findings;
}

/**
 * Verify ESLint configuration
 */
function verifyESLintConfig() {
  const findings = {
    configExists: false,
    issues: [],
    rulesEnabled: [],
  };

  const configFile = join(ROOT_DIR, "eslint.config.mjs");
  const content = readFile(configFile);

  if (!content) {
    findings.issues.push({
      type: "error",
      message: "ESLint configuration not found: eslint.config.mjs",
    });
    return findings;
  }

  findings.configExists = true;

  // Check if custom rules are enabled
  for (const ruleName of EXPECTED_RULES) {
    const rulePattern = new RegExp(`["']tenerife-ui-architecture/${ruleName}["']`, "g");
    if (rulePattern.test(content)) {
      findings.rulesEnabled.push(ruleName);
    } else {
      findings.issues.push({
        type: "warning",
        message: `ESLint rule may not be enabled in config: ${ruleName}`,
      });
    }
  }

  return findings;
}

/**
 * Generate review report
 */
function generateReport(findings) {
  const date = new Date().toISOString().split("T")[0];
  const reportDate = date;

  // Calculate governance score
  let score = 10;
  const criticalIssues = findings.eslint.issues.filter((i) => i.type === "error").length;
  const warnings = findings.eslint.issues.filter((i) => i.type === "warning").length;
  const guardIssues = findings.guardRules.issues.filter((i) => i.type === "error").length;
  const authorityIssues = findings.authority.issues.filter((i) => i.type === "error").length;
  const lockIssues = findings.locks.issues.filter((i) => i.type === "error").length;

  score -= criticalIssues * 2; // Critical issues reduce score by 2
  score -= warnings * 0.5; // Warnings reduce score by 0.5
  score -= guardIssues * 1;
  score -= authorityIssues * 1;
  score -= lockIssues * 1;

  score = Math.max(0, Math.min(10, Math.round(score * 10) / 10)); // Clamp to 0-10, 1 decimal

  const status =
    score >= 9 ? "✅ Healthy" : score >= 7 ? "⚠️ Needs Attention" : "❌ Critical Issues";

  let report = `# Governance Review Report

**Review Date:** ${reportDate}  
**Reviewer:** Automated Script  
**Review Type:** Automated  
**Status:** ${status}

---

## Executive Summary

This automated governance review scanned ESLint rules, Guard Rules alignment, Authority Contract compliance, and Lock document compliance.

**Governance Score:** ${score}/10  
**Overall Status:** ${status}

**Key Findings:**
- ESLint Rules: ${findings.eslint.rules.filter((r) => r.status === "active").length}/${EXPECTED_RULES.length} active
- Guard Rules: ${findings.guardRules.documentExists ? "✅ Document exists" : "❌ Document missing"}
- Authority Contracts: ${findings.authority.authorityMapExists ? "✅ Map exists" : "❌ Map missing"}
- Lock Documents: ${findings.locks.foundationLockExists && findings.locks.architectureLockExists ? "✅ Both exist" : "⚠️ Missing documents"}

---

## 1. ESLint Rule Relevance Assessment

### 1.1 Rule Inventory

| Rule Name | Status | File Exists | Exported | Notes |
|-----------|--------|-------------|----------|-------|
`;

  for (const rule of findings.eslint.rules) {
    const status = rule.status === "active" ? "✅ Active" : "❌ Inactive";
    const fileExists = rule.fileExists ? "✅" : "❌";
    const exported = rule.exported ? "✅" : "❌";
    report += `| \`${rule.name}\` | ${status} | ${fileExists} | ${exported} | - |\n`;
  }

  report += `
### 1.2 Issues Found

`;

  if (findings.eslint.issues.length === 0) {
    report += "✅ No issues found.\n\n";
  } else {
    for (const issue of findings.eslint.issues) {
      report += `- **${issue.type.toUpperCase()}**: ${issue.message}\n`;
    }
    report += "\n";
  }

  if (findings.eslint.missing.length > 0) {
    report += `### 1.3 Missing Rules\n\n`;
    for (const rule of findings.eslint.missing) {
      report += `- ❌ ${rule}\n`;
    }
    report += "\n";
  }

  if (findings.eslint.extra.length > 0) {
    report += `### 1.4 Extra Rules\n\n`;
    for (const rule of findings.eslint.extra) {
      report += `- ⚠️ ${rule} (not in expected list)\n`;
    }
    report += "\n";
  }

  report += `---

## 2. Guard Rules Alignment Check

### 2.1 Guard Rules Document Review

`;

  if (findings.guardRules.documentExists) {
    report += `✅ Guard Rules document exists\n\n`;
    report += `**References Found:**\n`;
    report += `- Authority Contracts: ${findings.guardRules.references.authorityContracts.length} references\n`;
    report += `- Lock Documents: ${findings.guardRules.references.lockDocuments.length} references\n\n`;
  } else {
    report += `⚠️ Guard Rules document not found in expected locations (may be in cursor rules)\n\n`;
  }

  if (findings.guardRules.issues.length > 0) {
    report += `### 2.2 Issues Found\n\n`;
    for (const issue of findings.guardRules.issues) {
      report += `- **${issue.type.toUpperCase()}**: ${issue.message}\n`;
    }
    report += "\n";
  }

  report += `---

## 3. Authority Contract Compliance Verification

### 3.1 Authority Map Review

`;

  if (findings.authority.authorityMapExists) {
    report += `✅ Authority Map exists: AUTHORITY_NAVIGATION.md\n\n`;
    report += `**Authorities Found:** ${findings.authority.authorities.length}\n\n`;
  } else {
    report += `❌ Authority Map not found: AUTHORITY_NAVIGATION.md\n\n`;
  }

  if (findings.authority.issues.length > 0) {
    report += `### 3.2 Issues Found\n\n`;
    for (const issue of findings.authority.issues) {
      report += `- **${issue.type.toUpperCase()}**: ${issue.message}\n`;
    }
    report += "\n";
  }

  report += `---

## 4. Lock Document Compliance Check

### 4.1 Lock Documents Review

`;

  if (findings.locks.foundationLockExists) {
    report += `✅ Foundation Lock exists: FOUNDATION_LOCK.md\n\n`;
  } else {
    report += `❌ Foundation Lock not found: FOUNDATION_LOCK.md\n\n`;
  }

  if (findings.locks.architectureLockExists) {
    report += `✅ Architecture Lock exists: ARCHITECTURE_LOCK.md\n\n`;
  } else {
    report += `❌ Architecture Lock not found: ARCHITECTURE_LOCK.md\n\n`;
  }

  if (findings.locks.issues.length > 0) {
    report += `### 4.2 Issues Found\n\n`;
    for (const issue of findings.locks.issues) {
      report += `- **${issue.type.toUpperCase()}**: ${issue.message}\n`;
    }
    report += "\n";
  }

  report += `---

## 5. Enforcement Mechanism Health

### 5.1 ESLint Configuration

`;

  if (findings.eslintConfig.configExists) {
    report += `✅ ESLint configuration exists: eslint.config.mjs\n\n`;
    report += `**Rules Enabled:** ${findings.eslintConfig.rulesEnabled.length}/${EXPECTED_RULES.length}\n\n`;
  } else {
    report += `❌ ESLint configuration not found\n\n`;
  }

  if (findings.eslintConfig.issues.length > 0) {
    report += `### 5.2 Issues Found\n\n`;
    for (const issue of findings.eslintConfig.issues) {
      report += `- **${issue.type.toUpperCase()}**: ${issue.message}\n`;
    }
    report += "\n";
  }

  report += `---

## 6. Findings and Recommendations

### 6.1 Critical Issues

`;

  const allCriticalIssues = [
    ...findings.eslint.issues.filter((i) => i.type === "error"),
    ...findings.guardRules.issues.filter((i) => i.type === "error"),
    ...findings.authority.issues.filter((i) => i.type === "error"),
    ...findings.locks.issues.filter((i) => i.type === "error"),
  ];

  if (allCriticalIssues.length === 0) {
    report += "✅ No critical issues found.\n\n";
  } else {
    for (const issue of allCriticalIssues) {
      report += `- ❌ ${issue.message}\n`;
    }
    report += "\n";
  }

  report += `### 6.2 Warnings

`;

  const allWarnings = [
    ...findings.eslint.issues.filter((i) => i.type === "warning"),
    ...findings.guardRules.issues.filter((i) => i.type === "warning"),
    ...findings.authority.issues.filter((i) => i.type === "warning"),
    ...findings.locks.issues.filter((i) => i.type === "warning"),
  ];

  if (allWarnings.length === 0) {
    report += "✅ No warnings.\n\n";
  } else {
    for (const issue of allWarnings) {
      report += `- ⚠️ ${issue.message}\n`;
    }
    report += "\n";
  }

  report += `---

## 7. Next Review

**Scheduled Review Date:** [To be determined]  
**Review Frequency:** Quarterly (recommended)

---

**Document Status:** ✅ Complete  
**Last Updated:** ${reportDate}  
**Generated By:** Automated Governance Review Script

`;

  return { report, score, hasCriticalIssues: allCriticalIssues.length > 0 };
}

/**
 * Main execution
 */
function main() {
  console.log("=".repeat(70));
  console.log("🔍 GOVERNANCE REVIEW");
  console.log("=".repeat(70));
  console.log("\n📋 Назначение:");
  console.log("   Проводит комплексную проверку governance проекта:");
  console.log("   - Сканирует ESLint правила и их соответствие");
  console.log("   - Проверяет соответствие Guard Rules");
  console.log("   - Верифицирует Authority Contract compliance");
  console.log("   - Проверяет Lock документы");
  console.log("   - Верифицирует конфигурацию ESLint\n");

  // Ensure output directories exist
  if (!existsSync(REVIEWS_DIR)) {
    mkdirSync(REVIEWS_DIR, { recursive: true });
    console.log(`📁 Создана директория: ${REVIEWS_DIR}`);
  }
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`📁 Создана директория: ${OUTPUT_DIR}`);
  }

  // Run all checks
  console.log("=".repeat(70));
  console.log("🔎 ВЫПОЛНЕНИЕ ПРОВЕРОК:");
  console.log("=".repeat(70));

  console.log("\n1️⃣  Сканирование ESLint правил...");
  const eslintFindings = scanESLintRules();
  const activeRules = eslintFindings.rules.filter((r) => r.status === "active").length;
  console.log(`   ✓ Активных правил: ${activeRules}/${EXPECTED_RULES.length}`);
  console.log(
    `   ${eslintFindings.issues.length > 0 ? "⚠️" : "✓"} Проблем: ${eslintFindings.issues.length}`,
  );

  console.log("\n2️⃣  Проверка Guard Rules alignment...");
  const guardRulesFindings = verifyGuardRules();
  console.log(
    `   ${guardRulesFindings.documentExists ? "✓" : "❌"} Документ найден: ${guardRulesFindings.documentExists ? "Да" : "Нет"}`,
  );
  if (guardRulesFindings.documentExists && guardRulesFindings.foundFiles) {
    console.log(`   📁 Найдено файлов: ${guardRulesFindings.foundFiles.length}`);
    guardRulesFindings.foundFiles.forEach((file) => {
      const relativePath = relative(ROOT_DIR, file);
      console.log(`      • ${relativePath}`);
    });
  }
  console.log(
    `   ${guardRulesFindings.issues.length > 0 ? "⚠️" : "✓"} Проблем: ${guardRulesFindings.issues.length}`,
  );

  console.log("\n3️⃣  Проверка Authority Contract compliance...");
  const authorityFindings = verifyAuthorityContracts();
  console.log(
    `   ${authorityFindings.authorityMapExists ? "✓" : "❌"} Authority Map найден: ${authorityFindings.authorityMapExists ? "Да" : "Нет"}`,
  );
  console.log(`   ✓ Найдено Authority: ${authorityFindings.authorities.length}`);
  console.log(
    `   ${authorityFindings.issues.length > 0 ? "⚠️" : "✓"} Проблем: ${authorityFindings.issues.length}`,
  );

  console.log("\n4️⃣  Проверка Lock документов...");
  const lockFindings = verifyLockDocuments();
  console.log(
    `   ${lockFindings.foundationLockExists ? "✓" : "❌"} Foundation Lock: ${lockFindings.foundationLockExists ? "Найден" : "Не найден"}`,
  );
  console.log(
    `   ${lockFindings.architectureLockExists ? "✓" : "❌"} Architecture Lock: ${lockFindings.architectureLockExists ? "Найден" : "Не найден"}`,
  );
  console.log(
    `   ${lockFindings.issues.length > 0 ? "⚠️" : "✓"} Проблем: ${lockFindings.issues.length}`,
  );

  console.log("\n5️⃣  Проверка конфигурации ESLint...");
  const eslintConfigFindings = verifyESLintConfig();
  console.log(
    `   ${eslintConfigFindings.configExists ? "✓" : "❌"} Конфигурация найдена: ${eslintConfigFindings.configExists ? "Да" : "Нет"}`,
  );
  console.log(
    `   ✓ Включено правил: ${eslintConfigFindings.rulesEnabled.length}/${EXPECTED_RULES.length}`,
  );
  console.log(
    `   ${eslintConfigFindings.issues.length > 0 ? "⚠️" : "✓"} Проблем: ${eslintConfigFindings.issues.length}`,
  );

  // Compile findings
  const findings = {
    eslint: eslintFindings,
    guardRules: guardRulesFindings,
    authority: authorityFindings,
    locks: lockFindings,
    eslintConfig: eslintConfigFindings,
  };

  // Generate report
  console.log("\n" + "=".repeat(70));
  console.log("📝 ГЕНЕРАЦИЯ ОТЧЕТА:");
  console.log("=".repeat(70));
  const { report, score, hasCriticalIssues } = generateReport(findings);

  // Write report
  const date = new Date().toISOString().split("T")[0];
  const reportPath = join(REVIEWS_DIR, `GOVERNANCE_REVIEW_${date}.md`);
  writeFileSync(reportPath, report, "utf-8");

  // Also write to artifacts
  const artifactPath = join(OUTPUT_DIR, `governance-review-${date}.md`);
  writeFileSync(artifactPath, report, "utf-8");

  console.log(`\n✅ ОТЧЕТ СОЗДАН:`);
  console.log(`   📄 ${relative(ROOT_DIR, reportPath)}`);
  console.log(`   📄 ${relative(ROOT_DIR, artifactPath)}\n`);

  console.log("=".repeat(70));
  console.log("📊 ИТОГОВЫЕ РЕЗУЛЬТАТЫ:");
  console.log("=".repeat(70));
  console.log(`\n🎯 Governance Score: ${score}/10`);

  const status =
    score >= 9 ? "✅ Healthy" : score >= 7 ? "⚠️ Needs Attention" : "❌ Critical Issues";
  console.log(`📊 Статус: ${status}\n`);

  // Count issues
  const totalErrors =
    findings.eslint.issues.filter((i) => i.type === "error").length +
    findings.guardRules.issues.filter((i) => i.type === "error").length +
    findings.authority.issues.filter((i) => i.type === "error").length +
    findings.locks.issues.filter((i) => i.type === "error").length;

  const totalWarnings =
    findings.eslint.issues.filter((i) => i.type === "warning").length +
    findings.guardRules.issues.filter((i) => i.type === "warning").length +
    findings.authority.issues.filter((i) => i.type === "warning").length +
    findings.locks.issues.filter((i) => i.type === "warning").length;

  console.log(`📋 Критических проблем: ${totalErrors}`);
  console.log(`⚠️  Предупреждений: ${totalWarnings}\n`);

  if (hasCriticalIssues) {
    console.log("❌ Обнаружены критические проблемы. Пожалуйста, проверьте отчет.");
    console.log("=".repeat(70));
    process.exit(1);
  } else {
    console.log("✅ Критических проблем не обнаружено.");
    console.log("=".repeat(70));
    process.exit(0);
  }
}

main();
