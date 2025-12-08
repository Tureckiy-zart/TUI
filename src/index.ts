"use client";

// ============================================================================
// DESIGN TOKENS
// ============================================================================
// All design tokens (colors, typography, spacing, shadows, radius, motion)
export * from "./tokens";

// ============================================================================
// UI COMPONENTS
// ============================================================================
// Button component (CVA-based, token-driven)
export { Button, type ButtonProps,buttonVariants } from "./components/ui/button";

// Text component (CVA-based, token-driven)
export {
  Text,
  type TextProps,
  type TextSize,
  textVariants,
  type TextWeight,
} from "./components/ui/text";

// Alert component (CVA-based, token-driven)
export { Alert, type AlertProps,alertVariants } from "./components/ui/alert";

// ============================================================================
// STYLES
// ============================================================================
// Global CSS styles (imported for side effects)
import "./theme/global.css";
