/**
 * Theme Generator Module
 *
 * Public exports for the theme generator tool.
 *
 * @see docs/theming/THEME_SYSTEM_ARCHITECTURE.md
 * @see docs/theming/THEME_EXTENSION_CONTRACT.md
 */

// Types
export type {
  ColorGenerationConfig,
  ColorScale,
  ContrastLevel,
  GeneratedTheme,
  GenerationResult,
  HSLColor,
  HSLComponents,
  OutputFormat,
  ThemeGeneratorInput,
  ThemeMode,
  ThemeTokens,
  TokenName,
  ValidationResult,
} from "./types";

// Token mapper functions
export {
  adjustLightness,
  adjustSaturation,
  formatHSL,
  generateColorScale,
  generateThemeTokens,
  getContrastingForeground,
  getContrastRatio,
  getRelativeLuminance,
  isLightColor,
  meetsContrastRequirement,
  parseHSL,
} from "./token-mapper";

// Generator functions
export {
  generate,
  generateCSS,
  generatePreview,
  generateTheme,
  generateTS,
  writeThemeFile,
  writeThemeFiles,
} from "./generator";

// Validator functions
export {
  checkCompleteness,
  checkContractVersion,
  checkNoExtraTokens,
  formatValidationResults,
  loadRequiredTokens,
  runParityCheck,
  validateTheme,
  validateThemes,
} from "./validator";
