# Box Contract — Escape Hatch, Style Boundaries, and Layout Responsibilities

**Status:** Canonical (ACTIVE)
**Scope:** Documentation-only. No code changes.

## 1. Role of Box in the system
Box is a low-level layout primitive used as a generic container. It belongs to the Composition zone and provides a controlled escape hatch for layout and structural wrapping. Box renders a chosen element via the `as` prop and does not carry its own visual semantics.

## 2. Why Box is different from other components
Box is the only intentional escape hatch in the Composition layer. It accepts `className` and `style` while also providing token-based props for spacing, radius, color, and shadow. This makes Box a controlled boundary: it supports flexible wrapping when needed, but it already exposes canonical, token-based styling mechanisms for the most common layout and surface concerns.

## 3. className policy for Box
**Observed behavior:** Box accepts `className` and merges it with its computed class list.

**Normative guidance:** `className` is allowed on Box as an escape hatch for local composition and wrapper-level concerns, not as a replacement for canonical token props. When possible, prefer Box props (spacing, radius, color, shadow) and Composition primitives over raw utility overrides.

## 4. inline-style policy for Box
**Observed behavior:** Box merges the incoming `style` object with its computed inline styles (CSS variables for tokens). User styles can override those inline values.

**Normative guidance:** inline styles are allowed on Box only as an escape hatch, with preference to token props and CSS variables. Inline styles should be used for minimal, localized adjustments rather than broad visual theming.

## 5. Allowed layout-oriented use cases
- Temporary wrapper for layout composition when no dedicated component exists yet.
- Local containment for spacing, radius, background, or shadow using token props.
- Integration boundary with third-party markup where Box provides the stable container.
- Transitional composition while migrating toward canonical layout primitives.

## 6. Discouraged (but not forbidden) use cases
- Replacing Box token props with raw utility classes in `className`.
- Hardcoded inline values that bypass tokens without a strong reason.
- Using Box as a domain-level styling surface instead of Composition or Domain components.

## 7. Escape hatch definition

Box is a conscious and limited escape hatch, not a recommended styling point.
It is the ONLY component in the system allowed to forward `className` and `style` to the underlying DOM node without semantic token resolution.

## 8. Non-Goals

- Deprecating `className` usage entirely (unrealistic for interoperability).
- Introducing "strict" tokens-only Box variant (redundant).
- Changing public API of Box in V2.

## Related references
- `src/COMPOSITION/layout/Box/Box.tsx`
- `docs/canon/CLASSNAME_INLINESTYLE_GOVERNANCE.md`
- `docs/canon/CLASSNAME_POLICY_PLAN.md` (Background)
