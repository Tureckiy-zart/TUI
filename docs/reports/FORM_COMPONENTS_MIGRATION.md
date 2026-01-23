# Form Components Migration

**Status:** IN PROGRESS (visual verification pending)

## Scope

- Components: Input, Textarea, Select, Checkbox, Radio, Switch
- Policy: only `--tm-*` in components; `--tm-status-*` allowed only for validation/feedback
- Out of scope: runtime/bridge logic

## Components Processed

### Input

- Legacy vars removed: `--foreground`, `--input`, `--muted-foreground`, `--destructive`, `--destructive-foreground`
- TM tokens used: `--tm-text-primary`, `--tm-surface-base`, `--tm-text-muted`, `--tm-destructive`, `--tm-destructive-foreground`, `--tm-primary`, `--tm-primary-foreground`, `--tm-secondary`, `--tm-secondary-foreground`
- Semantic tokens kept: `--tm-status-success`
- Updated token source: `src/FOUNDATION/tokens/components/input.ts`

### Textarea

- Legacy vars removed: `--input`, `--foreground`, `--card`, `--card-foreground`, `--muted`, `--muted-foreground`, `--destructive`
- TM tokens used: `--tm-surface-base`, `--tm-text-primary`, `--tm-surface-raised`, `--tm-muted`, `--tm-text-muted`, `--tm-destructive`
- Semantic tokens kept: `--tm-status-success`
- Updated token source: `src/FOUNDATION/tokens/components/textarea.ts`

### Select

- Legacy vars removed: `--popover`, `--popover-foreground`, `--border`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--muted`, `--input`, `--foreground`, `--destructive`, `--destructive-foreground`, `--ring`
- TM tokens used: `--tm-surface-overlay`, `--tm-text-primary`, `--tm-border-default`, `--tm-text-muted`, `--tm-accent`, `--tm-accent-foreground`, `--tm-muted`, `--tm-surface-base`, `--tm-destructive`, `--tm-destructive-foreground`, `--tm-focus-ring`
- Semantic tokens kept: none
- Updated token source: `src/FOUNDATION/tokens/components/select.ts`

### Checkbox

- Legacy vars removed: `--input`, `--foreground`, `--muted`, `--muted-foreground`, `--destructive`, `--destructive-foreground`
- TM tokens used: `--tm-surface-base`, `--tm-text-primary`, `--tm-muted`, `--tm-text-muted`, `--tm-destructive`, `--tm-destructive-foreground`, `--tm-primary`, `--tm-primary-foreground`, `--tm-secondary`, `--tm-secondary-foreground`
- Semantic tokens kept: none
- Updated token source: `src/FOUNDATION/tokens/components/checkbox.ts`

### Radio

- Legacy vars removed: `--input`, `--foreground`, `--muted`, `--muted-foreground`, `--destructive`, `--destructive-foreground`
- TM tokens used: `--tm-surface-base`, `--tm-text-primary`, `--tm-muted`, `--tm-text-muted`, `--tm-destructive`, `--tm-destructive-foreground`, `--tm-primary`, `--tm-primary-foreground`, `--tm-secondary`, `--tm-secondary-foreground`
- Semantic tokens kept: none
- Updated token source: `src/FOUNDATION/tokens/components/radio.ts`

### Switch

- Legacy vars removed: `--input`, `--muted`, `--muted-foreground`, `--destructive`, `--destructive-foreground`
- TM tokens used: `--tm-surface-base`, `--tm-muted`, `--tm-text-muted`, `--tm-destructive`, `--tm-destructive-foreground`, `--tm-primary`, `--tm-primary-foreground`, `--tm-secondary`, `--tm-secondary-foreground`
- Semantic tokens kept: none
- Updated token source: `src/FOUNDATION/tokens/components/switch.ts`

## Legacy Usage Audit

- No legacy `--background`/`--card`/`--border`/`--ring`/`--input`/`--foreground` usage remains in form component tokens or implementations.
- Allowed `--tm-status-*` usage retained for validation/feedback: `--tm-status-success` (Input, Textarea).

## Remaining Work

- Visual verification in default/dark/brand themes, including focus, disabled, and validation states.
- If visual checks fail, adjust token mappings in `src/FOUNDATION/tokens/components/*` for the affected component.

## Visual Verification

- Default theme: not run (manual check needed)
- Dark theme: not run (manual check needed)
- Brand theme: not run (manual check needed)
- States: not run (manual check needed)

## Final Status

- IN PROGRESS (visual verification pending)
