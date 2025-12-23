🧾 **ARCHIVED SUPPORTING ARTIFACT**  
**Canonical entrypoint:** [../DOCS_DEDUP_AUDIT_REPORT.md](../DOCS_DEDUP_AUDIT_REPORT.md)  
**Reason:** Consolidated into appendices  
**Date:** 2025-12-22

---

# Documentation Deduplication Audit - Overlap Map

**Date:** 2025-12-22  
**Status:** WORKING DRAFT  
**Purpose:** Overlap map grouping rules by topic with duplicate/contradiction/partial overlap/unique markers

---

## Overlap Map by Topic

### TOPIC 1: SIZE SCALES

#### Rule: Global Size Scale Definition

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | GlobalSize: `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl"` | 🎯 CANONICAL |
| `SIZE_MAPPING_SPEC.md` | GlobalSize: `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "3xl"` (references VARIANTS_SIZE_CANON) | 🔁 DUPLICATE (with reference) |
| `INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md` | InteractiveSize: `"sm" \| "md" \| "lg"` ONLY | ⚠️ PARTIAL OVERLAP (subset, not contradiction) |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON defines global scale (canonical)
- ✅ SIZE_MAPPING_SPEC references VARIANTS_SIZE_CANON (acceptable duplicate with reference)
- ✅ INTERACTIVE_SIZE_SCALE defines subset for interactive components (complementary, not contradictory)

#### Rule: Component Size Subset Declarations

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | Components MUST declare which subset of global scale they support | 🎯 CANONICAL |
| `SIZE_MAPPING_SPEC.md` | Components MUST declare `supportedSizes` explicitly | 🔁 DUPLICATE (same rule, different wording) |
| `INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md` | Interactive components MUST use `sm \| md \| lg` | ⚠️ PARTIAL OVERLAP (specific case of subset rule) |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is canonical for subset declaration rule
- ⚠️ SIZE_MAPPING_SPEC restates same rule (should reference VARIANTS_SIZE_CANON)
- ✅ INTERACTIVE_SIZE_SCALE is specific application of subset rule

#### Rule: Overlay Size Restriction

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | Overlays with size prop MUST restrict to `sm \| md \| lg` only | 🎯 CANONICAL |
| `SIZE_MAPPING_SPEC.md` | Overlays with size prop MUST restrict to `sm \| md \| lg` only (references VARIANTS_SIZE_CANON) | 🔁 DUPLICATE (with reference) |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is canonical
- ✅ SIZE_MAPPING_SPEC correctly references VARIANTS_SIZE_CANON

#### Rule: Forbidden Non-GlobalSize Values

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | Forbidden: `size="icon"`, `size="tiny"`, `size="huge"` | 🎯 CANONICAL |
| `SIZE_MAPPING_SPEC.md` | Forbidden: non-GlobalSize entries like `'icon'`, `'tiny'`, `'huge'` | 🔁 DUPLICATE (same rule) |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is canonical
- ⚠️ SIZE_MAPPING_SPEC restates same rule (should reference VARIANTS_SIZE_CANON)

---

### TOPIC 2: VARIANTS

#### Rule: InteractiveVariant Dictionary

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | InteractiveVariant: `"primary" \| "secondary" \| "accent" \| "outline" \| "ghost" \| "destructive" \| "link"` | 🎯 CANONICAL |
| No other documents define InteractiveVariant | - | ✅ UNIQUE |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is sole source of truth for InteractiveVariant

#### Rule: SurfaceVariant Dictionary

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | SurfaceVariant: `"default" \| "elevated" \| "outlined" \| "filled" \| "subtle"` | 🎯 CANONICAL |
| No other documents define SurfaceVariant | - | ✅ UNIQUE |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is sole source of truth for SurfaceVariant

#### Rule: Overlay Variant Rules

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | Overlays MUST NOT use InteractiveVariant; default path: no variant prop; alternative: SurfaceVariant only | 🎯 CANONICAL |
| `SIZE_MAPPING_SPEC.md` | Variant rules for overlays deferred to VARIANTS_SIZE_CANON | ✅ UNIQUE (deferral, not duplicate) |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is canonical
- ✅ SIZE_MAPPING_SPEC correctly defers to VARIANTS_SIZE_CANON

---

### TOPIC 3: TOKENS

#### Rule: No Raw Values Policy

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `SIZE_MAPPING_SPEC.md` | All mappings MUST reference tokens only; no raw values, no CSS units | 🎯 CANONICAL (for size mappings) |
| `ARCHITECTURE_RULES.md` | All visual props MUST use token union types; raw values FORBIDDEN | 🎯 CANONICAL (for component APIs) |
| `SPACING_AUTHORITY.md` | All spacing values must come from canonical spacing token system | ⚠️ PARTIAL OVERLAP (specific domain) |
| `TYPOGRAPHY_AUTHORITY.md` | All typography values must come from canonical typography token system | ⚠️ PARTIAL OVERLAP (specific domain) |
| `RADIUS_AUTHORITY.md` | All border radius values must come from canonical radius token system | ⚠️ PARTIAL OVERLAP (specific domain) |
| `MOTION_AUTHORITY.md` | All motion values must come from canonical motion token system | ⚠️ PARTIAL OVERLAP (specific domain) |
| `ELEVATION_AUTHORITY.md` | All elevation values must come from canonical elevation token system | ⚠️ PARTIAL OVERLAP (specific domain) |

**Analysis:**
- ✅ SIZE_MAPPING_SPEC is canonical for size-to-token mapping rules
- ✅ ARCHITECTURE_RULES is canonical for general token union rules
- ✅ Token Authority documents are canonical for their specific domains (complementary, not contradictory)

#### Rule: Token Domain Ownership

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `TOKEN_AUTHORITY.md` | One component, one token domain; no cross-domain dependencies | 🎯 CANONICAL |
| No other documents define token domain ownership | - | ✅ UNIQUE |

**Analysis:**
- ✅ TOKEN_AUTHORITY is sole source of truth for token domain rules

---

### TOPIC 4: STORYBOOK

#### Rule: Matrix Story Requirements

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | Matrix Story REQUIRED ONLY when component supports BOTH size AND variant props | 🎯 CANONICAL |
| `SIZE_MAPPING_SPEC.md` | Matrix Story REQUIRED if component supports both `size` and `variant` props (references VARIANTS_SIZE_CANON) | 🔁 DUPLICATE (with reference) |
| `FOUNDATION_STEP_PIPELINE.md` | Storybook demonstrates all variants, all sizes | ⚠️ PARTIAL OVERLAP (general requirement, not specific Matrix rule) |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is canonical for Matrix story conditional requirement
- ✅ SIZE_MAPPING_SPEC correctly references VARIANTS_SIZE_CANON
- ⚠️ FOUNDATION_STEP_PIPELINE has general requirement but doesn't specify conditional Matrix rule

#### Rule: States Story Requirements

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | States Story REQUIRED ONLY when component has public states/interactive behavior | 🎯 CANONICAL |
| `FOUNDATION_STEP_PIPELINE.md` | Storybook demonstrates meaningful interaction examples | ⚠️ PARTIAL OVERLAP (general requirement, not specific States rule) |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is canonical for States story conditional requirement
- ⚠️ FOUNDATION_STEP_PIPELINE has general requirement but doesn't specify conditional States rule

#### Rule: Sizes Gallery Story

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `SIZE_MAPPING_SPEC.md` | Sizes Gallery Story REQUIRED for every component with public `size` prop | 🎯 CANONICAL |
| No other documents define Sizes Gallery requirement | - | ✅ UNIQUE |

**Analysis:**
- ✅ SIZE_MAPPING_SPEC is sole source of truth for Sizes Gallery requirement

#### Rule: Story Naming Convention

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `VARIANTS_SIZE_CANON.md` | Stories MUST use exact names: `Matrix`, `States` | 🎯 CANONICAL |
| No other documents define story naming | - | ✅ UNIQUE |

**Analysis:**
- ✅ VARIANTS_SIZE_CANON is sole source of truth for story naming

---

### TOPIC 5: PIPELINE (18A)

#### Rule: Pipeline Execution Rules

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `FOUNDATION_STEP_PIPELINE.md` | Pipeline executed top-to-bottom; mandatory reporting; step gating; blocker classification | 🎯 CANONICAL |
| No other documents define pipeline execution rules | - | ✅ UNIQUE |

**Analysis:**
- ✅ FOUNDATION_STEP_PIPELINE is sole source of truth for pipeline execution

#### Rule: Pipeline Integration Hooks

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `FOUNDATION_STEP_PIPELINE.md` | STEP 9: Validation via Tests & Storybook | 🎯 CANONICAL |
| `SIZE_MAPPING_SPEC.md` | 18A Pipeline STEP 5 Integration: Token/Size/Variant Consistency validation | ⚠️ PARTIAL OVERLAP (specific integration point) |

**Analysis:**
- ✅ FOUNDATION_STEP_PIPELINE is canonical for pipeline structure
- ⚠️ SIZE_MAPPING_SPEC defines specific integration point (STEP 5) - should verify this aligns with FOUNDATION_STEP_PIPELINE

#### Rule: PR Gating Requirements

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `SIZE_MAPPING_SPEC.md` | PR gating: new sized component cannot merge without mapping table; no raw values; overlay size validation | 🎯 CANONICAL (for size mapping) |
| `FOUNDATION_STEP_PIPELINE.md` | Step gating rule: cannot issue STEP N+1 unless STEP N present | ⚠️ PARTIAL OVERLAP (different context: pipeline steps vs PR gates) |

**Analysis:**
- ✅ SIZE_MAPPING_SPEC is canonical for size mapping PR gates
- ✅ FOUNDATION_STEP_PIPELINE is canonical for pipeline step gates (different context)

---

### TOPIC 6: TYPING

#### Rule: Explicit Union Types

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `TYPING_STANDARD.md` | Each component exposing `variant`, `size` MUST define explicit union types | 🎯 CANONICAL |
| No other documents define explicit union type requirement | - | ✅ UNIQUE |

**Analysis:**
- ✅ TYPING_STANDARD is sole source of truth for typing rules

#### Rule: CVA Usage Boundaries

| Document | Rule Statement | Status |
|----------|----------------|--------|
| `TYPING_STANDARD.md` | CVA MUST NOT be used as source of public types; CVA variant maps MUST be type-constrained | 🎯 CANONICAL |
| No other documents define CVA boundaries | - | ✅ UNIQUE |

**Analysis:**
- ✅ TYPING_STANDARD is sole source of truth for CVA rules

---

## Summary by Overlap Type

### 🔁 DUPLICATES (Same rule in multiple places)

1. **GlobalSize definition** - VARIANTS_SIZE_CANON (canonical) vs SIZE_MAPPING_SPEC (duplicate with reference) ✅ Acceptable
2. **Component size subset declarations** - VARIANTS_SIZE_CANON (canonical) vs SIZE_MAPPING_SPEC (duplicate, should reference) ⚠️ Needs reference
3. **Overlay size restriction** - VARIANTS_SIZE_CANON (canonical) vs SIZE_MAPPING_SPEC (duplicate with reference) ✅ Acceptable
4. **Forbidden non-GlobalSize values** - VARIANTS_SIZE_CANON (canonical) vs SIZE_MAPPING_SPEC (duplicate, should reference) ⚠️ Needs reference
5. **Matrix story requirement** - VARIANTS_SIZE_CANON (canonical) vs SIZE_MAPPING_SPEC (duplicate with reference) ✅ Acceptable

### ⚠️ PARTIAL OVERLAPS (Related but not identical)

1. **Size scales** - Global scale (VARIANTS_SIZE_CANON) vs Interactive subset (INTERACTIVE_SIZE_SCALE) ✅ Complementary
2. **Token rules** - General token unions (ARCHITECTURE_RULES) vs domain-specific (Token Authorities) ✅ Complementary
3. **Storybook requirements** - Specific Matrix/States rules (VARIANTS_SIZE_CANON) vs general requirements (FOUNDATION_STEP_PIPELINE) ⚠️ Needs clarification
4. **Pipeline integration** - Pipeline structure (FOUNDATION_STEP_PIPELINE) vs specific hooks (SIZE_MAPPING_SPEC) ⚠️ Needs verification

### ❌ CONTRADICTIONS (Conflicting rules)

**None found** - All rules are complementary or properly referenced.

### ✅ UNIQUE (Rule exists in only one place)

1. InteractiveVariant dictionary - VARIANTS_SIZE_CANON only
2. SurfaceVariant dictionary - VARIANTS_SIZE_CANON only
3. Token domain ownership - TOKEN_AUTHORITY only
4. Sizes Gallery story - SIZE_MAPPING_SPEC only
5. Story naming convention - VARIANTS_SIZE_CANON only
6. Pipeline execution rules - FOUNDATION_STEP_PIPELINE only
7. Typing standards - TYPING_STANDARD only

---

**Next Steps:** Identify canonical targets and detect any contradictions.

