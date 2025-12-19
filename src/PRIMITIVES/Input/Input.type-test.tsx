/**
 * Type-level tests for Input component
 *
 * These tests ensure that className and style props are rejected at the type level.
 * If className or style become accepted again, these tests will fail.
 *
 * @see docs/architecture/FOUNDATION_CONTRACT.md
 */

import type { InputProps } from "./Input.types";

// Test that className is not in InputProps
type TestClassName = "className" extends keyof InputProps ? true : false;
// @ts-expect-error — className must not be in InputProps
const _testClassName: TestClassName = true;
void _testClassName;

// Test that style is not in InputProps
type TestStyle = "style" extends keyof InputProps ? true : false;
// @ts-expect-error — style must not be in InputProps
const _testStyle: TestStyle = true;
void _testStyle;

// Test that allowed props are still present
type TestVariant = "variant" extends keyof InputProps ? true : false;
const _testVariant: TestVariant = true; // Should pass
void _testVariant;

type TestType = "type" extends keyof InputProps ? true : false;
const _testType: TestType = true; // Should pass
void _testType;

type TestOnChange = "onChange" extends keyof InputProps ? true : false;
const _testOnChange: TestOnChange = true; // Should pass
void _testOnChange;
