import { default as React } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
export interface EventCardEvent {
  _id?: string;
  slug?: string;
  name?: {
    en?: string;
    es?: string;
    ru?: string;
  };
  start_date?: string;
  ticket_url?: string;
  venue_id?: {
    name?: {
      en?: string;
      es?: string;
      ru?: string;
    };
  };
  description?: {
    en?: string;
    es?: string;
    ru?: string;
  };
  price?: string;
  image?: string;
}
interface EventCardProps {
  event?: EventCardEvent;
  className?: string;
  featured: boolean;
  showImage: boolean;
  getTicketsLabel: string;
  trendingBadgeText: string;
}
export declare const EventCard: React.FC<EventCardProps>;
export {};
//# sourceMappingURL=EventCard.d.ts.map
