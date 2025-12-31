# ADR: Disabled Semantic Tokens in Theme Contract v1

**Date:** 2025-12-30  
**Status:** ✅ **Accepted**  
**Decision:** Include explicit disabled-state semantic tokens (`--tm-disabled` and `--tm-disabled-foreground`) in Theme Contract v1

---

## Context

Theme Contract v1 defines the complete set of required semantic tokens that all themes must provide. The contract establishes the foundation for theme system capabilities, ensuring consistency and predictability across all official themes.

**Problem Statement:**
- Disabled state was previously implicit (opacity-based or derived styles)
- Implicit disabled styling breaks accessibility compliance and enterprise theming requirements
- High-contrast and legal compliance scenarios often require explicit disabled colors
- Opacity-based disabled styling creates ambiguity and prevents proper theme customization

**Constraints:**
- Must not break existing themes
- Must not introduce component branching
- Must remain compatible with Theme Contract v1
- Must improve accessibility compliance

---

## Decision

**Include explicit disabled semantic tokens in Theme Contract v1:**

- `--tm-disabled`: Background or surface color used for disabled UI elements
- `--tm-disabled-foreground`: Foreground (text/icon) color used on disabled elements

**Rationale:**

1. **Accessibility Compliance**
   - Explicit disabled colors meet WCAG contrast requirements (4.5:1 minimum)
   - Disabled foreground must meet contrast requirements against disabled background
   - Enables proper high-contrast mode support

2. **Enterprise Theming Requirements**
   - Legal compliance scenarios require explicit disabled colors
   - High-contrast themes need explicit disabled state colors
   - Enterprise clients often have strict accessibility requirements

3. **Future-Proofing**
   - Eliminates opacity-based ambiguity
   - Enables better theme customization
   - Prevents future migration pain when disabled tokens become required

4. **Consistency**
   - All disabled states use the same semantic tokens across all components
   - Predictable behavior across the design system
   - Foundation components can reference disabled tokens consistently

5. **Theme Contract Completeness**
   - Disabled state is a fundamental UI state (highest priority state)
   - Theme Contract v1 should include all essential semantic states
   - Completes the semantic token set for Theme Contract v1

**Non-Goals (Deferred to Theme Contract v2):**
- `--tm-disabled-border`: Border color for disabled elements (deferred)
- `--tm-disabled-shadow`: Shadow color for disabled elements (deferred)
- `--tm-disabled-overlay`: Overlay color for disabled elements (deferred)

---

## Consequences

### Positive

- ✅ **Accessibility**: Explicit disabled colors meet WCAG contrast requirements
- ✅ **Enterprise Ready**: Supports high-contrast and legal compliance scenarios
- ✅ **Consistency**: All components use the same disabled semantic tokens
- ✅ **Future-Proof**: Eliminates need for future migration when disabled tokens become required
- ✅ **Theme Completeness**: Theme Contract v1 includes all essential semantic states

### Negative

- ⚠️ **Migration Required**: Foundation components must migrate from opacity-based to token-based disabled styling
- ⚠️ **Theme Updates**: All official themes must define disabled token values

### Neutral

- No breaking changes (additive only)
- No component branching introduced
- Theme Contract v1 remains valid and lockable

---

## Implementation Notes

**Token Values:**
- Day mode: `disabled: "0 0% 96%"`, `disabledForeground: "0 0% 60%"`
- Night mode: `disabled: "240 5% 12%"`, `disabledForeground: "240 5% 50%"`
- Values are explicit HSL colors (not opacity-based)
- Values meet WCAG AA contrast requirements (4.5:1)

**Component Migration:**
- Foundation components replace opacity-based disabled styling with semantic tokens
- Opacity may be used in addition to disabled tokens, but not as replacement
- Visual parity maintained or improved

**Usage Guidelines:**
- Foundation components MUST reference disabled tokens for disabled state styling
- Components MUST NOT derive disabled styles via opacity alone
- Disabled foreground must meet minimum contrast requirements against disabled background

---

## Related Decisions

- [THEME_SYSTEM_ARCHITECTURE.md](./THEME_SYSTEM_ARCHITECTURE.md) - Theme system architecture and disabled token documentation
- [FOUNDATION_LOCK_THEME.md](./FOUNDATION_LOCK_THEME.md) - Foundation lock for Theme Contract v1
- [TOKEN_NAMING_DECISION.md](./TOKEN_NAMING_DECISION.md) - Token naming strategy and registry

---

## Status

**Status:** ✅ **Accepted and Implemented**

**Implementation Date:** 2025-12-30

**Verification:**
- ✅ Disabled tokens added to `required-tokens.ts`
- ✅ Disabled colors defined in `colors.ts` for day and night modes
- ✅ CSS variables set in `updateCSSVariablesFromTokens()`
- ✅ Foundation components migrated to use disabled semantic tokens
- ✅ Documentation updated to reflect disabled semantics
- ✅ Theme Contract v1 remains valid and lockable

---

## Notes

This decision intentionally limits scope to minimal disabled semantics. More granular disabled tokens (border, overlay, etc.) are deferred to Theme Contract v2. After completion, Theme Contract v1 can be considered architecturally complete and safe to lock.

