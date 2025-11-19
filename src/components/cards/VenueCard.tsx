"use client";

import React from 'react';
import { Link } from '@/components/primitives/Link';
import { Card, CardContent } from '@/components/primitives/Card';
import { Heading, Text } from '@/components/primitives/Typography';
import { cn } from '@/lib/utils';

interface VenueCardProps {
  venue?: {
    _id?: string;
    slug?: string;
    name?: { en?: string; es?: string; ru?: string };
    description?: { en?: string; es?: string; ru?: string };
    location?: string;
    address?: string;
    city?: string;
    region?: string;
    capacity?: string;
    image?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    type?: string;
    website?: string;
    events_count?: number;
  };
  className?: string;
  featured?: boolean;
  showImage?: boolean;
}

export const VenueCard: React.FC<VenueCardProps> = ({
  venue,
  className,
  featured = false,
  showImage = true
}) => {
  const name = typeof venue?.name === 'string' 
    ? venue.name 
    : venue?.name?.en || "Sample Venue";
  const description = typeof venue?.description === 'string'
    ? venue.description
    : venue?.description?.en || "Sample venue description";
  const location = typeof venue?.location === 'string' 
    ? venue.location 
    : venue?.address || "Tenerife, Spain";
  const capacity = venue?.capacity || "500";
  const image = venue?.image;
  const eventsCount = venue?.events_count || 0;

  return (
    <Card className={cn(
      "group relative overflow-hidden border-transparent hover:border-primary/20 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up",
      featured && "ring-2 ring-primary/50",
      className
    )}>
      {featured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-purple-500 to-orange-500 text-white shadow-lg">
            ⭐ Popular
          </span>
        </div>
      )}
      
      {showImage && (
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-t-lg overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      <CardContent className="p-4">
        <Heading level={3} className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {venue?.slug ? (
            <Link href={`/venues/${venue.slug}`} variant="ghost" size="none">
              {name}
            </Link>
          ) : (
            name
          )}
        </Heading>
        <Text size="sm" color="muted" className="mb-3 line-clamp-2">{description}</Text>
        <div className="flex flex-col gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <Text size="xs" color="muted" className="line-clamp-1">{location}</Text>
          </div>
        </div>
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center text-xs">
            {eventsCount > 0 && (
              <div className="flex items-center gap-1 text-primary font-medium">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <Text size="xs" color="primary" weight="medium">{eventsCount} events</Text>
              </div>
            )}
            {capacity !== "500" && (
              <div className="flex items-center gap-1 text-gray-500">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <Text size="xs" color="muted">Cap: {capacity}</Text>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
