
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/integrations/supabase/client';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Upload, CheckCircle } from 'lucide-react';

interface Airline {
  id: string;
  name: string;
}

interface FlightBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FlightBookingModal: React.FC<FlightBookingModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [isLoadingAirlines, setIsLoadingAirlines] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [phoneValid, setPhoneValid] = useState(true);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    airlineName: '',
    flightDetails: '',
    pointsRequired: '',
    countryCode: 'ae',
  });

  // Fetch airlines from Supabase
  useEffect(() => {
    if (isOpen) {
      const fetchAirlines = async () => {
        try {
          const { data, error } = await supabase
            .from('airlines')
            .select('id, name')
            .order('name');
          
          if (error) throw error;
          
          setAirlines(data || []);
          if (data && data.length > 0) {
            setFormData(prev => ({ ...prev, airlineName: data[0].name }));
          }
        } catch (error) {
          console.error('Error fetching airlines:', error);
          toast({
            title: "Error",
            description: "Failed to load airlines. Please refresh the page.",
            variant: "destructive",
          });
        } finally {
          setIsLoadingAirlines(false);
        }
      };

      fetchAirlines();
    }
  }, [isOpen, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, airlineName: value }));
  };

  const handlePhoneChange = (value: string, country: any) => {
    setFormData(prev => ({ ...prev, phone: value, countryCode: country.countryCode }));
    setPhoneValid(value.length >= 8);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          description: "Please upload only JPG or PNG images.",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload an image smaller than 5MB.",
          variant: "destructive",
        });
        return;
      }

      setUploadedFile(file);
    }
  };

  const uploadScreenshot = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data, error } = await supabase.storage
        .from('flight-screenshots')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('flight-screenshots')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      airlineName: airlines.length > 0 ? airlines[0].name : '',
      flightDetails: '',
      pointsRequired: '',
      countryCode: 'ae',
    });
    setUploadedFile(null);
    setPhoneValid(true);
    
    // Reset file input
    const fileInput = document.getElementById('modal-screenshot') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formData.phone || formData.phone.length < 8) {
      setPhoneValid(false);
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.pointsRequired || isNaN(Number(formData.pointsRequired))) {
      toast({
        title: "Invalid Points",
        description: "Please enter a valid number for points required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      let screenshotUrl = null;
      
      // Upload screenshot if provided
      if (uploadedFile) {
        screenshotUrl = await uploadScreenshot(uploadedFile);
        if (!screenshotUrl) {
          throw new Error('Failed to upload screenshot');
        }
      }

      // Save flight booking request to database
      const { error } = await supabase
        .from('flight_bookings')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          airline_name: formData.airlineName,
          flight_details: formData.flightDetails,
          screenshot_url: screenshotUrl,
          points_required: parseInt(formData.pointsRequired),
        });

      if (error) throw error;

      toast({
        title: "Booking Request Submitted!",
        description: "We've received your flight booking request. Our team will contact you within 2 hours with next steps.",
      });

      resetForm();
      onClose();

    } catch (error) {
      console.error('Error submitting booking request:', error);
      toast({
        title: "Error",
        description: "There was a problem submitting your booking request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-navy font-gilda">
            Request Flight Booking
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName" className="text-navy font-medium">
                First Name *
              </Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lastName" className="text-navy font-medium">
                Last Name *
              </Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email" className="text-navy font-medium">
                Email Address *
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-navy font-medium">
                Phone Number *
              </Label>
              <PhoneInput
                country={formData.countryCode}
                value={formData.phone}
                onChange={handlePhoneChange}
                inputStyle={{
                  width: '100%',
                  height: '40px',
                  fontSize: '14px',
                  border: phoneValid ? '1px solid #e2e8f0' : '1px solid #ef4444',
                }}
                containerStyle={{ marginTop: '4px' }}
              />
              {!phoneValid && (
                <p className="text-sm text-red-500 mt-1">Please enter a valid phone number</p>
              )}
            </div>
          </div>

          {/* Airline Selection */}
          <div>
            <Label className="text-navy font-medium">
              Airline *
            </Label>
            <Select value={formData.airlineName} onValueChange={handleSelectChange} disabled={isLoadingAirlines}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder={isLoadingAirlines ? "Loading airlines..." : "Select an airline"} />
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

          {/* Flight Details */}
          <div>
            <Label htmlFor="flightDetails" className="text-navy font-medium">
              Flight Details *
            </Label>
            <Textarea
              id="flightDetails"
              name="flightDetails"
              value={formData.flightDetails}
              onChange={handleChange}
              placeholder="Please provide detailed flight information: departure/arrival cities, dates, times, class of service, number of passengers, etc."
              required
              rows={3}
              className="mt-1"
            />
          </div>

          {/* Points Required */}
          <div>
            <Label htmlFor="pointsRequired" className="text-navy font-medium">
              Points Required for This Flight *
            </Label>
            <Input
              id="pointsRequired"
              name="pointsRequired"
              type="number"
              value={formData.pointsRequired}
              onChange={handleChange}
              placeholder="e.g., 75000"
              required
              min="1"
              className="mt-1"
            />
          </div>

          {/* Screenshot Upload */}
          <div>
            <Label htmlFor="modal-screenshot" className="text-navy font-medium">
              Flight Screenshot (Optional)
            </Label>
            <div className="mt-1">
              <Input
                id="modal-screenshot"
                type="file"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png"
                className="hidden"
              />
              <label
                htmlFor="modal-screenshot"
                className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gold transition-colors"
              >
                <div className="text-center">
                  {uploadedFile ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-sm font-medium">{uploadedFile.name}</span>
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                      <p className="text-sm text-gray-600">Click to upload screenshot</p>
                      <p className="text-xs text-gray-400">JPG, PNG (max 5MB)</p>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting || !phoneValid || isLoadingAirlines}
              className={cn(
                "w-full py-3 px-6 rounded-md font-medium text-white transition-colors duration-200",
                (isSubmitting || !phoneValid || isLoadingAirlines) 
                  ? "bg-gray-400" 
                  : "bg-gold hover:bg-gold-dark"
              )}
            >
              {isSubmitting ? "Submitting Request..." : "Submit Booking Request"}
            </Button>
          </div>

          <p className="text-xs text-gray-500 text-center">
            By submitting this form, you agree to our terms and privacy policy. 
            We'll contact you within 2 hours with a detailed quote and next steps.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FlightBookingModal;
