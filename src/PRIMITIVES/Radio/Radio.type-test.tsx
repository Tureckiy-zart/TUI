/**
 * Type-level tests for Radio component
 *
 * These tests ensure that className and style props are rejected at the type level.
 * If className or style become accepted again, these tests will fail.
 *
 * @see docs/architecture/FOUNDATION_CONTRACT.md
 */

import type { RadioProps } from "./Radio.types";

// Test that className is not in RadioProps
type TestClassName = "className" extends keyof RadioProps ? true : false;
// @ts-expect-error — className must not be in RadioProps
const _testClassName: TestClassName = true;
void _testClassName;

// Test that style is not in RadioProps
type TestStyle = "style" extends keyof RadioProps ? true : false;
// @ts-expect-error — style must not be in RadioProps
const _testStyle: TestStyle = true;
void _testStyle;

// Test that allowed props are still present
type TestVariant = "variant" extends keyof RadioProps ? true : false;
const _testVariant: TestVariant = true; // Should pass
void _testVariant;

type TestChecked = "checked" extends keyof RadioProps ? true : false;
const _testChecked: TestChecked = true; // Should pass
void _testChecked;

type TestValue = "value" extends keyof RadioProps ? true : false;
const _testValue: TestValue = true; // Should pass
void _testValue;
