
import React from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AirportSelector } from "@/components/ui/airport-selector";
import { Plane, CalendarIcon, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { getAirportByIata } from '@/utils/airportsApi';
import { useIsMobile } from '@/hooks/use-mobile';

interface FlightRouteSectionProps {
  fromAirport: string;
  toAirport: string;
  departureDate?: Date;
  onAirportChange: (field: 'fromAirport' | 'toAirport', value: string) => void;
  onDateChange: (date: Date | undefined) => void;
  onSwapAirports: () => void;
}

export const FlightRouteSection: React.FC<FlightRouteSectionProps> = ({
  fromAirport,
  toAirport,
  departureDate,
  onAirportChange,
  onDateChange,
  onSwapAirports
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-2 text-blue-700 mb-3">
        <Plane className="w-4 h-4" />
        <span className="font-semibold text-sm">Flight Route</span>
      </div>

      {/* Airport Selection - Responsive Layout */}
      <div className="space-y-3">
        <div className={cn(
          "flex items-center gap-2",
          isMobile ? "flex-col" : "flex-row"
        )}>
          {/* From Airport */}
          <div className="flex-1 w-full space-y-2">
            <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>FROM</span>
            </div>
            <AirportSelector
              value={fromAirport}
              onValueChange={(value) => onAirportChange('fromAirport', value)}
              placeholder="Departure"
              className="bg-white border-gray-200 h-12"
            />
          </div>

          {/* Swap Button - Inline for desktop */}
          <div className={cn(
            "flex items-center justify-center",
            isMobile ? "py-2" : "pt-6"
          )}>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onSwapAirports}
              className="h-8 w-8 rounded-full border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 flex-shrink-0"
            >
              <ArrowRightLeft className="h-3 w-3 text-blue-600" />
            </Button>
          </div>

          {/* To Airport */}
          <div className="flex-1 w-full space-y-2">
            <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span>TO</span>
            </div>
            <AirportSelector
              value={toAirport}
              onValueChange={(value) => onAirportChange('toAirport', value)}
              placeholder="Destination"
              className="bg-white border-gray-200 h-12"
            />
          </div>
        </div>

        {/* Departure Date */}
        <div className="space-y-2">
          <div className="flex items-center gap-1 text-xs font-medium text-gray-600">
            <CalendarIcon className="w-3 h-3" />
            <span>DEPARTURE DATE</span>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start h-12 bg-white border-2 hover:border-blue-300 text-left",
                  !departureDate && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-3 h-4 w-4 text-gray-400" />
                {departureDate ? (
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      {format(departureDate, "MMM d, yyyy")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(departureDate, "EEEE")}
                    </div>
                  </div>
                ) : (
                  <span>Select departure date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={departureDate}
                onSelect={onDateChange}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};
