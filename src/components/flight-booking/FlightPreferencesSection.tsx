
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface Airline {
  id: string;
  name: string;
}

interface FlightPreferencesSectionProps {
  airlines: Airline[];
  airlineName: string;
  pointsRequired: string;
  flightDetails: string;
  uploadedFile: File | null;
  isLoadingAirlines: boolean;
  onSelectChange: (value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FlightPreferencesSection: React.FC<FlightPreferencesSectionProps> = ({
  airlines,
  airlineName,
  pointsRequired,
  flightDetails,
  uploadedFile,
  isLoadingAirlines,
  onSelectChange,
  onChange,
  onFileChange
}) => {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-4">
      <h3 className="text-base font-bold text-gray-900">Flight Preferences</h3>
      
      {/* Airline and Points */}
      <div className={cn(
        "gap-3",
        isMobile ? "space-y-3" : "grid grid-cols-2"
      )}>
        <div className="space-y-2">
          <Label className="text-gray-700 font-medium text-sm">Preferred Airline *</Label>
          <Select value={airlineName} onValueChange={onSelectChange} disabled={isLoadingAirlines}>
            <SelectTrigger className="h-10 border-2 hover:border-blue-300">
              <SelectValue placeholder={isLoadingAirlines ? "Loading..." : "Select airline"} />
            </SelectTrigger>
            <SelectContent>
              {airlines.map((airline) => (
                <SelectItem key={airline.id} value={airline.name}>
                  {airline.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pointsRequired" className="text-gray-700 font-medium text-sm">Points Required *</Label>
          <Input
            id="pointsRequired"
            name="pointsRequired"
            type="number"
            value={pointsRequired}
            onChange={onChange}
            placeholder="e.g., 75000"
            required
            min="1"
            className="h-10 border-2 hover:border-blue-300 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Flight Details */}
      <div className="space-y-2">
        <Label htmlFor="flightDetails" className="text-gray-700 font-medium text-sm">
          Additional Flight Information *
        </Label>
        <Textarea
          id="flightDetails"
          name="flightDetails"
          value={flightDetails}
          onChange={onChange}
          placeholder="Class of service, number of passengers, preferences..."
          required
          rows={3}
          className="border-2 hover:border-blue-300 focus:border-blue-500 resize-none"
        />
      </div>

      {/* Screenshot Upload */}
      <div className="space-y-2">
        <Label htmlFor="modal-screenshot" className="text-gray-700 font-medium text-sm">
          Flight Screenshot (Optional)
        </Label>
        <div>
          <Input
            id="modal-screenshot"
            type="file"
            onChange={onFileChange}
            accept=".jpg,.jpeg,.png"
            className="hidden"
          />
          <label
            htmlFor="modal-screenshot"
            className="flex items-center justify-center w-full h-16 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50"
          >
            {uploadedFile ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm font-medium">{uploadedFile.name}</span>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Upload screenshot</p>
              </div>
            )}
          </label>
        </div>
      </div>
    </div>
  );
};
