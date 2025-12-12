#!/bin/bash
# Local Lint Script for Tenerife UI
# Performs auto-fix for ESLint and Prettier (for local development only)
# This script is NOT used in CI - CI uses lint-ci.sh (check-only mode)

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 Running Local Lint Auto-Fix...${NC}"
echo ""
echo "⚠️  This script will modify your files!"
echo "   Make sure you have committed your changes or are using version control."
echo ""

# Check if we're in CI environment
if [ -n "${CI:-}" ]; then
  echo -e "${RED}❌ Error: This script should not be run in CI environment${NC}"
  echo "   CI uses lint-ci.sh (check-only mode)"
  exit 1
fi

# === ESLINT AUTO-FIX ===
echo -e "${YELLOW}📋 Running ESLint auto-fix...${NC}"
if pnpm eslint . --ext .ts,.tsx --fix --ignore-pattern '**/*.stories.*' --ignore-pattern '.storybook/**' --ignore-pattern 'storybook-static/**' --ignore-pattern 'docs/**' --ignore-pattern '.cursor/**'; then
  echo -e "${GREEN}✅ ESLint auto-fix completed${NC}"
else
  echo -e "${RED}❌ ESLint auto-fix failed${NC}"
  exit 1
fi

echo ""

# === PRETTIER AUTO-FIX ===
echo -e "${YELLOW}💅 Running Prettier auto-fix...${NC}"
if pnpm prettier --write .; then
  echo -e "${GREEN}✅ Prettier auto-fix completed${NC}"
else
  echo -e "${RED}❌ Prettier auto-fix failed${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}✅ All auto-fixes completed!${NC}"
echo ""
echo "📝 Next steps:"
echo "   1. Review the changes: git diff"
echo "   2. Stage the fixes: git add ."
echo "   3. Commit: git commit -m 'chore: auto-fix linting and formatting'"
echo ""

exit 0

