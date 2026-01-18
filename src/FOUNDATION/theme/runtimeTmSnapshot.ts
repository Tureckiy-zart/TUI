import {
  accentColors as baseAccentColors,
  baseColors as baseBaseColors,
  type BaseColorTokens,
  type ChartColors,
  chartColors as baseChartColors,
  type ColorScale,
  type DisabledColors,
  disabledColors as baseDisabledColors,
  type Mode,
  primaryColors as basePrimaryColors,
  secondaryColors as baseSecondaryColors,
  type SemanticColors,
  semanticColors as baseSemanticColors,
  type SurfaceColors,
  surfaceColors as baseSurfaceColors,
  type TextColors,
  textColors as baseTextColors,
} from "@/FOUNDATION/tokens/colors";
import { getBrandTheme } from "@/themes/brand_engine";
import { getBrandPackage, getThemeOverride } from "@/themes/registry";
import type { ThemeName, ThemeOverride } from "@/themes/types";

type ThemeOverrideInputs = {
  themeOverride?: ThemeOverride | null;
  brandOverride?: ThemeOverride | null;
};

/**
 * Merge color scale with overrides
 */
function mergeColorScale(base: ColorScale, override?: Partial<ColorScale>): ColorScale {
  if (!override) return base;
  return { ...base, ...override };
}

/**
 * Merge object with overrides
 */
function mergeObject<T extends Record<string, unknown>>(base: T, override?: Partial<T>): T {
  if (!override) return base;
  return { ...base, ...override };
}

/**
 * Get merged tokens with theme/brand overrides applied
 */
export function getMergedTokens(overrides: ThemeOverrideInputs = {}) {
  const { themeOverride, brandOverride } = overrides;

  // Merge color scales
  const primaryColors = mergeColorScale(basePrimaryColors, {
    ...themeOverride?.primaryColors,
    ...brandOverride?.primaryColors,
  });
  const accentColors = mergeColorScale(baseAccentColors, {
    ...themeOverride?.accentColors,
    ...brandOverride?.accentColors,
  });
  const secondaryColors = mergeColorScale(baseSecondaryColors, {
    ...themeOverride?.secondaryColors,
    ...brandOverride?.secondaryColors,
  });

  // Merge mode-specific tokens
  const baseColors: Record<Mode, BaseColorTokens> = {
    day: mergeObject(baseBaseColors.day, {
      ...themeOverride?.baseColorsDay,
      ...brandOverride?.baseColorsDay,
    }),
    night: mergeObject(baseBaseColors.night, {
      ...themeOverride?.baseColorsNight,
      ...brandOverride?.baseColorsNight,
    }),
  };

  const surfaceColors: Record<Mode, SurfaceColors> = {
    day: mergeObject(baseSurfaceColors.day, {
      ...themeOverride?.surfaceColorsDay,
      ...brandOverride?.surfaceColorsDay,
    }),
    night: mergeObject(baseSurfaceColors.night, {
      ...themeOverride?.surfaceColorsNight,
      ...brandOverride?.surfaceColorsNight,
    }),
  };

  const semanticColors: Record<Mode, SemanticColors> = {
    day: mergeObject(baseSemanticColors.day, {
      ...themeOverride?.semanticColorsDay,
      ...brandOverride?.semanticColorsDay,
    }),
    night: mergeObject(baseSemanticColors.night, {
      ...themeOverride?.semanticColorsNight,
      ...brandOverride?.semanticColorsNight,
    }),
  };

  const textColors: Record<Mode, TextColors> = {
    day: mergeObject(baseTextColors.day, {
      ...themeOverride?.textColorsDay,
      ...brandOverride?.textColorsDay,
    }),
    night: mergeObject(baseTextColors.night, {
      ...themeOverride?.textColorsNight,
      ...brandOverride?.textColorsNight,
    }),
  };

  const chartColors: Record<Mode, ChartColors> = {
    day: baseChartColors.day,
    night: baseChartColors.night,
  };

  const disabledColors: Record<Mode, DisabledColors> = {
    day: baseDisabledColors.day,
    night: baseDisabledColors.night,
  };

  return {
    primaryColors,
    accentColors,
    secondaryColors,
    baseColors,
    surfaceColors,
    semanticColors,
    textColors,
    chartColors,
    disabledColors,
  };
}

type MergedTokens = ReturnType<typeof getMergedTokens>;

export function buildTmRuntimeValues(mode: Mode, tokens: MergedTokens): Record<string, string> {
  const { surfaceColors, textColors, baseColors, semanticColors, disabledColors } = tokens;
  const { accentColors, secondaryColors } = tokens;

  const surface = surfaceColors[mode];
  const text = textColors[mode];
  const base = baseColors[mode];
  const semantic = semanticColors[mode];
  const disabled = disabledColors[mode];
  const isDay = mode === "day";

  const primary = isDay ? secondaryColors[800] : accentColors[600];
  const primaryForeground = "0 0% 100%";
  const secondary = isDay ? secondaryColors[600] : "240 10% 7%";
  const secondaryForeground = isDay ? "0 0% 100%" : "0 0% 89.8%";
  const accent = isDay ? accentColors[600] : "240 10% 10%";
  const accentForeground = isDay ? "0 0% 100%" : "0 0% 89.8%";

  return {
    "--tm-surface-base": surface.base,
    "--tm-surface-raised": surface.elevated1,
    "--tm-surface-overlay": surface.overlay,
    "--tm-text-primary": text.primary,
    "--tm-text-secondary": text.secondary,
    "--tm-text-muted": text.muted,
    "--tm-text-inverse": text.inverse,
    "--tm-primary": primary,
    "--tm-primary-foreground": primaryForeground,
    "--tm-secondary": secondary,
    "--tm-secondary-foreground": secondaryForeground,
    "--tm-accent": accent,
    "--tm-accent-foreground": accentForeground,
    "--tm-destructive": semantic.error,
    "--tm-destructive-foreground": semantic.errorForeground,
    "--tm-muted": base.card,
    "--tm-muted-foreground": base.cardForeground,
    "--tm-border-default": base.border,
    "--tm-border-strong": base.foreground,
    "--tm-focus-ring": base.ring,
    "--tm-disabled": disabled.disabled,
    "--tm-disabled-foreground": disabled.disabledForeground,
  };
}

export function computeRuntimeTmSnapshot({
  mode,
  themeName,
  brandId,
}: {
  mode: Mode;
  themeName: ThemeName;
  brandId?: string | null;
}): Record<string, string> {
  const themeOverride = getThemeOverride(themeName);
  const brandPackage = brandId ? getBrandPackage(brandId) : null;
  const brandOverride = brandPackage ? getBrandTheme(brandPackage, mode)?.overrides : null;
  const tokens = getMergedTokens({ themeOverride, brandOverride });
  return buildTmRuntimeValues(mode, tokens);
}
