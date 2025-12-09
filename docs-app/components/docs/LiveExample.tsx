"use client";

import { Sandpack } from "@codesandbox/sandpack-react";
import { useTheme } from "@tenerife.music/ui/theme";

interface LiveExampleProps {
  children: string;
  template?: "react" | "react-ts";
  dependencies?: Record<string, string>;
  files?: Record<string, string>;
}

export function LiveExample({
  children,
  template = "react-ts",
  dependencies = {},
  files = {},
}: LiveExampleProps) {
  const { mode } = useTheme();

  const defaultDependencies = {
    react: "^19.0.0",
    "react-dom": "^19.0.0",
    "@tenerife.music/ui": "^1.0.3",
  };

  const defaultFiles = {
    "/App.tsx": children,
    "/index.tsx": `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@tenerife.music/ui/styles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
    "/index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Tenerife UI Example</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`,
  };

  return (
    <div className="my-6 overflow-hidden rounded-lg border">
      <Sandpack
        template={template}
        theme={mode === "night" ? "dark" : "light"}
        options={{
          showLineNumbers: true,
          showInlineErrors: true,
          showTabs: true,
          editorHeight: "400px",
        }}
        customSetup={{
          dependencies: {
            ...defaultDependencies,
            ...dependencies,
          },
        }}
        files={{
          ...defaultFiles,
          ...files,
        }}
      />
    </div>
  );
}
