# Spacing Shorthand and Axis-Props Audit Report

**Date**: 2026-02-03
**Task ID**: TUNG_FOUNDATION_SPACING_AUDIT_001
**Status**: Completed

## 1. Executive Summary
This audit analyzed the usage of spacing shorthand props (`p`, `m`) and axis props (`px`, `py`, `mx`, `my`, etc.) across the codebase to distinguish between Foundation-level capabilities and Domain-specific implementations.

**Key Findings:**
- **Foundation Layer (`Box`)** supports `m` (shorthand) and all axis props (`px`, `py`, `mx`, `my`, etc.) but **explicitly lacks** support for the `p` (padding) shorthand.
- **Components (`Card`)** implement their own `p` shorthand logic, which creates a divergence from the Foundation layer.
- **Inconsistencies** exist in naming conventions (e.g., `Section` uses `spaceY` instead of `py`).

## 2. Component Inventory & Prop Usage

The following table categorizes components based on their implementation of spacing props.

| Component | Layer | Generic Spacing (`p`, `m`) | Axis Spacing (`px`, `py`, `mx`, `my`) | Notes |
|-----------|-------|----------------------------|---------------------------------------|-------|
| **Box** | Composition/Foundation | `m` only. **No `p`**. | `px`, `py`, `mx`, `my`, etc. | Core primitive. Implements `m` but omits `p`. |
| **Stack** | Composition | Inherits `m` from Box. | Inherits `px`, `py`, `mx`, `my`. | Composes Box. |
| **Row** | Composition | Inherits `m` from Box. | Inherits `px`, `py`, `mx`, `my`. | Composes Stack -> Box. |
| **Section** | Composition | Inherits `m`, `mx`, `my`, etc. | **Removes `py`**. Adds `spaceY`. | Renames `py` to `spaceY` via prop interface masking. |
| **Card** | Domain/Composition | **Implements `p`**. Inherits `m`. | Inherits `px`, `py`, `mx`, `my`. | Manually implements `p` which maps to inline `style`. |
| **Primitives** (Button, Input) | Primitives | **None**. | **None**. | Strict token enforcement. No external spacing props exposed. |

## 3. Token Sources & Runtime Resolution

1.  **Foundation (`Box`)**:
    - Uses `getSpacingCSSVar()` from `FOUNDATION/lib/responsive-props`.
    - Maps props directly to CSS variables (e.g., `--spacing-md`).
    - Runtime: `px="md"` -> `paddingLeft: var(--spacing-md), paddingRight: var(--spacing-md)`.

2.  **Domain (`Card`)**:
    - Uses `CARD_TOKENS` to define defaults but accepts `ResponsiveSpacing`.
    - **Custom Logic**: `p` prop is manually extracted and converted to a `style` object (`{ padding: ... }`).
    - **Conflict Risk**: Custom `style` injection might collide with `Box`'s internal style merging if not carefully handled (though `Box` currently merges `style` last).

## 4. Risks & Conflicts

### 4.1. The "Missing P" Anomaly
The `Box` component—the source of truth for layout—supports `m` (margin) as a shorthand for all sides, but notably requires `px` and `py` for padding, offering no `p` shorthand.
- **Risk**: Developers expecting symmetry (`m` implies `p` availability) may be confused.
- **Divergence**: `Card` implementing its own `p` suggests a need for this shorthand that Foundation is not meeting.

### 4.2. API Inconsistency (`Section`)
`Section` removes `py` from its interface and replaces it with `spaceY`.
- **Risk**: Increased cognitive load. Developers must remember `Section` uses `spaceY` while `Box`/`Stack`/`Card` use `py`.
- **Type Hiding**: `SectionProps` explicitly `Omit<StackProps, "py">`.

### 4.3. Specificity & Overrides
`Card` allows both `p` (custom prop) and `px` (inherited from Box).
- Result: If both are passed (`<Card p="lg" px="sm" />`), `p` (applied via `style`) typically overrides `px` (applied via `style` keys `paddingLeft`/`paddingRight`) depending on browser CSS shorthand expansion rules and React style object order.
- `Box` implementation: `style` prop is merged *after* atomic styles.
- **Conflict**: A user setting `px` on a Card might be silently overridden if they also set `p` (or if a default `p` is applied).

## 5. Recommendations

1.  **Unify Padding Shorthand**: Consider promoting `p` to a first-class citizen in `Box` to match `m` and satisfy the clear demand evidenced by `Card`.
2.  **Standardize Section API**: Evaluate if `spaceY` provides enough semantic value to justify breaking consistency with `py`.
3.  **Strict Prop Interfaces**: If `Card` allows `p`, it should ideally resolve to underlying `Box` props cleanly rather than injecting raw styles, or `Box` should support it natively.

## 6. Conclusion
The current state shows a split between Foundation (strict, missing `p`) and Domain (pragmatic, adds `p`). Standardizing these contracts at the Foundation level is recommended to avoid further divergence.
