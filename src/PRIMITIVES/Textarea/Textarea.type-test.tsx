/**
 * Type-level tests for Textarea component
 *
 * These tests ensure that className, style, rows, and variant props are rejected at the type level.
 * If these props become accepted again, these tests will fail.
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

// Test that rows is not in TextareaProps (forbidden in strict primitive model)
type TestRows = "rows" extends keyof TextareaProps ? true : false;
// @ts-expect-error — rows must not be in TextareaProps
const _testRows: TestRows = true;
void _testRows;

// Test that variant is not in TextareaProps (removed in strict primitive model)
type TestVariant = "variant" extends keyof TextareaProps ? true : false;
// @ts-expect-error — variant must not be in TextareaProps
const _testVariant: TestVariant = true;
void _testVariant;

// Test that allowed props are still present
type TestSize = "size" extends keyof TextareaProps ? true : false;
const _testSize: TestSize = true; // Should pass
void _testSize;

type TestInvalid = "invalid" extends keyof TextareaProps ? true : false;
const _testInvalid: TestInvalid = true; // Should pass
void _testInvalid;

type TestOnChange = "onChange" extends keyof TextareaProps ? true : false;
const _testOnChange: TestOnChange = true; // Should pass
void _testOnChange;
