
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Phone, Mail, MapPin } from "lucide-react";

interface ContactDetails {
  address: string;
  phone: string;
  email: string;
}

interface ContactSettingsCardProps {
  contactDetails: ContactDetails;
  isLoading: boolean;
  isSaving: boolean;
  onContactInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSaveContactDetails: () => Promise<void>;
}

const ContactSettingsCard = ({
  contactDetails,
  isLoading,
  isSaving,
  onContactInputChange,
  onSaveContactDetails,
}: ContactSettingsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                name="address"
                value={contactDetails.address}
                onChange={onContactInputChange}
                placeholder="Office Address"
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                name="phone"
                value={contactDetails.phone}
                onChange={onContactInputChange}
                placeholder="Phone Number"
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                name="email"
                value={contactDetails.email}
                onChange={onContactInputChange}
                placeholder="Email Address"
                className="pl-10"
              />
            </div>
            <Button
              className="mt-4 w-full sm:w-auto flex items-center gap-2"
              onClick={onSaveContactDetails}
              disabled={isSaving}
            >
              <Save className="h-4 w-4" />
              {isSaving ? "Saving..." : "Save Contact Info"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactSettingsCard;
