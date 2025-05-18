
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

interface AirlineSettingsCardProps {
  airlineSettings: {
    isAvailable: boolean;
  };
  isLoading: boolean;
  isSaving: boolean;
  onToggleAirlineAvailability: () => void;
  onSaveAirlineSettings: () => Promise<void>;
}

const AirlineSettingsCard: React.FC<AirlineSettingsCardProps> = ({
  airlineSettings,
  isLoading,
  isSaving,
  onToggleAirlineAvailability,
  onSaveAirlineSettings,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Airline Availability</CardTitle>
        <CardDescription>
          Configure the availability status of airline miles
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Miles Availability</h3>
                <p className="text-sm text-gray-500">
                  Toggle whether airline miles are currently available for purchase
                </p>
              </div>
              <Switch
                id="airline-available"
                checked={airlineSettings.isAvailable}
                onCheckedChange={onToggleAirlineAvailability}
              />
            </div>
            <div className="flex justify-end">
              <Button 
                onClick={onSaveAirlineSettings} 
                disabled={isSaving}
                className="bg-navy hover:bg-navy/90"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AirlineSettingsCard;
