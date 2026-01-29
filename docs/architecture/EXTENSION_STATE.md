# TUI Extension Layer - Canonical State

**Date:** 2025-12-27  
**Last Updated:** 2026-01-17  
**Status:** CANONICAL - SINGLE SOURCE OF TRUTH  
**Authority:** This document overrides all other sources including file existence, Storybook stories, historical usage, and documentation.

**Related Authority:** [Extension Authority Contract](./EXTENSION_AUTHORITY.md) - Defines Extension layer boundaries and rules

---

## Authority & Scope

This document is the **single source of truth** for what UI components are allowed, restricted, or locked in the `@tenerife.music/ui` Extension Layer.

**Important:** Extension components **MUST** comply with the [Extension Authority Contract](./EXTENSION_AUTHORITY.md). Extension **CANNOT** modify, override, bypass, or duplicate Foundation functionality. Foundation Authorities are **CLOSED** and **IMMUTABLE**.

### Authority Rules

1. **This document overrides:**
   - File existence in the repository
   - Storybook story files
   - Historical usage patterns
   - Other documentation
   - Package.json exports (if inconsistent)

2. **If a component is not listed in this document:**
   - It is **NOT ALLOWED** for use
   - It must **NOT** be imported
   - It must **NOT** be referenced in code

3. **File existence ≠ permission to use:**
   - A component file may exist in the repository
   - If it is not listed in the ALLOWED sections, it is **RESTRICTED**
   - If it is listed in RESTRICTED, it is **FORBIDDEN**

4. **Export status is necessary but NOT sufficient:**
   - Export via `src/index.ts` is a prerequisite but does NOT grant permission
   - Permission is granted ONLY by explicit listing in this document's ALLOWED sections
   - Components exported but not listed in ALLOWED sections are RESTRICTED
   - Foundation components are LOCKED regardless of export status

### Scope

This document defines the canonical state of:
- **Foundation Layer (LOCKED)**: Immutable core components
- **Extension Layer (ALLOWED)**: Components available for use
- **Extension Compositions**: Higher-level component compositions
- **Restricted Components**: Components that exist but must not be used

---

## Foundation Layer (CLOSED - Finalized)

**Status:** ? **FOUNDATION CLOSED (Finalized)**  
**Finalization Date:** 2026-01-02  
**Source of Truth:** [FOUNDATION_LOCK.md](./FOUNDATION_LOCK.md)

The following components form the foundation of the UI system. Foundation layer is **CLOSED** and finalized.

**Foundation Authorities remain LOCKED:** All Foundation Authority Contracts (Interaction, State, Layout, Token, Spacing, Radius, Typography, Motion, Elevation) remain **LOCKED** and **IMMUTABLE**. **Foundation Enforcement** (className/style exclusion) is **LOCKED / APPLIED**. Extension components **MUST** comply with all Foundation Authority rules and **CANNOT** modify or override Foundation functionality.

**Foundation Change Rules:**
- ? Changes require explicit unlock approval and audit
- ? Documentation updates are allowed when they do not alter behavior
- ? Type safety improvements are allowed only with unlock approval
- ? New Foundation components without unlock
- ? Breaking API changes without unlock`r`n`r`n### Locked Components

1. **Modal** - `src/COMPOSITION/overlays/Modal/Modal.tsx`
   - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
   - **Lock Date:** 2025-12-25
   - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
   - **Audit Report:** `docs/reports/audit/MODAL_BASELINE_REPORT.md`
   - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
   - **Migration Complete:** Modal has completed canonical Foundation Step Pipeline (Steps 0–12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements
   - **Key Changes:** CVA migrated (cva → tokenCVA), size restriction compliance (removed xl and fullscreen, sm | md | lg only), explicit union type exported (ModalSize), type constraints added (satisfies Record<ModalSize, string>)
   - **Rule:** Future structural modifications require re-entry into Pipeline 18A
   - **Exports:** `Modal`, `ModalClose`, `ModalContent`, `ModalDescription`, `ModalFooter`, `ModalHeader`, `ModalOverlay`, `ModalRoot`, `ModalTitle`, `ModalTrigger`, `ModalSize`
   - **Types:** `ModalCloseProps`, `ModalContentProps`, `ModalDescriptionProps`, `ModalFooterProps`, `ModalHeaderProps`, `ModalOverlayProps`, `ModalRootProps`, `ModalSize`, `ModalTitleProps`, `ModalTriggerProps`

2. **Tabs** - `src/COMPOSITION/navigation/tabs/Tabs.tsx`
   - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, Third Pass Complete)
   - **Lock Date:** 2025-12-25 (First Pass), 2025-12-25 (Second Pass), 2025-12-27 (Third Pass)
   - **Pipeline:** Pipeline 18A (Steps 0-12 complete, Third Pass 2025-12-27)
   - **Audit Report:** `docs/reports/audit/TABS_BASELINE_REPORT.md`
   - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
   - **Migration Complete:** Tabs has completed canonical Foundation Step Pipeline (Steps 0–12) three times and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements. Third pass completed 2025-12-27 with all compliance verified, no issues found.
   - **Rule:** Future structural modifications require re-entry into Pipeline 18A
   - **Exports:** `Tabs`, `TabsRoot`, `TabsList`, `TabsTrigger`, `TabsContent`
   - **Types:** `TabsContentProps`, `TabsListProps`, `TabsRootProps`, `TabsTriggerProps`

3. **Select** - `src/COMPOSITION/controls/Select/Select.tsx`
   - **Status:** ✅ **LOCKED** (Pipeline 18A Complete)
   - **Lock Date:** 2025-12-25
   - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
   - **Audit Report:** `docs/reports/audit/SELECT_BASELINE_REPORT.md`
   - **Lock Type:** FOUNDATION LOCK
   - **Migration Complete:** Select has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
   - **Key Changes:** CVA migrated (cva → tokenCVA), type constraints added (satisfies Record<Type, string>), canonical stories added (Matrix, States, SizesGallery), default size resolution helper extracted
   - **Rule:** Future structural modifications require re-entry into Pipeline 18A
   - **Exports:** `Select`, `SelectContent`, `SelectGroup`, `SelectIcon`, `SelectItem`, `SelectItemIndicator`, `SelectItemText`, `SelectLabel`, `SelectRoot`, `SelectSeparator`, `SelectTrigger`, `SelectValue`, `SelectViewport`

3.1. **MultiSelect** - `src/COMPOSITION/controls/MultiSelect/MultiSelect.tsx`
   - **Status:** ✅ **ALLOWED** (Component Creation Pipeline C0-C10 Complete)
   - **Creation Date:** 2025-12-28
   - **Pipeline:** Component Creation Pipeline (Steps C0-C10 complete)
   - **Creation Report:** `docs/reports/creation/MultiSelect_CREATION_REPORT.md`
   - **Component Type:** Extension Layer Composite Control - Multi-selection dropdown
   - **Purpose:** Multi-selection dropdown control with tag-based selection visualization. Composes Foundation Select and Checkbox with multiple value management and removable tags.
   - **Foundation Composition:** Uses SelectRoot, SelectContent, SelectViewport from Foundation Select; Uses Checkbox from Foundation Primitives
   - **Sizes:** sm, md, lg (canonical interactive size scale)
   - **Token Compliance:** ✅ 100% (INPUT_TOKENS, SELECT_TOKENS, CHECKBOX_TOKENS, CHIP_TOKENS, MOTION_TOKENS, POPOVER_TOKENS)
   - **CVA Structure:** tokenCVA (multiSelectTriggerVariants)
   - **Accessibility:** aria-label/aria-labelledby, aria-multiselectable, aria-checked on items, keyboard navigation
   - **Test Coverage:** Comprehensive (MultiSelect.test.tsx - behavior, edge cases, A11Y, focus, keyboard)
   - **Storybook Coverage:** Compliant (Default, SizesGallery, States, LongContent, 5 use case stories)
   - **Motion Compliance:** ✅ (MOTION_TOKENS.transitionPreset.colors, reduced motion supported)
   - **Exports:** `MultiSelect`, `MultiSelectProps`, `MultiSelectOption`, `MultiSelectSize`

4. **ContextMenu** - `src/COMPOSITION/overlays/ContextMenu/ContextMenu.tsx`
   - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
   - **Lock Date:** 2025-12-25
   - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
   - **Audit Report:** `docs/reports/audit/CONTEXTMENU_BASELINE_REPORT.md`
   - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
   - **Migration Complete:** ContextMenu has completed canonical Foundation Step Pipeline (Steps 0–12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
   - **Key Decisions:**
     - CVA migrated from `cva` to `tokenCVA` (Decision Matrix RULE 1)
     - Tone variants: neutral, primary, destructive (overlay-specific semantics)
     - Size scale: sm, md, lg (overlay restriction compliant)
     - Size inheritance pattern via Context (DX improvement)
     - Radix delegation for all behavior (right-click, keyboard, focus, a11y)
   - **Rule:** Future structural modifications require re-entry into Pipeline 18A
   - **Exports:** `ContextMenu`, `ContextMenuCheckboxItem`, `ContextMenuContent`, `ContextMenuItem`, `ContextMenuLabel`, `ContextMenuRadioGroup`, `ContextMenuRadioItem`, `ContextMenuRoot`, `ContextMenuSeparator`, `ContextMenuSub`, `ContextMenuSubContent`, `ContextMenuSubTrigger`, `ContextMenuTrigger`
   - **Types:** `ContextMenuCheckboxItemProps`, `ContextMenuContentProps`, `ContextMenuItemProps`, `ContextMenuLabelProps`, `ContextMenuRadioGroupProps`, `ContextMenuRadioItemProps`, `ContextMenuRootProps`, `ContextMenuSeparatorProps`, `ContextMenuSubContentProps`, `ContextMenuSubProps`, `ContextMenuSubTriggerProps`, `ContextMenuTriggerProps`

5. **Toast** - `src/COMPOSITION/overlays/Toast.tsx`
   - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
   - **Lock Date:** 2025-12-25
   - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
   - **Audit Report:** `docs/reports/audit/TOAST_BASELINE_REPORT.md`
   - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
   - **Migration Complete:** Toast has completed canonical Foundation Step Pipeline (Steps 0–12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
   - **Key Decisions:**
     - CVA migrated from `cva` to `tokenCVA` (Decision Matrix RULE 1)
     - Explicit union type exported (`ToastVariant`), no CVA type leakage
     - Type constraints applied (`satisfies Record<ToastVariant, string>`)
     - Custom semantic variants: default, success, info, warning, danger (justified for notification component)
     - No public size prop (fixed size appropriate for notification overlay)
     - Radix delegation for all behavior (swipe, auto-dismiss, focus, keyboard, a11y)
     - Token compliance: All styling via TOAST_TOKENS
   - **Rule:** Future structural modifications require re-entry into Pipeline 18A
   - **Exports:** `Toast`, `ToastAction`, `ToastClose`, `ToastDescription`, `ToastRoot`, `ToastTitle`, `toastVariants`
   - **Types:** `ToastActionData`, `ToastData`, `ToastProps`, `ToastRootProps`, `ToastVariant`

6. **Button** - `src/PRIMITIVES/Button/Button.tsx`
   - **Status:** ✅ **FINAL LOCK** ( )
   - **Rule:** DO NOT modify, extend, or create alternatives
   - **Lock Report:** `docs/reports/BUTTON_FOUNDATION_LOCK_REPORT.md`
   - **Purpose:** Sole action trigger foundation. All user-initiated actions (submit, confirm, execute, activate) must use this component. Button represents actions, not navigation (use Link component) or toggle/state switching (use Switch/Checkbox components).
   - **Reference Role:** Button serves as canonical Foundation reference implementation for token-driven CVA patterns, Authority Contract compliance, and browser-native interaction mechanisms.
   - **Exports:** `Button`, `ButtonProps`, `ButtonVariant`, `ButtonSize`
   - **Scope:** Public API, tokens (BUTTON_TOKENS), behavior (action trigger via `<button>`), states (base, hover, active, focus-visible, disabled), variants (primary, secondary, accent, outline, ghost, destructive), sizes (sm, md, lg, icon)
   - **Allowed Changes:** Bug fixes, type improvements, documentation updates, accessibility fixes (within existing contract)
   - **Forbidden Changes:** Public API changes, new variants/sizes, behavior changes, token modifications (requires unlock procedure)

7. **Link** - `src/PRIMITIVES/Link/Link.tsx`
   - **Status:** ✅ **LOCKED** (2025-12-25)
   - **Lock Date:** 2025-12-25
   - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
   - **Audit Report:** `docs/reports/audit/LINK_BASELINE_REPORT.md`
   - **Lock Type:** FOUNDATION LOCK
   - **Migration Complete:** Link has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
   - **Rule:** Future structural modifications require re-entry into Pipeline 18A
   - **Lock Report:** `docs/reports/LINK_FOUNDATION_LOCK_REPORT.md` (legacy process, superseded by audit report)
   - **Exports:** `Link`, `LinkProps`, `LinkSize`, `LinkVariant`, `linkVariants`

### Foundation Layer Rules (Closed)

**ALLOWED (only with explicit unlock approval):**
- ? Bug fixes that preserve public API
- ? Type safety improvements
- ? Documentation updates tied to Foundation components

**FORBIDDEN without unlock:**
- ? New Foundation components
- ? Breaking API changes
- ? New token domains or authority changes

**MUST:**
- ? Comply with all Foundation Authority Contracts (Interaction, State, Layout, Token, Spacing, Radius, Typography, Motion, Elevation)
---

## Extension Layer - Canonical Components (ALLOWED)

The following components are **ALLOWED** for use. They are exported via `src/index.ts` and form the Extension Layer.

**Note:** Some Extension components may be **LOCKED** after completing their audit and locking procedures. Locked Extension components are immutable and cannot be modified without explicit unlock approval.

### Visual Components

1. **Alert** - `src/PRIMITIVES/Alert/Alert.tsx`
   - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
   - **Lock Date:** 2025-12-26
   - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
   - **Audit Report:** `docs/reports/audit/ALERT_BASELINE_REPORT.md`
   - **Lock Type:** PROCESS_LOCK (Component is in PRIMITIVES layer, not Foundation lock)
   - **Migration Complete:** Alert has completed canonical Foundation Step Pipeline (Steps 0–12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements
   - **Key Changes:** CVA migrated (cva → tokenCVA), legacy variants removed (success, warning, danger, info), explicit union type exported (AlertVariant), type constraints added (satisfies Record<AlertVariant, string>), token structure updated
   - **Rule:** Future structural modifications require re-entry into Pipeline 18A
   - **Exports:** `Alert`, `AlertProps`, `AlertVariant`, `alertVariants`, `ALERT_VARIANTS`

3. **Link** - `src/PRIMITIVES/Link/Link.tsx`
   - Exports: `Link`, `LinkProps`, `linkVariants`

4. **Badge** - `src/PRIMITIVES/Badge/Badge.tsx`
   - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
   - **Lock Date:** 2025-12-25
   - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
   - **Audit Report:** `docs/reports/audit/BADGE_BASELINE_REPORT.md`
   - **Lock Type:** PROCESS_LOCK (Extension component lock)
   - **Component Type:** Extension Layer Primitive - Visual Component
   - **Migration Complete:** Badge has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
   - **Rule:** Future structural modifications require re-entry into Pipeline 18A
   - **Purpose:** Visual label/tag component for displaying status indicators, categories, or metadata. Non-interactive display component.
   - **Variants:** primary, secondary, accent, outline, ghost, link, destructive (InteractiveVariant compliant)
   - **Size:** Fixed size (no size prop, correct for semi-interactive component per FOUNDATION_LOCK.md)
   - **Token Compliance:** ✅ 100% (BADGE_TOKENS)
   - **CVA Structure:** tokenCVA (Decision Matrix RULE 1 compliant)
   - **Accessibility:** Non-interactive display component, accepts optional ARIA attributes
   - **Test Coverage:** Comprehensive (Badge.test.tsx)
   - **Storybook Coverage:** Compliant (all variants demonstrated)
   - Exports: `Badge`, `BadgeProps`, `BadgeVariant`, `BADGE_VARIANTS`, `badgeVariants`

5. **Icon** - `src/components/icon/Icon.tsx`
   - Exports: `Icon`, `IconProps`, `iconVariants`

6. **Icon Components** - `src/icons/`
   - Exports: `IconArrowRight`, `IconCalendar`, `IconCheck`, `IconChevronDown`, `IconChevronRight`, `IconClose`, `IconError`, `IconInfo`, `IconLocation`, `IconMenu`, `IconSearch`, `IconSuccess`, `IconWarning`
   - Registry: `ICONS_MAP`

### Typography Components

7. **Text** - `src/components/ui/text.tsx`
   - **Status:** ✅ **LOCKED** (2025-12-15)
   - **Rule:** DO NOT modify, extend, or create alternatives
   - Exports: `Text`, `TextProps`, `TextSize`, `TextWeight`, `textVariants`

8. **Body** - `src/components/ui/body.tsx`
   - **Status:** ✅ **LOCKED** (2025-12-15)
   - **Rule:** DO NOT modify, extend, or create alternatives
   - Exports: `Body`, `BodyProps`, `bodyVariants`

9. **Caption** - `src/components/ui/caption.tsx`
   - **Status:** ✅ **LOCKED** (2025-12-15)
   - **Rule:** DO NOT modify, extend, or create alternatives
   - Exports: `Caption`, `CaptionProps`, `captionVariants`

10. **Code** - `src/components/ui/code.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Rule:** DO NOT modify, extend, or create alternatives
    - Exports: `Code`, `CodeProps`, `codeVariants`

11. **Display** - `src/components/ui/display.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Rule:** DO NOT modify, extend, or create alternatives
    - Exports: `Display`, `DisplayProps`, `displayVariants`

12. **Heading** - `src/PRIMITIVES/Heading/Heading.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-25)
    - **Lock Date:** 2025-12-25
    - **Pipeline:** Pipeline 18A (Steps 0-11 complete)
    - **Audit Report:** `docs/reports/audit/HEADING_BASELINE_REPORT.md`
    - **Lock Type:** FOUNDATION LOCK (Foundation Layer Primitive - Typography)
    - **Migration Complete:** Heading has completed canonical Foundation Step Pipeline (Steps 0-11) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Exports:** `Heading`, `HeadingProps`, `HeadingLevel`, `HeadingWeight`, `headingVariants`

13. **Lead** - `src/components/ui/lead.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Rule:** DO NOT modify, extend, or create alternatives
    - Exports: `Lead`, `LeadProps`, `leadVariants`

14. **Label** - `src/components/ui/label.tsx`
    - Exports: `Label`, `LabelProps`, `labelVariants`

### Form Components

15. **Checkbox** - `src/PRIMITIVES/Checkbox/Checkbox.tsx`
    - **Status:** ✅ **LOCKED** (Foundation Layer, Lock Date: 2025-12-25; Refactor Cycle 2 Complete, 2025-12-27)
    - **Exports:** `Checkbox`, `CheckboxProps`, `CheckboxVariant`, `CheckboxSize`, `CheckboxState`, `checkboxVariants`
    - **Audit Report:** `docs/reports/audit/CHECKBOX_BASELINE_REPORT.md`

16. **Input** - `src/PRIMITIVES/Input/Input.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-25)
    - **Lock Date:** 2025-12-25
    - **Pipeline:** Pipeline 18A (Steps 0-11 complete)
    - **Audit Report:** `docs/reports/audit/INPUT_BASELINE_REPORT.md`
    - **Lock Type:** FOUNDATION LOCK (Foundation Layer Primitive)
    - **Migration Complete:** Input has completed canonical Foundation Step Pipeline (Steps 0-11) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - Exports: `Input`, `InputProps`, `InputSize`, `InputVariant`, `inputVariants`

17. **Radio** - `src/PRIMITIVES/Radio/Radio.tsx`
    - **Status:** ✅ **FOUNDATION LOCKED** (Pipeline 18A Complete, Re-run 2025-12-27)
    - **Lock Date:** 2025-12-25
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete, Re-run complete 2025-12-27)
    - **Audit Report:** `docs/reports/audit/RADIO_BASELINE_REPORT.md`
    - **Lock Type:** FOUNDATION LOCK (Foundation Layer Primitive)
    - **Migration Complete:** Radio has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements. Re-run completed 2025-12-27 with no changes required (component already compliant).
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - Exports: `Radio`, `RadioProps`, `RadioVariant`, `RadioSize`, `RadioState`, `radioVariants`, `RadioGroup`, `RadioGroupProps`, `RadioGroupContext`, `useRadioGroupContext`

18. **Textarea** - `src/components/textarea/Textarea.tsx`
    - Exports: `Textarea`, `TextareaProps`, `textareaVariants`

19. **Switch** - `src/components/switch/Switch.tsx`
    - Exports: `Switch`, `SwitchProps`, `switchHandleStateVariants`, `switchHandleVariants`, `switchTrackVariants`

20. **Field** - `src/PRIMITIVES/Field/Field.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
    - **Lock Date:** 2026-01-01
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/FIELD_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in PRIMITIVES layer, Extension primitive)
    - **Component Type:** Composition Primitive (Form Composition)
    - **Layer:** COMPOSITION (not Foundation)
    - **Quality:** High
    - **Key Decisions:**
      - Classification: Composition primitive (not Foundation)
      - A11Y model: Manual association pattern (htmlFor + id + ARIA attributes)
      - Fixed spacing="sm" (delegated to Stack)
      - FieldError uses wrapper span for destructive color (respects Foundation Enforcement)
      - No auto-generated IDs (explicit, flexible, standard HTML pattern)
    - **Test Coverage:** 32 tests (comprehensive)
    - **Storybook Coverage:** 11 stories (all use cases demonstrated)
    - **Exports:** `Field`, `FieldProps`, `FieldControlProps`, `FieldDescriptionProps`, `FieldErrorProps`, `FieldLabelProps`

### Action Components

21. **ButtonGroup** - `src/COMPOSITION/actions/ButtonGroup/ButtonGroup.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2026-01-02)
    - **Creation Date:** 2026-01-02
    - **Refactoring Date:** 2026-01-02
    - **Pipeline:** Component Creation Pipeline (C0-C10 complete) → Pipeline 18A (STEP 0-12 complete)
    - **Baseline Report:** `docs/reports/audit/BUTTONGROUP_BASELINE_REPORT.md`
    - **Component Type:** Extension Layer Component - Action Composition
    - **Category:** actions
    - **Purpose:** Semantic and behavioral grouping of multiple Button components. Provides layout alignment (horizontal/vertical), shared prop propagation (size, variant, disabled), and accessibility semantics (role="group", aria-orientation).
    - **Key Characteristics:**
      - Composes Button (Foundation, LOCKED) and Stack (Layout primitive, LOCKED)
      - Context-based prop propagation (size, variant, disabled)
      - Token-based spacing only (Spacing Authority compliance)
      - Accessibility: role="group", aria-orientation for vertical
      - Layout Authority compliance: Uses Stack for layout composition
      - VARIANTS_SIZE_CANON compliance: GlobalSize (sm | md | lg)
    - **Composition Pattern:**
      - Uses Stack for layout (horizontal/vertical via orientation prop)
      - Provides Context for prop propagation (ready for future Button enhancement)
      - Button props override ButtonGroup props (prop precedence)
    - **Use Cases:** Action button groups, form button groups, toolbar button groups, navigation button groups
    - **API:** `orientation?: "horizontal" | "vertical"`, `size?: "sm" | "md" | "lg"`, `variant?: ButtonVariant`, `disabled?: boolean`, `spacing?: SpacingValue`, `align?: AlignmentValue`, `justify?: JustifyValue`
    - **Token Compliance:** ✅ 100% (token-based spacing only)
    - **Accessibility:** ✅ Compliant (role="group", aria-orientation, keyboard navigation delegated to Button)
    - **Test Coverage:** Comprehensive (ButtonGroup.test.tsx - rendering, orientation, spacing, accessibility, context propagation, Stack props, ref forwarding, Button integration)
    - **Storybook Coverage:** Compliant (Horizontal, Vertical, Sizes, Variants, Spacing, Disabled, Mixed stories)
    - Exports: `ButtonGroup`, `ButtonGroupProps`, `useButtonGroupContext`

22. **Avatar** - `src/COMPOSITION/controls/Avatar/Avatar.tsx`
   - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
   - **Lock Date:** 2025-12-26
   - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
   - **Audit Report:** `docs/reports/audit/AVATAR_BASELINE_REPORT.md`
   - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
   - **Migration Complete:** Avatar has completed canonical Foundation Step Pipeline (Steps 0–12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
   - **Key Changes:** CVA migrated (cva → tokenCVA), token file created (AVATAR_TOKENS), type constraints added (satisfies Record<Type, string>), SizesGallery story added
   - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Status:** ✅ **ALLOWED** (Extension Primitive)
    - **Type:** User Representation Primitive
    - **Purpose:** Displays user profile images with automatic fallback to initials or icon
    - **Radix Primitive:** `@radix-ui/react-avatar`
    - **Sizes:** `xs | sm | md | lg | xl | 2xl` (Non-interactive Size Scale)
    - **Shapes:** `circle | square` (Border radius variants)
    - **Status Indicators:** `online | offline | busy | null` (Optional status dot)
    - **Use Cases:** User profiles, comment sections, team member lists, chat interfaces, activity feeds
    - **Features:** Image loading with fallback, automatic initials extraction, status indicators, grouped avatars
    - Exports: `Avatar`, `AvatarGroup`, `AvatarProps`, `AvatarGroupProps`, `AvatarSize`, `AvatarShape`, `AvatarStatus`, `AvatarGroupSpacing`

22. **Slider** - `src/COMPOSITION/controls/Slider/Slider.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, Re-run 2025-12-27)
    - **Lock Date:** 2025-12-27 (Re-run completion)
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete, Re-run complete 2025-12-27)
    - **Audit Report:** `docs/reports/audit/SLIDER_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
    - **Migration Complete:** Slider has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements. Re-run completed 2025-12-27 with validation of current compliant state.
    - **Key Decisions:**
      - CVA migration completed (cva → tokenCVA per Decision Matrix RULE 1)
      - Token compliance achieved (SLIDER_TOKENS domain, all raw values replaced)
      - Type system normalized (explicit union types exported, type constraints applied)
      - Multi-element CVA pattern (7 separate CVAs for root, track, range, thumb, mark, markDot, markLabel)
      - Marks implementation (custom rendering, valid extension feature)
      - Radix delegation for all interaction behavior
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Type:** Interactive Control Component
    - **Purpose:** Numeric value control via draggable thumb on track
    - **Radix Primitive:** `@radix-ui/react-slider`
    - **Sizes:** `sm | md | lg` (Interactive Size Scale Authority)
    - **Variants:** `primary | secondary | outline` (InteractiveVariant subset)
    - **Use Cases:** Volume control, price filters, numeric input with visual feedback
    - Exports: `Slider`, `SliderProps`, `SliderSize`, `SliderVariant`, `SliderOrientation`, `SliderMark`

23. **RangeSlider** - `src/COMPOSITION/controls/RangeSlider/RangeSlider.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, Refactor Cycle Complete)
    - **Lock Date:** 2025-12-25
    - **Refactor Cycle:** 2025-12-27 (No changes required - Component fully compliant)
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/RANGESLIDER_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Extension component lock)
    - **Component Type:** Interactive Control Component
    - **Migration Complete:** RangeSlider has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Radix Primitive:** `@radix-ui/react-slider` (with `minStepsBetweenThumbs`)
    - **Sizes:** `sm | md | lg` (Interactive Size Scale Authority)
    - **Variants:** `primary | secondary | outline` (InteractiveVariant subset)
    - **Use Cases:** Price range filters, date range selection, min-max value input
    - Exports: `RangeSlider`, `RangeSliderProps`, `RangeSliderSize`, `RangeSliderVariant`

24. **Separator** - `src/COMPOSITION/controls/Separator/Separator.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
    - **Lock Date:** 2025-12-25
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/SEPARATOR_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Extension component lock)
    - **Component Type:** Extension Layer Primitive - Layout Support
    - **Migration Complete:** Separator has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Type:** Layout Support Primitive
    - **Purpose:** Visual separator for content sections, menus, and lists
    - **Radix Primitive:** `@radix-ui/react-separator`
    - **Orientations:** `horizontal | vertical`
    - **Colors:** `border | muted | primary | secondary | accent`
    - **Thickness:** `1 | 2` (1px or 2px, tokenized via SEPARATOR_TOKENS)
    - **Modes:** Semantic (role="separator") or Decorative (role="none")
    - **Use Cases:** Section dividers, menu separators, list item separators, content blocks, form sections
    - **Features:** Token-driven styling (tokenCVA, SEPARATOR_TOKENS), ARIA attributes, horizontal/vertical orientations, explicit union types (SeparatorColor, SeparatorThickness)
    - **Key Decisions:**
      - CVA migrated from `cva` to `tokenCVA` (Decision Matrix RULE 1)
      - Component-specific tokens created for thickness (SEPARATOR_TOKENS)
      - Explicit union types exported (SeparatorColor, SeparatorThickness)
      - Type constraints applied (satisfies Record<Type, string>)
      - VariantProps removed from public API (TYPING_STANDARD.md compliance)
    - **Date Completed:** 2025-12-25
    - Exports: `Separator`, `SeparatorProps`, `SeparatorColor`, `SeparatorThickness`, `separatorVariants`

25. **Progress** - `src/PRIMITIVES/Progress/Progress.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
    - **Lock Date:** 2025-12-25
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/PROGRESS_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Extension component lock)
    - **Component Type:** Extension Layer Primitive - Feedback
    - **Migration Complete:** Progress has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Purpose:** Visual feedback for task/process completion. Displays filled bar proportional to completion percentage. Non-interactive display component.
    - **Base Library:** Native HTML `<div>` elements (semantic HTML via ARIA)
    - **Sizes:** `sm | md | lg` (Interactive Size Scale Authority subset)
    - **Token Compliance:** ✅ 100% (PROGRESS_TOKENS)
    - **Accessibility:** ARIA attributes (role="progressbar", aria-valuenow, aria-valuemin, aria-valuemax)
    - **Use Cases:** File uploads, task completion, loading indicators, multi-step wizards
    - Exports: `Progress`, `ProgressProps`, `ProgressSize`

26. **AspectRatio** - `src/COMPOSITION/controls/AspectRatio/AspectRatio.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
    - **Lock Date:** 2025-12-25
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/ASPECTRATIO_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Extension component lock)
    - **Component Type:** Extension Layer Primitive - Layout Support
    - **Migration Complete:** AspectRatio has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Type:** Layout Support Primitive
    - **Purpose:** Container that maintains a fixed aspect ratio for its content. Pure layout utility (no visual tokens).
    - **Radix Primitive:** `@radix-ui/react-aspect-ratio`
    - **Presets:** `square | video | cinema | portrait | photo | golden`
    - **Custom Ratios:** Supports any numeric ratio (e.g., 16/9, 1.5, 0.75)
    - **Use Cases:** Responsive images, embedded videos, cards with fixed aspect ratios, thumbnail grids
    - **Features:** Pure layout utility, responsive by default, prevents layout shift
    - **Token Compliance:** ✅ N/A (pure layout utility, no visual tokens needed)
    - **Accessibility:** Minimal (child content accessibility preserved)
    - **Date Completed:** 2025-12-25
    - Exports: `AspectRatio`, `AspectRatioProps`, `AspectRatioPreset`, `ASPECT_RATIO_PRESETS`

27. **VisuallyHidden** - `src/COMPOSITION/a11y/VisuallyHidden/VisuallyHidden.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
    - **Lock Date:** 2026-01-02
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/VISUALLYHIDDEN_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Extension component lock)
    - **Component Type:** Extension Layer Utility - DX/A11y Primitive
    - **Migration Complete:** VisuallyHidden has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Purpose:** Provides accessible names for interactive elements without visual display. Hides content visually while keeping it accessible to screen readers.
    - **Implementation:** Custom CSS pattern (standard visually-hidden: position absolute, 1px size, clip-path inset)
    - **Features:** Supports Radix Slot pattern via asChild prop, ref forwarding, standard HTML attributes
    - **Token Compliance:** ✅ N/A (component intentionally non-visual, no visual tokens needed)
    - **Motion Compliance:** ✅ NO MOTION BY DESIGN (component is static, no state/spatial changes)
    - **Accessibility:** Utility for providing accessible names to other elements (icon-only buttons, form helpers)
    - **Use Cases:** Icon-only button labels, form input helper text, screen reader-only content
    - **Test Coverage:** Comprehensive (VisuallyHidden.test.tsx - behavior, ref forwarding, DOM assertions, asChild, A11Y tests)
    - **Storybook Coverage:** Compliant (Default, IconButtonLabel, FormLabelHelper stories, title structure: UI / Composition / VisuallyHidden)
    - Exports: `VisuallyHidden`, `VisuallyHiddenProps`

28. **FocusTrap** - `src/COMPOSITION/focus/FocusTrap/FocusTrap.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2026-01-02)
    - **Creation Date:** 2026-01-02
    - **Pipeline:** Component Creation Pipeline (C0-C10 complete, 2026-01-02) → Pipeline 18A (STEP 0-12 complete, 2026-01-02)
    - **Creation Report:** `docs/reports/creation/FocusTrap_CREATION_REPORT.md`
    - **Audit Report:** `docs/reports/audit/FOCUSTRAP_BASELINE_REPORT.md`
    - **Component Type:** Extension Layer Utility - Focus Management Primitive
    - **Purpose:** Reusable focus containment utility for accessibility-critical components. Traps focus within children subtree using Tab/Shift+Tab cycling.
    - **Implementation:** Programmatic focus management via useEffect, Tab/Shift+Tab event listeners, focusable elements detection
    - **Features:** Initial focus via initialFocusRef, focus restore on unmount/active=false, Escape key callback, loop mode (wrap Tab/Shift+Tab)
    - **Token Compliance:** ✅ N/A (component intentionally non-visual, no visual tokens needed)
    - **Motion Compliance:** ✅ NO MOTION BY DESIGN (programmatic focus management, no visual animations)
    - **Accessibility:** Works with screen readers through standard focus management. Component is invisible wrapper (no accessible name, no ARIA roles needed)
    - **Use Cases:** Modal overlays (must trap focus), drawer overlays (must trap focus), menu dropdowns (may trap focus), dialog overlays (must trap focus)
    - **Test Coverage:** Comprehensive (FocusTrap.test.tsx - behavior, edge cases, A11Y, focus, input)
    - **Storybook Coverage:** Compliant (Default, States, WithInitialFocus, WithEscapeHandler, WithoutLoop, ModalScenario stories)
    - Exports: `FocusTrap`, `FocusTrapProps`

29. **Chip** - `src/COMPOSITION/overlays/Chip/Chip.tsx`
    - **Status:** ✅ **CREATED** (Component Creation Pipeline C0-C10 Complete, 2025-12-28)
    - **Creation Date:** 2025-12-28
    - **Pipeline:** Component Creation Pipeline (C0-C10 complete)
    - **Creation Report:** `docs/reports/creation/CHIP_CREATION_REPORT.md`
    - **Type:** Extension Layer Component - Visual/Interactive
    - **Category:** controls (interactive control with optional modes)
    - **Purpose:** Flexible component for displaying tags, filters, and selectable options with optional interactivity
    - **Key Characteristics:**
      - Multiple interaction modes (display/clickable/removable/selectable)
      - Variant support (primary, secondary, accent, outline, ghost, destructive)
      - Radius variants (sm, md, lg, pill)
      - NO size prop (semi-interactive component per INTERACTIVE_SIZE_SCALE_AUTHORITY)
      - Keyboard navigation (Enter/Space for activate, Delete/Backspace for remove)
      - Accessibility: ARIA attributes, keyboard support, focus management
      - Motion: Hover transitions via Motion tokens, reduced motion support
      - Token-compliant: 100% token-based implementation (CHIP_TOKENS)
    - **Use Cases:** Tags with deletion, filter chips, multi-select options, clickable categories, display-only status indicators
    - Exports: `Chip`, `ChipProps`, `ChipVariant`, `ChipRadius`, `CHIP_VARIANTS`, `CHIP_RADIUS_VALUES`, `chipVariants`

### Layout Components

**Status:** ✅ **LOCKED** (2025-12-15)  
**Reference:** [Layout Lock](./locks/LAYOUT_LOCK.md)

**Layout Hierarchy:**
- **Box** → Lowest-level primitive (spacing, visual properties only)
- **Stack** → Primary layout composition primitive (vertical/horizontal flows)
  - **Column** → Semantic alias for Stack (vertical)
  - **Row** → Semantic alias for Stack (horizontal)
- **Container** → Width constraint specialization
- **Flex** → Advanced flexbox extension of Box
- **Grid** → CSS Grid extension of Box
- **Surface** → Surface elevation variant extension of Box

19. **Box** - `src/COMPOSITION/layout/Box/Box.tsx`
    - **Status:** ✅ **LOCKED** (Layout Extension Layer Lock, 2026-01-01)
    - **Lock Date:** 2026-01-01
    - **Role:** Lowest-level layout primitive - pure, generic container
    - **Responsibility:** Spacing (px/py/m/mx/my/mt/mr/mb/ml), visual properties (radius, shadow, background), element rendering (via `as` prop)
    - **Does NOT provide:** Layout composition semantics (display, flexDirection, gap, alignment)
    - **Use for:** Base container with styling only
    - **Rule:** DO NOT modify, extend, or create alternatives. All modifications require explicit unlock procedure.
    - **Exports:** `Box`, `BoxProps`
    - **Pipeline 18A:** ✅ Complete (2025-12-26) - Component validated, no changes required, fully compliant with all architectural standards
    - **Audit Reports:** `docs/reports/audit/BOX_BASELINE_REPORT.md`, `docs/reports/audit/LAYOUT_LAYER_HARD_CODE_REVIEW.md`

20. **Column** - `src/COMPOSITION/layout/Column/Column.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15, validated by Pipeline 18A 2025-12-26)
    - **Role:** Semantic alias for Stack with vertical direction
    - **Responsibility:** Provides explicit vertical layout API
    - **Implementation:** Alias for `Stack` (shares implementation)
    - **Use for:** Semantic clarity when vertical layout intent is important
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Exports:** `Column`, `ColumnProps`
    - **Pipeline 18A:** ✅ Complete (2025-12-26) - Component validated, no changes required, fully compliant with all architectural standards
    - **Audit Report:** `docs/reports/audit/COLUMN_BASELINE_REPORT.md`

21. **Container** - `src/components/layout/Container.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Role:** Specialized primitive for width constraint and horizontal padding
    - **Responsibility:** Width constraint (maxWidth), horizontal padding, centering
    - **Does NOT provide:** Layout composition behaviors (flex, grid, alignment)
    - **Use for:** Constraining content width and providing horizontal padding
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Exports:** `Container`, `ContainerProps`

22. **Flex** - `src/COMPOSITION/layout/Flex/Flex.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15, validated by Pipeline 18A 2025-12-26)
    - **Role:** Advanced flexbox container extension of Box
    - **Responsibility:** Full control over flexbox properties (direction, wrap, grow, shrink, basis, alignment, spacing)
    - **Uses:** Box internally as base container
    - **Use for:** Advanced flexbox control beyond Stack capabilities
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Exports:** `Flex`, `FlexProps`
    - **Pipeline 18A:** ✅ Complete (2025-12-26) - Component validated, no changes required, fully compliant with all architectural standards
    - **Audit Report:** `docs/reports/audit/FLEX_BASELINE_REPORT.md`

23. **Grid** - `src/COMPOSITION/layout/Grid/Grid.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15, validated by Pipeline 18A 2025-12-26)
    - **Role:** CSS Grid container extension of Box
    - **Responsibility:** Full control over grid layout properties (columns, rows, gap, flow, alignment)
    - **Uses:** Box internally as base container
    - **Use for:** Two-dimensional layouts requiring precise row/column control
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Exports:** `Grid`, `GridProps`
    - **Pipeline 18A:** ✅ Complete (2025-12-26) - Component validated, refactored (removed duplicate function, added JSDoc), fully compliant with all architectural standards
    - **Audit Report:** `docs/reports/audit/GRID_BASELINE_REPORT.md`

24. **Row** - `src/COMPOSITION/layout/Row/Row.tsx`
    - **Status:** ✅ **LOCKED** (validated by Pipeline 18A, 2025-12-26)
    - **Role:** Semantic alias for Stack with horizontal direction
    - **Responsibility:** Provides explicit horizontal layout API
    - **Implementation:** Alias for `Stack(direction="horizontal")` (shares implementation)
    - **Use for:** Semantic clarity when horizontal layout intent is important
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Exports:** `Row`, `RowProps`
    - **Pipeline 18A:** ✅ Complete (2025-12-26) - Component validated, no changes required, fully compliant with all architectural standards
    - **Audit Report:** `docs/reports/audit/ROW_BASELINE_REPORT.md`

25. **Stack** - `src/components/layout/Stack.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15)
    - **Role:** Primary layout composition primitive for vertical and horizontal flows
    - **Responsibility:** Layout composition with semantic spacing (`spacing` prop), direction control, alignment
    - **Uses:** Box internally as base container
    - **API:** `spacing` is canonical prop (preferred), `gap` is deprecated alias for backward compatibility
    - **Use for:** One-dimensional layouts (vertical or horizontal) with spacing between items
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Exports:** `Stack`, `StackProps`

26. **Surface** - `src/COMPOSITION/layout/Surface/Surface.tsx`
    - **Status:** ✅ **LOCKED** (2025-12-15, validated by Pipeline 18A 2025-12-26)
    - **Role:** Surface elevation variant component extension of Box
    - **Responsibility:** Provides surface elevation variants (default, elevated, outlined, filled, subtle) with token-based styling
    - **Uses:** Box internally as base container, tokenCVA for variant management
    - **Use for:** Semantic elevation variants
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Exports:** `Surface`, `SurfaceProps`, `SurfaceVariantType`, `surfaceVariants`
    - **Pipeline 18A:** ✅ Complete (2025-12-26) - Component refactored (CVA migration to tokenCVA, variant dictionary alignment, type system improvements), fully compliant with all architectural standards
    - **Breaking Changes:** Variant names changed (flat→default, raised→elevated, outline→outlined, sunken→filled, subtle→subtle) per VARIANTS_SIZE_CANON
    - **Audit Report:** `docs/reports/audit/SURFACE_BASELINE_REPORT.md`

27. **List** - `src/COMPOSITION/layout/List/List.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2026-01-02)
    - **Creation Date:** 2026-01-01
    - **Pipeline:** Component Creation Pipeline (C0-C10 complete), Pipeline 18A (Complete, 2026-01-02)
    - **Creation Report:** `docs/reports/creation/List_CREATION_REPORT.md`
    - **Audit Report:** `docs/reports/audit/LIST_COMPOSITION_BASELINE_REPORT.md`
    - **Type:** Extension Layer Layout Component - Structural List Container
    - **Category:** layout (list structures)
    - **Purpose:** Structural list container that composes Stack with optional Divider injection. Provides semantic ul/ol/div list structures without domain semantics.
    - **Key Characteristics:**
      - Composes Stack as base container (no duplication)
      - Reuses Divider for item separation (no duplication)
      - Polymorphic `as` prop (ul/ol/div) for semantic HTML
      - Optional divider injection between items (divided prop)
      - Divider inset and tone customization
      - Token-driven spacing via Stack composition
      - role="list" added for div elements (Chromium accessibility)
      - Motion: NO MOTION BY DESIGN (static container)
      - Token Compliance: ✅ 100% (spacing tokens via Stack, color tokens via Divider)
      - NO domain semantics (structural only)
    - **Foundation Composition:** Stack (spacing, layout), Divider (visual separation)
    - **Use Cases:** Navigation lists, menu lists, notification lists, settings lists, data lists (without domain styling)
    - Exports: `List`, `ListAs`, `ListProps`
    - Types: `ListAs` ("ul" | "ol" | "div"), `ListProps`

28. **ListItem** - `src/COMPOSITION/layout/ListItem/ListItem.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2026-01-01)
    - **Creation Date:** 2026-01-01
    - **Pipeline:** Component Creation Pipeline (C0-C10 complete), Pipeline 18A (Steps 0-12 complete)
    - **Creation Report:** `docs/reports/creation/ListItem_CREATION_REPORT.md`
    - **Audit Report:** `docs/reports/audit/LISTITEM_BASELINE_REPORT.md`
    - **Type:** Extension Layer Layout Component - Structural List Item
    - **Category:** layout (list structures)
    - **Purpose:** Structural list item wrapper with interactive/disabled states, no content styling. Provides semantic li/div elements with proper accessibility and state handling.
    - **Key Characteristics:**
      - Polymorphic `as` prop (li/div) for semantic HTML
      - Interactive variant (hover transition, focus-visible ring)
      - Disabled variant (opacity, pointer-events-none)
      - Alignment prop (start/center for flexbox alignment)
      - Token-driven motion (transition-colors for interactive variant)
      - Reduced motion support (transition-colors respects prefers-reduced-motion)
      - role="listitem" added for div elements (accessibility)
      - Motion: ADD MOTION (interactive variant uses transition-colors)
      - Token Compliance: ✅ 100% (tokenCVA variants, Tailwind utilities)
      - NO domain semantics (structural only)
    - **Foundation Composition:** None (standalone structural primitive)
    - **Use Cases:** Interactive list items, navigation items, menu items, notification items, settings items
    - Exports: `ListItem`, `listItemVariants`, `ListItemAlign`, `ListItemAs`, `ListItemProps`
    - Types: `ListItemAs` ("li" | "div"), `ListItemAlign` ("start" | "center"), `ListItemProps`
    - **Pipeline 18A:** All BLOCKERS resolved (type constraints added, explicit `ListItemAlign` type created)
    - **Key Improvements:** CVA type constraints (`satisfies Record<Type, string>`), explicit union types, code quality improvements

29. **Footer** - `src/COMPOSITION/layout/Footer/Footer.tsx`
    - **Status:** ✅ **ALLOWED** (Component Creation Pipeline C0-C10 Complete, 2025-12-30)
    - **Creation Date:** 2025-12-30
    - **Pipeline:** Component Creation Pipeline (C0-C10 complete)
    - **Creation Report:** `docs/reports/creation/Footer_CREATION_REPORT.md`
    - **Type:** Extension Layer Layout Component
    - **Category:** layout
    - **Purpose:** Page-level footer container for bottom content (copyright, links, navigation, metadata). Provides semantic `<footer>` element with flexible content slots (left, center, right).
    - **Key Characteristics:**
      - Semantic `<footer>` element (implicit role="contentinfo")
      - Flexible content slots (left, center, right) or children prop
      - Token-driven padding (px, py) and background color (bg)
      - Optional top border
      - Uses Stack internally for layout composition
      - Responsive token support
      - Motion: NO MOTION BY DESIGN (static layout container)
    - **Token Compliance:** ✅ 100% (spacing tokens, color tokens)
    - **Use Cases:** Page footers, application footers, copyright sections, navigation links, metadata display
    - Exports: `Footer`, `FooterProps`

30. **PageHeader** - `src/COMPOSITION/layout/PageHeader/PageHeader.tsx`
    - **Status:** ✅ **LOCKED** (Layout Extension Layer Lock, 2026-01-01)
    - **Creation Date:** 2026-01-01
    - **Lock Date:** 2026-01-01
    - **Pipeline:** Component Creation Pipeline (C0-C10 complete)
    - **Audit Report:** `docs/reports/audit/LAYOUT_LAYER_HARD_CODE_REVIEW.md`
    - **Type:** Extension Layer Layout Component
    - **Category:** layout
    - **Purpose:** Semantic page header component with structured slots (title, description, breadcrumbs, actions). Provides structured page header with predefined semantic slots. Uses Foundation components (Heading, Text, Breadcrumbs) for semantic content.
    - **Key Characteristics:**
      - Semantic `<header>` element (default, customizable via `as` prop)
      - Structured semantic slots (title, description, breadcrumbs, actions)
      - Uses Foundation components internally (Heading, Text, Breadcrumbs)
    - **Rule:** DO NOT modify, extend, or create alternatives. All modifications require explicit unlock procedure.

31. **ContentShell** - `src/COMPOSITION/layout/ContentShell/ContentShell.tsx`
    - **Status:** ✅ **LOCKED** (Layout Extension Layer Lock, 2026-01-01)
    - **Creation Date:** 2026-01-01
    - **Lock Date:** 2026-01-01
    - **Pipeline:** Component Creation Pipeline (C0-C10 complete)
    - **Creation Report:** `docs/reports/creation/ContentShell_CREATION_REPORT.md`
    - **Audit Report:** `docs/reports/audit/LAYOUT_LAYER_HARD_CODE_REVIEW.md`
    - **Type:** Extension Layer Layout Component
    - **Category:** layout
    - **Purpose:** Body-level layout wrapper для структурирования основного контента страницы с опциональной навигацией. Позволяет собирать экраны из ContentShell → PageHeader → Section.
    - **Key Characteristics:**
      - Semantic `<main>` element
      - Optional navigation component (nav prop)
      - Token-based contentPadding (ResponsiveSpacing)
      - Uses layout primitives internally (Container, Stack)
      - Does NOT manage document structure (html, body, head)
      - Does NOT manage global providers or settings
    - **Exports:** `ContentShell`, `ContentShellProps`
    - **API Reference:** `docs/architecture/LAYOUT_API_RESOLUTION.md` (Resolution 4: ContentShell Responsibility)
    - **Token Compliance:** ✅ 100% (ResponsiveSpacing for contentPadding)
    - **Use Cases:** Структурирование страниц приложения, объединение навигации и контента, создание консистентной структуры экранов
    - **Rule:** DO NOT modify, extend, or create alternatives. All modifications require explicit unlock procedure.

30. **Divider** - `src/COMPOSITION/layout/Divider/Divider.tsx`
    - **Status:** ✅ **LOCKED** (Layout Extension Layer Lock, 2026-01-01)
    - **Creation Date:** 2026-01-01
    - **Lock Date:** 2026-01-01
    - **Pipeline:** Component Creation Pipeline (C0-C10 complete)
    - **Creation Report:** `docs/reports/creation/Divider_CREATION_REPORT.md`
    - **Audit Report:** `docs/reports/audit/LAYOUT_LAYER_HARD_CODE_REVIEW.md`
    - **Type:** Extension Layer Layout Component
    - **Category:** layout
    - **Purpose:** Layout component for visually separating sections and content blocks. Supports horizontal and vertical orientations, tone variants, and optional inset padding.
    - **Key Characteristics:**
      - Layout component (not a control) - does NOT replace Separator
      - Horizontal and vertical orientations
      - Tone variants (border, muted, primary, secondary, accent)
      - Inset padding pattern (boolean: false/undefined → full width, true → inset padding)
      - Uses semantic `<hr>` element for horizontal divider
      - Uses `<div>` element for vertical divider
      - Decorative element (role="none", aria-hidden="true")
      - Token-driven styling (tokenCVA, DIVIDER_TOKENS)
      - Motion: NO MOTION BY DESIGN (static layout component)
    - **Token Compliance:** ✅ 100% (spacing tokens, color tokens, layout tokens)
    - **Use Cases:** Separating sections, dividing content blocks, visual content separation
    - **API:** `orientation?: "horizontal" | "vertical"`, `tone?: "border" | "muted" | "primary" | "secondary" | "accent"`, `inset?: boolean`
    - **Forbidden Props:** px, py, color, size, thickness, children
    - **Exports:** `Divider`, `dividerVariants`
    - **Types:** `DividerOrientation`, `DividerProps`, `DividerTone`
    - **Rule:** DO NOT modify, extend, or create alternatives. All modifications require explicit unlock procedure.

31. **Inset** - `src/COMPOSITION/layout/Inset/Inset.tsx`
    - **Status:** ✅ **LOCKED** (Layout Extension Layer Lock, 2026-01-01)
    - **Creation Date:** 2026-01-01
    - **Lock Date:** 2026-01-01
    - **Pipeline:** Component Creation Pipeline (C0-C10 complete)
    - **Creation Report:** `docs/reports/creation/Inset_CREATION_REPORT.md`
    - **Audit Report:** `docs/reports/audit/LAYOUT_LAYER_HARD_CODE_REVIEW.md`
    - **Type:** Extension Layer Layout Component
    - **Category:** layout
    - **Purpose:** Inset provides canonical inner spacing wrapper for any content without controlling layout direction, alignment, or gap between children. A thin layout primitive for inner spacing only.
    - **Key Characteristics:**
      - Layout primitive (not a composition component)
      - Single responsibility: inner spacing wrapper
      - Does NOT control layout direction, alignment, or gap between children
      - Does NOT duplicate Stack gap behavior
      - Does NOT duplicate Box px/py props
      - Does NOT duplicate Section vertical padding
      - Token-driven padding (ResponsiveSpacing)
      - Motion: NO MOTION BY DESIGN (pure layout wrapper, no state/spatial changes)
    - **Token Compliance:** ✅ 100% (spacing tokens only)
    - **Use Cases:** Wrapping content with inner spacing, wrapping Card/Stack components, responsive padding
    - **API:** `padding?: ResponsiveSpacing`
    - **Forbidden Props:** px, py, gap, size, align, direction, spacing
    - **Rule:** DO NOT modify, extend, or create alternatives. All modifications require explicit unlock procedure.

32. **SidebarLayout** - `src/COMPOSITION/layout/SidebarLayout/SidebarLayout.tsx`
    - **Status:** ✅ **LOCKED** (Layout Extension Layer Lock, 2026-01-01)
    - **Creation Date:** 2026-01-01
    - **Lock Date:** 2026-01-01
    - **Pipeline:** Component Creation Pipeline (C0-C10 complete)
    - **Creation Report:** `docs/reports/creation/SidebarLayout_CREATION_REPORT.md`
    - **Audit Report:** `docs/reports/audit/LAYOUT_LAYER_HARD_CODE_REVIEW.md`
    - **Type:** Extension Layer Layout Component
    - **Category:** layout
    - **Purpose:** Page-level compositional layout for pages with a sidebar and main content. Uses Grid internally for two-column layout and Stack for vertical collapse.
    - **Key Characteristics:**
      - Page-level compositional layout component
      - Two-column layout with sidebar and content
      - Sidebar rendered as `<aside>`, content as `<main>` (semantic HTML)
      - Token-based sidebar width (sm=256px, md=320px, lg=384px)
      - Token-based gap spacing (ResponsiveSpacing)
      - Optional collapse behavior (responsive breakpoint-based)
      - Sidebar position (left/right)
      - Composes Foundation components (Box, Stack)
      - Motion: NO MOTION BY DESIGN (layout collapse is structural change, not interactive transition)
    - **Token Compliance:** ✅ 100% (spacing tokens, breakpoint tokens, CSS variables)
    - **Use Cases:** Page layouts with sidebar navigation, article layouts with sidebars, responsive two-column layouts
    - **API:** `sidebar: React.ReactNode`, `children: React.ReactNode`, `sidebarPosition?: "left" | "right"`, `sidebarWidth?: "sm" | "md" | "lg"`, `gap?: ResponsiveSpacing`, `collapseAt?: "sm" | "md" | "lg" | "xl"`
    - **Forbidden Props:** px, py, padding, paddingX, paddingY, grid, columns, rows, align, justify
    - **Exports:** `SidebarLayout`, `SidebarLayoutProps`, `SidebarPosition`, `SidebarWidth`, `CollapseBreakpoint`
    - **Rule:** DO NOT modify, extend, or create alternatives. All modifications require explicit unlock procedure.

33. **StickyBar** - `src/COMPOSITION/layout/StickyBar/StickyBar.tsx`
    - **Status:** ✅ **LOCKED** (Layout Extension Layer Lock, 2026-01-01)
    - **Creation Date:** 2026-01-01
    - **Lock Date:** 2026-01-01
    - **Pipeline:** Component Creation Pipeline (C0-C10 complete)
    - **Creation Report:** `docs/reports/creation/StickyBar_CREATION_REPORT.md`
    - **Audit Report:** `docs/reports/audit/LAYOUT_LAYER_HARD_CODE_REVIEW.md`
    - **Type:** Extension Layer Layout Component
    - **Category:** layout
    - **Purpose:** StickyBar provides minimal sticky layout container for persistent actions or contextual controls without managing page layout or routing. A thin layout wrapper for CSS sticky positioning.
    - **Key Characteristics:**
      - Layout primitive (not a composition component)
      - Single responsibility: sticky layout container
      - Does NOT manage page layout or routing
      - Does NOT act as Header/Footer/Navigation replacement
      - Does NOT introduce scroll listeners or JS-driven behavior
      - Pure CSS sticky positioning (`position: sticky`)
      - Token-driven styling (background, z-index, spacing)
      - Composes Inset for internal spacing
      - Composes Divider for visual separation (optional)
      - Motion: NO MOTION BY DESIGN (pure layout wrapper, no state/spatial changes)
    - **Token Compliance:** ✅ 100% (spacing tokens, color tokens, elevation tokens)
    - **Use Cases:** Persistent action buttons, contextual controls, sticky toolbars
    - **API:** `position?: "top" | "bottom"`, `tone?: "default" | "elevated" | "muted"`, `divider?: boolean`, `children: React.ReactNode`
    - **Forbidden Props:** px, py, padding, gap, align, justify, height, offset, zIndex (raw), scroll, onScroll
    - **Exports:** `StickyBar`, `stickyBarVariants`
    - **Types:** `StickyBarPosition`, `StickyBarProps`, `StickyBarTone`
    - **Rule:** DO NOT modify, extend, or create alternatives. All modifications require explicit unlock procedure.

34. **Spacer** - `src/COMPOSITION/layout/Spacer/Spacer.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2026-01-02)
    - **Lock Date:** 2026-01-02
    - **Pipeline:** Component Creation Pipeline (C0-C10 complete), Pipeline 18A (Steps 0-12 complete)
    - **Creation Report:** `docs/reports/creation/SPACER_CREATION_REPORT.md`
    - **Audit Report:** `docs/reports/audit/SPACER_BASELINE_REPORT.md`
    - **Type:** Extension Layer Layout Component - Utility Spacing Inserter
    - **Category:** layout
    - **Purpose:** Pure utility component for inserting spacing between elements. Provides single-axis spacing (vertical or horizontal) using spacing tokens only. No layout logic beyond spacing insertion.
    - **Key Characteristics:**
      - Utility spacing inserter (not a layout composition component)
      - Single-axis spacing only (vertical or horizontal)
      - No layout logic beyond spacing insertion
      - No margin/padding props (uses width/height directly)
      - No responsive behavior (single token value)
      - No variant/state props (pure utility)
      - Decorative element (aria-hidden="true", role="none")
      - Non-interactive component
      - Token-only styling (uses getSpacingCSSVar exclusively)
      - Motion: NO MOTION BY DESIGN (no state/spatial changes)
    - **Token Compliance:** ✅ 100% (spacing tokens only, no raw values)
    - **Use Cases:** Spacing between Stack items, spacing between sections, custom spacing insertion
    - **API:** `orientation?: "horizontal" | "vertical"` (default: "vertical"), `size: SpacingToken` (required)
    - **Forbidden Props:** className, style, margin, padding, responsive props, variant props
    - **Exports:** `Spacer`, `SpacerProps`, `SpacerOrientation`
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Pipeline 18A:** All steps complete (0-12), no refactor required (component already high quality), tests and Storybook stories created

35. **Inline** - `src/COMPOSITION/layout/Inline/Inline.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2026-01-02)
    - **Lock Date:** 2026-01-02
    - **Pipeline:** Component Creation Pipeline (C0-C10 complete), Pipeline 18A (Steps 0-12 complete)
    - **Creation Report:** `docs/reports/creation/INLINE_CREATION_REPORT.md`
    - **Audit Report:** `docs/reports/audit/INLINE_BASELINE_REPORT.md`
    - **Type:** Extension Layer Layout Component - DX Enhancer
    - **Category:** layout
    - **Purpose:** DX-enhancer for inline-flex layout composition. Provides a simple, token-based API for creating inline-flex containers with semantic spacing between items.
    - **Key Characteristics:**
      - Uses `inline-flex` display (inline-level flex container)
      - Token-only spacing (no raw values)
      - No state, no interaction, no variants
      - Minimal API: `gap`, `align`, `wrap`, `asChild`
      - Supports `forwardRef` for ref forwarding
      - Does NOT use Box internally (renders div directly)
      - Does NOT accept `className` or `style` props
      - Motion: NO MOTION BY DESIGN (pure layout wrapper, no state/spatial changes)
    - **Token Compliance:** ✅ 100% (spacing tokens only, no raw values)
    - **Use Cases:** Inline content that should flow with text (badges, tags, inline buttons), inline-flex layouts where items should wrap naturally, simple horizontal inline flows with spacing
    - **API:** `gap?: ResponsiveSpacing`, `align?: "start" | "center" | "end" | "baseline"`, `wrap?: boolean`, `asChild?: boolean`
    - **Forbidden Props:** className, style
    - **Exports:** `Inline`, `InlineProps`
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Pipeline 18A:** All steps complete (0-12), component ready for production use

36. **Panel** - `src/COMPOSITION/layout/Panel/Panel.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2026-01-02)
    - **Lock Date:** 2026-01-02
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/PANEL_BASELINE_REPORT.md`
    - **Type:** Extension Layer Layout Component - Surface Container
    - **Category:** layout
    - **Purpose:** Lightweight structural surface container for grouping related content inside a page. Panel provides surface styling without interactivity, sitting semantically between Box (generic container) and Card (structured content container).
    - **Key Characteristics:**
      - Lightweight structural surface container
      - Semantic upgrade over Box (adds surface styling)
      - Non-interactive container (no onClick, no interactive states)
      - Can be nested inside Section components
      - Token-driven styling via PANEL_TOKENS
      - Uses tokenCVA for variant styling
      - Motion: NO MOTION BY DESIGN (pure layout container, no state/spatial changes)
    - **Token Compliance:** ✅ 100% (PANEL_TOKENS used throughout)
    - **Use Cases:** Form sections, settings panels, grouped content sections, non-interactive content containers
    - **API:** `tone?: PanelTone`, `padding?: ResponsiveSpacing`, `radius?: ResponsiveRadius`, Box props forwarded
    - **Exports:** `Panel`, `PanelProps`, `panelVariants`, `PanelTone`
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Pipeline 18A:** All steps complete (0-12), component ready for production use

### Container Components

27. **Card** - `src/COMPOSITION/layout/Card/Card.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2026-01-01)
    - **Lock Date:** 2026-01-01
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/CARD_BASELINE_REPORT.md`
    - **Migration Complete:** Card has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
    - **Key Accomplishments:** Eliminated string parsing anti-pattern (helper functions created), removed hardcoded classes (constants/props used), reduced code duplication, created comprehensive test coverage, created comprehensive Storybook coverage, verified accessibility compliance.
    - **Relationship with CardBase:** Joint analysis confirmed architectural separation - CardBase (PATTERNS, specialized patterns) vs Card (COMPOSITION, generic layouts). Different purposes, different layers, no architectural violation.
    - Exports: `Card`, `CardBody`, `CardFooter`, `CardHeader`, `CardProps`, `CardBodyProps`, `CardFooterProps`, `CardHeaderProps`

30. **Section** - `src/COMPOSITION/layout/Section/Section.tsx`
    - **Status:** ✅ **LOCKED** (Layout Extension Layer Lock, 2026-01-01)
    - **Lock Date:** 2026-01-01
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/SECTION_BASELINE_REPORT.md`, `docs/reports/audit/LAYOUT_LAYER_HARD_CODE_REVIEW.md`
    - **Type:** Extension Layer Layout Component
    - **Category:** layout
    - **Purpose:** Page-level block container for vertical page rhythm. Provides vertical padding between page sections and spacing between content blocks.
    - **Key Characteristics:**
      - Page-level block container for vertical rhythm
      - Uses ONLY spaceY (vertical padding) and spacing (content block gap)
      - Delegates to Stack internally
      - Semantic `<section>` element by default
      - Token-driven spacing only
    - **Rule:** DO NOT modify, extend, or create alternatives. All modifications require explicit unlock procedure.
    - Exports: `Section`, `SectionProps`

31. **ContainerSurface** - `src/components/containers/Surface.tsx`
    - Exports: `Surface as ContainerSurface`, `SurfaceProps as ContainerSurfaceProps`, `surfaceVariants as containerSurfaceVariants`

### Overlay Components

30. **Portal** - `src/COMPOSITION/overlays/Portal.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
    - **Lock Date:** 2025-12-27
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/PORTAL_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
    - **Migration Complete:** Portal has completed canonical Foundation Step Pipeline (Steps 0–12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements
    - **Key Decisions:**
      - Utility component (no visual tokens, no size/variant props)
      - SSR-safe mounting pattern (mounted state + window check)
      - Wrapper div necessary for ref forwarding (asChild pattern not needed)
      - className/style props acceptable for COMPOSITION layer
      - No CVA structure (Decision Matrix RULE 2 - no token-driven axes)
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - Exports: `Portal`, `PortalProps`

31. **Backdrop** - `src/COMPOSITION/overlays/Backdrop.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2026-01-01)
    - **Lock Date:** 2026-01-01
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/BACKDROP_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
    - **Purpose:** Overlay backdrop component for modal and dialog overlays. Provides visual backdrop with optional blur and transparency variants.
    - **Key Decisions:**
      - CVA migration: `cva` → `tokenCVA` (Decision Matrix RULE 1 compliance)
      - Type system: Explicit union type `BackdropVariant` exported, type constraint added
      - Token compliance: 100% token usage (OVERLAY_TOKENS.backdrop.*)
      - Stateless component: No internal state, all state controlled externally
      - Accessibility: `aria-hidden="true"` always set (correct for backdrop)
    - Exports: `Backdrop`, `BackdropProps`, `BackdropVariant`

32. **Dialog** - `src/COMPOSITION/overlays/Dialog.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-27)
    - **Lock Date:** 2025-12-27
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/DIALOG_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
    - **Type:** Extension Composition over Modal
    - **Rule:** Dialog MUST internally use Modal (Foundation Layer). Reimplementation of modal behavior is FORBIDDEN.
    - **Key Decisions:**
      - Semantic wrapper over Modal (Foundation) - correctly composes Modal.Root, Modal.Content, Modal.Close
      - Provides Dialog.Header, Dialog.Title, Dialog.Description, Dialog.Body, Dialog.Footer subcomponents
      - Automatic aria-labelledby and aria-describedby management via titleId/descriptionId props
      - No size/variant props (inherits from Modal) - correct pattern
      - Token-compliant (all styling uses tokens)
      - Comprehensive test coverage (all subcomponents, composition, accessibility, edge cases)
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - Exports: `Dialog`, `DialogBody`, `DialogDescription`, `DialogFooter`, `DialogHeader`, `DialogRoot`, `DialogTitle`
    - Types: `DialogBodyProps`, `DialogDescriptionProps`, `DialogFooterProps`, `DialogHeaderProps`, `DialogProps`, `DialogTitleProps`

33. **Spinner** - `src/COMPOSITION/controls/Spinner/Spinner.tsx`
    - **Status:** ✅ **CREATED** (Component Creation Pipeline C0-C10 Complete, 2025-12-28)
    - **Creation Date:** 2025-12-28
    - **Last Updated:** 2026-01-02 (Moved from overlays/ to controls/)
    - **Pipeline:** Component Creation Pipeline (C0-C10 complete)
    - **Creation Report:** `docs/reports/creation/SPINNER_CREATION_REPORT.md`
    - **Type:** Extension Layer Component - Visual Feedback
    - **Category:** controls (visual feedback component)
    - **Purpose:** Animated loading indicator for visual feedback during async operations
    - **Key Characteristics:**
      - Multiple visual variants (circle, dots, bounce, linear, bars, pulse, wave, orbit, bars-horizontal, ripple)
      - Full size scale support (xs, sm, md, lg, xl, 2xl, 3xl)
      - Tone variants (primary, muted, subtle) with CSS variable fallback support
      - Easing variants (linear, ease-in, ease-out, ease-in-out) for animation timing
      - Optional text label with configurable positioning (top, right, bottom, left)
      - Motion animation via tokens
      - Reduced motion support (`motion-reduce:animate-none`)
      - Accessibility: role="status", aria-label, aria-live="polite"
      - Token-compliant: 100% token-based implementation (SPINNER_TOKENS)
    - **Use Cases:** Inline loading (buttons, inputs), page loading, data loading (tables, lists), overlay loading
    - Exports: `Spinner`, `SpinnerEasing`, `SpinnerLabelPosition`, `SpinnerProps`, `SpinnerSize`, `SpinnerTone`, `SpinnerVariant`

34. **Accordion** - `src/COMPOSITION/overlays/Accordion/Accordion.tsx`
    - **Status:** ✅ **CREATED** (Component Creation Pipeline C0-C10 Complete, 2025-12-28)
    - **Creation Date:** 2025-12-28
    - **Last Updated:** 2025-12-28 (Fixed click interaction issue - disabled tokens now use `disabled:` prefix)
    - **Pipeline:** Component Creation Pipeline (C0-C10 complete)
    - **Creation Report:** `docs/reports/creation/ACCORDION_CREATION_REPORT.md`
    - **Type:** Extension Layer Component - Composite Disclosure
    - **Category:** overlays (interactive disclosure component)
    - **Purpose:** Vertically stacked set of interactive headings that reveal/hide associated content panels
    - **Key Characteristics:**
      - Single and multiple open modes (type="single" | "multiple")
      - Semantic variants (primary, secondary, accent, neutral)
      - Size variants (sm, md, lg)
      - Expand/collapse animations (`animate-accordion-down`, `animate-accordion-up`)
      - Chevron icon with rotation transition
      - Reduced motion support (via Tailwind keyframes)
      - Accessibility: ARIA attributes (role="region", aria-expanded, aria-labelledby), keyboard navigation (Arrow Up/Down, Enter/Space)
      - Token-compliant: 100% token-based implementation (ACCORDION_TOKENS)
      - Radix delegation: All behavior (keyboard navigation, focus management, ARIA) delegated to Radix Accordion primitives
      - **Interaction Fix (2025-12-28):** Disabled tokens now use `disabled:` prefix per INTERACTION_AUTHORITY, fixing click interaction issue
    - **Use Cases:** FAQ sections, settings panels, navigation menus, multi-step forms, collapsible content sections
    - Exports: `Accordion`, `AccordionContent`, `AccordionItem`, `AccordionRoot`, `AccordionTrigger`
    - Types: `AccordionContentProps`, `AccordionItemProps`, `AccordionRootProps`, `AccordionTriggerProps`, `AccordionVariant`, `AccordionSize`

35. **FileUpload** - `src/COMPOSITION/overlays/FileUpload/FileUpload.tsx`
    - **Status:** ✅ **CREATED** (Component Creation Pipeline C0-C10 Complete, 2025-12-28)
    - **Creation Date:** 2025-12-28
    - **Last Updated:** 2025-12-28
    - **Pipeline:** Component Creation Pipeline (C0-C10 complete)
    - **Creation Report:** `docs/reports/creation/FileUpload_CREATION_REPORT.md`
    - **Type:** Extension Layer Component - Composite Form Control
    - **Category:** overlays (file upload component, fallback from forms category)
    - **Purpose:** File upload component with drag-and-drop, file preview, validation, and error handling
    - **Key Characteristics:**
      - Drag-and-drop file selection (HTML5 Drag and Drop API)
      - File preview with thumbnails (images) and file info
      - File validation (size, type, count)
      - Controlled and uncontrolled modes
      - Size variants (sm, md, lg)
      - Visual variants (outline, filled)
      - Multiple file selection support
      - Error handling and display
      - Disabled and loading states
      - Motion animation (.tm-motion-fade-in for file appearance, transition.colors for drag-over)
      - Reduced motion support (inherited from motion utilities)
      - Accessibility: aria-label, aria-describedby, aria-busy, aria-invalid, aria-disabled
      - Keyboard navigation (Enter/Space on dropzone, Tab navigation)
      - Semantic HTML (role="button", role="list", role="listitem")
      - Token-compliant: 100% token-based implementation (spacing, radius, color, typography, shadow, motion)
      - Foundation composition: uses Button, Text components
    - **Use Cases:** Image upload, document upload, profile picture upload, file attachments
    - **Validation Features:** File size limits, file type restrictions, file count limits
    - Types: `FileUploadError`, `FileUploadProps`, `FileUploadSize`, `FileUploadVariant`

36. **Drawer** - `src/COMPOSITION/overlays/Drawer/Drawer.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
    - **Lock Date:** 2025-12-28
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Type:** Extension Layer Component - Overlay
    - **Category:** overlays (drawer overlay component)
    - **Purpose:** Side drawer overlay component with Portal, Backdrop, and focus trap support. Supports left, right, and bottom positions with size variants.
    - **Key Characteristics:**
      - Portal rendering for proper z-index stacking
      - Focus trap (loops focus inside drawer)
      - Escape key closes drawer
      - Overlay click optionally closes (prop controlled)
      - Theme-aware overlay opacity using tokens
      - Token-driven shadows, border radius, and spacing
      - Complete accessibility (role, aria-modal, aria-labelledby, aria-describedby)
      - Initial focus on first interactive element
      - Position variants: left, right, bottom
      - Size variants: sm, md, lg
      - Backdrop variants: default, blurred, transparent
      - Compound component pattern (Drawer.Content, Drawer.Header, Drawer.Body, Drawer.Footer)
      - Token-compliant: 100% token-based implementation (OVERLAY_TOKENS.drawer)
      - Foundation composition: uses Portal, Backdrop components
    - **Use Cases:** Side navigation, settings panels, filters, mobile menus
    - Exports: `Drawer`, `DrawerContent`, `DrawerHeader`, `DrawerBody`, `DrawerFooter`, `drawerVariants`
    - Types: `DrawerProps`, `DrawerPosition`, `DrawerSize`, `DrawerBackdropVariant`, `DrawerBodyProps`, `DrawerFooterProps`, `DrawerHeaderProps`

### Menu Components

33. **Popover** - `src/COMPOSITION/overlays/Popover.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Second Pass Complete, 2025-12-26)
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Lock Report:** `docs/reports/audit/POPOVER_BASELINE_REPORT.md`
    - **Pipeline:** Pipeline 18A First Pass (2025-12-25), Pipeline 18A Second Pass (2025-12-26)
    - **Public API:** Internal-only (not exported from `src/index.ts`)
    - **Architectural Compliance:** ✅ 100% (overlay size restriction compliance achieved)
    - Exports: `Popover`, `PopoverTrigger`, `PopoverAnchor`, `PopoverContent`, `PopoverWrapper`, `popoverContentVariants`
    - Types: `PopoverProps`, `PopoverVariant`, `PopoverSize` (restricted to `"sm" | "md" | "lg"` per overlay size restriction)

34. ~~**DropdownMenu**~~ ✅ **REMOVED** (MIGRATION_12C,  )
    - DropdownMenu removed; Dropdown component remains active in COMPOSITION/overlays
    - See `docs_archive/migrations/MIGRATION_12C_DROPDOWN_TOKENS_REMOVAL_REPORT.md` (archived)

35. **HoverCard** - `src/PATTERNS/menus/hover-card/`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-27)
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Lock Report:** `docs/reports/audit/HOVERCARD_BASELINE_REPORT.md`
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Lock Type:** PROCESS_LOCK (Component is in PATTERNS layer, not Foundation lock)
    - **Migration Complete:** HoverCard has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
    - **Key Decisions:**
      - Delegation pattern: HoverCardContent delegates styling to PopoverContent (intentional design)
      - Token compliance: All styling via POPOVER_TOKENS through PopoverContent
      - Type system: Explicit types, no CVA type leakage (delegates to PopoverContent types)
      - Storybook compliance: Required stories added (Matrix, States, SizesGallery, LongContent per VARIANTS_SIZE_CANON)
      - Test coverage: Comprehensive test suite with 20+ test cases
      - Accessibility: ARIA attributes, keyboard navigation validated
    - **Public API:** ✅ Public (exported from `src/index.ts`)
    - Exports: `HoverCardContent`, `HoverCardRoot`, `HoverCardTrigger`, `useHoverCardContext`
    - Types: `HoverCardContentProps`, `HoverCardRootProps`, `HoverCardTriggerProps`

36. **Tooltip** - `src/COMPOSITION/overlays/Tooltip.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-25)
    - **Rule:** DO NOT modify, extend, or create alternatives
    - **Lock Report:** `docs/reports/audit/TOOLTIP_BASELINE_REPORT.md`
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
    - **Migration Complete:** Tooltip has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
    - **Key Decisions:**
      - CVA migrated from `cva` to `tokenCVA` (Decision Matrix RULE 1)
      - Explicit union type exported (`TooltipVariant`), no CVA type leakage
      - Type constraints applied (`satisfies Record<TooltipVariant, string>`)
      - InteractiveVariant dictionary: primary, secondary, accent, outline, ghost, link, destructive
      - No public size prop (fixed size appropriate for small informational overlay)
      - Radix delegation for all behavior (hover, focus, keyboard, a11y)
      - Storybook compliance: Required stories added (`States`, `LongContent` per VARIANTS_SIZE_CANON)
    - **Public API:** Internal-only (not exported from `src/index.ts`)
    - Exports: `Tooltip`, `TooltipProvider`, `TooltipTrigger`, `TooltipContent`, `TooltipWrapper`, `tooltipContentVariants`
    - Types: `TooltipProps`, `TooltipVariant`

37. **Dropdown** - `src/COMPOSITION/overlays/Dropdown/Dropdown.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2026-01-02)
    - **Lock Date:** 2026-01-02
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/DROPDOWN_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
    - **Migration Complete:** Dropdown has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
    - **Key Decisions:**
      - Delegation pattern: Dropdown delegates overlay behavior to Popover (Root, Trigger, Content)
      - Custom implementation: DropdownItem and DropdownSeparator are custom implementations (not delegated)
      - Token compliance: 100% token usage (DROPDOWN_TOKENS, POPOVER_TOKENS)
      - Type system: Explicit types, no CVA type leakage (no CVA usage - direct className composition)
      - API clarity: Redundant props removed (children, disabled, onClick from DropdownItemProps; className from DropdownSeparatorProps)
      - Storybook compliance: Required stories added (Default, Matrix, States, SizesGallery, LongContent per VARIANTS_SIZE_CANON)
      - Test coverage: Comprehensive test suite with accessibility, keyboard navigation, and edge cases
      - Accessibility: Native button semantics, ARIA attributes, keyboard parity
    - **Type:** Extension Composition over Popover
    - **Purpose:** Generic action container that provides semantic subcomponents for action lists. Composes Popover for overlay behavior and keyboard accessibility. NOT a Menu component - generic container for actions without form semantics or menu-specific ARIA roles.
    - **Compound Component Pattern:** Dropdown.Root, Dropdown.Trigger, Dropdown.Content, Dropdown.Item, Dropdown.Separator
    - **Sizes:** DropdownContent supports `sm | md | lg` (PopoverSize, overlay size restriction compliant)
    - **Variants:** DropdownContent supports PopoverVariant (primary, secondary, accent, outline, ghost, link, destructive)
    - **Use Cases:** Action lists, dropdown menus, contextual actions, command palettes
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - Exports: `Dropdown`, `DropdownRoot`, `DropdownTrigger`, `DropdownContent`, `DropdownItem`, `DropdownSeparator`, `DROPDOWN_TOKENS`, `POPOVER_TOKENS`
    - Types: `DropdownRootProps`, `DropdownTriggerProps`, `DropdownContentProps`, `DropdownItemProps`, `DropdownSeparatorProps`, `DropdownItemPadding`

### Data Display Components

36. **Skeleton** - `src/PRIMITIVES/Skeleton/Skeleton.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-26)
    - Exports: `Skeleton`, `SkeletonProps`, `SkeletonVariant`, `skeletonVariants`
    - **Pipeline 18A:** All BLOCKERS resolved (CVA migration cva → tokenCVA, type system improvements, explicit union types)
    - **Key Changes:** tokenCVA migration, explicit SkeletonVariant type, type constraints (satisfies Record<SkeletonVariant, string>)
    - **Audit Report:** `docs/reports/audit/SKELETON_BASELINE_REPORT.md`

37. **EmptyState** - `src/PATTERNS/states/EmptyState/EmptyState.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-27)
    - **Lock Date:** 2025-12-27
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/EMPTYSTATE_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in PATTERNS layer, not Foundation lock)
    - Exports: `EmptyState`, `EmptyStateAction`, `EmptyStateDescription`, `EmptyStateIcon`, `EmptyStateTitle`
    - Types: `EmptyStateActionProps`, `EmptyStateDescriptionProps`, `EmptyStateIconProps`, `EmptyStateProps`, `EmptyStateTitleProps`, `EmptyStateIconSize`
    - **Key Decisions:**
      - Compound component pattern (Icon, Title, Description, Action)
      - Token-only styling (EMPTY_STATE_TOKENS)
      - Semantic HTML (h3, p)
      - Stateless, non-interactive display component
      - Subcomponent attachment pattern optimized
      - Type consistency (EmptyStateIconSize type used)

38. **DataList** - `src/PATTERNS/lists/DataList/DataList.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-27)
    - **Lock Date:** 2025-12-27
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/DATALIST_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in PATTERNS layer, not Foundation lock)
    - Exports: `DataList`, `DataListItem`, `DataListLabel`, `DataListRoot`, `DataListValue`, `useDataListContext`
    - Types: `DataListItemProps`, `DataListLabelProps`, `DataListRootProps`, `DataListValueProps`
    - **Key Decisions:**
      - Compound component pattern (Root, Item, Label, Value)
      - labelWidth prop implemented via React Context
      - Token-only styling (DATA_LIST_TOKENS)
      - Semantic HTML (`<dl>`, `<dt>`, `<dd>`)

39. **List** - `src/PATTERNS/lists/List/List.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-27)
    - **Lock Date:** 2025-12-27
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/LIST_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in PATTERNS layer, not Foundation lock)
    - Exports: `List`, `ListItem`, `ListProps`
    - Types: `ListItem`, `ListProps`
    - **Key Decisions:**
      - Simple list display pattern (no compound component pattern needed)
      - React.FC replaced with explicit function (modern React pattern)
      - Token-only styling (LIST_TOKENS created)
      - Semantic HTML (`<ul>`, `<li>` with `role="list"`)
      - Presentational component (no interactive states beyond CSS hover)
      - No size/variant props (intentionally simple component)
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A

40. **Timeline** - `src/PATTERNS/lists/Timeline/Timeline.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-27)
    - **Lock Date:** 2025-12-27
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/TIMELINE_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in PATTERNS layer, not Foundation lock)
    - Exports: `Timeline`, `TimelineItem`, `TimelineProps`
    - Types: `TimelineItem`, `TimelineProps`
    - **Key Decisions:**
      - Token-only styling (TIMELINE_TOKENS created)
      - Semantic HTML (`<ol>`, `<li>` with `role="list"` for chronological events)
      - Decorative elements hidden from screen readers (`aria-hidden="true"`)
      - Presentational component (no interactive states, no size/variant props)
      - React.FC replaced with explicit function (modern React pattern)
      - No CVA structure (component has no token-driven axes per Decision Matrix)
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A

41. **Table** - `src/PATTERNS/tables/table/Table.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-26)
    - **Lock Date:** 2025-12-26
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/TABLE_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in PATTERNS layer, not Foundation lock)
    - **Migration Complete:** Table has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements
    - **Key Decisions:**
      - Compound component pattern (not data-driven API)
      - Alignment classes extracted to shared constant (`Table.constants.ts`)
      - Subcomponent attachment pattern optimized (type alias instead of repetitive assertions)
      - Keyboard navigation support for sortable columns (Enter/Space keys)
      - Explicit union types for size (`sm | md | lg`) and alignment (`left | center | right`)
      - All styling uses TABLE_TOKENS (no raw values)
      - React Context for sharing sort/expansion state across subcomponents
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Purpose:** Interactive table component with sorting, expansion, and selection capabilities. Compound component pattern for displaying structured tabular data with built-in support for column sorting, row expansion, selection states, loading states, and empty states.
    - Exports: `TableRoot as Table`, `useTableContext`, `TableHeader`, `TableHead`, `TableBody`, `TableRow`, `TableCell`, `TableSortIcon`, `TableEmpty`, `TableLoadingState`, `TableExpandableContent`
    - Types: `SortDirection`, `SortState`, `TableBodyProps`, `TableCellProps`, `TableColumn`, `TableContextValue`, `TableEmptyProps`, `TableExpandableContentProps`, `TableHeadProps`, `TableHeaderProps`, `TableLoadingStateProps`, `TableRootProps`, `TableRowProps`, `TableSortIconProps`

41. **SimpleTable** - `src/PATTERNS/tables/SimpleTable/Table.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-26)
    - **Lock Date:** 2025-12-26
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/SIMPLETABLE_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in PATTERNS layer, not Foundation lock)
    - **Migration Complete:** SimpleTable has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements
    - **Key Decisions:**
      - CVA migrated from no CVA to tokenCVA (Decision Matrix RULE 1 - component has token-driven size axis)
      - Size prop added with `sm | md | lg` subset (per VARIANTS_SIZE_CANON.md)
      - Explicit union type exported (`SimpleTableSize`), no CVA type leakage
      - Type constraints applied (`satisfies Record<SimpleTableSize, string>`)
      - SIMPLETABLE_TOKENS created for component-specific tokens
      - All raw Tailwind classes replaced with tokens
      - Semantic HTML structure with `scope="col"` on headers
      - No variant prop (simple table doesn't need visual variants)
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Purpose:** Simple tabular data display component with column configuration. Renders a semantic HTML table based on data and column definitions. Does not handle sorting, filtering, or pagination (correct for "Simple" table).
    - Exports: `Table`, `TableColumn`, `TableProps`, `SimpleTableSize`
    - Types: `TableColumn`, `TableProps`, `SimpleTableSize`

### Overlay Components

42. **Combobox** - `src/COMPOSITION/overlays/Combobox/Combobox.tsx`
    - **Status:** ✅ **ALLOWED** (Extension Overlay)
    - **Type:** Autocomplete Overlay
    - **Purpose:** Autocomplete component with dropdown list supporting text input and option selection. Supports single-select and multi-select modes, client-side and server-side filtering.
    - **Creation Date:** 2025-12-28
    - **Creation Report:** `docs/reports/creation/COMBOBOX_CREATION_REPORT.md`
    - **Sizes:** `sm | md | lg` (Interactive Size Scale)
    - **Foundation Composition:** Input + Popover
    - **Use Cases:** Search with autocomplete, tags input, large list selection with filtering
    - **Features:** Single/multi-select, client/server filtering, keyboard navigation (Arrow keys, Enter, Escape), tags display for multi-select
    - **A11Y:** role="combobox", aria-expanded, aria-autocomplete="list", aria-controls, aria-activedescendant
    - Exports: `Combobox`, `ComboboxInput`, `ComboboxList`, `ComboboxRoot`
    - Types: `ComboboxRootProps`, `ComboboxInputProps`, `ComboboxListProps`, `ComboboxOption`, `ComboboxSize`

### Navigation Components

43. **SegmentedControl** - `src/COMPOSITION/navigation/segmented-control/SegmentedControl.tsx`
    - Exports: `SegmentedControl`
    - Types: `SegmentedControlItemProps`, `SegmentedControlRootProps`, `SegmentedControlSize`, `SegmentedControlOrientation`, `SegmentedControlState`
    - Variants: `segmentedControlItemVariants`, `segmentedControlRootVariants`
    - Status: ✅ **PROCESS LOCKED** (validated by Pipeline 18A, 2025-12-26)

44. **Breadcrumbs** - `src/COMPOSITION/navigation/breadcrumbs/Breadcrumbs.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-26)
    - **Lock Date:** 2025-12-26
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/BREADCRUMBS_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
    - **Migration Complete:** Breadcrumbs has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements
    - **Key Decisions:**
      - No CVA structure (correct - component has no size/variant props)
      - Token compliance: All styling via NAVIGATION_TOKENS
      - Raw values "h-4 w-4" and "mx-1" are acceptable (standard Tailwind utilities)
      - Compound API pattern (Breadcrumbs.Root, Breadcrumbs.Item, Breadcrumbs.Separator)
      - States: default, disabled (via item.disabled), current (via aria-current="page")
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - Exports: `Breadcrumbs`, `Breadcrumbs.Root`, `Breadcrumbs.Item`, `Breadcrumbs.Separator`
    - Types: `BreadcrumbItem`, `BreadcrumbsItemProps`, `BreadcrumbsRootProps`, `BreadcrumbsSeparatorProps`

45. **Pagination** - `src/COMPOSITION/navigation/pagination/Pagination.tsx` ✅ LOCKED (validated by Pipeline 18A, 2025-12-26)
    - Exports: `Pagination`
    - Types: `PaginationEllipsisProps`, `PaginationItemProps`, `PaginationNextProps`, `PaginationPrevProps`, `PaginationRootProps`
    - Status: LOCKED
    - Lock Date: 2025-12-26
    - Pipeline: 18A

46. **Stepper** - `src/COMPOSITION/navigation/stepper/Stepper.tsx` — ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-26)
    - **Lock Date:** 2025-12-26
    - **Audit Report:** `docs/reports/audit/STEPPER_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
    - **Migration Complete:** Stepper has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements
    - **Key Decisions:**
      - No CVA structure (correct - component has no size/variant props per Decision Matrix)
      - Token compliance: All styling via NAVIGATION_TOKENS, MOTION_TOKENS, ICON_TOKENS
      - Raw value "border-2" is acceptable (standard Tailwind utility, pattern seen in other components)
      - Compound API pattern (Stepper.Root, Stepper.Item, Stepper.Indicator, Stepper.Label, Stepper.Content)
      - States: active, completed, disabled (semantic process states for visualization)
      - Helper functions extracted: getIndicatorStateClasses, renderIndicatorContent (reduced duplication)
      - Accessibility: role="group", aria-label, aria-orientation, aria-current, aria-disabled
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - Exports: `Stepper`
    - Types: `StepperContentProps`, `StepperIndicatorProps`, `StepperItemProps`, `StepperLabelProps`, `StepperRootProps`, `StepperStep`

47. **NavLink** - `src/PRIMITIVES/NavLink/NavLink.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-26)
    - **Lock Date:** 2025-12-26
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/NAVLINK_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in PRIMITIVES layer, Extension primitive)
    - **Migration Complete:** NavLink has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements
    - **Key Decisions:**
      - Navigation primitive built exclusively on Foundation Link component
      - Stateless component reflecting externally provided navigation state via aria-current
      - No routing logic or framework dependencies
      - Minimal wrapper pattern (delegates all behavior to Link)
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Purpose:** Navigation primitive built on top of the Foundation Link component. Represents a navigational link and reflects externally provided navigation state via aria-current. NavLink does not perform routing, route matching, or state detection. NavLink is permanently limited to a stateless navigation primitive role and is intentionally isolated from routing frameworks, adapters, and business logic.
    - Exports: `NavLink`, `NavLinkProps`
    - Types: `NavLinkProps`

48. **NavRoot** - `src/COMPOSITION/navigation/NavRoot/NavRoot.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
    - **Lock Date:** 2025-12-26
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/NAVROOT_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
    - **Migration Complete:** NavRoot has completed canonical Foundation Step Pipeline (Steps 0–12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements
    - **Key Changes:** Duplicate NavRoot definition removed from Navigation.tsx, all exports point to standalone version, tests and stories consolidated, accessibility validated
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Type:** Extension Layer Primitive - Navigation Boundary
    - **Purpose:** Pure semantic navigation boundary component with zero logic. Renders a `<nav>` element with required `aria-label` for accessibility. Provides a semantic wrapper that enforces accessibility while remaining a pure composition wrapper with no assumptions about navigation structure or styling.
    - **Key Characteristics:**
      - Zero logic, no visual styling, no navigation behavior
      - Required `aria-label` prop (TypeScript enforced)
      - Supports `asChild` pattern via Radix Slot for composition
      - Extends `React.HTMLAttributes<HTMLElement>` for standard HTML nav attributes
      - No variant, size, orientation, or other visual/behavioral props
    - Exports: `NavRoot`, `NavRootProps`

49. **NavList** - `src/COMPOSITION/navigation/nav-list/NavList.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-26)
    - **Lock Date:** 2025-12-26
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/NAVLIST_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
    - **Type:** Extension Layer Primitive - Navigation Structural
    - **Purpose:** Pure semantic list container for navigation primitives. Renders either `<ol>` or `<ul>` element with correct HTML semantics. This component is a structural wrapper with no styling, layout, or logic.
    - **Key Characteristics:**
      - Zero logic, no visual styling, no navigation behavior
      - Semantic list container for navigation (renders `<ol>` by default, `<ul>` when `as="ul"`)
      - Supports `asChild` pattern via Radix Slot for composition
      - Extends `Omit<React.OlHTMLAttributes<HTMLOListElement>, 'className' | 'style'>` (Foundation Enforcement compliant)
      - No variant, size, orientation, divider, activeIndex, current, or other visual/behavioral props
      - Does not render list items itself (pure composition container)
    - **Key Decisions:**
      - Pure structural component pattern (no styling, no logic, no state)
      - Foundation Enforcement compliance (className/style excluded from public API)
      - No size/variant props (correct for structural component)
      - asChild pattern support via Radix Slot for composition
      - Semantic HTML rendering (native `<ol>` and `<ul>` elements)
    - Exports: `NavList`, `NavListProps`

50. **Navigation Primitives** - `src/COMPOSITION/navigation/primitives/Navigation.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-26)
    - **Lock Date:** 2025-12-26
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/NAVIGATION_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
    - **Migration Complete:** Navigation Primitives have completed canonical Foundation Step Pipeline (Steps 0–12) and demonstrate full compliance with all Authority Contracts and canonical lifecycle requirements
    - **Key Decisions:**
      - NavSeparator duplication removed from Navigation.tsx, aligned with NavText pattern (standalone component)
      - Multiple primitives in one file is intentional design (grouped primitives)
      - Stateless semantic primitives pattern (no state, no interaction logic)
      - No size/variant props (correct for structural primitives)
      - Token compliance: All styling via NAVIGATION_TOKENS
      - Type system: Explicit types, no CVA-derived types
    - **NavItem Architecture Hardening (2025-12-26):** ✅ VALIDATED - NavItem fully complies with all architectural hardening rules (TUNG_NAVITEM_FINALIZATION). Pure structural primitive with zero navigation logic, zero dependencies on other navigation primitives, framework-agnostic, composition-only. Ready for architectural lock. See `docs/reports/audit/NAVITEM_ARCHITECTURE_HARDENING_VALIDATION.md` for complete validation report.
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Type:** Extension Layer Primitive - Navigation Structural
    - **Components:**
      - **NavList** - Structural list container (`<ol>` or `<ul>`)
      - **NavItem** - Structural list item (`<li>` with asChild support)
      - **NavText** - Imported from standalone component
      - **NavSeparator** - Imported from standalone component (duplication removed)
    - Exports: `NavList`, `NavItem`, `NavText`, `NavSeparator`, `NavListProps`, `NavItemProps`, `NavTextProps`, `NavSeparatorProps`

51. **NavText** - `src/COMPOSITION/navigation/NavText/NavText.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
    - **Lock Date:** 2025-12-26
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/NAVTEXT_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
    - **Migration Complete:** NavText has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements
    - **Key Decisions:**
      - No CVA structure (correct - component has no size/variant props per Decision Matrix)
      - Token compliance: All styling via NAVIGATION_TOKENS.states.default.text
      - Non-interactive navigation text primitive (not focusable, no role overrides)
      - Stateless component (only passes through aria-current attribute)
      - Supports asChild pattern via Radix Slot for composition
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Type:** Extension Layer Primitive - Navigation Text
    - **Purpose:** Non-interactive navigation text primitive. Renders a semantic `<span>` element (or Slot if asChild) for non-clickable text in navigation structures. Supports `aria-current` attribute for indicating current page/location. This is a pure render-only primitive with no logic, state, or routing behavior.
    - Exports: `NavText`, `NavTextProps`

52. **NavSeparator** - `src/COMPOSITION/navigation/NavSeparator/NavSeparator.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
    - **Lock Date:** 2025-12-26
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/NAVSEPARATOR_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
    - **Migration Complete:** NavSeparator has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements

53. **Navbar** - `src/COMPOSITION/layout/Navbar/Navbar.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
    - **Lock Date:** 2026-01-01
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/NAVBAR_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
    - **Migration Complete:** Navbar has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements
    - **Key Changes:** Replaced hardcoded Tailwind classes with layout primitives (Box, Stack), token-based spacing achieved, comprehensive tests and stories created
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Type:** Extension Layer Layout Component - Navigation Container
    - **Purpose:** Navigation container component providing semantic `<nav>` wrapper with left/right/children slots for navigation content. Navbar IS a navigation container, NOT a layout primitive. Does NOT control page padding (ContentShell responsibility), sticky behavior (StickyBar responsibility), or routing (framework adapter responsibility).
    - **Key Characteristics:**
      - Semantic `<nav>` element with aria-label support
      - Slot-based API (left, right, children) similar to Footer pattern
      - Uses layout primitives internally (Box with `as="nav"`, Stack for horizontal layout)
      - Token-based spacing (Box `px="md" py="sm"`)
      - Stateless container (no internal state, pure composition)
      - No size/variant props (semantic container, not sized component)
    - Exports: `Navbar`, `NavbarProps`
    - **Key Decisions:**
      - No CVA structure (correct - component has no size/variant props per Decision Matrix)
      - Token compliance: All styling via NAVIGATION_TOKENS
      - Stateless component (no internal state)
      - Purely decorative element (aria-hidden="true" always)
      - Supports asChild pattern via Radix Slot (canonical composition pattern)
      - Common props extracted to reduce duplication (STEP 1 improvement)
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Type:** Extension Layer Primitive - Navigation Visual
    - **Purpose:** Purely visual navigation separator with no semantics or logic. Renders a decorative element with `aria-hidden="true"` to hide it from screen readers.
    - **Key Characteristics:**
      - Zero logic, no visual styling beyond token-based text styling, no navigation behavior
      - Purely visual separator for navigation structures
      - Supports `asChild` pattern via Radix Slot for composition
      - Extends `React.HTMLAttributes<HTMLSpanElement>` for standard HTML span attributes
      - Always has `aria-hidden="true"` (required for accessibility)
      - Default content is "/" if children not provided
      - No variant, size, orientation, role, aria-current, href, or interactive props
      - Does not perform routing, state detection, or navigation logic
    - Exports: `NavSeparator`, `NavSeparatorProps`

### Data Display Primitives

44. **CardBase** - `src/PATTERNS/cards/CardBase/CardBase.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, Second Pass Complete)
    - **Lock Date:** 2025-12-27
    - **Second Pass Date:** 2026-01-01
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete, Second Pass Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/CARDBASE_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in PATTERNS layer, not Foundation lock)
    - **Migration Complete:** CardBase has completed canonical Foundation Step Pipeline (Steps 0–12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements
    - **Second Pass:** Joint analysis with Card component (2026-01-01) confirmed architectural separation is correct. No changes required. Component remains PROCESS LOCKED.
    - **Key Changes:** CVA migrated (cva → tokenCVA), size scale aligned (default/compact → sm/md), variant dictionary aligned (default/featured → default/elevated), type constraints added (satisfies Record<Type, string>), tests created, Storybook updated (Matrix, SizesGallery stories added)
    - **Breaking Changes:** Size prop changed from `"default" | "compact"` to `"sm" | "md"`, variant prop changed from `"default" | "featured"` to `"default" | "elevated"`
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Type:** Canonical Primitive
    - **Purpose:** Layout composition primitive for card structures. Provides pure layout wrappers (ImageWrapper, ContentWrapper, FooterWrapper) with no domain logic. All styling uses token-based values.
    - Exports: `CardBase`, `CardBaseContentWrapper`, `CardBaseFooterWrapper`, `CardBaseImageWrapper`
    - Types: `CardBaseContentWrapperProps`, `CardBaseFooterWrapperProps`, `CardBaseImageWrapperProps`, `CardBaseProps`, `CardBaseSize` (`"sm" | "md"`), `CardBaseVariant` (`"default" | "elevated"`)

### Extension Utility Systems

45. **TAS (Tenerife Animation System)** - `src/COMPOSITION/motion/animation/`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
    - **Lock Date:** 2025-12-26
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/TAS_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Extension Utility System)
    - **Component Type:** Extension Utility System (not a React component)
    - **Purpose:** Provides token-driven CSS animation utilities and presets with reduced motion support
    - **Migration Complete:** TAS has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements.
    - **Key Changes:**
      - Extracted common preset pattern to `createPreset` helper (eliminated 20+ duplicate patterns)
      - Removed unused parameters from preset signatures (distance, scale, y)
      - Simplified createStagger logic
      - Added comprehensive test suite (tas.test.ts, presets.test.ts, utils.test.ts, useInView.test.tsx)
      - Added documentation warnings for createTransition raw string fallback
    - **Rule:** Future structural modifications require re-entry into Pipeline 18A
    - **Exports:** Core functions (`createTransition`, `shouldReduceMotion`, `shouldEnableAnimations`), Presets (`fadePresets`, `slidePresets`, `scalePresets`, `hoverPresets`, `presets`, `createStagger`, `revealOnScroll`), Utilities (`resolveComponentAnimations`), React Hook (`useInView`), Types (`AnimationProps`, `ComponentAnimationConfig`, `PresetConfig`, `TransitionConfig`, `SpringConfig`, `Spring`, `Duration`, `Easing`, `Transition`, `UseInViewOptions`, `UseInViewReturn`)
    - **Note:** TAS is an internal utility system used by Extension components. Not exported from `src/index.ts` (intentionally internal).

### Extension Build Tooling (LOCKED)

Build-time tooling that is part of the Extension layer infrastructure. These tools are **EXTENSION LOCKED** and their behavior is immutable.

1. **Theme Tooling** - `tools/theme-generator/`, `tools/theme-validator/`, `tools/theme-contract/`
   - **Status:** ✅ **EXTENSION LOCKED**
   - **Lock Date:** 2025-12-31
   - **Lock Document:** `docs/architecture/EXTENSION_LOCK_THEME_TOOLING.md`
   - **Audit Report:** `docs/reports/theme-tooling-audit/08_final_verdict.md`
   - **Audit Status:** FULL PASS (6/6 assumptions verified)
   - **Lock Type:** EXTENSION_LOCK (Build tooling lock)
   - **Purpose:** Theme generation, validation, and parity checking for Theme Contract v1 compliance
   - **CLI Commands:** `theme:generate`, `theme:validate`, `theme:parity-check`
   - **Default Output:** `src/EXTENSIONS/themes/` (immutable)
   - **Locked Elements:**
     - Default output directory (`src/EXTENSIONS/themes/`)
     - Validation rules (Theme Contract v1 compliance)
     - Write guards (no files without validation)
     - Parity check (token registry compliance)
     - No bypass flags allowed
   - **Allowed:** Bug fixes, documentation updates, performance improvements (without changing API/behavior)
   - **Forbidden:** Changing `DEFAULT_OUTPUT_DIR`, adding bypass flags, weakening validation rules, weakening CI gates
   - **Rule:** Behavioral modifications require explicit unlock procedure per `EXTENSION_LOCK_THEME_TOOLING.md`

---

## Extension Compositions (ALLOWED)

Higher-level component compositions that combine multiple Extension Layer components. These are **ALLOWED** for use.

### Notification System

1. **NotificationCenter** - `src/DOMAIN/notifications/NotificationCenter.tsx`
   - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
   - **Lock Date:** 2025-12-27
   - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
   - **Audit Report:** `docs/reports/audit/NOTIFICATIONCENTER_BASELINE_REPORT.md`
   - **Lock Type:** PROCESS_LOCK (Component is in DOMAIN layer, not Foundation lock)
   - **Migration Complete:** NotificationCenter has completed canonical Foundation Step Pipeline (Steps 0-12) and demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements
   - **Key Decisions:**
     - Compound component pattern maintained (Provider, Panel, Trigger, List, Item, GroupHeader, DismissAll)
     - Utility functions extracted (`NotificationCenter.utils.ts` for variant/channel conversion)
     - Channel method pattern extracted (reduced duplication in useNotificationCenter)
     - Panel width prop restricted to overlay size scale (sm | md | lg only, compliant with VARIANTS_SIZE_CANON)
     - No CVA structures (Decision Matrix RULE 2 applies - components without token-driven axes use direct token classes)
     - Tests created with comprehensive coverage
     - Storybook stories updated (SizesGallery, LongContent added per VARIANTS_SIZE_CANON)
   - **Rule:** Future structural modifications require re-entry into Pipeline 18A
   - **Type:** Extension Composition
   - **Exports:** `NotificationCenter`, `NotificationCenterDismissAll`, `NotificationCenterGroupHeader`, `NotificationCenterItem`, `NotificationCenterList`, `NotificationCenterPanel`, `NotificationCenterProvider`, `NotificationCenterTrigger`
   - **Hooks:** `useNotificationCenter`, `useNotificationCenterContext`
   - **Types:** `GroupByFunction`, `NotificationChannel`, `NotificationContextType`, `NotificationData`, `NotificationOptions`, `NotificationVariant`, `NotificationCenterDismissAllProps`, `NotificationCenterGroupHeaderProps`, `NotificationCenterItemProps`, `NotificationCenterListProps`, `NotificationCenterPanelProps`, `NotificationCenterProviderProps`, `NotificationCenterTriggerProps`

**Note:** Dialog is also an Extension Composition (see Overlay Components section) but is listed there for organizational purposes.

### Framework Adapters (Extension-Only)

Framework-specific adapter components that bridge external framework APIs with Foundation components. These components are **Extension-only** (not exported from `src/index.ts`) and are available for use within Next.js applications.

1. **NextLinkAdapter** - `src/EXTENSIONS/next/NextLinkAdapter.tsx`
   - **Status:** ✅ **PROCESS_LOCK** (Re-confirmed)
   - **Lock Date:** 2025-12-23 (Initial), 2025-12-25 (Re-confirmed)
   - **Pipeline 18A Completion:** 2025-12-25 (Steps 0-12 complete, full pipeline re-execution)
   - **Audit Report:** `docs/reports/audit/NEXTLINKADAPTER_BASELINE_REPORT.md`
   - **Lock Type:** PROCESS_LOCK (Extension component lock)
   - **Component Type:** Extension-level Framework Adapter
   - **Purpose:** Bridges Next.js `next/link` with Foundation `Link` component
   - **Rule:** Future modifications require new Pipeline 18A execution
   - **Exports:** `NextLinkAdapter`, `NextLinkAdapterProps` (Extension-only, not exported from `src/index.ts`)
   - **Changes (2025-12-25 Pipeline):** Added 3 canonical Storybook stories (Matrix, States, SizesGallery) for VARIANTS_SIZE_CANON compliance. No component code changes required.

---

## Existing but Restricted Components

The following components exist in the codebase but are **RESTRICTED** and **MUST NOT BE USED**. They are not exported via `src/index.ts` and are not part of the public API.

### DO NOT USE - Layout Components

1. **Footer** - `src/components/layout/Footer.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE

2. **Navbar** - `src/components/layout/Navbar.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE

3. **ModeHero** - `src/components/layout/ModeHero.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE

### DO NOT USE - UI Components (Non-Canonical Variants)

4. **Card** (shadcn variant) - `src/components/ui/card.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE - Use `Card` from `src/components/containers/Card.tsx` instead

5. **Tooltip** (shadcn variant) - `src/components/ui/tooltip.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE

6. **Toast** (shadcn variant) - `src/components/ui/toast.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE - Use `Toast` from `src/components/overlays/Toast.tsx` instead

7. **Toaster** - `src/components/ui/toaster.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE

### DO NOT USE - Primitives

8. **Button** (primitive) - `src/components/primitives/Button.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE - Use `Button` from `src/PRIMITIVES/Button/Button.tsx` (FOUNDATION LOCKED) instead

9. **Link** (legacy path) - `src/components/primitives/Link.tsx`
   - **Status:** RESTRICTED
   - **Rule:** DO NOT USE - Use `Link` from `src/PRIMITIVES/Link/Link.tsx` (exported) instead

10. **Badge** (legacy path) - `src/components/primitives/Badge.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Use `Badge` from `src/PRIMITIVES/Badge/Badge.tsx` (exported) instead

11. **Input** (primitive) - `src/components/primitives/Input.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Use `Input` from `src/components/input/Input.tsx` instead

12. **Label** (primitive) - `src/components/primitives/Label.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Use `Label` from `src/components/ui/label.tsx` instead

13. **Card** (primitive) - `src/components/primitives/Card.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Use `Card` from `src/components/containers/Card.tsx` instead

14. **ThemeSwitch** - `src/components/primitives/ThemeSwitch.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Overlay Components (Non-Canonical Variants)

15. **Popover** (overlays variant) - `src/components/overlays/Popover.tsx`
    - **Status:** RESTRICTED (Legacy path)
    - **Note:** Popover is now locked at `src/COMPOSITION/overlays/Popover.tsx` (see Menu Components section)
    - **Rule:** DO NOT USE - Use `Popover` from `src/COMPOSITION/overlays/Popover.tsx` (LOCKED) instead

16. **Tooltip** (overlays variant) - `src/components/overlays/Tooltip.tsx`
    - **Status:** RESTRICTED (Legacy path)
    - **Note:** Tooltip is now locked at `src/COMPOSITION/overlays/Tooltip.tsx` (see Menu Components section)
    - **Rule:** DO NOT USE - Use Tooltip from `src/COMPOSITION/overlays/Tooltip.tsx` (LOCKED) instead

17. **OverlayPortal** - `src/components/overlays/OverlayPortal.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Menu Components (Non-Canonical Variants)

18. ~~**DropdownMenu** (menus variant)~~ - ❌ **REMOVED** (MIGRATION_12C)
    - **Status:** REMOVED
    - **Rule:** Fully removed from codebase

19. **NavigationMenu** - `src/components/menus/NavigationMenu.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Section Components

23. **SectionBuilder** - `src/components/SectionBuilder.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

24. **HeroSection** - `src/components/sections/HeroSection.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

25. **CTASection** - `src/components/sections/CTASection.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

26. **TrendingSection** - `src/components/sections/TrendingSection.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

27. **FeatureSection** - `src/components/sections/FeatureSection.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

28. **ArticlesSection** - `src/components/sections/ArticlesSection.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### PROCESS LOCKED - Filter Components

29. **FilterBar** - `src/PATTERNS/filters/FilterBar.tsx`
    - **Status:** ✅ PROCESS LOCKED (Pipeline 18A Complete, FINALIZATION 2025-12-27)
    - **Rule:** USE — fully controlled component via `filterManager` prop
    - **Note:** Mock logic removed, converted to pure UI component (2025-12-27, FINALIZATION task)
    - **Breaking Change:** `filterManager: FilterManager` prop is now required
    - **Audit Report:** `docs/reports/audit/FILTERBAR_BASELINE_REPORT.md`

30. **SearchInput** - `src/components/filters/SearchInput.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

31. **FilterSelect** - `src/components/filters/FilterSelect.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

32. **DateRangePicker** - `src/components/filters/DateRangePicker.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

33. **PriceRangeSlider** - `src/components/filters/PriceRangeSlider.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

34. **SearchFilters** - `src/components/filters/SearchFilters.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### Navigation Components (continued)

45. **SearchBar** - `src/COMPOSITION/navigation/SearchBar/SearchBar.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2026-01-01)
    - **Lock Date:** 2026-01-01
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/SEARCHBAR_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
    - **Semantic Role:** COMPOSITION_NAVIGATION_SEARCH_AUTOCOMPLETE
    - **Purpose:** Search input component with autocomplete suggestions. Provides search functionality with dropdown suggestions, keyboard navigation, and suggestion selection.
    - **Key Characteristics:**
      - Uncontrolled component (manages own input state)
      - Filters suggestions based on input value
      - Keyboard navigation (ArrowUp/Down, Enter, Escape)
      - Click outside to close dropdown
      - Composes SearchInput (PATTERNS) and Button (PRIMITIVES)
    - **Key Decisions:**
      - Code quality improved (helpers extracted, memoization added, switch statement)
      - Token compliance achieved (z-index corrected, other tokens verified)
      - No size/variant props (correct - component does not need variants)
      - Test coverage: Comprehensive (375 lines, all public behavior covered)
      - Storybook coverage: 6 stories (default, states, realistic usage)
      - Accessibility: Keyboard navigation complete, ARIA enhancements identified for future improvement
    - **Rule:** USE — component ready for production use

46. **Menu** - `src/COMPOSITION/navigation/Menu/Menu.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2026-01-02)
    - **Lock Date:** 2026-01-02
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/MENU_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
    - **Semantic Role:** COMPOSITION_NAVIGATION_MENU
    - **Purpose:** Radix DropdownMenu-based component for action/navigation lists. Menu provides action/navigation lists with proper ARIA menu semantics (role="menu", role="menuitem"). Usable as a base for context menus, dropdown actions, and command-like UIs, but must not duplicate Select, Popover, or ContextMenu responsibilities.
    - **Key Characteristics:**
      - Strict Radix wrapper pattern (all behavior delegated to Radix DropdownMenu)
      - Compound component pattern (Menu with subcomponents: Root, Trigger, Content, Item, Separator, Group, Label)
      - Token-driven styling via MENU_TOKENS (no custom behavior logic)
      - Size props: MenuContent padding ("sm" | "md"), MenuItem padding ("xs" | "sm" | "md"), MenuItem height ("sm" | "md" | "lg")
      - Non-modal overlay (does not trap focus, restores focus to trigger on close)
      - Keyboard navigation: ArrowUp/Down, Home/End, Enter/Space, Escape, typeahead (handled by Radix)
      - Accessibility: Full ARIA support, keyboard parity, focus management (handled by Radix)
    - **Key Decisions:**
      - No refactor required (code quality already high)
      - CVA structure is canonical (variants inline, type constraints present, tokenCVA used correctly)
      - Type system well-aligned (explicit unions, no CVA-derived types)
      - Token compliance verified (all values use tokens or CSS variables)
      - Storybook stories updated (Default, SizesGallery, LongContent added per canonical requirements)
      - A11Y, Focus, and Input requirements met (Radix handles all accessibility)
    - **Rule:** USE — component ready for production use
    - Exports: `Menu`, `MenuRoot`, `MenuTrigger`, `MenuContent`, `MenuItem`, `MenuSeparator`, `MenuGroup`, `MenuLabel`
    - Types: `MenuRootProps`, `MenuTriggerProps`, `MenuContentProps`, `MenuItemProps`, `MenuSeparatorProps`, `MenuGroupProps`, `MenuLabelProps`

### DO NOT USE - Image Components

36. **Image** - `src/PRIMITIVES/Image/Image.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - RESTRICTED per API decision (TUI_API_DECISION_PRIMITIVES_EXPORT)
    - **Rationale:** Domain-specific concerns (skeleton loading, fallback handling) belong in application code, not design system; violates token-driven architecture; image optimization is application-specific

### DO NOT USE - Auth Components

37. **LoginForm** - `src/components/auth/LoginForm.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

38. **RegisterForm** - `src/components/auth/RegisterForm.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

39. **ProfileCard** - `src/DOMAIN/auth/ProfileCard.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete: 2026-01-01)
    - **Rule:** Ready for use
    - **Audit Report:** `docs/reports/audit/PROFILECARD_BASELINE_REPORT.md`

### DO NOT USE - Admin Components

40. **Dashboard** - `src/components/admin/Dashboard.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

41. **UserManagement** - `src/components/admin/UserManagement.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Feedback Components

42. **ConsentBanner** - `src/components/feedback/ConsentBanner.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

43. **Progress** (legacy path) - `src/components/feedback/Progress.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Use `Progress` from `src/PRIMITIVES/Progress/Progress.tsx` (PROCESS LOCKED) instead

44. **Skeleton** (feedback variant) - `src/components/feedback/Skeleton.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Use `Skeleton` from `src/components/data/skeleton/Skeleton.tsx` instead

### DO NOT USE - Modal Components

45. **ConfirmDialog** - `src/components/modals/ConfirmDialog.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

46. **ModalProvider** - `src/components/modals/ModalProvider.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Control Components

47. **LanguageSelector** - `src/COMPOSITION/controls/LanguageSelector/LanguageSelector.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Skeleton Components

48. **EventCardSkeleton** - `src/components/skeletons/EventCardSkeleton.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

49. **VenueCardSkeleton** - `src/components/skeletons/VenueCardSkeleton.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Icon Components

50. **TrendingIcon** - `src/components/icons/TrendingIcon.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE

### DO NOT USE - Motion Stories (No Component)

51. **Motion.stories.tsx** - `src/components/motion/Motion.stories.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - No corresponding component exists

52. **Gestures.stories.tsx** - `src/components/motion/Gestures.stories.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - No corresponding component exists

### DO NOT USE - Legacy Components

53. **Select** (legacy) - `src/components/select/legacy/select.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Use `Select` from `src/COMPOSITION/controls/Select/Select.tsx` instead

54. **Textarea** (legacy) - `src/components/textarea/legacy/textarea.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Use `Textarea` from `src/components/textarea/Textarea.tsx` instead

### DO NOT USE - Product / Domain Components

55. **EventCard** - `src/components/domain/EventCard/EventCard.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Product/domain-specific components are not canonical UI primitives
    - **Note:** Use `CardBase` for building custom card components

56. **ArtistCard** - `src/PATTERNS/cards/ArtistCard/ArtistCard.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2026-01-01)
    - **Lock Date:** 2026-01-01
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/ARTISTCARD_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in PATTERNS layer, internal component)
    - **Rule:** Domain-specific card component for displaying artist information. Uses CardBase for layout composition.
    - **Note:** Component completed Pipeline 18A (Steps 0-12). All architectural requirements met. Locked via TUNG_DOMAIN_CARDS_STABILITY_LOCK. Internal PATTERNS component (not exported from `src/index.ts`).

57. **CategoryCard** - `src/PATTERNS/cards/CategoryCard/CategoryCard.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2026-01-01)
    - **Audit Report:** `docs/reports/audit/CATEGORYCARD_BASELINE_REPORT.md`
    - **Rule:** Domain-specific card component for displaying category information. Uses CardBase for layout composition.
    - **Note:** Component completed Pipeline 18A (Steps 0-12). All architectural requirements met. Ready for production use.

58. **PromoCard** - `src/components/cards/PromoCard/PromoCard.tsx`
    - **Status:** RESTRICTED
    - **Rule:** DO NOT USE - Product/domain-specific components are not canonical UI primitives
    - **Note:** Use `CardBase` for building custom card components

59. **TicketCard** - `src/PATTERNS/cards/TicketCard/TicketCard.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2026-01-01)
    - **Lock Date:** 2026-01-01
    - **Pipeline:** Pipeline 18A (Steps 0-12 complete)
    - **Audit Report:** `docs/reports/audit/TICKETCARD_BASELINE_REPORT.md`
    - **Lock Type:** PROCESS_LOCK (Component is in PATTERNS layer, internal component)
    - **Rule:** Domain-specific card component for displaying ticket information for Event/Artist/Venue context. Uses CardBase for layout composition.
    - **Note:** Component completed Pipeline 18A (Steps 0-12). All architectural requirements met. Locked via TUNG_DOMAIN_CARDS_STABILITY_LOCK. Internal PATTERNS component (not exported from `src/index.ts`).

60. **VenueCard** - `src/PATTERNS/cards/VenueCard/VenueCard.tsx`
    - **Status:** ✅ **PROCESS LOCKED** (Pipeline 18A Complete)
    - **Lock Date:** 2026-01-01
    - **Audit Report:** `docs/reports/audit/VENUECARD_BASELINE_REPORT.md`
    - **Note:** Domain-specific card component. Pipeline 18A complete. Compliant with architectural standards.

---

## Explicit Rules

### Non-Negotiable Rules

1. **File existence ≠ permission to use**
   - A component file may exist in the repository
   - If it is not listed in ALLOWED sections, it is RESTRICTED
   - If it is listed in RESTRICTED, it is FORBIDDEN

2. **If not listed, it is not allowed**
   - Only components explicitly listed in ALLOWED sections may be used
   - Components not listed anywhere are FORBIDDEN
   - Assumptions about component availability are FORBIDDEN

3. **Foundation components status**
   - Modal is ✅ **LOCKED** (2025-12-20), Tabs is ✅ **PROCESS LOCKED** (Pipeline 18A Complete, Third Pass 2025-12-27), ContextMenu is ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-25), Toast is ✅ **PROCESS LOCKED** (Pipeline 18A Complete, 2025-12-25)
   - Select is ✅ **LOCKED** (Pipeline 18A Complete, 2025-12-25)
   - Button, Link are ✅ **FINAL LOCK** - DO NOT modify, extend, or create alternatives
   - DO NOT import from non-canonical paths

4. **Export status is necessary but NOT sufficient**
   - Export via `src/index.ts` is a prerequisite but does NOT grant permission
   - Permission is granted ONLY by explicit listing in this document's ALLOWED sections
   - Components exported but not listed in ALLOWED sections are RESTRICTED
   - Foundation components are LOCKED regardless of export status

5. **No component duplication**
   - If multiple variants exist, only the exported variant is ALLOWED
   - Non-exported variants are RESTRICTED
   - Use canonical paths only

6. **No speculative usage**
   - DO NOT use components based on file existence
   - DO NOT use components based on Storybook stories
   - DO NOT use components based on historical usage
   - ONLY use components listed in ALLOWED sections

7. **Canonical paths only**
   - Import components from `@tenerife.music/ui` package exports
   - DO NOT import from internal file paths
   - DO NOT import from non-exported locations

8. **This document is law**
   - This document overrides all other sources
   - This document is the single source of truth
   - This document must be consulted before using any component

9. **Product/domain components are not canonical**
   - Product-specific components (EventCard, VenueCard, ArtistCard, etc.) are RESTRICTED
   - Use canonical primitives (CardBase) to build product-specific components
   - DO NOT import or use product/domain components from the UI library

10. **Composition components must use Foundation Layer**
    - Extension compositions (Dialog, NotificationCenter) MUST use Foundation Layer components internally
    - Reimplementation of Foundation Layer behavior is FORBIDDEN
    - Composition components are ALLOWED but must respect Foundation Layer immutability

11. **Extension cannot modify Foundation Authorities**
    - Foundation Authorities are CLOSED and IMMUTABLE
    - Extension MUST comply with all Foundation Authority rules
    - Extension CANNOT override, bypass, or duplicate Foundation functionality
    - Extension CANNOT modify Foundation Authority Contracts
    - Reference: [Extension Authority Contract](./EXTENSION_AUTHORITY.md)

---

## Verification

- [x] All listed components traceable to inventory document
- [x] No new components introduced
- [x] Clear separation between LOCKED / ALLOWED / RESTRICTED
- [x] All Foundation components marked as LOCKED
- [x] All Extension components marked as ALLOWED
- [x] All restricted components marked as DO NOT USE
- [x] Domain components removed from canonical sections
- [x] CardBase remains sole canonical card primitive
- [x] Dialog composition rule is explicit
- [x] Export status rule is non-authoritative
- [x] Explicit rules defined
- [x] No speculative language
- [x] No roadmap or future plans
- [x] Document is normative and declarative

---

## Document Status

**Status:** FINAL  
**Version:** 1.7  
**Last Updated:** 2025-12-27 (List Pipeline 18A Complete PROCESS LOCKED verified)  

This document is **FINAL**. Any changes to this canonical state require explicit architectural review and approval. This document serves as the definitive law for UI component usage in the Extension Layer.

**Related Documents:**
- [Extension Authority Contract](./EXTENSION_AUTHORITY.md) - Extension layer boundary contract
- [FOUNDATION_LOCK.md](./FOUNDATION_LOCK.md) - Foundation lock status (source of truth)

---

## Version History

- **v1.7** (2025-12-25): Input Foundation Lock Complete
  - Input status changed from LEGACY UNLOCKED to ✅ **LOCKED**
  - Lock date: 2025-12-25
  - Pipeline: Pipeline 18A (Steps 0-11 complete)
  - Audit report: `docs/reports/audit/INPUT_BASELINE_REPORT.md`
  - Lock type: FOUNDATION LOCK (Foundation Layer Primitive)
  - Migration complete: Input has completed canonical Foundation Step Pipeline (Steps 0-11) and demonstrates full compliance with all Authority Contracts
  - Rule: Future structural modifications require re-entry into Pipeline 18A
  - Completed formal lock process per Pipeline 18A (Component Review & Improvement Pipeline)

- **v1.6** (2025-12-25): Input Legacy Unlock for Foundation Migration
  - Input status changed from LOCKED to LEGACY UNLOCKED
  - Unlock rationale: Input was declaratively locked without passing canonical Foundation Step Pipeline (0-11)
  - Target status: FOUNDATION LOCK (Foundation Layer Primitive)
  - Migration path: Canonical Foundation lock process (Pipeline 18A, Steps 0-11)
  - Task: TUI_INPUT_FOUNDATION_PIPELINE_18A
  - Path corrected: `src/components/input/Input.tsx` → `src/PRIMITIVES/Input/Input.tsx`
  - Constraints applied: No API expansion, no new variants/sizes, canonicalization only
  - Exit criteria: Complete Steps 0-11, Foundation lock report, Public Type Surface locked

- **v1.6** (2025-12-25): NextLinkAdapter Pipeline 18A Re-execution & PROCESS_LOCK Re-confirmation
  - NextLinkAdapter PROCESS_LOCK re-confirmed after full Pipeline 18A re-execution
  - Pipeline 18A completed (Steps 0-12, full execution including STEP 9)
  - Added 3 canonical Storybook stories (Matrix, States, SizesGallery) for VARIANTS_SIZE_CANON compliance
  - No component code changes required (already compliant)
  - Audit report: `docs/reports/audit/NEXTLINKADAPTER_BASELINE_REPORT.md`
  - Lock re-confirmed: 2025-12-25

- **v1.5** (2025-12-25): Primitives Roadmap Implementation - Separator & AspectRatio
  - Added Separator component (Extension Primitive, Layout Support)
  - Added AspectRatio component (Extension Primitive, Layout Support)
  - Removed Divider from RESTRICTED list (replaced by Separator)
  - Separator: Token-driven, Radix-based, horizontal/vertical orientations, semantic/decorative modes
  - AspectRatio: Pure layout utility, Radix-based, preset ratios (square, video, cinema, portrait, photo, golden)
  - Both components: 100% token compliance, full test coverage, Storybook stories complete
  - Date Completed: 2025-12-25
  - Completed per Primitives Full Pipeline plan

- **v1.4** (2025-12-23): NextLinkAdapter PROCESS_LOCK Applied (Initial)
  - Added NextLinkAdapter to Framework Adapters section
  - NextLinkAdapter status updated to PROCESS_LOCK
  - Pipeline 18A completed (Steps 0-12, STEP 9 skipped)
  - Lock Date: 2025-12-23
  - Audit Report: `docs/reports/audit/NEXTLINKADAPTER_BASELINE_REPORT.md`
  - Completed per TUI_NEXTLINKADAPTER_STEP_12 task

- **v1.5** (2025-12-25): Toast Pipeline 18A Complete
  - Toast has completed canonical Foundation Step Pipeline (Steps 0–12)
  - Toast status changed from LEGACY UNLOCKED to ✅ PROCESS LOCKED
  - Lock Date: 2025-12-25
  - Lock Type: PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
  - Audit Report: `docs/reports/audit/TOAST_BASELINE_REPORT.md`
  - Component demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements
  - Key Decisions: CVA migrated cva → tokenCVA, explicit ToastVariant type exported, type constraints applied (satisfies Record<ToastVariant, string>), custom semantic variants (default/success/info/warning/danger), Radix delegation for all behavior

- **v1.5** (2025-12-25): ContextMenu Pipeline 18A Complete
  - ContextMenu has completed canonical Foundation Step Pipeline (Steps 0–12)
  - ContextMenu status changed from LEGACY UNLOCKED to ✅ PROCESS LOCKED
  - Lock Date: 2025-12-25
  - Lock Type: PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
  - Audit Report: `docs/reports/audit/CONTEXTMENU_BASELINE_REPORT.md`
  - Component demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements
  - Key Decisions: CVA migrated cva → tokenCVA, tone variants (neutral/primary/destructive), size inheritance via Context

- **v1.6** (2025-12-27): Tabs Pipeline 18A Third Pass Complete
  - Tabs has completed third pass of Pipeline 18A (Steps 0–12)
  - All compliance verified, no issues found
  - Lock Date: 2025-12-27 (Third Pass)
  - Component remains PROCESS LOCKED with all compliance verified
  - Audit Report: `docs/reports/audit/TABS_BASELINE_REPORT.md` (updated with third pass)

- **v1.5** (2025-12-25): Tabs Pipeline 18A Second Pass Complete
  - Tabs has completed second pass of Pipeline 18A (Steps 0–12)
  - Status comment updated to reflect LOCKED status (documentation accuracy fix)
  - Lock Date: 2025-12-25 (Second Pass)
  - Component remains PROCESS LOCKED with improved documentation accuracy
  - Audit Report: `docs/reports/audit/TABS_BASELINE_REPORT.md` (updated with second pass)

- **v1.4** (2025-12-23): Tabs Pipeline 18A Complete
  - Tabs has completed canonical Foundation Step Pipeline (Steps 0–12)
  - Tabs status changed from LEGACY UNLOCKED to ✅ PROCESS LOCKED
  - Lock Date: 2025-12-23
  - Lock Type: PROCESS_LOCK (Component is in COMPOSITION layer, not Foundation lock)
  - Audit Report: `docs/reports/audit/TABS_BASELINE_REPORT.md`
  - Component demonstrates full compliance with all Authority Contracts and canonical lifecycle requirements

- **v1.3** (2025-12-19): Legacy Foundation Components Unlock for Canonical Migration
  - Updated Modal, Tabs, ContextMenu, and Toast status from LOCKED to LEGACY UNLOCKED
  - Updated component paths to reflect actual locations (src/COMPOSITION/)
  - Added unlock rationale, migration path, constraints, and exit criteria for each component
  - Updated Foundation Layer Rules section to reflect legacy unlock status
  - Completed per TUNG_FOUNDATION_LEGACY_UNLOCK_01 task

- **v1.2** ( ): Button Foundation Lock (FINAL)
  - Updated Button status to FINAL LOCK ( )
  - Changed Button layer from Extension to FOUNDATION (Primitive)
  - Updated Button path to `src/PRIMITIVES/Button/Button.tsx`
  - Added Button lock report reference
  - Added reference to FOUNDATION_LOCK.md
  - Updated RESTRICTED section Button reference to correct path
  - Completed formal lock process per TUI_BUTTON_STEP_13_FOUNDATION_LOCK_FINAL task

- **v1.1** (2025-12-16): Foundation Authority Alignment
  - Added reference to Extension Authority Contract
  - Updated Foundation Layer section with Foundation CLOSED status
  - Added Foundation Authority compliance rules
  - Clarified that Extension cannot modify Foundation Authorities
  - Added explicit rules about Foundation Authority immutability

- **v1.1** (2025-12-20): Modal Foundation Lock Complete
  - Modal status updated from LEGACY UNLOCKED to ✅ LOCKED
  - Modal has completed canonical Foundation Step Pipeline (Steps 0–13)
  - Lock Date: 2025-12-20
  - Lock Report: `docs/reports/MODAL_FOUNDATION_LOCK_REPORT.md`

- **v1.0** (2025-12-15): Initial canonical state document

---

**End of Canonical State Document**

