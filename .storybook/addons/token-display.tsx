/**
 * Storybook Addon: Token Display
 *
 * Displays design tokens used by components in Storybook.
 * Shows token values, CSS variables, and theme variations.
 */

import React from "react";

interface TokenDisplayProps {
  tokens?: {
    spacing?: string[];
    colors?: string[];
    radius?: string[];
    typography?: string[];
    motion?: string[];
    shadows?: string[];
  };
}

export const TokenDisplay: React.FC<TokenDisplayProps> = ({ tokens }) => {
  if (!tokens) {
    return null;
  }

  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid #e5e7eb",
        borderRadius: "0.5rem",
        marginTop: "1rem",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1rem", fontWeight: "600" }}>
        Design Tokens
      </h3>

      {tokens.spacing && tokens.spacing.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          <strong>Spacing:</strong> {tokens.spacing.join(", ")}
        </div>
      )}

      {tokens.colors && tokens.colors.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          <strong>Colors:</strong> {tokens.colors.join(", ")}
        </div>
      )}

      {tokens.radius && tokens.radius.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          <strong>Radius:</strong> {tokens.radius.join(", ")}
        </div>
      )}

      {tokens.typography && tokens.typography.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          <strong>Typography:</strong> {tokens.typography.join(", ")}
        </div>
      )}

      {tokens.motion && tokens.motion.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          <strong>Motion:</strong> {tokens.motion.join(", ")}
        </div>
      )}

      {tokens.shadows && tokens.shadows.length > 0 && (
        <div style={{ marginBottom: "1rem" }}>
          <strong>Shadows:</strong> {tokens.shadows.join(", ")}
        </div>
      )}
    </div>
  );
};

/**
 * Decorator to add token display to stories
 */
export const withTokenDisplay = (tokens?: TokenDisplayProps["tokens"]) => {
  return (Story: React.ComponentType) => (
    <div>
      <Story />
      <TokenDisplay tokens={tokens} />
    </div>
  );
};
