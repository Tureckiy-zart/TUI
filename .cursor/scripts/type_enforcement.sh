#!/bin/bash

# TypeScript Type Enforcement Script
# Checks for forbidden patterns and enforces typing standards

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🔷 Running TypeScript Type Enforcement Checks..."

ERRORS=0

# Check 1: Ensure TypeScript strict mode is enabled
echo "📋 Check 1: TypeScript strict mode..."
if ! grep -E -q '"strict":\s*true' tsconfig.json; then
  echo -e "${RED}❌ FAIL: TypeScript strict mode not enabled${NC}"
  ERRORS=$((ERRORS + 1))
else
  echo -e "${GREEN}✅ PASS: TypeScript strict mode enabled${NC}"
fi

# Check 2: Run TypeScript compiler
echo "📋 Check 2: TypeScript compilation..."
if npx tsc --noEmit 2>&1 | grep -q "error TS"; then
  echo -e "${RED}❌ FAIL: TypeScript compilation errors found${NC}"
  npx tsc --noEmit 2>&1 | grep "error TS" | head -10
  ERRORS=$((ERRORS + 1))
else
  echo -e "${GREEN}✅ PASS: TypeScript compilation successful${NC}"
fi

# Check 3: Check for forbidden 'any' types (excluding generic utilities)
echo "📋 Check 3: Checking for 'any' types..."
# Exclude generic utility functions that use constrained any
ANY_COUNT=$(grep -E -r ":\s*any[^[]" src --include="*.ts" --include="*.tsx" | grep -v "T extends" | grep -v "any\[\]" | wc -l || true)
# Allow any[] only in generic utility function constraints
ANY_ARRAY_COUNT=$(grep -E -r ":\s*any\[\]" src --include="*.ts" --include="*.tsx" | grep -v "T extends" | wc -l || true)
ANY_INDEX_COUNT=$(grep -E -r "\[key:\s*string\]:\s*any" src --include="*.ts" --include="*.tsx" | wc -l || true)

if [ "$ANY_COUNT" -gt 0 ] || [ "$ANY_ARRAY_COUNT" -gt 0 ] || [ "$ANY_INDEX_COUNT" -gt 0 ]; then
  echo -e "${RED}❌ FAIL: Found forbidden 'any' types${NC}"
  if [ "$ANY_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}  Found $ANY_COUNT 'any' type(s)${NC}"
    grep -E -r ":\s*any[^[]" src --include="*.ts" --include="*.tsx" | grep -v "T extends" | grep -v "any\[\]" | head -5
  fi
  if [ "$ANY_ARRAY_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}  Found $ANY_ARRAY_COUNT 'any[]' type(s)${NC}"
    grep -E -r ":\s*any\[\]" src --include="*.ts" --include="*.tsx" | grep -v "T extends" | head -5
  fi
  if [ "$ANY_INDEX_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}  Found $ANY_INDEX_COUNT '[key: string]: any' type(s)${NC}"
    grep -E -r "\[key:\s*string\]:\s*any" src --include="*.ts" --include="*.tsx" | head -5
  fi
  ERRORS=$((ERRORS + 1))
else
  echo -e "${GREEN}✅ PASS: No forbidden 'any' types found${NC}"
fi

# Check 4: Check for components without Props interfaces
echo "📋 Check 4: Checking for components without Props interfaces..."
COMPONENTS_WITHOUT_PROPS=$(find src/components -name "*.tsx" -type f ! -name "*.stories.tsx" ! -name "*.test.tsx" | while read file; do
  if grep -q "export.*function\|export.*const.*=" "$file" && ! grep -q "interface.*Props\|type.*Props" "$file"; then
    echo "$file"
  fi
done | wc -l || true)

if [ "$COMPONENTS_WITHOUT_PROPS" -gt 0 ]; then
  echo -e "${YELLOW}⚠️  WARNING: Found $COMPONENTS_WITHOUT_PROPS component(s) that may be missing Props interfaces${NC}"
  echo -e "${YELLOW}   (Manual review recommended)${NC}"
else
  echo -e "${GREEN}✅ PASS: All components appear to have Props interfaces${NC}"
fi

# Check 5: Check for tokens without type unions
echo "📋 Check 5: Checking for tokens without type unions..."
TOKENS_WITHOUT_TYPES=$(find src/tokens -name "*.ts" -type f | while read file; do
  if grep -q "export const" "$file" && ! grep -q "export type.*=.*keyof typeof" "$file"; then
    basename "$file"
  fi
done | wc -l || true)

if [ "$TOKENS_WITHOUT_TYPES" -gt 0 ]; then
  echo -e "${YELLOW}⚠️  WARNING: Found $TOKENS_WITHOUT_TYPES token file(s) that may be missing type unions${NC}"
  echo -e "${YELLOW}   (Manual review recommended)${NC}"
else
  echo -e "${GREEN}✅ PASS: All tokens appear to have type unions${NC}"
fi

# Check 6: Check for tokens without 'as const'
echo "📋 Check 6: Checking for tokens without 'as const'..."
TOKENS_WITHOUT_CONST=$(find src/tokens -name "*.ts" -type f | while read file; do
  if grep -q "export const" "$file" && ! grep -q "as const" "$file"; then
    basename "$file"
  fi
done | wc -l || true)

if [ "$TOKENS_WITHOUT_CONST" -gt 0 ]; then
  echo -e "${YELLOW}⚠️  WARNING: Found $TOKENS_WITHOUT_CONST token file(s) that may be missing 'as const'${NC}"
  echo -e "${YELLOW}   (Manual review recommended)${NC}"
else
  echo -e "${GREEN}✅ PASS: All tokens appear to use 'as const'${NC}"
fi

# Summary
echo ""
if [ $ERRORS -eq 0 ]; then
  echo -e "${GREEN}✅ All critical type enforcement checks passed!${NC}"
  exit 0
else
  echo -e "${RED}❌ Type enforcement failed with $ERRORS error(s)${NC}"
  exit 1
fi

