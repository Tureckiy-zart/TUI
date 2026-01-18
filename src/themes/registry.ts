import { brandTheme } from "./brand";
import { darkTheme } from "./dark";
import { defaultTheme } from "./default";
import { minimalBrand } from "./minimal";
import { neonBrand } from "./neon";
import type { BrandPackage, ThemeName, ThemeOverride } from "./types";

const THEME_REGISTRY: Record<ThemeName, ThemeOverride> = {
  default: defaultTheme,
  dark: darkTheme,
  brand: brandTheme,
};

export const THEME_NAMES = Object.keys(THEME_REGISTRY) as ThemeName[];

export function getThemeOverride(themeName: ThemeName): ThemeOverride {
  return THEME_REGISTRY[themeName];
}

export const BRAND_PACKAGES = [neonBrand, minimalBrand] as const;

export const BRAND_IDS = BRAND_PACKAGES.map((brand) => brand.id);

export function getBrandPackage(brandId: string): BrandPackage | null {
  return BRAND_PACKAGES.find((brand) => brand.id === brandId) ?? null;
}
