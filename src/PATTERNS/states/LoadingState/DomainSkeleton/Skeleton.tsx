"use client";

import React from "react";

import { cn, DOMAIN_TOKENS } from "@/index";

export interface DomainSkeletonProps {
  className?: string;
}

export const DomainSkeleton: React.FC<DomainSkeletonProps> = ({ className }) => {
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
