#!/bin/bash

# Release Publish Script
# Orchestrates full release flow: check → prepare → build → publish → tag → verify

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$ROOT_DIR"

# Get version from package.json
VERSION=$(node -p "require('./package.json').version")

echo -e "${BLUE}🚀 Starting release process for version ${VERSION}${NC}\n"

# Phase 1: Pre-release validation
echo -e "${BLUE}Phase 1: Pre-release validation${NC}"
node scripts/release-check.js
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Pre-release validation failed. Aborting.${NC}"
  exit 1
fi
echo ""

# Phase 2: Prepare CHANGELOG
echo -e "${BLUE}Phase 2: Preparing CHANGELOG${NC}"
node scripts/release-prepare.js
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ CHANGELOG preparation failed. Aborting.${NC}"
  exit 1
fi
echo ""

# Phase 3: Build and test
echo -e "${BLUE}Phase 3: Building and testing${NC}"
echo "Running: pnpm clean && pnpm build && pnpm typecheck"
pnpm clean && pnpm build && pnpm typecheck
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ Build or typecheck failed. Aborting.${NC}"
  echo -e "${YELLOW}Note: CHANGELOG has been modified. You may want to revert it.${NC}"
  exit 1
fi
echo ""

# Phase 4: Publish to npm
echo -e "${BLUE}Phase 4: Publishing to npm${NC}"
echo "Running: npm publish --access public"
npm publish --access public
if [ $? -ne 0 ]; then
  echo -e "${RED}❌ npm publish failed.${NC}"
  echo -e "${YELLOW}Note: CHANGELOG has been modified. You may want to revert it.${NC}"
  exit 1
fi
echo ""

# Phase 5: Update CHANGELOG date
echo -e "${BLUE}Phase 5: Updating CHANGELOG date${NC}"
# Fetch npm publish date
NPM_DATE=$(node -e "
  const { execSync } = require('child_process');
  try {
    const output = execSync('npm view @tenerife.music/ui@${VERSION} time --json', { encoding: 'utf8' });
    const timeData = JSON.parse(output);
    const dateStr = timeData['${VERSION}'];
    if (dateStr) {
      const date = new Date(dateStr);
      console.log(date.toISOString().split('T')[0]);
    } else {
      console.log('');
    }
  } catch (e) {
    console.log('');
  }
")

if [ -z "$NPM_DATE" ]; then
  echo -e "${YELLOW}⚠️  Could not fetch npm publish date. Please update CHANGELOG manually.${NC}"
else
  # Update CHANGELOG date
  sed -i.bak "s/^## \[${VERSION}\]$/## [${VERSION}] - ${NPM_DATE}/" CHANGELOG.md
  rm -f CHANGELOG.md.bak
  echo -e "${GREEN}✅ Updated CHANGELOG date to ${NPM_DATE}${NC}"
  
  # Commit CHANGELOG update
  if [ -n "$(git status --porcelain CHANGELOG.md)" ]; then
    git add CHANGELOG.md
    git commit -m "chore: update CHANGELOG date for ${VERSION}" || {
      echo -e "${YELLOW}⚠️  Failed to commit CHANGELOG update. Please commit manually.${NC}"
    }
  fi
fi
echo ""

# Phase 6: Create git tag
echo -e "${BLUE}Phase 6: Creating git tag${NC}"
if git rev-parse -q --verify "v${VERSION}" > /dev/null; then
  echo -e "${YELLOW}⚠️  Git tag v${VERSION} already exists. Skipping tag creation.${NC}"
else
  git tag -a "v${VERSION}" -m "Release v${VERSION}"
  if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to create git tag.${NC}"
    echo -e "${YELLOW}You can create it manually with: git tag -a v${VERSION} -m 'Release v${VERSION}'${NC}"
  else
    echo -e "${GREEN}✅ Created git tag v${VERSION}${NC}"
  fi
fi
echo ""

# Phase 7: Push git tag
echo -e "${BLUE}Phase 7: Pushing git tag${NC}"
if git ls-remote --tags origin "v${VERSION}" | grep -q "v${VERSION}"; then
  echo -e "${YELLOW}⚠️  Git tag v${VERSION} already exists remotely. Skipping push.${NC}"
else
  git push origin "v${VERSION}"
  if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to push git tag.${NC}"
    echo -e "${YELLOW}You can push it manually with: git push origin v${VERSION}${NC}"
  else
    echo -e "${GREEN}✅ Pushed git tag v${VERSION} to origin${NC}"
  fi
fi
echo ""

# Phase 8: Post-release verification
echo -e "${BLUE}Phase 8: Post-release verification${NC}"
node scripts/release-verify.js
VERIFY_EXIT=$?
if [ $VERIFY_EXIT -ne 0 ]; then
  echo -e "${YELLOW}⚠️  Post-release verification found issues. Please review above.${NC}"
  exit $VERIFY_EXIT
fi
echo ""

# Success
echo -e "${GREEN}🎉 Release ${VERSION} completed successfully!${NC}"
echo -e "${GREEN}Package URL: https://www.npmjs.com/package/@tenerife.music/ui${NC}"

