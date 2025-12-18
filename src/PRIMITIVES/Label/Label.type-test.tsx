/**
 * Type-level tests for Label component
 *
 * These tests ensure that className and style props are rejected at the type level.
 * If className or style become accepted again, these tests will fail.
 *
 * @see docs/architecture/FOUNDATION_CONTRACT.md
 */

import type { LabelProps } from "./Label";

// Test that className is not in LabelProps
type TestClassName = "className" extends keyof LabelProps ? true : false;
// @ts-expect-error — className must not be in LabelProps
const _testClassName: TestClassName = true;
void _testClassName;

// Test that style is not in LabelProps
type TestStyle = "style" extends keyof LabelProps ? true : false;
// @ts-expect-error — style must not be in LabelProps
const _testStyle: TestStyle = true;
void _testStyle;

// Test that allowed props are still present
type TestHtmlFor = "htmlFor" extends keyof LabelProps ? true : false;
const _testHtmlFor: TestHtmlFor = true; // Should pass
void _testHtmlFor;

type TestRequired = "required" extends keyof LabelProps ? true : false;
const _testRequired: TestRequired = true; // Should pass
void _testRequired;
