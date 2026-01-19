# Surface and Overlay Components Migration

Status: IN_PROGRESS

## Scope
- Components: modal, context-menu, tabs, accordion
- Rule: use only `--tm-*` tokens
- Forbidden: any `--semantic-*` usage

## Component Changes

### modal.ts
- Legacy vars removed: `--background`, `--foreground`, `--border`, `--muted-foreground`, `--card`, `--muted`
- TM tokens used:
  - `--tm-surface-overlay`, `--tm-surface-base`, `--tm-surface-raised`
  - `--tm-text-primary`, `--tm-text-muted`
  - `--tm-border-default`
  - `--tm-muted`
- Notes: modal content uses `--tm-surface-overlay` for overlay surface.

### context-menu.ts
- Legacy vars removed: `--popover`, `--popover-foreground`, `--border`, `--muted-foreground`, `--foreground`
- TM tokens used:
  - `--tm-surface-overlay`
  - `--tm-text-primary`, `--tm-text-muted`
  - `--tm-border-default`
  - `--tm-accent`, `--tm-accent-foreground`
  - `--tm-primary`, `--tm-primary-foreground`
  - `--tm-destructive`, `--tm-destructive-foreground`

### tabs.ts
- Legacy vars removed: `--muted-foreground`, `--muted`, `--foreground`, `--primary`, `--primary-foreground`, `--background`, `--border`, `--ring`
- TM tokens used:
  - `--tm-text-primary`, `--tm-text-muted`
  - `--tm-muted`
  - `--tm-primary`, `--tm-primary-foreground`
  - `--tm-surface-base`
  - `--tm-border-default`
  - `--tm-focus-ring`

### accordion.ts
- Legacy vars removed: `--border`, `--muted-foreground`, `--foreground`, `--muted`, `--background`, `--accent`, `--accent-foreground`, `--ring`
- TM tokens used:
  - `--tm-text-primary`, `--tm-text-muted`
  - `--tm-muted`
  - `--tm-surface-base`
  - `--tm-border-default`
  - `--tm-accent`, `--tm-accent-foreground`
  - `--tm-focus-ring`

## Legacy Usage Audit
- Result: no legacy `var(--...)` references remain in these components.
- Semantic tokens: none used.

## Final Status
- IN_PROGRESS (code migrated, visual checks pending)

## Post-Guard Fixes
- Additional surface var cleanup to satisfy guard:
  - `src/DOMAIN/section-builder/SectionBuilder.tsx` migrated from `--surface-*` to `--tm-surface-*`.
- Runtime class migration across PRIMITIVES/COMPOSITION/PATTERNS/DOMAIN:
  - Legacy semantic Tailwind classes replaced with `--tm-*` equivalents.
  - Guard status: PASS (`pnpm quality:guard:css-vars`).

## Visual Verification
- Status: NOT RUN
- Required checks: default, dark, brand themes; overlay contrast; focus ring; keyboard navigation.

