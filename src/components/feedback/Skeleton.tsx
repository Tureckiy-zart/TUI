"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { DOMAIN_TOKENS } from "@/tokens/components/domain";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        DOMAIN_TOKENS.skeleton.base.radius,
        DOMAIN_TOKENS.skeleton.base.animation,
        DOMAIN_TOKENS.skeleton.base.background,
        className,
      )}
    />
  );
};
