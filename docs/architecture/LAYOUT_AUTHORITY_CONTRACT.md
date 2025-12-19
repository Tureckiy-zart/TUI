# Layout Authority Contract

**Status:** ✅ LOCKED  
**Priority:** BLOCKER  
**Date Created:** 2025-12-16  
**Version:** 1.1  
**Enforcement:** TUNG_LAYOUT_AUTHORITY_CONTRACT_FOUNDATION

---

## Document Classification

**TYPE:** AUTHORITY  
**MUTABILITY:** IMMUTABLE  
**LOCK STATUS:** ✅ LOCKED  
**AUTHORITY DOMAIN:** Layout Authority

**Purpose:** This document defines the canonical declarative rules for layout (structure, flow, alignment) across all UI components. It establishes architectural law that cannot be changed without explicit unlock procedure.

---

## Overview

This document defines the canonical Layout Authority contract for all UI components. It establishes the rules for layout composition, ensuring consistent structure, flow, and alignment across the design system.

**Key Principle:** Layout defines WHERE elements are positioned and how they flow. Layout is separate from spacing (distances), state (interaction states), and interaction (when states activate). Components cannot introduce arbitrary layout solutions that break architectural separation.

---

## Purpose

This document addresses the following architectural problems:

1. **Layout rules are not fixed in Authority layer** - Layout decisions are made ad-hoc in components without canonical rules
2. **Flex/Grid used as implementation detail** - Flexbox and Grid are used directly in components as implementation details, not as architectural law
3. **No prohibition on inline layout solutions** - Components can define layout context without using canonical layout primitives
4. **Layout mixing with other concerns** - Layout logic is mixed with spacing, interaction, and state logic

**This document establishes Layout Authority as the single source of truth for all layout decisions.**

---

## Scope

This section clearly defines what belongs to Layout Authority and what does not.

### What IS Layout (Layout Authority Responsibility)

**Layout Authority controls:**
- **Structure** - How elements are organized and related to each other
- **Flow** - Direction and order of element arrangement (vertical, horizontal, grid)
- **Alignment** - How elements align within their container (start, center, end, stretch)
- **Positioning Context** - The positioning context for elements (normal flow, absolute, fixed) - only through layout contracts

**Layout defines WHERE elements are positioned and how they flow relative to each other.**

### What IS NOT Layout (Other Authorities)

**Spacing Authority controls:**
- **Distances** - Gaps, padding, margins between elements
- **Spacing tokens** - Token values for spacing (not layout structure)

**State Authority controls:**
- **Component states** - What states exist (base, hover, active, disabled, loading)
- **State representation** - How states are represented as tokens

**Interaction Authority controls:**
- **State activation** - When states activate (WHEN layer)
- **Interaction behavior** - How user interactions trigger states

**Token System controls:**
- **Visual tokens** - Colors, typography, shadows, borders
- **Token values** - Actual values for visual properties

**Rule:** Layout Authority defines structure and flow (WHERE), not distances (Spacing), states (State Authority), or interaction timing (Interaction Authority).

---

## Layout Taxonomy

This section defines the canonical taxonomy of layout primitives.

### Canonical Layout Primitives

The Layout Authority recognizes the following canonical layout primitives:

1. **Stack** - Vertical or horizontal flow of elements
   - **Purpose:** Primary composition primitive for linear element arrangement
   - **Flow:** One-dimensional (vertical or horizontal)
   - **Use case:** Arranging components in a single direction

2. **Inline** - Horizontal flow with wrapping (inline flow)
   - **Purpose:** Horizontal arrangement with automatic wrapping
   - **Flow:** Horizontal with wrap capability
   - **Use case:** Tags, chips, inline elements that wrap

3. **Grid** - Two-dimensional grid layout (rows × columns)
   - **Purpose:** Two-dimensional element arrangement
   - **Flow:** Two-dimensional (rows and columns)
   - **Use case:** Card grids, form layouts, complex two-dimensional arrangements

4. **Container** - Width constraint and centering
   - **Purpose:** Constraining content width and horizontal centering
   - **Flow:** Not a flow primitive (constraint only)
   - **Use case:** Page containers, content width limits

5. **Overlay** - Positioning over other content (absolute/fixed)
   - **Purpose:** Positioning elements over other content
   - **Flow:** Absolute or fixed positioning context
   - **Use case:** Modals, tooltips, dropdowns, floating elements

**Rule:** These five primitives are the canonical set. Components must use these primitives or their semantic aliases (Column, Row) for layout composition.

---

## Canonical Layout Primitives

This section lists the allowed layout patterns that components may use.

### Allowed Layout Patterns

**1. Stack (Vertical/Horizontal)**
- Primary composition primitive for linear element arrangement
- Supports vertical (column) and horizontal (row) directions
- Provides alignment and justification controls
- Semantic aliases: Column (vertical Stack), Row (horizontal Stack)

**2. Grid**
- Two-dimensional layout for rows and columns
- Supports responsive column definitions
- Provides gap control (via Spacing Authority tokens)
- Use for card grids, form layouts, complex arrangements

**3. Container**
- Width constraint and horizontal centering
- Provides max-width control and horizontal padding
- Does NOT provide layout composition (flex/grid)
- Use for page containers, content width limits

**4. Flex (Extended Flexbox)**
- Advanced flexbox control beyond Stack capabilities
- Provides full flexbox property control (wrap, grow, shrink, basis)
- Use when Stack is insufficient for flexbox needs

**5. Box (Base Container)**
- Base container for spacing and visual properties
- **NOT a layout primitive** - does NOT provide layout composition
- Provides padding, margin, background, radius, shadow
- Use for spacing and visual properties only, not for layout

**Rule:** Components must use these canonical layout primitives for layout composition. Direct use of flex/grid CSS properties in components is forbidden without layout abstraction.

---

## Allowed Usage Patterns

This section provides declarative examples of allowed layout usage (without code implementation details).

### Pattern 1: Stack for Vertical Composition
**Allowed:** Using Stack component for vertical composition of UI components
- Stack arranges components in vertical flow
- Spacing between items controlled by Spacing Authority tokens
- Alignment controlled by Stack props

### Pattern 2: Row for Horizontal Arrangement
**Allowed:** Using Row component (semantic alias for horizontal Stack) for horizontal element arrangement
- Row arranges elements in horizontal flow
- Spacing between items controlled by Spacing Authority tokens
- Alignment controlled by Row props

### Pattern 3: Grid for Two-Dimensional Layouts
**Allowed:** Using Grid component for two-dimensional layouts requiring rows and columns
- Grid arranges elements in two-dimensional grid
- Column definitions controlled by Grid props
- Gap between items controlled by Spacing Authority tokens

### Pattern 4: Container for Width Constraint
**Allowed:** Using Container component for constraining content width and horizontal centering
- Container limits content width via max-width
- Container provides horizontal padding via Spacing Authority tokens
- Container centers content horizontally

### Pattern 5: Composition of Layout Primitives
**Allowed:** Composing layout primitives hierarchically (Container > Stack > Grid)
- Layout primitives can be nested
- Each primitive maintains its own layout responsibility
- Composition creates complex layout structures

**Rule:** These patterns are allowed because they use canonical layout primitives and maintain separation from spacing, state, and interaction concerns.

---

## Forbidden Patterns

This section provides declarative examples of forbidden layout patterns (without code implementation details).

### Pattern 1: Inline Flex/Grid in UI Components
**Forbidden:** Using `display: flex` or `display: grid` directly in UI components (Button, Modal, Select, etc.) without layout abstraction
- UI components must not define layout context
- Layout must be provided by layout primitives (Stack, Grid, Container)
- Direct flex/grid CSS in components breaks architectural separation

### Pattern 2: Absolute Positioning Without Layout Contract
**Forbidden:** Using `position: absolute` or `position: fixed` directly in components without explicit layout contract
- Absolute positioning must go through Overlay layout primitive
- Components cannot position themselves absolutely without layout abstraction
- Positioning context must be defined by layout primitives

### Pattern 3: Layout Through Margin
**Forbidden:** Using margin to create layout structure (margin for positioning, not spacing)
- Margin is a spacing property (Spacing Authority), not a layout property
- Layout structure must use layout primitives, not margin
- Margin can only be used for spacing distances, not for layout composition

### Pattern 4: Layout Context in UI Components
**Forbidden:** UI components (Button, Modal, Select, etc.) defining external layout context
- UI components must not control how they are arranged externally
- Layout context must be provided by layout primitives
- UI components are layout consumers, not layout providers

### Pattern 5: Direct Display Properties in Components
**Forbidden:** Using `display: flex`, `display: grid`, `display: inline-flex` directly in component CSS without layout abstraction
- Display properties must be provided by layout primitives
- Components cannot define their own display context
- Layout primitives are the only source of display context

**Rule:** These patterns are forbidden because they break architectural separation, mix layout with other concerns, or bypass canonical layout primitives.

---

## Separation Laws

This section defines hard rules for separating Layout Authority from other authorities.

### Separation Law 1: Layout vs Spacing

**Layout Authority controls:** Structure, flow, alignment (WHERE elements are)
**Spacing Authority controls:** Distances, gaps, padding, margins (HOW FAR elements are)

**Rule:** Layout defines structure and flow. Spacing defines distances. Layout CANNOT be defined through spacing tokens. Spacing tokens define distances within layout structure, not the structure itself.

**Example:**
- ✅ **Allowed:** Stack defines vertical flow, spacing token defines gap between items
- ❌ **Forbidden:** Using margin to create layout structure (margin is spacing, not layout)

### Separation Law 2: Layout vs State

**Layout Authority controls:** WHERE elements are positioned (structure, flow)
**State Authority controls:** WHAT states exist (base, hover, active, disabled, loading)

**Rule:** Layout defines structure. State defines component conditions. Layout CANNOT depend on state. State changes do not affect layout structure.

**Example:**
- ✅ **Allowed:** Layout structure remains constant regardless of component state
- ❌ **Forbidden:** Changing layout structure based on component state (state affects visual appearance, not layout)

### Separation Law 3: Layout vs Interaction

**Layout Authority controls:** Structure and flow (WHERE)
**Interaction Authority controls:** WHEN states activate (interaction timing)

**Rule:** Layout defines structure. Interaction defines activation timing. Layout CANNOT depend on interaction. Interaction timing does not affect layout structure.

**Example:**
- ✅ **Allowed:** Layout structure remains constant regardless of interaction state
- ❌ **Forbidden:** Changing layout structure based on interaction (hover, focus, etc.)

### Separation Law 4: Layout vs Positioning

**Layout Authority controls:** Positioning context (normal flow, absolute, fixed) - only through layout contracts
**Direct positioning:** Absolute/fixed positioning forbidden without layout contract

**Rule:** Positioning (absolute, fixed) is allowed ONLY through layout contracts (Overlay primitive). Components cannot position themselves absolutely without layout abstraction.

**Example:**
- ✅ **Allowed:** Overlay primitive provides absolute positioning context
- ❌ **Forbidden:** Direct `position: absolute` in components without Overlay primitive

---

## Component Contract Rule

This section defines the contract rule for components regarding layout.

### Rule: Components Do Not Define Layout Context

**UI Components (Button, Modal, Select, etc.) MUST NOT:**
- Define external layout context (how they are arranged externally)
- Use flex/grid directly for composition
- Control their positioning in parent layout
- Define layout structure for their children (unless they are layout components)

**UI Components ARE:**
- Layout consumers - they are arranged by layout primitives
- Content providers - they provide content to be arranged
- Self-contained - they manage their internal structure only

**Layout Components (Stack, Grid, Container, etc.) ARE:**
- Layout providers - they define layout context
- Composition primitives - they arrange other components
- Layout authorities - they are the only source of layout structure

**Rule:** If a component is not a layout component, it MUST NOT define layout context. Layout context must be provided by layout primitives.

---

## Internal vs External Layout Rule

This section explicitly distinguishes between internal layout (within a component) and external layout (layout context provided by parent), eliminating ambiguities when scaling components.

### Internal Layout (Component Content Structure)

**Internal layout** refers to the layout structure **within** a component's own content boundaries.

**UI Components ARE ALLOWED to:**
- Define layout structure for their **internal content** (elements within the component)
- Use layout primitives (Stack, Grid, etc.) to arrange **internal elements** of the component
- Manage the structure of **component's own content** (icon + text arrangement, internal element flow)

**Example:**
- ✅ **Allowed:** Button component uses internal Stack to arrange icon and text within the button
- ✅ **Allowed:** Modal component uses internal Stack to arrange header, body, and footer within the modal
- ✅ **Allowed:** Card component uses internal Stack to arrange title, description, and actions within the card

**Rule:** Components can manage their internal content structure using layout primitives. This is internal layout, not external layout context.

### External Layout (Parent Layout Context)

**External layout** refers to the layout context provided by the **parent** that arranges components.

**UI Components MUST NOT:**
- Define or control how they are arranged **externally** (by parent layout)
- Influence the layout context of their **parent container**
- Control their positioning or arrangement in the **parent's layout structure**
- Define layout rules that affect **sibling components** or parent layout

**Example:**
- ❌ **Forbidden:** Button component defining how it should be arranged in a parent Stack
- ❌ **Forbidden:** Modal component controlling its position in parent Grid
- ❌ **Forbidden:** Card component influencing how cards are arranged in parent Grid

**Rule:** Components are layout consumers for external layout. They cannot define or control the layout context provided by their parent.

### Clear Separation Principle

**Internal Layout (Component Responsibility):**
- Layout structure **within** component boundaries
- Arrangement of **component's own content**
- Structure of **internal elements** (icon, text, nested elements)
- **ALLOWED** - Components can use layout primitives for internal content

**External Layout (Parent Responsibility):**
- Layout context **provided by parent**
- Arrangement of **components themselves**
- Structure of **component composition** (how components are arranged)
- **FORBIDDEN** - Components cannot control parent layout context

**Rule:** Internal layout is component's responsibility for its content. External layout is parent's responsibility for component arrangement. These are strictly separated concerns.

### Component Layout Boundaries

**Component Layout Boundary:**
- **Inside boundary:** Component manages layout for its internal content (ALLOWED)
- **Outside boundary:** Component cannot control parent layout context (FORBIDDEN)

**Layout Primitive Boundary:**
- **Layout primitives** (Stack, Grid, Container) provide external layout context
- **UI components** consume external layout context
- **UI components** provide internal layout for their content

**Rule:** Components have clear layout boundaries. Internal layout (content structure) is allowed. External layout (parent context) is forbidden.

---

## Precedence Rules

This section defines what has priority in layout decisions.

### Precedence Rule 1: Layout Container Over Component Internal Structure

**Layout Container (Stack, Grid, Container) has priority over Component Internal Structure**

- External layout (provided by layout primitives) determines how components are arranged
- Component internal structure does not affect external layout
- Components must adapt to layout container, not vice versa

**Example:**
- ✅ **Allowed:** Stack arranges Buttons vertically, regardless of Button internal structure
- ❌ **Forbidden:** Button internal structure affecting how Stack arranges it

### Precedence Rule 2: External Layout Determines Composition

**External layout (Stack/Grid/Container) determines component composition**

- Layout primitives control how components are composed
- Components are passive in layout composition
- Layout primitives are active in layout composition

**Example:**
- ✅ **Allowed:** Grid determines card arrangement, cards are passive
- ❌ **Forbidden:** Cards determining their own arrangement in grid

### Precedence Rule 3: Internal Structure Does Not Affect External Layout

**Component internal structure does not influence external layout**

- Components manage their internal structure
- External layout is independent of component internals
- Layout primitives are unaware of component internals

**Example:**
- ✅ **Allowed:** Button internal structure (icon + text) does not affect Stack arrangement
- ❌ **Forbidden:** Button internal structure changing Stack behavior

---

## Hard Rules

The following rules are **IMMUTABLE** and **MANDATORY**:

### Rule 1: Layout Cannot Be Defined Through Spacing Tokens

**Layout structure cannot be created using spacing tokens.**

- ✅ **ALLOWED:** Spacing tokens define distances within layout structure
- ❌ **FORBIDDEN:** Using spacing tokens (margin, padding) to create layout structure
- ❌ **FORBIDDEN:** Layout defined through spacing values

**Rationale:** Layout defines structure. Spacing defines distances. These are separate concerns.

### Rule 2: Components Cannot Define External Layout

**UI components cannot define how they are arranged externally.**

- ✅ **ALLOWED:** Components manage their internal structure
- ❌ **FORBIDDEN:** Components defining external layout context
- ❌ **FORBIDDEN:** Components controlling their arrangement in parent layout

**Rationale:** Layout is provided by layout primitives, not by UI components.

### Rule 3: Flex/Grid Forbidden Without Layout Abstraction

**Direct use of flex/grid CSS properties in components is forbidden without layout abstraction.**

- ✅ **ALLOWED:** Using layout primitives (Stack, Grid, Flex) for layout
- ❌ **FORBIDDEN:** Direct `display: flex` or `display: grid` in UI components
- ❌ **FORBIDDEN:** Inline flex/grid CSS in component styles

**Rationale:** Layout must go through canonical layout primitives, not direct CSS.

### Rule 4: Absolute Positioning Forbidden Without Layout Contract

**Absolute positioning is forbidden without explicit layout contract (Overlay primitive).**

- ✅ **ALLOWED:** Absolute positioning through Overlay layout primitive
- ❌ **FORBIDDEN:** Direct `position: absolute` or `position: fixed` in components
- ❌ **FORBIDDEN:** Absolute positioning without layout abstraction

**Rationale:** Positioning context must be provided by layout primitives, not directly in components.

### Rule 5: Layout Cannot Depend on Interaction or State

**Layout structure cannot depend on interaction states or component states.**

- ✅ **ALLOWED:** Layout structure remains constant regardless of state
- ❌ **FORBIDDEN:** Changing layout structure based on hover, focus, active states
- ❌ **FORBIDDEN:** Changing layout structure based on disabled, loading states

**Rationale:** Layout defines structure (WHERE). State and Interaction define conditions (WHAT and WHEN). These are separate concerns.

---

## Explicitly Out of Scope

This document explicitly does NOT cover the following concerns:

### ❌ Implementation Details

**This document does NOT define:**
- How layout primitives are implemented (Stack, Grid, Container implementation)
- Tailwind CSS usage patterns for layout
- CVA (Class Variance Authority) patterns for layout
- CSS-in-JS implementation details

**Rationale:** Implementation details belong to the implementation layer, not the authority layer.

### ❌ Enforcement Mechanisms

**This document does NOT define:**
- ESLint rules for layout enforcement
- Runtime validation of layout rules
- Automated checks for layout violations
- Code review checklists for layout

**Rationale:** Enforcement mechanisms belong to the enforcement layer, not the authority layer.

### ❌ Refactoring Existing Components

**This document does NOT define:**
- How to refactor existing components to comply with Layout Authority
- Migration path for components with layout violations
- Step-by-step refactoring procedures

**Rationale:** Refactoring is a separate concern from authority definition.

---

## Relationship to Other Authorities

This section clarifies the relationship between Layout Authority and other authorities.

### Spacing Authority

**Spacing Authority controls:** Distances, gaps, padding, margins (HOW FAR)
**Layout Authority controls:** Structure, flow, alignment (WHERE)

**Relationship:** Layout defines structure. Spacing defines distances within that structure. Layout cannot be defined through spacing tokens.

**Example:** Stack defines vertical flow (Layout). Spacing token defines gap between items (Spacing).

### State Authority

**State Authority controls:** Component states (WHAT states exist)
**Layout Authority controls:** Structure and flow (WHERE)

**Relationship:** Layout defines structure. State defines component conditions. Layout cannot depend on state.

**Example:** Layout structure remains constant regardless of component state (hover, disabled, etc.).

### Interaction Authority

**Interaction Authority controls:** WHEN states activate (interaction timing)
**Layout Authority controls:** Structure and flow (WHERE)

**Relationship:** Layout defines structure. Interaction defines activation timing. Layout cannot depend on interaction.

**Example:** Layout structure remains constant regardless of interaction state activation.

### Token System

**Token System provides:** Visual tokens (colors, typography, shadows, borders)
**Layout Authority controls:** Structure and flow (WHERE)

**Relationship:** Token System provides visual values. Layout Authority provides structure. Token System should not contain layout decisions.

**Example:** Token System provides spacing values. Layout Authority defines how spacing is used in layout structure.

---

## Authority Chain

**Layout Authority** is the single source of truth for all layout decisions across all UI components in the design system.

**Authority Hierarchy:**
1. **Layout Authority Contract** (this document) - Defines rules and constraints
2. **Layout Primitives** - Stack, Grid, Container, Flex, Box provide canonical layout implementations
3. **Component Implementation** - Components consume layout primitives only
4. **Layout System** - Layout primitives ensure consistent structure and flow

---

## Unlock Procedure

Any Layout Authority modifications require:

1. **Explicit unlock task** with justification
2. **Full audit** of all component layout usage
3. **Impact analysis** of proposed changes
4. **Explicit approval** from architecture authority
5. **Re-verification** of all components after changes
6. **Re-lock** with updated documentation

**Unlock is reserved for:** Critical architectural changes that cannot be accommodated within the existing canonical layout model.

**Note:** Layout Authority lock applies to **BOTH humans and AI agents**. Any request to modify locked layout authority aspects **MUST** be refused with reference to the Layout Authority lock.

**Do not modify Layout Authority without explicit 'Unlock Layout Authority' task approval.**

**Note:** Future changes to Authority rules require either:
- New Authority version (e.g., `LAYOUT_AUTHORITY_CONTRACT_v2.md`) with full migration path
- Explicit unlock procedure with full audit and approval

---

## Related Documents

- [SPACING_AUTHORITY_CONTRACT.md](./SPACING_AUTHORITY_CONTRACT.md) - Defines spacing distances (separate from layout)
- [STATE_AUTHORITY_CONTRACT.md](./STATE_AUTHORITY_CONTRACT.md) - Defines component states (separate from layout)
- [INTERACTION_AUTHORITY_CONTRACT.md](./INTERACTION_AUTHORITY_CONTRACT.md) - Defines interaction timing (separate from layout)
- [INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md](./INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md) - Defines interactive size scale (separate from layout)
- [FINAL_FOUNDATION_LOCK.md](./FINAL_FOUNDATION_LOCK.md) - Foundation layer lock status

**Note:** Non-interactive components (Card, Stack, Grid) MUST NOT use `size` prop. Layout uses spacing tokens (padding, gap) instead. See [Interactive Size Scale Authority Contract](./INTERACTIVE_SIZE_SCALE_AUTHORITY_CONTRACT.md) for interactive component sizing rules.

---

## Version History

- **v1.1** (2025-12-16): Formal Lock Completion
  - Changed status from ACTIVE to LOCKED
  - Formally locked as part of Foundation layer closure
  - All rules are immutable and require unlock procedure for modifications
  - Future changes require Authority versioning (v2+) or explicit unlock procedure

- **v1.0** (2025-12-16): Initial Layout Authority Contract definition
  - Defined canonical layout primitives (Stack, Inline, Grid, Container, Overlay)
  - Defined separation laws (Layout vs Spacing, State, Interaction, Positioning)
  - Defined component contract rules (components do not define layout context)
  - Defined precedence rules (layout container over component structure)
  - Defined hard rules (immutable layout rules)
  - Explicitly separated layout from spacing, state, and interaction concerns
  - Formally established as immutable authority

---

**Last Updated:** 2025-12-16  
**Version:** 1.1  
**Lock Status:** ✅ LOCKED - Only changes allowed via explicit 'Unlock Layout Authority' task
