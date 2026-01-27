# Closed System v2 — Layout Capability Map

**Package:** `@tenerife.music/ui`  
**Layer:** Foundation / Architecture  
**Phase:** H.1 — Layout Capability Design  
**Status:** Design-only (no implementation)  
**Date Created:** 2026-01-27  
**Task ID:** TUI_CSV2_PHASE_H1_LAYOUT_CAPABILITY_DESIGN_019

---

## Purpose & Scope

This document designs canonical layout capabilities (APIs and tokens) to replace DOM-driven layout patterns discovered in Phase H audit. The document closes H5 (DOM-Driven Layout Intent) violations at the design level while preserving Closed System v2 invariants.

**Scope:**
- Design of new Foundation layout APIs (conceptual, not typed)
- Design of new layout-related tokens (mapping to existing tokens)
- Capability mapping to Phase H findings
- Non-breaking, additive design only

**Out of Scope:**
- Implementation (runtime, types, components)
- Migrations or refactors
- Enforcement changes
- Changes to locked layers beyond additive design

**Design Constraint:**
This is a **design-only document**. No TypeScript types, no implementation details, no enforcement rules. Focus is on conceptual API shapes and token mappings.

---

## Problems Addressed (Phase H Mapping)

Phase H audit identified 9 H5 findings (DOM-Driven Layout Intent): 7 VIOLATION, 2 DEBT. This section maps each finding to the designed capability that addresses it.

### H5-001: SectionBuilder — Spacing via className (mb-lg/mt-lg)

**Finding:** SectionBuilder uses Tailwind utility classes (`mb-lg`, `mt-lg`) for spacing between header/body/footer slots instead of Foundation layout primitives.

**Designed Capability:**
- **Section Component API:** Section component provides `spacing` prop (ResponsiveSpacing) for content block spacing
- **Section Spacing Tokens:** Existing `layoutSpacing.section.{xs|sm|md|lg|xl|2xl}` tokens map to spacing values
- **Canonical Replacement:** Use Section component with `spacing` prop instead of utility classes

**Status:** ✅ Section API is sufficient. Document canonical usage pattern.

---

### H5-002: SectionBuilder — Overlay positioning via absolute/flex

**Finding:** Overlay positioning uses absolute positioning with flex centering. Classified as DEBT (acceptable as-is).

**Designed Capability:**
- **Surface Component API:** Surface component provides visual boundary container with variant, padding, radius
- **Assessment:** Overlay positioning is acceptable for overlay semantics. Surface API covers visual boundary patterns.

**Status:** ✅ Surface API is sufficient. Document Surface as canonical visual boundary container.

---

### H5-003: SectionBuilder — Flex layout inside Flex component

**Finding:** Flex children use utility classes (`min-w-0 flex-1`, `order-first`) instead of Foundation component props.

**Designed Capability:**
- **Flex Child Control API (OPTIONAL):** Minimal Box props for flex child behavior:
  - `flexGrow?: boolean | number` - Controls flex-grow (default: false)
  - `flexOrder?: number` - Controls order (default: undefined)
  - **Constraint:** Explicit opt-in only, limited props, no full flexbox API

**Status:** ⚠️ OPTIONAL design. Prevents future DOM escapes but not required for Phase H.1.

---

### H5-004: NotificationCenter.Panel — Header layout via flex

**Finding:** Header layout uses flex utility classes (`flex items-center justify-between`) instead of Row component.

**Designed Capability:**
- **Row Component API:** Row component provides `spacing`, `align`, `justify` props (inherited from Stack)
- **Verification:** Row API supports `justify="between"` and `align="center"` patterns

**Status:** ✅ Row API is sufficient. Document canonical usage pattern.

---

### H5-005: NotificationCenter.Panel — Content area layout via flex

**Finding:** Scrollable content area uses `flex-1` utility class. Empty state centering uses flex utility classes. Classified as DEBT (minor).

**Designed Capability:**
- **Stack Component API:** Stack component provides `align="center"` and `justify="center"` for empty state centering
- **Assessment:** Stack API covers empty state centering patterns. `flex-1` for flex child sizing is acceptable.

**Status:** ✅ Stack API is sufficient. Document canonical usage pattern.

---

### H5-006: NotificationCenter.Item — Content layout via flex

**Finding:** Content layout within ListItem uses flex utility classes (`flex-shrink-0`, `min-w-0 flex-1`) instead of Foundation layout primitives.

**Designed Capability:**
- **Row Component API:** Row component provides horizontal flow with `spacing`, `align` props
- **Canonical Replacement:** Use Row component for horizontal layout instead of flex utility classes

**Status:** ✅ Row API is sufficient. Document canonical usage pattern.

---

### H5-007: VenueCard — Metadata layout via flex

**Finding:** Metadata and footer layouts use flex utility classes (`flex flex-col`, `flex items-center justify-between`) instead of Stack/Row components.

**Designed Capability:**
- **Stack Component API:** Stack component provides vertical flow (`direction="vertical"`) with `spacing` prop
- **Row Component API:** Row component provides horizontal flow with `spacing`, `justify`, `align` props
- **Canonical Replacement:** Use Stack for vertical metadata layout, Row for horizontal footer layout

**Status:** ✅ Stack and Row APIs are sufficient. Document canonical usage patterns.

---

### H5-008: FeatureSection — Grid layout via utility classes

**Finding:** Grid layout uses Tailwind utility classes (`grid gap-lg`) with responsive columns instead of Foundation Grid component. **CRITICAL violation.**

**Designed Capability:**
- **Grid Component API:** Grid component provides `cols` (responsive), `gap`, `align`, `justify`, `flow` props
- **Verification:** Grid API supports responsive columns (`cols={{ base: 1, md: 2 }}`) and token-based gap (`gap="lg"`)
- **Canonical Replacement:** Use Grid component with `cols` and `gap` props instead of utility classes

**Status:** ✅ Grid API is sufficient. Document canonical usage pattern.

---

### H5-009: CTASection — Grid and flex layouts via utility classes

**Finding:** Multiple layout patterns use utility classes: grid layout for split variant, flex with wrap for content and actions. **CRITICAL violation.**

**Designed Capability:**
- **Grid Component API:** Grid component provides `cols` (responsive), `gap`, `align` props for split variant
- **Row Component API with Wrap:** Row component needs `wrap` prop for horizontal flows with wrapping
- **Canonical Replacement:** Use Grid for split variant, Row with `wrap` for actions layout

**Status:** ✅ Grid API is sufficient. ⚠️ Row needs wrap capability (MUST design).

---

### H5-010: HeroSection — Grid and flex layouts via utility classes

**Finding:** Multiple layout patterns use utility classes: grid for split variant, flex with wrap for content and actions. **CRITICAL violation.**

**Designed Capability:**
- **Grid Component API:** Grid component provides `cols` (responsive), `gap` (responsive), `align` props for split variant
- **Row Component API with Wrap:** Row component needs `wrap` prop for horizontal flows with wrapping
- **Canonical Replacement:** Use Grid for split variant, Row with `wrap` for actions layout

**Status:** ✅ Grid API is sufficient. ⚠️ Row needs wrap capability (MUST design).

---

## Design Principles & Constraints

All designs must preserve Closed System v2 invariants and follow established architectural principles.

### Closed System v2 Principles (MUST Preserve)

1. **Single Expression Surface:** All layout intent must be expressed through Foundation APIs, not utility classes or DOM manipulation
2. **Deterministic Rendering:** Same layout intent must produce same visual result, without hidden paths
3. **No Hidden Channels:** All layout expression must be explicit through component APIs, not parallel channels
4. **Contract Completeness:** Component APIs must cover all documented layout patterns, eliminating ambiguity

### Design Constraints

1. **Additive Only:** All designs must be non-breaking additions to existing APIs
2. **No Breaking Changes:** No modifications to locked components (Stack, Grid, Container, Box)
3. **Token-Based:** All spacing values must use existing token system, no raw values
4. **Minimal API:** Design minimal, sufficient API surface to cover documented patterns
5. **Conceptual Design:** No TypeScript types, no implementation details, focus on props and behavior

### Architectural Boundaries

- **Layout Authority:** Layout defines structure and flow (WHERE). Spacing Authority defines distances (HOW FAR)
- **Foundation Lock:** Stack, Grid, Container, Box are LOCKED. Row inherits from Stack (LOCKED)
- **Extension Layer:** New capabilities must be additive to Extension layer, not Foundation layer

---

## Proposed APIs (MUST / SHOULD / OPTIONAL)

### MUST Design (Addresses CRITICAL H5 findings)

#### 1. Grid Component API Verification

**Status:** Grid component EXISTS and is LOCKED

**Current API:**
- `cols?: ResponsiveColumns` - Number of columns (responsive: base, sm, md, lg, xl, 2xl)
- `gap?: ResponsiveSpacing` - Gap between grid items (token-based)
- `align?: ResponsiveAlignment` - Align items (start, end, center, baseline, stretch)
- `justify?: ResponsiveJustify` - Justify content (start, end, center, between, around, evenly)
- `flow?: ResponsiveFlow` - Grid flow direction (row, col, dense, row-dense, col-dense)
- `rows?: ResponsiveRows` - Number of rows (responsive)

**Verification:**
- ✅ H5-008 (FeatureSection): `grid gap-lg` with responsive columns → Grid API supports via `cols` and `gap`
- ✅ H5-009 (CTASection): `grid grid-cols-1 gap-lg md:grid-cols-2` → Grid API supports via `cols={{ base: 1, md: 2 }}` and `gap="lg"`
- ✅ H5-010 (HeroSection): `grid grid-cols-1 gap-lg md:grid-cols-2 lg:gap-xl` → Grid API supports via `cols={{ base: 1, md: 2 }}` and `gap={{ base: "lg", lg: "xl" }}`

**Design Decision:** Grid API is sufficient. Document canonical usage patterns for all Phase H grid patterns.

**Canonical Usage Patterns:**
- Simple grid: `<Grid cols={3} gap="lg">`
- Responsive grid: `<Grid cols={{ base: 1, md: 2, lg: 3 }} gap="lg">`
- Grid with alignment: `<Grid cols={2} gap="lg" align="center">`

---

#### 2. Row Component Wrap Capability

**Status:** Row component EXISTS but lacks `wrap` prop (inherits from Stack which doesn't have wrap)

**Current API:**
- `spacing?: ResponsiveSpacing` - Gap between items (token-based)
- `align?: ResponsiveAlignment` - Align items (inherited from Stack)
- `justify?: ResponsiveJustify` - Justify content (inherited from Stack)
- **Missing:** `wrap?: boolean` - Enable flex-wrap for horizontal flows

**Design Requirement:**
Row component must support `wrap` prop for horizontal flows with wrapping to address:
- H5-003 (SectionBuilder): `flex-wrap` needed for Flex children
- H5-009 (CTASection): `flex flex-wrap gap-md` → Row needs wrap
- H5-010 (HeroSection): `flex flex-wrap gap-md` → Row needs wrap

**Proposed API Addition:**
- `wrap?: boolean` - Enable flex-wrap for horizontal flows (default: false)
  - When `wrap={true}`, Row applies `flex-wrap` class
  - When `wrap={false}` or undefined, Row applies `flex-nowrap` class (default)

**Design Decision:** Add `wrap` prop to Row API (conceptual design, not typed). Row should support wrap for horizontal flows with wrapping.

**Canonical Usage Patterns:**
- Row without wrap: `<Row spacing="md" justify="between">`
- Row with wrap: `<Row spacing="md" wrap justify="center">`

**Implementation Constraint:**
- Row inherits from Stack (LOCKED). Wrap capability must be added without modifying Stack
- Wrap is Row-specific (horizontal flow only), not applicable to Stack (vertical/horizontal)

---

#### 3. Section Component Spacing API Verification

**Status:** Section component EXISTS

**Current API:**
- `spaceY?: ResponsiveSpacing` - Vertical padding (token-based, default: "md")
- `spacing?: ResponsiveSpacing` - Spacing between content blocks (token-based)

**Verification:**
- ✅ H5-001 (SectionBuilder): `mb-lg`, `mt-lg` between header/body/footer slots → Section `spacing` prop covers this pattern

**Design Decision:** Section API is sufficient. Document that Section `spacing` prop replaces slot spacing utility classes.

**Canonical Usage Patterns:**
- Section with default spacing: `<Section spaceY="lg">`
- Section with content block spacing: `<Section spaceY="lg" spacing="md">`
- Section with responsive spacing: `<Section spaceY={{ base: "md", lg: "xl" }} spacing="lg">`

**Token Mapping:**
- `mb-lg`, `mt-lg` → Section `spacing="lg"` prop
- Utility class spacing values map to semantic spacing tokens (xs, sm, md, lg, xl, 2xl)

---

### SHOULD Design (Addresses MAJOR H5 findings)

#### 4. Surface Component API Verification

**Status:** Surface component EXISTS

**Current API:**
- `variant?: SurfaceVariantType` - Surface variant (default, elevated, outlined, filled, subtle)
- `p?: ResponsiveSpacing` - Padding (token-based, overrides variant default)
- `radius?: ResponsiveRadius` - Border radius (token-based, overrides variant default)

**Verification:**
- ✅ H5-002 (SectionBuilder): Overlay positioning (acceptable as-is, not a violation)
- ✅ Visual boundary patterns: Surface API covers visual boundary container patterns

**Design Decision:** Surface API is sufficient. Document Surface as canonical visual boundary container.

**Canonical Usage Patterns:**
- Surface with default variant: `<Surface variant="default" p="md">`
- Surface with custom padding: `<Surface variant="elevated" p="lg">`
- Surface with custom radius: `<Surface variant="outlined" p="md" radius="lg">`

---

### OPTIONAL Design (Prevents future DOM escapes)

#### 5. Flex Child Control API (Limited)

**Status:** Flex component EXISTS but may not have child control props

**Current API:**
- Flex component provides full flexbox control for parent (direction, wrap, grow, shrink, basis, alignment, spacing)
- Box component does not provide flex child control props

**Design Requirement:**
Minimal API for flex child control to address:
- H5-003 (SectionBuilder): `min-w-0 flex-1`, `order-first` on Flex children

**Proposed API Addition (Box Component):**
- `flexGrow?: boolean | number` - Controls flex-grow (default: false)
  - When `flexGrow={true}`, applies `flex-grow: 1`
  - When `flexGrow={number}`, applies `flex-grow: number`
  - When `flexGrow={false}` or undefined, no flex-grow applied
- `flexOrder?: number` - Controls order (default: undefined)
  - When provided, applies `order: number`
  - When undefined, no order applied

**Constraints:**
- Explicit opt-in only: Props must be explicitly set, no default behavior
- Limited props: Only `flexGrow` and `flexOrder`, no full flexbox API (no flexShrink, flexBasis, etc.)
- Box component only: Props apply to Box component, not all components
- No breaking changes: Addition to Box API must be non-breaking

**Design Decision:** Design minimal Box props for flex child behavior (flexGrow, flexOrder) - explicit opt-in only.

**Canonical Usage Patterns:**
- Box with flex-grow: `<Box flexGrow={true}>` or `<Box flexGrow={1}>`
- Box with order: `<Box flexOrder={-1}>` (order-first equivalent)
- Box with both: `<Box flexGrow={true} flexOrder={1}>`

**Non-Goals:**
- No `flexShrink` prop (use utility classes if needed, or document as acceptable)
- No `flexBasis` prop (use spacing tokens via padding/margin if needed)
- No full flexbox API for children (limited props only)

---

## Proposed Tokens

### MUST Design

#### Section Spacing Tokens

**Status:** Section spacing tokens EXIST in spacing system

**Current Tokens:**
- `layoutSpacing.section.xs` → `spacing[6]` (24px)
- `layoutSpacing.section.sm` → `spacing[8]` (32px)
- `layoutSpacing.section.md` → `spacing[12]` (48px) - **default**
- `layoutSpacing.section.lg` → `spacing[16]` (64px)
- `layoutSpacing.section.xl` → `spacing[20]` (80px)
- `layoutSpacing.section.2xl` → `spacing[24]` (96px)

**Canonical Mapping:**
- `mb-lg`, `mt-lg` → `layoutSpacing.section.lg` or semantic spacing token `lg` (24px)
- Utility class spacing values map to semantic spacing tokens:
  - `mb-xs`, `mt-xs` → `xs` (4px)
  - `mb-sm`, `mt-sm` → `sm` (8px)
  - `mb-md`, `mt-md` → `md` (16px)
  - `mb-lg`, `mt-lg` → `lg` (24px)
  - `mb-xl`, `mt-xl` → `xl` (32px)
  - `mb-2xl`, `mt-2xl` → `2xl` (48px)

**Design Decision:** Section spacing tokens exist. Document canonical mapping from utility classes to tokens.

**Usage:**
- Section component uses `spacing` prop with semantic spacing tokens (xs, sm, md, lg, xl, 2xl)
- Tokens map to `layoutSpacing.section.*` values internally
- No new tokens required, use existing spacing system

---

### SHOULD Design

#### Grid Gap Tokens

**Status:** Grid gap tokens EXIST in spacing system

**Current Tokens:**
- `layoutSpacing.grid.xs` → `spacing[2]` (8px)
- `layoutSpacing.grid.sm` → `spacing[4]` (16px)
- `layoutSpacing.grid.md` → `spacing[6]` (24px) - **default**
- `layoutSpacing.grid.lg` → `spacing[8]` (32px)
- `layoutSpacing.grid.xl` → `spacing[12]` (48px)

**Canonical Mapping:**
- `gap-lg` → `layoutSpacing.grid.lg` or semantic spacing token `lg` (24px)
- Utility class gap values map to semantic spacing tokens:
  - `gap-xs` → `xs` (4px)
  - `gap-sm` → `sm` (8px)
  - `gap-md` → `md` (16px)
  - `gap-lg` → `lg` (24px)
  - `gap-xl` → `xl` (32px)

**Design Decision:** Grid gap tokens exist. Document canonical mapping from utility classes to tokens.

**Usage:**
- Grid component uses `gap` prop with semantic spacing tokens (xs, sm, md, lg, xl, 2xl)
- Tokens map to `layoutSpacing.grid.*` values internally
- No new tokens required, use existing spacing system

---

## Non-Goals

This section explicitly documents what is intentionally NOT included in Phase H.1 design.

### Implementation

- ❌ No runtime implementation of designed APIs
- ❌ No TypeScript type definitions
- ❌ No component code changes
- ❌ No enforcement rules or ESLint rules

### Migrations

- ❌ No migration of existing components to new APIs
- ❌ No refactoring of Phase H violation sites
- ❌ No code changes to DOMAIN or PATTERNS layers

### Enforcement

- ❌ No enforcement mechanism design
- ❌ No compile-time validation rules
- ❌ No runtime guards

### Breaking Changes

- ❌ No breaking changes to locked layers (Foundation, COMPOSITION)
- ❌ No modifications to Stack, Grid, Container, Box APIs
- ❌ No changes to existing token system

### Full Flexbox API

- ❌ No full flexbox API for children (limited to flexGrow, flexOrder only)
- ❌ No flexShrink, flexBasis props for Box
- ❌ No comprehensive flex child control API

### Additional Capabilities

- ❌ No new layout primitives beyond designed capabilities
- ❌ No new token domains or scales
- ❌ No changes to Layout Authority or Spacing Authority contracts

---

## Risk Analysis

### Low Risk Items

**Grid Component API:**
- ✅ Grid component EXISTS and is LOCKED
- ✅ Grid API covers all Phase H grid patterns (H5-008, H5-009, H5-010)
- ✅ No API changes required, only documentation

**Section Component API:**
- ✅ Section component EXISTS
- ✅ Section API covers slot spacing patterns (H5-001)
- ✅ No API changes required, only documentation

**Surface Component API:**
- ✅ Surface component EXISTS
- ✅ Surface API covers visual boundary patterns (H5-002)
- ✅ No API changes required, only documentation

**Section/Grid Spacing Tokens:**
- ✅ Tokens EXIST in spacing system
- ✅ No new tokens required, only documentation of canonical mapping

### Medium Risk Items

**Row Component Wrap Capability:**
- ⚠️ Row component EXISTS but lacks `wrap` prop
- ⚠️ Row inherits from Stack (LOCKED), cannot modify Stack
- ⚠️ Wrap capability must be added to Row without modifying Stack
- ⚠️ Design must ensure wrap is Row-specific (horizontal flow only)
- **Mitigation:** Wrap is additive API addition, non-breaking, Row-specific

### Low Risk Items (Optional)

**Flex Child Control API:**
- ⚠️ OPTIONAL design, not required for Phase H.1
- ⚠️ Prevents future DOM escapes but not critical
- ⚠️ Limited scope (flexGrow, flexOrder only)
- ⚠️ Explicit opt-in only, no default behavior
- **Mitigation:** Optional design, can be deferred to future phase if needed

### Overall Risk Assessment

**Overall Risk Level:** **LOW to MEDIUM**

- Most capabilities already exist (Grid, Section, Surface, tokens)
- Only Row wrap capability requires new design
- Flex child control is optional and can be deferred
- All designs are additive and non-breaking
- No modifications to locked components required

---

## Readiness Criteria for Implementation

Phase H.1 design is considered complete and ready for Phase H.2 (Implementation) when all of the following criteria are met:

### ✅ All CRITICAL H5 Findings Have Corresponding Designed Capability

- [x] H5-008 (FeatureSection grid) → Grid API verified
- [x] H5-009 (CTASection grid/flex) → Grid API verified + Row wrap designed
- [x] H5-010 (HeroSection grid/flex) → Grid API verified + Row wrap designed

### ✅ No API Introduces Parallel Expression Surfaces

- [x] All designed APIs use Foundation layout primitives (Grid, Row, Section, Surface)
- [x] No utility class alternatives remain for documented patterns
- [x] All layout intent expressed through component APIs

### ✅ No Closed System v2 Principle Violated

- [x] Single Expression Surface: All layout via Foundation APIs
- [x] Deterministic Rendering: Same intent → same result
- [x] No Hidden Channels: All layout expression explicit
- [x] Contract Completeness: APIs cover all documented patterns

### ✅ Design Remains Additive and Non-Breaking

- [x] No modifications to locked components (Stack, Grid, Container, Box)
- [x] Row wrap is additive API addition
- [x] Flex child control is optional and additive
- [x] No breaking changes to existing APIs

### ✅ Clear MUST/SHOULD/OPTIONAL Split Documented

- [x] MUST: Grid API verification, Row wrap capability, Section API verification, Section spacing tokens
- [x] SHOULD: Surface API verification, Grid gap tokens
- [x] OPTIONAL: Flex child control API

### ✅ Explicit Readiness Statement for Phase H.2

**Readiness Status:** ✅ **READY FOR PHASE H.2 (IMPLEMENTATION)**

All CRITICAL H5 findings have corresponding designed capabilities. Grid API is sufficient. Row wrap capability is designed. Section API is sufficient. Section/Grid spacing tokens exist and are documented. Surface API is sufficient. Flex child control is optional and can be deferred.

**Next Steps:**
1. Phase H.2 — Layout Capability Implementation
2. Implement Row wrap capability (additive, non-breaking)
3. Document canonical usage patterns for all designed APIs
4. Optional: Implement Flex child control API (if needed)

---

## Implementation Notes (Phase H.2)

**Date:** 2026-01-27  
**Task ID:** TUI_CSV2_PHASE_H2_LAYOUT_CAPABILITY_IMPLEMENTATION_020

### Row Wrap Implementation

**Status:** ✅ **IMPLEMENTED**

Row component wrap capability has been implemented as designed in Phase H.1:

- **API:** `wrap?: boolean` prop added to RowProps
- **Default:** `wrap={false}` → `flex-nowrap` (backward compatible)
- **Behavior:** When `wrap={true}`, applies `flex-wrap` class
- **Implementation:** Follows Inline component pattern, uses `cn()` utility to merge classes

**Files Modified:**
- `src/COMPOSITION/layout/Row/Row.tsx` - Wrap prop implementation
- `src/COMPOSITION/layout/Row/Row.test.tsx` - Wrap test cases added (7 new tests)
- `src/COMPOSITION/layout/Row/Row.stories.tsx` - Wrap examples added

**Canonical Usage:**
- Without wrap: `<Row spacing="md">` (default behavior, flex-nowrap)
- With wrap: `<Row spacing="md" wrap>` (flex-wrap)

**Addresses Phase H Findings:**
- H5-003 (SectionBuilder): `flex-wrap` needed → Row wrap supports this
- H5-009 (CTASection): `flex flex-wrap gap-md` → Row with `wrap` supports this
- H5-010 (HeroSection): `flex flex-wrap gap-md` → Row with `wrap` supports this

### Grid/Section/Surface Verification

**Status:** ✅ **VERIFIED — NO CHANGES NEEDED**

All three components have been verified against Phase H patterns:

**Grid Component:**
- ✅ API sufficient for all CRITICAL grid patterns (H5-008, H5-009, H5-010)
- ✅ Supports responsive columns (`cols={{ base: 1, md: 2 }}`)
- ✅ Supports token-based gap (`gap="lg"` or `gap={{ base: "lg", lg: "xl" }}`)
- ✅ Supports alignment (`align`, `justify`)

**Section Component:**
- ✅ API sufficient for slot spacing patterns (H5-001)
- ✅ Supports `spacing` prop for content block spacing
- ✅ Supports `spaceY` prop for vertical padding
- ✅ Uses Stack internally for spacing composition

**Surface Component:**
- ✅ API sufficient for visual boundary patterns (H5-002 acceptable as-is)
- ✅ Supports `variant` prop for surface elevation
- ✅ Supports `p` and `radius` props for padding and radius override

**Result:** No code changes required. All patterns are covered by existing APIs.

**Reference:** See [CLOSED_SYSTEM_V2_PHASE_H2_IMPLEMENTATION_REPORT.md](../../reports/CLOSED_SYSTEM_V2_PHASE_H2_IMPLEMENTATION_REPORT.md) for complete verification details.

---

## Related Documents

- [CLOSED_SYSTEM_V2_PHASE_H_LAYOUT_SEMANTICS_AUDIT.md](../../reports/CLOSED_SYSTEM_V2_PHASE_H_LAYOUT_SEMANTICS_AUDIT.md) - Phase H audit findings
- [CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md](./CLOSED_SYSTEM_V2_ARCHITECTURE_MODEL.md) - Closed System v2 principles
- [CLOSED_SYSTEM_V2_TYPOGRAPHY_SEMANTICS_CANON.md](./CLOSED_SYSTEM_V2_TYPOGRAPHY_SEMANTICS_CANON.md) - Typography Semantics Canon (Phase J.1)
- [LAYOUT_AUTHORITY.md](../LAYOUT_AUTHORITY.md) - Layout Authority contract
- [SPACING_AUTHORITY.md](../SPACING_AUTHORITY.md) - Spacing Authority contract
- [FOUNDATION_LOCK.md](../FOUNDATION_LOCK.md) - Foundation layer lock status

---

**Last Updated:** 2026-01-27  
**Task ID:** TUI_CSV2_PHASE_H1_LAYOUT_CAPABILITY_DESIGN_019  
**Status:** ✅ **COMPLETE** — Ready for Phase H.2 (Implementation)
