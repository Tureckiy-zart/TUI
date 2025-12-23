🧾 **ARCHIVED SUPPORTING ARTIFACT**  
**Canonical entrypoint:** [../DOCS_DEDUP_AUDIT_REPORT.md](../DOCS_DEDUP_AUDIT_REPORT.md)  
**Reason:** Consolidated into appendices  
**Date:** 2025-12-22

---

# Documentation Deduplication Audit - Contradictions

**Date:** 2025-12-22  
**Status:** WORKING DRAFT  
**Purpose:** Detected contradictions with concrete quotes and fix proposals

---

## Contradiction Analysis

### Result: ❌ NO CONTRADICTIONS FOUND

After comprehensive analysis of all rule-bearing documents, **no contradictions were detected**. All rules are either:
- ✅ Complementary (different scopes, not conflicting)
- ✅ Properly referenced (duplicates reference canonical source)
- ✅ Hierarchical (general rules vs specific applications)

---

## Potential Confusion Points (Not Contradictions)

### 1. Global Size Scale vs Interactive Size Scale

**Not a Contradiction:** These are complementary rules.

**Rule A (VARIANTS_SIZE_CANON.md, line 55):**
> GlobalSize: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"`

**Rule B (INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md, line 79):**
> InteractiveSize: `"sm" | "md" | "lg"` ONLY

**Analysis:**
- Rule A defines the **global scale** available to all components
- Rule B defines the **restricted subset** for interactive components
- These are **complementary**, not contradictory
- VARIANTS_SIZE_CANON explicitly acknowledges INTERACTIVE_SIZE_SCALE (line 797-803)

**Status:** ✅ No contradiction - properly integrated

---

### 2. Matrix Story Requirement: Conditional vs Unconditional

**Not a Contradiction:** These are the same rule stated differently.

**Rule A (VARIANTS_SIZE_CANON.md, line 392):**
> Matrix Story REQUIRED ONLY when component publicly supports BOTH size AND variant props

**Rule B (SIZE_MAPPING_SPEC.md, line 373):**
> Matrix Story REQUIRED if component supports both `size` and `variant` props

**Analysis:**
- Both state the same conditional requirement
- SIZE_MAPPING_SPEC references VARIANTS_SIZE_CANON (line 375)
- No contradiction - same rule, properly referenced

**Status:** ✅ No contradiction - properly referenced

---

### 3. Storybook Requirements: General vs Specific

**Not a Contradiction:** These are different levels of specificity.

**Rule A (FOUNDATION_STEP_PIPELINE.md, line 402):**
> Storybook demonstrates: all variants, all sizes, meaningful interaction examples

**Rule B (VARIANTS_SIZE_CANON.md, line 392):**
> Matrix Story REQUIRED ONLY when component supports BOTH size AND variant props

**Analysis:**
- Rule A is a **general requirement** (demonstrate variants/sizes)
- Rule B is a **specific conditional rule** (when Matrix is required)
- These are **complementary** - Rule B specifies when Rule A applies to Matrix stories
- FOUNDATION_STEP_PIPELINE should reference VARIANTS_SIZE_CANON for Matrix/States specifics

**Status:** ⚠️ Partial overlap - needs cross-link (not a contradiction)

---

### 4. Token Rules: General vs Domain-Specific

**Not a Contradiction:** These are hierarchical rules.

**Rule A (ARCHITECTURE_RULES.md, line 121):**
> All visual props MUST use token union types

**Rule B (SPACING_AUTHORITY.md, line 26):**
> All spacing values must come from canonical spacing token system

**Analysis:**
- Rule A is **general** (all visual props use tokens)
- Rule B is **domain-specific** (spacing tokens specifically)
- These are **hierarchical** - Rule B is an application of Rule A
- No contradiction

**Status:** ✅ No contradiction - hierarchical structure

---

## Summary

**Contradictions Found:** 0

**Partial Overlaps Requiring Cross-Links:** 1
- FOUNDATION_STEP_PIPELINE STEP 9 should reference VARIANTS_SIZE_CANON for Matrix/States conditional requirements

**All Other Overlaps:** Properly referenced or complementary

---

**Next Steps:** Create deprecation/redirect plan and cross-link checklist.

