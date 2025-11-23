import type { Preview } from "@storybook/react";
import React from "react";
import { ThemeProvider } from "../src/theme/ThemeProvider";
import "../src/styles/globals.css";
import "../src/theme/global.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#0a0a0a",
        },
      ],
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider defaultMode="day">
        <div style={{ padding: "2rem" }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
