
import React, { useState, useEffect } from 'react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ChevronDown, MapPin, Plane } from 'lucide-react';
import { cn } from '@/lib/utils';
import { searchAirports, getAirportByIata, type Airport } from '@/utils/airportsApi';

interface AirportSelectorProps {
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const AirportSelector: React.FC<AirportSelectorProps> = ({
  value,
  onValueChange,
  placeholder = 'Select airport',
  disabled = false,
  className
}) => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [airports, setAirports] = useState<Airport[]>([]);

  useEffect(() => {
    setAirports(searchAirports(searchQuery));
  }, [searchQuery]);

  const selectedAirport = value ? getAirportByIata(value) : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(
            "w-full justify-between h-auto p-4 border-2 hover:border-blue-300 transition-colors",
            className
          )}
        >
          <div className="flex items-center space-x-3 flex-1 text-left">
            <div className="flex-shrink-0">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              {selectedAirport ? (
                <div>
                  <div className="font-semibold text-lg text-gray-900">
                    {selectedAirport.city} ({selectedAirport.iata})
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {selectedAirport.name}
                  </div>
                  <div className="text-xs text-gray-400">
                    {selectedAirport.country}
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">{placeholder}</div>
              )}
            </div>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput
            placeholder="Search airports..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="h-12"
          />
          <CommandEmpty>No airports found.</CommandEmpty>
          <CommandList className="max-h-64">
            <CommandGroup>
              {airports.map((airport) => (
                <CommandItem
                  key={airport.iata}
                  value={airport.iata}
                  onSelect={() => {
                    onValueChange(airport.iata);
                    setOpen(false);
                  }}
                  className="p-3 cursor-pointer"
                >
                  <div className="flex items-center space-x-3 w-full">
                    <Plane className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">
                          {airport.city}
                        </span>
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                          {airport.iata}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {airport.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {airport.country}
                      </div>
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
