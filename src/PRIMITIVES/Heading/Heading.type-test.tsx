/**
 * Type-level tests for Heading component
 *
 * These tests ensure that className and style props are rejected at the type level.
 * If className or style become accepted again, these tests will fail.
 *
 * @see docs/architecture/FOUNDATION_CONTRACT.md
 */

import type { HeadingProps } from "./Heading";

// Test that className is not in HeadingProps
type TestClassName = "className" extends keyof HeadingProps ? true : false;
// @ts-expect-error — className must not be in HeadingProps
const _testClassName: TestClassName = true;
void _testClassName;

// Test that style is not in HeadingProps
type TestStyle = "style" extends keyof HeadingProps ? true : false;
// @ts-expect-error — style must not be in HeadingProps
const _testStyle: TestStyle = true;
void _testStyle;

// Test that allowed props are still present
type TestLevel = "level" extends keyof HeadingProps ? true : false;
const _testLevel: TestLevel = true; // Should pass
void _testLevel;

type TestWeight = "weight" extends keyof HeadingProps ? true : false;
const _testWeight: TestWeight = true; // Should pass
void _testWeight;
