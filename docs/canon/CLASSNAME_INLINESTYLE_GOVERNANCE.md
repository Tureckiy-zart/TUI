# ClassName & Inline Style Governance

## 1. Context and Current State
- Runtime-safety and canonical composition enforcement are closed and active only in DEV.
- In PROD, these mechanisms do not affect behavior (no-op).
- The className policy exists as a plan and is not finalized.
- PUBLIC_EXPORTS_INVENTORY is the source for future zonal tagging.

Confirmed Facts (Canon):
- DEV-only runtime guards and composition enforcement are described in canonical documents:
  - `docs/canon/RUNTIME_GUARDS_CANON.md`
  - `docs/canon/CANONICAL_COMPOSITION_ENFORCEMENT.md`
  - `docs/canon/TRIGGER_ASCHILD_SAFE_BY_DEFAULT.md`
- These mechanisms do not change PROD behavior.
- The className policy document exists as a plan and contains no code:
  - `docs/canon/CLASSNAME_POLICY_PLAN.md`
- The canonical Box contract fixes the escape hatch role and className/style boundaries:
  - `docs/canon/BOX_CONTRACT.md`
- The Radix Provider exceptions canon fixes Tooltip as the only Provider-required runtime case:
  - `docs/canon/RADIX_PROVIDER_EXCEPTIONS.md`
- The public exports inventory is the source of truth for future zonal tagging:
  - `docs/canon/PUBLIC_EXPORTS_INVENTORY.md`

## 2. Locked Scope and Constraints
### LOCKED SCOPE — Forbidden to Change
**1) Runtime-safety and canonical composition enforcement (DEV-only mechanisms)**
- It is forbidden to change any rules, mechanisms, or their sources. Canon is closed.
- Canon:
  - `docs/canon/RUNTIME_GUARDS_CANON.md`
  - `docs/canon/CANONICAL_COMPOSITION_ENFORCEMENT.md`
  - `docs/canon/TRIGGER_ASCHILD_SAFE_BY_DEFAULT.md`
- Why closed: Canonical documents fix DEV-only behavior and control points; PROD equivalent must remain no-op.
- Related sources (locked by canon):
  - `src/COMPOSITION/utils/runtime-guards.ts`
  - `src/COMPOSITION/overlays/ModalProvider/ModalProvider.tsx`
  - `src/DOMAIN/notifications/NotificationCenter.Provider.tsx`
  - `src/COMPOSITION/layout/Box/Box.tsx`
  - `src/COMPOSITION/navigation/NavRoot/NavRoot.tsx`
  - `src/COMPOSITION/layout/AppHeader/AppHeader.tsx`
  - `src/COMPOSITION/utils/trigger-as-child.ts`
  - `src/COMPOSITION/overlays/Popover.tsx`
  - `src/COMPOSITION/overlays/Tooltip.tsx`
  - `src/COMPOSITION/overlays/Modal/Modal.tsx`
  - `src/COMPOSITION/navigation/Menu/Menu.tsx`
  - `src/COMPOSITION/controls/Select/Select.tsx`
  - `src/COMPOSITION/overlays/ContextMenu/ContextMenu.tsx`

**2) Foundation and Authority locks**
- It is forbidden to change the Foundation layer and Authority contracts without an unlock procedure.
- Canon:
  - `docs/architecture/FOUNDATION_LOCK.md`
  - `docs/architecture/LAYOUT_AUTHORITY.md`
- Why closed: Foundation is marked as LOCKED; Authority contracts are IMMUTABLE and require explicit unlock.

**3) Documentation Canon**
- It is forbidden to change the canonical structure, canon index, and canonical documents.
- Canon:
  - `docs/architecture/DOCUMENTATION_CANON_LOCK.md`
  - `docs/CANONICAL_DOCUMENTATION_INVENTORY.md`
  - Documents in `docs/canon/`:
    - `docs/canon/RUNTIME_GUARDS_CANON.md`
    - `docs/canon/CANONICAL_COMPOSITION_ENFORCEMENT.md`
    - `docs/canon/TRIGGER_ASCHILD_SAFE_BY_DEFAULT.md`
    - `docs/canon/CLASSNAME_POLICY_PLAN.md`
    - `docs/canon/BOX_CONTRACT.md`
    - `docs/canon/PUBLIC_EXPORTS_INVENTORY.md`
- Why closed: The structure and list of canon are the source of truth and are not subject to change within governance.

### ALLOWED SCOPE — What is Permitted
**Allowed:**
- Inventory and audit of `className` usage.
- Inventory and audit of inline `style` usage.
- Documentation and reports in `docs/reports/...`.
- Discussion of the DEV-warn concept in future tasks (without implementation).
- DEV-only telemetry at control points without PROD effects (separate task T06).

**Forbidden even within allowed scope:**
- Any code changes affecting PROD behavior.
- Any new runtime guards.
- Any behavioral changes in PROD.
- Any changes to canonical documents without a separate canonical task.
- Any enforcement logic (lint/throw/auto-blocks).
- Any refactoring or auto-rewriting of className/style.

## 3. DX Observations
- There is no Foundation-level Image/Media primitive in the system today.
- In doc-aware consumer work, the only reliable universal media element is plain `<img>`; HeroMedia can be non-obvious to assemble and its runtime behavior is not a drop-in replacement for a generic image element without explicit guidance.
- HeroMedia is an Extension/Composition capability for hero blocks (media + overlay) and must not be treated as a general-purpose Image primitive.
- Inline styles on `<img>` (and pairing with `AspectRatio` for layout stability) are an accepted, pragmatic escape hatch while a Foundation Image primitive is absent.

## 4. Observations and Conclusions
- No significant findings. The material is for fixing boundaries and the declarative model.

## 5. Decisions Made
- All documentation on className/inline style governance is consolidated in one document.
- DEV-only className/style telemetry is allowed as a separate task (T06) without PROD effect.
- Zonal definitions are fixed as guidance without prohibitions.

## 6. Zonal Model (Foundation / Composition / Domain)
### Zone 1 — Foundation
**Definition:** Fundamental primitives, tokens, and base components defining canonical behavior and visual ground rules.

**Zone Goal:** Stability and uniformity; absence of product specificity.

**Abstraction Level:** Basic building blocks.

**Examples (non-exhaustive):** Button, Text, Input, List, ListItem, tokens, and base types.

### Zone 2 — Composition
**Definition:** Components that compositionally assemble Foundation primitives into repeatable architectural structures (layout/structure/slots) without being product logic.

**Zone Goal:** Managed composition and structure semantics without domain decisions.

**Abstraction Level:** Structural and compositional patterns.

**Examples (non-exhaustive):** Stack, Box, Container, AppHeader, NavRoot, overlay primitives.

### Zone 3 — Domain
**Definition:** Domain, product, or feature-specific components where flexibility is allowed for UX and business tasks.

**Zone Goal:** Adaptation to product scenarios while maintaining compatibility with base rules.

**Abstraction Level:** Product UI logic and scenarios.

**Examples (non-exhaustive):** DomainCard, BillingSummary, ProfileHeader (if they exist in the product part).

## 7. Expectations for className and inline styles
### Zone 1 — Foundation
- **className:** discouraged / risky.
- **inline style:** discouraged / risky, especially with hardcoded values.
- **Why:** To preserve canonical semantics and consistency of base primitives.

### Zone 2 — Composition
- **className:** allowed in limited cases; discouraged for layout/spacing override; risky when bypassing canonical primitives.
- **inline style:** discouraged; preference for CSS vars and built-in composition capabilities.
- **Why:** To not blur the boundaries of compositional responsibility and not create hidden variations.

### Zone 3 — Domain
- **className:** allowed; risky with systematic bypass of tokens and canonical primitives.
- **inline style:** allowed when using CSS vars; risky with hardcoded values.
- **Why:** The zone allows flexibility but must maintain basic consistency with the token system.

### Container sizing guidelines
Container is a layout boundary, not a content-aware component.
Choosing `maxWidth` is the responsibility of the consumer and depends on layout intent.

Recommended guidelines:
- Text / editorial sections: use Container `maxWidth="md"` or `maxWidth="lg"`.
- Feature grids / cards: use Container `maxWidth="xl"`, `maxWidth="2xl"`, or `maxWidth="6xl"`.
- Marketing / landing layouts: use Container `maxWidth="6xl"`.

Using a narrow Container (for example `maxWidth="lg"`) for multi-column grids results in narrow cards and aggressive line wrapping. This is expected behavior, not a bug.

## 8. Edge Cases and Escape Hatches
### Compound components
- The zone is defined by the root component.
- Slots and subcomponents inherit the root zone.

### Wrappers / Adapters
- Classify by purpose.
- If a wrapper does not add domain logic and only assembles Foundation, it is Composition.

### Escape-hatch attributes
- Mentioned as an edge case.
- Not proposed as a mechanism within governance.

### Ambiguous components
- Zone selection criteria: source of responsibility.
- If a component is responsible for layout/structure, it is Composition.
- If a component expresses product logic and scenario, it is Domain.

## 9. Open Questions
No open questions. Cycle closed.

## 10. Governance Outcome
- No enforcement for className and inline style is planned.
- Box is the only conscious escape hatch in the Composition layer.
- Further changes are allowed only with new data (e.g., new telemetry or formal owner request).

## 11. Status and Next Steps
**T01 — Baseline & Scope Lock**
- `task_id`: TUI_CG_T01_BASELINE_SCOPE_LOCK
- `status`: done
- `date`: 2026-02-06
- `summary`: Baseline scope lock report created, no code changes.
- `next_step`: TUI_CG_T02_DEFINE_ZONAL_MODEL

**T02 — Define Zonal Model**
- `task_id`: TUI_CG_T02_DEFINE_ZONAL_MODEL
- `status`: done
- `date`: 2026-02-08
- `summary`: Zonal model defined declaratively, without enforcement or code changes.
- `next_step`: TUI_CG_T03_TAG_PUBLIC_EXPORTS_BY_ZONE

**T03 — Tag Public Exports by Zone**
- `task_id`: TUI_CG_T03_TAG_PUBLIC_EXPORTS_BY_ZONE
- `status`: done
- `date`: 2026-02-08
- `summary`: Public exports tagged by zone in one document.
- `next_step`: TUI_CG_T04_DEFINE_DEV_WARN_STRATEGY

**T04 — Define DEV-only Warning Strategy**
- `task_id`: TUI_CG_T04_DEFINE_DEV_WARN_STRATEGY
- `status`: done
- `date`: 2026-02-08
- `summary`: DEV-only warning strategy defined, without code changes.
- `next_step`: None

**T05 — Enforcement Decision Matrix**
- `task_id`: TUI_CG_T05_ENFORCEMENT_DECISION_MATRIX
- `status`: done
- `date`: 2026-02-08
- `summary`: Decision matrix for enforcement conditions fixed in a separate document.
- `next_step`: TUI_CG_T06_DEV_VISIBILITY_TELEMETRY

**T06 — DEV Visibility & Telemetry**
- `task_id`: TUI_CG_T06_DEV_VISIBILITY_TELEMETRY
- `status`: done
- `date`: 2026-02-09
- `summary`: DEV-only className/style telemetry implemented at control points, without PROD effects.
- `next_step`: TUI_CG_T07_COLLECT_REAL_TELEMETRY_SNAPSHOT

**T07 — Collect Real Telemetry Snapshot**
- `task_id`: TUI_CG_T07_COLLECT_REAL_TELEMETRY_SNAPSHOT
- `status`: done
- `date`: 2026-02-09
- `summary`: Real telemetry snapshot from Storybook recorded in a separate report.
- `next_step`: TUI_CG_T08_BOX_CONTRACT_DOCUMENTATION

**T08 — Box Contract Documentation**
- `task_id`: TUI_CG_T08_BOX_CONTRACT_DOCUMENTATION
- `status`: done
- `date`: 2026-02-09
- `summary`: Canonical Box contract consolidated, links added to canon and governance.
- `next_step`: None

**T09 — Governance Wrap-Up**
- `task_id`: TUI_CG_T09_GOVERNANCE_WRAP_UP
- `status`: done
- `date`: 2026-02-09
- `summary`: Governance cycle closed without enforcement; final outcome fixed.
- `next_step`: None (requires new signal/data)

**Overall next_step:** None (requires new signal/data)

---

**Policy:** SINGLE_SOURCE_OF_TRUTH — all further changes to className/inline style governance are made only in this document.

## 11. Zonal Tagging of Public Exports
### Foundation Exports
#### Types
- Breakpoint — `./types/responsive`
- Responsive — `./types/responsive`

#### Tokens
- accentColors — `./FOUNDATION/tokens`
- baseColors — `./FOUNDATION/tokens`
- chartColors — `./FOUNDATION/tokens`
- colorCSSVariables — `./FOUNDATION/tokens`
- cssVariableColorTokens — `./FOUNDATION/tokens`
- primaryColors — `./FOUNDATION/tokens`
- secondaryColors — `./FOUNDATION/tokens`
- semanticColors — `./FOUNDATION/tokens`
- surfaceColors — `./FOUNDATION/tokens`
- tailwindThemeColors — `./FOUNDATION/tokens`
- textColors — `./FOUNDATION/tokens`
- BaseColorTokens — `./FOUNDATION/tokens`
- ChartColors — `./FOUNDATION/tokens`
- ColorScale — `./FOUNDATION/tokens`
- ColorTokens — `./FOUNDATION/tokens`
- Mode — `./FOUNDATION/tokens`
- SemanticColors — `./FOUNDATION/tokens`
- SurfaceColors — `./FOUNDATION/tokens`
- TextColors — `./FOUNDATION/tokens`
- ALERT_TOKENS — `./FOUNDATION/tokens`
- BUTTON_TOKENS — `./FOUNDATION/tokens`
- CARD_TOKENS — `./FOUNDATION/tokens`
- CHECKBOX_TOKENS — `./FOUNDATION/tokens`
- DATA_TOKENS — `./FOUNDATION/tokens`
- INPUT_TOKENS — `./FOUNDATION/tokens`
- MENU_TOKENS — `./FOUNDATION/tokens`
- MOTION_TOKENS — `./FOUNDATION/tokens`
- NAVIGATION_TOKENS — `./FOUNDATION/tokens`
- NOTIFICATION_TOKENS — `./FOUNDATION/tokens`
- OVERLAY_TOKENS — `./FOUNDATION/tokens`
- PANEL_TOKENS — `./FOUNDATION/tokens`
- POPOVER_TOKENS — `./FOUNDATION/tokens`
- RADIO_TOKENS — `./FOUNDATION/tokens`
- SECTION_TOKENS — `./FOUNDATION/tokens`
- SURFACE_TOKENS — `./FOUNDATION/tokens`
- SWITCH_TOKENS — `./FOUNDATION/tokens`
- TEXT_TOKENS — `./FOUNDATION/tokens`
- TOAST_TOKENS — `./FOUNDATION/tokens`
- TOOLTIP_TOKENS — `./FOUNDATION/tokens`
- type ButtonFontSize — `./FOUNDATION/tokens`
- type ButtonHeight — `./FOUNDATION/tokens`
- type ButtonPaddingHorizontal — `./FOUNDATION/tokens`
- type ButtonPaddingVertical — `./FOUNDATION/tokens`
- type ButtonShadow — `./FOUNDATION/tokens`
- type CardPadding — `./FOUNDATION/tokens`
- type CardRadius — `./FOUNDATION/tokens`
- type CardShadow — `./FOUNDATION/tokens`
- type CardSize — `./FOUNDATION/tokens`
- type CardSpacingVertical — `./FOUNDATION/tokens`
- type CheckboxSize — `./FOUNDATION/tokens`
- type CheckboxState — `./FOUNDATION/tokens`
- type CheckboxVariant — `./FOUNDATION/tokens`
- type MotionDuration as ComponentMotionDuration — `./FOUNDATION/tokens`
- type MotionEasing as ComponentMotionEasing — `./FOUNDATION/tokens`
- type MotionTransition as ComponentMotionTransition — `./FOUNDATION/tokens`
- type DataListLabelWidth — `./FOUNDATION/tokens`
- type DataListRowPadding — `./FOUNDATION/tokens`
- type EmptyStateIconSize — `./FOUNDATION/tokens`
- type InputFontSize — `./FOUNDATION/tokens`
- type InputHeight — `./FOUNDATION/tokens`
- type InputPaddingHorizontal — `./FOUNDATION/tokens`
- type InputPaddingVertical — `./FOUNDATION/tokens`
- type InputRadius — `./FOUNDATION/tokens`
- type InputSize — `./FOUNDATION/tokens`
- type MenuContentMinWidth — `./FOUNDATION/tokens`
- type MenuContentPadding — `./FOUNDATION/tokens`
- type MenuContentRadius — `./FOUNDATION/tokens`
- type MenuContentShadow — `./FOUNDATION/tokens`
- type MenuIndicatorOffset — `./FOUNDATION/tokens`
- type MenuIndicatorSize — `./FOUNDATION/tokens`
- type MenuItemGap — `./FOUNDATION/tokens`
- type MenuItemHeight — `./FOUNDATION/tokens`
- type MenuItemPadding — `./FOUNDATION/tokens`
- type MenuItemRadius — `./FOUNDATION/tokens`
- type MenuLabelPadding — `./FOUNDATION/tokens`
- type MenuSeparatorMargin — `./FOUNDATION/tokens`
- type MotionAnimation — `./FOUNDATION/tokens`
- type MotionTransitionPreset — `./FOUNDATION/tokens`
- type NavigationItemPadding — `./FOUNDATION/tokens`
- type NavigationListGap — `./FOUNDATION/tokens`
- type NavigationRadius — `./FOUNDATION/tokens`
- type NavigationShadow — `./FOUNDATION/tokens`
- type NavigationSize — `./FOUNDATION/tokens`
- type NavigationState — `./FOUNDATION/tokens`
- type NotificationPanelWidth — `./FOUNDATION/tokens`
- type NotificationVariant as NotificationTokenVariant — `./FOUNDATION/tokens`
- type OverlayBackdropVariant — `./FOUNDATION/tokens`
- type OverlayModalSize — `./FOUNDATION/tokens`
- type PanelPadding — `./FOUNDATION/tokens`
- type PanelRadius — `./FOUNDATION/tokens`
- type PanelShadow — `./FOUNDATION/tokens`
- type PanelTone — `./FOUNDATION/tokens`
- type PopoverArrowOffset — `./FOUNDATION/tokens`
- type PopoverArrowSize — `./FOUNDATION/tokens`
- type PopoverContentPadding — `./FOUNDATION/tokens`
- type PopoverContentRadius — `./FOUNDATION/tokens`
- type PopoverContentShadow — `./FOUNDATION/tokens`
- type PopoverContentWidth — `./FOUNDATION/tokens`
- type RadioSize — `./FOUNDATION/tokens`
- type RadioState — `./FOUNDATION/tokens`
- type RadioVariant — `./FOUNDATION/tokens`
- type SectionGap — `./FOUNDATION/tokens`
- type SectionPadding — `./FOUNDATION/tokens`
- type SkeletonAnimation — `./FOUNDATION/tokens`
- type SkeletonBackground — `./FOUNDATION/tokens`
- type SurfacePadding — `./FOUNDATION/tokens`
- type SurfaceRadius — `./FOUNDATION/tokens`
- type SurfaceShadow — `./FOUNDATION/tokens`
- type SurfaceVariant — `./FOUNDATION/tokens`
- type SwitchSize — `./FOUNDATION/tokens`
- type SwitchState — `./FOUNDATION/tokens`
- type SwitchVariant — `./FOUNDATION/tokens`
- type TableCellPadding — `./FOUNDATION/tokens`
- type TableGap — `./FOUNDATION/tokens`
- type TableHeaderPadding — `./FOUNDATION/tokens`
- type TableRowHeight — `./FOUNDATION/tokens`
- type TableShadow — `./FOUNDATION/tokens`
- type TextFontSize — `./FOUNDATION/tokens`
- type TextFontWeight — `./FOUNDATION/tokens`
- type TextLetterSpacing — `./FOUNDATION/tokens`
- type TextLineHeight — `./FOUNDATION/tokens`
- type ToastVariant — `./FOUNDATION/tokens`
- type TooltipContentRadius — `./FOUNDATION/tokens`
- type TooltipContentShadow — `./FOUNDATION/tokens`
- ICON_TOKENS — `./FOUNDATION/tokens`
- type IconColor — `./FOUNDATION/tokens`
- type IconSize — `./FOUNDATION/tokens`
- type IconStroke — `./FOUNDATION/tokens`
- allCSSVariables — `./FOUNDATION/tokens`
- allCSSVariablesCSS — `./FOUNDATION/tokens`
- generateCSSVariablesCSS — `./FOUNDATION/tokens`
- tokenSystemSummary — `./FOUNDATION/tokens`
- motionCombined — `./FOUNDATION/tokens`
- motionCSSVariables — `./FOUNDATION/tokens`
- motionDurations — `./FOUNDATION/tokens`
- motionEasings — `./FOUNDATION/tokens`
- motionFade — `./FOUNDATION/tokens`
- motionReducedMotion — `./FOUNDATION/tokens`
- motionScale — `./FOUNDATION/tokens`
- motionSlide — `./FOUNDATION/tokens`
- motionTailwindConfig — `./FOUNDATION/tokens`
- motionTransitionProperty — `./FOUNDATION/tokens`
- motionTransitions — `./FOUNDATION/tokens`
- MotionCombinedType — `./FOUNDATION/tokens`
- MotionDuration — `./FOUNDATION/tokens`
- MotionEasing — `./FOUNDATION/tokens`
- MotionSlideDirection — `./FOUNDATION/tokens`
- MotionTransition — `./FOUNDATION/tokens`
- borderRadius — `./FOUNDATION/tokens`
- componentRadius — `./FOUNDATION/tokens`
- radiusCSSVariables — `./FOUNDATION/tokens`
- tailwindRadiusConfig — `./FOUNDATION/tokens`
- BorderRadius — `./FOUNDATION/tokens`
- ComponentRadius — `./FOUNDATION/tokens`
- accentColoredShadows — `./FOUNDATION/tokens`
- componentShadowMapping — `./FOUNDATION/tokens`
- elevationShadows — `./FOUNDATION/tokens`
- focusRings — `./FOUNDATION/tokens`
- glowEffects — `./FOUNDATION/tokens`
- primaryColoredShadows — `./FOUNDATION/tokens`
- shadowBase — `./FOUNDATION/tokens`
- shadowCSSVariables — `./FOUNDATION/tokens`
- shadowOpacity — `./FOUNDATION/tokens`
- tailwindShadowConfig — `./FOUNDATION/tokens`
- ColoredShadow — `./FOUNDATION/tokens`
- ElevationShadow — `./FOUNDATION/tokens`
- FocusRing — `./FOUNDATION/tokens`
- GlowEffect — `./FOUNDATION/tokens`
- layoutSpacing — `./FOUNDATION/tokens`
- semanticSpacing — `./FOUNDATION/tokens`
- spacing — `./FOUNDATION/tokens`
- spacingCSSVariables — `./FOUNDATION/tokens`
- tailwindSpacingConfig — `./FOUNDATION/tokens`
- ComponentSpacing — `./FOUNDATION/tokens`
- ContainerSpacing — `./FOUNDATION/tokens`
- GridSpacing — `./FOUNDATION/tokens`
- SectionSpacing — `./FOUNDATION/tokens`
- SemanticSpacing — `./FOUNDATION/tokens`
- Spacing — `./FOUNDATION/tokens`
- StackSpacing — `./FOUNDATION/tokens`
- UI_COLORS — `./FOUNDATION/tokens`
- fontFamily — `./FOUNDATION/tokens`
- fontSize — `./FOUNDATION/tokens`
- fontSizeWithMd — `./FOUNDATION/tokens`
- fontWeight — `./FOUNDATION/tokens`
- letterSpacing — `./FOUNDATION/tokens`
- lineHeight — `./FOUNDATION/tokens`
- tailwindTypographyConfig — `./FOUNDATION/tokens`
- textStyles — `./FOUNDATION/tokens`
- typographyCSSVariables — `./FOUNDATION/tokens`
- CanonicalFontSize — `./FOUNDATION/tokens`
- CanonicalFontWeight — `./FOUNDATION/tokens`
- CanonicalLetterSpacing — `./FOUNDATION/tokens`
- CanonicalLineHeight — `./FOUNDATION/tokens`
- CanonicalTextColor — `./FOUNDATION/tokens`
- FontFamily — `./FOUNDATION/tokens`
- FontSize — `./FOUNDATION/tokens`
- FontWeight — `./FOUNDATION/tokens`
- LetterSpacing — `./FOUNDATION/tokens`
- LineHeight — `./FOUNDATION/tokens`
- TextStyle — `./FOUNDATION/tokens`
- ResponsiveAspectRatio — `./FOUNDATION/tokens`
- ResponsiveDelay — `./FOUNDATION/tokens`
- ARTIST_TOKENS — `./FOUNDATION/tokens/components/artist`
- DATA_LIST_TOKENS — `./FOUNDATION/tokens/components/data-list`
- DOMAIN_TOKENS — `./FOUNDATION/tokens/components/domain`
- EMPTY_STATE_TOKENS — `./FOUNDATION/tokens/components/empty-state`
- FILE_UPLOAD_TOKENS — `./FOUNDATION/tokens/components/file-upload`
- SIMPLETABLE_TOKENS — `./FOUNDATION/tokens/components/simple-table`
- SPINNER_TOKENS — `./FOUNDATION/tokens/components/spinner`
- TABLE_TOKENS — `./FOUNDATION/tokens/components/table`
- TIMELINE_TOKENS — `./FOUNDATION/tokens/components/timeline`
- GRADIENT_TOKENS — `./FOUNDATION/tokens/gradients`

#### Primitives
- Button — `./PRIMITIVES/Button`
- type ButtonProps — `./PRIMITIVES/Button`
- IconButton — `./PRIMITIVES/IconButton`
- type IconButtonProps — `./PRIMITIVES/IconButton`
- Text — `./PRIMITIVES/Text`
- textVariants — `./PRIMITIVES/Text`
- type TextProps — `./PRIMITIVES/Text`
- type TextSize — `./PRIMITIVES/Text`
- type TextWeight — `./PRIMITIVES/Text`
- HelperText — `./PRIMITIVES/HelperText`
- type HelperTextProps — `./PRIMITIVES/HelperText`
- Alert — `./PRIMITIVES/Alert`
- ALERT_VARIANTS — `./PRIMITIVES/Alert`
- alertVariants — `./PRIMITIVES/Alert`
- type AlertProps — `./PRIMITIVES/Alert`
- type AlertVariant — `./PRIMITIVES/Alert`
- Link — `./PRIMITIVES/Link`
- linkVariants — `./PRIMITIVES/Link`
- type LinkProps — `./PRIMITIVES/Link`
- type LinkSize — `./PRIMITIVES/Link`
- type LinkVariant — `./PRIMITIVES/Link`
- NavLink — `./PRIMITIVES/NavLink`
- type NavLinkProps — `./PRIMITIVES/NavLink`
- Badge — `./PRIMITIVES/Badge`
- BADGE_VARIANTS — `./PRIMITIVES/Badge`
- badgeVariants — `./PRIMITIVES/Badge`
- type BadgeProps — `./PRIMITIVES/Badge`
- type BadgeVariant — `./PRIMITIVES/Badge`
- Heading — `./PRIMITIVES/Heading`
- headingVariants — `./PRIMITIVES/Heading`
- type HeadingProps — `./PRIMITIVES/Heading`
- Checkbox — `./PRIMITIVES/Checkbox`
- checkboxVariants — `./PRIMITIVES/Checkbox`
- type CheckboxProps — `./PRIMITIVES/Checkbox`
- ErrorText — `./PRIMITIVES/ErrorText`
- type ErrorTextProps — `./PRIMITIVES/ErrorText`
- Field — `./PRIMITIVES/Field`
- type FieldControlProps — `./PRIMITIVES/Field`
- type FieldDescriptionProps — `./PRIMITIVES/Field`
- type FieldErrorProps — `./PRIMITIVES/Field`
- type FieldLabelProps — `./PRIMITIVES/Field`
- type FieldProps — `./PRIMITIVES/Field`
- FormGroup — `./PRIMITIVES/FormGroup`
- type FormGroupProps — `./PRIMITIVES/FormGroup`
- Input — `./PRIMITIVES/Input`
- inputVariants — `./PRIMITIVES/Input`
- type InputProps — `./PRIMITIVES/Input`
- Label — `./PRIMITIVES/Label`
- type LabelProps — `./PRIMITIVES/Label`
- Radio — `./PRIMITIVES/Radio`
- RadioGroup — `./PRIMITIVES/Radio`
- radioVariants — `./PRIMITIVES/Radio`
- type RadioGroupProps — `./PRIMITIVES/Radio`
- type RadioProps — `./PRIMITIVES/Radio`
- Switch — `./PRIMITIVES/Switch`
- type SwitchProps — `./PRIMITIVES/Switch`
- Textarea — `./PRIMITIVES/Textarea`
- textareaVariants — `./PRIMITIVES/Textarea`
- type TextareaProps — `./PRIMITIVES/Textarea`
- Skeleton — `./PRIMITIVES/Skeleton`
- skeletonVariants — `./PRIMITIVES/Skeleton`
- type SkeletonProps — `./PRIMITIVES/Skeleton`
- type SkeletonVariant — `./PRIMITIVES/Skeleton`
- Progress — `./PRIMITIVES/Progress`
- type ProgressProps — `./PRIMITIVES/Progress`
- type ProgressSize — `./PRIMITIVES/Progress`
- Icon — `./PRIMITIVES/Icon`
- iconVariants — `./PRIMITIVES/Icon`
- type IconProps — `./PRIMITIVES/Icon`

#### Foundation Utils
- debounce — `./FOUNDATION/lib/utils`
- formatDate — `./FOUNDATION/lib/utils`
- formatDateTime — `./FOUNDATION/lib/utils`
- formatTime — `./FOUNDATION/lib/utils`
- generateId — `./FOUNDATION/lib/utils`
- throttle — `./FOUNDATION/lib/utils`
- getBaseValue — `./FOUNDATION/lib/responsive-props`
- getDelayMs — `./FOUNDATION/lib/responsive-props`
- getDurationMs — `./FOUNDATION/lib/responsive-props`
- getRadiusCSSVar — `./FOUNDATION/lib/responsive-props`

#### Foundation Motion
- useSwipe — `./FOUNDATION/theme/motion/gestures`

### Composition Exports
#### Composition / Actions
- ButtonGroup — `./COMPOSITION/actions`
- useButtonGroupContext — `./COMPOSITION/actions`
- type ButtonGroupProps — `./COMPOSITION/actions`

#### Composition / Overlays
- Chip — `./COMPOSITION/overlays/Chip`
- CHIP_RADIUS_VALUES — `./COMPOSITION/overlays/Chip`
- CHIP_VARIANTS — `./COMPOSITION/overlays/Chip`
- chipVariants — `./COMPOSITION/overlays/Chip`
- type ChipProps — `./COMPOSITION/overlays/Chip`
- type ChipRadius — `./COMPOSITION/overlays/Chip`
- type ChipVariant — `./COMPOSITION/overlays/Chip`
- Modal — `./COMPOSITION/overlays/Modal`
- ModalClose — `./COMPOSITION/overlays/Modal`
- ModalContent — `./COMPOSITION/overlays/Modal`
- ModalDescription — `./COMPOSITION/overlays/Modal`
- ModalFooter — `./COMPOSITION/overlays/Modal`
- ModalHeader — `./COMPOSITION/overlays/Modal`
- ModalOverlay — `./COMPOSITION/overlays/Modal`
- ModalRoot — `./COMPOSITION/overlays/Modal`
- ModalTitle — `./COMPOSITION/overlays/Modal`
- ModalTrigger — `./COMPOSITION/overlays/Modal`
- type ModalCloseProps — `./COMPOSITION/overlays/Modal`
- type ModalContentProps — `./COMPOSITION/overlays/Modal`
- type ModalDescriptionProps — `./COMPOSITION/overlays/Modal`
- type ModalFooterProps — `./COMPOSITION/overlays/Modal`
- type ModalHeaderProps — `./COMPOSITION/overlays/Modal`
- type ModalOverlayProps — `./COMPOSITION/overlays/Modal`
- type ModalRootProps — `./COMPOSITION/overlays/Modal`
- type ModalSize — `./COMPOSITION/overlays/Modal`
- type ModalTitleProps — `./COMPOSITION/overlays/Modal`
- type ModalTriggerProps — `./COMPOSITION/overlays/Modal`
- FileUpload — `./COMPOSITION/overlays/FileUpload/index`
- type FileUploadError — `./COMPOSITION/overlays/FileUpload/index`
- type FileUploadProps — `./COMPOSITION/overlays/FileUpload/index`
- type FileUploadSize — `./COMPOSITION/overlays/FileUpload/index`
- type FileUploadVariant — `./COMPOSITION/overlays/FileUpload/index`
- Accordion — `./COMPOSITION/overlays`
- Backdrop — `./COMPOSITION/overlays`
- Dialog — `./COMPOSITION/overlays`
- DialogBody — `./COMPOSITION/overlays`
- DialogDescription — `./COMPOSITION/overlays`
- DialogFooter — `./COMPOSITION/overlays`
- DialogHeader — `./COMPOSITION/overlays`
- DialogRoot — `./COMPOSITION/overlays`
- DialogTitle — `./COMPOSITION/overlays`
- Drawer — `./COMPOSITION/overlays`
- DrawerBody — `./COMPOSITION/overlays`
- DrawerFooter — `./COMPOSITION/overlays`
- DrawerHeader — `./COMPOSITION/overlays`
- drawerVariants — `./COMPOSITION/overlays`
- ModalContext — `./COMPOSITION/overlays`
- ModalProvider — `./COMPOSITION/overlays`
- Portal — `./COMPOSITION/overlays`
- Toast — `./COMPOSITION/overlays`
- Toaster — `./COMPOSITION/overlays`
- ToastProvider — `./COMPOSITION/overlays`
- ToastViewport — `./COMPOSITION/overlays`
- useModalContext — `./COMPOSITION/overlays`
- withModal — `./COMPOSITION/overlays`
- type AccordionContentProps — `./COMPOSITION/overlays`
- type AccordionItemProps — `./COMPOSITION/overlays`
- type AccordionRootProps — `./COMPOSITION/overlays`
- type AccordionSize — `./COMPOSITION/overlays`
- type AccordionTriggerProps — `./COMPOSITION/overlays`
- type AccordionVariant — `./COMPOSITION/overlays`
- type BackdropProps — `./COMPOSITION/overlays`
- type BackdropVariant — `./COMPOSITION/overlays`
- type DialogBodyProps — `./COMPOSITION/overlays`
- type DialogDescriptionProps — `./COMPOSITION/overlays`
- type DialogFooterProps — `./COMPOSITION/overlays`
- type DialogHeaderProps — `./COMPOSITION/overlays`
- type DialogProps — `./COMPOSITION/overlays`
- type DialogTitleProps — `./COMPOSITION/overlays`
- type DrawerBackdropVariant — `./COMPOSITION/overlays`
- type DrawerBodyProps — `./COMPOSITION/overlays`
- type DrawerFooterProps — `./COMPOSITION/overlays`
- type DrawerHeaderProps — `./COMPOSITION/overlays`
- type DrawerPosition — `./COMPOSITION/overlays`
- type DrawerProps — `./COMPOSITION/overlays`
- type DrawerSize — `./COMPOSITION/overlays`
- type PortalProps — `./COMPOSITION/overlays`
- type ToastAction — `./COMPOSITION/overlays`
- type ToastData — `./COMPOSITION/overlays`
- type ToastOptions — `./COMPOSITION/overlays`
- type ToastPosition — `./COMPOSITION/overlays`
- type ToastProps — `./COMPOSITION/overlays`
- type ToastProviderProps — `./COMPOSITION/overlays`
- type ToastViewportProps — `./COMPOSITION/overlays`
- Combobox — `./COMPOSITION/overlays/Combobox`
- ComboboxInput — `./COMPOSITION/overlays/Combobox`
- ComboboxList — `./COMPOSITION/overlays/Combobox`
- ComboboxRoot — `./COMPOSITION/overlays/Combobox`
- type ComboboxInputProps — `./COMPOSITION/overlays/Combobox`
- type ComboboxListProps — `./COMPOSITION/overlays/Combobox`
- type ComboboxOption — `./COMPOSITION/overlays/Combobox`
- type ComboboxRootProps — `./COMPOSITION/overlays/Combobox`
- type ComboboxSize — `./COMPOSITION/overlays/Combobox`
- Popover — `./COMPOSITION/overlays/Popover`
- PopoverAnchor — `./COMPOSITION/overlays/Popover`
- PopoverContent — `./COMPOSITION/overlays/Popover`
- popoverContentVariants — `./COMPOSITION/overlays/Popover`
- PopoverTrigger — `./COMPOSITION/overlays/Popover`
- PopoverWrapper — `./COMPOSITION/overlays/Popover`
- type PopoverProps — `./COMPOSITION/overlays/Popover`
- type PopoverSize — `./COMPOSITION/overlays/Popover`
- type PopoverVariant — `./COMPOSITION/overlays/Popover`
- Dropdown — `./COMPOSITION/overlays/Dropdown`
- DROPDOWN_TOKENS — `./COMPOSITION/overlays/Dropdown`
- DropdownContent — `./COMPOSITION/overlays/Dropdown`
- DropdownItem — `./COMPOSITION/overlays/Dropdown`
- DropdownRoot — `./COMPOSITION/overlays/Dropdown`
- DropdownSeparator — `./COMPOSITION/overlays/Dropdown`
- DropdownTrigger — `./COMPOSITION/overlays/Dropdown`
- type DropdownContentProps — `./COMPOSITION/overlays/Dropdown`
- type DropdownItemPadding — `./COMPOSITION/overlays/Dropdown`
- type DropdownItemProps — `./COMPOSITION/overlays/Dropdown`
- type DropdownRootProps — `./COMPOSITION/overlays/Dropdown`
- type DropdownSeparatorProps — `./COMPOSITION/overlays/Dropdown`
- type DropdownTriggerProps — `./COMPOSITION/overlays/Dropdown`
- Tooltip — `./COMPOSITION/overlays/Tooltip`
- TooltipContent — `./COMPOSITION/overlays/Tooltip`
- tooltipContentVariants — `./COMPOSITION/overlays/Tooltip`
- TooltipProvider — `./COMPOSITION/overlays/Tooltip`
- TooltipTrigger — `./COMPOSITION/overlays/Tooltip`
- TooltipWrapper — `./COMPOSITION/overlays/Tooltip`
- type TooltipProps — `./COMPOSITION/overlays/Tooltip`
- type TooltipVariant — `./COMPOSITION/overlays/Tooltip`
- ContextMenu — `./COMPOSITION/overlays`
- ContextMenuCheckboxItem — `./COMPOSITION/overlays`
- ContextMenuContent — `./COMPOSITION/overlays`
- ContextMenuItem — `./COMPOSITION/overlays`
- ContextMenuLabel — `./COMPOSITION/overlays`
- ContextMenuRadioGroup — `./COMPOSITION/overlays`
- ContextMenuRadioItem — `./COMPOSITION/overlays`
- ContextMenuRoot — `./COMPOSITION/overlays`
- ContextMenuSeparator — `./COMPOSITION/overlays`
- ContextMenuSub — `./COMPOSITION/overlays`
- ContextMenuSubContent — `./COMPOSITION/overlays`
- ContextMenuSubTrigger — `./COMPOSITION/overlays`
- ContextMenuTrigger — `./COMPOSITION/overlays`
- type ContextMenuCheckboxItemProps — `./COMPOSITION/overlays`
- type ContextMenuContentProps — `./COMPOSITION/overlays`
- type ContextMenuItemProps — `./COMPOSITION/overlays`
- type ContextMenuLabelProps — `./COMPOSITION/overlays`
- type ContextMenuRadioGroupProps — `./COMPOSITION/overlays`
- type ContextMenuRadioItemProps — `./COMPOSITION/overlays`
- type ContextMenuRootProps — `./COMPOSITION/overlays`
- type ContextMenuSeparatorProps — `./COMPOSITION/overlays`
- type ContextMenuSubContentProps — `./COMPOSITION/overlays`
- type ContextMenuSubProps — `./COMPOSITION/overlays`
- type ContextMenuSubTriggerProps — `./COMPOSITION/overlays`
- type ContextMenuTriggerProps — `./COMPOSITION/overlays`
- useFocusLock — `./COMPOSITION/overlays/utils/FocusLock`

#### Composition / Controls
- Select — `./COMPOSITION/controls/Select`
- SelectContent — `./COMPOSITION/controls/Select`
- SelectGroup — `./COMPOSITION/controls/Select`
- SelectIcon — `./COMPOSITION/controls/Select`
- SelectItem — `./COMPOSITION/controls/Select`
- SelectItemIndicator — `./COMPOSITION/controls/Select`
- SelectItemText — `./COMPOSITION/controls/Select`
- SelectLabel — `./COMPOSITION/controls/Select`
- SelectRoot — `./COMPOSITION/controls/Select`
- SelectSeparator — `./COMPOSITION/controls/Select`
- SelectTrigger — `./COMPOSITION/controls/Select`
- SelectValue — `./COMPOSITION/controls/Select`
- SelectViewport — `./COMPOSITION/controls/Select`
- type SelectContentProps — `./COMPOSITION/controls/Select`
- type SelectGroupProps — `./COMPOSITION/controls/Select`
- type SelectIconProps — `./COMPOSITION/controls/Select`
- type SelectItemIndicatorProps — `./COMPOSITION/controls/Select`
- type SelectItemProps — `./COMPOSITION/controls/Select`
- type SelectItemTextProps — `./COMPOSITION/controls/Select`
- type SelectLabelProps — `./COMPOSITION/controls/Select`
- type SelectRootProps — `./COMPOSITION/controls/Select`
- type SelectSeparatorProps — `./COMPOSITION/controls/Select`
- type SelectTriggerProps — `./COMPOSITION/controls/Select`
- type SelectValueProps — `./COMPOSITION/controls/Select`
- type SelectViewportProps — `./COMPOSITION/controls/Select`
- MultiSelect — `./COMPOSITION/controls/MultiSelect/MultiSelect.index`
- type MultiSelectOption — `./COMPOSITION/controls/MultiSelect/MultiSelect.index`
- type MultiSelectProps — `./COMPOSITION/controls/MultiSelect/MultiSelect.index`
- type MultiSelectSize — `./COMPOSITION/controls/MultiSelect/MultiSelect.index`
- Avatar — `./COMPOSITION/controls/Avatar`
- AvatarGroup — `./COMPOSITION/controls/Avatar`
- type AvatarGroupProps — `./COMPOSITION/controls/Avatar`
- type AvatarGroupSpacing — `./COMPOSITION/controls/Avatar`
- type AvatarProps — `./COMPOSITION/controls/Avatar`
- type AvatarShape — `./COMPOSITION/controls/Avatar`
- type AvatarSize — `./COMPOSITION/controls/Avatar`
- type AvatarStatus — `./COMPOSITION/controls/Avatar`
- LanguageSelector — `./COMPOSITION/controls`
- type LanguageSelectorProps — `./COMPOSITION/controls`
- RangeSlider — `./COMPOSITION/controls/RangeSlider`
- type RangeSliderProps — `./COMPOSITION/controls/RangeSlider`
- type RangeSliderSize — `./COMPOSITION/controls/RangeSlider`
- type RangeSliderVariant — `./COMPOSITION/controls/RangeSlider`
- Slider — `./COMPOSITION/controls/Slider`
- type SliderProps — `./COMPOSITION/controls/Slider`
- type SliderSize — `./COMPOSITION/controls/Slider`
- type SliderVariant — `./COMPOSITION/controls/Slider`
- Separator — `./COMPOSITION/controls/Separator`
- separatorVariants — `./COMPOSITION/controls/Separator`
- type SeparatorProps — `./COMPOSITION/controls/Separator`
- ASPECT_RATIO_PRESETS — `./COMPOSITION/controls/AspectRatio`
- AspectRatio — `./COMPOSITION/controls/AspectRatio`
- type AspectRatioPreset — `./COMPOSITION/controls/AspectRatio`
- type AspectRatioProps — `./COMPOSITION/controls/AspectRatio`
- Spinner — `./COMPOSITION/controls/Spinner/Spinner`
- type SpinnerEasing — `./COMPOSITION/controls/Spinner/Spinner`
- type SpinnerLabelPosition — `./COMPOSITION/controls/Spinner/Spinner`
- type SpinnerProps — `./COMPOSITION/controls/Spinner/Spinner`
- type SpinnerSize — `./COMPOSITION/controls/Spinner/Spinner`
- type SpinnerTone — `./COMPOSITION/controls/Spinner/Spinner`
- type SpinnerVariant — `./COMPOSITION/controls/Spinner/Spinner`

#### Composition / Carousel
- Carousel — `./COMPOSITION/carousel`
- type CarouselIndicatorsProps — `./COMPOSITION/carousel`
- type CarouselNextProps — `./COMPOSITION/carousel`
- type CarouselOrientation — `./COMPOSITION/carousel`
- type CarouselPrevProps — `./COMPOSITION/carousel`
- type CarouselProps — `./COMPOSITION/carousel`
- type CarouselRootProps — `./COMPOSITION/carousel`
- type CarouselSlideProps — `./COMPOSITION/carousel`
- type CarouselTrackProps — `./COMPOSITION/carousel`

#### Composition / Hero
- HeroMedia — `./COMPOSITION/hero`
- type HeroMediaAspect — `./COMPOSITION/hero`
- type HeroMediaMediaProps — `./COMPOSITION/hero`
- type HeroMediaOverlayAlign — `./COMPOSITION/hero`
- type HeroMediaOverlayPosition — `./COMPOSITION/hero`
- type HeroMediaOverlayProps — `./COMPOSITION/hero`
- type HeroMediaRootProps — `./COMPOSITION/hero`
- type HeroMediaSize — `./COMPOSITION/hero`
- type HeroMediaType — `./COMPOSITION/hero`

#### Composition / OverlaySlot
- OverlaySlot — `./COMPOSITION/overlay`
- type OverlaySlotAnchorProps — `./COMPOSITION/overlay`
- type OverlaySlotItemProps — `./COMPOSITION/overlay`
- type OverlaySlotPosition — `./COMPOSITION/overlay`
- type OverlaySlotRootProps — `./COMPOSITION/overlay`

#### Composition / Responsive
- ResponsiveVisibility — `./COMPOSITION/responsive`
- type ResponsiveVisibilityBelowProps — `./COMPOSITION/responsive`
- type ResponsiveVisibilityFromProps — `./COMPOSITION/responsive`
- type ResponsiveVisibilityOnlyProps — `./COMPOSITION/responsive`
- type ResponsiveVisibilityRootProps — `./COMPOSITION/responsive`

#### Composition / InverseTypography
- InverseTypography — `./COMPOSITION/inverse-typography`
- type InverseTypographyRootProps — `./COMPOSITION/inverse-typography`

#### Composition / SurfaceElevation
- SurfaceElevation — `./COMPOSITION/surface-elevation`
- SurfaceElevationCompositionReference — `./COMPOSITION/surface-elevation`
- useSurfaceElevation — `./COMPOSITION/surface-elevation`
- type SurfaceElevationCompositionReferenceProps — `./COMPOSITION/surface-elevation`
- type SurfaceElevationLevel — `./COMPOSITION/surface-elevation`
- type SurfaceElevationRootProps — `./COMPOSITION/surface-elevation`

#### Composition / A11y
- VisuallyHidden — `./COMPOSITION/a11y/VisuallyHidden`
- type VisuallyHiddenProps — `./COMPOSITION/a11y/VisuallyHidden`

#### Composition / Focus
- FocusTrap — `./COMPOSITION/focus/FocusTrap/FocusTrap.index`
- type FocusTrapProps — `./COMPOSITION/focus/FocusTrap/FocusTrap.index`

#### Composition / Layout
- AppHeader — `./COMPOSITION/layout`
- Box — `./COMPOSITION/layout`
- Column — `./COMPOSITION/layout`
- Container — `./COMPOSITION/layout`
- Divider — `./COMPOSITION/layout`
- dividerVariants — `./COMPOSITION/layout`
- Flex — `./COMPOSITION/layout`
- Footer — `./COMPOSITION/layout`
- Grid — `./COMPOSITION/layout`
- HeaderComposition — `./COMPOSITION/layout`
- Inline — `./COMPOSITION/layout`
- Inset — `./COMPOSITION/layout`
- LinkWithCustomVariant — `./COMPOSITION/layout`
- List — `./COMPOSITION/layout`
- ListItem — `./COMPOSITION/layout`
- listItemVariants — `./COMPOSITION/layout`
- ModeHero — `./COMPOSITION/layout`
- Navbar — `./COMPOSITION/layout`
- Panel — `./COMPOSITION/layout`
- Row — `./COMPOSITION/layout`
- SectionState — `./COMPOSITION/layout`
- SidebarLayout — `./COMPOSITION/layout`
- Spacer — `./COMPOSITION/layout`
- Stack — `./COMPOSITION/layout`
- StickyBar — `./COMPOSITION/layout`
- stickyBarVariants — `./COMPOSITION/layout`
- Surface — `./COMPOSITION/layout`
- surfaceVariants — `./COMPOSITION/layout`
- type AppHeaderActionsProps — `./COMPOSITION/layout`
- type AppHeaderAppearance — `./COMPOSITION/layout`
- type AppHeaderBrandProps — `./COMPOSITION/layout`
- type AppHeaderDivider — `./COMPOSITION/layout`
- type AppHeaderElevation — `./COMPOSITION/layout`
- type AppHeaderNavProps — `./COMPOSITION/layout`
- type AppHeaderPosition — `./COMPOSITION/layout`
- type AppHeaderProps — `./COMPOSITION/layout`
- type BoxProps — `./COMPOSITION/layout`
- type CollapseBreakpoint — `./COMPOSITION/layout`
- type ColumnProps — `./COMPOSITION/layout`
- type ContainerProps — `./COMPOSITION/layout`
- type DividerOrientation — `./COMPOSITION/layout`
- type DividerProps — `./COMPOSITION/layout`
- type DividerTone — `./COMPOSITION/layout`
- type FlexProps — `./COMPOSITION/layout`
- type FooterProps — `./COMPOSITION/layout`
- type GridProps — `./COMPOSITION/layout`
- type HeaderCompositionProps — `./COMPOSITION/layout`
- type InlineProps — `./COMPOSITION/layout`
- type InsetProps — `./COMPOSITION/layout`
- type ListAs — `./COMPOSITION/layout`
- type ListItemAlign — `./COMPOSITION/layout`
- type ListItemAs — `./COMPOSITION/layout`
- type ListItemProps — `./COMPOSITION/layout`
- type ListProps — `./COMPOSITION/layout`
- type ModeHeroProps — `./COMPOSITION/layout`
- type NavbarProps — `./COMPOSITION/layout`
- type PanelProps — `./COMPOSITION/layout`
- type ResponsiveAlignment — `./COMPOSITION/layout`
- type ResponsiveColor — `./COMPOSITION/layout`
- type ResponsiveColumns — `./COMPOSITION/layout`
- type ResponsiveJustify — `./COMPOSITION/layout`
- type ResponsiveRadius — `./COMPOSITION/layout`
- type ResponsiveRows — `./COMPOSITION/layout`
- type ResponsiveSpacing — `./COMPOSITION/layout`
- type RowProps — `./COMPOSITION/layout`
- type SectionStateProps — `./COMPOSITION/layout`
- type SidebarLayoutProps — `./COMPOSITION/layout`
- type SidebarPosition — `./COMPOSITION/layout`
- type SidebarWidth — `./COMPOSITION/layout`
- type SpacerOrientation — `./COMPOSITION/layout`
- type SpacerProps — `./COMPOSITION/layout`
- type SpacingValue — `./COMPOSITION/layout`
- type StackProps — `./COMPOSITION/layout`
- type StickyBarPosition — `./COMPOSITION/layout`
- type StickyBarProps — `./COMPOSITION/layout`
- type StickyBarTone — `./COMPOSITION/layout`
- type SurfaceProps — `./COMPOSITION/layout`
- Card — `./COMPOSITION/layout`
- CardBody — `./COMPOSITION/layout`
- CardFooter — `./COMPOSITION/layout`
- CardHeader — `./COMPOSITION/layout`
- Surface as ContainerSurface — `./COMPOSITION/layout`
- surfaceVariants as containerSurfaceVariants — `./COMPOSITION/layout`
- ContentShell — `./COMPOSITION/layout`
- PageHeader — `./COMPOSITION/layout`
- Section — `./COMPOSITION/layout`
- type CardBodyProps — `./COMPOSITION/layout`
- type CardFooterProps — `./COMPOSITION/layout`
- type CardHeaderProps — `./COMPOSITION/layout`
- type CardProps — `./COMPOSITION/layout`
- type SurfaceProps as ContainerSurfaceProps — `./COMPOSITION/layout`
- type ContentShellProps — `./COMPOSITION/layout`
- type PageHeaderProps — `./COMPOSITION/layout`
- type SectionProps — `./COMPOSITION/layout`

#### Hooks
- useGlobalToast — `./hooks/useGlobalToast`
- useLocalToast — `./hooks/useToast`

#### Patterns
- HoverCardContent — `./PATTERNS/menus`
- HoverCardRoot — `./PATTERNS/menus`
- HoverCardTrigger — `./PATTERNS/menus`
- type HoverCardContentProps — `./PATTERNS/menus`
- type HoverCardRootProps — `./PATTERNS/menus`
- type HoverCardTriggerProps — `./PATTERNS/menus`
- DataList — `./PATTERNS`
- DataListItem — `./PATTERNS`
- DataListLabel — `./PATTERNS`
- DataListRoot — `./PATTERNS`
- DataListValue — `./PATTERNS`
- EmptyState — `./PATTERNS`
- EmptyStateAction — `./PATTERNS`
- EmptyStateDescription — `./PATTERNS`
- EmptyStateIcon — `./PATTERNS`
- EmptyStateTitle — `./PATTERNS`
- TableRoot as Table — `./PATTERNS`
- TableBody — `./PATTERNS`
- TableCell — `./PATTERNS`
- TableEmpty — `./PATTERNS`
- TableExpandableContent — `./PATTERNS`
- TableHead — `./PATTERNS`
- TableHeader — `./PATTERNS`
- TableLoadingState — `./PATTERNS`
- TableRoot — `./PATTERNS`
- TableRow — `./PATTERNS`
- TableSortIcon — `./PATTERNS`
- useTableContext — `./PATTERNS`
- type DataListItemProps — `./PATTERNS`
- type DataListLabelProps — `./PATTERNS`
- type DataListRootProps — `./PATTERNS`
- type DataListValueProps — `./PATTERNS`
- type EmptyStateActionProps — `./PATTERNS`
- type EmptyStateDescriptionProps — `./PATTERNS`
- type EmptyStateIconProps — `./PATTERNS`
- type EmptyStateProps — `./PATTERNS`
- type EmptyStateTitleProps — `./PATTERNS`
- type SortDirection — `./PATTERNS`
- type SortState — `./PATTERNS`
- type TableBodyProps — `./PATTERNS`
- type TableCellProps — `./PATTERNS`
- type TableColumn — `./PATTERNS`
- type TableContextValue — `./PATTERNS`
- type TableEmptyProps — `./PATTERNS`
- type TableExpandableContentProps — `./PATTERNS`
- type TableHeaderProps — `./PATTERNS`
- type TableHeadProps — `./PATTERNS`
- type TableLoadingStateProps — `./PATTERNS`
- type TableRootProps — `./PATTERNS`
- type TableRowProps — `./PATTERNS`
- type TableSortIconProps — `./PATTERNS`

#### Composition / Navigation
- Breadcrumbs — `./COMPOSITION/navigation`
- Menu — `./COMPOSITION/navigation`
- MenuContent — `./COMPOSITION/navigation`
- MenuGroup — `./COMPOSITION/navigation`
- MenuItem — `./COMPOSITION/navigation`
- MenuLabel — `./COMPOSITION/navigation`
- MenuRoot — `./COMPOSITION/navigation`
- MenuSeparator — `./COMPOSITION/navigation`
- MenuTrigger — `./COMPOSITION/navigation`
- NavItem — `./COMPOSITION/navigation`
- NavList — `./COMPOSITION/navigation`
- NavRoot — `./COMPOSITION/navigation`
- NavSeparator — `./COMPOSITION/navigation`
- NavText — `./COMPOSITION/navigation`
- Pagination — `./COMPOSITION/navigation`
- SearchBar — `./COMPOSITION/navigation`
- SegmentedControl — `./COMPOSITION/navigation`
- segmentedControlItemVariants — `./COMPOSITION/navigation`
- segmentedControlRootVariants — `./COMPOSITION/navigation`
- Stepper — `./COMPOSITION/navigation`
- Tabs — `./COMPOSITION/navigation`
- type BreadcrumbItem — `./COMPOSITION/navigation`
- type BreadcrumbsItemProps — `./COMPOSITION/navigation`
- type BreadcrumbsRootProps — `./COMPOSITION/navigation`
- type BreadcrumbsSeparatorProps — `./COMPOSITION/navigation`
- type MenuContentProps — `./COMPOSITION/navigation`
- type MenuGroupProps — `./COMPOSITION/navigation`
- type MenuItemProps — `./COMPOSITION/navigation`
- type MenuLabelProps — `./COMPOSITION/navigation`
- type MenuRootProps — `./COMPOSITION/navigation`
- type MenuSeparatorProps — `./COMPOSITION/navigation`
- type MenuTriggerProps — `./COMPOSITION/navigation`
- type NavItemProps — `./COMPOSITION/navigation`
- type NavListProps — `./COMPOSITION/navigation`
- type NavRootProps — `./COMPOSITION/navigation`
- type NavSeparatorProps — `./COMPOSITION/navigation`
- type NavTextProps — `./COMPOSITION/navigation`
- type PaginationEllipsisProps — `./COMPOSITION/navigation`
- type PaginationItemProps — `./COMPOSITION/navigation`
- type PaginationNextProps — `./COMPOSITION/navigation`
- type PaginationPrevProps — `./COMPOSITION/navigation`
- type PaginationRootProps — `./COMPOSITION/navigation`
- type SearchBarProps — `./COMPOSITION/navigation`
- type SegmentedControlItemProps — `./COMPOSITION/navigation`
- type SegmentedControlOrientation — `./COMPOSITION/navigation`
- type SegmentedControlRootProps — `./COMPOSITION/navigation`
- type SegmentedControlSize — `./COMPOSITION/navigation`
- type StepperContentProps — `./COMPOSITION/navigation`
- type StepperIndicatorProps — `./COMPOSITION/navigation`
- type StepperItemProps — `./COMPOSITION/navigation`
- type StepperLabelProps — `./COMPOSITION/navigation`
- type StepperRootProps — `./COMPOSITION/navigation`
- type StepperStep — `./COMPOSITION/navigation`
- type TabsContentProps — `./COMPOSITION/navigation`
- type TabsListProps — `./COMPOSITION/navigation`
- type TabsRootProps — `./COMPOSITION/navigation`
- type TabsTriggerProps — `./COMPOSITION/navigation`

#### Icons
- IconArrowRight — `./icons`
- IconCalendar — `./icons`
- IconCheck — `./icons`
- IconChevronDown — `./icons`
- IconChevronRight — `./icons`
- IconClose — `./icons`
- IconError — `./icons`
- IconInfo — `./icons`
- IconLocation — `./icons`
- IconMenu — `./icons`
- ICONS_MAP — `./icons`
- IconSearch — `./icons`
- IconSuccess — `./icons`
- IconWarning — `./icons`
- type IconProps as IconComponentProps — `./icons`
- type IconName — `./icons`

#### Composition / Utils
- safeFallback — `./COMPOSITION/utils/runtime-guards`

#### Composition / Motion
- ComponentAnimationConfig — `./COMPOSITION/motion/animation/types`
- resolveComponentAnimations — `./COMPOSITION/motion/animation/utils`

### Domain Exports
#### Domain
- NotificationCenter — `./DOMAIN/notifications`
- NotificationCenterDismissAll — `./DOMAIN/notifications`
- NotificationCenterGroupHeader — `./DOMAIN/notifications`
- NotificationCenterItem — `./DOMAIN/notifications`
- NotificationCenterList — `./DOMAIN/notifications`
- NotificationCenterPanel — `./DOMAIN/notifications`
- NotificationCenterProvider — `./DOMAIN/notifications`
- NotificationCenterTrigger — `./DOMAIN/notifications`
- useNotificationCenter — `./DOMAIN/notifications`
- useNotificationCenterContext — `./DOMAIN/notifications`
- type GroupByFunction — `./DOMAIN/notifications`
- type NotificationCenterDismissAllProps — `./DOMAIN/notifications`
- type NotificationCenterGroupHeaderProps — `./DOMAIN/notifications`
- type NotificationCenterItemProps — `./DOMAIN/notifications`
- type NotificationCenterListProps — `./DOMAIN/notifications`
- type NotificationCenterPanelProps — `./DOMAIN/notifications`
- type NotificationCenterProviderProps — `./DOMAIN/notifications`
- type NotificationCenterTriggerProps — `./DOMAIN/notifications`
- type NotificationChannel — `./DOMAIN/notifications`
- type NotificationContextType — `./DOMAIN/notifications`
- type NotificationData — `./DOMAIN/notifications`
- type NotificationOptions — `./DOMAIN/notifications`
- type NotificationVariant — `./DOMAIN/notifications`

### Unclear / Needs Decision
- Нет.


## 11. DEV Warning Strategy

### 11.1 Warning Matrix

| Zone | className violations | inline style violations |
| --- | --- | --- |
| Foundation | warn | warn |
| Composition | warn | warn |
| Domain | no-op | no-op |

**ViolationType (категории, без enforcement):**
- `className`:
  - layout/spacing utilities override
  - typography/color utilities override
  - positioning/stacking overrides
  - token bypass (не токенные значения)
- `inline style`:
  - hardcoded values (цвета/размеры/spacing)
  - layout overrides (position, display, flex/grid)
  - typography overrides (font/line-height)
  - non-CSS-var values

### 11.2 Responsibility Boundaries
**Предупреждения допустимы только в точках контроля:**
- `as` (семантический контроль)
- `asChild`
- strict slots
- controlled DOM / контролируемые внутренние обёртки

**Источник канона для контрольных точек:**
- `docs/canon/RUNTIME_GUARDS_CANON.md`
- `docs/canon/CANONICAL_COMPOSITION_ENFORCEMENT.md`

### 11.3 Warning Semantics
- DEV-only, диагностические, не блокируют работу.
- Не требуют немедленного исправления.
- Не меняют поведение в PROD.
- Не являются enforcement или запретом.

### 11.4 Canonical Warning Messages
- **Foundation / className**
  - "[TUI DEV WARN] className в зоне Foundation: обнаружено использование в контрольной точке. Рекомендуется использовать канонические props/токены. Зона: Foundation."
- **Foundation / inline style**
  - "[TUI DEV WARN] inline style в зоне Foundation: обнаружены значения вне CSS vars/токенов. Рекомендуется использовать токены. Зона: Foundation."
- **Composition / className**
  - "[TUI DEV WARN] className в зоне Composition: обнаружено обходное оформление структуры/spacing. Рекомендуется использовать канонические примитивы. Зона: Composition."
- **Composition / inline style**
  - "[TUI DEV WARN] inline style в зоне Composition: предпочтительны CSS vars и props композиции. Зона: Composition."

**Примечание:** явных запретов нет, только guidance.
