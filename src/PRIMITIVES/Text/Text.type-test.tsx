/**
 * Type-level tests for Text component
 *
 * These tests ensure that className and style props are rejected at the type level.
 * If className or style become accepted again, these tests will fail.
 *
 * @see docs/architecture/FOUNDATION_CONTRACT.md
 */

import type { TextProps } from "./Text";

// Test that className is not in TextProps
type TestClassName = "className" extends keyof TextProps ? true : false;
// @ts-expect-error — className must not be in TextProps
const _testClassName: TestClassName = true;
void _testClassName;

// Test that style is not in TextProps
type TestStyle = "style" extends keyof TextProps ? true : false;
// @ts-expect-error — style must not be in TextProps
const _testStyle: TestStyle = true;
void _testStyle;

// Test that allowed props are still present
type TestSize = "size" extends keyof TextProps ? true : false;
const _testSize: TestSize = true; // Should pass
void _testSize;

type TestWeight = "weight" extends keyof TextProps ? true : false;
const _testWeight: TestWeight = true; // Should pass
void _testWeight;
