# ESLint Architecture Rules

This document describes the custom ESLint rules that enforce architectural conventions for the `@tenerife.music/ui` component library.

## Overview

The Tenerife UI architecture is built on a token-driven design system. All visual properties must use token-based types instead of raw string or number types. This ensures consistency, maintainability, and prevents architectural violations.

## Rules

### `tenerife-ui-architecture/no-raw-visual-props`

**Severity:** `error`

**Description:** Enforces token-driven typing for all visual component props. Prevents raw string or number types for visual props and makes architectural violations impossible.

#### What This Rule Checks

This rule validates that visual props in component interfaces and type definitions use token-based types instead of raw `string` or `number` types.

#### Visual Prop Detection

The rule identifies visual props by matching prop names against these patterns:

- Spacing: `padding*`, `margin*`, `gap`, `rowGap`, `columnGap`
- Sizing: `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight`, `size`
- Styling: `variant`, `radius*`, `rounded*`, `shadow*`, `elevation*`
- Colors: `color`, `bg`, `background*`, `textColor`, `borderColor*`
- Layout: `align*`, `justify*`, `direction`, `wrap`
- Effects: `zIndex`, `opacity`, `motion*`, `animation*`, `transition*`, `duration`, `delay`

#### Excluded Props

The following prop patterns are excluded from this rule (non-visual props):

- `aria-*` - ARIA attributes
- `data-*` - Data attributes
- `on[A-Z]*` - Event handlers
- `id`, `role`, `title`, `name`, `value`, `href`, `target`, `rel`, `type`, `placeholder` - Standard HTML attributes

#### Allowed Types

Visual props must use one of these token-based type patterns:

- Types ending with `Token` (e.g., `SpacingToken`, `ColorToken`, `RadiusToken`)
- Types starting with `Responsive<` (e.g., `Responsive<SpacingToken>`)
- Types ending with `Responsive` (e.g., `ResponsiveSpacing`, `ResponsiveColor`)

#### Examples

##### ❌ Invalid (Raw Types)

```typescript
interface ButtonProps {
  padding?: string; // ❌ Error: Raw string type
  margin?: number; // ❌ Error: Raw number type
  color?: string; // ❌ Error: Raw string type
  gap?: number; // ❌ Error: Raw number type
  variant?: string; // ❌ Error: Raw string type
  radius?: string | number; // ❌ Error: Union with raw types
}
```

##### ✅ Valid (Token Types)

```typescript
import type { SpacingToken, ColorToken, RadiusToken } from "@/tokens/types";
import type { Responsive } from "@/types/responsive";

interface ButtonProps {
  padding?: SpacingToken; // ✅ Valid: Token type
  margin?: Responsive<SpacingToken>; // ✅ Valid: Responsive wrapper
  color?: ColorToken; // ✅ Valid: Token type
  gap?: ResponsiveSpacing; // ✅ Valid: Responsive type alias
  variant?: "primary" | "secondary"; // ✅ Valid: String literal union (not raw string)
  radius?: RadiusToken; // ✅ Valid: Token type
}
```

##### ✅ Valid (String Literal Unions)

String literal unions are allowed because they're not raw `string` types:

```typescript
interface ButtonProps {
  variant?: "primary" | "secondary" | "outline"; // ✅ Valid: String literal union
  align?: "start" | "end" | "center"; // ✅ Valid: String literal union
}
```

##### ✅ Valid (Responsive Wrappers)

```typescript
import type { Responsive } from "@/types/responsive";
import type { SpacingToken } from "@/tokens/types";

interface BoxProps {
  padding?: Responsive<SpacingToken>; // ✅ Valid: Responsive wrapper
  margin?: Responsive<SpacingToken>; // ✅ Valid: Responsive wrapper
}
```

#### Error Message

When this rule is violated, ESLint will report:

```
Visual prop 'padding' must use a token union type (optionally Responsive<T>).
Raw string or number types are forbidden by the Tenerife UI architecture.
```

#### Configuration

This rule is enabled by default in `eslint.config.mjs`:

```javascript
{
  rules: {
    "tenerife-ui-architecture/no-raw-visual-props": "error",
  },
}
```

#### Scope

This rule applies to:

- `src/components/**/*.{ts,tsx}`
- `src/layout/**/*.{ts,tsx}`
- `src/lib/**/*.{ts,tsx}`

The rule is automatically excluded for:

- Test files (`**/*.test.{ts,tsx}`, `**/*.spec.{ts,tsx}`)
- Storybook files (`**/*.stories.{ts,tsx}`)
- Configuration files
- Token definition files (`src/tokens/**`)

## Implementation Details

### Rule Location

The rule is implemented in:

- `eslint-rules/no-raw-visual-props.ts` - Rule implementation
- `eslint-rules/index.ts` - Plugin export

### AST Traversal

The rule traverses TypeScript AST nodes:

- `TSInterfaceDeclaration` - Interface definitions
- `TSTypeLiteral` - Type literal definitions
- `TSPropertySignature` - Property signatures within interfaces/types

### Type Checking

The rule uses TypeScript's type checker (via `@typescript-eslint/utils`) to:

1. Detect visual prop names by regex pattern matching
2. Check if the prop type is a forbidden raw type (`string` or `number`)
3. Verify that allowed types match token patterns
4. Handle `Responsive<T>` generic wrappers
5. Support union types (as long as they don't include raw types)

## Benefits

1. **Architectural Enforcement**: Prevents developers (including AI) from accidentally using raw types
2. **Consistency**: Ensures all visual props use the token system
3. **Maintainability**: Makes refactoring easier by enforcing token-based types
4. **Type Safety**: Leverages TypeScript's type system for architectural compliance

## Migration Guide

If you encounter errors from this rule:

1. **Identify the token type**: Find the appropriate token type for your prop
   - Spacing props → `SpacingToken` or `ResponsiveSpacing`
   - Color props → `ColorToken` or `ResponsiveColor`
   - Radius props → `RadiusToken` or `ResponsiveRadius`

2. **Import the type**: Import from `@/tokens/types` or `@/components/layout/layout.types`

3. **Update the prop type**: Replace `string` or `number` with the token type

4. **Use Responsive wrapper if needed**: If the prop should support responsive values, use `Responsive<TokenType>`

### Example Migration

**Before:**

```typescript
interface CardProps {
  padding?: string;
  color?: string;
}
```

**After:**

```typescript
import type { SpacingToken, ColorToken } from "@/tokens/types";

interface CardProps {
  padding?: SpacingToken;
  color?: ColorToken;
}
```

## Related Rules

This rule works alongside other token compliance rules in `eslint.config.mjs`:

- `no-restricted-syntax` - Prevents hardcoded Tailwind utilities in className strings
- TypeScript strict mode - Ensures type safety

## Troubleshooting

### Rule Not Working

If the rule doesn't seem to be working:

1. **Check ESLint config**: Ensure the rule is enabled in `eslint.config.mjs`
2. **Check file scope**: Verify the file is in the rule's scope
3. **Check parser**: Ensure TypeScript parser is configured correctly
4. **Restart ESLint**: Restart your editor/ESLint server

### False Positives

If you believe the rule is incorrectly flagging valid code:

1. **Check prop name**: Ensure the prop name doesn't match visual prop patterns
2. **Check type**: Verify the type is actually a token type (not just named similarly)
3. **Check imports**: Ensure token types are imported correctly

### Performance

This rule uses TypeScript's type checker, which may impact performance on large codebases. The rule is optimized to:

- Only check relevant prop signatures
- Skip excluded prop patterns early
- Cache type information when possible

## Future Enhancements

Potential improvements to this rule:

1. **Autofix**: Automatically suggest token types for violations
2. **More patterns**: Add more visual prop patterns as needed
3. **Custom patterns**: Allow project-specific prop patterns
4. **Better error messages**: Include suggested fixes in error messages

## References

- [TypeScript ESLint Rules](https://typescript-eslint.io/rules/)
- [ESLint Custom Rules](https://eslint.org/docs/latest/extend/custom-rules)
- [Tenerife UI Architecture](./tui-self-governing-architecture.mdc)
