/**
 * Tenerife UI Architecture ESLint Plugin
 *
 * Custom ESLint rules that enforce architectural conventions
 * for the @tenerife.music/ui component library.
 */

import { noAdHocLists } from "./no-ad-hoc-lists";
import { noFoundationClassnameStyle } from "./no-foundation-classname-style";
import noFoundationOpenHtmlAttributes from "./no-foundation-open-htmlattributes";
import noInteractiveWithoutKeyboard from "./no-interactive-without-keyboard";
import noLegacyCssVars from "./no-legacy-css-vars";
import { noLinkAsChild } from "./no-link-aschild";
import noLeadingTailwind from "./no-leading-tailwind";
import noRawFontSizeScale from "./no-raw-font-size-scale";
import noRawLineHeightScale from "./no-raw-line-height-scale";
import noRawLineHeight from "./no-raw-line-height";
import noRawMotionScale from "./no-raw-motion-scale";
import noRawShadowElevationScale from "./no-raw-shadow-elevation-scale";
import noRawTailwindColors from "./no-raw-tailwind-colors";
import noRawVisualProps from "./no-raw-visual-props";
import noTextMarginSpacing from "./no-text-margin-spacing";
import requireFocusVisible from "./require-focus-visible";
import typographyColorPolicy from "./typography-color-policy";
import typographyRhythmPolicy from "./typography-rhythm-policy";

export default {
  rules: {
    "no-raw-visual-props": noRawVisualProps,
    "no-raw-tailwind-colors": noRawTailwindColors,
    "no-foundation-classname-style": noFoundationClassnameStyle,
    "no-foundation-open-htmlattributes": noFoundationOpenHtmlAttributes,
    "no-link-aschild": noLinkAsChild,
    "no-raw-font-size-scale": noRawFontSizeScale,
    "no-raw-line-height-scale": noRawLineHeightScale,
    "no-raw-line-height": noRawLineHeight,
    "no-raw-shadow-elevation-scale": noRawShadowElevationScale,
    "no-raw-motion-scale": noRawMotionScale,
    "no-legacy-css-vars": noLegacyCssVars,
    // Focus System v1 rules
    "no-interactive-without-keyboard": noInteractiveWithoutKeyboard,
    "require-focus-visible": requireFocusVisible,
    // List usage enforcement
    "no-ad-hoc-lists": noAdHocLists,
    // Typography Color Policy enforcement
    "typography-color-policy": typographyColorPolicy,
    // Typography Rhythm Policy enforcement
    "typography-rhythm-policy": typographyRhythmPolicy,
    "no-leading-tailwind": noLeadingTailwind,
    "no-text-margin-spacing": noTextMarginSpacing,
  },
};
