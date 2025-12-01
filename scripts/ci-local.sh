#!/bin/bash
set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Local CI starting...${NC}"
echo ""

# Step 1: Clean
echo -e "${YELLOW}📦 Step 1/7: Cleaning build directory...${NC}"
pnpm clean
echo -e "${GREEN}✅ Clean completed${NC}"
echo ""

# Step 2: Install
echo -e "${YELLOW}📦 Step 2/7: Installing dependencies...${NC}"
pnpm install --frozen-lockfile
echo -e "${GREEN}✅ Install completed${NC}"
echo ""

# Step 3: Lint check
echo -e "${YELLOW}🔍 Step 3/7: Running lint checks...${NC}"
if ! pnpm lint:check; then
  echo -e "${RED}❌ Lint check failed${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Lint check passed${NC}"
echo ""

# Step 4: Format check
echo -e "${YELLOW}💅 Step 4/7: Running format checks...${NC}"
if ! pnpm format:check; then
  echo -e "${RED}❌ Format check failed${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Format check passed${NC}"
echo ""

# Step 5: Typecheck
echo -e "${YELLOW}🔷 Step 5/7: Running type checks...${NC}"
if ! pnpm typecheck; then
  echo -e "${RED}❌ Type check failed${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Type check passed${NC}"
echo ""

# Step 6: Build
echo -e "${YELLOW}🏗️  Step 6/7: Building library...${NC}"
if ! pnpm build; then
  echo -e "${RED}❌ Build failed${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Build completed${NC}"
echo ""

# Step 7: Storybook build
echo -e "${YELLOW}📚 Step 7/7: Building Storybook...${NC}"
if ! pnpm build-storybook; then
  echo -e "${RED}❌ Storybook build failed${NC}"
  exit 1
fi
echo -e "${GREEN}✅ Storybook build completed${NC}"
echo ""

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Local CI passed successfully!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
