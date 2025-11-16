"use client";

import React from 'react';
import { SearchInput } from './SearchInput';
import { FilterSelect } from './FilterSelect';
import { DateRangePicker } from './DateRangePicker';
import { cn } from '@/lib/utils';

interface SearchFiltersProps {
  onSearch?: (query: string) => void;
  onDateChange?: (date: string) => void;
  onGenreChange?: (genre: string) => void;
  onVenueChange?: (venue: string) => void;
  className?: string;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  onDateChange,
  onGenreChange,
  onVenueChange,
  className
}) => {
  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg",
      className
    )}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Search</label>
          <SearchInput
            placeholder="Search events..."
            value=""
            onChange={() => {}}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <DateRangePicker
            value={{ from: undefined, to: undefined }}
            onChange={() => {}}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Genre</label>
          <FilterSelect
            placeholder="Select genre"
            value=""
            options={[
              { value: "classical", label: "Classical" },
              { value: "rock", label: "Rock" },
              { value: "jazz", label: "Jazz" },
              { value: "electronic", label: "Electronic" },
              { value: "folk", label: "Folk" }
            ]}
            onValueChange={onGenreChange || (() => {})}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Venue</label>
          <FilterSelect
            placeholder="Select venue"
            value=""
            options={[
              { value: "auditorio", label: "Auditorio de Tenerife" },
              { value: "teatro", label: "Teatro Guimerá" },
              { value: "casino", label: "Casino de Tenerife" },
              { value: "outdoor", label: "Outdoor Venues" }
            ]}
            onValueChange={onVenueChange || (() => {})}
          />
        </div>
      </div>
    </div>
  );
};
