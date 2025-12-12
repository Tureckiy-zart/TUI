/**
 * Tenerife UI Architecture ESLint Plugin
 *
 * Custom ESLint rules that enforce architectural conventions
 * for the @tenerife.music/ui component library.
 */

import noRawVisualProps from "./no-raw-visual-props";

export default {
  rules: {
    "no-raw-visual-props": noRawVisualProps,
  },
};
