"use client";

import React from 'react';
import { Link } from '@/components/primitives/Link';
import { Card, CardContent } from '@/components/primitives/Card';
import { Heading, Text } from '@/components/primitives/Typography';
import { cn } from '@/lib/utils';

export interface EventCardEvent {
  _id?: string;
  slug?: string;
  name?: { en?: string; es?: string; ru?: string };
  start_date?: string;
  ticket_url?: string;
  venue_id?: { name?: { en?: string; es?: string; ru?: string } };
  description?: { en?: string; es?: string; ru?: string };
  price?: string;
  image?: string;
}

interface EventCardProps {
  event?: EventCardEvent;
  className?: string;
  featured?: boolean;
  showImage?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  className,
  featured = false,
  showImage = true
}) => {
  // Safe string extraction with fallbacks 
  const title = typeof event?.name === 'string' 
    ? event.name 
    : (event?.name?.en || event?.name?.es || event?.name?.ru || "Sample Event");
  const description = typeof event?.description === 'string' 
    ? event.description 
    : (event?.description?.en || event?.description?.es || event?.description?.ru || "Sample event description");
  const date = event?.start_date || "2024-12-31";
  const venue = typeof event?.venue_id?.name === 'string' 
    ? event.venue_id.name 
    : (event?.venue_id?.name?.en || event?.venue_id?.name?.es || event?.venue_id?.name?.ru || "Sample Venue");
  // Ensure price is always a string, not an object
  const price = typeof event?.price === 'string' 
    ? event.price 
    : (typeof event?.price === 'object' && event?.price !== null
      ? `€${(event.price as any)?.min || 0} - €${(event.price as any)?.max || '∞'}`
      : "€25");
  const image = event?.image;

  return (
    <Card className={cn(
      "group relative overflow-hidden border-transparent hover:border-primary/20 shadow-md hover:shadow-xl transition-all duration-300 animate-fade-in-up",
      featured && "ring-2 ring-primary/50",
      className
    )}>
      {featured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-500 to-purple-600 text-white shadow-lg">
            🔥 Trending
          </span>
        </div>
      )}
      
      {showImage && (
        <div className="relative w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-t-lg overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      <CardContent className="p-4">
        <Heading level={3} className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {event?.slug ? (
            <Link href={`/events/${event.slug}`} variant="ghost" size="none">
              {title}
            </Link>
          ) : (
            title
          )}
        </Heading>
        <Text size="sm" color="muted" className="mb-3 line-clamp-2">{description}</Text>
        <div className="flex flex-col gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <Text size="xs" color="muted">{date}</Text>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <Text size="xs" color="muted" className="line-clamp-1">{venue}</Text>
          </div>
        </div>
        <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
          {event?.ticket_url ? (
            <Link 
              href={event.ticket_url}
              className="inline-flex items-center justify-center w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Tickets
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          ) : (
            <div className="text-right">
              <Text size="lg" weight="bold" className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                {price}
              </Text>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
