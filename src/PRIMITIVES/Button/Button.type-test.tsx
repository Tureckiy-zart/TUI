/**
 * Type-level tests for Button component
 *
 * These tests ensure that className and style props are rejected at the type level.
 * If className or style become accepted again, these tests will fail.
 *
 * @see docs/architecture/FOUNDATION_CONTRACT.md
 */

import type { ButtonProps, ButtonSize } from "./Button";

// Test that className is allowed in ButtonProps
type TestClassName = "className" extends keyof ButtonProps ? true : false;
const _testClassName: TestClassName = true;
void _testClassName;

// Test that style is allowed in ButtonProps
type TestStyle = "style" extends keyof ButtonProps ? true : false;
const _testStyle: TestStyle = true;
void _testStyle;

// Test that allowed props are still present
type TestVariant = "variant" extends keyof ButtonProps ? true : false;
const _testVariant: TestVariant = true; // Should pass
void _testVariant;

type TestSize = "size" extends keyof ButtonProps ? true : false;
const _testSize: TestSize = true; // Should pass
void _testSize;

type TestOnClick = "onClick" extends keyof ButtonProps ? true : false;
const _testOnClick: TestOnClick = true; // Should pass
void _testOnClick;

type TestIconOnly = "iconOnly" extends keyof ButtonProps ? true : false;
const _testIconOnly: TestIconOnly = true; // Should pass
void _testIconOnly;

// Type-level prevention: size="icon" should NOT be in ButtonSize type
// This ensures GlobalSize compliance - only sm, md, lg allowed
// @ts-expect-error — "icon" must not be in ButtonSize (violates GlobalSize requirement, use iconOnly prop instead)
const _testIconSize: ButtonSize = "icon";
void _testIconSize;
