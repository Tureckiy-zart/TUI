# Canon TM Token Contract v1

This document freezes the Canon TM Token Contract v1 for `@tenerife.music/ui`.
It defines the only required runtime semantic tokens (`--tm-*`). Any other
tokens are non-required and must not be treated as part of the contract.

## Scope

- Applies to theme runtime CSS variables exposed by `applyMode`.
- Runtime applies 100% of required `--tm-*` tokens synchronously on `document.documentElement`.
- Covers semantic runtime tokens only.
- Excludes layout, spacing, radius, typography, shadow, and component domains.

## Contract Rules

- Runtime MUST expose 100% of the tokens listed below.
- Tokens MUST use the `--tm-` prefix.
- Tokens MUST use `-foreground` (no `-fg`).
- No legacy naming (for example: `--background`, `--card`).

## Required Semantic Groups

### Surface

- `--tm-surface-base`
- `--tm-surface-raised`
- `--tm-surface-overlay`

### Text

- `--tm-text-primary`
- `--tm-text-secondary`
- `--tm-text-muted`
- `--tm-text-inverse`

### Border

- `--tm-border-default`
- `--tm-border-strong`

### Focus

- `--tm-focus-ring`

### Color

- `--tm-primary`
- `--tm-primary-foreground`
- `--tm-secondary`
- `--tm-secondary-foreground`
- `--tm-accent`
- `--tm-accent-foreground`
- `--tm-destructive`
- `--tm-destructive-foreground`
- `--tm-muted`
- `--tm-muted-foreground`

### State

- `--tm-disabled`
- `--tm-disabled-foreground`

## Non-Required / Derived Tokens

These tokens MUST NOT be required in v1. Derived or product tokens such as
hover/active/selection/scrim/ring-offset are optional and may be computed from
the core semantic set.

### Presentation Detail

- `--tm-bg`
- `--tm-bg-elev-1`
- `--tm-bg-elev-2`
- `--tm-overlay`
- `--tm-scrim`
- `--tm-fg`
- `--tm-fg-muted`
- `--tm-fg-subtle`
- `--tm-border`
- `--tm-separator`
- `--tm-ring`
- `--tm-ring-offset`

### Derived State

- `--tm-primary-hover`
- `--tm-secondary-hover`
- `--tm-accent-hover`
- `--tm-destructive-hover`
- `--tm-link`
- `--tm-link-hover`
- `--tm-selection-bg`
- `--tm-selection-foreground`

### Product Semantic

- `--tm-success`
- `--tm-success-foreground`
- `--tm-success-hover`
- `--tm-warning`
- `--tm-warning-foreground`
- `--tm-warning-hover`
- `--tm-info`
- `--tm-info-foreground`
- `--tm-info-hover`

## Contract Freeze

`src/FOUNDATION/tokens/required-tokens.ts` is the canonical source of truth for
this contract. Any additions or removals require a new contract version.

## Extensions

Optional tokens are documented below in the Non-Required / Derived section of
this file.
