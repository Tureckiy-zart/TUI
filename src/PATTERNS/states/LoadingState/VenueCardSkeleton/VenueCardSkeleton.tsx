"use client";

import React from "react";

import { Box, cn, DATA_TOKENS, DOMAIN_TOKENS, Skeleton } from "@/index";

export interface VenueCardSkeletonProps {
  className?: string;
}

export const VenueCardSkeleton: React.FC<VenueCardSkeletonProps> = ({ className }) => {
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
        <Box className={cn(DOMAIN_TOKENS.skeleton.image.height, DATA_TOKENS.skeleton.width.full)}>
          <Skeleton />
        </Box>
        <Box
          className={cn(
            DOMAIN_TOKENS.skeleton.badge.height,
            DOMAIN_TOKENS.skeleton.content.width.threeQuarters,
          )}
        >
          <Skeleton />
        </Box>
        <Box className={cn(DATA_TOKENS.skeleton.height.text, DATA_TOKENS.skeleton.width.full)}>
          <Skeleton />
        </Box>
        <Box
          className={cn(
            DATA_TOKENS.skeleton.height.text,
            DOMAIN_TOKENS.skeleton.content.width.half,
          )}
        >
          <Skeleton />
        </Box>
      </div>
    </div>
  );
};
