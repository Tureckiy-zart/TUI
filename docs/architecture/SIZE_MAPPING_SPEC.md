# Size Mapping Spec Authority Contract

**Status:** ✅ ACTIVE  
**Priority:** CRITICAL  
**Date Created:** 2025-12-22  
**Version:** 1.0  
**Enforcement:** TUNG_SIZE_MAPPING_SPEC_AUTHORITY_01

---

## Document Classification

**TYPE:** AUTHORITY  
**MUTABILITY:** IMMUTABLE  
**LOCK STATUS:** ✅ ACTIVE  
**AUTHORITY DOMAIN:** Size Mapping Spec Authority

**Purpose:** This document defines the canonical mapping contract between `size` props and tokenized layout primitives (height, padding, text, radius, gap, icon) for all UI components. It establishes architectural law for size-to-token mapping, ensuring predictability, easy migration, consistent developer experience, and enabling automated audits.

**Key Principle:** This document defines **HOW** size maps to tokens, not **WHAT** the token values are. All mappings must reference token namespaces only—no raw numeric values, no CSS units, no component-specific calculations.

---

## Overview

This document defines the canonical Size Mapping Spec Authority contract for all UI components that expose a public `size` prop. It establishes:

- **Mapping contract** - Mandatory mapping keys that every sized component must provide
- **Template table** - Copy-pasteable Markdown template for documenting component size mappings
- **Component class rules** - Specific rules for Interactive, Surface, and Overlay components
- **Storybook requirements** - How size mappings must be demonstrated in component stories
- **Enforcement hooks** - Integration with 18A pipeline and PR gating requirements

**This spec acts as an enforceable template for all components and a foundation for Storybook matrix + automated audits.**

---

## Authority Chain

**Size Mapping Spec Authority** is the single source of truth for size-to-token mapping across all UI components in the design system.

**Authority Hierarchy:**
1. **Variants & Size Canon Authority** ([VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md)) - Defines global size scale (xs..3xl) and component subset declarations
2. **Size Mapping Spec Authority** (this document) - Defines how size maps to tokenized layout primitives
3. **Token Authorities** - Define actual token values:
   - [SPACING_AUTHORITY.md](./SPACING_AUTHORITY.md) - Spacing token values
   - [TYPOGRAPHY_AUTHORITY.md](./TYPOGRAPHY_AUTHORITY.md) - Typography token values
   - [RADIUS_AUTHORITY.md](./RADIUS_AUTHORITY.md) - Radius token values
4. **Component Implementation** - Components implement mappings using token references

---

## 1. Purpose

### Why This Spec Exists

This mapping spec exists to ensure:

- **Predictability** - Developers can understand how size affects component dimensions without reading implementation code
- **Easy Migration** - Size changes can be tracked and migrated systematically across the design system
- **Consistent DX** - All components follow the same mapping pattern, reducing cognitive load
- **Automated Audits** - Mapping tables enable automated validation of size-to-token consistency

### What This Spec Is NOT

- ❌ **NOT a token value document** - This spec references tokens only, it does not define token numeric values
- ❌ **NOT a component implementation guide** - This spec defines the mapping contract, not how to implement it
- ❌ **NOT a design system documentation** - This spec is an architectural contract, not user-facing documentation

**Reference:** Token values are defined in their respective authority documents (SPACING_AUTHORITY, TYPOGRAPHY_AUTHORITY, RADIUS_AUTHORITY).

---

## 2. Scope

### What Is Covered

This spec covers:

- ✅ Mapping of `size` prop to tokenized dimensions for components that expose a public `size` prop
- ✅ Mandatory mapping keys that every sized component must declare
- ✅ Template for documenting size mappings in a standardized format
- ✅ Rules for different component classes (Interactive, Surface, Overlay)
- ✅ Storybook requirements tied to size mappings

### What Is NOT Covered

This spec does NOT cover:

- ❌ Actual token numeric values (defined in token authority documents)
- ❌ Color variants (covered by VARIANTS_SIZE_CANON)
- ❌ Motion/animation tokens (covered by MOTION_AUTHORITY)
- ❌ Components without a public `size` prop (out of scope)
- ❌ Internal component sizing logic (implementation detail)

---

## 3. Definitions

### GlobalSize

**Definition:** The canonical size scale that all components must use.

```typescript
type GlobalSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
```

**Reference:** See [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md) for complete GlobalSize definition and canonical values.

**Rule:** ✅ All size props MUST use only GlobalSize values. Any non-GlobalSize entries (e.g., `'icon'`, `'tiny'`, `'huge'`) are FORBIDDEN.

**CRITICAL RULE:** The GlobalSize axis stays `sm | md | lg` (for interactive components) or full scale (for typography). `iconOnly` is a **separate boolean behavior prop**, NOT a size value. Using `size="icon"` is **FORBIDDEN** (❌). Icon-only buttons use `iconOnly={true}` with a GlobalSize value (e.g., `size="md"`).

**Reference:** See [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md) "Forbidden Patterns" section for complete list of forbidden non-GlobalSize values.

### Supported Subset

**Definition:** A component may expose only a subset of the global size scale. The component MUST explicitly declare which sizes it supports.

**Example:**
- Button: `supportedSizes: ["sm", "md", "lg"]` (subset of global scale)
- Typography: `supportedSizes: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl"]` (full scale)

**Rule:** ✅ Components MUST declare `supportedSizes` explicitly. Components cannot invent size names outside the global scale.

**Reference:** See [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md) "Component-Specific Subset Declarations" section for complete rules on component subset declarations.

### Overlay Strict Subset

**Definition:** Overlay components (Popover, Tooltip, etc.) that expose a public `size` prop MUST restrict `supportedSizes` to `sm | md | lg` only.

**CRITICAL RULE:** If an Overlay component exposes a public `size` prop, it **MUST** restrict `supportedSizes` to `sm | md | lg` only. Any `xs`, `xl`, `2xl`, or `3xl` sizes for overlays are **FORBIDDEN** (❌).

**Reference:** See [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md) "CRITICAL: Overlay Size Restriction Rule" section.

**Rationale:** Overlay components are informational surfaces that require consistent, accessible sizing that aligns with interactive component size scale.

### Size Tokens

**Definition:** Token references used in size mappings. Size tokens are references to token namespaces only—no raw values, no CSS units.

**Token Namespaces:**
- `SPACING_TOKENS.*` - Spacing token references (e.g., `semanticSpacing.sm`, `semanticSpacing.md`)
- `TYPOGRAPHY_TOKENS.*` - Typography token references (e.g., `fontSize.sm`, `fontSize.base`)
- `RADIUS_TOKENS.*` - Radius token references (e.g., `borderRadius.md`, `componentRadius.button.md`)
- `{COMPONENT}_TOKENS.*` - Component-specific token references (e.g., `BUTTON_TOKENS.height.sm`, `INPUT_TOKENS.padding.horizontal.md`)

**Rule:** ✅ All mappings MUST reference tokens only. No raw numeric values, no `rem`/`px` units, no calculations.

---

## 4. The Mapping Contract (CRITICAL)

### Mandatory Mapping Keys

Every component that exposes a public `size` prop **MUST** provide a mapping table that declares the following keys for each supported size:

#### Required Keys

1. **heightToken** - Token reference for component height
   - ✅ Required for interactive components (Button, Input, Select, etc.)
   - ⚠️ Often `N/A` for surface components (Card, etc.)
   - ⚠️ Often `N/A` for overlay components (Popover, Tooltip)

2. **paddingXToken** - Token reference for horizontal padding (left + right)
   - ✅ Required for all sized components
   - Example: `semanticSpacing.sm`, `semanticSpacing.md`, `BUTTON_TOKENS.padding.horizontal.sm`

3. **paddingYToken** - Token reference for vertical padding (top + bottom)
   - ✅ Required for all sized components
   - Example: `semanticSpacing.xs`, `semanticSpacing.sm`, `BUTTON_TOKENS.padding.vertical.md`

4. **textToken** (or **textStyleToken**) - Token reference for text size/style
   - ✅ Required for all sized components with text content
   - Example: `fontSize.sm`, `fontSize.base`, `TYPOGRAPHY_TOKENS.fontSize.md`

5. **radiusToken** - Token reference for border radius
   - ✅ Required for all sized components
   - Example: `borderRadius.md`, `componentRadius.button.md`, `RADIUS_TOKENS.component.button.md`

#### Optional Keys (Must Be Declared)

6. **gapToken** - Token reference for gap between compound content (icon + text, etc.)
   - ⚠️ Optional but must be declared (use `N/A` if not applicable)
   - Example: `semanticSpacing.xs`, `semanticSpacing.sm`, `BUTTON_TOKENS.gap.md`

7. **iconSizeToken** - Token reference for icon size within component
   - ⚠️ Optional but must be declared (use `N/A` if component does not support icons)
   - Example: `BUTTON_TOKENS.iconSize.sm`, `ICON_TOKENS.size.md`

8. **minWidthToken** - Token reference for minimum width
   - ⚠️ Optional but must be declared (use `N/A` if not applicable)
   - Example: `BUTTON_TOKENS.minWidth.sm`, `WIDTH_TOKENS.min.sm`

9. **hitAreaToken** - Token reference for touch target size (accessibility)
   - ⚠️ Optional but must be declared
   - ✅ If component relies on height/padding only for hit area, declare as `N/A` or `"heightToken + paddingYToken"`
   - Example: `HIT_AREA_TOKENS.min.md`, `"heightToken + paddingYToken"`

10. **maxWidthToken** - Token reference for maximum width (primarily for overlays)
    - ⚠️ Optional but must be declared (use `N/A` if not applicable)
    - Example: `POPOVER_TOKENS.maxWidth.md`, `WIDTH_TOKENS.max.lg`

### NotApplicable Policy

**Rule:** Explicit `N/A` is allowed but must be intentional and documented.

- ✅ Use `N/A` when a mapping key is not applicable to the component
- ✅ Document why `N/A` is used in the "Notes" column
- ❌ Do not omit mapping keys—all keys must be present in the table

**Example:**
- Surface component (Card): `heightToken: N/A` (surface components don't have fixed height)
- Component without icons: `iconSizeToken: N/A` (component does not support icons)

### No Raw Values Policy

**CRITICAL RULE:** Mapping can only reference tokens. No raw values allowed.

**Forbidden:**
- ❌ `heightToken: "32px"` (raw pixel value)
- ❌ `paddingXToken: "0.5rem"` (raw rem value)
- ❌ `textToken: "14px"` (raw pixel value)
- ❌ `radiusToken: "6px"` (raw pixel value)

**Correct:**
- ✅ `heightToken: "BUTTON_TOKENS.height.sm"` (token reference)
- ✅ `paddingXToken: "semanticSpacing.sm"` (token reference)
- ✅ `textToken: "fontSize.sm"` (token reference)
- ✅ `radiusToken: "componentRadius.button.md"` (token reference)

**Rationale:** Raw values break token system consistency and prevent automated audits. All values must come from token authorities.

---

## 5. Template: Size Mapping Table (REQUIRED)

### Copy-Pasteable Template

Use this template for documenting component size mappings. Replace placeholders with actual token references.

```markdown
## {ComponentName} Size Mapping

**SupportedSizes:** `["sm", "md", "lg"]` (or full scale: `["xs", "sm", "md", "lg", "xl", "2xl", "3xl"]`)

**Defaults:** 
- Default size: `md`
- Fallback behavior: If size not provided, use `md`

| Size | heightToken | paddingXToken | paddingYToken | textToken | radiusToken | gapToken | iconSizeToken | minWidthToken | hitAreaToken | maxWidthToken | Notes |
|------|-------------|---------------|---------------|-----------|-------------|----------|---------------|---------------|--------------|---------------|-------|
| xs   | ...         | ...           | ...           | ...       | ...         | ...      | ...           | ...           | ...          | ...           | ...   |
| sm   | ...         | ...           | ...           | ...       | ...         | ...      | ...           | ...           | ...          | ...           | ...   |
| md   | ...         | ...           | ...           | ...       | ...         | ...      | ...           | ...           | ...          | ...           | ...   |
| lg   | ...         | ...           | ...           | ...       | ...         | ...      | ...           | ...           | ...          | ...           | ...   |
| xl   | ...         | ...           | ...           | ...       | ...         | ...      | ...           | ...           | ...          | ...           | ...   |
| 2xl  | ...         | ...           | ...           | ...       | ...         | ...      | ...           | ...           | ...          | ...           | ...   |
| 3xl  | ...         | ...           | ...           | ...       | ...         | ...      | ...           | ...           | ...          | ...           | ...   |
```

### Template Usage Rules

1. **SupportedSizes Line** - Explicitly list all sizes the component supports (subset of GlobalSize)
2. **Defaults Line** - Document default size and fallback behavior
3. **Table Rows** - Include rows only for sizes in `SupportedSizes` (do not include unsupported sizes)
4. **Token References** - Use token namespace references only (no raw values)
5. **N/A Values** - Use `N/A` explicitly when a key is not applicable
6. **Notes Column** - Document special cases, exceptions, or important details

### Template Example (Minimal)

```markdown
## ExampleComponent Size Mapping

**SupportedSizes:** `["sm", "md", "lg"]`

**Defaults:** Default size: `md`

| Size | heightToken | paddingXToken | paddingYToken | textToken | radiusToken | gapToken | iconSizeToken | minWidthToken | hitAreaToken | maxWidthToken | Notes |
|------|-------------|---------------|---------------|-----------|-------------|----------|---------------|---------------|--------------|---------------|-------|
| sm   | COMPONENT_TOKENS.height.sm | semanticSpacing.sm | semanticSpacing.xs | fontSize.sm | borderRadius.md | semanticSpacing.xs | N/A | N/A | "heightToken + paddingYToken" | N/A | Small size variant |
| md   | COMPONENT_TOKENS.height.md | semanticSpacing.md | semanticSpacing.sm | fontSize.base | borderRadius.md | semanticSpacing.sm | N/A | N/A | "heightToken + paddingYToken" | N/A | Default size |
| lg   | COMPONENT_TOKENS.height.lg | semanticSpacing.lg | semanticSpacing.md | fontSize.lg | borderRadius.md | semanticSpacing.md | N/A | N/A | "heightToken + paddingYToken" | N/A | Large size variant |
```

---

## 6. Component Class Rules

### Interactive Components (Button, Input, Select, etc.)

**Expected Mappings:**
- ✅ Must map `heightToken`, `paddingXToken`, `paddingYToken`, `textToken`, `radiusToken`
- ✅ May declare `iconSizeToken` if component supports icons
- ✅ May declare `gapToken` if component has compound content (icon + text)
- ✅ May declare `minWidthToken` for minimum touch target compliance

**Rules:**
1. ✅ **MUST** map height, padding, text, and radius for all supported sizes
2. ✅ **MUST** declare `iconSizeToken` as `N/A` if component does not support icons
3. ❌ **MUST NOT** use raw values—all mappings must reference tokens only

**Reference:** See [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md) for Interactive component size restrictions (`sm | md | lg`).

### Surface Components (Card, Badge, etc.)

**Expected Mappings:**
- ✅ Must map `paddingXToken`, `paddingYToken`, `textToken`, `radiusToken`
- ⚠️ `heightToken` often `N/A` (surface components don't have fixed height)
- ⚠️ `gapToken` may be `N/A` if component has no compound content
- ⚠️ `iconSizeToken` may be `N/A` if component does not support icons

**Rules:**
1. ✅ **MUST** map padding, text, and radius for all supported sizes
2. ✅ **MUST** explicitly declare `heightToken: N/A` if component has no fixed height
3. ❌ **MUST NOT** use raw values—all mappings must reference tokens only

**Note:** Surface components may support full size scale or subsets depending on use case.

### Overlay Components (Popover, Tooltip, etc.)

**Expected Mappings:**
- ✅ Must map `paddingXToken`, `paddingYToken`, `textToken`, `radiusToken`
- ⚠️ `heightToken` often `N/A` (overlays are content-driven, not fixed height)
- ⚠️ `maxWidthToken` often required for overlays (content width constraints)
- ⚠️ `iconSizeToken` often `N/A` (overlays are informational, not interactive controls)

**CRITICAL RULES:**
1. ✅ **MUST** restrict `supportedSizes` to `sm | md | lg` only (CRITICAL overlay size rule)
2. ✅ **MUST** map padding, text, and radius for all supported sizes
3. ❌ **MUST NOT** use `xs`, `xl`, `2xl`, or `3xl` sizes (forbidden for overlays)

**Reference:** See [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md) "CRITICAL: Overlay Size Restriction Rule" section.

**Note:** Variant rules for overlays are deferred to VARIANTS_SIZE_CANON (overlays must NOT use InteractiveVariant).

---

## 7. Storybook Requirements (Tied to Mapping)

**Canonical Story Names:** All canonical story names are defined in [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md). This section describes size-specific mapping requirements and intent, but does not define canonical naming.

### Sizes Gallery Story (REQUIRED)

**Canonical Name:** `SizesGallery` (defined in VARIANTS_SIZE_CANON.md)

**Rule:** Every component that exposes a public `size` prop **MUST** include a "Sizes Gallery" story.

**Requirements:**
- ✅ Single row per size demonstrating all supported sizes
- ✅ Demonstrate text content where applicable
- ✅ Demonstrate icon content where applicable (if component supports icons)
- ✅ Demonstrate multi-line content where applicable
- ✅ Stories must NOT hardcode spacing—use component API only

**Example Structure:**
```typescript
export const SizesGallery: Story = {
  render: () => {
    const sizes = ["sm", "md", "lg"]; // Component's supportedSizes
    
    return (
      <div className="space-y-lg">
        {sizes.map(size => (
          <div key={size}>
            <h3>Size: {size}</h3>
            <Component size={size}>
              {/* Text content */}
              {/* Icon content if applicable */}
              {/* Multi-line content if applicable */}
            </Component>
          </div>
        ))}
      </div>
    );
  }
};
```

### Matrix Story (If Component Has Variants)

**Canonical Name:** `Matrix` (defined in VARIANTS_SIZE_CANON.md)

**Rule:** If component supports both `size` and `variant` props, Matrix story is REQUIRED.

**Reference:** See [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md) "Storybook Requirements" section for Matrix story rules and requirement conditions.

**Note:** Matrix story rules and requirement conditions are defined in VARIANTS_SIZE_CANON. This spec focuses on size-specific story requirements.

### Overlay Long Content Story (REQUIRED for Overlays)

**Canonical Name:** `LongContent` (defined in VARIANTS_SIZE_CANON.md)

**Rule:** Overlay components **MUST** include at least one story with long content to validate padding and maxWidth token behavior.

**Requirements:**
- ✅ Demonstrate padding behavior with long text content
- ✅ Demonstrate maxWidth token behavior (if maxWidthToken is declared)
- ✅ Validate that overlay does not overflow or break layout

**Rationale:** Overlays are content-driven and must handle variable content lengths gracefully. Long content stories validate token behavior under realistic conditions.

---

## 8. Audit & Enforcement Hooks

### 18A Pipeline STEP 5 Integration

**Integration Point:** Token/Size/Variant Consistency validation step.

**How This Spec Is Used:**
1. **Validation Step:** Pipeline checks that every component with a public `size` prop has a documented mapping table
2. **Consistency Check:** Pipeline validates that mapping table token references match actual component token usage
3. **Subset Verification:** Pipeline verifies that component `supportedSizes` matches mapping table rows
4. **Overlay Rule Enforcement:** Pipeline verifies that overlay components restrict to `sm | md | lg` only

**Future Enhancement:** Automated mapping table generation from component token definitions.

### Future Lint/Audit Rule

**Rule Concept:** "If component has size prop, it must have a mapping table in docs/specs/"

**Enforcement:**
- ✅ Lint rule checks for `size` prop in component TypeScript definition
- ✅ Lint rule verifies mapping table exists in `docs/reports/specs/{ComponentName}_SIZE_MAPPING.md` or component documentation
- ❌ Lint fails if mapping table is missing

**Implementation:** This rule will be added to the project linting configuration in a future update.

### PR Gating Requirements

**Strict Acceptance Criteria:**

1. ✅ **New Sized Component:** PR cannot be merged if mapping table is missing for a new component with `size` prop
2. ✅ **Size Prop Addition:** PR cannot be merged if existing component adds `size` prop without adding mapping table
3. ✅ **Token Reference Validation:** PR cannot be merged if mapping table contains raw values (must use token references only)
4. ✅ **Overlay Size Validation:** PR cannot be merged if overlay component uses sizes beyond `sm | md | lg`

**Enforcement:** These requirements will be enforced via:
- Pre-commit hooks (future)
- CI/CD pipeline checks (future)
- Code review checklist (immediate)

**Reference:** See existing enforcement patterns in [FOUNDATION_LOCK.md](./FOUNDATION_LOCK.md) for similar PR gating requirements.

### Enforcement Clarity

**Storybook Story Naming Authority:** Canonical story names (Matrix, States, SizesGallery, LongContent) are defined in [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md). This spec describes size-specific mapping requirements and intent but does not define canonical naming.

#### ✅ Current Enforcement

- Mapping table validation (manual code review)
- Storybook story requirements validation (manual code review)
- Overlay size restriction enforcement (manual code review)
- Token reference validation (manual code review)

#### 🧭 Planned Enforcement

- Automated mapping table generation from component token definitions
- Lint rule: "If component has size prop, it must have a mapping table in docs/specs/"
- CI/CD pipeline checks for mapping table completeness
- Pre-commit hooks for mapping table validation

**Note:** Enforcement scope is limited to size mapping requirements. Storybook story naming authority and requirement conditions are enforced via VARIANTS_SIZE_CANON.md.

---

## 9. Examples (REQUIRED)

### Example 1: Button (Interactive Component)

**Component:** Button  
**Type:** Interactive  
**SupportedSizes:** `["sm", "md", "lg"]`  
**Special Notes:** Button supports icons and has `iconOnly` prop for icon-only buttons (canonical API)

| Size | heightToken | paddingXToken | paddingYToken | textToken | radiusToken | gapToken | iconSizeToken | minWidthToken | hitAreaToken | maxWidthToken | Notes |
|------|-------------|---------------|---------------|-----------|-------------|----------|---------------|---------------|--------------|---------------|-------|
| sm   | BUTTON_TOKENS.height.sm | BUTTON_TOKENS.padding.horizontal.sm | BUTTON_TOKENS.padding.vertical.sm | fontSize.xs | componentRadius.button.md | BUTTON_TOKENS.gap.sm | BUTTON_TOKENS.iconSize.sm | N/A | "heightToken + paddingYToken" | N/A | Small button size |
| md   | BUTTON_TOKENS.height.md | BUTTON_TOKENS.padding.horizontal.md | BUTTON_TOKENS.padding.vertical.md | fontSize.sm | componentRadius.button.md | BUTTON_TOKENS.gap.md | BUTTON_TOKENS.iconSize.md | N/A | "heightToken + paddingYToken" | N/A | Default button size |
| lg   | BUTTON_TOKENS.height.lg | BUTTON_TOKENS.padding.horizontal.lg | BUTTON_TOKENS.padding.vertical.lg | fontSize.base | componentRadius.button.md | BUTTON_TOKENS.gap.lg | BUTTON_TOKENS.iconSize.lg | N/A | "heightToken + paddingYToken" | N/A | Large button size |

**Token References:**
- `BUTTON_TOKENS.height.*` - Component-specific height tokens
- `BUTTON_TOKENS.width.*` - Component-specific width tokens (for icon-only square buttons)
- `BUTTON_TOKENS.padding.horizontal.*` - Component-specific horizontal padding (regular buttons)
- `BUTTON_TOKENS.padding.vertical.*` - Component-specific vertical padding (regular buttons)
- `BUTTON_TOKENS.paddingIconOnly` - Zero padding token for icon-only buttons
- `fontSize.*` - Typography Authority fontSize tokens (regular buttons only, N/A for iconOnly)
- `componentRadius.button.md` - Radius Authority component radius token
- `BUTTON_TOKENS.gap.*` - Component-specific gap tokens (regular buttons only, N/A for iconOnly)
- `BUTTON_TOKENS.iconSize.*` - Component-specific icon size tokens

**Icon-Only Button Mapping (iconOnly={true}):**

When `iconOnly={true}`, Button uses square dimensions (equal width and height) derived from the `size` prop:

| Size | heightToken | paddingXToken | paddingYToken | textToken | radiusToken | gapToken | iconSizeToken | minWidthToken | hitAreaToken | maxWidthToken | Notes |
|------|-------------|---------------|---------------|-----------|-------------|----------|---------------|---------------|--------------|---------------|-------|
| sm (iconOnly) | BUTTON_TOKENS.height.sm | BUTTON_TOKENS.paddingIconOnly | BUTTON_TOKENS.paddingIconOnly | N/A | componentRadius.button.md | N/A | BUTTON_TOKENS.iconSize.sm | N/A | "heightToken + paddingYToken" | N/A | Square icon-only button (width matches height via BUTTON_TOKENS.width.sm) |
| md (iconOnly) | BUTTON_TOKENS.height.md | BUTTON_TOKENS.paddingIconOnly | BUTTON_TOKENS.paddingIconOnly | N/A | componentRadius.button.md | N/A | BUTTON_TOKENS.iconSize.md | N/A | "heightToken + paddingYToken" | N/A | Square icon-only button (width matches height via BUTTON_TOKENS.width.md) |
| lg (iconOnly) | BUTTON_TOKENS.height.lg | BUTTON_TOKENS.paddingIconOnly | BUTTON_TOKENS.paddingIconOnly | N/A | componentRadius.button.md | N/A | BUTTON_TOKENS.iconSize.lg | N/A | "heightToken + paddingYToken" | N/A | Square icon-only button (width matches height via BUTTON_TOKENS.width.lg) |

**Icon-Only Token References:**
- `BUTTON_TOKENS.width.*` - Component-specific width tokens (for icon-only square buttons)
- `BUTTON_TOKENS.paddingIconOnly` - Zero padding token for icon-only buttons

**Icon-Only API (Current Implementation):** Button supports `iconOnly?: boolean` prop (current API). When `iconOnly={true}`, button uses square dimensions (equal width and height) derived from the `size` prop. The `size` prop continues to use only GlobalSize values (`sm`, `md`, `lg`). 

**Current Usage Example:**
```typescript
// ✅ CORRECT - iconOnly prop with GlobalSize value
<Button iconOnly size="md" aria-label="Search">
  <SearchIcon />
</Button>

// ❌ FORBIDDEN - size="icon" is not a GlobalSize value
<Button size="icon" aria-label="Search">
  <SearchIcon />
</Button>
```

**Rule:** `iconOnly` is a separate boolean behavior axis, not part of the GlobalSize axis. The GlobalSize axis stays `sm | md | lg`; `iconOnly` is a boolean prop that modifies rendering behavior.

**Reference:** See [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md) for complete icon-only button pattern.

### Example 2: Input (Interactive Component)

**Component:** Input  
**Type:** Interactive  
**SupportedSizes:** `["sm", "md", "lg"]`  
**Special Notes:** Input supports icon slots (iconLeft, iconRight) but icon size is handled via padding, not iconSizeToken

| Size | heightToken | paddingXToken | paddingYToken | textToken | radiusToken | gapToken | iconSizeToken | minWidthToken | hitAreaToken | maxWidthToken | Notes |
|------|-------------|---------------|---------------|-----------|-------------|----------|---------------|---------------|--------------|---------------|-------|
| sm   | INPUT_TOKENS.height.sm | INPUT_TOKENS.padding.horizontal.sm | INPUT_TOKENS.padding.vertical.sm | fontSize.sm | borderRadius.md | N/A | N/A | N/A | "heightToken + paddingYToken" | N/A | Small input size |
| md   | INPUT_TOKENS.height.md | INPUT_TOKENS.padding.horizontal.md | INPUT_TOKENS.padding.vertical.md | fontSize.base | borderRadius.md | N/A | N/A | N/A | "heightToken + paddingYToken" | N/A | Default input size |
| lg   | INPUT_TOKENS.height.lg | INPUT_TOKENS.padding.horizontal.lg | INPUT_TOKENS.padding.vertical.lg | fontSize.base | borderRadius.md | N/A | N/A | N/A | "heightToken + paddingYToken" | N/A | Large input size |

**Token References:**
- `INPUT_TOKENS.height.*` - Component-specific height tokens
- `INPUT_TOKENS.padding.horizontal.*` - Component-specific horizontal padding
- `INPUT_TOKENS.padding.vertical.*` - Component-specific vertical padding
- `fontSize.*` - Typography Authority fontSize tokens
- `borderRadius.md` - Radius Authority base radius token

**Note:** Input icon size is handled via padding adjustments (iconLeft/iconRight slots), not via iconSizeToken. Icon size is fixed and does not scale with input size.

### Example 3: Popover (Overlay Component)

**Component:** Popover  
**Type:** Overlay  
**SupportedSizes:** `["sm", "md", "lg"]` (CRITICAL: Overlay strict subset)  
**Special Notes:** Popover is an overlay component—must restrict to sm|md|lg only per CRITICAL overlay size rule

| Size | heightToken | paddingXToken | paddingYToken | textToken | radiusToken | gapToken | iconSizeToken | minWidthToken | hitAreaToken | maxWidthToken | Notes |
|------|-------------|---------------|---------------|-----------|-------------|----------|---------------|---------------|--------------|---------------|-------|
| sm   | N/A | POPOVER_TOKENS.padding.horizontal.sm | POPOVER_TOKENS.padding.vertical.sm | fontSize.sm | borderRadius.md | N/A | N/A | N/A | N/A | POPOVER_TOKENS.maxWidth.sm | Small overlay size |
| md   | N/A | POPOVER_TOKENS.padding.horizontal.md | POPOVER_TOKENS.padding.vertical.md | fontSize.base | borderRadius.md | N/A | N/A | N/A | N/A | POPOVER_TOKENS.maxWidth.md | Default overlay size |
| lg   | N/A | POPOVER_TOKENS.padding.horizontal.lg | POPOVER_TOKENS.padding.vertical.lg | fontSize.base | borderRadius.lg | N/A | N/A | N/A | N/A | POPOVER_TOKENS.maxWidth.lg | Large overlay size |

**Token References:**
- `POPOVER_TOKENS.padding.horizontal.*` - Component-specific horizontal padding
- `POPOVER_TOKENS.padding.vertical.*` - Component-specific vertical padding
- `fontSize.*` - Typography Authority fontSize tokens
- `borderRadius.*` - Radius Authority radius tokens
- `POPOVER_TOKENS.maxWidth.*` - Component-specific max width tokens

**CRITICAL Rule Compliance:**
- ✅ Restricted to `sm | md | lg` only (overlay strict subset)
- ✅ No `xs`, `xl`, `2xl`, or `3xl` sizes (forbidden for overlays)
- ✅ `heightToken: N/A` (overlays are content-driven, not fixed height)
- ✅ `maxWidthToken` declared (overlays require width constraints)

**Reference:** See [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md) "CRITICAL: Overlay Size Restriction Rule" section.

---

## 10. Do / Don't (STRICT)

### ✅ DO

1. ✅ **DO** declare all mandatory mapping keys for every supported size (even if `N/A`)
2. ✅ **DO** use token references only—all mappings must reference token namespaces
3. ✅ **DO** explicitly declare `supportedSizes` subset (component may not support full GlobalSize scale)
4. ✅ **DO** restrict overlay components to `sm | md | lg` only (CRITICAL overlay size rule)
5. ✅ **DO** create a mapping table for any component that exposes a public `size` prop
6. ✅ **DO** document special cases in the "Notes" column of the mapping table
7. ✅ **DO** use `N/A` explicitly when a mapping key is not applicable (do not omit keys)
8. ✅ **DO** include "Sizes Gallery" story for all sized components in Storybook
9. ✅ **DO** use `iconOnly` boolean prop for icon-only buttons (separate behavior axis, not a size value)

### ❌ DON'T

1. ❌ **DON'T** use raw values in mappings (no `"32px"`, no `"0.5rem"`, no numeric calculations)
2. ❌ **DON'T** use `size="icon"` or any non-GlobalSize values (forbidden per VARIANTS_SIZE_CANON)
3. ❌ **DON'T** omit mapping keys—all keys must be present in the table (use `N/A` if not applicable)
4. ❌ **DON'T** use sizes beyond `sm | md | lg` for overlay components (forbidden per CRITICAL overlay rule)
5. ❌ **DON'T** encode states as variants—states are props, variants are style choices (reference VARIANTS_SIZE_CANON)
6. ❌ **DON'T** hardcode spacing in Storybook stories—use component API only
7. ❌ **DON'T** create a component with `size` prop without documenting the mapping table
8. ❌ **DON'T** mix token namespaces—use consistent token reference patterns within a component
9. ❌ **DON'T** treat `iconOnly` as a size value—it is a separate boolean behavior prop (GlobalSize axis stays `sm | md | lg`)

---

## Future Component Compliance

### How Future Components Comply

**Rule:** Any new component that exposes a public `size` prop **MUST** add its own mapping table.

**Compliance Options:**

1. **Per-Component Spec File** (Recommended)
   - Create `docs/reports/specs/{ComponentName}_SIZE_MAPPING.md`
   - Use the template from Section 5
   - Reference this authority document

2. **Registry Section** (Alternative)
   - Add mapping table to a centralized registry document
   - Maintain registry in `docs/reports/specs/SIZE_MAPPING_REGISTRY.md`
   - Each component gets one table entry

3. **Component Documentation** (Acceptable)
   - Include mapping table in component's main documentation file
   - Must use the template format from Section 5
   - Must reference this authority document

**Enforcement:** PR cannot be merged if mapping table is missing for a new sized component (see Section 8).

---

## Integration with Existing Authorities

### Variants & Size Canon Authority

**Relationship:** [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md) defines the global size scale and component subset declarations.

**This Authority:** Defines how size maps to tokenized layout primitives.

**Compatibility:** This spec enforces VARIANTS_SIZE_CANON rules:
- ✅ GlobalSize compliance (xs..3xl only)
- ✅ Overlay strict subset (sm|md|lg only)
- ✅ Component subset declarations

### Spacing Authority

**Relationship:** [SPACING_AUTHORITY.md](./SPACING_AUTHORITY.md) defines spacing token values.

**This Authority:** References spacing tokens in mappings (e.g., `semanticSpacing.sm`, `semanticSpacing.md`).

**Compatibility:** All `paddingXToken` and `paddingYToken` mappings reference SPACING_AUTHORITY tokens.

### Typography Authority

**Relationship:** [TYPOGRAPHY_AUTHORITY.md](./TYPOGRAPHY_AUTHORITY.md) defines typography token values.

**This Authority:** References typography tokens in mappings (e.g., `fontSize.sm`, `fontSize.base`).

**Compatibility:** All `textToken` mappings reference TYPOGRAPHY_AUTHORITY tokens.

### Radius Authority

**Relationship:** [RADIUS_AUTHORITY.md](./RADIUS_AUTHORITY.md) defines radius token values.

**This Authority:** References radius tokens in mappings (e.g., `borderRadius.md`, `componentRadius.button.md`).

**Compatibility:** All `radiusToken` mappings reference RADIUS_AUTHORITY tokens.

---

## Unlock Procedure

Any Size Mapping Spec Authority modifications require:

1. Explicit unlock task with justification
2. Full audit of all component size mappings
3. Impact analysis of proposed changes
4. Explicit approval for changes
5. Re-verification of all components after changes
6. Re-lock with updated documentation

**Note:** Size Mapping Spec Authority lock applies to **BOTH humans and AI agents**. Any request to modify locked authority aspects **MUST** be refused with reference to the Size Mapping Spec Authority lock.

**Do not modify Size Mapping Spec Authority without explicit 'Unlock Size Mapping Spec Authority' task approval.**

---

## Related Documents

- [VARIANTS_SIZE_CANON.md](./VARIANTS_SIZE_CANON.md) - Global size scale and variant naming dictionary
- [SPACING_AUTHORITY.md](./SPACING_AUTHORITY.md) - Spacing token values
- [TYPOGRAPHY_AUTHORITY.md](./TYPOGRAPHY_AUTHORITY.md) - Typography token values
- [RADIUS_AUTHORITY.md](./RADIUS_AUTHORITY.md) - Radius token values
- [AUTHORITY_NAVIGATION.md](./AUTHORITY_NAVIGATION.md) - Authority navigation map
- [FOUNDATION_LOCK.md](./FOUNDATION_LOCK.md) - Foundation lock status

---

**Status:** ✅ **ACTIVE**  
**Version:** 1.0  
**Date Created:** 2025-12-22  
**Last Updated:** 2025-12-22  
**Priority:** CRITICAL  
**Authority Domain:** Size Mapping Spec Authority

---

## CHANGELOG

### 2025-12-22 — Icon-Only Pattern Alignment (TUI_TUNG_VARIANTS_SYNC_001)

**Changes:**
- ✅ Updated Button example: supportedSizes = `["sm", "md", "lg"]` only
- ✅ Added explicit note: `iconOnly` is a separate prop, not part of size
- ✅ Updated Icon-Only API section: Changed from "Future API" to "Current Implementation"
- ✅ Added explicit rule: GlobalSize axis stays `sm | md | lg`; `iconOnly` is a separate boolean behavior prop
- ✅ Added DO/DON'T rules for iconOnly usage

**Rationale:**
- Spec must match actual Button implementation (iconOnly is implemented, not future)
- Clear separation: size axis vs. iconOnly behavior prop
- Ensures consistency with VARIANTS_SIZE_CANON.md
- Prevents contradictions between mapping spec and canon authority

