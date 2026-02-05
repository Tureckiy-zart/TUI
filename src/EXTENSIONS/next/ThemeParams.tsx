import { computeRuntimeTmSnapshot } from "@/FOUNDATION/theme/runtimeTmSnapshot";

import { getServerTheme } from "./theme-server";

/**
 * Renders the initial theme script and styles to prevent FOUC.
 * This component should be placed in the <head> of your RootLayout.
 */
export async function ThemeParams({ nonce }: { nonce?: string } = {}) {
  const { mode, theme, brand } = await getServerTheme();

  // If mode is known (cookie), render specific CSS
  if (mode) {
    const cssVariables = computeRuntimeTmSnapshot({ mode, themeName: theme, brandId: brand });
    const cssString = Object.entries(cssVariables)
      .map(([key, value]) => `${key}:${value};`)
      .join("");

    const styleContent = `:root { ${cssString} color-scheme: ${mode === "night" ? "dark" : "light"}; }`;

    return (
      <>
        <style
          id="tm-theme-style"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: styleContent,
          }}
        />
        <script
          id="tm-theme-script"
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.setAttribute("data-mode", "${mode}");
              document.documentElement.setAttribute("data-theme-name", "${theme}");
              document.documentElement.setAttribute("data-theme", "${theme}");
              ${brand ? `document.documentElement.setAttribute("data-brand", "${brand}");` : ""}
              ${mode === "night" ? 'document.documentElement.classList.add("dark");' : 'document.documentElement.classList.remove("dark");'}
            `,
          }}
        />
      </>
    );
  }

  // If mode is unknown, render fallback CSS (Media Query)
  // We generate CSS for both day and night
  const dayVars = computeRuntimeTmSnapshot({ mode: "day", themeName: theme, brandId: brand });
  const nightVars = computeRuntimeTmSnapshot({ mode: "night", themeName: theme, brandId: brand });

  const dayCss = Object.entries(dayVars)
    .map(([key, value]) => `${key}:${value};`)
    .join("");
  const nightCss = Object.entries(nightVars)
    .map(([key, value]) => `${key}:${value};`)
    .join("");

  const fallbackStyle = `
    :root { ${dayCss} color-scheme: light; }
    @media (prefers-color-scheme: dark) {
      :root { ${nightCss} color-scheme: dark; }
    }
  `;

  // We do NOT set data-mode attribute here because we don't know it yet.
  // The client-side ThemeProvider will read matchMedia and set the attribute on mount.
  // BUT the visual style will be correct immediately due to media query.

  return (
    <>
      <style
        id="tm-theme-style"
        nonce={nonce}
        dangerouslySetInnerHTML={{
          __html: fallbackStyle,
        }}
      />
    </>
  );
}
