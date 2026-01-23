# Semantic Layer Decision (TEMPORARY)

**Status:** TEMPORARY_ALLOWED
**Scope:** Runtime and component usage rules for `--tm-status-*`

## Decision

`--tm-status-*` tokens are a temporary layer outside Canon Core v1. They are not required,
not part of the Canon Core contract, and must not be treated as a substitute for `--tm-*`.

## Allowed Usage

- Validation states (success, error)
- Feedback components (toast, alert, upload, progress)
- Status-only UI

## Forbidden Usage

- Base UI components (Button, Card, Tabs, etc.)
- Layout/surface layers
- Hover/focus/decorative states
- Theme foundation layer

## Governance Rules

- `--tm-status-*` MUST NOT be used as a substitute for `--tm-*`.
- `--tm-status-*` MUST NOT be mapped implicitly to `--tm-*`.
- `--tm-status-*` MUST NOT be used in base components.
- `--tm-status-*` MAY be used only where semantic meaning is explicit and user-facing.

## Enforcement

- Legacy guard allows `--tm-status-*` explicitly while forbidding legacy vars.
- Component reviews must flag semantic usage outside the allowed scope.

## Future Paths (no commitment)

### Path A: Semantic Extension v1

**Conditions**
- Product requires consistent success/error semantics across brands.
- Design defines a semantic palette independent from accent/primary.
- Governance approves an extension contract.

**Outcome**
- `--tm-success`, `--tm-error`, `--tm-warning` introduced as a TM extension.
- `--tm-status-*` deprecated and removed.

### Path B: Semantic Layer Removal

**Conditions**
- Semantic feedback can be resolved at component/brand level.
- No strong need for a global semantic contract.

**Outcome**
- `--tm-status-*` deprecated.
- Usage removed component by component.
- No replacement in TM system.

## Compatibility Notes

- This decision does not change Canon Core v1 or TM_TOKEN_CONTRACT_V1.
- `--tm-status-*` remains non-required and outside the Canon Core contract.
