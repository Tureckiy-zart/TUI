# 🏛️ TenerifeUI Internal Canonical Context

**Version:** 1.0  
**Date Created:** 2025-12-13  
**Status:** ✅ **IMMUTABLE**  
**Priority:** **CRITICAL**  
**Layer:** META / ARCHITECTURE / AI_CONTEXT

---

## 📋 Purpose

This document is the **single, authoritative source of truth** for TenerifeUI architecture, design philosophy, constraints, decisions, and development rules. It replaces all fragmented architectural documentation and serves as the **sole context source** for both human maintainers and AI assistants.

**This document is:**
- ✅ **NOT user-facing** (internal only)
- ✅ **NOT marketing** (declarative, not promotional)
- ✅ **NOT a tutorial** (reference, not guide)
- ✅ **Architectural and declarative** (rules, not explanations)
- ✅ **IMMUTABLE** (this document overrides all other docs except `MASTER_TASK` and `PROJECT_PROGRESS`)

**After reading this document, no additional architecture documentation should be required.** AI assistants should operate correctly using only this file plus Master Task and Progress tracking.

---

## 0. Current Foundation Status

### Foundation Authorities: CLOSED and IMMUTABLE

**Status:** ✅ **FOUNDATION CLOSED**  
**Date:** 2025-12-16  
**Source of Truth:** [FINAL_FOUNDATION_LOCK.md](./architecture/FINAL_FOUNDATION_LOCK.md)

**The Foundation architecture phase is OFFICIALLY CLOSED.** All Foundation Authorities are **COMPLETE**, **IMMUTABLE**, and **LOCKED**:

- ✅ **Interaction Authority** - LOCKED (State priority order, activation conditions, blocking rules)
- ✅ **State Authority Matrix** - LOCKED (Canonical state set, state semantics, priority order)
- ✅ **State Authority Contract** - LOCKED (State token model, naming rules, property mapping)
- ✅ **Token System** - LOCKED (All token domains, ownership rules, semantic classifications)
- ✅ **Spacing Authority** - LOCKED (Canonical spacing scale, component rules, forbidden patterns)
- ✅ **Radius Authority** - LOCKED (Canonical radius scale, component standards, forbidden patterns)
- ✅ **Typography Authority** - LOCKED (Canonical typography scale, semantic roles, forbidden patterns)
- ✅ **Motion Authority** - LOCKED (Canonical motion tokens, durations, easings, forbidden patterns)
- ✅ **Elevation Authority** - LOCKED (Canonical elevation tokens, z-index scale, forbidden patterns)
- ✅ **Layout Authority** - LOCKED (Canonical layout primitives, separation laws, forbidden patterns)
- ✅ **Foundation Enforcement** - LOCKED / APPLIED (className/style exclusion, TypeScript/ESLint enforcement)
- ✅ **Extension Authority Contract** - ACTIVE (Extension layer boundary contract)

### Authority Immutability

**Foundation Authorities are IMMUTABLE:**
- ❌ **NO** modifications to existing Authority rules
- ❌ **NO** changes to Authority contracts
- ❌ **NO** additions to Foundation Authority set
- ❌ **NO** breaking changes to Authority structure

**Future changes to Foundation Authorities are ONLY possible through:**
1. **Explicit Authority Versioning** - New Authority versions (e.g., `INTERACTION_AUTHORITY_CONTRACT_v2.md`)
2. **Explicit Unlock Procedure** - Full audit, justification, approval, and re-lock workflow
3. **Explicit User Approval** - No Authority modifications without explicit user request and approval

### Current Development Phase

**Foundation Phase:** ✅ **CLOSED**  
**Enforcement Phase:** ✅ **OPEN** (Enforcement mechanisms can evolve)  
**Extension Phase:** ✅ **OPEN** (Extension development is allowed)

**All future development must occur in:**
- **Enforcement Layer** - Improving enforcement mechanisms (tooling, scripts, verification)
- **Extension Layer** - Building new components that compose Foundation components

**Rule:** Foundation Authorities are closed. Authority rules cannot be modified without explicit unlock procedure or new Authority versioning.

---

## 1. Project Identity

### What TenerifeUI Is

TenerifeUI (`@tenerife.music/ui`) is a **token-driven design infrastructure** that provides a production-grade foundation for building consistent, themeable user interfaces.

**Core Characteristics:**
- **Design Infrastructure:** Provides design tokens, foundational components, and architectural patterns (not a complete UI kit)
- **Token-Driven:** All visual properties are controlled through semantic design tokens (no hardcoded values)
- **Production-Grade:** Built for real-world applications requiring consistency, accessibility, and theme support
- **Radix-First:** Delegates all behavior to Radix UI primitives for accessibility and interaction patterns

### What Problem It Solves

TenerifeUI solves the problem of **design consistency at scale** by providing:
- **Semantic token system** that maps to design decisions (not pixels or magic numbers)
- **Immutable Foundation layer** that ensures stable, predictable component behavior
- **Extension composability** that allows domain-specific patterns without breaking Foundation stability
- **Type-safe APIs** that enforce design system usage through TypeScript

### What TenerifeUI Is NOT

TenerifeUI explicitly **does not**:
- ❌ Provide a complete UI kit for end users (it's infrastructure, not a product)
- ❌ Replace shadcn/ui patterns (it uses shadcn/ui patterns internally, but wraps them in token-driven APIs)
- ❌ Act as a design tool or visual editor
- ❌ Support arbitrary styling systems (must use token system)
- ❌ Provide general-purpose components for every use case (Foundation is minimal and locked)

---

## 2. Architectural Philosophy

### Why Token-Driven Architecture

**Principle:** Semantic tokens > numeric values.

**Rationale:**
- **Design Consistency:** Tokens ensure all components use the same spacing, colors, typography, and motion values
- **Theme Support:** Token system enables instant theme switching (light/dark) and custom theme creation
- **Maintainability:** Changing a token value updates all components automatically (single source of truth)
- **Developer Experience:** TypeScript token unions provide IntelliSense autocomplete and compile-time validation
- **Design System Alignment:** Tokens bridge the gap between design decisions and implementation

**Consequence:** All visual properties in component APIs **MUST** use token union types. Raw strings, numbers, or CSS values are **FORBIDDEN** in public APIs.

### Why Radix UI Is the Sole Behavioral Foundation

**Principle:** Radix UI provides behavior; TenerifeUI provides visual design.

**Rationale:**
- **Accessibility:** Radix provides battle-tested, WCAG-compliant accessibility patterns (ARIA attributes, keyboard navigation, focus management)
- **Behavioral Correctness:** Radix handles complex interaction patterns (focus traps, portal rendering, scroll locking, collision detection)
- **Maintenance Burden:** Reimplementing accessibility and interaction patterns is error-prone and costly
- **Industry Standard:** Radix UI is the recognized standard for accessible React components

**Consequence:** Foundation components **MUST** delegate ALL behavior to Radix UI primitives. Custom implementations of focus management, keyboard navigation, ARIA attributes, portals, or scroll locking are **FORBIDDEN**.

### Why Tailwind Utilities Are Forbidden at Component Level

**Principle:** Design tokens must be the source of truth, not Tailwind utility classes.

**Rationale:**
- **Token System Violation:** Using Tailwind utilities (e.g., `p-4`, `gap-2`, `rounded-md`) bypasses the token system
- **Theme Breaking:** Hardcoded Tailwind utilities don't respect theme tokens, breaking theme switching
- **Design Inconsistency:** Tailwind utilities allow arbitrary values that don't align with design system decisions
- **Refactoring Risk:** Changing design tokens won't affect components using hardcoded Tailwind utilities

**Consequence:** Tailwind utilities are **FORBIDDEN** for visual properties (spacing, colors, shadows, borders, typography, sizing, opacity, transitions). Tailwind is **ALLOWED** only for structural properties (flex, grid, block, relative, absolute, pointer-events, overflow, z-index, display).

### Why CVA Is Used Only as a Variant Transport Layer

**Principle:** CVA is a variant system, not a styling engine.

**Rationale:**
- **Variant Management:** CVA provides a clean API for managing component variants (base classes, variants, compound variants)
- **Token Integration:** CVA variants map to design tokens, ensuring variant styles come from the token system
- **Type Safety:** CVA works with TypeScript to provide type-safe variant props
- **Separation of Concerns:** CVA handles variant logic; tokens handle actual styling values

**Consequence:** CVA is used to **transport** variant selections to token-based styles. CVA does **NOT** replace the token system or allow hardcoded styles. All variant styles **MUST** reference design tokens.

---

## 3. Two-Layer Architecture Model

### Mental Model

TenerifeUI uses a **two-layer architecture** that separates **infrastructure** (Foundation) from **applications** (Extensions).

**Foundation Layer = Infrastructure:**
- Provides stable, immutable building blocks
- Defines canonical behavior and structure for each category
- Cannot change without breaking backward compatibility
- One component per category (no duplicates, no alternatives)

**Extension Layer = Applications:**
- Builds on Foundation to provide domain-specific functionality
- May evolve, be replaced, or be deleted without affecting Foundation
- Composes Foundation components internally
- May add opinionated UX patterns and domain logic

### Foundation vs Extension Comparison

| Aspect | Foundation Layer | Extension Layer |
|--------|-----------------|----------------|
| **Status** | ✅ LOCKED (immutable) | ✅ OPEN (evolvable) |
| **Purpose** | Infrastructure, canonical behavior | Domain logic, opinionated UX |
| **Components** | Exactly 5 (Modal, Tabs, Select, ContextMenu, Toast) | Unlimited (any composable component) |
| **Location** | `src/components/modal/`, `src/components/navigation/tabs/`, etc. | `src/components/modals/`, `src/components/extensions/`, etc. |
| **Naming** | Reserved names (Modal, Tabs, Select, ContextMenu, Toast) | Descriptive, intent-based names (ConfirmDialog, NotificationCenter) |
| **Exports** | Stable, backward-compatible | May evolve or change |
| **Breaking Changes** | ❌ FORBIDDEN | ✅ ALLOWED (with migration path) |
| **Duplicates** | ❌ FORBIDDEN (one per category) | ✅ ALLOWED (different domains) |
| **Radix Usage** | ✅ REQUIRED (delegates all behavior) | ✅ REQUIRED (composes Foundation) |
| **Token Usage** | ✅ REQUIRED (all visual props tokenized) | ✅ REQUIRED (all visual props tokenized) |

---

## 3.1. Directory Structure

### Component Organization

The TenerifeUI directory structure reflects the two-layer architecture model. Foundation components are in dedicated folders, while Extensions are organized by domain or functionality.

**Foundation Component Locations:**

```
src/components/
├── modal/                    # 🔒 FOUNDATION: Modal (Radix Dialog)
│   ├── Modal.tsx
│   ├── Modal.stories.tsx
│   ├── Modal.test.tsx
│   └── index.ts
│
├── navigation/
│   └── tabs/                 # 🔒 FOUNDATION: Tabs (Radix Tabs)
│       ├── Tabs.tsx
│       ├── Tabs.stories.tsx
│       └── index.ts
│
├── select/                   # 🔒 FOUNDATION: Select (Radix Select)
│   ├── Select.tsx
│   ├── Select.stories.tsx
│   ├── index.ts
│   └── legacy/               # Archived (not exported)
│
├── menus/
│   └── context-menu/         # 🔒 FOUNDATION: ContextMenu (Radix ContextMenu)
│       ├── ContextMenu.tsx
│       ├── ContextMenu.stories.tsx
│       ├── ContextMenu.test.tsx
│       └── index.ts
│
└── overlays/
    └── Toast.tsx             # 🔒 FOUNDATION: Toast (Radix Toast)
```

**Extension Component Locations:**

```
src/components/
├── modals/                   # ✅ EXTENSION: Modal Extensions
│   ├── ConfirmDialog.tsx     # Uses Modal internally
│   ├── ConfirmDialog.stories.tsx
│   └── ModalProvider.tsx
│
├── notifications/            # ✅ EXTENSION: Toast Extensions
│   ├── NotificationCenter.tsx  # Uses Toast internally
│   ├── NotificationCenter.*.tsx
│   └── useNotificationCenter.tsx
│
├── overlays/                 # ✅ EXTENSION: Other Overlays (NOT Foundation Toast)
│   ├── Dialog.tsx            # Uses Modal internally
│   ├── Popover.tsx
│   ├── Tooltip.tsx
│   ├── Backdrop.tsx
│   └── Toast.tsx             # 🔒 FOUNDATION (only this file)
│
├── menus/                    # ✅ EXTENSION: Menu Extensions (NOT Foundation ContextMenu)
│   ├── ~~dropdown/~~         # ✅ REMOVED (MIGRATION_12C)
│   ├── ~~DropdownMenu.tsx~~  # ✅ REMOVED (MIGRATION_12C)
│   ├── hover-card/           # ✅ Uses COMPOSITION/overlays/Popover (Radix-based)
│   ├── ~~popover/~~          # ✅ REMOVED (MIGRATION_12D - migrated to COMPOSITION/overlays/Popover)
│   └── context-menu/         # 🔒 FOUNDATION (only this subfolder)
│
├── navigation/               # ✅ EXTENSION: Navigation Extensions (NOT Foundation Tabs)
│   ├── tabs/                 # 🔒 FOUNDATION (only this subfolder)
│   ├── breadcrumbs/
│   ├── pagination/
│   ├── segmented-control/
│   ├── stepper/
│   ├── Breadcrumbs.tsx
│   └── Pagination.tsx
│
├── ui/                       # ✅ EXTENSION: Primitive Components
│   ├── button.tsx
│   ├── input.tsx
│   ├── card.tsx
│   ├── badge.tsx
│   └── ... (other primitives)
│
├── layout/                   # ✅ EXTENSION: Layout Components
│   ├── Flex.tsx
│   ├── Grid.tsx
│   ├── Stack.tsx
│   ├── Container.tsx
│   └── ...
│
├── cards/                    # ✅ EXTENSION: Card Components
│   ├── CardBase/
│   ├── ArtistCard/
│   ├── VenueCard/
│   └── ...
│
├── data/                     # ✅ EXTENSION: Data Display
│   ├── Table.tsx
│   ├── List.tsx
│   ├── Timeline.tsx
│   └── ...
│
└── filters/                  # ✅ EXTENSION: Filter Components
    ├── FilterBar.tsx
    ├── DateRangePicker.tsx
    └── ...
```

**Token System Locations:**

```
src/
├── tokens/                   # Design Token Definitions
│   ├── spacing.ts
│   ├── colors.ts
│   ├── radius.ts
│   ├── typography.ts
│   ├── shadows.ts
│   ├── motion.ts
│   ├── opacity.ts
│   ├── types/
│   │   └── index.ts          # Token union types
│   └── components/           # Component-specific tokens
│       ├── button.ts
│       ├── card.ts
│       └── ...
│
├── theme/                    # Theme System
│   ├── ThemeProvider.tsx
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   └── ...
│
└── themes/                   # Theme Definitions
    ├── default.ts
    ├── dark.ts
    └── ...
```

**Supporting Infrastructure:**

```
src/
├── hooks/                    # React Hooks
│   ├── useToast.ts
│   ├── useModal.ts
│   └── ...
│
├── lib/                      # Utility Libraries
│   ├── responsive-props.ts   # Responsive<T> utilities
│   ├── utils.ts
│   └── a11y.ts
│
├── types/                    # Type Definitions
│   └── responsive.ts         # Responsive<T> type
│
├── icons/                    # Icon Components
│   └── ...
│
└── animation/                # Animation Utilities
    └── ...
```

### Directory Naming Conventions

**Foundation Folders:**
- Use singular, descriptive names: `modal/`, `select/`
- Foundation folders contain ONLY Foundation components
- Foundation folders may contain nested structure (e.g., `navigation/tabs/`)

**Extension Folders:**
- Use plural for collections: `modals/`, `notifications/`, `cards/`
- Use descriptive domain names: `filters/`, `data/`, `layout/`
- Extension folders may contain multiple related components

**Legacy Folders:**
- Legacy code is stored in `legacy/` subfolders
- Legacy folders are NOT exported in public API
- Examples: `input/legacy/`, `select/legacy/`, `textarea/legacy/`

### Key Rules for Directory Structure

1. **Foundation folders are reserved for Foundation components only**
   - ❌ Extensions cannot be placed in Foundation folders
   - ✅ Extensions use separate folders (e.g., `modals/` not `modal/`)

2. **Foundation components have dedicated folders**
   - Each Foundation component has its own folder
   - Foundation folders may contain nested subfolders if needed

3. **Extensions are organized by domain or functionality**
   - Related Extensions are grouped together
   - Domain-specific Extensions use descriptive folder names

4. **Tokens are centralized in `src/tokens/`**
   - Token definitions are in `src/tokens/`
   - Token types are in `src/tokens/types/`
   - Component-specific tokens are in `src/tokens/components/`

---

## 4. Foundation Layer (LOCKED)

### Foundation Status

**Status:** ✅ **FOUNDATION CLOSED**  
**Lock Date:** 2025-12-12  
**Architecture Phase:** **CLOSED** (Foundation phase is complete and immutable)  
**Source of Truth:** [FINAL_FOUNDATION_LOCK.md](./architecture/FINAL_FOUNDATION_LOCK.md)

**The Foundation layer is OFFICIALLY CLOSED.** All Foundation Authorities are **LOCKED** and **IMMUTABLE**. Foundation components, Token System, and all Authority Contracts are frozen and cannot be modified without explicit unlock procedure.

### The Five Foundation Components

The Foundation layer consists of **exactly five components**, one per category:

| Component | Category | Base Library | Location | Status |
|-----------|----------|--------------|----------|--------|
| **Modal** | Overlays | Radix Dialog | `src/components/modal/` | ✅ LOCKED |
| **Tabs** | Navigation | Radix Tabs | `src/components/navigation/tabs/` | ✅ LOCKED |
| **Select** | Inputs | Radix Select | `src/components/select/` | ✅ LOCKED (FINALIZED) |
| **ContextMenu** | Menus | Radix ContextMenu | `src/components/menus/context-menu/` | ✅ LOCKED |
| **Toast** | Overlays | Radix Toast | `src/components/overlays/Toast.tsx` | ✅ LOCKED |

**Lock Date:** 2025-12-12  
**Architecture Phase:** **CLOSED** (Foundation phase is complete and immutable)

### Category Ownership Rule

**Rule:** There is **exactly ONE** Foundation component per category.

**Categories:**
- **Overlays:** Modal (sole modal foundation)
- **Navigation:** Tabs (sole tabs foundation)
- **Inputs:** Select (sole select foundation)
- **Menus:** ContextMenu (sole context menu foundation)
- **Overlays (Notifications):** Toast (sole toast foundation)

**Consequence:** No new Foundation components may be added. No duplicates or alternatives (e.g., `SimpleModal`, `BasicTabs`, `ModalV2`) may be created. The Foundation layer is **closed**.

### Immutability Rules

Foundation components are **immutable** and subject to the following rules:

**FORBIDDEN:**
- ❌ Breaking API changes (removing props, changing prop types, removing subcomponents)
- ❌ Creating new Foundation components
- ❌ Creating duplicate or alternative Foundation components (`SimpleModal`, `BasicTabs`, `OldSelect`, `LegacyToast`, `ModalV2`)
- ❌ Renaming Foundation components
- ❌ Moving Foundation components to different locations
- ❌ Removing Foundation components
- ❌ Reimplementing Radix behavior (focus management, keyboard navigation, ARIA attributes, portals, scroll locking)
- ❌ Adding non-token styling (string/number-based visual props, raw CSS values, inline styles for static styling)

**ALLOWED:**
- ✅ Bug fixes (correcting incorrect behavior, fixing accessibility issues, fixing TypeScript errors)
- ✅ Type improvements (improving TypeScript types, adding missing type definitions, fixing type errors, adding JSDoc comments)
- ✅ Documentation updates (updating component documentation, adding usage examples, improving JSDoc comments, updating Storybook stories)
- ✅ Token usage improvements (improving token usage within components, fixing token violations, adding missing token support, improving token consistency)
- ✅ Non-breaking API additions (adding new optional props, adding new variants, adding new subcomponents, performance optimizations)

**All allowed changes must maintain backward compatibility.**

### Radix Delegation Rule

**Rule:** Foundation components **MUST** delegate ALL behavior to Radix UI primitives.

**Required Radix Delegation:**
- ✅ Focus management (focus traps, focus restoration, focus delegation)
- ✅ Keyboard navigation (arrow keys, escape key, tab order)
- ✅ ARIA attributes (automatic ARIA generation, state synchronization, screen reader announcements)
- ✅ Controlled/uncontrolled state (state management, event handlers, state synchronization)
- ✅ Accessibility contracts (dialog focus traps, popover collision detection, menu keyboard navigation)
- ✅ Portal rendering (rendering outside DOM hierarchy)
- ✅ Scroll locking (preventing background scroll)

**FORBIDDEN:**
- ❌ Custom focus management implementations
- ❌ Custom keyboard navigation implementations
- ❌ Custom ARIA attribute implementations
- ❌ Custom portal implementations
- ❌ Custom scroll locking implementations

**Rationale:** Radix UI provides battle-tested, accessible behavior. Foundation components are thin wrappers that delegate behavior to Radix and provide token-driven styling.

### Export Stability Contract

**Rule:** Foundation component exports are **stable** and **backward-compatible**.

**Foundation Component Exports:**

- **Modal:** `Modal`, `ModalRoot`, `ModalContent`, `ModalHeader`, `ModalBody`, `ModalFooter`, `ModalTrigger`, `ModalClose`
- **Tabs:** `Tabs`, `TabsRoot`, `TabsList`, `TabsTrigger`, `TabsContent`
- **Select:** `Select`, `SelectRoot`, `SelectTrigger`, `SelectContent`, `SelectItem`, `SelectValue`, `SelectGroup`, `SelectLabel`, `SelectSeparator`
- **ContextMenu:** `ContextMenuRoot`, `ContextMenuTrigger`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuLabel`, `ContextMenuGroup`, `ContextMenuSeparator`
- **Toast:** `Toast`, `ToastProvider`, `ToastViewport`, `ToastRoot`, `ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`, `useToast`

**Consequence:** These exports **MUST** remain stable. Breaking changes to Foundation exports are **FORBIDDEN**. New exports may be added only if they are non-breaking (new optional props, new subcomponents).

---

## 5. Extension Layer (OPEN)

### What Extensions Are Allowed to Do

Extensions **MAY**:
- ✅ Compose Foundation components internally (e.g., `ConfirmDialog` uses `Modal` internally)
- ✅ Add domain-specific logic (e.g., `NotificationCenter` manages notification queue)
- ✅ Add opinionated UX patterns (e.g., `MultiSelect` adds multi-selection behavior)
- ✅ Add feature-rich behavior (e.g., `TabNavigation` adds routing integration)
- ✅ Evolve or be replaced (Extensions are not part of the stable Foundation API)
- ✅ Use hardcoded variant colors for domain-specific styling (acceptable for Extension layer only)

### What Extensions Are Forbidden to Do

Extensions **MUST NOT**:
- ❌ Duplicate Foundation functionality (e.g., creating a modal that doesn't use `Modal` internally)
- ❌ Bypass Foundation components (e.g., using Radix Dialog directly instead of `Modal`)
- ❌ Be named after Foundation components (e.g., `SimpleModal`, `BasicTabs`, `OldSelect`, `LegacyToast`, `ModalV2`)
- ❌ Use Foundation component names (e.g., `Modal`, `Tabs`, `Select`, `ContextMenu`, `Toast` are reserved)
- ❌ Live in Foundation component folders (e.g., `src/components/modal/ConfirmDialog.tsx` is forbidden)

### Naming Rules

**Extensions MUST use descriptive, intent-based names:**

**✅ VALID Examples:**
- `ConfirmDialog` - Describes intent (confirmation dialog)
- `NotificationCenter` - Describes intent (notification management)
- `MultiSelect` - Describes intent (multi-selection)
- `TabNavigation` - Describes intent (navigation with tabs)
- `EventModal` - Domain-specific (events)
- `UserContextMenu` - Domain-specific (users)
- `SearchSelect` - Domain-specific (search)
- `ModalWithForm` - Pattern-based (modal with form)
- `TabsWithRouting` - Pattern-based (tabs with routing)

**❌ INVALID Examples:**
- `SimpleModal` - Uses Foundation name ("Modal")
- `BasicTabs` - Uses Foundation name ("Tabs")
- `OldSelect` - Uses Foundation name ("Select")
- `LegacyToast` - Uses Foundation name ("Toast")
- `ModalV2` - Duplicates Foundation functionality
- `CustomTabs` - Duplicates Foundation functionality
- `AdvancedSelect` - Duplicates Foundation functionality

**Note:** `Basic*` naming is **ALLOWED** for internal components within a component family (e.g., `BasicButton` as an internal variant of a button family), but **FORBIDDEN** for global Foundation components (Modal, Tabs, Select, ContextMenu, Toast).

### Folder Placement Rules

**Extensions MUST live outside Foundation component folders:**

**✅ VALID Locations:**
- `src/components/modals/` - Extension modals (e.g., `ConfirmDialog.tsx`)
- `src/components/extensions/` - General extensions
- `src/components/patterns/` - Pattern-based extensions
- `src/components/overlays/` - Extension overlays (but NOT Foundation Toast)
- `src/components/notifications/` - Notification extensions

**❌ INVALID Locations:**
- `src/components/modal/ConfirmDialog.tsx` - Inside Foundation folder
- `src/components/navigation/tabs/CustomTabs.tsx` - Inside Foundation folder
- `src/components/select/MultiSelect.tsx` - Inside Foundation folder
- `src/components/menus/context-menu/UserMenu.tsx` - Inside Foundation folder (use `src/components/menus/` instead)

**Foundation folders are reserved for Foundation components only.**

---

## 6. Token System

### Token System Status

**Status:** ✅ **LOCKED**  
**Lock Date:** 2025-12-13  
**Reference:** [Token System Documentation](./architecture/TUI_TOKEN_SYSTEM.md)  
**Final Audit:** [Token Domains Final Report](../../docs_archive/reports/archive/archive/reports/other/TUI_TOKEN_DOMAINS_FINAL_REPORT.md) - **FINAL VERDICT: OK** (Note: File may be in docs_archive)

**The Token System is LOCKED and IMMUTABLE** as part of the Foundation architecture. All token domains, ownership rules, and semantic classifications are frozen. Token modifications require explicit unlock procedure with full audit.

### Token Philosophy

**Principle:** Semantic tokens > numeric values.

**Token System Characteristics:**
- **Semantic:** Tokens represent design decisions (e.g., `spacing.md`, `color.primary`) not arbitrary values (e.g., `16px`, `#3b82f6`)
- **Comprehensive:** All visual properties are tokenized (spacing, colors, radius, typography, motion, shadows, elevation)
- **Theme-Aware:** Tokens automatically adapt to theme (light/dark mode, custom themes)
- **Type-Safe:** Token unions provide IntelliSense autocomplete and compile-time validation
- **Single Source of Truth:** Changing a token value updates all components automatically
- **IMMUTABLE:** Token system is locked - all token domains, ownership rules, and semantic classifications are frozen

### Token Categories

**Spacing Tokens:**
- Base spacing: `0`, `1`, `2`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`
- Semantic spacing: `card.padding`, `modal.spacing.header`, `button.padding.x`
- Token Type: `SpacingToken` or `Responsive<SpacingToken>`

**Color Tokens:**
- Semantic colors: `background`, `foreground`, `primary`, `secondary`, `accent`, `muted`, `destructive`
- Component-specific: `button.primary.bg`, `card.border`, `input.focus.ring`
- Token Type: `ColorToken` or `Responsive<ColorToken>`

**Radius Tokens:**
- Base radius: `none`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `full`
- Component-specific: `button`, `card`, `input`, `badge`
- Token Type: `RadiusToken` or `Responsive<RadiusToken>`

**Typography Tokens:**
- Font sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`
- Font weights: `normal`, `medium`, `semibold`, `bold`
- Line heights: `tight`, `snug`, `normal`, `relaxed`, `loose`
- Token Type: `TextSizeToken`, `FontWeightToken`, or `Responsive<TextSizeToken>`

**Motion Tokens:**
- Durations: `instant`, `fast`, `normal`, `slow`, `slower`, `slowest`
- Easing: `linear`, `ease-in`, `ease-out`, `ease-in-out`, `bounce`, `elastic`
- Pre-configured transitions: `transition.colors`, `transition.opacity`, `transition.transform`
- Token Type: `MotionDurationToken`, `EasingToken`

**Shadow Tokens:**
- Elevation shadows: `none`, `sm`, `md`, `lg`, `xl`, `2xl`
- Component-specific: `card`, `modal`, `popover`, `tooltip`
- Token Type: `ShadowToken` or `Responsive<ShadowToken>`

**Token Type Location:** All token union types are defined in `src/tokens/types/index.ts`

### Token Unions in Component APIs

**Rule:** All visual props **MUST** use token union types (optionally wrapped in `Responsive<T>`).

**Pattern:** `prop?: TokenUnion | Responsive<TokenUnion>`

**Examples:**
```typescript
// ✅ CORRECT - Token unions
export interface ButtonProps {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  padding?: Responsive<SpacingToken>;
  radius?: Responsive<RadiusToken>;
  bg?: Responsive<ColorToken>;
}

// ❌ FORBIDDEN - Raw values
export interface ButtonProps {
  variant?: string; // ❌ Must be token union
  size?: number; // ❌ Must be token union
  padding?: string | number; // ❌ Must be Responsive<SpacingToken>
  radius?: string; // ❌ Must be Responsive<RadiusToken>
}
```

### Why Raw Values Are Forbidden

**Raw values (strings, numbers, CSS values) are FORBIDDEN because they:**
- ❌ Break design consistency (allow arbitrary values that don't align with design system)
- ❌ Prevent IntelliSense autocomplete (TypeScript can't suggest valid values)
- ❌ Break theme support (hardcoded values don't respect theme tokens)
- ❌ Prevent refactoring safety (token changes won't affect hardcoded values)
- ❌ Reduce developer experience (no autocomplete, no compile-time validation)

**Consequence:** All visual props **MUST** use token union types. Raw `string`, `number`, or CSS value types are **FORBIDDEN** for visual props.

**Allowed Exceptions (Non-Visual Props):**
- `aria-*` attributes (accessibility)
- `data-*` attributes (testing/metadata)
- `id`, `role`, `title`, `name`, `value`, `href`, `target`, `rel`, `placeholder`, `type`
- Event handlers (`onClick`, `onChange`, etc.)
- Behavioral state props (`open`, `defaultOpen`, `onOpenChange` - from Radix, but acceptable as behavioral)

### How Tokens Map to CSS Variables

**Token-to-CSS Mapping:**
- Tokens are defined in `src/tokens/` (TypeScript token objects)
- Tokens are converted to CSS variables via Tailwind preset (`src/preset.ts`)
- CSS variables are generated at build time (e.g., `--spacing-md`, `--color-primary`)
- Components reference CSS variables in styles (via Tailwind classes or direct CSS variable usage)
- Theme switching updates CSS variable values (light/dark mode)

**Example:**
```typescript
// Token definition
export const spacing = {
  md: "1rem", // 16px
};

// CSS variable generation (via Tailwind preset)
// Results in: --spacing-md: 1rem;

// Component usage
const styles = {
  padding: "var(--spacing-md)", // Uses CSS variable
};
```

---

## 7. Styling Rules

### Where Tailwind Is Allowed

**Tailwind utilities are ALLOWED for structural properties only:**

✅ **ALLOWED:**
- Layout: `flex`, `grid`, `block`, `inline`, `inline-block`, `table`, etc.
- Positioning: `relative`, `absolute`, `fixed`, `sticky`, `static`
- Display: `hidden`, `visible`, `sr-only`
- Pointer events: `pointer-events-none`, `pointer-events-auto`
- Overflow: `overflow-hidden`, `overflow-auto`, `overflow-scroll`, `overflow-visible`
- Z-index: `z-0`, `z-10`, `z-20`, `z-30`, `z-40`, `z-50` (until migrated to tokens)
- Layout helpers: `aspect-ratio`, `object-fit`, `object-position`

**Rationale:** Structural properties don't affect visual design (colors, spacing, typography). They define layout and positioning, which are acceptable to use via Tailwind utilities.

### Where Tailwind Is Forbidden

**Tailwind utilities are FORBIDDEN for visual properties:**

❌ **FORBIDDEN:**
- Spacing: `p-4`, `px-2`, `py-1.5`, `mt-4`, `mb-2`, `gap-2`, `space-x-2`, `space-y-4`
- Colors: `bg-blue-500`, `text-gray-400`, `border-red-500`, `bg-primary`, `text-foreground`
- Shadows: `shadow-md`, `shadow-lg`, `shadow-xl`
- Borders: `border`, `border-2`, `rounded-md`, `rounded-lg`, `border-gray-200`
- Typography: `text-sm`, `text-lg`, `font-semibold`, `font-bold`, `leading-tight`
- Sizing: `h-64`, `w-full`, `w-1/2`, `max-w-md`
- Opacity: `opacity-50`, `opacity-90`
- Transitions: `transition-all`, `transition-colors`, `transition-opacity`

**Rationale:** Visual properties must come from the token system to ensure design consistency, theme support, and refactoring safety.

### How Styling Must Be Expressed in Components

**Components MUST use tokens via one of these methods:**

**Method 1: CVA Variants (Preferred)**
```typescript
import { cva } from "class-variance-authority";
import { BUTTON_TOKENS } from "@/tokens/button";

const buttonVariants = cva(BUTTON_TOKENS.base, {
  variants: {
    variant: {
      primary: BUTTON_TOKENS.variant.primary,
      secondary: BUTTON_TOKENS.variant.secondary,
    },
    size: {
      sm: BUTTON_TOKENS.size.sm,
      md: BUTTON_TOKENS.size.md,
    },
  },
});
```

**Method 2: Token Objects (Direct Reference)**
```typescript
import { TOKENS } from "@/tokens";

const styles = {
  padding: TOKENS.spacing.md,
  borderRadius: TOKENS.radius.md,
  backgroundColor: TOKENS.colors.primary,
};
```

**Method 3: CSS Variables (Theme-Aware)**
```typescript
const styles = {
  padding: "var(--spacing-md)",
  borderRadius: "var(--radius-md)",
  backgroundColor: "var(--color-primary)",
};
```

**Method 4: Responsive Token Props**
```typescript
export interface ComponentProps {
  padding?: Responsive<SpacingToken>;
  radius?: Responsive<RadiusToken>;
}

// Usage
<Component padding={{ base: "sm", md: "lg" }} />
```

### Examples: Correct vs Incorrect Styling

**✅ CORRECT - Token-Based:**
```tsx
// Uses token objects
<div style={{ padding: TOKENS.spacing.md, borderRadius: TOKENS.radius.md }} />

// Uses CSS variables
<div className="p-md rounded-md" /> {/* p-md and rounded-md map to CSS variables */}

// Uses CVA with tokens
<Button variant="primary" size="md" /> {/* Variants map to token styles */}
```

**❌ INCORRECT - Hardcoded Tailwind:**
```tsx
// Hardcoded Tailwind utilities (FORBIDDEN)
<div className="p-4 rounded-md" /> {/* ❌ p-4 and rounded-md are hardcoded */}

// Hardcoded CSS values (FORBIDDEN)
<div style={{ padding: "16px", borderRadius: "8px" }} /> {/* ❌ Raw CSS values */}

// Inline styles for static values (FORBIDDEN)
<div style={{ padding: "1rem" }} /> {/* ❌ Should use tokens */}
```

---

## 8. Public API Rules

### What May Be Exported

**The following MAY be exported from `@tenerife.music/ui`:**

✅ **Foundation Components:**
- All Foundation component exports (Modal, Tabs, Select, ContextMenu, Toast)
- Foundation component types (`ModalProps`, `TabsProps`, etc.)

✅ **Extension Components:**
- Any Extension component that composes Foundation internally
- Extension component types

✅ **Token Types:**
- Token union types (`SpacingToken`, `ColorToken`, `RadiusToken`, etc.)
- Responsive types (`Responsive<T>`)
- Token utility types

✅ **Utility Functions:**
- Theme utilities (`useTheme`, `ThemeProvider`)
- Responsive utilities (`getBaseValue`, `isResponsiveValue`, `getSpacingPx`)
- Component utilities (if they don't expose internal implementation)

### What Must Never Be Exported

**The following MUST NEVER be exported:**

❌ **Radix Primitives:**
- Radix UI primitives (e.g., `PopoverPrimitive`, `DialogPrimitive`)
- Radix UI types (e.g., `React.ComponentProps<typeof PopoverPrimitive.Content>`)
- Direct Radix component exports

❌ **Internal Implementation Details:**
- Internal component helpers
- Internal styling utilities
- Internal token conversion functions
- Internal responsive calculation functions

❌ **Legacy Components:**
- Components in `legacy/` folders
- Deprecated component variants
- Old component APIs

❌ **Duplicate Foundation Components:**
- Any component that duplicates Foundation functionality (e.g., `SimpleModal`, `BasicTabs`)
- Alternative Foundation implementations

**Rationale:** Public API should expose only stable, token-driven components. Internal implementation details, Radix primitives, and legacy code should remain private.

### Legacy Component Policy

**Rule:** Legacy components **MUST NOT** be exported.

**Legacy Component Handling:**
- Legacy components should be archived (moved to `legacy/` folders)
- Legacy components should not appear in public exports
- Legacy components should not be referenced in public documentation
- Legacy components may be kept for reference but must not be used in new code

**Examples of Legacy Directories:**
- `src/components/input/legacy/` - Archived input components
- `src/components/select/legacy/` - Archived select components
- `src/components/textarea/legacy/` - Archived textarea components

**Rationale:** Legacy components violate token-driven architecture and should not be part of the public API. Keeping them in `legacy/` folders allows reference without polluting the public API.

### Backward Compatibility Expectations

**Foundation Components:**
- Foundation exports are **stable** and **backward-compatible**
- Breaking changes to Foundation APIs are **FORBIDDEN**
- New Foundation exports may be added only if non-breaking (optional props, new subcomponents)

**Extension Components:**
- Extension components **MAY** evolve or change
- Breaking changes to Extension components are **ALLOWED** (with migration documentation)
- Extensions are not part of the stable Foundation API

**Rationale:** Foundation provides stable infrastructure. Extensions provide evolving domain functionality.

### Public API Typing Standards (MANDATORY)

**Rule:** All public component APIs **MUST** follow the architectural typing standard defined in `docs/structure/TYPING_STANDARD.md`.

**Source of Truth:** `docs/structure/TYPING_STANDARD.md` is the **REQUIRED, ENFORCED architectural standard** that overrides:
- Local coding preferences
- General TypeScript guidelines
- CVA-derived typing patterns
- Any other typing conventions

**Mandatory Requirements:**

1. **Explicit Union Types (REQUIRED):**
   - All `variant`, `size`, and similar props **MUST** use explicit union types
   - Inline string unions in props are **FORBIDDEN**
   - `string` as a public variant type is **FORBIDDEN**

2. **CVA Is NOT a Public Type Source (FORBIDDEN):**
   - `VariantProps<typeof cvaVariants>` in public APIs is **FORBIDDEN**
   - CVA may exist internally, but public props **MUST** reference explicit union types
   - Inferring public types from CVA is **FORBIDDEN**

3. **CVA Variant Maps MUST Be Type-Constrained:**
   - All variant maps passed into CVA **MUST** use `satisfies Record<...>` constraints
   - This guarantees no missing variants and immediate TypeScript failure on mismatch

4. **Public Component Props MUST Use Canonical Types:**
   - Public component props **MUST** reference canonical union types
   - `variant?: string` is **FORBIDDEN**
   - Inline unions in props are **FORBIDDEN**
   - CVA-derived types in public APIs are **FORBIDDEN**

**Enforcement:**

- Violations are considered **architectural violations**
- Violations are **review blockers**
- AI assistants **MUST** follow `TYPING_STANDARD.md` and **NEVER** generate CVA-derived public types
- Manual review **MUST** verify compliance with `TYPING_STANDARD.md`

### Typing System

**📚 Typing System Index:** For a complete overview of the typing system architecture, hierarchy, and navigation guide, see [`docs/structure/TYPING_SYSTEM.md`](./structure/TYPING_SYSTEM.md).

The typing system consists of two documents with explicit priority ordering:

**Priority Order:**
1. **`docs/structure/TYPING_STANDARD.md`** — **PRIMARY AUTHORITY** for all public API typing
   - Mandatory architectural standard
   - Governs variant, size, and similar prop type definitions
   - Takes precedence over all other typing guidelines
2. **`docs/structure/TYPESCRIPT_GENERAL_RULES.md`** — **SECONDARY GUIDANCE** for general TypeScript implementation
   - Provides implementation guidance for internal code patterns
   - Does NOT override `TYPING_STANDARD.md` for public API typing
   - Use for general TypeScript best practices outside of public API typing

**Hierarchy Rule:** Architectural standard (`TYPING_STANDARD.md`) > General rules (`TYPESCRIPT_GENERAL_RULES.md`)

**Related Documents:**
- **`docs/structure/TYPING_SYSTEM.md`** - Typing system index and navigation guide (canonical entry point for typing rules)
- **`docs/structure/TYPING_STANDARD.md`** - **MANDATORY** architectural typing standard (this document takes precedence)
- **`docs/structure/TYPESCRIPT_GENERAL_RULES.md`** - General TypeScript implementation rules (secondary, does not override `TYPING_STANDARD.md`)

**Rationale:** Public API typing is an architectural concern, not a stylistic preference. Explicit union types ensure type safety, IDE autocomplete, and long-term architectural stability. CVA is an internal implementation tool and must not leak into public APIs.

---

## 9. Development Workflow

### How New Components Are Introduced

**New components MUST be Extensions (Foundation is closed):**

1. **Identify Use Case:** Determine if the component is domain-specific or a general pattern
2. **Check Foundation:** Verify that no Foundation component already provides this functionality
3. **Compose Foundation:** If the component is modal-like, tab-like, select-like, etc., compose the appropriate Foundation component internally
4. **Choose Name:** Use descriptive, intent-based naming (not Foundation component names)
5. **Choose Location:** Place in appropriate Extension folder (not Foundation folder)
6. **Implement Token-Driven:** Ensure all visual props use token unions
7. **Export:** Add to public exports (if appropriate for public API)

**Note:** The Foundation layer is **CLOSED**. No new Foundation components may be created. If Foundation unlock is required in the future, the canonical Foundation component creation/refactor lifecycle is defined in [FOUNDATION_LOCK_OPERATING_RULES.md](./architecture/FOUNDATION_LOCK_OPERATING_RULES.md) (Section 10: Foundation Component Creation & Refactor Route — Canonical Lifecycle). For human-readable navigation to the lifecycle process, see [FOUNDATION_LIFECYCLE_PROCESS_INDEX.md](./architecture/FOUNDATION_LIFECYCLE_PROCESS_INDEX.md). **All Foundation components MUST have a compliant report following [FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md](./architecture/FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md) before Foundation Lock (Step 11).**

**Example:**
```typescript
// ✅ CORRECT - Extension component
// src/components/modals/ConfirmDialog.tsx
import { Modal, ModalRoot, ModalContent } from "@/components/modal";

export const ConfirmDialog = ({ onConfirm, onCancel, ... }) => {
  return (
    <ModalRoot>
      <ModalContent>
        {/* Confirmation logic */}
      </ModalContent>
    </ModalRoot>
  );
};
```

### How Architecture Violations Are Handled

**Architecture violations are treated as defects and must be fixed immediately:**

**Common Violations:**
- ❌ Duplicate Foundation components (e.g., `src/components/ui/toast.tsx` when Foundation Toast exists)
- ❌ Hardcoded Tailwind utilities in component code (visual properties)
- ❌ Extensions bypassing Foundation components (using Radix directly)
- ❌ Extensions using Foundation component names (e.g., `SimpleModal`)
- ❌ Extensions in Foundation folders
- ❌ Non-token visual props (raw strings, numbers, CSS values)
- ❌ Legacy components exported in public API

**Violation Handling:**
1. **Detect:** Architecture audits identify violations
2. **Classify:** Violations are classified as DELETE, REWRITE, or ARCHIVE
3. **Fix:** Violations must be fixed immediately (not deferred)
4. **Verify:** Fixed violations are verified through audits
5. **Document:** Violations and fixes are documented in audit reports

**Rationale:** Architecture violations break design consistency, theme support, and refactoring safety. They must be addressed immediately to maintain system integrity.

### Role of Audits and Cleanup Passes

**Audits are regular checks that verify architecture compliance:**

**Audit Types:**
- **Architecture Cleanup Pass:** Scans for duplicate Foundation components, legacy modules, violations
- **Token Compliance Audit:** Verifies all visual properties use tokens (no hardcoded Tailwind)
- **Foundation Bypass Check:** Verifies Extensions compose Foundation (no direct Radix usage)
- **Import Violation Check:** Verifies no imports of duplicate or legacy components
- **Export Audit:** Verifies public API doesn't export forbidden items (Radix, legacy, duplicates)

**Audit Process:**
1. **Scan:** Automated or manual scan of codebase
2. **Identify:** Violations are identified and classified
3. **Report:** Audit report documents violations with actionable items
4. **Fix:** Violations are fixed in follow-up tasks
5. **Verify:** Fixed violations are verified in subsequent audits

**Rationale:** Regular audits ensure architecture rules are followed and violations are caught early.

### How Decisions Get Locked

**Foundation decisions are permanent. Extension decisions are reversible:**

**Foundation Locking:**
- Foundation components are locked via `FINAL_FOUNDATION_LOCK.md`
- Foundation lock is **immutable** (cannot be reversed)
- Foundation architecture phase is **closed** (no new Foundation components)
- Foundation decisions are binding architectural contracts

**Extension Flexibility:**
- Extension components may evolve, be replaced, or be deleted
- Extension decisions are reversible (no binding contracts)
- Extension architecture phase is **open** (new Extensions may be added)

**Rationale:** Foundation provides stable infrastructure that cannot change. Extensions provide flexible domain functionality that can evolve.

---

## 10. Non-Goals

### What the Library Will Never Try to Do

TenerifeUI explicitly **will never**:

❌ **Become a general-purpose UI kit:**
- TenerifeUI is design infrastructure, not a complete UI kit
- It provides Foundation and patterns, not every component needed for all use cases
- Extensions may provide domain-specific components, but TenerifeUI doesn't aim to cover all use cases

❌ **Replace shadcn/ui patterns:**
- TenerifeUI uses shadcn/ui patterns internally (Radix + styling)
- TenerifeUI wraps shadcn/ui patterns in token-driven APIs
- TenerifeUI doesn't aim to replace shadcn/ui, but to provide a token-driven layer on top

❌ **Provide design tools or visual editors:**
- TenerifeUI is code-first (no visual design tools)
- Design decisions are expressed in code (tokens, components)
- No GUI for creating or editing components

❌ **Support arbitrary styling systems:**
- TenerifeUI requires the token system (no support for arbitrary CSS, styled-components-only, or utility-first approaches)
- Components must use token unions for visual props
- Custom styling systems are not supported

### Explicit Rejection of Alternative Architectures

**TenerifeUI explicitly rejects:**

❌ **Material-UI Approach:**
- Comprehensive component library with many variants
- TenerifeUI provides minimal Foundation + composable Extensions

❌ **Styled-Components-Only Approach:**
- CSS-in-JS without token system
- TenerifeUI requires token system for theme support and design consistency

❌ **Utility-First Approach:**
- Tailwind utilities for all styling
- TenerifeUI requires token-driven styling (Tailwind only for structural properties)

❌ **CSS-in-JS Without Tokens:**
- Arbitrary styled-components or emotion styles
- TenerifeUI requires token system integration

**Rationale:** These approaches conflict with TenerifeUI's token-driven, Foundation-first architecture. TenerifeUI's approach prioritizes design consistency, theme support, and architectural stability over flexibility.

### Anti-Patterns Intentionally Avoided

**TenerifeUI intentionally avoids:**

❌ **Component Proliferation:**
- Creating many similar components (e.g., `SmallButton`, `LargeButton`, `PrimaryButton`)
- Instead: Use variants (`size="sm"`, `variant="primary"`)

❌ **Prop Drift:**
- Adding ad-hoc props that don't align with design system (e.g., `color="blue"`, `padding={16}`)
- Instead: Use token unions (`variant="primary"`, `padding="md"`)

❌ **Implementation Leakage:**
- Exposing internal implementation details (Radix props, styling internals)
- Instead: Provide token-driven public APIs

❌ **Breaking Foundation:**
- Modifying Foundation components in breaking ways
- Instead: Create Extensions that compose Foundation

**Rationale:** These anti-patterns reduce design consistency, break theme support, and increase maintenance burden. TenerifeUI's architecture prevents these patterns through rules and constraints.

---

## 11. Future Evolution

### Foundation Authorities: IMMUTABLE

**Foundation Authorities are IMMUTABLE and cannot evolve:**
- ❌ **NO** modifications to existing Authority rules
- ❌ **NO** changes to Authority contracts
- ❌ **NO** additions to Foundation Authority set
- ❌ **NO** breaking changes to Authority structure
- ❌ **NO** token value modifications (Token System is locked)
- ❌ **NO** token domain changes (Token System is locked)

**Future changes to Foundation Authorities are ONLY possible through:**
1. **Explicit Authority Versioning** - New Authority versions (e.g., `INTERACTION_AUTHORITY_CONTRACT_v2.md`)
2. **Explicit Unlock Procedure** - Full audit, justification, approval, and re-lock workflow
3. **Explicit User Approval** - No Authority modifications without explicit user request and approval

### What Can Evolve Safely

**The following MAY evolve safely:**

✅ **Extensions:**
- New Extensions may be added
- Existing Extensions may evolve, be replaced, or be deleted
- Extension patterns may change
- Extension APIs may have breaking changes (with migration documentation)

✅ **Enforcement Mechanisms:**
- Enforcement mechanisms can evolve (tooling, scripts, verification methods)
- Detection patterns can improve (better rule checking, enhanced coverage)
- Tooling improvements (faster checks, better accuracy)
- Verification methods can be enhanced (new testing approaches)

✅ **Extension Patterns:**
- New Extension patterns may emerge (e.g., compound Extensions, Extension composition)
- Extension architecture may evolve

**Rationale:** Extensions and Enforcement mechanisms are flexible and can evolve without breaking Foundation stability. Foundation Authorities remain immutable.

### What Is Frozen Forever

**The following is FROZEN and cannot change:**

❌ **Foundation Component APIs:**
- Foundation component props, subcomponents, and exports are stable
- Only non-breaking additions are allowed (optional props, new subcomponents)
- Breaking changes are **FORBIDDEN**

❌ **Foundation Component List:**
- No new Foundation components may be added
- Foundation components cannot be removed
- Foundation components cannot be renamed
- The Foundation list is **closed** (Modal, Tabs, Select, ContextMenu, Toast)

❌ **Foundation Authorities:**
- All Foundation Authority Contracts are **IMMUTABLE**
- Interaction Authority, State Authority, Layout Authority, Token System, and all Token Authorities (Spacing, Radius, Typography, Motion, Elevation) are **LOCKED**
- Authority rules cannot be modified without explicit unlock procedure or new Authority versioning

❌ **Token System:**
- Token system is **LOCKED** and **IMMUTABLE**
- Token values cannot be modified
- Token domains cannot be added, removed, merged, or split
- Token ownership rules are immutable
- Token modifications require explicit unlock procedure

❌ **Radix Delegation Principle:**
- Foundation components must delegate behavior to Radix UI
- Custom behavior implementations are **FORBIDDEN**
- This principle cannot change

❌ **Token-Driven Principle:**
- All visual props must use token unions
- Raw values (strings, numbers, CSS) are **FORBIDDEN**
- This principle cannot change

❌ **Two-Layer Architecture:**
- Foundation (locked) vs Extension (open) separation
- This architectural model cannot change

**Rationale:** Foundation provides stable infrastructure that cannot change. Foundation Authorities are immutable. Core principles ensure design consistency and architectural stability.

### How New Domains/Extensions Should Be Added

**New domains/extensions should follow this process:**

1. **Identify Domain:** Determine the domain or pattern (e.g., forms, navigation, data display)
2. **Check Foundation:** Verify no Foundation component already provides this functionality
3. **Compose Foundation:** If the domain uses modals, tabs, selects, etc., compose the appropriate Foundation component
4. **Create Extension:** Implement Extension component with descriptive, intent-based naming
5. **Use Tokens:** Ensure all visual props use token unions
6. **Place Correctly:** Place in appropriate Extension folder (not Foundation folder)
7. **Export (Optional):** Add to public exports if appropriate for public API
8. **Document:** Document Extension in Storybook and usage examples

**Example:**
```typescript
// ✅ CORRECT - New domain Extension
// src/components/forms/FormModal.tsx
import { Modal, ModalRoot, ModalContent } from "@/components/modal";
import { Input, Button } from "@/components/ui";

export const FormModal = ({ fields, onSubmit, ... }) => {
  return (
    <ModalRoot>
      <ModalContent>
        <form onSubmit={onSubmit}>
          {fields.map(field => <Input key={field.id} {...field} />)}
          <Button type="submit">Submit</Button>
        </form>
      </ModalContent>
    </ModalRoot>
  );
};
```

**Rationale:** This process ensures new domains/extensions follow architectural rules and don't violate Foundation stability.

### Long-Term Vision

**TenerifeUI's long-term vision (without implementation detail):**

- **Stable Foundation:** Foundation layer remains locked and immutable, providing stable infrastructure for all applications
- **Rich Extension Ecosystem:** Extension layer grows with domain-specific components and patterns, providing flexible functionality
- **Token-Driven Consistency:** Token system ensures design consistency across all components and applications
- **Theme Support:** Token system enables seamless theme switching and custom theme creation
- **Developer Experience:** Type-safe APIs, IntelliSense autocomplete, and clear architectural rules provide excellent developer experience
- **Architectural Clarity:** Two-layer architecture (Foundation + Extension) provides clear separation of concerns and predictable evolution

**Note:** This vision describes goals, not implementation. Implementation details may evolve, but the vision remains constant.

---

## 12. AI Usage Contract

### How AI Assistants Should Reason About This Project

**AI assistants MUST:**

✅ **Treat Foundation as Immutable:**
- Never suggest creating new Foundation components
- Never suggest modifying Foundation APIs in breaking ways
- Never suggest duplicating Foundation functionality
- Always prefer Extensions for new behavior

✅ **Prefer Extensions for New Behavior:**
- Suggest creating Extensions that compose Foundation internally
- Suggest descriptive, intent-based Extension naming
- Suggest placing Extensions in appropriate folders (not Foundation folders)

✅ **Enforce Token-Driven Styling:**
- Reject hardcoded Tailwind utilities for visual properties
- Reject raw strings, numbers, or CSS values for visual props
- Require token unions for all visual props
- Suggest token-based alternatives when violations are detected

✅ **Reference This Document:**
- Treat this document as the single source of architectural truth
- Reference this document when architectural questions arise
- Use this document to resolve ambiguities

### What Assumptions AI Must Always Make

**AI MUST always assume:**

1. **Foundation is Locked:**
   - Foundation components (Modal, Tabs, Select, ContextMenu, Toast) are immutable
   - Foundation architecture phase is closed
   - No new Foundation components may be added

2. **Extensions Compose Foundation:**
   - Extensions must use Foundation components internally
   - Extensions cannot bypass Foundation components
   - Extensions cannot duplicate Foundation functionality

3. **Tokens Are Required:**
   - All visual props must use token union types
   - Raw values (strings, numbers, CSS) are forbidden for visual props
   - Token system is non-negotiable

4. **Architecture Rules Are Binding:**
   - Violations must be fixed immediately
   - Rules cannot be bypassed for convenience
   - Breaking changes to Foundation are forbidden

### What Questions AI Should NOT Ask Again

**AI should NOT ask:**

❌ "Can I create a new Foundation component?"  
**Answer:** No. Foundation is locked. Create an Extension instead.

❌ "Can I modify Foundation API?"  
**Answer:** Only non-breaking changes (bug fixes, type improvements, documentation, token usage improvements, optional props).

❌ "Can I use hardcoded Tailwind utilities?"  
**Answer:** No. Use tokens for visual properties. Tailwind is allowed only for structural properties.

❌ "Can I bypass Foundation and use Radix directly?"  
**Answer:** No. Extensions must compose Foundation components internally.

❌ "Can I export Radix primitives?"  
**Answer:** No. Public API must expose only TenerifeUI components, not Radix primitives.

❌ "Can I use raw strings/numbers for visual props?"  
**Answer:** No. All visual props must use token union types.

**Rationale:** These questions are answered definitively in this document. AI should reference this document instead of asking.

### How This Document Should Be Treated in New Chats

**This document is:**

✅ **The Single Source of Truth:**
- This document overrides all other architecture documentation (except `MASTER_TASK` and `PROJECT_PROGRESS`)
- All architectural decisions are stated here
- No need to reference other architecture docs after reading this

✅ **Required Reading for AI:**
- AI assistants should read this document at the start of new chats
- AI should reference this document when architectural questions arise
- AI should use this document to resolve ambiguities

✅ **IMMUTABLE:**
- This document should not be modified without explicit user approval
- Changes to this document require careful consideration
- This document represents the canonical architectural contract

✅ **Context for All Work:**
- All component development should follow rules stated here
- All architectural decisions should align with principles stated here
- All code reviews should verify compliance with rules stated here

**Rationale:** This document provides complete architectural context. AI assistants should use it as the primary reference for all architectural decisions.

---

## 📚 Related Documents

This document is the **single source of truth** for TenerifeUI architecture. However, the following documents provide complementary information:

- **`docs/architecture/CANONICAL_LOCK.md`** - **Canonical architecture lock** (authoritative source for canonical state and forbidden regressions)
- **`docs/architecture/CANONICAL_STATE_FINAL.md`** - Final truth snapshot of canonical state
- **`.cursor/tasks/master/master_tasks.json`** - Master Task system (project roadmap and task tracking)
- **`docs/PROJECT_PROGRESS.md`** - Project progress tracking (task completion status)
- **`docs/architecture/FINAL_FOUNDATION_LOCK.md`** - Foundation lock details (supplementary to this document)
- **`docs/architecture/TUI_ARCHITECTURE_LOCK.md`** - Architecture lock details (supplementary to this document)
- **`docs/architecture/UI_ARCHITECTURE_RULES.md`** - Radix UI and token union rules (supplementary to this document)
- **`docs/architecture/CURSOR_UI_RULES.md`** - Cursor AI development rules (supplementary to this document)
- **`docs/architecture/FOUNDATION_LOCK_OPERATING_RULES.md`** - Foundation component lifecycle process (Section 10) and report format requirement (Section 10.1)
- **`docs/architecture/FOUNDATION_COMPONENT_REPORT_TEMPLATE_v1.md`** - **MANDATORY** canonical format for Foundation Component Reports (REQUIRED for Foundation Lock)
- **`docs/structure/TYPING_SYSTEM.md`** - Typing system index and navigation guide (canonical entry point for typing rules)
- **`docs/structure/TYPING_STANDARD.md`** - **MANDATORY** architectural standard for public API typing (REQUIRED, ENFORCED)
- **`docs/structure/TYPESCRIPT_GENERAL_RULES.md`** - General TypeScript implementation rules (secondary to `TYPING_STANDARD.md`)

**Note:** This document supersedes all other architecture documentation. The documents listed above are supplementary and provide additional detail, but this document contains the canonical rules and principles. **CANONICAL_LOCK.md** is the authoritative source for canonical architecture state and forbidden regressions.

---

## 🔄 Version History

- **v1.0** (2025-12-13): Initial canonical context document
  - Synthesized all architectural knowledge into single document
  - Established 12-section structure covering all architectural aspects
  - Created authoritative, declarative rules for AI and human maintainers
  - Replaced fragmented documentation with single source of truth

---

**Status:** ✅ **IMMUTABLE**  
**Version:** 1.2  
**Date Created:** 2025-12-13  
**Last Updated:** 2025-12-17  
**Priority:** **CRITICAL**  
**Next Review:** **NEVER** (this document is the canonical architectural contract)

---

## Version History

- **v1.2** (2025-12-17): Canonical Architecture Lock Reference
  - Added reference to CANONICAL_LOCK.md as authoritative source for canonical state
  - Updated Related Documents section to include CANONICAL_LOCK.md
  - Clarified that CANONICAL_LOCK.md is authoritative for canonical architecture state and forbidden regressions

- **v1.1** (2025-12-16): Foundation Status Update
  - Added "Current Foundation Status" section (Section 0)
  - Updated Foundation Layer section with Foundation CLOSED status
  - Updated Token System section with LOCKED status
  - Updated Future Evolution section to clarify Authority immutability
  - Updated "What Is Frozen Forever" section to include Foundation Authorities
  - All Foundation Authorities explicitly marked as CLOSED and IMMUTABLE
  - References to FINAL_FOUNDATION_LOCK.md added as source of truth

- **v1.0** (2025-12-13): Initial canonical context document
  - Synthesized all architectural knowledge into single document
  - Established 12-section structure covering all architectural aspects
  - Created authoritative, declarative rules for AI and human maintainers
  - Replaced fragmented documentation with single source of truth

