#!/bin/bash
# NPM Publish Validation Script
# Validates package.json structure, files field, and performs dry-run publish test
# Exit code: 0 on success, 1 on failure

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 Validating NPM publish configuration...${NC}"
echo ""

# Check if package.json exists
if [ ! -f "package.json" ]; then
  echo -e "${RED}❌ ERROR: package.json not found${NC}"
  exit 1
fi

# Read package.json
PACKAGE_NAME=$(node -p "require('./package.json').name")
PACKAGE_VERSION=$(node -p "require('./package.json').version")
PACKAGE_FILES=$(node -p "JSON.stringify(require('./package.json').files || [])")

echo -e "${YELLOW}📦 Package: ${PACKAGE_NAME}${NC}"
echo -e "${YELLOW}📌 Version: ${PACKAGE_VERSION}${NC}"
echo ""

# Validate package name
if [[ ! "$PACKAGE_NAME" =~ ^@tenerife\.music/ ]]; then
  echo -e "${RED}❌ ERROR: Package name must start with '@tenerife.music/'${NC}"
  echo "   Current name: ${PACKAGE_NAME}"
  exit 1
fi
echo -e "${GREEN}✅ Package name is valid${NC}"

# Validate files field
if [ "$PACKAGE_FILES" == "null" ] || [ "$PACKAGE_FILES" == "[]" ]; then
  echo -e "${RED}❌ ERROR: 'files' field is missing or empty in package.json${NC}"
  echo "   Add 'files' field to specify what to publish (e.g., ['dist'])"
  exit 1
fi

# Check if 'dist' is in files array
if ! echo "$PACKAGE_FILES" | grep -q "dist"; then
  echo -e "${YELLOW}⚠️  WARNING: 'dist' directory not found in files array${NC}"
  echo "   Files field: ${PACKAGE_FILES}"
  echo "   Make sure 'dist' is included if you want to publish built files"
else
  echo -e "${GREEN}✅ 'dist' directory is included in files array${NC}"
fi

# Check if dist directory exists
if [ ! -d "dist" ]; then
  echo -e "${YELLOW}⚠️  WARNING: 'dist' directory does not exist${NC}"
  echo "   Run 'pnpm build' before publishing"
else
  echo -e "${GREEN}✅ 'dist' directory exists${NC}"
fi

echo ""

# Validate NPM_TOKEN
if [ -z "${NPM_TOKEN:-}" ]; then
  echo -e "${RED}❌ ERROR: NPM_TOKEN environment variable is not set${NC}"
  echo "   Please set NPM_TOKEN secret in GitHub Actions"
  exit 1
fi

# Validate NPM_TOKEN format (granular tokens start with 'npm_')
if [[ ! "$NPM_TOKEN" =~ ^npm_ ]]; then
  echo -e "${YELLOW}⚠️  WARNING: NPM_TOKEN format may be incorrect${NC}"
  echo "   Granular tokens should start with 'npm_'"
  echo "   Token prefix: ${NPM_TOKEN:0:10}..."
else
  echo -e "${GREEN}✅ NPM_TOKEN format is valid${NC}"
fi

echo ""

# Configure npm authentication
echo -e "${YELLOW}🔐 Configuring npm authentication...${NC}"
echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc
echo "@tenerife.music:registry=https://registry.npmjs.org/" >> ~/.npmrc
echo -e "${GREEN}✅ npm authentication configured${NC}"
echo ""

# Test npm authentication with dry-run publish
echo -e "${YELLOW}🧪 Testing npm publish (dry-run)...${NC}"
if npm publish --dry-run --access public; then
  echo -e "${GREEN}✅ Dry-run publish test passed${NC}"
else
  echo -e "${RED}❌ ERROR: Dry-run publish test failed${NC}"
  echo "   Possible issues:"
  echo "   - Token is invalid or expired"
  echo "   - Token doesn't have publish permissions"
  echo "   - Package name conflicts with existing package"
  exit 1
fi

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ NPM publish validation complete!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
