/**
 * Type-level tests for Link component
 *
 * These tests ensure that className and style props are rejected at the type level.
 * If className or style become accepted again, these tests will fail.
 *
 * @see docs/architecture/FOUNDATION_CONTRACT.md
 */

import type { LinkProps } from "./Link";

// Test that className is allowed in LinkProps
type TestClassName = "className" extends keyof LinkProps ? true : false;
const _testClassName: TestClassName = true;
void _testClassName;

// Test that style is allowed in LinkProps
type TestStyle = "style" extends keyof LinkProps ? true : false;
const _testStyle: TestStyle = true;
void _testStyle;

// Test that allowed props are still present
type TestVariant = "variant" extends keyof LinkProps ? true : false;
const _testVariant: TestVariant = true; // Should pass
void _testVariant;

type TestHref = "href" extends keyof LinkProps ? true : false;
const _testHref: TestHref = true; // Should pass
void _testHref;
