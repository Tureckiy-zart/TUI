/**
 * Re-export color tokens from tokens system
 * This file maintains backward compatibility while using tokens as single source of truth
 */

export type { ChartColors, ColorTokens, Mode } from "@/FOUNDATION/tokens/colors";
export { cssVariableColorTokens, tailwindThemeColors } from "@/FOUNDATION/tokens/colors";
