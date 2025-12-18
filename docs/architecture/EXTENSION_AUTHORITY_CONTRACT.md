# Extension Authority Contract

**Status:** ✅ ACTIVE  
**Priority:** CRITICAL  
**Date Created:** 2025-12-16  
**Version:** 1.0  
**Enforcement:** TUNG_EXTENSION_AUTHORITY_CONTRACT

---

## Document Classification

**TYPE:** AUTHORITY  
**MUTABILITY:** IMMUTABLE  
**LOCK STATUS:** ✅ ACTIVE  
**AUTHORITY DOMAIN:** Extension Authority

**Purpose:** This document defines the canonical declarative rules for the Extension layer boundary. It establishes architectural law that governs what Extension components can and cannot do relative to Foundation Authorities. This contract cannot be changed without explicit unlock procedure.

---

## Purpose

This document establishes the **boundary contract** between the Foundation layer and the Extension layer. It defines:

1. **What Extension is** - The definition and scope of the Extension layer
2. **What Extension can do** - Allowed actions and capabilities
3. **What Extension cannot do** - Forbidden actions and restrictions
4. **How Extension relates to Foundation Authorities** - The relationship between Extension and all Foundation Authority domains

**Key Principle:** Extension is a layer **above** Foundation that composes Foundation components and adds domain-specific functionality. Extension **MUST** respect all Foundation Authority rules and **MUST NOT** override, bypass, or duplicate Foundation functionality.

**This document establishes Extension Authority as the single source of truth for Extension layer boundaries.**

---

## Definition of Extension

### Extension Layer Identity

**Extension** is the architectural layer that:

- **Sits above Foundation** - Extension is built on top of Foundation components
- **Composes Foundation internally** - Extension components use Foundation components as building blocks
- **Adds domain-specific logic** - Extension adds opinionated UX patterns, business logic, and feature-rich behavior
- **Evolves independently** - Extension can be modified, replaced, or deleted without affecting Foundation
- **Uses Foundation as black boxes** - Extension interacts with Foundation only through public APIs

### Extension vs Foundation

| Aspect | Foundation Layer | Extension Layer |
|--------|----------------|-----------------|
| **Status** | ✅ LOCKED (immutable) | ✅ OPEN (evolvable) |
| **Purpose** | Infrastructure, canonical behavior | Domain logic, opinionated UX |
| **Components** | Exactly 5 (Modal, Tabs, Select, ContextMenu, Toast) | Unlimited (any composable component) |
| **Authority** | Defines Authority rules | Must comply with Authority rules |
| **Modification** | Only bug fixes, types, docs | Can evolve or be replaced |
| **Breaking Changes** | ❌ FORBIDDEN | ✅ ALLOWED (with migration path) |
| **Naming** | Reserved names (Modal, Tabs, etc.) | Descriptive, intent-based names |

### Extension Component Characteristics

Extension components are characterized by:

1. **Composition** - Extension components compose Foundation components internally
2. **Domain Logic** - Extension adds domain-specific behavior and UX patterns
3. **Intent-Based Naming** - Extension uses descriptive names (e.g., `ConfirmDialog`, `NotificationCenter`)
4. **Location** - Extension lives outside Foundation folders (e.g., `src/components/modals/`, `src/components/extensions/`)
5. **Authority Compliance** - Extension must comply with all Foundation Authority rules

---

## Allowed Extension Actions

Extension components **MAY** perform the following actions:

### 1. Compose Foundation Components

✅ **ALLOWED:** Extension components may compose Foundation components internally.

**Example:**
```typescript
// ✅ CORRECT - Extension composes Foundation internally
export const ConfirmDialog = ({ ... }) => {
  return (
    <Modal>
      <ModalContent>
        <ModalHeader>Confirm Action</ModalHeader>
        <ModalBody>Are you sure?</ModalBody>
        <ModalFooter>
          <Button>Cancel</Button>
          <Button variant="destructive">Confirm</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
```

**Rule:** Extension must use Foundation components through their public APIs only. Foundation components are treated as black boxes.

### 2. Add Domain-Specific Logic

✅ **ALLOWED:** Extension components may add domain-specific logic and UX patterns.

**Examples:**
- Notification queue management in `NotificationCenter`
- Multi-selection behavior in `MultiSelect`
- Routing integration in `TabNavigation`
- Form validation in `FormModal`
- Search functionality in `SearchSelect`

**Rule:** Domain logic must not duplicate Foundation functionality. Extension adds value on top of Foundation, not instead of Foundation.

### 3. Use Existing Tokens

✅ **ALLOWED:** Extension components may use existing tokens from all Foundation Token Authorities.

**Token Authorities Extension may use:**
- Spacing Authority tokens (spacing, padding, margin, gap)
- Radius Authority tokens (border radius)
- Typography Authority tokens (font sizes, weights, line heights)
- Motion Authority tokens (durations, easings, transitions)
- Elevation Authority tokens (shadows, z-index)
- Color tokens (from Token System)
- State tokens (from State Authority Contract)

**Rule:** Extension must use tokens according to their respective Authority rules. Extension cannot modify token values or create new token domains without unlock procedure.

### 4. Create New Extension Components

✅ **ALLOWED:** Extension components may be created without restrictions (subject to naming and composition rules).

**Rule:** New Extension components MUST:
- Compose Foundation components internally
- Use descriptive, intent-based names
- Comply with all Foundation Authority rules
- Live outside Foundation folders

### 5. Evolve and Replace

✅ **ALLOWED:** Extension components may evolve, be modified, or be replaced without affecting Foundation.

**Rule:** Extension evolution must maintain compliance with Foundation Authority rules. Breaking changes in Extension do not affect Foundation stability.

### 6. Use Foundation Public APIs

✅ **ALLOWED:** Extension components may use Foundation components through their public APIs.

**Rule:** Extension must treat Foundation components as black boxes. Extension cannot access internal implementation details of Foundation components.

---

## Forbidden Extension Actions

Extension components **MUST NOT** perform the following actions:

### 1. Override Foundation Authority Rules

❌ **FORBIDDEN:** Extension cannot override, modify, or bypass any Foundation Authority rules.

**Forbidden Authority Overrides:**
- ❌ Cannot override Interaction Authority (state priority, activation conditions, blocking rules)
- ❌ Cannot override State Authority (canonical state set, state token model, naming rules)
- ❌ Cannot override Token Authority (token values, token domains, token ownership)
- ❌ Cannot override Layout Authority (layout primitives, separation laws, component contracts)
- ❌ Cannot override Spacing Authority (spacing scales, component rules)
- ❌ Cannot override Radius Authority (radius scales, component standards)
- ❌ Cannot override Typography Authority (typography scales, semantic roles)
- ❌ Cannot override Motion Authority (motion scales, reduced motion rules)
- ❌ Cannot override Elevation Authority (elevation scales, z-index layers)
- ❌ Cannot override Foundation Enforcement (className/style exclusion is LOCKED/APPLIED - Foundation components are visually closed by design)

**Rule:** Extension must comply with all Foundation Authority rules and Foundation Enforcement. Extension cannot create alternative Authority rules or bypass Foundation Enforcement.

### 2. Duplicate Foundation Functionality

❌ **FORBIDDEN:** Extension cannot duplicate Foundation component functionality.

**Forbidden Duplications:**
- ❌ Cannot create alternative modal implementations (must use `Modal`)
- ❌ Cannot create alternative tabs implementations (must use `Tabs`)
- ❌ Cannot create alternative select implementations (must use `Select`)
- ❌ Cannot create alternative context menu implementations (must use `ContextMenu`)
- ❌ Cannot create alternative toast implementations (must use `Toast`)

**Examples of Forbidden Duplications:**
```typescript
// ❌ FORBIDDEN - Duplicates Modal functionality
export const SimpleModal = ({ ... }) => {
  // Reimplementing modal behavior - FORBIDDEN
  return <div className="modal-overlay">...</div>;
};

// ❌ FORBIDDEN - Duplicates Tabs functionality
export const BasicTabs = ({ ... }) => {
  // Reimplementing tabs behavior - FORBIDDEN
  return <div className="tabs">...</div>;
};
```

**Rule:** Extension must compose Foundation components, not reimplement them.

### 3. Bypass Foundation Components

❌ **FORBIDDEN:** Extension cannot bypass Foundation components by using Radix UI primitives directly.

**Forbidden Bypasses:**
- ❌ Cannot use `@radix-ui/react-dialog` directly (must use `Modal`)
- ❌ Cannot use `@radix-ui/react-tabs` directly (must use `Tabs`)
- ❌ Cannot use `@radix-ui/react-select` directly (must use `Select`)
- ❌ Cannot use `@radix-ui/react-context-menu` directly (must use `ContextMenu`)
- ❌ Cannot use `@radix-ui/react-toast` directly (must use `Toast`)

**Example of Forbidden Bypass:**
```typescript
// ❌ FORBIDDEN - Bypasses Foundation Modal
import * as DialogPrimitive from "@radix-ui/react-dialog";

export const ConfirmDialog = ({ ... }) => {
  return <DialogPrimitive.Root>...</DialogPrimitive.Root>; // FORBIDDEN
};
```

**Rule:** Extension must use Foundation components. Radix UI primitives are internal to Foundation only.

### 4. Use Foundation Component Names

❌ **FORBIDDEN:** Extension cannot use Foundation component names.

**Forbidden Names:**
- ❌ `Modal`, `SimpleModal`, `BasicModal`, `ModalV2`
- ❌ `Tabs`, `SimpleTabs`, `BasicTabs`, `TabsV2`
- ❌ `Select`, `SimpleSelect`, `BasicSelect`, `SelectV2`
- ❌ `ContextMenu`, `SimpleContextMenu`, `BasicContextMenu`
- ❌ `Toast`, `SimpleToast`, `BasicToast`, `ToastV2`

**Rule:** Foundation component names are reserved. Extension must use descriptive, intent-based names.

### 5. Modify Foundation Components

❌ **FORBIDDEN:** Extension cannot modify Foundation components.

**Forbidden Modifications:**
- ❌ Cannot extend Foundation component props
- ❌ Cannot wrap Foundation components with behavior-changing HOCs
- ❌ Cannot override Foundation component styles
- ❌ Cannot modify Foundation component behavior
- ❌ Cannot pass `className` or `style` props to Foundation components (Foundation Enforcement is FINAL/APPLIED - Foundation components exclude these props from public API)

**Rule:** Foundation components are immutable and visually closed by design. Extension composes Foundation, it does not modify Foundation. Foundation Enforcement (className/style exclusion) is LOCKED/APPLIED.

### 6. Create Alternative Foundation Components

❌ **FORBIDDEN:** Extension cannot create alternatives to Foundation components.

**Forbidden Alternatives:**
- ❌ `OldModal`, `LegacyModal`, `CustomModal`
- ❌ `NewTabs`, `AdvancedTabs`, `CustomTabs`
- ❌ `BetterSelect`, `EnhancedSelect`, `CustomSelect`

**Rule:** Foundation components are the sole canonical implementations. Extension cannot create alternatives.

### 7. Violate Token Authority

❌ **FORBIDDEN:** Extension cannot violate Token Authority rules.

**Forbidden Token Violations:**
- ❌ Cannot use raw string/number values for visual props (must use tokens)
- ❌ Cannot modify token values
- ❌ Cannot create new token domains without unlock procedure
- ❌ Cannot use arbitrary CSS values instead of tokens

**Rule:** Extension must use tokens according to Token Authority rules. All visual props must use token unions.

### 8. Violate Interaction Authority

❌ **FORBIDDEN:** Extension cannot violate Interaction Authority rules.

**Forbidden Interaction Violations:**
- ❌ Cannot define custom state priority orders
- ❌ Cannot define custom state activation conditions
- ❌ Cannot use JavaScript-driven interaction states (useState for hover/active)
- ❌ Cannot use `focus:` instead of `focus-visible:`
- ❌ Cannot use raw `pointer-events-none` in base state

**Rule:** Extension must comply with Interaction Authority. Extension cannot create alternative interaction behavior.

### 9. Violate State Authority

❌ **FORBIDDEN:** Extension cannot violate State Authority rules.

**Forbidden State Violations:**
- ❌ Cannot define additional states beyond canonical set (base, hover, active, focus-visible, disabled, loading)
- ❌ Cannot define custom state token models
- ❌ Cannot use local state definitions in components (must use state tokens)
- ❌ Cannot modify state token naming patterns

**Rule:** Extension must use only canonical states and state tokens according to State Authority rules.

### 10. Violate Layout Authority

❌ **FORBIDDEN:** Extension cannot violate Layout Authority rules.

**Forbidden Layout Violations:**
- ❌ Cannot define layout through spacing tokens
- ❌ Cannot use inline flex/grid in components (must use layout primitives)
- ❌ Cannot use absolute positioning without layout contract
- ❌ Cannot define layout context in UI components

**Rule:** Extension must use layout primitives according to Layout Authority rules. Extension cannot mix layout with spacing, state, or interaction.

### 11. Violate Other Foundation Authorities

❌ **FORBIDDEN:** Extension cannot violate any other Foundation Authority rules.

**Forbidden Violations:**
- ❌ Cannot violate Spacing Authority (arbitrary spacing values, component-specific scales)
- ❌ Cannot violate Radius Authority (arbitrary radius values, inline border-radius)
- ❌ Cannot violate Typography Authority (arbitrary typography values, hierarchy violations)
- ❌ Cannot violate Motion Authority (arbitrary motion values, reduced motion violations)
- ❌ Cannot violate Elevation Authority (arbitrary elevation values, z-index violations)

**Rule:** Extension must comply with all Foundation Authority rules. Extension cannot create exceptions or alternatives.

---

## Relationship to Foundation Authorities

This section defines how Extension relates to each Foundation Authority domain.

### Extension and Interaction Authority

**Relationship:** Extension **MUST** comply with Interaction Authority rules.

- ✅ **Extension MAY:** Use canonical states (base, hover, active, focus-visible, disabled, loading) according to Interaction Authority rules
- ✅ **Extension MAY:** Use state tokens from State Authority Contract
- ❌ **Extension MUST NOT:** Define custom state priority orders
- ❌ **Extension MUST NOT:** Define custom state activation conditions
- ❌ **Extension MUST NOT:** Use JavaScript-driven interaction states

**Rule:** Extension uses Interaction Authority rules, it does not modify them.

### Extension and State Authority

**Relationship:** Extension **MUST** comply with State Authority rules.

- ✅ **Extension MAY:** Use canonical state set (6 states only)
- ✅ **Extension MAY:** Use state tokens according to State Authority Contract
- ❌ **Extension MUST NOT:** Define additional states beyond canonical set
- ❌ **Extension MUST NOT:** Define custom state token models
- ❌ **Extension MUST NOT:** Use local state definitions in components

**Rule:** Extension uses State Authority rules, it does not modify them.

### Extension and Token System

**Relationship:** Extension **MUST** comply with Token System rules.

- ✅ **Extension MAY:** Use existing tokens from all token domains
- ✅ **Extension MAY:** Consume tokens according to Token Authority rules
- ❌ **Extension MUST NOT:** Modify token values
- ❌ **Extension MUST NOT:** Create new token domains without unlock procedure
- ❌ **Extension MUST NOT:** Use raw values instead of tokens

**Rule:** Extension uses Token System, it does not modify it.

### Extension and Layout Authority

**Relationship:** Extension **MUST** comply with Layout Authority rules.

- ✅ **Extension MAY:** Use canonical layout primitives (Stack, Inline, Grid, Container, Overlay)
- ✅ **Extension MAY:** Use layout according to Layout Authority rules
- ❌ **Extension MUST NOT:** Define layout through spacing tokens
- ❌ **Extension MUST NOT:** Use inline flex/grid in components
- ❌ **Extension MUST NOT:** Mix layout with spacing, state, or interaction

**Rule:** Extension uses Layout Authority rules, it does not modify them.

### Extension and Token Authorities

**Relationship:** Extension **MUST** comply with all Token Authority rules.

- ✅ **Extension MAY:** Use Spacing Authority tokens
- ✅ **Extension MAY:** Use Radius Authority tokens
- ✅ **Extension MAY:** Use Typography Authority tokens
- ✅ **Extension MAY:** Use Motion Authority tokens
- ✅ **Extension MAY:** Use Elevation Authority tokens
- ❌ **Extension MUST NOT:** Violate any Token Authority rules
- ❌ **Extension MUST NOT:** Use arbitrary values instead of tokens

**Rule:** Extension uses Token Authorities, it does not modify them.

### Extension and UI Architecture Rules

**Relationship:** Extension **MUST** comply with UI Architecture Rules.

- ✅ **Extension MAY:** Use token unions for visual props
- ✅ **Extension MAY:** Use `Responsive<T>` for responsive props
- ❌ **Extension MUST NOT:** Expose Radix props in public API
- ❌ **Extension MUST NOT:** Use raw string/number for visual props
- ❌ **Extension MUST NOT:** Export Radix primitives directly

**Rule:** Extension uses UI Architecture Rules, it does not modify them.

---

## Hard Rules

The following rules are **absolute** and have **no exceptions**:

### Rule 1: Extension Cannot Override Authority

**EXTENSION CANNOT OVERRIDE, MODIFY, OR BYPASS ANY FOUNDATION AUTHORITY RULES.**

- ❌ Extension cannot override Interaction Authority
- ❌ Extension cannot override State Authority
- ❌ Extension cannot override Token System
- ❌ Extension cannot override Layout Authority
- ❌ Extension cannot override any Token Authority
- ❌ Extension cannot override UI Architecture Rules

**Rationale:** Foundation Authorities are immutable architectural law. Extension must comply with all Authority rules.

### Rule 2: Extension Cannot Bypass Foundation

**EXTENSION CANNOT BYPASS FOUNDATION COMPONENTS BY USING RADIX UI PRIMITIVES DIRECTLY.**

- ❌ Extension cannot use `@radix-ui/react-dialog` directly (must use `Modal`)
- ❌ Extension cannot use `@radix-ui/react-tabs` directly (must use `Tabs`)
- ❌ Extension cannot use `@radix-ui/react-select` directly (must use `Select`)
- ❌ Extension cannot use `@radix-ui/react-context-menu` directly (must use `ContextMenu`)
- ❌ Extension cannot use `@radix-ui/react-toast` directly (must use `Toast`)

**Rationale:** Foundation components are the sole canonical implementations. Extension must compose Foundation, not bypass it.

### Rule 3: Extension Cannot Duplicate Foundation

**EXTENSION CANNOT DUPLICATE FOUNDATION COMPONENT FUNCTIONALITY.**

- ❌ Extension cannot create alternative modal implementations
- ❌ Extension cannot create alternative tabs implementations
- ❌ Extension cannot create alternative select implementations
- ❌ Extension cannot create alternative context menu implementations
- ❌ Extension cannot create alternative toast implementations

**Rationale:** Foundation components are the sole canonical implementations. Extension must compose Foundation, not duplicate it.

### Rule 4: Extension Cannot Use Foundation Names

**EXTENSION CANNOT USE FOUNDATION COMPONENT NAMES.**

- ❌ Extension cannot use `Modal`, `Tabs`, `Select`, `ContextMenu`, `Toast`
- ❌ Extension cannot use variations like `SimpleModal`, `BasicTabs`, `ModalV2`

**Rationale:** Foundation component names are reserved. Extension must use descriptive, intent-based names.

### Rule 5: Extension Must Compose Foundation

**EXTENSION MUST COMPOSE FOUNDATION COMPONENTS INTERNALLY.**

- ✅ Extension must use Foundation components through public APIs
- ✅ Extension must treat Foundation components as black boxes
- ✅ Extension must compose Foundation, not modify Foundation

**Rationale:** Foundation components are immutable. Extension builds on Foundation, it does not modify Foundation.

### Rule 6: Extension Must Comply with All Authorities

**EXTENSION MUST COMPLY WITH ALL FOUNDATION AUTHORITY RULES.**

- ✅ Extension must comply with Interaction Authority
- ✅ Extension must comply with State Authority
- ✅ Extension must comply with Token System
- ✅ Extension must comply with Layout Authority
- ✅ Extension must comply with all Token Authorities
- ✅ Extension must comply with UI Architecture Rules

**Rationale:** Foundation Authorities are architectural law. Extension must respect all Authority rules.

---

## Non-Goals

This document **does NOT** address the following:

### Implementation Details

❌ **This document does NOT describe:**
- How to create Extension components (implementation guide)
- Specific Extension component examples (reference implementations)
- Extension component file structure (organization guide)
- Extension component testing patterns (testing guide)

**Rationale:** This document defines boundaries and rules, not implementation details.

### Foundation Authority Rules

❌ **This document does NOT duplicate:**
- Interaction Authority rules (see [INTERACTION_AUTHORITY_CONTRACT.md](./INTERACTION_AUTHORITY_CONTRACT.md))
- State Authority rules (see [STATE_AUTHORITY_CONTRACT.md](./STATE_AUTHORITY_CONTRACT.md))
- Token System rules (see [TUI_TOKEN_SYSTEM.md](./TUI_TOKEN_SYSTEM.md))
- Layout Authority rules (see [LAYOUT_AUTHORITY_CONTRACT.md](./LAYOUT_AUTHORITY_CONTRACT.md))
- Token Authority rules (see respective Authority contracts)

**Rationale:** This document references Foundation Authority rules, it does not duplicate them.

### Specific Extension Components

❌ **This document does NOT define:**
- Which Extension components are allowed (see [TUI_EXTENSION_CANONICAL_STATE.md](./TUI_EXTENSION_CANONICAL_STATE.md))
- Extension component naming conventions (see Foundation Lock rules)
- Extension component organization (see project structure documentation)

**Rationale:** This document defines Extension boundaries, not specific Extension components.

### Extension Development Process

❌ **This document does NOT describe:**
- How to propose new Extension components
- Extension component review process
- Extension component versioning strategy

**Rationale:** This document defines architectural boundaries, not development processes.

---

## Authority Hierarchy

**Extension Authority** is subordinate to all Foundation Authorities.

**Authority Hierarchy:**
1. **Foundation Authorities** (Interaction, State, Token, Layout, Token Authorities) - Define immutable architectural law
2. **Extension Authority** (this document) - Defines Extension boundaries relative to Foundation Authorities
3. **Extension Components** - Must comply with Extension Authority and all Foundation Authorities

**Rule:** Extension Authority cannot override Foundation Authorities. Extension Authority defines how Extension relates to Foundation Authorities, not what Foundation Authorities are.

---

## Enforcement

### Guard Prompt (AI Enforcement)

**All AI assistants (including Cursor) MUST follow Extension Authority rules:**

```
⚠️ EXTENSION AUTHORITY CONTRACT IS ACTIVE.

Extension Layer Rules:
- Extension MUST compose Foundation components internally
- Extension MUST comply with Extension Authority Contract
- Extension MUST follow all Foundation Authority rules
- Extension MUST NOT override, bypass, or duplicate Foundation
- Extension MUST NOT use Foundation component names
- Extension MUST use tokens according to Token Authority rules
- Extension MUST use canonical states according to State Authority
- Extension MUST use layout primitives according to Layout Authority

Extension Components (Examples):
- ConfirmDialog (composes Modal internally)
- NotificationCenter (composes Toast internally)
- MultiSelect (composes Select internally)
- TabNavigation (composes Tabs internally)

You MUST treat Extension Authority as binding architectural law.

You MUST NEVER:
- Suggest bypassing Foundation components
- Suggest duplicating Foundation functionality
- Suggest using Foundation component names
- Suggest overriding Foundation Authority rules
- Suggest violating Token Authority rules
- Suggest violating State Authority rules
- Suggest violating Layout Authority rules

If new functionality is required:
- Create an EXTENSION component
- EXTENSION must compose Foundation components
- EXTENSION must comply with Extension Authority Contract
- EXTENSION must follow all Foundation Authority rules
```

**If a request would violate Extension Authority rules, AI assistants MUST REFUSE and explain why.**

### Code Review Enforcement

**Code review MUST verify:**
- Extension components compose Foundation components internally
- Extension components do not bypass Foundation components
- Extension components do not duplicate Foundation functionality
- Extension components do not use Foundation component names
- Extension components comply with all Foundation Authority rules

**Violations of Extension Authority are architectural defects and must be fixed immediately.**

---

## Related Documents

- **[Final Foundation Lock](./FINAL_FOUNDATION_LOCK.md)** - Foundation layer lock status (includes Foundation Enforcement Lock Status)
- **[Foundation Contract](./FOUNDATION_CONTRACT.md)** - 🔒 **FINAL/APPLIED** Foundation component contract (Foundation Enforcement is LOCKED)
- **[Foundation Component Scope](./FOUNDATION_COMPONENT_SCOPE.md)** - 🔒 **FINAL/APPLIED** Foundation component scope
- **[Interaction Authority Contract](./INTERACTION_AUTHORITY_CONTRACT.md)** - Interaction state rules
- **[State Authority Contract](./STATE_AUTHORITY_CONTRACT.md)** - State token model
- **[State Authority Matrix](./STATE_AUTHORITY_MATRIX.md)** - Canonical state set
- **[Layout Authority Contract](./LAYOUT_AUTHORITY_CONTRACT.md)** - Layout rules
- **[Token System](./TUI_TOKEN_SYSTEM.md)** - Token system documentation
- **[UI Architecture Rules](./UI_ARCHITECTURE_RULES.md)** - Radix UI and Token Union rules
- **[Extension Canonical State](./TUI_EXTENSION_CANONICAL_STATE.md)** - Allowed Extension components

---

## Version History

- **v1.0** (2025-12-16): Initial Extension Authority Contract
  - Defined Extension layer boundaries
  - Established Extension Authority rules
  - Documented relationship to Foundation Authorities
  - Created hard rules and non-goals

---

**Status:** ✅ ACTIVE  
**Version:** 1.0  
**Last Updated:** 2025-12-16  
**Priority:** CRITICAL
