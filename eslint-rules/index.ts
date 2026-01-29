/**
 * Tenerife UI Architecture ESLint Plugin
 *
 * Custom ESLint rules that enforce architectural conventions
 * for the @tenerife.music/ui component library.
 */

import { noAdHocLists } from "./no-ad-hoc-lists";
import { noClassNameOnFoundation } from "./no-classname-on-foundation";
import { noFoundationClassnameStyle } from "./no-foundation-classname-style";
import noFoundationOpenHtmlAttributes from "./no-foundation-open-htmlattributes";
import noInteractiveWithoutKeyboard from "./no-interactive-without-keyboard";
import noLeadingTailwind from "./no-leading-tailwind";
import noLegacyCssVars from "./no-legacy-css-vars";
import { noLinkAsChild } from "./no-link-aschild";
import { noPropSpreadIntoFoundation } from "./no-prop-spread-into-foundation";
import noRawFontSizeScale from "./no-raw-font-size-scale";
import { noRawHtmlWhenFoundationExists } from "./no-raw-html-when-foundation-exists";
import noRawLineHeight from "./no-raw-line-height";
import noRawLineHeightScale from "./no-raw-line-height-scale";
import noRawMotionScale from "./no-raw-motion-scale";
import noRawShadowElevationScale from "./no-raw-shadow-elevation-scale";
import noRawTailwindColors from "./no-raw-tailwind-colors";
import noRawVisualProps from "./no-raw-visual-props";
import noRuntimeUtilsFromIndex from "./no-runtime-utils-from-index";
import { noStyleOnFoundation } from "./no-style-on-foundation";
import noTextMarginSpacing from "./no-text-margin-spacing";
import noTokenImportsFromIndex from "./no-token-imports-from-index";
import { noUtilityClassesNearFoundation } from "./no-utility-classes-near-foundation";
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
    // Closed System v2 Consumer Guards
    "tui/no-classname-on-foundation": noClassNameOnFoundation,
    "tui/no-style-on-foundation": noStyleOnFoundation,
    "tui/no-prop-spread-into-foundation": noPropSpreadIntoFoundation,
    "tui/no-utility-classes-near-foundation": noUtilityClassesNearFoundation,
    "tui/no-raw-html-when-foundation-exists": noRawHtmlWhenFoundationExists,
    // Foundation Token Import Hygiene
    "no-token-imports-from-index": noTokenImportsFromIndex,
    // Foundation Runtime Utilities Import Hygiene
    "no-runtime-utils-from-index": noRuntimeUtilsFromIndex,
  },
};
