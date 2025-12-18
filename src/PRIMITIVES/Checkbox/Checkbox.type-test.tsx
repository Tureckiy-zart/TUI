/**
 * Type-level tests for Checkbox component
 *
 * These tests ensure that className and style props are rejected at the type level.
 * If className or style become accepted again, these tests will fail.
 *
 * @see docs/architecture/FOUNDATION_CONTRACT.md
 */

import type { CheckboxProps } from "./Checkbox.types";

// Test that className is not in CheckboxProps
type TestClassName = "className" extends keyof CheckboxProps ? true : false;
// @ts-expect-error — className must not be in CheckboxProps
const _testClassName: TestClassName = true;
void _testClassName;

// Test that style is not in CheckboxProps
type TestStyle = "style" extends keyof CheckboxProps ? true : false;
// @ts-expect-error — style must not be in CheckboxProps
const _testStyle: TestStyle = true;
void _testStyle;

// Test that allowed props are still present
type TestVariant = "variant" extends keyof CheckboxProps ? true : false;
const _testVariant: TestVariant = true; // Should pass
void _testVariant;

type TestChecked = "checked" extends keyof CheckboxProps ? true : false;
const _testChecked: TestChecked = true; // Should pass
void _testChecked;

type TestOnCheckedChange = "onCheckedChange" extends keyof CheckboxProps ? true : false;
const _testOnCheckedChange: TestOnCheckedChange = true; // Should pass
void _testOnCheckedChange;
