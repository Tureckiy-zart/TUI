#!/bin/bash
# Chromatic Visual Testing Script
# 
# Usage:
#   ./scripts/chromatic.sh
#   CHROMATIC_PROJECT_TOKEN=your-token ./scripts/chromatic.sh
#
# The script will use CHROMATIC_PROJECT_TOKEN environment variable if set,
# otherwise it will look for .env.local file or prompt for token.

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get token from environment variable, .env.local file, or use default
if [ -z "${CHROMATIC_PROJECT_TOKEN:-}" ]; then
  if [ -f ".env.local" ]; then
    echo -e "${BLUE}📝 Loading token from .env.local...${NC}"
    export CHROMATIC_PROJECT_TOKEN=$(grep "^CHROMATIC_PROJECT_TOKEN=" .env.local | cut -d '=' -f2 | tr -d '"' | tr -d "'" | xargs)
  fi
fi

# Use default token if provided as script argument or environment
# This allows: CHROMATIC_PROJECT_TOKEN=token pnpm chromatic
# Or setting it in .env.local file

# Check if token is set
if [ -z "${CHROMATIC_PROJECT_TOKEN:-}" ]; then
  echo -e "${RED}❌ Error: CHROMATIC_PROJECT_TOKEN is not set${NC}"
  echo -e "${YELLOW}💡 Options:${NC}"
  echo -e "  1. Set environment variable: ${GREEN}export CHROMATIC_PROJECT_TOKEN=your-token${NC}"
  echo -e "  2. Create .env.local file with: ${GREEN}CHROMATIC_PROJECT_TOKEN=your-token${NC}"
  echo -e "  3. Pass as argument: ${GREEN}CHROMATIC_PROJECT_TOKEN=your-token ./scripts/chromatic.sh${NC}"
  exit 1
fi

echo -e "${BLUE}🚀 Starting Chromatic visual testing...${NC}"
echo ""

# Check if CI mode (no --exit-zero-on-changes flag)
# CI mode should fail on errors, local mode should not
if [ "${CHROMATIC_CI_MODE:-}" = "true" ]; then
  echo -e "${YELLOW}ℹ️  Running in CI mode (will fail on errors)${NC}"
  npx chromatic --project-token="${CHROMATIC_PROJECT_TOKEN}"
else
  echo -e "${YELLOW}ℹ️  Running in local mode (--exit-zero-on-changes)${NC}"
  npx chromatic --project-token="${CHROMATIC_PROJECT_TOKEN}" --exit-zero-on-changes
fi

EXIT_CODE=$?

if [ $EXIT_CODE -eq 0 ]; then
  echo ""
  echo -e "${GREEN}✅ Chromatic completed successfully!${NC}"
else
  echo ""
  echo -e "${RED}❌ Chromatic failed with exit code $EXIT_CODE${NC}"
  exit $EXIT_CODE
fi
