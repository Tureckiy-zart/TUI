import { default as React } from "../../../node_modules/.pnpm/react@19.2.0/node_modules/react";
import { DateRange } from "./DateRangePicker";
export interface FilterOption {
  value: string;
  label: string;
}
interface SearchFiltersProps {
  searchLabel: string;
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (query: string) => void;
  dateLabel: string;
  datePlaceholder: string;
  dateSelectDateRangeLabel: string;
  dateClearLabel: string;
  dateCloseLabel: string;
  dateValue: DateRange;
  onDateChange: (range: DateRange) => void;
  genreLabel: string;
  genrePlaceholder: string;
  genreOptions: FilterOption[];
  genreValue: string;
  onGenreChange: (genre: string) => void;
  venueLabel: string;
  venuePlaceholder: string;
  venueOptions: FilterOption[];
  venueValue: string;
  onVenueChange: (venue: string) => void;
  className?: string;
}
export declare const SearchFilters: React.FC<SearchFiltersProps>;
export {};
//# sourceMappingURL=SearchFilters.d.ts.map
