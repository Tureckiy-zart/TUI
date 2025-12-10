"use client";

import React from "react";

import { Skeleton } from "@/components/feedback/Skeleton";
import { cn } from "@/lib/utils";
import { DATA_TOKENS } from "@/tokens/components/data";
import { DOMAIN_TOKENS } from "@/tokens/components/domain";

interface EventCardSkeletonProps {
  className?: string;
}

export const EventCardSkeleton: React.FC<EventCardSkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        DOMAIN_TOKENS.surface.radius.default,
        DOMAIN_TOKENS.surface.bg.default,
        DOMAIN_TOKENS.surface.shadow.default,
        DOMAIN_TOKENS.layout.padding.default,
        className,
      )}
    >
      <div className={cn("flex flex-col", DOMAIN_TOKENS.skeleton.content.gap)}>
        <Skeleton
          className={cn(DOMAIN_TOKENS.skeleton.image.height, DATA_TOKENS.skeleton.width.full)}
        />
        <Skeleton
          className={cn(
            DOMAIN_TOKENS.skeleton.badge.height,
            DOMAIN_TOKENS.skeleton.content.width.threeQuarters,
          )}
        />
        <Skeleton
          className={cn(DATA_TOKENS.skeleton.height.text, DATA_TOKENS.skeleton.width.full)}
        />
        <Skeleton
          className={cn(
            DATA_TOKENS.skeleton.height.text,
            DOMAIN_TOKENS.skeleton.content.width.half,
          )}
        />
      </div>
    </div>
  );
};
