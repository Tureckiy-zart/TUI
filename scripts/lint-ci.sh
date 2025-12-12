#!/bin/bash
# CI Lint Script for Tenerife UI
# Performs strict ESLint and Prettier checks, generates report
# Exit code: 0 on success, 1 on failure
# NOTE: This script does NOT auto-fix issues (check-only mode)

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Report file
REPORT_DIR="artifacts"
REPORT_FILE="${REPORT_DIR}/lint-report.md"
PRETTIER_LOG="${REPORT_DIR}/prettier.log"
PRETTIER_DIFF_LOG="${REPORT_DIR}/prettier-diff.log"
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M:%S UTC")

# Create artifacts directory if it doesn't exist
mkdir -p "${REPORT_DIR}"

# Initialize report
{
  echo "# Lint Report"
  echo ""
  echo "**Generated:** ${TIMESTAMP}"
  echo ""
  echo "---"
  echo ""
} > "${REPORT_FILE}"

# Track errors and warnings (initialize as integers)
ESLINT_ERRORS=0
ESLINT_WARNINGS=0
PRETTIER_ERRORS=0
EXIT_CODE=0

echo "🔍 Running CI Lint Checks (strict mode, no auto-fix)..."
echo ""

# === ESLINT CHECK ===
echo "📋 Running ESLint (strict mode, max-warnings=0)..."
if ESLINT_OUTPUT=$(pnpm eslint . --max-warnings=0 --ignore-pattern '**/*.stories.*' --ignore-pattern '.storybook/**' --ignore-pattern 'storybook-static/**' --ignore-pattern 'docs/**' --ignore-pattern '.cursor/**' 2>&1); then
  # ESLint passed
  {
    echo "## ESLINT ERRORS"
    echo ""
    echo "✅ No ESLint errors or warnings found"
    echo ""
  } >> "${REPORT_FILE}"
  
  echo -e "${GREEN}✅ ESLint check passed${NC}"
else
  # ESLint failed
  ESLINT_EXIT=$?
  EXIT_CODE=1
  
  # Count errors and warnings from output (ensure numeric values)
  ESLINT_ERRORS=$(echo "${ESLINT_OUTPUT}" | grep -oE "[0-9]+ error" | grep -oE "[0-9]+" | head -1)
  ESLINT_WARNINGS=$(echo "${ESLINT_OUTPUT}" | grep -oE "[0-9]+ warning" | grep -oE "[0-9]+" | head -1)
  
  # Ensure variables are numeric (default to 0 if empty)
  ESLINT_ERRORS=${ESLINT_ERRORS:-0}
  ESLINT_WARNINGS=${ESLINT_WARNINGS:-0}
  
  {
    echo "## ESLINT ERRORS"
    echo ""
    echo "❌ ESLint found errors or warnings (strict mode: max-warnings=0)"
    echo ""
    echo "### Error Details"
    echo ""
    echo "\`\`\`"
    echo "${ESLINT_OUTPUT}"
    echo "\`\`\`"
    echo ""
  } >> "${REPORT_FILE}"
  
  echo -e "${RED}❌ ESLint check failed${NC}"
  echo "${ESLINT_OUTPUT}"
fi

echo ""

# === PRETTIER CHECK ===
echo "💅 Running Prettier (check mode)..."
# Run Prettier check and capture output to log file
if ! pnpm prettier --check . 2>&1 | tee "${PRETTIER_LOG}"; then
  # Prettier failed
  PRETTIER_EXIT=$?
  EXIT_CODE=1
  
  # Count files with issues
  PRETTIER_ERRORS=$(grep -c "would reformat" "${PRETTIER_LOG}" 2>/dev/null || echo "0")
  PRETTIER_ERRORS=${PRETTIER_ERRORS:-0}
  
  {
    echo "## PRETTIER ISSUES"
    echo ""
    echo "❌ Prettier found formatting issues"
    echo ""
    echo "### Prettier Output"
    echo ""
    echo "\`\`\`"
    cat "${PRETTIER_LOG}"
    echo "\`\`\`"
    echo ""
  } >> "${REPORT_FILE}"
  
  echo -e "${RED}❌ Prettier check failed${NC}"
else
  # Prettier passed
  {
    echo "## PRETTIER ISSUES"
    echo ""
    echo "✅ No Prettier formatting issues found"
    echo ""
  } >> "${REPORT_FILE}"
  
  echo -e "${GREEN}✅ Prettier check passed${NC}"
fi

echo ""

# === PRETTIER DIFF ===
echo "📊 Generating Prettier diff..."
# Run Prettier in diff mode to show what would change
if ! pnpm prettier --check . --log-level debug 2>&1 | tee "${PRETTIER_DIFF_LOG}"; then
  # Prettier diff shows issues
  {
    echo "## PRETTIER DIFF"
    echo ""
    echo "### Files that would be reformatted:"
    echo ""
    echo "\`\`\`"
    cat "${PRETTIER_DIFF_LOG}"
    echo "\`\`\`"
    echo ""
    echo "> **Note:** Run \`pnpm lint:fix\` locally to auto-fix these issues."
    echo ""
  } >> "${REPORT_FILE}"
else
  {
    echo "## PRETTIER DIFF"
    echo ""
    echo "✅ No formatting differences found"
    echo ""
  } >> "${REPORT_FILE}"
fi

echo ""

# === SUMMARY ===
# Calculate total issues (using proper arithmetic)
TOTAL_ISSUES=$((ESLINT_ERRORS + ESLINT_WARNINGS + PRETTIER_ERRORS))

{
  echo "## SUMMARY"
  echo ""
  echo "| Metric | Count |"
  echo "|--------|-------|"
  echo "| ESLint Errors | ${ESLINT_ERRORS} |"
  echo "| ESLint Warnings | ${ESLINT_WARNINGS} |"
  echo "| Prettier Issues | ${PRETTIER_ERRORS} |"
  echo "| **Total Issues** | **${TOTAL_ISSUES}** |"
  echo ""
  echo "---"
  echo ""
  if [ "${EXIT_CODE}" -eq 0 ]; then
    echo "✅ **Status:** All checks passed"
    echo ""
    echo "**Exit Code:** 0"
  else
    echo "❌ **Status:** Checks failed"
    echo ""
    echo "**Exit Code:** 1"
    echo ""
    echo "### How to Fix"
    echo ""
    echo "1. Run \`pnpm lint:fix\` locally to auto-fix formatting and linting issues"
    echo "2. Review the detailed output above"
    echo "3. Commit the fixes and push again"
  fi
  echo ""
} >> "${REPORT_FILE}"

# Print summary
echo "📊 Summary:"
echo "   • ESLint Errors: ${ESLINT_ERRORS}"
echo "   • ESLint Warnings: ${ESLINT_WARNINGS}"
echo "   • Prettier Issues: ${PRETTIER_ERRORS}"
echo "   • Total Issues: ${TOTAL_ISSUES}"
echo ""
echo "📄 Report saved to: ${REPORT_FILE}"
echo "📄 Prettier log saved to: ${PRETTIER_LOG}"
echo "📄 Prettier diff saved to: ${PRETTIER_DIFF_LOG}"
echo ""

if [ "${EXIT_CODE}" -eq 0 ]; then
  echo -e "${GREEN}✅ All lint checks passed!${NC}"
  exit 0
else
  echo -e "${RED}❌ Lint checks failed. See ${REPORT_FILE} for details.${NC}"
  exit 1
fi
