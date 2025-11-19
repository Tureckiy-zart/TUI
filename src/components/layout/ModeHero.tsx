"use client";

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/primitives/Card';
import React from 'react';

interface ModeHeroProps {
  dayLabel?: string;
  nightLabel?: string;
  dayDescription?: string;
  nightDescription?: string;
  className?: string;
}

export const ModeHero: React.FC<ModeHeroProps> = ({
  dayLabel = "Day Mode",
  nightLabel = "Night Mode", 
  dayDescription = "Bright theme for daytime browsing",
  nightDescription = "Dark theme for nighttime browsing",
  className
}) => {
  return (
    <div className={cn(
      "bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg",
      className
    )}>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Tenerife Music Platform
        </h1>
        <p className="text-xl mb-8">
          Discover amazing music events in Tenerife
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-2">{dayLabel}</h3>
              <p className="text-white/80">{dayDescription}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold mb-2">{nightLabel}</h3>
              <p className="text-white/80">{nightDescription}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
