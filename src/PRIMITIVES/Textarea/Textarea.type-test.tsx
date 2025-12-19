/**
 * Type-level tests for Textarea component
 *
 * These tests ensure that className and style props are rejected at the type level.
 * If className or style become accepted again, these tests will fail.
 *
 * @see docs/architecture/FOUNDATION_CONTRACT.md
 */

import type { TextareaProps } from "./Textarea.types";

// Test that className is not in TextareaProps
type TestClassName = "className" extends keyof TextareaProps ? true : false;
// @ts-expect-error — className must not be in TextareaProps
const _testClassName: TestClassName = true;
void _testClassName;

// Test that style is not in TextareaProps
type TestStyle = "style" extends keyof TextareaProps ? true : false;
// @ts-expect-error — style must not be in TextareaProps
const _testStyle: TestStyle = true;
void _testStyle;

// Test that allowed props are still present
type TestVariant = "variant" extends keyof TextareaProps ? true : false;
const _testVariant: TestVariant = true; // Should pass
void _testVariant;

type TestOnChange = "onChange" extends keyof TextareaProps ? true : false;
const _testOnChange: TestOnChange = true; // Should pass
void _testOnChange;

type TestRows = "rows" extends keyof TextareaProps ? true : false;
const _testRows: TestRows = true; // Should pass
void _testRows;
