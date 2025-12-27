/**
 * Tenerife UI Architecture ESLint Plugin
 *
 * Custom ESLint rules that enforce architectural conventions
 * for the @tenerife.music/ui component library.
 */

import { noFoundationClassnameStyle } from "./no-foundation-classname-style";
import noFoundationOpenHtmlAttributes from "./no-foundation-open-htmlattributes";
import noInteractiveWithoutKeyboard from "./no-interactive-without-keyboard";
import { noLinkAsChild } from "./no-link-aschild";
import noRawFontSizeScale from "./no-raw-font-size-scale";
import noRawLineHeightScale from "./no-raw-line-height-scale";
import noRawMotionScale from "./no-raw-motion-scale";
import noRawShadowElevationScale from "./no-raw-shadow-elevation-scale";
import noRawTailwindColors from "./no-raw-tailwind-colors";
import noRawVisualProps from "./no-raw-visual-props";
import requireFocusVisible from "./require-focus-visible";

export default {
  rules: {
    "no-raw-visual-props": noRawVisualProps,
    "no-raw-tailwind-colors": noRawTailwindColors,
    "no-foundation-classname-style": noFoundationClassnameStyle,
    "no-foundation-open-htmlattributes": noFoundationOpenHtmlAttributes,
    "no-link-aschild": noLinkAsChild,
    "no-raw-font-size-scale": noRawFontSizeScale,
    "no-raw-line-height-scale": noRawLineHeightScale,
    "no-raw-shadow-elevation-scale": noRawShadowElevationScale,
    "no-raw-motion-scale": noRawMotionScale,
    // Focus System v1 rules
    "no-interactive-without-keyboard": noInteractiveWithoutKeyboard,
    "require-focus-visible": requireFocusVisible,
  },
};
