import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { supabase } from '@/integrations/supabase/client';
import { fetchEmailSettings, sendBookingEmailNotifications, saveFlightBooking } from '@/utils/bookingEmailUtils';
import { format } from 'date-fns';
import { getAirportByIata } from '@/utils/airportsApi';
import { useIsMobile } from '@/hooks/use-mobile';
import { FlightRouteSection } from './flight-booking/FlightRouteSection';
import { FlightPreferencesSection } from './flight-booking/FlightPreferencesSection';
import { PersonalInfoSection } from './flight-booking/PersonalInfoSection';
import BookingSuccessDialog from './flight-booking/BookingSuccessDialog';

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
  const isMobile = useIsMobile();
  const [airlines, setAirlines] = useState<Airline[]>([]);
  const [isLoadingAirlines, setIsLoadingAirlines] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [phoneValid, setPhoneValid] = useState(true);
  const [departureDate, setDepartureDate] = useState<Date>();
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    fromAirport: '',
    toAirport: '',
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

  const handleAirportChange = (field: 'fromAirport' | 'toAirport', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
      fromAirport: '',
      toAirport: '',
      airlineName: airlines.length > 0 ? airlines[0].name : '',
      flightDetails: '',
      pointsRequired: '',
      countryCode: 'ae',
    });
    setUploadedFile(null);
    setPhoneValid(true);
    setDepartureDate(undefined);
    
    // Reset file input
    const fileInput = document.getElementById('modal-screenshot') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const swapAirports = () => {
    setFormData(prev => ({
      ...prev,
      fromAirport: prev.toAirport,
      toAirport: prev.fromAirport
    }));
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

    if (!formData.fromAirport || !formData.toAirport || !departureDate) {
      toast({
        title: "Incomplete Information",
        description: "Please select a departure airport, destination airport, and departure date.",
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

      // Get airport details for saving
      const fromAirportData = getAirportByIata(formData.fromAirport);
      const toAirportData = getAirportByIata(formData.toAirport);

      // Save flight booking to database with enhanced flight route information
      const enhancedFlightDetails = `
Route: ${fromAirportData?.city} (${formData.fromAirport}) → ${toAirportData?.city} (${formData.toAirport})
Departure Date: ${format(departureDate, 'PPP')}
Airline: ${formData.airlineName}
Additional Details: ${formData.flightDetails}
      `.trim();

      const bookingData = await saveFlightBooking({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        airline: formData.airlineName,
        points: parseInt(formData.pointsRequired),
        flightDetails: enhancedFlightDetails,
        screenshotUrl: screenshotUrl
      });

      // Fetch email settings and send notifications
      const emailSettings = await fetchEmailSettings();
      
      if (emailSettings.notifications_enabled) {
        console.log('📧 Sending booking email notifications...');
        const emailResult = await sendBookingEmailNotifications(bookingData, emailSettings);
        
        if (emailResult.success) {
          console.log('✅ Booking emails sent successfully');
        } else {
          console.warn('⚠️ Email notification failed:', emailResult.error);
          // Don't fail the whole process if email fails
        }
      } else {
        console.log('📧 Email notifications are disabled');
      }

      resetForm();
      onClose();
      setShowSuccessDialog(true);

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
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className={cn(
          "w-full mx-auto p-0 overflow-hidden bg-white max-h-[90vh]",
          isMobile 
            ? "max-w-sm rounded-t-2xl sm:rounded-2xl" 
            : "max-w-3xl rounded-2xl"
        )}>
          <div className="flex flex-col h-full max-h-[90vh]">
            {/* Header */}
            <div className={cn(
              "flex items-center justify-between border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex-shrink-0",
              isMobile ? "p-4" : "p-6"
            )}>
              <div>
                <DialogTitle className={cn(
                  "font-bold text-white",
                  isMobile ? "text-lg" : "text-2xl"
                )}>
                  Book Your Flight
                </DialogTitle>
                {!isMobile && (
                  <p className="text-blue-100 text-sm mt-1">Find the perfect flight for your journey</p>
                )}
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <form onSubmit={handleSubmit} className={cn("space-y-6", isMobile ? "p-4" : "p-6")}>
                {/* Flight Route Section */}
                <FlightRouteSection
                  fromAirport={formData.fromAirport}
                  toAirport={formData.toAirport}
                  departureDate={departureDate}
                  onAirportChange={handleAirportChange}
                  onDateChange={setDepartureDate}
                  onSwapAirports={swapAirports}
                />

                {/* Flight Preferences */}
                <FlightPreferencesSection
                  airlines={airlines}
                  airlineName={formData.airlineName}
                  pointsRequired={formData.pointsRequired}
                  flightDetails={formData.flightDetails}
                  uploadedFile={uploadedFile}
                  isLoadingAirlines={isLoadingAirlines}
                  onSelectChange={handleSelectChange}
                  onChange={handleChange}
                  onFileChange={handleFileChange}
                />

                {/* Personal Information */}
                <PersonalInfoSection
                  firstName={formData.firstName}
                  lastName={formData.lastName}
                  email={formData.email}
                  phone={formData.phone}
                  countryCode={formData.countryCode}
                  phoneValid={phoneValid}
                  onChange={handleChange}
                  onPhoneChange={handlePhoneChange}
                />
              </form>
            </div>

            {/* Footer */}
            <div className={cn("border-t border-gray-100 bg-gray-50 flex-shrink-0", isMobile ? "p-4" : "p-6")}>
              <Button
                type="submit"
                disabled={isSubmitting || !phoneValid || isLoadingAirlines || !formData.fromAirport || !formData.toAirport || !departureDate}
                onClick={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget.closest('div')?.parentElement?.querySelector('form') as HTMLFormElement;
                  form?.requestSubmit();
                }}
                className={cn(
                  "w-full font-semibold transition-all duration-200 rounded-lg",
                  isMobile ? "h-12 text-base" : "h-14 text-lg",
                  (isSubmitting || !phoneValid || isLoadingAirlines || !formData.fromAirport || !formData.toAirport || !departureDate) 
                    ? "bg-gray-300 text-gray-500" 
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl"
                )}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  "Submit Booking Request"
                )}
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                We'll contact you within 2 hours with your quote.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <BookingSuccessDialog
        isOpen={showSuccessDialog}
        onClose={() => setShowSuccessDialog(false)}
      />
    </>
  );
};

export default FlightBookingModal;
