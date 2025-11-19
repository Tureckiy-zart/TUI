"use client";

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/primitives/Card';
import { Heading, Text } from '@/components/primitives/Typography';
import React from 'react';

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
  className
}) => {
  if (!dayLabel || dayLabel.trim() === '') {
    throw new Error('ModeHero: "dayLabel" prop is required and cannot be empty');
  }
  if (!nightLabel || nightLabel.trim() === '') {
    throw new Error('ModeHero: "nightLabel" prop is required and cannot be empty');
  }
  if (!dayDescription || dayDescription.trim() === '') {
    throw new Error('ModeHero: "dayDescription" prop is required and cannot be empty');
  }
  if (!nightDescription || nightDescription.trim() === '') {
    throw new Error('ModeHero: "nightDescription" prop is required and cannot be empty');
  }

  return (
    <div className={cn(
      "bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg",
      className
    )}>
      <div className="max-w-4xl mx-auto text-center">
        <Heading level={1} className="text-4xl font-bold mb-4">
          Tenerife Music Platform
        </Heading>
        <Text size="xl" className="mb-8">
          Discover amazing music events in Tenerife
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <Heading level={3} className="text-2xl font-semibold mb-2">{dayLabel}</Heading>
              <Text className="text-white/80">{dayDescription}</Text>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <Heading level={3} className="text-2xl font-semibold mb-2">{nightLabel}</Heading>
              <Text className="text-white/80">{nightDescription}</Text>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
