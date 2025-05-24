
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { saveFlightBooking, fetchEmailSettings, sendBookingEmailNotifications } from "@/utils/bookingEmailUtils";

interface FlightBookingFormProps {
  onSuccess: () => void;
}

const FlightBookingForm = ({ onSuccess }: FlightBookingFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    airline: "",
    points: "",
    flightDetails: "",
  });

  const airlines = [
    "Emirates",
    "British Airways", 
    "American Airlines",
    "Delta Air Lines",
    "United Airlines",
    "Air France",
    "KLM",
    "Lufthansa",
    "Qatar Airways",
    "Singapore Airlines",
    "Turkish Airlines",
    "Other"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || 
          !formData.airline || !formData.points || !formData.flightDetails) {
        toast({
          title: "Error",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      // Save the flight booking to database
      const bookingData = await saveFlightBooking({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        airline: formData.airline,
        points: parseInt(formData.points),
        flightDetails: formData.flightDetails,
      });

      // Fetch email settings
      const emailSettings = await fetchEmailSettings();

      // Send email notifications
      const emailResult = await sendBookingEmailNotifications(bookingData, emailSettings);

      if (!emailResult.success && !emailResult.testMode) {
        console.warn('Email sending failed:', emailResult.error);
        // Still show success to user since the booking was saved
        toast({
          title: "Booking Request Submitted",
          description: "Your flight booking request has been saved. We'll contact you within 2 hours.",
          className: "bg-white border-gold",
        });
      } else {
        toast({
          title: "Booking Request Submitted Successfully!",
          description: "We'll contact you within 2 hours to complete your booking. Check your email for confirmation.",
          className: "bg-white border-green-400",
        });
      }

      onSuccess();
    } catch (error: any) {
      console.error("Error submitting booking request:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit booking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          required
        />
      </div>

      <div>
        <Label htmlFor="phone">Phone Number (WhatsApp) *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          placeholder="971501234567"
          required
        />
      </div>

      <div>
        <Label htmlFor="airline">Airline *</Label>
        <Select onValueChange={(value) => handleInputChange("airline", value)} required>
          <SelectTrigger>
            <SelectValue placeholder="Select airline" />
          </SelectTrigger>
          <SelectContent>
            {airlines.map((airline) => (
              <SelectItem key={airline} value={airline}>
                {airline}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="points">Points Required *</Label>
        <Input
          id="points"
          type="number"
          value={formData.points}
          onChange={(e) => handleInputChange("points", e.target.value)}
          placeholder="e.g., 85000"
          required
        />
      </div>

      <div>
        <Label htmlFor="flightDetails">Flight Details *</Label>
        <Textarea
          id="flightDetails"
          value={formData.flightDetails}
          onChange={(e) => handleInputChange("flightDetails", e.target.value)}
          placeholder="Please provide details about your desired flight (route, dates, class of service, etc.)"
          rows={4}
          required
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gold hover:bg-gold-dark text-white"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting Request...
          </>
        ) : (
          "Submit Booking Request"
        )}
      </Button>
    </form>
  );
};

export default FlightBookingForm;
