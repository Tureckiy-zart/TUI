🧾 **ARCHIVED SUPPORTING ARTIFACT**  
**Canonical entrypoint:** [../DOCS_DEDUP_AUDIT_REPORT.md](../DOCS_DEDUP_AUDIT_REPORT.md)  
**Reason:** Consolidated into appendices  
**Date:** 2025-12-22

---

# Documentation Deduplication Audit - Rule Extraction

**Date:** 2025-12-22  
**Status:** WORKING DRAFT  
**Purpose:** Extracted rule sets for each high-risk topic

---

## 1. SIZE SCALES

### VARIANTS_SIZE_CANON.md

**Rule Set:**
1. Global size scale: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"` (lines 54-55)
2. Components MUST declare which subset of global scale they support (line 71)
3. Interactive components use restricted subset `sm | md | lg` (line 79)
4. Typography components use full scale `xs..3xl` (line 79)
5. Default size is `md` (line 67)
6. Forbidden: inventing size names outside global scale (line 82)
7. Forbidden: non-GlobalSize values in size props (e.g., `size="icon"`) (line 85, 87)
8. Overlay size restriction: overlays with size prop MUST restrict to `sm | md | lg` only (line 172)
9. Forbidden for overlays: `xs`, `xl`, `2xl`, `3xl` (lines 175-178)

### SIZE_MAPPING_SPEC.md

**Rule Set:**
1. GlobalSize definition: `"xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"` (line 105)
2. References VARIANTS_SIZE_CANON for GlobalSize definition (line 108)
3. All size props MUST use only GlobalSize values (line 110)
4. Forbidden: non-GlobalSize entries like `'icon'`, `'tiny'`, `'huge'` (line 110)
5. Components MUST declare `supportedSizes` explicitly (line 120)
6. Overlay strict subset: overlays with size prop MUST restrict to `sm | md | lg` only (line 126)
7. Forbidden for overlays: `xs`, `xl`, `2xl`, `3xl` (line 126)
8. References VARIANTS_SIZE_CANON for overlay restriction rule (line 128)
9. Interactive components: MUST map height, padding, text, radius for all supported sizes (line 294)
10. Overlay components: MUST restrict to `sm | md | lg` only (line 324)

### INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md

**Rule Set:**
1. Interactive size scale: `"sm" | "md" | "lg"` ONLY (line 79)
2. Button is canonical owner of interactive size scale (line 86)
3. All interactive components MUST align with Button size (line 88)
4. Forbidden for interactive: `xs`, `xl`, any custom sizes (lines 94-96)
5. Interactive components MUST use canonical interactive size scale (line 123)
6. Forbidden: `xs` and `xl` for interactive components (line 126)
7. Semi-interactive components MUST NOT use `size` as interactive scale (line 136)
8. Non-interactive components MUST NOT use `size` prop (line 155)

---

## 2. VARIANTS

### VARIANTS_SIZE_CANON.md

**Rule Set:**
1. InteractiveVariant: `"primary" | "secondary" | "accent" | "outline" | "ghost" | "destructive" | "link"` (lines 98-105)
2. SurfaceVariant: `"default" | "elevated" | "outlined" | "filled" | "subtle"` (lines 124-129)
3. Overlays MUST NOT use InteractiveVariant dictionary (line 143)
4. Overlays default path: no variant prop at all (line 146)
5. Overlays alternative path: SurfaceVariant only if visual variation needed (line 149)
6. Components MUST declare which subset of global variant dictionary they support (line 199)
7. Forbidden: inventing variant names outside global dictionary (line 209)
8. Forbidden: encoding states as variants (line 211)
9. States are props, variants are style choices (line 298)
10. Token keys MUST use global size/variant names (line 330)

---

## 3. TOKENS

### SIZE_MAPPING_SPEC.md

**Rule Set:**
1. All mappings MUST reference tokens only (line 142)
2. Forbidden: raw numeric values, `rem`/`px` units, calculations (line 142)
3. No Raw Values Policy: mapping can only reference tokens (line 212)
4. Forbidden: `heightToken: "32px"`, `paddingXToken: "0.5rem"`, etc. (lines 215-218)
5. Token namespaces: SPACING_TOKENS, TYPOGRAPHY_TOKENS, RADIUS_TOKENS, COMPONENT_TOKENS (lines 137-140)
6. Mandatory mapping keys: heightToken, paddingXToken, paddingYToken, textToken, radiusToken (lines 152-173)
7. Optional keys: gapToken, iconSizeToken, minWidthToken, hitAreaToken, maxWidthToken (lines 177-196)

### TOKEN_AUTHORITY.md

**Rule Set:**
1. Token system is LOCKED and IMMUTABLE (line 4)
2. Foundation tokens: spacing, typography, colors, gradients, radius, shadows, motion, opacity (lines 45-52)
3. Shared component tokens: TEXT_TOKENS, ICON_TOKENS, MOTION_TOKENS, FORM_TOKENS (lines 113-118)
4. Component-specific tokens: one component, one token domain (line 149)
5. Rule: One component, one token domain (line 150)
6. Rule: No cross-domain dependencies (line 169)
7. Rule: Token domain encapsulation (line 184)
8. Rule: Shared semantics use shared tokens (line 207)
9. Rule: Foundation tokens for basic utilities (line 231)

### SPACING_AUTHORITY.md

**Rule Set:**
1. All spacing values must come from canonical spacing token system (line 26)
2. Components cannot introduce arbitrary spacing values (line 26)
3. Rule: Token-Only Spacing (line 163)
4. Forbidden: arbitrary pixel values, rem values, percentage values, calculated values (lines 173-176)
5. Rule: Grid System Compliance - 8px grid system (line 179)
6. Rule: Semantic Preference - prefer semantic spacing tokens (line 189)
7. Rule: Layout Pattern Mapping - use layout spacing tokens (line 203)
8. Forbidden: raw Tailwind spacing utilities (lines 259-262)

### TYPOGRAPHY_AUTHORITY.md

**Rule Set:**
1. All typography values must come from canonical typography token system (line 26)
2. Components cannot introduce arbitrary typography values (line 26)
3. Rule: Token-Only Typography (line 163)
4. Forbidden: arbitrary font sizes, weights, line heights (lines 173-176)
5. Rule: Semantic Preference (line 189)
6. Forbidden: raw Tailwind typography utilities (lines 259-262)

### RADIUS_AUTHORITY.md

**Rule Set:**
1. All border radius values must come from canonical radius token system (line 26)
2. Components cannot introduce arbitrary border radius values (line 26)
3. Rule: Token-Only Radius (line 163)
4. Forbidden: arbitrary radius values (lines 173-176)
5. Rule: Semantic Preference (line 189)
6. Forbidden: raw Tailwind radius utilities (lines 259-262)

### MOTION_AUTHORITY.md

**Rule Set:**
1. All motion values must come from canonical motion token system (line 26)
2. Components cannot introduce arbitrary motion values (line 26)
3. Rule: Token-Only Motion (line 163)
4. Forbidden: arbitrary durations, easings, transitions (lines 173-176)
5. Rule: Semantic Preference (line 189)

### ELEVATION_AUTHORITY.md

**Rule Set:**
1. All elevation values must come from canonical elevation token system (line 26)
2. Components cannot introduce arbitrary shadow or z-index values (line 26)
3. Rule: Token-Only Elevation (line 163)
4. Forbidden: arbitrary shadows, z-index values (lines 173-176)
5. Rule: Semantic Preference (line 189)

### ARCHITECTURE_RULES.md

**Rule Set:**
1. All visual props MUST use token union types (line 121)
2. Raw values (strings, numbers, CSS) are FORBIDDEN for visual props (line 121)
3. Token unions in component APIs: `prop?: TokenUnion | Responsive<TokenUnion>` (line 629)
4. Forbidden: raw strings, numbers, CSS values for visual props (lines 643-648)
5. Tailwind utilities FORBIDDEN for visual properties (lines 714-726)
6. Tailwind utilities ALLOWED for structural properties only (lines 700-710)

---

## 4. STORYBOOK

### VARIANTS_SIZE_CANON.md

**Rule Set:**
1. Matrix Story: REQUIRED ONLY when component publicly supports BOTH size AND variant props (line 392)
2. States Story: REQUIRED ONLY when component has public states/interactive behavior (line 393)
3. Matrix Story MUST display: all variants as rows, all sizes as columns, grid layout (lines 399-403)
4. Matrix story is NOT REQUIRED for components with only size OR only variant (lines 432-435)
5. States Story MUST display: all variants, all sizes, all canonical states (lines 441-445)
6. States story REQUIRED for: interactive components with state props, loading states, error/success states (lines 486-490)
7. States story NOT REQUIRED for: non-interactive components, overlays without interactive states, decorative components (lines 492-496)
8. Story naming: `Matrix` and `States` (exact names) (lines 502-504)
9. Forbidden story names: `VariantsMatrix`, `SizeMatrix`, `AllStates`, `StateVariations` (lines 507-510)

### SIZE_MAPPING_SPEC.md

**Rule Set:**
1. Sizes Gallery Story: REQUIRED for every component with public `size` prop (line 338)
2. Sizes Gallery MUST: single row per size, demonstrate text/icon/multi-line content, no hardcoded spacing (lines 341-345)
3. Matrix Story: REQUIRED if component supports both `size` and `variant` props (line 373)
4. References VARIANTS_SIZE_CANON for Matrix story rules (line 375)
5. Overlay Long Content Story: REQUIRED for overlays (line 381)
6. Overlay Long Content MUST: demonstrate padding, maxWidth token behavior, validate no overflow (lines 384-386)

### FOUNDATION_STEP_PIPELINE.md

**Rule Set:**
1. STEP 9: Storybook demonstrates all variants, all sizes, meaningful interaction examples (lines 402-406)
2. Minimal or placeholder coverage is not sufficient (line 408)
3. Accessibility-specific tests and Storybook stories (line 433)

---

## 5. PIPELINE (18A)

### FOUNDATION_STEP_PIPELINE.md

**Rule Set:**
1. Pipeline executed top-to-bottom, without reordering (line 39)
2. Mandatory reporting rule: every step MUST end by updating audit report (line 50)
3. Assistant review checkpoints: mandatory at STEP 0, 8, 9, 10, 11 (lines 57-64)
4. No skipped documentation: step not executed unless audit report contains section (line 76)
5. Step gating rule: cannot issue STEP N+1 unless STEP N present in report (line 81)
6. Blocker classification rule: every step section must include outcome tag (line 83)
7. Language consistency: English-only (line 89)
8. Vocabulary guardrails: prohibited words in STEP 0-10 (line 93)
9. Work pattern: Observe, Decide, Change, Record (lines 104-111)
10. STEP 9: Validation via Tests & Storybook (line 393)
11. STEP 10: Accessibility Audit & Fixes (MANDATORY) (line 412)
12. STEP 11: Final Review & Architectural Lock (line 442)

### SIZE_MAPPING_SPEC.md

**Rule Set:**
1. 18A Pipeline STEP 5 Integration: Token/Size/Variant Consistency validation (line 396)
2. Validation Step: pipeline checks mapping table exists (line 399)
3. Consistency Check: validates mapping table token references match actual usage (line 400)
4. Subset Verification: verifies component `supportedSizes` matches mapping table rows (line 401)
5. Overlay Rule Enforcement: verifies overlay components restrict to `sm | md | lg` only (line 402)
6. Future Lint/Audit Rule: if component has size prop, must have mapping table (line 408)
7. PR Gating Requirements: new sized component cannot merge without mapping table (line 421)
8. PR Gating: size prop addition requires mapping table (line 422)
9. PR Gating: token reference validation - no raw values (line 423)
10. PR Gating: overlay size validation - no sizes beyond `sm | md | lg` (line 424)

---

## 6. TYPING

### TYPING_STANDARD.md

**Rule Set:**
1. RULE 1: Explicit Variant Union Types REQUIRED (line 60)
2. Each component exposing `variant`, `size` MUST define explicit union types (line 62)
3. Forbidden: inline string unions in props, `string` as public variant type, inferring from CVA (lines 87-89)
4. RULE 2: CVA Is NOT a Public Type Source (FORBIDDEN) (line 93)
5. CVA MUST NOT be used as source of public types (line 95)
6. Forbidden: `VariantProps<typeof buttonVariants>` in public APIs (lines 99-104)
7. Required: CVA types may exist internally, public props MUST reference explicit union types (lines 109-110)
8. RULE 3: CVA Variant Maps MUST Be Type-Constrained (line 114)
9. All variant maps passed into CVA MUST use `satisfies Record<...>` (line 117)
10. RULE 4: Public Component Props MUST Use Canonical Types (line 153)
11. Public component props MUST reference canonical union types (line 155)
12. Forbidden: `variant?: string`, inline unions in props, CVA-derived types in public APIs (lines 157-161)

### TYPESCRIPT_GENERAL_RULES.md

**Rule Set:**
1. General TypeScript implementation rules (secondary to TYPING_STANDARD)
2. Does NOT override TYPING_STANDARD for public API typing (per TYPING_STANDARD line 19)

---

## 7. LEGACY TERMS FOUND

### size="icon"

**Occurrences:**
1. `docs/architecture/VARIANTS_SIZE_CANON.md` - Line 85, 87, 522, 562, 641, 642, 665, 850, 852, 855, 860, 866
2. `docs/architecture/SIZE_MAPPING_SPEC.md` - Line 110, 529
3. `docs/reports/inventory/VARIANTS_SIZE_INVENTORY.md` - Lines 24, 69, 78, 85, 87, 88, 89, 90, 93, 388, 393, 398, 449, 450, 451, 453, 511, 519, 549, 565, 566, 571, 572
4. `docs/reports/BUTTON_BASELINE_REPORT.md` - Lines 54, 124, 229, 302, 304, 306, 307, 1225, 1227, 1231, 1238, 1240, 1349, 1391, 1406, 1500, 1526

**Status:** 🕰️ Legacy term - violates GlobalSize requirement, documented for future migration

### default variant

**Occurrences:**
1. `docs/reports/inventory/VARIANTS_SIZE_INVENTORY.md` - Lines 28, 37, 72, 121, 145, 167, 210, 236, 262, 288, 314, 339, 349, 362, 372, 410
2. `docs/architecture/VARIANTS_SIZE_CANON.md` - Lines 133, 149, 162, 204, 574, 632, 728
3. `docs/architecture/FOUNDATION_LOCK.md` - Line 617
4. `docs/reports/BUTTON_BASELINE_REPORT.md` - Lines 204, 238, 427, 1266, 1389, 1408
5. Multiple reports and references

**Status:** ⚠️ Partial overlap - "default" is valid SurfaceVariant, but "default variant for input" conflicts with InteractiveVariant requirement

### matrix required everywhere

**Occurrences:**
1. `docs/architecture/VARIANTS_SIZE_CANON.md` - Lines 392, 430, 432-435, 543
2. `docs/architecture/SIZE_MAPPING_SPEC.md` - Line 373
3. `docs/reports/inventory/VARIANTS_SIZE_INVENTORY.md` - Lines 130, 154, 173, 176, 194, 197, 218, 345, 368, 416, 423, 430, 476, 536, 537, 538

**Status:** ✅ Correctly stated - Matrix REQUIRED ONLY when component supports BOTH size AND variant (not everywhere)

---

**Next Steps:** Use this extraction to build overlap map and identify contradictions.

