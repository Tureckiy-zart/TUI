# 🔒 Tenerife UI Architecture Lock

**Version:** 1.6  
**Date Created:** 2025-12-12  
**Last Updated:** 2025-12-28 (Gradient tokens fixes: ring.subtle token corrected, glass.light/dark Storybook demo improved)  
**Status:** ✅ LOCKED (Foundation CLOSED)  
**Layer:** UI / ARCHITECTURE  
**Priority:** CRITICAL

---

## 📋 Purpose

This document **formally locks** the UI foundation architecture of `@tenerife.music/ui`. After this lock, the foundation layer is **immutable** and **closed for modifications**. All future development must occur in the **enforcement and extension layers**.

**This is a binding architectural contract.** Any violation of these rules is considered an architectural breach.

> 🔒 **Final Foundation Lock:** For the authoritative, definitive Foundation lock document, see **[FOUNDATION_LOCK.md](./FOUNDATION_LOCK.md)**. The Final Foundation Lock document is the **single source of truth** for the locked Foundation layer and officially closes the Foundation architecture phase.

**Foundation Status:** ✅ **FOUNDATION CLOSED** (2025-12-16)  
**All Foundation Authorities are CLOSED and IMMUTABLE.** Foundation architecture phase is officially closed.

---

## 🎯 Architecture Overview

The Tenerife UI architecture is divided into two distinct layers:

### Foundation Layer (Implemented)

**Status:** ✅ **IMPLEMENTED**  
**Implementation Date:** 2025-12-12  
**Source of Truth:** [FOUNDATION_LOCK.md](./FOUNDATION_LOCK.md)

The foundation layer consists of **exactly one component per category**. These components:

- Define the **canonical behavior and structure** for their category
- Are **immutable** and **backward-compatible**
- Serve as the **sole foundation** for all extensions
- Are built on **Radix UI primitives** for accessibility and behavior
- Use **token-based APIs** for visual design

**Foundation Authorities:** All Foundation Authority Contracts (Interaction, State, Layout, Token, Spacing, Radius, Typography, Motion, Elevation) are **LOCKED** and **IMMUTABLE**. **Foundation Enforcement** (className/style exclusion) is **LOCKED / APPLIED** and technically enforced.

### Extension Layer (OPEN)

The extension layer consists of **opinionated, feature-rich components** that:

- Compose foundation components internally
- Add domain-specific logic and UX patterns
- May be created, modified, or deleted without affecting foundation
- Live outside foundation component folders
- Use descriptive, intent-based names

---

## 🔒 Foundation Layer (LOCKED)

### Locked Foundation Components

The following components are **locked** and **immutable**:

| Component       | Category   | Base Library      | Foundation Status | Status Date |
| --------------- | ---------- | ----------------- | ----------------- | ----------- |
| **Button**      | Actions    | Native `<button>` | ✅ **FINAL LOCK**  | 2025-12-25 |
| **Link**        | Navigation | Native `<a>`      | ✅ **LOCKED**      | 2025-12-25 |
| **Text**        | Typography | Polymorphic elements (span, p, label, strong, em) | ✅ **LOCKED**      | 2025-12-26 |
| **Input**       | Primitives | Native `<input>`  | ✅ **LOCKED**      | 2025-12-26 |
| **Heading**     | Typography | Native `<h1-h6>`  | ✅ **LOCKED**      | 2025-12-25 |
| **Tabs**        | Navigation | Radix Tabs        | ✅ **LOCKED**      | 2025-12-25 |
| **Checkbox**    | Form Controls | Native `<button role="checkbox">` | ✅ **PROCESS LOCKED** | 2025-12-25 (Refactor Cycle 2: 2025-12-27) |
| **Radio**       | Form Controls | Native `<button role="radio">` | ✅ **LOCKED** | 2025-12-25 |
| **Switch**      | Form Controls | Native `<button role="switch">` | ✅ **LOCKED** | 2025-12-25 |
| **Textarea**    | Form Controls | Native `<textarea>` | ✅ **LOCKED** | 2025-12-26 |
| **Label**       | Form Input | Radix Label | ✅ **LOCKED** | 2025-12-25 |
| **Select**      | Form Input | Radix Select | ✅ **LOCKED** | 2025-12-25 |
| **Icon**        | Visual Primitives | SVG Registry | ✅ **LOCKED** | 2025-12-25 |

**Note:** Foundation is CLOSED; specific components may be temporarily unlocked as LEGACY UNLOCKED strictly for canonical migration. Canonical truth: FOUNDATION_LOCK.md.

### Foundation Component Rules

**CRITICAL RULES:**

1. **ONE FOUNDATION PER CATEGORY**
   - There is **exactly ONE** foundation component per category
   - No duplicates, no alternatives, no "simple" or "basic" versions

2. **FOUNDATION COMPONENTS ARE IMMUTABLE**
   - Foundation components **cannot be deleted**
   - Foundation components **cannot be renamed**
   - Foundation APIs are **backward-compatible** (no breaking changes)
   - Bug fixes are **allowed** (with approval)

3. **FOUNDATION COMPONENTS DEFINE BEHAVIOR**
   - Foundation components define the **canonical behavior** for their category
   - All extensions must use foundation components internally
   - Extensions **cannot replace** foundation components

4. **NO NEW FOUNDATION COMPONENTS**
   - **No new foundation components may be added**
   - The foundation layer is **closed**
   - All new functionality must be built as extensions

5. **FOUNDATION EXPORTS ARE STABLE**
   - Foundation component exports are **stable** and **backward-compatible**
   - Breaking changes to foundation APIs are **forbidden**

### Foundation Component Locations

| Component   | Location                             | Export Path                                                          |
| ----------- | ------------------------------------ | -------------------------------------------------------------------- |
| Button      | `src/PRIMITIVES/Button/`             | `@tenerife.music/ui` → `Button`, `ButtonProps`, `ButtonVariant`, `ButtonSize` |
| Link        | `src/PRIMITIVES/Link/`               | `@tenerife.music/ui` → `Link`, `LinkProps`, `LinkSize`, `LinkVariant` |
| Text        | `src/PRIMITIVES/Text/`               | `@tenerife.music/ui` → `Text`, `TextProps`, `TextSize`, `TextWeight` |

### Canonical Implementation Rules

**OVERLAY LOCATION RULE:**
- Overlays live **only** in `COMPOSITION/overlays/` layer
- No overlay primitives may exist in PATTERNS layer
- All overlay components must be Radix-based

**Canonical Overlay Implementations:**
- ✅ `COMPOSITION/overlays/Popover.tsx` - Radix-based, canonical
- ✅ `COMPOSITION/overlays/Tooltip.tsx` - Radix-based

**CARD LOCATION RULE:**
- Card primitives live in `COMPOSITION/layout/` layer
- Domain-specific card patterns live in `PATTERNS/cards/` layer
- Canonical implementation: `COMPOSITION/layout/Card/Card.tsx` - Token-driven, canonical card primitive

**TOAST HOOKS NAMING RULE:**
- Toast hooks use **camelCase naming**
- Canonical exports: `useLocalToast` and `useGlobalToast`
- Canonical implementations:
  - ✅ `hooks/useLocalToast.ts` - Component-scoped toast management
  - ✅ `hooks/useGlobalToast.ts` - App-wide toast management
- Backward compatibility maintained via deprecated exports:
  - `hooks/useToast.ts` - Exports `useLocalToast` (deprecated)
  - `hooks/use-toast.ts` - Exports `useGlobalToast` (deprecated)

**FOUNDATION TOKENS RULE:**
- FOUNDATION tokens **only exist for active components**
- No orphaned tokens (all tokens must correspond to active components)
- No deprecated tokens (removed tokens must be fully eliminated)
- Active token domains:
  - ✅ `POPOVER_TOKENS` - Active (used by COMPOSITION/overlays/Popover)
  - ✅ `CONTEXT_MENU_TOKENS` - Active (used by COMPOSITION/overlays/ContextMenu)
  - ✅ `CARD_TOKENS` - Active (used by COMPOSITION/layout/Card)
  - ✅ `TOAST_TOKENS` - Active (used by COMPOSITION/overlays/Toast)

---

## 🎨 Extension Layer

### Extension Component Rules

**EXTENSION RULES:**

1. **EXTENSIONS MUST USE FOUNDATION COMPONENTS**
   - Extensions **must** use foundation components internally
   - Extensions **cannot** bypass foundation components
   - Extensions **cannot** replace foundation components

2. **EXTENSIONS MUST NOT BE NAMED AFTER FOUNDATION**
   - Extensions **cannot** use foundation component names
   - No `SimpleModal`, `BasicTabs`, `OldSelect`, `LegacyToast`
   - Extensions use **descriptive, intent-based names**

3. **EXTENSIONS LIVE OUTSIDE FOUNDATION FOLDERS**
   - Extensions **must** live in separate folders
   - Examples: `src/components/modals/`, `src/components/patterns/`, `src/components/extensions/`
   - Foundation folders are **reserved** for foundation components only

4. **EXTENSIONS MAY ADD OPINIONATED UX**
   - Extensions may add domain-specific logic
   - Extensions may add opinionated UX patterns
   - Extensions may add feature-rich behavior

5. **EXTENSIONS MAY BE DELETED OR REPLACED**
   - Extensions can be **created, modified, or deleted** freely
   - Changes to extensions **do not affect** foundation components
   - Extensions are **not part of the stable API**

6. **TOKEN USAGE**
   - ✅ Extensions may use existing tokens
   - ✅ Extensions may consume locked token domains
   - ⚠️ **RESTRICTED:** New token domains require token system unlock procedure

### Extension Examples

**ALLOWED Extensions:**

- `ConfirmDialog` - Uses `Modal` internally, adds confirmation logic
- `NotificationCenter` - Uses `Toast` internally, adds notification management
- `MultiSelect` - Uses `Select` internally, adds multi-selection logic
- `TabNavigation` - Uses `Tabs` internally, adds routing integration
- `ContextMenuActions` - Uses `ContextMenu` internally, adds action patterns

**FORBIDDEN Extensions:**

- ❌ `SimpleModal` - Uses foundation name
- ❌ `BasicTabs` - Uses foundation name
- ❌ `OldSelect` - Uses foundation name
- ❌ `LegacyToast` - Uses foundation name
- ❌ `ModalV2` - Duplicates foundation functionality

### Extension Components (Pipeline 18A Complete)

The following Extension layer components have successfully completed Pipeline 18A and are **PROCESS LOCKED**:

| Component | Location | Status | Lock Date | Audit Report |
|-----------|----------|--------|-----------|--------------|
| **Portal** | `src/COMPOSITION/overlays/Portal.tsx` | ✅ **PROCESS LOCKED** | 2025-12-27 | `docs/reports/audit/PORTAL_BASELINE_REPORT.md` |
| **Dialog** | `src/COMPOSITION/overlays/Dialog.tsx` | ✅ **PROCESS LOCKED** | 2025-12-27 | `docs/reports/audit/DIALOG_BASELINE_REPORT.md` |
| **Progress** | `src/PRIMITIVES/Progress/` | ✅ **PROCESS LOCKED** | 2025-12-25 | `docs/reports/audit/PROGRESS_BASELINE_REPORT.md` |
| **Separator** | `src/COMPOSITION/controls/Separator/` | ✅ **PROCESS LOCKED** | 2025-12-25 | `docs/reports/audit/SEPARATOR_BASELINE_REPORT.md` |
| **AspectRatio** | `src/COMPOSITION/controls/AspectRatio/` | ✅ **PROCESS LOCKED** | 2025-12-25 | `docs/reports/audit/ASPECTRATIO_BASELINE_REPORT.md` |
| **Badge** | `src/PRIMITIVES/Badge/` | ✅ **PROCESS LOCKED** | 2025-12-25 | `docs/reports/audit/BADGE_BASELINE_REPORT.md` |
| **Tooltip** | `src/COMPOSITION/overlays/` | ✅ **PROCESS LOCKED** | 2025-12-25 | `docs/reports/audit/TOOLTIP_BASELINE_REPORT.md` |
| **Slider** | `src/COMPOSITION/controls/Slider/` | ✅ **PROCESS LOCKED** | 2025-12-25 | `docs/reports/audit/SLIDER_BASELINE_REPORT.md` |
| **RangeSlider** | `src/COMPOSITION/controls/RangeSlider/` | ✅ **PROCESS LOCKED** | 2025-12-25 | `docs/reports/audit/RANGESLIDER_BASELINE_REPORT.md` |
| **Modal** | `src/COMPOSITION/overlays/Modal/` | ✅ **PROCESS LOCKED** | 2025-12-25 | `docs/reports/audit/MODAL_BASELINE_REPORT.md` |
| **Avatar** | `src/COMPOSITION/controls/Avatar/` | ✅ **PROCESS LOCKED** | 2025-12-26 | `docs/reports/audit/AVATAR_BASELINE_REPORT.md` |
| **Skeleton** | `src/PRIMITIVES/Skeleton/` | ✅ **PROCESS LOCKED** | 2025-12-26 | `docs/reports/audit/SKELETON_BASELINE_REPORT.md` |
| **Stepper** | `src/COMPOSITION/navigation/stepper/` | ✅ **PROCESS LOCKED** | 2025-12-26 | `docs/reports/audit/STEPPER_BASELINE_REPORT.md` |
| **Navigation Primitives** | `src/COMPOSITION/navigation/primitives/` | ✅ **PROCESS LOCKED** | 2025-12-26 | `docs/reports/audit/NAVIGATION_BASELINE_REPORT.md` |
| **NavList** | `src/COMPOSITION/navigation/nav-list/` | ✅ **PROCESS LOCKED** | 2025-12-26 | `docs/reports/audit/NAVLIST_BASELINE_REPORT.md` |
| **NavSeparator** | `src/COMPOSITION/navigation/NavSeparator/` | ✅ **PROCESS LOCKED** | 2025-12-26 | `docs/reports/audit/NAVSEPARATOR_BASELINE_REPORT.md` |
| **NavText** | `src/COMPOSITION/navigation/NavText/` | ✅ **PROCESS LOCKED** | 2025-12-26 | `docs/reports/audit/NAVTEXT_BASELINE_REPORT.md` |
| **Box** | `src/COMPOSITION/layout/Box/` | ✅ **LOCKED** | 2025-12-15 (validated 2025-12-26) | `docs/reports/audit/BOX_BASELINE_REPORT.md` |
| **Row** | `src/COMPOSITION/layout/Row/` | ✅ **LOCKED** | 2025-12-15 (validated 2025-12-26) | `docs/reports/audit/ROW_BASELINE_REPORT.md` |
| **Stack** | `src/COMPOSITION/layout/Stack/` | ✅ **LOCKED** | 2025-12-15 (validated 2025-12-26) | `docs/reports/audit/STACK_BASELINE_REPORT.md` |
| **Column** | `src/COMPOSITION/layout/Column/` | ✅ **LOCKED** | 2025-12-15 (validated 2025-12-26) | `docs/reports/audit/COLUMN_BASELINE_REPORT.md` |
| **Flex** | `src/COMPOSITION/layout/Flex/` | ✅ **LOCKED** | 2025-12-15 (validated 2025-12-26) | `docs/reports/audit/FLEX_BASELINE_REPORT.md` |
| **Grid** | `src/COMPOSITION/layout/Grid/` | ✅ **LOCKED** | 2025-12-15 (validated 2025-12-26) | `docs/reports/audit/GRID_BASELINE_REPORT.md` |
| **Surface** | `src/COMPOSITION/layout/Surface/` | ✅ **LOCKED** | 2025-12-15 (validated 2025-12-26) | `docs/reports/audit/SURFACE_BASELINE_REPORT.md` |
| **Container** | `src/COMPOSITION/layout/Container/` | ✅ **LOCKED** | 2025-12-15 (validated 2025-12-26) | `docs/reports/audit/CONTAINER_BASELINE_REPORT.md` |
| **Toast** | `src/COMPOSITION/overlays/Toast.tsx` | ✅ **LOCKED** | 2025-12-26 | `docs/reports/audit/TOAST_BASELINE_REPORT.md` |
| **SimpleTable** | `src/PATTERNS/tables/SimpleTable/` | ✅ **PROCESS LOCKED** | 2025-12-26 | `docs/reports/audit/SIMPLETABLE_BASELINE_REPORT.md` |
| **Table** | `src/PATTERNS/tables/table/` | ✅ **PROCESS LOCKED** | 2025-12-26 | `docs/reports/audit/TABLE_BASELINE_REPORT.md` |
| **DataList** | `src/PATTERNS/lists/DataList/` | ✅ **PROCESS LOCKED** | 2025-12-27 | `docs/reports/audit/DATALIST_BASELINE_REPORT.md` |
| **List** | `src/PATTERNS/lists/List/` | ✅ **PROCESS LOCKED** | 2025-12-27 | `docs/reports/audit/LIST_BASELINE_REPORT.md` |
| **Timeline** | `src/PATTERNS/lists/Timeline/` | ✅ **PROCESS LOCKED** | 2025-12-27 | `docs/reports/audit/TIMELINE_BASELINE_REPORT.md` |
| **IconGallery** | `src/COMPOSITION/utilities/IconGallery/` | ✅ **PROCESS LOCKED** | 2025-12-27 | `docs/reports/audit/ICONGALLERY_BASELINE_REPORT.md` |
| **EmptyState** | `src/PATTERNS/states/EmptyState/` | ✅ **PROCESS LOCKED** | 2025-12-27 | `docs/reports/audit/EMPTYSTATE_BASELINE_REPORT.md` |
| **NotificationCenter** | `src/DOMAIN/notifications/notifications/` | ✅ **PROCESS LOCKED** | 2025-12-27 | `docs/reports/audit/NOTIFICATIONCENTER_BASELINE_REPORT.md` |
| **Alert** | `src/PRIMITIVES/Alert/` | ✅ **PROCESS LOCKED** | 2025-12-26 | `docs/reports/audit/ALERT_BASELINE_REPORT.md` |
| **CardBase** | `src/PATTERNS/cards/cards/CardBase/` | ✅ **PROCESS LOCKED** | 2025-12-27 | `docs/reports/audit/CARDBASE_BASELINE_REPORT.md` |
| **FilterBar** | `src/PATTERNS/filters/filters/FilterBar/` | ✅ **PROCESS LOCKED** | 2025-12-27 | `docs/reports/audit/FILTERBAR_BASELINE_REPORT.md` |
| **HoverCard** | `src/PATTERNS/menus/menus/hover-card/` | ✅ **PROCESS LOCKED** | 2025-12-27 | `docs/reports/audit/HOVERCARD_BASELINE_REPORT.md` |
| **NavRoot** | `src/COMPOSITION/navigation/NavRoot/` | ✅ **PROCESS LOCKED** | 2025-12-26 | `docs/reports/audit/NAVROOT_BASELINE_REPORT.md` |
| **NavLink** | `src/PRIMITIVES/NavLink/` | ✅ **PROCESS LOCKED** | 2025-12-26 | `docs/reports/audit/NAVLINK_BASELINE_REPORT.md` |
| **SegmentedControl** | `src/COMPOSITION/navigation/segmented-control/` | ✅ **PROCESS LOCKED** | 2025-12-26 | `docs/reports/audit/SEGMENTEDCONTROL_BASELINE_REPORT.md` |
| **Breadcrumbs** | `src/COMPOSITION/navigation/breadcrumbs/` | ✅ **PROCESS LOCKED** | 2025-12-26 | `docs/reports/audit/BREADCRUMBS_BASELINE_REPORT.md` |
| **ContextMenu** | `src/COMPOSITION/overlays/ContextMenu/` | ✅ **PROCESS LOCKED** | 2025-12-25 | `docs/reports/audit/CONTEXTMENU_BASELINE_REPORT.md` |
| **TAS** | `src/COMPOSITION/motion/animation/` | ✅ **PROCESS LOCKED** | 2025-12-26 | `docs/reports/audit/TAS_BASELINE_REPORT.md` |
| **Field** | `src/PRIMITIVES/Field/` | ✅ **COMPOSITION READY** | 2025-12-27 | `docs/reports/audit/FIELD_BASELINE_REPORT.md` |
| **Popover** | `src/COMPOSITION/overlays/Popover.tsx` | ✅ **PROCESS LOCKED** | 2025-12-26 | `docs/reports/audit/POPOVER_BASELINE_REPORT.md` |
| **NextLinkAdapter** | `src/EXTENSIONS/next/NextLinkAdapter.tsx` | ✅ **PROCESS LOCKED** | 2025-12-25 | `docs/reports/audit/NEXTLINKADAPTER_BASELINE_REPORT.md` |

### Extension Tooling (LOCKED)

The following Extension layer build tooling has been audited and is **EXTENSION LOCKED**:

| Tooling | Location | Status | Lock Date | Audit Report |
|---------|----------|--------|-----------|--------------|
| **Theme Tooling** | `tools/theme-generator/`, `tools/theme-validator/`, `tools/theme-contract/` | ✅ **EXTENSION LOCKED** | 2025-12-31 | `docs/reports/theme-tooling-audit/08_final_verdict.md` |

**Theme Tooling Lock Summary:**

- **Lock Document:** [EXTENSION_LOCK_THEME_TOOLING.md](./EXTENSION_LOCK_THEME_TOOLING.md)
- **Audit Status:** FULL PASS (6/6 assumptions verified)
- **Default Output Path:** `src/EXTENSIONS/themes/` (immutable)
- **Validation:** Theme Contract v1 compliance (mandatory, no bypass)
- **Write Guards:** No files written if validation fails
- **CI Gates:** Pre-commit and CI workflow enforce validation

**Locked Elements:**
- CLI commands: `theme:generate`, `theme:validate`, `theme:parity-check`
- Default output directory: `src/EXTENSIONS/themes/`
- Validation rules (Theme Contract v1)
- Parity check (token registry compliance)
- No bypass flags allowed

**Allowed:** Bug fixes, documentation updates, performance improvements (without changing API/behavior)

**Forbidden:** Changing `DEFAULT_OUTPUT_DIR`, adding bypass flags, weakening validation rules, weakening CI gates

**Key Architectural Decisions (EmptyState):**

- **Compound Component Pattern:** Root component with Icon, Title, Description, Action subcomponents
- **Token Compliance:** EMPTY_STATE_TOKENS usage, 100% token-driven styling (no raw values)
- **Semantic HTML:** Uses `<h3>` for title, `<p>` for description, semantic structure
- **Stateless Non-Interactive:** Display-only component, no JavaScript state, no interaction logic
- **Subcomponent Attachment:** Optimized pattern using type alias (74% code reduction)
- **Type System:** Explicit union types (EmptyStateIconSize), no CVA type leakage
- **Icon Size Prop:** EmptyStateIcon has size prop (`sm | md | lg`) with token-driven sizing
- **Storybook Compliance:** SizesGallery story for EmptyStateIcon per VARIANTS_SIZE_CANON.md
- **Accessibility:** Semantic HTML, ARIA support, proper heading hierarchy

**Key Architectural Decisions (IconGallery):**

- **Component Role:** Utility/showcase component for displaying icons in various layouts (grid, sizes, colors)
- **No CVA Required:** Component correctly uses direct layout components (Grid, Stack, Row, Box) without token-driven axes
- **Token Compliance:** ✅ 100% (all spacing, padding, radius use token props from layout components)
- **Non-Interactive:** Pure presentational component (no state, no interaction logic)
- **Export Decision:** Intentionally NOT exported from `src/index.ts` (utility/showcase component for Storybook, not for production use)
- **Refactor Cycles:** Two complete Pipeline 18A cycles (2025-12-26, 2025-12-27) - component validated and compliant
- **Test Coverage:** Comprehensive edge case tests (empty array, single icon, ref forwarding, HTML attributes)
- **Storybook Coverage:** Compliant (all modes demonstrated: Default, AllIcons, AllIconsWithSizes, AllIconsWithColors, CustomIcons, SingleIcon, WithCustomProps, EmptyIcons)
- **Accessibility:** ✅ Compliant (presentational component, uses accessible Icon and Text components)

**Key Architectural Decisions (NotificationCenter):**

- **Compound Component Pattern:** Provider, Panel, Trigger, List, Item, GroupHeader, DismissAll subcomponents
- **No CVA Required:** Components correctly use direct token classes via NOTIFICATION_TOKENS (Decision Matrix RULE 2 applies - components without token-driven axes)
- **Token Compliance:** ✅ NOTIFICATION_TOKENS used throughout (Panel, List, Item, GroupHeader)
- **Utility Functions:** Variant/channel conversion helpers extracted to `NotificationCenter.utils.ts` for reusability
- **Code Quality:** Channel method pattern extracted in useNotificationCenter (reduced duplication from 6 callbacks to helper function)
- **Panel Width Restriction:** Panel width prop restricted to overlay size scale (`sm | md | lg` only, compliant with VARIANTS_SIZE_CANON overlay restriction)
- **State Management:** Provider manages notifications and history, Panel manages UI state (collapsedGroups)
- **Accessibility:** ✅ Full ARIA support (dialog role, aria-modal, aria-label, aria-labelledby, aria-describedby), keyboard navigation (ESC), focus lock, screen reader support
- **Storybook Compliance:** SizesGallery and LongContent stories added per VARIANTS_SIZE_CANON.md requirements
- **Test Coverage:** Comprehensive tests covering all subcomponents, hooks, interactions, and accessibility

**Key Architectural Decisions (SimpleTable):**

- **CVA Migration:** Added `tokenCVA` per Decision Matrix RULE 1 (component has token-driven size axis)
- **Size Prop Addition:** Added `size` prop with `sm | md | lg` subset (per VARIANTS_SIZE_CANON.md)
- **Type System:** Explicit union type exported (`SimpleTableSize`), no CVA type leakage
- **Type Constraints:** `satisfies Record<SimpleTableSize, string>` constraint applied to variant maps
- **Token Compliance:** Created SIMPLETABLE_TOKENS and replaced all raw Tailwind classes with tokens
- **No Variant Prop:** Simple table doesn't need visual variants (correct decision)
- **Semantic HTML:** Uses semantic table structure with `scope="col"` on headers for accessibility
- **Component Role:** Simple tabular data display component (no sorting, filtering, or pagination)
- **Storybook Compliance:** Required stories added (SizesGallery, States per VARIANTS_SIZE_CANON)

**Key Architectural Decisions (Table):**

- **Compound Component Pattern:** Root, Header, Head, Body, Row, Cell, SortIcon, Empty, LoadingState, ExpandableContent
- **React Context:** State management via TableContext (sortState, expandedRows)
- **Token Compliance:** TABLE_TOKENS usage, no raw values
- **Type System:** Explicit union types, no CVA type leakage
- **Accessibility:** ARIA attributes, keyboard navigation, semantic HTML

**Key Architectural Decisions (DataList):**

- **Compound Component Pattern:** Root, Item, Label, Value subcomponents
- **React Context:** labelWidth prop passed via DataListContext from Root to Label
- **Token Compliance:** DATA_LIST_TOKENS usage, no raw values in stories
- **Semantic HTML:** Uses `<dl>`, `<dt>`, `<dd>` elements for description lists
- **Responsive Layout:** CSS-based responsive behavior (mobile: vertical, desktop: horizontal)
- **No CVA:** Component correctly uses direct token objects (no token-driven axes)
- **Storybook Compliance:** SizesGallery story added per SIZE_MAPPING_SPEC.md

**Key Architectural Decisions (Timeline):**

- **Token Compliance:** Created TIMELINE_TOKENS domain, 100% token usage (no raw Tailwind classes)
- **Semantic HTML:** Uses `<ol>` and `<li>` for chronological list structure with `role="list"`
- **Accessibility:** ARIA attributes (`role="list"`, `aria-hidden="true"` on decorative elements)
- **No CVA:** Component correctly does NOT use CVA (no token-driven axes per Decision Matrix RULE 2)
- **Presentational Component:** Display-only, no interactive states, no size/variant props
- **Code Quality:** React.FC pattern replaced with explicit function signature (modern React pattern)
- **Test Coverage:** 15 comprehensive test cases (public behavior, edge cases, A11Y)
- **Storybook:** 4 stories (Default, WithoutDescription, LongDescriptions, Accessibility)

**Key Architectural Decisions (RangeSlider):**
- **CVA Type Migration:** Migrated from `cva` to `tokenCVA` per CVA Usage Decision Matrix RULE 1 (component has token-driven axes: variant, size)
- **Token Compliance:** Created component-specific token file (`RANGESLIDER_TOKENS`) and replaced all raw Tailwind classes with token references
- **Type Constraints:** Added `satisfies Record<Type, string>` constraints to all CVA variant maps for type safety
- **Consciously NOT Made Changes:** No API changes (API was well-designed), no behavior changes (behavior was correct), no component splitting (component has clear responsibility)
- **Refactor Cycle 2025-12-27:** No changes required - Component fully compliant with all Authority Contracts, all previous cycle improvements remain valid

**Key Architectural Decisions (AspectRatio):**

- **Pure Layout Utility:** No visual tokens (correct for aspect ratio constraint)
- **Semantic Presets:** 6 presets (square, video, cinema, portrait, photo, golden) represent real-world use cases
- **Custom Ratios:** Flexible numeric ratio support for edge cases
- **Preset Priority:** `preset` prop overrides `ratio` prop when both provided (documented inline)
- **Radix Delegation:** Thin wrapper around `@radix-ui/react-aspect-ratio`
- **Non-Interactive:** Pure layout container (no interaction model, no state management)
- **Minimal A11Y Requirements:** Child content accessibility preserved (tested)

**Key Architectural Decisions (Separator):**

- **Token-Driven:** Uses `tokenCVA` and `SEPARATOR_TOKENS` for all styling (color, thickness)
- **CVA Type:** Migrated from `cva` to `tokenCVA` per Decision Matrix RULE 1 (token-driven axes: color, thickness)
- **Type System:** Explicit union types exported (`SeparatorColor`, `SeparatorThickness`), no CVA type leakage
- **Type Constraints:** `satisfies Record<Type, string>` constraints applied to variant maps
- **Dual Orientation:** Horizontal and vertical separators (semantic roles)
- **Semantic vs Decorative:** `role="separator"` vs `role="none"` (ARIA compliance)
- **Radix-Based:** Delegates to `@radix-ui/react-separator` for all behavior
- **Thickness Tokens:** Component-specific tokens (`SEPARATOR_TOKENS`) for 1px and 2px thickness values

**Key Architectural Decisions (Progress):**

- **Token-Driven:** Uses PROGRESS_TOKENS for colors (background, fill)
- **Size Scale:** Interactive Size Scale Authority subset (`sm | md | lg`)
- **ARIA Compliant:** `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`
- **Non-Interactive:** Display-only component (no user interaction)

**Key Architectural Decisions (Badge):**

- **CVA Type:** Uses `tokenCVA` per Decision Matrix RULE 1 (token-driven variant axis)
- **Variant Dictionary:** InteractiveVariant compliant (primary, secondary, accent, outline, ghost, link, destructive)
- **No Size Prop:** Correctly absent for semi-interactive component per FOUNDATION_LOCK.md rule
- **Token Compliance:** 100% token usage (BADGE_TOKENS), no raw values
- **Type System:** Explicit union type exported (`BadgeVariant`), type constraints in CVA (`satisfies Record<BadgeVariant, string>`)
- **State Model:** CSS-derived hover states (appropriate for semi-interactive display component)
- **Accessibility:** Non-interactive display component, accepts optional ARIA attributes (role, aria-label)
- **Component Role:** Visual label/tag component for displaying status indicators, categories, or metadata

**Key Architectural Decisions (Tooltip):**

- **CVA Migration:** Migrated from `cva` to `tokenCVA` per Decision Matrix RULE 1 (token-driven variant axis)
- **Type System:** Explicit union type exported (`TooltipVariant`), no CVA type leakage
- **Type Constraints:** `satisfies Record<TooltipVariant, string>` constraint applied to variant map
- **Token Compliance:** Primary variant uses TOOLTIP_TOKENS; other variants use standard semantic Tailwind classes
- **Radix Delegation:** All behavior (hover, focus, keyboard, a11y) handled by Radix Tooltip primitives
- **No Size Prop:** Fixed size appropriate for small informational overlay
- **Storybook Compliance:** Required stories added (`States`, `LongContent` per VARIANTS_SIZE_CANON)

**Key Architectural Decisions (Slider):**

- **CVA Migration:** Migrated from `cva` to `tokenCVA` per Decision Matrix RULE 1 (token-driven axes: variant, size)
- **Type System:** Explicit union types exported (`SliderSize`, `SliderVariant`, `SliderOrientation`), no CVA type leakage
- **Type Constraints:** `satisfies Record<Type, string>` constraints applied to all variant and size maps
- **Token Compliance:** Uses SLIDER_TOKENS domain for all size-related styling (root, track, thumb, marks)
- **Token Domain:** Created component-specific SLIDER_TOKENS for size values (root container, track thickness, thumb size, mark dot/label sizes)
- **Radix Delegation:** All interaction behavior (value management, keyboard navigation, focus, ARIA) delegated to Radix Slider primitives
- **Multi-Element CVA Pattern:** Uses multiple CVA instances (7 separate CVAs) for different component elements (root, track, range, thumb, mark, markDot, markLabel) - appropriate for complex multi-element component
- **Marks Implementation:** Custom marks rendering (not Radix) - valid extension feature for sliders
- **Orientation Support:** Full horizontal and vertical orientation support via Radix
- **Size Scale:** Interactive Size Scale Authority subset (`sm | md | lg`)
- **Variant Dictionary:** InteractiveVariant subset (`primary | secondary | outline`)
- **Storybook Compliance:** Required stories present (Matrix, States, SizesGallery per VARIANTS_SIZE_CANON)

**Key Architectural Decisions (NavSeparator):**

- **No CVA Structure:** Component correctly omits CVA (no size/variant props per Decision Matrix RULE 2)
- **Token Compliance:** All styling via NAVIGATION_TOKENS.states.default.text (100% token compliance)
- **Stateless Component:** No internal state (correct for decorative element)
- **Purely Decorative:** Always applies aria-hidden="true" (correct for decorative element)
- **asChild Pattern:** Supports Radix Slot composition pattern (canonical)
- **Code Quality:** Common props extracted to reduce duplication (STEP 1 improvement)
- **Type System:** Explicit types (NavSeparatorProps), no CVA-derived types (N/A - no CVA)
- **Accessibility:** WCAG 2.1 Level A/AA/AAA compliant (decorative element properly hidden)
- **Component Role:** Purely visual navigation separator with no semantics or logic

**Key Architectural Decisions (Skeleton):**

- **CVA Migration:** Migrated from `cva` to `tokenCVA` per Decision Matrix RULE 1 (token-driven variant axis)
- **Type System:** Explicit union type exported (`SkeletonVariant`), removed `VariantProps` leakage, type constraints applied (`satisfies Record<SkeletonVariant, string>`)
- **Token Compliance:** Uses DATA_TOKENS.skeleton for all styling (height, radius, width, background, animation)
- **Component Role:** Presentational primitive for loading states (non-interactive, informational)
- **Layer Classification:** Extension component (PRIMITIVES - presentational primitive)
- **Variant Dictionary:** Domain-specific variants (`text`, `inline`, `block`, `card`, `circle`) - semantically meaningful for loading states, acceptable exception to canonical dictionaries
- **No Size Prop:** Variant-based sizing (each variant defines its own size) - appropriate for skeleton component
- **Accessibility:** `aria-hidden={true}` by default (correct for loading placeholders), prop allows control when needed

**Key Architectural Decisions (Row):**

- **Semantic Alias Pattern:** Simple wrapper component that delegates to Stack with `direction="horizontal"` hardcoded
- **No CVA Required:** Correctly does not use CVA per Decision Matrix (no token-driven axes: no variant, no size, no state)
- **Type System:** Inherits types from StackProps via `Omit<StackProps, "direction">`, no type leakage
- **Token Compliance:** All styling delegated to Stack (100% token-compliant via Stack)
- **Non-Interactive:** Pure layout primitive with no states, no interaction logic, no event handlers
- **Accessibility:** Delegates accessibility to Stack (renders semantic HTML div, no ARIA roles needed)
- **Pipeline Outcome:** Component validated by Pipeline 18A, no changes required, fully compliant with all architectural standards
- **Pattern Difference:** Row uses wrapper pattern with direction enforcement, Column uses direct alias pattern without enforcement (both patterns are valid architectural decisions)

**Key Architectural Decisions (Column):**

- **Semantic Alias Pattern:** Direct alias pattern (`export const Column = Stack;`) - simpler than Row wrapper pattern
- **No CVA Required:** Correctly does not use CVA per Decision Matrix (no token-driven axes: no variant, no size, no state)
- **Type System:** Direct type alias (`export type { StackProps as ColumnProps };`) - inherits all StackProps including direction
- **Token Compliance:** All styling inherited from Stack (100% token-compliant via Stack)
- **Non-Interactive:** Pure layout primitive with no states, no interaction logic, no event handlers
- **Accessibility:** Inherits accessibility from Stack (renders semantic HTML div, no ARIA roles needed)
- **Pipeline Outcome:** Component validated by Pipeline 18A, no changes required, fully compliant with all architectural standards
- **Direction Enforcement:** Column does NOT enforce vertical direction (unlike Row which enforces horizontal) - users can pass `direction="horizontal"` which contradicts semantic intent but is allowed (architectural decision)
- **Pattern Inconsistency:** Column uses direct alias pattern, Row uses wrapper pattern - both patterns are valid architectural decisions

**Key Architectural Decisions (Box):**

- **Pure Container Component:** Lowest-level layout primitive with no layout composition semantics (display, flexDirection, gap, alignment)
- **Token Compliance:** 100% token usage via CSS variables (spacing, radius, background) and Tailwind classes (shadow)
- **No CVA Required:** Correctly does not use CVA per Decision Matrix (no token-driven axes: no variant, no size, no state)
- **Type System:** Explicit union types from token system (SpacingValue, RadiusValue, ColorValue, ShadowValue), no CVA type leakage
- **Responsive Support:** Full responsive prop support via ResponsiveSpacing, ResponsiveRadius, ResponsiveColor
- **Element Rendering:** `as` prop allows semantic HTML elements (section, article, aside, etc.)
- **Extension API:** Allows className and style props (Extension component, different from Foundation Enforcement)
- **Non-Interactive:** Pure container with no states, no interaction logic, no event handlers
- **Accessibility:** Renders standard HTML elements (already accessible), no ARIA roles/attributes needed
- **Pipeline Outcome:** Component validated by Pipeline 18A, no changes required, fully compliant with all architectural standards
- **Type Deduplication:** Removed duplicate `SkeletonProps` definition (deleted Skeleton.types.ts)
- **Storybook Compliance:** Stories demonstrate all variants and realistic usage (Matrix/States/SizesGallery not required - component has only variant prop, non-interactive)

**Key Architectural Decisions (CardBase):**

- **CVA Migration:** Migrated from `cva` to `tokenCVA` per CVA Usage Decision Matrix RULE 1 (component has token-driven axes: variant, size)
- **Size Scale Alignment:** Mapped custom sizes `"default" | "compact"` → GlobalSize scale `"sm" | "md"` per VARIANTS_SIZE_CANON.md
- **Variant Dictionary Alignment:** Mapped custom variants `"default" | "featured"` → SurfaceVariant dictionary `"default" | "elevated"` per VARIANTS_SIZE_CANON.md
- **Type Constraints:** Added `satisfies Record<CardBaseSize, string>` and `satisfies Record<CardBaseVariant, string>` constraints to all CVA variant maps
- **Size Mapping Table:** Created size mapping table per SIZE_MAPPING_SPEC.md documenting token usage for each size
- **Empty Variant Maps:** Kept empty size variants in subcomponents (ImageWrapper, ContentWrapper, FooterWrapper) - justified: no size-specific styling needed, but size prop maintained for API consistency
- **Component Role:** Layout composition primitive for card structures with pure layout wrappers (no domain logic)
- **Breaking Changes:** Size prop changed from `"default" | "compact"` to `"sm" | "md"`, variant prop changed from `"default" | "featured"` to `"default" | "elevated"`
- **Storybook Compliance:** Added canonical stories (Matrix, SizesGallery) per VARIANTS_SIZE_CANON.md requirements
- **Test Coverage:** Comprehensive test suite created covering all public behavior, variants, sizes, and subcomponents

**Key Architectural Decisions (Flex):**

- **Advanced Flexbox Container:** Full programmatic control over flexbox properties (direction, wrap, grow, shrink, basis, alignment, spacing) for complex layout scenarios
- **Token Compliance:** 100% token usage for spacing (gap uses spacing tokens via CSS variables), basis accepts both spacing tokens and semantic CSS values (auto, 0, 100%, etc.)
- **No CVA Required:** Correctly does not use CVA per Decision Matrix (no token-driven axes: no variant, no size, no state)
- **Type System:** Explicit union types from shared layout.types (ResponsiveFlexDirection, ResponsiveFlexWrap, ResponsiveAlignment, ResponsiveJustify, ResponsiveFlexBasis, ResponsiveSpacing), no CVA type leakage
- **Box Integration:** Uses Box internally as base container, omits conflicting props (display, flexDirection, align, justify) to prevent conflicts
- **Extension API:** Allows className and style props (Extension component, different from Foundation Enforcement)
- **Non-Interactive:** Pure layout primitive with no states, no interaction logic, no event handlers
- **Accessibility:** Renders standard HTML div (already accessible), no ARIA roles/attributes needed for layout container
- **Pipeline Outcome:** Component validated by Pipeline 18A, no changes required, fully compliant with all architectural standards
- **Helper Function Pattern:** Uses local helper functions (alignToClass, justifyToClass, etc.) - same pattern as Stack/Grid (system-wide pattern, not Flex-specific issue)
- **Storybook Compliance:** Stories demonstrate all flexbox options (8 stories), no required stories missing (Matrix/States/SizesGallery/LongContent not required - Flex has no size/variant/states, not an Overlay)

**Key Architectural Decisions (NavList):**

- **Pure Structural Component Pattern:** NavList is intentionally a pure structural wrapper with no styling, logic, or state (correct and aligns with component's role as semantic list container)
- **Foundation Enforcement Compliance:** `className` and `style` props are correctly excluded from public API via `Omit<React.OlHTMLAttributes<HTMLOListElement>, "className" | "style">`
- **No Size/Variant Props:** Component correctly has no size or variant props (structural component) - this is intentional and aligns with component's role
- **asChild Pattern:** Component supports asChild pattern via Radix Slot for composition, enabling flexible composition with custom components
- **Semantic HTML:** Component renders native `<ol>` or `<ul>` elements with correct semantics, default element is `<ol>` for semantic navigation lists
- **No CVA Required:** Correctly does not use CVA per Decision Matrix (no token-driven axes: no variant, no size, no state)
- **Type System:** Explicit union types (`as?: "ol" | "ul"`), no CVA type leakage, correct ref type (`HTMLOListElement | HTMLUListElement`)
- **Stateless Component:** No React hooks, no state management, pure render function
- **Accessibility:** Native HTML list semantics are correctly announced by screen readers, ARIA attributes correctly passed through
- **Pipeline Outcome:** Component validated by Pipeline 18A, no changes required, fully compliant with all architectural standards

**Key Architectural Decisions (List):**

- **Simple List Display Pattern:** Component is intentionally simple, no compound component pattern needed (unlike DataList which uses compound pattern for flexibility)
- **Token Compliance:** LIST_TOKENS file created, all raw Tailwind classes replaced with tokens (100% token compliance achieved)
- **Semantic HTML:** Component uses `<ul>` and `<li>` elements with `role="list"` for accessibility (improved from initial `<div>` structure)
- **Presentational Component:** Component is purely presentational with no interactive states beyond CSS hover (no size/variant props intentionally)
- **Modern React Pattern:** React.FC replaced with explicit function signature for better type inference
- **No CVA Required:** Correctly does not use CVA per Decision Matrix (no token-driven axes: no variant, no size, no state)
- **Type System:** Explicit types (`ListItem`, `ListProps`), no CVA type leakage
- **Test Coverage:** Comprehensive test suite added (9 test cases covering behavior, edge cases, accessibility)
- **Storybook Compliance:** Existing stories validated, Accessibility story added per STEP 11 requirements
- **Accessibility:** WCAG 2.1 Level A compliant (semantic HTML structure, proper ARIA attributes, screen reader support)
- **Pipeline Outcome:** Component validated by Pipeline 18A (Steps 0-12), all BLOCKERS resolved, fully compliant with all architectural standards

**PROCESS LOCKED Status:**
- Components completed Pipeline 18A (Steps 0-12)
- Zero violations detected across all steps
- Comprehensive test coverage (24+ tests each)
- Excellent Storybook coverage (10+ stories each with realistic examples)
- Full accessibility audit executed
- All architectural decisions documented

---

## 📝 Naming Rules

### Foundation Naming Rules

**FOUNDATION NAMES ARE RESERVED:**

1. **Foundation names are immutable**
   - `Modal`, `Tabs`, `Select`, `ContextMenu`, `Toast` are **reserved**
   - These names **cannot** be used for extensions
   - These names **cannot** be modified

2. **No prefixes allowed for foundation components**
   - ❌ `SimpleModal`, `BasicModal`, `OldSelect`, `LegacyToast` (foundation duplicates)
   - ❌ `ModalV2`, `TabsV2`, `SelectV2` (foundation duplicates)
   - ❌ `NewModal`, `NewTabs`, `NewSelect` (foundation duplicates)
   - ⚠️ **Note:** `Basic*` naming is **allowed** for internal components within a component family (e.g., `BasicButton` inside a button family), but **never** for global foundation components (Modal, Tabs, Select, ContextMenu, Toast)

3. **No suffixes allowed**
   - ❌ `ModalBasic`, `TabsSimple`, `SelectOld`
   - ❌ `ModalLegacy`, `TabsLegacy`, `SelectLegacy`

### Extension Naming Rules

**EXTENSIONS USE DESCRIPTIVE NAMES:**

1. **Intent-based naming**
   - ✅ `ConfirmDialog` - Describes intent (confirmation)
   - ✅ `NotificationCenter` - Describes intent (notification management)
   - ✅ `MultiSelect` - Describes intent (multi-selection)
   - ✅ `TabNavigation` - Describes intent (navigation with tabs)

2. **Domain-specific naming**
   - ✅ `EventModal` - Domain-specific (events)
   - ✅ `UserContextMenu` - Domain-specific (users)
   - ✅ `SearchSelect` - Domain-specific (search)

3. **Pattern-based naming**
   - ✅ `ModalWithForm` - Pattern (modal with form)
   - ✅ `TabsWithRouting` - Pattern (tabs with routing)
   - ✅ `SelectWithSearch` - Pattern (select with search)

---

## 📚 Storybook Rules

### Storybook Structure

**STORYBOOK ORGANIZATION:**

1. **Foundation Components**
   - Foundation components appear under **`UI / Foundation`**
   - Examples:
     - `UI / Foundation / Modal`
     - `UI / Foundation / Tabs`
     - `UI / Foundation / Select`
     - `UI / Foundation / ContextMenu`
     - `UI / Foundation / Toast`

2. **Extension Components**
   - Extensions appear under **`UI / Extensions`** or **`UI / Patterns`**
   - Examples:
     - `UI / Extensions / ConfirmDialog`
     - `UI / Patterns / NotificationCenter`
     - `UI / Extensions / MultiSelect`

3. **No Duplicate Names**
   - Storybook **must not** show duplicate component names
   - If an extension exists, it **cannot** share a name with a foundation component
   - Storybook structure **must** reflect the architecture lock

### Storybook Naming Convention

```
UI /
├── Foundation /
│   ├── Modal
│   ├── Tabs
│   ├── Select
│   ├── ContextMenu
│   └── Toast
├── Extensions /
│   ├── ConfirmDialog
│   ├── NotificationCenter
│   └── MultiSelect
└── Patterns /
    ├── ModalWithForm
    └── TabsWithRouting
```

---

## 🤖 Cursor / AI Rules

### AI Development Rules

**CURSOR AI MUST FOLLOW THESE RULES:**

1. **NO NEW FOUNDATION COMPONENTS**
   - Cursor **must not** create new foundation components
   - Cursor **must not** suggest new foundation components
   - Cursor **must not** duplicate foundation functionality

2. **REUSE EXISTING FOUNDATION COMPONENTS**
   - Cursor **must** reuse existing foundation components
   - Cursor **must** suggest using foundation components for new features
   - Cursor **must** compose foundation components in extensions

3. **TREAT LOCKED COMPONENTS AS READ-ONLY**
   - Cursor **must** treat locked components as read-only
   - Cursor **must not** modify foundation components (except bug fixes)
   - Cursor **must** suggest extensions for new behavior

4. **PREFER EXTENSIONS FOR NEW BEHAVIOR**
   - Cursor **must** prefer extension components for new behavior
   - Cursor **must** suggest creating extensions instead of modifying foundation
   - Cursor **must** follow extension naming rules

### AI Prompt Guidelines

When requesting new components, Cursor should:

- ✅ **Suggest extensions** that use foundation components
- ✅ **Follow naming rules** (descriptive, intent-based)
- ✅ **Place extensions** in appropriate folders
- ❌ **Never suggest** new foundation components
- ❌ **Never suggest** modifying foundation components
- ❌ **Never suggest** duplicate foundation functionality

---

## 🛡️ Guard Prompt (AI Enforcement)

### TENERIFE UI — ARCHITECTURE LOCK (GUARD PROMPT)

**You are working inside the `@tenerife.music/ui` repository.**

⚠️ **UI FOUNDATION ARCHITECTURE IS LOCKED.**

### Foundation Components (Read-Only)

The following components are canonical Foundation components:

- **Modal** (Radix Dialog wrapper)
- **Tabs** (Radix Tabs wrapper)
- **Select** (Radix Select wrapper)
- **ContextMenu** (Radix ContextMenu wrapper)
- **Toast** (Radix Toast wrapper)

**These components follow Foundation architectural patterns.**

**You may ONLY:**

- Fix bugs
- Improve typing
- Improve documentation
- Improve token usage (within existing tokens)

**You MUST NEVER:**

- Create new foundation components
- Suggest alternative implementations
- Create `Simple*`, `Basic*`, `Legacy*`, `V2*`, or duplicate variants **for foundation components** (Modal, Tabs, Select, ContextMenu, Toast)
- Reimplement behavior handled by Radix
- Modify token values or domains (token system is locked)
- Add or remove token domains
- Change token ownership rules

**Note on Basic* naming:**
- ❌ **FORBIDDEN:** `BasicModal`, `BasicTabs`, `BasicSelect` (these duplicate foundation components)
- ✅ **ALLOWED:** `BasicButton`, `BasicCard`, `BasicInput` (these are internal to a component family and do not duplicate foundation)
- The key distinction: Basic* is acceptable when it's clearly internal to a single family and does not duplicate a foundation component

### Extension Rules

If new behavior or UX is required:

- Create an **EXTENSION component**
- **EXTENSION** must compose an existing foundation component
- **EXTENSION** must **NOT** be named after a foundation component
- **EXTENSION** must live outside foundation folders

**Valid examples:**

- ✅ `ConfirmDialog` (uses Modal)
- ✅ `NotificationCenter` (uses Toast)
- ✅ `MultiSelect` (uses Select)

**Invalid examples:**

- ❌ `SimpleModal` (duplicates foundation Modal)
- ❌ `BasicModal` (duplicates foundation Modal)
- ❌ `CustomTabs` (duplicates foundation Tabs)
- ❌ `AdvancedSelect` (duplicates foundation Select)
- ❌ `ModalV2` (duplicates foundation Modal)

**Note:** `Basic*` naming is acceptable for internal components within a component family (e.g., `BasicButton` as an internal variant), but never for global foundation components.

### Token System Lock

**Token System is LOCKED and IMMUTABLE.**

If token modifications are needed:

- Token system modifications require explicit **UNLOCK + AUDIT** workflow
- Reference: `docs/architecture/TOKEN_AUTHORITY.md`
- Reference: `docs_archive/reports/archive/archive/reports/other/TUI_TOKEN_DOMAINS_FINAL_REPORT.md` (Note: File may be in docs_archive)
- All token changes require full audit and explicit approval

### Radix Rule

All behavior-heavy components **MUST** delegate behavior to Radix.

**You MUST NOT implement:**

- Custom focus management
- Custom keyboard navigation
- Custom ARIA attributes
- Custom portal or scroll locking

### Token Rule

All visual props **MUST** use token unions.

**String or number-based visual props are forbidden.**

### Token System Lock

**THE TOKEN SYSTEM IS LOCKED AND IMMUTABLE AS PART OF THE FOUNDATION ARCHITECTURE.**

- ✅ **ALLOWED:** Consumption of existing tokens by components
- ✅ **ALLOWED:** Creation of new component token domains ONLY for new components with explicit approval
- ❌ **FORBIDDEN:** Modifying token values in any domain
- ❌ **FORBIDDEN:** Adding or removing token domains
- ❌ **FORBIDDEN:** Merging or splitting existing domains
- ❌ **FORBIDDEN:** Reinterpreting token semantics
- ❌ **FORBIDDEN:** Changing domain ownership rules

**Token System Lock Date:** 2025-12-13  
**Reference:** [Token System Documentation](./TOKEN_AUTHORITY.md)  
**Final Audit:** [Token Domains Final Report](../../../docs_archive/reports/archive/archive/reports/other/TUI_TOKEN_DOMAINS_FINAL_REPORT.md) - **FINAL VERDICT: OK** (Note: File may be in docs_archive)

**Any token system modifications require explicit unlock procedure with full audit.**

### Storybook Rule

Storybook **MUST** reflect architecture truth:

- One foundation component per category
- Extensions must be clearly labeled

### Enforcement

**If a request would violate these rules:**

**YOU MUST REFUSE and explain why.**

**This is non-negotiable.**

---

## 🚫 What Is Forbidden

### Forbidden Actions

**THE FOLLOWING ACTIONS ARE FORBIDDEN:**

1. **Creating New Foundation Components**
   - ❌ Creating `Drawer` as a foundation component
   - ❌ Creating `Popover` as a foundation component
   - ❌ Creating any new foundation component

2. **Duplicating Foundation Components**
   - ❌ Creating `SimpleModal`, `BasicTabs`, `OldSelect`
   - ❌ Creating `ModalV2`, `TabsV2`, `SelectV2`
   - ❌ Creating any duplicate foundation component

3. **Modifying Foundation Components (Breaking Changes)**
   - ❌ Removing props from foundation components
   - ❌ Changing foundation component APIs
   - ❌ Breaking backward compatibility

4. **Using Foundation Names for Extensions**
   - ❌ Naming extensions after foundation components
   - ❌ Using prefixes like `Simple*`, `Basic*`, `Old*`, `Legacy*`
   - ❌ Using suffixes like `*Basic`, `*Simple`, `*Old`, `*Legacy`

5. **Bypassing Foundation Components**
   - ❌ Creating modal-like components without using `Modal`
   - ❌ Creating tab-like components without using `Tabs`
   - ❌ Creating select-like components without using `Select`

6. **Placing Extensions in Foundation Folders**
   - ❌ Placing extensions in `src/components/modal/`
   - ❌ Placing extensions in `src/components/navigation/tabs/`
   - ❌ Placing extensions in foundation component folders

7. **Token System Modifications**
   - ❌ Modifying token values in any domain
   - ❌ Adding or removing token domains
   - ❌ Merging or splitting existing domains
   - ❌ Reinterpreting token semantics
   - ❌ Changing domain ownership rules
   - ❌ Creating new token domains without explicit unlock procedure

### Forbidden Patterns

```typescript
// ❌ FORBIDDEN - New foundation component
export const Drawer = () => { ... }; // Foundation layer is closed

// ❌ FORBIDDEN - Duplicate foundation component
export const SimpleModal = () => { ... }; // Uses foundation name

// ❌ FORBIDDEN - Extension in foundation folder
// src/components/modal/ConfirmDialog.tsx - Wrong location

// ❌ FORBIDDEN - Bypassing foundation component
export const CustomModal = () => {
  // Direct implementation without using Modal foundation
};

// ❌ FORBIDDEN - Breaking foundation API
export interface ModalProps {
  // Removing existing props
}
```

---

## ✅ What Is Allowed

### Allowed Actions

**THE FOLLOWING ACTIONS ARE ALLOWED:**

1. **Creating Extension Components**
   - ✅ Creating `ConfirmDialog` that uses `Modal` internally
   - ✅ Creating `NotificationCenter` that uses `Toast` internally
   - ✅ Creating `MultiSelect` that uses `Select` internally

2. **Modifying Foundation Components (Bug Fixes)**
   - ✅ Fixing bugs in foundation components
   - ✅ Improving accessibility in foundation components
   - ✅ Performance optimizations (non-breaking)

3. **Adding Non-Breaking Features to Foundation**
   - ✅ Adding new optional props (backward-compatible)
   - ✅ Adding new variants (backward-compatible)
   - ✅ Adding new subcomponents (backward-compatible)

4. **Creating Domain-Specific Extensions**
   - ✅ Creating `EventModal` for event management
   - ✅ Creating `UserContextMenu` for user actions
   - ✅ Creating `SearchSelect` for search functionality

5. **Creating Pattern-Based Extensions**
   - ✅ Creating `ModalWithForm` pattern
   - ✅ Creating `TabsWithRouting` pattern
   - ✅ Creating `SelectWithSearch` pattern

### Allowed Patterns

```typescript
// ✅ ALLOWED - Extension using foundation component
// src/components/modals/ConfirmDialog.tsx
import { Modal, ModalRoot, ModalContent } from "@tenerife.music/ui";

export const ConfirmDialog = ({ onConfirm, onCancel }) => {
  return (
    <ModalRoot open={open} onOpenChange={onOpenChange}>
      <ModalContent>
        {/* Confirmation logic */}
      </ModalContent>
    </ModalRoot>
  );
};

// ✅ ALLOWED - Bug fix in foundation component
// src/components/modal/Modal.tsx
export const Modal = () => {
  // Fix: Improved focus trap behavior
};

// ✅ ALLOWED - Non-breaking feature addition
export interface ModalProps {
  existingProp?: string; // Existing prop
  newOptionalProp?: string; // ✅ New optional prop (backward-compatible)
}
```

---

## 🔍 Verification Checklist

Before considering the architecture lock complete, verify:

- [ ] All foundation components exist and are properly exported
- [ ] No duplicate foundation components exist
- [ ] Foundation components are in correct locations
- [ ] Storybook structure matches rules (Foundation vs Extensions)
- [ ] No extensions use foundation component names
- [ ] No extensions are in foundation folders
- [ ] All extensions use foundation components internally
- [ ] README.md references Architecture Lock document
- [ ] Architecture Lock document is complete and explicit

---

## 📊 Architecture Lock Status

### Foundation Layer (Implemented)

| Component   | Status    | Implementation Date | Notes                                                    |
| ----------- | --------- | ------------------- | -------------------------------------------------------- |
| Button      | ✅ **FINAL LOCK** | 2025-12-25 | Native button element. Sole action trigger foundation. Pipeline 18A complete. |
| Link        | ✅ **LOCKED** | 2025-12-25 | Native anchor element. Sole navigation link foundation. Pipeline 18A complete. |
| Text        | ✅ **LOCKED** | 2025-12-25 | Native span element. Sole typography foundation. Pipeline 18A complete. |

**Foundation Layer Status:** ✅ **IMPLEMENTED**  
**Implementation Date:** 2025-12-12  
**Next Review:** As needed for updates

**Note:** Foundation components follow canonical architectural patterns. Canonical truth: FOUNDATION_LOCK.md.

### Public Components Index (Cross-layer)

The following public components are **IMPLEMENTED** after completing their audit and implementation procedures. This index includes components from Foundation, Extension, and Composition layers.

| Component | Layer      | Status    | Implementation Date | Notes                                    |
| --------- | ---------- | --------- | -------------------- | ---------------------------------------- |
| Button    | Foundation | ✅ **FINAL LOCK** | 2025-12-25  | Foundation primitive. Pipeline 18A Steps 0-12 complete. FINAL LOCK and immutable. |
| Link      | Foundation | ✅ **LOCKED** | 2025-12-25  | Foundation primitive. Pipeline 18A Steps 0-12 complete. LOCKED and immutable. |
| Text      | Foundation | ✅ **LOCKED** | 2025-12-25  | Foundation primitive. Pipeline 18A Steps 0-11 complete. LOCKED and immutable. |
| Heading   | Extension  | ✅ Implemented | 2025-12-15  | Typography component. Implemented after audit. |
| Body      | Extension  | ✅ Implemented | 2025-12-15  | Typography component. Implemented after audit. |
| Caption   | Extension  | ✅ Implemented | 2025-12-15  | Typography component. Implemented after audit. |
| Code      | Extension  | ✅ Implemented | 2025-12-15  | Typography component. Implemented after audit. |
| Display   | Extension  | ✅ Implemented | 2025-12-15  | Typography component. Implemented after audit. |
| Lead      | Extension  | ✅ Implemented | 2025-12-15  | Typography component. Implemented after audit. |
| Input     | Foundation | ✅ **LOCKED** | 2025-12-26  | Foundation primitive. Completed Pipeline 18A Refactor Cycle 2 (Steps 0-12). Low-level form control primitive. Native input element with token-driven styling (size-only CVA). Intentional limitation: does not handle validation, errors, labels, helper text, or form logic. |
| Tooltip   | Extension  | ✅ Implemented | 2025-12-21  | Overlay component. Implemented after TUNG_TOOLTIP_POPOVER_STEP_0-10 completion. Internal-only. |
| Popover   | Extension  | ✅ **PROCESS LOCKED** | 2025-12-26  | Overlay component. Pipeline 18A Second Pass complete (Steps 0-12). Overlay size restriction compliance achieved (3 sizes: sm, md, lg). Internal-only. |
| HoverCard | Extension  | ✅ **PROCESS LOCKED** | 2025-12-27  | Menu component. Pipeline 18A Complete (Steps 0-12). Hover-triggered overlay card with delay support. Delegates styling to PopoverContent. Public API. |
| NextLinkAdapter | Extension  | ✅ **PROCESS LOCKED** | 2025-12-25  | Framework adapter component. Pipeline 18A re-executed (Steps 0-12 complete, full execution). PROCESS_LOCK re-confirmed. Extension-only (not exported from main library). |
| Portal | Composition | ✅ **PROCESS LOCKED** | 2025-12-27 | SSR-safe portal utility component. Pipeline 18A complete (Steps 0-12). Utility component (no visual tokens, no size/variant props), SSR-safe mounting pattern, wrapper div necessary for ref forwarding. |
| Dialog | Composition | ✅ **PROCESS LOCKED** | 2025-12-27 | Semantic wrapper over Modal (Foundation). Pipeline 18A complete (Steps 0-12). Provides Dialog.Header, Dialog.Title, Dialog.Description, Dialog.Body, Dialog.Footer subcomponents. Automatic aria-labelledby and aria-describedby management. |
| Toast | Composition | ✅ **PROCESS LOCKED** | 2025-12-25 | Notification overlay component. Pipeline 18A complete (Steps 0-12). Radix-based with token-driven styling. |
| ContextMenu | Composition | ✅ **PROCESS LOCKED** | 2025-12-25 | Right-click context menu overlay. Pipeline 18A complete (Steps 0-12). Radix-based with token-driven styling, full keyboard navigation and ARIA support. |

**Extension Layer Components Status:** ✅ **ACTIVE**  
**Implementation Date:** 2025-12-15  
**Reference:** [Text / Typography Implementation](./locks/TEXT_LOCK.md)

---

## 🎯 Success Criteria

The architecture lock is successful when:

- ✅ Architecture Lock document exists and is explicit
- ✅ Foundation components are listed and immutable
- ✅ Rules are clear enough to prevent future ambiguity
- ✅ Architecture phase is formally closed
- ✅ README.md references Architecture Lock document
- ✅ Storybook structure reflects architecture lock
- ✅ No duplicate foundation components exist
- ✅ All extensions follow naming and location rules

---

## 🚨 Failure Conditions

The architecture lock fails if:

- ❌ Ambiguous rules that allow interpretation
- ❌ Missing foundation components in documentation
- ❌ Room for interpretation on duplicates
- ❌ Architecture not explicitly marked as locked
- ❌ Foundation components not properly documented
- ❌ Extension rules not clearly defined

---

## 🔒 Token System Lock Status

**Status:** ✅ **LOCKED**  
**Lock Date:** 2025-12-13  
**Reference:** [Token System Documentation](./TOKEN_AUTHORITY.md)  
**Final Audit:** [Token Domains Final Report](../../../docs_archive/reports/archive/archive/reports/other/TUI_TOKEN_DOMAINS_FINAL_REPORT.md) - **FINAL VERDICT: OK** (Note: File may be in docs_archive)

The **Token System** is **LOCKED** and **IMMUTABLE** as part of the Foundation architecture. All token domains, ownership rules, and semantic classifications are frozen.

### What Is Locked in Token System

1. **All Token Domains** - No token domains may be added, removed, merged, or split
2. **Domain Ownership Rules** - Component → token domain mappings are immutable
3. **Shared vs Component-Specific Separation** - The distinction is fixed
4. **Token Naming Conventions** - All naming patterns are locked
5. **Duplication Rules** - Semantic over DRY principle is immutable

### Token System Unlock Procedure

Any token system modifications require:
1. Explicit unlock task with justification
2. Full audit of all token domains
3. Explicit approval for changes
4. Re-verification after changes
5. Re-lock with updated documentation

**Note:** Token system lock applies to **BOTH humans and AI agents**. Any request to modify locked token aspects **MUST** be refused with reference to the token lock.

---

## 📖 Related Documents

- **[Final Foundation Lock](./FOUNDATION_LOCK.md)** - 🔒 **Authoritative Foundation lock document** (single source of truth)
- **[Token System](./TOKEN_AUTHORITY.md)** - 🔒 **LOCKED** Token system documentation
- **[UI Architecture Rules](./ARCHITECTURE_RULES.md)** - Radix UI and Token Union rules
- **Component Guidelines** — Component development guidelines (archived; file no longer available)
- **[Cursor UI Rules](./ASSISTANT_DEVELOPMENT_RULES.md)** - Cursor AI development rules
- **Token Domains Final Report** — Final token domain verification (FINAL VERDICT: OK) (archived; file no longer available)

---

## 🔄 Version History

- **v1.12** (2025-12-28): Gradient Tokens Fixes
  - Fixed `GRADIENT_TOKENS.ring.subtle` token: replaced `--muted` (background color) with `--muted-foreground` (text color) for proper visibility
  - Updated Storybook demo for `glass.light` and `glass.dark`: added dark background (`from-gray-900 via-gray-800 to-gray-900`) for better visibility in Storybook gallery
  - Token fix ensures `ring.subtle` gradient is visible on light backgrounds
  - Storybook demo improvements ensure glass gradients are properly demonstrated

- **v1.11** (2025-12-26): NavText Pipeline 18A Complete
  - NavText Pipeline 18A completed (Steps 0-12)
  - Component type: Extension Navigation Primitive - Navigation Text
  - No CVA structure (correct - component has no size/variant props per Decision Matrix)
  - Token compliance: All styling via NAVIGATION_TOKENS.states.default.text
  - Non-interactive navigation text primitive (not focusable, no role overrides)
  - Stateless component (only passes through aria-current attribute)
  - Supports asChild pattern via Radix Slot for composition
  - Type system: Explicit types, no CVA-derived types
  - Size: No size prop (text primitive, correct)
  - Variant: No variant prop (text primitive, correct)
  - Token domain: NAVIGATION_TOKENS (shared navigation token domain, correct)
  - Accessibility: Semantic HTML, ARIA attributes (aria-current="page" pass-through)
  - Audit Report: `docs/reports/audit/NAVTEXT_BASELINE_REPORT.md`
  - Lock Date: 2025-12-26

- **v1.6** (2025-12-26): Input Primitive Refactor Complete
  - Input refactored to strict low-level form control primitive per architectural canon
  - Removed variant, state, iconLeft, iconRight, fullWidth props
  - Simplified API to size + invalid props only
  - Size-only CVA (removed variant/state/fullWidth variants)
  - Exception declared per TUNG_LOCKED_COMPONENT_CHANGE_GUARD policy
  - Pipeline 18A Refactor Cycle 2 completed (Steps 0-12)
  - Lock Date: 2025-12-26
  - Audit Report: `docs/reports/audit/INPUT_BASELINE_REPORT.md`
  - Intentional limitation documented: Input does not handle validation, errors, labels, helper text, or form logic

- **v1.8** (2025-12-25): Radio Foundation Lock Applied
  - Added Radio to Foundation Layer (Confirmed Foundation LOCKED)
  - Radio status: LOCKED (Foundation primitive lock)
  - Pipeline 18A completed (Steps 0-12)
  - Lock Date: 2025-12-25
  - Audit Report: `docs/reports/audit/RADIO_BASELINE_REPORT.md`
  - Architectural decisions:
    - CVA migration: cva → tokenCVA (Decision Matrix RULE 1 compliance)
    - CVA normalization: Added satisfies Record<Type, string> constraints for all variant axes (variant, size, state)
    - Exported explicit union types: RadioVariant, RadioSize, RadioState
    - Variant set: Standard semantic variants (primary, secondary, outline, ghost, destructive)
    - Size scale: Interactive size scale (xs, sm, md, lg, xl) - button role pattern
    - A11Y model: button role="radio" pattern with roving tabindex in groups
    - Keyboard navigation: Space (select), Arrow keys (group navigation with wrapping)
    - RadioGroup: Correct radiogroup pattern with orientation support (vertical/horizontal)
    - Token compliance: All styling token-driven (RADIO_TOKENS)
  - Quality: High (52 tests passed, canonical stories: Matrix + States + SizesGallery)
  - Accessibility: WCAG 2.1 Level AA compliant, comprehensive keyboard navigation
  - Completed per Pipeline 18A

- **v1.10** (2025-12-26): Navigation Primitives Pipeline 18A Complete
  - Navigation Primitives (NavList, NavItem) Pipeline 18A completed (Steps 0-12)
  - NavSeparator duplication removed from Navigation.tsx, aligned with NavText pattern
  - Multiple primitives in one file is intentional design (grouped primitives)
  - Stateless semantic primitives pattern (no state, no interaction logic)
  - No size/variant props (correct for structural primitives)
  - Token compliance: All styling via NAVIGATION_TOKENS
  - Type system: Explicit types, no CVA-derived types
  - Component type: Extension Navigation Primitive (structural building blocks)
  - Size: No size prop (structural primitives, correct)
  - Variant: No variant prop (structural primitives, correct)
  - Token domain: NAVIGATION_TOKENS (shared navigation token domain, correct)
  - Accessibility: Semantic HTML, ARIA attributes (aria-label, aria-current, aria-hidden)
  - Audit Report: `docs/reports/audit/NAVIGATION_BASELINE_REPORT.md`
  - Lock Date: 2025-12-26

- **v1.9** (2025-12-26): Pagination Navigation Component Pipeline 18A Complete
  - Added Pagination to Extension Layer (navigation)
  - Pagination status: LOCKED (Extension component)
  - Pipeline 18A completed (Steps 0-12)
  - Completion Date: 2025-12-26
  - Audit Report: `docs/reports/audit/PAGINATION_BASELINE_REPORT.md`
  - Architectural decisions:
    - Component type: Extension Navigation Component (compound component pattern)
    - Compound component structure: Root, Item, Prev, Next, Ellipsis
    - Size: Fixed md size (no size prop, correct for navigation component)
    - Variant: No variant prop (fixed styling via NAVIGATION_TOKENS, correct)
    - Token domain: NAVIGATION_TOKENS (shared navigation token domain, correct)
    - Border styling: border-input usage (standard Tailwind utility class mapped to CSS variable --input, follows BUTTON_TOKENS/LINK_TOKENS pattern, acceptable)
    - Code quality: Extracted duplicate styling (PaginationPrev/PaginationNext → paginationNavButtonStyles)
    - Token compliance: All styling token-driven (NAVIGATION_TOKENS, ICON_TOKENS, MOTION_TOKENS)
    - CVA: Not required (no variant/size props, Decision Matrix RULE 2, current inline token approach acceptable)
    - Smart page range: getVisiblePages utility function with ellipsis logic
    - Accessibility: WCAG 2.1 Level AA compliant, ARIA attributes correct, keyboard navigation working
  - Quality: High (comprehensive unit tests + a11y tests, Storybook stories demonstrate usage patterns)
  - Completed per Pipeline 18A

- **v1.8** (2025-12-26): TAS (Tenerife Animation System) Extension Utility Pipeline 18A Complete
  - Added TAS to Extension Utility Systems
  - TAS status: PROCESS LOCKED (Extension Utility System)
  - Pipeline 18A completed (Steps 0-12)
  - Completion Date: 2025-12-26
  - Audit Report: `docs/reports/audit/TAS_BASELINE_REPORT.md`
  - Architectural decisions:
    - System type: Extension Utility System (not a React component)
    - Purpose: Token-driven CSS animation utilities and presets with reduced motion support
    - Code quality: Extracted common preset pattern helper (eliminated 20+ duplicate patterns)
    - Token compliance: All motion values from Motion Authority tokens (CSS classes mapped to tm-motion-* utilities)
    - Accessibility: Full reduced motion support, SSR-safe implementation
    - Test coverage: Comprehensive test suite added (tas.test.ts, presets.test.ts, utils.test.ts, useInView.test.tsx)
    - Storybook: Comprehensive stories exist and demonstrate all features
  - Quality: High (comprehensive tests, stories, Motion Authority compliance)
  - Completed per Pipeline 18A

- **v1.7** (2025-12-25): Toast Composition Component Pipeline 18A Complete
  - Added Toast to Composition Layer (overlays)
  - Toast status: PROCESS LOCKED (Composition component)
  - Pipeline 18A completed (Steps 0-12)
  - Completion Date: 2025-12-25
  - Audit Report: `docs/reports/audit/TOAST_BASELINE_REPORT.md`
  - Architectural decisions:
    - CVA migration: cva → tokenCVA (Decision Matrix RULE 1 compliance)
    - Variant set: Custom Toast-specific semantic variants (default, success, info, warning, danger)
    - No public size prop (fixed size, notification component)
    - Radix delegation: All behavior (swipe, auto-dismiss, focus, keyboard, a11y) handled by Radix
    - Token compliance: All styling token-driven (TOAST_TOKENS)
  - Quality: High (25 tests, canonical stories: States + LongContent)
  - Completed per Pipeline 18A

- **v1.6** (2025-12-25, updated 2025-12-27): Field Composition Primitive Pipeline 18A Complete
  - Added Field to Composition Layer (not Foundation)
  - Field status: COMPOSITION READY (Composition primitive)
  - Pipeline 18A completed (Steps 0-12): First Pass 2025-12-25, Second Pass 2025-12-26, Third Pass 2025-12-27
  - Third Pass: All steps validated, no changes required, fully compliant
  - Completion Date: 2025-12-27 (Third Pass)
  - Audit Report: `docs/reports/audit/FIELD_BASELINE_REPORT.md`
  - Architectural decisions:
    - Classification: Composition primitive (not Foundation)
    - Layer: COMPOSITION/PRIMITIVES (structural layout component)
    - A11Y model: Manual association pattern (htmlFor + id + ARIA attributes)
    - Spacing: Fixed spacing="sm" (delegated to Stack)
    - FieldError color: Wrapper span pattern (respects Foundation Enforcement)
    - No auto-generated IDs (explicit, flexible, standard HTML pattern)
  - Quality: High (31 tests passing, 11 stories, comprehensive documentation)
  - Completed per Pipeline 18A Third Pass

- **v1.5** (2025-12-25): Icon Foundation Lock Applied
  - Added Icon to Foundation Layer
  - Icon status: LOCKED (Foundation primitive lock)
  - Pipeline 18A completed (Steps 0-11)
  - Lock Date: 2025-12-25
  - Audit Report: `docs/reports/audit/ICON_BASELINE_REPORT.md`
  - Architectural decisions:
    - CVA type: tokenCVA (token-driven axes: size, color, stroke)
    - Size scale: visual size scale (sm, md, lg, xl) distinct from interactive scale
    - A11Y model: delegates A11Y to parent components (non-opinionated)
    - Semantic role: semi-interactive primitive (visual only, no interactivity)
  - Completed per Pipeline 18A task

- **v1.5** (2025-12-25): NextLinkAdapter Pipeline 18A Re-execution & PROCESS_LOCK Re-confirmation
  - NextLinkAdapter Pipeline 18A re-executed (Steps 0-12, full execution including STEP 9)
  - PROCESS_LOCK re-confirmed after comprehensive pipeline review
  - Added 3 canonical Storybook stories (Matrix, States, SizesGallery) for VARIANTS_SIZE_CANON compliance
  - No component code changes required (already architecturally compliant)
  - Architectural decision: Delegation model for accessibility and styling is canonical for adapter components
  - Audit report: `docs/reports/audit/NEXTLINKADAPTER_BASELINE_REPORT.md`
  - Lock re-confirmed: 2025-12-25

- **v1.4** (2025-12-25): Link Foundation Lock Applied
  - Added Link to Foundation Layer table and Public Components Index
  - Link status: LOCKED (Foundation primitive lock)
  - Pipeline 18A completed (Steps 0-12)
  - Lock Date: 2025-12-25
  - Audit Report: `docs/reports/audit/LINK_BASELINE_REPORT.md`
  - Completed per TUNG_FOUNDATION_LINK_UNLOCK_18A task

- **v1.7** (2025-12-27): Portal Component Pipeline 18A Complete
  - Added Portal to Extension Layer (overlays)
  - Portal status: PROCESS LOCKED (Extension component lock)
  - Pipeline 18A completed (Steps 0-12)
  - Completion Date: 2025-12-27
  - Audit Report: `docs/reports/audit/PORTAL_BASELINE_REPORT.md`
  - Architectural decisions:
    - Component type: Utility component (SSR-safe portal rendering)
    - No visual tokens (utility component doesn't need tokens)
    - No size/variant props (correct for utility component)
    - Wrapper div necessary for ref forwarding (asChild pattern not needed)
    - className/style props acceptable for COMPOSITION layer
    - No CVA structure (Decision Matrix RULE 2 - no token-driven axes)
    - SSR-safe mounting pattern (mounted state + window check)
  - Quality: High (comprehensive test suite created, stories compliant)
  - Completed per Pipeline 18A

- **v1.3** (2025-12-23): NextLinkAdapter PROCESS_LOCK Applied (Initial)
  - Added NextLinkAdapter to Locked Public Components Index
  - NextLinkAdapter status: PROCESS_LOCK (Extension component lock)
  - Pipeline 18A completed (Steps 0-12, STEP 9 skipped)
  - Lock Date: 2025-12-23
  - Completed per TUI_NEXTLINKADAPTER_STEP_12 task

- **v1.2** (2025-12-16): Foundation Closure Status Update
  - Updated document to reflect Foundation CLOSED status (2025-12-16)
  - Added Foundation Authorities status (all LOCKED and IMMUTABLE)
  - Updated Foundation Layer section with Foundation CLOSED status
  - Added reference to FOUNDATION_LOCK.md as source of truth
  - Clarified that Foundation architecture phase is officially closed
  - Updated current development phase to Enforcement and Extension layers

- **v1.1** (2025-12-13): Token System Lock Integration
  - Added Token System Lock Status section
  - Documented token system immutability as part of Foundation architecture
  - Updated Token Rule section with lock information
  - Added token system modifications to Forbidden Actions
  - Updated Guard Prompt to include token system lock enforcement
  - Added token system unlock procedure documentation
  - Updated related documents section with token system references

- **v1.0** (2025-12-12): Initial Architecture Lock
  - Locked foundation components (Modal, Tabs, Select, ContextMenu, Toast)
  - Defined extension layer rules
  - Established naming conventions
  - Created Storybook structure rules
  - Defined Cursor AI rules

---

## 📝 Final Note

**After this lock, the UI foundation architecture is considered complete and immutable.**

All future work must occur in the **extension layer**. Foundation components are **read-only** except for bug fixes. The **Token system is locked** and immutable - all token modifications require explicit unlock procedure with full audit.

New functionality must be built as **extensions** that compose foundation components and use existing locked tokens.

**This is a binding architectural contract. Violations are considered architectural breaches.**

**The Foundation architecture phase is closed. The Token system is locked.**

---

**Status:** ✅ **LOCKED** (Foundation CLOSED)  
**Version:** 1.12  
**Date Created:** 2025-12-12  
**Last Updated:** 2025-12-28  
**Priority:** CRITICAL  
**Next Review:** Never (foundation is immutable)
