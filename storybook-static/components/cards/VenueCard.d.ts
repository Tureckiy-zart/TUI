import { default as React } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
interface VenueCardProps {
  venue?: {
    _id?: string;
    slug?: string;
    name?: {
      en?: string;
      es?: string;
      ru?: string;
    };
    description?: {
      en?: string;
      es?: string;
      ru?: string;
    };
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
  featured: boolean;
  showImage: boolean;
  eventsLabel: string;
  popularBadgeText: string;
  capacityLabel: string;
}
export declare const VenueCard: React.FC<VenueCardProps>;
export {};
//# sourceMappingURL=VenueCard.d.ts.map
