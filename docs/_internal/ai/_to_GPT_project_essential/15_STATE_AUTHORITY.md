# State Authority Contract

**Status:** ✅ LOCKED  
**Priority:** BLOCKER  
**Date Created:** 2025-12-15  
**Date Locked:** 2025-12-16  
**Version:** 1.0  
**Enforcement:** TUNG_STATE_AUTHORITY_FOUNDATION_LOCK

---

## Document Classification

**TYPE:** AUTHORITY  
**MUTABILITY:** IMMUTABLE  
**LOCK STATUS:** ✅ LOCKED  
**AUTHORITY DOMAIN:** State Authority

**Purpose:** This document defines the canonical declarative rules for HOW UI states are represented, named, and structured. It establishes the format, structure, and naming rules for state tokens across all UI components, without binding to implementation, components, or tools.

---

## Overview

This document defines the canonical State Authority Contract for all interactive UI components. It establishes the HOW layer for states: the format, structure, and naming rules for state tokens.

**Key Principle:** States must be defined as a normative token system, not as implementation in Button or CVA. This document defines the canonical model for state tokens, not their implementation.

**This document defines HOW states are represented.** What states exist is defined in [STATE_MATRIX.md](./STATE_MATRIX.md). When states can activate is defined in [INTERACTION_AUTHORITY.md](./INTERACTION_AUTHORITY.md).

---

## Authority Hierarchy

The State Authority Contract is part of the three-layer state authority system:

1. **State Authority Matrix** (WHAT) - Defines which states exist and how they relate
2. **Interaction Authority Contract** (WHEN) - Defines when states can activate
3. **State Authority Contract** (HOW) - This document - Defines how states are represented (format, structure, naming)

**This document is the HOW layer.** It defines the canonical format and structure for state tokens, not their implementation or activation rules.

---

## Purpose

This document establishes the canonical HOW contract for UI states:

- **State Token Model** - The canonical structure for representing states
- **State Token Naming Rules** - The canonical naming convention for state CSS variables
- **State → CSS Variable Mapping Rules** - How states map to CSS variable names
- **Component Obligations** - What components must do regarding state tokens

**This document does NOT define:**
- Which states exist (see [STATE_MATRIX.md](./STATE_MATRIX.md))
- When states activate (see [INTERACTION_AUTHORITY.md](./INTERACTION_AUTHORITY.md))
- How states are implemented (implementation layer)
- How states are enforced (enforcement layer)

---

## Canonical State Set

The canonical set of states is defined in [STATE_MATRIX.md](./STATE_MATRIX.md). This document does not duplicate that definition.

**Reference:** All state tokens must conform to the canonical state set defined in State Authority Matrix:
- `base` - Default visual and interaction state
- `hover` - Pointer hover state
- `active` - Pressed or activated state
- `focus-visible` - Keyboard or accessibility-driven focus state
- `disabled` - Non-interactive state
- `loading` - Transient state indicating ongoing action

**Rule:** Components cannot introduce states beyond this canonical set. All state tokens must reference one of these six canonical states.

---

## State Taxonomy

The canonical state set is organized into two categories:

### Interaction States

Interaction states are triggered by user input and provide immediate feedback:

- **`hover`** - Pointer hover state when pointer-capable environment is available
- **`active`** - Pressed or activated state during pointer or keyboard interaction
- **`focus-visible`** - Keyboard or accessibility-driven focus state

**Activation Rules:** Interaction states are controlled by the [Interaction Authority Contract](./INTERACTION_AUTHORITY.md), which defines WHEN these states can activate, their activation conditions, and blocking rules.

### Semantic/UI States

Semantic/UI states represent component conditions that affect interaction capability:

- **`disabled`** - Non-interactive state that suppresses all other states
- **`loading`** - Transient state indicating ongoing action; interaction suppressed

**Activation Rules:** Semantic/UI states are controlled by component props (`disabled`, `loading`) and component logic. These states have higher priority than interaction states.

### Foundational State

- **`base`** - Default visual and interaction state with no user input. Always present as the foundation state.

**Rule:** The base state is always present and serves as the foundation for all other states. Other states modify or overlay the base state.

---

## State Applicability Rules

This section defines which states are **mandatory** and which are **optional** for interactive components. It formalizes the applicability requirements so components are not required to support the full state set.

### State Applicability Matrix

The following table defines the applicability of each canonical state:

| State | Applicability | Category | Description |
|-------|---------------|-----------|-------------|
| `base` | **MANDATORY** | Foundational State | Always present as the foundation state |
| `hover` | **MANDATORY** | Interaction State | Required for all interactive components |
| `active` | **MANDATORY** | Interaction State | Required for all interactive components |
| `focus-visible` | **MANDATORY** | Interaction State | Required for all interactive components (accessibility) |
| `disabled` | **MANDATORY** | Semantic State | Required for all interactive components |
| `loading` | **OPTIONAL** | Semantic State | May be implemented based on component requirements |

### Applicability Categories

**Foundational State:**
- **`base`** - Always mandatory. Serves as the foundation for all other states.

**Interaction States (All Mandatory):**
- **`hover`** - Mandatory for all interactive components. Provides pointer hover feedback.
- **`active`** - Mandatory for all interactive components. Provides press/activation feedback.
- **`focus-visible`** - Mandatory for all interactive components. Required for accessibility compliance.

**Semantic States:**
- **`disabled`** - Mandatory for all interactive components. Required for non-interactive state handling.
- **`loading`** - Optional. May be implemented when component needs to indicate ongoing asynchronous operations.

### Applicability Rules

**For all interactive components:**

1. **Mandatory States:** Components MUST support `base`, `hover`, `active`, `focus-visible`, and `disabled` states.
2. **Optional States:** Components MAY support `loading` state based on their functional requirements.

**Critical Rule:** The absence of an optional state (specifically `loading`) does NOT constitute a violation of State Authority. A component that does not support `loading` state is fully compliant with State Authority Contract, provided it supports all mandatory states.

**Rule:** All interactive components MUST support all mandatory states. Optional states may be omitted without violating State Authority.

**Reference:** For state semantics and priority rules, see [STATE_MATRIX.md](./STATE_MATRIX.md). For state activation rules, see [INTERACTION_AUTHORITY.md](./INTERACTION_AUTHORITY.md).

---

## State Legality Matrix (Minimal)

The following table defines which states are legal for which component types. This table shows **legality** (whether a state can be used), not **applicability** (whether a state must be used). For applicability rules (mandatory vs optional), see [State Applicability Rules](#state-applicability-rules) above.

| Component | base | hover | active | focus-visible | disabled | loading |
|-----------|------|-------|--------|---------------|----------|---------|
| **Button** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Input** | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| **Checkbox** | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| **TabsTrigger** | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |

**Legend:**
- ✅ **Legal** - State is legal and may be used for this component type
- ⚠️ **Optional** - State is legal but optional (not mandatory for this component type)

**Note:** This table shows which states are **legal** (can be used), not which states are **mandatory** (must be used). For mandatory vs optional requirements, refer to the [State Applicability Rules](#state-applicability-rules) section above.

**Rule:** All interactive components MUST support base, hover, active, focus-visible, and disabled states. Loading state is optional and may be implemented based on component requirements. The absence of optional states does not violate State Authority.

**Reference:** For detailed state semantics and priority rules, see [STATE_MATRIX.md](./STATE_MATRIX.md). For state applicability rules (mandatory vs optional), see [State Applicability Rules](#state-applicability-rules) above.

---

## State Token Model

The State Token Model defines the canonical structure for representing component states.

### Token Structure

State tokens follow a hierarchical structure:

```
Component → Variant → State → Property → Value
```

**Structure Levels:**

1. **Component** - Component identifier (e.g., `button`, `input`, `select`)
2. **Variant** - Component variant (e.g., `primary`, `secondary`, `outline`)
3. **State** - Canonical state name (e.g., `hover`, `active`, `disabled`)
4. **Property** - Visual property affected by state (e.g., `background`, `text`, `border`)
5. **Value** - Token value (HSL color string format)

### Type Definitions

**UIState Type:**
```typescript
type UIState = "base" | "hover" | "active" | "focus-visible" | "disabled" | "loading"
```

**UIStateProperty Type:**
```typescript
type UIStateProperty = "background" | "text" | "border" | "outline" | "shadow"
```

**State Matrix Type:**
```typescript
type StateMatrix = {
  [componentName: string]: {
    [variantName: string]: {
      [state in UIState]?: {
        [property in UIStateProperty]?: string;
      };
    };
  };
}
```

### Value Format

**Rule:** All state token values must be HSL color strings in the format: `"H S% L%"` (e.g., `"216 12% 35%"`).

**Rationale:** HSL format ensures consistent color representation and enables theme switching without token redefinition.

### State Matrix Rules

- **All states** must conform to the State Matrix structure
- **All states** must reference canonical state names from State Authority Matrix
- **All states** must use canonical property names (background, text, border, outline, shadow)
- **All states** must use HSL color string format for values
- **No states** may be defined outside the State Matrix structure

---

## State Token Naming Rules

State tokens are represented as CSS variables following a canonical naming convention.

### Naming Pattern

State CSS variables follow this pattern:

```
--{component}-{variant}-{state}-{property}
```

**Pattern Components:**

- `{component}` - Component name (lowercase, kebab-case if multi-word)
- `{variant}` - Variant name (lowercase, kebab-case if multi-word)
- `{state}` - Canonical state name (lowercase, kebab-case: `focus-visible`)
- `{property}` - Property suffix (see Property Suffix Mapping below)

### Property Suffix Mapping

Property names map to CSS variable suffixes:

| Property Name | CSS Variable Suffix |
|---------------|---------------------|
| `background`  | `bg`                |
| `text`        | `text`              |
| `border`      | `border`            |
| `outline`     | `outline`           |
| `shadow`      | `shadow`            |

**Rule:** Property suffixes are fixed and cannot be changed. All state CSS variables must use these canonical suffixes.

### Naming Examples

**Valid State CSS Variable Names:**

- `--button-primary-hover-bg` (button, primary variant, hover state, background property)
- `--button-primary-active-bg` (button, primary variant, active state, background property)
- `--button-primary-disabled-bg` (button, primary variant, disabled state, background property)
- `--button-primary-disabled-text` (button, primary variant, disabled state, text property)
- `--input-default-focus-visible-outline` (input, default variant, focus-visible state, outline property)

**Invalid State CSS Variable Names:**

- ❌ `--button-primary-hover-background` (should use `bg` suffix, not `background`)
- ❌ `--button-primary-hoverBg` (should use kebab-case, not camelCase)
- ❌ `--button-primary-hover_bg` (should use kebab-case, not snake_case)
- ❌ `--button-primary-custom-state-bg` (custom state not in canonical set)

### Naming Rules

**Component Name Rules:**
- Must be lowercase
- Multi-word components use kebab-case (e.g., `context-menu`, `dropdown-menu`)
- Must match component identifier in codebase

**Variant Name Rules:**
- Must be lowercase
- Multi-word variants use kebab-case (e.g., `focus-visible`)
- Must match variant identifier in component

**State Name Rules:**
- Must be one of the six canonical states: `base`, `hover`, `active`, `focus-visible`, `disabled`, `loading`
- Must match exactly the canonical state name (including kebab-case for `focus-visible`)

**Property Suffix Rules:**
- Must be one of the five canonical suffixes: `bg`, `text`, `border`, `outline`, `shadow`
- Must match exactly the property suffix mapping

---

## State Precedence Rules

State precedence rules define the explicit ordering and suppression behavior for states. This document defines precedence as a reference rule for state token structure.

### Canonical Precedence Order

The canonical precedence order is fixed and immutable:

```
disabled > loading > active > hover > focus-visible > base
```

### Explicit Precedence Rules

1. **Disabled State (Highest Priority)**
   - Blocks all other states (loading, active, hover, focus-visible)
   - Base state remains as foundation but disabled styles override
   - When `disabled={true}`, only disabled state tokens apply

2. **Loading State (Second Highest Priority)**
   - Blocks active and hover states
   - May allow focus-visible for accessibility
   - Base state remains as foundation but loading styles override
   - When `loading={true}`, loading state tokens apply (hover/active blocked)

3. **Active State (Third Priority)**
   - Overrides hover and focus-visible states
   - Base state remains as foundation
   - When active is triggered, active state tokens apply (hover/focus-visible suppressed)

4. **Hover State (Fourth Priority)**
   - Overrides focus-visible state
   - Base state remains as foundation
   - When hover is triggered, hover state tokens apply (focus-visible suppressed)

5. **Focus-Visible State (Overlay)**
   - Does not replace base state; adds overlay on top
   - Lower priority than active and hover
   - When focus-visible is triggered, focus-visible tokens add overlay (base remains)

6. **Base State (Foundation)**
   - Always present as foundation
   - Never suppressed by other states
   - Other states modify or overlay base state

### Suppression Rules

**Explicit Suppression Behavior:**

- **Disabled suppresses:** loading, active, hover, focus-visible (all interaction states)
- **Loading suppresses:** active, hover (interaction states only)
- **Active suppresses:** hover, focus-visible (lower priority interaction states)
- **Hover suppresses:** focus-visible (lower priority interaction state)
- **Focus-visible suppresses:** nothing (lowest priority, overlay only)
- **Base suppresses:** nothing (foundation, always present)

**Rule:** When multiple states could apply simultaneously, only the highest priority state's visual styles apply. Lower priority states are suppressed and their tokens are not applied.

**Reference:** Detailed state semantics, priority rules, and suppression rules are defined in [STATE_MATRIX.md](./STATE_MATRIX.md). State activation conditions (WHEN states can activate) are defined in [INTERACTION_AUTHORITY.md](./INTERACTION_AUTHORITY.md).

**Note:** Precedence rules affect how state tokens are structured and named. The actual enforcement of precedence (when states activate, how they interact) is defined in Interaction Authority Contract.

---

## Component Obligations

All interactive UI components have obligations regarding state tokens.

### Obligation 1: Use Only Canonical States

**Components MUST:**
- Use only the six canonical states defined in State Authority Matrix
- Reference canonical state names exactly (including `focus-visible` with kebab-case)

**Components MUST NOT:**
- Define component-specific states beyond the canonical set
- Create variant-specific states
- Create conditional states not in the canonical set

**Rule:** Component-specific behaviors (like `checked` for checkboxes) should be modeled as component properties/props, not as states. States are about user interaction feedback, not component data model.

### Obligation 2: Use State Token Structure

**Components MUST:**
- Define states using the State Matrix structure (Component → Variant → State → Property → Value)
- Use canonical property names (background, text, border, outline, shadow)
- Use HSL color string format for state values

**Components MUST NOT:**
- Define states outside the State Matrix structure
- Use non-canonical property names
- Use non-HSL color formats for state values

### Obligation 3: Use Canonical Naming Convention

**Components MUST:**
- Use the canonical CSS variable naming pattern: `--{component}-{variant}-{state}-{property}`
- Use canonical property suffixes (bg, text, border, outline, shadow)
- Follow component and variant naming rules (lowercase, kebab-case)

**Components MUST NOT:**
- Create custom naming patterns for state CSS variables
- Use non-canonical property suffixes
- Use camelCase or snake_case for CSS variable names

### Obligation 4: No Local State Definitions

**Components MUST NOT:**
- Define hover/active/focus states through Tailwind state-classes (e.g., `hover:bg-blue-500`)
- Define states in component code or component-specific configuration
- Create component-specific state mechanisms

**Rule:** All visual states must be described through state tokens in the State Matrix. Components cannot introduce local state definitions.

### Obligation 5: Reference State Authority Matrix

**Components MUST:**
- Reference State Authority Matrix for canonical state set
- Reference State Authority Matrix for state semantics
- Reference State Authority Matrix for priority order

**Rule:** Components MUST conform to State Authority Matrix definitions. This document defines HOW states are represented, but WHAT states exist is defined in State Authority Matrix.

### Obligation 6: Support Mandatory States

**Components MUST:**
- Support all mandatory states: `base`, `hover`, `active`, `focus-visible`, and `disabled`
- Implement mandatory states using canonical state token structure and naming conventions

**Components MAY:**
- Support optional states (specifically `loading`) based on component functional requirements
- Omit optional states without violating State Authority

**Rule:** The absence of optional states (specifically `loading`) does NOT constitute a violation of State Authority Contract. A component that supports all mandatory states but does not support optional states is fully compliant. Components MUST support all mandatory states as defined in [State Applicability Rules](#state-applicability-rules).

**Reference:** For state applicability rules (mandatory vs optional), see [State Applicability Rules](#state-applicability-rules) above.

---

## Explicit Non-Goals

This document explicitly does NOT cover the following concerns:

### ❌ Implementation Details

**This document does NOT define:**
- How state tokens are injected into CSS (runtime injection is implementation)
- How state tokens are consumed by components (CSS application is implementation)
- How state tokens are generated from token definitions (token generation is implementation)

**Rationale:** Implementation details belong to the implementation layer, not the authority layer.

### ❌ Enforcement Mechanisms

**This document does NOT define:**
- How state token rules are enforced (ESLint rules, verification scripts)
- How state token violations are detected (automated checks, code review)
- How state token compliance is verified (testing, validation)

**Rationale:** Enforcement mechanisms belong to the enforcement layer, not the authority layer.

### ❌ Component-Specific Logic

**This document does NOT define:**
- Button-specific state logic (Button is reference implementation, not authority source)
- Component-specific state requirements (components must conform to authority, not define it)
- Variant-specific state rules (variants use canonical states, not define new ones)

**Rationale:** Component-specific logic belongs to component implementation, not authority definition.

### ❌ Tools and Frameworks

**This document does NOT define:**
- CVA (Class Variance Authority) usage patterns
- Tailwind CSS usage patterns
- Storybook configuration
- Any specific tool or framework

**Rationale:** Tools and frameworks are implementation concerns, not authority concerns. This document defines the canonical model, not how it is implemented.

### ❌ Activation Rules

**This document does NOT define:**
- When states can activate (see [INTERACTION_AUTHORITY.md](./INTERACTION_AUTHORITY.md))
- How states interact with user input (see Interaction Authority Contract)
- When states are blocked or suppressed (see Interaction Authority Contract)

**Rationale:** Activation rules belong to Interaction Authority Contract (WHEN layer), not State Authority Contract (HOW layer).

---

## Relationship to Other Authorities

### State Authority Matrix (WHAT)

**State Authority Matrix defines:** Which states exist and how they relate  
**State Authority Contract defines:** How states are represented (format, structure, naming)

**Relationship:** State Authority Contract uses the canonical state set defined in State Authority Matrix. This document defines HOW those states are represented as tokens, not WHAT states exist.

### Interaction Authority Contract (WHEN)

**Interaction Authority Contract defines:** When states can activate  
**State Authority Contract defines:** How states are represented (format, structure, naming)

**Relationship:** State Authority Contract defines the token structure for states. Interaction Authority Contract defines when those states activate. These are separate concerns.

### Token System

**Token System provides:** Implementation mechanism for state tokens  
**State Authority Contract defines:** Canonical format and structure for state tokens

**Relationship:** State Authority Contract defines the canonical model. Token System implements that model. This document does not define implementation.

---

## Hard Rules

The following rules are **IMMUTABLE** and **MANDATORY**:

### Rule 1: Canonical State Set Only

**No component may define states beyond the canonical set defined in State Authority Matrix.**

- ✅ **ALLOWED:** Using only the six canonical states (base, hover, active, focus-visible, disabled, loading)
- ❌ **FORBIDDEN:** Creating component-specific states
- ❌ **FORBIDDEN:** Creating variant-specific states
- ❌ **FORBIDDEN:** Creating conditional states not in the canonical set

### Rule 2: State Matrix Structure Only

**All states must conform to the State Matrix structure.**

- ✅ **ALLOWED:** Defining states using Component → Variant → State → Property → Value structure
- ❌ **FORBIDDEN:** Defining states outside State Matrix structure
- ❌ **FORBIDDEN:** Using non-canonical property names
- ❌ **FORBIDDEN:** Using non-HSL color formats

### Rule 3: Canonical Naming Convention Only

**All state CSS variables must follow the canonical naming pattern.**

- ✅ **ALLOWED:** Using pattern `--{component}-{variant}-{state}-{property}` with canonical suffixes
- ❌ **FORBIDDEN:** Creating custom naming patterns
- ❌ **FORBIDDEN:** Using non-canonical property suffixes
- ❌ **FORBIDDEN:** Using camelCase or snake_case for CSS variable names

### Rule 4: No Local State Definitions

**Components cannot define states locally.**

- ✅ **ALLOWED:** Using state tokens from State Matrix
- ❌ **FORBIDDEN:** Defining hover/active/focus through Tailwind state-classes
- ❌ **FORBIDDEN:** Defining states in component code
- ❌ **FORBIDDEN:** Creating component-specific state mechanisms

### Rule 5: Authority Separation

**State Authority Contract does not define implementation, enforcement, or activation rules.**

- ✅ **ALLOWED:** Defining canonical format, structure, and naming rules
- ❌ **FORBIDDEN:** Defining implementation details (runtime injection, CSS application)
- ❌ **FORBIDDEN:** Defining enforcement mechanisms (ESLint, verification)
- ❌ **FORBIDDEN:** Defining activation rules (when states activate, how they interact)

---

## Scope of Application

### Components That MUST Conform

All interactive UI components MUST conform to the State Authority Contract:

- ✅ **Button** - Reference implementation
- ✅ **Input** - Text input fields
- ✅ **Textarea** - Multi-line text input
- ✅ **Select** - Dropdown selection
- ✅ **Checkbox** - Checkbox input
- ✅ **Radio** - Radio button input
- ✅ **Switch** - Toggle switch
- ✅ **TabsTrigger** - Tab trigger button
- ✅ **Any future interactive component**

### Components That Are Excluded

The following component types are excluded from State Authority Contract requirements:

- ❌ **Purely presentational components** - Components with no user interaction
- ❌ **Static layout components** - Layout containers, dividers, spacing components
- ❌ **Text components** - Typography, labels, headings (unless interactive)

**Note:** If a component becomes interactive (adds hover, click, focus behavior), it MUST then conform to the State Authority Contract.

---

## Unlock Procedure

The State Authority Contract is **LOCKED** and **IMMUTABLE**. Any modifications require:

1. **Explicit unlock task** with justification
2. **Full audit** of all interactive components
3. **Impact analysis** of proposed changes
4. **Explicit approval** from architecture authority
5. **Re-verification** of all components after changes
6. **Re-lock** with updated documentation

**Unlock is reserved for:** Critical architectural changes that cannot be accommodated within the existing canonical state token model.

---

## Related Documents

- [STATE_MATRIX.md](./STATE_MATRIX.md) - Defines WHAT states exist and HOW they relate
- [INTERACTION_AUTHORITY.md](./INTERACTION_AUTHORITY.md) - Defines WHEN states can activate
- [INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md](./INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md) - Defines interactive size scale (for interactive components)
- [FOUNDATION_LOCK.md](./FOUNDATION_LOCK.md) - Foundation layer lock status

---

## Version History

- **v1.0** (2025-12-16): Initial State Authority Contract definition and lock
  - Defined canonical state token model (Component → Variant → State → Property → Value)
  - Defined state token naming rules (CSS variable naming pattern)
  - Defined state priority rules (reference-level)
  - Defined component obligations
  - Explicitly separated HOW layer from WHAT and WHEN layers
  - Formally locked as immutable authority

---

**Last Updated:** 2025-12-16  
**Version:** 1.0  
**Lock Status:** ✅ LOCKED - Only changes allowed via explicit 'Unlock State Authority Contract' task
