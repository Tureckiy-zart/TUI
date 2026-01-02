/**
 * Type-level tests for FormGroup component
 *
 * These tests ensure that className and style props are rejected at the type level.
 * If these props become accepted again, these tests will fail.
 *
 * @see docs/architecture/FOUNDATION_LOCK.md
 * @rule Foundation Enforcement: className and style props excluded from public API
 */

import type { FormGroupProps } from "./FormGroup.types";

// Test that className is not in FormGroupProps
type TestClassName = "className" extends keyof FormGroupProps ? true : false;
// @ts-expect-error — className must not be in FormGroupProps
const _testClassName: TestClassName = true;
void _testClassName;

// Test that style is not in FormGroupProps
type TestStyle = "style" extends keyof FormGroupProps ? true : false;
// @ts-expect-error — style must not be in FormGroupProps
const _testStyle: TestStyle = true;
void _testStyle;

// Test that allowed props are still present
type TestLegend = "legend" extends keyof FormGroupProps ? true : false;
const _testLegend: TestLegend = true; // Should pass
void _testLegend;

type TestDescription = "description" extends keyof FormGroupProps ? true : false;
const _testDescription: TestDescription = true; // Should pass
void _testDescription;

type TestError = "error" extends keyof FormGroupProps ? true : false;
const _testError: TestError = true; // Should pass
void _testError;

type TestDisabled = "disabled" extends keyof FormGroupProps ? true : false;
const _testDisabled: TestDisabled = true; // Should pass
void _testDisabled;

type TestRequired = "required" extends keyof FormGroupProps ? true : false;
const _testRequired: TestRequired = true; // Should pass
void _testRequired;

type TestChildren = "children" extends keyof FormGroupProps ? true : false;
const _testChildren: TestChildren = true; // Should pass
void _testChildren;
