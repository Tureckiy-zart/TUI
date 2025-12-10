/**
 * Re-export color tokens from tokens system
 * This file maintains backward compatibility while using tokens as single source of truth
 */

export type { ChartColors, ColorTokens, Mode } from "@/tokens/colors";
export { cssVariableColorTokens, tailwindThemeColors } from "@/tokens/colors";
