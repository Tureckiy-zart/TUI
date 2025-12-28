# Extension Component Creation Checklist

**Status:** Active  
**Last Updated:** 2025-12-25  
**Purpose:** Mandatory checklist for creating new Extension components

---

## Overview

This checklist ensures all Extension components comply with architectural rules, Authority Contracts, and project standards. **All items must be verified before a component is considered complete.**

> **Reference:** This checklist is aligned with the [Component Creation Pipeline (C0-C10)](../foundation/COMPONENT_CREATION_PIPELINE.md). All steps in this checklist correspond to pipeline steps C0-C10. **Note:** For refactoring existing components, use the [Component Review & Improvement Pipeline (18A)](../foundation/FOUNDATION_STEP_PIPELINE.md) instead of this checklist. This checklist is for creating new components only.

**Reference:** This checklist is based on the component lifecycle protocol for creating new components. For refactoring existing components, use the [Component Review & Improvement Pipeline (18A)](../foundation/FOUNDATION_STEP_PIPELINE.md) instead. See [EXTENSION_AUTHORITY.md](../../architecture/EXTENSION_AUTHORITY.md) for Extension Authority Contract and [AUTHORITY_NAVIGATION.md](../../architecture/AUTHORITY_NAVIGATION.md) for all Authority Contracts.

---

## Pre-Creation Verification - C0

### Authority & Lock Check

- [ ] **Component does NOT exist already**
  - [ ] Checked `docs/architecture/EXTENSION_STATE.md`
  - [ ] Searched codebase for similar components
  - [ ] Verified no duplicate functionality exists

- [ ] **Component is NOT locked**
  - [ ] Checked `docs/architecture/FOUNDATION_LOCK.md`
  - [ ] Verified component is not in Foundation layer
  - [ ] Confirmed Extension layer is appropriate

- [ ] **Component is allowed in Extension layer**
  - [ ] Reviewed `docs/architecture/EXTENSION_AUTHORITY.md`
  - [ ] Verified component complies with Extension boundaries
  - [ ] Confirmed component does not violate Foundation rules

### Component Classification & Justification - C1

- [ ] **Component type identified**
  - [ ] Primitive
  - [ ] Control
  - [ ] Layout
  - [ ] Composite
  - [ ] Utility

- [ ] **Classification matches existing taxonomy**
  - [ ] Reviewed similar components in same category
  - [ ] Verified naming conventions
  - [ ] Confirmed directory structure

- [ ] **Role definition written**
  - [ ] 1-2 sentence role definition (clear and narrow)
  - [ ] Role definition does not overlap with existing components

- [ ] **Justification documented**
  - [ ] Documented why this component is needed
  - [ ] Justification is clear and specific
  - [ ] Component does not duplicate existing functionality

- [ ] **Category identified**
  - [ ] Category identified (overlays/navigation/forms/data/layout/composite/etc.)
  - [ ] Category matches project taxonomy

### Naming Verification

- [ ] **Component name is descriptive and intent-based**
  - [ ] Name clearly describes component purpose
  - [ ] Name follows existing naming patterns
  - [ ] Name is NOT a Foundation component name

- [ ] **Component name does NOT use Foundation names**
  - [ ] NOT: `Modal`, `Tabs`, `Select`, `ContextMenu`, `Toast`, `Button`, `Link`
  - [ ] NOT: `SimpleModal`, `BasicTabs`, `ModalV2`, etc.
  - [ ] Uses descriptive names: `ConfirmDialog`, `NotificationCenter`, etc.

### Component Scaffold Generation - C4

- [ ] **Component scaffold generated using CLI tool**
  - [ ] Ran `pnpm run component:generate -- <ComponentName> [--category <category>]`
  - [ ] Verified component files created successfully:
    - [ ] `{ComponentName}.tsx` - Main component file
    - [ ] `{ComponentName}.stories.tsx` - Storybook stories
    - [ ] `{ComponentName}.test.tsx` - Test file
    - [ ] `{ComponentName}.index.ts` - Export file
  - [ ] Verified component placed in correct directory:
    - [ ] `src/COMPOSITION/{categoryDir}/{ComponentName}/`
  - [ ] Reviewed generated scaffold structure
  - [ ] Confirmed generated code follows project patterns

**Note:** The scaffold generator (`scripts/generate-extension-component.ts`) automatically:
- Validates component name (PascalCase, not Foundation duplicate)
- Determines correct directory based on category
- Creates all required files with proper structure
- Includes TODO comments and compliance notes

**Usage examples:**
```bash
# Default (composite category → overlays/)
pnpm run component:generate -- ConfirmDialog

# With category
pnpm run component:generate -- HeroSection --category layout

# With custom output path
pnpm run component:generate -- CustomCard --category composite --output src/custom
```

---

## Token Mapping (MANDATORY) - C2

**CRITICAL: Artifact Format & Location (NON-NEGOTIABLE):**

All token mapping artifacts MUST be documented in **ONE** of the following locations:
1. **Inline in task description/PR description** (for simple components with < 10 props)
2. **Markdown table in PR description** (for components with 10-20 props)
3. **Separate markdown file:** `docs/design/{ComponentName}_TOKEN_MAPPING.md` (for complex components with > 20 props)

### Visual Props Token Mapping

- [ ] **All visual props mapped to token domains**
  - [ ] Spacing props → `SpacingToken` or `Responsive<SpacingToken>`
  - [ ] Color props → `ColorToken` or `Responsive<ColorToken>`
  - [ ] Radius props → `RadiusToken` or `Responsive<RadiusToken>`
  - [ ] Typography props → `TextSizeToken`, `FontWeightToken`, etc.
  - [ ] Motion props → `MotionDurationToken`, `EasingToken`
  - [ ] Shadow props → `ShadowToken` or `Responsive<ShadowToken>`
  - [ ] Gradient props → `GRADIENT_TOKENS` (if applicable)
  - [ ] Opacity props → `OpacityToken` or `Responsive<OpacityToken>` (if applicable)

- [ ] **Token mapping table created**
  - [ ] Format: Markdown table with columns: `Prop Name | Token Domain | Token Type | Responsive? | Notes`
  - [ ] Example: `padding | spacing | SpacingToken | Yes (sm/md/lg) | Uses semanticSpacing.md`
  - [ ] All visual/behavioral props listed in table

- [ ] **No raw values used**
  - [ ] No raw strings (e.g., `"16px"`, `"#3b82f6"`)
  - [ ] No raw numbers (e.g., `16`, `0.5`)
  - [ ] No raw CSS values (e.g., `"1rem"`, `"0.25rem"`)
  - [ ] No raw gradients (e.g., `linear-gradient(...)`)
  - [ ] No raw opacity values (e.g., `0.5`)

- [ ] **Token unions used exclusively**
  - [ ] All visual props use token union types
  - [ ] `Responsive<T>` used where responsiveness is required
  - [ ] Token types imported from `@/FOUNDATION/tokens/types`

### Token Requirements Check

- [ ] **Token requirements documented**
  - [ ] List ALL token domains used (Foundation tokens: spacing, color, radius, typography, motion, elevation, gradients, opacity)
  - [ ] List Shared Component Tokens used (if applicable: ICON_TOKENS, FORM_TOKENS, etc.)
  - [ ] Explicit statement: "All required tokens verified to exist in token system"

- [ ] **All required tokens exist**
  - [ ] Checked Foundation token domains in `src/FOUNDATION/tokens/` (spacing, color, radius, typography, motion, elevation, gradients, opacity)
  - [ ] Checked Shared Component Tokens in `src/tokens/components/` (if applicable: ICON_TOKENS, FORM_TOKENS, etc.)
  - [ ] Verified tokens are available
  - [ ] If token doesn't exist, STOP and request new task for token creation

- [ ] **Responsive token identification**
  - [ ] List which props use `Responsive<T>` and why
  - [ ] Document responsive breakpoints if applicable

- [ ] **No new tokens created**
  - [ ] Did NOT create new token domains
  - [ ] Did NOT extend token scales
  - [ ] Used existing tokens only

---

## API Design & Contract Definition - C3

**CRITICAL: Artifact Format & Location (NON-NEGOTIABLE):**

All API design artifacts MUST be documented in **ONE** of the following locations:
1. **Inline in task description/PR description** (for simple components with < 5 props)
2. **Markdown document in PR description** (for components with 5-15 props)
3. **Separate markdown file:** `docs/design/{ComponentName}_API_CONTRACT.md` (for complex components with > 15 props)

### Public Props Design

- [ ] **Public props are minimal and explicit**
  - [ ] Only necessary props exposed
  - [ ] Props have clear, documented purposes
  - [ ] No unnecessary complexity
  - [ ] Public props defined (TypeScript interface or type definition)

- [ ] **Types defined and exported**
  - [ ] Component props type exported
  - [ ] All public types exported (prop types, variant unions, size unions)
  - [ ] Types follow typing standards

- [ ] **API contract documented**
  - [ ] Component purpose (1-2 sentences)
  - [ ] Public props with descriptions
  - [ ] Default values for optional props
  - [ ] Usage examples (2-3 code snippets)

- [ ] **Variant definition (if applicable)**
  - [ ] MUST use global variant dictionary (from VARIANTS_SIZE_CANON.md)
  - [ ] List allowed variants and their token mappings
  - [ ] NO variant enums without token backing
  - [ ] NO boolean style toggles without token backing

- [ ] **Size definition (if applicable)**
  - [ ] MUST use global size scale: xs/sm/md/lg/xl/2xl/3xl
  - [ ] Document which sizes are supported and why
  - [ ] NO invented size or variant names (must use global canonical dictionary)

- [ ] **Size mapping table (if component has `size` prop)**
  - [ ] MUST document size-to-token mapping using SIZE_MAPPING_SPEC template
  - [ ] MUST include all mandatory mapping keys (heightToken, paddingXToken, paddingYToken, textToken, radiusToken, gapToken, iconSizeToken, minWidthToken, hitAreaToken, maxWidthToken)
  - [ ] MUST use token references only (no raw values)
  - [ ] MUST document supported sizes subset
  - [ ] Reference: [Size Mapping Spec Authority](../../architecture/SIZE_MAPPING_SPEC.md) for template and requirements

- [ ] **Prop descriptions and JSDoc examples**
  - [ ] Each prop MUST have JSDoc comment
  - [ ] At least 1 usage example per prop

### Foundation Enforcement (if Foundation component)

- [ ] **className and style props excluded** (Foundation only)
  - [ ] `className` NOT in public API
  - [ ] `style` NOT in public API
  - [ ] Uses `Omit<React.*HTMLAttributes, "className" | "style">` pattern

---

## Implementation - C5 & C6

### Foundation Composition (if applicable)

- [ ] **Component composes Foundation components**
  - [ ] Uses Foundation components internally
  - [ ] Does NOT bypass Foundation components
  - [ ] Does NOT use Radix primitives directly

- [ ] **Foundation components used correctly**
  - [ ] Uses Foundation public APIs only
  - [ ] Does NOT access internal implementation
  - [ ] Treats Foundation as black boxes

### Token Usage

- [ ] **All styling uses tokens**
  - [ ] No hardcoded Tailwind utilities for visual properties
  - [ ] No raw CSS values
  - [ ] All visual properties use token system

- [ ] **Token usage follows patterns**
  - [ ] Uses `getBaseValue`, `getSpacingCSSVar`, etc. for responsive props
  - [ ] Uses CSS variables via token system
  - [ ] Follows existing component patterns

### Code Quality

- [ ] **Follows architecture rules**
  - [ ] File structure matches existing patterns
  - [ ] Imports follow project conventions
  - [ ] Code style consistent with codebase

- [ ] **JSDoc comments present**
  - [ ] Component has JSDoc description
  - [ ] Props have JSDoc comments
  - [ ] Examples provided in JSDoc

- [ ] **TypeScript strict mode compliant**
  - [ ] No `any` types
  - [ ] All types properly defined
  - [ ] No type errors

---

## Verification - C9

### Scope Verification

- [ ] **No unrelated files touched**
  - [ ] Only component files modified
  - [ ] No adjacent component changes
  - [ ] No shared utility modifications

- [ ] **No scope leakage**
  - [ ] Changes limited to component
  - [ ] No hidden side effects
  - [ ] No indirect behavior changes

### Token Compliance

- [ ] **No raw values exist**
  - [ ] Scanned component code
  - [ ] Verified all visual props use tokens
  - [ ] No hardcoded values found

- [ ] **All props map to tokens**
  - [ ] Verified prop-to-token mapping

### Motion GAP Evaluation (MANDATORY)

- [ ] **Motion GAP evaluation completed**
  - [ ] Identified all state/spatial changes (visibility, size/layout, selection/active state, user-triggered actions)
  - [ ] Evaluated each change for Motion GAP (presence or absence of temporal feedback)
  - [ ] Documented GAP resolution for each identified change

- [ ] **GAP resolution documented**
  - [ ] Each GAP resolved using one of three allowed outcomes:
    - [ ] **ADD MOTION** — Canonical motion preset applied (`.tm-motion-*` utilities or motion tokens)
    - [ ] **NO MOTION BY DESIGN** — Explicitly declared intentional absence with rationale
    - [ ] **DEFERRED** — Postponed with documented rationale (UNLOCKED components only)
  - [ ] No unresolved GAPs remain (LOCKED components must resolve all GAPs)

- [ ] **GAP resolution documented in component**
  - [ ] Inline comments or JSDoc explain motion decisions
  - [ ] Storybook stories demonstrate motion behavior (if motion added)
  - [ ] Storybook stories document "no motion by design" rationale (if applicable)
  - [ ] Confirmed token unions used
  - [ ] Verified Responsive<T> usage where needed

### Foundation Compliance (if applicable)

- [ ] **Foundation composition verified**
  - [ ] Component uses Foundation components
  - [ ] No Foundation bypass
  - [ ] No Foundation duplication

- [ ] **Foundation Enforcement verified** (Foundation only)
  - [ ] className/style excluded from public API
  - [ ] ESLint rules pass
  - [ ] Type tests pass

### Storybook - C7

- [ ] **Storybook story created**
  - [ ] Story file exists: `{ComponentName}.stories.tsx`
  - [ ] Story follows existing patterns
  - [ ] Story demonstrates component usage

- [ ] **Storybook story complete**
  - [ ] Default story included
  - [ ] Variant stories included (if component has variants)
  - [ ] Token usage examples included (at least 1 story showing responsive token usage)
  - [ ] Use case examples included (**MINIMUM 2, MAXIMUM 5** real-world usage scenarios)

- [ ] **Matrix Story (if applicable)**
  - [ ] **REQUIRED** only if component supports **BOTH** `size` AND `variant` props
  - [ ] Story named exactly `Matrix` (canonical name)
  - [ ] Displays all variants × all sizes in grid layout
  - [ ] Reference: [VARIANTS_SIZE_CANON.md](../../architecture/VARIANTS_SIZE_CANON.md) for Matrix story requirements

- [ ] **States Story (if applicable)**
  - [ ] **REQUIRED** only if component has public state props (disabled, loading, error, etc.)
  - [ ] Story named exactly `States` (canonical name)
  - [ ] Displays all variants, sizes, and canonical states
  - [ ] Reference: [VARIANTS_SIZE_CANON.md](../../architecture/VARIANTS_SIZE_CANON.md) for States story requirements

- [ ] **Sizes Gallery (if applicable)**
  - [ ] **REQUIRED** if component exposes a public `size` prop
  - [ ] Story named exactly `SizesGallery` (canonical name)
  - [ ] Demonstrates all supported sizes with text content, icon content (if applicable), and multi-line content (if applicable)
  - [ ] Reference: [SIZE_MAPPING_SPEC.md](../../architecture/SIZE_MAPPING_SPEC.md) for Sizes Gallery requirements

- [ ] **Long Content Story (if overlay component)**
  - [ ] **REQUIRED** for Overlay components (Tooltip, Popover, etc.), regardless of whether `size` exists
  - [ ] Story named exactly `LongContent` (canonical name)
  - [ ] Validates padding and maxWidth token behavior with long text content
  - [ ] Reference: [SIZE_MAPPING_SPEC.md](../../architecture/SIZE_MAPPING_SPEC.md) for Long Content requirements

### Tests - C8

- [ ] **Test file created**
  - [ ] Test file exists: `{ComponentName}.test.tsx`
  - [ ] Tests follow existing patterns
  - [ ] Tests cover main functionality

- [ ] **Test coverage adequate**
  - [ ] Basic rendering tested
  - [ ] Token-based props tested
  - [ ] Foundation composition tested (if applicable)
  - [ ] Edge cases covered
  - [ ] Public behavior tested (all public props and their interactions)
  - [ ] **Accessibility tests** (if interactive component):
    - [ ] ARIA roles and attributes tested
    - [ ] Keyboard navigation tested
    - [ ] Focus management tested
    - [ ] Screen reader behavior tested (if applicable)

### Exports & Registration - C10

**CRITICAL: Execute in EXACT ORDER (NON-NEGOTIABLE):**

1. **First:** Export component from `src/index.ts` (verify export works, no type errors)
2. **Second:** Export types from `src/index.ts` (verify types exported correctly)
3. **Third:** Update `docs/architecture/EXTENSION_STATE.md` (add component to ALLOWED section)
4. **Fourth:** Update `docs/PROJECT_PROGRESS.md` (record completion)
5. **Fifth:** Document lock propagation completion

- [ ] **Component exported**
  - [ ] `index.ts` file created
  - [ ] Component exported from `src/index.ts` (verify export works, no type errors)
  - [ ] Types exported from `src/index.ts` (verify types exported correctly)

- [ ] **Public API exports verified**
  - [ ] Only public APIs exported
  - [ ] No internal implementation exported
  - [ ] Exports follow project conventions

- [ ] **Extension State updated**
  - [ ] `docs/architecture/EXTENSION_STATE.md` updated (add component to ALLOWED section)
  - [ ] Component path, exports, and status included

- [ ] **Project Progress updated**
  - [ ] `docs/PROJECT_PROGRESS.md` updated (record completion)
  - [ ] Date, pipeline version, completion status included

- [ ] **Lock propagation completed**
  - [ ] Lock propagation documentation completed
  - [ ] Component is officially registered and available for use

---

## Final Verification

### Architecture Compliance

- [ ] **Extension Authority Contract compliance**
  - [ ] Reviewed `docs/architecture/EXTENSION_AUTHORITY.md`
  - [ ] Verified all rules followed
  - [ ] No violations detected

- [ ] **Foundation Authority compliance**
  - [ ] Reviewed relevant Foundation Authority Contracts (see [AUTHORITY_NAVIGATION.md](../../architecture/AUTHORITY_NAVIGATION.md))
  - [ ] All Foundation Authority rules respected
  - [ ] No Authority overrides or bypasses

### Documentation

- [ ] **Component documented**
  - [ ] JSDoc comments complete
  - [ ] Storybook story complete
  - [ ] Examples provided

- [ ] **Usage documented**
  - [ ] Use cases documented
  - [ ] API reference complete
  - [ ] Token usage documented

### Code Review Ready

- [ ] **All checklist items verified**
  - [ ] All items checked
  - [ ] No outstanding issues
  - [ ] Ready for code review

---

## Related Documents

- [Token Authority](../../architecture/TOKEN_AUTHORITY.md) - **Token system structure and domain hierarchy** (MANDATORY reference)
- [Extension Authority Contract](../../architecture/EXTENSION_AUTHORITY.md)
- [Extension Canonical State](../../architecture/EXTENSION_STATE.md)
- [Component Needs Inventory](./COMPONENT_NEEDS_INVENTORY.md)
- [Component Examples Library](../../reference/COMPONENT_EXAMPLES.md) - **Reference examples including Button (Foundation) and Slider (Extension) for complex controls**
- [Component Review & Improvement Pipeline (18A)](../foundation/FOUNDATION_STEP_PIPELINE.md) - **Canonical process for refactoring existing components**
- [Variants & Size Canon Authority](../../architecture/VARIANTS_SIZE_CANON.md) - **Global size scale and variant naming dictionary** (MANDATORY for components with size/variant props)
- [Size Mapping Spec Authority](../../architecture/SIZE_MAPPING_SPEC.md) - **Size-to-token mapping contract** (MANDATORY for components with `size` prop)
- Component Generator Script: `scripts/generate-extension-component.ts` (see Component Scaffold Generation section above)

## Reference Components for Complex Controls

**When creating complex control components, use these as reference examples:**

1. **Button** (Foundation) - `src/PRIMITIVES/Button/Button.tsx`
   - Foundation layer patterns (locked, immutable, canonical)
   - Complete token compliance (BUTTON_TOKENS)
   - Foundation Enforcement (no className/style props)
   - **Audit Report:** `docs/reports/audit/BUTTON_BASELINE_REPORT.md`

2. **Slider** (Extension) - `src/COMPOSITION/controls/Slider/Slider.tsx`
   - Extension layer patterns (evolvable, complex controls)
   - Token migration pattern (cva → tokenCVA)
   - Token hole fixing (SLIDER_TOKENS, all raw values replaced)
   - Complex multi-part component pattern (root, track, range, thumb, marks)
   - Type system alignment (`satisfies Record<Type, string>`)
   - **Audit Report:** `docs/reports/audit/SLIDER_BASELINE_REPORT.md` (Pipeline 18A Complete)

**Why These Are References:**
- **Button** demonstrates Foundation layer excellence (token compliance, enforcement, canonical patterns)
- **Slider** demonstrates Extension layer excellence (token migration, complex control patterns, architectural compliance)
- Both show proper token-driven styling and serve as examples for fixing token holes
- **Slider** specifically demonstrates when Extension ≠ Foundation and how to properly structure complex controls

---

**Note:** This checklist is mandatory. Skipping any item is forbidden. If any item cannot be completed, STOP and request clarification or additional tasks.

