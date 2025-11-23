#!/bin/bash

# NPM Token Verification Script
# Checks NPM_TOKEN configuration for semantic-release pipeline

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 NPM Token Configuration Verification${NC}"
echo ""

ERRORS=0
WARNINGS=0

# Check 1: Verify workflow file exists and references NPM_TOKEN
echo -e "${BLUE}📋 Check 1: Workflow configuration...${NC}"
if [ ! -f ".github/workflows/release.yml" ]; then
  echo -e "${RED}❌ FAIL: Release workflow file not found${NC}"
  ERRORS=$((ERRORS + 1))
else
  if grep -q "NPM_TOKEN.*secrets.NPM_TOKEN" .github/workflows/release.yml; then
    echo -e "${GREEN}✅ PASS: Workflow references NPM_TOKEN correctly${NC}"
  else
    echo -e "${RED}❌ FAIL: Workflow does not reference NPM_TOKEN${NC}"
    ERRORS=$((ERRORS + 1))
  fi
fi

# Check 2: Verify package.json publishConfig
echo -e "${BLUE}📋 Check 2: Package.json publishConfig...${NC}"
if grep -q '"publishConfig"' package.json && grep -E -q '"access":\s*"public"' package.json; then
  echo -e "${GREEN}✅ PASS: publishConfig.access is set to 'public'${NC}"
else
  echo -e "${RED}❌ FAIL: publishConfig.access not set to 'public'${NC}"
  ERRORS=$((ERRORS + 1))
fi

# Check 3: Verify package name and scope
echo -e "${BLUE}📋 Check 3: Package name and scope...${NC}"
PACKAGE_NAME=$(grep -E -o '"name":\s*"[^"]*"' package.json | cut -d'"' -f4)
if [[ "$PACKAGE_NAME" == @*/* ]]; then
  SCOPE=$(echo "$PACKAGE_NAME" | cut -d'/' -f1 | cut -d'@' -f2)
  echo -e "${GREEN}✅ PASS: Package uses scoped name: $PACKAGE_NAME${NC}"
  echo -e "${YELLOW}   Scope: @$SCOPE${NC}"
  echo -e "${YELLOW}   ⚠️  Verify you have access to publish to @$SCOPE scope${NC}"
  WARNINGS=$((WARNINGS + 1))
else
  echo -e "${GREEN}✅ PASS: Package name: $PACKAGE_NAME${NC}"
fi

# Check 4: Verify release.config.cjs exists and uses npm plugin
echo -e "${BLUE}📋 Check 4: Semantic-release configuration...${NC}"
if [ ! -f "release.config.cjs" ]; then
  echo -e "${RED}❌ FAIL: release.config.cjs not found${NC}"
  ERRORS=$((ERRORS + 1))
else
  if grep -q "@semantic-release/npm" release.config.cjs; then
    if grep -q "npmPublish.*true" release.config.cjs; then
      echo -e "${GREEN}✅ PASS: Semantic-release configured with npm publish enabled${NC}"
    else
      echo -e "${YELLOW}⚠️  WARNING: npmPublish may not be explicitly set to true${NC}"
      WARNINGS=$((WARNINGS + 1))
    fi
  else
    echo -e "${RED}❌ FAIL: @semantic-release/npm plugin not found in config${NC}"
    ERRORS=$((ERRORS + 1))
  fi
fi

# Check 5: Verify npm scope access (if token is available)
echo -e "${BLUE}📋 Check 5: NPM scope access...${NC}"
if [ -n "$NPM_TOKEN" ]; then
  echo -e "${YELLOW}   NPM_TOKEN environment variable is set${NC}"
  echo -e "${YELLOW}   Testing npm authentication...${NC}"
  
  # Test npm whoami
  if npm whoami --registry=https://registry.npmjs.org/ > /dev/null 2>&1; then
    USERNAME=$(npm whoami --registry=https://registry.npmjs.org/)
    echo -e "${GREEN}✅ PASS: Authenticated as $USERNAME${NC}"
    
    # Test scope access
    if [[ "$PACKAGE_NAME" == @*/* ]]; then
      SCOPE=$(echo "$PACKAGE_NAME" | cut -d'/' -f1 | cut -d'@' -f2)
      if npm access ls-packages "@$SCOPE" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ PASS: Have access to @$SCOPE scope${NC}"
      else
        echo -e "${RED}❌ FAIL: No access to @$SCOPE scope${NC}"
        echo -e "${YELLOW}   You may need to create the organization or request access${NC}"
        ERRORS=$((ERRORS + 1))
      fi
    fi
  else
    echo -e "${RED}❌ FAIL: npm authentication failed${NC}"
    echo -e "${YELLOW}   Verify NPM_TOKEN is valid and not expired${NC}"
    ERRORS=$((ERRORS + 1))
  fi
else
  echo -e "${YELLOW}⚠️  WARNING: NPM_TOKEN environment variable not set${NC}"
  echo -e "${YELLOW}   This is expected if running locally without token${NC}"
  echo -e "${YELLOW}   Token will be available in GitHub Actions from secrets${NC}"
  WARNINGS=$((WARNINGS + 1))
fi

# Check 6: Verify GitHub Secrets setup (manual check reminder)
echo -e "${BLUE}📋 Check 6: GitHub Secrets setup...${NC}"
echo -e "${YELLOW}   Manual verification required:${NC}"
echo -e "${YELLOW}   1. Go to: https://github.com/Tureckiy-zart/tenerife-ui/settings/secrets/actions${NC}"
echo -e "${YELLOW}   2. Verify 'NPM_TOKEN' exists in secrets list${NC}"
echo -e "${YELLOW}   3. Verify token name is exactly 'NPM_TOKEN' (case-sensitive)${NC}"
echo -e "${YELLOW}   4. Token should start with 'npm_' prefix${NC}"
WARNINGS=$((WARNINGS + 1))

# Summary
echo ""
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo -e "${GREEN}✅ All checks passed!${NC}"
  exit 0
elif [ $ERRORS -eq 0 ]; then
  echo -e "${GREEN}✅ All critical checks passed!${NC}"
  echo -e "${YELLOW}⚠️  $WARNINGS warning(s) - manual verification recommended${NC}"
  exit 0
else
  echo -e "${RED}❌ Verification failed with $ERRORS error(s)${NC}"
  if [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠️  $WARNINGS warning(s)${NC}"
  fi
  exit 1
fi

