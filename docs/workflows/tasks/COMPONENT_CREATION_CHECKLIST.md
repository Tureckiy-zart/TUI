# Extension Component Creation Checklist

**Status:** Active  
**Last Updated:** 2025-12-19  
**Purpose:** Mandatory checklist for creating new Extension components

---

## Overview

This checklist ensures all Extension components comply with architectural rules, Authority Contracts, and project standards. **All items must be verified before a component is considered complete.**

**Reference:** This checklist is based on the component lifecycle protocol. See [EXTENSION_AUTHORITY.md](../../architecture/EXTENSION_AUTHORITY.md) for Extension Authority Contract and [AUTHORITY_NAVIGATION.md](../../architecture/AUTHORITY_NAVIGATION.md) for all Authority Contracts.

---

## Pre-Creation Verification

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

### Component Classification

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

### Naming Verification

- [ ] **Component name is descriptive and intent-based**
  - [ ] Name clearly describes component purpose
  - [ ] Name follows existing naming patterns
  - [ ] Name is NOT a Foundation component name

- [ ] **Component name does NOT use Foundation names**
  - [ ] NOT: `Modal`, `Tabs`, `Select`, `ContextMenu`, `Toast`, `Button`, `Link`
  - [ ] NOT: `SimpleModal`, `BasicTabs`, `ModalV2`, etc.
  - [ ] Uses descriptive names: `ConfirmDialog`, `NotificationCenter`, etc.

---

## Token Mapping (MANDATORY)

### Visual Props Token Mapping

- [ ] **All visual props mapped to token domains**
  - [ ] Spacing props → `SpacingToken` or `Responsive<SpacingToken>`
  - [ ] Color props → `ColorToken` or `Responsive<ColorToken>`
  - [ ] Radius props → `RadiusToken` or `Responsive<RadiusToken>`
  - [ ] Typography props → `TextSizeToken`, `FontWeightToken`, etc.
  - [ ] Motion props → `MotionDurationToken`, `EasingToken`
  - [ ] Shadow props → `ShadowToken` or `Responsive<ShadowToken>`

- [ ] **No raw values used**
  - [ ] No raw strings (e.g., `"16px"`, `"#3b82f6"`)
  - [ ] No raw numbers (e.g., `16`, `0.5`)
  - [ ] No raw CSS values (e.g., `"1rem"`, `"0.25rem"`)

- [ ] **Token unions used exclusively**
  - [ ] All visual props use token union types
  - [ ] `Responsive<T>` used where responsiveness is required
  - [ ] Token types imported from `@/FOUNDATION/tokens/types`

### Token Requirements Check

- [ ] **All required tokens exist**
  - [ ] Checked token domains in `src/FOUNDATION/tokens/`
  - [ ] Verified tokens are available
  - [ ] If token doesn't exist, STOP and request new task for token creation

- [ ] **No new tokens created**
  - [ ] Did NOT create new token domains
  - [ ] Did NOT extend token scales
  - [ ] Used existing tokens only

---

## API Design Constraints

### Public Props Design

- [ ] **Public props are minimal and explicit**
  - [ ] Only necessary props exposed
  - [ ] Props have clear, documented purposes
  - [ ] No unnecessary complexity

- [ ] **No boolean style toggles without token backing**
  - [ ] Variants use token unions, not boolean flags
  - [ ] Style props use tokens, not raw values

- [ ] **No variant enums without token backing**
  - [ ] Variants map to token values
  - [ ] No `variant: "primary" | "secondary"` without token support

- [ ] **Types are exported explicitly**
  - [ ] Component props type exported
  - [ ] All public types exported
  - [ ] Types follow typing standards

### Foundation Enforcement (if Foundation component)

- [ ] **className and style props excluded** (Foundation only)
  - [ ] `className` NOT in public API
  - [ ] `style` NOT in public API
  - [ ] Uses `Omit<React.*HTMLAttributes, "className" | "style">` pattern

---

## Implementation

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

## Verification

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

### Storybook

- [ ] **Storybook story created**
  - [ ] Story file exists: `{ComponentName}.stories.tsx`
  - [ ] Story follows existing patterns
  - [ ] Story demonstrates component usage

- [ ] **Storybook story complete**
  - [ ] Default story included
  - [ ] Variant stories included
  - [ ] Token usage examples included
  - [ ] Use case examples included

### Tests

- [ ] **Test file created**
  - [ ] Test file exists: `{ComponentName}.test.tsx`
  - [ ] Tests follow existing patterns
  - [ ] Tests cover main functionality

- [ ] **Test coverage adequate**
  - [ ] Basic rendering tested
  - [ ] Token-based props tested
  - [ ] Foundation composition tested (if applicable)
  - [ ] Edge cases covered

### Exports

- [ ] **Component exported**
  - [ ] `index.ts` file created
  - [ ] Component exported from index
  - [ ] Types exported from index

- [ ] **Public API exports verified**
  - [ ] Only public APIs exported
  - [ ] No internal implementation exported
  - [ ] Exports follow project conventions

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

- [Extension Authority Contract](../../architecture/EXTENSION_AUTHORITY.md)
- [Extension Canonical State](../../architecture/EXTENSION_STATE.md)
- [Component Needs Inventory](./COMPONENT_NEEDS_INVENTORY.md)
- [Component Examples Library](../../reference/COMPONENT_EXAMPLES.md)

---

**Note:** This checklist is mandatory. Skipping any item is forbidden. If any item cannot be completed, STOP and request clarification or additional tasks.

