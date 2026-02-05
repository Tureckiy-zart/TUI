import { cookies } from "next/headers";

import type { Mode } from "@/FOUNDATION/tokens/colors";
import { BRAND_IDS, THEME_NAMES } from "@/themes/registry";
import type { ThemeName } from "@/themes/types";

export const THEME_COOKIE_NAME = "tm_theme";
export const MODE_COOKIE_NAME = "tm_mode";
export const BRAND_COOKIE_NAME = "tm_brand";

export interface ServerTheme {
  mode: Mode | null;
  theme: ThemeName;
  brand: string | null;
}

/**
 * Get theme from cookies on the server
 * This function is for use in Server Components, Layouts, and API routes
 */
export async function getServerTheme(): Promise<ServerTheme> {
  const cookieStore = await cookies();

  const mode = (cookieStore.get(MODE_COOKIE_NAME)?.value as Mode) || null;
  const themeCookie = cookieStore.get(THEME_COOKIE_NAME)?.value as ThemeName | undefined;
  const brandCookie = cookieStore.get(BRAND_COOKIE_NAME)?.value || null;

  // Validate values
  const validIds: Mode[] = ["day", "night"];
  const safeMode = mode && validIds.includes(mode) ? mode : null;
  const safeTheme = themeCookie && THEME_NAMES.includes(themeCookie) ? themeCookie : "default";
  const safeBrand = brandCookie && BRAND_IDS.includes(brandCookie) ? brandCookie : null;

  return {
    mode: safeMode,
    theme: safeTheme,
    brand: safeBrand,
  };
}
