# Foundation Component Token Coverage - Decision Snapshot

Layer: FOUNDATION
Status: DECISION SNAPSHOT (NO CODE CHANGES)
Date: 2026-01-21
Based on audits:
- TUI_FOUNDATION_COMPONENT_TOKENS_COVERAGE_AUDIT_027
- TUI_FOUNDATION_TOKEN_DOMAIN_COMPLETENESS_AUDIT_028

## Purpose

This document records an explicit architectural decision regarding component token
coverage in the FOUNDATION layer.

The goal is to:
- prevent unnecessary refactors,
- avoid over-tokenization,
- and clearly distinguish intentional absence of component tokens from actual
  coverage gaps.

## High-Level Conclusion

The current component token system is healthy, complete, and fit for purpose.

No corrective action is required.
No refactoring is approved.
Observed gaps are intentional and structurally valid.
This snapshot exists to lock the interpretation, not to trigger changes.

## Component Classification Decision

### Category A - Intentionally Tokenless Components

These components are structural, layout, or utility-driven and do not represent
visual semantics that require component token abstraction.

Examples include (non-exhaustive):
- Layout primitives: Box, Flex, Grid, Stack, Spacer, Container, Inline, Inset
- Structural helpers: Portal, FocusTrap, VisuallyHidden

Decision:
- No component tokens required
- Tokenization here is explicitly disallowed
- Direct use of foundation tokens is correct

### Category B - Composite / Domain Components (Optional Tokens)

These components primarily compose existing primitives and patterns and do not
define new visual semantics.

Examples include:
- Section builders and presets
- Notification center orchestration
- High-level domain sections (Hero, CTA, Feature, etc.)

Decision:
- Component tokens are optional
- Absence of _TOKENS is not a defect
- Token introduction may happen later only if new semantic styling emerges

### Category C - Visual Primitives Without Component Tokens

Certain visual primitives currently rely on foundation/base tokens directly.

Examples include:
- ErrorText
- Field
- FormGroup
- NavLink
- RadioGroup

Decision:
- This is a known and accepted state
- These components are candidates for future tokenization, not requirements
- No enforcement or migration is planned at this stage

## Low-Usage and Marker Tokens

### Reserved / Low-Usage Tokens

Tokens such as CODE_TOKENS with low usage are context-appropriate.
Low usage is treated as a signal, not a defect.

### Marker-Only Tokens

- RADIUS_TOKENS
- SHADOW_TOKENS
- SPACING_TOKENS

These exist as domain markers / documentation anchors, not runtime component
tokens.

Decision:
- Marker-only usage is valid
- No action required

## Explicit Non-Goals

The following actions are explicitly out of scope and not approved:
- Enforcing _TOKENS usage for every component
- Tokenizing layout or utility components
- Removing low-usage component tokens
- Refactoring existing components solely for token coverage

## Final Statement

Component token coverage in the FOUNDATION layer is intentional, selective, and
structurally aligned with the system's architecture.

This snapshot locks the interpretation of audit results and prevents future
misclassification of valid architectural choices as technical debt.

## Status

- Decision recorded
- Foundation remains unchanged
- Any future changes require a new explicit decision
