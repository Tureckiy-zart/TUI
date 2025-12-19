# Authority Map — Canonical Mental Model

**Status:** ✅ ACTIVE  
**Priority:** HIGH  
**Date Created:** 2025-12-16  
**Version:** 1.0  
**Type:** META

---

## Document Classification

**TYPE:** META  
**MUTABILITY:** EVOLVABLE  
**LOCK STATUS:** ✅ ACTIVE  
**AUTHORITY DOMAIN:** Authority Navigation

**Purpose:** This document provides a canonical mental model for understanding which Authorities exist, what they're responsible for, and in what order they should be consulted when developing UI components. This is a navigational and educational document that does not introduce new rules or duplicate Authority contract content.

---

## Purpose

This document serves as a **navigation map** for the Authority system. It answers:

- **WHAT** Authorities exist in the system
- **WHEN** to consult each Authority (resolution order)
- **HOW** to use Authorities together (coordination)
- **WHERE** to find detailed rules (references)

**This document does NOT:**
- Introduce new architectural rules
- Duplicate content from Authority contracts
- Provide enforcement mechanisms
- Define verification procedures

**This document DOES:**
- Provide a mental model for Authority navigation
- Map questions to appropriate Authorities
- Show resolution order for common scenarios
- Demonstrate Authority coordination through examples

---

## Authority Overview Table

The following table provides a high-level overview of all Authorities in the system:

| Authority | Domain | Responsibility | Layer | Status | Reference Document |
|-----------|--------|---------------|-------|--------|-------------------|
| **State Authority Matrix** | State | **WHAT** states exist (canonical state set) | WHAT | ✅ LOCKED | [STATE_AUTHORITY_MATRIX.md](./STATE_AUTHORITY_MATRIX.md) |
| **Interaction Authority** | Interaction | **WHEN** states activate (activation rules) | WHEN | ✅ LOCKED | [INTERACTION_AUTHORITY_CONTRACT.md](./INTERACTION_AUTHORITY_CONTRACT.md) |
| **State Authority Contract** | State | **HOW** states are represented (token format) | HOW | ✅ LOCKED | [STATE_AUTHORITY_CONTRACT.md](./STATE_AUTHORITY_CONTRACT.md) |
| **Spacing Authority** | Spacing | Spacing token usage (padding, margin, gap) | Token | ✅ ACTIVE | [SPACING_AUTHORITY_CONTRACT.md](./SPACING_AUTHORITY_CONTRACT.md) |
| **Radius Authority** | Radius | Border radius token usage | Token | ✅ ACTIVE | [RADIUS_AUTHORITY_CONTRACT.md](./RADIUS_AUTHORITY_CONTRACT.md) |
| **Typography Authority** | Typography | Typography token usage (font, size, weight) | Token | ✅ ACTIVE | [TYPOGRAPHY_AUTHORITY_CONTRACT.md](./TYPOGRAPHY_AUTHORITY_CONTRACT.md) |
| **Motion Authority** | Motion | Motion token usage (duration, easing, transitions) | Token | ✅ ACTIVE | [MOTION_AUTHORITY_CONTRACT.md](./MOTION_AUTHORITY_CONTRACT.md) |
| **Elevation Authority** | Elevation | Elevation token usage (shadows, z-index) | Token | ✅ ACTIVE | [ELEVATION_AUTHORITY_CONTRACT.md](./ELEVATION_AUTHORITY_CONTRACT.md) |
| **Layout Authority** | Layout | Layout structure and flow (WHERE elements are positioned) | Layout | ✅ ACTIVE | [LAYOUT_AUTHORITY_CONTRACT.md](./LAYOUT_AUTHORITY_CONTRACT.md) |

### Authority Categories

**State Authorities (WHAT/WHEN/HOW):**
- **State Authority Matrix** - Defines which states exist (base, hover, active, focus-visible, disabled, loading)
- **Interaction Authority** - Defines when states can activate and their priority order
- **State Authority Contract** - Defines how states are represented as CSS variables

**Token Authorities:**
- **Spacing Authority** - Spacing tokens (padding, margin, gap)
- **Radius Authority** - Border radius tokens
- **Typography Authority** - Typography tokens (font, size, weight, line-height)
- **Motion Authority** - Motion tokens (duration, easing, transitions)
- **Elevation Authority** - Elevation tokens (shadows, z-index)

**Structural Authorities:**
- **Layout Authority** - Layout structure and flow (WHERE elements are positioned)

---

## Question → Authority Mapping Table

This table maps common development questions to the appropriate Authority:

| Question | Authority | Why |
|----------|-----------|-----|
| "What states can my component have?" | **State Authority Matrix** | Defines the canonical state set (base, hover, active, focus-visible, disabled, loading) |
| "When does hover state activate?" | **Interaction Authority** | Defines activation conditions and blocking rules for interaction states |
| "What's the priority order for states?" | **Interaction Authority** | Defines state priority: `disabled > loading > active > hover > focus-visible > base` |
| "How do I name state CSS variables?" | **State Authority Contract** | Defines naming pattern: `--{component}-{variant}-{state}-{property}` |
| "What spacing tokens should I use?" | **Spacing Authority** | Defines canonical spacing scale and component requirements |
| "What border radius should my component use?" | **Radius Authority** | Defines canonical radius scale and component-specific standards |
| "What typography tokens should I use?" | **Typography Authority** | Defines canonical typography scale and semantic roles |
| "What motion tokens should I use?" | **Motion Authority** | Defines canonical motion scale (duration, easing, transitions) |
| "What shadow should my component use?" | **Elevation Authority** | Defines canonical shadow scale and z-index layers |
| "How should I structure my component layout?" | **Layout Authority** | Defines canonical layout primitives and separation laws |
| "Can I use arbitrary spacing values?" | **Spacing Authority** | Forbids arbitrary spacing - must use tokens |
| "Can I use arbitrary border radius?" | **Radius Authority** | Forbids arbitrary radius - must use tokens |
| "Can I use arbitrary typography values?" | **Typography Authority** | Forbids arbitrary typography - must use tokens |
| "Can I use arbitrary motion values?" | **Motion Authority** | Forbids arbitrary motion - must use tokens |
| "Can I use arbitrary shadow values?" | **Elevation Authority** | Forbids arbitrary elevation - must use tokens |
| "Can I define custom states?" | **State Authority Matrix** | Forbids custom states - only canonical set allowed |
| "Can I use JavaScript for hover state?" | **Interaction Authority** | Forbids JavaScript-driven states - must use CSS pseudo-classes |
| "Can I use inline flex/grid in components?" | **Layout Authority** | Forbids inline layout - must use layout primitives |
| "What z-index should my overlay use?" | **Elevation Authority** | Defines canonical z-index layers (overlay, modal, notification, etc.) |

---

## Authority Resolution Order

When developing a UI component, consult Authorities in this order:

### 1. State Authorities (Foundation)

**Step 1: State Authority Matrix (WHAT)**
- Determine which states your component needs
- Reference: [STATE_AUTHORITY_MATRIX.md](./STATE_AUTHORITY_MATRIX.md)
- **Question:** "What states exist?"
- **Answer:** Canonical set: `base`, `hover`, `active`, `focus-visible`, `disabled`, `loading`

**Step 2: Interaction Authority (WHEN)**
- Determine when states can activate
- Reference: [INTERACTION_AUTHORITY_CONTRACT.md](./INTERACTION_AUTHORITY_CONTRACT.md)
- **Question:** "When do states activate?"
- **Answer:** Activation conditions, blocking rules, priority order

**Step 3: State Authority Contract (HOW)**
- Determine how to represent states as tokens
- Reference: [STATE_AUTHORITY_CONTRACT.md](./STATE_AUTHORITY_CONTRACT.md)
- **Question:** "How do I represent states?"
- **Answer:** CSS variable naming pattern, token structure

### 2. Token Authorities (Visual Properties)

**Step 4: Spacing Authority**
- Determine spacing tokens (padding, margin, gap)
- Reference: [SPACING_AUTHORITY_CONTRACT.md](./SPACING_AUTHORITY_CONTRACT.md)
- **Question:** "What spacing should I use?"
- **Answer:** Canonical spacing scale, semantic spacing, layout spacing

**Step 5: Radius Authority**
- Determine border radius tokens
- Reference: [RADIUS_AUTHORITY_CONTRACT.md](./RADIUS_AUTHORITY_CONTRACT.md)
- **Question:** "What border radius should I use?"
- **Answer:** Canonical radius scale, component-specific standards

**Step 6: Typography Authority**
- Determine typography tokens (font, size, weight)
- Reference: [TYPOGRAPHY_AUTHORITY_CONTRACT.md](./TYPOGRAPHY_AUTHORITY_CONTRACT.md)
- **Question:** "What typography should I use?"
- **Answer:** Canonical typography scale, semantic text styles

**Step 7: Motion Authority**
- Determine motion tokens (duration, easing, transitions)
- Reference: [MOTION_AUTHORITY_CONTRACT.md](./MOTION_AUTHORITY_CONTRACT.md)
- **Question:** "What motion should I use?"
- **Answer:** Canonical motion scale, transition presets

**Step 8: Elevation Authority**
- Determine elevation tokens (shadows, z-index)
- Reference: [ELEVATION_AUTHORITY_CONTRACT.md](./ELEVATION_AUTHORITY_CONTRACT.md)
- **Question:** "What elevation should I use?"
- **Answer:** Canonical shadow scale, z-index layers

### 3. Structural Authorities (Layout)

**Step 9: Layout Authority**
- Determine layout structure and flow
- Reference: [LAYOUT_AUTHORITY_CONTRACT.md](./LAYOUT_AUTHORITY_CONTRACT.md)
- **Question:** "How should I structure my component?"
- **Answer:** Canonical layout primitives, separation laws

---

## Button Example Walkthrough

This section demonstrates how Authorities are consulted when developing a Button component. **This example does not introduce new rules** - it shows how existing Authorities coordinate.

### Step 1: State Authority Matrix (WHAT)

**Question:** "What states does Button need?"

**Authority:** State Authority Matrix  
**Answer:** Button needs the canonical state set:
- `base` - Default visual state
- `hover` - Pointer hover state
- `active` - Pressed state
- `focus-visible` - Keyboard focus state
- `disabled` - Non-interactive state
- `loading` - Transient loading state

**Reference:** [STATE_AUTHORITY_MATRIX.md](./STATE_AUTHORITY_MATRIX.md)

### Step 2: Interaction Authority (WHEN)

**Question:** "When do Button states activate?"

**Authority:** Interaction Authority  
**Answer:** 
- Priority order: `disabled > loading > active > hover > focus-visible > base`
- `disabled` blocks all other states
- `loading` blocks `active` and `hover`
- `hover` activates on pointer move when `!disabled && !loading`
- `active` activates on pointer/keyboard press when `!disabled && !loading`
- `focus-visible` activates on keyboard focus when `!disabled`

**Reference:** [INTERACTION_AUTHORITY_CONTRACT.md](./INTERACTION_AUTHORITY_CONTRACT.md)

### Step 3: State Authority Contract (HOW)

**Question:** "How do I represent Button states as CSS variables?"

**Authority:** State Authority Contract  
**Answer:** 
- Naming pattern: `--button-{variant}-{state}-{property}`
- Example: `--button-primary-hover-bg` (Button, primary variant, hover state, background property)
- Property suffixes: `bg` (background), `text` (text), `border` (border), `outline` (outline), `shadow` (shadow)

**Reference:** [STATE_AUTHORITY_CONTRACT.md](./STATE_AUTHORITY_CONTRACT.md)

### Step 4: Spacing Authority

**Question:** "What spacing should Button use for padding?"

**Authority:** Spacing Authority  
**Answer:** 
- Use semantic spacing tokens: `semanticSpacing.sm` (8px) for small buttons, `semanticSpacing.md` (16px) for medium buttons
- Reference: [SPACING_AUTHORITY_CONTRACT.md](./SPACING_AUTHORITY_CONTRACT.md)

### Step 5: Radius Authority

**Question:** "What border radius should Button use?"

**Authority:** Radius Authority  
**Answer:** 
- Use component-specific standard: `componentRadius.button.md` (6px)
- Reference: [RADIUS_AUTHORITY_CONTRACT.md](./RADIUS_AUTHORITY_CONTRACT.md)

### Step 6: Typography Authority

**Question:** "What typography should Button use?"

**Authority:** Typography Authority  
**Answer:** 
- Use semantic text style: `textStyles.label` (sans font, sm size, medium weight, wide letter-spacing)
- Reference: [TYPOGRAPHY_AUTHORITY_CONTRACT.md](./TYPOGRAPHY_AUTHORITY_CONTRACT.md)

### Step 7: Motion Authority

**Question:** "What motion should Button use for transitions?"

**Authority:** Motion Authority  
**Answer:** 
- Use transition preset: `transitions.fast` (150ms ease-out) for color transitions
- Reference: [MOTION_AUTHORITY_CONTRACT.md](./MOTION_AUTHORITY_CONTRACT.md)

### Step 8: Elevation Authority

**Question:** "What elevation should Button use?"

**Authority:** Elevation Authority  
**Answer:** 
- Button typically uses `elevationShadows.none` (no shadow) unless it's an elevated variant
- Focus ring uses `focusRings.default` (3px ring with ring color)
- Reference: [ELEVATION_AUTHORITY_CONTRACT.md](./ELEVATION_AUTHORITY_CONTRACT.md)

### Step 9: Layout Authority

**Question:** "How should Button structure its internal layout?"

**Authority:** Layout Authority  
**Answer:** 
- Button uses `inline-flex` for internal layout (icon + text alignment)
- Button does not define external layout context (that's the parent's responsibility)
- Reference: [LAYOUT_AUTHORITY_CONTRACT.md](./LAYOUT_AUTHORITY_CONTRACT.md)

### Authority Coordination Summary

Button development follows this Authority coordination:

1. **State Authority Matrix** → Defines which states exist
2. **Interaction Authority** → Defines when states activate
3. **State Authority Contract** → Defines how states are represented
4. **Spacing Authority** → Defines padding/gap spacing
5. **Radius Authority** → Defines border radius
6. **Typography Authority** → Defines text styling
7. **Motion Authority** → Defines transitions
8. **Elevation Authority** → Defines shadows/focus rings
9. **Layout Authority** → Defines internal structure

**Result:** Button component that follows all Authority rules and maintains design system consistency.

---

## Non-Goals

This document explicitly does NOT:

1. **Introduce new rules** - All rules come from Authority contracts
2. **Duplicate Authority content** - Detailed rules remain in Authority documents
3. **Provide enforcement** - Enforcement is handled by separate mechanisms
4. **Define verification** - Verification is handled by separate procedures
5. **Replace Authority contracts** - This is a navigation aid, not a replacement
6. **Override Authority decisions** - This document follows Authority rules, not vice versa

**This document is a map, not the territory.** The Authority contracts are the source of truth.

---

## Related Documents

### Authority Contracts

- [State Authority Matrix](./STATE_AUTHORITY_MATRIX.md) - WHAT states exist
- [Interaction Authority Contract](./INTERACTION_AUTHORITY_CONTRACT.md) - WHEN states activate
- [State Authority Contract](./STATE_AUTHORITY_CONTRACT.md) - HOW states are represented
- [Spacing Authority Contract](./SPACING_AUTHORITY_CONTRACT.md) - Spacing tokens
- [Radius Authority Contract](./RADIUS_AUTHORITY_CONTRACT.md) - Border radius tokens
- [Typography Authority Contract](./TYPOGRAPHY_AUTHORITY_CONTRACT.md) - Typography tokens
- [Motion Authority Contract](./MOTION_AUTHORITY_CONTRACT.md) - Motion tokens
- [Elevation Authority Contract](./ELEVATION_AUTHORITY_CONTRACT.md) - Elevation tokens
- [Layout Authority Contract](./LAYOUT_AUTHORITY_CONTRACT.md) - Layout structure

### Foundation Lock

- [Final Foundation Lock](./FINAL_FOUNDATION_LOCK.md) - Foundation layer lock status

### Enforcement & Governance

- [ESLint Setup & Governance](./ESLINT_SETUP.md) - ESLint as architectural enforcement
- [ESLint Rules Scope Matrix](./eslint_rules_scope_matrix.md) - Canonical scope authority for ESLint rules

### Reference Implementation

- [Button Component](../../src/components/ui/button.tsx) - Canonical reference implementation

---

## Version History

- **v1.0** (2025-12-16): Initial Authority Map creation
  - Created canonical mental model for Authority navigation
  - Added Authority Overview Table
  - Added Question → Authority Mapping Table
  - Added Authority Resolution Order
  - Added Button Example Walkthrough
  - Documented Non-Goals

---

**Status:** ✅ ACTIVE  
**Version:** 1.0  
**Date Created:** 2025-12-16  
**Priority:** HIGH  
**Type:** META
