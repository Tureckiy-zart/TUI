"use client";

import React from "react";

import { cn } from "@/FOUNDATION/lib/utils";
import { Box, Button, Text } from "@/index";

export interface ConsentBannerProps {
  className?: string;
  message: string;
  acceptLabel: string;
}

export const ConsentBanner: React.FC<ConsentBannerProps> = ({
  className,
  message,
  acceptLabel,
}) => {
  if (!message || message.trim() === "") {
    throw new Error('ConsentBanner: "message" prop is required and cannot be empty');
  }
  if (!acceptLabel || acceptLabel.trim() === "") {
    throw new Error('ConsentBanner: "acceptLabel" prop is required and cannot be empty');
  }

  return (
    <Box
      className={cn(
        "rounded-lg bg-[hsl(var(--tm-primary))] p-md text-[hsl(var(--tm-primary-foreground))]",
        className,
      )}
    >
      <Text>{message}</Text>
      <Button>{acceptLabel}</Button>
    </Box>
  );
};
