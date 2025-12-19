"use client";

import React from "react";

import { Card, CardBody } from "@/COMPOSITION/layout/Card";
import { cn } from "@/FOUNDATION/lib/utils";
import { Heading } from "@/PRIMITIVES/Heading";
import { Text } from "@/PRIMITIVES/Text";

interface ModeHeroProps {
  dayLabel: string;
  nightLabel: string;
  dayDescription: string;
  nightDescription: string;
  className?: string;
}

export const ModeHero: React.FC<ModeHeroProps> = ({
  dayLabel,
  nightLabel,
  dayDescription,
  nightDescription,
  className,
}) => {
  if (!dayLabel || dayLabel.trim() === "") {
    throw new Error('ModeHero: "dayLabel" prop is required and cannot be empty');
  }
  if (!nightLabel || nightLabel.trim() === "") {
    throw new Error('ModeHero: "nightLabel" prop is required and cannot be empty');
  }
  if (!dayDescription || dayDescription.trim() === "") {
    throw new Error('ModeHero: "dayDescription" prop is required and cannot be empty');
  }
  if (!nightDescription || nightDescription.trim() === "") {
    throw new Error('ModeHero: "nightDescription" prop is required and cannot be empty');
  }

  return (
    <div
      className={cn(
        "rounded-lg bg-gradient-to-r from-primary to-accent p-lg text-primary-foreground",
        className,
      )}
    >
      <div className="mx-auto max-w-4xl text-center">
        <Heading level={1}>Tenerife Music Platform</Heading>
        <Text size="xl">Discover amazing music events in Tenerife</Text>
        <div className="grid grid-cols-1 gap-lg md:grid-cols-2">
          <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
            <CardBody className="p-lg">
              <Heading level={3}>{dayLabel}</Heading>
              <Text>{dayDescription}</Text>
            </CardBody>
          </Card>
          <Card className="border-white/20 bg-white/10 backdrop-blur-sm">
            <CardBody className="p-lg">
              <Heading level={3}>{nightLabel}</Heading>
              <Text>{nightDescription}</Text>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};
