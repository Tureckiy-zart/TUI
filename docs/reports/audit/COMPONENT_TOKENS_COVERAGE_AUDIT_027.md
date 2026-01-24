# Component Tokens Coverage Audit 027

**Task:** TUI_FOUNDATION_COMPONENT_TOKENS_COVERAGE_AUDIT_027  
**Layer:** FOUNDATION  
**Status:** FACTUAL AUDIT (no changes)  
**Date:** 2026-01-21

## Summary

- Component token files under `src/FOUNDATION/tokens/components/**`: 50
- Token constants detected (`*_TOKENS`) in component tokens: 53
- Token constants with usage count == 1 (definition only): 3
- Token constants with low usage (2–3 total matches): 1

**Definition of counts:** `rg -c` total matches in `src/**` (includes definitions and references in code/comments).

## Section A: Inventory of Component Token Constants

Token constants detected in `src/FOUNDATION/tokens/components/**`:

- `ACCORDION_TOKENS`
- `ALERT_TOKENS`
- `ARTIST_TOKENS`
- `AVATAR_TOKENS`
- `BADGE_TOKENS`
- `BUTTON_TOKENS`
- `CARD_TOKENS`
- `CHECKBOX_TOKENS`
- `CHIP_TOKENS`
- `CODE_TOKENS`
- `CONTEXT_MENU_TOKENS`
- `DATA_LIST_TOKENS`
- `DATA_TOKENS`
- `DIVIDER_TOKENS`
- `DOMAIN_TOKENS`
- `EMPTY_STATE_TOKENS`
- `FILE_UPLOAD_TOKENS`
- `FORM_TOKENS`
- `GRADIENT_TOKENS`
- `ICON_TOKENS`
- `INPUT_TOKENS`
- `LINK_TOKENS`
- `MENU_TOKENS`
- `MODAL_TOKENS`
- `MOTION_TOKENS`
- `NAVIGATION_TOKENS`
- `NOTIFICATION_TOKENS`
- `OVERLAY_TOKENS`
- `PAGINATION_TOKENS`
- `PANEL_TOKENS`
- `POPOVER_TOKENS`
- `PROGRESS_TOKENS`
- `RADIO_TOKENS`
- `RANGESLIDER_TOKENS`
- `SECTION_TOKENS`
- `SELECT_TOKENS`
- `SEPARATOR_TOKENS`
- `SIMPLETABLE_TOKENS`
- `SLIDER_TOKENS`
- `SPINNER_TOKENS`
- `STICKYBAR_TOKENS`
- `SURFACE_TOKENS`
- `SWITCH_TOKENS`
- `TABLE_TOKENS`
- `TABS_TOKENS`
- `TEXTAREA_TOKENS`
- `TEXT_TOKENS`
- `TIMELINE_TOKENS`
- `TOAST_TOKENS`
- `TOOLTIP_TOKENS`

## Section B: Coverage (Usage Counts in src/**)

Per-token usage counts (rg -c totals):

- `ACCORDION_TOKENS`: 62
- `ALERT_TOKENS`: 11
- `ARTIST_TOKENS`: 15
- `AVATAR_TOKENS`: 54
- `BADGE_TOKENS`: 12
- `BUTTON_TOKENS`: 53
- `CARD_TOKENS`: 38
- `CHECKBOX_TOKENS`: 45
- `CHIP_TOKENS`: 79
- `CODE_TOKENS`: 3
- `CONTEXT_MENU_TOKENS`: 54
- `DATA_LIST_TOKENS`: 22
- `DATA_TOKENS`: 36
- `DIVIDER_TOKENS`: 30
- `DOMAIN_TOKENS`: 227
- `EMPTY_STATE_TOKENS`: 24
- `FILE_UPLOAD_TOKENS`: 75
- `FORM_TOKENS`: 7
- `GRADIENT_TOKENS`: 144
- `ICON_TOKENS`: 89
- `INPUT_TOKENS`: 73
- `LINK_TOKENS`: 24
- `MENU_TOKENS`: 105
- `MODAL_TOKENS`: 52
- `MOTION_TOKENS`: 157
- `NAVIGATION_TOKENS`: 169
- `NOTIFICATION_TOKENS`: 22
- `OVERLAY_TOKENS`: 76
- `PAGINATION_TOKENS`: 6
- `PANEL_TOKENS`: 34
- `POPOVER_TOKENS`: 66
- `PROGRESS_TOKENS`: 22
- `RADIO_TOKENS`: 36
- `RANGESLIDER_TOKENS`: 73
- `SECTION_TOKENS`: 6
- `SELECT_TOKENS`: 51
- `SEPARATOR_TOKENS`: 22
- `SIMPLETABLE_TOKENS`: 15
- `SLIDER_TOKENS`: 126
- `SPINNER_TOKENS`: 125
- `STICKYBAR_TOKENS`: 22
- `SURFACE_TOKENS`: 38
- `SWITCH_TOKENS`: 70
- `TABLE_TOKENS`: 68
- `TABS_TOKENS`: 73
- `TEXTAREA_TOKENS`: 33
- `TEXT_TOKENS`: 130
- `TIMELINE_TOKENS`: 14
- `TOAST_TOKENS`: 71
- `TOOLTIP_TOKENS`: 23

## Section C: Zero-Usage and Low-Usage Signals (Factual)

**Definition-only occurrences (count == 1):**
- `RADIUS_TOKENS` (only appears in comment in `src/FOUNDATION/tokens/components/domain.ts`)
- `SHADOW_TOKENS` (only appears in comment in `src/FOUNDATION/tokens/components/domain.ts`)
- `SPACING_TOKENS` (only appears in comment in `src/FOUNDATION/tokens/components/domain.ts`)

**Low-usage occurrences (2–3 matches total):**
- `CODE_TOKENS` (3)

## Section D: Imports / Usage Hotspots (Factual)

Component token usage appears across:
- `src/PRIMITIVES/**`
- `src/COMPOSITION/**`
- `src/PATTERNS/**`
- `src/DOMAIN/**`

Representative import examples (non-exhaustive):
- `@/FOUNDATION/tokens/components/input`
- `@/FOUNDATION/tokens/components/text`
- `@/FOUNDATION/tokens/components/navigation`
- `@/FOUNDATION/tokens/components/overlay`

## Evidence: Commands Executed

- `rg --files src/FOUNDATION/tokens/components`
- `rg -n "export const .*_TOKENS" src/FOUNDATION/tokens/components -g "*.ts"`
- `rg -n "FOUNDATION/tokens/components" src -g "*.ts" -g "*.tsx"`
- `rg -n "_TOKENS" src -g "*.ts" -g "*.tsx"`
- `rg -c -- "*_TOKENS" src`

