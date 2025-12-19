/**
 * Tenerife UI Architecture ESLint Plugin
 *
 * Custom ESLint rules that enforce architectural conventions
 * for the @tenerife.music/ui component library.
 */

import { noFoundationClassnameStyle } from "./no-foundation-classname-style";
import noFoundationOpenHtmlAttributes from "./no-foundation-open-htmlattributes";
import noRawTailwindColors from "./no-raw-tailwind-colors";
import noRawVisualProps from "./no-raw-visual-props";

export default {
  rules: {
    "no-raw-visual-props": noRawVisualProps,
    "no-raw-tailwind-colors": noRawTailwindColors,
    "no-foundation-classname-style": noFoundationClassnameStyle,
    "no-foundation-open-htmlattributes": noFoundationOpenHtmlAttributes,
  },
};
